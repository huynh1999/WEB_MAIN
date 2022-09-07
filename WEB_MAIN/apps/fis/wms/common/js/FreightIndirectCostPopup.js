//<%
///*--=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : FreightIndirectCostPopup.js
//*@FileTitle  : Indirect Cost (Buying)
//*@author     : Bao.Huynh - DOU Network
//*@version    : 1.0
//*@since      : 2015/07/08
//=========================================================--*/
//%>
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var sheetCnt=0;
var comboObjects=new Array();
var comboCnt=0; 
var opener=window.dialogArguments;
var docObjects=new Array();
var rtnary=new Array(2);
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
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }	
//	initControl();
	formObj.buy_exrate_cls_cd.value = "B";
	formObj.buy_exrate_cls_cd.disabled = true;
	if(formObj.buy_exrate_dt.value == ''){
		var dt = '0'+ (new Date().getMonth() +1) + '-' + new Date().getDate() + '-' + new Date().getFullYear();
		formObj.buy_exrate_dt.value = dt;
	}
	if(formObj.buy_curr_cd.value == ''){
		if(formObj.org_cd.value == 'NLBUDLB' || formObj.org_cd.value == 'NLCASLA' || formObj.org_cd.value == 'NLFRALB' ||
	   	   formObj.org_cd.value == 'NLFXTLB' || formObj.org_cd.value == 'NLGHTLA' || formObj.org_cd.value == 'NLHAMLB' ||
	   	   formObj.org_cd.value == 'NLLEHLB' || formObj.org_cd.value == 'NLVLCLA' || formObj.org_cd.value == 'NLWRPLB'){
			formObj.buy_curr_cd.value='EUR';
		}else{
			formObj.buy_curr_cd.value='USD';
		}	
	}
	if(formObj.exrate_cls_cd.value != ''){
//		comboObjects[0].SetSelectCode(formObj.exrate_cls_cd.value,false);
		formObj.exrate_cls_cd.value = false;
	}
	//formObj.eff_dt.value = ComGetNowInfo();
//	main_button("N");
//	detail_button("N","A");
//	
	if (!ComIsEmpty(formObj.doc_no)){
		btn_Search();
	}
}
/** 
 * initControl()
 */ 
