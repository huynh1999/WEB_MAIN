/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0310.js
*@FileTitle  : State Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/09
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var cur_strFlg;
function doWork(srcName, strFlg){
	cur_strFlg = strFlg;
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCH":
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0360GS.clt", FormQueryString(formObj) );
            }
		break;
		case "NEW":
			displayClear();
			break;
		case "REMOVE":
            formObj.f_cmd.value=REMOVE;
            if(validateForm(sheetObj,formObj,REMOVE, 1)){
            	//'삭제하시겠습니까?')){
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("MDM_MCM_0310GS.clt", FormQueryString(formObj),"ibflag",false);
                }
			}
		break;
       	case "SAVE":
       		doAction();
		break;
		case "ADD_1":			
			
			if(fn_validateForm("ADD")){				
				useFlgChange();
				s_useFlgChange();
				formObj.f_cmd.value=ADD;
				sheetObj.DoSearch("MDM_MCM_0360GS.clt", FormQueryString(formObj) );
				showCompleteProcess();
			}
			
		break;	
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCH', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCH');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCH');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var formObj=document.frm1;
    formObj.i_delt_flg.checked="true";
    doWork('SEARCH');
    
    
    //console.log(PARAM1_1);
    //console.log(PARAM1_2);
    
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
        	    with(sheetObj){
		           var cnt=0;
		           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		           var headers = [ { Text:getLabel('MDM_MCM_0360_HDR1'), Align:"Center"} ];
		           InitHeaders(headers, info);
		           var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		                  {Type:"Text",      Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"rownum",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"lane_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"from_area_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"to_area_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"div_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0, Width:250,  Align:"Left",    ColMerge:1,   SaveName:"descr",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"delt_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dock_rcpt_rmk",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"rgst_tms",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"modi_tms",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"Indexing" } ];
		           InitColumns(cols);
		           SetSheetHeight(310);
		           SetEditable(1);
		           sheetObj.SetColProperty("div_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
           }
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
/*
	for(var i=1 ; i<docObjects[0].LastRow() + 1 ; i++){
		if(docObjects[0].GetCellValue(i, "lane_cd") == frm1.lane_cd.value){
			frm1.i_rgst_usrid.value=docObjects[0].GetCellValue(i, "rgst_usrid")
			frm1.i_rgst_tms.value=docObjects[0].GetCellValue(i, "rgst_tms")
			frm1.i_modi_usrid.value=docObjects[0].GetCellValue(i, "modi_usrid")
			frm1.i_modi_tms.value=docObjects[0].GetCellValue(i, "modi_tms")
			}
	}
*/	
	displayClear();
	if(docObjects[0].RowCount()>0){
		sheet1_OnClick(docObjects[0],1);
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.i_lane_cd.value=sheetObj.GetCellValue(Row, "lane_cd");
	formObj.i_div_cd.value=sheetObj.GetCellValue(Row, "div_cd");
	formObj.i_lane_cd.className="search_form-disable";
	formObj.i_lane_cd.readOnly=true; 
	formObj.i_from_area_nm.value=sheetObj.GetCellValue(Row, "from_area_nm");
	formObj.i_to_area_nm.value=sheetObj.GetCellValue(Row, "to_area_nm");
	formObj.i_descr.value=sheetObj.GetCellValue(Row, "descr");
	formObj.i_dock_rcpt_rmk.value=sheetObj.GetCellValue(Row, "dock_rcpt_rmk");
	formObj.i_rgst_usrid.value=sheetObj.GetCellValue(Row, "rgst_usrid");
	formObj.i_rgst_tms.value=sheetObj.GetCellValue(Row, "rgst_tms");
	formObj.i_modi_usrid.value=sheetObj.GetCellValue(Row, "modi_usrid");
	formObj.i_modi_tms.value=sheetObj.GetCellValue(Row, "modi_tms");
	
	var bolUseYn=sheetObj.GetCellValue(Row, "delt_flg");
	if ( bolUseYn == "Y" ) {
		formObj.i_delt_flg.checked=true;
	} else if ( bolUseYn == "N" ) {
		formObj.i_delt_flg.checked=false;
	}
	formObj.save_flg.value='U';
}
function displayClear() {
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if( collTxt[i].name != 's_lane_cd' && collTxt[i].name != 's_descr'){
			if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
				collTxt[i].value="";
			}           
		}
	}
	
	formObj.i_dock_rcpt_rmk.value="";
	formObj.i_div_cd.value="";
	formObj.i_delt_flg.checked  = true;
	formObj.i_lane_cd.readOnly  = false;
   	formObj.save_flg.value='I';
}

/**
 * 콤보 조회
 */
function doSContiAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var s_prnt_conti_cd=formObj.s_prnt_conti_cd.value;
	ajaxSendPost(dispSContiAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchSubContinentCode&s_prnt_conti_cd='+s_prnt_conti_cd, './GateServlet.gsl');
}
/**
 * 콤보 조회
 */
function doIContiAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_prnt_conti_cd=formObj.i_prnt_conti_cd.value;
	ajaxSendPost(dispIContiAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchSubContinentCode&s_prnt_conti_cd='+i_prnt_conti_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispSContiAjaxReq1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var arrTmp=doc[1].split(';');
			var arrContiCd=arrTmp[0].split('|');
			var arrContiNm=arrTmp[1].split('|');
			document.frm1.s_conti_cd.text=1; 
			document.frm1.s_conti_cd.options[0]=new Option("","");
			for ( var i=1 ; i < arrContiCd.length ; i++ ) {
				document.frm1.s_conti_cd.options[i]=new Option(arrContiNm[i-1],arrContiCd[i-1]);
			}
			document.frm1.s_conti_cd.options[0].selected="true";
		} else {
			document.frm1.s_conti_cd.length=1;
			document.frm1.s_conti_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
//확인 Ajax
function dispIContiAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var arrTmp=doc[1].split(';');
			var arrContiCd=arrTmp[0].split('|');
			var arrContiNm=arrTmp[1].split('|');
			document.frm1.i_conti_cd.text=1; 
			document.frm1.i_conti_cd.options[0]=new Option("","");
			for ( var i=1 ; i < arrContiCd.length ; i++ ) {
				document.frm1.i_conti_cd.options[i]=new Option(arrContiNm[i-1],arrContiCd[i-1]);
			}
			document.frm1.i_conti_cd.options[0].selected="true";
		} else {
			document.frm1.i_conti_cd.length=1;
			document.frm1.i_conti_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_delt_flg.checked == true ) {
		formObj.i_delt_flg.value="Y";
	} else if ( formObj.i_delt_flg.checked == false ) {
		formObj.i_delt_flg.value="N";
	}
}
function s_useFlgChange() {
	var formObj=document.frm1;
	var s_delt_flg="";
	var s_delt_flg_opt=document.getElementsByName("s_delt_flg");
	if ( s_delt_flg_opt[0].checked == true ) {
		s_delt_flg="Y";
	} else if ( s_delt_flg_opt[1].checked == true ) {
		s_delt_flg="N";
	}
	formObj.s_delt_flg.value=s_delt_flg;
}
function fncContrySearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCH');
	}
}function checkAddModiVal(frm1){
    if(checkInputVal(frm1.i_state_cd.value, 1, 10, "T", "State Code")!='O'){
       	return false;
    } else if(checkInputVal(frm1.i_cnt_cd.value, 2, 2, "T", getLabel('CNT_CD'))!='O'){
    	return false;
    } 
    /*
    else if(checkInputVal(frm1.i_state_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    }
    */
    else if(checkInputVal(frm1.i_state_eng_nm.value, 1, 100, "T", getLabel('ENG_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    } 
    return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	var formObj=document.frm1;
	
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
		if(str == "country"){
			formObj.i_cnt_cd.value = "";
			formObj.i_cnt_nm.value = "";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value=masterVals[0];//cnt_cd
				formObj.i_cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				formObj.s_node_code.value=masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value="";//cnt_cd
				formObj.i_cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				formObj.s_node_code.value=masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value="";
				//doWork('CURRENCY_POPLIST');
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function CURRENCY_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.i_curr_cd.value=rtnValAry[0];
		}
  }
function COUNTRY_POPLIST_2(rtnVal){
	var formObj=document.frm1;
 	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.i_cnt_cd.value=rtnValAry[0];//cd_val
			formObj.i_cnt_nm.value=rtnValAry[1];//cd_nm
		}
 }
function STATE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if ( cur_strFlg == "S" ) {
			formObj.s_state_cd.value=rtnValAry[0];
		} else if ( cur_strFlg == "I" ) {
		}
	} 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	
	var formObj=document.frm1;
	
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		formObj.i_state_cd.focus();
	}
}


function fn_validateForm(){
	var formObj=document.frm1;
	
	if (ComIsEmpty(formObj.i_lane_cd)) {
		ComShowCodeMessage("COM0114","Lane Code!");
		formObj.i_lane_cd.focus();
		return false;
	}		
	
	if (ComIsEmpty(formObj.i_div_cd)) {
		ComShowCodeMessage("COM0114","Division!");
		formObj.i_div_cd.focus();
		return false;
	}		
	
	if (ComIsEmpty(formObj.i_from_area_nm)) {
		ComShowCodeMessage("COM0114","From!");
		formObj.i_from_area_nm.focus();
		return false;
	}		
	
	if (ComIsEmpty(formObj.i_to_area_nm)) {
		ComShowCodeMessage("COM0114","To!");
		formObj.i_to_area_nm.focus();
		return false;
	}		
	
	if (ComIsEmpty(formObj.i_descr)) {
		ComShowCodeMessage("COM0114","Description!");
		formObj.i_descr.focus();
		return false;
	}		
	
	return true;
}


// #1370 - [OPUS Logistics][PQC] Additional Bug_2018.07.04 [S]

function doAction(){
	var formObj=document.frm1;
	var i_lane_cd=formObj.i_lane_cd.value;
	if(fn_validateForm()){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchLaneCode&s_lane_cd='+i_lane_cd, './GateServlet.gsl');
	}
}

function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(formObj.save_flg.value =="I"){ 
				if(confirm(getLabel('MDM_COM_ALT009')+'\n'+getLabel('FMS_COM_CFMMOD'))){
					doWork("ADD_1");
				}
			}else if(formObj.save_flg.value =="U"){
				if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
					doWork("ADD_1");
				}
			}
			
		} else {
			doWork("ADD_1");			
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

//#1370 - [OPUS Logistics][PQC] Additional Bug_2018.07.04 [E]
