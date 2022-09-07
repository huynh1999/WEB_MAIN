/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCList.js
*@FileTitle  : Outbound Complete Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--%>*/
var docObjects=new Array();
var sheetCnt=0;

var firCalFlag=false;

var rtnary = new Array(1);
var callBackFunc = "";

var fix_grid01="Grd01";
var loading_flag="N";

var WMS_QTY_FORMAT  = "Integer";  //QTY  InitDataProperty에서 사용
var WMS_QTY_FORMAT2 = "Integer";//QTY  InitDataProperty2에서 사용
var WMS_QTY_POINT = 0;            //QTY
var WMS_CBM_POINT = 3;            //CBM, GWT, NWT
var WMS_KGS_POINT = 3;            //KGS, GWT, NWT
var MST_CBM_POINT = 5;            //CBM, CBF
var MST_KGS_POINT = 3;            //KGS, GWT, NWT

function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}

    loading_flag="Y";
    
	if (ComIsEmpty(formObj.req_search_no)) { //번호가 없을경우
		
		 $('#wh_cd option[value=' + formObj.def_wh_cd.value + ']').attr('selected','selected');
//		formObj.wh_cd.value = formObj.def_wh_cd.value;
//		formObj.wh_nm.value = formObj.def_wh_nm.value;
		formObj.ctrt_no.value = formObj.def_wh_ctrt_no.value;	
		formObj.ctrt_nm.value = formObj.def_wh_ctrt_nm.value;
		
		$("#bk_date_fm").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#bk_date_to").val(ComGetNowInfo());
		$("#outbound_dt_fm").val(ComGetDateAdd(null, "d", -31, "-"));
		$("#outbound_dt_to").val(ComGetNowInfo());		
	} else {		
		$("#wob_out_no").val($("#req_search_no").val());
		btn_SearchLink();
	}
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.bk_date_fm,  formObj.bk_date_to, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.outbound_dt_fm, formObj.outbound_dt_to,  'MM-dd-yyyy');
        break;
    }
}

function doWork(srcName){
	
	var formObj=document.form;
//	var srcName=ComGetEvent("name");
	
	switch(srcName) {
	case "btn_ctrt_no" :
		
	    callBackFunc = "setCtrtNoInfo";
	    modal_center_open('./ContractRoutePopup.clt?ctrt_nm=' + formObj.ctrt_nm.value + "&ctrt_no=" + formObj.ctrt_no.value, rtnary, 900, 580,"yes");
	    
		break;
	case "btn_buyer_cd":
		rtnary=new Array(1);
	    rtnary[0]="";
	    rtnary[1]=formObj.buyer_nm.value;
	    rtnary[2]=window;
	    callBackFunc = "setBuyerInfo";
	    modal_center_open('./CMM_POP_0010.clt', callBackFunc, 1150,650,"yes");
	    
	break;
	case "SEARCHLIST":
		btn_Search();
		break;
	case "EXCEL":
		btn_Excel_Dl();
		break;
	}
}

function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	btn_Search();
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}

function searchList(){
	document.forms[0].f_CurPage.value=1;
	btn_Search();
}

