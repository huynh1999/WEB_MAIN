var sheetObjects=new Array();
var sheetCnt=0;
function loadPage() {
}
function doWork(srcName){
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "btn_OK":	
				btn_OK();
				break;
			case "CLOSE":	
				btn_Close();
    } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
function btn_OK() {
	var formObj=document.form;
	var rate_type = ComGetObjValue(formObj.rate_type);
	var frt_mode = ComGetObjValue(formObj.frt_mode);
	/*var filePath="/sitectx/DocUp/HJLOMS/DOWN_TEMPLETE/";
	var fileName="";
	if ( rate_type == "S" ){
		if ( frt_mode == "S" ){
			fileName="RATE_SELLING_SEA_TEMPLETE.xls";
		} else if ( frt_mode == "A" ){
			fileName="RATE_SELLING_AIR_TEMPLETE.xls";
		} else if ( frt_mode == "D" ){
			fileName="RATE_SELLING_DOM_TEMPLETE.xls";
		}
	} else {
		if ( frt_mode == "S" ){
			fileName="RATE_BUYING_SEA_TEMPLETE.xls";
		} else if ( frt_mode == "A" ){
			fileName="RATE_BUYING_AIR_TEMPLETE.xls";
		} else if ( frt_mode == "D" ){
			fileName="RATE_BUYING_DOM_TEMPLETE.xls";
		}
	}
	ComSetObjValue(formObj.downloadLocation,  filePath+fileName);
	ComSetObjValue(formObj.downloadFileName, fileName);
	formObj.submit();*/
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	opener.downloadTemplate(rate_type, frt_mode);
  ComClosePopup(); 
}
function btn_Close(){
	ComClosePopup(); 
}
