var sheetCnt=0;
var firCalFlag=false;
var sheetObjects=new Array();
var comboObjects=new Array();
var comboCnt=0;
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
var fix_grid01="Grd01"; //dummy sheet
var isSaveFlag=false; // save 여부
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
/**
* Sheet  onLoad
*/
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
//		var cal=new ComCalendar();
		switch(srcName) {
			case "SAVE":	
				btn_Save();
				break;
			case "PRINT":	
				btn_Print();
				break;
			case "CLOSE":
				btn_Close();
					break;
			case "btn_outbound_loc_cd" :
				callBackFunc = "setLocInfo";
 			    modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+formObj.wh_cd.value+'&wh_loc_nm=' +formObj.outbound_loc_nm.value, rtnary, 700, 500,"yes");
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
function setLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var aryPopupData=rtnVal.split("|");
		$("#outbound_loc_cd").val(aryPopupData[0]);// wh_loc_cd
		$("#outbound_loc_nm").val(aryPopupData[1]);// wh_loc_nm
	}
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendar();
            cal.displayType="date";
            cal.select(formObj.pick_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendar();
        	cal.displayType="date";
        	cal.select(formObj.load_dt, 'MM-dd-yyyy');
        	break;
    }
}
function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<sheetObjects.length;i++){
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i],i+1);
		comEndConfigSheet(sheetObjects[i]);
	}
	initControl();	
	//option체크관련
	var allc_cnt_tot=eval($("#allc_cnt_tot").val());
	var lp_cnt_tot=eval($("#lp_cnt_tot").val());
	if(allc_cnt_tot <= 0)
	{
		$('#chOptPickShtByOrder').attr('disabled',true);
		$('#chOptPickShtByWave').attr('disabled',true);
		$('#chOptSortSht').attr('disabled',true);
		$('#chOptHOManifestShtByShipTo').attr('disabled',true);
		$('#chOptHOManifestShtByOrder').attr('disabled',true);
	}
	else
	{
		if(lp_cnt_tot<=0)
		{
			$('#chOptHOManifestShtByShipTo').attr('disabled',true);
			$('#chOptHOManifestShtByOrder').attr('disabled',true);
		}
	}
	// 디폴트 Search 실행
	if ($("#wave_no").val().trim() != "") 
	{
		btn_Search();
	}
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

 /** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
	axon_event.addListenerForm("change", "form_onChange", formObj);
	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
}
// 화면 Merge 컬럼 Name
var InputName="pick_dt|pick_hm_fr|pick_hm_to|supv_nm|load_dt|load_hm_fr|load_hm_to|pick_by|msg_to_pick|pick_sht_yn|wh_cd|gate_no|outbound_loc_cd|outbound_loc_nm";
/**
 * Search 
 */
