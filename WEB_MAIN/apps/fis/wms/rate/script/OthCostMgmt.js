/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OthCostMgmt.js
*@FileTitle  : Other Costs Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
//docObjects
var docObjects=new Array();
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var firCalFlag=false;
var tempRow = 0;
var rtnary = new Array(1);
var tempCol = 0;
function doWork(srcName){
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
				cal.select(formObj.fm_trans_dt, formObj.to_trans_dt, 'MM-dd-yyyy');
			break;
			case "btn_ctrt_no" :
				CtrtPopup();
				break;
			case "btn_cust_cd" :	
				CustomerPopup();				
				break;
			case "SEARCHLIST":	
				btn_Search();
				break;
			case "btn_excel":	
				btn_Excel();
				break;
			case "SAVE":	
				btn_Save();
				break;
			case "DELETE":	
				btn_Delete();
				break;
			case "btn_add":
				btn_Add();
				break;
			case "btn_del":
				btn_Del();
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
/*
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/*
 * Sheet object 생성시 cnt 증가
 */
 function setDocumentObject(sheet_obj){
		docObjects[sheetCnt++]=sheet_obj;
	}
function loadPage(flag) {
	var formObj=document.form;	
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    /*for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }
    //control
	initControl();*/
	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));	
	$("#fm_trans_dt").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#to_trans_dt").val(ComGetNowInfo());
	//파라미터존재시 자동조회
	if($("#req_bk_cls_cd").val().trim().length > 0 
	&& $("#req_search_tp").val().trim().length > 0
	&& $("#req_search_no").val().trim().length > 0
	)
	{
		btn_Auto_Search();
	}
}
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
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
		case "sb_cls_cd":
			var txt="ALL|SELL|BUY";
			var val="ALL|S|B";
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
		case "sts_cd":
			vTextSplit=sts_cdText.split("|");
			vCodeSplit=sts_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				var idx=1;
				for(var j=0;j<vCodeSplit.length; j++){
					if(vCodeSplit[j] != "N") //NEW는 제외
					{
						InsertItem(idx,  vTextSplit[j], vCodeSplit[j]);
						idx++;
					}
				}
				comboObj.SetSelectIndex(0);
        	} 
			break;
	}
} 
/*
 * init sheet
 */ 
