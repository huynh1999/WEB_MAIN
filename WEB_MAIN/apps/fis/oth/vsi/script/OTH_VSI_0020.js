/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_VSI_0020.js
*@FileTitle  : Shipping Instruction List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	switch(srcName) {
		case "SEARCHLIST":
			if(!chkSearchCmprPrd(false, frm1.f_snd_strdt, frm1.f_snd_enddt)){
				return;
			}
			if(!chkSearchCmprPrd(false, frm1.f_est_shp_strdt, frm1.f_est_shp_enddt)){
				return;
			}
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("OTH_VSI_0020GS.clt", FormQueryString(formObj) );
		break;
       	case "NEW":
       	    var paramStr="./OTH_VSI_0010.clt?f_cmd=-1";
       	   	parent.mkNewFrame('Shipping Instruction Entry', paramStr);
		break;
		case "PRINT":
			if(sheetObj.SearchRows()== 0){
				//There is no data
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				var row=sheetObj.GetSelectRow();
				//alert(row + " | " + sheetObj.CellValue(row, "vndr_si_no") + " | " + sheetObj.CellValue(row, "to_trdp_nm"));
				var vndrSiNo=sheetObj.GetCellValue(row, "vndr_si_no");
				formObj.title.value="Shipping Instruction";
				formObj.file_name.value="vendor_shipping_instruction.mrd";
				//Parameter Setting
				var param='[' + vndrSiNo + ']';
				param += '[' + formObj.f_phn.value + ']';
				param += '[' + formObj.f_fax.value + ']';
				param += '[' + formObj.f_email.value + ']';
				formObj.rd_param.value=param;
				popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
		break;
		case "CLEAR":
			clearAll();
		break;
	}
}
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	setFromToDtEndPlus(document.frm1.f_snd_strdt, 30, document.frm1.f_snd_enddt, 0);
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
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
	switch(sheetNo) {
		 case 1:      //IBSheet1 init
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel("OTH_VSI_0020_HDR1"), Align:"Center"} ];
		        InitHeaders(headers, info);
		        var cols = [ {Type:"Text",     Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"to_trdp_nm" },
		               {Type:"Text",     Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"frt_to_trdp_nm" },
		               {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"po_no" },
		               {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"snd_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"est_shp_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"sts_nm" },
		               {Type:"Text",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"snd_usrnm" },
		               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"vndr_si_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		        InitColumns(cols);
		        SetEditable(0);
		        //InitViewFormat(0, "snd_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		        //InitViewFormat(0, "est_shp_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		        SetSheetHeight(410);
		        resizeSheet();
		        }
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
		// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	doProcess=true;
/*
   	var paramStr="";
   	paramStr += "./OTH_VSI_0010.clt?f_cmd=";
paramStr += "&vndr_si_no=" + sheetObj.GetCellValue(Row,"vndr_si_no");
*/
var paramStr="./OTH_VSI_0010.clt?f_cmd=&vndr_si_no=" + sheetObj.GetCellValue(Row,"vndr_si_no");
   	parent.mkNewFrame('Shipping Instruction Entry', paramStr, "OTH_VSI_0010_SHEET_" + sheetObj.GetCellValue(Row,"vndr_si_no"));
}
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.s_rgst_strdt.value)!= "" && trim(formObj.s_rgst_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.s_rgst_strdt,formObj.s_rgst_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: SEC_FRT_0040.306");
			formObj.s_rgst_enddt.focus();
			return false;
		}
	}
	return true;
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay9(doWhat, formObj) {
	alert(doWhat);
	switch(doWhat){
		case 'DATE11':   //달력 조회 From ~ To 팝업 호출
			var cal=new ComCalendarFromTo();
			cal.select(formObj.f_snd_strdt, formObj.f_snd_enddt, 'MM-dd-yyyy');
		break;
		case 'DATE22':   //달력 조회 From ~ To 팝업 호출
			var cal=new ComCalendarFromTo();
			cal.select(formObj.f_est_shp_strdt, formObj.f_est_shp_enddt, 'MM-dd-yyyy');
		break;
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param object
 * @return
*/
var cur_obj;
function doDisplay(doWhat, obj) {
	cur_obj = obj;
	var formObj=document.frm1;
	switch (doWhat) {
		case 'DATE11':   //달력 조회 From ~ To 팝업 호출
			var cal=new ComCalendarFromTo();
			cal.select(formObj.f_snd_strdt, formObj.f_snd_enddt, 'MM-dd-yyyy');
		break;
		case 'DATE22':   //달력 조회 From ~ To 팝업 호출
			var cal=new ComCalendarFromTo();
			cal.select(formObj.f_est_shp_strdt, formObj.f_est_shp_enddt, 'MM-dd-yyyy');
		break;
		case "CALENDAR":   //달력 조회 From ~ To 팝업 호출
			var cal=new calendarPopup();
			cal.select(obj, obj.name, 'MM-dd-yyyy');
		break;
		case "USER_POPUP":
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "USER_POPUP";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 556,480,"yes");
			
		break;
		case "TRDP_POPUP":
			rtnary=new Array(1);
			rtnary[0]="1";
//			rtnary[1]=(obj.value==null||obj.value=="undefined"||obj.value==undefined ? "": obj.value.toUpperCase());
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "TRDP_POPUP";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "TRDP_POPUP_NAME":
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=(obj.value==null||obj.value=="undefined"||obj.value==undefined ? "": obj.value.toUpperCase());
			rtnary[2]=window;
			callBackFunc = "TRDP_POPUP";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
	}
}
function doDisplay2(doWhat, obj) {
	if (window.event.keyCode == 13) {
		doDisplay(doWhat, obj);
	}
}
/**
 * Trade Partner code로 name조회
 */
function getNameByCode(obj) {
	if (window.event.keyCode == 13 || window.event.type == "blur") {
		var objPrefix=obj.name.replace("_cd", "").replace("_nm", "");
		if (obj.value != "") {
			ajaxSendPost(reqTrdpCd, objPrefix, "&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code=" + obj.value.toUpperCase(), "./GateServlet.gsl");
		} else {
			var formObj=document.frm1;
			formObj[objPrefix + "_cd"].value="";
			formObj[objPrefix + "_nm"].value="";
		}
	}
}
/**
 * Trade Partner code로 name조회 결과처리
 */
 function reqTrdpCd(reqVal, objPrefix){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0] == "OK") {
		if (typeof(doc[1]) != "undefined") {
			var masterVals=doc[1].split('@@^');
			formObj[objPrefix + "_cd"].value=masterVals[0];
			formObj[objPrefix + "_nm"].value=masterVals[3];
		} else {
			formObj[objPrefix + "_cd"].value="";
			formObj[objPrefix + "_nm"].value="";
		}
	}
}
function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	setFromToDtEndPlus(document.frm1.f_snd_strdt, 30, document.frm1.f_snd_enddt, 0);
	formObj.f_sts_cd.value="";
}
//Calendar flag value
var firCalFlag=false;
function TRDP_POPUP(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnArr = rtnVal.split("|");
		var objPrefix = cur_obj.name.replace("_cd", "").replace("_nm", "");
		formObj[objPrefix + "_cd"].value = rtnArr[0];
		formObj[objPrefix + "_nm"].value = rtnArr[2];
	}
}

function USER_POPUP(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnArr = rtnVal.split("|");
		var objPrefix = cur_obj.name.replace("id", "").replace("_nm", "");
		formObj[objPrefix + "id"].value = rtnArr[0];
		formObj[objPrefix + "_nm"].value = rtnArr[1];
	}
}

function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}