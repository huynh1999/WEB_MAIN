/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ContractRoutePopup.js
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/20
=========================================================*/
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var rtnary=new Array(2);
var callBackFunc = "";

var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var loading_flag="N";
var dblclick_flag="N";
var curRow = 0;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */

//document.onchange=form_onChange;

//document.onkeydown=form_keyEnter;

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
//		var cal=new ComCalendar();
		switch(srcName) {
			case "SEARCHLIST":	
				sheet1.RemoveAll();
				sheet2.RemoveAll();
				sheet3.RemoveAll();
				btn_Search();
				break;
			case "btn_OK":	
				btn_OK();
				break;
			case "CLOSE":	
				btn_Close();
				break;
			case "btn_ctrt_cust_cd":	
				btn_ctrt_cust_cd();
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
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
//	ComOpenWait(true);
	doShowProcess(true);
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
//	ComOpenWait(false);
	doHideProcess(false);
	//initControl();
	loading_flag="Y";
	//if(!ComIsEmpty(formObj.ctrt_no.)||!ComIsEmpty(formObj.ctrt_nm)){
	//[WMS 개선 문의사항]-1.	Contract Search  : 1.1	Contract Search Pop-up 시 자동 Retreive되도록
	if(htmlDecode(formObj.ctrt_no.value)||htmlDecode(formObj.ctrt_nm.value)){
		btn_Search();
	}else{
		doWork('SEARCHLIST');
	}
	setFocus(formObj.ctrt_no);
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
	var arg = parent.rtnary;
	var formObj=document.form;
	if(arg != undefined && arg.length > 0){
		formObj.ctrt_no.value = arg[0];
		formObj.ctrt_nm.value = arg[1];
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
	}	
//	axon_event.addListenerForm("change", "form_onChange", formObj);
//	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
//  axon_event.addListener('keydown', 'form_keyEnter', 'form');
}
/**
 * 마우스 아웃일때 
 */
