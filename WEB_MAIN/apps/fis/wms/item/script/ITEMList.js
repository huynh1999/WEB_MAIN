/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITList.js
*@FileTitle  : Item List
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================*/

var rtnary=new Array(2);
var callBackFunc = "";

var docObjects=new Array();
var sheetCnt=0;
function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		var cal=new ComCalendar();
		switch(srcName) {
			case "SEARCHLIST":	
				btn_Search();
				break;
			//LKH::2015-09-27 WMS3.O 긴급수정3
			case "NEW":
				//parent.parent.mkNewFrame('Item Entry', './ITMgmt.clt');
				
				// 2017.11.21 #3255 [BINEX] [WMS4.0] ITEM LIST TO ENTRY
				var formObj=document.form;			
				var paramStr="./ITMgmt.clt?"+ "sCtrt_no=" + formObj.ctrt_no.value ;
				parent.parent.mkNewFrame('Item Management', paramStr);
				
				break;
			case "EXCEL":	
				btn_Excel();
				break;
			case "COPY":
				btn_Copy();
				break;
			case "CREATE_ITEM":
				create_item();
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

function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	
    var opt_key = "CTRT_ITEM_BARCODE_FLG";
	ajaxSendPost(setItemBarcode, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	 setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no)); 
	 setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
	var formObj=document.form;
//	if(formObj.ctrt_no.value != "" && formObj.cust_item_no.value != ""){
//		btn_Search();
//	}	
	// OFVFOUR-7333: [HANARO AUSTIN] DISPLAYING ITEM'S DIMENSION WITHIN OPUS
	setChkShowDimCols();
	//initControl();
	//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[1], false,"fnRestoreGridSetEnd"); 
    
    //OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
    if(isHiddenBarcode == false){
    	document.getElementById("barcode_label").style.display="inline";
    	document.getElementById("barcode_no").style.display="inline";
    }else{
    	document.getElementById("barcode_label").style.display="none";
    	document.getElementById("barcode_no").style.display="none";
    }
}
//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
function fnRestoreGridSetEnd(){
	
}	
function getPageURL() {
	return document.getElementById("pageurl").value;
}

//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet2_OnSelectMenu(sheetObj, MenuString){
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
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
    //- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	       
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ITList_SHEET1_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"supp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"supp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 } ];
	       
	      InitColumns(cols);
	      SetVisible(false);
	      SetEditable(1);
	            }
	      break;


		case 2:      //IBSheet1 init
		    with(sheetObj){
	       
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ITList_SHEET2_HDR1'), Align:"Center"},
	                      { Text:getLabel('ITList_SHEET2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [
			  	 {Type:"Seq",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
			     {Type:"CheckBox",  Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"copy_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:1,   InsertEdit:1 },
			  	 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:310,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"item_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,  Align:"Center",  ColMerge:1,   SaveName:"ctrt_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv1_unit_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv1_qty",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_pkgbaseqty",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv3_unit_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv3_qty",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv4_unit_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv4_qty",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_length",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_width",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_height",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"item_cbm",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:WMS_CBM_POINT_COUNT, UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_kgs",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:3,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"item_net_wgt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:3,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"item_use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_id",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rgst_sys_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_id",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"modi_sys_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
	      ];
	      //OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
		  cols.push({Type:"Text",      Hidden:isHiddenBarcode ? 1:0,  Width:70,   Align:"Center",    ColMerge:1,   SaveName:"barcode_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,                   UpdateEdit:0,   InsertEdit:0,   EditLen:0 });
	      cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });

	      InitColumns(cols);
          SetSheetHeight(420);
          //#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
          SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
          SetEditable(1);
          resizeSheet();
	            }
	      break;
	}
}
function resizeSheet(){
	ComResizeSheet(sheet2);
}
function sheet2_OnSearchEnd(sheetObj, ErrMsg) {
	var formObj=document.form;	
	var sheetObj=docObjects[1];
	doDispPaging(sheetObj.GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	sheetObj.SetTotalRows(sheetObj.RowCount());
}
function sheet2_OnDblClick(sheetObj,Row,Col){
	var paramStr="./ITMgmt.clt?ctrt_no="+sheetObj.GetCellValue(Row,"ctrt_no")+"&ctrt_nm="+sheetObj.GetCellValue(Row,"ctrt_nm")+"&item_cd="+encodeURIComponent(sheetObj.GetCellValue(Row,"item_cd"))+"&item_sys_no="+sheetObj.GetCellValue(Row,"item_sys_no");
    parent.mkNewFrame('Item Management', paramStr,"ITMgmt_" + sheetObj.GetCellValue(Row,"ctrt_no") + "_" + sheetObj.GetCellValue(Row,"ctrt_nm") + "_" + sheetObj.GetCellValue(Row,"item_cd") + "_" + sheetObj.GetCellValue(Row,"item_sys_no"));
}

function btn_Search(){
	var formObj=document.form;
	if (validateForm(docObjects[1],formObj,'Search')) {
		docObjects[1].RemoveAll();
		formObj.f_cmd.value=SEARCH;
 		docObjects[1].DoSearch("./ITEMListGS.clt", FormQueryString(formObj));
	}
}

function btn_ctrt(){
	var formObj=document.form;
	var sUrl="ContractRoutePopup.clt";
      
    callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}

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

function btn_supp(){
	var formObj=document.form;
	rtnary=new Array(1);
    rtnary[0]="";
//    rtnary[1]=formObj.supp_nm.value;
    rtnary[1]="";
    rtnary[2]=window;
	var sUrl="CMM_POP_0010.clt";
    callBackFunc = "setShipperInfo";
    modal_center_open(sUrl, rtnary, 900,630,"yes");
}
function btn_supp_nm(){
	var formObj=document.form;
	rtnary=new Array(1);
    rtnary[0]="";
    rtnary[1]=formObj.supp_nm.value;
    rtnary[2]=window;
	callBackFunc = "setServiceProvider";
    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}

function setServiceProvider(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("|");
		   formObj.supp_cd.value=rtnValAry[0];//full_nm
		   formObj.supp_nm.value=rtnValAry[1];//full_nm
	  }
}
function setShipperInfo(rtnVal){
	var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("|");
		   formObj.supp_cd.value=rtnValAry[0];//full_nm
		   formObj.supp_nm.value=rtnValAry[2];//full_nm
	  }
}

