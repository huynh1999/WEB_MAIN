/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AllcMgmt.js
*@FileTitle  : Allocation Management
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--*/

var sheetCnt=0;
//docObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var fix_grid02="Grd02";
var docObjects = new Array();
var item_cd_ori 			= "";
var item_nm_ori 	        = "";
var item_pkgunit_ori        = "";
var item_pkgqty_ori         = "";
var item_ea_qty_ori         = "";
var alloc_ea_qty_ori        = "";
var un_alloc_ea_qty_ori     = "";
var startRow = 0;
var totalRowMerge = 0;
var checkallocation = true;
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
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
function loadPage() {
	var formObj=document.form;
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }
	
	ComBtnDisable("btn_allocation");
	ComBtnDisable("btn_manualAlloc");
	ComBtnDisable("btn_cancel");
	ComBtnDisable("btn_save");
	ComBtnDisable("link_LoadPlan");
	ComBtnDisable("link_OutboundComplete");
	ComBtnDisable("link_Print");
	
	if($("#req_wob_bk_no").val() != ""){
		$("#in_wob_bk_no").val($("#req_wob_bk_no").val());
		btn_Search();
	}
	resizeSheet();
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * tab
 */
function goTabSelect(isNumSep) {
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
				comboObj.SetSelectIndex(0);
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
				comboObj.SetSelectIndex(0);
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
	case "sheet1":      //IBSheet1 init
	    with(sheetObj){
	      
	      var hdr1="item_sys_no|item_seq|Manual\nAlloc|Item|Item Name|Order|Order|Order|Allocated Result|Allocated Result|rn|Inbound Date|Item Lot|Location||Picking\n(EA)|CBM|CBM|GWT|GWT|NWT|NWT|SO No|Inbound Information|Inbound Information|Additional LOT Info|Additional LOT Info|Additional LOT Info|Lot ID"
	      + "|proc_mode|status|walc_no|wob_bk_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
	      var hdr2="item_sys_no|item_seq|Manual\nAlloc|Item|Item Name|Unit|Unit Qty|EA Qty|Alloc|Un-alloc|rn|Inbound Date|Item Lot|Location||Picking\n(EA)|CBM|CFT|KG|LB|KG|LB|SO No|Booking No|PO No|Expiration Date|Lot 04|Lot 05|Lot ID"
	      + "|proc_mode|status|walc_no|wob_bk_no|sao_sys_no|po_sys_no|wh_loc_cd|row_number|issu_cnt|lp_cnt";
	     // var headCount=ComCountHeadTitle(hdr1);
	      var prefix=fix_grid01;
	      
	      //ZOOT::Mergt 기능 수정-mergeCell(2) 주석처리함
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
	      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                  { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);
	
	      var cols = [ {Type:"Text",      Hidden:1, Width:50,    Align:"Left",     ColMerge:1,     SaveName:prefix+"item_sys_no",     KeyField:0,     Format:""},
	             {Type:"Text",      Hidden:1, 	Width:50,    Align:"Left",     	ColMerge:1,     SaveName:prefix+"item_seq",     		KeyField:0,     Format:"" },
	             {Type:"Text",      Hidden:0, 	Width:50,    Align:"Center",    ColMerge:1,     SaveName:prefix+"manual_alloc_img",     KeyField:0,     UpdateEdit:0,     Format:""},
	             {Type:"Text",     	Hidden:0,  	Width:100,   Align:"Center",    ColMerge:1,     SaveName:prefix+"item_cd",     			KeyField:0,     UpdateEdit:0,     Format:""},
	             {Type:"Text",     	Hidden:0,  	Width:150,   Align:"Left",     	ColMerge:1,     SaveName:prefix+"item_nm",     			KeyField:0,     UpdateEdit:0,     Format:""},
	             {Type:"Text",     	Hidden:0,  	Width:40,    Align:"Center",    ColMerge:1,     SaveName:prefix+"item_pkgunit",     	KeyField:0,     UpdateEdit:0,     Format:""},
	             {Type:"Text",     	Hidden:0,  	Width:60,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_pkgqty",     		KeyField:0,     UpdateEdit:0,     Format:"Integer",      PointCount:0},
	             {Type:"Text",     	Hidden:0, 	Width:60,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_ea_qty",     		KeyField:0,     UpdateEdit:0,     Format:"Integer",      PointCount:0},
	             {Type:"Float",     Hidden:0,  	Width:60,    Align:"Right",     ColMerge:1,     SaveName:prefix+"alloc_ea_qty",     	KeyField:0,     UpdateEdit:0,     Format:"Float",      PointCount:0},
	             {Type:"Float",     Hidden:0,  	Width:60,    Align:"Right",     ColMerge:1,     SaveName:prefix+"un_alloc_ea_qty",     	KeyField:0,     UpdateEdit:0,     Format:"Float",      PointCount:0},
	             {Type:"Text",      Hidden:1, 	Width:10,    Align:"Left",     	ColMerge:0,     SaveName:prefix+"rn",     				KeyField:0,     Format:"",     },
	             {Type:"Date",     	Hidden:0,  	Width:80,    Align:"Center",    ColMerge:1,     SaveName:prefix+"inbound_dt",     		KeyField:0,     UpdateEdit:0,     Format:"Ymd"},
	             {Type:"Text",     	Hidden:0,  	Width:130,   Align:"Center",    ColMerge:1,     SaveName:prefix+"lot_no",     			KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"PopupEdit", Hidden:0, 	Width:90,    Align:"Center",    ColMerge:1,     SaveName:prefix+"wh_loc_cd_nm",     	KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"CheckBox",  Hidden:0, 	Width:30,    Align:"Center",    ColMerge:1,     SaveName:prefix+"chk",     				KeyField:0,     Format:"",     },
	             {Type:"Float",     Hidden:0,  	Width:70,    Align:"Right",     ColMerge:1,     SaveName:prefix+"pick_item_ea_qty",     KeyField:0,     UpdateEdit:0,     Format:"Float",      PointCount:0},
	             {Type:"Float",     Hidden:0,  	Width:80,    Align:"Right",     ColMerge:0,     SaveName:prefix+"item_cbm",     		KeyField:0,     Format:"Float",      PointCount:3},
	             {Type:"Float",     Hidden:0,  	Width:80,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_cbf",     		KeyField:0,     Format:"Float",      PointCount:3},
	             {Type:"Float",     Hidden:0,  	Width:80,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_grs_kgs",     	KeyField:0,     Format:"Float",      PointCount:3},
	             {Type:"Float",     Hidden:0,  	Width:80,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_grs_lbs",     	KeyField:0,     Format:"Float",      PointCount:3},
	             {Type:"Float",     Hidden:0,  	Width:80,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_net_kgs",     	KeyField:0,     Format:"Float",      PointCount:3},
	             {Type:"Float",     Hidden:0,  	Width:80,    Align:"Right",     ColMerge:1,     SaveName:prefix+"item_net_lbs",     	KeyField:0,     Format:"Float",      PointCount:3},
	             {Type:"Text",     	Hidden:0,  	Width:100,   Align:"Center",    ColMerge:1,     SaveName:prefix+"sao_no",     			KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"Text",     	Hidden:0,  	Width:100,   Align:"Center",    ColMerge:1,     SaveName:prefix+"wib_bk_no",     		KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"Text",     	Hidden:0,  	Width:100,   Align:"Center",    ColMerge:1,     SaveName:prefix+"po_no_in",     		KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"Date",     	Hidden:0,  	Width:80,    Align:"Center",    ColMerge:1,     SaveName:prefix+"exp_dt",     			KeyField:0,     UpdateEdit:0,     Format:"Ymd"},
	             {Type:"Text",     	Hidden:0,  	Width:80,    Align:"Left",     	ColMerge:1,     SaveName:prefix+"lot_04",     			KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"Text",     	Hidden:0,  	Width:80,    Align:"Left",     	ColMerge:1,     SaveName:prefix+"lot_05",     			KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"Text",     	Hidden:0,  	Width:120,   Align:"Center",    ColMerge:1,     SaveName:prefix+"lot_id",     			KeyField:0,     UpdateEdit:0,     Format:"",     },
	             {Type:"Text",      Hidden:1, 	Width:50, 	 Format:"",     SaveName:prefix+"proc_mode"},
	             {Type:"Status",    Hidden:1, 	Width:0, 	 SaveName:prefix+"ibflag"},
	             {Type:"Text",      Hidden:1, 	Width:50, 	Format:"",     SaveName:prefix+"walc_no"},
	             {Type:"Text",      Hidden:1, 	Width:0,	Format:"",     SaveName:prefix+"wob_bk_no"},
	             {Type:"Text",      Hidden:1, 	Width:0, 	Format:"",     SaveName:prefix+"sao_sys_no"},
	             {Type:"Text",      Hidden:1, 	Width:0, Format:"",     SaveName:prefix+"po_sys_no"},
	             {Type:"Text",      Hidden:1, 	Width:0, Format:"",     SaveName:prefix+"wh_loc_cd"},
	             {Type:"Text",      Hidden:1, 	Width:50, Format:"",     SaveName:prefix+"rum"},
	             {Type:"Text",      Hidden:1, 	Width:50, Format:"",     SaveName:prefix+"issu_cnt"},
	             {Type:"Text",      Hidden:1, 	Width:50, Format:"",     SaveName:prefix+"lp_cnt"} ];
	       
		      InitColumns(cols);
		      SetSheetHeight(450);
		      SetHeaderRowHeight(30);
		      SetAutoRowHeight(0);
		      resizeSheet();
		      SetEditable(1);
		      SetImageList(0,APP_PATH +"/web/img/main/icon_search_s.gif");
		      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	      }
	      break;
	case "sheet2":      //IBSheet2 init
	    with(sheetObj){
	        
	      //no support[check again]CLT 			if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	      var hdr1="|field_name|field_val|doc_type";
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix=fix_grid02;
	
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
	
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);
	
	      var cols = [ {Type:"Status",    Hidden:1, Width:50,    Align:"Center",     SaveName:prefix+"ibflag"},
	             {Type:"Text",     Hidden:0,  Width:200,    Align:"Left",     ColMerge:1,     SaveName:prefix+"field_name",   Format:"",     },
	             {Type:"Text",     Hidden:0,  Width:100,    Align:"Left",     ColMerge:1,     SaveName:prefix+"field_val",  Format:"",     },
	             {Type:"Text",      Hidden:1, Width:150,    Align:"Left",     ColMerge:1,     SaveName:prefix+"doc_type",   Format:"",     } ];
	       
		      InitColumns(cols);
		      SetSheetHeight(450);
		      SetEditable(0);
		      SetHeaderRowHeight(30);
		      SetAutoRowHeight(0);
		      resizeSheet();
		      SetWaitImageVisible(0);
		      SetRowHidden(0, 1);
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
	ComResizeSheet(sheet1);
	ComResizeSheet(sheet2);
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
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
	//ZOOT::Mergt 기능 수정-mergeCell(2) 주석처리함
	mergeCell(2);
	//Check authority Warehouse Code
	check_authority_wh();
}
/*
 * sheet1 DblClick event
 */
function sheet1_OnClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid01 + "manual_alloc_img": //Manual Alloc
			popupManualAllcPopup("S", "&search_no="   + $("#wob_bk_no").val() 
					                 +"&wh_cd=" + $("#wh_cd").val()
					                //+ "&item_sys_no=" + sheetObj.CellValue(Row, fix_grid01+"item_sys_no")
					                //+ "&item_seq="    + sheetObj.CellValue(Row, fix_grid01+"item_seq")
					                 + "&rum="         + sheetObj.GetCellValue(Row, fix_grid01+"rum")
					             );
			break;
	}
}
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == (fix_grid01+"item_cbf") && Value != "")
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBF_CBM", (fix_grid01+"item_cbf"), (fix_grid01+"item_cbm"), sheetObj);
		unitConvertGrid("CBF_CBM", (fix_grid01+"item_cbf"), (fix_grid01+"item_cbm"), sheetObj);
	}
	else if (colStr == (fix_grid01+"item_grs_lbs") && Value != "")
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid01+"item_grs_lbs"), (fix_grid01+"item_grs_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid01+"item_grs_lbs"), (fix_grid01+"item_grs_kgs"), sheetObj);
	}
	else if (colStr == (fix_grid01+"item_net_lbs") && Value != "")
	{
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid01+"item_net_lbs"), (fix_grid01+"item_net_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid01+"item_net_lbs"), (fix_grid01+"item_net_kgs"), sheetObj);
	}
	var colStr=sheetObj.ColSaveName(col);
	checkBoxOnOff(sheetObj, colStr);
}
function sheet2_OnSearchEnd(sheetObj, ErrMsg){
	var fix_grid01="Grd02";
	for(var i=sheetObj.HeaderRows(); i < (sheetObj.RowCount()+sheetObj.HeaderRows()) ; i++){
		sheetObj.SetCellBackColor(i, fix_grid01+"field_name","#D9E5FF");
 		sheetObj.SetCellFontColor(i, fix_grid01+"field_val","#0000FF");
 		sheetObj.SetCellFont("FontBold", i, fix_grid01+"field_name",1);
	}
}
/**
 * Doc Detail sheet 더블클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet2_OnDblClick(sheetObj, Row, Col) {
	var formObj=document.form;	
	var fix_grid01="Grd02";
	var sName=sheetObj.ColSaveName(Col);
	var sValue=sheetObj.GetCellValue(Row, Col);
	if (!isNull2(sValue) && sName == (fix_grid01+"field_val")) {
		if ("BK" == sheetObj.GetCellValue(Row, fix_grid01+"doc_type")) { // Allocation
			var sParam="fwd_bk_no="+ComGetObjValue(formObj.wob_bk_no);
			var sUrl="./WHOutbkMgmt.clt?"+sParam;
			parent.mkNewFrame("Outbound Booking Management", sUrl,"WHOutbkMgmt_" + ComGetObjValue(formObj.wob_bk_no));
		} else if ("OCBK" == sheetObj.GetCellValue(Row, fix_grid01+"doc_type")) { // Outbound Complete by Booking
			var sUrl="./WHOCUpdate.clt?search_no="+sValue+"&search_tp=WOB_OUT_NO&search_div=bk";			
			parent.mkNewFrame("Outbound Complete Update", sUrl, "WHOCUpdate_" + sValue + "_" + "WOB_OUT_NO" + "_" + "bk");
		} else if ("LP" == sheetObj.GetCellValue(Row, fix_grid01+"doc_type")) { // Load Plan
			var sUrl="./LoadPlanMgmt.clt?s_consol_no="+sValue;		
			parent.mkNewFrame('Loading Plan Management', sUrl,"LoadPlanMgmt_" + sValue);
		} else if ("OCLP" == sheetObj.GetCellValue(Row, fix_grid01+"doc_type")) { // Outbound Complete by Load Plan
			var sUrl="./WHOCUpdate.clt?search_no="+sValue+"&search_tp=LP_NO&search_div=lp";
			parent.mkNewFrame('Outbound Complete Update', sUrl,"WHOCUpdate_" + sValue + "_" + "LP_NO"+ "_" + "lp");
		}
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
			/*case "btn_inbound_dt":	
				var cal=new ComCalendar();
	            cal.select(formObj.inbound_dt, 'MM-dd-yyyy');
				break;
			*/
			case "SEARCHLIST":
				btn_Search();
				break;
			case "ALLOCATION":
				btn_Allocation();
				break;
			case "MANUALALLOC":
				btn_ManualAlloc();
				break;
			case "CANCEL":
				btn_Cancel();
				break;
			case "SAVE":
				btn_Save();
				break;
			case "LINK_LOADPLAN":
				btn_Load_Plan();
				break;
			case "OUTBOUND_COMPLETE":
				btn_Outbound_Complete();
				break;
			case "LINK_PRINT":
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
/*
 * 버튼 관련 로직
 */
