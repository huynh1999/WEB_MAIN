var sheetObjects = new Array();
var sheetCnt = 0;

var Please_Select_Office_Code_Fist = "Please select office code fist.";
var Please_Enter_Screen_Id = "Please enter Screen Id!";
var Please_Select_Office_Code = "Please select office code!";
var There_Is_No_Data_To_Save = "There is no data to save.";
var Case_Cant_Be_Empty_With_Type_Is_Date = "Case can't be empty with Type is Date.";
var Duplicate_Key_Code_On_Row = "Duplicate Key Code on row[";
var Dp_end = "].";
var Number_Only_For_This_Case = "Number only for this case.";
var Have_No_Data = "Have no data";
var Please_Select_Rows_For_Copying = "Please select rows for copying";
var Please_Enter_Mandatory_Fields = "Please enter mandatory fields";
var Copy_Successfully = "Copy successfully.";
var Fail_To_Copy = "Fail to copy";
var Please_Select_Another_Office = "Please select another office";

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    try {
        switch(srcName) {
           case "SEARCH":
        	   if(!validateForm()) return;
        	   
                var params = "?f_cmd="+SEARCH
                			+"&ofc_cd=" + document.form.ofc_cd.value
                			+"&ui_id=" + document.form.TxtScreenId.value.toUpperCase();
                			+"&com_id="+"";
               var xml = sheet1.GetSearchData("./MGT_OPT_0001GS.clt"+params);
               sheet1.LoadSearchData(xml);
               
           break;
           case "SHEET1ADD":
        	   if(document.form.ofc_cd.value == null || document.form.ofc_cd.value == ""){
        		   alert(Please_Select_Office_Code_Fist);
        		   return;
        	   }
               sheet1.DataInsert(sheet1.RowCount()+1);
               sheet1.SetCellEditable(sheet1.RowCount(),"case",0);
           break;
           
           case "SHEET1COPYFROM":
        	   if(!validateForm()) return;
        	   rtnary=new Array(1);
	  		   var formObj=document.form;
	  		   
	  		   rtnary[0]="1";
	  		   rtnary[1]="";
	  		   rtnary[2]=window;
	  		   rtnary[3]="";
	  		   rtnary[4]="";
	  		   
	  		   callBackFunc = "CALLBACK_COPY_FROM_POP";
	  		   modal_center_open('./MGT_OPT_POP_0001.clt', rtnary, 600,480,"yes");
	  		   
           break;
           
           case "SHEET1COPYTO":
        	   if(!validateForm()) return;
        	   
        	   if(sheet1.RowCount() <= 0){
        		   alert(Have_No_Data);
        		   return;
        	   }else if (!HaveSelectedRowToCopy()){
        		   alert(Please_Select_Rows_For_Copying);
        		   return;
        	   }
        	   
        	   rtnary=new Array(1);
	  		   var formObj=document.form;
	  		   
	  		   rtnary[0]="1";
	  		   rtnary[1]="";
	  		   rtnary[2]=window;
	  		   rtnary[3]="COPY_TO";
	  		   rtnary[4]=document.form.ofc_cd.value;
	  		   
	  		   
	  		   callBackFunc = "CALLBACK_COPY_TO_POP";
	  		   modal_center_open('./MGT_OPT_POP_0001.clt', rtnary, 600,480,"yes");
           break;
           
           case "SAVE":
        	   doSave();
           break;
           
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }        
    }
}

function CALLBACK_COPY_FROM_POP(rtnVal){
	var formObj = document.form;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   var ofcCd = rtnValAry[0];
	   
	    var params = "?f_cmd="+SEARCH
		+"&ofc_cd=" + ofcCd
		+"&ui_id=" + formObj.TxtScreenId.value.toUpperCase();
		+"&com_id="+"";
		
		var xml = sheet1.GetSearchData("./MGT_OPT_0001_02GS.clt"+params);
		
		var xml2 = xml.substring(0,xml.lastIndexOf(",")) + xml.substring(xml.lastIndexOf(",")+1);
		 
		var arrData = JSON.parse(xml2);
		
		//if have data, append current data to copy data
		
		if(arrData.total > 0){
			
			//Remove records that have the same Key_Cd with current data
			
			var curRowCount = sheet1.RowCount();
			
			if(curRowCount > 0){
				
				for(var i = arrData.total - 1 ; i >= 0; i--){
					
					for(var j = 1; j <= curRowCount; j++){
						if(arrData.data[i].key_cd.toUpperCase() == sheet1.GetCellValue(j,"key").toUpperCase()){
							arrData.data.splice(i,1);
							arrData.total -= 1;
							break;
						}
					}
				}
			}
			
			//If have data after remove duplicate then adding them to sheet
			
			if(arrData.total > 0){
				for(var i = 0; i < arrData.total; i++){
					
					var RowCount = sheet1.RowCount();
					
					sheet1.DataInsert(RowCount + 1);
					
					RowCount = sheet1.RowCount();
					
					sheet1.SetCellValue(RowCount,"key",arrData.data[i].key_cd,0);
					sheet1.SetCellValue(RowCount,"type",arrData.data[i].tp_cd,0);
					sheet1.SetCellValue(RowCount,"case",arrData.data[i].cs_cd,0);
					sheet1.SetCellValue(RowCount,"value",arrData.data[i].value,0);
					sheet1.SetCellValue(RowCount,"attr",arrData.data[i].attr,0);
				}
				
				//enable or disable fields
				
				sheet1_OnSearchEnd();
			}
		}
   }    
}


