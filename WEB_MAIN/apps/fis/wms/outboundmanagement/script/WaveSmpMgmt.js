/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveSmpMgmt.js
*@FileTitle  : Inbound Search
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2015/04/13
=========================================================*/
//docObjects
var docObjects=new Array();
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01 = "Grd01"; //LIST
var fix_grid02 = "Grd02"; //ORDER LIST
var fix_grid03 = "Grd03"; //WAVE
var fix_grid04 = "Grd04"; //ALLC
var fix_grid05 = "Grd05"; //UN
var fix_grid06 = "Grd06"; //outbound summary
var firCalFlag=false;
var callBackFunc = "";
var rtnary = new Array(1);
//Object
var formObj = null;
var sheetObj= null;
var loading_flag = 'N';

//Merge Sheet (S)
var startRow = 0;
var totalRowMerge = 0;
	//Sheet 1
var wave_no  		="";
var wave_dt 		="";
var ori_wave_no  	="";
var ori_wave_dt 	="";
	//Sheet 4
var cust_ord_no			="";
var ord_tp_nm           ="";
var bk_sts_nm           ="";
var item_cd             ="";
var item_nm             ="";
var allc_merge_key      ='';
var lot_no              ='';
var wh_loc_cd_nm        ='';
var allc_item_ea_qty    ='';
var pick_item_ea_qty    ='';

var ori_cust_ord_no     ="";
var ori_ord_tp_nm       ="";
var ori_bk_sts_nm       ="";
var ori_item_cd         ="";
var ori_item_nm         ="";
var ori_allc_merge_key      ='';
var ori_lot_no              ='';
var ori_wh_loc_cd_nm        ='';
var ori_allc_item_ea_qty    ='';
var ori_pick_item_ea_qty    ='';
	//Sheet 3&5
var strg_sys_no         ="";
var cust_ord_no         ="";
var item_cd             ="";
var item_nm             ="";
var item_pkgunit        ="";
var item_pkgqty         ="";
var item_ea_qty         ="";
var allc_sum_ea_qty     ="";
var un_alloc_ea_qty     ="";
var stock_qty     		="";

var ori_strg_sys_no     ="";
var ori_cust_ord_no     ="";
var ori_item_cd         ="";
var ori_item_nm         ="";
var ori_item_pkgunit    ="";
var ori_item_pkgqty     ="";
var ori_item_ea_qty     ="";
var ori_allc_sum_ea_qty ="";
var ori_un_alloc_ea_qty ="";	
var ori_stock_qty 		="";	
	
//Merge Sheet (E)
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	formObj = document.form;
	sheetObj=docObjects[0];
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject,i+1);
	    comEndConfigSheet(sheetObject);
	}
	initCombo();
	loading_flag = 'Y';
	
	$("#list_wh_cd").val($("#def_wh_cd").val());
	$("#list_ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#list_ctrt_nm").val($("#def_wh_ctrt_nm").val());
	$("#list_fm_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#list_to_date").val(ComGetNowInfo());	
	
	
	$("#wave_wh_cd").val($("#def_wh_cd").val());
	$("#wave_wh_nm").val($("#def_wh_nm").val());
	$("#wave_ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#wave_ctrt_nm").val($("#def_wh_ctrt_nm").val());
	$("#wave_fm_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#wave_to_date").val(ComGetNowInfo());	
	
	goTabSelect('01');
	if($("#req_wave_no").val() != "")
	{ 
		goTabSelect('02');
		searchWaveInfo($("#req_wave_no").val(), "sheet3");
	}
	else if($("#req_wob_bk_no").val() != "")
	{ 
		goTabSelect('02');
		searchNewWaveInfo($("#req_wave_no").val());
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * 부킹화면에서 wave no에 신규추가하기위해 넘어온 no
 */
function searchNewWaveInfo()
{
	commonModeChange("SEARCH_NEW");	
	var sXml = sheet2.GetSearchData("searchWaveSimpleNewOrderListReqWobBkNoGS.clt", "req_wob_bk_no=" + $("#req_wob_bk_no").val()+"&f_cmd="+SEARCH04);
	if( sXml.indexOf('<ERROR>') > -1){
		alert(sXml);
		return;
	}
	sheet2.LoadSearchData(sXml);
	if(sheet2.RowCount() > 0)
	{
		$("#wh_cd").val(sheet2.GetCellValue(sheet2.HeaderRows(), fix_grid02 + "wh_cd"));
	}
}

function initCombo(){
	var vTextSplit = null;
	var vCodeSplit = null;
	if(rtn_bk_sts_cdCode.length > 0){
		vTextSplit = rtn_bk_sts_cdText.split("|");
		vCodeSplit = rtn_bk_sts_cdCode.split("|");
		
		$('#list_bk_sts_cd').append($('<option>', {
		    value: 'ALL',
		    text : 'ALL'
		}));
		for (i = 0; i < vTextSplit.length; i++) { 
			if(vCodeSplit[i].trim().length > 0){
				$('#list_bk_sts_cd').append($('<option>', {
				    value: vCodeSplit[i],
				    text : vTextSplit[i]
				}));
			}
		}
	}
	if(ord_tp_cdCode.length > 0){
		vTextSplit = ord_tp_cdText.split("|");
		vCodeSplit = ord_tp_cdCode.split("|");
		
		$('#wave_ord_tp_cd').append($('<option>', {
		    value: 'ALL',
		    text : 'ALL'
		}));
		for (i = 0; i < vTextSplit.length; i++) { 
			if(vCodeSplit[i].trim().length > 0){
				$('#wave_ord_tp_cd').append($('<option>', {
				    value: vCodeSplit[i],
				    text : vTextSplit[i]
				}));
			}
		}
	}
}

function doWork(srcName){
	try {
		switch(srcName) {
		case "SEARCHLIST": 	
			btnSearch();
			break;
		case "NEW": 	
			btnNew();
			break;
		case "SAVE": 	
			btnSave();
			break;
		case "DELETE": 	
			btnDelete()();
			break;
		case "PRINT": 	
			btn_Print();
			break;
		case "btn_list_date":	
			var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.list_fm_date, formObj.list_to_date, 'MM-dd-yyyy');
			break;	
		case "btn_wave_dt": 	
			var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.wave_fm_date, formObj.wave_to_date, 'MM-dd-yyyy');
			break;
		case "btn_pick_dt":	
			var cal = new ComCalendar();
            cal.select(formObj.pick_dt, 'MM-dd-yyyy');
			break;
		case "btn_outbound_dt":	
			var cal = new ComCalendar();
            cal.select(formObj.outbound_dt, 'MM-dd-yyyy');
			break;
		case "btn_list_ctrt_no" :
			CtrtPopup('list');
			break;
		case "btn_wave_ctrt_no" :
			CtrtPopup('wave');
		break;
		case "btn_loading_plan_view" :
			btn_loading_plan_view();
			break;
		case "btn_loading_plan_view2" :
			btn_loading_plan_view2();
			break;
		case "btn_pick_sht_view":
			btn_pick_sht_view();
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
 * NEW BUTTON
 */
function btnNew(){
	commonModeChange("NEW");
}

function CtrtPopup(src){
	var param = '';
	if(src == 'list'){
		param = "?ctrt_no=" + "&ctrt_use_flg=A";
	}else if(src == 'listEnter'){
		param = "?ctrt_no="  + "&ctrt_nm=" + formObj.list_ctrt_nm.value + "&ctrt_use_flg=A";
	}else if(src == 'wave'){
		param = "?ctrt_no="  + "&ctrt_use_flg=A";
	}else if(src == 'waveenter'){
		param = "?ctrt_no="  + "&ctrt_nm=" + formObj.wave_ctrt_nm.value + "&ctrt_use_flg=A";
	}
	
	if(src == 'listEnter'){
		src = 'list';
	}else if(src == 'waveenter'){
		src = 'wave';
	}
    callBackFunc = "setCtrtNoInfo_"+src;
    modal_center_open('./ContractRoutePopup.clt' + param, callBackFunc, 900, 580,"yes");
}

function setCtrtNoInfo_list(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.list_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.list_ctrt_nm.value=rtnValAry[1];//full_nm
	}
}
function setCtrtNoInfo_wave(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.wave_ctrt_no.value=rtnValAry[0];//full_nm
		formObj.wave_ctrt_nm.value=rtnValAry[1];//full_nm
	}
}

var ctrtFlag = '';
function getCtrtInfo2(objid,objname){
	var formObj=document.form;
	var flag = '';
	if(objid.value == ""){
		objid.value="";
		objname.value="";
	}else{
		if(objid.id == 'list_ctrt_no')
			flag = 'list';
		else
			flag = 'wave';
		searchCtrtInfo2(formObj,ComGetObjValue(objid),flag);
	}
}
function searchCtrtInfo2 (form, ctrt_no,flag){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	if(flag == 'list')
		ctrtFlag = 'list';
	else
		ctrtFlag = 'wave';
	ajaxSendPost(resultCtrtInfo2, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(ctrtFlag == 'list')
					formObj.list_ctrt_nm.value=rtnArr[0];
				else
					formObj.wave_ctrt_nm.value=rtnArr[0];
			}
			else{
				if(ctrtFlag == 'list'){
					formObj.list_ctrt_no.value='';
					formObj.list_ctrt_nm.value='';
				}
				else{
					formObj.wave_ctrt_no.value='';
					formObj.wave_ctrt_nm.value='';
				}
			}
		}
		else{
			if(ctrtFlag == 'list'){
				formObj.list_ctrt_no.value='';
				formObj.list_ctrt_nm.value='';
			}
			else{
				formObj.wave_ctrt_no.value='';
				formObj.wave_ctrt_nm.value='';	
			}
		}
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

/*
 * tab
 */
function goTabSelect(isNumSep) {
	$("#sel_tab").val(isNumSep);
    if( isNumSep == "01" ) { // List
    	document.all.Tab01.className="On";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="Off";     
        formObj.btnSearch.disabled = false;    
        formObj.btnSave.disabled   = true;    
        formObj.btnDelete.disabled = true;    
        formObj.btnPrint.disabled  = true;    
    } else if( isNumSep == "02" ) { // Wave
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="On";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="Off";
        formObj.btnSearch.disabled = false;  
        if($("#wave_no").val() == "")
    	{
        	formObj.btnSave.disabled   = true;    
        	formObj.btnDelete.disabled = true;    
        	formObj.btnPrint.disabled  = true;
    	}
        else
    	{
        	formObj.btnSave.disabled   = false;    
        	formObj.btnDelete.disabled = false;    
        	formObj.btnPrint.disabled  = false;
    	}
    } else if( isNumSep == "03" ) { // Allocated List
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="On";
        document.all.Tab04.className="Off";
        formObj.btnSearch.disabled = true;  
        if($("#wave_no").val() == "")
    	{
        	formObj.btnSave.disabled   = true;    
        	formObj.btnDelete.disabled = true;    
        	formObj.btnPrint.disabled  = true;
    	}
        else
    	{
        	formObj.btnSave.disabled   = false;    
        	formObj.btnDelete.disabled = false;    
        	formObj.btnPrint.disabled  = false;
    	}
    } else if( isNumSep == "04" ) { // Unallocated List
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="On"; 
        formObj.btnSearch.disabled = true;    
        formObj.btnSave.disabled   = true;    
        formObj.btnDelete.disabled = true;    
        formObj.btnPrint.disabled  = true;  
    }
    var tabObjs=document.getElementsByName('tabLayer');
    if(isNumSep=='01') {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='02') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='03') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='04') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';        
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
}

/*
 * manual allocation
 */
function btn_ManualAlloc(tab_div)
{
	var sheetObjO;
	var cond_div;
	switch(tab_div)
	{
		case ('wave'):
			sheetObjO = sheet3;
			cond_div = "ALL";
			break;
		case ('un'):
			sheetObjO = sheet5;
			cond_div = "UN";
			break;
		default:
			sheetObjO = sheet3;
			cond_div = "ALL";
			break;
	}
	if(sheetObjO.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return;
	}
	
	popupManualAllcPopup(cond_div, "A", "&search_no="   + $("#wave_no").val() 
            											+"&wh_cd=" + $("#wh_cd").val()
            											+ "&rum=1"
    );
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
    modal_center_open(sUrl, callBackFunc, 1200, 750,"yes");
}

function setManualAllc(rtnVal){
	if($("#sel_tab").val() =="02"){
		searchWaveInfo($("#wave_no").val(), "sheet2");
	}else if($("#sel_tab").val() == "04"){
		searchWaveInfo($("#wave_no").val(), "sheet5");
	}else{
		searchWaveInfo($("#wave_no").val(), "sheet2");
	}
}

function btnSearch()
{
	if(loading_flag != "Y"){
		return;
	}
	if($("#sel_tab").val() == "01")
	{
		//list tab
		searchListTab();
	}
	else if($("#sel_tab").val() == "02")
	{
		//wave tab
		searchWaveTab();
	}
	
}

function sheet1_OnSearchEnd(sheetObj){
	mergeCell(1);
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wave_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 + "wave_no", 1);
	}
}

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
	if(wave_no == ori_wave_no && wave_dt == ori_wave_dt){
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
	var sheetObj = sheet1;
	wave_no  	= sheetObj.GetCellValue(i, fix_grid01+"wave_no");
	wave_dt 	= sheetObj.GetCellValue(i, fix_grid01+"wave_dt");
}
function getData(i){
	var sheetObj = sheet1;
	ori_wave_no  	= sheetObj.GetCellValue(i, fix_grid01+"wave_no");
	ori_wave_dt 	= sheetObj.GetCellValue(i, fix_grid01+"wave_dt");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 1, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 2, totalRowMerge, 1);
}
function sheet1_OnSort(Col, SortArrow) {
	mergeCell(1);
}
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr = sheetObj.ColSaveName(Col);
	if(colStr == fix_grid01 + "wave_no")
	{
		searchWaveInfo(sheetObj.GetCellValue(Row, Col), "sheet1");
		goTabSelect('02');
	}
}	

function searchListTab()
{
	if (validateForm(formObj, 'search_list') == false) { return;	}
	formObj.f_cmd.value = SEARCH01;
	var sXml = sheet1.GetSearchData("searchWaveSimpleMgmtListGS.clt", FormQueryString(formObj,""));
	sheet1.LoadSearchData(sXml);
}

