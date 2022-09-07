/*--=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : WHCreateMultiItemPopup.js
 *@FileTitle  : Pack Unit definition Popup
 *@author     : TinLuong - DOU Network
 *@version    : 1.0
 *@since      : 2015/04/22
 =========================================================--*/

var docObjects=new Array();
var sheetCnt=0;

var rtnary = new Array(1);
var row_fail = new Array();
var callBackFunc = "";

var WMS_QTY_FORMAT  = "Integer";  //QTY  InitDataProperty에서 사용
var WMS_QTY_FORMAT2 = "Integer";//QTY  InitDataProperty2에서 사용
var WMS_QTY_POINT = 0;            //QTY
var WMS_CBM_POINT = 3;            //CBM, GWT, NWT
var WMS_KGS_POINT = 5;            //KGS, GWT, NWT
var MST_CBM_POINT = 5;            //CBM, CBF
var MST_KGS_POINT = 5;            //KGS, GWT, NWT
var prefix="Grd03";
var ut_std_chg =  1;
var wgt_std_chg =  1;
var chkDupCnt_item="";
var opener = opener;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
/**
 * Button Active
 * @param srcName
 */
function doWork(srcName){
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
		case "SAVE":
			btn_Save();
			break;
		case "CLOSE":   
			ComClosePopup();
			break;
		case "UPLOAD_EXEL":   
			sheet1.LoadExcel({ Mode : "NoHeader ",    StartRow: "3"});
			break;
		case "ROW_ADD":   
			var insertRow=sheet1.DataInsert(-1);
			sheet1.SetCellEditable(insertRow,prefix+"item_cd", 1);
			sheet1.SetCellValue(insertRow,prefix+"pkg_lv1_qty", 1);
			sheet1.SetCellValue(insertRow, prefix+"ctrt_no",ComGetObjValue(formObj.ctrt_no),0);
			break;
		case "ROW_DEL":   
			row_del();
			break;
		case "VERIFY":   
			btn_verify();
			break;
		case "TEMPATE_DOWNLOAD":   
			excel_Download();
			break;
		case "ROW_VOL":   
			btn_vol();
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
 * 엑셀에서 데이터 LOAD시
 */
function sheet1_OnLoadExcel(result){
	var formObj=document.form;
	var sheetObj=docObjects[0];
    //var sheetObj2=docObjects[1];
    
	btn_control();  
	
    if(sheetObj.RowCount()<= 1){
    	return;
    }
    
    for(var i=2; i<=sheetObj.LastRow();i++){
    	//console.log("start i:"+i);
    	sheetObj.SetCellValue(i , prefix+"item_cd"      , sheetObj.GetCellValue(i, prefix+"item_cd").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , prefix+"item_nm"      , sheetObj.GetCellValue(i, prefix+"item_nm").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , prefix+"hts_no" , sheetObj.GetCellValue(i, prefix+"hts_no").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , prefix+"item_grp_cd" , sheetObj.GetCellValue(i, prefix+"item_grp_cd").toUpperCase() ,0);
    	
    	sheetObj.SetCellValue(i , prefix+"pkg_lv1_unit_cd" , sheetObj.GetCellValue(i, prefix+"pkg_lv1_unit_cd").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , prefix+"item_pkgunit" , sheetObj.GetCellValue(i, prefix+"item_pkgunit").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , prefix+"pkg_lv3_unit_cd" , sheetObj.GetCellValue(i, prefix+"pkg_lv3_unit_cd").toUpperCase() ,0);
    	sheetObj.SetCellValue(i , prefix+"pkg_lv4_unit_cd" , sheetObj.GetCellValue(i, prefix+"pkg_lv4_unit_cd").toUpperCase() ,0);
    	
    	// Qty는 항상 1로 셋팅
    	sheetObj.SetCellValue(i , prefix+"pkg_lv1_qty" , "1" ,0);
    	//console.log("end i:"+i);
    }
}

/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
}

var rowTotal , colTotal;

function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	// Pack Unit Define 대상
	if (formObj.ctrt_no.value != "") {
		sheet1.RemoveAll();
		//setSelectPackDefine();
	}	
	if(h_ut_tp_cd =="CM"){
		// 센치
		ut_std_chg = 0.01;
	}else if(h_ut_tp_cd=="INCH"){
		//Inch
		ut_std_chg  = 0.0254;
		wgt_std_chg = 2.54;
	}
	ComBtnDisable("btnSave");
	ComBtnDisable("btn_row_vol");
}
/**
 * 
 * @param sheetObj
 * @param sheetNo
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with(sheetObj){
	        
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHCreateMultiItemPopup_HDR1'), Align:"Center"},
	                      { Text:getLabel('WHCreateMultiItemPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ 
				 {Type:"CheckBox",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk" },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"PopupEdit", Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"hts_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
	             {Type:"PopupEdit", Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_grp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },

	             {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkg_lv1_unit_cd", KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	             {Type:"Int",      	Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
	             {Type:"Int",      	Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_inr_qty", KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_length",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_width",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_height",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },

	             {Type:"PopupEdit", Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	             {Type:"Int",       Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgbaseqty", KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_length",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_width",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_height",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_kgs",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },

	             {Type:"Combo",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkg_lv3_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	             {Type:"Int",       Hidden:0,  Width:45,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv3_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_length",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_width",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_height",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_LEN_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_cbm",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_cbf",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_grs_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_grs_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_net_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv3_net_lbs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_WGT_POINT_COUNT,	 UpdateEdit:1,   InsertEdit:1,   EditLen:15 },

	             {Type:"PopupEdit", Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pkg_lv4_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5  },
	             {Type:"Int",       Hidden:1,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv4_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"alter_item_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	             {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"barcode_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	             {Type:"Int",       Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"safe_stc_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
	             {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:prefix+"user_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Status",    Hidden:1,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" }];
	       
	      InitColumns(cols);
		  SetSheetHeight(380);//380
	      SetEditable(1);
//	      SetColProperty(0 ,prefix+"item_cd" , {AcceptKeys:"E|[0123456789][()_-+.&/@#!%^*$~` ]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_cd" , {AcceptKeys:"E|[0123456789]" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_nm" , {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"pkg_lv1_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"hts_no" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_grp_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
//	      SetColProperty(0 ,prefix+"pkg_lv3_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"pkg_lv4_unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"pkg_lv1_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"pkg_lv3_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"pkg_lv4_qty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix+"item_pkgbaseqty" , {AcceptKeys:"[0123456789]" , InputCaseSensitive:1});
	      
	      SetColProperty(prefix+"pkg_lv3_unit_cd", {ComboText:"|" + lic_plat_ut_listNm, ComboCode:"|" + lic_plat_ut_listCd} );
	      }
	      break;
	}
}
/**
 * Pack Unit Define 대상
 */
