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
       case "SEARCHLIST":
       break;
       case "CURR_SEARCH":
            formObj.f_cmd.value=SEARCHLIST01;
            if(!chkSearchCmprPrd(false, formObj.s_prd_strdt, formObj.s_prd_enddt)){
            	return;
            }
		    if(formObj.s_curr_cd.value == ""){
		    	//Please, select the [To Currency]
		    	alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_TCUR'));
				return;
			}
            sheetObj.DoSearch("./PFM_MGT_0060_1GS.clt", FormQueryString(formObj) );
           //previous Currency Search
           doWork('PRE_CURR_SEARCH');
      break;
       case "PRE_CURR_SEARCH":
           formObj.f_cmd.value=SEARCHLIST02;
           //previous date Set
           var s_prd_strdt=formObj.s_prd_strdt.value;
           s_prd_strdt=s_prd_strdt.replace('-','').replace('-',''); 
      	   var year=s_prd_strdt.substring(4,8);
      	   var month=s_prd_strdt.substring(0,2).replace('0','');
           SetPrivousDate(year, month);
            sheetObj2.DoSearch("./PFM_MGT_0070_2GS.clt", FormQueryString(formObj) );
      break;
      case 'PRINT':
    	  formObj.title.value='Total Profit Report (B)';
          var param="";
          if(!chkSearchCmprPrd(false, formObj.s_prd_strdt, formObj.s_prd_enddt)){
      		return;
          }
	      if(chkCurrency()){
	    	   return;
	       }
          var strDt_ymd=mkFormat1(formObj.s_prd_strdt.value);          
          var endDt_ymd=mkFormat1(formObj.s_prd_enddt.value);
         //previous date Set
          var s_prd_strdt=formObj.s_prd_strdt.value;
          s_prd_strdt=s_prd_strdt.replace('-','').replace('-',''); 
     	  var year=s_prd_strdt.substring(4,8);
     	  var month=s_prd_strdt.substring(0,2).replace('0','');
          SetPrivousDate(year, month);
          var pre_strDt_ymd=mkFormat1(formObj.s_pre_prd_strdt.value);
          var pre_endDt_ymd=mkFormat1(formObj.s_pre_prd_enddt.value);
      	  // ==============  rate 를 query 로   ==============
		  rateSqlcur=getRateQuery(sheetObj);
		  rateSqlpre=getRateQuery(sheetObj2);
          param += '[' + formObj.s_curr_cd.value + ']';		//$1	currency
          param += '[' + formObj.s_prd_strdt.value + ']';   //$2	StartDt
          param += '[' + formObj.s_prd_enddt.value + ']';	//$3	EndDt
          param += '[' + strDt_ymd + ']';		    	    //$4	strDt_ymd
		  param += '[' + endDt_ymd + ']';					//$5	endDt_ymd
		  param += '[' + formObj.s_ofc_cd.value + ']';		//$6	Office
		  param += '[' + usrNm  + ']';						//$7	User Name
		  param += '[' + pre_strDt_ymd + ']';		    	//$8	pre_strDt_ymd
		  param += '[' + pre_endDt_ymd + ']';				//$9	pre_endDt_ymd
		  //One 인 경우
		  param += '[' + rateSqlcur + ']';	    			//$10   Currency SQL Current
		  param += '[' + rateSqlpre + ']';				    //$11   Currency SQL Previous
		  param += '[' + formObj.f_ofc_locl_nm.value + ']';   //$12 
		  file_names='pfm_profit_total_B.mrd';
		  formObj.rd_param.value=param;
		  formObj.file_name.value=file_names;
		  //alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
		  //popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			if (pdf) {
				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
				pdf = false;
			} else {
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
	   break;
    }
}
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
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.frm1.f_CurPage.value=1;
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
	initFinish();
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
	        with(sheetObj){
            
//         (2, 0, 0, true);
			         var cnt=0;
			
			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			
			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
			         InitHeaders(headers, info);
			
			         var cols = [ {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:130,  Align:"Right",   ColMerge:1,   SaveName:"rate",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 } ];
			          
			         InitColumns(cols);
			
			         SetEditable(1);
			         SetSheetHeight(150);
                  }


		break;
        case 2:      //IBSheet2 init
            with(sheetObj){
           
			//         (2, 0, 0, true);
			         var cnt=0;
			
			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			
			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
			         InitHeaders(headers, info);
			
			         var cols = [ {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0,  Width:130,  Align:"Right",   ColMerge:1,   SaveName:"rate",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 } ];
			          
			         InitColumns(cols);
			         SetEditable(1);
			         SetSheetHeight(150);
                  }

     
	     break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
}
function openPopUp(popName, curObj){
	var formObj=document.frm1;
	try {
		switch(popName) {
		}
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
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	return true;
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
        cal.select(formObj.s_prd_strdt,formObj.s_prd_enddt,'MM-dd-yyyy');
        break;
    }
}
/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	var formObj=document.frm1;
    var date="";
    var year, month, day="";
    var year1, month1, day1="";
    var s_prd_strdt, s_prd_enddt="";           
    date=new Date(); 
    s_prd_strdt=new Date(date.getFullYear(),date.getMonth(),1);    
    month=s_prd_strdt.getMonth()+1;
    day=s_prd_strdt.getDate();
    year=s_prd_strdt.getFullYear();
    if(month<10){month='0'+ month;}    
    if(day<10){day='0' + day;}    
    s_prd_strdt=month + "-" + day + "-" + year;  
    s_prd_enddt=new Date(date.getFullYear(),date.getMonth()+1,0);     
    month1=s_prd_enddt.getMonth()+1;
    day1=s_prd_enddt.getDate();
    year1=s_prd_enddt.getFullYear();        
    if(month1<10){month1='0'+ month1;}    
    if(day1<10){day1='0' + day1;}
    s_prd_enddt=month1 + "-" + day1 + "-" + year1;
    formObj.s_prd_strdt.value=s_prd_strdt;
    formObj.s_prd_enddt.value=s_prd_enddt;
}
function SetPrivousDate(yyyy, mm){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	var formObj=document.frm1;
    var date="";
    var year, month, day="";
    var year1, month1, day1="";
    var s_prd_strdt, s_prd_enddt="";           
    date=new Date();
    date.setYear(yyyy);
    date.setMonth(mm);
    s_pre_prd_strdt=new Date(date.getFullYear(),date.getMonth()-2, 1);    
    month=s_pre_prd_strdt.getMonth()+1;
    day=s_pre_prd_strdt.getDate();
    year=s_pre_prd_strdt.getFullYear();
    if(month<10){month='0'+ month;}    
    if(day<10){day='0' + day;}    
    s_pre_prd_strdt=month + "-" + day + "-" + year;  
    s_pre_prd_enddt=new Date(date.getFullYear(),date.getMonth()-1, 0);     
    month1=s_pre_prd_enddt.getMonth()+1;
    day1=s_pre_prd_enddt.getDate();
    year1=s_pre_prd_enddt.getFullYear();        
    if(month1<10){month1='0'+ month1;}    
    if(day1<10){day1='0' + day1;}
    s_pre_prd_enddt=month1 + "-" + day1 + "-" + year1;
    formObj.s_pre_prd_strdt.value=s_pre_prd_strdt;
    formObj.s_pre_prd_enddt.value=s_pre_prd_enddt;
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
function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-',''); 
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4); 
	 return rtnStr;
}
function chkCurrency(){
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
    if(sheetObj.LastRow()< 1){
    	//Please Retrieve [From Currency]! Enter the exchange rate.
    	alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_TCUR'));
    	return true; //Why true??? (S.Y BAIK 2012.12.13)
    }
	/**
    else{
    	var rate=0; 
    	for(var i=1; i<=sheetObj.LastRow();i++){
rate=sheetObj.GetCellValue(i, "rate");
    		if(rate == 0) {
    			break;
    		}
    	}
    	if(rate == 0){
    		//Enter the exchange rate.
	    	return true;
    	}	
    }
   	*/
   return false; //Why false??? (S.Y BAIK 2012.12.13)
}
function getRateQuery(sheetObj){
	//var sheetObj = docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.rate"
			+     "  from ( "
			;
	//ex)
	//select rate.curr_cd, rate.rate
	//from (
	//		select 'USD' as curr_cd, 20 as rate
	//      UNION
	//		select 'JPY' as curr_cd, 30 as rate
    //      ) rate
	for(var i=1; i<=sheetObj.LastRow();i++){
rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "curr_cd") + "' AS curr_cd, " + sheetObj.GetCellValue(i, "rate") + " AS rate";
    	if(i < sheetObj.LastRow()){
    		rateSQL += " UNION ";
    	}else{
    		rateSQL += "      ) rate ";
    	}
    }
	return rateSQL;
}
//Calendar flag value
var firCalFlag=false;