function initSheet(sheetObj ) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init
	      with(sheetObj){
		
		         
		         var prefix=fix_grid01;

		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:getLabel('OTH_COST_MGMT_HDR1'), Align:"Center"},{ Text:getLabel('OTH_COST_MGMT_HDR2'), Align:"Center"} ];
		         
		         InitHeaders(headers, info);

		         var cols = [ 
	                 	{Type:"CheckBox",  Hidden:0,  Width:50,    Align:"Center",  ColMerge:1,		SaveName:prefix + "chk",         		KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,	UpdateEdit:1,	InsertEdit:1, },   //checkbox
	    				{Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,		SaveName:prefix + "oth_cost_no",        KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Cost No
	    				{Type:"Combo",     Hidden:0,  Width:35,    Align:"Center",  ColMerge:1,		SaveName:prefix + "sb_cls_cd",        	KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //S/B
	    				{Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,		SaveName:prefix + "trans_dt",        	KeyField:1,	CalcLogic:"",	Format:"Ymd",	PointCount:0,					UpdateEdit:1,	InsertEdit:1},   //Transaction 
	    				{Type:"Combo",     Hidden:0,  Width:50,    Align:"Center",  ColMerge:1,		SaveName:prefix + "sts_cd",             KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Status
	    				{Type:"Date",      Hidden:0,  Width:90,    Align:"Center",  ColMerge:1,		SaveName:prefix + "cls_dt",             KeyField:0,	CalcLogic:"",	Format:"Ymd",	PointCount:0,					UpdateEdit:0,	InsertEdit:0},   //Closing Date
	    				{Type:"Text",      Hidden:0,  Width:95,    Align:"Center",  ColMerge:1,		SaveName:prefix + "cls_no",             KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Closing No
	    				{Type:"PopupEdit", Hidden:0,  Width:105,    Align:"Center",  ColMerge:1,		SaveName:prefix + "bk_no",              KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //Booking No
	    				{Type:"PopupEdit", Hidden:0,  Width:75,    Align:"Center",  ColMerge:1,		SaveName:prefix + "ofc_cd",             KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0, EditLen:10},   //Office
	    				{Type:"PopupEdit", Hidden:0,  Width:90,    Align:"Center",  ColMerge:1,		SaveName:prefix + "ctrt_no",            KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1, EditLen:10},   //Contract Cod
	    				{Type:"Text",      Hidden:0,  Width:140,   Align:"Left",    ColMerge:1,		SaveName:prefix + "ctrt_nm",            KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Contract Nam
	    				{Type:"PopupEdit", Hidden:0,  Width:55,    Align:"Center",  ColMerge:1,		SaveName:prefix + "cust_cd",            KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1, EditLen:20},   //Billing Cust
	    				{Type:"Text",      Hidden:0,  Width:240,   Align:"Left",    ColMerge:1,		SaveName:prefix + "cust_nm",            KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Billing Cust
	    				{Type:"Combo",     Hidden:0,  Width:50,    Align:"Center",  ColMerge:1,		SaveName:prefix + "frt_cd",             KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //Freight Code
	    				{Type:"Text",      Hidden:0,  Width:140,   Align:"Left",    ColMerge:1,		SaveName:prefix + "frt_nm",             KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //Freight Name
	    				{Type:"PopupEdit", Hidden:0,  Width:50,    Align:"Center",  ColMerge:1,		SaveName:prefix + "unit_cd",            KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //Unit
	    				{Type:"Int",       Hidden:0,  Width:70,    Align:"Right",   ColMerge:1,		SaveName:prefix + "ea_qty",             KeyField:1,	CalcLogic:"",	Format:"Integer",	PointCount:0,	UpdateEdit:1,	InsertEdit:1},   //EA Qty
	    				{Type:"Combo",     Hidden:0,  Width:60,    Align:"Center",  ColMerge:1,		SaveName:prefix + "curr_cd",            KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //Currency
	    				{Type:"Float",     Hidden:0,  Width:70,    Align:"Right",   ColMerge:1,		SaveName:prefix + "rate",               KeyField:0,	CalcLogic:"",	Format:"Float",	PointCount:3,								UpdateEdit:0,	InsertEdit:0},   //rate
	    				{Type:"Float",     Hidden:0,  Width:80,    Align:"Right",   ColMerge:1,		SaveName:prefix + "amt",                KeyField:1,	CalcLogic:"",	Format:"Float",	PointCount:2,								UpdateEdit:1,	InsertEdit:1},   //Amount
	    				{Type:"PopupEdit", Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,		SaveName:prefix + "rmk",                KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1, EditLen:1000},   //Remark
	    				{Type:"Combo",     Hidden:0,  Width:90,    Align:"Center",  ColMerge:1,		SaveName:prefix + "order_rel",          KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //FWD TYPE
	    				{Type:"PopupEdit", Hidden:0,  Width:60,    Align:"Center",  ColMerge:1,		SaveName:prefix + "eq_tpsz_cd",         KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //type
	    				{Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,		SaveName:prefix + "eq_no",              KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1,   EditLen:20},   //cntr/tr no
	    				{Type:"PopupEdit", Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,		SaveName:prefix + "seal_no",            KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1, EditLen:100},   //seal no
	    				{Type:"Combo",     Hidden:0,  Width:230,    Align:"Center",  ColMerge:1,		SaveName:prefix + "wh_cd",              KeyField:1,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:1,	InsertEdit:1},   //Warehouse Co
	    				{Type:"Text",      Hidden:0,  Width:180,   Align:"Left",    ColMerge:1,		SaveName:prefix + "wh_nm",              KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Warehouse Na
	    				{Type:"Text",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,		SaveName:prefix + "rgst_id",            KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Created ID
	    				{Type:"Date",      Hidden:0,  Width:85,    Align:"Center",  ColMerge:1,		SaveName:prefix + "rgst_loc_dt",        KeyField:0,	CalcLogic:"",	Format:"Ymd",	PointCount:0,					UpdateEdit:0,	InsertEdit:0},   //Created Date
	    				{Type:"Text",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,		SaveName:prefix + "modi_id",            KeyField:0,	CalcLogic:"",	Format:"",	PointCount:0,								UpdateEdit:0,	InsertEdit:0},   //Updated ID
	    				{Type:"Date",      Hidden:0,  Width:85,    Align:"Center",  ColMerge:1,		SaveName:prefix + "modi_loc_dt",        KeyField:0,	CalcLogic:"",	Format:"Ymd",	PointCount:0,					UpdateEdit:0,	InsertEdit:0},   //Updated Date
	    				{Type:"Status",    Hidden:1,  Width:30,    Align:"Center",   ColMerge:1,	SaveName:prefix + "ibflag"			},
	    				{Type:"Text",      Hidden:1,  Width:10,    Align:"Center",   ColMerge:1,	SaveName:prefix + "bk_cls_cd"		},
	    				{Type:"Text",      Hidden:1,  Width:10,    Align:"Center",   ColMerge:1,	SaveName:prefix + "eq_tp_cd"		  } ];

		         InitColumns(cols);
		         SetSheetHeight(460);
		         SetHeaderRowHeight(30);
			     SetAutoRowHeight(0);
			     resizeSheet();
			     SetColProperty(prefix+"curr_cd", {ComboText:'|'+CurrCode, ComboCode:'|'+CurrCode} );
		         SetColProperty(prefix+"frt_cd", {ComboCode:FreightCode, ComboText:FreightText} );
		         SetColProperty(prefix+"wh_cd", {ComboCode:WHCDLIST1, ComboText:WHCDLIST2} )
		         SetColProperty(prefix+"sb_cls_cd", {ComboText:"SELL|BUY", ComboCode:"S|B"} );
		 		 SetColProperty(prefix+"order_rel", {ComboText:order_relText, ComboCode:order_relCode} );
		 		 SetColProperty(prefix+"sts_cd", {ComboText:sts_cdText, ComboCode:sts_cdCode} );
		         SetEditable(1);
		         SetImageList(0,APP_PATH+"/web/img/common/icon_m.gif");
//		         sheetObj.SetImageList(0,"./web/images/common/icon_m.gif");//seal
		         SetUnicodeByte(3);
		         SetColProperty(0 ,prefix+"ctrt_no", {AcceptKeys:"E|["+"0123456789_-\"\\"+"]" , InputCaseSensitive:1});
		         SetColProperty(0 ,prefix+"cust_cd", {AcceptKeys:"E|N" , InputCaseSensitive:1});
		         SetColProperty(0 ,prefix+"ofc_cd", {AcceptKeys:"E|N" , InputCaseSensitive:1});
		         SetColProperty(0 ,prefix+"bk_no", {AcceptKeys:"E|N" , InputCaseSensitive:1});
		         SetColProperty(0 ,prefix+"unit_cd", {AcceptKeys:"E|N" , InputCaseSensitive:1});
		         SetColProperty(0 ,prefix+"eq_tpsz_cd", {AcceptKeys:"E|N" , InputCaseSensitive:1});
		         }
		         break;


	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;//sheet1;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//seal button 지정
		//no support[check again]CLT 		sheetObj.PopupButtonImage(i, fix_grid01 + "seal_no")=0;
		//상태에 따른 화면 처리
		var sts_cd=sheetObj.GetCellValue(i, fix_grid01 + "sts_cd");
		//N : New
		//S : Saved
		//C : Closed
		//Closed일경우는 모든 행이 수정불가능하다.
		if(sts_cd == "C")
		{
			sheetObj.SetRowEditable(i,0);
			//link 폰트색상 변경
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cls_no","#0100FF");
 			sheetObj.SetCellFontColor(i, fix_grid01 + "bk_no","#0100FF");
 			
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "cls_no", 1);
 			sheetObj.SetCellFontUnderline(i, fix_grid01 + "bk_no", 1);
		}
		else if(sts_cd == "N") //링크타고 넘어온경우(New상태)
		{
			sheetObj.SetCellValue(i, fix_grid01 + "ofc_cd",ComGetObjValue(formObj.org_cd));
		}
		else if(sts_cd == "S") //Saved상태
		{
			sheetObj.SetCellEditable(i, fix_grid01+ "sb_cls_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01+ "ofc_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01+ "ctrt_no",0);
			sheetObj.SetCellEditable(i, fix_grid01+ "order_rel",0);
			sheetObj.SetCellEditable(i, fix_grid01+ "wh_cd",0);
		}
	}
	doHideProcess(false);
}
/*
 * sheet1 dblclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {	
	var colName=sheetObj.ColSaveName(Col);
	var sts_cd=sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd");
	switch(colName)
	{
		case fix_grid01 + "cls_no":
			if(sts_cd == "C")
			{
				var param="?cls_no=" + sheetObj.GetCellValue(Row, fix_grid01+"cls_no");
				var sUrl="./ClosingMgmt.clt" + param;
				parent.mkNewFrame('Closing Management', sUrl,"ClosingMgmt_"+sheetObj.GetCellValue(Row, fix_grid01+"cls_no"));
			}
			break;		
		case fix_grid01 + "bk_no":		
			if(sts_cd == "C" && sheetObj.GetCellValue(Row, fix_grid01+"bk_no").trim() != "")
			{
				if(sheetObj.GetCellValue(Row, fix_grid01 + "bk_cls_cd") == "IN") //inbk
				{
					var param="?fwd_bk_no=" + sheetObj.GetCellValue(Row, fix_grid01+"bk_no");
					var sUrl="./WHInbkMgmt.clt" + param;
					parent.mkNewFrame("Inbound Booking Management", sUrl,"WHInbkMgmt_"+ sheetObj.GetCellValue(Row, fix_grid01+"bk_no"));
				}
				else
				{
					var param="?fwd_bk_no=" + sheetObj.GetCellValue(Row, fix_grid01+"bk_no");
					var sUrl="./WHOutbkMgmt.clt" + param;
					parent.mkNewFrame("Outbound Booking Management", sUrl,"WHOutbkMgmt_"+ sheetObj.GetCellValue(Row, fix_grid01+"bk_no"));
				}
			}
			break;		
	}
}
/*
 * sheet1 popupclick event
 */
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	tempRow = Row
	tempCol = Col
	with(sheetObj)
	{
		if(colName == fix_grid01 + "frt_cd")
		{
			sUrl="./FreightPopup.clt?code="+sheetObj.GetCellValue(Row, Col);
//			ComOpenPopup(sUrl, 600, 600, "setIbFrtCdGrid", "0,0", true, sheetObj, Row, Col);
			callBackFunc = "setIbFrtCdGrid";
			modal_center_open(sUrl,callBackFunc, 600,500,"yes");
		}
		else if(colName == fix_grid01 + "ctrt_no")
		{
			var sUrl="./ContractRoutePopup.clt?ctrt_no="+sheetObj.GetCellValue(Row, Col);
//	    	ComOpenPopup(sUrl, 800, 620, "setContactInfoGrid", "0,0", true, sheetObj, Row, Col);
			callBackFunc = "setContactInfoGrid";
			modal_center_open(sUrl,callBackFunc, 900, 580,"yes");
		}
		else if(colName == fix_grid01 + "cust_cd")
		{
			var formObj=document.form;
		    rtnary[0]="";
		    rtnary[1]=sheetObj.GetCellValue(Row, (fix_grid01+"cust_nm"));
			callBackFunc = "setCustInfoGrid";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}
		else if (colName == fix_grid01 + "rmk")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
		}
		else if (colName == fix_grid01 + "seal_no")
		{
			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
		}
		else if (colName == fix_grid01 + "eq_tpsz_cd" ) 
		{
			var tp="A";
			if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
			{
				tp=sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd"));
			}
			sUrl="./ContainerTypePopup.clt?type="+tp+"&eq_unit="+sheetObj.GetCellValue(Row, Col);
//			ComOpenPopup(sUrl, 400, 600, "setContainerTypeInfoGrid", "0,0", true, sheetObj, Row, Col);
			callBackFunc = "setContainerTypeInfoGrid";
			modal_center_open(sUrl,callBackFunc, 400, 590,"yes");
		}
		else if(colName == fix_grid01 + "ofc_cd")
		{
			var sUrl="./CMM_POP_0150.clt?ofc_cd=" + sheetObj.GetCellValue(Row, Col);
			callBackFunc = "setOfficeInfoGrid";
			modal_center_open(sUrl,callBackFunc, 500,400,"yes");
		}
		else if(colName == fix_grid01 + "bk_no")
		{
			/*
		if(sheetObj.GetCellValue(Row, (fix_grid01+"wh_cd")) == "")
			{
				ComShowCodeMessage("COM0114","Warehouse");
				sheetObj.SelectCell(Row, fix_grid01 +  "wh_cd");
				return;
			}
		if(sheetObj.GetCellValue(Row, (fix_grid01+"ctrt_no")) == "")
			{
				ComShowCodeMessage("COM0114","Contract");
				sheetObj.SelectCell(Row, fix_grid01 +  "ctrt_no");
				return;
			}
			*/
			var cond_search_yn="Y";
			if(sheetObj.GetCellValue(Row, (fix_grid01+"sts_cd")) == "S")
			{
				//Saved상태이면 입력된 wh_cd, ctrt_no에 해당하는 부킹만 조회되어야함. 
				//그외는 wh_cd, ctrt_no에 상관없이 조회가능
				cond_search_yn="N";
			}
			var sUrl="./WHBookingPopup.clt?cond_search_yn=" + cond_search_yn + "&ctrt_no="+ sheetObj.GetCellValue(Row, (fix_grid01+"ctrt_no"))+ "&ctrt_nm="+sheetObj.GetCellValue(Row, (fix_grid01+"ctrt_nm"))
			+ "&wh_cd="+sheetObj.GetCellValue(Row, (fix_grid01+"wh_cd"));
			callBackFunc = "setBookingGrid";
			modal_center_open(sUrl,callBackFunc, 800, 550,"yes");
		}
		else if(colName == fix_grid01 + "unit_cd")
		{
			var sUrl="./CommonCodePopup.clt?grp_cd=Z3&code="+sheetObj.GetCellValue(Row, Col);
//			ComOpenPopup(sUrl, 400, 560, "setUnitGrid", "0,0", true, sheetObj, Row, Col);
			callBackFunc = "setUnitGrid";
			modal_center_open(sUrl,callBackFunc, 400,520,"yes");
		}
	}
}
/*
 * sheet1 onchange event
 */
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	tempRow = Row;
	if ( colName == fix_grid01 + "curr_cd" ){ 
		getRate(sheetObj, Row, Col);
	}
	else if ( colName == fix_grid01 + "cust_cd" ) 
	{
		if(Value != "")
		{
			ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+Value, './GateServlet.gsl');
			getCurrency(sheetObj, Row, Col);
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "cust_nm","");
			getCurrency(sheetObj, Row, Col);
		}
	
	} 
	else if ( colName == fix_grid01 + "frt_cd" ) 
	{
//		var frt = sheet1.GetCellText(Row,colName).split("\t");
		var frt = map2[sheet1.GetCellValue(Row,fix_grid01 + "frt_cd")];
		if(frt!=""){
			sheet1.SetCellValue(Row,fix_grid01 + "frt_nm", frt);
		}else{
			sheet1.SetCellValue(Row,fix_grid01 + "frt_nm", "");
		}
	}  
	else if ( colName == fix_grid01 + "ctrt_no" ) 
	{
		if(Value != "")
		{
			ajaxSendPost(setCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+Value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "bk_no","");
			sheetObj.SetCellValue(Row, fix_grid01 + "bk_cls_cd","");
			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_nm","");
			getCurrency(sheetObj, Row, Col);
		}
	}
	else if ( colName == fix_grid01 + "wh_cd" ) 
	{
		var whNm = map1[sheet1.GetCellValue(Row,colName)];
		if(whNm!="")
			sheet1.SetCellValue(Row,fix_grid01 + "wh_nm", whNm);
		else sheet1.SetCellValue(Row,fix_grid01 + "wh_nm","");
	}
	else if ( colName == fix_grid01 + "ofc_cd" ) 
	{
		if(Value != "")
		{
			ajaxSendPost(setORGName, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&office_cd='+Value, './GateServlet.gsl');
		}
		else
		{
			getCurrency(sheetObj, Row, Col);
		}
		sheetObj.SelectCell(Row, Col);
	}
	else if(colName == fix_grid01 + "eq_tpsz_cd") 
	{
		if(Value != "")
		{
			ajaxSendPost(setCntrTrTp, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&cntr_tp='+Value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01+"eq_tp_cd","");
		}
	}
	else if (colName == fix_grid01 + "bk_no") 
	{
		if(Value != "")
		{
			var cond_search_yn="Y";
			var ctrt_no="";
			var wh_cd="";
			if(sheetObj.GetCellValue(Row, (fix_grid01+"sts_cd")) == "S")
			{
				//Saved상태이면 입력된 wh_cd, ctrt_no에 해당하는 부킹만 조회되어야함. 
				//그외는 wh_cd, ctrt_no에 상관없이 조회가능
				cond_search_yn="N";
				ctrt_no=sheetObj.GetCellValue(Row, (fix_grid01+"ctrt_no"));
				wh_cd=sheetObj.GetCellValue(Row, (fix_grid01+"wh_cd"));
			}
			ajaxSendPost(setBKNo, 'reqVal', '&goWhere=aj&bcKey=searchWHBookingInfo&ctrt_no=' + ctrt_no + '&wh_cd=' + wh_cd + '&bk_no=' + Value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(Row,  fix_grid01+"bk_cls_cd","",0);
			//sheetObj.CellValue2(Row,  fix_grid01+"order_rel") = "";
		}
	}
	else if(colName == fix_grid01 + "unit_cd")
	{
		if(Value != "")
		{
			ajaxSendPost(setUnitCd, 'reqVal' , '&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=Z3&code_cd='+Value, './GateServlet.gsl');
		}
		else
		{
			getCurrency(sheetObj, Row, Col);
		}
	}
	else if ( colName == fix_grid01 + "trans_dt" ) 
	{
		getCurrency(sheetObj, Row, Col);
	}
	else if( colName == fix_grid01 + "sb_cls_cd" ) 
	{
		getCurrency(sheetObj, Row, Col);
	}
	else if( colName == fix_grid01 + "rate" || colName == fix_grid01 + "ea_qty" ) 
	{
		var rate=eval(sheetObj.GetCellValue(Row, fix_grid01 + "rate"));
		var ea_qty=eval(sheetObj.GetCellValue(Row, fix_grid01 + "ea_qty"));
		sheetObj.SetCellValue(Row, fix_grid01 + "amt",rate * ea_qty,0);
	}
}
function setTlCtrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(rtnArr[0] != ""){
				sheet1.SetCellValue(tempRow, fix_grid01 + "cust_cd",masterVals[0]);
				sheet1.SetCellValue(tempRow, fix_grid01 + "cust_nm",masterVals[3]);
				
			}
			else{
				sheet1.SetCellValue(tempRow, fix_grid01 + "cust_cd","");	
				sheet1.SetCellValue(tempRow, fix_grid01 + "cust_nm","");
			}
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "cust_cd","");	
			sheet1.SetCellValue(tempRow, fix_grid01 + "cust_nm","");
		}
	}
	else{
		alert(getLabel('SEE_BMD_MSG43'));
	}
	sheet1.SelectCell(tempRow,fix_grid01 + "cust_cd");
}

function setBKNo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet1.SetCellValue(tempRow, fix_grid01 + "bk_no",rtnArr[0]);
//				sheet1.SetCellValue(tempRow, fix_grid01 + "bk_no",rtnArr[5]);
//				sheet1.SetCellValue(tempRow, fix_grid01 + "bk_cls_cd",rtnArr[7]);
//				sheet1.SetCellValue(tempRow, fix_grid01 + "order_rel",rtnArr[10]);
				if(sheet1.GetCellValue(tempRow, (fix_grid01+"sts_cd")) == "N"){
//					sheet1.SetCellValue(tempRow, fix_grid01 + "wh_cd",rtnArr[11]);
//					sheet1.SetCellValue(tempRow, fix_grid01 + "wh_nm",rtnArr[12]);
//					sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_no",rtnArr[1]);
//					sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_nm",rtnArr[2]);
					getCurrency(sheetObj, tempRow, tempCol);
				}
			}
			else{
				sheet1.SetCellValue(tempRow, fix_grid01 + "bk_no","");	
			}
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "bk_no","");	
		}
	}
	else{
		alert(getLabel('SEE_BMD_MSG43'));
	}
	sheet1.SelectCell(tempRow,fix_grid01 + "bk_no");
}
function setIbCommonCodeInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(tempRow, fix_grid01 + "curr_cd",rtnArr[0]);
			
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "curr_cd","");
			sheet1.SelectCell(tempRow,fix_grid01 + "curr_cd");
		}
	}else{
		sheet1.SetCellValue(tempRow, fix_grid01 + "curr_cd","");	
		sheet1.SelectCell(tempRow,fix_grid01 + "curr_cd");
	}
	getRate(sheet1, Row, Col);
}
function setUnitCd(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(tempRow, fix_grid01 + "unit_cd",rtnArr[0]);
			
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "unit_cd","");	
		}
	}else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "unit_cd","");	
	}
	sheet1.SelectCell(tempRow,fix_grid01 + "unit_cd");
}
function setIbTlFreightInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet1.SetCellValue(tempRow,fix_grid01 + 'frt_nm', rtnArr[0]);
				sheet1.SetCellValue(tempRow,fix_grid01 + 'frt_cd', rtnArr[1]);
				
			}
			else{
				sheet1.SetCellValue(tempRow,fix_grid01 + 'frt_cd', '',0);
				sheet1.SetCellValue(tempRow,fix_grid01 + 'frt_nm', '',0);
			}
		}
		else{
			sheet1.SetCellValue(tempRow,fix_grid01 + 'frt_cd', '',0);
			sheet1.SetCellValue(tempRow,fix_grid01 + 'frt_nm', '',0);
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
	sheet1.SelectCell(tempRow,fix_grid01 + "frt_cd");
}
function setCtrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('@@^');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_no",rtnArr[0]);
			sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_nm",rtnArr[3]);
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_no","");	
			sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_nm","");
		}
	}else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_no","");	
			sheet1.SetCellValue(tempRow, fix_grid01 + "ctrt_nm","");
	}
	sheet1.SetCellValue(tempRow, fix_grid01 + "bk_no","");
	sheet1.SetCellValue(tempRow, fix_grid01 + "bk_cls_cd","");
	sheet1.SelectCell(tempRow,fix_grid01 + "ctrt_no");
}
function setLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(tempRow, fix_grid01 + "wh_cd",rtnArr[1]);
			sheet1.SetCellValue(tempRow, fix_grid01 + "wh_nm",rtnArr[0]);
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "wh_cd","");	
			sheet1.SetCellValue(tempRow, fix_grid01 + "wh_nm","");
		}
	}else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "wh_cd","");	
			sheet1.SetCellValue(tempRow, fix_grid01 + "wh_nm","");
	}
	
	sheet1.SetCellValue(tempRow, fix_grid01 + "bk_no","");
	sheet1.SetCellValue(tempRow, fix_grid01 + "bk_cls_cd","");
	sheet1.SelectCell(tempRow,fix_grid01 + "ctrt_no");
}
function setORGName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(tempRow, fix_grid01 + "ofc_cd",rtnArr[1]);
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "ofc_cd","");
		}
	}else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "ofc_cd","");	
	}
	sheet1.SelectCell(tempRow,fix_grid01 + "ctrt_no");
}
function setCntrTrTp(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheet1.SetCellValue(tempRow, fix_grid01 + "eq_tpsz_cd",rtnArr[0],0);
			sheet1.SetCellValue(tempRow, fix_grid01 + "eq_tp_cd",rtnArr[1],0);
		}
		else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "eq_tpsz_cd","");
			sheet1.SetCellValue(tempRow, fix_grid01 + "eq_tp_cd","");
		}
	}else{
			sheet1.SetCellValue(tempRow, fix_grid01 + "eq_tpsz_cd","");
			sheet1.SetCellValue(tempRow, fix_grid01 + "eq_tp_cd","");
	}
	sheet1.SelectCell(tempRow,fix_grid01 + "ctrt_no");
}
function setCurrCdGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "curr_cd",rtnValAry[1],0);
	} 
	getRate(sheetObj, tempRow, tempCol);
}
function setIbFrtCdGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "frt_cd",rtnValAry[1],0);
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "frt_nm",rtnValAry[0],0);
	}
	getCurrency(sheetObj, tempRow, tempCol);
}
function setContactInfoGrid(rtnVal){
	var sheetObj=sheet1;
	var row = sheetObj.GetSelectRow();
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "ctrt_no",rtnValAry[0],0);
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "ctrt_nm",rtnValAry[1],0);
	}
	sheetObj.SetCellValue(row, fix_grid01 + "bk_no","",0);
	sheetObj.SetCellValue(row, fix_grid01 + "bk_cls_cd","",0);
	getCurrency(sheetObj, tempRow, tempCol);
}

