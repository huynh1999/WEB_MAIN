/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MCLPExpressPopup.js
*@FileTitle  : Excel Upload for Express CLP
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/03/19
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		var cal=new ComCalendar();
		switch(srcName) {
			case "btn_OK":	
				btn_OK();
				break;
			case "CLOSE":	
				ComClosePopup();
				break;
			case "btn_excel_upload":	
				btn_excel_upload();
				break;
				
		} // end switch
	} catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	var strFilePath="";    
	if(document.form.bk_tp.value =="WB"){
		docObjects[0].SetSheetHeight(320);
		docObjects[0].SetVisible(true);
		//strFilePath=docObjects[0].OpenFileDialog("Load Excel", "", "", "Excel Documents(*.xls; *.xlsx)|*.xls; *.xlsx");
 		//docObjects[0].LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"3",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
	} else {
		docObjects[1].SetVisible(true);
		docObjects[1].SetSheetHeight(280);
		//strFilePath=docObjects[1].OpenFileDialog("Load Excel", "", "", "Excel Documents(*.xls; *.xlsx)|*.xls; *.xlsx");
 		//docObjects[1].LoadExcel({ Mode:"NoHeader",WorkSheetNo:"1",StartRow:"3",EndRow:"-1",WorkSheetName:"",Append:true,ColumnMapping:""});
	}
	btn_Search();
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function btn_excel_upload(){
	if(document.form.bk_tp.value =="WB"){
		docObjects[0].LoadExcel({ Mode:"HeaderSkip"});
	}
	else {
		docObjects[1].LoadExcel({ Mode:"HeaderSkip"});
	}
}

