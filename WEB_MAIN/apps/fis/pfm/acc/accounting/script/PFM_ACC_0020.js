/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0020.jsp
 *@FileTitle : Agent Statement
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function TRDP_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_agt_trdp_cd.value=rtnValAry[0];//full_nm
		formObj.f_agt_trdp_nm.value=rtnValAry[2];//full_nm
		//formObj.f_filter_by_chk_3.disabled=false;
		chkRptType();
		docObjects[0].RemoveAll();
	}
}
function doWork(srcName){
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    switch(srcName) {
	    case "SEARCHLIST":
	    	if(formObj.f_agt_trdp_cd.value == ""){
	    		//Agent is mandatory field.
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_AGNT'));
	    		formObj.f_agt_trdp_cd.focus();
	    		return;
	    	}
	    	//#433 [LOGIFOCUS] AGENT STATEMENT SEARCH DOESN'T SHOW OTHER FILE'S INVOICES
			if(formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == false &&
					formObj.f_ar_sell_buy_tp_cd.checked == false && formObj.f_ap_sell_buy_tp_cd.checked == false)
			{
				alert(getLabel('FMS_COM_ALT055'));
				formObj.f_debit_sell_buy_tp_cd.focus();
				return;
			}
	        formObj.f_cmd.value=SEARCHLIST;
			formObj.f_dpt_tp.value="";
			formObj.f_date_tp.value="";
			formObj.f_paid_flg.value="";
			formObj.f_locl_rcv_flg.value="";
		  	var deptCd="";
		  	var sellbuyTp="";
		  	if(formObj.f_per_radio[0].checked){
		  		formObj.f_date_tp.value="post";
		  	}else if(formObj.f_per_radio[1].checked){
		  		formObj.f_date_tp.value="etd";
		  	}else if(formObj.f_per_radio[2].checked){
		  		formObj.f_date_tp.value="inv";
		  	}else{
		  		formObj.f_date_tp.value="eta";
		  	}
		  	if(formObj.f_dpt_tp_1.checked){
		  		deptCd += ",'AIM','AIH'";
		  	}
		  	if(formObj.f_dpt_tp_2.checked){
		  		deptCd += ",'AOM','AOH'";
		  	}
		  	if(formObj.f_dpt_tp_3.checked){
		  		deptCd += ",'SIM','SIH'";
		  	}
		  	if(formObj.f_dpt_tp_4.checked){
		  		deptCd += ",'SOM','SOH'";
		  	}
		  	if(formObj.f_dpt_tp_5.checked){
		  		deptCd += ",'OTH'";
		  	}
		  	deptCd=deptCd.substring(1);
		  	if(deptCd == ""){
		  		//Department Type is mandatory field.
		  		alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
		  		return;
		  	}else{
		  		formObj.f_dpt_tp.value=deptCd;
		  	}
		  	//#433 [LOGIFOCUS] AGENT STATEMENT SEARCH DOESN'T SHOW OTHER FILE'S INVOICES
		  	if(formObj.f_debit_sell_buy_tp_cd.checked){
		  		sellbuyTp += ",'D'";
		  	}
		  	if(formObj.f_credit_sell_buy_tp_cd.checked){
		  		sellbuyTp += ",'C'";
		  	}
		  	if(formObj.f_ar_sell_buy_tp_cd.checked){
		  		sellbuyTp += ",'S'";
		  	}
		  	if(formObj.f_ap_sell_buy_tp_cd.checked){
		  		sellbuyTp += ",'B'";
		  	}

		  	sellbuyTp=sellbuyTp.substring(1);
		  	formObj.f_sell_buy_tp.value = sellbuyTp;

		  	if(formObj.f_agt_radio[0].checked){
		  		formObj.f_agt_flg.value="Y";
		  	}else{
		  		formObj.f_agt_flg.value="";
		  	}
		  	if(formObj.f_filter_by_radio[1].checked){
		  		formObj.f_paid_flg.value="O";
		  	}else if(formObj.f_filter_by_radio[2].checked){
		  		formObj.f_paid_flg.value="P";
		  	}
		  	if(formObj.f_filter_by_chk_1.checked == true){
		  		formObj.f_locl_rcv_flg.value="Y";
		  	}
 	    	sheetObj.DoSearch("PFM_ACC_0020_1GS.clt", FormQueryString(formObj) );
	    	break;
		case "Print":
			if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
				return;
			}

			if(formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == false &&
					formObj.f_ar_sell_buy_tp_cd.checked == false && formObj.f_ap_sell_buy_tp_cd.checked == false)
			{
				alert(getLabel('FMS_COM_ALT055'));
				formObj.f_debit_sell_buy_tp_cd.focus();
				return;
			}

			formObj.f_dpt_tp.value="";
			formObj.f_date_tp.value="";
			formObj.f_paid_flg.value="";
			formObj.f_locl_rcv_flg.value="";
		  	var deptCd="";
		  	if(formObj.f_per_radio[0].checked){
		  		formObj.f_date_tp.value="post";
		  	}else if(formObj.f_per_radio[1].checked){
		  		formObj.f_date_tp.value="etd";
		  	}else if(formObj.f_per_radio[2].checked){
		  		formObj.f_date_tp.value="inv";
		  	}else{
		  		formObj.f_date_tp.value="eta";
		  	}
		  	if(formObj.f_dpt_tp_1.checked){
		  		deptCd += ",'AIM','AIH'";
		  	}
		  	if(formObj.f_dpt_tp_2.checked){
		  		deptCd += ",'AOM','AOH'";
		  	}
		  	if(formObj.f_dpt_tp_3.checked){
		  		deptCd += ",'SIM','SIH'";
		  	}
		  	if(formObj.f_dpt_tp_4.checked){
		  		deptCd += ",'SOM','SOH'";
		  	}
		  	if(formObj.f_dpt_tp_5.checked){
		  		deptCd += ",'OTH'";
		  	}
		  	deptCd=deptCd.substring(1);
		  	if(deptCd == ""){
		  		//Department Type is mandatory field.
		  		alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
		  		return;
		  	}else{
		  		formObj.f_dpt_tp.value=deptCd;
		  	}
		  	if(formObj.f_agt_radio[0].checked){
		  		formObj.f_agt_flg.value="Y";
		  	}else{
		  		formObj.f_agt_flg.value="";
		  	}
		  	if(formObj.f_filter_by_radio[1].checked){
		  		formObj.f_paid_flg.value="O";
		  	}else if(formObj.f_filter_by_radio[2].checked){
		  		formObj.f_paid_flg.value="P";
		  	}
		  	if(formObj.f_filter_by_chk_1.checked == true){
		  		formObj.f_locl_rcv_flg.value="Y";
		  	}
		  	printAgentStatement();
	        //formObj.f_cmd.value=SEARCHLIST01;
 	        //sheetObj2.DoSearch("PFM_ACC_0020_2GS.clt", FormQueryString(formObj) );
		break;

		// #48395 - Agent Statement 속도 개선 => 기존 방식
		case "Print2":
			if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
				return;
			}
			formObj.f_dpt_tp.value="";
			formObj.f_date_tp.value="";
			formObj.f_paid_flg.value="";
			formObj.f_locl_rcv_flg.value="";
		  	var deptCd="";
		  	if(formObj.f_per_radio[0].checked){
		  		formObj.f_date_tp.value="post";
		  	}else if(formObj.f_per_radio[1].checked){
		  		formObj.f_date_tp.value="etd";
		  	}else if(formObj.f_per_radio[2].checked){
		  		formObj.f_date_tp.value="inv";
		  	}else{
		  		formObj.f_date_tp.value="eta";
		  	}
		  	if(formObj.f_dpt_tp_1.checked){
		  		deptCd += ",'AIM','AIH'";
		  	}
		  	if(formObj.f_dpt_tp_2.checked){
		  		deptCd += ",'AOM','AOH'";
		  	}
		  	if(formObj.f_dpt_tp_3.checked){
		  		deptCd += ",'SIM','SIH'";
		  	}
		  	if(formObj.f_dpt_tp_4.checked){
		  		deptCd += ",'SOM','SOH'";
		  	}
		  	if(formObj.f_dpt_tp_5.checked){
		  		deptCd += ",'OTH'";
		  	}
		  	deptCd=deptCd.substring(1);
		  	if(deptCd == ""){
		  		//Department Type is mandatory field.
		  		alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
		  		return;
		  	}else{
		  		formObj.f_dpt_tp.value=deptCd;
		  	}
		  	if(formObj.f_agt_radio[0].checked){
		  		formObj.f_agt_flg.value="Y";
		  	}else{
		  		formObj.f_agt_flg.value="";
		  	}
		  	if(formObj.f_filter_by_radio[1].checked){
		  		formObj.f_paid_flg.value="O";
		  	}else if(formObj.f_filter_by_radio[2].checked){
		  		formObj.f_paid_flg.value="P";
		  	}
		  	if(formObj.f_filter_by_chk_1.checked == true){
		  		formObj.f_locl_rcv_flg.value="Y";
		  	}
	        formObj.f_cmd.value=SEARCHLIST01;
 	        sheetObj2.DoSearch("PFM_ACC_0020_2GS.clt", FormQueryString(formObj) );
		break;
		case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			// Agent group ID에 체크되어있으면 검색하지않는다.
			if(formObj.f_agt_radio[1].checked){
				break;
			}

			rtnary=new Array();
			rtnary[0]="1";
