//=========================================================
//*@FileName   : PFM_MGT_0100.jsp
//*@FileTitle  : Balance Sheet Report
//*@Description: Balance Sheet Report
//*@author     : Chungrue
//*@version    : 1.0 - 2012/02/06
//*@since      : 2012/02/06
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/10
//*@since      : 2014/07/10
//=========================================================

var CAN_YN = '';
var G_GL_DATA_CREATE_STATUS = "END";
var caOfcList = '';
var pdf = false;
// 페이지 수를 제어하기 위함
var lv_limitRow = 8200;
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
	    case 'PRINT':
	       // #52472 [CLT] 안정성
    	   // Period Search 조건의 두 날짜의 Limit범위를 지정(단위 : 일수) System > Admin > System Option Settings에서 관리
    	   var opt_key = "GL_RPT_LIMIT_ROW";
    	   ajaxSendPost(getGlRptLimitReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	 	   return;
	 	   break; 	   
       case 'GL_CREATE_END_ACTION':
    	   	var to_dt=formObj.f_fr_dt.value.replaceAll("-", "");
    	   	to_dt=to_dt.substring(4,8) + to_dt.substring(0,2) + to_dt.substring(2,4);
    	    //해당년의 1월1일
    	    var fr_dt=to_dt.substring(0,4) + "0101"; 
    	   	var rtp_opt="";
    	   	var chk_cnt=0;
    	   	var none_begin_dt="";
    	   	var file_name="";
    		//formObj.file_name.value = 'balance_sheet.mrd';	LHK, 01,02 으로 분기해서 사용, Qyery 만 다름 
    		if(formObj.rpt_opt[0].checked){
    			if(formObj.rtp_type[0].checked){
    				file_name='balance_sheet_01.mrd';
    			}else{
    				file_name='balance_sheet_yearly_01.mrd';	//query 와 동일, Yearly Comparison 로직 추가됨
    			}
    			//FC_GET_BEGIN_DATE Search
		    	var parmStr='&goWhere=aj&bcKey=getBeginningDate&yearEndDate='+to_dt;
		    	ajaxSendPost(getBeginningDate,  'reqVal', parmStr, './GateServlet.gsl');
    			fr_dt=s_beginnin_dt;
    			rtp_opt="1";
    		}else if(formObj.rpt_opt[1].checked){
    			if(formObj.rtp_type[0].checked){
    				file_name='balance_sheet_02.mrd';
    			}else{
    				file_name='balance_sheet_yearly_02.mrd';	//query 와 동일, Yearly Comparison 로직 추가됨
    			}
    			//FC_GET_BEGIN_DATE Search
		    	var parmStr='&goWhere=aj&bcKey=getBeginningDate&yearEndDate='+to_dt;
		    	ajaxSendPost(getBeginningDate,  'reqVal', parmStr, './GateServlet.gsl');
    			fr_dt=s_beginnin_dt;
    		}else if(formObj.rpt_opt[2].checked){
    			if(formObj.rtp_type[0].checked){
    				file_name='balance_sheet_01.mrd';
    			}else{
    				file_name='balance_sheet_yearly_01.mrd';	//query 와 동일, Yearly Comparison 로직 추가됨
    			}
    			//System Begin Date Search
    			//var parmStr='&goWhere=aj&bcKey=getSystemBegYM&yearEndDate='+to_dt;
		    	//ajaxSendPost(getSystemBegYM,  'reqVal', parmStr, './GateServlet.gsl');
    			fr_dt=formObj.f_sys_beg_ym.value + "01";
    			rtp_opt="";
    			//LHK 20131022 추가
    			//FC_GET_BEGIN_DATE Search
		    	//var parmStr = '&goWhere=aj&bcKey=getBeginningDate&yearEndDate='+to_dt;
		    	//ajaxSendPost(getBeginningDate,  'reqVal', parmStr, './GateServlet.gsl');
		    	//none_begin_dt	= s_beginnin_dt;
    			//LHK 20140120 다시 변경함, 시스템 시작일로. #25534
    			//LHK 20140620 #34817 [COMMON]B/S 의 Income Statement 로직 수정
    			//FC_GET_BEGIN_DATE_2 Search
		    	var parmStr='&goWhere=aj&bcKey=getBeginningDate2&yearEndDate='+to_dt;
		    	ajaxSendPost(getBeginningDate2,  'reqVal', parmStr, './GateServlet.gsl');
		    	none_begin_dt=s_beginnin_dt_2;
    		}
    		formObj.file_name.value=file_name;
    		formObj.title.value="Balance Sheet";
    		//One Currency 일 경우, Param Flag 
 		    var s_curr_opt = document.getElementsByName("s_curr_opt");	//Currency Option
    		var multi_curr_flg	= "T";
  	        if(s_curr_opt[1].checked == true){
  	    	    multi_curr_flg = "";                    
 		    }
    		var param='[' + formObj.f_ofc_nm.value + ']';			// OFC_NM [1]
    		param += '[' + fr_dt + ']';									// [2]
    		param += '[' + to_dt + ']';									// [3]
	   		if(formObj.order_by[0].checked){
	   			param += '[1]';											// [4]
	   		}else{
	   			param += '[]';											// [4]
	   		}
	   		//#1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION
	   		if(CAN_YN!='Y'){
				var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
		   		param += '[' + selectedValues + ']';						// [5]
			}else{
				param += '[' + caOfcList + ']';				// [5]
			}
	   		//param += '[' + formObj.s_ofc_cd.value + ']';				// [5]
	   		param += '[' + rtp_opt + ']';								// [6]	balance_sheet_01 에서만 사용, option 에 따른 query 분리를 위해.
	   		//Income Statement 용
	   		param += '[' + formObj.f_sys_ofc_cd.value + ']';			// [7]
	   		//GL Link 용
			//param += '[' + ofc_nm + ']';								// [param1]
			param += '[' + usrNm + ']';									// [8]
			param += '[' + usrId + ']';									// [9]
			param += '[' + usrPhn + ']';								// [10]
			param += '[' + usrEml + ']';								// [11]
			param += '[' + none_begin_dt + ']';							// [12] balance_sheet_01 연결시, None 옵션일 경우 BEGIN_DATE 이 필요, 다른 옵션에서는 사용하지 않음
			param += '[' + multi_curr_flg + ']';						// [13] Currency Option 
			param += '[' + formObj.s_curr_cd.value + ']';				// [14]
			param += '[' + getRateQuery("") + ']';						// [15]
	   		param += '[]';	    	                                    // [16]	GL Link 용, 사용안함.
	   		param += '[' + getRateQuery("IS") + ']';					// [17] IS Link 용
	   		
	   		param += '[' + formObj.f_ofc_cd.value + ']';				// [18] IS Link 용
	   		
	   	    //BINEX 요구사항, TOR 정산을 위한 Parma, TOR 조회시, "Y"
			param += '[' + CAN_YN + ']';		                        // [19] 
			
			//#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
			var dtTp_check ="";
			if(formObj.f_dt_tp_radio[0].checked == true){
				dtTp_check = '';								
			} else {
				dtTp_check = 'I';								
			} 
			param += '[' + dtTp_check + ']';	                         // [20]
			//#52472 [CLT] 안정성 : Balance Sheet Report에서 GL Report 호출하는 경우에만 설정,  GL Report의 출력 Limit ROW를 설정하기 위함.
			param += '[' + lv_limitRow + ']';	                         // [21]
			
    		formObj.rd_param.value=param;
	   		//popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    		if (pdf) {
    			popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
    			pdf = false;
    		} else {
    			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    		}
    		
	   break;
       case "CURR_SEARCH":
           formObj.f_cmd.value = SEARCHLIST01;
          
           var s_curr_opt = document.getElementsByName("s_curr_opt");	//Currency Option
	            
 	       if(s_curr_opt[0].checked == true){
	 	   	   return;                    
		   }
	 	        
		   if(formObj.s_curr_cd.value == ""){
		    	//Please, select the [To Currency]
		    	alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_TCUR'));
		    	formObj.s_curr_cd.focus();  
				return;
		   }
		   
           var s_curr_opt = document.getElementsByName("s_curr_opt");	//Currency Option
           //<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->
           var selectedValues = $("#s_ofc_cd").multipleSelect("getSelects");
       	   formObj.f_sel_ofc.value = selectedValues;    
				
		   sheetObj2.DoSearch("./PFM_MGT_0100_1GS.clt", FormQueryString(formObj));
          
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
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1;
	var date=now.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	
	//[BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
