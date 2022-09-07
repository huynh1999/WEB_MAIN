/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ServiceOrderPopup.js
*@FileTitle  : Service Order
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/03/17
=========================================================*/
var docObjects=new Array();
var rtnary=new Array(1);
var callBackFunc = "";
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var firCalFlag=false;
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		var cal=new ComCalendar();
		switch(srcName) {
			case "SEARCHLIST":	
				btn_Search();
				break;
			case "CLOSE":	
				btn_Close();
				break;
			case "btn_ctrt_no":	
				btn_ctrt_no();
				break;
			case "btn_ctrt_cust_cd":	
				btn_ctrt_cust_cd();
				break;
			case "btn_per_to_dt":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.per_fr_dt, formObj.per_to_dt, 'MM-dd-yyyy');
				break;
			case "btn_etd_to_dt":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.etd_fr_dt, formObj.etd_to_dt, 'MM-dd-yyyy');
				break;
			case "btn_eta_to_dt":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.eta_from_dt, formObj.eta_to_dt, 'MM-dd-yyyy');
				break;
			case "btn_rgst_sys_to_dt":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.rgst_sys_fr_dt, formObj.rgst_sys_to_dt, 'MM-dd-yyyy');
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
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
 	//IBMultiCombo초기화
    /*for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }
	initControl();*/
	//setFocus(formObj.so_no);
	//getData_pnl_svc_tp_cd();
}

function getData_pnl_svc_tp_cd(){
//	var formObj = document.form;
//	formObj.f_cmd.value = SEARCHLIST;
//	
//	var params = FormQueryString(formObj);
//	
//	var xml = sheet1.GetSearchData("./");
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate",  document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
    //- 포커스 나갈때
	axon_event.addListenerForm('blur', 'form_deactivate', formObj);
    axon_event.addListenerForm('keydown', 'enter_Check',  document.form);
}
/**
 * Quick Search
 */
function enter_Check(){
	var keyValue=event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	var srcName=ComGetEvent("name");
	if(keyValue == "13"){
		if(srcName == "so_no" || srcName == "work_no" || srcName == "hbl_no" || srcName == "mbl_no" || srcName == "hawb_no" || srcName == "mawb_no"){ 
			btn_Search();
		}else{
			form_deactivate();
		}
	}
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {	
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	if(srcName == "ctrt_no"){ 
		if(ComIsNull(formObj.ctrt_no) ){
			ComSetObjValue(formObj.ctrt_nm, "");
		}else{
			searchTlCtrtInfo();			
		}
	}else if(srcName == "ctrt_cust_cd"){
		if(ComIsNull(formObj.ctrt_cust_cd) ){
			ComSetObjValue(formObj.ctrt_cust_nm, "");
		}else{
			searchTlCustInfo();
		}	
	}
}	
function searchTlCtrtInfo(){
	var formObj=document.form;
	if(formObj.ctrt_no.value != '')
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ComGetObjValue(formObj.ctrt_no)+'&ord_tp_lvl1_cd='+formObj.main_ord_tp_lvl1_cd.value+'&ord_tp_lvl2_cd='+formObj.main_ord_tp_lvl2_cd.value, './GateServlet.gsl');
}
function setTlCtrtInfo(reqVal){
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
}
function searchTlCustInfo(){
	var formObj=document.form;
	if(formObj.ctrt_cust_cd.value != '')
	ajaxSendPost(setTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+ComGetObjValue(formObj.ctrt_cust_cd), './GateServlet.gsl');
}
function setTlCustInfo(reqVal){
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
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
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
	var formObj=document.form;
 	var i=0;
 	var vTextSplit=null;
 	var vCodeSplit=null;
 	switch(comboObj.options.id) {
 		case "ord_tp_lvl1_cd":
			vTextSplit=ord_tp_lvl1_cdText.split("|");
			vCodeSplit=ord_tp_lvl1_cdCode.split("|");				
 			with(comboObj) {
 				SetDropHeight(125);
 				InsertItem(i++,  "All",  "ALL");
 				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
 				}
 				//if( !ComComIsNull(formObj.main_ord_tp_lvl1_cd.value)){
 				//	comboObj.Code=formObj.main_ord_tp_lvl1_cd.value;
 				//} else {
 				comboObj.SetSelectText("All");
 				//}
         	}
 			break;
 		case "ord_tp_lvl2_cd":
			vTextSplit=ord_tp_lvl2_cdText.split("|");
			vCodeSplit=ord_tp_lvl2_cdCode.split("|");				
 			with(comboObj) {
 				SetDropHeight(125);
 				InsertItem(i++,  "All",  "ALL");
 				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
 				}
 				comboObj.SetSelectText("All");
         	}
 			break;
 		case "pnl_svc_tp_cd":
			vTextSplit=pnl_svc_tp_cdText.split("|");
			vCodeSplit=pnl_svc_tp_cdCode.split("|");				
 			with(comboObj) {
 				SetDropHeight(125);
 				InsertItem(i++,  "All",  "ALL");
 				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
 				}
 				comboObj.SetSelectText("All");
         	}
 			break;
 	}    
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
//			      var hdr1='Seq|Service Order No|Order Category|Trans Mode|Main Service type|Contract|Contract|Contract Main Customer|Contract Main Customer|Route Plan No||||||||||||||||||||||||||||||||loc_job_no|loc_job_flg|loc_job_flg_nm|loc_job_close_dt|loc_job_close_dt_hm|frt_closing_dt|frt_closing_flg_nm';
//			      var hdr2='Seq|Service Order No|Order Category|Trans Mode|Main Service type|No|Name|Code|Name|Route Plan No||||||||||||||||||||||||||||||||loc_job_no|loc_job_flg|loc_job_flg_nm|loc_job_close_dt|loc_job_close_dt_hm|frt_closing_dt|frt_closing_flg_nm';

			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('ServiceOrderPopup_HDR1'), Align:"Center"},
			                        { Text:getLabel('ServiceOrderPopup_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"so_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:110,  Align:"Left",    ColMerge:1,   SaveName:"ord_tp_lvl1_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ord_tp_lvl2_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"ctrt_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrt_nm",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ctrt_cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrt_cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"rtp_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hawb_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mawb_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"etd_fr_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"etd_to_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"eta_from_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"eta_to_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"rgst_sys_fr_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"rgst_sys_to_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_ofc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_ofc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_pic_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sales_pic_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"por",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"por_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pol",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pol_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pol_etd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pod",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pod_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pod_eta",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"del",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"del_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"carrier_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"carrier_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"vsl_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"vsl_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"voy",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pnl_svc_tp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"est_cmpl_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_flg_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_close_dt",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_close_dt_hm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"frt_closing_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"frt_closing_flg_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(320);
			      SetEditable(0);
			      SetColProperty("ord_tp_lvl1_cd", {ComboText:ord_tp_lvl1_cdText, ComboCode:ord_tp_lvl1_cdCode} );
				  SetColProperty("ord_tp_lvl2_cd", {ComboText:ord_tp_lvl2_cdText, ComboCode:ord_tp_lvl2_cdCode} );
				  SetColProperty("pnl_svc_tp_cd", {ComboText:pnl_svc_tp_cdText, ComboCode:pnl_svc_tp_cdCode} );
				  resizeSheet();
			    }
			      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}


