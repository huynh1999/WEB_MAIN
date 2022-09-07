/*=========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   : TransloadingInboundItemPopup.js
*@FileTitle  : TransloadingInboundItemPopup
*@author     : TinLuong - DOU Network
*@version    : 1.0
*@since      : 2015/06/25
=========================================================*/
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var opener = opener;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var k=0;k<tabObjects.length;k++){
        initTab(tabObjects[k],k+1);
    }
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    //for(var c=0; c<comboObjects.length; c++){
    //    initCombo(comboObjects[c], c+1);
    //}	
	//initControl();
	//formObj.bk_no.value = 'IBSEL150500072';
	//formObj.cntr_tpsz_cd.value = '20GP';
	//formObj.truck_tpsz_cd.value = 'T1';
	//formObj.tlo_no.value = 'TLSEL150500070';
	//formObj.tlo_seq.value = '4';
	if (!ComIsEmpty(formObj.bk_no)){
		btn_Search();
		formObj.btn_save.disabled = false;
		formObj.btn_apply.disabled = true;
	}else{
		formObj.btn_save.disabled = true;
		formObj.btn_apply.disabled = false;
		//CREATE MODE일때 부모창 내용 복사
		var openerformObj=opener.document.form;
		var openerSheetObj2=opener.docObjects[2];
		var sheetObj=docObjects[0];
		var openerprefix1="Grd03";
		var prefix="Grd01";
		sheetObj.RemoveAll();
		/*for(var i=openerSheetObj2.HeaderRows(); i<openerSheetObj2.LastRow(); i++) {
			row=sheetObj.DataInsert(-1);
			sheetObj.SetCellValue(row,prefix+"item_cd",openerSheetObj2.GetCellValue(i,openerprefix1+"item_cd"),0);
			sheetObj.SetCellValue(row,prefix+"item_nm",openerSheetObj2.GetCellValue(i,openerprefix1+"item_nm"),0);
			sheetObj.SetCellValue(row,prefix+"item_ea_qty",openerSheetObj2.GetCellValue(i,openerprefix1+"item_ea_qty"),0);
			sheetObj.SetCellValue(row,prefix+"item_pkgunit",openerSheetObj2.GetCellValue(i,openerprefix1+"item_pkgunit"),0);
			sheetObj.SetCellValue(row,prefix+"item_pkgqty",openerSheetObj2.GetCellValue(i,openerprefix1+"item_pkgqty"),0);
			sheetObj.SetCellValue(row,prefix+"unload_inbound_loc_nm",openerSheetObj2.GetCellValue(i,openerprefix1+"unload_inbound_loc_nm"),0);
			sheetObj.SetCellValue(row,prefix+"lot_no",openerSheetObj2.GetCellValue(i,openerprefix1+"lot_no"),0);
			sheetObj.SetCellValue(row,prefix+"item_cbm",openerSheetObj2.GetCellValue(i,openerprefix1+"item_cbm"),0);
			sheetObj.SetCellValue(row,prefix+"item_net_kgs",openerSheetObj2.GetCellValue(i,openerprefix1+"item_net_kgs"),0);
			sheetObj.SetCellValue(row,prefix+"item_grs_kgs",openerSheetObj2.GetCellValue(i,openerprefix1+"item_grs_kgs"),0);
			sheetObj.SetCellValue(row,prefix+"po_sys_no",openerSheetObj2.GetCellValue(i,openerprefix1+"po_sys_no"),0);
			sheetObj.SetCellValue(row,prefix+"item_sys_no",openerSheetObj2.GetCellValue(i,openerprefix1+"item_sys_no"),0);
			sheetObj.SetCellValue(row,prefix+"org_qty",openerSheetObj2.GetCellValue(i,openerprefix1+"org_qty"),0);
			sheetObj.SetCellValue(row,prefix+"item_seq",openerSheetObj2.GetCellValue(i,openerprefix1+"item_seq"),0);
			sheetObj.SetCellValue(row,prefix+"ctrt_no",openerSheetObj2.GetCellValue(i,openerprefix1+"ctrt_no"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv1_qty",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv1_qty"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv1_unit_cd",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv1_unit_cd"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv2_qty",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv2_qty"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv2_unit_cd",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv2_unit_cd"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv3_qty",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv3_qty"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv3_unit_cd",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv3_unit_cd"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv4_qty",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv4_qty"),0);
			sheetObj.SetCellValue(row,prefix+"pkg_lv4_unit_cd",openerSheetObj2.GetCellValue(i,openerprefix1+"pkg_lv4_unit_cd"),0);
			sheetObj.SetCellValue(row,prefix+"lv1_cbm",openerSheetObj2.GetCellValue(i,openerprefix1+"lv1_cbm"),0);
			sheetObj.SetCellValue(row,prefix+"lv1_cbf",openerSheetObj2.GetCellValue(i,openerprefix1+"lv1_cbf"),0);
			sheetObj.SetCellValue(row,prefix+"lv1_grs_kgs",openerSheetObj2.GetCellValue(i,openerprefix1+"lv1_grs_kgs"),0);
			sheetObj.SetCellValue(row,prefix+"lv1_grs_lbs",openerSheetObj2.GetCellValue(i,openerprefix1+"lv1_grs_lbs"),0);
			sheetObj.SetCellValue(row,prefix+"lv1_net_kgs",openerSheetObj2.GetCellValue(i,openerprefix1+"lv1_net_kgs"),0);
			sheetObj.SetCellValue(row,prefix+"lv1_net_lbs",openerSheetObj2.GetCellValue(i,openerprefix1+"lv1_net_lbs"),0);
			sheetObj.SetCellValue(row,prefix+"unload_inbound_loc_cd",openerSheetObj2.GetCellValue(i,openerprefix1+"unload_inbound_loc_cd"),0);
		}*/
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("change", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
}
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
/*function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.id) {	
		case "sell_filer":
			vTextSplit=rate_filerText.split("|");
			vCodeSplit=rate_filerCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				//InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}				
	    	}
			comboObj.SetSelectText("All",false);
			break;	
		case "buy_filer":
			vTextSplit=rate_filerText.split("|");
			vCodeSplit=rate_filerCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				//InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			comboObj.SetSelectText("All",false);
			break;	
		case "svcterm_fr_cd":
			vTextSplit=svcterm_fr_cdText.split("|");
			vCodeSplit=svcterm_fr_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			comboObj.SetSelectText("ALL",false);
			break;	
		case "svcterm_to_cd":
			vTextSplit=svcterm_to_cdText.split("|");
			vCodeSplit=svcterm_to_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			comboObj.SetSelectText("ALL",false);
			break;	
	}
} */
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
	      var hdr1="||Item|Item Name|EA Qty|Package|Package|Location|Item Lot|CBM|N.Weight|G.Weight";
	      hdr1 += "|po_sys_no|item_sys_no|org_qty|item_seq|ctrt_no|pkg_lv1_qty|pkg_lv1_unit_cd|pkg_lv2_qty|pkg_lv2_unit_cd|pkg_lv3_qty|pkg_lv3_unit_cd|pkg_lv4_qty|pkg_lv4_unit_cd|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|unload_inbound_loc_cd";
	      var hdr2="||Item|Item Name|EA Qty|Unit|QTY|Location|Item Lot|CBM|N.Weight|G.Weight";
	      hdr2 += "|po_sys_no|item_sys_no|org_qty|item_seq|ctrt_no|pkg_lv1_qty|pkg_lv1_unit_cd|pkg_lv2_qty|pkg_lv2_unit_cd|pkg_lv3_qty|pkg_lv3_unit_cd|pkg_lv4_qty|pkg_lv4_unit_cd|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|unload_inbound_loc_cd";
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd01";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                  { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk" },
	             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",               KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",               KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_ea_qty",           KeyField:0,   CalcLogic:"",   Format:"Integer",     			PointCount:0,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit",          KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",           KeyField:0,   CalcLogic:"",   Format:"Integer",     			PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"unload_inbound_loc_nm", KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_no",                KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",              KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs",          KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs",          KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"po_sys_no",             KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",           KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Right",   ColMerge:0,   SaveName:prefix+"org_qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"item_seq",              KeyField:0,   CalcLogic:"",   Format:"Integer",     	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",               KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",           KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv1_unit_cd",       KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv2_qty",           KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv2_unit_cd",       KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv3_qty",           KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv3_unit_cd",       KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv4_qty",           KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv4_unit_cd",       KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",               KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",               KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",           KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",           KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",           KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",           KeyField:0,   CalcLogic:"",   Format:"Float",       	PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unload_inbound_loc_cd", KeyField:0,   CalcLogic:"",   Format:"",            	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 } ];
	       
	      InitColumns(cols);
	      //SetSheetHeight(350);
	      resizeSheet();
	      SetEditable(1);
	      SetWaitImageVisible(0);
