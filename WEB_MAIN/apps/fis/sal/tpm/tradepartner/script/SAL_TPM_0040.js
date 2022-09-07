//=========================================================
//*@FileName   : SAL_TPM_0020.jsp
//*@FileTitle  : Trade Partner ManagementList
//*@Description: Trade Partner ManagementList
//*@author     : Choi,Gil-Ju - Cyberlogitec
//*@version    : 1.0 - 01/07/2009
//*@since      : 01/07/2009
//
//*@Change history:
//*@author	: Tuan.Chau
//*@version	: 2.0 - 14/07/2014
//=========================================================

var rtnary=new Array(1);
var callBackFunc = "";
var curRow;
var curCell;

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
       		if(!formValidation()) return;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("SAL_TPM_0040GS.clt", FormQueryString(formObj) );
            }
            
       	break;
       	case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";//대륙코드
	 	   	callBackFunc = "COUNTRY_POPLIST";
	 	   	modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
	    break;
	    	    
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="1";
		   	rtnary[1]="";
		   	rtnary[2]=window;
	   	    var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp=LN',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
	   	    if (rtnVal == "") {
				return;
			}
			var rtnValAry=rtnVal.split("|");
			formObj.s_trdp_cd.value=rtnValAry[0];
			formObj.s_shrt_nm.value=rtnValAry[1];
			formObj.s_full_nm.value=rtnValAry[2];    	        
	    break;
	    
        case "MODIFY":
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("SAL_TPM_0040GS.clt", FormQueryString(formObj),"ibflag1", false);
            }
        break;

        case "LINER_POPLIST2":
        	rtnary=new Array(2);
        	rtnary[0]="";
        	rtnary[1]="";
        	rtnary[2]=window;
        	callBackFunc = "LINER_POPLIST2";
        	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
        break;
        
		case "ENTR_USR_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			callBackFunc = "ENTR_USR_POPLIST";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		break;
		
        case 'EXCEL':
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
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 var formObj=document.frm1; 
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid(){
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
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
		    with(sheetObj){
	        

		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:4 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SAL_TPM_0040_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shrt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"acct_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"eng_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",   Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"an_bond_no",      KeyField:0,   CalcLogic:"",   Format:"",   			AcceptKeys:"E|N" , InputCaseSensitive:1 ,  PointCount:0,   UpdateEdit:1,   InsertEdit:0,  EditLen:9},
	             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"an_bond_exp_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 }, 
	             {Type:"PopupEdit", Hidden:0,  Width:100,  	Align:"Left",    ColMerge:1,   SaveName:"an_bond_entr_usrid",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 , EditLen:12 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"an_bond_entr_usrnm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"PopupEdit", Hidden:0,  Width:100,  	Align:"Left",    ColMerge:1,   SaveName:"an_bond_pur_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0  ,EditLen:20 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"an_bond_pur_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },

	             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"an_bond_pur_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:0 }, 
	             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag1" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	       
	      		InitColumns(cols);
	      		SetEditable(1);
	      		
	      		SetImageList(0,APP_PATH+"/web/img/button/btn_reset.gif");
	            SetAutoRowHeight(0);
	            SetDataRowHeight(20);

	            //InitViewFormat(0, "an_bond_exp_dt", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		        //InitViewFormat(0, "an_bond_pur_dt", 	"MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정

		        
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(410);
	            resizeSheet();
			}
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}


function sheet1_OnChange(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	//패스워드 변경
	if(colStr=='an_bond_entr_usrid'){
		var curVal=sheetObj.GetCellValue(row, col);
		if(curVal==''){
			sheetObj.SetCellValue(row, "an_bond_entr_usrnm","");
			return;
		}else{
			curRow=row;
			curCell=col;
			curSheet=sheetObj;
			ajaxSendPost(setUserAutoCd, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=user&s_code='+sheetObj.GetCellValue(row, 'an_bond_entr_usrid'), './GateServlet.gsl');
		}
	}
	else if (colStr=='an_bond_pur_cd'){
		var curVal=sheetObj.GetCellValue(row, col);
		if(curVal==''){
			sheetObj.SetCellValue(row, "an_bond_pur_nm","");
			return;
		}else{
			curRow=row;
			curCell=col;
			curSheet=sheetObj;
			ajaxSendPost(setTrdpAutoCd, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+sheetObj.GetCellValue(row, 'an_bond_pur_cd'), './GateServlet.gsl');
		}
	}
}


function setUserAutoCd(rtnMsg){
	var curSheet=docObjects[0];
	var doc=getAjaxMsgXML(rtnMsg);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])=='undefined'){
			curSheet.SetCellValue(curRow, 'an_bond_entr_usrid','',0);
			curSheet.SetCellValue(curRow, 'an_bond_entr_usrnm','',0);
			curSheet.SelectCell(curRow, 'an_bond_entr_usrid');
		}else{
			
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			curSheet.SetCellValue(curRow, 'an_bond_entr_usrid',masterVals[0],0);
			curSheet.SetCellValue(curRow, 'an_bond_entr_usrnm',masterVals[3],0);
		}
	}else{
		curSheet.SetCellValue(curRow, 'an_bond_entr_usrid','',0);
		curSheet.SetCellValue(curRow, 'an_bond_entr_usrnm','',0);
		curSheet.SelectCell(curRow, 'an_bond_entr_usrid');
	}
}

