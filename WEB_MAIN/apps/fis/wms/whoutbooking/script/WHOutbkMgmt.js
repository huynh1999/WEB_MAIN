/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutbkMgmt.js
*@FileTitle  : Outbound Booking Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var uploadObjects=new Array();
var uploadCnt=0;
var fastOnLoadFlg=true;
var fastOwnerFlg=true;
var loading_flag="N";
var uploadflg =  false;
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	
 	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }	
	
	initCombo("fwd_dir");
	initCombo("bk_sts_cd");
	initCombo("order_rel");
	initCombo("ord_tp_cd");
	initCombo("load_tp_cd");
	
    loading_flag="Y";
	initControl();
	
	//Quick Search
	var vfwd_bk_no=formObj.c_wob_bk_no.value;
	if (vfwd_bk_no != "") {
		btn_Search();
	} else {
		wbNew(); // 초기화
	}
	if(formObj.uploadfile.value!="")
	{
		goTabSelect('04');
		btn_Search();
	}
	check_authority_wh(); // check authority warehouse
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 			'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm	("beforedeactivate", 	"frmObj_OnBeforeDeactivate",  document.form);
    axon_event.addListenerFormat("beforeactivate", 		"frmObj_OnBeforeActivate", document.form);
    axon_event.addListenerForm  ('keypress', 			'enter_Check',  document.form);
    //- 포커스 나갈때
	axon_event.addListenerForm	('blur', 	'form_deactivate', formObj);
	axon_event.addListenerForm	("keydown", 			"obj_keydown", formObj);
	axon_event.addListenerForm	("change", 				"form_onChange", formObj);
}

function initUpload(){
    /*upload1.Initialize({
         SaveUrl:'./addFileWHOutbk.clt'
        ,AdditionalParam:"FileUploadModule=OMS"
        ,Language:"en"
        ,ShowButtonArea: false
        ,ShowInfoArea: true
        ,ExtraForm: 'upLoadForm'
        ,ResponseType : 'xml'
        ,BeforeAddFile : function(result){  //파일추가전 발생 이벤트
            return true;
        }
        ,BeforeSaveStatus : function(result){   // 저장전 발생 이벤트
            return true;
        }
        ,AfterSaveStatus : function(result) {         // 저장후 발생 이벤트
            btn_Search();

        }
        ,AfterAddFile:function(result){         // 파일추가 후 발생 이벤트
            var files = upload1.GetList();
            var formObj=document.form;
            setFieldValue(formObj.file_path, files[0].GetFileName());
        }
    });
    var upload1_upload = document.getElementById('upload1_upload');
    upload1_upload.style.display = 'none';*/
}
function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=OMS', '');
}
/**
* IBSheet Object
*/

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}
function form_keyEnter(){
	
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
    if (vKeyCode == 13) {
		switch (srcName) {
			case "c_wob_bk_no":	
				if (!ComIsNull(srcValue)){
					btn_Search();
				}
				break;		
			default:				
				form_onChange();
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == "readonly"){
        	return false;
        } 
    } 
    return true;
}
function goTabSelect(isNumSep) {
	var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';

    //Container List 목록
    }else if( isNumSep == "02" ) {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        
    }else if( isNumSep == "03" ) {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        
    }else if( isNumSep == "04" ) {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "none";
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
		resizeSheet();
	});
}
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
    tabObjects[tabCnt++]=tab_obj;
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
 function initCombo(sComboId) {
	 
	 var formObj = document.form;
 	var i=0;
 	var vTextSplit=null;
 	var vCodeSplit=null;
 	
 	switch(sComboId) { 			
		case "fwd_dir":
			vTextSplit=fwd_dirText.split("|");
			vCodeSplit=fwd_dirCode.split("|");
			
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(sComboId, vCodeSplit[j], vTextSplit[j]);
			}
			
 			break;
 		case "bk_sts_cd":
			vTextSplit=bk_sts_cdText.split("|");
			vCodeSplit=bk_sts_cdCode.split("|");
			
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(sComboId, vCodeSplit[j], vTextSplit[j]);
			}
			
			formObj.bk_sts_cd.value = "N";
 			break;
 		case "order_rel":
			vTextSplit=order_relText.split("|");
			vCodeSplit=order_relCode.split("|");
			
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(sComboId, vCodeSplit[j], vTextSplit[j]);
			}
			
			formObj.bk_sts_cd.value = "P";
			
 			break;
 		case "wb_src_cd":
			vTextSplit=wb_src_cdText.split("|");
			vCodeSplit=wb_src_cdCode.split("|");	
			
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(sComboId, vCodeSplit[j], vTextSplit[j]);
			}
			
			formObj.bk_sts_cd.value = "M";
 			break;
		case "ord_tp_cd": // Order Type
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");
			
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(sComboId, vCodeSplit[j], vTextSplit[j]);
			}
			
			var def_ord_tp_cd = $("#def_ord_tp_cd").val().trim();
			
			if(def_ord_tp_cd == ""){
				formObj.ord_tp_cd.value = "G";
			}
			else{
				formObj.ord_tp_cd.value = def_ord_tp_cd;
			}
 			break; 	
		case "load_tp_cd":
			vTextSplit=load_tp_cdText.split("|");
			vCodeSplit=load_tp_cdCode.split("|");
			
			for(var j=0;j<vCodeSplit.length; j++){
				comboAddItem(sComboId, vCodeSplit[j], vTextSplit[j]);
			}
			
			formObj.load_tp_cd.value = "F";
			
 			break;
 	}
}  
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	        
	      var hdr1='||Item|Item Name|Item Lot No|Unit|Order\nQTY|Pack Master Info.|Order\nQTY(EA)|Stock\nQTY|Volume|Volume|GWT|GWT|NWT|NWT|Lot Property|Lot Property|Lot Property|Lot Property|Lot ID|Lot ID|Item Sub|SO No|Remark|Commercial Invoice|Commercial Invoice|sao_sys_no|item_sys_no|item_seq|ctrt_no|load_flg|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|INVALID_YN';
	      var hdr2='||Item|Item Name|Item Lot No|Unit|Order\nQTY|Pack Master Info.|Order\nQTY(EA)|Stock\nQTY|CBM |CFT|KG|LB|KG|LB|Inbound Date|Expiration Date|Lot 04|Lot 05|Lot ID |Sel|Item Sub|SO No|Remark|Currency|Unit Price|sao_sys_no|item_sys_no|item_seq|ctrt_no|load_flg|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|INVALID_YN';
	      var prefix="Grd01"; // Booking Item

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                  { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk" },
	             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",  KeyField:1,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pkg_info",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_ea_qty",  KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Int",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stock_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:75,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_04",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_05",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_lot_id",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
	             {Type:"Popup",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_id_img",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_item_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1,  Width:115,  Align:"Center",  ColMerge:1,   SaveName:prefix+"sao_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_remark",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo", 	Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"sao_sys_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"item_seq",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"load_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",  KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"invalid_yn",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(380);
	      SetEditable(1);
	      SetWaitImageVisible(0);
	      SetImageList(1,"web/images/common/icon_search_s.gif");
	      
	      SetColProperty(0 ,prefix+"item_cd", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"lot_no", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_nm", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"sao_no", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_pkgunit", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"curr_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      
	      SetColProperty(prefix+"curr_cd", {ComboText:"|"+currCdListText, ComboCode:"|"+currCdListCode} );
//	      SetColProperty(prefix+"item_pkgunit", {ComboText:"|"+UNITCDText, ComboCode:"|"+UNITCDCode} );
	      
	      SetAutoRowHeight(0);
	      SetHeaderRowHeight(30);
	      resizeSheet();
	      //no support[implemented common]CLT 				SelectHighLight=false;
	      }
	      break;


		case "sheet2":      //IBSheet2 init
		    with(sheetObj){
	        
	      var hdr1="|field_name|field_val|doc_type";
	      var prefix="Grd02";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"field_name", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"field_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_type",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(0);
	      SetWaitImageVisible(0);
	      SetRowHidden(0, 1);
	      SetHeaderRowHeight(30);
	      resizeSheet();
	      //no support[implemented common]CLT 				SelectHighLight=false;
	      }
	      break;


		case "sheet3":      //IBSheet3 init
		    with(sheetObj){
	        
	      var hdr1="|Seq|File Name (Click For Download)|Upload Date|Size(KB)|doc_no|file_path|file_sys_nm|svc_tp_cd|doc_ref_tp_cd|doc_tp_cd";
	      var prefix="Grd03"; // Attachment

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"Seq" },
	             {Type:"Text",      Hidden:0,  Width:800,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"upload_date",   KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_path",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_sys_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"svc_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_ref_tp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetEditable(0);
	      SetWaitImageVisible(0);
	      SetHeaderRowHeight(30);
	      resizeSheet();
	      }
	      break;

		case "sheet4":      //IBSheet1 init
		    with(sheetObj){
	        
	      var hdr1='||Item|Item Name|Item Lot No|Unit|Order\nQTY|Pack Master Info.|Order\nQTY(EA)|Stock\nQTY|Volume|Volume|GWT|GWT|NWT|NWT|Lot Property|Lot Property|Lot Property|Lot Property|Lot ID|Lot ID|Item Sub|SO No|Remark|Commercial Invoice|Commercial Invoice|sao_sys_no|item_sys_no|item_seq|ctrt_no|load_flg|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|INVALID_YN';
	      var hdr2='||Item|Item Name|Item Lot No|Unit|Order\nQTY|Pack Master Info.|Order\nQTY(EA)|Stock\nQTY|CBM |CFT|KG|LB|KG|LB|Inbound Date|Expiration Date|Lot 04|Lot 05|Lot ID |Sel|Item Sub|SO No|Remark|Currency|Unit Price|sao_sys_no|item_sys_no|item_seq|ctrt_no|load_flg|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|INVALID_YN';
	      var prefix="Grd01"; // Booking Item

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"},
	                  { Text:hdr2, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk" },
	             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:prefix+"lot_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",  KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pkg_info",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
	             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_ea_qty",  KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,UpdateEdit:0,   InsertEdit:0 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"stock_qty",    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_04",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_05",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_lot_id",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
	             {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_id_img",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:95,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_item_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:115,  Align:"Center",  ColMerge:1,   SaveName:prefix+"sao_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_remark",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"sao_sys_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"item_seq",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"load_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",  KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"invalid_yn",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(380);
	      SetEditable(1);
	      SetWaitImageVisible(0);
	      SetImageList(1,"web/images/common/icon_search_s.gif");
	      SetColProperty(0 ,prefix+"item_cd", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_nm", {AcceptKeys:"E|[" + FORMAT_CUSTOMER_CD + "]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_pkgunit", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"curr_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetAutoRowHeight(0);
	      //no support[implemented common]CLT 				SelectHighLight=false;
	      }
	      break;
	}
}

function resizeSheet(){
	 ComResizeSheet(sheet1);
	 ComResizeSheet(sheet2);
	 ComResizeSheet(sheet3);
	}
/** 
 * Booking Item 변경시
 */
function sheet1_OnChange(sheetObj, Row, Col, Value){
	
	var formObj = document.form;
	var prefix="Grd01";
	var srcName = sheetObj.ColSaveName(Col);
	
	if (srcName == (prefix+"item_cd")) { // Item
		if (Value != "") {
			// item code 변경시 Pack Master (TL_CTRT_CUST_ITEM)의 패키지 Level1 기본 정보를 가져온다
			var sParam = "ctrt_no=" + ComGetObjValue(formObj.ctrt_no) + "&item_cd=" + Value + "&f_cmd="+SEARCH01;
			
			var xml = sheet1.GetSearchData('./WHOutbkMgmtGS.clt',sParam);
			
			if( xml.indexOf('<ERROR>') != -1){
				//show message
			}else{
				
				if($($.parseXML(xml)).find('WHITEMCODEINFO').text() != ""){
					
					$Info = $($.parseXML(xml)).find('WHITEMCODEINFO');
					
					sheetObj.SetCellValue(Row, prefix+"item_sys_no",$Info.find( 'item_sys_no').text());
					sheetObj.SetCellValue(Row, prefix+"item_nm", $Info.find( 'item_nm').text());
					sheetObj.SetCellValue(Row, prefix+"lot_no", $Info.find( 'lot_no').text());
					sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty" , $Info.find( 'pkg_lv1_qty').text());
					sheetObj.SetCellValue(Row, prefix+"lv1_cbm", $Info.find( 'lv1_cbm').text());
					sheetObj.SetCellValue(Row, prefix+"lv1_cbf", $Info.find( 'lv1_cbf').text());
					sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs"  , $Info.find( 'lv1_grs_kgs').text());
					sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs"  , $Info.find( 'lv1_grs_lbs').text());
					sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs"  , $Info.find( 'lv1_net_kgs').text());
					sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs" , $Info.find( 'lv1_net_lbs').text());
					sheetObj.SetCellValue(Row, prefix+"item_remark"  , $Info.find( 'item_remark').text());
					sheetObj.SetCellValue(Row, prefix+"curr_cd"  , $Info.find( 'unit_curr_cd').text());
					sheetObj.SetCellValue(Row, prefix+"unit_price"  , $Info.find( 'unit_price').text());
					sheetObj.SetCellValue(Row, prefix+"pkg_info"  , $Info.find( 'pkg_info').text());
					
					if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {	
						sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
					} else {
						sheetObj.SetCellEditable(Row, prefix+"item_nm",1);
					}	
					
					
					
					if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
						// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
						fnCalcItemEaQty(sheetObj, Row, Col);
					} else {
						sheetObj.SetCellValue(Row, prefix+"item_pkgunit", "",0);					
						sheetObj.SetCellValue(Row, prefix+"item_pkgqty","",0);
						sheetObj.SetCellValue(Row, prefix+"item_ea_qty","",0);
						sheetObj.SetCellValue(Row, prefix+"item_cbm", "",0);
						sheetObj.SetCellValue(Row, prefix+"item_cbf","",0);
						sheetObj.SetCellValue(Row, prefix+"item_grs_kgs", "",0);
						sheetObj.SetCellValue(Row, prefix+"item_grs_lbs", "",0);
						sheetObj.SetCellValue(Row, prefix+"item_net_kgs", "",0);
						sheetObj.SetCellValue(Row, prefix+"item_net_lbs", "",0);
					}
				}else{
					 var prefix="Grd01"; // Booking Item
					ComShowCodeMessage('COM0185', '');
					sheetObj.SelectCell(Row,prefix+"item_cd",1);
				}
			}
			
		} else {
			sheetObj.SetCellValue(Row, prefix+"item_sys_no","",0);
			sheetObj.SetCellValue(Row, prefix+"item_cd", "",0);
			sheetObj.SetCellValue(Row, prefix+"item_nm", "",0);
			sheetObj.SetCellValue(Row, prefix+"lot_no", "",0);
			sheetObj.SetCellValue(Row, prefix+"item_pkgunit", "",0);			
			sheetObj.SetCellValue(Row, prefix+"item_pkgqty","",0);
			sheetObj.SetCellValue(Row, prefix+"item_ea_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm", "",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf", "",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_remark","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info","",0);
			
			//fnSetItemEditable(sheetObj, Row, "");
		}				
    } else if (srcName == (prefix + "item_pkgunit") || srcName == (prefix+"item_pkgqty")) {	
//		if (!ComIsNull(Value)) {
//			searchPkgUnitInfo(formObj, Value, srcName);
//		}
    	
		// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다 
    	fnCalcItemEaQty(sheetObj, Row, Col);    	
    	
	} else if (srcName == (prefix+"item_cbf") && Value != "") {
		funcKGS_CBM_CAC("CBF_CBM", (prefix+"item_cbf"), (prefix+"item_cbm"), sheetObj);		
	}else if (srcName == (prefix+"item_cbm") && Value != "") {
		funcKGS_CBM_CAC("CBM_CBF", (prefix+"item_cbm"), (prefix+"item_cbf"), sheetObj);		
	} else if (srcName == (prefix+"item_grs_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (prefix+"item_grs_lbs"), (prefix+"item_grs_kgs"), sheetObj);		
	} else if (srcName == (prefix+"item_grs_kgs") && Value != "") {
		funcKGS_CBM_CAC("KG_LB", (prefix+"item_grs_kgs"), (prefix+"item_grs_lbs"), sheetObj);		
	}else if (srcName == (prefix+"item_net_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (prefix+"item_net_lbs"), (prefix+"item_net_kgs"), sheetObj);		
	}else if (srcName == (prefix+"item_net_kgs") && Value != "") {
		funcKGS_CBM_CAC("KG_LB", (prefix+"item_net_kgs"), (prefix+"item_net_lbs"), sheetObj);		
	} else if(srcName == prefix + "curr_cd") {
		if (!ComIsNull(Value)){
			searchGrdCurrInfoInfo(formObj, Value, srcName);
		}
	}
}
/*
 * CBF -> CBM, LBS -> KGS 계산 스크립트 => CoCommon.js 정의
 */

function funcKGS_CBM_CAC(command, obj, obj2) {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var currow=0;	
	currow=sheetObj.GetSelectRow();
	if (command == "LB_KG") { // GWT / NWT
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "KG_LB") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "CBF_CBM") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * 0.028317), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}	else if (command == "CBM_CBF") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / 0.028317), 3);
		lb_amt=lb_amt * 100000;
		lb_amt=Math.round(lb_amt);
		lb_amt=lb_amt / 100000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}
}
function searchPkgUnitInfo(form, value, col_nm){
	var sheetObj=sheet1;
	var prefix="Grd01";
 	var sXml=sheetObj.GetSearchData("searchCommonCodeInfo.clt", "grp_cd=A6&code_cd="+value);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_pkgunit","",0);
		sheetObj.SelectCell(sheetObj.GetSelectRow(), prefix+"item_pkgunit");
		return;
	}
	if( col_nm == prefix + "item_pkgunit"){ 
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_pkgunit",getXmlDataNullToNullString(sXml,'code_cd'),0);
	}	
}
function searchGrdCurrInfoInfo(form, value, col_nm){
//	var sheetObj=sheet1;
//	var prefix="Grd01";
// 	var sXml=sheetObj.GetSearchData("searchCommonCodeInfo.clt", "grp_cd=C010&code_cd="+value);
//	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd","",0);
//		sheetObj.SelectCell(sheetObj.GetSelectRow(), prefix+"curr_cd");
//		return;
//	}
//	if( col_nm == prefix + "curr_cd"){ 
//		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",getXmlDataNullToNullString(sXml,'code_cd'),0);
//	}	
}
/**
 * Booking Item 조회 완료시
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	
	var formObj = document.form;
	var prefix="Grd01";	
	
	var item_pkgqty=0;
	var stock_qty=0;
	
	var rowcnt=sheetObj.RowCount();
	for (var i=0; i <= rowcnt; i++) {
		setItemSheetEditable(sheetObj, i+sheetObj.HeaderRows(), formObj.bk_sts_cd.value);
		setBookingItemGetCellEditable(sheetObj, i+sheetObj.HeaderRows());
		
		/*
		 * TinLuong Modification 20160325
		 */
		/*
		if(uploadflg == true ){
		sheetObj.SetCellValue(i + sheetObj.HeaderRows(), prefix+"load_flg","N",0);
		base_process(sheetObj, i + sheetObj.HeaderRows(), "");
		sheet1.SetCellValue(i + sheetObj.HeaderRows(),prefix+"ibflag", 'I', 0);
		}
		*/
	}
	uploadflg = false;
	sheetObj.SetSumText(2, "TOTAL");
	sheetObj.SetCellAlign(sheetObj.LastRow(), 2, "Center");
	doHideProcess();
	check_authority_wh();
	
}
function sheet3_OnSearchEnd(sheetObj, ErrMsg) {
	sheetObj.SetColFontUnderline(2,1);
	
	doHideProcess();
}
function sheet3_OnDblClick(sheetObj, Row, Col){
	var formObj1=document.frm1;
	var sName=sheetObj.ColSaveName(Col);
	var fix_grid = 'Grd03';
	if (sName == "Grd03file_org_nm") {
		formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid + "file_path") + sheetObj.GetCellValue(Row, fix_grid + "file_sys_nm");
		formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid + "file_org_nm");
		formObj1.submit();
		showCompleteProcess();
	}
}
function sheet1_OnClick(sheetObj, Row, Col) {
//	var formObj=document.form;
//	var colName=sheetObj.ColSaveName(Col);
//	var prefix="Grd01";
//	var sbk_sts_cd=bk_sts_cd.value;
//	if ("N" == sbk_sts_cd) { // Booked
//		if (colName == (prefix+"lot_id_img")) {			
//			// Item 저장후 조회시 System Lot Select Popup 조회 버튼 선택불가
//			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"fix_lot_id"))) {
//				return;	
//			}
//			// Contract No 체크
//			if (isNull(formObj.ctrt_no)) {
//				ComShowCodeMessage("COM0278", "Contract No");
//				formObj.ctrt_no.focus();
//				return;
//			}			
//			// Owner 체크
//			if (isNull(formObj.owner_cd)) {
//				ComShowCodeMessage("COM0278", "Owner");
//				formObj.owner_cd.focus();
//				return;
//			}			
//			// Item
//			if (isEmpty2(sheetObj.GetCellValue(Row, prefix+"item_cd"))) {
//				ComShowCodeMessage("COM0162", Row-1, "Item");
//				sheetObj.SelectCell(Row, prefix+"item_cd",1);
//				return;				
//			}			
//			var sParam="ctrt_no=" + formObj.ctrt_no;
//			sParam += "&ctrt_nm=" + formObj.ctrt_nm;
//			sParam += "&wh_cd=" + formObj.wh_cd;
//			sParam += "&wh_nm=" + formObj.wh_nm;			
//			sParam += "&owner_cd=" + formObj.owner_cd;
//			sParam += "&owner_nm=" + formObj.owner_nm;
//			sParam += "&item_cd=" + sheetObj.GetCellValue(Row, prefix+"item_cd");
//			sParam += "&item_nm=" + sheetObj.GetCellValue(Row, prefix+"item_nm");
//			sParam += "&call_tp=G"; // grid에서 호출	
//			sParam += "&f_alloc_flg=Y"; //가능재고 체크를 위하여
//		   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
////			ComOpenPopup(sUrl, 1050, 550, "setStockInfoGrid", "0,0", true);
//		   	callBackFunc = "setStockInfoGrid";
//			modal_center_open(sUrl, callBackFunc, 1050,550,"yes");
//		}
//	}
}