function searchWaveTab()
{
	if (validateForm(formObj, 'search_wave') == false) { return;	}
	commonModeChange("SEARCH_NEW");	
	formObj.f_cmd.value = SEARCH02;
	sheet2.DoSearch("searchWaveSimpleNewOrderListGS.clt", FormQueryString(formObj,""));
	//wave_wh_cd 에 조건으로 들어간 wh_cd넣기
    $("#wh_cd").val($("#wave_wh_cd").val());
}
function sheet2_OnChange(sheetObj, Row, Col, Value)
{
	var colStr = sheetObj.ColSaveName(Col);
	if(colStr == fix_grid02 + "cust_ord_no"){
		if (Value != "") {
			//dup체크
			var sParam = OrderSearchParam(sheetObj, Row, "wave_");
			if(sParam == ""){
				return;
			}
			ajaxSendPost(resultWaveOrder, 'reqVal', '&goWhere=aj&bcKey=searchWaveOrderSelect&wave_in_search_tp=CUST_ORD_NO&wave_in_no='+Value, './GateServlet.gsl');
			/*$.ajax({
				url : "searchWaveOrderSelect.do?"+sParam + "&wave_in_search_tp=CUST_ORD_NO&wave_in_no=" + Value,
				success : function(result) {
					
					//에러
					if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(result.xml,'exception_msg')); // There is no data.
						sheetObj.CellValue2(Row,Col)  = "";
						sheetObj.SelectCell(Row,Col);
						return;
					}
					var total_cnt = getXmlDataNullToNullString(result.xml, 'total_cnt');
					
					if(total_cnt != "1")
					{
						sUrl = "WaveOrderSelectPopup.do?" + sParam + "&wave_in_search_tp=CUST_ORD_NO&wave_in_no=" + Value;
						ComOpenPopup(sUrl, 1000, 550, "setBookingAddInfo", "0,0", true, sheetObj, Row, Col);
						return;
					}
					var Row1 = sheetObj.FindText(fix_grid02 + "wob_bk_no", getXmlDataNullToNullString(result.xml, 'wob_bk_no'), sheetObj.HeaderRows, -1, true);
					
					
					if(Row1 >= 0)
					{
						//ComShowCodeMessage("COM0158",Row1, "Order No(" + Value + ")");
						ComShowCodeMessage("COM0775", Row1, Value);
						sheetObj.SelectCell(Row1, fix_grid02 + "cust_ord_no");
						sheetObj.CellValue2(Row, Col) = "";
						return;
					}
					
					//중복건이 없을때 행추가
					sheetObj.CellValue2(Row, fix_grid02 + "cust_ord_no") = getXmlDataNullToNullString(result.xml, 'cust_ord_no');
					sheetObj.CellValue2(Row, fix_grid02 + "bk_sts_nm") = getXmlDataNullToNullString(result.xml, 'bk_sts_nm');
					sheetObj.CellValue2(Row, fix_grid02 + "est_out_dt") = getXmlDataNullToNullString(result.xml, 'est_out_dt');
					sheetObj.CellValue2(Row, fix_grid02 + "ship_to") = getXmlDataNullToNullString(result.xml, 'ship_to');
					sheetObj.CellValue2(Row, fix_grid02 + "ctrt_no") = getXmlDataNullToNullString(result.xml, 'ctrt_no');
					sheetObj.CellValue2(Row, fix_grid02 + "ctrt_nm") = getXmlDataNullToNullString(result.xml, 'ctrt_nm');
					sheetObj.CellValue2(Row, fix_grid02 + "wob_bk_no") = getXmlDataNullToNullString(result.xml, 'wob_bk_no');
					sheetObj.CellValue2(Row, fix_grid02 + "bk_date") = getXmlDataNullToNullString(result.xml, 'bk_date');
					sheetObj.CellValue2(Row, fix_grid02 + "wh_cd") = getXmlDataNullToNullString(result.xml, 'wh_cd');
					sheetObj.CellValue2(Row, fix_grid02 + "wh_nm") = getXmlDataNullToNullString(result.xml, 'wh_nm');
					sheetObj.CellValue2(Row, fix_grid02 + "bk_sts_cd") = getXmlDataNullToNullString(result.xml, 'bk_sts_cd');
					sheetObj.CellEditable(Row, fix_grid02 + "cust_ord_no") = false;
				}
			});*/
		}
	}
	if(colStr == fix_grid02 + "chk"){
		//체크한 동일 booking no를 sheet3에서 조회하여 체크 또는 체크해제를 한다.
		var sel_wob_bk_no = sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no");
		var sheetObj3 = sheet3;
		for(var i=sheetObj3.HeaderRows(); i<=sheetObj3.LastRow();i++){
			if(sheetObj3.GetCellValue(i, fix_grid03 + "wob_bk_no") == sel_wob_bk_no && sheetObj3.GetCellEditable(i, fix_grid03 + "chk") == true)
			{
				sheetObj3.SetCellValue(i, fix_grid03 + "chk", Value);
			}
			
		}
	}
}
function resultWaveOrder(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				if(Number(rtnArr[0]) > 1){
					var sParam = OrderSearchParam(sheet2,sheet2.GetSelectRow(), "wave_");
					if(sParam == ""){
						return;
					}
					sUrl = "WaveOrderSelectPopup.clt?" + sParam;
					callBackFunc = "setBookingAddInfo";
					modal_center_open(sUrl, callBackFunc, 1000, 550,"yes");
				}else{
					var Row1 = -1;
					for(var i=sheet2.HeaderRows(); i<=sheet2.LastRow();i++){
						if(rtnArr[7] == sheet2.GetCellValue(i, fix_grid02 + "wob_bk_no") && sheet2.GetCellValue(i, fix_grid02 + "ibflag") != "D"){
							Row1 = i; 
							break;
						}
					}
					if(Row1 >= 0){
						ComShowCodeMessage("COM0775", Row1, sheet2.GetCellValue(Row1, fix_grid02 + "cust_ord_no"));
						sheet2.SetCellValue(sheet2.GetSelectRow(), fix_grid02 + "cust_ord_no","");
						sheet2.SelectCell(Row1, fix_grid02 + "cust_ord_no");
						return;
					}
					
					var Row = sheet2.GetSelectRow();
					//중복건이 없을때 행추가
					sheet2.SetCellValue(Row, fix_grid02 + "cust_ord_no",rtnArr[1],0);
					sheet2.SetCellValue(Row, fix_grid02 + "bk_sts_nm",rtnArr[2],0);
					sheet2.SetCellValue(Row, fix_grid02 + "est_out_dt",rtnArr[3],0);
					sheet2.SetCellValue(Row, fix_grid02 + "ship_to",rtnArr[4],0);
					sheet2.SetCellValue(Row, fix_grid02 + "ctrt_no",rtnArr[5],0);
					sheet2.SetCellValue(Row, fix_grid02 + "ctrt_nm",rtnArr[6],0);
					sheet2.SetCellValue(Row, fix_grid02 + "wob_bk_no",rtnArr[7],0);
					sheet2.SetCellValue(Row, fix_grid02 + "bk_date",rtnArr[8],0);
					sheet2.SetCellValue(Row, fix_grid02 + "wh_cd",rtnArr[9],0);
					sheet2.SetCellValue(Row, fix_grid02 + "wh_nm",rtnArr[10],0);
					sheet2.SetCellValue(Row, fix_grid02 + "bk_sts_cd",rtnArr[11],0);
					sheet2.SetCellEditable(Row, fix_grid02 + "cust_ord_no",false);
				}
			}
			else{
				ComShowCodeMessage("COM130401");
			}
		}
		else{
			ComShowCodeMessage("COM130401");
		}
	}
}

function OrderSearchParam(sheetObj ,Row, prefix)
{
	
	var wh_cd = "";
	var wh_nm = "";
	var ctrt_no = "";
	var ctrt_nm = "";
	if(sheetObj.RowCount <= 1)
	{
		if($("#wave_wh_cd").val().trim().length <= 0)
		{
			//ComShowCodeMessage("COM0114","Warehouse");
			ComShowCodeMessage("COM0493");
			$("#wave_wh_cd").focus();
			return "";
		}
		
		wh_cd = $("#wave_wh_cd").val().trim();
		wh_nm = $("#wave_wh_nm").val().trim();
		
		ctrt_no = $("#wave_ctrt_no").val().trim();
		ctrt_nm = $("#wave_ctrt_nm").val().trim();
		
	}
	else
	{
		if(sheetObj.CellValue(Row -1, fix_grid02+"wh_cd") == "" && $("#wave_wh_cd").val().trim().length <= 0)
		{
			//ComShowCodeMessage("COM0114","Warehouse");
			ComShowCodeMessage("COM0493");
			$("#wave_wh_cd").focus();
			return "";
		}
		if(sheetObj.CellValue(Row -1, fix_grid02+"wh_cd") != "")
		{
			wh_cd = sheetObj.CellValue(Row -1, fix_grid02+"wh_cd");
			wh_nm = sheetObj.CellValue(Row -1, fix_grid02+"wh_nm");
		}
		else
		{
			wh_cd = $("#wave_wh_cd").val().trim();
			wh_nm = $("#wave_wh_nm").val();
		}
		
		
		if(sheetObj.CellValue(Row -1, fix_grid02+"ctrt_no") != "")
		{
			ctrt_no = sheetObj.CellValue(Row -1, fix_grid02+"ctrt_no");
			ctrt_nm = sheetObj.CellValue(Row -1, fix_grid02+"ctrt_nm");
		}
		else
		{
			ctrt_no = $("#wave_ctrt_no").val().trim();
			ctrt_nm = $("#wave_ctrt_nm").val();
		}
	}
	$("#wh_cd").val(wh_cd);
	var sParam = prefix + "wh_cd=" + wh_cd + "&" + prefix + "wh_nm=" + encodeURIComponent(wh_nm) + "&" + prefix + "ctrt_no=" + ctrt_no + "&" + prefix + "ctrt_nm=" + encodeURIComponent(ctrt_nm);
	return sParam;

}
function sheet2_OnSearchEnd(sheetObj)
{
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid02 + "wave_no").trim() == "")
		{
			sheetObj.SetCellEditable(i, fix_grid02 + "chk",false);
		}
	}
	
	$("#issu_cnt_tot").val( sheetObj.ComputeSum("|" + fix_grid02 + "issu_cnt" + "|") );
	$("#lp_cnt_tot").val(sheetObj.ComputeSum("|" + fix_grid02 + "lp_cnt"+ "|") );
	$("#allc_cnt_tot").val(sheetObj.ComputeSum("|" + fix_grid02 + "allc_cnt"+ "|") );
	$("#pickd_cnt_tot").val(sheetObj.ComputeSum("|" + fix_grid02 + "pickd_cnt"+ "|") );
	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(i == sheetObj.HeaderRows())
		{
			$("#wave_wh_cd").val(sheetObj.GetCellValue(i, fix_grid02 + "wh_cd"));
			$("#wave_wh_nm").val(sheetObj.GetCellValue(i, fix_grid02 + "wh_nm"));
			$("#wave_ctrt_no").val(sheetObj.GetCellValue(i, fix_grid02 + "ctrt_no"));
			$("#wave_ctrt_nm").val(sheetObj.GetCellValue(i, fix_grid02 + "ctrt_nm"));	
			$("#ctrt_no").val(sheetObj.GetCellValue(i, fix_grid02 + "ctrt_no"));
		}
	}
}

/**
 * 
 * @param showFlg
 */
function btn_show_loading_plan() {
	if($("#wave_no").val() == "")
	{
		ComBtnDisable("btn_loading_plan_create");
		setEnableUnloadSht("btn_loading_plan_view", false, 5);
		return;
	}
	if($("#consol_no").val() != "")
	{
		ComBtnDisable("btn_loading_plan_create");
		setEnableUnloadSht("btn_loading_plan_view", true, 5);
		return;
	}
	if(sheet4.RowCount() == 0)
	{
		ComBtnDisable("btn_loading_plan_create");
		setEnableUnloadSht("btn_loading_plan_view", false, 5);
		return;
	}
	ComBtnEnable("btn_loading_plan_create");
	setEnableUnloadSht("btn_loading_plan_view", false, 5);
}


/**
 * 
 * @param showFlg
 */
function btn_show_pick_sht() {
	if($("#wave_no").val() == ""){
		ComBtnDisable("btn_pick_sht_create");
		setEnableUnloadSht("btn_pick_sht_view", false, 5);
		return;
	}
	if(sheet4.RowCount() == 0){
		ComBtnDisable("btn_pick_sht_create");
		setEnableUnloadSht("btn_pick_sht_view", false, 5);
		return;
	}
	if($("#pick_sht_yn").val() != "Y"){
		ComBtnEnable("btn_pick_sht_create");
		setEnableUnloadSht("btn_pick_sht_view", false, 5);
		return;
	}
	ComBtnDisable("btn_pick_sht_create");
	setEnableUnloadSht("btn_pick_sht_view", true, 5);
}


function btn_pick_sht_view()
{
	if($("#wave_no").val() == "")
	{
		return;
	}
	
	if(sheet4.RowCount() == 0)
	{
		return;
	}
	var sUrl = "WaveSmpWorkSht.clt?wave_no="+$("#wave_no").val() + "&allc_cnt_tot=" + $("#allc_cnt_tot").val() + "&lp_cnt_tot=" + $("#lp_cnt_tot").val();
	callBackFunc = "setWorkShtInfo";
	modal_center_open(sUrl, callBackFunc, 850,380,"yes");
}
function setWorkShtInfo(pick_sht_yn, wave_no, pick_dt, pick_hm_fr, pick_hm_to)
{
	if(pick_dt != null)
		$("#pick_dt").val(pick_dt);
	if(pick_hm_fr != null)
		$("#pick_hm_fr").val(pick_hm_fr);
	if(pick_hm_to != null)
		$("#pick_hm_to").val(pick_hm_to);
	if(pick_sht_yn != null)
		$("#pick_sht_yn").val(pick_sht_yn);
	btn_show_pick_sht();
}

function btn_loading_plan_view()
{
	if($("#wave_no").val() == "")
	{
		return;
	}
	
	if($("#sheet4")[0].RowCount == 0)
	{
		return;
	}
	var sUrl = "LoadingPlanWavePopup.clt?wave_no="+$("#wave_no").val() + "&consol_no=" + $("#consol_no").val()  + "&wh_cd="+ $("#wh_cd").val() ;
	
	callBackFunc = "setLoadingPlan";
	modal_center_open(sUrl, callBackFunc, 1000,700,"yes");

}

function btn_loading_plan_view2()
{
	if($("#wave_no").val() == "")
	{
		return;
	}
	
	if($("#consol_no").val() == "")
	{
		return;
	}
	
	var sUrl = "LoadingPlanWavePopup.clt?wave_no="+$("#wave_no").val() + "&consol_no=" + $("#consol_no").val()  + "&wh_cd="+ $("#wh_cd").val() ;
	
	callBackFunc = "setLoadingPlan";
	modal_center_open(sUrl, callBackFunc, 1000,700,"yes");
}

function setLoadingPlan()
{
	searchWaveInfo($("#wave_no").val(), "sheet4");
}
/**
 * Unloading Sheet Doc icon 활성화 여부
 */
function setEnableUnloadSht(btId, bEnable, flg)
{
	if (flg == 5) {
	    if (bEnable) {
	        document.getElementById(btId).src =  "web/img/main/icon_doc.gif";
	        document.getElementById(btId).disabled = false;
	    } else {
	        document.getElementById(btId).src =  "web/img/main/icon_doc_g.gif";
	    	document.getElementById(btId).disabled = true;
	    }
	}
}

/*
 * 각모드별 화면을 init셋팅
 */
function commonModeChange(mode)
{
	switch(mode)
	{
		case "NEW" :
			commonButtonChange("NEW"); //버튼
			$("#mode").val("SEARCH_NEW");
			sheet2.RemoveAll();
			sheet3.RemoveAll();
			sheet4.RemoveAll();
			sheet5.RemoveAll();
			sheet6.RemoveAll();
			//form tab의 input filed clear
			$('#divForm1').children().find('input').each(function(){
				$(this).val('');
			});
			$('#divForm2').children().find('input').each(function(){
				$(this).val('');
			});
			
			$("#rmk").val("");
			$("#un_wave_no").val("");
			$("#issu_cnt_tot").val("");
			$("#lp_cnt_tot").val("");
			$("#allc_cnt_tot").val("");
			
			btn_show_loading_plan();
			btn_show_pick_sht();
			break;
		case "SEARCH_NEW":
			commonButtonChange(mode); //버튼
			sheet2.RemoveAll();
			sheet3.RemoveAll();
			sheet4.RemoveAll();
			sheet5.RemoveAll();
			$("#mode").val(mode);
			//form tab의 input filed clear
			$('#divForm1').children().find('input').each(function(){
				   $(this).val('');
				});
			$('#divForm2').children().find('input').each(function(){
				   $(this).val('');
				});
			$("#rmk").val("");
			
			$("#issu_cnt_tot").val("");
			$("#lp_cnt_tot").val("");
			$("#allc_cnt_tot").val("");
			
			btn_show_loading_plan();
			btn_show_pick_sht();
			break;
		case "SEARCH_MGMT":
			commonButtonChange(mode); //버튼
			$("#mode").val(mode);
			break;
	}
}

/*
 * 버튼 change
 */
