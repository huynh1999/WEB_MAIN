/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LocationPopup.js
*@FileTitle  : LocationPopup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var sheet="";
var loading_flag="N";
/**
* Sheet  onLoad
*/

//document.onclick=processButtonClick;
function doWork(srcName, valObj){
	try {
		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "btn_search":
			btn_Search();
			break;	
		case "btn_ok":
			btn_OK();
			break;
		case "btn_Close":   
			btn_Close();
			break;
		} // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			alert(e);
		}
	}
}
var openerObj="";
var openerObj1="";
function loadPage() {
	var formObj=document.form;
	 
	 for(var i=0;i<docObjects.length;i++){
			comConfigSheet(docObjects[i]);
			initSheet(docObjects[i],i+1);
			comEndConfigSheet(docObjects[i]);
		}
	
	loadDataCust();
    loading_flag="Y";
    //setting();    
    //Chungrue 변경
    load_setting();
	if(!ComIsEmpty(formObj.loc_cd)||!ComIsEmpty(formObj.loc_nm)){
		btn_Search();
	}
//	setFocus(formObj.loc_cd);
}
/** 
 * initControl()
 */ 
function initControl() {
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm('keydown', 'enter_Check',  document.form);
}
/**
 * Quick Search
 */
function enter_Check(){
	var keyValue=event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
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
		case "cust_cd":
			vTextSplit=cust_cdText.split("|");
			vCodeSplit=cust_cdCode.split("|");
			with(comboObj) {
				comboObj.SetDropHeight(125);
				//comboObj.BackColor = "#CCFFFD";
				InsertItem(0,  "All",  "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectText("All");
        	}
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
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with (sheetObj) {
		
//				var hdr1='Seq|Code|Description|Type|Type Name|City|City Desc.|Address|Address 1|Address 2|Address 3|Address 4|Address 5|Responsible Office|Private|Service Provider|Service Provider';
				//var headCount=ComCountHeadTitle(hdr1);
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:3 } );
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('LocationPopup_SHEET1_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
				             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"loc_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"loc_type_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"city_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"city_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"addr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr1",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr3",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr4",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr5",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:105,  Align:"Center",  ColMerge:0,   SaveName:"branch",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"priv_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cust_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
				 
				InitColumns(cols);
				SetEditable(0);
				SetSheetHeight(200);

			}
			break;
		case 2:      //IBSheet2 init
			with (sheetObj) {
            
//	            var hdr1='Seq|Responsible Office|Pick-up|Pick-up|Pick-up Contact|Pick-up Contact|Pick-up Contact|Pick-up Contact|Delivery|Delivery|Delivery Contact|Delivery Contact|Delivery Contact|Delivery Contact|';
//	            var hdr2='Seq|Responsible Office|Code|Name/Address|PIC|TEL|FAX|E-mail|Code|Name/Address|PIC|TEL|FAX|E-mail|';
	            //var headCount=ComCountHeadTitle(hdr1);
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('LocationPopup_SHEET2_HDR1'), Align:"Center"},
	                            { Text:getLabel('LocationPopup_SHEET2_HDR2'), Align:"Center"}];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"origin_loc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"origin_loc_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"origin_pic_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"origin_pic_tel",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"origin_pic_fax",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"origin_pic_email",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dest_loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dest_loc_addr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dest_pic_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dest_pic_tel",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dest_pic_fax",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dest_pic_email",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	             
	            InitColumns(cols);
	
	            SetEditable(0);
	            SetSheetHeight(200);

			}
			break;
		case 3:      //IBSheet3 init
			with (sheetObj) {
//				var hdr1='Seq|Responsible Office|Warehouse|Warehouse|Freedays|Private|Service Provider|Service Provider|ctrt_no';
//				var hdr2='Seq|Responsible Office|Code|Name/Address|Freedays|Private|Code|Name|ctrt_no';
				//var headCount=ComCountHeadTitle(hdr1);
	
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('LocationPopup_SHEET3_HDR1'), Align:"Center"},
				                { Text:getLabel('LocationPopup_SHEET3_HDR2'), Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_freedays",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"priv_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cust_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
				 
				InitColumns(cols);
	
				SetEditable(0);
				SetSheetHeight(200);
			}
		break;
		case 4:      //IBSheet3 init
			with (sheetObj) {
//				var hdr1='|Seq|SVC Category|PIC Name|TEL|FAX|E-Mail';
				//var headCount=ComCountHeadTitle(hdr1);
	
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('LocationPopup_SHEET4_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"rmq_svc",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"cust_pic_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"tel",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"fax",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"email",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
				 
				InitColumns(cols);
				SetEditable(1);
				SetSheetHeight(200);
			}
		break;
		case 5:      //IBSheet4 init
			with (sheetObj) {
            
//	            var hdr1='Seq|Code|Description|Type|Type Name|City|City Desc.|Address|Address 1|Address 2|Address 3|Address 4|Address 5|PIC|TEL|FAX|E-mail|Code|Name/Address|PIC|TEL|FAX|E-mail|Freedays|Pick-up Contact|Pick-up Contact|Pick-up Contact|Pick-up Contact|Office Code|SVC Category|PIC Name|TEL|FAX|E-Mail|Office|Private|Service Provider|Service Provider';
	            //var headCount=ComCountHeadTitle(hdr1);
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('LocationPopup_SHEET5_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Seq" },
				             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"loc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"addr",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr1",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr2",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr3",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr4",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_addr5",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_freedays",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"origin_pic_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"origin_pic_tel",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"origin_pic_fax",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"origin_pic_email",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_loc_addr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_pic_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_pic_tel",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_pic_fax",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_pic_email",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"rmq_svc",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_pic_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"tel",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"fax",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"email",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"branch",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"priv_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cust_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cust_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	             
	            InitColumns(cols);
	
	            SetEditable(0);
	            SetSheetHeight(200);
			}
			break;
	}
}
function on_location(obj){
	var formObj=document.form;
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	if( obj.value == "O"){
		formObj.cust_cd.disabled = false;
		document.getElementById('search').disabled=false;
		setting();
	}else{
		formObj.cust_cd.disabled = true;
		document.getElementById('search').disabled=true;
		setting();
		on_search('A');
	}
}
function on_search(value){
	var formObj=document.form;
	var vTextSplit=null;
	var vCodeSplit=null;
	var comboObj=comboObjects[0];
	var j=0;
	formObj.type_search.value=value ;
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	//comboObjects[0].RemoveAll();
	removeOptions(document.getElementById("cust_cd"));
	formObj.cust_cd.disabled = false;
	if( value == "A"){
		loadDataCust();
		document.getElementById('cust_cd').value = 'All';
		cust_cd_OnChange();
		ComEnableObject(formObj.ctrt_no, false);
		ComEnableObject(formObj.ctrt_nm, false);
		formObj.ctrt_no.value="";
		formObj.ctrt_nm.value="";
	}else{
		loadDataContractCust();
		document.getElementById('cust_cd').value = 'TR';
		cust_cd_OnChange();
		ComEnableObject(formObj.ctrt_no, true);
		ComEnableObject(formObj.ctrt_nm, true);
		formObj.ctrt_no.value=formObj.in_ctrt_no.value;
		formObj.ctrt_nm.value=formObj.in_ctrt_nm.value;
	}
	setting();
}
function btn_Search() {
	
	var formObj=document.form;
	if(loading_flag == "Y")
	{
		var radio_location=formObj.radio_location.value;
		var radio_search=formObj.radio_search.value;
		if( radio_search == "A"){
			if(formObj.loc_cd.value == "" && formObj.loc_nm.value.trim().length < 3 ){
				ComShowCodeMessage("COM0098", "Location/Customer Name" ,"3");
				return;
			}
		}
		//else{
		//	if(formObj.ctrt_no.value == "" && formObj.ctrt_nm.value.trim().length < 3 && formObj.loc_cd.value == "" && formObj.loc_nm.value.trim().length < 3 ){
		//		ComShowCodeMessage("COM0098", "Name(Location/Customer Name, Contract)" ,"3");
		//		return;
		//	}
		//}
		doShowProcess(true);
		setTimeout(function(){
			docObjects[0].RemoveAll();
	 		/*var sXml=docObjects[0].GetSearchData("searchLocationList.do", FormQueryString(formObj, ""));
	 		docObjects[0].LoadSearchData(sXml,{Sync:1} );*/
			
			formObj.f_cmd.value = SEARCH;
			var sXml = docObjects[0].GetSearchData("./LocationPopupGS.clt",FormQueryString(formObj));
			
	 		if(docObjects[0].RowCount() > 0){
	 			sheet1_OnClick(docObjects[0], "1", "");
	 		}
			if ( radio_location == "C" ){
				docObjects[0].LoadSearchData(sXml,{Sync:1} );
				if(docObjects[0].RowCount() > 0){
		 			sheet1_OnClick(docObjects[0], "1", "");
		 		}
			} else {
				if ( radio_search == "C" ){
					if ( formObj.cust_cd.value== "TR" ){
						docObjects[1].LoadSearchData(sXml,{Sync:1} );
						sheet2_OnClick(docObjects[1], "2", "");
					} else if ( formObj.cust_cd.value== "WH" ){
						docObjects[2].LoadSearchData(sXml,{Sync:1} );
						sheet3_OnClick(docObjects[2], "2", "");
					}
				} else {
					docObjects[0].LoadSearchData(sXml,{Sync:1} );
					/*docObjects[0].DoSearch("./LocationPopupGS.clt",FormQueryString(formObj));
					if(docObjects[0].RowCount() > 0){
			 			sheet1_OnClick(docObjects[0], "1", "");
			 		}*/
				}
			}
		},100);
		 doHideProcess(false);
	}
}
function btn_OK(){
	if(sheet1.GetSelectRow() < 1)
		ComShowCodeMessage("COM0408");
	else{
			doShowProcess(true);
			var sheetObj=docObjects[3];
			var cnt=0;
			var formObj=document.form;
			var radio_location=formObj.radio_location.value;
			var radio_search=formObj.radio_search.value;
			var multi_contact_flg=formObj.multi_contact_flg.value;
			if(multi_contact_flg == "Y"){
				if(sheetObj.RowCount()> 0){
					for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
						if(sheetObj.cellValue(i, "chk") == "1"){
							cnt=docObjects[4].DataInsert(-1);
							if ( radio_location == "C" ){
								docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
								docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_nm"));
								docObjects[4].SetCellValue(cnt,"addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
								docObjects[4].SetCellValue(cnt,"loc_addr1",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr1"));
								docObjects[4].SetCellValue(cnt,"loc_addr2",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr2"));
								docObjects[4].SetCellValue(cnt,"loc_addr3",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr3"));
								docObjects[4].SetCellValue(cnt,"loc_addr4",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr4"));
								docObjects[4].SetCellValue(cnt,"loc_addr5",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr5"));
								docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
								docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
								returnData(docObjects[4], cnt);
							} else {
								if ( radio_search == "C" ){
									if ( formObj.cust_cd.value== "TR" ){
										docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_loc_ccnt++"));
										docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_loc_addr"));
										docObjects[4].SetCellValue(cnt,"addr",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_loc_addr"));
										docObjects[4].SetCellValue(cnt,"origin_pic_nm",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_nm"));
										docObjects[4].SetCellValue(cnt,"origin_pic_tel",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_tel"));
										docObjects[4].SetCellValue(cnt,"origin_pic_fax",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_fax"));
										docObjects[4].SetCellValue(cnt,"origin_pic_email",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_email"));
										docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_loc_cd"));
										docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_loc_addr"));
										docObjects[4].SetCellValue(cnt,"dest_pic_nm",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_nm"));
										docObjects[4].SetCellValue(cnt,"dest_pic_tel",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_tel"));
										docObjects[4].SetCellValue(cnt,"dest_pic_fax",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_fax"));
										docObjects[4].SetCellValue(cnt,"dest_pic_email",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_email"));
																	} else if ( formObj.cust_cd.value== "WH" ){
										docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_cd"));
										docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_addr"));
										docObjects[4].SetCellValue(cnt,"addr",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_addr"));
										docObjects[4].SetCellValue(cnt,"loc_freedays",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_freedays"));
																		/*
										docObjects[4].SetCellValue(cnt,"origin_pic_nm",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_nm"));
										docObjects[4].SetCellValue(cnt,"origin_pic_tel",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_tel"));
										docObjects[4].SetCellValue(cnt,"origin_pic_fax",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_fax"));
										docObjects[4].SetCellValue(cnt,"origin_pic_email",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_email"));
										docObjects[4].SetCellValue(cnt,"ofc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"ofc_cd"));
										docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_cd"));
										docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_addr"));
										docObjects[4].SetCellValue(cnt,"dest_pic_nm",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_nm"));
										docObjects[4].SetCellValue(cnt,"dest_pic_tel",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_tel"));
										docObjects[4].SetCellValue(cnt,"dest_pic_fax",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_fax"));
										docObjects[4].SetCellValue(cnt,"dest_pic_email",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_email"));
																		*/
										docObjects[4].SetCellValue(cnt,"branch",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"branch"));
										docObjects[4].SetCellValue(cnt,"priv_flg",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"priv_flg"));
										docObjects[4].SetCellValue(cnt,"cust_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"cust_cd"));
										returnData(docObjects[4], cnt);
									}
								} else {
									docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
									docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_nm"));
									docObjects[4].SetCellValue(cnt,"addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
									docObjects[4].SetCellValue(cnt,"loc_addr1",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr1"));
									docObjects[4].SetCellValue(cnt,"loc_addr2",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr2"));
									docObjects[4].SetCellValue(cnt,"loc_addr3",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr3"));
									docObjects[4].SetCellValue(cnt,"loc_addr4",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr4"));
									docObjects[4].SetCellValue(cnt,"loc_addr5",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr5"));
									docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
									docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
									docObjects[4].SetCellValue(cnt,"branch",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"branch"));
									docObjects[4].SetCellValue(cnt,"priv_flg",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"priv_flg"));
									docObjects[4].SetCellValue(cnt,"cust_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"cust_cd"));
									returnData(docObjects[4], cnt);
								}
							}	
							docObjects[4].SetCellValue(cnt,"rmq_svc",docObjects[3].GetCellValue(i, "rmq_svc"));
							docObjects[4].SetCellValue(cnt,"cust_pic_nm",docObjects[3].GetCellValue(i, "cust_pic_nm"));
							docObjects[4].SetCellValue(cnt,"tel",docObjects[3].GetCellValue(i, "tel"));
							docObjects[4].SetCellValue(cnt,"fax",docObjects[3].GetCellValue(i, "fax"));
							docObjects[4].SetCellValue(cnt,"email",docObjects[3].GetCellValue(i, "email"));
							returnData(docObjects[4], cnt);
						}
					}	
				}else{
					sheet4_OnDblClick(docObjects[3], "0");
				}	
			}else{	
				sheet4_OnDblClick(docObjects[3], docObjects[3].GetSelectRow());
			}
			document.form.clear_flg.value="N";
			//returnData(docObjects[4], cnt);
			//comPopupOK();	
			doHideProcess(false);
			//if( docObjects[4].RowCount == 0 ){
			//	ComShowCodeMessage("COM0253");	
			//}else{
			//	comPopupOK();	
			//}	
		//	var formObj = document.form;
		//	var radio_location = ComGetObjValue(formObj.radio_location);
		//	var radio_search = ComGetObjValue(formObj.radio_search);
		//	
		//	if ( radio_location == "C" ){
		//		sheet1_OnDblClick(docObjects[0], docObjects[0].SelectRow, 1);
		//	} else {
		//		if ( radio_search == "C" ){
		//			if ( comboObjects[0].Code == "TR" ){
		//				sheet2_OnDblClick(docObjects[1], docObjects[1].SelectRow, 1);
		//			} else if ( comboObjects[0].Code == "WH" ){
		//				sheet3_OnDblClick(docObjects[2], docObjects[2].SelectRow, 1);
		//			}
		//		} else {
		//			sheet1_OnDblClick(docObjects[0], docObjects[0].SelectRow, 1);
		//		}
		//	}	
		//	document.form.clear_flg.value = "N";
	}
}
function btn_Close(){
	if ( document.form.clear_flg.value != "Y" ) {
		ComClosePopup(); 
	} else {
		docObjects[4].DataInsert(-1);
		comPopupOK();
	}
}
/*function sheet1_OnClick(sheetObj, Row, Col){
	//sheet = "sheet1";
	doShowProcess(true);
	var formObj=document.form;
	var radio_location=ComGetObjValue(formObj.radio_location);
	var radio_search=ComGetObjValue(formObj.radio_search);
	//alert(comboObjects[0].Code);
	//org_cd=KRSELLB&radio_location=O&radio_search=A&cust_cd=ALL&loc_cd=ZAL&ctrt_no=
	var sParam="&cust_cd="+formObj.cust_cd.value+"&radio_location="+radio_location+"&type_search="+radio_search+"&loc_cd="+sheetObj.GetCellValue(Row, "loc_cd");

 	var sXml=docObjects[3].GetSearchData("searchLocationContactList.do", sParam);
	docObjects[3].LoadSearchData(sXml,{Sync:1} );
	doHideProcess(false);
}*/
function sheet2_OnClick(sheetObj, Row, Col){
	var formObj=document.form;
	var radio_location=formObj.radio_location.value; //ComGetObjValue(formObj.radio_location);
	var radio_search=formObj.radio_search.value;//ComGetObjValue(formObj.radio_search);
	formObj.f_cmd.value = SEARCH01;
	var sParam="&f_cmd=" + formObj.f_cmd.value + "cust_cd="+formObj.cust_cd.value+"&radio_location="+radio_location+"&type_search="+radio_search+"&loc_cd="+sheetObj.GetCellValue(Row, "origin_loc_cd")+"&loc_cd2="+sheetObj.GetCellValue(Row, "dest_loc_cd")+"&ctrt_no="+sheetObj.GetCellValue(Row, "ctrt_no")+"&org_cd="+formObj.org_cd.value;
 	/*var sXml=docObjects[3].GetSearchData("searchLocationContactList.do", sParam);
	docObjects[3].LoadSearchData(sXml,{Sync:1} );*/
	//sheet = "sheet2";
	//var sParam = "&ctrt_no="+sheetObj.cellvalue(Row, "ctrt_no")+"&org_cd="+formObj.org_cd.value;
	//var sXml = docObjects[4].GetSearchXml("searchLocationContactList.do", sParam);
	//docObjects[4].LoadSearchXml(sXml);
	
	docObjects[3].DoSearch("./LocationPopup_3GS.clt", sParam);
}
function sheet3_OnClick(sheetObj, Row, Col){
	var formObj=document.form;
	var radio_location=formObj.radio_location.value;
	var radio_search=formObj.radio_search.value;
	formObj.f_cmd.value = SEARCH01;
	var sParam="&f_cmd=" + formObj.f_cmd.value + "cust_cd="+formObj.cust_cd.value+"&radio_location="+radio_location+"&type_search="+radio_search+"&loc_cd="+sheetObj.GetCellValue(Row, "loc_cd")+"&ctrt_no="+sheetObj.GetCellValue(Row, "ctrt_no")+"&org_cd="+formObj.org_cd.value;
 	/*var sXml=docObjects[3].GetSearchData("searchLocationContactList.do", sParam);
	docObjects[3].LoadSearchData(sXml,{Sync:1} );*/
	//sheet = "sheet3";
	
	docObjects[3].DoSearch("./LocationPopup_3GS.clt", sParam);
}
function sheet1_OnClick(sheetObj, Row, Col){
	//sheet = "sheet1";
	var formObj=document.form;
	var radio_location=formObj.radio_location.value;
	var radio_search=formObj.radio_search.value;
	formObj.f_cmd.value = SEARCH01;
	//alert(comboObjects[0].Code);
	//org_cd=KRSELLB&radio_location=O&radio_search=A&cust_cd=ALL&loc_cd=ZAL&ctrt_no=
	var sParam="&f_cmd=" + formObj.f_cmd.value + "&cust_cd="+formObj.cust_cd.value+"&radio_location="+radio_location+"&type_search="+radio_search+"&loc_cd="+sheetObj.GetCellValue(Row, "loc_cd");

// 	var sXml=docObjects[3].GetSearchData("searchLocationContactList.do", sParam);
//	docObjects[3].LoadSearchData(sXml,{Sync:1} );
	//docObjects[3].DoSearch("searchLocationContactList.do", sParam);
	
	docObjects[3].DoSearch("./LocationPopup_3GS.clt", sParam);
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	sheet4_OnDblClick(docObjects[3], "0");
	btn_OK();
	
//	var cnt = docObjects[3].DataInsert(-1);
//	
//	var contact_sheet_selectrow = 0;
//	
//	contact_sheet_selectrow = docObjects[4].SelectRow;
//	if ( contact_sheet_selectrow == 0 ) contact_sheet_selectrow = 1;
//
//	docObjects[3].CellValue(cnt,"loc_cd") = sheetObj.CellValue(Row,"loc_cd");
//	docObjects[3].CellValue(cnt,"loc_nm") = sheetObj.CellValue(Row,"loc_nm");
//	docObjects[3].CellValue(cnt,"addr") = sheetObj.CellValue(Row,"addr");
//	docObjects[3].CellValue(cnt,"loc_addr1") = sheetObj.CellValue(Row,"loc_addr1");
//	docObjects[3].CellValue(cnt,"loc_addr2") = sheetObj.CellValue(Row,"loc_addr2");
//	docObjects[3].CellValue(cnt,"loc_addr3") = sheetObj.CellValue(Row,"loc_addr3");
//	docObjects[3].CellValue(cnt,"loc_addr4") = sheetObj.CellValue(Row,"loc_addr4");
//	docObjects[3].CellValue(cnt,"loc_addr5") = sheetObj.CellValue(Row,"loc_addr5");
//
//	docObjects[3].CellValue(cnt,"dest_loc_cd") = sheetObj.CellValue(Row,"loc_cd");
//	docObjects[3].CellValue(cnt,"dest_loc_addr") = sheetObj.CellValue(Row,"addr");
//	
//	docObjects[3].CellValue(cnt,"rmq_svc")     = docObjects[4].cellvalue(contact_sheet_selectrow, "rmq_svc");
//	docObjects[3].CellValue(cnt,"cust_pic_nm") = docObjects[4].cellvalue(contact_sheet_selectrow, "cust_pic_nm");
//	docObjects[3].CellValue(cnt,"tel")         = docObjects[4].cellvalue(contact_sheet_selectrow, "tel");
//	docObjects[3].CellValue(cnt,"fax")         = docObjects[4].cellvalue(contact_sheet_selectrow, "fax");
//	docObjects[3].CellValue(cnt,"email")       = docObjects[4].cellvalue(contact_sheet_selectrow, "email");
//		
//	document.form.clear_flg.value = "N";
//	if( docObjects[0].RowCount == 0 ){
//		ComShowCodeMessage("COM0253");	
//	}else{
//		comPopupOK();	
//	}
}
function sheet2_OnDblClick(sheetObj, Row, Col){
	sheet4_OnDblClick(docObjects[3], "0");	
//	var cnt = docObjects[3].DataInsert(-1);
//
//	docObjects[3].CellValue(cnt,"loc_cd") = sheetObj.CellValue(Row,"origin_loc_cd");
//	docObjects[3].CellValue(cnt,"loc_nm") = sheetObj.CellValue(Row,"origin_loc_addr");
//	docObjects[3].CellValue(cnt,"addr") = sheetObj.CellValue(Row,"origin_loc_addr");
//	docObjects[3].CellValue(cnt,"origin_pic_nm") = sheetObj.CellValue(Row,"origin_pic_nm");
//	docObjects[3].CellValue(cnt,"origin_pic_tel") = sheetObj.CellValue(Row,"origin_pic_tel");
//	docObjects[3].CellValue(cnt,"origin_pic_fax") = sheetObj.CellValue(Row,"origin_pic_fax");
//	docObjects[3].CellValue(cnt,"origin_pic_email") = sheetObj.CellValue(Row,"origin_pic_email");
//	docObjects[3].CellValue(cnt,"dest_loc_cd") = sheetObj.CellValue(Row,"dest_loc_cd");
//	docObjects[3].CellValue(cnt,"dest_loc_addr") = sheetObj.CellValue(Row,"dest_loc_addr");
//	docObjects[3].CellValue(cnt,"dest_pic_nm") = sheetObj.CellValue(Row,"dest_pic_nm");
//	docObjects[3].CellValue(cnt,"dest_pic_tel") = sheetObj.CellValue(Row,"dest_pic_tel");
//	docObjects[3].CellValue(cnt,"dest_pic_fax") = sheetObj.CellValue(Row,"dest_pic_fax");
//	docObjects[3].CellValue(cnt,"dest_pic_email") = sheetObj.CellValue(Row,"dest_pic_email");
//	
//	document.form.clear_flg.value = "N";
//	if( docObjects[1].RowCount == 0 ){
//		ComShowCodeMessage("COM0253");	
//	}else{
//		comPopupOK();	
//	}
}
function sheet3_OnDblClick(sheetObj, Row, Col){
	sheet4_OnDblClick(docObjects[3], "0");	
//	var cnt = docObjects[3].DataInsert(-1);
//
//	docObjects[3].CellValue(cnt,"loc_cd") = sheetObj.CellValue(Row,"loc_cd");
//	docObjects[3].CellValue(cnt,"loc_nm") = sheetObj.CellValue(Row,"loc_addr");
//	docObjects[3].CellValue(cnt,"addr") = sheetObj.CellValue(Row,"loc_addr");
//	docObjects[3].CellValue(cnt,"loc_freedays") = sheetObj.CellValue(Row,"loc_freedays");	
//	docObjects[3].CellValue(cnt,"origin_pic_nm") = sheetObj.CellValue(Row,"pic_nm");
//	docObjects[3].CellValue(cnt,"origin_pic_tel") = sheetObj.CellValue(Row,"pic_tel");
//	docObjects[3].CellValue(cnt,"origin_pic_fax") = sheetObj.CellValue(Row,"pic_fax");
//	docObjects[3].CellValue(cnt,"origin_pic_email") = sheetObj.CellValue(Row,"pic_email");
//	docObjects[3].CellValue(cnt,"ofc_cd") = sheetObj.CellValue(Row,"ofc_cd");
//
//	docObjects[3].CellValue(cnt,"dest_loc_cd") = sheetObj.CellValue(Row,"loc_cd");
//	docObjects[3].CellValue(cnt,"dest_loc_addr") = sheetObj.CellValue(Row,"loc_addr");
//	docObjects[3].CellValue(cnt,"dest_pic_nm") = sheetObj.CellValue(Row,"pic_nm");
//	docObjects[3].CellValue(cnt,"dest_pic_tel") = sheetObj.CellValue(Row,"pic_tel");
//	docObjects[3].CellValue(cnt,"dest_pic_fax") = sheetObj.CellValue(Row,"pic_fax");
//	docObjects[3].CellValue(cnt,"dest_pic_email") = sheetObj.CellValue(Row,"pic_email");
//	
//	document.form.clear_flg.value = "N";
//	
//	if( docObjects[2].RowCount == 0 ){
//		ComShowCodeMessage("COM0253");	
//	}else{
//		comPopupOK();	
//	}
}
function sheet4_OnDblClick(sheetObj, Row){
	var cnt=docObjects[4].DataInsert(-1);
	var formObj=document.form;
	var radio_location=formObj.radio_location.value;
	var radio_search=formObj.radio_search.value;
	
	if ( radio_location == "C" ){
		docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
		docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_nm"));
		docObjects[4].SetCellValue(cnt,"addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
		docObjects[4].SetCellValue(cnt,"loc_addr1",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr1"));
		docObjects[4].SetCellValue(cnt,"loc_addr2",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr2"));
		docObjects[4].SetCellValue(cnt,"loc_addr3",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr3"));
		docObjects[4].SetCellValue(cnt,"loc_addr4",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr4"));
		docObjects[4].SetCellValue(cnt,"loc_addr5",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr5"));
		docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
		docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
		
				//10
		
	} else {
		if ( radio_search == "C" ){
			if ( formObj.cust_cd.value== "TR" ){
				docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_loc_cd"));
				docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_loc_addr"));
				docObjects[4].SetCellValue(cnt,"addr",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_loc_addr"));
				docObjects[4].SetCellValue(cnt,"origin_pic_nm",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_nm"));
				docObjects[4].SetCellValue(cnt,"origin_pic_tel",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_tel"));
				docObjects[4].SetCellValue(cnt,"origin_pic_fax",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_fax"));
				docObjects[4].SetCellValue(cnt,"origin_pic_email",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"origin_pic_email"));
				docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_loc_cd"));
				docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_loc_addr"));
				docObjects[4].SetCellValue(cnt,"dest_pic_nm",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_nm"));
				docObjects[4].SetCellValue(cnt,"dest_pic_tel",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_tel"));
				docObjects[4].SetCellValue(cnt,"dest_pic_fax",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_fax"));
				docObjects[4].SetCellValue(cnt,"dest_pic_email",docObjects[1].GetCellValue(docObjects[1].GetSelectRow(),"dest_pic_email"));
				
							} else if ( formObj.cust_cd.value== "WH" ){
				docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_cd"));
				docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_addr"));
				docObjects[4].SetCellValue(cnt,"addr",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_addr"));
				docObjects[4].SetCellValue(cnt,"loc_freedays",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_freedays"));
								/*
				docObjects[4].SetCellValue(cnt,"origin_pic_nm",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_nm"));
				docObjects[4].SetCellValue(cnt,"origin_pic_tel",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_tel"));
				docObjects[4].SetCellValue(cnt,"origin_pic_fax",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_fax"));
				docObjects[4].SetCellValue(cnt,"origin_pic_email",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_email"));
				docObjects[4].SetCellValue(cnt,"ofc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"ofc_cd"));
				docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_cd"));
				docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"loc_addr"));
				docObjects[4].SetCellValue(cnt,"dest_pic_nm",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_nm"));
				docObjects[4].SetCellValue(cnt,"dest_pic_tel",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_tel"));
				docObjects[4].SetCellValue(cnt,"dest_pic_fax",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_fax"));
				docObjects[4].SetCellValue(cnt,"dest_pic_email",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"pic_email"));
								*/
				docObjects[4].SetCellValue(cnt,"ofc_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"ofc_cd"));
				docObjects[4].SetCellValue(cnt,"branch",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"branch"));
				docObjects[4].SetCellValue(cnt,"priv_flg",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"priv_flg"));
				docObjects[4].SetCellValue(cnt,"cust_cd",docObjects[2].GetCellValue(docObjects[2].GetSelectRow(),"cust_cd"));
				
								
			}
		} else {
			docObjects[4].SetCellValue(cnt,"loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
			docObjects[4].SetCellValue(cnt,"loc_nm",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_nm"));
			docObjects[4].SetCellValue(cnt,"addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
			docObjects[4].SetCellValue(cnt,"loc_addr1",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr1"));
			docObjects[4].SetCellValue(cnt,"loc_addr2",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr2"));
			docObjects[4].SetCellValue(cnt,"loc_addr3",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr3"));
			docObjects[4].SetCellValue(cnt,"loc_addr4",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr4"));
			docObjects[4].SetCellValue(cnt,"loc_addr5",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_addr5"));
			docObjects[4].SetCellValue(cnt,"dest_loc_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"loc_cd"));
			docObjects[4].SetCellValue(cnt,"dest_loc_addr",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"addr"));
			docObjects[4].SetCellValue(cnt,"branch",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"branch"));
			docObjects[4].SetCellValue(cnt,"priv_flg",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"priv_flg"));
			docObjects[4].SetCellValue(cnt,"cust_cd",docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"cust_cd"));
			
		}
	}	
	if(docObjects[3].RowCount()> 0 && parseFloat(Row) > 0){
		docObjects[4].SetCellValue(cnt,"rmq_svc",sheetObj.GetCellValue(sheetObj.GetSelectRow(), "rmq_svc"));
		docObjects[4].SetCellValue(cnt,"cust_pic_nm",sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cust_pic_nm"));
		docObjects[4].SetCellValue(cnt,"tel",sheetObj.GetCellValue(sheetObj.GetSelectRow(), "tel"));
		docObjects[4].SetCellValue(cnt,"fax",sheetObj.GetCellValue(sheetObj.GetSelectRow(), "fax"));
		docObjects[4].SetCellValue(cnt,"email",sheetObj.GetCellValue(sheetObj.GetSelectRow(), "email"));
	}	
	//document.form.clear_flg.value = "N";
	//if( docObjects[4].RowCount == 0 ){
	//	ComShowCodeMessage("COM0253");	
	//}else{
	
	
	
	/*
	switch(sheetObj.ColSaveName(Col)){
		case "trdp_cd":
if(sheetObj.GetCellValue(Row, "ibflag1") != "I"){
				window.returnValue=retArray;
				window.close();
			}
		break;
	}
	*/
	
	//comPopupOK();
	returnData(docObjects[4], cnt)
	//}
}
function cust_cd_OnChange(){
	var formObj=document.form;
	var radio_search=formObj.radio_search.value;
	var Code = formObj.cust_cd.value;
	if ( radio_search == "C" ){
		if ( Code == "TR" ){
			document.all.mainTable_sheet1.style.display="none";
			document.all.mainTable_sheet2.style.display="block";
			document.all.mainTable_sheet3.style.display="none";
			document.all.mainTable_sheet4.style.display="block";
		} else if ( Code == "WH" ){
			document.all.mainTable_sheet1.style.display="none";
			document.all.mainTable_sheet2.style.display="none";
			document.all.mainTable_sheet3.style.display="block";
			document.all.mainTable_sheet4.style.display="block";
		}
	} else {
		document.all.mainTable_sheet1.style.display="block";
		document.all.mainTable_sheet2.style.display="none";
		document.all.mainTable_sheet3.style.display="none";
		document.all.mainTable_sheet4.style.display="block";
	}
}
function load_setting(){
	var formObj=document.form;
	var radio_location=formObj.radio_location.value;
	var radio_search=formObj.radio_search.value;
	var in_radio_location=formObj.in_radio_location.value;
	var in_radio_search=formObj.in_radio_search.value;
	var multi_contact_flg=formObj.multi_contact_flg.value;
	if(in_radio_search == "C"){
		formObj.radio_search[1].checked=true;	
		on_search("C");
		//comboObjects[0].Text = "Warehouse";
		ComEnableObject(formObj.ctrt_no, true);
		ComEnableObject(formObj.ctrt_nm, true);
		formObj.ctrt_no.value=formObj.in_ctrt_no.value;
		formObj.ctrt_nm.value=formObj.in_ctrt_nm.value;
	}else{
		if ( radio_location != "C"){
			if ( formObj.type.value == "P" ){
				document.getElementById('location').disabled=true;
				document.getElementById('search').disabled=true;		
				formObj.cust_cd.disabled = true;
				if(checkSelectVal(formObj.cust_cd, 'P') == true){
					formObj.cust_cd.value = "P";
				}
			} else if ( formObj.type.value == "CL" ){
				formObj.radio_location[1].checked=true;
				document.getElementById('location').disabled=true;
				document.getElementById('search').disabled=true;
				formObj.cust_cd.disabled = true;
				if(checkSelectVal(formObj.cust_cd, 'All') == true){
					formObj.cust_cd.value = "All";
				}
			} else if ( formObj.type.value == "TR" ){
				if ( radio_search == "A" ){
					if(checkSelectVal(formObj.cust_cd, 'W') == true){
						formObj.cust_cd.value = "W";
					}
				} else {
					formObj.cust_cd.disabled = true;
					if(checkSelectVal(formObj.cust_cd, 'TR') == true){
						formObj.cust_cd.value = "TR";
					}
				}	
			} else if ( formObj.type.value == "WH" ){
				if ( radio_search == "A" ){
					if(checkSelectVal(formObj.cust_cd, 'W') == true){
						formObj.cust_cd.value = "W";
					}
				} else {
					formObj.cust_cd.disabled = true;
					if(checkSelectVal(formObj.cust_cd, 'WH') == true){
						formObj.cust_cd.value = "WH";
					}
				}	
			} else if ( formObj.type.value == "W" ){
				if ( radio_search == "A" ){
					if(checkSelectVal(formObj.cust_cd, 'W') == true){
						formObj.cust_cd.value = "W";
					}
				} else {
					formObj.cust_cd.disabled = true;
					if(checkSelectVal(formObj.cust_cd, 'WH') == true){
						formObj.cust_cd.value = "WH";
					}
				}	
			} else if ( formObj.type.value == "WH_ONLY" ){
				if ( radio_search == "A" ){
					if(checkSelectVal(formObj.cust_cd, 'W') == true){
						formObj.cust_cd.value = "W";
					}
				} else {
					formObj.cust_cd.disabled = true;
					if(checkSelectVal(formObj.cust_cd, 'WH') == true){
						formObj.cust_cd.value = "WH";
					}
				}	
				formObj.cust_cd.disabled = true;
				formObj.radio_location[1].disabled=true;
			} 
		} else {
			formObj.cust_cd.disabled = true;
			formObj.radio_search[0].checked=true;
			if(checkSelectVal(formObj.cust_cd, 'All') == true){
				formObj.cust_cd.value = "All";
			}
		}
	}
	if(in_radio_location == "C"){
		formObj.radio_location[1].checked=true;	
		on_location("C");
	}
	if(multi_contact_flg != "Y"){
		docObjects[3].SetColHidden("chk",1);
	}
	cust_cd_OnChange();
}
function setting(){
	var formObj=document.form;
	var radio_location=formObj.radio_location.value;
	var radio_search=formObj.radio_search.value;
	if ( radio_location != "C"){
		if ( formObj.type.value == "P" ){
			document.getElementById('location').disabled=true;
			document.getElementById('search').disabled=true;		
			formObj.cust_cd.disabled = true;
			if(checkSelectVal(formObj.cust_cd, 'P') == true){
				formObj.cust_cd.value = "P";
			}
			cust_cd_OnChange();
		} else if ( formObj.type.value == "CL" ){
			formObj.radio_location[1].checked=true;
			document.getElementById('location').disabled=true;
			document.getElementById('search').disabled=true;
			formObj.cust_cd.disabled = true;
			if(checkSelectVal(formObj.cust_cd, 'All') == true){
				formObj.cust_cd.value = "All";
			}
			cust_cd_OnChange();
		} else if ( formObj.type.value == "TR" ){
			if ( radio_search == "A" ){
				if(checkSelectVal(formObj.cust_cd, 'W') == true){
					formObj.cust_cd.value = "W";
				}
				cust_cd_OnChange();
			} else {
				formObj.cust_cd.disabled = true;
				if(checkSelectVal(formObj.cust_cd, 'TR') == true){
					formObj.cust_cd.value = "TR";
				}
				cust_cd_OnChange();
			}	
		} else if ( formObj.type.value == "WH" ){
			if ( radio_search == "A" ){
				if(checkSelectVal(formObj.cust_cd, 'W') == true){
					formObj.cust_cd.value = "W";
				}
				cust_cd_OnChange();
			} else {
				formObj.cust_cd.disabled = true;
				if(checkSelectVal(formObj.cust_cd, 'WH') == true){
					formObj.cust_cd.value = "WH";
				}
				cust_cd_OnChange();
			}	
		} else if ( formObj.type.value == "W" ){
			if ( radio_search == "A" ){
				if(checkSelectVal(formObj.cust_cd, 'W') == true){
					formObj.cust_cd.value = "W";
				}
				cust_cd_OnChange();
			} else {
				formObj.cust_cd.disabled = true;
				formObj.cust_cd.value = "WH";
				cust_cd_OnChange();
			}	
		} else if ( formObj.type.value == "WH_ONLY" ){
			if ( radio_search == "A" ){
				if(checkSelectVal(formObj.cust_cd, 'W') == true){
					formObj.cust_cd.value = "W";
				}
				cust_cd_OnChange();
			} else {
				formObj.cust_cd.disabled = true;
				if(checkSelectVal(formObj.cust_cd, 'WH') == true){
					formObj.cust_cd.value = "WH";
				}
				cust_cd_OnChange();
			}	
			formObj.cust_cd.disabled = true;
			formObj.radio_location[1].disabled=true;
		}
	} else {
		formObj.cust_cd.disabled = true;
		formObj.radio_search[0].checked=true;
		if(checkSelectVal(formObj.cust_cd, 'All') == true){
			formObj.cust_cd.value = "All";
		}
		cust_cd_OnChange();
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
function loadDataCust(){
	var obj = document.getElementById("cust_cd");
	var option =  document.createElement("option");
	
	option.text = "ALL";
	option.value = "All";
	
	obj.add(option);
	
	var cust_cd = cust_cdCode.split('|');
	var cust_nm = cust_cdText.split('|');
	
	for(var i = 0; i < cust_cd.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(cust_nm[i]);
		option.value = htmlDecode(cust_cd[i]);
		
		obj.add(option);
	}
}
function loadDataContractCust(){
	var obj = document.getElementById("cust_cd");
	var option =  document.createElement("option");
	
	var ctrt_cust_cd = ctrt_cust_cdCode.split('|');
	var ctrt_cust_nm = ctrt_cust_cdText.split('|');
	
	for(var i = 0; i < ctrt_cust_cd.length; i++){
		option =  document.createElement("option");
		
		option.text = htmlDecode(ctrt_cust_nm[i]);
		option.value = htmlDecode(ctrt_cust_cd[i]);
		
		obj.add(option);
	}
}

function returnData(sheetObj, cnt){
	var retArray="";
	//var cnt=docObjects[4].DataInsert(-1);
	var formObj=document.form;
	retArray += sheetObj.GetCellValue(cnt,"loc_cd"); 
	retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_nm");    
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"addr");    
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_addr1");    
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_addr2");  
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_addr3");
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_addr4");      
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_addr5");        
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"loc_freedays");     
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"origin_pic_nm"); 
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"origin_pic_tel");   
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"origin_pic_fax");   
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"origin_pic_email"); 
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"dest_loc_cd");    
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"dest_loc_addr");  
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"dest_pic_nm");    
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"dest_pic_tel");   
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"dest_pic_fax");   
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"dest_pic_email");  
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"ofc_cd");     
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"rmq_svc"); 
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"cust_pic_nm");   
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"tel");     
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"fax"); 
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"email");  
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"branch"); 
    retArray += "|";         
    retArray += sheetObj.GetCellValue(cnt,"priv_flg"); 
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"cust_cd");       
    retArray += "|";
    retArray += sheetObj.GetCellValue(cnt,"cust_nm");
	ComClosePopup(retArray);	
}