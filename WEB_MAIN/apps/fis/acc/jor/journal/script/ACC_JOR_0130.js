var FROMDATE;
var TODAY;
var ENDDATE;
var SEARCH_YN;
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "Print":
    	    if(!chkSearchCmprPrd(true, frm1.s_strdt, frm1.s_enddt)){
    			return;
    		} 
    	    if(formObj.bank_check[0].checked){
    	    	formObj.file_name.value='bank_book_balance_01.mrd';
    	    	if(formObj.by_stat_dt.checked){
    	    		formObj.title.value='Bank Balance Summary';
    	    	}else{
    	    		formObj.title.value='Book Balance Summary';
    	    	}
    	    }else if(formObj.bank_check[1].checked){
    	    	formObj.file_name.value='bank_book_balance_02.mrd';
    	    	if(formObj.by_stat_dt.checked){
    	    		formObj.title.value='Bank Balance Summary';
    	    	}else{
    	    		formObj.title.value='Book Balance Summary';
    	    	}
    	    }else if(formObj.bank_check[2].checked){
    	    	formObj.file_name.value='bank_book_balance_03.mrd';
    	    	if(formObj.by_stat_dt.checked){
    	    		formObj.title.value='Bank Balance Detail';
    	    	}else{
    	    		formObj.title.value='Book Balance Detail';
    	    	}
    	    }
    	    var s_strdt=formObj.s_strdt.value.replaceAll("-", "");
    	    var s_enddt=formObj.s_enddt.value.replaceAll("-", "");
    	    s_strdt=s_strdt.substring(4,8) + s_strdt.substring(0,2) + s_strdt.substring(2,4);
			s_enddt=s_enddt.substring(4,8) + s_enddt.substring(0,2) + s_enddt.substring(2,4);
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_ofc_cd.value + ']';											// 1
			param += '[' + s_strdt + ']';															// 2
			param += '[' + s_enddt + ']';															// 3
			if(formObj.by_stat_dt.checked){															// 4
				param += '[Y]';
			}else{
				param += '[N]';
			}
			if(formObj.s_bank_list1[0].selected){													// 5
				param += '[1]';
			}else{
				param += '[2]';
			}
			param += '[' + formObj.s_strdt.value.replaceAll("-", "/") + ']';												// 6
			param += '[' + formObj.s_enddt.value.replaceAll("-", "/") + ']';												// 7
			if(formObj.bank_check[1].checked){
				param += '[' + formObj.s_bank_list2.value + ']';									// 8
				param += '[' + formObj.s_bank_list2[formObj.s_bank_list2.selectedIndex].text + ']'; // 9
			}else if(formObj.bank_check[2].checked){
				param += '[' + formObj.s_bank_list3.value + ']';									// 8
				param += '[' + formObj.s_bank_list3[formObj.s_bank_list3.selectedIndex].text + ']'; // 9
			} else{
				param += '[]';									// 8
				param += '[]'; // 9
			}
			param += '[' + "popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);" + ']'; // 10
			param += '['+formObj.deposit_level.value+']';  // 11
			param += '['+formObj.payment_level.value+']'; // 12
			param += '['+formObj.ofc_cd.value+']'; //13 
			param += '['+formObj.apo_flg.value+']'; // 14
			if(formObj.by_check_no.checked){		   // 15
				param += '[Y]';
			}else{
				param += '[N]';
			}
			formObj.rd_param.value=param;
			
			//alert(formObj.rd_param.value); 
			
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
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
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	ENDDATE=getEndDate(TODAY);
	formObj.s_strdt.value=TODAY;
	formObj.s_enddt.value=TODAY;
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
	        	 // 높이 설정
