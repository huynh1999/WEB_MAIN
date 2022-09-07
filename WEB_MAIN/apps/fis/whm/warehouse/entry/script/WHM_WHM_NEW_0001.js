var sheetObjects = new Array();
var sheetCnt = 0;
 
var wh_ibflag = "U";
var _wh_cd = "";

var Please_Input_Name_Field = "Please enter Name Field!";
var Please_Input_Alias_Field = "Please enter Alias Field!";
var Have_No_Item = "Have no item !";
var Deleted_Successfully = "Deleted Successfully !";
var Please_Enter_Code_Field = "Please enter Code field !";
var Please_Input_CntcPson_Info = "[Contact person]Please input information!";
var Fail_To_Query_To_Database = "Fail to query to database!";
var Warehouse_Code_Not_Found = "Warehouse Code not found!";


document.onclick=processButtonClick;


function doWork(srcName) {
	
    var formObj=document.frm1;
	try {
		//var srcName=ComGetEvent("name");
		switch (srcName) {
		case "SEARCH":
			clearScreen(false);
			doRetrieve();
			break;
		case "MODIFY":
			if(!ValidateForm()){
				//doHideProcess();
				return;
			};			
			doSave();
			
			break;
		}
	}catch (e) {
		if (e == "[object Error]") {
			ComShowCodeMessage("DOM00023");
		} else {
			alert(e);
		}
	}
}

function processButtonClick() {
	var formObj = document.frm1;
	try {
		var srcName=ComGetEvent("name");
		switch (srcName) {
		case "btn_Retrieve":
			clearScreen(false);
			doRetrieve();
			break;
		case "btn_Save":
			if(!ValidateForm()){
				//doHideProcess();
				return;
			};			
			doSave();
			
			break;
		case "btn_New":
			clearForm();
			break;
		case "btn_PopState":
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[1]="";
			
			callBackFunc = "STATE_POPLIST2";
			modal_center_open('./CMM_POP_0310.clt', rtnary, 610,460,"yes");		
			break;
		case "btn_sheet1Add":
			Sheet1Add();
			break;
		}
	}catch (e) {
		if (e == "[object Error]") {
			ComShowCodeMessage("DOM00023");
		} else {
			alert(e);
		}
	}
}

function clearForm(){
	var formObj = document.frm1;
	disableBtn(false);
	clearScreen(true);
	wh_ibflag = "I";
	formObj.TxtCode.disabled = false;
	formObj.TxtCode.required = false;
	formObj.TxtCreCode.disabled = false;
	formObj.TxtCreCode.required = true;
}
function displayData(xml){
	var formObj = document.frm1;
	  var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  
	  $("#TxtCreCode").val($xml.find( "wh_cd").text());
	  $("#TxtName").val(htmlDecode($xml.find( "wh_nm").text()));
	  $("#TxtAlias").val(htmlDecode($xml.find( "wh_als_nm").text()));
	  $("#TxtAddress").val(htmlDecode($xml.find("wh_addr").text()));
	  $("#TxtCity").val(htmlDecode($xml.find( "wh_cty_nm").text()));
	  $("#TxtState").val($xml.find( "wh_ste_cd").text());
	  
	  //#3788 Warehouse Entry - 조회 후 수정/저장 시 오류
	  // htmlDecode 처리가 되어있지 않을 경우 & 가 amp;로 변환되어 저장시마다 자가증식하는 버그 수정 
	  $("#TxtZip").val( htmlDecode( $xml.find( "wh_zip_cd").text() ) );
	  $("#TxtPhone").val( htmlDecode( $xml.find( "wh_phn_no").text() ) );
	  $("#TxtFax").val( htmlDecode( $xml.find( "wh_fax_no").text() ) );
	  
	  $("#TxtRemark").val(htmlDecode($xml.find( "wh_rmk").text()));
	  
	  var wh_ofc_cd = $xml.find( "wh_ofc_cd").text();
	  if (wh_ofc_cd == null || wh_ofc_cd == "") {
		  formObj.wh_ofc_cd.value = formObj.f_ofc_cd.value;
	  } else {
		  formObj.wh_ofc_cd.value = wh_ofc_cd;
	  }
	  
	  var use = $xml.find( "use_flg").text();
	  
	  var index = (use == "Y" ? 0:1);
	  
	  document.getElementById('cbxUse').getElementsByTagName('option')[index].selected = 'selected';
	  
//	  var incl_ob_dt_flg = $xml.find( "incl_ob_dt_flg").text();
//	  
//	  formObj.incl_ob_dt_flg.value = incl_ob_dt_flg;
	  /*
	  if(incl_ob_dt_flg == "Y"){
		  index = 1;
	  }else if(incl_ob_dt_flg == "N"){
		  index = 2;
	  }else{
		  index = 0;
	  }
	  document.getElementById('incl_ob_dt_flg').getElementsByTagName('option')[index].selected = 'selected';
	  */
	 
}
function STATE_POPLIST2(rtnVal){
	var formObj = document.frm1;
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
    	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.TxtState.value=rtnValAry[0];//cd_val
		//formObj.s_state_nm.value=rtnValAry[1];//cnt_eng_nm
	}
}