//	      SetColProperty(0 , prefix+"item_cd", {AcceptKeys:"E|[0123456789][()_-+.&/@#!%^*$~` ]" , InputCaseSensitive:1});		
	      SetColProperty(0 , prefix+"item_cd", {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});		
	      SetColProperty(0 , prefix+"item_nm", {AcceptKeys:"E|[" + "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\" + "]" , InputCaseSensitive:1});		
	      SetColProperty(0 , prefix+"lot_no", {AcceptKeys:"E|[" + "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\" + "]" , InputCaseSensitive:1});		
	      SetColProperty(0 , prefix+"item_pkgunit", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});		
	      SetColProperty(0 , prefix+"unload_inbound_loc_nm", {AcceptKeys:"E|[" + "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\" + "]" , InputCaseSensitive:1});		
	            //conversion of function[check again]CLT 			InitDataValid(0, , vtEngUpOther, );
	      //conversion of function[check again]CLT 			InitDataValid(0, prefix+"item_nm", vtEngUpOther, FORMAT_CUSTOMER_CD);
	      //conversion of function[check again]CLT 			InitDataValid(0, prefix+"lot_no", vtEngUpOther, FORMAT_CUSTOMER_CD);
	      //conversion of function[check again]CLT 			InitDataValid(0, prefix+"item_pkgunit", vtEngUpOther, "0123456789");
	      //conversion of function[check again]CLT 			InitDataValid(0, prefix+"unload_inbound_loc_nm",	vtEngUpOther, FORMAT_CUSTOMER_CD);
	      //no support[implemented common]CLT 			SelectHighLight=false;
	      }
	      break;


	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
}
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"item_cd") ) {
			// Contract No 체크
			if (isNull(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0278", "Contract No");
				sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
				sheetObj.SelectCell(Row, Col);
				return;
			}
		   	var sUrl="CtrtItemPopup.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+colValue;
			ComOpenPopup(sUrl, 400, 560, "setItemGrid", "0,0", true);
		} else if (colName == (prefix+"item_pkgunit") ) {
		   	var sUrl="";
		   	if(sheetObj.GetCellValue(Row, (prefix+"item_sys_no")) == ""){
		   		sUrl="CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&ctrt_no="+ComGetObjValue(formObj.ctrt_no);	
		   	}else{
		   		sUrl="CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&wh_flag=Y&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_sys_no="+sheetObj.GetCellValue(Row, (prefix+"item_sys_no"));
		   	}
			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true);
		} else if (colName == prefix + "unload_inbound_loc_nm") {
			var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ComGetObjValue(formObj.wh_cd)+ "&f_putaway_flg=Y&f_move_flg=Y";
			ComOpenPopup(sUrl, 700, 550, "setLocInfo", "0,0", true);
		}
	}
}
function setItemGrid(aryPopupData){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_cd",aryPopupData[0][1],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm",aryPopupData[0][2],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"ctrt_no",aryPopupData[0][3],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_sys_no",aryPopupData[0][4],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",aryPopupData[0][5],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbm",aryPopupData[0][9],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbf",aryPopupData[0][10],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_kgs",aryPopupData[0][11],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_lbs",aryPopupData[0][12],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_kgs",aryPopupData[0][13],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_lbs",aryPopupData[0][14],0);
	//sheetObj.CellValue2(sheetObj.SelectRow, prefix+"item_remark")     = aryPopupData[0][15];
	//Item master 정보
	//sheetObj.CellValue2(sheetObj.SelectRow, prefix+"item_pkgbaseqty") = aryPopupData[0][6];
	//sheetObj.CellValue2(sheetObj.SelectRow, prefix+"item_pkgunit")    = aryPopupData[0][7];
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_qty",aryPopupData[0][8],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_unit_cd",aryPopupData[0][16],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_qty",aryPopupData[0][6],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_unit_cd",aryPopupData[0][7],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_qty",aryPopupData[0][17],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_unit_cd",aryPopupData[0][18],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_qty",aryPopupData[0][19],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_unit_cd",aryPopupData[0][20],0);
	//if (!ComIsNull(sheetObj.CellValue(sheetObj.SelectRow, prefix+"item_nm"))) {	
	//	sheetObj.CellEditable(sheetObj.SelectRow, prefix+"item_nm") = false;
	//}	
	// item sys no 존재시					
if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix + "item_sys_no"))) {
		// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
		fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), "");
	}
}
function setPkgunitGrid(aryPopupData){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_pkgunit",aryPopupData[0][2],0);
if(sheetObj.GetCellValue(sheetObj.GetSelectRow(), (prefix+"item_sys_no")) != ""){
		// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
		fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
	}
}
/**
 * Item EA_QTY 계산
 * @param sheetObj
 * @param row
 * @param col
 */
