//=========================================================
//*@FileName   : RPT_PRN_0210.jsp
//*@FileTitle  : CMM
//*@Description: package search pop
//*@author     : 
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/17
//*@since      : 2014/07/17
//=========================================================

//#3593 [JTC]Profit Report & Performance Report 수정 사항
var GL_VIEW_FALG = "N";


function doWork(srcName, dVal){
	var formObj=document.frm1;
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    switch(srcName) {
	    case "SEARCHLIST":
	        formObj.f_cmd.value=SEARCHLIST01;
	        //Detail, Summary 선택 option
	        var f_prn_opt=document.getElementsByName("f_prn_opt"); 
			var prn_opt=getRadioVal(f_prn_opt);  
			
			if(prn_opt == "D"){
				formObj.f_prn_opt.value="D";
			}else{
				formObj.f_prn_opt.value="S";
			}
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
			}
			formObj.one_curr_rate_sql.value=getRateQuery();
			if(prn_opt == "D"){				
				sheetObj2.DoSearch("./RPT_PRN_0211GS.clt", FormQueryString(formObj) );
			}else{
				sheetObj3.DoSearch("./RPT_PRN_0212GS.clt", FormQueryString(formObj) );
			}
	    break;
	    case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
	 	    	//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR') + "\n\n: RPT_PRN_0210.16");
				//return;
				formObj.f_curr_one.checked=true; 
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0210.23");
				return;
			}
		    sheetObj.DoSearch("./RPT_PRN_0210GS.clt", FormQueryString(formObj) );
	    break;
		case 'Print':
			formObj.title.value='Profit Report';
			if(formObj.oth_seq.value == "") return;
			//Report 호출 메뉴 
			var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			var f_prn_opt=document.getElementsByName("f_prn_opt"); 
			var prn_opt=getRadioVal(f_prn_opt);
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0190.50");
				return;
			}
			//alert("f_prn_opt : "+f_prn_opt + " f_curr_opt : "+f_curr_opt);
			//Parameter Setting
			var param="";
			var file_names="";
			//Multi Currency 인 경우 
			if(MULTI_CURR_FLAG == "Y"){
				if(curr_opt == "M"){					
					param += '[' + formObj.oth_seq.value + ']';  //$1
					param += '[' + air_sea_clss_cd + ']';        //$2
					param += '[' + bnd_clss_cd + ']';		     //$3
					param += '[' + biz_clss_cd + ']';		     //$4
					param += '[' + prn_opt + ']';				 //$5
					param += '[' + formObj.f_ofc_cd.value + ']'; //$6
					param += '['+']';		                     //$7
					param += '['+']';		                     //$8
					param += '[' + GLO_USR_ID + ']';             //$9
					
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_other_dtl_multi_curr.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_other_smr_multi_curr.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
	    
			    //One Currency 인 경우 
				if(curr_opt== "O"){
					
					//Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
		            if(currRateCheck(sheetObj)){
		            	return;
		            }
					
					param += '[' + formObj.oth_seq.value + ']';    //$1
					param += '[' + air_sea_clss_cd + ']';          //$2
					param += '[' + bnd_clss_cd + ']';		       //$3
					param += '[' + biz_clss_cd + ']';		       //$4
					param += '[' + prn_opt + ']';				   //$5
					param += '[' + formObj.f_ofc_cd.value + ']';   //$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';		//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';		   //$8 One 인 경우 Currency SQL
					param += '[' + GLO_USR_ID + ']';               //$9
					
					//#3593 [JTC]Profit Report & Performance Report 수정 사항
					param += '[' + formObj.ex_rate_type.value  + ']'; //$10
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
					if(formObj.ex_rate_type.value == 'OER'){
						param += '[tb_inv_xcrt]';       //$14
					}else{
						param += '[tb_finc_perf_xcrt]'; //$14
					}
					
					
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_other_dtl_one.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_other_smr_one.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//console.log("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}else{
				//Multi Currency 인 경우 
				if(curr_opt == "M"){
					
					var profitCurr = PROFITCURR.split("|");				
					
					//for(var i = 0 ; i < profitCurr.length ; i ++){
						param += '[' + formObj.oth_seq.value + ']';  //$1
						param += '[' + air_sea_clss_cd + ']';        //$2
						param += '[' + bnd_clss_cd + ']';		     //$3
						param += '[' + biz_clss_cd + ']';		     //$4
						param += '[' + prn_opt + ']';				 //$5
						param += '[' + formObj.f_ofc_cd.value + ']'; //$6
						param += '['+']';		                     //$7
						param += '['+']';		                     //$8
						param += '[' + GLO_USR_ID + ']';             //$9
						
						//param += '[' + profitCurr[i] + ']';		//$7
						//if(i < profitCurr.length-1){
						//	param += '^@@^';
						//}	
						//[Detail]
						if(prn_opt == "D")
						{	
							file_names += 'profit_report_other_dtl_multi.mrd';
							//if(i < profitCurr.length-1){
							//	file_names += '^@@^';
							//}	
						}
						//[Summary]
						if(prn_opt == "S")
						{
							file_names += 'profit_report_other_smr_multi.mrd';
							//if(i < profitCurr.length-1){
							//	file_names += '^@@^';
							//}
						}
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
					
					param += '[' + formObj.oth_seq.value + ']';     //$1
					param += '[' + air_sea_clss_cd + ']';           //$2
					param += '[' + bnd_clss_cd + ']';		        //$3
					param += '[' + biz_clss_cd + ']';		        //$4
					param += '[' + prn_opt + ']';				    //$5
					param += '[' + formObj.f_ofc_cd.value + ']';	//$6
					param += '[' + formObj.f_curr_cd.options[formObj.f_curr_cd.selectedIndex].text + ']';		//$7 f_curr_cd
					param += '[' + getRateQuery() + ']';		    //$8 One 인 경우 Currency SQL
					param += '[' + GLO_USR_ID + ']';                //$9
					
					//#3593 [JTC]Profit Report & Performance Report 수정 사항
					param += '[' + formObj.ex_rate_type.value  + ']'; //$10
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
					if(formObj.ex_rate_type.value == 'OER'){
						param += '[tb_inv_xcrt]';       //$14
					}else{
						param += '[tb_finc_perf_xcrt]'; //$14
					}					
					
					
					//[Detail]
					if(prn_opt == "D")
					{	
						file_names += 'profit_report_other_dtl_one.mrd';
					}
					//[Summary]
					if(prn_opt == "S")
					{
						file_names += 'profit_report_other_smr_one.mrd';
					}
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//console.log("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
					popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
				}
			}
		break;
		case "BLOCK_SEARCH_D":
			formObj.f_block_name_d.value ="";
			formObj.f_block_tms_d.value ="";
			if(dVal != "ALL"){
				if(docObjects[1].GetCellValue(dVal, "d_clt_cmpl_flg") == 'Y'){
					formObj.f_block_name_d.value = docObjects[1].GetCellValue(dVal, "d_block_name");
					formObj.f_block_tms_d.value = docObjects[1].GetCellText(dVal, "d_block_tms");
				}
			}
		break;
		case "BLOCK_SEARCH_S":
			formObj.f_block_name_s.value ="";
			formObj.f_block_tms_s.value ="";
			if(dVal != "ALL"){
				if(docObjects[2].GetCellValue(dVal, "clt_cmpl_flg") == 'Y'){
					formObj.f_block_name_s.value = docObjects[2].GetCellValue(dVal, "block_name");
					formObj.f_block_tms_s.value = docObjects[2].GetCellText(dVal, "block_tms");
				}
			}
		break;
		 case "BLOCK":
	 	        //<!-- #5178 [AIF] Block function/button add to Other Operation Profit Report popup -->
		    	var formObj=document.frm1;
		    	
		    	var oth_seq = formObj.oth_seq.value;
		    	var ref_no = formObj.f_ref_no.value;
		    	var usr_id = formObj.f_usr_id.value;
		    	var usr_ofc_cd = formObj.f_ofc_cd.value;
		    	var search_opt = "";
		    	
		    	var f_prn_opt=document.getElementsByName("f_prn_opt"); 
				var prn_opt=getRadioVal(f_prn_opt);
				
				var selectVal="";
				if(prn_opt == "D"){
					selectVal = formObj.f_block_d.value;
				}else{
					selectVal = formObj.f_block_s.value;
				}
		    	
				/*All - Block Maintenance 의 Filing No 기준으로 Block 과 같게*/
				if(selectVal == "ALL" || selectVal == ""){
					/* Block status 재확인 */
					ajaxSendPost(getOthBlBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getOthBlBlockCheck&oth_seq='+oth_seq, './GateServlet.gsl');
		 			
					if( formObj.s_block_status.value == "Y") {
						alert(getLabel('PFM_COM_ALT019')) ;
						return;
					}

					search_opt = "bl";
					if(confirm(getLabel('FMS_COM_CFMBLK'))){
						ajaxSendPost(updateOthBlBlock, 'reqVal', '&goWhere=aj&bcKey=updateOthBlBlock&oth_seq='+oth_seq+'&ref_no='+ref_no+'&usr_id='+usr_id+'&usr_ofc_cd='+usr_ofc_cd+'&search_opt='+search_opt, './GateServlet.gsl');
					}									
				//Block Maintenance의 Invoice 기준으로 Block과 같게	
				}else{
					var invSeq="";
					var invNo ="";
					if(prn_opt == "D"){
						invSeq = docObjects[1].GetCellValue(selectVal, "d_inv_seq");
						invNo = docObjects[1].GetCellValue(selectVal, "d_inv_no");
					}else{
						invSeq = docObjects[2].GetCellValue(selectVal, "inv_seq");
						invNo = docObjects[2].GetCellValue(selectVal, "inv_no");
					}
					
	   	 			ajaxSendPost(getInvBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getInvBlockCheck&inv_seq='+invSeq, './GateServlet.gsl');
	   	 			
					if( formObj.s_inv_block_status.value == "Y") {
						alert(getLabel('PFM_COM_ALT019')) ;
						return;
					}
					
					search_opt = "in";
					if(confirm(getLabel('FMS_COM_CFMBLK'))){
						ajaxSendPost(updateOthBlBlock, 'reqVal', '&goWhere=aj&bcKey=updateOthBlBlock&oth_seq='+oth_seq+'&ref_no='+ref_no+'&usr_id='+usr_id+'&usr_ofc_cd='+usr_ofc_cd+'&inv_seq='+invSeq+'&inv_no='+invNo+'&search_opt='+search_opt, './GateServlet.gsl');
					}	
				}
				
		    	doWork('SEARCHLIST');			
		
		break;    	
		case "CLOSE":
			//ComClosePopup(); 
	    	window.close();
    	break;
    }
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
	
	if (prn_ofc_cd == "BNXC"){
   		formObj.f_opt_sum.checked = true ; 
   		formObj.f_opt_dtl.checked = false ;   		
   	}else{
   		formObj.f_opt_sum.checked = false ;
   		formObj.f_opt_dtl.checked = true ;   		
   	} 	
   	
	
	//#3593 [JTC]Profit Report & Performance Report 수정 사항
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	formObj.gl_view_falg.value = GL_VIEW_FALG;
	
	//OFVFOUR-6975: [JAPAN TRUST] Set up "One Currency" as default on Profit Report
	setChkCurrency();
	
	//OFVFOUR-8209 [KHAN] Default setting on Profit Report 
	var opt_key = "SUMMARY_DEFAULT_P.REPORT";
	ajaxSendPost(setProfitPrintOption, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	doWork('SEARCHLIST');
	
	//#6623 [AIF] ADDING BLOCK FUNCTION ON WH DOC LIST
	if(formObj.air_sea_clss_cd.value == "W"){
		$('#btnBlock').css('display','none');
		$('#mainTable2').css('display','none');
	}
}
/**
* IBSheet Object를 배열로 등록
* 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
* 배열은 소스 상단에 정의
*/
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
	case "sheet1":
		docObjects[0]=sheet_obj;
		break;
	case "sheet2":
		docObjects[1]=sheet_obj;
		break;
	case "sheet3":
		docObjects[2]=sheet_obj;
		break;
	}
	//docObjects[sheetCnt++]=sheet_obj;
}
/**
* 시트 초기설정값, 헤더 정의
* param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
* 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	var remark_width = 200;
	
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
	        SetSheetHeight(145);
		} 
		break;
		case 2:      //IBSheet2 init
			with (sheetObj) {

		        SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

		        var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('RPT_PRN_0181_HDR1'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"Text",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"d_bl_kind" },
		               {Type:"Text",      Hidden:0,  Width:35,  Align:"Center",    ColMerge:1,   SaveName:"d_clt_cmpl_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"d_bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"d_inv_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",     Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"d_bill_to" },
		               {Type:"Text",     Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"d_frt_nm" },
		               //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_copy_local_inv_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_local_inv_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_cost_inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_debit_inv_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"d_cr_inv_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Date",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"d_inv_post_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"d_local_inv_ttl_amt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"d_cost_inv_ttl_amt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"d_agent_inv_ttl_amt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"d_clr_yn",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:remark_width,  Align:"Left",   ColMerge:1,   SaveName:"d_remark",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"d_profit",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_sell_buy_tp_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_org_bl_rcvd_flg" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_express_tp_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_rlsd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_last_chk_no" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_last_pay_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_curr_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_curr_cd2" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_curr_cd3" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_remark2" },
		               {Type:"Text",      Hidden:1, Width:75,   Align:"Right",   ColMerge:1,   SaveName:"d_agent_inv_amt",      KeyField:0,   CalcLogic:"|d_debit_inv_amt|-|d_cr_inv_amt|",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_rcvd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_ref_ofc_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_inv_seq" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_trdp_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_ofc_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_bl_cnt_cd" },
		        	   {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_rmk_bl_no" }, 
		               {Type:"Date",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_block_tms" ,Format:"Ymd"}, 
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_block_name" }, 
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_vchr_no" }, 
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"d_tax_no" } 
		               ];
		         
		        InitColumns(cols);

		        SetEditable(0);
		        SetSheetHeight(320);
	            //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용	        
		        sheetObj.ShowSubSum([
	                {StdCol:"d_inv_curr_cd3", SumCols:"17", Sort:false, ShowCumulate:false, CaptionCol:5,CaptionText:"Profit : %col "}
	                ,{StdCol:"d_inv_curr_cd2", SumCols:"7|8|9|10", Sort:false, ShowCumulate:false, CaptionCol:5, CaptionText:"Total"}
	                ,{StdCol:"d_remark2", SumCols:"7|8|9|10", Sort:false, ShowCumulate:false, CaptionCol:5, CaptionText:" "}
	                ]);
		        
		    	
			} 	
			break;
			case 3:      //IBSheet2 init
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('RPT_PRN_0182_HDR1'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"Text",     Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"bl_kind" },
		               {Type:"Text",      Hidden:0,  Width:35,  Align:"Center",    ColMerge:0,   SaveName:"clt_cmpl_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },	                     
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",     Hidden:0,  Width:220,  Align:"Left",    ColMerge:1,   SaveName:"bill_to" },
		               {Type:"Date",      Hidden:0,  Width:65,   Align:"Left",    ColMerge:1,   SaveName:"inv_post_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"local_inv_ttl_amt",  KeyField:0,   CalcLogic:"Math.round(|local_inv_ttl_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cost_inv_ttl_amt",   KeyField:0,   CalcLogic:"Math.round(|cost_inv_ttl_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"agent_inv_ttl_amt",  KeyField:0,   CalcLogic:"Math.round(|agent_inv_ttl_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:remark_width,  Align:"Left",   ColMerge:1,   SaveName:"remark",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"profit",             KeyField:0,   CalcLogic:"Math.round(|profit|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"sell_buy_tp_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"org_bl_rcvd_flg" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"express_tp_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"rlsd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"last_chk_no" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"last_pay_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd2" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd3" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cnt" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"rcvd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ref_ofc_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_seq" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"trdp_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ofc_cd" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"bl_cnt_cd" },
		               {Type:"Date",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"block_tms" ,Format:"Ymd"}, 
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"block_name" }, 	   
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"vchr_no" },
		               {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"tax_no" }
		               ];
		        
		        InitColumns(cols);
		        //InitViewFormat(0, "block_tms", 	"MM-dd-yyyy");
		        SetEditable(0);
		           
		        SetSheetHeight(320);
		        
	            //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용    
		        if(prn_ofc_cd == 'BNXC'){
			        ShowSubSum([
				        {StdCol:"inv_curr_cd3", SumCols:"11", Sort:false, ShowCumulate:false, CaptionCol:4 ,CaptionText:"Profit : %col "}
				        ,{StdCol:"inv_curr_cd2", SumCols:"6|7|8", Sort:false, ShowCumulate:false, CaptionCol:5, CaptionText:"Total"}
//				        ,{StdCol:"inv_curr_cd", SumCols:"17", Sort:false, ShowCumulate:false, CaptionCol:0 ,CaptionText:"Currency : %col "}
				        ]);
		        }else {
			        ShowSubSum([
				        {StdCol:"inv_curr_cd3", SumCols:"11", Sort:false, ShowCumulate:false, CaptionCol:4 ,CaptionText:"Profit : %col "}
				        ,{StdCol:"inv_curr_cd2", SumCols:"6|7|8", Sort:false, ShowCumulate:false, CaptionCol:5, CaptionText:"Total"}
//				        ,{StdCol:"inv_curr_cd", SumCols:"17", Sort:false, ShowCumulate:false, CaptionCol:0 ,CaptionText:"Currency : %col "}
				        ]);
		        }
		        
		        
			} 	
			break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 

function sheet2_OnSearchEnd(){
	var sheetObj2=docObjects[1];
	setRows2Info(sheetObj2);	
	sub_total();
	//[20131118 ojg]
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i,"d_inv_no") != ""){
		sheetObj2.SetCellFont("FontUnderline", i,"d_inv_no",i,"d_inv_no",1);
		sheetObj2.SetCellFontColor(i, "d_inv_no","#0000FF");
		}	
	}
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheet2.LastRow();i++){
		//console.log(sheet2.GetCellValue(i,"d_inv_curr_cd"));
		if(sheet2.GetCellValue(i,"d_inv_curr_cd") != "" && cellValue != sheet2.GetCellValue(i,"d_inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheet2.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheet2.GetCellValue(i,"d_inv_curr_cd") != ""){
			cellValue = sheet2.GetCellValue(i,"d_inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheet2.DataInsert(arrTitleRow[i]+i);
		sheet2.SetMergeCell(row,0,1,sheet2.LastCol());
		var gTitle = "Currency : " +  sheet2.GetCellText(row + 1,"d_inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												//+ "   B/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheet2.SetCellValue(row,0, gTitle);
		sheet2.SetRowFontColor(row, "#FF0000");
		sheet2.SetCellFont("FontBold", row,0,row,0,1);
		sheet2.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
	
	makeSelectBox(sheet2);
}
function sheet3_OnSearchEnd(){
	var sheetObj3=docObjects[2];
	setRows2Info(sheetObj3);
	summary_sub_total();
	/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
	for(var i=1;i<=sheetObj3.LastRow();i++){
		if(sheetObj3.GetCellValue(i,"inv_no") != ""){
			sheetObj3.SetCellFont("FontUnderline", i,"inv_no", i,"inv_no",1);
			sheetObj3.SetCellFontColor(i, "inv_no","#0000FF");
		}	
	}
	
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheet3.LastRow();i++){
		//console.log(sheet3.GetCellValue(i,"d_inv_curr_cd"));
		if(sheet3.GetCellValue(i,"inv_curr_cd") != "" && cellValue != sheet3.GetCellValue(i,"inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheet3.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheet3.GetCellValue(i,"inv_curr_cd") != ""){
			cellValue = sheet3.GetCellValue(i,"inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheet3.DataInsert(arrTitleRow[i]+i);
		sheet3.SetMergeCell(row,0,1,sheet3.LastCol());
		var gTitle = "Currency : " +  sheet3.GetCellText(row + 1,"inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												//+ "   MB/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheet3.SetCellValue(row,0, gTitle);
		sheet3.SetRowFontColor(row, "#FF0000");
		sheet3.SetCellFont("FontBold", row,0,row,0,1);
		sheet3.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
	}
	
	makeSelectBox(sheet3);
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

//#3593 [JTC]Profit Report & Performance Report 수정 사항
function setUseLoclGlViewFalg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		GL_VIEW_FALG=doc[1];
	} else {
		GL_VIEW_FALG="N";
	}	
}

//<!-- #5178 [AIF] Block function/button add to Other Operation Profit Report popup -->
function getOthBlBlockCheck(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	formObj.s_block_status.value='N';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "Y"){ // Block 처리된 경우
				formObj.s_block_status.value="Y";
			} 
		}
	}
}

function getInvBlockCheck(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	formObj.s_inv_block_status.value='N';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "Y"){ // Block 처리된 경우
				formObj.s_inv_block_status.value="Y";
			} 
		}
	}
}

function updateOthBlBlock(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "B"){ // Block 처리된 경우
				//OFVFOUR-8210: [KHAN] Remove the validation when hitting the Block button
				//alert(getLabel("PFM_COM_ALT020"));
				showCompleteProcess();
			} 
		}
	}
}

function prn_opt_sheet(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
	var f_prn_opt=document.getElementsByName("f_prn_opt"); 
	var prn_opt=getRadioVal(f_prn_opt);
	sheetObj2.SetSheetHeight(320);
	sheetObj3.SetSheetHeight(320);
	//#6623 [AIF] ADDING BLOCK FUNCTION ON WH DOC LIST
	if(formObj.air_sea_clss_cd.value != "W"){
		if(prn_opt == "D"){
			mainTable2.style.display="block";
			mainTable3.style.display="none";
			
			blockDiv_D.style.display="block";
			blockDiv_S.style.display="none";
		}else{
			mainTable2.style.display="none";
			mainTable3.style.display="block";
			
			blockDiv_D.style.display="none";
			blockDiv_S.style.display="block";
		}
	}
}

//중복제거후 inv_no selectBox 생성
function makeSelectBox(sheetObj){
	var formObj=document.frm1;
	var str = ""
	switch(sheetObj.id) {
	case "sheet2":      
		$("#f_block_d").html("");
		formObj.f_block_name_d.value ="";
		formObj.f_block_tms_d.value ="";		
		var dupRows = docObjects[1].ColValueDupRows("d_inv_no");
		var dupR = dupRows.split(",");
		
		var rowChk=true;
		var firstRow = 0;
		for(var j=docObjects[1].HeaderRows(); j < docObjects[1].LastRow(); j++) {
			rowChk=true;
			for(idx=0; idx< dupR.length; idx++){
				if(docObjects[1].GetCellValue(j, "d_inv_no") =="" || j == dupR[idx]){
					rowChk = false;
				}
			}
			
			if(rowChk){
				if(firstRow == 0){
					getBtnObj('btnBlock').style.display='inline';	
					getObj('blockDiv_D').style.display='block';	
					str +="<option value='ALL'>ALL</option>";
				}
				str +="<option value='"+ j  + "'>"+ docObjects[1].GetCellValue(j, "d_inv_no") +"</option>";
				firstRow += 1;
			}
		 }
		 $("#f_block_d").html(str);
		
	break;
	case "sheet3":
		$("#f_block_s").html("");
		formObj.f_block_name_s.value ="";
		formObj.f_block_tms_s.value ="";
		var dupRows = docObjects[2].ColValueDupRows("inv_no");
		var dupR = dupRows.split(",");
		
		var rowChk=true;
		var firstRow = 0;
		for(var j=docObjects[2].HeaderRows(); j < docObjects[2].LastRow(); j++) {
			rowChk=true;
			for(idx=0; idx< dupR.length; idx++){
				if(docObjects[2].GetCellValue(j, "inv_no") =="" || j == dupR[idx]){
					rowChk = false;
				}
			}
			
			if(rowChk){
				if(firstRow == 0){
					getBtnObj('btnBlock').style.display='inline';	
					//getObj('blockDiv_S').style.display='block';	
					str +="<option value='ALL'>ALL</option>";
				}
				str +="<option value='"+ j+ "'>"+ docObjects[2].GetCellValue(j, "inv_no") +"</option>";
				firstRow += 1;
			}
		 }
		 
		 $("#f_block_s").html(str);	
	break;
	}	
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
	    	sheetObj2.SetCellFont("FontBold", arrRow[idx],1,arrRow[idx],15,1);
     	
	    	//sheetObj2.SetCellValue(idx,6,sheetObj2.GetCellValue(idx,7));
	    	
            //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
    	if(  sheetObj2.GetCellValue(arrRow[idx],5) == "Total" ){
			sheetObj2.SetCellText(arrRow[idx], 9,(sheetObj2.GetCellText(arrRow[idx], 9) - sheetObj2.GetCellText(arrRow[idx], 10)));
			sheetObj2.SetCellText(arrRow[idx], 10,sheetObj2.GetCellText(arrRow[idx], 9));
    		sheetObj2.SetCellAlign(arrRow[idx],5,"Center");
    		sheetObj2.SetCellText(arrRow[idx], 6,sheetObj2.GetCellText(arrRow[idx], 7));
    	}
        //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
    	if(  sheetObj2.GetCellValue(arrRow[idx],5).indexOf("Profit") != -1  ){
			sheetObj2.SetCellText(arrRow[idx], 5,sheetObj2.GetCellText(arrRow[idx], 5));
			sheetObj2.SetCellText(arrRow[idx], 6,sheetObj2.GetCellText(arrRow[idx], 17));
			sheetObj2.SetMergeCell(Number(arrRow[idx]), 6, 1, 5);
    		sheetObj2.SetCellAlign(arrRow[idx], 5,"Center");
    	}
    	
    	if(sheetObj2.GetCellValue(arrRow[idx],5) == ""){
	   		 sheetObj2.SetCellAlign(arrRow[idx], 5,"Center");
             //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
	   		sheetObj2.SetCellText(arrRow[idx], 6,sheetObj2.GetCellText(arrRow[idx], 7));
	   		 
	   		 //26888
	    	 if(!(sheetObj2.GetCellValue(arrRow[idx] - 1, 22)=="" && sheetObj2.GetCellValue(arrRow[idx] - 1, 23) == "")){
	    		 var last_chk_no 	= (sheetObj2.GetCellValue(arrRow[idx] - 1, 22)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 22) + " ": "";
				 var last_pay_dt 	= (sheetObj2.GetCellValue(arrRow[idx] - 1, 23)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 23) : "";
				 var vchr_no 		= (sheetObj2.GetCellValue(arrRow[idx] - 1, 38)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 38) : "";
				 var tax_no 		= (sheetObj2.GetCellValue(arrRow[idx] - 1, 39)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 39) : "";
				 
				 if (last_pay_dt != "") {
					 last_pay_dt = last_pay_dt.substring(4,6) + "-" + last_pay_dt.substring(6,8) + "-" + last_pay_dt.substring(0,4);
				 }
				 
				 var remark = "Check # " + last_chk_no + " " + last_pay_dt + ""
				 
				 /*if(PROFIT_RPT_BL_INFO == "Y"){
						remark += " Voucher # " + vchr_no + " Tax No # " + tax_no;
					}*/
	               //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
				 sheetObj2.SetCellText(arrRow[idx], 16, remark);
	    	 }
    	}
    }
}

