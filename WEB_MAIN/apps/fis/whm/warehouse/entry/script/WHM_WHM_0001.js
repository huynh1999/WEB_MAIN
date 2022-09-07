var sheetObjects = new Array();
var sheetCnt = 0;

var wh_ibflag = "U";
var _wh_cd = "";

var Please_Input_Name_Field = "Please enter Name Field!";
var Please_Input_Alias_Field = "Please enter Alias Field!";
var Have_No_Item = "Have no item !";
var Duplicate_Location_Code = "[Location]Duplicate location code ";
var Duplicate_Line_Row_Floor = "[Location]Duplicate Line-Row-Floor (row ";
var Deleted_Successfully = "Deleted Successfully !";
var Please_Enter_Code_Field = "Please enter Code field !";
var Please_Input_CntcPson_Info = "[Contact person]Please input information!";
var Please_Input_Loc_Info = "[Location]Please enter Location code !";
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
		case "btn_sheet2Add":
			Sheet2Add();
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
	  $("#TxtZip").val($xml.find( "wh_zip_cd").text());
	  $("#TxtPhone").val($xml.find( "wh_phn_no").text());
	  $("#TxtFax").val($xml.find( "wh_fax_no").text());
	  $("#TxtRemark").val(htmlDecode($xml.find( "wh_rmk").text()));
	  
	  var use = $xml.find( "use_flg").text();
	  
	  var index = (use == "Y" ? 0:1);
	  
	  document.getElementById('cbxUse').getElementsByTagName('option')[index].selected = 'selected';
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
		goTabSelect("01");
		formObj.TxtCreCode.focus();
		return false;
	}
	if(formObj.TxtCreCode.value.length < 5){
//		alert(Code_Field_Must_Contain_5_Characters);
		ComShowCodeMessage("COM12195");
		goTabSelect("01");
		formObj.TxtCreCode.focus();
		return false;
	}
	if(formObj.TxtName.value == ""){
//		alert(Please_Input_Name_Field);
		ComShowCodeMessage("COM12196");
		goTabSelect("01");
		formObj.TxtName.focus();
		return false;
	}
	if(formObj.TxtAlias.value == ""){
//		alert(Please_Input_Alias_Field);
		ComShowCodeMessage("COM12197");
		goTabSelect("01");
		formObj.TxtAlias.focus();
		return false;
	}
	if(!CheckCntcPson() || !CheckLocationCode() || !CheckLineRowFloor() || !doCheckLocationInUse()){
		return false;
	}
	var sheetLocationData = sheet2.GetSaveString();
	
	if(sheetLocationData == "" && sheet2.RowCount() > 0){
		goTabSelect("02");
		return false;
	}
	
	return true;
}

function Sheet1Add(){
	var formObj = document.frm1;
	sheet1.DataInsert(sheet1.RowCount()+1);
	sheet1.SetCellValue(1,"ibflag","I");
}

//function Sheet1Delete(){
//	var rows = sheet1.RowCount();
//	
//	if(rows < 1){
//		return true;
//	}
//	
//	var arrSeq = [];
//	var arrDel = [];
//	
//	var cnt1 = 0;
//	var cnt2 = 0;
//	for( i = rows; i >= 1; i--){
//		if(sheet1.GetCellValue(i,"cntc_del") == "1"){
//			
//			if(sheet1.GetCellValue(i,"cntc_ibflag") == "U"){
//				arrSeq[cnt1++] = sheet1.GetCellValue(i,"cntc_seq");
//			}
//			
//			arrDel[cnt2++] = i;
//		}
//	}
//	
//	if(arrDel.length > 0){
//			
//		var res = "0";
//		
//		if(arrSeq.length > 0){
//			var params = "?f_cmd="+SEARCH04
//			+"&wh_cd="+_wh_cd;
//			for(j = 0 ; j < arrSeq.length; j++){
//				params+="&cntc_seq="+arrSeq[j];				
//			}
//			
//			var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt"+params);
//			
//			if(xml.replace(/^\s+|\s+$/gm,'') != ""){
//				
//				var xmlDoc = $.parseXML(xml);
//				 var $xml1 = $(xmlDoc);
//				
//				 res = $xml1.find("result").text();
//			}
//		}
//		
//		if(res != "0" && res != "1"){
//			return false;
//			
//		}else{
//			
//			for(k = 0; k < arrDel.length; k++){
//				sheet1.RowDelete(arrDel[k]);
//			}
//			
//			return true;
//		}		
//	}
//	
//	return true;
//}

