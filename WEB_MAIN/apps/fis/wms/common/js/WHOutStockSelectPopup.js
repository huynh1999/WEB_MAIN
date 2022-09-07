/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutStockSelectPopup.js
*@FileTitle  : Stock Selection
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var rtnary = new Array(1);
var callBackFunc = "";

var firCalFlag=false;
var opener=window.dialogArguments;
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

function loadPage() {
	var formObj=document.form;
	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	
	var call_tp = formObj.call_tp.value;	
	if (call_tp == "B" || call_tp == "M") 
	{
		docObjects[0].SetColHidden("checkbox",0);
		if (formObj.g_item_cd.value != "") {
			formObj.item_cd.value = formObj.g_item_cd.value;
			formObj.item_cd.disabled = true;
		}
	} 
	else if (call_tp == "G") 
	{
		docObjects[0].SetColHidden("checkbox",1);
		formObj.item_cd.value = formObj.g_item_cd.value;
		formObj.item_cd.disabled = true;
	}
//	initControl();	
	
//	  $('#wh_cd option[value=' + formObj.g_wh_cd.value + ']').attr('selected','selected');
	formObj.wh_cd.value = formObj.g_wh_cd.value;
	
	formObj.inbound_dt_from.value = ComGetDateAdd(null, "d", -31, "-");	
	formObj.inbound_dt_to.value = ComGetNowInfo();
	// 디폴트 Search 실행
	if (formObj.ctrt_no.value != "") {
		btn_Search();
	}	
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 			'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm	("beforedeactivate", 	"frmObj_OnBeforeDeactivate",  document.form);
    axon_event.addListenerFormat("beforeactivate", 		"frmObj_OnBeforeActivate", document.form);
    axon_event.addListenerForm  ('keypress', 			'enter_Check',  document.form);
    //- 포커스 나갈때
	axon_event.addListenerForm	('blur', 	'form_deactivate', formObj);
	axon_event.addListenerForm	("keydown", 			"obj_keydown", formObj);
	axon_event.addListenerForm	("change", 				"form_onChange", formObj);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('WHOutStockSelectPopup_HDR1'), Align:"Center"},
		                      { Text:getLabel('WHOutStockSelectPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"checkbox" },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"fix_lot_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inbound_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lot_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"wh_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"wh_loc_cd_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   	Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"stock_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,	 UpdateEdit:0,   InsertEdit:0 },
	             
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"exp_dt",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lot_04",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lot_05",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"wib_bk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"po_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             /*{Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },*/
	            
	             {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"pkg_lv1_qty",    KeyField:0,   CalcLogic:"",   Format:"",     		 PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             
	             
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbm",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_cbf",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_kgs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_kgs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"lv1_net_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"po_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"prop_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"prop_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"so_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"zone_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"block_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"stock_cbm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT, UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"stock_cbf",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT, UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"stock_grs_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"stock_grs_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"stock_net_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"stock_net_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pkg_info",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:"item_ser_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",    ColMerge:1,   SaveName:"lic_plat_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	       
	      InitColumns(cols);
	      SetSheetHeight(450);
	      SetEditable(1);
	      resizeSheet();
	            }
	      break;
	}
}
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

/**
 * Search
 */
function btn_Search() {
	var formObj=document.form;
	if (validateForm(sheet1,formObj, 'Search')) {
		sheet1.RemoveAll();
		formObj.f_cmd.value = SEARCH;
 		var sXml=sheet1.DoSearch("./WHOutStockSelectPopupGS.clt", FormQueryString(formObj, ""));
	}
}
/*
 * Validation
 */
