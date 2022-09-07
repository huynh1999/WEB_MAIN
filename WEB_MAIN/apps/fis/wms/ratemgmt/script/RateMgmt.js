/*=========================================================
 \*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : RateMgmt.js
 *@FileTitle  : Rate Management
 *@author     : Tin.Luong - DOU Network
 *@version    : 1.0
 *@since      : 2015/03/05
 =========================================================*/
//--------------------------------------------------------------------------------------------------------------
//IBSheet
//--------------------------------------------------------------------------------------------------------------
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var docObjects=new Array();
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0;
var ftr_modText = "";
var ftr_modCode = "";
var getRow;
var sheet2Row = 0;
var l_dupRow = 0;
var l_dupRow_sheet1 = 0;
var l_chkReturn = true;
//var sell_filer;
//var sell_br_filer;
//var sell_pub_filer;
/**
 * Sheet  onLoad
 */
var rep = 1;
/**
 * Sheet  onLoad
 */
//var rtnary;
var formObj=document.form;
var rtnary = new Array(1);


function loadPage() {
    var formObject=document.form;
//  var tab="";
//  for(var k=0;k<tabObjects.length;k++){
//        initTab(tabObjects[k],k+1);
//    }
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i]);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    //IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
    // initCombo
//  sell_br_filer = formObject.sell_br_filer;
//  initCombo(sell_br_filer);
////    sell_filer = formObject.sell_filer;
//  initCombo(sell_filer);
////    sell_pub_filer = formObject.sell_pub_filer;
//  initCombo(sell_pub_filer);

//  initControl();
    main_button("N");
    detail_button("N","A");
    if (!ComIsEmpty(formObject.in_ctrt_no)){
//      btn_Search();
//      if (formObject.pop_sb_cls_nm.value == "Sell"){
//          if (!ComIsEmpty(formObject.pop_rate_no)){
//              goTabSelect('01');
//              btn_Search();
//              comboObjects[2].SetSelectCode(formObject.pop_rate_no.value);
//          }
//      } else if (formObject.pop_sb_cls_nm.value == "Buy"){
//          if (!ComIsEmpty(formObject.pop_rate_no)){
//              goTabSelect('02');
//              btn_Search();
//              comboObjects[5].SetSelectCode(formObject.pop_rate_no.value);
//          }
//      } else {
//          btn_Search();
//      }
    }
}
/**
 * initControl()
 */
