/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WOLoadPopup.js
*@FileTitle  : BL Load
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/13
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
var opener=window.dialogArguments;
function loadPage() {
	var formObj=document.form;
	var i=0;
	for(i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	initControl();
	if(formObj.po_item_flag.value == "N" ){
		formObj.check_item.checked=true;
		//ComEnableObject(formObj.check_item, false);
		document.getElementById("check_item").disabled = false;
	}
	if(formObj.in_order_tp.value == "HBL"){
		formObj.radio_type[0].checked=true;
		formObj.radio_type[0].disabled=true;
		formObj.radio_type[1].disabled=true;
	}else if(formObj.in_order_tp.value == "HAWB"){
		formObj.radio_type[1].checked=true;
		formObj.radio_type[0].disabled=true;
		formObj.radio_type[1].disabled=true;
	}	
}
function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("blur", "form_onChange", formObject);
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:
		    with(sheetObj){
//		      var hdr1="|HB/L No|MB/L No|Contract No|Contract Name|POL|ETD|POD|ETA|DEL|Container No|Cust Order No|Item No|Item DESC|"
//		      + "Lot No|Pallet No|QTY|PKG|CBM|G/WT(KG)|N/WT(KG)|PKG Unit|SHPR Code|SHPR Name|CNEE Code|CNEE Name|Carrier Code|Carrier Name|"
//		      + "Vessel Code|Vessel Name|Voyage|Flight No|RTP No|SO No|Main Service Type|ITEM_SYS_NO|PO_SYS_NO|Type|Liner BKG No|Perfomance Date|||POL NM|POD NM|DEL NM|POR|POR NM|an_ymd|final_freeday_ymd|cntr_yard_cd|seal_no|loc_job_no|loc_job_flg|loc_job_flg_nm|loc_job_close_dt_hh|loc_job_close_dt_mm|frt_closing_dt|frt_closing_flg_nm";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WOLoadPopup_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"check" },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pol",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"etd",                  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pod",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eta",                  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"del",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"po_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_cd",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_nm",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lot_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pallet_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"item_qty",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"item_pkgqty",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"item_cbm",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"item_kgs",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"item_net_wgt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"shp_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"shp_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cne_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"cne_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"carrier_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"carrier_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vsl_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vsl_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"voy",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"flight_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rtp_no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"so_no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pnl_svc_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"item_sys_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"po_sys_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"liner_bkg_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"est_cmpl_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"sales_ofc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"sales_pic_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pol_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"pod_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"del_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"por",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"por_nm",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"an_ymd",               KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"final_freeday_ymd",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cntr_yard_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cntr_seal1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_flg_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_close_dt",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"loc_job_close_dt_hm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"frt_closing_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"frt_closing_flg_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		       
			      InitColumns(cols);
			      SetSheetHeight(380);
			      SetEditable(1);
			      resizeSheet();
		            }
		      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}


