//#3593 [JTC]Profit Report & Performance Report 수정 사항
var GL_VIEW_FALG = "N";

function doWork(srcName){
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
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0200.17");
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
				formObj.one_curr_rate_sql.value=getRateQuery();
			}
			sheetObj2.DoSearch("./RPT_PRN_0191GS.clt", FormQueryString(formObj) );
	    break;
	    case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
//	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR') + "\n\n: RPT_PRN_0190.16");
//				return;
                formObj.f_curr_one.checked=true;				                      
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0190.23");
				return;
			}
		    sheetObj.DoSearch("./RPT_PRN_0190GS.clt", FormQueryString(formObj) );
	    break;
		case 'Print':
			formObj.title.value='Profit Report By HB/L';
			if(formObj.intg_bl_seq.value == "") return;
			//Report 호출 메뉴 
			var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0190.48");
				return;
			}
			/*
			if(curr_opt == "O" && sheetObj.DataRow == 0){
				//Please, select the [To Currency] 
    	    	alert(getLabel('FMS_COM_ALT029') + "\n\n: RPT_PRN_0190.55");
				return;
			}
			*/			
			//alert(" f_curr_opt : "+f_curr_opt);
			//Parameter Setting
			var param="";
			var file_names="";
			//Multi Currency 인 경우 
			if(MULTI_CURR_FLAG == "Y"){
				if(curr_opt == "M"){
					var profitCurr=PROFITCURR.split("|");	
					if(profitCurr.length == 1){
						profitCurr[1] = "";
					}
					param += '[' + formObj.intg_bl_seq.value + ']'; //$1
					param += '[' + air_sea_clss_cd + ']';  			//$2
					param += '[' + bnd_clss_cd + ']';		 		//$3
					param += '[' + biz_clss_cd + ']';				//$4
					param += '[' + formObj.f_bl_no.value + ']';		//$5
					param += '[' + formObj.f_ofc_cd.value + ']';	//$6
					param += '[' + profitCurr[0] + ']';				//$7
					param += '[' + profitCurr[1] + ']';				//$8
					param += '[' + GLO_USR_ID + ']';	            //$9
					file_names += 'profit_report_mbl_byHbl_multi_curr.mrd';
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}else{
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.intg_bl_seq.value + ']'; 		//$1
					param += '[' + air_sea_clss_cd + ']';  					//$2
					param += '[' + bnd_clss_cd + ']';		 				//$3
					param += '[' + biz_clss_cd + ']';						//$4
					param += '[' + formObj.f_bl_no.value + ']';				//$5
					param += '[' + formObj.f_ofc_cd.value + ']';			//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';	//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';		            //$8 One 인 경우 Currency SQL
					param += '[' + GLO_USR_ID + ']';	                    //$9
					param += '[' + formObj.ex_rate_type.value  + ']'; //$10
					
					//#3593 [JTC]Profit Report & Performance Report 수정 사항
					param += '[' + formObj.locl_curr_cd.value  + ']'; //$11
					param += '[' + formObj.gl_view_falg.value  + ']'; //$12
					if(formObj.gl_view_falg.value == 'Y' 
						&& formObj.ex_rate_type.value == 'OER'
						&& formObj.locl_curr_cd.value == formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text	
						)
					{
						param += '[Y]'; //$13
					}else{
						param += '[]'; //$13
					}
					
					file_names += 'profit_report_mbl_byHbl_one.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}else{
				//Multi Currency 인 경우 
				if(curr_opt == "M"){
					//var profitCurr = PROFITCURR.split("|");				
					
					//for(var i = 0 ; i < profitCurr.length ; i ++){
						param += '[' + formObj.intg_bl_seq.value + ']'; //$1
						param += '[' + air_sea_clss_cd + ']';  			//$2
						param += '[' + bnd_clss_cd + ']';		 		//$3
						param += '[' + biz_clss_cd + ']';				//$4
						param += '[' + formObj.f_bl_no.value + ']';		//$5
						param += '[' + formObj.f_ofc_cd.value + ']';	//$6
						param += '[' + ']';				                //$7
						param += '[' + ']';				                //$8
						param += '[' + GLO_USR_ID + ']';	            //$9
						
					//	param += '[' + profitCurr[i] + ']';				//$7
					//	param += '[' + profitCurr[i] + ']';				//$8
						
					//	if(i < profitCurr.length-1){
					//		param += '^@@^';
					//	}	

						file_names += 'profit_report_mbl_byHbl_multi.mrd';
						
					//	if(i < profitCurr.length-1){
					//		file_names += '^@@^';
					//	}
					//}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){					
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }					
					param += '[' + formObj.intg_bl_seq.value + ']'; 		//$1
					param += '[' + air_sea_clss_cd + ']';  					//$2
					param += '[' + bnd_clss_cd + ']';		 				//$3
					param += '[' + biz_clss_cd + ']';						//$4
					param += '[' + formObj.f_bl_no.value + ']';				//$5
					param += '[' + formObj.f_ofc_cd.value + ']';			//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';	//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';		            //$8 One 인 경우 Currency SQL
					param += '[' + GLO_USR_ID + ']';	                    //$9
					param += '[' + formObj.ex_rate_type.value  + ']'; //$10
					file_names += 'profit_report_mbl_byHbl_one.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}
		break;
		case 'EXCEL':
			if(sheetObj2.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(			sheetObj2), SheetDesign:1,Merge:1 });
	   		}
        break;
		case 'MINIMIZE':
			if(mainForm.style.display != "none") {
				mainForm.style.display="none";
				$(formObj.btnMinimize).html("Maximize");
				sheetObj2.SetSheetHeight(510);
			} else {
				mainForm.style.display="block";
				$(formObj.btnMinimize).html("Minimize");
				sheetObj2.SetSheetHeight(340 );
			}
        break; 
		case "CLOSE":
			ComClosePopup();
	    	window.close();
    	break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var exChangeHdr ="PFM_MGT_0030_HDR1";//#1422 [PATENT] 0215_02 Report Exchange Rate - Financial/Operational Option
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1;
	
	if( formObj.air_sea_clss_cd.value  == "S" ){
		mbl.style.display="inline";
	}else {	
		mawb.style.display="inline";
	}
	
	//#3593 [JTC]Profit Report & Performance Report 수정 사항
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	frm1.gl_view_falg.value = GL_VIEW_FALG;	
	
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
	
	//OFVFOUR-6975: [JAPAN TRUST] Set up "One Currency" as default on Profit Report
	setChkCurrency();
	
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
		        var headers = [ { Text:getLabel(exChangeHdr), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym" },
		               {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 } ];
		         
		        InitColumns(cols);
	
		        SetEditable(1);
	            InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	            SetSheetHeight(100);

		} 
		break;
		case 2:      //IBSheet2 init
		with (sheetObj) {
	        
	        SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('RPT_PRN_0191_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",     Hidden:0,  Width:140,  Align:"Center",  ColMerge:1,   SaveName:"bl_no" },
	               {Type:"Text",      Hidden:0,  Width:280,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"sls_usr_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"fnl_dest_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"volume",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"ratio",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"prf_amt",          KeyField:0,   CalcLogic:"Math.round(|prf_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd2" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd3" },
	               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"prf_sum_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 } ];
	         
	        InitColumns(cols);

	        SetEditable(0);
	        SetSheetHeight(340);
	        ShowSubSum([
//	                    {StdCol:"inv_curr_cd", SumCols:"7", Sort:false, ShowCumulate:false, CaptionCol:0 ,CaptionText:"Currency"}
	                    {StdCol:"inv_curr_cd2", SumCols:"6", Sort:false, ShowCumulate:false, CaptionCol:3,CaptionText:"Profit : %col "}
	                    ,{StdCol:"inv_curr_cd3", SumCols:"6", Sort:false, ShowCumulate:false, CaptionCol:3, CaptionText:"Adjustment  "}
	                    ]);
		} 
		break;
	}
}
//조회 후 페이지징 표시
//#1422 [PATENT] 0215_02 Report Exchange Rate - Financial/Operational Option
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
    if(formObj.ex_rate_type.value=="FER"){
    	exChangeHdr = "PFM_MGT_0030_HDR1";
    }else{
    	exChangeHdr = "PFM_MGT_0030_HDR1_1";
    }
    
	//docObjects[0] = docObjects[0].Reset();
    comConfigSheet(docObjects[0], SYSTEM_FIS);
    initSheet(docObjects[0],1);
    comEndConfigSheet(docObjects[0]);
} 
function sheet2_OnSearchEnd(){
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
		var gTitle = "Currency : " +  sheet2.GetCellText(row + 1,"inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												+ "   MB/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheet2.SetCellValue(row,0, gTitle);
		sheet2.SetRowFontColor(row, "#FF0000");
		sheet2.SetCellFont("FontBold", row,0,row,0,1);
		sheet2.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
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
 
    //표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj2.FindSubSumRow();
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    var adjustVal=0;
    for (idx=0; idx<arrRow.length; idx++){ 

    	if(  sheetObj2.GetCellValue(arrRow[idx],3).indexOf("Adjustment") != -1  ){
    		sheetObj2.SetCellText(arrRow[idx], 4 ,sheetObj2.GetCellText(arrRow[idx], 3));
    		adjustVal=(Number(sheetObj2.GetCellValue(arrRow[idx]-1, "prf_sum_amt")) - Number(sheetObj2.GetCellValue(arrRow[idx], 6))).toFixed(2);
    		sheetObj2.SetCellText(arrRow[idx], 5 ,adjustVal);
    		sheetObj2.SetCellText(arrRow[idx], 6 ,adjustVal);
    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 3, 1, 2);
    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 5, 1, 2);
    		sheetObj2.SetCellAlign(arrRow[idx],3,"Right");
    		sheetObj2.SetCellAlign(arrRow[idx],5,"Right");
    		if(adjustVal == 0){
    			sheetObj2.SetRowHidden(arrRow[idx],1);
    		}
    	}
    	if(  sheetObj2.GetCellValue(arrRow[idx],3).indexOf("Profit") != -1  ){
    		var prf_sum_amt=0;

    		sheetObj2.SetCellText(arrRow[idx], 4 ,sheetObj2.GetCellValue(arrRow[idx], 3));
    		prf_sum_amt=(Number(sheetObj2.GetCellValue(arrRow[idx], 6)) + Number(adjustVal)).toFixed(2);
    		sheetObj2.SetCellText(arrRow[idx], 6 ,prf_sum_amt);
    		sheetObj2.SetCellText(arrRow[idx], 5 ,prf_sum_amt);
    		
    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 3, 1, 2);
    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 5, 1, 2);
    		sheetObj2.SetCellAlign(arrRow[idx],3,"Center");
    		sheetObj2.SetCellAlign(arrRow[idx],6,"Right");
    		
    	}
    }
}
function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet2_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

//#3593 [JTC]Profit Report & Performance Report 수정 사항
function setUseLoclGlViewFalg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		GL_VIEW_FALG=doc[1];
	} else {
		GL_VIEW_FALG="N";
	}	
}
//OFVFOUR-6975: [JAPAN TRUST] Set up "One Currency" as default on Profit Report
function setChkCurrency(){
	//Period default 설정 (P : Post Date, I : Invoice Date)
	var opt_key = "ACCT_POP_FINC_CURR_DFLT";
	ajaxSendPost(setRdoChkCurrency, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setRdoChkCurrency(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == 'O'){
			formObj.f_curr_opt[1].checked = true;
			doWork("CURR_SEARCH");
		}
	} 
}