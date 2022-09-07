/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MCLPChangePopup.js
*@FileTitle  : CLP Move to another CLP Creation No
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/03/18
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var firCalFlag=false;
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	initControl();
}
//document.onblur=form_deactivate;
document.onkeydown=obj_keydown;
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	//? axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    //? axon_event.addListenerForm('blur', 	'form_deactivate', formObject);
    //? axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('MCLPChangePopup_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"pc_mrno",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"pc_sono",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pol",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pod",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
		             {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"etd",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
		             {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"eta",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(300);
		      SetEditable(1);
		      resizeSheet();
		      break;
	      }
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}


function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_cntr_no" :
				var sUrl="./ContractRoutePopup.clt?cntr_no="+formObj.cntr_no.value;
   	   			callBackFunc = "setCntrNoInfo";
   	   			modal_center_open(sUrl, callBackFunc, 820,600,"no");
				break;
			case "btn_so_no":
				var sUrl="./ServiceOrderPopup.clt?so_no="+formObj.so_no.value;
   	   			callBackFunc = "setSoNoInfo";
   	   			modal_center_open(sUrl, callBackFunc, 1100,570,"no");
				break;
			case "btn_pol":
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]="";
				var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+formObj.pol.value;
   	   			callBackFunc = "setPolLocInfo";
   	   			modal_center_open(sUrl, rtnary, 900, 450,"yes");
				break;
			case "btn_pod":
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]= "";
				rtnary[2]=formObj.pod_nm.value;
				var sUrl="./CMM_POP_0030.clt?loc_cd="+formObj.pod.value+"&loc_nm="+formObj.pod_nm.value+"&clear_flg=Y";
   	   			callBackFunc = "setPodLocInfo";
   	   			modal_center_open(sUrl, rtnary, 900, 450,"yes");
				break;
			case "btn_to_pol_etd":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
				cal.select(formObj.fm_pol_etd, formObj.to_pol_etd, 'MM-dd-yyyy');
				break;
			case "btn_to_pod_eta":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
				cal.select(formObj.fm_pod_eta, formObj.to_pod_eta, 'MM-dd-yyyy');
				break;
			case "SEARCHLIST":	
				sheet1.RemoveAll();
				btn_Search();
				break;
			case "btn_ok":	
				btn_OK();
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
function setCntrNoInfo(aryPopupData){
	  var formObj=document.form;
	  if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	   return;
	  }else{
			//ComSetObjValue(formObj.cntr_no,    aryPopupData[0][0]);
		  var rtnValAry=aryPopupData.split("|");
		   formObj.cntr_no.value=rtnValAry[0];
	  }
}
function setSoNoInfo(aryPopupData)
{
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		//setFieldValue(formObj.so_no,    aryPopupData[0][1]);
		  var rtnValAry=aryPopupData.split("|");
		   formObj.so_no.value=rtnValAry[0];
	}
}
function setPolLocInfo(aryPopupData){
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.pol.value=rtnValAry[0];
		   formObj.pol_nm.value=rtnValAry[2];
	}
}
function setPodLocInfo(aryPopupData){
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
	  var rtnValAry=aryPopupData.split("|");
	   formObj.pod.value=rtnValAry[0];
	   formObj.pod_nm.value=rtnValAry[2];
	   formObj.pod_old.value=rtnValAry[0];
	   formObj.pod_nm_old.value=rtnValAry[2];
	}
}
/*
 * 팝업 관련 로직 끝
 */
/*
 * 버튼 관련 로직
 */