//function Sheet1Delete(){
//	var rows = sheet1.RowCount();
//	
//	if(rows < 1){
//		//alert(Have_No_Item);
//		return true;
//	}
//	
//	var arrSeq = [];
//	var arrDel = [];
//	
//	var cnt1 = 0;
//	var cnt2 = 0;
//	for( i = rows; i >= 1; i--){
//		if(sheet1.GetCellValue(i,"cntc_del") == "1"){
//			
//			if(sheet1.GetCellValue(i,"cntc_ibflag") == "U"){
//				arrSeq[cnt1++] = sheet1.GetCellValue(i,"cntc_seq");
//			}
//			
//			arrDel[cnt2++] = i;
//		}
//	}
//	
//	if(arrDel.length > 0){
//		if(ComShowCodeConfirm("COM12165")){
//			doShowProcess();
//			
//			setTimeout(function(){
//				var res = "0";
//				
//				if(arrSeq.length > 0){
//					var params = "?f_cmd="+SEARCH04
//					+"&wh_cd="+_wh_cd;
//					for(j = 0 ; j < arrSeq.length; j++){
//						params+="&cntc_seq="+arrSeq[j];				
//					}
//					
//					var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt"+params);
//					
//					doHideProcess();
//					
//					if(xml.replace(/^\s+|\s+$/gm,'') != ""){
//						
//						var xmlDoc = $.parseXML(xml);
//						 var $xml1 = $(xmlDoc);
//						
//						 res = $xml1.find("result").text();
//					}
//				}
//				
//				if(res != "0" && res != "1"){
//					ComShowCodeMessage("COM130304");
//					
//				}else{
//					
//					for(k = 0; k < arrDel.length; k++){
//						sheet1.RowDelete(arrDel[k]);
//					}
//					
//					alert(Deleted_Successfully);
//				}
//			},1000);
//		}
//		
//	}else{
//		ComShowCodeMessage("COM12176");
//	}
//}

function Sheet2Add(){
	var formObj = document.frm1;
	sheet2.DataInsert(sheet2.RowCount()+2);
	sheet2.SetCellValue(sheet2.RowCount()+1,"loc_ibflag","I");
	sheet2.SetCellValue(sheet2.RowCount()+1,"loc_use_flg","1");
}
function doCheckLocationInUse(){
	var formObj = document.frm1;
	var rows = sheet2.RowCount();
	
	if(rows < 1){
		return true;
	}
	
	var arrLocId = [];//Location that existing from DB
	
	var cnt1 = 0;
	
	for( i = rows+1; i >= 2; i--){
		if(sheet2.GetCellValue(i,"loc_del") == "1"){
			
			if(sheet2.GetCellValue(i,"loc_ibflag") == "U"){
				arrLocId[cnt1++] = sheet2.GetCellValue(i,"loc_id");
			}
		}
	}
	
	var res = "0";
	
	if(arrLocId.length > 0){
		
		var res = CheckLocationInUse(arrLocId);
		
		if(res.length > 1){
			ComShowCodeMessage("COM12192",res);
			return false;
		}else if(res == "0"){
			return true;
		}else{
			ComShowCodeMessage("COM132101");
			return false;
		}	
	}
	
	return true;
}

//function Sheet2Delete(){
//	var rows = sheet2.RowCount();
//	
//	if(rows < 1){
//		return true;
//	}
//	
//	var arrLocId = [];//Location that existing from DB
//	var arrDel = [];//All location want to delete
//	
//	var cnt1 = 0;
//	var cnt2 = 0;
//	for( i = rows+1; i >= 2; i--){
//		if(sheet2.GetCellValue(i,"loc_del") == "1"){
//			
//			if(sheet2.GetCellValue(i,"loc_ibflag") == "U"){
//				arrLocId[cnt1++] = sheet2.GetCellValue(i,"loc_id");
//			}
//			
//			arrDel[cnt2++] = i;
//		}
//	}
//	
//	if(arrDel.length > 0){
//			var res = "0";
//			
//			if(arrLocId.length > 0){
//				for(m = 0; m < arrLocId.length; m++){
//					
//					var res = CheckLocationInUse(arrLocId[m]);
//					
//					if(res == 1){
//						alert(Location_In_Use1 + arrLocId[m] + Location_In_Use2);
//						return false;
//					}else if(res == -1){
//						return false;
//					}
//				}
//				//delete location on DB
//				
//				var params = "?f_cmd="+SEARCH05;
//				
//				for(j = 0 ; j < arrLocId.length; j++){
//					params+="&loc_id="+arrLocId[j];					
//				}	
//				
//				var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt"+params);
//				
//				if(xml.replace(/^\s+|\s+$/gm,'') != ""){
//					
//					var xmlDoc = $.parseXML(xml);
//					var $xml1 = $(xmlDoc);
//					
//					var res = $xml1.find("result").text();
//				}					
//			}
//			
//			if(res != "0" && res != "1"){
//				return false;
//			}else{
//			
//				for(k = 0; k < arrDel.length; k++){
//					sheet2.RowDelete(arrDel[k]);
//				}
//				
//				return true;
//			}
//		}
//		
//	}
//
//	return true;
//}

