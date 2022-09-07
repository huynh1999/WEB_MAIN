/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0080.jsp
 *@FileTitle : Accounting Block Maintenance
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	var formObj=document.frm1;
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    
    switch(srcName) {
	    case "SEARCHLIST":
	        formObj.f_cmd.value=SEARCHLIST;
	        if(!chkSearchCmprPrd(true, formObj.s_prd_strdt, formObj.s_prd_enddt)){
    			return;
    		}
	        var s_bl_flg="";
	        var s_bl_oth_flg="N";
    		var s_in_flg="";
    		var s_dp_flg="";
    		var s_in_ga_flg="";
	        //Detail, Summary 선택 option
	        var s_search_opt=document.getElementsByName("s_search_opt"); 
			var search_opt=getRadioVal(s_search_opt);  
			if(search_opt == "bl"){
				if(formObj.s_bl_oe_flg.checked){
					s_bl_flg += "'SO',";
	   			 } 
	   			 if(formObj.s_bl_oi_flg.checked){
	   				s_bl_flg += "'SI',";
	   			 }
	   			 if(formObj.s_bl_ae_flg.checked){
	   				s_bl_flg += "'AO',";
	   			 }
	   			 if(formObj.s_bl_ai_flg.checked){
	   				s_bl_flg += "'AI',";
	   			 }
	   			 if(formObj.s_bl_ot_flg.checked){
	   				s_bl_oth_flg="Y";
	   			 }
	   			 if(s_bl_flg != ""){
	   				s_bl_flg=s_bl_flg.substr(0,(s_bl_flg.length)-1);
	   			 }else{
	   				 if(s_bl_oth_flg == "N"){
	   					alert(getLabel('ACC_MSG120'));	
		   				return;
	   				 }
	   			 }
	   			formObj.s_bl_oth_flg.value=s_bl_oth_flg;
	   			formObj.s_bl_flg.value=s_bl_flg; 
				formObj.search_opt.value="bl";
 				sheetObj.DoSearch("./ACC_SLP_0080GS.clt", FormQueryString(formObj) );
			}else if(search_opt == "in"){
				 if(formObj.s_inv_ar_flg.checked){
					s_in_flg += "'S',";
	   			 } 
	   			 if(formObj.s_inv_dc_flg.checked){
	   				s_in_flg += "'D', 'C',";
	   			 }
	   			 if(formObj.s_inv_ap_flg.checked){
	   				s_in_flg += "'B',";
	   			 }
	   			 if(formObj.s_inv_ar_ga_flg.checked){
	   				s_in_ga_flg += "'S',";
	   			 }
	   			if(formObj.s_inv_ap_ga_flg.checked){
	   				s_in_ga_flg += "'B',";
	   			 }
	   			if(s_in_flg != ""){
	   				s_in_flg=s_in_flg.substr(0,(s_in_flg.length)-1);
	   			 }
	   			if(s_in_ga_flg != ""){
	   				s_in_ga_flg=s_in_ga_flg.substr(0,(s_in_ga_flg.length)-1);
	   			 }
	   			if(s_in_flg == "" && s_in_ga_flg == ""){
	   				 alert(getLabel('ACC_MSG120'));	
	   				 return;
	   			 }
	   			formObj.s_in_flg.value=s_in_flg;
	   			formObj.s_in_ga_flg.value=s_in_ga_flg;
				formObj.search_opt.value="in";
 				sheetObj2.DoSearch("./ACC_SLP_0081GS.clt", FormQueryString(formObj) );
			}else if(search_opt == "dp"){
				 if(formObj.s_deposit_flg.checked){
					 s_dp_flg += "'D',";
	   			 } 
	   			 if(formObj.s_payment_flg.checked){
	   				s_dp_flg += "'C',";
	   			 }
	   			 if(s_dp_flg != ""){
	   				s_dp_flg=s_dp_flg.substr(0,(s_dp_flg.length)-1);
	   			 }else{
	   				 alert(getLabel('ACC_MSG120'));	
	   				 return;
	   			 }
	   			formObj.s_dp_flg.value=s_dp_flg;
				formObj.search_opt.value="dp";
 				sheetObj3.DoSearch("./ACC_SLP_0082GS.clt", FormQueryString(formObj) );
			}else if(search_opt == "sl"){
	   			
				formObj.search_opt.value = "sl";
				sheetObj4.DoSearch("./ACC_SLP_0083GS.clt", FormQueryString(formObj));
				
			}
	    break;
		case 'SAVE':
			formObj.f_cmd.value=COMMAND01;
			//Detail, Summary 선택 option
	        var s_search_opt=document.getElementsByName("s_search_opt"); 
			var search_opt=getRadioVal(s_search_opt);  
			/** 20140109 LHK, 요구사항 #25092 [ACCT]Accounting Block Maintenance 에서 Block 시 Block Date 설정 로직 변경
			if(formObj.s_block_satus.value == '1' && formObj.s_block_dt.value == ''){
				getLabel('ACC_MSG121');
				return;
			}
			*/
			//Block Data : unBlock Search 이후 Block 처리시만 확인함 
			var prefix="";
			var shtObj="";
			var dtChk=false;
			if(search_opt == "bl"){
				shtObj=sheetObj;
			}else if(search_opt == "in"){
				shtObj=sheetObj2;
			}else if(search_opt == "dp"){
				shtObj=sheetObj3;
			}else if(search_opt == "sl"){
				shtObj 	= sheetObj4;
			}
			/*
			//block 
			if( formObj.s_block_satus.value == 'N'){
				if(checkBlockDate(search_opt, shtObj)){
					return;
				}
			}
			*/
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				if(search_opt == "bl"){
					formObj.search_opt.value="bl";
					sheetObj.DoSave("./ACC_SLP_0080GS.clt", FormQueryString(formObj),"bl_ibflag",false);
				}else if(search_opt == "in"){
					formObj.search_opt.value="in";
					sheetObj2.DoSave("./ACC_SLP_0081GS.clt", FormQueryString(formObj),"in_ibflag",false);
				}else if(search_opt == "dp"){
					formObj.search_opt.value="dp";
					sheetObj3.DoSave("./ACC_SLP_0082GS.clt", FormQueryString(formObj),"dp_ibflag",false);
				}else if(search_opt == "sl"){
					formObj.search_opt.value = "sl";
					sheetObj4.DoSave("./ACC_SLP_0083GS.clt", FormQueryString(formObj),"sl_ibflag",false);
				}
	        }
        break; 
		case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_inv_bill_to_nm.value;
	   		rtnary[2]=window;
	        
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   		
	    break;
		case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_rcvd_fm_nm.value;
	   		rtnary[2]=window;
	        callBackFunc = "CUSTOMER_POPLIST2";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	//OFVFOUR-7110 [STAR MEX] BLOCK MANAGEMENT - INVOICE 검색시 TAX INVOICE NO 칼럼
    var opt_key = "TAX_COL";
	ajaxSendPost(setTaxCol, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	setFromToDtEndPlus(formObj.s_prd_strdt, 90, formObj.s_prd_enddt, 0);
//	formObj.s_block_dt.value = getTodayStr();

	//OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option
	search_opt_sheet();
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
		case 1:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('ACC_SLP_0080_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"bl_blk_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"bl_dept_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"bl_ref_ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"bl_post_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"bl_ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"bl_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"bl_shpr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"bl_cnee_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:170,  Align:"Left",    ColMerge:1,   SaveName:"bl_agent_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_pod_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"bl_vsl_flt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bl_ibflag" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"bl_intg_bl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"bl_oth_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"bl_jn_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"bl_ey_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
						 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"bl_org_post_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
			
			InitColumns(cols);
			SetSheetHeight(445);
			SetEditable(1);
			//InitViewFormat(0, "bl_post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
//			EditDateFormat = "MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정	
			sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
			resizeSheet();
		} 
		break;
		case 2:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			/*OFVFOUR-7140 [STAR MEX] BLOCK MANAGEMENT - SORT FOR INVOICE OPTION*/
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('ACC_SLP_0080_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"in_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"in_blk_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"in_inv_tp",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"in_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"in_post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"in_inv_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             //OFVFOUR-7110 [STAR MEX] BLOCK MANAGEMENT - INVOICE 검색시 TAX INVOICE NO 칼럼
			             {Type:"Text",      Hidden:TAX_COL,  Width:120,  Align:"Center",    ColMerge:1,   SaveName:"in_tax_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"in_bill_to",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"in_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"in_inv_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"in_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"in_mbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"in_hbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"in_oth_ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"in_ibflag" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"in_inv_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"in_jn_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"in_ey_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
						 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"in_org_post_dt", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
						 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"in_intg_bl_seq", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
						 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"in_oth_seq", 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 }];
							
			InitColumns(cols);
			SetSheetHeight(430);
			SetEditable(1);
			//InitViewFormat(0, "in_post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
//			EditDateFormat = "MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정	
			sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		} 	
		break;
		case 3:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('ACC_SLP_0080_HDR3'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dp_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"dp_blk_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dp_jnr_tp",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"dp_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dp_post_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"dp_bank_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:170,  Align:"Center",  ColMerge:1,   SaveName:"dp_chk_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dp_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:130,  Align:"Right",   ColMerge:1,   SaveName:"dp_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"dp_rcvd_fm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dp_ibflag" },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"dp_jnr_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dp_jn_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dp_ey_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
						 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"dp_org_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
			 
			InitColumns(cols);
			SetSheetHeight(450);
			SetEditable(1);
			//InitViewFormat(0, "dp_post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
			//EditDateFormat = "MDY"; 
			sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		} 	
		break;
		case 4:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('ACC_SLP_0080_HDR4'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"sl_blk_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"sl_slip_tp",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sl_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sl_post_dt",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sl_inv_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"sl_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"sl_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:130,  Align:"Right",   ColMerge:1,   SaveName:"sl_g_debit",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:130,  Align:"Right",   ColMerge:1,   SaveName:"sl_g_credit", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"sl_issued_by",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sl_ibflag" },
			             {Type:"Text",      Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"sl_slip_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"sl_jn_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"sl_ey_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
						 {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"sl_org_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
			 
			InitColumns(cols);
			SetSheetHeight(470);
			SetEditable(1);
			//InitViewFormat(0, "sl_post_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
			//InitViewFormat(0, "sl_inv_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
			//EditDateFormat = "MDY"; 
			sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		} 	
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
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
function sheet1_OnSearchEnd(sheetObj, errMsg){
	setBlockList('bl_', sheetObj);
} 
function sheet2_OnSearchEnd(sheetObj, errMsg){
	setBlockList('in_', sheetObj);
}
function sheet3_OnSearchEnd(sheetObj, errMsg){
	setBlockList('dp_', sheetObj);
}
function sheet4_OnSearchEnd(sheetObj, errMsg){
	setBlockList('sl_', sheetObj);
}
//Block 인지 Unblock 으로 조회했는지 여부 저장 및 Block List 에서 journalize 되었거나 end year process 처리된 List 는 수정 불가 처리
function setBlockList(prefix, sheetObj){
	var formObj=document.frm1;
	//조회결과의 block 상태를 Set함, 조회 form 의 combo의 사용자 변경가능성
	formObj.s_block_satus.value=formObj.s_block_yn.value;
	/** 20140109 LHK, 요구사항 #25092 [ACCT]Accounting Block Maintenance 에서 Block 시 Block Date 설정 로직 변경
	 * 
	if(formObj.s_block_satus.value == 'N'){
		blockDtTb.style.display="block";
	}else{
		blockDtTb.style.display="none";
	}
	*/
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, prefix+'jn_flg') == "1" || sheetObj.GetCellValue(i, prefix+'ey_flg') == "1"){
			sheetObj.SetCellEditable(i, prefix+'blk_flg',0);
			sheetObj.SetCellBackColor(i, prefix+'blk_flg',"#EFEBEF");
		}
		
		if(sheetObj.GetCellValue(i, prefix+'blk_flg') != "1" && sheetObj.GetCellValue(i, prefix+'jn_flg') != "1" && sheetObj.GetCellValue(i, prefix+'ey_flg') != "1"){
			sheetObj.SetCellEditable(i, prefix+'post_dt',1);
		}
	}
}
/** 20140109 LHK, 요구사항 #25092 [ACCT]Accounting Block Maintenance 에서 Block 시 Block Date 설정 로직 변경
function checkBlockDate(prefix, sheetObj){
	var formObj=document.frm1;
	var s_block_dt=formObj.s_block_dt.value;
	var result=false;
	for(var i=1;i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, prefix+'_blk_flg') == "1"){
var post_date=sheetObj.GetCellValue(i, prefix+'_post_dt');
			post_date=post_date.substr(4,2) + '-' + post_date.substr(6,2) + '-' + post_date.substr(0,4);
			//post date 은 block date 보다 작거나 같아야 한다. 
			if(compareTwoDate(post_date, s_block_dt)){
				alert(getLabel('ACC_MSG122'));
				result=true;
				break;
			}
		}
	}
	return result;
}
*/
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	saveEndProcess(errMsg);
}
function sheet2_OnSaveEnd(sheetObj, errMsg){
	saveEndProcess(errMsg);
}
function sheet3_OnSaveEnd(sheetObj, errMsg){
	saveEndProcess(errMsg);
}
function sheet4_OnSaveEnd(sheetObj, errMsg){
	saveEndProcess(errMsg);
}
function saveEndProcess(errMsg){
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		showCompleteProcess();
	}
	doWork('SEARCHLIST');
}
function getRadioVal(radioObj){
	var rtnStr="";
	for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked==true)
	   {
		   rtnStr=radioObj[i].value;
	   }
	}
	return rtnStr;
}
function search_opt_sheet(){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var sheetObj4=docObjects[3];

	//OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option
	formObj.s_dt_cd_type.selectedIndex = 0;
	
	var s_search_opt=document.getElementsByName("s_search_opt"); 
	var opt_val=getRadioVal(s_search_opt);
	if(opt_val == "bl"){   
		getObj('mainTable').style.display="block";
		getObj('mainTable2').style.display="none";
		getObj('mainTable3').style.display="none";
		getObj('mainTable4').style.display="none";
		getObj('searchInfo1').style.display="block";
		getObj('searchInfo2').style.display="none";
		getObj('searchInfo3').style.display="none";
		
		//OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option
		formObj.s_dt_cd_type[1].hidden = true;
		formObj.s_dt_cd_type[2].hidden = true;
	}else if(opt_val == "in"){
		getObj('mainTable').style.display="none";
		getObj('mainTable2').style.display="block";
		getObj('mainTable3').style.display="none";
		getObj('mainTable4').style.display="none";
		getObj('searchInfo1').style.display="none";
		getObj('searchInfo2').style.display="block";
		getObj('searchInfo3').style.display="none";
		
		//OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option
		formObj.s_dt_cd_type[1].hidden = false;
		formObj.s_dt_cd_type[2].hidden = true;
	}else if(opt_val == "dp"){
		getObj('mainTable').style.display="none";
		getObj('mainTable2').style.display="none";
		getObj('mainTable3').style.display="block";
		getObj('mainTable4').style.display="none";
		getObj('searchInfo1').style.display="none";
		getObj('searchInfo2').style.display="none";
		getObj('searchInfo3').style.display="block";

		//OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option
		formObj.s_dt_cd_type[1].hidden = true;
		formObj.s_dt_cd_type[2].hidden = false;
	}else if(opt_val == "sl"){
		getObj('mainTable').style.display="none";
		getObj('mainTable2').style.display="none";
		getObj('mainTable3').style.display="none";
		getObj('mainTable4').style.display="block";
		getObj('searchInfo1').style.display="none";
		getObj('searchInfo2').style.display="none";
		getObj('searchInfo3').style.display="none";

		//OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option
		formObj.s_dt_cd_type[1].hidden = false;
		formObj.s_dt_cd_type[2].hidden = true;
	}
}
//Calendar flag value
var firCalFlag=false;
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
            cal.displayType = "date";
            cal.select(formObj.s_prd_strdt, formObj.s_prd_enddt, 'MM-dd-yyyy');
        break;
        /** 20140109 LHK, 요구사항 #25092 [ACCT]Accounting Block Maintenance 에서 Block 시 Block Date 설정 로직 변경
        case 'DATE1':    //달력 조회 팝업 호출      
	    	var cal=new calendarPopup();
	        cal.select(formObj.s_block_dt, 's_block_dt', 'MM-dd-yyyy');
	    break;
	    */
    }
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
				if(CODETYPE=="RCVDFM"){
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
				if(CODETYPE=="RCVDFM"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		if(CODETYPE=="BILLTO"){
			formObj.s_inv_bill_to_cd.value="";//trdp_cd  AS param1
			formObj.s_inv_bill_to_nm.value="";//eng_nm   AS param2
		}
		if(CODETYPE=="RCVDFM"){
			formObj.s_rcvd_fm_cd.value="";//trdp_cd  AS param1
			formObj.s_rcvd_fm_nm.value="";//eng_nm   AS param2
		}
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
				formObj.s_inv_bill_to_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_inv_bill_to_nm.value=masterVals[3];	//eng_nm   AS param2
			}
			if(CODETYPE=="RCVDFM"){
				formObj.s_rcvd_fm_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.s_rcvd_fm_nm.value=masterVals[3];//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_inv_bill_to_cd.value="";//trdp_cd  AS param1
				formObj.s_inv_bill_to_nm.value="";//eng_nm   AS param2
			}
			if(CODETYPE=="RCVDFM"){
				formObj.s_rcvd_fm_cd.value="";//trdp_cd  AS param1
				formObj.s_rcvd_fm_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_inv_bill_to_cd.value=rtnValAry[0];//full_nm
		formObj.s_inv_bill_to_nm.value=rtnValAry[2];//full_nm
	}  
}

function CUSTOMER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_rcvd_fm_cd.value=rtnValAry[0];//full_nm
		formObj.s_rcvd_fm_nm.value=rtnValAry[2];//full_nm
	} 
}

//OFVFOUR-7110 [STAR MEX] BLOCK MANAGEMENT - INVOICE 검색시 TAX INVOICE NO 칼럼
var TAX_COL = "1";
function setTaxCol(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]=="Y" && doc[1]!=undefined ) {
		TAX_COL = "0";
	}
}
 