function initControl() {
//  var formObject=document.form;
//  axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("blur", "form_onChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//    //- 포커스 나갈때
////    axon_event.addListenerForm('beforedeactivate',  'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/**
 * IBSheet Object
 */
function setDocumentObject(sheet_obj){
    docObjects[sheetCnt++]=sheet_obj;
}
function setComboObject(combo_obj){
    comboObjects[comboCnt++]=combo_obj;
}
function initSheet(sheetObj,sheetNo) {
    var cnt=0;
    switch(sheetObj.id) {
        case "sheet1":      //IBSheet1 init
            with(sheetObj){

                var prefix="";

                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:getLabel('WHRateInOut_Sheet1_HDR1'), Align:"Center"},
                                { Text:getLabel('WHRateInOut_Sheet1_HDR2'), Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
                    {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_cd" },
                    {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",    ColMerge:1,   SaveName:prefix+"rate_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Combo",     Hidden:1, Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_mode",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:140,   Align:"Center",  ColMerge:1,   SaveName:prefix+"branch",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:280,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_fr_dt",          KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:280,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_to_dt",          KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                    {Type:"PopupEdit", Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"por",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"por_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pol",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pol_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pod",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pod_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"del_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Combo",     Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"svcterm_fr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Combo",     Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"svcterm_to_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:prefix+"nra_quote_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:20 },
                    {Type:"Text",      Hidden:1,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                    {Type:"Image",     Hidden:1, Width:20,   Align:"Center",  ColMerge:1,   SaveName:prefix+"upload_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"doc_no" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"file_path" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"file_sys_nm" },
                    {Type:"Date",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pub_dt",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                    {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pub_update_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pub_update_yn" },
                    {Type:"PopupEdit", Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"departure_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"departure_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"arrival_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"arrival_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"origin_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"origin_loc_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                    {Type:"PopupEdit", Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"dest_loc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"dest_loc_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                    {Type:"Combo", 	   Hidden:0, Width:180,  Align:"Center",  ColMerge:1,   SaveName:prefix+"loc_cd",             KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    //{Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:prefix+"loc_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                    {Type:"Popup",     Hidden:1, Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"commodity_desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"edit_yn" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ext_yn" }
                ];

                InitColumns(cols);
                SetSheetHeight(133);	//#2326 [WMS4.0] RATE IN & OUT ENTRY BOX WIDTH, HEIGHT
                SetEditable(1);
                SetWaitImageVisible(0);
                SetShowButtonImage(3);
                SetImageList(0, APP_PATH + "/web/img/main/icon_file.gif");

                //InitViewFormat(0, "eff_fr_dt", "MM-dd-yyyy");
                //InitViewFormat(0, "eff_to_dt", "MM-dd-yyyy");
                SetColProperty(prefix+"frt_mode", {ComboText:ftr_modText, ComboCode:ftr_modCode} );
                SetColProperty(prefix+"svcterm_fr_cd", {ComboText:"|CY|CFS|DOOR", ComboCode:"|CY|CFS|DOOR"} );
                SetColProperty(prefix+"svcterm_to_cd", {ComboText:"|CY|CFS|DOOR", ComboCode:"|CY|CFS|DOOR"} );
                SetColProperty(0 , prefix+"por" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"pol", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"pod", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"del", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"departure_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"arrival_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"origin_loc_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"origin_loc_nm", {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,.]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"dest_loc_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"dest_loc_nm", {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,.]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"loc_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 , prefix+"loc_nm", {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,.]" , InputCaseSensitive:1});
//              SetColProperty(0 , prefix+"nra_quote_no", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                //SetColProperty(prefix+"frt_mode", {ComboText:"|Warehouse", ComboCode:"|W"} );
                SetColProperty(prefix+"loc_cd", {ComboText:WH_TEXT, ComboCode:WH_CD} );
            }
            break;


        case "sheet2":      //IBSheet1 init
            with(sheetObj){

                var prefix="Grd02";

                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:getLabel('WHRateInOut_Sheet2_HDR1'), Align:"Center"},
                                { Text:getLabel('WHRateInOut_Sheet2_HDR2'), Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [
                    {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
                    {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"chk" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ctrt_no" },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_cd" },
                    {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:0, Width:220,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                    {Type:"Combo",     Hidden:0, Width:75,   Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
//                    {Type:"Text", Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:prefix+"bill_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
//                    {Type:"Text",      Hidden:0,  Width:260,  Align:"Left",    ColMerge:1,   SaveName:prefix+"bill_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Combo",     Hidden:0, Width:300,   Align:"Left",  ColMerge:1,   SaveName:prefix+"frt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Text",      Hidden:1,  Width:260,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"Combo", 		Hidden:0, Width:110,   Align:"Left",  ColMerge:1,   SaveName:prefix+"unit_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Combo", 		Hidden:0, Width:75,   Align:"Center", ColMerge:1,   SaveName:prefix+"unit_cd2",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Combo",     Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                    {Type:"Float",     Hidden:0,  Width:80,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Combo",      Hidden:0,  Width:180,   Align:"Center",    ColMerge:1,   SaveName:prefix+"item_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_fr_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eff_to_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                    
                    
                    {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",    ColMerge:1,   SaveName:prefix+"rate_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:60,  Align:"Center",  ColMerge:1,   SaveName:prefix+"rate_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"PopupEdit", Hidden:1, Width:85,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },        
                    {Type:"Combo",     Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"fix_rate_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
//                    {Type:"Combo",     Hidden:0, Width:130,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
//                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"Combo",     Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cond_first",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Combo",     Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cond_second",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"ext_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"int_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"full_mon_rate", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"half_mon_rate", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"week_rate",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Combo",     Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"day_opt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"day_rate",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
                    {Type:"Combo",     Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_mode" } ];

                InitColumns(cols);
                SetSheetHeight(250);
                SetEditable(1);
//                SetColProperty(0 ,prefix+"ofc_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 ,prefix+"cust_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});

                //SetColProperty(0 ,prefix+"frt_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(prefix+"frt_cd", {ComboCode:FreightCode, ComboText:FreightText} );
                SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD} );

//                SetColProperty(0 ,prefix+"unit_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(0 ,prefix+"curr_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
                SetColProperty(prefix+"frt_mode", {ComboText:"|Warehouse", ComboCode:"|W"} );

                SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
                SetColProperty(prefix+"cond_first",{ComboText:" |" + cond_first_inText + "|" + cond_first_outText + "|" + cond_first_strText, ComboCode:" |" + cond_first_inCode + "|" + cond_first_outCode + "|" + cond_first_strCode});
                SetColProperty(prefix+"cond_second",{ComboText:" |" + cond_second_in_outText + "|" + cond_second_strText, ComboCode:" |" + cond_second_in_outCode + "|" + cond_second_strCode});
                SetColProperty(prefix+"fix_rate_flg",{ComboText:"Y|N", ComboCode:"Y|N"});
                SetColProperty(prefix+"day_opt",{ComboText:" |"+day_optText, ComboCode:" |"+day_optCode});
                //SetColProperty(prefix+"unit_cd",{ComboText:" |EACH|INNER CARTON|BOX|PALLET", ComboCode:" |EA|IC|BX|PE"});
                SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
            }
            break;
    }
}

function initCombo(comboObj) {
    var vTextSplit = null;
    var vCodeSplit = null;
    switch(comboObj.id) {
        case "sell_filer":
            vTextSplit = rate_filerText.split("|");
            vCodeSplit = rate_filerCode.split("|");
            with(comboObj) {
                comboAddItem("sell_filer", "A", "ALL");
//              for(var j=0;j<vCodeSplit.length; j++){
//                  comboAddItem("sell_filer", vCodeSplit[j],  vTextSplit[j]);
//              }
            }
            break;
    }
}
function btn_New(){
    var formObject=document.form;
    formObject.reset();
    sheet1.RemoveAll();
    sheet2.RemoveAll();
    formObject.in_ctrt_no.value="";
    formObject.in_ctrt_nm.value="";
    formObject.sell_filer.value = "A";
    main_button("N");
    detail_button("N","A");
}
function btn_Search(){
    var formObject=document.form;
    formObject.f_cmd.value=SEARCH;
    var prefix = "";
    SEARCH_TYPE = 1;
//  var InputName="";
    if (validateForm(sheet1,formObject,'Search')) {
        comboRemoveAll("sell_filer");
        initCombo(formObject.sell_filer);

        comboRemoveAll("sell_br_filer");
        comboAddItem("sell_br_filer", "ALL", "ALL");

        formObject.sell_pub_filer.value = "ALL";
        sheet1.RemoveAll();
        sheet2.RemoveAll();
        doShowProcess();
        var sXml=sheet1.GetSearchData("./RateMgmtGS.clt", FormQueryString(formObject,""));
        var arrXml = sXml.split("|$$|");
//      InputName="ctrt_no|ctrt_nm|sales_ofc_cd|sales_ofc_nm|sales_pic_id|sales_pic_nm|rgst_sys_dt|rgst_nm|modi_sys_dt|modi_nm|";
        if( arrXml[0].indexOf('<ERROR>') != -1){
//          var xml= convertColOrder(arrXml[0],prefix + "");
//          sheet1.LoadSearchData(xml,{Sync:1} );
            formObject.reset();
            main_button("N");
            detail_button("N","A");

        } else {

            //Load Contract Info
            $contactInfo = $($.parseXML(arrXml[0])).find('INFO');

            if($contactInfo.length > 0){
                formObject.ctrt_no.value = $contactInfo.find('CTRT_NO').text();
                formObject.ctrt_nm.value = $contactInfo.find('CTRT_NM').text();
                formObject.sales_ofc_cd.value = $contactInfo.find('SALES_OFC_CD').text();
                formObject.sales_ofc_nm.value = $contactInfo.find('SALES_OFC_NM').text();
                formObject.sales_pic_id.value = $contactInfo.find('SALES_PIC_ID').text();
                formObject.sales_pic_nm.value = $contactInfo.find('SALES_PIC_NM').text();
                formObject.ctrt_cust_cd.value = $contactInfo.find('CTRT_CUST_CD').text();
                formObject.rgst_sys_dt.value = $contactInfo.find('RGST_SYS_DT').text();
                formObject.modi_sys_dt.value = $contactInfo.find('MODI_SYS_DT').text();
                formObject.rgst_nm.value = $contactInfo.find('RGST_NM').text();
                formObject.modi_nm.value = $contactInfo.find('MODI_NM').text();
            }

            //Load Main Grid
            //$sheet1XML = $($.parseXML(arrXml[0])).find('SHEET1');
            //sheet1.LoadSearchData($sheet1XML[0].innerHTML);
            searchDataSheet(sheet1, sXml, 'SHEET1');
            searchDataSheet(sheet2, sXml, 'SHEET2');
            //Load Details Grid

//          $sheet2XML = $($.parseXML(arrXml[0])).find('SHEET2');
//          sheet2.LoadSearchData($sheet2XML[0].innerHTML);

//          //sell_filer.RemoveAll();
//          comboRemoveAll("sell_filer");
//          //initCombo(sell_filer,"sell_filer");
//          for(i=sheet1.HeaderRows();i<sheet1.RowCount() + sheet1.HeaderRows();i++){
//              //mjy
//              comboAddItem("sell_filer", sheet1.GetCellValue(i,prefix + "rate_no"), sheet1.GetCellValue(i,prefix + "rate_no") + "^" + sheet1.GetCellValue(i,prefix + "frt_mode"));
//              //sell_filer.InsertItem(-1, sheet1.GetCellValue(i,prefix + "rate_no"), sheet1.GetCellValue(i,prefix + "rate_no") + "^" + sheet1.GetCellValue(i,prefix + "frt_mode"));
//              frt_mode(sheet1,i,sheet1.GetCellValue(i,prefix + "frt_mode"));
//          }
//
////            comboObjects[0].RemoveAll();
////            comboObjects[0].InsertItem(0,  "ALL", "ALL");
//          comboRemoveAll("sell_br_filer");
//          comboAddItem("sell_br_filer", "All", "All");
//          var sell_br_list="";
//          for(i=sheet1.HeaderRows();i<sheet1.RowCount()+sheet1.HeaderRows();i++){
//              if(comboFindItemByName("sell_br_list", sheet1.GetCellValue(i,prefix + "branch")) < 0){
//                  sell_br_list=sell_br_list + "," + sheet1.GetCellValue(i,prefix + "branch");
////                    comboObjects[0].InsertItem(-1, sheet1.GetCellValue(i,prefix + "branch"), sheet1.GetCellValue(i,prefix + "branch"));
//                  comboAddItem("sell_br_list", sheet1.GetCellValue(i,prefix + "branch"), sheet1.GetCellValue(i,prefix + "branch"));
//              }
//          }
//          sell_pub_filer.value = "All";
//          main_button("Y");
//          detail_button("N","A");
//
////            sheet1_OnDblClick(sheet1,2,4);
        }
    }
}
function searchDataSheet(sheetObj, sXml, tagSheet){
    var openTag = '<' + tagSheet + '>';
    var endTag = '</' + tagSheet + '>';
    var strtIndxSheet = sXml.indexOf(openTag) + openTag.length;
    var endIndxSheet = sXml.indexOf(endTag) - 1;

    var sheetData = sXml.substring(strtIndxSheet,endIndxSheet);

    sheetObj.LoadSearchData(sheetData);
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(){
    /***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
    /*******************************************************/
    var formObj=document.form;
    try {
        var srcName=ComGetEvent("name");
        switch(srcName) {
            case "btn_in_ctrt_no" :
                CtrtPopup(param);
                break;
            case "btn_search" :
                sheet1.RemoveAll();
                sheet2.RemoveAll();
                btn_Search();
                break;
            case "btn_New" :
                btn_New();
                break;
            case "lnk_Execl_DL" :
                lnk_Execl_DL();
                break;
            case "lnk_History" :
                lnk_History();
                break;
            case "lnk_Temp_DL" :
                lnk_Temp_DL();
                break;
            case "lnk_Execl_UL" :
                lnk_Execl_UL();
                break;
            case "btn_Sell_Main_Add" :
                btn_Sell_Main_Add();
                break;
            case "btn_Sell_Main_Del" :
                btn_Sell_Main_Del();
                break;
            case "btn_Sell_Main_Copy" :
                btn_Sell_Main_Copy();
                break;
            case "btn_Sell_Main_Copy_All" :
                btn_Sell_Main_Copy_All();
                break;
            case "btn_Sell_Main_Save" :
                btn_Sell_Main_Save();
                break;
            case "btn_Sell_Detail_Add" :
                btn_Sell_Detail_Add();
                break;
            case "btn_Sell_Detail_Del" :
                btn_Sell_Detail_Del();
                break;
            case "btn_Sell_Detail_Copy" :
                btn_Sell_Detail_Copy();
                break;
            case "btn_Sell_Detail_Save" :
                btn_Sell_Detail_Save();
                break;
        } // end switch
    }catch(e) {
        if( e == "[object Error]") {
//          ComShowMessage(OBJECT_ERROR);
            alert(getLabel('FMS_COM_ERR002'));
        } else {
//          ComShowMessage(e);
            alert(getLabel('FMS_COM_ERR001') + " - " + e);
        }
    }
}

function doWork(srcName){

//  if(!btnGetVisible(srcName)){
//      return;
//  }
    var formObj = document.frm1;

    switch(srcName) {
        case "btn_in_ctrt_no" :
            CtrtPopup();
            /*rtnary=new Array(2);
            rtnary[0]="";
            rtnary[1]="";
            rtnary[2]=window;

            callBackFunc = "setCtrtNoInfo";
            modal_center_open('./ContractRoutePopup.clt', rtnary, 900, 580,"yes");*/
        	
            break;
        case "SEARCH":
            sheet1.RemoveAll();
            sheet2.RemoveAll();
            btn_Search();
            break;

        case "NEW":
            btn_New();
            break;

        case "lnk_Execl_DL" :
            if(sheet1.RowCount() < 1){//no data
                ComShowCodeMessage("COM132501");
            }else{
                lnk_Execl_DL();
            }

            break;
        case "lnk_History" :
            lnk_History();
            break;
        case "lnk_Temp_DL" :
            //ComShowCodeMessage('COM132612');
            //return;
            lnk_Temp_DL();
            break;
        case "lnk_Execl_UL" :
            lnk_Execl_UL();
            break;

        case "btn_Sell_Main_Add" :
            btn_Sell_Main_Add();
            break;
        case "btn_Sell_Main_Del" :
            btn_Sell_Main_Del();
            break;
        case "btn_Sell_Main_Copy" :
            btn_Sell_Main_Copy();
            break;
        case "btn_Sell_Main_Copy_All" :
            btn_Sell_Main_Copy_All();
            break;
        case "btn_Sell_Main_Save" :
            btn_Sell_Main_Save();
            break;
        case "btn_Sell_Detail_Add" :
            btn_Sell_Detail_Add();
            break;
        case "btn_Sell_Detail_Del" :
            btn_Sell_Detail_Del();
            break;
        case "btn_Sell_Detail_Copy" :
            btn_Sell_Detail_Copy();
            break;
        case "btn_Sell_Detail_Save" :
            btn_Sell_Detail_Save();
            break;
    }
}

/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(param){
    var formObj=document.form;
    var ctrnm;
    if(param == "paramctr"){
    	var ctrnm = "?ctrt_nm=" + formObj.in_ctrt_nm.value;
    }else{
    	var ctrnm = "";
    }
    rtnary=new Array(2);
    rtnary[0]="";
    rtnary[1]= "";
    rtnary[2]=window;
    var params = ctrnm;
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt' + params, rtnary, 900, 580,"yes");
}

function setCtrtNoInfo(rtnVal){
//  var formObj=document.form;
//  ComSetObjValue(formObj.in_ctrt_no,          aryPopupData[0][0]);
//  ComSetObjValue(formObj.in_ctrt_nm,          aryPopupData[0][1]);
//  if (!ComIsEmpty(formObj.in_ctrt_no)){
//      btn_Search();
//  }
    var formObj=document.form;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");
        formObj.in_ctrt_no.value=rtnValAry[0];//full_nm
        formObj.in_ctrt_nm.value=rtnValAry[1];//full_nm
        if(!ComIsEmpty(formObj.in_ctrt_no)) {
            btn_Search();
        }
    }
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
    switch (sAction) {
        case 'Search':
            if (ComIsEmpty(formObj.in_ctrt_no)) {
                ComShowCodeMessage("COM0125","Contract No.");
                formObj.in_ctrt_no.focus();
                return false;
            }
            break;
        case 'lnk_Execl_DL':
            if (ComIsEmpty(formObj.ctrt_no)) {
                ComShowCodeMessage("COM0029");
                return false;
            }
            break;
        case 'in_ctrt_no':
            if (ComIsEmpty(formObj.in_ctrt_nm)) {
//              ComShowCodeMessage("COM0114","Contract No");
                formObj.in_ctrt_no.value="";
                formObj.in_ctrt_no.focus();
                return false;
            }
            break;
        case 'Sell_Main_Save':
            var prefix = "";
            for(var i=2;i<sheetObj.RowCount()+2;i++){
//              if(checkEffDate(sheetObj, i) == false)
//              {
//                  return false;
//              }
                if(getDaysBetween2(sheetObj.GetCellValue(i, prefix + "eff_fr_dt"), sheetObj.GetCellValue(i, prefix + "eff_to_dt"), 'ymd')<0){
                    ComShowCodeMessage("COM132002","Effective Date");
                    sheetObj.SetCellValue(i, prefix + "eff_fr_dt","")
                    sheetObj.SetCellValue(i, prefix + "eff_to_dt","")
                    sheetObj.SelectCell(i, prefix + "eff_fr_dt");
                    return false;
                }
                if(sheetObj.GetCellValue(i, prefix + "file_org_nm") != ""){
//                  if(sheetObj.GetCellValue(i, prefix + "nra_quote_no") == ""){
//                      ComShowCodeMessage("COM0114","NRA Quote No");
//                      sheetObj.SelectCell(i, prefix + "nra_quote_no");
//                      return false;
//                  }
                }
                if(sheetObj.GetCellValue(i, prefix + "ibflag") == "U"){
                    for(var j=0;j<sheetObj.LastCol()+1;j++){
                        //alert(sheetObj.ColSaveName(j));  accrual_cd  chk
                        if(sheetObj.ColSaveName(j) != prefix + "ibflag"
                            && sheetObj.ColSaveName(j) != prefix + "chk"
                            && sheetObj.ColSaveName(j) != prefix + "pub_dt"
                            && sheetObj.ColSaveName(j) != prefix + "pub_update_yn"
                            && sheetObj.ColSaveName(j) != prefix + "edit_yn"
                            && sheetObj.ColSaveName(j) != prefix + "upload_img"
                            && sheetObj.ColSaveName(j) != prefix + "commodity_desc"
                            && sheetObj.ColSaveName(j) != prefix + "ext_yn"){
                            //alert(sheetObj.ColSaveName(j));
                            if(sheetObj.GetCellValue(i, sheetObj.ColSaveName(j)) != sheetObj.CellSearchValue(i, sheetObj.ColSaveName(j))){
                                //alert(sheetObj.ColSaveName(j));
                                sheetObj.SetCellValue(i, prefix + "ext_yn","Y",0);
                            }
                        }
                    }
                }
            }
            
           //삭제된 행을 제외하고 중복 체크하기 - 서버단에서 체크하는걸로 수정
//		   var dupRow = sheetObj.ColValueDup("loc_cd", 0);
//		   if (dupRow != -1) {
//			   
//			   var selRow_sheet1=sheetObj.GetSelectRow();
//			   l_dupRow_sheet1 = selRow_sheet1; 
//			   
//			   var ctrt_no = formObj.ctrt_no.value;
//			   var loc_cd = sheetObj.GetCellValue(selRow_sheet1, prefix + "loc_cd");
//			   var eff_fr_dt = sheetObj.GetCellValue(selRow_sheet1, prefix + "eff_fr_dt");
//			   var eff_to_dt = sheetObj.GetCellValue(selRow_sheet1, prefix + "eff_to_dt");
//			   
//			   ajaxSendPost(resultDupRateMainMgmt_sheet1, 'reqVal', '&goWhere=aj&bcKey=searchDupRateMainMgmt&ctrt_no='+ctrt_no 
//					   + '&loc_cd='+loc_cd + '&eff_fr_dt='+eff_fr_dt + '&eff_to_dt='+eff_to_dt, './GateServlet.gsl');
//
//			}
            
            break;
        case 'Sell_Detail_Save': //mjy
//            var info=sell_filer.GetSelectCode().split("^");
//            if(info.length <= 1)
//            {
//                return;
//            }
            //Warehouse일경우에만 check
//            if(info[1] == "W")
//            {
                var sheetObj2=sheet2;
                var prefix="Grd02";
                var arr_rate_tp_cd_str=new Array();
                
                for(var i=2;i<sheetObj2.RowCount()+2;i++){
                    if(sheetObj2.GetRowStatus(i) != "D")
                    {
                        //--필수조건 체크
                        //office
                        if(sheetObj2.GetCellValue(i, prefix + "ofc_cd").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Office");
                            sheetObj2.SelectCell(i, prefix +  "ofc_cd");
                            return false;
                        }
                        //customer
                        if(sheetObj2.GetCellValue(i, prefix + "cust_cd").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Customer");
                            sheetObj2.SelectCell(i, prefix +  "cust_cd");
                            return false;
                        }
                        //customer
                        if(sheetObj2.GetCellValue(i, prefix + "bill_cd").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Billing Item");
                            sheetObj2.SelectCell(i, prefix +  "bill_cd");
                            return false;
                        }
                        //type
                        var rate_tp_cd=sheetObj2.GetCellValue(i, prefix + "rate_tp_cd");
                        if(rate_tp_cd.trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Type");
                            sheetObj2.SelectCell(i, prefix +  "rate_tp_cd");
                            return false;
                        }
                        if(sheetObj2.GetCellValue(i, prefix + "rate_tp_cd") == "STR")
                        {
                            if(arr_rate_tp_cd_str.contains(sheetObj2.GetCellValue(i, prefix + "cond_first")) == false)
                            {
                                arr_rate_tp_cd_str.push(sheetObj2.GetCellValue(i, prefix + "cond_first"));
                            }
                        }
                        //Freight
                        if(sheetObj2.GetCellValue(i, prefix + "frt_cd").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Freight");
                            sheetObj2.SelectCell(i, prefix +  "frt_cd");
                            return false;
                        }
                        //Freight Name
                        if(sheetObj2.GetCellValue(i, prefix + "frt_nm").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Freight Name");
                            sheetObj2.SelectCell(i, prefix +  "frt_nm");
                            return false;
                        }
                        //unit
                        if(sheetObj2.GetCellValue(i, prefix + "unit_cd").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Unit");
                            sheetObj2.SelectCell(i, prefix +  "unit_cd");
                            return false;
                        }
                        //Unit2
        				if(sheetObj2.GetCellValue(i, prefix + "unit_cd").trim() != "")
        				{
        					if (sheetObj2.GetCellValue(i, prefix + "unit_cd")!="ODR" && sheetObj2.GetCellValue(i, prefix + "unit_cd")!="HOR") {
        						if(sheetObj2.GetCellValue(i, prefix + "unit_cd2").trim() == ""){
        							ComShowCodeMessage("COM0278","Unit2");
        							sheetObj2.SelectCell(i, prefix +  "unit_cd2");
        							return false;
        						}
        					}
        				}
                        //curr_cd
                        if(sheetObj2.GetCellValue(i, prefix + "curr_cd").trim() == "")
                        {
                            ComShowCodeMessage("COM0005","Currency");
                            sheetObj2.SelectCell(i, prefix +  "curr_cd");
                            return false;
                        }
                        //Effective Date
                        if(sheetObj2.GetCellValue(i, prefix + "eff_fr_dt").trim() == "")
                        {
                        	ComShowCodeMessage("COM0005","Effective Date");
                        	sheetObj2.SelectCell(i, prefix +  "eff_fr_dt");
                        	return false;
                        }
                        if(sheetObj2.GetCellValue(i, prefix + "eff_to_dt").trim() == "")
                        {
                        	ComShowCodeMessage("COM0005","Effective Date");
                        	sheetObj2.SelectCell(i, prefix +  "eff_to_dt");
                        	return false;
                        }
                        
    					if(sheetObj2.GetCellValue(i, prefix + "unit_price").trim() == "0")
    					{
    						ComShowCodeMessage("COM0278","Rate");
    						sheetObj2.SelectCell(i, prefix +  "unit_price");
    						return false;
    					}
                        
                        if(getDaysBetween2(sheetObj2.GetCellValue(i, prefix + "eff_fr_dt"), sheetObj2.GetCellValue(i, prefix + "eff_to_dt"), 'ymd')<0){
                            ComShowCodeMessage("COM132002","Effective Date");
                            sheetObj2.SetCellValue(i, prefix + "eff_fr_dt","")
                            sheetObj2.SetCellValue(i, prefix + "eff_to_dt","")
                            sheetObj2.SelectCell(i, prefix + "eff_fr_dt");
                            return false;
                        }
                        
                        // 상단Sheet와의 Effective Date 범위 체크
                        
//                        var sheet1_selRow=sheet1.GetSelectRow();
                        // SearchText와 전체가 같은 행을 찾는다.
                        var sell_filer = formObj.sell_filer.value
                        var arrSell_filer = sell_filer.split("^");
                        var sheet1_selRow = sheet1.FindText("rate_no", arrSell_filer[0], 0, -1, 1);
                        if (!ComIsNull(sheet1_selRow)) {
	                        if(getDaysBetween2(sheet1.GetCellValue(sheet1_selRow, "eff_fr_dt"), sheetObj2.GetCellValue(i, prefix + "eff_fr_dt"), 'ymd')<0){
	//                        	ComShowCodeMessage("COM132003","The effective from date of 'Rate Detail Information'","'Rate Basic Information'" );
	                        	ComShowCodeMessage("COM0814","The effective date of 'Rate Detail Information'","that 'Rate Basic Information'");
	                        	sheetObj2.SetCellValue(i, prefix + "eff_fr_dt","")
	                        	sheetObj2.SelectCell(i, prefix + "eff_fr_dt");
	                        	return false;
	                        }
	                        if(getDaysBetween2(sheet1.GetCellValue(sheet1_selRow, "eff_to_dt"), sheetObj2.GetCellValue(i, prefix + "eff_to_dt"), 'ymd')>0){
	//                        	ComShowCodeMessage("COM132003","The effective to date of 'Rate Basic Information'", "Rate Detail Information");
	                        	ComShowCodeMessage("COM0814","The effective date of 'Rate Detail Information'","that 'Rate Basic Information'");
	                        	sheetObj2.SetCellValue(i, prefix + "eff_to_dt","")
	                        	sheetObj2.SelectCell(i, prefix + "eff_to_dt");
	                        	return false;
	                        }
                        }
                    }
                }
                
                /*
                // Handling or Package Unit 동일 Billing코드인지 확인
                var chk_hut_frt_cd = "";
                // Handing Unit 의 Billing Code 중복 체크 
                for(var i=2;i<sheetObj2.RowCount()+2;i++){
                	
                    if(sheetObj2.GetRowStatus(i) != "D" && sheetObj2.GetCellValue(i, prefix + "unit_cd").trim() == "HUT") 
                    {
                    	
                    	if(chk_hut_frt_cd != "" && chk_hut_frt_cd != sheetObj2.GetCellValue(i, prefix + "frt_cd").trim())
                    	{
                    		ComShowCodeMessage("COM131302", "Handling Unit");
                    		sheetObj2.SelectCell(i, prefix +  "frt_cd");
                    		return false;
                    	}
                    	
                    	chk_hut_frt_cd = sheetObj2.GetCellValue(i, prefix + "frt_cd");
                    }
                }
                
                var chk_put_frt_cd = "";
                // Package Unit 의 Billing Code 중복 체크 
                for(var i=2;i<sheetObj2.RowCount()+2;i++){
                	
                	if(sheetObj2.GetRowStatus(i) != "D" && sheetObj2.GetCellValue(i, prefix + "unit_cd").trim() == "PUT") 
                	{
                		
                		if(chk_put_frt_cd != "" && chk_put_frt_cd != sheetObj2.GetCellValue(i, prefix + "frt_cd").trim())
                		{
                			ComShowCodeMessage("COM131302", "Package Unit");
                			sheetObj2.SelectCell(i, prefix +  "frt_cd");
                			return false;
                		}
                		
                		chk_put_frt_cd = sheetObj2.GetCellValue(i, prefix + "frt_cd");
                	}
                }
                */

            break;
    }
    return l_chkReturn;
}
function checkEffDate(sheetObj, Row)
{
    var prefix = "";
    //MJY
    //Freight Mode가 WAREHOUSE일경우 Effective Date 필수 및 중복허용안함
    if(sheetObj.GetCellValue(Row, prefix + "frt_mode") == "W"){
        var fr_dt=sheetObj.GetCellValue(Row, prefix + "eff_fr_dt");
        var to_dt=sheetObj.GetCellValue(Row, prefix + "eff_to_dt");
        var branch=sheetObj.GetCellValue(Row, prefix + "branch").trim();
        if(branch == ""){branch=$("#org_cd").val()}
        if(fr_dt == ""){
            ComShowCodeMessage("COM0114","Effective Date(From)");
            sheetObj.SelectCell(Row, prefix + "eff_fr_dt");
            return false;
        }
        if(to_dt == ""){
            ComShowCodeMessage("COM0114","Effective Date(To)");
            sheetObj.SelectCell(Row, prefix + "eff_to_dt");
            return false;
        }
        if(getDaysBetween2(fr_dt, to_dt) < 0){
            ComShowCodeMessage("COM0122","Effective Date");
            sheetObj.SelectCell(Row, prefix + "eff_to_dt");
            return false;
        }
        for(var m=2; m<sheetObj.RowCount()+2;m++){
            /*var dif_branch=sheetObj.GetCellValue(m, prefix + "branch").trim();
             if(dif_branch == ""){
             dif_branch=$("#org_cd").val();
             }*/
            if(m != Row //현재행은 패스
                && sheetObj.GetCellValue(m, prefix + "frt_mode") == "W"  //warehouse만
                    //&& branch == dif_branch //동일branch
                && sheetObj.GetRowStatus(m) != "D"
                && sheetObj.GetCellValue(m, prefix + "loc_cd") == sheetObj.GetCellValue(Row, prefix + "loc_cd")
            ) //삭제행이 아닐경우만
            {
                var dif_fr_dt=eval(sheetObj.GetCellValue(m, prefix + "eff_fr_dt"));
                var dif_to_dt=eval(sheetObj.GetCellValue(m, prefix + "eff_to_dt"));
                var msgDate=sheetObj.GetCellValue(m, prefix + "eff_fr_dt").substring(0,4) + "-" + sheetObj.GetCellValue(m, prefix + "eff_fr_dt").substring(4,6)+ "-" + sheetObj.GetCellValue(m, prefix + "eff_fr_dt").substring(6)
                    + "~"
                    + sheetObj.GetCellValue(m, prefix + "eff_to_dt").substring(0,4) + "-" + sheetObj.GetCellValue(m, prefix + "eff_to_dt").substring(4,6)+ "-" + sheetObj.GetCellValue(m, prefix + "eff_to_dt").substring(6)
                if(fr_dt >= dif_fr_dt && fr_dt <= dif_to_dt)
                {
                    ComShowCodeMessage("COM0383",Row-1, m-1, msgDate);
                    sheetObj.SelectCell(i, prefix + "eff_fr_dt");
                    return false;
                }
                if(to_dt >= dif_fr_dt && to_dt <= dif_to_dt)
                {
                    ComShowCodeMessage("COM0383",Row-1, m-1, msgDate);
                    sheetObj.SelectCell(i, prefix + "eff_to_dt");
                    return false;
                }
                if(fr_dt < dif_fr_dt && dif_to_dt < to_dt)
                {
                    ComShowCodeMessage("COM0383",Row-1, m-1, msgDate);
                    sheetObj.SelectCell(i, prefix + "eff_to_dt");
                    return false;
                }
            }
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
            case "in_ctrt_no" :
                if (!ComIsNull(srcValue)){
                    val="ctrt_no="+formObj.in_ctrt_no.value;
                    searchTlCtrtInfo(formObj, val,"ctrt_no");
                } else {
                    formObj.in_ctrt_nm.value="";
                }
                break;
            case "in_ctrt_nm" :
                formObj.in_ctrt_no.value="";
                var sUrl="ContractRoutePopup.clt?ctrt_no="+ComGetObjValue(formObj.in_ctrt_no)+"&ctrt_nm="+ComGetObjValue(formObj.in_ctrt_nm);
                ComOpenPopup(sUrl, 900, 580, "setCtrtNoInfo", "0,0", true);
                break;
        }
    }
    return true;
}
function form_onChange() {
    var formObj=document.form;
    var srcName=ComGetEvent("name");
    var srcValue=ComGetEvent("value");
    var val="";
    switch(srcName) {
        case "in_ctrt_no" :
            if (!ComIsNull(srcValue)){
                val="ctrt_no="+formObj.in_ctrt_no.value ;
                searchTlCtrtInfo(formObj, val,"in_ctrt_no");
            } else {
                formObj.in_ctrt_nm.value="";
            }
            break;
        case "in_ctrt_nm" :
            formObj.in_ctrt_no.value="";
            break;
    }
}
function searchTlCtrtInfo(formObj,value,col_nm){
    /*$.ajax({
     url : "searchTlCtrtInfo.clt?"+value,
     success : function(result) {
     resultTlCtrtInfo(result.xml,col_nm);
     }
     });*/
    //var sXml=sheet1.GetSearchData("searchTlCtrtInfo.clt?"+value);
    //resultTlCtrtInfo(sXml,col_nm);
	if(value!=""){
		ajaxSendPost(resultTlCtrtInfo, col_nm, '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+value, './GateServlet.gsl');
	}else{
		formObj.in_ctrt_nm.value = "";
	}
}
function resultTlCtrtInfo(reqVal,col_nm){
    var formObj=document.form;
    var doc=getAjaxMsgXML(reqVal);
    var formObj=document.form;
    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                formObj.in_ctrt_nm.value=rtnArr[0];
                if( col_nm == "ctrt_no" ){
                    btn_Search();
                }
            }
            else{
                formObj.in_ctrt_no.value="";
                formObj.in_ctrt_nm.value="";
            }
        }
        else{
            formObj.in_ctrt_no.value="";
            formObj.in_ctrt_nm.value="";
        }
    }
}
function btn_Sell_Main_Add(){

    var formObj=document.form;
    var sheetObj=sheet1;

    var prefix = "";

    if ( !sell_Detail_Check() ){
        return ;
    }

    var row=sheetObj.DataInsert(sheetObj.HeaderRows() + sheetObj.RowCount());
    //var row=sheetObj.DataInsert(-1);
    sheetObj.SetCellValue(row,"ctrt_no",formObj.ctrt_no.value);
    sheetObj.SetCellValue(row,"loc_cd",formObj.def_wh_cd.value);
    sheetObj.SetCellValue(row,"sb_cls_cd","S");
    sheetObj.SetCellEditable(row,"frt_mode",true);
    //comboObjects[2].SetSelectCode("");
//    frt_mode(docObjects[0], row, "S");
    // Freight 모드 warehouse로 고정
    sheetObj.SetCellValue(row,prefix+"frt_mode","W");
    //sheetObj.SetImageList(0, APP_PATH + "/web/img/main/icon_search.gif");
    sheetObj.SetCellImage(row, "upload_img",0);

    if(formObj.auth_lvl.value != "HQ"){
        sheetObj.SetCellEditable(row, "pub_dt",0);
    }

    formObj.sell_filer.value = "";
    sheet2.RemoveAll();
    detail_button("N", "A");

    //sheetObj.SetCellValue(row,prefix+"ctrt_no",formObj.ctrt_no.value);
    //sheetObj.SetCellValue(row,prefix+"sb_cls_cd","S");
    ///sheetObj.SetCellValue(row,prefix+"frt_mode","W");

//  sheetObj.SetCellEditable(row,prefix+"frt_mode",true);
//  comboObjects[2].SetSelectCode("");

    //frt_mode(sheetObj, row, "S");
    // sheetObj.SetImageList(0,"./web/images/common/icon_search.gif");
    //sheetObj.SetImageList(0,APP_PATH + "/web/img/button/icon_search.gif");
    //sheetObj.SetCellImage(row, prefix+"commodity_desc_pop",0);

//    if(formObj.auth_lvl.value != "HQ"){
//      sheetObj.SetCellEditable(row, prefix+"pub_dt",0);
//  }
}
function btn_Sell_Main_Del(){

    var formObj=document.form;

    var prefix = "";

    var sRow=sheet1.FindCheckedRow(prefix + "chk");

    if (sRow == "") {
        ComShowCodeMessage("COM12189");// COM0254
        return ;
    }
    if ( !sell_Detail_Check() ){
        return ;
    }
    if (ComShowCodeConfirm("COM0290")){
        //가져온 행을 배열로 만들기
        var del_arr=new Array();
        var arrRow=sRow.split("|"); //결과 : "1|3|5|"
        //역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
        for (var idx=arrRow.length-1; idx>=0; idx--){
            var row=arrRow[idx];
            del_arr.push(sheet1.GetCellValue(row, prefix + "rate_no"));
            sheet1.SetRowStatus(row,"D");
        }
        formObj.f_cmd.value = MODIFY01;
        SEARCH_TYPE = 1;
        var sParm=FormQueryString(formObj);
        sParm=sParm + "&" + sheet1.GetSaveString();
        var saveXml=sheet2.GetSaveData("./RateMgmtGS.clt", sParm);

        doShowProcess();

        //I don't understand this code while sheet2 will be loaded below

//      $sheet2XML = $($.parseXML(saveXml)).find('SHEET2');
//      sheet2.LoadSearchData($sheet2XML[0].innerHTML);
        // ==================================================
//
        if( saveXml.indexOf('<ERROR>') == -1){
//          for (idx=arrRow.length-2; idx>=0; idx--){
//              row=arrRow[idx];
//              sheet1.RowDelete(row, false);
//          }
//          ComShowCodeMessage("COM0093", "");
//          //콤보박스 재설정(삭제된rateno는 리스트에서 빼주는 작업)
//          for (var idx=0; idx<del_arr.length; idx++)
//          {
//              var itemindex = comboFindItemByName("sell_filer", del_arr[idx]);
//
//              if (itemindex != -1)
//              {
//                  formObj.sell_filer.remove(itemindex);
//              }
//          }
//
//          formObj.sell_filer.value = "A";
//
//          sParm="ctrt_no="+formObj.ctrt_no.value+"&sb_cls_cd=S&org_cd="+formObj.org_cd.value+"&auth_lvl="+formObj.auth_lvl.value + "&f_cmd="+SEARCH02;
//
//          detail_button("N", "S");
//
//          //Sheet를 ALL형태(모든 필드 다보이게끔)
//          sheetDtlGetColHiddenForWarehouseCol(sheet2, false, true);
//
//          var sXml = sheet2.GetSearchData("/RateMgmtGS.clt", sParm);
//
//          if(sxml.indexOf('<ERROR>') == -1){
//
//              $sheet2XML = $($.parseXML(sxml)).find('SHEET2');
//
//              sheet2.LoadSearchData($sheet2XML[0].innerHTML);
//          }

//          ComShowCodeMessage("COM0093", "");
            //Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
            showCompleteProcess();

            /*$sheet1XML = $($.parseXML(saveXml)).find('SHEET1');

             sheet1.LoadSearchData($sheet1XML[0].innerHTML);*/

            searchDataSheet(sheet1, saveXml, 'SHEET1');
        }
        doHideProcess();
    }
}
function btn_Sell_Main_Copy(){

    var formObj=document.form;
    var sheetObj=sheet1;

    var prefix = "";

    if (sheetObj.CheckedRows(prefix + "chk") == 1) {
        if ( !sell_Detail_Check() ){
            return ;
        }

        var copyRow=sheetObj.FindCheckedRow(prefix + "chk");
        var row=sheetObj.DataInsert(-1);
        var arrRow=copyRow.split("|");

        for(var i=2;i<sheetObj.LastCol();i++){
            if ( i != 4 ){
                sheetObj.SetCellValue(row,i,sheetObj.GetCellValue(arrRow[0],i),0);
            }
        }

        sheetObj.SetCellValue(row,prefix + "ctrt_no",formObj.ctrt_no.value);
        sheetObj.SetCellValue(row,prefix + "sb_cls_cd","S");

        //comboObjects[2].SetSelectCode("");
        formObj.sell_filer.value = "";

        frt_mode(sheetObj, row, sheetObj.GetCellValue(row,prefix + "frt_mode"));

//      sheetObj.SetCellValue(row,prefix + "nra_quote_no","",0);
//      sheetObj.SetCellValue(row,prefix + "file_org_nm","",0);
//      sheetObj.SetCellValue(row,prefix + "upload_img","",0);
//      sheetObj.SetCellValue(row,prefix + "doc_no","",0);
//      sheetObj.SetCellValue(row,prefix + "file_path","",0);
//      sheetObj.SetCellValue(row,prefix + "file_sys_nm","",0);
        //sheetObj.SetCellImage(row, prefix + "upload_img","");
        sheetObj.SetCellValue(row, prefix + "pub_dt","",0);
        //sheetObj.SetCellValue(row, prefix + "pub_update_dt","",0);
        //sheetObj.SetImageList(0,"./web/images/common/icon_search.gif");
        // sheetObj.SetCellImage(row, prefix + "commodity_desc_pop",0);
//      if(formObj.auth_lvl.value != "HQ"){
        sheetObj.SetCellEditable(row, prefix + "pub_dt",0);
//      }

        sheet2.RemvoveAll();
        formObj.sell_filer.value = "";
    } else {
//      ComShowCodeMessage("COM0254");
        ComShowCodeMessage("COM12177");
    }
}

function btn_Sell_Main_Copy_All(){
    var formObj=document.form;
    var sheetObj=sheet1;

    var prefix = "";

    if (sheetObj.CheckedRows(prefix + "chk") == 1) {
        if ( !sell_Detail_Check() ){
            return ;
        }

        if (ComShowCodeConfirm("COM0273")){
            var copyRow=sheetObj.FindCheckedRow(prefix + "chk");
            var arrRow=copyRow.split("|");
//          var prefix=prefix + "";
            var sParm="in_ctrt_no="+sheetObj.GetCellValue(arrRow[0],prefix+"ctrt_no")+"&in_sb_cls_cd="+sheetObj.GetCellValue(arrRow[0],prefix+"sb_cls_cd")
                    + "&in_rate_no="+sheetObj.GetCellValue(arrRow[0],prefix+"rate_no")
                    + "&org_cd="+formObj.org_cd.value+"&user_id="+formObj.user_id.value+"&auth_lvl="+formObj.auth_lvl.value
                    + "&sell_br_filer=ALL&buy_br_filer=ALL"
                    + "&f_cmd=" + MODIFY02
                ;
            doShowProcess();
            var saveXml=sheet1.GetSaveData("./RateMgmtGS.clt", sParm);
            doHideProcess();
            //sheet1.LoadSaveData(saveXml);
            if( saveXml.indexOf('<ERROR>') == -1){
//              ComShowCodeMessage("COM0093", "");
                //Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
                showCompleteProcess();
                if (!ComIsEmpty(formObj.ctrt_no)) {
                    formObj.in_ctrt_no.value=formObj.ctrt_no.value;
                    formObj.in_ctrt_nm.value=formObj.ctrt_nm.value;
                }

                SEARCH_TYPE = 1;

                searchDataSheet(sheet1, saveXml, 'SHEET1');
//              btn_Search();
            }
        }
    } else {
        ComShowCodeMessage("COM12177");
    }
}
function btn_Sell_Main_Save(){
    var formObj=document.form;
    if (  sheet1.RowCount("I")+sheet1.RowCount("U")+sheet1.RowCount("D") <= 0 ){
        ComShowCodeMessage("COM0409");
        return ;
    }

    if (validateForm(sheet1,formObj,'Sell_Main_Save')) {
        var sParam=ComGetSaveString(sheet1);
        if (sParam == "") {
            return; }

        if (ComShowCodeConfirm("COM130101")){

            doShowProcess();

            formObj.f_cmd.value = MODIFY01;
            SEARCH_TYPE = 1;

            var sParm=FormQueryString(formObj,"Grd00");

            sParm=sParm + "&" + sheet1.GetSaveString(true);
            var saveXml=sheet1.GetSaveData("saveRTMainList.clt", sParm);
            sheet1.LoadSaveData(saveXml);
            doHideProcess();

            if( saveXml.indexOf('<ERROR>') == -1){
            	
            	// SAVE OK
            	if (sheet1.GetEtcData("mess") == "OK") {
            		searchDataSheet(sheet1, saveXml, 'SHEET1');
            		showCompleteProcess();
            		
            		if (!ComIsEmpty(formObj.ctrt_no)) {
            			formObj.in_ctrt_no.value=formObj.ctrt_no.value;
            			formObj.in_ctrt_nm.value=formObj.ctrt_nm.value;
            		}
            		btn_Search();
            	}else{
            		// Effective Date 범위 체크
            		if (sheet1.GetEtcData("mess") == "EffFail") {
	            		ComShowCodeMessage("COM0814","The effective date of 'Rate Detail Information'","that 'Rate Basic Information'");
	            		var dup_row =  Number(sheet1.GetEtcData("dupRow")) + 2;
	            		sheet1.SelectCell(dup_row  , "eff_to_dt");
	            	// 중복 체크
            		} else {
	            		alert(getLabel('FMS_COM_ALT008'));
	            		var dup_row =  Number(sheet1.GetEtcData("dupRow")) + 2;
	            		sheet1.SelectCell(dup_row  , "eff_to_dt");
            		}
            	}
            }
        }
    }
}


function btn_Sell_Detail_Add(){
    var formObj=document.form;
//  if (sheet2.CheckedRows('Grd01chk')<1){
//      ComShowCodeMessage("COM0170");
//      return ;
//  }
    
    var row=sheet2.DataInsert(sheet2.HeaderRows() + sheet2.RowCount());
    sheet2.SetCellValue(row,"Grd02frt_mode","W");
    sheet2.SetCellValue(row,"Grd02ctrt_no",formObj.ctrt_no.value,0);
    sheet2.SetCellValue(row,"Grd02sb_cls_cd","S",0);
//    sheet2.SetCellValue(row,"Grd02ofc_cd",formObj.org_cd.value);
//    sheet2.SetCellValue(row,"Grd02ofc_cd",formObj.wh_ofc_cd.value,0);
    //mjy
    var rate_no=formObj.sell_filer.value.split("^");
    sheet2.SetCellValue(row,"Grd02rate_no",rate_no[0],0);
    if(rate_no[1] == "W"){
        sheet2.SetCellValue(row,"Grd02rate_tp_cd"," ");
    }
    sheet2.SetCellValue(row, "Grd02frt_mode",rate_no[1],0);
    sheet2.SetCellValue(row, "Grd02fix_rate_flg","N");
    
    if (row > 2) {
    	sheet2.SetCellValue(row, "Grd02curr_cd",sheet2.GetCellValue(row-1, "Grd02curr_cd"));
    	sheet2.SetCellValue(row,"Grd02ofc_cd",sheet2.GetCellValue(row-1, "Grd02ofc_cd"));
    } else {
    	sheet2.SetCellValue(row,"Grd02ofc_cd",formObj.wh_ofc_cd.value,0);
    	sheet2.SetCellValue(row,"Grd02curr_cd",formObj.wh_curr_cd.value,0);
    }
    
    var selRow=sheet1.GetSelectRow();
    sheet2.SetCellValue(row, "Grd02cust_cd",formObj.ctrt_cust_cd.value);
    sheet2.SetCellValue(row, "Grd02eff_fr_dt",sheet1.GetCellValue(selRow, "eff_fr_dt"));
    sheet2.SetCellValue(row, "Grd02eff_to_dt",sheet1.GetCellValue(selRow, "eff_to_dt"));
    
//    sheet2.InitComboNoMatchText(1, "",1);

    // SKU ComboList조회
 	var p_ctrt_no = sheet1.GetCellValue(selRow, "ctrt_no");
 	var p_wh_cd = sheet1.GetCellValue(selRow, "loc_cd");
 	sheet2Row = row;
 	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
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
				sheet2.CellComboItem(sheet2Row,"Grd02item_cd",{ComboText:rtnArr[0], ComboCode:rtnArr[1]} );
			}
		}
	}
}

function btn_Sell_Detail_Del(){
    var sheetObj=sheet2;
    if (sheetObj.CheckedRows("Grd02chk") != 0) {
        if(sheetObj.RowCount()> 0){
            ComRowHideDelete(sheetObj,"Grd02chk",true);
        }
    } else {
        ComShowCodeMessage("COM12189");
    }
}

function btn_Sell_Detail_Copy(){
    var formObj=document.form;
    var sheetObj=sheet2;
    if (sheetObj.CheckedRows("Grd02chk") == 1) {
        var copyRow=sheetObj.FindCheckedRow("Grd02chk");
        var row=sheetObj.DataInsert(-1);
        var arrRow=copyRow.split("|");
        // SKU ComboList조회
     	var p_ctrt_no = sheet1.GetCellValue(arrRow[0], "ctrt_no");
     	var p_wh_cd = sheet1.GetCellValue(arrRow[0], "loc_cd");
     	sheet2Row = row;
     	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');
     	//end
        //mjy
        var endIndex=sheetObj.SaveNameCol("Grd02frt_mode")+1;
        for(var i=2;i<endIndex;i++){
            if ( sheetObj.ColSaveName(i) != "Grd02rate_seq" ){ //[5] --> rate_seq
                if(sheetObj.ColSaveName(i) == "Grd02rate_tp_cd" || sheetObj.ColSaveName(i) == "Grd02cond_first")
                {
                    sheetObj.SetCellValue(row,i,sheetObj.GetCellValue(arrRow[0],i));
                    if(sheetObj.ColSaveName(i) == "Grd02rate_tp_cd" && sheetObj.GetCellValue(arrRow[0],i).trim().length <= 1)
                    {
                        rate_tp_cd_rate_editable(sheetObj, row, sheetObj.GetCellValue(arrRow[0],i), "Grd02", false);
                    }
                }
                else
                {
                    sheetObj.SetCellValue(row,i,sheetObj.GetCellValue(arrRow[0],i),0);
                }
                
                if(sheetObj.ColSaveName(i) == "Grd02unit_cd"){
                	sheet2_OnChange(sheetObj, row, i, sheetObj.GetCellValue(arrRow[0],i));
                }
            }
        }
        //후처리
        if(sheetObj.GetCellValue(row,"Grd02fix_rate_flg") == "N" && sheetObj.GetCellValue(row,"Grd02frt_mode") == "W")
        {
            sheetObj.SetCellEditable(row, "Grd02frt_nm",0);
        }
        else
        {
            sheetObj.SetCellEditable(row, "Grd02frt_nm",1);
        }
        
        //#1386 [WMS4.0] Sales > Rate > Rate - In & Out [History] Error
        //copy후  카피대상 Status가 update상태로변경되기때문에 체크 해제
        sheetObj.SetCellValue(copyRow,'Grd02chk',0); 
        
    } else {
        ComShowCodeMessage("COM12177");
    }
}
function btn_Sell_Detail_Save(){
    var formObj=document.form;

//    if(sheet2.RowCount('I') > 0 || sheet2.RowCount('U') > 0 || sheet2.RowCount('D') > 0){
    if (sheet2.IsDataModified()) {
        if (ComShowCodeConfirm("COM130101")){
            sell_Detail_Save();
        }
    }else{
        ComShowCodeMessage("COM0409");
    }
}
function sell_Detail_Save(){
	var formObj=document.form;
    if (validateForm(sheet2,formObj,'Sell_Detail_Save')) {

        formObj.f_cmd.value = MODIFY;

        var sParm=FormQueryString(formObj);

        //  sParm = sParm + "&" + ComGetSaveString(sheet2, true, true, 'ibflag');

    	var selRow=sheet1.GetSelectRow();
    	var p_wh_cd = sheet1.GetCellValue(selRow, "loc_cd");
        sParm=sParm + "&wh_cd=" + p_wh_cd + "&" + sheet2.GetSaveString(true);

        doShowProcess();

        var saveXml=sheet2.GetSaveData("./RateMgmtGS.clt", sParm);
        sheet2.LoadSaveData(saveXml);
        doHideProcess();

        //sheet2.LoadSaveData(saveXml);

        if( saveXml.indexOf('<ERROR>') == -1){

        	// SAVE OK
        	if (sheet2.GetEtcData("mess") == "OK") {
        		showCompleteProcess();
        		sell_filer_OnChange();
        	}else{
    			alert(getLabel('FMS_COM_ALT008'));
    			var dup_row =  Number(sheet2.GetEtcData("dupRow")) + 2;
    			sheet2.SelectCell(dup_row  , "Grd02eff_to_dt");
        	}
        } else {
            return false;
        }
    } else {
        return false;
    }

    return true;
}


function sheet1_OnSearchEnd(sheetObj, ErrMsg) {

    var formObj=document.form;
    var prefix="";

    //============================================================================================
    if(SEARCH_TYPE == 1){
        SEARCH_TYPE = -1;
        comboRemoveAll("sell_filer");
        initCombo(formObj.sell_filer);
        for(i = sheet1.HeaderRows(); i < sheet1.RowCount() + sheet1.HeaderRows() ; i++){
            //mjy
            comboAddItem("sell_filer", sheet1.GetCellValue(i,prefix + "rate_no")+ "^" + sheet1.GetCellValue(i,prefix + "frt_mode"), sheet1.GetCellValue(i,prefix + "rate_no") );
            frt_mode(sheet1,i,sheet1.GetCellValue(i,prefix + "frt_mode"));
            sheet1.SetCellImage(i, "upload_img", 0);
        }

        comboRemoveAll("sell_br_filer");
        comboAddItem("sell_br_filer", "ALL", "ALL");
        var sell_br_list="";
        for(i=sheet1.HeaderRows();i<sheet1.RowCount()+sheet1.HeaderRows();i++){
            if(comboFindItemByName("sell_br_filer", sheet1.GetCellValue(i,prefix + "branch")) < 0){
                sell_br_list=sell_br_list + "," + sheet1.GetCellValue(i,prefix + "branch");
                comboAddItem("sell_br_filer", sheet1.GetCellValue(i,prefix + "branch"), sheet1.GetCellValue(i,prefix + "branch"));
            }
        }
        formObj.sell_pub_filer.value = "ALL";
        main_button("Y");
        detail_button("N","A");
    }

    if(sheet1.RowCount() > 0){
        sheet1_OnDblClick(sheet1,2,4);
    }

    //============================================================================================
//  sheetObj.SetImageList(0,"./web/images/common/icon_file.gif");
//  sheetObj.SetImageList(1,"./web/images/common/icon_search.gif");

    var rowcnt=sheetObj.RowCount();

//  for ( var i=2; i <= rowcnt + 1 ; i++){
//      var rate_no=sheetObj.GetCellValue(i, prefix+"rate_no");
//      if(rate_no != ""){
//          sheetObj.SetCellImage(i, prefix+"upload_img",0);
//      }else{
//          sheetObj.SetCellImage(i, prefix+"upload_img","");
//      }
//      sheetObj.SetCellImage(i, prefix+"commodity_desc_pop",1);
//      if(sheetObj.GetCellValue(i, prefix+"file_org_nm") != ""){
//          sheetObj.SetCellEditable(i, prefix+"nra_quote_no",1);
//      }else{
//          sheetObj.SetCellEditable(i, prefix+"nra_quote_no",0);
//      }
//  }

    if(formObj.ctrt_no.value == "CTSEL00000"){
        sheetObj.SetColHidden(prefix+"pub_dt",0);
        sheetObj.SetColHidden(prefix+"pub_update_dt",0);
//      if(formObj.auth_lvl.value != "HQ"){
        for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
            sheetObj.SetCellEditable(i, prefix+"pub_dt",0);
        }
//      }
    }else{
        sheetObj.SetColHidden(prefix+"pub_dt",1);
        sheetObj.SetColHidden(prefix+"pub_update_dt",1);
    }

//  if(formObj.auth_lvl.value != "HQ"){
    for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
        if(sheetObj.GetCellValue(i,prefix+"rate_no") != "" && (sheetObj.GetCellValue(i,prefix+"pub_dt") != "" || sheetObj.GetCellValue(i,prefix+"branch") != formObj.org_cd.value)){
            sheetObj.SetRowEditable(i,0);
            sheetObj.SetCellValue(i,prefix+"edit_yn","N",0);
            sheetObj.SetRowStatus(i,"R");//MJY 추가-EDIT_YN의 값을 바꾸면서 수정모드로 바뀌므로, 읽기모드로 변경
        }
    }
//  }

    for(var i = sheet1.HeaderRows(); i < sheet1.HeaderRows() + sheet1.RowCount(); i++){
        sheet1.SetCellValue(i,"ibflag","R",0);
    }
}
var rows1;
var cols1;
function sheet1_OnChange(sheetObj, Row, Col, Value){
    var prefix="";
    var sXml="";
    var sParm="";
    var srcName=sheetObj.ColSaveName(Col);
    switch (srcName) {
        case prefix+"frt_mode":
            frt_mode(sheetObj, Row, Value);
            break;
        case prefix+"por":
        case prefix+"pol":
        case prefix+"pod":
        case prefix+"del":
        case prefix+"departure_cd":
        case prefix+"arrival_cd":
        case prefix+"origin_loc_cd":
        case prefix+"dest_loc_cd":
            if(!ComIsNull(Value)){
            	rows1 = Row;
            	cols1 = Col;
//                sParm="grp_cd="+sheetObj.GetCellValue(Row,prefix+"frt_mode")+"&code_cd="+Value;
                ajaxSendPost(locationCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+Value+'&air_sea_clss_cd='+sheetObj.GetCellValue(Row,prefix+"frt_mode"), "./GateServlet.gsl");
            } else {
                sheetObj.SetCellValue(Row,Col+1,"",0);
            }
            break;
        case prefix+"pub_dt":
            if(sheetObj.GetCellValue(Row, prefix+"pub_dt") == sheetObj.CellSearchValue(Row, prefix+"pub_dt")){
                sheetObj.SetCellValue(Row, prefix+"pub_update_yn","",0);
            }else{
                sheetObj.SetCellValue(Row, prefix+"pub_update_yn","Y",0);
            }
            break;
    }
}
function locationCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(masterVals[0]==''){
				//formObj.por_cd.focus();
			}else{
				sheet1.SetCellValue(rows1,cols1,masterVals[0],0);
				sheet1.SetCellValue(rows1,cols1+1,masterVals[3],0);
			}
		}else{
			sheet1.SetCellValue(rows1,cols1,"");
			sheet1.SetCellValue(rows1,cols1+1,"");
			sheet1.SelectCell(rows1,cols1);
		}
	}
}
function sheet1_OnClick(sheetObj,Row,Col){
    var formObj=document.form;
    var prefix="";
    var rate_no=sheetObj.GetCellValue(Row,prefix+"rate_no");
    if( sheetObj.ColSaveName(Col) == prefix+"upload_img" && !ComIsNull(rate_no) && sheetObj.GetCellValue(Row,prefix+"edit_yn") != "N"){
        /*
         if(sheetObj.GetCellValue(Row, prefix+"nra_quote_no") == "" ){
         ComShowCodeMessage("COM0374");
         sheetObj.SelectCell(Row, prefix+"nra_quote_no");
         return;
         }else if(sheetObj.GetCellValue(Row, prefix+"nra_quote_no") != sheetObj.CellSearchValue(Row, prefix+"nra_quote_no")){
         ComShowCodeMessage("COM0374");
         return;
         }
         */
        sUrl="RateUploadPopup.clt?rate_no="+sheetObj.GetCellValue(Row, prefix+"rate_no")+"&ctrt_no="+formObj.ctrt_no.value+"&nra_quote_no="+sheetObj.GetCellValue(Row, prefix+"nra_quote_no")+"&sb_cls_cd=S";
//      modal_center_open(sUrl, 900, 500, "sheet1_setUploadInfo", "0,0", true);

        callBackFunc = "sheet1_setUploadInfo";
        modal_center_open(sUrl, new Array(), 900, 500 ,"yes");

    }else if (sheetObj.ColSaveName(Col) == prefix+"commodity_desc"){
        ComShowMemoPad2(sheetObj,Row,Col,false,326,200,4000,Col);
    }
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	
    var formObj=document.form;
    var formObj1=document.form1;

    var prefix="";

    var rate_no=sheetObj.GetCellValue(Row,prefix+"rate_no");

    if ( sheetObj.ColSaveName(Col) == prefix+"rate_no" && !ComIsNull(rate_no)){
//      sell_filer.SetSelectCode(sheetObj.GetCellValue(Row,prefix+"rate_no") + "^" + sheetObj.GetCellValue(Row,prefix+"frt_mode"));
        formObj.sell_filer.value = sheetObj.GetCellValue(Row,prefix+"rate_no") + "^" + sheetObj.GetCellValue(Row,prefix+"frt_mode");
        sell_filer_OnChange(Row);
        //sell_filer.SetSelectCode(sheetObj.GetCellValue(Row,prefix+"rate_no"));
    }else if (sheetObj.ColSaveName(Col) == "Grd01file_org_nm") {
        if(sheetObj.GetCellValue(Row,prefix+"file_org_nm") != "" && sheetObj.GetCellValue(Row,prefix+"edit_yn") != "N"){
            ComSetObjValue(formObj1.downloadLocation, sheetObj.GetCellValue(Row, "Grd01file_path")+sheetObj.GetCellValue(Row, "Grd01file_sys_nm"));
            ComSetObjValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row, "Grd01file_org_nm"));
            formObj1.submit();
        }
    }
}

