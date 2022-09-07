/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : oms_print_001.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2015/03/31
=========================================================*/
var rdObjects=new Array(); 
var rdCnt=0;
var queryStr="";
document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_close":	
				ComClosePopup();
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
function loadPage() {
	//RD
	initRdConfig(rdObjects[0]);
	rdOpen(rdObjects[0], document.form);
}
function initRdConfig(rdObject){
    var Rdviewer=rdObject ;
	Rdviewer.AutoAdjust=true;
	Rdviewer.ViewShowMode(0);
	Rdviewer.SetBackgroundColor(128,128,128);
	Rdviewer.SetPageLineColor(128,128,128);
	Rdviewer.ApplyLicense("0.0.0.0");
}
function rdOpen(rdObject,formObject){
	var Rdviewer=rdObject ;
	//var rdParam = '/rp ['+queryStr+']';
	var rdParam=formObject.param.value;
	var path=formObject.mrd.value;
	// 열고자 하는 RD 파일을 지정한다.
    Rdviewer.FileOpen(RD_path+path, RDServer +" "+ rdParam);
}