function setStockInfoGrid(aryPopupData) {
	var sheetObj=sheet1;
	var prefix="Grd01";	
	
	if(aryPopupData != null && aryPopupData != "" && aryPopupData != 'undefined' && aryPopupData != undefined){
		
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_cd",aryPopupData[0]["item_cd"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"fix_lot_id",aryPopupData[0]["fix_lot_id"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"inbound_dt",aryPopupData[0]["inbound_dt"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",aryPopupData[0]["lot_no"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm",aryPopupData[0]["item_nm"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"exp_dt",aryPopupData[0]["exp_dt"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_04",aryPopupData[0]["lot_04"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_05",aryPopupData[0]["lot_05"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_sys_no",aryPopupData[0]["item_sys_no"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_qty",aryPopupData[0]["pkg_lv1_qty"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbm",aryPopupData[0]["lv1_cbm"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbf",aryPopupData[0]["lv1_cbf"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_kgs",aryPopupData[0]["lv1_grs_kgs"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_lbs",aryPopupData[0]["lv1_grs_lbs"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_kgs",aryPopupData[0]["lv1_net_kgs"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_lbs",aryPopupData[0]["lv1_net_lbs"],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_info",aryPopupData[0]["pkg_info"],0);
//		sheetObj.GetCellImage(sheetObj.SetSelectRow,  prefix+"lot_id_img")("lot_id_img");
		setBookingItemGetCellEditable(sheetObj, sheetObj.GetSelectRow());
	}
}
function sheet2_OnSearchEnd(sheetObj, ErrMsg){
	var prefix="Grd02";
	for(var i=sheetObj.HeaderRows(); i < (sheetObj.RowCount()+sheetObj.HeaderRows()) ; i++){
		sheetObj.SetCellBackColor(i, prefix+"field_name","#D9E5FF");
 		sheetObj.SetCellFontColor(i, prefix+"field_val","#0000FF");
 		sheetObj.SetCellFont("FontBold", i, prefix+"field_name",1);
	}
}
/**
 * Doc Detail sheet 더블클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet2_OnDblClick(sheetObj, Row, Col) {
	var formObj=document.form;	
	var prefix="Grd02";
	var sName=sheetObj.ColSaveName(Col);
	var sValue=sheetObj.GetCellValue(Row, Col);
	if (!isNull2(sValue) && sName == (prefix+"field_val")) {
		if ("AL" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Allocation
			var sParam="wob_bk_no="+formObj.wob_bk_no.value;
			var sUrl="./AllcMgmt.clt?"+sParam;
			parent.mkNewFrame("Allocation Management", sUrl, "AllcMgmt_"+sParam);
		} else if ("WV" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Allocation
			var sParam="wave_no="+sValue;
			var sUrl="./WaveMgmt.clt?"+sParam;
			parent.mkNewFrame("Wave", sUrl, "WaveMgmt_" + sParam);
		}
		else if ("OCBK" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Outbound Complete by Booking
			var sUrl="./WHOCUpdate.clt?search_no="+sValue+"&search_tp=WOB_OUT_NO&search_div=bk";			
			parent.mkNewFrame("Outbound Complete Update", sUrl, "WHOCUpdate_" + sValue + "_" + "WOB_OUT_NO_"+"bk");
		} else if ("LP" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Load Plan
			var sUrl="./LoadPlanMgmt.clt?s_consol_no="+sValue;
			parent.mkNewFrame('Loading Plan Creation', sUrl, "LoadPlanMgmt_"+sValue);
		} else if ("OCLP" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Outbound Complete by Load Plan
			var sUrl="./WHOCUpdate.clt?search_no="+sValue+"&search_tp=LP_NO&search_div=lp";
			parent.mkNewFrame("Outbound Complete Update", sUrl, "WHOCUpdate_" + sValue + "_LP_NO_" + "lp");
		}
	}
}
function sheet2_OnMouseMove(sheetObj,Button, Shift, X, Y){
	var col=sheetObj.MouseCol();
    var row=sheetObj.MouseRow();
    var colName=sheetObj.ColSaveName(col);
    if(colName == "field_val"){
     	var check=sheetObj.GetCellFont("FontBold",row,col);
    	if(check == true){
    		sheetObj.SetMousePointer("Hand");
    	}else{
    		sheetObj.SetMousePointer("Default");
    	}   
    }    
}
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	
	with(sheetObj)
	{
		if (colName == (prefix+"item_cd") ) {
		   	var sUrl="./CtrtItemPopup.clt?ctrt_no="+formObj.ctrt_no.value+"&item_cd="+colValue+"&item_nm="+sheetObj.GetCellValue(Row, prefix+"item_nm");
//			ComOpenPopup(sUrl, 400, 560, "setItemGrid", "0,0", true);
		   	callBackFunc = "setItemGrid";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
		}else if (colName == (prefix+"item_pkgunit") ) {
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&wh_flag=Y&ctrt_no="+formObj.ctrt_no.value+"&item_sys_no="+sheetObj.GetCellValue(Row, (prefix+"item_sys_no"));
//			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true);
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400,520,"yes");
		}
		else if (colName == (prefix+"lot_id_img") ) {
			
			var sbk_sts_cd= formObj.bk_sts_cd.value;
			if ("N" == sbk_sts_cd) { // Booked
				// Item 저장후 조회시 System Lot Select Popup 조회 버튼 선택불가
				if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"fix_lot_id"))) {
					return;	
				}
				// Contract No 체크
				if (isNull(formObj.ctrt_no)) {
					ComShowCodeMessage("COM0278", "Contract No");
					formObj.ctrt_no.focus();
					return;
				}			
				// Owner 체크
				if (isNull(formObj.owner_cd)) {
					ComShowCodeMessage("COM0278", "Owner");
					formObj.owner_cd.focus();
					return;
				}			
				// Item
				if (isEmpty2(sheetObj.GetCellValue(Row, prefix+"item_cd"))) {
					ComShowCodeMessage("COM0162", Row-1, "Item");
					sheetObj.SelectCell(Row, prefix+"item_cd",1);
					return;				
				}			
				var sParam="ctrt_no=" + formObj.ctrt_no.value;
				sParam += "&ctrt_nm=" + formObj.ctrt_nm.value;
				sParam += "&wh_cd=" + formObj.wh_cd.value;
//				sParam += "&wh_nm=" + formObj.wh_nm;			
				sParam += "&owner_cd=" + formObj.owner_cd.value;
				sParam += "&owner_nm=" + formObj.owner_nm.value;
				sParam += "&item_cd=" + sheetObj.GetCellValue(Row, prefix+"item_cd");
				sParam += "&item_nm=" + sheetObj.GetCellValue(Row, prefix+"item_nm");
				sParam += "&call_tp=G"; // grid에서 호출	
				sParam += "&f_alloc_flg=Y"; //가능재고 체크를 위하여
			   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
//				ComOpenPopup(sUrl, 1050, 550, "setStockInfoGrid", "0,0", true);
			   	callBackFunc = "setStockInfoGrid";
				modal_center_open(sUrl, callBackFunc, 1280, 720,"yes");
			}
			
		}
	}
}
function setItemGrid(aryPopupData){
	
	var formObj=document.form;
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	
		 	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_cd",		rtnValAry[0],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm",		rtnValAry[1],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"ctrt_no",		rtnValAry[2],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_sys_no",	rtnValAry[3],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",			rtnValAry[4],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_qty",	rtnValAry[7],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbm",		rtnValAry[8],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbf",		rtnValAry[9],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_kgs",	rtnValAry[10],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_lbs",	rtnValAry[11],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_kgs",	rtnValAry[12],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_lbs",	rtnValAry[13],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_remark",	rtnValAry[14],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_info",		rtnValAry[20],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",		rtnValAry[21],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unit_price",		rtnValAry[22],0);
			
			if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm"))) {
				sheetObj.SetCellEditable(sheetObj.GetSelectRow(), prefix+"item_nm",0);
			}
			// item sys no 존재시					
			if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix + "item_sys_no"))) {
				// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
				fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), "");
			}	
	 }
}
function setLotInfoGrid(aryPopupData){
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"inbound_dt",aryPopupData[0][2],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",aryPopupData[0][3],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"exp_dt",aryPopupData[0][4],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_04",aryPopupData[0][5],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_05",aryPopupData[0][6],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"fix_lot_id",aryPopupData[0][7],0);
			setBookingItemGetCellEditable(sheetObj, sheetObj.GetSelectRow());
	 }
	
	
}
function setPkgunitGrid(aryPopupData){
	
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	
		 	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_pkgunit",rtnValAry[1],0);
			// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
			fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
	 }
	
}
function setCurrCdGrid(aryPopupData){
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	
		 	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",rtnValAry[1],0);
	 }
	
}

function doWork(srcName, objCode, objName){
	
	tempObjCode = objCode;
	 tempObjName = objName;
	
//	if(!btnGetVisible(srcName)){
//		return;
//	}
	var formObj = document.form;
	
    switch(srcName) {
    
	case "SEARCHLIST":	
		btn_Search();
		break;
	case "SAVE":	
		btn_Save();
		break;
	case "btn_copy":	
		btn_Copy();
		break;
	case "btn_reinstate":
//		ComShowCodeMessage('COM132612');
//		return;
		btn_reinstate();
		break;
	case "NEW":	
		btn_New();
		break;
	case "btn_cancel":
//		ComShowCodeMessage('COM132612');
//		return;
		btn_Cencel();
		break;
	case "btn_ctrt_no":	
		getBtn_ctrt_no();
		break;
	case "excel_upload":
		
//		var listObj = [];
//		
//		for(var i = sheet1.HeaderRows(); i < sheet1.HeaderRows() + sheet1.RowCount(); i++){
//			
//			var obj = {};
//			
//			var bgnIndx = sheet1.SaveNameCol('Grd01item_cd');
//			var endIndx = sheet1.SaveNameCol('Grd01invalid_yn');
//			
//			for(var j = bgnIndx ; j <= endIndx; j++){
//				
//				obj[sheet1.ColSaveName(j)] = sheet1.GetCellValue(i,j);
//				
//				//eval("obj." + sheet1.ColSaveName(j) + "=sheet1.GetCellValue("+i+","+"j)");
//			}
//			
//			listObj.splice(listObj.length, 0, obj);
//		}
		excel_upload();
		break;
	case "template_download":	
		template_download();
		break;
	case "btn_add":	
		row_Add();
		break;
	case "bk_item_row_delete":	
		bk_item_row_delete();
		break;
	case "stock_selection":	
		stock_selection();
		break;
	case "btn_Excel":
		btn_Excel();
		break;
	case "btn_file_upload":
		
		btn_File_Upload();
		break;
	case "lnk_allocation":
//		ComShowCodeMessage('COM132612');
//		return;
		lnk_allocation();
		break;
	case "lnk_work_order":
		ComShowCodeMessage('COM132612');
		return;
		lnk_work_order();
		break;
	case "lnk_load_plan":
//		ComShowCodeMessage('COM132612');
//		return;
		lnk_load_plan();
		break;
	case "lnk_outbound":
//		ComShowCodeMessage('COM132612');
//		return;
		lnk_outbound();
		break;
	case "lnk_svo":	
		ComShowCodeMessage('COM132612');
		return;
		lnk_svo();
		break;
	case "lnk_print":
		//ComShowCodeMessage('COM132612');
		//return;
		lnk_print();
		break;
	case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		
   		rtnary=new Array(2);
   		rtnary[0]="1";
   		// 2011.12.27 value parameter
   		if(typeof(formObj.vsl_cd)!='undefined'){
   			rtnary[1]=formObj.vsl_nm.value;
   			rtnary[2]=formObj.vsl_cd.value;
   		}else{
   			rtnary[1]="";
   			rtnary[2]="";
   		}
   		callBackFunc = "VESSEL_POPLIST";
		modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
		break;
	case "btn_file_delete":
		btn_File_Delete();
		break;
    }
}

function TRDP_POP(codeObj, nameObj){
	g_codeObj = codeObj;
	
	rtnary=new Array(2);
	rtnary[0]="1";
	
	// 2011.12.27 value parameter
	if(typeof(nameObj)!='undefined'){
		rtnary[1]=nameObj.value;
	}else{
		rtnary[1]="";
	}
	rtnary[2]=window;
	callBackFunc = "CB_TRDP_POP";
	modal_center_open('./CMM_POP_0010.clt?callTp='+"", rtnary, 1150,650,"yes");
}

function LOCATION_POP(codeObj, nameObj){
	g_codeObj = codeObj;
	g_nameObj = nameObj;
	rtnary=new Array(3);
	rtnary[0]="";
	
	rtnary[1]="IT";
	if(typeof(nameObj)!='undefined'){
		rtnary[2]=nameObj.value;
	}else{
		rtnary[2]="";
	}
	rtnary[3]=codeObj.value;
	
	callBackFunc = "CB_LOCATION_POP";
	modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
}

function VESSEL_POPLIST(rtnPopAry){
	
	if(rtnPopAry == "" || rtnPopAry == undefined || rtnPopAry == "undefined"){
		return;
	}else{
		
		var frmObj = document.form;
		
		var rtnAry = rtnPopAry.split('|');
		
		frmObj.vsl_cd.value = rtnAry[0];
		frmObj.vsl_nm.value = rtnAry[1];
	}
	
}

function CB_LOCATION_POP(rtnVal){
	var formObj = document.form;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		g_codeObj.value = rtnValAry[0];
		g_nameObj.value = rtnValAry[2];
	}
}

function CB_TRDP_POP(rtnVal){
	var formObj = document.form;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		var sName = g_codeObj.name.substring(0,g_codeObj.name.indexOf("_cd"));
		
		if(sName == "carrier"){
			formObj.carrier_cd.value=rtnValAry[0];//trdp_cd
			formObj.carrier_nm.value=rtnValAry[2];//full_nm
		}else if(sName == 'owner' || sName == 'supp' || sName == 'buyer'){
			
			setFieldValue(eval("formObj."+sName+"_cd"),rtnValAry[0]);
			setFieldValue(eval("formObj."+sName+"_nm"),rtnValAry[2]);
			setFieldValue(eval("formObj."+sName+"_addr1"),rtnValAry[7]);
//			setFieldValue(eval("formObj."+sName+"_addr4"),"");
//			setFieldValue(eval("formObj."+sName+"_addr5"),"");
			
//			var addrArr = rtnValAry[7].split('\n');
//			
//			for(var i = 0 ; i < addrArr.length; i++){
//				if(i == 0){
//					setFieldValue(eval("formObj."+sName+"_addr1"),addrArr[i]);
//				}else if ( i == 1){
//					setFieldValue(eval("formObj."+sName+"_addr2"),addrArr[i]);
//				}else {
//					setFieldValue(eval("formObj."+sName+"_addr3"),addrArr[i]);
//				}
//			}
		}
	}
}

function ajaxTradePaner(codeObj){
	var formObj=document.form;
	g_codeObj = codeObj;
	
	if(codeObj.value.trim() == ""){
		var sName = g_codeObj.name.substring(0,g_codeObj.name.indexOf("_cd"));
		
		if(sName == "carrier"){
			formObj.carrier_cd.value="";	//trdp_cd  AS param1
			formObj.carrier_nm.value="";	//eng_nm   AS param2
		}else if(sName == 'owner' || sName == 'supp' || sName == 'buyer'){
			
			setFieldValue(eval("formObj."+sName+"_cd"),"");
			setFieldValue(eval("formObj."+sName+"_nm"),"");
			setFieldValue(eval("formObj."+sName+"_addr1"),"");
//			setFieldValue(eval("formObj."+sName+"_addr2"),"");
//			setFieldValue(eval("formObj."+sName+"_addr3"),"");
//			setFieldValue(eval("formObj."+sName+"_addr4"),"");
//			setFieldValue(eval("formObj."+sName+"_addr5"),"");
		}
		return;
	}
	
	ajaxSendPost(CB_ajaxTradePaner, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode"+"&s_code="+codeObj.value, "./GateServlet.gsl");
}

function CB_ajaxTradePaner(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	
	if(doc[0]=='OK'){
		var sName = g_codeObj.name.substring(0,g_codeObj.name.indexOf("_cd"));
		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			if(sName == "carrier"){
				formObj.carrier_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.carrier_nm.value=masterVals[3];	//eng_nm   AS param2
			}else if(sName == 'owner' || sName == 'supp' || sName == 'buyer'){
				
				setFieldValue(eval("formObj."+sName+"_cd"),masterVals[0]);
				setFieldValue(eval("formObj."+sName+"_nm"),masterVals[3]);
				setFieldValue(eval("formObj."+sName+"_addr1"),masterVals[1]);
//				setFieldValue(eval("formObj."+sName+"_addr4"),"");
//				setFieldValue(eval("formObj."+sName+"_addr5"),"");
				
//				var addrArr = masterVals[1].split('\n');
//				
//				for(var i = 0 ; i < addrArr.length; i++){
//					if(i == 0){
//						setFieldValue(eval("formObj."+sName+"_addr1"),addrArr[i]);
//					}else if ( i == 1){
//						setFieldValue(eval("formObj."+sName+"_addr2"),addrArr[i]);
//					}else {
//						setFieldValue(eval("formObj."+sName+"_addr3"),addrArr[i]);
//					}
//				}
			}
			
		}else{

			if(sName == "carrier"){
				formObj.carrier_cd.value="";	//trdp_cd  AS param1
				formObj.carrier_nm.value="";	//eng_nm   AS param2
			}else if(sName == 'owner' || sName == 'supp' || sName == 'buyer'){
				
				setFieldValue(eval("formObj."+sName+"_cd"),"");
				setFieldValue(eval("formObj."+sName+"_nm"),"");
				setFieldValue(eval("formObj."+sName+"_addr1"),"");
//				setFieldValue(eval("formObj."+sName+"_addr2"),"");
//				setFieldValue(eval("formObj."+sName+"_addr3"),"");
//				setFieldValue(eval("formObj."+sName+"_addr4"),"");
//				setFieldValue(eval("formObj."+sName+"_addr5"),"");
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
}

function ajaxVessel(codeObj, nameObj){
	var formObj=document.form;
	g_codeObj = codeObj;
	g_nameObj = nameObj;
	
	if(codeObj.value.trim() == ""){
		codeObj.value = "";
		nameObj.value = "";
		return;
	}
	
	ajaxSendPost(CB_ajaxVessel, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=srvessel"+"&s_code="+codeObj.value, "./GateServlet.gsl");
}

function CB_ajaxVessel(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			g_codeObj.value = masterVals[0];
			g_nameObj.value = masterVals[2];
		}else{
			g_codeObj.value = "";
			g_nameObj.value = "";
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
}
	
//화면 Merge 컬럼 Name
	var InputName="wob_bk_no|ctrt_no|ctrt_nm|ctrt_cust_cd|bk_stff_ofc_cd|bk_stff_ofc_nm|bk_stff_id|bk_stff_nm|wh_cd|bk_date|ord_tp_cd|ord_tp_cd_1|bk_sts_cd|bk_sts_cd_1|est_out_dt|load_tp_cd|load_tp_cd_1|fwd_dir|fwd_dir_1|order_rel|order_rel_1|main_svc_type";
	InputName += "|main_svc_tp_nm|ctrt_ord_tp_nm|owner_cd|owner_nm|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|supp_cd|supp_nm|supp_addr1|supp_addr2|supp_addr3|supp_addr4|supp_addr5|supp_type|buyer_cd|buyer_nm|buyer_addr1|buyer_addr2";
	InputName += "|buyer_addr3|buyer_addr4|buyer_addr5|buyer_type|cust_ord_no|commc_inv_no|dlv_ord_no|job_no|rmk|vsl_cd|vsl_nm|voy|hbl_no|mbl_no|carrier_cd|carrier_nm|pol|pol_nm|etd";
	InputName += "|pod|pod_nm|eta|del|del_nm|est_cmpl_dt|src_cd|wave_no|req_dept|req_applicant|src_tp_cd|ref_no|rtp_no|so_no";
/**
 * Search
 */
function btn_Search() {
	var formObj=document.form;
	var sheetObj=sheet1;
	if(loading_flag != "Y"){
		return;
	}
	if(isNull(formObj.c_wob_bk_no)){
		ComShowCodeMessage("COM0125","Booking No");
		formObj.c_wob_bk_no.focus();
		return ;
	}
	doShowProcess();
	setTimeout(function(){
		sheet1.RemoveAll();
		sheet2.RemoveAll();
		sheet3.RemoveAll();
		formObj.logo_rectangle.value = "";
//		sheet4.RemoveAll();
		//Attachment 탭 초기화
		setFieldValue(formObj.file_path, "");
		formObj.f_cmd.value = SEARCH;
	     var sXml=sheetObj.GetSearchData("./WHOutbkMgmtGS.clt", FormQueryString(formObj));
		
		if( sXml.indexOf('<ERROR>') != -1){
			//show message
		}else{
			$Info = $($.parseXML(sXml)).find('INFO');
			
			if($Info.find('wob_bk_no').text() == ""){
				var wob_bk_no=formObj.c_wob_bk_no.value;	
				ComShowCodeMessage("COM0192");
				wbNew();
				setFieldValue(formObj.c_wob_bk_no,	wob_bk_no);
				formObj.c_wob_bk_no.focus();
			}else{
				displayData($Info, InputName);
				
				formObj.bk_sts_cd_1.value = formObj.bk_sts_cd.value;
				formObj.ord_tp_cd_1.value = formObj.ord_tp_cd.value;
				formObj.load_tp_cd_1.value = formObj.load_tp_cd.value;
				formObj.fwd_dir_1.value = formObj.fwd_dir.value;
				formObj.order_rel_1.value = formObj.order_rel.value;
				
//				$sheet1XML = $($.parseXML(sXml)).find('SHEET1');
//				sheet1.LoadSearchData($sheet1XML[0].innerHTML);
				
				var sheet1XML = getSheetXmlStr(sXml, '1');
				sheet1.LoadSearchData(sheet1XML);
				
//				$sheet2XML = $($.parseXML(sXml)).find('SHEET2');
//				sheet2.LoadSearchData($sheet2XML[0].innerHTML);
				
				var sheet2XML = getSheetXmlStr(sXml, '2');
				sheet2.LoadSearchData(sheet2XML);
				
//				$sheet3XML = $($.parseXML(sXml)).find('SHEET3');
//				sheet3.LoadSearchData($sheet3XML[0].innerHTML);
				
				var sheet3XML = getSheetXmlStr(sXml, '3');
				sheet3.LoadSearchData(sheet3XML);
				
				setFieldValue(formObj.form_mode, "UPDATE");
				//Attachment
				ComBtnEnable("btn_file_upload");
				ComBtnEnable("btn_file_delete");
				var vBkSts=formObj.bk_sts_cd.value; // Booking Status
				formObj.issue.checked=false;
				formObj.bk_sts_cd.disabled = true;
				formObj.fwd_dir.disabled = true;
				formObj.order_rel.disabled = true;
				if (vBkSts == "N") { // Booked
					ComEnableObject(formObj.ctrt_no, false);
					/*
				    - Disabled=false
				      Save, Cancel, Shipper, Shipper 버튼,  Issue 체크버튼, Item(ADD, Excel Upload, Templete Download, DEL)
				    - Disabled=true
				      Contract No, Contract 버튼, Work Order, Cargo Receipt, Reinstate, SVO Freight
					*/
					ComBtnEnable("btn_save");
					ComBtnEnable("btn_cancel");
					ComBtnDisable("lnk_allocation");
					ComBtnDisable("lnk_work_order");
					ComBtnDisable("lnk_load_plan");
					ComBtnDisable("lnk_outbound");
					ComBtnDisable("lnk_svo");
					ComBtnDisable("lnk_print");
//					ComEnableObject(formObj.wh_cd, true);	
					formObj.wh_cd.disabled = false;
					formObj.ord_tp_cd.disabled = false;
					formObj.load_tp_cd.disabled = false;
					ComEnableObject(formObj.est_out_dt, true);	
					ComBtnEnable("btn_est_out_dt");
					ComEnableObject(formObj.owner_cd, true);
					ComEnableObject(formObj.supp_cd, true);
					ComBtnEnable("btn_owner");
					//ComBtnEnable("btn_owner1");
					ComBtnEnable("btn_supp");
					//ComBtnEnable("btn_supp1");
					ComBtnEnable("excel_upload");
					ComBtnEnable("template_download");
					ComBtnEnable("btn_add");
					ComBtnEnable("bk_item_row_delete");
					ComBtnEnable("stock_selection");
					formObj.issue.disabled=false;
					ComEnableObject(formObj.ctrt_no, false);
					ComBtnDisable("btn_ctrt_no");
					ComBtnDisable("btn_reinstate");
					setFieldValue(formObj.temp_ctrt_no, formObj.ctrt_no.value);
				} else if (vBkSts == "I") { // Issued
					/*
					@param flg 1:버튼, 2:링크, 3: 돋보기, 4:상세 돋보기, 5:달력 
					- Disabled=false
					  Reinstate, Save, Cancel, Work Order, Cargo Receipt, SVO Freight
					- Disabled=true
					  Contract No, Contract 버튼, Shipper, Shipper 버튼,  Issue 체크버튼, 
					  Item(ADD, Excel Upload, Templete Download, DEL) 
					 */
					ComBtnEnable("btn_reinstate");
					ComBtnEnable("btn_save");
					ComBtnEnable("btn_cancel");
					ComBtnEnable("lnk_allocation");
					ComBtnEnable("lnk_work_order");
					ComBtnEnable("lnk_load_plan");
					ComBtnEnable("lnk_outbound");
					ComBtnEnable("lnk_svo");
					ComBtnEnable("lnk_print");
//					ComEnableObject(formObj.wh_cd, false);	
					formObj.wh_cd.disabled = true;
					formObj.ord_tp_cd.disabled = true;
					formObj.load_tp_cd.disabled = true;
					ComEnableObject(formObj.est_out_dt, false);	
					ComBtnDisable("btn_est_out_dt");
					ComEnableObject(formObj.ctrt_no, false);
					ComBtnDisable("btn_ctrt_no");
					ComEnableObject(formObj.owner_cd, false);
					ComEnableObject(formObj.supp_cd, false);
					ComBtnDisable("btn_owner");
					//ComBtnDisable("btn_owner1");
					//setEnableSubBtn("btn_owner1", false);
					ComBtnDisable("btn_supp");
					//ComBtnDisable("btn_supp1");
					//setEnableSubBtn("btn_supp1", false);
					formObj.issue.disabled=true;
					ComBtnDisable("excel_upload");
					ComBtnDisable("template_download");
					ComBtnDisable("btn_add");
					ComBtnDisable("bk_item_row_delete");
					ComBtnDisable("stock_selection");
				} else if (vBkSts == "C") { // Cancel
					/*
					- Disabled=true
					  Contract No, Contract 버튼, Reinstate, Save, Cancel, Shipper, Shipper 버튼,  Issue 체크버튼, Item(ADD, Excel Upload, Templete Download, DEL), Work Order, Cargo Receipt, SVO Freight 
					 */
					formObj.fwd_dir.disabled = true;
					formObj.order_rel.disabled = true;
//					ComEnableObject(formObj.wh_cd, false);	
					formObj.wh_cd.disabled = true;
					formObj.ord_tp_cd.disabled = true;
					formObj.load_tp_cd.disabled = true;
					ComEnableObject(formObj.est_out_dt, false);		
					ComBtnDisable("btn_est_out_dt");
					ComEnableObject(formObj.ctrt_no, false);
					ComBtnDisable("btn_ctrt_no");	
					ComBtnDisable("btn_reinstate");
					ComBtnDisable("btn_save");
					ComBtnDisable("btn_cancel");
					formObj.issue.disabled=true;
					ComBtnDisable("lnk_allocation");
					ComBtnDisable("lnk_work_order");
					ComBtnDisable("lnk_load_plan");
					ComBtnDisable("lnk_outbound");
					ComBtnDisable("lnk_svo");
					ComBtnDisable("lnk_print");
					ComBtnDisable("excel_upload");
					ComBtnDisable("template_download");
					ComBtnDisable("btn_add");
					ComBtnDisable("bk_item_row_delete");
					ComBtnDisable("stock_selection");
				}
				//	3. Booking No Disabled
			}
		}
		
		// Order Type 선택시
		ord_tp_cd_OnChange(null, formObj.ord_tp_cd, null);		
		// Forwarding Direction 
		var vFwdDir=formObj.fwd_dir.value;
		if ("E" == vFwdDir) { // Export Forwarding
			btn_show_shipping(true);
			doHideProcess(false);
		} else { // No Forwarding Related, Import Forwarding
			btn_show_shipping(false);
			doHideProcess(false);
		}
	
	},100);
//	ComOpenWait(false);
}

function setEnableSubBtn(btn_Id, btn_Sts)
{
    if (btn_Sts == true) {
        document.getElementById(btn_Id).disabled=false;
    } else {
    	document.getElementById(btn_Id).disabled=true;
    	document.getElementById(btn_Id).onclick = "";
    }
}
/**
 * Save
 */
function btn_Save(){
	wb_save();
}
function wb_save() {
	var formObj=document.form;
	var sheetObj=sheet1;
	
	var prefix="Grd01";	
	
	if (formObj.ord_tp_cd.value== "") {
		ComShowCodeMessage("COM0082", "Forwarding Direction");
		return;
	}
	if (isNull(formObj.ctrt_no)) {
		//Contract No 체크
		ComShowCodeMessage("COM0082", "Contract No");
//		ComAlertFocus(formObj.ctrt_no, "");
		formObj.ctrt_no.focus();
		return ;
	} 
	if (isNull(formObj.wh_cd)) {
		// Warehouse 체크
		ComShowCodeMessage("COM0278", "Warehouse");
		formObj.wh_cd.focus();
		return;
	}	
	if (formObj.ord_tp_cd == "") {
		// Order Type체크
		ComShowCodeMessage("COM0278", "Order Type");
		formObj.ord_tp_cd.focus();
		return;
	}	
	if (isNull(formObj.est_out_dt)) {
		//Estimated Out Date 체크
		ComShowCodeMessage("COM0082", "Estimated Out Date");
//		ComAlertFocus(formObj.est_out_dt, "");
		formObj.est_out_dt.focus();
		return;		
	}
	if (formObj.fwd_dir.value== "") {
		// Forwarding Direction 체크
		ComShowCodeMessage("COM0082", "Forwarding Direction");
//		ComAlertFocus(formObj.fwd_dir, "");	
		formObj.fwd_dir.focus()
		return;
	}	
	if (isNull(formObj.owner_nm)) {
		//Shipper 체크
		ComShowCodeMessage("COM0082", "Owner");
//		ComAlertFocus(formObj.owner_cd, "");
		formObj.owner_nm.focus()
		
		return;
	}
	if (formObj.rmk.value.length > 999) {
		// Reason for ADJ
		ComShowCodeMessage("COM0215", "Remark[1000]");
		formObj.rmk.focus();
		return;
	}
	if (formObj.ord_tp_cd == "A") {
		// Order Type이 Adjustment 인 경우 Remark/Reason for ADJ 필수입력
		// Remark/Reason for ADJ 체크
		if (isNull(formObj.rmk)) {
			ComShowCodeMessage("COM0278", "Reason for ADJ");
			formObj.rmk.focus();
			return;
		}
	}	
	if ((formObj.bk_sts_cd.value == "I") && (sheetObj.RowCount()== 0)) {
		ComShowCodeMessage("COM0115");
		return;
		//ITEM DUP CHECK		
	}
	
	if (sheetObj.RowCount()> 0) {
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
			// Item, Unit, QTY 필수 입력 체크
			if (isEmpty2(sheetObj.GetCellValue(i, prefix+"item_cd"))) {
				ComShowCodeMessage("COM0162", i-1, "Item");
				sheetObj.SelectCell(i, prefix+"item_cd",1);
				return;				
			} else if (isEmpty2(sheetObj.GetCellValue(i, prefix+"item_pkgunit"))) {
				ComShowCodeMessage("COM0162", i-1, "[Estimated] Unit");
				sheetObj.SelectCell(i, prefix+"item_pkgunit",1);
				return;				
			} else if (sheetObj.GetCellValue(i, prefix+"item_pkgqty") == 0) {
				ComShowCodeMessage("COM0162", i-1, "[Estimated] QTY");
				sheetObj.SelectCell(i, prefix+"item_pkgqty",1);
				return;				
			}			
		}
	}
	if (formObj.issue.checked) {
		formObj.issue.value="Y";
	} else {
		formObj.issue.value="N";
	}
	if (ComShowCodeConfirm("COM0036")) {
		if (sheetObj.RowCount()> 0) {
			for (var i=sheetObj.HeaderRows(); i< sheetObj.LastRow() + sheetObj.HeaderRows() ; i++) {
				//VIS에서 들어온건은 수정작업을 안거쳤을경우
				//강제로 UPDATE모드로 바은꿔주어야 프로시저내에서 INVALID_YN여부를 NULL로 업데이트칠수있으므로 IBFLAG모드를 수정한다.
				if(sheetObj.GetCellValue(i, prefix+"invalid_yn") == "Y" && sheetObj.GetCellValue(i, prefix+"ibflag") == "R")
				{
					sheetObj.SetCellValue(i, prefix+"ibflag", "U",0);
				}
			}
		}
		
		formObj.f_cmd.value = MODIFY;
		var sParam=FormQueryString(formObj);// Header
		sParam += "&" + sheet1.GetSaveString(); // Booking Item
 		var saveXml=sheet1.GetSearchData("./WHOutbkMgmtGS.clt", sParam);
 		
 		if(saveXml.indexOf('<ERROR>') == -1){
 			var succMess = $($.parseXML(saveXml)).find('saveMess1').text();
 			var valMess = $($.parseXML(saveXml)).find('saveMess2').text();
 			
 			if(succMess == "-1"){
 				alert(valMess);
 			}else if(succMess == "1"){
 				
 				//show successful message
// 				ComShowCodeMessage('COM132601');
 				
 				//Change Save - Deleted -Confrimed - Cancel - Updated 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				
 				formObj.c_wob_bk_no.value = valMess;
 				btn_Search();
 			}
 		}else{
 			//show error message
 			
 			ComShowCodeMessage('COM130103');
 		}
	}
}
/**
 * Copy
 */
function btn_Copy() {
	var formObj=document.form;
	if (ComShowCodeConfirm("COM132611")) {
		setFieldValue(formObj.c_wob_bk_no, "");
		/*
		 * 2. Data clear
		 *  Booking No, PO/ITEM GRID, Service Order No
		 */
		setFieldValue(formObj.wob_bk_no, "");
		setFieldValue(formObj.so_no, "");		
		sheet1.RemoveAll();
		sheet2.RemoveAll();
		sheet3.RemoveAll();
		/*
		 * 3. 열어줄필드
		 * Contract No, Route Plan No, Shipper, Consignee, Contract 버튼,  Shipper 버튼,  Consignee 버튼, ISSUE 체크박스, Save
		 */
//		ComEnableObject(formObj.wh_cd, true);	
		formObj.wh_cd.disabled = false;
		formObj.ord_tp_cd.disabled = false;
		formObj.load_tp_cd.disabled = false;
		ComEnableObject(formObj.est_out_dt, true);	
		ComBtnEnable("btn_est_out_dt");
		ComEnableObject(formObj.ctrt_no, true);
		ComBtnEnable("btn_ctrt_no");
		ComEnableObject(formObj.owner_cd, true);
		ComBtnEnable("btn_owner");
		//ComBtnEnable("btn_owner1");
		ComEnableObject(formObj.supp_cd, true);
		ComBtnEnable("btn_supp");
		//ComBtnEnable("btn_supp1");
		ComEnableObject(formObj.buyer_cd, true);
		ComBtnEnable("btn_buyer");
		//ComBtnEnable("btn_buyer1");
		formObj.issue.disabled=false;
		formObj.issue.checked=false;	
		ComBtnEnable("btn_save");
		formObj.fwd_dir.disabled = false;
		/*
		 * 4. FORM_MODE = NEW, Booking Status = 'N' 
		 */		
		setFieldValue(formObj.form_mode, "NEW");
		formObj.bk_sts_cd.value = "N";//booking status
		/*
		 * 5. Booking Office/PIC 로그인 세션값으로
		 */
		setFieldValue(formObj.bk_stff_ofc_cd, formObj.org_cd.value);
		setFieldValue(formObj.bk_stff_id, formObj.user_id.value);
		setFieldValue(formObj.bk_stff_nm, formObj.user_nm.value);
		/*
		6. 버튼활성화
	    - Disabled=true
	      SVO No, Work Order, Cargo Receipt, Reinstate, SVO Freight
	    - Disabled=false
	      Save, Cancel, Shipper, Shipper 버튼,  Issue 체크버튼, Item(ADD, Excel Upload, Templete Download, DEL)
		*/
//		ComEnableObject(formObj.so_no, false);
		ComBtnEnable("btn_save");
		
		//ComEnableButton("btn_save", true, 1);		
		ComBtnDisable("btn_reinstate");
		ComBtnDisable("btn_cancel");
		ComBtnDisable("lnk_allocation");
		ComBtnDisable("lnk_load_plan");
		ComBtnDisable("lnk_work_order");
		ComBtnDisable("lnk_outbound");
		ComBtnDisable("lnk_print");
		ComBtnDisable("lnk_svo");
		ComBtnEnable("excel_upload");
		ComBtnEnable("template_download");
		ComBtnEnable("btn_add");
		ComBtnEnable("bk_item_row_delete");
		ComBtnEnable("stock_selection");	
		fwd_dir_OnChange(formObj.fwd_dir, formObj.fwd_dir.value, formObj.fwd_dir.options[formObj.fwd_dir.selectedIndex].text);
		//	3. Booking No		
		ComEnableObject(formObj.wob_bk_no, true);		
		//Bk_date 는 오늘날짜로 셋팅
		setFieldValue(formObj.bk_date, ComGetNowInfo());
		//ComEnableObject(formObj.bk_date, true);
		//ComEnableButton("btn_bk_date", true,5);
		setFieldValue(formObj.temp_ctrt_no, formObj.ctrt_no.value);		
		//Item 활성화
		sheet1.SetEditable(1);
	}
}
/**
 * Reinstate
 */
function btn_reinstate() {
	var formObj=document.form;
	var sheetObj=sheet1;
	if (ComShowCodeConfirm("COM0061")) {
		
		formObj.f_cmd.value = MODIFY02;
		var sParam=FormQueryString(formObj);
 		var xml=sheetObj.GetSaveData("./WHOutbkMgmtGS.clt",sParam);
 		
		//1. Reinstate 후 조회
		
		if (xml.indexOf('<ERROR>') == -1) {
			if($($.parseXML(xml)).find('CALLREINSTATEWHOUTBK').text() != ""){
				$result = $($.parseXML(xml)).find('CALLREINSTATEWHOUTBK');
				
				var ale1 = $result.find('message').text();
				if( ale1 != ""){
					alert(ale1);
					return;
				}else{
					ComShowCodeMessage("COM0268");
					setFieldValue(formObj.c_wob_bk_no, formObj.wob_bk_no.value);
					btn_Search();
					}
			}else{
				ComShowCodeMessage('COM132613');
			}
		}else{
			ComShowCodeMessage('COM132613');
		}
	}
}
/**
 * New
 */
function btn_New(){
	if (ComShowCodeConfirm("COM132610")) {
		var currLocUrl=this.location.href;
		var hasPlNo = currLocUrl.indexOf("fwd_bk_no");
		if(hasPlNo > 0){
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
		
			//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
			window.location.href = currLocUrl;
		}else{
			wbNew();
		}
	}
}
/**
 * 초기화
 */
function wbNew() {
	var formObj=document.form;
	var vConfirm=false; 
	//초기값 세팅
	formObj.reset();
	sheet1.RemoveAll();
	sheet2.RemoveAll();
	sheet3.RemoveAll();
	// Warehouse&Contract 세션 정보 Default 세팅
	setFieldValue(formObj.wh_cd, formObj.def_wh_cd.value);
//	setFieldValue(formObj.wh_nm, formObj.def_wh_nm.value);
	setFieldValue(formObj.ctrt_no, formObj.def_wh_ctrt_no.value == null ? "" : formObj.def_wh_ctrt_no.value);	
	setFieldValue(formObj.ctrt_nm, formObj.def_wh_ctrt_nm.value == null ? "" : formObj.def_wh_ctrt_nm.value);
	setFieldValue(formObj.temp_ctrt_no, formObj.def_wh_ctrt_no.value);	
	var def_ord_tp_cd=$("#def_ord_tp_cd").val().trim();
	if(def_ord_tp_cd == ""){
		formObj.ord_tp_cd.value = ("G");
	}else{
		formObj.ord_tp_cd.value = (def_ord_tp_cd);
	}
	if (!isNull(formObj.ctrt_no)) {
		searchTlCtrtInfo();
	}
	//comboObjects[0].Code = "P"; // Order Type
	formObj.bk_sts_cd.value = "N";//Booking Status="Booked"
	formObj.fwd_dir.value = "G";// Forwarding Direction
	setFieldValue(formObj.form_mode, "NEW");
	setFieldValue(formObj.c_wob_bk_no, "");
//	setFieldValue(formObj.bk_stff_ofc_cd, formObj.org_cd.value);
//	setFieldValue(formObj.bk_stff_id, formObj.user_id.value);
//	setFieldValue(formObj.bk_stff_nm, formObj.user_nm.value);
	setFieldValue(formObj.bk_date, ComGetNowInfo());
	//Button&Link Disable
    //Reinstate, SVO Freight
	ComBtnEnable("btn_save");
	ComBtnDisable("btn_reinstate");
	ComBtnDisable("btn_cancel");
	ComBtnDisable("lnk_allocation");
	ComBtnDisable("lnk_load_plan");
	ComBtnDisable("lnk_work_order");
	ComBtnDisable("lnk_outbound");
	ComBtnDisable("lnk_svo");
	ComBtnDisable("lnk_print");
//	ComEnableObject(formObj.wh_cd, true);	
	formObj.wh_cd.disabled = false;
	formObj.ord_tp_cd.disabled = false;
	formObj.load_tp_cd.disabled = false;
	ComEnableObject(formObj.est_out_dt, true);		
	ComBtnEnable("btn_est_out_dt");
	ComEnableObject(formObj.ctrt_no, true);
	ComBtnEnable("btn_ctrt_no");
	ComEnableObject(formObj.owner_cd, true);
	ComBtnEnable("btn_owner");
	//ComBtnEnable("btn_owner1");
	ComEnableObject(formObj.supp_cd, true);
	ComBtnEnable("btn_supp");
	//ComBtnEnable("btn_supp1");
	ComEnableObject(formObj.buyer_cd, true);
	ComBtnEnable("btn_buyer");
	//ComBtnEnable("btn_buyer1");
	ComEnableObject(formObj.bk_date, true);
	ComBtnEnable("btn_bk_date");
	formObj.bk_sts_cd.disabled = true;
	formObj.order_rel.disabled = true;
	formObj.fwd_dir.disabled = false;
	formObj.issue.disabled=false;		
	ComBtnEnable("excel_upload");
	ComBtnEnable("template_download");
	ComBtnEnable("btn_add");
	ComBtnEnable("bk_item_row_delete");
	ComBtnEnable("stock_selection");
}
/**
 * Cancel
 */
function btn_Cencel() {
	var formObj=document.form;
	var sheetObj=sheet1;
	//1. 같은 branch만 cancel 가능
	if (ComShowCodeConfirm("COM0045")) {
		formObj.f_cmd.value = MODIFY01;
		
		var sParam=FormQueryString(formObj);
 		
		var xml=sheetObj.GetSearchData("./WHOutbkMgmt_6GS.clt",sParam);
		
// 		sheetObj.LoadSaveData(saveXml);
		
		//1. Cancel 후 조회
		if(xml.replace(/^\s+|\s+$/gm,'') != ''){
 			var strtIndxField = xml.indexOf("<FIELD>") + "<FIELD>".length;
 			var endIndxField = xml.indexOf("</FIELD>");
 			var xmlDoc = $.parseXML(xml.substring(strtIndxField,endIndxField));
 			var $xml = $(xmlDoc);
 			if ($xml.find("message").text() != ''){
 				ComShowMessage($xml.find("message").text());
 				//setFieldValue(formObj.c_wob_bk_no, formObj.wob_bk_no.value);
				//btn_Search();
 			}else {
// 				ComShowCodeMessage("COM0079", "");
 				
 				//Change Save - Deleted -Confrimed - Cancel - Updated 'Successfully' to showCompleteProcess();
				showCompleteProcess();
 				
 				setFieldValue(formObj.c_wob_bk_no, formObj.wob_bk_no.value);
				btn_Search();
			}
 		}
	}
}
/**
 * Allocation
 */
function lnk_allocation() {	
	if (document.getElementById('lnk_allocation').disabled) {
		return;
	}
	var formObj=document.form;
	if($("#wave_no").val().trim() == "")
	{
		var sParam="wob_bk_no="+formObj.wob_bk_no.value;
		var sUrl="./AllcMgmt.clt?"+sParam;
		parent.mkNewFrame('Allocation Management', sUrl);
	}
	else
	{
		var sParam="wave_no="+formObj.wave_no.value;
		var sUrl="./WaveMgmt.clt?"+sParam;
		parent.mkNewFrame('Wave', sUrl);
	}
}
/**
 * Work Order
 */
function lnk_work_order(){
	if (ComDisableTdButton("lnk_work_order", 2)) {
		return;
	}
	var formObj=document.form;
	var sheetObj=sheet1;
 	var sXml=sheet1.GetSearchData("existsWO.clt", "flag=WO&sb_no="+formObj.wob_bk_no.value);
	var wo_cnt=getXmlDataNullToNullString(sXml,"wo_cnt");
	var wo_sts_cd=getXmlDataNullToNullString(sXml,"wo_sts_cd");		
	var wo_no=getXmlDataNullToNullString(sXml,"wo_no");		
	if(wo_cnt > 0){
		if(ComShowCodeConfirm("COM0243")){
			formObj.c_wob_bk_no.value=formObj.wob_bk_no.value;
			sParam=FormQueryString(formObj, "");	
 			var saveXml=sheetObj.GetSaveData("addWOWHOutbk.clt",sParam);
 			sheetObj.LoadSaveData(saveXml);
			if( saveXml.indexOf('<MESSAGE>') == -1){
				moveWorkOrder(ComGetEtcData(saveXml, "wo_no"));
			}
		}
	}else{
		if(ComShowCodeConfirm("COM0035")){
			formObj.c_wob_bk_no.value=formObj.wob_bk_no.value;
			sParam=FormQueryString(formObj, "");	
 			var saveXml=sheetObj.GetSaveData("addWOWHOutbk.clt",sParam);
 			sheetObj.LoadSaveData(saveXml);
			if( saveXml.indexOf('<MESSAGE>') == -1){
				moveWorkOrder(ComGetEtcData(saveXml, "wo_no"));
			}
		}
	}
}
function moveWorkOrder(wo_no){
	var sUrl="./WOMgmt.clt?wo_no="+wo_no;
	parent.mkNewFrame('Work Order Management', sUrl);
}
/**
 * Load Plan
 */
function lnk_load_plan() {	
	if (document.getElementById('lnk_load_plan').disabled) {
		return;
	}
	var formObj=document.form;
	// Load Plan 으로 이동 시 LP Work No를 동시 생성함.
	if (ComShowCodeConfirm("COM0327")) { // Console No No is created to continue.
		var sParam="wob_bk_no="+ formObj.wob_bk_no.value+ "&f_cmd="+SEARCH04;
	
	 // var sParam="wob_bk_no="+ wob_bk_no+"&f_cmd="+SEARCH04;
	  var sXml=sheet1.GetSearchData("./WHOCMgmtGS.clt?"+sParam);	
		var xmlDoc = $.parseXML(sXml); 
		var $xml = $(xmlDoc);
		if( $xml.find("exception_msg").text() !=""){
			 return;
		}
		var walc_no_cnt=$xml.find("walc_no_cnt").text();
		if(walc_no_cnt <= 0)
		{
			ComShowCodeMessage("COM0456"); 
			return;
		}
		
      var sXml=sheet1.GetSearchData("./WHOutbkMgmt_5GS.clt?"+sParam);	
		var xmlDoc = $.parseXML(sXml); 
		var $xml = $(xmlDoc);
		if( $xml.find("exception_msg").text() !=""){
			ComShowMessage($xml.find("exception_msg").text());
			 return;
		}
		//var consol_no=getXmlDataNullToNullString(sXml,'consol_no');
		var consol_no=$xml.find("consol_no").text();
		var sUrl="./LoadPlanMgmt.clt?s_consol_no="+consol_no;
		parent.mkNewFrame('Load Plan Management', sUrl);
	}
}
/**
 * Outbound Complete
 */
function lnk_outbound() {
	if (document.getElementById('lnk_outbound').disabled) {
		return;
	}
    var formObj=document.form;
    var wob_bk_no=formObj.wob_bk_no.value;
    if (ComIsEmpty(wob_bk_no)) {
          ComShowCodeMessage("COM0266", "Booking No");
          return;
    } 
    var sParam="wob_bk_no="+ wob_bk_no+"&f_cmd="+SEARCH04;
    /*$.ajax({
          url : "searchWHOCPageMoveComplete.clt?"+sParam,
          success : function(result) {
                if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
                      alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
                      return;
                }
                var walc_no_cnt=eval(getXmlDataNullToNullString(result.xml,'walc_no_cnt'));
                if(walc_no_cnt <= 0)
                {
                      ComShowCodeMessage("COM0330"); 
                      return;
                }
                var search_div=getXmlDataNullToNullString(result.xml,'search_div');
                var search_tp=getXmlDataNullToNullString(result.xml,'search_tp');
                if(search_div == "none") //ship은 있는데 loadplan은 없을경우
                {
                      ComShowCodeMessage("COM0340"); 
                      return;
                }
                var sUrl="./WHOCMgmt.clt?search_no=" + wob_bk_no + "&search_div=" + search_div + "&search_tp=" + search_tp;
                parent.mkNewFrame('Outbound Complete Management', sUrl);
          }
    });*/
	//    var sXml=sheet1.GetSearchData("searchWHOCPageMoveComplete.clt?"+sParam);
	//    if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
	//        alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	//        return;
	//  }
	//  var walc_no_cnt=eval(getXmlDataNullToNullString(sXml,'walc_no_cnt'));
	//  if(walc_no_cnt <= 0)
	//  {
	//        ComShowCodeMessage("COM0330"); 
	//        return;
	//  }
	//  var search_div=getXmlDataNullToNullString(sXml,'search_div');
	//  var search_tp=getXmlDataNullToNullString(sXml,'search_tp');
	//  if(search_div == "none") //ship은 있는데 loadplan은 없을경우
	//  {
	//        ComShowCodeMessage("COM0340"); 
	//        return;
	//  }
	//  var sUrl="./WHOCMgmt.clt?search_no=" + wob_bk_no + "&search_div=" + search_div + "&search_tp=" + search_tp;
	//  parent.mkNewFrame('Outbound Complete Management', sUrl);
	    var sXml=sheet1.GetSearchData("./WHOCMgmtGS.clt?"+sParam);	
		var xmlDoc = $.parseXML(sXml); 
		var $xml = $(xmlDoc);
		if( $xml.find("exception_msg").text() !=""){
			 return;
		}
	//	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){			
	//		alert(getXmlDataNullToNullString(sXml,'exception_msg'));	
	//		return;
	//	}
		//var walc_no_cnt=eval(getXmlDataNullToNullString(sXml,'walc_no_cnt'));
		var walc_no_cnt=$xml.find("walc_no_cnt").text();
		if(walc_no_cnt <= 0)
		{
			ComShowCodeMessage("COM0330"); 
			return;
		}
		//var search_div=getXmlDataNullToNullString(sXml,'search_div');
		//var search_tp=getXmlDataNullToNullString(sXml,'search_tp');
		var search_div=$xml.find("search_div").text();
		var search_tp=$xml.find("search_tp").text();
		if(search_div == "none") //ship은 있는데 loadplan은 없을경우
		{
			ComShowCodeMessage("COM0340"); 
			return;
		}
		var sUrl="./WHOCMgmt.clt?search_no=" + wob_bk_no + "&search_div=" + search_div + "&search_tp=" + search_tp;
		parent.mkNewFrame('Outbound Complete Management', sUrl);
}
/**
 * SVO Freight
 */
function lnk_svo() {
	if (ComDisableTdButton("lnk_svo", 2)) {
		return;
	}
    var formObj=document.form; 
    var so_no=formObj.so_no.value;
	var sUrl="./FreightMgmt.clt?doc_cls_cd=S";
	parent.mkNewFrame('Freight Management', sUrl);
}
/**
 * Print
 */
function lnk_print() {	
	var formObj = document.form;
	if (formObj.lnk_print.disabled == true) {
		return;
	}
	// 출고의 Print 버튼에 모두 사용
	printOptionPopup();
}
/**
 * Excel
 */
function btn_Excel() {
	
	if(sheet1.RowCount() < 1){//no data	
		ComShowCodeMessage("COM132501");
	}else{
		sheet1.Down2Excel( {DownCols: makeHiddenSkipCol(sheet1), SheetDesign:1,Merge:1 });
	}
}
function row_Add() {
	var sheetObj=sheet1;
	var prefix="Grd01";
	var insertRow=sheetObj.DataInsert(-1);
	sheetObj.SetCellValue(insertRow, prefix+"load_flg","N",0);
// 	sheetObj.SetCellImage(insertRow, (prefix+"lot_id_img"), 1);
 	sheetObj.SetSumText(2, "TOTAL");
}
function bk_item_row_delete() {
    var sheetObj=sheet1;
	if(sheetObj.RowCount()> 0){
		for(var i=sheetObj.HeaderRows(); i<= sheetObj.LastRow()-1; i++) {
			if(sheetObj.GetCellValue(i,"Grd01del_chk") == "1"){
				sheetObj.SetCellValue(i,8,0);
				sheetObj.SetCellValue(i,9,0);
				sheetObj.SetCellValue(i,10,0);
				sheetObj.SetCellValue(i,11,0);
				sheetObj.SetCellValue(i,12,0);
			//	sheetObj.SetCellValue(i,16,0);
			}	
		}
		ComRowHideDelete(sheetObj,"Grd01del_chk",true);		
	}else{
		ComShowCodeMessage("COM0046");
	}
	sheetObj.CheckAll("Grd01del_chk",0);
}
function btn_Bk_Date(){
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(formObj.bk_date,'MM-dd-yyyy');
}

function setPorLocInfo(aryPopupData){
	var formObj=document.form;
	setFieldValue(formObj.por_cd, aryPopupData[0][1]);
	setFieldValue(formObj.por_nm, aryPopupData[0][2]);
}

function btn_Etd_Dt(){
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(formObj.etd_dt,'MM-dd-yyyy');
}
function btn_eta(){
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(formObj.eta,'MM-dd-yyyy');
}
function btn_owner_cd(){
	var formObj=document.form;
	var owner_cd=formObj.owner_cd.value;
   	var sUrl="./CMM_POP_0010.clt?cust_cd="+owner_cd+"&ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 640, "setOwnerInfo", "0,0", true);
   	callBackFunc = "setOwnerInfo";
	modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
	customer_mapping();
}

function btn_supp_cd(){
	var formObj=document.form;
	var supp_cd=formObj.supp_cd.value;
   	var sUrl="./CMM_POP_0010.clt?cust_cd="+supp_cd+"&ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 640, "setShipperInfo", "0,0", true);
	callBackFunc = "setShipperInfo";
	modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
}

function btn_buyer_cd(){
	var formObj=document.form;
	var buyer_cd=formObj.buyer_cd.value;
	var sUrl="./CMM_POP_0010.clt?cust_cd="+buyer_cd+"&ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 640, "setConsigneeInfo", "0,0", true);
	callBackFunc = "setConsigneeInfo";
	modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
}

function getBtn_ctrt_no(){
	var formObj=document.form;
	if(formObj.ord_tp_cd.value== ""){
		ComShowCodeMessage("COM0082", "Forwarding Direction");
		return;
	}
	if (sheet1.RowCount()== 0) {
		searchTlCtrtPopup();
	} else {			
		if (ComShowCodeConfirm("COM0294")) { // PO/Item will be deleted. Are you sure to change?;
			sheet1.RemoveAll();
			searchTlCtrtPopup();
		} else {
			setFieldValue(formObj.ctrt_no, formObj.old_ctrt_no.value);
		}
	}	
}
/**
 * Contract No 버튼 클릭시 Booking Item 삭제 체크
 */
function searchTlCtrtPopup() {
	var formObj=document.form;
	var ord_tp_lvl1_cd="\'P\'";
	var ctrt_no=formObj.ctrt_no.value;
   	var sUrl="./ContractRoutePopup.clt?ctrt_no="+ctrt_no+"&ctrt_use_flg=A";
//	ComOpenPopup(sUrl, 900, 620, "setContractInfo", "0,0", true);
   	callBackFunc = "setContractInfo";
	modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
}
function setContractInfo(aryPopupData){
	var formObj=document.form;
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		 	setFieldValue(formObj.ctrt_no,    			rtnValAry[0]);
			setFieldValue(formObj.ctrt_nm,    			rtnValAry[1]);
			setFieldValue(formObj.rtp_no,    		    rtnValAry[9]);
			setFieldValue(formObj.main_svc_type,   	rtnValAry[20]);
			setFieldValue(formObj.main_svc_tp_nm,  	rtnValAry[21]);
			setFieldValue(formObj.temp_owner_cd,		rtnValAry[8]);
			//Owner 디폴트 작업
			if(!isNull(formObj.ctrt_no)){
				if(formObj.ctrt_no != formObj.old_ctrt_no){
					
					formObj.owner_cd.value = formObj.temp_owner_cd.value;
					
					if(isNull(formObj.owner_cd)){
//						searchTlCustInfo("owner", formObj.temp_owner_cd.value);
						
						ajaxTradePaner(formObj.owner_cd);
					}else{
						if(ComShowCodeConfirm("COM0272")){
//							searchTlCustInfo("owner",formObj.temp_owner_cd.value);
							
							ajaxTradePaner(formObj.owner_cd);
						}		
					}
				}
				setFieldValue(formObj.old_ctrt_no,    		rtnValAry[0]);
			}
	 }
}

function searchTlCtrtInfo(){
	var formObj=document.form;
	if(formObj.ord_tp_cd.value == ""){
		ComShowCodeMessage("COM0082", "Forwarding Direction");
		formObj.ctrt_no.value="";
		return;
	}
	
	var ord_tp_lvl1_cd="\'P\'";
	var pnl_svc_tp_cd= "44";
	
	var params = "ctrt_no="+			ComGetObjValue(formObj.ctrt_no)
				+"&ord_tp_lvl1_cd="+	ord_tp_lvl1_cd 
				+"&pnl_svc_tp_cd=" + 	pnl_svc_tp_cd
				+"&org_cd="+			formObj.org_cd.value
				;
	
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo'+'&'+params, './GateServlet.gsl');
}

function setTlCtrtInfo(reqVal){
	
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('^@');
			
			if(rtnArr[1]!=""){
				setFieldValue(formObj.ctrt_no,				rtnArr[1]);
				setFieldValue(formObj.ctrt_nm,				rtnArr[0]);
				setFieldValue(formObj.rtp_no,				rtnArr[2]);
				formObj.bk_stff_ofc_cd.value = rtnArr[3];
				formObj.bk_stff_nm.value = formObj.user_nm.value;
				setFieldValue(formObj.main_svc_type,		rtnArr[5]);
				setFieldValue(formObj.main_svc_tp_nm,		rtnArr[6]);
				formObj.temp_ctrt_no.value = formObj.ctrt_no.value;	
				
				if(!isNull(formObj.ctrt_no)){
					if(formObj.ctrt_no != formObj.old_ctrt_no){
						if(isNull(formObj.owner_cd)){
							setFieldValue(formObj.owner_cd,	rtnArr[7]);
							ajaxTradePaner(formObj.owner_cd);
						}else{
							if(ComShowCodeConfirm("COM0272")){
								setFieldValue(formObj.owner_cd,		rtnArr[7]);
								ajaxTradePaner(formObj.owner_cd);
							}		
						}
					}
					setFieldValue(formObj.old_ctrt_no, rtnArr[1]);
				}
			}else{
				setFieldValue(formObj.ctrt_no,		"");
				setFieldValue(formObj.ctrt_nm,		"");
				setFieldValue(formObj.rtp_no,		"");
				formObj.bk_stff_ofc_cd.value = "";
				formObj.bk_stff_nm.value = "";
				setFieldValue(formObj.main_svc_type,"");
				setFieldValue(formObj.main_svc_tp_nm,"");
				formObj.temp_ctrt_no.value = "";	
			}
		}
		else{
			
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function searchTlCustInfo(name, value){
	
	sName = name;
	
	if(value.trim() == ""){
		return;
	}
	
	ajaxSendPost(setTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+value, './GateServlet.gsl');
}

function setTlCustInfo(reqVal){
	var formObj = document.form;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			
			if(sName == "owner" || sName == "supp" || sName == "buyer"){
				
				setFieldValue(eval("formObj."+sName+"_cd"), rtnArr[1]);
				setFieldValue(eval("formObj."+sName+"_addr1"), rtnArr[2]);
				setFieldValue(eval("formObj."+sName+"_addr2"), rtnArr[3]);
				setFieldValue(eval("formObj."+sName+"_addr3"), rtnArr[4]);
				setFieldValue(eval("formObj."+sName+"_addr4"), rtnArr[5]);
				setFieldValue(eval("formObj."+sName+"_addr5"), rtnArr[6]);	
				
			}else if(sName == "carrier"){
				
				setFieldValue(eval("formObj."+sName+"_cd"), rtnArr[1]);
				setFieldValue(eval("formObj."+sName+"_nm"), rtnArr[0]);
			}
			if("owner" == sName){
				
				if(formObj.form_mode.value == "NEW"){
					//Forwarding Direction
					var vFwdDir=formObj.fwd_dir.value;
					/* 2013.08.13 고객요청사항
					 * Import, Export forwarding 상관없이 OUT Booking 은 Owner = Shipper 가 default로 입력
					*/
					searchTlCustInfo("supp", formObj.owner_cd.value);
					fastOwnerFlg=false;
				}
			}
		}
		else{
//			codeField.value="";
//			nameField.value="";	
		}
	}
	else{
		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function setOwnerInfo(aryPopupData){
	var formObj=document.form;
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	setFieldValue(formObj.owner_cd,    rtnValAry[0]);
			setFieldValue(formObj.owner_nm,    rtnValAry[2]);
			setFieldValue(formObj.owner_addr1, rtnValAry[8]);
			setFieldValue(formObj.owner_addr2, rtnValAry[9]);
			setFieldValue(formObj.owner_addr3, rtnValAry[10]);
			setFieldValue(formObj.owner_addr4, rtnValAry[11]);
			setFieldValue(formObj.owner_addr5, rtnValAry[12]);
	 }
}
function setShipperInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	setFieldValue(formObj.supp_cd,    rtnValAry[0]);
		 	setFieldValue(formObj.supp_nm,    rtnValAry[2]);
			setFieldValue(formObj.supp_addr1, rtnValAry[8]);
			setFieldValue(formObj.supp_addr2, rtnValAry[9]);
			setFieldValue(formObj.supp_addr3, rtnValAry[10]);
			setFieldValue(formObj.supp_addr4, rtnValAry[11]);
			setFieldValue(formObj.supp_addr5, rtnValAry[12]);
		 	
	 }
}
function setConsigneeInfo(aryPopupData){
	var formObj=document.form;
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	setFieldValue(formObj.buyer_cd,    rtnValAry[0]);
		 	setFieldValue(formObj.buyer_nm,    rtnValAry[2]);
			setFieldValue(formObj.buyer_addr1, rtnValAry[8]);
			setFieldValue(formObj.buyer_addr2, rtnValAry[9]);
			setFieldValue(formObj.buyer_addr3, rtnValAry[10]);
			setFieldValue(formObj.buyer_addr4, rtnValAry[11]);
			setFieldValue(formObj.buyer_addr5, rtnValAry[12]);
	 }
}

