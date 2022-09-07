//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;


var isSaveFlag = false; // save 여부

/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj = document.form;	
	
	// hidden sheet 처리
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }	
//	
	//initControl();	
	
	// 화면 초기화
	wBin_New();	
	
	
	var page_tp = formObj.page_tp.value;
	setSelectPrintOption(page_tp);	
	setCondEnable(page_tp);
	
	// 디폴트 Search 실행
	if (page_tp == "ALLC") { // Allocation
		if (!isNull(formObj.walc_no)) {
			btn_SearchAllc();
		}
	} else if (page_tp == "LP") { // By Load Plan
		if (!isNull(formObj.lp_no)) {
			btn_SearchLp();
		}		
	} else if(page_tp == "WAVE"){ //Wave
		if (!isNull(formObj.wave_no)) {
			btn_SearchWave();
		}
	}
}

/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++] = combo_obj;
 }

 /**
  * Combo 기본 설정 
  * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
  * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
  */ 
 
 
/** 
 * initControl()
 */ 
document.onchange=form_onChange;
function initControl() {
	var formObj = document.form;
//  axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//  axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
//  axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
//	axon_event.addListenerForm("change", "form_onChange", formObj);
//	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
}

/**
 * 화면 초기화
 */
function wBin_New(){
	var formObj = document.form;
	
	// 초기값 세팅
	//comSetObjValue(formObj.form_mode, "NEW");
	formObj.form_mode.value="NEW";
	
	// Print Size 세션값 세팅
	var paper_size = formObj.paper_size.value;	
	if (!ComIsNull(paper_size)) {
		//comboObjects[0].Code = paper_size;
	}
}

// 화면 Merge 컬럼 Name
var InputNameAllc = "||||supv_nm|outbound_loc_cd|outbound_loc_nm|gate_no|pick_dt|pick_hm_fr|pick_hm_to|pick_by|msg_to_pick|insp_by|insp_hm_fr|insp_hm_to|msg_to_insp";

/**
 * Search (Allocation)
 */
function getTotalRow(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA")[0].getAttribute("TOTAL")
		
}
function btn_SearchAllc() {
	var formObj = document.form;
	
	formObj.f_cmd.value=SEARCH;
	var sXml = docObjects[0].GetSearchData("./WHOutbkPrintOptionGS.clt", FormQueryString(formObj, null, ""));
	if(getTotalRow(sXml)!="0")
		{
			displayData(sXml,"PS");
		}
//	var arrXml = sXml.split("|$$|");
//
//	if (ComGetTotalRows(arrXml[0]) == "0") { // Create
//		for (var i = 0; i<arrXml.length; i++) {
//			if (i == 0) {
//				ComsetXmlDataToForm2(arrXml[i], InputNameAllc, 0);
//			}
//		}
//	} else { // Document
//		for (var i = 0; i<arrXml.length; i++) {
//			if (i == 0) {
//				ComsetXmlDataToForm2(arrXml[i], InputNameAllc, 0);
//			} 
//		}
//		ComSetObjValue(formObj.form_mode, "UPDATE");		
//	}
}

//화면 Merge 컬럼 Name
var InputNameWave = "||||supv_nm|outbound_loc_cd|outbound_loc_nm|gate_no|pick_dt|pick_hm_fr|pick_hm_to|pick_by|msg_to_pick|insp_by|insp_hm_fr|insp_hm_to|msg_to_insp|wave_wob_bk_no";
/**
 * Search (Wave)
 */
function btn_SearchWave() {
	var formObj = document.form;
	
	formObj.f_cmd.value=SEARCH02;
	var sXml = docObjects[0].GetSaveData("./WHOutbkPrintOptionGS.clt", FormQueryString(formObj, null, ""));
	if(getTotalRow(sXml)!="0")
	{
		displayData(sXml,"WAVE");
	}
	
//	var arrXml = sXml.split("|$$|");
//	if (ComGetTotalRows(arrXml[0]) == "0") { // Create
//		for (var i = 0; i<arrXml.length; i++) {
//			if (i == 0) {
//				ComsetXmlDataToForm2(arrXml[i], InputNameWave, 0);
//			}
//		}
//	} else { // Document
//		for (var i = 0; i<arrXml.length; i++) {
//			if (i == 0) {
//				ComsetXmlDataToForm2(arrXml[i], InputNameWave, 0);
//			}
//		}
//		ComSetObjValue(formObj.form_mode, "UPDATE");		
//	}
}
//화면 Merge 컬럼 Name
var InputNameLp = "||||supv_nm|outbound_loc_cd|outbound_loc_nm|gate_no||pick_hm_fr|pick_hm_to|pick_by|msg_to_pick|insp_by|insp_hm_fr|insp_hm_to|msg_to_insp||load_by|load_hm_fr|load_hm_to|msg_to_load";