function CALLBACK_COPY_TO_POP(rtnVal){
	
	var formObj = document.form;
	
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   
	   doShowProcess();
	   setTimeout(function(){
		   var rtnValAry=rtnVal.split("|");
		   var ofcCd = rtnValAry[0];
		   
		   var sheetData = sheet1.GetSaveString();
			
			var params =
			 "?f_cmd="	+ ADD
			 +"&ofc_cd=" 	+ ofcCd
			 +"&ui_id=" 	+ document.form.TxtScreenId.value.toUpperCase()
			 +"&" + sheetData;
			
				
			var xml = sheet1.GetSearchData("./MGT_OPT_0001_01GS.clt"+params);
			
			doHideProcess();
			
			if(xml.replace(/^\s+|\s+$/gm,'') != ""){
				
				var xmlDoc = $.parseXML(xml);
				 var $xml1 = $(xmlDoc);
				
				 var res = $xml1.find("result").text();
				 
				 if(res == "1"){
					
					 //ComShowCodeMessage("COM132601");
					 alert(Copy_Successfully);
				 }else{
					// ComShowCodeMessage("COM12151");
					 alert(Fail_To_Copy);
				 }
			}else{
				//ComShowCodeMessage("COM12151");
				alert(Fail_To_Copy);
			}
			
			
	   },1000);
   }
}

function HaveSelectedRowToCopy(){
	
	var nRowCount = sheet1.RowCount();
	
	if(nRowCount == 0){
		return false;
	}
	
	for(var i = 1; i <= nRowCount; i++){
		if(sheet1.GetCellValue(i,"copychk") == 1){
			return true;
		}
	}
	
	return false;
}

function XmlRowNum(xml){
	var index1 = xml.indexOf("TOTAL") + 7;
	var index2 = xml.indexOf("\"",index1);
	
	var res = xml.substring(index1,index2);
	
	return res;
}

function callFromSub(ofccd){
	document.form.ofc_cd.value = ofccd;
//	document.forms[0].parent_seq.value   = mKey;
	doWork('SEARCH');
}

function sheet1_CheckMandatoryField(){
	
	var RowCount = sheet1.RowCount();
	
	if(RowCount > 0){
		for(var i = 1 ; i <= RowCount; i++){
			if(sheet1.GetCellValue(i,"key") == ""){
				alert(Please_Enter_Mandatory_Fields);
				sheet1.SelectCell(i,"key",1);
				return false;
			}
		}
	}
	
	return true;
}

function validateForm(){
	if(document.form.TxtScreenId.value == ""){
		alert(Please_Enter_Screen_Id);
		document.form.TxtScreenId.focus();
		return false;
	}
	
	if(document.form.ofc_cd.value == ""){
		alert(Please_Select_Office_Code);
		return false;
	}
	
	if(!sheet1_CheckMandatoryField()){
		return false;
	}
	
	return true;
}

function validateScreenId(evt) {
	//only number
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9a-zA-Z_]/;
//	  var regex = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
	 // var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	  if( !regex.test(key)) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
}

function doSave(){
	
	var params = GetSaveData();
	
	if(params == "") return; 
	
	if(!validateForm()) return;
	
	if(ComShowCodeConfirm("COM130101")){
		
		var xml = sheet1.GetSearchData("./MGT_OPT_0001_01GS.clt"+params);
		
		if(xml.replace(/^\s+|\s+$/gm,'') != ""){
			
			var xmlDoc = $.parseXML(xml);
			 var $xml1 = $(xmlDoc);
			
			 var res = $xml1.find("result").text();
			 
			 if(res == "1"){
				
				 ComShowCodeMessage("COM132601");
				 doWork("SEARCH");
			 }else{
				 ComShowCodeMessage("COM12151");
			 }
		}else{
			ComShowCodeMessage("COM12151");
		}			
	}
}

function GetSaveData(){
	
	var rowCount = sheet1.RowCount();
	
	if(rowCount < 1){
		alert(There_Is_No_Data_To_Save);
		return "";
	}
	
	var sheetData = sheet1.GetSaveString();
	
//	if(sheetData == ""){
//		return "";
//	}
	
	
	var paramString =
	 "?f_cmd="	+ MODIFY
	 +"&ofc_cd=" 	+ document.form.ofc_cd.value
	 +"&ui_id=" 	+ document.form.TxtScreenId.value.toUpperCase()
	 +"&" + sheetData;
	 
	
	return paramString;
}

function initControl() {
	axon_event.addListenerForm  ('change', 'obj_change', document.form);// event change value on control
}

