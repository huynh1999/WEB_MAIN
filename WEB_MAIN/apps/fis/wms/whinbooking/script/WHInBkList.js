/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInBkList.js
*@FileTitle  : Inbound Booking Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--%>*/
var rtnary=new Array(2);
var callBackFunc = "";

var sheetCnt=0;
var comboObjects=new Array();
var docObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
var firCalFlag=false;

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
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }	
    loading_flag="Y";
	loadComboOrderType();
	loadComboWarehouse();
	initControl();
	formObj.warehouse.value = formObj.def_wh_cd.value;
	formObj.ctrt_no.value = formObj.def_wh_ctrt_no.value;
	formObj.ctrt_nm.value = formObj.def_wh_ctrt_nm.value;
	$("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_bk_date").val(ComGetNowInfo());
	document.form.btn_whicMgmt.disabled = true;
	check_authority_wh();//check authority for warehouse
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.fm_bk_date,  formObj.to_bk_date, 'MM-dd-yyyy');
        break;
    }
}

function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wib_bk_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
				btn_Search();
			break;
			case "cust_ord_no":	
				btn_Search();
			break;
			case "po_no":	
				btn_Search();
			break;
		}
	}
	var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
	return true;
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
document.onkeydown=obj_keydown;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
//	function doWork(srcName, valObj){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_to_bk_date":	
            var cal = new ComCalendarFromTo();
	    	cal.select(formObj.fm_bk_date,formObj.to_bk_date, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no" :	
			CtrtPopup();
		    
			break;
		case "SEARCHLIST":
			sheet1.RemoveAll();
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel_Dl();
			break;
		case "btn_whicMgmt":
		    btn_WhicMgmt();
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
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	      var hdr1="SEQ|Booking No|Booking Date|Status|Contract|Cust Order No|Item|Item|Item Lot|Order|Order|Volume|Volume|GWT|GWT|NWT|NWT|Additional Lot Property|Additional Lot Property|Additional Lot Property|Additional Lot Property|Order Type";
	      hdr1 += "|PO No|W/H Code|Reference No|wib_in_no|bk_sts_cd";
	      var hdr2="SEQ|Booking No|Booking Date|Status|Contract|Cust Order No|Code|Name|Item Lot|Unit|QTY|CBM|CFT|KG|LB|KG|LB|Inbound Date|Expiration Date|Lot 04|Lot 05|Order Type";
	      hdr2 += "|PO No|W/H Code|Reference No|wib_in_no|bk_sts_cd";
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHInBkList_HDR1'), Align:"Center"},{ Text:getLabel('WHInBkList_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      var cols = [ {Type:"Text",     Hidden:1,  Width:30,         Align:"Center",         ColMerge:1,              SaveName:prefix+"seq",        		KeyField:0,                Format:"", 					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:130,        Align:"Center",         ColMerge:1,              SaveName:prefix+"wib_bk_no",        	KeyField:0,                Format:"", 					 PointCount:0,		  	  },
					   {Type:"Date",     Hidden:0,  Width:80,         Align:"Center",         ColMerge:1,              SaveName:prefix+"bk_date",        	KeyField:0,                Format:"Ymd",			 	 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:60,         Align:"Center",         ColMerge:1,              SaveName:prefix+"bk_sts_nm",        	KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:1,              SaveName:prefix+"ctrt_nm",         	KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:1,              SaveName:prefix+"cust_ord_no",       KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:0,              SaveName:prefix+"item_cd",        	KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:150,        Align:"Center",         ColMerge:1,              SaveName:prefix+"item_nm",        	KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:1,              SaveName:prefix+"eq_no",        		KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:110,        Align:"Left",           ColMerge:1,              SaveName:prefix+"lot_no",        	KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:30,         Align:"Center",         ColMerge:1,              SaveName:prefix+"item_pkgunit",      KeyField:0,                Format:"",					 PointCount:0,		  	  },
					   {Type:"Text",     Hidden:0,  Width:70,         Align:"Right",          ColMerge:1,              SaveName:prefix+"item_pkgqty",       KeyField:0,                Format:"Integer",        	 PointCount:3,			},
					   {Type:"Float",    Hidden:0,  Width:80,         Align:"Right",          ColMerge:0,              SaveName:prefix+"item_cbm",          KeyField:0,                Format:"Float",       		 PointCount:3,},
					   {Type:"Float",    Hidden:0,  Width:80,         Align:"Right",          ColMerge:1,              SaveName:prefix+"item_cbf",        	KeyField:0,                Format:"Float",       		 PointCount:3,},
					   {Type:"Float",    Hidden:0,  Width:80,         Align:"Right",          ColMerge:1,              SaveName:prefix+"item_grs_kgs",      KeyField:0,                Format:"Float",       		 PointCount:3,},
					   {Type:"Float",    Hidden:0,  Width:80,         Align:"Right",          ColMerge:1,              SaveName:prefix+"item_grs_lbs",      KeyField:0,                Format:"Float",       		 PointCount:3,},
					   {Type:"Float",    Hidden:0,  Width:80,         Align:"Right",          ColMerge:1,              SaveName:prefix+"item_net_kgs",      KeyField:0,                Format:"Float",       		 PointCount:3,},
					   {Type:"Float",    Hidden:0,  Width:80,         Align:"Right",          ColMerge:1,              SaveName:prefix+"item_net_lbs",      KeyField:0,                Format:"Float",       		 PointCount:3,},
					   {Type:"Date",     Hidden:0,  Width:80,         Align:"Center",         ColMerge:1,              SaveName:prefix+"inbound_dt",        KeyField:0,                Format:"Ymd",			 	 PointCount:0,		      },
					   {Type:"Date",     Hidden:0,  Width:100,        Align:"Center",         ColMerge:1,              SaveName:prefix+"exp_dt",        	KeyField:0,                Format:"Ymd",			 	 PointCount:0,		      },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:1,              SaveName:prefix+"lot_04",        	KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:1,              SaveName:prefix+"lot_05",        	KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:0,  Width:80,         Align:"Center",         ColMerge:1,              SaveName:prefix+"ord_tp_nm",         KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:0,  Width:110,        Align:"Left",           ColMerge:1,              SaveName:prefix+"po_no",       		KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:0,  Width:75,         Align:"Center",         ColMerge:1,              SaveName:prefix+"wh_cd",       		KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:0,  Width:100,        Align:"Left",           ColMerge:1,              SaveName:prefix+"ref_no",       		KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:1,  Width:70,         Align:"Center",         ColMerge:1,              SaveName:prefix+"wib_in_no",        	KeyField:0,                Format:"",					 PointCount:0,		      },
					   {Type:"Text",     Hidden:1,  Width:70,         Align:"Center",         ColMerge:1,              SaveName:prefix+"bk_sts_cd",        	KeyField:0,                Format:"",					 PointCount:0,		      } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(420);
	      SetEditable(0);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      resizeSheet();
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
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=docObjects[0];//docObjects[0];
	var seq=0;
	var seqBkNo="";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
		//STATUS 폰트색상 변경
 		var bk_sts_cd=sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd").trim();
		if(bk_sts_cd == "P" || bk_sts_cd == "X")
		{
 			sheetObj.SetCellFontColor(i, fix_grid01 + "bk_sts_nm","#0100FF");
 			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "bk_sts_nm", 1);
		}
		if(i == sheetObj.HeaderRows()&& sheetObj.RowCount()> 0)
		{
			changeInboundMgmtBtn(sheetObj, i);
		}
	}
	check_authority_wh();
}