/**
 * Search (By Load Plan)
 */
function btn_SearchLp() {
	var formObj = document.form;
	
	formObj.f_cmd.value=SEARCH01;
	var sXml = docObjects[0].GetSaveData("./WHOutbkPrintOptionGS.clt", FormQueryString(formObj, null, ""));
	if(getTotalRow(sXml)!="0")
	{
		displayData(sXml,"LP");
	}
	
//	var arrXml = sXml.split("|$$|");
//	if (ComGetTotalRows(arrXml[0]) == "0") { // Create		
//		for (var i = 0; i<arrXml.length; i++) {
//			if (i == 0) {
//				ComsetXmlDataToForm2(arrXml[i], InputNameLp, 0);
//			}
//		}
//	} else { // Document
//		for (var i = 0; i<arrXml.length; i++) {
//			if (i == 0) {
//				ComsetXmlDataToForm2(arrXml[i], InputNameLp, 0);
//			}
//		}
//		ComSetObjValue(formObj.form_mode, "UPDATE");		
//	}
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++] = sheet_obj;
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init (hidden sheet)
            with(sheetObj){
            
		      var hdr1="";
		     // var headCount=ComCountHeadTitle(hdr1);
		      //(headCount, 0, 0, true);
		      var prefix="Grd01";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(170);
		      SetEditable(1);
            }
            break;
	}
}


//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */

//document.onclick = processButtonClick;

//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
   
	/*******************************************************/
	var formObj = document.form;

	try {
//		var srcName = ComGetEvent("name");		

		switch(srcName) {
 			case "btn_outbound_loc_cd" :
 				/*if (ComDisableTdButton("btn_outbound_loc_cd", 2)) {
 					return;
 				} */				
 				if (document.getElementById('btn_outbound_loc_cd').disabled) {
 					return;
 				} 
 				if (ComIsEmpty(formObj.wh_cd)) {
 					ComShowCodeMessage("COM0114", "Warehouse");
 					return;
 				}
 				var sUrl = "WarehouseLocPopup.clt?f_loc_cd=" + ComGetObjValue(formObj.wh_cd);
 				 //rtnary=new Array(1);
 				 //rtnary[0]=formObj.wh_cd.value;
 				 callBackFunc = "setPutawayLocInfo";
 				 modal_center_open(sUrl, callBackFunc, 700, 500,"yes");
 				break;
 			case "btn_pick_date":	
 				/*if (ComDisableTdButton("btn_pick_date", 2)) {
 					return;
 				}*/
 				if (document.getElementById('btn_pick_date').disabled) {
 					return;
 				} 
 				//document.getElementById(btId).disabled
 				var cal = new ComCalendar();
 	            cal.select(formObj.pick_dt, 'MM-dd-yyyy');
 				break;
 			case "SAVE":	
 				btn_Save();
 				break;
 			case "PRINT":	
 				btn_Print();
 				break;
 			case "CLOSE":	
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

function setPutawayLocInfo(aryPopupData) {
//	var formObj = document.form;
//	ComSetObjValue(formObj.outbound_loc_cd,     aryPopupData[0][1]);// wh_loc_cd
//	ComSetObjValue(formObj.outbound_loc_nm,     aryPopupData[0][2]);// wh_loc_nm
}
function setPutawayLocInfo(rtnVal){
	var formObj = document.form;
	var sheetObj=docObjects[0];
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		setFieldValue(formObj.outbound_loc_cd, rtnValAry[0]);
		setFieldValue(formObj.outbound_loc_nm, rtnValAry[1]);
	}        
    
}

/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj = document.form;
	var srcName = ComGetEvent("name");
	var srcValue = ComGetEvent("value");
	
	if (srcName == "outbound_loc_nm") {
		if (srcValue != "") {
			var sParam = "f_loc_cd=" + formObj.wh_cd.value + "&f_wh_loc_nm=" + srcValue;
			/*$.ajax({
				url : "searchWarehouseLocInfoForName.clt?"+sParam,
				success : function(result) {
					ComSetObjValue(formObj.outbound_loc_cd,     getXmlDataNullToNullString(result.xml,'wh_loc_cd')); // wh_loc_cd
					ComSetObjValue(formObj.outbound_loc_nm,     getXmlDataNullToNullString(result.xml,'wh_loc_nm')); // wh_loc_nm
					
					if (getXmlDataNullToNullString(result.xml,'exception_msg') != "") {
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						ComSetFocus(formObj.outbound_loc_nm);
					}
				}
			});*/
			var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?",sParam);
			//ComSetObjValue(formObj.outbound_loc_cd,     getXmlDataNullToNullString(sXml,'wh_loc_cd')); // wh_loc_cd
			//	ComSetObjValue(formObj.outbound_loc_nm,     getXmlDataNullToNullString(sXml,'wh_loc_nm')); // wh_loc_nm
			displayData(sXml);
//			if (getXmlDataNullToNullString(sXml,'exception_msg') != "") {
//				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				ComSetFocus(formObj.outbound_loc_nm);
//			}
		} else {
			//ComSetObjValue(formObj.outbound_loc_cd,     ""); // wh_loc_cd
			//ComSetObjValue(formObj.outbound_loc_nm,     ""); // wh_loc_nm
			setFieldValue(formObj.outbound_loc_cd, "")
			setFieldValue(formObj.outbound_loc_nm, "")
		}				
	}
}
/**
 * Message (To Worker) 길이 체크
 */
