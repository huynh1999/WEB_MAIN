/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAdjustPopup.js
*@FileTitle  : Inventory Adjustment
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================*/
var docObjects=new Array();
var rtnary=new Array(2);
var flg_new=false;
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0;
var docObjects=new Array();
var isSaveFlag=false; // save 여부

//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
$(document).ready(function() {

	if(parent.WMS_CBM_POINT_COUNT == 3) {
		$('#to_cbm, #to_cbf').attr("value", "0.000");
	} else {
		$('#to_cbm, #to_cbf').attr("value", "0.00000");
	}

	$('#to_cbm, #to_cbf').change(function() {
		if(parent.WMS_CBM_POINT_COUNT == 3) {
			checkNumFormat($(this).get(0), '9999999999.000');
		} else {
			checkNumFormat($(this).get(0), '9999999999.00000');
		}
	});
});
//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)

//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name"); 			
		switch(srcName) {
			case "SAVE":	
				btn_Save();
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
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;	
	// hidden sheet 처리
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }	
	initControl();	
	// 화면 초기화
	wBin_New();	
	setFieldValue(formObj.wib_bk_no, ComGetObjValue(formObj.c_wib_bk_no));
	setFieldValue(formObj.lot_id, ComGetObjValue(formObj.c_lot_id));
	setFieldValue(formObj.wh_loc_cd, ComGetObjValue(formObj.c_wh_loc_cd));
	setFieldValue(formObj.adjust_no, ComGetObjValue(formObj.c_adjust_no));
	var page_tp= ComGetObjValue(formObj.page_tp);
	flg_new = true;
	setEditEnable(page_tp);	
	// 디폴트 Search 실행
	if (page_tp == "MGMT") { // Inventory Adjustment
		if (!isNull(formObj.c_item_sys_no)) {
			btn_Search("MGMT");
		}
		formObj.reason_cd.focus();
	} else if (page_tp == "LIST") { // Inventory Adjustment Search		
		if (!isNull(formObj.c_adjust_no)) {
			btn_Search("LIST");
		}		
	}
//	check_authority_wh();
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
//function initCombo(comboObj, comboNo) {
//	var vTextSplit=null;
//	var vCodeSplit=null;
//	switch(comboObj.options.id) {
//	case "reason_cd":
//		vTextSplit=reason_cdText.split("|");
//		vCodeSplit=reason_cdCode.split("|");				
//			with(comboObj) {
//				SetDropHeight(125);
//				for(var j=0;j<vCodeSplit.length; j++){
//				InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
//				}
//     	}
//			break;	
//	}
//}  
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
//    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
//    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
//    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
//	axon_event.addListenerForm("change", "form_onChange", formObj);
//	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
}
/**
 * 화면 초기화
 */
function wBin_New(){
	var formObj=document.form;
	// 초기값 세팅
	formObj.form_mode.value = "NEW";
}
// 화면 Merge 컬럼 Name
var InputName1="po_sys_no|item_sys_no|wh_cd|ctrt_no|so_no|po_no|adjust_no|adjust_dt|wib_bk_no|inbound_dt|wh_loc_cd|wh_loc_nm|item_cd|item_nm|lot_no|lot_id|"
	          + "fr_cbm|fr_cbf|fr_grs_kgs|fr_grs_lbs|fr_net_kgs|fr_net_lbs|to_cbm|to_cbf|to_grs_kgs|to_grs_lbs|to_net_kgs|to_net_lbs|reason_cd_1|fr_ea_qty|to_ea_qty|wh_pic_nm|owner_pic_nm|rmk|"
	          + "lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
var InputName2="po_sys_no|item_sys_no|wh_cd|ctrt_no|so_no|po_no|adjust_no|adjust_dt|wib_bk_no|inbound_dt|wh_loc_cd|wh_loc_nm|item_cd|item_nm|lot_no|lot_id|"
    + "fr_cbm|fr_cbf|fr_grs_kgs|fr_grs_lbs|fr_net_kgs|fr_net_lbs|to_cbm|to_cbf|to_grs_kgs|to_grs_lbs|to_net_kgs|to_net_lbs|reason_cd_1|fr_ea_qty|to_ea_qty|wh_pic_nm|owner_pic_nm|rmk|"
    ;
/**
 * Search (Allocation)
 */
