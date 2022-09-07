/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0090.jsp
*@FileTitle  : G/L Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/17
=========================================================*/
var TOR_YN = '';
var G_GL_DATA_CREATE_STATUS = "END";

var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}


function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
	   case "ALLCLEAR":
		   //#2439 [LBS] Tax Report Clear 버튼 기능 점검
		   doAllClear();
			/*var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
			window.location.href = currLocUrl;*/		   
		   
	   break;
       case "RPTCHECK":
    	   for(var i=0; i < 2; i++){
    		   if(!formObj.rpt_tp[i].disabled){
    			   formObj.rpt_tp[i].checked=true;
    		   }
    	   }
    	   if(!formObj.exp_ar_ck.disabled){
    		   if (GA_AR_YN == "Y"){
        		   formObj.exp_ar_ck.checked=true;
    		   }
		   } else {
			   formObj.exp_ar_ck.checked=false;
		   }
    	   
    	   if(!formObj.exp_ap_ck.disabled){
    		   if (GA_AP_YN == "Y"){
    			   formObj.exp_ap_ck.checked=true;
    		   }
		   } else {
			   formObj.exp_ap_ck.checked=false;
		   }
    	   //#3030 [BNX JAPAN]Tax Report DC 데이터 추가요청
    	   formObj.debit_ck.checked=true;
    	   formObj.credit_ck.checked=true;
       break;
       case "RPTCLEAR":
    	   formObj.rpt_tp[0].checked=false;
    	   formObj.rpt_tp[1].checked=false;
    	   formObj.exp_ar_ck.checked=false;
    	   formObj.exp_ap_ck.checked=false;
    	   //#3030 [BNX JAPAN]Tax Report DC 데이터 추가요청
    	   formObj.debit_ck.checked=false;
    	   formObj.credit_ck.checked=false;
       break;
       case "CURR_SEARCH":
           formObj.f_cmd.value=SEARCHLIST01;
           var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
           
 	       if(s_curr_opt[0].checked == true){
	 	   	   return;                    
		   }
 	       
		   if(formObj.s_curr_cd.value == ""){
		    	//Please, select the [To Currency]
		    	alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_TCUR'));
		    	formObj.s_curr_cd.focus();  
				return;
		   }
		   sheetObj.DoSearch("./PFM_MGT_0090_1GS.clt", FormQueryString(formObj) );
       break;
       case 'PRINT':
    	   if(!chkSearchCmprPrd(true, frm1.f_fr_dt, frm1.f_to_dt)){
    			return;
    	   }
    	   
    	   // #52472 [CLT] 안정성
    	   // Period Search 조건의 두 날짜의 Limit범위를 지정(단위 : 일수) System > Admin > System Option Settings에서 관리
    	   var opt_key = "GL_RPT_TERM_PERIOD";
    	   ajaxSendPost(getGlSrhTrmPeriodReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    	   return;
    	   break; 	   
       case 'GL_CREATE_END_ACTION':
    	   if(!chkSearchCmprPrd(true, frm1.f_fr_dt, frm1.f_to_dt)){
    			return;
    	   }
    	   var fr_dt=formObj.f_fr_dt.value.replaceAll("-", "");
    	   var to_dt=formObj.f_to_dt.value.replaceAll("-", "");
    	   fr_dt=fr_dt.substring(4,8) + fr_dt.substring(0,2) + fr_dt.substring(2,4);
    	   to_dt=to_dt.substring(4,8) + to_dt.substring(0,2) + to_dt.substring(2,4);
    	   var rtp_type="";
    	   var chk_cnt=0;
    	   var beg_bal_chk='N';
    	   if(formObj.rpt_tp[0].checked){
    		   rtp_type += "A/R";
  			   chk_cnt += 1;
   		   }
    	   if(formObj.exp_ar_ck.checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ", A/R(G&A)";
    		   }else{
    			   rtp_type += "A/R(G&A)";
    		   }
    		   chk_cnt += 1;
    	   }
    	   if(formObj.rpt_tp[1].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ", Account Payable";
    		   }else{
    			   rtp_type += "Account Payable";
    		   }  			   
  			   chk_cnt += 1;
  		   }   		   
	   	   if(formObj.exp_ap_ck.checked){
		   		if(chk_cnt > 0){
		   			rtp_type += ", A/P(G&A)";
	   			}else{
	   				rtp_type += "A/P(G&A)";
	   			}
		   		chk_cnt += 1;
		   }
	   	   //#3030 [BNX JAPAN]Tax Report DC 데이터 추가요청
	   	   if(formObj.debit_ck.checked){
		   		if(chk_cnt > 0){
		   			rtp_type += ", Debit";
	   			}else{
	   				rtp_type += "Debit";
	   			}
		   		chk_cnt += 1;
		   }
	   	   if(formObj.credit_ck.checked){
		   		if(chk_cnt > 0){
		   			rtp_type += ", Credit";
	   			}else{
	   				
	   				rtp_type += "Credit";
	   			}
		   }
		   //One Currency 일 경우, Param Flag 
		   var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
		   var multi_curr_flg="T";
 	       if(s_curr_opt[1].checked == true){
 	    	  multi_curr_flg="";                    
		   }
 	       
 	       // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
   		   // “TOTAL”, “SORT BY OFFICE”, “SORT BY G/L”  옵션
   		   var sortOpt = "";
   		   //mrd파일에서 넘겨주는 파라
   		   var pOfcCd = "";

		   formObj.file_name.value='tax_report.mrd';
   		   formObj.title.value='TAX Report';

		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
           param += '[' + fr_dt + ']';									// [2]
   		   param += '[' + to_dt + ']';									// [3]
   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
   		   param += '[' + TODAY + ']';									// [5]
   		   param += '[' + rtp_type + ']';								// [6]
   		   param += '[' + fr_dt + ']';									// [7]
   		   param += '[' + to_dt + ']';									// [8]
   		   var ar_yn     = "";     // A/R
   		   var exp_ar_yn = "";     // A/R(G&A)
   		   var arExp_yn  = "";     // A/R+A/R(G&A)
   		   var ap_yn     = "";     // A/P
   		   var exp_ap_yn = "";     // A/P(G&A) 
   		   var apExp_yn  = "";     // A/P+A/P(G&A)
   		   var chk_cnt=0;
   		   /*
   		   if(formObj.rpt_tp[0].checked){
   			   ar_yn="Y";
   			   chk_cnt += 1;
  		   }
    	   if(formObj.rpt_tp[1].checked){
    		   ap_yn="Y";
    		   chk_cnt += 1;
    	   }
   		   if(formObj.exp_ar_ck.checked){
   			   exp_ar_yn="Y";
   		   }
   		   if(formObj.exp_ap_ck.checked){
			   exp_ap_yn="Y";
		   }
   		   if(formObj.rpt_tp[0].checked && formObj.exp_ar_ck.checked){
   			   arExp_yn = "Y";
		   }
   		   if(formObj.rpt_tp[1].checked && formObj.exp_ap_ck.checked){
			   apExp_yn = "Y";
		   }
		   */
   		   if(formObj.rpt_tp[0].checked){
			   ar_yn="Y";                      			// AR
		   }
		   if(formObj.exp_ar_ck.checked){
			   exp_ar_yn="Y";                      		// AR_GnA
		   }
		   if(formObj.rpt_tp[1].checked){
			   ap_yn = "Y";                     		// Account_Payable
		   }
		   if(formObj.exp_ap_ck.checked && formObj){
			   exp_ap_yn = "Y";                     	// AP_GnA
		   }
		   
		   param += '[' + ar_yn + ']';								// [9]     A/R
		   param += '[' + exp_ar_yn + ']';							// [10]    A/R(G&A)     
		   param += '[' + ap_yn + ']';								// [11]    A/P
		   param += '[' + exp_ap_yn + ']';							// [12]    A/P(G&A)
		   param += '[]';											// [13]    A/R+A/R(G&A)
		   param += '[]';											// [14]	   A/P+A/P(G&A)	
   		   
		   
