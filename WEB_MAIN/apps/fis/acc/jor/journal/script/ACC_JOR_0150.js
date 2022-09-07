/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0006.jsp
*@FileTitle  : Receiving List
*@author     : Thoa.Dien
*@version    : 1.0
*@since      : 2014/12/26
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.post_dt_strdt, 180, document.frm1.post_dt_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj  = docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCH":
    	   		if(!CheckMandatoryField() )return;
    	   		if(formObj.f_agn_rpt_tp_1.checked == false && formObj.f_agn_rpt_tp_2.checked == false && formObj.f_agn_rpt_tp_6.checked == false){
    	   			
    	   			formObj.f_rpt_type.value ="Y" ;
    			}else{
    				formObj.f_rpt_type.value ="N";
    			}
    	   		
    	   		
   				formObj.f_cmd.value = SEARCHLIST;	   				
   				sheetObj.DoSearch("./ACC_JOR_0150GS.clt", FormQueryString(formObj) );


			    /*
    	   		if(!chkSearchFromToDate(false, formObj.post_dt_strdt, formObj.post_dt_enddt) || !CheckMandatoryField() ){
    	   			return;
    	   		}
    	   		
    	   		sheetObj.RemoveAll();
    	   		
    	   		sheet1.ShowProcessDlg();
    	   		
    	   		
    	   		setTimeout(function(){
    	   		
    	   			formObj.f_cmd.value=SEARCH;
    	   		
    	   			var xml = sheetObj.GetSearchData("./ACC_JOR_0150GS.clt", FormQueryString(formObj) );
    	   		
    	   			sheetObj.LoadSearchData(xml);
    	   		},100);
    	   		
    	   		*/
    	   	break;
           	case "EXCEL"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
           		if(docObjects[0].RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	   	 			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	    		}
           		
    	   		break;
           	case "NEW":
           		window.openWindow('./WHM_WHM_0010.clt');
           		break;
           	case "btn_Clear":
           		clearAll();
           		break;
           	case "ALL_AGN":
    			formObj.f_agn_rpt_tp_1.checked=true;
    			formObj.f_agn_rpt_tp_2.checked=true;
    			formObj.f_agn_rpt_tp_3.checked=true;
    			formObj.f_agn_rpt_tp_4.checked=true;
    			formObj.f_agn_rpt_tp_5.checked=true;
    			formObj.f_agn_rpt_tp_6.checked=true;
    		break;
    		case "CLEAR_AGN":
    			formObj.f_agn_rpt_tp_1.checked=false;
    			formObj.f_agn_rpt_tp_2.checked=false;
    			formObj.f_agn_rpt_tp_3.checked=false;
    			formObj.f_agn_rpt_tp_4.checked=false;
    			formObj.f_agn_rpt_tp_5.checked=false;
    			formObj.f_agn_rpt_tp_6.checked=false;
    		break;
    		case "ALL_DPT":
    			formObj.f_dpt_tp_1.checked=true;
    			formObj.f_dpt_tp_2.checked=true;
    			formObj.f_dpt_tp_3.checked=true;
    			formObj.f_dpt_tp_4.checked=true;
    			formObj.f_dpt_tp_5.checked=true;
    			formObj.f_dpt_tp_6.checked=true;			
    			checkReleased();
    		break;
    		case "CLEAR_DPT":
    			formObj.f_dpt_tp_1.checked=false;
    			formObj.f_dpt_tp_2.checked=false;
    			formObj.f_dpt_tp_3.checked=false;
    			formObj.f_dpt_tp_4.checked=false;
    			formObj.f_dpt_tp_5.checked=false;
    			formObj.f_dpt_tp_6.checked=false;
    			checkReleased();
    		break;
    		case "EXCEL":
		   	 	if(docObjects[0].RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   	 		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		   		}
		   	 break;
		   	 
		   	 
		   	 
    		case "PRINT":
    			formObj.file_name.value='bad_debit_report.mrd';
    			formObj.title.value='Bad Debit List Report';
    			//Parameter Setting
    			var agn_rpt_tp=''; 
    			var param=''; 
    			
      	   		if(!CheckMandatoryField() )return;
    	   		if(formObj.f_agn_rpt_tp_1.checked == false && formObj.f_agn_rpt_tp_2.checked == false && formObj.f_agn_rpt_tp_6.checked == false){
    	   			
    	   			formObj.f_rpt_type.value ="Y" ;
    			}else{
    				formObj.f_rpt_type.value ="N";
    			}    			
    		 
    			if(formObj.f_agn_rpt_tp_1.checked == true){
    				agn_rpt_tp += ",Debit Note";
    				param += '[Y]'; // [1]
    			}else{
    				agn_rpt_tp += "";
    				param += '[]'; // [1]
    			}
    			if(formObj.f_agn_rpt_tp_2.checked == true){
    				agn_rpt_tp += ",Local Invoice";
    				param += '[Y]'; // [2]
    			}else{
    				agn_rpt_tp += "";
    				param += '[]'; // [2]
    			}
    			if(formObj.f_agn_rpt_tp_6.checked == true){
    				agn_rpt_tp += ",General(A/R)";
    				param += '[Y]'; // [3]
    			}else{
    				agn_rpt_tp += "";
    				param += '[]'; // [3]
    			}    			
    			if(formObj.f_agn_rpt_tp_3.checked == true){
    				agn_rpt_tp += ",Credit Note";
    				param += '[Y]'; // [4]
    			}else{
    				agn_rpt_tp += "";
    				param += '[]'; // [4]
    			}    			
    			if(formObj.f_agn_rpt_tp_4.checked == true){
    				agn_rpt_tp += ",Account Payable";
    				param += '[Y]'; // [5]
    			}else{
    				agn_rpt_tp += "";
    				param += '[]'; // [5]
    			}    			
    			if(formObj.f_agn_rpt_tp_5.checked == true){
    				agn_rpt_tp += ",General(A/P)";
    				param += '[Y]'; // [6]
    			}else{
    				agn_rpt_tp += "";
    				param += '[]'; // [6]
    			}    			
    			
    			var dpt_tp=''; 
    			if(formObj.f_dpt_tp_1.checked == true){
    				dpt_tp += ",Ocean Import";
    				param += '[Y]'; // [7]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [7]
    			}    			 
    			if(formObj.f_dpt_tp_2.checked == true){
    				dpt_tp += ",Ocean Export";
    				param += '[Y]'; // [8]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [8]
    			}    			
       			if(formObj.f_dpt_tp_3.checked == true){
    				dpt_tp += ",Other Operation";
    				param += '[Y]'; // [9]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [9]
    			}    			
       			if(formObj.f_dpt_tp_4.checked == true){
    				dpt_tp += ",Air Import";
    				param += '[Y]'; // [10]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [10]
    			}    				
       			if(formObj.f_dpt_tp_5.checked == true){
    				dpt_tp += ",Air Export";
    				param += '[Y]'; // [11]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [11]
    			}    				
       			if(formObj.f_dpt_tp_6.checked == true){
    				dpt_tp += ",Individual Inv(s) / AR/AP(s)";
    				param += '[Y]'; // [12]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [12]
    			}    				
       			if(formObj.f_dpt_tp_7.checked == true){
    				dpt_tp += ",Warehouse Operation";
    				param += '[Y]'; // [13]
    			}else{
    				dpt_tp += "";
    				param += '[]'; // [13]
    			}    				
    			
       			
       			
       			var date_radio = "";
       			var date_radio_nm = "";
       			if(formObj.f_date_radio[0].checked == true){
       				date_radio = 'A';	
       				date_radio_nm = "As of";
    			}else{
    				date_radio = 'P';		
    				date_radio_nm = "Period";
    			}
       			param += '[' + date_radio + ']';					// [14]
       			param += '[' + date_radio_nm + ']';					// [15] 
       			
       			
    			var f_start_dt=formObj.f_start_dt.value.replaceAll("-",""); 
    			var year=f_start_dt.substring(4,8);
    			var month=f_start_dt.substring(0,2);
    			var day=f_start_dt.substring(2,4); 
    			var f_start_dt2 = "";
    			if(f_start_dt != ""){ 
    				f_start_dt=year + month + day;
    				f_start_dt2=mkCharMonthFormat(month) + " " + day + ", " +  year;
    			}else{
    				f_start_dt="";
    			}
       			param += '[' + f_start_dt + ']';					// [16]
       			
    			var f_end_dt=formObj.f_end_dt.value.replaceAll("-",""); 
    			var year=f_end_dt.substring(4,8);
    			var month=f_end_dt.substring(0,2);
    			var day=f_end_dt.substring(2,4);
    			var f_end_dt2 = "";
    			if(f_end_dt != ""){ 
    				f_end_dt=year + month + day;
    				f_end_dt2=mkCharMonthFormat(month) + " " + day + ", " +  year;
    			}else{
    				f_end_dt="";
    			}       			
       			param += '[' + f_end_dt + ']';					// [17]
       			
       			
       			
       			var dt_tp_radio = "";
       			var dt_tp_radio_nm = "";
       			if(formObj.f_dt_tp_radio[0].checked == true){
       				dt_tp_radio = 'P';	
       				dt_tp_radio_nm = "Post Date";
    			}else{
    				dt_tp_radio = 'I';		
    				dt_tp_radio_nm = "Invoice Date";
    			}
       			param += '[' + dt_tp_radio + ']';					// [18]
       			param += '[' + dt_tp_radio_nm + ']';					// [19] 
        
       			
       			param += '[' + formObj.f_curr_cd.value + ']';					// [20]
       			param += '[' + formObj.f_ofc_cd.value + ']';					// [21]
    			
    			
       			var acct_tp = "";
       			var acct_tp_nm = "";
       			if(formObj.f_acct_tp_radio[0].checked == true){
       				acct_tp = 'A';	
       				acct_tp_nm = "Accrual Basis";
    			}else{
    				acct_tp = 'C';		
    				acct_tp_nm = "Cash Basis";
    			}
       			param += '[' + acct_tp + ']';					// [22]
       			param += '[' + acct_tp_nm + ']';					// [23] 
       			
       			
    			var released_check ="";
    			if(formObj.released_check.checked == true){
    				released_check = "Y";
    			}
    			param += '[' + released_check + ']';										// [24]
    			
    			
    			
    			param += '[' + formObj.f_rpt_type.value + ']';					// [25]
    			param += '[' + agn_rpt_tp.substring(1) + ']';					// [26]
    			param += '[' + dpt_tp.substring(1) + ']';					// [27]
    			param += '[' + ofc_eng_nm + ']';			// [28]
    			param += '[' + usrNm + ']';									// [29]
    			param += '[' + f_start_dt2 + ']';									// [30]
    			param += '[' + f_end_dt2 + ']';									// [31]
    			 
    			if (date_radio == "A"){
    				param += '[Y]';		//32
    				param += '[]';		//33
    			}else if (date_radio == "P"){
    				param += '[]';		//32
    				param += '[Y]';		//33
    			}
    			
    			
    			if (dt_tp_radio == "P"){
    				param += '[Y]';		//34
    				param += '[]';		//35
    			}else if (dt_tp_radio == "I"){
    				param += '[]';		//34
    				param += '[Y]';		//35
    			}
    			
    			if (acct_tp == "A"){
    				param += '[Y]';		//36
    				param += '[]';		//37
    			}else if (acct_tp == "C"){
    				param += '[]';		//36
    				param += '[Y]';		//37
    			}
    			
    			if (date_radio == "A" && dt_tp_radio == "P"){
    				param += '[Y]';		//38
    				param += '[]';		//39
    				param += '[]';		//40
    				param += '[]';		//41
    			}else if (date_radio == "A" && dt_tp_radio == "I"){
    				param += '[]';		//38
    				param += '[Y]';		//39
    				param += '[]';		//40
    				param += '[]';		//41
    			}else if (date_radio == "P" && dt_tp_radio == "P"){
    				param += '[]';		//38
    				param += '[]';		//39
    				param += '[Y]';		//40
    				param += '[]';		//41
    			}else if (date_radio == "P" && dt_tp_radio == "I"){
    				param += '[]';		//38
    				param += '[]';		//39
    				param += '[]';		//40
    				param += '[Y]';		//41
    			}
    			
    			 
    			formObj.rd_param.value=param;
    			 
    			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    			 
		   	 
    			break;
		   	 
		   	 
           		
           		
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_AMS_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_AMS_0010.002");
        }
	}
}