function msg_to_pick_lenChk(){
	var formObj = document.form;
	if (formObj.msg_to_pick.value.length > 100) {
		ComShowCodeMessage("COM0215", "Message(To Worker)[100]");
		formObj.msg_to_pick.value = formObj.msg_to_pick.value.substring(0, 100);
	}
}

/**
 * Message (To Inspector) 길이 체크
 */
function msg_to_insp_lenChk(){
	var formObj = document.form;
	if (formObj.msg_to_insp.value.length > 100) {
		ComShowCodeMessage("COM0215", "Message(To Inspector)[100]");
		formObj.msg_to_insp.value = formObj.msg_to_insp.value.substring(0, 100);
	}
}

/**
 * Message (To Worker) 길이 체크
 */
function msg_to_load_lenChk(){
	var formObj = document.form;
	
	if (formObj.msg_to_load.value.length > 100) {
		ComShowCodeMessage("COM0215", "Message(To Worker)[100]");
		formObj.msg_to_load.value = formObj.msg_to_load.value.substring(0, 100);
	}
}

/**
 * Save
 */
function btn_Save() {	
	var formObj = document.form;
	var sheetObj = docObjects[0];
	
	// 필수 입력 체크 않함 => Print Option	
	if (formObj.msg_to_pick.value.length > 100) {
		// Message (To Worker)
		ComShowCodeMessage("COM0215", "Message(To Worker)[100]");
		ComSetFocus(formObj.msg_to_pick);
		return;
	} else if (formObj.msg_to_insp.value.length > 100) {
		// Message (To Inspector)
		ComShowCodeMessage("COM0215", "Message(To Inspector)[100]");
		ComSetFocus(formObj.msg_to_insp);
		return;
	} else if (formObj.msg_to_load.value.length > 100) {
		// Message (To Worker)
		ComShowCodeMessage("COM0215", "Message(To Worker)[100]");
		ComSetFocus(formObj.msg_to_load);
		return;
	}
	
	var page_tp = ComGetObjValue(formObj.page_tp);		
	//var sParam = FormQueryString(formObj, null, "Grd03");

	//allc일경우 walc_no가 없을경우 체크
	if (page_tp == "ALLC") {
		if (isNull(formObj.walc_no)) {
			ComShowCodeMessage("COM0002", "Allocation No");
			return;		
		} 
	}
	else if (page_tp == "WAVE") { //wave에 할당된건이 없을경우
		if (isNull(formObj.wave_wob_bk_no)) {
			ComShowCodeMessage("COM0002", "Allocation");
			return;		
		} 
	}
	
	//confirm
	if (ComShowCodeConfirm("COM0036") == false) {
		return;
	}

	var saveXml = "";		    
	if (page_tp == "ALLC") {
		formObj.f_cmd.value=MULTI;
		var sParam = FormQueryString(formObj, null, "Grd03");
		//saveXml = docObjects[0].GetSaveData("saveWHPickShtInfo.clt", sParam);
		saveXml = docObjects[0].GetSearchData("WHOutbkPrintOptionGS.clt", sParam);	
		
	} else if (page_tp == "LP") {
		formObj.f_cmd.value=MULTI01;
		var sParam = FormQueryString(formObj, null, "Grd03");
		//saveXml = docObjects[0].GetSaveData("saveWHPickShtLoadPlanInfo.clt", sParam);
		saveXml = docObjects[0].GetSearchData("WHOutbkPrintOptionGS.clt", sParam);
	} else if (page_tp == "WAVE") {
		formObj.f_cmd.value=MULTI02;
		var sParam = FormQueryString(formObj, null, "Grd03");
		//saveXml = docObjects[0].GetSaveData("saveWHPickShtWaveInfo.clt", sParam);
		saveXml = docObjects[0].GetSearchData("WHOutbkPrintOptionGS.clt", sParam);
	}		    

	//sheetObj.LoadSaveXml(saveXml);	
	
	// Save 후 조회
	if (saveXml.indexOf('<ERROR>') == -1) {			
		ComShowCodeMessage("COM132601"); // Saved successfully.
		if (page_tp == "ALLC") {
			btn_SearchAllc();
		} else if (page_tp == "LP") {
			btn_SearchLp();
		} else if (page_tp == "WAVE") {
			btn_SearchWave();
		}
	}
}

