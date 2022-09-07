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
var changSortBy_flg = false;
var loading_flag = "N";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
var gJsWmsRuPoint = "N";
var vPointCount = 3;
var vEditLen = 12;

//#3390-Check Authority WMS CODE
var isWmsAuthOk = false; 

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
	for(var i=0;i<docObjects.length;i++){
		var sheetObject = docObjects[i];
	    comConfigSheet(sheetObject);
	    initSheet(sheetObject,i+1);
	    comEndConfigSheet(sheetObject);
	}
	if (!ComIsEmpty(formObj.req_set_fr_dt.value) || !ComIsEmpty(formObj.req_cls_no.value)) {
		$("#set_fr_dt").val(changeDate2(formObj.req_set_fr_dt.value.trim()));
		$("#set_to_dt").val(changeDate2(formObj.req_set_to_dt.value.trim()));
		$("#wh_cd").val(formObj.req_wh_cd.value);
		$("#ctrt_no").val(formObj.req_ctrt_no.value);
		$("#ctrt_nm").val(formObj.req_ctrt_nm.value);
		$("#rate_tp_cd").val(formObj.req_rate_tp_cd.value);
//		$("#wm_doc_seq").val(formObj.req_wm_doc_seq.value);
		btn_Search();
	} else {
		commonModeChange("INIT");
	}
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
				  //BluePrint #2245:[BINEX WMS] IN & OUT CHARGE DETAIL IMPROVEMENT
			      //var hdr1="|DEL|Transaction Date|Type|Order #|Oder \nType|Billing Customer|Billing Customer|Freight|Freight|Curr|Unit 1|Unit 2|Rate|Q\'ty|Total";
			      //var hdr2="|DEL|Transaction Date|Type|Order #|Oder \nType|Code|Name|Code|Name|Curr|Unit 1|Unit 2|Rate|Q\'ty|Total";
			      var prefix=fix_grid01;
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('ClosingInOutMgmt_HDR1'), Align:"Center"},
			                      { Text:getLabel('ClosingInOutMgmt_HDR1'), Align:"Center"} ];
			      InitHeaders(headers, info);
	
			      var cols = [ {Type:"Status",    	Hidden:1,  	Width:30,    	Align:"Center",   					SaveName:prefix+"ibflag" },
			                   {Type:"DelCheck",  	Hidden:0, 	Width:50,   	Align:"Center",  	ColMerge:1,   	SaveName:prefix+"del" },
			                   {Type:"Date",      	Hidden:0,  	Width:120, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"tj_dt",   			KeyField:1,   UpdateEdit:0,    InsertEdit:1, 		 Format:"Ymd"		},
			                   {Type:"Combo",      	Hidden:0,  	Width:100,    	Align:"Center",   	ColMerge:1,   	SaveName:prefix+"rate_tp_cd",    	KeyField:1,   UpdateEdit:0,   Format:"" },
			                   {Type:"PopupEdit",   Hidden:0,  	Width:100,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_ord_no",    	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:1,           Format:"",        EditLen:100},
			                   {Type:"Combo",     	Hidden:0, 	Width:100, 		Align:"Center",		ColMerge:1,  	SaveName:prefix+"ord_tp_cd",   		KeyField:0,   UpdateEdit:0,   InsertEdit:1,	  Format:""					},
			                   {Type:"Text", 		Hidden:0, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:0, 	Width:120,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"cust_nm",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Combo",      	Hidden:0,  	Width:120,   	Align:"Center",     ColMerge:1,   	SaveName:prefix+"frt_cd",  			KeyField:1,   UpdateEdit:1,   Format:"" },
			                   {Type:"Text",      	Hidden:0,  	Width:150,    	Align:"Left",   	ColMerge:1,   	SaveName:prefix+"frt_nm",  			KeyField:0,   UpdateEdit:1,   Format:"" },
			                   {Type:"Combo",      	Hidden:0,  	Width:150,    	Align:"Left",    	ColMerge:1,   	SaveName:prefix+"unit_cd",    		KeyField:0,   UpdateEdit:1,   Format:"" },
			                   {Type:"Combo",      	Hidden:0,  	Width:100,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"unit_cd2",   		KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"" },
			                   {Type:"Combo",      	Hidden:0,  	Width:80,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"curr_cd",   		KeyField:1,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Float",     	Hidden:0,  	Width:130,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"unit_price",  		KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:vPointCount, EditLen:vEditLen  },
			                   {Type:"Float",       Hidden:0,  	Width:130,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"qty",   			KeyField:0,   UpdateEdit:1,   InsertEdit:1,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"AutoSum",     Hidden:0,  	Width:130,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_amt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:2},
			                   {Type:"Combo",      	Hidden:0,  	Width:150,    	Align:"Left",	    ColMerge:1,   	SaveName:prefix+"item_cd",  		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
	
			                   {Type:"Text",      	Hidden:1,  	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"cls_no",		 	KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:""},
			                   {Type:"Date",      	Hidden:1,  	Width:120,    	Align:"Center",     ColMerge:1,   	SaveName:prefix+"cls_dt",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Ymd" },
			                   {Type:"Text",      	Hidden:1, 	Width:120,    	Align:"Left",     	ColMerge:1,   	SaveName:prefix+"inv_seq",			KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"" },
			                   {Type:"Text", 		Hidden:1, 	Width:120,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wh_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ctrt_no",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"ofc_cd",         	KeyField:1,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Float",      	Hidden:1,  	Width:150,    	Align:"Right",     	ColMerge:1,   	SaveName:prefix+"inv_ttl_amt",		KeyField:0,   UpdateEdit:0,   InsertEdit:0,   Format:"Float",			PointCount:5, EditLen:vEditLen },
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sell_buy_tp_cd",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"frt_seq",         	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_frt_seq",   KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
			                   {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"rating_flg",       KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
						       {Type:"Text", 		Hidden:1, 	Width:80,    	Align:"Center",     ColMerge:1,     SaveName:prefix+"sts_cd",       	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:0,           Format:""},
						       {Type:"PopupEdit",   Hidden:1,  	Width:100,   	Align:"Center",     ColMerge:1,     SaveName:prefix+"wib_bk_no",    	KeyField:0,   PointCount:0,   UpdateEdit:0,   InsertEdit:1,           Format:"",        EditLen:100}];
	
					InitColumns(cols);
		            SetSheetHeight(400);
		            resizeSheet();
					SetEditable(1);
	//				SetImageList(0,"./web/img/main/icon_text_off.gif");
	//				SetImageList(1,"./web/img/main/icon_text_on.gif");
					SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
					SetColProperty(prefix+"ord_tp_cd", {ComboText:load_tp_cdText, ComboCode:load_tp_cdCode} );
		            SetColProperty(prefix+"frt_cd", {ComboCode:ARFRTCD1, ComboText:ARFRTCD2} );
					SetColProperty(prefix+"rate_tp_cd",{ComboText:" |"+rate_tp_cdText, ComboCode:" |"+rate_tp_cdCode});
					SetColProperty(prefix+"unit_cd",{ComboText:"|# of License Plate|Property of License Plate|Container|Truck|Handling Unit|Package Unit|Order|Hour", ComboCode:"|LPN|LPP|CNT|TRK|HUT|PUT|ODR|HOR"});
					SetColProperty(prefix+"curr_cd", {ComboText:'|'+CURRCD, ComboCode:'|'+CURRCD});
	
					//#2329 [WMS4.0] CLOSING IN & OUT ENTRY TO HAVE ITEM COLUMN (S)
					SetColProperty(prefix+"item_cd", {ComboText:"|"+skuCdText, ComboCode:"|"+skuCdCode});
					//#2329 [WMS4.0] CLOSING IN & OUT ENTRY TO HAVE ITEM COLUMN (E)
				  
					SetColProperty(0, prefix+"cust_ord_no",		{AcceptKeys:"E|N|" + WMS_OTHER_CHAR_JS , InputCaseSensitive:1});
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
    var formObj=document.form;
    var prefix="Grd01";
    var srcName=sheetObj.ColSaveName(Col);
    switch (srcName) {
	    case prefix+"tj_dt":
	    	var bk_no = sheetObj.GetCellValue(Row,prefix+"cust_ord_no");
	    	if (bk_no == "") {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",1);
	    	} else {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",0);
	    	}
	    	break;
	    case prefix+"cust_ord_no":
	    	var bk_no = sheetObj.GetCellValue(Row,prefix+"cust_ord_no");
	    	if (bk_no == "") {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",1);
	    	} else {
	    		sheetObj.SetCellEditable(Row, prefix+"tj_dt",0);
	    	}
	    	
	    	//#5142 [Binex Tor] Inbound C.Cancel error
	    	if (validateForm(formObj, 'add') == false) 
	    	{
	    		sheetObj.SetCellValue(Row,prefix+"cust_ord_no","",0);
	    		sheetObj.SetCellValue(Row,prefix+"wib_bk_no","",0);
	    		return;
	    	}	
	    	
	    	fn_getOrderNo(bk_no, Row);
	    	
	    	
	    	break;
	    	
	    //#5142 [Binex Tor] Inbound C.Cancel error	
	    case prefix+"rate_tp_cd":
	    	
			sheetObj.SetCellValue(Row,prefix+"cust_ord_no"    ,"",0);
			sheetObj.SetCellValue(Row,prefix+"wib_bk_no","",0);
			 
	    	break
	    	
	    case prefix+"frt_cd":
	        var frt = sheetObj.GetCellText(Row,srcName).split(":");
	        if(frt!="")
	        	sheetObj.SetCellValue(Row,prefix + "frt_nm", frt[1]);
	        else sheetObj.SetCellValue(Row,prefix + "frt_nm", "");
	        break;
		case prefix+"unit_cd":
		    if(!ComIsNull(Value)){
		
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
		    		sheetObj.SetCellEditable(Row, prefix+"unit_cd2",1);
		    		sheetObj.CellComboItem(Row, prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
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
		case prefix+"unit_price":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	if(inv_amt > 999999999999.99){
        		ComShowCodeMessage("COM03230");
        		sheetObj.SetCellValue(Row, prefix+"unit_price", 0);
        		return;
        	} 
        	//#6949 [Binex-TOR-WMS] Invoice Error
        	/*else if(inv_amt < 0){
        		sheetObj.SetCellValue(Row, prefix+"unit_price", 0);.
        		ComShowCodeMessage("COM03233");
        		return;
        	}*/
        	inv_amt = roundXL(Number(inv_amt),2);
        	sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
        	var ttlInvAmt = 0;
        	for(var i=sheetObj.HeaderRows() ; i<sheetObj.RowCount() + sheetObj.HeaderRows(); i++){
        		ttlInvAmt += Number(sheetObj.GetCellValue(i, prefix+"inv_amt"));
        	}
        	if(ttlInvAmt > 999999999999.99){
        		ComShowCodeMessage("COM03230");
        		sheetObj.SetCellValue(Row, prefix+"unit_price", 0);
        		return;
        	}
            break;
        case prefix+"qty":
        	var qty=Number(sheetObj.GetCellValue(Row, prefix+"qty"));
        	var unit_price=Number(sheetObj.GetCellValue(Row, prefix+"unit_price"));
        	var inv_amt=qty * unit_price;
        	if(inv_amt > 999999999999.99){
        		ComShowCodeMessage("COM03230");
        		sheetObj.SetCellValue(Row, prefix+"qty", 0);
        		return;
        	}
        	// #6949 [Binex-TOR-WMS] Invoice Error
        	/*else if(inv_amt < 0){
        		sheetObj.SetCellValue(Row, prefix+"qty", 0);
        		ComShowCodeMessage("COM03233");
        		return;
        	}*/
        	inv_amt = roundXL(Number(inv_amt),2);
        	sheetObj.SetCellValue(Row, prefix+"inv_amt", inv_amt);
        	var ttlInvAmt = 0;
        	for(var i=sheetObj.HeaderRows() ; i<sheetObj.RowCount() + sheetObj.HeaderRows(); i++){
        		ttlInvAmt += Number(sheetObj.GetCellValue(i, prefix+"inv_amt"));
        	}
        	if(ttlInvAmt > 999999999999.99){
        		ComShowCodeMessage("COM03230");
        		sheetObj.SetCellValue(Row, prefix+"qty", 0);
        		return;
        	}
            break;
/*        case prefix+"tj_dt":
			//Settlement Period From To에 해당하는지 체크
			var trans_dt=changeDate(sheetObj.GetCellValue(Row, prefix + "tj_dt").trim());
			if(ComParseInt(ComReplaceStr($("#set_fr_dt").val(), '-', '')) > trans_dt)
			{
				ComShowCodeMessage("COM0385","Transation Date");
				sheetObj.SetCellValue(Row, prefix+"tj_dt", "");
				return false;
			}
			if(ComParseInt(ComReplaceStr($("#set_to_dt").val(), '-', '')) < trans_dt)
			{
				ComShowCodeMessage("COM0385","Transation Date");
				sheetObj.SetCellValue(Row, prefix+"tj_dt", "");
				return false;
			}
        	break;*/
    }
}


//#5142 [Binex Tor] Inbound C.Cancel error
var ORD_ROW = 0;
function fn_getOrderNo(orderNo, row){
	var formObj=document.form;
	ORD_ROW = row;
	ajaxSendPost(checkOrdNoReq, 'reqVal', '&goWhere=aj&bcKey=searchOrderNo&cust_ord_no='+orderNo 
											+'&wh_cd='+formObj.wh_cd.value
											+'&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
}

function checkOrdNoReq(reqVal){
	var sheetObj=sheet1;
    var prefix="Grd01";	
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		//alert(typeof(doc[1]));
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@^');
			
			var sheetObj=sheet1;
			sheetObj.SetCellValue(ORD_ROW, prefix + "rate_tp_cd", rtnArr[0],0);	 
			sheetObj.SetCellValue(ORD_ROW, prefix + "cust_ord_no", rtnArr[1],0);	 
			sheetObj.SetCellValue(ORD_ROW, prefix + "ord_tp_cd", rtnArr[2],0);	 
			sheetObj.SetCellValue(ORD_ROW, prefix + "tj_dt", rtnArr[3],0);	 
			sheetObj.SetCellValue(ORD_ROW, prefix + "wib_bk_no", rtnArr[4],0);	 
		}else{
			sheetObj.SetCellValue(ORD_ROW, prefix + "wib_bk_no", "",0);
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
		//#3390-Check Authority WMS CODE
		if(srcName == "SAVE" || srcName == "DELETE" || srcName == "CONFIRM" || srcName == "CF_CANCEL" || srcName == "AR_CREATE" || srcName == "AP_CREATE"){
			var sheetObj;
			var prefix_grid="";

			sheetObj=sheet1;
			prefix_grid= fix_grid01;
			
			//sheet의 row가 0건일경우
			if(sheetObj.RowCount()>0)
			{
				var cRow = sheetObj.HeaderRows();
				var wh_cd = sheetObj.GetCellValue(cRow, prefix_grid + "wh_cd");
				
				ComChecWmsCd_Authority(wh_cd);
				if (isWmsAuthOk == false) { 
					//alert('Not authenticated.\r\nYou are not authorized to access Warehouse'); 
					ComShowCodeMessage("COM0785");
					return
				}  
			}
		}
		
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
		    	rtnary=new Array(3);
			    callBackFunc = "setCtrtNoInfo";
			    modal_center_open('./ContractRoutePopup.clt', rtnary, 900, 580,"yes");
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


function btn_Auto_Search()
{
}
function btn_AGR_Search()
{
}

var checkClosingPopup = "1";

function searchClosingStrUnit(){
}
function btn_Create() {	
}

function btn_Create_Popup_OK() {	
	
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
	formObj.f_cmd.value = MODIFY;
//	if(sheet1.IsDataModified()== false)
//	{
//		ComShowCodeMessage("COM0323","");
//		return false;
//	}
	if(validateForm(formObj, "save") == false)
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingInOutMgmtGS.clt", headerDatas + "&" + frtDatas + "&f_cmd=" + MODIFY );
 	sheet1.LoadSaveData(saveXml);
}

/*
 * 트랜잭션 delete
 */
function btn_Delete() {
	var formObj=document.form;
	formObj.f_cmd.value = REMOVE;

	if(validateForm(formObj, "delete") == false)
	{
		return;
	}
	
	if(ComShowCodeConfirm("COM0053") == false){
		return;
	}
	
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingInOutMgmtGS.clt", headerDatas + "&" + frtDatas );
 	sheet1.LoadSaveData(saveXml);
}

function btn_Confirm() {
	var formObj=document.form;
	formObj.f_cmd.value = COMMAND01;
	
	if(validateForm(formObj, "confirm") == false)
	{
		return;
	}
	
	//confirm     
	if(!ComShowCodeConfirm("COM0247"))
	{ 
		return;
	}
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingInOutMgmtGS.clt", headerDatas + "&" + frtDatas );
 	sheet1.LoadSaveData(saveXml);

}

function btn_CFCancel() {
	var formObj=document.form;
	formObj.f_cmd.value = COMMAND02;
	
	if(validateForm(formObj, "cfcancel") == false)
	{
		return;
	}
	
	//confirm     
	if(!ComShowCodeConfirm("COM0386"))
	{ 
		return;
	}
	var headerDatas=FormQueryString(formObj);
	var frtDatas = sheet1.GetSaveString(1);
 	var saveXml=sheet1.GetSaveData("./ClosingInOutMgmtGS.clt", headerDatas + "&" + frtDatas );
 	sheet1.LoadSaveData(saveXml);
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
	commonModeChange("INIT");
}
function btn_AR_Create() {
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

	//Add Button click 시 Settlement Period 의 To 일자를 setting 하도록 수정
	var tj_dt = formObj.set_to_dt.value;

	var row=sheetObj.DataInsert(sheetObj.HeaderRows() + sheetObj.RowCount());
	// Init Value Set
	if (sheetObj.RowCount() > 1) {
		sheetObj.SetCellValue(row, fix_grid01 + "cust_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "cust_cd"));
		sheetObj.SetCellValue(row, fix_grid01 + "cust_nm", sheetObj.GetCellValue(row-1, fix_grid01 + "cust_nm"));
		sheetObj.SetCellValue(row, fix_grid01 + "wh_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "wh_cd"));
//		sheetObj.SetCellValue(row, fix_grid01 + "wib_bk_no", sheetObj.GetCellValue(row-1, fix_grid01 + "wib_bk_no"));
		//sheetObj.SetCellValue(row, fix_grid01 + "tj_dt", ComGetNowInfo());
		sheetObj.SetCellValue(row, fix_grid01 + "tj_dt", tj_dt);
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no", sheetObj.GetCellValue(row-1, fix_grid01 + "ctrt_no"));
		sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "rate_tp_cd"),0);  //#5142 [Binex Tor] Inbound C.Cancel error
		//[#5744] [BINEX-TOR] Closing In&Out - Currency mixed case validation
		//sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "curr_cd"));
		sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", sheetObj.GetCellValue(sheetObj.HeaderRows(), fix_grid01 + "curr_cd"));
		sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd", sheetObj.GetCellValue(row-1, fix_grid01 + "ofc_cd"));
	} else {
		sheetObj.SetCellValue(row, fix_grid01 + "cust_cd", formObj.cust_cd.value);
		sheetObj.SetCellValue(row, fix_grid01 + "cust_nm", formObj.cust_nm.value);
		sheetObj.SetCellValue(row, fix_grid01 + "wh_cd", formObj.wh_cd.value);
//		sheetObj.SetCellValue(row, fix_grid01 + "wib_bk_no", formObj.wib_bk_no.value);
		//sheetObj.SetCellValue(row, fix_grid01 + "tj_dt", ComGetNowInfo());
		sheetObj.SetCellValue(row, fix_grid01 + "tj_dt", tj_dt);
		sheetObj.SetCellValue(row, fix_grid01 + "ctrt_no", formObj.ctrt_no.value);
		sheetObj.SetCellValue(row, fix_grid01 + "rate_tp_cd", 'IAO',0);  //#5142 [Binex Tor] Inbound C.Cancel error
		sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", formObj.wh_curr_cd.value);
		sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd", formObj.wh_ofc_cd.value);
	}
	
	//sheetObj.SetCellValue(row, fix_grid01 + "curr_cd", formObj.wh_curr_cd.value);
	sheetObj.SetCellValue(row, fix_grid01 + "ofc_cd", formObj.wh_ofc_cd.value);
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

var dt = "";
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
	dt=ComGetDateAdd($("#cls_dt").val(), flag, val, "-");
//	$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
//	$("#set_to_dt").val($("#cls_dt").val());	
	
	var formObj=document.form;
	var ctrt_no = formObj.ctrt_no.value;
	var wh_cd = formObj.wh_cd.value;
	var set_fr_dt = mkFormat1(ComGetDateAdd(dt, "d", 1, "-").trim());
	var set_to_dt = mkFormat1($("#cls_dt").val().trim());
	var cls_no = formObj.in_cls_no.value;
	if (ComIsNull(ctrt_no)) {
		$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
		$("#set_to_dt").val($("#cls_dt").val());	
	} else {
		// 등록된 Settlement Preiod - Max To Date 날짜로 셋팅
		ajaxSendPost(setInitSettlementFromDate, 'reqVal', '&goWhere=aj&bcKey=checkSettlementDateInAndOut&ctrt_no='+ctrt_no + '&wh_cd='+wh_cd + '&set_fr_dt=' + set_fr_dt + '&set_to_dt=' + set_to_dt + '&cls_no=' + cls_no, './GateServlet.gsl');
	}
	
}

function setInitSettlementFromDate(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 등록된 Settlement Preiod - Max To Date 날짜로 셋팅
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				$("#set_fr_dt").val(ComGetDateAdd(doc[1], "d", 1, "-"));
				$("#set_to_dt").val($("#cls_dt").val());	
			} else {
				$("#set_fr_dt").val(ComGetDateAdd(dt, "d", 1, "-"));
				$("#set_to_dt").val($("#cls_dt").val());	
			}
			if (getDaysBetween2($("#set_fr_dt").val(), $("#set_to_dt").val())<0) {
				// {?msg1} is finished Until {?msg2} 
				ComShowCodeMessage("COM0813","Closing" , "'" + $("#cls_dt").val() + "'");
				$("#set_fr_dt").val("");
				$("#set_to_dt").val($("#cls_dt").val());	
			}
		}
	}
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
			case "add":
				//warehouse 필수로 입력되어야함.
				if(ComIsEmpty(formObj.wh_cd))
				{
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				//Contract No 필수로 입력되어야함.
				if(ComIsEmpty(formObj.ctrt_no))
				{
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				break;
			case "search":
				if(ComIsEmpty(formObj.wh_cd)){
					ComShowCodeMessage("COM0114","Warehouse");
					$("#wh_cd").focus();
					return false;
				}
				if(ComIsEmpty(formObj.ctrt_no)){
					ComShowCodeMessage("COM0114","Contract No");
					$("#ctrt_no").focus();
					return false;
				}
				if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
					ComShowCodeMessage("COM0122","Settlement Period");
					formObj.set_fr_dt.focus();
					return false;
				}
				break;
			case 'save':
			case "confirm":
				if (sAction == "confirm") {
					if(ComIsEmpty(formObj.in_cls_no)){
						ComShowCodeMessage("COM0114","Closing No");
						$("#in_cls_no").focus();
						return false;
					}
					// Settlement Period Check
//					var sSetFrDt = mkFormat1(formObj.set_fr_dt.value);
//					var sSetToDt = mkFormat1(formObj.set_to_dt.value);
//					
//					if (sSetFrDt != formObj.h_set_fr_dt.value || sSetToDt != formObj.h_set_to_dt.value) {
//						ComShowCodeMessage("COM0811","Settlement Period of search condition", "Period");
//						formObj.set_fr_dt.focus();
//						return false;
//					} 
				}
				
				var sheetObj=sheet1;
				//sheet의 row가 0건일경우
				if(sheetObj.RowCount()==0)
				{
					ComShowCodeMessage("COM0323");
					return false;
				}
				//[#5744] [BINEX-TOR] Closing In&Out - Currency mixed case validation
				var currChck  = '';
				for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
					if (sheetObj.GetCellValue(i, fix_grid01 + "del" ).trim() != 1){
						currChck = sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim();
						break;
					}
				}
				//#4931 ** [Korex] After deleting Invoice, you cant cancel inbound& outbound
				var actCustCd="";				
				// Total 제외
				for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
					if(sheetObj.GetRowStatus(i) == "D") {
						continue;
					}
					// Closing Status가 Confirmed Or Invoiced인 경우
					if (sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "CON" 
						|| sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "INV") {
						var stsNm = "confirmed";
						if (sheetObj.GetCellValue(i, fix_grid01 + "sts_cd") == "INV") {
							stsNm = "invoiced";
						}
						ComShowCodeMessage("COM132620","Modify",stsNm);
						sheetObj.SelectCell(i, fix_grid01 +  "tj_dt");
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
					if (getDaysBetween2(formObj.set_fr_dt.value, formObj.set_to_dt.value)<0) {
						ComShowCodeMessage("COM0122","Settlement Period");
						formObj.set_fr_dt.focus();
						return false;
					}
					//Settlement Period From To에 해당하는지 체크
					var trans_dt=sheetObj.GetCellValue(i, fix_grid01 + "tj_dt").trim();
					if(ComParseInt(changeDate_yyyymmdd(ComReplaceStr($("#set_fr_dt").val(), '-', ''))) > trans_dt)
					{
						ComShowCodeMessage("COM0385","Transation Date");
						sheetObj.SelectCell(i,  fix_grid01 + "tj_dt");
						return false;
					}
					if(ComParseInt(changeDate_yyyymmdd(ComReplaceStr($("#set_to_dt").val(), '-', ''))) < trans_dt)
					{
						ComShowCodeMessage("COM0385","Transation Date");
						sheetObj.SelectCell(i,  fix_grid01 + "tj_dt");
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
					
					//#4931 ** [Korex] After deleting Invoice, you cant cancel inbound& outbound
					//--Billing Customer Multi 체크
					if(actCustCd == ''){
						actCustCd = actCustCd = sheetObj.GetCellValue(i, fix_grid01 + "cust_cd").trim();
					}
					if(actCustCd != sheetObj.GetCellValue(i, fix_grid01 + "cust_cd").trim()){
						alert(getLabel('FMS_COM_ALT159'));	
						sheetObj.SelectCell(i, fix_grid01 +  "cust_cd");
						return false;
					}
					
//					if(sheetObj.GetCellValue(i, fix_grid01 + "sb_cls_cd").trim() == "")
//					{
//						ComShowCodeMessage("COM0114","S/B");
//						sheetObj.SelectCell(i, fix_grid01 +  "sb_cls_cd");
//						return false;
//					}
					
					//--Type 체크
					if(sheetObj.GetCellValue(i, fix_grid01 + "rate_tp_cd").trim() == "ALL")
					{
						ComShowCodeMessage("COM0005","Type");
						sheetObj.SelectCell(i, fix_grid01 +  "rate_tp_cd");
						return false;
					}
					//--FWD TYPE 체크
//					if(sheetObj.GetCellValue(i, fix_grid01 + "order_rel").trim() == "")
//					{
//						ComShowCodeMessage("COM0005","FWD Type");
//						sheetObj.SelectCell(i, fix_grid01 +  "order_rel");
//						return false;
//					}
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
				//	[#5744] [BINEX-TOR] Closing In&Out - Currency mixed case validation
					if( sheetObj.GetCellValue(i, fix_grid01 + "curr_cd").trim() != currChck){
						alert(getLabel('SUP_COM_ALT012'));
						sheetObj.SelectCell(i, fix_grid01 +  "curr_cd");
						return false;
					}
					//--UNIT_CD
					if(sheetObj.GetCellValue(i, fix_grid01 + "cust_ord_no").trim() != "" && sheetObj.GetCellValue(i, fix_grid01 + "unit_cd").trim() == "")
					{
						ComShowCodeMessage("COM0114","Unit 1");
						sheetObj.SelectCell(i, fix_grid01 +  "unit_cd");
						return false;
					}
					if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd").trim() != "")
					{
						if (sheetObj.GetCellValue(i, fix_grid01 + "unit_cd")!="ODR" && sheetObj.GetCellValue(i, fix_grid01 + "unit_cd")!="HOR") {
							if(sheetObj.GetCellValue(i, fix_grid01 + "unit_cd2").trim() == ""){
								ComShowCodeMessage("COM0114","Unit2");
								sheetObj.SelectCell(i, fix_grid01 +  "unit_cd2");
								return false;
							}
						}
					}
					//--qty
					var qty=eval(sheetObj.GetCellValue(i, fix_grid01 + "qty"));
					if(qty == 0)
					{
						ComShowCodeMessage("COM0114","PKGS");
						sheetObj.SelectCell(i, fix_grid01 +  "qty");
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
//					var basic_amt=eval(sheetObj.GetCellValue(i, fix_grid01 + "tot_amt"));
//					if(basic_amt == 0)
//					{
//						ComShowCodeMessage("COM0114","BASIC");
//						sheetObj.SelectCell(i, fix_grid01 +  "basic_amt");
//						return false;
//					}
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
			case "delete":
			case "cfcancel":
				if(ComIsEmpty(formObj.in_cls_no)){
					ComShowCodeMessage("COM0114","Closing No");
					$("#in_cls_no").focus();
					return false;
				}
				
				// Settlement Period Check
//				var sSetFrDt = mkFormat1(formObj.set_fr_dt.value);
//				var sSetToDt = mkFormat1(formObj.set_to_dt.value);
//				
//				if (sSetFrDt != formObj.h_set_fr_dt.value || sSetToDt != formObj.h_set_to_dt.value) {
//					ComShowCodeMessage("COM0811","Settlement Period of search condition", "Period");
//					formObj.set_fr_dt.focus();
//					return false;
//				} 
				break;
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
    var param = "ctrt_nm="+ formObj.ctrt_nm.value;
    callBackFunc = "setCtrtNoInfo";
    modal_center_open('./ContractRoutePopup.clt?'+param, rtnary, 900, 580,"yes");
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
function commonModeChange(mode, rowCnt)
{
	var formObj=document.form;
	switch(mode) 
	{
		case "INIT":
			formObj.reset();
			$("#mode").val(mode);
			$("#in_cls_no").val("");
			$("#cls_no").val("");
			
			$("#req_cls_no").val("");
			$("#req_cust_cd").val("");
			$("#f_ref_no").val("");
			
			sheet1.RemoveAll();
			formObj.f_ref_no.readOnly = false;
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing		
			formObj.f_remark.readOnly = false;
			
			commonButtonChange(mode);
			//날짜 셋팅
			$("#cls_dt").val(ComGetNowInfo());
			//S/B 콤보
//			$("#sb_cls_cd")[0].SetSelectCode("S",false);
//			sb_cls_cd.SetSelectCode("S");
			$("#sb_cls_cd option[value='S']").prop('selected', true);
			//TYPE콤보
			$("#rate_tp_cd option[value='IAO']").prop('selected', true);
			//DEF_VALUE 셋팅
			$("#wh_cd").val($("#def_wh_cd").val());
			$("#ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#ctrt_nm").val($("#def_wh_ctrt_nm").val());
			btn_Change_Date("month");
			//ctrt_no에 해당하는 rtp_no 기본값 셋팅
			if (!isNull(formObj.ctrt_no)) {
				getCtrtInfo(formObj.ctrt_no, "RTP_NO_ONLY");
			}
			loading_flag = "Y";
			
			break;
		case "CREATE":
			$("#mode").val(mode);
//			$("#in_cls_no").val("");
			formObj.f_ref_no.readOnly = false;
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing		
			formObj.f_remark.readOnly = false;
			commonButtonChange(mode);
			break;
		case "CONFIRM":
			$("#mode").val(mode);
//			document.getElementById("s_sort_by").disabled = true;
//			document.getElementById("f_remark").disabled = true;

			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing		
			formObj.f_ref_no.readOnly = true;
			formObj.f_remark.readOnly = true;
			
			commonButtonChange(mode);
			break;
		case "INVOICE":
			$("#mode").val(mode);
//			document.getElementById("s_sort_by").disabled = true;
//			document.getElementById("f_remark").disabled = true;

			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing		
			formObj.f_ref_no.readOnly = true;
			formObj.f_remark.readOnly = true;
			
			commonButtonChange(mode);
			break;
		case "SEARCH_BEF":
			$("#mode").val(mode);
			
			$("#in_cls_no").val("");
			$("#s_cust_nm").val("");
			$("#s_cust_cd").val("");
			if (!changSortBy_flg) {
				$("#s_sort_by").val("");
			}
			$("#s_inv_ttl_amt").val("");
			$("#s_curr_cd").val("");
			$("#in_status_cd").val("");
			$("#in_status_nm").val("");
//			$("#cls_dt").val("");
			$("#h_set_fr_dt").val("");
			$("#h_set_to_dt").val("");
			$("#in_period").val("");
			$("#f_remark").val("");
			$("#f_ref_no").val("");
			
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing
			formObj.f_ref_no.readOnly = false;
			formObj.f_remark.readOnly = false;
			commonButtonChange(mode); //버튼			
			break;
		case "SEARCH":
			$("#mode").val(mode);
			
			//#3395 [BINEX WMS4.0] AR INVOICE TEMPLATE & ENTRY CHANGE - Bug Fixing			
			formObj.f_ref_no.readOnly = false;
			formObj.f_remark.readOnly = false;
			commonButtonChange(mode, rowCnt); //버튼			
			break;
	}
}


/*
 * 버튼 change
 */
function commonButtonChange(mode, rowCnt)
{
	
	switch(mode)
	{
		case "INIT" :
			fn_ComBtnDisable("btnSave");
			fn_ComBtnDisable("btnSaveX");
			fn_ComBtnDisable("btnDelete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cfcancel");			
			ComBtnDisable("btn_add");
//			ComBtnEnable("btn_del");
			break;
		case "CREATE" :
			fn_ComBtnEnable("btnSave");
			fn_ComBtnEnable("btnSaveX");
			fn_ComBtnEnable("btnDelete");
			fn_ComBtnEnable("btn_confirm");
			fn_ComBtnDisable("btn_cfcancel");
			ComBtnEnable("btn_add");
//			ComBtnEnable("btn_del");
			break;
		case "CONFIRM" :
			fn_ComBtnDisable("btnSave");
			fn_ComBtnDisable("btnSaveX");
			fn_ComBtnDisable("btnDelete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnEnable("btn_cfcancel");
			ComBtnDisable("btn_add");
//			ComBtnEnable("btn_del");
			break;
		case "INVOICE" :
			fn_ComBtnDisable("btnSave");
			fn_ComBtnDisable("btnSaveX");
			fn_ComBtnDisable("btnDelete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cfcancel");
			ComBtnDisable("btn_add");
//			ComBtnEnable("btn_del");
			break;
		case "SEARCH_BEF" :
			fn_ComBtnEnable("btnSave");
			fn_ComBtnEnable("btnSaveX");
			fn_ComBtnDisable("btnDelete");
			fn_ComBtnDisable("btn_confirm");
			fn_ComBtnDisable("btn_cfcancel");		
			ComBtnEnable("btn_add");
//			ComBtnEnable("btn_del");
			break;
		case "SEARCH" :
			if (rowCnt > 0) {
				fn_ComBtnEnable("btnSave");
				fn_ComBtnEnable("btnSaveX");
				fn_ComBtnDisable("btnDelete");
				fn_ComBtnDisable("btn_confirm");
				fn_ComBtnDisable("btn_cfcancel");			
				ComBtnEnable("btn_add");
			} else {
				fn_ComBtnDisable("btnSave");
				fn_ComBtnDisable("btnSaveX");
				fn_ComBtnDisable("btnDelete");
				fn_ComBtnDisable("btn_confirm");
				fn_ComBtnDisable("btn_cfcancel");			
				ComBtnDisable("btn_add");
			}
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
//	if(countwd == 0){
//		ComBtnDisable("btnSave");
//		ComBtnDisable("btnDelete");
//		ComBtnDisable("btn_confirm");
//		ComBtnDisable("btn_cfcancel");
//		ComBtnDisable("btn_excel");
//		ComBtnDisable("bt_ar_create");
//		ComBtnDisable("bt_ap_create");
//	}else{
//		ComBtnEnable("btnSave");
//		ComBtnEnable("btn_excel");
//		ComBtnEnable("bt_ar_create");
//		ComBtnEnable("bt_ap_create");
//		
//		//ComBtnEnable("btnDelete");
//		//ComBtnEnable("btn_confirm");
//		//ComBtnEnable("btn_cfcancel");
//		ComBtnEnable("btn_excel");
//	}
}

// 조회
function btn_Search(){
	var formObj = document.form;
	var sheetObj=sheet1;
	
	commonModeChange("SEARCH_BEF");
	sheet1.RemoveAll();
	//validation check
	if (validateForm(formObj, 'search') == false) 
	{
		return;	
	}	
	
	//sheet초기화 및 form tab초기화	
//	doShowProcess(true);
	
	formObj.f_cmd.value = SEARCH;
 	var sXml=sheetObj.GetSearchData("./ClosingInOutMgmtGS.clt", FormQueryString(formObj,""));
 	
	var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
	var endIndxCheck = sXml.indexOf("</CHECK>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	var $xml = $(xmlDoc);
 	
	var strtIndxCheck2 = sXml.indexOf("<CHECK2>") + "<CHECK2>".length;
	var endIndxCheck2 = sXml.indexOf("</CHECK2>");
	
	var xmlDoc2 = $.parseXML(sXml.substring(strtIndxCheck2,endIndxCheck2));
	var $xml2 = $(xmlDoc2);
	
 	//Load Contract Info
 	var strtIndxSheet = sXml.indexOf("<CTRT_CUST_CD>");
	var endIndxSheet = sXml.indexOf("</CTRT_CUST_CD>") + "</CTRT_CUST_CD>".length;
	var strtCustCd = sXml.substring(strtIndxSheet + "<CTRT_CUST_CD>".length ,endIndxSheet - "</CTRT_CUST_CD>".length );
	if (ComIsEmpty(formObj.s_cust_cd)) {
		formObj.s_cust_cd.value = strtCustCd;
	}
	var strtIndxSheet2 = sXml.indexOf("<CTRT_CUST_NM>");
	var endIndxSheet2 = sXml.indexOf("</CTRT_CUST_NM>") + "</CTRT_CUST_NM>".length;
	var strtCustNm = sXml.substring(strtIndxSheet2 + "<CTRT_CUST_NM>".length ,endIndxSheet2 - "</CTRT_CUST_NM>".length );
	if (ComIsEmpty(formObj.s_cust_nm)) {
		formObj.s_cust_nm.value = strtCustNm;
	}
 	
 	if ($xml2.find( "hdrCnt").text() != '0'){// Header Info
 		setDataControl(sXml);
 	}
	
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
	formObj.s_curr_cd.value = whCurrCd;
	document.getElementById("sp_curr_cd").innerHTML = whCurrCd;
//	if ($xml.find( "listCnt").text() != '0'){
	 	var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
		var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
		
		var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
		sheet1.LoadSearchData(sheet1Data.replaceAll('SHEET1', 'SHEET'));
//	} 

}

function sheet1_OnSearchEnd(){

    var formObj=document.form; 
    // Status Saved
    if (formObj.in_status_cd.value == "SAV") {
    	commonModeChange("CREATE");
    // Status Confirmed
    } else if (formObj.in_status_cd.value == "CON") {
    	commonModeChange("CONFIRM");
    // Status Invoiced
    } else if (formObj.in_status_cd.value == "INV") {
    	commonModeChange("INVOICE");
    } else {
    	commonModeChange("SEARCH",sheet1.RowCount());
    }
    
	var sheetObj=sheet1;
    var prefix="Grd01";
    hdrR = sheetObj.HeaderRows();
    rowCnt = sheetObj.RowCount();

    sheetObj.InitComboNoMatchText(1, "",1);
    
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
    
    for (var i = hdrR; i < rowCnt + hdrR; i++) {
    	
    	// Header Reset
    	if (i == hdrR) {
//    		if (ComIsEmpty(formObj.s_cust_nm)) {
//    			formObj.s_cust_nm.value = sheetObj.GetCellValue(i, prefix + "cust_nm");
//    		}
//    		if (ComIsEmpty(formObj.s_cust_cd)) {
//    			formObj.s_cust_cd.value = sheetObj.GetCellValue(i, prefix + "cust_cd");
//    		}
    		if (ComIsEmpty(formObj.s_sort_by)) {
    			formObj.s_sort_by.value = "TNO";
    		}
    		if (ComIsEmpty(formObj.in_status_cd)) {
//    			formObj.in_status_cd.value = "INI";
    		}
    		if (ComIsEmpty(formObj.in_status_nm)) {
//    			formObj.in_status_nm.value = "Initial";
    		}
    		if (ComIsEmpty(formObj.in_period)) {
    			formObj.in_period.value = formObj.set_fr_dt.value + " ~ " + formObj.set_to_dt.value;
    		}
    		if (ComIsEmpty(formObj.wh_cd)) {
    			formObj.wh_cd.value = sheetObj.GetCellValue(i, prefix + "wh_cd");
    		}
    		if (ComIsEmpty(formObj.cust_ord_no)) {
    			formObj.cust_ord_no.value = sheetObj.GetCellValue(i, prefix + "cust_ord_no");
    		}
    		if (ComIsEmpty(formObj.ctrt_no)) {
    			formObj.ctrt_no.value = sheetObj.GetCellValue(i, prefix + "ctrt_no");
    		}
    		if (ComIsEmpty(formObj.wh_ofc_cd)) {
    			formObj.wh_ofc_cd.value = sheetObj.GetCellValue(i, prefix + "ofc_cd");
    		}
    		if (ComIsEmpty(formObj.wh_curr_cd)) {
    			formObj.wh_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
    		if (!ComIsEmpty(sheetObj.GetCellValue(i, prefix + "curr_cd"))) {
    			document.getElementById("sp_curr_cd").innerHTML = sheetObj.GetCellValue(i, prefix + "curr_cd");
    			formObj.s_curr_cd.value = sheetObj.GetCellValue(i, prefix + "curr_cd");
    		}
    	}
    	
    	//Total
        sheetObj.SetSumValue(prefix + "qty", document.getElementById("sp_curr_cd").innerHTML + " Total");
    	
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
			sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			sheetObj.CellComboItem(i,prefix+"unit_cd2",{ComboText:"|" + TRUCK_TEXT, ComboCode:"|" + TRUCK_CD} );
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
    		//sheetObj.SetCellEditable(i, prefix+"item_cd",0);  //#2329 [WMS4.0] CLOSING IN & OUT ENTRY TO HAVE ITEM COLUMN - 주석처리
    		sheetObj.SetCellValue(i, prefix+"item_cd","");
    	} else {
    		//sheetObj.SetCellEditable(i, prefix+"item_cd",1);	//#2329 [WMS4.0] CLOSING IN & OUT ENTRY TO HAVE ITEM COLUMN - 주석처리
    	}
		
		// Closing Status가 Confirmed Or Invoiced인 경우
		if (sheetObj.GetCellValue(i, prefix + "sts_cd") == "CON" 
			|| sheetObj.GetCellValue(i, prefix + "sts_cd") == "INV") {
			sheetObj.SetRowEditable(i, 0);
			sheetObj.SetCellFontColor(i, fix_grid01 + "tj_dt","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "rate_tp_cd","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "cust_ord_no","#FF0000");
			sheetObj.SetCellFontColor(i, fix_grid01 + "ord_tp_cd","#FF0000");
		} else {
//			sheetObj.SetRowEditable(i, 1);
//			if (sheetObj.GetCellValue(i, prefix + "rating_flg") != "Y") {
//			sheetObj.SetCellEditable(i, prefix+"rate_tp_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_cd",1);
			sheetObj.SetCellEditable(i, prefix+"frt_nm",1);
			sheetObj.SetCellEditable(i, prefix+"unit_cd",1);
//				sheetObj.SetCellEditable(i, prefix+"unit_cd2",1);
			sheetObj.SetCellEditable(i, prefix+"unit_price",1);
			sheetObj.SetCellEditable(i, prefix+"qty",1);
			//sheetObj.SetCellEditable(i, prefix+"item_cd",1);  //#2329 [WMS4.0] CLOSING IN & OUT ENTRY TO HAVE ITEM COLUMN - 주석처리
//			} else {
//				sheetObj.SetCellEditable(i, prefix+"unit_price",1);
//				sheetObj.SetCellEditable(i, prefix+"qty",1);
//			}
		}
    }
    
    //Column, Width 재조정하기
    sheetObj.FitSize(1, 0);
}

/**
 * #2325 [WMS4.0] CLOSING IN & OUT TRANSACTION # -> ORDER #
 * 
 */
function sheet1_OnDblClick(sheetObj, Row, Col){
	var prefix="Grd01";
	if(sheetObj.ColSaveName(Col) == prefix+"cust_ord_no") {
		if(sheetObj.GetCellValue(Row, prefix+"rate_tp_cd") == "IN") {
			var sUrl="./WHInMgmt.clt?req_wib_bk_no="+sheetObj.GetCellValue(Row, prefix + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, prefix + "wh_cd") 
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, prefix + "ctrt_no");
			parent.mkNewFrame('Inbound Management', sUrl);
		} else if(sheetObj.GetCellValue(Row, prefix+"rate_tp_cd") == "OUT") {
			var sUrl="./WHOutMgmt.clt?req_wob_bk_no="+sheetObj.GetCellValue(Row, prefix + "wib_bk_no")
			+ "&req_wh_cd=" + sheetObj.GetCellValue(Row, prefix + "wh_cd") 
			+ "&req_ctrt_no=" + sheetObj.GetCellValue(Row, prefix + "ctrt_no");
			parent.mkNewFrame('Inbound Management', sUrl);
		}
	}
}

var cur_row;
var cur_col;
var cur_sheetObj;


function sheet1_OnChangeSum(sheetObj, Row, Col) {
    var formObj=document.form;
    var prefix="Grd01";
	//합계 행에 값이 바뀌었을 때, 계산 정보 표시
    var inv_amt_sum=eval(sheetObj.GetSumValue(0,prefix + "inv_amt"));
    var amt_ttl_sum=roundXL(inv_amt_sum * 1,2).toFixed(2);
    formObj.s_inv_ttl_amt.value = doMoneyFmt(amt_ttl_sum);
}

// Header Info
function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.in_cls_no.value = $xml.find( "cls_no").text();
	formObj.s_cust_nm.value	= $xml.find( "cust_nm").text();
	formObj.s_cust_cd.value	= $xml.find( "cust_cd").text();
	if (!changSortBy_flg) {
		formObj.s_sort_by.value	= $xml.find( "sort_by").text();
	}
	formObj.s_inv_ttl_amt.value	= $xml.find( "inv_ttl_amt").text();
	formObj.s_curr_cd.value	= $xml.find( "curr_cd").text();
	formObj.in_status_cd.value	= $xml.find( "sts_cd").text();
	formObj.in_status_nm.value	= $xml.find( "sts_nm").text();
	// Modify시 Closing Date 업데이트
	formObj.cls_dt.value	= $xml.find( "cls_dt").text();
	formObj.h_set_fr_dt.value	= $xml.find( "set_fr_dt").text();
	formObj.h_set_to_dt.value	= $xml.find( "set_to_dt").text();
	formObj.set_fr_dt.value	= changeDate2($xml.find( "set_fr_dt").text());
	formObj.set_to_dt.value	= changeDate2($xml.find( "set_to_dt").text());
	
	formObj.in_period.value	= $xml.find( "period").text();
	formObj.f_remark.value	= $xml.find( "f_remark").text();
	formObj.wm_doc_seq.value	= $xml.find( "wm_doc_seq").text();
	
	// #1084 [WMS4.0]File# assign 로직 변경
	formObj.f_ref_no.value	= $xml.find( "ref_no").text();
}

function sheet1_OnSaveEnd(sheetObj){
	var formObj=document.form;
	// SAVE OK
	if (sheet1.GetEtcData("mess") == 'OK') {
		showCompleteProcess();
		formObj.req_cls_no.value = sheet1.GetEtcData("cls_no");
		btn_Search();
	}else{
		if (sheet1.GetEtcData("mess") == 'NG') {
			ComShowCodeMessage("COM0816");
		} else {
			ComShowCodeMessage("COM12227");
		}
	}
}

function changSortBy(obj) {
	changSortBy_flg = true;
	btn_Search();	
}

function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-',''); 
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4); 
	 return rtnStr;
}

function changeDate(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4);	//Month
	var m  = sDate.substr(4,2);		//day
	var d  = sDate.substr(6,2);
	return m+d+y;
}

function changeDate2(sDate) {
	if (sDate == null || sDate == '') return"";
	var y  = sDate.substr(0,4);	//Month
	var m  = sDate.substr(4,2);		//day
	var d  = sDate.substr(6,2);
	return m+ "-" + d + "-" + y;
}

function changeDate_yyyymmdd(sDate) {
	//mmddyyyy ---> yyyymmdd
	if (sDate == null || sDate == '') return"";
	var m  = sDate.substr(0,2);	
	var d  = sDate.substr(2,2);		
	var y  = sDate.substr(4,4);
	return y+m+d;
}


var rtnary = new Array(2);
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	ROW = Row
	if(colName == fix_grid01 + "cust_ord_no") {
		var sUrl="./WHBookingPopup.clt?cond_search_yn=N&ctrt_no="+ $("#ctrt_no").val()+ "&ctrt_nm="+$("#ctrt_nm").val() + "&wh_cd="+$("#wh_cd").val() ;
		callBackFunc = "setBookingGrid";
        modal_center_open(sUrl, callBackFunc, 800, 550,"yes");
	}
}
function setBookingGrid(aryPopupData, row, col, sheetIdx){
	var formObj=document.form;
	var sheetObj=sheet1;
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		 return;
	 }else{
		 var rtnValAry=aryPopupData.split("|");
		 var rate_tp_cd = "IN";
		 if (rtnValAry[0] == "Outbound") {
			rate_tp_cd = "OUT";
		 }
		 sheetObj.SetCellValue(ROW, fix_grid01 + "rate_tp_cd",rate_tp_cd,0);
		 sheetObj.SetCellValue(ROW, fix_grid01 + "cust_ord_no",rtnValAry[6],0);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "ord_tp_cd",rtnValAry[8]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "wh_cd",rtnValAry[11]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "ctrt_no",rtnValAry[1]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "tj_dt",rtnValAry[4]);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "wib_bk_no",rtnValAry[5],0);
		 
		 var sCustCd = "";
		 var sCustNm = "";
		if (ComIsNull(rtnValAry[13]) || rtnValAry[13] == "") {
			sCustCd = formObj.s_cust_cd.value;
		} else {
			sCustCd = rtnValAry[13]
		}
		if (ComIsNull(rtnValAry[14]) || rtnValAry[14] == "") {
			sCustNm = formObj.s_cust_nm.value;
		} else {
			sCustNm = rtnValAry[14]
		}
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "cust_cd",sCustCd);
		 sheetObj.SetCellValue(ROW, fix_grid01 +  "cust_nm",sCustNm);
	 }
}

//Filing No.중복 체크
function checkDupFilingNo(obj){
	if (ComIsNull(obj.value)) {
		return;
	}
	var formObj=document.form;
	ajaxSendPost(checkDupFilingNo, 'reqVal', '&goWhere=aj&bcKey=checkDupFilingNo&f_ref_no='+obj.value + "&wh_cd=" + formObj.wh_cd.value + "&ctrt_no=" + formObj.ctrt_no.value + "&cls_no=" + formObj.in_cls_no.value, './GateServlet.gsl');
}

/**
 * AJAX RETURN
 * Check Dup Order No
 */
function checkDupFilingNo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(!ComShowCodeConfirm("COM131303", "Filling No")){ 
					formObj.f_ref_no.value = "";
				} 
				formObj.cls_dt.focus();
				formObj.f_ref_no.focus();
			}
		}
	}
}