function btn_OK() {
	sheetObj=docObjects[0];
	var rtnary=new Array();
	//0 - 9
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "mbl_no"             ); 
	retArray += "|";                                             
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "ctrt_no"             ); 
	retArray += "|";	
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "ctrt_nm"            ); 
	retArray += "|";                                                           
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(),  "pol"             ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "etd"                ); 
	retArray += "|";                                                           
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "pod"                ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "eta"                ); 
	retArray += "|";                                                           
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "del"                ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cntr_no"            ); 
	retArray += "|";                                                         
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "po_no"            ); 
	retArray += "|"; 
	//10 - 19
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_cd"            ); 
	retArray += "|";                                                       
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_nm"            ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "lot_no"             ); 
	retArray += "|";                                                     
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "pallet_no"             ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_qty"           ); 
	retArray += "|";                                                   
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_pkgqty"           ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_cbm"           ); 
	retArray += "|";                                                      
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_kgs"           ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_net_wgt"       ); 
	retArray += "|";                                                  
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_pkgunit"       ); 
	retArray += "|";
	//20 - 29
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "shp_cd"             ); 
	retArray += "|";                                                     
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "shp_nm"             ); 
	retArray += "|"; 	
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cne_cd"             ); 
	retArray += "|";                                                      
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cne_nm"             ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "carrier_cd"         ); 
	retArray += "|";                                                    
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "carrier_nm"         ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "vsl_cd"             ); 
	retArray += "|";                                                        
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "vsl_nm"             ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "voy"                ); 
	retArray += "|";                                                     
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "flight_no"                ); 
	retArray += "|";
	//30 - 39
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "rtp_no"              ); 
	retArray += "|";                                                 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "so_no"              ); 
	retArray += "|"; 	
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "pnl_svc_tp_cd"       ); 
	retArray += "|";                                                    
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "item_sys_no"       ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "po_sys_no"           ); 
	retArray += "|";                                                   
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cntr_tpsz_cd"           ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "liner_bkg_no"        ); 
	retArray += "|";                                                    
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "est_cmpl_dt"        ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "sales_ofc_cd"        ); 
	retArray += "|";                                                   
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "sales_pic_id"        ); 
	retArray += "|";
	//40 - 49
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "pol_nm"              ); 
	retArray += "|";                                                         
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "pod_nm"              ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "del_nm"              ); 
	retArray += "|";                                                            
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "por"              ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "por_nm"              ); 
	retArray += "|";                                                         
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "an_ymd"              ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "final_freeday_ymd"   ); 
	retArray += "|";                                                   
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cntr_yard_cd"   ); 
	retArray += "|";         
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "cntr_seal1"          ); 
	retArray += "|";                                                     
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "loc_job_no"          ); 
	retArray += "|";
	//50 - 56
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "loc_job_flg"         ); 
	retArray += "|";                                                 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "loc_job_flg_nm"         ); 
	retArray += "|"; 
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "loc_job_close_dt"         ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "loc_job_close_dt_hm"         ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "frt_closing_dt"         ); 
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "frt_closing_flg_nm"         );
	retArray += "|";
	retArray += sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no"         );
	ComClosePopup(retArray);                                       
	//comPopupOK();
}

function btn_Search()
{
	var formObj=document.form;
	var sParm="";
	var formObj=document.form;
	formObj.f_cmd.value=SEARCH;
	if (validateForm(docObjects[0],formObj,'Search')) {
	docObjects[0].DoSearch("./searchWOLoadList.clt", FormQueryString(formObj,""));
	}
}

