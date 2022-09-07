/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICPrintOption.js
*@FileTitle  : Print Option
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================*/
//var rtnary=new Array(2);
//var callBackFunc = "";

//comboObjects
/*
 * Combo Object를 배열로 등록
 */    
function loadPage() {
	//IBMultiCombo초기화
    //print size default value selected
	//control
	initControl();
}
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
function initControl() {
	 axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
//function processButtonClick(){
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "PRINT":	
				btn_Print();
				break;
			case "CLOSE":	
				btn_Close();
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
/*
 * Close
 */
function btn_Close(){
  ComClosePopup(); 
}
/*
 * Print
 */
function btn_Print(){
	var formObj=document.form;
	var fileName = "";
	var param= "";
	
	formObj.title.value="Inbound Complete Print";
	
	if(!$('input[name="chOption1"]').is(":checked") &&  !$('input[name="chOption2"]').is(":checked") && !$('input[name="chOption3"]').is(":checked"))
	{
		ComShowCodeMessage("COM0122", "print Option");
		return;
	}
	//--프린트 생성
	
	//Putaway Work Sheet
	if($('input[name="chOption1"]').is(":checked")) 
	{
		fileName += "^@@^" + 'WH_IN_PUTAWAY.mrd';
		param +="^@@^" + '['  + formObj.wib_bk_no.value + "]";	// [1]
		param += '[' + formObj.wib_in_no.value + "]";
	}
	//Pallet Label
	if($('input[name="chOption2"]').is(":checked")) 
	{
		fileName += "^@@^" + 'WH_IN_PALLET_LABEL.mrd';
		param += "^@@^" + '['  + formObj.wib_bk_no.value + "]";	// [1]
		param += '[' + formObj.wib_in_no.value + "]" ;
	}
	//os&d
	if($('input[name="chOption3"]').is(":checked")) 
	{
		fileName += "^@@^" + 'WH_IN_OSD.mrd';
		param += "^@@^" +'['  + formObj.wib_bk_no.value + "]";	// [1]
		param += '[' + formObj.wib_in_no.value + "]";
	}
	
	formObj.file_name.value= fileName.substring(4);
	formObj.rd_param.value=param.substring(4);
	popPOST(form, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
}