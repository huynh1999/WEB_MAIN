
/*=========================================================
* 1.0 Creation
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0020.js
*@FileTitle  :  Volume Report
*@author     : CLT
*@version    : 1.0
*@since      : 2010/06/25
=========================================================*/

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
    	    if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
    			return;
    		}
            formObj.f_cmd.value=SEARCHLIST;
            //선택된 radio 버튼을 값을 rpt_tp_opt, rpt_sub_opt 에 set
            setRadioVal();
			if(formObj.s_sel_val.value == "" && formObj.s_sel_sub_val.value == ""){
				//Can't Retrieve. Please, Print. //MESSAGE REFINE???
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('SELECT'));	
				formObj.s_sel_val.focus();
				return;
			}
			
			formObj.rpt_tp_opt_col.value 		= getReportType("s_rpt_tp_opt",  "CD", "WHERE");
			formObj.rpt_sub_opt_col.value 		= getReportType("s_rpt_sub_opt", "CD", "WHERE");
			formObj.rpt_tp_opt_nm_col.value 	= getReportType("s_rpt_tp_opt",  "NM", "WHERE");
			formObj.rpt_sub_opt_nm_col.value 	= getReportType("s_rpt_sub_opt", "NM", "WHERE");
			
            sheetObj.DoSearch("./PFM_MGT_0020GS.clt", FormQueryString(formObj) );
            break;
       case "ALL":
    	   var dept_cd=formObj.f_dept_cd.value;
    	 //LHK, 20140404, 유저별 접근권한 차별화 로직 제거
//    	   if(dept_cd == "2" 
//    			|| dept_cd == "3"
//    				|| dept_cd == "4"
//    					|| dept_cd == "5"
//    						|| dept_cd == "6"
//    							|| dept_cd == "7"){
//    		   return;
//    	   }else{
	    	   formObj.s_oi_dptm_flg.checked=true;
	    	   formObj.s_ai_dptm_flg.checked=true;
	    	   formObj.s_oe_dptm_flg.checked=true;
	    	   formObj.s_ae_dptm_flg.checked=true;
//    	   }
       break;
       case "CLEAR":
    	   var dept_cd=formObj.f_dept_cd.value;
    	 //LHK, 20140404, 유저별 접근권한 차별화 로직 제거
//    	   if(dept_cd == "2" 
//    			|| dept_cd == "3"
//    				|| dept_cd == "4"
//    					|| dept_cd == "5"
//    						|| dept_cd == "6"
//    							|| dept_cd == "7"){
//    		   return; 
//    	   }else{
	    	   formObj.s_oi_dptm_flg.checked=false;
	    	   formObj.s_ai_dptm_flg.checked=false;
	    	   formObj.s_oe_dptm_flg.checked=false;
	    	   formObj.s_ae_dptm_flg.checked=false;