function sheet1_OnPopupClick(sheetObj,Row,Col){
    var prefix="";
    var formObj=document.form;
    var cal=new ComCalendarGrid();
    var srcName=sheetObj.ColSaveName(Col);
    var sUrl="";
    switch (srcName) {
        case prefix+"por":
        case prefix+"pol":
        case prefix+"pod":
        case prefix+"del":
        case prefix+"departure_cd":
        case prefix+"arrival_cd":
        case prefix+"origin_loc_cd":
        case prefix+"dest_loc_cd":
        	rtnary=new Array(3);
	   		rtnary[0]=sheetObj.GetCellValue(Row,prefix+"frt_mode");
	   		rtnary[1]="IT";
	   		// 2011.12.27 value parameter
//	   		rtnary[2]=sheetObj.GetCellValue(Row,Col+1);
//	   		rtnary[3]=sheetObj.GetCellValue(Row,Col);
	   		rtnary[2]="";
	   		rtnary[3]="";		   		

	   		//[ LHK 20130712 ]
	   		//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
	   		//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
	   		rtnary[4]=formObj.pol;
	   		callBackFunc = "sheet1_setIbLocInfo";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
//            sUrl="./RateLocPopup.clt?code_cd="+sheetObj.GetCellValue(Row, Col)+"&sea_air_cls="+sheetObj.GetCellValue(Row,prefix+"frt_mode");
//            //ComOpenPopup(sUrl, 900, 700, "sheet1_setIbLocInfo", "0,0", true);
//            callBackFunc = "sheet1_setIbLocInfo";
//            modal_center_open(sUrl, new Array(), 900, 480 ,"yes");
            break;
        case prefix+"eff_fr_dt":
            cal.select(sheetObj, Row, Col, 'MM-dd-yyyy');
            break;
        case prefix+"eff_to_dt":
            cal.select(sheetObj, Row, Col, 'MM-dd-yyyy');
            break;
        case prefix+"pub_dt":
            cal.select(sheetObj, Row, Col, 'MM-dd-yyyy');
            break;
        case prefix+"commodity_desc":

            if(sheetObj.GetCellValue(Row,prefix+"edit_yn") != "N"){
                var cnt = sheetObj.GetCellValue(Row, prefix+"commodity_desc").split('|').length;
                if(sheetObj.GetCellValue(Row, prefix+"commodity_desc") == ""){
                    cnt = 0;
                }

                cur_row = Row;
                rtnary=new Array(3);
                rtnary[0]="1";
//                rtnary[2]=sheetObj.GetCellValue(Row, prefix+"commodity_desc");
                rtnary[2]="";
                callBackFunc = "setCommofityInfo";
                modal_center_open('./CMM_POP_0110.clt', rtnary, 756, 483,"yes");
            }
            break;
    }
}