//등록된 Settlement Preiod 체크(From Date이 후 날짜 등록 가능)
function checkMaxDailySettlementPeriod(obj) {
	var formObj=document.form;

	var ctrt_no = formObj.ctrt_no.value;
	var wh_cd = formObj.wh_cd.value;
	var set_fr_dt = mkFormat1(formObj.set_fr_dt.value.trim());
	var set_to_dt = mkFormat1(formObj.set_to_dt.value.trim());
	var cls_no = formObj.in_cls_no.value;
	var rate_tp_cd = formObj.rate_tp_cd.value;
	// 등록된 Settlement Preiod 체크(등록 Max Date이 후 날짜 등록 가능)
	if (loading_flag = "Y" && (formObj.set_fr_dt.value != '' && ComIsNull(cls_no))) {
		ajaxSendPost(onblurCheckSettlementDateInAndOut, 'reqVal', '&goWhere=aj&bcKey=checkSettlementDateInAndOut&ctrt_no='+ctrt_no + '&wh_cd='+wh_cd + '&set_fr_dt='+set_fr_dt + '&set_to_dt='+set_to_dt + '&rate_tp_cd='+rate_tp_cd , './GateServlet.gsl');
	}
}

function onblurCheckSettlementDateInAndOut(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// 이미 등록된 Settlement Period To Date(Daily In & Out Date)이전 일자가 존재 하는지 체크 
			if (!ComIsNull(doc[1]) && doc[1] != "null") {
				ComShowCodeMessage("COM12133","Settlement Period(From Date)","'" + doc[1] + "'","greater");
				formObj.set_fr_dt.value = "";
				formObj.set_fr_dt.focus();
			}
		}
	}
}

// #1389 [WMS4.0] Closing In & Out Entry buttons add to extension
function fn_ComBtnDisable(name) {
	var obj = ComGetObject(name);
	if (obj.type == "button") {
		obj.style.display = "none";
	}
}

//#1389 [WMS4.0] Closing In & Out Entry buttons add to extension
function fn_ComBtnEnable(name) {
	var obj = ComGetObject(name);
	if (obj.type == "button") {
		obj.style.display = "inline";
	}
}