/*
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
	var formObj=document.frm1;
    switch(doWhat){
    case 'DATE11': 
    	if(formObj.f_date_radio.value == "A"){
    		var cal=new ComCalendar();
            cal.displayType="date";
            cal.select(formObj.f_end_dt, 'MM-dd-yyyy');
    	} else{
    		var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_start_dt,formObj.f_end_dt, 'MM-dd-yyyy');
    	}
    break;
        
    }
}

function dateFieldChange(flg){
	var formObj=document.frm1;
	if(flg == "1"){
		document.getElementById("span_start_dt").style.display="none";
		document.getElementById("date_td").style.width="150px";
		
		frm1.f_end_dt.onblur=function(){onlyNumberCheck();mkDateFormatType(this, event, true,1);};
	}else{
		document.getElementById("span_start_dt").style.display="inline";
		document.getElementById("date_td").style.width="260px";
		
		frm1.f_end_dt.onblur=function(){onlyNumberCheck();chkCmprPrd(firCalFlag, false, this, frm1.f_start_dt, this);firCalFlag=false;};
	}
}

function checkReleased(){
	var formObj=document.frm1;
	if(formObj.f_dpt_tp_1.checked || formObj.f_dpt_tp_4.checked){
		formObj.released_check.disabled=false;
	} else {
		formObj.released_check.checked=false;
		formObj.released_check.disabled=true;
	}
}



function CheckMandatoryField(){
	var formObj=document.frm1;
	
	if(formObj.f_date_radio.value == "A"){
		if(formObj.f_end_dt.value == ""){
			alert(getLabel('FMS_COM_ALT002'));
			formObj.f_end_dt.focus();
			return false;
		}
	} else {
		if(formObj.f_start_dt.value == ""){
			alert(getLabel('FMS_COM_ALT002'));
			formObj.f_start_dt.focus();
			return false;
		}
		if(formObj.f_end_dt.value == ""){
			alert(getLabel('FMS_COM_ALT002'));
			formObj.f_end_dt.focus();
			return false;
		}
	}
	return true;
}


//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj  = document.frm1;
	setOfficeAllOption(formObj.f_ofc_cd);
	formObj.f_start_dt.value=getTodayStr();
	formObj.f_end_dt.value=getTodayStr();
	
	/* #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - by thoa.dien 170828 */
	//formObj.f_curr_cd.value="USD";
	formObj.f_curr_cd.value = formObj.f_usr_ofc_lcl_curr_cd.value; // Get the local currency based on user's office's local currency information - Thoa.Dien.170928 
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    setChkPeriod();
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
		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
					var headers = [ { Text:getLabel('ACC_JOR_0150_HDR1'), Align:"Center"} ];
		           InitHeaders(headers, info);
		           var cols = [   {Type:"Text",      Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"inv_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"inv_post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Text",     Hidden:0,  Width:100,   Align:"Left",  ColMerge:1,   SaveName:"inv_no",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Text",     Hidden:1,  Width:150,   Align:"Left",  ColMerge:1,   SaveName:"inv_seq",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Text",     Hidden:0,  Width:320,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"sls_gp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         	              {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"cr_term_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"cr_term_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"payment_term",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },

		                          {Type:"AutoSum",   Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"AutoSum",   Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"over_1_30_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"over_31_60_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"over_61_90_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"over_91_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rgst_usrnm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
				                 ];
		            
		           InitColumns(cols);
		           SetEditable(1);
		           //InitViewFormat(0, "inv_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		           //InitViewFormat(0, "rcv_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		           
		           SetSheetHeight(280);
		           resizeSheet();
            }                                                      
            break;
    }
}