function setCommofityInfo(rtnVal){

    var formObj=document.form;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");
//      formObj.in_ctrt_no.value=rtnValAry[0];//full_nm
//      formObj.in_ctrt_nm.value=rtnValAry[1];//full_nm

        if(rtnValAry[0] == "A"){
            if(sheet1.GetCellValue(cur_row, "commodity_desc") == ""){
                sheet1.SetCellValue(cur_row, "commodity_desc",rtnValAry[2],0);
            }else{
                sheet1.SetCellValue(cur_row, "commodity_desc",sheet1.GetCellValue(cur_row, col) + " " + rtnValAry[2],0);
            }
        }else{
            sheet1.SetCellValue(cur_row, "commodity_desc",rtnValAry[2],0);
        }
    }
}

function sheet1_setUploadInfo(aryPopupData) {
    var sheetObj=sheet1;
    btn_Search();
}
//function sheet1_setIbLocInfo(aryPopupData) {
//  var sheetObj=sheet1;
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][1],0);
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol()+1,aryPopupData[0][2],0);
//}

function sheet1_setIbLocInfo(rtnVal){

    var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");

        var sheetObj=sheet1;
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0],0);
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol()+1,rtnValAry[2],0);
    }
}

function sheet2_OnSearchEnd(){

    var sheetObj=sheet2;

    var prefix="Grd02";

    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    for (var i = hdrR; i < rowCnt + hdrR; i++) {

      	// SKU ComboList조회
    	var selRow=sheet1.GetSelectRow();
    	var p_ctrt_no = sheet1.GetCellValue(selRow, "ctrt_no");
    	var p_wh_cd = sheet1.GetCellValue(selRow, "loc_cd");
   	 	sheet2Row = i;
   	 	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchAjWHItemCodeList&c_wh_cd='+p_wh_cd+'&c_ctrt_no='+p_ctrt_no, './GateServlet.gsl');

   	 	// #4445 [JH Logistics] WMS Rate In & Out input (v461.13) - OUT Type 선택시 Pakage Unit/#of License Plate 제거
        //if( sheetObj.GetCellValue(i, prefix+"rate_tp_cd") == 'OUT'){
        //	sheetObj.CellComboItem(i, prefix+"unit_cd" ,{ComboText:"|Property of License Plate|Container|Truck|Handling Unit|Order|Hour", ComboCode:"|LPP|CNT|TRK|HUT|ODR|HOR"}); 
        //}
   	 	
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
    	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
    	if (sheetObj.GetCellValue(i, prefix + "unit_cd") != "HUT" && sheetObj.GetCellValue(i, prefix + "unit_cd") != "PUT") {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",0);
    		sheetObj.SetCellValue(i, prefix+"item_cd","");
    	} else {
    		sheetObj.SetCellEditable(i, prefix+"item_cd",1);
    	}
    	
        if(sheetObj.GetCellValue(i, prefix + "frt_mode") != "W")
        {
//            sheetObj.SetCellEditable(i, prefix + "rate_tp_cd",0);
            sheetObj.SetCellEditable(i, prefix + "cond_first",0);
            sheetObj.SetCellEditable(i, prefix + "cond_second",0);
            sheetObj.SetCellEditable(i, prefix + "ext_rate",0);
            sheetObj.SetCellEditable(i, prefix + "int_rate",0);
            sheetObj.SetCellEditable(i, prefix + "full_mon_rate",0);
            sheetObj.SetCellEditable(i, prefix + "half_mon_rate",0);
            sheetObj.SetCellEditable(i, prefix + "week_rate",0);
            sheetObj.SetCellEditable(i, prefix + "day_rate",0);
            sheetObj.SetCellEditable(i, prefix + "day_opt",0);
        }
        else
        {
            //--combobox변경
            rate_tp_cd_rate_editable(sheetObj, i, sheetObj.GetCellValue(i, prefix + "rate_tp_cd"), prefix, false);
            rate_tp_cd_condition_combo(sheetObj, i, sheetObj.GetCellValue(i, prefix + "rate_tp_cd"), prefix);
            str_condition_editable(sheetObj, i, sheetObj.GetCellValue(i, prefix+"rate_tp_cd"), sheetObj.GetCellValue(i, prefix + "cond_first"), prefix, false);
            sheetObj.SetCellEditable(i, prefix + "unit_price",0);

            if(sheetObj.GetCellValue(i, prefix + "fix_rate_flg") == "N"){
                sheetObj.SetCellEditable(i, prefix + "frt_nm",0);
            }
        }
    }

    doHideProcess();
}
function sheet2_OnChange(sheetObj, Row, Col, Value){
    var formObj=document.form;
    var prefix="Grd02";
    var sXml="";
    var sParm="";
    var srcName=sheetObj.ColSaveName(Col);
    tempRow = Row;
    tempCol = Col;

    switch (srcName) {
        case prefix+"ofc_cd":
            if(!ComIsNull(Value)){
                ajaxSendPost(CB_SearchTlOfcInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlOfcInfo&office_cd='+Value, './GateServlet.gsl');
            }
            break;
        case prefix+"cust_cd":
            if(!ComIsNull(Value)){
                ajaxSendPost(CB_searchTlTradePartnerInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlTradePartner&cust_cd='+Value, './GateServlet.gsl');

            } else {
                sheetObj.SetCellValue(Row,Col+1,"",0);
            }
            break;
        case prefix+"frt_cd":
            var frt = sheet2.GetCellText(Row,srcName).split(":");
            if(frt!="")
                sheet2.SetCellValue(Row,prefix + "frt_nm", frt[1]);
            else sheet2.SetCellValue(Row,prefix + "frt_nm", "");
            break;
        case prefix+"unit_cd":
            if(!ComIsNull(Value)){

//              if(sheetObj.GetCellValue(Row, prefix+"frt_mode") == "W"){
//                  sParm=sParm + "&opt_itm1=WMS";
//              }
//                ajaxSendPost(CB_searchCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=Z3&code_cd='+ Value, './GateServlet.gsl');
            	
            	// Unit2 콤보 정보 선택
            	var strUnit2Cd = "|CBM|CBF|GKG|GLB|NKG|NLB";
            	var strUnit2Text = "|CBM|CFT|G.KG|G.LB|N.KG|N.LB";
            	
            	//# of License Plate
            	if (Value == "LPN") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + LIC_PLATE_TEXT, ComboCode:"|" + LIC_PLATE_CD} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Property of License Plate
            	} else if (Value == "LPP") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:strUnit2Text, ComboCode:strUnit2Cd} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Container
            	} else if (Value == "CNT") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + TPCD1, ComboCode:"|" + TPCD1} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Truck
            	} else if (Value == "TRK") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Handling Unit
            	} else if (Value == "HUT") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Package Unit
            	} else if (Value == "PUT") {
            		sheetObj.CellComboItem(Row,prefix+"unit_cd2",{ComboText:"|Quantity" + strUnit2Text, ComboCode:"|QTY" + strUnit2Cd} );
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
            		//Order
            	} else if (Value == "ODR") {
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",0);
            		sheetObj.SetCellValue(Row, prefix+"unit_cd2","");
            		//Hour
            	} else if (Value == "HOR") {
            		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",0);
            		sheetObj.SetCellValue(Row, prefix+"unit_cd2","");
            	}
            	// Handling Unit 또는 Package Unit이 아닌경우, Item Code 비활성화
            	if (Value != "HUT" && Value != "PUT") {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
            		sheetObj.SetCellValue(Row, prefix+"item_cd","");
            	} else {
            		sheetObj.SetCellEditable(Row, prefix+"item_cd",1);
            	}
            }
            break;
        case prefix+"unit_cd2":
        	if(!ComIsNull(Value)){
        		
//              if(sheetObj.GetCellValue(Row, prefix+"frt_mode") == "W"){
//                  sParm=sParm + "&opt_itm1=WMS";
//              }
        		
//                ajaxSendPost(CB_searchCommonCodeInfo, sheetObj , '&goWhere=aj&bcKey=searchCommonCodeInfo&grp_cd=Z3&code_cd='+ Value, './GateServlet.gsl');
        	}
        	break;
        case prefix+"curr_cd":
            var sheetObj2=sheet2;
            var prefix="Grd02";
            for(var i=2;i<sheetObj2.RowCount()+2;i++){
            	sheetObj2.SetCellValue(i, prefix + "curr_cd", sheetObj2.GetCellValue(Row, prefix + "curr_cd"));
            }
            break;
        case prefix+"rate_tp_cd": //mjy
            //RATE선택값에 따른 Condition 콤보박스 셋팅 및 Handling Rate, Storage Rate 입력모드 설정
            
        	// #4445 [JH Logistics] WMS Rate In & Out input (v461.13) - OUT Type 선택시 Pakage Unit/#of License Plate 제거
            //if(Value == 'OUT'){
            //	sheetObj.CellComboItem(Row, prefix+"unit_cd" ,{ComboText:"|Property of License Plate|Container|Truck|Handling Unit|Order|Hour", ComboCode:"|LPP|CNT|TRK|HUT|ODR|HOR"}); 
            //}else{
            //	sheetObj.CellComboItem(Row, prefix+"unit_cd" ,{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
            //}
        	
        	rate_tp_cd_rate_editable(sheetObj, Row, Value, prefix, true);                        
            rate_tp_cd_condition_combo(sheetObj, Row, Value, prefix);
            break;
        case prefix+"cond_first": //mjy
            str_condition_day_opt_change(sheetObj,Row, sheetObj.GetCellValue(Row, prefix+"rate_tp_cd"), Value, prefix);
            str_condition_editable(sheetObj,Row, sheetObj.GetCellValue(Row, prefix+"rate_tp_cd"), Value, prefix, true);
            break;
        case prefix+"fix_rate_flg": //mjy
            if(Value == "N" && sheetObj.GetCellValue(Row, prefix+"frt_mode") == "W"){
                sheetObj.SetCellEditable(Row, prefix+"frt_nm",0);
                sheet2_OnChange(sheetObj, Row, sheetObj.SaveNameCol(prefix+"frt_cd"), sheetObj.GetCellValue(Row, prefix+"frt_cd"));
            }
            else{
                sheetObj.SetCellEditable(Row, prefix+"frt_nm",1);
            }
            break;

    }
}