/**
 * Close
 */
function btn_Close() {
	ComClosePopup();
}

/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getOutboundLocInfo(obj) {
	var formObj = document.form;	
	if (obj.value != "") {
		var sParam = "f_loc_cd=" + ComGetObjValue(formObj.wh_cd) + "&f_wh_loc_nm=" + obj.value;
		/*$.ajax({			
			url : "searchWarehouseLocInfoForName.clt?"+sParam,
			success : function(result) {
				ComSetObjValue(formObj.outbound_loc_cd, getXmlDataNullToNullString(result.xml,'wh_loc_cd')); // wh_loc_cd
				ComSetObjValue(formObj.outbound_loc_nm, getXmlDataNullToNullString(result.xml,'wh_loc_nm')); // wh_loc_nm				
				
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
					ComSetFocus(formObj.outbound_loc_nm);					
				}
			}
		});*/
		var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
		ComSetObjValue(formObj.outbound_loc_cd, getXmlDataNullToNullString(sXml,'wh_loc_cd')); // wh_loc_cd
		ComSetObjValue(formObj.outbound_loc_nm, getXmlDataNullToNullString(sXml,'wh_loc_nm')); // wh_loc_nm				
		
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			ComSetFocus(formObj.outbound_loc_nm);					
		}
	} else {
		ComSetObjValue(formObj.outbound_loc_cd, ""); // wh_loc_cd
		ComSetObjValue(formObj.outbound_loc_nm, ""); // wh_loc_nm
	}			
}

/**
 * Print
 */