function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if( s_code != "" ) {
		if( tmp == "onKeyDown" ) {
			if(ComGetEvent("keycode") == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				else if(CODETYPE=="SHIPTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} 
		else if( tmp == "onBlur" ) {
			if( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				else if(CODETYPE=="SHIPTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}
	else{
		if(str == "BILLTO"){
			formObj.buyer_cd.value="";//trdp_cd  AS param1
			formObj.buyer_nm.value="";//eng_nm   AS param2
		}
//		else if(str == "SHIPTO"){
//			formObj.f_ship_to_cd.value="";//trdp_cd  AS param1
//			formObj.f_ship_to_nm.value="";//eng_nm   AS param2
//		}
	}
}

function trdpCdReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');	

			if(CODETYPE =="BILLTO"){
				
				if(masterVals[5]=='CR'){

					var crdLmtAmt = masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt = masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt = crdLmtAmt - curLmtAmt;
					var overDueAmt= masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal= masterVals[22]==""?0:eval(masterVals[22]);

					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr = new Array();
							//objArr[0] = doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1] = doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.buyer_cd.value = "";
								formObj.buyer_nm.value = "";
								return;
							}
						} else if (balLmtAmt < 0){
							var objArr = new Array();
							//objArr[0] = doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1] = doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.buyer_cd.value = "";//trdp_cd  AS param1
								formObj.buyer_nm.value = "";//eng_nm   AS param2
								return;
							}
						} else if (overDueAmt > 0) {
							var objArr = new Array();
							objArr[0] = doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.buyer_cd.value = "";//trdp_cd  AS param1
								formObj.buyer_nm.value = "";//eng_nm   AS param2
								return;
							}
						}
					}
				}
				
				formObj.buyer_cd.value = masterVals[0];		//trdp_cd  AS param1
				formObj.buyer_nm.value = masterVals[3];		//eng_nm   AS param2
			}
//			else if(CODETYPE=="SHIPTO"){
//				formObj.f_ship_to_cd.value = masterVals[0];		//trdp_cd  AS param1
//				formObj.f_ship_to_nm.value = masterVals[3];		//eng_nm   AS param2
//			}
		}
		else{
			if(CODETYPE =="BILLTO"){
				formObj.buyer_cd.value = "";				//trdp_cd  AS param1
				formObj.buyer_nm.value = "";				//eng_nm   AS param2
			}
//			else if(CODETYPE=="SHIPTO"){
//				formObj.f_ship_to_cd.value = "";				//trdp_cd  AS param1
//				formObj.f_ship_to_nm.value = "";				//eng_nm   AS param2
//			}
		}
	}
	else{
		//SEE_BMD_MSG43
	}
}

function CtrtPopup(){
	var formObj=document.form;
	callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?ctrt_nm=' + formObj.ctrt_nm.value, rtnary, 900, 580,"yes");
}

function CustPopup(){
	var formObj=document.form;
	callBackFunc = "setBuyerInfo";
    modal_center_open('./CMM_POP_0010.clt?cust_nm=' + formObj.buyer_nm.value + '&clear_flg=Y', rtnary, 1150,650,"yes");
}

