/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0010.js
*@FileTitle  : Deposit Journal
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var RE_ISS = false;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	/* #2111 자동완성 기능 추가  */
	//fnSetAutocompleteCallBack('s_cust_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST'); //Customer			

	
	//var opt_key1 = "BANK_GNA_RMK";
	//ajaxSendPost(setDescriptionReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key1, "./GateServlet.gsl");
	
	var opt_key = "USE_CLEAR_VOID";
	ajaxSendPost(setUseClearVoid, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	

	
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
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	var TODAY=month + "-" + date + "-" + year;
	formObj.f_iss_dt.value=TODAY;

	//default currency
	formObj.s_paid_currency.value = "CNY";

	// 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"fnRestoreGridSetEnd");
    
    if(formObj.f_tax_inv_seq.value != ''){
    	if(formObj.f_re_iss.value == "Y"){
    		RE_ISS = true;
    	}
    	doWork('SEARCH_DEAIL');
    }
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   break;
       case "SEARCHLIST":
    	    // 화면일부 클리어

    	    if(!fnSearchChenk()){
    	    	return;
    	    }
    	   
    	    formObj.f_cmd.value=SEARCHLIST;
            //검증로직
    	    docObjects[0].DoSearch("./ACC_INV_0140GS.clt", FormQueryString(formObj) );
    	    break;
       break;
       case "SEARCH_DEAIL" :
    	   formObj.f_cmd.value=SEARCH;
           //검증로직
   	       docObjects[0].DoSearch("./ACC_INV_0140GS.clt", FormQueryString(formObj) );    	   
    	   break;
       case "Save" :
    	   
    	   if(!fnvalChlck()){
    		   return;
    	   }
    	   formObj.f_cmd.value=MODIFY;
    	   docObjects[0].DoAllSave("./ACC_INV_0140GS.clt", FormQueryString(formObj), "ibflag", true);
    	   break;
       
       case "RE_ISS" :
    	   fnEnable();
    	   fn_invSearchfDisabled();
    	   formObj.btnSave.disabled = false;
    	   formObj.btnReIss.disabled = true;
    	   formObj.f_re_iss.value ="Y";
    	   break;
       case "NEW" :
    	   clearAll();
    	   break;
       
       case "PRINT" :
    	   fn_print();
    	   break;

    	   
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_cust_nm.value;
//	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
       case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
	   		rtnary[1]=formObj.f_inv_title.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST2";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	                    
   	   break;
       case "PRINT":
			if(formObj.f_jnr_no.value == ""){
	       		alert(getLabel('ACC_MSG25'));
	       		return;
	       	}
	       	formObj.file_name.value='deposit_journal_01.mrd';
			formObj.title.value='Deposit Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
       break;
 
 	   case "CLEAR":
 		   // #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
 		   if(confirm(getLabel('FMS_COM_CFMNEW'))){
 			   clearAll();
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


function fnRestoreGridSetEnd(){
	var formObj=document.frm1;
	
    //doWork("SEARCHLIST");
}

/**
 * USE_CLEAR_VOID 관린 코드조회
 */

function setUseClearVoid(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "N"){
			//useClearVoid = doc[1];
		}
		
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
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('ACC_INV_0140_HDR_1'), Align:"Center"},
        	                       { Text:getLabel('ACC_INV_0140_HDR_2'), Align:"Center"}];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"CheckBox",  Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1,HeaderCheck:0 },
        	                    {Type:"Text",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"bl_no",          KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",    KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"issued_by_nm",   KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",  ColMerge:1,   SaveName:"inv_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"CheckBox",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	                    {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"paid_currency",     KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",  ColMerge:1,   SaveName:"xch_rt_ut",        KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",  ColMerge:1,   SaveName:"inv_xcrt_sum_amt", KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",  ColMerge:1,   SaveName:"tax_ratio", KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",  ColMerge:1,   SaveName:"tax_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",             KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept_cd",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"bal_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"clr_flag",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"air_sea_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"modi_tms",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"bnd_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"biz_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_xcrt",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"issued_by",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"bl_curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"bl_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"tax_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Text",      Hidden:1,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"dtl_seq",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,    SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
        	              ];
        	        
        	       InitColumns(cols);

        	       SetEditable(1);
              	   SetSheetHeight(390);
        	       //InitViewFormat(0, "inv_post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       //InitViewFormat(0, "inv_dt", 			"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       //InitViewFormat(0, "inv_due_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       //SetColProperty(0 ,"gl_rmk" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       //SetColProperty(0 ,"buy_inv_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       //SetColProperty(0 ,"bl_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       //SetColProperty(0 ,"ref_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
        	       //resizeSheet();
        	       
        	       SetActionMenu("Header Setting Save|Header Setting Reset");
        	       

           }                                                      
           break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:"inv_seq|ibflag2", Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);

             SetEditable(1);
             SetVisible(false);
            }                                                      
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0], 130);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];

	if(sheetObj.GetEtcData("r_type") == "billSearch"){
		fnSetTax();
		fnSumAmt();
	}
	
	if(sheetObj.GetEtcData("r_type") == "entrySearch"){
		fnSumAmtEntry();
		formObj.s_cust_cd.value = sheetObj.GetEtcData("trdp_cd");
		formObj.s_cust_nm.value = sheetObj.GetEtcData("trdp_nm");
		formObj.s_dept.value = sheetObj.GetEtcData("dept_cd");
		formObj.s_paid_currency.value = sheetObj.GetEtcData("paid_currency");
		formObj.f_tax_inv_no.value = sheetObj.GetEtcData("tax_inv_no");
		formObj.f_inv_title.value = sheetObj.GetEtcData("tax_inv_tit");
		formObj.f_iss_dt.value = sheetObj.GetEtcData("iss_dt");
		formObj.f_tax_inv_tp.value = sheetObj.GetEtcData("tax_inv_tp");
		formObj.f_tax_ratio.value = sheetObj.GetEtcData("tax_ratio");
		formObj.f_remark.value = sheetObj.GetEtcData("rmk");
		
		
		if(formObj.f_tax_inv_no.value == null || formObj.f_tax_inv_no.value == ""){
			if (typeof(formObj.btnReIss)!='btnReIss'){
				//formObj.btnReIss.disabled = false;
				formObj.btnSave.disabled = false;
			}
			fnEnable();
			fn_invSearchfDisabled();
		}else{
			if (typeof(formObj.btnReIss)!='btnReIss'){
				formObj.btnReIss.disabled = false;
				formObj.btnSave.disabled = true;
			}			
			fnDisabled();
		}
		
	}
	if(RE_ISS){
		formObj.f_re_iss.value ="Y";
		formObj.btnReIss.disabled = true;
		formObj.btnSave.disabled = false;	
		fnEnable();
		fn_invSearchfDisabled();
	}else{
		formObj.f_re_iss.value ="N";
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		if(sheetObj.GetEtcData("r_tax_inv_seq") != ""){
			formObj.f_tax_inv_seq.value = sheetObj.GetEtcData("r_tax_inv_seq");
			doWork('SEARCH_DEAIL');
		}
		
		//clearAll();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	 if(colStr == "gl_no"){}
}
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	cur_row = row;
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="gl_no" || sheetObj.ColSaveName(col)=="gl_rmk"){

		}
	}
	
}