function btn_Print() {	
	var formObj=document.form;
	var fileName = "";
	var param= "";
	formObj.title.value="Outbound Booking Entry";
	var param = "";
	var page_tp = ComGetObjValue(formObj.page_tp);	
	//allc일경우 walc_no가 없을경우 체크
	if (page_tp == "ALLC") {
		if (isNull(formObj.walc_no)) {
			ComShowCodeMessage("COM0002", "Allocation No");
			return;		
		} 
	}
	else if (page_tp == "WAVE") { //wave에 할당된건이 없을경우
		if (isNull(formObj.wave_wob_bk_no)) {
			ComShowCodeMessage("COM0002", "Allocation");
			return;		
		} 
	}
	
	var wob_bk_no = new Array();
	if (page_tp == "WAVE") 
	{
		var wave_wob_bk_no = ComGetObjValue(formObj.wave_wob_bk_no).split("|");
		for(var m = 0; m<wave_wob_bk_no.length; m++)
		{
			wob_bk_no[m] = wave_wob_bk_no[m];
		}
	}
	else
	{
		wob_bk_no[0] = ComGetObjValue(formObj.wob_bk_no);
	}
	var wob_out_no = ComGetObjValue(formObj.wob_out_no);	
	var lp_no = ComGetObjValue(formObj.lp_no);	
	var rdoUnitConvYn = ComGetObjValue(formObj.rdoUnitConvYn);
		
	if (!$('input[name="chOption1"]').is(":checked") && 
	    !$('input[name="chOption2"]').is(":checked") &&
	    !$('input[name="chOption3"]').is(":checked") &&
	    !$('input[name="chOption4"]').is(":checked") &&
	    !$('input[name="chOption5"]').is(":checked") &&
	    !$('input[name="chOption6"]').is(":checked") &&
	    !$('input[name="chOption7"]').is(":checked") &&
	    !$('input[name="chOption8"]').is(":checked")) {
		ComShowCodeMessage("COM0122", "print Option");
		return;
	}	
	

	// Warehouse Outbound Sheet
	if ($('input[name="chOption1"]').is(":checked")) {
	    //rdParam = "/rv " + "WOB_BK_NO['" + wob_bk_no + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
		fileName += "^@@^" + 'WH_OUT_BK.mrd';         완료
		param +="^@@^" + '['  + wob_bk_no + ']';
	}
	
	//--wave와 allc가 섞여있음
	for(var i = 0; i<wob_bk_no.length; i++)
	{
		// Picking Work Sheet [ Total ]
		if ($('input[name="chOption2"]').is(":checked")) {
		    //rdParam = "/rv " + "WOB_BK_NO['" + wob_bk_no[i] + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
			fileName += "^@@^" + 'WH_OUT_PICKING_SHT.mrd';
			param +="^@@^" + '['  + wob_bk_no[i] + ']';	// [1]
			param += '[' + rdoUnitConvYn + ']';
		}
		
		// Picking Work Sheet [ Case type ]
		if ($('input[name="chOption3"]').is(":checked")) {
		    //rdParam = "/rv " + "WOB_BK_NO['" + wob_bk_no[i] + "']" + " UNIT_CONV_YN['Y'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
			fileName += "^@@^" + 'WH_OUT_PICKING_CA_SHT.mrd';
			param +="^@@^" + '['  + wob_bk_no[i] + ']';	// [1]
			param += '['+ 'Y' + ']';
		}
		
		// Picking Work Sheet [ Each type ]
		if ($('input[name="chOption4"]').is(":checked")) {
		    //rdParam = "/rv " + "WOB_BK_NO['" + wob_bk_no[i] + "']" + " UNIT_CONV_YN['Y'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
			fileName += "^@@^" + 'WH_OUT_PICKING_EA_SHT.mrd';
			param +="^@@^" + '[' + wob_bk_no[i] + ']';	// [1]
			param += '['+ 'Y' + ']';
		}
		
		// Picking Inspection Sheet
		if ($('input[name="chOption5"]').is(":checked")) {
		    //rdParam = "/rv " + "WOB_BK_NO['" + wob_bk_no[i] + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
			fileName +="^@@^" + 'WH_OUT_INSPECTION_SHT.mrd';
			param +="^@@^" + '[' + wob_bk_no[i] + ']';	// [1]
			param += '[' + rdoUnitConvYn + ']';
		}
	}
	
	// Packing List
	if ($('input[name="chOption6"]').is(":checked")) {
		if (page_tp == "BK") {
		    //rdParam = "/rv " + "WOB_OUT_NO['" + wob_out_no + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
			fileName +="^@@^" +  'WH_OUT_PACKING_BK.mrd';
			param +="^@@^" + '['  + wob_out_no + ']';	// [1]
			param +=  '[' + rdoUnitConvYn + ']';
		} else if (page_tp == "LP") {
		    //rdParam = "/rv " + "LP_NO['" + lp_no + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
			fileName +="^@@^" +  'WH_OUT_PACKING_LP.mrd';
			param +="^@@^" + '['  + lp_no + ']';	// [1]
			param +=  '[' + rdoUnitConvYn + ']';
		}
	}		
	
	// Loading Work Sheet
	if ($('input[name="chOption7"]').is(":checked")) {
	    //rdParam = "/rv " + "LP_NO['" + lp_no + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn
		fileName +="^@@^" + 'WH_OUT_LOADING.mrd';
		param +="^@@^" + '[' + lp_no + ']';	// [1]
		param += '[' + rdoUnitConvYn + ']';
	}
	
	// Warehouse Outbound Complete Sheet
	if ($('input[name="chOption8"]').is(":checked")) {
		if (page_tp == "BK") {
		    //rdParam = "/rv " + "WOB_OUT_NO['" + wob_out_no + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn			
			fileName +="^@@^" +'WH_OUT_COMPLETE_BK.mrd';
			param +="^@@^" + '['  + wob_out_no + ']';	// [1]
			param += '[' + rdoUnitConvYn + ']';
		} else if (page_tp == "LP") {
		    //rdParam = "/rv " + "LP_NO['" + lp_no + "']" + " UNIT_CONV_YN['" + rdoUnitConvYn + "'] /rpagenuminit [1]"; //파라메타 입력  rdoUnitConvYn			
			fileName +="^@@^" + 'WH_OUT_COMPLETE_LP.mrd'; 
			param +="^@@^" + '['  + lp_no + ']';	// [1]
			param += '[' + rdoUnitConvYn + ']';
		}
	}
	
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, './RPT_RD_0030.clt', 'popTest', 1025, 740);
}