//function Sheet2Delete(){
//	var rows = sheet2.RowCount();
//	
//	if(rows < 1){
//		alert(Have_No_Item);
//		return;
//	}
//	
//	var arrLocId = [];//Location that existing from DB
//	var arrDel = [];//All location want to delete
//	
//	var cnt1 = 0;
//	var cnt2 = 0;
//	for( i = rows+1; i >= 2; i--){
//		if(sheet2.GetCellValue(i,"loc_del") == "1"){
//			
//			if(sheet2.GetCellValue(i,"loc_ibflag") == "U"){
//				arrLocId[cnt1++] = sheet2.GetCellValue(i,"loc_id");
//			}
//			
//			arrDel[cnt2++] = i;
//		}
//	}
//	
//	if(arrDel.length > 0){
//		if(ComShowCodeConfirm("COM12165")){
//			doShowProcess();
//			setTimeout(function(){
//				var res = "0";
//				
//				if(arrLocId.length > 0){
//					for(m = 0; m < arrLocId.length; m++){
//						
//						var res = CheckLocationInUse(arrLocId[m]);
//						if(res == 1){
//							alert(Location_In_Use1 + arrLocId[m] + Location_In_Use2);
//							return;
//						}else if(res == -1){
//							alert(Check_Location_In_Use_Query_Fail);
//							return;
//						}
//					}
//					//delete location on DB
//					doShowProcess();
//					
//					var params = "?f_cmd="+SEARCH05;
//					
//					for(j = 0 ; j < arrLocId.length; j++){
//						params+="&loc_id="+arrLocId[j];					
//					}	
//					
//					var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt"+params);
//					doHideProcess();
//					
//					if(xml.replace(/^\s+|\s+$/gm,'') != ""){
//						
//						var xmlDoc = $.parseXML(xml);
//						var $xml1 = $(xmlDoc);
//						
//						var res = $xml1.find("result").text();
//					}					
//				}
//				
//				if(res != "0" && res != "1"){
//					ComShowCodeMessage("COM130304");
//					
//				}else{
//				
//					for(k = 0; k < arrDel.length; k++){
//						sheet2.RowDelete(arrDel[k]);
//					}
//					
//					alert(Deleted_Successfully);
//				}
//			},1000);
//		}
//		
//	}else{
//		ComShowCodeMessage("COM12176");
//	}
//}

function CheckLocationInUse(loc_id){
	var formObj = document.frm1;
	var params = "?f_cmd="+SEARCH08;
	
	for(var i = 0 ; i < loc_id.length; i++){
		params+="&loc_id=" + loc_id[i];
	}
				
	
	var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt"+params);
	
	 var xmlDoc = $.parseXML(xml);
	 var $xml1 = $(xmlDoc);
	
	 var res = $xml1.find("result").text();
	 
	 return res;	
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
				var xml = sheet2.GetSaveData("./WHM_WHM_0001_05GS.clt",params);
				
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
					ComShowCodeMessage("COM12151");
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
		var xml1 = sheet1.GetSearchData("./WHM_WHM_0001_01GS.clt",params);
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
				sheet1.DoSearch("./WHM_WHM_0001_02GS.clt",params1);
//			sheet1.LoadSearchData(xml2);
			
			var params2 = "f_cmd="+SEARCH02
			+ "&wh_cd=" + formObj.TxtCode.value;		
//			var xml3 = 
				sheet2.DoSearch("./WHM_WHM_0001_03GS.clt",params2);
//			sheet2.LoadSearchData(xml3);
			
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

function sheet1_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i <= sheet1.LastRow(); i++){
		sheet1.SetCellValue(i,"cntc_rmk",htmlDecode(sheet1.GetCellValue(i,"cntc_rmk")));
	}
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		showCompleteProcess();
	}
}

