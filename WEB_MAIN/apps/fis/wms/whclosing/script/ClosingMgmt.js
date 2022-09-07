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
var sts_cd_n = "N";
var loading_flag = "N";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;

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
	
	doShowProcess(true);
	setTimeout(function(){
		//sheet
		for(var i=0;i<docObjects.length;i++){
			var sheetObject = docObjects[i];
		    comConfigSheet(sheetObject);
		    initSheet(sheetObject,i+1);
		    comEndConfigSheet(sheetObject);
		}
	},100);    
	doHideProcess(false);
    loading_flag="Y";
    //control
	initControl();
	commonModeChange("INIT");
	//파라미터존재시 자동조회
	if($("#req_cls_no").val().trim().length > 0){
		$("#in_cls_no").val($("#req_cls_no").val().trim());
		btn_Search();
	}
	
	if($("#req_so_no").val().trim().length > 0){
		$("#in_so_no").val($("#req_so_no").val().trim());
		btn_Search();
	}
	
	if($("#cls_agr_no").val().trim().length > 0){
		btn_AGR_Search();
	}	
	check_authority_wh();
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
	case 1:      //IBSheet1 init
		with(sheetObj){
		      var hdr1="cls_key|Closing No|Closing\nDate|Settlement Period|Settlement Period|Office|Contract|Contract|merge_key||Billing Customer|Billing Customer|Status|Doc.Filing No.|S/B|Total|rn||Invoice No||Type|FWD\nTYPE|Freight|Freight|Amount|Amount|Amount|Amount|Amount|Amount|Amount|Warehouse|Warehouse|Remark|Remark|Remark"
		      + "|ibflag|rtp_no|src_tp_cd|cls_seq|cls_agr_no|sb_cls_cd|dtl_unit_cd|dtl_frt_nm|";
		      var hdr2="cls_key|Closing No|Closing\nDate|From|To|Office|Code|Name|merge_key||Code|Name|Status|Doc.Filing No.|S/B|Total|rn||Invoice No||Type|FWD\nTYPE|Code|Name|CUR|UNIT|PKGS|RATE|BASIC|ADJUST|TOTAL|Code|Name|Remark|Remark|Remark"
		      + "|ibflag|rtp_no|src_tp_cd|cls_seq|cls_agr_no|sb_cls_cd|dtl_unit_cd|dtl_frt_nm|";
		      var prefix=fix_grid01;

		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"},
		                  { Text:hdr2, Align:"Center"} ];
		      InitHeaders(headers, info);
		      //LKH::2015-11-03 WMS4.O  
		      //LKH 2016.07.21
		      var cols = [{Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"cls_key", 															 Format:""					},
		             {Type:"Text",      Hidden:0,  	Width:120, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"cls_no",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Date",      Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"cls_dt",  		KeyField:1,   UpdateEdit:0,    InsertEdit:1, 		 Format:"Ymd"		},
		             {Type:"Date",      Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"set_fr_dt",   	KeyField:1,   UpdateEdit:0,    InsertEdit:1, 		 Format:"Ymd"		},
		             {Type:"Date",      Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"set_to_dt",   	KeyField:1,   UpdateEdit:0,    InsertEdit:1,		 Format:"Ymd"		},
		             {Type:"Popup", 	Hidden:0, 	Width:55, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"ofc_cd",   	KeyField:1,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Popup", 	Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"ctrt_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Text",     	Hidden:0,  	Width:140, 	Align:"Left",		ColMerge:1,  	SaveName:prefix+"ctrt_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"merge_key",                                                 		 Format:""					},
		             {Type:"CheckBox",  Hidden:0, 	Width:41, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"chk1",   		KeyField:0,                                  		 Format:""					},
		             {Type:"PopupEdit", Hidden:0, 	Width:55, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"cust_cd",   	KeyField:1,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Text",     	Hidden:0, 	Width:140, 	Align:"Left",		ColMerge:1,  	SaveName:prefix+"cust_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Combo",     Hidden:0, 	Width:60, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"sts_cd",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",     	Hidden:0,  	Width:140, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"so_no",   		KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""					},
		             {Type:"Combo",     Hidden:0, 	Width:40, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"sb_cls_cd",   	KeyField:1,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Float",    	Hidden:0,  	Width:100, 	Align:"Right",		ColMerge:1,  	SaveName:prefix+"sub_tot",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",			PointCount:2	},
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"rn",   		KeyField:0,									 		 Format:""					},
		             {Type:"CheckBox",  Hidden:0, 	Width:41, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"chk2",   		KeyField:0,									 		 Format:""					},
		             {Type:"Text",     	Hidden:0,  	Width:110, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"inv_no",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",     	Hidden:1,  	Width:110, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"inv_seq",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Combo",     Hidden:0, 	Width:70, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"rate_tp_cd",   KeyField:1,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Combo",     Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"order_rel",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Combo", 	Hidden:0, 	Width:150, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"frt_cd",   	KeyField:1,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Text",     	Hidden:0,  	Width:140, 	Align:"Left",		ColMerge:1,  	SaveName:prefix+"frt_nm",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""					},
		             {Type:"Combo",     Hidden:0, 	Width:50,   Align:"Center",   	ColMerge:1,   	SaveName:prefix+"curr_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1,   EditLen:3 },
		             {Type:"Combo", 	Hidden:0,	Width:90, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"unit_cd",   	KeyField:1,   UpdateEdit:1,    InsertEdit:1,		 Format:""					},
		             {Type:"Float",     Hidden:0, 	Width:90, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"unit_qty",   	KeyField:1,   UpdateEdit:1,    InsertEdit:1,		 Format:"Integer",	PointCount:3	},
		             {Type:"Float",     Hidden:0, 	Width:90, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"unit_price",   KeyField:1,   UpdateEdit:1,    InsertEdit:1,		 Format:"Float",			PointCount:vPointCount, EditLen:vEditLen },
		             {Type:"Float",     Hidden:1, 	Width:90, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"basic_amt",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:"Float",			PointCount:2				},
		             {Type:"Float",     Hidden:1, 	Width:90, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"adjust_amt",   KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:"Float",			PointCount:2				},
		             {Type:"Float",     Hidden:0, 	Width:90, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"tot_amt",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",			PointCount:2				},
		             {Type:"Text", 		Hidden:0, 	Width:70, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"wh_cd",   		KeyField:1,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",    	Hidden:0,  	Width:160, 	Align:"Left",		ColMerge:1,  	SaveName:prefix+"wh_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Image",     Hidden:0, 	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"rmk_img",   	KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"rmk",   		KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"rmk2",   		KeyField:0,   UpdateEdit:1,    InsertEdit:1,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Center",  	ColMerge:1,		SaveName:prefix+"rtp_no",	KeyField:0,		Format:""},
		             {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Center",  	ColMerge:1,		SaveName:prefix+"src_tp_cd",	KeyField:0,		Format:""},
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",  					SaveName:prefix+"cls_seq",														 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",  					SaveName:prefix+"cls_agr_no",														 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",  					SaveName:prefix+"cls_frt_seq",														 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",  					SaveName:prefix+"dtl_unit_cd",														 Format:""				},
		             {Type:"Status",    Hidden:1,   Width:100,   Align:"Center",     ColMerge:1,     SaveName:prefix+"ibflag" },
		             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",  					SaveName:prefix+"dtl_frt_nm	",														 Format:""				},
		      		 {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Center",  					SaveName:prefix+"frt_seq",														 Format:""				},
		      		 {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Center",  					SaveName:prefix+"wm_doc_seq",														 Format:""				} ];
		       
		      InitColumns(cols);
		      SetSheetHeight(450);
		      resizeSheet();
		      SetEditable(1);
		      SetImageList(0,"./web/img/main/icon_text_off.gif");
		      SetImageList(1,"./web/img/main/icon_text_on.gif");
		      SetUnicodeByte(3);
		      SetClipPasteMode(1);
		      SetColProperty(prefix+"sb_cls_cd", {ComboText:"SELL|BUY", ComboCode:"S|B"} );
			  SetColProperty(prefix+"order_rel", {ComboText:order_relText, ComboCode:order_relCode} );
			  SetColProperty(prefix+"sts_cd", {ComboText:sts_cdText, ComboCode:sts_cdCode} );
			  SetColProperty(prefix+"rate_tp_cd", {ComboText:"|"+rate_tp_cdText, ComboCode:"ALL|"+rate_tp_cdCode} );
			  SetColProperty(prefix+'curr_cd', {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );
			  SetColProperty(prefix+'frt_cd', {ComboText:ARFRTCD2, ComboCode:ARFRTCD1} );
			  SetColProperty(prefix+'unit_cd', {ComboText:"|"+UNITCDText, ComboCode:"|"+UNITCDCode} );
				        
			  SetColProperty(0 ,prefix+"ofc_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			  SetColProperty(0 ,prefix+"ctrt_no" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			  SetColProperty(0 ,prefix+"cust_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			  SetColProperty(0 ,prefix+"frt_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			  SetColProperty(0 ,prefix+"unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			  SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		      }
		      break;
}}
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
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSearchEnd(){
	var sheetObj=sheet1;//docObjects[0];
	var sts_s_cnt=0;
	var sts_c_cnt=0;
	var sts_i_cnt=0;
	var arr_cls_no=new Array();
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//Vinh.Vo 08/20/2015 (S)
		//rmk
//		if(sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == sts_cd_n ) //new인경우
//		{
//			sheetObj.SetCellEditable(i, fix_grid01+"rmk_img",0);
//		}
//		else
//		{
//			sheetObj.SetCellEditable(i, fix_grid01+"rmk_img",1);
//		}
		
		sheetObj.SetCellEditable(i, fix_grid01+"rmk_img",1);
		
		//Vinh.Vo 08/20/2015 (E)
		
		var value=sheetObj.GetCellValue(i, fix_grid01 + "rmk").trim();
		
		if (value.length > 0) {
 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",1);
		} else {
 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",0);
		}	
		if(sheetObj.GetCellValue(i, fix_grid01+"sts_cd") == sts_cd_n && sheetObj.GetRowStatus(i) != "I")
		{
			sheetObj.SetRowStatus(i,'I');
			sheetObj.SetCellEditable(i, fix_grid01 + "rate_tp_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "sb_cls_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "wh_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "cust_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "ctrt_no",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "cls_dt",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "set_fr_dt",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "set_to_dt",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "ofc_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01 + "basic_amt",1);
// 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img","");
			
		}
		//link 폰트색상 변경
		if(sheetObj.GetCellValue(i, fix_grid01+"cls_no") != "")
		{
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cls_no","#0100FF");
 			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "cls_no", 1);
		}
		if(sheetObj.GetCellValue(i, fix_grid01+"inv_no") != "")
		{
			sheetObj.SetCellFontColor(i, fix_grid01 + "inv_no","#0100FF");
			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "inv_no", 1);
		}
		if(sheetObj.GetCellValue(i, fix_grid01+"cust_cd") != "" && sheetObj.GetCellEditable(i, fix_grid01+"cust_cd") == false)
		{
 			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_cd","#0100FF");
 			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "cust_cd", 1);
		}
		if(sheetObj.GetCellValue(i, fix_grid01+"sb_cls_cd") != "" && sheetObj.GetCellEditable(i, fix_grid01+"sb_cls_cd") == false)
		{
 			sheetObj.SetCellFontColor(i, fix_grid01 + "sb_cls_cd","#0100FF");
 			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "sb_cls_cd", 1);
		}
		if(sheetObj.GetCellValue(i, fix_grid01+"rate_tp_cd") != "" && sheetObj.GetCellEditable(i, fix_grid01+"rate_tp_cd") == false)
		{
 			sheetObj.SetCellFontColor(i, fix_grid01 + "rate_tp_cd","#0100FF");
 			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "rate_tp_cd", 1);
		}
		if(ComTrimAll(sheetObj.GetCellValue(i, fix_grid01+"so_no")) != "" && (sheetObj.GetCellValue(i, fix_grid01+"sts_cd") == "C" || sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "I"))
		{
			sheetObj.SetCellFontColor(i, fix_grid01 + "so_no","#0100FF");
			sheetObj.SetCellFontUnderline(i, fix_grid01 +  "so_no", 1);
		}
		//CONFIRM, INVOICED
		if(sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "C" || sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "I" )
		{
			sheetObj.SetCellEditable(i, fix_grid01+"chk2",0);
			sheetObj.SetCellEditable(i, fix_grid01+"adjust_amt",0);
			sheetObj.SetCellEditable(i, fix_grid01+"rmk_img",0);
			sheetObj.SetCellEditable(i, fix_grid01+"frt_nm",0);
			sheetObj.SetCellEditable(i, fix_grid01+"unit_cd",0);
			sheetObj.SetCellEditable(i, fix_grid01+"unit_qty",0);
			sheetObj.SetCellEditable(i, fix_grid01+"unit_price",0);
			sheetObj.SetCellEditable(i, fix_grid01+"so_no",0);
			// CONFIRM, INVOICED 일때 INVOICE NO 가 없을때 저장가능하도록 필드들을 열어준다.
			// 20150109 추가 Chungrue
			if(sheetObj.GetCellValue(i, fix_grid01 + "inv_no") == ""){
				sheetObj.SetCellEditable(i, fix_grid01+"chk2",1);
				/* LKH::CONFIRM 시 WMS운임이 OPUS TB_FRT로 인터페이스 되므로 수정 막음 
				sheetObj.SetCellEditable(i, fix_grid01+"frt_nm",1);
				sheetObj.SetCellEditable(i, fix_grid01+"unit_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01+"unit_qty",1);
				sheetObj.SetCellEditable(i, fix_grid01+"unit_price",1);
				sheetObj.SetCellEditable(i, fix_grid01+"adjust_amt",1);
				*/
			}
			
		}
		//INVOICED 일때 CHK1 막음
		if(sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "I" )
		{
			sheetObj.SetCellEditable(i, fix_grid01+"chk1",0);
		}
		//20150112 Chungrue 추가
		if(sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == sts_cd_n){
			sheetObj.SetCellEditable(i, fix_grid01 + "so_no",0);
			if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd") == ""){
				sheetObj.SetCellEditable(i, fix_grid01 + "frt_cd",1);
				sheetObj.SetCellEditable(i, fix_grid01 + "curr_cd",1);
			}else{
				sheetObj.SetCellEditable(i, fix_grid01 + "frt_cd",0);
				sheetObj.SetCellEditable(i, fix_grid01 + "curr_cd",0);
			}
		}
	
		if(sheetObj.GetCellValue(i,fix_grid01 + "sts_cd") != "C"){
			sts_s_cnt = sts_s_cnt + 1;
		}
		var unit_price = eval(sheetObj.GetCellValue(i, fix_grid01 + "unit_price"));
		var unit_qty   = eval(sheetObj.GetCellValue(i, fix_grid01 + "unit_qty"));
		sheetObj.SetCellValue(i, fix_grid01 + "tot_amt",ComAbsRound(unit_price * unit_qty, 3));
	}
	if(sts_s_cnt > 0){
		ComBtnEnable("btnSave");
	}else{
		ComBtnDisable("btnSave");
	}
	mergeCell(2);
	var s_wh_cd =  sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wh_cd")
	check_authority_wh(s_wh_cd);
	doHideProcess(false);  
}

