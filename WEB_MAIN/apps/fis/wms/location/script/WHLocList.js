//=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : InvMoveList.js
//*@FileTitle  : Inventory Movement & Hold & Damage Search
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/04/14
//=========================================================
var docObjects=new Array();
var sheetCnt=0;

var rtnary = new Array(2);
var callBackFunc = "";

function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++) {
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}

	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
	//var formObj = document.form;
	//if(formObj.ctrt_no.value != "" && formObj.cust_item_no.value != ""){
	//	btn_Search();
	//}
//	initControl();
	// Warehouse&Contract 세션 정보 Default 세팅
	formObj.loc_cd.value = formObj.def_wh_cd.value;
//	formObj.loc_nm.value = formObj.def_wh_nm.value;
	formObj.use_flg.value = 'Y';
}

/**
 * Combo Object를 배열로 등록
 */
function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
}

/**
 * Combo 기본 설정
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initCombo(comboObj, comboNo) {
	var i=0;
	var vTextSplit=null;
	var vCodeSplit=null;
	var formObj=document.form;

	switch(comboObj.options.id) {
		case "use_flg":
			var txt="ALL|Yes|No";
			var val="ALL|Y|N";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				//comboObj.index=1;
				comboObj.SetSelectCode("Y");
			}
			break;

		case "space_tp_cd":
			vTextSplit=space_tp_cdText.split("|");
			vCodeSplit=space_tp_cdCode.split("|");
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
			}
			break;

		case "put_tp_cd":
			vTextSplit=put_tp_cdText.split("|");
			vCodeSplit=put_tp_cdCode.split("|");
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
			}
			break;
		case "prop_cd":
			vTextSplit=prop_cdText.split("|");
			vCodeSplit=prop_cdCode.split("|");
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
			}
			//formObj.svcterm_fr_cd.Enable = false;
			break;
	}
}

function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	// OnChange 이벤트
	axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
	// OnKeyUp 이벤트
	//axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
	//- 포커스 나갈때
	axon_event.addListenerForm('beforedeactivate',  'form_deactivate', formObject);
	axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}

//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	var sheetObject1=docObjects[0];   //t1sheet1
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST":
				btn_Search();
				break;

			case "EXCEL":
					btn_Excel_Dl();
					break;

			//#2138 WMS4.0 AIF FEEDBACK WMS PC 버젼 개선사항 (S)
			case "PRINT":
				btn_Print();
				break;
			//#2138 WMS4.0 AIF FEEDBACK WMS PC 버젼 개선사항 (S)
		} // end switch
	} catch(e) {
		if(e == "[object Error]"){
			//Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			//System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with(sheetObj){

				var HeadTitle1="|SEQ|W/H Code||System Code|Location|Zone|Block|Line|Row|Floor|Space Type|Put Type|Loc Prop|Loc Seq|ABC|Max CBM|Max Weight|Width|Length|Height|Active|Remark";
////			var headCount=ComCountHeadTitle(HeadTitle1);
//				(headCount, 0, 0, true);

				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:HeadTitle1, Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [
					  {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"sel_chk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 }
					, {Type:"Seq",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"wh_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"wh_loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"zone_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"block_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_line",     KeyField:0,   CalcLogic:"",   Format:"", 			PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_row",      KeyField:0,   CalcLogic:"",   Format:"",			PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_floor",    KeyField:0,   CalcLogic:"",   Format:"", 			PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"space_tp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"put_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"prop_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"abc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Float",     Hidden:0,  Width:160,  Align:"Right",   ColMerge:1,   SaveName:"max_cbm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Float",     Hidden:0,  Width:160,  Align:"Right",   ColMerge:1,   SaveName:"max_kgs",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"width",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"length",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"height",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
					, {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"rmk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 }
				];

				InitColumns(cols);
				SetSheetHeight(450);
				SetHeaderRowHeight(30);
				SetAutoRowHeight(0);
				resizeSheet();
				SetEditable(1);
			}
			break;

	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	var rowcnt=sheetObj.RowCount();
	for (var i=1; i <= rowcnt + 1; i++) {
		sheetObj.SetCellFontColor(i, "loc_cd","#0000FF");
		//sheetObj.CellFont("FontBold", i, "so_no") = true;
	}
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	var colName=sheetObj.ColSaveName(Col);
	if (colName == "loc_cd") {
		//alert(sheetObj.cellValue(Row,"wh_loc_cd"));
		//alert(sheetObj.cellValue(Row,"wh_loc_nm"));
		var paramStr="./WHLocMgmt.clt?loc_cd="+sheetObj.GetCellValue(Row,"loc_cd")+"&loc_nm="+sheetObj.GetCellValue(Row,"loc_nm");
		parent.mkNewFrame('Location Management', paramStr, "WHLocMgmt_" + sheetObj.GetCellValue(Row,"loc_cd") + "_" + sheetObj.GetCellValue(Row,"loc_nm"));
	}
}

function btn_Search() {
	formObj = document.form;
	if(formObj.loc_cd.value == "") {
		ComShowCodeMessage("COM12233");
		return;
	}
	var formObj=document.form;

	docObjects[0].RemoveAll();
	formObj.f_cmd.value=SEARCH;
	docObjects[0].DoSearch("./WHLocListGS.clt", FormQueryString(formObj, ""));
}

function btn_Excel_Dl()
{
	if(docObjects[0].RowCount() < 1){//no data
		ComShowCodeMessage("COM132501");
	} else {
		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	}
}

/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
			case 'Search':
				if(ComIsEmpty(formObj.loc_cd)) {
					ComShowCodeMessage("COM0114","Warehouse");
					$("#loc_cd").focus();
					return false;
				}
				break;
		}
	}
	return true;
}

function getLocInfo(obj) {
	var formObj=document.form;
	if(obj.value == "") {
		form.loc_cd.value="";
		form.loc_nm.value="";
	} else {
		ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.loc_cd.value+'&type=WH', './GateServlet.gsl');
	}
}

function resultLocNm(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;

	if(doc[0]=='OK') {
		if(typeof(doc[1]) != 'undefined') {
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "") {
				formObj.loc_nm.value=rtnArr[0];
			} else {
				formObj.loc_cd.value="";
				formObj.loc_nm.value="";
			}
		} else {
			formObj.loc_cd.value="";
			formObj.loc_nm.value="";
		}
	}

	if(formObj.loc_cd.value != "") {
		btn_Search();
	}
}

//#2138 WMS4.0 AIF FEEDBACK WMS PC 버젼 개선사항 (S)
function btn_Print() {
	var formObj = document.form;
	formObj.file_name.value='warehouse_location_barcode.mrd';
	formObj.title.value='WAREHOUSE LOCATION';

	//Parameter Setting
	var sheetObj = docObjects[0];
	var wh_loc_cd = '';
	for(var i=1; i<sheetObj.RowCount()+1; i++) {
		if(sheetObj.GetCellValue(i, "sel_chk") == "1") {
			wh_loc_cd += sheetObj.GetCellValue(i, "wh_loc_nm") + '|';
		}
	}
	if(wh_loc_cd.length == 0) {
		alert("Please select checkbox for print of 'W/H Code'");
		return false;
	}

	var param = '';
	param += '[' + wh_loc_cd.substring(0, wh_loc_cd.length -1) + ']';	// [1] warehouse location code

	formObj.rd_param.value = param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
}
//#2138 WMS4.0 AIF FEEDBACK WMS PC 버젼 개선사항 (E)