function initSheet(sheetObj, sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	        
	        var prefix=fix_grid01;

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('WHOCList_HDR1'), Align:"Center"},
	                        { Text:getLabel('WHOCList_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",     Hidden:0,  Width:50,     Align:"Center",       ColMerge:1,           SaveName:prefix+"seq",                KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:150,     Align:"Center",       ColMerge:1,           SaveName:prefix+"wob_out_no",         KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Date",     Hidden:0,  Width:120,     Align:"Center",       ColMerge:1,           SaveName:prefix+"outbound_dt",        KeyField:0,          Format:"Ymd", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:80,     Align:"Center",       ColMerge:1,           SaveName:prefix+"lp_sts_nm",          KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Date",     Hidden:0,  Width:120,     Align:"Center",       ColMerge:1,           SaveName:prefix+"bk_date",            KeyField:0,          Format:"Ymd", 		PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:130,     Align:"Center",       ColMerge:1,           SaveName:prefix+"wob_bk_no",          KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:100,     Align:"Left",         ColMerge:1,           SaveName:prefix+"cust_ord_no",        KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:100,     Align:"Center",       ColMerge:1,           SaveName:prefix+"ord_tp_nm",          KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:90,     Align:"Left",         ColMerge:1,           SaveName:prefix+"item_cd",            KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:300,    Align:"Left",         ColMerge:1,           SaveName:prefix+"item_nm",            KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:80,     Align:"Center",       ColMerge:1,           SaveName:prefix+"item_pkgunit",       KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:80,     Align:"Right",        ColMerge:1,           SaveName:prefix+"item_pkgqty",        KeyField:0,          Format:WMS_QTY_FORMAT2,      PointCount:WMS_QTY_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:80,     Align:"Right",        ColMerge:1,           SaveName:prefix+"item_ea_qty",        KeyField:0,          Format:WMS_QTY_FORMAT2,      PointCount:WMS_QTY_POINT,	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:80,     Align:"Right",        ColMerge:0,           SaveName:prefix+"alloc_ea_qty",       KeyField:0,          Format:WMS_QTY_FORMAT2,      PointCount:WMS_QTY_POINT,	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:80,     Align:"Right",        ColMerge:0,           SaveName:prefix+"lp_item_ea_qty",     KeyField:0,          Format:WMS_QTY_FORMAT2,      PointCount:WMS_QTY_POINT,	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:80,     Align:"Right",        ColMerge:0,           SaveName:prefix+"out_item_ea_qty",    KeyField:0,          Format:WMS_QTY_FORMAT2,      PointCount:WMS_QTY_POINT,	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Date",     Hidden:0,  Width:120,     Align:"Center",       ColMerge:1,           SaveName:prefix+"inbound_dt",         KeyField:0,          Format:"Ymd", 		PointCount:0,				UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:110,    Align:"Left",         ColMerge:1,           SaveName:prefix+"lot_no",             KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:80,     Align:"Left",         ColMerge:1,           SaveName:prefix+"wh_loc_nm",          KeyField:0,          Format:"", 					PointCount:0,			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:55,     Align:"Right",        ColMerge:1,           SaveName:prefix+"out_item_cbm",       KeyField:0,          Format:"Float",         		PointCount:WMS_CBM_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:55,     Align:"Right",        ColMerge:1,           SaveName:prefix+"out_item_cbf",       KeyField:0,          Format:"Float",         		PointCount:WMS_CBM_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:55,     Align:"Right",        ColMerge:1,           SaveName:prefix+"out_item_grs_kgs",   KeyField:0,          Format:"Float",         		PointCount:WMS_KGS_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:55,     Align:"Right",        ColMerge:1,           SaveName:prefix+"out_item_grs_lbs",   KeyField:0,          Format:"Float",         		PointCount:WMS_KGS_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:55,     Align:"Right",        ColMerge:1,           SaveName:prefix+"out_item_net_kgs",   KeyField:0,          Format:"Float",         		PointCount:WMS_KGS_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Float",     Hidden:0,  Width:55,     Align:"Right",        ColMerge:1,           SaveName:prefix+"out_item_net_lbs",   KeyField:0,          Format:"Float",         		PointCount:WMS_KGS_POINT, 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:100,     Align:"Center",       ColMerge:1,           SaveName:prefix+"buyer_cd",           KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:150,    Align:"Left",         ColMerge:1,           SaveName:prefix+"buyer_nm",           KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:100,     Align:"Center",       ColMerge:1,           SaveName:prefix+"ctrt_no",            KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:150,    Align:"Left",         ColMerge:1,           SaveName:prefix+"ctrt_nm",            KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:70,     Align:"Center",       ColMerge:1,           SaveName:prefix+"eq_tpsz_cd",         KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:100,    Align:"Left",         ColMerge:1,           SaveName:prefix+"eq_no",              KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:120,    Align:"Left",         ColMerge:1,           SaveName:prefix+"seal_no",            KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Date",     Hidden:0,  Width:80,     Align:"Left",         ColMerge:1,           SaveName:prefix+"gate_in_hm",         KeyField:0,          Format:"Hm",				PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Date",     Hidden:0,  Width:80,     Align:"Left",         ColMerge:1,           SaveName:prefix+"gate_out_hm",        KeyField:0,          Format:"Hm",				PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Image",    Hidden:0,  Width:70,     Align:"Center",       ColMerge:1,           SaveName:prefix+"rmk_img",            KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:1,  Width:45,     Align:"Left",         ColMerge:1,           SaveName:prefix+"rmk",                KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Image",    Hidden:0,  Width:50,     Align:"Center",       ColMerge:1,           SaveName:prefix+"attach",             KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Date",     Hidden:0,  Width:120,     Align:"Center",       ColMerge:1,           SaveName:prefix+"exp_dt",             KeyField:0,          Format:"Ymd",			PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:80,     Align:"Left",         ColMerge:1,           SaveName:prefix+"lot_04",             KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:80,     Align:"Left",         ColMerge:1,           SaveName:prefix+"lot_05",             KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:150,    Align:"Left",         ColMerge:1,           SaveName:prefix+"lot_id",             KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:110,    Align:"Center",       ColMerge:1,           SaveName:prefix+"wave_no",            KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:110,    Align:"Left",         ColMerge:1,           SaveName:prefix+"so_no",              KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:120,     Align:"Center",       ColMerge:1,           SaveName:prefix+"wib_bk_no",          KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:0,  Width:120,     Align:"Center",       ColMerge:1,           SaveName:prefix+"po_no",              KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Combo",     Hidden:0,  Width:150,     Align:"Center",       ColMerge:1,           SaveName:prefix+"wh_cd",              KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:1,  Width:0,      Align:"Center",       ColMerge:1,           SaveName:prefix+"file_seq",           KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:1,  Width:0,      Align:"Center",       ColMerge:1,           SaveName:prefix+"file_path",          KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:1,  Width:0,      Align:"Center",       ColMerge:1,           SaveName:prefix+"file_sys_nm",        KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:1,  Width:0,      Align:"Center",       ColMerge:1,           SaveName:prefix+"file_org_nm",        KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	},
	    	             {Type:"Text",     Hidden:1,  Width:90,     Align:"Center",       ColMerge:1,           SaveName:prefix+"whoc_flag",          KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	}, 
	    	             {Type:"Text",     Hidden:1,  Width:90,     Align:"Center",       ColMerge:1,           SaveName:prefix+"Indexing",          KeyField:0,          Format:"", 					PointCount:0,  			 	UpdateEdit:0,   InsertEdit:0,	} 
    	             ];
	        InitColumns(cols);
	        SetSheetHeight(450);
	        SetEditable(0);
	        SetColProperty(prefix+'wh_cd', {ComboText:WHNMLIST, ComboCode:WHCDLIST} );
	        SetHeaderRowHeight(30);
		    SetAutoRowHeight(0);
		    resizeSheet();
	        SetImageList(0,"web/images/common/icon_text02_on.gif");
	        SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
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
function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var sheetObj=sheet1;//docObjects[0];
	var prefix=fix_grid01;
	doDispPaging(sheetObj.GetCellValue(2, prefix + 'Indexing'), getObj('pagingTb'));
	
	var seq=0;
	var seqBkNo="";
	sheetObj.SetImageList(2,"./web/img/main/icon_text_off.gif");
	sheetObj.SetImageList(1,"./web/img/main/icon_text_on.gif");
	sheetObj.SetImageList(3,"./web/img/main/icon_text02_off.gif");
	sheetObj.SetImageList(4,"./web/img/main/icon_text02_on.gif");
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++) {
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_out_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wave_no","#0100FF");
 		
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wob_bk_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wob_out_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "ctrt_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wib_bk_no", 1);
 		sheetObj.SetCellFontUnderline(i, fix_grid01 +  "wave_no", 1);
 		
		//attach
 		if (sheetObj.GetCellValue(i, fix_grid01 + "file_seq") != "") {
 			sheetObj.SetCellImage(i, fix_grid01 + "attach",4);
		} else {
 			sheetObj.SetCellImage(i, fix_grid01 + "attach",3);
		}	
		//remark
 		var value=sheetObj.GetCellValue(i, fix_grid01 + "rmk");
		if (value.length > 0) {
 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",1);
		} else {
 			sheetObj.SetCellImage(i, fix_grid01 + "rmk_img",2);
		}		
	}
}
function sheet1_OnClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wob_bk_no": // Outbound Booking No
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no"));
			break;
		case fix_grid01 + "wave_no":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "wave_no").trim() != "")
			{
				var sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wave_no");
				parent.mkNewFrame('Wave', sUrl, "WaveMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wave_no"));	
			}
		break;
		case fix_grid01 + "wob_out_no": // Complete (LP) No
			var wob_bk_no=sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no");
			var wob_out_no=sheetObj.GetCellValue(Row, fix_grid01 + "wob_out_no");
			var whoc_flag=sheetObj.GetCellValue(Row, fix_grid01 + "whoc_flag");
			var search_no="";
			var search_tp="";
			var search_div="";	
			if (whoc_flag == "BK") {
				search_no=wob_out_no;		
				search_tp="WOB_OUT_NO";
				search_div="bk";			
			} else if (whoc_flag == "LP") {
				search_no=wob_out_no;		
				search_tp="LP_NO";
				search_div="lp";			
			}
			var sUrl="./WHOCUpdate.clt?search_no="+search_no+"&search_tp="+search_tp+"&search_div="+search_div;
			parent.mkNewFrame('Outbound Complete Update', sUrl, "WHOCUpdate_" + search_no +"_"+ search_tp +"_"+ search_div);			
			break;	
		case fix_grid01 + "ctrt_no": // Contract
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));
			break;			
		case fix_grid01 + "wib_bk_no": // Inbound Booking No
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;			
        case fix_grid01 + "rmk_img": // remark
        	var value=sheetObj.GetCellValue(Row, fix_grid01 + "rmk");
			if (value.length > 0) {
				ComShowMemoPad2(sheetObj, Row, fix_grid01 + "rmk", true, 200, 100, Col, Col);
			}else 
				{
					ComShowMessage("Remark is empty");
				}
			break;
		case fix_grid01 + "attach": // attach
			if (sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") {
				fileDownload(sheetObj, Row, Col);
			}
			else
				{
					ComShowMessage("There are no attach file");
				}
			break;
	}
}

