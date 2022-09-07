//=========================================================
//*@FileName   : ACC_JOR_0300.jsp
//*@FileTitle  : Tax Bill Deposit Journal List
//*@Description: Tax Bill Deposit Journal List
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2012/01/18
//*@since      : 2012/01/18
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/25
//*@since      : 2014/07/25
//=========================================================
var FROMDATE;
var TODAY;
var ENDDATE;
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
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            docObjects[0].DoSearch("./ACC_JOR_0300GS.clt", FormQueryString(formObj) );
       break;
	   case "NEW":
			var paramStr="./ACC_JOR_0200.clt?f_cmd=-1";
		    parent.mkNewFrame('Tax Bill Deposit (Korea)', paramStr);
	   break;   
       case "ROWADD":
    	   var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":	//수정
		   frm1.f_cmd.value=MODIFY;
		   var chk_cnt=0;
		   for(var i=1; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   chk_cnt += 1;
			   }
		   }
		   if(chk_cnt == 0){
			   //No Save Data!!
			   return;
		   }
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   sheetObj.DoSave("ACC_JOR_0300GS.clt", FormQueryString(formObj),"ibflag",false);
           }
           break;
       case "DELETE":	//삭제
    	   frm1.f_cmd.value=REMOVE;
    	   var chk_cnt=0;
		   for(var i=1; i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i ,"check_flag") == "1"){
				   chk_cnt += 1;
			   }
		   }
		   if(chk_cnt == 0){
			   //No Delete Data!!
			   return;
		   }
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   sheetObj.DoSave("ACC_JOR_0300GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_rcv_from_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
        case "GOLOCAL":	//LOCAL INVOICE 화면호출
            var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/R Entry', paramStr);
        break;
        case "GOCRDB":	//CR/DB Note 화면호출
            var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('DC Note Entry', paramStr);
        break;
        case "GOAP":	//Account Payable 화면호출
            var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/P Entry(Cost)', paramStr);
        break;
        case "PRINT":
        	var chkCnt=0;
        	for(var i=1; i<=sheetObj.LastRow();i++){
        		if(sheetObj.GetCellValue(i, "check_flag") == "1"){
        			chkCnt += 1;
        		}
        	}
        	if(chkCnt == 1){
        		var inv_no=formObj.f_inv_no.value;
    			var print_type=formObj.f_print_type.value;
    			if(print_type == "A/P"){
        			//Can not print[Account Payable]
    				alert(getLabel('ACC_COM_ALT001') + "\n\n: ACC_JOR_0300.137");
        			return;
        		}
    			var reqParam='?f_inv_no='+ inv_no+'&f_print_type=' + print_type;
    			popGET('ACC_INV_0050.clt'+reqParam, '', 390, 250, "scroll:yes;status:no;help:no;");
        	}
        	else if(chkCnt == 0){
        		//Please select the row to print.
        		alert(getLabel('FMS_COM_ALT004') + "\n\n: ACC_JOR_0300.147");
        		return;
        	}
        	else{
        		//Please select one row.
        		alert(getLabel('FMS_COM_ALT003') + "\n\n: ACC_JOR_0300.153");
        		return;
        	}
        	break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
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
		formObj.s_rcv_from_cd.value=rtnValAry[0];//full_nm
		formObj.s_rcv_from_nm.value=rtnValAry[2];//full_nm
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
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid" );
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
//	if(btn_role == "Y"){
//    	deleteBtn1.style.display="inline";
//    	deleteBtn2.style.display="inline";
//    }else{
//    	deleteBtn1.style.display="none";
//    	deleteBtn2.style.display="none";
//    }
}
function RestoreGrid() {
	//doWork("SEARCHLIST");
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
             var headers = [ { Text:getLabel('ACC_JOR_0020_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"magam_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"rcvd_fm_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"bank_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"AutoSum",   Hidden:0, Width:110,  Align:"Right",   ColMerge:1,   SaveName:"amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);

             SetEditable(1);
             //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "clr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "void_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(500);
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
	for(var i=1; i<=sheetObj.LastRow();i++){
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
			if(formObj.role_cd.value != "ADM"){
				sheetObj.SetCellEditable(i, "post_dt",0);
				sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			}else{
				sheetObj.SetCellEditable(i, "post_dt",1);
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			}
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		/*
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetRowEditable(i,0);
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			sheetObj.SetCellEditable(i, "check_flag",1);
			sheetObj.SetCellEditable(i, "post_dt",1);
		}
		*/
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
			if(formObj.role_cd.value != "ADM"){
				sheetObj.SetCellEditable(i, "post_dt",0);
				sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			}else{
				sheetObj.SetCellEditable(i, "post_dt",1);
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
			}
			if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetCellValue(i, "magam_flag","Y");
				sheetObj.SetCellFontColor(i, "magam_flag","#FF0000");
			}
		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}	
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
	    case "check_flag" :
			for(var i=1; i<=sheetObj.LastRow();i++){
				if(i == Row){
					if(sheetObj.GetCellValue(i, "check_flag") == "0"){
						sheetObj.SetCellValue(i, "check_flag","0");
					}else{
						sheetObj.SetCellValue(i, "check_flag","1");
					}
				}else{
					if(i != sheetObj.LastRow()){
						sheetObj.SetCellValue(i, "check_flag","0");
					}
				}
			}
		break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var paramStr="./ACC_JOR_0200.clt?f_cmd=-1&s_jnr_no="+sheetObj.GetCellValue(Row, "jnr_no");
	    parent.mkNewFrame('Tax Bill Deposit (Korea)', paramStr);
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			if(formObj.role_cd.value != "ADM"){
				var post_dt=sheetObj.GetCellValue(Row, "post_dt");
				var slip_dt=formObj.slip_post.value;
				slip_dt=slip_dt.substring(4,8)+slip_dt.substring(0,2)+slip_dt.substring(2,4);
				if(slip_dt >= post_dt){
					//Invalid [Posting Date]
					alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0300.535");
					sheetObj.SetCellValue(Row, "post_dt",sheetObj.CellSearchValue(Row, "post_dt"));
					sheetObj.SelectCell(Row, "post_dt");
					sheetObj.SetCellValue(Row, "check_flag","0");
				}else{
					sheetObj.SetCellValue(Row, "check_flag","1");
				}
			}else{
				sheetObj.SetCellValue(Row, "check_flag","1");
			}
		break;
		case "check_flag" :
//			if(btn_role == "Y"){
//				if(sheetObj.GetCellValue(Row, "clt_cmpl_flg") == "Y" || sheetObj.GetCellValue(Row, "clr_yn") == "Y"){
//	    			deleteBtn1.style.display="none";
//	    			deleteBtn2.style.display="none";
//	    		}else{
//	    			deleteBtn1.style.display="inline";
//	    			deleteBtn2.style.display="inline";
//	    		}
//			}
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
	        cal.select(formObj.s_deposit_strdt, formObj.s_deposit_enddt, 'MM-dd-yyyy');
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
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}
