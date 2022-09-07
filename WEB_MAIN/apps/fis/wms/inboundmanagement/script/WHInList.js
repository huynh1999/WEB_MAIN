/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInList.js
*@FileTitle  : Inbound Search
*@author     : Tien.Duong - DOU Network
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
var popupCtr = "";
//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 14;
var firCalFlag=false;
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

//<!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
document.onclick = processButtonClick;
function processButtonClick() {
	try {
		var srcName = ComGetEvent("id");
		//if(ComGetBtnDisable(srcName)) return false;
		switch (srcName) {
		case "stAll":
			$("#bk_sts_cd").val("ALL");
			doWork('SEARCHLIST');
			break;
		case "stBooked":
			$("#bk_sts_cd").val("I");
			doWork('SEARCHLIST');
			break;
		case "stComplete":
			$("#bk_sts_cd").val("X");
			doWork('SEARCHLIST');
			break;
		case "stCancel":
			$("#bk_sts_cd").val("C");
			doWork('SEARCHLIST');
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			ComShowCodeMessage("DOM00023");
		} else {
			alert(e);
		}
	}
}

function loadPage() {
	var formObj = document.form;
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject,i+1);
	    comEndConfigSheet(sheetObject);
	}
	loading_flag="Y";
	
	//#1699 [WMS4.0] OPUS and Mobile Inbound/Outbound Default 조회 기준일
	$("#fm_bk_date").val(ComGetDateAdd(null, "M", -1, "-"));
	$("#to_bk_date").val(ComGetDateAdd(null, "M", +1, "-"));		
	$("#wh_cd").val($("#def_wh_cd").val());
	$("#wh_nm").val($("#def_wh_nm").val());
	$("#ctrt_no").val($("#def_wh_ctrt_no").val());
	$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
	
	formObj.search_tp_dt.value = 'EST_IN_DT';
	var def_std_unit = formObj.def_std_unit.value;
	if(def_std_unit == ""){
		formObj.measure_tp.value = 'ALL';
	}else{
		formObj.measure_tp.value = def_std_unit;
	}
	//사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    
    setTimeout(function(){ sheet1_btn_hide(); }, 1000);
    
	// #4798 [Korex] WMS View Type Default Option    
    changeViewType()
    
    //<!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
    if($("#wh_cd").val() != null && $("#wh_cd").val() !=''){
    	doWork('SEARCHLIST');
    }
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
		with(sheetObj){
//		      var hdr1="Order No|Order Type|Estimated\nDate|Status|Inbound\nDate|Contract|SKU|SKU|Item Lot|Order|Order|Order|Order|Received|Received|Received|Received|Received|Received|Received|Received|O/S\nEA Qty|Volume|Volume|GWT|GWT|NWT|NWT|Booking No|M B/L|H B/L|PO No|Reference No|Lot ID|Additional Lot Property|Additional Lot Property|Additional Lot Property|Sum Price|Sum Price|W/H Code|wh_nm|bk_sts_cd";
//		      var hdr2="Order No|Order Type|Estimated\nDate|Status|Inbound\nDate|Contract|Code|Description|Item Lot|UOM|UOM QTY|Pack Master Info.|EA Qty|Sound(S)|Sound(S)|Sound(S)|Damage(D)|Damage(D)|Damage(D)|(S)+(D)\nEA Qty|(S)+(D)\nPE Qty|O/S\nEA Qty|CBM|CBF|KGS|LBS|KGS|LBS|Booking No|M B/L|H B/L|PO No|Reference No|Lot ID|Expiration Date|Lottable04|Lottable05|Currency|Price|W/H Code|wh_nm|bk_sts_cd";
		      var prefix=fix_grid01;

		      SetConfig( { SearchMode:2, MergeSheet:7, Page:10000, FrozenCol:0, DataRowMerge:0 } );

		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WHInList_Sheet1_HDR1'), Align:"Center"},
		                      { Text:getLabel('WHInList_Sheet1_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
		      //LKH::2015-11-03 WMS4.O  
		      //LKH 2016.07.21
		      var cols = [
		             {Type:"Text",      Hidden:1, 	Width:120, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"cust_ord_no_org",  KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Text",      Hidden:0,  	Width:80, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"bk_sts_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Text",      Hidden:0,  	Width:90, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"putawy_sts_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					}, //#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST -->
		             {Type:"Text",      Hidden:0,  	Width:90, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"inv_sts_nm",		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					}, //#2321 [WMS4.0] INVOICE PAID STATUS TO BE ADDED TO IN/OUTBOUND LIST
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Center",		ColMerge:1,  	SaveName:prefix+"cust_ord_no", 		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Text", 		Hidden:0, 	Width:180, 	Align:"Left",		ColMerge:1,  	SaveName:prefix+"ctrt_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text", 		Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"item_cd",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",     	Hidden:0,  	Width:180, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"item_nm",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Date",      Hidden:0,  	Width:120, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"est_in_dt",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:"Ymd"				},
		             {Type:"Date",      Hidden:0,  	Width:120, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"inbound_dt",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"				},
		             {Type:"Text",      Hidden:0, 	Width:100, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"lot_no",           KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Date",      Hidden:0, 	Width:100, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"exp_dt",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Ymd"			},
		             {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"lot_04",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:0, 	Width:80, 	Align:"Left",  		ColMerge:0,		SaveName:prefix+"lot_05",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",  	Hidden:0, 	Width:40, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"item_pkgunit",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,  		 Format:""					},
		             {Type:"Float", 	Hidden:0, 	Width:60, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"item_pkgqty",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
		             {Type:"Text",     	Hidden:1, 	Width:150, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"pkg_info",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"AutoSum",   Hidden:0, 	Width:120, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"item_ea_qty",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",     	Hidden:0,  	Width:40, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"snd_pkgunit",   	KeyField:0,   UpdateEdit:0,    InsertEdit:1,		 Format:""					},
		             {Type:"Float",     Hidden:0, 	Width:60, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"snd_pkgqty",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
		             {Type:"Float",     Hidden:0, 	Width:60, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"snd_ea_qty",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
		             {Type:"Text",    	Hidden:1,  	Width:40, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"inbound_loc_nm",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float" 		        },
		             {Type:"AutoSum",   Hidden:1, 	Width:120, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"est_qty",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
		             {Type:"AutoSum",   Hidden:1, 	Width:120, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"rec_qty",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float"					},
		             {Type:"Text",      Hidden:0,   Width:90,  	Align:"Center", 	ColMerge:0,   	SaveName:prefix+"trucker_cd",    	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
					 {Type:"Text",      Hidden:0,   Width:180,  Align:"Left",   	ColMerge:0,   	SaveName:prefix+"trucker_nm",    	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
					 {Type:"Text",      Hidden:0,   Width:120,  Align:"Center", 	ColMerge:0,   	SaveName:prefix+"dlv_ord_no",    	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"AutoSum",   Hidden:1, 	Width:120, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"os_item_ea_qty",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"item_ser_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"lic_plat_no",		KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"AutoSum", 	Hidden:0, 	Width:80, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_cbm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_CBM_POINT_COUNT	},
		             {Type:"AutoSum",   Hidden:0,  	Width:80, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_cbf",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_CBM_POINT_COUNT	},
		             {Type:"AutoSum",   Hidden:0, 	Width:80,   Align:"Right",   	ColMerge:0,   	SaveName:prefix+"in_item_grs_kgs",  KeyField:0,   UpdateEdit:0,    InsertEdit:0, 	  	 Format:"Float",       	PointCount:WMS_WGT_POINT_COUNT  },
		             {Type:"AutoSum", 	Hidden:0,	Width:80, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_grs_lbs",  KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_WGT_POINT_COUNT	},
		             {Type:"AutoSum",   Hidden:0, 	Width:80, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_net_kgs",  KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_WGT_POINT_COUNT  },
		             {Type:"AutoSum",   Hidden:0, 	Width:80, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_net_lbs",  KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"Float",		PointCount:WMS_WGT_POINT_COUNT  },
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"wib_bk_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",				},
		             {Type:"Text", 		Hidden:0, 	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"po_no",   			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"mbl_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",				},
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"hbl_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"",				},
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"lot_id",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",    	Hidden:0,  	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"ref_no",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
					 {Type:"Text",      Hidden:0,  	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"commc_inv_no",  	KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
					 {Type:"Text",      Hidden:0,  	Width:120, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"rmk",  			KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
					 {Type:"Text",      Hidden:0,  	Width:120, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"ord_tp_nm",  		KeyField:0,   UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"wh_cd",			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:40, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"dmg_pkgunit",   	KeyField:0,	  UpdateEdit:0,    InsertEdit:0, 		 Format:""					},
		             {Type:"Text",  	Hidden:1, 	Width:50, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"dmg_pkgqty",   	KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",     	Hidden:1,  	Width:60, 	Align:"Center",		ColMerge:0,  	SaveName:prefix+"dmg_loc_nm",   	KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"AutoSum",   Hidden:1,  	Width:50, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_ea_qty",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"AutoSum",   Hidden:1, 	Width:50, 	Align:"Right",		ColMerge:0,  	SaveName:prefix+"in_item_pe_qty",   KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""					},
		             {Type:"Text",      Hidden:1, 	Width:70, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"curr_cd",			KeyField:0,	  UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:70, 	Align:"Right",  	ColMerge:0,		SaveName:prefix+"unit_price",		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"NullFloat",	PointCount:2},
		             {Type:"Text",      Hidden:1, 	Width:70, 	Align:"Left",  		ColMerge:0,		SaveName:prefix+"wh_nm",			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text", 		Hidden:1, 	Width:180, 	Align:"Left",		ColMerge:0,  	SaveName:prefix+"bk_sts_cd",   		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:1, 	Width:30, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"ctrt_no",			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             
		             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"rgst_id",			KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:""				},
		             {Type:"Text",      Hidden:0, 	Width:150, 	Align:"Center",  	ColMerge:0,		SaveName:prefix+"rgst_loc_dt",		KeyField:0,   UpdateEdit:0,    InsertEdit:0,		 Format:"YmdHms"		}
		             ];
		       
		          // Set dynamic height.
		          var autoHeight = $(window).height() - 250;
		          SetSheetHeight(autoHeight > 450 ? autoHeight : 450);
		          
			      InitColumns(cols);
			      resizeSheet();
			      SetEditable(1);
			      SetImageList(0,"./web/img/main/icon_text_off.gif");
			      SetImageList(1,"./web/img/main/icon_text_on.gif");
			      SetUnicodeByte(3);
			      SetClipPasteMode(1);			  
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
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			if(col <= 18){
				return
			}else{
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
			}
		break;
	 }
} 
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(sheetObj){
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(i == sheetObj.LastRow())
		{
 			//sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no",sheetObj.GetDataFontColor());
		}
		else
		{
			if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") != "C")
			{
				sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
				sheetObj.SetCellFontUnderline(i, fix_grid01 + "wib_bk_no", 1);
			}
		}
		if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") != "C")
		{
			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_ord_no","#0100FF");
			sheetObj.SetCellFontUnderline(i, fix_grid01 + "cust_ord_no", 1);
		}
		
		//#1700 [WMS4.0] Inbound / Outbound Status 색상 구분
		if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "I"){ //Booked
			sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgBooked);
		}else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "X"){ //Complete
			sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgComplete);
		}else if(sheetObj.GetCellValue(i, fix_grid01 + "bk_sts_cd") == "C"){ //Cancel
			sheetObj.SetCellBackColor(i, fix_grid01 + "bk_sts_nm",bgCancel);
		}
	}
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colName=sheetObj.ColSaveName(Col);
	var cancel_bk_param = "";
	if(sheetObj.GetCellValue(Row, fix_grid01 + "bk_sts_cd") == "C")
	{
		cancel_bk_param = "&bk_sts_cd=C";
		return;
	}
	switch (colName)
	{
		case fix_grid01 + "wib_bk_no": //부킹
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")  
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no")  
			+ cancel_bk_param;
			parent.mkNewFrame('Inbound Management', sUrl);
			break;
		case fix_grid01 + "cust_ord_no": //Status
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd") 
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no")  
			+ cancel_bk_param;
			parent.mkNewFrame('Inbound Management', sUrl);
			break;
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

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
			case "btn_fm_to_date":	
				var cal=new ComCalendarFromTo();
		            cal.displayType="date";
		            cal.select(formObj.fm_bk_date, formObj.to_bk_date, 'MM-dd-yyyy');
				break;
			case "btn_ctrt_no" :
				get_ctrt_no(popupCtr);
			    break;
			case "btn_wh_no" :
				var sUrl="LocationPopup.clt?loc_nm="+formObj.wh_nm.value+"&type=WH_ONLY";
				callBackFunc = "setWhNoInfo";
				modal_center_open(sUrl, callBackFunc, 900,650,"yes");
			    /*var sUrl="LocationPopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&type=WH_ONLY&wh_auth=Y&loc_nm="+formObj.wh_nm.value;
				callBackFunc = "setWhNoInfo";
				modal_center_open(sUrl, callBackFunc, 900,650,"yes");*/
				break;
			case "btn_wh_loc_cd" :
				callBackFunc = "setLocInfo";
 			    modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+formObj.wh_cd.value, rtnary, 700, 500,"yes");
 				break;
			case "SEARCHLIST":
 				btn_Search();
 				break;
			case "EXCEL":
				if(sheet1.RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	    			btn_Excel();
	    		}
				break;
			case "NEW":
				var paramStr="./WHInMgmt.clt";
	            parent.mkNewFrame('Inbound Management', paramStr);
	            break;
				break;
			case "sheet1_btn_show":
				if (formObj.vw_tp_cd.value == "O") {
					sheet1.SetColHidden(fix_grid01+"trucker_cd", 0);
					sheet1.SetColHidden(fix_grid01+"trucker_nm", 0);
					sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 0);
					sheet1.SetColHidden(fix_grid01+"commc_inv_no", 0);
					sheet1.SetColHidden(fix_grid01+"rmk", 0);
				}
				
				if (formObj.vw_tp_cd.value == "I"){
					sheet1.SetColHidden(fix_grid01+"po_no", 0);
					sheet1.SetColWidth(fix_grid01+"po_no", 120);
					sheet1.SetColHidden(fix_grid01+"lot_id", 0);
					sheet1.SetColWidth(fix_grid01+"lot_id", 120);					
				}
				
				
				sheet1.SetColHidden(fix_grid01+"in_item_cbm", 0);
				sheet1.SetColWidth(fix_grid01+"in_item_cbm", 80);
				
				sheet1.SetColHidden(fix_grid01+"in_item_cbf", 0);
				sheet1.SetColWidth(fix_grid01+"in_item_cbf", 80);
				
				sheet1.SetColHidden(fix_grid01+"in_item_grs_kgs", 0);
				sheet1.SetColWidth(fix_grid01+"in_item_grs_kgs", 80);
				
				sheet1.SetColHidden(fix_grid01+"in_item_grs_lbs", 0);
				sheet1.SetColWidth(fix_grid01+"in_item_grs_lbs", 80);
				
				sheet1.SetColHidden(fix_grid01+"in_item_net_kgs", 0);
				sheet1.SetColWidth(fix_grid01+"in_item_net_kgs", 80);
				
				sheet1.SetColHidden(fix_grid01+"in_item_net_lbs", 0);
				sheet1.SetColWidth(fix_grid01+"in_item_net_lbs", 80);
				
				sheet1.SetColHidden(fix_grid01+"wib_bk_no", 0);
				sheet1.SetColWidth(fix_grid01+"wib_bk_no", 120);
				
				//sheet1.SetColHidden(fix_grid01+"po_no", 0);
				//sheet1.SetColWidth(fix_grid01+"po_no", 120);

				sheet1.SetColHidden(fix_grid01+"mbl_no", 0);
				sheet1.SetColWidth(fix_grid01+"mbl_no", 120);
				
				sheet1.SetColHidden(fix_grid01+"hbl_no", 0);
				sheet1.SetColWidth(fix_grid01+"hbl_no", 120);
				
				//sheet1.SetColHidden(fix_grid01+"lot_id", 0);
				//sheet1.SetColWidth(fix_grid01+"lot_id", 120);
				
				sheet1.SetColHidden(fix_grid01+"ref_no", 0);
				sheet1.SetColWidth(fix_grid01+"ref_no", 120);
				
				sheet1.SetColHidden(fix_grid01+"ord_tp_nm", 0);
				sheet1.SetColWidth(fix_grid01+"ord_tp_nm", 120);
				
				sheet1.SetColHidden(fix_grid01+"wh_cd", 0);
				sheet1.SetColWidth(fix_grid01+"wh_cd", 120);
				
				sheet1.SelectCell(2, fix_grid01+"wh_cd");
				sheet1.SelectCell(2, fix_grid01+"wib_bk_no");
 				$("#sheet1_btn_show").hide();
 				$("#sheet1_btn_hide").show();
 				break;
 			case "sheet1_btn_hide":
 				sheet1_btn_hide();
 				$("#sheet1_btn_hide").hide();
 				$("#sheet1_btn_show").show();
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
function sheet1_btn_hide(){
	sheet1.SetColHidden(fix_grid01+"in_item_cbm", 1);
	sheet1.SetColWidth(fix_grid01+"in_item_cbm", 1);
	
	sheet1.SetColHidden(fix_grid01+"in_item_cbf", 1);
	sheet1.SetColWidth(fix_grid01+"in_item_cbf", 1);
	
	sheet1.SetColHidden(fix_grid01+"in_item_grs_kgs", 1);
	sheet1.SetColWidth(fix_grid01+"in_item_grs_kgs", 1);
	
	sheet1.SetColHidden(fix_grid01+"in_item_grs_lbs", 1);
	sheet1.SetColWidth(fix_grid01+"in_item_grs_lbs", 1);
	
	sheet1.SetColHidden(fix_grid01+"in_item_net_kgs", 1);
	sheet1.SetColWidth(fix_grid01+"in_item_net_kgs", 1);
	
	sheet1.SetColHidden(fix_grid01+"in_item_net_lbs", 1);
	sheet1.SetColWidth(fix_grid01+"in_item_net_lbs", 1);
	
	sheet1.SetColHidden(fix_grid01+"wib_bk_no", 1);
	sheet1.SetColWidth(fix_grid01+"wib_bk_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"po_no", 1);
	sheet1.SetColWidth(fix_grid01+"po_no", 1);

	sheet1.SetColHidden(fix_grid01+"mbl_no", 1);
	sheet1.SetColWidth(fix_grid01+"mbl_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"hbl_no", 1);
	sheet1.SetColWidth(fix_grid01+"hbl_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"lot_id", 1);
	sheet1.SetColWidth(fix_grid01+"lot_id", 1);
	
	sheet1.SetColHidden(fix_grid01+"ref_no", 1);
	sheet1.SetColWidth(fix_grid01+"ref_no", 1);
	
	sheet1.SetColHidden(fix_grid01+"ord_tp_nm", 1);
	sheet1.SetColWidth(fix_grid01+"ord_tp_nm", 1);
	
	sheet1.SetColHidden(fix_grid01+"wh_cd", 1);
	sheet1.SetColWidth(fix_grid01+"wh_cd", 1);
	
	sheet1.SetColHidden(fix_grid01+"trucker_cd", 1);
	sheet1.SetColHidden(fix_grid01+"trucker_nm", 1);
	sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 1);
	sheet1.SetColHidden(fix_grid01+"commc_inv_no", 1);
	sheet1.SetColHidden(fix_grid01+"rmk", 1);
}
function locPopup(){
	var formObj = document.form;
	callBackFunc = "setLocInfo";
	modal_center_open('./WarehouseLocPopup.clt?f_loc_cd='+formObj.wh_cd.value+'&wh_loc_nm=' +formObj.wh_loc_nm.value, rtnary, 700, 500,"yes");
}
function get_ctrt_no(popupCtr){
	var formObj=document.form;
	var param = "";
	if(popupCtr == "EnterK"){
		param = "?ctrt_no=" + "&ctrt_nm=" + formObj.ctrt_nm.value + "&ctrt_use_flg=A";
	}else{
		param = "?ctrt_no=" + "&ctrt_use_flg=A";
	}
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt' + param, callBackFunc, 900, 580,"yes");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "search_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
			case "ref_no":	
				btn_Search();
			case "lot_no":	
				btn_Search();
			break;
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

function getCtrtInfo(obj){
	if(obj.value != ""){
		var ord_tp_lvl1_cd="\'P\'";
		var pnl_svc_tp_cd="44";
		$.ajax({
			url : "searchTlCtrtInfo.do?ctrt_no="+obj.value+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&pnl_svc_tp_cd=" + pnl_svc_tp_cd,
			success : function(result) {
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				}
				resultCtrtInfo(result.xml);
			}
		});
	}
	else
	{
		$("#ctrt_nm").val("");
	}
}

function btn_Search() {
	var formObj = document.form;
	var sheetObj = sheet1;
	
	if(loading_flag != "Y"){
		return;
	}
	
	if (validateForm(formObj, 'search')) {
		formObj.f_cmd.value=SEARCH;
		sheetObj.DoSearch("WHInListGS.clt", FormQueryString(formObj,""));
	}
}

function btn_Excel() {
 	sheet1.Down2Excel( {DownCols: makeHiddenSkipCol(sheet1), SheetDesign:1,Merge:1 });
}

/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) 
		{
			case "search":
				//warehouse는 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//bk_no 또는 in_no가 없는경우 bk_date, in_date 둘중하는 필수
				if(ComIsEmpty(formObj.search_no) && ComIsEmpty(formObj.ref_no) && ComIsEmpty(formObj.lot_no)
				&& ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date))
				{
					ComShowCodeMessage("COM0114","Booking Date or Estimated Date or Inbound Date");
					$("#fm_bk_date").focus();
					return false;
				}
				if(!ComIsEmpty(formObj.fm_bk_date) && ComIsEmpty(formObj.to_bk_date)){
					formObj.to_bk_date.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.fm_bk_date) && !isDate(formObj.fm_bk_date)) {
					ComShowCodeMessage("COM0114", $("#search_tp_dt :selected").text());
					formObj.fm_bk_date.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.to_bk_date) && !isDate(formObj.to_bk_date)) {
					ComShowCodeMessage("COM0114",  $("#search_tp_dt :selected").text());
					formObj.to_bk_date.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.fm_bk_date)&&ComIsEmpty(formObj.to_bk_date))||(ComIsEmpty(formObj.fm_bk_date)&&!ComIsEmpty(formObj.to_bk_date))) {
					ComShowCodeMessage("COM0122",  $("#search_tp_dt :selected").text());
					formObj.fm_bk_date.focus();
					return false;
				}
				if (getDaysBetween2(formObj.fm_bk_date.value, formObj.to_bk_date.value)<0) {
					//ComShowCodeMessage("COM0122",  $("#search_tp_dt :selected").text());
					alert(getLabel('FMS_COM_ALT033'));
					formObj.fm_bk_date.focus();
					return false;
				}
				//item_cd가 입력된경우 
				if(!ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.search_no))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				if(!ComIsEmpty(formObj.ref_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.search_no))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				if(ComIsEmpty(formObj.wh_loc_nm)){
					formObj.wh_loc_cd.value = "";
					formObj.wh_loc_nm_org.value = "";
				}
				break;
		}
	}
	return true;
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
	}
}
function setWhNoInfo(rtnVal){
	var formObj = document.form;
	formObj.wh_cd.vaue   =  rtnVal[1];
	formObj.wh_nm.vaue   =  rtnVal[2];
	formObj.ctrt_no.vaue =  rtnVal[30];
	formObj.ctrt_nm.vaue =  rtnVal[31];
	var std_unit = rtnVal[33];
	if(std_unit == "")
	{
		$("#measure_tp")[0].Code= "ALL";
	}
	else
	{
		$("#measure_tp")[0].Code= std_unit;
	}
}
function setLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var aryPopupData=rtnVal.split("|");
		$("#wh_loc_cd").val(aryPopupData[0]);// wh_loc_cd
		$("#wh_loc_nm").val(aryPopupData[1]);// wh_loc_nm
		$("#wh_loc_nm_org").val(aryPopupData[3]);// wh_loc_nm
	}
}

function measure_tp_OnChange(Code){
	if(Code == "ALL")
	{
		sheet1.SetColHidden(fix_grid01 + "in_item_cbm",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_cbf",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_grs_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_grs_lbs",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_net_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_net_lbs",0);
	}
	else if(Code == "KGS")
	{
		sheet1.SetColHidden(fix_grid01 + "in_item_cbm",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_cbf",1);
		sheet1.SetColHidden(fix_grid01 + "in_item_grs_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_grs_lbs",1);
		sheet1.SetColHidden(fix_grid01 + "in_item_net_kgs",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_net_lbs",1);
	}
	else
	{
		sheet1.SetColHidden(fix_grid01 + "in_item_cbm",1);
		sheet1.SetColHidden(fix_grid01 + "in_item_cbf",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_grs_kgs",1);
		sheet1.SetColHidden(fix_grid01 + "in_item_grs_lbs",0);
		sheet1.SetColHidden(fix_grid01 + "in_item_net_kgs",1);
		sheet1.SetColHidden(fix_grid01 + "in_item_net_lbs",0);
	}
}
/*
 * Putaway Location search
 * onChange
 */
var temp = '';
function getInboundLocInfo(div){	
	temp = div;
	if($("#wh_loc_nm").val() == "")
	{
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if(div == "e")
		{
			btn_Search();
		}
		return;
	}
	var formObj=document.form;
	if(ComIsEmpty(formObj.wh_cd))
	{
		ComShowCodeMessage("COM0114","Warehouse");
		$("#wh_loc_nm").val("");
		$("#wh_cd").focus();
		return;
	}
	var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#wh_loc_nm").val() + "&f_putaway_flg=Y" + "&f_cmd=" + COMMAND01;
	ajaxSendPost(resultPutawayLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultPutawayLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
	    var rtnArr=doc[1].split('^@');
	    	if(rtnArr[0] != ""){
	    		formObj.wh_loc_nm.value=rtnArr[1];
	    		formObj.wh_loc_nm_org.value=rtnArr[2];
	    		formObj.wh_loc_cd.value=rtnArr[0];
	    		if(temp == "e")
	    		{
	    			btn_Search();
	    		}
	    	}
	    	else{
	    		formObj.wh_loc_nm.value="";
	    		formObj.wh_loc_nm_org.value=""; 
	    		formObj.wh_loc_cd.value=""; 
	    		formObj.wh_loc_nm.focus();
	    	}
		}
		else{
			formObj.wh_loc_nm.value="";
    		formObj.wh_loc_nm_org.value=""; 
    		formObj.wh_loc_cd.value=""; 
    		formObj.wh_loc_nm.focus();
		}
	 }
	 else{
		 	formObj.wh_loc_nm.value="";
	 		formObj.wh_loc_nm_org.value=""; 
	 		formObj.wh_loc_cd.value=""; 
	 		formObj.wh_loc_nm.focus();
	 }
	
}
function getCtrtInfo2(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	}else{
		searchCtrtInfo2(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
	}
}
function searchCtrtInfo2 (form, ctrt_no, col_nm){
	var ord_tp_lvl1_cd="\'T\'";
	var ord_tp_lvl2_cd="\'S\',\'SA\'";
	
	ajaxSendPost(resultCtrtInfo2, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ctrt_no, './GateServlet.gsl');
}
function resultCtrtInfo2(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.ctrt_nm.value=rtnArr[0];
			}
			else{
				formObj.ctrt_no.value="";
				formObj.ctrt_nm.value="";	
			}
		}
		else{
			formObj.ctrt_no.value="";
			formObj.ctrt_nm.value="";	
		}
	}
}
//Enable/Disable columns on grid when View Type Combobox is changed.
function changeViewType() {
	var formObj = document.form;
	var vw_tp_cd_val = formObj.vw_tp_cd.value;
	sheet1.RemoveAll();
	if (vw_tp_cd_val == "O") {
		sheet1.SetColHidden(fix_grid01+"item_cd", 1);
		sheet1.SetColHidden(fix_grid01+"item_nm", 1);
		sheet1.SetColHidden(fix_grid01+"lot_no", 1);
		sheet1.SetColHidden(fix_grid01+"exp_dt", 1);
		sheet1.SetColHidden(fix_grid01+"lot_04", 1);
		sheet1.SetColHidden(fix_grid01+"lot_05", 1);
		sheet1.SetColHidden(fix_grid01+"item_pkgqty", 1);
		sheet1.SetColHidden(fix_grid01+"item_pkgunit", 1);
		sheet1.SetColHidden(fix_grid01+"item_ea_qty", 1);
		sheet1.SetColHidden(fix_grid01+"snd_pkgqty", 1);
		sheet1.SetColHidden(fix_grid01+"snd_pkgunit", 1);
		sheet1.SetColHidden(fix_grid01+"snd_ea_qty", 1);
		sheet1.SetColHidden(fix_grid01+"rec_qty", 0);
		sheet1.SetColHidden(fix_grid01+"est_qty", 0);
		sheet1.SetColHidden(fix_grid01+"po_no", 1);
		sheet1.SetColHidden(fix_grid01+"lot_id", 1);
		
		if ($('#sheet1_btn_show').css('display') == "none") {
			sheet1.SetColHidden(fix_grid01+"trucker_cd", 0);
			sheet1.SetColHidden(fix_grid01+"trucker_nm", 0);
			sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 0);
			sheet1.SetColHidden(fix_grid01+"commc_inv_no", 0);
			sheet1.SetColHidden(fix_grid01+"rmk", 0);
		}
	} else {
		sheet1.SetColHidden(fix_grid01+"item_cd", 0);
		sheet1.SetColHidden(fix_grid01+"item_nm", 0);
		sheet1.SetColHidden(fix_grid01+"lot_no", 0);
		sheet1.SetColHidden(fix_grid01+"exp_dt", 0);
		sheet1.SetColHidden(fix_grid01+"lot_04", 0);
		sheet1.SetColHidden(fix_grid01+"lot_05", 0);
		sheet1.SetColHidden(fix_grid01+"item_pkgqty", 0);
		sheet1.SetColHidden(fix_grid01+"item_pkgunit", 0);
		sheet1.SetColHidden(fix_grid01+"item_ea_qty", 0);
		sheet1.SetColHidden(fix_grid01+"snd_pkgqty", 0);
		sheet1.SetColHidden(fix_grid01+"snd_pkgunit", 0);
		sheet1.SetColHidden(fix_grid01+"snd_ea_qty", 0);
		sheet1.SetColHidden(fix_grid01+"rec_qty", 1);
		sheet1.SetColHidden(fix_grid01+"est_qty", 1);
		sheet1.SetColHidden(fix_grid01+"trucker_cd", 1);
		sheet1.SetColHidden(fix_grid01+"trucker_nm", 1);
		sheet1.SetColHidden(fix_grid01+"dlv_ord_no", 1);
		sheet1.SetColHidden(fix_grid01+"commc_inv_no", 1);
		sheet1.SetColHidden(fix_grid01+"rmk", 1);
		sheet1.SetColHidden(fix_grid01+"po_no", 0);
		sheet1.SetColHidden(fix_grid01+"lot_id", 0);

	}
	
	btn_Search();
}