function fnCalcItemEaQty(sheetObj, Row, Col) {
	var formObj=document.form;	
	var prefix="Grd01";
	var item_pkgunit=sheetObj.GetCellValue(Row, prefix + "item_pkgunit").trim();
	var item_pkgqty=sheetObj.GetCellValue(Row, prefix + "item_pkgqty").trim();
	var ctrt_no=ComGetObjValue(formObj.ctrt_no);
	var item_sys_no=sheetObj.GetCellValue(Row, prefix + "item_sys_no").trim();
	if (item_pkgunit == "" && item_pkgqty > 0) {
		//ComShowCodeMessage("COM0311"); //sound unit는 없고 qty있는경우 메세지
		//sheetObj.SelectCell(Row, Col);
		ComShowCodeMessage("COM0162", Row-1, "[Item] Unit");
		sheetObj.SelectCell(Row, Col);
		return;
	}
	/*$.ajax({
		url : "searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
			                      + "&putaway_pkgqty=" + item_pkgqty
			                      + "&ctrt_no="        + ctrt_no
			                      + "&item_sys_no="    + item_sys_no
		    ,
		success : function(result) {
			resultCalcItemEaQty(result.xml, sheetObj, Row, Col);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
			                      + "&putaway_pkgqty=" + item_pkgqty
			                      + "&ctrt_no="        + ctrt_no
			                      + "&item_sys_no="    + item_sys_no);
	resultCalcItemEaQty(sXml, sheetObj, Row, Col);
}
/*
 * receving 정보바뀐경우 os계산 ajax return function
 */
function resultCalcItemEaQty(resultXml, sheetObj, Row, Col) {
	var prefix="Grd01";
	var suYn=getXmlDataNullToNullString(resultXml, 'suYn');
	var suValue=getXmlDataNullToNullString(resultXml, 'suValue');
	if (suYn == "" || suYn == null)	{
		alert("error"); //TODO : MJY MESSAGE
		return;
	}
	if (suYn == "N") {
		ComShowCodeMessage(suValue); //COM0313~COM0315
		sheetObj.SetCellValue(Row, prefix + "item_pkgqty",0,0);
		sheetObj.SetCellValue(Row, prefix + "item_ea_qty",0,0);
		sheetObj.SetCellValue(Row, prefix + "item_pkgunit","",0);
		sheetObj.SelectCell(Row, prefix + "item_pkgunit");
		return;
	}
	var item_pkgqty=getXmlDataNullToNullString(resultXml, 'putaway_ea_qty');
	sheetObj.SetCellValue(Row, prefix + "item_ea_qty",item_pkgqty,0);
	//sheetObj.CellValue2(Row, prefix + "add_row") = item_pkgqty;
	// CBM, GWT, NWT 계산 
	fnCalcItemCbmGwtNwt(sheetObj, Row, Col);
}
/**
 * CBM, GWT, NWT 계산
 */
function fnCalcItemCbmGwtNwt(sheetObj, Row, Col) {
	var formObj=document.form;	
	var prefix="Grd01";
	// CBM, GWT, NWT 계산
	var item_ea_qty=eval(sheetObj.GetCellValue(Row, prefix + "item_ea_qty"));
	var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, prefix + "pkg_lv1_qty"));
	var lv1_cbm=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbm"));
	var lv1_cbf=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbf"));
	var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_kgs"));
	var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_lbs"));
	var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_kgs"));
	var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_lbs"));
	sheetObj.SetCellValue(Row,  prefix + "item_cbm",(pkg_lv1_qty * item_ea_qty) * lv1_cbm,0);
	//sheetObj.CellValue2(Row,  prefix + "item_cbf")     = (pkg_lv1_qty * item_ea_qty) * lv1_cbf;
	sheetObj.SetCellValue(Row,  prefix + "item_grs_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_kgs,0);
	//sheetObj.CellValue2(Row,  prefix + "item_grs_lbs") = (pkg_lv1_qty * item_ea_qty) * lv1_grs_lbs;
	sheetObj.SetCellValue(Row,  prefix + "item_net_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_net_kgs,0);
	//sheetObj.CellValue2(Row,  prefix + "item_net_lbs") = (pkg_lv1_qty * item_ea_qty) * lv1_net_lbs;
	setAutoCalTLT();
}
/*
 * loc popupedit 완료후
 */
function setLocInfo(aryPopupData){
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unload_inbound_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unload_inbound_loc_nm",aryPopupData[0][2],0);// wh_loc_nm
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	if (colName == (prefix+"item_cd")) {
		if (Value != "") {
			// Contract No 체크
			if (isNull(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0278", "Contract No");
				sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
				sheetObj.SelectCell(Row, Col);
				return;
			}
			// item code 변경시 Pack Master (TL_CTRT_CUST_ITEM)의 패키지 Level1 기본 정보를 가져온다			
			var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+Value;
			/*$.ajax({
				url : "searchWHItemCodeInfo.clt?"+sParam,
				success : function(result) {
					sheetObj.SetCellValue(Row, prefix+"item_sys_no",getXmlDataNullToNullString(result.xml, 'item_sys_no'),0);
					//sheetObj.CellValue2(Row, prefix+"item_cd")      = getXmlDataNullToNullString(result.xml, 'item_cd'); // Pack Master 등록을 위한 주석처리
					sheetObj.SetCellValue(Row, prefix+"item_nm",getXmlDataNullToNullString(result.xml, 'item_nm'),0);
					sheetObj.SetCellValue(Row, prefix+"lot_no",getXmlDataNullToNullString(result.xml, 'lot_no'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_cbm",getXmlDataNullToNullString(result.xml, 'lv1_cbm'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_cbf",getXmlDataNullToNullString(result.xml, 'lv1_cbf'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",getXmlDataNullToNullString(result.xml, 'lv1_grs_kgs'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",getXmlDataNullToNullString(result.xml, 'lv1_grs_lbs'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",getXmlDataNullToNullString(result.xml, 'lv1_net_kgs'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",getXmlDataNullToNullString(result.xml, 'lv1_net_lbs'),0);
					//ITEM MASTER정보
					//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = getXmlDataNullToNullString(result.xml, 'item_pkgunit');					
					//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = getXmlDataNullToNullString(result.xml, 'item_pkgbaseqty');
					sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",getXmlDataNullToNullString(result.xml, 'pkg_lv1_qty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",getXmlDataNullToNullString(result.xml, 'pkg_lv1_unit_cd'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",getXmlDataNullToNullString(result.xml, 'item_pkgbaseqty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",getXmlDataNullToNullString(result.xml, 'item_pkgunit'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",getXmlDataNullToNullString(result.xml, 'pkg_lv3_qty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",getXmlDataNullToNullString(result.xml, 'pkg_lv3_unit_cd'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",getXmlDataNullToNullString(result.xml, 'pkg_lv4_qty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",getXmlDataNullToNullString(result.xml, 'pkg_lv4_unit_cd'),0);
					//sheetObj.CellValue2(Row, prefix+"pkg_info")  = getXmlDataNullToNullString(result.xml, 'pkg_info');
					//sheetObj.CellValue2(Row, prefix+"curr_cd")  = getXmlDataNullToNullString(result.xml, 'unit_curr_cd');
					//sheetObj.CellValue2(Row, prefix+"unit_price")  = getXmlDataNullToNullString(result.xml, 'unit_price');
					//if (!ComIsNull(sheetObj.CellValue(Row, prefix+"item_nm"))) {	
					//	sheetObj.CellEditable(Row, prefix+"item_nm") = false;
					//} else {
					//	sheetObj.CellEditable(Row, prefix+"item_nm") = true;
					//}					
					//if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						//alert(getXmlDataNullToNullString(result.xml,'exception_msg')); // There is no data.
					//	sheetObj.SelectCell(Row,Col);
					//}
					// item sys no 존재시					
					if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
						// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
						fnCalcItemEaQty(sheetObj, Row, Col);
					} else {
						//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = "";					
						//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = "";
						sheetObj.SetCellValue(Row, prefix+"item_ea_qty",sheetObj.GetCellValue(Row, prefix+"item_pkgqty"),0);
						//sheetObj.CellValue2(Row, prefix+"item_cbm")     = "";
						//sheetObj.CellValue2(Row, prefix+"item_grs_kgs") = "";
						//sheetObj.CellValue2(Row, prefix+"item_net_kgs") = "";
					}
				}
			});*/
			var sXml=docObjects[0].GetSearchData("searchWHItemCodeInfo.clt?"+sParam);
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",getXmlDataNullToNullString(sXml, 'item_sys_no'),0);
			//sheetObj.CellValue2(Row, prefix+"item_cd")      = getXmlDataNullToNullString(sXml, 'item_cd'); // Pack Master 등록을 위한 주석처리
			sheetObj.SetCellValue(Row, prefix+"item_nm",getXmlDataNullToNullString(sXml, 'item_nm'),0);
			sheetObj.SetCellValue(Row, prefix+"lot_no",getXmlDataNullToNullString(sXml, 'lot_no'),0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",getXmlDataNullToNullString(sXml, 'lv1_cbm'),0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",getXmlDataNullToNullString(sXml, 'lv1_cbf'),0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",getXmlDataNullToNullString(sXml, 'lv1_grs_kgs'),0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",getXmlDataNullToNullString(sXml, 'lv1_grs_lbs'),0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",getXmlDataNullToNullString(sXml, 'lv1_net_kgs'),0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",getXmlDataNullToNullString(sXml, 'lv1_net_lbs'),0);
			//ITEM MASTER정보
			//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = getXmlDataNullToNullString(sXml, 'item_pkgunit');					
			//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = getXmlDataNullToNullString(sXml, 'item_pkgbaseqty');
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",getXmlDataNullToNullString(sXml, 'pkg_lv1_qty'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",getXmlDataNullToNullString(sXml, 'pkg_lv1_unit_cd'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",getXmlDataNullToNullString(sXml, 'item_pkgbaseqty'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",getXmlDataNullToNullString(sXml, 'item_pkgunit'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",getXmlDataNullToNullString(sXml, 'pkg_lv3_qty'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",getXmlDataNullToNullString(sXml, 'pkg_lv3_unit_cd'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",getXmlDataNullToNullString(sXml, 'pkg_lv4_qty'),0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",getXmlDataNullToNullString(sXml, 'pkg_lv4_unit_cd'),0);
			//sheetObj.CellValue2(Row, prefix+"pkg_info")  = getXmlDataNullToNullString(sXml, 'pkg_info');
			//sheetObj.CellValue2(Row, prefix+"curr_cd")  = getXmlDataNullToNullString(sXml, 'unit_curr_cd');
			//sheetObj.CellValue2(Row, prefix+"unit_price")  = getXmlDataNullToNullString(sXml, 'unit_price');
			//if (!ComIsNull(sheetObj.CellValue(Row, prefix+"item_nm"))) {	
			//	sheetObj.CellEditable(Row, prefix+"item_nm") = false;
			//} else {
			//	sheetObj.CellEditable(Row, prefix+"item_nm") = true;
			//}					
			//if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				//alert(getXmlDataNullToNullString(result.xml,'exception_msg')); // There is no data.
			//	sheetObj.SelectCell(Row,Col);
			//}
			// item sys no 존재시					
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
				// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
				fnCalcItemEaQty(sheetObj, Row, Col);
			} else {
				//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = "";					
				//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = "";
				sheetObj.SetCellValue(Row, prefix+"item_ea_qty",sheetObj.GetCellValue(Row, prefix+"item_pkgqty"),0);
				//sheetObj.CellValue2(Row, prefix+"item_cbm")     = "";
				//sheetObj.CellValue2(Row, prefix+"item_grs_kgs") = "";
				//sheetObj.CellValue2(Row, prefix+"item_net_kgs") = "";
			}
		} else {
			sheetObj.SetCellValue(Row, prefix+"item_sys_no","",0);
			sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"item_nm","",0);
			sheetObj.SetCellValue(Row, prefix+"lot_no","",0);
			//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = "";			
			//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = "";
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd","",0);
			//sheetObj.CellEditable(Row, prefix+"item_nm") = true;			
		}			
	} else if (colName == (prefix+"item_pkgunit") || colName == (prefix+"item_pkgqty")) {	
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
			// item sys no 존재시
			// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
			fnCalcItemEaQty(sheetObj, Row, Col);
		} else {
			sheetObj.SetCellValue(Row, prefix+"item_ea_qty",sheetObj.GetCellValue(Row, prefix+"item_pkgqty"),0);
		}
		setAutoCalTLT();
		/* else {
			// item sys no 미존재시 => popup 저장후 조회(item sys no) => qty
	var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+sheetObj.GetCellValue(Row, prefix + "item_cd");
			$.ajax({
				url : "searchWHItemCodeInfo.clt?"+sParam,
				success : function(result) {
					sheetObj.SetCellValue(Row, prefix+"item_sys_no",getXmlDataNullToNullString(result.xml, 'item_sys_no'),0);
					//sheetObj.CellValue2(Row, prefix+"item_cd")      = getXmlDataNullToNullString(result.xml, 'item_cd'); // Pack Master 등록을 위한 주석처리
					sheetObj.SetCellValue(Row, prefix+"item_nm",getXmlDataNullToNullString(result.xml, 'item_nm'),0);
					sheetObj.SetCellValue(Row, prefix+"lot_no",getXmlDataNullToNullString(result.xml, 'lot_no'),0);
					//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = getXmlDataNullToNullString(result.xml, 'item_pkgunit');					
					//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = getXmlDataNullToNullString(result.xml, 'item_pkgbaseqty');
					sheetObj.SetCellValue(Row, prefix+"lv1_cbm",getXmlDataNullToNullString(result.xml, 'lv1_cbm'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_cbf",getXmlDataNullToNullString(result.xml, 'lv1_cbf'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",getXmlDataNullToNullString(result.xml, 'lv1_grs_kgs'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",getXmlDataNullToNullString(result.xml, 'lv1_grs_lbs'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",getXmlDataNullToNullString(result.xml, 'lv1_net_kgs'),0);
					sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",getXmlDataNullToNullString(result.xml, 'lv1_net_lbs'),0);
					//sheetObj.CellValue2(Row, prefix+"item_remark")  = getXmlDataNullToNullString(result.xml, 'item_remark');	
					sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",getXmlDataNullToNullString(result.xml, 'pkg_lv1_qty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",getXmlDataNullToNullString(result.xml, 'pkg_lv1_unit_cd'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",getXmlDataNullToNullString(result.xml, 'item_pkgbaseqty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",getXmlDataNullToNullString(result.xml, 'item_pkgunit'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",getXmlDataNullToNullString(result.xml, 'pkg_lv3_qty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",getXmlDataNullToNullString(result.xml, 'pkg_lv3_unit_cd'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",getXmlDataNullToNullString(result.xml, 'pkg_lv4_qty'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",getXmlDataNullToNullString(result.xml, 'pkg_lv4_unit_cd'),0);
					sheetObj.SetCellValue(Row, prefix+"pkg_info",getXmlDataNullToNullString(result.xml, 'pkg_info'),0);
					//if (!ComIsNull(sheetObj.CellValue(Row, prefix+"item_nm"))) {	
					//	sheetObj.CellEditable(Row, prefix+"item_nm") = false;
					//} else {
					//	sheetObj.CellEditable(Row, prefix+"item_nm") = true;
					//}					
					if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						sheetObj.SelectCell(Row,Col);
					}
					// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
	if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
						fnCalcItemEaQty(sheetObj, Row, Col);
					}
				}
			});			
		}*/		
	} else if (colName == (prefix+"unload_inbound_loc_nm")) {
		if(Value != ""){
			var sParam="f_loc_cd="+ComGetObjValue(formObj.wh_cd)+"&f_wh_loc_nm="+Value+"&f_putaway_flg=Y&f_move_flg=Y";
			/*$.ajax({
				url : "searchWarehouseLocInfoForName.clt?"+sParam,
				success : function(result) {
					sheetObj.SetCellValue(Row,  Col,getXmlDataNullToNullString(result.xml,'wh_loc_nm'),0);
					sheetObj.SetCellValue(Row,  prefix+"unload_inbound_loc_cd",getXmlDataNullToNullString(result.xml,'wh_loc_cd'),0);
					if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						sheetObj.SelectCell(Row,  Col);
					}
				}
			});*/
			var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
			sheetObj.SetCellValue(Row,  Col,getXmlDataNullToNullString(sXml,'wh_loc_nm'),0);
			sheetObj.SetCellValue(Row,  prefix+"unload_inbound_loc_cd",getXmlDataNullToNullString(sXml,'wh_loc_cd'),0);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
				sheetObj.SelectCell(Row,  Col);
			}
		}else{
			sheetObj.SetCellValue(Row,  prefix+"unload_inbound_loc_cd","",0);
		}
	} else if (colName == (prefix+"item_cbm") && Value != "") {
		setAutoCalTLT();		
	} else if (colName == (prefix+"item_grs_kgs") && Value != "") {
		setAutoCalTLT();		
	}
	/* else if (colName == (prefix+"item_cbf") && Value != "") {
		funcKGS_CBM_CAC("CBF_CBM", (prefix+"item_cbf"), (prefix+"item_cbm"), sheetObj);		
	} else if (colName == (prefix+"item_grs_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (prefix+"item_grs_lbs"), (prefix+"item_grs_kgs"), sheetObj);		
	} else if (colName == (prefix+"item_net_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (prefix+"item_net_lbs"), (prefix+"item_net_kgs"), sheetObj);		
	}*/
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	//sheetObj.ImageList("seal") = "./web/images/common/icon_m.gif";	
	var prefix="Grd01";
	for(var i=0 ; i < sheetObj.RowCount(); i++){
		//setItemSheetEditable(sheetObj, i+sheetObj.HeaderRows, comboObjects[1].Code);
		//setBookingItemCellEditable(sheetObj, i+sheetObj.HeaderRows);	
		var Row=i+sheetObj.HeaderRows()
		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
	}
	setAutoCalTLT();
}
function setAutoCalTLT(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	if(formObj.item_ea_qty[0].value == null ){
		formObj.item_ea_qty[0].value=0;
	}
	if(formObj.item_cbm[0].value == null ){
		formObj.item_cbm[0].value=0;
	}
	if(formObj.item_grs_kgs[0].value == null ){
		formObj.item_grs_kgs[0].value=0;
	}
	if(formObj.item_grs_lbs[0].value == null ){
		formObj.item_grs_lbs[0].value=0;
	}
	//alert(ComAbsRound("123,456" / "1,345" * 100, 2));
	//alert(sheetObj.SumText(0, prefix+"item_ea_qty"));
	//alert(parseFloat(sheetObj.SumText(0, prefix+"item_ea_qty").replace(',','')));
	if(formObj.item_ea_qty[0].value == ''){
		formObj.item_ea_qty[0].value = 0;
	}
	if(formObj.item_cbm[0].value == ''){
		formObj.item_cbm[0].value = 0;
	}
	if(formObj.item_grs_kgs[0].value == ''){
		formObj.item_grs_kgs[0].value = 0;
	}
	if(formObj.item_grs_lbs[0].value == ''){
		formObj.item_grs_lbs[0].value = 0;
	}
	if(formObj.cal_item_cbm.value == ''){
		formObj.cal_item_cbm.value = 0;
	}
	if(formObj.cal_item_grs_kgs.value == ''){
		formObj.cal_item_grs_kgs.value = 0;
	}
	if(formObj.cal_item_grs_kgs.value == ''){
		formObj.cal_item_grs_kgs.value = 0;
	}
	
	 formObj.cal_item_ea_qty.value=ComAddComma(parseFloat(formObj.item_ea_qty[0].value) + parseFloat(ComTrimAll(sheetObj.GetSumText(0, prefix+"item_ea_qty"),',')));
	 formObj.cal_item_cbm.value=ComAddComma(parseFloat(formObj.item_cbm[0].value) + parseFloat(ComTrimAll(sheetObj.GetSumText(0, prefix+"item_cbm"),',')));
	 formObj.cal_item_grs_kgs.value=ComAddComma(parseFloat(formObj.item_grs_kgs[0].value) + parseFloat(ComTrimAll(sheetObj.GetSumText(0, prefix+"item_grs_kgs"),',')));
	 formObj.cal_item_grs_lbs.value=ComAddComma(ComAbsRound(parseFloat(formObj.item_grs_lbs[0].value) + parseFloat(ComTrimAll(sheetObj.GetSumText(0, prefix+"item_grs_kgs"),',')*CNVT_CNST_KG_LB3, 3)));
	if(formObj.std_cbm.value != 0 && parseFloat(ComTrimAll(formObj.cal_item_cbm.value,',')) != 0 ){
		formObj.cal_fill.value=ComAbsRound(parseFloat(ComTrimAll(formObj.cal_item_cbm.value,',')) / parseFloat(ComTrimAll(formObj.std_cbm.value,',')) * 100, 2);
	}else if(formObj.std_kgs.value != 0 && parseFloat(ComTrimAll(formObj.cal_item_grs_kgs.value,',')) != 0 ){
		formObj.cal_fill.value=ComAbsRound(parseFloat(ComTrimAll(formObj.cal_item_grs_kgs.value,',')) / parseFloat(ComTrimAll(formObj.std_kgs.value,',')) * 100, 2);
	}else{
		formObj.cal_fill.value=0;
	} 
}
function btn_New(){
}
var InputHeader="tpsz_cd|std_cbm|std_kgs|std_lbs|item_ea_qty|item_cbm|item_grs_kgs|item_grs_lbs";
function btn_Search(){
	var formObj=document.form;
	if (validateForm(docObjects[0],formObj,'Search')) {
 		var sXml=docObjects[0].GetSearchData("searchTransloadingInboundItemPopup.clt", FormQueryString(formObj,""));
		//docObjects[0].LoadSearchXml(sXml);
		var arrXml=sXml.split("|$$|");
		for(var i=0; i<arrXml.length; i++){
			if ( i== 0 ){
				if ( ComGetGetTotalRows()(arrXml[i]) > 0){
					ComsetXmlDataToForm2(arrXml[i], InputHeader, 0);
				}
			} else if ( i== 1 ){
				//docObjects[0].LoadSearchData(convertColOrder(arrXml[i],{Sync:1} );
				var convertedXml=convertColOrder(arrXml[i], "Grd01");
				docObjects[0].LoadSearchData(convertedXml,{Sync:1});
			}
		}
	}
}
function btn_Save() {
	if (ComDisableTdButton("btn_save", 1)) {
		return;
	}
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	if (isNull(formObj.wh_cd)) {
		// Warehouse 체크
		ComShowCodeMessage("COM0278", "Warehouse");
		ComSetFocus(formObj.wh_cd);
		return;
	}
	// Booking Item 필수입력 CHECK	
	if (sheetObj.RowCount()> 0) {
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
			// Item필수 입력 체크
			if (ComIsNull(sheetObj.GetCellValue(i, prefix+"item_cd")) && ComIsNull(sheetObj.GetCellValue(i, prefix+"item_nm"))) {
				ComShowCodeMessage("COM0162", i-1, "Item or Item Name");
				sheetObj.SelectCell(i, prefix+"item_cd");
				return;				
			} 
			if (ComIsNull(sheetObj.cellValue(i, prefix+"item_pkgunit"))) {
				ComShowCodeMessage("COM0162", i-1, "Package Unit");
				sheetObj.SelectCell(i, prefix+"item_pkgunit");
				return;				
			}
			if (ComIsNull(sheetObj.cellValue(i, prefix+"item_pkgqty")) || sheetObj.cellValue(i, prefix+"item_pkgqty") == 0) {
				ComShowCodeMessage("COM0162", i-1, "Package QTY");
				sheetObj.SelectCell(i, prefix+"item_pkgqty");
				return;
			}
		}		
	}	
	wb_save();
}
/**
 * Save
 */
