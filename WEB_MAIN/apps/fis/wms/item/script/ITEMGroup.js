/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITEMGroup.js
*@FileTitle  : Item Group 
*@author     : DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================*/
var sheetCnt=0;
var docObjects=new Array();
var rtnary=new Array(2);
var firCalFlag=false;
var callBackFunc = "";
//document.onclick=processButtonClick;
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		switch(srcName) {
		case "SEARCHLIST":
			btn_Search(); 
			break;
		case "NEW": 
			btn_New(); 
			break;
		case "SAVE": 
			btn_Save(); 
			break;
		case "row_add": 
			row_add(); 
			break;
		case "row_del": 
			row_del(); 
			break;
		case "ADDKITSET": 
			btn_add_kit_set(); 
			break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			ComShowMessage(e);
		}
	}
}
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	var formObj=document.form;
	initControl();
	btn_Search_All();
}
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//    //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		      with(sheetObj){
           
//         var HeadTitle1="|Seq|Group Code|Name|Contract|Contract|Item CNT|Active|ibflag";
         var prefix="";

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('ITEMGroup_SHEET1_HDR1'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
             {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_grp_cd", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:10,  UpdateEdit:0,   InsertEdit:1 , EditLen:10},
             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_grp_nm", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:50,  UpdateEdit:1,   InsertEdit:1 ,EditLen:50},
             {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Center",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:10,  UpdateEdit:0,   InsertEdit:1 ,EditLen:10},
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:50,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cnt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
          
         InitColumns(cols);

         SetEditable(1);
	     SetColProperty("use_flg", {ComboText:"Yes|No", ComboCode:"Y|N"} );
	     SetColProperty(0 ,prefix+"item_grp_cd", {AcceptKeys:"E|[0123456789][-_]" , InputCaseSensitive:1});
	     SetColProperty(0 ,prefix+"ctrt_no", {AcceptKeys:"E|[0123456789][-_]" , InputCaseSensitive:1});
	     SetColProperty(0 ,prefix+"item_grp_nm", {AcceptKeys:"E|N|[~!@#$%^&*()_+`-=\\:;'/?<>\| ]" , InputCaseSensitive:1});
	     SetSheetHeight(450);
	     resizeSheet();


			}                                                      
		break;
		case 2:      //IBSheet1 init
		      with(sheetObj){
            
         var prefix="";
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('ITEMGroup_SHEET2_HDR1'), Align:"Center"}];
         InitHeaders(headers, info);

         var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:prefix+"item_grp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",    ColMerge:1,   SaveName:prefix+"item_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
         	 {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",    ColMerge:1,   SaveName:prefix+"item_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 } ];
          
         InitColumns(cols);
         SetSheetHeight(450);
         resizeSheet();
         SetEditable(0);
         

			}                                                      
		break;
		case 3:      //IBSheet1 init
		      with(sheetObj){
         
//       var HeadTitle1="|Seq|Group Code|Name|Contract|Contract|Item CNT|Active|ibflag";
       var prefix="";

       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
       var headers = [ { Text:getLabel('ITEMGroup_SHEET1_HDR1'), Align:"Center"} ];
       InitHeaders(headers, info);

       var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
           {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
           {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_grp_cd", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:10,  UpdateEdit:0,   InsertEdit:1 },
           {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_grp_nm", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:50,  UpdateEdit:1,   InsertEdit:1 },
           {Type:"PopupEdit", Hidden:0, Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:10,  UpdateEdit:0,   InsertEdit:1 },
           {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_nm",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:50,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cnt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
           {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
           {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
        
       InitColumns(cols);

       SetEditable(1);
	     SetColProperty("use_flg", {ComboText:"Yes|No", ComboCode:"Y|N"} );
	     SetColProperty(0 ,prefix+"item_grp_cd", {AcceptKeys:"E|[0123456789][-_]" , InputCaseSensitive:1});
	     SetColProperty(0 ,prefix+"ctrt_no", {AcceptKeys:"E|[0123456789][-_]" , InputCaseSensitive:1});
	     SetSheetHeight(450);
	     resizeSheet();


			}                                                      
		break;
	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
	ComResizeSheet(sheet2);
}
function btn_Search(){
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
	if(formObj.in_ctrt_no.value == ""){
		ComShowMessage("Please Enter Contract No.");
		formObj.in_ctrt_no.focus();
		return;
	}
	docObjects[0].RemoveAll(); 
	docObjects[1].RemoveAll(); 
 	docObjects[0].DoSearch("./searchItemGroupCodeListGS.clt", FormQueryString(formObj, ""));
}
function btn_Search_All(){
	var formObj=document.form;
	formObj.f_cmd.value=-1;
	docObjects[2].RemoveAll(); 
	docObjects[2].DoSearch("./searchItemGroupCodeList_AllGS.clt", FormQueryString(formObj, ""));
}
function btn_Save() {
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH02;
	var sheetObj=docObjects[0];
	if(!getSaveString()){
	  ComShowCodeMessage("COM0409");
	  return;
	}else{
		if(validation()){
			var formObj=document.form;
			if(ComShowCodeConfirm("COM0063")){
				doShowProcess(true);
				var sParam=FormQueryString(formObj, "");
				sParam += "&" + ComGetSaveString(docObjects[0], true, false);
	 			var saveXml=docObjects[0].GetSaveData("./modifyItemGroupGS.clt", sParam);
			}else{
				return;
			}
			//1. Save 후 조회
			if(saveXml.replace(/^\s+|\s+$/gm,'') != ""){
				
				var xmlDoc = $.parseXML(saveXml);
				 var $xml1 = $(xmlDoc);
				
				 var res = $xml1.find("result").text();
				 
				 if(res == "1"){
					 showCompleteProcess();
					 if(formObj.in_ctrt_no.value == ""){
							if(sheetObj.GetCellValue(1, "ctrt_no") != "undefined" && sheetObj.GetCellValue(1, "ctrt_no") != undefined && sheetObj.GetCellValue(1, "ctrt_no") != ""){
								formObj.in_ctrt_no.value=sheetObj.GetCellValue(1, "ctrt_no");
								formObj.in_ctrt_nm.value=sheetObj.GetCellValue(1, "ctrt_nm");
							}
						}
					 doHideProcess(false);
						btn_Search();
						btn_Search_All();
				 }
			}else{
				doHideProcess(false);
			}	
		}
	}
}
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH01;
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr == "item_grp_cd"  || colStr == "item_cnt"){
		if(sheetObj.GetCellValue(Row, "item_grp_cd") != ""){
 			docObjects[1].DoSearch("./searchSubItemGroupCodeListGS.clt?in_grp_cd="+sheetObj.GetCellValue(Row, "item_grp_cd")+"&in_ctrt_no="+sheetObj.GetCellValue(Row, "ctrt_no"), FormQueryString(formObj, ""));
		}
	}
}
function sheet1_OnSearchEnd(){
	setOldValueAllObj();
}
function sheet1_OnChange(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
//	if(colStr == "item_grp_cd" || colStr == "ctrt_no"){
//		for(var i=1; i<=sheetObj.LastRow();i++){
//			for(var j=1; j<=sheetObj.LastRow();j++){
//				if(i != j){
//					if(sheetObj.GetCellValue(i, "item_grp_cd")+sheetObj.GetCellValue(i, "ctrt_no") == sheetObj.GetCellValue(j, "item_grp_cd")+sheetObj.GetCellValue(j, "ctrt_no")){
//						ComShowCodeMessage("COM0225", "Row No : "+j+" [ Group Code ]");
//						sheetObj.SetCellValue(j, "item_grp_cd","");
//						sheetObj.SetCellValue(j, "ctrt_no","");
//						sheetObj.SelectCell(j, "item_grp_cd");
//						return false;
//					}
//				}
//			}
//		}
//	}
	if(colStr == "ctrt_no"){
		if(sheetObj.GetCellValue(row, "ctrt_no")!=""){
				for(var j=1; j<=sheet3.LastRow();j++){
						if(sheetObj.GetCellValue(row, "item_grp_cd") + sheetObj.GetCellValue(row, "ctrt_no") == sheet3.GetCellValue(j, "item_grp_cd") + sheet3.GetCellValue(j, "ctrt_no")){
							ComShowMessage("Duplicate Group Code !");
							sheetObj.SetCellValue(row, "ctrt_no","");
							flag = true;
							sheetObj.SelectCell(row, "ctrt_no");
							return false;
						}
				}
			ajaxSendPost(resultCtrtInfo,row, '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+sheetObj.GetCellValue(row, "ctrt_no"), './GateServlet.gsl');
		}
		else {sheetObj.SetCellValue(row, "ctrt_nm","");}
	}
	var checkedCount = 0;
	
	
	for(var i = sheet1.HeaderRows(); i <= sheet1.LastRow(); i++){
		if(sheet1.GetCellValue(i,col) == 1){
			checkedCount ++;
		}
	}
	
	if(checkedCount == sheet1.RowCount()){
		sheet1.CheckAll(col,1);
	}
} 
var flag = false; 
function resultCtrtInfo(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    sheet1.SetCellValue(row, "ctrt_nm",rtnArr[0] ,0);
	   }
	   else{
		   sheet1.SetCellValue(row, "ctrt_no","",0);
		   sheet1.SetCellValue(row, "ctrt_nm","",0); 
	   }
	  }
	  else{
		  sheet1.SetCellValue(row, "ctrt_no","",0);
		  sheet1.SetCellValue(row, "ctrt_nm","",0); 
	  }
	 }
	 else{
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	 }
}

function sheet1_OnPopupClick(sheetObj, row, col){
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "ctrt_no"){     
		var sUrl="./ContractRoutePopup.clt?ctrt_no="+sheetObj.GetCellValue(row, "ctrt_no")+"&ctrt_nm="+sheetObj.GetCellValue(row, "ctrt_nm");
	      
	    callBackFunc = "setCtrtInfo";
		modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
	}
}
function setCtrtInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
	var formObj=document.form;
	var rtnValAry=rtnVal.split("|");
	sheet1.SetCellValue(sheet1.GetSelectRow(), "ctrt_no",rtnValAry[0]);
	if (flag == false){
		sheet1.SetCellValue(sheet1.GetSelectRow(), "ctrt_nm",rtnValAry[1]);
	}
}
}
function btn_ctrt(){
	var formObj=document.form;
//	var sUrl="./ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;
	var sUrl="./ContractRoutePopup.clt";
    callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function setCtrtNoInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
	var formObj=document.form;
	var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.in_ctrt_no, rtnValAry[0]);
	setFieldValue(formObj.in_ctrt_nm, rtnValAry[1]);	
}}
function searchCtrtPop(obj){
	var formObj=document.form;
	var sUrl="./ContractRoutePopup.clt?ctrt_no="+formObj.in_ctrt_no.value+"&ctrt_nm="+formObj.in_ctrt_nm.value;  
    callBackFunc = "setCtrtNoInfo";
	modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
/*
 * Validation
 */
function validation() {
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "item_grp_cd") == ""){
			ComShowCodeMessage("COM0005", "Group Code");
			sheetObj.SelectCell(i, "item_grp_cd");
			return false;
		}
		if(sheetObj.GetCellValue(i, "item_grp_nm") == ""){
			ComShowCodeMessage("COM0005", "Group Name");
			sheetObj.SelectCell(i, "item_grp_nm");
			return false;
		}
		if(sheetObj.GetCellValue(i, "ctrt_no") == ""){
			ComShowCodeMessage("COM0005", "Contract No");
			sheetObj.SelectCell(i, "ctrt_no");
			return false;
		}
		for(var j=1; j<=sheetObj.LastRow();j++){
			if(i != j){
				if(sheetObj.GetCellValue(i, "item_grp_cd") == sheetObj.GetCellValue(j, "item_grp_cd")){
					ComShowCodeMessage("COM0225", "Row No : "+j+" [ Group Code ]");
					sheetObj.SetCellValue(j, "item_grp_cd","");
					sheetObj.SelectCell(j, "item_grp_cd");
					return false;
				}
			}
		}
	}
	return true;
}
//Contract No 조회
function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.in_ctrt_no.value="";
		form.in_ctrt_nm.value="";
	}else{
		searchCtrtInfo(formObj, ComGetObjValue(formObj.in_ctrt_no), "ctrt_no");
	}
}
function searchCtrtInfo(){
	var formObj = document.form;
	ajaxSendPost(resultCtrtInfo1,'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.in_ctrt_no.value, './GateServlet.gsl');
}
function resultCtrtInfo1(rtnVal){
	var doc=getAjaxMsgXML(rtnVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
		  if(typeof(doc[1])!='undefined'){
			  //조회해온 결과를 Parent에 표시함
			  var rtnArr=doc[1].split('^@');
			   if(rtnArr[0] != ""){
				   formObj.in_ctrt_nm.value = rtnArr[0];
			   }
			   else{
				   formObj.in_ctrt_no.value="";
				   formObj.in_ctrt_nm.value=""; 
			   }
		  }
		  else{
			  formObj.in_ctrt_no.value="";
			  formObj.in_ctrt_nm.value=""; 
		  }
	 }
	 else{
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	 }
}
function btn_New(){
	var paramStr="./ITMgmt.clt";
    parent.mkNewFrame('Item Management', paramStr , "ITMgmt_");
}
var kit_set = false;
function btn_add_kit_set(){
	var sheetObj=docObjects[0];		
	var prefix="";
	var intRows=sheetObj.Rows;
	var insertRow=sheetObj.DataInsert(-1);
	sheetObj.SetCellValue(insertRow, prefix+"item_grp_cd", "KIT", 0);
	sheetObj.SetCellValue(insertRow, prefix+"item_grp_nm", "SET ITEM GROUP", 0);
	sheetObj.SetCellEditable(insertRow, prefix+"item_grp_cd", 0); 
	sheetObj.SetCellEditable(insertRow, prefix+"item_grp_nm", 0); 
	kit_set = true;
}
function row_add() {
	var sheetObj=docObjects[0];		
	var prefix="";
	var intRows=sheetObj.Rows;
	var insertRow=sheetObj.DataInsert(-1);
	sheetObj.SelectCell(insertRow, prefix+"user_id");
}
function row_del(){
	var sheetObj=docObjects[0];
	if (sheetObj.CheckedRows("del_chk") != 0) {
		if(sheetObj.RowCount()> 0){
//			ComRowHideDelete(sheetObj,"chk");		
			var sRow = sheetObj.FindCheckedRow("del_chk");
			var arrRow = sRow.split("|");
			sheetObj.SetRedrawSum(0);
			if (sheetObj.GetCellProperty(0, "del_chk", "Type") == "DelCheck") {
				// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
				for ( var idx = arrRow.length-1; idx >= 0; idx--) {
					var row = arrRow[idx];
					sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
				}
			} else {
				// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
				for ( var idx = arrRow.length - 1; idx >= 0; idx--) {
					var row = arrRow[idx];
					sheetObj.SetCellValue(row, "del_chk", 0, 0); // 1.체크박스 없애기 (체크된데이터만 다른 처리
															// 하는 경우도 있으므로)
					sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
					if( sheetObj.GetRowStatus(row) == "I"){
						sheetObj.RowDelete(row , 0);
					} else {
						sheetObj.SetRowStatus(row, "D"); // 3.트랜잭션 상태 "삭제"로 만들기
					}
				}
			}
			sheetObj.SetRedrawSum(1);
			//form_ctrt_copy();
			//Forwarding_Cbm_Kgs_Sum('A');
		}
    } else {
    	ComShowMessage("Nothing selected!");
    }
}


function haveAnyChanged(){
	 var sheetChange = "";
	 var arrInput = document.getElementsByTagName("input");
	 
	 for(var i = 0 ; i < arrInput.length; i++){
	  var bFlag;
	  
	  if(arrInput[i].type != "hidden" 
	   && arrInput[i].disabled == false 
	   && arrInput[i].readOnly == false 
	   && arrInput[i].oldvalue != undefined 
	   && arrInput[i].oldvalue != 'undefined' 
	   )
	  {
	   if(arrInput[i].type == "checkbox"){
	    
	    bFlag = (arrInput[i].oldvalue != arrInput[i].checked);
	    
	   }else{
	    bFlag = (arrInput[i].oldvalue != arrInput[i].value);
	   }
	   
	   if(bFlag){
	    return true;
	   }
	  }
	 }
	 
	 var arrTextarea = document.getElementsByTagName("textarea");
	 
	 for(var i = 0 ; i < arrTextarea.length; i++){
	  if( arrTextarea[i].type != "hidden" 
	   && arrTextarea[i].disabled == false 
	   && arrTextarea[i].readOnly == false 
	   && arrTextarea[i].oldvalue != undefined 
	   && arrTextarea[i].oldvalue != 'undefined' 
	   && arrTextarea[i].oldvalue != arrTextarea[i].value)
	  {
	   return true;
	  }
	 }
	 
	 var arrSelect = document.getElementsByTagName("select");
	 
	 for(var i = 0 ; i < arrSelect.length; i++){
	  if( arrSelect[i].type != "hidden" 
	   && arrSelect[i].disabled == false 
	   && arrSelect[i].readOnly == false 
	   && arrSelect[i].oldvalue != undefined 
	   && arrSelect[i].oldvalue != 'undefined' 
	   && arrSelect[i].oldvalue != arrSelect[i].value)
	  {
	   return true;
	  }
	 }
	  
	 return false;
}

function setOldValueAllObj(){
	 var arrInput = document.getElementsByTagName("input");
	 
	 for(var i = 0 ; i < arrInput.length; i++){
	  if(arrInput[i].type != "hidden" && arrInput[i].disabled == false && arrInput[i].readOnly == false)
	   if(arrInput[i].type == "checkbox"){
	    arrInput[i].oldvalue = arrInput[i].checked;
	   }else{
	    arrInput[i].oldvalue = arrInput[i].value;
	   }
	 }
	 
	 var arrTextarea = document.getElementsByTagName("textarea");
	 
	 for(var i = 0 ; i < arrTextarea.length; i++){
	  if(arrTextarea[i].type != "hidden" && arrTextarea[i].disabled == false && arrTextarea[i].readOnly == false)
	   arrTextarea[i].oldvalue = arrTextarea[i].value;
	 }
	 
	 var arrSelect = document.getElementsByTagName("select");
	 
	 for(var i = 0 ; i < arrSelect.length; i++){
	  if(arrSelect[i].type != "hidden" && arrSelect[i].disabled == false && arrSelect[i].readOnly == false)
	   arrSelect[i].oldvalue = arrSelect[i].value;
	 }
}

	function getSaveString(){
	 var prefix="";
	 for(var i = 1 ; i < sheet1.LastRow()+1; i++){
	  if(sheet1.GetCellValue(i,prefix+ "ibflag")!="R" && sheet1.GetCellValue(i,prefix+ "ibflag")!="-1")
	   return true;
	 }
	 
	 return false;
	 
}
