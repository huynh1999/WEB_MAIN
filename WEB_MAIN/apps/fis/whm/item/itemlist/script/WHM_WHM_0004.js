/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WHM_WHM_004.js
*@FileTitle  : WareHouse List
*@author     : Tin.Luong
*@version    : 1.0
*@since      : 2014/12/15
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var docObjects=new Array();
var sheetCnt=0;
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
    var formObj  = document.frm1;
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj  = docObjects[0];
    var sheetObj1 = docObjects[1];
	try {
		switch(srcName) {
		case "SEARCHLIST":
	   		var params = "f_cmd=" + SEARCH + 
	   				"&cust_cd=" + formObj.cust_cd.value +
	   				"&cust_nm=" + formObj.cust_nm.value.toUpperCase() +
	   				"&splr_cd=" + formObj.splr_cd.value +
	   				"&use_flg=" + $("#use_flg").children("option").filter(":selected").text() +
	   				"&itm_cd="  + formObj.item_select_cd.value +
	   				"&cust_itm_id=" + formObj.item_select_id.value +
	   				"&itm_nm=" + formObj.item_select_nm.value;
//	   		var sXml = 
	   			sheet1.DoSearch("./WHM_WHM_0004GS.clt" , params);
//	   		sheet1.LoadSearchData(sXml);
	   	break;
		case "WH_POPLIST":
        	   rtnary=new Array(1);
	  		   var formObj=document.frm1;
	  		   
	  		   rtnary[0]="1";
	  		   rtnary[1]=formObj.cust_nm.value;
	  		   rtnary[2]=window;
	  		   
	  		   callBackFunc = "WH_POPLIST";
	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
		case "WH_POPLIST1":
			rtnary=new Array(1);
			var formObj=document.frm1;
			
			rtnary[0]="1";
			rtnary[1]=formObj.supplier_nm.value;
			rtnary[2]=window;
			
			callBackFunc = "WH_POPLIST1";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			break;
		case "NEW":
			var paramStr="./WHM_WHM_0003.clt?f_cmd=-1";
	   	   	parent.mkNewFrame('Item Entry', paramStr);
			break;
		case "CLEAR":
			clearAll();
			break;
		case "EXCEL":
	   		if(docObjects[0].RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
    		}
   	 	break;
		}
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	ComShowMessage(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	ComShowMessage(getLabel('FMS_COM_ERR001') + " - " + e);
        }
	}
}
function setDocumentObject(sheet_obj){
	   docObjects[sheetCnt++]=sheet_obj;
	}
function loadPage() {
	var formObj  = document.frm1;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
}
function initSheet(sheetObj,sheetNo) {
	var formObj  = document.frm1;
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
		      var cnt=0;
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:'Customer|Customer Item Code|Internal Code|Name|HTS Code|Unit|Inner Qty|KG|LB|Width|Width|Height|Height|Length|Length|CBM|CFT', Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ 
		             {Type:"Text",      Hidden:0,  Width:300,   Align:"Left",     ColMerge:1,   SaveName:"cust_nm",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Center",	  ColMerge:1,   SaveName:"itm_cd",     		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Center",    ColMerge:0,   SaveName:"cust_itm_cd",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",     ColMerge:0,   SaveName:"itm_nm",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",    ColMerge:0,   SaveName:"itm_hts_cd",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Combo",     Hidden:0,  Width:80,   Align:"Center",    ColMerge:0,   SaveName:"itm_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",  	  ColMerge:0,   SaveName:"itm_inr_qty",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_wgt",       	KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_wgt_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_wdt",       	KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_wdt_inch",   KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_hgt",       	KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_hgt_inch",   KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_len",       	KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_len_inch",   KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",     ColMerge:0,   SaveName:"itm_vol",       	KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",    ColMerge:0,   SaveName:"itm_vol_cft",     KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:0,   InsertEdit:0 }
		              ];
		       
		      InitColumns(cols);
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		      SetColProperty('itm_ut_cd', {ComboText:UNITCD2, ComboCode:UNITCD1} );
		      SetEditable(1);
		      SetSheetHeight(500);
		   }                                                      
		break;
    }
}
function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}
function WH_POPLIST(rtnVal){
	var formObj = document.frm1;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.cust_cd.value=rtnValAry[0];//full_nm
		   formObj.cust_nm.value=rtnValAry[2];//full_nm
	   }    
	}