function setOfficeInfoGrid(rtnVal) {
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "ofc_cd",rtnValAry[0],0);
	}
	getCurrency(sheetObj,tempRow, tempCol);
}
function setCustInfoGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "cust_cd",rtnValAry[0],0);
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "cust_nm",rtnValAry[2],0);
	}
	getCurrency(sheetObj, tempRow, tempCol);
}

function setContainerTypeInfoGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "eq_tpsz_cd",rtnValAry[0],0);
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "eq_tp_cd",rtnValAry[3],0);
	}
}
function setBookingGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "bk_no",rtnValAry[5],0);
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "bk_cls_cd",rtnValAry[7],0);
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "order_rel",rtnValAry[10],0);
	}
	if(sheetObj.GetCellValue(tempRow, (fix_grid01+"sts_cd")) == "N"){
		sheetObj.SetCellValue(tempRow, fix_grid01 + "wh_cd",rtnValAry[11],0);
		sheetObj.SetCellValue(tempRow, fix_grid01 + "wh_nm",rtnValAry[12],0);
		sheetObj.SetCellValue(tempRow, fix_grid01 + "ctrt_no",rtnValAry[1],0);
		sheetObj.SetCellValue(tempRow, fix_grid01 + "ctrt_nm",rtnValAry[2],0);
		getCurrency(sheetObj, tempRow, tempCol);
	}
}
function setUnitGrid(rtnVal){
	var sheetObj=sheet1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   sheetObj.SetCellValue(tempRow , fix_grid01 + "unit_cd",rtnValAry[1],0);
	}
	getCurrency(sheetObj, tempRow, tempCol);
}
//rate에 등록된 정보를 가져온다.(currency, unit_price)
function getCurrency(sheetObj, row, col){
	//신규로 추가된 행일 경우만 Rate를 가져오는 트랜잭션을 태운다.
	//if(sheetObj.RowStatus(row) != "I") 
	//{
	//	return;
	//}
	var formObj=document.form;
	var wh_cd=sheet1.GetCellValue(row, fix_grid01 + "wh_cd").trim();
	var trans_dt=sheet1.GetCellValue(row, fix_grid01 + "trans_dt").trim();
	var sb_cls_cd=sheet1.GetCellValue(row, fix_grid01 + "sb_cls_cd").trim();
	var ofc_cd=sheet1.GetCellValue(row, fix_grid01 + "ofc_cd").trim();
	var ctrt_no=sheet1.GetCellValue(row, fix_grid01 + "ctrt_no").trim();
	var cust_cd=sheet1.GetCellValue(row, fix_grid01 + "cust_cd").trim();
	var frt_cd=sheet1.GetCellValue(row, fix_grid01 + "frt_cd").trim();
	var unit_cd=sheet1.GetCellValue(row, fix_grid01 + "unit_cd").trim();
	if(wh_cd == "" || sb_cls_cd == "" || trans_dt == "" || ofc_cd == "" || ctrt_no == "" || cust_cd == "" || frt_cd == "" || unit_cd == "")
	{
		sheet1.SetCellValue(row, fix_grid01 + "rate",0);
		return;
	}
	formObj.f_cmd.value=SEARCH03;
	var sXml=sheet1.GetSearchData("./searchRateInfoForOthCostGS.clt?trans_dt="+trans_dt
												+ "&ofc_cd="+ ofc_cd
												+ "&ctrt_no="+ ctrt_no
												+ "&cust_cd="+ cust_cd
												+ "&frt_cd="+ frt_cd
												+ "&unit_cd="+ unit_cd
												+ "&sb_cls_cd=" + sb_cls_cd
												+ "&wh_cd=" + wh_cd + "&f_cmd="+formObj.f_cmd.value);
		//if(getXmlDataNullToNullString(result.xml,'curr_cd') != "")
		//{
	if(sXml.replace(/^\s+|\s+$/gm,'') != ""){
	    var xmlDoc = $.parseXML(sXml);
	    var $xml1 = $(xmlDoc);
		var curr_cd = $xml1.find("curr_cd").text();
		sheet1.SetCellValue(row, fix_grid01 + "curr_cd",curr_cd,0);
		var unit_price = $xml1.find("unit_price").text();
		if(unit_price=="") unit_price = 0;
		sheet1.SetCellValue(row, fix_grid01 + "rate",unit_price);
	}else{
		ComShowCodeMessage("COM12151");
	}
		//}
}
//rate에 등록된 정보를 가져온다.(unit_price)
function getRate(sheetObj, row, col){
	//신규로 추가된 행일 경우만 Rate를 가져오는 트랜잭션을 태운다.
	//isheet1bj.RowStatus(row) != "I") 
	//{
	//	return;
	//}
	var formObj=document.form;
	var wh_cd=sheet1.GetCellValue(row, fix_grid01 + "wh_cd").trim();
	var trans_dt=sheet1.GetCellValue(row, fix_grid01 + "trans_dt").trim();
	var sb_cls_cd=sheet1.GetCellValue(row, fix_grid01 + "sb_cls_cd").trim();
	var ofc_cd=sheet1.GetCellValue(row, fix_grid01 + "ofc_cd").trim();
	var ctrt_no=sheet1.GetCellValue(row, fix_grid01 + "ctrt_no").trim();
	var cust_cd=sheet1.GetCellValue(row, fix_grid01 + "cust_cd").trim();
	var frt_cd=sheet1.GetCellValue(row, fix_grid01 + "frt_cd").trim();
	var curr_cd=sheet1.GetCellValue(row, fix_grid01 + "curr_cd").trim();
	var unit_cd=sheet1.GetCellValue(row, fix_grid01 + "unit_cd").trim();
	if(wh_cd == "" || sb_cls_cd == "" || trans_dt == "" || ofc_cd == "" || ctrt_no == "" || cust_cd == "" || frt_cd == "" || curr_cd == "" || unit_cd == "")
	{
		sheet1.SetCellValue(row, fix_grid01 + "rate",0);
		return;
	}
	formObj.f_cmd.value=SEARCH03;
	var sXml=sheet1.GetSearchData("./searchRateInfoForOthCostGS.clt?trans_dt="+trans_dt
												+ "&ofc_cd="+ ofc_cd
												+ "&ctrt_no="+ ctrt_no
												+ "&cust_cd="+ cust_cd
												+ "&frt_cd="+ frt_cd
												+ "&curr_cd="+ curr_cd
												+ "&unit_cd="+ unit_cd
												+ "&sb_cls_cd=" + sb_cls_cd
												+ "&wh_cd=" + wh_cd + "&f_cmd="+formObj.f_cmd.value);
	if(sXml.replace(/^\s+|\s+$/gm,'') != ""){
	    var xmlDoc = $.parseXML(sXml);
	    var $xml1 = $(xmlDoc);
		var unit_price = $xml1.find("unit_price").text();
		if(unit_price=="") unit_price = 0;
		sheet1.SetCellValue(row, fix_grid01 + "rate",unit_price,0);
	}else{
		ComShowCodeMessage("COM12151");
	}
			/*if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				//alert(getXmlDataNullToNullString(sXml,'exception_msg'));
				sheet1.SetCellValue(row, fix_grid01 + "rate",0,0);
			}
			*/
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */

/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			default:		
				if(!(t.readOnly)){
				}
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}
/**
 * 버튼 클릭 이벤트모음 시작
 */
