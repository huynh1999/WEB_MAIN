/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LoadPlanPopup.js
*@FileTitle  : LoadPlanPopup
*@author     : NamTran - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--*/
var docObjects=new Array();
var sheetCnt=0;
var check_flg="N";
var comboObjects=new Array();
var comboCnt=0; 
var opener = window.dialogArguments;
var firCalFlag = false;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var i=0;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
	document.form.wh_cd.value = document.form.wh_nm.value;
	initControl();
	btn_control();
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
		case "lp_sts_cd":
			vTextSplit=lp_sts_cdText.split("|");
			vCodeSplit=lp_sts_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectCode("ALL");
        	}
			lp_sts_cd.SetEnable(1);
			break;
	}
} 
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject); 
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject); 
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			  with(sheetObj){
		   var prefix="Grd01";

		   SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:0 };
		   var headers = [ { Text:getLabel('LoadPlanPopup_HDR1'), Align:"Center"},
		                   { Text:getLabel('LoadPlanPopup_HDR2'), Align:"Center"} ];
		   InitHeaders(headers, info);

		   var cols = [ 
		             {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
		             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tree_nodetype",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tree_value",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tree_name",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   TreeCol:1 ,  LevelSaveName:"tree_nodetype" },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lp_sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"bk_date",         KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"ord_item_qty",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lp_item_ea_qty",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lp_item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lp_item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lp_item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_ord_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"est_out_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:200,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"shipno",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"shipno_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"so_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wob_bk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wib_bk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"sao_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"po_sys_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_id",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"sao_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"po_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lp_item_cbf",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lp_item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lp_item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:prefix+"ibflag" }];
		    
		   InitColumns(cols);
		   SetSheetHeight(300);
		   SetEditable(1);
		   SetVisible(1);
		   //InitTreeInfo(3, "upperOrgId", "#0000FFNAN");
		   //no support[implemented common]CLT 	        SelectHighLight=false;
		   resizeSheet();
		   }
		   break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}


function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var parm="";
	switch (srcName) {
		case "ctrt_no":
			parm="ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&ord_tp_lvl1_cd='P'";
			if (!ComIsNull(srcValue)){				
				searchTlCtrtInfo(formObj,parm);
			} else {
				formObj.ctrt_nm.value="";
			}
			break;	
		case "pol":
			parm="loc_cd="+ComGetObjValue(formObj.pol)+"&loc_cd="+ComGetObjValue(formObj.pol_nm);
			if (!ComIsNull(srcValue)){
				searchLocNm(formObj, parm, "pol");
			} else {
				formObj.pol_nm.value="";
			}
			break;
		case "pod":
			parm="loc_cd="+ComGetObjValue(formObj.pod)+"&loc_cd="+ComGetObjValue(formObj.pod_nm);
			if (!ComIsNull(srcValue)){
				searchLocNm(formObj, parm, "pod");
			} else {
				formObj.pod_nm.value="";
			}
			break;
	}
	return true;
}
function searchTlCtrtInfo(){
	var formObj = document.form;
	ajaxSendPost(resultTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value+'&ctrt_nm='+formObj.ctrt_nm.value+'&ord_tp_lvl1_cd="P"', './GateServlet.gsl');
}
function resultTlCtrtInfo(reqVal) {
	var formObj=document.form;
	/*formObj.ctrt_no.value=getXmlDataNullToNullString(resultXml,'ctrt_no');
	formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml,'ctrt_nm');	*/
	
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
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
	
//	validateForm(docObjects[0], formObj, "ctrt_no");
}
function searchLocNm(formObj, value, col){
	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?"+value+"&type=P");
	resultLocNm(sXml, col);
}
function resultLocNm(resultXml, col_nm) {
	var formObj=document.form;
	if(col_nm == "pol"){
		formObj.pol.value=getXmlDataNullToNullString(resultXml,'loc_cd');
		formObj.pol_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
	} else if(col_nm == "pod"){
		formObj.pod.value=getXmlDataNullToNullString(resultXml,'loc_cd');
		formObj.pod_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
	}
	validateForm(docObjects[0], formObj, col_nm);
}
function btn_Search(){
	var formObj=document.form;
	doShowProcess();
	setTimeout(function(){
		if (validateForm(docObjects[0],formObj,'Search')) {	
	
		formObj.f_cmd.value=SEARCH;
		sheet1.DoSearch("./searchLPShipmentGS.clt", FormQueryString(formObj, ""));
//		var xml = sheet1.GetSearchData("./searchLPShipmentGS.clt", FormQueryString(formObj, ""));
//		sheet1.LoadSearchData(xml,{Sync:1} );
		}
	},100);
	
	
}

