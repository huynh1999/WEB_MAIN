var TODAY;
var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag=false;
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
    	    if(formObj.dept_chk1.checked){
    	    	formObj.dept_chk1.value="Y";
    	    }
    	    if(formObj.dept_chk2.checked){
    	    	formObj.dept_chk2.value="Y";
    	    }
    	    if(formObj.dept_chk3.checked){
    	    	formObj.dept_chk3.value="Y";
    	    }
    	    formObj.f_cmd.value=SEARCHLIST;
            //검증로직
    	    if(!validationForm()){
          	   return;
            }
    	    docObjects[0].DoSearch("./ACC_JOR_0500GS.clt", FormQueryString(formObj) );
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_cust_nm.value;
	   		rtnary[2]=window;
 	        
 	        callBackFunc = "CUSTOMER_POPLIST";
 	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
       case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	        callBackFunc = "CUSTOMER_POPLIST2";
 	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
   	   break;
       case "CLOSE":
    	   ComClosePopup(); 
  	   break;
       case "APPLY":
    		var retVal="";	
    		
    		if(formObj.f_call_val.value == 'INVGET'){
    			
    			var iCheckRow = sheetObj.CheckedRows("chk_flag");
    			
				if(bf_chk_flag > 0 && iCheckRow > 0){
					retVal += sheetObj.GetCellValue(bf_chk_flag, "buy_inv_no");					// 0
    				retVal += "|";
    				retVal += sheetObj.GetCellValue(bf_chk_flag, "trdp_cd");						// 1
    				retVal += "|";
    				retVal += sheetObj.GetCellValue(bf_chk_flag, "trdp_nm");						// 2
    				
    				retVal += "^@";
				}
    		}
    			
    		if(formObj.f_call_val.value == 'INVADD'){
    			
	    		for(var i=1; i<=sheetObj.LastRow();i++){
	    			if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
	    				retVal += sheetObj.GetCellValue(i, "inv_post_dt");					// 0
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "ofc_cd");						// 1
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_dept_cd");					// 2
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_tp");						// 3
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_aply_curr_cd");				// 4
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_aply_xcrt");				// 5
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_no");						// 6
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "buy_inv_no");					// 7
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_sum_amt");					// 8
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "bal_sum_amt");					// 9
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "gl_no");						// 10
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "gl_rmk");						// 11
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "ref_no");						// 12
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "bl_no");						// 13
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_seq");						// 14
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "trdp_cd");						// 15
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "sell_buy_tp_cd");				// 16
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_dt");						// 17
	    	    		retVal += "|";
	    	    		retVal += sheetObj.GetCellValue(i, "inv_due_dt");					// 18
	    	    		retVal += "|";
	    				retVal += sheetObj.GetCellValue(i, "jnr_desc");					    // 19
	    				retVal += "|";
	    				retVal += sheetObj.GetCellValue(i, "inv_xcrt_sum_amt");				// 20
	    				retVal += "|";
	    				retVal += sheetObj.GetCellValue(i, "inv_xcrt_dt");				// 21
	    				retVal += "|";
	    				retVal += sheetObj.GetCellValue(i, "imp_ref_no");			//22  //OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
	    				retVal += "^@";
	    			}
	    		}
    		}	
    		ComClosePopup(retVal);  
 	   break;
    }
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cust_cd.value=rtnValAry[0];
		formObj.s_cust_nm.value=rtnValAry[2];
	}
 }

