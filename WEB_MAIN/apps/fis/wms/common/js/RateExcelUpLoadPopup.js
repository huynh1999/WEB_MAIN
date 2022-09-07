var docObjects=new Array();
var sheetCnt=0;
var ok_check="N";
var opener=window.dialogArguments;
function loadPage() {
	var i=0;
	for(i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	initControl();
	sheet_main_hidden('S','S');
}
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
//	      var headCount=ComCountHeadTitle(hdr1);
//	      (headCount, 0, 0, false);
	      var prefix="Grd01";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [  { Text:getLabel('RateExcelUpLoadPopup_HDR1'), Align:"Center"},
		                   { Text:getLabel('RateExcelUpLoadPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_cd" },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rate_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_mode",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"por",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pol",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pod",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"svcterm_fr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"svcterm_to_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"departure_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"arrival_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"origin_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"origin_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"dest_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"dest_loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"loc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"commodity_desc", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"co_loader_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"carrier_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Int",       Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"priority",       KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sc_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"bullet_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"named_acct_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_fr_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_to_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(150);
	      SetEditable(0);
	      SetColProperty(prefix+"frt_mode", {ComboText:ftr_modText, ComboCode:ftr_modCode} );
//	      SetColProperty(prefix+"frt_mode", {ComboText:"|SEA|AIR|DOMESTIC", ComboCode:"|S|A|D"} );
	      SetColProperty(prefix+"svcterm_fr_cd", {ComboText:"|CY|CFS|DOOR", ComboCode:"|CY|CFS|DOOR"} );
	      SetColProperty(prefix+"svcterm_to_cd", {ComboText:"|CY|CFS|DOOR", ComboCode:"|CY|CFS|DOOR"} );
	      SetColProperty(prefix+"named_acct_flg", {ComboText:"|Y|N", ComboCode:"|Y|N"} );
			}
			break;	
		case 2:      //IBSheet1 init
		    with(sheetObj){
	       
//	      var hdr1='|ctrt_no|sb_cls_cd|Rate No|Rate Seq|Office|Provider|Freight|Freight|Unit|Currency|Rate|Remark';
//	      var headCount=ComCountHeadTitle(hdr1);
//	      (headCount, 0, 0, true);
	      var prefix="Grd02";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('RateExcelUpLoadPopup_HDR3'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_cd" },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rate_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rmk",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(150);
	      SetEditable(0);
	      

			}
			break;			
		case 3:      //IBSheet1 init
		    with(sheetObj){
	        
//	      var headCount=ComCountHeadTitle(hdr1);
//	      (headCount, 0, 0, false);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('RateExcelUpLoadPopup_HDR4'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"1",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"2",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"3",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"4",   KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"6",   KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"7",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"8",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"9",   KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"10",  KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"11",  KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"12",  KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"13",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"14",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"15",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"16",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"17",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"18",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"19",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"20",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"21",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"22",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"23",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"24",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"25",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"26",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"27",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"28",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"29",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"30",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"31",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"32",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"33",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"34",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"35",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"36",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"37",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"38",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"39",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"40",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(200);
	      SetEditable(0);
	      

			}
			break;	
	}
}
function btn_OK() {
	var formObj=document.form;
//	if (validateForm(docObjects[0],formObj,'OK')) {
	if (ComShowCodeConfirm("COM0036")){		
		formObj.f_cmd.value = MODIFY;
		var sParm = FormQueryString(formObj, "Grd00");	
		sParm=sParm + "&" + ComGetSaveString(docObjects[0], true, true);
		sParm=sParm + "&" + ComGetSaveString(docObjects[1], true, true);
 		var saveXml=docObjects[0].GetSaveData("./saveRateExcelUpLoad.clt", sParm);
 		docObjects[0].LoadSaveData(saveXml);
		if( saveXml.indexOf('<ERROR>') == -1){
			ComClosePopup(); 
			opener.btn_Search();
		}
	}
//	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
			case "file_path" :
//				var fileLocation = docObjects[2].OpenFileDialog("", "", "","*.xls|*.xls|*.*|*.*" );
				docObjects[0].RemoveAll();
				docObjects[1].RemoveAll();
				docObjects[2].RemoveAll();
				ok_check="N";
				//ComEnableButton("btn_OK", true, 1);
 				//docObjects[2].LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"3",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
				docObjects[2].LoadExcel({ Mode:"HeaderSkip", StartRow: "2"});
				break;
			case "frt_mode":
				sheet_main_hidden(ComGetObjValue(formObj.rate_type),ComGetObjValue(formObj.frt_mode));
				break;
			case "btn_OK":
				btn_OK();
				break;
			case "CLOSE":
				btn_Close();
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

function btn_Close() {
	ComClosePopup(); 
}

function sheet3_OnLoadExcel(result) {
	var formObj=document.form;
	if ( ComGetObjValue(formObj.rate_type)== "S" ){
		if ( ComGetObjValue(formObj.frt_mode) == "S" ){
			copy_Sell_Sea();
		} else if ( ComGetObjValue(formObj.frt_mode) == "A" ){
			copy_Sell_Air();
		} else if ( ComGetObjValue(formObj.frt_mode) == "D" ){
			copy_Sell_Domestic();
		}					
	} else if ( ComGetObjValue(formObj.rate_type) == "B" ){
		if ( ComGetObjValue(formObj.frt_mode) == "S" ){
			copy_Buy_Sea();
		} else if ( ComGetObjValue(formObj.frt_mode) == "A" ){
			copy_Buy_Air();
		} else if ( ComGetObjValue(formObj.frt_mode) == "D" ){
			copy_Buy_Domestic();
		}		
	}
	if ( ok_check == "Y" ){
		ComEnableButton("btn_OK", false, 1);
		ComShowCodeMessage("COM0292");
	}
}
function copy_Sell_Sea(){
	var formObj=document.form;
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var sheet_excel=docObjects[2];
	var row_main=0;
	var row_detail=0;	
	var prefix="Grd01";
	for(var i=1;i<sheet_excel.RowCount()+1;i++){
		if ( i == 1){
			row_main=sheet_main.DataInsert(-1);
			sheet_main.SetCellValue(row_main, prefix+"ctrt_no", formObj.ctrt_no.value, 0);
			sheet_main.SetCellValue(row_main,prefix+"sb_cls_cd","S", 0);
			sheet_main.SetCellValue(row_main,prefix+"frt_mode","S", 0);
			sheet_main.SetCellValue(row_main,prefix+"por",sheet_excel.GetCellValue(i,0), 0);
			sheet_main.SetCellValue(row_main,prefix+"pol",sheet_excel.GetCellValue(i,1), 0);
			sheet_main.SetCellValue(row_main,prefix+"pod",sheet_excel.GetCellValue(i,2), 0);
			sheet_main.SetCellValue(row_main,prefix+"del",sheet_excel.GetCellValue(i,3), 0);
			sheet_main.SetCellValue(row_main,prefix+"svcterm_fr_cd",sheet_excel.GetCellValue(i,4), 0);
			sheet_main.SetCellValue(row_main,prefix+"svcterm_to_cd",sheet_excel.GetCellValue(i,5), 0);
			sheet_main.SetCellValue(row_main,prefix+"commodity_desc",sheet_excel.GetCellValue(i,6), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_fr_dt",sheet_excel.GetCellText(i,7), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_to_dt",sheet_excel.GetCellText(i,8), 0);
		}
		if(sheet_excel.GetCellValue(i,9) != ""){
			row_detail=sheet_detail.DataInsert(-1);
			sheet_detail.SetCellValue(row_detail,"Grd02ctrt_no",formObj.ctrt_no.value, 0);
			sheet_detail.SetCellValue(row_detail,"Grd02sb_cls_cd","S", 0);
			sheet_detail.SetCellValue(row_detail,"Grd02ofc_cd",sheet_excel.GetCellValue(i,9), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02cust_cd",sheet_excel.GetCellValue(i,10), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_cd",sheet_excel.GetCellValue(i,11), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_nm",sheet_excel.GetCellValue(i,12), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_cd",sheet_excel.GetCellValue(i,13), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02curr_cd",sheet_excel.GetCellValue(i,14), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_price",sheet_excel.GetCellValue(i,15), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02rmk",sheet_excel.GetCellValue(i,16), 0);
		}
	}
}
function copy_Sell_Air(){
	var formObj=document.form;
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var sheet_excel=docObjects[2];
	var row_main=0;
	var row_detail=0;	
	var prefix="Grd01";
	for(var i=1;i<sheet_excel.RowCount()+1;i++){
		if ( i == 1){
			row_main=sheet_main.DataInsert(-1);
			sheet_main.SetCellValue(row_main,prefix+"ctrt_no",formObj.ctrt_no.value, 0);
			sheet_main.SetCellValue(row_main,prefix+"sb_cls_cd","S", 0);
			sheet_main.SetCellValue(row_main,prefix+"frt_mode","A", 0);
			sheet_main.SetCellValue(row_main,prefix+"departure_cd",sheet_excel.GetCellValue(i,0), 0);
			sheet_main.SetCellValue(row_main,prefix+"arrival_cd",sheet_excel.GetCellValue(i,1), 0);
			sheet_main.SetCellValue(row_main,"Grd01commodity_desc",sheet_excel.GetCellValue(i,2), 0);
			sheet_main.SetCellValue(row_main,"Grd01eff_fr_dt",sheet_excel.GetCellValue(i,3), 0);
			sheet_main.SetCellValue(row_main,"Grd01eff_to_dt",sheet_excel.GetCellValue(i,4), 0);
		}
		if(sheet_excel.GetCellValue(i,5) != ""){
			row_detail=sheet_detail.DataInsert(-1);
			sheet_detail.SetCellValue(row_detail,"Grd02ctrt_no",formObj.ctrt_no.value, 0);
			sheet_detail.SetCellValue(row_detail,"Grd02sb_cls_cd","S", 0);
			sheet_detail.SetCellValue(row_detail,"Grd02ofc_cd",sheet_excel.GetCellValue(i,5), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02cust_cd",sheet_excel.GetCellValue(i,6), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_cd",sheet_excel.GetCellValue(i,7), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_nm",sheet_excel.GetCellValue(i,8), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_cd",sheet_excel.GetCellValue(i,9), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02curr_cd",sheet_excel.GetCellValue(i,10), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_price",sheet_excel.GetCellValue(i,11), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02rmk",sheet_excel.GetCellValue(i,12), 0);
		}
	}
}
function copy_Sell_Domestic(){
	var formObj=document.form;
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var sheet_excel=docObjects[2];
	var row_main=0;
	var row_detail=0;	
	var prefix="Grd01";
	for(var i=1;i<sheet_excel.RowCount()+1;i++){
		if ( i == 1){
			row_main=sheet_main.DataInsert(-1);
			sheet_main.SetCellValue(row_main,prefix+"ctrt_no",formObj.ctrt_no.value, 0);
			sheet_main.SetCellValue(row_main,prefix+"sb_cls_cd","S", 0);
			sheet_main.SetCellValue(row_main,prefix+"frt_mode","D", 0);
			sheet_main.SetCellValue(row_main,prefix+"origin_loc_cd",sheet_excel.GetCellValue(i,0), 0);
			sheet_main.SetCellValue(row_main,prefix+"origin_loc_nm",sheet_excel.GetCellValue(i,1), 0);
			sheet_main.SetCellValue(row_main,prefix+"dest_loc_cd",sheet_excel.GetCellValue(i,2), 0);
			sheet_main.SetCellValue(row_main,prefix+"dest_loc_nm",sheet_excel.GetCellValue(i,3), 0);
			sheet_main.SetCellValue(row_main,prefix+"loc_cd",sheet_excel.GetCellValue(i,4), 0);
			sheet_main.SetCellValue(row_main,prefix+"loc_nm",sheet_excel.GetCellValue(i,5), 0);
			sheet_main.SetCellValue(row_main,prefix+"commodity_desc",sheet_excel.GetCellValue(i,6), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_fr_dt",sheet_excel.GetCellValue(i,7), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_to_dt",sheet_excel.GetCellValue(i,8), 0);
		}
		if(sheet_excel.GetCellValue(i,9) != ""){
			row_detail=sheet_detail.DataInsert(-1);
			sheet_detail.SetCellValue(row_detail,"Grd02ctrt_no",formObj.ctrt_no.value, 0);
			sheet_detail.SetCellValue(row_detail,"Grd02sb_cls_cd","S", 0);
			sheet_detail.SetCellValue(row_detail,"Grd02ofc_cd",sheet_excel.GetCellValue(i,9), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02cust_cd",sheet_excel.GetCellValue(i,10), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_cd",sheet_excel.GetCellValue(i,11), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_nm",sheet_excel.GetCellValue(i,12), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_cd",sheet_excel.GetCellValue(i,13), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02curr_cd",sheet_excel.GetCellValue(i,14), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_price",sheet_excel.GetCellValue(i,15), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02rmk",sheet_excel.GetCellValue(i,16), 0);
		}
	}
}
function copy_Buy_Sea(){
	var formObj=document.form;
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var sheet_excel=docObjects[2];
	var row_main=0;
	var row_detail=0;	
	var prefix="Grd01";
	for(var i=1;i<sheet_excel.RowCount()+1;i++){
		if ( i == 1){
			row_main=sheet_main.DataInsert(-1);
			sheet_main.SetCellValue(row_main,prefix+"ctrt_no",formObj.ctrt_no.value, 0);
			sheet_main.SetCellValue(row_main,prefix+"sb_cls_cd","B", 0);
			sheet_main.SetCellValue(row_main,prefix+"frt_mode","S", 0);
			sheet_main.SetCellValue(row_main,prefix+"por",sheet_excel.GetCellValue(i,0), 0);
			sheet_main.SetCellValue(row_main,prefix+"pol",sheet_excel.GetCellValue(i,1), 0);
			sheet_main.SetCellValue(row_main,prefix+"pod",sheet_excel.GetCellValue(i,2), 0);
			sheet_main.SetCellValue(row_main,prefix+"del",sheet_excel.GetCellValue(i,3), 0);
			sheet_main.SetCellValue(row_main,prefix+"svcterm_fr_cd",sheet_excel.GetCellValue(i,4), 0);
			sheet_main.SetCellValue(row_main,prefix+"svcterm_to_cd",sheet_excel.GetCellValue(i,5), 0);
			sheet_main.SetCellValue(row_main,prefix+"commodity_desc",sheet_excel.GetCellValue(i,6), 0);
			sheet_main.SetCellValue(row_main,prefix+"co_loader_cd",sheet_excel.GetCellValue(i,7), 0);
			sheet_main.SetCellValue(row_main,prefix+"carrier_cd",sheet_excel.GetCellValue(i,8), 0);
			sheet_main.SetCellValue(row_main,prefix+"priority",sheet_excel.GetCellValue(i,9), 0);
			sheet_main.SetCellValue(row_main,prefix+"sc_no",sheet_excel.GetCellValue(i,10), 0);
			sheet_main.SetCellValue(row_main,prefix+"bullet_no",sheet_excel.GetCellValue(i,11), 0);
			sheet_main.SetCellValue(row_main,prefix+"named_acct_flg",sheet_excel.GetCellValue(i,12), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_fr_dt",sheet_excel.GetCellValue(i,13), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_to_dt",sheet_excel.GetCellValue(i,14), 0);
		}
		if(sheet_excel.GetCellValue(i,15) != ""){
			row_detail=sheet_detail.DataInsert(-1);
			sheet_detail.SetCellValue(row_detail,"Grd02ctrt_no",formObj.ctrt_no.value, 0);
			sheet_detail.SetCellValue(row_detail,"Grd02sb_cls_cd","B", 0);
			sheet_detail.SetCellValue(row_detail,"Grd02ofc_cd",sheet_excel.GetCellValue(i,15), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02cust_cd",sheet_excel.GetCellValue(i,16), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_cd",sheet_excel.GetCellValue(i,17), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_nm",sheet_excel.GetCellValue(i,18), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_cd",sheet_excel.GetCellValue(i,19), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02curr_cd",sheet_excel.GetCellValue(i,20), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_price",sheet_excel.GetCellValue(i,21), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02rmk",sheet_excel.GetCellValue(i,22), 0);
		}
	}
}
function copy_Buy_Air(){
	var formObj=document.form;
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var sheet_excel=docObjects[2];
	var row_main=0;
	var row_detail=0;	
	var prefix="Grd01";
	for(var i=1;i<sheet_excel.RowCount()+1;i++){
		if ( i == 1){
			row_main=sheet_main.DataInsert(-1);
			sheet_main.SetCellValue(row_main,prefix+"ctrt_no",formObj.ctrt_no.value, 0);
			sheet_main.SetCellValue(row_main,prefix+"sb_cls_cd","B", 0);
			sheet_main.SetCellValue(row_main,prefix+"frt_mode","A", 0);
			sheet_main.SetCellValue(row_main,prefix+"departure_cd",sheet_excel.GetCellValue(i,0), 0);
			sheet_main.SetCellValue(row_main,prefix+"arrival_cd",sheet_excel.GetCellValue(i,1), 0);
			sheet_main.SetCellValue(row_main,prefix+"commodity_desc",sheet_excel.GetCellValue(i,2), 0);
			sheet_main.SetCellValue(row_main,prefix+"co_loader_cd",sheet_excel.GetCellValue(i,3), 0);
			sheet_main.SetCellValue(row_main,prefix+"carrier_cd",sheet_excel.GetCellValue(i,4), 0);
			sheet_main.SetCellValue(row_main,prefix+"priority",sheet_excel.GetCellValue(i,5), 0);
			sheet_main.SetCellValue(row_main,prefix+"sc_no",sheet_excel.GetCellValue(i,6), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_fr_dt",sheet_excel.GetCellValue(i,7), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_to_dt",sheet_excel.GetCellValue(i,8), 0);
		}
		if(sheet_excel.GetCellValue(i,9) != ""){
			row_detail=sheet_detail.DataInsert(-1);
			sheet_detail.SetCellValue(row_detail,"Grd02ctrt_no",formObj.ctrt_no.value, 0);
			sheet_detail.SetCellValue(row_detail,"Grd02sb_cls_cd","B", 0);
			sheet_detail.SetCellValue(row_detail,"Grd02ofc_cd",sheet_excel.GetCellValue(i,9), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02cust_cd",sheet_excel.GetCellValue(i,10), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_cd",sheet_excel.GetCellValue(i,11), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_nm",sheet_excel.GetCellValue(i,12), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_cd",sheet_excel.GetCellValue(i,13), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02curr_cd",sheet_excel.GetCellValue(i,14), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_price",sheet_excel.GetCellValue(i,15), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02rmk",sheet_excel.GetCellValue(i,16), 0);
		}
	}
}
function copy_Buy_Domestic(){
	var formObj=document.form;
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var sheet_excel=docObjects[2];
	var row_main=0;
	var row_detail=0;	
	var prefix="Grd01";
	for(var i=1;i<sheet_excel.RowCount()+1;i++){
		if ( i == 1){
			row_main=sheet_main.DataInsert(-1);
			sheet_main.SetCellValue(row_main,prefix+"ctrt_no",formObj.ctrt_no.value, 0);
			sheet_main.SetCellValue(row_main,prefix+"sb_cls_cd","B", 0);
			sheet_main.SetCellValue(row_main,prefix+"frt_mode","D", 0);
			sheet_main.SetCellValue(row_main,prefix+"origin_loc_cd",sheet_excel.GetCellValue(i,0), 0);
			sheet_main.SetCellValue(row_main,prefix+"origin_loc_nm",sheet_excel.GetCellValue(i,1), 0);
			sheet_main.SetCellValue(row_main,prefix+"dest_loc_cd",sheet_excel.GetCellValue(i,2), 0);
			sheet_main.SetCellValue(row_main,prefix+"dest_loc_nm",sheet_excel.GetCellValue(i,3), 0);
			sheet_main.SetCellValue(row_main,prefix+"loc_cd",sheet_excel.GetCellValue(i,4), 0);
			sheet_main.SetCellValue(row_main,prefix+"loc_nm",sheet_excel.GetCellValue(i,5), 0);
			sheet_main.SetCellValue(row_main,prefix+"commodity_desc",sheet_excel.GetCellValue(i,6), 0);
			sheet_main.SetCellValue(row_main,prefix+"carrier_cd",sheet_excel.GetCellValue(i,7), 0);
			sheet_main.SetCellValue(row_main,prefix+"priority",sheet_excel.GetCellValue(i,8), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_fr_dt",sheet_excel.GetCellValue(i,9), 0);
			sheet_main.SetCellValue(row_main,prefix+"eff_to_dt",sheet_excel.GetCellValue(i,10), 0);
		}
		if(sheet_excel.GetCellValue(i,11) != ""){
			row_detail=sheet_detail.DataInsert(-1);
			sheet_detail.SetCellValue(row_detail,"Grd02ctrt_no",formObj.ctrt_no.value, 0);
			sheet_detail.SetCellValue(row_detail,"Grd02sb_cls_cd","B", 0);
			sheet_detail.SetCellValue(row_detail,"Grd02ofc_cd",sheet_excel.GetCellValue(i,11), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02cust_cd",sheet_excel.GetCellValue(i,12), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_cd",sheet_excel.GetCellValue(i,13), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02frt_nm",sheet_excel.GetCellValue(i,14), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_cd",sheet_excel.GetCellValue(i,15), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02curr_cd",sheet_excel.GetCellValue(i,16), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02unit_price",sheet_excel.GetCellValue(i,17), 0);
			sheet_detail.SetCellValue(row_detail,"Grd02rmk",sheet_excel.GetCellValue(i,18), 0);
		}
	}
}
function sheet_main_hidden(rate_type, frt_mode){
	var sheet_main=docObjects[0];
	var sheet_detail=docObjects[1];
	var prefix="Grd01";
	if( rate_type == "S"){
		sheet_detail.SetCellValue(0,"Grd02cust_cd","Customer", 0);
		sheet_main.SetColHidden(prefix+"co_loader_cd",1);
		sheet_main.SetColHidden(prefix+"carrier_cd",1);
		sheet_main.SetColHidden(prefix+"priority",1);
		sheet_main.SetColHidden(prefix+"sc_no", 1);
		sheet_main.SetColHidden(prefix+"bullet_no",1);
		sheet_main.SetColHidden(prefix+"named_acct_flg",1);
	} else {
		sheet_detail.SetCellValue(0,"Grd02cust_cd","Provider", 0);
		sheet_main.SetColHidden(prefix+"co_loader_cd",0);
		sheet_main.SetColHidden(prefix+"carrier_cd",0);
		sheet_main.SetColHidden(prefix+"priority",0);
		sheet_main.SetColHidden(prefix+"sc_no",0);
		sheet_main.SetColHidden(prefix+"bullet_no",0);
		sheet_main.SetColHidden(prefix+"named_acct_flg",0);
	}
	if(frt_mode=="S"){
		sheet_main.SetColHidden(prefix+"por",0);
		sheet_main.SetColHidden(prefix+"pol",0);
		sheet_main.SetColHidden(prefix+"pod",0);
		sheet_main.SetColHidden(prefix+"del",0);
		sheet_main.SetColHidden(prefix+"svcterm_fr_cd",0);
		sheet_main.SetColHidden(prefix+"svcterm_to_cd",0);
		sheet_main.SetColHidden(prefix+"departure_cd",1);
		sheet_main.SetColHidden(prefix+"arrival_cd",1);
		sheet_main.SetColHidden(prefix+"origin_loc_cd",1);
		sheet_main.SetColHidden(prefix+"origin_loc_nm",1);
		sheet_main.SetColHidden(prefix+"dest_loc_cd",1);
		sheet_main.SetColHidden(prefix+"dest_loc_nm",1);
		sheet_main.SetColHidden(prefix+"loc_cd",1);
		sheet_main.SetColHidden(prefix+"loc_nm",1);
	} else if(frt_mode=="A"){
		sheet_main.SetColHidden(prefix+"por",1);
		sheet_main.SetColHidden(prefix+"pol",1);
		sheet_main.SetColHidden(prefix+"pod",1);
		sheet_main.SetColHidden(prefix+"del",1);
		sheet_main.SetColHidden(prefix+"svcterm_fr_cd",1);
		sheet_main.SetColHidden(prefix+"svcterm_to_cd",1);
		sheet_main.SetColHidden(prefix+"departure_cd",0);
		sheet_main.SetColHidden(prefix+"arrival_cd",0);
		sheet_main.SetColHidden(prefix+"origin_loc_cd",1);
		sheet_main.SetColHidden(prefix+"origin_loc_nm",1);
		sheet_main.SetColHidden(prefix+"dest_loc_cd",1);
		sheet_main.SetColHidden(prefix+"dest_loc_nm",1);
		sheet_main.SetColHidden(prefix+"loc_cd",1);
		sheet_main.SetColHidden(prefix+"loc_nm",1);
		if(rate_type=="B"){
			sheet_main.SetColHidden(prefix+"bullet_no",1);
			sheet_main.SetColHidden(prefix+"named_acct_flg",1);
		}
	} else if(frt_mode=="D"){
		sheet_main.SetColHidden(prefix+"por",1);
		sheet_main.SetColHidden(prefix+"pol",1);
		sheet_main.SetColHidden(prefix+"pod",1);
		sheet_main.SetColHidden(prefix+"del",1);
		sheet_main.SetColHidden(prefix+"svcterm_fr_cd",1);
		sheet_main.SetColHidden(prefix+"svcterm_to_cd",1);
		sheet_main.SetColHidden(prefix+"departure_cd",1);
		sheet_main.SetColHidden(prefix+"arrival_cd",1);
		sheet_main.SetColHidden(prefix+"origin_loc_cd",0);
		sheet_main.SetColHidden(prefix+"origin_loc_nm",0);
		sheet_main.SetColHidden(prefix+"dest_loc_cd",0);
		sheet_main.SetColHidden(prefix+"dest_loc_nm",0);
		sheet_main.SetColHidden(prefix+"loc_cd",0);
		sheet_main.SetColHidden(prefix+"loc_nm",0);
		if(rate_type=="B"){
			sheet_main.SetColHidden(prefix+"co_loader_cd",1);
			sheet_main.SetColHidden(prefix+"sc_no",1);
			sheet_main.SetColHidden(prefix+"bullet_no",1);
			sheet_main.SetColHidden(prefix+"named_acct_flg",1);
		}
	}
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'OK':
			var sheetObj=docObjects[0];;
			var prefix="Grd01";
			var i=0;
			var j=0;
//			1. 화면 validation
//		    - 필수값 체크 Msg : Please specify $VAL
//		SEA : Rate No, Freight Mode, POR, POL, POD, DEL, Service Term		 
			for(var i=2;i<sheetObj.RowCount()+2;i++){
				if (sheetObj.GetCellValue(i,prefix+"frt_mode") == "") {
					ComShowCodeMessage("COM0145","Freight Mode.");
					sheetObj.SelectCell(i,prefix+"frt_mode");
					return false;
				}
				switch (sheetObj.GetCellValue(i,prefix+"frt_mode")) {
					case 'S':
						if (sheetObj.GetCellValue(i,prefix+"por") == "") {
							ComShowCodeMessage("COM0145","POR");
							sheetObj.SelectCell(i,prefix+"por");
							return false;
						}
						if (sheetObj.GetCellValue(i,prefix+"pol") == "") {
							ComShowCodeMessage("COM0145","POL");
							sheetObj.SelectCell(i,prefix+"pol");
							return false;
						}
						if (sheetObj.GetCellValue(i,prefix+"pod") == "") {
							ComShowCodeMessage("COM0145","POD");
							sheetObj.SelectCell(i,prefix+"pod");
							return false;
						}
						if (sheetObj.GetCellValue(i,prefix+"del") == "") {
							ComShowCodeMessage("COM0145","DEL");
							sheetObj.SelectCell(i,prefix+"del");
							return false;
						}
						if (sheetObj.GetCellValue(i,prefix+"svcterm_fr_cd") == "") {
							ComShowCodeMessage("COM0145","Origin");
							sheetObj.SelectCell(i,prefix+"svcterm_fr_cd");
							return false;
						}
						if (sheetObj.GetCellValue(i,prefix+"svcterm_to_cd") == "") {
							ComShowCodeMessage("COM0145","DEL");
							sheetObj.SelectCell(i,prefix+"del");
							return false;
						}
						break;
					case 'A': //AIR : Rate No, Freight Mode,Departure,Arrival  
						if (sheetObj.GetCellValue(i,prefix+"departure_cd") == "") {
							ComShowCodeMessage("COM0145","Departure");
							sheetObj.SelectCell(i,prefix+"departure_cd");
							return false;
						}
						if (sheetObj.GetCellValue(i,prefix+"arrival_cd") == "") {
							ComShowCodeMessage("COM0145","Arrival");
							sheetObj.SelectCell(i,prefix+"arrival_cd");
							return false;
						}
						break;
					case 'D'://Domestic : Truck From,Truck To 혹은 Warehouse 
						if (sheetObj.GetCellValue(i,prefix+"origin_loc_cd") == "" && sheetObj.GetCellValue(i,prefix+"origin_loc_nm") == ""
						&& sheetObj.GetCellValue(i,prefix+"dest_loc_cd") == "" && sheetObj.GetCellValue(i,prefix+"dest_loc_nm") == "" ) {
						if (sheetObj.GetCellValue(i,prefix+"loc_cd") == "" && sheetObj.GetCellValue(i,prefix+"loc_nm") == ""){
								ComShowCodeMessage("COM0145","Warehouse");
								sheetObj.SelectCell(i,prefix+"loc_cd");
								return false;
							}
						} else {
							if (sheetObj.GetCellValue(i,prefix+"origin_loc_cd") == "" && sheetObj.GetCellValue(i,prefix+"origin_loc_nm") == ""){
								ComShowCodeMessage("COM0145","Truck From");
								sheetObj.SelectCell(i,prefix+"origin_loc_cd");
								return false;
							}
							if (sheetObj.GetCellValue(i,prefix+"dest_loc_cd") == "" && sheetObj.GetCellValue(i,prefix+"dest_loc_nm") == ""){
								ComShowCodeMessage("COM0145","Truck To");
								sheetObj.SelectCell(i,prefix+"dest_loc_cd");
								return false;
							}
						}
						break;		
				}
			}
			sheetObj=docObjects[1];
			prefix="Grd02";
			for(i=1;i<sheetObj.RowCount()+1;i++){
//		    	- 필수값 체크 Msg : Please specify $VAL
//								Remark 제외 모두.
				if (sheetObj.GetCellValue(i,prefix+"ofc_cd") == "") {
					ComShowCodeMessage("COM0145","Office");
					sheetObj.SelectCell(i,prefix+"ofc_cd");
					return false;
				}
				if (sheetObj.GetCellValue(i,prefix+"cust_cd") == "") {
					ComShowCodeMessage("COM0145","Customer");
					sheetObj.SelectCell(i,prefix+"cust_cd");
					return false;
				}
				if (sheetObj.GetCellValue(i,prefix+"frt_cd") == "") {
					ComShowCodeMessage("COM0145","Freight");
					sheetObj.SelectCell(i,prefix+"frt_cd");
					return false;
				}
				if (sheetObj.GetCellValue(i,prefix+"unit_cd") == "") {
					ComShowCodeMessage("COM0145","Unit");
					sheetObj.SelectCell(i,prefix+"unit_cd");
					return false;
				}
				if (sheetObj.GetCellValue(i,prefix+"curr_cd") == "") {
					ComShowCodeMessage("COM0145","Currency");
					sheetObj.SelectCell(i,prefix+"curr_cd");
					return false;
				}
				if (sheetObj.GetCellValue(i,prefix+"unit_price") == 0) {
					ComShowCodeMessage("COM0145","Rate");
					sheetObj.SelectCell(i,prefix+"unit_price");
					return false;
				}
	//		    - 중복체크 : GRID의 중복체크 
	//		      Rate No,Office,Customer, Freight   
				for(j=i+1;j<sheetObj.RowCount()+1;j++){
					if (sheetObj.GetCellValue(i,prefix+"ofc_cd") == sheetObj.GetCellValue(j,prefix+"ofc_cd")
							&& sheetObj.GetCellValue(i,prefix+"cust_cd") == sheetObj.GetCellValue(j,prefix+"cust_cd")
							&& sheetObj.GetCellValue(i,prefix+"frt_cd") == sheetObj.GetCellValue(j,prefix+"frt_cd")
							&& sheetObj.GetCellValue(i,prefix+"unit_cd") == sheetObj.GetCellValue(j,prefix+"unit_cd")) {
						ComShowCodeMessage("COM0160",i,j+" (Office : "+sheetObj.GetCellValue(i,prefix+"ofc_cd")+", Customer : "+sheetObj.GetCellValue(i,prefix+"cust_cd")+", Freight : "+sheetObj.GetCellValue(i,prefix+"frt_cd")+", Unit : "+sheetObj.GetCellValue(i,prefix+"unit_cd")+")");
						sheetObj.SelectCell(j,prefix+"ofc_cd");
						return false;
					}
				}
			}
			break;
		}
	}
	return true;
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var prefix="Grd01";
	var sXml="";
	var sParm="";
	var srcName=sheetObj.ColSaveName(Col);
	switch (srcName) {
		case prefix+"por":
		case prefix+"pol":
		case prefix+"pod":
		case prefix+"del":
		case prefix+"departure_cd":
		case prefix+"arrival_cd":
		case prefix+"origin_loc_cd":
		case prefix+"dest_loc_cd":
			if(!ComIsNull(Value)){
//				sParm="f_cmd="+SEARCH01+"&grp_cd="+sheetObj.GetCellValue(Row,prefix+"frt_mode")+"&code_cd="+Value;
// 				sXml=sheetObj.GetSearchData("./searchRateCode.clt", sParm);
//				if(displayData(sXml,"exception_msg") != ""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchRateCode&grp_cd=' + sheetObj.GetCellValue(Row,prefix+'frt_mode') + '&code_cd=' + Value, './GateServlet.gsl');
			}
			break;
		case prefix+"svcterm_fr_cd":
		case prefix+"svcterm_to_cd":
			if(!ComIsNull(Value)){	
				if(Value !="CY"&&Value !="CFS"&&Value !="DOOR"){
 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
					ok_check="Y";
				}
			}
			break;
		case prefix+"loc_cd":
			if(!ComIsNull(Value)){
// 				sXml=sheetObj.GetSearchData("./searchTlLocInfo.clt", "f_cmd="+ SEARCH02 + "&loc_cd="+sheetObj.GetCellValue(Row, Col)+"&type=W");
//				if(displayData(sXml,"exception_msg")!=""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+sheetObj.GetCellValue(Row, Col)+'&type=W', './GateServlet.gsl');
			}
			break;
		case prefix+"co_loader_cd":
		case prefix+"carrier_cd":
			if(!ComIsNull(Value)){	
				sParm="cust_cd="+Value+"&in_part_tp=P";
// 				sXml=sheetObj.GetSearchData("./searchTlCustInfo.clt", sParm);
//				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&'+sParm, './GateServlet.gsl');
			}
			break;
	}
}

function sheet2_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var prefix="Grd02";
	var sXml="";
	var sParm="";
	var srcName=sheetObj.ColSaveName(Col);
	switch (srcName) {
		case prefix+"ofc_cd":	
			if(!ComIsNull(Value)){	
// 				sXml=sheetObj.GetSearchData("./searchTlOrgInfo.clt", "office_cd="+Value);
//				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&loc_cd='+sheetObj.GetCellValue(Row, Col)+'&type=W', './GateServlet.gsl');
			}
			break;
		case prefix+"cust_cd":		
			if(!ComIsNull(Value)){	
//				sParm="cust_cd="+Value;
// 				sXml=sheetObj.GetSearchData("./searchTlCustInfo.clt", sParm);
//				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&loc_cd='+sheetObj.GetCellValue(Row, Col)+'&type=W', './GateServlet.gsl');
			}
			break;
		case prefix+"frt_cd":	
			if(!ComIsNull(Value)){	
//				sParm="org_cd="+formObj.org_cd.value+"&code="+Value;
// 				sXml=sheetObj.GetSearchData("./searchFrtCd.clt", sParm);
//				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchFrtCd&loc_cd='+sheetObj.GetCellValue(Row, Col)+'&type=W', './GateServlet.gsl');
			}
			break;
		case prefix+"unit_cd":		
			if(!ComIsNull(Value)){	
//				sParm="grp_cd=Z3&code_cd="+Value;
// 				sXml=sheetObj.GetSearchData("./searchCommonCodeInfo.clt", sParm);
//				if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchCommonCodeInfo&loc_cd='+sheetObj.GetCellValue(Row, Col)+'&type=W', './GateServlet.gsl');
			}
			break;
		case prefix+"curr_cd":		
			if(!ComIsNull(Value)){	
//				sParm="grp_cd=C010&code_cd="+Value;
// 				sXml=sheetObj.GetSearchData("./searchCommonCodeInfo.clt", sParm);
//				if(getXmlDataNullToNullString(sXml,'exception_msg') != ""){
// 					sheetObj.SetCellFontColor(Row,Col,"#FF0000");
//					ok_check="Y";
//				}
				ajaxSendPost(setCodeInfo, 'reqVal', '&goWhere=aj&bcKey=searchCommonCodeInfo&loc_cd='+sheetObj.GetCellValue(Row, Col)+'&type=W', './GateServlet.gsl');
			}
			break;
	}
}

function setCodeInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellFontColor(Row,Col,"#FF0000");
				ok_check="Y";
			}
		}
	}
}