//			rtnary[1]=formObj.f_agt_trdp_nm.value;
//			rtnary[2]=window;
//			var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "TRDP_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "TRDP_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			// Agent group ID에 체크되어있으면 검색하지않는다.
			if(formObj.f_agt_radio[1].checked){
				break;
			}

			rtnary=new Array();
			rtnary[0]="1";
			rtnary[1]=formObj.f_agt_trdp_nm.value;
			rtnary[2]=window;
//			var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "TRDP_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "ALL_DPT":
			formObj.f_dpt_tp_1.checked=true;
			formObj.f_dpt_tp_2.checked=true;
			formObj.f_dpt_tp_3.checked=true;
			formObj.f_dpt_tp_4.checked=true;
			formObj.f_dpt_tp_5.checked=true;
		break;
		case "CLEAR_DPT":
			formObj.f_dpt_tp_1.checked=false;
			formObj.f_dpt_tp_2.checked=false;
			formObj.f_dpt_tp_3.checked=false;
			formObj.f_dpt_tp_4.checked=false;
			formObj.f_dpt_tp_5.checked=false;
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
	 
	var opt_key = "AGENT_BL_SPLIT";
	ajaxSendPost(setAgentBlSplitReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	formObj=document.frm1;

    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);

	 formObj.per_strdt.value=getMonthFirstDate(-1);
	 formObj.per_enddt.value=getMonthLastDate(-1);

	 if(formObj.f_sys_ofc_trf_cur_cd.value != ""){
		// formObj.f_curr_cd.value=formObj.f_sys_ofc_trf_cur_cd.value;
	 }
	// #2627 - Changes from Office System Currency to set the local currency based on user's office's local currency information - Thoa.Dien.170928
	 formObj.f_curr_cd.value=formObj.f_usr_ofc_lcl_curr_cd.value;

	 for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }

//	 #447 [STAR CLUSTER] AGENT STATEMENT HEADER/FOOTER HQ OFFICE 정보가 아닌 소속 OFFICE
	 setHeaderFooter();

	 // #4389 Auto Complete 추가
	 //fnSetAutocomplete('f_agt_trdp_nm' , 'LINER_POPLIST', 'agent' , 'O'); //Forwarding Agent
	 fnSetAutocompleteCallBack('f_agt_trdp_nm', 'callBack_AGT_POPLIST', 'LINER_POPLIST'); //Customer
	//[#5775] [SMART SUPPLY CHAIN] Agent statement sort by due date
	 get_fPerRadio(formObj.f_per_radio);
     //OFVFOUR-7479: [SOUTH EAST] Add " As Of " to the date option on the Agent Statement search page 
     dateFieldChange(2);
}


var bl_split;

function setAgentBlSplitReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		bl_split=doc[1];
	} else {
		bl_split="";
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
                 // 높이 설정
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('PFM_ACC_0020_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
			             {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:1,   SaveName:"inv_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"filing_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"imp_ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"bal_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];

			InitColumns(cols);
			SetSheetHeight(241);
			SetEditable(1);
			//InitViewFormat(0, "etd_dt_tm", "MM/dd/yyyy");//날짜 포맷을 월/일/년 으로 설정
			//InitViewFormat(0, "eta_dt_tm", "MM/dd/yyyy");//날짜 포맷을 월/일/년 으로 설정
   //no support[check again]CLT 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정
        }
		break;
		case 2:      //IBSheet1 init
			with (sheetObj) {

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('PFM_ACC_0020_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"acct_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"sell_buy_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"oth_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];

			InitColumns(cols);
			SetVisible(0);
			SetEditable(1);
	    }
		break;
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
    //OFVFOUR-7479: [SOUTH EAST] Add " As Of " to the date option on the Agent Statement search page 
	    case 'DATE11':
	        var cal=new ComCalendar();
	        cal.displayType="date";
	        cal.select(formObj.per_enddt, 'MM-dd-yyyy');
	
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출
//            var cal=new calendarPopupFromTo();
//            cal.displayType="date";
//            cal.select(formObj.per_strdt, 'per_strdt', formObj.per_enddt, 'per_enddt', 'MM-dd-yyyy');
        	 var cal=new ComCalendarFromTo();
        	 cal.displayType="date";
        	 cal.select(formObj.per_strdt,formObj.per_enddt, 'MM-dd-yyyy');

        break;
    }
}
function dateTypeChange(flg){
	var formObj=document.frm1;
	if(flg == "Y"){
		formObj.f_per_chk.disabled=false;
	}else{
		formObj.f_per_chk.checked=false;
		formObj.f_per_chk.disabled=true;
	}
}
/**
* code name select
*/
function codeNameAction(str, obj, tmp){
	CODETYPE=str;
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type=str.substring(0,8);
	if(str == "agt_trdpcode") {
		s_type="trdpcode";
		docObjects[0].RemoveAll();
	}
	if (s_code != "") {
		if (tmp == "onKeyDown") {
 			if (event.keyCode == 13) {
 				ajaxSendPost(trdpCdReq, 'reqVal',
 					'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
 						+ '&s_code=' + s_code, './GateServlet.gsl');
 			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				ajaxSendPost(trdpCdReq, 'reqVal',
					'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
						+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		}
	} else {
		if (CODETYPE == "agt_trdpcode") {
			formObj.f_agt_trdp_cd.value="";// trdp_cd AS param1
			formObj.f_agt_trdp_nm.value="";// eng_nm AS param2
			formObj.f_filter_by_chk_3.disabled=true;
			formObj.f_filter_by_chk_3.checked=false;
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
			var masterVals=doc[1].split('@@^');
			if(CODETYPE =="agt_trdpcode"){
				formObj.f_agt_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_agt_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
				//formObj.f_filter_by_chk_3.disabled=false;
				chkRptType();
			}
		} else {
			if(CODETYPE =="agt_trdpcode"){
				formObj.f_agt_trdp_cd.value="";				//trdp_cd  AS param1
				formObj.f_agt_trdp_nm.value="";				//eng_nm   AS param2
				formObj.f_filter_by_chk_3.disabled=true;
				formObj.f_filter_by_chk_3.checked=false;
			}
		}
 	}else{
 		//alert(getLabel('SEE_BMD_MSG43'));
 	}
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	sheetObj.SetHeaderCheck(0, "chk",0);
	total_amt = 0.00;
	formObj.f_totamt_tot.value =doMoneyFmt(Number(total_amt).toFixed(2));
}
/**
* 조회된 Agent Code(trdp_cd)와 inv_seq를 가지고 Report를 띄움
*/
function sheet2_OnSearchEnd(sheetObj){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=sheetObj;
	var invSeq="";
	//30282
	var blInvSeq="";
	var othInvSeq="";
	if(sheetObj2.SearchRows()> 0){
		var chkInvSeq="";//그리드에서 체크한 프린트하지 않을 Invoice
//		if(formObj.f_agt_trdp_cd.value != "" && sheetObj1.SearchRows()> 0){
		if(formObj.f_agt_trdp_cd.value != "" && sheetObj1.LastRow()> 0){
 			for(var j=1 ; j < sheetObj1.LastRow()+1 ; j++){
			if(sheetObj1.GetCellValue(j, "chk") == "1"){
				chkInvSeq=chkInvSeq + ",'" + sheetObj1.GetCellValue(j, "inv_seq") + "'";
				}
			}
		}
		chkInvSeq=chkInvSeq.substring(1);
		formObj.title.value='Agent Statement';
		var ttlFileName="";
		var ttlParam="";
		var ofcCd=formObj.f_ofc_cd.value;
		//if (ofcCd =="") ofcCd = usrOfcCd;
		var perStrdt=formObj.per_strdt.value.replaceAll("-","");
	  	var perEnddt=formObj.per_enddt.value.replaceAll("-","");
	  	perStrdt=perStrdt.substring(4,8) + perStrdt.substring(0,4);
	  	perEnddt=perEnddt.substring(4,8) + perEnddt.substring(0,4);
	  	var dptTpStr="";
		var dptTp1="";
		var dptTp2="";
		var dptTp3="";
		var dptTp4="";
		var dptTp5="";
		var blOthFlg="";
		if(formObj.f_dpt_tp_1.checked == true){
			dptTpStr += ",AI";
			dptTp1="Y";
			blOthFlg="BL";
		}
		if(formObj.f_dpt_tp_2.checked == true){
			dptTpStr += ",AE";
			dptTp2="Y";
			blOthFlg="BL";
		}
		if(formObj.f_dpt_tp_3.checked == true){
			dptTpStr += ",OI";
			dptTp3="Y";
			blOthFlg="BL";
		}
		if(formObj.f_dpt_tp_4.checked == true){
			dptTpStr += ",OE";
			dptTp4="Y";
			blOthFlg="BL";
		}
		if(formObj.f_dpt_tp_5.checked == true){
			dptTpStr += ",GE";
			dptTp5="Y";
			if(blOthFlg == "BL"){
				blOthFlg="ALL";
			}else{
				blOthFlg="OTH";
			}
		}
		var todayDt=getTodayStr().replaceAll("-","");
		var year=todayDt.substring(4,8);
		var month=todayDt.substring(0,2);
		var day=todayDt.substring(2,4);
		todayDt=mkCharMonthFormat(month) + " " + day + ", " +  year;
		dptTpStr=dptTpStr.substring(1);
		/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 */
		var sell_buy_tp_cd="";
		var sellCnt=0;
		//Agent 별로 Print 될 페이지를 붙임
 		for(var i=1 ; i < sheetObj2.LastRow()+1 ; i++){
			if( sheetObj1.LastRow() + 1 ==1){
				invSeq=invSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
				//30282
				if (sheetObj.GetCellValue(i, "intg_bl_seq") != "") {
					blInvSeq=blInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
				} else {
					othInvSeq=othInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
				}
			}else if( chkInvSeq.indexOf( sheetObj2.GetCellValue(i, "inv_seq")) >= 0){
				invSeq=invSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
				//30282
				if (sheetObj.GetCellValue(i, "intg_bl_seq") != "") {
					blInvSeq=blInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
				} else {
					othInvSeq=othInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
				}
			}else{
				//break;
			}
			/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 */
			sell_buy_tp_cd=sheetObj2.GetCellValue(i, "sell_buy_tp_cd");
			//alert(sell_buy_tp_cd);
			//alert(chkInvSeq)
			if(sheetObj2.GetCellValue(i, "trdp_cd") != sheetObj2.GetCellValue(i-1, "trdp_cd")
			|| sheetObj2.GetCellValue(i, "curr_cd") != sheetObj2.GetCellValue(i-1, "curr_cd")){
				//Parameter Setting
				var param="";
				param += "[" + ofcCd + "]";													//[1]
				if(formObj.f_by_bill_to.checked == true){
					param += "[Y]";															//[2]
				}else{
					param += "[]";															//[2]
				}
				param += "[" + sheetObj2.GetCellValue(i, "trdp_cd") + "]";						//[3]
				param += "[" + chkInvSeq + "]";												//[4]
				param += formObj.f_per_radio[0].checked == true ? "[Y]" : "[]";				//[5]
				param += formObj.f_per_radio[1].checked == true ? "[Y]" : "[]";				//[6]
				param += formObj.f_per_radio[2].checked == true ? "[Y]" : "[]";				//[7]
				param += formObj.f_per_radio[3].checked == true ? "[Y]" : "[]";				//[8]
				param += formObj.f_per_chk.checked == true ? "[Y]" : "[]";					//[9]
				param += "[" + perStrdt + "]";												//[10]
				param += "[" + perEnddt + "]";												//[11]
				param += "[" + sheetObj2.GetCellValue(i, "curr_cd") + "]";						//[12]
				param += '[' + dptTp1 + ']';												//[13]
				param += '[' + dptTp2 + ']';												//[14]
				param += '[' + dptTp3 + ']';												//[15]
				param += '[' + dptTp4 + ']';												//[16]
				param += '[' + dptTp5 + ']';												//[17]
				param += '[' + dptTpStr + ']';												//[18]
				param += formObj.f_filter_by_radio[0].checked == true ? "[Y]" : "[]";		//[19]
				param += formObj.f_filter_by_radio[1].checked == true ? "[Y]" : "[]";		//[20]
				param += formObj.f_filter_by_radio[2].checked == true ? "[Y]" : "[]";		//[21]
				param += formObj.f_filter_by_chk_1.checked == true ? "[Y]" : "[]";			//[22]
				param += formObj.f_filter_by_chk_2.checked == true ? "[Y]" : "[]";			//[23]
				param += formObj.f_filter_by_chk_3.checked == true ? "[Y]" : "[]";			//[24]
				param += formObj.f_filter_by_chk_4.checked == true ? "[Y]" : "[]";			//[25]
				param += '[' + todayDt + ']';												//[26]
				param += '[' + formObj.f_sys_ofc_agent_stmt_rmk.value + ']';				//[27]
				param += '[' + usrPhn + ']';												//[28]
				param += '[' + usrFax + ']';												//[29]
				param += '[' + usrEml + ']';												//[30]
				param += '[' + usrOfcCd + ']';							//[31]
				if(formObj.f_agt_flg.value == "Y"){
					param += '[Y]';															//[32]
				}else{
					if(sheetObj2.GetCellValue(i, "acct_cd") == ""){
						param += '[Y]';														//[32]
					}else{
						param += '[]';														//[32]
					}
				}
				param += '[' + sheetObj2.GetCellValue(i, "acct_cd") + ']';						//[33]
				/* #20641 : [BINEX]Agent Statement jsjang 2013.9.9 imp_ref_no add */
				//param += formObj.f_debit_sell_buy_tp_cd.checked == true ? "[Y]" : "[]";		//[34]
				//param += formObj.f_credit_sell_buy_tp_cd.checked == true ? "[Y]" : "[]";	//[35]
				//[34]
				if(formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == true)
				{
						param += '[Y]';
				}else{
						param += '[]';
				}
				//[35]
				if(formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == false)
				{
						param += '[Y]';
				}else{
						param += '[]';
				}
				//[36]
				if(formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == true)
				{
						param += '[Y]';
				}else{
						param += '[]';
				}
				//[37 User ID]
				param += '[' + usrId + ']';
				/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 */
				if((formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == true)
						|| (formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == false && sell_buy_tp_cd == 'D')
						|| (formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == true && sell_buy_tp_cd == 'C'))
				{
					ttlParam += "^@@^" + param;
					ttlFileName += "^@@^" + "agent_statement_01_backup.mrd";
					sellCnt++;
				}else if(formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == false)
				{
					alert(getLabel('FMS_COM_ALT055'));
					formObj.f_debit_sell_buy_tp_cd.focus();
					return;
				}
			}
		}
		/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 - 해당 sell_buy_tp_cd 의 데이타가 없으면 처리 */
		if(sellCnt == 0)
		{
			alert(getLabel('FMS_COM_ALT054'));
			return;
		}
		invSeq=invSeq.substring(1);
		if (blInvSeq!="") {
			blInvSeq=blInvSeq.substring(1);
		}
		if (othInvSeq!="") {
			othInvSeq=othInvSeq.substring(1);
		}
		//CR/DB Note Report
		if(formObj.f_filter_by_chk_3.checked && invSeq != ""){
			// CR/DR을 Report 뒤에 붙일때는Branch를 선택해야만 한다.
			/*
			if(formObj.f_ofc_cd.value == ""){
				//Branch is mandatory field.
				alert(getLabel('FMS_COM_ALT007')+  "\n" + getLabel('ITM_OFFICE_CD'));	//[20130415 OJG]
				return;
			}
*/
			// CR/DR을 Report 뒤에 붙일때는Department Type을 BL or Other 로만 선택해야만 한다.
			/*
			# 30282 - [BINEX]Agent Statement - Invoice Attach 옵션
			- Agent Statement 화면에서 "Attached CR/DR Note(s) & Invoice(s)." 옵션을 check 하면 Department 에서 B/L (OI/OE/AI/AE) 와 Other Operation 을 같이 check 할 수 없음
			- Department 를 모두 선택하고 출력 가능하도록 수정
			if(blOthFlg == "ALL"){
				//Please check department type(Only select B/L Type or Other Operation).
				alert(getLabel('PFM_COM_ALT001'));
				return;
			}
			*/
			//var ofcIdx = formObj.f_ofc_cd.selectedIndex;
			//var ofcCntCd = ofcCntArr[ofcIdx];
			if(blOthFlg == "ALL") {
				// 1. BL인 경우
				if (blInvSeq != "") {
					ttlFileName += "^@@^" + "invoice_02_us.mrd";
					var param="";
					if (blInvSeq != "") {
						param += '[' + usrEml + ']';									// [1]
						param += '[' + invSeq + ']';									// [2]
						param += '[]';													// [3]
						param += '[]';													// [4]
						param += '[]';													// [5]
						param += '[]';													// [6]
						param += '[' + ofcCd + 'MAINCMP]';								// [7]
						param += '[' + usrOfcCd + ']';									// [8]
						param += '[' + usrPhn + ']';									// [9]
						param += '[' + usrFax + ']';									// [10]
						param += '[' + usrId + ']';										// [11]
						param += '[' + ']';												// [12]
						param += '[' + ofcLoclNm + ']';									// [13]  user local office name
						ttlParam += "^@@^" + param;
					}
				}
				// 2. OTH일 경우
				if (othInvSeq != "") {
					ttlFileName += "^@@^" + "invoice_07_us.mrd";
					var param="";
					if (othInvSeq != "") {
						param += '[' + usrEml + ']';									// [1]
						param += '[' + invSeq + ']';									// [2]
						param += '[]';													// [3]
						param += '[]';													// [4]
						param += '[]';													// [5]
						param += '[]';													// [6]
						param += '[' + ofcCd + 'MAINCMP]';								// [7]
						param += '[' + usrOfcCd + ']';									// [8]
						param += '[' + usrPhn + ']';									// [9]
						param += '[' + usrFax + ']';									// [10]
						param += '[' + usrId + ']';										// [11]
						param += '[' + ']';												// [12]
						param += '[' + ofcLoclNm + ']';									// [13]  user local office name
						ttlParam += "^@@^" + param;
					}
				}
			} else if(blOthFlg == "OTH"){
				ttlFileName += "^@@^" + "invoice_07_us.mrd";
				var param="";
				param += '[' + usrEml + ']';									// [1]
				param += '[' + invSeq + ']';									// [2]
				param += '[]';													// [3]
				param += '[]';													// [4]
				param += '[]';													// [5]
				param += '[]';													// [6]
				param += '[' + ofcCd + 'MAINCMP]';								// [7]
				param += '[' + usrOfcCd + ']';									// [8]
				param += '[' + usrPhn + ']';									// [9]
				param += '[' + usrFax + ']';									// [10]
				param += '[' + usrId + ']';										// [11]
				param += '[' + ']';												// [12]
				param += '[' + ofcLoclNm + ']';									// [13]  user local office name
				ttlParam += "^@@^" + param;
			}else{
				ttlFileName += "^@@^" + "invoice_02_us.mrd";
				var param="";
				param += '[' + usrEml + ']';									// [1]
				param += '[' + invSeq + ']';									// [2]
				param += '[]';													// [3]
				param += '[]';													// [4]
				param += '[]';													// [5]
				param += '[]';													// [6]
				param += '[' + ofcCd + 'MAINCMP]';								// [7]
				param += '[' + usrOfcCd + ']';									// [8]
				param += '[' + usrPhn + ']';									// [9]
				param += '[' + usrFax + ']';									// [10]
				param += '[' + usrId + ']';										// [11]
				param += '[' + ']';												// [12]
				param += '[' + ofcLoclNm + ']';									// [13]  user local office name
				ttlParam += "^@@^" + param;
			}
		}
		//마지막 처리
		//if(ttlFileName.substring(4) != ""){
		if(invSeq != ""){
			formObj.file_name.value=ttlFileName.substring(4);
			formObj.rd_param.value=ttlParam.substring(4);
			formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="AS";
			if(formObj.f_agt_radio[0].checked){    // Agent
				formObj.rpt_tp.value="";
				formObj.rpt_trdp_cd.value=formObj.f_agt_trdp_cd.value;
			}else{                                 // Account Group ID
				formObj.rpt_tp.value="GRP";
				formObj.rpt_acc_grp_id.value=formObj.f_acct_cd.value;
			}
			popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);
		}else{
			//There is no data
			alert(getLabel('FMS_COM_ALT010'));
		}
	}else{
		//There is no data
		alert(getLabel('FMS_COM_ALT010'));
	}
}
var total_amt = 0.00;
function sheet1_OnChange(sheetObj,Row,Col){

	var formObj  = document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	case "chk" :
		if(sheetObj.GetCellValue(Row, "chk") == "1"){
			total_amt +=  Number(sheetObj.GetCellValue(Row, "bal_amt"));
		} else {
			total_amt +=  Number(sheetObj.GetCellValue(Row, "bal_amt")*-1);
		}
		var total = doMoneyFmt(Number(total_amt).toFixed(2));
		if (total == '0'|| total == '-0.00'){
			total = '0.00';
		}
		formObj.f_totamt_tot.value = total;
		break;
	}
}
function chkAgent(){
	var formObj=document.frm1;
  	if(formObj.f_agt_radio[0].checked){
  		formObj.f_agt_trdp_cd.readOnly=false;
  		formObj.f_agt_trdp_nm.readOnly=false;
  		formObj.f_agt_trdp_cd.disabled=false;
  		formObj.f_agt_trdp_nm.disabled=false;
		document.getElementById('retBtn').style.display='Inline';
		// #50579
		formObj.f_filter_by_chk_3.disabled=true;
		formObj.f_filter_by_chk_3.checked=false;

  	}else{
  		formObj.f_agt_trdp_cd.value="";
		formObj.f_agt_trdp_cd.readOnly=true;
		formObj.f_agt_trdp_cd.disabled=true;
  		formObj.f_agt_trdp_nm.value="";
  		formObj.f_agt_trdp_nm.readOnly=true;
  		formObj.f_agt_trdp_nm.disabled=true;
		document.getElementById('retBtn').style.display='none';
		// #50579
		//formObj.f_filter_by_chk_3.disabled=false;
		chkRptType();

		docObjects[0].RemoveAll();
  	}
}
//Calendar flag value
var firCalFlag=false;