function btn_Close() {
	  ComClosePopup(); 
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		var cal=new ComCalendar();
		switch(srcName) {
 			case "btn_ctrt_no" :
 				rtnary=new Array(1);
 				rtnary[0]=formObj.ctrt_no.value;
 				rtnary[1]=formObj.ctrt_nm.value;
 				callBackFunc = "setCtrtNoInfo";
 				modal_center_open('./ContractRoutePopup.clt', rtnary, 900, 580,"yes");
				break;
			case "btn_to_etd":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.fm_etd, formObj.to_etd, 'MM-dd-yyyy');
				break;
			case "btn_to_eta":	
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
	            cal.select(formObj.fm_eta, formObj.to_eta, 'MM-dd-yyyy');
				break;
 			case "btn_pol":
 				rtnary=new Array(1);
 				rtnary[0]="loc_cd="+formObj.pol.value;
 				callBackFunc = "setPolLocInfo";
 				modal_center_open('./CMM_POP_0030.clt', rtnary, 900,680,"yes");
				break;
 			case "btn_pod":
 				rtnary=new Array(1);
 				rtnary[0]="loc_cd="+formObj.pod.value;
 				callBackFunc = "setPodLocInfo";
 				modal_center_open('./CMM_POP_0030.clt', rtnary, 900,680,"yes");
				break;
			case "btn_del":
				rtnary=new Array(1);
 				rtnary[0]="loc_cd="+formObj.del.value;
 				callBackFunc = "setDelLocInfo";
 				modal_center_open('./CMM_POP_0030.clt', rtnary, 900,680,"yes");
				break;				
 			case "btn_carrier":	
 				rtnary=new Array(1);
 				rtnary[0]=formObj.carrier_cd.value;
 				rtnary[1]=formObj.carrier_nm.value;
 				callBackFunc = "setCarrierInfo";
 				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
 				
 				break;		
 			case "btn_vsl":	
 				rtnary=new Array(1);
 				rtnary[0]=formObj.mvsl_cd.value;
 				rtnary[1]=formObj.mvsl_nm.value;
 				callBackFunc = "setVslInfo";
 				modal_center_open('./VesselPopup.clt', rtnary, 1150,650,"yes");
 				
 				break;
 			case "btn_shipper":
 				rtnary=new Array(1);
 				rtnary[0]=formObj.shp_cd.value;
 				rtnary[1]=formObj.shp_nm.value;
 				callBackFunc = "setShipperInfo";
 				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
 				
 				break;
			case "btn_consignee":	//Location 조회 팝업
				rtnary=new Array(1);
 				rtnary[0]=formObj.cne_cd.value;
 				rtnary[1]=formObj.cne_nm.value;
 				callBackFunc = "setBuyerInfo";
 				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
				
				break;
			case "radio_type":
				if(formObj.po_item_flag.value != "N" ){
					if ( formObj.radio_type[1].checked ){
						formObj.check_item.checked=true;
						document.getElementById("check_item").disabled = false;
						//ComEnableObject(formObj.check_item, false);	
					} else {
						//ComEnableObject(formObj.check_item, true);	
						document.getElementById("check_item").disabled = true;
					}
				}
				break;
			case "btn_OK":	//Location 조회 팝업
				btn_OK();
				break;
			case "CLOSE":	//Location 조회 팝업
				btn_Close();
				break;
			case "SEARCHLIST":	//Location 조회 팝업
				btn_Search();
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
function setCtrtNoInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.ctrt_no.value =    rtVal[0];
	formObj.ctrt_nm.value =    rtVal[1];	
	}
}
function setPolLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.pol.value =    rtVal[0];
	formObj.pol_nm.value = rtVal[2];
	}
}
function setPodLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.pod.value =    rtVal[0];
	formObj.pod_nm.value = rtVal[2];
	}
}
function setDelLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.del.value =    rtVal[0];
	formObj.del_nm.value = rtVal[2];
	}
}
function setCarrierInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.carrier_cd.value =    rtVal[0];
	formObj.carrier_nm.value =    rtVal[2];
	}
}
function setVslInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.mvsl_cd.value =    rtVal[0];
	formObj.mvsl_nm.value =    rtVal[2];	
	}
}
function setShipperInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.shp_cd.value =    rtVal[0];
	formObj.shp_nm.value =    rtVal[2];	
	}
}
function setBuyerInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
	var rtVal = rtnVal.split("|");
	formObj.cne_cd.value =    rtVal[0];
	formObj.cne_nm.value =    rtVal[2];
	}
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'Search':		
//			1. 필수 조회 조건 : HBL No 나 MBL No 이 조회조건에 없으면 기간(ETD 나 ETA)을 3개월 이하로 넣어야함
//			   Msg : Please put either Period condition (less than 3 months) or specific value.(HBL No, MBL No)
			if (ComIsEmpty(formObj.mbl_no) && ComIsEmpty(formObj.hbl_no)) {
				if(ComIsEmpty(formObj.fm_etd) && ComIsEmpty(formObj.to_etd)){
					formObj.to_etd.value=ComGetNowInfo();
				}
				if (ComIsEmpty(formObj.fm_etd) && !isDate(formObj.fm_etd)) {
					ComShowCodeMessage("COM0114","ETD!");
					formObj.fm_etd.focus();
					return false;
				}
				if (ComIsEmpty(formObj.to_etd) && !isDate(formObj.to_etd)) {
					ComShowCodeMessage("COM0114","ETD!");
					formObj.to_etd.focus();
					return false;
				}
				if ((ComIsEmpty(formObj.fm_etd)&&ComIsEmpty(formObj.to_etd))||(ComIsEmpty(formObj.fm_etd)&&!ComIsEmpty(formObj.to_etd))) {
					ComShowCodeMessage("COM0114","ETD!");
					if ( ComIsEmpty(formObj.to_etd)){
						formObj.to_etd.focus();
					} else if ( ComIsEmpty(formObj.fm_etd)){
						formObj.fm_etd.focus();
					}
					return false;
				}
				if (getDaysBetween2(formObj.fm_etd.value, formObj.to_etd.value)<0) {
					ComShowCodeMessage("COM0114","ETD!");
					formObj.fm_etd.focus();
					return false;
				}
				/*********************************************************************/
				if(!ComIsEmpty(formObj.fm_eta) && ComIsEmpty(formObj.to_eta)){
					formObj.to_eta.value=ComGetNowInfo();
				}
				if (!ComIsEmpty(formObj.fm_eta) && !isDate(formObj.fm_eta)) {
					ComShowCodeMessage("COM0114","ETA!");
					formObj.fm_eta.focus();
					return false;
				}
				if (!ComIsEmpty(formObj.to_eta) && !isDate(formObj.to_eta)) {
					ComShowCodeMessage("COM0114","ETA!");
					formObj.to_eta.focus();
					return false;
				}
				if ((!ComIsEmpty(formObj.fm_eta)&&ComIsEmpty(formObj.to_eta))||(ComIsEmpty(formObj.fm_eta)&&!ComIsEmpty(formObj.to_eta))) {
					ComShowCodeMessage("COM0114","ETA!");
					if ( ComIsEmpty(formObj.to_eta)){
						formObj.to_eta.focus();
					} else if ( ComIsEmpty(formObj.fm_eta)){
						formObj.fm_eta.focus();
					}
					return false;
				}
				if (getDaysBetween2(formObj.fm_eta.value, formObj.to_eta.value)<0) {
					ComShowCodeMessage("COM0114","ETA!");
					formObj.fm_eta.focus();
					return false;
				}
				/*********************************************************************/
				if ((!ComIsEmpty(formObj.fm_etd) && !ComIsEmpty(formObj.to_etd)) || (!ComIsEmpty(formObj.fm_eta) && !ComIsEmpty(formObj.to_eta))) {
					var etd=getDaysBetween2(formObj.fm_etd.value, formObj.to_etd.value);
					var eta=getDaysBetween2(formObj.fm_eta.value, formObj.to_eta.value);
//					if (etd < 0 || etd > 91 ) {
//						ComShowCodeMessage("COM0003","Please put either","3");
//						formObj.fm_etd.focus();
//						return false;
//					}
//					if ( eta < 0 || eta > 91) {
//						ComShowCodeMessage("COM0003","Please put either","3");
//						formObj.fm_eta.focus();
//						return false;
//					}
					if(ComIsEmpty(formObj.pol)&&ComIsEmpty(formObj.pod)&&ComIsEmpty(formObj.del)){
						ComShowCodeMessage("COM0114","POL, POD OR DEL");
						formObj.pol.focus();
						return false;
					}
				} else {
					ComShowCodeMessage("COM0114","ETD OR ETA");
					formObj.fm_etd.focus();
					return false;					
				}
			}			
			break;
		}
	}
	return true;
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case 'mbl_no':
			case 'hbl_no':
				btn_Search();
				break;
		}
		if(srcName == "ctrt_no"){
			if (!ComIsNull(srcValue)){
				searchTlCtrtInfo(formObj, ComGetObjValue(formObj.ctrt_no),"ctrt_no");
			} else {
				formObj.ctrt_nm.value="";
			}
		} else if(srcName == "carrier_cd"){
			if (!ComIsNull(srcValue)){
				searchTlCustInfo(formObj, ComGetObjValue(formObj.carrier_cd),"carrier_cd");
			} else {
				formObj.carrier_nm.value="";
			}	
		} else if(srcName == "shp_cd"){
			if (!ComIsNull(srcValue)){
				searchTlCustInfo(formObj, ComGetObjValue(formObj.shp_cd),"shp_cd");
			} else {
				formObj.shp_nm.value="";
			}
		} else if(srcName == "cne_cd"){
			if (!ComIsNull(srcValue)){
				searchTlCustInfo(formObj, ComGetObjValue(formObj.cne_cd),"cne_cd");
			} else {
				formObj.cne_nm.value="";
			}
		} else if(srcName == "pol"){
			if (!ComIsNull(srcValue)){
				searchLocNm(formObj, ComGetObjValue(formObj.pol),"pol");
			} else {
				formObj.pol_nm.value="";
			}
		} else if(srcName == "pod"){
			if (!ComIsNull(srcValue)){
				searchLocNm(formObj, ComGetObjValue(formObj.pod),"pod");
			} else {
				formObj.pod_nm.value="";
			}
		} else if(srcName == "del"){
			if (!ComIsNull(srcValue)){
				searchLocNm(formObj, ComGetObjValue(formObj.del),"del");
			} else {
				formObj.del_nm.value="";
			}
		} else if(srcName == "mvsl_cd"){
			if (!ComIsNull(srcValue)){
				searchVslNm(formObj, ComGetObjValue(formObj.mvsl_cd));
			} else {
				formObj.mvsl_nm.value="";
			}
		} else if(srcName == "ctrt_nm"){
			var sUrl="ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
			ComOpenPopup(sUrl, 900, 580, "setCtrtNoInfo", "0,0", true);
		} else if(srcName == "pol_nm"){
			var sUrl="CMM_POP_0030.do?loc_cd="+formObj.pol.value+"&loc_nm="+formObj.pol_nm.value;
			ComOpenPopup(sUrl, 900, 580, "setPolLocInfo", "0,0", true);
		} else if(srcName == "pod_nm"){
			var sUrl="CMM_POP_0030.do?loc_cd="+formObj.pod.value+"&loc_nm="+formObj.pod_nm.value;
			ComOpenPopup(sUrl, 900, 580, "setPodLocInfo", "0,0", true);
		} else if(srcName == "del_nm"){
			var sUrl="CMM_POP_0030.do?loc_cd="+formObj.del.value+"&loc_nm="+formObj.del_nm.value;
			ComOpenPopup(sUrl, 900, 580, "setDelLocInfo", "0,0", true);
		} else if(srcName == "carrier_nm"){
			var sUrl="CMM_POP_0010.clt?cust_cd="+formObj.carrier_cd.value+"&cust_nm="+formObj.carrier_nm.value;
			ComOpenPopup(sUrl, 900, 700, "setCarrierInfo", "0,0", true);
		} else if(srcName == "mvsl_nm"){
			var sUrl="VesselPopup.clt?vsl_cd="+formObj.mvsl_cd.value+"&vsl_nm="+formObj.mvsl_nm.value;
			ComOpenPopup(sUrl, 900, 700, "setVslInfo", "0,0", true);
		} else if(srcName == "shp_nm"){
			var sUrl="CMM_POP_0010.clt?cust_cd="+formObj.shp_cd.value+"&cust_nm="+formObj.shp_nm.value;
			ComOpenPopup(sUrl, 900, 700, "setShipperInfo", "0,0", true);
		} else if(srcName == "cne_nm"){
			var sUrl="CMM_POP_0010.clt?cust_cd="+formObj.cne_cd.value+"&cust_nm="+formObj.cne_nm.value;
			ComOpenPopup(sUrl, 900, 700, "setBuyerInfo", "0,0", true);
		}
	}
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if(srcName == "ctrt_no"){
		if (!ComIsNull(srcValue)){
			searchTlCtrtInfo(formObj, ComGetObjValue(formObj.ctrt_no),"ctrt_no");
		} else {
			formObj.ctrt_nm.value="";
		}
	} else if(srcName == "carrier_cd"){
		if (!ComIsNull(srcValue)){
			searchTlCustInfo(formObj, ComGetObjValue(formObj.carrier_cd),"carrier_cd");
		} else {
			formObj.carrier_nm.value="";
		}	
	} else if(srcName == "shp_cd"){
		if (!ComIsNull(srcValue)){
			searchTlCustInfo(formObj, ComGetObjValue(formObj.shp_cd),"shp_cd");
		} else {
			formObj.shp_nm.value="";
		}
	} else if(srcName == "cne_cd"){
		if (!ComIsNull(srcValue)){
			searchTlCustInfo(formObj, ComGetObjValue(formObj.cne_cd),"cne_cd");
		} else {
			formObj.cne_nm.value="";
		}
	} else if(srcName == "pol"){
		if (!ComIsNull(srcValue)){
			searchLocNm(formObj, ComGetObjValue(formObj.pol),"pol");
		} else {
			formObj.pol_nm.value="";
		}
	} else if(srcName == "pod"){
		if (!ComIsNull(srcValue)){
			searchLocNm(formObj, ComGetObjValue(formObj.pod),"pod");
		} else {
			formObj.pod_nm.value="";
		}
	} else if(srcName == "del"){
		if (!ComIsNull(srcValue)){
			searchLocNm(formObj, ComGetObjValue(formObj.del),"del");
		} else {
			formObj.del_nm.value="";
		}
	} else if(srcName == "mvsl_cd"){
		if (!ComIsNull(srcValue)){
			searchVslNm(formObj, ComGetObjValue(formObj.mvsl_cd));
		} else {
			formObj.mvsl_nm.value="";
		}
	}
}
function searchTlCtrtInfo(){
//	$.ajax({
//		url : "searchTlCtrtInfo.clt?"+"ctrt_no="+ctrt_no,
//		success : function(result) {
//			resultTlCtrtInfo(result.xml,col_nm);
//		}
//	});
	var formObj=document.form;
	ajaxSendPost(resultTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}
function resultTlCtrtInfo(reqVal){
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
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
	
}
function searchTlCustInfo(col_nm){
//	$.ajax({
//		url : "searchTlCustInfo.clt?"+"cust_cd="+cust_cd,
//		success : function(result) {
//			resultTlCustInfo(result.xml,col_nm);
//		}
//	});
	var formObj=document.form;
	col = col_nm
	if(col == 'carrier_cd')
	{
		ajaxSendPost(resultTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.carrier_cd.value.toUpperCase(), './GateServlet.gsl');
	}
	if(col == 'shp_cd')
	{
		ajaxSendPost(resultTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.shp_cd.value.toUpperCase(), './GateServlet.gsl');
	}
	if(col == 'cne_cd')
	{
		ajaxSendPost(resultTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.cne_cd.value.toUpperCase(), './GateServlet.gsl');
	}
}
function resultTlCustInfo (reqVal){
	var formObj=document.form;
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    if ( col == "carrier_cd"){
			formObj.carrier_nm.value=rtnArr[0];
		} else if( col == "shp_cd"){
			formObj.shp_nm.value=rtnArr[0];
		} else if( col == "cne_cd"){ 
			formObj.cne_nm.value=rtnArr[0];
		}
	   }
	   else{
		   if ( col == "carrier_cd"){
				formObj.carrier_cd.value="";
				formObj.carrier_nm.value="";
			} else if( col == "shp_cd"){
				formObj.shp_cd.value="";
				formObj.shp_nm.value="";
			} else if( col == "cne_cd"){ 
				formObj.cne_cd.value="";
				formObj.cne_nm.value="";
			}
	   }
	  }
	  else{
		  if ( col == "carrier_cd"){
				formObj.carrier_cd.value="";
				formObj.carrier_nm.value="";
			} else if( col == "shp_cd"){
				formObj.shp_cd.value="";
				formObj.shp_nm.value="";
			} else if( col == "cne_cd"){ 
				formObj.cne_cd.value="";
				formObj.cne_nm.value="";
			}
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
var col;
function searchLocNm(col_nm){
//	$.ajax({
//		url : "searchTlLocInfo.clt?"+"loc_cd="+loc_cd,
//		success : function(result) {
//			resultLocNm(result.xml,col_nm);
//		}
//	});
	col = col_nm;
	var formObj=document.form;
	if(col == 'pol')
		{
			ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.pol.value.toUpperCase(), './GateServlet.gsl');
		}
	if(col == 'pod')
	{
		ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.pod.value.toUpperCase(), './GateServlet.gsl');
	}
	if(col == 'del')
	{
		ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.del.value.toUpperCase(), './GateServlet.gsl');
	}
	
}
function resultLocNm (reqVal){
	var formObj=document.form;
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   if(col == "pol"){
			   	formObj.pol_nm.value=rtnArr[0];
			} else if(col == "pod"){
				formObj.pod_nm.value=rtnArr[0];
			} else if(col == "del"){
				formObj.del_nm.value=rtnArr[0];
			}
	   }
	   else{
		   if(col == "pol"){
			   	formObj.pol.value="";
			   	formObj.pol_nm.value="";
			} else if(col == "pod"){
				formObj.pod.value="";
				formObj.pod_nm.value="";
			} else if(col == "del"){
				formObj.del.value="";
				formObj.del_nm.value="";
			}
	  }
	  }
	  else{
		  if(col == "pol"){
			   	formObj.pol_nm.value="";
			} else if(col == "pod"){
				formObj.pod_nm.value="";
			} else if(col == "del"){
				formObj.del_nm.value="";
			}
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
		 if(col == "pol"){
				formObj.pol.focus();
			} else if(col == "pod"){
				formObj.pod.focus();
			} else if(col == "del"){
				formObj.del.focus();
			}
	 }
	
}
function searchVslNm(){
	var formObj=document.form;
	ajaxSendPost(resultVslNm, 'reqVal', '&goWhere=aj&bcKey=searchTlVslInfo&code='+formObj.mvsl_cd.value.toUpperCase(), './GateServlet.gsl');
}
function resultVslNm(reqVal) {
	var formObj=document.form;
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.mvsl_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.mvsl_cd.value="";
	    formObj.mvsl_nm.value=""; 
	   }
	  }
	  else{
	   formObj.mvsl_cd.value="";
	   formObj.mvsl_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
//	sheetObj.CheckAll("check")  = 1 ;
}
