/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutbkList.js
*@FileTitle  : Outbound Booking Search
*@author     : Tin.Luong
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
var firCalFlag=false;
var rtnary = new Array(1);
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage(flag) {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }	
	//var formObj = document.form;
	//if(formObj.ctrt_no.value != "" && formObj.cust_item_no.value != ""){
	//	btn_Search();
	//}
    loading_flag="Y";
	initControl();
	// Warehouse&Contract 세션 정보 Default 세팅
//	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
//	setFieldValue(formObj.wh_nm, ComGetObjValue(formObj.def_wh_nm));
	formObj.wh_cd.value = ComGetObjValue(formObj.def_wh_cd)
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
	$("#fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_bk_date").val(ComGetNowInfo());
	ComBtnDisable("lnk_allocation"); 
	check_authority_wh();//check authority for warehouse
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
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
		var vTextSplit=null;
		var vCodeSplit=null;
		switch(comboObj.options.id) {
		case "cond_flag":
			var txt="Booking No|Cust Order No";
			var val="WOB_BK_NO|CUST_ORD_NO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;		
		case "ord_tp_cd":
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	}
			break;
		case "bk_sts_cd":
			var txt="ALL|Booked|Issued|Allocated|Planned|Completed|Cancel";
			var val="ALL|N|I|A|P|X|C";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
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
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "cond_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "lot_no":	
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

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_to_bk_date":	
			if (document.getElementById('btn_to_bk_date').disabled) {
				return;
			}
			var cal=new ComCalendarFromTo();
			cal.displayType="date";
			cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no" :	
			btn_ctrt_no();
			break;
		case "btn_buyer_cd":
			btn_buyer_cd();
			break;	
		case "SEARCHLIST":
			sheet1.RemoveAll();
			btn_Search();
			break;
		case "EXCEL":	
			btn_Excel();
			break;
		case "lnk_allocation":
			lnk_allocation();
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
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WH_OUTBK_LIST_HDR1'), Align:"Center"},{ Text:getLabel('WH_OUTBK_LIST_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ 
	                  {Type:"Seq",      Hidden:0,  Width:30,		Align:"Center",  ColMerge:1,	SaveName:prefix+"seq",        	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,	   UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Date",     Hidden:0,  Width:80,		Align:"Center",  ColMerge:1,	SaveName:prefix+"bk_date",     	KeyField:0,	CalcLogic:"", Format:"Ymd",    		  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:115,		Align:"Center",  ColMerge:1,	SaveName:prefix+"wob_bk_no",   	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:90,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"cust_ord_no", 	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:65,		Align:"Center",  ColMerge:1,	SaveName:prefix+"bk_sts_nm",   	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:70,		Align:"Center",  ColMerge:1,	SaveName:prefix+"ord_tp_nm",   	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:100,		Align:"Center",  ColMerge:1,	SaveName:prefix+"item_cd",     	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:320,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"item_nm",     	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:40,		Align:"Center",  ColMerge:1,	SaveName:prefix+"item_pkgunit",	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Int",     	Hidden:0,  Width:55,		Align:"Right",	 ColMerge:1,	SaveName:prefix+"item_pkgqty", 	KeyField:0,	CalcLogic:"", Format:"Integer", 		PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:160,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"pkg_info",    	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Int",     	Hidden:0,  Width:55,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_ea_qty", 	KeyField:0,	CalcLogic:"", Format:"Integer", PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Date",     Hidden:0,  Width:80,		Align:"Center",  ColMerge:1,	SaveName:prefix+"inbound_dt",  	KeyField:0,	CalcLogic:"", Format:"Ymd",    		  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:110,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"lot_no",      	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Float",     Hidden:0,  Width:75,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_cbm",    	KeyField:0,	CalcLogic:"", Format:"Float", 		  PointCount:3,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Float",     Hidden:0,  Width:75,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_cbf",    	KeyField:0,	CalcLogic:"", Format:"Float", 		  PointCount:3,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Float",     Hidden:0,  Width:75,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_grs_kgs",	KeyField:0,	CalcLogic:"", Format:"Float", 		  PointCount:3,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Float",     Hidden:0,  Width:75,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_grs_lbs",	KeyField:0,	CalcLogic:"", Format:"Float", 		  PointCount:3,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Float",     Hidden:0,  Width:75,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_net_kgs",	KeyField:0,	CalcLogic:"", Format:"Float", 		  PointCount:3,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Float",     Hidden:0,  Width:75,		Align:"Right", 	 ColMerge:1,	SaveName:prefix+"item_net_lbs",	KeyField:0,	CalcLogic:"", Format:"Float", 		  PointCount:3,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:70,		Align:"Center",  ColMerge:1,	SaveName:prefix+"buyer_cd",    	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:160,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"buyer_nm",    	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:90,		Align:"Center",  ColMerge:1,	SaveName:prefix+"ctrt_no",     	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:110,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"ctrt_nm",     	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Date",     Hidden:0,  Width:100,		Align:"Center",  ColMerge:1,	SaveName:prefix+"exp_dt",      	KeyField:0,	CalcLogic:"", Format:"Ymd",	  		  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:80,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"lot_04",      	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:80,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"lot_05",      	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:120,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"lot_id",      	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:1,  Width:120,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"so_no",       	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Combo",     Hidden:0,  Width:140,		Align:"Center",  ColMerge:1,	SaveName:prefix+"wh_cd",       	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:0,  Width:100,		Align:"Left",  	 ColMerge:1,	SaveName:prefix+"ref_no",       	KeyField:0, Format:"",   			  PointCount:0},
	                  {Type:"Text",     Hidden:1,  Width:65,		Align:"Center",  ColMerge:1,	SaveName:prefix+"bk_sts_cd",   	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1},
	                  {Type:"Text",     Hidden:1,  Width:65,		Align:"Center",  ColMerge:1,	SaveName:prefix+"wave_no",   	KeyField:0,	CalcLogic:"", Format:"",   			  PointCount:0,    UpdateEdit:1,	InsertEdit:1}
	                  ];
	      InitColumns(cols);
		  SetSheetHeight(450);
	      SetEditable(0);
	      SetHeaderRowHeight(30);
	      SetAutoRowHeight(0);
	      SetColProperty(prefix+'wh_cd', {ComboCode:WHCDLIST1, ComboText:WHCDLIST2} );
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
	var sheetObj=sheet1;//docObjects[0];
	var seq=0;
	var seqBkNo="";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
 		
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wob_bk_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "ctrt_no", 1);
 		
 		if(i == sheetObj.HeaderRows()&& sheetObj.RowCount()> 0)
		{
 			changeAlocationBtn(sheetObj, i);
		}
	}
	doHideProcess(false);
	check_authority_wh();
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wob_bk_no":
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no"));
			break;
		case fix_grid01 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));			
			break;			
	}
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 */
/*
 * NAME 엔터시 팝업호출 - contract name
 */