function btn_Search() {
	var formObj = document.form;
	formObj.f_cmd.value=SEARCH;
 	var sXml=sheet1.GetSearchData("searchWaveSmpWorkShtInfoGS.clt", "f_cmd="+SEARCH+"&wave_no=" + $("#wave_no").val());
	
 	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.pick_dt.value = $xml.find( "pick_dt").text();
	formObj.pick_hm_fr.value = $xml.find( "pick_hm_fr").text();
	formObj.pick_hm_to.value = $xml.find( "pick_hm_to").text();
	formObj.supv_nm.value = $xml.find( "supv_nm").text();
	formObj.load_dt.value = $xml.find( "load_dt").text();
	formObj.load_hm_fr.value = $xml.find( "load_hm_fr").text();
	formObj.load_hm_to.value = $xml.find( "load_hm_to").text();
	formObj.pick_by.value = $xml.find( "pick_by").text();
	formObj.msg_to_pick.value = $xml.find( "msg_to_pick").text();
	formObj.pick_sht_yn.value = $xml.find( "pick_sht_yn").text();
	formObj.wh_cd.value = $xml.find( "wh_cd").text();
	formObj.gate_no.value = $xml.find( "gate_no").text();
	formObj.outbound_loc_cd.value = $xml.find( "outbound_loc_cd").text();
	formObj.outbound_loc_nm.value = $xml.find( "outbound_loc_nm").text();
//	if($("#pick_sht_yn").val() == "N")
//	{
//		//날짜 기본셋팅
//		$("#pick_dt").val(ComGetNowInfo());
//	}
	//work sht존재유무에 따른 delete버튼 활성화 처리
	/*if($("#pick_sht_yn").val() == "Y")
	{
		ComEnableButton("btn_Delete",	true,	1); 
	}
	else
	{
		ComEnableButton("btn_Delete",	false,	1);
	}
	*/
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt = 0;
	switch (sheetObj.id) {
	case "sheet1": // dummy sheet
		with (sheetObj) {
			SetSheetHeight(230);
			// no support[check again]CLT if (location.hostname != "")
			// InitHostInfo(location.hostname, location.port, page_path);
			var hdr1 = "dummy";
			var prefix = "Grd01";

			SetConfig({
				SearchMode : 2,
				MergeSheet : 5,
				Page : 20,
				FrozenCol : 0,
				DataRowMerge : 1
			});

			var info = {
				Sort : 1,
				ColMove : 1,
				HeaderCheck : 1,
				ColResize : 1
			};
			var headers = [ {
				Text : hdr1,
				Align : "Center"
			} ];
			InitHeaders(headers, info);

			var cols = [ {
				Type : "Status",
				Hidden : 1,
				Width : 50,
				Align : "Center",
				ColMerge : 1,
				SaveName : prefix + "ibflag"
			} ];

			InitColumns(cols);

			SetEditable(1);
		}
		break;
	}
}
// 버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
/*function processButtonClick(){
	*//***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****//*
	*//*******************************************************//*
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");		
		if (ComDisableTdButton(srcName, 2)) {
				return;
			}
		switch(srcName) {
			case "btn_pick_dt": 	
				var cal=new ComCalendar();
	            cal.select(formObj.pick_dt, 'yyyy-MM-dd');
				break;
			case "btn_load_dt": 	
				var cal=new ComCalendar();
	            cal.select(formObj.load_dt, 'yyyy-MM-dd');
				break;
			case "btn_outbound_loc_cd":
				if(ComIsEmpty(formObj.wh_cd))
 				{
 					//ComShowCodeMessage("COM0114","Warehouse");
 					ComShowCodeMessage("COM0493");
 					//$("#wh_cd").focus();
 					return;
 				}
				var sUrl="WarehouseLocPopup.do?f_loc_cd="+ $("#wh_cd").val();
 				ComOpenPopup(sUrl, 700, 550, "setLocInfo", "0,0", true);
				break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}*/
/**
 * Save
 */
function btn_Save() {	
	var formObj=document.form;
	if(ComGetLenByByte($("#supv_nm").val().trim()) > 100)
	{	
		//ComShowCodeMessage("COM0215", "Supervisor[100]");
		ComShowCodeMessage("COM0605", 100);
		ComSetFocus(formObj.supv_nm);
		return ;
	}
	if(ComGetLenByByte($("#msg_to_pick").val().trim()) > 100)
	{	
		//ComShowCodeMessage("COM0215", "Working Instruction[100]");
		ComShowCodeMessage("COM0607", 100);
		ComSetFocus(formObj.msg_to_pick);
		return ;
	}
	if (ComShowCodeConfirm("COM0036") == false) {
		return;
	}
	//var pick_sht_yn = $("#pick_sht_yn").val();
	formObj.f_cmd.value=MULTI;
 	var saveXml=sheet1.GetSaveData("saveWaveSmpWorkShtInfoGS.clt",  FormQueryString(formObj, ""));
 	sheet1.LoadSaveData(saveXml);
	// Save 후 조회
	if (saveXml.indexOf('<ERROR>') == -1) 
	{		
		showCompleteProcess();
		//ComShowCodeMessage("COM0093"); // Saved successfully.
		btn_Search();
		SaveAfterProcess("Y");
	}
}
function SaveAfterProcess(pick_sht_yn)
{
	opener.setWorkShtInfo(pick_sht_yn, $("#wave_no").val(), $("#pick_dt").val(), $("#pick_hm_fr").val(), $("#pick_hm_to").val());
}
///**
// * Delete
// */
//function btn_Delete() {
//	var formObj = document.form;
//	if (ComShowCodeConfirm("COM0053") == false) {
//		return;
//	}
//	var saveXml = $("#sheet1")[0].GetSaveXml("removeWaveSmpWorkShtInfo.do",FormQueryString(formObj, ""));
//	$("#sheet1")[0].LoadSaveXml(saveXml);
//
//	// Delete 후 조회
//	if (saveXml.indexOf('<ERROR>') == -1) {
//		ComShowCodeMessage("COM0080", "");
//		btn_Search();
//		SaveAfterProcess("N");
//	}
//}
/**
 * Close
 */