function ValidateForm(){
	var formObj = document.frm1;
	
	if(formObj.TxtCreCode.value == ""){
//		alert(Please_Enter_Code_Field);
		ComShowCodeMessage("COM12202");
		formObj.TxtCreCode.focus();
		return false;
	}
	if(formObj.TxtCreCode.value.length < 5){
//		alert(Code_Field_Must_Contain_5_Characters);
		ComShowCodeMessage("COM12195");
		formObj.TxtCreCode.focus();
		return false;
	}
	if(formObj.TxtName.value == ""){
//		alert(Please_Input_Name_Field);
		ComShowCodeMessage("COM12196");
		formObj.TxtName.focus();
		return false;
	}
	if(formObj.TxtAlias.value == ""){
//		alert(Please_Input_Alias_Field);
		ComShowCodeMessage("COM12197");
		formObj.TxtAlias.focus();
		return false;
	}
//	if(formObj.incl_ob_dt_flg.value == ""){
//		ComShowCodeMessage('COM0005', "Include Outbound Date");
//		formObj.incl_ob_dt_flg.focus();
//		return false;
//	}
	if(formObj.wh_ofc_cd.value == ""){
		ComShowCodeMessage('COM0005', "Office");
		formObj.wh_ofc_cd.focus();
		return false;
	}
	if(!CheckCntcPson()){
		return false;
	}
	
	return true;
}

function Sheet1Add(){
	var formObj = document.frm1;
	sheet1.DataInsert(sheet1.RowCount()+1);
	sheet1.SetCellValue(1,"ibflag","I");
}

function initControl() {
	var formObj = document.frm1;
	axon_event.addListenerForm  ('change', 'obj_change', formObj);// event change value on control
	$("TxtRemark").keypress(function(e){
	    var lengthF = $(this).val();

	    if (lengthF.length > 400){
	        e.preventDefault();
	    }
	});
	$("TxtAddress").keypress(function(e){
	    var lengthF = $(this).val();

	    if (lengthF.length > 400){
	        e.preventDefault();
	    }
	});
}

function obj_change(){
	var formObj = document.frm1;
	var obj=ComGetEvent();
    switch(obj.name) {
        case "TxtName":
        	if(formObj.TxtAlias.value == ""){
        		formObj.TxtAlias.value = formObj.TxtName.value;
        	}
    	break;
    }
}

function doSave(){	
	var formObj = document.frm1;
	var params = GetSaveData();
	
	if(params != ""){
		if(ComShowCodeConfirm("COM130101")){
				var xml = sheet1.GetSaveData("./WHM_WHM_NEW_0001_03GS.clt",params);
				
				if(xml.replace(/^\s+|\s+$/gm,'') != ""){
					
					var xmlDoc = $.parseXML(xml);
					 var $xml1 = $(xmlDoc);
					
					 var res = $xml1.find("result").text();
					 
					 if(res == "1"){
						
						 //ComShowCodeMessage("COM132601");
						 
						 wh_ibflag = "U";
						 formObj.TxtCode.value = formObj.TxtCreCode.value;
						 doRetrieve();
					 }
				}else{
//					ComShowCodeMessage("COM12151");
					ComShowCodeMessage("COM12207");
				}			
		}
	}
}

function doRetrieve(){
	var formObj = document.frm1;
	if(formObj.TxtCode.value == ""){
//		alert(Please_Enter_Code_Field);
		ComShowCodeMessage("COM12202");
		formObj.TxtCode.focus();
		return;
	}
	if(formObj.TxtCode.value.length < 5){
//		alert(Code_Field_Must_Contain_5_Characters);
		ComShowCodeMessage("COM12195");
		formObj.TxtCode.focus();
		return;
	}
	
	wh_ibflag = "U";
	doShowProcess();
	setTimeout(function(){
		var params = "f_cmd="+SEARCH + "&wh_cd="+formObj.TxtCode.value;
		var xml1 = sheet1.GetSearchData("./WHM_WHM_NEW_0001_01GS.clt",params);
		if(XmlRowNum(xml1) != "0"){
//			_wh_cd = TxtCode.value;
			//formObj.TxtCode.disabled = true;
			//formObj.TxtCode.required = false;
			formObj.TxtCreCode.disabled = true;
			//formObj.TxtCreCode.required = false;
			
			displayData(xml1);
			
			var params1 = "f_cmd="+SEARCH01
					+ "&wh_cd=" + formObj.TxtCode.value;		
//			var xml2 = 
				sheet1.DoSearch("./WHM_WHM_NEW_0001_02GS.clt",params1);
				
			disableBtn(false);
		}else{
//			_wh_cd = "";
//			alert(Warehouse_Code_Not_Found);
			ComShowCodeMessage("COM12206");
			clearForm();
			doHideProcess();
		}
	},100);
}