function setSelectPackDefine() {	
	var formObj=document.form;
	//var openerformObj=parent.window.document.form;	
	var insertRow="";
	var prefix="Grd01";	
	var prefix="Grd03";
	
	var openerSheetObj=opener.docObjects[2];	
	var sheetObj=docObjects[0];
	var chkDupCnt=0;	
	// W/H In Booking 화면에서 Unit Code를 미입력한 데이터 중 중복 제거한 Item Code List만 Popup 대상
	for (var i=openerSheetObj.HeaderRows(); i<=openerSheetObj.LastRow()-1; i++) {
		chkDupCnt=0;
		for (var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow(); j++) {
				if (openerSheetObj.GetCellValue(i, prefix + "item_cd") == sheetObj.GetCellValue(j, prefix + "item_cd")) {
						if (openerSheetObj.GetCellValue(i, prefix + "item_sys_no") == sheetObj.GetCellValue(j, prefix + "item_sys_no")) {
								chkDupCnt++;
				}
			}
		}
		if (chkDupCnt == 0) {
			
				if (ComIsNull(openerSheetObj.GetCellValue(i, prefix+"item_sys_no")) || ComIsNull(openerSheetObj.GetCellValue(i, prefix+"item_pkgunit"))) {
					insertRow=sheetObj.DataInsert(-1);
					
					rowTotal = insertRow;
					
					sheetObj.SetCellValue(insertRow, prefix+"item_cd",openerSheetObj.GetCellValue(i, prefix+"item_cd"),0);
					sheetObj.SetCellValue(insertRow, prefix+"item_nm",openerSheetObj.GetCellValue(i, prefix+"item_nm"),0);
					sheetObj.SetCellValue(insertRow, prefix+"ctrt_no",ComGetObjValue(formObj.ctrt_no),0);
					sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty",1,0);// 패키지 Level1 수량
								/*
				if (!ComIsNull(openerSheetObj.GetCellValue(i, prefix+"item_sys_no"))) {
				sheetObj.SetCellValue(insertRow, prefix+"item_nm",openerSheetObj.GetCellValue(i, prefix+"item_nm"),0);
									sheetObj.SetCellValue(insertRow, prefix+"ctrt_no",ComGetObjValue(formObj.ctrt_no),0);
				sheetObj.SetCellValue(insertRow, prefix+"item_sys_no",openerSheetObj.GetCellValue(i, prefix+"item_sys_no"),0);
								}
								*/
					setPackDefineInfo(sheetObj, insertRow, "", openerSheetObj.GetCellValue(i, prefix+"item_sys_no"));
						}
			}
	  }
}
/**
 * Booking Item 팝업 클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet1_OnPopupClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd03";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"pkg_lv1_unit_cd") ) {
			
			callBackFunc = "setPkgLv1unitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");
			
		} else if (colName == (prefix+"item_pkgunit") ) {
			
			callBackFunc = "setPkgunitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");
		    
		} else if (colName == (prefix+"pkg_lv3_unit_cd") ) {
			
			callBackFunc = "setPkgLv3unitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");
			
		} else if (colName == (prefix+"pkg_lv4_unit_cd") ) {
			
			callBackFunc = "setPkgLv4unitGrid";
		    modal_center_open('./CommonCodePopup.clt?grp_cd=A6&code=' + colValue, callBackFunc, 400, 520,"yes");
		    
		}else if (colName == (prefix+"hts_no") ) {
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[1]=colValue;
			callBackFunc = "setresultHTSInfo";
			modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
		}else if (colName == (prefix+"item_grp_cd") ) {
			var formObj=document.form;
			if(formObj.ctrt_no.value == ""){
				ComShowCodeMessage("COM0082", "Contract No");
				formObj.ctrt_no.focus();
				return;
			}
			var params = "ItemGroupPopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&grp_cd=" + sheet1.GetCellValue(Row, Col, prefix+"item_grp_cd");
		    callBackFunc = "setItemGroupCode";
		    modal_center_open(params, callBackFunc, 700, 470,"yes");
		}	
	}
}
/**
 * 패키지 Level1 Unit Code
 * @param aryPopupData
 */
function setPkgLv1unitGrid(rtnVal) {
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"pkg_lv1_unit_cd",rtnValAry[1]);
	}
}
/**
 * 패키지 Level2 Unit Code
 * @param aryPopupData
 */
function setPkgunitGrid(rtnVal) {

	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"item_pkgunit",rtnValAry[1]);
	}
}
/**
 * 패키지 Level3 Unit Code
 * @param aryPopupData
 */
function setPkgLv3unitGrid(rtnVal) {
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"pkg_lv3_unit_cd",rtnValAry[1]);
	}
}
/**
 * 패키지 Level4 Unit Code
 * @param aryPopupData
 */
function setPkgLv4unitGrid(rtnVal) {
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"pkg_lv4_unit_cd",rtnValAry[1]);
	}
}
/**
 * Get HST value
 * @param rtnVal
 */
function setresultHTSInfo(rtnVal) {
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		var prefix="Grd03";
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"hts_no",rtnValAry[0]);
	}
}

var RowTest , ColTest;
/**
 * 
 * @param reqVal
 * @param sheetObj
 */
function setIbCommonCodeInfo(reqVal, sheetObj){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  ColTest, rtnArr[0],0);
		}
		else{
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  ColTest, "",0);
		}
	}
}
/**
 * Set Item Group Code
 * @param rtnVal
 */