function fileDownload(sheetObj, Row, Col) {
	var formObj1=document.frm1;
	formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_path") + sheetObj.GetCellValue(Row, fix_grid01 + "file_sys_nm");
	formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm");
	formObj1.submit();
	showCompleteProcess();
}

function setCtrtNoInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.ctrt_no.value = rtnValAry[0];
		formObj.ctrt_nm.value = rtnValAry[1];
	}
}

function setBuyerInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.buyer_cd.value = rtnValAry[0];
		formObj.buyer_nm.value = rtnValAry[2];
	}
}
/*
 * 팝업 관련 로직 끝
 */
function btn_Search() {	
	var formObj=document.form;
	var sheetObj=docObjects[0];
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}
	//search
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;

	docObjects[0].DoSearch("./WHOCListGS.clt", FormQueryString(formObj,""));

}

function btn_SearchLink(){
	var formObj=document.form;
	var sheetObj1=docObjects[0];
	
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
	
	docObjects[0].DoSearch("./WHOCListGS.clt", FormQueryString(formObj,""));
	
}
/*
 * 엑셀다운로드
 */
function btn_Excel_Dl() 
{
	var prefix = fix_grid01;
	if(docObjects[0].RowCount() < 1){//no data
     	ComShowCodeMessage("COM132501");
    }else{
    	docObjects[0].Down2Excel( {SheetDesign:1,Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "ColumnColor: " + prefix + "wob_out_no|" + prefix + "wob_bk_no|" + prefix + "ctrt_no|" + prefix + "wib_bk_no"});
    }
}