function sheet1_OnSearchEnd(){
	for(var i=1; i <= sheet1.LastRow(); i++){
		sheet1.SetCellValue(i,"cntc_rmk",htmlDecode(sheet1.GetCellValue(i,"cntc_rmk")));
	}
	
	doHideProcess();
}

function disableBtn(flag ){
	var formObj = document.frm1;
	formObj.btn_sheet1Add.disabled = flag;
	formObj.btn_Save.disabled	   = flag;	
}

function clearScreen(newFlg){
	var formObj = document.frm1;
	formObj.TxtCreCode.value 		= "";
	formObj.TxtName.value 		= "";
	formObj.TxtAlias.value 		= "";
	formObj.TxtAddress.value 	= "";
	formObj.TxtCity.value 		= "";
	formObj.TxtState.value 		= "";
	formObj.TxtZip.value 		= "";
	formObj.TxtFax.value 		= "";
	formObj.TxtPhone.value 		= "";
	formObj.TxtRemark.value 	= "";
	
	formObj.cbxUse.value = "Y";
	
//	formObj.incl_ob_dt_flg.value = "";
	
	sheet1.RemoveAll();
	
	if(newFlg){
		formObj.TxtCode.value 		= "";
		formObj.TxtCode.focus();
	}
}

function GetSaveData(){
	var formObj = document.frm1;
	// Warehouse
	
	formObj.f_cmd.value=SEARCH03;
	var paramString =
	 "wh_ibflag="	+ wh_ibflag;
	paramString+= "&"+FormQueryString(formObj);
	 
	var sheetCntcPsonData = sheet1.GetSaveString();
	
	if(sheetCntcPsonData != ""){
		paramString += "&" +sheetCntcPsonData;
	}
	
	return paramString;
}

function sheet1_OnChange(item,row,col){
	var formObj = document.frm1;
	if(sheet1.ColSaveName(col) == "cntc_del"){
		if(sheet1.GetCellValue(row,"cntc_ibflag") == "I"){
			sheet1.RowDelete(row);
		}
	}
}

function CheckCntcPson(){
	var formObj = document.frm1;
	var rows = sheet1.RowCount();
	
	if(rows > 0){

		for(var i = 1 ; i <= rows; i++){
			if(sheet1.GetCellValue(i,"cntc_nm") == ""
				&& sheet1.GetCellValue(i,"cntc_phn_no") == ""
				&& sheet1.GetCellValue(i,"cntc_fax_no") == ""
				&& sheet1.GetCellValue(i,"cntc_eml_addr") == ""
				&& sheet1.GetCellValue(i,"cntc_rmk") == "")
			{
				ComShowMessage(Please_Input_CntcPson_Info);
				return false;
			}
		}		
	}
	
	return true;
}

function sheet1_OnAfterEdit(item, row, col) { 
	var formObj = document.frm1;
	if(sheet1.ColSaveName(col) =="cntc_eml_addr"){
		var email = sheet1.GetCellValue(row,col);
		if(email != "" && !validateEmail(email)){
//			alert("Please input corect email !");
			ComShowCodeMessage("COM131501");
			sheet1.SelectCell(row,col,1);
		}
	}
}



function XmlRowNum(xml){
	var formObj = document.frm1;
	var index1 = xml.indexOf("TOTAL") + 7;
	var index2 = xml.indexOf("\"",index1);
	
	var res = xml.substring(index1,index2);
	
	return res;
}

function validateEmail(email) { 
	var formObj = document.frm1;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
    	return false;
    }
    
    return true;
} 
//Check in event Onchange 
//S  -------------------------------------------
function validFaxPhone(obj) { 
	var formObj = document.getElementById(obj.id);
 var filter = /^([0-9\-])*$/;
 if (!filter.test(formObj.value)) {
// 	alert("Invalid characters, or contains the string.");
 	ComShowCodeMessage("COM12122","This fields");
 	formObj.value="";
 }
 return true;
} 

