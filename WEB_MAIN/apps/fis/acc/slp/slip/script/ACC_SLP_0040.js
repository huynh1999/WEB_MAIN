var FROMDATE;
var TODAY;
var ENDDATE;

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
    	
    
	   case "DEFAULT":
	        
	   break;
   
       case "SEARCHLIST":
    	    
    	    if(formObj.s_cust_cd[0].selected){
//    	    	alert("Select Please [Acct. Company]");
    	    	alert(getLabel('ACC_MSG49'));
    	    	formObj.s_cust_cd.focus();
    	    	return;
    	    }
    	    if(formObj.s_curr_cd[0].selected){
//    	    	alert("Select Please [Currency]");
    	    	alert(getLabel('ACC_MSG50'));
    	    	formObj.s_curr_cd.focus();
    	    	return;
    	    }
            formObj.f_cmd.value = SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch4Post("./ACC_SLP_0040GS.clt", FormQueryString(formObj));
            
       break;
       
       case "INTERFACE":	//INTERFACE
           
    	   frm1.f_cmd.value = COMMAND01;
    	   
    	   var cnt = 0;
    	   var proc_flg = "N";
    	   for(var i=2;i<=sheetObj.LastRow;i++){
    		   
    		   if(sheetObj.CellValue(i, "chk_flag") == "1"){
    			   if(sheetObj.CellValue(i, "verify_yn") == ""){
//        			   alert("먼저 Verify 작업을 진행해 주십시요");
        			   alert(getLabel('ACC_MSG63'));
        			   proc_flg = "N";
        			   return;
        		   }else if(sheetObj.CellValue(i, "verify_yn") != "Y"){
//        			   alert("유효하지 않은 Data 입니다. ");
        			   alert(getLabel('ACC_MSG64'));
        			   sheetObj.SelectCell(i, "chk_flag", false);
        			   sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
        			   proc_flg = "N";
        			   return;
        		   }else{
        			   proc_flg = "Y";
        		   }
        		   cnt += 1;
    		   }
    		   
    		   
    	   }
    	   
    	   if(cnt > 0 && proc_flg == "Y"){
    		   if(confirm("회계 Interface를 진행하시겠습니까? ")){
    			   
    			    getObj('blank1').style.display    = "none";
	       	    	getObj('blank2').style.display    = "none";
	       	    	getObj('progress1').style.display = "inline";
	       	    	getObj('progress2').style.display = "inline";
	       	    	getObj('success1').style.display  = "none";
	       	    	getObj('success2').style.display  = "none";
       	    	
            	   sheetObj.DoSave("ACC_SLP_0040GS.clt", FormQueryString(formObj),"ibflag",false);
               }
    	   }else{
//    		   alert("Interface할 데이터가 없습니다. ");
    		   alert(getLabel('ACC_MSG65'));
    		   return;
    	   }
           
           
       break;
       
     	
       case "APPLY":	//환율적용
           
    	   if(formObj.f_curr_cd[0].selected){
//    		   alert("Select Please [Currency]");
    		   alert(getLabel('ACC_MSG50'));
    		   formObj.f_curr_cd.focus();
    		   return;
    	   }
    	   if(formObj.f_xcrt.value == ""){
//    		   alert("Input Please [Ex.Rate]");
    		   alert(getLabel('ACC_MSG66'));
    		   formObj.f_xcrt.focus();
    		   return;
    	   }
    	       	   
    	   var cnt = 0;

    	   for(var i=2;i<=sheetObj.LastRow;i++){
    		   if(sheetObj.CellValue(i, "curr_cd") == formObj.f_curr_cd.value){
    			   sheetObj.CellValue(i, "xcrt") = formObj.f_xcrt.value;
    			   if(formObj.roundChk[0].checked){
    				   sheetObj.CellValue(i, "ttl_debit") 	= Math.round(Number(formObj.f_xcrt.value) * Number(sheetObj.CellValue(i, "debit")));
        			   sheetObj.CellValue(i, "ttl_credit") 	= Math.round(Number(formObj.f_xcrt.value) * Number(sheetObj.CellValue(i, "credit")));
    			   }else{
    				   sheetObj.CellValue(i, "ttl_debit") 	= Math.floor(Number(formObj.f_xcrt.value) * Number(sheetObj.CellValue(i, "debit")));
        			   sheetObj.CellValue(i, "ttl_credit") 	= Math.floor(Number(formObj.f_xcrt.value) * Number(sheetObj.CellValue(i, "credit")));
    			   }
    			   
    			   cnt += 1;
    		   }
    	   }
    	   
    	   var firstRow;
    	   
    	   var fir_slip_no;
    	   var fir_slip_seq
    	   var pre_slip_no;
    	   var nxt_slip_no;
    	   var cur_slip_no;
    	   var debit_amt;
    	   var credit_amt;
    	   
    	   var debit_tot;
    	   var credit_tot;
    	   var diff_tot;
    	   
    	   for(var i=2;i<=sheetObj.LastRow;i++){
    		   // SLIP_NO 단위로 DEBIT의 TOTAL에서 CREDIT의 TOTAL을 뺀후 DEBIT이 큰경우 SEQUENCE 가 1 인 ROW에서 DEBIT - CREDIT의 차액을 뺀다
			   // DIFF = DEBIT_TOT - CREDIT_TOT
			   // DIFF > 0 THEN SEQ 1의 DEBIT_TOT - DIFF로 셋팅
			   // DIFF < 0 THEN SEQ 1의 CREDIT_TOT - DIFF로 셋팅
    		   
    		   if(sheetObj.CellValue(i, "curr_cd") == formObj.f_curr_cd.value){
				   cur_slip_no = sheetObj.CellValue(i, "slip_no");
				   
				   if(i == 2){
					   if(cur_slip_no == sheetObj.CellValue(i+1, "slip_no")){
						   debit_tot  += Number(sheetObj.CellValue(i, "ttl_debit"));
						   credit_tot += Number(sheetObj.CellValue(i, "ttl_credit"));
						   
						   firstRow     = i;
						   fir_slip_no  = sheetObj.CellValue(i, "slip_no");
						   fir_slip_seq = sheetObj.CellValue(i, "slip_seq");
					   }
				   }else{
					   if(cur_slip_no == sheetObj.CellValue(i-1, "slip_no")){
						   debit_tot  += Number(sheetObj.CellValue(i, "ttl_debit"));
						   credit_tot += Number(sheetObj.CellValue(i, "ttl_credit"));
						   
					   }else{
						   
						   diff_tot = debit_tot - credit_tot;
						   
						   if(diff_tot > 0){
							   if(sheetObj.CellValue(firstRow, "ttl_debit") != 0){
								   if(formObj.roundChk[0].checked){
									   sheetObj.CellValue(firstRow, "ttl_debit")  = Math.round( Number(sheetObj.CellValue(firstRow, "ttl_debit")) - diff_tot );
								   }else{
									   sheetObj.CellValue(firstRow, "ttl_debit")  = Math.floor( Number(sheetObj.CellValue(firstRow, "ttl_debit")) - diff_tot );
								   }
								   
								   //sheetObj.CellValue(firstRow, "ttl_credit") = 0;
							   }else if(sheetObj.CellValue(firstRow, "ttl_credit") != 0){
								   if(formObj.roundChk[0].checked){
									   sheetObj.CellValue(firstRow, "ttl_credit") = Math.round( Number(sheetObj.CellValue(firstRow, "ttl_credit")) + diff_tot );
								   }else{
									   sheetObj.CellValue(firstRow, "ttl_credit") = Math.floor( Number(sheetObj.CellValue(firstRow, "ttl_credit")) + diff_tot );
								   }
								   
								   //sheetObj.CellValue(firstRow, "ttl_debit")  = 0;
							   }
							   
						   }
						   
						   if(diff_tot < 0){
							   if(sheetObj.CellValue(firstRow, "ttl_debit") != 0){
								   if(formObj.roundChk[0].checked){
									   sheetObj.CellValue(firstRow, "ttl_debit") = Math.round( Number(sheetObj.CellValue(firstRow, "ttl_debit")) + (diff_tot*-1) );
								   }else{
									   sheetObj.CellValue(firstRow, "ttl_debit") = Math.floor( Number(sheetObj.CellValue(firstRow, "ttl_debit")) + (diff_tot*-1) );
								   }
								   
								   //sheetObj.CellValue(firstRow, "ttl_credit")  = 0;
							   }else if(sheetObj.CellValue(firstRow, "ttl_credit") != 0){
								   if(formObj.roundChk[0].checked){
									   sheetObj.CellValue(firstRow, "ttl_credit") = Math.round( Number(sheetObj.CellValue(firstRow, "ttl_credit")) - (diff_tot*-1) );
								   }else{
									   sheetObj.CellValue(firstRow, "ttl_credit") = Math.floor( Number(sheetObj.CellValue(firstRow, "ttl_credit")) - (diff_tot*-1) );
								   }
								   
								   //sheetObj.CellValue(firstRow, "ttl_debit")  = 0;
							   }
							   
						   }
						   
						   //금액초기화
						   debit_tot  = 0;
						   credit_tot = 0;
						   diff_tot   = 0;
						   
						   
						   if(cur_slip_no == sheetObj.CellValue(i+1, "slip_no")){
							   
							   debit_tot  += Number(sheetObj.CellValue(i, "ttl_debit"));
							   credit_tot += Number(sheetObj.CellValue(i, "ttl_credit"));
							   
							   firstRow     = i;
							   fir_slip_no  = sheetObj.CellValue(i, "slip_no");
							   fir_slip_seq = sheetObj.CellValue(i, "slip_seq");
							   
						   }
					   }
				   }
    		   }
    		   
    	   }
    	   
    	   // cnt 건이 적용되었습니다. 
    	   //alert("[" + cnt + "] " + getLabel('ACC_MSG67'));
   		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
   		showCompleteProcess();
           
       break;
       
       
       
       case "VERIFY":
           
    	   var cnt = 0;
    	   for(var i=2;i<=sheetObj.LastRow;i++){
    		   if(sheetObj.CellValue(i, "acct_gl_no") == "" || sheetObj.CellValue(i, "xcrt") == 0){
    			   sheetObj.RowFontColor(i) = sheetObj.RgbColor(255,0,0);
    			   sheetObj.CellValue(i, "verify_yn") = "N";
    			   cnt += 1;
    		   }else{
    			   sheetObj.RowFontColor(i) = sheetObj.RgbColor(0,0,0);
    			   sheetObj.CellValue(i, "verify_yn") = "Y";
    		   }
    	   }
    	   
    	   if(cnt > 0){
//    		   alert("[" + cnt + "] 건이 유효하지 않습니다. ");
    		   alert("[" + cnt + "] " + getLabel('ACC_MSG68'));
    	   }else{
//    		   alert("모든 데이터가 정상입니다. ");
    		   alert(getLabel('ACC_MSG69'));
    	   }
           
       break;
       
       
       
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
//	   			sheetObj.Down2Excel(-1,false,false,true,'','',false,false,'',false);
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
        
     	
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
var ctlKind = "";
var ctlCol = 0;
var ctlRow = 0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
	doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj = document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }

	//오늘일자구하기
	var now 		= new Date(); 				
	var preDt		= new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	
	var year		= now.getYear(); 			
	var month		= now.getMonth() + 1;
	var date		= now.getDate(); 	
	
	var preyear		= preDt.getYear();
	var premonth	= preDt.getMonth() + 1;
	
	if(month < 10){
		month = "0"+(month);
	}
	
	if(premonth < 10){
		premonth = "0"+(premonth);
	}
	
	if(date < 10){
		date = "0"+date;
	}

	FROMDATE = premonth + "-" + "01" + "-" + preyear;
	TODAY    = month + "-" + date + "-" + year;
		
	//formObj.f_if_dt.value = TODAY;
    
}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
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
	             style.height = 500;
	             
	             //전체 너비 설정
	             SheetWidth = mainTable.clientWidth;
	             // SheetWidth = 400;
	
	             //Host정보 설정[필수][HostIp, Port, PagePath]
	             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	
	             //전체Merge 종류 [선택, Default msNone]
	             MergeSheet = msHeaderOnly;
	
	             //전체Edit 허용 여부 [선택, Default false]
	             Editable = true;
	
	             //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
	             InitRowInfo( 2, 1, 9, 100);
	
	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	             InitColumnInfo(36, 0, 0, true);
	
	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
	             InitHeadMode(true, true, true, true, false,false) ;
	             
	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	             InitHeadRow(0, getLabel('ACC_SLP_0040_HDR1_1'), true);
	             InitHeadRow(1, getLabel('ACC_SLP_0040_HDR1_2'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  	  COL, DATATYPE,  	  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtCheckBox,    40,   daCenter,  true,    "chk_flag",       false,   "",        dfNone,         0,     true,        true,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        50,   daCenter,  true,    "slip_tp",      	false,   "",       	dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        80,   daCenter,  true,    "slip_no",    	false,   "",       	dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,   	    40,   daCenter,  true,    "slip_seq",       false,   "",       	dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        60,   daCenter,  true,    "gl_no",       	false,   "",       	dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,       120,   daLeft,    true,    "gl_rmk",      	false,   "",     	dfNone,    		0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        60,   daCenter,  true,    "acct_gl_no",     false,   "",       	dfNone,    		0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,       120,   daLeft,    true,    "acct_gl_rmk",	false,   "",   		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        80,   daRight,   true,    "debit",  		false,   "",      	dfFloat,    	2,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        80,   daRight,   true,    "credit",    		false,   "",   		dfFloat,    	2,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        60,   daCenter,  true,    "curr_cd",    	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        60,   daRight,   true,    "xcrt",	    	false,   "",  		dfFloat,        4,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        80,   daRight,   true,    "ttl_debit",    	false,   "",  		dfFloat,        2,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        80,   daRight,   true,    "ttl_credit",    	false,   "",  		dfFloat,        2,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,       200,   daLeft,    true,    "slip_desc",    	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        80,   daCenter,  true,    "acct_slip_no",   false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtData,        50,   daCenter,  true,    "acct_slip_seq",  false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHiddenStatus,30,   daCenter,  true,    "ibflag",        	false,   "",       	dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "com_cd",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "com_nm",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "vat_yn",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "ref_seq",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "slip_2nd_tp",  false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        150,  daCenter,  true,    "org_tax_amt",  false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "tax_amt",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "tax_tp",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "corp_no",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "ban_no",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "com_tp",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "acct_dt",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "sell_buy_tp_cd",  false,   "",  	dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "p_ofc_cd",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "ref_no",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "post_dt",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "inv_dt",  		false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             InitDataProperty(0, cnt++,  dtHidden,        50,   daCenter,  true,    "verify_yn",  	false,   "",  		dfNone,         0,     false,       false,			-1,			false,		false,	 "",		true);
	             
	             
           }                                                      
           break;
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	
	/*
	for(var i=1; i<=sheetObj.LastRow;i++){
		
		sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
		sheetObj.ColBackColor(0) = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(1) = sheetObj.RgbColor(255,255,255);
	}
	*/
	
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	
	getObj('blank1').style.display       = "none";
	getObj('blank2').style.display       = "none";
	getObj('progress1').style.display    = "none";
	getObj('progress2').style.display    = "none";
	getObj('success1').style.display     = "inline";
	getObj('success2').style.display     = "inline";
	
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
    switch (sheetObj.ColSaveName(Col)) {
    	
    }
    
    
}