function commonButtonChange(mode)
{
	switch(mode)
	{
		case "NEW" :
			//tab2
			formObj.btnSave.disabled = true;
			formObj.btnDelete.disabled = true;
			formObj.btnPrint.disabled = true;
			formObj.btn_allocation_wave.disabled = true;
			formObj.btn_manualalloc_wave.disabled = true;
			formObj.btn_cancel_wave.disabled = true;
			formObj.btn_add_sheet2.disabled = true;
			//tab3
			formObj.btn_picking.disabled = true;
			formObj.btn_shipping.disabled = true;
			formObj.btn_excel_allc.disabled = true;
			formObj.btn_cancel_allc.disabled = true;
			//tab4
			formObj.btn_allocation_un.disabled = true;
			formObj.btn_manualalloc_un.disabled = true;
			formObj.btn_excel_un.disabled = true;
			break;
		case "SEARCH_NEW" :
			//tab2
			formObj.btnSave.disabled = false;
			formObj.btnDelete.disabled = true;
			formObj.btnPrint.disabled = true;
			formObj.btn_allocation_wave.disabled = true;
			formObj.btn_manualalloc_wave.disabled = true;
			formObj.btn_cancel_wave.disabled = true;
			//tab3
			formObj.btn_picking.disabled = true;
			formObj.btn_shipping.disabled = true;
			formObj.btn_excel_allc.disabled = true;
			formObj.btn_cancel_allc.disabled = true;
			//tab4
			formObj.btn_allocation_un.disabled = true;
			formObj.btn_manualalloc_un.disabled = true;
			formObj.btn_excel_un.disabled = true;
			break;
		case "SEARCH_MGMT" :
			//tab2
			formObj.btnSave.disabled = false;
			formObj.btnDelete.disabled = false;
			formObj.btnPrint.disabled = false;
			formObj.btn_allocation_wave.disabled = false;
			formObj.btn_manualalloc_wave.disabled = false;
			formObj.btn_cancel_wave.disabled = false;
			formObj.btn_add_sheet2.disabled = false;
			//tab3
			formObj.btn_picking.disabled = false;
			formObj.btn_shipping.disabled = false;
			formObj.btn_excel_allc.disabled = false;
			formObj.btn_cancel_allc.disabled = false;
			//tab4
			formObj.btn_allocation_un.disabled = false;
			formObj.btn_manualalloc_un.disabled = false;
			formObj.btn_excel_un.disabled = false;
			break;
		
	}
}

/*
 * DELETE BUTTON
 */
function btnDelete()
{
	var sheetObj = sheet2;
	var saveXml = "";
	//valid check
	if(eval($("#issu_cnt_tot").val()) > 0){
		ComShowCodeMessage("COM0356"); //issu_cnt가 존재할경우
		return;
	}
	if(eval($("#lp_cnt_tot").val()) > 0){
		ComShowCodeMessage("COM0357"); //ship이 존재할경우
		return;
	}
	if(eval($("#pickd_cnt_tot").val()) > 0){
		ComShowCodeMessage("COM0455"); //picking이 존재할경우
		return;
	}
	//confirm
	if(!ComShowCodeConfirm("COM0053")){
		return;
	}
	var sXml = sheetObj.GetSaveData("deleteWaveSimpleMgmtGS.clt", "wave_no=" +$("#wave_no").val().trim() + "&wh_cd="+$("#wh_cd").val().trim()+"&f_cmd="+REMOVE);
	sheetObj.LoadSaveData(sXml);
}

// Main Save Button
function btnSave(){
	var sheetObjO; //cbm, kgs, net 정보 저장(alloc생성된 건만...)
	var sheetDatas = ""; 
	var sheetObjWait = "";
	//validation check
	if (validateForm(formObj, 'save') == false) {
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0063")){ 
		return;
	}
	var tl_wo_document_info_header = "";
	var mode 			=     tl_wo_document_info_header+"mode="			+$("#mode").val();
	var wave_no 		= "&"+tl_wo_document_info_header+"wave_no="			+$("#wave_no").val();
	var wh_cd 			= "&"+tl_wo_document_info_header+"wh_cd="			+$("#wh_cd").val();
	var pick_dt 		= "&"+tl_wo_document_info_header+"pick_dt="			+$("#pick_dt").val();
	var pick_hm_fr 		= "&"+tl_wo_document_info_header+"pick_hm_fr="		+$("#pick_hm_fr").val();
	var pick_hm_to 		= "&"+tl_wo_document_info_header+"pick_hm_to="		+$("#pick_hm_to").val();
	var outbound_dt		= "&"+tl_wo_document_info_header+"outbound_dt="		+$("#outbound_dt").val();
	var outbound_hm_fr	= "&"+tl_wo_document_info_header+"outbound_hm_fr="	+$("#outbound_hm_fr").val();
	var outbound_hm_to	= "&"+tl_wo_document_info_header+"outbound_hm_to="	+$("#outbound_hm_to").val();
	var rmk 			= "&"+tl_wo_document_info_header+"rmk="				+$("#rmk").val();
	var sel_tab         = "&"+tl_wo_document_info_header+"sel_tab="			+$("#sel_tab").val();
	var docinParamter   = mode+wave_no+wh_cd+pick_dt+pick_hm_fr+pick_hm_to+outbound_dt+outbound_hm_fr+outbound_hm_to+rmk+sel_tab;
	
	switch($("#sel_tab").val().trim())
	{
		case ("02"):
			sheetObjO = sheet2;
			sheetDatas = ComGetSaveString(sheetObjO, true, true);
			sheetObjWait = "sheet3";
			break;
		case ("03"):
			sheetObjO = sheet4;
			var data1 = ComReplaceStr(ComGetSaveString(sheetObjO, true, false), fix_grid04, fix_grid03); //allSave => false 트랜잭션이 발생한 것만 저장할 경우
			var data2 = ComGetSaveString(sheet6, true, false);
			sheetDatas = data1 + "&" + data2;
			sheetObjWait = "sheet4";
			break;
		default:
			sheetObjO = sheet2;
			sheetObjWait = "sheet3";
			break;
	}
	var sXml = sheetObjO.GetSaveData("saveWaveSimpleMgmtGS.clt","f_cmd="+MULTI01+"&"+docinParamter+"&"+sheetDatas);
	sheetObjO.LoadSaveData(sXml);
}

function sheet4_OnSaveEnd(code, msg) { 
	var mess = sheet4.GetEtcData("mess");
	//1. Cancel 후 조회
	if( mess == 'CANCEL' || mess == 'PICKING'){
		var value = sheet4.GetEtcData("messValue");
		if(value == 'OK'){
			showCompleteProcess();
			searchWaveInfo($("#wave_no").val(), "sheet4");
		}else{
			ComShowCodeMessage("COM12205");
		}
	}else if(mess == 'SHIPPING'){
		showCompleteProcess();
		var value = sheet4.GetEtcData("messValue");
		if(value == 'OK'){
			if($("#src_cd").val() == "E")
			{
				alert("호출전");
				var sheet7 = sheet7;
				var inURL = EDI_SEND_URL;//"http://203.246.159.207:9120";
				sheet7.DoSearch(inURL+"/edi856LNV_send.jsp?WAVE_NO="+$("#wave_no").val());
				alert("호출후");
			}
			searchWaveInfo($("#wave_no").val(), "sheet4");
		}else{
			ComShowCodeMessage("COM12205");
		}
	}else{
		var wave_no = sheet4.GetEtcData("waveno");
		if (wave_no.length > 0 && wave_no != null && wave_no != 'null' && wave_no != undefined && wave_no != 'undefined') {			
			showCompleteProcess();
			searchWaveInfo(wave_no, "sheet4");
		}
	}
} 

function sheet2_OnSaveEnd(code, msg) { 
	var mess = sheet2.GetEtcData("mess");
	if (mess == 'DELETE') {			
		showCompleteProcess();
		btnNew();
		return;
	}
	var wave_no = sheet2.GetEtcData("waveno");
	if (wave_no.length > 0 && wave_no != null && wave_no != 'null' && wave_no != undefined && wave_no != 'undefined') {			
		showCompleteProcess();
		searchWaveInfo(wave_no, "sheet3");
	}
} 

/*
 * Wave 탭 -> Wave No(key)로 조회
 */
function searchWaveInfo(wave_no, sheetObjWait)
{
	if(sheetObjWait == undefined || sheetObjWait == null) sheetObjWait = "sheet4";
	if(sheetObjWait == "sheet1")
	{
		sheet1.UsrWaitImage = true;
	}
	
	commonModeChange("SEARCH_NEW");
	var sXml = sheet2.GetSearchData("searchWaveSimpleMgmtGS.clt","f_cmd=" + SEARCH03 + "&wave_no=" + wave_no);
	/*if( sXml.indexOf('<ERROR>') > -1){
		alert(sXml);
		return;
	}*/
	
	commonModeChange("SEARCH_MGMT");
	//Set form value
	var strtIndxCheck = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxCheck = sXml.indexOf("</FIELD>");
	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	var $xml = $(xmlDoc);
	formObj.wave_no.value 		 = $xml.find("wave_no").text();			
	formObj.wh_cd.value 		 = $xml.find("wh_cd").text();			
	formObj.wave_rgst_dt.value 	 = $xml.find("wave_rgst_dt").text();	
	formObj.rmk.value 			 = $xml.find("rmk").text();			
	formObj.pick_dt.value 		 = $xml.find("pick_dt").text();			
	formObj.pick_hm_fr.value 	 = $xml.find("pick_hm_fr").text();		
	formObj.pick_hm_to.value 	 = $xml.find("pick_hm_to").text();		
	formObj.outbound_dt.value	 = $xml.find("outbound_dt").text();		
	formObj.outbound_hm_fr.value = $xml.find("outbound_hm_fr").text();
	formObj.outbound_hm_to.value = $xml.find("outbound_hm_to").text();
	formObj.consol_no.value 	 = $xml.find("consol_no").text();	
	formObj.pick_sht_yn.value 	 = $xml.find("pick_sht_yn").text();		
	formObj.tro_no.value 		 = $xml.find("tro_no").text();
	formObj.src_cd.value 		 = $xml.find("src_cd").text();
			
	//order list
	var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
	var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
	var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
	sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
	
	//SKU List
	var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
	var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
	var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
	sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
	
	//allocated list
	var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
	var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET5>".length;
	var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
	sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
	
	//un-allocated list
	var strtIndxSheet5 = sXml.indexOf("<SHEET5>");
	var endIndxSheet5  = sXml.indexOf("</SHEET5>") + "</SHEET5>".length;
	var sheet5Data = sXml.substring(strtIndxSheet5,endIndxSheet5);
	sheet5.LoadSearchData(sheet5Data.replaceAll('SHEET5', 'SHEET'));
	
	//Outbound Summary
	var strtIndxSheet6 = sXml.indexOf("<SHEET6>");
	var endIndxSheet6 = sXml.indexOf("</SHEET6>") + "</SHEET6>".length;
	var sheet6Data = sXml.substring(strtIndxSheet6,endIndxSheet6);
	sheet6.LoadSearchData(sheet6Data.replaceAll('SHEET6', 'SHEET'));

	//sheet2_OnSearchEnd_func(sheet2);
	//농심창고 출고날짜 VALIDATION
	//sheet4_OnSearchEnd_func(sheet4);
	//sheet4.SetCellEditable(i, fix_grid04+ "outbound_dt",false);
	
	$("#allc_wave_no").val(wave_no);
	$("#un_wave_no").val(wave_no);
}

