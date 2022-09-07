/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_ACC_0050.js
*@FileTitle  : Income Statement
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/17
=========================================================*/
var CAN_YN = '';
var G_GL_DATA_CREATE_STATUS = "END";
var caOfcList = '';
var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}


function doWork(srcName){
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    switch(srcName) {
	    case "SEARCHLIST":
	    	if(formObj.f_curr_tp[0].checked){
	    		//Please, select the [One Currency]
	    		//alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_OCUR') + "\n\n: PFM_ACC_0050.9");
	    		//return;
	    		formObj.f_curr_tp[1].checked=true;                    
	    	}
	    	if(formObj.f_curr_cd.value == ""){
	    		//Please, select the [To Currency]
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_TCUR'));
	    		return;
	    	}
	    	if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    		return;
	    	}
	    	if(formObj.f_rpt_tp[0].checked){
	    		formObj.f_rpt_tp_str.value="stand";
	    	}
	    	else if(formObj.f_rpt_tp[1].checked){
	    		formObj.f_rpt_tp_str.value="prev";
	    	}
	    	else if(formObj.f_rpt_tp[2].checked){
	    		formObj.f_rpt_tp_str.value="ytd";
	    	}
	    	else{
	    		formObj.f_rpt_tp_str.value="year";
	    	}
	        formObj.f_cmd.value=SEARCHLIST;
	        sheetObj.DoSearch("PFM_ACC_0050GS.clt", FormQueryString(formObj) );
	    	break;
		case "Print":
			if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    		return;
	    	}
    	   if(G_GL_DATA_CREATE_STATUS == "END"){
    		   G_GL_DATA_CREATE_STATUS ="START";
    		   setGlDataCreate('');
    	   } 
    	   return;
    	   break; 	   
        case 'GL_CREATE_END_ACTION':	
	    	if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
	    		return;
	    	}
			formObj.file_name.value='income_statement_01.mrd';
			formObj.title.value='Income Statement';
			//Parameter Setting
			var param='';
			//#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
			if(CAN_YN!='Y'){
				var selectedValues = $("#f_ofc_cd").multipleSelect("getSelects");
		   		param += '[' + selectedValues + ']';						// [1]
			}else{
				param += '[' + caOfcList + ']';				// [1]
			}			
	   		
			//param += '[' + formObj.f_ofc_cd.value + ']';				// [1]
			param += '[' + formObj.f_sys_ofc_cd.value + ']';			// [2]
			var strDt1=formObj.per_strdt.value.replaceAll("-","");
			var endDt1=formObj.per_enddt.value.replaceAll("-","");
			var sYear=parseInt(strDt1.substring(4,8));
			var sMonth=strDt1.substring(0,2);
			var sDay=strDt1.substring(2,4);
			var eYear=parseInt(endDt1.substring(4,8));
			var eMonth=endDt1.substring(0,2);
			var eDay=endDt1.substring(2,4);
			strDt1=sYear + sMonth + sDay;
			endDt1=eYear + eMonth + eDay;
			var strDt2="";
			var endDt2="";
			if(formObj.f_rpt_tp[0].checked){
				formObj.file_name.value='income_statement_01.mrd';
				param += '[' + 'Y' + ']';								// [3]
			}else{
				param += '[]';											// [3]
			}
			if(formObj.f_rpt_tp[1].checked){
				formObj.file_name.value='income_statement_02.mrd';
				param += '[' + 'Y' + ']';								// [4]
				strDt2=(sYear-1) + sMonth + sDay;
				endDt2=(eYear-1) + eMonth + eDay;
			}else{
				param += '[]';											// [4]
			}
			if(formObj.f_rpt_tp[2].checked){
				formObj.file_name.value='income_statement_02.mrd';
				param += '[' + 'Y' + ']';								// [5]
				//FC_GET_BEGIN_DATE Search
		    	var parmStr='&goWhere=aj&bcKey=getBeginningDate&yearEndDate='+endDt1;
		    	ajaxSendPost(getBeginningDate,  'reqVal', parmStr, './GateServlet.gsl');
				strDt2=s_beginnin_dt;									//2013.10.08 LHK  BEGIN_DATE Set
				endDt2=endDt1;
			}else{
				param += '[]';											// [5]
			}
			if(formObj.f_rpt_tp[3].checked){
				formObj.file_name.value='income_statement_03.mrd';
				param += '[' + 'Y' + ']';								// [6]
				strDt1=sYear + "0101";
				endDt1=sYear + "1231";
			}else{
				param += '[]';											// [6]
			}
			param += '[' + strDt1 + ']';								// [7]
			param += '[' + endDt1 + ']';								// [8]
			param += '[' + strDt2 + ']';								// [9]
			param += '[' + endDt2 + ']';								// [10]
			
			var multi_curr_flg	= "T";
			
			if(formObj.f_curr_tp[0].checked){
				param += '[' + 'Y' + ']';								// [11]
				param += '[]';											// [12]
				multi_curr_flg	= "T";
			}else{
				//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
                if(currRateCheck(sheetObj)){
                	return;
                }
				param += '[]';											// [11]
				param += '[' + 'Y' + ']';								// [12]
				multi_curr_flg	= "";							// [13]
			}
			/* LHK 20130924 Exchange Rate 변경로직으로 추가 수정됨  */
			param += '[' + getRateQuery() + ']';						// [13]
			
			param += '[' + formObj.f_curr_cd.value + ']';				// [14]
			//GL Link 용
			param += '[' + ofc_nm + ']';								// [15]
			param += '[' + usrNm + ']';									// [16]
			param += '[' + usrId + ']';									// [17]
			param += '[' + usrPhn + ']';								// [18]
			param += '[' + usrEml + ']';								// [19]
			param += '[' + multi_curr_flg + ']';						// [20] , 
			//curr_cd : param 14 이용, 
			//getRateQuery(): param 13 이용
			param += '[]';				                                // [21] B/S 에서 I/S 연결시 하이퍼 링크 속성에 추가된 param, js 에서는 value 없슴.
			
			//BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
			param += '[' + CAN_YN + ']';				                           // [22] 
			
			//#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
			var dtTp_check ="";
			if(formObj.f_dt_tp_radio[0].checked == true){
				dtTp_check = '';								
			} else {
				dtTp_check = 'I';								
			} 
			param += '[' + dtTp_check + ']';	                         // [23]
			
			formObj.rd_param.value=param;
			
			if (pdf) {
				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
				pdf = false;
			} else {
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			
		break;
    }
}
//GL View Table Data Create LKH 2015.02.25 Start
function setGlDataCreate(arg){
	//if(confirm(getLabel('FMS_COM_CFMCRE'))){
		var formObj=document.frm1;
		doShowProcess();		
		var type_clss_cd = 'GL_DATA_CREATE';
		ajaxSendPostAsync(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+formObj.f_usrId.value+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
	//}
} 		
function rtnAjaxFunction(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		//getGlDataCreateDate()
		doHideProcess();
		//alert(getLabel('FMS_COM_NTYCOM'));
	}else{
		doHideProcess();
		alert(getLabel('FMS_COM_ALT019'));
	}
	G_GL_DATA_CREATE_STATUS ="END";
	doWork('GL_CREATE_END_ACTION');
}
function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
}
function getGlDataCreateDate(){
	return;
	var type_clss_cd = 'GL_DATA_CREATE';
	var parmStr='&goWhere=aj&bcKey=getGlDataCreateDate&f_type_clss_cd='+type_clss_cd;
	ajaxSendPost(rtnGetGlDataCreateDate,  'reqVal', parmStr, './GateServlet.gsl');
}
function rtnGetGlDataCreateDate(reqVal){
	var formObj=document.frm1;
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	if(doc[1]=='NotCreate'){
    		formObj.gl_data_create_date.value='';
    	}else{
    		formObj.gl_data_create_date.value=doc[1];
    	}
    }
}
//GL View Table Data Create LKH 2015.02.25 End
/**
* Beginning Date Search
*/
var s_beginnin_dt="";
function getBeginningDate(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
   var doc=getAjaxMsgXML(reqVal);
   if(doc[0]=='OK'){
	   s_beginnin_dt=doc[1];
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
 
    //LHK, 20141029 #44986 [BINEX]Office - All Option
     setOfficeAllOption(formObj.f_ofc_cd);
     
    //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
   //#5070 [BINEX VISIBILITY] Container Status at Terminal (#3893 +)
     setTimeout(function(){
    	 if (ofcFlg == 'Y'){
    	   	 $('#f_ofc_cd').multipleSelect('uncheckAll');
    	    }
	 }, 100);
    
	 formObj.per_strdt.value= getMonthFirstDate(-1);
	 formObj.per_enddt.value= getMonthLastDate(-1);
	 /*
	 if(formObj.f_sys_ofc_trf_cur_cd.value != ""){
		 formObj.f_curr_cd.value=formObj.f_sys_ofc_trf_cur_cd.value;
	 }
	 */
	 
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
	setChkPeriod();
	setChkCurrency();
	 
	 for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
	
	//GL View Table Data Create LKH 2015.02.25
	//getGlDataCreateDate();
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
            var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);
            var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
					     {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym" },
					     {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 } ];
            InitColumns(cols);
            SetEditable(1);
            InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
            SetSheetHeight(200);
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
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.per_strdt, formObj.per_enddt, 'MM-dd-yyyy');
        break;
    }
}
function curr_search(){
	formObj = document.frm1;
	//<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->
	var selectedValues = $("#f_ofc_cd").multipleSelect("getSelects");
	formObj.f_sel_ofc.value = selectedValues;
	if(formObj.f_curr_tp[1].checked && formObj.f_curr_cd.value != ""){
		doWork('SEARCHLIST');
	}
}
function getRateQuery(){
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
		+     "  from ( "
		;
	//ex)
	//select rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut
	//from (
	//		select 'USD' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      UNION
	//		select 'JPY' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      ) rate
	if(sheetObj.RowCount()== 0){
		rateSQL += "         SELECT '" + '' + "' AS curr_cd, " 
								 + "'" + '' + "'  AS aply_fm_dt, "
								 + 0 + " AS xch_rt_ut ) rate ";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "curr_cd") + "' AS curr_cd, "
			+ "'" + sheetObj.GetCellValue(i, "aply_fm_dt") + "' AS aply_fm_dt, "
			+ sheetObj.GetCellValue(i, "rate") + " AS xch_rt_ut ";
	    	if(i < sheetObj.LastRow()){
	    		rateSQL += " UNION ";
	    	}else{
	    		rateSQL += "      ) rate ";
	    	}
		}	
	}
	return rateSQL;
}
function currRateCheck(sheetObj){
	var rtnVal=false;
	if(sheetObj.RowCount()> 0){
		for(var i=1; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "rate") <= 0 ){
				sheetObj.SelectCell(i, "rate");
				rtnVal=true;
				alert(getLabel('PFM_COM_ALT018'));
				break;
			}
		}	
	}
	return rtnVal;
}