/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	if(loading_flag != "Y"){
		return;
	}
	if (!validateForm(formObj, 'search')) {
		return;
	}
	formObj.f_cmd.value=SEARCH;
 	sheet1.DoSearch("./searchWHOutbkListGS.clt", FormQueryString(formObj,""));
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	var prefix = fix_grid01;
	if(docObjects[0].RowCount() < 1){//no data
	      ComShowCodeMessage("COM132501");
	    }else{
	    	sheet1.Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// Warehouse 필수			
			//bk_no 또는 warehouse, contract no둘중하나는 필수로 입력되어야함.
			if (ComIsEmpty(formObj.cond_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114","Warehouse or Contract No or Booking No");
				$("#wh_cd").focus();
				return false;
			}
			//bk_no 가 없는경우 booking Date는 필수
			if (ComIsEmpty(formObj.cond_no) && ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)) {
				ComShowCodeMessage("COM0114","Booking Date");
				$("#fm_bk_date").focus();
				return false;
			}
			//Booking No|Customer ORD No 가 없는경우 Booking Date는 필수 (MAX 93일까지)
			if (ComIsEmpty(formObj.cond_no)) {
				if (ComIsEmpty(formObj.fm_bk_date)) {
					ComShowCodeMessage("COM0114", "Booking No [Cust Order No] or Booking Date");
					formObj.fm_bk_date.focus();
					return false;
				}
				/* 3개월 duration 주석
				else {
					if (getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value) > 92) {
						ComShowCodeMessage("COM0141", "3", "(Booking Date)");
						formObj.fm_bk_date.focus();
						return false;
					}
				}
				*/
			}
			if (!ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)) {
				formObj.to_bk_date.value=ComGetNowInfo();
			}
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
			/* TinLuong comment, Function compare between date in validate calendar.
			 * if (getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)<0) {
				ComShowCodeMessage("COM0122","Booking Date!");
				formObj.fm_bk_date.focus();
				return false;
			}*/
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
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.wh_cd.value+'&type=WH', './GateServlet.gsl');
	}
	else
	{
		$("#wh_nm").val("");
	}
}
function resultLocInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.wh_cd.value="";
	    formObj.wh_nm.value=""; 
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
	
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value, './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.ctrt_nm.value = masterVals[3];
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
	}
}