function sheet1_OnSearchEnd(){
	if (docObjects[0].RowCount()> 2){
		document.getElementById("btn_Select").disabled = false;
		sheet1.ShowTreeLevel(0,1);
		/*for(var i=2;i<=docObjects[0].RowCount();i++)
			{
			if(docObjects[0].GetCellValue(i,"Grd01tree_nodetype")=="2")
				{
				docObjects[0].SetCellValue(i,"Grd01tree_nodetype","3",0);
				}
			}*/
		
	} else {
		document.getElementById("btn_Select").disabled = true;
	}
	doHideProcess();
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_ctrt_no":	
 				callBackFunc = "setCtrtNoInfo";
 				modal_center_open('./ContractRoutePopup.clt?ctrt_nm='+formObj.ctrt_nm.value+'&ctrt_no=' + formObj.ctrt_no.value, '', 900, 580,"no");
				break;
			case "btn_so_no":	
				rtnary=new Array(1);
 				rtnary[0]=formObj.so_no.value;
 				callBackFunc = "setSoNoInfo";
 				modal_center_open('./ServiceOrderPopup.clt', rtnary, 1050,700,"yes");
				break;
			case "btn_to_bk_dt":	
	            var cal = new ComCalendarFromTo();
	            cal.select(formObj.fm_bk_dt,formObj.to_bk_dt, 'MM-dd-yyyy');
				break;
			case "btn_to_est_date":	
	            var cal = new ComCalendarFromTo();
	            cal.select(formObj.fm_est_date,formObj.to_est_date, 'MM-dd-yyyy');
				break;
			case "SEARCHLIST" :	
				btn_Search();
			    break;	
			case "btn_Select" :	
				btn_Select();
			    break;	
			case "ADD" :	
				btn_Add();
			    break;	
			case "CLOSE" :	
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
function setSoNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.so_no.value=rtnValAry[1];//full_nm
	}
}

