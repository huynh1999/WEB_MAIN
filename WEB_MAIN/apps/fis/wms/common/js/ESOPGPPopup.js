/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ESOPGPPopup.js
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/18
=========================================================*/

var docObjects=new Array();
var rtnary=new Array(1);
var sheetCnt=0;
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	
	if(formObj.in_ctrt_no.value != ""){
		btn_Search();
	}
}

function doWork(srcName){
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
	
		case "ADD":
			row_add();
			break;
		case "DELETE":   
			row_del();
			break;
		case "btn_ok":
			btn_Ok();
			break;
		case "CLOSE":   
			btn_Close();
			break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			alert(e);
		}
	}
}

function btn_Search(){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	var params = '?in_ctrt_no='+formObj.in_ctrt_no.value+
					'&last_ver='+formObj.last_ver.value+
					'&sop_ver='+formObj.sop_ver.value+
					'&' + FormQueryString(formObj);
	docObjects[0].DoSearch('./ESOPGPPopupGS.clt', params);
}
function btn_Save() {
	var formObj=document.form;
	var sheetObj=sheet1;
	var procFlg=true;
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.cellValue(i, "Grd08req_svc_cd") != ""){
			if(sheetObj.cellValue(i, "Grd08ibflag") != "D"){
				if( sheetObj.GetCellValue(i, "Grd08chkpt_desc") == ""){
					ComShowCodeMessage("COM0005", "Checkpoint");
					procFlg=false;
				}
			}
		}
	}
	if(procFlg){
		if(ComShowCodeConfirm("COM0063")){
			var sParam=FormQueryString(formObj, "Grd00");
			sParam += "&" + ComGetSaveString(docObjects[0],  true, true);
			var saveXml=docObjects[0].GetSaveData("modifyESOPGPInfo.do", sParam);
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
				ComShowCodeMessage("COM0093", "");
			}
			btn_Search();
		}
	}
}
function btn_Ok(){
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	var prsheetObj=opener.sheet9;
	var sheetObj=sheet1;
	var findcheck = sheetObj.FindCheckedRow("Grd08check",1);
	if(findcheck == ""){
		ComShowMessage("No data to select!");
	}else{
		prsheetObj.RemoveAll();
		prefix="Grd08";
		for(var i=1; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "Grd08ibflag") != "D"){
				var selRows=prsheetObj.GetSelectRow();
				var intRows=prsheetObj.DataInsert();
				prsheetObj.SetCellValue(intRows, prefix+"req_svc_cd",sheetObj.GetCellValue(i, prefix+"req_svc_cd"));
				prsheetObj.SetCellValue(intRows, prefix+"req_svc_seq",sheetObj.GetCellValue(i, prefix+"req_svc_seq"));
				prsheetObj.SetCellValue(intRows, prefix+"chkpt_desc",sheetObj.GetCellValue(i, prefix+"chkpt_desc"));
				prsheetObj.SetCellValue(intRows, prefix+"proc_rmk",sheetObj.GetCellValue(i, prefix+"proc_rmk"));
				prsheetObj.SetCellValue(intRows, prefix+"ctrt_no",sheetObj.GetCellValue(i, prefix+"ctrt_no"));
				prsheetObj.SetCellValue(intRows, prefix+"gnrl_seq",sheetObj.GetCellValue(i, prefix+"gnrl_seq"));
				prsheetObj.SetCellValue(intRows, prefix+"ibflag",sheetObj.GetCellValue(i, prefix+"ibflag"));
			}
		}
		//comPopupOK();
	  ComClosePopup(rtnData()); 
	}
}

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
        with(sheetObj){
			                        
		var prefix="Grd08";

		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		var headers = [ { Text:getLabel('ESOPGPPopup_HDR1'), Align:"Center"} ];
		InitHeaders(headers, info);

		var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"check",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		{Type:"Combo",     Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"req_svc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		{Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"req_svc_seq", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		{Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"chkpt_desc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 },
		{Type:"PopupEdit", Hidden:0, Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"proc_rmk",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2000 },
		{Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		{Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"gnrl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		{Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			                   
		InitColumns(cols);

		SetEditable(1);
		SetSheetHeight(420);
		SetEditEnterBehavior("newline");
		SetColProperty("Grd08req_svc_cd", {ComboText:GRP_NM, ComboCode:GRP_CD} );
		}
		break;

	}
}
function sheet1_OnPopupClick(sheetObj, row, col){
	var sheetObj=sheet1;
	if (sheetObj.ColSaveName(col) == "Grd08chkpt_desc"){
		var sUrl = "CheckpointPopup.clt?req_svc_cd="+sheetObj.CellValue(row, "Grd08req_svc_cd");
		   
		callBackFunc = "setGrd08CheckpointInfo";
		modal_center_open(sUrl, callBackFunc, 650,500,"yes");
	}  
	if (sheetObj.ColSaveName(col) == "Grd08proc_rmk"){
		ComShowMemoPad2(sheetObj, row, col, true, 600, 100, 4000, 4);         		
	} 
}

