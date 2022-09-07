/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingMgmt.js
*@FileTitle  : W/H Closing Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/13
=========================================================*/
//docObjects
var rtnary=new Array(2);
var callBackFunc = "";

var docObjects=new Array();
var sheetCnt=0;
//comboObjects
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="Grd01";
var fix_grid02="Grd02";
var fix_grid03="Grd03";
var fix_grid04="Grd04";
var sts_cd_n = "N";
var loading_flag = "N";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

var save_ok_flg = false;

var isDelete = false;		//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage() {
	var formObj = document.form;
	
	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	if(gJsWmsRuPoint == 'Y'){
		vPointCount = 8;
		vEditLen = 19;
	}
	
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject,i+1);
	    comEndConfigSheet(sheetObject);
	}
	
	if (!ComIsEmpty(formObj.req_set_fr_dt.value) || !ComIsEmpty(formObj.req_cls_no.value)) {
		save_ok_flg = true;
		$("#set_fr_dt").val(changeDate2(formObj.req_set_fr_dt.value.trim()));
		$("#set_to_dt").val(changeDate2(formObj.req_set_to_dt.value.trim()));
		$("#wh_cd").val(formObj.req_wh_cd.value);
		$("#ctrt_no").val(formObj.req_ctrt_no.value);
		$("#ctrt_nm").val(formObj.req_ctrt_nm.value);
//		$("#wm_doc_seq").val(formObj.req_wm_doc_seq.value);
		btn_Search();
	} else {
		commonModeChange("INIT");
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
}