/**
 * Outbound 화면별 호출
 * @param pageTp
 */
function setSelectPrintOption(pageTp) {
	var formObj = document.form;
	ComEnableObject(formObj.chOption1, false); // Warehouse Outbound Sheet
	ComEnableObject(formObj.chOption2, false); // Picking Work Sheet (Total)
	ComEnableObject(formObj.chOption3, false); // Picking Work Sheet (Case type)
	ComEnableObject(formObj.chOption4, false); // Picking Work Sheet (Each Type)
	ComEnableObject(formObj.chOption5, false); // Picking Inspection Sheet		
	ComEnableObject(formObj.chOption6, false); // Packing List
	ComEnableObject(formObj.chOption7, false); // Loading Work Sheet
	ComEnableObject(formObj.chOption8, false); // Warehouse Outbound Complete Sheet	
	
	//ComBtnEnable("btn_save");
	formObj.btnSave.disabled= false;
    if (pageTp == "OB") { // Outbound Booking Mgmt
    	ComEnableObject(formObj.chOption1, true);
    	formObj.chOption1.checked = true;
    	//ComBtnDisable("btn_save");
    	formObj.btnSave.disabled= true;
    } else if(pageTp == "ALLC" || pageTp == "WAVE") { // Allocation Mgmt 또는 Wave
    	ComEnableObject(formObj.chOption2, true);
    	ComEnableObject(formObj.chOption3, true);
    	ComEnableObject(formObj.chOption4, true);
    	ComEnableObject(formObj.chOption5, true);
    	
    	formObj.chOption2.checked = true;    	
    	formObj.chOption5.checked = true;    	
    } else if(pageTp == "BK") { // Outbound Complete Update by Booking
    	ComEnableObject(formObj.chOption6, true);
    	ComEnableObject(formObj.chOption8, true);
    	
    	formObj.chOption6.checked = true;    	
    	formObj.chOption8.checked = true;
    	//ComBtnDisable("btn_save");
    	formObj.btnSave.disabled= true;
    } else if(pageTp == "LP") { // Outbound Complete Update by Load Plan
    	ComEnableObject(formObj.chOption6, true);
    	ComEnableObject(formObj.chOption7, true);
    	ComEnableObject(formObj.chOption8, true);
    	
    	formObj.chOption6.checked = true;    	
    	formObj.chOption7.checked = true;    	
    	formObj.chOption8.checked = true;    	
    }
}


