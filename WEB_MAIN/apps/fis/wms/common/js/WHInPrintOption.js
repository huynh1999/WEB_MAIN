/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInPrintOption.js
*@FileTitle  : 
*@author     : kiet.tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--*/

var comboObjects=new Array();
var comboCnt=0;
function loadPage() {
	var formObj=document.form;	
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }		
	// Print Size 세션값 세팅
//	var paper_size=ComGetObjValue(formObj.paper_size);	
//	if (!ComIsNull(paper_size)) {
//		//comboObjects[0].SetSelectCode(paper_size);
//		formObj.print_size_tp.value = formObj.paper_size.value;
//	}	
}
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	    var formObj=document.form;
	    switch(srcName) {
	   	 	case "CLOSE":
	   	 		ComClosePopup();
	   	 	break;	
	   	 	/* jsjang 2013.7.16 요구 # 14719 [IMPEX]Trade Partner List/Entry 에 Copy 기능 추가 End */
	        case 'PRINT':
	        	var formObj=document.form;
	        	var fileName = "";
	        	var param= "";
	        	
	        	formObj.title.value="Inbooking Print";
	        	
	        	if(!$('input[name="chOption1"]').is(":checked") &&  !$('input[name="chOption2"]').is(":checked") && !$('input[name="chOption3"]').is(":checked"))
	        	{
	        		ComShowCodeMessage("COM0122", "print Option");
	        		return;
	        	}
	        	//--프린트 생성
	        	//var print_size_tp= formObj.print_size_tp.value;
	        	//if (print_size_tp == "LT") {
	        		//alert("Letter=" + print_size_tp);		
	        		//Booking Sheet
//	        		if($('input[name="chOption1"]').is(":checked")) 
//	        		{
//	        			fileName += '^@@^' +'WH_IN_BK_LT.mrd' ;
//	        			param += "^@@^" + "[" + formObj.wib_bk_no.value + "]"; //파라메타 입력
//	        		}
//	        		//Inspection Sheet
//	        		if($('input[name="chOption2"]').is(":checked")) 
//	        		{
//	        			fileName += "^@@^" +'WH_IN_WORK_LT.mrd' ;
//	        			param += "^@@^" +"[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
//	        		}
//	        		//Work Sheet
//	        		if($('input[name="chOption3"]').is(":checked")) 
//	        		{
//	        			fileName += "^@@^" +'WH_IN_INSPECT_LT.mrd' ;
//	        			param += "^@@^" +"[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
//	        		}
//	        	} else if (print_size_tp == "A4") {
	        		//alert("A4=" + print_size_tp);
	        		//Booking Sheet
	        		if($('input[name="chOption1"]').is(":checked")) 
	        		{
	        			fileName += "^@@^" +'WH_IN_BK.mrd' ;
	        			param += "^@@^" +"[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
	        		}
	        		//Inspection Sheet
	        		if($('input[name="chOption2"]').is(":checked")) 
	        		{
	        			fileName += "^@@^" +'WH_IN_WORK.mrd' ;
	        			param +="^@@^" + "[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
	        		}
	        		//Work Sheet
	        		if($('input[name="chOption3"]').is(":checked")) 
	        		{
	        			fileName +="^@@^" + 'WH_IN_INSPECT.mrd' ;
	        			param += "^@@^" +"[" + formObj.wib_bk_no.value + "]" ; //파라메타 입력
	        		}
	        	//}
	        	fileName = fileName.substring(4);
	        	param = param.substring(4);
	        	formObj.file_name.value= fileName;
	        	formObj.rd_param.value=param;
	        	popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
			break;
	}
}
/*
 * Close
 */
function btn_Close(){
  ComClosePopup(); 
}