function excel_upload(){
	var formObj=document.form;
	var ctrt_no=formObj.ctrt_no.value;
   	var sUrl="./WHOutExcelUploadPopup.clt?display=none&ctrt_no="+ctrt_no;
//	ComOpenPopup(sUrl, 900, 430, "setItemInfo_excel", "0,0", true);
   	callBackFunc = "setItemInfo_excel";
	modal_center_open(sUrl, callBackFunc, 900,430,"yes");
}
/**
 * Excel Upload 리턴 데이터
 * @param aryPopupData
 */
function setItemInfo_excel(aryPopupData){
	var formObj=document.form;
	
	var sheetObj=sheet1;
	var prefix="Grd01";
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		return;
	}else{
		uploadflg = true;
		doShowProcess();
		setTimeout(function(){
			var xml = convertArrayToXmlIBSheet(sheet1, aryPopupData);
			sheet1.LoadSearchData(xml, {Append : 1, sync : 1});		
		},100);
	}
	/*for (var k=0; k < aryPopupData.length; k++) {
		//if (aryPopupData[k][0] == "1") {
			var insertRow=sheetObj.DataInsert(-1);
			var prefix="Grd01";
			sheetObj.SetCellValue(insertRow,prefix+"item_cd",aryPopupData[k]["item_cd"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_nm",aryPopupData[k]["item_nm"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lot_no",aryPopupData[k]["lot_no"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_pkgunit",aryPopupData[k]["item_pkgunit"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_pkgqty",aryPopupData[k]["item_pkgqty"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_cbm",aryPopupData[k]["item_cbm"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_cbf",aryPopupData[k]["item_cbf"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_grs_kgs",aryPopupData[k]["item_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_grs_lbs",aryPopupData[k]["item_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_net_kgs",aryPopupData[k]["item_net_kgs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_net_lbs",aryPopupData[k]["item_net_lbs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"inbound_dt",aryPopupData[k]["inbound_dt"],0);
			sheetObj.SetCellValue(insertRow,prefix+"exp_dt",aryPopupData[k]["exp_dt"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lot_04",aryPopupData[k]["lot_04"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lot_05",aryPopupData[k]["lot_05"],0);
			sheetObj.SetCellValue(insertRow,prefix+"cust_item_cd",aryPopupData[k]["cust_item_cd"],0);
			sheetObj.SetCellValue(insertRow,prefix+"sao_no",aryPopupData[k]["sao_no"],0);
			sheetObj.SetCellValue(insertRow,prefix+"curr_cd",aryPopupData[k]["curr_cd"],0);
			sheetObj.SetCellValue(insertRow,prefix+"unit_price",aryPopupData[k]["unit_price"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_sys_no",aryPopupData[k]["item_sys_no"],0);
			sheetObj.SetCellValue(insertRow,prefix+"item_ea_qty",aryPopupData[k]["item_ea_qty"],0);
			sheetObj.SetCellValue(insertRow,prefix+"pkg_lv1_qty",aryPopupData[k]["pkg_lv1_qty"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lv1_cbm",aryPopupData[k]["lv1_cbm"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lv1_cbf",aryPopupData[k]["lv1_cbf"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lv1_grs_kgs",aryPopupData[k]["lv1_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lv1_grs_lbs",aryPopupData[k]["lv1_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lv1_net_kgs",aryPopupData[k]["lv1_net_kgs"],0);
			sheetObj.SetCellValue(insertRow,prefix+"lv1_net_lbs",aryPopupData[k]["lv1_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"load_flg","N",0);
// 			sheetObj.SetCellImage(insertRow, (prefix+"lot_id_img"), 1);
			// excel upload data 유효성 체크			
			base_process(sheetObj, insertRow, "");
		//}
		}
	}
	sheetObj.SetSumText(2, "TOTAL");
	*/
}
/**
 * 
 * @param sheetObj
 * @param arrData
 * @returns {String}
 */