//function initControl() {
//	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//    //- 포커스 나갈때
////    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
//}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
//function setComboObject(combo_obj){
//	comboObjects[comboCnt++]=combo_obj;
//}
function goTabSelect(isNumSep) {
	var formObject=document.form;
    if( isNumSep == "01" ) {
    	document.all.Tab01.className="On";
        document.all.Tab02.className="Off"; 
    } else if( isNumSep == "02" ) {
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="On";
    }
    var tabObjs=document.getElementsByName('tabLayer');
    if(isNumSep=='01') {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';	
    } else if(isNumSep=='02') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';  
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
	        
//	      var hdr1="Seq|Del|Branch|Internal Contract|Internal Contract|Create Indirect Rev|Freight|Freight|Curr|Ex.Rate|AMT(ENT)|AMT(LOC)|ACCT(USD)|||";
//	      var hdr2="Seq|Del|Branch|Code|Name|Create Indirect Rev|Code|Desc.|Curr|Ex.Rate|AMT(ENT)|AMT(LOC)|ACCT(USD)|||";
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataGetRowMerge:1 } );
	      var info={ Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers=[ { Text:getLabel('FreightIndirectCostPopup_HDR1'), Align:"Center"},
	                    { Text:getLabel('FreightIndirectCostPopup_HDR2'), Align:"Center"}];
	      InitHeaders(headers, info);
	      var cols=[ {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
	             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0, HeaderCheck: 0 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_br_cd",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0, Width:85,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"CheckBox",  Hidden:0, Width:130,  Align:"Center",  ColMerge:1,   SaveName:"indirect_rev",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0, HeaderCheck: 0},
	             {Type:"PopupEdit", Hidden:0, Width:55,   Align:"Center",  ColMerge:1,   SaveName:"frt_cd",            KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"exrate",            KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"amt",               KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"AutoSum",   Hidden:0, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"loc_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_acct_usd_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"frt_curr_cls",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
	      InitColumns(cols);
	      SetSheetHeight(400);
	      SetEditable(1);
	      SetColProperty(0 ,"ctrt_no" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
	      SetColProperty(0 ,"frt_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
	      SetColProperty(0 ,"curr_cd" , {AcceptKeys:"E" , InputCaseSensitive:1});
	      grd05cnt=cnt;
	      }
	      break;
	}
}
function btn_Search(){
	var formObj=document.form;
	formObj.f_cmd.value = SEARCH;
	docObjects[0].RemoveAll();
    docObjects[0].DoSearch("./searchFreightIndirectCostPopupListGS.clt", FormQueryString(formObj,""));
}
function btn_Save() {
	var formObj=document.form;
	if(validation()){
		if(ComShowCodeConfirm("COM0063")){
			var sParam=FormQueryString(formObj, "Grd00");
			sParam += "&" + GetSaveString(docObjects[0],  true, true);
			doShowProcess(true);
			setTimeout(function(){
			var saveXml=docObjects[0].GetSaveData("saveIndirectCost.clt", sParam);
			docObjects[0].LoadSearchData(saveXml,{Sync:1} );
			//1. Save 후 조회
			if( saveXml.indexOf('<ERROR>') == -1){
				ComShowCodeMessage("COM0093", "");
				//Change message 'Successfully' to showCompleteProcess(); 
//				showCompleteProcess();
				btn_Search();
			}
			},100);
			doHideProcess(false);
		}
	}	
}
function validation(){
	var formObj=document.form;
	var vat="";
	var vatSplit="";
	var sheetObj=docObjects[0];
	var prefix="Grd05";
	/*if(formObj.auth_lvl.value == 'HQ' || formObj.auth_lvl.value == 'AQ'){
		ComShowCodeMessage("COM0261");
		return;
	}*/
	if( sheetObj.RowCount()> 0 ){
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
if(sheetObj.GetCellValue(i, "ibflag") != 'D'){
if(sheetObj.GetCellValue(i, "ibflag") == 'I' || sheetObj.GetCellValue(i, "ibflag") == 'U'){
					//Order No , Item 필수 입력 체크
if( sheetObj.GetCellValue(i, "ctrt_no") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Contract No");
						return ;				
}else if( sheetObj.GetCellValue(i, "frt_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Freight");
						return ;				
}else if( sheetObj.GetCellValue(i, "curr_cd") == "" ){
						ComShowCodeMessage("COM0165", i-1, "Currency");
						return ;				
}else if( sheetObj.GetCellValue(i, "exrate") == "" || sheetObj.GetCellValue(i, "exrate") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "Ex.Rate");
						return ;				
}else if( sheetObj.GetCellValue(i, "amt") == "" || sheetObj.GetCellValue(i, "amt") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "NET AMT(ENT)");
						return ;				
}else if( sheetObj.GetCellValue(i, "loc_amt") == "" || sheetObj.GetCellValue(i, "loc_amt") == 0 ){
						ComShowCodeMessage("COM0165", i-1, "NET AMT(LOC)");
						return ;				
}else if( sheetObj.GetCellValue(i, "curr_cd") == formObj.buy_loc_curr_cd.value && sheetObj.GetCellValue(i, "exrate") != 1 ){
						ComShowCodeMessage("COM0160", i-1, "Selling Ex.Rate Information Check");
						return ;				
}else if( sheetObj.GetCellValue(i, "curr_cd") == formObj.buy_loc_curr_cd.value && sheetObj.GetCellValue(i, "amt") != sheetObj.GetCellValue(i, "loc_amt") ){
						ComShowCodeMessage("COM0160", i-1, "Selling NET AMT(LOC) Info Check");
						return ;				
					}
				}
			}
			//var duCount=0;
var ibflag_i=sheetObj.GetCellValue(i, "Grd01ibflag");
			//Order No , Item 같은 로우 중복 체크
			for(var j=sheetObj.HeaderRows(); j<=sheetObj.LastRow()-1; j++) {
var ibflag_j=sheetObj.GetCellValue(j, "ibflag");
if( sheetObj.GetCellValue(i, "ctrt_no") != sheetObj.GetCellValue(j, "ctrt_no") && ibflag_j != "D" ){
					//alert("i="+i+" j="+j+"   1  "+sheetObj.CellValue(i, "ctrt_no")+"  2   "+sheetObj.CellValue(j, "ctrt_no"));
					ComShowCodeMessage("COM0239","Contract No");
					return;
				}
			}
		}		
	}
	return true;
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
var rate_no=sheetObj.GetCellValue(Row,"rate_no");
var ctrt_no=sheetObj.GetCellValue(Row,"ctrt_no");
	if ( sheetObj.ColSaveName(Col) == "rate_no" && !ComIsNull(rate_no)){
		formObj.select_ctrt_no.value=ctrt_no;
comboObjects[2].SetSelectCode(sheetObj.GetCellValue(Row,"rate_no"));
	}
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg){
	var formObj=document.form;
	var rowcnt=sheetObj.RowCount();
	var prefix="Grd05";
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
		if(sheetObj.GetCellValue(i, "frt_cd") == "TGAP" || formObj.ex_in_cd.value == "I"){
			sheetObj.SetCellEditable(i, "indirect_rev",0);
		}else{
			sheetObj.SetCellEditable(i, "indirect_rev",1);
		}
	}
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var srcName=sheetObj.ColSaveName(Col);
	var prefix="Grd05";
	var sUrl="";
	var sb_cls_cd="B";
	if ( srcName == "curr_cd" ) {
		sUrl="grp_cd=C010&code_cd="+Value;
		searchIbCommonCodeInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	} else if ( srcName == "ctrt_no" ) {
		sUrl="ctrt_no="+Value+"&ex_in_cd=I";
		searchTlCtrtInfo(formObj,sUrl,srcName,Row, sb_cls_cd);	
	} else if ( srcName == "frt_cd" ) {
		sUrl="code="+Value+"&org_cd="+formObj.org_cd.value+"&ex_in_cd=I";
		searchIbTlFreightInfo(formObj,sUrl,Row, sb_cls_cd);	
	} else if ( srcName == "exrate" || srcName == "amt" ) {
		setAutoCal(Row, sb_cls_cd);
	}
	sheetObj.SetSumText(0,0,"TOTAL");
}