/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
    var prefix="Grd01";
	with (formObj) {
		switch (sAction) {
		case 'Search':
			if(ComIsEmpty(formObj.wh_cd)){
				ComShowCodeMessage("COM0005", "Warehouse");
				formObj.wh_cd.focus();
				return false;
			}
			if(ComIsEmpty(formObj.ctrt_no)){
				ComShowCodeMessage("COM0005", "Contract");
				formObj.ctrt_no.focus();
				return false;
			}
//			조건 : 특정한 Shipment No (SVO No, Booking No, HBL No, MBL No, Liner BKG No, Cust Order No, Custom Item No) 가 있으면 기타 조건 불필요
			if (ComIsEmpty(formObj.consol_no)&&ComIsEmpty(formObj.wob_bk_no)&&ComIsEmpty(formObj.item_cd)&&ComIsEmpty(formObj.lot_id)) {
				if (ComIsEmpty(formObj.fm_bk_dt)&&ComIsEmpty(formObj.to_bk_dt)&&
				   ComIsEmpty(formObj.fm_bk_dt)&&ComIsEmpty(formObj.to_bk_dt)&&ComIsEmpty(formObj.fm_est_date)&&
				   ComIsEmpty(formObj.to_est_date)){
					ComShowCodeMessage("COM0335");
					return false;
				}
			}
			/*******************************************************************/
			if(!ComIsEmpty(formObj.fm_bk_dt) && ComIsEmpty(formObj.to_bk_dt)){
				formObj.to_bk_dt.value=ComGetNowInfo();
			}	
			if (!ComIsEmpty(formObj.fm_bk_dt) && !isDate(formObj.fm_bk_dt)) {
				ComShowCodeMessage("COM0114","ETD!");
				formObj.fm_bk_dt.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_bk_dt) && !isDate(formObj.to_bk_dt)) {
				ComShowCodeMessage("COM0114","ETD!");
				formObj.fm_bk_dt.focus();
				return false;
			}
			if (getDaysBetween2(formObj.fm_bk_dt.value, formObj.to_bk_dt.value)<0) {
				ComShowCodeMessage("COM0114","ETD!");
				formObj.fm_bk_dt.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_bk_dt)&&ComIsEmpty(formObj.to_bk_dt))||(ComIsEmpty(formObj.fm_bk_dt)&&!ComIsEmpty(formObj.to_bk_dt))) {
				ComShowCodeMessage("COM0114","ETD!");
				formObj.fm_bk_dt.focus();
				return false;
			}			
			/*******************************************************************/
			if(!ComIsEmpty(formObj.fm_est_date) && ComIsEmpty(formObj.to_est_date)){
				formObj.to_est_date.value=ComGetNowInfo();
			}	
			if (!ComIsEmpty(formObj.fm_est_date) && !isDate(formObj.fm_est_date)) {
				ComShowCodeMessage("COM0114","Estimated OUT Date!");
				formObj.fm_est_date.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.to_est_date) && !isDate(formObj.to_est_date)) {
				ComShowCodeMessage("COM0114","Estimated OUT Date!");
				formObj.fm_est_date.focus();
				return false;
			}
			if (getDaysBetween2(formObj.fm_est_date.value, formObj.to_est_date.value)<0) {
				ComShowCodeMessage("COM0114","Estimated OUT Date!");
				formObj.fm_est_date.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.fm_est_date)&&ComIsEmpty(formObj.to_est_date))||(ComIsEmpty(formObj.fm_est_date)&&!ComIsEmpty(formObj.to_est_date))) {
				ComShowCodeMessage("COM0114","Estimated OUT Date!");
				formObj.fm_est_date.focus();
				return false;
			}
			/*******************************************************************/
			break;
		case 'Add':
			if(formObj.h_consol_no.value == ""){
				ComShowCodeMessage("COM0220");
				return false;
			}
			break;
		case 'Select':
			var i=0;
			var j=0;
			for(var i=1;i<docObjects[0].rowcount+1;i++){
				if ( docObjects[0].GetCellValue(i,prefix+'tree_nodetype') == '1' && docObjects[0].GetCellValue(i,prefix+'chk') == '1' ){
					for(var j=i;j<docObjects[0].rowcount+1;j++){
						if ( docObjects[0].GetCellValue(i,prefix+'tree_nodetype') == docObjects[0].GetCellValue(j,prefix+'tree_nodetype')
								&& docObjects[0].GetCellValue(j,prefix+'chk') == '1'
									&& docObjects[0].GetCellValue(i,prefix+'tree_name') != docObjects[0].GetCellValue(j,prefix+'tree_name')){
							ComShowCodeMessage("COM0026");
							return false;
						}
					}
				}
			}
			break;
		case "ctrt_no":
			if (ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0145","Contract No");
				formObj.ctrt_no.focus();
				return false;
			}
			break;
		}
	}
	return true;
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "so_no":
			case "sb_no":
			case "hbl_no":
			case "mbl_no":
				btn_Search();
				break;
			case "ctrt_no":
				parm="ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&ord_tp_lvl1_cd='P'";
				if (!ComIsNull(srcValue)){				
					searchTlCtrtInfo(formObj,parm);
				} else {
					formObj.ctrt_nm.value="";
				}
				break;	
			case "ctrt_nm":	
				rtnary=new Array(1);
 				rtnary[0]="";
 				rtnary[1]=formObj.ctrt_nm.value;
 				callBackFunc = "setCtrtNoInfo";
 				modal_center_open('./ContractRoutePopup.clt', rtnary, 900, 580,"yes");
				break;
		}
	}
	return true;
}
/**
 * 시트를 클릭했을 때 처리
 * @param row
 * @param col
 * @return
 */