function sheet2_OnLoadExcel(result){ 
		var formObj=document.form;
		validateForm(docObjects[0],formObj,'OK');
}
function sheet1_OnLoadExcel(result){ 
	var formObj=document.form;
	validateForm(docObjects[0],formObj,'OK');
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		    with(sheetObj){
	      var prefix="Grd01";
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('MCLPExpressPopup_1_HDR1'), Align:"Center"},{ Text:getLabel('MCLPExpressPopup_1_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"out_wb_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"in_po_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"in_wb_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             /* #2927 [LOA WMS4.0] ITEM CBM CALCULATION */
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_wgt", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cntr_tpsz_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cntr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no1",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"loaded_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:prefix+"po_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      InitColumns(cols);
	      SetVisible(false);
	      SetEditable(1);
	      SetWaitImageVisible(0);
	            }
	      break;


		case 2:
		    with(sheetObj){
	      var prefix="Grd01";
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('MCLPExpressPopup_2_HDR1'), Align:"Center"},{ Text:getLabel('MCLPExpressPopup_2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"wb_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"po_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             /* #2927 [LOA WMS4.0] ITEM CBM CALCULATION */
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_wgt", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cntr_tpsz_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cntr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no1",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"loaded_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:prefix+"po_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      InitColumns(cols);
	      SetVisible(false);
	      SetEditable(1);
	      SetWaitImageVisible(0);
	            }
	      break;


		case 3:
		    with(sheetObj){
	        
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('MCLPExpressPopup_3_HDR1'), Align:"Center"},{ Text:getLabel('MCLPExpressPopup_3_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"bk_tp",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"user_id",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"org_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"xls_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"mclp_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"rtncd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"rtnmsg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      InitColumns(cols);
	      SetVisible(false);
	      SetEditable(1);
	      SetWaitImageVisible(0);
	            }
	      break;


	}
}
function btn_Search()
{
	var formObj=document.form;
	var sXml="";
	var sParam="";
	var false_cnt=0;
	var i=0;
	formObj.f_cmd.value=SEARCH;
	doShowProcess(true);
	if (formObj.bk_tp.value == 'WB'){
		for(i=docObjects[0].RowCount();i>0;i--){
			if(ComIsEmpty(docObjects[0].GetCellValue(i,'Grd01out_wb_no'))){
				docObjects[0].RowDelete(i, false);
			}
		}
		for(var k=0;k<docObjects[0].RowCount();k++){
			formObj.out_wb_no.value=docObjects[0].GetCellValue(k+1,'Grd01out_wb_no');
			formObj.in_wb_no.value=docObjects[0].GetCellValue(k+1,'Grd01in_wb_no');
			formObj.po_no.value=docObjects[0].GetCellValue(k+1,'Grd01in_po_no');
			formObj.item_cd.value=docObjects[0].GetCellValue(k+1,'Grd01item_cd');
 			sXml=docObjects[0].GetSearchData("./searchPoItemSysNo.clt", FormQueryString(formObj, ""));
			docObjects[0].SetCellValue(k+1,'Grd01po_sys_no',getXmlDataNullToNullString(sXml,'po_sys_no'));
			docObjects[0].SetCellValue(k+1,'Grd01item_sys_no',getXmlDataNullToNullString(sXml,'item_sys_no'));
			if (ComIsEmpty(docObjects[0].GetCellValue(k+1,'Grd01po_sys_no'))||ComIsEmpty(docObjects[0].GetCellValue(k+1,'Grd01item_sys_no'))){
				docObjects[0].SetRowFontColor(k+1,"#0000FF");
				false_cnt=false_cnt + 1;
			}
		}
	} else if (formObj.bk_tp.value == 'SB'){
		for(var i=docObjects[1].RowCount();i>0;i--){
			if(ComIsEmpty(docObjects[1].GetCellValue(i,'Grd01wb_no'))){
				docObjects[1].RowDelete(i, false);
			}
		}
		for(var k=0;k<docObjects[1].RowCount();k++){
			formObj.wb_no.value=docObjects[1].GetCellValue(k+1,'Grd01wb_no');
			formObj.po_no.value=docObjects[1].GetCellValue(k+1,'Grd01po_no');
			formObj.item_cd.value=docObjects[1].GetCellValue(k+1,'Grd01item_cd');
 			sXml=docObjects[0].GetSearchData("./searchPoItemSysNo.clt", FormQueryString(formObj, ""));
			docObjects[1].SetCellValue(k+1,'Grd01po_sys_no',getXmlDataNullToNullString(sXml,'po_sys_no'));
			docObjects[1].SetCellValue(k+1,'Grd01item_sys_no',getXmlDataNullToNullString(sXml,'item_sys_no'));
			if (ComIsEmpty(docObjects[1].GetCellValue(k+1,'Grd01po_sys_no'))||ComIsEmpty(docObjects[1].GetCellValue(k+1,'Grd01item_sys_no'))){
				docObjects[1].SetRowFontColor(k+1,"#0000FF");
				false_cnt=false_cnt + 1;
			}
		}
	}
	doShowProcess(false);
	if ( false_cnt > 0){
		ComBtnDisable("btn_OK");
		ComShowCodeMessage("COM0265");
	}
}
function btn_OK() {
	var formObj=document.form;
	var sXml="";
	formObj.f_cmd.value=ADD;
	if (validateForm(docObjects[0],formObj,'OK')) {
		if (ComShowCodeConfirm("COM130101")){
			var sParam=FormQueryString(formObj, "Grd00");
			if (formObj.bk_tp.value == 'WB'){
				sParam=sParam + "&"+ ComGetSaveString(docObjects[0], true, true);
			} else if (formObj.bk_tp.value == 'SB'){
				sParam=sParam + "&"+ ComGetSaveString(docObjects[1], true, true);
			}
			doShowProcess(true);
 			sXml=docObjects[2].GetSaveData("./addExpressMCLP.clt", sParam);
			doShowProcess(false);
			//1. Save 후 조회
			if( sXml.indexOf('<ERROR>') == -1){
//				ComShowCodeMessage("COM0093", "");
				//Change message 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				comPopupOK();
			}
		}
	}
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	var formObj=document.form;
	var prefix="Grd01";
	var i=0;
	var j=0;
//	var load_dt = "";
	switch (sAction) {
	case 'OK':
		if (formObj.bk_tp.value == 'WB'){
			for(i=1;i<docObjects[0].RowCount()+1;i++){
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"po_sys_no")) || ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"item_sys_no"))){
					ComShowCodeMessage("COM0265");
					return false;
				}
//				 1.Booking No(OUT), Order No(IN), Booking No(IN), Item, Container Type, Container No
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"out_wb_no"))){
					ComShowCodeMessage("COM0082","Booking No (OUT)");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"in_po_no"))){
					ComShowCodeMessage("COM0082","Order No(IN)");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"in_wb_no"))){
					ComShowCodeMessage("COM0082","Booking No(IN)");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"item_cd"))){
					ComShowCodeMessage("COM0082","Item");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"cntr_tpsz_cd"))){
					ComShowCodeMessage("COM0082","Container Type");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"cntr_no"))){
					ComShowCodeMessage("COM0082","Container No");
					return false;
				}