function setItemGroupCode(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheet1.SetCellValue(sheet1.GetSelectRow(), prefix+"item_grp_cd",rtnValAry[0]);//full_nm
	}
}
/**
 * 
 * @param sheetObj
 * @param Row
 * @param Col
 * @param Value
 */
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	var formObj=document.form;
	var prefix="Grd03";
	var colName=sheetObj.ColSaveName(Col);
	
	btn_control();
	
	RowTest = Row;
	ColTest = Col;
	
	if (colName == (prefix+"pkg_lv1_unit_cd") && Value != "") {
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+ Value, './GateServlet.gsl');
		
	} else if (colName == (prefix+"item_pkgunit") && Value != "") {
		var sParam="grp_cd=A6&code_cd="+Value;		
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+Value, './GateServlet.gsl');
		
		
	} else if (colName == (prefix+"pkg_lv3_unit_cd") && Value != "") {
		// License Plate로 변경
//		var sParam="grp_cd=A6&code_cd="+Value;
//		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+Value, './GateServlet.gsl');
		
	} else if (colName == (prefix+"pkg_lv4_unit_cd") && Value != "") {
		
		var sParam="grp_cd=A6&code_cd="+Value;
		ajaxSendPost(setIbCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+Value, './GateServlet.gsl');
	}else if  (colName  == (prefix+"item_cd") && Value != ""){
		
		var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(Value);
		ajaxSendPost(result_sheet1_OnChange, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
	}else if  (colName  == (prefix+"hts_no") && Value != ""){
		
		ajaxSendPost(resultHTSInfo, Row, '&goWhere=aj&bcKey=searchCodeName&codeType=commodity&s_code='+Value, './GateServlet.gsl');
	}else if  (colName  == (prefix+"item_grp_cd") && Value != ""){
		
		var sParam="in_ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&in_grp_cd="+Value;
		ajaxSendPost(resultItemGroup, Row,'&goWhere=aj&bcKey=searchItemGroup&'+sParam, './GateServlet.gsl');
	}
		//level 1
	else if (colName  == (prefix+"lv1_width") || colName  == (prefix+"lv1_length") || colName  == (prefix+"lv1_height")){
		
        var length = sheet1.GetCellValue(Row, prefix+"lv1_length") ? sheet1.GetCellValue(Row, prefix+"lv1_length") : 0;
        var width  = sheet1.GetCellValue(Row, prefix+"lv1_width")  ? sheet1.GetCellValue(Row, prefix+"lv1_width")  : 0;
        var height = sheet1.GetCellValue(Row, prefix+"lv1_height") ? sheet1.GetCellValue(Row, prefix+"lv1_height") : 0;
        var pcs = 1;//form.pkg_lv1_qty.value ? form.pkg_lv1_qty.value : 0;
        var cbm=0;
        var kg=0;
        var sumCbm=0;

        //#2927 [LOA WMS4.0] ITEM CBM CALCULATION
        //kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
        //cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
        if(h_ut_tp_cd == "CM") {
			cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
		} else if(h_ut_tp_cd == "INCH") {
			cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
		}
		kg = unitConvertValue("CBM_WGT", cbm);

        sheet1.SetCellValue(Row, prefix+"lv1_grs_kgs", kg);
        //sheet1.SetCellValue(Row, prefix+"lv1_grs_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
        sheet1.SetCellValue(Row, prefix+"lv1_grs_lbs", unitConvertValue("KG_LB", kg));
        sheet1.SetCellValue(Row, prefix+"lv1_net_kgs", kg);
        //sheet1.SetCellValue(Row, prefix+"lv1_net_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
        sheet1.SetCellValue(Row, prefix+"lv1_net_lbs", unitConvertValue("KG_LB", kg));
        sheet1.SetCellValue(Row, prefix+"lv1_cbm", cbm);
        //sheet1.SetCellValue(Row, prefix+"lv1_cbf", roundXL(cbm * CNVT_CNST_CBM_CFT, 5));
        sheet1.SetCellValue(Row, prefix+"lv1_cbf", unitConvertValue("CBM_CBF", cbm));

	}   //level 2
	else if (colName  == (prefix+"item_width") || colName  == (prefix+"item_length") || colName  == (prefix+"item_height")){
		
        var length = sheet1.GetCellValue(Row, prefix+"item_length") ? sheet1.GetCellValue(Row, prefix+"item_length") : 0;
        var width  = sheet1.GetCellValue(Row, prefix+"item_width")  ? sheet1.GetCellValue(Row, prefix+"item_width")  : 0;
        var height = sheet1.GetCellValue(Row, prefix+"item_height") ? sheet1.GetCellValue(Row, prefix+"item_height") : 0;
        var pcs = 1;//form.pkg_item_qty.value ? form.pkg_item_qty.value : 0;
        var cbm=0;
        var kg=0;
        var sumCbm=0;

        //#2927 [LOA WMS4.0] ITEM CBM CALCULATION
        //kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
        //cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
        if(h_ut_tp_cd == "CM") {
			cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
		} else if(h_ut_tp_cd == "INCH") {
			cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
		}
		kg = unitConvertValue("CBM_WGT", cbm);

        sheet1.SetCellValue(Row, prefix+"item_kgs", kg);
        //sheet1.SetCellValue(Row, prefix+"item_grs_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
        sheet1.SetCellValue(Row, prefix+"item_grs_lbs", unitConvertValue("KG_LB", kg));
        sheet1.SetCellValue(Row, prefix+"item_net_wgt", kg);
        //sheet1.SetCellValue(Row, prefix+"item_net_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
        sheet1.SetCellValue(Row, prefix+"item_net_lbs", unitConvertValue("KG_LB", kg));
        sheet1.SetCellValue(Row, prefix+"item_cbm", cbm);
        //sheet1.SetCellValue(Row, prefix+"item_cbf", roundXL(cbm * CNVT_CNST_CBM_CFT, 5));
        sheet1.SetCellValue(Row, prefix+"item_cbf", unitConvertValue("CBM_CBF", cbm));
        
	}//level 3
	else if (colName  == (prefix+"lv3_width") || colName  == (prefix+"lv3_length") || colName  == (prefix+"lv3_height")){
		
        var length = sheet1.GetCellValue(Row, prefix+"lv3_length") ? sheet1.GetCellValue(Row, prefix+"lv3_length") : 0;
        var width  = sheet1.GetCellValue(Row, prefix+"lv3_width")  ? sheet1.GetCellValue(Row, prefix+"lv3_width")  : 0;
        var height = sheet1.GetCellValue(Row, prefix+"lv3_height") ? sheet1.GetCellValue(Row, prefix+"lv3_height") : 0;
        var pcs = 1;//form.pkg_lv3_qty.value ? form.pkg_lv3_qty.value : 0;
        var cbm=0;
        var kg=0;
        var sumCbm=0;

        //#2927 [LOA WMS4.0] ITEM CBM CALCULATION
        //kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
        //cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
        if(h_ut_tp_cd == "CM") {
			cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
		} else if(h_ut_tp_cd == "INCH") {
			cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
		}
		kg = unitConvertValue("CBM_WGT", cbm);

		sheet1.SetCellValue(Row, prefix+"lv3_grs_kgs", kg);
        //sheet1.SetCellValue(Row, prefix+"lv3_grs_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
        sheet1.SetCellValue(Row, prefix+"lv3_grs_lbs", unitConvertValue("KG_LB", kg));
        sheet1.SetCellValue(Row, prefix+"lv3_net_kgs", kg);
        //sheet1.SetCellValue(Row, prefix+"lv3_net_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
        sheet1.SetCellValue(Row, prefix+"lv3_net_lbs", unitConvertValue("KG_LB", kg));
        sheet1.SetCellValue(Row, prefix+"lv3_cbm", cbm);
        //sheet1.SetCellValue(Row, prefix+"lv3_cbf", roundXL(cbm * CNVT_CNST_CBM_CFT, 5));
        sheet1.SetCellValue(Row, prefix+"lv3_cbf", unitConvertValue("CBM_CBF", cbm));
        
	}
//	else if(colName  == (prefix + "lv1_grs_kgs")){
//		sheet1.SetCellValue(Row, prefix+"lv1_grs_lbs", roundXL(Value * CNVT_CNST_KG_LB, 5));
//	}else if(colName == (prefix + "lv1_grs_lbs")){
//		sheet1.SetCellValue(Row, prefix+"lv1_grs_kgs", roundXL(Value * CNVT_CNST_KG_LB, 5));
//	}else if(colName == (prefix + "lv1_cbm")){
//		sheet1.SetCellValue(Row, prefix+"lv1_cbf", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "lv1_cbf")){
//		sheet1.SetCellValue(Row, prefix+"lv1_cbm", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "lv1_net_kgs")){
//		sheet1.SetCellValue(Row, prefix+"lv1_net_lbs", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "lv1_net_lbs")){
//		sheet1.SetCellValue(Row, prefix+"lv1_net_kgs", roundXL(Value * 35.3147, 5));
//	}//level 2
//	else if(colName  == (prefix + "item_grs_kgs")){
//		sheet1.SetCellValue(Row, prefix+"item_grs_lbs", roundXL(Value * CNVT_CNST_KG_LB, 5));
//	}else if(colName == (prefix + "item_grs_lbs")){
//		sheet1.SetCellValue(Row, prefix+"item_grs_kgs", roundXL(Value * CNVT_CNST_KG_LB, 5));
//	}else if(colName == (prefix + "item_cbm")){
//		sheet1.SetCellValue(Row, prefix+"item_cbf", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "item_cbf")){
//		sheet1.SetCellValue(Row, prefix+"item_cbm", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "item_net_kgs")){
//		sheet1.SetCellValue(Row, prefix+"item_net_lbs", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "item_net_lbs")){
//		sheet1.SetCellValue(Row, prefix+"item_net_kgs", roundXL(Value * 35.3147, 5));
//	}
//	//level 3
//	else if(colName  == (prefix + "lv3_grs_kgs")){
//		sheet1.SetCellValue(Row, prefix+"lv3_grs_lbs", roundXL(Value * CNVT_CNST_KG_LB, 5));
//	}else if(colName == (prefix + "lv3_grs_lbs")){
//		sheet1.SetCellValue(Row, prefix+"lv3_grs_kgs", roundXL(Value * CNVT_CNST_KG_LB, 5));
//	}else if(colName == (prefix + "lv3_cbm")){
//		sheet1.SetCellValue(Row, prefix+"lv3_cbf", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "lv3_cbf")){
//		sheet1.SetCellValue(Row, prefix+"lv3_cbm", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "lv3_net_kgs")){
//		sheet1.SetCellValue(Row, prefix+"lv3_net_lbs", roundXL(Value * 35.3147, 5));
//	}else if(colName == (prefix + "lv3_net_lbs")){
//		sheet1.SetCellValue(Row, prefix+"lv3_net_kgs", roundXL(Value * 35.3147, 5));
//	}
}
/**
 * 
 * @param reqVal
 * @param Row
 */
