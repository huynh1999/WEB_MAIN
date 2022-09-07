/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0030.js
*@FileTitle  : Sub Continent Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	    case "NEW":
	    	displayClear();
	    break;
		case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0030GS.clt", FormQueryString(formObj) );
            }
		break;
		case "ADD_1":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=ADD;
				sheetObj.DoSearch("MDM_MCM_0030GS.clt", FormQueryString(formObj) );
				showCompleteProcess();
	        }
		break;
		case "MODIFY_1":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=MODIFY;
				sheetObj.DoSearch("MDM_MCM_0030GS.clt", FormQueryString(formObj) );
				showCompleteProcess();
	        }
		break;
		case "ROWADD":
       //no support[check again]CLT 		var iRows=sheetObj.Rows;
            var Row=sheetObj.DataInsert(++iRows);
            sheetObj.SetCellValue(Row, 3,formObj.i_conti_cd.value);
			sheetObj.SetCellValue(Row, 4,formObj.i_locl_nm.value);
			sheetObj.SetCellValue(Row, 5,formObj.i_desc.value);
			sheetObj.SetCellValue(Row, 9,formObj.i_rgst_usrid.value);
			sheetObj.SetCellValue(Row, 11,formObj.i_rgst_tms.value);
			sheetObj.SetCellValue(Row, 12,formObj.i_modi_usrid.value);
			sheetObj.SetCellValue(Row, 13,formObj.i_modi_tms.value);
			var bolUseYn=formObj.i_use_flg.checked;
			if ( bolUseYn == "true" ) {
				sheetObj.SetCellValue(Row, 6,"Y");
			} else {
				sheetObj.SetCellValue(Row, 6,"N");
			}
		break;
		case "REMOVE":
            formObj.f_cmd.value=REMOVE;
            if(validateForm(sheetObj,formObj,REMOVE, 1)){
            	//'삭제하시겠습니까?')){
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("MDM_MCM_0030GS.clt", FormQueryString(formObj),"ibflag",false);
                }
			}
		break;
       	case "SAVE":
			doAction();
		break;
		case "CURRENCY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[1]="";
			callBackFunc = "CURRENCY_POPLIST";
			modal_center_open('./CMM_POP_0040.clt', rtnary, 660,355,"yes");