//				4.ITEM_SYS_NO 가 null 이거나 PO_SYS_NO가 null 이면 
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"po_sys_no")) || ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"item_sys_no"))){
					ComShowCodeMessage("COM0218");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"loaded_dt"))){
					ComShowCodeMessage("COM0276");
					return false;
				}
				if(ComIsEmpty(docObjects[0].GetCellValue(i,prefix+"seal_no1"))){
					ComShowCodeMessage("COM0082","Seal No1.");
					return false;
				}
				for(j=i+1;j<docObjects[0].RowCount()+1;j++){
					if(i==1){
	//					2.다른 2개의 Booking No(OUT) 불가 - Booking No(out) cannot have more than one.
						if(docObjects[0].GetCellValue(i,prefix+"out_wb_no") != docObjects[0].GetCellValue(j,prefix+"out_wb_no")){
							ComShowCodeMessage("COM0216",j);
							return false;
						}
					}
					if ( docObjects[0].GetCellValue(i,prefix+"cntr_no") == docObjects[0].GetCellValue(j,prefix+"cntr_no")){
						if ( docObjects[0].GetCellValue(i,prefix+"cntr_tpsz_cd") != docObjects[0].GetCellValue(j,prefix+"cntr_tpsz_cd")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
						if ( docObjects[0].GetCellValue(i,prefix+"seal_no1") != docObjects[0].GetCellValue(j,prefix+"seal_no1")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
						if ( docObjects[0].GetCellValue(i,prefix+"seal_no2") != docObjects[0].GetCellValue(j,prefix+"seal_no2")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
						if ( docObjects[0].GetCellValue(i,prefix+"loaded_dt") != docObjects[0].GetCellValue(j,prefix+"loaded_dt")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
					}
//					if(docObjects[0].CellValue(i,prefix+"cntr_tpsz_cd") != docObjects[0].CellValue(j,prefix+"cntr_tpsz_cd") &&
//							   docObjects[0].CellValue(i,prefix+"cntr_no") == docObjects[0].CellValue(j,prefix+"cntr_no")
//							){
//						ComShowCodeMessage("COM0217"," Container No = "+docObjects[0].CellValue(j,prefix+"cntr_no")+", Container Type = "+docObjects[0].CellValue(j,prefix+"cntr_tpsz_cd"));
//						return false;
//					}
//					3.중복체크 : Booking No(OUT), ITEM_SYS_NO, PO_SYS_NO, Container Type, Container No 이 같은 Row 가 2개 이상이면 안됨
					if(docObjects[0].GetCellValue(i,prefix+"out_wb_no") == docObjects[0].GetCellValue(j,prefix+"out_wb_no") &&
							docObjects[0].GetCellValue(i,prefix+"item_sys_no") == docObjects[0].GetCellValue(j,prefix+"item_sys_no") &&
							docObjects[0].GetCellValue(i,prefix+"po_sys_no") == docObjects[0].GetCellValue(j,prefix+"po_sys_no") &&
							docObjects[0].GetCellValue(i,prefix+"cntr_tpsz_cd") == docObjects[0].GetCellValue(j,prefix+"cntr_tpsz_cd") &&
							docObjects[0].GetCellValue(i,prefix+"cntr_no") == docObjects[0].GetCellValue(j,prefix+"cntr_no")
					){
						ComShowCodeMessage("COM0217","Booking No(OUT)="+docObjects[0].GetCellValue(j,prefix+"out_wb_no")+", Order No="+docObjects[0].GetCellValue(j,prefix+"item_sys_no")
								+", Item="+docObjects[0].GetCellValue(j,prefix+"po_sys_no")+", Container Type="+docObjects[0].GetCellValue(j,prefix+"cntr_tpsz_cd") + " Container No="+docObjects[0].GetCellValue(j,prefix+"cntr_no"));
						return false;
					}
				}
			}
		} else if (formObj.bk_tp.value == 'SB'){
			for(i=1;i<docObjects[1].RowCount()+1;i++){
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"po_sys_no")) || ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"item_sys_no"))){
					ComShowCodeMessage("COM0265");
					return false;
				}
