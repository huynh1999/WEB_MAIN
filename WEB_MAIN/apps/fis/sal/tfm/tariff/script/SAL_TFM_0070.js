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
var glo_pass = 'N';
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	    case "SEARCHLIST":
			formObj.f_cmd.value = SEARCHLIST;
			docObjects[0].DoSearch("./SAL_TFM_0070GS.clt",FormQueryString(formObj));
			sheetObj.RemoveAll();
			break;
	    case "RESEARCHLIST":
			formObj.f_cmd.value = SEARCHLIST;
			docObjects[0].DoSearch("./SAL_TFM_0070GS.clt",FormQueryString(formObj));
			sheetObj.RemoveAll();
			break;	
		case "SAVE":
			btn_Save();
			break;
		case "btn_iata_cd":
			tpIATA_CD = "btn_iata_cd";
			//ComOpenPopup("COM_MDM_P017.do?param2="+formObject.iata_cd_nm.value,  1100,550, "get_trdp", "0,0", true);
			rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]='';
	   		//rtnary[2]=window;
//	   		if(typeof(valObj)!='undefined'){
//	   			rtnary[2]=valObj;
//	   		}
//	   		else{
//	   			rtnary[2]="";
//	   		}
	   		rtnary[2]="";
	   		var cstmTpCd='AC';
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
	
			
			break;
		case "btn_excel":
			if(sheetObj.RowCount() < 1){
				ComShowCodeMessage("COM132501");
				return;
			}else{
				sheetObj.Down2Excel({ DownCols : makeHiddenSkipCol(sheetObj), SheetDesign : 1, Merge : 1, KeyFieldMark : 0});
			}
			break;
		case "btn_Add_Grid":
			addGrid();
			break;
		case "btn_Del_Grid":
			delGrid();
			break;
		case "upload_excel":
			sheetObj.LoadExcel({Mode : "HeaderMatch", WorkSheetNo : "1"});
			break;
	} // end switch	 
}
function addGrid() {
	var formObject  = document.frm1;
	var sheetObject = docObjects[0];
	var intRows     = 0;
	if(sheetObject.LastRow() == undefined){
		intRows = 1;
	}else{
		intRows     = sheetObject.LastRow() + 1;
	}
	sheetObject.DataInsert(intRows);
}
function delGrid() {
	var formObject = document.frm1;
	var sheetObject = docObjects[0];
	var sRow = sheetObject.FindCheckedRow("delchk");
	var res = sRow.split("|");
	for (var i = 0; i < res.length; i++) {
		sheet1.SetRowHidden(res[i], 1);
	}
}
function getDupCheckIataTariff(reqVal) {	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result_data = doc[1];
			if(result_data == 'FALSE'){
				glo_pass = 'N';
			}else{
				glo_pass = 'Y';
			}
		}
	}
}
function btn_Save() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	if (!saveValidate()) {
		return;
	}
	if(!confirm(getLabel('FMS_COM_CFMSAV'))){
	    return;	
	}
	for(var i=1; i<=sheetObj.LastRow(); i++){
		if(sheetObj.GetCellValue(i, "ibflag")  == 'I' || sheetObj.GetCellValue(i, "ibflag")  == 'U' ||sheetObj.GetCellValue(i, "ibflag")  == 'D'){
			sheetObj.SetCellValue(i, "glo_usr_id",formObj.usr_id.value);
			sheetObj.SetCellValue(i, "glo_ofc_cd",formObj.ofc_cd.value);
		}
	}
	formObj.f_cmd.value = MODIFY;
	sheetObj.DoSave("./SAL_TFM_0070GS.clt", FormQueryString(formObj),"ibflag",false);
}
function saveValidate() {
	var sheetObj = docObjects[0];
	var formObj = document.form;
	var rowCnt = sheetObj.RowCount();
	if (rowCnt < 1) {
		ComShowCodeMessage('COM0409');
		return false;
	} else {
		var rowCnt = sheetObj.RowCount("I") + sheetObj.RowCount("U") + sheetObj.RowCount("D");
		if (rowCnt == 0) {
			ComShowCodeMessage('COM0409');
			return false;
		} else {
			for (i = 1; i <= sheetObj.LastRow(); i++) {
				/*필수값 check*/
				if (sheetObj.GetCellValue(i,"iata_cd") == "" || sheetObj.GetCellValue(i,"iata_cd").length == 0) {
					sheetObj.SelectCell(i,"iata_cd");
					ComShowCodeMessage('COM0005', "IATA Code");
					return false;
				}
				if (sheetObj.GetCellValue(i,"pol_cd") == "" || sheetObj.GetCellValue(i,"pol_cd").length == 0) {
					sheetObj.SelectCell(i,"pol_cd");
					ComShowCodeMessage('COM0005', "Departure");
					return false;
				}
				if (sheetObj.GetCellValue(i,"pod_cd") == "" || sheetObj.GetCellValue(i,"pod_cd").length == 0) {
					sheetObj.SelectCell(i,"pod_cd");
					ComShowCodeMessage('COM0005', "Destination");
					return false;
				}
				/*데이터 Length check*/
				if(sheetObj.GetCellValue(i, "ibflag")  == 'I' || sheetObj.GetCellValue(i, "ibflag")  == 'U'){
					if(sheetObj.GetCellValue(i,"iata_cd").length  > 3 ){
						sheetObj.SelectCell(i,"iata_cd");
						alert("IATA_CODE"+getLabel2('FMS_COM_ALT085',new Array("4")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"pol_cd").length  > 4 ){
						sheetObj.SelectCell(i,"pol_cd");
						alert("Departure"+getLabel2('FMS_COM_ALT085',new Array("5")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"pod_cd").length  > 4 ){
						sheetObj.SelectCell(i,"pod_cd");
						alert("Destination"+getLabel2('FMS_COM_ALT085',new Array("5")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"trf_seq").length  > 3 ){
						sheetObj.SelectCell(i,"trf_seq");
						alert("No"+getLabel2('FMS_COM_ALT085',new Array("4")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"rnk_cd").length  > 1 ){
						sheetObj.SelectCell(i,"rnk_cd");
						alert("CLASS"+getLabel2('FMS_COM_ALT085',new Array("2")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"cmdt_cd").length  > 8 ){
						sheetObj.SelectCell(i,"cmdt_cd");
						alert("C.item"+getLabel2('FMS_COM_ALT085',new Array("9")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"chg_wgt").length  > 14 ){
						sheetObj.SelectCell(i,"chg_wgt");
						alert("W/T Break"+getLabel2('FMS_COM_ALT085',new Array("15")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"crr_rt").length  > 14 ){
						sheetObj.SelectCell(i,"crr_rt");
						alert("Rate/Kgs"+getLabel2('FMS_COM_ALT085',new Array("15")));
						return false;
					}
					if(sheetObj.GetCellValue(i,"frt_amt").length  > 11 ){
						sheetObj.SelectCell(i,"frt_amt");
						alert("Charge"+getLabel2('FMS_COM_ALT085',new Array("12")));
						return false;
					}	
				}
			}
		}
	}
	return true;
}
function CUSTOMER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry = rtnVal.split("|");
		formObj.iata_cd.value    = rtnValAry[21];
		formObj.iata_cd_nm.value = rtnValAry[2];
	}          
}	   

function LOCATION(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[0]==''){
			formObj.pol_cd.focus();
		}else{
			formObj.pol_cd.value    = rtnValAry[3];//loc_cd 
			formObj.pol_nm.value    = rtnValAry[2];//loc_nm
		}
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
			      var headers = [ { Text:getLabel('SAL_TFM_0070_HDR'), Align:"Center"} ];
			      InitHeaders(headers, info);
		          var cols = [ {Type:"Status",    Hidden:1, Width:15,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
						       {Type:"DelCheck",  Hidden:0, Width:50,    Align:"Center",  ColMerge:0,   SaveName:"delchk" },
				               {Type:"PopupEdit", Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"iata_cd",     KeyField:1,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:3 },
				               {Type:"Text",  	  Hidden:1, Width:120,   Align:"Left",    ColMerge:0,   SaveName:"iata_nm",     KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 }, 
				               {Type:"PopupEdit", Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"pol_cd",      KeyField:1,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:4 },
				               {Type:"Text",      Hidden:1, Width:120,   Align:"Left",    ColMerge:0,   SaveName:"pol_nm",      KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
				               {Type:"PopupEdit", Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"pod_cd",      KeyField:1,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:4 },
				               {Type:"Text",      Hidden:1, Width:120,   Align:"Left",    ColMerge:0,   SaveName:"pod_nm",      KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
				               {Type:"Float",     Hidden:0, Width:60,    Align:"right",   ColMerge:0,   SaveName:"trf_seq",     KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
				               {Type:"Combo",     Hidden:0, Width:60,    Align:"Center",  ColMerge:0,   SaveName:"rnk_cd",      KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1},
				               {Type:"Text",      Hidden:0, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"cmdt_cd",  	KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
				               {Type:"Float",     Hidden:0, Width:200,   Align:"Right",   ColMerge:0,   SaveName:"chg_wgt",     KeyField:0,   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
				               {Type:"Float",     Hidden:0, Width:100,   Align:"Right",   ColMerge:0,   SaveName:"crr_rt",      KeyField:0,   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
				               {Type:"Float",     Hidden:0, Width:200,   Align:"Right",   ColMerge:0,   SaveName:"frt_amt",     KeyField:0,   Format:"Float",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
				               
				               {Type:"Text",      Hidden:1, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"glo_usr_id",  	KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				               {Type:"Text",      Hidden:1, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"glo_ofc_cd",  	KeyField:0,   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 }];		         
				 InitColumns(cols);
				 SetColProperty(0 ,"cmdt_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
				 SetColProperty(0 ,"iata_cd" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
				 SetColProperty(0 ,"pol_cd" ,  {AcceptKeys:"E|N" , InputCaseSensitive:1});
				 SetColProperty(0 ,"pod_cd" ,  {AcceptKeys:"E|N" , InputCaseSensitive:1});
			     SetColProperty("rnk_cd", {ComboText:"|M|N|Q|U|E", ComboCode:"|M|N|Q|U|E"} );
		         SetSheetHeight(400);
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
	doWork('RESEARCHLIST');
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
		case "iata_cd"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="2";
			rtnary[1]=""; //대륙코드
			var cstmTpCd='AC';
			callBackFunc = "sheet1_OnPopupClick_iata_cd";
	        modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1000,500,"yes");
	 	    
		break;
		case "pol_cd"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			
			rtnary=new Array(5);
	   		rtnary[0] = "A";
	   		rtnary[1] = "BL";
	   		rtnary[2] = "";
	   		rtnary[3] = "";	
	   		rtnary[4] = document.getElementById("pol");	
	   		//[ LHK 20130712 ]
	   		//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
	   		//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
	   		callBackFunc = "sheet1_OnPopupClick_pol_cd";
	        modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
		break;
		case "pod_cd"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(5);
	   		rtnary[0] = "A";
	   		rtnary[1] = "BL";
	   		rtnary[2] = "";
	   		rtnary[3] = "";	
	   		rtnary[4] = document.getElementById("pol");	
			callBackFunc = "sheet1_OnPopupClick_pod_cd";
	        modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
	 	    
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
	var formObj = document.frm1;
	var s_code  = obj.value.toUpperCase();		
	var s_type  = "";
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE = str;	
			if(CODETYPE == "trdpprefixcode"){
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}else if (CODETYPE == "location_pol"){
				str = "location";
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}else if (CODETYPE == "location_pod"){
				str = "location";
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE = str;		
		if(CODETYPE == "trdpprefixcode"){
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}else if (CODETYPE == "location_pol"){
			str = "location";
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}else if (CODETYPE == "location_pod"){
			str = "location";
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpprefixcode"){
				var temps = masterVals[18].replaceAll(" ","")
				if(temps == ""){
					formObj.iata_cd.value    = "";	 //prefix  AS param1
					formObj.iata_cd_nm.value = "";	 //eng_nm   AS param2
				}else{
					formObj.iata_cd.value    = masterVals[18];	 //prefix  AS param1
					formObj.iata_cd_nm.value = masterVals[3];	 //eng_nm   AS param2	
				}
			}else if(CODETYPE =="location_pol"){
				formObj.pol_cd.value=masterVals[0];
				formObj.pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.pod_cd.value=masterVals[0];
				formObj.pod_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE == "trdpprefixcode"){
				formObj.iata_cd.value    = "";
				formObj.iata_cd_nm.value = "";
			}else if(CODETYPE == "location_pol"){
				formObj.pol_cd.value = "";
				formObj.pol_nm.value = "";
			}else if(CODETYPE == "location_pod"){
				formObj.pod_cd.value = "";
				formObj.pod_nm.value = "";
			}
		}
	}else{	
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
function sheet1_OnPopupClick_iata_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "iata_cd",rtnValAry[21],0);
		docObjects[0].SelectCell(cur_row, "iata_cd", 0);
	}
}
function sheet1_OnPopupClick_pol_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "pol_cd",rtnValAry[0],0);
		docObjects[0].SelectCell(cur_row, "pol_cd", 0);
	}
}
function sheet1_OnPopupClick_pod_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "pod_cd",rtnValAry[0],0);
		docObjects[0].SelectCell(cur_row, "pod_cd", 0);
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
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="frt_amt"){
		addGrid();
		sheetObj.SelectCell(row+1, 2);
	}
}