function searchCtrtPop(obj){
	var formObj=document.form;
	var sUrl="ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
      
    callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function btn_grp_cd(){
	var formObj=document.form;
	var sUrl="ItemGroupPopup.clt?ctrt_no=" + formObj.ctrt_no.value + "&ctrt_nm=" + formObj.in_ctrt_nm.value;
      
    callBackFunc = "setItemGroupCode";
    modal_center_open(sUrl, callBackFunc, 700, 470,"yes");
}

function setItemGroupCode(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.grp_cd.value=rtnValAry[0];//full_nm
	}
}

function getItemGroup(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.grp_cd.value="";
	}else{
		searchItemGroup(formObj, ComGetObjValue(formObj.grp_cd), "grp_cd");
	}
}
function searchItemGroup(form, grp_cd, col_nm){
	var formObj=document.form;
	ajaxSendPost(resultItemGroup, 'reqVal','&goWhere=aj&bcKey=searchItemGroup&in_grp_cd='+grp_cd, './GateServlet.gsl');
}
function resultItemGroup(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.grp_cd.value=rtnArr[0];
			}
			else{
				formObj.grp_cd.value="";
			}
		}
		else{
			formObj.grp_cd.value="";
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Search':
			if(formObj.ctrt_no.value == ""){
				alert("Please Enter Contract No.");
				formObj.ctrt_no.focus();
				return false;
			}
			break;
		}
	}
	return true;
}
function getCustInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.supp_cd.value="";
		form.supp_nm.value="";
	}else{
		searchTlCustInfo(formObj, ComGetObjValue(formObj.supp_cd), "supp_cd");
	}
}
function searchTlCustInfo (form, cust_cd, col_nm){
	if( form.search_flg.value == "N"){
		form.search_flg.value='Y';
		ajaxSendPost(resultCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+cust_cd, './GateServlet.gsl');
		form.search_flg.value='N';
	}	
}
function resultCustInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.supp_nm.value=rtnArr[0];
			}
			else{
				formObj.supp_cd.value="";
				formObj.supp_nm.value="";	
			}
		}
		else{
			formObj.supp_cd.value="";
			formObj.supp_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
//supplier
function supplier(){
	var formObj=document.form;
	if(formObj.supp_cd.value != "" || formObj.supp_nm.value != "" ){
		ajaxSendPost(supplierInfo,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+"trdpCode"+'&s_code='+formObj.supp_cd.value, './GateServlet.gsl');
	}
}
function supplierInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.supp_nm.value=rtnArr[0];
			}
			else{
				formObj.supp_cd.value="";
				formObj.supp_nm.value="";	
			}
		}
		else{
			formObj.supp_cd.value="";
			formObj.supp_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

//Contract No 조회
function searchTlCtrtInfo(){
	var formObj=document.form;
	if(formObj.ctrt_no.value != "" || formObj.ctrt_nm.value != "" ){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
	}
}
function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	}else{
		searchCtrtInfo(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
	}
}
function searchCtrtInfo (form, ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal){
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
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function btn_New(){
	var formObj=document.form;
	var paramStr="./ITMgmt.clt?";
    parent.mkNewFrame('Item Management', paramStr ,"ITMgmt_" + formObj.ctrt_no.value + "_" + formObj.ctrt_nm.value);
}
function btn_Excel()
{
 	//$("#sheet2")[0].Down2Excel({ HiddenColumn:-1});
 	if(sheet2.RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	docObjects[1].Down2Excel( {DownCols: makeHiddenSkipCol(sheet2), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
    }
}
function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "CUSTUMER"){
			formObj.supp_cd.value="";//cust_cd  AS param1
			formObj.supp_nm.value="";//cust_nm   AS param2
		}
		/*if (CODETYPE == "commodity") {
			formObj.itm_hts_cd.value="";// itm_hts_cd AS param1
			formObj.itm_hts_nm.value="";// itm_hts_nm AS param2
		}*/
	}
}
var CODETYPE='';
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.supp_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.supp_nm.value=masterVals[3];	//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.supp_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.supp_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.trkr_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.supp_cd.value="";				//cust_cd  AS param1
				formObj.supp_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.supp_cd.value="";				//itm_hts_cd  AS param1
				formObj.supp_nm.value="";				//itm_hts_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value="";				//itm_hts_cd  AS param1
				formObj.trkr_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

