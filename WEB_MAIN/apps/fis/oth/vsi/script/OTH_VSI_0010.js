﻿
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_VSI_0010.js
*@FileTitle  : Shipping Instruction Entry
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/09
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var gloSaveCheck = true;
function doWork(srcName) {
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	
		switch (srcName) {
		case "SEARCH":
			if (formObj.vndr_si_no.value == "") {
				alert(getLabel('FMS_COM_ALT014') + "\n - " + getLabel('FMS_COD_SINO'));
				formObj.vndr_si_no.focus();
				return;
			}
			formObj.f_cmd.value=SEARCH;
			doShowProcess();
			sheetObj2.DoSearch("OTH_VSI_0010GS.clt", FormQueryString(formObj) );
		break;
		case "SAVE":
			if (!validateForm(sheetObj, formObj, MULTI)) return;
			/*if(gloSaveCheck == false){
				alert(getLabel('FMS_COM_ALT091'));
				return;
			}*/
			textarea_autoenter_50(formObj.to_trdp_addr);
			if(checkTxtAreaLn(formObj.to_trdp_addr, 62, 50, 'To Address') == false){
				return;
			}
			textarea_autoenter_50(formObj.frt_to_trdp_addr);
			if(checkTxtAreaLn(formObj.frt_to_trdp_addr, 62, 50, 'Freight To Address') == false){
				return;
			}
			textarea_autoenter_50(formObj.doc_to_trdp_addr);
			if(checkTxtAreaLn(formObj.doc_to_trdp_addr, 62, 50, 'Document To Address') == false){
				return;
			}
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				//doShowProcess();
				showCompleteProcess();
				formObj.f_cmd.value=MULTI;
				sheetObj.DoAllSave("OTH_VSI_0010GS.clt", FormQueryString(formObj));
			}
		break;
		case "PRINT":
			if (formObj.vndr_si_no.value == "") return;
			formObj.title.value="Shipping Instruction";
			formObj.file_name.value="vendor_shipping_instruction.mrd";
			//Parameter Setting
			var param="";
			param += "[" + formObj.vndr_si_no.value + "]"; //$1
			param += "[" + phn + "]"; //$2
			param += "[" + fax + "]"; //$3
			param += "[" + eml + "]"; //$4
			formObj.rd_param.value=param;
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
		break;
		case "NEW":
			/*
			sheetObj.RemoveEtcData();
			sheetObj.RemoveAll();
			formObj.reset();
			sheet1_OnLoadFinish(sheetObj);
			*/
			if(confirm(getLabel('FMS_COM_CFMNEW'))){
				doShowProcess();
				var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	//			parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
				window.location.href = currLocUrl
			}
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
	for (i=0;i<docObjects.length;i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	sheet1_OnLoadFinish(sheet1);
	setSheetEditing(docObjects[0]);
	if (frm1.vndr_si_no.value != "") {
		doWork("SEARCH");
	}
	
	//#1207 [Shipping Instruction Entry] Cannot auto suggestion when name inputted	
	fnSetAutocompleteCallBack('to_trdp_nm', 'TRDP_POPUP_TO', 'LINER_POPLIST'); //To
	fnSetAutocompleteCallBack('frt_to_trdp_nm', 'TRDP_POPUP_FRT', 'LINER_POPLIST'); //Freight
	fnSetAutocompleteCallBack('doc_to_trdp_nm', 'TRDP_POPUP_DOC', 'LINER_POPLIST'); //Document To
}
function setSheetEditing(sheetObj) {
 	for (var i=0; i<sheetObj.LastRow() + 1; i++) {
 		switch (sheetObj.GetCellValue(i, "dcmt_cd")) {
			case "CI":
				sheetObj.SetCellEditable(i, "dcmt_nm",0);
			break;
			case "PL":
				sheetObj.SetCellEditable(i, "dcmt_nm",0);
			break;
			case "LC":
				sheetObj.SetCellEditable(i, "dcmt_nm",0);
			break;
			case "ED":
				sheetObj.SetCellEditable(i, "dcmt_nm",0);
			break;
		}
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
		case 1:    //IBSheet1 init
            with(sheetObj){
			SetConfig( { SearchMode:2, MergeSheet:1, Page:20, DataRowMerge:0 } );

			var info    = { Sort:1, ColMove:0, HeaderCheck:0, ColResize:1 };
			var headers = [ { Text:getLabel("OTH_VSI_0010_HDR1"), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Status",    Hidden:1, Width:35,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
			             {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
			             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dcmt_nm", UpdateEdit:0, InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"dcmt_cd" , UpdateEdit:0, InsertEdit:0} ];

			InitColumns(cols);

			SetEditable(1);
			SetWaitImageVisible(0);
			SetCountPosition(0);
			//ColIndent("dcmt_nm")=2;
			SetHeaderRowHeight(25);
			//style.height=GetSheetHeight(6);
			SetSheetHeight(200);
}


		break;
	}
}

function sheet2_OnSearchEnd(){
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	
	var formObj=document.frm1;
	if (sheetObj2.GetEtcData("result_yn") == "Y") {
		
		// Sheet에 존재하는 EtcData를 HTML의 Form안에 Element에 setting
		IBS_EtcDataToForm(formObj, sheetObj2);
		
		with (sheetObj) {
			formObj.oth_doc_txt.value=sheetObj2.GetEtcData("oth_doc_txt");
			
			// Document List setting
			for (var i=0; i<sheetObj.LastRow()+1; i++) {
				switch (GetCellValue(i, "dcmt_cd")) {
					case "CI":
						SetCellValue(i, "chk",formObj.ci_flg.value,0);
						SetCellEditable(i, "dcmt_nm",0);
					break;
					case "PL":
						SetCellValue(i, "chk",formObj.pl_flg.value,0);
						SetCellEditable(i, "dcmt_nm",0);
					break;
					case "LC":
						SetCellValue(i, "chk",formObj.lc_flg.value,0);
						SetCellEditable(i, "dcmt_nm",0);
					break;
					case "ED":
						SetCellValue(i, "chk",formObj.shp_exp_dcl_flg.value,0);
						SetCellEditable(i, "dcmt_nm",0);
					break;
					case "OH":
						SetCellValue(i, "chk",formObj.oth_flg.value,0);
						if (formObj.oth_flg.value == "1") {
							SetCellValue(i, "dcmt_nm",("OTHER:" + formObj.oth_doc_txt.value));
						}
					break;
				}
			}
		}
	} else {
		// No Data found!
		alert(getLabel("FMS_COM_ALT010"));
		//formObj.vndr_si_no.value = "";
		formObj.vndr_si_no.focus();
	}
	doHideProcess();
} 

/**
 * IBSeet Object 인스턴스가 생성 완료될때 발생하는 Event
 * (페이지 로딩시 자동 호출)
 */
 function sheet1_OnLoadFinish(sheetObj) {
	// frt_to_trdp_cd에 강제로 OnBlur 이벤트 발생
	getNameByCode(document.frm1.frt_to_trdp_cd,"OnBlur");
	// doc_to_trdp_cd에 강제로 OnBlur 이벤트 발생
	getNameByCode(document.frm1.doc_to_trdp_cd,"OnBlur");
	// JSP에서 setting된 dcmtListXml를 sheet에 loading
	sheetObj.LoadSearchData(dcmtListXml,{Sync:0} );
	
}
/**
 * IBSeet내의 데이터 영역의 값이 변경되었을 때 발생하는 Event<br>
 * @param {sheetObj} String : 해당 IBSheet셀 명
 * @param {Row} Long : 해당 셀의 Row Index
 * @param {Col} Long : 해당 셀의 Column Index
 * @param {Value} String : 변경된 값, Format이 적용되지 않은 저장 시 사용되는 값
 */
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.frm1;
	with (sheetObj) {
		switch (ColSaveName(Col)) {
			case "chk":
				switch (GetCellValue(Row, "dcmt_cd")) {
					case "CI":
						formObj.ci_flg.value=Value;
					break;
					case "PL":
						formObj.pl_flg.value=Value;
					break;
					case "LC":
						formObj.lc_flg.value=Value;
					break;
					case "ED":
						formObj.shp_exp_dcl_flg.value=Value;
					break;
					case "OH":
						formObj.oth_flg.value=Value;
						if (Value == "1") {
							formObj.oth_doc_txt.value=GetCellValue(Row, "dcmt_nm").replaceAll("OTHER:","");
						} else {
							formObj.oth_doc_txt.value="";
						}
					break;
				}
			break;
			case "dcmt_nm":
				if (GetCellValue(Row, "chk") == "1") {
					formObj.oth_doc_txt.value=Value.replaceAll("OTHER:","");
				} else {
					formObj.oth_doc_txt.value="";
				}
			break;
		}
	}
}
/**
 * IBSeet 저장 함수를 이용하여 저장이 완료되고 발생하는 Event
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {ErrMsg} String : 저장 후 메시지
 */
function sheet1_OnSaveEnd(sheetObj, ErrMsg) {
	if (ErrMsg != "") return;
	document.frm1.vndr_si_no.value=sheetObj.GetEtcData("vndr_si_no");
	// Save completed!
	//alert(getLabel('FMS_COM_NTYSAV'));
	/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
	hideProcess('COMPLETE', parent.document);	//Saved 숨김 효과 추가 
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
	
		case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendar();
	        cal.select(formObj.est_shp_dt, 'MM-dd-yyyy');
	    break;
		
	     case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	    	 var cal=new ComCalendar();
		      cal.select(formObj.snd_dt, 'MM-dd-yyyy');
	     break;
		
		
		case "USER_POPUP":
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "USER_POPUP";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
			
		break;
		case "TRDP_POPUP":
			rtnary=new Array(1);
			rtnary[0]="1";
//			rtnary[1]=(obj.value == null || obj.value == "undefined" || obj.value== undefined ? "": obj.value.toUpperCase());
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "TRDP_POPUP";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
		break;
		case "TRDP_POPUP_NAME":
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=(obj.value == null || obj.value == "undefined" || obj.value== undefined ? "": obj.value.toUpperCase());
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
function getNameByCode(obj, tmp) {
	if (tmp == "OnBlur") {
		var objPrefix=obj.name.replace("_cd", "").replace("_nm", "");
		
		if (obj.value != "") {
			ajaxSendPost(reqTrdpCd, objPrefix, "&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code=" + obj.value.toUpperCase(), "./GateServlet.gsl");
		} else {
			var formObj=document.frm1;
			formObj[objPrefix + "_cd"].value="";
			formObj[objPrefix + "_nm"].value="";
			formObj[objPrefix + "_addr"].value="";
			formObj[objPrefix + "_pic_nm"].value="";
			formObj[objPrefix + "_pic_phn"].value="";
			formObj[objPrefix + "_pic_fax"].value="";
		}
	} else {
		if (window.event.keyCode == 13 || window.event.type == "blur") { // Fix bug 42349: slide 1 => Modified : OnKeyPress Event Error
			var objPrefix=obj.name.replace("_cd", "").replace("_nm", "");
			
			if (obj.value != "") {
				ajaxSendPost(reqTrdpCd, objPrefix, "&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code=" + obj.value.toUpperCase(), "./GateServlet.gsl");
			} else {
				var formObj=document.frm1;
				formObj[objPrefix + "_cd"].value="";
				formObj[objPrefix + "_nm"].value="";
				formObj[objPrefix + "_addr"].value="";
				formObj[objPrefix + "_pic_nm"].value="";
				formObj[objPrefix + "_pic_phn"].value="";
				formObj[objPrefix + "_pic_fax"].value="";
			}
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
			var masterVals=doc[1].split('@@;')[0].split('@@^');
			formObj[objPrefix + "_cd"].value=masterVals[0];    // trdp_cd
			formObj[objPrefix + "_nm"].value=masterVals[3];    // eng_nm
			formObj[objPrefix + "_addr"].value=masterVals[15];    // locl_addr
			formObj[objPrefix + "_pic_nm"].value=masterVals[10];    // pic_nm
			formObj[objPrefix + "_pic_phn"].value=masterVals[11];    // pic_phn
			formObj[objPrefix + "_pic_fax"].value=masterVals[12];    // pic_fax
		} else {
			formObj[objPrefix + "_cd"].value="";
			formObj[objPrefix + "_nm"].value="";
			formObj[objPrefix + "_addr"].value="";
			formObj[objPrefix + "_pic_nm"].value="";
			formObj[objPrefix + "_pic_phn"].value="";
			formObj[objPrefix + "_pic_fax"].value="";
		}
	}
}
 
function changeVndrSiNo() {
	var formObj=document.frm1;
	var vndrSiNo=formObj.vndr_si_no.value;
	
//	doWork("NEW");
	formObj.vndr_si_no.value=vndrSiNo;
}
/**
 * 화면 폼입력값에 대한 유효성검증 프로세스 처리
 */
function validateForm(sheetObj, formObj, sAction){
	with(formObj){
		switch(sAction) {
			case MULTI:    // SAVE
				if (formObj.to_trdp_cd.value == "") {
					// Please enter a Mandatory Value! (Red indicates required field)
					alert(getLabel("FMS_COM_ALT007")  + "\n - " + getLabel('FMS_COD_TO'));
					formObj.to_trdp_cd.focus();
					return false;
				}
				if (formObj.frt_to_trdp_cd.value == "") {
					// Please enter a Mandatory Value! (Red indicates required field)
					alert(getLabel("FMS_COM_ALT007")   + "\n - " + getLabel('ITM_FRT_TO'));
					formObj.frt_to_trdp_cd.focus();
					return false;
				}
				if (formObj.snd_dt.value == "") {
					// Please enter a Mandatory Value! (Red indicates required field)
					alert(getLabel("FMS_COM_ALT007") + "\n - " + getLabel('FMS_COD_SENDDT'));
					formObj.snd_dt.focus();
					return false;
				}
				if (formObj.doc_to_trdp_cd.value == "") {
					// Please enter a Mandatory Value! (Red indicates required field)
					alert(getLabel("FMS_COM_ALT007") + "\n - " + getLabel('FMS_COD_DOCTO'));
					formObj.doc_to_trdp_cd.focus();
					return false;
				}
				if(formObj.rmk.value!=''&&checkInputVal(formObj.rmk.value, 0, 500, "T", '')!='O'){
					alert(getLabel("FMS_COM_ALT007"));
					formObj.rmk.focus();
					return false;
				}
			break;
		}
	}
	return true;
}

function USER_POPUP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnArr=rtnVal.split("|");
		var objPrefix=cur_obj.name.replace("id", "").replace("nm", "");
		
		$("#" + objPrefix + "cd").val(rtnArr[0]);
		$("#" + objPrefix + "nm").val(rtnArr[2]);
	}
}

function TRDP_POPUP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnArr=rtnVal.split("|");
		var objPrefix=cur_obj.name.replace("_cd", "").replace("_nm", "");
		
		$("#" + objPrefix + "_cd").val(rtnArr[0]);
		$("#" + objPrefix + "_nm").val(rtnArr[2]);
		$("#" + objPrefix + "_addr").val(rtnArr[27]);
		$("#" + objPrefix + "_pic_nm").val(rtnArr[3]);
		$("#" + objPrefix + "_pic_phn").val(rtnArr[4]);
		$("#" + objPrefix + "_pic_fax").val(rtnArr[5]);
	}
}


function TRDP_POPUP_TO(rtnVal){
	cur_obj = document.frm1.to_trdp_nm;
	TRDP_POPUP(rtnVal);
}

function TRDP_POPUP_FRT(rtnVal){
	cur_obj = document.frm1.frt_to_trdp_nm;
	TRDP_POPUP(rtnVal);
}

function TRDP_POPUP_DOC(rtnVal){
	cur_obj = document.frm1.doc_to_trdp_nm;
	TRDP_POPUP(rtnVal);
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.vndr_si_no.value = getParam(url,"vndr_si_no");
	formObj.vndr_si_no.value = getParam(url,"vndr_si_no");
	
	doWork('SEARCH');
}
function chkCmpAddra(obj, msgTxt){
	textarea_autoenter_50(obj);
	if(checkTxtAreaLn(obj, 62, 50, msgTxt) == false){
		gloSaveCheck = false;
	}else{
		gloSaveCheck = true;
	} 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	
	var formObj=document.frm1;
	
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="dcmt_nm"){
		formObj.sts_cd.focus();
	}
}