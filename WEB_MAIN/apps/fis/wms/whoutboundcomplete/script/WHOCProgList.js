/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCProgList.js
*@FileTitle  : Outbound Progress Search
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--*/

var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var fix_grid01="";
var docObjects=new Array();
var rtnary=new Array(2);
var firCalFlag=false;
var callBackFunc = "";
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
 * IE에서 jQuery ajax 호출이 한번만 되는 경우 발생(브라우저 버젼별 틀림)하여
 * cache옵션 false셋팅
 */
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
function loadPage() {
	var formObj=document.form;	
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	
	$('#wh_cd option[value=' + formObj.def_wh_cd.value + ']').attr('selected','selected');
	formObj.ctrt_no.value = formObj.def_wh_ctrt_no.value;	
	formObj.ctrt_nm.value = formObj.def_wh_ctrt_nm.value;
	
	$("#cond_fm_date").val(ComGetDateAdd(null, "d", -31, "-"));
	$("#cond_to_date").val(ComGetNowInfo());
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid() {
//	doWork("SEARCHLIST");
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
		case "cond_tp_no":
			var txt="Booking No|Complete(LP) No";
			var val="WOB_BK_NO|WOB_OUT_NO";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;		
		case "cond_tp_date":
			var txt="Booking Date|Complete Date";
			var val="BK_DATE|OUTBOUND_DT";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	} 			
			break;
		case "ord_tp_cd":
			vTextSplit=ord_tp_cdText.split("|");
			vCodeSplit=ord_tp_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "ALL", "ALL");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
        	}
			break;
		case "ob_status":
			var txt="ALL|Booked|Issued|Allocated|Planned|Completed";
			var val="ALL|N|I|A|P|C";
			vTextSplit=txt.split("|");
			vCodeSplit=val.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(1);
        	} 			
			break;		
		}
	} 
function initControl() {
//	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//    //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
document.onkeydown=obj_keydown;
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wob_bk_no":	
				btn_Search();
			break;	
			case "item_cd":	
				btn_Search();
			break;
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
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.form;
        switch(srcName) {
		case "btn_cond_to_date":	
			var cal=new ComCalendarFromTo();
			cal.displayType="date";
            cal.select(formObj.cond_fm_date, formObj.cond_to_date, 'MM-dd-yyyy');
			break;
		case "btn_ctrt_no" :	
				var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_no="+formObj.ctrt_no.value;
//				rtnary=new Array(1);
//				rtnary[0]=formObj.ctrt_nm.value;
			      
			    callBackFunc = "setCtrtNoInfo";
//				ComOpenPopup(sUrl, 900, 620, "setCtrtNoInfo", "0,0", true);
				modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
			break;
		case "btn_buyer_cd":
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]=formObj.buyer_nm.value;
        	rtnary[2]=window;
			var sUrl="./CMM_POP_0010.clt";
		    callBackFunc = "setBuyerInfo";
			modal_center_open(sUrl, rtnary, 1150,650,"yes");
			break;			
		case "SEARCHLIST":
			btn_Search();
			break;
		case "EXCEL":
			btn_Excel();
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

/*
 * 팝업 관련 로직 시작
 */
function setCtrtNoInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
	var formObj=document.form;
	var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.ctrt_no,rtnValAry[0]);
	setFieldValue(formObj.ctrt_nm,rtnValAry[1]);	
}
}
function setBuyerInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
	var formObj=document.form;
	var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.buyer_cd,rtnValAry[0]);
	setFieldValue(formObj.buyer_nm,rtnValAry[2]);
}
}

