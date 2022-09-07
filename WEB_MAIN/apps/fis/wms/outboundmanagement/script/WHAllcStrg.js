/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInList.js
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
var fix_grid01="Grd01";
//Object
var formObj = null;
var sheetObj= null;
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
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function doWork(srcName){
	switch (srcName) {
	case "SEARCHLIST":
		btnSearch();
		break;
	case "SAVE":
		btnSave();
		break;
	}
}

function btnSearch(){
	formObj.f_cmd.value = SEARCH;
	sheetObj.DoSearch("searchWHAllcStrgListGS.clt", FormQueryString(formObj,""));
}

/*
 * Validation
 */
function validateForm() {
	if (sheetObj.IsDataModified() == 0)//수정된내역이 없을경우(트랜잭션이 일어나지 않은경우)
	{
		ComShowCodeMessage("COM0323");
		return false;
	}
	// Default Radio Button 체크
	var defaultFlg_check = false;
	for(var i=sheetObj.HeaderRows() ; i<=sheetObj.LastRow() ;i++){
		if(sheetObj.GetCellValue(i, fix_grid01 + "default_flg") == "1"){
			defaultFlg_check = true;
			break;
		}
	}
	
	if (!defaultFlg_check) {
		ComShowCodeMessage("COM12113", "default strategy");
		sheetObj.SelectCell( sheetObj.HeaderRows(), fix_grid01+"default_flg");
		return false;
	}
	
	for(var i=sheetObj.HeaderRows() ; i<=sheetObj.LastRow() ;i++){
		
		if(sheetObj.GetCellValue(i,fix_grid01 + "ibflag") == "I" || sheetObj.GetCellValue(i,fix_grid01 + "ibflag") == "U")
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "strg_cd").trim() == ""){
				ComShowCodeMessage("COM0802");
				sheetObj.SelectCell( i, fix_grid01+"strg_cd");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_01").trim() == ""){
				ComShowCodeMessage("COM0803");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_01");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_01_sort").trim() == ""){
				ComShowCodeMessage("COM0804");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_01_sort");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_02").trim() == "" && sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_02_sort").trim() != "")
			{
				ComShowCodeMessage("COM0805");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_02");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_02").trim() != "" && sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_02_sort").trim() == "")
			{
				ComShowCodeMessage("COM0806");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_02_sort");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_03").trim() == "" && sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_03_sort").trim() != "")
			{
				ComShowCodeMessage("COM0807");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_03");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_03").trim() != "" && sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_03_sort").trim() == "")
			{
				ComShowCodeMessage("COM0808");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_03_sort");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_04").trim() == "" && sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_04_sort").trim() != "")
			{
				ComShowCodeMessage("COM0809");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_04");
				return false;
			}
			if(sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_04").trim() != "" && sheetObj.GetCellValue(i, fix_grid01 + "lot_pri_04_sort").trim() == "")
			{
				ComShowCodeMessage("COM0810");
				sheetObj.SelectCell( i, fix_grid01+"lot_pri_04_sort");
				return false;
			}
			var strg_cd_row = sheetObj.ColValueDup(fix_grid01+"strg_cd", false);
			if(strg_cd_row > 0)
			{
				alert("Duplicate value "+sheetObj.GetCellValue(i, fix_grid01 + "strg_cd").trim());
				sheetObj.SelectCell(strg_cd_row, fix_grid01+"strg_cd");
				return false;
			}
			
			var lot_pri_1 = sheetObj.GetCellValue(i,fix_grid01+"lot_pri_01");
			var lot_pri_2 = sheetObj.GetCellValue(i,fix_grid01+"lot_pri_02");
			var lot_pri_3 = sheetObj.GetCellValue(i,fix_grid01+"lot_pri_03");
			var lot_pri_4 = sheetObj.GetCellValue(i,fix_grid01+"lot_pri_04");
			var lot_pri_5 = sheetObj.GetCellValue(i,fix_grid01+"lot_pri_05");
			var lot_pri_rows = [lot_pri_1, lot_pri_2, lot_pri_3,lot_pri_4,lot_pri_5];
			for(var j=0;j<lot_pri_rows.length;j++){
				if(j != lot_pri_rows.length-1){
					if(lot_pri_rows[j] == lot_pri_rows[j+1] && lot_pri_rows[j].trim().length > 0 && lot_pri_rows[j+1].trim().length > 0){
						var lot_pri_value = j+1;
						ComShowCodeMessage("COM0776", i, sheetObj.GetCellText(i,fix_grid01+"lot_pri_0"+lot_pri_value));
						sheetObj.SetCellValue(i, fix_grid01 + "lot_pri_0"+lot_pri_value,"");
						sheetObj.SelectCell(i, fix_grid01 + "lot_pri_0"+lot_pri_value);
						return false;
					}
				}
			}
		}
	}
	return true;
}