var rtnary;

function btn_Copy() {
	if(sheet2.RowCount() < 1 || sheet2.FindCheckedRow("copy_chk") == ""){
		return alert("Please select Item(s) first!");
	}
	var formObj=document.form;
	rtnary = [];
	rtnary[0] = formObj.ctrt_no.value;
	callBackFunc = "CopyTo";
	modal_center_open('./ITEMCopyPOP.clt', rtnary, 350,185,"yes");
}

function CopyTo(rtarray){
	if(typeof rtarray == 'undefined') return;
	var formObj=document.form;
	var rowCheck = sheet2.FindCheckedRow("copy_chk").split('|');
	var queryString = "&goWhere=aj&bcKey=ItemCopySave" + "&old_ctrt_no=" + formObj.ctrt_no.value + "&new_ctrt_no=" + rtarray[1] + "&user_id=" + formObj.user_id.value;
	var arrSys_no = '', first = true;
	rowCheck.forEach(function(row, index){
		if(first){first=false;}
		else{arrSys_no+=",";}
		arrSys_no += sheet2.GetRowJson(parseInt(row)).item_cd;
	});
	queryString += "&item_cd_arr=" + arrSys_no;
	doShowProcess();
	ajaxSendPost(resultSaveData, 'reqVal', queryString, './GateServlet.gsl');
}

function resultSaveData(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		var rtnArr=doc[1].split('||');
		if(rtnArr[1] == "DUP"){
			alert("Item " + rtnArr[2] + " exist already in the Contract " + rtnArr[3] + ".");
		}else{
			alert("Copy successfuly.");
		}
	}
	else{
		alert("Request error.");
	}
	doHideProcess();
}
function create_item(){
	var formObj=document.form;
	var sUrl="WHCreateMultiItemPopup.clt?ctrt_no=" + formObj.ctrt_no.value + "&ctrt_nm=" + formObj.in_ctrt_nm.value;
      
    callBackFunc = "setCreateItem";
    modal_center_open(sUrl, callBackFunc, 900, 570,"yes");
}

// OFVFOUR-7333: [HANARO AUSTIN] DISPLAYING ITEM'S DIMENSION WITHIN OPUS
function setChkShowDimCols(){
	// Show or Hide item dimension columns (Y : Show, N : Hide)
	// Default : N
	var opt_key = "CTRT_ITEM_LIST_DIM_COL";
	ajaxSendPost(setShowDimCols, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setShowDimCols(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == 'Y'){
			docObjects[1].SetColHidden("item_length", 0);
			docObjects[1].SetColHidden("item_width", 0);
			docObjects[1].SetColHidden("item_height", 0);
		}
	} 
}

function setCreateItem(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
}
//OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS
var isHiddenBarcode = true;
function setItemBarcode(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined ) {
		isHiddenBarcode = false;
	}
}