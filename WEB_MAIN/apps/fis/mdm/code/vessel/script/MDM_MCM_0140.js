/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0140.jsp
*@FileTitle  : Vessel Code
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
            	sheetObj.DoSearch("MDM_MCM_0140GS.clt", FormQueryString(formObj) );
            }
             var intRows=sheetObj.LastRow() + 1;
            for ( var i=1 ; i < intRows ; i++ ) {
            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
            		sheetObj.SetCellEditable(i, "vsl_cd",0);
            	} else {
            		sheetObj.SetCellEditable(i, "vsl_cd",1);
            	}
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "NEW":
       break;
       case "ROWADD":
    	   var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetCellValue(intRows, "use_flg","Y");
       break;
       case "MODIFY":
       		if ( !fncGridCheck() ) return false;
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0140GS.clt", FormQueryString(formObj),"ibflag",false);
                var intRows=sheetObj.LastRow() + 1;
	            for ( var i=1 ; i < intRows ; i++ ) {
	            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
	            		sheetObj.SetCellEditable(i, "vsl_cd",0);
	            	} else {
	            		sheetObj.SetCellEditable(i, "vsl_cd",1);
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
       case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	  		rtnary=new Array(2);
	  		rtnary[0]="1";
//	  		rtnary[1]=formObj.s_lnr_trdp_nm.value;
	  		rtnary[1]="";
	  		rtnary[2]=window;
	  		
	  		callBackFunc = "LINER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
	        
       break;
       case "LINER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	  		rtnary=new Array(2);
	  		rtnary[0]="1";
	  		rtnary[1]=formObj.s_lnr_trdp_nm.value;
	  		rtnary[2]=window;
	  		
	  		callBackFunc = "LINER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
	        
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
		      with(sheetObj){
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('MDM_MCM_0140_HDR_1'), Align:"Center"},
                   { Text:getLabel('MDM_MCM_0140_HDR_2'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
             {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 , TrueValue : "Y", FalseValue : "N"},
             {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"vsl_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
             {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"vsl_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cnt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
             {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"call_sgn_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lloyd_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:9, AcceptKeys:"E|N",InputCaseSensitive:1 },
             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"descr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"db_value" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
          
         InitColumns(cols);
         SetSheetHeight(460);
         SetEditable(1);
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
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
}
/**
 * 콤보 조회
 */
function doAction(vsl_cd){
	var dupIdx=-1;
	var cnt=0;
	for(var i=2; i<docObjects[0].RowCount()+2; i++){
		if(docObjects[0].GetCellValue(i, docObjects[0].SaveNameCol("vsl_cd")) == vsl_cd){
			cnt++;
			if(cnt > 1){
				dupIdx=i;
			}
		}
	}
	//alert(cnt);
	if(vsl_cd != "" && cnt > 1){
		alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_VESL') + " " +  getLabel('ITM_CD') + ": " + vsl_cd );
		docObjects[0].SetCellValue(dupIdx, "vsl_cd","");
		return;
	}
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchVesselKeyCode&s_vsl_cd='+vsl_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Package Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_PKGE') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "vsl_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
    	case "vsl_cd" :
    		var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			doAction(sheetObj.GetCellValue(Row, Col));
		break;
		case "vsl_nm" :
			var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
		break;
		case "cnt_cd" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('country', sheetObj.GetCellValue(Row, Col));
		break;
		case "lnr_trdp_cd" :
			var strCd=sheetObj.GetCellValue(Row, Col);
			if(strCd==''){
				sheetObj.SetCellValue(Row, 'lnr_trdp_nm','',0);
			}else{
				ctlCol=Col;
				ctlRow=Row;
				codeNameAction('trdpcode', sheetObj.GetCellValue(Row, Col));
			}
		break;
	}
}
var cur_row;
function sheet1_OnPopupClick(sheetObj,Row,Col){
	cur_row = Row;
	switch (sheetObj.ColSaveName(Col)) {
		case "cnt_cd"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=""; //대륙코드
			callBackFunc = "sheet1_OnPopupClick_cnt_cd";
	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
	 	    
		break;
		case "lnr_trdp_cd"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
		   	rtnary[0]="1";
		   	rtnary[1]="";	//eng_name
		   	rtnary[2]=window;
		   	
		   	callBackFunc = "sheet1_OnPopupClick_lnr_trdp_cd";
		   	
	        modal_center_open('./CMM_POP_0010.clt?callTp=LN', rtnary, 1150,650,"yes");
	   	    
		break;
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	 	var intRow=sheetObj.LastRow() + 1;
	for ( var i=1 ; i < intRow ; i++ ) {
		if ( sheetObj.GetCellValue(i, "vsl_cd") == "" || sheetObj.GetCellValue(i, "vsl_cd") == null ) {
			//Please enter a [Vessel Code]!
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_VESL') + getLabel('FMS_COD_CODE'));
			return false;
		}
	}
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	var formObj=document.frm1;
	
	ctlKind=obj;
	if ( obj != "" ) {
		CODETYPE=str;
		if(str == 's_trdpcode'){
			str="trdpcode";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+obj, './GateServlet.gsl');
	}else{
		if(str == 's_trdpcode'){
			formObj.s_lnr_trdp_cd.value = "";
			formObj.s_lnr_trdp_nm.value = "";
		}
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
			if(CODETYPE =="trdpcode"){
				sheetObj.SetCellValue(ctlRow, 'lnr_trdp_nm',masterVals[3]);//full_nm
				sheetObj.SetCellValue(ctlRow, 'lnr_trdp_cd',masterVals[0]);//trdp_cd
			}else if(CODETYPE =="country"){
				sheetObj.SetCellValue(ctlRow, "cnt_cd",masterVals[0],0);
			}else if(CODETYPE =="s_trdpcode"){
				formObj.s_lnr_trdp_nm.value=masterVals[3];//full_nm
				formObj.s_lnr_trdp_cd.value=masterVals[0];//trdp_cd
			}
		}else{
			if(CODETYPE =="trdpcode"){
				sheetObj.SetCellValue(ctlRow, 'lnr_trdp_nm',"");//full_nm
				sheetObj.SetCellValue(ctlRow, 'lnr_trdp_cd',"");//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				//formObj.i_trdp_nm.value = "";//full_nm
			}else if(CODETYPE =="country"){
				sheetObj.SetCellValue(ctlRow, "cnt_cd","",0);
			}else if(CODETYPE =="s_trdpcode"){
				formObj.s_lnr_trdp_nm.value="";//full_nm
				formObj.s_lnr_trdp_cd.value="";//trdp_cd
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001'));		
	}
}
function fncSearch(){
	if(event.keyCode==13){doWork('SEARCHLIST');};
}

function LINER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.s_lnr_trdp_nm.value=rtnValAry[2];//full_nm
	}
}

function sheet1_OnPopupClick_cnt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "cnt_cd",rtnValAry[0],0);
		docObjects[0].SelectCell(cur_row, "cnt_cd", 0);
	}
}

function sheet1_OnPopupClick_lnr_trdp_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "lnr_trdp_nm",rtnValAry[2],0);
		docObjects[0].SetCellValue(cur_row, "lnr_trdp_cd",rtnValAry[0],0);
		docObjects[0].SelectCell(cur_row, "lnr_trdp_cd", 0);
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="descr"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 0);
	}
}