/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init - Ending Balance
			with(sheetObj){
			      var hdr1="|DEL|Item|Item|Period|Period|Ending Balance|Ending Balance|Freight|Freight|Rate|Curr|Amount";
			      var hdr2="|DEL|Code|Name|From|To|Unit|Q\'ty|Code|Name|Rate|Curr|Amount";
			      var prefix=fix_grid01;
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"},
			                  { Text:hdr2, Align:"Center"} ];
			      InitHeaders(headers, info);
			      
			      var cols = [ {Type:"Status",    	Hidden:1,  	Width:30,    	Align:"Center",   					SaveName:prefix+"ibflag" },
			                   {Type:"DelCheck",  	Hidden:0, 	Width:50,   	Align:"Center",  	ColMerge:1,   	SaveName:prefix+"del" },
			                   {Type:"Combo",      	Hidden:0,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"item_cd",  		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text",     	Hidden:0,  	Width:180, 		Align:"Left",		ColMerge:1,  	SaveName:prefix+"item_nm",   		KeyField:0,   UpdateEdit:0,   InsertEdit:0, 		 Format:""					},
			                   {Type:"Date",      	Hidden:0,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"set_fr_dt",		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Date",      	Hidden:0,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"set_to_dt",		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Combo",   	Hidden:0,  	Width:150,    	Align:"Left",    	ColMerge:1,   	SaveName:prefix+"unit_cd",    		KeyField:0,   UpdateEdit:0,   Format:"" },
			                   {Type:"Float",       Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"qty",   			KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Combo",      	Hidden:0,  	Width:120,   	Align:"Center",     ColMerge:1,   	SaveName:prefix+"frt_cd",  			KeyField:1,   UpdateEdit:1,   Format:"" },
			                   {Type:"Text",      	Hidden:0,  	Width:150,    	Align:"Left",   	ColMerge:1,   	SaveName:prefix+"frt_nm",  			KeyField:0,   UpdateEdit:1,   Format:"" },
			                   {Type:"Float",     	Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"unit_price",  		KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  },
			                   {Type:"Combo",      	Hidden:0,  	Width:80,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"curr_cd",   		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"AutoSum",     Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
	//		                   {Type:"Float",     Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
			                   
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:120,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_nm",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text",      	Hidden:1,  	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
			                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"inv_seq",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text", 		Hidden:1, 	Width:120,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wh_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ctrt_no",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ofc_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Float",      	Hidden:1,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_ttl_amt",		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sell_buy_tp_cd",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_seq",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"rating_flg",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sts_cd",       	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text",      	Hidden:1,  	Width:100,    	Align:"Center",   	ColMerge:1,   	SaveName:prefix+"rate_tp_cd",    	KeyField:1,   UpdateEdit:0,   Format:"" },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_frt_seq",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			      				{Type:"Date",      	Hidden:1,  	Width:120, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"tj_dt",   			KeyField:1,   UpdateEdit:0,    InsertEdit:1, 		 Format:"Ymd"		}];
	
					InitColumns(cols);
		            SetSheetHeight(460);
		            resizeSheet();
					SetEditable(1);
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		            SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
					SetColProperty(prefix+"unit_cd",{ComboText:"|" + storage_uom_Text, ComboCode:"|" + storage_uom_Code});
					SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
					InitComboNoMatchText(1, "",1);
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			      }
			      break;
		case 2:      //IBSheet1 init - Daily In & Out
			with(sheetObj){
			      var hdr1="|DEL|Item|Item|Transaction \nDate|Handling \nUnit|Beginning \nBalance \n|Inbound \n|Outbound \n|Ending \nBalance \n|Calculating \nBalance \n|Freight|Freight|UOM \n|# of Unit Per \nUOM \n|Curr \n|Rate \n|Amount \n";
			      var hdr2="|DEL|Code|Name|Transaction \nDate|Handling \nUnit|Beginning \nBalance \n|Inbound \n|Outbound \n|Ending \nBalance \n|Calculating \nBalance \n|Code|Name|UOM \n|# of Unit Per \nUOM \n|Curr \n|Rate \n|Amount \n";
			      var prefix=fix_grid02;
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"},
			                  { Text:hdr2, Align:"Center"} ];
			      InitHeaders(headers, info);
			      
			      var cols = [ {Type:"Status",    	Hidden:1,  	Width:30,    	Align:"Center",   					SaveName:prefix+"ibflag" },
			                   {Type:"DelCheck",  	Hidden:0, 	Width:50,   	Align:"Center",  	ColMerge:1,   	SaveName:prefix+"del" },
			                   {Type:"Combo",      	Hidden:0,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"item_cd",  		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text",     	Hidden:0,  	Width:150, 		Align:"Left",		ColMerge:1,  	SaveName:prefix+"item_nm",   		KeyField:0,   UpdateEdit:0,   InsertEdit:0, 		 Format:""					},
			                   {Type:"Date",      	Hidden:0,  	Width:120, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"tj_dt",   			KeyField:1,   UpdateEdit:0,    InsertEdit:1, 		 Format:"Ymd"		},
			                   {Type:"Text",     	Hidden:0, 	Width:110, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"hndl_unit",        KeyField:0,   UpdateEdit:0,    InsertEdit:0,         Format:""					},
					           {Type:"Float",    	Hidden:0, 	Width:80, 		Align:"Right",		ColMerge:1,  	SaveName:prefix+"bgin_bln",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
					           {Type:"Float", 	   	Hidden:0, 	Width:80, 		Align:"Right",		ColMerge:1,  	SaveName:prefix+"inbound",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
					           {Type:"Float",     	Hidden:0,  	Width:110, 		Align:"Right",		ColMerge:1,  	SaveName:prefix+"outbound",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
					           {Type:"Float",     	Hidden:0, 	Width:110,  	Align:"Right",   	ColMerge:1,   	SaveName:prefix+"end_bln",      	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"        			},
					           {Type:"Float", 	   	Hidden:0,	Width:110, 		Align:"Right",		ColMerge:1,  	SaveName:prefix+"cacl_bln",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
					           {Type:"Combo",      	Hidden:0,  	Width:120,   	Align:"Center",     ColMerge:1,   	SaveName:prefix+"frt_cd",  			KeyField:1,   UpdateEdit:1,   InsertEdit:1, Format:"" },
					           {Type:"Text",      	Hidden:0,  	Width:150,    	Align:"Left",   	ColMerge:1,   	SaveName:prefix+"frt_nm",  			KeyField:0,   UpdateEdit:1,   InsertEdit:1, Format:"" },
			                   {Type:"Combo",   	Hidden:0,  	Width:100,    	Align:"Left",    	ColMerge:1,   	SaveName:prefix+"unit_cd",    		KeyField:0,   UpdateEdit:0,   InsertEdit:0, Format:"" },
			                   {Type:"Float",       Hidden:0,  	Width:120,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"hunit_for_uom",   	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Combo",      	Hidden:0,  	Width:80,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"curr_cd",   		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Float",     	Hidden:0,  	Width:120,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"unit_price",  		KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  },
			                   {Type:"AutoSum",     Hidden:0,  	Width:120,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
	//		                   {Type:"Float",     Hidden:0,  	Width:120,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
			                   
			                   {Type:"Float",       Hidden:1,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"qty",   			KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"set_fr_dt",		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"set_to_dt",		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:120,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_nm",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text",      	Hidden:1,  	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
			                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"inv_seq",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text", 		Hidden:1, 	Width:120,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wh_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ctrt_no",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ofc_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Float",      	Hidden:1,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_ttl_amt",		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sell_buy_tp_cd",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_seq",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"rating_flg",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sts_cd",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_frt_seq",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text",      	Hidden:1,  	Width:100,    	Align:"Center",   	ColMerge:1,   	SaveName:prefix+"rate_tp_cd",    	KeyField:1,   UpdateEdit:0,   Format:"" }];
	
					InitColumns(cols);
		            SetSheetHeight(460);
		            resizeSheet();
					SetEditable(1);
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		            SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
	//				SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
					SetColProperty(prefix+"unit_cd",{ComboText:"|" + storage_uom_Text, ComboCode:"|" + storage_uom_Code});
					SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
					InitComboNoMatchText(1, "",1);
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			      }
			      break;
		case 3:      //IBSheet3 Fixed Rate
			with(sheetObj){
			      var hdr1="|DEL|Item|Item|From|To|Unit|Freight|Freight|Q\'ty|Curr|Rate|Amount";
			      var hdr2="|DEL|Code|Name|From|To|Unit|Code|Name|Q\'ty|Curr|Rate|Amount";
			      var prefix=fix_grid03;
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"},
			                  { Text:hdr2, Align:"Center"} ];
			      InitHeaders(headers, info);
			      
			      var cols = [ {Type:"Status",    	Hidden:1,  	Width:30,    	Align:"Center",   					SaveName:prefix+"ibflag" },
			                   {Type:"DelCheck",  	Hidden:0, 	Width:50,   	Align:"Center",  	ColMerge:1,   	SaveName:prefix+"del" },
			                   {Type:"Combo",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"item_cd",  		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text",     	Hidden:1,  	Width:180, 		Align:"Left",		ColMerge:1,  	SaveName:prefix+"item_nm",   		KeyField:0,   UpdateEdit:0,   InsertEdit:0, 		 Format:""					},
			                   {Type:"Date",      	Hidden:0,  	Width:150,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"set_fr_dt",		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Date",      	Hidden:0,  	Width:150,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"set_to_dt",		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Combo",   	Hidden:1,  	Width:150,    	Align:"Left",    	ColMerge:1,   	SaveName:prefix+"unit_cd",    		KeyField:0,   UpdateEdit:0,   Format:"" },
			                   {Type:"Combo",      	Hidden:0,  	Width:300,   	Align:"Center",     ColMerge:1,   	SaveName:prefix+"frt_cd",  			KeyField:1,   UpdateEdit:1,   Format:"" },
			                   {Type:"Text",      	Hidden:0,  	Width:250,    	Align:"Left",   	ColMerge:1,   	SaveName:prefix+"frt_nm",  			KeyField:0,   UpdateEdit:1,   Format:"" },
			                   {Type:"Float",       Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"qty",   			KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Combo",      	Hidden:0,  	Width:80,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"curr_cd",   		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Float",     	Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"unit_price",  		KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  },
			                   {Type:"AutoSum",     Hidden:0,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
			                   
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:120,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_nm",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text",      	Hidden:1,  	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
			                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"inv_seq",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text", 		Hidden:1, 	Width:120,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wh_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ctrt_no",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ofc_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Float",      	Hidden:1,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_ttl_amt",		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sell_buy_tp_cd",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_seq",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"rating_flg",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sts_cd",       	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text",      	Hidden:1,  	Width:100,    	Align:"Center",   	ColMerge:1,   	SaveName:prefix+"rate_tp_cd",    	KeyField:1,   UpdateEdit:0,   Format:"" },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_frt_seq",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			      				{Type:"Date",      	Hidden:1,  	Width:120, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"tj_dt",   			KeyField:1,   UpdateEdit:0,    InsertEdit:1, 		 Format:"Ymd"		}];
	
					InitColumns(cols);
		            SetSheetHeight(460);
		            resizeSheet();
					SetEditable(1);
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		            SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
					SetColProperty(prefix+"unit_cd",{ComboText:"|" + storage_uom_Text, ComboCode:"|" + storage_uom_Code});
					SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
					InitComboNoMatchText(1, "",1);
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			      }
			      break;
	
		case 4:      //IBSheet4 init - Daily Total Volume - 
			with(sheetObj){
				var hdr1="|DEL|Transaction \nDate|Freight|Freight|UOM|Volume|Curr|Rate|Amount";
				var hdr2="|DEL|Transaction \nDate|Code|Name|UOM|Volume|Curr|Rate|Amount";
				var prefix=fix_grid04;
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:hdr1, Align:"Center"}, { Text:hdr2, Align:"Center"} ];
				InitHeaders(headers, info);
	
				var cols = [
					{Type:"Status",    Hidden:1,   Width:30,    Align:"Center",     ColMerge:0,     SaveName:prefix+"ibflag" }
				  , {Type:"DelCheck",  Hidden:0,   Width:50,    Align:"Center",     ColMerge:1,     SaveName:prefix+"del" }
				  , {Type:"Date",      Hidden:0,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"tj_dt",            KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"Ymd" }
				  , {Type:"Combo",     Hidden:0,   Width:240,   Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_cd",           KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"" }
				  , {Type:"Text",      Hidden:0,   Width:180,   Align:"Left",       ColMerge:1,     SaveName:prefix+"frt_nm",           KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" }
				  , {Type:"Combo",     Hidden:0,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"unit_cd",          KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" }
				  , {Type:"Float",     Hidden:0,   Width:150,   Align:"Right",      ColMerge:1,     SaveName:prefix+"qty",              KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",  PointCount:7, EditLen:vEditLen }
				  , {Type:"Combo",     Hidden:0,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"curr_cd",          KeyField:1,   UpdateEdit:0,   InsertEdit:1,   Format:"" }
				  , {Type:"Float",     Hidden:0,   Width:120,   Align:"Right",      ColMerge:1,     SaveName:prefix+"unit_price",       KeyField:1,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",  PointCount:7, EditLen:vEditLen }
				  , {Type:"AutoSum",   Hidden:0,   Width:120,   Align:"Right",      ColMerge:1,     SaveName:prefix+"inv_amt",          KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",  PointCount:2 }
				  , {Type:"Float",     Hidden:1,   Width:80,    Align:"Right",      ColMerge:1,     SaveName:prefix+"bgin_bln",         KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float" }
				  , {Type:"Float",     Hidden:1,   Width:80,    Align:"Right",      ColMerge:1,     SaveName:prefix+"inbound",          KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float" }
				  , {Type:"Float",     Hidden:1,   Width:110,   Align:"Right",      ColMerge:1,     SaveName:prefix+"outbound",         KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float" }
				  , {Type:"Float",     Hidden:1,   Width:110,   Align:"Right",      ColMerge:1,     SaveName:prefix+"end_bln",          KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float" }
				  , {Type:"Float",     Hidden:1,   Width:110,   Align:"Right",      ColMerge:1,     SaveName:prefix+"cacl_bln",         KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float" }
				  , {Type:"Date",      Hidden:1,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"set_fr_dt",        KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" }
				  , {Type:"Date",      Hidden:1,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"set_to_dt",        KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" }
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_cd",          KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_nm",          KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:120,   Align:"Left",       ColMerge:1,     SaveName:prefix+"cls_no",           KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""}
				  , {Type:"Date",      Hidden:1,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"cls_dt",           KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" }
				  , {Type:"Text",      Hidden:1,   Width:120,   Align:"Left",       ColMerge:1,     SaveName:prefix+"inv_seq",          KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" }
				  , {Type:"Text",      Hidden:1,   Width:120,   Align:"Center",     ColMerge:1,     SaveName:prefix+"wh_cd",            KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"ctrt_no",          KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"ofc_cd",           KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Float",     Hidden:1,   Width:150,   Align:"Right",      ColMerge:1,     SaveName:prefix+"inv_ttl_amt",      KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen }
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"sell_buy_tp_cd",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_seq",          KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"rating_flg",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"sts_cd",           KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:80,    Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_frt_seq",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""}
				  , {Type:"Text",      Hidden:1,   Width:100,   Align:"Center",     ColMerge:1,     SaveName:prefix+"rate_tp_cd",       KeyField:1,   UpdateEdit:0,   Format:"" }
				];
	
				InitColumns(cols);
				SetSheetHeight(460);
				resizeSheet();
				SetEditable(1);
				SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
				SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
				SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
				SetColProperty(prefix+"unit_cd", {ComboText:'|'+storage_vol_Text, ComboCode:'|'+storage_vol_Code} );
				InitComboNoMatchText(1, "",1);
			}
			break;
	}
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}

/**
 * Sheet2의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet2_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.form;
	switch(MenuString){
	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
	case "Header Setting Save":
		IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
	case "Header Setting Reset":
		IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	case "Column Hidden":
		var col = sheetObj.MouseCol();
		sheetObj.SetColHidden(col, 1);
		sheetObj.SetColWidth(col, 1);
		break;
	}
}
/**
 * Sheet3의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet3_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.form;
	switch(MenuString){
	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
	case "Header Setting Save":
		IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
	case "Header Setting Reset":
		IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	case "Column Hidden":
		var col = sheetObj.MouseCol();
		sheetObj.SetColHidden(col, 1);
		sheetObj.SetColWidth(col, 1);
		break;
	}
}
function caculateChange(code){
	var formObj=document.form;	
	// dual monitor 사용시 Inventory by 콤보 focus out을 방지하기 하기 위한 코드 (화면 전환시 sheet가 보이지 않음)
    if (code == "A") {
		document.all.div_sheet_A.style.display="block";
		document.all.div_sheet_B.style.display="none";
		
		
    } else if(code == "B") {
		document.all.div_sheet_A.style.display="none";
		document.all.div_sheet_B.style.display="block";
    } 
    resizeSheet();
	
}
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
	ComResizeSheet(docObjects[1]);
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
document.keydown=obj_keydown;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
//function processButtonClick(){
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		//#3390-Check Authority WMS CODE
		if(srcName == "SAVE" || srcName == "DELETE" || srcName == "CONFIRM" || srcName == "CF_CANCEL" || srcName == "AR_CREATE" || srcName == "AP_CREATE"){
			var sheetObj;
			var prefix_grid="";

			// "EDB":Ending Balance,"DAY":Daily In & Out
			if (formObj.cal_method_cd.value == "DAY") {
				sheetObj=sheet2;
				prefix_grid="Grd02";
			// "FIX":Fixed Rate
			} else if (formObj.cal_method_cd.value == "FIX") {
				sheetObj=sheet3;
				prefix_grid="Grd03";
			// "DTV" : Daily Total Volume - //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE 
			} else if (formObj.cal_method_cd.value == "DTV") {
				sheetObj=sheet4;
				prefix_grid="Grd04";
			} else {
				sheetObj=sheet1;
				prefix_grid="Grd01";
			}
			
			//sheet의 row가 0건일경우
			if(sheetObj.RowCount()>0)
			{
				var cRow = sheetObj.HeaderRows();
				var wh_cd = sheetObj.GetCellValue(cRow, prefix_grid + "wh_cd");
				
				ComChecWmsCd_Authority(wh_cd);
				if (isWmsAuthOk == false) { 
					//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
					ComShowCodeMessage("COM0785");
					return
				}  
			}
		}
		
		switch(srcName) {
			case "btn_cls_dt":	
				if (ComDisableTdButton("btn_cls_dt", 2)) {
					return;
				}
				var cal=new ComCalendar();
	            cal.select(formObj.cls_dt, 'MM-dd-yyyy');
				break;
//			case "btn_set_to_dt":	
//				if (ComDisableTdButton("btn_set_to_dt", 2)) {
//					return;
//				}
//	            var cal = new ComCalendarFromTo();
//		    	cal.select(formObj.set_fr_dt,formObj.set_to_dt, 'MM-dd-yyyy');
//				break;
			case "btn_ctrt_no" :
				if (ComDisableTdButton("btn_ctrt_no", 2)) {
					return;
				}
				
				var ord_tp_lvl1_cd="\'P\'";
		    	
				var param = "?ctrt_no="  + "&ctrt_nm=" + "&ord_tp_lvl1_cd=" + ord_tp_lvl1_cd;
		    	rtnary=new Array(3);
			    callBackFunc = "setCtrtNoInfo";
			    modal_center_open('./ContractRoutePopup.clt' + param, rtnary, 900, 580,"yes");
			break;
			case "SEARCHLIST":
 				btn_Search();
 				break;
			case "btn_create":
 				btn_Create();
 				break;
			case "SAVE":
 				btn_Save();
 				break;
			case "DELETE":
 				btn_Delete();
 				break;
			case "CONFIRM":
 				btn_Confirm();
 				break;
			case "CF_CANCEL":
 				btn_CFCancel();
 				break;
			case "EXCEL":
 				btn_Excel();
 				break;
			case "NEW":
 				btn_New();
 				break;
			case "AR_CREATE":
				btn_AR_Create();
				break;
			case "AP_CREATE":
				btn_AP_Create();
				break;
			case "CLOSING_SEARCH":
 				btn_Closing_Search();
 				break;
			case "link_FreightMgmt":
 				btn_Freight_Mgmt();
 				break;
			case "btn_change_date1":
 				btn_Change_Date("week");
 				break;
			case "btn_change_date2":
				btn_Change_Date("half_month");
 				break;
			case "btn_change_date3":
				btn_Change_Date("month");
 				break;
			case "btn_add":
				btn_Add();
 				break;
			case "btn_del":
				btn_Del();
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
function btn_Add() {
	var formObj=document.form;
	var sheetObj=sheet1;
	var prefix=fix_grid01;
	// Daily In & Out
	if (formObj.cal_method_cd.value == "DAY") {
		sheetObj=sheet2;
		prefix=fix_grid02;
	// Fixed Rate
	} else if (formObj.cal_method_cd.value == "FIX") {
		sheetObj=sheet3;
		prefix=fix_grid03;
	} else if (formObj.cal_method_cd.value == "DTV") { //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
		sheetObj=sheet4;
		prefix=fix_grid04;
	}

	//validation check
	if (validateForm(formObj, 'add') == false) 
	{
		return;
	}

	var row=sheetObj.DataInsert(sheetObj.HeaderRows() + sheetObj.RowCount());
	
	var curr_cd = formObj.wh_curr_cd.value;
	if (!ComIsNull(formObj.s_curr_cd.value)) {
		curr_cd = formObj.s_curr_cd.value;
	}
	sheetObj.SetCellValue(row, prefix + "curr_cd", curr_cd);
	sheetObj.SetCellValue(row, prefix + "ofc_cd", formObj.wh_ofc_cd.value);
	sheetObj.SetCellValue(row, prefix + "set_fr_dt", formObj.set_fr_dt.value);
	sheetObj.SetCellValue(row, prefix + "set_to_dt", formObj.set_to_dt.value);
	sheetObj.SetCellValue(row, prefix + "cust_cd", formObj.s_cust_cd.value);
	sheetObj.SetCellValue(row, prefix + "cust_nm", formObj.s_cust_nm.value);
	sheetObj.SetCellValue(row, prefix + "wh_cd", formObj.wh_cd.value);
	sheetObj.SetCellValue(row, prefix + "ctrt_no", formObj.ctrt_no.value);
	sheetObj.SetCellValue(row, prefix + "rate_tp_cd", "STO");
	sheetObj.SetCellValue(row, prefix + "tj_dt", formObj.set_to_dt.value);
	if (sheetObj.RowCount() > 1) {
		sheetObj.SetCellValue(row, prefix + "frt_cd", sheetObj.GetCellValue(row - 1, prefix + "frt_cd"));
		sheetObj.SetCellValue(row, prefix + "frt_nm", sheetObj.GetCellValue(row - 1, prefix + "frt_nm"));
	}

	if (sheetObj.GetCellValue(row, prefix + "hndl_unit") == "" && sheetObj.GetCellValue(row, prefix + "qty") == 0) {
		sheetObj.SetCellValue(row, prefix + "qty", "1");
	}

	//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
	if ( formObj.cal_method_cd.value == "DTV" ) {
		sheetObj.SetCellValue(row, prefix + "unit_cd", formObj.vol_unit.value);
		sheetObj.SetCellValue(row, prefix + "qty", "1");
		sheetObj.SetCellValue(row, prefix + "unit_price", formObj.rate_per_vol.value);
	}
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.set_fr_dt,  formObj.set_to_dt, 'MM-dd-yyyy');
        break;
    }
}

function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "in_cls_no":	
					btn_Search();
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

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case "add":
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				break;
			case "search":
				if(ComIsEmpty(formObj.wh_cd)){
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				if(ComIsEmpty(formObj.ctrt_no)){
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				//--Settlement Period 체크
				if(ComIsEmpty(formObj.set_fr_dt))
				{
					ComShowCodeMessage("COM0114","Settlement Period(From)");
					$("#set_fr_dt").focus();
					return false;
				}
				if(ComIsEmpty(formObj.set_to_dt))
				{
					ComShowCodeMessage("COM0114","Settlement Period(To)");
					$("#set_to_dt").focus();
					return false;
				}

				if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
					ComShowCodeMessage("COM0122","Settlement Period");
					formObj.set_fr_dt.focus();
					return false;
				}
				break;
			case "save":
			case "confirm":
				
				if (sAction == "confirm") {
					if(ComIsEmpty(formObj.in_cls_no)){
						ComShowCodeMessage("COM0114","Closing No");
						$("#in_cls_no").focus();
						return false;
					}
					// Settlement Period Check
//					var sSetFrDt = mkFormat1(formObj.set_fr_dt.value);
//					var sSetToDt = mkFormat1(formObj.set_to_dt.value);
//					
//					if (sSetFrDt != formObj.h_set_fr_dt.value || sSetToDt != formObj.h_set_to_dt.value) {
//						ComShowCodeMessage("COM0811","Settlement Period of search condition", "Period");
//						formObj.set_fr_dt.focus();
//						return false;
//					} 
				}

				var sheetObj;
				var prefix_grid="";

				// "EDB":Ending Balance,"DAY":Daily In & Out
				if (formObj.cal_method_cd.value == "DAY") {
					sheetObj=sheet2;
					prefix_grid="Grd02";
				// "FIX":Fixed Rate
				} else if (formObj.cal_method_cd.value == "FIX") {
					sheetObj=sheet3;
					prefix_grid="Grd03";
				// "DTV" : Daily Total Volume - //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE 
				} else if (formObj.cal_method_cd.value == "DTV") {
					sheetObj=sheet4;
					prefix_grid="Grd04";
				} else {
					sheetObj=sheet1;
					prefix_grid="Grd01";
				}
				
				//sheet의 row가 0건일경우
				if(sheetObj.RowCount()==0)
				{
					ComShowCodeMessage("COM0323");
					return false;
				}
				
				//#3306-[BINEX] [WMS4.0] CLOSING ENTRY TO HAVE CURRENCY COLUMN
				var firstRowCurr = "Start";
				var rowCurr = "";
				
				// Total 제외
				for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){								
					if(sheetObj.GetRowStatus(i) == "D") {
						continue;
					}
					//#3306-[BINEX] [WMS4.0] CLOSING ENTRY TO HAVE CURRENCY COLUMN Start
					if(sheetObj.GetCellValue(i, prefix_grid + "curr_cd").trim() == ""){
						ComShowCodeMessage("COM0114","Curr");
						sheetObj.SelectCell(i,  prefix_grid + "curr_cd");
						return false;
					}
					
					if(firstRowCurr == "Start"){
						firstRowCurr = sheetObj.GetCellValue(i, prefix_grid + "curr_cd");
					}
					rowCurr = sheetObj.GetCellValue(i, prefix_grid + "curr_cd");
					
					if(firstRowCurr != rowCurr){
						//alert("You can not proceed with closing since some items have different currency than others. \nYou must have one currency for all items. \n\nPlease check item setting or delete different currency items to proceed.")
						ComShowCodeMessage("COM0784");
						sheetObj.SelectCell(i,  prefix_grid + "curr_cd");
						return false;
					}
					//#3306-[BINEX] [WMS4.0] CLOSING ENTRY TO HAVE CURRENCY COLUMN End
					
					// Closing Status가 Confirmed Or Invoiced인 경우
					if (sheetObj.GetCellValue(i, prefix_grid + "sts_cd") == "CON" 
						|| sheetObj.GetCellValue(i, prefix_grid + "sts_cd") == "INV") {
						var stsNm = "confirmed";
						if (sheetObj.GetCellValue(i, prefix_grid + "sts_cd") == "INV") {
							stsNm = "invoiced";
						}
						ComShowCodeMessage("COM132620","Modify",stsNm);
						sheetObj.SelectCell(i, prefix_grid +  "tj_dt");
						return false;
					}
					//--Settlement Period 체크
					if(sheetObj.GetCellValue(i, prefix_grid + "set_fr_dt").trim() == "")
					{
						ComShowCodeMessage("COM0114","Settlement Period(From)");
						sheetObj.SelectCell(i, prefix_grid +  "set_fr_dt");
						return false;
					}
					if(sheetObj.GetCellValue(i, prefix_grid + "set_to_dt").trim() == "")
					{
						ComShowCodeMessage("COM0114","Settlement Period(To)");
						sheetObj.SelectCell(i, prefix_grid +  "set_to_dt");
						return false;
					}
					if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
						ComShowCodeMessage("COM0122","Settlement Period");
						formObj.set_fr_dt.focus();
						return false;
					}
					//Settlement Period From To에 해당하는지 체크
					var trans_dt=sheetObj.GetCellValue(i, prefix_grid + "tj_dt").trim();
					
					if(ComParseInt(changeDate_yyyymmdd(ComReplaceStr($("#set_fr_dt").val(), '-', ''))) > trans_dt)
					{
						ComShowCodeMessage("COM0385","Transation Date");
						sheetObj.SelectCell(i,  prefix_grid + "tj_dt");
						return false;
					}
					if(ComParseInt(changeDate_yyyymmdd(ComReplaceStr($("#set_to_dt").val(), '-', ''))) < trans_dt)
					{
						ComShowCodeMessage("COM0385","Transation Date");
						sheetObj.SelectCell(i,  prefix_grid + "tj_dt");
						return false;
					}
					
					//--Office
					if(sheetObj.GetCellValue(i, prefix_grid + "ofc_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Office");
						sheetObj.SelectCell(i, prefix_grid +  "ofc_cd");
						return false;
					}
					//--contract 체크
					if(sheetObj.GetCellValue(i, prefix_grid + "ctrt_no").trim() == "")
					{
						ComShowCodeMessage("COM0114","Contract");
						sheetObj.SelectCell(i, prefix_grid +  "ctrt_no");
						return false;
					}
					//--Billing Customer 체크
					if(sheetObj.GetCellValue(i, prefix_grid + "cust_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Billing Customer");
						sheetObj.SelectCell(i, prefix_grid +  "cust_cd");
						return false;
					}
					//--Type 체크
					if(sheetObj.GetCellValue(i, prefix_grid + "rate_tp_cd").trim() == "ALL")
					{
						ComShowCodeMessage("COM0005","Type");
						sheetObj.SelectCell(i, prefix_grid +  "rate_tp_cd");
						return false;
					}
					//--Freight
					if(sheetObj.GetCellValue(i, prefix_grid + "frt_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Freight Code");
						sheetObj.SelectCell(i, prefix_grid +  "frt_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, prefix_grid + "frt_nm").trim() == "")
					{
						ComShowCodeMessage("COM0114","Freight Name");
						sheetObj.SelectCell(i, prefix_grid +  "frt_nm");
						return false;
					}
					//--Currency
					if(sheetObj.GetCellValue(i, prefix_grid + "curr_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Currency");
						sheetObj.SelectCell(i, prefix_grid +  "curr_cd");
						return false;
					}
					//--UNIT_CD
					if(sheetObj.GetCellValue(i, prefix_grid + "item_cd").trim() != "" && sheetObj.GetCellValue(i, prefix_grid + "unit_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Unit 1");
						sheetObj.SelectCell(i, prefix_grid +  "unit_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, prefix_grid + "unit_cd").trim() != "")
					{
						if (sheetObj.GetCellValue(i, prefix_grid + "unit_cd")!="ODR" && sheetObj.GetCellValue(i, prefix_grid + "unit_cd")!="HOR") {
							if(sheetObj.GetCellValue(i, prefix_grid + "unit_cd2").trim() == ""){
								ComShowCodeMessage("COM0114","Unit2");
								sheetObj.SelectCell(i, prefix_grid +  "unit_cd2");
								return false;
							}
						}
					}
					//--qty
//					var qty=eval(sheetObj.GetCellValue(i, prefix_grid + "qty"));
//					if(qty == 0)
//					{
//						ComShowCodeMessage("COM0114","PKGS");
//						sheetObj.SelectCell(i, prefix_grid +  "qty");
//						return false;
//					}
					//--unit price
					var unit_price=eval(sheetObj.GetCellValue(i, prefix_grid + "unit_price"));
					if(unit_price == 0)
					{
						ComShowCodeMessage("COM0114","RATE");
						sheetObj.SelectCell(i, prefix_grid +  "unit_price");
						return false;
					}
					//--WH_CD 체크
					if(sheetObj.GetCellValue(i, prefix_grid + "wh_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Warehouse");
						sheetObj.SelectCell(i, prefix_grid +  "wh_cd");
						return false;
					}
					//--신규로 add한건이 이미 confirm이후의 상태이면 add못하게끔 체크
					if(sheetObj.GetRowStatus(i) == "I")
					{
						var key=sheetObj.GetCellValue(i, prefix_grid + "cls_dt") + "|"
						+ sheetObj.GetCellValue(i, prefix_grid + "set_fr_dt") + "|"
						+ sheetObj.GetCellValue(i, prefix_grid + "set_to_dt") + "|"
						+ sheetObj.GetCellValue(i, prefix_grid + "ofc_cd") + "|"
						+ sheetObj.GetCellValue(i, prefix_grid + "wh_cd") + "|"
						+ sheetObj.GetCellValue(i, prefix_grid + "ctrt_no") + "|"
						+ sheetObj.GetCellValue(i, prefix_grid + "cust_cd");
						for(var m=sheetObj.HeaderRows(); m<=sheetObj.LastRow();m++){
						if(sheetObj.GetRowStatus(m) != "I")
						{
							var key2=sheetObj.GetCellValue(m, prefix_grid + "cls_dt") + "|"
							+ sheetObj.GetCellValue(m, prefix_grid + "set_fr_dt") + "|"
							+ sheetObj.GetCellValue(m, prefix_grid + "set_to_dt") + "|"
							+ sheetObj.GetCellValue(m, prefix_grid + "ofc_cd") + "|"
							+ sheetObj.GetCellValue(m, prefix_grid + "wh_cd") + "|"
							+ sheetObj.GetCellValue(m, prefix_grid + "ctrt_no") + "|"
							+ sheetObj.GetCellValue(m, prefix_grid + "cust_cd");
							}
						}
					}
				}
				break;
			case "delete":
			case "cfcancel":
				if(ComIsEmpty(formObj.in_cls_no)){
					ComShowCodeMessage("COM0114","Closing No");
					$("#in_cls_no").focus();
					return false;
				}
				
				// Settlement Period Check
//				var sSetFrDt = mkFormat1(formObj.set_fr_dt.value);
//				var sSetToDt = mkFormat1(formObj.set_to_dt.value);
//				
//				if (sSetFrDt != formObj.h_set_fr_dt.value || sSetToDt != formObj.h_set_to_dt.value) {
//					ComShowCodeMessage("COM0811","Settlement Period of search condition", "Period");
//					formObj.set_fr_dt.focus();
//					return false;
//				} 
				break;
		}
	}
	return true;
}


/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(){
	if (ComDisableTdButton("btn_ctrt_no", 2)) {
		return;
	}
	
	var ord_tp_lvl1_cd = "\'P\'";
	
	var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]="";
	rtnary[1]=formObj.ctrt_nm.value;
	rtnary[2]=ord_tp_lvl1_cd;
	rtnary[3]=window;
	var param = "?ctrt_nm=" + formObj.ctrt_nm.value + "&ord_tp_lvl1_cd=" + ord_tp_lvl1_cd;
	
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt'+param, rtnary, 900, 580,"yes");
}

/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_no.value=rtnValAry[0];//full_nm
		formObj.ctrt_nm.value=rtnValAry[1];//full_nm
		formObj.rtp_no.value=rtnValAry[9];//full_nm
	}
}

/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
var cur_RTP_NO_ONLY;
function getCtrtInfo(obj, RTP_NO_ONLY){
	cur_RTP_NO_ONLY = RTP_NO_ONLY;
	if(obj.value != ""){
		var ord_tp_lvl1_cd="\'P\'";
/*		var sXml=docObjects[0].GetSearchData("searchTlCtrtInfo.clt?ctrt_no="+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd);			
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){			
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));		
		}
		resultCtrtInfo(sXml, RTP_NO_ONLY);
*/		
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd, './GateServlet.gsl');
	}
	else
	{
		if(RTP_NO_ONLY == "")
		{
			$("#ctrt_nm").val("");
		}
		$("#rtp_no").val("");
	}
}


function resultCtrtInfo(resultXml) {
	var RTP_NO_ONLY = cur_RTP_NO_ONLY;
	
	var doc = getAjaxMsgXML(resultXml);
	var formObj = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('@@;');
		var masterVals = rtnArr[0].split('@@^');	
		formObj.ctrt_nm.value = masterVals[3];
		formObj.ctrt_unit.value = masterVals[30];
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
		formObj.ctrt_unit.value = "";
	}
	
}



/*
 * 각모드별 화면을 셋팅
 */
function commonModeChange(mode, rowCnt)
{
	var formObj=document.form;
	switch(mode) 
	{
		case "INIT":
			save_ok_flg = false
			formObj.reset();
			$("#mode").val(mode);
			$("#in_cls_no").val("");
			$("#cls_no").val("");
			
			$("#req_cls_no").val("");
			$("#req_cust_no").val("");
			$("#f_ref_no").val("");

			sheet1.RemoveAll();
			sheet2.RemoveAll();
			sheet3.RemoveAll();
			sheet4.RemoveAll();

			// "EDB":Ending Balance,"DAY":Daily In & Out, "FIX":Fixed Rate
			if (formObj.cal_method_cd.value == "EDB") {
				formObj.cal_method_nm.value = "Ending Balance";
				document.getElementById("div_sheet_A").style.display="block";
				document.getElementById("div_sheet_B").style.display="none";
				document.getElementById("div_sheet_C").style.display="none";
				document.getElementById("div_sheet_D").style.display="none";
				
				document.getElementById("rate_per_vol_text").style.display="none";
				document.getElementById("rate_per_vol").style.display="none";
				document.getElementById("vol_unit_text").style.display="none";
				document.getElementById("vol_unit").style.display="none";
				document.getElementById("vol_unit_nm").style.display="none";
				document.getElementById("inc_inDate_text").style.display="block";
				document.getElementById("incl_ib_dt").style.display="block";
				document.getElementById("inc_outDate_text").style.display="block";
				document.getElementById("incl_ob_dt").style.display="block";
				
				document.getElementById("cyc_cd_text").style.display="none";
				document.getElementById("cyc_cd_nm").style.display="none";
			} else if (formObj.cal_method_cd.value == "FIX") {
				formObj.cal_method_nm.value = "Fixed Rate";
				document.getElementById("div_sheet_A").style.display="none";
				document.getElementById("div_sheet_B").style.display="none";
				document.getElementById("div_sheet_C").style.display="block";
				document.getElementById("div_sheet_D").style.display="none";

				document.getElementById("rate_per_vol_text").style.display="none";
				document.getElementById("rate_per_vol").style.display="none";
				document.getElementById("vol_unit_text").style.display="none";
				document.getElementById("vol_unit").style.display="none";
				document.getElementById("vol_unit_nm").style.display="none";
				document.getElementById("inc_inDate_text").style.display="none";
				document.getElementById("incl_ib_dt").style.display="none";
				document.getElementById("inc_outDate_text").style.display="none";
				document.getElementById("incl_ob_dt").style.display="none";

				document.getElementById("cyc_cd_text").style.display="block";
				document.getElementById("cyc_cd_nm").style.display="block";
			} else if (formObj.cal_method_cd.value == "DAY") {
				formObj.cal_method_nm.value = "Daily In & Out";
				document.getElementById("div_sheet_A").style.display="none";
				document.getElementById("div_sheet_B").style.display="block";
				document.getElementById("div_sheet_C").style.display="none";
				document.getElementById("div_sheet_D").style.display="none";

				document.getElementById("rate_per_vol_text").style.display="none";
				document.getElementById("rate_per_vol").style.display="none";
				document.getElementById("vol_unit_text").style.display="none";
				document.getElementById("vol_unit").style.display="none";
				document.getElementById("vol_unit_nm").style.display="none";
				document.getElementById("inc_inDate_text").style.display="block";
				document.getElementById("incl_ib_dt").style.display="block";
				document.getElementById("inc_outDate_text").style.display="block";
				document.getElementById("incl_ob_dt").style.display="block";

				document.getElementById("cyc_cd_text").style.display="none";
				document.getElementById("cyc_cd_nm").style.display="none";
			} else if (formObj.cal_method_cd.value == "DTV") {  //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
				formObj.cal_method_nm.value = "Daily Total Volume";
				document.getElementById("div_sheet_A").style.display="none";
				document.getElementById("div_sheet_B").style.display="none";
				document.getElementById("div_sheet_C").style.display="none";
				document.getElementById("div_sheet_D").style.display="block";

				document.getElementById("rate_per_vol_text").style.display="block";
				document.getElementById("rate_per_vol").style.display="block";
				document.getElementById("vol_unit_text").style.display="block";
				document.getElementById("vol_unit").style.display="block";
				document.getElementById("vol_unit_nm").style.display="block";
				document.getElementById("inc_inDate_text").style.display="block";
				document.getElementById("incl_ib_dt").style.display="block";
				document.getElementById("inc_outDate_text").style.display="block";
				document.getElementById("incl_ob_dt").style.display="block";

				document.getElementById("cyc_cd_text").style.display="none";
				document.getElementById("cyc_cd_nm").style.display="none";
			} else {
				formObj.cal_method_nm.value = "";
				document.getElementById("div_sheet_A").style.display="block";
				document.getElementById("div_sheet_B").style.display="none";
				document.getElementById("div_sheet_C").style.display="none";

				document.getElementById("rate_per_vol_text").style.display="none";
				document.getElementById("rate_per_vol").style.display="none";
				document.getElementById("vol_unit_text").style.display="none";
				document.getElementById("vol_unit").style.display="none";
				document.getElementById("vol_unit_nm").style.display="none";
				document.getElementById("inc_inDate_text").style.display="block";
				document.getElementById("incl_ib_dt").style.display="block";
				document.getElementById("inc_outDate_text").style.display="block";
				document.getElementById("incl_ob_dt").style.display="block";

				document.getElementById("cyc_cd_text").style.display="none";
				document.getElementById("cyc_cd_nm").style.display="none";
			}

			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE			
			formObj.f_ref_no.readOnly = false;
			formObj.f_remark.readOnly = false;

			commonButtonChange(mode);
			$("#wh_cd").val($("#def_wh_cd").val());
			$("#ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
			//날짜 셋팅
			$("#cls_dt").val(ComGetNowInfo());
			btn_Change_Date("month");
			//TYPE콤보
//			$("#rate_tp_cd option[value='STO']").prop('selected', true);
			//DEF_VALUE 셋팅
			//ctrt_no에 해당하는 rtp_no 기본값 셋팅
			if (!isNull(formObj.ctrt_no)) {
				getCtrtInfo(formObj.ctrt_no, "RTP_NO_ONLY");
			}
			
			loading_flag = "Y";
			break;
		case "CREATE":
			$("#mode").val(mode);
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE
			formObj.f_remark.readOnly = false;
			formObj.f_ref_no.readOnly = false;
			commonButtonChange(mode);
			break;
		case "CONFIRM":
			$("#mode").val(mode);
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE
			formObj.f_remark.readOnly = true;
			formObj.f_ref_no.readOnly = true;
			commonButtonChange(mode);
			break;
		case "INVOICE":
			$("#mode").val(mode);
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE
			formObj.f_remark.readOnly = true;
			formObj.f_ref_no.readOnly = true;
			commonButtonChange(mode);
			break;
		case "SEARCH_BEF":
			$("#mode").val(mode);
			
			$("#cls_no").val("");
			if (!save_ok_flg) {
				$("#req_cls_no").val("");
				$("#req_cust_no").val("");
			}
			$("#in_cls_no").val("");
			$("#s_cust_nm").val("");
			$("#s_cust_cd").val("");
			$("#s_inv_ttl_amt").val("");
			$("#s_curr_cd").val("");
			$("#in_status_cd").val("");
			$("#in_status_nm").val("");
			$("#h_set_fr_dt").val("");
			$("#h_set_to_dt").val("");
			$("#in_period").val("");
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE
			$("#f_remark").val("");
			$("#f_ref_no").val("");
			formObj.f_ref_no.readOnly = false;
			commonButtonChange(mode); //버튼			
			break;
		case "SEARCH":
			$("#mode").val(mode);
			formObj.f_ref_no.readOnly = false;
			commonButtonChange(mode, rowCnt); //버튼			
			break;
	}
}

var dt = "";
function btn_Change_Date(div)
{
	var flag="";
	var val=0;
	if($("#cls_dt").val().trim() == "")
	{
		return;
	}
	if(div == "week")
	{
		flag="d";
		val=-7;
	}
	else if(div == "half_month")
	{
		flag="d";
		val=-15;
	}
	else if(div == "month")
	{
		flag="m";
		val=-1;
	}
	dt=ComGetDateAdd($("#cls_dt").val(), flag, val, "-");

	var formObj=document.form;
	var ctrt_no = formObj.ctrt_no.value;
	var wh_cd = formObj.wh_cd.value;
	var set_fr_dt = mkFormat1(ComGetDateAdd(dt, "d", 1, "-").trim());
	var set_to_dt = mkFormat1($("#cls_dt").val().trim());
	var cls_no = formObj.in_cls_no.value;
	if (ComIsNull(ctrt_no)) {
		$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
		$("#set_to_dt").val($("#cls_dt").val());	
	} else {
		// 등록된 Settlement Preiod - Max To Date 날짜로 셋팅
		ajaxSendPost(setSettlementFromDate, 'reqVal', '&goWhere=aj&bcKey=checkSettlementDate&ctrt_no='+ctrt_no + '&wh_cd='+wh_cd + '&set_fr_dt=' + set_fr_dt + '&set_to_dt=' + set_to_dt + '&cls_no=' + cls_no, './GateServlet.gsl');
	}
	
}

function setSettlementFromDate(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 등록된 Settlement Preiod - Max To Date 날짜로 셋팅
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				$("#set_fr_dt").val(ComGetDateAdd(doc[1], "d", 1, "-"));
				$("#set_to_dt").val($("#cls_dt").val());	
			} else {
				$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
				$("#set_to_dt").val($("#cls_dt").val());	
			}
			if (getDaysBetween2($("#set_fr_dt").val(), $("#set_to_dt").val())<0) {
				// {?msg1} is finished Until {?msg2} 
				ComShowCodeMessage("COM0813","Closing" , "'" + $("#cls_dt").val() + "'");
				$("#set_fr_dt").val("");
				$("#set_to_dt").val($("#cls_dt").val());	
			}
		}
	}
}

/*
 * 버튼 change
 */
function commonButtonChange(mode, rowCnt)
{
	switch(mode)
	{
	case "INIT" :
		fn_ComBtnDisable("btnSave");
		fn_ComBtnDisable("btnSaveX");
		fn_ComBtnDisable("btnDelete");
		fn_ComBtnDisable("btn_confirm");
		fn_ComBtnDisable("btn_cfcancel");			
		ComBtnDisable("btn_add");
		break;
	case "CREATE" :
		fn_ComBtnEnable("btnSave");
		fn_ComBtnEnable("btnSaveX");
		fn_ComBtnEnable("btnDelete");
		fn_ComBtnEnable("btn_confirm");
		fn_ComBtnDisable("btn_cfcancel");
		ComBtnEnable("btn_add");
		break;
	case "CONFIRM" :
		fn_ComBtnDisable("btnSave");
		fn_ComBtnDisable("btnSaveX");
		fn_ComBtnDisable("btnDelete");
		fn_ComBtnDisable("btn_confirm");
		fn_ComBtnEnable("btn_cfcancel");
		ComBtnDisable("btn_add");
		break;
	case "INVOICE" :
		fn_ComBtnDisable("btnSave");
		fn_ComBtnDisable("btnSaveX");
		fn_ComBtnDisable("btnDelete");
		fn_ComBtnDisable("btn_confirm");
		fn_ComBtnDisable("btn_cfcancel");
		ComBtnDisable("btn_add");
		break;
	case "SEARCH_BEF" :
		fn_ComBtnEnable("btnSave");
		fn_ComBtnEnable("btnSaveX");
		fn_ComBtnDisable("btnDelete");
		fn_ComBtnDisable("btn_confirm");
		fn_ComBtnDisable("btn_cfcancel");		
		ComBtnEnable("btn_add");
		break;
	case "SEARCH" :
		if (rowCnt > 0) {
			fn_ComBtnEnable("btnSave");
			fn_ComBtnEnable("btnSaveX");
			fn_ComBtnDisable("btnDelete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cfcancel");			
			ComBtnEnable("btn_add");
		} else {
			fn_ComBtnDisable("btnSave");
			fn_ComBtnDisable("btnSaveX");
			fn_ComBtnDisable("btnDelete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cfcancel");			
			ComBtnDisable("btn_add");
		}
		break;
	}
}

/*
 * header정보 enable여부 변경
 */
function headerInfoChange(flg)
{
	var formObj = document.form;
	ComEnableObject(formObj.wh_cd, flg);
	ComEnableObject(formObj.wh_nm, flg);
	ComEnableObject(formObj.ctrt_no, flg);
	ComEnableObject(formObj.ctrt_nm, flg);
	ComEnableObject(formObj.cls_dt, flg);
	ComEnableObject(formObj.set_fr_dt, flg);
	ComEnableObject(formObj.set_to_dt, flg);	
	ComEnableObject(formObj.btn_cls_dt, flg);
	ComEnableObject(formObj.btn_set_fr_dt, flg);
	ComEnableObject(formObj.btn_set_to_dt, flg);
	ComEnableObject(formObj.btn_wh_cd, flg);
	ComEnableObject(formObj.btn_ctrt_no, flg);
	
	
	ComBtnEnable("btn_change_date1");
	ComBtnEnable("btn_change_date2");
	ComBtnEnable("btn_change_date3");
	
	sb_cls_cd.Enable = flg;

}

/*
 * Show Sub Sum
 */
function displaySubSum()
{
	sheet1.ShowSubSum(fix_grid01 + "sb_cls_cd"
	          , fix_grid01 + "basic_amt|" + fix_grid01 + "adjust_amt|" + fix_grid01 + "tot_amt"
	          , -1
	          , false
	          , false
	          , sheet1.SaveNameCol(fix_grid01 + "sub_sum_row")
	          ,fix_grid01 + "cls_no=%s" + ";" 
	          +fix_grid01 + "ctrt_no=%s" + ";"
	          +fix_grid01 + "ctrt_nm=%s" + ";" 
	          +fix_grid01 + "cust_cd=%s" + ";"
	          +fix_grid01 + "cust_nm=%s" + ";"
	          +fix_grid01 + "sb_cls_cd=TOTAL" + ";"
	          +fix_grid01 + "sub_sum_row_div=TOTAL" + ";"
				);	
}

//contains 메소드 추가
Array.prototype.contains=function(element) {
	for (var i=0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};

function ComDisableTdButton(btId, flg)
{
    if (flg==1) {
    	var vClassName = document.getElementById(btId).className;
		if("Btn_Disable" == vClassName)	return true;
		return false;
    }else if (flg==2) {
    	if(document.getElementById(btId).disabled)	return true;
		return false;
    }
}

function CB_ajaxTradePaner(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_cd",masterVals[0],0);
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_nm",masterVals[3],0);
			
		}else{
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_cd","",0);
			sheet1.SetCellValue(sheet1.GetSelectRow(),fix_grid01+"cust_nm","",0);
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
}

function ComAbsRound(obj, pos) {
    try {
        //첫번째 인자가 문자열 또는 HTML태그(Object)인 경우 처리
        var num = getArgValue(obj);
        var minus = 1;

        if (pos==undefined || pos==null ) pos = 2;

        var posV = Math.pow(10, pos);
        
        if ( num < 0 ) minus = -1;
         
        return Math.round(Math.abs(num)*posV)/posV*minus;
    } catch(err) { ComFuncErrMsg(err.message); }
}
//merge row
function mergeCell(Row){
	var prefix="Grd01";
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet1.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}
function checkDataMerge(i){
	getData(i);
	if(cls_no == cls_no_ori && cls_dt == cls_dt_ori
			&& set_fr_dt == set_fr_dt_ori && set_to_dt == set_to_dt_ori
			&& ofc_cd == ofc_cd_ori && ctrt_no == ctrt_no_ori
			&& ctrt_nm == ctrt_nm_ori && chk1 == chk1_ori
			&& cust_cd == cust_cd_ori && cust_nm == cust_nm_ori
			&& sb_cls_cd == sb_cls_cd_ori && sub_tot == sub_tot_ori
			&& sts_cd == sts_cd_ori && so_no == so_no_ori){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet1.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i){
	var prefix="Grd01";
	cls_no_ori = sheet1.GetCellValue(i, prefix+"cls_no");
	cls_dt_ori = sheet1.GetCellValue(i, prefix+"cls_dt");
	set_fr_dt_ori = sheet1.GetCellValue(i, prefix+"set_fr_dt");
	set_to_dt_ori = sheet1.GetCellValue(i, prefix+"set_to_dt");
	ofc_cd_ori = sheet1.GetCellValue(i, prefix+"ofc_cd");
	ctrt_no_ori = sheet1.GetCellValue(i, prefix+"ctrt_no");
	ctrt_nm_ori = sheet1.GetCellValue(i, prefix+"ctrt_nm");
	chk1_ori = sheet1.GetCellValue(i, prefix+"chk1");
	cust_cd_ori = sheet1.GetCellValue(i, prefix+"cust_cd");
	cust_nm_ori = sheet1.GetCellValue(i, prefix+"cust_nm");
	sts_cd_ori = sheet1.GetCellValue(i, prefix+"sts_cd");
	so_no_ori = sheet1.GetCellValue(i, prefix+"so_no");
	sb_cls_cd_ori = sheet1.GetCellValue(i, prefix+"sb_cls_cd");
	sub_tot_ori = sheet1.GetCellValue(i, prefix+"sub_tot");
}
function getData(i){
	var prefix="Grd01";	
	cls_no = sheet1.GetCellValue(i, prefix+"cls_no");
	cls_dt = sheet1.GetCellValue(i, prefix+"cls_dt");
	set_fr_dt = sheet1.GetCellValue(i, prefix+"set_fr_dt");
	set_to_dt = sheet1.GetCellValue(i, prefix+"set_to_dt");
	ofc_cd = sheet1.GetCellValue(i, prefix+"ofc_cd");
	ctrt_no = sheet1.GetCellValue(i, prefix+"ctrt_no");
	ctrt_nm = sheet1.GetCellValue(i, prefix+"ctrt_nm");
	chk1 = sheet1.GetCellValue(i, prefix+"chk1");
	cust_cd = sheet1.GetCellValue(i, prefix+"cust_cd");
	cust_nm = sheet1.GetCellValue(i, prefix+"cust_nm");
	sts_cd = sheet1.GetCellValue(i, prefix+"sts_cd");
	so_no = sheet1.GetCellValue(i, prefix+"so_no");
	sb_cls_cd = sheet1.GetCellValue(i, prefix+"sb_cls_cd");
	sub_tot = sheet1.GetCellValue(i, prefix+"sub_tot");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 1, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 2, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 3, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 4, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 9, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 11, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 12, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 13, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 14, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 15, totalRowMerge, 1);
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(wh_cd){
	var formObj = document.form;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	if(wh_cd == "" || wh_cd == undefined){
		wh_cd  = formObj.wh_cd.value;
	}
	var warehouse = wh_cd;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btnSave");
		ComBtnDisable("btnSaveX");
		ComBtnDisable("btnDelete");
		ComBtnDisable("btn_confirm");
		ComBtnDisable("btn_cfcancel");
		ComBtnDisable("btn_excel");
		ComBtnDisable("bt_ar_create");
		ComBtnDisable("bt_ap_create");
	}else{
		ComBtnEnable("btnSave");
		ComBtnEnable("btnSaveX");
		ComBtnEnable("btn_excel");
		ComBtnEnable("bt_ar_create");
		ComBtnEnable("bt_ap_create");
		
		//ComBtnEnable("btnDelete");
		//ComBtnEnable("btn_confirm");
		//ComBtnEnable("btn_cfcancel");
		ComBtnEnable("btn_excel");
	}
}

//조회
function btn_Search(){
	var formObj = document.form;
	var sheetObj=sheet1;
	
	commonModeChange("SEARCH_BEF");
	sheet1.RemoveAll();
	sheet2.RemoveAll();
	sheet3.RemoveAll();
	sheet4.RemoveAll(); //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE

	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;
	}
	
	formObj.f_cmd.value = SEARCH;
	var sXml=sheetObj.GetSearchData("./ClosingStoChgMgmtGS.clt", FormQueryString(formObj,""));

	var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
	var endIndxCheck = sXml.indexOf("</CHECK>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	var $xml = $(xmlDoc);

	var strtIndxCheck2 = sXml.indexOf("<CHECK2>") + "<CHECK2>".length;
	var endIndxCheck2 = sXml.indexOf("</CHECK2>");
	
	var xmlDoc2 = $.parseXML(sXml.substring(strtIndxCheck2,endIndxCheck2));
	var $xml2 = $(xmlDoc2);
	
	//Load Contract Info
	var strtIndxSheet = sXml.indexOf("<CTRT_CUST_CD>");
	var endIndxSheet = sXml.indexOf("</CTRT_CUST_CD>") + "</CTRT_CUST_CD>".length;
	var strtCustCd = sXml.substring(strtIndxSheet + "<CTRT_CUST_CD>".length ,endIndxSheet - "</CTRT_CUST_CD>".length );
	if (ComIsEmpty(formObj.s_cust_cd)) {
		formObj.s_cust_cd.value = strtCustCd;
	}
	var strtIndxSheet2 = sXml.indexOf("<CTRT_CUST_NM>");
	var endIndxSheet2 = sXml.indexOf("</CTRT_CUST_NM>") + "</CTRT_CUST_NM>".length;
	var strtCustNm = sXml.substring(strtIndxSheet2 + "<CTRT_CUST_NM>".length ,endIndxSheet2 - "</CTRT_CUST_NM>".length );
	if (ComIsEmpty(formObj.s_cust_nm)) {
		formObj.s_cust_nm.value = strtCustNm;
	}

	if ($xml2.find( "hdrCnt").text() != '0'){// Header Info
		setDataControl(sXml);
	}

	//Load WH Office Code Info
	var strtIndxSheet = sXml.indexOf("<WH_OFC_CD>");
	var endIndxSheet = sXml.indexOf("</WH_OFC_CD>") + "</WH_OFC_CD>".length;
	var whOfcCd = sXml.substring(strtIndxSheet + "<WH_OFC_CD>".length ,endIndxSheet - "</WH_OFC_CD>".length );
	
	//Load WH Office Code에 해당하는 Currency
	var strtIndxSheet2 = sXml.indexOf("<WH_CURR_CD>");
	var endIndxSheet2 = sXml.indexOf("</WH_CURR_CD>") + "</WH_CURR_CD>".length;
	var whCurrCd = sXml.substring(strtIndxSheet2 + "<WH_CURR_CD>".length, endIndxSheet2 - "</WH_CURR_CD>".length );
	
	if (whOfcCd == null || whOfcCd == "" ) {
		formObj.wh_ofc_cd.value = formObj.org_cd.value;
	} else {
		formObj.wh_ofc_cd.value = whOfcCd;
	} 
	formObj.wh_curr_cd.value = whCurrCd;
	formObj.s_curr_cd.value = whCurrCd;
	document.getElementById("sp_curr_cd").innerHTML = whCurrCd;
	
	// Contract의 Calculation Method Cd 
	var strtIndxField2 = sXml.indexOf("<FIELD2>") + "<FIELD2>".length;
	var endIndxField2 = sXml.indexOf("</FIELD2>");
	
	var xmlDoc3 = $.parseXML(sXml.substring(strtIndxField2,endIndxField2));
	var $xml3 = $(xmlDoc3);
	formObj.cal_method_cd.value = $xml3.find( "cal_method_cd").text();
	formObj.incl_ib_dt.value = $xml3.find( "incl_ib_dt_flg").text();
	formObj.incl_ob_dt.value = $xml3.find( "incl_ob_dt_flg").text();
	// Fixed Rate관련 항목
	formObj.cyc_cd_nm.value = $xml3.find( "cyc_cd_nm").text();
	
	//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
	//Daily Total Volume
	formObj.rate_per_vol.value = $xml3.find("unit_price").text();
	formObj.vol_unit.value = $xml3.find("vol_unit").text();
	formObj.vol_unit_nm.value = $xml3.find("vol_unit_nm").text();
	
	// "EDB":Ending Balance,"DAY":Daily In & Out
	if (formObj.cal_method_cd.value == "EDB") {
		formObj.cal_method_nm.value = "Ending Balance";
		document.getElementById("div_sheet_A").style.display="block";
		document.getElementById("div_sheet_B").style.display="none";
		document.getElementById("div_sheet_C").style.display="none";
		document.getElementById("div_sheet_D").style.display="none";

		document.getElementById("rate_per_vol_text").style.display="none";
		document.getElementById("rate_per_vol").style.display="none";
		document.getElementById("vol_unit_text").style.display="none";
		document.getElementById("vol_unit").style.display="none";
		document.getElementById("vol_unit_nm").style.display="none";
		document.getElementById("inc_inDate_text").style.display="block";
		document.getElementById("incl_ib_dt").style.display="block";
		document.getElementById("inc_outDate_text").style.display="block";
		document.getElementById("incl_ob_dt").style.display="block";
		
		document.getElementById("cyc_cd_text").style.display="none";
		document.getElementById("cyc_cd_nm").style.display="none";

		var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
		var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
		
		var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
		sheet1.LoadSearchData(sheet1Data.replaceAll('SHEET1', 'SHEET'));
		// "FIX":Fixed Rate
	} else if (formObj.cal_method_cd.value == "FIX") {
		formObj.cal_method_nm.value = "Fixed Rate";
		document.getElementById("div_sheet_A").style.display="none";
		document.getElementById("div_sheet_B").style.display="none";
		document.getElementById("div_sheet_C").style.display="block";
		document.getElementById("div_sheet_D").style.display="none";

		document.getElementById("rate_per_vol_text").style.display="none";
		document.getElementById("rate_per_vol").style.display="none";
		document.getElementById("vol_unit_text").style.display="none";
		document.getElementById("vol_unit").style.display="none";
		document.getElementById("vol_unit_nm").style.display="none";
		document.getElementById("inc_inDate_text").style.display="none";
		document.getElementById("incl_ib_dt").style.display="none";
		document.getElementById("inc_outDate_text").style.display="none";
		document.getElementById("incl_ob_dt").style.display="none";
		
		document.getElementById("cyc_cd_text").style.display="block";
		document.getElementById("cyc_cd_nm").style.display="block";
		
		var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
		var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
		
		var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
		sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
	} else if (formObj.cal_method_cd.value == "DTV") {	//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
		formObj.cal_method_nm.value = "Daily Total Volume";
		document.getElementById("div_sheet_A").style.display="none";
		document.getElementById("div_sheet_B").style.display="none";
		document.getElementById("div_sheet_C").style.display="none";
		document.getElementById("div_sheet_D").style.display="block";

		document.getElementById("rate_per_vol_text").style.display="block";
		document.getElementById("rate_per_vol").style.display="block";
		document.getElementById("vol_unit_text").style.display="block";
		document.getElementById("vol_unit").style.display="block";
		document.getElementById("vol_unit_nm").style.display="block";
		document.getElementById("inc_inDate_text").style.display="block";
		document.getElementById("incl_ib_dt").style.display="block";
		document.getElementById("inc_outDate_text").style.display="block";
		document.getElementById("incl_ob_dt").style.display="block";

		document.getElementById("cyc_cd_text").style.display="none";
		document.getElementById("cyc_cd_nm").style.display="none";

		var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
		var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;

		var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
		sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
	} else {
		formObj.cal_method_nm.value = "Daily In & Out";
		document.getElementById("div_sheet_A").style.display="none";
		document.getElementById("div_sheet_B").style.display="block";
		document.getElementById("div_sheet_C").style.display="none";
		document.getElementById("div_sheet_D").style.display="none";

		document.getElementById("rate_per_vol_text").style.display="none";
		document.getElementById("rate_per_vol").style.display="none";
		document.getElementById("vol_unit_text").style.display="none";
		document.getElementById("vol_unit").style.display="none";
		document.getElementById("vol_unit_nm").style.display="none";
		document.getElementById("inc_inDate_text").style.display="block";
		document.getElementById("incl_ib_dt").style.display="block";
		document.getElementById("inc_outDate_text").style.display="block";
		document.getElementById("incl_ob_dt").style.display="block";
		
		document.getElementById("cyc_cd_text").style.display="none";
		document.getElementById("cyc_cd_nm").style.display="none";
		
		var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
		var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
		
		var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
		sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
	}
}

function sheet1_OnSearchEnd(){

    var formObj=document.form; 
    // Status Saved
    if (formObj.in_status_cd.value == "SAV") {
    	commonModeChange("CREATE");
    // Status Confirmed
    } else if (formObj.in_status_cd.value == "CON") {
    	commonModeChange("CONFIRM");
    // Status Invoiced
    } else if (formObj.in_status_cd.value == "INV") {
    	commonModeChange("INVOICE");
    } else {
    	commonModeChange("SEARCH", sheet1.RowCount());
    }
    
	var sheetObj=sheet1;
    var prefix="Grd01";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    sheetObj.InitComboNoMatchText(1, "",1);
    
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
//    var amt_ttl_sum=roundXL(formObj.s_inv_ttl_amt.value * 1,2).toFixed(2);
//    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	
    	// Header Reset
    	if (i == hdrR) {
    		if (ComIsEmpty(formObj.in_period)) {
    			formObj.in_period.value = formObj.set_fr_dt.value + " ~ " + formObj.set_to_dt.value;
    		}
    		if (ComIsEmpty(formObj.wh_cd)) {
    			formObj.wh_cd.value = sheetObj.GetCellValue(i, prefix + "wh_cd");
    		}
    		if (ComIsEmpty(formObj.ctrt_no)) {
    			formObj.ctrt_no.value = sheetObj.GetCellValue(i, prefix + "ctrt_no");
    		}
    		if (ComIsEmpty(formObj.wh_ofc_cd)) {
    			formObj.wh_ofc_cd.value = sheetObj.GetCellValue(i, prefix + "ofc_cd");
    		}
    		if (ComIsEmpty(formObj.wh_curr_cd)) {
    			formObj.wh_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
    		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
    			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
    			formObj.s_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
    	}

		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			sheetObj.SetCellFontColor(i, prefix + "item_cd","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "item_nm","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "set_fr_dt","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "set_to_dt","#FF0000");
			
		} else {
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_nm",1);
//			sheetObj.SetCellEditable(i, prefix+"unit_cd",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
//			sheetObj.SetCellEditable(i, prefix+"item_cd",1);
//			sheetObj.SetCellEditable(i, prefix+"item_nm",1);
		}
		
    	var qty=Number(sheetObj.GetCellValue(i, prefix+"qty"));
    	var unit_price=Number(sheetObj.GetCellValue(i, prefix+"unit_price"));
    	var inv_amt=qty * unit_price;
    	inv_amt = roundXL(Number(inv_amt),2);
    	sheetObj.SetCellValue(i, prefix+"inv_amt", inv_amt);
    }
    
	//Total
    sheetObj.SetSumValue(prefix + "unit_price", document.getElementById("sp_curr_cd").innerHTML + " Total");

    //Column, Width 재조정하기
    sheetObj.FitSize(1, 0);
}

function sheet3_OnSearchEnd(){
	
	var formObj=document.form; 
	// Status Saved
	if (formObj.in_status_cd.value == "SAV") {
		commonModeChange("CREATE");
		// Status Confirmed
	} else if (formObj.in_status_cd.value == "CON") {
		commonModeChange("CONFIRM");
		// Status Invoiced
	} else if (formObj.in_status_cd.value == "INV") {
		commonModeChange("INVOICE");
	} else {
		commonModeChange("SEARCH", sheet3.RowCount());
	}
	
	var sheetObj=sheet3;
	var prefix="Grd03";
	hdrR = sheetObj.HeaderRows();
	rowCnt = sheetObj.RowCount();
	
	sheetObj.InitComboNoMatchText(1, "",1);
	
	var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
	var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
	formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
	
	for (var i = hdrR; i < rowCnt + hdrR; i++) {
		
		// Header Reset
		if (i == hdrR) {
			if (ComIsEmpty(formObj.in_period)) {
				formObj.in_period.value = formObj.set_fr_dt.value + " ~ " + formObj.set_to_dt.value;
			}
			if (ComIsEmpty(formObj.wh_cd)) {
				formObj.wh_cd.value = sheetObj.GetCellValue(i, prefix + "wh_cd");
			}
			if (ComIsEmpty(formObj.ctrt_no)) {
				formObj.ctrt_no.value = sheetObj.GetCellValue(i, prefix + "ctrt_no");
			}
			if (ComIsEmpty(formObj.wh_ofc_cd)) {
				formObj.wh_ofc_cd.value = sheetObj.GetCellValue(i, prefix + "ofc_cd");
			}
			if (ComIsEmpty(formObj.wh_curr_cd)) {
				formObj.wh_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
			}
    		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
    			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
    			formObj.s_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
		}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			sheetObj.SetCellFontColor(i, prefix + "item_cd","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "item_nm","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "set_fr_dt","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "set_to_dt","#FF0000");
		} else {
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_nm",1);
//			sheetObj.SetCellEditable(i, prefix+"unit_cd",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
//			sheetObj.SetCellEditable(i, prefix+"item_cd",1);
//			sheetObj.SetCellEditable(i, prefix+"item_nm",1);
		}
		
		var qty=Number(sheetObj.GetCellValue(i, prefix+"qty"));
		var unit_price=Number(sheetObj.GetCellValue(i, prefix+"unit_price"));
		var inv_amt=qty * unit_price;
		inv_amt = roundXL(Number(inv_amt),2);
		sheetObj.SetCellValue(i, prefix+"inv_amt", inv_amt);
	}
	
	//Total
	sheetObj.SetSumValue(prefix + "unit_price", document.getElementById("sp_curr_cd").innerHTML + " Total");
	
	//Column, Width 재조정하기
	sheetObj.FitSize(1, 0);
}

function sheet2_OnSearchEnd(){
	
	var formObj=document.form; 
	// Status Saved
	if (formObj.in_status_cd.value == "SAV") {
		commonModeChange("CREATE");
		// Status Confirmed
	} else if (formObj.in_status_cd.value == "CON") {
		commonModeChange("CONFIRM");
		// Status Invoiced
	} else if (formObj.in_status_cd.value == "INV") {
		commonModeChange("INVOICE");
	} else {
		commonModeChange("SEARCH", sheet2.RowCount());
	}
	
	var sheetObj=sheet2;
	var prefix="Grd02";
	hdrR = sheetObj.HeaderRows();
	rowCnt = sheetObj.RowCount();
	
	sheetObj.InitComboNoMatchText(1, "",1);
	
	var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
	var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
	formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
	
//    var amt_ttl_sum=roundXL(formObj.s_inv_ttl_amt.value * 1,2).toFixed(2);
//    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
	
	for (var i = hdrR; i < rowCnt + hdrR; i++) {
		
		// Header Reset
		if (i == hdrR) {
			if (ComIsEmpty(formObj.in_period)) {
				formObj.in_period.value = formObj.set_fr_dt.value + " ~ " + formObj.set_to_dt.value;
			}
			if (ComIsEmpty(formObj.wh_cd)) {
				formObj.wh_cd.value = sheetObj.GetCellValue(i, prefix + "wh_cd");
			}
			if (ComIsEmpty(formObj.ctrt_no)) {
				formObj.ctrt_no.value = sheetObj.GetCellValue(i, prefix + "ctrt_no");
			}
			if (ComIsEmpty(formObj.wh_ofc_cd)) {
				formObj.wh_ofc_cd.value = sheetObj.GetCellValue(i, prefix + "ofc_cd");
			}
			if (ComIsEmpty(formObj.wh_curr_cd)) {
				formObj.wh_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
			}
    		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
    			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
    			formObj.s_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
		}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			sheetObj.SetCellFontColor(i, prefix + "tj_dt","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "item_cd","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "item_nm","#FF0000");
		} else {
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_nm",1);
//			sheetObj.SetCellEditable(i, prefix+"unit_cd",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
//			sheetObj.SetCellEditable(i, prefix+"item_cd",1);
//			sheetObj.SetCellEditable(i, prefix+"item_nm",1);
		}
		
		var qty=Number(sheetObj.GetCellValue(i, prefix+"qty"));
		var unit_price=Number(sheetObj.GetCellValue(i, prefix+"unit_price"));
		var inv_amt=qty * unit_price;
		inv_amt = roundXL(Number(inv_amt),2);
		sheetObj.SetCellValue(i, prefix+"inv_amt", inv_amt);
	}
	
	//Total
	sheetObj.SetSumValue(prefix + "unit_price", document.getElementById("sp_curr_cd").innerHTML + " Total");
	
    //Column, Width 재조정하기
    sheetObj.FitSize(1, 0);
}

function sheet4_OnSearchEnd(){

    var formObj=document.form; 
    // Status Saved
    if (formObj.in_status_cd.value == "SAV") {
    	commonModeChange("CREATE");
    // Status Confirmed
    } else if (formObj.in_status_cd.value == "CON") {
    	commonModeChange("CONFIRM");
    // Status Invoiced
    } else if (formObj.in_status_cd.value == "INV") {
    	commonModeChange("INVOICE");
    } else {
    	commonModeChange("SEARCH", sheet4.RowCount());
    }
    
	var sheetObj=sheet4;
    var prefix="Grd04";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    sheetObj.InitComboNoMatchText(1, "",1);
    
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
//    var amt_ttl_sum=roundXL(formObj.s_inv_ttl_amt.value * 1,2).toFixed(2);
//    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	
    	// Header Reset
    	if (i == hdrR) {
    		if (ComIsEmpty(formObj.in_period)) {
    			formObj.in_period.value = formObj.set_fr_dt.value + " ~ " + formObj.set_to_dt.value;
    		}
    		if (ComIsEmpty(formObj.wh_cd)) {
    			formObj.wh_cd.value = sheetObj.GetCellValue(i, prefix + "wh_cd");
    		}
    		if (ComIsEmpty(formObj.ctrt_no)) {
    			formObj.ctrt_no.value = sheetObj.GetCellValue(i, prefix + "ctrt_no");
    		}
    		if (ComIsEmpty(formObj.wh_ofc_cd)) {
    			formObj.wh_ofc_cd.value = sheetObj.GetCellValue(i, prefix + "ofc_cd");
    		}
    		if (ComIsEmpty(formObj.wh_curr_cd)) {
    			formObj.wh_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
    		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
    			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
    			formObj.s_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
    	}

		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			sheetObj.SetCellFontColor(i, prefix + "item_cd","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "item_nm","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "set_fr_dt","#FF0000");
			sheetObj.SetCellFontColor(i, prefix + "set_to_dt","#FF0000");
			
		} else {
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
		}
		
    	var qty=Number(sheetObj.GetCellValue(i, prefix+"qty"));
    	var unit_price=Number(sheetObj.GetCellValue(i, prefix+"unit_price"));
    	var inv_amt=qty * unit_price;
    	inv_amt = roundXL(Number(inv_amt),2);
    	sheetObj.SetCellValue(i, prefix+"inv_amt", inv_amt);
    }

	//Total
    sheetObj.SetSumValue(prefix + "unit_price", document.getElementById("sp_curr_cd").innerHTML + " Total");

    //Column, Width 재조정하기
    sheetObj.FitSize(1, 0);
}

function sheet1_OnChange(sheetObj, Row, Col, Value){
    var formObj=document.form;
    var prefix="Grd01";
    var srcName=sheetObj.ColSaveName(Col);

    switch (srcName) {
	    case prefix+"frt_cd":
	        var frt = sheetObj.GetCellText(Row,srcName).split(":");
	        if(frt!="")
	        	sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
	        else sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
	        break;
		case prefix+"unit_price":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
	        if (qty == 0) {
	        	qty = 1;
	        }
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
        case prefix+"qty":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
	        if (qty == 0) {
	        	qty = 1;
	        } 	
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	inv_amt = roundXL(Number(inv_amt),2);
        	sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
            break;
    }
}

function sheet3_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var prefix="Grd03";
	var srcName=sheetObj.ColSaveName(Col);
	
	switch (srcName) {
	case prefix+"frt_cd":
		var frt = sheetObj.GetCellText(Row,srcName).split(":");
		if(frt!="")
			sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
		else sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
		break;
	case prefix+"unit_price":
		var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
		if (qty == 0) {
			qty = 1;
		}
		var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
		var inv_amt=qty * unit_price;
		inv_amt = roundXL(Number(inv_amt),2);
		sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
		break;
	case prefix+"qty":
		var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
		if (qty == 0) {
			qty = 1;
		} 	
		var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
		var inv_amt=qty * unit_price;
		inv_amt = roundXL(Number(inv_amt),2);
		sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
		break;
	}
}

function sheet2_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var prefix="Grd02";
	var srcName=sheetObj.ColSaveName(Col);
	
	switch (srcName) {
	case prefix+"frt_cd":
		var frt = sheetObj.GetCellText(Row,srcName).split(":");
		if(frt!="")
			sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
		else sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
		break;
	case prefix+"unit_price":
		var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        if (qty == 0) {
        	qty = 1;
        } 
		var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
		var inv_amt=qty * unit_price;
		inv_amt = roundXL(Number(inv_amt),2);
		sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
		break;
	case prefix+"qty":
		var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        if (qty == 0) {
        	qty = 1;
        } 
		var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
		var inv_amt=qty * unit_price;
		inv_amt = roundXL(Number(inv_amt),2);
		sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
//        	sheetObj.SetCellValue(Row, prefix+"inv_ttl_amt", inv_amt);
		break;
	}
}

//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
function sheet4_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var prefix="Grd04";
	var srcName=sheetObj.ColSaveName(Col);

	switch (srcName) {
		case prefix+"frt_cd" :
			var frt = sheetObj.GetCellText(Row,srcName).split(":");
			if(frt!="") {
				sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
			} else {
				sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
			}
			break;
		case prefix+"unit_price" :
			var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
			var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
			var inv_amt=qty * unit_price;
			inv_amt = roundXL(Number(inv_amt),2);
			sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
			break;
	}
}

function sheet1_OnChangeSum(sheetObj, Row, Col) {
    var formObj=document.form;
    var prefix="Grd01";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
}

function sheet3_OnChangeSum(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd03";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
	var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
	var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
	formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
}

function sheet2_OnChangeSum(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd02";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
	var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
	var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
	formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
}

// Header Info
function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.in_cls_no.value = $xml.find( "cls_no").text();
	formObj.s_cust_nm.value	= $xml.find( "cust_nm").text();
	formObj.s_cust_cd.value	= $xml.find( "cust_cd").text();

	formObj.s_inv_ttl_amt.value	= $xml.find( "inv_ttl_amt").text();
	formObj.s_curr_cd.value	= $xml.find( "curr_cd").text();
	formObj.in_status_cd.value	= $xml.find( "sts_cd").text();
	formObj.in_status_nm.value	= $xml.find( "sts_nm").text();
	// Modify시 Closing Date 업데이트
	formObj.cls_dt.value	= $xml.find( "cls_dt").text();
	formObj.h_set_fr_dt.value	= $xml.find( "set_fr_dt").text();
	formObj.h_set_to_dt.value	= $xml.find( "set_to_dt").text();
	formObj.set_fr_dt.value	= changeDate2($xml.find( "set_fr_dt").text());
	formObj.set_to_dt.value	= changeDate2($xml.find( "set_to_dt").text());
	
	formObj.in_period.value	= $xml.find( "period").text();
	formObj.wm_doc_seq.value	= $xml.find( "wm_doc_seq").text();
	// #1084 [WMS4.0]File# assign 로직 변경
	formObj.f_ref_no.value	= $xml.find( "ref_no").text();
	
	//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE
	formObj.f_remark.value	= $xml.find( "f_remark").text();

}

function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-',''); 
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4); 
	 return rtnStr;
}

function changeDate(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4);	//Month
	var m  = sDate.substr(4,2);	//day
	var d  = sDate.substr(6,2);
	return m+d+y;
}

function changeDate2(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4);	//Month
	var m  = sDate.substr(4,2);	//day
	var d  = sDate.substr(6,2);
	return m+ "-" + d + "-" + y;
}

function changeDate_yyyymmdd(sDate) {
	//mmddyyyy ---> yyyymmdd
	if (sDate == null || sDate == '') return"";
	var m  = sDate.substr(0,2);	
	var d  = sDate.substr(2,2);		
	var y  = sDate.substr(4,4);
	return y+m+d;
}



function btn_New()
{
	commonModeChange("INIT");
}

/*
 * Save
 */
function btn_Save() {
	var formObj=document.form;
	formObj.f_cmd.value = MODIFY;

	var ctrt_no = formObj.ctrt_no.value;
	var wh_cd = formObj.wh_cd.value;
	var set_fr_dt = mkFormat1(formObj.set_fr_dt.value.trim());
	var set_to_dt = mkFormat1(formObj.set_to_dt.value.trim());
	/*var cls_no = formObj.req_cls_no.value;*/
	var cls_no = formObj.in_cls_no.value;
	
	// 등록된 Settlement Preiod 체크(To Date이 후 날짜 등록 가능)
	ajaxSendPost(resultCheckSettlementDate, 'reqVal', '&goWhere=aj&bcKey=checkSettlementDate&ctrt_no='+ctrt_no + '&wh_cd='+wh_cd + '&set_fr_dt='+set_fr_dt + '&set_to_dt='+set_to_dt + '&cls_no='+cls_no , './GateServlet.gsl');

	/*if(validateForm(formObj, "save") == false)
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	
	var headerDatas=FormQueryString(formObj);
 	
	// "EDB":Ending Balance
	if (formObj.cal_method_cd.value == "EDB") {
		var frtDatas = sheet1.GetSaveString(1);
		var saveXml=sheet1.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet1.LoadSaveData(saveXml);
	// "DAY":Daily In & Out
	} else {
		var frtDatas = sheet2.GetSaveString(1);
		var saveXml=sheet2.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet2.LoadSaveData(saveXml);
	}*/
 	
}

function sheet1_OnSaveEnd(sheetObj){
	var formObj=document.form;
	// SAVE OK
	if (sheet1.GetEtcData("mess") == 'OK') {	
		showCompleteProcess();
		save_ok_flg = true;
		formObj.req_cls_no.value = sheet1.GetEtcData("cls_no");
		btn_Search();
	}else{
		if (sheet1.GetEtcData("mess") == 'NG') {
			ComShowCodeMessage("COM0816");
		} else {
			ComShowCodeMessage("COM12227");
		}
	}
}

function sheet3_OnSaveEnd(sheetObj){
	var formObj=document.form;
	// SAVE OK
	if (sheet3.GetEtcData("mess") == 'OK') {
		showCompleteProcess();
		save_ok_flg = true;
		formObj.req_cls_no.value = sheet3.GetEtcData("cls_no");
		btn_Search();
	}else{
		if (sheet3.GetEtcData("mess") == 'NG') {
			ComShowCodeMessage("COM0816");
		} else {
			ComShowCodeMessage("COM12227");
		}
	}
}

//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
function sheet4_OnSaveEnd(sheetObj){
	var formObj=document.form;
	// SAVE OK
	if (sheet4.GetEtcData("mess") == 'OK') {
		showCompleteProcess();
		save_ok_flg = true;
		if(isDelete) {
			formObj.req_cls_no.value = "";
			formObj.in_cls_no.value = "";
			isDelete = false;
		} else {
			formObj.req_cls_no.value = sheet4.GetEtcData("cls_no");
		}
		btn_Search();
	}else{
		if (sheet4.GetEtcData("mess") == 'NG') {
			ComShowCodeMessage("COM0816");
		} else {
			ComShowCodeMessage("COM12227");
		}
	}
}

function sheet2_OnSaveEnd(sheetObj){
	var formObj=document.form;
	// SAVE OK
	if (sheet2.GetEtcData("mess") == 'OK') {
		showCompleteProcess();
		save_ok_flg = true;
		formObj.req_cls_no.value = sheet2.GetEtcData("cls_no");
		btn_Search();
	}else{
		if (sheet2.GetEtcData("mess") == 'NG') {
			ComShowCodeMessage("COM0816");
		} else {
			ComShowCodeMessage("COM12227");
		}
	}
}

/*
 * 트랜잭션 delete
 */
function btn_Delete() {
	var formObj=document.form;
	formObj.f_cmd.value = REMOVE;

	if(validateForm(formObj, "delete") == false)
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0053") == false){
		return;
	}

	isDelete = true;		//#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE

	var headerDatas=FormQueryString(formObj);
	// "EDB":Ending Balance
	if (formObj.cal_method_cd.value == "EDB") {
		var frtDatas = sheet1.GetSaveString(1);
		var saveXml=sheet1.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet1.LoadSaveData(saveXml);
	// "FIX":Fixed Rate
	} else if (formObj.cal_method_cd.value == "FIX") {
		var frtDatas = sheet3.GetSaveString(1);
		var saveXml=sheet3.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet3.LoadSaveData(saveXml);
	// "DTV":Daily Total Volume - //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
	} else if (formObj.cal_method_cd.value == "DTV") {
		var frtDatas = sheet4.GetSaveString(1);
		var saveXml=sheet4.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet4.LoadSaveData(saveXml);
	// "DAY":Daily In & Out
	} else {
		var frtDatas = sheet2.GetSaveString(1);
		var saveXml=sheet2.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet2.LoadSaveData(saveXml);
	}
}

function btn_Confirm() {
	var formObj=document.form;
	formObj.f_cmd.value = COMMAND01;
	
	if(validateForm(formObj, "confirm") == false)
	{
		return;
	}
	
	//confirm     
	if(!ComShowCodeConfirm("COM0247"))
	{ 
		return;
	}
	var headerDatas=FormQueryString(formObj);
	// "EDB":Ending Balance
	if (formObj.cal_method_cd.value == "EDB") {
		var frtDatas = sheet1.GetSaveString(1);
		var saveXml=sheet1.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet1.LoadSaveData(saveXml);
	// "FIX":Fixed Rate
	} else if (formObj.cal_method_cd.value == "FIX") {
		var frtDatas = sheet3.GetSaveString(1);
		var saveXml=sheet3.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet3.LoadSaveData(saveXml);
	// "DTV":Daily Total Volume - //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
	} else if (formObj.cal_method_cd.value == "DTV") {
		var frtDatas = sheet4.GetSaveString(1);
		var saveXml=sheet4.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet4.LoadSaveData(saveXml);
	// "DAY":Daily In & Out
	} else {
		var frtDatas = sheet2.GetSaveString(1);
		var saveXml=sheet2.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet2.LoadSaveData(saveXml);
	}

}

function btn_CFCancel() {
	var formObj=document.form;
	formObj.f_cmd.value = COMMAND02;
	
	if(validateForm(formObj, "cfcancel") == false)
	{
		return;
	}
	
	//confirm     
	if(!ComShowCodeConfirm("COM0386"))
	{ 
		return;
	}
	var headerDatas=FormQueryString(formObj);
	// "EDB":Ending Balance
	if (formObj.cal_method_cd.value == "EDB") {
		var frtDatas = sheet1.GetSaveString(1);
		var saveXml=sheet1.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet1.LoadSaveData(saveXml);
	// "FIX":Fixed Rate
	} else if (formObj.cal_method_cd.value == "FIX") {
		var frtDatas = sheet3.GetSaveString(1);
		var saveXml=sheet3.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet3.LoadSaveData(saveXml);
	// "DTV":Daily Total Volume - //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
	} else if (formObj.cal_method_cd.value == "DTV") {
		var frtDatas = sheet4.GetSaveString(1);
		var saveXml=sheet4.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet4.LoadSaveData(saveXml);
	// "DAY":Daily In & Out
	} else {
		var frtDatas = sheet2.GetSaveString(1);
		var saveXml=sheet2.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
		sheet2.LoadSaveData(saveXml);
	}
}

function resultCheckSettlementDate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 이미 등록된 Settlement Period To Date(Ending Date)이전 일자가 존재 하는지 체크 
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				ComShowCodeMessage("COM12133","Settlement Period(From Date)","'" + doc[1] + "'","greater");
				formObj.set_fr_dt.value = "";
				formObj.set_fr_dt.focus();
				return;
			} else {
				if(validateForm(formObj, "save") == false)
				{
					return;
				}
				
				if(ComShowCodeConfirm("COM0063") == false){
					return;
				}
				
				var headerDatas=FormQueryString(formObj);
				
				// "EDB":Ending Balance
				if (formObj.cal_method_cd.value == "EDB") {
					var frtDatas = sheet1.GetSaveString(1);
					var saveXml=sheet1.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
					sheet1.LoadSaveData(saveXml);
					// "FIX":Fixed Rate
				} else if (formObj.cal_method_cd.value == "FIX") {
					var frtDatas = sheet3.GetSaveString(1);
					var saveXml=sheet3.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
					sheet3.LoadSaveData(saveXml);
					// "DTV":Daily Total Volume - //#2486 [LOA WMS4.0] EASY INVOICE CREATION FOR IN/OUTBOUND FILE
				} else if (formObj.cal_method_cd.value == "DTV") {
					var frtDatas = sheet4.GetSaveString(1);
					var saveXml=sheet4.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
					sheet4.LoadSaveData(saveXml);
					// "DAY":Daily In & Out
				} else {
					var frtDatas = sheet2.GetSaveString(1);
					var saveXml=sheet2.GetSaveData("./ClosingStoChgMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
					sheet2.LoadSaveData(saveXml);
				}
			}
		}
	}
}

// Daily In & Out / Ending Date 모두 체크
// 등록된 Settlement Preiod 체크(From Date이 후 날짜 등록 가능)
function checkMaxDailySettlementPeriod(obj) {
	var formObj=document.form;
	// Daily In & Out 인 경우만 체크
//	if (formObj.cal_method_cd.value != "DAY") {
//		return;
//	}

	var ctrt_no = formObj.ctrt_no.value;
	var wh_cd = formObj.wh_cd.value;
	var set_fr_dt = mkFormat1(formObj.set_fr_dt.value.trim());
	var set_to_dt = mkFormat1(formObj.set_to_dt.value.trim());
	var cls_no = formObj.in_cls_no.value;
	// 등록된 Settlement Preiod 체크(등록 Max Date이 후 날짜 등록 가능)
	if (loading_flag == "Y" && (formObj.set_fr_dt.value != '' && ComIsNull(cls_no))) {
		ajaxSendPost(onblurCheckSettlementDate, 'reqVal', '&goWhere=aj&bcKey=checkSettlementDate&ctrt_no='+ctrt_no + '&wh_cd='+wh_cd + '&set_fr_dt='+set_fr_dt + '&set_to_dt='+set_to_dt , './GateServlet.gsl');
	}
}

function onblurCheckSettlementDate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 이미 등록된 Settlement Period To Date(Daily In & Out Date)이전 일자가 존재 하는지 체크 
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				ComShowCodeMessage("COM12133","Settlement Period(From Date)","'" + doc[1] + "'","greater");
				formObj.set_fr_dt.value = "";
				formObj.set_fr_dt.focus();
			}
		}
	}
}