function setCondEnable(pageTp) {
	var formObj = document.form;
	
	// 공통
	ComEnableObject(formObj.supv_nm, false);
	ComEnableObject(formObj.outbound_loc_nm, false);
	//ComBtnDisable("btn_outbound_loc_cd");
	formObj.btn_outbound_loc_cd.disabled= true;
	ComEnableObject(formObj.gate_no, false);
	
	// TH_WH_PICK_SHT 데이터 조회
	ComEnableObject(formObj.pick_dt, false);	
	//ComBtnDisable("btn_pick_date");
	formObj.btn_pick_date.disabled= true;
	ComEnableObject(formObj.pick_hm_fr, false);		
	ComEnableObject(formObj.pick_hm_to, false);
	ComEnableObject(formObj.pick_by, false);
	ComEnableObject(formObj.msg_to_pick, false);
	ComEnableObject(formObj.insp_by, false);
	ComEnableObject(formObj.insp_hm_fr, false);
	ComEnableObject(formObj.insp_hm_to, false);
	ComEnableObject(formObj.msg_to_insp, false);

	// TL_WH_LOAD_PLAN 데이터 조회
	ComEnableObject(formObj.load_by, false);
	ComEnableObject(formObj.load_hm_fr, false);
	ComEnableObject(formObj.load_hm_to, false);
	ComEnableObject(formObj.msg_to_load, false);	
	
	formObj.supv_nm.value = "";
	formObj.outbound_loc_cd.value = "";
	formObj.outbound_loc_nm.value = "";
	formObj.gate_no.value = "";
	
	formObj.pick_dt.value = "";
	formObj.pick_hm_fr.value = "";	
	formObj.pick_hm_to.value = "";
	formObj.pick_by.value = "";
	formObj.msg_to_pick.value = "";
	formObj.insp_by.value = "";
	formObj.insp_hm_fr.value = "";
	formObj.insp_hm_to.value = "";
	formObj.msg_to_insp.value = "";	

	formObj.load_by.value = "";
	formObj.load_hm_fr.value = "";
	formObj.load_hm_to.value = "";
	formObj.msg_to_load.value = "";		
	
	if (pageTp == "ALLC" || pageTp == "WAVE") { // Allocation Mgmt 또는 Wave
		// 공통
		ComEnableObject(formObj.supv_nm, true);
		ComEnableObject(formObj.outbound_loc_nm, true);
		//ComBtnEnable("btn_outbound_loc_cd");
		formObj.btn_outbound_loc_cd.disabled= false;
		ComEnableObject(formObj.gate_no, true);		
		
		// TH_WH_PICK_SHT 데이터 조회
		ComEnableObject(formObj.pick_dt, true);
		//ComBtnEnable("btn_pick_date");
		formObj.btn_pick_date.disabled= false;
		ComEnableObject(formObj.pick_hm_fr, true);		
		ComEnableObject(formObj.pick_hm_to, true);
		ComEnableObject(formObj.pick_by, true);
		ComEnableObject(formObj.msg_to_pick, true);
		ComEnableObject(formObj.insp_by, true);
		ComEnableObject(formObj.insp_hm_fr, true);
		ComEnableObject(formObj.insp_hm_to, true);
		ComEnableObject(formObj.msg_to_insp, true);

		formObj.supv_nm.value = "";
		formObj.outbound_loc_cd.value = "";
		formObj.outbound_loc_nm.value = "";
		formObj.gate_no.value = "";				
		
		formObj.pick_dt.value = "";	
		formObj.pick_hm_fr.value = "";	
		formObj.pick_hm_to.value = "";
		formObj.pick_by.value = "";
		formObj.msg_to_pick.value = "";
		formObj.insp_by.value = "";
		formObj.insp_hm_fr.value = "";
		formObj.insp_hm_to.value = "";
		formObj.msg_to_insp.value = "";	
	} else if (pageTp == "LP") { // Outbound Complete Update by Load Plan
		// 공통
		ComEnableObject(formObj.supv_nm, true);
		ComEnableObject(formObj.outbound_loc_nm, true);
		//ComBtnEnable("btn_outbound_loc_cd");
		formObj.btn_outbound_loc_cd.disabled= false;
		ComEnableObject(formObj.gate_no, true);				
		
		// TL_WH_LOAD_PLAN 데이터 조회
		ComEnableObject(formObj.load_by, true);
		ComEnableObject(formObj.load_hm_fr, true);
		ComEnableObject(formObj.load_hm_to, true);
		ComEnableObject(formObj.msg_to_load, true);	
		
		formObj.supv_nm.value = "";
		formObj.outbound_loc_cd.value = "";
		formObj.outbound_loc_nm.value = "";
		formObj.gate_no.value = "";						
		
		formObj.load_by.value = "";
		formObj.load_hm_fr.value = "";
		formObj.load_hm_to.value = "";
		formObj.msg_to_load.value = "";
	}
}