function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":
			with(sheetObj){
			      var prefix=fix_grid01;
			
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
			
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('WHOCProgList_HDR1'), Align:"Center"},
			                      { Text:getLabel('WHOCProgList_HDR2'), Align:"Center"} ];
			      InitHeaders(headers, info);
			      
			      var cols = [ 
								 {Type:"Date",     	Hidden:0,  	Width:120,     	Align:"Center",     ColMerge:1,     Format:"Ymd",     	SaveName:prefix+"bk_date",     		KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:120,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"wob_bk_no",     	KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:78,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"ob_status_nm",     KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:90,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"ord_tp_nm",     	KeyField:0      												},
					             {Type:"Text",      Hidden:1, 	Width:10,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"rn",     			KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:90,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"item_cd",     		KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:300,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"item_nm",     		KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:40,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"item_pkgunit",     KeyField:0      												},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Integer",     SaveName:prefix+"item_pkgqty", 		KeyField:0,		PointCount:0		          		},
					             {Type:"Text",     	Hidden:0,  	Width:160,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"pkg_info",     	KeyField:0      												},
					             {Type:"Float",     Hidden:0,  	Width:80,     	Align:"Right",     	ColMerge:1,     Format:"Integer",     SaveName:prefix+"item_ea_qty",    	KeyField:0,		PointCount:0	 		      		},
					             {Type:"Float",     Hidden:0,  	Width:80,     	Align:"Right",     	ColMerge:1,     Format:"Integer",     SaveName:prefix+"alloc_ea_qty",   	KeyField:0,		PointCount:0	  		      		},
					             {Type:"Float",     Hidden:0,  	Width:80,     	Align:"Right",     	ColMerge:1,     Format:"Integer",     SaveName:prefix+"lp_item_ea_qty", 	KeyField:0,		PointCount:0	    	      		},
					             {Type:"Float",     Hidden:0,  	Width:80,     	Align:"Right",     	ColMerge:1,     Format:"Integer",     SaveName:prefix+"out_item_ea_qty",	KeyField:0,		PointCount:0	    	      		},
					             {Type:"Text",      Hidden:1, 	Width:10,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"seq",     			KeyField:0      												},
					             {Type:"Date",     	Hidden:0,  	Width:120,     	Align:"Center",     ColMerge:1,     Format:"Ymd",    	SaveName:prefix+"inbound_dt",     	KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:110,    	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"lot_no",     		KeyField:0      												},
					             {Type:"Text",     	Hidden:0,  	Width:80,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"wh_loc_nm",     	KeyField:0      												},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Integer",     SaveName:prefix+"pick_item_ea_qty", KeyField:0,		PointCount:0      					},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Float",     		SaveName:prefix+"item_cbm",     	KeyField:0,     PointCount:3						},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Float",     		SaveName:prefix+"item_cbf",     	KeyField:0,     PointCount:3						},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Float",     		SaveName:prefix+"item_grs_kgs",     KeyField:0,  	PointCount:3    					},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Float",     		SaveName:prefix+"item_grs_lbs",     KeyField:0,  	PointCount:3    					},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Float",     		SaveName:prefix+"item_net_kgs",     KeyField:0,  	PointCount:3    					},
					             {Type:"Float",     Hidden:0,  	Width:55,     	Align:"Right",     	ColMerge:1,     Format:"Float",     		SaveName:prefix+"item_net_lbs",     KeyField:0,  	PointCount:3    					},
					             {Type:"Text",     	Hidden:0,  	Width:70,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"buyer_cd",     	KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:110,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"buyer_nm",     	KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:100,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"ctrt_no",     		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:110,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"ctrt_nm",     		KeyField:0,      												},
					             {Type:"Date",     	Hidden:0,  	Width:80,     	Align:"Center",     ColMerge:1,     Format:"Ymd", 		SaveName:prefix+"exp_dt",    		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:80,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"lot_04",     		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:80,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"lot_05",     		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:110,    	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"lot_id",     		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:110,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"wave_no",     		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:140,     	Align:"Left",    	ColMerge:1,     Format:"",     				SaveName:prefix+"sao_no",     		KeyField:0,      												},
					             {Type:"Combo",     Hidden:0,  	Width:140,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"wh_cd",     		KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:95,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"wib_bk_no",     	KeyField:0,      												},
					             {Type:"Text",     	Hidden:0,  	Width:120,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"po_no",     		KeyField:0,      												},
					             {Type:"Text",      Hidden:1, 	Width:90,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"ob_status",     	KeyField:0,      												},
					             {Type:"Text",      Hidden:1, 	Width:90,     	Align:"Center",     ColMerge:1,     Format:"",     				SaveName:prefix+"whoc_flag",     	KeyField:0,      												} ];
			       
			      		InitColumns(cols);
			      		SetHeaderRowHeight(30);
			      		SetSheetHeight(480);
			      		SetColProperty(prefix+'wh_cd', {ComboText:WHNMLIST, ComboCode:WHCDLIST} );
			      		SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			      		SetAutoRowHeight(0);
			      		resizeSheet();
			      		SetEditable(0);
			      		
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
	var sheetObj=docObjects[0];
	var seq=0;
	var seqBkNo="";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ob_status_nm","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_out_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wib_bk_no","#0100FF");
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wave_no","#0100FF");
	}
	mergeSheetSearchEnd(sheetObj, 0, 11);