function result_sheet1_OnChange (reqVal, Row) {
var doc=getAjaxMsgXML(reqVal);
var formObj=document.form;
var sheetObj = sheet1;
if(doc[0]=='OK'){
 if(typeof(doc[1])!='undefined'){
  //조회해온 결과를 Parent에 표시함
  var rtnArr=doc[1].split('^@');
  var masterVals=rtnArr[0].split('@@^');
  if(rtnArr[0] != ""){
	  if(sheet1.GetCellValue(Row, prefix+"item_cd") == masterVals[2]){
		  sheetObj.SetCellValue(Row, prefix+"item_nm","",0);
		  sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
	  }
  	}
   }
  }
}
/**
 * 
 * @param reqVal
 * @param row	
 */
function resultHTSInfo(reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(Row, prefix+"hts_no",masterVals[0],0);
			}
			else{
				sheetObj.SetCellValue(Row, prefix+"hts_no","",0);
			}
		}
		else{
			sheetObj.SetCellValue(Row, prefix+"hts_no","",0);
		}
	}
}
/**
 * 
 * @param reqVal
 */
function resultItemGroup(reqVal, Row){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(Row, prefix+"item_grp_cd",rtnArr[0],0);
			}
			else{
				sheetObj.SetCellValue(Row, prefix+"item_grp_cd","",0);
			}
		}
		else{
			sheetObj.SetCellValue(Row, prefix+"item_grp_cd","",0);
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
/**
 * Item Master 기본 정보 조회
 * @param sheetObj
 * @param Row
 * @param Col rowTotal
 */
function setPackDefineInfo(sheetObj, Row, Col, item_sys_no) {
	var formObj=document.form;	
	var prefix="Grd03";
	var Value="&item_cd=" + encodeURIComponent(sheetObj.GetCellValue(Row, prefix + "item_cd").trim());
	if(item_sys_no.trim() != "")
	{
		Value += "&item_sys_no=" + item_sys_no;
	}else{
		Value += "&item_sys_no=";
	}
	var sParam="ctrt_no=" + formObj.ctrt_no.value + Value;
	
	ajaxSendPost(searchWHItemCodeInfo, 'reqVal' , '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
	
}
/**
 * 
 * @param reqVal
 */
function searchWHItemCodeInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		var prefix="Grd03";
		var Row = rowTotal;
		
		sheetObj = sheet1;
		
		if(rtnArr[0] != "")
		{
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0]);
			sheetObj.SetCellValue(Row, prefix+"ctrt_no",rtnArr[1]);
			sheetObj.SetCellValue(Row, prefix+"item_cd",rtnArr[2]);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5]);
			sheetObj.SetCellValue(Row, prefix+"item_pkgunit",rtnArr[6]);
			sheetObj.SetCellValue(Row, prefix+"item_pkgbaseqty",rtnArr[7]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10]);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11]);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12]);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13]);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14]);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15]);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16]);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17]);
//				if (getXmlDataNullToNullString(result.xml,'exception_msg')!="") {
//					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
//					sheetObj.SelectCell(Row,  Col);
//				}			
			// Item Sys No 존재시 해당 Item Master 정보를 보여주고, 기 등록된 데이터는 수정불가 (회색표시)
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
			}		
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"pkg_lv1_unit_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv1_unit_cd",0);
			}		
			if (sheetObj.GetCellValue(Row, prefix+"pkg_lv1_qty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv1_qty",0);
			}		
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_pkgunit"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_pkgunit",0);
			}		
			if (sheetObj.GetCellValue(Row, prefix+"item_pkgbaseqty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"item_pkgbaseqty",0);
			}
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"pkg_lv3_unit_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv3_unit_cd",0);
			}		
			if (sheetObj.GetCellValue(Row, prefix+"pkg_lv3_qty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv3_qty",0);
			}		
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"pkg_lv4_unit_cd"))) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv4_unit_cd",0);
			}		
			if (sheetObj.GetCellValue(Row, prefix+"pkg_lv4_qty") != 0) {
				sheetObj.SetCellEditable(Row, prefix+"pkg_lv4_qty",0);
			}
			// item sys no 존재시 CBM CBF G.WGT G.LBS N.WGT N.LBS 수정 불가
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_sys_no"))) {
				sheetObj.SetCellEditable(Row, prefix+"lv1_cbm",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_cbf",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_grs_kgs",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_grs_lbs",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_net_kgs",0);
				sheetObj.SetCellEditable(Row, prefix+"lv1_net_lbs",0);
			}
		}
	}
}
function btn_control(){
	ComBtnDisable("btnSave");
}
/**
 * Verify Item
 */