function btn_Search() {
	var formObj=document.form;
	if ((!ComIsEmpty(formObj.per_fr_dt)&&ComIsEmpty(formObj.per_to_dt))) {
		formObj.per_to_dt.value=ComGetNowInfo();
	}
	if ((!ComIsEmpty(formObj.etd_fr_dt)&&ComIsEmpty(formObj.etd_to_dt))) {
		formObj.etd_to_dt.value=ComGetNowInfo();
	}
	if ((!ComIsEmpty(formObj.eta_from_dt)&&ComIsEmpty(formObj.eta_to_dt))) {
		formObj.eta_to_dt.value=ComGetNowInfo();
	}
	if ((!ComIsEmpty(formObj.rgst_sys_fr_dt)&&ComIsEmpty(formObj.rgst_sys_to_dt))) {
		formObj.rgst_sys_to_dt.value=ComGetNowInfo();
	}
	if( ComIsNull(formObj.ctrt_no) 
		&&  ComIsNull(formObj.ctrt_cust_cd)
		&&  ComIsNull(formObj.so_no)
		&&  ComIsNull(formObj.hbl_no)
		&&  ComIsNull(formObj.mawb_no)
		&&  (ComIsNull(formObj.rgst_sys_fr_dt) || ComIsNull(formObj.rgst_sys_to_dt) ) )
	{	
		ComShowCodeMessage("COM0107", "Contract No, Customer, Service Order No, House BL No, MAWB No, Create Date");
		return;
	}
	if ((ComIsEmpty(formObj.per_fr_dt)&&!ComIsEmpty(formObj.per_to_dt))) {
		ComShowCodeMessage("COM0122","Performance Date!");
		formObj.per_fr_dt.focus();
		return;
	}
	if (getDaysBetween2(formObj.per_fr_dt.value, formObj.per_to_dt.value)<0) {
		ComShowCodeMessage("COM0122","Performance Date!");
		formObj.per_fr_dt.focus();
		return;
	}
	if ((ComIsEmpty(formObj.etd_fr_dt)&&!ComIsEmpty(formObj.etd_to_dt))) {
		ComShowCodeMessage("COM0122","ETD!");
		formObj.etd_fr_dt.focus();
		return;
	}
	if (getDaysBetween2(formObj.etd_fr_dt.value, formObj.etd_to_dt.value)<0) {
		ComShowCodeMessage("COM0122","ETD!");
		formObj.etd_fr_dt.focus();
		return;
	}
	if ((ComIsEmpty(formObj.eta_from_dt)&&!ComIsEmpty(formObj.eta_to_dt))) {
		ComShowCodeMessage("COM0122","ETA!");
		formObj.eta_from_dt.focus();
		return;
	}
	if (getDaysBetween2(formObj.eta_from_dt.value, formObj.eta_to_dt.value)<0) {
		ComShowCodeMessage("COM0122","ETA!");
		formObj.eta_from_dt.focus();
		return;
	}
	if ((ComIsEmpty(formObj.rgst_sys_fr_dt)&&!ComIsEmpty(formObj.rgst_sys_to_dt))) {
		ComShowCodeMessage("COM0122","Service Order Create Date!");
		formObj.rgst_sys_fr_dt.focus();
		return;
	}
	if (getDaysBetween2(formObj.rgst_sys_fr_dt.value, formObj.rgst_sys_to_dt.value)<0) {
		ComShowCodeMessage("COM0122","Service Order Create Date!");
		formObj.rgst_sys_fr_dt.focus();
		return;
	}
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
	sheet1.DoSearch("./ServiceOrderPopupGS.clt",FormQueryString(formObj));
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "so_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ord_tp_lvl1_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ord_tp_lvl2_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pnl_svc_tp_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctrt_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctrt_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctrt_cust_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctrt_cust_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "rtp_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "hbl_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "mbl_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "hawb_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "mawb_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "etd_fr_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "etd_to_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "eta_from_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "eta_to_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "rgst_sys_fr_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "rgst_sys_to_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "sales_ofc_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "sales_ofc_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "sales_pic_id");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "sales_pic_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "por");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "por_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pol");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pol_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pol_etd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pod");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pod_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pod_eta");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "del");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "del_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "carrier_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "carrier_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "vsl_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "vsl_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "voy");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pnl_svc_tp_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "est_cmpl_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "loc_job_no");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "loc_job_flg");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "loc_job_flg_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "loc_job_close_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "loc_job_close_dt_hm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "frt_closing_dt");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "frt_closing_flg_nm");
	ComClosePopup(rtnVal);
	//comPopupOK();
}
function btn_Dt(name){
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'MM-dd-yyyy');
}
function btn_ctrt_no(){
	var formObj=document.form;
	var sUrl = "ContractRoutePopup.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ord_tp_lvl1_cd="+formObj.main_ord_tp_lvl1_cd.value+"&ord_tp_lvl2_cd="+formObj.main_ord_tp_lvl2_cd.value;
	callBackFunc = "setContractInfo";
	modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function setContractInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.ctrt_no,				aryPopupData[0][0]);
	ComSetObjValue(formObj.ctrt_nm,			aryPopupData[0][1]);*/

	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];//full_nm
		   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	   } 
}
function btn_ctrt_cust_cd(){
	var formObj=document.form;
	var sUrl="CMM_POP_0010.clt?cust_cd="+formObj.ctrt_cust_cd.value;
	
	callBackFunc = "setCustomerInfo";
	modal_center_open(sUrl, callBackFunc, 900,550,"yes");
}
function setCustomerInfo(rtnVal){
	var formObj=document.form;
	
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.ctrt_cust_cd.value=rtnValAry[0];
	   formObj.ctrt_cust_nm.value=rtnValAry[2];
   }
}
function getDaysBetween2(fromVal, toVal) {
    var numstr1=fromVal.replace(/\/|\-|\./g,"");
    var user_day1=new Date(numstr1.substr(0,4), parseInt2(numstr1.substr(4,2))-1, parseInt2(numstr1.substr(6)));
    var numstr2=toVal.replace(/\/|\-|\./g,"");
    var user_day2=new Date(numstr2.substr(0,4), parseInt2(numstr2.substr(4,2))-1, parseInt2(numstr2.substr(6)));
    user_day1=user_day1.getTime();
    user_day2=user_day2.getTime();
    var day_gab=Math.floor( (user_day2 - user_day1) / (60*60*24*1000) );
    return day_gab;
}
function parseInt2(str) {
    return parseInt(str, 10);
}