/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveBookingSelectPopup.js
*@FileTitle  : Wave Booking Select Popup
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
=========================================================--%>*/

var sheetCnt=0;
var firCalFlag=false;
var rtnary=new Array(2);
var callBackFunc = "";

var docObjects=new Array();
//var fix_grid01="Grd01";
var fix_grid01="";
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	//sheet
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//control
	initControl();
	loadComboWarehouse();
	var formObj=document.form;
	$("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_bk_date").val(ComGetNowInfo());
//	ComSetObjValue(formObj.fm_bk_date,	ComGetDateAdd(null, "d", -31, "-"));	
//	ComSetObjValue(formObj.to_bk_date,	ComGetNowInfo());
}
/*
 * initControl
 */
function initControl() {
	var formObject=document.form;
    //axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
   // axon_event.addListenerForm("keydown", "obj_keydown", formObject);
    //axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
}
/*
 * initSheet
 */
function initSheet(sheetObj,  sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	        {
//	      var hdr1="|Booking No|Booking Date|Estimated Date|Consignee|Consignee|Contract|Contract|Cust Order No |status";
//	      var headCount=ComCountHeadTitle(hdr1);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	      var prefix=fix_grid01;
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WaveBookingSelectPopup_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"CheckBox", Hidden:0,  Width:30,        Align:"Center",   ColMerge:1,	SaveName:prefix+"checkbox",      KeyField:0, 				Format:"" },
	                   {Type:"Text",     Hidden:0,  Width:120,       Align:"Center",   ColMerge:1,	SaveName:prefix+"wob_bk_no",     KeyField:0, UpdateEdit:0,	Format:"" },
	                   {Type:"Date",     Hidden:0,  Width:100,       Align:"Center",   ColMerge:1,	SaveName:prefix+"bk_date",       KeyField:0, UpdateEdit:0,	Format:"Ymd"},
	                   {Type:"Date",     Hidden:0,  Width:100,       Align:"Center",   ColMerge:1,	SaveName:prefix+"est_out_dt",    KeyField:0, UpdateEdit:0,	Format:"Ymd"},
	                   {Type:"Text",     Hidden:0,  Width:100,       Align:"Center",   ColMerge:1,	SaveName:prefix+"buyer_cd",      KeyField:0, UpdateEdit:0,	Format:"" },
	                   {Type:"Text",     Hidden:0,  Width:130,       Align:"Center",   ColMerge:1,	SaveName:prefix+"buyer_nm",      KeyField:0, UpdateEdit:0,	Format:"" },
	                   {Type:"Text",     Hidden:0,  Width:100,       Align:"Center",   ColMerge:1,	SaveName:prefix+"ctrt_no",       KeyField:0, UpdateEdit:0,	Format:"" },
	                   {Type:"Text",     Hidden:0,  Width:130,       Align:"Left",     ColMerge:1,	SaveName:prefix+"ctrt_nm",       KeyField:0, UpdateEdit:0,	Format:"" },
	                   {Type:"Text",     Hidden:0,  Width:100,       Align:"Left",     ColMerge:1,	SaveName:prefix+"cust_ord_no",   KeyField:0, UpdateEdit:0,	Format:"" },
	                   {Type:"Status",   Hidden:1,  Width:30,        Align:"Center",             	SaveName:prefix+"ibflag" }];
	       
	      InitColumns(cols);
	      SetSheetHeight(420);
	      SetEditable(1);
	            }
	      break;
	}
}}
/**
 * Search
 */
