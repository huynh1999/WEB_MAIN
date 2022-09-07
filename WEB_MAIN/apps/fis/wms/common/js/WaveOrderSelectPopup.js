/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveOrderSelectPopup.js
*@FileTitle  : Wave Order Select Popup
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2015/04/13
=========================================================*/
//docObjects
var docObjects=new Array();
var comboObjects=new Array();
var comboCnt=0; 

var sheetCnt=0;
var fix_grid01 = "Grd01"; //LIST
var firCalFlag=false;
var callBackFunc = "";
//Object
var formObj = null;
var sheetObj= null;

var startRow = 0;
var totalRowMerge = 0;

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	//sheet
	formObj = document.form;
	sheetObj=docObjects[0];
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject);
	    comEndConfigSheet(sheetObject);
	}
	
	if($("#in_wave_wh_cd").val().trim() != ""){
		$("#list_wh_cd").val($("#in_wave_wh_cd").val().trim());
	}
	
    if($("#q_search_tp").val().trim() != "" && $("#q_search_no").val().trim() != "")
	{
    	$("#wave_in_search_tp").val($("#q_search_tp").val());
    	$("#wave_in_no").val( $("#q_search_no").val());
    	btn_Search();
	}
    else
	{
    	$("#wave_fm_date").val(ComGetDateAdd(null, "d", -31, "-"));
    	$("#wave_to_date").val(ComGetNowInfo());
	}
}

function doWork(srcName){
	switch (srcName) {
	case 'SEARCHLIST':
		btn_Search();
		break;
	case 'OK':
		btn_OK();
		break;
	case 'CLOSE':
		btn_Close();
		break;
	case 'btn_wave_ctrt_no':
		CtrtPopup('c');
		break;
	case 'btn_wave_to_date':
		var cal=new ComCalendarFromTo();
        cal.displayType="date";
        cal.select(formObj.wave_fm_date, formObj.wave_to_date, 'MM-dd-yyyy');
		break;

	}
}

function getCtrtInfo2(objid,objname){
	var formObj=document.form;
	var flag = '';
	if(objid.value == ""){
		objid.value="";
		objname.value="";
	}else{
		searchCtrtInfo2(formObj,ComGetObjValue(objid),flag);
	}
}
function searchCtrtInfo2 (form, ctrt_no,flag){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	ajaxSendPost(resultCtrtInfo2, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.wave_ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.wave_ctrt_no.value='';
				formObj.wave_ctrt_nm.value='';
			}
		}
		else{
			formObj.wave_ctrt_no.value='';
			formObj.wave_ctrt_nm.value='';	
		}
	}
}
function CtrtPopup(key){
	var param = '';
	if(key =='c'){
		param = "?ctrt_no=&ctrt_nm=&ctrt_use_flg=A";
	    callBackFunc = "setCtrtNoInfo";
	    modal_center_open('./ContractRoutePopup.clt' + param, callBackFunc, 900, 580,"yes");
	}else{
		param = "?ctrt_no=" + formObj.wave_ctrt_no.value + "&ctrt_nm=" + formObj.wave_ctrt_nm.value + "&ctrt_use_flg=A";
	    callBackFunc = "setCtrtNoInfo";
	    modal_center_open('./ContractRoutePopup.clt' + param, callBackFunc, 900, 580,"yes");
	}
}
function setCtrtNoInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.wave_ctrt_no.value=rtnValAry[0];
		formObj.wave_ctrt_nm.value=rtnValAry[1];
	}
}

/**
 * Search
 */
