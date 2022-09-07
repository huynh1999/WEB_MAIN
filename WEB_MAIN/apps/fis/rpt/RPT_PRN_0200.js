var PROFIT_RPT_BL_INFO = "N";
//#3593 [JTC]Profit Report & Performance Report 수정 사항
var GL_VIEW_FALG = "N";

var exChangeHdr ="PFM_MGT_0030_HDR1";//#1422 [PATENT] 0215_02 Report Exchange Rate - Financial/Operational Option
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
 			sheetObj2.DoSearch("./RPT_PRN_0201GS.clt", FormQueryString(formObj) );
	    break;
	    case "CURR_SEARCH":
	        formObj.f_cmd.value=SEARCHLIST;
	        var f_curr_opt=document.getElementsByName("f_curr_opt");	//Currency Option
		    var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt != "O"){
				//Please, select the [One Currency]
	 	    	//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_OCUR') + "\n\n: RPT_PRN_0200.16");
				//return;
				formObj.f_curr_one.checked=true;              
			}
		    if(formObj.f_curr_cd.value == ""){
		    	//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0200.23");
				return;
			}
 	       sheetObj.DoSearch("./RPT_PRN_0200GS.clt", FormQueryString(formObj) );
	    break;
		case 'Print':
			//2012.02.16 : Billing Code의 Prmc.가 check된 대상 만 Profit에 포함됨(AND frt.pfmc_flg = 'Y')
			formObj.title.value='Profit Report By HB/L';
			if(formObj.intg_bl_seq.value == "") return;
			//Report 호출 메뉴 
			var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
			var bnd_clss_cd=formObj.bnd_clss_cd.value;
			var biz_clss_cd=formObj.biz_clss_cd.value;
			//One, Multi Currency 선택 option
			var f_curr_opt=document.getElementsByName("f_curr_opt");		
			var curr_opt=getRadioVal(f_curr_opt);
			if(curr_opt == "O" && sheetObj.DataRow == 0){
				//Please, select the [To Currency]
	 	    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR') + "\n\n: RPT_PRN_0200.51");
				return;
			}
			//Parameter Setting
			var param="";
			var file_names="";
			//Multi Currency 인 경우 
			if(MULTI_CURR_FLAG == "Y"){
				if(curr_opt == "M"){					
					//var profitCurr=PROFITCURR.split("|");					
					param += '[' + formObj.intg_bl_seq.value + ']'; //$1
					param += '[' + air_sea_clss_cd + ']';  			//$2
					param += '[' + bnd_clss_cd + ']';		 		//$3
					param += '[' + biz_clss_cd + ']';				//$4
					param += '[' + formObj.f_bl_no.value + ']';		//$5
					param += '[' + formObj.f_ofc_cd.value + ']';	//$6
					param += '[' + formObj.f_usrId.value + ']';		//$7
					
					//param += '[' + profitCurr[0] + ']';
					file_names += 'profit_report_hbl_byHbl_multi_curr.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;
					//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
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
					param += '[' + getRateQuery() + ']';					//$8 One 인 경우 Currency SQL
					param += '[' + formObj.f_usrId.value + ']';				//$9
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
					
					
					
					file_names += 'profit_report_hbl_byHbl_one.mrd';
					
					formObj.rd_param.value = param;
					formObj.file_name.value = file_names;					
					//console.log("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
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
						param += '[' + formObj.f_usrId.value + ']';		//$7
						//param += '[' + profitCurr[i] + ']';				//$7
						//if(i < profitCurr.length-1){
						//	param += '^@@^';
						//}	

						file_names += 'profit_report_hbl_byHbl_multi.mrd';
						
						//if(i < profitCurr.length-1){
						//	file_names += '^@@^';
						//}
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
					param += '[' + getRateQuery() + ']';					//$8 One 인 경우 Currency SQL
					param += '[' + formObj.f_usrId.value + ']';				//$9
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
					
					file_names += 'profit_report_hbl_byHbl_one.mrd';
					
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
//	   			sheetObj2.Down2Excel({ HiddenColumn:-1, Merge:1});
	   			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
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
//			ComClosePopup(); 
			window.close(); 
    	break;
		case "SEARCH_CNTR":	//Container 議고쉶
	    	//Container List 議고쉶
	   	    formObj.f_cmd.value=SEARCHLIST02;
	   	    docObjects[3].DoSearch("./RPT_PRN_0183GS.clt", FormQueryString(frm1) );
 	    break;
		case "SEARCH_PAYMENT":	//#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
			formObj.f_cmd.value=SEARCHLIST03;
			docObjects[4].DoSearch("./RPT_PRN_0202GS.clt", FormQueryString(frm1) );
			break;
		case "BLOCK_SEARCH_D":
			formObj.f_block_name_d.value ="";
			formObj.f_block_tms_d.value ="";
			if(docObjects[1].GetCellValue(dVal, "clt_cmpl_flg") == 'Y'){
				formObj.f_block_name_d.value = docObjects[1].GetCellValue(dVal, "block_name");
				formObj.f_block_tms_d.value = docObjects[1].GetCellText(dVal, "block_tms");
			}
			break;	
	    case "BLOCK":
 	        //<!-- #969 [PATENT]  문의요망 Block 기능 보강 - Profit Report Block -->
	    	var formObj2=document.frm2;
			
			var selectVal="";
			selectVal = formObj.f_block_d.value;
			
			if(selectVal == ""){
				alert(getLabel('FMS_COM_ALT101')) ;
				return;
			}
			//Block Maintenance의 Invoice 기준으로 Block과 같게	

			var invSeq="";
			invSeq = docObjects[1].GetCellValue(selectVal, "inv_seq");
			formObj2.inv_seq.value = invSeq;
			formObj2.inv_no.value = docObjects[1].GetCellValue(selectVal, "inv_no2");
			
 			ajaxSendPost(getInvBlockCheck, 'reqVal', '&goWhere=aj&bcKey=getInvBlockCheck&inv_seq='+invSeq, './GateServlet.gsl');
 			
			if( formObj2.s_block_satus.value == "Y") {
				alert(getLabel('PFM_COM_ALT019')) ;
				return;
			}
	    	formObj2.f_cmd.value=COMMAND02;
			if(confirm(getLabel('FMS_COM_CFMBLK'))){
				formObj2.search_opt.value="in";
				//formObj2.target="ifrm1";
				//formObj2.submit();
				
				doShowProcess();
				docObjects[2].DataInsert(1);docObjects[2].SetCellValue(1, "save","test");
				//parameter inv_no, inv_seq 
				docObjects[2].DoSave("./RPT_PRN_0181GS.clt", FormQueryString(formObj2),"save",false);
			}				

	    	
	        
	        
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
	
	// #1433 - [PATENT] 0215_17 PROFIT REPORT ADDITIONAL ITEMS
	var opt_key = "PROFIT_RPT_BL_INFO";
	ajaxSendPost(setProfitRptBlInfo, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#3593 [JTC]Profit Report & Performance Report 수정 사항
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	
	frm1.gl_view_falg.value = GL_VIEW_FALG;
	
	if(PROFIT_RPT_BL_INFO == "Y" && formObj.air_sea_clss_cd.value  == "S"){  //#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
		var wW = 1270;
		var wH = screen.height * 0.8;

		window.resizeTo(wW, wH);
		window.moveTo((window.screen.width - wW) / 2, (window.screen.height - wH) / 2);

		bl_title_y.style.display = "inline";
		getObj('div_bl_info').style.display = "inline";
		
		getObj('div_cntr_list').style.display="inline";
		getObj('div_pay_list').style.display="inline";  //#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
		
		getObj('div_ref_info').style.display = "none";
		
		getObj('mainTable2').style.width = "100%";
		
	} else {
		
		bl_title_n.style.display = "inline";
		getObj('div_bl_info').style.display = "none";
		getObj('div_ref_info').style.display = "inline";
		
		if( formObj.air_sea_clss_cd.value  == "S" ){
			hbl.style.display="inline";
		}else {	
			hawb.style.display="inline";
		}
		
		getObj('mainTable2').style.width = "1075px";
	}
	
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	
	docObjects[1].SetExtendLastCol(0);
	docObjects[3].SetExtendLastCol(0);
	docObjects[4].SetExtendLastCol(0);  //#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
	
	formObj.f_curr_cd.value=formObj.h_curr_cd.value;
	
	//OFVFOUR-6975: [JAPAN TRUST] Set up "One Currency" as default on Profit Report
	setChkCurrency();
	
	doWork('SEARCHLIST');
	
	if(PROFIT_RPT_BL_INFO == "Y" && formObj.air_sea_clss_cd.value  == "S"){
		doWork('SEARCH_CNTR');
		doWork('SEARCH_PAYMENT'); //#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
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
	case "sheet4":
		docObjects[3]=sheet_obj;
		break;
	case "sheet5":    //#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
		docObjects[4]=sheet_obj;
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
	
	switch(sheetNo) {
		case 1:      //IBSheet2 init
				    with(sheetObj){
			       
			     // (3, 0, 0, true);
			      var cnt=0;
		
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
			            SetSheetHeight(120);
	      }


		break;
		case 2:      //IBSheet2 init
		    with(sheetObj){
	       
	      //(24, 0, 0, false);
	      var cnt=0;

	      SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('RPT_PRN_0201_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",     Hidden:0,  Width:35,   Align:"Center",    ColMerge:1,   SaveName:"bl_kind" },
	             {Type:"Text",      Hidden:0,  Width:35,  Align:"Center",    ColMerge:1,   SaveName:"clt_cmpl_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },      
	             {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bl_no" },
	             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"inv_no2" },
	             {Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd" },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"bill_to",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:32,   Align:"Center",  ColMerge:0,   SaveName:"frt_kind",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"frt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"ratio",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"local_inv_amt",   KeyField:0,   CalcLogic:"Math.round(|local_inv_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cost_inv_amt",    KeyField:0,   CalcLogic:"Math.round(|cost_inv_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"dc_inv_amt",      KeyField:0,   CalcLogic:"Math.round(|dc_inv_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"clr_yn",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",   ColMerge:0,   SaveName:"remark",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"sell_buy_tp_cd" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_no" },
	             {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"profit",          KeyField:0,   CalcLogic:"Math.round((|local_inv_amt|-|cost_inv_amt|+|dc_inv_amt|)*100)/100",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Float",      Hidden:1, Width:20,   Align:"Center",  ColMerge:0,   SaveName:"",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd2" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"inv_curr_cd3" },
	             {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:0,   SaveName:"remark2" },
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
	      		SetEditable(0);
	            InitViewFormat(0, "inv_post_dt", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	            SetSheetHeight(320);
          
	            if(PROFIT_RPT_BL_INFO == "Y"){
	            	ShowSubSum([
	  	                      {StdCol:"inv_curr_cd3", SumCols:"17", Sort:false, ShowCumulate:false, CaptionCol:7, CaptionText:"Profit : %col "}
	  	                      ,{StdCol:"inv_curr_cd2", SumCols:"9|10|11", Sort:false, ShowCumulate:false, CaptionCol:7, CaptionText:"Total"}
	  	                      ,{StdCol:"remark2", SumCols:"9|10|11", Sort:false, ShowCumulate:false, CaptionCol:7, CaptionText:" "}
//	  	                      ,{StdCol:"inv_curr_cd", SumCols:"15", Sort:false, ShowCumulate:false, CaptionCol:0,CaptionText:"Currency : %col "}
	  	                      ]);
	            } else {
	            	ShowSubSum([
	  	                      {StdCol:"inv_curr_cd3", SumCols:"17", Sort:false, ShowCumulate:false, CaptionCol:7, CaptionText:"Profit : %col "}
	  	                      ,{StdCol:"inv_curr_cd2", SumCols:"9|10|11", Sort:false, ShowCumulate:false, CaptionCol:7, CaptionText:"Total"}
//	  	                      ,{StdCol:"inv_curr_cd", SumCols:"15", Sort:false, ShowCumulate:false, CaptionCol:0,CaptionText:"Currency : %col "}
	  	                      ]);
	            	
	            	SetColHidden("remark", 1);
	            }
		        
		        
//		        SetSubSumBackColor("#ECE7F7");
	      }


		break;
		case 3:      //IBSheet3 init
			with (sheetObj) {

		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:"save", Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"save" }]
		        InitColumns(cols);
		        SetEditable(1);
		        SetSheetHeight(130);
			} 
			break;
		case 4:		//Container List 그리드
		    with(sheetObj){
			
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('RPT_PRN_0183_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
		                   {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                   {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		                   {Type:"Int",       Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7  },
		                   {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                   {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		                   {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		                   {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
		                   {Type:"Float",     Hidden:0,  Width:140,  Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 } ];
		       
		      InitColumns(cols);
		      SetEditable(0);
  			  SetSheetHeight(200);
		} 
		    break;
		case 5:		//Payment Information 그리드   //	#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청
			with(sheetObj){
			
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('RPT_PRN_0202_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);
			
	        var cols = [ {Type:"Status",   Hidden:1, Width:0,     Align:"Center", ColMerge:0, SaveName:"ibflag" },
	                     {Type:"Text",     Hidden:0, Width:40,    Align:"Center", ColMerge:0, SaveName:"biz_clss_cd" },
	                     {Type:"Text",     Hidden:0, Width:120,   Align:"Center", ColMerge:1, SaveName:"bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"CheckBox", Hidden:0, Width:55,    Align:"Center", ColMerge:1, SaveName:"verify_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"verify_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"CheckBox", Hidden:0, Width:55,    Align:"Center", ColMerge:1, SaveName:"pay_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"pay_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"CheckBox", Hidden:0, Width:55,    Align:"Center", ColMerge:1, SaveName:"hold_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"hold_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"hold_reason",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:100 },
	                     {Type:"CheckBox", Hidden:0, Width:70,    Align:"Center", ColMerge:1, SaveName:"release_flag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"release_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	                     
	         ]
			InitColumns(cols);
			SetEditable(0);
			SetSheetHeight(200);
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
	var sheetObj2=docObjects[1];
	sub_total();
	//[20131118 ojg]
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i,"inv_no2") != ""){
 			sheetObj2.SetCellFont("FontUnderline", i,"inv_no2", i,"inv_no2",1);
 			sheetObj2.SetCellFontColor(i, "inv_no2","#0000FF");
		}	
	}
	
	/**
	 * 소계 TITLE 영역 상단 출력
	 */
	var formObj = document.frm1;
	var arrTitleRow = new Array();
	var cellValue="";
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i,"inv_curr_cd") != "" && cellValue != sheetObj2.GetCellValue(i,"inv_curr_cd")){
			arrTitleRow.push(i);
			var mergeRow = sheetObj2.GetMergedEndCell(i,0).split(",")[0];
			if(mergeRow != i){
				i=mergeRow;
			}
		}
		if(sheetObj2.GetCellValue(i,"inv_curr_cd") != ""){
			cellValue = sheetObj2.GetCellValue(i,"inv_curr_cd");
		}
	}
	
	for(var i=0; i < arrTitleRow.length ; i++){
		var row = sheetObj2.DataInsert(arrTitleRow[i]+i);
		sheetObj2.SetMergeCell(row,0,1,sheetObj2.LastCol());
		var gTitle = "Currency : " +  sheetObj2.GetCellText(row + 1,"inv_curr_cd") 
													+ "   Reference No. : " + formObj.f_ref_no.value    
    												+ "   MB/L No. : " + formObj.f_bl_no.value 
    												+ "";
													
		sheetObj2.SetCellValue(row,0, gTitle);
		sheetObj2.SetRowFontColor(row, "#FF0000");
		sheetObj2.SetCellFont("FontBold", row,0,row,0,1);
		sheetObj2.InitCellProperty(row,0,{Type:"Text", Align:"Left"});
		
		
	}
	
	makeSelectBox(docObjects[1]);
	
} 
//[20131118 OJG]
function sheet2_OnClick(sheetObj2,Row,Col){
	var formObj=document.frm1;
	if(sheetObj2.ColSaveName(Col) == "inv_no2"){
		// 소계Row 클릭인 경우, return
		if(sheetObj2.GetCellValue(Row, "inv_no2") != ''){
			var inv_seq=sheetObj2.GetCellValue(Row,"inv_seq");
			var inv_no=sheetObj2.GetCellValue(Row,"inv_no2");
			var print_type=sheetObj2.GetCellValue(Row,"sell_buy_tp_cd");
			var bl_cnt_cd=sheetObj2.GetCellValue(Row,"bl_cnt_cd");
			var ref_ofc_cd=sheetObj2.GetCellValue(Row,"ref_ofc_cd");
			var ofc_cd=sheetObj2.GetCellValue(Row,"ofc_cd");
			var trdp_cd=sheetObj2.GetCellValue(Row,"trdp_cd");
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
	formObj.intg_bl_seq_tmp.value=formObj.intg_bl_seq.value;
	formObj.intg_bl_seq.value="";
	//alert(param);
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	formObj.intg_bl_seq.value=formObj.intg_bl_seq_tmp.value;
}
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

function sheet3_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	showCompleteProcess();
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

    //표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj2.FindSubSumRow();
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){ 
     	sheetObj2.SetCellFont("FontBold", arrRow[idx],1,arrRow[idx],13,1);

	               //#3032 PBS 개선 IBSheet 최신 버전(7.0.13.90-20170721-11-M) 적용
    	if(sheetObj2.GetCellValue(arrRow[idx],7).indexOf("Profit") != -1){
    		sheetObj2.SetCellText(arrRow[idx], 8,sheetObj2.GetCellText(arrRow[idx], 17));
    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 8, 1, 4);
    	}
    	if(sheetObj2.GetCellValue(arrRow[idx],1).indexOf("Currency") != -1 ){
//    		sheetObj2.SetCellText(arrRow[idx], 0 ,sheetObj2.GetCellText(arrRow[idx], 0)
//					+ "   Reference No. : " + formObj.f_ref_no.value    
//					+ "   MB/L No. : " + formObj.mbl_no.value 
//					+ "   HB/L No. : " + formObj.f_bl_no.value
//					+ "");
//    		sheetObj2.SetMergeCell(Number(arrRow[idx]), 0, 1, 12);
    	}else{
    		sheetObj2.SetCellAlign(arrRow[idx],7,"Center");
    	}
    	
    	if(sheetObj2.GetCellValue(arrRow[idx],7) == ""){
	   		 sheetObj2.SetCellAlign(arrRow[idx], 7,"Center");
	   		 //26888
	    	 if(!(sheetObj2.GetCellValue(arrRow[idx] - 1, 29)=="" && sheetObj2.GetCellValue(arrRow[idx] - 1, 30) == "")){
				 var vchr_no 		= (sheetObj2.GetCellValue(arrRow[idx] - 1, 29)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 29) : "";
				 var tax_no 		= (sheetObj2.GetCellValue(arrRow[idx] - 1, 30)!= "") ? sheetObj2.GetCellValue(arrRow[idx] - 1, 30) : "";
				 var remark = "";
				 
				 if(PROFIT_RPT_BL_INFO == "Y"){
					 remark += " Voucher # " + vchr_no + " Tax No # " + tax_no;
				 }
				 
				 sheetObj2.SetCellText(arrRow[idx], 13, remark);
	    	 }
    	}
    }
}


//중복제거후 inv_no selectBox 생성
function makeSelectBox(sheetObj){
	var str = ""

    
	$("#f_block_d").html("");
	var dupRows = docObjects[1].ColValueDupRows("inv_no2");
	var dupR = dupRows.split(",");
	
	var rowChk=true;
	var firstRow = 0;
	for(var j=docObjects[1].HeaderRows(); j < docObjects[1].LastRow(); j++) {
		rowChk=true;
		for(idx=0; idx< dupR.length; idx++){
			if(docObjects[1].GetCellValue(j, "inv_no2") =="" || j == dupR[idx]){
				rowChk = false;
			}
		}
		
		if(rowChk){
			if(firstRow == 0){
				//getBtnObj('btnBlock').style.display='inline';	
				getObj('blockDiv_D').style.display='block';	
				//str +="<option value='ALL'>ALL</option>";
			}
			str +="<option value='"+ j  + "'>"+ docObjects[1].GetCellValue(j, "inv_no2") +"</option>";
			firstRow += 1;
		}
	 }
	 $("#f_block_d").html(str);
	 doWork('BLOCK_SEARCH_D',$("#f_block_d").val());
	
}


function getInvBlockCheck(reqVal){
	var formObj=document.frm2;
	var doc=getAjaxMsgXML(reqVal);
	formObj.s_block_satus.value='N';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			if(doc[1] == "Y"){ // Block 처리된 경우
				formObj.s_block_satus.value="Y";
			} 
		}
	}
}

/**
 * PROFIT_RPT_BL_INFO 愿�由� 肄붾뱶議고쉶
 */

function setProfitRptBlInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "Y"){
			PROFIT_RPT_BL_INFO = doc[1];
		}
	}
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