function mmddyyyyToyyyymmdd(sDate){
	 var sDt = sDate.replaceAll("-","");
	 
	 var sYear = sDt.substring(4);
	 var sMonth = sDt.substring(0,2);
	 var sDay = sDt.substring(2,4);
	 
	 return sYear + sMonth + sDay;
	}

function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// Warehouse 체크			
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM12233");
				$("#wh_cd").focus();				
				return false;
			}
			//bk_no 또는 complete (lp) no 또는 warehouse, contract no둘중하나는 필수로 입력되어야함.
			if (ComIsEmpty(formObj.wob_bk_no) && ComIsEmpty(formObj.wob_out_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Warehouse or Contract No or Out booking No or OB complete (LP) No");
				$("#wh_cd").focus();
				return false;
			}
			//bk_no 또는 complete (lp) no가 없는경우 booking Date는 필수
			if (ComIsEmpty(formObj.wob_bk_no) && ComIsEmpty(formObj.wob_out_no) && ComIsEmpty(formObj.bk_date_fm) && ComIsEmpty(formObj.bk_date_to) && ComIsEmpty(formObj.outbound_dt_fm) && ComIsEmpty(formObj.outbound_dt_to)) {
				ComShowCodeMessage("COM0114", "Booking Date or complete Date");
				$("#bk_date_fm").focus();
				return false;
			}
			/* 3개월 duration 주석
			//Booking No 가 없는경우 Booking Date는 필수 (MAX 93일까지)
			if (getDaysBetween2(formObj.bk_date_fm.value, formObj.bk_date_to.value) > 92) {
				ComShowCodeMessage("COM0141", "3", "(Booking Date)");
				formObj.bk_date_fm.focus();
				return false;
			}
			*/
			//Booking Date
			if (!ComIsEmpty(formObj.bk_date_fm) && ComIsEmpty(formObj.bk_date_to)) {
				formObj.bk_date_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.bk_date_fm) && !isDate(formObj.bk_date_fm)) {
				ComShowCodeMessage("COM0114", "Booking Date");
				formObj.bk_date_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.bk_date_to) && !isDate(formObj.bk_date_to)) {
				ComShowCodeMessage("COM0114", "Booking Date");
				formObj.bk_date_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.bk_date_fm)&&ComIsEmpty(formObj.bk_date_to))||(ComIsEmpty(formObj.bk_date_fm)&&!ComIsEmpty(formObj.bk_date_to))) {
				ComShowCodeMessage("COM0122", "Booking Date");
				formObj.bk_date_fm.focus();
				return false;
			}
			if (getDaysBetween2(formObj.bk_date_fm.value, formObj.bk_date_to.value)<0) {
				ComShowCodeMessage("COM0122", "Booking Date!");
				formObj.bk_date_fm.focus();
				return false;
			}
			/* 3개월 duration 주석
			//Complete (LP) No 가 없는경우 Complete Date는 필수 (MAX 93일까지)
			if (getDaysBetween2(formObj.outbound_dt_fm.value, formObj.outbound_dt_to.value) > 92) {
				ComShowCodeMessage("COM0141", "3", "(Complete Date)");
				formObj.outbound_dt_fm.focus();
				return false;
			}
			*/
			//Complete Date
			if (!ComIsEmpty(formObj.outbound_dt_fm) && ComIsEmpty(formObj.outbound_dt_to)) {
				formObj.outbound_dt_to.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.outbound_dt_fm) && !isDate(formObj.outbound_dt_fm)) {
				ComShowCodeMessage("COM0114", "Complete Date");
				formObj.outbound_dt_fm.focus();
				return false;
			}
			if (!ComIsEmpty(formObj.outbound_dt_to) && !isDate(formObj.outbound_dt_to)) {
				ComShowCodeMessage("COM0114", "Complete Date");
				formObj.outbound_dt_to.focus();
				return false;
			}
			if ((!ComIsEmpty(formObj.outbound_dt_fm)&&ComIsEmpty(formObj.outbound_dt_to))||(ComIsEmpty(formObj.outbound_dt_fm)&&!ComIsEmpty(formObj.outbound_dt_to))) {
				ComShowCodeMessage("COM0122", "Complete Date");
				formObj.outbound_dt_fm.focus();
				return false;
			}
			if (getDaysBetween2(formObj.outbound_dt_fm.value, formObj.outbound_dt_to.value)<0) {
				ComShowCodeMessage("COM0122", "Complete Date!");
				formObj.outbound_dt_fm.focus();
				return false;
			}			
			//item_no가 입력된경우 
			if (!ComIsEmpty(formObj.item_cd) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Warehouse or Contract No");
				$("#Warehouse").focus();
				return false;
			}
			//lot_no 입력된 경우
			if (!ComIsEmpty(formObj.lot_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Warehouse or Contract No");
				$("#Warehouse").focus();
				return false;
			}
			break;
		}
	}
	return true;
}