function obj_change(){
	var obj=ComGetEvent();
    switch(obj.name) {
        case "TxtName":
        	
    	break;
    }
}

function ScreenId_OnChange(){
	sheet1.RemoveAll();
}


function loadPage() {
	frm=document.form;
	sheetCnt=sheetObjects.length;
	for (var i = 0; i < sheetObjects.length; i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(sheetObjects[i]);
	}
	
	initControl();
}



function sheet1_OnSearchEnd(){
	
	var rowCount = sheet1.RowCount();
	
	if(rowCount > 0){
		
		for( var i = 1 ; i <= rowCount; i++){
			if(sheet1.GetCellValue(i,"type") != "DT"){
				sheet1.SetCellEditable(i,"case",0);
			}else if(sheet1.GetCellValue(i,"case") != "PR"){
				sheet1.SetCellEditable(i,"value",0);
			}
			
			if(sheet1.GetCellValue(i,"ibflag") != "I"){
				sheet1.SetCellEditable(i,"key",0);
			}
		}
	}
}

function sheet1_OnChange(item,row,col){
	
	switch(sheet1.ColSaveName(col)){
		case "type":
			if(sheet1.GetCellValue(row,col) == "DT"){
				
				sheet1.SetCellValue(row,"case","TD");
				sheet1.SetCellEditable(row,"case",1);
				
			}else{
				
				sheet1.SetCellValue(row,"case","",0);
				sheet1.SetCellEditable(row,"case",0);
				sheet1.SetCellEditable(row,"value",1);
				
				if(sheet1.GetCellValue(row,col) == "RB"){
					
					sheet1.SelectCell(row,"value",1);
				}
			}
			
			sheet1.SetCellValue(row,"value","",0);
			break;
		case "case":
			if(sheet1.GetCellValue(row,col) == ""){
				
				alert(Case_Cant_Be_Empty_With_Type_Is_Date);
				sheet1.SetCellValue(row,col,"TD");
				sheet1.SelectCell(row,col,1);
				sheet1.SetCellEditable(row,"value",0);
				
			}else if(sheet1.GetCellValue(row,col) == "TD" || sheet1.GetCellValue(row,col) == "EM" || sheet1.GetCellValue(row,col) == "EY"){
				
				sheet1.SetCellEditable(row,"value",0);
				
			}else{
				
				sheet1.SetCellEditable(row,"value",1);
				sheet1.SelectCell(row,"value",1);
				
			}
			
			sheet1.SetCellValue(row,"value","",0);
			break;
	}
}

function sheet1_OnAfterEdit(item, row, col) {
	
	switch(sheet1.ColSaveName(col)){
	case "key":
		if(sheet1.GetCellValue(row,"key").toUpperCase() != ""){
			
			var rowCount = sheet1.RowCount();
			
			if(sheet1.RowCount() > 1){
				for(var i = 1; i <= rowCount; i++){
					if(i != row){
						if(sheet1.GetCellValue(i,"key").toUpperCase() == sheet1.GetCellValue(row,"key").toUpperCase()){
							alert(Duplicate_Key_Code_On_Row + i + Dp_end);
							sheet1.SelectCell(row,col,1);
							return;
						}
					}
				}
			}
		}
		
		break;
	
	case "value":
		if( 
				( sheet1.GetCellValue(row,"type") == "DT" && sheet1.GetCellValue(row,"case") == "PR" ) 
			|| sheet1.GetCellValue(row,"type") == "RB" 
		){
			if( isNaN(parseInt(sheet1.GetCellValue(row,"value"))) ){
				alert(Number_Only_For_This_Case);
				sheet1.SelectCell(row,"value",1);
			}
		}
		break;
	}
}

function initSheet(sheetObj,sheetNo,flag) {
    switch(sheetObj.id) {
        case "sheet1":
        	//Contact person
            with (sheetObj) {
                var HeadTitle = "|Del|CHK|Key|Type|Case|Value|Attribute";
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:HeadTitle, Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [{Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                            {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"delchk" },
                            {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"copychk" },
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Center",    ColMerge:0,   SaveName:"key",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:20},
                       		{Type:"Combo",      Hidden:0,  Width:180,  Align:"Center",    ColMerge:0,   SaveName:"type",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 ,EditLen:20},
                       		{Type:"Combo",      Hidden:0,  Width:180,  Align:"Center",    ColMerge:0,   SaveName:"case",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 ,  EditLen:20},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Center",    ColMerge:0,   SaveName:"value",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:50},
                       		{Type:"Combo",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,   SaveName:"attr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , EditLen:50}
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(600);
                SetColProperty('type', {ComboText:comcd_type_nm, ComboCode:comcd_type_cd} );
                SetColProperty('case', {ComboText:"|"+comcd_case_nm, ComboCode:"|" +comcd_case_cd} );
                SetColProperty('attr', {ComboText:"|"+comcd_attr_nm, ComboCode:"|"+comcd_attr_cd} );
                //SetCountFormat("BOTTOMDATA / TOTALROWS");
                //SetSheetWidth(1050);
               // resizeSheet();
        	}
            break;
    }
}

function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}