function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	var formObj=document.form;
	switch(colName)
	{
		case fix_grid01 + "cls_no":
			if(sheetObj.GetCellValue(Row, fix_grid01+"cls_no") == "")
			{
				return;
			}
			goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
						  , ""
					      , ""
					      , "");
		break;		
		case fix_grid01 + "cust_cd":
			if(sheetObj.GetCellEditable(Row, fix_grid01+"cust_cd") == true)
			{
				return;
			}
			goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
					, sheetObj.GetCellValue(Row, fix_grid01 + "cust_cd")
					, sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd")
					      , "");	
			break;
		case fix_grid01 + "sb_cls_cd":
			if(sheetObj.GetCellEditable(Row, fix_grid01+"sb_cls_cd") == true)
			{
				return;
			}
			goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
					, sheetObj.GetCellValue(Row, fix_grid01 + "cust_cd")
					, sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd")
					      , "");
			break;
		case fix_grid01 + "rate_tp_cd":
			if(sheetObj.GetCellEditable(Row, fix_grid01+"rate_tp_cd") == true)
			{
				return;
			}
			goClosingDetail(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
					, sheetObj.GetCellValue(Row, fix_grid01 + "cust_cd")
					, sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd")
					, sheetObj.GetCellValue(Row, fix_grid01 + "rate_tp_cd"));
			break;
		case fix_grid01 + "so_no":
			if(sheetObj.GetCellEditable(Row, fix_grid01+"so_no") == true)
			{
				return;
			}
			var value=ComTrim(sheetObj.GetCellValue(Row, fix_grid01 + "so_no"));
			if (value.length > 0)
			{
				var param="?doc_ref_no=" + value;
				goFreightMgmt(param);
			}
			break;
		case fix_grid01 + "rmk_img":
//			if(sheetObj.GetCellValue(Row, fix_grid01+"sts_cd") == sts_cd_n)
//			{
//				return;
//			}
			ComShowMemoPad4(sheetObj, Row, fix_grid01 + "rmk", false, 200, 100, sheetObj.SaveNameCol(fix_grid01 + "wh_nm"), sheetObj.SaveNameCol(fix_grid01 + "rmk"));
			break;
		case fix_grid01 + "inv_no":
			if((sheet1.GetCellValue(Row,fix_grid01 + "sb_cls_cd") == 'S') && (sheet1.GetCellValue(Row,fix_grid01 + "inv_no") != '')){
				var paramStr="./ACC_INV_0010.clt?f_cmd=-1&sys_cd="+"&f_inv_seq="+sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, fix_grid01 + "inv_no");
		        parent.mkNewFrame('A/R Entry', paramStr, "ACC_INV_0010_SHEET_" +sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq")+"_"+sheetObj.GetCellValue(Row, fix_grid01 + "inv_no"));
			}else if((sheet1.GetCellValue(Row,fix_grid01 + "sb_cls_cd") == 'B') && (sheet1.GetCellValue(Row,fix_grid01 + "inv_no") != '')){
				var paramStr="./ACC_INV_0030.clt?f_cmd=-1&sys_cd="+"&f_inv_seq="+sheetObj.GetCellValue(Row,fix_grid01 +  "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, fix_grid01 + "inv_no");
		        parent.mkNewFrame('A/P Entry(Cost)', paramStr,"ACC_INV_0030_SHEET_"+sheetObj.GetCellValue(Row, fix_grid01 + "inv_seq")+"_"+sheetObj.GetCellValue(Row, fix_grid01 + "inv_no"));
			}
			break;
	}
}

var cur_row;
var cur_col;
var cur_sheetObj;
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	cur_row = Row;
	cur_col = Col;
	cur_sheetObj = sheetObj;
	with(sheetObj)
	{
		if(colName == fix_grid01 + "frt_cd")
		{
			rtnary=new Array(3);
			rtnary[0]=sheetObj.GetCellValue(Row, Col);
			rtnary[1]="";
			rtnary[2]=window;
		      
		    callBackFunc = "setIbFrtCdGrid";
		    modal_center_open('./FreightPopup.clt', rtnary, 800, 550 ,"yes");
		}
		else if(colName == fix_grid01 + "ctrt_no")
		{
			var ord_tp_lvl1_cd="\'P\'";
	    	
	    	rtnary=new Array(3);
			rtnary[0]=sheetObj.GetCellValue(Row, Col);
			rtnary[1]="";
			rtnary[2]=ord_tp_lvl1_cd;
			rtnary[3]=window;
			
			var params = "?ctrt_no="+sheetObj.GetCellValue(Row, Col)+"&ctrt_nm="+sheetObj.GetCellValue(Row, Col+1); 
		      
		    callBackFunc = "setContactInfoGrid";
		    modal_center_open('./ContractRoutePopup.clt' + params, rtnary, 900, 580,"yes");
		}
		else if(colName == fix_grid01 + "cust_cd")
		{
			
			rtnary=new Array(1);
			rtnary[0]="2";
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "setCustCdGrid";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		}		
		else if(colName == fix_grid01 + "ofc_cd")
		{
		    rtnary=new Array(2);
	   		rtnary[0]="1";
	        callBackFunc = "setOfficeInfoGrid";
			modal_center_open('./CMM_POP_0150.clt', rtnary, 556,600,"yes");
		}
		else if(colName == fix_grid01 + "unit_cd")
		{
			rtnary=new Array(3);
			rtnary[0]="Z3";
			rtnary[1]=sheetObj.GetCellValue(Row, Col);
			rtnary[2]="";
			rtnary[3]=window;		      
		    callBackFunc = "setUnitGrid";
		    modal_center_open('./CommonCodePopup.clt', rtnary, 400,520,"yes");
		}
	}
}

