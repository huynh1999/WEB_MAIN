//=========================================================
//*@FileName   : PFM_MGT_0190.jsp
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
var TOR_YN = '';
var G_GL_DATA_CREATE_STATUS = "END";

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
            cal.select(formObj.f_fr_dt,  formObj.f_to_dt, 'MM-dd-yyyy');
        break;
    }
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
	   
       case 'PRINT':
    	   if(!chkSearchCmprPrd(true, frm1.f_fr_dt, frm1.f_to_dt)){
	   			return;
	   	   }
    	   if(G_GL_DATA_CREATE_STATUS == "END"){
    		   G_GL_DATA_CREATE_STATUS ="START";
    		   setGlDataCreate('');
    	   } 
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
    	   
	   	   formObj.file_name.value='employee_performance_report.mrd';
		   formObj.title.value='Employee Performance Report';
		   var p_dt_clss_cd = "";
		   var r_dt_clss_cd = "";
		   if(formObj.f_dt_clss_cd.value == "P"){
			   p_dt_clss_cd = formObj.f_dt_clss_cd.value;
		   }else{
			   r_dt_clss_cd = formObj.f_dt_clss_cd.value;
		   }
		   
		   var param='[' + formObj.f_ofc_nm.value + ']';				// OFC_NM [1]
           param += '[' + fr_dt + ']';									// [2]
   		   param += '[' + to_dt + ']';									// [3]
   		   param += '[' + formObj.f_usr_nm.value + ']';					// [4]
   		   param += '[' + formObj.f_ofc_nm.value + ']';					// [5]  TODAY
   		   param += '[' + formObj.f_ofc_cd.value + ']';					// [6]
   		   param += '[' + formObj.s_ofc_cd.value + ']';					// [7]
   		   param += '[' + p_dt_clss_cd + ']';				// [8] - Period 옵션이 Posting  선택 결과값 P
   		   param += '[' + r_dt_clss_cd + ']';				// [9] - Period 옵션이 Regist 선택 결과값 R
   		   
//   		   param += '[]';	// [9] - G/L Report 과 동일한 param 유지를 위해, range_fr, range_to 는 없지만, 같은 value 로 사용 , 없기 때문에 ''로 사용
//   		   param += '[]';	// [10] - G/L Report 과 동일한 param 유지를 위해, range_fr, range_to 는 없지만, 같은 value 로 사용 , 없기 때문에 ''로 사용
//   		   param += '[N]';	// [11] - G/L Report 과 동일한 param 유지를 위해, range_fr, range_to 는 없지만, 같은 flag 로 사용 , 없기 때문에 'N'로 사용
//   		   param += '[N]';	// [12]	- G/L Report 과 동일한 param 유지를 위해, sub_grp 는 없지만, 같은 flag 로 사용 , 없기 때문에 'N'로 사용
//   		   param += '[]';	// [13] - G/L Report 과 동일한 param 유지를 위해, sub_grp 는 없지만, 같은 value 로 사용 , 없기 때문에 ''로 사용
//   		   
//   		   //O/B EXPENSE 추가
//   		   param += '[' + formObj.f_usr_id.value + ']';				// [30]
//   		   param += '[' + formObj.f_usrphn.value + ']';				// [31]
//   		   param += '[' + formObj.f_email.value + ']';				// [32]
//   		   param += '[]';											// [33]
//   		   param += '[T]';											// [34]	GL Link 용
//		   param += '[]';											// [35] GL Link 용
//		   param += '[]';											// [36] GL Link 용
//		   param += '[]';	    									// [37] GL Link 용
//		   param += '[]';	    									// [38] GL Link 용
//		   param += '[]';	    									// [39] GL Link 용
//		   param += '[]';											// [40] GL Link 용, GL Summary, I/S, B/S 에서 GL Detail 연결시 하이퍼 링크 속석에 추가된 param, js 에서는 value 없슴.
		   
		   //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
//		   param += '[' + TOR_YN + ']';				                // [41]
   		   
   		   formObj.rd_param.value=param;
   		   
   		   popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
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
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	setSearchDate();
	//오늘일자구하기
	//formObj.f_to_dt.value=getTodayStr();
	
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
	setChkPeriod();
	
	//GL View Table Data Create LKH 2015.02.25
	//getGlDataCreateDate();
}

function setSearchDate(){
	
	var formObj=document.frm1;
    var date="";
    var s_prd_strdt, s_prd_enddt="";           
    date=new Date(); 
    s_prd_strdt=new Date(date.getFullYear(),date.getMonth() - 1,1);    
    s_prd_enddt=new Date(date.getFullYear(),date.getMonth(),0);     
    formObj.f_fr_dt.value=mkDateFormat1(s_prd_strdt);
    formObj.f_to_dt.value=mkDateFormat1(s_prd_enddt);
	
}
function mkDateFormat1(obj) { //날짜를 MM-DD-YYYY 형식으로 변경하는 함수
	var rtnStr="";
	//Year
	var year=obj.getFullYear();
	var month=obj.getMonth() + 1;
	var day=obj.getDate();
    //Month
    if (String(month).length == 1) {
    	month="0" + month;
    }
    //Day
    if (String(day).length == 1) {
       day="0" + day;
    }
    rtnStr=month + "-" + day + "-" + year;
    return rtnStr;
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
//function doDisplay(doWhat,formObj){
//    switch(doWhat){
//        case 'DATE1':    //달력 조회 팝업 호출      
//        	var cal=new ComCalendar();
//            cal.select(formObj.f_fr_dt, 'MM-dd-yyyy');
//        break;
//        case 'DATE2':    //달력 조회 팝업 호출      
//        	var cal=new ComCalendar();
//            cal.select(formObj.f_to_dt, 'MM-dd-yyyy');
//        break;
//    }
//}
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
	
	TOR_YN = val;
	
	if(TOR_YN == "Y"){
		formObj.s_ofc_cd.value = "TOR";
	}
}

//Calendar flag value
var firCalFlag=false;


//S : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
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
