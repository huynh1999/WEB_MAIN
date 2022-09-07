/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var rtnary=new Array(3);
var callBackFunc = "";
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	initFinish();
	
	formObj.s_curr_cd.value=ofc_curr_cd;
	doWork('CURR_SEARCH');

	//#3411 [JTC]Accounting & Performance 수정사항
	formObj.s_curr_opt.value = ACCT_FINC_CURR_DFLT;
}

//Calendar flag value
var firCalFlag=false;
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
		    //InitViewFormat(0, "aply_fm_dt", "mm\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		    SetSheetHeight(110);

		}
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
}
function sheet2_OnSearchEnd(){
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "CURR_SEARCH":
            formObj.f_cmd.value=SEARCHLIST01;
            var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
 	        var curr_opt=getRadioVal(s_curr_opt);
 	        if(curr_opt != "O"){
 	        	return;
			}
		    if(formObj.s_curr_cd.value == ""){
		    	alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_TCUR'));
		    	formObj.s_curr_cd.focus();
				return;
			}
		    sheetObj.DoSearch("./PFM_MGT_0031GS.clt", FormQueryString(formObj) );
       break;
       case "ALL":
    		formObj.s_oi_dptm_flg.checked=true;
    		formObj.s_ai_dptm_flg.checked=true;
    		formObj.s_oe_dptm_flg.checked=true;
    		formObj.s_ae_dptm_flg.checked=true;
    		formObj.s_on_dptm_flg.checked=true;
       break;
       case "CLEAR":
    		formObj.s_oi_dptm_flg.checked=false;
    		formObj.s_ai_dptm_flg.checked=false;
    		formObj.s_oe_dptm_flg.checked=false;
    		formObj.s_ae_dptm_flg.checked=false;
    		formObj.s_on_dptm_flg.checked=false;
       break;
       case "ALLCLEAR":
    		setSelect();
    		doWork('ALL');
    		initFinish();
    		formObj.s_prn_opt[0].checked=true;
    		formObj.s_curr_opt[0].checked=true;
    		formObj.s_curr_cd.value="";
    		sheetObj.RemoveAll();
       break;
       case 'PRINT':
			formObj.title.value='Batch Profit Report';
			//2.Department Type check
			if( formObj.s_oi_dptm_flg.checked == false && 
			    formObj.s_oe_dptm_flg.checked == false &&
			    formObj.s_ai_dptm_flg.checked == false &&
			    formObj.s_ae_dptm_flg.checked == false &&
			    formObj.s_on_dptm_flg.checked == false
			){
				alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_DETP'));
				return;
			}
			if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
				return;
			}
			var param='';
			param += '[' + (formObj.s_ofc_cd.value) + ']';//$1
			param += '[' + (formObj.s_oe_dptm_flg.checked?'Y':'N') + ']';//$2
			param += '[' + (formObj.s_oi_dptm_flg.checked?'Y':'N') + ']';//$3
			param += '[' + (formObj.s_ae_dptm_flg.checked?'Y':'N') + ']';//$4
			param += '[' + (formObj.s_ai_dptm_flg.checked?'Y':'N') + ']';//$5			
			param += '[' + (formObj.s_on_dptm_flg.checked?'Y':'N') + ']';//$6
			param += '[' + mkFormat1(formObj.s_prd_strdt.value) + ']';//$7
			param += '[' + mkFormat1(formObj.s_prd_enddt.value) + ']';//$8
			// 1.Currency check
			var curr_opt=getRadioVal(document.getElementsByName("s_curr_opt"));
			if(chkCurrency(curr_opt)){
				return;
			}
			var prn_opt=getRadioVal(document.getElementsByName("s_prn_opt"));//Print Option
			//One Currency 인 경우
			if(curr_opt == 'O'){
				//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다.
				if(currRateCheck(sheetObj)){
					return;
				}
				param += '[' + formObj.s_curr_cd.value + ']';//$9
				param += '[' + getRateQuery() + ']';//$10
			// multi Currency 인 경우
			} else {
				param += '[]';//$9
				param += '[SELECT \'\' as curr_cd, \'\' as aply_fm_dt, 0 as xch_rt_ut]';//$10
			}
			param += '[' + formObj.s_opr_usrid.value + ']';//$11
			if(prn_opt == "D") {
				//[Detail]
				formObj.file_name.value='profit_report_mbl_dtl_b.mrd';
			} else if(prn_opt == "S") {
				//[Summary]
				formObj.file_name.value='profit_report_mbl_smr_b.mrd';
			}
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   break;
    }
}
function openPopUp(popName, curObj){
	try {
		switch(popName) {
			case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "USER_POPLIST";
    	        modal_center_open('./CMM_POP_0060.clt', rtnary, 556,480,"yes");
    	        
	        break;
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
            cal.select(formObj.s_prd_strdt, formObj.s_prd_enddt, 'MM-dd-yyyy');
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
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
    var date="";
    var year, month, day="";
    var year1, month1, day1="";
    var s_prd_strdt, s_prd_enddt="";
    date=new Date();
    s_prd_strdt=new Date(date.getFullYear(),date.getMonth()-1,1);
    month=s_prd_strdt.getMonth()+1;
    day=s_prd_strdt.getDate();
    year=s_prd_strdt.getFullYear();
    if(month<10){month='0'+ month;}
    if(day<10){day='0' + day;}
    s_prd_strdt=month + "-" + day + "-" + year;
    s_prd_enddt=new Date(date.getFullYear(),date.getMonth(),0);
    month1=s_prd_enddt.getMonth()+1;
    day1=s_prd_enddt.getDate();
    year1=s_prd_enddt.getFullYear();
    if(month1<10){month1='0'+ month1;}
    if(day1<10){day1='0' + day1;}
    s_prd_enddt=month1 + "-" + day1 + "-" + year1;
    formObj.s_prd_strdt.value=s_prd_strdt;
    formObj.s_prd_enddt.value=s_prd_enddt;
}
function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-','');
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4);
	 return rtnStr;
}
function isIntervalDt(){
	var formObj=document.frm1;
    var s_prd_strdt=formObj.s_prd_strdt.value;
    var s_prd_enddt=formObj.s_prd_enddt.value;
    s_prd_strdt=mkFormat1(s_prd_strdt).substring(0,6);
    s_prd_enddt=mkFormat1(s_prd_enddt).substring(0,6);
    var s_prd_strYm=s_prd_strdt;
    var date=new Date();
    date.setFullYear( parseInt(s_prd_strYm.substring(0,4)));
    date.setMonth(parseInt(s_prd_strYm.substring(4)) + 2);
    var year=date.getFullYear();
    var month=date.getMonth();
    if(month<10){month='0'+ month;}
    var s_prd_endYm=year + month;
    if(s_prd_enddt > s_prd_endYm){
    	return true;
    }
    return false;
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
function chkCurrency(curr_opt){
	var sheetObj=docObjects[0];
	//var sheetObj4  = docObjects[3];
	var formObj=document.frm1;
   if(curr_opt == "M"){
	   // TODO : 아래 로직 파악해야 함.
	// formObj.f_cmd.value = SEARCHLIST02;
	// sheetObj4.DoSearch4Post("./PFM_MGT_0030_2GS.clt", FormQueryString(formObj));
   }else if(curr_opt == "O"){
	   if(sheetObj.LastRow()< 1){
		   alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('TO_CURR_CD'));
		   return true;
	    }
   }else{
	   return true;
   }
   return false;
}
function getRateQuery(){
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
			+     "  from ( ";
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
function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_opr_usrid.value=rtnValAry[0];
		formObj.s_opr_usrnm.value=rtnValAry[1];
	}
	}