function sheet1_OnClick(sheetObj, Row, Col) {
	check_authority_wh();
}

function changeInboundMgmtBtn(sheetObj, Row)
{
	var bk_sts_cd=sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd").trim();
	if(bk_sts_cd == "P" || bk_sts_cd == "I") //PARTIAL이나 ISSUED상태일경우
	{
		ComBtnEnable("btn_whicMgmt"); 
	}
	else
	{
		ComBtnDisable("btn_whicMgmt"); 
	}
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "bk_sts_nm":
			var bk_sts_cd=sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd").trim();
			if(bk_sts_cd == "P" || bk_sts_cd == "X")
			{
				//중복건 체크
 				var sXml=sheetObj.GetSearchData("searchWHICBkNoDupCheck.clt", "in_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") + "&f_cmd=" + SEARCH01);
 				var xmlDoc = $.parseXML(sXml);
 		 		var $xml = $(xmlDoc);
 		 		var in_cnt = $xml.find( "in_cnt").text();
				if(in_cnt > 1)
				{
					var formObj=document.form;
					rtnary=new Array(3);
					rtnary[0]=sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
					rtnary[1]="";
					rtnary[2]=window;
				      
				    callBackFunc = "setWHICItemList";
				    modal_center_open('./WHICItemListPopup.clt', rtnary, 800, 470 ,"yes");
				}
				else
				{
					//중복건이 없으면 바로 이동	
					var sUrl="./WHICUpdate.clt?search_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") + "&search_tp=WIB_BK_NO";
					parent.mkNewFrame('Inbound Complete Update', sUrl, "WHICUpdate_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no") +"_"+ "WIB_BK_NO");
				}
			}
			break;
		case fix_grid01 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;	
	}
}

