var TODAY;
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
    	case "EXCEL":	//EXCEL Upload
    		//#3275 [CLT] Bank Clear By Excel
    		if('' == formObj.f_bank_seq.value){
    			alert(getLabel('ACC_MSG109'));
    			return;
    		}else{
	    	   	var excelForm=document.getElementsByName("bank_excel_form"+formObj.f_bank_seq.value)[0].value;
	    	   	
	    	   	if(excelForm == "0|0|0"){
	    	   		alert(getLabel('ACC_MSG116'));
	    	   		return;
	    	   	}
	    	   	sheetObj2.LoadExcel({ Mode:"NoHeader",StartRow:"1",ColumnMapping:excelForm});
    		}
        break;
        case "COMMAND01":	//수정
        	//doShowProcess();
        	frm1.f_cmd.value=COMMAND01;
    	   	sheetObj.DoAllSave("./ACC_JOR_0080GS.clt", FormQueryString(formObj));
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
	//LHK, 20131227 Default Bank Set
	formObj.f_bank_seq.value=formObj.dft_rvn_bank.value;
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
	           var headers = [ { Text:getLabel('ACC_JOR_0080_HDR'), Align:"Center"},
	                       { Text:getLabel('ACC_JOR_0080_HDR2'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"bank_dt",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"chk_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"bank_pay_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:280,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Float",     Hidden:0,  Width:200,  Align:"Right",   ColMerge:1,   SaveName:"pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"bank_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"jnr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"jnr_tp",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:120,  Align:"Right",   ColMerge:1,   SaveName:"chk_dupl_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	            
	           InitColumns(cols);
	           SetSheetHeight(400);
	           
	           SetEditable(1);
	           //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           //InitViewFormat(0, "bank_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           resizeSheet();
           }
        	   break;
         case 2:      //IBSheet1 init
        	    with(sheetObj){
        	   SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	           var headers = [ { Text:getLabel('ACC_JOR_0080_HDR3'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"bank_dt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Float",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 } ];
	            
	           InitColumns(cols);
	           
	           SetEditable(1);
	           SetVisible(0);
                 }
            break;           
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

// ADD - UI 개선 
function sheet2_OnLoadExcel(result) {
	var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    if(sheetObj2.RowCount()<= 1){
    	return;
    }
	if(result) {
		frm1.f_cmd.value=SEARCHLIST;
		
		for(var i=1; i <= sheetObj2.LastRow(); i++){
            var cValue = sheetObj2.GetCellValue(i,0);
            
            cValue = cValue.replaceAll("/","-");
            
            if(cValue != ""){
            	cValue = cValue.split("-");
            }else{
            	continue;
            }
            
            if(cValue.length == 3){
            	var mValue, dValue, yValue;
                
            	if(cValue[0].length == 4){ // YYYY-MM-DD 형식
            		mValue = cValue[1];
                    dValue = cValue[2];
                    yValue = cValue[0];
            	} else if (cValue[2].length == 4){ // MM-DD-YYYY 형식
            		mValue = cValue[0];
                    dValue = cValue[1];
                    yValue = cValue[2];
            	}
                 
                 if(mValue.length < 2) mValue = "0" + mValue;
                 if(dValue.length < 2) dValue = "0" + dValue;
                 
                 sheetObj2.SetCellValue(i,0, yValue + "" + mValue +"" + dValue);
                                 
            }else{
            	continue;
            }                    
		}
		
		var sht2=sheetObj2.GetSaveString(true);
		sheetObj.DoSearch("./ACC_JOR_0080GS.clt", FormQueryString(formObj)+'&'+sht2  );
	} else {
		return;
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var clrAmt=0;
	var clrCnt=0;
	var notClrAmt=0;
	var notClrCnt=0;
	var payAmt=0;
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "clr_dt") != ""){
			sheetObj.SetCellBackColor(i, "check_flag","#EAEAEA");
			sheetObj.SetCellValue(i, "check_flag",0);
			sheetObj.SetRowEditable(i,0);
		}else if(sheetObj.GetCellValue(i, "chk_dupl_flg") == "Y" ){
			sheetObj.SetCellBackColor(i, "check_flag","#FFA7A7");
			sheetObj.SetRowEditable(i,0);
		}else if(sheetObj.GetCellValue(i, "bank_pay_amt") != sheetObj.GetCellValue(i, "pay_amt") ){
			sheetObj.SetCellBackColor(i, "check_flag","#FFA7A7");
			sheetObj.SetRowEditable(i,0);
		}else if(sheetObj.GetCellValue(i, "bank_pay_amt") == sheetObj.GetCellValue(i, "pay_amt") ){
			sheetObj.SetCellValue(i, "check_flag",1);
		}
		payAmt=sheetObj.GetCellValue(i, "pay_amt") == "" ? 0 : eval(sheetObj.GetCellValue(i, "pay_amt"))
				if(sheetObj.GetCellValue(i, "clr_dt") != ""){
			clrAmt += payAmt;
			clrCnt += 1;
				}else if(sheetObj.GetCellValue(i, "clr_dt") == "" && payAmt > 0){
			notClrAmt += payAmt;
			notClrCnt += 1;
		}
	}
	formObj.f_not_clr_amt.value=doMoneyFmt(roundXL(notClrAmt,2));
	formObj.f_not_clr_cnt.value=doMoneyFmt(notClrCnt);
	formObj.f_clr_amt.value=doMoneyFmt(roundXL(clrAmt,2));
	formObj.f_clr_cnt.value=doMoneyFmt(clrCnt);
} 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//doHideProcess();
	var formObj=document.frm1;
	//var sheetObj = docObjects[0];
	var clrAmt=0;
	var clrCnt=0;
	var notClrAmt=0;
	var notClrCnt=0;
	var payAmt=0;
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "clr_dt") != ""){
			sheetObj.SetCellBackColor(i, "check_flag","#EAEAEA");
			sheetObj.SetCellValue(i, "check_flag",0);
			sheetObj.SetRowEditable(i,0);
		}else if(sheetObj.GetCellValue(i, "chk_dupl_flg") == "Y" ){
			sheetObj.SetCellBackColor(i, "check_flag","#FFA7A7");
			sheetObj.SetRowEditable(i,0);
		}else if(sheetObj.GetCellValue(i, "bank_pay_amt") != sheetObj.GetCellValue(i, "pay_amt") ){
			sheetObj.SetCellBackColor(i, "check_flag","#FFA7A7");
			sheetObj.SetRowEditable(i,0);
		}else if(sheetObj.GetCellValue(i, "bank_pay_amt") == sheetObj.GetCellValue(i, "pay_amt") ){
			sheetObj.SetCellValue(i, "check_flag",1);
		}
		payAmt=sheetObj.GetCellValue(i, "pay_amt") == "" ? 0 : eval(sheetObj.GetCellValue(i, "pay_amt"))
			if(sheetObj.GetCellValue(i, "clr_dt") != ""){
			clrAmt += payAmt;
			clrCnt += 1;
			}else if(sheetObj.GetCellValue(i, "clr_dt") == "" && payAmt > 0){
			notClrAmt += payAmt;
			notClrCnt += 1;
		}
	}
	formObj.f_not_clr_amt.value=doMoneyFmt(roundXL(notClrAmt,2));
	formObj.f_not_clr_cnt.value=doMoneyFmt(notClrCnt);
	formObj.f_clr_amt.value=doMoneyFmt(roundXL(clrAmt,2));
	formObj.f_clr_cnt.value=doMoneyFmt(clrCnt);
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
} 
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new calendarPopupFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_post_strdt, 's_post_strdt', formObj.s_post_enddt, 's_post_enddt', 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new calendarPopupFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_deposit_strdt, 's_deposit_strdt', formObj.s_deposit_enddt, 's_deposit_enddt', 'MM-dd-yyyy');
        break;
    }
}
/**
달력팝업을 호출한다.
**/
function doDisplay2(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new calendarPopup();
            cal.select(formObj.f_deposit_dt, 'f_deposit_dt', 'MM-dd-yyyy');
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
function setPostDt(){
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
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=ENDDATE;
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
		periodDiv.style.display="none";
		periodDiv2.style.display="inline";
		dcDiv.style.display="inline";
		dcDiv2.style.display="none";
	}else if(formObj.act_radio[1].checked){
		periodDiv.style.display="none";
		periodDiv2.style.display="inline";
		dcDiv.style.display="inline";
		dcDiv2.style.display="none";
	}else if(formObj.act_radio[2].checked){
		periodDiv.style.display="inline";
		periodDiv2.style.display="none";
		dcDiv.style.display="none";
		dcDiv2.style.display="inline";
	}else if(formObj.act_radio[3].checked){
		periodDiv.style.display="inline";
		periodDiv2.style.display="none";
		dcDiv.style.display="none";
		dcDiv2.style.display="inline";
	}
}
//Calendar flag value
var firCalFlag=false;
