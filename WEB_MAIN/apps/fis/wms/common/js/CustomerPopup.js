/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CustomerPopup.js
*@FileTitle  : Customer
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var okFlag="N";
var loading_flag="N";
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	
	doShowProcess(true);
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	doHideProcess(false);
 	//IBMultiCombo초기화
    /*for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }
    initControl();*/
	loadDataCombo();
    loading_flag="Y";
    var vCustTp=ComGetObjValue(formObj.cust_tp);
	if( vCustTp == "A"){
		formObj.ctrt_cd.value="";
		formObj.ctrt_nm.value="";
	}
    if ( !ComIsEmpty(formObj.cust_cd) || !ComIsEmpty(formObj.cust_nm) ){
		btn_Search();
	}
	//setFocus(cust_cd);
	
}
/** 
 * initControl()
 */ 
function initControl() {
    //axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    //axon_event.addListenerForm('keydown', 'enter_Check',  document.form);
}
/**
 * Quick Search
 */
function enter_Check(){
	var keyValue=event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	//var srcName = event.srcElement.getAttribute("name");
	if(keyValue == "13"){
		btn_Search();
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	   
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('CustomerPopup_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cust_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"fax",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"tel",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"email",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"curr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"bl_addr1",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"bl_addr2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"bl_addr3",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"bl_addr4",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"bl_addr5",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctry_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ctry_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"org_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(300);
	      SetEditable(0);
	            }


		break;
	}
}
// 버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
// 버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName, valObj){
    var formObj=document.form;
   try {
	    var srcName=ComGetEvent("name");
   		switch(srcName) {
			case "cust_type":
				//comboObjects[0].RemoveAll();
				removeOptions(formObj.part_tp);
				if(formObj.cust_type[0].checked){
					formObj.cust_tp.value="A";
					ComEnableObject(formObj.ctrt_cd, false);
					ComEnableObject(formObj.ctrt_nm, false);
					formObj.ctrt_cd.value="";
					formObj.ctrt_nm.value="";
				}else if(formObj.cust_type[1].checked){
					formObj.cust_tp.value="C";
					ComEnableObject(formObj.ctrt_cd, true);
					ComEnableObject(formObj.ctrt_nm, true);
					formObj.ctrt_cd.value=formObj.in_ctrt_no.value;
					formObj.ctrt_nm.value=formObj.in_ctrt_nm.value;
				}
				//initCombo(comboObjects[0], 1);
				loadDataCombo();
				break;
			case "btn_retrieve":
				sheet1.RemoveAll();
				btn_Search();
				break;
			case "btn_Close":
				ComClosePopup();
				break;
   		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			ComShowMessage(e.message);
		}
	}
}
function btn_Search() {
	var formObj=document.form;
	if(loading_flag == "Y"){
		var vCustTp=ComGetObjValue(formObj.cust_tp);
		if( vCustTp == "A"){
			if(formObj.cust_cd.value == "" && formObj.cust_nm.value.trim().length < 3 && formObj.cust_loc_nm.value.trim().length < 3){
				ComShowCodeMessage("COM0098", "Name(English, Local)" ,"3");
				return;
			}
		}else{
			if(formObj.ctrt_cd.value == ""){
				ComShowCodeMessage("COM0082", "Contract No");
				return;
			//if(formObj.ctrt_cd.value == "" && formObj.ctrt_nm.value.trim().length < 3 && formObj.cust_cd.value == "" && formObj.cust_nm.value.trim().length < 3 && formObj.cust_loc_nm.value.trim().length < 3){
			//	  ComShowCodeMessage("COM0098", "Name(English, Local, Contract)" ,"3");
			}
		}
		formObj.f_cmd.value=SEARCH01;
		docObjects[0].DoSearch("./searchCustomerListGS.clt", FormQueryString(formObj,""));
	}
}
function sheet1_OnSearchEnd(){
	doHideProcess();
}
function btn_Close(){
	if ( document.form.clear_flg.value != "Y" && okFlag == "N" ) {
		ComClosePopup(); 
	} else {
		if ( okFlag == "N" ){
			sheetObjects[0].DataInsert(-1);
		}
		var rtnVal = "";
		rtnVal += sheet1.GetCellValue(Row, "cust_cd");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "cust_nm");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "cust_loc_nm");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "fax");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "tel");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "email");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "curr_cd");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "curr_nm");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "bl_addr1");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "bl_addr2");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "bl_addr3");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "bl_addr4");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "bl_addr5");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "ctry_nm");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "ctry_cd");
		rtnVal += "|";
		rtnVal += sheet1.GetCellValue(Row, "org_flg");
	  ComClosePopup(rtnVal);
	}
}
function btn_OK() {
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "cust_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "cust_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "cust_loc_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "fax");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "tel");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "email");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "curr_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "curr_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr1");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr2");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr3");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr4");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr5");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctry_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctry_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "org_flg");
  ComClosePopup(rtnVal);
	okFlag="Y";
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	//comPopupOK();
	okFlag="Y";
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "cust_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "cust_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "cust_loc_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "fax");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "tel");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "email");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "curr_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "curr_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr1");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr2");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr3");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr4");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "bl_addr5");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctry_nm");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "ctry_cd");
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "org_flg");
  ComClosePopup(rtnVal); 
}
function Upper_String(obj){
	//alert(obj.value);
	obj.value = obj.value.toUpperCase();
}
function loadDataCombo(){
	var formObj = document.form;
	var vCustTp=ComGetObjValue(formObj.cust_tp);
	var obj = document.getElementById("part_tp");
	var option =  document.createElement("option");
	var vTextSplit = "";
	var vCodeSplit = "";
	if( vCustTp == "A"){
		vTextSplit=part_tpText.split('|');
		vCodeSplit=part_tpCode.split('|');				
	} else {
		vTextSplit=part_tp2Text.split("|");
		vCodeSplit=part_tp2Code.split("|");				
	}
	
	if( vCustTp == "A"){
		option.text = "ALL";
		option.value = "All";
		
		obj.add(option);
	}	
	for(var i = 0; i < vCodeSplit.length; i++){
		if( vCustTp == "A"){
			if(vTextSplit[i + 1] != ''){
				option =  document.createElement("option");
			option.text = htmlDecode(vTextSplit[i + 1]);
			option.value = htmlDecode(vCodeSplit[i + 1]);
			
			obj.add(option);
			}
		}else{
			if(vTextSplit[i] != ''){
			option =  document.createElement("option");
			
			option.text = htmlDecode(vTextSplit[i]);
			option.value = htmlDecode(vCodeSplit[i]);
			
			obj.add(option);
			}
		}
	}
	if( vCustTp == "A"){
		//comboObj.SetSelectText("All");
		obj.value = "All";
	} else {
		//comboObj.SetSelectCode("S");
		obj.value = "S";
	}
	
	
	if ( !ComIsNull(formObj.in_part_tp.value) ){
		//comboObj.SetSelectCode(formObj.in_part_tp.value);
		checkSelectVal(obj, formObj.in_part_tp.value);
	}
}
function removeOptions(selectbox)
{
    var i;
    for(var i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}
function checkSelectVal(obj, val){
	var objVal = obj.options;
	for(var i = 0; i < objVal.length; ++i){
	   if(objVal[i].value == val )
	   {
		   return true;
	   }
	}
	return false;
}
function htmlDecode(value){
	return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}