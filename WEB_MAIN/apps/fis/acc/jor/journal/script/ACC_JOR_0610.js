//=========================================================
//*@FileName   : ACC_JOR_0610.jsp
//*@FileTitle  : Payment History Level 2
//*@Description: Payment History
//*@author     : wyjoung - Cyberlogitec
//*@version    : 1.0 - 2014/04/10
//*@since      : 2014/04/10
//
//*@Change history:  
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/25
//*@since      : 2014/07/25
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
//OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
var TAX_COL = "N";
function doWork(srcName){
	// if(!btnVisible(srcName)){//버튼의 단축키 사용가능여부 체크
	// 	return;
	// }
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
	   	    if(formObj.f_cust_flag[0].checked){
		    	formObj.s_cust_flag.value="A";	//Vendor_Customer
		    }else{
		    	formObj.s_cust_flag.value="B";	//Account_Group_ID
		    }
           formObj.f_cmd.value=SEARCHLIST;
           sheetObj.DoSearch("./ACC_JOR_0610GS.clt", FormQueryString(formObj) );
       break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
		case "ALL_DPT":
			formObj.f_sell_buy_tp_cd_s.checked=true;
			formObj.f_sell_buy_tp_cd_b.checked=true;
			formObj.f_sell_buy_tp_cd_d.checked=true;
			formObj.f_sell_buy_tp_cd_c.checked=true;
			formObj.f_sell_buy_tp_cd_ar_gnr.checked=true;
			formObj.f_sell_buy_tp_cd_ap_gnr.checked=true;
			formObj.f_sell_buy_tp_cd_na.checked=true;
		break;
		case "CLEAR_DPT":
			formObj.f_sell_buy_tp_cd_s.checked=false;
			formObj.f_sell_buy_tp_cd_b.checked=false;
			formObj.f_sell_buy_tp_cd_d.checked=false;
			formObj.f_sell_buy_tp_cd_c.checked=false;
			formObj.f_sell_buy_tp_cd_ar_gnr.checked=false;
			formObj.f_sell_buy_tp_cd_ap_gnr.checked=false;
			formObj.f_sell_buy_tp_cd_na.checked=false;
		break;
        case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.f_trdp_nm.value;
//	   		rtnary[2]=window;
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
        case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.f_trdp_nm.value;
	   		rtnary[2]=window;
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
        case 'MINIMIZE':
			if(mainForm.style.display != "none") {
				getObj('mainForm').style.display="none";
				//sheetObj.SetSheetHeight(580);
				resizeSheet();
			} else {
				getObj('mainForm').style.display="block";
				//sheetObj.SetSheetHeight(440 );
				resizeSheet();
			}
        break; 
    }
}