//   		   var lc_union="Y";
//   		   var cr_union="Y";
//   		   var ap_union="Y";
//   		   var dp_union="Y";
//   		   var ck_union="Y";
//   		   var jr_union="Y";

   		   // LHK, 20131202, AR(G&A) 추가로 인해 변경, 
   		   // LHK 20131205 , GL Report View 참조하도록 수정하면서 union 관련 param은 사용되지 않음
   		   // GL Report Link 관련 param 추가시 많은 수정을 요함, 
   		   // 사용되지 않는 아래 param 15 을 이용해서 추가된 AR(G&A) check 여부로 사용함. 
   		   lc_union="N";
   		   if(formObj.exp_ar_ck.checked){
   			   lc_union="Y";
   		   }   
   		   param += '[]';							// [15]
   		   param += '[]';							// [16]
   		   param += '[]';							// [17]
   		   param += '[]';							// [18]
   		   param += '[]';							// [19]
   		   param += '[]';							// [20]
   		   var range_yn="N";
   		   param += '[]';											// [21]
   		   param += '[]';											// [22]
   		   
   		   param += '[' + range_yn + ']';							// [23]
		   param += '[N]';											// [24]
		   var ntyn_all_check = "";
   		   if(formObj.f_ro_tp_radio[0].checked == true){
   			   ntyn_all_check = 'N';								
		   } else {			   
			   ntyn_all_check = '';								
		   } 
   		   param += '[' + ntyn_all_check + ']';						// [25]  Report Option 여부 (A: Non-Taxable,Taxable )
   		   param += '[]';											// [26]
   		   param += '[]';											// [27]
   		   param += '[' + exp_ap_yn + ']';							// [28]	 
   		   param += '[' + beg_bal_chk + ']';						// [29]
   		   param += '[' + formObj.f_usr_id.value + ']';				// [30]
   		   param += '[' + formObj.f_usrphn.value + ']';				// [31]
   		   param += '[' + formObj.f_email.value + ']';				// [32]
   		   param += '[' + formObj.s_ofc_cd.value + ']';				// [33]
   		   param += '[' + multi_curr_flg + ']';						// [34]
   		   param += '[' + formObj.s_curr_cd.value + ']';			// [35]
   		   param += '[' + getRateQuery() + ']';						// [36]
   		   var ntyn_check = "";
   		   if(formObj.f_ro_tp_radio[1].checked == true){
   			   ntyn_check = 'N';								
		   } else {
			   
			   ntyn_check = 'Y';								
		   } 
   		   
   		   param += '[' + ntyn_check + ']';	    					// [37] Report Option 여부 (N:Non-Taxable)
   		   
   		   // #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
   		   param += '[' + sortOpt + ']';							// [38]
   		   param += '[' + pOfcCd + ']';								// [39]
   		   param += '[]';											// [40] GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속석에 추가된 param, js 에서는 value 없슴. 
   		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
		   param += '[' + TOR_YN + ']';				                // [41]
		   //#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
   		   var dtTp_check ="";
   		   if(formObj.f_dt_tp_radio[0].checked == true){
   			   dtTp_check = '';								
   		   } else {
   			   dtTp_check = 'I';								
   		   } 
   		   param += '[' + dtTp_check + ']';	                         // [42]
   		   var chk_cb ="";
   		   param += '[' + chk_cb + ']';	                         	 // [43] Cash Basis
   		   // #52472 [CLT] 안정성
   		   param += '[]';	                         	 			 // [44] Balance Sheet Report에서 GL Report 호출하는 경우에만 설정,  GL Report의 출력 Limit ROW를 설정하기 위함.
   		   
   		   //#3030 [BNX JAPAN]Tax Report DC 데이터 추가요청
		   if(formObj.debit_ck.checked){
			   param += '[' + "Y" + ']';
		   }else{
			   param += '[]';
		   }
		   if(formObj.credit_ck.checked){
			   param += '[' + "Y" + ']';
		   }else{
			   param += '[]';
		   }
   		   			   
   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && 
   			   !formObj.exp_ar_ck.checked && !formObj.exp_ap_ck.checked && 
   			   !formObj.debit_ck.checked  && !formObj.credit_ck.checked){
   			   //Select Report Type!!
   			   alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPTT'));
   			   return;
   		   }

   		   formObj.rd_param.value=param;
   		   //popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
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
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	//doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	//doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	//doWork('SEARCHLIST');
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
	doSetDt();
	formObj.s_curr_cd.value=ofc_curr_cd;
	
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
	setChkPeriod();
	setChkCurrency();
	
	//GL View Table Data Create LKH 2015.02.25
	//getGlDataCreateDate();
	
	if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=true;
		
		swichChk2();
		begBalChk();
	}
}
function doAllClear(){
	 var formObj=document.frm1;
	 
	//LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);	 
	//오늘일자구하기
	doSetDt();
	formObj.s_curr_cd.value=ofc_curr_cd;
	
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
	setChkPeriod();
	setChkCurrency();
	
	//GL View Table Data Create LKH 2015.02.25
	//getGlDataCreateDate();
	
	if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=true;
		
		swichChk2();
		begBalChk();
	}
	
	formObj.f_ro_tp_radio[0].checked = true;
	formObj.s_curr_opt[0].checked = true;
	
	doWork('RPTCHECK');
	
	docObjects[0].RemoveAll();
	/*
	for(var i=0; i < 7; i++){
		frm1.rpt_tp[i].disabled=false;
		frm1.rpt_tp[i].checked=true;
	}
	
	if (GA_AR_YN == "Y"){
		frm1.exp_ar_ck.checked=true;
		frm1.exp_ar_ck.disabled=false;
	}
	if (GA_AP_YN == "Y"){
		frm1.exp_ap_ck.checked=true;
		frm1.exp_ap_ck.disabled=false;
	}*/
	
	/*frm1.exp_ar_ck.disabled=false;
	frm1.exp_ar_ck.checked=true;
	frm1.exp_ap_ck.disabled=false;
	frm1.exp_ap_ck.checked=true;*/
	
	/*
	for(var i=0; i < 3; i++){
		frm1.gl_tp[i].disabled=false;
		frm1.gl_tp[i].checked=false;
	}
	
	if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=true;
	}
	
	frm1.sum_dtl[0].checked=true;
	frm1.range_fr.value=frm1.tmp_range_fr.value;
	frm1.range_to.value=frm1.tmp_range_to.value;
	frm1.sub_grp.value='';
	
	formObj.chk_cb.checked=false;
	
	*/
}
function doSetDt(){
    var formObj=document.frm1;
	//오늘일자구하기
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);
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
	TODATE=getEndDate(FROMDATE);
	TODAY=year+month+date;
	formObj.f_fr_dt.value=FROMDATE;
	formObj.f_to_dt.value=TODATE;
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
                SetSheetHeight(132);
                SetVisible(true);

    		} 
    	break;    	
    	case 2:      //IBSheet1 init
            with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('PFM_MGT_0090_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                   {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetVisible(false);
            
           }                                                      
         break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_fr_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_to_dt, 'MM-dd-yyyy');
        break;
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
    	   mm="0"+mm;
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function doRptTypeDisable(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		formObj.rpt_tp[1].checked=false;
		formObj.rpt_tp[3].checked=false;
		formObj.rpt_tp[5].checked=false;
		formObj.rpt_tp[1].disabled=true;
		formObj.rpt_tp[3].disabled=true;
		formObj.rpt_tp[5].disabled=true;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		//G/L Range Clear
		formObj.range_fr.value="";
		formObj.range_to.value="";
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[1].disabled=true;
		//AP EXPENSE CHECK BOX 활성화
		/*
		exp_view_layer.style.display="inline";
		exp_none_layer.style.display="none";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
		formObj.rpt_tp[6].checked=false;
		*/
	}else{
		formObj.rpt_tp[1].disabled=false;
		formObj.rpt_tp[3].disabled=false;
		formObj.rpt_tp[5].disabled=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.range_fr.value=formObj.tmp_range_fr.value;
		formObj.range_to.value=formObj.tmp_range_to.value;
		
		//formObj.gl_tp[1].disabled=false;
		
		if (GA_AR_YN != "Y" || GA_AP_YN != "Y"){
			formObj.gl_tp[1].disabled=true;
		} else {
			formObj.gl_tp[1].disabled=false;
		}
		
		//AP EXPENSE CHECK BOX 비활성화
		/*
		exp_view_layer.style.display="none";
		exp_none_layer.style.display="inline";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
		*/
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;
	}
	if(formObj.gl_tp[2].checked){
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ap_ck.checked=false;
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ap_ck.disabled=true;
	}else{
		if (GA_AR_YN != "Y"){
			formObj.exp_ar_ck.checked=false;
			formObj.exp_ar_ck.disabled=true;
		} else {
			formObj.exp_ar_ck.disabled=false;
		}
		
		if (GA_AP_YN != "Y"){
			formObj.exp_ap_ck.checked=false;
			formObj.exp_ap_ck.disabled=true;
		} else {
			formObj.exp_ap_ck.disabled=false;
		}
	}
}
function swichChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		doRptTypeDisable();
	}
	if(formObj.gl_tp[1].checked){
		formObj.gl_tp[2].checked=false;
		//LHK 20131205 Report 로직과 상이하여 수정함. 
		formObj.rpt_tp[0].checked=false;
		formObj.rpt_tp[2].checked=false;
		formObj.rpt_tp[4].checked=false;
		formObj.rpt_tp[0].disabled=true;
		formObj.rpt_tp[2].disabled=true;
		formObj.rpt_tp[4].disabled=true;
		/*formObj.exp_ar_ck.checked=true;
		formObj.exp_ap_ck.checked=true;
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;*/
		
		if (GA_AR_YN != "Y"){
			formObj.exp_ar_ck.checked=false;
			formObj.exp_ar_ck.disabled=true;
		} else {
			formObj.exp_ar_ck.checked=true;
			formObj.exp_ar_ck.disabled=false;
		}
		
		if (GA_AP_YN != "Y"){
			formObj.exp_ap_ck.checked=false;
			formObj.exp_ap_ck.disabled=true;
		} else {
			formObj.exp_ap_ck.checked=true;
			formObj.exp_ap_ck.disabled=false;
		}
		
		/*
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ap_ck.checked=false;
		formObj.exp_ap_ck.disabled=true;
		*/
		return;
	}else{
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;
		/*
		formObj.exp_ar_ck.disabled=false;
		formObj.exp_ap_ck.disabled=false;
		*/
	}
}
function swichChk2(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		doRptTypeDisable();
	}
	if(formObj.gl_tp[2].checked){
		formObj.gl_tp[1].checked=false;
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ap_ck.checked=false;
		formObj.exp_ap_ck.disabled=true;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		return;
	}else{
		if (GA_AR_YN != "Y"){
			formObj.exp_ar_ck.checked=false;
			formObj.exp_ar_ck.disabled=true;
		} else {
			formObj.exp_ar_ck.disabled=false;
		}
		
		if (GA_AP_YN != "Y"){
			formObj.exp_ap_ck.checked=false;
			formObj.exp_ap_ck.disabled=true;
		} else {
			formObj.exp_ap_ck.disabled=false;
		}
	}
}
/*
function expenseChk(){
	formObj=document.frm1;
	if(formObj.exp_ck.checked){
		formObj.rpt_tp[0].disabled=true;
		formObj.rpt_tp[2].disabled=true;
		formObj.rpt_tp[4].disabled=true;
		formObj.rpt_tp[0].checked=false;
		formObj.rpt_tp[2].checked=false;
		formObj.rpt_tp[4].checked=false;
		formObj.rpt_tp[6].checked=false;
	}else{
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
	}
}
*/
/*
function obexpenseChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		if(formObj.rpt_tp[6].checked){
			formObj.rpt_tp[0].disabled=true;
			formObj.rpt_tp[2].disabled=true;
			formObj.rpt_tp[4].disabled=true;
			formObj.rpt_tp[0].checked=false;
			formObj.rpt_tp[2].checked=false;
			formObj.rpt_tp[4].checked=false;
			formObj.exp_ck.checked=false;
		}else{
			formObj.rpt_tp[0].disabled=false;
			formObj.rpt_tp[2].disabled=false;
			formObj.rpt_tp[4].disabled=false;
			formObj.rpt_tp[0].checked=true;
			formObj.rpt_tp[2].checked=true;
			formObj.rpt_tp[4].checked=true;
			//formObj.exp_ck.checked = true;
		}
	}
}
*/
//Detail 옵션 선택하는 경우 OR By Billing Code 옵션 선택하는 경우 Uncheck 하고 disable
function begBalChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked || formObj.sum_dtl[1].checked){
			formObj.beg_bal_chk.disabled=true;
			formObj.beg_bal_chk.checked=false;
	}else{
		formObj.beg_bal_chk.disabled=false;
	}
}
//#26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664
//선택한 office가 "ALL"인 경우에만 활성화
function selOficeDisplay(selOfc) {
	/*
	var strSelOfc = String(selOfc.value);
	var sortByTd11 = document.getElementById("sort_by_td11");
	var sortByTd12 = document.getElementById("sort_by_td12");
	var sortByTd21 = document.getElementById("sort_by_td21");
	var sortByTd22 = document.getElementById("sort_by_td22");
	var sortByTd31 = document.getElementById("sort_by_td31");
	var sortByTd32 = document.getElementById("sort_by_td32");
	if (strSelOfc == "") {
		sortByTd11.style.display = "inline";
		sortByTd12.style.display = "inline";
		sortByTd21.style.display = "inline";
		sortByTd22.style.display = "inline";
		sortByTd31.style.display = "inline";
		sortByTd32.style.display = "inline";
		// Total Default;
		document.frm1.sort_by_rd[0].checked = true;
	} else {
		sortByTd11.style.display = "none";
		sortByTd12.style.display = "none";
		sortByTd21.style.display = "none";
		sortByTd22.style.display = "none";
		sortByTd31.style.display = "none";
		sortByTd32.style.display = "none";
	}
	*/
}
//Calendar flag value
var firCalFlag=false;
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

