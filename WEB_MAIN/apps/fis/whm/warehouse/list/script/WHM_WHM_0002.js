var sheetObjects = new Array();
var sheetCnt = 0;

document.onclick=processButtonClick;

function doWork(srcName) {
	
    var formObj=document.frm1;
	try {
		//var srcName=ComGetEvent("name");
		switch (srcName) {
		case "SEARCH":
			sheet1.ShowProcessDlg();
			setTimeout(function(){
				var params = "f_cmd=" + SEARCH;
				
				var code = "";
				var name = "";
				var alias = "";
				
				if(formObj.cbxCond.value == "0"){
					code = formObj.TxtCond.value;
					//params += "&wh_cd="+TxtCond.value;
				}else if(formObj.cbxCond.value == "1"){
					name = formObj.TxtCond.value;
					//params += "&wh_nm="+TxtCond.value;
				}else if(formObj.cbxCond.value == "2"){
					alias = formObj.TxtCond.value;
					//params += "&wh_als_nm="+TxtCond.value;
				}
				
				params += "&wh_cd="+code
						+ "&wh_nm="+name
						+ "&wh_als_nm=" + alias;
				
				if(formObj.cbxUse.value == "0"){
					params += "&use_flg=Y";
				}else{
					params += "&use_flg=N";
				}
				
//				var res = 
					sheet1.DoSearch("./WHM_WHM_0002GS.clt" , params);
				
//				sheet1.LoadSearchData(res);
			},100);
				
			//}			
			
			break;
		case "MODIFY":
			if(!ValidateForm()){
				//doHideProcess();
				return;
			};			
			doSave();
			
			break;
		case "NEW":
			parent.parent.mkNewFrame('Warehouse Entry', './WHM_WHM_0001.clt');
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
		case "btn_Excel":
			if(sheet1.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			
    			sheet1.Down2Excel( {HiddenColumn:1, CheckBoxOffValue:" ",CheckBoxOnValue:"Y" , SheetDesign:1,Merge:1 });
    		}
			break;
		case "btn_Clear":
			formObj.TxtCond.value = "";
			formObj.cbxCond.value = 0;
			formObj.cbxUse.value = 0;
			//sheet1.RemoveAll();
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

function validateCond(evt) {
	var formObj = document.frm1;
	  var theEvent = evt || window.event;
	  
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[A-Za-z]/;
	  
	  if( formObj.cbxCond.value == "0" && (!regex.test(key) || formObj.TxtCond.value.length == 5) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
}

function cbxCond_OnChange(){
	var formObj = document.frm1;
	formObj.TxtCond.value = "";
}



function ValidateForm(){
	var formObj = document.frm1;
}

function sheet1_OnSearchEnd(){
	var formObj = document.frm1;
	//doHideProcess();
	sheet1.HideProcessDlg
}

function sheet1_OnSearchEnd(){
	for(var i=1; i <= sheet1.LastRow(); i++){
		sheet1.SetCellValue(i,"addr",htmlDecode(sheet1.GetCellValue(i,"addr")));
	}
}

function sheet1_OnDblClick(sheetObj,Row,Col){	
	var formObj = document.frm1;
	var paramStr="./WHM_WHM_0001.clt?wh_cd="+sheet1.GetCellValue(Row, "code");
   	//parent.mkNewFrame('Warehouse Entry', paramStr);
   	parent.mkNewFrame('Warehouse Entry', paramStr, "WHM_WHM_0001_SHEET_" +sheetObj.GetCellValue(Row, "code")); 
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
	resizeSheet();
	
	doWork('SEARCH');
	//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), sheetObjects[0], false,"fnRestoreGridSetEnd"); 
}
//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
function fnRestoreGridSetEnd(){
	
}	
function getPageURL() {
	return document.getElementById("pageurl").value;
}

//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
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
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
function initSheet(sheetObj,sheetNo,flag) {
	var formObj = document.frm1;
    switch(sheetObj.id) {
        case "sheet1":
            with (sheetObj) {
                var HeadTitle = "|Code|Name|Alias|Address|City|State|TEL|FAX";
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, ColResize:1 } );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:HeadTitle, Align:"Center"} ];
                InitHeaders(headers, info);                

                var cols = [{Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                            {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"code",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"name",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"alias",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:290,  Align:"Left",    ColMerge:0,   SaveName:"addr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"city",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"state",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"tel",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                       		{Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                       		
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
                
                //#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
		        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		           
                SetSheetHeight(500); 
                resizeSheet();
                //SetSheetWidth(1050);
        	}
            break;
    }
}

function setDocumentObject(sheet_obj){
	var formObj = document.frm1;
	sheetObjects[sheetCnt++]=sheet_obj;
}

function resizeSheet(){
	 ComResizeSheet(sheetObjects[0]);
	}