function displayData(xml, type){
	var formObj  = document.form;
	formObj.form_mode.value= "UPDATE";		
	 var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  if(type=="PS"){
		  $("#walc_no").val($xml.find( "walc_no").text());
		  $("#supv_nm").val($xml.find( "supv_nm").text());
		  $("#outbound_loc_nm").val($xml.find( "outbound_loc_nm").text());
		  $("#outbound_loc_cd").val($xml.find( "outbound_loc_cd").text());
		  $("#gate_no").val(htmlDecode($xml.find( "gate_no").text()));
		  $("#pick_dt").val(convDate(htmlDecode($xml.find( "pick_dt").text())));
		  $("#pick_hm_fr").val(convHour(htmlDecode($xml.find( "pick_hm_fr").text())));
		  $("#pick_hm_to").val(convHour($xml.find( "pick_hm_to").text()));
		  $("#pick_by").val($xml.find( "pick_by").text());
		  $("#msg_to_pick").val($xml.find( "msg_to_pick").text());
		  $("#insp_by").val($xml.find( "insp_by").text());
		  $("#insp_hm_fr").val(convHour($xml.find( "insp_hm_fr").text()));
		  $("#insp_hm_to").val(convHour($xml.find( "insp_hm_to").text()));
		  $("#msg_to_insp").val($xml.find( "msg_to_insp").text());
	  }
	  if(type=="LP"){
		  $("#lp_no").val($xml.find( "lp_no").text());
		  $("#supv_nm").val($xml.find( "supv_nm").text()); 
		  $("#outbound_loc_nm").val($xml.find( "outbound_loc_nm").text());
		  $("#outbound_loc_cd").val($xml.find( "outbound_loc_cd").text());
		  $("#gate_no").val(htmlDecode($xml.find( "gate_no").text()));
		  $("#load_by").val($xml.find( "load_by").text()); 
		  $("#load_hm_fr").val(convHour($xml.find( "load_hm_fr").text()));
		  $("#load_hm_to").val(convHour(Number($xml.find("load_hm_to").text())));
		  $("#msg_to_load").val($xml.find( "msg_to_load").text());
	  }
	  if(type=="WAVE"){
		  $("#walc_no").val($xml.find( "walc_no").text());
		  $("#supv_nm").val($xml.find( "supv_nm").text());
		  $("#outbound_loc_nm").val($xml.find( "outbound_loc_nm").text());
		  $("#outbound_loc_cd").val($xml.find( "outbound_loc_cd").text());
		  $("#gate_no").val(htmlDecode($xml.find( "gate_no").text()));
		  $("#pick_dt").val(convDate(htmlDecode($xml.find( "pick_dt").text())));
		  $("#pick_hm_fr").val(convHour(htmlDecode($xml.find( "pick_hm_fr").text())));
		  $("#pick_hm_to").val(convHour($xml.find( "pick_hm_to").text()));
		  $("#pick_by").val($xml.find( "pick_by").text());
		  $("#msg_to_pick").val($xml.find( "msg_to_pick").text());
		  $("#insp_by").val($xml.find( "insp_by").text());
		  $("#insp_hm_fr").val(convHour($xml.find( "insp_hm_fr").text()));
		  $("#insp_hm_to").val(convHour($xml.find( "insp_hm_to").text()));
		  $("#msg_to_insp").val($xml.find( "msg_to_insp").text());
		  $("#wave_wob_bk_no").val($xml.find( "wave_wob_bk_no").text());
	  }
	 
	  
	
	 
	 
}
function convDate1(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(0, 2) + "-" + date.substring(2, 4) + "-" + date.substring(4, 8);
			return rtn;
		
	}else {
		return date;
		}
	}
}
function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}
function convHour(hour) {
	if (hour != 0){
		if (hour.length == 4){
			var rtn = hour.substring(0, 2) + ":" + hour.substring(2, 4);
			return rtn;
		}
	}else {
		return hour;
	}
}