function setValCust_cd(rtnMsg){
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])=='undefined'){
            sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_cd",'',0);
            sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_nm",'',0);
            alert(CODE_NOT_FND);
        }else{
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "cust_nm",masterVals[3],0);
        }
    }else{
        alert(AJ_FND_ERR);
    }
}

function setValFrt_nm(rtnMsg){
	var doc=getAjaxMsgXML(rtnMsg);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=='undefined'){
			sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "frt_cd",'',0);
			sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "frt_nm",'',0);
			alert(CODE_NOT_FND);
		}else{
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			sheet1.SetCellValue(sheet1.GetSelectRow(), fix_grid01 + "frt_nm",masterVals[3],0);
		}
	}else{
		alert(AJ_FND_ERR);
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value){
	var colName=sheetObj.ColSaveName(Col);
	var sUrl="";
	if ( colName == fix_grid01 + "cust_cd" ) 
	{
		if(Value != '')
		{	
			ajaxSendPost(CB_ajaxTradePaner, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode"+"&s_code="+Value, "./GateServlet.gsl");
		}
		else	
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "cust_nm","",0);
		}
		
	}else if ( colName == fix_grid01 + "frt_cd" ){
		
		var codeStr=sheetObj.GetCellValue(Row, fix_grid01+'frt_cd');
		if(codeStr.length>1){
			sheetObj.SetCellValue(Row, fix_grid01+'frt_nm','',0);
		    //param setting
		    var param ='&wms_flg=Y';
			ajaxSendPost(setValFrt_nm, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=freight&s_code='+codeStr + param, './GateServlet.gsl');
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1156");
			sheetObj.SelectCell(Row, fix_grid01+'frt_cd');
		}
	}else if ( colName == fix_grid01 + "ctrt_no" ){
		/*if(Value != "")
		{
			var ord_tp_lvl1_cd="\'P\'";
			var sXml=docObjects[0].GetSearchData("searchTlCtrtInfo.clt?ctrt_no=" + Value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&mgmt_flg=Y&org_cd="+$("#org_cd").val());
						sheetObj.SetCellValue(Row, Col,getXmlDataNullToNullString(sXml,'ctrt_no'),0);
						sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_nm",getXmlDataNullToNullString(sXml,'ctrt_nm'),0);
						sheetObj.SetCellValue(Row, fix_grid01 + "rtp_no",getXmlDataNullToNullString(sXml,'rtp_no'),0);
						if(getXmlDataNullToNullString(sXml,'exception_msg')!="")
						{
							alert(getXmlDataNullToNullString(sXml,'exception_msg'));
							sheetObj.SelectCell(Row, Col);
						}
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "ctrt_nm","",0);
			sheetObj.SetCellValue(Row, fix_grid01 + "rtp_no","",0);
		}*/
	} 
	else if(colName == fix_grid01 + "unit_qty")
	{
		var unit_price=eval(sheetObj.GetCellValue(Row, fix_grid01 + "unit_price"));
		var unit_qty=eval(sheetObj.GetCellValue(Row, fix_grid01 + "unit_qty"));
		/* TinLuong Modify with new business : 20151031
		 * if(unit_qty <= 0)
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "unit_price",0,0);
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "unit_price",ComAbsRound((basic_amt + adjust_amt)/unit_qty, 3),0);
		}*/
		if(unit_qty <= 0)
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "unit_qty",0,0);
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "tot_amt",ComAbsRound(unit_price * unit_qty,3));
		}
		
		var totalAmt = 0;
		
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			totalAmt = totalAmt + Number(sheetObj.GetCellValue(i, fix_grid01 + "tot_amt"));
		}
		
		for(var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow();j++){
			sheetObj.SetCellValue(j, fix_grid01 + "sub_tot",totalAmt);
		}
		
	}
	else if(colName == fix_grid01 + "unit_price"){
		var unit_price = eval(sheetObj.GetCellValue(Row, fix_grid01 + "unit_price"));
		var unit_qty   = eval(sheetObj.GetCellValue(Row, fix_grid01 + "unit_qty"));
		if(unit_price <= 0)
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "unit_price",0,0);
		}
		else
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "tot_amt",ComAbsRound(unit_price * unit_qty, 3));
		}
		
		var totalAmt = 0;
		
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			totalAmt = totalAmt + Number(sheetObj.GetCellValue(i, fix_grid01 + "tot_amt"));
		}
		
		for(var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow();j++){
			sheetObj.SetCellValue(j, fix_grid01 + "sub_tot",totalAmt);
		}
	}
	/*
	 * TinLuong Modification: not use column  basic_amt & adjust_amt
	 * 
//	 else if(colName == fix_grid01 + "basic_amt" || colName == fix_grid01 + "adjust_amt" )
//	{
//		var basic_amt=eval(sheetObj.GetCellValue(Row, fix_grid01 + "basic_amt"));
//		var adjust_amt=eval(sheetObj.GetCellValue(Row, fix_grid01 + "adjust_amt"));
//		var unit_qty=eval(sheetObj.GetCellValue(Row, fix_grid01 + "unit_qty"));
//		sheetObj.SetCellValue(Row, fix_grid01 + "tot_amt",basic_amt + adjust_amt,0);
//		if(unit_qty <= 0)
//		{
//			sheetObj.SetCellValue(Row, fix_grid01 + "unit_price",0,0);
//		}
//		else
//		{
//			sheetObj.SetCellValue(Row, fix_grid01 + "unit_price",ComAbsRound((basic_amt + adjust_amt)/unit_qty, 3),0);
//		}
//		//신규행일경우 해당ROW만 TOTAL을 구한다.
//		if(sheetObj.GetRowStatus(Row) == "I" && ComTrimAll(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")) == "" )
//		{
//			sheetObj.SetCellValue(Row, fix_grid01 + "sub_tot",basic_amt + adjust_amt,0);
//		}
//		else
//		{
//			var inx_arr=new Array();
//			var key=sheetObj.GetCellValue(Row, fix_grid01 + "cls_no") + "|"
//			+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no") + "|"
//			+ sheetObj.GetCellValue(Row, fix_grid01 + "cls_seq") + "|"
//			/*+ sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") + "|"
//			+ sheetObj.GetCellValue(Row, fix_grid01 + "so_no") + "|"*/
//			+ sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd");
//			//계산
//			for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
//				if(sheetObj.GetRowStatus(i) != "I" || (sheetObj.GetRowStatus(Row) == "I" && ComTrimAll(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")) != ""))
//				{
//					var key2=sheetObj.GetCellValue(i, fix_grid01 + "cls_no") + "|"
//					+ sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no") + "|"
//					+ sheetObj.GetCellValue(i, fix_grid01 + "cls_seq") + "|"
//					/*+ sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") + "|"
//					+ sheetObj.GetCellValue(i, fix_grid01 + "so_no") + "|"*/
//					+ sheetObj.GetCellValue(i, fix_grid01 + "sb_cls_cd");
//					if(key == key2 && i != Row)
//					{					
//						inx_arr.push(i);
//						basic_amt 	+= eval(sheetObj.GetCellValue(i, fix_grid01 + "basic_amt"));
//						adjust_amt 	+= eval(sheetObj.GetCellValue(i, fix_grid01 + "adjust_amt"));
//					}
//				}
//			}
//			//계산값 바인딩
//			sheetObj.SetCellValue(Row, fix_grid01 + "sub_tot",basic_amt + adjust_amt);
//			for (var idx=0; idx<inx_arr.length; idx++)
//			{ 
//				sheetObj.SetCellValue(inx_arr[idx], fix_grid01 + "sub_tot",basic_amt + adjust_amt);
//			}
//		}
//	}*/
	else if(colName == fix_grid01 + "rmk")
	{
		//Vinh.Vo 08/20/2015: if sts_cd == "I" then don't allow to edit remark
		if(sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") == "I")
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "rmk",sheetObj.GetCellValue(Row, fix_grid01 + "rmk2"),0);
			return;
		}
		//Vinh.Vo 08/20/2015: All orther cases are allow to edit
		var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
		+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no")
		+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "cls_seq")
		+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "sb_cls_cd");
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
			var key=sheetObj.GetCellValue(i, fix_grid01 + "cls_no")
			+ "|" + sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no")
			+ "|" + sheetObj.GetCellValue(i, fix_grid01 + "cls_seq")
			+ "|" + sheetObj.GetCellValue(i, fix_grid01 + "sb_cls_cd");
			if(key_org == key && sheetObj.GetCellValue(i, fix_grid01 + "cls_no") != "")
			{
				sheetObj.SetCellValue(i, fix_grid01 + "rmk",Value,0);
				sheetObj.SetCellValue(i, fix_grid01 + "rmk2",Value,0);
				if (Value.length > 0) {
 					sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",1);
				} else {
					sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",0);
				}
			}
		}
	} 
	else if(colName == fix_grid01 + "chk1")
	{
		if(sheetObj.GetRowStatus(Row) == "I" && ComTrimAll(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")) == "" )
		{
			sheetObj.SetCellValue(Row, fix_grid01 + "chk2",Value,0);
		}
		else
		{
			//셀merge되는 기준별로 모두 체크 또는 체크해지
			var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")
			+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no")
			+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "cls_seq");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				var key=sheetObj.GetCellValue(i, fix_grid01 + "cls_no")
				+ "|" + sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no")
				+ "|" + sheetObj.GetCellValue(i, fix_grid01 + "cls_seq");
				if(key_org == key && sheetObj.GetCellValue(i, fix_grid01 + "cls_no") != "")
				{
					sheetObj.SetCellValue(i, fix_grid01 + "chk1",Value,0);
					if(sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") == "S" || sheetObj.GetCellValue(Row, fix_grid01 + "sts_cd") == "A"
						|| (sheetObj.GetRowStatus(Row) == "I" && ComTrimAll(sheetObj.GetCellValue(Row, fix_grid01 + "cls_no")) != "")
					)
					{
						sheetObj.SetCellValue(i, fix_grid01 + "chk2",Value,1,0);
					}
				}
			}
		}
		
		//========== control Header-Check when check all or uncheck all ============
		
		var checkedCount = 0;
		
		
		for(var i = sheet1.HeaderRows(); i <= sheet1.LastRow(); i++){
			if(sheet1.GetCellValue(i,Col) == 1){
				checkedCount ++;
			}
		}
		
		if(checkedCount == sheet1.RowCount()){
			sheet1.CheckAll(Col,1);
		}
		
		// chk2
		var arrChecked = [];
		
		for(var i = sheet1.HeaderRows(); i <= sheet1.LastRow(); i++){
			if(sheet1.GetCellValue(i,fix_grid01 + "chk2") == 1){
				arrChecked.splice(arrChecked.length, 0, i);
			}
		}
		
		if(arrChecked.length == sheet1.RowCount()){
			sheet1.CheckAll(fix_grid01 + "chk2",1);
		}else{
			sheet1.CheckAll(fix_grid01 + "chk2",0);
			
			for(var i = 0; i < arrChecked.length; i++){
				sheet1.SetCellValue(arrChecked[i],fix_grid01 + "chk2",1,0);
			}
		}
		
	}else if(colName == fix_grid01 + "chk2")
	{
		/*if(sheetObj.GetCellValue(Row,fix_grid01+"so_no") != ""){
			for(var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++){
				if(Row != i && sheetObj.GetCellValue(i,fix_grid01+"so_no") == sheetObj.GetCellValue(Row,fix_grid01+"so_no")
						&& sheetObj.GetCellValue(i,fix_grid01+"sb_cls_cd") == sheetObj.GetCellValue(Row,fix_grid01+"sb_cls_cd"))
				{
					sheetObj.SetCellValue(i,Col,Value,0);
				}
			}
		}*/
		
		if(sheet1.GetCellValue(Row,fix_grid01 + "chk2") == 1){
			for(var i = sheet1.HeaderRows(); i <= sheet1.LastRow(); i++){
				if(Row != i && sheetObj.GetCellValue(i,fix_grid01+"cust_cd") == sheetObj.GetCellValue(Row,fix_grid01+"cust_cd")
							&& sheetObj.GetCellValue(i,fix_grid01+"sb_cls_cd") == sheetObj.GetCellValue(Row,fix_grid01+"sb_cls_cd")
							&& sheetObj.GetCellValue(i,fix_grid01+"curr_cd") == sheetObj.GetCellValue(Row,fix_grid01+"curr_cd")
							&& sheetObj.GetCellValue(i,fix_grid01+"sts_cd") != "I" )
				{
					sheet1.SetCellValue(i,fix_grid01 + "chk2",1,0);
				}
			}
		}
		
		//========== control Header-Check when check all or uncheck all ============
		var checkedCount = 0;
		
		
		for(var i = sheet1.HeaderRows(); i <= sheet1.LastRow(); i++){
			if(sheet1.GetCellValue(i,Col) == 1){
				checkedCount ++;
			}
		}
		
		if(checkedCount == sheet1.RowCount()){
			sheet1.CheckAll(Col,1);
		}
	}