function CB_SearchTlOfcInfo(reqVal){
    var doc=getAjaxMsgXML(reqVal);

    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
            var rtnArr=doc[1].split('^@');
            if(rtnArr[1] != ""){
                sheet2.SetCellValue(tempRow,tempCol,rtnArr[1],0);
            }
            else{
                sheet2.SetCellValue(tempRow,tempCol,"",0);
                sheet2.SelectCell(tempRow,tempCol);
            }
        }
        else{
            sheet2.SetCellValue(tempRow,tempCol,"",0);
            sheet2.SelectCell(tempRow,tempCol);
        }
    }
    else{
//      alert(getLabel('SEE_BMD_MSG43'));
    }
}

function CB_searchTlTradePartnerInfo(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    var prefix = "Grd02";

    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                sheet2.SetCellValue(tempRow,tempCol+1,rtnArr[1],0);
                sheet2.SetCellValue(tempRow,tempCol,rtnArr[0],0);

                sheet2_OnChange(sheet2, tempRow, sheet2.SaveNameCol(prefix+"frt_cd"), sheet2.GetCellValue(tempRow, prefix+"frt_cd"));
            }
            else{
                sheet2.SetCellValue(tempRow,tempCol,"",0);
                sheet2.SetCellValue(tempRow,tempCol+1,"",0);
                sheet2.SelectCell(tempRow,tempCol);
            }
        }
        else{
            sheet2.SetCellValue(tempRow,tempCol,"",0);
            sheet2.SetCellValue(tempRow,tempCol+1,"",0);
            sheet2.SelectCell(tempRow,tempCol);
        }
    }
    else{
//      alert(getLabel('SEE_BMD_MSG43'));
    }
}