function sheet4_OnSearchEnd(sheetObj){
	if($("#ctrt_no").val() == "CTDLC13001")
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, fix_grid04+ "outbound_dt",false);
		}
	}
	
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){		
		if(sheetObj.GetCellValue(i, fix_grid04 + "bk_sts_cd_grp") == "LP")
		{
			sheetObj.SetCellEditable(i, fix_grid04+ "chk",false);
		}
		if(sheetObj.GetCellValue(i, fix_grid04 + "bk_sts_cd") == "LP"){
			sheetObj.SetCellEditable(i, fix_grid04+ "ship_item_ea_qty",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "trucker_cd",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "trucker_nm",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "eq_no",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "seal_no",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "dlv_ord_no",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "outbound_dt",false);
			sheetObj.SetCellEditable(i, fix_grid04+ "out_pe_qty",false);
		}else{
			if(sheetObj.GetCellValue(i, fix_grid04 + "lp_id") == ""){ //lp_id가 미지정일 경우는 수정가능.
				sheetObj.SetCellEditable(i, fix_grid04+ "eq_tpsz_cd",true);
			}
			if(sheetObj.GetCellValue(i, fix_grid04 + "pickd_flg") != "Y" ){ //&& sheetObj.CellValue(i, fix_grid04 + "bk_sts_cd_grp") == "A"
				sheetObj.SetCellEditable(i, fix_grid04+ "pick_item_ea_qty",true);
			}
			sheetObj.SetCellEditable(i, fix_grid04+ "ship_item_ea_qty",true);
		}
	}
	btn_show_loading_plan();
	btn_show_pick_sht();
	mergeCell4(2);
}
function mergeCell4(Row){
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet4.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri4(i);
			i++;
		}
		checkDataMerge4(i);
	}
}
function checkDataMerge4(i){
	getData4(i);
	if(	   cust_ord_no 		== ori_cust_ord_no 
		&& ord_tp_nm 		== ori_ord_tp_nm 
		&& bk_sts_nm 		== ori_bk_sts_nm 
		&& item_cd   		== ori_item_cd
		&& item_nm   		== ori_item_nm
		&& allc_merge_key 	== ori_allc_merge_key 
		&& lot_no 			== ori_lot_no 
		&& wh_loc_cd_nm 	== ori_wh_loc_cd_nm 
		&& allc_item_ea_qty == ori_allc_item_ea_qty
		&& pick_item_ea_qty == ori_pick_item_ea_qty){
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
		setMergeCell4(startRow, totalRowMerge);
		
		getDataOri4(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet4.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell4(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri4(i){
	var sheetObj = sheet4;
	cust_ord_no 	= sheetObj.GetCellValue(i, fix_grid04+"cust_ord_no");
	ord_tp_nm 		= sheetObj.GetCellValue(i, fix_grid04+"ord_tp_nm");
	bk_sts_nm 		= sheetObj.GetCellValue(i, fix_grid04+"bk_sts_nm");
	item_cd 		= sheetObj.GetCellValue(i, fix_grid04+"item_cd");
	item_nm 		= sheetObj.GetCellValue(i, fix_grid04+"item_nm");
	allc_merge_key 	= sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key");
	lot_no 			= sheetObj.GetCellValue(i, fix_grid04+"lot_no");
	wh_loc_cd_nm 	= sheetObj.GetCellValue(i, fix_grid04+"wh_loc_cd_nm");
	allc_item_ea_qty= sheetObj.GetCellValue(i, fix_grid04+"allc_item_ea_qty");
	pick_item_ea_qty= sheetObj.GetCellValue(i, fix_grid04+"pick_item_ea_qty");
}
function getData4(i){
	var sheetObj = sheet4;
	ori_cust_ord_no 	= sheetObj.GetCellValue(i, fix_grid04+"cust_ord_no");
	ori_ord_tp_nm 		= sheetObj.GetCellValue(i, fix_grid04+"ord_tp_nm");
	ori_bk_sts_nm 		= sheetObj.GetCellValue(i, fix_grid04+"bk_sts_nm");
	ori_item_cd 		= sheetObj.GetCellValue(i, fix_grid04+"item_cd");
	ori_item_nm 		= sheetObj.GetCellValue(i, fix_grid04+"item_nm");
	ori_allc_merge_key 	= sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key");
	ori_lot_no 			= sheetObj.GetCellValue(i, fix_grid04+"lot_no");
	ori_wh_loc_cd_nm 	= sheetObj.GetCellValue(i, fix_grid04+"wh_loc_cd_nm");
	ori_allc_item_ea_qty= sheetObj.GetCellValue(i, fix_grid04+"allc_item_ea_qty");
	ori_pick_item_ea_qty= sheetObj.GetCellValue(i, fix_grid04+"pick_item_ea_qty");
}
function setMergeCell4(startRow, totalRowMerge){
	sheet4.SetMergeCell(startRow, 1, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 9, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 11, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 12, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 13, totalRowMerge, 1);
	sheet4.SetMergeCell(startRow, 14, totalRowMerge, 1);
}
function sheet4_OnSort(Col, SortArrow) {
	mergeCell4(1);
}

function sheet3_OnSearchEnd(sheetObj){
	mergeCell3(2);
}
function mergeCell3(Row){
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet3.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri3(i);
			i++;
		}
		checkDataMerge3(i);
	}
}
function checkDataMerge3(i){
	getData3(i);
	if(	   strg_sys_no 		== ori_strg_sys_no 
		&& cust_ord_no 		== ori_cust_ord_no 
		&& item_cd 			== ori_item_cd 
		&& item_nm   		== ori_item_nm
		&& item_pkgunit   	== ori_item_pkgunit
		&& item_pkgqty 		== ori_item_pkgqty
		&& item_ea_qty 		== ori_item_ea_qty 
		&& allc_sum_ea_qty  == ori_allc_sum_ea_qty
		&& un_alloc_ea_qty  == ori_un_alloc_ea_qty){
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
		setMergeCell3(startRow, totalRowMerge);
		
		getDataOri3(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet3.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell3(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri3(i){
	var sheetObj = sheet3;
	strg_sys_no 	= sheetObj.GetCellValue(i, fix_grid03+"strg_sys_no");
	cust_ord_no 	= sheetObj.GetCellValue(i, fix_grid03+"cust_ord_no");
	item_cd 		= sheetObj.GetCellValue(i, fix_grid03+"item_cd");
	item_nm 		= sheetObj.GetCellValue(i, fix_grid03+"item_nm");
	item_pkgunit 	= sheetObj.GetCellValue(i, fix_grid03+"item_pkgunit");
	item_pkgqty 	= sheetObj.GetCellValue(i, fix_grid03+"item_pkgqty");
	item_ea_qty 	= sheetObj.GetCellValue(i, fix_grid03+"item_ea_qty");
	allc_sum_ea_qty = sheetObj.GetCellValue(i, fix_grid03+"allc_sum_ea_qty");
	un_alloc_ea_qty = sheetObj.GetCellValue(i, fix_grid03+"un_alloc_ea_qty");
}
function getData3(i){
	var sheetObj = sheet3;
	ori_strg_sys_no 	= sheetObj.GetCellValue(i, fix_grid03+"strg_sys_no");
	ori_cust_ord_no 	= sheetObj.GetCellValue(i, fix_grid03+"cust_ord_no");
	ori_item_cd 		= sheetObj.GetCellValue(i, fix_grid03+"item_cd");
	ori_item_nm 		= sheetObj.GetCellValue(i, fix_grid03+"item_nm");
	ori_item_pkgunit 	= sheetObj.GetCellValue(i, fix_grid03+"item_pkgunit");
	ori_item_pkgqty 	= sheetObj.GetCellValue(i, fix_grid03+"item_pkgqty");
	ori_item_ea_qty 	= sheetObj.GetCellValue(i, fix_grid03+"item_ea_qty");
	ori_allc_sum_ea_qty = sheetObj.GetCellValue(i, fix_grid03+"allc_sum_ea_qty");
	ori_un_alloc_ea_qty = sheetObj.GetCellValue(i, fix_grid03+"un_alloc_ea_qty");
}
function setMergeCell3(startRow, totalRowMerge){
	sheet3.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 9, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 11, totalRowMerge, 1);
	sheet3.SetMergeCell(startRow, 12, totalRowMerge, 1);
}
function sheet3_OnSort(Col, SortArrow) {
	mergeCell3(1);
}

function sheet5_OnSearchEnd(sheetObj){
	mergeCell5(2);
}
function mergeCell5(Row){
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet5.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri5(i);
			i++;
		}
		checkDataMerge5(i);
	}
}
function checkDataMerge5(i){
	getData5(i);
	if(	   strg_sys_no 		== ori_strg_sys_no 
		&& cust_ord_no 		== ori_cust_ord_no 
		&& item_cd 			== ori_item_cd 
		&& item_nm   		== ori_item_nm
		&& item_pkgunit   	== ori_item_pkgunit
		&& item_pkgqty 		== ori_item_pkgqty
		&& item_ea_qty 		== ori_item_ea_qty 
		&& allc_sum_ea_qty  == ori_allc_sum_ea_qty
		&& un_alloc_ea_qty  == ori_un_alloc_ea_qty
		&& stock_qty  		== ori_stock_qty){
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
		setMergeCell5(startRow, totalRowMerge);
		
		getDataOri5(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet5.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell5(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri5(i){
	var sheetObj = sheet5;
	strg_sys_no 	= sheetObj.GetCellValue(i, fix_grid05+"strg_sys_no");
	cust_ord_no 	= sheetObj.GetCellValue(i, fix_grid05+"cust_ord_no");
	item_cd 		= sheetObj.GetCellValue(i, fix_grid05+"item_cd");
	item_nm 		= sheetObj.GetCellValue(i, fix_grid05+"item_nm");
	item_pkgunit 	= sheetObj.GetCellValue(i, fix_grid05+"item_pkgunit");
	item_pkgqty 	= sheetObj.GetCellValue(i, fix_grid05+"item_pkgqty");
	item_ea_qty 	= sheetObj.GetCellValue(i, fix_grid05+"item_ea_qty");
	allc_sum_ea_qty = sheetObj.GetCellValue(i, fix_grid05+"allc_sum_ea_qty");
	un_alloc_ea_qty = sheetObj.GetCellValue(i, fix_grid05+"un_alloc_ea_qty");
	stock_qty 		= sheetObj.GetCellValue(i, fix_grid05+"stock_qty");
}
function getData5(i){
	var sheetObj = sheet5;
	ori_strg_sys_no 	= sheetObj.GetCellValue(i, fix_grid05+"strg_sys_no");
	ori_cust_ord_no 	= sheetObj.GetCellValue(i, fix_grid05+"cust_ord_no");
	ori_item_cd 		= sheetObj.GetCellValue(i, fix_grid05+"item_cd");
	ori_item_nm 		= sheetObj.GetCellValue(i, fix_grid05+"item_nm");
	ori_item_pkgunit 	= sheetObj.GetCellValue(i, fix_grid05+"item_pkgunit");
	ori_item_pkgqty 	= sheetObj.GetCellValue(i, fix_grid05+"item_pkgqty");
	ori_item_ea_qty 	= sheetObj.GetCellValue(i, fix_grid05+"item_ea_qty");
	ori_allc_sum_ea_qty = sheetObj.GetCellValue(i, fix_grid05+"allc_sum_ea_qty");
	ori_un_alloc_ea_qty = sheetObj.GetCellValue(i, fix_grid05+"un_alloc_ea_qty");
	ori_stock_qty 		= sheetObj.GetCellValue(i, fix_grid05+"stock_qty");
}
function setMergeCell5(startRow, totalRowMerge){
	sheet5.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 9, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 11, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 12, totalRowMerge, 1);
	sheet5.SetMergeCell(startRow, 13, totalRowMerge, 1);
}
function sheet5_OnSort(Col, SortArrow) {
	mergeCell5(1);
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'search_list':
				if(ComIsEmpty(formObj.list_wh_cd)){
					ComShowCodeMessage("COM0493");
					return false;
				}
				if(ComIsEmpty(formObj.list_in_no) && ComIsEmpty(formObj.list_fm_date)){
					ComShowCodeMessage("COM0114",$("#list_in_date_tp option:selected").text());
					$("#list_fm_date").focus();
					return false;
				}
				if(!ComIsEmpty(formObj.list_fm_date) && ComIsEmpty(formObj.list_to_date)){
					formObj.list_to_date.value = ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.list_fm_date) && !isDate(formObj.list_fm_date)) {
					ComShowCodeMessage("COM0114",$("#list_in_date_tp option:selected").text());
					formObj.list_fm_date.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.list_to_date) && !isDate(formObj.list_to_date)) {
					ComShowCodeMessage("COM0114",$("#list_in_date_tp option:selected").text());
					formObj.list_to_date.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.list_fm_date)&&ComIsEmpty(formObj.list_to_date))||(ComIsEmpty(formObj.list_fm_date)&&!ComIsEmpty(formObj.list_to_date))) {
					ComShowCodeMessage("COM0122",$("#list_in_date_tp option:selected").text());
					formObj.list_fm_date.focus();
					return false;
				}
				if (getDaysBetween2(formObj.list_fm_date.value, formObj.list_to_date.value)<0) {
					ComShowCodeMessage("COM0122",$("#list_in_date_tp option:selected").text());
					formObj.list_fm_date.focus();
					return false;
				}
			break;		
			case "search_wave":
				if(ComIsEmpty(formObj.wave_wh_cd)){
					ComShowCodeMessage("COM0493");
					$("#wave_wh_cd").focus();
					return false;
				}
				if(ComIsEmpty(formObj.wave_in_no) && ComIsEmpty(formObj.wave_fm_date)){
					ComShowCodeMessage("COM0114",$("#wave_in_date_tp")[0].Text);
					$("#wave_fm_date").focus();
					return false;
				}
				if(!ComIsEmpty(formObj.wave_fm_date) && ComIsEmpty(formObj.wave_to_date)){
					formObj.wave_to_date.value = ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.wave_fm_date) && !isDate(formObj.wave_fm_date)) {
					ComShowCodeMessage("COM0114",$("#wave_in_date_tp")[0].Text);
					formObj.wave_fm_date.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.wave_to_date) && !isDate(formObj.wave_to_date)) {
					ComShowCodeMessage("COM0114",$("#wave_in_date_tp")[0].Text);
					formObj.wave_to_date.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.wave_fm_date)&&ComIsEmpty(formObj.wave_to_date))||(ComIsEmpty(formObj.wave_fm_date)&&!ComIsEmpty(formObj.wave_to_date))) {
					ComShowCodeMessage("COM0122",$("#wave_in_date_tp")[0].Text);
					formObj.wave_fm_date.focus();
					return false;
				}
				if (getDaysBetween2(formObj.wave_fm_date.value, formObj.wave_to_date.value)<0) {
					ComShowCodeMessage("COM0122",$("#wave_in_date_tp")[0].Text);
					formObj.wave_fm_date.focus();
					return false;
				}
				break;
			case 'save':
				if($("#sel_tab").val().trim() == "02")
				{
					var sheetObj = sheet2;
					var rowcount = sheetObj.RowCount();
					var rowcountD = sheetObj.RowCount('D');
					if(rowcount - rowcountD <= 0){
						//ComShowCodeMessage("COM0185","(Order List Sheet)");
						ComShowCodeMessage("COM0774");
						return false;
					}
					if(sheetObj.IsDataModified == true){
						//warehouser가 다른 것이 있는지 체크한다.
						var inx_arr = new Array();
						for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow;i++){
							if(sheetObj.CellValue(i, fix_grid02+"wh_cd").length > 0)
							{
								if(inx_arr.length <= 0)
								{
									inx_arr.push(sheetObj.CellValue(i, fix_grid02+"wh_cd"));
								}
								else
								{
									if(inx_arr.contains(sheetObj.CellValue(i, fix_grid02+"wh_cd")) == false)
									{
										ComShowCodeMessage("COM0440");
										return false;
									}
								}
							}
						}
					}
					if(ComGetLenByByte($("#rmk").val().trim()) > 100){
						ComShowCodeMessage("COM0532", 100);
						ComSetFocus(formObj.rmk);
						return false;
					}
				}
				else if($("#sel_tab").val().trim() == "03"){
					var sheetObj = $("#sheet4")[0];
					if(ComIsEmpty(formObj.wave_no))
					{
						ComShowCodeMessage("COM0185");
						$("#wave_no").focus();
						return false;
					}
				}
				else if($("#sel_tab").val().trim() == "01" || $("#sel_tab").val().trim() == "04"){
					return false;
				}
				break;
		}
	}
	return true;
}

function btnAddSheet2(){
	var intRows=sheet2.LastRow()+1;
	tempRow = intRows;
    sheet2.DataInsert(intRows);
}
function btn_Print()
{
	if($("#wave_no").val() == "")
	{
		return;
	}
	
	var sUrl = "WaveSmpMgmtPrintOption.clt?wave_no="+$("#wave_no").val() + "&allc_cnt_tot=" + $("#allc_cnt_tot").val() + "&lp_cnt_tot=" + $("#lp_cnt_tot").val();
	
	callBackFunc = "setWaveSmpMgmtPrintOption";
    modal_center_open(sUrl, callBackFunc, 400,250,"yes");
}
function setWaveSmpMgmtPrintOption(){
	
}
/*
 * Allocation
 */
