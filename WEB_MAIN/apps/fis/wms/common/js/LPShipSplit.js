var docObjects=new Array();
var sheetCnt=0;
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_Apply":	
				btn_OK();
				break;
			case "CLOSE":	
				btn_Close();
				break;
			case "btn_Split":	
				btn_split();
				break;
			case "btn_Delete":	
				btn_delete();
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
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj=document.form;
	var i=0;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	initControl();	
	formObj.ttl_ea_qty.value=ComAddComma(formObj.ttl_ea_qty.value,"#,##0");
}
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	//? axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
//	      var HeadTitle1="|Item|Item Name|Item Lot|QTY|shipno|shipno_seq|consol_no";
	      var prefix="Grd11";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [{ Text:getLabel('LPShipSplit_HDR1'), Align:"Center"}];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_name",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_lot",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"qty",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"shipno",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"shipno_seq", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"consol_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(300);
	      SetEditable(1);
	      resizeSheet();
	            }
	      break;


	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function btn_split() {
	var formObj=document.form;
	var qty=0;
	var qty_new=0;
	var sp_qty=0;
	var rowcnt=0;
	var valCnt=0;
	var row=0;
	var i=0;
	var kkk=0;
	var prefix="Grd11";
	
	var form_ea_qty = ComTrimAll(formObj.ttl_ea_qty.value,',');
	var form_sp_qty = ComTrimAll(formObj.sp_qty.value,',');
	
	if(form_ea_qty == "" || form_ea_qty =='undefined' || form_ea_qty == undefined){
		form_ea_qty = 0;
	}
	
	if(form_sp_qty == "" || form_sp_qty =='undefined' || form_sp_qty == undefined){
		form_sp_qty = 0;
	}
	
//	form_ea_qty = eval(ComTrimAll(form_ea_qty,','))*1000;
//	form_sp_qty = eval(ComTrimAll(form_sp_qty,','))*1000;
	
	form_ea_qty = eval(form_ea_qty)*1000;
	form_sp_qty = eval(form_sp_qty)*1000;
	
	qty=Math.round(form_ea_qty);
	sp_qty=Math.round(form_sp_qty);
	valCnt=qty;
	if(formObj.sp_qty.value.replace(/\s/g,"") == "" && (formObj.sp_eq.checked))
	{
		ComShowCodeMessage("COM002723");
		formObj.sp_qty.focus();
		return ;
	}
	if (!ComIsNumber(sp_qty,'.')||sp_qty==0||valCnt<sp_qty){
		ComShowCodeMessage("COM0022");
		formObj.sp_qty.focus();
		return ;
	}
	if( formObj.sp_eq.checked ){
		rowcnt=Math.round(eval(valCnt/sp_qty));
		qty_new=Math.round(eval(qty*sp_qty/valCnt));
		row=rowcnt;
	} else {
		qty_new=Math.round(eval(qty*sp_qty/valCnt));
		row=2;	
	}
	for(var i=0;i<row;i++){
		var formObj=document.form;
		if ( i < row-1 ){ 
			var rowNo=docObjects[0].DataInsert(-1);
			//docObjects[0].CellValue(rowNo,prefix+'seq') = rowNo;
			docObjects[0].SetCellValue(rowNo,prefix+'item_cd',formObj.item.value);
			docObjects[0].SetCellValue(rowNo,prefix+'item_name',formObj.item_name.value);
			docObjects[0].SetCellValue(rowNo,prefix+'item_lot',formObj.item_lot.value);
			docObjects[0].SetCellValue(rowNo,prefix+'qty',qty_new/1000);
			docObjects[0].SetCellValue(rowNo,prefix+'shipno',formObj.shipno.value);
			docObjects[0].SetCellValue(rowNo,prefix+'shipno_seq',formObj.shipno_seq.value);
			docObjects[0].SetCellValue(rowNo,prefix+'consol_no',formObj.consol_no.value);
			if(docObjects[0].GetHeaderCheck(0,'Grd11del') == 1)
				{
				docObjects[0].SetHeaderCheck(0,'Grd11del',0,0);
				}
		} else {
			formObj.ttl_ea_qty.value=Math.round((qty - qty_new*(row-1)))/1000;
			formObj.ttl_ea_qty.value=ComAddComma(formObj.ttl_ea_qty.value,"#,##0");
		}
	}
}
function sheet1_OnClick(sheetObj, Row, Col) {
	var colName=sheetObj.ColSaveName(Col);
	var count = 0;
	for(var i = 1; i <= sheetObj.RowCount(); i++)
		{
			if(sheetObj.GetCellValue(i,colName) == 1)
				{
					count++;
				}
		}
	if(count == sheetObj.RowCount()-1)
		{
			sheetObj.SetHeaderCheck(0,'Grd11del',1,0);
		}
}
function btn_delete()
{
	var formObj=document.form;
	var qty=0;
	var prefix="Grd11";
	var i=0;
	if (docObjects[0].CheckedRows(prefix+'del')<1){
		ComShowCodeMessage("COM0228");
		return ;
	}	
	qty=eval(ComTrimAll(formObj.ttl_ea_qty.value,','))*1000;
	for(var i=docObjects[0].RowCount();i>0;i--){
		if ( docObjects[0].GetCellValue(i,prefix+'del') == '1' ){
			qty=qty + eval(docObjects[0].GetCellValue(i,prefix+'qty'))*1000;
			docObjects[0].RowDelete(i, false);
		}
	}
	docObjects[0].SetHeaderCheck(0,'Grd11del',0,0);
	formObj.ttl_ea_qty.value=Math.round(qty)/1000;
	formObj.ttl_ea_qty.value=ComAddComma(formObj.ttl_ea_qty.value,"#,##0");
}
function btn_OK(){
	var formObj=document.form;
	var prefix="Grd11";
	var rowNo=docObjects[0].DataInsert(-1);
	docObjects[0].SetCellValue(rowNo,prefix+'item_cd',formObj.item.value);
	docObjects[0].SetCellValue(rowNo,prefix+'item_name',formObj.item_name.value);
	docObjects[0].SetCellValue(rowNo,prefix+'item_lot',formObj.item_lot.value);
	docObjects[0].SetCellValue(rowNo,prefix+'qty',formObj.ttl_ea_qty.value);
	docObjects[0].SetCellValue(rowNo,prefix+'shipno',formObj.shipno.value);
	docObjects[0].SetCellValue(rowNo,prefix+'shipno_seq',formObj.shipno_seq.value);
	docObjects[0].SetCellValue(rowNo,prefix+'consol_no',formObj.consol_no.value);
	formObj.f_cmd.value=MULTI;
	var sParam=FormQueryString(formObj, null, "Grd10");
	sParam=sParam + "&"+ ComGetSaveString(docObjects[0], true, true);
	var saveXml=docObjects[0].GetSearchData("./addLPSplitShipGS.clt", sParam);
 	opener.setShipSplit(formObj.tree_name.value);
 	ComClosePopup(); 
}
function btn_Close()
{
  ComClosePopup(); 
}

function rtnData(){
	 var rtnVal="";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_cd");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_name");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "item_lot");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "qty");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "shipno");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "shipno_seq");
	 rtnVal += "|";
	 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "consol_no");
	 return rtnVal;
}