function btn_Search() {
	var formObj=document.form;
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	var formObj=document.form;
		if (validateForm(docObjects[0],formObj,'Search')) {
			formObj.f_cmd.value=SEARCH;
	 		docObjects[0].DoSearch("./WaveBookingSelectPopupGS.clt", FormQueryString(formObj,""));
	 		//var xml= convertColOrder(sXml,"Grd01");
//	 		var xml= convertColOrder(sXml,"");
//			sheetObj.LoadSearchData(xml,{Sync:1} );
		}

	doHideProcess(false);
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
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
			break;
		}
	}
	return true;
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName, valObj){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name"); 			
		switch(srcName) {
			case "btn_fm_bk_date":	
				if (document.getElementById('btn_fm_bk_date').disabled) {
					return;
				}
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	        	cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
				break;		
			case "btn_to_bk_date":	
				if (document.getElementById('btn_to_bk_date').disabled) {
					return;
				}
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
				cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
				break;
			case "btn_buyer_cd" : 
				var sUrl="CMM_POP_0010.clt?cust_cd="+$("#buyer_cd").val()+"&cust_nm="+$("#buyer_nm").val()+"&clear_flg=Y";
				
				 rtnary=new Array(1);
	    		   rtnary[0]="1";
	    		   rtnary[1]= $("#buyer_nm").val();
	    		   rtnary[2]=window;
	    		   callBackFunc = "setConsigneeInfo";
	    		   modal_center_open(sUrl, rtnary, 1150,480,"yes");
				break;
			case "btn_Search":
 				btn_Search();
 				break;
			case "btn_OK":
				btn_OK();
 				break;
			case "window.close":
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
function sheet1_OnDblClick(sheetObj, Row, Col) {
	var formObj=document.form;	
	sheetObj.SetCellValue(Row, "checkbox","1");
	rtnData("Dblick");	
}

function sheet1_OnChange(sheetObj, Row, Col) {
	var formObj=document.form;	
	 var prefix=fix_grid01;
	 var colID = sheet1.ColSaveName(Col);
	 if(colID == (prefix+"checkbox")){
		 var arrCheck = sheet1.FindCheckedRow(prefix+ "checkbox",1) !="" ?sheet1.FindCheckedRow(prefix+ "checkbox",1).split("|"):"";
		 if(arrCheck.length == sheetObj.RowCount()){
			 sheet1.SetHeaderCheck(0,prefix+ "checkbox",1);
		 }else{
			 sheet1.SetHeaderCheck(0,prefix+ "checkbox",0);
		 }
	 }
	 
}

function btn_OK() {
	rtnData("btn_OK");
}
/**
 * Close
 */
function btn_Close() {
  ComClosePopup(); 
}
/*
 * NAME 엔터시 팝업호출 - Consignee name
 */
function ConsigneePopup(){
	var sUrl="CMM_POP_0010.clt?cust_cd="+$("#buyer_cd").val()+"&cust_nm="+$("#buyer_nm").val()+"&clear_flg=Y";
	
	 rtnary=new Array(1);
	 rtnary[0]="1";
	 rtnary[1]= $("#buyer_nm").val();
	 rtnary[2]=window;
	 callBackFunc = "setConsigneeInfo";
	 modal_center_open(sUrl, rtnary, 1150,480,"yes");
}

function setConsigneeInfo(aryPopupData){	
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		$("#buyer_cd").val(rtnValAry[0]);
		$("#buyer_nm").val(rtnValAry[2]);
	}
}
/*
 * Consignee search
 * OnKeyDown 13 or onChange
 */
function getConsigneeInfo(obj){
	if(obj.value != ""){
		ajaxSendPost(resultConsigneeInfo, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + obj.value, './GateServlet.gsl');
	}
	else
	{
		$("#buyer_nm").val("");
	}
}
function resultConsigneeInfo(reqVal){	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^');
			if(rtnArr[0] != ""){
				formObj.buyer_nm.value=rtnArr[1];
			}
			else{
				formObj.buyer_cd.value="";
				formObj.buyer_nm.value="";
			}
		}
		else{
			formObj.buyer_cd.value="";
			formObj.buyer_nm.value="";
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function loadComboWarehouse(){
	var obj = document.getElementById("wh_combo");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "All";
	obj.add(option);
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}

function rtnData(ev) {
	//	var lstObj = [];
	//	var arrSelectedRowString = sheet1.FindCheckedRow('checkbox',1);
	//	var arrSelectedRow=arrSelectedRowString.split("|");
	//	var rtnVal="";
	//	for(var i =0 ; i <arrSelectedRow.length; i++  )
	//		{
	//		 
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "wob_bk_no");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "bk_date");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "est_out_dt");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "buyer_cd");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "buyer_nm");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "ctrt_no");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "ctrt_nm");
	//		 rtnVal += "|";
	//		 rtnVal += sheet1.GetCellValue(arrSelectedRow[i], "cust_ord_no");
	//		 rtnVal += "$$";
	//		}
	//	
	//	 return rtnVal;
	
	if(sheet1.FindCheckedRow('checkbox',1)=="" && sheet1.RowCount() > 0 && ev == "btn_OK")
		{
			ComShowCodeMessage("COM12189");
			return;
		}
	var listObj = [];

	for ( var i = sheet1.HeaderRows(); i < sheet1.HeaderRows()
			+ sheet1.RowCount(); i++) {

		if (sheet1.GetCellValue(i, "checkbox") == 1) {
			var obj = {};

			var bgnIndx = sheet1.SaveNameCol('wob_bk_no');
			var endIndx = sheet1.SaveNameCol('cust_ord_no');

			for ( var j = bgnIndx; j <= endIndx; j++) {

				obj[sheet1.ColSaveName(j)] = sheet1.GetCellValue(i, j);

				//eval("obj." + sheet1.ColSaveName(j) + "=sheet1.GetCellValue("+i+","+"j)");
			}

			listObj.splice(listObj.length, 0, obj);
		}
	}
	ComClosePopup(listObj);

}