function convertArrayToXmlIBSheet(sheetObj, arrData){
	var rtnStr = "";
	var prefix = "Grd01";
	var beginIdx = sheetObj.SaveNameCol(prefix + "ibflag");
	var endInx = sheetObj.SaveNameCol(prefix + "invalid_yn");
	
	rtnStr += "<SHEET> \n";
	rtnStr += "		<DATA Total=\"" + arrData.length +"\"> \n	";
	
	for(var i = 0; i < arrData.length; i++){
		rtnStr += " <TR> \n ";
		
		for (var j = beginIdx; j <= endInx; j++){
			rtnStr += "<TD><![CDATA[";
			
			if(typeof(arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")]) != undefined 
				&& typeof(arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")]) != "undefined" 
					&& typeof(arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")]) != null)
			{
				rtnStr += arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")];
			}
			
			rtnStr += "]]></TD> \n ";
		}
		
		rtnStr += " </TR> \n ";
	}
	
	rtnStr += "</SHEET>";
	
	return rtnStr;
}
function base_process(sheetObj, Row, Col) {
	var formObj=document.form;	
	var prefix="Grd01";		
		// item code 변경시 Pack Master (TL_CTRT_CUST_ITEM)의 패키지 Level1 기본 정보를 가져온다			
		var sParam="ctrt_no="+formObj.ctrt_no.value + "&item_cd="+encodeURIComponent(sheetObj.GetCellValue(Row, prefix+"item_cd"));
		ajaxSendPost(rtn_searchWHItemCodeInfo, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		
		fnCalcItemEaQty_itmunit(sheetObj, Row, prefix+"item_pkgunit");
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {
			sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
		} else {
			sheetObj.SetCellEditable(Row, prefix+"item_nm",1);
		}					
//		if (getXmlDataNullToNullString(sXml,'exception_msg')!="") {
//		}
		// item sys no 존재시					
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
			// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
			fnCalcItemEaQtyExcelData(sheetObj, Row, "");
		} else {
			sheetObj.SetCellValue(Row, prefix+"item_pkgunit","",0);
			sheetObj.SetCellValue(Row, prefix+"item_cbm","",0);
			sheetObj.SetCellValue(Row, prefix+"item_cbf","",0);
			sheetObj.SetCellValue(Row, prefix+"item_grs_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_grs_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_net_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_net_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info","",0);
		}
}
/**
 * Item EA_QTY 계산
 * @param sheetObj
 * @param row
 * @param col
 */
function fnCalcItemEaQty_itmunit(sheetObj, Row, Col) {
	
	var formObj=document.form;	
	
	var prefix="Grd01";
	
	var item_pkgunit=sheetObj.GetCellValue(Row, prefix + "item_pkgunit");
	var item_pkgqty=sheetObj.GetCellValue(Row, prefix + "item_pkgqty");
	var ctrt_no=formObj.ctrt_no.value ;
	var item_sys_no=sheetObj.GetCellValue(Row, prefix + "item_sys_no");
	
	if (item_pkgunit == "" && item_pkgqty > 0 && item_pkgqty == "") {
		
		ComShowCodeMessage("COM0162", Row-1, "[Item] Unit");
		sheetObj.SelectCell(Row, Col,1);
		
		return;
	}
	
	var params = "putaway_pkgunit=" + item_pkgunit
				+"&putaway_pkgqty=" + item_pkgqty
				+"&ctrt_no="+ ctrt_no
				+"&item_sys_no="+ item_sys_no
				+"&f_cmd=" + SEARCH02;
	
	var sXml=sheet1.GetSearchData("./WHOutbkMgmtGS.clt",params);
			
	resultCalcItemEaQty_itmunit(sXml, sheetObj, Row, Col);
}

/*
 * receving 정보바뀐경우 os계산 ajax return function
 */
function resultCalcItemEaQty_itmunit(resultXml, sheetObj, Row, Col) {
	
	if(resultXml.indexOf('<ERROR>') == -1){
		
		if($($.parseXML(resultXml)).find('PUTAWAYEAQTY').text().trim() != ""){
			
			$PUTAWAYEAQTY = $($.parseXML(resultXml)).find('PUTAWAYEAQTY');
			
			var prefix="Grd01";
			var suYn=$PUTAWAYEAQTY.find('suYn').text();
			var suValue=$PUTAWAYEAQTY.find('suValue').text();
			if (suYn == "" || suYn == null)	{
				alert("error"); //TODO : MJY MESSAGE
				return;
			}
			if (suYn == "N") {
				sheetObj.SetCellValue(Row, prefix + "item_pkgunit","",0);
				return;
			}
			var item_pkgqty=$PUTAWAYEAQTY.find('putaway_ea_qty').text();
			sheetObj.SetCellValue(Row, prefix + "item_ea_qty",item_pkgqty,0);
		}
	}
}
/**
 * Get data 
 * @param reqVal
 * @param Row
 */
function rtn_searchWHItemCodeInfo (reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet1;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";	
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5],1);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17],0);
			//sheetObj.SetCellValue(Row, prefix+"item_remark",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",rtnArr[18],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",rtnArr[7],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",rtnArr[6],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11],0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10],0);
	   		}
	   else{
		   var prefix="Grd01";	
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",'',0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",'',0);
			//sheetObj.SetCellValue(Row, prefix+"item_remark",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",'',0);
	   }
	}
  }
}
/**
* Item EA_QTY 계산
* @param sheetObj
* @param row
* @param col
*/
function fnCalcItemEaQtyExcelData(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd01";
	var item_pkgunit=sheetObj.GetCellValue(Row, prefix+"item_pkgunit").trim();
	var item_pkgqty=sheetObj.GetCellValue(Row, prefix+"item_pkgqty").trim();
	var ctrt_no=formObj.ctrt_no ;
	var item_sys_no=sheetObj.GetCellValue(Row, prefix+"item_sys_no").trim();
	if (item_pkgunit == "" && item_pkgqty > 0) {
		//return;
	}
	/*$.ajax({
		url : "searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
			                      + "&putaway_pkgqty=" + item_pkgqty
			                      + "&ctrt_no="        + ctrt_no
			                      + "&item_sys_no="    + item_sys_no
		    ,
		success : function(result) {
			resultCalcItemEaQtyExcelData(result.xml, sheetObj, Row, Col);
		}
	});*/
	var sXml=sheet1.GetSearchData("./WHOutbkMgmtGS.clt?putaway_pkgunit=" + item_pkgunit 
			                      + "&putaway_pkgqty=" + item_pkgqty
			                      + "&ctrt_no="        + ctrt_no
			                      + "&item_sys_no="    + item_sys_no
			                      + "&f_cmd="    + SEARCH02);
	
	resultCalcItemEaQtyExcelData(sXml, sheetObj, Row, Col);
}
/*
* receving 정보바뀐경우 os계산 ajax return function
*/
function resultCalcItemEaQtyExcelData(resultXml, sheetObj, Row, Col) {
	
	if(resultXml.indexOf('<ERROR>') == -1){
		var prefix="Grd01";	
		
		if($($.parseXML(resultXml)).find('PUTAWAYEAQTY').text() != ""){
			
			$PUTAWAYEAQTY = $($.parseXML(resultXml)).find('PUTAWAYEAQTY');
			
			var suYn=$PUTAWAYEAQTY.find('suYn');
			
			var suValue=$PUTAWAYEAQTY.find('suValue');
			
			if (suYn == "" || suYn == null)	{
			}
			if (suYn == "N") {
				sheetObj.SetCellValue(Row, prefix+"item_pkgunit","",0);
			}
			var item_pkgqty=$PUTAWAYEAQTY.find('putaway_ea_qty');
			sheetObj.SetCellValue(Row, prefix+"item_ea_qty",item_pkgqty,0);
			// CBM, GWT, NWT 계산 (Excel Upload시는 계산하지 않는다)
		}
	}else{
		//show message
	}
	 
}