function checkForm(){
	var formObj=document.form;
	if (formObj.ctrt_no.value != "") {
		// CONTRACT NO
		ComShowCodeMessage("COM0278", "Contract No");
		formObj.ctrt_no.focus();
		return false;		
	} 
	//Item 이 없는경우 Inbound Date는 필수 (MAX 93일까지)
	if (formObj.item_cd.value != "") {
		if (formObj.inbound_dt_from.value != "") {
			ComShowCodeMessage("COM0114", "Item or Inbound Date");
			formObj.inbound_dt_from.focus();
			return false;
		} 
		/* 3개월 duration 주석
		else {
			if (getDaysBetween2(formObj.inbound_dt_from.value, formObj.inbound_dt_to.value) > 92) {
				ComShowCodeMessage("COM0141", "3", "(Inbound Date)");
				formObj.inbound_dt_from.focus();
				return false;
			}
		}
		*/
	}

	return true;
}
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Search':
			if (isNull(formObj.ctrt_no)) {
				// CONTRACT NO
				ComShowCodeMessage("COM0278", "Contract No");
				formObj.ctrt_no.focus();
				return false;		
			} 
			//Item 이 없는경우 Inbound Date는 필수 (MAX 93일까지)
			if (ComIsEmpty(formObj.item_cd)) {
				if (ComIsEmpty(formObj.inbound_dt_from)) {
					ComShowCodeMessage("COM0114", "Item or Inbound Date");
					formObj.inbound_dt_from.focus();
					return false;
				} 
				/* 3개월 duration 주석
				else {
					if (getDaysBetween2(formObj.inbound_dt_from.value, formObj.inbound_dt_to.value) > 92) {
						ComShowCodeMessage("COM0141", "3", "(Inbound Date)");
						formObj.inbound_dt_from.focus();
						return false;
					}
				}
				*/
			}
			if (!ComIsEmpty(formObj.inbound_dt_from) && ComIsEmpty(formObj.inbound_dt_to)) {
				formObj.inbound_dt_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.inbound_dt_from) && !isDate(formObj.inbound_dt_from)) {
				ComShowCodeMessage("COM0114","Inbound Date");
				formObj.inbound_dt_from.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.inbound_dt_to) && !isDate(formObj.inbound_dt_to)) {
				ComShowCodeMessage("COM0114","Inbound Date");
				formObj.inbound_dt_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.inbound_dt_from)&&ComIsEmpty(formObj.inbound_dt_to))||(ComIsEmpty(formObj.inbound_dt_from)&&!ComIsEmpty(formObj.inbound_dt_to))) {
				ComShowCodeMessage("COM0122","Inbound Date");
				formObj.inbound_dt_from.focus();
				return false;
			}
			/* TinLuong comment. Validate calendar had function check between date. 
			 * if (getDaysBetween2(formObj.inbound_dt_from.value, formObj.inbound_dt_to.value)<0) {
				ComShowCodeMessage("COM0122","Inbound Date!");
				formObj.inbound_dt_from.focus();
				return false;
			}*/
			if(ComIsEmpty(formObj.wh_cd))//&& ComIsEmpty(formObj.ctrt_no))
			{
				ComShowCodeMessage("COM0114","Warehouse");
				$("#wh_cd").focus();
				return false;
			}
			break;
		}
	}
	return true;
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
//			case "btn_inbound_dt_to":	
//				var cal=new ComCalendarFromTo();
//				cal.displayType="date";
//	            cal.select(formObj.inbound_dt_from, formObj.inbound_dt_to, 'MM-dd-yyyy');
//				break;
 			case "btn_wh_loc_cd" :
 			    callBackFunc = "setLocInfo";
 			    modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+formObj.wh_cd.value+'&wh_loc_nm=' +formObj.wh_loc_nm.value, rtnary, 700, 500,"yes");
 				break;
 			case "SEARCHLIST":
				btn_Search();
				break;
 			case "btn_OK":	
				btn_OK();
				break;
 			case "CLOSE":	
				btn_Close();
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

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.inbound_dt_from,formObj.inbound_dt_to, 'MM-dd-yyyy');
        break;
    }
}

function setLocInfo(rtnVal){
	var formObj=document.form;

	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.wh_loc_cd.value=rtnValAry[0];//full_nm
		   formObj.wh_loc_nm.value=rtnValAry[1];//full_nm
	   } 
}

//function setLocInfo(aryPopupData) {
//	var formObj=document.form;
//	ComSetObjValue(formObj.wh_loc_cd, aryPopupData[0][1]);
//	ComSetObjValue(formObj.wh_loc_nm, aryPopupData[0][2]);
//}
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (srcName == "wh_loc_nm") {
		if (!ComIsNull(srcValue)) {
			searchAjaxColInfo(formObj, ComGetObjValue(formObj.wh_loc_nm), "wh_loc_nm");
		} else {
			ComSetObjValue(form.wh_loc_nm, "");
			ComSetObjValue(form.wh_loc_cd, "");
		}
	}
}
function searchAjaxColInfo(formObj, value, col) {
	if (col=="wh_loc_nm") {		
		if (value != "") {		
			var param="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + value;	
			/*$.ajax({
				url : "searchWarehouseLocInfoForName.clt?"+param,
				success : function(result) {
					if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
					}
					ComSetObjValue(form.wh_loc_nm, getXmlDataNullToNullString(result.xml,'wh_loc_nm'));
					ComSetObjValue(form.wh_loc_cd, getXmlDataNullToNullString(result.xml,'wh_loc_cd'));
				}
			});*/
			var sXml=sheetObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+param);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			ComSetObjValue(form.wh_loc_nm, getXmlDataNullToNullString(sXml,'wh_loc_nm'));
			ComSetObjValue(form.wh_loc_cd, getXmlDataNullToNullString(sXml,'wh_loc_cd'));
		} else {
			ComSetObjValue(form.wh_loc_nm, "");
			ComSetObjValue(form.wh_loc_cd, "");
		}
	}
}
function sheet1_OnDblClick(sheetObj, Row, Col) {
	var formObj=document.form;	
	sheetObj.SetCellValue(Row, "checkbox","1");
	returnData(sheet1, sheet1.FindCheckedRow("checkbox",1));
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	checkBoxOnOff();
}
function btn_OK() {
	if(sheet1.GetSelectRow() > 0){
		//sheetObj.SetCellValue(sheet1.GetSelectRow(), "checkbox","1");
		returnData(sheet1, sheet1.FindCheckedRow("checkbox",1));
	}else ComShowCodeMessage("COM12189");
}
/**
 * Close
 */
