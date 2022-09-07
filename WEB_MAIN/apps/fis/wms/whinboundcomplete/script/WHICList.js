/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICList.js
*@FileTitle  : Inbound Complete Search
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
=========================================================*/
var rtnary=new Array(2);
var callBackFunc = "";
var firCalFlag=false;
var sheetCnt=0;
var docObjects=new Array();
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var selectCnt=0;
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
	for (var i=0; i<docObjects.length;i++)
	{
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	loadComboOrderType();
	loadComboWarehouse();
	//control
	initControl();
	if($("#req_search_no").val() == ""){ //번호가 없을경우
		$("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#to_bk_date").val(ComGetNowInfo());
		$("#fm_in_date").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#to_in_date").val(ComGetNowInfo());
		$("#wh_cd").val($("#def_wh_cd").val());
//		$("#wh_nm").val($("#def_wh_nm").val());
		document.form.bk_sts_cd.value = "ALL";
		$("#ctrt_no").val($("#def_wh_ctrt_no").val());
		$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	}else{
		$("#search_no").val($("#req_search_no").val());
		document.form.bk_sts_cd.value = "ALL";
		document.form.search_in_bk.value = $("#req_search_tp").val();
		btn_Search();
	}
	document.form.bk_sts_cd.value = "X";
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");

}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * init control
 */
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
    //- key down
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function loadComboOrderType(){
	var obj = document.getElementById("ord_tp_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var ord_tp_cd_cd = ord_tp_cdCode.split('|');
	var ord_tp_cd_nm = ord_tp_cdText.split('|');
	
	for(var i = 0; i < ord_tp_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(ord_tp_cd_nm[i]);
		option.value = htmlDecode(ord_tp_cd_cd[i]);
		
		obj.add(option);
	}
}
function loadComboWarehouse(){
	var obj = document.getElementById("wh_cd");
	var option =  document.createElement("option");
	
	option.text = "";
	option.value = "";
	
	obj.add(option);
	
	var warehouse_cd = warehouseCode.split('|');
	var warehouse_nm = warehouseText.split('|');
	
	for(var i = 0; i < warehouse_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(warehouse_nm[i]);
		option.value = htmlDecode(warehouse_cd[i]);
		
		obj.add(option);
	}
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

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	  var headers = [ { Text:getLabel('WHICList_HDR1'), Align:"Center"},
                      { Text:getLabel('WHICList_HDR2'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Text",     Hidden:1, 		Width:30, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"seq", 				KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:115, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wib_bk_no", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:140, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"cust_ord_no", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Date",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"est_in_dt", 		KeyField:0, 	Format:"Ymd", 			PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:60, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"bk_sts_nm", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:160, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"ctrt_nm", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:1, 		Width:60, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"rn", 				KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_cd", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:261, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"item_nm", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Date",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"inbound_dt", 		KeyField:0, 	Format:"Ymd", 			PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:90, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"lot_no", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:40, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"item_pkgunit", 	KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"item_pkgqty", 		KeyField:0,		Format:"Float", 		PointCount:0, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:180, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"pkg_info", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"item_ea_qty", 		KeyField:0,		Format:"Float", 		PointCount:0, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:30, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"snd_pkgunit", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"snd_pkgqty", 		KeyField:0,		Format:"Float", 		PointCount:0, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:50, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"snd_loc_nm", 		KeyField:0,		Format:"", 				PointCount:0, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:30, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"dmg_pkgunit", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Int",    	 Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"dmg_pkgqty", 		KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:50, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"dmg_loc_nm", 		KeyField:0,		Format:"", 				PointCount:0, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_ea_qty", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_pe_qty", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:50, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"os_item_ea_qty", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:90, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"inbound_loc_nm", 	KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:80, 	Align:"Right",		ColMerge:0, 	SaveName:prefix+"in_item_cbm", 		KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_cbf", 		KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_grs_kgs", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_grs_lbs", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_net_kgs", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",    Hidden:0,  	Width:80, 	Align:"Right", 		ColMerge:1, 	SaveName:prefix+"in_item_net_lbs", 	KeyField:0,		Format:"Float", 		PointCount:3, 	UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:120, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lot_id", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Date",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"exp_dt", 			KeyField:0, 	Format:"Ymd", 			PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lot_04", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"lot_05", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"ord_tp_nm", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:0,  	Width:70, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_cd", 			KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",     Hidden:1, 		Width:90, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"bk_sts_cd", 		KeyField:0, 	Format:"", 				PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
			      
      			  InitColumns(cols);
			      SetSheetHeight(450);
			      resizeSheet();
			      SetEditable(0);
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
 * 파일다운로드
 */
function fileDownload(sheetObj, Row, Col){
	var formObj1=document.form1;
	formObj1.downloadLocation.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_path") + sheetObj.GetCellValue(Row, fix_grid01+ "file_sys_nm");
	formObj1.downloadFileName.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm");
	formObj1.target="downiframe";
	formObj1.submit();
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		//BK
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
		//STATUS 폰트색상 변경
 		var bk_sts_cd=sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd").trim();
		if(bk_sts_cd == "P" || bk_sts_cd == "X")
		{
 			sheetObj.SetCellFontColor(i, fix_grid01 + "bk_sts_nm","#0100FF");
 			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "bk_sts_nm", 1);
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
		case fix_grid01 + "wib_bk_no": //부킹
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl,"WHInbkMgmt_"+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;
		case fix_grid01 + "bk_sts_nm":
			var bk_sts_cd=sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd").trim();
			if(bk_sts_cd == "P" || bk_sts_cd == "X")
			{
				//중복건 체크
 				var sXml=sheetObj.GetSearchData("./searchWHICBkNoDupCheckGS.clt", "in_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")+"&f_cmd="+SEARCH);
 				var xmlDoc = $.parseXML(sXml);
 				var $xml = $(xmlDoc);
 			    if(parseInt($xml.find("in_cnt").text()) > 1){
					var formObj=document.form;
					rtnary=new Array(3);
					rtnary[0]=sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
					rtnary[1]="";
					rtnary[2]=window;
				      
				    callBackFunc = "setWHICItemList";
				    modal_center_open('./WHICItemListPopup.clt?wib_bk_no='+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"), '', 1000, 470 ,"yes");
				}
				else
				{
					//중복건이 없으면 바로 이동	
					var sUrl="./WHICUpdate.clt?search_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") + "&search_tp=WIB_BK_NO";
					parent.mkNewFrame('Inbound Complete Update', sUrl,"WHICUpdate_"+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")+"_"+"WIB_BK_NO");
				}
			}
			break;
	}
}
function setWHICItemList(aryPopupData)
{
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
	}else{
	var rtnValAry = aryPopupData.split("|");
	var wib_in_no = rtnValAry[0];
	var sUrl="./WHICUpdate.clt?search_no="+wib_in_no + "&search_tp=WIB_IN_NO";
	parent.mkNewFrame('Inbound Complete Update', sUrl);
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
document.keydown=obj_keydown;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_to_bk_date":	
	            var cal = new ComCalendarFromTo();
	            cal.select(formObj.fm_bk_date,formObj.to_bk_date, 'MM-dd-yyyy');
		    	break;
			case "btn_to_in_date":	
	            var cal = new ComCalendarFromTo();
		    	cal.select(formObj.fm_in_date,formObj.to_in_date, 'MM-dd-yyyy');
				break;
 			case "btn_ctrt_no" :	
					CtrtPopup();
				break;
 			case "btn_wh_loc_cd" :
 				if(ComIsEmpty(formObj.wh_cd))
 				{
 					ComShowCodeMessage("COM0114","Warehouse");
 					$("#wh_cd").focus();
 					return;
 				}
 				
 			    callBackFunc = "setLocInfo";
 			    modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+ $("#wh_cd").val() + "&f_wh_loc_nm=" +$("#wh_loc_nm").val(), '', 700, 500,"yes");
 				break;
 			case "SEARCHLIST" :	
 				sheet1.RemoveAll();
				btn_Search();
			break;
 			case "btn_Excel" :	
				btn_Excel();
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
	var formObj=document.form;
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value + "&ctrt_no=" + formObj.ctrt_no.value, '', 900, 580,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_no.value=rtnValAry[0];//full_nm
		formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	}
}

function setLocInfo(rtnVal){
	
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		$("#wh_loc_cd").val(rtnValAry[0]);// wh_loc_cd
		$("#wh_loc_nm").val(rtnValAry[1]);// wh_loc_nm
		$("#wh_loc_nm_org").val(rtnValAry[2]);// wh_loc_nm
	}
}
/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 */

function btn_Search(){
	
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (validateForm(formObj, 'search')) {
		formObj.f_cmd.value=SEARCH;
		sheetObj.DoSearch("searchWHICList.clt", FormQueryString(formObj, null,""));
	}

}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	//docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(	docObjects[0]), SheetDesign:1,Merge:1 });
       sheet1.Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, AutoSizeColumn: 1, ExtendParam: "ColumnColor: 1|4"});
    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//bk_no 또는 in_no가 없는경우 warehouse는 필수로 입력되어야함.
			if(ComIsEmpty(formObj.search_no) && ComIsEmpty(formObj.wh_cd))//&& ComIsEmpty(formObj.ctrt_no))
			{
				ComShowCodeMessage("COM0114","Warehouse or In booking no or In complete no or Cust order no");
				$("#wh_cd").focus();
				return false;
			}
			//bk_no 또는 in_no가 없는경우 bk_date, in_date 둘중하는 필수
			if(ComIsEmpty(formObj.search_no) && ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date) && ComIsEmpty(formObj.fm_in_date) && ComIsEmpty(formObj.to_in_date))
			{
				ComShowCodeMessage("COM0114","Booking Date or Estimated Date or Inbound Date");
				$("#fm_bk_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)){
				formObj.to_bk_date.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.fm_bk_date) && !isDate(formObj.fm_bk_date)) {
				ComShowCodeMessage("COM0114", "Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_bk_date) && !isDate(formObj.to_bk_date)) {
				ComShowCodeMessage("COM0114", "Booking Date");
				formObj.to_bk_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_bk_date)&&ComIsEmpty(formObj.to_bk_date))||(ComIsEmpty(formObj.fm_bk_date)&&!ComIsEmpty(formObj.to_bk_date))) {
				ComShowCodeMessage("COM0122", "Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)<0) {
				ComShowCodeMessage("COM0122", "Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if(!ComIsEmpty(formObj.fm_in_date) && ComIsEmpty(formObj.to_in_date)){
				formObj.to_in_date.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.fm_in_date) && !isDate(formObj.fm_in_date)) {
				ComShowCodeMessage("COM0114","Inbound Date");
				formObj.fm_in_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_in_date) && !isDate(formObj.to_in_date)) {
				ComShowCodeMessage("COM0114","Inbound Date");
				formObj.to_in_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_in_date)&&ComIsEmpty(formObj.to_in_date))||(ComIsEmpty(formObj.fm_in_date)&&!ComIsEmpty(formObj.to_in_date))) {
				ComShowCodeMessage("COM0122","Inbound Date");
				formObj.fm_in_date.focus();
				return false;
			}
			if (getDaysBetween(formObj.fm_in_date, formObj.to_in_date, 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122","Inbound Date");
				formObj.fm_in_date.focus();
				return false;
			}
			//item_no가 입력된경우 
			if(!ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.search_no))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#wh_cd").focus();
				return false;
			}
			//po no가 입력된 경우
			if(!ComIsEmpty(formObj.po_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.search_no))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#wh_cd").focus();
				return false;
			}
		}
	}
	return true;
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
			case "search_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "po_no":	
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
	ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchTlLocInfo&s_code='+obj.value, './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.wh_nm.value = masterVals[3];
	}else{
		formObj.wh_cd.value="";
		formObj.wh_nm.value="";
	}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.ctrt_nm.value = masterVals[3];
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
	}
}