function btn_Allocation(tab_div)
{
	var sheetObj = sheet2;
	if(sheetObj.RowCount() <= 0)
	{
		ComShowCodeMessage("COM0185");
		return;
	}
	if(ComShowCodeConfirm("COM0311") == false){
		return;
	}
	
	var sheetObjO;
	var fix_grid;
	var sheetObjWait;
	var div = "ALL";
	switch(tab_div)
	{
		case ('wave'):
			sheetObjO = sheet3;
			fix_grid = fix_grid03; 
			sheetObjWait = "sheet3";
			var iChkCnt = sheetObjO.CheckedRows(fix_grid03+"chk");
			if(iChkCnt == 0){
				//기존전체로직
				div = "ALL";
			}
			else {//partial cancel
				div = "PT";
			}
			break;
		case ('un'):
			sheetObjO = sheet5;
			fix_grid = fix_grid05;
			sheetObjWait = "sheet5";
			if(sheetObjO.RowCount() <= 0){
				ComShowCodeMessage("COM0347");
				return;
			}
			break;
		default:
			sheetObjO = sheet3;
			fix_grid = fix_grid03;
			sheetObjWait = "sheet3";
			var iChkCnt = sheetObjO.CheckedRows(fix_grid03+"chk");
			if(iChkCnt == 0){
				//기존전체로직
				div = "ALL";
			}
			else { //partial cancel
				div = "PT";
			}
			break;
	}
	//--파라미터값 생성 --
	var grdParam = "";
	var ob_item_key_arr = new Array();
	for(var i=sheetObjO.HeaderRows(); i<=sheetObjO.LastRow();i++){
		if(eval(sheetObjO.GetCellValue(i, fix_grid + "un_alloc_ea_qty")) > 0) //미할당건이 0보다 클경우에만 파라미터값 생성
		{
			if(div == "ALL" || (div == "PT" && sheetObjO.GetCellValue(i, fix_grid + "chk") == "1"))
			{
				var key = sheetObjO.GetCellValue(i, fix_grid + "wob_bk_no_org") + "|" + sheetObjO.GetCellValue(i, fix_grid + "sao_sys_no") + "|" + sheetObjO.GetCellValue(i, fix_grid + "item_sys_no") + "|" + sheetObjO.GetCellValue(i, fix_grid + "item_seq");
				if(ob_item_key_arr.contains(key) == false)
				{
					ob_item_key_arr.push(key);
					if(grdParam.trim().length == 0)
					{
						grdParam = fix_grid03 + "wob_bk_no=" +  sheetObjO.GetCellValue(i, fix_grid + "wob_bk_no")  
						   + "&" + fix_grid03 + "sao_sys_no=" + sheetObjO.GetCellValue(i, fix_grid + "sao_sys_no") 
						   + "&" + fix_grid03 + "item_sys_no=" + sheetObjO.GetCellValue(i, fix_grid + "item_sys_no") 
						   + "&" + fix_grid03 + "item_seq=" + sheetObjO.GetCellValue(i, fix_grid + "item_seq")
						   + "&" + fix_grid03 + "strg_sys_no=" + sheetObjO.GetCellValue(i, fix_grid + "strg_sys_no");
					}
					else
					{
						grdParam =grdParam + "&" + fix_grid03 + "wob_bk_no=" +  sheetObjO.GetCellValue(i, fix_grid + "wob_bk_no")  
						   + "&" + fix_grid03 + "sao_sys_no=" + sheetObjO.GetCellValue(i, fix_grid + "sao_sys_no") 
						   + "&" + fix_grid03 + "item_sys_no=" + sheetObjO.GetCellValue(i, fix_grid + "item_sys_no") 
						   + "&" + fix_grid03 + "item_seq=" + sheetObjO.GetCellValue(i, fix_grid + "item_seq")
						   + "&" + fix_grid03 + "strg_sys_no=" + sheetObjO.GetCellValue(i, fix_grid + "strg_sys_no");
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
	
	var tl_wo_document_info_header = "";
	var docparam = tl_wo_document_info_header + "wave_no="+$("#wave_no").val() + "&" + tl_wo_document_info_header + "wh_cd=" + $("#wh_cd").val() + "&" + tl_wo_document_info_header + "div=" + div;
	var param = grdParam + "&" + docparam + "&f_cmd=" + MULTI02;
	var sXml = sheetObjO.GetSaveData("saveAutoWaveAllocLongTransactionGS.clt", param); //ALLC 화면, WAVE 공통
	sheetObjO.LoadSaveData(sXml);
}
function sheet3_OnSaveEnd(code, msg) {
	var mess = sheet3.GetEtcData("mess");
	if (mess == 'OK') 
	{			
		showCompleteProcess();
		searchWaveInfo($("#wave_no").val(), "sheet3");
		var value = sheet3.GetEtcData("messValue");
		if(value == "COM0457"){
			ComShowCodeMessage("COM0499");
		}
		if(value == "COM0324"){
			goTabSelect('03');
		}else{
			goTabSelect('04');
		}
		
	}else if(mess == 'NO'){
		var value = sheet3.GetEtcData("messValue");
		ComShowCodeMessage(value);
	}else
		ComShowCodeMessage("COM0410");
}
function sheet5_OnSaveEnd(code, msg) {
	var mess = sheet5.GetEtcData("mess");
	if (mess == 'OK') 
	{			
		showCompleteProcess();
		searchWaveInfo($("#wave_no").val(), "sheet3");
		var value = sheet5.GetEtcData("messValue");
		if(value == "COM0457"){
			ComShowCodeMessage("COM0499");
		}
		if(value == "COM0324"){
			goTabSelect('03');
		}
		else{
			goTabSelect('04');
		}
		
	}else if(mess == 'NO'){
		var value = sheet3.GetEtcData("messValue");
		ComShowCodeMessage(value);
	}else
		ComShowCodeMessage("COM0410");
}
function sheet5_OnPopupClick(sheetObj, Row, Col)
{
	var colName = sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid05 + "manual_alloc_img": //Manual Alloc
				popupManualAllcPopup("ALL", "S", "&search_no=" + $("#wave_no").val() + "&wh_cd=" + $("#wh_cd").val()+ "&rum="   + sheetObj.GetCellValue(Row, fix_grid05+"rum"));
			break;
	}	
}
function sheet4_OnPopupClick(sheetObj, Row, Col)
{
	var colName = sheetObj.ColSaveName(Col);
	var sUrl = "";
	with(sheetObj)
	{	
		if(colName == fix_grid04 + "trucker_cd"){
			rtnary=new Array(1);
    	    rtnary[0]=sheetObj.GetCellValue(Row, Col);
    	    rtnary[1]=sheetObj.GetCellValue(Row, fix_grid04 + "trucker_nm");
    	    rtnary[2]=window;
    	    /*
    	     CallBack Function
    	     */
    	    callBackFunc = "setTruckerGrid";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}
		else if ( colName == fix_grid04 + "eq_tpsz_cd" ) {
			var tp = "A";
			if(sheetObj.GetCellValue(Row, (fix_grid04+"eq_tp_cd")) != ""){
				tp = sheetObj.GetCellValue(Row, (fix_grid04+"eq_tp_cd"));
			}
			sUrl = "ContainerTypePopup.clt?type="+tp+"&eq_unit="+sheetObj.GetCellValue(Row, Col);
			callBackFunc = "setTruckTypeInfoGrid";
			modal_center_open(sUrl, callBackFunc, 400, 600,"yes");
		}else if (colName == fix_grid04 + "seal_no"){
			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
		}
	}
}

/*
 * trucker popupedit 완료후
 */
function setTruckerGrid(rtnVal){
	if(rtnVal == null)
		return;
	var sheetObj = sheet4;
	var aryPopupData=rtnVal.split("|");
	var row = sheetObj.GetSelectRow();
	sheetObj.SetCellValue(row, fix_grid04 + "trucker_cd",aryPopupData[0]);
	sheetObj.SetCellValue(row, fix_grid04 + "trucker_nm",aryPopupData[2]);
	autoChangeShipInfo(sheetObj, row, fix_grid04 + "trucker_cd", aryPopupData[0],  aryPopupData[2]);
}

/*
 * type popupedit 완료후
 */
function setTruckTypeInfoGrid(rtnVal){
	if(rtnVal == null)
		return;
	var sheetObj = sheet4;
	var aryPopupData=rtnVal.split("|");
	var row = sheetObj.GetSelectRow();
	sheetObj.SetCellValue(row, fix_grid04 + "eq_tpsz_cd",aryPopupData[0]);
	sheetObj.SetCellValue(row, fix_grid04 + "eq_tp_cd",aryPopupData[2]);
}

function autoChangeShipInfo(sheetObj, row, col, Value, Value2)
{
	if(sheetObj.GetCellValue(row, fix_grid04 + "lp_id") != "" ){
		var lp_id_seq = sheetObj.GetCellValue(row, fix_grid04 + "lp_id") + "^" + sheetObj.GetCellValue(row, fix_grid04 + "lp_seq");
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			if(lp_id_seq == sheetObj.GetCellValue(i, fix_grid04 + "lp_id") + "^" + sheetObj.GetCellValue(i, fix_grid04 + "lp_seq") && i != row)
			{
				sheetObj.SetCellValue2(i, col,Value);
				if(sheetObj.ColSaveName(col) == fix_grid04 + "trucker_cd"){
					sheetObj.SetCellValue2(i, fix_grid04 + "trucker_nm",Value2);
				}
			}
		}
	}	
}

/*
 * allocated list OnChange event
 */
function sheet3_OnChange(sheetObj, row, col, Value) {
	var colStr = sheetObj.ColSaveName(col);
	if (colStr == (fix_grid03+"item_cbf") && Value != "") {
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid03+"item_cbf"), (fix_grid03+"item_cbm"), sheetObj);		
	} else if (colStr == (fix_grid03+"item_grs_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (fix_grid03+"item_grs_lbs"), (fix_grid03+"item_grs_kgs"), sheetObj);		
	} else if (colStr == (fix_grid03+"item_net_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (fix_grid03+"item_net_lbs"), (fix_grid03+"item_net_kgs"), sheetObj);		
	}else if(colStr == (fix_grid03+"strg_sys_no")){
		var key_org = sheetObj.GetCellValue(row, fix_grid03 + "wob_bk_no_org") + "|" + sheetObj.GetCellValue(row, fix_grid03 + "item_sys_no") + "|" + sheetObj.GetCellValue(row, fix_grid03 + "item_seq");
		for (var i=sheetObj.HeaderRows; i<=sheetObj.LastRow; i++) {
			var key = sheetObj.GetCellValue(i, fix_grid03 + "wob_bk_no_org") + "|" + sheetObj.GetCellValue(i, fix_grid03 + "item_sys_no") + "|" + sheetObj.GetCellValue(i, fix_grid03 + "item_seq");
			if(key_org == key){
				sheetObj.SetCellValue2(i, col,Value);
			}
		}
	}
}

function outboundSummary(sheetObj, Row, Col, input_name)
{
	var sel_wob_bk_no = sheetObj.GetCellValue(Row, fix_grid04 + "wob_bk_no");
	var Row1 = sheet6.FindText(fix_grid06 + "wob_bk_no", sel_wob_bk_no,sheet6.HeaderRows(), -1, true);
	if(Row1 == -1){
		return;
	}
	//금액계산
	var amt = 0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, fix_grid04 + "wob_bk_no") == sel_wob_bk_no){
			amt = amt + eval(sheetObj.GetCellValue(i, Col));
		}
	}
	if(input_name=="outbound_cbm" || input_name == "outbound_grs_kgs" || input_name =="outbound_net_kgs")
		amt = roundXL(amt,3);
	sheet6.SetCellValue(Row1, fix_grid06 + input_name,amt);
}

/*
 * allocated list OnChange event
 */
function sheet4_OnChange(sheetObj, row, col, Value) {
	var colStr = sheetObj.ColSaveName(col);
	if (colStr == (fix_grid04+"item_cbf") && Value != "") {
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid04+"item_cbf"), (fix_grid04+"item_cbm"), sheetObj);
		outboundSummary(sheetObj, row, sheetObj.SaveNameCol(fix_grid04+"item_cbm"), "outbound_cbm");
	} 
	else if (colStr == (fix_grid04+"item_grs_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (fix_grid04+"item_grs_lbs"), (fix_grid04+"item_grs_kgs"), sheetObj);
		outboundSummary(sheetObj, row, sheetObj.SaveNameCol(fix_grid04+"item_grs_kgs"), "outbound_grs_kgs");
	} 
	else if (colStr == (fix_grid04+"item_net_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (fix_grid04+"item_net_lbs"), (fix_grid04+"item_net_kgs"), sheetObj);		
		outboundSummary(sheetObj, row, sheetObj.SaveNameCol(fix_grid04+"item_net_kgs"), "outbound_net_kgs");
	}
	else if(colStr == fix_grid04 + "outbound_dt"){
		autoChangeShipInfo(sheetObj, row, col, Value, "");		
	}
	else if(colStr == fix_grid04 + "dlv_ord_no"){
		autoChangeShipInfo(sheetObj, row, col, Value, "");		
	}
	else if(colStr == fix_grid04 + "seal_no"){
		autoChangeShipInfo(sheetObj, row, col, Value, "");		
	}
	else if(colStr == fix_grid04 + "eq_no"){
		autoChangeShipInfo(sheetObj, row, col, Value, "");		
	}
	else if(colStr == fix_grid04 + "eq_tpsz_cd") {
		if(Value != ""){
			var sParam="cntr_tp="+Value;
			ajaxSendPost(function(reqVal){
				var doc=getAjaxMsgXML(reqVal);
				if(doc[0]=='OK'){
					if(typeof(doc[1])!='undefined'){
						//조회해온 결과를 Parent에 표시함
						var rtnArr=doc[1].split('^@');
						if(rtnArr[0] != ""){
							sheetObj.SetCellValue(row, fix_grid04+"eq_tp_cd",rtnArr[2]);
							sheetObj.SetCellValue(row, col,rtnArr[0],0);
						}
						else{
							sheetObj.SetCellValue(row, fix_grid04+"eq_tp_cd","");	
							sheetObj.SetCellValue(row, col,"",0);	
						}
					}else{
						sheetObj.SetCellValue(row, fix_grid04+"eq_tp_cd","");	
						sheetObj.SetCellValue(row, col,"",0);	
					}
				}
			}, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, fix_grid04+"eq_tp_cd","");	
		}
	}else if(colStr == fix_grid04 + "trucker_cd"){
		if(Value != ""){
			ajaxSendPost(function (reqVal){
				var doc=getAjaxMsgXML(reqVal);
				if(doc[0]=='OK'){
					if(typeof(doc[1])!='undefined'){
						//조회해온 결과를 Parent에 표시함
						var rtnArr=doc[1].split('@@^');
						if(rtnArr[0] != ""){
							sheetObj.SetCellValue(row, fix_grid04+"trucker_nm",rtnArr[2],0);
							autoChangeShipInfo(sheetObj, row, col, Value, rtnArr[2]);
						}else{
							sheetObj.SetCellValue(row, fix_grid04+"trucker_cd","",0);	
							sheetObj.SetCellValue(row, fix_grid04+"trucker_nm","",0);
							autoChangeShipInfo(sheetObj, row, col, Value, Value);
						}
					}else{
						sheetObj.SetCellValue(row, fix_grid04+"trucker_cd","",0);	
						sheetObj.SetCellValue(row, fix_grid04+"trucker_nm","",0);	
						autoChangeShipInfo(sheetObj, row, col, Value, Value);
					}
				}
				
			}, 'reqVal', '&goWhere=aj&bcKey=getTrdpInfo&trdp_cd='+Value, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, fix_grid04 + "trucker_cd","",0);
			sheetObj.SetCellValue(row, fix_grid04 + "trucker_nm","",0);
			autoChangeShipInfo(sheetObj, row, col, Value, Value);
		}
	}else if(colStr == fix_grid04 + "trucker_nm"){
		autoChangeShipInfo(sheetObj, row, col, Value, "");		
	}else if(colStr == fix_grid04 + "pick_item_ea_qty"){
		var picked = Value;
		var allocated = eval(sheetObj.GetCellValue(row, fix_grid04 + "allc_item_ea_qty"));
		//음수체크
		if(Value <= 0)
		{
			picked = Math.abs(Value);
			sheetObj.SetCellValue(row, col,picked,0);
		}
		//picked는 allocated보다 클수없다.
		if(picked > allocated)
		{
			picked = allocated;
			sheetObj.SetCellValue(row, col,picked,0);
		}
		//셀merge되는 기준별로 모두 체크 또는 체크해지
		var key_org = sheetObj.GetCellValue(row, fix_grid04 + "allc_merge_key");
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			var key = sheetObj.GetCellValue(i, fix_grid04 + "allc_merge_key");
			if(key_org == key){
				sheetObj.SetCellValue(i, col,picked,0);
			}
		}
		var pkg_lv1_qty = eval(sheetObj.GetCellValue(row, fix_grid04 + "pkg_lv1_qty"));
		var lv1_cbm 	= eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbm"));
		var lv1_cbf 	= eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbf"));
		var lv1_grs_kgs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_kgs"));
		var lv1_grs_lbs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_lbs"));
		var lv1_net_kgs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_kgs"));
		var lv1_net_lbs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid04 + "item_cbm",roundXL((pkg_lv1_qty * picked) * lv1_cbm, 3));
		sheetObj.SetCellValue(row,  fix_grid04 + "item_cbf",roundXL((pkg_lv1_qty * picked) * lv1_cbf, 3),0);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_grs_kgs",roundXL((pkg_lv1_qty * picked) * lv1_grs_kgs, 3));
		sheetObj.SetCellValue(row,  fix_grid04 + "item_grs_lbs",roundXL((pkg_lv1_qty * picked) * lv1_grs_lbs,3),0);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_net_kgs",roundXL((pkg_lv1_qty * picked) * lv1_net_kgs,3));
		sheetObj.SetCellValue(row,  fix_grid04 + "item_net_lbs",roundXL((pkg_lv1_qty * picked) * lv1_net_lbs,3),0);
		outboundSummary(sheetObj, row, col, "outbound_ea_qty");
	}else if(colStr == fix_grid04 + "ship_item_ea_qty"){
		var shipped = Value;
		var picked = 0;
		if(sheetObj.GetCellValue(row, fix_grid04 + "pickd_flg") == "Y"){
			picked = eval(sheetObj.GetCellValue(row, fix_grid04 + "pick_item_ea_qty"));
		}else{
			picked = eval(sheetObj.GetCellValue(row, fix_grid04 + "allc_item_ea_qty"));
		}
		//음수체크
		if(Value < 0){
			shipped = Math.abs(Value);
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//shipped는 picked보다 클수없다.
		if(shipped > picked){
			shipped = picked;
			sheetObj.SetCellValue(row, col,shipped,0);
		}	
		sheetObj.SetCellValue(row, fix_grid04 + "out_pe_qty",tlt_pe_qty(sheetObj, row, shipped));
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty = eval(sheetObj.GetCellValue(row, fix_grid04 + "pkg_lv1_qty"));
		var lv1_cbm 	= eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbm"));
		var lv1_cbf 	= eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbf"));
		var lv1_grs_kgs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_kgs"));
		var lv1_grs_lbs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_lbs"));
		var lv1_net_kgs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_kgs"));
		var lv1_net_lbs = eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid04 + "item_cbm",(pkg_lv1_qty * shipped) * lv1_cbm);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_cbf",(pkg_lv1_qty * shipped) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_grs_kgs",(pkg_lv1_qty * shipped) * lv1_grs_kgs);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_grs_lbs",(pkg_lv1_qty * shipped) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_net_kgs",(pkg_lv1_qty * shipped) * lv1_net_kgs);
		sheetObj.SetCellValue(row,  fix_grid04 + "item_net_lbs",(pkg_lv1_qty * shipped) * lv1_net_lbs,0);
		outboundSummary(sheetObj, row, col, "outbound_ea_qty");
		
		//LP_ID가 있는 상태에서 SHIP수량이 0이 되었을경우
		var lp_id = sheetObj.GetCellValue(row, fix_grid04 + "lp_id").trim();
		//LP_ID가 있는 상태에서 SHIP수량이 원래는 0이상이었는데.. 0으로 변경 한 후 다시 SHIP수량을 0보다 크게 입력하였을경우
		if(lp_id != ""){
			var lp_id_seq = lp_id + "^" + sheetObj.GetCellValue(row, fix_grid04 + "lp_seq");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				if(lp_id_seq == sheetObj.GetCellValue(i, fix_grid04 + "lp_id") + "^" + sheetObj.GetCellValue(i, fix_grid04 + "lp_seq") && i != row){
					sheetObj.SetCellValue(row, fix_grid04 + "outbound_dt",sheetObj.GetCellValue(i, fix_grid04 + "outbound_dt"),0);
					sheetObj.SetCellValue(row, fix_grid04 + "trucker_cd",sheetObj.GetCellValue(i, fix_grid04 + "trucker_cd"),0);
					sheetObj.SetCellValue(row, fix_grid04 + "trucker_nm",sheetObj.GetCellValue(i, fix_grid04 + "trucker_nm"),0);
					sheetObj.SetCellValue(row, fix_grid04 + "dlv_ord_no",sheetObj.GetCellValue(i, fix_grid04 + "dlv_ord_no"),0);
					sheetObj.SetCellValue(row, fix_grid04 + "seal_no",sheetObj.GetCellValue(i, fix_grid04 + "seal_no"),0);
					sheetObj.SetCellValue(row, fix_grid04 + "eq_no",sheetObj.GetCellValue(i, fix_grid04 + "eq_no"),0);
					break;
				}
			}
		}	
	} else if(colStr == fix_grid04 + "chkAll"){
		//셀merge되는 기준별로 모두 체크 또는 체크해지
		var key_org = sheetObj.GetCellValue(row, fix_grid04 + "wob_bk_no");
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			var key = sheetObj.GetCellValue(i, fix_grid04 + "wob_bk_no");
			if(key_org == key){
				sheetObj.SetCellValue(i, fix_grid04 + "chkAll",Value,0);			
				if(sheetObj.GetCellEditable(i, fix_grid04 + "chk") == true){
					sheetObj.SetCellValue(i, fix_grid04 + "chk",Value,0);
				}
			}
		}
	} else if(colStr == fix_grid04 + "chk"){
		//셀merge되는 기준별로 모두 체크 또는 체크해지
		var key_org = sheetObj.GetCellValue(row, fix_grid04 + "allc_merge_key");
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			var key = sheetObj.GetCellValue(i, fix_grid04 + "allc_merge_key");
			if(key_org == key){
				sheetObj.SetCellValue(i, fix_grid04 + "chk",Value,0);				
			}
		}
	} else if(colStr == fix_grid04 + "out_pe_qty"){
		outboundSummary(sheetObj, row, col, "outbound_pl_qty");
	} else if (colStr == fix_grid04+"item_cbm") {
		outboundSummary(sheetObj, row, col, "outbound_cbm");
	} else if (colStr == fix_grid04+"item_grs_kgs") {
		outboundSummary(sheetObj, row, col, "outbound_grs_kgs");
	} else if (colStr == fix_grid04+"item_net_kgs") {
		outboundSummary(sheetObj, row, col, "outbound_net_kgs");
	} 
}