function sheet1_OnChange(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	checkBoxOnOff(sheetObj, colStr);
}

function setGrd08CheckpointInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	/*sheetObj.SetCellValue(row, "Grd08chkpt_desc",aryPopupData[0][0],0);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd08chkpt_desc", rtnValAry[0], 0);
	   }
}

function setUserInfo(aryPopupData, row, col, sheetIdx){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	sheetObj.SetCellValue(row, "Grd24pic_id",aryPopupData[0][1],0);
	sheetObj.SetCellValue(row, "Grd24pic_nm",aryPopupData[0][2],0);
	sheetObj.SetCellValue(row, "Grd24pic_tel",aryPopupData[0][3],0);
	sheetObj.SetCellValue(row, "Grd24pic_fax",aryPopupData[0][4],0);
	sheetObj.SetCellValue(row, "Grd24pic_email",aryPopupData[0][6],0);
	//sheetObj.CellValue2(row, "Grd24partn_cd") 	= aryPopupData[0][7];
}
function row_add() {
	var formObj=document.form;
	var sheetObj=sheet1;		
	if(sheetObj.GetCellValue(sheetObj.LastRow(), "Grd08req_svc_cd") == ""){
		sheetObj.RemoveAll();
    }
	var selRows=sheetObj.GetSelectRow();
	var intRows=sheetObj.DataInsert();
	if(intRows > 1){
		sheetObj.SetCellValue(intRows, "Grd08req_svc_cd",sheetObj.GetCellValue(selRows, "Grd08req_svc_cd"));
		sheetObj.SetCellValue(intRows, "Grd08ctrt_no",formObj.in_ctrt_no.value);
	}
	if(sheetObj.GetCellValue(intRows, "Grd08req_svc_cd")==""){
		sheetObj.SetCellValue(intRows, "Grd08req_svc_cd","01");
	}
}
function row_del(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var findcheck = sheetObj.FindCheckedRow("Grd08check",1);
	if(findcheck == ""){
		ComShowMessage("No data to delete!");
	}else{
		if(sheetObj.RowCount()> 0){
			//ComRowHideDelete(sheetObj, "Grd08check");
			findcheck = findcheck.split('|').reverse();
			for(var i = 0; i<findcheck.length; i++){
				sheetObj.RowDelete(findcheck[i]);
			}
		}
		sheetObj.CheckAll("Grd08check",0);
	}
}
function btn_Close() {
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	
	comPopupOK();
	ComClosePopup(rtnData()); 
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
		}
	}else sheetObj.SetHeaderCheck(0,colName, 0);
}

function rtnData(){
	 var rtnVal="";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "req_svc_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "req_svc_seq");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "chkpt_desc");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "proc_rmk");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ctrt_no");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "gnrl_seq");
	 return rtnVal;
}
