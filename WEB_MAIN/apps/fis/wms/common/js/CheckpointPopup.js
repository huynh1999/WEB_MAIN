//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;

var okFlag="N";
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	var arg=opener.rtnary;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
    initControl();
    formObj.code.value=(arg[0] == undefined || arg[0] == 'undefined') ? '' : arg[0];
    btn_Search();
}
/** 
 * initControl()
 */ 
function initControl() {
	
	var formObj=document.form;
	
	var selecthtml = '';
	
	vTextSplit=codeText.split("|");
	vCodeSplit=codeCode.split("|");				

	for(var j=0;j<vCodeSplit.length; j++){
		if(vCodeSplit[j] != ""){
			selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
		}
	}
	
	$('#code').html(selecthtml);
	
	$('#code option[value=' + formObj.f_req_svc_cd.value + ']').attr('selected','selected');
	
//	formObj.code.value = formObj.f_req_svc_cd.value;
	formObj.code.disabled = true;
	
}
/**
 * Quick Search
 */
/*function enter_Check(){
	var keyValue=event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	//var srcName = event.srcElement.getAttribute("name");
	if(keyValue == "13"){
		btn_Search();
	}
}*/
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}
 
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			 with(sheetObj){

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('CheckpointPopup_HDR1'), Align:"Center"} ];		   

	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:0,   SaveName:"name",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(350);
	      SetEditable(0);
	      resizeSheet()
	            }
	      break;

	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
 
function doWork(srcName){
	var sheetObject1=docObjects[0];   //t1sheet1
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST" :
				btn_Search();
				break;
			case "CLOSE" :	
				btn_Close();
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
function btn_Search() {
	var formObj=document.form;
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
 	docObjects[0].DoSearch("./CheckpointPopupGS.clt", FormQueryString(formObj,null, ""));
	//sheetObjects[0].LoadSearchData(sXml,{Sync:1} );
}
function btn_Close(){
  ComClosePopup(); 
}
function btn_OK() {
//	comPopupOK();
	okFlag="Y";
  ComClosePopup(getData()); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	ComClosePopup(getData());
}
function getData(){
	var retArray="";
	retArray += sheet1.GetCellValue(sheet1.GetSelectRow(),"name");
	return retArray;
}