//	else if(colName == fix_grid01 + "unit_cd")
//	{
//		if(Value != "")
//		{
//			var sXml=docObjects[0].GetSearchData("searchCommonCodeInfo.clt?grp_cd=Z3&code_cd="+Value);
//			sheetObj.SetCellValue(Row,  Col,getXmlDataNullToNullString(sXml,'code_cd'),0);
//			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
//				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
//				sheetObj.SelectCell(Row,  Col);
//			}
//		}
//	}
	else if(colName == fix_grid01 + "so_no") 
	{
		if(Value != "")
		{
			var sParam="ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no")
				+ "&rtp_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "rtp_no")
			           + "&so_no=" + Value;
			var sXml=docObjects[0].GetSearchData("searchWHSoNoExists.clt?"+sParam);
			var so_no=getXmlDataNullToNullString(sXml,'so_no');
			if(so_no == "") {so_no=" ";}
			var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "merge_key");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				var key=sheetObj.GetCellValue(i, fix_grid01 + "merge_key");
				if(key_org == key)
				{
					sheetObj.SetCellValue(i, Col,so_no,0);
				}
			}
			if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
				alert(getXmlDataNullToNullString(sXml,'exception_msg'));
				sheetObj.SelectCell(Row,  Col);
				return;
			}
		}
		else
		{
			var key_org=sheetObj.GetCellValue(Row, fix_grid01 + "merge_key");
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
				var key=sheetObj.GetCellValue(i, fix_grid01 + "merge_key");
				if(key_org == key)
				{
					sheetObj.SetCellValue(i, Col," ",0);
				}
			}			
		}
	}
}


function setCustCdGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(cur_row , fix_grid01 + "cust_cd",rtnValAry[0],0);
		sheetObj.SetCellValue(cur_row , fix_grid01 + "cust_nm",rtnValAry[2],0);
	}
}

function setIbFrtCdGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(cur_row, fix_grid01 + "frt_cd",rtnValAry[1],0);
		sheetObj.SetCellValue(cur_row, fix_grid01 + "frt_nm",rtnValAry[2],0);
	}
}

function setContactInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(cur_row, fix_grid01 + "ctrt_no",rtnValAry[0],0);
		sheetObj.SetCellValue(cur_row, fix_grid01 + "ctrt_nm",rtnValAry[1],0);
		sheetObj.SetCellValue(cur_row, fix_grid01 + "rtp_no",rtnValAry[9],0);
	}
}

function setCustInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(cur_row, fix_grid01+"cust_cd",rtnValAry[1],0);
		sheetObj.SetCellValue(cur_row, fix_grid01+"cust_nm",rtnValAry[3],0);
	}
}


function setOfficeInfoGrid(rtnVal) {
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0],0);
	}
}

function setUnitGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var sheetObj=sheet1;
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[2],0);
	}
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
		    	
				var param = "?ctrt_no=" + formObj.ctrt_no.value + "&ctrt_nm=" + formObj.ctrt_nm.value + "&ord_tp_lvl1_cd=" + ord_tp_lvl1_cd;
				
		    	rtnary=new Array(3);
//				rtnary[0]="";
//				rtnary[1]=;
//				rtnary[2]=ord_tp_lvl1_cd;
//				rtnary[2]=window;
			      
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

var InputName="cls_no";
function btn_Search() {
	var formObj=document.form;
	var sheetObj=sheet1;
	if(loading_flag != "Y"){
		return;
	}
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	doShowProcess(true);
	setTimeout(function(){
		$("#h_cls_no").val("");
		commonModeChange("SEARCH_BEF");
		
		formObj.f_cmd.value = SEARCH;
		var param="";
		if(formObj.in_cls_no.value != ""){
			param=FormQueryString(formObj, "")+ "&search_tp=IN_CLS_NO";
		}
		if(formObj.in_so_no.value != ""){
			param=FormQueryString(formObj, "")+ "&search_tp=IN_SO_NO";
		}
		if(formObj.in_cls_no.value != "" && formObj.in_so_no.value != ""){
			param=FormQueryString(formObj, "")+ "&search_tp=IN_CLS_SO_NO";
		}
	 	var sXml=sheetObj.GetSearchData("searchClosingMgmt.clt", param, "", true);
	 	
		var arrXml=sXml.split("|$$|");
		var arr0 = arrXml[0].replace(/(?:\r\n|\r|\n|\t| )/g, '');
		var xmlDoc = $.parseXML(arrXml[0]);
		var $xml = $(xmlDoc);
		if($xml.find("cls_no").text() == "NoData"){
			doHideProcess(false);
			ComShowCodeMessage("COM0266", "Closing No");
			$("#cls_no").val("");
			formObj.in_cls_no.focus();
		}else if($xml.find("so_no").text() == "NoData"){
			doHideProcess(false);
			ComShowCodeMessage("COM0266", "Doc.Filing No.");
			$("#so_no").val("");
			formObj.in_so_no.focus();
		}else {
			for(var i=0; i<arrXml.length; i++){
				if(i == 0){
					//ibSheetView Xml 을 HTML태그(Object) 오브젝트의 value 세팅
					var xmlDoc = $.parseXML(arrXml[i]);
					var $xml = $(xmlDoc);
					$("#cls_no").val($xml.find("cls_no").text());
					commonModeChange("SEARCH");
				} else {
					sheetObj.LoadSearchData(arrXml[i],{Sync:1} );
				}
			}
		}
	},100);
}

function btn_Auto_Search()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	
	/*
	if (searchClosingStrUnit() == false){
		return;
	}
	*/
	
	$("#in_cls_no").val("");
	formObj.f_cmd.value = SEARCH01;
	var param=FormQueryString(formObj, "")+ "&search_tp=H_CLS_NO";
	var sXml=sheetObj.GetSearchData("searchClosingMgmtDtl.clt", param, "", true);
	//var xml = convertColOrder(sXml,fix_grid01);
	sheetObj.LoadSearchData(sXml,{Sync:1});
	
	if(sheetObj.RowCount()> 0)
	{
		commonModeChange("SEARCH");
	}
	else
	{
		ComShowCodeMessage("COM0266", "Closing No");
		commonModeChange("SEARCH_BEF");
	}
}
function btn_AGR_Search()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	$("#in_cls_no").val("");
	formObj.f_cmd.value = SEARCH01;
	var param=FormQueryString(formObj, "")+ "&search_tp=CLS_AGR_NO";
 	var sXml=sheetObj.GetSearchData("searchClosingMgmtDtl.clt", param, "", true);
	sheetObj.LoadSearchData(xml,{Sync:1});
	
	if(sheetObj.RowCount()> 0)
	{
		commonModeChange("SEARCH");
	}
	else
	{
		ComShowCodeMessage("COM0266", "Closing No");
		commonModeChange("SEARCH_BEF");
	}
}

var checkClosingPopup = "1";

