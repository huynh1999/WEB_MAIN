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
var count=0;
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
	        	if(formObj.fm_date.value == "" || formObj.to_date.value == ""){
	        		ComShowCodeMessage('COM130403', '[Date]');
	        		if (formObj.fm_date.value == "" ){
	        			formObj.fm_date.focus();
	        			break;
	        		}else if (formObj.to_date.value == ""){
	        			formObj.to_date.focus();
	        			break;
					}
	        	}
	        	var param = "";
				param += "wh_cd=" + formObj.wh_cd.value;
				param += "&cust_id=" + formObj.cust_cd.value;
				param += "&fm_date=" + convDate(formObj.fm_date.value);
				param += "&to_date=" + convDate(formObj.to_date.value);
				ajaxSendPost(countDate_result, "reqVal", '&goWhere=aj&bcKey=countDate&'+ param, './GateServlet.gsl');
				
	        	var flag = false;
	        	var flag_1_page = false;
	        	if (count <= 23){
	        		flag_1_page = true;
	        	}else {
	        		flag_1_page = false;
				}
	        	
	        	if (flag_1_page){
	        		if (count <= 17 || count == 23){
	        			flag = false;// not add 1 blank page
	        		}else {
	        			flag = true;// add 1 blank page
					}
	        	}else {
	        		while (count > 51){
        				count = count - 29;
        			}
	        		if (count <= 45 || count == 51){
	        			flag = false;// not add 1 blank page
	        		}else {
	        			flag = true;// add 1 blank page
					}
				}
	        	        	
	        	var formObj=document.form;
	        	var fileName = "";
	        	var param= "";
	        	if (!flag){
	        		formObj.title.value="Storage Charge";
	        		fileName += 'storage_charge.mrd' ;
	        		param += "[" + convDate(formObj.fm_date.value) + "]" ;
	        		param += "[" + convDate(formObj.to_date.value) + "]" ;
	        		param += "[" + formObj.wh_nm.value + "]" ;
	        		param += "[" + formObj.cust_nm.value + "]" ;
	        		param += "[" + formObj.cust_cd.value + "]" ;
	        		param += "[" + formObj.wh_cd.value + "]" ;
	        		param += "[" + formObj.ofc_cd.value + "]" ;
	        		param += "[" + formObj.rmk.value + "]" ;
	        		//iif(getparam("$11") != "", loadimage(getparam("$11")&logo1), loadimage("./mrd_view.jsp?mrd_view="&logo1))
//	        	fileName = fileName.substring(4);
//	        	param = param.substring(4);
	        		formObj.file_name.value= fileName;
	        		formObj.rd_param.value=param;
	        		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	        	}else {
	        		flag = false;
	        		formObj.title.value="Storage Charge";
	        		fileName += 'storage_charge1.mrd' ;
	        		param += "[" + convDate(formObj.fm_date.value) + "]" ;
	        		param += "[" + convDate(formObj.to_date.value) + "]" ;
	        		param += "[" + formObj.wh_nm.value + "]" ;
	        		param += "[" + formObj.cust_nm.value + "]" ;
	        		param += "[" + formObj.cust_cd.value + "]" ;
	        		param += "[" + formObj.wh_cd.value + "]" ;
	        		param += "[" + formObj.ofc_cd.value + "]" ;
	        		param += "[" + formObj.rmk.value + "]" ;
	        		//iif(getparam("$11") != "", loadimage(getparam("$11")&logo1), loadimage("./mrd_view.jsp?mrd_view="&logo1))
//	        	fileName = fileName.substring(4);
//	        	param = param.substring(4);
	        		formObj.file_name.value= fileName;
	        		formObj.rd_param.value=param;
	        		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
			break;
	}
}
/*
 * Close
 */
function btn_Close(){
  ComClosePopup(); 
}
var firCalFlag=false;
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.fm_date,  formObj.to_date, 'MM-dd-yyyy');
        break;
    }
}

function convDate(date) {
	if (date != 0){
		var rtn = date.substr(6,4) + date.substr(0,2) + date.substr(3,2);
		return rtn;
	}else {
		return date;
	}
}

function countDays(start, end) {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	
	var firstDate = new Date(start.substr(6,4),start.substr(0,2),start.substr(3,2));
	var secondDate = new Date(end.substr(6,4),end.substr(0,2),end.substr(3,2));

	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	return diffDays;
}

function countDate_result(reqVal){
	var frm1=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			count = doc[1];
		}else{
			count = 0;	
		}
	}else{
		count = 0;
	}
}