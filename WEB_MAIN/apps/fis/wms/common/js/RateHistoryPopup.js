/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateHistoryPopup.js
*@FileTitle  : Rate History
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/20
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		switch(srcName) {
			case "CLOSE" :
				ComClosePopup();
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
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}

	btn_Search();
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function initSheet(sheetObj,sheetNo) {
    var cnt=0;
    switch(sheetObj.id) {
        case "sheet1":      //IBSheet1 init
            with(sheetObj){


                var prefix="";

                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };

                var headers = [ { Text:getLabel('WHRateInOutPop_Sheet1_HDR1'), Align:"Center"},
                                { Text:getLabel('WHRateInOutPop_Sheet1_HDR2'), Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_cd" },
                    {Type:"Text",	Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_mode",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:140,  Align:"Center",  ColMerge:1,   SaveName:prefix+"branch",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",   Hidden:0, Width:280,  Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_fr_dt",          KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",   Hidden:0, Width:280,  Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_to_dt",          KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                    {Type:"Text",   Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"por",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",   Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pol",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",	Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pod",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",   Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",   Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",   Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",   Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"svcterm_fr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",   Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"svcterm_to_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",   Hidden:1, Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"nra_quote_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:20 },
                    {Type:"Text",   Hidden:1, Width:180,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                    {Type:"Text",	Hidden:1, Width:20,   Align:"Center",  ColMerge:1,   SaveName:prefix+"upload_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"doc_no" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"file_path" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"file_sys_nm" },
                    {Type:"Text",	Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pub_dt",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                    {Type:"Text",	Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pub_update_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pub_update_yn" },
                    {Type:"Text",	Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"departure_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",	Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"departure_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"arrival_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",	Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"arrival_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",	Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"origin_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",	Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"origin_loc_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                    {Type:"Text", 	Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"dest_loc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",   Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"dest_loc_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                    {Type:"Combo", 	Hidden:0, Width:180,  Align:"Center",  ColMerge:1,   SaveName:prefix+"loc_cd",             KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",   Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"commodity_desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",   Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"edit_yn" },
                    {Type:"Text",   Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ext_yn" }
                ];

                InitColumns(cols);
                SetSheetHeight(180);
                SetEditable(0);
                
                SetColProperty(prefix+"loc_cd", {ComboText:WH_TEXT, ComboCode:WH_CD} );
            }
            break;


        case "sheet2":      //IBSheet1 init
            with(sheetObj){

                var prefix="Grd02";

                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:getLabel('WHRateInOutPop_Sheet2_HDR1'), Align:"Center"},
                                { Text:getLabel('WHRateInOutPop_Sheet2_HDR2'), Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [
                    {Type:"Status",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no" },
                    {Type:"Text",	Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_cd" },
                    {Type:"Text",   Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_tp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",   Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",	Hidden:0, Width:260,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                    {Type:"Combo",	Hidden:0, Width:75,   Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",	Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",   Hidden:0, Width:260,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"Combo", 	Hidden:0, Width:160,  Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Combo", 	Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd2",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",   Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Float",  Hidden:0, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Combo",  Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"item_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",   Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_fr_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",   Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_to_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                    {Type:"Text",   Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                    {Type:"Text",   Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"rgst_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"Date",   Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:prefix+"rgst_sys_dt",   KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"Text",   Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",   Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text", 	Hidden:1, Width:85,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },        
                    {Type:"Text",   Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"fix_rate_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",   Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cond_first",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",   Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cond_second",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",  Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"ext_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",  Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"int_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",  Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"full_mon_rate", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",  Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"half_mon_rate", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",  Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"week_rate",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Text",   Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"day_opt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",  Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"day_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Text",   Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_mode" }
                    ];

                InitColumns(cols);
                SetSheetHeight(250);
                SetEditable(0);
                SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
                SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
            }
            break;
    }
}

function sheet2_OnSearchEnd(){

    var sheetObj=sheet2;

    var prefix="Grd02";

    var hdrR = sheetObj.HeaderRows();
    var rowCnt = sheetObj.RowCount();

    for (var i = hdrR; i < rowCnt + hdrR; i++) {

      	// SKU ComboList조회
    	var selRow=sheet1.GetSelectRow();
    	var p_ctrt_no = sheet1.GetCellValue(selRow, "ctrt_no");
    	var p_wh_cd = sheet1.GetCellValue(selRow, "loc_cd");
   	 	sheet2Row = i;
   	 	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');

		// Unit2 콤보 정보 선택
		var strUnit2Cd = "|CBM|CBF|GKG|GLB|NKG|NLB";
		var strUnit2Text = "|CBM|CFT|G.KG|G.LB|N.KG|N.LB";
		
		//# of License Plate
		if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "LPN") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + LIC_PLATE_TEXT, ComboCode:"|" + LIC_PLATE_CD} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Property of License Plate
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "LPP") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:strUnit2Text, ComboCode:strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Container
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "CNT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TPCD1, ComboCode:"|" + TPCD1} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Truck
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "TRK") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Handling Unit
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "HUT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Package Unit
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "PUT") {
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			//Order
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "ODR") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",0);
			sheetObj.SetCellValue(i, prefix+"unit_cd2","");
			//Hour
		} else if (sheetObj.GetCellValue(i, prefix + "unit_cd") == "HOR") {
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",0);
			sheetObj.SetCellValue(i, prefix+"unit_cd2","");
		}

    	

    }

    doHideProcess();
}

function dispAjaxReq(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				//특정 셀의 콤보 항목 바꾸기
				var codeText = rtnArr[0];
				sheet2.CellComboItem(sheet2Row,"Grd02item_cd",{ComboText:codeText, ComboCode:rtnArr[1]} );
			}
		}
	}
}


function btn_Search()
{
	var formObj=document.form;
	var sXml="";
	var sParam="";
	var i=0;
	doShowProcess(true); //ComOpenWait(true);
	for(var i=0; i < 2; i++){
		if(i == 0){
			formObj.f_cmd.value = SEARCH;
			var sXml= docObjects[0].GetSearchData("./searchRateHistoryMainGS.clt", FormQueryString(formObj));
			docObjects[0].LoadSearchData(sXml,{Sync:1} );
		}else if(i == 1){
			formObj.f_cmd.value = SEARCH01;
			var sXml1= docObjects[1].GetSearchData("./searchRateHistoryListGS.clt", FormQueryString(formObj));
			docObjects[1].LoadSearchData(sXml1,{Sync:1} );
		}
	}
	doHideProcess(false); //ComOpenWait(false);
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	
    var formObj=document.form;

    var prefix="";

    var rate_no=sheetObj.GetCellValue(Row,prefix+"rate_no");
    if ( sheetObj.ColSaveName(Col) == prefix+"rate_no" && !ComIsNull(rate_no)){
		formObj.f_cmd.value = SEARCH02;
		formObj.rate_no.value = rate_no;
		var sXml1= docObjects[1].GetSearchData("./searchRateHistoryListGS.clt", FormQueryString(formObj));
		docObjects[1].LoadSearchData(sXml1,{Sync:1} );
    }
}

