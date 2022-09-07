/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0030.jsp
 *@FileTitle : Local Statement
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
		formObj.f_cust_trdp_cd.value=rtnValAry[0];//full_nm
		//#3488 Accounting Multi Language 적용
		if(MULTI_LANGUAGE == 'Y'){
			formObj.f_cust_trdp_nm.value = rtnValAry[10];//full_nm
		}else {
			formObj.f_cust_trdp_nm.value = rtnValAry[2];//full_nm
		}		
		formObj.f_filter_by_chk_3.disabled=false;
		docObjects[0].RemoveAll();
		docObjects[1].RemoveAll();//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
	}
	}
function doWork(srcName){
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    switch(srcName) {
	    case "SEARCHLIST01":
	    	//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
	    	if(formObj.f_cust_trdp_cd.value == ""){
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));
	    		formObj.f_cust_trdp_cd.focus();
	    		return;
	    	}
	    	if(formObj.f_date_radio[0].checked == true){
	    		formObj.f_h_per_tp1.value="A";
	    		var perDt=formObj.per_dt.value.replaceAll("-","");
				if(perDt != ""){
					formObj.h_per_dt.value=perDt.substring(4,8) + perDt.substring(0,4);
				}else{
					//Period Date is mandatory field.
					alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_PERDT'));
					formObj.per_dt.focus();
					return;
				}
	    	}else{
	    		formObj.f_h_per_tp1.value="P";
	    		if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    			return;
	    		}
	    		var perStrdt=formObj.per_strdt.value.replaceAll("-","");;
	    		var perEnddt=formObj.per_enddt.value.replaceAll("-","");;
	    		formObj.h_per_strdt.value=perStrdt.substring(4,8) + perStrdt.substring(0,4);
	    		formObj.h_per_enddt.value=perEnddt.substring(4,8) + perEnddt.substring(0,4);
	    	}
	    	formObj.f_cmd.value=SEARCHLIST01;
	    	if(formObj.f_per_radio[0].checked == true){
	    		formObj.f_h_per_tp2.value="P";
	    	}else if(formObj.f_per_radio[1].checked == true){
	    		formObj.f_h_per_tp2.value="D";
	    	}else{
	    		formObj.f_h_per_tp2.value="I";
	    	}
	    	var deptCd="";
	    	if(formObj.f_dpt_tp_1.checked == true){
	      		deptCd=deptCd + ",'AIM','AIH'";
	      	}
	      	if(formObj.f_dpt_tp_2.checked == true){
	      		deptCd=deptCd + ",'AOM','AOH'";
	      	}
	      	if(formObj.f_dpt_tp_3.checked == true){
	      		deptCd=deptCd + ",'SIM','SIH'";
	      	}
	      	if(formObj.f_dpt_tp_4.checked == true){
	      		deptCd=deptCd + ",'SOM','SOH'";
	      	}
	      	if(formObj.f_dpt_tp_5.checked == true){
	      		deptCd=deptCd + ",'OTH'";
	      	}
	      	if(formObj.f_dpt_tp_6.checked == true){
	      		deptCd=deptCd + ",'WMS'";
	      	}if(formObj.f_dpt_tp_7.checked == true){
	      		deptCd=deptCd + ",'GNR'";
	      	}
	      	deptCd=deptCd.substring(1);
	      	if(deptCd == ""){
	      		//Department Type is mandatory field.
	      		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_DETP'));
	      		return;
	      	}else{
	      		formObj.f_h_dpt_tp.value=deptCd;
	      	}
	    	if(formObj.f_rpt_tp_1.checked == true && formObj.f_rpt_tp_2.checked == true){
	    		formObj.f_h_rpt_tp.value="ALL";
	    	}else if(formObj.f_rpt_tp_1.checked == true){
	    		formObj.f_h_rpt_tp.value="L";
	    	}else if(formObj.f_rpt_tp_2.checked == true){
	    		formObj.f_h_rpt_tp.value="A";
	    	}else{
	    		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_RPTT'));
	    		return;
	    	}
	    	if(formObj.f_filter_by_radio[0].checked == true){
	    		formObj.f_h_all_tp.value="";
	    	}else{
	    		formObj.f_h_all_tp.value="O";
	    	}
	    	if(formObj.f_filter_by_chk_1.checked == true){
	    		formObj.f_h_inv_rcvd_flg.value="Y";
	    	}else{
	    		formObj.f_h_inv_rcvd_flg.value="N";
	    	}
	    	if(formObj.f_cust_radio[0].checked){
		  		formObj.f_cust_flg.value="Y";
		  	}else{
		  		formObj.f_cust_flg.value="";
		  	}
		    sheet2.DoSearch("PFM_ACC_0030_2GS.clt", FormQueryString(formObj) );
	    	break;
	    case "PRINT":
	    	if(formObj.f_date_radio[0].checked == true){
	    		formObj.f_h_per_tp1.value="A";
	    		var perDt=formObj.per_dt.value.replaceAll("-","");
				if(perDt != ""){
					formObj.h_per_dt.value=perDt.substring(4,8) + perDt.substring(0,4);
				}else{
					//Period Date is mandatory field.
					alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_PERDT'));
					formObj.per_dt.focus();
					return;
				}
	    	}else{
	    		formObj.f_h_per_tp1.value="P";
	    		if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    			return;
	    		}
	    		//----------[20130624 ojg]----------------
	    		var perStrdt=formObj.per_strdt.value.replaceAll("-","");;
	    		var perEnddt=formObj.per_enddt.value.replaceAll("-","");;
	    		formObj.h_per_strdt.value=perStrdt.substring(4,8) + perStrdt.substring(0,4);
	    		formObj.h_per_enddt.value=perEnddt.substring(4,8) + perEnddt.substring(0,4);
	    		//----------[20130624 ojg]----------------
	    	}
	    	if(formObj.f_per_radio[0].checked == true){
	    		formObj.f_h_per_tp2.value="P";
	    	}else if(formObj.f_per_radio[1].checked == true){
	    		formObj.f_h_per_tp2.value="D";
	    	}else{
	    		formObj.f_h_per_tp2.value="I";
	    	}
	    	var deptCd="";
	    	if(formObj.f_dpt_tp_1.checked == true){
	      		deptCd=deptCd + ",'AIM','AIH'";
	      	}
	      	if(formObj.f_dpt_tp_2.checked == true){
	      		deptCd=deptCd + ",'AOM','AOH'";
	      	}
	      	if(formObj.f_dpt_tp_3.checked == true){
	      		deptCd=deptCd + ",'SIM','SIH'";
	      	}
	      	if(formObj.f_dpt_tp_4.checked == true){
	      		deptCd=deptCd + ",'SOM','SOH'";
	      	}
	      	if(formObj.f_dpt_tp_5.checked == true){
	      		deptCd=deptCd + ",'OTH'";
	      	}
	      	if(formObj.f_dpt_tp_6.checked == true){
	      		deptCd=deptCd + ",'WMS'";
	      	}if(formObj.f_dpt_tp_7.checked == true){
	      		deptCd=deptCd + ",'GNR'";
	      	}
	      	deptCd=deptCd.substring(1);
	      	if(deptCd == ""){
	      		//Department Type is mandatory field.
	      		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_DETP'));
	      		return;
	      	}else{
	      		formObj.f_h_dpt_tp.value=deptCd;
	      	}
	    	if(formObj.f_rpt_tp_1.checked == true && formObj.f_rpt_tp_2.checked == true){
	    		formObj.f_h_rpt_tp.value="ALL";
	    	}else if(formObj.f_rpt_tp_1.checked == true){
	    		formObj.f_h_rpt_tp.value="L";
	    	}else if(formObj.f_rpt_tp_2.checked == true){
	    		formObj.f_h_rpt_tp.value="A";
	    	}else{
	    		//Report Type is mandatory field.
	    		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_RPTT'));
	    		return;
	    	}
	    	if(formObj.f_filter_by_radio[0].checked == true){
	    		formObj.f_h_all_tp.value="";
	    	}else{
	    		formObj.f_h_all_tp.value="O";
	    	}
	    	if(formObj.f_filter_by_chk_1.checked == true){
	    		formObj.f_h_inv_rcvd_flg.value="Y";
	    	}
	    	if(formObj.f_cust_radio[0].checked){
		  		formObj.f_cust_flg.value="Y";
		  	}else{
		  		formObj.f_cust_flg.value="";
		  	}
	    	printLocalStatement();
		break;	    
		case "Print":
		break;
		case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			// Agent group ID에 체크되어있으면 검색하지않는다.
			if(formObj.f_cust_radio[1].checked){  	
				break;
			}
			rtnary=new Array(1);
			rtnary[0]="1";
