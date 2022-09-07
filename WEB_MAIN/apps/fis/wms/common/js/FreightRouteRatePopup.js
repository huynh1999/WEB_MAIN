//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var docObjects=new Array();
var sheetCnt=0;
//var comboObjects=new Array();
var comboCnt=0; 
var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag=false;
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var k=0;k<tabObjects.length;k++){
        initTab(tabObjects[k],k+1);
    }
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	initControl();
	formObj.eff_dt.value=ComGetNowInfo();
		//goTabSelect('01');
	if (!ComIsEmpty(formObj.ctrt_no)){
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
	//?axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
    // OnChange 이벤트
    //?axon_event.addListenerForm("blur", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
    //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    //?axon_event.addListenerForm("keydown", "obj_keydown", formObject);
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
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('FreightRouteRatePopup_HDR1'), Align:"Center"},{ Text:getLabel('FreightRouteRatePopup_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		             {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"rate_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"frt_mode",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"por",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"por_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pol",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pol_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pod",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pod_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"del_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svcterm_fr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"svcterm_to_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"departure_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"departure_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"arrival_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"arrival_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"origin_loc_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
//		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"dest_loc_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"eff_fr_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"eff_to_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"loc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"loc_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Popup",     Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"commodity_desc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:75,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:75,   Align:"Center",  ColMerge:1,   SaveName:"sb_cls_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		       
		      InitColumns(cols);
	          SetSheetHeight(260);
	
		      SetEditable(0);
              SetShowButtonImage(2);
              
		      //InitViewFormat(0, "eff_fr_dt", 		"MM-dd-yyyy");
		      //InitViewFormat(0, "eff_to_dt", 		"MM-dd-yyyy");
		  	  SetColProperty(0 ,"loc_nm", {AcceptKeys:"E|[0123456789`~!@#$%^&*()_+-=<>?,.]" , InputCaseSensitive:1});
		  	  SetColProperty("frt_mode", {ComboText:"|Warehouse", ComboCode:"|W"} );


	      }
	      break;	
	case 2:      //IBSheet1 init
	    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('FreightRouteRatePopup_2_HDR1'), Align:"Center"}];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		             {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rate_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cust_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"unit_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"unit_price",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Popup",     Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"rmk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:75,   Align:"Center",  ColMerge:1,   SaveName:"org_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1, Width:75,   Align:"Center",  ColMerge:1,   SaveName:"sell_vat_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(185);
		
		      SetEditable(1);
              SetShowButtonImage(2);
	      }
	      break;
	}
}
function btn_New(){
}
function btn_Search(){
	var formObj=document.form;
	
	if (validateForm(docObjects[0],formObj,'Search')) {
//	 	var sXml=docObjects[0].GetSearchData("./searchSalesPICListGS.clt", FormQueryString(formObj,""));
//	 	docObjects[0].LoadSearchData(sXml,{Sync:1} );
		formObj.f_cmd.value=SEARCH;
		var sXml=docObjects[0].GetSearchData("./searchFreightSellBuyRouteListGS.clt", FormQueryString(formObj,""));
		docObjects[0].LoadSearchData(sXml,{Sync:1} );
		if(docObjects[0].RowCount() > 0){
			var itemAll = document.createElement("option");
	        document.getElementById("sell_filer").options.add(itemAll);
	        itemAll.text = "ALL";
	        itemAll.value = "ALL";
			for(i=2;i<docObjects[0].RowCount()+2;i++){
				var item = document.createElement("option");
		        // Add an Option object to Drop Down/List Box
		        document.getElementById("sell_filer").options.add(item);
		        // Assign text and value to Option object
		        item.text = docObjects[0].GetCellValue(i,"rate_no");
		        item.value = docObjects[0].GetCellValue(i,"rate_no");
		        if(i==2){
		        	formObj.sell_filer.value  = item.value;
		        }
			} 
		}
		if(docObjects[0].RowCount()>0){
			sell_filer_OnChange(formObj,"A","All");
		}
		
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	var rate_no=sheetObj.GetCellValue(Row,"rate_no");
	var ctrt_no=sheetObj.GetCellValue(Row,"ctrt_no");
	if ( sheetObj.ColSaveName(Col) == "rate_no" && !ComIsNull(rate_no)){
		formObj.select_ctrt_no.value=ctrt_no;
		formObj.sell_filer.value = sheetObj.GetCellValue(Row,"rate_no");
	}
}

function sell_filer_OnChange(formObj, Code, Text){
	var formObj=document.form;
	var sParam="f_cmd="+SEARCH02+"&ctrt_no="+formObj.ctrt_no.value+"&org_cd="+formObj.org_cd.value+"&sb_cls_cd=S";
			   //+sheetObj.cellvalue(Row, "frt_mode")+"&rate_no="+sheetObj.cellvalue(Row, "rate_no");
	if(Code=="AA"){
		sParam=sParam + "&frt_mode=A";
	} else if(Code=="SA"){
		sParam=sParam + "&frt_mode=S";
	} else if(Code=="DA"){
		sParam=sParam + "&frt_mode=D";
	} else if(Code!="A" && Code!="" ){
		sParam=sParam + "&rate_no="+Code;
	}
	var sXml=docObjects[1].GetSearchData("./searchFreightSellBuyRateList.clt", null, sParam);
	if( Code!="" ){
		docObjects[1].LoadSearchData(sXml,{Sync:1} );
	} else {
		docObjects[1].RemoveAll();
	}
	return true;
}
function sheet1_OnClick(SheetObj, Row, Col){
	 if (SheetObj.ColSaveName(Col) == "commodity_desc")
	 {
		ComShowMemoPad2(SheetObj,Row,20,false,326,100,4000,19);         		
	 }    		          	 
}
function sheet2_OnClick(SheetObj, Row, Col){
	 if (SheetObj.ColSaveName(Col) == "rmk")
	 {
		ComShowMemoPad2(SheetObj,Row,11,false,326,100,4000,11);         		
	 }    		          	 
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		var cal=new ComCalendar();
		/*if(eventName){
			srcName=eventName;
		}*/
		switch(srcName) {
			case "SEARCHLIST": 
				btn_Search(); 
				break;
//			case "btn_OK": 
//				btn_OK(); 
//				break;
			case "CLOSE": 
				btn_Close(); 
				break;
			case "btn_eff_dt":
				cal.select(formObj.eff_dt,'MM-dd-yyyy');
				break;
			case "btn_ctrt_no" :
				var sUrl="./ContractRoutePopup.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ctrt_nm="+ComGetObjValue(formObj.ctrt_nm)+"&mgmt_flg=Y" ;
				//ComOpenPopup(sUrl, 900, 700, "setCtrtNoInfo", "0,0", true);
				callBackFunc = "setCtrtNoInfo";
			    modal_center_open(sUrl, callBackFunc, 900,570,"yes");
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
function setCtrtNoInfo(aryPopupData){
	  var formObj=document.form;
	  if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	   return;
	  }else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
	  }
}
/*
 * Validation
 */
function validateForm(sheetObj, formObj, sAction) {
	return true;
}

function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
	var val="";
	switch(srcName) {
		case "ctrt_no" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo("ctrt_no");
			}else{
				setFieldValue(formObj.ctrt_no, "");
				setFieldValue(formObj.ctrt_nm, "");
			}
			break;
	}
}
function searchAjaxColInfo(col){
	var formObj=document.form;
	if(col=="ctrt_no"){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value.toUpperCase(), './GateServlet.gsl');
	} 
}
//Result Search Ajax
function resultCtrtInfo(reqVal){
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
function btn_OK() {	
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var row="";
	var openerprefix1="";
	var sheetObj1=docObjects[1];
	var openerSheetObj1=opener.docObjects[1];
	for(var i=sheetObj1.HeaderRows(); i<=sheetObj1.LastRow(); i++) {
		if( sheetObj1.GetCellValue(i, "chk") == '1' ){
			row=openerSheetObj1.DataInsert(-1);
			openerSheetObj1.SetCellValue(row,openerprefix1+"frt_br_cd",sheetObj1.GetCellValue(i,"ofc_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"cust_cd",sheetObj1.GetCellValue(i,"cust_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"cust_nm",sheetObj1.GetCellValue(i,"cust_nm"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"frt_cd",sheetObj1.GetCellValue(i,"frt_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"frt_nm",sheetObj1.GetCellValue(i,"frt_nm"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"curr_cd",sheetObj1.GetCellValue(i,"curr_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"unit_cd",sheetObj1.GetCellValue(i,"unit_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"unit_price",sheetObj1.GetCellValue(i,"unit_price"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"val_cls_cd",sheetObj1.GetCellValue(i,"sell_vat_cd"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"cust_org_yn",sheetObj1.GetCellValue(i,"org_yn"),0);
			openerSheetObj1.SetCellValue(row,openerprefix1+"internal_sts_cd","",0);
			if ( openerSheetObj1.GetCellValue(row, openerprefix1+"curr_cd") == openerformObj.sell_loc_curr_cd.value ) {
				openerSheetObj1.SetCellValue(row, openerprefix1+"exrate",1,0);
			} else if ( openerSheetObj1.GetCellValue(row, openerprefix1+"curr_cd") == openerformObj.sell_curr_cd.value ) {
				openerSheetObj1.SetCellValue(row, openerprefix1+"exrate",openerformObj.sell_exrate.value,0);
			}
			opener.setUnit(row, 'S');
			if(openerformObj.ctry_cd.value == 'IN'){
				openerSheetObj1.SetCellEditable(row, openerprefix1+"val_cls_cd",0);
			}
		} 
	}
  ComClosePopup(); 
}
function btn_Close() {
  ComClosePopup(); 
}