function btn_verify(){
	var formObj=document.form;
	var sheetObj = sheet1;
	if(formObj.ctrt_no.value == ""){
		ComShowMessage("Please enter Contract No.");
		return;
	}
	if(sheet1.RowCount() < 1){
		ComShowMessage("Please add row/upload data.");
		return;
	}
	
	var unit_val="";
	var hts_val="";
	var group_val="";
	var param_item_val="";
	var item_val="";
	
    var cnt_unit=0;
    var cnt_hts=0;
    var cnt_group=0;
    var cnt_param_itemt=0;
    
    var cTemp = "";
    for(var i=2; i<=sheetObj.LastRow();i++){
    	var item_cd = sheet1.GetCellValue(i, prefix+"item_cd");
		var item_nm = sheet1.GetCellValue(i, prefix+"item_nm");
		var pkg_lv1_unit_cd = sheet1.GetCellValue(i, prefix+"pkg_lv1_unit_cd");
    	var pkg_lv1_inr_qty = sheet1.GetCellValue(i, prefix+"pkg_lv1_inr_qty");
    	
		if(item_cd == ""){
			ComShowMessage("Please check [Item Code].");
			sheet1.SelectCell(i, prefix+"item_cd");
			return;
		}
		if(item_nm == ""){
			ComShowMessage("Please check [Item Name].");
			sheet1.SelectCell(i, prefix+"item_nm");
			return;
		}
		if(pkg_lv1_unit_cd == ""){
			ComShowMessage("Please check [Unit Code].");
			sheet1.SelectCell(i, prefix+"pkg_lv1_unit_cd");
			return;
		}
		if (Number(pkg_lv1_inr_qty) == 0 || ComIsEmpty(pkg_lv1_inr_qty)) {
			ComShowMessage("Please check [Inner Qty].");
			sheet1.SelectCell(i, prefix+"pkg_lv1_inr_qty");
			return;
		}
		
		if(ComGetLenByByte(item_cd) > 20){
			ComShowCodeMessage("COM0215", "Item Code[20]");
			$("#seal_no0").focus();
			return;
		}
		if(ComGetLenByByte(item_nm) > 100){
			ComShowCodeMessage("COM0215", "Item Name[100]");
			$("#seal_no0").focus();
			return;
		}
		
    	//unit coode level_1
    	cTemp = sheetObj.GetCellValue(i, prefix + "pkg_lv1_unit_cd");
    	if(cTemp != ""){
    		if(cnt_unit != 0){
        		unit_val += ",";
    	    }
    		unit_val += cTemp;
    	    cnt_unit++;
    	}
    	//unit coode level_2
    	cTemp = sheetObj.GetCellValue(i, prefix + "item_pkgunit");
    	if(cTemp != ""){
    		if(cnt_unit != 0){
        		unit_val += ",";
    	    }
    		unit_val += cTemp;
    	    cnt_unit++;
    	}
    	// License Plate로 변경
    	//unit coode level_3
    	var lpNo = sheetObj.GetCellValue(i, prefix + "pkg_lv3_unit_cd");
    	var lpNo_qty = sheetObj.GetCellValue(i, prefix + "pkg_lv3_qty");
    	
    	if (Number(lpNo_qty) > 0 && ComIsEmpty(lpNo)) {
			ComShowCodeMessage("COM0082","Level 3 Package Unit");
			sheetObj.SelectCell(i, prefix +  "pkg_lv3_unit_cd");
			return false;
    	}
	
//    	cTemp = sheetObj.GetCellValue(i, prefix + "pkg_lv3_unit_cd");
//    	if(cTemp != ""){
//    		if(cnt_unit != 0){
//        		unit_val += ",";
//    	    }
//    		unit_val += cTemp;
//    	    cnt_unit++;
//    	}
    	//unit coode level_4
//    	cTemp = sheetObj.GetCellValue(i, prefix + "pkg_lv4_unit_cd");
//    	if(cTemp != ""){
//    		if(cnt_unit != 0){
//        		unit_val += ",";
//    	    }
//    		unit_val += cTemp;
//    	    cnt_unit++;
//    	}
	    
	    //hts coode
    	cTemp = sheetObj.GetCellValue(i, prefix + "hts_no");
    	if(cTemp != ""){
    		if(cnt_hts != 0){
        		hts_val += ",";
    	    }
    		hts_val += cTemp;
    		cnt_hts++;
    	}
	    
	    //group coode
    	cTemp = sheetObj.GetCellValue(i, prefix + "item_grp_cd");
    	if(cTemp != ""){
    		if(cnt_group != 0){
        		group_val += ",";
    	    }
    		group_val += cTemp;
    		cnt_group++;
    	}
	    
	    //item code
	    cTemp = sheetObj.GetCellValue(i, prefix + "item_cd");
	    if(cTemp != ""){
	    	if(cnt_param_itemt != 0){
		    	param_item_val += ",";
		    }
	    	param_item_val += cTemp;
	    	cnt_param_itemt++;
	    }
	    
		// #1811 [WMS4.0]Item Code 특수문자 허용
	    var regexp = WMS_OTHER_CHAR_JS_REGEXP; // 숫자,영문,특수문자
	    var text = item_cd;
	    // var regexp = /[0-9]/; // 숫자만
	    // var regexp = /[a-zA-Z]/; // 영문만
		for( var ii=0; ii<text.length; ii++){
			if(text.charAt(ii) != " " && regexp.test(text.charAt(ii)) == false ){
				ComShowCodeMessage("COM12129","Item Code(" + text.charAt(ii) + ")");
				sheetObj.SelectCell(i, prefix+"item_cd");
				return;
			}
		}  
		text = item_nm;
		// var regexp = /[0-9]/; // 숫자만
		// var regexp = /[a-zA-Z]/; // 영문만
		for( var ii=0; ii<text.length; ii++){
			if(text.charAt(ii) != " " && regexp.test(text.charAt(ii)) == false ){
				ComShowCodeMessage("COM12129","Item Name(" + text.charAt(ii) + ")");
				sheetObj.SelectCell(i, prefix+"item_nm");
				return;
			}
		} 
    }
    	  
    //if(cnt==0){
	//   alert(getLabel('FMS_COM_ALT004'));
	//   return;
    //}    
    formObj.f_unit_val.value=unit_val;
    formObj.f_hts_val.value=hts_val;
    formObj.f_group_val.value=group_val;
    formObj.f_param_item_val.value=param_item_val;
    formObj.f_item_vall.value=item_val;
	    
	doShowProcess();
	setTimeout(function(){
		try {
		formObj.f_cmd.value = SEARCH01;
	    
		var sXml=sheetObj.GetSearchData("./verifyCreateMultiItemPopupGS.clt", FormQueryString(formObj,null, ""));
	    var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
	 	var endIndxCheck = sXml.indexOf("</CHECK>");
	 		
	 	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	 	var $xml = $(xmlDoc);
	    if ($xml.find( "listCnt").text() != '0'){
	    //alert($xml.find( "listCnt").text());
			var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
			var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
			var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
			var sheet1Total = getTotalRow(sheet1Data);
			sheet1Data = getData(sheet1Data);
			sheet1Data = sheet1Data.replace(/\n/g,"");
			var rtnValAry1=sheet1Data.split("^**^");
			
			var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
			var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
			var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
			var sheet2Total = getTotalRow(sheet2Data);
			sheet2Data = getData(sheet2Data);
			sheet2Data = sheet2Data.replace(/\n/g,"");
			var rtnValAry2=sheet2Data.split("^**^");
			
			var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
			var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
			var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
			var sheet3Total = getTotalRow(sheet3Data);
			sheet3Data = getData(sheet3Data);
			sheet3Data = sheet3Data.replace(/\n/g,"");
			var rtnValAry3=sheet3Data.split("^**^");
			
			var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
			var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
			var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
			var sheet4Total = getTotalRow(sheet4Data);
			sheet4Data = getData(sheet4Data);
			sheet4Data = sheet4Data.replace(/\n/g,"");
			var rtnValAry4=sheet4Data.split("^**^");
			
			var strtIndxSheet5 = sXml.indexOf("<SHEET5>");
			var endIndxSheet5 = sXml.indexOf("</SHEET5>") + "</SHEET5>".length;
			var sheet5Data = sXml.substring(strtIndxSheet5,endIndxSheet5);
			var sheet5Total = getTotalRow(sheet5Data);
			sheet5Data = getData(sheet5Data);
			sheet5Data = sheet5Data.replace(/\n/g,"");
			var rtnValAry5=sheet5Data.split("^**^");
			
			var VerifyMsg = "";
			//Verify Message Already exists
			for(var k=0; k < sheet5Total; k++){
				//alert(rtnValAry1[k].replace(/\s/g, ""));
				VerifyMsg = VerifyMsg + rtnValAry5[k].replace(/\s/g, "") + " - Item Code duplicate" + "\n"; 
			}
			
			for(var k=0; k < sheet1Total; k++){
				//alert(rtnValAry1[k].replace(/\s/g, ""));
				VerifyMsg = VerifyMsg + rtnValAry1[k].replace(/\s/g, "") + " - Item Code Already exists" + "\n"; 
			}
			
			for(var k=0; k < sheet2Total; k++){
				//alert(rtnValAry2[k].replace(/\s/g, ""));
				VerifyMsg = VerifyMsg + rtnValAry2[k].replace(/\s/g, "") + " - Item Uint Code Mismatch" + "\n";
			}
			
			for(var k=0; k < sheet3Total; k++){
				//alert(rtnValAry3[k].replace(/\s/g, ""));
				VerifyMsg = VerifyMsg + rtnValAry3[k].replace(/\s/g, "") + " - Item HTS Code Mismatch" + "\n";
			}
			
			for(var k=0; k < sheet4Total; k++){
				//alert(rtnValAry4[k].replace(/\s/g, ""));
				VerifyMsg = VerifyMsg + rtnValAry4[k].replace(/\s/g, "") + " - Item Group Code Mismatch" + "\n";
			}
			if(VerifyMsg != ""){
				//VerifyMsg = "Verify Message                                                        ." + "\n\n" + VerifyMsg;
				doHideProcess(false);
				javascript:document.getElementById('VerifyMessageDiv').style.display='';
				document.getElementById('verifyMsgTextArea').value = VerifyMsg;
				/*
				if(VerifyMsg.length > 500){
					VerifyMsg = VerifyMsg.substring(0,500) + "............."
				}
				alert(VerifyMsg);
				*/
				ComBtnDisable("btnSave");
				ComBtnDisable("btn_row_vol");
				return;
			}else{
				doHideProcess(false);
				ComShowMessage("Verify Success.");
				ComBtnEnable("btnSave");
				ComBtnEnable("btn_row_vol");
				return;
			}
			doHideProcess(false);
		}else {
			doHideProcess(false);
			ComShowCodeMessage("COM12224", "");//System Error! \n {?msg1}
		}
	    
	} catch(e) {
		if(e == "[object Error]"){
			//Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
	    }else{
	    	//System Error! + MSG
	    	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
	    }
		doHideProcess(false);
	}	
	},100);	
}
function getTotalRow(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA")[0].getAttribute("TOTAL")
		
}	
function getData(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA").text();
		
}	
function btn_verify_old(){
	var formObj=document.form;
	if(formObj.ctrt_no.value == ""){
		ComShowMessage("Please enter Contract No.");
		return;
	}
	if(sheet1.RowCount() < 1){
		ComShowMessage("Please add row/upload data.");
	}else{
	for(var i = sheet1.HeaderRows(); i < sheet1.LastRow()+ 1; i++){
		var item_cd = sheet1.GetCellValue(i, prefix+"item_cd");
		var item_nm = sheet1.GetCellValue(i, prefix+"item_nm");
		var pkg_lv1_unit_cd = sheet1.GetCellValue(i, prefix+"pkg_lv1_unit_cd");
		if(item_cd == ""){
			ComShowMessage("Please check [Item Code].");
			sheet1.SelectCell(i, prefix+"item_cd");
			return;
		}
		if(item_nm == ""){
			ComShowMessage("Please check [Item Name].");
			sheet1.SelectCell(i, prefix+"item_nm");
			return;
		}
		if(pkg_lv1_unit_cd == ""){
			ComShowMessage("Please check [Unit Code].");
			sheet1.SelectCell(i, prefix+"pkg_lv1_unit_cd");
			return;
		}
		
		var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(item_cd);
		ajaxSendPost(result_verify, i , '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		
		var unitcd  = sheet1.GetCellValue(i, prefix+"pkg_lv1_unit_cd");
		if(unitcd != ''){
			ajaxSendPost(setIbCommonCodeInfo_unitcd, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd, './GateServlet.gsl');
		}
		var unitcd1 = sheet1.GetCellValue(i, prefix+"item_pkgunit");
		if(unitcd1 != ''){
			ajaxSendPost(setIbCommonCodeInfo_unitcd1, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd1, './GateServlet.gsl');
		}
		var unitcd2 = sheet1.GetCellValue(i, prefix+"pkg_lv3_unit_cd");
		if(unitcd2 != ''){
			ajaxSendPost(setIbCommonCodeInfo_unitcd2, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd2, './GateServlet.gsl');
		}
		var unitcd3 = sheet1.GetCellValue(i, prefix+"pkg_lv4_unit_cd");
		if(unitcd3 != ''){
			ajaxSendPost(setIbCommonCodeInfo_unitcd3, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd3, './GateServlet.gsl');
		}
		//check HTS Code
		var hts_no = sheet1.GetCellValue(i, prefix+"hts_no");
		if  (hts_no != ""){
			ajaxSendPost(resultHTSInfo, i, '&goWhere=aj&bcKey=searchCodeName&codeType=commodity&s_code='+hts_no, './GateServlet.gsl');
		}
		//check Group Code
		var in_grp_cd = sheet1.GetCellValue(i, prefix+"item_grp_cd");
		if  (in_grp_cd != ""){
			
			var sParam="in_ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&in_grp_cd="+in_grp_cd;
			ajaxSendPost(resultItemGroup, i,'&goWhere=aj&bcKey=searchItemGroup&'+sParam, './GateServlet.gsl');
		}
		
		sheet1.SetCellValue(i,prefix+"ctrt_no", ComGetObjValue(formObj.ctrt_no), 0 );
		sheet1.SetCellValue(i,prefix+"user_id", ComGetObjValue(formObj.user_id), 0 );
		sheet1.SetCellValue(i,prefix+"pkg_lv1_qty", 1, 0);
		}
		//check duplicate item
		check_dupitem();
		if(chkDupCnt_item == 0){
			sheet1.SetColEditable(prefix + "item_cd", 0);
			ComShowMessage("Verify Success.");
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_row_vol");
		}else{
			sheet1.SetColEditable(prefix + "item_cd", 1);
			ComShowMessage("Items Duplicate. Please check again.");
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_row_vol");
		}
	}
}
/**
 * 
 * @param reqVal
 * @param Row
 * @returns
 */
function setIbCommonCodeInfo_unitcd(reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(Row,  prefix+"pkg_lv1_unit_cd", rtnArr[0],0);
		}
		else{
			sheetObj.SetCellValue(Row,  prefix+"pkg_lv1_unit_cd", "",0);
		}
	}
}
/**
 * 
 * @param reqVal
 * @param Row
 * @returns
 */