function WH_POPLIST1(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.splr_cd.value=rtnValAry[0];//full_nm
		formObj.supplier_nm.value=rtnValAry[2];//full_nm
	}    
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		s_type="trdpCode";
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
	else{
		if(str == "CUSTUMER"){
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
		}
		if (CODETYPE == "SUPPLIER") {
			formObj.splr_cd.value="";// itm_hts_cd AS param1
			formObj.supplier_nm.value="";// itm_hts_nm AS param2
		}
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.splr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.supplier_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.splr_cd.value="";				//itm_hts_cd  AS param1
				formObj.supplier_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function select_option(){
	var formObj = document.frm1;
	formObj.item_select_cd.value = "";
	formObj.item_select_id.value = "";
	formObj.item_select_nm.value = "";
	
	var option = $("#select_opt").children("option").filter(":selected").text();
	if(option == "Internal Code"){
		document.getElementById("item_select_cd").style.display = "none";
		document.getElementById("item_select_id").style.display = "";
		document.getElementById("item_select_nm").style.display = "none";
	}else if(option == "Name"){
		document.getElementById("item_select_cd").style.display = "none";
		document.getElementById("item_select_id").style.display = "none";
		document.getElementById("item_select_nm").style.display = "";
	}else if(option == "Customer Item Code"){
		document.getElementById("item_select_cd").style.display = "";
		document.getElementById("item_select_id").style.display = "none";
		document.getElementById("item_select_nm").style.display = "none";
	}
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				ComShowMessage('COM12212');
//				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var opener = window.dialogArguments;
	 if (!opener) opener=window.opener;
	 if (!opener) opener = parent;
	var formObj=document.frm1;
   	doProcess=true;
   	var paramStr="";
   	paramStr += "./WHM_WHM_0003.clt?f_cust_itm_cd="+ sheetObj.GetCellValue(Row,"cust_itm_cd");
   	parent.mkNewFrame('Item Entry', paramStr, "WHM_WHM_0003_SHEET_" +sheetObj.GetCellValue(Row, "cust_itm_cd"));
   	//paramStr += "&f_cust_itm_cd=" + sheetObj.GetCellValue(Row,"cust_itm_cd");
   	//parent.mkNewFrame('Item Entry', paramStr);
   
   	//opener.openWindow(paramStr);
}
function clearAll(){
	var formObj = document.frm1;
	formObj.item_select_cd.value = "";
	formObj.item_select_id.value = "";
	formObj.item_select_nm.value = "";
	formObj.cust_cd.value = "";
	formObj.cust_nm.value = "";
	formObj.splr_cd.value = "";
	formObj.supplier_nm.value = "";
	
	sheet1.RemoveAll();
}
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	chkSizeType();
}
function chkSizeType(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
		if(formObj.f_len_ut_cd[0].checked){
			// 센치
			sheetObj.SetColHidden("itm_wdt_inch",1);
			sheetObj.SetColHidden("itm_hgt_inch",1);
			sheetObj.SetColHidden("itm_len_inch",1);
			
			sheetObj.SetColHidden("itm_wdt",0);
			sheetObj.SetColHidden("itm_hgt",0);
			sheetObj.SetColHidden("itm_len",0);
		}else if(formObj.f_len_ut_cd[1].checked){
			// 인치 
			sheetObj.SetColHidden("itm_wdt_inch",0);
			sheetObj.SetColHidden("itm_hgt_inch",0);
			sheetObj.SetColHidden("itm_len_inch",0);
			
			sheetObj.SetColHidden("itm_wdt",1);
			sheetObj.SetColHidden("itm_hgt",1);
			sheetObj.SetColHidden("itm_len",1);
		}
	// 시트 합계 계산
}

function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}