// #48395 - Agent Statement 속도 개선
function printAgentStatement(){

	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var addFileName = "";
//	formObj.title.value="Agent Statement";

	var agent = navigator.userAgent.toLowerCase();

//	#1081 [Binex] Agent Statement Page is missing when exporting to Excel(Internet Explorer)
	// CSR #2987 : [BNX] AGENT STATEMENT EXPORTED FILE NAME
	formObj.rpt_file_name_title.value = "";
	if(formObj.f_agt_radio[0].checked){//agent
		addFileName = formObj.f_agt_trdp_nm.value;
	} else {//account group
		addFileName = formObj.f_acct_cd.value;

	}

	if (addFileName != ""){
		addFileName = addFileName.replace(/\./g, "");
		addFileName = addFileName.replace(/\\|\/|\:|\#|\*|\?|\"|\<|\>|\||\&|\-|\,|\.|\__|\'|\s/g, "_");
		formObj.rpt_file_name_title.value = "Agent Statement_" + addFileName ;
		formObj.title.value = "Agent Statement [" + addFileName + "]";
	} else  {
		formObj.rpt_file_name_title.value = "Agent Statement" ;
		formObj.title.value = "Agent Statement";
	}

		
	if (agent.indexOf("chrome") == -1) {
		if(bl_split =="Y")
		{ 
			formObj.file_name.value="agent_statement_01_split.mrd"; 
		}
		else{
			formObj.file_name.value="agent_statement_01.mrd";
		}
	}else{
		if(bl_split =="Y")
		{ 
			formObj.file_name.value="agent_statement_01_Chrome_split.mrd"; 
		}
		else{
			formObj.file_name.value="agent_statement_01_Chrome.mrd";
		}
		
	}
	

	var chkInvSeq="";//그리드에서 체크한 프린트하지 않을 Invoice

	if(formObj.f_agt_trdp_cd.value != "" && sheetObj.LastRow()> 0){
		for(var i=1 ; i < sheetObj.LastRow()+1 ; i++){
			if(sheetObj.GetCellValue(i, "chk") == "1"){
				chkInvSeq=chkInvSeq + ",'" + sheetObj.GetCellValue(i, "inv_seq") + "'";
			}
		}
	}
	chkInvSeq=chkInvSeq.substring(1);

	if (sheetObj.LastRow() > 1 && chkInvSeq == ""){
		// No Data found!
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}

	var ofcCd=formObj.f_ofc_cd.value;
	var perStrdt=formObj.per_strdt.value.replaceAll("-","");
  	var perEnddt=formObj.per_enddt.value.replaceAll("-","");
  	perStrdt=perStrdt.substring(4,8) + perStrdt.substring(0,4);
  	perEnddt=perEnddt.substring(4,8) + perEnddt.substring(0,4);

  	var dptTpStr="";
	var dptTp1="";
	var dptTp2="";
	var dptTp3="";
	var dptTp4="";
	var dptTp5="";

	if(formObj.f_dpt_tp_1.checked == true){
		dptTpStr += ",AI";
		dptTp1="Y";
	}
	if(formObj.f_dpt_tp_2.checked == true){
		dptTpStr += ",AE";
		dptTp2="Y";
	}
	if(formObj.f_dpt_tp_3.checked == true){
		dptTpStr += ",OI";
		dptTp3="Y";
	}
	if(formObj.f_dpt_tp_4.checked == true){
		dptTpStr += ",OE";
		dptTp4="Y";
	}
	if(formObj.f_dpt_tp_5.checked == true){
		dptTpStr += ",GE";
		dptTp5="Y";
	}

	dptTpStr=dptTpStr.substring(1);

	var todayDt=getTodayStr().replaceAll("-","");
	var year=todayDt.substring(4,8);
	var month=todayDt.substring(0,2);
	var day=todayDt.substring(2,4);
	todayDt=mkCharMonthFormat(month) + " " + day + ", " +  year;

	//var sell_buy_tp_cd="";
	//var sellCnt=0;

	//Agent 별로 Print 될 페이지를 붙임

	//for(var i=1 ; i < sheetObj2.LastRow()+1 ; i++){
		/*if( sheetObj.LastRow() + 1 == 1){ // 첫번째 그리드에 데이터가 없을 때
			invSeq=invSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";

			//30282
			if (sheetObj.GetCellValue(i, "intg_bl_seq") != "") {
				blInvSeq=blInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
			} else {
				othInvSeq=othInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
			}

		}else if( chkInvSeq.indexOf( sheetObj2.GetCellValue(i, "inv_seq")) >= 0){ // 동일한게 있을 경우
			invSeq=invSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";

			//30282
			if (sheetObj.GetCellValue(i, "intg_bl_seq") != "") {
				blInvSeq=blInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
			} else {
				othInvSeq=othInvSeq + ",'" + sheetObj2.GetCellValue(i, "inv_seq") + "'";
			}
		}else{
			//break;
		}*/


		/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 */
		//sell_buy_tp_cd=sheetObj2.GetCellValue(i, "sell_buy_tp_cd");

		//if(sheetObj2.GetCellValue(i, "trdp_cd") != sheetObj2.GetCellValue(i-1, "trdp_cd")
		//|| sheetObj2.GetCellValue(i, "curr_cd") != sheetObj2.GetCellValue(i-1, "curr_cd")){
			//Parameter Setting
	var param="";

	param += "[" + ofcCd + "]";													//[1]
	if(formObj.f_by_bill_to.checked == true){
		param += "[Y]";															//[2]
	}else{
		param += "[]";															//[2]
	}
	//param += "[" + sheetObj2.GetCellValue(i, "trdp_cd") + "]";					//[3]
	param += "[" + formObj.f_agt_trdp_cd.value + "]";							//[3]
	param += "[" + chkInvSeq + "]";												//[4]
	param += formObj.f_per_radio[0].checked == true ? "[Y]" : "[]";				//[5]
	param += formObj.f_per_radio[1].checked == true ? "[Y]" : "[]";				//[6]
	param += formObj.f_per_radio[2].checked == true ? "[Y]" : "[]";				//[7]
	param += formObj.f_per_radio[3].checked == true ? "[Y]" : "[]";				//[8]
	param += formObj.f_per_chk.checked == true ? "[Y]" : "[]";					//[9]
	param += "[" + perStrdt + "]";												//[10]
	param += "[" + perEnddt + "]";												//[11]
	//param += "[" + sheetObj2.GetCellValue(i, "curr_cd") + "]";					//[12]
	param += "[" + formObj.f_curr_cd.value + "]";								//[12]
	param += '[' + dptTp1 + ']';												//[13]
	param += '[' + dptTp2 + ']';												//[14]
	param += '[' + dptTp3 + ']';												//[15]
	param += '[' + dptTp4 + ']';												//[16]
	param += '[' + dptTp5 + ']';												//[17]
	param += '[' + dptTpStr + ']';												//[18]
	param += formObj.f_filter_by_radio[0].checked == true ? "[Y]" : "[]";		//[19]
	param += formObj.f_filter_by_radio[1].checked == true ? "[Y]" : "[]";		//[20]
	param += formObj.f_filter_by_radio[2].checked == true ? "[Y]" : "[]";		//[21]
	param += formObj.f_filter_by_chk_1.checked == true ? "[Y]" : "[]";			//[22]
	param += formObj.f_filter_by_chk_2.checked == true ? "[Y]" : "[]";			//[23]
	param += formObj.f_filter_by_chk_3.checked == true ? "[Y]" : "[]";			//[24]
	param += formObj.f_filter_by_chk_4.checked == true ? "[Y]" : "[]";			//[25]
	param += '[' + todayDt + ']';												//[26]
	param += '[' + formObj.f_sys_ofc_agent_stmt_rmk.value + ']';				//[27]
	param += '[' + usrPhn + ']';												//[28]
	param += '[' + usrFax + ']';												//[29]
	param += '[' + usrEml + ']';												//[30]
	param += '[' + usrOfcCd + ']';												//[31]
	if(formObj.f_agt_flg.value == "Y"){
		param += '[Y]';															//[32]
	}else{
		param += '[]';															//[32]
		//if(sheetObj2.GetCellValue(i, "acct_cd") == ""){
		//if(formObj.f_acct_cd.value == ""){
		//	param += '[Y]';														//[32]
		//}else{
		//	param += '[]';														//[32]
		//}
	}
	//param += '[' + sheetObj2.GetCellValue(i, "acct_cd") + ']';					//[33]
	param += '[' + formObj.f_acct_cd.value + ']';								//[33]

	/* #20641 : [BINEX]Agent Statement jsjang 2013.9.9 imp_ref_no add */
	//param += formObj.f_debit_sell_buy_tp_cd.checked == true ? "[Y]" : "[]";		//[34]
	//param += formObj.f_credit_sell_buy_tp_cd.checked == true ? "[Y]" : "[]";	//[35]

	//[34]
	if(formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == true){
		param += '[Y]';
	}else{
		param += '[]';
	}
	//[35]
	if(formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == false){
		param += '[Y]';
	}else{
		param += '[]';
	}
	//[36]
	if(formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == true){
		param += '[Y]';
	}else{
		param += '[]';
	}
	//[37 User ID]
	param += '[' + usrId + ']';

	var invSeq = '';

	param += '[' + usrEml + ']';									// [38] <= [1]
	param += '[' + invSeq + ']';									// [39] <= [2]
	param += '[]';													// [40] <= [3]
	param += '[]';													// [41] <= [4]
	param += '[]';													// [42] <= [5]
	param += '[]';													// [43] <= [6]
	param += '[' + ofcCd + 'MAINCMP]';								// [44] <= [7]
	param += '[' + usrOfcCd + ']';									// [45] <= [8]
	param += '[' + usrPhn + ']';									// [46] <= [9]
	param += '[' + usrFax + ']';									// [47] <= [10]
	param += '[' + usrId + ']';										// [48] <= [11]
	param += '[' + ']';												// [49] <= [12]
	param += '[' + ofcLoclNm + ']';									// [50] <= [13] user local office name

	if(formObj.f_ar_sell_buy_tp_cd.checked == true){
		param += '[Y]';															//[51] AR (By Agent)
	}else{
		param += '[]';															//[51] AR (By Agent)
	}

	if(formObj.f_ap_sell_buy_tp_cd.checked == true){
		param += '[Y]';															//[52] AP (By Agent)
	}else{
		param += '[]';															//[52] AP (By Agent)
	}

	param += '[' + usrNm + ']';										// [53] User Name

	param += '[' + formObj.header_ofc_cd.value + ']';										// [54] Header Ofc_cd
	param += '[' + formObj.footer_ofc_cd.value + ']';										// [55] Footer Ofc_cd
	
	//[#4359] [Great Luck] Agent Statement Sorting Option
	param += formObj.f_order_by_radio1.checked == true ? "[Y]" : "[]"; //[56] 
	param += formObj.f_order_by_radio2.checked == true ? "[Y]" : "[]"; //[57] 
	// [#5775] [SMART SUPPLY CHAIN] Agent statement sort by due date
	param += formObj.f_order_by_radio3.checked == true ? "[Y]" : "[]"; //[58] 
	//OFVFOUR-7485 [Webtrans] Previous Balance option on Agent Statement
	param += formObj.f_filter_by_chk_5.checked == true ? "[Y]" : "[]"; //[59]
	//OFVFOUR-7479: [SOUTH EAST] Add " As Of " to the date option on the Agent Statement search page 
	if(formObj.f_date_radio[0].checked){
		param += '[As of ' + formObj.per_enddt.value + ']'//[60]
	}else{
		param += '[]';//[60]
	}
	// [51] Logo

	/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 */

	/*if((formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == true)
			|| (formObj.f_debit_sell_buy_tp_cd.checked == true && formObj.f_credit_sell_buy_tp_cd.checked == false && sell_buy_tp_cd == 'D')
			|| (formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == true && sell_buy_tp_cd == 'C'))
	{
		ttlParam += "^@@^" + param;
		ttlFileName += "^@@^" + "agent_statement_01.mrd";
		sellCnt++;
	}else if(formObj.f_debit_sell_buy_tp_cd.checked == false && formObj.f_credit_sell_buy_tp_cd.checked == false)
	{
		alert(getLabel('FMS_COM_ALT055'));
		formObj.f_debit_sell_buy_tp_cd.focus();
		return;
	}*/
		//}
	//}

		/* #20641 : [BINEX]Agent Statement -   add sell_buy_tp_cd , jsjang 2013.9.16 - 해당 sell_buy_tp_cd 의 데이타가 없으면 처리 */
		/*if(sellCnt == 0)
		{
			alert(getLabel('FMS_COM_ALT054'));
			return;
		}
		invSeq=invSeq.substring(1);
		if (blInvSeq!="") {
			blInvSeq=blInvSeq.substring(1);
		}
		if (othInvSeq!="") {
			othInvSeq=othInvSeq.substring(1);
		}*/

	// CR/DB Note Report
	//if(formObj.f_filter_by_chk_3.checked){
			// CR/DR을 Report 뒤에 붙일때는Branch를 선택해야만 한다.
			/*
			if(formObj.f_ofc_cd.value == ""){
				//Branch is mandatory field.
				alert(getLabel('FMS_COM_ALT007')+  "\n" + getLabel('ITM_OFFICE_CD'));	//[20130415 OJG]
				return;
			}
*/
			// CR/DR을 Report 뒤에 붙일때는Department Type을 BL or Other 로만 선택해야만 한다.
			/*
			# 30282 - [BINEX]Agent Statement - Invoice Attach 옵션
			- Agent Statement 화면에서 "Attached CR/DR Note(s) & Invoice(s)." 옵션을 check 하면 Department 에서 B/L (OI/OE/AI/AE) 와 Other Operation 을 같이 check 할 수 없음
			- Department 를 모두 선택하고 출력 가능하도록 수정
			if(blOthFlg == "ALL"){
				//Please check department type(Only select B/L Type or Other Operation).
				alert(getLabel('PFM_COM_ALT001'));
				return;
			}
			*/
			//var ofcIdx = formObj.f_ofc_cd.selectedIndex;
			//var ofcCntCd = ofcCntArr[ofcIdx];
		/*if(blOthFlg == "ALL") {
				// 1. BL인 경우
				if (blInvSeq != "") {
					ttlFileName += "^@@^" + "invoice_02_us.mrd";
					var param="";
					if (blInvSeq != "") {
						param += '[' + usrEml + ']';									// [1]
						param += '[' + invSeq + ']';									// [2]
						param += '[]';													// [3]
						param += '[]';													// [4]
						param += '[]';													// [5]
						param += '[]';													// [6]
						param += '[' + ofcCd + 'MAINCMP]';								// [7]
						param += '[' + usrOfcCd + ']';									// [8]
						param += '[' + usrPhn + ']';									// [9]
						param += '[' + usrFax + ']';									// [10]
						param += '[' + usrId + ']';										// [11]
						param += '[' + ']';												// [12]
						param += '[' + ofcLoclNm + ']';									// [13]  user local office name
						ttlParam += "^@@^" + param;
					}
				}
				// 2. OTH일 경우
				if (othInvSeq != "") {
					ttlFileName += "^@@^" + "invoice_07_us.mrd";
					var param="";
					if (othInvSeq != "") {
						param += '[' + usrEml + ']';									// [1]
						param += '[' + invSeq + ']';									// [2]
						param += '[]';													// [3]
						param += '[]';													// [4]
						param += '[]';													// [5]
						param += '[]';													// [6]
						param += '[' + ofcCd + 'MAINCMP]';								// [7]
						param += '[' + usrOfcCd + ']';									// [8]
						param += '[' + usrPhn + ']';									// [9]
						param += '[' + usrFax + ']';									// [10]
						param += '[' + usrId + ']';										// [11]
						param += '[' + ']';												// [12]
						param += '[' + ofcLoclNm + ']';									// [13]  user local office name
						ttlParam += "^@@^" + param;
					}
				}
			} else if(blOthFlg == "OTH"){
				ttlFileName += "^@@^" + "invoice_07_us.mrd";
				var param="";
				param += '[' + usrEml + ']';									// [1]
				param += '[' + invSeq + ']';									// [2]
				param += '[]';													// [3]
				param += '[]';													// [4]
				param += '[]';													// [5]
				param += '[]';													// [6]
				param += '[' + ofcCd + 'MAINCMP]';								// [7]
				param += '[' + usrOfcCd + ']';									// [8]
				param += '[' + usrPhn + ']';									// [9]
				param += '[' + usrFax + ']';									// [10]
				param += '[' + usrId + ']';										// [11]
				param += '[' + ']';												// [12]
				param += '[' + ofcLoclNm + ']';									// [13]  user local office name
				ttlParam += "^@@^" + param;
			}else{
				ttlFileName += "^@@^" + "invoice_02_us.mrd";
				var param="";
				param += '[' + usrEml + ']';									// [1]
				param += '[' + invSeq + ']';									// [2]
				param += '[]';													// [3]
				param += '[]';													// [4]
				param += '[]';													// [5]
				param += '[]';													// [6]
				param += '[' + ofcCd + 'MAINCMP]';								// [7]
				param += '[' + usrOfcCd + ']';									// [8]
				param += '[' + usrPhn + ']';									// [9]
				param += '[' + usrFax + ']';									// [10]
				param += '[' + usrId + ']';										// [11]
				param += '[' + ']';												// [12]
				param += '[' + ofcLoclNm + ']';									// [13]  user local office name
				ttlParam += "^@@^" + param;
			}
		}*/

	formObj.rd_param.value = param;
	formObj.rpt_biz_tp.value="ACCT";
	formObj.rpt_biz_sub_tp.value="AS";
	if(formObj.f_agt_radio[0].checked){    // Agent
		formObj.rpt_tp.value="";
		formObj.rpt_trdp_cd.value=formObj.f_agt_trdp_cd.value;
		formObj.rpt_acc_grp_id.value="";

		if(formObj.rpt_trdp_cd.value == ""){
			formObj.rpt_trdp_cd.value = "ALL";
		}
	}else{                                 // Account Group ID
		formObj.rpt_tp.value="GRP";
		formObj.rpt_trdp_cd.value="";
		formObj.rpt_acc_grp_id.value=formObj.f_acct_cd.value;

		if(formObj.rpt_acc_grp_id.value == ""){
			formObj.rpt_acc_grp_id.value = "ALL";
		}
	}
	//popPOST(formObj, "RPT_RD_0030.clt", 'popTest', 1025, 740);


	if (pdf) {
		popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		pdf = false;
	} else {
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	}

		//마지막 처리
		//if(ttlFileName.substring(4) != ""){
		/*if(invSeq != ""){
			//formObj.file_name.value=ttlFileName.substring(4);
			//formObj.rd_param.value=ttlParam.substring(4);
			//formObj.rpt_biz_tp.value="ACCT";
			formObj.rpt_biz_sub_tp.value="AS";
			if(formObj.f_agt_radio[0].checked){    // Agent
				formObj.rpt_tp.value="";
				formObj.rpt_trdp_cd.value=formObj.f_agt_trdp_cd.value;
			}else{                                 // Account Group ID
				formObj.rpt_tp.value="GRP";
				formObj.rpt_acc_grp_id.value=formObj.f_acct_cd.value;
			}
			popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);
		}else{
			//There is no data
			alert(getLabel('FMS_COM_ALT010'));
		}
	}else{
		//There is no data
		alert(getLabel('FMS_COM_ALT010'));
	}*/






	/*var ofcCd="";

	if(formObj.f_ofc_cd.value != ""){
		ofcCd=formObj.f_ofc_cd.value;
  	}else{
  		ofcCd=formObj.f_sys_ofc_cd.value;
  	}

	var param="";
	param += "[" + ofcCd + "]";												//[1]
	param += "[" + formObj.f_cust_trdp_cd.value + "]";						//[2]
	param += formObj.f_per_radio[0].checked == true ? "[Y]" : "[]";			//[3]
	param += formObj.f_per_radio[1].checked == true ? "[Y]" : "[]";			//[4]
	param += formObj.f_per_radio[2].checked == true ? "[Y]" : "[]";			//[5]
	param += formObj.f_per_radio[3].checked == true ? "[Y]" : "[]";			//[6]
	param += formObj.f_date_radio[0].checked == true ? "[Y]" : "[]";		//[7]
	param += formObj.f_date_radio[1].checked == true ? "[Y]" : "[]";		//[8]

	if(formObj.f_date_radio[0].checked == true){
		param += "[" + "As of " + formObj.per_dt.value + "]";				//[9]
		param += "[" + formObj.h_per_dt.value + "]";						//[10]
	}else{
		param += "[" + formObj.h_per_strdt.value + "]";						//[9]
		param += "[" + formObj.h_per_enddt.value + "]";						//[10]
	}

	var todayDt=getTodayStr().replaceAll("-","");
	var year=todayDt.substring(4,8);
	var month=todayDt.substring(0,2);
	var day=todayDt.substring(2,4);
	todayDt=mkCharMonthFormat(month) + " " + day + ", " +  year;
	param += "[" + todayDt + "]";											//[11]

	param += "[" + formObj.f_curr_cd.value + "]";							//[12]

	var dptTpStr="";
	var dptTp1="";
	var dptTp2="";
	var dptTp3="";
	var dptTp4="";
	var dptTp5="";
	var dptTp6="";

	if(formObj.f_dpt_tp_1.checked == true){
		dptTpStr += ",AI";
		dptTp1="Y";
	}
	if(formObj.f_dpt_tp_2.checked == true){
		dptTpStr += ",AE";
		dptTp2="Y";
	}
	if(formObj.f_dpt_tp_3.checked == true){
		dptTpStr += ",OI";
		dptTp3="Y";
	}
	if(formObj.f_dpt_tp_4.checked == true){
		dptTpStr += ",OE";
		dptTp4="Y";
	}
	if(formObj.f_dpt_tp_5.checked == true){
		dptTpStr += ",GE";
		dptTp5="Y";
	}
	if(formObj.f_dpt_tp_6.checked == true){
		dptTpStr += ",GE";
		dptTp6="Y";
	}

	param += '[' + dptTp1 + ']';											//[13]
	param += '[' + dptTp2 + ']';											//[14]
	param += '[' + dptTp3 + ']';											//[15]
	param += '[' + dptTp4 + ']';											//[16]
	param += '[' + dptTp5 + ']';											//[17]

	dptTpStr=dptTpStr.substring(1);
	param += '[' + dptTpStr + ']';											//[18]

	param += formObj.f_rpt_tp_1.checked == true ? "[Y]" : "[]";				//[19]
	param += formObj.f_rpt_tp_2.checked == true ? "[Y]" : "[]";				//[20]

	if(formObj.f_rpt_tp_1.checked == false && formObj.f_rpt_tp_2.checked == true){
		param += '[Y]';														//[21]
	}else{
		param += '[]';														//[21]
	}
	param += formObj.f_filter_by_radio[0].checked == true ? "[Y]" : "[]";	//[22]
	param += formObj.f_filter_by_radio[1].checked == true ? "[Y]" : "[]";	//[23]
	param += formObj.f_filter_by_chk_1.checked == true ? "[Y]" : "[]";		//[24]
	param += formObj.f_filter_by_chk_3.checked == true ? "[Y]" : "[]";		//[25]
	param += '[' + formObj.f_sys_ofc_locl_stmt_rmk.value + ']';				//[26]
	param += formObj.f_ofc_cd.value == "" ? "[Y]" : "[]";					//[27]
	param += '[' + usrPhn + ']';											//[28]
	param += '[' + usrFax + ']';											//[29]
	param += '[' + usrEml + ']';											//[30]
	param += '[' + usrNm  + ']';											//[31]
	param += '[' + usrId  + ']';											//[32]
	param += '[' + dptTp6 + ']';											//[33]

	// Invoice 관련 파라메터
	param += formObj.f_filter_by_chk_2.checked == true ? "[Y]" : "[]";		//[34]
	param += '[' + ofcCd + 'MAINCMP]';										//[35]
	param += '[' + formObj.f_ofc_cd.value + ']';							//[36]
	// [38] Logo

	formObj.rd_param.value = param;
	formObj.rpt_biz_tp.value="ACCT";
	formObj.rpt_biz_sub_tp.value="LS";
	formObj.rpt_trdp_cd.value=formObj.f_cust_trdp_cd.value;
	popPOST(formObj, "RPT_RD_0030.clt", 'popTest', 1025, 740);*/
}

function chkRptType(){
	var formObj=document.frm1;
	if(!formObj.f_debit_sell_buy_tp_cd.checked && !formObj.f_credit_sell_buy_tp_cd.checked){
		formObj.f_filter_by_chk_3.disabled=true;
		formObj.f_filter_by_chk_3.checked=false;
	}else{
		if(formObj.f_agt_trdp_cd.value != "" || !formObj.f_agt_radio[0].checked){
			formObj.f_filter_by_chk_3.disabled=false;
		}else{
			formObj.f_filter_by_chk_3.checked=false;
			formObj.f_filter_by_chk_3.disabled=true;
		}
	}
}

function setHeaderFooter(){
	var formObj = document.frm1;

	if(formObj.f_ofc_cd.value != ""){
		formObj.header_ofc_cd.value = usrOfcCd;
		formObj.footer_ofc_cd.value = usrOfcCd;
	}else{
		if(formObj.f_prnt_ofc_cd.value != ""){
			formObj.header_ofc_cd.value = formObj.f_prnt_ofc_cd.value;
			formObj.footer_ofc_cd.value = formObj.f_prnt_ofc_cd.value;
		}else{
			formObj.header_ofc_cd.value = formObj.f_sys_ofc_cd.value;
			formObj.footer_ofc_cd.value = formObj.f_sys_ofc_cd.value;
		}
	}
}

function callBack_AGT_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		frmObj.f_agt_trdp_cd.value = rtnValAry[0];
		frmObj.f_agt_trdp_nm.value = rtnValAry[2];
		
		// #4871 [JH] Agent statement error
		chkRptType();
	}
}
//[#5775] [SMART SUPPLY CHAIN] Agent statement sort by due date
function get_fPerRadio(obj){
	var dateTypeTxt = document.frm1.date_type_lbl.value;
	var rates = document.getElementsByName('f_per_radio');
	var rate_value;
	for(var i = 0; i < rates.length; i++){
	    if(rates[i].checked){
	    	document.getElementById('fPerRadioValue').innerHTML = dateTypeTxt + ' (' + rates[i].value + ')';
	        break;
	    }
	}
	
}
//OFVFOUR-7479: [SOUTH EAST] Add " As Of " to the date option on the Agent Statement search page 
var startDate=getMonthFirstDate(-1);
function dateFieldChange(flg){
  var formObj=document.frm1;
  if(flg == "1"){
      document.getElementById("per_strdt").style.display="none";
      document.getElementById("dash1").style.display="none";
      document.getElementById("per_dt_cal").style.display="inline";
      document.getElementById("per_dt2_cal").style.display="none";
      startDate = formObj.per_strdt.value;
      formObj.per_strdt.value = "01-01-1900";
      formObj.f_date_radio[0].checked=true;
  }else{
      document.getElementById("per_strdt").style.display="inline";
      document.getElementById("dash1").style.display="inline";
      document.getElementById("per_dt_cal").style.display="none";
      document.getElementById("per_dt2_cal").style.display="inline";
      formObj.per_strdt.value = startDate;
      formObj.f_date_radio[1].checked=true;
  }
}