function setIbCommonCodeInfo_unitcd1(reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(Row,  prefix+"item_pkgunit", rtnArr[0],0);
		}
		else{
			sheetObj.SetCellValue(Row,  prefix+"item_pkgunit", "",0);
		}
	}
}
/**
 * 
 * @param reqVal
 * @param Row
 * @returns
 */
function setIbCommonCodeInfo_unitcd2(reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(Row,  prefix+"pkg_lv3_unit_cd", rtnArr[0],0);
		}
		else{
			sheetObj.SetCellValue(Row,  prefix+"pkg_lv3_unit_cd", "",0);
		}
	}
}
/**
 * 
 * @param reqVal
 * @param Row
 * @returns
 */
function setIbCommonCodeInfo_unitcd3(reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			sheetObj.SetCellValue(Row,  prefix+"pkg_lv4_unit_cd", rtnArr[0],0);
		}
		else{
			sheetObj.SetCellValue(Row,  prefix+"pkg_lv4_unit_cd", "",0);
		}
	}
}
/**
 * check duplicate 
 */

function check_dupitem(){
	var sheetObj = sheet1;
	var formObj=document.form;
	chkDupCnt_item = 0;	
	// W/H In Booking 화면에서 Unit Code를 미입력한 데이터 중 중복 제거한 Item Code List만 Popup 대상
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
		//Check dupplicate Item code
		var sXml=docObjects[0].GetSearchData("./ITEMMgmt_2GS.clt", "f_cmd="+SEARCH02+"&ctrt_no="+formObj.ctrt_no.value+"&item_cd="+sheetObj.GetCellValue(i, prefix + "item_cd"));
		var xmlDoc = $.parseXML(sXml);
		var $xml = $(xmlDoc);
		if($xml.find( "result").text() == 'OK'){
			if(i == sheetObj.LastRow()){
				sheetObj.SetCellValue(i, prefix+"del_chk",0,0);	
			}else{
				for (var j=i +1; j<=sheetObj.LastRow(); j++) {
					if (sheetObj.GetCellValue(j, prefix + "item_cd") == sheetObj.GetCellValue(i, prefix + "item_cd")) {
						sheetObj.SetCellValue(j, prefix+"del_chk",1,0);
						chkDupCnt_item = chkDupCnt_item + 1;
					}else{
						sheetObj.SetCellValue(i, prefix+"del_chk",0,0);
					}
				}
			}
		}else{
			sheet1.SetCellValue(i, prefix+"del_chk",1,0);
			chkDupCnt_item = chkDupCnt_item + 1;
		}
	}
}
/**
 * Result Verify
 */
