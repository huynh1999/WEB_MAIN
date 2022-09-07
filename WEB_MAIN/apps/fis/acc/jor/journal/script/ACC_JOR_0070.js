var TODAY;
var changeValue = "*****";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
    	   if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
    			return;
    		}
    	   /*
    	   //if( formObj.act_radio[0].checked  || formObj.act_radio[1].checked) {
    		   // Deposit, Clear Check 선택시 Bank가 ALL이 아닌지 체크   - 1,2번만 아니면 전부?
    		   if (frm1.s_bank_cd.selectedIndex == 0){
    			   alert(getLabel('FMS_COM_ALT014') + " \n- " + getLabel('ITM_BANK'));
    			   return;
    		   }
    	   */
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            if(formObj.act_radio[0].checked){
            	formObj.act_radio.value="1";
            }else if(formObj.act_radio[1].checked){
            	formObj.act_radio.value="2";
            }else if(formObj.act_radio[2].checked){
            	formObj.act_radio.value="3";
            }else if(formObj.act_radio[3].checked){
            	formObj.act_radio.value="4";
            }/*else if(formObj.act_radio[4].checked){
            	formObj.act_radio.value="5";
            	formObj.s_post_strdt.value=formObj.s_post_strdt2.value;
            	formObj.s_post_enddt.value=formObj.s_post_enddt2.value;
            }*/else{
//            	alert("Please Select [Batch Type]. ");
            	alert(getLabel('FMS_COM_ALT014') + " \n- " + getLabel('FMS_COD_BATTYPE'));
            	return;
            }
            docObjects[0].RemoveAll();
            docObjects[0].DoSearch("./ACC_JOR_0070GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	   var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
    	   // 1.버튼이 눌러 졌는지 체크
    	   /*
    	   if( formObj.act_radio[0].checked  || formObj.act_radio[1].checked) {
    		   // Deposit, Clear Check 선택시 Bank가 ALL이 아닌지 체크    	   
    		   if (frm1.s_bank_cd.selectedIndex == 0){
    			   alert(getLabel('ACC_MSG109'));
    			   return;
    		   }
    	   }
    	   */
    	   
    	   if(formObj.act_radio[0].checked || formObj.act_radio[1].checked){
    		   if (formObj.f_deposit_dt.value == ""){
    			   alert(getLabel('FMS_COM_ALT001') + " \n- " + getLabel('FMS_COD_CLRDT'));
    			   formObj.f_deposit_dt.focus();
    			   return;
    		   }
    	   }
    	   
    	   //#2203 [LBS] Batch Processing Validation 강화
	    	for(var i=1; i<=sheetObj.LastRow();i++){
	    		if(sheetObj.GetCellValue(i, "check_flag") == "1"){
	    			var jnr_no = sheetObj.GetCellValue(i, "jnr_no");
	    			
	    			checkJnr = true;
	    			
	    			var beforeAmt = sheetObj.GetCellValue(i, "amt");
	    			beforeJnrData = "";
	    			
	    			beforeJnrData += sheetObj.GetCellValue(i, "post_dt");
	    			beforeJnrData += sheetObj.GetCellValue(i, "trdp_cd");
	    			//#6003 [StarCluster-Mex, BNX HCM] BANK BATCH PROCESSING ERROR
	    			//beforeJnrData += sheetObj.GetCellValue(i, "trdp_nm");
	    			beforeJnrData += sheetObj.GetCellValue(i, "chk_no");
	    			beforeJnrData += sheetObj.GetCellValue(i, "curr_cd");
	    			beforeJnrData += sheetObj.GetCellValue(i, "items");
	    			beforeJnrData += Number(beforeAmt).toFixed(2);
	    			beforeJnrData += sheetObj.GetCellValue(i, "void_yn");
	    			beforeJnrData += sheetObj.GetCellValue(i, "void_dt");
	    			beforeJnrData += sheetObj.GetCellValue(i, "clr_yn");
	    			beforeJnrData += sheetObj.GetCellValue(i, "clr_dt");
	    			beforeJnrData += sheetObj.GetCellValue(i, "jnr_no");
	    			beforeJnrData += sheetObj.GetCellValue(i, "jnr_tp");
	    			beforeJnrData += sheetObj.GetCellValue(i, "bank_seq");
	    			beforeJnrData += sheetObj.GetCellValue(i, "bank_nm");
	    			beforeJnrData += sheetObj.GetCellValue(i, "p_ofc_cd");
	    			beforeJnrData += sheetObj.GetCellValue(i, "ofc_blck_flg");
	    			
	    			ajaxSendPost(checkJnrChnage, "reqVal", "&goWhere=aj&bcKey=checkJnrChnage&jnr_no="+jnr_no, "./GateServlet.gsl");
	    			
	    			if(!checkJnr){
	    				alert(getLabel('ACC_MSG158'));
	    				sheetObj.SetSelectRow(i);
//	    				sheetObj.SetCellValue(i, "check_flag", "0");
	    				return;
	    			}
	    		}
	    	}
    	
		   frm1.f_cmd.value=MODIFY;
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   // #49105 - [IMPEX] CHECK DEPOSIT REPORT 에서 날짜 설정할때 데이타 제대로 안나옴
        	   // 1. Batch Processing 저장시 Deposit/Clear Date 옆에 Default 를 ''로 입력하지 않은 경우 1로 저장되도록 수정
        	   if(frm1.bat_seq.value == ""){
        		   frm1.bat_seq.value = "1";
        	   }
        	   sheetObj.DoSave("ACC_JOR_0070GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "JNR_HIS":
			var sRow=sheetObj.GetSelectRow();
			if (sRow < 0){
				break;
			} 
	   		if (getStatus(sRow)==false) return false;
			var reqParam='?jnr_no=' + sheetObj.GetCellValue(sRow, "jnr_no");
			reqParam += '&jnr_tp=' + sheetObj.GetCellValue(sRow, "jnr_tp");
			popGET('ACC_JOR_0700.clt'+reqParam, '', 1100, 600, "scroll:yes;status:no;help:no;");
       break;
       case "EXCEL":	//EXCEL DOWN
    	   
			if(sheetObj.RowCount() < 1){//no data	
				ComShowCodeMessage("COM132501");
			}else{
			//   			sheetObj.Down2Excel(-1,false,false,true,'','',false,false,'',false);
				sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
			}
    	   
    	  /* formObj.f_cmd.value=SEARCHLIST01;
    	   var param="(";
    	   var cnt=0;
    	   for(var i=1; i<=sheetObj.LastRow();i++){
    		   if(sheetObj.GetCellValue(i, "check_flag") == "1"){
    			   if(cnt != 0){
    				   param += ",";
    			   }
    			   param += "'";
    			   param += sheetObj.GetCellValue(i, "jnr_no");
    			   param += "'";
    			   cnt++;
    		   }
    	   }
    	   param += ")";
    	   if(param == '()') param="('')"
    	   if(cnt==0){
    		   alert(getLabel('FMS_COM_ALT004'));
    		   return;
    	   }   
    	   formObj.f_param_val.value=param;
    	   docObjects[1].DoSearch("./ACC_JOR_0070_1GS.clt", FormQueryString(formObj) );*/
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
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
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
	formObj.f_deposit_dt.value=TODAY;
	
	var opt_key = "USE_CLEAR_VOID";
	ajaxSendPost(getSysOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
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
           var headers = [ { Text:getLabel('ACC_JOR_0070_HDR'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:350,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"chk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"items",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_tp",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bank_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ofc_blck_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"level",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	// #5772 [ZEN CON] Authorizaiton to remove clear date by Operatin Accounting Role
                  {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);
           SetSheetHeight(500);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetEditable(1);
           //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
           //InitViewFormat(0, "clr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
           //InitViewFormat(0, "void_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
           resizeSheet();
           //#404 PQC★[UNICO] BATCH PROCESSING TO SHOW CHECKED ITEM'S TOTAL COUNT
           sheet1.SetCountFormat('Count : ' + 0 + ' [' + 0 + ' / ' + 0 + ']');
           }

                                             
         break;
         case 2:      //IBSheet1 init
        	    with(sheetObj){
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('ACC_JOR_0070_HDR2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetEditable(1);
           //InitViewFormat(0, "inv_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
           SetVisible(0);
           }

                                               
            break;           
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(formObj.act_radio[0].checked || formObj.act_radio[1].checked){
		if (USE_CLEAR_VOID == "Y"){ //기존 로직 유지
			for(var i=1; i<=sheetObj.LastRow();i++){
				if(sheetObj.GetCellValue(i, "chk_no") == "" ){
					sheetObj.SetCellEditable(i, "check_flag",0);
				}
			}
		}	
	}
	
	setGridOfcBlckFlg();
	// #5772 [ZEN CON] Authorizaiton to remove clear date by Operatin Accounting Role
	setGridAuthorBlckFlg();
	// #404 PQC★[UNICO] BATCH PROCESSING TO SHOW CHECKED ITEM'S TOTAL COUNT
	sheetObj.SetCountFormat('Count : ' + 0 + ' [' + sheetObj.GetSelectRow() + ' / ' + sheetObj.RowCount() + ']');
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	/*
	for(var i=1; i<=sheetObj.LastRow();i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor("check_flag","#FFFFFF");
	}
	*/
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}	
	// #404 PQC★[UNICO] BATCH PROCESSING TO SHOW CHECKED ITEM'S TOTAL COUNT
	sheetObj.SetCountFormat('Count : ' + 0 + ' [' + sheetObj.GetSelectRow() + ' / ' + sheetObj.RowCount() + ']');
	
	//#3168 [CLT] Bank Batch Processing - Deposit 처리 점검
	doWork('SEARCHLIST');
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
	
	// #404 PQC★[UNICO] BATCH PROCESSING TO SHOW CHECKED ITEM'S TOTAL COUNT
	var colSaveNm = sheetObj.ColSaveName(Col);
	var chkRowCnt = sheetObj.CheckedRows('check_flag');
	sheetObj.SetCountFormat('Count : ' + chkRowCnt +' [' + sheetObj.GetSelectRow() + ' / ' + sheetObj.RowCount() + ']');
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
		case "post_dt" :
			sheetObj.SetCellValue(Row, "check_flag","1");
		break;
		case "check_flag" :
			// #404 PQC★[UNICO] BATCH PROCESSING TO SHOW CHECKED ITEM'S TOTAL COUNT
			var chkRowCnt = sheetObj.CheckedRows('check_flag');
			sheetObj.SetCountFormat('Count : ' + chkRowCnt + ' [' + sheetObj.GetSelectRow() + ' / ' + sheetObj.RowCount() + ']');
			break;
	}
if(sheetObj.GetCellValue(Row, "check_flag") == "1"){
		/* 2012-02-24 f_deposit_dt 필수항목제외
		if(formObj.f_deposit_dt.value == ""){
			sheetObj.SetCellValue(Row, "check_flag","0");
//    		alert("Please Input the Deposit/Clear Date in advance!!");
    		alert(getLabel('ACC_MSG35'));
    		formObj.f_deposit_dt.focus();
    		return;
    	}
    	var deptDt=formObj.f_deposit_dt.value.replaceAll("-","");
var postDt=sheetObj.GetCellValue(Row, "post_dt");
    	deptDt=deptDt.substring(4,8) + deptDt.substring(0,2) + deptDt.substring(2,4);
    	if(Number(postDt) > Number(deptDt)){
//    		alert("The Deposit/Clear Date is earlier than Post Date!!");
    		alert(getLabel('ACC_MSG36'));
    		sheetObj.SetCellValue(Row, "check_flag","0");
    	}
    	*/
	}
	//TOTAL 값을 계산한다.
	var pay_amt=0;
	for(var i=1;i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, "check_flag") == "1"){
pay_amt += Number(sheetObj.GetCellValue(i, "amt"));
		}
	}
	formObj.f_pay_amt.value=doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
}
//EXCEL 조회후 EXCEL DOWN
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	if(sheetObj2.RowCount() < 1){//no data	
		ComShowCodeMessage("COM132501");
	}else{
		sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(	sheetObj2), SheetDesign:1,Merge:1 });
	}
} 
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal = new ComCalendarFromTo();
	    	cal.displayType = "date";
        	cal.select(formObj.s_post_strdt,formObj.s_post_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal = new ComCalendarFromTo();
        	cal.displayType = "date";
        	cal.select(formObj.s_deposit_strdt,formObj.s_deposit_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE3':    //달력 조회 팝업 호출      
        	var cal = new ComCalendarFromTo();
        	cal.displayType = "date";
        	cal.select(formObj.s_post_strdt2,formObj.s_post_enddt2, 'MM-dd-yyyy');
	    break;
    }
}
/**
달력팝업을 호출한다.
**/
function doDisplay2(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar(); 
        	cal.select(formObj.f_deposit_dt,  'MM-dd-yyyy');
        break;
    }
}
function searchBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.s_hbl_no.value != "" || formObj.s_mbl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "H"){
					frm1.s_hbl_no.value=rtnArr[1];
				}else if(rtnArr[2] == "M"){
					frm1.s_mbl_no.value=rtnArr[1];
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				frm1.s_hbl_no.value="";
				frm1.s_mbl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.s_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value="";
				frm1.s_inv_no.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
var USE_CLEAR_VOID = "Y";
function getSysOpt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="N") {
			USE_CLEAR_VOID = "N";
		}
	}
}
//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
	frm1.f_terms.value="";
	frm1.f_curr_cd.value="";
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
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_rcv_from_cd.value="";
		formObj.s_rcv_from_cd.value="";
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
			if(CODETYPE =="BILLTO"){
				formObj.s_rcv_from_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_rcv_from_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_rcv_from_cd.value="";//trdp_cd  AS param1
				formObj.s_rcv_from_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
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
function setPostDt(code){
	var formObj=document.frm1;
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
	if (code == 1) {
		formObj.s_post_strdt.value=FROMDATE;
		formObj.s_post_enddt.value=ENDDATE;
	} else if (code == 2){
		formObj.s_post_strdt2.value=FROMDATE;
		formObj.s_post_enddt2.value=ENDDATE;
	}
}
function clearCheck(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	/* 2012-02-24 f_deposit_dt 필수항목제외
	if(TODAY != formObj.f_deposit_dt.value){
		var chkCnt=0;
		for(var i=1; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i, "check_flag") == "1"){
				chkCnt += 1;
			}
			sheetObj.SetCellValue(i, "check_flag","0");
		}
		if(chkCnt > 0){
			//alert("Deposit/Clear Date Changed!! ");
		}
	}
	*/
}
function showHidePeriod(){
	var formObj=document.frm1;
	if(formObj.act_radio[0].checked){
		getObj('periodDiv').style.display="none";
//		periodDiv2.style.display="inline";
		getObj('dcDiv').style.display="inline";
//		dcDiv2.style.display="none";
		getObj('periodDiv3').style.display="inline";
		formObj.s_bank_cd.value = rvn_bank_seq;
	}else if(formObj.act_radio[1].checked){
		getObj('periodDiv').style.display="none";
//		periodDiv2.style.display="inline";
		getObj('dcDiv').style.display="inline";
//		dcDiv2.style.display="none";
		getObj('periodDiv3').style.display="inline";
		formObj.s_bank_cd.value = cost_bank_seq;
	}else if(formObj.act_radio[2].checked){
		getObj('periodDiv').style.display="inline";
//		periodDiv2.style.display="none";
		getObj('dcDiv').style.display="none";
//		dcDiv2.style.display="inline";
		getObj('periodDiv3').style.display="none";
		formObj.s_bank_cd.value = rvn_bank_seq;
	}else if(formObj.act_radio[3].checked){
		getObj('periodDiv').style.display="inline";
//		periodDiv2.style.display="none";
		getObj('dcDiv').style.display="none";
//		dcDiv2.style.display="inline";
		getObj('periodDiv3').style.display="none";
		formObj.s_bank_cd.value = cost_bank_seq;
	}
}
//Calendar flag value
var firCalFlag=false;

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function setGridOfcBlckFlg(){ 
 
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	/*
	 * Deposit Lv2, Payment Lv2 List 화면에서 TB_JNR_MST.LEVEL 이 2 이고 TB_JNR_MST.OFC_BLCK_FLG 가 '2' 인 경우는
		Chk, Date 는 Disable 하고, Check No. 이후 부터 Amount 를 제외하고 모두 ***** 처리 해주세요.
	 */
	var ofc_cd = formObj.ofc_cd.value; 
	var apo_flg =  formObj.apo_flg.value; 
	var deposit_level =  formObj.deposit_level.value; 
	var payment_level =  formObj.payment_level.value; 
	// alert(ofc_cd + " "+apo_flg+" "+sheetObj.LastRow()+" "+deposit_level+" "+payment_level);
 	if (apo_flg == "N"){
		for(var i=1; i<=sheetObj.LastRow();i++){
			var change = false;
			var jnr_tp = sheetObj.GetCellValue(i, "jnr_tp");
			var ofc_blck_flg = sheetObj.GetCellValue(i, "ofc_blck_flg");
			var p_ofc_cd = sheetObj.GetCellValue(i, "p_ofc_cd");
			var level = sheetObj.GetCellValue(i, "level");
			
			
			if (jnr_tp == "D" && deposit_level == "1" && deposit_level < level){ 
				change = true;
			} else 	if (jnr_tp == "C" && payment_level == "1" && payment_level < level){ 
				change = true;
			} else if (jnr_tp == "D" && deposit_level == "2" && deposit_level == level  && ofc_blck_flg >= deposit_level && p_ofc_cd != ofc_cd){ 
				change = true;
			} else if (jnr_tp == "C" && payment_level == "2" && payment_level == level  && ofc_blck_flg >= payment_level && p_ofc_cd != ofc_cd){ 
				change = true;
			} else if (jnr_tp == "D" && deposit_level == "2" && deposit_level < level){ 
				change = true;
			} else if (jnr_tp == "C" && payment_level == "2" && payment_level < level){ 
				change = true;
			} else if (jnr_tp == "D" && deposit_level == "3" && level == "2"  && ofc_blck_flg >= deposit_level && p_ofc_cd != ofc_cd){ 
				change = true;
			} else if (jnr_tp == "C" && payment_level == "3" && level == "2"  && ofc_blck_flg >= payment_level && p_ofc_cd != ofc_cd){ 
				change = true;
			}  else if (jnr_tp == "D" && deposit_level == "3" && level == "3"   && ofc_blck_flg == deposit_level && p_ofc_cd != ofc_cd){ 
				change = true;
			} else if (jnr_tp == "C" && payment_level == "3" && level == "3"  && ofc_blck_flg == payment_level && p_ofc_cd != ofc_cd){ 
				change = true;
			}   
			
		//	 alert(ofc_cd + " "+apo_flg+" "+sheetObj.LastRow()+" deposit_level"+deposit_level+" payment_level"+payment_level+ " level"+level+ " ofc_blck_flg"+ofc_blck_flg+ " p_ofc_cd"+p_ofc_cd+ " ofc_cd "+ofc_cd);
			
			if (change == true){
				sheetObj.SetCellEditable(i, "check_flag",0); 				
				//sheetObj.SetCellValue(i, "post_dt","");
				//sheetObj.SetCellValue(i, "bank_nm",changeValue);				
				//sheetObj.SetCellValue(i, "trdp_cd",changeValue);
				sheetObj.SetCellValue(i, "trdp_nm",changeValue);
				//sheetObj.SetCellValue(i, "chk_no",changeValue);
				//sheetObj.SetCellValue(i, "curr_cd",changeValue);
				//sheetObj.SetCellValue(i, "items",changeValue);
				//sheetObj.SetCellValue(i, "amt",changeValue);
				//sheetObj.SetCellValue(i, "check_flag",""); 
				sheetObj.SetCellValue(i, "ibflag",""); 
			}
		}
 	}

}

 
function getStatus(row){
	var sheetObj=docObjects[0];
	if (sheetObj.GetCellValue(row, "trdp_nm") == changeValue){
		return false;
	}else{
		return true;
	}
}

//#2203 [LBS] Batch Processing Validation 강화
var checkJnr = true;
var beforeJnrData = "";

function checkJnrChnage(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] == beforeJnrData) {
			checkJnr = true;
		}else{
			checkJnr = false;
		}
	}else{
		alert(getLabel('FMS_COM_ERR002'));
		checkJnr = false;
	}
}

// #5772 [ZEN CON] Authorizaiton to remove clear date by Operatin Accounting Role
function setGridAuthorBlckFlg() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var Act_radio_flg = formObj.Act_radio_flg.value;
	if (Act_radio_flg != "Y") {
		if (formObj.act_radio[0].checked || formObj.act_radio[2].checked) {
			for (var i = 1; i <= sheetObj.LastRow(); i++) {
				if (sheetObj.GetCellValue(i, "level") > formObj.deposit_level.value	|| sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y") {
					sheetObj.SetCellEditable(i, "check_flag", 0);
				}
			}
		}
		if (formObj.act_radio[1].checked || formObj.act_radio[3].checked) {
			for (var i = 1; i <= sheetObj.LastRow(); i++) {
				if (sheetObj.GetCellValue(i, "level") > formObj.payment_level.value || sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y") {
					sheetObj.SetCellEditable(i, "check_flag", 0);
				}
			}
		}
	}
}