//		sheet1.SetMergeCell(2, 0, 32, 1);
		doHideProcess();
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wob_bk_no":
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
		case fix_grid01 + "ob_status_nm":
			if(sheetObj.GetCellValue(Row, fix_grid01 + "ob_status_nm") != ""){
				moveMgmt(sheetObj, Row, Col);
			}
			break;
		case fix_grid01 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no"));
			break;			
		case fix_grid01 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl, "WHInbkMgmt_" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no"));
			break;
	}
}
function moveMgmt(sheetObj,Row,Col) {
	var wob_bk_no=sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no");
	var ob_status=sheetObj.GetCellValue(Row, fix_grid01 + "ob_status");
	var whoc_flag=sheetObj.GetCellValue(Row, fix_grid01 + "whoc_flag");
    if ("N" == ob_status || "I" == ob_status) { // Booked or Issued   	
		var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+wob_bk_no;
		parent.mkNewFrame('Outbound Booking Management', sUrl, "WHOutbkMgmt_" + wob_bk_no);    	
    } else if ("A" == ob_status) { // Allocated
    	allc_wave_check(wob_bk_no);
		//var sParam = "wob_bk_no="+wob_bk_no;
		//var sUrl = "./AllcMgmt.clt?"+sParam;
		//parent.mkNewFrame("Allocation Management", sUrl);    	
    } else if ("P" == ob_status) { // Planned
    	// 중복 체크
    	wob_out_no_dupCheck(wob_bk_no, "LP");
    } else if ("C" == ob_status) { // Completed
    	// 중복 체크
    	wob_out_no_dupCheck(wob_bk_no, whoc_flag);
    }	
}
function allc_wave_check(wob_bk_no)
{
	var sParam="wob_bk_no="+ wob_bk_no;
	var formObj=document.form;
	var sXml=docObjects[0].GetSearchData("./searchWaveOrAllcDivGS.clt?"+sParam+"&f_cmd="+SEARCH01);
	if(sXml.replace(/^\s+|\s+$/gm,'') != ""){
	 var xmlDoc = $.parseXML(sXml);
	 var $xml = $(xmlDoc);
	 var wave_no= $xml.find("wave_no").text();
		if(wave_no.trim() == "")
		{
			var sParam="wob_bk_no="+wob_bk_no;
			var sUrl="./AllcMgmt.clt?"+sParam;
			parent.mkNewFrame('Allocation Management', sUrl, "AllcMgmt_" + wob_bk_no);
		}
		else
		{
			var sParam="wave_no="+wave_no;
			var sUrl="./WaveMgmt.clt?"+sParam;
			parent.mkNewFrame('Wave', sUrl, "WaveMgmt_" + wave_no);
		}
			
	}
	
}
function wob_out_no_dupCheck(wob_bk_no, whoc_flag) {
	var formObj = document.form;	

	var sXml = sheet1.GetSearchData("searchWHOCOutNoDupCheckGS.clt", "wob_bk_no="+wob_bk_no+"&whoc_flag="+whoc_flag+"&f_cmd="+SEARCH02);
	var xmlDoc = $.parseXML(sXml);
	var $xml = $(xmlDoc);
	
	var out_cnt = $xml.find("out_cnt").text();
	formObj.out_cnt.value = out_cnt;

	if (out_cnt == 1) {
		var sParam = "wob_bk_no="+wob_bk_no;
		ajaxSendPost(setWHOCInfo, 'reqVal','&goWhere=aj&bcKey=searchWHOCOutNoInfo&'+sParam, './GateServlet.gsl');
		
		
	} else if (out_cnt > 1) { // 한 BKG에 여러 O/B Complete No가 있을 경우는 팝업 실행
		var sUrl = "WHOCPopup.clt?wob_bk_no="+wob_bk_no;
		callBackFunc = "setWHOCPopupInfo";
	    modal_center_open(sUrl, callBackFunc, 250, 350 ,"yes");
	}
}
function setWHOCInfo(reqVal)
{
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				var wob_out_no = rtnArr[0];
				var whoc_flag = rtnArr[1];
				var search_no = "";
				var search_tp = "";
				var search_div = "";	
				
				if (whoc_flag == "BK") {
					search_no = wob_out_no;		
					search_tp = "WOB_OUT_NO";
					search_div = "bk";			
				} else if (whoc_flag == "LP") {
					search_no = wob_out_no;		
					search_tp = "LP_NO";
					search_div = "lp";			
				}	
				
				var sUrl = APP_PATH+"/WHOCUpdate.clt?search_no="+search_no+"&search_tp="+search_tp+"&search_div="+search_div;
				parent.mkNewFrame('Outbound Complete Update', sUrl);
			}
			else{
				formObj.item_grp_cd.value="";
			}
		}
		else{
			formObj.item_grp_cd.value="";
		}
	}
}
function setWHOCPopupInfo(rtnVal)
{
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var formObj=document.form;
			 var rtnValAry=rtnVal.split("|");
			var wob_out_no=rtnValAry[1];
			var whoc_flag=rtnValAry[2];
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
		 }
}