/**
 * 마우스 아웃일때 
 */
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var form_mode=formObj.form_mode.value;
	if(srcName == "ctrt_no" && !(formObj.btn_ctrt_no.disabled)){
		//Chung 변경
		if(isNull(formObj.ctrt_no)){
			setFieldValue(formObj.ctrt_no,			"");
			setFieldValue(formObj.ctrt_nm,			"");
			setFieldValue(formObj.rtp_no,			"");
			setFieldValue(formObj.main_svc_type,	"");
			setFieldValue(formObj.main_svc_tp_nm,	"");
		}else{
			// Contract No 변경시 Booking Item 삭제 체크
			if (!isNull(formObj.ctrt_no)) {
				if (sheet1.RowCount()== 0) {
					searchTlCtrtInfo();
				} else {			
					if (formObj.ctrt_no != formObj.temp_ctrt_no) {
						if (ComShowCodeConfirm("COM0294")) { // PO/Item will be deleted. Are you sure to change?;
							sheet1.RemoveAll();
							searchTlCtrtInfo();
						} else {
							setFieldValue(formObj.ctrt_no, formObj.temp_ctrt_no.value);
						}
					}
				}
			}
		}
	}
	else if(srcName == "wob_bk_no"){
		if(form_mode=="NEW"){
			searchAjaxColInfo(formObj, formObj.wob_bk_no, "wob_bk_no");
		}
	} else if(srcName == "supp_cd"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.supp_cd, "supp_cd");