function summary_sub_total(){
	var formObj=document.frm1;
	var sheetObj3=docObjects[2];
	
    //표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj3.FindSubSumRow();
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 

    	sheetObj3.SetCellFont("FontBold", arrRow[idx],0,arrRow[idx],8,1);

    	//#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
    	if(sheetObj3.GetCellValue(arrRow[idx],5) == "Total" ){
    		sheetObj3.SetCellText(arrRow[idx], 4,sheetObj3.GetCellText(arrRow[idx], 5));
    		sheetObj3.SetCellText(arrRow[idx], 5,"");
    		//sheetObj3.SetMergeCell(Number(arrRow[idx]), 4, 1, 2);
    		sheetObj3.SetCellAlign(arrRow[idx],4,"Center");
    	}
        //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
    	if(sheetObj3.GetCellValue(arrRow[idx],4).indexOf("Profit") != -1 ){
/*    		 sheetObj3.SetCellText(arrRow[idx], 5,sheetObj3.GetCellText(arrRow[idx], 4));
    		 sheetObj3.SetCellText(arrRow[idx], 6,sheetObj3.GetCellText(arrRow[idx], 11));
    		 sheetObj3.SetCellText(arrRow[idx], 7,sheetObj3.GetCellText(arrRow[idx], 11));
    		 sheetObj3.SetCellText(arrRow[idx], 8,sheetObj3.GetCellText(arrRow[idx], 11));*/

    		 sheetObj3.SetCellText(arrRow[idx], 5,sheetObj3.GetCellText(arrRow[idx], 11));
    		 sheetObj3.SetCellAlign(arrRow[idx], 5,"right");
    		 //sheetObj3.SetMergeCell(Number(arrRow[idx]), 4, 1, 2);
    		 sheetObj3.SetMergeCell(Number(arrRow[idx]), 5, 1, 4);
    		 sheetObj3.SetCellAlign(arrRow[idx], 4,"Center");
    	}
   }
}

