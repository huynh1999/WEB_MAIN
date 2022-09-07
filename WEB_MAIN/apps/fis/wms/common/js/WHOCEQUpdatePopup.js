/*--=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : WHOCEQUpdatePopup.js
 *@FileTitle  : Container/Truck Update
 *@author     : TanPham - DOU Network
 *@version    : 1.0
 *@since      : 2015/04/22
 =========================================================--*/	 
var docObjects=new Array();
var rtnary=new Array(2);
var sheetCnt=0;

/**
* Sheet  onLoad
*/
function loadPage() {
    initControl();
    var formObj=document.form;
    for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
    
    if ($("#req_div").val() == "lp" )
	{
    	//lp_no
    	$("#lp_no").val($("#req_lp_no").val());
    	//type disabled처리
    	formObj.eq_tpsz_cd.disabled  = true;
    	//ComEnableButton("btn_eq_tpsz_cd", false, 3);
    	formObj.btn_eq_tpsz_cd.disabled  = true;
	}
    else
	{
    	$("#trLpNo").hide();
	}
    //공통
    $("#eq_tpsz_cd").val($("#rep_eq_tpsz_cd").val().trim());
    if($("#rep_eq_tpsz_cd").val().trim().length > 0)
	{
    	getContainerTypeInfo();
	}
    $("#eq_no").val($("#req_eq_no").val().trim());
    //$("#eq_tp_cd").val($("#req_eq_tp_cd").val().trim());
    //gate_hm
    if($("#req_gate_in_hm").val().trim().length == 4)
    {
    	$("#gate_in_hm").val(ComGetMaskedValue(formObj.req_gate_in_hm, "hm"));
    }
    if($("#req_gate_out_hm").val().trim().length == 4)
    {
    	$("#gate_out_hm").val(ComGetMaskedValue(formObj.req_gate_out_hm, "hm"));
    }
    //SEAL NO
	var seal_no=$("#req_seal_no").val().trim().split(",");
	for(var m=0; m <seal_no.length; m++){
		$("#seal_no" + m).val(seal_no[m]);
		if(m >= 3) //seal_no는 3개가 max
		{
			break;
		}
	}
}
/** 
 * initControl()
 */ 