function searchIbCommonCodeInfo(formObj, value, srcName, row, sb_cls_cd){
	var param = row + '|' + sb_cls_cd;
	ajaxSendPost(setIbCommonCodeInfo, param , '&goWhere=aj&bcKey=searchCommonCodeInfo&'+value, './GateServlet.gsl');
}
function setIbCommonCodeInfo(reqVal, param ){
var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				docObjects[0].SetCellValue(param.split('|')[0], 'curr_cd', rtnArr[0]);
			}
			else{
				docObjects[0].SetCellValue(param.split('|')[0], 'curr_cd', '',0);
			}
			setCurrCal(param.split('|')[0], param.split('|')[1]);
		}
		else{
			docObjects[0].SetCellValue(param.split('|')[0], 'curr_cd', '',0);
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
//function resultIbCommonCodeInfo(resultXml, srcName, row, sb_cls_cd) {
//	var sheetObj="";
//	var prefix="";
//	sheetObj=docObjects[0];
//	prefix="Grd05";
//	if ( srcName == "curr_cd" ) {
//		if(getXmlDataNullToNullString(resultXml,'code_cd') != ""){
//			sheetObj.SetCellValue(row, "curr_cd",getXmlDataNullToNullString(resultXml,'code_cd'),0);
//		}else{
//			sheetObj.SetCellValue(row, "curr_cd","",0);
//		}
//		setCurrCal(row, sb_cls_cd);
//	}
//}
function setCurrCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	sheetObj=docObjects[0];
	prefix="Grd05";
	if ( sheetObj.GetCellValue(row, "curr_cd") == formObj.buy_loc_curr_cd.value ) {
		sheetObj.SetCellValue(row, "exrate",1,0);
	} else if ( sheetObj.GetCellValue(row, "curr_cd") == formObj.buy_curr_cd.value ) {
		sheetObj.SetCellValue(row, "exrate",formObj.buy_exrate.value,0);
	} else {
		sheetObj.SetCellValue(row, "exrate",0,0);
	}
	setAutoCal(row, sb_cls_cd);
	//setVatChang(row, sb_cls_cd);
}
function searchTlCtrtInfo(formObj, value, srcName, row, sb_cls_cd){
	var param = row + '|' + sb_cls_cd;
	ajaxSendPost(resultTlCtrtInfo, param , '&goWhere=aj&bcKey=searchTlCtrtInfo&'+value, './GateServlet.gsl');
}
function resultTlCtrtInfo(reqVal, param) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				docObjects[0].SetCellValue(param.split('|')[0], 'ctrt_nm', rtnArr[0]);
			}
			else{
				docObjects[0].SetCellValue(param.split('|')[0], 'ctrt_no', '',0);
				docObjects[0].SetCellValue(param.split('|')[0], 'ctrt_nm', '',0);
			}
		}
		else{
			docObjects[0].SetCellValue(param.split('|')[0], 'ctrt_no', '',0);
			docObjects[0].SetCellValue(param.split('|')[0], 'ctrt_nm', '',0);
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function searchIbTlFreightInfo(formObj, value, row, sb_cls_cd){
	var param = row + '|' + sb_cls_cd;
	ajaxSendPost(resultIbTlFreightInfo, param , '&goWhere=aj&bcKey=searchFrtCd&'+value, './GateServlet.gsl');
}
function resultIbTlFreightInfo(reqVal, param) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				docObjects[0].SetCellValue(param.split('|')[0], 'frt_nm', rtnArr[0]);
				docObjects[0].SetCellValue(param.split('|')[0], 'frt_curr_cls', rtnArr[2]);
				if(sheetObj.GetCellValue(param.split('|')[0], "frt_cd") == "TGAP" || formObj.ex_in_cd.value == "I"){
					sheetObj.SetCellValue(param.split('|')[0], "indirect_rev",0,0);
					sheetObj.SetCellEditable(param.split('|')[0], "indirect_rev",0);
				}else{
					sheetObj.SetCellEditable(param.split('|')[0], "indirect_rev",1);
				}
				setCurr(param.split('|')[0], param.split('|')[1]);
			}
			else{
				docObjects[0].SetCellValue(param.split('|')[0], 'frt_cd', '',0);
				docObjects[0].SetCellValue(param.split('|')[0], 'frt_nm', '',0);
			}
		}
		else{
			docObjects[0].SetCellValue(param.split('|')[0], 'frt_cd', '',0);
			docObjects[0].SetCellValue(param.split('|')[0], 'frt_nm', '',0);
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function setCurr(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	sheetObj=docObjects[0];
	prefix="Grd05";
if ( sheetObj.GetCellValue(row, "frt_curr_cls") == "F" ) {
		sheetObj.SetCellValue(row, "curr_cd",formObj.buy_curr_cd.value,0);
	} else {
		sheetObj.SetCellValue(row, "curr_cd",formObj.buy_loc_curr_cd.value,0);
	}
	setCurrCal(row, sb_cls_cd);
}
function sheet1_OnPopupClick(sheetObj,Row,Col){
	var prefix="Grd05";
	var srcName=sheetObj.ColSaveName(Col);
	var sUrl="";
	var sb_cls_cd="B";
	if ( srcName == "curr_cd" ) {
		sUrl="CommonCodePopup.clt?grp_cd=C010";
		rtnary=new Array(1);
		rtnary[0]= "C010";
		   rtnary[1]=window;
		callBackFunc = "setIbCurrInfoBuy";
//		ComOpenPopup(sUrl, 600, 600, "setIbCurrInfoBuy", "0,0", true, sheetObj, Row, Col, 3);
		modal_center_open('./CommonCodePopup.clt', rtnary, 600,600,"yes");
	} else if ( srcName == "ctrt_no" ) {
		sUrl="ContractPopup.clt?ctrt_no="+sheetObj.GetCellValue(Row, Col)+"&ex_in_cd=I";
//		ComOpenPopup(sUrl, 900, 600, "setIbCtrtInfoBuy", "0,0", true, sheetObj, Row, Col, 3);
		rtnary=new Array(1);
		rtnary[0]= sheetObj.GetCellValue(Row, Col);
		rtnary[1]= "I";
		rtnary[2]=window;
		callBackFunc = "setIbCtrtInfoBuy";
		modal_center_open('./ContractPopup.clt', rtnary, 900,600,"yes");
	} else if ( srcName == "frt_cd" ) {
		sUrl="FreightPopup.clt?cust_cd="+sheetObj.GetCellValue(Row, Col)+"&ex_in_cd=I";
//		ComOpenPopup(sUrl, 600, 600, "setIbFreightInfoBuy", "0,0", true, sheetObj, Row, Col, 3);
		rtnary=new Array(1);
		rtnary[0]= sheetObj.GetCellValue(Row, Col);
		rtnary[1]= "I";
		rtnary[2]=window;
		callBackFunc = "setIbFreightInfoBuy";
		modal_center_open('./FreightPopup.clt', rtnary, 600,600,"yes");
	}
}
function setIbCurrInfoBuy(rtnVal) {
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue( sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),rtnValAry[2],0);
		setCurrCal(sheetObj.GetSelectRow(), 'B');
	}
}
function setIbCtrtInfoBuy(rtnVal){
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue( sheetObj.GetSelectRow(), "ctrt_no",rtnValAry[1],0);
		sheetObj.SetCellValue( sheetObj.GetSelectRow(), "ctrt_nm",rtnValAry[2],0);
	}
}
function setIbFreightInfoBuy(rtnVal){
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue( sheetObj.GetSelectRow(), "frt_cd",rtnValAry[1],0);
		sheetObj.SetCellValue( sheetObj.GetSelectRow(), "frt_nm",rtnValAry[2],0);
		sheetObj.SetCellValue( sheetObj.GetSelectRow(), "frt_curr_cls",rtnValAry[5],0);
		if(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "frt_cd") == "TGAP" || formObj.ex_in_cd.value == "I"){
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "indirect_rev",0,0);
			sheetObj.SetCellEditable(sheetObj.GetSelectRow(), "indirect_rev",0);
		}else{
			sheetObj.SetCellEditable(sheetObj.GetSelectRow(), "indirect_rev",1);
		}
		setCurr(row, 'B');
	}
}