/*
 * PE 자동계산
 */
function tlt_pe_qty(sheetObj, row, qty)
{
	var ret_out_pe_qty = 0;
	var pe_qty = eval(sheetObj.GetCellValue(row, fix_grid04 + "pe_qty"));
	if(qty == 0)
	{
		ret_out_pe_qty = 0;
	}
	else if(pe_qty < 0)
	{
		ret_out_pe_qty = 1;
	}
	else if (pe_qty > qty)
	{
		ret_out_pe_qty = 1;
	}
	else
	{
		ret_out_pe_qty = Math.ceil(qty/pe_qty);
	}
	return ret_out_pe_qty;
}

/*
 * Wave tab cancel(할당no전체취소 -> load plan complete전까지는 전체 취소 가능)
 */
function btn_Cancel_Wave()
{
	var sheetObj = sheet3;
	var div = ""; //전체 캔슬인지 체크후 캔슬인지의 여부
	var saveXml = "";
	//할당이 단한번도 되지않은경우
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var iChkCnt = sheetObj.CheckedRows(fix_grid03+"chk");
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
			sheetObj.UsrWaitImage = true;
			var tl_wo_document_info_header = "";
			var wave_no 	=     tl_wo_document_info_header + "wave_no="   +$("#wave_no").val().trim();
			var wh_cd		= "&"+tl_wo_document_info_header + "wh_cd="     +$("#wh_cd").val().trim();
			var docinParamter = wave_no+wh_cd + "&" + tl_wo_document_info_header;
			var isheetSaveParamters = docinParamter + "&" + ComGetSaveString(sheetObj, true, false);
			sheetObj.UsrWaitImage = false;
			var sXml = sheetObj.GetSaveData("cancelWaveSimpleMgmtAllocPartialLongTransactionGS.clt", isheetSaveParamters+"&f_cmd=" + MULTI04);
			sheetObj.LoadSaveData(sXml);
			break;
	}
}

/*
 * Picking
 */
function btn_Picking()
{
	var sheetObj = sheet4;
	if(sheet2.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return;
	}
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var cnt=0;
	var picked_cnt = 0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//Alloc일경우만 Picking
		if(sheetObj.GetCellValue(i, fix_grid04 + "pickd_flg") != "Y"){
			if(eval(sheetObj.GetCellValue(i, fix_grid04 + "pick_item_ea_qty")) > 0){
				cnt++;
			}
		}else{
			picked_cnt ++;
		}
	}
	if(picked_cnt == sheetObj.RowCount()){
		ComShowCodeMessage("COM0452");
		return;
	}
	if(cnt <= 0){
		ComShowCodeMessage("COM0771");
		return;
	}
	//TODO : MJY picking 수량이 부킹별 합이 0이 입력 된경우 체크 Validation 로직 추가할것
	if(ComShowCodeConfirm("COM0439") == false){
		return;
	}
	var tl_wo_document_info_header = "";
	var wave_no 		=     tl_wo_document_info_header+"wave_no="			+$("#wave_no").val();
	var wh_cd 			= "&"+tl_wo_document_info_header+"wh_cd="			+$("#wh_cd").val();
	var docinParamter   = wave_no+wh_cd;
	var sheetDatas3 = ComReplaceStr(ComGetSaveString(sheetObj, true, false), fix_grid04, fix_grid03); //allSave => false 트랜잭션이 발생한 것만 저장할 경우
	var saveXml = sheetObj.GetSaveData("saveAllocPickingLongTransactionGS.clt", docinParamter+"&"+sheetDatas3 + "&" + ComGetSaveString(sheet6, true, false)+"&f_cmd="+MULTI05);
	sheetObj.LoadSaveData(saveXml);
}

/*
 * Shipping
 */
function btn_Shipping()
{
	var sheetObj = sheet4;
	if(sheet2.RowCount() <= 0){
		ComShowCodeMessage("COM0185");
		return;
	}
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return;
	}
	if($("#outbound_dt").val().trim() == ""){
		ComShowCodeMessage("COM0772");
		$("#outbound_dt").focus();
		return;
	}
	//농심창고 출고날짜 VALIDATION
	if($("#ctrt_no").val() == "CTDLC13001"){
		if(ComReplaceStr($("#outbound_dt").val().trim(), "-", "") != ComReplaceStr(ComGetNowInfo(), "-", "")){
			ComShowCodeMessage("COM0488");
			$("#outbound_dt").focus();
			return;
		}
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
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var dlv_ord_no = sheetObj.GetCellValue(i, fix_grid04 + "dlv_ord_no").trim();
		if(sheetObj.GetCellValue(i, fix_grid04 + "tro_flg") == "Y"){
			dlv_ord_no = sheetObj.GetCellValue(i, fix_grid04 + "dlv_ord_no_org").trim();
		}
		//SHIP 수량이 0이상인경우만 체크
		if(sheetObj.GetCellValue(i, fix_grid04 + "bk_sts_cd") != "LP" ){
				var outbound_dt = sheetObj.GetCellValue(i, fix_grid04 + "outbound_dt");
				if(outbound_dt.trim() == ""){
					outbound_dt = $("#outbound_dt").val().trim();
				}
				if(sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim().length > 0 && sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim().length <= 0){
					ComShowCodeMessage("COM0773");
					sheetObj.SelectCell(i, fix_grid04 +  "eq_tpsz_cd");
					return;
				}
				//split일경우 동일한 eq_tpsz_cd, eq_no, out_dt 가 동일한지 체크
				if(eq_tpsz_cd_arr.contains(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, fix_grid04 + "lp_no").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim()  + "|" + outbound_dt) == false){
					eq_tpsz_cd_arr.push(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, fix_grid04 + "lp_no").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt);
				}else{
					ComShowCodeMessage("COM0442");
					sheetObj.SelectCell(i, fix_grid04 +  "eq_tpsz_cd");
					return;
				}
				if(sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() != ""){
					//eq_tpsz_cd, eq_no가 동일한테 trucker, dono, seal no가 다른지 체크
					if(cargo_arr.contains(sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt) == false){
						cargo_arr.push(sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt);
						cargo_rst_arr.push(sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt
								           + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "trucker_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "trucker_nm").trim()
								           + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "seal_no").trim() + "#$#$" + dlv_ord_no + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "lp_no").trim());
						
					}else{
						var c_idx = cargo_arr.getidx(sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt);
						var cargo_rst_arr_var = cargo_rst_arr[c_idx].split("|");
						var oth_info = cargo_rst_arr_var[2];
						if(oth_info != sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "trucker_cd").trim() + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "trucker_nm").trim()
								           + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "seal_no").trim() + "#$#$" + dlv_ord_no + "#$#$" + sheetObj.GetCellValue(i, fix_grid04 + "lp_no").trim()){
							ComShowCodeMessage("COM0449");
							sheetObj.SelectCell(i, fix_grid04 +  "eq_tpsz_cd");
							return;
						}
					}
					//입력된 값이 Compete된 정보와 같은 경우
					if(comp_chk_arr_no_comp.contains(sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt) == false){
						comp_chk_arr_no_comp.push(sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt);
						comp_chk_arr_no_comp_rst.push(sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + outbound_dt + "|" + i);
					}
				}
			cnt++;
			// picking수량, shipping수량 체크위하여 데이터저장
			if(allc_merge_key_arr.contains(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key")) == false){
				allc_merge_key_arr.push(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key"));
				if(sheetObj.GetCellValue(i, fix_grid04 + "pickd_flg") == "Y"){
					pick_qty_arr.push(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, fix_grid04+"pick_item_ea_qty") + "|" + sheetObj.GetCellValue(i, fix_grid04+"ship_item_ea_qty"));
					
				}else{
					pick_qty_arr.push(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key") + "|" + sheetObj.GetCellValue(i, fix_grid04+"allc_item_ea_qty") + "|" + sheetObj.GetCellValue(i, fix_grid04+"ship_item_ea_qty"));
				}
			}else{
				var idx = allc_merge_key_arr.getidx(sheetObj.GetCellValue(i, fix_grid04+"allc_merge_key"));
				var pick_qty_val = pick_qty_arr[idx].split("|");
				var pick_qty_val_sum =eval(pick_qty_val[2]) +  eval(sheetObj.GetCellValue(i, fix_grid04+"ship_item_ea_qty"));
				pick_qty_arr[idx] = pick_qty_val[0] + "|" + pick_qty_val[1] + "|" + pick_qty_val_sum;
			}
			if(wob_bk_no_arr.contains(sheetObj.GetCellValue(i, fix_grid04+"wob_bk_no")) == false){
				wob_bk_no_arr.push(sheetObj.GetCellValue(i, fix_grid04+"wob_bk_no"));
				wob_bk_no_ship_arr.push(sheetObj.GetCellValue(i, fix_grid04+"wob_bk_no") + "|" + sheetObj.GetCellValue(i, fix_grid04+"ship_item_ea_qty"));
			}else{
				var idx = wob_bk_no_arr.getidx(sheetObj.GetCellValue(i, fix_grid04+"wob_bk_no"));
				var wob_bk_no_ship_val = wob_bk_no_ship_arr[idx].split("|");
				var wob_bk_no_ship_val_sum = eval(wob_bk_no_ship_val[1]) + eval(sheetObj.GetCellValue(i, fix_grid04+"ship_item_ea_qty"));
				wob_bk_no_ship_arr[idx] = wob_bk_no_ship_val[0] + "|" + wob_bk_no_ship_val_sum;
			}
		}else if(sheetObj.GetCellValue(i, fix_grid04 + "bk_sts_cd") == "LP" && !sheetObj.GetCellValue(i, fix_grid04 + "eq_no") == ""){
			//입력된 값이 Compete된 정보와 같은 경우
			if(comp_chk_arr_comp_rst.contains(sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "outbound_dt").trim()) == false){
				comp_chk_arr_comp_rst.push(sheetObj.GetCellValue(i, fix_grid04 + "eq_tpsz_cd").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "eq_no").trim() + "|" + sheetObj.GetCellValue(i, fix_grid04 + "outbound_dt").trim());
			}
		}
	}
	if(cnt == 0){
		ComShowCodeMessage("COM0454");
		return;
	}
	//입력된 값이 Compete된 정보와 같은 경우
	for(var i =0;  i<comp_chk_arr_comp_rst.length; i++){
		for(var m=0; m<comp_chk_arr_no_comp.length; m++){
			if(comp_chk_arr_comp_rst[i] == comp_chk_arr_no_comp[m]){
				var chk_row = comp_chk_arr_no_comp_rst[m].split("|");
				ComShowCodeMessage("COM0448");
				sheetObj.SelectCell(chk_row[3], fix_grid04 +  "eq_no");
				return;
			
			}
		}
	}
	//Shipping수량이 Picking수량보다 큰경우 체크
	for(var i =0;  i<pick_qty_arr.length; i++){
		var pick_qty_val = pick_qty_arr[i].split("|");
		var picked = eval(pick_qty_val[1]);
		var shipped = eval(pick_qty_val[2]);
		if(picked >= 0 && picked <shipped){
			var Row1 = sheetObj.FindText(fix_grid04 + "allc_merge_key", pick_qty_val[0], sheetObj.HeaderRows(), -1, true);
			ComShowCodeMessage("COM0450");
			if(Row1 >= 0){
				sheetObj.SelectCell(Row1, fix_grid04 +  "ship_item_ea_qty");
			}
			return;
		}
	}
	//order에 Shipping수량이 모두 0인경우 체크
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		var shipped = sheetObj.GetCellValue(i, fix_grid04 + "ship_item_ea_qty");
		if(shipped == 0){
			ComShowCodeMessage("COM0453");
			break;
		}
	}
	if(ComShowCodeConfirm("COM0441") == false){
		return;
	}
	var tl_wo_document_info_header = "";
	var wave_no 		=     tl_wo_document_info_header+"wave_no="			+$("#wave_no").val();
	var wh_cd 			= "&"+tl_wo_document_info_header+"wh_cd="			+$("#wh_cd").val();
	var pick_dt 		= "&"+tl_wo_document_info_header+"pick_dt="			+$("#pick_dt").val();
	var pick_hm_fr 		= "&"+tl_wo_document_info_header+"pick_hm_fr="		+$("#pick_hm_fr").val();
	var pick_hm_to 		= "&"+tl_wo_document_info_header+"pick_hm_to="		+$("#pick_hm_to").val();
	var outbound_dt		= "&"+tl_wo_document_info_header+"outbound_dt="		+$("#outbound_dt").val();
	var outbound_hm_fr	= "&"+tl_wo_document_info_header+"outbound_hm_fr="	+$("#outbound_hm_fr").val();
	var outbound_hm_to	= "&"+tl_wo_document_info_header+"outbound_hm_to="	+$("#outbound_hm_to").val();
	var rmk 			= "&"+tl_wo_document_info_header+"rmk="				+$("#rmk").val();
	var docinParamter   = wave_no+wh_cd+pick_dt+pick_hm_fr+pick_hm_to+outbound_dt+outbound_hm_fr+outbound_hm_to+rmk;
	var sheetDatas3 = ComReplaceStr(ComGetSaveString(sheetObj, true, false)+getShippingParam(sheetObj), fix_grid04, fix_grid03); //allSave => false 트랜잭션이 발생한 것만 저장할 경우
	var saveXml = sheetObj.GetSaveData("saveAllocShippingLongTransactionGS.clt", docinParamter+"&"+sheetDatas3 + "&" + ComGetSaveString(sheet6, true, false)+"&f_cmd="+MULTI08);
	sheetObj.LoadSaveData(saveXml);
}