function result_verify(reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var sheetObj = sheet1;
	if(doc[0]=='OK'){
	 if(typeof(doc[1])!='undefined'){
	  //조회해온 결과를 Parent에 표시함
	  var rtnArr=doc[1].split('^@');
	  if(rtnArr[0] != ""){
		  if(sheet1.GetCellValue(Row, prefix+"item_cd") == rtnArr[2]){
			  sheetObj.SetCellValue(Row, prefix+"del_chk",1,0);
		  }
	  	}
	   }
	  }
}

/**
 * Save
 */
function btn_Save() {	
	var formObj=document.form;
	  
	var sheetObj=docObjects[0];
	var prefix="Grd03";	
	// DELETE ROW DEL
//	if (sheetObj.CheckedRows(prefix + "del_chk") != 0) {
//		ComRowHideDelete(sheetObj, prefix + "del_chk");
//    }
	validate_save();
	// CONTRACT NO
	if (isNull(formObj.ctrt_no)) {
		ComShowCodeMessage("COM0278", "Contract No");
		formObj.ctrt_no.focus();
		return;		
	}
	// 필수 입력 체크
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		// Item Name
		if(sheetObj.GetCellValue(i, prefix+"item_nm") == ""){
			ComShowCodeMessage("COM0005", "Item Name");
			sheetObj.SelectCell(i, prefix+"item_nm");
			return;
		}
		// Level 1 Unit
		if(sheetObj.GetCellValue(i, prefix+"pkg_lv1_unit_cd") == ""){
			ComShowCodeMessage("COM0005", "Level 1 Unit");
			sheetObj.SelectCell(i, prefix+"pkg_lv1_unit_cd");
			return;
		}
		//Unit 이 존재할때 Qty는 필수항목이다.
		if (sheetObj.GetCellValue(i, prefix+"item_pkgunit") != "") {
			if (sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") == "" || sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") == 0) {
				ComShowCodeMessage("COM0082", "Level 2 Package Qty");
				sheetObj.SelectCell(i, prefix+"item_pkgbaseqty");
				return;
			}
		}
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_unit_cd") != "") {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") == "" || sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") == 0) {
				ComShowCodeMessage("COM0082", "Level 3 Package Qty");
				sheetObj.SelectCell(i, prefix+"pkg_lv3_qty");
				return;
			}
		}		
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_unit_cd") != "") {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") == "" || sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") == 0) {
				ComShowCodeMessage("COM0082", "Level 4 Package Qty");
				sheetObj.SelectCell(i, prefix+"pkg_lv4_qty");
				return;
			}
		}				
		//Qty 가 존재할때 Unit 는 필수 항목.
		if (sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") != "" && sheetObj.GetCellValue(i, prefix+"item_pkgbaseqty") != 0) {
			if (sheetObj.GetCellValue(i, prefix+"item_pkgunit") == "") {
				ComShowCodeMessage("COM0082", "Level 2 Package Unit");
				sheetObj.SelectCell(i, prefix+"item_pkgunit");
				return;
			}
		}		
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") != "" && sheetObj.GetCellValue(i, prefix+"pkg_lv3_qty") != 0) {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv3_unit_cd") == "") {
				ComShowCodeMessage("COM0082", "Level 3 Package Unit");
				sheetObj.SelectCell(i, prefix+"pkg_lv3_unit_cd");
				return;
			}
		}				
		if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") != "" && sheetObj.GetCellValue(i, prefix+"pkg_lv4_qty") != 0) {
			if (sheetObj.GetCellValue(i, prefix+"pkg_lv4_unit_cd") == "") {
				ComShowCodeMessage("COM0082", "Level 4 Package Unit");
				sheetObj.SelectCell(i, prefix+"pkg_lv4_unit_cd");
				return;
			}
		}
	}
	if (ComShowCodeConfirm("COM130101")) {
		/* 속도개선 Start 임시주석 */
		ComBtnDisable("btnSave");
		ComBtnDisable("btn_row_vol");
		ComBtnDisable("btn_row_add");
		ComBtnDisable("btn_row_del");
		/* 속도개선 End 임시주석 */
		
		doShowProcess(true);
		setTimeout(function() {
			 
 		var saveXml=docObjects[0].GetSaveData("./WHCreateMultiItemPopupGS.clt", sheet1.GetSaveString() + '&f_cmd=' + MULTI + '&ctrt_no=' + formObj.ctrt_no.value);

 		if (saveXml.indexOf('<ERROR>') == -1) {			
			ComShowCodeMessage("COM0093", ""); // Saved successfully.
 			//showCompleteProcess();
			ComClosePopup();
		}else{
			ComShowCodeMessage("COM0410");
		}
		 },100);
	}
	 
}
/**
 * Delete Row
 */
function row_del(){
	var sheetObj=sheet1;
	if (sheetObj.CheckedRows(prefix + "del_chk") != 0) {
		ComRowHideDelete(sheetObj, prefix + "del_chk");
    }else {ComShowMessage("Nothing selected!");}
}
/**
 * On Search End
 */
function sheet1_OnSearchEnd() {
	doHideProcess(false);
}
/**
 * Template Download
 */
function excel_Download() {	
	var formObj1=document.frm1;
	var fileName="WH_ITEM_ENTRY_TEMPLATE.xls";
	document.frm1.file_name.value= fileName;
	formObj1.submit();
}
/**
 * Calculated value on CBM, CBF, G.WGT, G.LBS, N.WGT, N.LBS
 */