//화면 Merge 컬럼 Name
var InputName="wob_bk_no|wh_cd|walc_no|issu_cnt|lp_cnt|allc_cnt";
function btn_Search() {
	var formObj=document.form;
	if(ComIsEmpty(formObj.in_wob_bk_no.value)){
		ComShowCodeMessage("COM0114", "Booking No");
		formObj.in_wob_bk_no.focus();
		return ;
	}
	doShowProcess();  
	setTimeout(function(){
			//ComLog("1. btn_Search onclick");
			imNew(); //이전조회결과 reset
			//ComLog("2. btn_Search imNew완료후");
			var sheetObj=sheet1;
			var sheetObj2=sheet2;
			//ComLog("3. searchAllcMgmtInfo 호출전");
			
			//ComLog("===================search param===================");
			//ComLog(param);
			//ComLog("===================search param===================");
			formObj.f_cmd.value=SEARCH;
			var param=FormQueryString(formObj,null, "");
			var sXml=sheetObj.GetSearchData("./AllcMgmt_1GS.clt", param);
			formObj.f_cmd.value=SEARCH01;
			var param1=FormQueryString(formObj,null, "");
			var sXml1=sheetObj.GetSearchData("./AllcMgmt_2GS.clt", param1);
			formObj.f_cmd.value=SEARCH02;
			var param2=FormQueryString(formObj,null, "");
		    var sXml2=sheetObj.GetSearchData("./AllcMgmt_3GS.clt", param2);
			//ComLog("===================SEARCH XML===================");
			//ComLog(sXml);
			//ComLog("===================SEARCH XML===================");
		    
			//ComLog("arrXml len=>" + (arrXml.length));
			//ComLog("4. searchAllcMgmtInfo 호출후");
//			if(ComGetTotalRows(sXml) == "0"){
//				ComShowCodeMessage("COM0266", "Booking No");
//				formObj.in_wob_bk_no.focus();
//				alloc_option.SetSelectIndex(0);
//				alloc_ord.SetSelectIndex(0);
//			}
		    if(getTotalRow(sXml) == "0"){
				ComShowCodeMessage("COM0266", "Booking No");
				formObj.in_wob_bk_no.focus();
				formObj.alloc_option.SetSelectedIndex=0;
				formObj.alloc_ord.SetSelectedIndex=0;
			}
			else{
				
					
						//ComLog("5. searchAllcMgmtInfo 호출후 바인딩 i=0");
						//ComLog("===================XML===================");
						//ComLog(arrXml[i]);
						//ComLog("===================XML===================");
						//ibSheetView Xml 을 HTML태그(Object) 오브젝트의 value 세팅
						displayData(sXml);
						//ComLog("6. searchAllcMgmtInfo 호출후 바인딩 i=1");
					
						 sheetObj.LoadSearchData(sXml1,{Sync:1} );
					
						//ComLog("7. searchAllcMgmtInfo 호출후 바인딩 i=2");
						
						sheetObj2.LoadSearchData(sXml2,{Sync:1} );
					
				
				//button enable
				/*ComEnableButton("btn_allocation", true, 1); 
				ComEnableButton("btn_manualAlloc", true, 1); 
				ComEnableButton("btn_cancel", true, 1);
				ComEnableButton("btn_save", true, 1);
				ComEnableButton("link_LoadPlan", true, 2);
				ComEnableButton("link_OutboundComplete", true, 2);
				ComEnableButton("link_Print", true, 2);*/
				
//				ComBtnEnable("btn_allocation");
//				ComBtnEnable("btn_manualAlloc");
//				ComBtnEnable("btn_cancel");
//				ComBtnEnable("btn_save");
//				ComBtnEnable("link_LoadPlan");
//				ComBtnEnable("link_OutboundComplete");
//				ComBtnEnable("link_Print");
			}
	},100);
	doHideProcess();
}
function displayData(xml){
	var formObj  = document.form;
	//formObj.form_mode.value= "UPDATE";		
	 var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  $("#in_wob_bk_no").val($xml.find("wob_bk_no").text());
	  $("#wob_bk_no").val($xml.find( "wob_bk_no").text());
	  $("#wh_cd").val($xml.find( "wh_cd").text());
	  $("#walc_no").val($xml.find( "walc_no").text());
	  $("#issu_cnt").val(htmlDecode($xml.find( "issu_cnt").text()));
	  $("#lp_cnt").val(htmlDecode($xml.find( "lp_cnt").text()));
	  $("#allc_cnt").val(htmlDecode($xml.find( "allc_cnt").text()));
	 
}
/*
 * 이전 조회결과 reset
 */