function CUSTOMER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
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
	
	var opt_key = "BANK_MULTI_CURR_FLAG";
	ajaxSendPost(setBankMultiCurrFlag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    var formObj=document.frm1;
    var arg=parent.rtnary;
    /*관리자는 office 가 all로 되어 있어야 한다.*/
    setOfficeAllOption(formObj.s_ofc_cd);
    
    //#2981 [STAR CLUSTER] AFTER V450, INVOICE NEW FUNCTION
    formObj.s_cust_cd.value=arg[0];
    
    /*
    if(arg[6] == "C"){
    	formObj.s_inv_no.value=arg[2];
    }else{
    	formObj.s_inv_no.value=arg[1];
    }
	
	formObj.s_v_inv_no.value=arg[2];*/
	
	if(arg[3] == "Y"){
		formObj.dept_chk1.checked=true;
	}else{
		formObj.dept_chk1.checked=false;
	}
	if(arg[4] == "Y"){
		formObj.dept_chk2.checked=true;
	}else{
		formObj.dept_chk2.checked=false;
	}
	if(arg[5] == "Y"){
		formObj.dept_chk3.checked=true;
	}else{
		formObj.dept_chk3.checked=false;
	}
	formObj.f_jnr_tp.value=arg[6];
	//#2981 [STAR CLUSTER] AFTER V450, INVOICE NEW FUNCTION
	formObj.s_cust_nm.value=arg[7];
	formObj.f_curr_cd.value=arg[8];
	formObj.f_post_dt.value=arg[9];
	formObj.f_call_val.value  = arg[10];
	
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	
	if(formObj.s_cust_cd.value != "" || formObj.s_inv_no.value != ""){
    	doWork("SEARCHLIST");
    }
	//OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
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
	 
	var formObj = document.frm1;
	 
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, SortEventMode:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_JOR_0500_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);
             
             var col_datatype_val	= 1;
             if(formObj.f_call_val.value == 'INVGET'){
            	 var col_datatype_val	= 0; 
             }

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1,HeaderCheck:1 },
                    {Type:"Text",      Hidden:col_datatype_val,  Width:170,  Align:"Left",  ColMerge:1,   SaveName:"trdp_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,  Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:71,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_aply_xcrt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:1,  Width:71,   Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
  	                {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_aply_xcrt2",    KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
  	                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:110,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_desc",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0, Width:110,   Align:"Center",  ColMerge:1,   SaveName:"acct_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
                    {Type:"Text",      Hidden:0, Width:110,   Align:"Center",  ColMerge:1,   SaveName:"imp_ref_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             	InitColumns(cols);
             	SetEditable(1);
                //InitViewFormat(0, "inv_post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
                //InitViewFormat(0, "inv_dt", 			"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
                //InitViewFormat(0, "inv_due_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
                SetSheetHeight(300);
                SetHighlightAfterSort(0);
                //OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
                SetActionMenu("Header Setting Save|Header Setting Reset");
                
                if(bank_multi_curr_flag == "Y"){
    	        	SetColHidden("inv_aply_xcrt", 1);
    	        	SetColHidden("inv_xcrt_dt", 0);
    	        	SetColHidden("inv_aply_xcrt2", 0);
    	        	SetColHidden("inv_xcrt_sum_amt", 0);
    	        } else {
    	        	SetColHidden("inv_aply_xcrt", 0);
    	        }
           }                                                      
           break;
     }
}
function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
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
	if(sheetObj.ColSaveName(Col) != "chk_flag"){
		sheetObj.SetCellValue(Row, "chk_flag","1");
	}
	
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#FFFFFF");
		}
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	
	var retVal = "";
	if(formObj.f_call_val.value == 'INVGET'){
		if(sheetObj.ColSaveName(Col) != "chk_flag"){	
		
			retVal += sheetObj.GetCellValue(Row, "buy_inv_no");					// 0
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "trdp_cd");						// 1
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "trdp_nm");						// 2
			
			retVal += "^@";
				
		}
	}
		
	if(formObj.f_call_val.value == 'INVADD'){
		if(sheetObj.ColSaveName(Col) != "chk_flag"){
			retVal += sheetObj.GetCellValue(Row, "inv_post_dt");					// 0
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "ofc_cd");						// 1
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_dept_cd");					// 2
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_tp");						// 3
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_aply_curr_cd");			// 4
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_aply_xcrt");				// 5
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_no");						// 6
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "buy_inv_no");					// 7
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_sum_amt");					// 8
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "bal_sum_amt");					// 9
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "gl_no");						// 10
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "gl_rmk");						// 11
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "ref_no");						// 12
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "bl_no");						// 13
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_seq");						// 14
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "trdp_cd");						// 15
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "sell_buy_tp_cd");				// 16
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_dt");						// 17
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_due_dt");					// 18
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "jnr_desc");					// 19
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_xcrt_sum_amt");				// 20
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "inv_xcrt_dt");				// 21	//#1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경  getCurrency > getCurrencyFinc 변경  -->	
			retVal += "|";
			retVal += sheetObj.GetCellValue(Row, "imp_ref_no");			//22  //OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
			retVal += "^@";
		}
	}	
	ComClosePopup(retVal); 
}
 

var bf_chk_flag = -2;
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {

		case "chk_flag" :
			if (bf_chk_flag	!= Row) {
					if(sheetObj.GetCellValue(Row, 'chk_flag') == '1'){
						if(formObj.f_call_val.value == 'INVGET'){
							sheetObj.SetCellValue(bf_chk_flag, 'chk_flag', '0');
						}
						bf_chk_flag	=	Row;
					}
			}
		break;
	}
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
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_cust_cd.value="";//trdp_cd  AS param1
		formObj.s_cust_nm.value="";//eng_nm   AS param2
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
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_cust_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value="";//trdp_cd  AS param1
				formObj.s_cust_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * GL_CD 관린 코드조회
 */
function getGlRmk(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[0]);
				sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[1]);
			}else{
				sheetObj.SetCellValue(SELECTROW, "gl_no","");
				sheetObj.SetCellValue(SELECTROW, "gl_rmk","");
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * AJAX RETURN
 * GL_RMK 를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.f_inv_seq.value="";
				frm1.s_inv_no.value="";
				clearAll();
				formObj.s_inv_no.focus();
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function setVoidDate(){
	var formObj=document.frm1;
	if(formObj.void_chk.checked){
		formObj.f_void_dt.value=TODAY;
	}else{
		formObj.f_void_dt.value="";
	}
}
function setDepositDate(){
	var formObj=document.frm1;
	if(formObj.deposit_chk.checked){
		formObj.f_deposit_dt.value=TODAY;
	}else{
		formObj.f_deposit_dt.value="";
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
function clearInput(){
	var formObj=document.frm1;
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
	}
}
//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[0];
	var returnFlag=true;
	var delCnt=0;
	for(var i=1; i<=sheetObj.LastRow(); i++){
		if(sheetObj.GetCellValue(i,"del_chk") == "1" && sheetObj.GetCellValue(i,"jnr_no") != ""){
		    delCnt += 1;
	    }
   }
	if(delCnt == sheetObj.RowCount()){
		returnFlag=false;
	}
	return returnFlag
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new ComCalendarFromTo();
	        cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
	    break;
    }
}
function validationForm(){
	if(!chkSearchCmprPrd(false, frm1.f_strdt, frm1.f_enddt)){
		return false;
	}
	return true;
}

var bank_multi_curr_flag = "";

function setBankMultiCurrFlag(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		bank_multi_curr_flag = doc[1];
	} else {
		bank_multi_curr_flag = "";
	}
}

//OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function
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
	 }
}