function btn_Search() {
	var formObj = document.form;
	if (validateForm(formObj, 'search') == false) {
		return;	
	}
	
	var formObj = document.form;
	var sheetObj = sheet1;
	formObj.f_cmd.value = SEARCHLIST;
    var sXml = sheetObj.GetSearchData("searchWaveSimpleNewOrderLGS.clt", FormQueryString(formObj, ""));
    sheetObj.LoadSearchData(sXml);
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//booking no가 입력되지않은경우 date필수
			if(ComIsEmpty(formObj.wave_in_no) && ComIsEmpty(formObj.wave_fm_date)){
				ComShowCodeMessage("COM0114",$('#wave_in_date_tp option:selected').text());
				$("#wave_fm_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.wave_fm_date) && ComIsEmpty(formObj.wave_to_date)){
				formObj.wave_to_date.value = ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.wave_fm_date) && !isDate(formObj.wave_fm_date)) {
				ComShowCodeMessage("COM0114",$('#wave_in_date_tp option:selected').text());
				formObj.wave_fm_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.wave_to_date) && !isDate(formObj.wave_to_date)) {
				ComShowCodeMessage("COM0114",$('#wave_in_date_tp option:selected').text());
				formObj.wave_to_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.wave_fm_date)&&ComIsEmpty(formObj.wave_to_date))||(ComIsEmpty(formObj.wave_fm_date)&&!ComIsEmpty(formObj.wave_to_date))) {
				ComShowCodeMessage("COM0122",$('#wave_in_date_tp option:selected').text());
				formObj.wave_fm_date.focus();
				return false;
			}
			if (getDaysBetween2(formObj.wave_fm_date.value, formObj.wave_to_date.value)<0) {
				ComShowCodeMessage("COM0122",$('#wave_in_date_tp option:selected').text());
				formObj.wave_fm_date.focus();
				return false;
			}
			break;
		}
	}
	return true;
}

function sheet1_OnDblClick(sheetObj, Row, Col) {
	var retArray="";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"cust_ord_no"); 
	retArray += "|";                                                 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"bk_sts_nm"); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"est_out_dt"); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ship_to"); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ctrt_no"); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"ctrt_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wob_bk_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"bk_date");
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wh_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"wh_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), fix_grid01+"bk_sts_cd");
	ComClosePopup(retArray); 	
}

function btn_OK() {
	if( docObjects[0].RowCount()== 0 ){
		ComShowCodeMessage("COM0253");	
	}else{
		curRow = sheet1.GetSelectRow();
		sheet1_OnDblClick(sheet1, curRow);  
	}	
}

/**
 * Close
 */
function btn_Close() {
	ComClosePopup();
}

/*
 * initSheet
 */
function initSheet(sheetObj) {
	var cnt = 0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
			with (sheetObj) 
		    {
			 var prefix = fix_grid01;

		     SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		     var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		     var headers = [ { Text:getLabel('WaveOrderSelectPopup'), Align:"Center"}];
		     InitHeaders(headers, info);
		     var cols = [
			             {Type:"Text",  Hidden:0, 	Width:150, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"cust_ord_no", 	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			             {Type:"Text",  Hidden:0,  	Width:100, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"bk_sts_nm",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			             {Type:"Date",  Hidden:0,  	Width:100, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"est_out_dt",  	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:"Ymd"	},
			             {Type:"Text",  Hidden:0,  	Width:150, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ship_to", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			             {Type:"Text",  Hidden:0,  	Width:80, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ctrt_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			             {Type:"Text", 	Hidden:0, 	Width:150, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ctrt_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			             {Type:"Text", 	Hidden:0, 	Width:150, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"wob_bk_no",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			             {Type:"Date",  Hidden:0,  	Width:100, 	Align:"Center",	ColMerge:1,  SaveName:prefix+"bk_date",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"	},
			             {Type:"Text",  Hidden:0, 	Width:100, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"wh_cd", 			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""				},
			             {Type:"Text",  Hidden:1, 	Width:100, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"wh_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:""				},
			             {Type:"Text", 	Hidden:1, 	Width:80, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"bk_sts_cd",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
			             {Type:"Status",Hidden:1, 	Width:140, 	Align:"Left",	ColMerge:1,  SaveName:prefix+"ibflag",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				}];
				      InitColumns(cols);
				      SetSheetHeight(350);
				      SetClipPasteMode(1);			  
		    }
			break;
	}
}