//    	   }
       break;
       case "ADD":
    	   var initCnt=sheetObj2.RowCount();
    	    //sheet1의 내용을  sheet2로 옮긴다.
			//Copy2SheetCol(TargetSheet,SrcColumns DestColumns, StartRow ,  EndRow,DestRow,AddType,useSameSaveName,raiseChangeEvent, SrcCheckCol, DestCheckCol) 
    	   sheetObj.Copy2SheetCol(sheetObj2, "1|2|3|4",	"1|2|3|4", -1,	-1,	-1, 2, true, true, 0, 0);
    	   if(initCnt==0 && sheetObj2.RowCount()> 0){
    		   var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
			   var s_rpt_sub_opt=document.getElementsByName("s_rpt_sub_opt");
			   for(var i=0; i<s_rpt_tp_opt.length; i++){
				   s_rpt_tp_opt[i].disabled=true;
			   } 
			   for(var i=0; i<s_rpt_sub_opt.length; i++){
				   s_rpt_sub_opt[i].disabled=true;
			   } 
    	   }
       break;
       case "ALLCLEAR":
    	    doWork('CLEAR');
    		var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
    		for(var i=0; i<collTxt.length; i++){
    		  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
    			  collTxt[i].value="";
    		  }           
    		}
    		formObj.s_prn_opt[0].checked=true;
    		formObj.s_sort_opt[0].checked=true;
    		formObj.s_dt_clss_cd.checked=true;
    		initFinish();
    		var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
			var s_rpt_sub_opt=document.getElementsByName("s_rpt_sub_opt");
		    for(var i=0; i<s_rpt_tp_opt.length; i++){
		 	   s_rpt_tp_opt[i].disabled=false;
		 	   if(i==0) s_rpt_tp_opt[i].checked=true;
		    } 
		    for(var i=0; i<s_rpt_sub_opt.length; i++){
		 	   s_rpt_sub_opt[i].disabled=false;
		 	  if(i==0) s_rpt_sub_opt[i].checked=true;
		    } 
		    
		     
		    // #52497 
		    formObj.s_sales_type_y.checked = true;
		    formObj.s_sales_type_n.checked = true;
		    formObj.s_sales_type_c.checked = true;
		    
		    


		    //LHK, 20141029 #44986 [BINEX]Office - All Option
		    setOfficeAllOption(formObj.s_ofc_cd);
		    
    		formObj.s_sel_val.value="";
    		formObj.s_sel_sub_val.value="";
    		sheetObj.RemoveAll();
    		sheetObj2.RemoveAll();
       break;	   
       case 'PRINT':
	   	    if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
				return;
			}
	   	    //Department Type
	       	var dptm_flg	=	setDeptVal();								//Department Option

	       	if(!dptm_flg){
				//Please select a [Department Type]!
	       		alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
				return;
			}
    	   
	       var s_prn_opt = document.getElementsByName("s_prn_opt");	//Print Option
	       var prn_opt = getRadioVal(s_prn_opt);

    	   if(prn_opt == "M" && isIntervalDt()){  //Month 일 경우 3개월 이내인지 확인
    		   //If option is month, the period should be set within three months.
    		   alert(getLabel('PFM_COM_ALT003'));
    		   return;
			}
    	   
    	    //Batch Performance LKH 2015.01.28            
            createBatchPrf();
	   break;
       case "BATCH_PRF_END_ACTION":
    	   if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
				return;
			}
	   	    //Department Type
	       	var dptm_flg	=	setDeptVal();								//Department Option

	       	if(!dptm_flg){
				//Please select a [Department Type]!
	       		alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
				return;
			}
   	   
	       var s_prn_opt = document.getElementsByName("s_prn_opt");	//Print Option
	       var prn_opt = getRadioVal(s_prn_opt);

	   	   if(prn_opt == "M" && isIntervalDt()){  //Month 일 경우 3개월 이내인지 확인
	   		   //If option is month, the period should be set within three months.
	   		   alert(getLabel('PFM_COM_ALT003'));
	   		   return;
		   }

	       	formObj.title.value='Volume Report';
	       	setRadioVal();	//Report Type, sub option radio check value set
	       	//======================= Period 조회 조건 query ======================= 
	       	var periodSql="";
	       	var periodCol="";
	       	var s_dt_clss_cd=formObj.s_dt_clss_cd.value; 
	       	var s_prd_strdt=mkFormat1(formObj.s_prd_strdt.value); 
	       	var s_prd_enddt=mkFormat1(formObj.s_prd_enddt.value); 
	       	//======================= Period 조회 조건 query ======================= 
	       	if(s_dt_clss_cd == "PDT"){
	       		periodCol = "POST_DT ";
	       	}
	       	if(s_dt_clss_cd == "ETD"){
	       		periodCol = "ETD_PERIOD_DT ";
	       	}
	       	if(s_dt_clss_cd == "ETA"){
	       		periodCol = "ETA_PERIOD_DT ";
	       	}
	       	if(s_dt_clss_cd == "MBL"){
	       		periodCol = "CONVERT(VARCHAR(8), MBL_PERIOD_DT, 112) " ;
	       	}
	       	periodSql = " AND " + periodCol + " BETWEEN '" + s_prd_strdt + "' AND '" + s_prd_enddt + "' ";
	       	
	       	//============================================================================================
	       	var rpt_tp_opt=formObj.rpt_tp_opt.value;
			var rpt_sub_opt=formObj.rpt_sub_opt.value;
				
	       	//======================== option 조회 필드 Name ======================= 
			var opt1_col 	 = getReportType("s_rpt_tp_opt", "NM", "SELECT");
	       	var opt1_grp_col = getReportType("s_rpt_tp_opt", "CD", "SELECT");
	       	
	       	//=====================  조회 Sheet List query ======================= 
	   		optListValSql = getOptionQuery();
	       	
	       	//===================== sort 조건 query ======================= 
	       	var s_sort_opt=document.getElementsByName("s_sort_opt");
	       	var sort_opt=getRadioVal(s_sort_opt);
	       	var sort_col="";
	       	if(prn_opt == "D")
				{	
	       		if(sort_opt ==  "1"){sort_col = "OPT1_COL, AGENT_NM";}
		    		if(sort_opt ==  "2"){sort_col = "OPT1_COL, FCL_TEU_SUM DESC";}
		    		if(sort_opt ==  "3"){sort_col = "OPT1_COL, CBM DESC";}
		    		//if(sort_opt ==  "4"){sort_col = "OPT1_COL, MK_GRS_WGT DESC";}
		    		if(sort_opt ==  "4"){sort_col = "OPT1_COL, GRS_WGT DESC";}
		    		if(sort_opt ==  "5"){sort_col = "OPT1_COL, CHG_WGT DESC";}
				}
	       	if(prn_opt == "S"){
	       		if(sort_opt ==  "1"){sort_col = "OPT1_COL";}
		    		if(sort_opt ==  "2"){sort_col = "FCL_TEU_SUM DESC";}
		    		if(sort_opt ==  "3"){sort_col = "CBM DESC";}
		    		//if(sort_opt ==  "4"){sort_col = "MK_GRS_WGT DESC";}
		    		if(sort_opt ==  "4"){sort_col = "GRS_WGT DESC";}
		    		if(sort_opt ==  "5"){sort_col = "CHG_WGT DESC";} 		
				}
	       	if(prn_opt == "M"){
	       		if(sort_opt ==  "1"){sort_col = "OPT1_COL";}
		    		if(sort_opt ==  "2"){sort_col = "FCL_TEU_SUM DESC";}
		    		
		    		//#4235 Volume Report 버그 관련 수정
		    		//if(sort_opt ==  "3"){sort_col = "CBM DESC";}
		    		if(sort_opt ==  "3"){sort_col = "ORD_CBM DESC";}
		    		
		    		//if(sort_opt ==  "4"){sort_col = "GRS_WGT DESC";}
		    		if(sort_opt ==  "4"){sort_col = "ORD_GWT DESC";}
		    		
		    		//if(sort_opt ==  "5"){sort_col = "CHG_WGT DESC";}
		    		if(sort_opt ==  "5"){sort_col = "ORD_CWT DESC";}
	       	}	
			var param="";
			var file_names="";
			
			//================= Parameter Setting ======================= 
			param += '[' + formObj.f_dptm_val.value + ']'; 		//$1	Department Type
			param += '[' + prn_opt + ']';  						//$2	Print Option
			param += '[' + sort_opt + ']';		 				//$3    Sort By
			param += '[' + formObj.s_dt_clss_cd.value + ']';	//$4	Period
			param += '[' + formObj.s_prd_strdt.value + ']';		//$5	StartDt
			param += '[' + formObj.s_prd_enddt.value + ']';		//$6	EndDt
			param += '[' + formObj.rpt_tp_opt.value + ']';		//$7	Report Type
			param += '[' + formObj.rpt_sub_opt.value + ']';		//$8	Sub Option
			param += '[' + formObj.s_ofc_cd.value + ']';		//$9	Office
			param += '[' + usrNm  + ']';						//$10	User Name
			
			//param += '[' + arr_dptm_flg[i].value.substring(0,1)  + ']';	//$11	Air Ocean 
			//param += '[' + arr_dptm_flg[i].value.substring(1,2)  + ']';	//$12	Import Export
			
			param += '[' +  ''  + ']';	//$11	Air Ocean 
			param += '[' +  ''  + ']';	//$12	Import Export
			
			param += '[' + periodCol + ']';						//$13	Period column
			param += '[' + periodSql + ']';						//$14	Period 조회 조건 query 
			
			param += '[' + opt1_col + ']';						//$15	Report Type 조회 column
			param += '[' + sort_col + ']';						//$16	sort 조회 조건 column
			
			param += '[' + optListValSql + ']';					//$17	option 조회 조건 query 
			
			if(prn_opt == "M"){									//$18   option Month 조회시 - StartDt (주쿼리에서 +1 , +2 next month 를 search해 sub query 에서 사용)						
				param += '[' + s_prd_strdt + ']';
			}else{
				param += '[' + '' + ']';						//$18
			}
			
			param += '[' + formObj.f_ofc_cd.value + ']';		//$19  user office code
			
			var grp_by_ofc_flg = "";
			if(formObj.s_grp_by_ofc_flg.checked){
				grp_by_ofc_flg = "T"
			}
			param += '[' + grp_by_ofc_flg + ']';				//$20  
			
			
			//#52497 추가 
			var salesY = "";
			var salesN = "";
			var salesC = "";
			var cnt = 0;
			if (formObj.s_sales_type_y.checked == true){
				salesY = ",'Y'"; cnt++;
			}
			if (formObj.s_sales_type_n.checked == true){
				salesN = ",'N'"; cnt++;
			}
			if (formObj.s_sales_type_c.checked == true){
				salesC = ",'C'"; cnt++;
			}
			
			if (cnt == 0){
				alert(getLabel('FMS_COM_ALT004') + "\n - Sales Type");
				return;
			}
			 
			var sales_value = salesY+salesN+salesC;			
			sales_value = sales_value.substring(1); 
			//alert(cnt + " "+sales_value);
			if (cnt == 3){
				param += "[]";   	    //$21			
			}else{
				param += "[ AND NOMI_FLG IN ("+sales_value+")]";   	    //$21			
			} 	
			
			//#628 [UNICO] PROFIT REPORT HEADER UPDATE (WITH SEARCH CONDITION)
			var dupRowsType = sheetObj2.ColValueDupRows("rpt_option_nm",{"IncludeDelRow" : 0});
			var arrRowType=dupRowsType.split(",");	
			var reportType ="";
			var dupFlagType = false;
			for(var j=sheetObj2.HeaderRows(); j <= sheetObj2.LastRow(); j++) {
				dupFlagType = false;
	        	for(var i=0; i<arrRowType.length; i++) {
	        		if(j == arrRowType[i]){
	        			dupFlagType = true;
	        		} 
	        	}	
	        	if(!dupFlagType && sheetObj2.GetCellValue(j, "rpt_option_nm") != "")
	        		reportType += sheetObj2.GetCellValue(j, "rpt_option_nm") + ", ";
			}
			if(reportType.length > 0){
				reportType = reportType.substring(0,reportType.length-2);
			}
			param += '['+reportType+']';                //$22
			
			
			
			var dupRowsOpt = sheetObj2.ColValueDupRows("rpt_sub_option_nm",{"IncludeDelRow" : 0});
			var arrRowOpt=dupRowsOpt.split(",");	
			var reportOpt ="";
			var dupFlagOpt = false;
			for(var j=sheetObj2.HeaderRows(); j <= sheetObj2.LastRow(); j++) {
				dupFlagOpt = false;
	        	for(var i=0; i<arrRowOpt.length; i++) {
	        		if(j == arrRowOpt[i]){
	        			dupFlagOpt = true;
	        		} 
	        	}	
	        	if(!dupFlagOpt && sheetObj2.GetCellValue(j, "rpt_sub_option_nm") != "")
	        		reportOpt += sheetObj2.GetCellValue(j, "rpt_sub_option_nm") + ", ";
			}
			if(reportOpt.length > 0){
				reportOpt = reportOpt.substring(0,reportOpt.length-2);
			}
			param += '['+reportOpt+']';                //$23				

			
			//[Detail]
			if(prn_opt == "D")
			{
				file_names = 'volume_report_detail_by_ofc.mrd';
			}

			//[Summary]
			if(prn_opt == "S")
			{	
				file_names = 'volume_report_summary_by_ofc.mrd';	
			}
			
			//[Month]
			if(prn_opt == "M")
			{	
				file_names = 'volume_report_month_by_ofc.mrd';
			}
			//console.log("file_name : " + file_names + " \n\r rd_param : "+ param);
			formObj.rd_param.value = param;
			formObj.file_name.value = file_names;
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