function setPaymentTerm(payment_tp,term_tp,term_dt) {
	//C083, CR, Credit, 1, Y, 신용 좋은 거래처]
	//C083, CO, COD, 2, Y, 거래가 드물거나 신용이 좋지 않아 Cargo Release 전 수금되어야 하는 업체(Cash of delivery)]
	//C083, KO, KOINFO, 3, Y, 본사에서 관리하는 거래처로, 가급적 거래를 하지 않아야 하는 업체
	//"Days ____|End of this month|End of next month|____th of next month", "A|B|C|D"   
	var payment_term_txt="";
	if (payment_tp == "CR") {
		payment_term_txt="Credit / ";
	} else if (payment_tp == "CO") {
		payment_term_txt="COD / ";
	} else if (payment_tp == "KO") {
		payment_term_txt="KOINFO / ";
	}
	if (term_tp == "A") {
		payment_term_txt=payment_term_txt + term_dt + " Days";
	} else if (term_tp == "B") {
		payment_term_txt=payment_term_txt + "End of this month";
	} else if (term_tp == "C") {
		payment_term_txt=payment_term_txt + "End of next month";
	} else if (term_tp == "D") {
		var th="th";
		if (term_dt == "1") {
			th="st";
		} if (term_dt == "2") {
			th="nd";
		} if (term_dt == "3") {
			th="rd";
		}
		payment_term_txt=payment_term_txt + term_dt + th +" of next month";
	}
	return payment_term_txt;
}