//	setChkPeriod(); //#52526 Balance Sheet/Trial Balance 의 Invoice Date 기능 Hidden 처리 
	setChkCurrency();
	
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
	today=month + "-" + date + "-" + year;
	TODAY=year+month+date;
	formObj.f_fr_dt.value=today;
	formObj.s_curr_cd.value = ofc_curr_cd;
	
	var opt_key = "ACCT_FINC_INV_DT_OPT";
	ajaxSendPost(setAcctFincInvDtOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
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
         
         case 2:      //IBSheet2 init
          	
 		    with (sheetObj) {
	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
	             InitHeaders(headers, info);
	             
	             var cols = [ {Type:"Text",  	 Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                          {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:"aply_fm_dt",      KeyField:0,   CalcLogic:"",   Format:"Ym",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                          {Type:"Float",      Hidden:0,  Width:110,  Align:"Right",    ColMerge:1,   SaveName:"rate",  KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 } ];
	                    
               	InitColumns(cols);
               	SetEditable(1);
               	InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
               	SetVisible(true);
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
function doRptTypeDisable(){
	formObj=document.frm1;
	if(formObj.gl_tp[0].checked){
		formObj.rpt_tp[1].checked=false;
		formObj.rpt_tp[3].checked=false;
		formObj.rpt_tp[5].checked=false;
		formObj.rpt_tp[1].disabled=true;
		formObj.rpt_tp[3].disabled=true;
		formObj.rpt_tp[5].disabled=true;
		//G/L Range Clear
		formObj.range_fr.value="";
		formObj.range_to.value="";
		formObj.gl_tp[1].checked=false;
		formObj.gl_tp[1].disabled=true;
		//AP EXPENSE CHECK BOX 활성화
		exp_view_layer.style.display="inline";
		exp_none_layer.style.display="none";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
	}else{
		formObj.rpt_tp[1].disabled=false;
		formObj.rpt_tp[3].disabled=false;
		formObj.rpt_tp[5].disabled=false;
		formObj.range_fr.value=formObj.tmp_range_fr.value;
		formObj.range_to.value=formObj.tmp_range_to.value;
		formObj.gl_tp[1].disabled=false;
		//AP EXPENSE CHECK BOX 비활성화
		exp_view_layer.style.display="none";
		exp_none_layer.style.display="inline";
		formObj.exp_ck.checked=false;
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
	}
}
function swichChk(){
	formObj=document.frm1;
	if(formObj.gl_tp[1].checked){
		formObj.gl_tp[2].checked=false;
		return;
	}
}
function swichChk2(){
	formObj=document.frm1;
	if(formObj.gl_tp[2].checked){
		formObj.gl_tp[1].checked=false;
		return;
	}
}
function expenseChk(){
	if(formObj.exp_ck.checked){
		formObj.rpt_tp[0].disabled=true;
		formObj.rpt_tp[2].disabled=true;
		formObj.rpt_tp[4].disabled=true;
		formObj.rpt_tp[0].checked=false;
		formObj.rpt_tp[2].checked=false;
		formObj.rpt_tp[4].checked=false;
	}else{
		formObj.rpt_tp[0].disabled=false;
		formObj.rpt_tp[2].disabled=false;
		formObj.rpt_tp[4].disabled=false;
		formObj.rpt_tp[0].checked=true;
		formObj.rpt_tp[2].checked=true;
		formObj.rpt_tp[4].checked=true;
	}
}
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
var s_beginnin_dt_2="";
function getBeginningDate2(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
	   s_beginnin_dt_2=doc[1];
    }
}
function getRateQuery(isISLink){
	
	var sheetObj = docObjects[1];
	
	var aVal	= "'";
    
    if(isISLink == "IS"){
 	   aVal 	= "''";
    }
    
	var rateSQL = "select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
		+     "  from ( "
		;
	
	if(sheetObj.RowCount() == 0){
		rateSQL += "         SELECT " + aVal +  '' + aVal + " AS curr_cd, " 
								 +  aVal  + '' +  aVal + "  AS aply_fm_dt, "
								 + 0 + " AS xch_rt_ut ) rate ";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			
			rateSQL += "         SELECT " + aVal + sheetObj.GetCellValue(i, "curr_cd") +  aVal + " AS curr_cd, " 
									 + aVal + sheetObj.GetCellValue(i, "aply_fm_dt") +  aVal + " AS aply_fm_dt, "
									 + sheetObj.GetCellValue(i, "rate") + " AS xch_rt_ut ";
			
					
	    	if(i < sheetObj.LastRow()){
	    		rateSQL += " UNION ";
	    	}else{
	    		rateSQL += "      ) rate ";
	    	}
		}	
	}
	return rateSQL;
	
/*
	ex)
	select rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut
	from (
			select 'USD' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	      UNION
			select 'JPY' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	      ) rate
*/
}

//BINEX 요구사항, TOR 정산을 위한, Parameter Set.
function setTorVal(val){
	
	formObj = document.frm1;
	
	CAN_YN = val;
	
	if(CAN_YN == "Y"){
		ajaxSendPost(setCaOfc, "reqVal", "&goWhere=aj&bcKey=searchCaOfc", "./GateServlet.gsl");
	}

}


//#48071 [AGL] Accounting Report들을 Invoice Date으로 표시 하는 Option 요청 
function setCheck() {
	formObj = document.frm1;
	formObj.f_dt_tp_radio.checked = true; 
	
	//Physical Year Beginning Balance ,Monthly Journalizing인 경우에는 기준을 POST_DT로만 가능하므로 INV_DT가 선택 못하도록 변경 
	//#52526 Balance Sheet/Trial Balance 의 Invoice Date 기능 Hidden 처리 
	if (formObj.rpt_opt[0].checked || formObj.rpt_opt[1].checked) {
		formObj.f_dt_tp_radio[0].checked = true; 
		formObj.f_dt_tp_radio[1].checked = false; 
		formObj.f_dt_tp_radio[1].disabled = true;
	} else { 
		formObj.f_dt_tp_radio[1].disabled = false;
	}
}

//S : [BINEX MEXICO] 회계리포트 초기값 셋팅 (#49106)
//#52526 Balance Sheet/Trial Balance 의 Invoice Date 기능 Hidden 처리 
function setChkPeriod(){
	//Period default 설정 (P : Post Date, I : Invoice Date)	
	var opt_key = "ACCT_FINC_DATE_DFLT";
	ajaxSendPost(setRdoChkPeriod, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setChkCurrency(){
	//Currency default 설정 (M : Multi currency, O : One Currency)
	var opt_key = "ACCT_FINC_CURR_DFLT";
	ajaxSendPost(setRdoChkCurrency, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

//#52526 Balance Sheet/Trial Balance 의 Invoice Date 기능 Hidden 처리 
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

//#52472 [CLT] 안정성
//Balance Sheet Report에서 GL Report 호출하는 경우,  GL Report의 출력 Limit ROW를 설정
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

// #4206 Tor Print 버튼을 TOR가 아니라 CANADA의 Office대상으로 변경
function setCaOfc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {		
		caOfcList = doc[1];		
	} 
}