function wb_save() {	
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	if (ComShowCodeConfirm("COM0036")) {
		var sParam=FormQueryString(formObj, "Grd00");
		sParam += "&" + GetSaveString(docObjects[0], true, true);
 		var saveXml=docObjects[0].GetSaveData("saveTransloadingInboundItem.clt", sParam);
 		docObjects[0].LoadSaveData(saveXml);
		// Save 후 조회
/*		
		if (saveXml.indexOf('<ERROR>') == -1) {			
			ComShowCodeMessage("COM0093", ""); // Saved successfully.
			var InputName="c_wib_bk_no";	
			ComsetXmlDataToForm2(saveXml, InputName, 0);
			btn_Search();
		}
*/
		if (saveXml.indexOf('<TR-ALL>OK</TR-ALL>') != -1) {
			var vMsg=ComGetMessageFromXml(saveXml);
			var vMsgs=vMsg.split("[");
			var vWbNo=vMsgs[1].replace("]", "");
			//ComSetObjValue(formObj.c_wib_bk_no, vWbNo);
			btn_Search();
		}
	}
}
function btn_Apply() {
	if (ComDisableTdButton("btn_apply", 1)) {
		return;
	}
	var openerformObj=opener.document.form;
	var openerSheetObj2=opener.docObjects[2];
	var sheetObj=docObjects[0];
	var openerprefix1="Grd03";
	var prefix="Grd01";
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i,prefix+"item_nm") == ""){
			ComShowCodeMessage("COM0114","Item Name");
			sheetObj.SelectCell(i, prefix+"item_nm");
			return;
		}
		if(sheetObj.GetCellValue(i,prefix+"item_pkgunit") == ""){
			ComShowCodeMessage("COM0114","Pakage Unit");
			sheetObj.SelectCell(i, prefix+"item_pkgunit");
			return;
		}
		if(sheetObj.GetCellValue(i,prefix+"item_pkgqty") == "" || sheetObj.GetCellValue(i,prefix+"item_pkgqty") == 0){
			ComShowCodeMessage("COM0114","Pakage Qty");
			sheetObj.SelectCell(i, prefix+"item_pkgqty");
			return;
		}
	}
	openerSheetObj2.RemoveAll();
	var item_cd="";
	var item_nm="";
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow(); i++) {
		row=openerSheetObj2.DataInsert(-1);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_cd",sheetObj.GetCellValue(i,prefix+"item_cd"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_nm",sheetObj.GetCellValue(i,prefix+"item_nm"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_ea_qty",sheetObj.GetCellValue(i,prefix+"item_ea_qty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_pkgunit",sheetObj.GetCellValue(i,prefix+"item_pkgunit"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_pkgqty",sheetObj.GetCellValue(i,prefix+"item_pkgqty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"unload_inbound_loc_nm",sheetObj.GetCellValue(i,prefix+"unload_inbound_loc_nm"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lot_no",sheetObj.GetCellValue(i,prefix+"lot_no"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_cbm",sheetObj.GetCellValue(i,prefix+"item_cbm"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_net_kgs",sheetObj.GetCellValue(i,prefix+"item_net_kgs"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_grs_kgs",sheetObj.GetCellValue(i,prefix+"item_grs_kgs"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"po_sys_no",sheetObj.GetCellValue(i,prefix+"po_sys_no"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_sys_no",sheetObj.GetCellValue(i,prefix+"item_sys_no"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"org_qty",sheetObj.GetCellValue(i,prefix+"org_qty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"item_seq",sheetObj.GetCellValue(i,prefix+"item_seq"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"ctrt_no",sheetObj.GetCellValue(i,prefix+"ctrt_no"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv1_qty",sheetObj.GetCellValue(i,prefix+"pkg_lv1_qty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv1_unit_cd",sheetObj.GetCellValue(i,prefix+"pkg_lv1_unit_cd"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv2_qty",sheetObj.GetCellValue(i,prefix+"pkg_lv2_qty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv2_unit_cd",sheetObj.GetCellValue(i,prefix+"pkg_lv2_unit_cd"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv3_qty",sheetObj.GetCellValue(i,prefix+"pkg_lv3_qty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv3_unit_cd",sheetObj.GetCellValue(i,prefix+"pkg_lv3_unit_cd"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv4_qty",sheetObj.GetCellValue(i,prefix+"pkg_lv4_qty"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"pkg_lv4_unit_cd",sheetObj.GetCellValue(i,prefix+"pkg_lv4_unit_cd"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lv1_cbm",sheetObj.GetCellValue(i,prefix+"lv1_cbm"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lv1_cbf",sheetObj.GetCellValue(i,prefix+"lv1_cbf"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lv1_grs_kgs",sheetObj.GetCellValue(i,prefix+"lv1_grs_kgs"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lv1_grs_lbs",sheetObj.GetCellValue(i,prefix+"lv1_grs_lbs"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lv1_net_kgs",sheetObj.GetCellValue(i,prefix+"lv1_net_kgs"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"lv1_net_lbs",sheetObj.GetCellValue(i,prefix+"lv1_net_lbs"),0);
		openerSheetObj2.SetCellValue(row,openerprefix1+"unload_inbound_loc_cd",sheetObj.GetCellValue(i,prefix+"unload_inbound_loc_cd"),0);
		item_cd=sheetObj.GetCellValue(2, prefix+"item_cd");
		item_nm=sheetObj.GetCellValue(2, prefix+"item_nm");
	}
	openerformObj.item_cd.value=item_cd;
	openerformObj.item_nm.value=item_nm;
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	var rate_no=sheetObj.GetCellValue(Row,"rate_no");
	var ctrt_no=sheetObj.GetCellValue(Row,"ctrt_no");
	if ( sheetObj.ColSaveName(Col) == "rate_no" && !ComIsNull(rate_no)){
		formObj.select_ctrt_no.value=ctrt_no;
		comboObjects[2].SetSelectCode(sheetObj.GetCellValue(Row,"rate_no"));
	}
}
function sheet3_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	var rate_no=sheetObj.GetCellValue(Row,"rate_no");
	var ctrt_no=sheetObj.GetCellValue(Row,"ctrt_no");
	if ( sheetObj.ColSaveName(Col) == "rate_no" && !ComIsNull(rate_no)){
		formObj.select_ctrt_no.value=ctrt_no;
		comboObjects[3].SetSelectCode(sheetObj.GetCellValue(Row,"rate_no"));
	}
}
function sell_filer_OnChange(formObj, Code, Text){
	var formObj=document.form;
	var sParam="ctrt_no="+formObj.ctrt_no.value+"&org_cd="+formObj.org_cd.value+"&sb_cls_cd=S";
			   //+sheetObj.cellvalue(Row, "frt_mode")+"&rate_no="+sheetObj.cellvalue(Row, "rate_no");
	if(Code=="AA"){
		sParam=sParam + "&frt_mode=A";
	} else if(Code=="SA"){
		sParam=sParam + "&frt_mode=S";
	} else if(Code=="DA"){
		sParam=sParam + "&frt_mode=D";
	} else if(Code!="A" && Code!="" ){
		sParam=sParam + "&rate_no="+Code;
	}
 	var sXml=docObjects[1].GetSearchData("searchFreightSellBuyRateList.clt", sParam);
	if( Code!="" ){
		//docObjects[1].LoadSearchData(convertColOrder(sXml,{Sync:1} );
		var convertedXml=convertColOrder(sXml, "");
		docObjects[1].LoadSearchData(convertedXml,{Sync:1});
	} else {
		docObjects[1].RemoveAll();
	}
	return true;
}
function buy_filer_OnChange(formObj, Code, Text){
	var formObj=document.form;
	var sParam="ctrt_no="+formObj.ctrt_no.value+"&org_cd="+formObj.org_cd.value+"&sb_cls_cd=B";
			   //+sheetObj.cellvalue(Row, "frt_mode")+"&rate_no="+sheetObj.cellvalue(Row, "rate_no");
	if(Code=="AA"){
		sParam=sParam + "&frt_mode=A";
	} else if(Code=="SA"){
		sParam=sParam + "&frt_mode=S";
	} else if(Code=="DA"){
		sParam=sParam + "&frt_mode=D";
	} else if(Code!="A" && Code!="" ){
		sParam=sParam + "&rate_no="+Code;
	}
 	var sXml=docObjects[1].GetSearchData("searchFreightSellBuyRateList.clt", sParam);
	if( Code!="" ){
		//docObjects[3].LoadSearchData(convertColOrder(sXml,{Sync:1} );
		var convertedXml=convertColOrder(sXml, "");
		docObjects[3].LoadSearchData(convertedXml,{Sync:1});
	} else {
		docObjects[3].RemoveAll();
	}
	return true;
}
//function sell_filer_OnChange(formObj, Code, Text){
//	var formObj = document.form;
//	var flag = "N";
//	var sParam = "ctrt_no="+formObj.ctrt_no.value+"&sb_cls_cd=S";
//	if(Code=="AA"){
//		sParam = sParam + "&frt_mode=A";
//	} else if(Code=="SA"){
//		sParam = sParam + "&frt_mode=S";
//	} else if(Code=="DA"){
//		sParam = sParam + "&frt_mode=D";
//	} else if(Code!="A" && Code!="" ){
//		sParam = sParam + "&rate_no="+Code;
//		flag = "Y";
//	}
//	detail_button(flag, "S");
//	if( Code!="" ){
//		var sXml = docObjects[1].GetSearchXml("searchRTDetailList.clt", sParam);
//		docObjects[1].LoadSearchXml(convertColOrder(sXml, "Grd02"));
//	} else {
//		docObjects[1].RemoveAll();
//	}
//	return true;
//}
/**
 * 시트 클릭 시 메모패드 오픈 
 */ 
function sheet1_OnClick(SheetObj, Row, Col){
	 if (SheetObj.ColSaveName(Col) == "commodity_desc")
	 {
		ComShowMemoPad2(SheetObj,Row,20,false,326,100,4000,19);         		
	 }    		          	 
}
function sheet2_OnClick(SheetObj, Row, Col){
	 if (SheetObj.ColSaveName(Col) == "rmk")
	 {
		ComShowMemoPad2(SheetObj,Row,11,false,326,100,4000,11);         		
	 }    		          	 
}
function sheet3_OnClick(SheetObj, Row, Col){
	 if (SheetObj.ColSaveName(Col) == "commodity_desc")
	 {
		ComShowMemoPad2(SheetObj,Row,21,false,326,100,4000,21);         		
	 }    		          	 
}
function sheet4_OnClick(SheetObj, Row, Col){
	 if (SheetObj.ColSaveName(Col) == "11")
	 {
		ComShowMemoPad2(SheetObj,Row,11,false,326,100,4000,11);         		
	 }    		          	 
}
//function sheet1_OnClick(sheetObj, Row, Col){
//	var formObj = document.form;
//	
//	var sParam = "ctrt_no="+sheetObj.cellvalue(Row, "ctrt_no")+"&org_cd="+formObj.org_cd.value
//			   +"&sb_cls_cd="+sheetObj.cellvalue(Row, "sb_cls_cd")+"&frt_mode="
//			   +sheetObj.cellvalue(Row, "frt_mode")+"&rate_no="+sheetObj.cellvalue(Row, "rate_no");
//	
//	var sXml = docObjects[1].GetSearchXml("searchFreightSellBuyRateList.clt", sParam);
//	
//	docObjects[1].LoadSearchXml(sXml);
//}
//function sheet3_OnClick(sheetObj, Row, Col){
//	var formObj = document.form;
//	
//	var sParam = "ctrt_no="+sheetObj.cellvalue(Row, "ctrt_no")+"&org_cd="+formObj.org_cd.value
//			   +"&sb_cls_cd="+sheetObj.cellvalue(Row, "sb_cls_cd")+"&frt_mode="
//			   +sheetObj.cellvalue(Row, "frt_mode")+"&rate_no="+sheetObj.cellvalue(Row, "rate_no");
//	
//	var sXml = docObjects[3].GetSearchXml("searchFreightSellBuyRateList.clt", sParam);
//	
//	docObjects[3].LoadSearchXml(sXml);
//}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");
		var cal=new ComCalendar();
		switch(srcName) {
			case "btn_eff_dt":
				cal.select(formObj.eff_dt,'MM-dd-yyyy');
				break;
			case "btn_ctrt_no" :
				var sUrl="ContractRoutePopup.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ctrt_nm="+ComGetObjValue(formObj.ctrt_nm)+"&mgmt_flg=Y" ;
				ComOpenPopup(sUrl, 900, 700, "setCtrtNoInfo", "0,0", true);
				break;
			case "btn_por" :
				var sUrl="RateLocPopup.clt?code_cd="+ComGetObjValue(formObj.por)+"&code_nm="+ComGetObjValue(formObj.por_nm);
				ComOpenPopup(sUrl, 760, 500, "setLocPor", "0,0", true);
				break;
			case "btn_pol" :
				var sUrl="RateLocPopup.clt?code_cd="+ComGetObjValue(formObj.pol)+"&code_nm="+ComGetObjValue(formObj.pol_nm);
				ComOpenPopup(sUrl, 760, 500, "setLocPol", "0,0", true);
				break;
			case "btn_pod" :
				var sUrl="RateLocPopup.clt?code_cd="+ComGetObjValue(formObj.pod)+"&code_nm="+ComGetObjValue(formObj.pod_nm);
				ComOpenPopup(sUrl, 760, 500, "setLocPod", "0,0", true);
				break;
			case "btn_del" :
				var sUrl="RateLocPopup.clt?code_cd="+ComGetObjValue(formObj.del)+"&code_nm="+ComGetObjValue(formObj.del_nm);
				ComOpenPopup(sUrl, 760, 500, "setLocDel", "0,0", true);
				break;
			case "btn_carrier" :
				var formObj=document.form;
			   	var sUrl="CustomerPopup.clt?cust_cd="+ComGetObjValue(formObj.carrier_cd)+"&cust_nm="+ComGetObjValue(formObj.carrier_nm);
				ComOpenPopup(sUrl, 900, 650, "setCarrier", "0,0", true);
				break;
			case "btn_co_loader" :				
				var formObj=document.form;
			   	var sUrl="CustomerPopup.clt?cust_cd="+ComGetObjValue(formObj.co_loader_cd)+"&cust_nm="+ComGetObjValue(formObj.co_loader_nm);
				ComOpenPopup(sUrl, 900, 650, "setCoLoader", "0,0", true);
				break;
			case "chk_sea" :
 				if ( formObj.chk_sea.checked == true ){
 					if(formObj.frt_mode.value.length > 0){
 						formObj.frt_mode.value=formObj.frt_mode.value + ",";
 					}
 					formObj.frt_mode.value=formObj.frt_mode.value + "\'S\'";
				} else {
					formObj.frt_mode.value=formObj.frt_mode.value.replace(/\,'S\'/g,"");
					formObj.frt_mode.value=formObj.frt_mode.value.replace(/\'S\'/g,"");
					if(formObj.frt_mode.value.indexOf(",")== 0){
						formObj.frt_mode.value=formObj.frt_mode.value.replace(/,/,"");
					}
				}
 				break;
 			case "chk_air" :	
 				if ( formObj.chk_air.checked == true ){
 					if(formObj.frt_mode.value.length > 0){
 						formObj.frt_mode.value=formObj.frt_mode.value + ",";
 					}
 					formObj.frt_mode.value=formObj.frt_mode.value + "\'A\'";
				} else {
					formObj.frt_mode.value=formObj.frt_mode.value.replace(/\,'A\'/g,"");
					formObj.frt_mode.value=formObj.frt_mode.value.replace(/\'A\'/g,"");
					if(formObj.frt_mode.value.indexOf(",")== 0){
						formObj.frt_mode.value=formObj.frt_mode.value.replace(/,/,"");
					}
				}
 				break;
 			case "chk_dom" :	
 				if ( formObj.chk_dom.checked == true ){
 					if(formObj.frt_mode.value.length > 0){
 						formObj.frt_mode.value=formObj.frt_mode.value + ",";
 					}
 					formObj.frt_mode.value=formObj.frt_mode.value + "\'D\'";
				} else {
					formObj.frt_mode.value=formObj.frt_mode.value.replace(/\,'D\'/g,"");
					formObj.frt_mode.value=formObj.frt_mode.value.replace(/\'D\'/g,"");
					if(formObj.frt_mode.value.indexOf(",")== 0){
						formObj.frt_mode.value=formObj.frt_mode.value.replace(/,/,"");
					}
				}
 				break;
 			case "btn_row_add":	
				row_Add();
				break;		
			case "btn_row_del":	
				row_Del();
				break;
			case "btn_save":	
				btn_Save();
				break;
			case "btn_apply":	
				btn_Apply();
				break;
			case "btn_Close":	
				btn_Close();
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
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.ctrt_no,    		aryPopupData[0][0]);
	ComSetObjValue(formObj.ctrt_nm,    		aryPopupData[0][1]);	
}
function setLocPor(aryPopupData)
{
	var formObj=document.form;
	ComSetObjValue(formObj.por,    		aryPopupData[0][1]);
	ComSetObjValue(formObj.por_nm,    	aryPopupData[0][2]);
}
function setLocPol(aryPopupData)
{
	var formObj=document.form;
	ComSetObjValue(formObj.pol,    		aryPopupData[0][1]);
	ComSetObjValue(formObj.pol_nm,    	aryPopupData[0][2]);
}
function setLocPod(aryPopupData)
{
	var formObj=document.form;
	ComSetObjValue(formObj.pod,    		aryPopupData[0][1]);
	ComSetObjValue(formObj.pod_nm,    	aryPopupData[0][2]);
}
function setLocDel(aryPopupData)
{
	var formObj=document.form;
	ComSetObjValue(formObj.del,    		aryPopupData[0][1]);
	ComSetObjValue(formObj.del_nm,    	aryPopupData[0][2]);
}
function setCarrier(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.carrier_cd,  aryPopupData[0][1]);
	ComSetObjValue(formObj.carrier_nm,  aryPopupData[0][9]);
}
function setCoLoader(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.co_loader_cd,  aryPopupData[0][1]);
	ComSetObjValue(formObj.co_loader_nm,  aryPopupData[0][9]);
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
//	switch (sAction) {
//		case 'Search':
//			if (ComIsEmpty(formObj.in_ctrt_no)) {
//				ComShowCodeMessage("COM0125","Contract No.");
//				formObj.in_ctrt_no.focus();
//				return false;
//			}			
//			break;
//	}
	return true;
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {	
			case "ctrt_nm" :
				processButtonClick("btn_ctrt_no");
				break;
			case "por_nm" :
				processButtonClick("btn_por");
				break;
			case "pol_nm" :
				processButtonClick("btn_pol");
				break;
			case "pod_nm" :
				processButtonClick("btn_pod");
				break;
			case "del_nm" :
				processButtonClick("btn_del");
				break;
			case "carrier_nm" :
				processButtonClick("btn_carrier");
				break;
			case "co_loader_nm" :
				processButtonClick("btn_co_loader");
				break;
			default:				
				form_onChange();				
				break;
		}
	}
	return true;
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
	var val="";
	switch(srcName) {
		case "ctrt_no" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
			}else{
				ComSetObjValue(form.ctrt_no, "");
				ComSetObjValue(form.ctrt_nm, "");
			}
			break;
		case "carrier_cd" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.carrier_cd), "carrier_cd");
			}else{
				ComSetObjValue(form.carrier_cd, "");
				ComSetObjValue(form.carrier_nm, "");
			}
			break;
		case "por" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.por), "por");
			}else{
				ComSetObjValue(form.por, "");
				ComSetObjValue(form.por_nm, "");
			}
			break;
		case "pol" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.pol), "pol");
			}else{
				ComSetObjValue(form.pol, "");
				ComSetObjValue(form.pol_nm, "");
			}
			break;
		case "pod" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.pod), "pod");
			}else{
				ComSetObjValue(form.pod, "");
				ComSetObjValue(form.pod_nm, "");
			}
			break;
		case "del" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.del), "del");
			}else{
				ComSetObjValue(form.del, "");
				ComSetObjValue(form.del_nm, "");
			}
			break;
		case "co_loader_cd" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.co_loader_cd), "co_loader_cd");
			}else{
				ComSetObjValue(form.co_loader_cd, "");
				ComSetObjValue(form.co_loader_nm, "");
			}
			break;
	}
}
function searchAjaxColInfo(formObj, value, col){
	var formObj=document.form;
	if(col=="ctrt_no"){
		var param="ctrt_no="+value;
		/*$.ajax({
			url : "searchTlCtrtInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.ctrt_no, 			getXmlDataNullToNullString(result.xml,'ctrt_no'));
				ComSetObjValue(form.ctrt_nm, 			getXmlDataNullToNullString(result.xml,'ctrt_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlCtrtInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.ctrt_no, 			getXmlDataNullToNullString(sXml,'ctrt_no'));
		ComSetObjValue(form.ctrt_nm, 			getXmlDataNullToNullString(sXml,'ctrt_nm'));
	} else if(col=="carrier_cd"){
		var param="cust_cd="+value;	
		/*$.ajax({
			url : "searchTlCustInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.carrier_cd, 	getXmlDataNullToNullString(result.xml,'cust_cd'));
				ComSetObjValue(form.carrier_nm, 	getXmlDataNullToNullString(result.xml,'cust_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlCustInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.carrier_cd, 	getXmlDataNullToNullString(sXml,'cust_cd'));
		ComSetObjValue(form.carrier_nm, 	getXmlDataNullToNullString(sXml,'cust_nm'));
	} else if(col=="por"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.por, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				ComSetObjValue(form.por_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.por, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		ComSetObjValue(form.por_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="pol"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.pol, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				ComSetObjValue(form.pol_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.pol, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		ComSetObjValue(form.pol_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="pod"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.pod, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				ComSetObjValue(form.pod_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.pod, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		ComSetObjValue(form.pod_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="del"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.del, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				ComSetObjValue(form.del_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.del, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		ComSetObjValue(form.del_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="co_loader_cd"){
		var param="cust_cd="+ value;	
		/*$.ajax({
			url : "searchTlCustInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				ComSetObjValue(form.co_loader_cd, 	getXmlDataNullToNullString(result.xml,'cust_cd'));
				ComSetObjValue(form.co_loader_nm, getXmlDataNullToNullString(result.xml,'cust_nm'));
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchTlCustInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.co_loader_cd, 	getXmlDataNullToNullString(sXml,'cust_cd'));
		ComSetObjValue(form.co_loader_nm, getXmlDataNullToNullString(sXml,'cust_nm'));
	}	
}
function btn_OK() {	
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var row="";
	var openerprefix1="Grd04";
	//var prefix1="Grd02";
	var openerprefix2="Grd05";
	//var prefix2="Grd03";
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[3];
	var openerSheetObj1=opener.docObjects[1];
	var openerSheetObj2=opener.docObjects[2];
	for(var i=sheetObj1.HeaderRows(); i<=sheetObj1.LastRow(); i++) {
		if( sheetObj1.GetCellValue(i, "chk") == '1' ){
			row=openerSheetObj1.DataInsert(-1);
			openerSheetObj1.SetCellValue(row,openerprefix1+"frt_br_cd",sheetObj1.GetCellValue(i,"ofc_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"cust_cd",sheetObj1.GetCellValue(i,"cust_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"cust_nm",sheetObj1.GetCellValue(i,"cust_nm"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"frt_cd",sheetObj1.GetCellValue(i,"frt_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"frt_nm",sheetObj1.GetCellValue(i,"frt_nm"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"curr_cd",sheetObj1.GetCellValue(i,"curr_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"unit_cd",sheetObj1.GetCellValue(i,"unit_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"unit_price",sheetObj1.GetCellValue(i,"unit_price"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"val_cls_cd",sheetObj1.GetCellValue(i,"sell_vat_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"cust_org_yn",sheetObj1.GetCellValue(i,"org_yn"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"internal_sts_cd","",0);
			if ( openerSheetObj1.GetCellValue(row, openerprefix1+"curr_cd") == openerformObj.sell_loc_curr_cd.value ) {
				openerSheetObj1.SetCellValue(row, openerprefix1+"exrate",1,0);
			} else if ( openerSheetObj1.GetCellValue(row, openerprefix1+"curr_cd") == openerformObj.sell_curr_cd.value ) {
				openerSheetObj1.SetCellValue(row, openerprefix1+"exrate",openerformObj.sell_exrate.value,0);
			}
			opener.setUnit(row, 'S');
			if(openerformObj.ctry_cd.value == 'IN'){
				openerSheetObj1.SetCellEditable(row, openerprefix1+"val_cls_cd",0);
			}
		} 
	}
	for(var i=sheetObj2.HeaderRows(); i<=sheetObj2.LastRow(); i++) {
		if( sheetObj2.GetCellValue(i, "chk") == '1' ){
			row=openerSheetObj2.DataInsert(-1);
			openerSheetObj2.SetCellValue(row,openerprefix2+"frt_br_cd",sheetObj2.GetCellValue(i,"ofc_cd"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"cust_cd",sheetObj2.GetCellValue(i,"cust_cd"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"cust_nm",sheetObj2.GetCellValue(i,"cust_nm"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"frt_cd",sheetObj2.GetCellValue(i,"frt_cd"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"frt_nm",sheetObj2.GetCellValue(i,"frt_nm"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"curr_cd",sheetObj2.GetCellValue(i,"curr_cd"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"unit_cd",sheetObj2.GetCellValue(i,"unit_cd"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"unit_price",sheetObj2.GetCellValue(i,"unit_price"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"val_cls_cd",sheetObj2.GetCellValue(i,"buy_vat_cd"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"cust_org_yn",sheetObj2.GetCellValue(i,"org_yn"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"internal_sts_cd","",0);
			if ( openerSheetObj2.GetCellValue(row, openerprefix2+"curr_cd") == openerformObj.buy_loc_curr_cd.value ) {
				openerSheetObj2.SetCellValue(row, openerprefix2+"exrate",1,0);
			} else if ( openerSheetObj2.GetCellValue(row, openerprefix2+"curr_cd") == openerformObj.buy_curr_cd.value ) {
				openerSheetObj2.SetCellValue(row, openerprefix2+"exrate",openerformObj.buy_exrate.value,0);
			}
			opener.setUnit(row, 'B');
		} 
	}
  ComClosePopup(); 
}
function row_Add() {	
	var formObj = document.form;
	if (formObj.btn_row_add.disabled) {
		return;
	}
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	var insertRow=sheetObj.DataInsert(-1);
	sheetObj.SetSumText(0, 2, "TOTAL");
}
function row_Del() {
	var formObj = document.form;
	if (formObj.btn_row_del.disabled) {
		return;
	}
	var prefix="Grd01";
	var sheetObj=docObjects[0];
	//ComRowHideDelete(sheetObj, prefix+"del_chk", true);
	//체크박스에 체크된 행 전체를 문자열로 가져온다. 결과 : "1|3|5|"
	var sRow=sheetObj.FindCheckedRow(prefix+"del_chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return ;
	}
	//가져온 행을 배열로 만들기 
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
	for (var idx=arrRow.length; idx>=0; idx--){
		var row=arrRow[idx];
		sheetObj.SetCellValue(row, prefix+"del_chk",0,0);//1.체크박스 없애기 (체크된데이터만 다른 처리 하는 경우도 있으므로)
		sheetObj.SetRowHidden(row,1);//2.행 숨기기
		sheetObj.SetRowStatus(row,"D");
	}	
	sheetObj.CheckAll(prefix+"del_chk",0);
}
function btn_Close() {
  ComClosePopup(); 
}
function ComAbsRound(obj, pos) {
    try {
        //첫번째 인자가 문자열 또는 HTML태그(Object)인 경우 처리
        var num = getArgValue(obj);
        var minus = 1;

        if (pos==undefined || pos==null ) pos = 2;

        var posV = Math.pow(10, pos);
        
        if ( num < 0 ) minus = -1;
        	
        return Math.round(Math.abs(num)*posV)/posV*minus;
    } catch(err) { ComFuncErrMsg(err.message); }
}