function getShippingParam(sheetObj){
	var params = "&";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){	
		if(sheetObj.GetCellValue(i,fix_grid04+"ibflag") == "R" && sheetObj.GetCellEditable(i, fix_grid04+ "ship_item_ea_qty") == true ){
			params += fix_grid04 + "wob_bk_no_org="  		  + sheetObj.GetCellValue(i,fix_grid04+"wob_bk_no_org") 		+ "&";  		
			params += fix_grid04 + "chkAll="   				  + sheetObj.GetCellValue(i,fix_grid04+"chkAll")   				+ "&"; 		
			params += fix_grid04 + "cust_ord_no="  			  + sheetObj.GetCellValue(i,fix_grid04+"cust_ord_no")  			+ "&"; 		
			params += fix_grid04 + "ord_tp_nm="  			  + sheetObj.GetCellValue(i,fix_grid04+"ord_tp_nm") 			+ "&"; 		
			params += fix_grid04 + "bk_sts_nm="   			  + sheetObj.GetCellValue(i,fix_grid04+"bk_sts_nm")   			+ "&"; 		
			params += fix_grid04 + "item_sys_no="    		  + sheetObj.GetCellValue(i,fix_grid04+"item_sys_no")    		+ "&"; 		
			params += fix_grid04 + "item_seq="   			  + sheetObj.GetCellValue(i,fix_grid04+"item_seq")   			+ "&"; 
			params += fix_grid04 + "item_cd="    			  + sheetObj.GetCellValue(i,fix_grid04+"item_cd")    			+ "&"; 
			params += fix_grid04 + "item_nm="  				  + sheetObj.GetCellValue(i,fix_grid04+"item_nm")  				+ "&"; 
			params += fix_grid04 + "allc_merge_key="    	  + sheetObj.GetCellValue(i,fix_grid04+"allc_merge_key")    	+ "&"; 
			params += fix_grid04 + "lot_no="    			  + sheetObj.GetCellValue(i,fix_grid04+"lot_no")    			+ "&"; 
			params += fix_grid04 + "wh_loc_cd_nm="    		  + sheetObj.GetCellValue(i,fix_grid04+"wh_loc_cd_nm")    		+ "&"; 
			params += fix_grid04 + "allc_item_ea_qty="  	  + sheetObj.GetCellValue(i,fix_grid04+"allc_item_ea_qty")  	+ "&"; 
			params += fix_grid04 + "chk="    				  + sheetObj.GetCellValue(i,fix_grid04+"chk")    				+ "&"; 
			params += fix_grid04 + "pick_item_ea_qty="    	  + sheetObj.GetCellValue(i,fix_grid04+"pick_item_ea_qty")    	+ "&"; 
			params += fix_grid04 + "rn="    				  + sheetObj.GetCellValue(i,fix_grid04+"rn")    				+ "&"; 
			params += fix_grid04 + "load_plan_item_ea_qty="   + sheetObj.GetCellValue(i,fix_grid04+"load_plan_item_ea_qty") + "&"; 
			params += fix_grid04 + "ship_item_ea_qty=" 		  + sheetObj.GetCellValue(i,fix_grid04+"ship_item_ea_qty") 		+ "&"; 
			params += fix_grid04 + "est_out_dt=" 			  + sheetObj.GetCellValue(i,fix_grid04+"est_out_dt") 			+ "&"; 
			params += fix_grid04 + "outbound_dt=" 			  + sheetObj.GetCellValue(i,fix_grid04+"outbound_dt") 			+ "&"; 
			params += fix_grid04 + "out_pe_qty=" 			  + sheetObj.GetCellValue(i,fix_grid04+"out_pe_qty") 			+ "&"; 
			params += fix_grid04 + "dlv_ord_no=" 			  + sheetObj.GetCellValue(i,fix_grid04+"dlv_ord_no") 			+ "&"; 
			params += fix_grid04 + "tro_sts_nm=" 			  + sheetObj.GetCellValue(i,fix_grid04+"tro_sts_nm") 			+ "&"; 
			params += fix_grid04 + "eq_tpsz_cd=" 			  + sheetObj.GetCellValue(i,fix_grid04+"eq_tpsz_cd") 			+ "&"; 
			params += fix_grid04 + "eq_tp_cd=" 				  + sheetObj.GetCellValue(i,fix_grid04+"eq_tp_cd") 				+ "&"; 
			params += fix_grid04 + "eq_no=" 				  + sheetObj.GetCellValue(i,fix_grid04+"eq_no") 				+ "&"; 
			params += fix_grid04 + "seal_no=" 				  + sheetObj.GetCellValue(i,fix_grid04+"seal_no") 				+ "&"; 
			params += fix_grid04 + "trucker_cd=" 			  + sheetObj.GetCellValue(i,fix_grid04+"trucker_cd")			+ "&"; 
			params += fix_grid04 + "trucker_nm=" 			  + sheetObj.GetCellValue(i,fix_grid04+"trucker_nm") 			+ "&"; 
			params += fix_grid04 + "item_cbm=" 				  + sheetObj.GetCellValue(i,fix_grid04+"item_cbm") 				+ "&"; 
			params += fix_grid04 + "item_cbf=" 				  + sheetObj.GetCellValue(i,fix_grid04+"item_cbf") 				+ "&"; 
			params += fix_grid04 + "item_grs_kgs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"item_grs_kgs") 			+ "&"; 
			params += fix_grid04 + "item_grs_lbs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"item_grs_lbs") 			+ "&"; 
			params += fix_grid04 + "item_net_kgs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"item_net_kgs") 			+ "&"; 
			params += fix_grid04 + "item_net_lbs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"item_net_lbs") 			+ "&"; 
			params += fix_grid04 + "wib_bk_no=" 			  + sheetObj.GetCellValue(i,fix_grid04+"wib_bk_no") 			+ "&"; 
			params += fix_grid04 + "inbound_dt=" 			  + sheetObj.GetCellValue(i,fix_grid04+"inbound_dt") 			+ "&"; 
			params += fix_grid04 + "po_no_in=" 				  + sheetObj.GetCellValue(i,fix_grid04+"po_no_in") 				+ "&"; 
			params += fix_grid04 + "lot_id=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lot_id") 				+ "&"; 
			params += fix_grid04 + "exp_dt=" 				  + sheetObj.GetCellValue(i,fix_grid04+"exp_dt") 				+ "&"; 
			params += fix_grid04 + "lot_04=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lot_04") 				+ "&"; 
			params += fix_grid04 + "lot_05=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lot_05") 				+ "&"; 
			params += fix_grid04 + "wob_bk_no=" 			  + sheetObj.GetCellValue(i,fix_grid04+"wob_bk_no")				+ "&"; 
			params += fix_grid04 + "ctrt_no=" 				  + sheetObj.GetCellValue(i,fix_grid04+"ctrt_no") 				+ "&"; 
			params += fix_grid04 + "ctrt_nm=" 				  + sheetObj.GetCellValue(i,fix_grid04+"ctrt_nm") 				+ "&"; 
			params += fix_grid04 + "wh_cd=" 				  + sheetObj.GetCellValue(i,fix_grid04+"wh_cd") 				+ "&"; 
			params += fix_grid04 + "ibflag=" 				  + 'U'															+ "&"; 
			params += fix_grid04 + "walc_no=" 				  + sheetObj.GetCellValue(i,fix_grid04+"walc_no") 				+ "&"; 
			params += fix_grid04 + "sao_sys_no=" 			  + sheetObj.GetCellValue(i,fix_grid04+"sao_sys_no") 			+ "&"; 
			params += fix_grid04 + "po_sys_no=" 			  + sheetObj.GetCellValue(i,fix_grid04+"po_sys_no") 			+ "&"; 
			params += fix_grid04 + "wh_loc_cd=" 			  + sheetObj.GetCellValue(i,fix_grid04+"wh_loc_cd") 			+ "&"; 
			params += fix_grid04 + "issu_cnt=" 				  + sheetObj.GetCellValue(i,fix_grid04+"issu_cnt") 				+ "&"; 
			params += fix_grid04 + "lp_cnt=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lp_cnt") 				+ "&"; 
			params += fix_grid04 + "bk_sts_cd=" 			  + sheetObj.GetCellValue(i,fix_grid04+"bk_sts_cd") 			+ "&"; 
			params += fix_grid04 + "bk_sts_cd_grp=" 		  + sheetObj.GetCellValue(i,fix_grid04+"bk_sts_cd_grp") 		+ "&"; 
			params += fix_grid04 + "pkg_lv1_qty=" 			  + sheetObj.GetCellValue(i,fix_grid04+"pkg_lv1_qty") 			+ "&"; 
			params += fix_grid04 + "lv1_cbm=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lv1_cbm") 				+ "&"; 
			params += fix_grid04 + "lv1_cbf=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lv1_cbf") 				+ "&"; 
			params += fix_grid04 + "lv1_grs_kgs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"lv1_grs_kgs") 			+ "&"; 
			params += fix_grid04 + "lv1_grs_lbs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"lv1_grs_lbs") 			+ "&"; 
			params += fix_grid04 + "lv1_net_kgs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"lv1_net_kgs") 			+ "&"; 
			params += fix_grid04 + "lv1_net_lbs=" 			  + sheetObj.GetCellValue(i,fix_grid04+"lv1_net_lbs")			+ "&"; 
			params += fix_grid04 + "pe_qty=" 				  + sheetObj.GetCellValue(i,fix_grid04+"pe_qty")				+ "&"; 
			params += fix_grid04 + "pickd_flg=" 			  + sheetObj.GetCellValue(i,fix_grid04+"pickd_flg") 			+ "&"; 
			params += fix_grid04 + "lp_no=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lp_no") 				+ "&"; 
			params += fix_grid04 + "consol_no=" 			  + sheetObj.GetCellValue(i,fix_grid04+"consol_no") 			+ "&"; 
			params += fix_grid04 + "shipno=" 				  + sheetObj.GetCellValue(i,fix_grid04+"shipno") 				+ "&"; 
			params += fix_grid04 + "shipno_seq=" 			  + sheetObj.GetCellValue(i,fix_grid04+"shipno_seq") 			+ "&"; 
			params += fix_grid04 + "lp_id=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lp_id") 				+ "&"; 
			params += fix_grid04 + "lp_seq=" 				  + sheetObj.GetCellValue(i,fix_grid04+"lp_seq") 				+ "&"; 
			params += fix_grid04 + "tro_flg=" 				  + sheetObj.GetCellValue(i,fix_grid04+"tro_flg") 				+ "&"; 
			params += fix_grid04 + "dlv_ord_no_org=" 		  + sheetObj.GetCellValue(i,fix_grid04+"dlv_ord_no_org") 		+ "&"; 
			params += fix_grid04 + "tro_seq=" 		          + sheetObj.GetCellValue(i,fix_grid04+"tro_seq") 				+ "&"; 
			params = params.substring(0,params.length-1);
		}
	}
	if(params.length == 1)
		return "";
	else
		return params;
}

/*
 * Allc tab cancel(순차적으로 back cancel)
 */