function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
    	case "chk_flag" :
    		break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			break;
	}
}
function sheet1_OnChange(sheetObj,Row,Col,Value, OldValue){
	var formObj=document.frm1;
	// TODO: 
	switch (sheetObj.ColSaveName(Col)) {
		case "chk_flag" :
			if(sheetObj.GetCellValue(Row, "chk_flag") == 1){
				
				sheetObj.SetCellEditable(Row, "xch_rt_ut",1);
				//sheetObj.SetCellEditable(Row, "inv_xcrt_sum_amt",1);
				
			}else{
				sheetObj.SetCellEditable(Row, "xch_rt_ut",0);
				//sheetObj.SetCellEditable(Row, "inv_xcrt_sum_amt",0);
			}
			//sheetObj.SetRowEditable(Row, 0);
			fn_setRemark(sheetObj);
			fnSumAmt();
			break;
			
		case "xch_rt_ut" :
			var amt = sheetObj.GetCellValue(Row, "xch_rt_ut") * sheetObj.GetCellValue(Row, "inv_sum_amt");
			sheetObj.SetCellValue(Row, "inv_xcrt_sum_amt", amt);
			fnSetTax();
			fnSumAmt();
			fn_setRemark(sheetObj);
			break;
	}
}

/**
 * code name select
 */
function fn_codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(fn_trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(fn_trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
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
function fn_trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.s_cust_nm.value=masterVals[3];		//eng_nm   AS param2
				if(formObj.f_inv_title.value == ""){
					formObj.f_inv_title.value=masterVals[3];
				}
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value="";//trdp_cd  AS param1
				formObj.s_cust_nm.value="";//eng_nm   AS param2
				formObj.f_inv_title.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}


function CUSTOMER_POPLIST(rtnVal){
	var formObj = document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.s_cust_cd.value=rtnValAry[0];		//trdp_cd  AS param1
			formObj.s_cust_nm.value=rtnValAry[2];		//eng_nm   AS param2
			if(formObj.f_inv_title.value == ""){
				formObj.f_inv_title.value=rtnValAry[2];
			}
		} 
 }