/*			var rtnVal =  window.showModalDialog('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.i_curr_cd.value=rtnValAry[0];
			}*/
		break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data
				ComShowCodeMessage("COM132501");
				}else{
//					sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
					sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
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
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
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
    doWork('SEARCHLIST');
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
            with (sheetObj) {
             //var HeadTitle="CK|STS|No|Contry\nCode|Country\nName\n(Local)|Desc|Continent|Sub\nContinent|Use\nY/N|ENG_NM|CONTI_CD|CONIT_NM|USRID|OFCCD|TMS|USRID|OFCCD|TMS" ;
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0030_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
						  {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
						  {Type:"Seq",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"cnt_cd",        KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"prnt_conti_nm", KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:130,  Align:"Left",    ColMerge:1,   SaveName:"conti_nm",      KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:170,  Align:"Left",    ColMerge:1,   SaveName:"cnt_locl_nm",   KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:170,  Align:"Left",    ColMerge:1,   SaveName:"cnt_eng_nm",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:200,  Align:"Left",    ColMerge:1,   SaveName:"desc",          KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",       KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"conti_cd",      KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"prnt_conti_cd", KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_tms",      KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_tms",      KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dock_rcpt_rmk", KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						  {Type:"Text",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" }
						];
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(390);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	document.getElementById("s_cnt_locl_cd").focus();
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	var formObj=document.frm1;
	formObj.i_cnt_cd.disabled=true;
	formObj.i_cnt_cd.className="search_form-disable";
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
		formObj.i_cnt_cd.value=sheetObj.GetCellValue(Row, "cnt_cd");
		formObj.i_prnt_conti_cd.value=sheetObj.GetCellValue(Row, "prnt_conti_cd");
		doIContiAction();
		formObj.i_cnt_locl_nm.value=sheetObj.GetCellValue(Row, "cnt_locl_nm");
		formObj.i_desc.value=sheetObj.GetCellValue(Row, "desc");
		formObj.i_conti_cd.value=sheetObj.GetCellValue(Row, "conti_cd");
	//formObj.i_conti_nm.value = sheetObj.CellValue(Row, 6);
		formObj.i_cnt_eng_nm.value=sheetObj.GetCellValue(Row, "cnt_eng_nm");
	//formObj.i_prnt_conti_nm.value = sheetObj.CellValue(Row, 7);
		formObj.i_rgst_usrid.value=sheetObj.GetCellValue(Row, "rgst_usrid");
		formObj.i_rgst_tms.value=sheetObj.GetCellValue(Row, "rgst_tms");
		formObj.i_modi_usrid.value=sheetObj.GetCellValue(Row, "modi_usrid");
		formObj.i_modi_tms.value=sheetObj.GetCellValue(Row, "modi_tms");
		formObj.i_curr_cd.value=sheetObj.GetCellValue(Row, "curr_cd");

		//#3355 [JTC]Dock Receipt 수정
		formObj.dock_rcpt_rmk.value=sheetObj.GetCellValue(Row, "dock_rcpt_rmk");

		formObj.i_cnt_cd.disabled=true;
		formObj.i_cnt_cd.className="search_form-disable";
		var bolUseYn=sheetObj.GetCellValue(Row, "use_flg");
		if ( bolUseYn == "Y" ) {
			formObj.i_use_flg.checked=true;
		} else if ( bolUseYn == "N" ) {
			formObj.i_use_flg.checked=false;
		}
}
function displayClear() {
	var formObj=document.frm1;
	formObj.i_cnt_cd.value="";
	formObj.i_cnt_locl_nm.value="";
	formObj.i_desc.value="";
	formObj.i_conti_cd.value="";
	//formObj.i_conti_nm.value = "";
	formObj.i_cnt_eng_nm.value="";
	formObj.i_prnt_conti_cd.value="";
	//formObj.i_prnt_conti_nm.value = "";
	formObj.i_rgst_usrid.value="";
	formObj.i_rgst_tms.value="";
	formObj.i_modi_usrid.value="";
	formObj.i_modi_tms.value="";
	formObj.i_curr_cd.value="";
	formObj.i_use_flg.checked="true";
	formObj.i_cnt_cd.disabled=false;
	formObj.i_cnt_cd.className="search_form";

	//#3355 [JTC]Dock Receipt 수정
	formObj.dock_rcpt_rmk.value="";
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0030.308");		
	}
}
//확인 Ajax
function dispIContiAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
	    //select 박스 초기화
		$('#i_conti_cd').find('option').remove().end().append('').val();

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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0030.336");		
	}
}
function doAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_cnt_cd=formObj.i_cnt_cd.value;
	if(checkAddModiVal(frm1)){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchContryCode&s_cnt_cd='+i_cnt_cd, './GateServlet.gsl');
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(checkAddModiVal(frm1)){
				doWork("MODIFY_1");
			}
		} else {
			if(checkAddModiVal(frm1)){
				doWork("ADD_1");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0030.368");		
	}
}
function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
	}
	formObj.i_cnt_cd.disabled=false;
}
function fncContrySearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function checkAddModiVal(frm1){
    if(checkInputVal(frm1.i_cnt_cd.value, 2, 2, "T", getLabel('CNT_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(frm1.i_prnt_conti_cd.value, getLabel('CONTI_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(frm1.i_conti_cd.value, getLabel('SUB_CONTI_CD'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_cnt_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_cnt_eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_curr_cd.value, 0, 3, "T", getLabel('CURR'))!='O'){
    	return false;
    }
    /*
	if(checkInputVal(frm1.i_cnt_cd.value, 2, 2, "T", getLabel('CNT_CD'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_cnt_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_cnt_eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_curr_cd.value, 0, 3, "T", getLabel('CURR'))!='O'){
    	return false;
    }
	*/
    return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
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
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
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
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0030.540");		
	}
}

function CURRENCY_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_curr_cd.value=rtnValAry[0];//cd_val
	}
}