/*
 * 팝업 관련 로직 끝
 */
function btn_Search(){
	sheet1.RemoveAll();
	var formObj=document.form;
	if (validateForm(formObj, 'search')) {
		formObj.f_cmd.value = SEARCH;
		doShowProcess();
		 setTimeout(function(){
			var sheetObj=docObjects[0];
				sheet1.RemoveAll();
				var sXml="";
				sXml=sheetObj.GetSearchData("./searchWHOCProgListGS.clt", FormQueryString(formObj));
				sheetObj.LoadSearchData(sXml,{Sync:1} );
		 },100);
	}
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
	var prefix = fix_grid01;
	if(docObjects[0].RowCount() < 1){//no data
	      ComShowCodeMessage("COM132501");
	    }else{
	    //  docObjects[0].Down2Excel({ HiddenColumn:true,Merge:true,TreeLevel:false});
	    	sheet1.Down2Excel({FileName: "Outbound Progress Search",DownCols: makeHiddenSkipCol(sheet1), SheetDesign:1,Merge:1, HiddenColumn: 1, SheetName: "Outbound Progress Search", CheckBoxOnValue: "T", CheckBoxOffValue:" ", AutoSizeColumn: 1});
	    }
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search':
			// Warehouse 필수			
			if (ComIsEmpty(formObj.wh_cd)) {
				ComShowCodeMessage("COM12233");
				formObj.wh_cd.focus();
				doHideProcess();
				return false;
			}			
			//bk_no 또는 warehouse, contract no둘중하나는 필수로 입력되어야함.
			if (ComIsEmpty(formObj.wob_bk_no) && ComIsEmpty(formObj.wh_cd) && ComIsEmpty(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0114", "Warehouse or Contract No or Booking No");
				$("#wh_cd").focus();
				doHideProcess();
				return false;
			}
			//Booking No [Complete(LP) No] 가 없는경우 Booking [Complete] Date는 필수 (MAX 93일까지)
			if (ComIsEmpty(formObj.cond_no)) {
				if (ComIsEmpty(formObj.cond_fm_date)) {
				
					ComShowCodeMessage("COM0114", "Booking No [Complete(LP) No] or Booking(Complete) Date");
					formObj.cond_fm_date.focus();
					doHideProcess();
					return false;
				} 
				/* 3개월 duration 주석
				else {
					if (getDaysBetween2(formObj.cond_fm_date.value, formObj.cond_to_date.value) > 92) {
						ComShowCodeMessage("COM0141", "3", "(Booking(Complete) Date)");
						formObj.cond_fm_date.focus();
						return false;
					}
				}
				*/
			}
			
			
			if (!ComIsEmpty(formObj.cond_fm_date) && ComIsEmpty(formObj.cond_to_date)) {
				formObj.cond_to_date.value=ComGetNowInfo();
			}
			if (!ComIsEmpty(formObj.cond_fm_date) && !isDate(formObj.cond_fm_date)) {
				ComShowCodeMessage("COM0114", "Booking(Complete) Date");
				formObj.cond_fm_date.focus();
				doHideProcess();
				return false;
			}
			if (!ComIsEmpty(formObj.cond_to_date) && !isDate(formObj.cond_to_date)) {
				ComShowCodeMessage("COM0114", "Booking(Complete) Date");
				formObj.cond_to_date.focus();
				doHideProcess();
				return false;
			}
			if ((!ComIsEmpty(formObj.cond_fm_date)&&ComIsEmpty(formObj.cond_to_date))||(ComIsEmpty(formObj.cond_fm_date)&&!ComIsEmpty(formObj.cond_to_date))) {
				ComShowCodeMessage("COM0122", "Booking(Complete) Date");
				formObj.cond_fm_date.focus();
				doHideProcess();
				return false;
			}
			if (getDaysBetween2(formObj.cond_fm_date.value, formObj.cond_to_date.value)<0) {
				ComShowCodeMessage("COM0122", "Booking(Complete) Date!");
				formObj.cond_fm_date.focus();
				doHideProcess();
				return false;
			}
			break;
		}
	}
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */
function getLocInfo(obj) {
	var formObj=document.form;
	if (obj.value == "") {
		form.wh_cd.value="";
		form.wh_nm.value="";
	} else {
		searchLocInfo(formObj);
	}		
}
function searchLocInfo(obj){
	var formObj=document.form;
	ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+ComGetObjValue(formObj.wh_cd)+'&type=WH', './GateServlet.gsl');
}
function resultLocInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
	    formObj.wh_nm.value=rtnArr[0];
	   }
	   else{
	    formObj.wh_cd.value="";
	    formObj.wh_nm.value=""; 
	   }
	  }
	  else{
	   formObj.wh_cd.value="";
	   formObj.wh_nm.value=""; 
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	var formObj=document.form;
	if (obj.value == "") {
		form.ctrt_no.value="";
		form.ctrt_nm.value="";
	} else {
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
	}
}
function resultCtrtInfo(reqVal) {
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
		 formObj.ctrt_no.value="";
		 formObj.ctrt_nm.value=""; 
	 }
}
/*
 * Consignee search
 * OnKeyDown 13 or onChange
 */