//화면 클리어
function clearAll(){
	
	//#1095 [8][Payment Entry] Not display calendar icon when click New button
	doShowProcess();
	var currLocUrl=this.location.href;
	currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
	currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	window.location.href = currLocUrl;
	

}

/********************************************************************************************************************************/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_deposit_dt, 'MM-dd-yyyy');
	        break;
	    case 'DATE2':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_void_dt, 'MM-dd-yyyy');
	        break;
	    case 'DATE3':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_iss_dt, 'MM-dd-yyyy');
	        break;
    }
}





//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}



function fnSetTax(){
	var formObj=document.frm1;
	var val = formObj.f_tax_ratio.value;
	
	var sheetObj=docObjects[0];
	
	var amt;
	for(var i=sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		amt = sheetObj.GetCellValue(i, "inv_xcrt_sum_amt") * (val /100);
		sheetObj.SetCellValue(i, "tax_ratio", val);
		sheetObj.SetCellValue(i, "tax_amt", amt);
	}
	
}

function fnSumAmt(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	var frAmt =0;
	var taxAmt =0;
	var totAmt =0;
	for(var i=sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, "chk_flag")==1){
			frAmt  += Number(sheetObj.GetCellValue(i, "inv_xcrt_sum_amt"));
			taxAmt += Number(sheetObj.GetCellValue(i, "tax_amt"));
		}
	}	
	totAmt = frAmt + taxAmt;
	
	formObj.f_fr_amt.value =frAmt;
	formObj.f_tax_amt.value =taxAmt;
	formObj.f_tot_amt.value =totAmt;
}
function fnSumAmtEntry(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	var frAmt =0;
	var taxAmt =0;
	var totAmt =0;
	for(var i=sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		frAmt  += Number(sheetObj.GetCellValue(i, "inv_xcrt_sum_amt"));
		taxAmt += Number(sheetObj.GetCellValue(i, "tax_amt"));
	}	
	totAmt = frAmt + taxAmt;
	
	formObj.f_fr_amt.value =frAmt;
	formObj.f_tax_amt.value =taxAmt;
	formObj.f_tot_amt.value =totAmt;
}

function fnvalChlck(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	if(formObj.f_tax_ratio.value == "" || formObj.f_tax_ratio.value == null || formObj.f_tax_ratio.value == 0){
/*		alert(getLabel('FMS_COM_ALT007'));
		formObj.f_tax_ratio.focus();
		return false;*/
		formObj.f_tax_ratio.value = 0;
	}
	
	var sRow = sheetObj.FindCheckedRow("chk_flag");
	if(sRow == ''){
		alert(getLabel('FMS_COM_ALT009'));
		return false;
	}
	return true;
}

function fnSearchChenk(){
	var formObj = document.frm1;
	if(formObj.s_cust_cd.value ==''){
		alert(getLabel('FMS_COM_ALT014') + "\n - " + getLabel('FMS_COD_BLTO'));
		return false;
	}
	
	return true;
}

function searchTypeNo(){
	var formObj=document.frm1;
	var deptType = formObj.s_dept.value;
	var noType = formObj.s_type.value;
	
	if(noType == 'REF_NO'){
		if(deptType == 'OE'){ //Ocean Export
			fnOpenPopUp('REF_POPLIST_BLANK', '', "S", "O");
		}else if(deptType == 'OI'){//Ocean Import
			fnOpenPopUp('REF_POPLIST_BLANK', '', "S", "I");
		}else if(deptType == 'AE'){//Air Export
			fnOpenPopUp('REF_POPLIST_BLANK', '', "A", "O");
		}else if(deptType == 'AI'){//Air Import
			fnOpenPopUp('REF_POPLIST_BLANK', '', "A", "I");
		}	
		
	}else if(noType == 'MBL_NO'){
		if(deptType == 'OE'){ //Ocean Export
			fnOpenPopUp('MBL_POPLIST_BLANK', '', "S", "O", '', "M");
		}else if(deptType == 'OI'){//Ocean Import
			fnOpenPopUp('MBL_POPLIST_BLANK', '', "S", "I", '', "M");
		}else if(deptType == 'AE'){//Air Export
			fnOpenPopUp('MBL_POPLIST_BLANK', '', "A", "O", '', "M");
		}else if(deptType == 'AI'){//Air Import
			fnOpenPopUp('MBL_POPLIST_BLANK', '', "A", "I", '', "M");
		}	
		
	}else if(noType == 'HBL_NO'){
		if(deptType == 'OE'){ //Ocean Export
			fnOpenPopUp('HBL_POPLIST', '', "S", "O", '', "H");
		}else if(deptType == 'OI'){//Ocean Import
			fnOpenPopUp('HBL_POPLIST', '', "S", "I", '', "H");
		}else if(deptType == 'AE'){//Air Export
			fnOpenPopUp('HBL_POPLIST', '', "A", "O", '', "H");
		}else if(deptType == 'AI'){//Air Import
			fnOpenPopUp('HBL_POPLIST', '', "A", "I", '', "H");
		}
	}
		
	
}