function setRows2Info(sheetObj){
	var formObj=document.frm1;
 	var sRow=0;
 	var pre_="";
	if(sheetObj == docObjects[1]){
		sRow=1;
	 	pre_="d_";
	}
	if(sheetObj == docObjects[2]){
		sRow=1;
	 	pre_="";
	}
	for(var i=sRow; i<sheetObj.LastRow()+1; i++){

			if(!(sheetObj.GetCellValue(i, pre_+"last_chk_no")=="" && sheetObj.GetCellValue(i, pre_+"last_pay_dt") == "")){
				var last_chk_no 	= (sheetObj.GetCellText(i, pre_+"last_chk_no")!= "") ? sheetObj.GetCellText(i, pre_+"last_chk_no") + " ": "";
				var last_pay_dt 	= (sheetObj.GetCellText(i, pre_+"last_pay_dt")!= "") ? sheetObj.GetCellText(i, pre_+"last_pay_dt") : "";
				var vchr_no 		= (sheetObj.GetCellText(i, pre_+"vchr_no")!= "") ? sheetObj.GetCellText(i, pre_+"vchr_no") : "";
				var tax_no 			= (sheetObj.GetCellText(i, pre_+"tax_no")!= "") ? sheetObj.GetCellText(i, pre_+"tax_no") : "";
				
				var remark = "";
				
				if(sheetObj.GetCellText(i, pre_+"remark") != ""){
					remark = sheetObj.GetCellText(i, pre_+"remark") + " "
				}
				
				remark += "Check # " + last_chk_no + last_pay_dt;
				
//				if(PROFIT_RPT_BL_INFO == "Y"){
//					remark += " Voucher # " + vchr_no + " Tax No # " + tax_no;
//				}
				
				sheetObj.SetCellText(i, pre_+"remark", remark);
			}

	}
}
/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
function sheet3_OnClick(sheetObj3,Row,Col){
	var formObj=document.frm1;
	if(sheetObj3.ColSaveName(Col) == "inv_no"){
		// 소계Row 클릭인 경우, return
		if(sheetObj3.GetCellValue(Row, "inv_no") != ''){
			var inv_seq=sheetObj3.GetCellValue(Row,"inv_seq");
			var inv_no=sheetObj3.GetCellValue(Row,"inv_no");
			var print_type=sheetObj3.GetCellValue(Row,"sell_buy_tp_cd");
			var bl_cnt_cd=sheetObj3.GetCellValue(Row,"bl_cnt_cd");
			var ref_ofc_cd=sheetObj3.GetCellValue(Row,"ref_ofc_cd");
			var ofc_cd=sheetObj3.GetCellValue(Row,"ofc_cd");
			var trdp_cd=sheetObj3.GetCellValue(Row,"trdp_cd");
		} else {
			return
		}
	}else{
		return;
	}
	if(inv_seq != ""){
		//alert(print_type);
		if(print_type == "S"){
			//formObj.file_name.value = 'invoice_06.mrd';
			formObj.file_name.value='invoice_01.mrd';
			formObj.title.value='Local Invoice';
		}else if(print_type == "D" || print_type == "C"){
    		formObj.file_name.value='invoice_02_us.mrd';
			formObj.title.value='Debit/Credit Note';
		}else if(print_type == "B"){
			formObj.file_name.value='invoice_13.mrd';
			formObj.title.value='PAYMENT REQUEST';
		}
	}
	//alert(inv_seq);
	// 날짜변환
	//var tmp_start = formObj.f_strdt.value.replaceAll("-","");
	//var tmp_end   = formObj.f_enddt.value.replaceAll("-","");
	//var start_dt = tmp_start.substring(4,8)+tmp_start.substring(0,2)+tmp_start.substring(2,4);
	//var end_dt   = tmp_end.substring(4,8)+tmp_end.substring(0,2)+tmp_end.substring(2,4);
	var start_dt='';
	var end_dt='';
	if(print_type == "B"){
		//Parameter Setting
  		var param="[" + "'" + inv_seq + "'" + ']';	// [1]
		param += '[' + trdp_cd + ']';					// Vendor [2]
		param += '[' + ref_ofc_cd + ']';				// REF_OFC_CD [3]
		param += '[' + bl_cnt_cd + ']';					// CNT_CD  [4]
		param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
		param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
		param += '[' + formObj.f_usrPhn.value + ']';					// 7
		param += '[' + formObj.f_usrFax.value + ']';					// 8
		param += '[' + formObj.f_usr_nm.value + ']';						// 9
	}else{
		var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
		//if(formObj.prn_radio[0].checked){
			param += "[" + "'" + inv_seq + "'" + ']';			// [2]
			param += '[]';											// [3]
			param += '[]';											// [4]
			param += '[]';											// [5]
			param += '[]';											// [6]	
		/*
		}else{
			param += '[]';											// [2]
			param += '[' + start_dt + ']';							// [3]
			param += '[' + end_dt + ']';							// [4] 
			if(formObj.date_radio[0].checked){
				formObj.f_search_type.value="POST";
			}else{
				formObj.f_search_type.value="INVOICE";
			}
			param += '[' + formObj.f_search_type.value + ']';		// POST DATE OR INVOICE DATE [5]
			if(formObj.sort_radio[0].checked){
				formObj.f_order_type.value="DATE";
			}else{
				formObj.f_order_type.value="INVNO";
			}
			param += '[' + formObj.f_order_type.value + ']';		// ORDER BY(DATE OR INV_NO)	[6]
		}
		*/
		if(print_type == "D" || print_type == "C"){
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
		}else if(print_type == "S"){
			//param += '[' + ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
			param += '[' + bl_cnt_cd + ']';				// CNT_CD  [9]
			param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
		}
		param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
		param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
		param += '[' + formObj.f_usrId.value + ']';					// 11, 13
		//param += '[' + formObj.main_trdp.value + ']';				// 12, 14
		param += '[]';				// 12, 14
		if(print_type == "D" || print_type == "C"){
			param += '[' + formObj.f_ofc_loc_nm.value + ']';		//13  cr_db
			param += '[]';		//14  cr_db
			param += '[]';
		}
	}
	formObj.f_inv_seq.value=inv_seq;
	var temp='';
	var mailTitle='';
	if(print_type =="D" || print_type=="C"){
		temp='Credit/Debit Note No : ';
	}else{
		temp='Invoice No : ';
	}
	mailTitle=temp + inv_no;	
	formObj.mailTitle.value=mailTitle;
	formObj.rpt_biz_tp.value="ACCT";
	if(print_type=="D" || print_type=="C"){
		formObj.rpt_biz_sub_tp.value="DC";
	} else if (print_type=="S"){
		formObj.rpt_biz_sub_tp.value="AR";
	} else {
		formObj.rpt_biz_sub_tp.value="AP";
	}	
	var trdp_cd1='';
	trdp_cd1='(' + '\'' + trdp_cd + '\'' + ')';
	//alert(trdp_cd1);
	ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd1, './GateServlet.gsl');
	formObj.mailTo.value=mailTo;
	formObj.oth_seq_tmp.value=formObj.oth_seq.value;
	formObj.oth_seq.value="";
	//alert(param);
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	formObj.oth_seq.value=formObj.oth_seq_tmp.value;
}
//[20131118 OJG]
function sheet2_OnClick(sheetObj2,Row,Col){
	var formObj=document.frm1;
	if(sheetObj2.ColSaveName(Col) == "d_inv_no"){
		if(sheetObj2.GetCellValue(Row, "d_inv_seq") != ''){
			var inv_seq=sheetObj2.GetCellValue(Row,"d_inv_seq");
			var inv_no=sheetObj2.GetCellValue(Row,"d_inv_no");
			var print_type=sheetObj2.GetCellValue(Row,"d_sell_buy_tp_cd");
			var bl_cnt_cd=sheetObj2.GetCellValue(Row,"d_bl_cnt_cd");
			var ref_ofc_cd=sheetObj2.GetCellValue(Row,"d_ref_ofc_cd");
			var ofc_cd=sheetObj2.GetCellValue(Row,"d_ofc_cd");
			var trdp_cd=sheetObj2.GetCellValue(Row,"d_trdp_cd");
		} else {
			return;
		}
	}else{
		return;
	}
	if(inv_seq != ""){
		//alert(print_type);
		if(print_type == "S"){
			//formObj.file_name.value = 'invoice_06.mrd';
			formObj.file_name.value='invoice_01.mrd';
			formObj.title.value='Local Invoice';
		}else if(print_type == "D" || print_type == "C"){
    		formObj.file_name.value='invoice_02_us.mrd';
			formObj.title.value='Debit/Credit Note';
		}else if(print_type == "B"){
			formObj.file_name.value='invoice_13.mrd';
			formObj.title.value='PAYMENT REQUEST';
		}
	}
	//alert(inv_seq);
	// 날짜변환
	//var tmp_start = formObj.f_strdt.value.replaceAll("-","");
	//var tmp_end   = formObj.f_enddt.value.replaceAll("-","");
	//var start_dt = tmp_start.substring(4,8)+tmp_start.substring(0,2)+tmp_start.substring(2,4);
	//var end_dt   = tmp_end.substring(4,8)+tmp_end.substring(0,2)+tmp_end.substring(2,4);
	var start_dt='';
	var end_dt='';
	if(print_type == "B"){
		//Parameter Setting
  		var param="[" + "'" + inv_seq + "'" + ']';	// [1]
		param += '[' + trdp_cd + ']';					// Vendor [2]
		param += '[' + ref_ofc_cd + ']';				// REF_OFC_CD [3]
		param += '[' + bl_cnt_cd + ']';					// CNT_CD  [4]
		param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
		param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
		param += '[' + formObj.f_usrPhn.value + ']';					// 7
		param += '[' + formObj.f_usrFax.value + ']';					// 8
		param += '[' + formObj.f_usr_nm.value + ']';						// 9
	}else{
		var param='[' + formObj.f_email.value + ']';				// USER EMAIL';	[1]
		//if(formObj.prn_radio[0].checked){
			param += "[" + "'" + inv_seq + "'" + ']';			// [2]
			param += '[]';											// [3]
			param += '[]';											// [4]
			param += '[]';											// [5]
			param += '[]';											// [6]	
		/*
		}else{
			param += '[]';											// [2]
			param += '[' + start_dt + ']';							// [3]
			param += '[' + end_dt + ']';							// [4] 
			if(formObj.date_radio[0].checked){
				formObj.f_search_type.value="POST";
			}else{
				formObj.f_search_type.value="INVOICE";
			}
			param += '[' + formObj.f_search_type.value + ']';		// POST DATE OR INVOICE DATE [5]
			if(formObj.sort_radio[0].checked){
				formObj.f_order_type.value="DATE";
			}else{
				formObj.f_order_type.value="INVNO";
			}
			param += '[' + formObj.f_order_type.value + ']';		// ORDER BY(DATE OR INV_NO)	[6]
		}
		*/
		if(print_type == "D" || print_type == "C"){
			//param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
		}else if(print_type == "S"){
			//param += '[' + ref_ofc_cd.value + 'MAINCMP]';		// CURR BRANCH[7]
			param += '[' + trdp_cd + ']';				// TRDP_CD [7]
			param += '[' + ref_ofc_cd + ']';			// OFC_CD  [8]
			param += '[' + bl_cnt_cd + ']';				// CNT_CD  [9]
			param += '[' + formObj.f_usr_nm.value + ']';				// USER_NM [10]
		}
		param += '[' + formObj.f_usrPhn.value + ']';				// 9,  11
		param += '[' + formObj.f_usrFax.value + ']';				// 10, 12
		param += '[' + formObj.f_usrId.value + ']';					// 11, 13
		//param += '[' + formObj.main_trdp.value + ']';				// 12, 14
		param += '[]';				// 12, 14
		param += '[' + formObj.f_ofc_loc_nm.value + ']';		//13  cr_db
		param += '[]';		//13  cr_db
	}
	formObj.f_inv_seq.value=inv_seq;
	var temp='';
	var mailTitle='';
	if(print_type =="D" || print_type=="C"){
		temp='Credit/Debit Note No : ';
	}else{
		temp='Invoice No : ';
	}
	mailTitle=temp + inv_no;	
	formObj.mailTitle.value=mailTitle;
	formObj.rpt_biz_tp.value="ACCT";
	if(print_type=="D" || print_type=="C"){
		formObj.rpt_biz_sub_tp.value="DC";
	} else if (print_type=="S"){
		formObj.rpt_biz_sub_tp.value="AR";
	} else {
		formObj.rpt_biz_sub_tp.value="AP";
	}	
	var trdp_cd1='';
	trdp_cd1='(' + '\'' + trdp_cd + '\'' + ')';
	//alert(trdp_cd1);
	ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd1, './GateServlet.gsl');
	formObj.mailTo.value=mailTo;
	formObj.oth_seq_tmp.value=formObj.oth_seq.value;
	formObj.oth_seq.value="";
	//alert(param);
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	formObj.oth_seq.value=formObj.oth_seq_tmp.value;
}

/* #18793, [GPL]Profit Report jsjang 2013.11.8 */
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
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
//OFVFOUR-8209 [KHAN] Default setting on Profit Report
function setProfitPrintOption(reqVal){
	var formObj=document.frm1; 
	var doc=getAjaxMsgXML(reqVal); 
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) { 
		if(doc[1] == "Y"){
			formObj.f_opt_sum.checked = true;
			prn_opt_sheet();
		}
	} 
}