// 등록된 Settlement Preiod 체크(Ending이 후 날짜 등록 가능)
function checkMaxEndingSettlementPeriod(obj) {
//	var formObj=document.form;
//	// Ending Balance 인경우 만  체크
//	if (formObj.cal_method_cd.value != "EDB") {
//		return;
//	}
//	
//	var ctrt_no = formObj.ctrt_no.value;
//	var wh_cd = formObj.wh_cd.value;
//	var set_fr_dt = mkFormat1(formObj.set_fr_dt.value.trim());
//	var set_to_dt = mkFormat1(formObj.set_to_dt.value.trim());
//	var cls_no = formObj.in_cls_no.value;
//	// 등록된 Settlement Preiod 체크(Ending Date이 후 날짜 등록 가능)
//	if (formObj.set_to_dt.value != '' && ComIsNull(cls_no)) {
//		ajaxSendPost(onblurCheckEdingSettlementDate, 'reqVal', '&goWhere=aj&bcKey=checkSettlementDate&ctrt_no='+ctrt_no + '&wh_cd='+wh_cd + '&set_fr_dt='+set_fr_dt + '&set_to_dt='+set_to_dt , './GateServlet.gsl');
//	}
}

function onblurCheckEdingSettlementDate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 이미 등록된 Settlement Period To Date(Ending Date)이전 일자가 존재 하는지 체크 
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				ComShowCodeMessage("COM12133","Settlement Period(To Date)","'" + doc[1] + "'","greater");
				formObj.set_to_dt.value = "";
				formObj.set_to_dt.focus();
			}
		}
	}
}