//function getCtrtInfo(obj) {
//	var formObj=document.form;
//	if (obj.value == "") {
//		form.ctrt_no.value="";
//		form.ctrt_nm.value="";
//	} else {
//		searchCtrtInfo(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
//	}
//}
//function searchCtrtInfo(form, ctrt_no, col_nm) {
//	sXml=sheet1.GetSearchData("searchCtrtInfo.clt?ctrt_no="+ctrt_no);
//			resultCtrtInfo(sXml);
//}
//function resultCtrtInfo(resultXml) {
//	var formObj=document.form;
//	formObj.ctrt_no.value=getXmlDataNullToNullString(resultXml, 'ctrt_no');
//	formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml, 'ctrt_nm');
//	if (getXmlDataNullToNullString(resultXml, 'exception_msg') != "") {
//		alert(getXmlDataNullToNullString(resultXml, 'exception_msg'));
//	}
//}
/*
 * Consignee search
 * OnKeyDown 13 or onChange
 */
function getCustInfo(obj){
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+obj.value, './GateServlet.gsl');	
	}
	else
	{
		form.buyer_cd.value="";
		form.buyer_nm.value="";
	}
}
function resultCustInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.buyer_nm.value=rtnArr[0];
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

function btn_ctrt_no(){
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_no="+formObj.ctrt_no.value;
	callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl,callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
//	ComSetObjValue(formObj.ctrt_no,    aryPopupData[0][0]);
//	ComSetObjValue(formObj.ctrt_nm,    aryPopupData[0][1]);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.ctrt_no.value=rtnValAry[0];//full_nm
	   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	} 
}

function btn_buyer_cd(){
	var formObj=document.form;
    rtnary[0]="";
    rtnary[1]=formObj.buyer_nm.value;
	callBackFunc = "setBuyerInfo";
	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}
function setBuyerInfo(rtnVal){
	var formObj=document.form;
//	ComSetObjValue(formObj.buyer_cd,    aryPopupData[0][1]);
//	ComSetObjValue(formObj.buyer_nm,    aryPopupData[0][2]);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.buyer_cd.value=rtnValAry[0];//full_nm
	   formObj.buyer_nm.value=rtnValAry[2];//full_nm
	} 
}
function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "CUSTUMER"){
			formObj.buyer_cd.value="";//cust_cd  AS param1
			formObj.buyer_nm.value="";//cust_nm   AS param2
		}
		/*if (CODETYPE == "commodity") {
			formObj.itm_hts_cd.value="";// itm_hts_cd AS param1
			formObj.itm_hts_nm.value="";// itm_hts_nm AS param2
		}*/
	}
}
var CODETYPE='';
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.buyer_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.buyer_nm.value=masterVals[3];	//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.buyer_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.buyer_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.trkr_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.buyer_cd.value="";				//cust_cd  AS param1
				formObj.buyer_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.buyer_cd.value="";				//itm_hts_cd  AS param1
				formObj.buyer_nm.value="";				//itm_hts_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value="";				//itm_hts_cd  AS param1
				formObj.trkr_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function sheet1_OnClick(sheetObj, Row, Col) {
	check_authority_wh();
}

function changeAlocationBtn(sheetObj, Row)
{
	var bk_sts_cd=sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd").trim();
	if(bk_sts_cd == "I" || bk_sts_cd == 'A')
	{
		ComBtnEnable("lnk_allocation"); 
	}
	else
	{
		ComBtnDisable("lnk_allocation"); 
	}
}
/**
 * Allocation
 */
function lnk_allocation() {	
	if (document.getElementById('lnk_allocation').disabled) {
		return;
	}
	var formObj=document.form;
	var wave_no = sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wave_no")
	if(wave_no == "")
	{
		var sParam="wob_bk_no=" + sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wob_bk_no");
		var sUrl="./AllcMgmt.clt?"+sParam;
		parent.mkNewFrame('Allocation Management', sUrl);
	}
	else
	{
		var sParam="wave_no="+wave_no;
		var sUrl="./WaveMgmt.clt?"+sParam;
		parent.mkNewFrame('Wave', sUrl);
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
	var warehouse = formObj.wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("lnk_allocation");
	}else{
		ComBtnEnable("lnk_allocation");
		changeAlocationBtn(sheetObj, sheet1.GetSelectRow());
	}
}