/*
 * Search
 */
function btn_Search() {
	var formObj=document.form;
	if (validateForm(formObj, 'search') == false) 
	{
		return;
	}
	$("#req_bk_cls_cd").val("");
	$("#req_search_tp").val("");
	$("#req_search_no").val("");
	$("#sel_oth_cost_no").val("");
	searchInfo();
}
/*
 * 자동조회
 */
function btn_Auto_Search()
{
//	doShowProcess(true);
	setTimeout(function(){
	searchInfo();
	},100);
}
function searchInfo()
{
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
	sheet1.RemoveAll();
 	sheet1.DoSearch("./searchOthCostMgmtListGS.clt", FormQueryString(formObj,""));
}
/*
 * Save
 */
function btn_Save() {
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'save') == false) 
	{
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0063"))
	{ 
		return;
	}
	formObj.f_cmd.value=SEARCH01;
	var sheetDatas=ComGetSaveString(sheet1, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
 	var saveXml=sheet1.GetSaveData("./saveOthCostMgmtGS.clt", sheetDatas, "&f_cmd="+formObj.f_cmd.value);
 	sheet1.LoadSaveData(saveXml);
	//1. Save 후 조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
//		ComShowCodeMessage("COM0093", "");
		
		//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		if(saveXml.replace(/^\s+|\s+$/gm,'') != ""){
		    var xmlDoc = $.parseXML(saveXml);
		    var $xml1 = $(xmlDoc);
			var sel_oth_cost_no = $xml1.find("sel_oth_cost_no").text();
		}else{
			ComShowCodeMessage("COM12151");
		}
//		var sel_oth_cost_no=GetEtcData(saveXml, "sel_oth_cost_no");
		$("#sel_oth_cost_no").val(sel_oth_cost_no);
		$("#req_bk_cls_cd").val("");
		$("#req_search_tp").val("");
		$("#req_search_no").val("");
		searchInfo();
	}
}
/*
 * 트랜잭션 delete
 */