function setTrdpAutoCd(rtnMsg){
	var curSheet=docObjects[0];
	var doc=getAjaxMsgXML(rtnMsg);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])=='undefined'){
			curSheet.SetCellValue(curRow, 'an_bond_pur_cd','',0);
			curSheet.SetCellValue(curRow, 'an_bond_pur_nm','',0);
			curSheet.SelectCell(curRow, 'an_bond_pur_cd');
		}else{
			
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			curSheet.SetCellValue(curRow, 'an_bond_pur_cd',masterVals[0],0);
			curSheet.SetCellValue(curRow, 'an_bond_pur_nm',masterVals[1],0);
		}
	}else{
		curSheet.SetCellValue(curRow, 'an_bond_pur_cd','',0);
		curSheet.SetCellValue(curRow, 'an_bond_pur_nm','',0);
		curSheet.SelectCell(curRow, 'an_bond_pur_cd');
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
//doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
	doWork('SEARCHLIST');
}


function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	/*
	formObj.s_trdp_cd.value=sheetObj.GetCellValue(Row,"trdp_cd");
	formObj.f_cmd.value=SEARCHLIST; // SEARCHLIST
    formObj.action="./SAL_TPM_0010.clt";
    formObj.submit();
    */
	// 2011/12/21 Chungrue 수정
//	var paramStr="./SAL_TPM_0010.clt?f_cmd=3&s_trdp_cd="+sheetObj.GetCellValue(Row,"trdp_cd");
//    parent.mkNewFrame('TradePartner Entry', paramStr, "SAL_TPM_0010_SHEET_" + sheetObj.GetCellValue(Row,"trdp_cd"));
}


function sheet1_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	var colStr=sheetObj.ColSaveName(col);
	//Ofice코드 조회
	if(colStr=='an_bond_entr_usrid'){
		var rtnary=new Array(2);
   		
		rtnary=new Array(1);
		rtnary[0]="1";
		
		callBackFunc = "AN_BOND_ENTR_USRID";
		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,500,"yes");

	} else if(colStr=='an_bond_pur_cd'){
		
		var rtnary=new Array(2);
		
		rtnary=new Array(1);
		rtnary[0]="1";
		
		callBackFunc = "AN_BOND_PUR_CD";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	}	
}


function AN_BOND_ENTR_USRID(rtnVal, sheetObj, row, col){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, 'an_bond_entr_usrid',rtnValAry[0],0);
		docObjects[0].SetCellValue(cur_row, 'an_bond_entr_usrnm',rtnValAry[1],0);
	}
}

function AN_BOND_PUR_CD(rtnVal, sheetObj, row, col){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, 'an_bond_pur_cd',rtnValAry[0],0);
		docObjects[0].SetCellValue(cur_row, 'an_bond_pur_nm',rtnValAry[1],0);
	}
}


//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if ( doc[0]=='OK' ) {
		if (typeof(doc[1])!='undefined'){
			var sheetObj3=docObjects[2];
			var iRow=formObj.s_Acct_Info_Row.value;
			//alert("[" + doc[1] + "]" + getLabel('SAL_TPM_0010_MSG3')); Duplicated account!
			alert(getLabel('FMS_COM_ALT008') + " - " + doc[1]);
			sheetObj3.SetCellValue(iRow, 3,"");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	
	if ( obj.value != "" ) {
		if ( tmp == "onKeyUp" ) {
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
		if (str =="user"){
			formObj.an_bond_entr_usrnm.value="";
		} else if (str =="trdpcode"){
			formObj.an_bond_pur_nm.value="";
		} else if (str =="country"){
			formObj.s_cnt_nm.value="";
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
			}else if(CODETYPE =="trdpcode"){
				formObj.an_bond_pur_cd.value=masterVals[0];//trdp_cd
				formObj.an_bond_pur_nm.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_cnt_cd.value=masterVals[0];//cnt_cd
				formObj.s_cnt_nm.value=masterVals[3];//cnt_eng_nm
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
				formObj.an_bond_entr_usrid.value=masterVals[0];
				formObj.an_bond_entr_usrnm.value=masterVals[3];
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
			if(CODETYPE =="trdpcode"){
				formObj.an_bond_pur_cd.value="";//trdp_cd
				formObj.an_bond_pur_nm.value="";//full_nm
			}else if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value="";//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				formObj.i_trdp_nm.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_cnt_cd.value="";//cnt_cd
				formObj.s_cnt_nm.value="";//cnt_eng_nm
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
				formObj.an_bond_entr_usrid.value="";
				formObj.an_bond_entr_usrnm.value="";
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
		//alert(getLabel('FMS_COM_ERR001'));		
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value=1;
		doWork('SEARCHLIST');
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal = new ComCalendarFromTo();
	    	cal.select(formObj.s_strdt,formObj.s_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
	        var cal = new ComCalendarFromTo();
	    	cal.select(formObj.s_strdt,formObj.s_enddt, 'MM-dd-yyyy');
        break;
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
//				alert("You can't Hidden this column.");
				alert(CM_MSG6);
				return false;
			}
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}

// 
function formValidation(){
	var formObj=document.frm1;
	return true;
}

function COUNTRY_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cnt_cd.value=rtnValAry[0];//cnt_cd
		formObj.s_cnt_nm.value=rtnValAry[1];//cnt_eng_nm
	}
}

function ENTR_USR_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.an_bond_entr_usrid.value=rtnValAry[0];
		formObj.an_bond_entr_usrnm.value=rtnValAry[1];
	}
}

function LINER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.an_bond_pur_cd.value=rtnValAry[0];
		formObj.an_bond_pur_nm.value=rtnValAry[2];
	}
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
	    break;
    }
}