function setWHICItemList(rtnVal)
{
	var rtnValAry = rtnVal.split("|");
	var wib_in_no = rtnValAry[0];
	var sUrl="./WHICUpdate.clt?search_no="+wib_in_no + "&search_tp=WIB_IN_NO";
	parent.mkNewFrame('Inbound Complete Update', sUrl, "WHICUpdate_" + wib_in_no + "_WIB_IN_NO");
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	
	var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value + "&ctrt_no="+formObj.ctrt_no.value ;
      
    callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
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

/*
 * 팝업 관련 로직 끝
 */
function btn_Search() {	
	var formObj=document.form;
	var sheetObj=docObjects[0];
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	//search
	if (validateForm(docObjects[0],formObj,'Search')) {
		document.form.btn_whicMgmt.disabled = true;
		formObj.f_cmd.value=SEARCH;
 		docObjects[0].DoSearch("searchWHInBkList.clt", FormQueryString(formObj,""));
	}
}

/*
 * 엑셀다운로드
 */
function btn_Excel_Dl() 
{
	var prefix = fix_grid01;
	if(docObjects[0].RowCount() < 1){//no data
		ComShowCodeMessage("COM132501");
	}else{
		docObjects[0].Down2Excel( {HiddenColumn:1, CheckBoxOffValue:" ", CheckBoxOnValue:"Y", SheetDesign:1, Merge:1, AutoSizeColumn: 1, ExtendParam: "ColumnColor: " + prefix + "wib_bk_no|" + prefix + "bk_sts_nm" });
	}
}
/*
 * inbound complete 버튼
 */
function btn_WhicMgmt(){
	var bk_sts_cd=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), fix_grid01 + "bk_sts_cd").trim();
	if(bk_sts_cd == "P" || bk_sts_cd == "I") //PARTIAL이나 ISSUED상태일경우
	{
		var sParam="search_tp=WIB_BK_NO&search_no="+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), fix_grid01 + "wib_bk_no");
		var sUrl="./WHICMgmt.clt?"+sParam;
		parent.mkNewFrame('Inbound Complete Management', sUrl, "WHICMgmt_" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), fix_grid01 + "wib_bk_no"));
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			//bk_no 또는 customer ord no 또는 po_no가 없는경우 warehouse는 필수로 입력되어야함.
			if(ComIsEmpty(formObj.wib_bk_no) && ComIsEmpty(formObj.cust_ord_no)&& ComIsEmpty(formObj.po_no) 
			&& ComIsEmpty(formObj.warehouse))// && ComIsEmpty(formObj.ctrt_no))
			{
				ComShowCodeMessage("COM0114","Warehouse or Booking No or Cust Order No or PO No");
				$("#warehouse").focus();
				return false;
			}
			//bk_no 또는 customer ord no 또는 po_no가 없는경우 booking Date는 필수
			if(ComIsEmpty(formObj.wib_bk_no)&& ComIsEmpty(formObj.cust_ord_no)&& ComIsEmpty(formObj.po_no) 
			&& ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date))
			{
				ComShowCodeMessage("COM0114","Booking Date");
				$("#fm_bk_date").focus();
				return false;
			}
			if(!ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)){
				formObj.to_bk_date.value=ComGetNowInfo();
			}
			/* 3개월 duration 주석
			if (!ComIsEmpty(formObj.fm_bk_date) && getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)> 92) {
				ComShowCodeMessage("COM0141","3","(Booking Date)");
				formObj.fm_bk_date.focus();
				return false;
			}
			*/
			if (!ComIsEmpty(formObj.fm_bk_date) && !isDate(formObj.fm_bk_date)) {
				ComShowCodeMessage("COM0114","Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_bk_date) && !isDate(formObj.to_bk_date)) {
				ComShowCodeMessage("COM0114","Booking Date");
				formObj.to_bk_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_bk_date)&&ComIsEmpty(formObj.to_bk_date))||(ComIsEmpty(formObj.fm_bk_date)&&!ComIsEmpty(formObj.to_bk_date))) {
				ComShowCodeMessage("COM0122","Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (getDaysBetween(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy')<0) {
				ComShowCodeMessage("COM0122","Booking Date");
				formObj.fm_bk_date.focus();
				return false;
			}
			if (formObj.warehouse.value == "ALL"){
				ComShowCodeMessage("COM12233","");
				formObj.warehouse.focus();
				return false;
			}
			break;
		}
	}
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj){
	ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchTlLocInfo&s_code='+obj.value, './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.wh_nm.value = masterVals[3];
	}else{
		formObj.wh_cd.value="";
		formObj.wh_nm.value="";
	}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
//	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value, './GateServlet.gsl');
	
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
//		var masterVals = rtnArr[0].split('@@^');	
		formObj.ctrt_nm.value = rtnArr[0];
		formObj.ctrt_no.value = rtnArr[1];
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
	}
	
}
function loadComboOrderType(){
	var obj = document.getElementById("ord_tp_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var ord_tp_cd_cd = ord_tp_cdCode.split('|');
	var ord_tp_cd_nm = ord_tp_cdText.split('|');
	
	for(var i = 0; i < ord_tp_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(ord_tp_cd_nm[i]);
		option.value = htmlDecode(ord_tp_cd_cd[i]);
		
		obj.add(option);
	}
}
function loadComboWarehouse(){
	var obj = document.getElementById("warehouse");
	var option =  document.createElement("option");
	
	/*option.text = "ALL";
	option.value = "All";
	
	obj.add(option);*/
	
	var warehouse_cd = warehouseCode.split('|');
	var warehouse_nm = warehouseText.split('|');
	
	for(var i = 0; i < warehouse_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(warehouse_nm[i]);
		option.value = htmlDecode(warehouse_cd[i]);
		
		obj.add(option);
	}
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var prefix = "Grd01";
	var formObj = document.form;
	var sheetObj = sheet1;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	var warehouse = formObj.warehouse.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_whicMgmt");
	}else{
		ComBtnEnable("btn_whicMgmt");
		changeInboundMgmtBtn(sheetObj, sheet1.GetSelectRow());
	}
}