//		}else{
//			setFieldValue(form.supp_cd, "");
//			setFieldValue(form.supp_nm, "");
//			setFieldValue(form.supp_addr1, "");
//			setFieldValue(form.supp_addr2, "");
//			setFieldValue(form.supp_addr3, "");
//			setFieldValue(form.supp_addr4, "");
//			setFieldValue(form.supp_addr5, "");			
//		}
	} 
	else if(srcName == "buyer_cd"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.buyer_cd, "buyer_cd");
//		}else{
//			setFieldValue(form.buyer_cd, "");
//			setFieldValue(form.buyer_nm, "");
//			setFieldValue(form.buyer_addr1, "");
//			setFieldValue(form.buyer_addr2, "");
//			setFieldValue(form.buyer_addr3, "");
//			setFieldValue(form.buyer_addr4, "");
//			setFieldValue(form.buyer_addr5, "");			
//		}
	}
	else if(srcName == "owner_cd"){			
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.owner_cd, "owner_cd");
//		}else{
//			setFieldValue(form.owner_cd, "");
//			setFieldValue(form.owner_nm, "");
//			setFieldValue(form.owner_addr1, "");
//			setFieldValue(form.owner_addr2, "");
//			setFieldValue(form.owner_addr3, "");
//			setFieldValue(form.owner_addr4, "");
//			setFieldValue(form.owner_addr5, "");		
//			customer_mapping();
//		}
	} else if(srcName == "carrier_cd"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.carrier_cd, "carrier_cd");
//		}else{
//			setFieldValue(form.carrier_cd, "");
//			setFieldValue(form.carrier_nm, "");
//		}
	} 	
	else if(srcName == "wh_cd"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.wh_cd, "wh_cd");
//		}else{
//			setFieldValue(form.wh_cd, "");
//			setFieldValue(form.wh_nm, "");
//		}
	} else if(srcName == "por"){
		if (!ComIsNull(srcValue)){
			searchAjaxColInfo(formObj, formObj.por, "por");
		}else{
			setFieldValue(form.por, "");
			setFieldValue(form.por_nm, "");
		}
	} 