//Batch Performance LKH 2015.01.28
function createBatchPrf(){
	var formObj=document.frm1;
	doShowProcess();
	ajaxSendPostAsync(setBatchPrf, 'reqVal', '&goWhere=aj&bcKey=setBatchPrf&f_usrId='+formObj.f_usrId.value, './GateServlet.gsl');	
}
//Batch Performance LKH 2015.01.28
function setBatchPrf(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	doHideProcess();
	if(doc[0]=='OK'){
		//alert('Success');
	}else{
		alert(getLabel('FMS_COM_ALT019'));
	}
	doWork('BATCH_PRF_END_ACTION');
	
}
function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
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
	//alert(formObj.f_dept_cd.value);
	//LHK, 20140404, 유저별 접근권한 차별화 로직 제거
//	setDeptType();
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
            
         //  (5, 0, 0, true);
           var cnt=0;

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('PFM_MGT_0020_HDR1'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);

           SetEditable(1);
           SetSheetHeight(200);
                 }

                              
         break;
         case 2:      //IBSheet2 init
        	    with(sheetObj){
            
          // (5, 0, 0, true);
           var cnt=0;

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, NewRowDeleteMode:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('PFM_MGT_0020_HDR2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"resetChk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"rpt_option",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"rpt_sub_option",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
            
           InitColumns(cols);

           SetEditable(1);
           SetSheetHeight(200);
                 }

                            
            break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
}