function sheet1_OnClick(sheetObj, row, col) {
	var formObj=document.form;
	var row_i=0;
	var colName=sheetObj.ColSaveName(col);
    var prefix="Grd01";
	if (col == 0){
		if (sheetObj.GetCellValue(row,prefix+"chk")!=1){
			sheetObj.SetCellValue(row, prefix+"chk", 1, 0);
			sheetObj.SetRowFontColor(row,"#00B400");
		} else {
			sheetObj.SetCellValue(row, prefix+"chk", 0, 0);
			sheetObj.SetRowFontColor(row,"#000000");
		}
		sheet1_Check(sheetObj, row);
//		1. MCLP No 가 부여된 값은 하나씩만 선택가능함
//		2. Empty는 여러 개 선택가능하되 Empty 인것만 여러 개 선택가능
//		3. Contract 가 서로 다른 Empty는 동시에 선택 불가
//		4. 선택하면 그 하위 레벨은 All check 되고 그 상위 레벨도 check된다.
		var checkRow=sheetObj.FindCheckedRow(prefix+"chk");
		var arrRow=checkRow.split("|");
	    var mclp_chk_cnt=0;
	    var ctrt_no="";
	    var parent_row=0;
	    if (arrRow.length  == 1 ) //ComBtnDisable("btn_Add");
	    ComEnableObject(document.form.btnAdd, false)
		for(var i=0;i<arrRow.length;i++){
			if (sheetObj.GetCellValue(arrRow[i],prefix+"chk")==1 && sheetObj.GetCellValue(arrRow[i],prefix+"tree_nodetype")=="1"){
				mclp_chk_cnt=mclp_chk_cnt + 1;
				if ( mclp_chk_cnt > 1){
					sheetObj.SetCellValue(row,prefix+"chk",0);
					ComShowCodeMessage("COM0254");
					return false;
				}
			} else if (sheetObj.GetCellValue(arrRow[i],prefix+"chk")==1 && sheetObj.GetCellValue(arrRow[i],prefix+"tree_nodetype")=="2"){
				parent_row=sheet1_FindParent(sheetObj,arrRow[i]);
				if (sheetObj.GetCellValue(parent_row,prefix+"tree_name")=="EMPTY"){
					ComEnableObject(document.form.btnAdd, true);//ComBtnEnable("btn_Add");
					if ( ComIsEmpty(ctrt_no)) {
						ctrt_no=sheetObj.GetCellValue(arrRow[i],prefix+"ctrt_no");
					} else if ( sheetObj.GetCellValue(arrRow[i],prefix+"ctrt_no") != ctrt_no ){
						sheetObj.SetCellValue(row,prefix+"chk",0);
						ComShowCodeMessage("COM0254");
						return false;
					}
				}
			}
		}
	}
	if(colName == "Grd01chk")
	{
		sheetObj.SetCellValue(0, prefix+"chk", "");
		sheet1_OnAfterCheck(sheetObj, row, "chk");
	}
}
function sheet1_OnAfterCheck(sheetObj, Row, Col){
	var prefix = "Grd01";
	if(sheetObj.GetCellValue(Row, prefix+"chk") != 1){
		sheetObj.SetCellValue(Row, prefix+"chk", 1);
	}else{
		sheetObj.SetCellValue(Row, prefix+"chk", 0);
	}
}
function sheet1_FindChild(sheetObj, row){
    var prefix="Grd01";
	var Row2=0;
	var chek="N";
	for(var i=row+1;i<sheetObj.RowCount()+2;i++){
		if ( chek == "N"){
			if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") < sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
				chek="Y";
			} else {
				if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") == sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
					chek="Y";
				} else {
					Row2=i;
				}
			}
		}
	}
	return Row2;
}
function sheet1_FindParent(sheetObj, row){
	var prefix="Grd01";
	var Row1=0;
	var chek="N";
	for(var i=row-1;i>=2;i--){
		if ( chek == "N"){
			if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") < sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
				Row1=i;
				break;
			} else {
				if ( sheetObj.GetCellValue(i,prefix+"tree_nodetype") == sheetObj.GetCellValue(row,prefix+"tree_nodetype")){
					chek="Y";
				} else {
					chek="Y";
				}
			}
		}
	}
	return Row1;
}