function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
      if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_trdp_cd.value=rtnValAry[0];//full_nm
		
		//#3488 Accounting Multi Language 적용 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.f_trdp_nm.value=rtnValAry[10];//locl_nm
		}else{
			formObj.f_trdp_nm.value=rtnValAry[2];//eng_nm			
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
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
    //OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
	var opt_key = "TAX_COL";
	ajaxSendPost(setTaxCol, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
	setFromToDtEndPlus(formObj.f_start_date, 30, formObj.f_end_date, 0);
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
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
			var col=sheetObj.MouseCol()();
			sheetObj.SetGetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
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
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );
             var info    = { Sort:0, ColMove:0, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_JOR_0610_HDR1'), Align:"Center"},
                         { Text:getLabel('ACC_JOR_0610_HDR2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"jnr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"jnr_tp",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"amt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
                    {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"tax_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"inv_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"inv_post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"inv_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"inv_due_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ofc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"inv_tp",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"inv_sum_amt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"pay_amt",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"bal_sum_amt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"gl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"gl_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"jnr_desc",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"sub_total_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"sub_total_amt2",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"total",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);

             //OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
             if(TAX_COL == "Y"){
 				SetColHidden("tax_no",0);
 			 }
             SetEditable(0);
             //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "inv_post_dt", "MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "inv_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "inv_due_dt","MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetSheetHeight(440);

         	//sheetObj.MessageText="SubSum";
         	sheetObj.ShowSubSum([{StdCol:"total", SumCols:"sub_total_amt2", Sort:false, ShowCumulate:false, CaptionCol:1, CaptionText:"GRAND TOTAL"},{StdCol:"bank_nm", SumCols:"sub_total_amt", Sort:false, ShowCumulate:false, CaptionCol:1, CaptionText:"%col TOTAL"}]);
         	//sheetObj.MessageText="SubSum";
         	//sheetObj.ShowSubSum([{StdCol:"bank_nm", SumCols:"sub_total_amt", Sort:false, ShowCumulate:false, CaptionCol:3, CaptionText:"3=%sTOTAL"}]);
         	resizeSheet();
         }
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	//표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj.FindSubSumRow();
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 
    	if(sheetObj.GetCellValue(arrRow[idx],1) == "GRAND TOTAL"){
    		sheetObj.SetCellText(arrRow[idx], "amt" ,sheetObj.GetCellText(arrRow[idx], "sub_total_amt2"));
    	}else{
    		sheetObj.SetCellText(arrRow[idx], "amt" ,sheetObj.GetCellText(arrRow[idx], "sub_total_amt"));
    	}
    	sheetObj.SetMergeCell(Number(arrRow[idx]), 1, 1, 6);
    }
/*    for (idx=0; idx<arrRow.length-1; idx++){ 
    	sheetObj.SetRowMerge(arrRow[idx],1);
    	alert(sheetObj.GetCellText(arrRow[idx], "sub_total_amt"))
    	if(arrRow[idx] == sheetObj.FindText(3, "TOTAL ", arrRow[idx], 2)){
    		sheetObj.SetCellText(arrRow[idx], "amt" ,sheetObj.GetCellText(arrRow[idx], "sub_total_amt"));
    	}
    	if(arrRow[idx] == sheetObj.FindText(3, "GRAND TOTAL", arrRow[idx], 2)){
    		sheetObj.SetCellText(arrRow[idx], "amt" ,sheetObj.GetCellText(arrRow[idx], "sub_total_amt2"));
    	}
    	sheetObj.SetCellFont("FontBold", arrRow[idx], "post_dt", arrRow[idx],"amt",1);
		sheetObj.SetCellText(arrRow[idx], 1 ,sheetObj.GetCellValue(arrRow[idx], 3));
		sheetObj.SetCellText(arrRow[idx], 2 ,sheetObj.GetCellValue(arrRow[idx], 3));
		sheetObj.SetCellText(arrRow[idx], 3 ,sheetObj.GetCellValue(arrRow[idx], 3));
		sheetObj.SetCellText(arrRow[idx], 4 ,sheetObj.GetCellValue(arrRow[idx], 3));
		sheetObj.SetCellText(arrRow[idx], 5 ,sheetObj.GetCellValue(arrRow[idx], 3));
		sheetObj.SetCellText(arrRow[idx], 6 ,sheetObj.GetCellValue(arrRow[idx], 3));
    	sheetObj.SetCellAlign(arrRow[idx],1,"Center");
    }*/	
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.f_start_date, formObj.f_end_date, 'MM-dd-yyyy');
	    break;
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
	setFromToDtEndPlus(formObj.f_start_date, 30, formObj.f_end_date, 0);
	formObj.f_payment_tp_d.checked=true;
	formObj.f_payment_tp_p.checked=true;
	formObj.f_sell_buy_tp_cd_s.checked=true;
	formObj.f_sell_buy_tp_cd_d.checked=true;
	formObj.f_sell_buy_tp_cd_c.checked=true;
	formObj.f_sell_buy_tp_cd_b.checked=true;
	formObj.f_sell_buy_tp_cd_ar_gnr.checked=true;
	formObj.f_sell_buy_tp_cd_ap_gnr.checked=true;
	formObj.f_sell_buy_tp_cd_na.checked=true;
	formObj.f_cust_flag[0].checked=true;
	formObj.f_grp_id_cd.value="";

	//LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	formObj.f_bank_cd.value="";
	formObj.f_date_flag.value="A";
	sheetObj.RemoveAll();
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="TRDPCD"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="TRDPCD"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.f_trdp_cd.value="";
		formObj.f_trdp_nm.value="";
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="TRDPCD"){
				formObj.f_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				
				//#3488 Accounting Multi Language 적용 
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.f_trdp_nm.value=masterVals[16];	//eng_nm   AS param2
				}else{
					formObj.f_trdp_nm.value=masterVals[3];	//eng_nm   AS param2					
				}
				
			}
		}else{
			if(CODETYPE =="TRDPCD"){
				formObj.f_trdp_cd.value="";//trdp_cd  AS param1
				formObj.f_trdp_nm.value="";//eng_nm   AS param2
			}
		}
	}
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}
//Calendar flag value
var firCalFlag=false;
function glCodeEnterAction(obj){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		rtnary=new Array(2);
		rtnary[0]="GLRMK";
		rtnary[1]=obj.value;
	    callBackFunc = "CMM_POP_0260";
	    modal_center_open('./CMM_POP_0260.clt', rtnary, 658,433,"yes");
	}
}

function CMM_POP_0260(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_gl_no.value=rtnValAry[0];
		formObj.f_gl_nm.value=rtnValAry[1];
	}
}

function glCodePopup(obj){
	var formObj=document.frm1;
	rtnary=new Array(2);
	rtnary[0]=""
	rtnary[1]=obj.value;
	callBackFunc = "CMM_POP_0260";
    modal_center_open('./CMM_POP_0260.clt', rtnary, 658,433,"yes");
}
function glCodeNameAction(obj){
	var formObj=document.frm1;
	if(obj.value != ""){
		ajaxSendPost(getGlRmk, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+obj.value, './GateServlet.gsl');
	}
	else{
		formObj.f_gl_no.value="";
		formObj.f_gl_nm.value="";
	}
}
/**
* GL_CD 관린 코드조회
*/
function getGlRmk(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.f_gl_no.value=rtnArr[0];
				formObj.f_gl_nm.value=rtnArr[1];
			}
		}else{
			formObj.f_gl_no.value="";
			formObj.f_gl_nm.value="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
function setTaxCol(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		TAX_COL=doc[1];
	} else {
		TAX_COL="";
	}
}
