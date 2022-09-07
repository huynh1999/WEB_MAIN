/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLocMgmt.js
*@FileTitle  : Location Management
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--*/

var CHECKCHFLG="N";
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

var fix_grid01 = "Grd01", fix_grid02 = "Grd02", fix_grid03 = "", fix_grid04 = "Grd04", fix_grid05 = "Grd05";
/**
* Sheet  onLoad
*/
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
	//initControl();
	setBtnSts("N");
	var formObj=document.form;
	setFieldValue(formObj.in_loc_cd, formObj.in_loc_cd_send.value)
	if (formObj.in_loc_cd.value != ""){
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function setBtnSts(sts){
	var formObj=document.form;
	if(sts=="N"){
		ComBtnDisable("btn_Save1");
		ComBtnDisable("btn_Save2");
		ComBtnDisable("btn_Save3");
		ComBtnDisable("btn_Save4");
		ComBtnDisable("btn_Add1");
		ComBtnDisable("btn_Add2");
		ComBtnDisable("btn_Add3");
		ComBtnDisable("btn_Add4");
		ComBtnDisable("btn_Del1");
		ComBtnDisable("btn_Del2");
		ComBtnDisable("btn_Del3");
		ComBtnDisable("btn_Del4");
		ComBtnDisable("btn_Excel4");
	}else{
		ComBtnEnable("btn_Save1");
		ComBtnEnable("btn_Save2");
		ComBtnEnable("btn_Save3");
		ComBtnEnable("btn_Save4");
		ComBtnEnable("btn_Add1");
		ComBtnEnable("btn_Add2");
		ComBtnEnable("btn_Add3");
		ComBtnEnable("btn_Add4");
		ComBtnEnable("btn_Del1");
		ComBtnEnable("btn_Del2");
		ComBtnEnable("btn_Del3");
		ComBtnEnable("btn_Del4");
		ComBtnEnable("btn_Excel4");
	}
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	var sheetObject1=docObjects[0];   //t1sheet1
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "SEARCHLIST":
				btn_Search();
				break;
			case "btn_Add1":
				row_add1();
				break;
			case "btn_Del1":
				row_del1();
				break;
			case "btn_Save1":
				btn_Save1();
				break;
			case "btn_Add2":
				row_add2();
				break;
			case "btn_Del2":
				row_del2();
				break;
			case "btn_Save2":
				btn_Save2();
				break;
			case "btn_Add3":
				row_add3();
				break;
			case "btn_Del3":
				row_del3();
				break;
			case "btn_Save3":
				btn_Save3();
				break;
			case "btn_Add4":
				row_add4();
				break;
			case "btn_Del4":
				row_del4();
				break;
			case "btn_Save4":
				btn_Save4();
				break;	
			case "btn_Excel4":
				btn_Excel4();
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
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.id) {	
		case "space_tp_cd":
			vTextSplit=space_tp_cdText.split("|");
			vCodeSplit=space_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			break;	
		case "put_tp_cd":
			vTextSplit=put_tp_cdText.split("|");
			vCodeSplit=put_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			break;	
		case "abc_cd":
			vTextSplit=abc_cdText.split("|");
			vCodeSplit=abc_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			break;	
		case "use_flg_cd":
			vTextSplit=use_flg_cdText.split("|");
			vCodeSplit=use_flg_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
	    	}
			break;	
		case "prop_cd":
			vTextSplit=prop_cdText.split("|");
			vCodeSplit=prop_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
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
		    with(sheetObj){
			        
//		      var hdr1="|Zone|Space Type|Put Type|Zone Seq|ABC|USE|Remark|ibflag";
//		      var headCount=ComCountHeadTitle(hdr1);
		      var prefix="Grd01";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('WHLocMgmt_SHEET1_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"zone_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:2 , InputCaseSensitive:1},
		             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"space_tp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"put_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"zone_seq",    KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"abc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1000 },
		             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			       
				      InitColumns(cols);
				      SetEditable(1);
				      SetHeaderRowHeight(30);
				      SetAutoRowHeight(0);
				      SetSheetHeight(400);
				      //SetColProperty(0, prefix+"zone_cd", vtEngUpOther, "0123456789");
				      SetColProperty(0 ,prefix+"zone_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
				      SetColProperty(prefix+"space_tp_cd", {ComboText:space_tp_cdText, ComboCode:space_tp_cdCode} );
					  SetColProperty(prefix+"put_tp_cd", {ComboText:put_tp_cdText, ComboCode:put_tp_cdCode} );
					  SetColProperty(prefix+"abc_cd", {ComboText:abc_cdText, ComboCode:abc_cdCode} );
					  SetColProperty(prefix+"use_flg", {ComboText:use_flg_cdText, ComboCode:use_flg_cdCode} );
					  resizeSheet();
		      }
		      break;
	
		case 2:      //IBSheet1 init
		    with(sheetObj){
//			      var hdr1="|Zone|Block Code|Description|Loc CNT|Active|ibflag";
//			      var headCount=ComCountHeadTitle(hdr1);
			      var prefix="Grd02";

			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [{ Text:getLabel('WHLocMgmt_SHEET2_HDR1'), Align:"Center"}];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"zone_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"block_cd",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10, InputCaseSensitive:1 },
			             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"block_desc", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
			             {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_cnt",    KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"use_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(390);
			      SetEditable(1);
			      SetHeaderRowHeight(30);
			      SetAutoRowHeight(0);
			      SetColProperty(0 ,prefix+"block_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetColProperty(prefix+"use_flg", {ComboText:use_flg_cdText, ComboCode:use_flg_cdCode} );
			      resizeSheet();
		      }
		      break;
		case 3:      //IBSheet1 init
		    with(sheetObj){
//		      var hdr1="Location|Zone|Block|ibflag";
//		      var headCount=ComCountHeadTitle(hdr1);
		      var prefix="";//"Grd03";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [{ Text:getLabel('WHLocMgmt_SHEET3_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
	
		      var cols = [ 
		                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_loc_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"zone_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"block_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" }
		              ];
		       
		      InitColumns(cols);
		      SetSheetHeight(390);
		      SetEditable(1);
		      SetHeaderRowHeight(30);
		      SetAutoRowHeight(0);
		      resizeSheet();
	      }
	      break;
		case 5:      //IBSheet4 init
		    with(sheetObj){
//			      var hdr1="|Property|Putaway|Allocation|Move|Replenish|Adjust|Active|Remark|ibflag";
//			      var headCount=ComCountHeadTitle(hdr1);
			      var prefix="Grd04";

			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('WHLocMgmt_SHEET4_HDR1'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"prop_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"putaway_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			             {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"alloc_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			             {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"move_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			             {Type:"CheckBox",  Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"replenish_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			             {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"adjust_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
			             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"use_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1000 },
			             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(400);
			      SetEditable(1);
			      SetHeaderRowHeight(30);
			      SetAutoRowHeight(0);
			      SetColProperty(prefix+"prop_cd", {ComboText:prop_cdText, ComboCode:prop_cdCode} );
				  SetColProperty(prefix+"use_flg", {ComboText:use_flg_cdText, ComboCode:use_flg_cdCode} );
				  resizeSheet();
		      }
		      break;
		case 4:      //IBSheet5 init
		    with(sheetObj){
//			      var hdr1="|System Code|Location|Zone|Block|Line|Row|Floor|Space Type|Put Type|Loc Prop|Loc Seq|ABC|Max CBM|Max Weight|Width|Length|Height|Active|Remark|ibflag";
//			      var headCount=ComCountHeadTitle(hdr1);
			      var prefix="Grd05";

			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [{ Text:getLabel('WHLocMgmt_SHEET5_HDR1'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_loc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"wh_loc_nm",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, InputCaseSensitive:1 , EditLen:20},
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"zone_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"block_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_line",    KeyField:1,   CalcLogic:"",   Format:"", 			PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:2 },
			             {Type:"Text",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_row",     KeyField:1,   CalcLogic:"",   Format:"",		    PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:2 },
			             {Type:"Text",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_floor",   KeyField:1,   CalcLogic:"",   Format:"", 			PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:2 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"space_tp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"put_tp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"prop_cd",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Int",       Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_seq",     KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
			             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"abc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:130,   Align:"Right",   ColMerge:1,   SaveName:prefix+"max_cbm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT_COUNT,   UpdateEdit:1,   InsertEdit:1,   EditLen:10},
			             {Type:"Float",     Hidden:0,  Width:130,   Align:"Right",   ColMerge:1,   SaveName:prefix+"max_kgs",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"width",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:6, MaximumValue:999.99,ToolTip:"Format : ###.##"},
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"length",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:6, MaximumValue:999.99,ToolTip:"Format : ###.##"},
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"height",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:6, MaximumValue:999.99,ToolTip:"Format : ###.##"},
			             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:prefix+"rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1000 },
			             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(400);
			      SetEditable(1);
			      SetHeaderRowHeight(30);
			      SetAutoRowHeight(0);
			      
			      SetColProperty(0 ,prefix+"wh_loc_nm", {AcceptKeys:"E|N|[-/]", InputCaseSensitive:1});
			      SetColProperty(0 ,prefix+"block_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      
			      SetColProperty(prefix+"space_tp_cd", {ComboText:space_tp_cdText, ComboCode:space_tp_cdCode} );
				  SetColProperty(prefix+"put_tp_cd", {ComboText:put_tp_cdText, ComboCode:put_tp_cdCode} );
				  SetColProperty(prefix+"abc_cd", {ComboText:abc_cdText, ComboCode:abc_cdCode} );
				  SetColProperty(prefix+"use_flg", {ComboText:use_flg_cdText, ComboCode:use_flg_cdCode} );
				  SetColProperty(prefix+"prop_cd", {ComboText:prop_cdText, ComboCode:prop_cdCode} );
				  
				  // #3272 Upper Case conversion for row, line, floor
			      SetColProperty(0 ,prefix+"loc_line" ,  {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetColProperty(0 ,prefix+"loc_row" ,   {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
			      SetColProperty(0 ,prefix+"loc_floor" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
				  
				  resizeSheet();
		      }
		      break;
	}
}


function resizeSheet(){
	ComResizeSheet(docObjects[0]);
	ComResizeSheet(docObjects[1]);
	ComResizeSheet(docObjects[2]);
	ComResizeSheet(sheet4);
	ComResizeSheet(sheet5);
	
}
//조회버튼
//function btn_Search1() {
//	
//	var formObj = document.form;
//	
//	if(formObj.in_loc_cd.value == ""){
//		ComShowCodeMessage("COM0081","Warehouse");
//		ComAlertFocus(formObj.in_loc_cd, "");
//		return;
//	}
//	
//	btn_Search();
//}
var InputName="loc_cd|loc_nm|use_yn";
function btn_Search(){
	var formObj=document.form;
	if(formObj.in_loc_cd.value == ""){
		ComShowCodeMessage("COM0081","Warehouse");
		ComAlertFocus(formObj.in_loc_cd, "");
		return;
	}
	doShowProcess();
	setTimeout(function(){
			//공통 zone combo 정보 조회 후 initCombo
			get_zone_Combo();
			//헤더 및 탭4개의 시트5개정보 binding
			formObj.f_cmd.value=SEARCH;
		    var sXml=docObjects[0].GetSearchData("./WHLocMgmtGS.clt", FormQueryString(formObj, ""));
		    if(getTotalRow(sXml) != "0")
		    	{
		    		displayData(sXml);
		    	}
		    else
		    	{
		    	ComShowCodeMessage("COM0185");
		    	return;
			}
		    docObjects[0].RemoveAll();
		    docObjects[1].RemoveAll();
		    docObjects[2].RemoveAll();
		    sheet4.RemoveAll();
		    sheet5.RemoveAll();
		    formObj.f_cmd.value=SEARCH01;
		    var sXml=docObjects[0].GetSearchData("./WHLocMgmt_1GS.clt", FormQueryString(formObj, ""));
		    docObjects[0].LoadSearchData(sXml,{Sync:1} );
		    
		    formObj.f_cmd.value=SEARCH02;
		    var sXml=docObjects[1].GetSearchData("./WHLocMgmt_2GS.clt", FormQueryString(formObj, ""));
		    docObjects[1].LoadSearchData(sXml,{Sync:1} );
		    
		    formObj.f_cmd.value=SEARCH04;
		    var sXml=sheet4.GetSearchData("./WHLocMgmt_4GS.clt", FormQueryString(formObj, ""));
		    sheet4.LoadSearchData(sXml,{Sync:1} );
		    
		    formObj.f_cmd.value=SEARCH05;
		    var sXml=sheet5.GetSearchData("./WHLocMgmt_5GS.clt", FormQueryString(formObj, ""));
		    sheet5.LoadSearchData(sXml,{Sync:1} );
		    
			
				setBtnSts("S");
			
			//ComSetObjValue(formObj.form_mode, "UPDATE");
			 
	},100);
	doHideProcess();
}

function get_zone_Combo(){
	var formObj=document.form;
	var sheetObj=docObjects[1];
	var sheetObj4=sheet5;
// 	var sXml=docObjects[1].GetSearchData("./WHLocMgmtGS.clt", "loc_cd="+formObj.in_loc_cd.value+"&f_cmd="+SEARCH40);
//	if(getXmlDataNullToNullString(sXml,'code') != ""){
//		var code=getXmlDataNullToNullString(sXml,'code');
//		var name=getXmlDataNullToNullString(sXml,'name');
	
	
	var sParam="loc_cd="+formObj.in_loc_cd.value+"&f_cmd="+SEARCH09;
	
   // var sXml=sheetObj.GetSearchData("searchWHLocBlockSubLocList.clt", sParam);
    var sXml=sheetObj.GetSearchData("./WHLocMgmtGS.clt", sParam);
    if(getTotalRow(sXml) != "0"){
    var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	var code= $xml.find("code").text();
	var name= $xml.find("name").text();
		sheetObj.SetColProperty("Grd02zone_cd", {ComboText:code, ComboCode:name} );
		sheetObj4.SetColProperty("Grd05zone_cd", {ComboText:"|"+name, ComboCode:"|"+code} );
	}
}
function sub_location_Search(zone, block_cd){
	doShowProcess();
	setTimeout(function(){
		var formObj=document.form;
		var sheetObj=docObjects[2];
		var sParam="loc_cd="+formObj.loc_cd.value+"&zone_cd="+zone+"&block_cd=" + block_cd+"&f_cmd="+SEARCH03;
		
	   // var sXml=sheetObj.GetSearchData("searchWHLocBlockSubLocList.clt", sParam);
	    var sXml=sheetObj.GetSearchData("./WHLocMgmt_3GS.clt", sParam);
	    //var xml = convertColOrder(sXml, fix_grid03);
	    sheetObj.LoadSearchData(sXml,{Sync:1} );
	},100);
	doHideProcess(); 
}
function get_prop_Combo(){
//	var formObj=document.form;
//	var sheetObj=sheet5;
// 	var sXml=docObjects[1].GetSearchData("searchPropComboList.clt", "loc_cd="+formObj.loc_cd.value);
//	if(getXmlDataNullToNullString(sXml,'code') != ""){
//		var code=getXmlDataNullToNullString(sXml,'code');
//		var name=getXmlDataNullToNullString(sXml,'name');
//		sheetObj.SetColProperty("Grd05prop_cd", {ComboText:name, ComboCode:code} );
	var formObj=document.form;
	var sheetObj=sheet5;
	var sParam="loc_cd="+formObj.loc_cd.value+"&f_cmd="+SEARCH06;
	
   // var sXml=sheetObj.GetSearchData("searchWHLocBlockSubLocList.clt", sParam);
    var sXml=sheetObj.GetSearchData("./WHLocMgmtGS.clt", sParam);
    if(getTotalRow(sXml) != "0"){
    var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	var code= $xml.find("code").text();
	var name= $xml.find("name").text();
	
	sheetObj.SetColProperty("Grd05prop_cd", {ComboText:name, ComboCode:code} );
    
	}
}
//Order Plan 조회후 Co-Sales 콤보셋팅을 한다.
function sheet1_OnSearchEnd(){
	if(docObjects[0].RowCount()> 0){
		//get_zone_Combo();
	}	
}
function sheet2_OnSearchEnd(){
	if(docObjects[1].RowCount()> 0){
		sub_location_Search(docObjects[1].GetCellValue(1, "Grd02zone_cd"), docObjects[1].GetCellValue(1, "Grd02block_cd"));
	}		
	else
	{
		docObjects[2].RemoveAll();
	}
}
function sheet4_OnSearchEnd(){
	if(sheet4.RowCount()> 0){
//		get_prop_Combo();
	}		
}
function sheet5_OnSearchEnd(){
	/*2014.03.14 콤보에서 팝업형식으로 변경으로 주석처리
	var formObj=document.form;
	var sheetObj=sheet5;
	var prefix="Grd05";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
//parameter changed[check again]CLT 		var sXml=docObjects[1].GetSearchData("searchBlockComboList.clt", "loc_cd="+formObj.loc_cd.value+"&zone_cd="+sheetObj.cellValue(i, "Grd05zone_cd"));
		//if(getXmlDataNullToNullString(sXml,'code') != ""){
			var code=getXmlDataNullToNullString(sXml,'code');
			var name=getXmlDataNullToNullString(sXml,'name');
			//sheetObj.InitDataCombo(0, "Grd05block_cd",   code,  name);
			sheetObj.CellComboItem(i,"Grd05block_cd", {ComboText:"|"+name, ComboCode:"|"+code} );
			//sheetObj.CellValue(i, "Grd05block_cd") = sheetObj.CellSearchValue(i, "Grd05block_cd");
	}
	*/
}
function sheet2_OnChange(sheetObj, row, col) {
}
function sheet2_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr == "Grd02zone_cd" || colStr == "Grd02block_cd"){
		sub_location_Search(sheetObj.GetCellValue(Row, "Grd02zone_cd"), sheetObj.GetCellValue(Row, "Grd02block_cd"));
	}
}
function sheet3_OnChange(sheetObj, row, col) {
}
function sheet5_OnChange(sheetObj, row, col, Value) {
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	var sheetObj=sheet5;
	//alert(colStr);
	if(colStr == "Grd05zone_cd"){     
		/*$.ajax({
			url : "searchWHLocZone.clt?loc_cd="+formObj.loc_cd.value+"&zone_cd="+sheetObj.cellValue(row, "Grd05zone_cd"),
			success : function(result) {
				//if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
				//	alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
				//}
				sheetObj.SetCellValue(row,"Grd05space_tp_cd",getXmlDataNullToNullString(result.xml,'space_tp_cd'),0);
				sheetObj.SetCellValue(row,"Grd05put_tp_cd",getXmlDataNullToNullString(result.xml,'put_tp_cd'),0);
				sheetObj.SetCellValue(row,"Grd05abc_cd",getXmlDataNullToNullString(result.xml,'abc_cd'),0);
			}
		});*/
		
		doShowProcess();
		setTimeout(function(){
			var sXml=sheetObj.GetSearchData("./WHLocMgmtGS.clt?loc_cd="+formObj.loc_cd.value+"&zone_cd="+sheetObj.GetCellValue(row, "Grd05zone_cd")+"&f_cmd="+SEARCH07);			
			
			if(getTotalRow(sXml) != "0"){
			    var xmlDoc = $.parseXML(sXml);
				var $xml = $(xmlDoc);
				var space_tp_cd= $xml.find("space_tp_cd").text();
				var put_tp_cd= $xml.find("put_tp_cd").text();
				var abc_cd= $xml.find("abc_cd").text();
			sheetObj.SetCellValue(row,"Grd05space_tp_cd",space_tp_cd,0);
			sheetObj.SetCellValue(row,"Grd05put_tp_cd",put_tp_cd,0);
			sheetObj.SetCellValue(row,"Grd05abc_cd",abc_cd,0);
			}
		},100);
		doHideProcess(); 
		
		sheetObj.SetCellValue(row,"Grd05wh_loc_cd",sheetObj.GetCellValue(row,"Grd05zone_cd")+ComLpad(sheetObj.GetCellValue(row,"Grd05loc_line"), 2, "0")+ComLpad(sheetObj.GetCellValue(row,"Grd05loc_row"), 2, "0")+ComLpad(sheetObj.GetCellValue(row,"Grd05loc_floor"), 2, "0"),0);
		//sheetObj.CellValue2(row,"Grd05wh_loc_nm") = sheetObj.CellValue(row,"Grd05zone_cd")+"-"+ComLpad(sheetObj.CellValue(row,"Grd05loc_line"), 2, "0")+ComLpad(sheetObj.CellValue(row,"Grd05loc_row"), 2, "0")+"-"+ComLpad(sheetObj.CellValue(row,"Grd05loc_floor"), 2, "0");
		sheetObj.SetCellValue(row,"Grd05block_cd","",0);
	}else if(colStr == "Grd05loc_line" || colStr == "Grd05loc_row" || colStr == "Grd05loc_floor"){
		sheetObj.SetCellValue(row,"Grd05wh_loc_cd",sheetObj.GetCellValue(row,"Grd05zone_cd")+ComLpad(sheetObj.GetCellValue(row,"Grd05loc_line"), 2, "0")+ComLpad(sheetObj.GetCellValue(row,"Grd05loc_row"), 2, "0")+ComLpad(sheetObj.GetCellValue(row,"Grd05loc_floor"), 2, "0"),0);
		//sheetObj.CellValue2(row,"Grd05wh_loc_nm") = sheetObj.CellValue(row,"Grd05zone_cd")+"-"+ComLpad(sheetObj.CellValue(row,"Grd05loc_line"), 2, "0")+ComLpad(sheetObj.CellValue(row,"Grd05loc_row"), 2, "0")+"-"+ComLpad(sheetObj.CellValue(row,"Grd05loc_floor"), 2, "0");
	}else if(colStr == "Grd05block_cd" && Value.trim() != ""){ 
		if(sheetObj.GetCellValue(row,"Grd05zone_cd").trim() == "")
		{
			ComShowCodeMessage("COM0114","Zone");
			sheetObj.SetCellValue(row,"Grd05block_cd","",0);
			sheetObj.SelectCell(row, "Grd05zone_cd");
			return;
		}
		var sParam="block_cd="+Value.trim() + "&loc_cd=" + $("#loc_cd").val() + "&zone_cd="+sheetObj.GetCellValue(row, "Grd05zone_cd")+"&f_cmd="+SEARCH08;
		/*$.ajax({
			url : "searchLocationBlockInfo.clt?"+sParam,
			success : function(result) {
				sheetObj.SetCellValue(row, col,getXmlDataNullToNullString(result.xml,'block_cd'),0);
				if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
					alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
					sheetObj.SelectCell(row, col);
				}
			}
		});*/
		
		doShowProcess();
		setTimeout(function(){
			var sXml=sheetObj.GetSearchData("./WHLocMgmtGS.clt?"+sParam);	
			 var xmlDoc = $.parseXML(sXml);
				var $xml = $(xmlDoc);
				var block_cd= $xml.find("block_cd").text();
			sheetObj.SetCellValue(row, col,block_cd,0);
			if($xml.find("exception_msg").text()!=""){
				alert($xml.find("exception_msg").text());
				sheetObj.SelectCell(row, col);
			}
		},100);
		doHideProcess(); 
	}
}
function sheet3_OnPopupClick(sheetObj, row, col){
}
function sheet4_OnPopupClick(sheetObj, row, col){
}
function sheet5_OnPopupClick(sheetObj, row, col)
{
	var colName=sheetObj.ColSaveName(col);
	var colValue=sheetObj.GetCellValue(row, col) ;
	//var cal = new ComCalendarGrid();
	with(sheetObj)
	{
		if(colName == "Grd05block_cd")
		{
			if(sheetObj.GetCellValue(row,"Grd05zone_cd").trim() == "")
			{
				ComShowCodeMessage("COM0114","Zone");
				sheetObj.SelectCell(row, "Grd05zone_cd");
				return;
			}
			var sParam="f_block_cd="+colValue.trim() + "&f_loc_cd=" + $("#loc_cd").val() + "&f_zone_cd="+sheetObj.GetCellValue(row, "Grd05zone_cd");
			var sUrl="./WHLocBlockPopup.clt?" + sParam;
			//ComOpenPopup(sUrl, 500, 550, "setBlockCode", "0,0", true);
			callBackFunc = "setBlockCode";
			modal_center_open(sUrl, callBackFunc, 900,520,"yes");
		}
	}
}

function sheet5_OnKeyUp(sheetObj, Row, Col, KeyCode, Shif) {
	var colID = sheet5.ColSaveName(Col);
	var cellVal = sheet5.GetEditText(Row, Col).split(".");
	if ( colID == "Grd05max_cbm" || colID == "Grd05max_kgs") {
//		var valDcRt = parseFloat(sheet5.GetEditText(Row, Col));
		// greater than 18-3
		if(cellVal[0].length > 12){
			var int_val = cellVal[0].substring(0, 9) ;
			var valDcRt = parseFloat(int_val);
			sheet5.SetCellValue(Row, Col, valDcRt,0);
			return;
		}
	}else if( colID == "Grd05width" || colID == "Grd05length" || colID == "Grd05height" ){
		// greater than 7-2
		if(cellVal[0].length > 7){
			var int_val =  cellVal[0].substring(0, 4) ;
			var valDcRt = parseFloat(int_val);
			sheet5.SetCellValue(Row, Col, valDcRt);
			return;
		}
	}
}


//function setBlockCode(aryPopupData){
//	var sheetObj=sheet5;
//	sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd05block_cd",aryPopupData[0][1]);
//}
function setBlockCode(rtnVal){
	var formObj = document.form;
	var sheetObj=sheet5;
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "Grd05block_cd",rtnValAry[1]);
	}        
    
}
function btn_Save1() {
	var formObj=document.form;
	
	if(sheet1.RowCount('U') + sheet1.RowCount('D') + sheet1.RowCount('I') <= 0){
		ComShowCodeMessage("COM0321");
		return;
	}
	
	if(validation1()){
		if(ComShowCodeConfirm("COM0063")){
			formObj.f_cmd.value=MULTI01;
			var sParam=FormQueryString(formObj, null, "Grd00");
			sParam += "&" + sheet1.GetSaveString(false)//ComGetSaveString(docObjects[0],  true, true);
			//sParam += "&" + ComGetSaveString(docObjects[2],  true, true);
 			//var saveXml=docObjects[0].GetSearchData("saveWHLocZone.clt", sParam);
 			var saveXml=docObjects[0].GetSearchData("./WHLocMgmt_1GS.clt", sParam);
			//docObjects[0].LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
//				ComShowCodeMessage("COM0093", "");
				showCompleteProcess();
				btn_Search();
			}
		}
	}	
}
function btn_Save2() {
	var formObj=document.form;
	
	if(sheet2.RowCount('U') + sheet2.RowCount('D') + sheet2.RowCount('I') <= 0){
		ComShowCodeMessage("COM0322");
		return;
	}
	
	if(validation2()){
		if(ComShowCodeConfirm("COM0063")){
			formObj.f_cmd.value=MULTI02;
			var sParam=FormQueryString(formObj, null, "Grd00");
			sParam += "&" + sheet2.GetSaveString(false);
			//sParam += "&" + ComGetSaveString(docObjects[2],  true, true);
 			//var saveXml=docObjects[1].GetSearchData("saveWHLocBlock.clt", sParam);
 			var saveXml=docObjects[1].GetSearchData("./WHLocMgmt_2GS.clt", sParam);
			//docObjects[1].LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
//				ComShowCodeMessage("COM0093", "");
				showCompleteProcess();
				btn_Search();
			}
		}
	}	
}
function btn_Save3() {
	var formObj=document.form;
	
	if(sheet4.RowCount('U') + sheet4.RowCount('D') + sheet4.RowCount('I') <= 0){
		ComShowCodeMessage("COM0326");
		return;
	}
	
	if(validation3()){
		if(ComShowCodeConfirm("COM0063")){
			formObj.f_cmd.value=MULTI03;
			var sParam=FormQueryString(formObj,null, "Grd00");
			sParam += "&" + sheet4.GetSaveString(false);//ComGetSaveString(sheet4,  true, true);
			//sParam += "&" + ComGetSaveString(docObjects[2],  true, true);
 			//var saveXml=sheet4.GetSearchData("saveWHLocProp.clt", sParam);
 			var saveXml=sheet4.GetSearchData("./WHLocMgmt_4GS.clt", sParam);
			//sheet4.LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
 			if(saveXml.trim() == ""){
 				//show message error
 				return;
 			}
			if( saveXml.indexOf('<ERROR>')== -1){
//				ComShowCodeMessage("COM0093", "");
				showCompleteProcess();
				btn_Search();
			}
		}
	}	
}
function btn_Save4() {
	var formObj=document.form;
	
	if(sheet5.RowCount('U') + sheet5.RowCount('D') + sheet5.RowCount('I') <= 0){
		ComShowCodeMessage("COM0325");
		return;
	}
	
	if(validation4()){
		if(ComShowCodeConfirm("COM0063")){
			formObj.f_cmd.value=MULTI04;
			var sParam=FormQueryString(formObj,null, "Grd00");
			sParam += "&" + sheet5.GetSaveString(false)//ComGetSaveString(sheet5,  true, true);
			//sParam += "&" + ComGetSaveString(docObjects[2],  true, true);
 			//var saveXml=sheet5.GetSearchData("saveWHLocLoc.clt", sParam);
			var saveXml=sheet5.GetSearchData("./WHLocMgmt_5GS.clt", sParam);
			//sheet5.LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
//				ComShowCodeMessage("COM0093", "");
				showCompleteProcess();
				btn_Search();
			}
		}
	}	
}
function validation1(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd01";
	if(sheetObj.RowCount()== 0){
		ComShowCodeMessage("COM0308", "Zone");
		return false;
	}
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ibflag") != "D"){
			if(sheetObj.GetCellValue(i, prefix+"zone_cd") != ""){
				for(var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow();j++){
					if(i != j){
						if(sheetObj.GetCellValue(j, prefix+"ibflag") != "D"){
							if( sheetObj.GetCellValue(i, prefix+"zone_cd") == sheetObj.GetCellValue(j, prefix+"zone_cd") ){
								ComShowCodeMessage("COM0004", "Zone! ["+i+"row]"+" and ["+j+"row]");
								sheetObj.SelectCell( j, prefix+"zone_cd");
								return false;
							}
						}
					}
				}
			}else{
				ComShowCodeMessage("COM0005", "Zone");
				return false;
			}
		}
	}
	return true;
}
function validation2(){
	var formObj=document.form;
	var sheetObj=docObjects[1];
	var prefix="Grd02";
	if(sheetObj.RowCount()== 0){
		ComShowCodeMessage("COM0308", "Block");
		return false;
	}
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ibflag") != "D"){
			if(sheetObj.GetCellValue(i, prefix+"zone_cd") == ""){
				ComShowCodeMessage("COM0005", "Zone");
				sheetObj.SelectCell( i, prefix+"zone_cd");
				return false;
			}
			if(sheetObj.GetCellValue(i, prefix+"block_cd") == ""){
				ComShowCodeMessage("COM0005", "Block Code");
				sheetObj.SelectCell( i, prefix+"block_cd");
				return false;
			}
			for(var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow();j++){
				if(i != j){
					if(sheetObj.GetCellValue(j, prefix+"ibflag") != "D"){
						if( sheetObj.GetCellValue(i, prefix+"zone_cd")+sheetObj.GetCellValue(i, prefix+"block_cd") == sheetObj.GetCellValue(j, prefix+"zone_cd")+sheetObj.GetCellValue(j, prefix+"block_cd") ){
							ComShowCodeMessage("COM0004", "Zone&Block Code! ["+i+"row]"+" and ["+j+"row]");
							sheetObj.SelectCell( j, prefix+"block_cd");
							return false;
						}
					}
				}
			}
		}
	}
	return true;
}
function validation3(){
	var formObj=document.form;
	var sheetObj=sheet4;
	var prefix="Grd04";
	if(sheetObj.RowCount()== 0){
		ComShowCodeMessage("COM0308", "Property");
		return false;
	}
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ibflag") != "D"){
			if(sheetObj.GetCellValue(i, prefix+"prop_cd") != ""){
				for(var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow();j++){
					if(i != j){
						if(sheetObj.GetCellValue(j, prefix+"ibflag") != "D"){
							if( sheetObj.GetCellValue(i, prefix+"prop_cd") == sheetObj.GetCellValue(j, prefix+"prop_cd") ){
								ComShowCodeMessage("COM0004", "Property! ["+i+"row]"+" and ["+j+"row]");
								sheetObj.SelectCell( j, prefix+"prop_cd");
								return false;
							}
						}
					}
				}
			}else{
				ComShowCodeMessage("COM0005", "Property");
				return false;
			}
		}
	}
	return true;
}
function validation4(){
	//var formObj   = document.form;
	var sheetObj=sheet5;
	var prefix="Grd05";
	if(sheetObj.RowCount()== 0){
		ComShowCodeMessage("COM0308", "Location");
		return false;
	}
	//비어있는값 체크
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+"ibflag") != "D"){
//			if(sheetObj.GetCellValue(i, prefix+"wh_loc_cd") == ""){
//				ComShowCodeMessage("COM0005", "System Code");
//				sheetObj.SelectCell( i, prefix+"wh_loc_cd");
//				return false;
//			}
			if(sheetObj.GetCellValue(i, prefix+"wh_loc_nm") == ""){
				ComShowCodeMessage("COM0005", "Location");
				sheetObj.SelectCell( i, prefix+"wh_loc_nm");
				return false;
			}
			if(sheetObj.GetCellValue(i, prefix+"zone_cd") == ""){
				ComShowCodeMessage("COM0005", "Zone");
				sheetObj.SelectCell( i, prefix+"zone_cd");
				return false;
			}
			if(sheetObj.GetCellValue(i, prefix+"loc_line") == ""){
				ComShowCodeMessage("COM0005", "Line");
				sheetObj.SelectCell( i, prefix+"loc_line");
				return false;
			}
			if(sheetObj.GetCellValue(i, prefix+"loc_row") == ""){
				ComShowCodeMessage("COM0005", "Row");
				sheetObj.SelectCell( i, prefix+"loc_row");
				return false;
			}
			if(sheetObj.GetCellValue(i, prefix+"loc_floor") == ""){
				ComShowCodeMessage("COM0005", "Floor");
				sheetObj.SelectCell( i, prefix+"loc_floor");
				return false;
			}
			if(sheetObj.GetCellValue(i, prefix+"prop_cd") == ""){
				ComShowCodeMessage("COM0005", "Loc Prop");
				sheetObj.SelectCell( i, prefix+"prop_cd");
				return false;
			}
		}
	}
	//dup체크
	var wh_loc_cd_row=sheetObj.ColValueDup(prefix+"wh_loc_cd", false);
	var wh_loc_nm_row=sheetObj.ColValueDup(prefix+"wh_loc_nm", false);
	if(wh_loc_cd_row > 0)
	{
		ComShowCodeMessage("COM0004", "System Code! [" + sheetObj.GetCellValue(wh_loc_cd_row, prefix+"wh_loc_cd") + "]");
			sheetObj.SelectCell(wh_loc_cd_row, prefix+"wh_loc_cd");
			return false;
	}
	if(wh_loc_nm_row > 0)
	{
		ComShowCodeMessage("COM0004", "Location! [" + sheetObj.GetCellValue(wh_loc_nm_row, prefix+"wh_loc_nm") + "]");
			sheetObj.SelectCell(wh_loc_nm_row, prefix+"wh_loc_nm");
			return false;
	}
	return true;
}
function goTabSelect(isNumSep) {
    if( isNumSep == "01" ) {
    	document.all.Tab01.className="On";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="Off";
    } else if( isNumSep == "02" ) {
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="On";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="Off";
    } else if( isNumSep == "03" ) {
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="On";
        document.all.Tab04.className="Off";
    } else if( isNumSep == "04" ) {
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="On";
    }
    var tabObjs=document.getElementsByName('tabLayer');
    if(isNumSep=='01') {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='02') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='03') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';        
    }else if(isNumSep=='04') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';        
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
function getLocInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.in_loc_cd.value="";
		form.in_loc_nm.value="";
	}else{
		searchLocInfo(formObj, ComGetObjValue(formObj.in_loc_cd), "in_loc_cd");
	}
}
function searchLocInfo (form, value, col){
	var formObj=document.form;
	//var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+ComGetObjValue(formObj.in_loc_cd)+"&type=WH");			
	
	ajaxSendPost(resultLocNm, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+formObj.in_loc_cd.value+'&type=WH', './GateServlet.gsl');
	
	
}
function resultLocNm(reqVal) {
//	var formObj=document.form;
//	if(getXmlDataNullToNullString(resultXml,'loc_cd') != ""){
//		formObj.in_loc_cd.value=getXmlDataNullToNullString(resultXml,'loc_cd');
//		formObj.in_loc_nm.value=getXmlDataNullToNullString(resultXml,'loc_nm');
//		btn_Search();
//	}else{
//		formObj.in_loc_cd.value="";
//		formObj.in_loc_nm.value="";
//	}
//	
	
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.in_loc_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.in_loc_cd.value="";
	    formObj.in_loc_nm.value=""; 
	   }
	  }
	  else{
	   formObj.in_loc_cd.value="";
	   formObj.in_loc_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
	//formObj.in_loc_cd.value = getXmlDataNullToNullString(resultXml,'loc_cd');
	//formObj.in_loc_nm.value = getXmlDataNullToNullString(resultXml,'loc_nm');
	//if(getXmlDataNullToNullString(resultXml,'exception_msg')!=""){
	//	alert(getXmlDataNullToNullString(resultXml,'exception_msg'));
	//}
}
function row_add1() {
	var sheetObj1=docObjects[0];		
	/*
if(sheetObj1.GetCellValue(sheetObj1.LastRow(), "Grd01ord_tp_lvl1_cd") == ""){
		sheetObj1.RemoveAll();
    }
	*/
//no support[check again]CLT 	var intRows=sheetObj1.Rows;
	var intRows=sheetObj1.RowCount() + 1;
	sheetObj1.DataInsert(intRows);
	/*
//parameter changed[check again]CLT 	var sXml=docObjects[0].GetSearchData("searchOrderTrans.clt", "code="+sheetObj1.GetCellValue(intRows, "Grd01ord_tp_lvl1_cd"));
	if(getXmlDataNullToNullString(sXml,'code') != ""){
		var code=getXmlDataNullToNullString(sXml,'code');
		var name=getXmlDataNullToNullString(sXml,'name');
		sheetObj1.CellComboItem(intRows,"Grd01ord_tp_lvl2_cd", {ComboText:name, ComboCode:code} );
	}
	//sheetObj1.CellValue(intRows, "Grd01svc_wo")   = "Y";
	//Main Service Type
	var code="";
if(sheetObj1.GetCellValue(intRows, "Grd01ord_tp_lvl1_cd") == "F"){
code=sheetObj1.GetCellValue(intRows, "Grd01ord_tp_lvl2_cd");
	}else{
code=sheetObj1.GetCellValue(intRows, "Grd01ord_tp_lvl1_cd");
	}
	if(code != ""){
//parameter changed[check again]CLT 		var sXml=docObjects[0].GetSearchData("searchMainServiceType.clt", "code="+code);
		if(getXmlDataNullToNullString(sXml,'code') != ""){
			var code=getXmlDataNullToNullString(sXml,'code');
			var name=getXmlDataNullToNullString(sXml,'name');
			sheetObj1.CellComboItem(intRows,"Grd01pnl_svc_tp_cd", {ComboText:"|"+name, ComboCode:"|"+code} );
		}
	}
	*/
}
function row_add2() {
	var sheetObj2=docObjects[1];		
//no support[check again]CLT 	var intRows=sheetObj2.Rows;
	var intRows=sheetObj2.RowCount() + 1;
	sheetObj2.DataInsert(intRows);
/*if(sheetObj1.GetCellValue(2, "Grd01ord_tp_cd") != "" && sheetObj1.GetCellValue(2, "Grd01ord_tp_cd") != undefined){
if(sheetObj2.GetCellValue(sheetObj2.LastRow(), "Grd02ord_tp_cd") == ""){
			sheetObj2.RemoveAll();
	    }
//no support[check again]CLT 		var intRows=sheetObj2.Rows;
		sheetObj2.DataInsert(intRows);
	}else{
		ComShowCodeMessage("COM0237");
	}*/
}
function row_add3() {
	var sheetObj3=sheet4;		
//no support[check again]CLT 	var intRows=sheetObj3.Rows;
	var intRows=sheetObj3.RowCount() + 1;
	sheetObj3.DataInsert(intRows);
	// #1348 [WMS4.0] Warehouse Location Property
	sheetObj3.SetCellValue(intRows, "Grd04replenish_flg", "1");
}
function row_add4() {
	var sheetObj4=sheet5;		
//no support[check again]CLT 	var intRows=sheetObj4.Rows;
	var intRows=sheetObj4.RowCount() + 1;
	sheetObj4.DataInsert(intRows);
}
//Order Plan Row 삭제
function row_del1(){
	var sheetObj1=docObjects[0];
	//var sheetObj2 = docObjects[2];
	//var sheetObj3 = sheet4;
	/*for(var i=2; i<=sheetObj1.LastRow();i++){
if(sheetObj1.GetCellValue(i, "Grd01ibflag") != "I"){
if(sheetObj1.GetCellValue(i, "Grd01del_chk") == "1"){
				for(var j=2; j<=sheetObj2.LastRow();j++){
if(sheetObj1.GetCellValue(i, "Grd01ord_tp_cd") == sheetObj2.GetCellValue(j, "Grd02ord_tp_cd")){
alert("Seq [" + sheetObj1.GetCellValue(i, "Grd01seq") + "] Do Not Delete. Please Check Co-Sales.");
						return;
					}
				}
				for(var k=1; k<=sheetObj3.LastRow();k++){
if(sheetObj1.GetCellValue(i, "Grd01ord_tp_cd") == sheetObj3.GetCellValue(k, "Grd03ord_tp_cd")){
alert("Seq [" + sheetObj1.GetCellValue(i, "Grd01seq") + "] Do Not Delete. Please Check NetWork Commission.");
						return;
					}
				}
			}
		}
	}*/
	if(sheetObj1.RowCount()> 0){
		ComRowHideDelete(sheetObj1, "Grd01del_chk");
	}
	sheetObj1.CheckAll("Grd01del_chk",0);
}
//CoSales Row 삭제
function row_del2(){
	var formObj=document.form;
	var sheetObj=docObjects[1];
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd02del_chk");
	}
	sheetObj.CheckAll("Grd02del_chk",0);
}
//NetworkCommission Row 삭제
function row_del3(){
	var formObj=document.form;
	var sheetObj=sheet4;
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd04del_chk");
	}
	sheetObj.CheckAll("Grd04del_chk",0);
}
function row_del4(){
	var formObj=document.form;
	var sheetObj=sheet5;
	if(sheetObj.RowCount()> 0){
		ComRowHideDelete(sheetObj, "Grd05del_chk");
	}
	sheetObj.CheckAll("Grd05del_chk",0);
}
function btn_Excel4()
{
//parameter changed[check again]CLT 	sheet5.Down2Excel();
	if(sheet5.RowCount() < 1){//no data
	      ComShowCodeMessage("COM132501");
	    }else{
	     var prefix="Grd05"; 
	     //docObjects[0].Down2Excel(-1);
	     sheet5.Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1});
	    }
}
function obj_keydown(){ 
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
function displayData(xml){
	var formObj  = document.form;
	formObj.form_mode.value= "UPDATE";		
	 var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  $("#loc_cd").val($xml.find( "loc_cd").text());
	  $("#loc_nm").val($xml.find( "loc_nm").text());
	  $("#use_yn").val($xml.find( "use_yn").text());
	  $("#loc_loc_nm").val($xml.find( "loc_loc_nm").text());
	 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="Grd01rmk"){
		doWork('btn_Add1');
		sheetObj.SelectCell(row+1, 1);
	}
}