//			rtnary[1]=formObj.f_cust_trdp_nm.value;
//			rtnary[2]=window;
			//var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "TRDP_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");             
		break;
		case "TRDP_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			// Agent group ID에 체크되어있으면 검색하지않는다.
			if(formObj.f_cust_radio[1].checked){  	
				break;
			}
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=formObj.f_cust_trdp_nm.value;
			rtnary[2]=window;
			//var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			callBackFunc = "TRDP_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");             
		break;
		case "ALL_DPT":
			formObj.f_dpt_tp_1.checked=true;
			formObj.f_dpt_tp_2.checked=true;
			formObj.f_dpt_tp_3.checked=true;
			formObj.f_dpt_tp_4.checked=true;
			formObj.f_dpt_tp_5.checked=true;
			formObj.f_dpt_tp_6.checked=true;
			formObj.f_dpt_tp_7.checked=true;
		break;
		case "CLEAR_DPT":
			formObj.f_dpt_tp_1.checked=false;
			formObj.f_dpt_tp_2.checked=false;
			formObj.f_dpt_tp_3.checked=false;
			formObj.f_dpt_tp_4.checked=false;
			formObj.f_dpt_tp_5.checked=false;
			formObj.f_dpt_tp_6.checked=false;
			formObj.f_dpt_tp_7.checked=false;
		break;
		
        case "FN_OPR_POPLIST"://담당자openMean 1=화면에서 오픈, 2=그리드에서 오픈
      		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "FN_OPR_POPLIST";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");		
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
	 formObj=document.frm1;
	 //OFVFOUR-7954[JAPT] Change the default setting checkbox of the Local Statement screen
	 var opt_key = "DFL_CHK_LOCAL_STM";
	 ajaxSendPost(dflChkLocalStm, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    //OFVFOUR-7279 [BNX-All] Remove Post Date from the email subject
	 var opt_key = "LOCAL_MAIL_TITLE_RPT";
	 ajaxSendPost(showEmailTitleRpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	 formObj.per_dt.value=getTodayStr();
	 formObj.per_strdt.value=getMonthFirstDate(-1);
	 formObj.per_enddt.value=getTodayStr();
	 if(formObj.f_sys_ofc_trf_cur_cd.value != ""){
		 //formObj.f_curr_cd.value=formObj.f_sys_ofc_trf_cur_cd.value;
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
	 
	 // Period Type 을 Period로 설정
	 if(prn_ofc_cd =="BNXC"){		//[20150327 OJG]  임시수정
		 dateFieldChange(1);
	 }else{
		 dateFieldChange(2);
	 }
	 
	// #4389 Auto Complete 추가
	//fnSetAutocomplete('f_cust_trdp_nm', 'LINER_POPLIST', 'customer', 'O'); //Customer
	fnSetAutocompleteCallBack('f_cust_trdp_nm', 'callBack_CUST_POPLIST', 'LINER_POPLIST'); //Customer
	IBS_RestoreGridSetting(userId.value, getPageURL(), docObjects[1], false,"setShortcut");
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
			var headers = [ { Text:getLabel('PFM_ACC_0030_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
			             {Type:"Text",      Hidden:0,  Width:190,  Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:190,  Align:"Left",    ColMerge:1,   SaveName:"inv_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"oth_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"wms_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
			             ];
			 
			InitColumns(cols);
			SetVisible(0);
			SetEditable(1);
			/* 요구사항 #21738, jsjang 2013.12.19 */

        }                                                      
		break;
		case 2:
			//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
			with (sheetObj) {
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('PFM_ACC_0030_HDR2'), Align:"Center"} ];
				InitHeaders(headers, info);
		
				var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
		             {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:1,   SaveName:"inv_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"cust_ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"buy_inv_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"bal_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Float",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 }];
				
				SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
				InitColumns(cols);
				SetSheetHeight(241);
				SetEditable(1);
		}
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
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
//		    var cal=new calendarPopup();
//	        cal.displayType="date";
//	        cal.select(formObj.per_dt, 'per_dt', 'MM-dd-yyyy');
	        var cal=new ComCalendar();
	        cal.displayType="date";
	        cal.select(formObj.per_dt, 'MM-dd-yyyy');

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
function dateFieldChange(flg){
	var formObj=document.frm1;
	if(flg == "1"){
		document.getElementById("date_td1").style.display="inline";
		document.getElementById("date_td2").style.display="none";
		formObj.f_filter_by_chk_3.disabled=true;
		formObj.f_filter_by_chk_3.checked=false;
		formObj.f_date_radio[0].checked=true;
	}else{
		document.getElementById("date_td1").style.display="none";
		document.getElementById("date_td2").style.display="inline";
		formObj.f_filter_by_chk_3.disabled=false;
		formObj.f_date_radio[1].checked=true;
	}
}
function rptTypeChange(){
	var formObj=document.frm1;
	if(formObj.f_rpt_tp_2.checked == true){
		formObj.f_filter_by_chk_1.disabled=false;
	}else{
		formObj.f_filter_by_chk_1.disabled=true;
		formObj.f_filter_by_chk_1.checked=false;
	}
}

function printLocalStatement(){
	var formObj=document.frm1;
	formObj.title.value='Local Statement ';
	//6301 [JAPT] Mail sending function related request
	var per_type = "";
	var per_dt = "";
	if(formObj.f_per_radio1.checked == true){
		per_type = "POST DATE: ";
	}else if(formObj.f_per_radio2.checked == true){
		per_type = "DUE DATE: ";
	}else
		per_type = "INVOICE DATE: ";
	
	if(formObj.h_per_strdt.value != ""){
		var perstr = formObj.h_per_strdt.value.substring(4,6) + "-" + formObj.h_per_strdt.value.substring(6,8) + "-" + formObj.h_per_strdt.value.substring(0,4);
	}
	
	if(formObj.h_per_enddt.value != ""){
		var perend = formObj.h_per_enddt.value.substring(4,6) + "-" + formObj.h_per_enddt.value.substring(6,8) + "-" + formObj.h_per_enddt.value.substring(0,4);
	}

	if(formObj.f_date_radio2.checked == true){
		 per_dt =  perstr + ' ~ ' + perend;
	 }		 
	else{
		if(formObj.h_per_dt.value != ""){
			var perdt = formObj.h_per_dt.value.substring(4,6) + "-" + formObj.h_per_dt.value.substring(6,8) + "-" + formObj.h_per_dt.value.substring(0,4);
		}
		 per_dt = perdt;
	}
		
		
	
	formObj.file_name.value="local_statement_01.mrd"; 
	
	//#2499 [PATENT]Outstanding by Sales
	if(formObj.f_report_radio[0].checked){
		formObj.file_name.value="local_statement_01.mrd"; 
	}else if(formObj.f_report_radio[1].checked){
		formObj.file_name.value="ar_ap_balance.mrd"; 
	}else if(formObj.f_report_radio[2].checked){
		formObj.file_name.value="sales_os.mrd"; 
	}
	
	
	var ofcCd="";
	
	if(formObj.f_ofc_cd.value != ""){
		ofcCd=formObj.f_ofc_cd.value;
  	}else{
  		ofcCd=formObj.f_sys_ofc_cd.value;
  	}
  	//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
	var chkInvSeq="";
	if(formObj.f_cust_trdp_cd.value != "" && sheet2.LastRow()> 0){
		for(var i=1 ; i < sheet2.LastRow()+1 ; i++){
			if(sheet2.GetCellValue(i, "chk") == "1"){
				chkInvSeq=chkInvSeq + ",'" + sheet2.GetCellValue(i, "inv_seq") + "'";
			}
		}
	}
	chkInvSeq=chkInvSeq.substring(1);
	
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
	
	if(formObj.f_cust_flg.value == "Y"){
		param += '[Y]';														//[37]
	}else{
		param += '[]';	
	}
	param += '[' + formObj.f_acct_cd.value + ']';							//[38]
	
	
	//#2499 [PATENT]Outstanding by Sales
	param += formObj.f_report_radio[2].checked == true ? "[Y]" : "[]";      //[39] Group By
	param += formObj.f_person_radio[0].checked == true ? "[Y]" : "[]";      //[40] sales person
	param += formObj.f_person_radio[1].checked == true ? "[Y]" : "[]";      //[41] operator
	param += '[' + formObj.rlsd_usrid.value + ']';                          //[42] rlsd_usrid

	//#3375 [JTC]Invoice, Local Statement Form 개발 (S)
	var locUrl = location.href;
	var strArr = locUrl.split('/');
	locUrl = 'http://'+strArr[2];
	param += '[' + locUrl + ']';                                            //[43] Stamp Image Download URL

	var prtOption = '';
	if($('#rdoOption1').is(':checked')) {
		prtOption = 'Genernal';
	} else if($('#rdoOption2').is(':checked')) {
		prtOption = 'Original';
	} else if($('#rdoOption3').is(':checked')) {
		prtOption = 'Copy';
	}
	param += '[' + prtOption + ']';                                         //[44] Print Option
	//#6420 [LatonaUSA] G&A Inoivce 정보 출력 - Local Statement (Zen #2470)
	param += formObj.f_dpt_tp_7.checked == true ? "[Y]" : "[]";				//[45] General
	//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
	param += '['+chkInvSeq+']';//[46]
	if (sheet2.LastRow() > 1 && chkInvSeq == ""){
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}
	//#3375 [JTC]Invoice, Local Statement Form 개발 (E)

	//OFVFOUR-8070: [ALA WHITELINE] Add the options to the Local Statement
	param += '[' + frm1.f_tax_opt.value + ']';
	formObj.rd_param.value = param;
	formObj.rpt_biz_tp.value="ACCT";
	formObj.rpt_biz_sub_tp.value="LS";
	//OFVFOUR-7279 [BNX-All] Remove Post Date from the email subject
	var showEmailTitle = ""	
	//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 	 
	formObj.rpt_file_name_title.value = "";
	if(formObj.f_cust_radio[0].checked){
		var cust_trdp_nm = formObj.f_cust_trdp_nm.value;
		if (cust_trdp_nm != ""){
			cust_trdp_nm = cust_trdp_nm.replace(/\./g, "");
			cust_trdp_nm = cust_trdp_nm.replace(/\\|\/|\:|\#|\*|\?|\"|\<|\>|\||\&|\-|\,|\.|\__|\s/g, "_");
			formObj.rpt_file_name_title.value = "LocalStatement_"+cust_trdp_nm;
			formObj.title.value='Local Statement ['+cust_trdp_nm+']';
			//6301 [JAPT] Mail sending function related request
			showEmailTitle = createEmailTitle(optEmailTitle,'['+formObj.f_cust_trdp_nm.value +'] '
													  , per_type
													  , per_dt)
			formObj.mailTitle.value = showEmailTitle;
		}else{
			showEmailTitle = createEmailTitle(optEmailTitle, formObj.f_cust_trdp_nm.value
					  							      , per_type
					  							      , per_dt)
			formObj.mailTitle.value = showEmailTitle;
		}
		formObj.rpt_tp.value="";
		formObj.rpt_trdp_cd.value=formObj.f_cust_trdp_cd.value;
		formObj.rpt_acc_grp_id.value="";
		
		if(formObj.rpt_trdp_cd.value == ""){
			formObj.rpt_trdp_cd.value = "ALL";
		}
  	}else{  		
  		var acct_cd = formObj.f_acct_cd.value;
  		if (acct_cd != ""){  			
  			acct_cd = acct_cd.replace(/\./g, "");
  			acct_cd = acct_cd.replace(/\\|\/|\:|\#|\*|\?|\"|\<|\>|\||\&|\-|\,|\.|\__|\s/g, "_"); 
  			formObj.rpt_file_name_title.value = "LocalStatement_"+acct_cd ;
  			// OFVFOUR-8088 [BNX-LA] Wrong TP name on Local Statement email
  			showEmailTitle  = createEmailTitle(optEmailTitle, '['+acct_cd+'] '
				      									, per_type
				      									, per_dt);
  			formObj.mailTitle.value = showEmailTitle;
  			formObj.title.value='Local Statement ['+acct_cd+']';
  		}
  		formObj.rpt_tp.value="GRP";
  		formObj.rpt_trdp_cd.value="";
		formObj.rpt_acc_grp_id.value=formObj.f_acct_cd.value;
		
		if(formObj.rpt_acc_grp_id.value == ""){
			formObj.rpt_acc_grp_id.value = "ALL";
		}
  	}  
	//console.log(param);
	//popPOST(formObj, "RPT_RD_0030.clt", 'popTest', 1025, 740);
	if (pdf) {
		popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
		pdf = false;
	} else {
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
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
 	if(str == "cust_trdpcode") {
 		s_type="trdpcode";
 		docObjects[0].RemoveAll();
 		docObjects[1].RemoveAll();//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
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
 		if (CODETYPE == "cust_trdpcode") {
 			formObj.f_cust_trdp_cd.value="";// trdp_cd AS param1
 			formObj.f_cust_trdp_nm.value="";// eng_nm AS param2
 		}
 	}
 }
 /**
 * Trade Partner 관련 코드조회
 */
 function trdpCdReq(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	var formObj=document.frm1;
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var masterVals=doc[1].split('@@^');
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.f_cust_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
				//#3488 Accounting Multi Language 적용
				if(MULTI_LANGUAGE == 'Y'){
					formObj.f_cust_trdp_nm.value=masterVals[16];		//eng_nm   AS param2
				}else {
					formObj.f_cust_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
				}			
 			}
 		} else {
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.f_cust_trdp_cd.value="";				//trdp_cd  AS param1
 				formObj.f_cust_trdp_nm.value="";				//eng_nm   AS param2
 			}
 		}
 	}else{
 		//alert(getLabel('SEE_BMD_MSG43'));		
 	}
}
//Calendar flag value
var firCalFlag=false;

function chkCustomer(){
	var formObj=document.frm1;
  	if(formObj.f_cust_radio[0].checked){  	
  		formObj.f_cust_trdp_cd.readOnly=false;
  		formObj.f_cust_trdp_nm.readOnly=false;
  		formObj.f_cust_trdp_cd.disabled=false;
  		formObj.f_cust_trdp_nm.disabled=false;
		// #50579
		//formObj.f_filter_by_chk_3.disabled=true;
		//formObj.f_filter_by_chk_3.checked=false;
		//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
  		document.getElementById('retBtn').style.display='inline';
		
  	}else{
  		formObj.f_cust_trdp_cd.value="";
		formObj.f_cust_trdp_cd.readOnly=true;
		formObj.f_cust_trdp_cd.disabled=true;
  		formObj.f_cust_trdp_nm.value="";
  		formObj.f_cust_trdp_nm.readOnly=true;
  		formObj.f_cust_trdp_nm.disabled=true;
		// #50579
		//formObj.f_filter_by_chk_3.disabled=false;
		//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
  		document.getElementById('retBtn').style.display='none';
  		sheet2.RemoveAll();
  	}
}

//#2499 [PATENT]Outstanding by Sales
function fnPersonOpen(){
	var formObj=document.frm1;
	
	//#2499 [PATENT]Outstanding by Sales
	if(formObj.f_report_radio[0].checked){
		document.getElementById("spPerson").style.display="none";
	}else if(formObj.f_report_radio[1].checked){
		document.getElementById("spPerson").style.display="none";
	}else if(formObj.f_report_radio[2].checked){
		document.getElementById("spPerson").style.display="inline";
	}
}
//#2499 [PATENT]Outstanding by Sales
function FN_OPR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.rlsd_usrid.value=rtnValAry[0];
		formObj.rlsd_usr_nm.value=rtnValAry[1];
	}
}

function callBack_CUST_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		frmObj.f_cust_trdp_cd.value = rtnValAry[0];
		frmObj.f_cust_trdp_nm.value = rtnValAry[2];
	}
}
//OFVFOUR-7279 [BNX-All] Remove Post Date from the email subject
var optEmailTitle = "";
function showEmailTitleRpt(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optEmailTitle=doc[1];
		}
	}
}
function createEmailTitle(optval, cust, per_type, per_dt){
	var title = optval.replace('[CUST]', cust);
    title = title.replace('[PER_TYPE]', per_type);
    title = title.replace('[PER_DT]', per_dt);
    return title;
}
//OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
var total_amt = 0.00;
function sheet2_OnChange(sheetObj,Row,Col){

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
function sheet2_OnSearchEnd(sheetObj, errMsg){
	sheetObj.SetHeaderCheck(0, "chk",0);
	total_amt = 0.00;
	formObj.f_totamt_tot.value =doMoneyFmt(Number(total_amt).toFixed(2));
}
function getPageURL() {
	return document.location.href.split('/').slice(-1)[0];
}
function sheet2_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
		case "Header Setting Save":
			IBS_SaveGridSetting(userId.value, getPageURL(), sheetObj);
		break;
		case "Header Setting Reset":
			IBS_DelGridSetting(userId.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
//OFVFOUR-7954[JAPT] Change the default setting checkbox of the Local Statement screen
function dflChkLocalStm(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			if(doc[1] ==  'Y'){
				formObj.f_filter_by_chk_2.checked = true;
				formObj.rdoOption2.checked= true;
			}
			else {
				formObj.f_filter_by_chk_2.checked = false;
				formObj.f_filter_by_chk_1.checked = true;
				formObj.rdoOption1.checked= true;
			}
		}
		
	}
}