function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) == "inv_no"){
		
		var inv_tp=sheetObj.GetCellValue(Row, "inv_tp");
	    if(inv_tp == "A/R"){
	    	var paramStr="./ACC_INV_0010.clt?f_cmd=-1&&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no");
	        parent.mkNewFrame('A/R Entry', paramStr, "ACC_INV_0010_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }else if(inv_tp == "DB/CR"){
	    	var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no");
	        parent.mkNewFrame('DC Note Entry', paramStr,"ACC_INV_0020_SHEET_"+sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }else if(inv_tp == "A/P"){
	    	var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+sheetObj.GetCellValue(Row, "inv_no");
	        parent.mkNewFrame('A/P Entry(Cost)', paramStr,"ACC_INV_0030_SHEET_"+sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
	    }
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}

function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	
	sheetObj.SetSumValue("inv_dt", "TOTAL");
	
	var sRow=sheetObj.FindSumRow();
	
    if(sRow != -1){
	    sheetObj.SetCellFont("FontBold", sRow, "inv_sum_amt", sRow, "over_91_amt",1);
    }
    
	// Payment Term, Credit Limit를 설정한다
	for(var i=1; i<=sheetObj.LastRow();i++){
		var payment_tp=sheetObj.GetCellValue(i,"sls_gp_cd");
		var term_tp=sheetObj.GetCellValue(i,"cr_term_cd");
		var term_dt=sheetObj.GetCellValue(i,"cr_term_dt");
		var lmt_amt=sheetObj.GetCellValue(i,"crd_lmt_amt");
		var payment_txt=setPaymentTerm(payment_tp,term_tp,term_dt);
		sheetObj.SetCellValue(i,"payment_term",payment_txt,0);
		if (lmt_amt != "") {
			lmt_amt=Number(lmt_amt).toFixed(2);
			sheetObj.SetCellValue(i,"credit_limit","$"+lmt_amt,0);
		}
	}
	sheet1.HideProcessDlg();
}

function clearAll(){
	docObjects[0].RemoveAll();
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	formObj.wh_cd.value ="A";
	
	formObj.tp_nm_ld.value ="FN";
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}


function ComNextDate(isPast,days){
	 var nextdate = new Date();
	 if(isPast){
	  nextdate.setDate(nextdate.getDate() - days);
	 }else{
	  nextdate.setDate(nextdate.getDate() + days);
	 }
	 var dd = nextdate.getDate();
	 var mm = nextdate.getMonth()+1; //January is 0!
	 var yyyy = nextdate.getFullYear();
	 if(dd<10) {
	     dd='0'+dd
	 } 
	 if(mm<10) {
	     mm='0'+mm
	 }
	 nextdate =mm+"-"+dd+ "-"+yyyy;
	 return nextdate;
}
	 
function chkSearchFromToDate(isReq, fmObj, toObj){
 	//Date field is mandatory.
	
 	if(isReq){
 		if(fmObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}

 	//Date field is optional.	
 	}else{
 		
 	
 		if(fmObj.value==''&&toObj.value!=''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(fmObj.value!=''&&toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}
 	
 	}
 	
 	
    if(compare(fmObj.value, toObj.value)){     	
     	alert(getLabel('FMS_COM_ALT033'));
     	fmObj.focus();
     	return false;
    }else{
     	return true;
    }
}


function compare(a,b){
	var dtf = new Date(a);
	var dtt = new Date(b);
	if(dtf>dtt){
//		alert((((((dtt-dtf)/24) /60) /60) /1000) );
		return true;
	}else{
		return false;
	}
}

//Calendar flag value
var firCalFlag=false;

function setChkPeriod(){
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