function searchClosingStrUnit(){
	var formObj=document.form;
	var sheetObj=sheet1;
	var rtnValue = false;
	//if(!formObj.use_rate.checked){
		formObj.f_cmd.value = SEARCH05;
		var sParam=FormQueryString(formObj, "");
		
		var sXml=sheetObj.GetSearchData( "searchClosingStrUnit.clt?"+sParam);
		
		if(sXml.indexOf('<ERROR>') < 0){
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			var ctrt_str_cls_unit_cd="";
			ctrt_str_cls_unit_cd=$xml.find("ctrt_str_cls_unit_cd").text();
			ctrt_str_cls_unit_cd = ctrt_str_cls_unit_cd.trim();
			if(ctrt_str_cls_unit_cd == ''){
				ComShowCodeMessage("COM12248"); //"Please check Contract(Storage Closing Unit) Setup!"		
				rtnValue = false;
			}else{
				formObj.ctrt_unit.value = ctrt_str_cls_unit_cd;
				rtnValue = true;
			}
		}else{
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			
			alert($xml.find("MESSAGE").text());
			rtnValue = false;
		}
	//}
	return rtnValue;
}
function btn_Create() {	
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'create') == false) 
	{
		return;
	}
	/*
	if (searchClosingStrUnit() == false){
		return;
	}
	*/
	
	if(!formObj.use_rate.checked){
		formObj.f_cmd.value = SEARCH05;
		var sParam=FormQueryString(formObj, "");
		
		var sXml=sheetObj.GetSearchData( "searchClosingStrUnit.clt?"+sParam);
		
		if(sXml.indexOf('<ERROR>') < 0){
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			var ctrt_str_cls_unit_cd="";
			ctrt_str_cls_unit_cd=$xml.find("ctrt_str_cls_unit_cd").text();
			ctrt_str_cls_unit_cd = ctrt_str_cls_unit_cd.trim();
			if(ctrt_str_cls_unit_cd == ''){
				ComShowCodeMessage("COM12248"); //"Please check Contract(Storage Closing Unit) Setup!"		
				return;
			}else{
				formObj.ctrt_unit.value = ctrt_str_cls_unit_cd;
			}
		}else{
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			
			alert($xml.find("MESSAGE").text());
		}
	} 
	
	//20150212 foreground/background 
	var sts_cd="";
	formObj.f_cmd.value = SEARCH02;
	var sParam=FormQueryString(formObj, "");
	
	var sXml=sheetObj.GetSearchData( "searchClosingStatus.clt?"+sParam);
	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	sts_cd=parseInt($xml.find("sts_cd").text());
	if(sts_cd > 0){
		ComShowCodeMessage("COM0404");
	}else{
		//Vinh.Vo (S) 20151007: don't show popup after click Create button, just do Create by Foreground
		
//		document.all.create_popup.style.display="block";
//		document.all.create_popup.style.visibility='visible';
//		
//		if(checkClosingPopup == "1"){
//			formObj.create_popup_type[0].checked=true;
//		}else{
//			formObj.create_popup_type[1].checked=true;
//		}
		
		btn_Create_Popup_OK();
		
		//Vinh.Vo (E)
	}
}

function btn_Create_Popup_OK() {	
	var formObj=document.form;
	var sheetObj=sheet1;
	var sts_cd="";
	var fb_cls_cd="";
	//Vinh.Vo (S) 20151007: don't show popup after click Create button
//	if( formObj.create_popup_type[0].checked == true ){
//		fb_cls_cd="F";
//		checkClosingPopup = "1";
//	}else{
//		fb_cls_cd="B";
//		checkClosingPopup = "2"; 
//	}
	
	//Vinh.Vo (E)
	
	formObj.f_cmd.value = SEARCH04;
	
	if(formObj.use_rate.checked){
		formObj.s_use_rate.value = "Y";
	}else{
		formObj.s_use_rate.value = "N";
	}
	
	var sParam=FormQueryString(formObj, "")+"&fb_cls_cd="+fb_cls_cd;
	var sXml=sheetObj.GetSearchData("createClosingStatusGS.clt?"+sParam);
//	if(getXmlDataNullToNullString(sXml,'exception_msg')==""){
	if(sXml.indexOf('<ERROR>') < 0){
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		
		sts_cd=parseInt($xml.find("sts_cd").text());
		if(sts_cd > 0){
			ComShowCodeMessage("COM0404");
		}else{
			//Vinh.Vo (S) 20151007: don't show popup after click Create button
			
//			if( formObj.create_popup_type[0].checked == true ){
				btn_Create_foreground();
//			}else{
//				//alert("ClosingBackground.clt "+sParam);
//				formObj.f_cmd.value = SEARCH04;
//				sheetObj.GetSearchData("ClosingBackground.clt", FormQueryString(formObj,""), "", true);
//			}
				//Vinh.Vo (E)
		}
	}else{
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		
		alert($xml.find("MESSAGE").text());
	}
	
	//Vinh.Vo (S) 20151007: don't show popup after click Create button
	//btn_Create_Popup_Close();
	//Vinh.Vo (E)
}

function btn_Create_Popup_Close(){
	document.all.create_popup.style.display="none";
	document.all.create_popup.style.visibility='hidden';
}

function btn_Create_foreground() {	
	var formObj=document.form;
	var sheetObj=sheet1;
	//TL_WH_CLS_AGR 검색
	formObj.f_cmd.value = SEARCH03;
 	var sXml=sheetObj.GetSearchData("searchClosingMgmtCreateList.clt", FormQueryString(formObj,""), "", true);
	if( sXml.indexOf('<ERROR>') > -1){
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		
		alert($xml.find("MESSAGE").text());
		return;
	}
//	var xml = convertColOrder(sXml,fix_grid01);
	sheetObj.LoadSearchData(sXml,{Sync:1});
	commonModeChange("CREATE");
}


/*
 * Save
 */
function btn_Save() {
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'save') == false) 
	{
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0063"))
	{ 
		return;
	}
	var mode= "mode="		+$("#mode").val();
	var docinParamter=mode;
	formObj.f_cmd.value = MODIFY;
	var sheetDatas = sheetObj.GetSaveString(); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	var saveXml=sheetObj.GetSaveData("saveClosingMgmt.clt", docinParamter+"&"+ sheetDatas +"&f_cmd=" + MODIFY);
	
//	sheetObj.LoadSaveData(saveXml);
	//1. Save 후 조회
	//SaveEnd
	if( saveXml.indexOf('<ERROR>') == -1){
		
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		
//		ComShowCodeMessage("COM0093", "");
		//Change message 'Successfully' to showCompleteProcess();
		showCompleteProcess();		
		
		var sel_cls_no= $xml.find("sel_cls_no").text();
		if(sel_cls_no == "")
		{
			return;
		}
		
		var sel_cls_no_split=sel_cls_no.split(",");
		
		if(sel_cls_no_split.length <= 1)
		{
			$("#in_cls_no").val(sel_cls_no_split[0]);
			btn_Search();
		}
		else
		{
			$("#h_cls_no").val(sel_cls_no);
			btn_Auto_Search();
		}
	}
}


/*
 * 트랜잭션 delete
 */
function btn_Delete() {
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'delete') == false) 
	{
		return;
	}
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	
	//20150116 Vinh.Vo(S) don't alow to delete confirmed item
	var arrRow = sRow.split("|");
	
	for(var i = 0 ; i < arrRow.length; i++){
		if(sheet1.GetCellValue(arrRow[i],"Grd01sts_cd") == 'C'){
			ComShowCodeMessage("COM132619");
			
			return;
		}
	}
	//20150116 Vinh.Vo(E)
	
	//confirm
	if(!ComShowCodeConfirm("COM0053")){
		return;
	}
	//신규건 화면에서 일단삭제
	var sRowI=sheetObj.FindStatusRow("I");
	var arrRowI=sRowI.split(";");
	//삭제처리
	for (var i=arrRowI.length-2; i>=0; i--){
		if(sheetObj.GetCellValue(arrRowI[i], fix_grid01 + "cls_no").trim() == "")
		{
			sheetObj.RowDelete(arrRowI[i], false);
		}
	}
	formObj.f_cmd.value = REMOVE;
	var sheetDatas1=ComGetSaveString(sheetObj, true, true); //sheetObjs, bUrlEncode, allSave, col
	//10/16/2015 Vinh.Vo (S) if invalid data then return
	if(sheetDatas1 == "") return;
	//10/16/2015 Vinh.Vo (E)
	
	var isheetSaveParamters=sheetDatas1+"&f_cmd=" + REMOVE;
 	saveXml=sheetObj.GetSaveData("deleteClosingMgmtPartial.clt", isheetSaveParamters);
 	sheetObj.LoadSaveData(saveXml);
	if( saveXml.indexOf('<ERROR>') == -1){
//		ComShowCodeMessage("COM0080", "");
		// Change COM0080 to showCompleteProcess();	
		showCompleteProcess();	
		
		$("#in_cls_no").val($("#cls_no").val());
//		var sel_cls_no=ComGetEtcData(saveXml, "sel_cls_no");
		var sel_cls_no=$($.parseXML(saveXml)).find("sel_cls_no").text();
		if(sel_cls_no == "")
		{
			//$("#in_cls_no").val($("#cls_no").val());
			//btn_Search();
			commonModeChange("INIT");
			return;
		}
		//alert(sel_cls_no);
		var sel_cls_no_split=sel_cls_no.split(",");
		if(sel_cls_no_split.length <= 1)
		{
			$("#in_cls_no").val(sel_cls_no_split[0]);
			btn_Search();
		}
		else
		{
			$("#h_cls_no").val(sel_cls_no);
			btn_Auto_Search();
		}
	}
}