function searchLocInfo(obj){
	
	var formObj=document.form;
	if(formObj.wh_cd.value != ''){
		ajaxSendPost(setLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+ComGetObjValue(formObj.wh_cd)+"&type=WH", './GateServlet.gsl');
	}else{
		formObj.wh_cd.value="";
		formObj.wh_nm.value="";	
	}
}

function setLocInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			formObj.wh_cd.value=rtnArr[1];
			formObj.wh_nm.value=rtnArr[0];
		}
		else{
			formObj.wh_cd.value="";
			formObj.wh_nm.value="";	
		}
	}
}

function searchTlCtrtInfo(){
	var formObj=document.form;
	if(formObj.ctrt_no.value != ''){
		ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ComGetObjValue(formObj.ctrt_no), './GateServlet.gsl');
	}else{
		formObj.ctrt_no.value="";
		formObj.ctrt_nm.value="";	
	}
}

function setTlCtrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			formObj.ctrt_nm.value=rtnArr[0];
			formObj.ctrt_no.value=rtnArr[1];
		}
		else{
			formObj.ctrt_nm.value="";
			formObj.ctrt_no.value="";	
		}
	}
}

function getCustInfo(){
	var formObj=document.form;
	if(formObj.buyer_cd.value != ''){
		ajaxSendPost(setCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+ComGetObjValue(formObj.buyer_cd), './GateServlet.gsl');
	}else{
		formObj.buyer_cd.value="";
		formObj.buyer_nm.value="";	
	}
}

function setCustInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			formObj.buyer_cd.value=rtnArr[1];
			formObj.buyer_nm.value=rtnArr[0];
		}
		else{
			formObj.buyer_cd.value="";
			formObj.buyer_nm.value="";	
		}
	}
}
