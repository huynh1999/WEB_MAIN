var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
				sheetObj.DoSearch("SAL_TPM_0030GS.clt", FormQueryString(formObj) );
            }
            //sheetObj.ShowDebugMsg = false;
       	break;
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="SAL";
//		   	rtnary[1]=formObj.s_e_trdp_nm.value;
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
        case "MODIFY":
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("SAL_TPM_0030GS.clt", FormQueryString(formObj),"ibflag1", false);
            }
       break;
        case 'EXCEL':
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
        case "SEARCHLIST01": 
      		//sheetObj.ShowDebugMsg = true;
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("SAL_TPM_0031GS.clt", FormQueryString(formObj) );
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
	 var formObj=document.frm1; 
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
				// 높이 설정
			    (13, 0, 0, true);
	
			    SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			    var headers = [ { Text:getLabel('SAL_TPM_0030_HDR1'), Align:"Center"}];
			    InitHeaders(headers, info);
	
			    var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag1" },
			              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"shrt_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"acct_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"eng_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"locl_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		              
			              {Type:"Combo",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"sls_gp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Combo",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"cr_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			              {Type:"Int",       Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"cr_term_dt",   KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
			              {Type:"Float",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"crd_lmt_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:0,   EditLen:15 },
			              {Type:"Float",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cur_lmt_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
			              {Type:"Float",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"amt_over",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			              {Type:"Date",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"crd_appr_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 , EditLen:10 },
			              /* #6767 [Zencon] How to enter the ETA +15 days credit term*/
			              {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"his_flg",           KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 , EditLen:1000 },
			              {Type:"Text",      Hidden:0,  Width:460,   Align:"Center",  ColMerge:1,   SaveName:"mm",           KeyField:1,   CalcLogic:"",   Format:"",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 , EditLen:1000 },
			              {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"mm_flg" },
			              {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
		     
		       InitColumns(cols);

		       SetEditable(1);
		       SetColProperty("sls_gp_cd", {ComboText:TPNM, ComboCode:TPCD} );
		       SetColProperty("cr_term_cd", {ComboText:"Days____|End of this month|End of next month|____th of next month", ComboCode:"A|B|C|D"} );
		       //InitViewFormat(0, "crd_appr_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		       SetAutoRowHeight(0);
		       SetSheetHeight(410);
		       resizeSheet();
			}
		break;
		// #23 #52878 - [ZEN] TRADE PARTNER EDIT HISTORY MANAGEMENT
		case 2:      //HISTORY
    	    with(sheetObj){
          
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel("SAL_TPM_0030_HDR2"), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Float",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cng_seq" },
                {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"itm_lbl" },
                {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"bfr_cng_txt" },
                {Type:"Text",     Hidden:0,  Width:310,  Align:"Left",    ColMerge:0,   SaveName:"aft_cng_txt" },
                {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid" },
                {Type:"Date",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"rgst_tms", Format:"YmdHms" },
                {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"mm", Format:"" }];
          
         InitColumns(cols);

         SetEditable(0);
         SetSheetHeight(200);
               }
		  break;
			
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	setSheetProperty();
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//alert(getLabel('FMS_COM_NTYCOM'));
	/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	setSheetProperty();
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function setSheetProperty(){
	var sheetObj=docObjects[0];
	for(var i=1;i<=sheetObj.RowCount();i++){
		// Day Field 활성/비활성
		var crTermCd=sheetObj.GetCellValue(i,'cr_term_cd');
		if (crTermCd == 'A' || crTermCd == 'D'){
			sheetObj.SetCellEditable(i,  "cr_term_dt",1);
		}
		// Amount Over 값 설정 
		var amtOver=sheetObj.GetCellValue(i,'amt_over');
		if (Number(amtOver)<=00){
			sheetObj.SetCellValue(i,  "amt_over","0",0);
		}
		var crTermCd=sheetObj.GetCellValue(i,'sls_gp_cd');
		if(crTermCd == 'CH'){
			sheetObj.SetCellEditable(i,'cr_term_cd',0);
			sheetObj.SetCellEditable(i,  "cr_term_dt",0);
			sheetObj.SetCellEditable(i,'crd_lmt_amt',0);
		}
	}
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
	if(colSaveName != 'mm' && colSaveName != 'mm_flg'){
		sheetObj.SetCellValue(row, 'mm_flg', colSaveName);
	}
	switch (colSaveName) {
		case "sls_gp_cd":
			var crTermCd=sheetObj.GetCellValue(row,'sls_gp_cd');
			if(crTermCd == 'CH'){
				sheetObj.SetCellEditable(row,'cr_term_cd',0);
				sheetObj.SetCellEditable(row,  "cr_term_dt",0);
				sheetObj.SetCellEditable(row,'crd_lmt_amt',0);
			}else{
				sheetObj.SetCellEditable(row,'cr_term_cd',1);
				sheetObj.SetCellEditable(row,  "cr_term_dt",1);
				sheetObj.SetCellEditable(row,'crd_lmt_amt',1);
			}
			
			// #1680 [CLA] TRADE PARTNER CREDIT COD 지정시 개선 사항
			if(crTermCd == 'CO'){
				sheetObj.SetCellValue(row, 'cr_term_cd', 'A');
				sheetObj.SetCellValue(row, 'cr_term_dt', 0);
			}
		break;
		case "cr_term_cd":
			var crTermCd=sheetObj.GetCellValue(row,'cr_term_cd');
			if  (crTermCd == 'A' || crTermCd == 'D'){
				sheetObj.SetCellEditable(row,  "cr_term_dt",1);
			} else {
				sheetObj.SetCellValue(row,'cr_term_dt',"",0);
				sheetObj.SetCellEditable(row,  "cr_term_dt",0);
			}
		break;
		case "cr_term_dt":
			if(sheetObj.GetCellValue(row, "cr_term_dt")!=''&&sheetObj.GetCellValue(row, "cr_term_dt")<0){
				sheetObj.SetCellValue(row,'cr_term_dt',"");
				alert(getLabel('FMS_COM_ALT002'));
			}
		break;
		case "crd_lmt_amt":
			if(sheetObj.GetCellValue(row, "crd_lmt_amt")<0){
				sheetObj.SetCellValue(row, "crd_lmt_amt",0);
				alert(getLabel('FMS_COM_ALT002'));
			}
			var crdLmtAmt=Number(sheetObj.GetCellValue(row,'crd_lmt_amt'));
			var curLmtAmt=Number(sheetObj.GetCellValue(row,'cur_lmt_amt'));
			var amtOver=(curLmtAmt - crdLmtAmt)>0?(curLmtAmt - crdLmtAmt):0;
			sheetObj.SetCellValue(row,'amt_over',amtOver,0);
		break;
		case "cur_lmt_amt":
			if(sheetObj.GetCellValue(row, "cur_lmt_amt")<0){
				sheetObj.SetCellValue(row, "cur_lmt_amt",0);
				alert(getLabel('FMS_COM_ALT002'));
			}
		break;
		case "amt_over":
			if(sheetObj.GetCellValue(row, "amt_over")<0){
				sheetObj.SetCellValue(row, "amt_over",0);
				alert(getLabel('FMS_COM_ALT002'));
			}
		break;
	}
}
// #23 #52878 - [ZEN] TRADE PARTNER EDIT HISTORY MANAGEMENT
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "trdp_cd" || sheetObj.ColSaveName(Col) == "trdp_tp_nm" ||sheetObj.ColSaveName(Col) == "shrt_nm"|| sheetObj.ColSaveName(Col) == "acct_cd" || sheetObj.ColSaveName(Col) == "eng_nm"|| sheetObj.ColSaveName(Col) == "locl_nm"){
		var formObj = document.frm1;
	    formObj.f_trdp_cd.value = sheetObj.GetCellValue(Row, "trdp_cd");
		doWork('SEARCHLIST01');
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
	formObj.s_sls_gp_cd[0].selected=true;
	formObj.s_amt_over[0].selected=true;
	formObj.s_e_trdp_nm.value="";
	formObj.s_acct_no.value="";
	formObj.s_trdp_tp_cd.value="";
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
		frm1.s_e_trdp_cd.value="";
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