//				Booking No, Order No, Item, Container Type, Container No
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"wb_no"))){
					ComShowCodeMessage("COM0082","Booking No");
					return false;
				}
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"po_no"))){
					ComShowCodeMessage("COM0082","Order No");
					return false;
				}
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"item_cd"))){
					ComShowCodeMessage("COM0082","Item");
					return false;
				}
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"cntr_tpsz_cd"))){
					ComShowCodeMessage("COM0082","Container Type");
					return false;
				}
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"cntr_no"))){
					ComShowCodeMessage("COM0082","Container No");
					return false;
				}
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"loaded_dt"))){
					ComShowCodeMessage("COM0276");
					return false;
				}
				if(ComIsEmpty(docObjects[1].GetCellValue(i,prefix+"seal_no1"))){
					ComShowCodeMessage("COM0082","Seal No1.");
					return false;
				}				
				for(j=i+1;j<docObjects[1].RowCount()+1;j++){
					if ( docObjects[1].GetCellValue(i,prefix+"cntr_no") == docObjects[1].GetCellValue(j,prefix+"cntr_no")){
						if ( docObjects[1].GetCellValue(i,prefix+"loaded_dt") != docObjects[1].GetCellValue(j,prefix+"loaded_dt")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
						if ( docObjects[1].GetCellValue(i,prefix+"seal_no1") != docObjects[1].GetCellValue(j,prefix+"seal_no1")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
						if ( docObjects[1].GetCellValue(i,prefix+"seal_no2") != docObjects[1].GetCellValue(j,prefix+"seal_no2")){
							ComShowCodeMessage("COM0300",j);
							return false;
						}
					}
					if(docObjects[1].GetCellValue(i,prefix+"cntr_tpsz_cd") != docObjects[1].GetCellValue(j,prefix+"cntr_tpsz_cd") &&
							docObjects[1].GetCellValue(i,prefix+"cntr_no") == docObjects[1].GetCellValue(j,prefix+"cntr_no")
					){
						ComShowCodeMessage("COM0217","Container No="+docObjects[1].GetCellValue(j,prefix+"cntr_no")+", Container Type="+docObjects[1].GetCellValue(j,prefix+"cntr_tpsz_cd"));
						return false;
					}
//					3.중복체크 : Booking No(OUT), ITEM_SYS_NO, PO_SYS_NO, Container Type, Container No 이 같은 Row 가 2개 이상이면 안됨
					if(docObjects[1].GetCellValue(i,prefix+"wb_no") == docObjects[1].GetCellValue(j,prefix+"wb_no") &&
							docObjects[1].GetCellValue(i,prefix+"item_sys_no") == docObjects[1].GetCellValue(j,prefix+"item_sys_no") &&
							docObjects[1].GetCellValue(i,prefix+"po_sys_no") == docObjects[1].GetCellValue(j,prefix+"po_sys_no") &&
							docObjects[1].GetCellValue(i,prefix+"cntr_tpsz_cd") == docObjects[1].GetCellValue(j,prefix+"cntr_tpsz_cd") &&
							docObjects[1].GetCellValue(i,prefix+"cntr_no") == docObjects[1].GetCellValue(j,prefix+"cntr_no")
					){
						ComShowCodeMessage("COM0217","Booking No(OUT)="+docObjects[1].GetCellValue(j,prefix+"wb_no")+", Order No="+docObjects[1].GetCellValue(j,prefix+"item_sys_no")
								+", Item="+docObjects[1].GetCellValue(j,prefix+"po_sys_no")+", Container Type="+docObjects[1].GetCellValue(j,prefix+"cntr_tpsz_cd") + " Container No="+docObjects[1].GetCellValue(j,prefix+"cntr_no"));
						return false;
					}
				}
			}			
		}
		break;
	}
	return true;
}
