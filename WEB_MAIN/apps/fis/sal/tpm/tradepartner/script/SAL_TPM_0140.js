var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCH":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
				sheetObj.DoSearch("SAL_TPM_0140_1GS.clt", FormQueryString(formObj) );
            }
            //sheetObj.ShowDebugMsg = false;
       	break;
        case "SEARCHLIST01": // Search Free Day Detail
            formObj.f_cmd.value=SEARCHLIST01;
            sheetObj2.DoSearch("SAL_TPM_0140_2GS.clt", FormQueryString(formObj) );
        break;
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]="";
        	rtnary[2]=window;
        	callBackFunc = "LINER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
	   	    break;
        case "LINER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
		   	rtnary[1]=formObj.s_e_trdp_nm.value;
        	rtnary[2]=window;
        	callBackFunc = "LINER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
	   	    break;	   	    
//        case "MODIFY":
//            formObj.f_cmd.value=MODIFY;
//            if(confirm(getLabel('FMS_COM_CFMSAV'))){
//                doProcess=true;
//                sheetObj.DoSave("SAL_TPM_0030GS.clt", FormQueryString(formObj),"ibflag1", false);
//            }
//       break;
       case 'EXCEL':
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
       break;
       case 'FREEDAY_ADD':
			var currRow = sheetObj2.LastRow() + 1;
			sheetObj2.DataInsert(currRow);
			sheetObj2.SetCellValue(currRow, "trdp_cd", formObj.f_trdp_cd.value);
			break;
       case 'FREEDAY_SAVE':		
			formObj.f_cmd.value = MODIFY;
			
			if( fncDupCheck(sheetObj2) ){
				if(confirm(getLabel('FMS_COM_CFMCON'))){
					sheetObj2.DoSave("SAL_TPM_0140_2GS.clt", FormQueryString(formObj),"ibflag",false);
				}
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
	doWork('SEARCH');
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
	doWork('SEARCH');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 var formObj=document.frm1; 
	
	 fnSetAutocompleteCallBack('s_e_trdp_nm', 'setTrdpInfo', 'LINER_POPLIST' );
	 
	 // Basic TP Type - Customer
	 formObj.s_trdp_tp_cd.value = 'CS';
	 
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
		case 1:      //sheet1 init
			with (sheetObj) {
	
			    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			    var headers = [ { Text:getLabel('SAL_TPM_0140_HDR1'), Align:"Center"} ];
			    InitHeaders(headers, info);
	
			    var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                 {Type:"Text",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                 {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"eng_nm",   	  KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
			                 ,{Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } 
			               ];
		     
		       InitColumns(cols);

		       SetEditable(1);
		       SetSheetHeight(500);
		       resizeSheet();
			}
		break;

		case 2:     
			with(sheetObj){
          
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel("SAL_TPM_0140_HDR2"), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [   {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  	ColMerge:1,   SaveName:"ibflag" },
                        {Type:"DelCheck",  Hidden:0, Width:60,   Align:"Center",  	ColMerge:1,   SaveName:"del",           KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
                        {Type:"Seq",      Hidden:0,  Width:60,   Align:"Center",	ColMerge:0,   SaveName:"cnt",           KeyField:0,   CalcLogic:"",   Format:"",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",     Hidden:1,  Width:100,  Align:"Center",  	ColMerge:1,   SaveName:"trdp_cd",      	KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",     Hidden:1,  Width:30,   Align:"Center",  	ColMerge:1,   SaveName:"fre_day_seq",  	KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Combo",    Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,   SaveName:"cntr_tpsz_cd",	KeyField:1,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",     Hidden:0,  Width:75,   Align:"Center",    ColMerge:0,   SaveName:"scac_cd",		KeyField:1,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4  },
		                {Type:"PopupEdit",Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,   SaveName:"port_cd",		KeyField:1,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5  },
		                {Type:"Int",     Hidden:0,  Width:120,  Align:"Right",     ColMerge:0,   SaveName:"tmnl_fre_day",	KeyField:1,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5  , MinimumValue:0 },
		                {Type:"Int",     Hidden:0,  Width:120,  Align:"Right",     ColMerge:0,   SaveName:"pdm_fre_day",	KeyField:1,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5  , MinimumValue:0 },
		                {Type:"Int",     Hidden:0,  Width:120,  Align:"Right",     ColMerge:0,   SaveName:"comb_fre_day",	KeyField:1,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5  , MinimumValue:0 },
		                {Type:"Date",     Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,   SaveName:"rgst_tms", 		KeyField:0,   CalcLogic:"",   Format:"Ymd",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",     Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,   SaveName:"rgst_usrid",	KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		             ];
          
         InitColumns(cols);

         SetEditable(1);
         SetSheetHeight(500);
         SetColProperty('cntr_tpsz_cd', {ComboText:CNTR_GRP_NM, ComboCode:CNTR_GRP_CD} );
         
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
	//setSheetProperty();	
	docObjects[1].RemoveAll();
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//setSheetProperty();
	showCompleteProcess();
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

/**
 * On change in grid.
 * 
 * @param sheetObj
 * @param row
 * @param col
 * @param value
 */
function sheet1_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var colSaveName=sheetObj.ColSaveName(col);
	
//	switch (colSaveName) {
//		case "sls_gp_cd":
//			var crTermCd=sheetObj.GetCellValue(row,'sls_gp_cd');
//			if(crTermCd == 'CH'){
//				sheetObj.SetCellEditable(row,'cr_term_cd',0);
//				sheetObj.SetCellEditable(row,  "cr_term_dt",0);
//				sheetObj.SetCellEditable(row,'crd_lmt_amt',0);
//			}else{
//				sheetObj.SetCellEditable(row,'cr_term_cd',1);
//				sheetObj.SetCellEditable(row,  "cr_term_dt",1);
//				sheetObj.SetCellEditable(row,'crd_lmt_amt',1);
//			}
//			
//		break;
//	}
}
// #23 #52878 - [ZEN] TRADE PARTNER EDIT HISTORY MANAGEMENT
function sheet1_OnClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "trdp_cd" || sheetObj.ColSaveName(Col) == "eng_nm"){
		var formObj = document.frm1;
	    formObj.f_trdp_cd.value = sheetObj.GetCellValue(Row, "trdp_cd");
		doWork('SEARCHLIST01');
	}
}

function sheet2_OnSaveEnd(sheetObj, errMsg){
	doWork('SEARCHLIST01');
}

var cur_row;
function sheet2_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	if(sheetObj.ColSaveName(col) == "port_cd"){
		rtnary=new Array(1);
		rtnary[0]="S";
		rtnary[1]="SL";
		if(typeof(valObj)!='undefined'){
			rtnary[2]=valObj;
		}
		else{
			rtnary[2]="";
		}
		callBackFunc = "PORT_LOCATION_POPLIST";
		modal_center_open('./CMM_POP_0030.clt?type=P', rtnary, 806,415,"yes");
	}
}

//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}

	sheetObj.RemoveAll();
}
// 엔터키 이후 검색
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		//if ( formObj.s_e_trdp_nm.value != null && formObj.s_e_trdp_nm.value != "" ) {
			doWork('LINER_POPLIST');
		//}
	}
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