//function form_onChange() {
//	var formObj=document.form;
//	var srcName=ComGetEvent("name");
//	var srcValue=ComGetEvent("value");
//	if(srcName == "ctrt_cust_cd"){
//		if(formObj.ctrt_cust_cd.value ==""){
//			formObj.ctrt_cust_nm.value="";
//			return;
//		}
//		
//		if( formObj.ctrt_cust_cd_old.value != srcValue){
//			formObj.ctrt_cust_cd_old.value=srcValue;
//			if (!ComIsNull(srcValue)){				
////				searchTlCustInfo(formObj, ComGetObjValue(formObj.ctrt_cust_cd),"ctrt_cust_nm");
//				codeNameAction('CUSTUMER',formObj.ctrt_cust_cd, 'onBlur');
//				GetRegisterOfficeCd('CUSTOMER');
//			} else {
//				formObj.ctrt_cust_nm.value="";
//			}
//		}
//	} 
//}
function setTlCtrtInfo(reqVal){
	/*var formObj=document.form;
	ComSetObjValue(formObj.ctrt_no,				getXmlDataNullToNullString(sXml,'ctrt_no'));
	ComSetObjValue(formObj.ctrt_nm,			getXmlDataNullToNullString(sXml,'ctrt_nm'));*/
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.ctrt_cust_nm.value=rtnArr[0];
			}
			else{
				formObj.ctrt_cust_cd.value="";
				formObj.ctrt_cust_nm.value="";	
			}
		}
		else{
			formObj.ctrt_cust_cd.value="";
			formObj.ctrt_cust_nm.value="";	
		}
	}
	else{
		alert(getLabel('SEE_BMD_MSG43'));
	}
}
//function form_keyEnter(){
//    var backspace=8; 
//    var t=document.activeElement;  
//    var vKeyCode=event.keyCode;
//	var formObj=document.form;
//	var srcName=ComGetEvent("name");
//	var srcValue=ComGetEvent("value");
//    if (vKeyCode == 13) {
//		switch (srcName) {
//			case "ctrt_cust_nm":
//				break;
//			case "ctrt_cust_cd":	
//				form_onChange();
//				//if(formObj.ctrt_cust_cd.value!=""){
//				btn_Search();
//				//}
//				break;		
//			default:				
//				btn_Search();
//				break;
//		}
//	}
//    if (event.keyCode == backspace) { 
//        if (t.tagName == "SELECT") {
//        	return false;
//        } 
//        if (t.tagName == "INPUT" && t.getAttribute("readonly") == "readonly"){
//        	return false;
//        } 
//    } 
//    return true;
//}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ContractRoutePopup_SHEET1_HDR1'), Align:"Center"},
	                      { Text:getLabel('ContractRoutePopup_SHEET1_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_use_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"ctrt_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"sales_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,   Align:"Left",    ColMerge:1,   SaveName:"sales_ofc_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"sales_pic_id",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"sales_pic_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eff_fr_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eff_to_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,   Align:"Left",    ColMerge:1,   SaveName:"ctrt_cust_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,    Align:"Left",    ColMerge:1,   SaveName:"rtp_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,    Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,    Align:"Left",    ColMerge:1,   SaveName:"loc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,    Align:"Left",    ColMerge:1,   SaveName:"loc_addr",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Text",      Hidden:1, Width:80,    Align:"Left",    ColMerge:1,   SaveName:"ctrt_cust_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1}, // wms #1069 Closing other entry
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	             ];
	      
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	      resizeSheet();
	      SetFocusAfterProcess(1);
	      }
	      break;
		case 2:      //IBSheet1 init
		    with(sheetObj){

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	    
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ContractRoutePopup_SHEET2_HDR1'), Align:"Center"},
	                      { Text:getLabel('ContractRoutePopup_SHEET2_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ord_tp_lvl1_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"ord_tp_lvl2_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svc_hbl",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svc_hawb",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svc_sb",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svc_wb",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svc_wo",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"rtp_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl1_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl2_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl3_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl3_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl4_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl4_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_kwd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"loc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"loc_addr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
//	      SetSheetHeight(400);
	      SetEditable(0);
	      resizeSheet();
	      SetFocusAfterProcess(0);
	      }
	      break;
		case 3:      //IBSheet1 init
		    with(sheetObj){

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	     
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('ContractRoutePopup_SHEET3_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"rtp_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_ofc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_pic_id",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_pic_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_cust_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl1_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl1_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl2_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl2_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_addr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      //SetSheetHeight(0);
	      SetVisible(false);
	      SetEditable(0);
	            }
	      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
	ComResizeSheet(docObjects[1]);
}

function sheet1_OnSearchEnd(sheetObj, mssgErr){
	doDispPaging(sheet1.GetCellValue(2, "Indexing"), getObj('pagingTb'));
}


function btn_Search() {
	var formObj=document.form;
	if(loading_flag == "Y"){
		//alert(FormQueryString(formObj));
		/*if(formObj.ctrt_no.value == "" && formObj.ctrt_nm.value.trim().length < 3 && formObj.ctrt_cust_cd.value == ""){
			ComShowCodeMessage("COM0098", "Contract Name" ,"3");
			return;
		}*/
		formObj.f_cmd.value=SEARCH;
 		docObjects[0].DoSearch("./searchContractOrderTypeList.clt", FormQueryString(formObj, ""));
		//searchContractRouteList.clt
		//docObjects[0].LoadSearchData(sXml,{Sync:1} );
		sheet1_OnClick(docObjects[0], "2", "");
	}
}

function goToPage(callPage){
	 docObjects[0].RemoveAll();
	 document.form.f_CurPage.value=callPage; 
	 btn_Search();
	} 

function searchList(){
	document.form.f_CurPage.value=1;
	 btn_Search();
}

function getData(curRow){
	var rtnVal = "";
	//0-9
	rtnVal += sheet1.GetCellValue(curRow, "ctrt_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "ctrt_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "sales_ofc_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "sales_ofc_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "sales_pic_id");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "sales_pic_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "eff_fr_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "eff_to_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "ctrt_cust_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "rtp_no");
	rtnVal += "|";
	//10-19
	rtnVal += sheet1.GetCellValue(curRow, "pnl_svc_tp_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "loc_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(curRow, "loc_addr");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ctrt_no");
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ctrt_nm");                         
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "rtp_no");                          
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "sales_ofc_cd");                    
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "sales_ofc_nm");                    
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "sales_pic_id");                    
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "sales_pic_nm");                    
	rtnVal += "|";                                                                           
	//20-28                                                                                  
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "pnl_svc_tp_cd");                   
	rtnVal += "|";                                                                           
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "pnl_svc_tp_nm");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ctrt_cust_cd");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ord_tp_lvl1_cd");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ord_tp_lvl1_nm");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ord_tp_lvl2_cd");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "ord_tp_lvl2_nm");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "loc_cd");
	rtnVal += "|";
	rtnVal += sheet3.GetCellValue(sheet3.GetSelectRow(), "loc_addr");
	rtnVal += "|";
	//29
	rtnVal += sheet1.GetCellValue(curRow, "ctrt_cust_nm"); // wms #1069 Closing other entry
	return rtnVal;
}
function btn_Close() {
  ComClosePopup(); 
}
function btn_OK(){
	if( docObjects[0].RowCount()== 0 ){
		ComShowCodeMessage("COM0253");	
	}else{
		curRow = sheet1.GetSelectRow();
		sheet3_OnDblClick(docObjects[2], curRow);  
	}	
}
function sheet1_OnClick(sheetObj, Row, Col){
//	var formObj=document.form;
//	var sParam = "f_cmd="+SEARCH01+"&ctrt_no="+sheetObj.GetCellValue(Row, "ctrt_no")+"&ord_tp_lvl1_cd="+formObj.ord_tp_lvl1_cd.value+"&ord_tp_lvl2_cd="+formObj.ord_tp_lvl2_cd.value+"&ctrt_use_flg="+formObj.ctrt_use_flg.value+"&org_cd="+formObj.org_cd.value;
// 	docObjects[1].DoSearch("./searchContractRouteList.clt", sParam);
 	var formObj=document.form;
	var sParam = "&f_cmd="+SEARCH01+"&ctrt_no="+sheetObj.GetCellValue(Row, "ctrt_no")+"&ord_tp_lvl1_cd="+formObj.ord_tp_lvl1_cd.value+"&ord_tp_lvl2_cd="+formObj.ord_tp_lvl2_cd.value+"&ctrt_use_flg="+formObj.ctrt_use_flg.value+"&org_cd="+formObj.org_cd.value;
 	docObjects[1].DoSearch("./searchContractRouteList.clt", sParam);
	//searchContractRouteList.do
// 	docObjects[1].LoadSearchData(sXml, {Sync:1} );
}
function sheet1_OnDblClick(sheetObj, Row, Col){
    //[WMS 개선 문의사항]-1.	Contract Search  : 1.2	리스트에서 Contract 을 선택시 첫 Double Click이 작동이 안되고, 두번째에 작동되는 불편 개선.
	doWork('btn_OK');
	return;
	/*
	var formObj=document.form;
	var changeFlg=true;
	curRow = Row;
	if( isNull(formObj.old_ctrt_no) && isNull(formObj.old_rpt_no) ){
		dblclick_flag="Y"; 
//		sheet1_OnClick(docObjects[0], Row, Col);
		//sheet3_OnDblClick(docObjects[2], "1");
	}else{
		var sheetObj3=docObjects[2];
		sheetObj3.DataInsert(0);
		sheetObj3.SetCellValue(1,0,sheetObj.GetCellValue(Row, "ctrt_no"));
		sheetObj3.SetCellValue(1,2,sheetObj.GetCellValue(Row, "rtp_no"));
		//2013.07.31 Chungrue 추가 Contract나 E-SOP 화면에서 사용시에는 Validation을 걸어주지 않는다.
		if(formObj.ctrt_use_flg.value == ""){
			/*if( sheetObj.GetCellValue(Row, "pnl_svc_tp_cd") == "" ){
				ComShowCodeMessage("COM0155");
				changeFlg=false;
			}*/
			/*1.2	리스트에서 Contract 을 선택시 첫 Double Click이 작동이 안되고, 두번째에 작동되는 불편 개선.
			if( ComGetObjValue(formObj.old_ctrt_no) == sheetObj.GetCellValue(Row, "ctrt_no") &&
				ComGetObjValue(formObj.old_rpt_no) == sheetObj.GetCellValue(Row, "rtp_no") ){
				ComShowCodeMessage("COM0030");
				changeFlg=false;
			}
		}
		if(changeFlg)
			ComClosePopup(getData(curRow));		
	}
*/
}
function sheet2_OnDblClick(sheetObj, Row, Col){
	sheet3_OnDblClick(docObjects[2], "1");
}
function sheet2_OnSearchEnd(){
	if(dblclick_flag == "Y"){
		sheet3_OnDblClick(docObjects[2], "1");		
	}
}
function sheet3_OnDblClick(sheetObj, Row){
	var formObj=document.form;
	var changeFlg=true; 
	var sheet2_selectrow=0;
	sheet2_selectrow=docObjects[1].GetSelectRow();
	if ( sheet2_selectrow < 1 ) sheet2_selectrow=1;
	sheetObj.DataInsert(0);
	sheetObj.SetCellValue(1,0,docObjects[0].GetCellValue(curRow, "ctrt_no"));
	sheetObj.SetCellValue(1,1,docObjects[0].GetCellValue(curRow, "ctrt_nm"));
	sheetObj.SetCellValue(1,2,docObjects[1].GetCellValue(sheet2_selectrow, "rtp_no"));
	sheetObj.SetCellValue(1,3,docObjects[0].GetCellValue(curRow, "sales_ofc_cd"));
	sheetObj.SetCellValue(1,4,docObjects[0].GetCellValue(curRow, "sales_ofc_nm"));
	sheetObj.SetCellValue(1,5,docObjects[0].GetCellValue(curRow, "sales_pic_id"));
	sheetObj.SetCellValue(1,6,docObjects[0].GetCellValue(curRow, "sales_pic_nm"));
	sheetObj.SetCellValue(1,7,docObjects[1].GetCellValue(sheet2_selectrow, "pnl_svc_tp_cd"));
	sheetObj.SetCellValue(1,8,docObjects[1].GetCellValue(sheet2_selectrow, "pnl_svc_tp_nm"));
	sheetObj.SetCellValue(1,9,docObjects[0].GetCellValue(curRow, "ctrt_cust_cd"));
	sheetObj.SetCellValue(1,10,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl1_cd"));
	sheetObj.SetCellValue(1,11,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl1_nm"));
	sheetObj.SetCellValue(1,12,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl2_cd"));
	sheetObj.SetCellValue(1,13,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl2_nm"));
	sheetObj.SetCellValue(1,14,docObjects[1].GetCellValue(sheet2_selectrow, "loc_cd"));
	sheetObj.SetCellValue(1,15,docObjects[1].GetCellValue(sheet2_selectrow, "loc_addr"));
	//2013.07.31 Chungrue 추가 Contract나 E-SOP 화면에서 사용시에는 Validation을 걸어주지 않는다.
	if(formObj.ctrt_use_flg.value == ""){
		/*if( docObjects[1].GetCellValue(sheet2_selectrow, "pnl_svc_tp_cd") == "" ){
			ComShowCodeMessage("COM0155");
			changeFlg=false;
		}*/
		if( ComGetObjValue(formObj.old_ctrt_no) == docObjects[0].GetCellValue(curRow, "ctrt_no") &&
			ComGetObjValue(formObj.old_rpt_no) == docObjects[1].GetCellValue(sheet2_selectrow, "rtp_no") ){
			ComShowCodeMessage("COM0030");
			changeFlg=false;
		}
	}
	if(changeFlg)
		ComClosePopup(getData(curRow));
}
function sheet1_OnKeyDown(sheetObj, Row, Col, KeyCode){
	var formObj=document.form;
	curRow = Row;
	switch(KeyCode)	{
	    case 13: 
	    	if( isNull(formObj.old_ctrt_no) && isNull(formObj.old_rpt_no) ){
	    		dblclick_flag="Y"; 
	    		sheet1_OnClick(docObjects[0], Row, Col);
	    		//sheet3_OnDblClick(docObjects[2], "1");	
	    	}else{
	    		var sheetObj3=docObjects[2];
	    		sheetObj3.DataInsert(0);
	    		sheetObj3.SetCellValue(1,0,sheetObj.GetCellValue(Row, "ctrt_no"));
	    		sheetObj3.SetCellValue(1,2,sheetObj.GetCellValue(Row, "rtp_no"));
	    		//2013.07.31 Chungrue 추가 Contract나 E-SOP 화면에서 사용시에는 Validation을 걸어주지 않는다.
	    		if(formObj.ctrt_use_flg.value == ""){
	    			if( sheetObj.GetCellValue(Row, "pnl_svc_tp_cd") == "" ){
	    				ComShowCodeMessage("COM0155");
	    				changeFlg=false;
	    			}
	    			if( ComGetObjValue(formObj.old_ctrt_no) == sheetObj.GetCellValue(Row, "ctrt_no") &&
	    				ComGetObjValue(formObj.old_rpt_no) == sheetObj.GetCellValue(Row, "rtp_no") ){
	    				ComShowCodeMessage("COM0030");
	    				changeFlg=false;
	    			}
	    		}
	    		if(changeFlg)
	    			ComClosePopup(getData(curRow));		
	    	}
	    break;
	}
}
function sheet2_OnKeyDown(sheetObj, Row, Col, KeyCode, Shift){
	switch(KeyCode)	{
	    case 13: 
	    	sheet3_OnDblClick(docObjects[2], "1");
	    break;
	}
}
function sheet3_OnKeyDown(sheetObj, Row, Col, KeyCode){
	var formObj=document.form;
	var changeFlg=true; 
	var sheet2_selectrow=0;
	switch(KeyCode)	{
	    case 13: 
	    	sheet2_selectrow=docObjects[1].GetSelectRow();
	    	if ( sheet2_selectrow == 0 ) sheet2_selectrow=1;
	    	sheetObj.DataInsert(0);
	    	sheetObj.SetCellValue(1,0,docObjects[0].GetCellValue(curRow, "ctrt_no"));
	    	sheetObj.SetCellValue(1,1,docObjects[0].GetCellValue(curRow, "ctrt_nm"));
	    	sheetObj.SetCellValue(1,2,docObjects[1].GetCellValue(sheet2_selectrow, "rtp_no"));
	    	sheetObj.SetCellValue(1,3,docObjects[0].GetCellValue(curRow, "sales_ofc_cd"));
	    	sheetObj.SetCellValue(1,4,docObjects[0].GetCellValue(curRow, "sales_ofc_nm"));
	    	sheetObj.SetCellValue(1,5,docObjects[0].GetCellValue(curRow, "sales_pic_id"));
	    	sheetObj.SetCellValue(1,6,docObjects[0].GetCellValue(curRow, "sales_pic_nm"));
	    	sheetObj.SetCellValue(1,7,docObjects[1].GetCellValue(sheet2_selectrow, "pnl_svc_tp_cd"));
	    	sheetObj.SetCellValue(1,8,docObjects[1].GetCellValue(sheet2_selectrow, "pnl_svc_tp_nm"));
	    	sheetObj.SetCellValue(1,9,docObjects[0].GetCellValue(curRow, "ctrt_cust_cd"));
	    	sheetObj.SetCellValue(1,10,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl1_cd"));
	    	sheetObj.SetCellValue(1,11,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl1_nm"));
	    	sheetObj.SetCellValue(1,12,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl2_cd"));
	    	sheetObj.SetCellValue(1,13,docObjects[1].GetCellValue(sheet2_selectrow, "ord_tp_lvl2_nm"));
	    	sheetObj.SetCellValue(1,14,docObjects[1].GetCellValue(sheet2_selectrow, "loc_cd"));
	    	sheetObj.SetCellValue(1,15,docObjects[1].GetCellValue(sheet2_selectrow, "loc_addr"));
	    	//2013.07.31 Chungrue 추가 Contract나 E-SOP 화면에서 사용시에는 Validation을 걸어주지 않는다.
	    	if(formObj.ctrt_use_flg.value == ""){
	    		if( docObjects[1].GetCellValue(sheet2_selectrow, "pnl_svc_tp_cd") == "" ){
	    			ComShowCodeMessage("COM0155");
	    			changeFlg=false;
	    		}
	    		if( ComGetObjValue(formObj.old_ctrt_no) == docObjects[0].GetCellValue(curRow, "ctrt_no") &&
	    			ComGetObjValue(formObj.old_rpt_no) == docObjects[1].GetCellValue(sheet2_selectrow, "rtp_no") ){
	    			ComShowCodeMessage("COM0030");
	    			changeFlg=false;
	    		}
	    	}
	    	if(changeFlg)
	    		ComClosePopup(getData(curRow));
	    break;
	}
}
function btn_ctrt_cust_cd(){
	 var formObj=document.form;
	rtnary=new Array(2);
	rtnary[0]="";
	rtnary[1]=formObj.ctrt_cust_nm.value;
	rtnary[2]=window;
	callBackFunc = "CT_POPLIST";
	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
}

function CT_POPLIST(rtnVal){
	var formObj=document.form;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.ctrt_cust_cd.value=rtnValAry[0];//full_nm
		   formObj.ctrt_cust_nm.value=rtnValAry[2];//full_nm
	   }             
	}

function setCtrtNoInfo(aryPopupData){
	 var formObj=document.form;
	 if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		formObj.ctrt_cust_cd.value=rtnValAry[0];//full_nm
		formObj.ctrt_cust_nm.value=rtnValAry[1];//full_nm
	 }
}

function setCustomerInfo(aryPopupData){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_cust_cd.value=rtnValAry[1];//full_nm
		formObj.ctrt_cust_nm.value=rtnValAry[2];//full_nm
		formObj.ctrt_cust_cd_old.value=rtnValAry[1];//full_nm
	}
}

function searchTlCustInfo (form, cust_cd, col_nm){
	var formObj=document.form;
	/*var sXml = sheet1.GetSearchData("./searchTlCustInfo.clt?f_cmd="+SEARCH02+"&cust_cd="+cust_cd);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}
	setFieldValue(eval("formObj.ctrt_cust_cd"), getXmlDataNullToNullString(sXml,'cust_cd'));
	setFieldValue(eval("formObj.ctrt_cust_nm"), getXmlDataNullToNullString(sXml,'addr1'));*/
//	displayData(sXml);
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+cust_cd, './GateServlet.gsl');
}
function displayData(xml){
	var formObj  = document.frm1;
	
	var xmlDoc = $.parseXML(xml);
	var $xml = $(xmlDoc);
	
	var exception_msg = $xml.find("exception_msg").text();
	if(exception_msg != ""){
		alert(exception_msg);
	}
	
	$("#cust_itm_id").val($xml.find("cust_itm_id").text());
	$("#cust_cd").val($xml.find("cust_cd").text());
	$("#exception_msg").val($xml.find("exception_msg").text());
	$("#addr1").val($xml.find("addr1").text());
	
	var cust_cd = $xml.find("cust_cd").text();
	var addr1 = $xml.find("addr1").text();
	
	setFieldValue(eval("formObj.ctrt_cust_cd"), getXmlDataNullToNullString(sXml, cust_cd));
	setFieldValue(eval("formObj.ctrt_cust_nm"), getXmlDataNullToNullString(sXml, addr1));
}

/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'ctrt_cust_cd':
			if( ComIsEmpty(formObj.ctrt_cust_nm) || formObj.ctrt_cust_nm.value == "" ){
				ComShowCodeMessage("COM0114","Contract Main Customer");
				formObj.ctrt_cust_cd.value="";	
				formObj.ctrt_cust_cd.focus();
				return false;
			}
			break;
		}
	}
	return true;
}
function Upper_String(obj){
	//alert(obj.value);
	obj.value = obj.value.toUpperCase();
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
			formObj.ctrt_cust_cd.value="";//cust_cd  AS param1
			formObj.ctrt_cust_nm.value="";//cust_nm   AS param2
		}
		/*if (CODETYPE == "commodity") {
			formObj.itm_hts_cd.value="";// itm_hts_cd AS param1
			formObj.itm_hts_nm.value="";// itm_hts_nm AS param2
		}*/
	}
}

function GetRegisterOfficeCd(custType){
	var formObj=document.form;
	switch(custType){
		case "CUSTOMER":
			ajaxSendPost(GetRegisterOfficeCodeCustomer, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+formObj.ctrt_cust_cd.value, './GateServlet.gsl');
			break;
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
				formObj.ctrt_cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.ctrt_cust_nm.value=masterVals[3];	//cust_nm   AS param2
				// #2363: Don't auto search data when input Customer Code and focusout.
//				docObjects[0].RemoveAll();
//				btn_Search();
				//searchItem();
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.splr_rcvr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.splr_rcvr_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.trkr_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.ctrt_cust_cd.value="";				//cust_cd  AS param1
				formObj.ctrt_cust_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.splr_rcvr_cd.value="";				//itm_hts_cd  AS param1
				formObj.splr_rcvr_nm.value="";				//itm_hts_nm   AS param2
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

function GetRegisterOfficeCodeCustomer(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.ofc_cd_cust.value = rtnArr[0];
			}
		}
	}
}