function sheet2_OnBeforeCheckAll(sheetObj, Row, Col) { 
	switch(sheetObj.ColSaveName(Col)){
	case "resetChk":
		if(confirm('Do you really want to delete the whole?')){
			return true;
		}else{
			return false;
		}
	}
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
    
    // #52497 
    formObj.s_sales_type_y.checked = true;
    formObj.s_sales_type_n.checked = true;
    formObj.s_sales_type_c.checked = true;    
}
function fRadio(value) {
	var formObj=document.frm1;
	if(value == ""){
		formObj.s_sel_sub_val.value="";//trdp_cd
		formObj.s_sel_sub_val.className='search_form-disable';
		formObj.s_sel_sub_val.readOnly=true;
	}else{
		formObj.s_sel_sub_val.className='search_form';
		formObj.s_sel_sub_val.readOnly=false;
	}
}
function setRadioVal(){
	var formObj=document.frm1;
	var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
    var s_rpt_sub_opt=document.getElementsByName("s_rpt_sub_opt");
	formObj.rpt_tp_opt.value=getRadioVal(s_rpt_tp_opt);
	formObj.rpt_sub_opt.value=getRadioVal(s_rpt_sub_opt);
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

function mkFormat2(dtStr){
	 var rtnStr = "";
	 var dtStr  = dtStr.replaceAll('-',''); 
	    	
	 rtnStr = dtStr.substring(4,6) + dtStr.substring(6,8) + dtStr.substring(0,4); 
	 
	 return rtnStr;
}

function isIntervalDt(){
	var formObj  = document.frm1;
	
   var s_prd_strdt = formObj.s_prd_strdt.value;
   var s_prd_enddt = formObj.s_prd_enddt.value;
   
   s_prd_strdt		= mkFormat1(s_prd_strdt); 
   
   if(compareTwoDate(s_prd_enddt, mkFormat2(addDate("m", 3, s_prd_strdt, "")))){
   	return true;
   }
   
   return false;
}

/**
 * Department type Set
 * userInfo.getDept_cd() 에 따라 Department type 사용 권한을 차별화 한다.
 * Dept_cd 권한 
 * 1 : Manager        -- 모든 권한 , else 도 모든 권한
 * 2 : Air Export     -- Air Export 권한 
 * 3 : Air Import     -- Air Import 권한 
 * 4 : Ocean Export   -- Ocean Export 권한 
 * 5 : Ocean Import   -- Ocean Import 권한 
 * 6 : Sales Team     -- 권한 x
 * 7 : Accounting     -- 권한 x
 */
function setDeptType(){
	var formObj=document.frm1;
	var dept_cd=formObj.f_dept_cd.value;
	formObj.s_oi_dptm_flg.checked=false;
   	formObj.s_ai_dptm_flg.checked=false;
   	formObj.s_oe_dptm_flg.checked=false;
   	formObj.s_ae_dptm_flg.checked=false;
	if(dept_cd == "2"){
		formObj.s_ae_dptm_flg.checked=true;
	}else if(dept_cd == "3"){
 	   	formObj.s_ai_dptm_flg.checked=true;
	}else if(dept_cd == "4"){
 	   	formObj.s_oe_dptm_flg.checked=true;
	}else if(dept_cd == "5"){
 	   	formObj.s_oi_dptm_flg.checked=true;
	}
	if(dept_cd == "2" 
		|| dept_cd == "3"
			|| dept_cd == "4"
				|| dept_cd == "5"
					|| dept_cd == "6"
						|| dept_cd == "7"){
		formObj.s_oi_dptm_flg.disabled=true;
	   	formObj.s_ai_dptm_flg.disabled=true;
	   	formObj.s_oe_dptm_flg.disabled=true;
	   	formObj.s_ae_dptm_flg.disabled=true;
	}else{
		formObj.s_oi_dptm_flg.disabled=false;
	   	formObj.s_ai_dptm_flg.disabled=false;
	   	formObj.s_oe_dptm_flg.disabled=false;
	   	formObj.s_ae_dptm_flg.disabled=false;
	}
}

function setDeptVal(){

	var formObj  = document.frm1;
		
	var f_dptm_val = "";
	var arr_dptm_flg = new Array(4);								//Department Option
	var cnt			 = 0;

	arr_dptm_flg[0] = formObj.s_oi_dptm_flg;
	arr_dptm_flg[1] = formObj.s_oe_dptm_flg;
	arr_dptm_flg[2] = formObj.s_ai_dptm_flg;
	arr_dptm_flg[3] = formObj.s_ae_dptm_flg;

	for(var i = 0 ; i < arr_dptm_flg.length; i ++){
	   if(arr_dptm_flg[i].checked){
		   f_dptm_val	+= "'" + arr_dptm_flg[i].value + "', ";
		   cnt++;
	   }
	} 

	if(cnt > 0){
		formObj.f_dptm_val.value = f_dptm_val.substring(0,f_dptm_val.length-2);
		return true;
	}else{
		formObj.f_dptm_val.value = "";
		return false;
	}
	 
}
 
function getReportType(radioNmVal, colType, searchType){
	
	//
	var colVal		= "";
	var colVal_		= "";
	var colVal_0 	= "";
	var colVal_1 	= "";
	var colVal_2 	= "";
	var colVal_3 	= "";	
	var colVal_4 	= "";
	var colVal_5 	= "";
	var colVal_6 	= "";
	var colVal_7 	= "";
	var colVal_8 	= "";
	var colVal_9 	= "";
	var colVal_10  	= "";
	var colVal_11 	= "";
	var colVal_12 	= "";
	var colVal_13 	= "";
	var colVal_14 	= "";
	var colVal_17 	= "";
	
	if(colType == "NM"){
		colVal		= "";
		colVal_		= "";
		colVal_0 	= "";
		colVal_1 	= "ref_no";
		colVal_2 	= "fnl_dest_nm";
		colVal_3 	= "bl_no";	
		colVal_4 	= "sls_usr_nm";
		colVal_5 	= "agent_nm";
		colVal_6 	= "shpr_nm";
		colVal_7 	= "carr_nm";
		colVal_8 	= "cnee_nm";
		colVal_9 	= "pol_nm";
		colVal_10  	= "cust_nm";
		colVal_11 	= "pod_nm";
		colVal_12 	= "opr_usr_nm";
		colVal_13 	= "acc_grp_id";
		colVal_14 	= "del_nm";
		//#289 [BINEX] PROFIT REPORT TO ADD REPORT TYPE: TEAM/OPERATOR OPTION
		if(searchType == "SELECT"){
			//OFVFINS-372 [AWS3] V4.7.0.09 NEW RELEASE UPGRADE ON 01/14/2021
			//colVal_17 	= "ISNULL(team, \'none\') \+ \'\/\' \+ ISNULL(opr_usr_nm, \'none\')";
			colVal_17 	= "ISNULL(team, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101)) + CHAR(47) + ISNULL(opr_usr_nm, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101))";
		}else{
			
			colVal_17 	= "opr_usr_nm";
		}
	}
	
	if(colType == "CD"){
		colVal		= "";
		colVal_		= "";
		colVal_0 	= "";
		colVal_1 	= "ref_no";
		colVal_2 	= "fnl_dest_cd";
		colVal_3 	= "bl_no";	
		colVal_4 	= "sls_usr_nm";
		colVal_5 	= "agent_cd";
		colVal_6 	= "shpr_cd";
		colVal_7 	= "carr_cd";
		colVal_8 	= "cnee_cd";
		colVal_9 	= "pol_cd";
		colVal_10  	= "cust_cd";
		colVal_11 	= "pod_cd";
		colVal_12 	= "opr_usr_nm";
		colVal_13 	= "acc_grp_id";
		colVal_14 	= "del_cd";
		//#289 [BINEX] PROFIT REPORT TO ADD REPORT TYPE: TEAM/OPERATOR OPTION
		if(searchType == "SELECT"){
			//OFVFINS-372 [AWS3] V4.7.0.09 NEW RELEASE UPGRADE ON 01/14/2021
			//colVal_17 	= "ISNULL(team, \'none\') \+ \'\/\' \+ ISNULL(opr_usr_nm, \'none\')";
			colVal_17 	= "ISNULL(team, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101)) + CHAR(47) + ISNULL(opr_usr_nm, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101))";
		}else{
			
			colVal_17 	= "opr_usr_nm";
		}
	}
	
	var s_rpt_tp_opt 	= document.getElementsByName(radioNmVal);
	var optCol			= "";
	
    for(var i=0; i<s_rpt_tp_opt.length; i++){
    	if(s_rpt_tp_opt[i].checked){
    		optCol	=	eval("colVal_"+s_rpt_tp_opt[i].value);
    	}
    } 
   
    return optCol;
	
}        	


function getOptionQuery(){
	optCol1=" " + getReportType("s_rpt_tp_opt", "NM", "WHERE") + " ";
	optCol2=" " + getReportType("s_rpt_sub_opt", "NM", "WHERE") + " ";
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	var optListValSql="";
	for(var i=1; i<=sheetObj2.LastRow();i++){
		if(i == 1){
			optListValSql += " AND (";
		}else{
			optListValSql += " OR ";
		}
		var rpt_option_nm=sheetObj2.GetCellValue(i, "rpt_option_nm").replaceAll("'", "^^@@").replaceAll("^^@@", "''");
		var rpt_sub_option_nm=sheetObj2.GetCellValue(i, "rpt_sub_option_nm").replaceAll("'", "^^@@").replaceAll("^^@@", "''");
		if(sheetObj2.GetCellValue(i, "rpt_option") != "" && sheetObj2.GetCellValue(i, "rpt_sub_option") != ""){
			optListValSql += " (" + optCol1 + "='" + rpt_option_nm
			                         + "' AND " + optCol2 + "='" + rpt_sub_option_nm
			                     +"') "
			                 ;
		}
		if(sheetObj2.GetCellValue(i, "rpt_option") != "" && sheetObj2.GetCellValue(i, "rpt_sub_option") == ""){
			optListValSql +=  optCol1 + "='" + rpt_option_nm + "' "
                            ;
		}
		if(sheetObj2.GetCellValue(i, "rpt_option") == "" && sheetObj2.GetCellValue(i, "rpt_sub_option") != ""){
			optListValSql +=  optCol2 + "='" + rpt_sub_option_nm + "' "
                            ;
		}
    	if(i == sheetObj2.LastRow()){
			optListValSql += " ) ";
    	}	
    }
	return optListValSql;
}

//Calendar flag value
var firCalFlag=false;