function disableBtn(flag ){
	var formObj = document.frm1;
	//if(flag){
	formObj.btn_sheet1Add.disabled = flag;
	formObj.btn_sheet2Add.disabled = flag;
	formObj.btn_Save.disabled	   = flag;	
	//}
	
//	else{
//		btn_sheet1Add.disabled = false;
//		btn_sheet1Delete.disabled = false;
//		btn_sheet2Add.disabled = false;
//		btn_sheet2Delete.disabled = false;
//	}
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
	
	formObj.cbxUse.value = "N";
	
	sheet1.RemoveAll();
	sheet2.RemoveAll();
	
	if(newFlg){
		formObj.TxtCode.value 		= "";
		formObj.TxtCode.focus();
	}
}

function GetSaveData(){
	var formObj = document.frm1;
	// Warehouse
	
//	if(_wh_cd == ""){
//		return "";
//	}
	formObj.f_cmd.value=SEARCH03;
	var paramString =
	 "wh_ibflag="	+ wh_ibflag;
	paramString+= "&"+FormQueryString(formObj);
//	 +"&wh_cd="		+ /*_wh_cd*/ formObj.TxtCreCode.value.toUpperCase()
//	 +"&wh_nm=" 	+ formObj.TxtName.value.toUpperCase()
//	 +"&wh_als_nm=" + formObj.TxtAlias.value.toUpperCase()
//	 +"&wh_addr=" 	+ escape(replaceWordChars(formObj.TxtAddress.value))
//	 +"&wh_cty_nm=" + formObj.TxtCity.value
//	 +"&wh_ste_cd=" + formObj.TxtState.value
//	 +"&wh_zip_cd=" + formObj.TxtZip.value
//	 +"&wh_phn_no=" + formObj.TxtPhone.value
//	 +"&wh_fax_no=" + formObj.TxtFax.value
//	 +"&wh_rmk=" 	+ escape(replaceWordChars(formObj.TxtRemark.value))
//	 +"&wh_use_flg="+ $("#cbxUse").children("option").filter(":selected").text();
	 
	 //Contact person
	 
	var sheetCntcPsonData = sheet1.GetSaveString();
	
	if(sheetCntcPsonData != ""){
		paramString += "&" +sheetCntcPsonData;
	}
	
	//Location
	
	var sheetLocationData = sheet2.GetSaveString();
	
	if(sheetLocationData == "" && sheet2.RowCount() > 0){
		return "";
	}else{
		paramString += "&" + sheetLocationData;
	}
	
	return paramString;
}

function sheet2_OnSearchEnd(){
	for(var i=1; i <= sheet2.LastRow(); i++){
		sheet2.SetCellValue(i,"loc_rmk",htmlDecode(sheet2.GetCellValue(i,"loc_rmk")));
	}
	doHideProcess();
}

function sheet2_OnChange(item,row,col){
	var formObj = document.frm1;
	
	if(sheet2.ColSaveName(col) == "loc_del"){
		if(sheet2.GetCellValue(row,"loc_ibflag") == "I"){
			sheet2.RowDelete(row);
		}
	}else if(sheet2.ColSaveName(col) =="loc_max_vol" ){
		var feetVal = roundXL(parseFloat(sheet2.GetCellValue(row,col)) * 3.2808,3);
		sheet2.SetCellValue(row,"loc_max_vol_ft",feetVal,0);
		
	}else if(sheet2.ColSaveName(col) =="loc_max_vol_ft"){
		var meterVal = roundXL(parseFloat(sheet2.GetCellValue(row,col)) / 3.2808,3);
		sheet2.SetCellValue(row,"loc_max_vol",meterVal,0);
		
	}else if(sheet2.ColSaveName(col) =="loc_max_wgt"){
		var lbsVal = roundXL(parseFloat(sheet2.GetCellValue(row,col)) * 2.2046,2);
		sheet2.SetCellValue(row,"loc_max_lbs",lbsVal,0);
		
	}else if(sheet2.ColSaveName(col) =="loc_max_lbs"){
		var kgsVal = roundXL(parseFloat(sheet2.GetCellValue(row,col)) / 2.2046,2);
		sheet2.SetCellValue(row,"loc_max_wgt",kgsVal,0);
	}
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
				goTabSelect("01");
				return false;
			}
		}		
	}
	
	return true;
}