document.onkeydown=obj_keydown;
function initControl() {
	var formObject=document.form;
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
//    axon_event.addListenerForm("change", "obj_onchange", formObject);
}
function btn_Close(){
  ComClosePopup(); 
}
function btn_Ok(){
	var formObj=document.form;
	//type
	if(ComIsEmpty(formObj.eq_tpsz_cd.value)){
		ComShowCodeMessage("COM0114","Type");
		formObj.eq_tpsz_cd.focus();
		return ;
	}
	if(ComGetLenByByte($("#eq_no").val().trim()) > 20){
		ComShowCodeMessage("COM0215", "CNTR/TR No[20]");
		$("#eq_no").focus();
		return;
	}
	//seal no (,)으로 merge
	var seal_no_arr=new Array();
	var cnt=0;
	var seal_no="";
	if($("#seal_no0").val().trim() != "")
	{
		seal_no_arr[cnt]=$("#seal_no0").val().trim();
		cnt++;
	}
	if($("#seal_no1").val().trim() != "")
	{
		seal_no_arr[cnt]=$("#seal_no1").val().trim();
		cnt++;
	}
	if($("#seal_no2").val().trim() != "")
	{
		seal_no_arr[cnt]=$("#seal_no2").val().trim();
		cnt++;
	}
	for(var i=0; i<seal_no_arr.length; i++)
	{
		if(i == 0)
		{
			seal_no=seal_no_arr[i];
		}
		else
		{
			seal_no=seal_no + "," + seal_no_arr[i];
		}
	}
	if(ComGetLenByByte(seal_no) > 100){
		ComShowCodeMessage("COM0215", "Seal No[100]");
		$("#seal_no0").focus();
		return;
	}
	if(!opener)
	{
		opener=parent.window;
	}
	opener.setEqUpdate($("#req_div").val()
			         , $("#eq_tpsz_cd").val()
			         , $("#eq_tpsz_nm").val()
			         , $("#eq_tp_cd").val()
			         , $("#eq_no").val()
			         , seal_no
			         , $("#gate_in_hm").val()
			         , $("#gate_out_hm").val()
			         );
  ComClosePopup(); 
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_eq_tpsz_cd":
				if($("#req_div").val() == "bk")
				{
					var tp="A";
					if($("#eq_tp_cd").val().trim() != "")
					{
						tp=$("#eq_tp_cd").val();
					}
					rtnary=new Array(1);
//					rtnary[0]=formObj.type.value;
//					   rtnary[1]=formObj.eq_tpsz_cd.value;
//					   rtnary[2]=window;
					   callBackFunc = "setIbContainerTypeInfo";
//					sUrl="ContainerTypePopup.clt?type="+tp+"&eq_unit="+$("#eq_tpsz_cd").val();
//					ComOpenPopup(sUrl, 700, 600, "setIbContainerTypeInfo", "0,0" , true);
					modal_center_open('./ContainerTypePopup.clt?type='+tp+"&eq_unit="+$("#eq_tpsz_cd").val()+"&eq_unit_name="+$("#eq_tpsz_nm").val(), rtnary, 400, 590,"yes");
					
				//	ComOpenPopup(sUrl, 500, h, "setEqUpdate", "0,0", true);	
				}
			break;
			case "btn_Ok":
				btn_Ok();
				break;
			case "CLOSE":
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
/*
 * type popupedit 완료후
 */
function setIbContainerTypeInfo(rtnVal){
	var formObj=document.form;
//	$("#eq_tpsz_cd").val(aryPopupData[0][1]);
//	$("#eq_tpsz_cd_org").val(aryPopupData[0][1]);
//	$("#eq_tpsz_nm").val(aryPopupData[0][2]);
//	$("#eq_tp_cd").val(aryPopupData[0][3]);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.eq_tpsz_cd.value=rtnValAry[0];//full_nm
		   formObj.eq_tpsz_cd_org.value=rtnValAry[0];//full_nm
		   formObj.eq_tpsz_nm.value=rtnValAry[1];//full_nm
		   formObj.eq_tp_cd.value=rtnValAry[2];//full_nm
	   }
}
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "eq_tpsz_cd":	
					getContainerTypeInfo();
				break;	
			default:		
				if(!(t.readOnly)){
				}
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}
function obj_onchange() {
	var srcName=ComGetEvent("name");
	if(srcName == "eq_tpsz_cd"){
		getContainerTypeInfo();
	}
}
function getContainerTypeInfo()
{
	if($("#eq_tpsz_cd").val().trim() != "")
	{
//		var sParam="cntr_tp="+$("#eq_tpsz_cd").val().trim();
		/*$.ajax({
			url : "searchCntrTrTp.clt?"+sParam,
			success : function(result) {
				$("#eq_tpsz_cd").val(getXmlDataNullToNullString(result.xml,'eq_unit'));
				$("#eq_tpsz_cd_org").val(getXmlDataNullToNullString(result.xml,'eq_unit'));
				$("#eq_tpsz_nm").val(getXmlDataNullToNullString(result.xml,'descr'));
				$("#eq_tp_cd").val(getXmlDataNullToNullString(result.xml,'type'));	
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
			}
		});*/
//		var sXml=docObjects[0].GetSearchData("searchCntrTrTp.clt?"+sParam);
		ajaxSendPost(setCntrTrTp, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&cntr_tp='+$("#eq_tpsz_cd").val().trim(), './GateServlet.gsl');
//		$("#eq_tpsz_cd").val(getXmlDataNullToNullString(sXml,'eq_unit'));
//		$("#eq_tpsz_cd_org").val(getXmlDataNullToNullString(sXml,'eq_unit'));
//		$("#eq_tpsz_nm").val(getXmlDataNullToNullString(sXml,'descr'));
//		$("#eq_tp_cd").val(getXmlDataNullToNullString(sXml,'type'));	
//		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//		}
	}
	else
	{
		$("#eq_tpsz_cd").val("");
		$("#eq_tpsz_cd_org").val("");
		$("#eq_tpsz_nm").val("");
		$("#eq_tp_cd").val("");	
	}
}
function setCntrTrTp(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.eq_tpsz_nm.value=rtnArr[1];
			}
			else{
				formObj.eq_tpsz_cd.value="";
				formObj.eq_tpsz_nm.value="";	
			}
		}
		else{
			formObj.eq_tpsz_cd.value="";
			formObj.eq_tpsz_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init
		with(sheetObj){
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		  var headers = [ { Text:getLabel('WHOCEQUpdatePopup_HDR1'), Align:"Center"} ];		      
		  InitHeaders(headers, info);
	      var cols = [ 
				 {Type:"CheckBox",  Hidden:0, 	Width:30,		Align:"Center",	ColMerge:1,		SaveName:prefix+"chk",			KeyField:0,		CalcLogic:"",	Format:"",							 },
	             {Type:"Seq",       Hidden:0, 	Width:30,		Align:"Center",	ColMerge:1,		SaveName:prefix+"seq",			KeyField:0,		CalcLogic:"",	Format:"",							 },
	             {Type:"Text",     	Hidden:0,  	Width:120,		Align:"Center",	ColMerge:1,		SaveName:prefix+"wob_bk_no",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:0,  	Width:100,		Align:"Center",	ColMerge:1,		SaveName:prefix+"ord_tp_nm",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Date",     	Hidden:0,  	Width:100,		Align:"Center",	ColMerge:1,		SaveName:prefix+"bk_date",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"Ymd", },
	             {Type:"Date",     	Hidden:0,  	Width:100,		Align:"Center",	ColMerge:1,		SaveName:prefix+"est_out_dt",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"Ymd", },
	             {Type:"Text",     	Hidden:0,  	Width:80,		Align:"Center",	ColMerge:1,		SaveName:prefix+"ttl_ea_qty",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:0,  	Width:70,		Align:"Center",	ColMerge:1,		SaveName:prefix+"buyer_cd",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:0,  	Width:130,		Align:"Center",	ColMerge:1,		SaveName:prefix+"buyer_nm",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:0,  	Width:70,		Align:"Center",	ColMerge:1,		SaveName:prefix+"ctrt_no",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:0,  	Width:130,		Align:"Left",	ColMerge:1,		SaveName:prefix+"ctrt_nm",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:0,  	Width:60,		Align:"Center",	ColMerge:1,		SaveName:prefix+"wh_cd",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
	             {Type:"Text",     	Hidden:1, 	Width:10,		Align:"Left",	ColMerge:0,		SaveName:prefix+"walc_no",		KeyField:0,		CalcLogic:"",                       Format:"",    } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(120);
	      SetEditable(1);
	      }
	      break;
	}
}
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0048");
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowCodeMessage("COM0048");
		return false;
	}else{
		return true;
	}
}
function checkTimeStartEnd(objStart, objEnd){
	var startTime = objStart.value;
	var endTime = objEnd.value;
	if(startTime != '' && endTime != ''){
		if(parseInt(startTime.replace(':', '')) > parseInt(endTime.replace(':', ''))){
			return false;
		}
	}
	return true;
}
function hourCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0047");
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowCodeMessage("COM0047");
		return false;
	}else{
		return true;
	}
}

function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}else if(size==5){
		var val = obj.value.split(':');
		if(hourCheck(val[0])){
			if(minuteCheck(val[1])){
				obj.value=val[0] + ":" + val[1];
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objStart.focus();
	}
}