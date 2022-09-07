var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
function loadPage() {
	var formObj=document.form;	
	doShowProcess();
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
    doHideProcess();
    loading_flag="Y";
	initControl();
	// Warehouse&Contract 세션 정보 Default 세팅
    formObj.wh_cd.value = ComGetObjValue(formObj.def_wh_cd);
    formObj.wh_nm.value = ComGetObjValue(formObj.def_wh_nm);
    formObj.ctrt_no.value = ComGetObjValue(formObj.def_wh_ctrt_no);	
    formObj.ctrt_nm.value = ComGetObjValue(formObj.def_wh_ctrt_nm);	
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj, comboNo) {
	switch(comboObj.id) {
	case "tlo_sts_cd":
		var vTextSplit=tlo_sts_cdText.split("|");
		var vCodeSplit=tlo_sts_cdCode.split("|");
		with(comboObj) {
			comboObj.SetDropHeight(125);
			InsertItem(0,  "ALL", "ALL");
			for(var j=0;j<vCodeSplit.length; j++){
				InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=1;
    	} 			
		break;		
	case "bkg_sts_cd":
		var vTextSplit=bkg_sts_cdText.split("|");
		var vCodeSplit=bkg_sts_cdCode.split("|");
		with(comboObj) {
			comboObj.SetDropHeight(125);
			InsertItem(0,  "ALL", "ALL");
			for(var j=0;j<vCodeSplit.length; j++){
				InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
    	} 			
		break;		
	case "trans_tp_cd":
		var vTextSplit=trans_tp_cdText.split("|");
		var vCodeSplit=trans_tp_cdCode.split("|");
		with(comboObj) {
			comboObj.SetDropHeight(125);
			InsertItem(0,  "ALL", "ALL");
			for(var j=0;j<vCodeSplit.length; j++){
				InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index=0;
    	} 			
		break;
	}
} 
function initControl() {
	var formObject=document.form;
	/*axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
	axon_event.addListenerForm("change", "form_onChange", formObject);    
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);*/
	
	document.onchange = form_onChange;
	document.onkeydown = obj_keydown;
}
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (srcName == "wh_loc_nm") {
		if (srcValue != "") {
			var sParam="f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + srcValue;
			ajaxSendPost(resultWarehouseLocInfoForName, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		} else {
			ComSetObjValue(formObj.wh_loc_cd,     ""); // wh_loc_cd
			ComSetObjValue(formObj.wh_loc_nm,     ""); // wh_loc_nm
		}				
	}else if (srcName == "trucker_cd") {
		if (!ComIsNull(srcValue)){
			var sParam="cust_cd="+ComGetObjValue(formObj.trucker_cd);
			ajaxSendPost(resultTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&'+sParam, './GateServlet.gsl');
		}else{
			formObj.trucker_cd.value="";
			formObj.trucker_nm.value="";
		}			
	}else if(srcName == "node_loc_cd" && !(formObj.btn_node_loc_cd.disabled)){
		var parm="loc_cd="+ComGetObjValue(formObj.node_loc_cd);
		if (!ComIsNull(srcValue)){
			ajaxSendPost(resultTlLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&'+parm, './GateServlet.gsl');
		} else {
			formObj.node_loc_cd.value="";
			formObj.node_loc_nm.value="";
		}
	}
}
function resultWarehouseLocInfoForName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				ComSetObjValue(formObj.wh_loc_cd, rtnArr[0]); // wh_loc_cd
				ComSetObjValue(formObj.wh_loc_nm, rtnArr[1]); // wh_loc_nm
			}
			else{
				formObj.wh_loc_cd.value="";
				formObj.wh_loc_nm.value="";	
				formObj.wh_loc_nm.focus();
			}
		}
		else{
			formObj.wh_loc_cd.value="";
			formObj.wh_loc_nm.value="";	
			formObj.wh_loc_nm.focus();
		}
	}
}
function resultTlCustInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.trucker_nm.value=rtnArr[0];
			}
			else{
				formObj.trucker_cd.value="";
				formObj.trucker_nm.value="";	
			}
		}
		else{
			formObj.trucker_cd.value="";
			formObj.trucker_nm.value="";	
		}
	}
}
function resultTlLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.node_loc_nm.value= rtnArr[0];
			}
			else{
				formObj.node_loc_cd.value="";
				formObj.node_loc_nm.value="";	
			}
		}
		else{
			formObj.node_loc_cd.value="";
			formObj.node_loc_nm.value="";	
		}
	}
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "trucker_cd":
				if (!ComIsNull(srcValue)){
					var sParam="cust_cd="+ComGetObjValue(formObj.trucker_cd);
					ajaxSendPost(resultTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&'+sParam, './GateServlet.gsl');
				}else{
					formObj.trucker_cd.value="";
					formObj.trucker_nm.value="";
				}
			break;
			case "node_loc_cd":
				var parm="loc_cd="+ComGetObjValue(formObj.node_loc_cd);
				if (!ComIsNull(srcValue)){
					ajaxSendPost(resultTlLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&'+parm, './GateServlet.gsl');
				} else {
					formObj.node_loc_cd.value="";
					formObj.node_loc_nm.value="";
				}
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
document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");
		var srcValue=ComGetEvent("value");
		switch(srcName) {
		case "btn_ord_dt":
			if (formObj.btn_ord_dt.disabled) {
				return;
			}			
			var cal=new ComCalendarFromTo();
			cal.select(formObj.ord_dt_fm, formObj.ord_dt_to,  'MM-dd-yyyy');
			break;
		case "btn_wh_cd":
				var sUrl="LocationPopup.clt?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY";
				callBackFunc = "setRcvLocInfo";
				modal_center_open(sUrl, callBackFunc, 900,650,"yes");
			break;
		case "btn_ctrt_no":	
				var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
				callBackFunc = "setCtrtNoInfo";
				modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
			break;
		case "btn_wh_loc_cd":
			if (btn_wh_loc_cd.disabled) {
				return;
			}
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				return;
			}
			var sUrl="WarehouseLocPopup.clt?f_loc_cd=" + ComGetObjValue(formObj.wh_cd);
			callBackFunc = "setPutawayLocInfo";
			modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
			break;
		case "btn_trucker_cd":
			if (btn_trucker_cd.disabled) {
				return;
			}
			var sUrl="CustomerPopup.clt?cust_cd="+ComGetObjValue(formObj.trucker_cd)+"&cust_nm="+ComGetObjValue(formObj.trucker_nm)+"&in_part_tp=P";
			callBackFunc = "setTrucker";
			modal_center_open(sUrl, callBackFunc, 900, 620,"yes");
		break;
		case "btn_node_loc_cd":
			if (btn_node_loc_cd.disabled) {
				return;
			}
			var sUrl="LocationPopup.clt?loc_cd="+ComGetObjValue(formObj.node_loc_cd)+"&loc_nm="+ComGetObjValue(formObj.node_loc_nm)+"&crtr_no="+ComGetObjValue(formObj.ctrt_no)+"&type=A";
				callBackFunc = "setNodeInfo";
				modal_center_open(sUrl, callBackFunc, 1000,650,"yes");
		break;
		case "btn_search":
			btn_Search();
		break;
		case "btn_print":
			btn_Print();
		break;
		case "btn_excel":
			btn_Excel();
		break;
		case "btn_Create":
			btn_Create('CREATE');
		break;
		case "btn_BLLoad":
			btn_Blload();
		break;
		case "btn_Save":
			btn_Save();
		break;
		case "btn_Delete":
			btn_Del();
		break;
		case "btn_Dispatch":
			btn_Dispatch();
		break;
		case "btn_DCancel":
			btn_Dcancel();
		break;
		case "btn_BKGComplete":
			btn_Complete();
		break;
		case "btn_BKGCancel":
			btn_Bkgcancel();
		break;
		case "btn_TLComplete":
			btn_TlCmpl();
		break;
		case "btn_TLCancel":
			btn_TlCancel();
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
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init (By Item)
		    with(sheetObj){
			      var hdr1="|T/L No|T/L Status|T/L Order Date|Booking No|Booking Status|D/O No|Actual Date|Actual Time|Customer Order No|EID TP|Node|Node|Node|Node|M B/L|CNTR TP/SZ|CNTR No|Seal No|Load ID|Item|Order Qty|Dispatched Qty|Shipped Qty|Residual Qty|S/P Code|S/P Name|Truck TP/SZ|Truck No|Trailer No|Trucking Charge|Trucking Charge|Trucking Charge|Trucking Charge|Trucking Charge|Contract Code|Contract Name|Office|Warehouse|Warehouse|";
			      hdr1 += "trans_tp_cd|tlo_seq|tro_seq|||||||||||||||||||||||||||||||||||||||||||||||||||ibflag";
			      var hdr2="|T/L No|T/L Status|T/L Order Date|Booking No|Booking Status|D/O No|Actual Date|Actual Time|Customer Order No|EID TP|Type|Code|Name|Address|M B/L|CNTR TP/SZ|CNTR No|Seal No|Load ID|Item|Order Qty|Dispatched Qty|Shipped Qty|Residual Qty|S/P Code|S/P Name|Truck TP/SZ|Truck No|Trailer No|Currency|Basic|Nego|Additional|Total|Contract Code|Contract Name|Office|Code|Name|";
			      hdr2 += "trans_tp_cd|tlo_seq|tro_seq|||||||||||||||||||||||||||||||||||||||||||||||||||ibflag";
			      //var headCount=ComCountHeadTitle(hdr1);
			      var prefix=fix_grid01;

			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"},
			                  { Text:hdr2, Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"check",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"tlo_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"tlo_sts_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"bk_date",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"bk_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"tlo_bk_sts_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"act_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"act_hm",          KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_ord_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"trade_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"node_loc_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
			             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"node_loc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:9 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"node_loc_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
			             {Type:"PopupEdit", Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"node_addr",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:250 },
			             {Type:"PopupEdit", Hidden:0, Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"mbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cntr_tpsz_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cntr_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"load_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Popup",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"ord_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dsp_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"shp_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"rsd_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"trucker_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"trucker_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"truck_tpsz_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"truck_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"trail_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"basic_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"nego_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"add_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"org_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"trans_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tlo_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"trd_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"act_cust",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"est_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fwd_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"vsl_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"vsl_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"voy",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pol",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pol_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pol_etd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"hbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pod",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pod_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pod_eta",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ship_ea_qty",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ship_cbm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ship_net_kgs",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ship_grs_kgs",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fr_node_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fr_node_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fr_node_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fr_node_addr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fr_node_pic_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fr_node_pic_tel", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"to_node_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"to_node_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"to_node_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"to_node_addr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"to_node_pic_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"to_node_pic_tel", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"disp_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"disp_hm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"act_trucker",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"driver1_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"driver1_lic_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"driver2_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"driver2_lic_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"gatein_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"gatein_hm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"load_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"load_hm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"gateout_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"gateout_hm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cmpl_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"bkg_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tlo_cmpl_est_dt", KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tlo_cmpl_act_dt", KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tlo_cmpl_act_hm", KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			       
			      InitColumns(cols);
			      SetColProperty(prefix+"tlo_sts_cd", {ComboText:GRP1_CD, ComboCode:GRP1_NM} );
				  SetColProperty(prefix+"tlo_bk_sts_cd", {ComboText:GRP2_CD, ComboCode:GRP2_NM} );
				  SetColProperty(prefix+"trade_tp_cd", {ComboText:GRP3_CD, ComboCode:GRP3_NM} );
				  SetColProperty(prefix+"node_loc_tp_cd", {ComboText:GRP4_CD, ComboCode:GRP4_NM} );
				  SetSheetHeight(400);
			      SetEditable(1);
			      //no support[implemented common]CLT 			SelectHighLight=false;
			      SetAutoRowHeight(0);
			      }
			      break;


		case "sheet2":      //IBSheet2 init (By Lot)
		    with(sheetObj){
	        
	      var hdr1="Seq|Item|Item Name|Inbound Date|Item Lot No|Lot ID|Inventory|Inventory|Inventory|Inventory|Inventory|CBM|CBM|GWT|GWT|NWT|NWT|Additional Lot Information|Additional Lot Information|Additional Lot Information|Contract|Contract|W/H Code";
	      var hdr2="Seq|Item|Item Name|Inbound Date|Item Lot No|Lot ID|Available|Hold|Damage|Allocated|Current|CBM |CFT|KG|LB|KG|LB|Expiration Date|Lot 04|Lot 05|No|Name|W/H Code";
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                  { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",      KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",     KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",      KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",     KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",      KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_04",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_05",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	            }
	      break;


		case "sheet3":      //IBSheet3 init (By Location)
		    with(sheetObj){
	        
	      var hdr1="Seq|Item|Item Name|Inbound Date|Item Lot No|Lot ID|Location|Inventory|Inventory|Inventory|Inventory|Inventory|CBM|CBM|GWT|GWT|NWT|NWT|Additional Lot Information|Additional Lot Information|Additional Lot Information|In Booking No|Cust Order No|Contract|Contract|W/H Code";
	      var hdr2="Seq|Item|Item Name|Inbound Date|Item Lot No|Lot ID|Location|Available|Hold|Damage|Allocated|Total|CBM |CFT|KG|LB|KG|LB|Expiration Date|Lot 04|Lot 05|In Booking No|Cust Order No|No|Name|W/H Code";
	      //var headCount=ComCountHeadTitle(hdr1);
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                  { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stc_qty",      KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"hold_qty",     KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"dmg_qty",      KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"allc_qty",     KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:undefined,   Hidden:0,  Width:55,   Align:"Right",   ColMerge:1,   SaveName:prefix+"tot_qty",      KeyField:0,   CalcLogic:"",   Format:undefined,     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_04",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_05",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wib_bk_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_ord_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	            }
	      break;

				
	}
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 */
function locationPopup(){
	var formObj=document.form;
	var sUrl="LocationPopup.clt?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY";
	callBackFunc = "setRcvLocInfo";
	modal_center_open(sUrl, callBackFunc, 900,650,"yes");
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
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
		formObj.ctrt_no.value=rtnValAry[0];
		formObj.ctrt_nm.value=rtnValAry[1];
	}
}
function setRcvLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.wh_cd.value=rtnValAry[0];
		formObj.wh_nm.value=rtnValAry[1];
	}
}
function setPutawayLocInfo(rtnVal) {
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.wh_loc_cd.value=rtnValAry[0];
		formObj.wh_loc_nm.value=rtnValAry[1];
	}
}
function setTrucker(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.trucker_cd.value=rtnValAry[0];
		formObj.trucker_nm.value=rtnValAry[1];
	}
}
function setNodeInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.node_loc_cd.value=rtnValAry[0];
		formObj.node_loc_nm.value=rtnValAry[1];
	}
}
function setTlCompletePop(rtnVal){
	var formObj=document.form;
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	//var vInvByTp = comboObjects[0].Code; // Inventory by	
	//if (validateForm(formObj, 'search')) {
		var sXml="";
		formObj.f_cmd.value = SEARCH;
 		sheetObj.DoSearch("./TransloadingMgmtGS.clt", FormQueryString(formObj,""));
//		sheetObj.LoadSearchData(convertColOrder(sXml,{Sync:1} );
		if(window._childwin){
			window._childwin.focus();
		}
	//}
}
function btn_Save() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, prefix+"ibflag") == "U"){
	if(sheetObj.GetCellValue(i, prefix+"tot_amt") > 0){
	if(sheetObj.GetCellValue(i, prefix+"curr_cd") == ""){
					ComShowCodeMessage("COM0114","Currency");
					sheetObj.SelectCell(i, prefix+"curr_cd");
					return;
				}
			}
		}
	}
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	var sParam=FormQueryString(formObj, "Grd00");
	sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 	var saveXml=docObjects[0].GetSaveData("saveTransloadingMgmt.clt", sParam);
	//1. Save 후 조회
	if( saveXml.indexOf('<ERROR>') == -1){
//		ComShowCodeMessage("COM0093", "");
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();
		btn_Search();
	}
}
function btn_Complete() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(ComShowCodeConfirm("COM0411") == false){
		return;
	}
	var rtnFlg="Y";
	var prefix="Grd01";
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, prefix+"check") == 1){
	if(sheetObj.GetCellValue(i, prefix+"trans_tp_cd") == "IB"){
	if(sheetObj.GetCellValue(i, prefix+"act_dt") == ""){
					sheetObj.SetCellValue(i, prefix+"act_dt",ComGetNowInfo(),0);
				}
				//SERVER 단에서 한건씩 처리하기 위함.
				sheetObj.SetCellValue(i, prefix+"bkg_flg","Y",0);
				var sParam=FormQueryString(formObj, "Grd00");
				sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 				var saveXml=docObjects[0].GetSaveData("bkgCompleteTransloadingMgmt.clt", sParam);
				if( saveXml.indexOf('<MESSAGE>') == -1){
					sheetObj.SetCellValue(i, prefix+"bkg_flg","N",0);
				}else{
					rtnFlg="N";
					docObjects[0].LoadSearchData(saveXml,{Sync:1} );
					btn_Search();
				}
			}
		}
	}
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, prefix+"check") == 1){
	if(sheetObj.GetCellValue(i, prefix+"trans_tp_cd") == "OB"){
	if(sheetObj.GetCellValue(i, prefix+"act_dt") == ""){
					sheetObj.SetCellValue(i, prefix+"act_dt",ComGetNowInfo(),0);
				}
				sheetObj.SetCellValue(i, prefix+"bkg_flg","Y",0);
				var sParam=FormQueryString(formObj, "Grd00");
				sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 				var saveXml=docObjects[0].GetSaveData("bkgCompleteTransloadingMgmt.clt", sParam);
				if( saveXml.indexOf('<MESSAGE>') == -1){
					sheetObj.SetCellValue(i, prefix+"bkg_flg","N",0);
				}else{
					rtnFlg="N";
					docObjects[0].LoadSearchData(saveXml,{Sync:1} );
					btn_Search();
				}
			}
		}
	}
	if(rtnFlg == "Y"){
		ComShowCodeMessage("COM0412", "");
		btn_Search();
	}
}
function btn_Del() {
	var formObj=document.form;
	if(ComShowCodeConfirm("COM0053") == false){
		return;
	}
	var sParam=FormQueryString(formObj, "Grd00");
	sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 	var saveXml=docObjects[0].GetSaveData("deleteTransloadingMgmt.clt", sParam);
	if( saveXml.indexOf('<MESSAGE>') == -1){
		ComShowCodeMessage("COM0080", "");
		btn_Search();
	}else{
		docObjects[0].LoadSearchData(saveXml,{Sync:1} );
	}
}
function btn_Dcancel() {
	var formObj=document.form;
	if(ComShowCodeConfirm("COM0413") == false){
		return;
	}
	var sParam=FormQueryString(formObj, "Grd00");
	sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 	var saveXml=docObjects[0].GetSaveData("dCancelTransloadingMgmt.clt", sParam);
	if( saveXml.indexOf('<MESSAGE>') == -1){
		ComShowCodeMessage("COM0414", "");
		btn_Search();
	}else{
		docObjects[0].LoadSearchData(saveXml,{Sync:1} );
	}
}
function btn_Bkgcancel() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(ComShowCodeConfirm("COM0415") == false){
		return;
	}
	var rtnFlg="Y";
	var prefix="Grd01";
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, prefix+"check") == 1){
	if(sheetObj.GetCellValue(i, prefix+"trans_tp_cd") == "OB"){
				//SERVER 단에서 한건씩 처리하기 위함.
				sheetObj.SetCellValue(i, prefix+"bkg_flg","Y",0);
				var sParam=FormQueryString(formObj, "Grd00");
				sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 				var saveXml=docObjects[0].GetSaveData("bkgCancelTransloadingMgmt.clt", sParam);
				if( saveXml.indexOf('<MESSAGE>') == -1){
					sheetObj.SetCellValue(i, prefix+"bkg_flg","N",0);
				}else{
					rtnFlg="N";
					docObjects[0].LoadSearchData(saveXml,{Sync:1} );
					btn_Search();
				}
			}
		}
	}
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, prefix+"check") == 1){
	if(sheetObj.GetCellValue(i, prefix+"trans_tp_cd") == "IB"){
				sheetObj.SetCellValue(i, prefix+"bkg_flg","Y",0);
				var sParam=FormQueryString(formObj, "Grd00");
				sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 				var saveXml=docObjects[0].GetSaveData("bkgCancelTransloadingMgmt.clt", sParam);
				if( saveXml.indexOf('<MESSAGE>') == -1){
					sheetObj.SetCellValue(i, prefix+"bkg_flg","N",0);
				}else{
					rtnFlg="N";
					docObjects[0].LoadSearchData(saveXml,{Sync:1} );
					btn_Search();
				}
			}
		}
	}
	if(rtnFlg == "Y"){
		ComShowCodeMessage("COM0416", "");
		btn_Search();
	}
	/*
	var sParam=FormQueryString(formObj, "Grd00");
	sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 	var saveXml=docObjects[0].GetSaveData("bkgCancelTransloadingMgmt.clt", sParam);
	if( saveXml.indexOf('<MESSAGE>') == -1){
		ComShowCodeMessage("COM0416", "");
		btn_Search();
	}else{
		docObjects[0].LoadSearchData(saveXml,{Sync:1} );
	}
	*/
}
function btn_TlCmpl() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	/*
	var fstTrans="";
	var fstCtrt="";
	var cnt=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, "Grd01check") == "1"){
	if(sheetObj.GetCellValue(i, "Grd01tro_no") != ""){
				ComShowCodeMessage("COM0409");
				return;
			}
			if(cnt == 0){
	fstTrans=sheetObj.GetCellValue(i, "Grd01trans_tp_cd");
	fstCtrt=sheetObj.GetCellValue(i, "Grd01ctrt_no");
			}else{
	if(fstTrans != sheetObj.GetCellValue(i, "Grd01trans_tp_cd")){
					ComShowCodeMessage("COM0408", "Trans Type");
					return;
				}
	if(fstCtrt != sheetObj.GetCellValue(i, "Grd01ctrt_no")){
					ComShowCodeMessage("COM0408", "Contract");
					return;
				}
			}
			cnt++;
		}
	}
	*/
	sUrl="TransloadingCompletePopUp.clt";
	callBackFunc = "setTlCompletePop";
	modal_center_open(sUrl, callBackFunc, 400,230,"yes");
}
function btn_TlCancel() {
	var formObj=document.form;
	if(ComShowCodeConfirm("COM0420") == false){
		return;
	}
	var sParam=FormQueryString(formObj, "Grd00");
	sParam += "&" + ComGetSaveString(docObjects[0], true, true);
 	var saveXml=docObjects[0].GetSaveData("tlCancelTransloadingMgmt.clt", sParam);
	if( saveXml.indexOf('<MESSAGE>') == -1){
		ComShowCodeMessage("COM0416", "");
		btn_Search();
	}else{
		docObjects[0].LoadSearchData(saveXml,{Sync:1} );
	}
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	var formObj = document.form;
	var vInvByTp=formObj.tlo_sts_cd.value; // Inventory by
	if (vInvByTp == "ITEM") {
 		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	} else if (vInvByTp == "LOT") {
 		docObjects[1].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[1]), SheetDesign:1,Merge:1 });
	} else if (vInvByTp == "LOC") {
 		docObjects[2].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[2]), SheetDesign:1,Merge:1 });
	}
}
function btn_Create(crt_mode){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var height=screen.height; 
	var width=screen.width; 
	var leftpos=width/2 - 1024/2; 
	var toppos=height/2 - 768/2; 
	if(leftpos<0) leftpos=0;
	if(toppos<0) toppos=0;
	if(sheetObj.CheckedRows("Grd01check") == 1){
		crt_mode="ONE";
	}else if(sheetObj.CheckedRows("Grd01check") >1){
		crt_mode="MULTI";
	}
	if(window._childwin){
		window._childwin.opener=null; 
		ComClosePopup(); 
		window._childwin=window.open("TLOCreate.clt?crt_mode="+crt_mode, "Create", "width=1140,height=620, resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
	}else{
		window._childwin=window.open("TLOCreate.clt?crt_mode="+crt_mode, "Create", "width=1140,height=620, resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
	}
	//팝업창 닫을때 
	/*
	function closewin()
	{
	    // opener는 원래창의 참조
	if(opener!=null){opener._childwin=null;  ComClosePopup(); }
	}
	*/
	/*
	var uploadPop;
	if(uploadPop != undefined && uploadPop != "undefined"){
		uploadPop.focus();
		uploadPop=window.open("LocationPopup.clt", "Upload",  "width=800,height=600, resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
	}else{
		uploadPop=window.open("LocationPopup.clt", "Upload",  "width=800,height=600, resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
	}
	*/
}
function btn_Dispatch(dsp_mode){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var fstTrans="";
	var fstCtrt="";
	var troNo="";
	var cnt=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
	if(sheetObj.GetCellValue(i, "Grd01check") == "1"){
	if(sheetObj.GetCellValue(i, "Grd01tro_no") != ""){
	troNo=sheetObj.GetCellValue(i, "Grd01tro_no");
			}
			if(cnt == 0){
	fstTrans=sheetObj.GetCellValue(i, "Grd01trans_tp_cd");
	fstCtrt=sheetObj.GetCellValue(i, "Grd01ctrt_no");
			}else{
				if(fstTrans != sheetObj.GetCellValue(i, "Grd01trans_tp_cd")){
					ComShowCodeMessage("COM0408", "Trans Type");
					return;
				}
				if(fstCtrt != sheetObj.GetCellValue(i, "Grd01ctrt_no")){
					ComShowCodeMessage("COM0408", "Contract");
					return;
				}
			}
			cnt++;
		}
	}
	var dsp_mode="CREATE";
	if(troNo != ""){
		dsp_mode="UPDATE";
	}
	sUrl="TLODispatch.clt?dsp_mode="+dsp_mode;
	callBackFunc = "setDispatchPop";
	modal_center_open(sUrl, callBackFunc, 1000, 400,"yes");
}
function btn_Blload(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var sUrl="TransloadingBLLoadPopup.clt?openScr=MGMT";
	callBackFunc = "setBL_load";
	modal_center_open(sUrl, callBackFunc, 1100, 650,"yes");
}
function setBL_load(aryPopupData){
	var formObj=document.form;
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// Warehouse 체크			
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM0114", "Warehouse");
				ComSetFocus(formObj.wh_cd);
				return false;
			}
			var vInvByTp=comboObjects[0].GetSelectCode(); // Inventory by
			if (vInvByTp == "ITEM") {
			} else if (vInvByTp == "LOT") {
				if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
					formObj.prop_date_to.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_to.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value)<0) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date!");
					formObj.prop_date_fm.focus();
					return false;
				}				
			} else if (vInvByTp == "LOC") {		
				if (!ComIsEmpty(formObj.prop_date_fm) && ComIsEmpty(formObj.prop_date_to)) {
					formObj.prop_date_to.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.prop_date_fm) && !isDate(formObj.prop_date_fm)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.prop_date_to) && !isDate(formObj.prop_date_to)) {
					ComShowCodeMessage("COM0114", "Inbound(Expiration) Date");
					formObj.prop_date_to.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.prop_date_fm)&&ComIsEmpty(formObj.prop_date_to))||(ComIsEmpty(formObj.prop_date_fm)&&!ComIsEmpty(formObj.prop_date_to))) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date");
					formObj.prop_date_fm.focus();
					return false;
				}
				if (getDaysBetween2(formObj.prop_date_fm.value, formObj.prop_date_to.value)<0) {
					ComShowCodeMessage("COM0122", "Inbound(Expiration) Date!");
					formObj.prop_date_fm.focus();
					return false;
				}
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
function getLocInfo(obj) {
	var formObj=document.form;
	if (obj.value == "") {
		form.wh_cd.value="";
		form.wh_nm.value="";
	} else {
		searchLocInfo(formObj, ComGetObjValue(formObj.wh_cd), "loc_cd");
	}		
}
function searchLocInfo(obj){
	var formObj=document.form;
	ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+ComGetObjValue(formObj.wh_cd)+'&type=WH', './GateServlet.gsl');
}
function resultLocInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.wh_cd.value=rtnArr[1];
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
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj) {
	var formObj=document.form;
	if (obj.value == "") {
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	} else {
		searchCtrtInfo(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
	}
}
function searchCtrtInfo(form, ctrt_no, col_nm) {
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.ctrt_no.value="";
				formObj.ctrt_nm.value="";	
			}
		}
		else{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";	
		}
	}
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=docObjects[0];//docObjects[0];
	var seq=0;
	var seqBkNo="";
	var prefix="Grd01";
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
		if(sheetObj.GetCellValue(i, prefix+"trans_tp_cd") == "IB"){
			//sheetObj.RowBackColor(i) = "#B7F0B1";
			sheetObj.SetCellBackColor(i, prefix+"bk_no","#B7F0B1");
		}
		if(sheetObj.GetCellValue(i, prefix+"tro_no") != ""){
			sheetObj.SetCellEditable(i, prefix+"node_loc_tp_cd",0);
			sheetObj.SetCellEditable(i, prefix+"node_loc_cd",0);
			sheetObj.SetCellEditable(i, prefix+"node_loc_nm",0);
			sheetObj.SetCellEditable(i, prefix+"node_addr",0);
			sheetObj.SetCellEditable(i, prefix+"cntr_tpsz_cd",0);
			sheetObj.SetCellEditable(i, prefix+"cntr_no",0);
			sheetObj.SetCellEditable(i, prefix+"seal_no",0);
			sheetObj.SetCellEditable(i, prefix+"load_id",0);
			sheetObj.SetCellEditable(i, prefix+"trucker_cd",0);
			sheetObj.SetCellEditable(i, prefix+"trucker_nm",0);
			sheetObj.SetCellEditable(i, prefix+"truck_tpsz_cd",0);
			sheetObj.SetCellEditable(i, prefix+"truck_no",0);
			sheetObj.SetCellEditable(i, prefix+"trail_no",0);
			sheetObj.SetCellEditable(i, prefix+"curr_cd",1);
			sheetObj.SetCellEditable(i, prefix+"nego_amt",1);
		}
		if(sheetObj.GetCellValue(i, prefix+"cmpl_flg") == "Y"){
			sheetObj.SetCellEditable(i, prefix+"act_dt",0);
			sheetObj.SetCellEditable(i, prefix+"act_hm",0);
			sheetObj.SetCellEditable(i, prefix+"item_cd",0);
		}
 		sheetObj.SetCellFontColor(i, prefix+"tro_no","#0100FF");
 		sheetObj.SetCellFontUnderline(i, prefix + "tro_no", 1);
		//sheetObj.CellImage(i, (prefix+"seal_img"))     = "seal";
	}
}
function sheet1_OnPopupClick(sheetObj, row, col){
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	var sUrl="";
	if(colStr == "Grd01node_loc_cd"){     
		var sUrl="LocationPopup.clt?loc_cd="+sheetObj.GetCellValue(row, "Grd01node_loc_cd")+"&crtr_no="+sheetObj.GetCellValue(row, "Grd01ctrt_no")+"&type=A";
		callBackFunc = "setGrd01NodeInfo";
		modal_center_open(sUrl, callBackFunc, 1000,650,"yes");
	}else if ( colStr == "Grd01cntr_tpsz_cd" ) {
		var code="C";
		var colValue=sheetObj.GetCellValue(row, "Grd01cntr_tpsz_cd");
		sUrl="ContainerTypePopup.clt?type="+code+"&eq_unit="+colValue;
		callBackFunc = "setGrd01CntrTypeInfo";
		modal_center_open(sUrl, callBackFunc, 400,600,"yes");
	}else if ( colStr == "Grd01truck_tpsz_cd" ) {
		var code="T";
		var colValue=sheetObj.GetCellValue(row, "Grd01truck_tpsz_cd");
		sUrl="ContainerTypePopup.clt?type="+code+"&eq_unit="+colValue;
		callBackFunc = "setGrd01TruckTypeInfo";
		modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
	}else if ( colStr == "Grd01trucker_cd" ) {
		var sUrl="CustomerPopup.clt?cust_cd="+sheetObj.GetCellValue(row, "Grd01trucker_cd")+"&in_part_tp=P";
		callBackFunc = "setGrd01Trucker";
		modal_center_open(sUrl, callBackFunc, 900, 620,"yes");
	}else if ( colStr == "Grd01curr_cd" ) {
		var sUrl="CommonCodePopup.clt?grp_cd=C010";
		callBackFunc = "setGrd01CurrInfo";
		modal_center_open(sUrl, callBackFunc, 400,520,"yes");
	}else if ( colStr == "Grd01node_addr" ) {
	var tro_no=sheetObj.GetCellValue(row, "Grd01tro_no");
	var tro_seq=sheetObj.GetCellValue(row, "Grd01tro_seq");
	var trans_tp_cd=sheetObj.GetCellValue(row, "Grd01trans_tp_cd");
	var ctrt_no=sheetObj.GetCellValue(row, "Grd01ctrt_no");
	var wh_cd=sheetObj.GetCellValue(row, "Grd01wh_cd");
		var sUrl="TransloadingAddrPopUp.clt?tro_no="+tro_no+"&tro_seq="+tro_seq+"&trans_tp_cd="+trans_tp_cd+"&ctrt_no="+ctrt_no+"&wh_cd="+wh_cd;
		callBackFunc = "setGrd01AddrInfo";
		modal_center_open(sUrl, callBackFunc, 600,300,"yes");
	}else if ( colStr == "Grd01mbl_no" ) {
	var tlo_no=sheetObj.GetCellValue(row, "Grd01tlo_no");
	var tlo_seq=sheetObj.GetCellValue(row, "Grd01tlo_seq");
	var bk_no=sheetObj.GetCellValue(row, "Grd01bk_no");
	var trans_tp_cd=sheetObj.GetCellValue(row, "Grd01trans_tp_cd");
	var ctrt_no=sheetObj.GetCellValue(row, "Grd01ctrt_no");
	var wh_cd=sheetObj.GetCellValue(row, "Grd01wh_cd");
		var sUrl="TransloadingShipPopUp.clt?tlo_no="+tlo_no+"&tlo_seq="+tlo_seq+"&bk_no="+bk_no+"&trans_tp_cd="+trans_tp_cd+"&ctrt_no="+ctrt_no+"&wh_cd="+wh_cd;
		callBackFunc = "setGrd01ShipInfo";
		modal_center_open(sUrl, callBackFunc, 800,240,"yes");
	}else if (colStr == "Grd01seal_no") {
		ComShowMemoPad3(sheetObj, row, "Grd01seal_no", false, 300, 82, 16, "Grd01seal_no");         		
	}else if (colStr == "Grd01item_cd") {
	var wh_cd=sheetObj.GetCellValue(row, "Grd01wh_cd");
	var ctrt_no=sheetObj.GetCellValue(row, "Grd01ctrt_no");
	var tlo_no=sheetObj.GetCellValue(row, "Grd01tlo_no");
	var tlo_seq=sheetObj.GetCellValue(row, "Grd01tlo_seq");
	var bk_no=sheetObj.GetCellValue(row, "Grd01bk_no");
	var truck_tpsz_cd=sheetObj.GetCellValue(row, "Grd01truck_tpsz_cd");
	var cntr_tpsz_cd=sheetObj.GetCellValue(row, "Grd01cntr_tpsz_cd");
	if(sheetObj.GetCellValue(row, "Grd01trans_tp_cd") == "IB"){
			var sUrl="TransloadingInboundItemPopup.clt?wh_cd="+wh_cd+"&ctrt_no="+ctrt_no+"&tlo_no="+tlo_no+"&tlo_seq="+tlo_seq+"&bk_no="+bk_no+"&truck_tpsz_cd="+truck_tpsz_cd+"&cntr_tpsz_cd="+cntr_tpsz_cd;
			callBackFunc = "setGrd01ItemInfo";
			modal_center_open(sUrl, callBackFunc, 1000,500,"yes");
		}else{
			var sUrl="TransloadingOutboundItemPopup.clt?wh_cd="+wh_cd+"&ctrt_no="+ctrt_no+"&tlo_no="+tlo_no+"&tlo_seq="+tlo_seq+"&wob_bk_no="+bk_no+"&truck_tpsz_cd="+truck_tpsz_cd+"&cntr_tpsz_cd="+cntr_tpsz_cd;
			callBackFunc = "setGrd01ItemInfo";
			modal_center_open(sUrl, callBackFunc, 1000,500,"yes");
		}   		
	}
}
function sheet1_OnChange(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "Grd01node_loc_cd"){
		if(sheetObj.GetCellValue(row, "Grd01node_loc_cd") != ""){
			ajaxSendPost(getDataAjaxLocSheet1OnChange, row, '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+sheetObj.GetCellValue(row, "Grd01node_loc_cd"), './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd01node_loc_cd","",0);
			sheetObj.SetCellValue(row, "Grd01node_loc_nm","",0);
			sheetObj.SetCellValue(row, "Grd01node_addr","",0);
		}
	}else if(colStr == "Grd01cntr_tpsz_cd"){
		if(sheetObj.GetCellValue(row, "Grd01cntr_tpsz_cd") != ""){
			var sParam="cntr_tp="+sheetObj.GetCellValue(row, "Grd01cntr_tpsz_cd");
			ajaxSendPost(getDataAjaxCntrSheet1OnChange, row, '&goWhere=aj&bcKey=searchCntrTrTp&' + sParam, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd01cntr_tpsz_cd","",0);
		}
	}else if(colStr == "Grd01truck_tpsz_cd"){
		if(sheetObj.GetCellValue(row, "Grd01truck_tpsz_cd") != ""){
			var sParam="cntr_tp="+sheetObj.GetCellValue(row, "Grd01truck_tpsz_cd");
			ajaxSendPost(getDataAjaxTruckSheet1OnChange, row, '&goWhere=aj&bcKey=searchCntrTrTp&' + sParam, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd01cntr_tpsz_cd","",0);
		}
	}else if(colStr == "Grd01trucker_cd"){
		if(sheetObj.GetCellValue(row, "Grd01trucker_cd") != ""){
			var sParam="cust_cd="+sheetObj.GetCellValue(row, "Grd01trucker_cd");
			ajaxSendPost(getDataAjaxTlCustInfoSheet1OnChange, row, '&goWhere=aj&bcKey=searchTlCustInfo&' + sParam, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd01trucker_cd","",0);
			sheetObj.SetCellValue(row, "Grd01trucker_nm","",0);
		}
	}else if(colStr == "Grd01curr_cd"){
		if(sheetObj.GetCellValue(row, "Grd01curr_cd") != ""){
			ajaxSendPost(getDataAjaxCommonCodeInfoSheet1OnChange, row, '&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=C010&code_cd='+sheetObj.GetCellValue(row, "Grd01curr_cd"), './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "Grd01curr_cd","",0);
		}
	}else if(colStr == "Grd01nego_amt"){
		var tot_amt=Number(sheetObj.GetCellValue(row, "Grd01basic_amt")) + Number(sheetObj.GetCellValue(row, "Grd01nego_amt")) + Number(sheetObj.GetCellValue(row, "Grd01add_amt"));
		sheetObj.SetCellValue(row, "Grd01tot_amt",tot_amt,0);
	}  
}
function getDataAjaxLocSheet1OnChange(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row, "Grd01node_loc_cd", rtnArr[0],0);
				sheetObj.SetCellValue(row, "Grd01node_loc_nm", rtnArr[1],0);
				sheetObj.SetCellValue(row, "Grd01node_addr", rtnArr[2],0);
			}
			else{
				sheetObj.SetCellValue(row, "Grd01node_loc_cd","",0);
				sheetObj.SetCellValue(row, "Grd01node_loc_nm","",0);
				sheetObj.SetCellValue(row, "Grd01node_addr","",0);
			}
		}
		else{
			sheetObj.SetCellValue(row, "Grd01node_loc_cd","",0);
			sheetObj.SetCellValue(row, "Grd01node_loc_nm","",0);
			sheetObj.SetCellValue(row, "Grd01node_addr","",0);
		}
	}
}
function getDataAjaxCntrSheet1OnChange(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row, "Grd01cntr_tpsz_cd", rtnArr[0] ,0);
			}
			else{
				sheetObj.SetCellValue(row, "Grd01cntr_tpsz_cd","",0);
			}
		}
		else{
			sheetObj.SetCellValue(row, "Grd01cntr_tpsz_cd","",0);
		}
	}
}
function getDataAjaxTruckSheet1OnChange(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row, "Grd01truck_tpsz_cd", rtnArr[0],0);
			}
			else{
				sheetObj.SetCellValue(row, "Grd01truck_tpsz_cd","",0);
			}
		}
		else{
			sheetObj.SetCellValue(row, "Grd01truck_tpsz_cd","",0);
		}
	}
}
function getDataAjaxTlCustInfoSheet1OnChange(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row, "Grd01trucker_cd", rtnArr[0],0);
				sheetObj.SetCellValue(row, "Grd01trucker_nm", rtnArr[1],0);
			}
			else{
				sheetObj.SetCellValue(row, "Grd01trucker_cd", "",0);
				sheetObj.SetCellValue(row, "Grd01trucker_nm", "",0);
			}
		}
		else{
			sheetObj.SetCellValue(row, "Grd01trucker_cd", "",0);
			sheetObj.SetCellValue(row, "Grd01trucker_nm", "",0);
		}
	}
}
function getDataAjaxCommonCodeInfoSheet1OnChange(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(row, "Grd01curr_cd", rtnArr[0],0);
			}
			else{
				sheetObj.SetCellValue(row, "Grd01curr_cd","",0);
			}
		}
		else{
			sheetObj.SetCellValue(row, "Grd01curr_cd","",0);
		}
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01+"tlo_no":
			btn_Create("TLO_MULTI");
		break;
		case fix_grid01+"bk_no":
			btn_Create("ONE");
		break;
		/*
		case fix_grid01 + "tro_no":
	if(sheetObj.GetCellValue(Row, Col) != ""){
				sUrl="TLODispatch.clt?dsp_mode=UPDATE";
				ComOpenPopup(sUrl, 1000, 400, "setDispatchPop", "0,0", true);
			}
		break;
		*/
		case fix_grid01+"tro_no":
			var sUrl="TROCreate.clt?crt_mode=ONE&sheet_name=sheet1&pgm_id=TLO";
			callBackFunc = "setGrd01TroCrtInfo";
			modal_center_open(sUrl, callBackFunc, 1140,720,"yes");
			//var sUrl = "./TROCreate.clt?crt_mode=ONE&sheet_name=sheet1&pgm_id=TLO";
			//parent.mkNewFrame('Transportation Creation', sUrl);
		break;
	}
}
function setGrd01NodeInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01node_loc_cd", rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01node_loc_nm", rtnValAry[1],0);
	}
}
function setGrd01CntrTypeInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01cntr_tpsz_cd", rtnValAry[0],0);
	}
}
function setGrd01TruckTypeInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01truck_tpsz_cd", rtnValAry[0],0);
	}
}
function setGrd01Trucker(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01trucker_cd", rtnValAry[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01trucker_nm", rtnValAry[1],0);
	}
}
function setGrd01CurrInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd01curr_cd", rtnValAry[0],0);
	}
}
function setGrd01AddrInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	}
}
function setGrd01ShipInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	}
}
function setGrd01ItemInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	}
}
function setGrd01TroCrtInfo(rtnVal){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	}
}
/** 
 * Inventory by 선택시
 */