function CheckLocationCode(){
	var formObj = document.frm1;
	var len = sheet2.RowCount();
	
	if(len > 0){
		if(sheet2.FindText("loc_cd","")!= -1){
			ComShowMessage(Please_Input_Loc_Info);
			sheet2.SelectCell(sheet2.FindText("loc_cd",""),"loc_cd")
			goTabSelect("02");
			return false;
		}
		for(var i = 2; i <= len; i++){
			var loc_cd = sheet2.GetCellValue(i,"loc_cd");
			for(var j = i + 1; j <= len+1; j++){
				var loc_cd_1 = sheet2.GetCellValue(j,"loc_cd");
				
				if(loc_cd == loc_cd_1){
//					alert(Duplicate_Location_Code + "(" + loc_cd + ")");
					ComShowCodeMessage("COM12199",loc_cd);
					goTabSelect("02");
					return false;
				}
			}			
		}
		
		var params = "?f_cmd=" + SEARCH06
					+"&wh_cd=" + formObj.TxtCode.value;
		
		for(k = 2; k <= len+1; k++){
			var loc_cd = sheet2.GetCellValue(k,"loc_cd");
			if(loc_cd != ""){
				params += 	"&loc_cd=" + loc_cd							
							+"&loc_id="+sheet2.GetCellValue(k,"loc_id");
			}
		}
		
		var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt" + params);
		
		 var xmlDoc = $.parseXML(xml);
		 var $xml1 = $(xmlDoc);
		
		 var res = $xml1.find("result").text();
		 
		 if(res == "0"){
			 return true;
		 }else if(res.length > 1){
//			 alert(Duplicate_Location_Code + "(" + res + ")");
			 ComShowCodeMessage("COM12199",res);
			 goTabSelect("02");
			return false;
		 }else{
//			 alert(Fail_To_Query_To_Database);
			 ComShowCodeMessage("COM132101");
			 return false;
		 }
	}
	
	return true;
}

function CheckLineRowFloor(){
	var formObj = document.frm1;
	var len = sheet2.RowCount();
	
	if(len > 0){
		for(var i = 2; i <= len; i++){
			var loc_line_no = sheet2.GetCellValue(i,"loc_line_no");
			var loc_row_no = sheet2.GetCellValue(i,"loc_row_no");
			var loc_flr_no = sheet2.GetCellValue(i,"loc_flr_no");
			
			if( loc_line_no != "0" && loc_row_no != "0" && loc_flr_no != "0" ){
				for(var j = i + 1; j <= len + 1; j++){
					
					var loc_line_no1 = sheet2.GetCellValue(j,"loc_line_no");
					var loc_row_no1 = sheet2.GetCellValue(j,"loc_row_no");
					var loc_flr_no1 = sheet2.GetCellValue(j,"loc_flr_no");
					
					if(loc_line_no == loc_line_no1 && loc_row_no == loc_row_no1 && loc_flr_no == loc_flr_no1){
//						alert(Duplicate_Line_Row_Floor + (i - 1) + ")");
						 ComShowCodeMessage("COM12200", i-1);
						 goTabSelect("02");
						return false;
					}
				}
			}
		}					
	
		var params = "?f_cmd=" + SEARCH07
					+"&wh_cd=" + formObj.TxtCode.value;
		
		var checkFlg = false;
		
		for(k = 2; k <= len + 1; k++){
			
			var loc_line_no = sheet2.GetCellValue(k,"loc_line_no");
			var loc_row_no = sheet2.GetCellValue(k,"loc_row_no");
			var loc_flr_no = sheet2.GetCellValue(k,"loc_flr_no");
			
			if( loc_line_no != "0" && loc_row_no != "0" && loc_flr_no != "0"){
				
				params 	+= "&loc_line_no=" + loc_line_no
						+"&loc_row_no=" + loc_row_no
						+"&loc_flr_no=" + loc_flr_no
						+"&row=" + (k-1)
						+"&loc_id="+sheet2.GetCellValue(k,"loc_id");
				
				checkFlg = true;
			}
		}
		
		if(checkFlg){
			var xml = sheet2.GetSearchData("./WHM_WHM_0001_05GS.clt" + params);
			
			 var xmlDoc = $.parseXML(xml);
			 var $xml1 = $(xmlDoc);
			
			 var res = $xml1.find("result").text();
			 
			 if(res == "0"){
				 return true;
			 }else if(parseInt(res) >= 1){
//				 alert(Duplicate_Line_Row_Floor + res + ")");
				 ComShowCodeMessage("COM12200", res);
				 goTabSelect("02");
				 return false;
			 }else{
//				 alert(Fail_To_Query_To_Database);
				 ComShowCodeMessage("COM132101");
				 return false;
			 }
		}		
	}
	
	return true;
}