function btn_Search(page_tp) {
	var formObj=document.form;
	var InputName="";
	var sXml="";
	
	if (page_tp == "MGMT") {
		sheet1.RemoveAll();
		formObj.f_cmd.value=SEARCH;
		sXml=sheet1.GetSearchData("./searchInvAdjustInfoGS.clt", FormQueryString(formObj, null, ""));
		InputName=InputName1;
	} else if (page_tp == "LIST") {
		sheet1.RemoveAll();
		formObj.f_cmd.value=SEARCH01;
 		sXml=sheet1.GetSearchData("./searchInvAdjustResultInfoGS.clt", FormQueryString(formObj, null, ""));
 		InputName=InputName2;
	}
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	$("#po_sys_no").val($xml.find( "po_sys_no").text());
	$("#item_sys_no").val($xml.find( "item_sys_no").text());
	$("#wh_cd").val($xml.find( "wh_cd").text());
	$("#ctrt_no").val($xml.find( "ctrt_no").text());
	$("#so_no").val($xml.find( "so_no").text());
	$("#po_no").val($xml.find( "po_no").text());
	$("#adjust_no").val($xml.find( "adjust_no").text());
	var tam = $xml.find( "adjust_dt").text();
	if(tam !=""){
		var adjust_dt = tam.substring(5,7) + "-" + tam.substring(8,10)+ "-" + tam.substring(0,4) ;
		$("#adjust_dt").val(adjust_dt);
	}else $("#adjust_dt").val(tam);
		
	$("#wib_bk_no").val($xml.find( "wib_bk_no").text());
	var temp = $xml.find( "inbound_dt").text();
	var inbountdate = temp.substring(4,6) + "-" + temp.substring(6,8)+ "-" + temp.substring(0,4) ;
	$("#inbound_dt").val(inbountdate);
	$("#wh_loc_cd").val($xml.find( "wh_loc_cd").text());
	$("#wh_loc_nm").val($xml.find( "wh_loc_nm").text());
	$("#item_cd").val($xml.find( "item_cd").text());
	$("#item_nm").val($xml.find( "item_nm").text());
	$("#lot_no").val($xml.find( "lot_no").text());
	$("#lot_id").val($xml.find( "lot_id").text());
	formObj.reason_cd.value= $xml.find( "reason_cd").text();
	var frea = $xml.find( "fr_ea_qty").text();
	var frqty = parseInt(frea);
	$("#fr_ea_qty").val(frqty);
	var toea = $xml.find( "to_ea_qty").text();
	var toqty = parseInt(toea);
	$("#to_ea_qty").val(toqty);
	$("#wh_pic_nm").val($xml.find( "wh_pic_nm").text());
	$("#owner_pic_nm").val($xml.find( "owner_pic_nm").text());
	$("#rmk").val($xml.find( "rmk").text());
	$("#fr_cbm").val($xml.find( "fr_cbm").text());
	$("#fr_cbf").val($xml.find( "fr_cbf").text());
	$("#to_cbm").val($xml.find( "to_cbm").text());
	$("#to_cbf").val($xml.find( "to_cbf").text());
	$("#fr_grs_kgs").val($xml.find( "fr_grs_kgs").text());
	$("#fr_grs_lbs").val($xml.find( "fr_grs_lbs").text());
	$("#to_grs_kgs").val($xml.find( "to_grs_kgs").text());
	$("#to_grs_lbs").val($xml.find( "to_grs_lbs").text());
	$("#fr_net_kgs").val($xml.find( "fr_net_kgs").text());
	$("#fr_net_lbs").val($xml.find( "fr_net_lbs").text());
	$("#to_net_kgs").val($xml.find( "to_net_kgs").text());
	$("#to_net_lbs").val($xml.find( "to_net_lbs").text());
	$("#lv1_cbm").val($xml.find( "lv1_cbm").text());
	$("#lv1_cbf").val($xml.find( "lv1_cbf").text());
	$("#lv1_grs_kgs").val($xml.find( "lv1_grs_kgs").text());
	$("#lv1_grs_lbs").val($xml.find( "lv1_grs_lbs").text());
	$("#lv1_net_kgs").val($xml.find( "lv1_net_kgs").text());
	$("#lv1_net_lbs").val($xml.find( "lv1_net_lbs").text());
	
	formObj.form_mode.value= "UPDATE";
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
		case 1:      //IBSheet1 init (hidden sheet)
            with(sheetObj){
            
//      var hdr1="|Item|Item Lot|Unit|QTY|Type|CNTR/TR No|Seal No|Seal No|Gate No|Inbound Loc|Inbound Loc|po_sys_no|item_sys_no|item_seq|eq_tp_cd";

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('InvAdjustPopup_HDR1'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
					 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"item_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
					 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lot_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
					 {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
					 {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"item_pkgqty",           KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
					 {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"eq_tpsz_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
					 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"eq_no",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
					 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"seal_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
					 {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"seal_img",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
					 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"unload_gate_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
					 {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"unload_inbound_loc_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
					 {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"unload_inbound_loc_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
					 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"po_sys_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					 {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_sys_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					 {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"item_seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					 {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"eq_tp_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
       
      InitColumns(cols);
      SetSheetHeight(170);
      SetEditable(1);
      resizeSheet();
                        }
      break;


	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

/**
 * Remark 길이 체크
 */
function remark_lenChk() {
	var formObj=document.form;
	if (formObj.rmk.value.length > 1000) {
		ComShowCodeMessage("COM0215", "Remark[1000]");
		formObj.rmk.value=formObj.rmk.value.substring(0, 1000);
	}
}
/**
 * Save
 */
function btn_Save() {	
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH02;
	// 필수 입력 체크	
	if (formObj.reason_cd.value == "") {
		// Reason
		ComShowCodeMessage("COM0278", "Reason");
		formObj.reason_cd.focus();
		return;
	} 
	if (isNull(formObj.to_ea_qty)) {	
		// ADJ Qty (EA)
		ComShowCodeMessage("COM0278", "ADJ Qty (EA)");
		formObj.to_ea_qty.focus();
		return;		
	} 
	if (isNull(formObj.rmk)) {
		// Remark
		ComShowCodeMessage("COM0278", "Remark");
		formObj.rmk.focus();
		return;
	}
	if (formObj.rmk.value.length > 1000) {
		// Remark
		ComShowCodeMessage("COM0215", "Remark [1000]");
		formObj.rmk.focus();
		return;
	}
	// alter msg pop ups when click save button at the Inventory Adjustment popup window - 2017.02.07
	var confirmCode= ComGetMsg("COM130101"); //기본 save시 comfirm 메세지
	var qty=eval(formObj.to_ea_qty.value);
	if(qty <= 0)
	{
//		confirmCode="COM0368"; //재고조정수량이 0으로 바뀌었을때 메세지
		confirmCode = getLabel("WMS_MSG004");
	}
	if (ComShowConfirm(confirmCode)) {
		var sParam=FormQueryString(formObj);
		    sParam += "&" + ComGetSaveString(sheet1, true, true);
 		var saveXml=docObjects[0].GetSaveData("./saveInvAdjustInfoGS.clt", sParam);
 		docObjects[0].LoadSaveData(saveXml);
		// Save 후 Adjustment Key, Adjustment Date 세팅
		if (saveXml.indexOf('<MESSAGE>') == -1) {
			if(saveXml.replace(/^\s+|\s+$/gm,'') != ""){
				isSaveFlag=true;
				flg_new = false;
				setEditEnable("LIST");
			    var xmlDoc = $.parseXML(saveXml);
			    var $xml1 = $(xmlDoc);
			    formObj.c_adjust_no.value = $xml1.find("adjust_no").text();
			    btn_Search("LIST");
			    showCompleteProcess(); // There is no complete msg after clicking the save button - 2017.02.07
			}else{
				ComShowCodeMessage("COM12151");
				return;
			}
//			ComShowCodeMessage("COM0093", ""); // Saved successfully.
		}
	}
}
function setEditEnable(pageTp) {
	var formObj=document.form;
	formObj.reason_cd.disabled = true;
	formObj.to_ea_qty.disabled= true;
	formObj.wh_pic_nm.disabled= true;
	formObj.owner_pic_nm.disabled= true;
	formObj.rmk.disabled= true;
	formObj.to_cbm.disabled= true;
	formObj.to_cbf.disabled= true;
	formObj.to_grs_kgs.disabled= true;
	formObj.to_grs_lbs.disabled= true;
	formObj.to_net_kgs.disabled= true;
	formObj.to_net_lbs.disabled= true;
	if (flg_new == false){
		formObj.reason_cd.required = false;
	}
	formObj.reason_cd.value="";
	formObj.reason_cd_1.value="";
	formObj.to_ea_qty.value=0;
	formObj.wh_pic_nm.value="";
	formObj.owner_pic_nm.value="";		
	formObj.rmk.value="";	
	if (pageTp == "MGMT") { // Inventory Adjustment
		formObj.reason_cd.disabled = false;
		formObj.to_ea_qty.disabled= false;
		formObj.wh_pic_nm.disabled= false;
		formObj.owner_pic_nm.disabled= false;
		formObj.rmk.disabled= false;
		formObj.to_cbm.disabled= false;
		formObj.to_cbf.disabled= false;
		formObj.to_grs_kgs.disabled= false;
		formObj.to_grs_lbs.disabled= false;
		formObj.to_net_kgs.disabled= false;
		formObj.to_net_lbs.disabled= false;
		formObj.reason_cd.value="";
		formObj.reason_cd_1.value="";
		formObj.to_ea_qty.value=0;
		formObj.wh_pic_nm.value="";
		formObj.owner_pic_nm.value="";		
		formObj.rmk.value="";	
		setShowRemark("MGMT");	
	} else if (pageTp == "LIST") { // Inventory Adjustment Search
		ComBtnDisable("btnSave");
		setShowRemark("LIST");	
	}
}
/**
 * 필수 표시 (*) 여부
 * @param pageTp
 */
function setShowRemark(pageTp) {
	var formObj=document.form;
	if (pageTp == "MGMT") { // Inventory Adjustment
		//document.all.show_reason.style.display="block";
		//document.all.hide_reason.style.display="none";
		//document.all.show_to_ea_qty.style.display="block";
		//document.all.hide_to_ea_qty.style.display="none";		
		//document.all.show_rmk.style.display="block";
		document.all.rmk.setAttribute("required", "required");
		document.all.to_ea_qty.setAttribute("required", "required");
		//document.all.hide_rmk.style.display="none";
	} else if (pageTp == "LIST") { // Inventory Adjustment Search
		//document.all.show_reason.style.display="none";
		//document.all.hide_reason.style.display="block";
		//document.all.show_to_ea_qty.style.display="none";
		//document.all.hide_to_ea_qty.style.display="block";		
		//document.all.show_rmk.style.display="none";
		//document.all.hide_rmk.style.display="block";	
		document.all.rmk.removeAttribute("required");
		document.all.to_ea_qty.removeAttribute("required");
	} 
}
/**
 * Close
 */
function btn_Close() {
	ComClosePopup(); 
	if (isSaveFlag) {
		var formObj=document.form;
		formObj.form_mode.value = "SAVE";
		btn_Search();
	}
}
function changeQty()
{
	var formObj = document.form;
	if (formObj.to_ea_qty.value == ""){
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
		if(WMS_CBM_POINT_COUNT == 3) {
			formObj.to_cbm.value = "0.000";
			formObj.to_cbf.value = "0.000";
		} else {
			formObj.to_cbm.value = "0.00000";
			formObj.to_cbf.value = "0.00000";
		}
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)
		formObj.to_grs_kgs.value = "0.000";
		formObj.to_grs_lbs.value = "0.000";
		formObj.to_net_kgs.value = "0.000";
		formObj.to_net_lbs.value = "0.000";
	} else {
		var qty=parseInt($("#to_ea_qty").val());
		var lv1_cbm=eval($("#lv1_cbm").val()) * qty;
		var lv1_cbf=eval($("#lv1_cbf").val()) * qty;
		var lv1_grs_kgs=eval($("#lv1_grs_kgs").val()) * qty;
		var lv1_grs_lbs=eval($("#lv1_grs_lbs").val()) * qty;
		var lv1_net_kgs=eval($("#lv1_net_kgs").val()) * qty;
		var lv1_net_lbs=eval($("#lv1_net_lbs").val()) * qty;
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
		$("#to_cbm").val(lv1_cbm.toFixed(parent.WMS_CBM_POINT_COUNT));
		$("#to_cbf").val(lv1_cbf.toFixed(parent.WMS_CBM_POINT_COUNT));
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)
		$("#to_grs_kgs").val(lv1_grs_kgs.toFixed(3));
		$("#to_grs_lbs").val(lv1_grs_lbs.toFixed(3));
		$("#to_net_kgs").val(lv1_net_kgs.toFixed(3));
		$("#to_net_lbs").val(lv1_net_lbs.toFixed(3));
	}
}
function checkNumFormat(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    srcNumber = srcNumber.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "0";
        obj.focus();
        return;
    }
    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }

    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);

    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    }
    return true;
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var formObj = document.form;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	var warehouse = formObj.wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if((warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btnSave");
	}else{
		ComBtnEnable("btnSave");
	}
}