var cur_curObj;
var cur_airSeaTp;
var cur_bndTp;
var cur_valObj;
var cur_bizTp;
var curObjId="";
function fnOpenPopUp(popName, curObj, airSeaTp, bndTp, valObj, bizTp,cobFlag){
	cur_curObj = curObj;
	cur_airSeaTp = airSeaTp;
	cur_bndTp = bndTp;
	cur_valObj = valObj;
	cur_bizTp = bizTp;
	var formObj=document.frm1;	
	try {
		switch(popName) {
			case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "FN_HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
				break;
			
            case "MBL_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			rtnary[2]="";
	   			rtnary[3]='';
	   			
	   			callBackFunc = "FN_MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
   	        	
			break;				
				
			case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(3);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			rtnary[2]='';
	   			rtnary[3]="";
	   			callBackFunc = "FN_REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;				
	      } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}				
}

function FN_HBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
		formObj.s_type_no.value=rtnValAry[0];//house_bl_no
	}
	
}
function FN_REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_type_no.value=rtnValAry[1];
	}
	
}
function FN_MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_type_no.value=rtnValAry[0];//house_bl_no
	}
}

function fn_setRemark(sheetObj, Row){
	var formObj = document.frm1;
	formObj.f_remark.value ='';
	var rmkVal = '';
	
	for(var i=sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, "chk_flag") == 1){
			if(rmkVal.length > 0 ){
				rmkVal += '  /  ';
			}
						
			var blNo = sheetObj.GetCellValue(i, "bl_no"); 
			var curr = sheetObj.GetCellValue(i, "inv_aply_curr_cd"); 
			if(blNo.length > 0){
				rmkVal += 'B/L No ' +blNo;
				
				if(curr == 'USD'){
					rmkVal += ' USD '+ sheetObj.GetCellText(i, "inv_sum_amt"); 
					rmkVal += ' EX.Rate '+ sheetObj.GetCellValue(i, "xch_rt_ut"); 
				}
				
				formObj.f_remark.value = rmkVal;
			}
		}
	}	
}

function fnEnable(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].readOnly=false;
	  }           
	}	
	
	var collSelect=document.getElementsByTagName("SELECT");   
	for(var i=0; i<collSelect.length; i++){
		collSelect[i].disabled=false;
	}
	
	formObj.billSearch.disabled=false;
	formObj.btnCustomer.disabled=false;
	formObj.btnType.disabled=false;
	formObj.btnCal.disabled=false;
	
	sheetObj.SetEditable(1);	
}
function fnDisabled(){
	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].readOnly=true;
	  }           
	}	
	
	var collSelect=document.getElementsByTagName("SELECT");   
	for(var i=0; i<collSelect.length; i++){
		collSelect[i].disabled=true;
	}
	
	formObj.billSearch.disabled=true;
	formObj.btnCustomer.disabled=true;
	formObj.btnType.disabled=true;
	formObj.btnCal.disabled=true;
	
	sheetObj.SetEditable(0);
	
	formObj.f_re_iss.value ="N";
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
}

function fn_invSearchfDisabled(){
	var formObj=document.frm1;
	formObj.s_cust_cd.readOnly=true;
	formObj.s_cust_nm.readOnly=true;
	formObj.btnCustomer.disabled=true;
	formObj.billSearch.disabled=true;
}

function fn_print(){
	var formObj=document.frm1;
  	formObj.title.value='Tax Invoice';
  	formObj.file_name.value='tax_invoice_01.mrd';
  	
  	//if(formObj.f_tax_inv_seq.value != ''){
  		var param="[" +  formObj.f_tax_inv_seq.value +  ']';					// [1]
  		
  		formObj.rd_param.value=param;
  		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);	
  		
  	//}else{
  		
  	//}
  	
	
}