function inv_by_tp_OnChange(comObj, code, text) {
	setSelectSheet(code);	
	setCondEnable(code);	
}
/**
 * 조회조건 활성화/비활성화
 * @param code
 */
function setCondEnable(code) {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	/*
	ComEnableObject(formObj.prop_no_tp, true);
	ComEnableObject(formObj.prop_no, true);
	ComEnableObject(formObj.prop_date_tp, true);
	ComEnableObject(formObj.prop_date_fm, true);
	ComEnableObject(formObj.prop_date_to, true);		
	ComEnableObject(formObj.wh_loc_nm, true);
	ComEnableObject(formObj.wib_bk_no, true);
	ComEnableObject(formObj.cust_ord_no, true);
	//formObj.wh_cd.value = "";
	//formObj.wh_nm.value = "";
	//formObj.ctrt_no.value = "";
	//formObj.ctrt_nm.value = "";	
	//formObj.item_cd.value = "";	
	formObj.prop_no.value="";
	formObj.prop_date_fm.value="";
	formObj.prop_date_to.value="";
	formObj.wh_loc_cd.value="";
	formObj.wh_loc_nm.value="";
	formObj.wib_bk_no.value="";
	formObj.cust_ord_no.value="";	
	if (code == "ITEM") {
		ComEnableObject(formObj.prop_no_tp, false);
		ComEnableObject(formObj.prop_no, false);
		ComEnableObject(formObj.prop_date_tp, false);
		ComEnableObject(formObj.prop_date_fm, false);
		ComEnableObject(formObj.prop_date_to, false);
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(0);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(0);
		ComEnableButton("btn_prop_date_fm", false, 5);		
		ComEnableButton("btn_prop_date_to", false, 5);		
		ComEnableButton("btn_wh_loc_cd", false, 3);		
	} else if (code == "LOT") {
		ComEnableObject(formObj.wh_loc_nm, false);
		ComEnableObject(formObj.wib_bk_no, false);
		ComEnableObject(formObj.cust_ord_no, false);
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(1);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(1);
		//ComSetObjValue(formObj.prop_date_fm, ComGetDateAdd(null, "d", -31, "-"));	
		//ComSetObjValue(formObj.prop_date_to, ComGetNowInfo());
		ComEnableButton("btn_prop_date_fm", true, 5);		
		ComEnableButton("btn_prop_date_to", true, 5);		
		ComEnableButton("btn_wh_loc_cd", false, 3);		
	} else if (code == "LOC") {
		comboObjects[1].index=0;
		comboObjects[1].SetEnable(1);
		comboObjects[2].index=0;
		comboObjects[2].SetEnable(1);
		//ComSetObjValue(formObj.prop_date_fm, ComGetDateAdd(null, "d", -31, "-"));	
		//ComSetObjValue(formObj.prop_date_to, ComGetNowInfo());
		ComEnableButton("btn_prop_date_fm", true, 5);		
		ComEnableButton("btn_prop_date_to", true, 5);		
		ComEnableButton("btn_wh_loc_cd", true, 3);		
	}
	*/
}
function setStatus(){
	var formObj=document.form;	
	if(formObj.sts_opt[0].selected){
		tlo_span.style.display="inline";
		bkg_span.style.display="none";
	}else{
		tlo_span.style.display="none";
		bkg_span.style.display="inline";
	}
}
