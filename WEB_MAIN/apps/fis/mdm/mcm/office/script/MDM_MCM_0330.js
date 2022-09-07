/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0330.js
*@FileTitle  : Office Code Search
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName, strFlg){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0330GS.clt", FormQueryString(formObj) );
            }
		break;
		case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	var rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			callBackFunc = "COUNTRY_POPLIST";
			modal_center_open('./CMM_POP_0020.clt', rtnary, 1150,480,"yes");
		break;
		case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var rtnary=new Array(4);
	   		rtnary[0]="1";
	   		rtnary[1]="";//대륙코드 
	   		rtnary[2]="";//국가코드
	   		rtnary[3]="LOC";// Class
	   		callBackFunc = "LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,480,"yes");
		break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
		break;
    }
}
function COUNTRY_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(strFlg=="S"){
			formObj.s_cnt_cd.value=rtnValAry[0];
			formObj.s_loc_cd.value="";
		}else if(strFlg == "I"){
			formObj.i_cnt_cd.value=rtnValAry[0];
			formObj.i_cnt_nm.value=rtnValAry[1];
			formObj.i_loc_cd.value="";
			formObj.i_loc_nm.value="";
			formObj.i_prnt_ofc_cd.value="";
			formObj.i_prnt_ofc_nm.value="";
			formObj.i_sls_ofc_cd.value="";
			formObj.i_finc_ofc_cd.value="";
		}
	}
}
function LOCATION_POPLIST(rtnVal){
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			if ( strFlg == "S" ) {
				formObj.s_loc_cd.value=rtnValAry[0];
			} else if ( strFlg == "I" ) {
				formObj.i_loc_cd.value=rtnValAry[0];//loc_cd 
				//formObj.s_node_code.value = rtnValAry[1];//nod_cd 
				formObj.i_loc_nm.value=rtnValAry[2];//loc_nm
			}
		} 
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
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
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0050_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"ofc_eng_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:1,   SaveName:"desc",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cnt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:140,  Align:"Left",    ColMerge:1,   SaveName:"loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"cnt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ofc_addr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ofc_zip",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ofc_phn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ofc_fax",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"prnt_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"prnt_ofc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_tms",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_tms",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"sls_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"finc_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"sls_ofc_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"finc_ofc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trf_cur_cd" },
                 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(500);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	document.getElementById("s_ofc_eng_nm").focus();
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function fncOfficeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	ctlKind=obj;
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
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value=masterVals[0];//trdp_cd
				//formObj.s_liner_abbr.value = masterVals[2];//shrt_nm
				formObj.i_trdp_nm.value=masterVals[3];//full_nm
				doAction2();
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value=masterVals[0];//cnt_cd
				formObj.i_cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				formObj.i_loc_nm.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				if ( ctlKind == formObj.i_prnt_ofc_cd ) {
					formObj.i_prnt_ofc_cd.value=masterVals[0];
					formObj.i_prnt_ofc_nm.value=masterVals[3];
				} else if ( ctlKind == formObj.i_sls_ofc_cd ) {
					formObj.i_sls_ofc_cd.value=masterVals[0];
					formObj.i_sls_ofc_nm.value=masterVals[3];
				} else if ( ctlKind == formObj.i_finc_ofc_cd ) {
					formObj.i_finc_ofc_cd.value=masterVals[0];
					formObj.i_finc_ofc_nm.value=masterVals[3];
				}
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
				formObj.i_trdp_cd.value="";//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				formObj.i_trdp_nm.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value="";//cnt_cd
				formObj.i_cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				formObj.i_loc_nm.value="";//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value="";
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				if ( ctlKind == formObj.i_prnt_ofc_cd ) {
					formObj.i_prnt_ofc_cd.value="";
					formObj.i_prnt_ofc_nm.value="";
				} else if ( ctlKind == formObj.i_sls_ofc_cd ) {
					formObj.i_sls_ofc_cd.value="";
					formObj.i_sls_ofc_nm.value="";
				} else if ( ctlKind == formObj.i_finc_ofc_cd ) {
					formObj.i_finc_ofc_cd.value="";
					formObj.i_finc_ofc_nm.value="";
				}
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value="";
				formObj.s_user_name.value="";
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value="";
				formObj.s_commodity_name.value="";
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value="";
				formObj.s_package_name.value="";
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value="";
				formObj.s_cargo_name.value="";
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value="";
				formObj.s_vessel_name.value="";
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0330.352");		
	}
}
function sheet1_OnDblClick(sheetObj, row, col){
	//switch(sheetObj.ColSaveName(col)){
		//case "ofc_cd":
	var paramStr="./MDM_MCM_0050.clt?f_cmd="+SEARCH+"&s_ofc_cd="+sheetObj.GetCellValue(row, 'ofc_cd');
			parent.mkNewFrame('Office Code', paramStr);	
		//break;
	//}
}