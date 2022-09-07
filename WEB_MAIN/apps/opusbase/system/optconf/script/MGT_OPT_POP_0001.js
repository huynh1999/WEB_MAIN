var sheetObjects = new Array();
var sheetCnt = 0;

var Please_Select_Office = "Please select a Office.";
var Have_No_Data = "Have no data.";
var Please_Select_Another_Office = "Please select another office";

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    try {
        switch(srcName) {
        
        	case "SEARCH":
        		Fillter();
     	   break;
           case "SELECT":
        	   if( sheet1.RowCount() == 0 || GetRowHiddenCount(sheet1) == sheet1.RowCount() ){
        		   alert(Have_No_Data);
        		   return;
        	   }
        	   
        	   sheet1.SetSelectRow(GetSelectedIndex(sheet1));
        	   
        	   doSelect();
           break;
           case "CLOSE":
        	   ComClosePopup("");
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

function doSelect(){
	
	var selectedRow = sheet1.GetSelectRow();
	
	if(selectedRow < 1){
		alert(Please_Select_Office);
		return;
	}
	
	if(parent.rtnary[3] == "COPY_TO" && sheet1.GetCellValue(selectedRow, "ofc_cd") == parent.rtnary[4]){
		alert(Please_Select_Another_Office);
		return;
	}
	
	var retArray="";		
	
	retArray += sheet1.GetCellValue(selectedRow, "ofc_cd");
	
	ComClosePopup(retArray);
}

function XmlRowNum(xml){
	var index1 = xml.indexOf("TOTAL") + 7;
	var index2 = xml.indexOf("\"",index1);
	
	var res = xml.substring(index1,index2);
	
	return res;
}

function Fillter(){
	
	//type: ofc_cd / ofc_nm
	
	var nRowCount = sheet1.RowCount();
	
	if(nRowCount > 1){
		
		var ofc_cd_val =  ofc_cd.value.toUpperCase();
		var ofc_nm_val =  ofc_nm.value.toUpperCase();
		
		for(var i = 1; i <= nRowCount; i++){
			if(sheet1.GetCellValue(i,"ofc_cd").toUpperCase().indexOf(ofc_cd_val) > -1 && sheet1.GetCellValue(i,"ofc_nm").toUpperCase().indexOf(ofc_nm_val) > -1){
				sheet1.SetRowHidden(i,0);
			}else{
				sheet1.SetRowHidden(i,1);
			}
		}
		
		var nHiddenRow = GetRowHiddenCount(sheet1);
		
		if(nHiddenRow < sheet1.RowCount()){
			if(sheet1.GetRowHidden(GetSelectedIndex(sheet1)) == 1){
				sheet1.SetCellValue(GetFirstShowRow(sheet1),"chk",1);
			}
		}
	}	
}

function ofc_cd_OnKeyUp(){
	
	Fillter();
	
	$("#ofc_cd").focusin();
}

function ofc_nm_OnKeyUp(){
	
	Fillter();
	
	$("#ofc_nm").focusout();
}

function GetRowHiddenCount(sheetObj){
	var nRowCount = 0;
	
	nRowCount = sheetObj.RowCount();
	
	if(nRowCount == 0){
		return 0;
	}
	
	var nHiddenCount = 0;
	
	for(var i = 1; i <= nRowCount; i++){
		if(sheetObj.GetRowHidden(i) == 1){
			nHiddenCount++;
		}
	}
	
	return nHiddenCount;
}

function GetFirstShowRow(sheetObj){
	var nRowCount = sheetObj.RowCount();
	
	if(nRowCount == 0){
		return -1;
	}
	
	for(var i = 1; i <= nRowCount; i++){
		if(sheetObj.GetRowHidden(i) == 0){
			return i;
		}
	}
}

function GetSelectedIndex(sheetObj){
	
	var nRowCount = sheetObj.RowCount();
	
	if(nRowCount == 0){
		return -1;
	}
	
	for(var i = 1; i <= nRowCount; i++){
		if(sheet1.GetCellValue(i,"chk") == 1){
			return i;
		}
	}
	
	return -1;
}


function GetSaveData(){
	
}

//function initControl() {
//	axon_event.addListenerForm  ('change', 'obj_change', document.form);// event change value on control
//}
//
//function obj_change(){
//	var obj=ComGetEvent();
//    switch(obj.name) {
//        case "TxtName":
//        	
//    	break;
//    }
//}



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
	
	var xml = sheet1.GetSearchData("./MGT_OPT_POP_0001GS.clt?f_cmd="+SEARCH);
	
	sheet1.LoadSearchData(xml);
}

function sheet1_OnDblClick(sheetObj,Row,Col){

	doSelect();
}

function sheet1_OnSearchEnd(){
	sheet1.SetCellValue(1,"chk",1);
}

function sheet1_OnChange(item,row,col){
	
	
	
}

function sheet1_OnAfterEdit(item, row, col) {
	
	
}

function initSheet(sheetObj,sheetNo,flag) {
    switch(sheetObj.id) {
        case "sheet1":
        	//Contact person
            with (sheetObj) {
                var HeadTitle = "CHK|Office Code|Office Name";
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:HeadTitle, Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [
                            {Type:"Radio",      Hidden:0,  Width:50,  Align:"Center",    ColMerge:0,   SaveName:"chk"},
                       		{Type:"Text",      Hidden:0,  Width:70,  Align:"Center",    ColMerge:0,   SaveName:"ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:20},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"ofc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:50},
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(350);
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