function btn_Close() {
  ComClosePopup(); 
}

function returnData(sheetObj, selectedRows){
//	var retArray="";
//	var formObj=document.form;
//	retArray += sheetObj.GetCellValue(cnt,"item_cd"); //0
//	retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"fix_lot_id");//1
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"inbound_dt");//2
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lot_no");//3
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"wh_loc_cd");//4
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"wh_loc_cd_nm");//5
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"item_pkgunit");//6
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_qty");//7
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"wib_bk_no");//8
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"po_no");//9
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"item_nm");//10
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"exp_dt");//11
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lot_04");//12
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lot_05");//13
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"item_sys_no");//14
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"pkg_lv1_qty");//15
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lv1_cbm");//16
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lv1_cbf");//17
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lv1_grs_kgs");//18
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lv1_grs_lbs");//19
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lv1_net_kgs");//20
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"lv1_net_lbs");//21
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"po_sys_no");//22
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"prop_cd");//23
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"prop_nm");//24
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"so_no");//25
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"zone_cd");//26
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"block_cd");//27
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"ctrt_no");//28
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_cbm");//29
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_cbf");//30
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_grs_kgs");//31
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_grs_lbs");//32
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_net_kgs");//33
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"stock_net_lbs");//34
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"pkg_info");//35
//    retArray += "|";
//    retArray += sheetObj.GetCellValue(cnt,"ref_no");//36
	
	var arrSelectedRows = selectedRows.split('|');
	var listObj = [];

	if(arrSelectedRows ==""){
		ComShowCodeMessage("COM12189");
		return;
	}
	
	
	for(var i = 0; i < arrSelectedRows.length; i++){
		
		var obj = {};
		
		var bgnIndx = sheet1.SaveNameCol('item_cd');
		var endIndx = sheet1.SaveNameCol('lic_plat_no');
		
		for(var j = bgnIndx ; j <= endIndx; j++){
			
			obj[sheet1.ColSaveName(j)] = sheet1.GetCellValue(arrSelectedRows[i],j);
			
			//eval("obj." + sheet1.ColSaveName(j) + "=sheet1.GetCellValue("+i+","+"j)");
		}
		
		listObj.splice(listObj.length, 0, obj);
	}
	
    ComClosePopup(listObj);
}
function checkBoxOnOff(){
	if (sheet1.RowCount() > 0){
		var findcheck = sheet1.FindCheckedRow("checkbox",1);
		if (findcheck == "" || findcheck == null || findcheck == -1)
			sheet1.SetHeaderCheck(0, "checkbox", 0);
		else{
			var checksize = sheet1.FindCheckedRow("checkbox",1).split("|").length;
			if (checksize == sheet1.RowCount())
				sheet1.SetHeaderCheck(0, "checkbox", 1);
			else sheet1.SetHeaderCheck(0, "checkbox", 0);
		}
	}else sheet1.SetHeaderCheck(0, "checkbox", 0);
}
function getLocationInfo(){
	var formObj=document.form;
	if ($("#wh_loc_nm").val() == "") {
		$("#wh_loc_cd").val("");
	}
	if (ComIsEmpty(formObj.wh_cd)) {
		ComShowCodeMessage("COM0114", "Warehouse");
		$("#wh_loc_nm").val("");
		$("#wh_cd").focus();
		return;
	}
	var sParam = "f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm="
			+ $("#wh_loc_nm").val() + "&f_move_flg=Y";
	ajaxSendPost(resultLocationInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultLocationInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		$("#wh_loc_nm").val(rtnArr[1]);
	    		$("#wh_loc_cd").val(rtnArr[0]);
	    	}
	    	else{
	    		$("#wh_loc_nm").val("");
	    		$("#wh_loc_cd").val("");
	    	}
		}
		else{
		}
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}



