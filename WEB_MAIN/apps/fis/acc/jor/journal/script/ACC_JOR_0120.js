var FROMDATE;
var TODAY;
var ENDDATE;
var SEARCH_YN;
var SEARCH_DTL1_YN;
var SEARCH_DTL2_YN;
var PRINT_YN;

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
    	   if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    			return;
    	   }
           formObj.f_cmd.value=SEARCHLIST;
           docObjects[0].DoSearch("./ACC_JOR_0120GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST01":
    	   if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    			return;
    		}
           formObj.f_cmd.value=SEARCHLIST01;
           docObjects[1].DoSearch("./ACC_JOR_0121GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST02":
    	   if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    			return;
    		}
           formObj.f_cmd.value=SEARCHLIST02;
           docObjects[2].DoSearch("./ACC_JOR_0122GS.clt", FormQueryString(formObj) );
       break;
       case "PRINT":
    	   PRINT_YN = "Y";
    	   SEARCH_DTL1_YN = "N";
    	   SEARCH_DTL2_YN = "N";
    	   
    	   if(formObj.s_strdt.value == "" || formObj.s_enddt.value == ""){
    		   alert(getLabel('FMS_COM_ALT029'));
    		   return;
    	   }
    	   if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    		   return;
   		   }
    	   if(SEARCH_YN != "Y"){
    		   doWork('SEARCHLIST');
    	   } else {
    		   SEARCH_DTL1_YN = "Y";
        	   SEARCH_DTL2_YN = "Y";
    		   funcPrint();
    	   }
		break;
       case 'EXCEL01':	
    	   if(sheetObj2.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(    	   sheetObj2), SheetDesign:1,Merge:1 });
	   		}
       break;
       case 'EXCEL02':	
    	   if(sheetObj3.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj3.Down2Excel( {DownCols: makeHiddenSkipCol(    	   sheetObj3), SheetDesign:1,Merge:1 });
	   		}
       break;
       case 'NEW':			
    	   displayClear();
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
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1;
	var date=now.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(date < 10){
		date="0"+date;
	}
	/*
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	ENDDATE=getEndDate(TODAY);
	formObj.f_deposit_dt.value=ENDDATE;
	*/
	//LHK, 20131227 Default Bank Set
	formObj.s_bank_cd.value=formObj.dft_rvn_bank.value;
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

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:"", Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ /*{Type:"Text",      Hidden:0,  Width:450,  Align:"Left",    ColMerge:1,   SaveName:"begin_stat_bal",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"begin_tot_deposit_credit",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"begin_tot_check_debit",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"ending_stat_bal",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ending_deposit_credit",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ending_chk_debit",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"actual_ending_bal",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"actual_begin_book_bal",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"actual_tot_deposit_credit",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"actual_tot_chk_debit",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ending_book_bal",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"diff_amt",                   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",                     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  */
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"debit1_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"credit1_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"debit1_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"credit1_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit2_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit2_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit2_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit2_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit4",                     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit4",                    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit6_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit6_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit6_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit6_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit7_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit7_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit7_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit7_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",                     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);
           SetVisible(0);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetEditable(1);
                 }
           break;
         case 2:      //IBSheet1 init
        	    with(sheetObj){
             
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('ACC_JOR_0120_HDR1'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"rcvd_fm_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:58,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);
           SetSheetHeight(200);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetEditable(1);
           //InitViewFormat(0, "post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
           //InitViewFormat(0, "clr_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
           //InitViewFormat(0, "void_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
           }

                                               
	        break;
         case 3:      //IBSheet1 init
        	 with(sheetObj){
            
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('ACC_JOR_0120_HDR2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"d_post_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"d_chk_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"d_payto_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:58,   Align:"Center",  ColMerge:1,   SaveName:"d_curr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"d_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"d_p_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"d_clr_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"d_clr_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"d_void_yn",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"d_void_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);
           SetSheetHeight(200);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetEditable(1);
           //InitViewFormat(0, "d_post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
           //InitViewFormat(0, "d_clr_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
           //InitViewFormat(0, "d_void_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
           }


	        break;
     }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}