//	else if(srcName == "pol"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.pol, "pol");
//		}else{
//			setFieldValue(form.pol, "");
//			setFieldValue(form.pol_nm, "");
//		}
//	} 
//	else if(srcName == "pod"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.pod, "pod");
//		}else{
//			setFieldValue(form.pod, "");
//			setFieldValue(form.pod_nm, "");
//		}
//	} else if(srcName == "del"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.del, "del");
//		}else{
//			setFieldValue(form.del, "");
//			setFieldValue(form.del_nm, "");
//		}		
//	} 
//	else if(srcName == "vsl_cd"){
//		if (!ComIsNull(srcValue)){
//			searchAjaxColInfo(formObj, formObj.vsl_cd, "vsl_cd");
//		}else{
//			setFieldValue(form.vsl_cd, "");
//			setFieldValue(form.vsl_nm, "");
//		}
//	} 
}
function searchAjaxColInfo(formObj, value, col){
	if(col=="ctrt_no"){
		var param="ctrt_no="+value;	
		
		var sXml=sheet1.GetSearchData("searchTlCtrtInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.ctrt_no, 			getXmlDataNullToNullString(sXml,'ctrt_no'));
		setFieldValue(form.ctrt_nm, 			getXmlDataNullToNullString(sXml,'ctrt_nm'));
		setFieldValue(form.rtp_no, 			getXmlDataNullToNullString(sXml,'rtp_no'));
		setFieldValue(form.main_svc_type, 		getXmlDataNullToNullString(sXml,'main_svc_type'));
		setFieldValue(form.main_svc_tp_nm, 	getXmlDataNullToNullString(sXml,'main_svc_tp_nm'));
	} else if(col=="buyer_cd"){
		var param="cust_cd="+value;	

		var sXml=sheet1.GetSearchData("searchTlCustInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.buyer_cd, 		getXmlDataNullToNullString(sXml,'cust_cd'));
		setFieldValue(form.buyer_nm, 		getXmlDataNullToNullString(sXml,'cust_nm'));
		setFieldValue(form.buyer_addr1, 	getXmlDataNullToNullString(sXml,'addr1'));
		setFieldValue(form.buyer_addr2, 	getXmlDataNullToNullString(sXml,'addr2'));
		setFieldValue(form.buyer_addr3, 	getXmlDataNullToNullString(sXml,'addr3'));
		setFieldValue(form.buyer_addr4, 	getXmlDataNullToNullString(sXml,'addr4'));
		setFieldValue(form.buyer_addr5, 	getXmlDataNullToNullString(sXml,'addr5'));
	} else if(col=="supp_cd"){
		var param="cust_cd="+value;	
		/*$.ajax({
			url : "searchTlCustInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.supp_cd, 		getXmlDataNullToNullString(result.xml,'cust_cd'));
				setFieldValue(form.supp_nm, 		getXmlDataNullToNullString(result.xml,'cust_nm'));
				setFieldValue(form.supp_addr1, 	getXmlDataNullToNullString(result.xml,'addr1'));
				setFieldValue(form.supp_addr2, 	getXmlDataNullToNullString(result.xml,'addr2'));
				setFieldValue(form.supp_addr3, 	getXmlDataNullToNullString(result.xml,'addr3'));
				setFieldValue(form.supp_addr4, 	getXmlDataNullToNullString(result.xml,'addr4'));
				setFieldValue(form.supp_addr5, 	getXmlDataNullToNullString(result.xml,'addr5'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlCustInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.supp_cd, 		getXmlDataNullToNullString(sXml,'cust_cd'));
		setFieldValue(form.supp_nm, 		getXmlDataNullToNullString(sXml,'cust_nm'));
		setFieldValue(form.supp_addr1, 	getXmlDataNullToNullString(sXml,'addr1'));
		setFieldValue(form.supp_addr2, 	getXmlDataNullToNullString(sXml,'addr2'));
		setFieldValue(form.supp_addr3, 	getXmlDataNullToNullString(sXml,'addr3'));
		setFieldValue(form.supp_addr4, 	getXmlDataNullToNullString(sXml,'addr4'));
		setFieldValue(form.supp_addr5, 	getXmlDataNullToNullString(sXml,'addr5'));
	} else if(col=="owner_cd"){
		var param="cust_cd="+value;	
		/*$.ajax({
			url : "searchTlCustInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.owner_cd, 		getXmlDataNullToNullString(result.xml,'cust_cd'));
				setFieldValue(form.owner_nm, 		getXmlDataNullToNullString(result.xml,'cust_nm'));
				setFieldValue(form.owner_addr1, 	getXmlDataNullToNullString(result.xml,'addr1'));
				setFieldValue(form.owner_addr2, 	getXmlDataNullToNullString(result.xml,'addr2'));
				setFieldValue(form.owner_addr3, 	getXmlDataNullToNullString(result.xml,'addr3'));
				setFieldValue(form.owner_addr4, 	getXmlDataNullToNullString(result.xml,'addr4'));
				setFieldValue(form.owner_addr5, 	getXmlDataNullToNullString(result.xml,'addr5'));
				customer_mapping();
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlCustInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.owner_cd, 		getXmlDataNullToNullString(sXml,'cust_cd'));
		setFieldValue(form.owner_nm, 		getXmlDataNullToNullString(sXml,'cust_nm'));
		setFieldValue(form.owner_addr1, 	getXmlDataNullToNullString(sXml,'addr1'));
		setFieldValue(form.owner_addr2, 	getXmlDataNullToNullString(sXml,'addr2'));
		setFieldValue(form.owner_addr3, 	getXmlDataNullToNullString(sXml,'addr3'));
		setFieldValue(form.owner_addr4, 	getXmlDataNullToNullString(sXml,'addr4'));
		setFieldValue(form.owner_addr5, 	getXmlDataNullToNullString(sXml,'addr5'));
		customer_mapping();
	} else if(col=="vsl_cd"){
		var param="code="+value;	
		/*$.ajax({
			url : "searchTlVslInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.vsl_cd, getXmlDataNullToNullString(result.xml,'code'));
				setFieldValue(form.vsl_nm, getXmlDataNullToNullString(result.xml,'name'));
			}
		});*/
		ajaxSendPost(setVslInfoAjax, 'reqVal', '&goWhere=aj&bcKey=searchTlVslInfo&'+param, './GateServlet.gsl');
	} else if(col=="por"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.por, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				setFieldValue(form.por_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.por, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		setFieldValue(form.por_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="pol"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.pol, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				setFieldValue(form.pol_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.pol, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		setFieldValue(form.pol_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="pod"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.pod, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				setFieldValue(form.pod_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.pod, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		setFieldValue(form.pod_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="del"){
		var param="type=P&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.del, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				setFieldValue(form.del_nm, getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.del, 	getXmlDataNullToNullString(sXml,'loc_cd'));
		setFieldValue(form.del_nm, getXmlDataNullToNullString(sXml,'loc_nm'));
	} 
	else if(col=="wh_cd"){
		var param="type=WH&loc_cd="+value;	
		/*$.ajax({
			url : "searchTlLocInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.wh_cd, 	getXmlDataNullToNullString(result.xml,'loc_cd'));
				setFieldValue(form.wh_nm, 	getXmlDataNullToNullString(result.xml,'loc_nm'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlLocInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(formObj.wh_cd, 	getXmlDataNullToNullString(sXml,'loc_cd'));
//		setFieldValue(form.wh_nm, 	getXmlDataNullToNullString(sXml,'loc_nm'));
	} else if(col=="carrier_cd"){
		var param="cust_cd="+value;	
		/*$.ajax({
			url : "searchTlCustInfo.clt?"+param,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				setFieldValue(form.carrier_cd, 	getXmlDataNullToNullString(result.xml,'cust_cd'));
				setFieldValue(form.carrier_nm, 	getXmlDataNullToNullString(result.xml,'cust_nm'));
			}
		});*/
		var sXml=sheet1.GetSearchData("searchTlCustInfo.clt?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		setFieldValue(form.carrier_cd, 	getXmlDataNullToNullString(sXml,'cust_cd'));
		setFieldValue(form.carrier_nm, 	getXmlDataNullToNullString(sXml,'cust_nm'));
	} else if(col=="wob_bk_no"){
		var param="wob_bk_no="+value;	
		/*$.ajax({
			url : "existsWBInInfo.clt?"+param,
			success : function(result) {
				if( "1" == getXmlDataNullToNullString(result.xml,'businessReturn') ){
					ComShowCodeMessage("COM0016");
					formObj.wob_bk_no.value="";
					//formObj.wob_bk_no.focus();
					ComAlertFocus(formObj.wob_bk_no, "");
				}
			}
		});*/
		var sXml=sheet1.GetSearchData("existsWBInInfo.clt?"+param);
		if( "1" == getXmlDataNullToNullString(sXml,'businessReturn') ){
			ComShowCodeMessage("COM0016");
			formObj.wob_bk_no.value="";
//			ComAlertFocus(formObj.wob_bk_no, "");
			formObj.wob_bk_no.focus();
	}
}
}

function setVslInfoAjax(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				setFieldValue(formObj.vsl_nm,    	rtnArr[0]);
			}
			else{
				setFieldValue(formObj.vsl_cd,    	'');
				setFieldValue(formObj.vsl_nm,    	'');
			}
		}
		else{
			setFieldValue(formObj.vsl_cd,    	'');
			setFieldValue(formObj.vsl_nm,    	'');
		}
	}
}

function setVslInfo(aryPopupData){
	var formObj=document.form;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	setFieldValue(formObj.vsl_cd,    	rtnValAry[0]);
		 	setFieldValue(formObj.vsl_nm, 		rtnValAry[1]);
	 }
//	setFieldValue(formObj.vsl_cd,    	aryPopupData[0][1]);
//	setFieldValue(formObj.vsl_nm, 		aryPopupData[0][2]);
}
function btn_carrier(){
	var formObj=document.form;
	var sUrl="./CMM_POP_0010.clt?cust_cd="+formObj.carrier_cd.value+"&in_part_tp=P"+"&ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//	ComOpenPopup(sUrl, 900, 640, "setCarrierInfo", "0,0", true);
	callBackFunc = "setCarrierInfo";
	modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
}
function setCarrierInfo(aryPopupData){
	var formObj=document.form;
	
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 	var rtnValAry=aryPopupData.split("|");
		 	setFieldValue(formObj.carrier_cd,      rtnValAry[0]);
			setFieldValue(formObj.carrier_nm,    	rtnValAry[2]);
	 }
//	setFieldValue(formObj.carrier_cd,      aryPopupData[0][1]);
//	setFieldValue(formObj.carrier_nm,    	aryPopupData[0][2]);
}
/**
 * Template Download
 */
function template_download() {
	var formObj1=document.frm1;
	var fileName="WH_OB_ITEM_TEMPLETE.xls";
	document.frm1.file_name.value= fileName;
	formObj1.submit();
}
function customer_mapping(){
//		E	Export Forwarding
//		G	No Forwarding Related
//		I	Import Forwarding
	var formObj=document.form; 
	var form_mode=formObj.form_mode.value;
	var fwd_dir=formObj.fwd_dir.value;
	if( form_mode == "NEW"){
		if(fwd_dir=="E"){
			if(isNull(formObj.buyer_cd)){
				setFieldValue(formObj.buyer_cd  , 		formObj.owner_cd.value);
				setFieldValue(formObj.buyer_nm , 		formObj.owner_nm.value);
				setFieldValue(formObj.buyer_addr1 , 	formObj.owner_addr1.value);
				setFieldValue(formObj.buyer_addr2 , 	formObj.owner_addr2.value);
				setFieldValue(formObj.buyer_addr3 , 	formObj.owner_addr3.value);
				setFieldValue(formObj.buyer_addr4 , 	formObj.owner_addr4.value);
				setFieldValue(formObj.buyer_addr5 , 	formObj.owner_addr5.value);
			}
		}else if(fwd_dir=="I"){
			if(isNull(formObj.supp_cd)){
				setFieldValue(formObj.supp_cd  , 		formObj.owner_cd.value);
				setFieldValue(formObj.supp_nm , 		formObj.owner_nm.value);
				setFieldValue(formObj.supp_addr1 , 	formObj.owner_addr1.value);
				setFieldValue(formObj.supp_addr2 , 	formObj.owner_addr2.value);
				setFieldValue(formObj.supp_addr3 , 	formObj.owner_addr3.value);
				setFieldValue(formObj.supp_addr4 , 	formObj.owner_addr4.value);
				setFieldValue(formObj.supp_addr5 , 	formObj.owner_addr5.value);
			}
		}
	}
}
function obj_keydown(){ 
	var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
    if (vKeyCode == 13) {
		switch (srcName) {
			case "c_wob_bk_no":	
				if (!ComIsNull(srcValue)){
					btn_Search();
				}
				break;	
			default:				
				form_onChange();
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == "readonly"){
        	return false;
        } 
    } 
    return true;
}
//Show Shipping Information ==> Show/Hidden
function btn_show_shipping(showFlg){
	if(showFlg){
		document.all.btn_hide_nm.style.display="block";
		document.all.btn_show_nm.style.display="none";
		document.all.show_shipping.style.display="block";
	}else{
		document.all.btn_hide_nm.style.display="none";
		document.all.btn_show_nm.style.display="block";
		document.all.show_shipping.style.display="none";
	}
}

function fwd_dir_OnChange(){
	var formObj = document.form;
	var oldfwdDir=ComGetObjValue(formObj.fwd_dir);
	var newCode = formObj.fwd_dir.value;
	if("E" == newCode){
		btn_show_shipping(true);
	}else{
		btn_show_shipping(false);
	}
	
	formObj.old_fwd_dir.value = code;
}

function fwd_dir_OnBlur() {
	var formObj = document.form;
	
	formObj.fwd_dir_text.value = formObj.fwd_dir.options[formObj.fwd_dir.selectedIndex].text;
}

function trimVal(obj){
	obj.value=ComTrim(obj.value);
}

function btn_show(val){
	if(val == "O"){
		if(headLayer.style.display == "" || headLayer.style.display == "none"){
			headLayer.style.display="";
		}
	}else{
		if(headLayer.style.display == ""){
			headLayer.style.display="none";
		}
	}
}

function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl);
	}
}
function btn_link_rpt(){
//	var formObj=document.form;
//	if(!ComIsEmpty(formObj.rtp_no)){
//		var sUrl="./RoutePlanMgmt.clt?rtp_no="+formObj.rtp_no.value;
//		parent.mkNewFrame('Route Plan Management', sUrl);
//	}
}
function btn_link_so(){
//	var formObj=document.form;
//	if(!ComIsEmpty(formObj.so_no)){
//		var sUrl="./ServiceOrderMgmt.clt?so_no="+formObj.so_no.value;
//		parent.mkNewFrame('Service Order Management', sUrl);
//	}
}
//==========================================================================
function rmk_len_chk(){
	var formObj=document.form;
	if(formObj.rmk.value.length > 400){
		ComShowCodeMessage("COM0215", "400");
		formObj.rmk.value=formObj.rmk.value.substring(0,400);
	}
}
/**
 * Stock Selection Popup
 */
function stock_selection() {
	var formObj=document.form;
	// Contract No 체크
	if (isNull(formObj.ctrt_no)) {
		ComShowCodeMessage("COM0278", "Contract No");
		formObj.ctrt_no.focus();
		return;
	}			
	// Owner 체크
	if (isNull(formObj.owner_cd)) {
		ComShowCodeMessage("COM0278", "Owner");
		formObj.owner_cd.focus();
		return;
	}
	var sParam="ctrt_no=" + formObj.ctrt_no.value;
		sParam += "&ctrt_nm=" + formObj.ctrt_nm.value;
		sParam += "&wh_cd=" + formObj.wh_cd.value;
		sParam += "&wh_nm=" + formObj.wh_cd.options[formObj.wh_cd.selectedIndex].text;
		sParam += "&owner_cd=" + formObj.owner_cd.value;
		sParam += "&owner_nm=" + formObj.owner_nm.value;
		sParam += "&call_tp=B"; // Stock Selection button에서 호출	
		sParam += "&f_alloc_flg=Y"; //가능재고 체크를 위하여
   	var sUrl="./WHOutStockSelectPopup.clt?" + sParam;
//	ComOpenPopup(sUrl, 1050, 550, "setStockInfoButton", "0,1", true);
   	callBackFunc = "setStockInfoButton";
	modal_center_open(sUrl, callBackFunc, 1280, 720,"yes");
}

function setStockInfoButton(aryPopupData) {
	var sheetObj=sheet1;
	var prefix="Grd01";
	
	if(aryPopupData != null && aryPopupData != "" && aryPopupData != undefined && aryPopupData != 'undefined'){
		
		for(var k=0; k < aryPopupData.length; k++){
			
			var insertRow=sheetObj.DataInsert(-1);
			
			sheetObj.SetCellValue(insertRow, prefix+"item_cd",aryPopupData[k]["item_cd"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_nm",aryPopupData[k]["item_nm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"inbound_dt",aryPopupData[k]["inbound_dt"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_no",aryPopupData[k]["lot_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"exp_dt",aryPopupData[k]["exp_dt"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_04",aryPopupData[k]["lot_04"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_05",aryPopupData[k]["lot_05"],0);
			sheetObj.SetCellValue(insertRow, prefix+"fix_lot_id",aryPopupData[k]["fix_lot_id"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_sys_no",aryPopupData[k]["item_sys_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty",aryPopupData[k]["pkg_lv1_qty"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_cbm",aryPopupData[k]["lv1_cbm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_cbf",aryPopupData[k]["lv1_cbf"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_kgs",aryPopupData[k]["lv1_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_lbs",aryPopupData[k]["lv1_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_net_kgs",aryPopupData[k]["lv1_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_net_lbs",aryPopupData[k]["lv1_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pkg_info",aryPopupData[k]["pkg_info"],0);
			sheetObj.SetCellValue(insertRow, prefix+"stock_qty",aryPopupData[k]["stock_qty"],0);
			
			setBookingItemGetCellEditable(sheetObj, insertRow);
		}
	}
}
/** 
 * Order Type 선택시
 */
function ord_tp_cd_OnChange(comObj, code, text)
{
	// Adjustment 인 경우 Remark/Reason for ADJ 필수입력
	// 타이틀에 * 가 실시간 추가됨
	if ("A" == code) { // Adjustment
		document.all.show_remark.style.display="block";
		document.all.hide_remark.style.display="none";
		document.all.rmk.required="true";
	} else if ("G" == code) { // General
		document.all.show_remark.style.display="none";
		document.all.hide_remark.style.display="block";		
	} else if ("R" == code) { // Return
		document.all.show_remark.style.display="none";
		document.all.hide_remark.style.display="block";		
	} else { // All
		document.all.show_remark.style.display="none";
		document.all.hide_remark.style.display="block";		
	}	
}
/**
 * Print Option & Information (Outbound Booking Mgmt)
 */
function printOptionPopup() {
	// Booking Issued status 인 경우에만 Print 가능.
	var formObj=document.form;
	
	var vBkSts=formObj.bk_sts_cd.value;
	
	if (vBkSts != "I") {
	}
	
	var page_tp="OB";
	var sUrl="./WHOutbkPrintOption.clt?page_tp=" + page_tp + "&wob_bk_no=" + formObj.wob_bk_no.value + "&wh_cd=" + formObj.wh_cd.value;	
//	ComOpenPopup(sUrl, 1000, 680, "setPrintOptionInfo", "0,0", true);
	callBackFunc = "setPrintOptionInfo";
	modal_center_open(sUrl, callBackFunc, 1000,680,"yes");
}
function setPrintOptionInfo(){
	
}
/**
 * Print Option & Information (Allocation Mgmt)
 */
function printOptionPopupALLC() {
	var formObj=document.form;
	var page_tp="ALLC";
	var sUrl="./WHOutbkPrintOption.clt?page_tp=" + page_tp + "&wob_bk_no=" + formObj.wob_bk_no.value + "&wh_cd=" + formObj.wh_cd.value;	
//	ComOpenPopup(sUrl, 1000, 680, "setPrintOptionInfo", "0,0", true);
	callBackFunc = "setPrintOptionInfo";
	modal_center_open(sUrl, callBackFunc, 1000,680,"yes");
}
/**
 * Print Option & Information (Outbound Complete Update by Booking)
 */
function printOptionPopupBK() {
	var formObj=document.form;
	var page_tp="BK";
	var sUrl="./WHOutbkPrintOption.clt?page_tp=" + page_tp + "&wob_out_no=" + "OCSEL140200001" + "&wh_cd=" + formObj.wh_cd.value;	
//	ComOpenPopup(sUrl, 1000, 680, "setPrintOptionInfo", "0,0", true);
	callBackFunc = "setPrintOptionInfo";
	modal_center_open(sUrl, callBackFunc, 1000,680,"yes");
}
/**
 * Print Option & Information (Outbound Complete Update by Load Plan)
 */
function printOptionPopupLP() {
	var formObj=document.form;
	var page_tp="LP";
	var sUrl="./WHOutbkPrintOption.clt?page_tp=" + page_tp + "&lp_no=" + "LPSEL140100012" + "&wh_cd=" + formObj.wh_cd.value;	
//	ComOpenPopup(sUrl, 1000, 680, "setPrintOptionInfo", "0,0", true);
	callBackFunc = "setPrintOptionInfo";
	modal_center_open(sUrl, callBackFunc, 1000,680,"yes");
}
/**
 * Get Param Upload
 */
function getParam() {
    var formObj = document.form;
    var sParam="svc_tp_cd="+formObj.svc_tp_cd.value;
	sParam += "&doc_ref_tp_cd="+formObj.doc_ref_tp_cd.value;
	sParam += "&doc_tp_cd="+formObj.doc_tp_cd.value;
	sParam += "&doc_ref_no="+formObj.wob_bk_no.value;
	sParam += "&doc_ref_no2="+formObj.doc_ref_no2.value;
    return sParam;
}
/**
 * File Upload 
 */
function btn_File_Upload(){
	
//	if (ComDisableTdButton("btn_file_upload", 2)) {
//		return;
//	}	
	
	var formObj=document.form;
	if(formObj.wob_bk_no.value == ""){
//		alert("Please input Booking No");
		ComShowCodeMessage("COM132614");
		return;
	}
	if (formObj.logo_rectangle.value == "" || formObj.logo_rectangle.value == null){
		ComShowCodeMessage("COM0119");
		return;
	}
    /*if (upload1.GetList().length > 0) {
        paramToForm(getParam());
        var ibupForm = document.getElementById('ibup_form');
        ibupForm.action = ibupForm.action + '&FileUploadModule=OMS';
        upload1.SaveStatus();
        ClearHTML();
        revertParamToForm(getParam());
    }*/
	formObj.f_cmd.value=ADD;
	getParam();
	submitForm();
}
function btn_File_Path(){
    var formObj=document.form;
    setFieldValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
/** 
 * File Delete
 */
function btn_File_Delete() {
	var formObj = document.form;
	if (formObj.btn_file_delete.disabled == true) {
		return;
	}
	var sheetObj=sheet3;
	var selRow=sheetObj.GetSelectRow();
	if(sheetObj.RowCount() <= 0){
		ComShowCodeMessage("COM0046");
	}else{
		var formObj=document.form;
		if (selRow < 1){
			ComShowCodeMessage("COM12189");
			return;
		}
		if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
			doShowProcess(true);
			setTimeout(function(){
				sheetObj.SetRowHidden(selRow,0);
				sheetObj.SetRowStatus(selRow,"D");
				var sParam='f_cmd='+MODIFY03+'&'+sheetObj.GetSaveString();
				if (sParam == "") { return; }
		 	    var sXml=sheetObj.GetSaveData("./removeFileWHOutbkGS.clt", sParam + "&doc_ref_no=" + formObj.wob_bk_no.value);
		 	    var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
			 	var endIndxCheck = sXml.indexOf("</CHECK>");
			 	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
			 	var $xml = $(xmlDoc);
			    if ($xml.find( "res").text() != 'OK'){
			    	ComShowCodeMessage("COM12201");
					var strtIndxSheet1 = sXml.indexOf("<SHEET>");
					var endIndxSheet1 = sXml.indexOf("</SHEET>") + "</SHEET>".length;
					var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
					sheetObj.LoadSearchData(sheet1Data);
			    }
			},100);
		}
	}
	showCompleteProcess();
}
/**
 * Item EA_QTY 계산
 * @param sheetObj
 * @param row
 * @param col
 */
function fnCalcItemEaQty(sheetObj, Row, Col) {
	
	var formObj=document.form;	
	
	var prefix="Grd01";
	
	var item_pkgunit=sheetObj.GetCellValue(Row, prefix + "item_pkgunit");
	var item_pkgqty=sheetObj.GetCellValue(Row, prefix + "item_pkgqty");
	var ctrt_no=formObj.ctrt_no.value ;
	var item_sys_no=sheetObj.GetCellValue(Row, prefix + "item_sys_no");
	
	if (item_pkgunit == "" && item_pkgqty > 0 && item_pkgqty == "") {
		
		ComShowCodeMessage("COM0162", Row-1, "[Item] Unit");
		sheetObj.SelectCell(Row, Col,1);
		
		return;
	}
	
	var params = "putaway_pkgunit=" + item_pkgunit
				+"&putaway_pkgqty=" + item_pkgqty
				+"&ctrt_no="+ ctrt_no
				+"&item_sys_no="+ item_sys_no
				+"&f_cmd=" + SEARCH02;
	
	var sXml=sheet1.GetSearchData("./WHOutbkMgmtGS.clt",params);
			
	resultCalcItemEaQty(sXml, sheetObj, Row, Col);
}

/*
 * receving 정보바뀐경우 os계산 ajax return function
 */
function resultCalcItemEaQty(resultXml, sheetObj, Row, Col) {
	
	if(resultXml.indexOf('<ERROR>') == -1){
		
		if($($.parseXML(resultXml)).find('PUTAWAYEAQTY').text().trim() != ""){
			
			$PUTAWAYEAQTY = $($.parseXML(resultXml)).find('PUTAWAYEAQTY');
			
			var prefix="Grd01";
			var suYn=$PUTAWAYEAQTY.find('suYn').text();
			var suValue=$PUTAWAYEAQTY.find('suValue').text();
			if (suYn == "" || suYn == null)	{
				alert("error"); //TODO : MJY MESSAGE
				return;
			}
			if (suYn == "N") {
				ComShowCodeMessage(suValue); //COM0313~COM0315
				sheetObj.SetCellValue(Row, prefix + "item_pkgqty",0,0);
				sheetObj.SetCellValue(Row, prefix + "item_ea_qty",0,0);
				sheetObj.SetCellValue(Row, prefix + "item_pkgunit","",0);
				sheetObj.SelectCell(Row, prefix + "item_pkgunit",1);
				return;
			}
			var item_pkgqty=$PUTAWAYEAQTY.find('putaway_ea_qty').text();
			sheetObj.SetCellValue(Row, prefix + "item_ea_qty",item_pkgqty,0);
			// CBM, GWT, NWT 계산 
			fnCalcItemCbmGwtNwt(sheetObj, Row, Col);
		}
	}
	
	
}
/**
 * Item입력 전 비활성화, Item입력 후 활성화
 * @param sheetObj
 * @param Row
 * @param Value
 */
function fnSetItemEditable(sheetObj, Row, Value) {
	var prefix="Grd01";
	if (Value == "") {		
		sheetObj.SetCellEditable(Row, prefix+"item_pkgunit",0);
		sheetObj.SetCellValue(Row, prefix+"item_pkgunit","",0);
	} else {		
		sheetObj.SetCellEditable(Row, prefix+"item_pkgunit",1);
	}
}
/**
 *  Booking Item 수정 불가 칼럼
 * @param sheetObj
 * @param Row
 */
function setBookingItemGetCellEditable(sheetObj, Row) {
	var formObj = document.form;
	var prefix="Grd01";
	var sBk_sts_cd = formObj.bk_sts_cd.value;
	if ("N" == sBk_sts_cd) { // Booked
		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
		sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
		sheetObj.SetCellEditable(Row, prefix+"sao_no",0);
		// Lot ID가 입력된경우, Status와 상관없이 Lot 속성 5가지는 수정 불가
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"fix_lot_id"))) {
			sheetObj.SetCellEditable(Row, prefix+"inbound_dt",0);
			sheetObj.SetCellEditable(Row, prefix+"lot_no",0);
			sheetObj.SetCellEditable(Row, prefix+"exp_dt",0);
			sheetObj.SetCellEditable(Row, prefix+"lot_04",0);
			sheetObj.SetCellEditable(Row, prefix+"lot_05",0);
			sheetObj.SetCellEditable(Row, prefix+"fix_lot_id",0);
// 			sheetObj.SetCellImage(Row, prefix+"lot_id_img","");
			// Lot Id Popup 버튼은 클릭시 리턴 처리
		}		
	}
}
/**
 * ROW 글자색 붉은색 표시
 * @param sheetObj
 * @param Row
 * @param Value
 */
function fnSetItemGetRowFontColor(sheetObj, Row, Value) {
	sheetObj.SetRowFontColor(Row,"#FF0000");// ROW 글자색
}
/**
 * CBM, GWT, NWT 계산
 */
function fnCalcItemCbmGwtNwt(sheetObj, Row, Col) {
	var formObj=document.form;	
	var prefix="Grd01";
	// CBM, GWT, NWT 계산
	var item_ea_qty=eval(sheetObj.GetCellValue(Row, prefix + "item_ea_qty"));
	var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, prefix + "pkg_lv1_qty"));
	var lv1_cbm=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbm"));
	var lv1_cbf=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbf"));
	var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_kgs"));
	var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_lbs"));
	var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_kgs"));
	var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_lbs"));
	var item_cbm = (pkg_lv1_qty * item_ea_qty) * lv1_cbm;
	var item_cbf = (pkg_lv1_qty * item_ea_qty) * lv1_cbf;
	var item_grs_kgs = (pkg_lv1_qty * item_ea_qty) * lv1_grs_kgs;
	var item_grs_lbs = (pkg_lv1_qty * item_ea_qty) * lv1_grs_lbs;
	var item_net_kgs = (pkg_lv1_qty * item_ea_qty) * lv1_net_kgs;
	var item_net_lbs = (pkg_lv1_qty * item_ea_qty) * lv1_net_lbs;
	if(item_cbm.toFixed(3).length>15||item_cbf.toFixed(3).length>15||item_grs_kgs.toFixed(3).length>15||item_grs_lbs.toFixed(3).length>15||item_net_kgs.toFixed(3).length>15||item_net_lbs.toFixed(3).length>15){
		ComShowCodeMessage('COM03230');
		sheetObj.SetCellValue(Row, prefix+"item_pkgqty","");
		sheetObj.SelectCell(Row, prefix+"item_pkgqty",1);
		return;
	}
	sheetObj.SetCellValue(Row,  prefix + "item_cbm",(pkg_lv1_qty * item_ea_qty) * lv1_cbm,0);
	sheetObj.SetCellValue(Row,  prefix + "item_cbf",(pkg_lv1_qty * item_ea_qty) * lv1_cbf,0);
	sheetObj.SetCellValue(Row,  prefix + "item_grs_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_kgs,0);
	sheetObj.SetCellValue(Row,  prefix + "item_grs_lbs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_lbs,0);
	sheetObj.SetCellValue(Row,  prefix + "item_net_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_net_kgs,0);
	sheetObj.SetCellValue(Row,  prefix + "item_net_lbs",(pkg_lv1_qty * item_ea_qty) * lv1_net_lbs,0);
}
/**
 * Booking Issued 된 경우, Item 그리드의 수정 가능 여부에 따른 칼럼 비활성화 처리
 * @param sheetObj
 * @param Row
 * @param Value
 */
function setItemSheetEditable(sheetObj, Row, Value) {
	var prefix="Grd01";
	if (Value == "N") { // Booked
		sheetObj.SetCellEditable(Row, prefix + "del_chk"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_nm"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_no"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgunit",1);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgqty" ,1);
		sheetObj.SetCellEditable(Row, prefix + "stock_qty"   ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbm"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cbf"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "inbound_dt"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "exp_dt"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_04"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_05"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "fix_lot_id"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_id_img"  ,1);
// 		sheetObj.SetCellImage(Row,  prefix + "lot_id_img", 1);
		sheetObj.SetCellEditable(Row, prefix + "cust_item_cd",1);
		sheetObj.SetCellEditable(Row, prefix + "sao_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_remark" ,1);
		sheetObj.SetCellEditable(Row, prefix + "curr_cd"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "unit_price"  ,1);
	} else if (Value == "I") { // Issued
		sheetObj.SetCellEditable(Row, prefix + "del_chk"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_nm"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgunit",0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgqty" ,0);
		sheetObj.SetCellEditable(Row, prefix + "stock_qty"   ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbm"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cbf"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "inbound_dt"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "exp_dt"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_04"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_05"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "fix_lot_id"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_id_img"  ,0);
// 		sheetObj.SetCellImage(Row, prefix+"lot_id_img","");
		sheetObj.SetCellEditable(Row, prefix + "cust_item_cd",1);
		sheetObj.SetCellEditable(Row, prefix + "sao_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_remark" ,1);
		sheetObj.SetCellEditable(Row, prefix + "curr_cd"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "unit_price"  ,1);
	} else if (Value == "C") { // Cancel
		sheetObj.SetCellEditable(Row, prefix + "del_chk"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_nm"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgunit",0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgqty" ,0);
		sheetObj.SetCellEditable(Row, prefix + "stock_qty"   ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbm"    ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbf"    ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_kgs",0);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_lbs",0);
		sheetObj.SetCellEditable(Row, prefix + "item_net_kgs",0);
		sheetObj.SetCellEditable(Row, prefix + "item_net_lbs",0);
		sheetObj.SetCellEditable(Row, prefix + "inbound_dt"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "exp_dt"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_04"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_05"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "fix_lot_id"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_id_img"  ,0);
// 		sheetObj.SetCellImage(Row, prefix+"lot_id_img","");
		sheetObj.SetCellEditable(Row, prefix + "cust_item_cd",0);
		sheetObj.SetCellEditable(Row, prefix + "sao_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_remark" ,0);
		sheetObj.SetCellEditable(Row, prefix + "curr_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "unit_price"  ,0);
	}
}



function doDisplay(doWhat, formObj, obj1, obj2){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(obj1, 'MM-dd-yyyy');
        break;
        case 'DATE11':   //달력 조회 팝업 호출      
            var cal=new ComCalendarFromTo();
            cal.displayType = "date";
            cal.select(obj1,obj2, 'MM-dd-yyyy');
        break;        
       
    }
}

function comboAddItem(sComboId, itemCd, itemNm){
	
	var comboObj = document.getElementById(sComboId);
	
	var option =  document.createElement("option");
	
	option.text = itemNm;
	option.value = itemCd;
	
	comboObj.add(option);
}

function comboRemoveAll(sComboId){
	
	var comboObj = document.getElementById(sComboId);
	
	var len = comboObj.length;
	
	for(var i = len -1 ; i >= 0 ; i--){
		comboObj.remove(i);
	}
}

function comboFindItemByName(sComboId, sName){
	var comboObj = document.getElementById(sComboId);
	
	var len = comboObj.length;
	
	for(var i = len -1 ; i >= 0 ; i--){
		if(comboObj.options[i].text == sName){
			return i;
		}
	}
	
	return -1;
}

function displayData(xml, inputName){
	
	var arrName = inputName.split('|');
	
	for(var i = 0 ; i < arrName.length; i++){
		var obj = document.getElementsByName(arrName[i])[0];
		
		if(obj == null || obj == undefined || obj == 'undefined'){
			obj = document.getElementById(arrName[i]);
		}
		
		if(obj != null && obj != undefined && obj != 'undefined'){
			
			if(obj != null && obj != undefined && obj != 'undefined'){
				switch(obj.type){
				case "text":
				case "hidden":
				case "textarea":
				case "select-one":
					obj.value = xml.find(arrName[i]).text();
					break;
				case "checkbox":
					if(xml.find(arrName[i]).text() == "Y")
						obj.checked = true;
					else
						obj.checked = false;
					
					break;
				}
			}
		}
	}
}
function getSheetXmlStr(xml, sSheetNo){
	
	var sBeginTag = '<SHEET' + sSheetNo + '>';
	
	var sCloseTag = '</SHEET' + sSheetNo + '>';
	
	var strtIndx = xml.indexOf(sBeginTag) + sBeginTag.length + 1;
	
	var endIndx = xml.indexOf(sCloseTag) - 1;
	
	return xml.substring(strtIndx, endIndx);
}
function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	
//	for(var i=0;i<docObjects.length;i++) {
//		docObjects[i].RemoveAll();
//	}
	
	var formData;
	
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			formObj.action = "./WHOutbkMgmt.clt?fwd_bk_no="+formObj.c_wob_bk_no.value+"&uploadfile=T";
			formObj.submit();
			return;
		}else{
			formObj.action = "./WHOutbkMgmt.clt?fwd_bk_no="+formObj.c_wob_bk_no.value+"&uploadfile=T";
			formObj.submit();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	$.ajax({
		   type: "POST",
		   url: "./WHOutbkMgmtUploadGS.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   doHideProcess();
			   if($('res',data).text() == "OK"){
				   
				   formObj.logo_rec_flg.value = "N";
				   formObj.logo_rec_flg.checked = false;
				   
				   var xmlString = new XMLSerializer().serializeToString(data);

				   var sheet3XML = getSheetXmlStr(xmlString, "3");
				   sheet3.LoadSearchData(sheet3XML);
				   showCompleteProcess();
			   }else{
				   //show message
				   
				   ComShowCodeMessage('COM131202');//Failed to upload
			   }
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		});
	document.form.logo_rectangle.value = "";
}

var CODETYPE = '';

function codeNameAction(str, obj, tmp){
	
	var s_code = "";
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		s_code = obj.value.toUpperCase();
	}else{
		s_code = obj;
	}
	var s_type = "";
	
	//if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			//if ( s_code != "" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			//}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE =str;

				var sub_str = str.substring(0,str.indexOf("_s"));
				
				s_type = sub_str;
				
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	//}
}

function dispCodeNameAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.form;
	
//	var sheetObj = docObjects[0];
//	var sheetObj1 = docObjects[1];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "Location_pol"){
				formObj.pol.value  = masterVals[0]; 
				formObj.pol_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "Location_pod"){
				formObj.pod.value  = masterVals[0]; 
				formObj.pod_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "Location_del"){
				formObj.del.value  = masterVals[0]; 
				formObj.del_nm.value  = masterVals[3];//loc_nm
				
			}
		}else{
			if(CODETYPE == "Location_pol"){
				formObj.pol.value  = ""; 
				formObj.pol_nm.value  = "";
				
			}else if(CODETYPE == "Location_pod"){
				formObj.pod.value  = ""; 
				formObj.pod_nm.value  = "";//loc_nm
				
			}else if(CODETYPE == "Location_del"){
				formObj.del.value  = ""; 
				formObj.del_nm.value  = "";//loc_nm
				
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001')+ "\n\n: ACC_INV_0050.438");			
	}
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var formObj = document.form;
	var sheetObj = sheet1;
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
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btn_save");
		ComBtnDisable("btn_copy");
		ComBtnDisable("btn_reinstate");
		ComBtnDisable("btn_cancel");
		ComBtnDisable("lnk_allocation");
		ComBtnDisable("lnk_load_plan");
		ComBtnDisable("lnk_outbound");
	}else{
		ComBtnEnable("btn_save");
		ComBtnEnable("btn_copy");
	}
}