function btnSave(){
	if(!validateForm()){
		return;
	}
	formObj.f_cmd.value = ADD;
	sheetObj.DoSave("saveWHAllcStrgGS.clt", FormQueryString(formObj));
}

function sheet1_OnSaveEnd(code, msg) { 
	if (sheet1.GetEtcData("mess") == 'OK') 
	{			
		showCompleteProcess();
		doWork('SEARCHLIST');
	}
} 


function btnAdd(){
	var intRows=sheetObj.LastRow()+1;
	tempRow = intRows;
    sheetObj.DataInsert(intRows);
    sheetObj.SetCellValue(intRows, fix_grid01 + "loc_space_tp_cd","N");
    sheetObj.SetCellValue(intRows, fix_grid01 + "loc_put_tp_cd","N");
}

/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
		with(sheetObj){

		      var prefix=fix_grid01;
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WHAllcStrg_HDR1'), Align:"Center"},
		                  { Text:getLabel('WHAllcStrg_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
		      //LKH::2015-11-03 WMS4.O  
		      //LKH 2016.07.21
		      var cols = [
		             {Type:"DelCheck",  Hidden:0, 	Width:60, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"del", 				KeyField:0,   UpdateEdit:0,    InsertEdit:1,	Format:"",		EditLen:10		},
		             {Type:"Radio",  	Hidden:0, 	Width:60,   Align:"Center",  	ColMerge:0,   	SaveName:prefix+"default_flg",      KeyField:0,   CalcLogic:"",    Format:"",       PointCount:1,   UpdateEdit:1,   InsertEdit:1},
		             {Type:"Text",      Hidden:0, 	Width:100, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"strg_cd", 			KeyField:1,   UpdateEdit:1,    InsertEdit:1,	Format:"",		EditLen:10		},
		             {Type:"Text",      Hidden:0,  	Width:150, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"strg_rmk",  		KeyField:0,   UpdateEdit:1,    InsertEdit:1, 	Format:"",		EditLen:100		},
		             {Type:"Combo",     Hidden:0,  	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_01",  		KeyField:1,   UpdateEdit:1,    InsertEdit:1, 	Format:""		},
		             {Type:"Combo",     Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_01_sort",  KeyField:1,   UpdateEdit:1,    InsertEdit:1, 	Format:""		},
		             {Type:"Combo",     Hidden:0,  	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_02",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo", 	Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_02_sort",  KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo", 	Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_03",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",     Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_03_sort",  KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",     Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_04",       KeyField:0,   UpdateEdit:1,    InsertEdit:1, 	Format:""		},
		             {Type:"Combo",  	Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_04_sort",  KeyField:0,   UpdateEdit:1,    InsertEdit:1,  	Format:""		},
		             {Type:"Combo", 	Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_05",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",     Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_pri_05_sort",  KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",   	Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"loc_put_tp_cd",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,	Format:""		},
		             {Type:"Combo",     Hidden:0,  	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"loc_space_tp_cd",  KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",     Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"loc_pri",   		KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",    	Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"loc_pri_sort",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Combo",     Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"use_flg",   		KeyField:0,	  UpdateEdit:1,    InsertEdit:1, 	Format:""		},
		             {Type:"Status",  	Hidden:1, 	Width:30, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"ibflag",   		KeyField:0,	  UpdateEdit:1,    InsertEdit:1,	Format:""		},
		             {Type:"Text",     	Hidden:1,  	Width:30, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"strg_sys_no",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,	Format:""		}];
			      InitColumns(cols);
			      SetSheetHeight(450);
			      initSheetCombo();
			      SetColProperty(0 ,prefix+"strg_cd" , {AcceptKeys:"E|N|[_-#]" , InputCaseSensitive:1});
			      SetColProperty(0 ,prefix+"strg_rmk" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
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

//#2324 [WMS4.0] SHIPPING STRATEGY IMPROVEMENT
//Default 를 앞으로 이동하여 sheet1.SetColProperty function column 정보 변경 (+1)
function initSheetCombo(){
	var code = "";
	var name = "";
	//cmbData_lot_pri
	code = cmbData_lot_pri.substring(0,cmbData_lot_pri.length-1);
	name = cmbData_lot_pri_nm.substring(0,cmbData_lot_pri_nm.length-1);
	sheet1.SetColProperty(4, {ComboText:name, ComboCode:code} );
	sheet1.SetColProperty(6, {ComboText:" |" +name, ComboCode:" |" +code} );
	sheet1.SetColProperty(8, {ComboText:" |" +name, ComboCode:" |" +code} );
	sheet1.SetColProperty(10, {ComboText:" |" +name, ComboCode:" |" +code} );
	sheet1.SetColProperty(12,{ComboText:" |" +name, ComboCode:" |" +code} );
	
	//cmbData_sort
	code = cmbData_sort.substring(0,cmbData_sort.length-1);
	sheet1.SetColProperty(5, {ComboText:code, ComboCode:code} );
	sheet1.SetColProperty(7, {ComboText:" |" +code, ComboCode:" |" +code} );
	sheet1.SetColProperty(9, {ComboText:" |" +code, ComboCode:" |" +code} );
	sheet1.SetColProperty(11,{ComboText:" |" +code, ComboCode:" |" +code} );
	sheet1.SetColProperty(13,{ComboText:" |" +code, ComboCode:" |" +code} );
	sheet1.SetColProperty(17,{ComboText:code, ComboCode:code} );
	
	//cmbData_put_tp_cd
	code = cmbData_put_tp_cd.substring(0,cmbData_put_tp_cd.length-1);
	name = cmbData_put_tp_cd_nm.substring(0,cmbData_put_tp_cd_nm.length-1);
	sheet1.SetColProperty(14, {ComboText:name, ComboCode:code} );
	
	//cmbData_space_tp_cd
	code = cmbData_space_tp_cd.substring(0,cmbData_space_tp_cd.length-1);
	name = cmbData_space_tp_cd_nm.substring(0,cmbData_space_tp_cd_nm.length-1);
	sheet1.SetColProperty(15, {ComboText:name, ComboCode:code} );
	
	//cmbData_loc_pri
	code = cmbData_loc_pri.substring(0,cmbData_loc_pri.length-1);
	name = cmbData_loc_pri_nm.substring(0,cmbData_loc_pri_nm.length-1);
	sheet1.SetColProperty(16, {ComboText:name, ComboCode:code} );
	
	//cmbData_use_flg_cd
	code = cmbData_use_flg_cd.substring(0,cmbData_use_flg_cd.length-1);
	name = cmbData_use_flg_cd_nm.substring(0,cmbData_use_flg_cd_nm.length-1);
	sheet1.SetColProperty(18, {ComboText:name, ComboCode:code} );
}

/**
 * Sheet OnSearchEnd Event 처리
 * @param sheetObj
 * @param ErrMsg
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg)
{
	console.log(sheetObj.GetCellValue(2, fix_grid01+"default_flg"));
	console.log(sheetObj.GetCellValue(2, fix_grid01+"use_flg"));
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, fix_grid01 + "use_flg") == "Y"){
			sheetObj.SetCellEditable(i, fix_grid01+ "default_flg",true);
		} else {
			sheetObj.SetCellEditable(i, fix_grid01+ "default_flg",false);
		}
		
		if(sheetObj.GetCellValue(i, fix_grid01 + "default_flg") == "1"){
			sheetObj.SetCellEditable(i, fix_grid01+ "use_flg",false);
		} else {
			sheetObj.SetCellEditable(i, fix_grid01+ "use_flg",true);
		}
	}
}

/**
 * Sheet OnChange Event 처리
 * @param sheetObj
 * @param Row
 * @param Col
 * @param Value
 */
function sheet1_OnChange(sheetObj, Row, Col, Value)
{
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr == fix_grid01 + "default_flg")
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, fix_grid01 + "use_flg") == "Y"){
				sheetObj.SetCellEditable(i, fix_grid01+ "default_flg",true);
			} else {
				sheetObj.SetCellEditable(i, fix_grid01+ "default_flg",false);
			}
			
			if(sheetObj.GetCellValue(i, fix_grid01 + "default_flg") == "1"){
				sheetObj.SetCellEditable(i, fix_grid01+ "use_flg",false);
			} else {
				sheetObj.SetCellEditable(i, fix_grid01+ "use_flg",true);
			}
		}
	} else if (colStr == fix_grid01 + "use_flg") {
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, fix_grid01 + "use_flg") == "Y"){
				sheetObj.SetCellEditable(i, fix_grid01+ "default_flg",true);
			} else {
				sheetObj.SetCellEditable(i, fix_grid01+ "default_flg",false);
			}
			
			if(sheetObj.GetCellValue(i, fix_grid01 + "default_flg") == "1"){
				sheetObj.SetCellEditable(i, fix_grid01+ "use_flg",false);
			} else {
				sheetObj.SetCellEditable(i, fix_grid01+ "use_flg",true);
			}
		}
	}
}