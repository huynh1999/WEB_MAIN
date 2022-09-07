//=========================================================
//*@FileName   : PFM_MGT_0180.jsp
//*@FileTitle  : Trial Balance Report
//*@Description: Trial Balance Report
//*@author     : LHK
//*@version    : 1.0 - 2013/10/12
//*@since      : 2013/10/12
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/09
//*@since      : 2014/07/09
//=========================================================
var CAN_YN = '';
var G_GL_DATA_CREATE_STATUS = "END";
var caOfcList = '';
// 페이지수 제한 하기 위함(시스템 관리)
var lv_limitRow = 8200;

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
		   doAllClear();
	   break;
       case "RPTCHECK":
		   formObj.rpt_tp[0].checked=true;
    	   formObj.rpt_tp[1].checked=true;
    	   formObj.rpt_tp[2].checked=true;
    	   formObj.rpt_tp[3].checked=true;
    	   formObj.rpt_tp[4].checked=true;
    	   formObj.rpt_tp[5].checked=true;
    	   formObj.exp_ar_ck.checked=true;
    	   formObj.exp_ap_ck.checked=true;
       break;
       case "RPTCLEAR":
    	   formObj.rpt_tp[0].checked=false;
    	   formObj.rpt_tp[1].checked=false;
    	   formObj.rpt_tp[2].checked=false;
    	   formObj.rpt_tp[3].checked=false;
    	   formObj.rpt_tp[4].checked=false;
    	   formObj.rpt_tp[5].checked=false;
    	   formObj.exp_ar_ck.checked=false;
    	   formObj.exp_ap_ck.checked=false;
       break;
       case 'PRINT':
    	   if(!chkSearchCmprPrd(true, frm1.f_fr_dt, frm1.f_to_dt)){
	   			return;
	   	   }
	   	   // #52472 [CLT] 안정성
    	   // Period Search 조건의 두 날짜의 Limit범위를 지정(단위 : 일수) System > Admin > System Option Settings에서 관리
    	   var opt_key = "GL_RPT_LIMIT_ROW";
    	   ajaxSendPost(getGlRptLimitReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
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
    	   if(formObj.rpt_tp[4].checked){
  			   rtp_type += "Accounts Payable";
  			   chk_cnt += 1;
  		   }
    	   if(formObj.rpt_tp[1].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ", Check";
    		   }else{
    			   rtp_type += "Check";
    		   }
    		   chk_cnt += 1;
   		   }
    	   if(formObj.rpt_tp[2].checked){
    		   if(chk_cnt > 0){
    			   rtp_type += ", Credit/Debit Note";
    		   }else{
    			   rtp_type += "Credit/Debit Note";
    		   }
    		   chk_cnt += 1;
    	   }
   		   if(formObj.rpt_tp[0].checked){
	   	       if(chk_cnt > 0){
	   	           rtp_type += ", Local Invoice";	
	   		   }else{
	   			   rtp_type += "Local Invoice";
	   		   }
	   	       chk_cnt += 1;
   		   }
   		   if(formObj.rpt_tp[3].checked){
	   			if(chk_cnt > 0){
	   				rtp_type += ", Deposit";
	   			}else{
	   				rtp_type += "Deposit";
	   			}
	   			chk_cnt += 1;
		   }
   		   if(formObj.rpt_tp[5].checked){
	   			if(chk_cnt > 0){
	   				rtp_type += ", Journal";
	   			}else{
	   				rtp_type += "Journal";
	   			}
	   			chk_cnt += 1;
		   }
	   	   if(formObj.rpt_tp[6].checked){
	   		    if(chk_cnt > 0){
	   				rtp_type += ", O/B Expense";
	   			}else{
	   				rtp_type += "O/B Expense";
	   			}
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
	   	   if(formObj.exp_ap_ck.checked){
		   		if(chk_cnt > 0){
		   			rtp_type += ", A/P Expense";
	   			}else{
	   				rtp_type += "A/P Expense";
	   			}
		   }
	   	   formObj.file_name.value='trial_balance.mrd';
		   formObj.title.value='Trial Balance';
		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
           param += '[' + fr_dt + ']';									// [2]
   		   param += '[' + to_dt + ']';									// [3]
   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
   		   param += '[]';												// [5]  TODAY
   		   param += '[' + rtp_type + ']';								// [6]
   		   param += '[' + fr_dt + ']';									// [7]
   		   param += '[' + to_dt + ']';									// [8]
   		   var lc_yn="N";
   		   var cr_yn="N";
   		   var ap_yn="N";
   		   var dp_yn="N";
   		   var ck_yn="N";
   		   var jr_yn="N";
   		   var exp_ap_yn="N";
   		   var chk_cnt=0;
   		   if(formObj.rpt_tp[0].checked){
   			   lc_yn="Y";
   			   chk_cnt += 1;
  		   }
   		   if(formObj.rpt_tp[1].checked){
   			   ck_yn="Y";
   			   chk_cnt += 1;
  		   }
   		   if(formObj.rpt_tp[2].checked){
   			   cr_yn="Y";
   			   chk_cnt += 1;
  		   }
    	   if(formObj.rpt_tp[3].checked){
    		   dp_yn="Y";
    		   chk_cnt += 1;
    	   }
    	   if(formObj.rpt_tp[4].checked){
    		   ap_yn="Y";
    		   chk_cnt += 1;
    	   }
   		   if(formObj.rpt_tp[5].checked){
   			   jr_yn="Y";
   			   chk_cnt += 1;
   		   }
   		   if(formObj.exp_ap_ck.checked){
   			   exp_ap_yn="Y";
   		   }
   		   param += '[' + lc_yn + ']';								// [9]
   		   param += '[' + cr_yn + ']';								// [10]
   		   param += '[' + ap_yn + ']';								// [11]
   		   param += '[' + dp_yn + ']';								// [12]
   		   param += '[' + ck_yn + ']';								// [13]
   		   param += '[' + jr_yn + ']';								// [14]
   		   var lc_union="Y";
   		   var cr_union="Y";
   		   var ap_union="Y";
   		   var dp_union="Y";
   		   var ck_union="Y";
   		   var jr_union="Y";
   		   /*
   		   if(lc_yn == "N"){
   			   lc_union="N";
   		   }
   			if(cr_yn == "N"){
   			   cr_union="N";
   		   }
   		   if(ap_yn == "N" && exp_ap_yn == "N"){
   			   ap_union="N";
   		   }
   		   if(dp_yn == "N"){
   			   dp_union="N";
   		   }
   		   if(ck_yn == "N"){
   			   ck_union="N";
   		   }
   		   if(jr_yn == "N"){
   			   jr_union="N";
   		   }
   		   if(chk_cnt == 0){
   		   }else if(chk_cnt == 1){
   			   lc_union="N";
   			   cr_union="N";
   			   ap_union="N";
	   		   dp_union="N";
	   		   ck_union="N";
	   		   jr_union="N";
   		   }else{
   			   if(lc_yn == "N"){
   				   cr_union="N";
   			   }
   			   if(lc_yn == "N" && cr_yn == "N"){
   				   ap_union="N";
   			   }
   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && exp_ap_yn == "N"){
   				   ck_union="N";
   			   }
   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && ck_yn == "N"){
   				   dp_union="N";
   			   }
   			   if(lc_yn == "N" && cr_yn == "N" && ap_yn == "N" && ck_yn == "N" && dp_yn == "N"){
   				   jr_union="N";
   			   }
   		   }
   		   */
   		   // LHK, 20131202, AR(G&A) 추가로 인해 변경, 
   		   // LHK 20131205 , GL Report View 참조하도록 수정하면서 union 관련 param은 사용되지 않음
   		   // GL Report Link 관련 param 추가시 많은 수정을 요함, 
   		   // 사용되지 않는 아래 param 15 을 이용해서 추가된 AR(G&A) check 여부로 사용함. 
   		   lc_union="N"
   		   if(formObj.exp_ar_ck.checked){
   			   lc_union="Y";
   		   }   
   		   param += '[' + lc_union + ']';							// [15]
   		   param += '[' + cr_union + ']';							// [16]
   		   param += '[' + ap_union + ']';							// [17]
   		   param += '[' + dp_union + ']';							// [18]
   		   param += '[' + ck_union + ']';							// [19]
   		   param += '[' + jr_union + ']';							// [20]
   		   param += '[]';	// [21] - G/L Report 과 동일한 param 유지를 위해, range_fr, range_to 는 없지만, 같은 value 로 사용 , 없기 때문에 ''로 사용
   		   param += '[]';	// [22] - G/L Report 과 동일한 param 유지를 위해, range_fr, range_to 는 없지만, 같은 value 로 사용 , 없기 때문에 ''로 사용
   		   param += '[N]';	// [23] - G/L Report 과 동일한 param 유지를 위해, range_fr, range_to 는 없지만, 같은 flag 로 사용 , 없기 때문에 'N'로 사용
   		   param += '[N]';	// [24]	- G/L Report 과 동일한 param 유지를 위해, sub_grp 는 없지만, 같은 flag 로 사용 , 없기 때문에 'N'로 사용
   		   param += '[]';	// [25] - G/L Report 과 동일한 param 유지를 위해, sub_grp 는 없지만, 같은 value 로 사용 , 없기 때문에 ''로 사용
   		   //O/B EXPENSE 추가
   		   if( (formObj.rpt_tp[0].checked || formObj.rpt_tp[1].checked || formObj.rpt_tp[2].checked || formObj.rpt_tp[3].checked ||
   				formObj.rpt_tp[4].checked || formObj.rpt_tp[5].checked) && formObj.rpt_tp[6].checked){
   			   ob_union="Y";
   			   ob_yn="Y";
   		   }else{
   		       if(formObj.rpt_tp[6].checked){
   		    	   ob_union="N";
   		    	   ob_yn="Y";
   		       }else{
   		    	   ob_union="N";
   		    	   ob_yn="N";
   		       }
   		   }
   		   param += '[' + ob_yn + ']';								// [26]
   		   param += '[' + ob_union + ']';							// [27]
   		   param += '[' + exp_ap_yn + ']';								// [28]	 
   		   param += '[Y]';											// [29] beg_bal_chk
   		   param += '[' + formObj.f_usr_id.value + ']';				// [30]
   		   param += '[' + formObj.f_usrphn.value + ']';				// [31]
   		   param += '[' + formObj.f_email.value + ']';				// [32]
   		   //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
   		   if(CAN_YN!='Y'){
			   var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
	   		   param += '[' + selectedValues + ']';						// [33]
		   }else{
			   param += '[' + caOfcList + ']';				// [33]
		   }
   		   //param += '[' + formObj.s_ofc_cd.value + ']';				// [33]
   		   param += '[T]';											// [34]	GL Link 용
		   param += '[]';											// [35] GL Link 용
		   param += '[]';											// [36] GL Link 용
		   param += '[]';	    									// [37] GL Link 용
		   param += '[]';	    									// [38] GL Link 용
		   param += '[]';	    									// [39] GL Link 용
		   param += '[]';											// [40] GL Link 용, GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속석에 추가된 param, js 에서는 value 없슴.
		   
		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
		   param += '[' + CAN_YN + ']';				                // [41]
		   
   		   if( !formObj.rpt_tp[0].checked && !formObj.rpt_tp[1].checked && !formObj.rpt_tp[2].checked &&
   			   !formObj.rpt_tp[3].checked && !formObj.rpt_tp[4].checked && !formObj.rpt_tp[5].checked && 
   			   !formObj.rpt_tp[6].checked && !formObj.exp_ar_ck.checked && !formObj.exp_ap_ck.checked){
   			   //Select Report Type!!
   			   alert(getLabel('PFM_COM_ALT005')+ "\n\n: PFM_MGT_0090.675");
   			   return;
   		   }
   		   
   		   //#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
   		   var dtTp_check ="";
   		   if(formObj.f_dt_tp_radio[0].checked == true){
   			   dtTp_check = 'P';								
   		   } else {
   			   dtTp_check = 'I';								
   		   } 
   		   param += '[' + dtTp_check + ']';	                         // [42]
   		   param += '[]';				                			 // [43] Cash Basis
		   //#52472 [CLT] 안정성 : Trial Balance Report에서 GL Report 호출하는 경우에만 설정,  GL Report의 출력 Limit ROW를 설정하기 위함.
		   param += '[' + lv_limitRow + ']';	                         // [44]
   		    
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
    
    //#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
    //#5070 [BINEX VISIBILITY] Container Status at Terminal (#3893 +)
    setTimeout(function(){
		if (ofcFlg == 'Y'){
   	   	 	$('#s_ofc_cd').multipleSelect('uncheckAll');
   	    }
	 }, 100);
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	formObj.f_to_dt.value=getTodayStr();
	
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
	//setChkPeriod(); #52526 Balance Sheet/Trial Balance 의 Invoice Date 기능 Hidden 처리 
	
	//GL View Table Data Create LKH 2015.02.25
	//getGlDataCreateDate();
	
	var opt_key = "ACCT_FINC_INV_DT_OPT";
	ajaxSendPost(setAcctFincInvDtOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

}
function doAllClear(){
	//OFVFOUR-7897 [AME LOGIS] TRIAL BALANCE MISMATCH
	for(var i=0; i < 6; i++){
		frm1.rpt_tp[i].disabled=false;
		frm1.rpt_tp[i].checked=true;
	}
	frm1.exp_ck.disabled=false;
	frm1.exp_ck.checked=true;
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
/*#52526 Balance Sheet/Trial Balance 의 Invoice Date 기능 Hidden 처리 */
function setChkPeriod(){
	//Period default 설정 (P : Post Date, I : Invoice Date)
	var opt_key = "ACCT_FINC_DATE_DFLT";
	ajaxSendPost(setRdoChkPeriod, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
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


//E : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)

//#52472 [CLT] 안정성
//Trial Balance Report에서 GL Report 호출하는 경우,  GL Report의 출력 Limit ROW를 설정
//opt_key = "GL_RPT_LIMIT_ROW"
function getGlRptLimitReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		lv_limitRow=doc[1];
	}

	if(G_GL_DATA_CREATE_STATUS == "END"){
		G_GL_DATA_CREATE_STATUS ="START";
		setGlDataCreate('');
	} 
}

//#1004 [AGL] BALANCE SHEET AND TRIAL BALANCE TO HAVE INVOICE DATE OPTION
function setAcctFincInvDtOpt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "Y"){
			formObj.f_dt_tp_radio2.style.display = 'inline';
			document.getElementById("f_dt_tp_radio2_label").style.display = 'inline';
			setChkPeriod();
		}else{
			formObj.f_dt_tp_radio2.style.display = 'none';
			document.getElementById("f_dt_tp_radio2_label").style.display = 'none';
		}
	}else{
		formObj.f_dt_tp_radio2.style.display = 'none';
		document.getElementById("f_dt_tp_radio2_label").style.display = 'none';
	}
}

//#4206 Tor Print 버튼을 TOR가 아니라 CANADA의 Office대상으로 변경
function setCaOfc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {		
		caOfcList = doc[1];		
	} 
}