function btn_Delete() {
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'delete') == false) 
	{
		return;
	}
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//confirm
	if(!ComShowCodeConfirm("COM0053")){
		return;
	}
	formObj.f_cmd.value=SEARCH02;
	//신규건 화면에서 일단삭제
	var sRowI=sheetObj.FindStatusRow("I");
	var arrRowI=sRowI.split(";");
	//삭제처리
	for (var i=arrRowI.length-2; i>=0; i--){
		sheetObj.RowDelete(arrRowI[i], false);
	}
	var sheetDatas1=ComGetSaveString(sheetObj, true, true); //sheetObjs, bUrlEncode, allSave, col
	var isheetSaveParamters=sheetDatas1;
 	saveXml=sheetObj.GetSaveData("./deleteOthCostMgmtGS.clt",sheetDatas1, "&f_cmd="+formObj.f_cmd.value );
 	sheetObj.LoadSaveData(saveXml);
	if( saveXml.indexOf('<MESSAGE>') == -1){
//		ComShowCodeMessage("COM0080", "");	
		
		//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		
		if(saveXml.replace(/^\s+|\s+$/gm,'') != ""){
		    var xmlDoc = $.parseXML(saveXml);
		    var $xml1 = $(xmlDoc);
			var sel_oth_cost_no = $xml1.find("sel_oth_cost_no").text();
		}else{
			ComShowCodeMessage("COM12151");
		}
//		var sel_oth_cost_no=ComGetEtcData(saveXml, "sel_oth_cost_no");
		$("#sel_oth_cost_no").val(sel_oth_cost_no);
		$("#req_bk_cls_cd").val("");
		$("#req_search_tp").val("");
		$("#req_search_no").val("");
		searchInfo();
	}
}
function btn_Excel() {
	if(sheet1.RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	sheet1.Down2Excel( {DownCols: makeHiddenSkipCol(sheet1), SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
    }	
}
/*
 * 신규 row add
 */
function btn_Add() {
	var formObj=document.form;
	var sheetObj=sheet1;
	var row=sheetObj.DataInsert(sheetObj.LastRow()+ 1); //
	//seal button 지정
	//no support[check again]CLT 	sheetObj.PopupButtonImage(row, fix_grid01 + "seal_no")=0;
	sheetObj.SetCellValue(row, fix_grid01 + "order_rel","P",0);// P : Domestic Only
	sheetObj.SetCellValue(row, fix_grid01 + "sts_cd","N",0);// NEW
	sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd",ComGetObjValue(formObj.org_cd),0);
	if($("#wh_cd").val().trim().length>0)
	{
		sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",ComGetObjValue(formObj.wh_cd));
	}else{
		sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",ComGetObjValue(formObj.def_wh_cd));
	}
	if($("#ctrt_no").val().trim().length>0)
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",ComGetObjValue(formObj.ctrt_no));
	}
	else
	{
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",ComGetObjValue(formObj.def_wh_ctrt_no));
	}
}

function setNamerWH(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var row = sheet2.GetSelectRow();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "" && rtnArr[0] != "null"){
				sheet2.SetCellValue(row,"loc_addr",rtnArr[0],0);
			}
			else{
				sheet2.SetCellValue(row,"loc_addr","",0);
			}
		}
		else{
			sheet2.SetCellValue(row,"loc_addr","",0);
		}
	}
}