//BINEX 요구사항, TOR 정산을 위한, Parameter Set.
function setTorVal(val){
	formObj = document.frm1;
	
	CAN_YN = val;
	
	if(CAN_YN == "Y"){	
		ajaxSendPost(setCaOfc, "reqVal", "&goWhere=aj&bcKey=searchCaOfc", "./GateServlet.gsl");
	}
}

//Calendar flag value
var firCalFlag=false;

//S : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
function setChkPeriod(){
	//Currency default 설정 (M : Multi currency, O : One Currency)
	var opt_key = "ACCT_FINC_DATE_DFLT";
	ajaxSendPost(setRdoChkPeriod, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setChkCurrency(){
	//Period default 설정 (P : Post Date, I : Invoice Date)
	var opt_key = "ACCT_FINC_CURR_DFLT";
	ajaxSendPost(setRdoChkCurrency, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setRdoChkPeriod(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == 'I'){
			formObj.f_dt_tp_radio[1].checked = true;
		}
	}
}

function setRdoChkCurrency(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == 'O'){
			formObj.f_curr_tp[1].checked = true;
		}
	} 
}
// E : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)


//#4206 Tor Print 버튼을 TOR가 아니라 CANADA의 Office대상으로 변경 
function setCaOfc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {		
		caOfcList = doc[1];		
	} 
}