/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
    
	
	
    
}

function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
		case "acct_gl_no" :
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			var gl_no  = sheetObj.CellValue(Row, "acct_gl_no");
			SELECTROW  = Row;
			
			ajaxSendPost(searchGlInfo, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+gl_no, './GateServlet.gsl');
			
		break;
		
		case "chk_flag":
    		if(sheetObj.CellValue(Row, "chk_flag") == "0"){
    			sheetObj.RowBackColor(Row) = sheetObj.RgbColor(255,255,255);
    		}
    	break;
	}
}



function searchGlInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var formObj  = document.frm1;
		
	if(doc[0]=='OK'){
		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			
			sheetObj.CellValue(SELECTROW, "acct_gl_no")   	= rtnArr[0];
			sheetObj.CellValue(SELECTROW, "acct_gl_rmk") 	= rtnArr[1];
			
			
			
		}else{
						
			sheetObj.CellValue(SELECTROW, "acct_gl_no")   	= "";
			sheetObj.CellValue(SELECTROW, "acct_gl_rmk") 	= "";
			
	        
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){

    switch(doWhat){
	    case 'DATE2':    //달력 조회 팝업 호출      
	    	var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.s_inv_strdt, 's_inv_strdt', formObj.s_inv_enddt, 's_inv_enddt', 'MM-dd-yyyy');
	    break;
       
    }
}


//말일구하기
function getEndDate(datestr){
	
	datestr = datestr.replaceAll("-","");
	
    var yy = Number(datestr.substring(4,8));
    var mm = Number(datestr.substring(0,2));
    
    //윤년 검증
    var boundDay = "";
  
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm = "0"+mm
       }
       boundDay = mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm = "0"+mm
          }
          boundDay = mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm = "0"+mm
          }
          boundDay = mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}




//화면 클리어
function clearAll(){
	var sheetObj = docObjects[0];
	var collTxt = document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	    if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		    collTxt[i].value = "";
	    }           
	}
	
	frm1.s_cust_cd[0].selected = true;
	frm1.s_curr_cd[0].selected = true;
	frm1.f_curr_cd[0].selected = true;
	
	frm1.f_if_dt.value = TODAY;
	
	sheetObj.RemoveAll();
}