/*
 * 신규로 추가된 row만 삭제처리(화면상)
 */
function btn_Del() {
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//가져온 행을 배열로 만들기 
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//삭제처리
	for (var i=arrRow.length-1; i>=0; i--){		
		if(sheetObj.GetRowStatus(arrRow[i]) == "I") //신규등록된건만 삭제
		{
			sheetObj.RowDelete(arrRow[i], false);
		}
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'search':
				//booking Date 체크
				if(formObj.wh_cd.value == ""){
				    ComShowCodeMessage("COM12233");
				    return false;
			    }
				if(ComIsEmpty(formObj.fm_trans_dt) && ComIsEmpty(formObj.to_trans_dt))
				{
					ComShowCodeMessage("COM0114","Transaction Date");
					$("#fm_trans_dt").focus();
					return false;
				}
				if(!ComIsEmpty(formObj.fm_trans_dt) && ComIsEmpty(formObj.to_trans_dt)){
					formObj.to_trans_dt.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.fm_trans_dt) && !isDate(formObj.fm_trans_dt)) {
					ComShowCodeMessage("COM0114","Transaction Date");
					formObj.fm_trans_dt.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.to_trans_dt) && !isDate(formObj.to_trans_dt)) {
					ComShowCodeMessage("COM0114","Transaction Date");
					formObj.to_trans_dt.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.fm_trans_dt)&&ComIsEmpty(formObj.to_trans_dt))||(ComIsEmpty(formObj.fm_trans_dt)&&!ComIsEmpty(formObj.to_trans_dt))) {
					ComShowCodeMessage("COM0122","Transaction Date");
					formObj.fm_trans_dt.focus();
					return false;
				}
				if (getDaysBetween2(formObj.fm_trans_dt.value, formObj.to_trans_dt.value)<0) {
					ComShowCodeMessage("COM0122","Transaction Date");
					formObj.fm_trans_dt.focus();
					return false;
				}
				break;
			case "save":
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "save");
					return false;
				}*/
				var sheetObj=sheet1;
				if(sheetObj.IsDataModified()== false)
				{
					ComShowCodeMessage("COM0323","");
					return false;
				}
				for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
					if(sheetObj.GetRowStatus(i) == "I" || //신규입력건
							sheetObj.GetRowStatus(i) == "U" )  //또는 수정건만 VALID체크 (속도때문에)
					{
						//--Transation Date 체크
						if(sheetObj.GetCellValue(i, fix_grid01 + "trans_dt").trim() == "")
						{
							ComShowCodeMessage("COM0114","Transation Date");
							sheetObj.SelectCell(i, fix_grid01 +  "trans_dt");
							return false;
						}
						//--Office 체크
						if(sheetObj.GetCellValue(i, fix_grid01 + "ofc_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Office");
							sheetObj.SelectCell(i, fix_grid01 +  "ofc_cd");
							return false;
						}
						//--Contract 체크
						if(sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no").trim() == "")
						{
							ComShowCodeMessage("COM0114","Contract");
							sheetObj.SelectCell(i, fix_grid01 +  "ctrt_no");
							return false;
						}
						//--billing customer 체크
						if(sheetObj.GetCellValue(i, fix_grid01 + "cust_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Billing Customer");
							sheetObj.SelectCell(i, fix_grid01 +  "cust_cd");
							return false;
						}
						//--Freight
						if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Freight Code");
							sheetObj.SelectCell(i, fix_grid01 +  "frt_cd");
							return false;
						}
						if(sheetObj.GetCellValue(i, fix_grid01 + "frt_nm").trim() == "")
						{
							ComShowCodeMessage("COM0114","Freight Name");
							sheetObj.SelectCell(i, fix_grid01 +  "frt_nm");
							return false;
						}
						if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Unit");
							sheetObj.SelectCell(i, fix_grid01 +  "unit_cd");
							return false;
						}
						//--Qty
						/*var ea_qty=eval(sheetObj.GetCellValue(i, fix_grid01 + "ea_qty"));
						if(ea_qty <= 0)
						{
							ComShowCodeMessage("COM0114","Qty");
							sheetObj.SelectCell(i, fix_grid01 +  "ea_qty");
							return false;
						}
						*/
						//--Currency
						if(sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Currency");
							sheetObj.SelectCell(i, fix_grid01 +  "curr_cd");
							return false;
						}
						//--Amount
						/*var amt=eval(sheetObj.GetCellValue(i, fix_grid01 + "amt"));
						if(amt <= 0)
						{
							ComShowCodeMessage("COM0114","Amount");
							sheetObj.SelectCell(i, fix_grid01 +  "amt");
							return false;
						}
						*/
						//--Warehouse 체크
						if(sheetObj.GetCellValue(i, fix_grid01 + "wh_cd").trim() == "")
						{
							ComShowCodeMessage("COM0114","Warehouse");
							sheetObj.SelectCell(i, fix_grid01 +  "wh_cd");
							return false;
						}
					}
				}
				break;
			case "delete":
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "delete");
					return false;
				}*/
				break;
		}
	}
	return true;
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_no=" + formObj.ctrt_no.value +"&ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 620, "setCtrtNoInfo", "0,0", true);
	callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl,callBackFunc, 900, 580,"yes");
}
/*
 * NAME 엔터시 팝업호출 - customer name
 */
