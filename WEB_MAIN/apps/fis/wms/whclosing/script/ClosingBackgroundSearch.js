/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingBackgroundSearch.js
*@FileTitle  : W/H Closing Background Search
*@author     : Tuan.Chau - DOU Network
*@version    : 1.0
*@since      : 2015/07/17
=========================================================*/
//sheetObjects
var sheetObjects=new Array();
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
var callBackFunc = "";
var rtnary=new Array(1);
var firCalFlag=false;
/*
 * Combo Object를 배열로 등록
/*
 * Sheet object 생성시 cnt 증가
 */
 function setDocumentObject(sheet_obj){
		sheetObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	doShowProcess(true);
	//sheet
	for(var i=0;i<sheetObjects.length;i++){
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i],i+1);
		comEndConfigSheet(sheetObjects[i]);
	}
	
    doHideProcess(false);
    loading_flag="Y";
    //control
	initControl();
	setFieldValue(document.form.wh_cd,document.form.def_wh_cd.value);
	
	$("#fm_cls_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_cls_date").val(ComGetNowInfo());
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), sheetObjects[0], false, "RestoreGrid");
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
		case "sts_cd":
			vTextSplit=sts_cdText.split("|");
			vCodeSplit=sts_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				var idx=1;
				for(var j=0;j<vCodeSplit.length; j++){
					if(vCodeSplit[j] != "N") //NEW는 제외
					{
						InsertItem(idx,  vTextSplit[j], vCodeSplit[j]);
						idx++;
					}
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
	        
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [  { Text:getLabel('ClosingBackgroundSearch_HDR1'), Align:"Center"},
	                       { Text:getLabel('ClosingBackgroundSearch_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",    Hidden:0, 	Width:30, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"seq", 			KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Date",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"cls_dt", 		KeyField:0, 	Format:"Ymd", 		    PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:140, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"cls_agr_no", 	KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"sts_nm", 		KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Combo",    Hidden:0,  	Width:200, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"wh_cd", 		KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:100, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"ctrt_no", 		KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:140, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"ctrt_nm", 		KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:40, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"sb_cls_nm", 	KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"rate_tp_nm", 	KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:80, 	Align:"Center", 	ColMerge:1, 	SaveName:prefix+"rgst_id", 		KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0},
	  	             {Type:"Text",     Hidden:0,  	Width:250, 	Align:"Left", 		ColMerge:1, 	SaveName:prefix+"sts_rslt", 	KeyField:0, 	Format:"", 				PointCount:0, 	CalcLogic:"",  UpdateEdit:0,   InsertEdit:0} ];
	       
	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetEditable(0);
	      SetColProperty(prefix+'wh_cd', {ComboCode:WHCDLIST1, ComboText:WHCDLIST2} );
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
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
		ComResizeSheet(sheetObjects[0]);
	}
 /*
  * sheet1 searchend event
  */
 function sheet1_OnSearchEnd(){
 	var sheetObj=sheetObjects[0];//sheetObjects[0];
 	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		sheetObj.SetCellFontColor(i, fix_grid01 + "cls_agr_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "cls_agr_no", 1);
 	}
 	mergeCell(2);
 	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
 }
 function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
 	var colName=sheetObj.ColSaveName(Col);
 	switch(colName)
 	{
 		case fix_grid01 + "cls_agr_no":
// 			var sXml=sheetObj.GetSearchData("./clsAgrNoCheck.clt", "cls_agr_no="+sheetObj.GetCellValue(Row, fix_grid01 + "cls_agr_no"));
// 			var cls_agr_no=getXmlDataNullToNullString(sXml,'cls_agr_no');
// 			if(cls_agr_no == ""){
// 				ComShowCodeMessage("COM0185","");
// 			}else{
 				
 				if(Value == "") return;
 				
 				var sUrl="./ClosingMgmt.clt?cls_agr_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "cls_agr_no");
 				parent.mkNewFrame('Closing Management', sUrl, "ClosingMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "cls_agr_no"));
 				break;
// 			}
 	}
 }
 function mergeCell(Row){
		var prefix="Grd01";
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
				&& lot_cd == lot_cd_ori && inbound_dt == inbound_dt_ori
				&& item_lot_no == item_lot_no_ori && inbound_loc_cd == inbound_loc_cd_ori
				&& non_putaway_qty == non_putaway_qty_ori && unit_nm == unit_nm_ori
				&& type_nm == type_nm_ori && qty == qty_ori
				&& qty_ea == qty_ea_ori){
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
		var prefix="Grd01";
		item_cd_ori = sheetObj.GetCellValue(i, prefix+"item_cd");
		item_nm_ori = sheetObj.GetCellValue(i, prefix+"item_nm");
		lot_cd_ori = sheetObj.GetCellValue(i, prefix+"lot_id");
		inbound_dt_ori = sheetObj.GetCellValue(i, prefix+"inbound_dt");
		item_lot_no_ori = sheetObj.GetCellValue(i, prefix+"lot_no");
		inbound_loc_cd_ori = sheetObj.GetCellValue(i, prefix+"inbound_loc_cd");
		type_nm_ori = sheetObj.GetCellValue(i, prefix+"rcv_snd_dmg_nm");
		unit_nm_ori = sheetObj.GetCellValue(i, prefix+"pkgunit");
		qty_ori = sheetObj.GetCellValue(i, prefix+"pkgqty");
		qty_ea_ori = sheetObj.GetCellValue(i, prefix+"eq_qty");
		non_putaway_qty_ori = sheetObj.GetCellValue(i, prefix+"non_putaway_ea_qty");
	}
	function getData(i){
		var prefix="Grd01";	
		item_cd = sheetObj.GetCellValue(i, prefix+"item_cd");
		item_nm = sheetObj.GetCellValue(i, prefix+"item_nm");
		lot_cd = sheetObj.GetCellValue(i, prefix+"lot_id");
		inbound_dt = sheetObj.GetCellValue(i, prefix+"inbound_dt");
		item_lot_no = sheetObj.GetCellValue(i, prefix+"lot_no");
		inbound_loc_cd = sheetObj.GetCellValue(i, prefix+"inbound_loc_cd");
		type_nm = sheetObj.GetCellValue(i, prefix+"rcv_snd_dmg_nm");
		unit_nm = sheetObj.GetCellValue(i, prefix+"pkgunit");
		qty = sheetObj.GetCellValue(i, prefix+"pkgqty");
		qty_ea = sheetObj.GetCellValue(i, prefix+"eq_qty");
		non_putaway_qty = sheetObj.GetCellValue(i, prefix+"non_putaway_ea_qty");
	}
	function setMergeCell(startRow, totalRowMerge){
		sheet1.SetMergeCell(startRow, 3, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 4, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 8, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 10, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 12, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 13, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 14, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 15, totalRowMerge, 1);
		sheet1.SetMergeCell(startRow, 16, totalRowMerge, 1);
	}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
 //document.onclick=processButtonClick;
 //버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
 function doWork(srcName){
 	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
 	/*******************************************************/
 	var formObj=document.form;
 	try {
// 		var srcName=ComGetEvent("name");		
 		switch(srcName) {			
 			case "btn_fm_cls_date":	
// 				break;
 				if (document.getElementById('btn_fm_cls_date').disabled) {
 					return;
 				}
 				var cal=new ComCalendarFromTo();
 				cal.displayType="date";
 	        	cal.select(formObj.fm_cls_date, formObj.to_cls_date, 'MM-dd-yyyy');
 				break;
 			case "btn_to_cls_date":	
 				if (document.getElementById('btn_to_cls_date').disabled) {
 					return;
 				}
 				var cal=new ComCalendarFromTo();
 				cal.displayType="date";
 				cal.select(formObj.fm_cls_date, formObj.to_cls_date, 'MM-dd-yyyy');
 				break;
 			break;
 			case "btn_ctrt_no" :	
 				 CtrtPopup();
 			break;
 			case "btn_cust_cd" :	
 				CustomerPopup();
 			break;
 			case "btn_ofc_cd":
 				var formObj = document.form;
 				
 				rtnary=new Array(2);
 		   		rtnary[0]="1";
 		   		sUrl="./CMM_POP_0150.clt?";
 				
 				callBackFunc = "setOffice";
 				modal_center_open(sUrl, rtnary, 556,600,"yes");
 				
//			    modal_center_open('./CMM_POP_0050.clt?ofc_cd='+formObj.ofc_cd.value, callBackFunc, 900,620,"yes");
				break;
 			case "SEARCHLIST":
 				btn_Search();
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
 			case "cls_no":	
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
 /**
  * 버튼 클릭 이벤트모음 시작
  */
 
 function goToPage(callPage){
	 docObjects[0].RemoveAll();
	 document.form.f_CurPage.value=callPage; 
//	 doWork('btn_Search');
	 btn_Search();
	} 

function searchList(){
	document.form.f_CurPage.value=1;
//	doWork('btn_Search');
	btn_Search();
}
 
 function btn_Search() {	
 	var formObj=document.form;
 	var sheetObj=sheetObjects[0];
 	if(loading_flag != "Y"){
 		return;
 	}
 	if (validateForm(formObj, 'search')) {
 		formObj.f_cmd.value = SEARCH;
 		sheetObj.DoSearch("./searchClosingBackgroundListGS.clt", FormQueryString(formObj, "")+"&f_Paging="+formObj.f_Paging.value);
 		}
// 		var xml = convertColOrder(sXml, fix_grid01);
//		sheetObj.LoadSearchData(xml,{Sync:1} );
// 	}
 }
 
 function CtrtPopup(){
	var formObj = document.form;
	var ctrt_nm = formObj.ctrt_nm.value
	if(ctrt_nm == "null"){
		 ctrt_nm = "";
	}
	callBackFunc = "setCtrtNoInfo";
	modal_center_open('./ContractRoutePopup.clt?ctrt_no='+formObj.ctrt_no.value + "&ctrt_nm=" + ctrt_nm, callBackFunc, 900, 580,"yes");
 }
 function CustomerPopup(){
 	var formObj=document.form;
 	var sUrl="./CMM_POP_0010.clt?cust_nm="+formObj.cust_nm.value
 								+ "&ctrt_no=" + $("#ctrt_no").val() 
 							    + "&ctrt_nm=" + $("#ctrt_nm").val()
 								+ "&in_part_tp=C";
 	ComOpenPopup(sUrl, 1150, 650, "setServiceProvider", "0,0", true);
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
 
 function setServiceProvider(rtnVal){
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
		  }else{
			  var rtnValAry=rtnVal.split("|");
			   formObj.cust_cd.value=rtnValAry[0];//full_nm
			   formObj.cust_nm.value=rtnValAry[1];//full_nm
		  }
 }
 function setOffice(rtnVal){
 	var formObj=document.form;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 	   return;
 	  }else{
 		  var rtnValAry=rtnVal.split("|");
 		   formObj.ofc_cd.value=rtnValAry[0];//full_nm
 		   formObj.ofc_nm.value=rtnValAry[1];//full_nm
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
/* function getLocInfo(obj){
 	if(obj.value != ""){
 		var sXml=sheetObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+obj.value+"&type=WH");
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
 }*/
 function getLocInfo(obj){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+obj.value+'&type=WH', './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.wh_cd.value="";
	    formObj.wh_nm.value=""; 
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
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
 /*function getCtrtInfo(obj){
 	if(obj.value != ""){
 		var sXml=sheetObjects[0].GetSearchData("searchCtrtInfo.clt?ctrt_no="+obj.value);
 		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultCtrtInfo(sXml);
 	}
 	else
 	{
 		$("#ctrt_nm").val("");
 	}
 }
 function resultCtrtInfo(resultXml) {
		var formObj=document.form;
		if(getXmlDataNullToNullString(resultXml,'ctrt_nm') != ""){
			formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml,'ctrt_nm');
		}else{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";
		}
	}*/
 function getCtrtInfo(){
		var formObj=document.form;
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
	}
	function resultCtrtInfo(reqVal){
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
		else{
			//alert(getLabel('SEE_BMD_MSG43'));
		}
	}
 
	/*
	 * Customer search
	 * OnKeyDown 13 or onChange
	 */
/*	function getCustomerInfo(obj){
		if(obj.value != ""){
			var sXml=sheetObjects[0].GetSearchData("searchTlCustInfo.clt?cust_cd="+obj.value);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultCustomerInfo(sXml);
		}
		else
		{
			$("#cust_nm").val("");
		}
	}
	function resultCustomerInfo(resultXml) {
		var formObj=document.form;
		if(getXmlDataNullToNullString(resultXml,'cust_nm') != ""){
			formObj.cust_nm.value=getXmlDataNullToNullString(resultXml,'cust_nm');
		}else{
			formObj.cust_cd.value="";
			formObj.cust_nm.value="";
		}
	}*/
 function searchTlCustInfo(){
		var formObj=document.form;
		ajaxSendPost(resultCustomerInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.cust_cd.value, './GateServlet.gsl');
	}
	function resultCustomerInfo(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		var formObj=document.form;
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				//조회해온 결과를 Parent에 표시함
				var rtnArr=doc[1].split('^@');
				if(rtnArr[0] != ""){
					formObj.cust_nm.value=rtnArr[0];
				}
				else{
					formObj.cust_cd.value="";
					formObj.cust_nm.value="";	
				}
			}
			else{
				formObj.cust_cd.value="";
				formObj.cust_nm.value="";	
			}
		}
		else{
			//alert(getLabel('SEE_BMD_MSG43'));
		}
	}
	/*
	 * Office search
	 * OnKeyDown 13 or onChange
	 */
	/*function getOfficeInfo(obj){
		if(obj.value != ""){
			var sXml=sheetObjects[0].GetSearchData("searchTlOrgInfo.clt?office_cd="+obj.value);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultOfficeInfo(sXml);
		}
		else
		{
			$("#ofc_nm").val("");
		}
	}
	function resultOfficeInfo(resultXml) {
		var formObj=document.form;
		if(getXmlDataNullToNullString(resultXml,'office_nm') != ""){
			formObj.ofc_nm.value=getXmlDataNullToNullString(resultXml,'office_nm');
		}else{
			formObj.ofc_cd.value="";
			formObj.ofc_nm.value="";
		}
	}*/
	function getOfficeInfo(){
		var formObj=document.form;
		ajaxSendPost(resultOfficeInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&office_cd='+formObj.ofc_cd.value, './GateServlet.gsl');
	}
	function resultOfficeInfo(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		var formObj=document.form;
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				//조회해온 결과를 Parent에 표시함
				var rtnArr=doc[1].split('^@');
				if(rtnArr[0] != ""){
					formObj.ofc_nm.value=rtnArr[0];
				}
				else{
					formObj.ofc_cd.value="";
					formObj.ofc_nm.value="";	
				}
			}
			else{
				formObj.ofc_cd.value="";
				formObj.ofc_nm.value="";	
			}
		}
		else{
			//alert(getLabel('SEE_BMD_MSG43'));
		}
	}
	/*
	 * Validation
	 */
	function validateForm(formObj, sAction) {
		with (formObj) {
			switch (sAction) {
			case 'search':
				//날짜 체크
				if(ComIsEmpty(formObj.fm_cls_date) && ComIsEmpty(formObj.to_cls_date))
				{
					ComShowCodeMessage("COM0114","Closing Date");
					$("#fm_cls_date").focus();
					return false;
				}
				if(ComIsEmpty(formObj.fm_cls_date) && ComIsEmpty(formObj.to_cls_date)){
					formObj.to_cls_date.value=ComGetNowInfo();
				}
				if (ComIsEmpty(formObj.fm_cls_date) && !ComIsDate(formObj.fm_cls_date.value)) {
					ComShowCodeMessage("COM0114","Closing Date");
					formObj.fm_cls_date.focus();
					return false;
				}
				if (ComIsEmpty(formObj.to_cls_date) && !ComIsDate(formObj.to_cls_date.value)) {
					ComShowCodeMessage("COM0114","Closing Date");
					formObj.to_cls_date.focus();
					return false;
				}
				if ((ComIsEmpty(formObj.fm_cls_date)&&ComIsEmpty(formObj.to_cls_date))||(ComIsEmpty(formObj.fm_cls_date)&&!ComIsEmpty(formObj.to_cls_date))) {
					ComShowCodeMessage("COM0122","Closing Date");
					formObj.fm_cls_date.focus();
					return false;
				}
				if (getDaysBetween(formObj.fm_cls_date, formObj.to_cls_date, 'MM-dd-yyyy')<0) {
					ComShowCodeMessage("COM0122","Closing Date");
					formObj.fm_cls_date.focus();
					return false;
				}
			}
		}
		return true;
	}
	
	function codeNameAction(str, tmp){
		var formObj=document.form;
		if( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.ofc_cd.value, './GateServlet.gsl');
			}
		}else if( tmp == "onBlur" ) {
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+formObj.ofc_cd.value, './GateServlet.gsl');
		}
	}

	function dispCodeNameAjaxReq(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		var formObj=document.form;
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				//조회해온 결과를 Parent에 표시함
				var rtnArr=doc[1].split('@@^@@^@@^');
				if(rtnArr[0] != ""){
					formObj.ofc_nm.value=rtnArr[1];
				}
				else{
					formObj.ofc_cd.value="";
					formObj.ofc_nm.value="";	
				}
			}
			else{
				formObj.ofc_cd.value="";
				formObj.ofc_nm.value="";	
			}
		}
		else{
			//alert(getLabel('SEE_BMD_MSG43'));
		}
	}