function sheet2_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}

function sheet3_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var debit1_1=Number(sheetObj.GetCellValue(1, "debit1_1"));
	var credit1_1=Number(sheetObj.GetCellValue(1, "credit1_1"));
	var debit1_2=Number(sheetObj.GetCellValue(1, "debit1_2"));
	var credit1_2=Number(sheetObj.GetCellValue(1, "credit1_2"));
	var debit2_1=Number(sheetObj.GetCellValue(1, "debit2_1"));
	var credit2_1=Number(sheetObj.GetCellValue(1, "credit2_1"));
	var debit2_2=Number(sheetObj.GetCellValue(1, "debit2_2"));
	var credit2_2=Number(sheetObj.GetCellValue(1, "credit2_2"));
	var debit4=Number(sheetObj.GetCellValue(1, "debit4"));
	var credit4=Number(sheetObj.GetCellValue(1, "credit4"));
	var debit6_1=Number(sheetObj.GetCellValue(1, "debit6_1"));
	var credit6_1=Number(sheetObj.GetCellValue(1, "credit6_1"));
	var debit6_2=Number(sheetObj.GetCellValue(1, "debit6_2"));
	var credit6_2=Number(sheetObj.GetCellValue(1, "credit6_2"));
	var debit7_1=Number(sheetObj.GetCellValue(1, "debit7_1"));
	var credit7_1=Number(sheetObj.GetCellValue(1, "credit7_1"));
	var debit7_2=Number(sheetObj.GetCellValue(1, "debit7_2"));
	var credit7_2=Number(sheetObj.GetCellValue(1, "credit7_2"));
	formObj.begin_stat_bal.value=debit1_1 - credit1_1 + debit1_2 - credit1_2;							// 1
	formObj.begin_tot_deposit_credit.value=debit2_1 + debit2_2;													// 2-1
	formObj.begin_tot_check_debit.value=credit2_1 + credit2_2;												// 2-2
	var begin_stat_bal=Number(formObj.begin_stat_bal.value);
	var begin_tot_deposit_credit=Number(formObj.begin_tot_deposit_credit.value);
	var begin_tot_check_debit=Number(formObj.begin_tot_check_debit.value);
	formObj.ending_stat_bal.value=begin_stat_bal + begin_tot_deposit_credit - begin_tot_check_debit;	// 3
	formObj.ending_deposit_credit.value=debit4;																// 4-1
	formObj.ending_chk_debit.value=credit4;																// 4-2
	var ending_stat_bal=Number(formObj.ending_stat_bal.value);
	var ending_deposit_credit=Number(formObj.ending_deposit_credit.value);
	var ending_chk_debit=Number(formObj.ending_chk_debit.value);
	formObj.actual_ending_bal.value=ending_stat_bal + ending_deposit_credit - ending_chk_debit;			// 5
	formObj.actual_begin_book_bal.value=debit6_1 - credit6_1 + debit6_2 - credit6_2;							// 6
	formObj.actual_tot_deposit_credit.value=debit7_1 + debit7_2;													// 7-1
	formObj.actual_tot_chk_debit.value=credit7_1 + credit7_2;												// 7-2
	var actual_begin_book_bal=Number(formObj.actual_begin_book_bal.value);
	var actual_tot_deposit_credit=Number(formObj.actual_tot_deposit_credit.value);
	var actual_tot_chk_debit=Number(formObj.actual_tot_chk_debit.value);
	formObj.ending_book_bal.value=actual_begin_book_bal + actual_tot_deposit_credit - actual_tot_chk_debit;	// 8 
	var actual_ending_bal=Number(formObj.actual_ending_bal.value);
	var ending_book_bal=Number(formObj.ending_book_bal.value);
	formObj.diff_amt.value=actual_ending_bal - ending_book_bal;									//9
	formObj.begin_stat_bal.value=doMoneyFmt(parseFloat(formObj.begin_stat_bal.value).toFixed(2));
	formObj.begin_tot_deposit_credit.value=doMoneyFmt(parseFloat(formObj.begin_tot_deposit_credit.value).toFixed(2));
	formObj.begin_tot_check_debit.value=doMoneyFmt(parseFloat(formObj.begin_tot_check_debit.value).toFixed(2));
	formObj.ending_stat_bal.value=doMoneyFmt(parseFloat(formObj.ending_stat_bal.value).toFixed(2));
	formObj.ending_deposit_credit.value=doMoneyFmt(parseFloat(formObj.ending_deposit_credit.value).toFixed(2));
	formObj.ending_chk_debit.value=doMoneyFmt(parseFloat(formObj.ending_chk_debit.value).toFixed(2));
	formObj.actual_ending_bal.value=doMoneyFmt(parseFloat(formObj.actual_ending_bal.value).toFixed(2));
	formObj.actual_begin_book_bal.value=doMoneyFmt(parseFloat(formObj.actual_begin_book_bal.value).toFixed(2));
	formObj.actual_tot_deposit_credit.value=doMoneyFmt(parseFloat(formObj.actual_tot_deposit_credit.value).toFixed(2));
	formObj.actual_tot_chk_debit.value=doMoneyFmt(parseFloat(formObj.actual_tot_chk_debit.value).toFixed(2));
	formObj.ending_book_bal.value=doMoneyFmt(parseFloat(formObj.ending_book_bal.value).toFixed(2));
	formObj.diff_amt.value=doMoneyFmt(parseFloat(formObj.diff_amt.value).toFixed(2));
	SEARCH_YN="Y";
	/*
formObj.ending_deposit_credit.value=sheetObj.GetCellValue(1, "ending_deposit_credit");
formObj.ending_chk_debit.value=sheetObj.GetCellValue(1, "ending_chk_debit");
formObj.actual_ending_bal.value=sheetObj.GetCellValue(1, "actual_ending_bal");
formObj.actual_begin_book_bal.value=sheetObj.GetCellValue(1, "actual_begin_book_bal");
formObj.actual_tot_deposit_credit.value=sheetObj.GetCellValue(1, "actual_tot_deposit_credit");
formObj.actual_tot_chk_debit.value=sheetObj.GetCellValue(1, "actual_tot_chk_debit");
formObj.ending_book_bal.value=sheetObj.GetCellValue(1, "ending_book_bal");
formObj.diff_amt.value=sheetObj.GetCellValue(1, "diff_amt");
	*/
	doWork('SEARCHLIST01');
	doWork('SEARCHLIST02');
} 
//조회 후 페이지징 표시
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	formObj.sheet2_total_cnt.value=sheetObj2.GetTotalRows();			// Total Count
	if (sheetObj2.GetTotalRows() > 0) {
		formObj.sheet2_total_amt.value=sheetObj2.ComputeSum("|4|");			// Total Amount
		formObj.sheet2_total_cnt.value=doMoneyFmt(parseFloat(formObj.sheet2_total_cnt.value));
		formObj.sheet2_total_amt.value=doMoneyFmt(parseFloat(formObj.sheet2_total_amt.value).toFixed(2));
	} else {
		formObj.sheet2_total_amt.value=doMoneyFmt(parseFloat("0").toFixed(2));
	}
	
	SEARCH_DTL1_YN = "Y";
	
	if (PRINT_YN == "Y") {
		funcPrint();
	}
}
//조회 후 페이지징 표시
function sheet3_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj3=docObjects[2];
	formObj.sheet3_total_cnt.value=sheetObj3.GetTotalRows();					// Total Count
	if (sheetObj3.GetTotalRows() > 0) {
		formObj.sheet3_total_amt.value=sheetObj3.ComputeSum("|4|");			// Total Amount
		formObj.sheet3_total_cnt.value=doMoneyFmt(parseFloat(formObj.sheet3_total_cnt.value));
		formObj.sheet3_total_amt.value=doMoneyFmt(parseFloat(formObj.sheet3_total_amt.value).toFixed(2));
	} else {
		formObj.sheet3_total_amt.value=doMoneyFmt(parseFloat("0").toFixed(2));
	}
	
	SEARCH_DTL2_YN = "Y";
	
	if (PRINT_YN == "Y") {
		funcPrint();
	}
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
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
    }
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
//필드 클리어
function displayClear() {
	var formObj=document.frm1;
	formObj.f_ofc_nm.value="";
	formObj.s_bank_cd.selectedIndex=0;
	formObj.s_strdt.value="";
	formObj.s_enddt.value="";
	formObj.f_usr_nm.value="";
	formObj.begin_stat_bal.value="";
	formObj.begin_tot_deposit_credit.value="";
	formObj.begin_tot_check_debit.value="";
	formObj.ending_stat_bal.value="";
	formObj.ending_deposit_credit.value="";
	formObj.ending_chk_debit.value="";
	formObj.actual_ending_bal.value="";
	formObj.actual_begin_book_bal.value="";
	formObj.actual_tot_deposit_credit.value="";
	formObj.actual_tot_chk_debit.value="";
	formObj.ending_book_bal.value="";
	formObj.diff_amt.value="";
	
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    
	sheetObj.RemoveAll();
	sheetObj2.RemoveAll();
	sheetObj3.RemoveAll();
	
	formObj.sheet2_total_cnt.value="";
	formObj.sheet2_total_amt.value="";
	formObj.sheet3_total_cnt.value="";
	formObj.sheet3_total_amt.value="";

	// formObj.s_strdt.readOnly = false;
	// formObj.s_enddt.readOnly = false;
}
//Calendar flag value
var firCalFlag=false;

