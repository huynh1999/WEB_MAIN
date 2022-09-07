/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LoadPlanMgmt.js
*@FileTitle  : Loading Plan
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var check_flg="N";
var cnt=0;
var main_tree_name="";
var detail_ship_no="";
var detail_id_seq="";
var loading_flag="N";
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObject=document.form;
//	doShowProcess(true);
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
//	doHideProcess();
    loading_flag="Y";
	//initControl();
	if ( !ComIsEmpty(document.form.consol_no.value)){
		btn_Search();
	}
	set_btn('S');
	IBS_RestoreGridSetting(formObject.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('blur', 	'form_deactivate', formObject);   
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);  
    // OnChange 이벤트
    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
	      //var hdr1="ibflag||tree_nodetype|tree_value|Doc No|Doc No|Item|Item Name|EA Qty|CBM|GWT|NWT|PO No(OUT)|sao_sys_no|po_sys_no|item_sys_no|shipno|shipno_seq|ship_no_seq|pc_ship_ltno|merge_yn|consol_no|item_lot|lot_id";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	      var headers = [ { Text:getLabel('LoadPlanMgmt_HDR1'), Align:"Center"} ];	
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	             {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk" },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_nodetype",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_value",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_name",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   TreeCol:1 ,  LevelSaveName:"tree_nodetype" },
	             {Type:"Image",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"image",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"item_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Int",       Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_qty",       KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_cbm",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_grs_kgs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"item_net_kgs",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sao_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sao_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"item_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"shipno",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"shipno_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ship_no_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pc_ship_ltno",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"merge_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"consol_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_lot",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lot_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetSheetHeight(270);
	      SetVisible(1);
	      SetImageList(1,"web/img/main/btn_s_delete.gif");
	      SetImageList(2,"");
//	      SetImageList(2,"web/img/main/btn_1_bg.gif");
	      SetImageList(3,"web/img/main/btn_s_merge.gif");
	      SetImageList(4,"web/img/main/btn_s_split.gif");
	      SetWaitImageVisible(0);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	      }
	      break;


		case 2:      //IBSheet2 init
		    with(sheetObj){
	        
//	      var hdr1="||tree_nodetype|tree_value|tree_name|wob_bk_no|item_cd|item_nm|item_lot|cust_ord_no|lp_item_ea_qty|lp_item_cbm|lp_item_grs_kgs|lp_item_net_kgs|lot_id" +
//	      "|id|seq|id_seq|lp_item_cbf|lp_item_grs_lbs|lp_item_net_lbs|shipno|shipno_seq|so_no|wib_bk_no|sao_sys_no|po_sys_no|item_sys_no|wh_loc_cd" +
//	      "|item_seq|sao_no|po_no|lp_status|lp_ship_ltno|lp_ship_seq_ltno|lp_old_id|lp_old_seq|lp_id|lp_seq|eq_tp_cd";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	      var headers = [ { Text:getLabel('LoadPlanMgmt_HDR2'), Align:"Center"} ];	
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"chk",               KeyField:0 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_nodetype",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"tree_value",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:55,   Align:"Left",    ColMerge:1,   SaveName:"tree_name",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   TreeCol:1 ,  LevelSaveName:"upperOrgId" },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"wob_bk_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"item_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"item_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"item_lot",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cust_ord_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_ea_qty",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_cbm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_grs_kgs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"lp_item_net_kgs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lot_id",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"id",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"seq",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"id_seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_item_cbf",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_item_grs_lbs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lp_item_net_lbs",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"shipno",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"shipno_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"so_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"wib_bk_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
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
	      SetWaitImageVisible(0);
	      SetRowHidden(0, 1);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
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
	ComResizeSheet(docObjects[1]);
}
function btn_New(){
	
	var currLocUrl=this.location.href;
	var hasPlNo = currLocUrl.indexOf("consol_no");
	if(hasPlNo > 0){
		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	
		//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
		window.location.href = currLocUrl;
	}else{
	
		var formObj=document.form;
		formObj.reset();
		formObj.consol_no.value="";
		docObjects[0].RemoveAll();
		docObjects[1].RemoveAll();
		set_btn("S");
	}
}
function btn_Cancel(){
//	alert('This button is deverloping');
//	return;
	var formObj=document.form;	
	var sParam='';
	if ( !ComIsEmpty(formObj.f_consol_no.value)){
		if (ComShowCodeConfirm("COM0011")){	
			doShowProcess(true);
			formObj.f_cmd.value = MODIFY;
			sParam=FormQueryString(formObj, "");	
 			var sXml=docObjects[0].GetSaveData("./cancelLoadPlan.clt", sParam);
			
 			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			if($xml.find("rtncd").text() == "N"){
				ComShowMessage($xml.find("message").text())
			}else if($xml.find("res").text() == "1"){
				showCompleteProcess();
				btn_New();
			}	
			doHideProcess();
		}
	}
}
function btn_Search() {	
	var formObj=document.form;
	doShowProcess();
	setTimeout(function(){
	var sXml="";
	if(loading_flag != "Y"){
		return;
	}
	if ( ComIsEmpty(formObj.consol_no.value) ){
		ComShowCodeMessage("COM0131");
		doHideProcess();
		return ;
	}
	cnt=0;
	formObj.f_cmd.value = SEARCH;
	var parm=FormQueryString(formObj,"");
 	sXml=docObjects[0].GetSearchData("./existsLOADPLAN.clt", parm);
 	var xmlDoc = $.parseXML(sXml);
	  var $xml = $(xmlDoc);
	  formObj.s_wh_cd.value = $xml.find("wh_cd").text();
	  if($xml.find("consol_no").text()=='')
	  {
	  	ComShowCodeMessage("COM0131");
		doHideProcess();
		return ;
	  } else {
		/*$.ajax({
			url : "searchLPShipmentList.clt?"+parm,
			success : function(result) {
				ShipmentList_Load(result.xml);
			}
		});*/
		var sXml = "";
		formObj.f_cmd.value = SEARCH01;
		var parm=FormQueryString(formObj,"");
//		sXml=docObjects[0].GetSearchData("searchLPShipmentList.clt?"+parm);
		sXml=docObjects[0].GetSearchData("./searchLPShipmentList.clt",parm);
		ShipmentList_Load(sXml);
		
		/*$.ajax({
			url : "searchLPCNTRParentList.clt?"+parm,
			success : function(result) {
				CNTRParentList_Load(result.xml);
			}
		});*/
		sXml = "";
		formObj.f_cmd.value = SEARCH02;
		var parm=FormQueryString(formObj,"");
		sXml=docObjects[0].GetSearchData("./searchLPCNTRParentList.clt",parm);
		CNTRParentList_Load(sXml);
		
		/*$.ajax({
			url : "searchLPVolume.clt?"+parm,
			success : function(result) {
				Volume_Load(result.xml);
			}
		});*/
		sXml = "";
		formObj.f_cmd.value = SEARCH03;
		var parm=FormQueryString(formObj,"");
		sXml=docObjects[0].GetSearchData("./searchLPVolume.clt",parm);
		Volume_Load(sXml);
	}
	  doHideProcess();
	},100);
	
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	sheetObj = sheet1;
	check_authority_wh();
}
function ShipmentList_Load(resultXml){
	var i=0;
	docObjects[0].LoadSearchData(resultXml,{Sync:1} );
	docObjects[0].ShowTreeLevel(0,1);
	for(i=0;i<docObjects[0].RowCount()+1;i++){
		if(docObjects[0].GetCellValue(i,"tree_nodetype")=="3"){
 			docObjects[0].SetCellImage(i,"image",2);
		} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="4"){
			if (docObjects[0].GetCellValue(i,"merge_yn") == "Y"){
 				docObjects[0].SetCellImage(i,"image",3);
			} else {
 				docObjects[0].SetCellImage(i,"image",2);
			}
		} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="5"){
 			docObjects[0].SetCellImage(i,"image",4);
		} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="1"){
 			docObjects[0].SetCellImage(i,"image",1);
		} else{
 			docObjects[0].SetCellImage(i,"image","");
		}
	}
	if( docObjects[0].RowCount() == 1 ){
		docObjects[0].RowDelete(1, false);
	}
	cnt=cnt+1;
	if(cnt==3){
		doHideProcess();
	}
	main_tree_search();
}
function CNTRParentList_Load(resultXml){
	var row=0;
	var i=0
	docObjects[1].LoadSearchData(resultXml,{Sync:1} );
	docObjects[1].ShowTreeLevel(0, 1);
	for (i=0;i<docObjects[1].RowCount()+1;i++){
		row=docObjects[1].FindText(5, "Booking No", i+1,-1);
		if( row != -1){
			docObjects[1].SetRowBackColor(row,"#CEE3E9");
			docObjects[1].SetRowFontColor(row,"#2F2D77");
			i=row;
		}else{
			break;
		}
	}
	for (i=0;i<docObjects[1].RowCount()+1;i++){
		row=docObjects[1].FindText(2, "1", i+1,-1);
		if( row != -1){
			docObjects[1].SetRowBackColor(row,"#CEE3E9");
			docObjects[1].SetRowFontColor(row,"#2F2D77");
 			docObjects[1].SetCellFontColor(row,"po_no","#0100FF");
 			
 			docObjects[1].SetCellFontUnderline(row,"po_no", 1);
			i=row;
		}else{
			break;
		}
	}
	for (i=0;i<docObjects[1].RowCount()+1;i++){
if (ComIsEmpty(docObjects[1].GetCellValue(i,"tree_nodetype")) ){
			docObjects[1].RowDelete(i, false);
		}
	}
	set_btn("E");
	cnt=cnt+1;
	if(cnt==3){
		doHideProcess();
	}
	detail_tree_search();
}
function Volume_Load(resultXml){
	var formObj=document.form;
	var xmlDoc = $.parseXML(resultXml);
	var $xml = $(xmlDoc);
	formObj.ttl_qty.value= $xml.find("ttl_item_ea_qty").text();
	formObj.ttl_cbm.value= $xml.find("ttl_item_cbm").text();
	formObj.ttl_grs_kgs.value= $xml.find("ttl_item_grs_kgs").text();
	formObj.ttl_net_kgs.value= $xml.find("ttl_item_net_kgs").text();
	formObj.f_consol_no.value= $xml.find("f_consol_no").text();
	formObj.sel_qty.value=0;
	formObj.sel_cbm.value=0;
	formObj.sel_grs_kgs.value=0;
	formObj.sel_net_kgs.value=0;
	cnt=cnt+1;
	if(cnt==3){
		doHideProcess();
	}
}
function btn_Add(){
	var formObj=document.form;
	var sParam="";
	var saveXml="";
	if(docObjects[1].GetCellValue(1, "eq_tp_cd") != undefined && docObjects[1].GetCellValue(1, "eq_tp_cd") != "" && docObjects[1].GetCellValue(1, "eq_tp_cd") != -1){
		if(formObj.eq_tp_cd.value != docObjects[1].GetCellValue(1, "eq_tp_cd")){
			ComShowCodeMessage("COM0337");
			return;
		}
	}
	if(formObj.cntr_tp.value == ""){
		ComShowMessage("Please input CNTR/TR Type !");
		formObj.cntr_tp.focus();
		return;
	}
	if(formObj.cntr_qty.value == ""){
		ComShowMessage("Please input QTY !");
		formObj.cntr_qty.focus();
		return;
	}
		if(ComIsEmpty(formObj.lp_id_cnt)) formObj.lp_id_cnt.value=1;
		if (ComShowCodeConfirm("COM0038")){	
			formObj.f_cmd.value = MODIFY01;
			sParam=FormQueryString(formObj, "");	
 			saveXml=docObjects[1].GetSaveData("./addLPCntr.clt", sParam);
//			docObjects[1].LoadSearchData(saveXml,{Sync:1} );
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
		    if($xml.find("res").text() == "1"){
//				ComShowCodeMessage("COM0093", "");
		    	//Change message 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				/*$.ajax({
					url : "searchLPVolume.clt?"+sParam,
					success : function(result) {
						Volume_Load(result.xml);
					}
				});*/
				var sXml="";
				formObj.f_cmd.value = SEARCH03;
				sParam=FormQueryString(formObj, "");	
				sXml=docObjects[0].GetSearchData("./searchLPVolume.clt?"+sParam);
				Volume_Load(sXml);
				
				sXml="";
				formObj.f_cmd.value = SEARCH02;
				sParam=FormQueryString(formObj, "");	
 				sXml=docObjects[1].GetSearchData("./searchLPCNTRParentList.clt", sParam);
				CNTRParentList_Load(sXml);
				formObj.lp_id.value="";
//				formObj.lp_id_cnt.value="";
			}
		}
}
function btn_Del(){
//	alert('This button is deverloping');
//	return;
	var formObj=document.form;
	var sParam="";
	var saveXml="";
	var sRowStr1=docObjects[1].GetSelectionRows("|");
	if (validateForm(docObjects[1], formObj, "Del")){
		if (ComShowCodeConfirm("COM0051")){	
			var sRowStr=docObjects[1].GetSelectionRows("|");
			var arr=sRowStr.split("|");
			formObj.f_cmd.value = MODIFY02;
			sParam="consol_no="+formObj.f_consol_no.value+"&f_cmd="+formObj.f_cmd.value+"&eq_tp_cd="+docObjects[1].GetCellValue(arr[0],"eq_tp_cd")+ "&lp_id="+docObjects[1].GetCellValue(arr[0],"lp_id")+"&lp_seq="+docObjects[1].GetCellValue(arr[0],"lp_seq")+"&user_id="+formObj.user_id.value+"&org_cd="+formObj.org_cd.value;
 			saveXml=docObjects[1].GetSaveData("./removeLPCntr.clt", sParam);
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
		    if($xml.find("res").text() == "1"){
//				ComShowCodeMessage("COM0093", "");
		    	//Change message 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				btn_Search();
			}
		    else
	    	{
	    		ComShowMessage($xml.find("message").text());
	    	}
		}
	}
}
function btn_App_Clp_no(){
	var formObj=document.form;
	var sParam="";
	var saveXml="";
	var msgCode="COM0037";
	var temp = "N";
	if (validateForm(docObjects[1], formObj, "App_Clp_no")){		
		for(var i=0;i<docObjects[1].RowCount();i++){
			if ( docObjects[1].GetCellValue(i,'tree_nodetype')=='1' && docObjects[1].GetCellValue(i,'item_nm')!=''){
				msgCode="COM0343";
				break;
			}
			if(docObjects[1].GetCellValue(i+1,'item_sys_no')!="")
				{
					temp = "Y";
				}
		}	
		if(temp == "N")
			{
				ComShowMessage("Nothing to Apply");
				return;
			}
		if (ComShowCodeConfirm(msgCode)){	
			formObj.f_cmd.value = MODIFY07;
			sParam="consol_no="+formObj.f_consol_no.value+"&user_id="+formObj.user_id.value+"&org_cd="+formObj.org_cd.value+"&f_cmd="+formObj.f_cmd.value;
 			saveXml=docObjects[1].GetSaveData("./applyLoadPlan.clt", sParam);
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
		    if($xml.find("res").text() == "1"){
				//ComShowCodeMessage("COM0093", "");
		    	//Change message 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				saveXml="";
				formObj.f_cmd.value = SEARCH02;
 				saveXml=docObjects[1].GetSearchData("searchLPCNTRParentList.clt", FormQueryString(formObj,""));
				CNTRParentList_Load(saveXml);
			}
		    else 
		    	{
		    		ComShowMessage($xml.find("message").text());
		    		return;
		    	}
		}
	}
}
function btn_Cntr_Mgmt(){
	var formObj=document.form;
	if (validateForm(docObjects[1], formObj, "Cntr_Mgmt")){
		var sRowStr=docObjects[1].GetSelectionRows("|");
		var arr=sRowStr.split("|");
		var sUrl="./CNTRMgmt.clt?clp_no="+docObjects[1].GetCellValue(arr[0], "po_no");
		parent.mkNewFrame('Container Management', sUrl);
	}	
}
function btn_Tmp_Dow(){
	var formObj=document.form;
	var formObj1=document.form1;
	if (validateForm(docObjects[1], formObj, "Tmp_Dow")){
		var fileName="";
		var filePath="/sitectx/DocUp./DOWN_TEMPLETE/";
		if( formObj.select_bk_tp.value == "WB"){
			fileName="EXPRESS_TEMPLETE_WB.xls";
		} else {
			fileName="EXPRESS_TEMPLETE_SB.xls";
		}
		ComSetObjValue(formObj1.downloadLocation, filePath+fileName);
		ComSetObjValue(formObj1.downloadFileName, fileName);
		formObj1.submit();
	}
}
function btn_Excel_Upload(){
	var formObj=document.form;
	if (validateForm(docObjects[1], formObj, "Upload")){
		var sUrl="./MCLPExpressPopup.clt?bk_tp="+formObj.select_bk_tp.value;
		callBackFunc = "setExcelUploadInfo";
		modal_center_open(sUrl, '', 1200,430,"yes");
	}	
}
function setExcelUploadInfo(aryPopupData){
	var formObj=document.form;
	formObj.consol_no.value=aryPopupData[0][4];
	btn_Search();
}
function btn_Clp_Mov(){
	var sParam="";
	var formObj=document.form;
	if (validateForm(docObjects[1], formObj, "Clp_Mov")){
		var sRowStr=docObjects[1].GetSelectionRows("|");
		var arr=sRowStr.split("|");
		var clp_no=docObjects[1].GetCellValue(arr[0], "po_no");
		sParam="mclp_no="+formObj.mclp_no.value+"&clp_no="+clp_no;
 		var sXml=docObjects[1].GetSearchData("checkChangeMCLP.clt", sParam);
		var rtncd=getXmlDataNullToNullString(sXml,"rtncd");
		var rtnmsg=getXmlDataNullToNullString(sXml,"rtnmsg");
		//1. Save 후 조회
		if( rtncd == "N" ){
			ComShowMessage(rtnmsg);
		} else {
			var sUrl="./MCLPChangePopup.clt?bk_tp="+formObj.bk_tp.value+"&mclp_no="+formObj.mclp_no.value;
			callBackFunc = "setChangePopupInfo";
			modal_center_open(sUrl, '', 1000, 500,"yes");
		}
	}	
}
function setChangePopupInfo(aryPopupData){
	var formObj=document.form;
	var chg_mclp_no=aryPopupData[0][0];
	var sParam="";
	var sRowStr=docObjects[1].GetSelectionRows("|");
	var arr=sRowStr.split("|");
	var clp_no=docObjects[1].GetCellValue(arr[0], "po_no");
	if ( formObj.mclp_no.value != chg_mclp_no){
		sParam="mclp_no="+formObj.mclp_no.value+"&chg_mclp_no="+chg_mclp_no+"&clp_no="+clp_no+"&user_id="+formObj.user_id.value;
 		sXml=docObjects[1].GetSaveData("changeMCLP.clt", sParam);
		var rtncd=getXmlDataNullToNullString(sXml,"rtncd");
		var rtnmsg=getXmlDataNullToNullString(sXml,"rtnmsg");
		//1. Save 후 조회
		if( rtncd == "Y" ){
//			ComShowCodeMessage("COM0093", "");
			//Change message 'Successfully' to showCompleteProcess();
			showCompleteProcess();
			formObj.consol_no.value=formObj.mclp_no.value;
			parm="";
			parm=FormQueryString(formObj,"");
			/*$.ajax({
				url : "searchLPVolume.clt?"+sParam,
				success : function(result) {
					Volume_Load(result.xml);
				}
			});*/
			var sXml=docObjects[0].GetSearchData("./searchLPVolume.clt?"+sParam);
			Volume_Load(sXml);
			
			sXml="";
 			sXml=docObjects[1].GetSearchData("./searchCNTRParentList.clt", sParam);
			CNTRParentList_Load(sXml);
		}else if( rtncd == "N" ){
			ComShowMessage(rtnmsg);
		}
	} else {
		ComShowCodeMessage("COM0168");
	}
}
function sheet1_OnClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	var sXml="";
	var sParam="";
	var i1=0;
	var i2=0;
	var node1_cnt=0;
	var node2_cnt=0;
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
		//Delete
		if ( sheetObj.GetCellValue(Row,"tree_nodetype") == '1'){
			if ( sheetObj.GetCellValue(Row,"tree_nodetype") == '1' ){
					sParam="consol_no="+formObj.f_consol_no.value
					+ "&wob_bk_no="+sheetObj.GetCellValue(Row,"tree_name");
					for(;;){
						i1=docObjects[0].FindText('tree_nodetype','1',i1+1);
						if(i1==-1) {
							break;
						} else {
							node1_cnt=node1_cnt + 1;
						} 
					}
					if ( node1_cnt == 1 ){
						ComShowCodeMessage("COM0262");
						return false;
					}
				} 
				formObj.f_cmd.value = MODIFY06;
 				sXml=docObjects[0].GetSaveData("./delLPShipment.clt", sParam+"&f_cmd="+formObj.f_cmd.value);
				var rtncd=getXmlDataNullToNullString(sXml,"rtncd");
				var rtnmsg=getXmlDataNullToNullString(sXml,"rtnmsg");
				//1. Save 후 조회
				if( rtncd != "N"){
//					ComShowCodeMessage("COM0093", "");
					//Change message 'Successfully' to showCompleteProcess();
					showCompleteProcess();
					btn_Search();
				} else {
					ComShowMessage(rtnmsg);
				}
		//Merge
		} else if ( sheetObj.GetCellValue(Row,"tree_nodetype") == '4' && sheetObj.GetCellValue(Row,"merge_yn") == 'Y'){
			var v_shipno=new Array();
			var v_shipno_seq=new Array();
			var noCnt=0;
			var seqCnt=0;
			var chkCnt=0;
			var chkVal=new Array();
			var chkSeq=0;
			for(var i=0;i<docObjects[0].RowCount()+1;i++){
				if ( sheetObj.GetCellValue(i,"tree_nodetype") == '5')
					if(docObjects[0].GetCellValue(i,"chk") == "1"){
						if(noCnt == 0){
							v_shipno[noCnt]=docObjects[0].GetCellValue(i,"shipno");
							noCnt  += 1;
						}else{
							if(docObjects[0].GetCellValue(i,"shipno") != v_shipno[noCnt-1]){
								v_shipno[noCnt]=docObjects[0].GetCellValue(i,"shipno");
								noCnt += 1;
							}
						}
						seqCnt += 1;
					} 
			}
			var chkStr="";
			var strCnt=0;
			for(var j=0;j<v_shipno.length;j++){
				chkCnt=0;
				strCnt=0;
				for(var i=0;i<docObjects[0].RowCount()+1;i++){
					if ( sheetObj.GetCellValue(i,"tree_nodetype") == '5'){
						if(docObjects[0].GetCellValue(i,"chk") == "1"){
							if(v_shipno[j] == docObjects[0].GetCellValue(i,"shipno")){
								chkCnt += 1;
								if(strCnt != 0){
									chkStr += ",";
								}
								chkStr += docObjects[0].GetCellValue(i,"shipno_seq");
								strCnt += 1;
							}
						}
					}
				}
				chkVal[j]=chkCnt;
				v_shipno_seq[j]=chkStr;
				chkStr="";
			}
			if(chkVal.length == 0){
				ComShowCodeMessage("COM0327");
				return;
			}
			for(var i=0;i<chkVal.length;i++){
				if(chkVal[i] < 2){
					ComShowCodeMessage("COM0327");
					return;
				}
			}
			doShowProcess(true);
			setTimeout(function(){
				var f_shipno="";
				var f_shipno_seq="";
				for(var i=0;i<v_shipno.length;i++){
					formObj.f_cmd.value = MODIFY05;
					sParam=FormQueryString(formObj, "");
					sParam=sParam + "&consol_no="+formObj.f_consol_no.value
					                + "&shipno="+v_shipno[i]
					                + "&shipno_seq="+v_shipno_seq[i];
					var tree_name=docObjects[0].GetCellValue(Row,'tree_name');
	 				sXml=docObjects[0].GetSaveData("./mergeLPShipment.clt", sParam);
	 				docObjects[0].LoadSaveData(sXml);
				}
				var xmlDoc = $.parseXML(sXml);
				var $xml = $(xmlDoc);
			    if($xml.find("res").text() == "1"){
					setShipSplit(tree_name);
					cnt=cnt + 1;
					/*$.ajax({
						url : "searchLPCNTRParentList.clt?"+sParam,
						success : function(result) {
							CNTRParentList_Load(result.xml);
						}
					});*/
					ComShowMessage("Merging successfully");
					var sXml = "";
					formObj.f_cmd.value = SEARCH02;
					sParam=FormQueryString(formObj, "");
					sXml=docObjects[0].GetSearchData("./searchLPCNTRParentList.clt?"+sParam);
					CNTRParentList_Load(sXml);
					
					/*$.ajax({
						url : "searchLPVolume.clt?"+sParam,
						success : function(result) {
							Volume_Load(result.xml);
						}
					});*/
					sXml = "";
					formObj.f_cmd.value = SEARCH03;
					sParam=FormQueryString(formObj, "");
					sXml=docObjects[0].GetSearchData("searchLPVolume.clt?"+sParam);
					Volume_Load(sXml);
				}
			},100);
			doHideProcess();
		//Split
		} else if ( sheetObj.GetCellValue(Row,"tree_nodetype") == '5' ){
//			1. Main UI 로 부터 SHIP_NO, QTY, CBM, KGS, PKGQTY, ITEM, ITEM_NAME 를 담는다.
			var sUrl="./LPShipSplit.clt?shipno="+sheetObj.GetCellValue(Row,"shipno")+"&shipno_seq="+sheetObj.GetCellValue(Row,"shipno_seq")+"&consol_no="+formObj.f_consol_no.value+
			"&ttl_ea_qty="+sheetObj.GetCellValue(Row,"item_qty")+
			"&item_lot="+sheetObj.GetCellValue(Row,"item_lot")+"&lot_id="+sheetObj.GetCellValue(Row,"lot_id")+
			"&item="+sheetObj.GetCellValue(Row,"item_cd")+"&item_name="+sheetObj.GetCellValue(Row,"item_nm")+
			"&tree_name="+sheetObj.GetCellValue(sheet1_FindParent(sheetObj, Row),"tree_name");
			var a = sheet1_FindParent(sheetObj, Row);
			callBackFunc = "setShipSplit";
			modal_center_open(sUrl, '', 650,570,"yes");
		}
	} else if (colName == "chk") {
		sheetObj.SetCellText(0, "chk", "");
		sheet1_OnAfterCheck(sheetObj, Row, "chk");
	} 
	
}
function sheet1_OnAfterCheck(sheetObj, Row, Col){
	if(sheetObj.GetCellValue(Row, "chk") != 1){
		sheetObj.SetCellValue(Row, "chk", 1);
	}else{
		sheetObj.SetCellValue(Row, "chk", 0);
	}
}
function sheet1_OnChange(sheetObj, Row, Col){
}
function setShipSplit(tree_name){
	if(tree_name == undefined || tree_name == "undefined")
		{
			return;
		}
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH01;
 	var sXml=docObjects[0].GetSearchData("./searchLPShipmentList.clt", FormQueryString(formObj,""));
	docObjects[0].LoadSearchData(sXml,{Sync:1} );
	docObjects[0].ShowTreeLevel(0, 1);
	var row_0=docObjects[0].FindText("tree_name", tree_name);
	for(;;){
		if( docObjects[0].GetCellValue(row_0,"tree_nodetype") =='1' ){
			docObjects[0].SetRowExpanded(row_0,1);
			break;
		}
		docObjects[0].SetRowExpanded(row_0,1);
		row_0=sheet1_FindParent(docObjects[0], row_0);
	}
	for(i=0;i<docObjects[0].RowCount()+1;i++){
		if(docObjects[0].GetCellValue(i,"tree_nodetype")=="3"){
 			docObjects[0].SetCellImage(i,"image",2);
		} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="4"){
			if ( docObjects[0].GetCellValue(i,"merge_yn") == "Y"){
 				docObjects[0].SetCellImage(i,"image",3);
			} else {
 				docObjects[0].SetCellImage(i,"image",2);
			}
		} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="5"){
 			docObjects[0].SetCellImage(i,"image",4);
		}
	}
}
/**
 * 시트를 클릭했을 때 처리
 * @param row
 * @param col
 * @return
 */
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
	formObj.sel_qty.value=ComAddComma(qty+"","#,##0");
	formObj.sel_cbm.value=ComAddComma2(cbm/1000+"","#,##0.000");
	formObj.sel_grs_kgs.value=ComAddComma2(grs_kgs/1000+"","#,##0.000");
	formObj.sel_net_kgs.value=ComAddComma2(net_kgs/1000+"","#,##0.000");
}
function btn_Up(){
	var formObj=document.form;
	var i=0;
	var sParam="";
	var saveXml="";
	var cnt=0;
	var parent_row=0;
	var clp_no="";
	var sRowStr=docObjects[1].GetSelectionRows("|");
	//자바 스크립트 배열로 만들기
	var arr=sRowStr.split("|");
	for (i=0; i<arr.length; i++) {
		if ( docObjects[1].GetCellValue(arr[i],'tree_nodetype')=='1'){
			ComShowMessage("Nothing Item to select.");
			return false;
		}
	}
	i=arr[0];
	for(;;){
		i--;
		if ( docObjects[1].GetCellValue(i,'tree_nodetype')=='1'){
			clp_no=docObjects[1].GetCellValue(i,'po_no');
			break;
		}
		if ( i<0 ) break;
	}
	var id="";
	var seq="";
	var shipno="";
	var shipno_seq="";
	var consol_no="";
	for (i=0; i<arr.length; i++) {
		id=docObjects[1].GetCellValue(arr[i],'id');
		seq=docObjects[1].GetCellValue(arr[i],'seq');
		shipno=docObjects[1].GetCellValue(arr[i],'shipno');
		shipno_seq=docObjects[1].GetCellValue(arr[i],'shipno_seq');
		consol_no=docObjects[1].GetCellValue(arr[i],'consol_no');
		if(!ComIsEmpty(shipno)){
			parent_row=sheet1_FindParent(docObjects[1], arr[i]);
			sParam="";
			formObj.f_cmd.value = MODIFY04;
			sParam=FormQueryString(formObj, "");
			doShowProcess(true);
			sParam=sParam + "&id="+id+"&seq="+seq+"&shipno="+shipno+"&shipno_seq="+shipno_seq+"&consol_no="+consol_no;
 			saveXml=docObjects[1].GetSaveData("./modifyLPUpShipment.clt", sParam);
			docObjects[1].SetCellValue(arr[i],'chk',"D");
			main_tree_name=shipno;
			detail_id_seq=docObjects[1].GetCellValue(parent_row,'id_seq');
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
		    if($xml.find("res").text() == "1"){
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
function up_search(){
	var formObj=document.form;
	var i=0;
	var sParam="";
	var saveXml="";
	var cnt=0;
	var parent_row=0;
	var sRowStr=docObjects[1].GetSelectionRows("|");
	//자바 스크립트 배열로 만들기
	var arr=sRowStr.split("|");
	var shipno="";
	for (i=arr.length-1; i>=0; i--) {
		shipno=docObjects[1].GetCellValue(arr[i],'shipno');
		if(!ComIsEmpty(shipno)){
			docObjects[1].RowDelete(arr[i], false);
			cnt=cnt + 1;
		}
	}
	/*$.ajax({
		url : "searchLPCNTRParentList.clt?"+FormQueryString(formObj,""),
		success : function(result) {
			CNTRParentList_Load(result.xml);
		}
	});*/
	var sXml = "";
	formObj.f_cmd.value = SEARCH02;
	sXml=docObjects[0].GetSearchData("./searchLPCNTRParentList.clt?"+FormQueryString(formObj,""));
	CNTRParentList_Load(sXml);
	
	/*$.ajax({
		url : "searchLPVolume.clt?"+FormQueryString(formObj,""),
		success : function(result) {
			Volume_Load(result.xml);
		}
	});*/
	sXml = "";
	formObj.f_cmd.value = SEARCH03;
	sXml=docObjects[0].GetSearchData("searchLPVolume.clt?"+FormQueryString(formObj,""));
	Volume_Load(sXml);
	
	
	var tree_name=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),'tree_name');
	if(cnt != 0){
		formObj.f_cmd.value = SEARCH01;
 		var sXml=docObjects[0].GetSearchData("./searchLPShipmentList.clt", FormQueryString(formObj,""));
		docObjects[0].LoadSearchData(sXml,{Sync:1} );
		docObjects[0].ShowTreeLevel(0, 1);
		main_tree_search();
		for(i=0;i<docObjects[0].RowCount()+1;i++){
			if(docObjects[0].GetCellValue(i,"tree_nodetype")=="3"){
 				docObjects[0].SetCellImage(i,"image",2);
			} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="4"){
				if ( docObjects[0].GetCellValue(i,"merge_yn") == "Y"){
 					docObjects[0].SetCellImage(i,"image",3);
				} else {
 					docObjects[0].SetCellImage(i,"image",2);
				}
			} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="5"){
 				docObjects[0].SetCellImage(i,"image",4);
			} else if(docObjects[0].GetCellValue(i,"tree_nodetype")=="1"){
 				docObjects[0].SetCellImage(i,"image",1);
			} else{
 				docObjects[0].SetCellImage(i,"image","");
			}
		}
	}
	doHideProcess();
}
function btn_Down(){
	var formObj=document.form;
	var i=0;
	var sRowStr=docObjects[1].GetSelectionRows("|");
	var id='';
	var seq='';
	var saveXml='';
	var sParam='';
	var row_0=0;
	if ( docObjects[0].CheckedRows("chk") < 1 ){
		ComShowCodeMessage("COM0228");
		return ;		
	}
	if(sheet2.RowCount()<=0)
		{
			ComShowMessage("Please add CNTR/TR Type");
			return;
		}
	//자바 스크립트 배열로 만들기
	var arr=sRowStr.split("|");
	if ( arr.length > 1 ) {
		return ;
	}
	if ( docObjects[1].GetCellValue(arr[0],'tree_nodetype')=='1'){
		id=docObjects[1].GetCellValue(arr[0],'id');
		seq=docObjects[1].GetCellValue(arr[0],'seq');
		clp_no=docObjects[1].GetCellValue(arr[0],'po_no');
	} else {
		i=arr[0];
		for(;;){
			i--;
	if ( docObjects[1].GetCellValue(i,'tree_nodetype')=='1'){
	id=docObjects[1].GetCellValue(i,'id');
	seq=docObjects[1].GetCellValue(i,'seq');
	clp_no=docObjects[1].GetCellValue(i,'po_no');
				break;
			}
			if ( i<0 ) break;
		}
	}
	if( i < 0 ) return ;
	for (i=1; i<docObjects[0].RowCount()+1; i++) {
		if ( docObjects[0].GetCellValue(i,'chk')==1 && docObjects[0].GetCellValue(i,'tree_nodetype')=='5'){
		detail_ship_no=docObjects[0].GetCellValue(i,'shipno');
		row_0=docObjects[0].FindText("tree_name", docObjects[0].GetCellValue(i,'tree_name'));
			formObj.f_cmd.value = MODIFY03;
			sParam=FormQueryString(formObj, "");
			sParam=sParam + "&id="+id+"&seq="+seq+"&shipno="+docObjects[0].GetCellValue(i,'shipno')+"&shipno_seq="+docObjects[0].GetCellValue(i,'shipno_seq')+"&consol_no="+docObjects[0].GetCellValue(i,'consol_no');
			doShowProcess(true);
 			saveXml=docObjects[0].GetSaveData("./modifyLPDownShipment.clt", sParam);
			doHideProcess();
			main_tree_name=docObjects[0].GetCellValue(sheet1_FindParent(docObjects[0], row_0),'tree_name');
			var xmlDoc = $.parseXML(saveXml);
			var $xml = $(xmlDoc);
		    if($xml.find("res").text() == "Y"){
			} else {
// 				docObjects[0].LoadSaveData(saveXml);
				ComShowMessage($xml.find("message").text())
				btn_Search();
				return;
			}
		}
	}	
	btn_Search();
}
function btn_Find_Ceate(){
//	alert('This button is deverloping');
//	return;
	var formObj=document.form;
	var sUrl="LoadPlanPopup.clt?consol_tp="+formObj.eq_tp_cd.value+"&consol_no="+formObj.consol_no.value;
	callBackFunc = "setLoadPlan";
	modal_center_open(sUrl, '', 1150,520,"yes");
}
function setLoadPlan(aryPopupData){
	if (aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
		var formObj=document.form;
		formObj.consol_no.value=aryPopupData;
		btn_Search();
	}
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Add':
			if (ComIsEmpty(formObj.cntr_tp)){
				ComShowCodeMessage("COM0129");
				formObj.cntr_tp.focus();
				return false;
			}
			break;
		case 'Del':
			var sRowStr=docObjects[1].GetSelectionRows("|");
			var arr=sRowStr.split("|");
			if (arr.length==1){
				if ( sheetObj.GetCellValue(arr[0],"tree_nodetype") != '1'){
					ComShowCodeMessage("COM0104");
					return false;
				}
			}else if(arr.length==0){
				ComShowCodeMessage("COM0104");
				return false;
			}
			else{
				ComShowCodeMessage("COM0328");
				return false;
			}
			break;
		case 'Cntr_Mgmt':
			var sRowStr=docObjects[1].GetSelectionRows("|");
			var arr=sRowStr.split("|");
			if (arr.length==1){
				if ( sheetObj.GetCellValue(arr[0],"tree_nodetype") != '1'){
					ComShowCodeMessage("COM0103");
					return false;
				}
			}else{
				ComShowCodeMessage("COM0103");
				return false;
			}
			break;
		case 'Clp_Mov':
			var sRowStr=docObjects[1].GetSelectionRows("|");
			var arr=sRowStr.split("|");
			if (arr.length==1){
				if ( sheetObj.GetCellValue(arr[0],"tree_nodetype") != '1'){
					ComShowCodeMessage("COM0103");
					return false;
				}
			}else{
				ComShowCodeMessage("COM0103");
				return false;
			}
			break;
		case 'Tmp_Dow':
			if( formObj.select_bk_tp.value == "CLP"){
				ComShowCodeMessage("COM0228");
				formObj.select_bk_tp.focus();
				return false;
			}
			break;
		case 'Upload':
			if( formObj.select_bk_tp.value == "CLP"){
				ComShowCodeMessage("COM0228");
				formObj.select_bk_tp.focus();
				return false;
			}
			break;
		case 'App_Clp_no':
			if( ComIsEmpty(formObj.f_consol_no)){
				ComShowCodeMessage("COM0103");
				return false;
			}
			break;
		}
	}
	return true;
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
			case "btn_cntr_tp":	
 				callBackFunc = "setContainerTypeInfo";
 				var code="A";
 				modal_center_open('./ContainerTypePopup.clt?type='+code+"&eq_unit="+formObj.cntr_tp.value, '', 400, 590,"yes");
				break;
			case "SEARCHLIST":	
				sheet1.RemoveAll();
				sheet2.RemoveAll();
				btn_Search();
				break;
			case "btn_Find_Create":	
				btn_Find_Ceate();
				break;
			case "NEW":	
				btn_New();
				break;
			case "btn_Cancel":	
				btn_Cancel();
				break;
			case "btn_Down":	
				btn_Down();
				break;
			case "btn_Up":	
				btn_Up();
				break;
			case "lnk_oc":	
				lnk_oc();
				break;
			case "btn_Add":	
				btn_Add();
				break;
			case "btn_Del":	
				btn_Del();
				break;
			case "btn_App_Clp_no":	
				btn_App_Clp_no();
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
function setContainerTypeInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	var rtVal = aryPopupData.split("|");
	formObj.cntr_tp.value  =   rtVal[0];
	formObj.eq_tp_cd.value =     rtVal[2];
	}	
}
function getEq_tp_cd(obj){
	var formObj=document.form;
	var sParam="cntr_tp="+obj.value;
	/*$.ajax({
		url : "searchCntrTrTp.clt?"+sParam,
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
	    formObj.eq_tp_cd.value=rtnArr[2];
	    formObj.cntr_tp.value=rtnArr[0];
	   }
	   else{
	    formObj.eq_tp_cd.value="";
	    formObj.cntr_tp.value=""; 
	   }
	  }
	  else{
	   formObj.eq_tp_cd.value="";
	   formObj.cntr_tp.value=""; 
	  }
	 }
	 else{
		 formObj.eq_tp_cd.value="";
		 formObj.cntr_tp.value=""; 	
	 }
}
function obj_keydown(){
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {	
			case "consol_no" :
				btn_Search();
				break;
			case "cntr_tp" :
				if (!ComIsNull(srcValue)){
					searchCntrTp(formObj, formObj.cntr_tp.value);
				}
				break;
		}
	}
	return true;
}
function frmObj_OnChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
	if(srcName == "cntr_tp"){
		if (!ComIsNull(srcValue)){
			searchCntrTp(formObj, formObj.cntr_tp.value);
		} 
	}
}
function searchCntrTp(formObj, value){
	/*$.ajax({
		url : "searchCntrTp.clt?cntr_tp="+value,
		success : function(result) {
			resultCntrTpo(result.xml);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("./searchCntrTp.clt?cntr_tp="+value);
	resultCntrTpo(sXml);
}
function resultCntrTpo(resultXml){
	var formObj=document.form;
	var cntr_tp=getXmlDataNullToNullString(resultXml,'eq_unit');
	if ( ComIsEmpty(cntr_tp) ){
		ComShowCodeMessage("COM0145","CNTR Type");
		formObj.cntr_tp.value="";
		formObj.cntr_tp.focus();
		return false;
	}
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
function sheet2_OnDblClick(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	if(colName == "po_no" && sheetObj.GetCellValue(Row,Col) != ""){
		var sRowStr=sheetObj.GetSelectionRows("|");
		var arr=sRowStr.split("|");
		if (arr.length==1){
			if ( sheetObj.GetCellValue(arr[0],"tree_nodetype") != '1'){
				return false;
			}
		}
		var sUrl="./CNTRMgmt.clt?clp_no="+docObjects[1].GetCellValue(arr[0], "po_no");
		parent.mkNewFrame('Container Management', sUrl,"CNTRMgmt_" + docObjects[1].GetCellValue(arr[0], "po_no"));
	}else if(sheetObj.GetCellValue(Row,"tree_nodetype") == '1' && colName == "item_nm"){
		var sUrl="./WHOCUpdate.clt?search_no="+sheetObj.GetCellValue(Row,"item_nm")+"&search_div=lp&search_tp=LP_NO";
        parent.mkNewFrame('Outbound Complete Update', sUrl,"WHOCUpdate_" + sheetObj.GetCellValue(Row,"item_nm") + "_" + "lp" + "_" + "LP_NO");
	}
}
function main_tree_search(){
	var formObj=document.form;
	if(main_tree_name != ""){
		var row_0=docObjects[0].FindText("tree_name", main_tree_name);
		if(row_0 != -1 ){
			for(;;){
				if( docObjects[0].GetCellValue(row_0,"tree_nodetype") =='1' ){
					docObjects[0].SetRowExpanded(row_0,1);
					break;
				}
				docObjects[0].SetRowExpanded(row_0,1);
				row_0=sheet1_FindParent(docObjects[0], row_0);
			}
		}
		main_tree_name="";
	}
}
function detail_tree_search(){
	var formObj=document.form;
	if(detail_ship_no != ""){
		var row_1=docObjects[1].FindText("shipno", detail_ship_no);
		if(row_1 != -1 ){
			row_1=sheet1_FindParent(docObjects[1], row_1);
			docObjects[1].SetRowExpanded(row_1,1);
		}
		detail_ship_no="";
	}
	if(detail_id_seq != ""){
		var row_1=docObjects[1].FindText("id_seq", detail_id_seq);
		if(row_1 != -1 ){
			docObjects[1].SetRowExpanded(row_1,1);
		}
		detail_id_seq="";
	}
	var sheetObj1=docObjects[1];
	for(var i=1; i<=sheetObj1.LastRow();i++){
		if(sheetObj1.GetCellValue(i,"tree_nodetype") == '1' && sheetObj1.ColSaveName(7) == "item_nm"){
 			sheetObj1.SetCellFontColor(i, "item_nm","#0100FF");
 			sheetObj1.SetCellFontUnderline(i, "item_nm", 1);
		}
	}
}
function lnk_oc(){
	var formObj=document.form;
	if(formObj.f_consol_no.value == ""){
		return;
	}
	var sUrl="./WHOCMgmt.clt?search_no="+formObj.f_consol_no.value+"&search_div=lp&search_tp=CONSOL_NO";
	parent.mkNewFrame('Outbound Complete Management', sUrl);
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
//function isNotSpecialKey(event){
//    //var charCode = (evt.which) ? evt.which : evt.keyCode;
////    if (charCode > 31 && (charCode < 48 || charCode > 57))
////        return false;
//    var regex = new RegExp("^[a-zA-Z0-9]+$");
//    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
//    if (!regex.test(key)) {
//       event.preventDefault();
//       return false;
//    }
//    return true;
//}
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
	var warehouse = formObj.s_wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_Cancel");
		ComBtnDisable("lnk_oc");
		ComBtnDisable("btn_Add");
		ComBtnDisable("btn_Del");
		ComBtnDisable("btn_App_Clp_no");
	}else{
		ComBtnEnable("lnk_oc");
	}
}