function btn_Cancel_Allc()
{
	var sheetObj = sheet4;
	var div = "";
	var saveXml = "";
	//할당이 단한번도 되지않은경우
	var allc_cnt = eval($("#allc_cnt_tot").val());
	if(allc_cnt <= 0){
		ComShowCodeMessage("COM0330"); 
		return;
	}
	var iChkCnt    = sheetObj.CheckedRows(fix_grid04+"chk");
	var iChkAllCnt = sheetObj.CheckedRows(fix_grid04+"chkAll");
	if(iChkCnt + iChkAllCnt == 0){
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
		var sRow = sheetObj.FindCheckedRow(fix_grid04 + "chk");
		var arrRow = sRow.split("|"); //결과 : "1|3|5|"
		for(var i=0; i<arrRow.length-1; i++){
			if(sheetObj.GetCellValue(arrRow[i], fix_grid04 + "bk_sts_cd") == "LP" && sheetObj.GetCellValue(arrRow[i], fix_grid04 + "lp_no") != ""){
				var lp_no = sheetObj.GetCellValue(arrRow[i], fix_grid04 + "lp_no");
				for(var m=sheetObj.HeaderRows(); m<=sheetObj.LastRow();m++){
					if(m != arrRow[i] && sheetObj.GetCellValue(m, fix_grid04 + "bk_sts_cd") == "LP" && sheetObj.GetCellValue(m, fix_grid04 + "lp_no") == lp_no &&  sheetObj.GetCellValue(m, fix_grid04 + "chk") == "0"){
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
			var isheetSaveParamters = docinParamter + "&" + ComReplaceStr(sheetDatas1, fix_grid04, fix_grid03);
			saveXml = sheetObj.GetSaveData("cancelWaveSimpleMgmtPartialLongTransactionGS.clt", isheetSaveParamters+"&f_cmd="+MULTI07);
			sheetObj.LoadSaveData(saveXml);			
			break;
	}
}

function sheet2_OnPopupClick(sheetObj, Row, Col)
{
	var colName = sheetObj.ColSaveName(Col);
	var sUrl = "";
	with(sheetObj)
	{		
		if (colName == fix_grid02 + "cust_ord_no" ) 
		{
			var sParam = OrderSearchParam(sheetObj, Row, "wave_");
			if(sParam == ""){
				return;
			}
			sUrl = "WaveOrderSelectPopup.clt?" + sParam;
			callBackFunc = "setBookingAddInfo";
			modal_center_open(sUrl, callBackFunc, 1000, 550,"yes");
		}
	}
}

function sheet3_OnPopupClick(sheetObj, Row, Col)
{
	var colName = sheetObj.ColSaveName(Col);
	switch (colName)
	{
		case fix_grid03 + "manual_alloc_img": //Manual Alloc
				popupManualAllcPopup("ALL", "S", "&search_no=" + $("#wave_no").val() + "&wh_cd=" + $("#wh_cd").val()+ "&rum="   + sheetObj.GetCellValue(Row, fix_grid03+"rum"));
			break;
	}	
}

function setBookingAddInfo(rTrnData, row, col, sheetIdx)
{
	if(rTrnData == null)
		return;
	var sheetObj = sheet2;
	row = sheetObj.GetSelectRow();
	//중복건체크
	var aryPopupData = rTrnData.split("|");
	var Row1 = -1;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(aryPopupData[6] == sheetObj.GetCellValue(i, fix_grid02 + "wob_bk_no") && sheetObj.GetCellValue(i, fix_grid02 + "ibflag") != "D"){
			Row1 = i; 
			break;
		}
	}
	
	if(Row1 >= 0){
		//ComShowCodeMessage("COM0158",Row1, "Order No(" + sheetObj.CellValue(Row1, fix_grid02 + "cust_ord_no") + ")");
		ComShowCodeMessage("COM0775", Row1, sheetObj.GetCellValue(Row1, fix_grid02 + "cust_ord_no"));
		sheetObj.SelectCell(Row1, fix_grid02 + "cust_ord_no");
		sheetObj.SetCellValue(row, col,"");
		return;
	}
	
		//중복건이 없을때 행추가
	sheetObj.SetCellValue(row, fix_grid02 + "cust_ord_no",aryPopupData[0]);
	sheetObj.SetCellValue(row, fix_grid02 + "bk_sts_nm",aryPopupData[1]);
	sheetObj.SetCellValue(row, fix_grid02 + "est_out_dt",aryPopupData[2]);
	sheetObj.SetCellValue(row, fix_grid02 + "ship_to",aryPopupData[3]);
	sheetObj.SetCellValue(row, fix_grid02 + "ctrt_no",aryPopupData[4]);
	sheetObj.SetCellValue(row, fix_grid02 + "ctrt_nm",aryPopupData[5]);
	sheetObj.SetCellValue(row, fix_grid02 + "wob_bk_no",aryPopupData[6]);
	sheetObj.SetCellValue(row, fix_grid02 + "bk_date",aryPopupData[7]);
	sheetObj.SetCellValue(row, fix_grid02 + "wh_cd",aryPopupData[8]);
	sheetObj.SetCellValue(row, fix_grid02 + "wh_nm",aryPopupData[9]);
	sheetObj.SetCellValue(row, fix_grid02 + "bk_sts_cd",aryPopupData[10]);
	sheetObj.SetCellEditable(row, fix_grid02 + "cust_ord_no",false);
	
}

function OrderSearchParam(sheetObj ,Row, prefix)
{
	
	var wh_cd = "";
	var wh_nm = "";
	var ctrt_no = "";
	var ctrt_nm = "";
	if(sheetObj.RowCount() <= 1)
	{
		if($("#wave_wh_cd").val().trim().length <= 0){
			ComShowCodeMessage("COM0493");
			$("#wave_wh_cd").focus();
			return "";
		}
		wh_cd = $("#wave_wh_cd").val().trim();
		ctrt_no = $("#wave_ctrt_no").val().trim();
		ctrt_nm = $("#wave_ctrt_nm").val().trim();
	}else{
		if(sheetObj.GetCellValue(Row -1, fix_grid02+"wh_cd") == "" && $("#wave_wh_cd").val().trim().length <= 0){
			ComShowCodeMessage("COM0493");
			$("#wave_wh_cd").focus();
			return "";
		}
		if(sheetObj.GetCellValue(Row -1, fix_grid02+"wh_cd") != ""){
			wh_cd = sheetObj.GetCellValue(Row -1, fix_grid02+"wh_cd");
		}else{
			wh_cd = $("#wave_wh_cd").val().trim();
		}
		
		
		if(sheetObj.GetCellValue(Row -1, fix_grid02+"ctrt_no") != ""){
			ctrt_no = sheetObj.GetCellValue(Row -1, fix_grid02+"ctrt_no");
			ctrt_nm = sheetObj.GetCellValue(Row -1, fix_grid02+"ctrt_nm");
		}else{
			ctrt_no = $("#wave_ctrt_no").val().trim();
			ctrt_nm = $("#wave_ctrt_nm").val();
		}
	}
	$("#wh_cd").val(wh_cd);
	var sParam = prefix + "wh_cd=" + wh_cd + "&" + prefix + "wh_nm=" + encodeURIComponent(wh_nm) + "&" + prefix + "ctrt_no=" + ctrt_no + "&" + prefix + "ctrt_nm=" + encodeURIComponent(ctrt_nm);
	return sParam;

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
 * Excel Download
 */ 
function btn_Excel(sheetObj,fileName){
	if(sheetObj.RowCount() < 1){//no data	
		ComShowCodeMessage("COM132501");
	}else{
		sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1,FileName:fileName});
	}
}

/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
	case 1:     
		with(sheetObj){
		      var prefix=fix_grid01;
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WaveSmpMgmt_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
		      var cols = [
		             {Type:"Text",  Hidden:1, 	Width:50, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"seq", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
		             {Type:"Text",  Hidden:0,  	Width:120, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"wave_no",  	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
		             {Type:"Date",  Hidden:0,  	Width:90, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"wave_dt",  	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:"Ymd"	},
		             {Type:"Text",  Hidden:0,  	Width:120, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"cust_ord_no", KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
		             {Type:"Text",  Hidden:0,  	Width:70, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"bk_sts_nm",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text", 	Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"ord_tp_cd",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Date", 	Hidden:0, 	Width:90, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"est_out_dt",  KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"	},
		             {Type:"Date",  Hidden:0,  	Width:90, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"pick_dt",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"	},
		             {Type:"Date",  Hidden:0, 	Width:90, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"outbound_dt", KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:"Ymd"	},
		             {Type:"Text",  Hidden:0, 	Width:250, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ship_to",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:""				},
		             {Type:"Text", 	Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ctrt_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0, 	Width:140, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ctrt_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"trade_tp_cd", KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0,  	Width:80, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"fwd_tp_cd",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0, 	Width:110, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"mbl_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0,  	Width:110, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"hbl_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",				},
		             {Type:"Text",  Hidden:0, 	Width:100, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ref_no",   	KeyField:0,	  UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
		             {Type:"Text", 	Hidden:0, 	Width:100, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"commc_inv_no",KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0,  	Width:120, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"wob_bk_no",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  Hidden:0,  	Width:80, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"wh_cd",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				}];
			      InitColumns(cols);
			      SetSheetHeight(595);
			      SetClipPasteMode(1);	
			      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		      }
		      break;
	case 2:      
		with(sheetObj){
			var prefix=fix_grid02;
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WaveSmpMgmt_HDR2'), Align:"Center"}];
			InitHeaders(headers, info);
			var cols = [
			            {Type:"DelCheck",  	Hidden:0,  	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"del",  		KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:""				},
			            {Type:"Status",  	Hidden:1, 	Width:30, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ibflag", 		KeyField:0,   UpdateEdit:0,    InsertEdit:1, 		 Format:""				},
			            {Type:"CheckBox",  	Hidden:0,  	Width:30, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"chk",  		KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:""				},
			            {Type:"PopupEdit",  Hidden:0,  	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"cust_ord_no", KeyField:0,   UpdateEdit:0,    InsertEdit:1, 		 Format:""				},
			            {Type:"Text",  		Hidden:0,  	Width:60, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"bk_sts_nm", 	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Date",  		Hidden:0,  	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"est_out_dt",  KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"	},
			            {Type:"Text", 		Hidden:0, 	Width:200, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ship_to",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ctrt_no",  	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:0,  	Width:130, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ctrt_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:0, 	Width:120, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wob_bk_no", 	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Date",  		Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"bk_date",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:"Ymd"	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_cd",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wh_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:1, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"bk_sts_cd", 	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:1,  	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wave_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:1, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"walc_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:1,  	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"issu_cnt",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",				},
			            {Type:"Text",  		Hidden:1, 	Width:80, 	Align:"right",	ColMerge:0,  SaveName:prefix+"lp_cnt",   	KeyField:0,	  UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:80, 	Align:"right",	ColMerge:0,  SaveName:prefix+"allc_cnt",	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:80, 	Align:"right",	ColMerge:0,  SaveName:prefix+"pickd_cnt",	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"buyer_cd",	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				}];
			InitColumns(cols);
			SetSheetHeight(440);
			SetClipPasteMode(1);	
			SetColProperty(0, prefix+"cust_ord_no",	{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		}
		break;
	case 3:      
		with(sheetObj){
			var prefix=fix_grid03;
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WaveSmpMgmt_HDR3_1'), Align:"Center"},{ Text:getLabel('WaveSmpMgmt_HDR3_2'), Align:"Center"}];
			InitHeaders(headers, info);
			var cols = [
			            {Type:"Text",  		Hidden:1, 	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wob_bk_no_org", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Text",  		Hidden:1,  	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_sys_no",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Text",  		Hidden:1,  	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_seq", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Popup",  	Hidden:0,  	Width:50, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"manual_alloc_img", 	KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:""				},
			            {Type:"Combo",  	Hidden:0,  	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"strg_sys_no",  		KeyField:0,   UpdateEdit:1,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"cust_ord_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"item_cd",  			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:0,  	Width:150, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_nm",   			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:0, 	Width:50, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"item_pkgunit", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			            {Type:"Int",  		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_pkgqty",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_ea_qty",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"allc_sum_ea_qty",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT},
			            {Type:"Int",  		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"un_alloc_ea_qty", 	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT},
			            {Type:"Text",  		Hidden:1,  	Width:10, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"rn",   				KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""				},
			            {Type:"Text",  		Hidden:0, 	Width:100, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_no",   			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text",  		Hidden:0,  	Width:50, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_loc_cd_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",				},
			            {Type:"CheckBox",  	Hidden:0, 	Width:30, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"chk",   				KeyField:0,	   		 								 Format:""				},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"allc_item_ea_qty",	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_cbm",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_CBM_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_cbf",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_CBM_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_grs_kgs",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_grs_lbs",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_net_kgs",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_net_lbs",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wob_bk_no",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:100, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wib_bk_no",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"inbound_dt",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"	},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"po_no_in",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"lot_id",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"exp_dt",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_04",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_05",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Status", 	Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ibflag",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"walc_no",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"sao_sys_no",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"po_sys_no",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wh_loc_cd",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"rum",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lp_cnt",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"bk_sts_cd",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				}];
			InitColumns(cols);
			SetSheetHeight(440);
			SetClipPasteMode(1);
			SetColProperty(prefix+"strg_sys_no", {ComboText:whallcstrglistText.substring(0,whallcstrglistText.length-1), ComboCode:whallcstrglistCode.substring(0,whallcstrglistCode.length-1)} );
		}
		break;
	case 4:      
		with(sheetObj){
			var prefix=fix_grid06;
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WaveSmpMgmt_HDR4'), Align:"Center"}];
			InitHeaders(headers, info);
			var cols = [
			            {Type:"Text",  	Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"cust_ord_no", 						KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Int",  	Hidden:0,  	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_pl_qty",  	DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int",  	Hidden:0,  	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_bx_qty", 	DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int",  	Hidden:0,  	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_ea_qty", 	DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int",  	Hidden:0,  	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_sqft",  		DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Float", 	Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_cbm",   		DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_CBM_POINT	},
			            {Type:"Float", 	Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_grs_kgs",  	DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Float",  Hidden:0,  	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"outbound_net_kgs",   	DefaultValue:0 ,KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Status", Hidden:1, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"ibflag", 								KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  	Hidden:1, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wob_bk_no",   						KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:""											},
			            {Type:"Text", 	Hidden:1, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_cd",   							KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											}];
			InitColumns(cols);
			SetSheetHeight(150);
			SetClipPasteMode(1);	
			SetColProperty(0 ,prefix+"outbound_pl_qty" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"outbound_bx_qty" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"outbound_ea_qty" ,	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"outbound_sqft" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"outbound_cbm" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"outbound_grs_kgs" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"outbound_net_kgs" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
		}
		break;
	case 5:     
		with(sheetObj){
			var prefix=fix_grid04;
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WaveSmpMgmt_HDR5_1'), Align:"Center"},{ Text:getLabel('WaveSmpMgmt_HDR5_2'), Align:"Center"}];
			InitHeaders(headers, info);
			var cols = [
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wob_bk_no_org", 			KeyField:0,   UpdateEdit:1,    InsertEdit:0, 		 Format:""											},
			            {Type:"CheckBox",  	Hidden:0,  	Width:30, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"chkAll",  				KeyField:0,   UpdateEdit:1,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:0,  	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"cust_ord_no", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:0,  	Width:70, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"ord_tp_nm", 				KeyField:0,   UpdateEdit:0,    InsertEdit:1, 		 Format:""											},
			            {Type:"Text",  		Hidden:0,  	Width:60, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"bk_sts_nm",  				KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_sys_no",   			KeyField:0,   UpdateEdit:1,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_seq",  				KeyField:0,   UpdateEdit:1,    InsertEdit:0,		 Format:""											},
			            {Type:"Text",  		Hidden:0,  	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"item_cd",   				KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text",  		Hidden:0, 	Width:125, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_nm", 				KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"allc_merge_key",   		KeyField:0,   UpdateEdit:1,    InsertEdit:0,  		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_no",   				KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"PopupEdit", 	Hidden:0, 	Width:70, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_loc_cd_nm",   			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Int",  		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"allc_item_ea_qty", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"CheckBox",  	Hidden:0,  	Width:30, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"chk",   					KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""											},
			            {Type:"Int",  		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"pick_item_ea_qty",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Text",  		Hidden:1,  	Width:10, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"rn",   					KeyField:0,   UpdateEdit:1,    InsertEdit:0,		 Format:"",											},
			            {Type:"Text",  		Hidden:1, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"load_plan_item_ea_qty",   KeyField:0,	  UpdateEdit:0,    InsertEdit:0, 		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"ship_item_ea_qty",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"est_out_dt",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd",								},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"outbound_dt",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd",								},
			            {Type:"Text", 		Hidden:0, 	Width:50, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"out_pe_qty",				KeyField:0,	  UpdateEdit:1,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"dlv_ord_no",				KeyField:0,	  UpdateEdit:1,    InsertEdit:1,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"tro_sts_nm",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"PopupEdit", 	Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"eq_tpsz_cd",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"eq_tp_cd",				KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"eq_no",					KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"",				EditLen:20					},
			            {Type:"PopupEdit", 	Hidden:0, 	Width:100, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"seal_no",					KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"",				EditLen:100					},
			            {Type:"PopupEdit", 	Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"trucker_cd",				KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"",				EditLen:10					},
			            {Type:"Text", 		Hidden:0, 	Width:150, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"trucker_nm",				KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:""											},
			            {Type:"Float", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_cbm",				KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_CBM_POINT	},
			            {Type:"Float", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_cbf",				KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_CBM_POINT	},
			            {Type:"Float", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_grs_kgs",			KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Float", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_grs_lbs",			KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Float", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_net_kgs",			KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Float", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_net_lbs",			KeyField:0,	  UpdateEdit:1,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wib_bk_no",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"inbound_dt",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"								},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"po_no_in",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_id",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"exp_dt",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"								},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_04",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_05",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wob_bk_no",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"ctrt_no",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:150, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ctrt_nm",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_cd",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Status", 	Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"ibflag",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:150, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"walc_no",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"sao_sys_no",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"po_sys_no",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wh_loc_cd",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"issu_cnt",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lp_cnt",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"bk_sts_cd",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"bk_sts_cd_grp",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"pkg_lv1_qty",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lv1_cbm",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",PointCount:MST_CBM_POINT			},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lv1_cbf",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",PointCount:MST_CBM_POINT			},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lv1_grs_kgs",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",PointCount:MST_KGS_POINT			},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lv1_grs_lbs",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",PointCount:MST_KGS_POINT			},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lv1_net_kgs",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",PointCount:MST_KGS_POINT			},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lv1_net_lbs",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:"Float",PointCount:MST_KGS_POINT			},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"pe_qty",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"pickd_flg",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:150, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lp_no",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"consol_no",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"shipno",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"shipno_seq",				KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lp_id",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lp_seq",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"tro_flg",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"dlv_ord_no_org",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"tro_seq",					KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""											}];
			InitColumns(cols);
			SetSheetHeight(444);
			SetClipPasteMode(1);	
			SetColProperty(0, prefix+"dlv_ord_no",			{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"eq_tpsz_cd",			{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"eq_no",				{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"seal_no",				{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"trucker_cd",			{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			SetColProperty(0, prefix+"trucker_nm",			{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
			
			SetColProperty(0 ,prefix+"pick_item_ea_qty" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"ship_item_ea_qty" , 	{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"out_pe_qty" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_cbm" , 			{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_cbf" , 			{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_grs_kgs" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_grs_lbs" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_net_kgs" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
			SetColProperty(0 ,prefix+"item_net_lbs" , 		{AcceptKeys:"[0123456789]|[,.]" , InputCaseSensitive:1});
		}
		break;
	case 6:      
		with(sheetObj){
			var prefix=fix_grid05;
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('WaveSmpMgmt_HDR6_1'), Align:"Center"},{ Text:getLabel('WaveSmpMgmt_HDR6_2'), Align:"Center"}];
			InitHeaders(headers, info);
			var cols = [
			            {Type:"Text",  		Hidden:1, 	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wob_bk_no_org", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1,  	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_sys_no",  		KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:""											},
			            {Type:"Text",  		Hidden:1,  	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_seq", 			KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:""											},
			            {Type:"Popup",  	Hidden:0,  	Width:50, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"manual_alloc_img", 	KeyField:0,   UpdateEdit:1,    InsertEdit:1, 		 Format:""											},
			            {Type:"Combo",  	Hidden:0,  	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"strg_sys_no",  		KeyField:0,   UpdateEdit:1,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"cust_ord_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",											},
			            {Type:"Text", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"item_cd",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"",											},
			            {Type:"Text", 		Hidden:0, 	Width:150, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"item_nm",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"",											},
			            {Type:"Text", 		Hidden:0, 	Width:30, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"item_pkgunit",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"",											},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_pkgqty",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_ea_qty",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"allc_sum_ea_qty",  	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"un_alloc_ea_qty",  	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"stock_qty",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:WMS_QTY_FORMAT2,PointCount:WMS_QTY_POINT	},
			            {Type:"Text", 		Hidden:1, 	Width:10, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"rn",  				KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_no",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_loc_cd_nm",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Int", 		Hidden:0, 	Width:60, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"allc_item_ea_qty",  	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_CBM_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_cbm",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_CBM_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_cbf",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_grs_kgs",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_grs_lbs",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_net_kgs",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:80, 	Align:"Right",	ColMerge:0,  SaveName:prefix+"item_net_lbs",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",		PointCount:WMS_KGS_POINT	},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wob_bk_no",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:100, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"wib_bk_no",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"inbound_dt",  		KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Ymd"								},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"po_no_in",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"lot_id",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Date", 		Hidden:0, 	Width:100, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"exp_dt",  			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Ymd"								},
			            {Type:"Text",  		Hidden:0,  	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_04",   			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Text",  		Hidden:0,  	Width:80, 	Align:"Left",	ColMerge:0,  SaveName:prefix+"lot_05",   			KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""											},
			            {Type:"Status",  	Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"ibflag", 				KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"walc_no", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"sao_sys_no", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"po_sys_no", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"wh_loc_cd", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""											},
			            {Type:"Text",  		Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"rum",   				KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:""											},
			            {Type:"Text", 		Hidden:1, 	Width:0, 	Align:"Center",	ColMerge:0,  SaveName:prefix+"lp_cnt",   			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""											}];
			InitColumns(cols);
			SetSheetHeight(632);
			SetClipPasteMode(1);
			SetColProperty(prefix+"strg_sys_no", {ComboText:whallcstrglistText.substring(0,whallcstrglistText.length-1), ComboCode:whallcstrglistCode.substring(0,whallcstrglistCode.length-1)} );
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