function btn_Search()
{
	var formObj=document.form;
	if (validateForm(docObjects[0],formObj,'Search')) {
		formObj.f_cmd.value=SEARCH;
 		docObjects[0].DoSearch("./MCLPChangePopupGS.clt", FormQueryString(formObj,""));
	}
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Search':
			if (ComIsEmpty(formObj.so_no)&&ComIsEmpty(formObj.hbl_no)&&ComIsEmpty(formObj.mclp_no)&&ComIsEmpty(formObj.clp_no)) {					
				if(ComIsEmpty(formObj.cntr_no)&&ComIsEmpty(formObj.fm_pol_etd)&&ComIsEmpty(formObj.to_pol_etd)&&
				   ComIsEmpty(formObj.fm_pod_eta)&&ComIsEmpty(formObj.to_pod_eta)){
					ComShowCodeMessage("COM0213","ETD, ETA","Service Order No, House B/L No, MCLP No, CLP No, Container No");
					formObj.fm_pol_etd.focus();
					return false;
				}
				/*******************************************************************/
				if(!ComIsEmpty(formObj.fm_pol_etd) && ComIsEmpty(formObj.to_pol_etd)){
					formObj.to_pol_etd.value=ComGetNowInfo();
				}
				if ( ComIsEmpty(formObj.fm_pol_etd) || !isDate(formObj.fm_pol_etd)) {
					ComShowCodeMessage("COM0114","ETD!");
					formObj.fm_pol_etd.focus();
					return false;
				}
				if ( ComIsEmpty(formObj.to_pol_etd) || !isDate(formObj.to_pol_etd)) {
					ComShowCodeMessage("COM0114","ETD!");
					formObj.to_pol_etd.focus();
					return false;
				}	
				/*******************************************************************/
				if(!ComIsEmpty(formObj.fm_pod_eta) && ComIsEmpty(formObj.to_pod_eta)){
					formObj.to_pod_eta.value=ComGetNowInfo();
				}
				if ( ComIsEmpty(formObj.fm_pod_eta) || !isDate(formObj.fm_pod_eta)) {
					ComShowCodeMessage("COM0114","ETA!");
					formObj.fm_pod_eta.focus();
					return false;
				}
				if ( ComIsEmpty(formObj.to_pod_eta) || !isDate(formObj.to_pod_eta)) {
					ComShowCodeMessage("COM0114","ETA!");
					formObj.to_pod_eta.focus();
					return false;
				}
				/*******************************************************************/
			}
			if (getDaysBetween2(formObj.fm_pol_etd.value, formObj.to_pol_etd.value)<0) {
				ComShowCodeMessage("COM0122","ETD!");
				formObj.fm_pol_etd.focus();
				return false;
			}
			if (getDaysBetween2(formObj.fm_pod_eta.value, formObj.to_pod_eta.value)<0) {
				ComShowCodeMessage("COM0122","ETA!");
				formObj.fm_pod_eta.focus();
				return false;
			}		
			break;
//		case 'pol':
//			if( ComIsEmpty(formObj.pol_nm) || formObj.pol_nm.value == "" ){
//				ComShowCodeMessage("COM0114","POL");
//				formObj.pol.value="";
//				formObj.pol_old.value="";
//				formObj.pol.focus();
//				return false;
//			}			
//			break;
//		case 'pod':
//			if( ComIsEmpty(formObj.pod_nm) || formObj.pod_nm.value == "" ){
//				ComShowCodeMessage("COM0114","POD");
//				formObj.pod.value="";
//				formObj.pod_old.value="";
//				formObj.pod.focus();
//				return false;
//			}			
//			break;
		}
	}
	return true;
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if(srcName == "pol"){
		if( formObj.pol_old.value != srcValue){
			formObj.pol_old.value=srcValue;
			if (!ComIsNull(srcValue)){
				searchLocNm("pol");
			} else {
				formObj.pol_nm.value="";
				formObj.pol_nm_old.value="";
			}
		}
	} else if(srcName == "pol_nm"){
		if( formObj.pol_nm_old.value != srcValue){
			formObj.pol_nm_old.value=srcValue;
			if (!ComIsNull(srcValue)){
				formObj.pol.value="";
				formObj.pol_old.value="";
			}
		}
	} else if(srcName == "pod"){
		if( formObj.pod_old.value != srcValue){
			formObj.pod_old.value=srcValue;
			if (!ComIsNull(srcValue)){
				searchLocNm("pod");
			} else {
				formObj.pod_nm.value="";
				formObj.pod_nm_old.value="";
			}
		}
	} else if(srcName == "pod_nm"){
		if( formObj.pod_nm_old.value != srcValue){
			formObj.pod_nm_old.value=srcValue;
			if (!ComIsNull(srcValue)){
				formObj.pod.value="";
				formObj.pod_old.value="";
			}
		}
	} 
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "hbl_no":
			case "so_no":
			case "mclp_no":
			case "clp_no":
				btn_Search();
				break;
			case "pol":
				if( formObj.pol_old.value != srcValue){
					formObj.pol_old.value=srcValue;
					if (!ComIsNull(srcValue)){
						searchLocNm("pol");
					} else {
						formObj.pol_nm.value="";
						formObj.pol_nm_old.value="";
					}
				}
				break;
			case "pol_nm":	
   	   			callBackFunc = "setPolLocInfo";
   	   			modal_center_open('./CMM_POP_0030.clt?type=P&loc_cd='+formObj.pol.value, setPolLocInfo, 900,700,"no");
				break;
			case "pod":
				if( formObj.pod_old.value != srcValue){
					formObj.pod_old.value=srcValue;
					if (!ComIsNull(srcValue)){
						searchLocNm("pod");
					} else {
						formObj.pod_nm.value="";
						formObj.pod_nm_old.value="";
					}
				}
				break;
			case "pod_nm":	
						formObj.pod.value="";
						formObj.pod_old.value="";
		   	   			callBackFunc = "setPodLocInfo";
		   	   			modal_center_open('./CMM_POP_0030.clt?loc_cd='+formObj.pod.value+"&loc_nm="+formObj.pod_nm.value+"&clear_flg=Y", setPodLocInfo, 900,700,"yes");

				break;
			}
	}
	return true;
}
function searchLocNm(col_nm){
	var formObj=document.form;
	if( formObj.search_flg.value == "N"){
		formObj.search_flg.value='Y';
 		if(col_nm == "pol"){
 			if(ComIsEmpty(formObj.pol.value) || formObj.pol.value == "" ){
				   formObj.search_flg.value='N';
			}else{
				ajaxSendPost(resultLocInfoForPol, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.pol.value.toUpperCase(), './GateServlet.gsl');

			}
		} else if(col_nm == "pod"){
 			if(ComIsEmpty(formObj.pod.value) || formObj.pod.value == "" ){
 				   formObj.search_flg.value='N';
 			}else{
 				ajaxSendPost(resultLocInfoForPod, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.pod.value.toUpperCase(), './GateServlet.gsl');
 			}
		}
		validateForm(docObjects[0],formObj,col_nm);
	}
}
function resultLocInfoForPol(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   formObj.pol_nm.value=rtnArr[0];
		   formObj.pol_nm_old.value=rtnArr[0];
	   }
	   else{
		   formObj.pol.value="";
		   formObj.pol_nm.value="";
		   ComShowCodeMessage("COM0114","POL");
		   formObj.pol.focus();
	   }
	  }
	  else{
		  formObj.pol.value="";
		  formObj.pol_nm.value=""; 
		  ComShowCodeMessage("COM0114","POL");
		  formObj.pol.focus();
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
   formObj.search_flg.value='N';
}
function resultLocInfoForPod(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   formObj.pod_nm.value=rtnArr[0];
		   formObj.pod_nm_old.value=rtnArr[0];
	   }
	   else{
		   formObj.pod.value="";
		   formObj.pod_nm.value=""; 
		   ComShowCodeMessage("COM0114","POD");
		   formObj.pod.focus();
	   }
	  }
	  else{
		  formObj.pod.value="";
		  formObj.pod_nm.value=""; 
		  ComShowCodeMessage("COM0114","POD");
		  formObj.pod.focus();

	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
   formObj.search_flg.value='N';
}

function btn_OK()
{
	if(sheet1.RowCount() < 1){
		ComShowMessage("No data to select!");
	}else{
		var retArray=new Array();
		//0-9
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "pc_mrno");               
		retArray += "|";                                                                                   
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "hbl_no");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "pc_sono");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "pol");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "pod");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "etd");               
		retArray += "|";
		retArray += sheet1.GetCellValue(sheet1.GetSelectRow(), "eta");               
		retArray += "|";
		ComClosePopup(retArray); 
	}
}
function btn_Close()
{
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	btn_OK();
}