function CB_searchFrtCd(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    var prefix = "Grd02";

    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                sheet2.SetCellValue(tempRow,prefix+"frt_cd",rtnArr[1],0);
                sheet2.SetCellValue(tempRow,prefix+"frt_nm",rtnArr[0],0);
            }
            else{
                sheet2.SetCellValue(tempRow,prefix+"frt_cd","",0);
                sheet2.SetCellValue(tempRow,prefix+"frt_nm","",0);
//              sheet2.SelectCell(tempRow,tempCol);
            }
        }
        else{
            sheet2.SetCellValue(tempRow,prefix+"frt_cd","",0);
            sheet2.SetCellValue(tempRow,prefix+"frt_nm","",0);
//          sheet2.SelectCell(tempRow,tempCol);
        }
    }
    else{
//      alert(getLabel('SEE_BMD_MSG43'));
    }
}

function CB_searchCommonCodeInfo(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    var prefix = "Grd02";

    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                sheet2.SetCellValue(tempRow,tempCol,rtnArr[0],0);
            }
            else{
                sheet2.SetCellValue(tempRow,tempCol,"",0);
                sheet2.SelectCell(tempRow,tempCol);
            }
        }
        else{
            sheetObj.SetCellValue(tempRow,tempCol,"",0);
            sheet2.SelectCell(tempRow,tempCol);
        }
    }
    else{
//      alert(getLabel('SEE_BMD_MSG43'));
    }
}

function sheet2_OnPopupClick(sheetObj,Row,Col){
    var prefix="Grd02";
    var srcName=sheetObj.ColSaveName(Col);
    var sUrl="";
    var formObj=document.form;
    if ( srcName == prefix+"ofc_cd" ){
        rtnary=new Array(2);
        rtnary[0]="1";

        sUrl="./CMM_POP_0150.clt?";
//      ComOpenPopup(sUrl, 500, 400, "sheet2_setOfcCd", "0,0", true);

        callBackFunc = "sheet2_setOfcCd";
        modal_center_open(sUrl, rtnary, 556,600,"yes");
    } else if ( srcName == prefix+"cust_cd" ){
    	rtnary=new Array(2);
    	rtnary[0]="";
//        rtnary[1] = sheet2.GetCellValue(Row, Col +1);
    	rtnary[1] = "";
        var sUrl="./CMM_POP_0010.clt";
        callBackFunc = "sheet2_setCustomerInfo";
        modal_center_open(sUrl , rtnary, 1150, 650 ,"yes");

    } else if ( srcName == prefix+"frt_cd" ){
        var sUrl="FreightPopup.clt?code="+sheetObj.GetCellValue(Row, Col)+"&cust_cd="+sheetObj.GetCellValue(Row, prefix+"cust_cd");
//      ComOpenPopup(sUrl, 900, 550, "sheet2_setGrdFrtInfo", "0,0", true);

        callBackFunc = "sheet2_setGrdFrtInfo";
        modal_center_open(sUrl , new Array(), 900, 550 ,"yes");

    } else if ( srcName == prefix+"unit_cd" ){
        var sParm="grp_cd=Z3&code="+sheetObj.GetCellValue(Row, Col);
        if(sheetObj.GetCellValue(Row, prefix+"frt_mode") == "W")
        {
            sParm=sParm + "&opt_itm1=WMS";
        }
//        var sUrl="CommonCodePopup.clt?" + sParm;
        var sUrl="CommonCodePopup.clt?";
//      ComOpenPopup(sUrl, 900, 550, "sheet2_setUnitCd", "0,0", true);

        callBackFunc = "sheet2_setUnitCd";
        modal_center_open(sUrl , new Array(), 400,520 ,"yes");

    } else if ( srcName == prefix+"curr_cd" ){
        var sUrl="CommonCodePopup.clt?grp_cd=C010&code="+sheetObj.GetCellValue(Row, Col);
//      ComOpenPopup(sUrl, 900, 550, "sheet2_setCurrCd", "0,0", true);

        callBackFunc = "sheet2_setCurrCd";
        modal_center_open(sUrl , new Array(), 400,520 ,"yes");
    }
}
//function sheet2_setOfcCd(aryPopupData) {
//  var sheetObj=sheet2;
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][0]);
//}

function sheet2_setOfcCd(rtnVal){

//  var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");

        var sheetObj=sheet2;
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0],0);
    }
}
//function sheet2_setCustomerInfo(aryPopupData){
//  var sheetObj=sheet2;
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][1]);
//}

function sheet2_setCustomerInfo(rtnVal){

    var formObj = document.form;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    } else {
        var rtnValAry = rtnVal.split("|");

        var sheetObj=sheet2;
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0],0)
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol()+1,rtnValAry[2])
//      formObj.f_prnr_trdp_nm.value = rtnValAry[2];// full_nm
    }
}

//function sheet2_setGrdFrtInfo(aryPopupData, row, col){
//  var sheetObj=sheet2;
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][1]);
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol()+1,aryPopupData[0][2]);
//}

function sheet2_setGrdFrtInfo(rtnVal){

    var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");

        var sheetObj=sheet2;
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[0]);
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol()+1,rtnValAry[1]);
    }
}
//function sheet2_setUnitCd(aryPopupData){
//  var sheetObj=sheet2;
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][2]);
//}

function sheet2_setUnitCd(rtnVal){

    var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");

        var sheetObj=sheet2;
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[1]);
    }
}
//function sheet2_setCurrCd(aryPopupData){
//  var sheetObj=sheet2;
//  sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][2]);
//}