function btn_Close() {
  ComClosePopup(); 
}
/**
 * Print
 */
function btn_Print() {
	if (!$('input[name="chOptWorkSht"]').is(":checked") 
	 && !$('input[name="chOptPickShtByOrder"]').is(":checked")
	 && !$('input[name="chOptPickShtByWave"]').is(":checked")
	 && !$('input[name="chOptHOManifestShtByShipTo"]').is(":checked")
	 && !$('input[name="chOptSortSht"]').is(":checked")
	 && !$('input[name="chOptHOManifestShtByOrder"]').is(":checked")
	 && !$('input[name="chOptGoodsIssue"]').is(":checked")
	) {
		//ComShowCodeMessage("COM0122", "print Option");
		ComShowCodeMessage("COM0608");
		return;
	}
	var formObj = document.form;
	var fileName = "";
	var param= "";
	var wave_no=$("#wave_no").val();
	//Outbound Work Sheet
	if($('input[name="chOptWorkSht"]').is(":checked")) 
	{
		formObj.title.value="Outbound Work Sheet Report";
		fileName += "^@@^" +'WH_OUT_WORK_SHT.mrd' ;
		param += "^@@^" + "[" + 'WAVE' + "]"+"[" +"'"+'X'+"'"+ "]"+"["+wave_no+"]"+"["+"'"+'X'+"'"+"]"; 
	}
	//GOODS ISSUE
	if($('input[name="chOptGoodsIssue"]').is(":checked")) 
	{
		formObj.title.value="Goods Issue Report";
		fileName += "^@@^"+ 'WH_OUT_GOODS_ISSUE.mrd' ;
		param += "^@@^" + "[" + 'WAVE' + "]"+"["+"]"+"[" + wave_no + "]"; 
	}
	//Outbound H/O Manifest
	if($('input[name="chOptHOManifestShtByShipTo"]').is(":checked")) 
	{
		formObj.title.value="Outbound H/O Manifest Report";
		fileName += "^@@^"+ 'WH_OUT_HO_MANIFEST_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" +"[SHIPTO]"; 
	}
	if($('input[name="chOptHOManifestShtByOrder"]').is(":checked")) 
	{
		formObj.title.value="Outbound H/O Manifest Report";
		fileName += "^@@^"+ 'WH_OUT_HO_MANIFEST_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" +"[ORDER]"; 
	}
	//Picking Sheet
	if($('input[name="chOptPickShtByOrder"]').is(":checked")) 
	{
		formObj.title.value="Picking Sheet Report";
		fileName += "^@@^"+ 'WH_OUT_PICK_ORDER_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ $("#prn_lot_tp").val() + "]" + "["+ $("#user_id").val() + "]" + "["+ $("#pick_unit").val() + "]"; 
	}
	if($('input[name="chOptPickShtByWave"]').is(":checked")) 
	{
		formObj.title.value="Picking Sheet Report";
		fileName += "^@@^"+ 'WH_OUT_PICK_WAVE_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ $("#prn_lot_tp").val() + "]" + "["+ $("#user_id").val() + "]" + "["+ $("#pick_unit").val() + "]";  
	}
	//Sorting Sheet
	if($('input[name="chOptSortSht"]').is(":checked")) 
	{
		formObj.title.value="Sorting Sheet Report";
		fileName += "^@@^"+ 'WH_OUT_SORT_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ $("#prn_lot_tp").val() + "]" + "["+ $("#user_id").val() + "]" + "["+ $("#pick_unit").val() + "]";  
	}
	
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, './RPT_RD_0030.clt', 'popTest', 1025, 740);
}
function pick_by_sku_onclick(obj)
{
	if($('input[name="chOptPickShtByWave"]').is(":checked")) 
	{
		$('#chOptSortSht').attr('checked',true);
	}
}
function pick_opt_change(div)
{
	if(div == "ORDER")
	{
		if($('input[name="chOptPickShtByOrder"]').is(":checked") && $('input[name="chOptPickShtByWave"]').is(":checked")) 
		{
			$('#chOptPickShtByWave').attr('checked',false);
		}
	}
	else
	{
		if($('input[name="chOptPickShtByOrder"]').is(":checked") && $('input[name="chOptPickShtByWave"]').is(":checked")) 
		{
			$('#chOptPickShtByOrder').attr('checked',false);
		}
	}
}
function complete_opt_change(div)
{
	if(div == "SHIPTO")
	{
		if($('input[name="chOptHOManifestShtByShipTo"]').is(":checked") && $('input[name="chOptHOManifestShtByOrder"]').is(":checked")) 
		{
			$('#chOptHOManifestShtByOrder').attr('checked',false);
		}
	}
	else
	{
		if($('input[name="chOptHOManifestShtByShipTo"]').is(":checked") && $('input[name="chOptHOManifestShtByOrder"]').is(":checked")) 
		{
			$('#chOptHOManifestShtByShipTo').attr('checked',false);
		}
	}
}
function getOutboundLocInfo(obj){
	if(obj.value != ""){
		var formObj=document.form;
		if(ComIsEmpty(formObj.wh_cd))
		{
			//ComShowCodeMessage("COM0114","Warehouse");
			ComShowCodeMessage("COM0493");
			//$("#wh_cd").focus();
			return;
		}
		var sParam="f_loc_cd=" +  $("#wh_cd").val() + "&f_wh_loc_nm=" + obj.value;
		ajaxSendPost(resultOutboundLocInfo,'', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
		/*$.ajax({
			url : "searchWarehouseLocInfoForName.do?"+sParam ,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
					$("#outbound_loc_nm").focus();
				}
				resultOutboundLocInfo(result.xml);
			}
		});*/
	}
	else
	{
		$("#outbound_loc_cd").val("");
		$("#outbound_loc_nm").val("");
	}
}
function resultOutboundLocInfo(reqVal, div) {
		var doc=getAjaxMsgXML(reqVal);
		var formObj=document.form;
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				//조회해온 결과를 Parent에 표시함
				var rtnArr=doc[1].split('^@');
				if(rtnArr[0] != ""){
					$("#outbound_loc_cd").val(rtnArr[0]); // wh_loc_cd
					$("#outbound_loc_nm").val(rtnArr[1]);
				}
				else{
					$("#outbound_loc_cd").val(""); // wh_loc_cd
					$("#outbound_loc_nm").val("");
				}
			}
			else{
				$("#outbound_loc_cd").val(""); // wh_loc_cd
				$("#outbound_loc_nm").val("");
			}
		}
	
	/*if(getXmlDataNullToNullString(resultXml,'wh_loc_cd') != ""){
		$("#outbound_loc_nm").val(getXmlDataNullToNullString(resultXml,'wh_loc_nm'));
		$("#outbound_loc_cd").val(getXmlDataNullToNullString(resultXml,'wh_loc_cd'));
	}else{
		$("#outbound_loc_cd").val("");
		$("#outbound_loc_nm").val("");
	}*/
}
function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}else if(size==5){
		var val = obj.value.split(':');
		if(hourCheck(val[0])){
			if(minuteCheck(val[1])){
				obj.value=val[0] + ":" + val[1];
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objEnd.value='';
		objEnd.focus();
	}
}

function hourCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0047");
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowCodeMessage("COM0047");
		return false;
	}else{
		return true;
	}
}

function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0048");
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowCodeMessage("COM0048");
		return false;
	}else{
		return true;
	}
}
function checkTimeStartEnd(objStart, objEnd){
	var startTime = objStart.value;
	var endTime = objEnd.value;
	if(startTime != '' && endTime != ''){
		if(parseInt(startTime.replace(':', '')) > parseInt(endTime.replace(':', ''))){
			return false;
		}
	}
	return true;
}