//function sheet1_OnChange(item,row,col){
//	if(sheet1.ColSaveName(col) =="cntc_eml_addr"){
//		var email = sheet1.GetCellValue(row,col);
//		if(email != "" && !validateEmail(email)){
//			alert("Please input corect email !");
//			sheet1.SetCellValue(row,col,"");
//			sheet1.SelectCell(row,col,1);
//		}
//	}
//}

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
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:50, AcceptKeys:"E|[ ]" },
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_phn_no",         KeyField:0,   CalcLogic:"",   Format:"###-###-####",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 ,AcceptKeys:"N|[-]", EditLen:10},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_fax_no",         KeyField:0,   CalcLogic:"",   Format:"###-###-####",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , AcceptKeys:"N|[-]", EditLen:10},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_eml_addr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:400},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cntc_rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , EditLen:400}
                       		
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(200); 
                //SetCountFormat("BOTTOMDATA / TOTALROWS");
                //SetSheetWidth(1050);
               // resizeSheet();
        	}
            break;
            
        case "sheet2":
        	//Location
            with (sheetObj) {
                var HeadTitle = "|DEL|System code|Location|Line|Row|Floor|Space Type|Loc. Type|Max Measurement|Max Measurement|Max Weight|Max Weight|Use|Remark";
                var HeadTitle1 = "|DEL|System code|Location|Line|Row|Floor|Space Type|Loc. Type|CBM|CFT|KG|LB|Use|Remark";
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:HeadTitle, Align:"Center"} , { Text:HeadTitle1, Align:"Center"}];
                InitHeaders(headers, info);

                var cols = [{Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"loc_ibflag" },
                            {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"loc_del" },
                       		{Type:"Text",      Hidden:1,  Width:100,  Align:"Center",    ColMerge:0,   SaveName:"loc_id",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,   SaveName:"loc_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,InputCaseSensitive:1, EditLen:20, AcceptKeys:"E|N|[-]"},
                       		{Type:"Int",       Hidden:0,  Width:40,   Align:"Center",   ColMerge:1,   SaveName:"loc_line_no",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 , AcceptKeys:"N"},
                       		{Type:"Int",       Hidden:0,  Width:40,   Align:"Center",   ColMerge:1,   SaveName:"loc_row_no",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 , AcceptKeys:"N"},
                       		{Type:"Int",       Hidden:0,  Width:40,   Align:"Center",   ColMerge:1,   SaveName:"loc_flr_no",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:7, AcceptKeys:"N" },
                       		{Type:"Combo",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"loc_spc_tp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                       		{Type:"Combo",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"loc_tp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                       		{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_max_vol",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:9, AcceptKeys:"N" },
                       		{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_max_vol_ft",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:9 , AcceptKeys:"N"},
                       		{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_max_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:9 , AcceptKeys:"N"},
                       		{Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"loc_max_lbs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:9 , AcceptKeys:"N"},
                       		{Type:"CheckBox",      Hidden:0,  Width:50,  Align:"Left",    ColMerge:0,   SaveName:"loc_use_flg"},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"loc_rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , EditLen:400}
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(500);
                SetColProperty('loc_spc_tp_cd', {ComboText:"|"+comcd_sptp_nm, ComboCode:"|"+comcd_sptp_cd} );
                SetColProperty('loc_tp_cd', {ComboText:"|"+comcd_tp_nm, ComboCode:"|"+comcd_tp_cd} );
                //SetCountFormat("BOTTOMDATA / TOTALROWS");
                //resizeSheet();
        	}
            break;
    }
}

function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}

function goTabSelect(isNumSep) {
	var formObj = document.frm1;
	var tabObjs=document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
    } else if( isNumSep == "02" ) {
    	currTab=isNumSep;	//탭상태저장
        tabObjs[0].style.display='none';
        tabObjs[1].style.display="inline";
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}

function checkDupInsertWhCode(){
	var formObj=document.frm1;
	if(formObj.TxtCreCode.value != ""){
		var params = "?f_cmd="+SEARCH + "&wh_cd="+formObj.TxtCreCode.value;
		var xml1 = sheet1.GetSearchData("./WHM_WHM_0001_01GS.clt"+params);
		if(XmlRowNum(xml1) != "0"){
			 ComShowCodeMessage("COM12207");
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

function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="loc_rmk"){
		Sheet2Add();
		sheetObj.SelectCell(row+1, 1);
	}
}