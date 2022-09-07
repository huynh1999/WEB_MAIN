/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WarehouseLocPopup.js
*@FileTitle  : Location
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;

/**
* Sheet  onLoad
*/
function doWork(srcName, valObj) {
	try {
//		var srcName = ComGetEvent("name");
		switch (srcName) {
		case "SEARCHLIST":
			btn_Search();
			break;
		case "CLOSE":
			ComClosePopup();
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
function loadPage() {
    initWarehouseLocationCookie();
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	
	if(formObj.f_fix_wh_loc_nm.value != ""){
		formObj.f_wh_loc_nm.value=formObj.f_fix_wh_loc_nm.value;
		formObj.f_wh_loc_nm.disabled = true;
	}
	if (formObj.f_wh_loc_nm.value != ""){
		formObj.f_wh_loc_nm.value = formObj.f_wh_loc_nm.value;
	}
	if(formObj.wh_loc_nm.value != ""){
		formObj.f_wh_loc_nm.value = formObj.wh_loc_nm.value;
	}
	
	if(formObj.f_fix_wh_loc_cd.value != ""){
		formObj.f_wh_loc_cd.value=formObj.f_fix_wh_loc_cd.value;
	}
	
	if(formObj.f_not_loc_prop.value != ""){
		$("#f_prop_cd option[value='" + formObj.f_not_loc_prop.value + "']").remove();
	}
	
	setFieldValue(formObj.f_loc_cd, ComGetObjValue(formObj.loc_cd));
	ComEnableObject(formObj.f_loc_cd, false);
	
	initControl();
	if(formObj.f_loc_prop.value != ""){
		formObj.f_prop_cd.value = formObj.f_loc_prop.value; 
		$('#f_prop_cd').prop('disabled', true);
	}
	btn_Search();
}
/** 
 * initControl()
 */ 
function initControl() {
	var arg = parent.rtnary;
	var formObj=document.form;
	var zone_cdText = zone_cdTexts;
	
	var selecthtml = '<option value="ALL">ALL</option>';
	
	var vTextSplit = zone_cdText.split("|");
	var vCodeSplit = zone_cdText.split("|");				

	for(var j=0;j<vCodeSplit.length; j++){
		if(vCodeSplit[j] != ""){
			selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
		}
	}
	
	$('#f_zone_cd').html(selecthtml);
	
	vTextSplit=f_put_tp_cdText.split("|");
	vCodeSplit=f_put_tp_cdCode.split("|");
	
	selecthtml = '<option value="ALL">ALL</option>';
	
	for(var j=0;j<vCodeSplit.length; j++){
		
		if(formObj.f_put_tp.value == "C"){
			if(vCodeSplit[j] != "" && vCodeSplit[j] == "C" || vCodeSplit[j] == "N"){
				selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
			}
			
		}else if(formObj.f_put_tp.value == "E"){
			if(vCodeSplit[j] != "" && vCodeSplit[j] == "E" || vCodeSplit[j] == "N"){
				selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
			}
			
		}else {
			if(vCodeSplit[j] != ""){
				selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
			}
		}
	}
	
	$('#f_put_tp_cd').html(selecthtml);
	
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//    axon_event.addListenerForm("keydown", "obj_keydown", formObj);
}
//function obj_keydown(){
//    var backspace=8; 
//    var t=document.activeElement;  
//    var vKeyCode=event.keyCode;
//	var formObj=document.form;
//	var srcName=ComGetEvent("name");
//	var srcValue=ComGetEvent("value");
//    if (vKeyCode == 13) {
//		switch (srcName) {
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

function btn_ctrt(){
	var formObj=document.form;
	var sUrl="ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value;
	ComOpenPopup(sUrl, 900, 650, "setCtrtNoInfo", "0,0", true);
}
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.in_ctrt_no,    aryPopupData[0][0]);
	ComSetObjValue(formObj.in_ctrt_nm,    aryPopupData[0][1]);	
}
function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.in_ctrt_no.value="";
		form.in_ctrt_nm.value="";
	}else{
		searchCtrtInfo(formObj, ComGetObjValue(formObj.in_ctrt_no), "in_ctrt_no");
	}
}
function searchCtrtInfo (form, in_ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	var sXml=sheetObjects[0].GetSearchData("searchCtrtInfo.clt?ctrt_no="+in_ctrt_no+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&ord_tp_lvl2_cd="+ord_tp_lvl2_cd);
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
			}
			resultCtrtInfo(sXml);
}
function resultCtrtInfo(resultXml){
	var formObj=document.form;
	if(getXmlDataNullToNullString(resultXml,'ctrt_nm') != ""){
		formObj.in_ctrt_nm.value=getXmlDataNullToNullString(resultXml,'ctrt_nm');
	}else{
		form.in_ctrt_no.value="";
		form.in_ctrt_nm.value="";
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
      
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WarehouseLocPopup_HDR1'), Align:"Center"},{ Text:getLabel('WarehouseLocPopup_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"wh_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"wh_loc_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"zone_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"block_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prop_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"prop_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"put_tp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"put_tp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"putaway_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"alloc_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"move_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"replenish_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"adjust_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"space_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
		                   {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"space_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 } ];
       
			      InitColumns(cols);
			      SetSheetHeight(300);
			      SetEditable(0);
			      //SetRangeBackColor(1, 1, 1, 36,"#777777");
		}
		break;
	}
}

function sheet1_OnSearchEnd(sheetObj, row, col){
	var formObj=document.form;
	sheetObj.SetSelectRow(-1);
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13 && sheetObj.GetSelectRow() != -1){
		sheet1_OnDblClick(sheetObj, row, col);
	}else{
		return;
	}
}

function btn_Search() {
	var formObj=document.form;
	/*
	if(formObj.htsCd.value == "" && formObj.descr.value.trim().length < 3){
		ComShowCodeMessage("COM0098", "Description" ,"3");
		return;
	}
	*/

	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
	docObjects[0].DoSearch("./WarehouseLocPopupGS.clt", FormQueryString(formObj,''));

}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var formObj=document.form;
//	var openMean=formObj.openMean.value ; 
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "trdp_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "shrt_nm"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "full_nm"));
	retArray += sheetObj.GetCellValue(Row, "wh_loc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "wh_loc_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "zone_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prop_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prop_nm");		//5
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "put_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "put_tp_nm");
	
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "putaway_flg");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "alloc_flg");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "move_flg");		//10
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "replenish_flg");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "adjust_flg");
	
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "loc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "space_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "space_tp_nm");	//15
	
	/*
	switch(sheetObj.ColSaveName(Col)){
		case "trdp_cd":
if(sheetObj.GetCellValue(Row, "ibflag1") != "I"){
				window.returnValue=retArray;
				window.close();
			}
		break;
	}
	*/
	ComClosePopup(retArray);
}
//6459[Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement)  
function initWarehouseLocationCookie() {
	var cookie_key = "warehouselocpopup";
	if(getCookie(cookie_key) == "1") {
		$("#f_only_empty_location").attr("checked", true);
	}
    $("#f_only_empty_location").change(function(){
        if($("#f_only_empty_location").is(":checked")){
			setCookie(cookie_key, "1", 365);
        }else{
            setCookie(cookie_key, "", -1);
        }
	});
};