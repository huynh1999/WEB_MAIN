/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0120.jsp
*@FileTitle  : Commodity Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/05
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0120GS.clt", FormQueryString(formObj) );
            }
            var intRows=sheetObj.RowCount();
            for ( var i=1 ; i <= intRows ; i++ ) {
            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
            		sheetObj.SetCellEditable(i, "cmdt_cd",0);
            	} else {
            		sheetObj.SetCellEditable(i, "cmdt_cd",1);
            	}
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "NEW":
       break;
       case "ROWADD":
       		var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":
       	/*
	alert(sheetObj.GetCellValue(1, "delt_flg"));
	alert(sheetObj.GetCellValue(2, "delt_flg"));
       	break;
       	*/
       		if ( !fncGridCheck() ) return false;
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0120GS.clt", FormQueryString(formObj),"ibflag",false);
                var intRows=sheetObj.RowCount();
	            for ( var i=1 ; i <= intRows ; i++ ) {
	            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
	            		sheetObj.SetCellEditable(i, "cmdt_cd",0);
	            	} else {
	            		sheetObj.SetCellEditable(i, "cmdt_cd",1);
	            	}
	            }
            }
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
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
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
	frm1.f_CurPage.value=1;
//	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	frm1.f_CurPage.value=1;
//	document.forms[0].f_CurPage.value=1;
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

		          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		          var headers = [ { Text:getLabel('MDM_MCM_0120_HDR'), Align:"Center"} ];
		          InitHeaders(headers, info);
		
		          var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		              {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		              {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		              {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"delt_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
		              {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"hs_grp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		              {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"cmdt_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		              {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"cmdt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:300 },
		              {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"cmdt_ut1",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		              {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"cmdt_ut2",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		              {Type:"PopupEdit", Hidden:0, Width:130,  Align:"Left",    ColMerge:1,   SaveName:"uppr_cmdt_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
		              {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"imo_cd_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		              {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"descr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
		              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"db_value" },
		              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
		           
		          InitColumns(cols);
		          SetSheetHeight(420);
		          SetShowButtonImage(2);
		          SetEditable(1);
		          sheetObj.SetDataLinkMouse("hs_grp_cd",1);
		          sheetObj.SetColProperty("hs_grp_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
		          resizeSheet();
          }

           
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
var cur_Row;
function sheet1_OnPopupClick(sheetObj,Row,Col){
	cur_Row = Row;
    switch (sheetObj.ColSaveName(Col)) {
        case "uppr_cmdt_cd" :
        	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "sheet1_OnPopupClick_uppr_cmdt_cd";
	        modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
   	        
		break;
	}
}
function sheet1_OnPopupClick_uppr_cmdt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_Row, "uppr_cmdt_cd",rtnValAry[0]);
		//formObj.s_commodity_name.value = rtnValAry[2];
	}
}
/**
 * 콤보 조회
 */
function doAction(cmdt_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCommodityKeyCode&s_cmdt_cd='+cmdt_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Commodity Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CMDT') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cmdt_cd","");
		}	
	}
	else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ALT007') + " - " + doc[0] + "\n\n: MDM_MCM_0120.252");
	}
}
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
    	case "cmdt_cd" :
    		var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			doAction(sheetObj.GetCellValue(Row, Col));
		break;
		case "cmdt_nm" :
			var strPckNm=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strPckNm.toUpperCase());
		break;
		case "uppr_cmdt_cd" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('commodity', sheetObj.GetCellValue(Row, Col));
		break;
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.RowCount();
	var dupRow="";
	for(var i=1 ; i <= intRow ; i++){
		if(sheetObj.GetCellValue(i, "cmdt_cd") == "" || sheetObj.GetCellValue(i, "cmdt_cd") == null){
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CMDTCD'));
			return false;
		}
	}
	//그리드 cmdt_cd 중복체크 2013.01.02 
	dupRow=sheetObj.ColValueDup("cmdt_cd");
	if(dupRow > 0){
		alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CMDT')+": " + sheetObj.GetCellValue(dupRow, "cmdt_cd"));
		return false;
	}
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj){
	ctlKind=obj;
	if ( obj != "" ) {
		CODETYPE=str;
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+obj, './GateServlet.gsl');
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var sheetObj=docObjects[0];
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
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value=masterVals[0];//cnt_cd
				formObj.cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				formObj.i_loc_nm.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value=masterVals[0];//cd_val
				formObj.curr_nm.value=masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value=masterVals[0];
				formObj.sls_ofc_nm.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.sls_usrid.value=masterVals[0];
				formObj.sls_usrnm.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				sheetObj.SetCellValue(ctlRow, ctlCol,masterVals[0]);
				//formObj.s_commodity_name.value = masterVals[3];
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
				formObj.cnt_cd.value="";//cnt_cd
				formObj.cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				formObj.i_loc_nm.value="";//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value="";
				formObj.curr_nm.value="";//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value="";
				formObj.sls_ofc_nm.value="";
			}else if(CODETYPE =="user"){
				formObj.sls_usrid.value="";
				formObj.sls_usrnm.value="";
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				sheetObj.SetCellValue(ctlRow, ctlCol,"");
				//formObj.s_commodity_name.value = "";
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
		//alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0120.392");		
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="descr"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}