//        	 SetSheetHeight(0);
        	 (19, 0, 0, true);
        	 var cnt=0;
        	 

        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:"", Align:"Center"} ];
        	 InitHeaders(headers, info);

        	 var cols = [ {Type:"Text",      Hidden:0,  Width:450,  Align:"Left",    ColMerge:1,   SaveName:"begin_stat_bal",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
        	              {Type:"Float",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"debit1_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"credit1_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"debit1_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"credit1_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit2_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit2_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit2_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit2_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit4",                     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit4",                    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit6_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit6_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit6_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit6_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit7_1",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit7_1",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"debit7_2",                   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"credit7_2",                  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",                     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
        	  
        	 InitColumns(cols);
        	 SetVisible(0);
        	 SetEditable(1);
           }                                                      
           break;
     }
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
	var begin_stat_bal=formObj.begin_stat_bal.value;
	var begin_tot_deposit_credit=formObj.begin_tot_deposit_credit.value;
	var begin_tot_check_debit=formObj.begin_tot_check_debit.value;
	formObj.ending_stat_bal.value=begin_stat_bal + begin_tot_deposit_credit - begin_tot_check_debit;	// 3
	formObj.ending_deposit_credit.value=debit4;																// 4-1
	formObj.ending_chk_debit.value=credit4;																// 4-2
	var ending_stat_bal=formObj.ending_stat_bal.value;
	var ending_deposit_credit=formObj.ending_deposit_credit.value;
	var ending_chk_debit=formObj.ending_chk_debit.value;
	formObj.actual_ending_bal.value=ending_stat_bal + ending_deposit_credit - ending_chk_debit;			// 5
	formObj.actual_begin_book_bal.value=debit6_1 - credit6_1 + debit6_2 - credit6_2;							// 6
	formObj.actual_tot_deposit_credit.value=debit7_1 + debit7_2;													// 7-1
	formObj.actual_tot_chk_debit.value=credit7_1 + credit7_2;												// 7-2
	var actual_begin_book_bal=formObj.actual_begin_book_bal.value;
	var actual_tot_deposit_credit=formObj.actual_tot_deposit_credit.value;
	var actual_tot_chk_debit=formObj.actual_tot_chk_debit.value;
	formObj.ending_book_bal.value=actual_begin_book_bal + actual_tot_deposit_credit - actual_tot_chk_debit;	// 8 
	var actual_ending_bal=formObj.actual_ending_bal.value;
	var ending_book_bal=formObj.ending_book_bal.value;
	formObj.diff_amt.value=actual_ending_bal - ending_book_bal;									//9
	formObj.begin_stat_bal.value=doMoneyFmt(formObj.begin_stat_bal.value);
	formObj.begin_tot_deposit_credit.value=doMoneyFmt(formObj.begin_tot_deposit_credit.value);
	formObj.begin_tot_check_debit.value=doMoneyFmt(formObj.begin_tot_check_debit.value);
	formObj.ending_stat_bal.value=doMoneyFmt(formObj.ending_stat_bal.value);
	formObj.ending_deposit_credit.value=doMoneyFmt(formObj.ending_deposit_credit.value);
	formObj.ending_chk_debit.value=doMoneyFmt(formObj.ending_chk_debit.value);
	formObj.actual_ending_bal.value=doMoneyFmt(formObj.actual_ending_bal.value);
	formObj.actual_begin_book_bal.value=doMoneyFmt(formObj.actual_begin_book_bal.value);
	formObj.actual_tot_deposit_credit.value=doMoneyFmt(formObj.actual_tot_deposit_credit.value);
	formObj.actual_tot_chk_debit.value=doMoneyFmt(formObj.actual_tot_chk_debit.value);
	formObj.ending_book_bal.value=doMoneyFmt(formObj.ending_book_bal.value);
	formObj.diff_amt.value=doMoneyFmt(formObj.diff_amt.value);
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
//	        var cal=new calendarPopupFromTo();
//	        cal.displayType="date";
//	        cal.select(formObj.s_strdt, 's_strdt', formObj.s_enddt, 's_enddt', 'MM-dd-yyyy');
	        var cal=new ComCalendarFromTo();
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
function showLayer(){
	var formObj=document.frm1;
	if(formObj.bank_check[0].checked){
		getObj('list_layer1').style.display="inline";
		getObj('list_layer2').style.display="none";
		getObj('list_layer3').style.display="none";
		getObj('chk_layer').style.display="none";
	}else if(formObj.bank_check[1].checked){
		getObj('list_layer1').style.display="none";
		getObj('list_layer2').style.display="inline";
		getObj('list_layer3').style.display="none";
		getObj('chk_layer').style.display="none";
	}else if(formObj.bank_check[2].checked){
		getObj('list_layer1').style.display="none";
		getObj('list_layer2').style.display="none";
		getObj('list_layer3').style.display="inline";
		getObj('chk_layer').style.display="inline";
	}
}
//Calendar flag value
var firCalFlag=false;