function funcPrint() {
	
	if (SEARCH_DTL1_YN != "Y" && SEARCH_DTL2_YN != "Y") return;
	
	var formObj=document.frm1;
	
	formObj.file_name.value='bank_reconciliation.mrd';
	formObj.title.value='Bank Reconciliation';
	//Parameter Setting
	var param='';
	param += '[' + formObj.f_ofc_nm.value + ']';
	param += '[' + formObj.s_bank_cd[formObj.s_bank_cd.selectedIndex].text + ']';
	param += '[' + formObj.s_strdt.value.replaceAll("-","/") + ']';
	param += '[' + formObj.s_enddt.value.replaceAll("-","/") + ']';
	param += '[' + formObj.f_usr_nm.value + ']';
	param += '[' + formObj.begin_stat_bal.value + ']';
	param += '[' + formObj.begin_tot_deposit_credit.value + ']';
	param += '[' + formObj.begin_tot_check_debit.value + ']';
	param += '[' + formObj.ending_stat_bal.value + ']';
	param += '[' + formObj.ending_deposit_credit.value + ']';
	param += '[' + formObj.ending_chk_debit.value + ']';
	param += '[' + formObj.actual_ending_bal.value + ']';
	param += '[' + formObj.actual_begin_book_bal.value + ']';
	param += '[' + formObj.actual_tot_deposit_credit.value + ']';
	param += '[' + formObj.actual_tot_chk_debit.value + ']';
	param += '[' + formObj.ending_book_bal.value + ']';
	param += '[' + formObj.diff_amt.value + ']';
	/*
	param += '[' + removeComma(formObj.begin_stat_bal.value) + ']';
	param += '[' + removeComma(formObj.begin_tot_deposit_credit.value) + ']';
	param += '[' + removeComma(formObj.begin_tot_check_debit.value) + ']';
	param += '[' + removeComma(formObj.ending_stat_bal.value) + ']';
	param += '[' + removeComma(formObj.ending_deposit_credit.value) + ']';
	param += '[' + removeComma(formObj.ending_chk_debit.value) + ']';
	param += '[' + removeComma(formObj.actual_ending_bal.value) + ']';
	param += '[' + removeComma(formObj.actual_begin_book_bal.value) + ']';
	param += '[' + removeComma(formObj.actual_tot_deposit_credit.value) + ']';
	param += '[' + removeComma(formObj.actual_tot_chk_debit.value) + ']';
	param += '[' + removeComma(formObj.ending_book_bal.value) + ']';
	param += '[' + removeComma(formObj.diff_amt.value) + ']';
	*/
	param += '[' + "popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);" + ']';
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	
	PRINT_YN = "N";
}