// Filing No.중복 체크
function checkDupFilingNo(obj){
	if (ComIsNull(obj.value)) {
		return;
	}
	var formObj=document.form;
	ajaxSendPost(resultCheckDupFilingNo, 'reqVal', '&goWhere=aj&bcKey=checkDupFilingNo&f_ref_no='+obj.value + "&wh_cd=" + formObj.wh_cd.value + "&ctrt_no=" + formObj.ctrt_no.value + "&cls_no=" + formObj.in_cls_no.value, './GateServlet.gsl');
}

/**
 * AJAX RETURN
 * Check Dup Order No
 */
function resultCheckDupFilingNo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
//				ComShowCodeMessage("COM131302", "Filling No");
				
				if(!ComShowCodeConfirm("COM131303", "Filling No")){ 
					formObj.f_ref_no.value = "";
				} 
				formObj.cls_dt.focus();
				formObj.f_ref_no.focus();
			}
		}
	}
}

//#1389 [WMS4.0] Closing In & Out Entry buttons add to extension
function fn_ComBtnDisable(name) {
	var obj = ComGetObject(name);
	if (obj.type == "button") {
		obj.style.display = "none";
	}
}

//#1389 [WMS4.0] Closing In & Out Entry buttons add to extension
function fn_ComBtnEnable(name) {
	var obj = ComGetObject(name);
	if (obj.type == "button") {
		obj.style.display = "inline";
	}
}