function getCustInfo(obj){
	var formObj=document.form;
	if(obj.value != ""){
		ajaxSendPost(resultCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+formObj.buyer_cd.value, './GateServlet.gsl');	
	}
	else
	{
		form.buyer_cd.value="";
		form.buyer_nm.value="";
	}
}
function resultCustInfo(reqVal) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				formObj.buyer_nm.value=rtnArr[0];
			}
			else{
				formObj.buyer_cd.value="";
				formObj.buyer_nm.value="";	
			}
		}
		else{
			formObj.buyer_cd.value="";
			formObj.buyer_nm.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function mergeSheetSearchEnd(sheetObj, colStart, colNumber){
	if(sheetObj.RowCount() > 0){
		//var compare, col_continue="", status ="", order_type="";
		var rowFirstData = sheetObj.HeaderRows();
		var begin=0, end=0, flag = 0;
		var compare1=new Array();
		var compare2=new Array();
		var colRow = colNumber; // Merge 10 Rows First //sheetObj.ColCount; 
		for(var i = colStart ; i < colRow ; i ++ ){ // Column
			for(var  k=0; k <= i ; k++){
				compare1[k] = sheetObj.GetCellValue(rowFirstData, k);
			}
			begin = rowFirstData;
			end = 0;
			for(var j = sheetObj.HeaderRows() ; j <= sheetObj.LastRow() ; j++){ // Row : Ignore 2 Rows Headers
				//var compare2=new Array();
				for(var  k=0; k <= i ; k++){
					compare2[k] = sheetObj.GetCellValue(j, k);
				}
				for (var c=0; c <compare1.length; c++){
					if(compare1[c] != compare2[c]){
						flag = 0;
						break;
					}
					flag = 1;
				}
				if (flag == 1){
					end = j;
				}else{
						if(begin > 0 && end > begin){
								sheetObj.SetMergeCell(begin, i, end - begin + 1, 1);
						}
						for(var  k=0; k <= i ; k++){
							compare1[k] = sheetObj.GetCellValue(j, k);
						}
						begin = j;
				}
			}
			if(begin > 0 && end > begin){
				sheetObj.SetMergeCell(begin, i, end - begin + 1, 1);
			}
		}
	}
}