/*
 * Putaway Location search
 * onChange
 */
var temp = '';
function getInboundLocInfo(div){	
	temp = div;
	if($("#wh_loc_nm").val() == "")
	{
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if(div == "e")
		{
			btn_Search();
		}
		return;
	}
	var formObj=document.form;
	if(ComIsEmpty(formObj.wh_cd))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#wh_loc_nm").val("");
		$("#wh_cd").focus();
		return;
	}
	var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#wh_loc_nm").val() + "&f_putaway_flg=Y" + "&f_cmd=" + COMMAND01;
	
//	var sXml = docObjects[0].GetSearchData("./searchWarehouseLocInfoForName.clt"+sParam);
	
//	ajaxSendPost(resultPutawayLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&f_loc_cd=fff', './GateServlet.gsl');
	ajaxSendPost(resultPutawayLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
	/*var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}*/
//	resultPutawayLocInfo(sXml, div);
}
function resultPutawayLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.wh_loc_nm.value=rtnArr[1];
	    		formObj.wh_loc_nm_org.value=rtnArr[2];
	    		formObj.wh_loc_cd.value=rtnArr[0];
	    		if(temp == "e")
	    		{
	    			btn_Search();
	    		}
	    	}
	    	else{
	    		formObj.wh_loc_nm.value="";
	    		formObj.wh_loc_nm_org.value=""; 
	    		formObj.wh_loc_cd.value=""; 
	    		formObj.wh_loc_nm.focus();
	    	}
		}
		else{
			formObj.wh_loc_nm.value="";
    		formObj.wh_loc_nm_org.value=""; 
    		formObj.wh_loc_cd.value=""; 
    		formObj.wh_loc_nm.focus();
		}
	 }
	 else{
		 	formObj.wh_loc_nm.value="";
	 		formObj.wh_loc_nm_org.value=""; 
	 		formObj.wh_loc_cd.value=""; 
	 		formObj.wh_loc_nm.focus();
	 }
	
}
