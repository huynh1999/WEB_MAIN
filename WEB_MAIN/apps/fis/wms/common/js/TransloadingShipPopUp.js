var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var loading_flag="N";
var select_row;
var opener = opener;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
function loadPage() {
	var formObj=document.form;	
	doShowProcess(true);
	/*
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	*/
	//IBMultiCombo초기화
    for(var c=0; c<comboObjects.length; c++){
        initCombo(comboObjects[c], c+1);
    }	
    doHideProcess(false);
    loading_flag="Y";
	//initControl();
	var formObj=document.form;
	var openerSheetObj=opener.docObjects[0];	//부모그리드
	var prefix="Grd01";
	/*trade_tp_cd.code = openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"trade_tp_cd");
	fwd_tp_cd.code = openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"fwd_tp_cd");
	formObj.mbl_no.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"mbl_no");
	formObj.hbl_no.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"hbl_no");
	formObj.vsl_cd.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"vsl_cd");
	formObj.vsl_nm.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"vsl_nm");
	formObj.voy.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"voy");
	formObj.pol.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"pol");
	formObj.pol_nm.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"pol_nm");
	formObj.pol_etd.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"pol_etd");
	formObj.pod.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"pod");
	formObj.pod_nm.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"pod_nm");
	formObj.pod_eta.value=openerSheetObj.GetCellValue(openerSheetObj.GetSelectRow(), prefix+"pod_eta");*/
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++]=combo_obj;
 }
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.options.id) {
		case "trade_tp_cd":
			var vTextSplit=trade_tp_cdText.split("|");
			var vCodeSplit=trade_tp_cdCode.split("|");			
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;
		case "fwd_tp_cd":
			var vTextSplit=fwd_tp_cdText.split("|");
			var vCodeSplit=fwd_tp_cdCode.split("|");			
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;
	}
} 
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
	axon_event.addListenerForm("change", "form_onChange", formObject);    
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		if(srcName == "vsl_cd" && !(formObj.btn_vsl_cd.disabled)){
			if(isNull(formObj.vsl_cd)){
				setTlVslInfoNull("vsl");
			}else{
				searchTlVslInfo("vsl", ComGetObjValue(formObj.vsl_cd));
			}
		}else if(srcName == "pol" && !(formObj.btn_pol.disabled)){
			 if(isNull(formObj.pol)){
				 setTlLocInfoNull("pol");
			 }else{
				 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
			 }
		}else if(srcName == "pod" && !(formObj.btn_pod.disabled)){
			if(isNull(formObj.pod)){
				setTlLocInfoNull("pod");
			}else{
				searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
			}
		}
	}
	var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
	return true;
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "btn_etd":
				/*if (ComDisableTdButton("btn_etd", 2)) {
					return;
				}*/
				var cal=new ComCalendar();
	            cal.select(formObj.pol_etd, 'MM-dd-yyyy');
				break;
			case "btn_eta":
				/*if (ComDisableTdButton("btn_eta", 2)) {
					return;
				}*/
				var cal=new ComCalendar();
	            cal.select(formObj.pod_eta, 'MM-dd-yyyy');
				break;
			case "btn_fr_node_loc_cd":
				/*if (ComDisableTdButton("btn_fr_node_loc_cd", 2)) {
					return;
				}*/
				/*var sUrl="LocationPopup.clt?loc_cd="+ComGetObjValue(formObj.fr_node_loc_cd)+"&crtr_no="+ComGetObjValue(formObj.ctrt_no)+"&type=A";
					ComOpenPopup(sUrl, 1000, 650, "setFrNodeInfo", "0,0", true);*/
				
				rtnary=new Array(1);
				
				   rtnary[0]=ComGetObjValue(formObj.fr_node_loc_cd);
				   rtnary[1]=ComGetObjValue(formObj.ctrt_no);
				   rtnary[2]='A';
				   rtnary[3]=window;
				   
				   callBackFunc = "setFrNodeInfo";
				   modal_center_open('./LocationPopup.clt', rtnary, 1000,650,"yes");
			break;
			case "btn_to_node_loc_cd":
				/*if (ComDisableTdButton("btn_to_node_loc_cd", 2)) {
					return;
				}*/
				/*var sUrl="LocationPopup.clt?loc_cd="+ComGetObjValue(formObj.to_node_loc_cd)+"&crtr_no="+ComGetObjValue(formObj.ctrt_no)+"&type=A";
				ComOpenPopup(sUrl, 1000, 650, "setToNodeInfo", "0,0", true);*/
				
				rtnary=new Array(1);
				
				   rtnary[0]=ComGetObjValue(formObj.to_node_loc_cd);
				   rtnary[1]=ComGetObjValue(formObj.ctrt_no);
				   rtnary[2]='A';
				   rtnary[3]=window;
				   
				   callBackFunc = "setToNodeInfo";
				   modal_center_open('./LocationPopup.clt', rtnary, 1000,650,"yes");
			break;
			case "btn_vsl_cd":
				on_btn_vsl();
			break;
			case "btn_pol":
				on_btn_pol();
			break;
			case "btn_pod":
				on_btn_pod();
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
/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if(srcName == "vsl_cd" && !(formObj.btn_vsl_cd.disabled)){
		if(isNull(formObj.vsl_cd)){
			setTlVslInfoNull("vsl");
		}else{
			searchTlVslInfo("vsl", ComGetObjValue(formObj.vsl_cd));
		}
	}else if(srcName == "pol" && !(formObj.btn_pol.disabled)){
		 if(isNull(formObj.pol)){
			 setTlLocInfoNull("pol");
		 }else{
			 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
		 }
	}else if(srcName == "pod" && !(formObj.btn_pod.disabled)){
		if(isNull(formObj.pod)){
			setTlLocInfoNull("pod");
		}else{
			searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
		}
	}
}
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init (By Item)
		    with(sheetObj){
	        
	      var hdr1="selRow|I/O|Trans-Loading No|tlo_seq|Booking No|wh_cd|ctrt_no|tro_no|tro_seq|trd_no|ibflag";
	      var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd00";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:prefix+"selRow",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"trans_tp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tlo_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"tlo_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"bk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"wh_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"tro_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"trd_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
	       
	      InitColumns(cols);
	      //SetSheetHeight(80);
	      resizeSheet();
	      SetEditable(0);
	      SetCountPosition(0);
	            }
	      break;


	}
}
function resizeSheet(){
	ComResizeSheet(sheet1);
}
function on_btn_vsl(){
	var formObj=document.form;
	/*var sUrl="VesselPopup.clt?vsl_cd="+ComGetObjValue(formObj.vsl_cd);
	ComOpenPopup(sUrl, 900, 550, "setVslInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]=ComGetObjValue(formObj.vsl_cd);
	   rtnary[1]=window;
	   
	   callBackFunc = "setVslInfo";
	   modal_center_open('./VesselPopup.clt', rtnary, 900,550,"yes");
}
function setVslInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.vsl_cd,    	aryPopupData[0][1]);
	ComSetObjValue(formObj.vsl_nm, 	aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.vsl_cd.value=rtnValAry[0];//full_nm
		   formObj.vsl_nm.value=rtnValAry[2];//full_nm
	   }
}
function on_btn_pol(){
	var formObj=document.form;
	/*var sUrl="LocationPopup.clt?type=P&loc_cd="+formObj.pol.value;
	ComOpenPopup(sUrl, 900, 700, "setPolLocInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]='P';
	   rtnary[1]=formObj.pol.value;
	   rtnary[2]=window;
	   
	   callBackFunc = "setPolLocInfo";
	   modal_center_open('./LocationPopup.clt', rtnary, 900,700,"yes");
}
function setPolLocInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.pol,			aryPopupData[0][1]);
	ComSetObjValue(formObj.pol_nm,	aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.pol.value=rtnValAry[0];//full_nm
		   formObj.pol_nm.value=rtnValAry[2];//full_nm
	   }
}
function on_btn_pod(){
	var formObj=document.form;
	/*var sUrl="LocationPopup.clt?type=P&loc_cd="+formObj.pod.value;
	ComOpenPopup(sUrl, 900, 700, "setPodLocInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]='P';
	   rtnary[1]=formObj.pod.value;
	   rtnary[2]=window;
	   
	   callBackFunc = "setPodLocInfo";
	   modal_center_open('./LocationPopup.clt', rtnary, 900,700,"yes");
}
function setPodLocInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.pod,			aryPopupData[0][1]);
	ComSetObjValue(formObj.pod_nm,	aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.pod.value=rtnValAry[0];//full_nm
		   formObj.pod_nm.value=rtnValAry[2];//full_nm
	   }
}
function searchTlVslInfo(name, value){
	/*$.ajax({
		url : "searchTlVslInfo.clt?"+"code="+value,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}
			setTlVslInfo(name, result.xml);
		}
	});*/
	/*var sXml=docObjects[0].GetSearchData("searchTlVslInfo.clt?"+"code="+value);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}
	setTlVslInfo(name, sXml);*/
	
	ajaxSendPost(setTlVslInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlVslInfo&code='+value, './GateServlet.gsl');
}
function setTlVslInfo(reqVal){
	var formObj=document.form;
	/*ComSetObjValue(eval("formObj."+name+"_cd"), getXmlDataNullToNullString(sXml,'code'));
	ComSetObjValue(eval("formObj."+name+"_nm"), getXmlDataNullToNullString(sXml,'name'));*/
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.vsl_nm.value=rtnArr[0];
			}
			else{
				formObj.vsl_cd.value="";
				formObj.vsl_nm.value="";	
			}
		}
		else{
			formObj.vsl_cd.value="";
			formObj.vsl_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function setTlVslInfoNull(name){
	var formObj=document.form;
	ComSetObjValue(eval("formObj."+name+"_cd"), "");
	ComSetObjValue(eval("formObj."+name+"_nm"), "");
}
/*
 * NAME 엔터시 팝업호출 - warehouse name
 */
function locationPopup(){
	var formObj=document.form;
	/*var sUrl="LocationPopup.clt?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY";
	ComOpenPopup(sUrl, 900, 650, "setRcvLocInfo", "0,0", true);	*/
	
	rtnary=new Array(1);
	
	   rtnary[0]=formObj.wh_nm.value;
	   rtnary[1]='WH_ONLY';
	   rtnary[2]=window;
	   
	   callBackFunc = "setRcvLocInfo";
	   modal_center_open('./LocationPopup.clt', rtnary, 900,650,"yes");
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	var formObj=document.form;
	/*var sUrl="ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
	ComOpenPopup(sUrl, 900, 620, "setCtrtNoInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]=formObj.ctrt_nm.value;
	   rtnary[1]=window;
	   
	   callBackFunc = "setCtrtNoInfo";
	   modal_center_open('./ContractRoutePopup.clt', rtnary, 900,620,"yes");
}
/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.ctrt_no,    aryPopupData[0][0]);
	ComSetObjValue(formObj.ctrt_nm,    aryPopupData[0][1]);	*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];//full_nm
		   formObj.ctrt_nm.value=rtnValAry[2];//full_nm
	   }
}
function setRcvLocInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.wh_cd,    aryPopupData[0][1]);
	ComSetObjValue(formObj.wh_nm,    aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.wh_cd.value=rtnValAry[0];//full_nm
		   formObj.wh_nm.value=rtnValAry[2];//full_nm
	   }
}
function setPutawayLocInfo(rtnVal) {
	var formObj=document.form;
	/*ComSetObjValue(formObj.wh_loc_cd,     aryPopupData[0][1]);// wh_loc_cd
	ComSetObjValue(formObj.wh_loc_nm,     aryPopupData[0][2]);// wh_loc_nm*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.wh_loc_cd.value=rtnValAry[0];//full_nm
		   formObj.wh_loc_nm.value=rtnValAry[2];//full_nm
	   }
}
function on_btn_vsl(){
	var formObj=document.form;
	/*var sUrl="VesselPopup.clt?vsl_cd="+ComGetObjValue(formObj.vsl_cd);
	ComOpenPopup(sUrl, 900, 550, "setVslInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]=ComGetObjValue(formObj.vsl_cd);
	   rtnary[1]=window;
	   
	   callBackFunc = "setVslInfo";
	   modal_center_open('./VesselPopup.clt', rtnary, 900,550,"yes");
}
function setVslInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.vsl_cd,    	aryPopupData[0][1]);
	ComSetObjValue(formObj.vsl_nm, 	aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.vsl_cd.value=rtnValAry[0];//full_nm
		   formObj.vsl_nm.value=rtnValAry[2];//full_nm
	   }
}
function on_btn_pol(){
	var formObj=document.form;
	/*var sUrl="LocationPopup.clt?type=P&loc_cd="+formObj.pol.value;
	ComOpenPopup(sUrl, 900, 700, "setPolLocInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]='P';
	   rtnary[1]=formObj.pol.value;
	   rtnary[2]=window;
	   
	   callBackFunc = "setPolLocInfo";
	   modal_center_open('./LocationPopup.clt', rtnary, 900,700,"yes");
}
function setPolLocInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.pol,			aryPopupData[0][1]);
	ComSetObjValue(formObj.pol_nm,	aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.pol.value=rtnValAry[0];//full_nm
		   formObj.pol_nm.value=rtnValAry[2];//full_nm
	   }
}
function on_btn_pod(){
	var formObj=document.form;
	/*var sUrl="LocationPopup.clt?type=P&loc_cd="+formObj.pod.value;
	ComOpenPopup(sUrl, 900, 700, "setPodLocInfo", "0,0", true);*/
	
	rtnary=new Array(1);
	
	   rtnary[0]='P';
	   rtnary[1]=formObj.pod.value;
	   rtnary[2]=window;
	   
	   callBackFunc = "setPodLocInfo";
	   modal_center_open('./LocationPopup.clt', rtnary, 900,700,"yes");
}
function setPodLocInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.pod,			aryPopupData[0][1]);
	ComSetObjValue(formObj.pod_nm,	aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.pod.value=rtnValAry[0];//full_nm
		   formObj.pod_nm.value=rtnValAry[2];//full_nm
	   }
}
function setFrNodeInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.fr_node_loc_cd,    	aryPopupData[0][1]);	
	ComSetObjValue(formObj.fr_node_loc_nm,    	aryPopupData[0][2]);	
	ComSetObjValue(formObj.fr_node_addr,  		aryPopupData[0][3]);
	ComSetObjValue(formObj.fr_node_pic_nm,    	aryPopupData[0][22]);	
	ComSetObjValue(formObj.fr_node_pic_tel,   	aryPopupData[0][23]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.fr_node_loc_cd.value=rtnValAry[0];//full_nm
		   formObj.fr_node_loc_nm.value=rtnValAry[2];//full_nm
		   formObj.fr_node_addr.value=rtnValAry[0];//full_nm
		   formObj.fr_node_pic_nm.value=rtnValAry[2];//full_nm
		   formObj.fr_node_pic_tel.value=rtnValAry[0];//full_nm
	   }
}
function setToNodeInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.to_node_loc_cd,    	aryPopupData[0][1]);	
	ComSetObjValue(formObj.to_node_loc_nm,    	aryPopupData[0][2]);	
	ComSetObjValue(formObj.to_node_addr,  		aryPopupData[0][3]);
	ComSetObjValue(formObj.to_node_pic_nm,    	aryPopupData[0][22]);	
	ComSetObjValue(formObj.to_node_pic_tel,   	aryPopupData[0][23]);	*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.to_node_loc_cd.value=rtnValAry[0];//full_nm
		   formObj.to_node_loc_nm.value=rtnValAry[2];//full_nm
		   formObj.to_node_addr.value=rtnValAry[0];//full_nm
		   formObj.to_node_pic_nm.value=rtnValAry[2];//full_nm
		   formObj.to_node_pic_tel.value=rtnValAry[0];//full_nm
	   }
}
function setCurrInfo(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.curr_cd,    		aryPopupData[0][2]);	*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.curr_cd.value=rtnValAry[0];//full_nm
	   }
}
function setAddAmtInfo(aryPopupData){
	var formObj=document.form;
	setTotAmt();
}
function setTruckTypeInfo(rtnVal){
	var formObj=document.form;
	/*formObj.truck_tpsz_cd.value=aryPopupData[0][1];*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.truck_tpsz_cd.value=rtnValAry[0];//full_nm
	   }
}
function setCntrTypeInfo(rtnVal){
	var formObj=document.form;
	/*formObj.cntr_tpsz_cd.value=aryPopupData[0][1];*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.cntr_tpsz_cd.value=rtnValAry[0];//full_nm
	   }
}
function setTrucker(rtnVal){
	var formObj=document.form;
	/*ComSetObjValue(formObj.trucker_cd,    aryPopupData[0][1]);
	ComSetObjValue(formObj.trucker_nm,    aryPopupData[0][2]);*/
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.trucker_cd.value=rtnValAry[0];//full_nm
		   formObj.trucker_nm.value=rtnValAry[0];//full_nm
	   }
}
function on_btn_dt(name){
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'MM-dd-yyyy');
}
function getCntrTrTp(obj){
	var sParam="cntr_tp="+obj.value;
	/*$.ajax({
		url : "searchCntrTrTp.clt?"+sParam,
		success : function(result) {
			obj.value=getXmlDataNullToNullString(result.xml,'eq_unit');
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}
		}
	});*/
	/*var sXml=docObjects[0].GetSearchData("searchCntrTrTp.clt?"+sParam);
	obj.value=getXmlDataNullToNullString(sXml,'eq_unit');
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}*/
	
	ajaxSendPost(setCntrTrTp, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
}
function setCntrTrTp(reqVal){
	var formObj=document.form;
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.vsl_nm.value=rtnArr[0];
			}
			else{
				formObj.vsl_cd.value="";
				formObj.vsl_nm.value="";	
			}
		}
		else{
			formObj.vsl_cd.value="";
			formObj.vsl_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function searchTlCtrtInfo(){
	var formObj=document.form;
	var ord_tp_lvl1_cd="\'P\'";
	/*$.ajax({
		url : "searchTlCtrtInfo.clt?"+"ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&mgmt_flg=Y&org_cd="+formObj.org_cd.value,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}
			setTlCtrtInfo(result.xml);
		}
	});*/
	/*var sXml=docObjects[0].GetSearchData("searchTlCtrtInfo.clt?"+"ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&mgmt_flg=Y&org_cd="+formObj.org_cd.value);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}
	setTlCtrtInfo(sXml);*/
	
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ComGetObjValue(formObj.ctrt_no)+'&ord_tp_lvl1_cd='+ord_tp_lvl1_cd+'&mgmt_flg=Y&org_cd='+formObj.org_cd.value, './GateServlet.gsl');
}
function setTlCtrtInfo(sXml){
	var formObj=document.form;
	ComSetObjValue(formObj.ctrt_no,				getXmlDataNullToNullString(sXml,'ctrt_no'));
	ComSetObjValue(formObj.ctrt_nm,			    getXmlDataNullToNullString(sXml,'ctrt_nm'));
	ComSetObjValue(formObj.sales_ofc_cd,	    getXmlDataNullToNullString(sXml,'sales_ofc_cd'));
	//ComSetObjValue(formObj.sales_ofc_nm,	    getXmlDataNullToNullString(sXml,'sales_ofc_nm'));
	//ComSetObjValue(formObj.sales_pic_id,	    getXmlDataNullToNullString(sXml,'sales_pic_id'));
	ComSetObjValue(formObj.sales_pic_nm,	    getXmlDataNullToNullString(sXml,'sales_pic_nm'));
	ComSetObjValue(formObj.rtp_no,				getXmlDataNullToNullString(sXml,'rtp_no'));
	ComSetObjValue(formObj.main_svc_type,       getXmlDataNullToNullString(sXml,'main_svc_type'));
	ComSetObjValue(formObj.main_svc_nm,         getXmlDataNullToNullString(sXml,'main_svc_tp_nm'));
	//ComSetObjValue(formObj.wh_cd,	    	    getXmlDataNullToNullString(sXml,'loc_cd'));
	//ComSetObjValue(formObj.wh_nm,	          	getXmlDataNullToNullString(sXml,'loc_addr'));
	ComSetObjValue(formObj.old_ctrt_no, ComGetObjValue(formObj.ctrt_no));
	if(!isNull(formObj.ctrt_no)){
		if(isNull(formObj.owner_cd)){
			ComSetObjValue(formObj.owner_cd,	getXmlDataNullToNullString(sXml,'ctrt_cust_cd'));
			searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
		}else{
			if( ComGetObjValue(formObj.owner_cd) != getXmlDataNullToNullString(sXml,'ctrt_cust_cd') ){
				if(ComShowCodeConfirm("COM0272")){
					ComSetObjValue(formObj.owner_cd,		getXmlDataNullToNullString(sXml,'ctrt_cust_cd'));
					searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
				}		
			}
		}
	}
}
function searchTlCustInfo(name, value){
	/*$.ajax({
		url : "searchTlCustInfo.clt?"+"cust_cd="+value,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}
			setTlCustInfo(name, result.xml);
		}
	});*/
	/*var sXml=docObjects[0].GetSearchData("searchTlCustInfo.clt?"+"cust_cd="+value);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}
	setTlCustInfo(name, sXml);*/
	
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ComGetObjValue(formObj.ctrt_no)+'&ord_tp_lvl1_cd='+ord_tp_lvl1_cd+'&mgmt_flg=Y&org_cd='+formObj.org_cd.value, './GateServlet.gsl');
}
function setTlCustInfo(name, sXml){
	var formObj=document.form;
	if(name == "owner" || name == "supp" || name == "buyer"){
		ComSetObjValue(eval("formObj."+name+"_cd"), getXmlDataNullToNullString(sXml,'cust_cd'));
		ComSetObjValue(eval("formObj."+name+"_addr1"), getXmlDataNullToNullString(sXml,'addr1'));
		ComSetObjValue(eval("formObj."+name+"_addr2"), getXmlDataNullToNullString(sXml,'addr2'));
		ComSetObjValue(eval("formObj."+name+"_addr3"), getXmlDataNullToNullString(sXml,'addr3'));
		ComSetObjValue(eval("formObj."+name+"_addr4"), getXmlDataNullToNullString(sXml,'addr4'));
		ComSetObjValue(eval("formObj."+name+"_addr5"), getXmlDataNullToNullString(sXml,'addr5'));		
	}else if(name == "carrier"){
		ComSetObjValue(eval("formObj."+name+"_cd"), getXmlDataNullToNullString(sXml,'cust_cd'));
		ComSetObjValue(eval("formObj."+name+"_nm"), getXmlDataNullToNullString(sXml,'cust_nm'));
	}
	if("owner" == name){
		if(fastOwnerFlg &&  (ComGetObjValue(formObj.form_mode) == "NEW")){
			//Forwarding Direction
			var vFwdDir=comboObjects[3].GetSelectCode();
			if(vFwdDir == "I")
				searchTlCustInfo("supp", ComGetObjValue(formObj.owner_cd));
			else if(vFwdDir == "E")
				searchTlCustInfo("buyer", ComGetObjValue(formObj.owner_cd));
			fastOwnerFlg=false;
		}
	}
}
function setTlCustInfoNull(name){
	var formObj=document.form;
	ComSetObjValue(eval("formObj."+name+"_cd"), "");
	ComSetObjValue(eval("formObj."+name+"_addr1"), "");
	ComSetObjValue(eval("formObj."+name+"_addr2"), "");
	ComSetObjValue(eval("formObj."+name+"_addr3"), "");
	ComSetObjValue(eval("formObj."+name+"_addr4"), "");
	ComSetObjValue(eval("formObj."+name+"_addr5"), "");		
}
function searchTlLocInfo(name, value, type){
	/*$.ajax({
		url : "searchTlLocInfo.clt?type="+type+"&loc_cd="+value,
		success : function(result) {
			if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
			}			
			setTlLocInfo(name, result.xml);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?type="+type+"&loc_cd="+value);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}			
	setTlLocInfo(name, sXml);
}
function searchLocNm(formObj, value, col){
	/*$.ajax({
		url : "searchTlLocInfo.clt?"+value,
		success : function(result) {
			resultLocNm(result.xml, col);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?"+value);
	resultLocNm(sXml, col);
}
function resultLocNm(resultXml, col_nm) {
	var formObj=document.form;
	if (col_nm == "fr_node_loc_cd"){
		formObj.fr_node_loc_cd.value=getXmlDataNullToNullString(resultXml,'loc_cd');
		formObj.fr_node_loc_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
		formObj.fr_node_addr.value=getXmlDataNullToNullString(resultXml,'eng_addr');
	} else if (col_nm == "to_node_loc_cd"){
		formObj.to_node_loc_cd.value=getXmlDataNullToNullString(resultXml,'loc_cd');
		formObj.to_node_loc_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
		formObj.to_node_addr.value=getXmlDataNullToNullString(resultXml,'eng_addr');
	} 
	if(getXmlDataNullToNullString(resultXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(resultXml,'exception_msg'));
		if (col_nm == "fr_node_loc_cd"){
			formObj.fr_node_loc_cd.focus();
		} else if (col_nm == "to_node_loc_cd"){
			formObj.to_node_loc_cd.focus();
		}
	}
}
function rmk_len_chk(){
	var formObj=document.form;
	if(formObj.rmk.value.length > 400){
		ComShowCodeMessage("COM0215", "400");
		formObj.rmk.value=formObj.rmk.value.substring(0,400);
	}
}
function setTlLocInfo(name, sXml){
	var formObj=document.form;
	if(name == "pol" || name == "pod" || name == "del"){
		ComSetObjValue(eval("formObj."+name), getXmlDataNullToNullString(sXml,'loc_cd'));
	}else if(name == "rcv_loc"){
		ComSetObjValue(eval("formObj."+name+"_cd"), getXmlDataNullToNullString(sXml,'loc_cd'));
	}
	ComSetObjValue(eval("formObj."+name+"_nm"), getXmlDataNullToNullString(sXml,'loc_nm'));
}
function setTlLocInfoNull(name){
	var formObj=document.form;
	if(name == "pol" || name == "pod" || name == "del"){
		ComSetObjValue(eval("formObj."+name), "");
	}else if(name == "rcv_loc"){
		ComSetObjValue(eval("formObj."+name+"_cd"), "");
	}
	ComSetObjValue(eval("formObj."+name+"_nm"), "");
}
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj) {
	var formObj=document.form;
	if (obj.value == "") {
		form.wh_cd.value="";
		form.wh_nm.value="";
	} else {
		searchLocInfo(formObj, ComGetObjValue(formObj.wh_cd), "loc_cd");
	}		
}
function searchLocInfo(obj){
	var formObj=document.form;
	/*$.ajax({
		url : "searchTlLocInfo.clt?loc_cd="+ComGetObjValue(formObj.wh_cd)+"&type=WH",
		success : function(result) {
			resultLocInfo(result.xml, obj.name);
		}
	});*/
	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+ComGetObjValue(formObj.wh_cd)+"&type=WH");
	resultLocInfo(sXml, obj.name);
}
function resultLocInfo(resultXml, name) {
	var formObj=document.form;
	formObj.wh_cd.value=getXmlDataNullToNullString(resultXml, 'loc_cd');
	formObj.wh_nm.value=getXmlDataNullToNullString(resultXml, 'loc_nm');
	if (getXmlDataNullToNullString(resultXml,'exception_msg')!="") {
		alert(getXmlDataNullToNullString(resultXml,'exception_msg'));
	}
}
function addr_len_chk(obj){
	if(obj.value.length > 250){
		ComShowCodeMessage("COM0215", "250");
		obj.value=obj.value.substring(0,250);
	}
}
function rmk_len_chk(obj){
	if(obj.value.length > 250){
		ComShowCodeMessage("COM0215", "1000");
		obj.value=obj.value.substring(0,1000);
	}
}
function btn_Apply(){
	var formObj=document.form;
	var openerSheetObj=opener.docObjects[0];
	var prefix="Grd01";
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"trade_tp_cd",comboObjects[0].GetSelectCode());
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"fwd_tp_cd",comboObjects[1].GetSelectCode());
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"mbl_no",formObj.mbl_no.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"hbl_no",formObj.hbl_no.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"vsl_cd",formObj.vsl_cd.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"vsl_nm",formObj.vsl_nm.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"voy",formObj.voy.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"pol",formObj.pol.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"pol_nm",formObj.pol_nm.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"pol_etd",formObj.pol_etd.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"pod",formObj.pod.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"pod_nm",formObj.pod_nm.value);
	openerSheetObj.SetCellValue(openerSheetObj.GetSelectRow(), prefix+"pod_eta",formObj.pod_eta.value);
  ComClosePopup(); 
}
function closewin(){
  ComClosePopup(); 
}