function validZip(obj){
	var formObj = document.getElementById(obj.id);
 var filter = /^([0-9])*$/;
 if (!filter.test(formObj.value)) {
// 	alert("Invalid characters, or contains the string.");
	 ComShowCodeMessage("COM12122","This fields");
 	formObj.value="";
 }
 return true;
}

function validCode(obj){
	var formObj = document.getElementById(obj.id);
 var filter = /^([a-zA-Z0-9])*$/;
 if (!filter.test(formObj.value)) {
// 	alert("Invalid characters, or contains the string.");
 	ComShowCodeMessage("COM12129","This fields");
 	formObj.value="";
 }
 return true;
}
//E -------------------------------------------

function validateZip(evt) {
	var formObj = document.frm1;
	//only number
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]/;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
	}

function validateFax(evt) {
	var formObj = document.frm1;
	//only number
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]/;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
}
function validatePhone(evt) {
	var formObj = document.frm1;
	//only number
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]/;
//	  var regex = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
	 // var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	  if( !regex.test(key)) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
}

//Add condition KeyCode = BackSpace don't add character '-'
function PhoneFormat(evt){
	var formObj = document.frm1;
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	
	if(key!= "8" && (formObj.TxtPhone.value.length == 3 || formObj.TxtPhone.value.length == 7)){
		formObj.TxtPhone.value += "-";
	}
}

function FaxFormat(evt){
	var formObj = document.frm1;
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	
	if(key!= "8" && (formObj.TxtFax.value.length == 3 || formObj.TxtFax.value.length == 7)){
		formObj.TxtFax.value += "-";
	}
}

function loadPage() {
	var formObj = document.frm1;
	sheetCnt=sheetObjects.length;
	for (var i = 0; i < sheetObjects.length; i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(sheetObjects[i]);
	}
	
	initControl();
//	if(document.frm1.func.value == "new"){
//		disableBtn(false);
//		//clearScreen();
//		wh_ibflag = "I";
//	}
	// Office Default Set
	formObj.wh_ofc_cd.value = formObj.f_ofc_cd.value;
	
	if(formObj.wh_cd_param.value != "null" && formObj.wh_cd_param.value != ""){
		formObj.TxtCode.value = formObj.wh_cd_param.value;
		doRetrieve();
	}
	else{
		disableBtn(false);
		wh_ibflag = "I";		
	}
	
}

function initSheet(sheetObj,sheetNo,flag) {
	var formObj = document.frm1;
    switch(sheetObj.id) {
        case "sheet1":
        	//Contact person
            with (sheetObj) {
                var HeadTitle = "||DEL|REP.|Email|Name|Phone|Fax|Email Address|Remark";
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );

                var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
                var headers = [ { Text:HeadTitle, Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [{Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cntc_ibflag" },
                            {Type:"Text",      Hidden:1,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                            {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntc_del" },
                       		{Type:"CheckBox",  Hidden:0,  Width:60,  Align:"Left",    ColMerge:0,   SaveName:"cntc_rep_flg",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                       		{Type:"CheckBox",  Hidden:0,  Width:60,  Align:"Left",    ColMerge:0,   SaveName:"cntc_rcv_eml_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:50, AcceptKeys:"E|[0123456789]|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" },
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_phn_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 ,AcceptKeys:"N|[-.( )+]", EditLen:20},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_fax_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , AcceptKeys:"N|[-.( )+]", EditLen:20},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_eml_addr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:400},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , EditLen:400}
                       		
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(200); 
        	}
            break;
    }
}

function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}

function checkDupInsertWhCode(){
	var formObj=document.frm1;
	if(formObj.TxtCreCode.value != "" && formObj.TxtCreCode.value.length == 10){
		var params = "?f_cmd="+SEARCH + "&wh_cd="+formObj.TxtCreCode.value;
		var xml1 = sheet1.GetSearchData("./WHM_WHM_0001_01GS.clt"+params);
		if(XmlRowNum(xml1) != "0"){
			COM12115
			 ComShowCodeMessage("COM12207");
//			alert("Duplicated Data!\n" +
//			"Please check Warehouse Code");
			formObj.TxtCreCode.value = "";
			formObj.TxtCreCode.focus();
			return;
		}
	}
}

/// Replaces commonly-used Windows 1252 encoded chars that do not exist in ASCII or ISO-8859-1 with ISO-8859-1 cognates.

function onBlurTextCounter(textBox, maxLength) {
    if (textBox.value.length > maxLength)
        textBox.value = textBox.value.substr(0, maxLength);
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="cntc_rmk"){
		Sheet1Add();
		sheetObj.SelectCell(row+1, 1);
	}
}