function LINER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_e_trdp_cd.value=rtnValAry[0];
		formObj.s_e_trdp_nm.value=rtnValAry[2];

   	    //doWork("SEARCHLIST");
	}
}

function codeNameAction(str, obj, tmp, sheet){
	if(obj.value != ""){

		if(str == "partner"){
			str='trdpcode'
		}	
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else if(tmp == "onBlur" && obj.value == ""){
		frm1.s_e_trdp_nm.value="";
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var frm1=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			frm1.s_e_trdp_cd.value=masterVals[0];
			frm1.s_e_trdp_nm.value=masterVals[3];
			//doWork('SEARCHLIST');
		}else{
			frm1.s_e_trdp_cd.value="";
			frm1.s_e_trdp_nm.value="";
		}
	}else{
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function PORT_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		//formObj.f_por_cd.value=rtnValAry[0];//loc_cd 
		//formObj.f_por_nm.value=rtnValAry[2];//loc_nm
		docObjects[1].SetCellValue(cur_row, "port_cd",rtnValAry[0]);
	} 
}

//Check Local Name - Data input
function fncDupCheck(sheetObj){
	var insertUpdateRow_List = new Array();
	var chkArrLcl = sheetObj.FindStatusRow("I|U").split(";");
	if(chkArrLcl!="") {
		for(var i=0; i<chkArrLcl.length; i++){
			//필수 값 체크 로직 필요할 경우 삽입
			//if(sheetObj.GetCellValue(chkArrLcl[i], "lcl_ref_cd") =="" || sheetObj.GetCellValue(chkArrLcl[i], "lcl_gl_nm")){
			//	ComShowMessage(getLabel2("FMS_COM_ALT138",new Array(getLabel("FMS_COM_LCL01"))));
			//	return false;
			//}
			
			// Check duplicate data on grid
			if(sheetObj.ColValueDup("trdp_cd|cntr_tpsz_cd|scac_cd|port_cd") > 0){
				ComShowMessage(getLabel("FMS_COM_ALT008"));
				sheetObj.SetSelectRow(chkArrLcl[i]);
				return false;
			}
		}
	}
	return true;
}

function setTrdpInfo(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			var rtnValAry=rtnVal.split("|");
			setFieldValue(formObj.s_e_trdp_cd,    rtnValAry[0]);
			setFieldValue(formObj.s_e_trdp_nm,    rtnValAry[2]);
		 }
}