function sheet2_setCurrCd(rtnVal){

    var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");

        var sheetObj=sheet2;
        sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[1]);
    }
}
function sell_filer_OnChange(selRow){
    var formObj=document.form;
//  var Code = newCode;
//  var Text = newText;

    var Code = formObj.sell_filer.value;
    var Text = formObj.sell_filer.options[formObj.sell_filer.selectedIndex].text;

    var sheetObj=sheet1;
    var selRow_sheet1=sheetObj.GetSelectRow();

    if(formObj.ctrt_no.value != "" && formObj.sell_br_filer.length > 1){
    	
        var prefix="";
        var flag="N";
        var cd=Code.split("^");
        var sParam="ctrt_no="+formObj.ctrt_no.value +"&sb_cls_cd=S"+"&user_id="+formObj.user_id.value+"&org_cd="+formObj.org_cd.value+"&auth_lvl="+formObj.auth_lvl.value+"&wh_cd="+sheetObj.GetCellValue(selRow_sheet1, prefix+"loc_cd");
        if(Code=="AA"){
            sParam=sParam + "&frt_mode=A";
        } else if(Code=="SA"){
            sParam=sParam + "&frt_mode=S";
        } else if(Code=="DA"){
            sParam=sParam + "&frt_mode=D";
        } else if(Code=="TA"){
            sParam=sParam + "&frt_mode=T";
        } else if(Code=="WA"){
            sParam=sParam + "&frt_mode=W";
        } else if(Code=="A"){
            sParam=sParam + "&frt_mode=";
        }else if(Code!="A" && Code!="" ){
            sParam=sParam + "&rate_no="+cd[0]+"&frt_mode="+cd[1];
//          if(formObj.auth_lvl.value != "HQ"){
            for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
                if(sheetObj.GetCellValue(i,prefix+"rate_no") == cd[0]){ //mjy
                    if(sheetObj.GetCellValue(i,prefix+"pub_dt") == ""){
                        flag="Y";
                    }else{
                        flag="N";
                    }
                }
            }
//          }else{
//              flag="Y";
//          }
        }
        detail_button(flag, "S");
        if( cd[0] !="" ){ //mjy
            sParam += "&f_cmd=" + SEARCH02;
            var sXml = sheet2.GetSearchData("./RateMgmtGS.clt?" + sParam);

            if( sXml.indexOf('<ERROR>') != -1){

            }else {
            	
            	//Load WH Office Code Info
            	var strtIndxSheet = sXml.indexOf("<WH_OFC_CD>");
            	var endIndxSheet = sXml.indexOf("</WH_OFC_CD>") + "</WH_OFC_CD>".length;
            	var whOfcCd = sXml.substring(strtIndxSheet + "<WH_OFC_CD>".length ,endIndxSheet - "</WH_OFC_CD>".length );
            	
            	//Load WH Office Code에 해당하는 Currency
            	var strtIndxSheet2 = sXml.indexOf("<WH_CURR_CD>");
            	var endIndxSheet2 = sXml.indexOf("</WH_CURR_CD>") + "</WH_CURR_CD>".length;
            	var whCurrCd = sXml.substring(strtIndxSheet2 + "<WH_CURR_CD>".length ,endIndxSheet2 - "</WH_CURR_CD>".length );
            	
            	if (whOfcCd == null || whOfcCd == "" ) {
            		formObj.wh_ofc_cd.value = formObj.org_cd.value;
            	} else {
            		formObj.wh_ofc_cd.value = whOfcCd;
            	} 
            	formObj.wh_curr_cd.value = whCurrCd;
            	
                //Load Details Grid

                /*$sheet2XML = $($.parseXML(sXml    )).find('SHEET2');
                 sheet2.LoadSearchData($sheet2XML[0].innerHTML);*/
            	sheet2.RemoveAll();
                searchDataSheet(sheet2, sXml, 'SHEET2')
            }
        } else {
            sheet2.RemoveAll();
        }
        //MJY
        /*var frt_mode = "";
    	if(cd.length > 1){frt_mode=cd[1];}
    	if(Code == "A")
    	{
    		sheetDtlGetColHiddenForWarehouseCol(sheet2, false, true);
    	}
    	else if(Code == "WA" || frt_mode == "W")
    	{
    		sheetDtlGetColHiddenForWarehouseCol(sheet2, false, false);
    	}
    	else
    	{
    		sheetDtlGetColHiddenForWarehouseCol(sheet2, true, false);
    	}*/

        return true;
    }
}
function sell_br_filer_OnChange(comboObj, oldIndex, oldText, oldCode, newIndex, newText, newCode){
    var formObj=document.form;

    if(formObj.ctrt_no.value == "" || formObj.sell_br_filer.length <= 1){
        return;
    }

    doShowProcess();

    sheet1.RemoveAll();
    sheet2.RemoveAll();

    formObj.f_cmd.value = SEARCH03;

    var params = FormQueryString(formObj)
        +"&sell_br_filer=" + formObj.sell_br_filer.value
        +"&sell_pub_filer=" + formObj.sell_pub_filer.value;

    //var sXml = sheet1.GetSearchData("searchSellRTInfo.clt", FormQueryString(formObj,"")+"&sell_br_filer="+comboObjects[0].SetSelectCode+"&sell_pub_filer="+comboObjects[1].GetSelectCode());
    var sXml = sheet1.GetSearchData("./RateMgmtGS.clt", params);
    var arrXml=sXml.split("|$$|");

    doHideProcess();

    if( arrXml[0].indexOf('<ERROR>') != -1){
        //sheet1.LoadSearchData(arrXml[0],{Sync:1} );
    } else {

        //Load Main Grid
        /*$sheet1XML = $($.parseXML(arrXml[0])).find('SHEET1');
         sheet1.LoadSearchData($sheet1XML[0].innerHTML);*/

        searchDataSheet(sheet1, arrXml[0], 'SHEET1')
    	searchDataSheet(sheet2, arrXml[0], 'SHEET2')
        //Load Details Grid

//      $sheet2XML = $($.parseXML(arrXml[0])).find('SHEET2');
//      sheet2.LoadSearchData($sheet2XML[0].innerHTML);

//      sheet1_OnDblClick(sheet1,2,4);
    }
}
function sell_pub_filer_OnChange(comboObj, oldIndex, oldText, oldCode, newIndex, newText, newCode){
    sell_br_filer_OnChange();
}

function main_button(flag){
    var formObj=document.form;
    if( flag == "Y" ){
        ComBtnEnable("btn_Sell_Main_Add");
        ComBtnEnable("btn_Sell_Main_Del");
        ComBtnEnable("btn_Sell_Main_Copy");
        ComBtnEnable("btn_Sell_Main_Copy_All");
        ComBtnEnable("btn_Sell_Main_Save");
//      ComBtnEnable("lnk_Execl_DL");
//      ComBtnEnable("lnk_History");
//      ComBtnEnable("lnk_Execl_UL");
        formObj.sell_filer.disabled = false;
    } else {
        ComBtnDisable("btn_Sell_Main_Add");
        ComBtnDisable("btn_Sell_Main_Del");
        ComBtnDisable("btn_Sell_Main_Copy");
        ComBtnDisable("btn_Sell_Main_Copy_All");
        ComBtnDisable("btn_Sell_Main_Save");
//      ComBtnDisable("lnk_Execl_DL");
//      ComBtnDisable("lnk_History");
//      ComBtnDisable("lnk_Execl_UL");
        formObj.sell_filer.disabled = true;
    }
}
function detail_button(flag, type){
    if( flag == "Y" ){
        if ( type == "A" ){
            ComBtnEnable("btn_Sell_Detail_Add");
            ComBtnEnable("btn_Sell_Detail_Del");
            ComBtnEnable("btn_Sell_Detail_Copy");
            ComBtnEnable("btn_Sell_Detail_Save");
        } else if ( type == "S" ){
            ComBtnEnable("btn_Sell_Detail_Add");
            ComBtnEnable("btn_Sell_Detail_Del");
            ComBtnEnable("btn_Sell_Detail_Copy");
            ComBtnEnable("btn_Sell_Detail_Save");
        }
    } else {
        if ( type == "A" ){
            ComBtnDisable("btn_Sell_Detail_Add");
            ComBtnDisable("btn_Sell_Detail_Del");
            ComBtnDisable("btn_Sell_Detail_Copy");
            ComBtnDisable("btn_Sell_Detail_Save");
        } else if ( type == "S" ){
            ComBtnDisable("btn_Sell_Detail_Add");
            ComBtnDisable("btn_Sell_Detail_Del");
            ComBtnDisable("btn_Sell_Detail_Copy");
            ComBtnDisable("btn_Sell_Detail_Save");
        }
    }
}
function lnk_Execl_DL(){
    var formObject=document.form;
    // Excel Down load Sheet1에서 Sheet2로 변경
    if (validateForm(docObjects[1],formObject,'lnk_Execl_DL')) {
        //"&org_cd="+formObj.org_cd.value+"&auth_lvl="+formObj.auth_lvl.value
//      var sXml=docObjects[4].GetSearchData("searchExcelDl.clt", FormQueryString(formObject,""));
//      docObjects[4].LoadSearchData(sXml,{Sync:1} );
//      docObjects[4].Down2Excel( {DownCols: makeHiddenSkipCol(     docObjects[4]), SheetDesign:1,Merge:1 });
        sheet2.Down2Excel( {DownCols: makeHiddenSkipCol(sheet2), SheetDesign:1,Merge:1});
    }
}
function lnk_Temp_DL(){
    //ComOpenPopup("RateExcelTemplatePopup.clt", 350, 300, "", "0,0", false);

    modal_center_open('./RateExcelTemplatePopup.clt'   , new Array(), 350, 300 ,"yes");
}
function lnk_Execl_UL(){
    var formObject=document.form;
//  ComOpenWindow("RateExcelTemplatePopup.clt?ctrt_no="+formObject.ctrt_no.value, "", "scroll:;dialogWidth:900px; dialogHeight:600px", true);
//  ComOpenWindow("RateExcelUpLoadPopup.clt?ctrt_no="+formObject.ctrt_no.value, "", "scroll:;dialogWidth:900px; dialogHeight:600px", true);
    modal_center_open("./RateExcelUpLoadPopup.clt?ctrt_no="+formObject.ctrt_no.value, 900, 600, "yes");
}
function lnk_History(){
    var formObject=document.form;
    //ComOpenWindow("RateHistoryPopup.clt?ctrt_no="+formObject.ctrt_no.value+"&sb_cls_cd="+formObject.in_sb_cls_cd.value, "", "scroll:;dialogWidth:900px; dialogHeight:600px", true);
    var sUrl="./RateHistoryPopup.clt?ctrt_no="+formObject.ctrt_no.value+"&sb_cls_cd="+formObject.in_sb_cls_cd.value;
//  ComOpenPopup(sUrl, 900, 620, "", "0,0", true);

    modal_center_open(sUrl   , new Array(), 900, 580 ,"yes");
}
/*
 * MJY
 * truck, warehouse추가
 */
