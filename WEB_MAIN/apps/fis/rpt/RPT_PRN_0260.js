var PROFITCURR = "";

function doWork(srcName, dVal){
	var formObj=document.frm1;
	
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    
    switch(srcName) {
	    case "SEARCHLIST":
	        formObj.f_cmd.value=SEARCHLIST01;
			
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR'));
				return;
			}
			if(curr_opt == "M"){
				formObj.f_curr_opt.value="M";
			}else{
				//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
	            if(currRateCheck(sheetObj)){
	            	return;
	            }
				formObj.f_curr_opt.value="O";
			}
			formObj.one_curr_rate_sql.value=getRateQuery();
			if(formObj.chk_incl_bkg.checked){
				formObj.incl_bkg.value = "Y";
		    } else {
		    	formObj.incl_bkg.value = "N";
		    }
			sheetObj2.DoSearch("./RPT_PRN_0261GS.clt", FormQueryString(formObj) );
	    break;
	     case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
	 	    	//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR'));
				//return;
				formObj.f_curr_one.checked=true;        
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR'));	
				return;
			}
		    if(formObj.chk_incl_bkg.checked){
		    	formObj.incl_bkg.value = "Y";
		    } else {
		    	formObj.incl_bkg.value = "N";
		    }
		    sheetObj.DoSearch("./RPT_PRN_0260GS.clt", FormQueryString(formObj) );
		    
	    break;
		case 'PRINT':
			formObj.title.value='Pro forma Profit Report';
			if(formObj.bkg_seq.value == "") return;
			//Report 호출 메뉴 
			//var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			//var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR'));
				return;
			}
			if(curr_opt == "O" && sheetObj.DataRow == 0){
				//Please, select the [To Currency] 
	 	    	alert(getLabel('FMS_COM_ALT029'));
				return;
			}
			if(formObj.chk_incl_bkg.checked){
				formObj.incl_bkg.value = "Y";
		    } else {
		    	formObj.incl_bkg.value = "N";
		    }
			
			//Parameter Setting
			var param="";
			var file_names="";
			
			if(MULTI_CURR_FLAG == "Y" && curr_opt == "M"){
				param += '[' + formObj.bkg_seq.value + ']'; 	//$1
				param += '[' + biz_clss_cd + ']';				//$2
				param += '[' + formObj.incl_bkg.value + ']';	//$3
				param += '[' + formObj.f_ofc_cd.value + ']';	//$4
				
				file_names += 'profit_report_bkg_multi_curr.mrd';
				
				formObj.rd_param.value = param;
				formObj.file_name.value = file_names;					
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}else{
				//Multi Currency 인 경우 
				if(curr_opt == "M"){
					ajaxSendPost(searchBkgProfitCurrInfo, 'reqVal', '&goWhere=aj&bcKey=searchBkgProfitCurrInfo&bkg_seq='+frm1.bkg_seq.value+'&biz_clss_cd='+ frm1.biz_clss_cd.value+'&incl_bkg='+ frm1.incl_bkg.value, './GateServlet.gsl');
					
					var profitCurr=PROFITCURR.split("|");					
					for(var i=0 ; i < profitCurr.length ; i ++){
						param += '[' + formObj.bkg_seq.value + ']'; 	//$1
						param += '[' + biz_clss_cd + ']';				//$2
						param += '[' + formObj.incl_bkg.value + ']';	//$3
						param += '[' + formObj.f_ofc_cd.value + ']';	//$4
						param += '[' + profitCurr[i] + ']';				//$5
						if(i < profitCurr.length-1){
							param += '^@@^';
						}	
						
						file_names += 'profit_report_bkg_multi.mrd';
						if(i < profitCurr.length-1){
							file_names += '^@@^';
						}	
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					
					/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
					formObj.rpt_biz_tp.value = "";
					formObj.rpt_biz_sub_tp.value = "";		
					formObj.mailTitle.value = "";		
					formObj.mailTo.value = "";		
					
					popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.bkg_seq.value + ']'; 	//$1
					param += '[' + biz_clss_cd + ']';				//$2
					param += '[' + formObj.incl_bkg.value + ']';	//$3
					param += '[' + formObj.f_ofc_cd.value + ']';	//$4
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';		//$5 f_curr_cd
					param += '[' + getRateQuery() + ']';			//$6 One 인 경우 Currency SQL
					
					file_names += 'profit_report_bkg_one.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}
		break;
		case "CONFIRM": // CONFIRM
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq=' + formObj.bkg_seq.value +'&biz_clss_cd=' + formObj.biz_clss_cd.value, './GateServlet.gsl');

			if(v_bkg_sts_cd != "RD"){
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			} else {
				frm1.f_cmd.value=COMMAND01;
	     	   	if(confirm(getLabel('FMS_COM_CFMSAV'))){  
	     	   		
		     	   	if(formObj.chk_incl_bkg.checked){
						formObj.incl_bkg.value = "Y";
				    } else {
				    	formObj.incl_bkg.value = "N";
				    }
		     	   	
	          	    doShowProcess();
					docObjects[2].DataInsert(1);
					docObjects[2].SetCellValue(1, 1, 1);
					docObjects[2].DoAllSave("./RPT_PRN_0261GS.clt", FormQueryString(frm1),false);
	     	   	}
			}
	
			/*ajaxSendPost(selectBkgProfitCfmList, 'reqVal', '&goWhere=aj&bcKey=selectBkgProfitCfmList&bkg_seq='+ formObj.bkg_seq.value
					  																			  +'&biz_clss_cd='+ formObj.biz_clss_cd.value
					  																			  +'&incl_bkg='+ formObj.incl_bkg.value, './GateServlet.gsl');

			if(cfm_bkg_cnt == 0){
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			} else {
				frm1.f_cmd.value=COMMAND01;
	     	   	if(confirm(getLabel('FMS_COM_CFMSAV'))){    
	          	    doShowProcess();
					docObjects[2].DataInsert(1);
					docObjects[2].SetCellValue(1, 1, 1);
					docObjects[2].DoAllSave("./RPT_PRN_0261GS.clt", FormQueryString(frm1),false);
	     	   	}
			}*/
     	   	
 		break;
		case 'EXCEL':			
			if (isValidDownExcel(sheetObj2))
				sheetObj2.Down2Excel({DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
        break;
		case "CLOSE":
			if(frm1.entry_yn.value == "Y"){
				opener.doWork('SEARCHLIST');
			}
			window.close();
    	break;
    }
}

function isValidDownExcel(sheetObj) {
	if(sheetObj.RowCount() < 1){//no data	
		ComShowCodeMessage("COM132501");
		return false;
	}
	return true;
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
	var formObj=document.frm1;
	
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
   	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
   	
	doWork('SEARCHLIST');
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
	                     {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym",   		  PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 } ];
	         
	        InitColumns(cols);

	        SetEditable(1);
	        InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        SetHeaderRowHeight(20);
	        SetSheetHeight(130);
		} 
		break;
		case 2:      //IBSheet2 init
		with (sheetObj) {

	        SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('RPT_PRN_0261_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"bkg_kind",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"bkg_sts_cd",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",      Hidden:0,  Width:105,  Align:"Center",  ColMerge:1,   SaveName:"bkg_no",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:44,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"bill_to",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:165,  Align:"Left",    ColMerge:0,   SaveName:"frt_nm",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,   SaveName:"local_frt_amt", 	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
      	                 {Type:"Float",     Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,   SaveName:"cost_frt_amt",  	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
      	                 {Type:"Float",     Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,   SaveName:"debit_frt_amt", 	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
      	                 {Type:"Float",     Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,   SaveName:"cr_frt_amt",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
      	                 {Type:"Float",     Hidden:1,  Width:20,   Align:"Center",  ColMerge:0,   SaveName:"profit",        	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
      	                 {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"inv_curr_cd"  },
      	                 {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cfm_usr_nm"   }, 
      	                 {Type:"Date",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cfm_dt" 	  ,Format:"Ymd"}
      	                 ];
	         
	        InitColumns(cols);

	        SetEditable(0);
	        SetSheetHeight(265);
	        SetColProperty("bkg_sts_cd", {ComboText:BKGSTSNM, ComboCode:BKGSTSCD} );
	        //#3208 [CLT] Booking 화면 Profit 버튼 - Pro forma Profit Report 오류
	        sheetObj.ShowSubSum([
	    	                      {StdCol:"inv_curr_cd", SumCols:"10", Sort:false, ShowCumulate:false, CaptionCol:5,CaptionText:"Profit : %col "}
	    	                      ,{StdCol:"inv_curr_cd", SumCols:"6|7|8|9", Sort:false, ShowCumulate:false, CaptionCol:5, CaptionText:"Total"}
	    	                      ]);
	    	
		} 	
		break;
		case 3:
			with (sheetObj) {

		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:"save", Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"save" }]
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
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	
	if(sheetObj2.SearchRows() != 0){
		formObj.f_confirm_by.value = sheet2.GetCellValue(1,"cfm_usr_nm");
		formObj.f_confirm_at.value = sheet2.GetCellValue(1,"cfm_dt");
		setDateFormat(formObj.f_confirm_at);
	}
	
	sub_total();
	
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheet2.LastRow();i++){
		if(sheet2.GetCellValue(i,"inv_curr_cd") != "" && cellValue != sheet2.GetCellValue(i,"inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheet2.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheet2.GetCellValue(i,"inv_curr_cd") != ""){
			cellValue = sheet2.GetCellValue(i,"inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheet2.DataInsert(arrTitleRow[i]+i);
		sheet2.SetMergeCell(row,0,1,sheet2.LastCol());
		var gTitle = "Currency : " +  sheet2.GetCellText(row + 1,"inv_curr_cd");
		sheet2.SetCellValue(row,0, gTitle);
		sheet2.SetRowFontColor(row, "#FF0000");
		sheet2.SetCellFont("FontBold", row,0,row,0,1);
		sheet2.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
	sheet2.SetSelectRow(1);
}

function sheet3_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	
	if(errMsg =='' ){
		showCompleteProcess();
	}
	
	doWork('SEARCHLIST');
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

function sub_total(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
//no support[implemented common]CLT 	sheetObj2.MessageText ("SubSum")="Currency"; 
	
	//표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj2.FindSubSumRow();
    
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 
    	sheetObj2.SetCellFont("FontBold", arrRow[idx],5,arrRow[idx],9,1);
     	
    	if(  sheetObj2.GetCellValue(arrRow[idx],5) == "Total" ){
    		sheetObj2.SetCellAlign(arrRow[idx],5,"Center");
    	}
    	
    	if(  sheetObj2.GetCellValue(arrRow[idx],5).indexOf("Profit") != -1  ){
			sheetObj2.SetCellText(arrRow[idx], 6,sheetObj2.GetCellText(arrRow[idx], 10));
			sheetObj2.SetCellText(arrRow[idx], 7,sheetObj2.GetCellText(arrRow[idx], 10));
			sheetObj2.SetCellText(arrRow[idx], 8,sheetObj2.GetCellText(arrRow[idx], 10));
			sheetObj2.SetCellText(arrRow[idx], 9,sheetObj2.GetCellText(arrRow[idx], 10));
			sheetObj2.SetMergeCell(Number(arrRow[idx]), 6, 1, 4);
    		sheetObj2.SetCellAlign(arrRow[idx], 5,"Center");
    	}
    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function sheet2_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function setDateFormat(obj){
	var length = obj.value.length;
	if(length == 8){
		var strSeperator = "-";
		var mYear = obj.value.substr(0,4);
		var mMonth = obj.value.substr(4,2);
		var mDay = obj.value.substr(6,2);
		obj.value = mMonth+strSeperator+mDay+strSeperator+mYear;
	}
}

function searchBkgProfitCurrInfo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			for(var i=0; i<rtnArr.length-1; i++){
				if(i == 0){
					PROFITCURR += rtnArr[i];
				} else {
					PROFITCURR += '|' + rtnArr[i]
				}
			}
		}
	}
}

var cfm_bkg_cnt = 0;

function selectBkgProfitCfmList(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@^^@');
			cfm_bkg_cnt = rtnArr.length - 1;
		}
	}
}

function sheet2_OnClick(sheetObj, row, col){
	var formObj=document.frm1;
	if(row != 0){
		var subSumRowFlag = false;
		
		//표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
	    var sRow=sheetObj.FindSubSumRow();
	    
	    //가져온 행을 배열로 반든다.
	    var arrRow=sRow.split("|");
	    for (idx=0; idx<arrRow.length; idx++){ 
	    	if(arrRow[idx] == row){
	    		subSumRowFlag = true;
	    	}
	    }
	    
	    if(sheetObj.GetCellValue(row,0).indexOf("Currency : ") != -1){
	    	subSumRowFlag = true;
	    }
	    
	    if(!subSumRowFlag){
	    	formObj.f_confirm_by.value = sheetObj.GetCellValue(row,"cfm_usr_nm");
    		formObj.f_confirm_at.value = sheetObj.GetCellValue(row,"cfm_dt");
    		setDateFormat(formObj.f_confirm_at);
	    }
	}
}

var v_bkg_sts_cd = "";

function getBkgStatus(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_bkg_sts_cd = doc[1];
		}
	}
}

function removeSheet1(){
	docObjects[0].RemoveAll();
}


function removeSheet2(){
	if(!frm1.chk_incl_bkg.checked) {
		docObjects[1].RemoveAll();
	}
}