function btn_Confirm() {
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'confirm') == false) 
	{
		return;
	}
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk1");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0247"))
	{ 
		return;
	}
	formObj.f_cmd.value = COMMAND01;
	var sheetDatas=ComGetSaveString(sheetObj, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
 	var saveXml=sheetObj.GetSaveData("confirmClosingMgmt.clt", sheetDatas +"&f_cmd=" + COMMAND01);
// 	sheetObj.LoadSaveData(saveXml);
	//1. Confirm 후 조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		
		var su_yn= $xml.find("su_yn").text();
		var su_value=$xml.find("su_value").text();
		if(su_yn =="N")
		{
			ComShowCodeMessage(su_value);
			return;
		}
//		ComShowCodeMessage("COM0307", "");
		// Change to showCompleteProccess();
		showCompleteProcess();	
		
		var sel_cls_no=$xml.find("sel_cls_no").text();
		if(sel_cls_no == "")
		{
			return;
		}
		var sel_cls_no_split=sel_cls_no.split(",");
		if(sel_cls_no_split.length <= 1)
		{
			$("#in_cls_no").val(sel_cls_no_split[0]);
			btn_Search();
		}
		else
		{
			$("#h_cls_no").val(sel_cls_no);
			btn_Auto_Search();
		}
	}
}
function btn_CFCancel() {
	var formObj=document.form;
	//validation check
	if (validateForm(formObj, 'cfcancel') == false) 
	{
		return;
	}
	var sheetObj=sheet1;
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk1");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	//confirm     
	if(!ComShowCodeConfirm("COM0386"))
	{ 
		return;
	}
	formObj.f_cmd.value = COMMAND02;
	var sheetDatas=ComGetSaveString(sheetObj, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
 	var saveXml=sheetObj.GetSaveData("cfcancelClosingMgmt.clt", sheetDatas+"&f_cmd=" + COMMAND02);
 	sheetObj.LoadSaveData(saveXml);
	//1. Confirm 후 조회
	//SaveEnd
	if( saveXml.indexOf('<MESSAGE>') == -1){
		var xmlDoc = $.parseXML(saveXml);
		var $xml = $(xmlDoc);
		
		var su_yn= $xml.find("su_yn").text();
		var su_value=$xml.find("su_value").text();
		if(su_yn =="N")
		{
			ComShowCodeMessage(su_value);
			return;
		}
//		ComShowCodeMessage("COM0387", "");
		// Change to showCompleteProcess();	
		showCompleteProcess();	
		var sel_cls_no=$xml.find("sel_cls_no").text();
		if(sel_cls_no == "")
		{
			return;
		}
		var sel_cls_no_split=sel_cls_no.split(",");
		if(sel_cls_no_split.length <= 1)
		{
			$("#in_cls_no").val(sel_cls_no_split[0]);
			btn_Search();
		}
		else
		{
			$("#h_cls_no").val(sel_cls_no);
			btn_Auto_Search();
		}
	}
}


function btn_Excel() {
	if(sheet1.RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	sheet1.Down2Excel({DownCols: '1|2|3|4|5|6|7|9|10|11|12|13|14|15|17|18|20|21|22|23|24|25|26|27|30|31|32|34', SheetDesign:1,Merge:1, AutoAlign: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:'N', AutoSizeColumn: 1, ExtendParam: "ColumnColor: "+ fix_grid01 + "cls_no|" + fix_grid01 + "cust_cd|" + fix_grid01 + "sb_cls_cd|"+fix_grid01+"rate_tp_cd"});
    }
}

function btn_New()
{
	var currLocUrl=this.location.href;
	var hasPlNo = currLocUrl.indexOf("cls_no");
	if(hasPlNo > 0){
		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	
		//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
		window.location.href = currLocUrl;
	}else{
		// All the data you input in this page will be wiped off. Continue? 	
		if($("#cls_no").val().length > 0 || $("#h_cls_no").val().length > 0 || sheet1.RowCount()> 0)
		{
			if (ComShowCodeConfirm("COM0309")) {
				commonModeChange("INIT");
			}
		}
		else
		{
			commonModeChange("INIT");
		}
	}
}
function btn_AR_Create() {
	var sRow=sheet1.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	
	var arrRow = sRow.split('|');
	
	for(var i = 0; i < arrRow.length; i++){
		if(sheet1.GetCellValue(arrRow[i],fix_grid01+"so_no") == ""){
			ComShowCodeMessage('COM132615');
			return;
		}
	}
	
	var arrObj = [];
	
	for (var i=1; i< sheet1.LastRow() + 1; i++){	
		if(sheet1.GetCellValue(i, fix_grid01 + "chk2") == "1" 
			&& sheet1.GetCellValue(i,fix_grid01 + "so_no") != ""
				&& sheet1.GetCellValue(i,fix_grid01 + "sb_cls_cd") == "S"
					&& sheet1.GetCellValue(i,fix_grid01 + "inv_no") == ""
		)
		{
			//LKH::2015-11-03 WMS4.O
			/*
			var index = isExistItemList(arrObj, sheet1.GetCellValue(i,fix_grid01 + "so_no"));
			
			if(index != -1){
//				arrObj.splice(arrObj.length, 0, sheet1.GetCellValue(i,fix_grid01 + "so_no") + "|" +sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				arrObj[index].lstFrtSeq.splice(arrObj[index].lstFrtSeq.length,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				
			}else{
				
				var newObj = {};
				
				newObj.name = sheet1.GetCellValue(i,fix_grid01 + "so_no");
				newObj.lstFrtSeq = [];
				newObj.lstFrtSeq.splice(0,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				
				arrObj.splice(arrObj.length, 0, newObj);
			}
			*/
			var index = isExistItemList(arrObj, sheet1.GetCellValue(i,fix_grid01 + "wm_doc_seq"));

			if(index != -1){
				arrObj[index].lstFrtSeq.splice(arrObj[index].lstFrtSeq.length,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				
			}else{
				
				var newObj = {};
				
				newObj.name = sheet1.GetCellValue(i,fix_grid01 + "wm_doc_seq");
				
				newObj.fr_trdp_cd = sheet1.GetCellValue(i,fix_grid01 + "cust_cd");
				newObj.fr_trdp_nm = sheet1.GetCellValue(i,fix_grid01 + "cust_nm");
				newObj.fr_inv_curr_cd = sheet1.GetCellValue(i,fix_grid01 + "curr_cd");
				
				newObj.lstFrtSeq = [];
				newObj.lstFrtSeq.splice(0,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				arrObj.splice(arrObj.length, 0, newObj);
			}
		}
	}
	
	//validation
	if (arrObj == ""){
		alert("For SELL Only!!!");
		return;
	}
	for(var i = 0 ; i < arrObj.length; i++){
		//LKH::2015-11-03 WMS4.O
		/*
		var sUrl="./ACC_INV_0010.clt?sys_cd=WMS&wms_no=" + arrObj[i].name;
		
		for(var j = 0; j < arrObj[i].lstFrtSeq.length; j++){
			sUrl = sUrl + "&frt_seq=" + arrObj[i].lstFrtSeq[j]; 
		}
		*/
		
		var chkCnt=0;
		
		var chk_fr_trdp_cd="";
		var chk_fr_trdp_nm="";
		var chk_fr_inv_curr_cd="";
		var chk_fr_frt_seq="";
		
		var chk_fr_trdp_cd=arrObj[i].fr_trdp_cd;
		var chk_fr_trdp_nm=arrObj[i].fr_trdp_nm;
		var chk_fr_inv_curr_cd=arrObj[i].fr_inv_curr_cd;
		
		var sUrl="./ACC_INV_0010.clt?sys_cd=WMS&f_wms_seq=" + arrObj[i].name;
		sUrl=sUrl + "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
		sUrl=sUrl + "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
		sUrl=sUrl + "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
		
		for(var j = 0; j < arrObj[i].lstFrtSeq.length; j++){
			//sUrl = sUrl + "&chk_fr_frt_seq=" + arrObj[i].lstFrtSeq[j];
			if(chkCnt > 0){
				chk_fr_frt_seq += ", ";
			}
			chk_fr_frt_seq		+= 	arrObj[i].lstFrtSeq[j];
			chkCnt++;
		}
		sUrl = sUrl + "&chk_fr_frt_seq=" + chk_fr_frt_seq + "&wh_cd_wms=" +  sheet1.GetCellValue(sheet1.GetSelectRow(), fix_grid01 + "wh_cd");
		
		parent.mkNewFrame('A/R Entry', sUrl, "ACC_INV_0010_WMS_" + arrObj[i]);
	}
}

function isExistItemList(listObj, item){
	for(var i = 0 ; i < listObj.length; i++){
		if(listObj[i].name == item){
			return i;
		}
	}
	
	return -1;
}

function btn_AP_Create() {
	var sRow=sheet1.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM0253");
		return;
	}
	
	var arrRow = sRow.split('|');
	
	for(var i = 0; i < arrRow.length; i++){
		if(sheet1.GetCellValue(arrRow[i],fix_grid01+"so_no") == ""){
			ComShowCodeMessage('COM132615');
			return;
		}
	}
	
	var arrObj = [];
	
	for (var i=1; i< sheet1.LastRow() + 1; i++){	
		if(sheet1.GetCellValue(i, fix_grid01 + "chk2") == "1" 
			&& sheet1.GetCellValue(i,fix_grid01 + "so_no") != ""
				&& sheet1.GetCellValue(i,fix_grid01 + "sb_cls_cd") == "B"
					&& sheet1.GetCellValue(i,fix_grid01 + "inv_no") == ""
		)
		{
			//LKH::2015-11-03 WMS4.O
			/*
			var index = isExistItemList(arrObj, sheet1.GetCellValue(i,fix_grid01 + "so_no"));
			
			if(index != -1){
//				arrObj.splice(arrObj.length, 0, sheet1.GetCellValue(i,fix_grid01 + "so_no") + "|" +sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				arrObj[index].lstFrtSeq.splice(arrObj[index].lstFrtSeq.length,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				
			}else{
				
				var newObj = {};
				
				newObj.name = sheet1.GetCellValue(i,fix_grid01 + "so_no");
				newObj.lstFrtSeq = [];
				newObj.lstFrtSeq.splice(0,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				
				arrObj.splice(arrObj.length, 0, newObj);
			}
			*/
			var index = isExistItemList(arrObj, sheet1.GetCellValue(i,fix_grid01 + "wm_doc_seq"));

			if(index != -1){
				arrObj[index].lstFrtSeq.splice(arrObj[index].lstFrtSeq.length,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				
			}else{
				
				var newObj = {};
				
				newObj.name = sheet1.GetCellValue(i,fix_grid01 + "wm_doc_seq");
				
				newObj.fr_trdp_cd = sheet1.GetCellValue(i,fix_grid01 + "cust_cd");
				newObj.fr_trdp_nm = sheet1.GetCellValue(i,fix_grid01 + "cust_nm");
				newObj.fr_inv_curr_cd = sheet1.GetCellValue(i,fix_grid01 + "curr_cd");
				
				newObj.lstFrtSeq = [];
				newObj.lstFrtSeq.splice(0,0,sheet1.GetCellValue(i,fix_grid01 + "frt_seq"));
				arrObj.splice(arrObj.length, 0, newObj);
			}
		}
	}
	
	if (arrObj == ""){
		alert("For BUY Only!!!");
		return;
	}
		
	for(var i = 0 ; i < arrObj.length; i++){
		//LKH::2015-11-03 WMS4.O
		/*
		var sUrl="./ACC_INV_0030.clt?sys_cd=WMS&wms_no=" + arrObj[i].name;
		
		for(var j = 0; j < arrObj[i].lstFrtSeq.length; j++){
			sUrl = sUrl + "&frt_seq=" + arrObj[i].lstFrtSeq[j]; 
		}
		*/
		
		var chkCnt=0;
		
		var chk_fr_trdp_cd="";
		var chk_fr_trdp_nm="";
		var chk_fr_inv_curr_cd="";
		var chk_fr_frt_seq="";
		
		var chk_fr_trdp_cd=arrObj[i].fr_trdp_cd;
		var chk_fr_trdp_nm=arrObj[i].fr_trdp_nm;
		var chk_fr_inv_curr_cd=arrObj[i].fr_inv_curr_cd;
		
		var sUrl="./ACC_INV_0030.clt?sys_cd=WMS&f_wms_seq=" + arrObj[i].name;
		sUrl=sUrl + "&chk_fr_trdp_cd=" + chk_fr_trdp_cd;
		sUrl=sUrl + "&chk_fr_trdp_nm=" + chk_fr_trdp_nm;
		sUrl=sUrl + "&chk_fr_inv_curr_cd=" + chk_fr_inv_curr_cd;
		
		for(var j = 0; j < arrObj[i].lstFrtSeq.length; j++){
			//sUrl = sUrl + "&chk_fr_frt_seq=" + arrObj[i].lstFrtSeq[j];
			if(chkCnt > 0){
				chk_fr_frt_seq += ", ";
			}
			chk_fr_frt_seq		+= 	arrObj[i].lstFrtSeq[j];
			chkCnt++;
		}
		sUrl = sUrl + "&chk_fr_frt_seq=" + chk_fr_frt_seq;
		
		parent.mkNewFrame('A/P Entry', sUrl, "ACC_INV_0030_WMS_" + arrObj[i]);
	}
}
function btn_Closing_Search() {
	var sUrl="./ClosingSearch.clt";
	parent.mkNewFrame('Closing Search', sUrl, "ClosingSearch_");
}
function btn_Closing_Background_Search() {
	var sUrl="./ClosingBackgroundSearch.clt";
	parent.mkNewFrame('Closing Background Search', sUrl, "ClosingBackgroundSearch_");
}
function btn_Freight_Mgmt() {
	var param="";
	goFreightMgmt(param);
}
function goFreightMgmt(param)
{
	var sUrl="./WHM_WHM_0010.clt" + param;
	parent.mkNewFrame('W/H Doc Entry', sUrl, "WHM_WHM_0010_" + param);
}
function goClosingDetail(cls_no, cust_cd, sb_cls_cd, rate_tp_cd)
{
	var param="?cls_no=" + cls_no
	          + "&cust_cd=" + cust_cd
	          + "&sb_cls_cd=" + sb_cls_cd
	          + "&rate_tp_cd=" + rate_tp_cd;
	var sUrl="./ClosingDetail.clt" + param;
	parent.mkNewFrame('Closing Detail', sUrl, "ClosingDetail_" + cls_no + "_" + cust_cd + "_" + sb_cls_cd + "_" + rate_tp_cd);
}

/*
 * 신규 row add
 */
var rowbil = "";
function btn_Add() {
	var formObj=document.form;
	var sheetObj=sheet1;
	//validation check
	if (validateForm(formObj, 'add') == false) 
	{
		return;
	}
	var row=sheetObj.DataInsert(-1); //
	rowbil = row;
	sheetObj.SetCellValue(row, fix_grid01 + "order_rel","P",0);// P : Domestic Only
	sheetObj.SetCellValue(row, fix_grid01 + "sts_cd",sts_cd_n,0);// N : NEW
	sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd","ALL",0);
	sheetObj.SetCellValue(row, fix_grid01 + "src_tp_cd","M",0);// M : Manual   A : Aggregate
	sheetObj.SetCellEditable(row, fix_grid01+"so_no",0);
	sheetObj.SetCellImage(row, fix_grid01 + "rmk_img",1);
	//최초행은 create 조건에 입력된 내용을 copy
	if(row == sheetObj.HeaderRows())
	{
		sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",$("#wh_cd").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",$("#wh_cd :selected").text(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "cls_dt",$("#cls_dt").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "set_fr_dt",$("#set_fr_dt").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "set_to_dt",$("#set_to_dt").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd",$("#org_cd").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",$("#ctrt_no").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_nm",$("#ctrt_nm").val(),0);
		sheetObj.SetCellValue(row, fix_grid01 + "rtp_no",$("#rtp_no").val(),0);
	}
	//최초행이 아닐경우
	else if(row > sheetObj.HeaderRows())
	{
		//Invoiced 또는 Confirm상태가 아닐경우에는 바로 위 행의 내용을 copy
		if(sheetObj.GetCellValue(row-1, fix_grid01 + "sts_cd") != "I" && sheetObj.GetCellValue(row-1, fix_grid01 + "sts_cd") != "C")
		{
			sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "wh_cd"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",sheetObj.GetCellValue(row-1, fix_grid01 + "wh_nm"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "cls_dt",sheetObj.GetCellValue(row-1, fix_grid01 + "cls_dt"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "set_fr_dt",sheetObj.GetCellValue(row-1, fix_grid01 + "set_fr_dt"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "set_to_dt",sheetObj.GetCellValue(row-1, fix_grid01 + "set_to_dt"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "ofc_cd"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",sheetObj.GetCellValue(row-1, fix_grid01 + "ctrt_no"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "ctrt_nm",sheetObj.GetCellValue(row-1, fix_grid01 + "ctrt_nm"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "rtp_no",sheetObj.GetCellValue(row-1, fix_grid01 + "rtp_no"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "sb_cls_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "sb_cls_cd"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "rate_tp_cd"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "cust_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "cust_cd"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "cust_nm",sheetObj.GetCellValue(row-1, fix_grid01 + "cust_nm"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "curr_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "curr_cd"),0);
		}
		//Invoiced상태일경우 create 조건에 입력된 내용을 copy
		else 
		{
			//wh_cd, wh_nm, cls_dt, set_fr_dt, set_to_dt, ofc_cd, ctrt_no, ctrt_nm 기본값 셋팅
			sheetObj.SetCellValue(row, fix_grid01 + "wh_cd",$("#wh_cd").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "wh_nm",$("#wh_cd :selected").text(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "cls_dt",$("#cls_dt").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "set_fr_dt",$("#set_fr_dt").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "set_to_dt",$("#set_to_dt").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd",$("#org_cd").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no",$("#ctrt_no").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "ctrt_nm",$("#ctrt_nm").val(),0);
			sheetObj.SetCellValue(row, fix_grid01 + "rtp_no",$("#rtp_no").val(),0);
			//TinLuong Modification 20151022
			//sheetObj.SetCellValue(row, fix_grid01 + "cust_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "cust_cd"),0);
			//sheetObj.SetCellValue(row, fix_grid01 + "cust_nm",sheetObj.GetCellValue(row-1, fix_grid01 + "cust_nm"),0);
			sheetObj.SetCellValue(row, fix_grid01 + "curr_cd",sheetObj.GetCellValue(row-1, fix_grid01 + "curr_cd"),0);
		}
	}
	sheetObj.SetCellEditable(row,fix_grid01 + "ctrt_no",0);
	sheetObj.SetCellEditable(row,fix_grid01 + "ctrt_nm",0);
	//sheetObj.SetCellEditable(row,fix_grid01 + "cust_cd",0);
	//sheetObj.SetCellEditable(row,fix_grid01 + "cust_nm",0);
	
	/*if(sheetObj.GetCellValue(row,fix_grid01 + "ctrt_no") != "" && sheetObj.GetCellValue(row,fix_grid01 + "cust_cd") == ""){
		 ajaxSendPost(getBillingCust, 'reqVal', '&goWhere=aj&bcKey=getBillingCust&ctrt_no='+sheetObj.GetCellValue(row,fix_grid01 + "ctrt_no"), './GateServlet.gsl');
	}*/
	
	if(sheetObj.GetCellValue(row,fix_grid01 + "curr_cd") == ""){
		sheetObj.SetCellValue(row, fix_grid01 + "curr_cd",formObj.def_ofc_curr_cd.value,0);
	}
	/*Hidden Basic Amount Column*/
	if(sheetObj.GetCellValue(row,fix_grid01 + "basic_amt") == 0){
		sheetObj.SetCellValue(row, fix_grid01 + "basic_amt",1,0);
	}
	
}

/*
 * Get Return Billing Custumer
 */
function getBillingCust(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != '' && doc[1] !='undefined'){
		var options = doc[1].split("@@^");
		sheet1.SetCellValue(rowbil,fix_grid01 + "cust_cd",options[0]);
	}
}

/*
 * 신규로 추가된 row만 삭제처리(화면상)
 */
function btn_Del() {
	var sheetObj=sheet1;
	if(sheet1.RowCount() == 0){
		ComShowCodeMessage("COM0046");
		return;
	}
	
	var sRow=sheetObj.FindCheckedRow(fix_grid01 + "chk2");
	if (sRow == "") {
		ComShowCodeMessage("COM12189");
		return;
	}
	var arrRow=sRow.split("|"); //결과 : "1|3|5|"
	//삭제처리
	for (var i=arrRow.length-1; i>=0; i--){		
		//if(sheetObj.RowStatus(arrRow[i]) == "I") //신규등록된건만 삭제
		if(sheetObj.GetCellValue(arrRow[i], fix_grid01 + "sts_cd") == sts_cd_n) //신규등록된건만 삭제
		{
			sheetObj.RowDelete(arrRow[i], false);
		}
	}
}


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
	var dt=ComGetDateAdd($("#cls_dt").val(), flag, val, "-");
	$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
	$("#set_to_dt").val($("#cls_dt").val());	
	
//	$("#set_fr_dt").val(ComGetDateAdd(null, "d", -1, "-"));
//	$("#set_to_dt").val($("#cls_dt").val());	
	
}

function setSetPeriod(obj)
{
	btn_Change_Date("month");
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case 'save':
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "save");
					return false;
				}*/
				var sheetObj=sheet1;
				//sheet의 row가 0건일경우
				if(sheetObj.RowCount()==0)
				{
					ComShowCodeMessage("COM0323");
					return false;
				}
				for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
					//--Closing Date 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "cls_dt").trim() == "")
					{
						ComShowCodeMessage("COM0114","Closing Date");
						sheetObj.SelectCell(i, fix_grid01 +  "cls_dt");
						return false;
					}
					//--Settlement Period 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "set_fr_dt").trim() == "")
					{
						ComShowCodeMessage("COM0114","Settlement Period(From)");
						sheetObj.SelectCell(i, fix_grid01 +  "set_fr_dt");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid01 + "set_to_dt").trim() == "")
					{
						ComShowCodeMessage("COM0114","Settlement Period(To)");
						sheetObj.SelectCell(i, fix_grid01 +  "set_to_dt");
						return false;
					}
					//--Office
					if(sheetObj.GetCellValue(i, fix_grid01 + "ofc_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Office");
						sheetObj.SelectCell(i, fix_grid01 +  "ofc_cd");
						return false;
					}
					//--contract 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no").trim() == "")
					{
						ComShowCodeMessage("COM0114","Contract");
						sheetObj.SelectCell(i, fix_grid01 +  "ctrt_no");
						return false;
					}
					//--Billing Customer 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "cust_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Billing Customer");
						sheetObj.SelectCell(i, fix_grid01 +  "cust_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid01 + "sb_cls_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","S/B");
						sheetObj.SelectCell(i, fix_grid01 +  "sb_cls_cd");
						return false;
					}
					//--Type 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "ALL")
					{
						ComShowCodeMessage("COM0005","Type");
						sheetObj.SelectCell(i, fix_grid01 +  "rate_tp_cd");
						return false;
					}
					//--FWD TYPE 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "order_rel").trim() == "")
					{
						ComShowCodeMessage("COM0005","FWD Type");
						sheetObj.SelectCell(i, fix_grid01 +  "order_rel");
						return false;
					}
					//--Freight
					if(sheetObj.GetCellValue(i, fix_grid01 + "frt_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Freight Code");
						sheetObj.SelectCell(i, fix_grid01 +  "frt_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid01 + "frt_nm").trim() == "")
					{
						ComShowCodeMessage("COM0114","Freight Name");
						sheetObj.SelectCell(i, fix_grid01 +  "frt_nm");
						return false;
					}
					//--Currency
					if(sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Currency");
						sheetObj.SelectCell(i, fix_grid01 +  "curr_cd");
						return false;
					}
					//--UNIT_CD
					if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Unit");
						sheetObj.SelectCell(i, fix_grid01 +  "unit_cd");
						return false;
					}
					//--unit qty
					var unit_qty=eval(sheetObj.GetCellValue(i, fix_grid01 + "unit_qty"));
					if(unit_qty == 0)
					{
						ComShowCodeMessage("COM0114","PKGS");
						sheetObj.SelectCell(i, fix_grid01 +  "unit_qty");
						return false;
					}
					//--unit price
					var unit_price=eval(sheetObj.GetCellValue(i, fix_grid01 + "unit_price"));
					if(unit_price == 0)
					{
						ComShowCodeMessage("COM0114","RATE");
						sheetObj.SelectCell(i, fix_grid01 +  "unit_price");
						return false;
					}
					//--total Amount
					var basic_amt=eval(sheetObj.GetCellValue(i, fix_grid01 + "tot_amt"));
					if(basic_amt == 0)
					{
						ComShowCodeMessage("COM0114","BASIC");
						sheetObj.SelectCell(i, fix_grid01 +  "basic_amt");
						return false;
					}
					//--WH_CD 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "wh_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Warehouse");
						sheetObj.SelectCell(i, fix_grid01 +  "wh_cd");
						return false;
					}
					//--신규로 add한건이 이미 confirm이후의 상태이면 add못하게끔 체크
					if(sheetObj.GetRowStatus(i) == "I")
					{
						var key=sheetObj.GetCellValue(i, fix_grid01 + "cls_dt") + "|"
						+ sheetObj.GetCellValue(i, fix_grid01 + "set_fr_dt") + "|"
						+ sheetObj.GetCellValue(i, fix_grid01 + "set_to_dt") + "|"
						+ sheetObj.GetCellValue(i, fix_grid01 + "ofc_cd") + "|"
						+ sheetObj.GetCellValue(i, fix_grid01 + "wh_cd") + "|"
						+ sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no") + "|"
						+ sheetObj.GetCellValue(i, fix_grid01 + "cust_cd");
						for(var m=sheetObj.HeaderRows(); m<=sheetObj.LastRow();m++){
						if(sheetObj.GetRowStatus(m) != "I")
						{
							var key2=sheetObj.GetCellValue(m, fix_grid01 + "cls_dt") + "|"
							+ sheetObj.GetCellValue(m, fix_grid01 + "set_fr_dt") + "|"
							+ sheetObj.GetCellValue(m, fix_grid01 + "set_to_dt") + "|"
							+ sheetObj.GetCellValue(m, fix_grid01 + "ofc_cd") + "|"
							+ sheetObj.GetCellValue(m, fix_grid01 + "wh_cd") + "|"
							+ sheetObj.GetCellValue(m, fix_grid01 + "ctrt_no") + "|"
							+ sheetObj.GetCellValue(m, fix_grid01 + "cust_cd");
							}
						}
					}
				}
				break;
			case 'create':
				/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "create");
					return false;
				}*/
				//Closing Date 필수로 입력되어야함.
				if(ComIsEmpty(formObj.cls_dt))
				{
					ComShowCodeMessage("COM0114","Closing Date");
					$("#cls_dt").focus();
					return false;
				}
				//날짜 체크
				if(ComIsEmpty(formObj.set_fr_dt))
				{
					ComShowCodeMessage("COM0114", "Settlement Period");
					$("#set_fr_dt").focus();
					return false;
				}
				if(ComIsEmpty(formObj.set_to_dt))
				{
					ComShowCodeMessage("COM0114", "Settlement Period");
					$("#set_to_dt").focus();
					return false;
				}
				if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
					ComShowCodeMessage("COM0122","Settlement Period");
					formObj.set_fr_dt.focus();
					return false;
				}
				//Contract No 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				break;
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
				if(ComIsEmpty(formObj.in_cls_no) && ComIsEmpty(formObj.in_so_no))
				{
					if(ComIsEmpty(formObj.in_cls_no)){
						ComShowCodeMessage("COM0114","Closing No");
						$("#in_cls_no").focus();
						return false;
					}
					if(ComIsEmpty(formObj.in_so_no)){
						ComShowCodeMessage("COM0114","Doc.Filing No.");
						$("#in_so_no").focus();
						return false;
					}
				}
				break;
			/*case "delete":
				if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "delete");
					return false;
				}
				break;
			case "confirm":
				if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "confirm");
					return false;
				}
				break;
			case "cfcancel":
				if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
					ComShowCodeMessage("COM0395", "confirm cancel");
					return false;
				}
				break;*/
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
      
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt', rtnary, 900, 580,"yes");
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
	
	/*var formObj=document.form;
	if(getXmlDataNullToNullString(resultXml,'ctrt_nm') != ""){
		if(RTP_NO_ONLY == "")
		{
			formObj.ctrt_nm.value=getXmlDataNullToNullString(resultXml,'ctrt_nm');
		}
		formObj.rtp_no.value=getXmlDataNullToNullString(resultXml,'rtp_no');
	}else{
		if(RTP_NO_ONLY == "")
		{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";
		}
		formObj.rtp_no.value="";
	}*/
}