//BINEX 요구사항, TOR 정산을 위한, Parameter Set.
function setTorVal(val){
	
	formObj = document.frm1;
	
	TOR_YN = val;
	
	if(TOR_YN == "Y"){
		formObj.s_ofc_cd.value = "TOR";
	}
	
}

// S : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
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
			formObj.s_curr_opt[1].checked = true;
		}
	} 
}
// E : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)

function cashBasisChk(){
	var formObj=document.frm1;
	if(formObj.chk_cb.checked){
		for(var i=0; i < 7; i++){
			formObj.rpt_tp[i].disabled=true;
			formObj.rpt_tp[i].checked=false;
		}
		formObj.exp_ar_ck.disabled=true;
		formObj.exp_ar_ck.checked=false;
		formObj.exp_ap_ck.disabled=true;
		formObj.exp_ap_ck.checked=false;
		
		formObj.rpt_tp[1].disabled=false;
		formObj.rpt_tp[1].checked=true;
		formObj.rpt_tp[3].disabled=false;
		formObj.rpt_tp[3].checked=true;
		formObj.rpt_tp[5].disabled=false;
		
		formObj.gl_tp[0].disabled=true;
		formObj.gl_tp[0].checked=false;
		formObj.gl_tp[1].disabled=true;
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[2].disabled=true;
		formObj.gl_tp[2].checked=false;
	}else{
		doAllClear();
	}
}

// #52472 [CLT] 안정성
// Period Search 조건의 두 날짜의 Limit범위를 지정(단위 : 일수) TB_SYS_OPT테입블에서 취득한 값
// opt_key = "GL_RPT_TERM_PERIOD"
function getGlSrhTrmPeriodReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var limitDay = 0;
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		limitDay=doc[1];
	}
	
	// Summury가 아닌경우, 날짜범위체크 LSY 2016.03.17
//	if(!formObj.sum_dtl[0].checked){
		if ( getDaysBetweenFormat(formObj.f_fr_dt, formObj.f_to_dt, "MM-dd-yyyy") > limitDay) {
			alert(getLabel2('FMS_COM_ALT087', new Array(limitDay)));
			return;
		}
//	}
   
	if(G_GL_DATA_CREATE_STATUS == "END"){
		G_GL_DATA_CREATE_STATUS ="START";
		setGlDataCreate('');
	} 
}