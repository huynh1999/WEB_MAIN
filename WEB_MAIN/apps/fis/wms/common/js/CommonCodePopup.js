var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
function doWork(srcName){
	var sheetObject1=docObjects[0];             
	var formObject=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST":
				getData();
				break;		
			case "CLOSE":   
				ComClosePopup();
				break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			alert(e);
		}
	}
}
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	var formObj = document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
    /*for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }*/	
    //initControl();
	if(formObj.pram_grp_cd.value != ""){
		formObj.grp_cd.value = formObj.pram_grp_cd.value;
	}
    formObj.grp_cd.disabled = true;
    getData();
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
  //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
			
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('CommonCodePopup_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"grpCd" },
				             {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"codeCd" },
				             {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"codeNm" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm1" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm2" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm3" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm4" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm5" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm6" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm7" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm8" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm9" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"optItm10" },
				             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"codeCdNm" } ];
				 
				InitColumns(cols);
				SetEditable(0);
				SetSheetHeight(320);
				resizeSheet();

		   }                                                      
		break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function getData() {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	
	formObj.f_cmd.value = SEARCH;
	
	var param = "?c_desc=" + encodeURIComponent(formObj.c_desc.value.replace(/[%#]/g, "@good@"));
	
	sheet1.DoSearch("./CommonCodePopupGS.clt" + param,FormQueryString(formObj));
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "grpCd"); //0
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "codeCd");//1
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "codeNm");//2
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm1");//3
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm2");//4
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm3");//5
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm4");//6
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm5");//7
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm6");//8
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm7");//9
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm8");//10
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm9");//11
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "optItm10");//12
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "codeCdNm");//13
	ComClosePopup(rtnVal);
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