/*
 * 각모드별 화면을 셋팅
 */
function commonModeChange(mode)
{
	var formObj=document.form;
	switch(mode)
	{
		case "INIT":
			formObj.reset();
			$("#mode").val(mode);
			$("#in_cls_no").val("");
			$("#cls_no").val("");
			sheet1.RemoveAll();
			commonButtonChange(mode);
			//날짜 셋팅
			$("#cls_dt").val(ComGetNowInfo());
			btn_Change_Date("month");
			//S/B 콤보
//			$("#sb_cls_cd")[0].SetSelectCode("S",false);
//			sb_cls_cd.SetSelectCode("S");
			$("#sb_cls_cd option[value='S']").prop('selected', true);
			//TYPE콤보
//			$("#rate_tp_cd")[0].SetSelectCode("ALL",false);
//			rate_tp_cd.SetSelectCode("ALL");
			$("#rate_tp_cd option[value='ALL']").prop('selected', true);
			//DEF_VALUE 셋팅
			$("#wh_cd").val($("#def_wh_cd").val());
			$("#ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
			//ctrt_no에 해당하는 rtp_no 기본값 셋팅
			if (!isNull(formObj.ctrt_no)) {
				getCtrtInfo(formObj.ctrt_no, "RTP_NO_ONLY");
			}
			break;
		case "CREATE":
			$("#mode").val(mode);
			$("#in_cls_no").val("");
			commonButtonChange(mode);
			break;
		case "SEARCH_BEF":
			$("#mode").val(mode);
			sheet1.RemoveAll();
			commonButtonChange(mode); //버튼			
			break;
		case "SEARCH":
			$("#mode").val(mode);
			commonButtonChange(mode); //버튼			
			break;
	}
}


/*
 * 버튼 change
 */
function commonButtonChange(mode)
{
	switch(mode)
	{
		case "INIT" :
			ComBtnEnable("btn_create");
			ComBtnEnable("btnSave");
			
			ComBtnDisable("btnDelete");
			ComBtnDisable("btn_confirm");
			ComBtnDisable("btn_cfcancel");			
			
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			//headerInfoChange(true);
			break;
		case "CREATE" :
			ComBtnDisable("btn_create");
			
			ComBtnEnable("btnSave");
			ComBtnEnable("btnDelete");
			
			ComBtnDisable("btn_confirm");
			ComBtnDisable("btn_cfcancel");
			
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			//headerInfoChange(true);
			break;
		case "SEARCH_BEF" :
			ComBtnEnable("btn_create");
			ComBtnDisable("btnSave");
			
			ComBtnDisable("btnDelete");
			ComBtnDisable("btn_confirm");
			ComBtnDisable("btn_cfcancel");		
			
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
			//headerInfoChange(false);
			break;
		case "SEARCH" :
			ComBtnDisable("btn_create");
			ComBtnEnable("btnSave");
			ComBtnEnable("btnDelete");
			ComBtnEnable("btn_confirm");
			ComBtnEnable("btn_cfcancel");			
			//ComBtnEnable("btn_excel");
			ComBtnEnable("btn_add");
			ComBtnEnable("btn_del");
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
		ComBtnDisable("btnDelete");
		ComBtnDisable("btn_confirm");
		ComBtnDisable("btn_cfcancel");
		ComBtnDisable("btn_excel");
		ComBtnDisable("bt_ar_create");
		ComBtnDisable("bt_ap_create");
	}else{
		ComBtnEnable("btnSave");
		ComBtnEnable("btn_excel");
		ComBtnEnable("bt_ar_create");
		ComBtnEnable("bt_ap_create");
		
		//ComBtnEnable("btnDelete");
		//ComBtnEnable("btn_confirm");
		//ComBtnEnable("btn_cfcancel");
		ComBtnEnable("btn_excel");
	}
}