function CustomerPopup(){
	var formObj=document.form;
    rtnary[0]="";
    rtnary[1]=formObj.cust_nm.value;
	callBackFunc = "setBuyerInfo";
	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
}
function setBuyerInfo(rtnVal){
	var formObj=document.form;
//	ComSetObjValue(formObj.buyer_cd,    aryPopupData[0][1]);
//	ComSetObjValue(formObj.buyer_nm,    aryPopupData[0][2]);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	}else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.cust_cd.value=rtnValAry[0];//full_nm
	   formObj.cust_nm.value=rtnValAry[2];//full_nm
	} 
}
/*
 * 팝업 관련 로직 시작
 */
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

/*
 * 팝업 관련 로직 끝
 */
/*
***
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
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value, './GateServlet.gsl');
	}
	else
	{
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	}
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
/*
* Customer search
* OnKeyDown 13 or onChange
*/
function getCustomerInfo(obj){
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+formObj.cust_cd.value, './GateServlet.gsl');
	}
	else
	{
		form.cust_cd.value="";
		form.cust_nm.value="";
	}
}
function resultCustInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(rtnArr[0] != ""){
				formObj.cust_cd.value=masterVals[0];
				formObj.cust_nm.value=masterVals[3];
			}
			else{
				formObj.cust_cd.value="";
				formObj.cust_nm.value="";	
			}
		}
		else{
			formObj.cust_cd.value="";
			formObj.cust_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
