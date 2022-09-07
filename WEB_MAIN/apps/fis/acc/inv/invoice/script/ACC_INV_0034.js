var FROMDATE;
var TODAY;
var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            docObjects[0].DoSearch("./ACC_INV_0034GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	   var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
		   frm1.f_cmd.value=MODIFY;
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0034GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "DELETE":	//삭제
    	   frm1.f_cmd.value=REMOVE;
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
               formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
        	   sheetObj.DoSave("./ACC_INV_0034GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_bill_to_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   		
     	break;
        case "GOEXP":	//Account Payable 화면호출
            var paramStr="./ACC_INV_0033.clt?f_cmd=-1";
            parent.mkNewFrame('A/P Expense Other Branch', paramStr);
        break;
        case "DEPOSIT":	//DEPOSIT 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	var paramStr="./ACC_JOR_0010.clt?f_cmd=-1&s_inv_no="+sheetObj.GetCellValue(sRow, "inv_no")+"&s_cust_cd="+sheetObj.GetCellValue(sRow, "trdp_cd");
            parent.mkNewFrame('Deposit', paramStr);
        break;
        case "CHECK":	//CHECK 화면호출
        	var sRow=sheetObj.GetSelectRow();
        	var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_inv_no="+sheetObj.GetCellValue(sRow, "vnd_inv_no")+"&s_cust_cd="+sheetObj.GetCellValue(sRow, "trdp_cd");
            parent.mkNewFrame('Payment', paramStr);
        break;
        case "PRINT":
        	/*
        	var chkCnt=0;
        	for(var i=1; i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, "check_flag") == "1"){
        			chkCnt += 1;
        		}
        	}
        	*/
        	if(formObj.f_inv_no.value != ""){
        		var inv_seq=formObj.f_inv_seq.value;
        		var inv_no=formObj.f_inv_no.value;
    			var print_type=formObj.f_print_type.value;
    			var bl_cnt_cd=formObj.f_bl_cnt_cd.value;
    			var ref_ofc_cd=formObj.f_ref_ofc_cd.value;
    			if(print_type == "A/P"){
    				//Account Payable는 인쇄할수 없습니다.
    				alert(getLabel('ACC_COM_ALT001') + "\n\n: ACC_INV_0034.115");
        			return;
        		}
    			var reqParam='?f_inv_no='+ inv_no+'&f_print_type=' + print_type + '&f_inv_seq=' + inv_seq + '&f_bl_cnt_cd=' + bl_cnt_cd + '&f_ref_ofc_cd=' + ref_ofc_cd;
    			popGET('ACC_INV_0050.clt'+reqParam, '', 390, 250, "scroll:yes;status:no;help:no;");
        	}
        	else{
        		//Print할 Row를 선택해 주십시요.
        		alert(getLabel('FMS_COM_ALT004') + "\n\n: ACC_INV_0034.126");
        		return;
        	}
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
	 //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    //오늘일자구하기
    var now=new Date(); 				
    var nxtDt=new Date(Date.parse(now) + 30 * 1000 * 60 * 60 * 24);
    var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
    var year=nxtDt.getFullYear(); 			
    var month=nxtDt.getMonth() + 1;
    var date=nxtDt.getDate(); 	 	
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
    if(btn_role == "Y"){
//    	deleteBtn1.style.display = "inline";
    	//span id 처리 getBtnObj('deleteBtn2').style.display="inline";
    }else{
//    	deleteBtn1.style.display = "none";
    	//span id 처리 getBtnObj('deleteBtn2').style.display="none";
    }
}
function RestoreGrid () {
	doWork("SEARCHLIST");
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
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0034_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vnd_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Int",       Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"over_due",          KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);

             SetEditable(1);
             //InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(450);
           }                                                      
           break;
     }
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
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
		doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<=sheetObj.LastRow();i++){
		/*
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(2,"#FFFFFF");
		*/
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
		doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<=sheetObj.LastRow();i++){
		/*
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(2,"#FFFFFF");
		*/
	}
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//doWork("SEARCHLIST");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.f_inv_seq.value=sheetObj.GetCellValue(Row, "inv_seq");
	formObj.f_inv_no.value=sheetObj.GetCellValue(Row, "inv_no");
	formObj.f_print_type.value=sheetObj.GetCellValue(Row, "inv_tp");
	for(var i=1; i<=sheetObj.LastRow();i++){
		/*
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetColBackColor(0,"#FFFFFF");
			sheetObj.SetColBackColor(2,"#FFFFFF");
		}
		*/
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var paramStr="./ACC_INV_0033.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no");
        parent.mkNewFrame('A/P Expense Other Branch', paramStr);
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			sheetObj.SetCellValue(Row, "check_flag","1");
		break;
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_post_strdt, formObj.s_post_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_inv_strdt, formObj.s_inv_enddt, 'MM-dd-yyyy');
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
	formObj.s_ofc_cd[0].selected=true;
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=ENDDATE;
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
		formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
		formObj.s_bill_to_nm.value="";//eng_nm   AS param2
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
				formObj.s_bill_to_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_bill_to_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_bill_to_cd.value="";//trdp_cd  AS param1
				formObj.s_bill_to_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function addComma(obj){
	obj.value=doMoneyFmt(obj.value);
}
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
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

function CUSTOMER_POPLIST(rtnVal){
		var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_bill_to_cd.value=rtnValAry[0];//full_nm
		formObj.s_bill_to_nm.value=rtnValAry[2];//full_nm
	}
	}