function sheet1_Check(sheetObj, row){
	var i=0;
	var j=0;
	var chk_flg="N";
	var Row_chk=0;
	var parent_row=0;
	var child_row=0;
    var prefix="Grd01";
    var tree_nodetype = sheetObj.GetCellValue(row,prefix+"tree_nodetype");
    if ( sheetObj.GetCellValue(row,prefix+"chk") == '1' ){
			child_row=sheet1_FindChild(sheetObj,row);
			if( sheetObj.GetCellValue(row,prefix+"tree_nodetype") != '5' ){
				for(var i=row;i<child_row+1;i++){
					sheetObj.SetCellValue(i,prefix+"chk",1,0);
					sheetObj.SetRowFontColor(i,"#00B400");
				}
			}
			Row_chk=row;
			var chk_parent = false;
			//for(;;){
			for(var i=row;i>=2;i--){
				chk_flg="N";
				if( sheetObj.GetCellValue(Row_chk,prefix+"tree_nodetype") =='1' ){
					break;
				}
				parent_row=sheet1_FindParent(sheetObj,i);
				if(chk_parent == false){
					if(parseInt(sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype")) < tree_nodetype){
						sheetObj.SetCellValue(parent_row,prefix+"chk",1);
						sheetObj.SetRowFontColor(parent_row,"#00B400");
						Row_chk=parent_row;
					}
					if(parseInt(sheetObj.GetCellValue(parent_row - 1, prefix+"tree_nodetype")) > parseInt(sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype"))){
						chk_parent = true;
						tree_nodetype = sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype");
					}
				}
				if(parseInt(sheetObj.GetCellValue(parent_row, prefix+"tree_nodetype")) < tree_nodetype){
					sheetObj.SetCellValue(parent_row,prefix+"chk",1,0);
					sheetObj.SetRowFontColor(parent_row,"#00B400");
					Row_chk=parent_row;
				}
			}
			check_flg="N";
		} else {
		child_row=sheet1_FindChild(sheetObj,row);
		if( sheetObj.GetCellValue(row,prefix+"tree_nodetype") != '5' ){
			for(var i=row;i<child_row+1;i++){
				sheetObj.SetCellValue(i,prefix+"chk",0);
				sheetObj.SetRowFontColor(i,"#000000");
			}
		}
		Row_chk=row;
		for(var k=row;k>=2;k--){
			chk_flg="N";
			if( sheetObj.GetCellValue(Row_chk,prefix+"tree_nodetype") =='1' ){
				break;
			}
			parent_row=sheet1_FindParent(sheetObj,k);	
			child_row=sheet1_FindChild(sheetObj,parent_row);
			for(var i=parent_row+1;i<child_row+1;i++){
				if( sheetObj.GetCellValue(i,prefix+"chk")!=0) chk_flg="Y";
			}
			if ( chk_flg == "N"){
				sheetObj.SetCellValue(parent_row,prefix+"chk",0);
				sheetObj.SetRowFontColor(parent_row,"#000000");
			} else {
				break;
			}
			Row_chk=parent_row;
		}
		check_flg="N";
	}
}
function btn_Add(){
	var prefix1 = "Grd01";
	var formObj=document.form;
	if (validateForm(docObjects[0],formObj,'Add')) {
		if (ComShowCodeConfirm("COM0219")){
			for(var i=2; i<= docObjects[0].RowCount(); i++)
				{
					if(docObjects[0].GetCellValue(i,prefix1 + "chk")==1)
						{
							docObjects[0].SetCellValue(i,prefix1 + "ibflag","U",0);
						}
				}
			if (!mclp_creation()) return false;
			//window.dialogArguments.setLoadPlan(formObj.f_consol_no.value);
			opener.setLoadPlan(formObj.f_consol_no.value);
			ComClosePopup(); 
		}
	}
}
function btn_Close(){
  ComClosePopup(); 
}
function btn_Select(){
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	var formObj=document.form;
	var i=0;
	var countselect = 0;
    var prefix="Grd01";
		for(;;){
			i=docObjects[0].FindText(prefix+'tree_nodetype','1',i+1);
			if ( docObjects[0].GetCellValue(i,prefix+'tree_nodetype') == '1' && docObjects[0].GetCellValue(i,prefix+'chk') == '1' ){
				formObj.f_consol_no.value=docObjects[0].GetCellValue(i,prefix+'tree_name');
				formObj.f_wh_cd.value=docObjects[0].GetCellValue(i,prefix+'wh_cd');
				countselect++;
				break;
			} else if ( i == -1 ) {
				break;
			}
		}
		if(countselect == 0)
		{
			ComShowCodeMessage("COM12189");
			return;
		}
		if(formObj.f_consol_no.value == "EMPTY"){
			if (ComShowCodeConfirm("COM0227")){
				if (mclp_creation()){
					opener.setLoadPlan(formObj.f_consol_no.value);
					ComClosePopup(); 
				}
			}
		} else {
			opener.setLoadPlan(formObj.f_consol_no.value);
			ComClosePopup(); 
		}
}
function mclp_creation(){
	var formObj=document.form;
	var sParm="";
	formObj.f_cmd.value = MODIFY;
	sParm=FormQueryString(formObj, null, "Grd00");
	sParm=sParm + "&" + docObjects[0].GetSaveString();
 	var sXml=docObjects[0].GetSearchData("./addCONSOL.clt", sParm);
 	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
    if($xml.find("res").text() == "1"){
		var InputName=$xml.find("consol_no").text();
		formObj.f_consol_no.value = InputName; 
//		ComsetXmlDataToForm2(sXml, InputName, 3);
	} else {
		return false;
	}
	return true;
}
function btn_consol_tp(){
	var formObj=document.form;
	if ( formObj.consol_tp[0].checked ) {
		formObj.liner_bkg_no.disabled=true;
		formObj.liner_bkg_no.value="";
	} else {
		formObj.liner_bkg_no.disabled=false;
		formObj.liner_bkg_no.value="";
	}
}
function btn_control(){
	document.getElementById("btn_Select").disabled = true;
	getBtnObj("btnAdd").disabled = true;
}
//Warehouse popup
function getLocInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.wh_cd.value="";
		form.wh_nm.value="";
	}else{
		searchLocInfo(formObj, ComGetObjValue(formObj.wh_cd), "wh_cd");
	}
}
function searchLocInfo (form, value, col){
	var formObj=document.form;
	ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.wh_cd.value, './GateServlet.gsl');
//	resultLocNm(sXml, col);
}
function resultLocNm(reqVal) {
	var formObj=document.form;
//	formObj.wh_cd.value=getXmlDataNullToNullString(resultXml,'loc_cd');
//	formObj.wh_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
	
	
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

function rtnData(){
	 var rtnVal="";
//	 if(sheet1.RowCount()>0)
//		 {
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "tree_name");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lp_sts_cd");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "bk_date");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ord_item_qty");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lp_item_ea_qty");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lp_item_cbm");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lp_item_grs_kgs");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "lp_item_net_kgs");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "cust_ord_no");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "est_out_dt");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "ctrt_no");
//			 rtnVal += "|";
//			 rtnVal += sheet1.GetCellValue(sheet1.GetSelectRow(), "wh_nm");
//		 }
	 return rtnVal;
}