function setAutoCal(row, sb_cls_cd){
	var formObj=document.form;
	var sheetObj="";
	var prefix="";
	var usd_conv_rate="";
	sheetObj=docObjects[0];
	prefix="Grd05";
	usd_conv_rate=parseFloat(ComTrimAll(formObj.buy_usd_conv_rate.value,','));
	if(formObj.ctry_cd.value == 'IN' && (sheetObj.GetCellValue(row, "frt_cd").substring(1) == 'OTH' || sheetObj.GetCellValue(row, "frt_cd") == 'PRMT')){
		sheetObj.SetCellEditable(row, "frt_nm",1);
	}else if(formObj.ctry_cd.value == 'IN'){
		sheetObj.SetCellEditable(row, "frt_nm",0);
	}
	var branch=formObj.org_cd.value;
	//var incls_vat_amt_flg = formObj.incls_vat_amt_flg.value;
	var exrate=parseFloat(sheetObj.GetCellValue(row, "exrate"));
	//var unit_qty = parseFloat(sheetObj.CellValue(row, "unit_qty"));
	//var unit_price = parseFloat(sheetObj.CellValue(row, "unit_price"));
	//var vat = sheetObj.CellText(row, "val_cls_cd");
	//var vatSplit = vat.split("(");
	//var inclusive_flag = !ComIsEmpty(vatSplit[1]);
	//var relay_cd = sheetObj.CellValue(row, "relay_cd");
	var curr_cd=sheetObj.GetCellValue(row, "curr_cd");
	//var ttl_amt = parseFloat(sheetObj.CellValue(row, "ttl_amt"));
	//if(vat == "NIL"){
	//	vat = 0;
	//}else{
	//	vat = parseFloat(vatSplit[0]);
	//}
	//alert("vat= "+vat+" exrate= "+exrate+" unit_qty= "+unit_qty+" unit_price= "+unit_price+" relay_cd= "+relay_cd);
	if(branch == "KRSELLB" || branch == "JPTYOLB" || branch == "VNHANLB" || branch == "VNSGNLB"){
		if((branch == "KRSELLB" && curr_cd == "KRW")||(branch == "JPTYOLB" && curr_cd == "JPY")||(branch == "VNHANLB" && curr_cd == "VND")||(branch == "VNSGNLB" && curr_cd == "VND")){
			sheetObj.SetCellValue(row, "amt",ComAbsRound(sheetObj.GetCellValue(row, "amt"),0),0);
		}else{
			sheetObj.SetCellValue(row, "amt",ComAbsRound(sheetObj.GetCellValue(row, "amt"),2),0);
		}
		sheetObj.SetCellValue(row, "loc_amt",ComAbsRound(sheetObj.GetCellValue(row, "amt") * exrate,0),0);
	}else{
		sheetObj.SetCellValue(row, "amt",ComAbsRound(sheetObj.GetCellValue(row, "amt"),2),0);
		sheetObj.SetCellValue(row, "loc_amt",ComAbsRound(sheetObj.GetCellValue(row, "amt") * exrate,2),0);
	}
	/*if(usd_conv_rate == 0){
		sheetObj.SetCellValue(row, "usd_amt",0,0);
	}else{
		if(incls_vat_amt_flg == "Y" && (inclusive_flag == true || vatSplit[0] == "NIL")){
			sheetObj.SetCellValue(row, "usd_amt",ComAbsRound(ComAbsRound(unit_qty * unit_price,2) * exrate/usd_conv_rate,2),0);
		}else{
			//alert(sheetObj.CellValue(row, "loc_amt")+"     "+sell_usd_conv_rate);
			//alert(ComAbsRound(sheetObj.CellValue(row, "loc_amt")/sell_usd_conv_rate)+"   "+ComAbsRound(sheetObj.CellValue(row, "loc_amt")/sell_usd_conv_rate,2))
			sheetObj.SetCellValue(row, "usd_amt",ComAbsRound(sheetObj.GetCellValue(row, "loc_amt")/usd_conv_rate,2),0);
		}
	}*/
}
function ComAbsRound(obj, pos) {
        //첫번째 인자가 문자열 또는 HTML태그(Object)인 경우 처리
        var num = getArgValue(obj);
        var minus = 1;

        if (pos==undefined || pos==null ) pos = 2;

        var posV = Math.pow(10, pos);
        
        if ( num < 0 ) minus = -1;
        	
        return Math.round(Math.abs(num)*posV)/posV*minus;
}
function getArgValue(obj) {
	if( obj == undefined) return "";
	if( obj.value == -1) return "";
    if (isControl(obj))
        return obj.value;
    else
        return obj
}
function isControl(obj) {
    return (obj !=null && typeof(obj)=="object");
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
		switch(srcName) {
		case "SEARCHLIST":	
			btn_Search();
			break;
		case "SAVE":	
			btn_Save();
			break;
		case "CLOSE":	
			btn_Close();
			break;
		case "btn_buy_add":	
			row_buy_add();
			break;
		case "btn_buy_del":	
			row_buy_del();
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
function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
	ComSetObjValue(formObj.ctrt_no,    		aryPopupData[0][0]);
	ComSetObjValue(formObj.ctrt_nm,    		aryPopupData[0][1]);	
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=event.srcElement.getAttribute("value");
	if (vKeyCode == 13) {
		switch (srcName) {	
			case "ctrt_nm" :
				processButtonClick("btn_ctrt_no");
				break;
			default:				
				form_onChange();				
				break;
		}
	}
	return true;
}
function form_onChange() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
	var val="";
	switch(srcName) {
		case "ctrt_no" :
			if (!ComIsNull(srcValue)){
				searchAjaxColInfo(formObj, ComGetObjValue(formObj.ctrt_no), "ctrt_no");
			}else{
				ComSetObjValue(form.ctrt_no, "");
				ComSetObjValue(form.ctrt_nm, "");
			}
			break;
	}
}
function searchAjaxColInfo(formObj, value, col){
	var formObj=document.form;
	if(col=="ctrt_no"){
		var param="ctrt_no="+value;
		var sXml=docObjects[0].GetSearchData("searchTlCtrtInfo.do?"+param);
		if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
			alert(getXmlDataNullToNullString(sXml,'exception_msg'));
		}
		ComSetObjValue(form.ctrt_no, 			getXmlDataNullToNullString(sXml,'ctrt_no'));
		ComSetObjValue(form.ctrt_nm, 			getXmlDataNullToNullString(sXml,'ctrt_nm'));
	}
}
function btn_OK() {	
	var formObj=document.form;
	var openerformObj=opener.document.form;
	var row="";
	var openerprefix1="Grd04";
	//var prefix1="Grd02";
	var openerprefix2="Grd05";
	//var prefix2="Grd03";
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[3];
	var openerSheetObj1=opener.docObjects[1];
	var openerSheetObj2=opener.docObjects[2];
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
	for(var i=sheetObj2.HeaderRows(); i<=sheetObj2.LastRow(); i++) {
if( sheetObj2.GetCellValue(i, "chk") == '1' ){
			row=openerSheetObj2.DataInsert(-1);
openerSheetObj2.SetCellValue(row,openerprefix2+"frt_br_cd",sheetObj2.GetCellValue(i,"ofc_cd"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"cust_cd",sheetObj2.GetCellValue(i,"cust_cd"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"cust_nm",sheetObj2.GetCellValue(i,"cust_nm"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"frt_cd",sheetObj2.GetCellValue(i,"frt_cd"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"frt_nm",sheetObj2.GetCellValue(i,"frt_nm"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"curr_cd",sheetObj2.GetCellValue(i,"curr_cd"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"unit_cd",sheetObj2.GetCellValue(i,"unit_cd"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"unit_price",sheetObj2.GetCellValue(i,"unit_price"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"val_cls_cd",sheetObj2.GetCellValue(i,"buy_vat_cd"),0);
openerSheetObj2.SetCellValue(row,openerprefix2+"cust_org_yn",sheetObj2.GetCellValue(i,"org_yn"),0);
			openerSheetObj2.SetCellValue(row,openerprefix2+"internal_sts_cd","",0);
if ( openerSheetObj2.GetCellValue(row, openerprefix2+"curr_cd") == openerformObj.buy_loc_curr_cd.value ) {
				openerSheetObj2.SetCellValue(row, openerprefix2+"exrate",1,0);
} else if ( openerSheetObj2.GetCellValue(row, openerprefix2+"curr_cd") == openerformObj.buy_curr_cd.value ) {
				openerSheetObj2.SetCellValue(row, openerprefix2+"exrate",openerformObj.buy_exrate.value,0);
			}
			opener.setUnit(row, 'B');
		} 
	}
  ComClosePopup(); 
}
function btn_Close() {
  ComClosePopup(); 
}
function row_buy_add() {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var prefix="Grd05";
	/*if (ComIsEmpty(formObj.buy_exrate_dt) || !isDate(formObj.buy_exrate_dt)) {
		ComShowCodeMessage("COM0082","Buying Ex.Rate Date");
		formObj.buy_exrate_dt.focus();
		return;
	}
	if(isNull(formObj.buy_curr_cd)){
		ComShowCodeMessage("COM0082","Buying Foreign Currency");
		formObj.buy_curr_cd.focus();
		return;
	}
	if(isNull(formObj.buy_exrate) || formObj.buy_exrate.value == 0){
		ComShowCodeMessage("COM0082","Buying Ex.Rate");
		formObj.buy_exrate.focus();
		return;
	}
	if(isNull(formObj.buy_usd_conv_rate) || formObj.buy_usd_conv_rate.value == 0){
		ComShowCodeMessage("COM0082","Buying 1 USD Converted to");
		formObj.buy_usd_conv_rate.focus();
		return;
	}*/
	var row=sheetObj.DataInsert(-1);
	if( sheetObj.RowCount - sheetObj.RowCount('D') > 1){
sheetObj.SetCellValue(row,"ctrt_no",sheetObj.GetCellValue(row-1,"ctrt_no"),0);
sheetObj.SetCellValue(row,"ctrt_nm",sheetObj.GetCellValue(row-1,"ctrt_nm"),0);
sheetObj.SetCellValue(row,"indirect_rev",sheetObj.GetCellValue(row-1,"indirect_rev"),0);
	}
	if( formObj.ex_in_cd.value == "I"){
		sheetObj.SetCellValue(row, "indirect_rev",0,0);
		sheetObj.SetCellEditable(row, "indirect_rev",0);
	}else{
		sheetObj.SetCellEditable(row, "indirect_rev",1);
	}
	sheetObj.SetCellValue(row,"frt_br_cd",formObj.org_cd.value,0);
	sheetObj.SetCellValue(row,"curr_cd",formObj.buy_curr_cd.value);
	//sheetObj.CellValue2(row,"exrate") = formObj.buy_exrate.value;
}
function row_buy_del(){
	var sheetObj=docObjects[0];
	if (sheetObj.CheckedRows("chk") != 0) {
		if(sheetObj.RowCount()> 0){
//			ComRowHideDelete(sheetObj,"chk");		
			var sRow = sheetObj.FindCheckedRow("chk");
			var arrRow = sRow.split("|");
			sheetObj.SetRedrawSum(0);
			if (sheetObj.GetCellProperty(0, "chk", "Type") == "DelCheck") {
				// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
				for ( var idx = arrRow.length-1; idx >= 0; idx--) {
					var row = arrRow[idx];
					sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
				}
			} else {
				// 역순으로 삭제 처리하기(중간에 입력상태의 행이 있을수도 있으므로 반드시 역순으로 처리한다.)
				for ( var idx = arrRow.length - 1; idx >= 0; idx--) {
					var row = arrRow[idx];
					sheetObj.SetCellValue(row, "chk", 0, 0); // 1.체크박스 없애기 (체크된데이터만 다른 처리
															// 하는 경우도 있으므로)
					sheetObj.SetRowHidden(row, 1); // 2.행 숨기기
					if( sheetObj.GetRowStatus(row) == "I"){
						sheetObj.RowDelete(row , 0);
					} else {
						sheetObj.SetRowStatus(row, "D"); // 3.트랜잭션 상태 "삭제"로 만들기
					}
				}
			}
			sheetObj.SetRedrawSum(1);
			//form_ctrt_copy();
			//Forwarding_Cbm_Kgs_Sum('A');
		}
    } else {
    	ComShowCodeMessage("COM0170");
    }
}