function frt_mode(sheetObj, Row, Value){
    var prefix="";
    switch(Value)
    {
        case "S":
            sheetObj.SetCellEditable(Row,prefix+"por",1);
            sheetObj.SetCellEditable(Row,prefix+"pol",1);
            sheetObj.SetCellEditable(Row,prefix+"pod",1);
            sheetObj.SetCellEditable(Row,prefix+"del",1);
            sheetObj.SetCellEditable(Row,prefix+"svcterm_fr_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"svcterm_to_cd",1);
            //no air
            frt_mode_no_selection('A', sheetObj, Row);
            //no warehouse
            frt_mode_no_selection('W', sheetObj, Row);
            //no Truck
            frt_mode_no_selection('T', sheetObj, Row);
            break;
        case "A":
            sheetObj.SetCellEditable(Row,prefix+"departure_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"arrival_cd",1);
            //no sea
            frt_mode_no_selection('S', sheetObj, Row);
            //no warehouse
            frt_mode_no_selection('W', sheetObj, Row);
            //no Truck
            frt_mode_no_selection('T', sheetObj, Row);
            break;
        case "D": //코드정리후 Domestic은 case에서 지워버려야함.
            sheetObj.SetCellEditable(Row,prefix+"origin_loc_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"origin_loc_nm",1);
            sheetObj.SetCellEditable(Row,prefix+"dest_loc_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"dest_loc_nm",1);
            sheetObj.SetCellEditable(Row,prefix+"loc_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"loc_nm",1);
            //no sea
            frt_mode_no_selection('S', sheetObj, Row);
            //no air
            frt_mode_no_selection('A', sheetObj, Row);
            break;
        case "T":
            sheetObj.SetCellEditable(Row,prefix+"origin_loc_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"origin_loc_nm",1);
            sheetObj.SetCellEditable(Row,prefix+"dest_loc_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"dest_loc_nm",1);
            //no sea
            frt_mode_no_selection('S', sheetObj, Row);
            //no air
            frt_mode_no_selection('A', sheetObj, Row);
            //no warehouse
            frt_mode_no_selection('W', sheetObj, Row);
            break;
        case "W":
            sheetObj.SetCellEditable(Row,prefix+"loc_cd",1);
            sheetObj.SetCellEditable(Row,prefix+"loc_nm",1);
            //no sea
            frt_mode_no_selection('S', sheetObj, Row);
            //no air
            frt_mode_no_selection('A', sheetObj, Row);
            //no Truck
            frt_mode_no_selection('T', sheetObj, Row);
            break;
    }
}
/*
 * MJY
 * truck, warehouse추가
 */
function frt_mode_no_selection(frt_mode, sheetObj, Row)
{
    var prefix="";
    switch(frt_mode)
    {
        case "S":
            //no sea
            sheetObj.SetCellEditable(Row,prefix+"por",0);
            sheetObj.SetCellEditable(Row,prefix+"pol",0);
            sheetObj.SetCellEditable(Row,prefix+"pod",0);
            sheetObj.SetCellEditable(Row,prefix+"del",0);
            sheetObj.SetCellEditable(Row,prefix+"svcterm_fr_cd",0);
            sheetObj.SetCellEditable(Row,prefix+"svcterm_to_cd",0);
            sheetObj.SetCellValue(Row,prefix+"por","",0);
            sheetObj.SetCellValue(Row,prefix+"por_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"pol","",0);
            sheetObj.SetCellValue(Row,prefix+"pol_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"pod","",0);
            sheetObj.SetCellValue(Row,prefix+"pod_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"del","",0);
            sheetObj.SetCellValue(Row,prefix+"del_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"svcterm_fr_cd","",0);
            sheetObj.SetCellValue(Row,prefix+"svcterm_to_cd","",0);
            break;
        case "A":
            //no air
            sheetObj.SetCellEditable(Row,prefix+"departure_cd",0);
            sheetObj.SetCellEditable(Row,prefix+"arrival_cd",0);
            sheetObj.SetCellValue(Row,prefix+"departure_cd","",0);
            sheetObj.SetCellValue(Row,prefix+"departure_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"arrival_cd","",0);
            sheetObj.SetCellValue(Row,prefix+"arrival_nm","",0);
            break;
        case "T":
            //--------------------------------------------------------
            //no truck
            sheetObj.SetCellEditable(Row,prefix+"origin_loc_cd",0);
            sheetObj.SetCellEditable(Row,prefix+"origin_loc_nm",0);
            sheetObj.SetCellEditable(Row,prefix+"dest_loc_cd",0);
            sheetObj.SetCellEditable(Row,prefix+"dest_loc_nm",0);
            sheetObj.SetCellValue(Row,prefix+"origin_loc_cd","",0);
            sheetObj.SetCellValue(Row,prefix+"origin_loc_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"dest_loc_cd","",0);
            sheetObj.SetCellValue(Row,prefix+"dest_loc_nm","",0);
            break;
        case "W":
            //--------------------------------------------------------
            //no warehouse
//          sheetObj.SetCellEditable(Row,prefix+"loc_cd",0);
            sheetObj.SetCellEditable(Row,prefix+"loc_nm",0);
            sheetObj.SetCellEditable(Row,prefix+"loc_cd",0);
//          sheetObj.SetCellValue(Row,prefix+"loc_cd","",0);
            sheetObj.SetCellValue(Row,prefix+"loc_nm","",0);
            sheetObj.SetCellValue(Row,prefix+"loc_cd","",0);
            break;
    }
}
function sell_Detail_Check(){
//  if( comboObjects[2].GetSelectCode()!= "AA" && comboObjects[2].GetSelectCode()!= "SA" && comboObjects[2].GetSelectCode()!= "DA" && comboObjects[2].GetSelectCode()!= "TA" && comboObjects[2].GetSelectCode()!= "WA" && comboObjects[2].GetSelectCode()!= "A" && comboObjects[2].GetSelectCode()!= "" ){
    var sell_detail_cnt = sheet2.RowCount("I")+sheet2.RowCount("U")+sheet2.RowCount("D");
    if ( sell_detail_cnt > 0 ){
        if (!ComShowCodeConfirm("COM0291")){
            return false;
        }
    }
//  }
    return true;
}
function ctrt_link(){
    var formObj=document.form;
    if (!ComIsEmpty(formObj.ctrt_no)) {
        var sUrl="./CtrtMgmt.clt?ctrt_no="+ formObj.ctrt_no.value;
        parent.mkNewFrame('Contract Managemen', sUrl, "CtrtMgmt_" + formObj.ctrt_no.value);
    }
}
/*
 * MJY
 * Warehouse에만 해당하는 sheet detail의 컬럼을 숨김 또는 표시 처리를 한다.
 */
function sheetDtlGetColHiddenForWarehouseCol(sheetObj, GetColHiddenFlag, AllFlag)
{
    var prefix="Grd02";
    sheetObj.SetColHidden(prefix + "rate_tp_cd",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "cond_first",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "cond_second",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "fix_rate_flg",GetColHiddenFlag);

    if(sheetObj.id == "sheet2")
    {
        sheetDtlGetColHiddenForWarehouseCol_sell(sheetObj, GetColHiddenFlag, AllFlag);
    }
    else if(sheetObj.id == "sheet4")
	{
		sheetDtlGetColHiddenForWarehouseCol_buy(sheetObj, GetColHiddenFlag, AllFlag);
	}
}
/*
 * MJY
 * Warehouse에만 해당하는 sheet detail의 컬럼을 숨김 또는 표시 처리를 한다.
 */
function sheetDtlGetColHiddenForWarehouseCol_sell(sheetObj, GetColHiddenFlag, AllFlag)
{
    var prefix="Grd02";
    if(AllFlag)
    {
        sheetObj.SetColHidden(prefix + "unit_price",0);
    }
    else
    {
        if(GetColHiddenFlag)
        {
            sheetObj.SetColHidden(prefix + "unit_price",0);
        }
        else
        {
            sheetObj.SetColHidden(prefix + "unit_price",1);
        }
    }
    sheetObj.SetColHidden(prefix + "ext_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "int_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "full_mon_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "half_mon_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "week_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "day_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "day_opt",GetColHiddenFlag);
}
/*
 * MJY
 * Warehouse에만 해당하는 sheet detail의 컬럼을 숨김 또는 표시 처리를 한다.
 */
function sheetDtlGetColHiddenForWarehouseCol_buy(sheetObj, GetColHiddenFlag, AllFlag)
{
    var prefix="Grd02";
    sheetObj.SetColHidden(prefix + "full_mon_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "half_mon_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "week_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "day_rate",GetColHiddenFlag);
    sheetObj.SetColHidden(prefix + "day_opt",GetColHiddenFlag);
}
/*
 * MJY
 * Sheet dtl의 Type변경시 condition의 콤보박스를 셋팅한다.
 */
function rate_tp_cd_condition_combo(sheetObj, Row, rate_tp_cd, prefix)
{
	switch(rate_tp_cd)
	{
		case "IN":
			sheetObj.CellComboItem(Row,prefix+"cond_first", {ComboText:"|"+cond_first_inText, ComboCode:"|"+cond_first_inCode} );
			sheetObj.CellComboItem(Row,prefix+"cond_second", {ComboText:"|"+cond_second_in_outText, ComboCode:"|"+cond_second_in_outCode} );
			sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:"", ComboCode:""} );
			sheetObj.SetCellValue(Row, prefix+"cond_first", "", 0);
			sheetObj.SetCellValue(Row, prefix+"cond_second", "", 0);
			break;
		case "OUT":
			sheetObj.CellComboItem(Row,prefix+"cond_first", {ComboText:"|"+cond_first_outText, ComboCode:"|"+cond_first_outCode} );
			sheetObj.CellComboItem(Row,prefix+"cond_second", {ComboText:"|"+cond_second_in_outText, ComboCode:"|"+cond_second_in_outCode} );
			sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:"", ComboCode:""} );
			sheetObj.SetCellValue(Row, prefix+"cond_first", "", 0);
			sheetObj.SetCellValue(Row, prefix+"cond_second", "", 0);
			break;
		case "STR":
			sheetObj.CellComboItem(Row,prefix+"cond_first", {ComboText:"|"+cond_first_strText, ComboCode:"|"+cond_first_strCode} );
			sheetObj.CellComboItem(Row,prefix+"cond_second", {ComboText:"|"+cond_second_strText, ComboCode:"|"+cond_second_strCode} );
			sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:"", ComboCode:""} );
			sheetObj.SetCellValue(Row, prefix+"cond_first", "", 0);
			sheetObj.SetCellValue(Row, prefix+"cond_second", "", 0);
			break;
		case "OTH":
			sheetObj.CellComboItem(Row,prefix+"cond_first", {ComboText:" ", ComboCode:" "} );
			sheetObj.CellComboItem(Row,prefix+"cond_second", {ComboText:" ", ComboCode:" "} );
			sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:" ", ComboCode:" "} );
			sheetObj.SetCellValue(Row, prefix+"cond_first", "", 0);
			sheetObj.SetCellValue(Row, prefix+"cond_second", "", 0);
			break;
		default:
			sheetObj.CellComboItem(Row,prefix+"cond_first", {ComboText:" ", ComboCode:" "} );
			sheetObj.CellComboItem(Row,prefix+"cond_second", {ComboText:" ", ComboCode:" "} );
			sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:" ", ComboCode:" "} );
			sheetObj.SetCellValue(Row, prefix+"cond_first", "", 0);
			sheetObj.SetCellValue(Row, prefix+"cond_second", "", 0);
			break;
	}
}
/*
 * MJY
 * Sheet dtl의 Type변경시 Handling Rate, Storage Rate 입력모드 설정한다.
 */
function rate_tp_cd_rate_editable(sheetObj,Row, rate_tp_cd, prefix, resetValueFlag)
{
    /*var sheet_id=sheetObj.id;
    if(rate_tp_cd == "IN" || rate_tp_cd == "OUT" || rate_tp_cd == "OTH")
    {
        if(sheet_id == "sheet2")
        {
            sheetObj.SetCellEditable(Row, prefix+"ext_rate",1);
            sheetObj.SetCellEditable(Row, prefix+"int_rate",1);
        }
        else
        {
            sheetObj.SetCellEditable(Row, prefix+"unit_price",1);
        }
        sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"week_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"day_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"day_opt",0);
        if(resetValueFlag)
        {
            sheetObj.SetCellValue(Row, prefix+"full_mon_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"half_mon_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"week_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"day_rate",0,0);
        }
    }
    else //STR, 빈값
    {
        if(sheet_id == "sheet2")
        {
            sheetObj.SetCellEditable(Row, prefix+"ext_rate",0);
            sheetObj.SetCellEditable(Row, prefix+"int_rate",0);
        }
        else
        {
            sheetObj.SetCellEditable(Row, prefix+"unit_price",0);
        }
        sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"week_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"day_rate",0);
        sheetObj.SetCellEditable(Row, prefix+"day_opt",0);
        if(resetValueFlag)
        {
            if(sheet_id == "sheet2")
            {
                sheetObj.SetCellValue(Row, prefix+"ext_rate",0,0);
                sheetObj.SetCellValue(Row, prefix+"int_rate",0,0);
            }
            else
            {
                sheetObj.SetCellValue(Row, prefix+"unit_price",0,0);
            }
            sheetObj.SetCellValue(Row, prefix+"full_mon_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"half_mon_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"week_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"day_rate",0,0);
        }
    }*/
}
/*
 * MJY
 * Sheet dtl의 STR Type일경우 condition 변경 시 DayOpt콤보박스 재설정한다.
 */
function str_condition_day_opt_change(sheetObj,Row, rate_tp_cd, cond_first, prefix)
{
    getRow = Row;
    if(rate_tp_cd == "STR")
    {
        //day opt 설정
        if(cond_first == "MF" || cond_first == "MH" || cond_first == "W")
        {
            ajaxSendPost(resultDayOpt, 'reqVal', '&goWhere=aj&bcKey=searchDayOpt&code='+cond_first, './GateServlet.gsl');
        }
    }
}
function resultDayOpt(reqVal){
    var prefix = "Grd02";
    var formObj=document.form;
    var doc=getAjaxMsgXML(reqVal);
    var formObj=document.form;
    var code;
    var name;
    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //조회해온 결과를 Parent에 표시함
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                code = rtnArr[0];
                name = rtnArr[1];
                sheet2.CellComboItem(getRow,prefix+"day_opt", {ComboText:"|"+name, ComboCode:"|"+code} );
            }
            else{
                code="";
                name.value="";
                sheet2.CellComboItem(getRow,prefix+"day_opt", {ComboText:"|"+name, ComboCode:"|"+code} );
            }
        }
        else{
            code="";
            name.value="";
            sheet2.CellComboItem(getRow,prefix+"day_opt", {ComboText:"|"+name, ComboCode:"|"+code} );
        }
    }
}
/*
 * MJY
 * Sheet dtl의 STR Type일경우 condition 변경 시 Storage Rate 입력모드 설정한다.
 */
function str_condition_editable(sheetObj,Row, rate_tp_cd, cond_first, prefix, resetValueFlag)
{
    /*if(rate_tp_cd == "STR")
    {
        //Editable설정
        switch(cond_first)
        {
            case "MF"://Month
                sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"week_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"day_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"day_opt",1);
                break;
            case "MH"://Month(F/H)
                sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"week_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"day_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"day_opt",1);
                break;
            case "W"://Week
                sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"week_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"day_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"day_opt",1);
                break;
            case "D"://Day
                sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"week_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"day_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"day_opt",0);
                sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:"", ComboCode:""} );
                break;
            case "CS"://SARSON
                sheetObj.SetCellEditable(Row, prefix+"full_mon_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"half_mon_rate",1);
                sheetObj.SetCellEditable(Row, prefix+"week_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"day_rate",0);
                sheetObj.SetCellEditable(Row, prefix+"day_opt",0);
                sheetObj.CellComboItem(Row,prefix+"day_opt", {ComboText:"", ComboCode:""} );
                break;
        }
        if(resetValueFlag)
        {
            if(sheetObj.id == "sheet2")
            {
                sheetObj.SetCellValue(Row, prefix+"ext_rate",0,0);
                sheetObj.SetCellValue(Row, prefix+"int_rate",0,0);
            }
            else
            {
                sheetObj.SetCellValue(Row, prefix+"unit_price",0,0);
            }
            sheetObj.SetCellValue(Row, prefix+"full_mon_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"half_mon_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"week_rate",0,0);
            sheetObj.SetCellValue(Row, prefix+"day_rate",0,0);
        }
    }*/
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
function downloadTemplate(rate_type, frt_mode){
    //document.frm2.docType.value=downType;
    //var filePath="C:\\sitectx\\DocUp\\HJLOMS\\DOWN_TEMPLETE\\RATE_SELLING_SEA_TEMPLETE.xls";
    //var filePath="C:\\CLT\\BACKUP\\opus_repo\\fwd_repo\\wmsfile\\OMS\\trungtinescel.xls";
    var filePath="";
    var fileName="";
    if ( rate_type == "S" ){
        if ( frt_mode == "S" ){
            fileName="RATE_SELLING_SEA_TEMPLETE.xls";
        } else if ( frt_mode == "A" ){
            fileName="RATE_SELLING_AIR_TEMPLETE.xls";
        } else if ( frt_mode == "D" ){
            fileName="RATE_SELLING_DOM_TEMPLETE.xls";
        }
    } else {
        if ( frt_mode == "S" ){
            fileName="RATE_BUYING_SEA_TEMPLETE.xls";
        } else if ( frt_mode == "A" ){
            fileName="RATE_BUYING_AIR_TEMPLETE.xls";
        } else if ( frt_mode == "D" ){
            fileName="RATE_BUYING_DOM_TEMPLETE.xls";
        }
    }
    filePath="C:\\sitectx\\DocUp\\HJLOMS\\DOWN_TEMPLETE\\" + fileName;
    document.frm2.file_path.value= filePath;
    document.frm2.file_name.value= fileName;
    document.frm2.submit();
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

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="commodity_desc"){
		btn_Sell_Main_Add();
		sheetObj.SelectCell(row+1, 2);
	}
}

function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="Grd02rmk"){
		btn_Sell_Detail_Add();
		sheetObj.SelectCell(row+1, 2);
	}
}

function resultDupRateDtlMgmt(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if (Number(doc[1]) > 0) {
				alert(getLabel('FMS_COM_ALT008'));
				sheet2.SelectCell(l_dupRow, "Grd02eff_fr_dt");
				l_chkReturn = false;
			} else {
				l_chkReturn = true;
			}
		}
	}
}

function resultDupRateMainMgmt_sheet1(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if (Number(doc[1]) > 0) {
				alert(getLabel('FMS_COM_ALT008'));
				sheet1.SelectCell(l_dupRow_sheet1, "eff_fr_dt");
				l_chkReturn = false;
			} else {
				l_chkReturn = true;
			}
		}
	}
}

