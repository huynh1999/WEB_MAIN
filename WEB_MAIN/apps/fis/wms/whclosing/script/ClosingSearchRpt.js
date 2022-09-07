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
var rtnary=new Array(1);
function loadPage() {
	var formObj=document.form;	
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }		
    
    loadComboWarehouse();
    loadComboType();
    loadComboStatus();
    
    formObj.wh_combo.value = formObj.wh_cd.value;
    formObj.sb_cls_cd.value = formObj.sb_cd.value;
    formObj.rate_tp_cd.value = formObj.tp_cd.value;
    formObj.sts_cd.value = formObj.st_cd.value;
}

var callBackFunc = "";
function doWork(srcName){
	    var formObj=document.form;
	    switch(srcName) {
	   	 	case "CLOSE":
	   	 		ComClosePopup();
	   	 	break;
	   	 	case "btn_ofc_cd":
	   	 		OfficePopup();
	   	 	break;
	   	 	case "btn_ctrt_no":
	   	 		CtrtPopup();
	   	 	break;
			case "btn_cust_cd" :	
				CustomerPopup();
			break;
			case "btn_fm_cls_date":	
				var cal=new ComCalendar();
//				cal.setDisplayType('month');
				cal.select(formObj.fm_cls_date, 'MM-yyyy');
			break;
			case "btn_to_cls_date":	
				var cal=new ComCalendar();
//				cal.setDisplayType('month');
	            cal.select(formObj.to_cls_date, 'MM-yyyy');
			break;
	        case 'PRINT':
	        	btn_print();
	        break;
	}
}
/*
 * Close
 */
function btn_Close(){
  ComClosePopup(); 
}

/*
 * 팝업 관련 로직 시작
 */
function OfficePopup(){
	var formObj=document.form;
	
	rtnary=new Array(2);
	rtnary[0]="1";
	sUrl="./CMM_POP_0150.clt?";
	
	callBackFunc = "setOffice";
	modal_center_open(sUrl, rtnary, 556,600,"yes");
	
//    modal_center_open('./CMM_POP_0050.clt', callBackFunc, 900,620,"yes");
}

function setOffice(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("|");
		   formObj.ofc_cd.value=rtnValAry[0];
		   formObj.ofc_nm.value=rtnValAry[1];
	  }
}

function CtrtPopup(){
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?ctrt_no=' + formObj.ctrt_no.value + "&ctrt_nm="+formObj.ctrt_nm.value, callBackFunc, 900, 580,"yes");
}

function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];//full_nm
		   formObj.ctrt_nm.value=rtnValAry[1];//full_nm
	   } 	
}

function CustomerPopup(){
	var formObj=document.form;
	rtnary=new Array(2);
	rtnary[0]="";
	rtnary[1]=formObj.cust_nm.value;
	rtnary[2]=window;
	callBackFunc = "setServiceProvider";
    modal_center_open('./CMM_POP_0010.clt',rtnary, 1150,650,"yes");
}

function setServiceProvider(rtnVal){
	 var formObj=document.form;
	  if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	  }else{
		  var rtnValAry=rtnVal.split("||");
		   formObj.cust_cd.value=rtnValAry[0];//full_nm
		   formObj.cust_nm.value=rtnValAry[1];//full_nm
	  }
}

/*
 * 팝업 관련 로직 종료
 */


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
/*
 * 초기화 시작
 */
function loadComboWarehouse(){
	var obj = document.getElementById("wh_combo");
	var option =  document.createElement("option");
	
	option.text = "";
	option.value = "";
	obj.add(option);
	
	var wh_combo_cd = wh_comboCode.split('|');
	var wh_combo_nm = wh_comboText.split('|');
	
	for(var i = 0; i < wh_combo_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(wh_combo_nm[i]);
		option.value = htmlDecode(wh_combo_cd[i]);
		obj.add(option);
	}
}

function loadComboType(){
	var obj = document.getElementById("rate_tp_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var rate_tp_cd_cd = rate_tp_cdCode.split('|');
	var rate_tp_cd_nm = rate_tp_cdText.split('|');
	
	for(var i = 0; i < rate_tp_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(rate_tp_cd_nm[i]);
		option.value = htmlDecode(rate_tp_cd_cd[i]);
		
		obj.add(option);
	}
}
function loadComboStatus(){
	var obj = document.getElementById("sts_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "ALL";
	
	obj.add(option);
	
	var sts_cd_cd = sts_cdCode.split('|');
	var sts_cd_nm = sts_cdText.split('|');
	
	for(var i = 0; i < sts_cd_cd.length-1; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(sts_cd_nm[i]);
		option.value = htmlDecode(sts_cd_cd[i]);
		
		obj.add(option);
	}
}

/*
 * 초기화 종료
 */

function btn_print(){
	var formObj = document.form;
	var param = "";
	var fm_date = formObj.fm_cls_date.value;
	var fm_date_sp = fm_date.split("-");
	var to_date = formObj.to_cls_date.value;
	var to_date_sp = to_date.split("-");
	
	var rateTpCd = "";
	if(formObj.rate_tp_cd.value != "ALL"){
		rateTpCd = formObj.rate_tp_cd.value;
	}
	
	var stsCd = "";
	if(formObj.sts_cd.value != "ALL"){
		stsCd = formObj.sts_cd.value;
	}

	var sbClsCd = "";
	if(formObj.sb_cls_cd.value != "ALL"){
		sbClsCd = formObj.sb_cls_cd.value;
	}

	param += "[" + formObj.wh_combo.value + "]" ;
	param += "[" + formObj.ctrt_no.value + "]" ;
	param += "[" + formObj.rmk.value + "]" ;
	param += "[" + fm_date_sp[1] + fm_date_sp[0] + "]" ;
	param += "[" + to_date_sp[1] + to_date_sp[0] + "]" ;
	param += "[" + formObj.ofc_cd.value + "]";
	param += "[" + formObj.cust_cd.value + "]";
	param += "[" + formObj.closing_no.value + "]";
	param += "[" + sbClsCd + "]";
	param += "[" + rateTpCd + "]";
	param += "[" + stsCd + "]";
	
	formObj.file_name.value= 'closing_search.mrd';
	formObj.title.value="Closing List";
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
}