function btn_vol(){
	var sheetObj = sheet1;
	if (sheetObj.CheckedRows(prefix + "del_chk") != 0) {
		if(sheetObj.RowCount()> 0){
			var sRow = sheetObj.FindCheckedRow(prefix + "del_chk");
			var arrRow = sRow.split("|");
			for ( var idx = arrRow.length-1; idx >= 0; idx--) {
				  var row = arrRow[idx];
					//level 1
			        var length = sheet1.GetCellValue(row, prefix+"lv1_length") ? sheet1.GetCellValue(row, prefix+"lv1_length") : 0;
			        var width  = sheet1.GetCellValue(row, prefix+"lv1_width")  ? sheet1.GetCellValue(row, prefix+"lv1_width")  : 0;
			        var height = sheet1.GetCellValue(row, prefix+"lv1_height") ? sheet1.GetCellValue(row, prefix+"lv1_height") : 0;
			        var pcs = 1;//form.pkg_lv1_qty.value ? form.pkg_lv1_qty.value : 0;
			        var cbm=0;
			        var kg=0;
			        var sumCbm=0;

			        //#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			        //kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
			        //cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
			        if(h_ut_tp_cd == "CM") {
						cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
					} else if(h_ut_tp_cd == "INCH") {
						cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
					}
					kg = unitConvertValue("CBM_WGT", cbm);

			        sheet1.SetCellValue(row, prefix+"lv1_grs_kgs", kg);
			        //sheet1.SetCellValue(row, prefix+"lv1_grs_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
			        sheet1.SetCellValue(row, prefix+"lv1_grs_lbs", unitConvertValue("KG_LB", kg));
			        sheet1.SetCellValue(row, prefix+"lv1_net_kgs", kg);
			        //sheet1.SetCellValue(row, prefix+"lv1_net_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
			        sheet1.SetCellValue(row, prefix+"lv1_net_lbs", unitConvertValue("KG_LB", kg));
			        sheet1.SetCellValue(row, prefix+"lv1_cbm", cbm);
			        //sheet1.SetCellValue(row, prefix+"lv1_cbf", roundXL(cbm * CNVT_CNST_CBM_CFT, 5));
			        sheet1.SetCellValue(row, prefix+"lv1_cbf", unitConvertValue("CBM_CBF", cbm));

			        //level 2

			        var length = sheet1.GetCellValue(row, prefix+"item_length") ? sheet1.GetCellValue(row, prefix+"item_length") : 0;
			        var width  = sheet1.GetCellValue(row, prefix+"item_width")  ? sheet1.GetCellValue(row, prefix+"item_width")  : 0;
			        var height = sheet1.GetCellValue(row, prefix+"item_height") ? sheet1.GetCellValue(row, prefix+"item_height") : 0;
			        var pcs = 1;//form.pkg_item_qty.value ? form.pkg_item_qty.value : 0;
			        var cbm=0;
			        var kg=0;
			        var sumCbm=0;

			        //#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			        //kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
			        //cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
			        if(h_ut_tp_cd == "CM") {
						cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
					} else if(h_ut_tp_cd == "INCH") {
						cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
					}
					kg = unitConvertValue("CBM_WGT", cbm);

					sheet1.SetCellValue(row, prefix+"item_kgs", kg);
			        //sheet1.SetCellValue(row, prefix+"item_grs_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
			        sheet1.SetCellValue(row, prefix+"item_grs_lbs", unitConvertValue("KG_LB", kg));
			        sheet1.SetCellValue(row, prefix+"item_net_wgt", kg);
			        //sheet1.SetCellValue(row, prefix+"item_net_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
			        sheet1.SetCellValue(row, prefix+"item_net_lbs", unitConvertValue("KG_LB", kg));
			        sheet1.SetCellValue(row, prefix+"item_cbm", cbm);
			        //sheet1.SetCellValue(row, prefix+"item_cbf", roundXL(cbm * CNVT_CNST_CBM_CFT, 5));
			        sheet1.SetCellValue(row, prefix+"item_cbf", unitConvertValue("CBM_CBF", cbm));

				    //level 3

			        var length = sheet1.GetCellValue(row, prefix+"lv3_length") ? sheet1.GetCellValue(row, prefix+"lv3_length") : 0;
			        var width  = sheet1.GetCellValue(row, prefix+"lv3_width")  ? sheet1.GetCellValue(row, prefix+"lv3_width")  : 0;
			        var height = sheet1.GetCellValue(row, prefix+"lv3_height") ? sheet1.GetCellValue(row, prefix+"lv3_height") : 0;
			        var pcs = 1;//form.pkg_lv3_qty.value ? form.pkg_lv3_qty.value : 0;
			        var cbm=0;
			        var kg=0;
			        var sumCbm=0;

			        //#2927 [LOA WMS4.0] ITEM CBM CALCULATION
			        //kg=roundXL(length * width * height * pcs *wgt_std_chg * wgt_std_chg * wgt_std_chg / 6000, 5);
			        //cbm=roundXL(length * width * height * pcs * ut_std_chg * ut_std_chg * ut_std_chg, 5);
			        if(h_ut_tp_cd == "CM") {
						cbm = unitConvertValue("CBCM_CBM", length * width * height * pcs);
					} else if(h_ut_tp_cd == "INCH") {
						cbm = unitConvertValue("CBINCH_CBM", length * width * height * pcs);
					}
					kg = unitConvertValue("CBM_WGT", cbm);

					sheet1.SetCellValue(row, prefix+"lv3_grs_kgs", kg);
			        //sheet1.SetCellValue(row, prefix+"lv3_grs_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
			        sheet1.SetCellValue(row, prefix+"lv3_grs_lbs", unitConvertValue("KG_LB", kg));
			        sheet1.SetCellValue(row, prefix+"lv3_net_kgs", kg);
			        //sheet1.SetCellValue(row, prefix+"lv3_net_lbs", roundXL(kg * CNVT_CNST_KG_LB, 5));
			        sheet1.SetCellValue(row, prefix+"lv3_net_lbs", unitConvertValue("KG_LB", kg));
			        sheet1.SetCellValue(row, prefix+"lv3_cbm", cbm);
			        //sheet1.SetCellValue(row, prefix+"lv3_cbf", roundXL(cbm * CNVT_CNST_CBM_CFT, 5));
			        sheet1.SetCellValue(row, prefix+"lv3_cbf", unitConvertValue("CBM_CBF", cbm));
			}
		}
    } else {
    	ComShowMessage("Nothing selected!");
    }
}
/**
 * validate save
 */
function validate_save(){
	var formObj=document.form;
	if(formObj.ctrt_no.value == ""){
		ComShowMessage("Please enter Contract No.");
		return;
	}
	if(sheet1.RowCount() < 1){
		ComShowMessage("Please add row/upload data.");
	}else{
	for(var i = sheet1.HeaderRows(); i < sheet1.LastRow()+ 1; i++){
		var item_cd = sheet1.GetCellValue(i, prefix+"item_cd");
		
		/* 속도개선 Start 임시주석 */
		var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(item_cd);
		ajaxSendPost(result_verify, i , '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		
		var unitcd  = sheet1.GetCellValue(i, prefix+"pkg_lv1_unit_cd");
		if(unitcd != ''){
			ajaxSendPost(setIbCommonCodeInfo_unitcd, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd, './GateServlet.gsl');
		}
		var unitcd1 = sheet1.GetCellValue(i, prefix+"item_pkgunit");
		if(unitcd1 != ''){
			ajaxSendPost(setIbCommonCodeInfo_unitcd1, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd1, './GateServlet.gsl');
		}
		/* 속도개선 End 임시주석 */
		
		// License Plate Type No로 변경
//		var unitcd2 = sheet1.GetCellValue(i, prefix+"pkg_lv3_unit_cd");
//		if(unitcd2 != ''){
//			ajaxSendPost(setIbCommonCodeInfo_unitcd2, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd2, './GateServlet.gsl');
//		}
//		var unitcd3 = sheet1.GetCellValue(i, prefix+"pkg_lv4_unit_cd");
//		if(unitcd3 != ''){
//			ajaxSendPost(setIbCommonCodeInfo_unitcd3, i , '&goWhere=aj&bcKey=searchCommonCodeInfoA6&c_code='+unitcd3, './GateServlet.gsl');
//		}
		sheet1.SetCellValue(i,prefix+"ctrt_no", ComGetObjValue(formObj.ctrt_no), 0 );
		sheet1.SetCellValue(i,prefix+"user_id", ComGetObjValue(formObj.user_id), 0 );
		sheet1.SetCellValue(i,prefix+"pkg_lv1_qty", 1, 0);
		}
	    /* 속도개선 Start 임시주석 */
		check_dupitem();
		/* 속도개선 End 임시주석 */
		if(chkDupCnt_item == 0){
			sheet1.SetColEditable(prefix + "item_cd", 0);
			ComBtnEnable("btnSave");
			ComBtnEnable("btn_row_vol");
		}else{
			sheet1.SetColEditable(prefix + "item_cd", 1);
			ComBtnDisable("btnSave");
			ComBtnDisable("btn_row_vol");
		}
	}
}