function imNew() {	
	var formObj=document.form;
	var var_wob_bk_no=formObj.in_wob_bk_no.value;
	//formObj.reset();
	formObj.in_wob_bk_no.value=var_wob_bk_no;
	//button disabled
	/*ComEnableButton("btn_allocation", false, 1); 
	ComEnableButton("btn_manualAlloc", false, 1); 
	ComEnableButton("btn_cancel", false, 1);
	ComEnableButton("btn_save", false, 1);
	ComEnableButton("link_LoadPlan", false, 2);
	ComEnableButton("link_OutboundComplete", false, 2);
	ComEnableButton("link_Print", false, 2);*/
	
	ComBtnDisable("btn_allocation");
	ComBtnDisable("btn_manualAlloc");
	ComBtnDisable("btn_cancel");
	ComBtnDisable("btn_save");
	ComBtnDisable("link_LoadPlan");
	ComBtnDisable("link_OutboundComplete");
	ComBtnDisable("link_Print");
	
	formObj.alloc_option.SetSelectedIndex=0;
	formObj.alloc_ord.SetSelectedIndex=0;
	sheet1.RemoveAll();
	sheet2.RemoveAll();
}
/*
 * Allocation
 */
function btn_Allocation()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	if(sheetObj.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0185","");
		return;
	}
	if(ComShowCodeConfirm("COM0311") == false){
		return;
	}
	//check status booking : Completed or not.
	ajaxSendPost(resultcountstatus, 'reqVal', '&goWhere=aj&bcKey=checkbookingstatuswave&wob_bk_no='+ formObj.in_wob_bk_no.value, './GateServlet.gsl');
	if(checkallocation == false){
		ComShowMessage("There are no unallocated items.");
		return;
	}else{
	//ComLog("1. btn_Allocation onclick");
	var tl_wo_document_info_header="Docin";
	var div=tl_wo_document_info_header+"div=ALLC";
	var wob_bk_no="&"+ tl_wo_document_info_header+"wob_bk_no="+document.getElementsByName("wob_bk_no")[0].value;
	var wh_cd="&"+ tl_wo_document_info_header+"wh_cd="+document.getElementsByName("wh_cd")[0].value;
	var walc_no="&"+ tl_wo_document_info_header+"walc_no="+document.getElementsByName("walc_no")[0].value;
	var alloc_option="&"+ tl_wo_document_info_header+"alloc_option="+document.form.alloc_option.value;
	var alloc_ord="&"+ tl_wo_document_info_header+"alloc_ord="+ document.form.alloc_ord.value;
	var f_cmd="&f_cmd="+MULTI;
	var docinParamter=div+wob_bk_no+wh_cd+walc_no+alloc_option+alloc_ord+f_cmd;
	
	//ComLog("2. btn_Allocation onclick 파라미터생성");
	//ComLog("===================ALLOC param===================");
	//ComLog(docinParamter);
	//ComLog("===================ALLOC param===================");
	var isheetSaveParamters=docinParamter;
	//ComLog("3. saveAutoAlloc 호출전");
	var saveXml=sheetObj.GetSearchData("./AllcMgmt_1GS.clt", isheetSaveParamters);
 	//var saveXml=sheetObj.GetSaveData("saveAutoAlloc.clt", isheetSaveParamters); //ALLC 화면, WAVE 공통
	//ComLog("4. saveAutoAlloc GetSaveXml 호출후");
 	sheetObj.LoadSaveData(saveXml);
	//ComLog("5. saveAutoAlloc LoadSaveXml 호출후");
	//1. Save 후 재조회
	//SaveEnd
//	if( saveXml.indexOf('<MESSAGE>') == -1){
//		var suYn=ComGetEtcData(saveXml, "suYn");
//		var suValue=ComGetEtcData(saveXml, "suValue");
//		//ComLog("6. saveAutoAlloc save end");
//		if(suYn == "Y")
//		{
//			ComShowCodeMessage("COM0324"); //allocation이 완료되었습니다.
//			ComLog("7. saveAutoAlloc 완료메시지후 btn_search전");
//			btn_Search();
//		}
//		else
//		{
//			ComShowCodeMessage('COM0015');
//		}
//	}
 
 	var xmlDoc = $.parseXML(saveXml);
	var $xml = $(xmlDoc);
 	if(getTotalRow(saveXml)!="0")
 		{
 			var suYn = $xml.find("rtncd").text();
 			if(suYn == "Y")
				{
					ComShowCodeMessage("COM0324"); //allocation이 완료되었습니다.
	 				//Change  'Successfully' to showCompleteProcess();
	 				showCompleteProcess();
 				
					ComLog("7. saveAutoAlloc 완료메시지후 btn_search전");
					btn_Search();
				}
				else
				{
					alert("Unallocated it does not exist.");
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
 * ManualAlloc
 */
function btn_ManualAlloc()
{
	popupManualAllcPopup("A", "&search_no=" + $("#wob_bk_no").val()
			                 +"&wh_cd=" + $("#wh_cd").val()
			                 +"&rum=1"
			            );
}
function popupManualAllcPopup(mode, param)
{
	//div : ALLC, WAVE
	//cond_div : ALL : 부킹기준 전체(ALLOCATION LIST)
    //           ALLCED : ALLOCATED LIST만
    //           UN : UN-ALLOCATED LIST
	//M : 화면의 전체 ManualAlloc 버튼 클릭
	//S : 시트에서 상품SEQ별 클릭
	//alert(mode);
	//alert(param);
	var sUrl="ManualAllcPopup.clt?div=ALLC&cond_div=ALL&mode=" + mode + param;
//	ComOpenPopup(sUrl, 900, 650, "setManualAllc", "0,0", true);	
	
	 rtnary=new Array(1); 
	 rtnary[0]="ALLC";
	 rtnary[1]="ALL";
	 rtnary[2]=mode;
	 rtnary[3]=$("#wob_bk_no").val();
	 rtnary[4]=$("#wh_cd").val();
	 rtnary[5]=	1;
	 callBackFunc = "setManualAllc";
	 modal_center_open(sUrl, callBackFunc, 900, 540,"yes");
}
function setManualAllc()
{
	btn_Search();
}
/*
 * Cancle
 */
function btn_Cancel()
{
	var sheetObj=sheet1;
	//할당이 단한번도 되지않은경우
	if($("#walc_no").val().trim() == "")
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var div="";
	var saveXml="";
	var iChkCnt=sheetObj.CheckedRows(fix_grid01+"chk");
	//체크건이 한건도 없는 경우 all_check
	if(iChkCnt == 0)
	{
		//valid check
		if(eval($("#issu_cnt").val()) > 0)
		{
			ComShowCodeMessage("COM0333"); //issu_cnt가 존재할경우
			return;
		}
		if(eval($("#lp_cnt").val()) > 0)
		{
			ComShowCodeMessage("COM0334"); //ship이 존재할경우
			return;
		}
		div="ALL";
	}
	//전체건과 체크건이 같을 경우 all_check
	else if(iChkCnt == eval($("#allc_cnt").val()))
	{
		div="ALL";
	}
	//그외는 아이템별 취소
	else
	{
		div="PT";
	}
	//confirm
	if(!ComShowCodeConfirm("COM0040")){
		return;
	}
	var tl_wo_document_info_header="Docin";
	var walc_no="&"+tl_wo_document_info_header + "walc_no="   +$("#walc_no").val().trim();
	var wob_bk_no="&"+tl_wo_document_info_header + "wob_bk_no=" +$("#wob_bk_no").val().trim();
	var wh_cd="&"+tl_wo_document_info_header + "wh_cd="     +$("#wh_cd").val().trim();
	var docinParamter=walc_no+wob_bk_no+wh_cd;
	//&Docinwalc_no=&Docinwob_bk_no=&Docinwh_cd=
	switch(div)
	{
		case "ALL":
			var isheetSaveParamters=docinParamter+"&f_cmd="+MULTI03;
// 			saveXml=sheetObj.GetSaveData("cancelAllcMgmtAll.clt", isheetSaveParamters);
// 			sheetObj.LoadSaveData(saveXml);
			var saveXml=sheetObj.GetSearchData("./AllcMgmt_1GS.clt", isheetSaveParamters);
			break;
		case "PT":
			var sheetDatas1=sheetObj.GetSaveString(true);//ComGetSaveString(sheetObj, true, true); //sheetObjs, bUrlEncode, allSave, col
			var isheetSaveParamters=docinParamter+"&"+sheetDatas1+"&f_cmd="+MULTI04;
 			//saveXml=sheetObj.GetSaveData("cancelAllcMgmtPartial.clt", isheetSaveParamters);
 			//sheetObj.LoadSaveData(saveXml);
			var saveXml=sheetObj.GetSearchData("./AllcMgmt_1GS.clt", isheetSaveParamters);
			break;
	}
	//1. Cancel 후 조회
	if( saveXml.indexOf('<MESSAGE>') == -1){
//		ComShowCodeMessage("COM0079", "");
		
		//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		//imNew();
		btn_Search();
	}
}
/*
 * cbm, kgs, net 정보 저장(alloc생성된 건만...)
 */
function btn_Save()
{
	var sheetObj=sheet1;
	if (sheetObj.IsDataModified()== false)//수정된내역이 없을경우(트랜잭션이 일어나지 않은경우)
	{
		ComShowCodeMessage("COM0409");
		 return;
	}
	if(!ComShowCodeConfirm("COM0063"))//confirm
	{ 
		return;
	}
	var tl_wo_document_info_header="Docin";
	var wob_bk_no="&"+tl_wo_document_info_header+"wob_bk_no="+document.getElementsByName("wob_bk_no")[0].value;
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="+document.getElementsByName("wh_cd")[0].value;
	var walc_no="&"+tl_wo_document_info_header+"walc_no="+document.getElementsByName("walc_no")[0].value;
	var f_cmd="&f_cmd="+MULTI02;
	var docinParamter=wob_bk_no+wh_cd+walc_no+f_cmd;
	var sheetDatas=sheetObj.GetSaveString(); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	var isheetSaveParamters=docinParamter+"&"+sheetDatas;
 	var saveXml=sheetObj.GetSearchData("./AllcMgmt_2GS.clt", isheetSaveParamters);
 	//sheetObj.LoadSaveData(saveXml);
	//1. Save 후 재조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
//		ComShowCodeMessage("COM0093");//저장이완료되었습니다.
		//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		btn_Search();
	}
}
/*
 * 프린트
 */
function btn_Print()
{
	
	 if (document.getElementById('link_Print').disabled) {
		return;
	}
	/*
	if($("#walc_no").val().trim() == "")
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	*/
	var sUrl="WHOutbkPrintOption.clt?";
	sUrl=sUrl + "page_tp=" + "ALLC";
	sUrl=sUrl + "&wob_bk_no=" + $("#wob_bk_no").val();
	sUrl=sUrl + "&walc_no=" + $("#walc_no").val();
	sUrl=sUrl + "&wh_cd=" + $("#wh_cd").val();	
	
	callBackFunc = "setPrintOptionInfo";
	modal_center_open(sUrl, callBackFunc, 1000,680,"yes");
	
}
function setPrintOptionInfo(){
	
}
/*
 * LOAD PLAN
 */
function btn_Load_Plan()
{
	
	var formObj=document.form;
	var wob_bk_no=ComGetObjValue(formObj.wob_bk_no);
	if (document.getElementById('link_LoadPlan').disabled) {
		return;
	}
	//할당이 단한번도 되지않은경우
	if($("#walc_no").val().trim() == "")
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var sParam="wob_bk_no="+ wob_bk_no + "&f_cmd="+SEARCH04;
	/*$.ajax({
		url : "creatWHOCutbkConsolNo.clt?"+sParam,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				return;
			}
			var consol_no=getXmlDataNullToNullString(result.xml,'consol_no');
			var sUrl="./LoadPlanMgmt.clt?s_consol_no="+consol_no;
			parent.mkNewFrame('Load Plan Management', sUrl);
		}
	});*/
	doShowProcess();
	setTimeout(function(){
//		var sXml=docObjects[0].GetSearchData("creatWHOCutbkConsolNo.clt?"+sParam);			
//		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){			
//			alert(getXmlDataNullToNullString(sXml,'exception_msg'));	
//			return;
//		}
		
		var sXml=sheet1.GetSearchData("./WHOutbkMgmt_5GS.clt?"+sParam);	
		var xmlDoc = $.parseXML(sXml); 
		var $xml = $(xmlDoc);
		if( $xml.find("exception_msg").text() !=""){
			ComShowMessage($xml.find("exception_msg").text());
			 return;
		}
		//var consol_no=getXmlDataNullToNullString(sXml,'consol_no');
		var consol_no=$xml.find("consol_no").text();
		var sUrl="./LoadPlanMgmt.clt?s_consol_no="+consol_no + '&wh_cd=' + formObj.wh_cd.value;
		parent.mkNewFrame('Load Plan Management', sUrl);
		
		/*var paramStr = "./OPR_PRO_0010.clt?ui_code=OPR_PRO_0020&pro_no=" + pro_no + "&bl_no=" + bl_no ;
		parent.mkNewFrame('Pro Entry', paramStr);*/
		
		
	},100);
	doHideProcess();
}
function btn_Outbound_Complete()
{
	var formObj=document.form;
	var wob_bk_no=formObj.wob_bk_no.value;
	if (document.getElementById('link_OutboundComplete').disabled) {
		return;
	}
	//할당이 단한번도 되지않은경우
	if($("#walc_no").val().trim() == "")
	{
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var sParam="wob_bk_no="+ wob_bk_no+"&f_cmd="+SEARCH04;
	/*$.ajax({
		url : "searchWHOCPageMoveComplete.clt?"+sParam,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				return;
			}
			var walc_no_cnt=eval(getXmlDataNullToNullString(result.xml,'walc_no_cnt'));
			if(walc_no_cnt <= 0)
			{
				ComShowCodeMessage("COM0330"); 
				return;
			}
			var search_div=getXmlDataNullToNullString(result.xml,'search_div');
			var search_tp=getXmlDataNullToNullString(result.xml,'search_tp');
			if(search_div == "none") //ship은 있는데 loadplan은 없을경우
			{
				ComShowCodeMessage("COM0340"); 
				return;
			}
			var sUrl="./WHOCMgmt.clt?search_no=" + wob_bk_no + "&search_div=" + search_div + "&search_tp=" + search_tp;
			parent.mkNewFrame('Outbound Complete Management', sUrl);
		}
	});*/
	
	doShowProcess();
	setTimeout(function(){
		//var sXml=docObjects[0].GetSearchData("searchWHOCPageMoveComplete.clt?"+sParam);			
		var sXml=sheet1.GetSearchData("./WHOCMgmtGS.clt?"+sParam);	
		var xmlDoc = $.parseXML(sXml); 
		var $xml = $(xmlDoc);
		if( $xml.find("exception_msg").text() !=""){
			 return;
		}
//		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){			
//			alert(getXmlDataNullToNullString(sXml,'exception_msg'));	
//			return;
//		}
		//var walc_no_cnt=eval(getXmlDataNullToNullString(sXml,'walc_no_cnt'));
		var walc_no_cnt=$xml.find("walc_no_cnt").text();
		if(walc_no_cnt <= 0)
		{
			ComShowCodeMessage("COM0330"); 
			return;
		}
		//var search_div=getXmlDataNullToNullString(sXml,'search_div');
		//var search_tp=getXmlDataNullToNullString(sXml,'search_tp');
		var search_div=$xml.find("search_div").text();
		var search_tp=$xml.find("search_tp").text();
		if(search_div == "none") //ship은 있는데 loadplan은 없을경우
		{
			ComShowCodeMessage("COM0340"); 
			return;
		}
		var sUrl="./WHOCMgmt.clt?search_no=" + wob_bk_no + "&search_div=" + search_div + "&search_tp=" + search_tp;
		parent.mkNewFrame('Outbound Complete Management', sUrl);
	},100);
	doHideProcess();
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

function mergeCell(Row){
	var prefix=fix_grid01;
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
	if(item_cd == item_cd_ori && item_nm == item_nm_ori
			&& item_pkgunit == item_pkgunit_ori && item_pkgqty == item_pkgqty_ori
			&& item_ea_qty == item_ea_qty_ori && alloc_ea_qty == alloc_ea_qty_ori
			&& un_alloc_ea_qty == un_alloc_ea_qty_ori && rum == rum_ori){
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
	var prefix=fix_grid01;
	var sheetObj = sheet1;
	item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
	item_pkgunit_ori = sheetObj.GetCellValue(i, prefix+"item_pkgunit");
	item_pkgqty_ori = sheetObj.GetCellValue(i, prefix+"item_pkgqty");
	item_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"item_ea_qty");
	alloc_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"alloc_ea_qty");
	un_alloc_ea_qty_ori = sheetObj.GetCellValue(i, prefix+"un_alloc_ea_qty");
	rum_ori = sheetObj.GetCellValue(i, prefix+"rum");
}
function getData(i){
	var prefix=fix_grid01;	
	var sheetObj = sheet1;
	item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
	item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
	item_pkgunit = sheetObj.GetCellValue(i, prefix+"item_pkgunit");
	item_pkgqty = sheetObj.GetCellValue(i, prefix+"item_pkgqty");
	item_ea_qty = sheetObj.GetCellValue(i, prefix+"item_ea_qty");
	alloc_ea_qty = sheetObj.GetCellValue(i, prefix+"alloc_ea_qty");
	un_alloc_ea_qty = sheetObj.GetCellValue(i, prefix+"un_alloc_ea_qty");
	rum = sheetObj.GetCellValue(i, prefix+"rum");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 9, totalRowMerge, 1);
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
	var warehouse = formObj.wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_allocation");
		ComBtnDisable("btn_manualAlloc");
		ComBtnDisable("btn_cancel");
		ComBtnDisable("btn_save");
		ComBtnDisable("link_LoadPlan");
		ComBtnDisable("link_OutboundComplete");
		ComBtnEnable("link_Print");
	}else{
		ComBtnEnable("btn_allocation");
		ComBtnEnable("btn_manualAlloc");
		ComBtnEnable("btn_cancel");
		ComBtnEnable("btn_save");
		ComBtnEnable("link_LoadPlan");
		ComBtnEnable("link_OutboundComplete");
		ComBtnEnable("link_Print");
		//ComBtnEnable("link_Print");
	}
}