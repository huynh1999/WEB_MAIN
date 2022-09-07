var vReportType='';
var rtnary=new Array(1);
var callBackFunc = "";
var MGT0160_HEIGHT = 330; //#2396 [BINEX] Volume and Profit Report: +/-를 기능 점검
//#3593 [JTC]Profit Report & Performance Report 수정 사항
var GL_VIEW_FALG = "N";
/**
 *  OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
 *   ___________________________________________________________________________
 *  |   Sub Total       |       Report Type     |       Output by       |   Key |
 *  |___________________|_______________________|_______________________|_______|
 *  |Office             |                       |   Office              |   0   |
 *  |HBL/HAWB No.       |   HBL/HAWB No.        |   HBL/HAWB No.        |   1   |
 *  |Filing No.         |   Filing No.          |   Filing No.          |   2   |
 *  |Agent              |   Agent               |   Agent               |   3   |
 *  |Account Group ID   |   Account Group ID    |   Account Group ID    |   4   |
 *  |Shipper            |   Shipper             |   Shipper             |   5   |
 *  |Consignee          |   Consignee           |   Consignee           |   6   |
 *  |Customer           |   Customer            |   Customer            |   7   |
 *  |POL                |   POL                 |   POL                 |   8   |
 *  |POD                |   POD                 |   POD                 |   9   |
 *  |DEL                |   DEL                 |   DEL                 |   10  |
 *  |Final Destination  |   Final Destination   |   Final Destination   |   11  |
 *  |Carrier            |   Carrier             |   Carrier             |   12  |
 *  |LANE               |   LANE                |   LANE                |   13  |
 *  |Sales Person       |   Sales Person        |   Sales Person        |   14  |
 *  |Operator           |   Operator            |   Operator            |   15  |
 *  |Vessel/Flight      |                       |   Vessel/Flight       |   16  |
 *  |ETD                |                       |   ETD                 |   17  |
 *  |ETA                |                       |   ETA                 |   18  |
 *  |Incoterms          |                       |   Incoterms           |   19  |
 *  |Commodity          |                       |   Commodity           |   20  |
 *  |Cargo Type         |                       |   Cargo Type          |   21  |
 *  |MB/L/MAWB No.      |                       |   MB/L/MAWB No.       |   22  |
 *  |TLI No.            |                       |   TLI No.             |   23  |
 *  |Contribution       |   Contribution        |                       |   24  |
 *  |Team/Operator      |   Team/Operator       |                       |   25  |
 *  |Post Date          |                       |   Post Date           |   26  |   [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
 *  |___________________|_______________________|_______________________|_______|
 * 
 */
// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
var reportTypeObjs = {
    CONTRIBUTION: '24',
    TEAM_OPERATOR: '25'
};
//[OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
var OutputByObjs = {
    POST_DATE: '26'
};
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var sheetObj2=docObjects[2];
    var sheetObj3=docObjects[3];
    
    var formObj=document.frm1;
    
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
            	return;
            }
            //Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
            if(currRateCheck(sheetObj)){
            	return;
            }
            //Report Type이 Contribution일 경우 Office를 선택하지 않으면 Error!
            if(formObj.s_rpt_tp_opt[14].checked && formObj.s_ofc_cd.value == ""){
            	alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_OFCE'));
     		   	return;
            }
            //조회 옵션에 대한 Value 를 Setting
            setCheckedVal();
            // Report Type Make Sql
            getReportSql();

            //Batch Performance LKH 2015.01.28            
            createBatchPrf();
            			
       break;
       case "BATCH_PRF_END_ACTION":
    	   formObj.f_cmd.value=SEARCHLIST;
           if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
           	return;
           }
           //Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
           if(currRateCheck(sheetObj)){
           	return;
           }
           //Report Type이 Contribution일 경우 Office를 선택하지 않으면 Error!
           if(formObj.s_rpt_tp_opt[14].checked && formObj.s_ofc_cd.value == ""){
        	   alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_OFCE'));
    		   return;
           }
           //조회 옵션에 대한 Value 를 Setting
           setCheckedVal();
           // Report Type Make Sql
           getReportSql();
           
           setSheetHeader();
			
           setSheet();
			
           docObjects[2].DoSearch("./PFM_MGT_0160GS.clt", FormQueryString(formObj) );
       break;
       case "CURR_SEARCH":
            formObj.f_cmd.value=SEARCHLIST01;
		    if(formObj.s_curr_cd.value == ""){
		    	//Please, select the [To Currency]
		    	alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TCUR'));
				return;
			}
		    setCurrCheckedVal(); 
		    sheetObj.DoSearch("./PFM_MGT_0161GS.clt", FormQueryString(formObj) );
      break;
       case "CLEAR":
    	   formObj.reset();
    	   initFinish();
    	   setAirSeaClick();
    	   formObj.s_curr_cd.value=document.frm2.f2_curr_cd.value;

    	   //LHK, 20141029 #44986 [BINEX]Office - All Option
    	   setOfficeAllOption(formObj.s_ofc_cd);
    	    
    	   doWork('CURR_SEARCH');
    	   formObj.s_rpt_tp_opt[1].click();
    	   
    	   fn_outputClear();
       break;
       case 'MINIMIZE':
			if(mainForm.style.display != "none") {
				getObj('mainForm').style.display="none";
				//sheetObj2.SetSheetHeight(590 );
				resizeSheet();
			} else {
				getObj('mainForm').style.display="block";
				//sheetObj2.SetSheetHeight(330 );
				resizeSheet();
			}
      break;
      case 'EXCEL':		
    	  if(sheetObj2.RowCount() < 1){//no data	
   			ComShowCodeMessage("COM132501");
   		}else{
//   			sheetObj2.Down2Excel({ HiddenColumn:-1});
   			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
   		}
      break;
      case "FILTER_POP"://  openMean S=해운에서 오픈, A=항공에서 오픈
    	  getCmmPopup ();
    	  break;
      case "OUTPUT_CLEAR"://  #3376 [JTC] Japan Trust 용 Profit Report 개발
    	  fn_outputClear();
    	  break;
    }
}

function fn_outputClear(){
    var formObj=document.frm1;
    var sheetObj3=docObjects[3];
  	//sheetObj3.RemoveAll();
  	//formObj.s_rpt_tp_opt[1].click();
  
	var s_otpt_by_opt=document.getElementsByName("s_otpt_by_opt");		
	for(var i=0; i<s_otpt_by_opt.length; i++){
		s_otpt_by_opt[i].checked = false;
	} 
	
	for(var i=sheetObj3.LastRow(); i >= 2; i--) {
		sheetObj3.RowDelete(i);
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

function getCmmPopup (){
    var sheetObj1=docObjects[1];
    var formObj=document.frm1;
	// vTURL 파라메터 생성
	var vTURL='';
	var vRType='';
	var popWidth=848;
	var popHeight=500;
	for (var i=0; i<formObj.s_rpt_tp_opt.length;i++) {
   		if (formObj.s_rpt_tp_opt[i].checked) {
   			vRType=formObj.s_rpt_tp_opt[i].value;
   		}
   	}
	if (  	 vRType == '1' // HBL/HAWB NO.
		  || vRType == '2' // Filing NO.
		) {
	    // rtnary 파라메터 생성
		popWidth=878;
		rtnary=new Array(1);
		var airSeaTp='';
		var bndTp='';
		if (formObj.s_air_sea_opt[0].checked) {
			airSeaTp='S';
		} else if (formObj.s_air_sea_opt[1].checked) {
			airSeaTp='A';
		} else {
			// alert('Error airSeaTp is null');
			return;
		}
		if (formObj.s_exp_bound_flg.checked && formObj.s_imp_bound_flg.checked) {
			bndTp='';
		} else if (formObj.s_exp_bound_flg.checked) {
			bndTp='O';
		} else if (formObj.s_imp_bound_flg.checked) {
			bndTp='I';
		}
		rtnary[0]=airSeaTp;
		rtnary[1]=bndTp;		
		if (vRType == '1' ) {
			//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
			rtnary[2] = "";
			rtnary[3] = "Y";
			vTURL='CMM_POP_0170.clt';
			popHeight=468;
		} else if (vRType == '2') { 
			//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
			rtnary[2] = "";
			rtnary[3] = "";
			rtnary[4] = "Y";
			vTURL='CMM_POP_0180.clt';
		}
	} else if (
			vRType == '3' // Agent
		 || vRType == '5' // Shipper
		 || vRType == '6' // Consignee
		 || vRType == '7' // Customer
		 || vRType == '12' // Carrier
		) {
		popWidth=1150;
		popHeight=480;
	    // rtnary 파라메터 생성
		rtnary=new Array(6);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]=window;
		rtnary[3]="";
		rtnary[4]="";
		rtnary[5]="";
		rtnary[6]="Y";
		vTURL='CMM_POP_0010.clt?callTp=&iata_cd=';
	} else if (
			vRType == '8' // POL
		 || vRType == '9' // POD
		 || vRType == '11' // Final Destination
		 || vRType == '10' // DEL
		) {
		popWidth=866;
		popHeight=415;
	    // rtnary 파라메터 생성
		rtnary=new Array(5);
   		rtnary[0]=airSeaTp;
   		rtnary[1]="BL";
   		rtnary[2]="";
   		rtnary[3]="";
   		rtnary[4]="";
   		rtnary[5]="Y";
		vTURL='CMM_POP_0030.clt';
	} else if (
			vRType == '14' // Sales Person
		  || vRType == '15' // Operator
		  || vRType == reportTypeObjs.TEAM_OPERATOR // Team/Operator | OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
		) {
		popWidth=586;
		popHeight=450;
	    // rtnary 파라메터 생성
		rtnary=new Array(3);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]="Y";
		vTURL='CMM_POP_0060.clt';
	} else if (
			vRType == '13' // Lane
				) {
				popWidth=866;
				popHeight=415;
				rtnary=new Array(3);
				rtnary[0]="1";
				rtnary[1]=""; // lane code
				rtnary[2]=""; // lane description
				rtnary[3]="Y";
				vTURL='CMM_POP_0490.clt';
			}
	if (vRType == '4') {
		var intRows=sheetObj1.LastRow() + 1;
   		sheetObj1.DataInsert(intRows);
   		sheetObj1.SetCellValue(intRows, "check_val",0);
   		sheetObj1.SetCellValue(intRows, "type_val",vReportType);
		sheetObj1.SetCellValue(intRows, "value_val",formObj.f_acc_group_id.value);// HBL NO
   		sheetObj1.SetCellValue(intRows, "code_val",formObj.f_acc_group_id.value);// House Intg_bl_seq
   		formObj.f_acc_group_id.value="";
	} else {
		callBackFunc = "getCmmPopup_CallBackFunc";
	   	modal_center_open('./'+vTURL, rtnary, popWidth,popHeight,"yes");
	}
}
function getCmmPopup_CallBackFunc(rtnVal){
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	
	var vRType='';
	for (var i=0; i<formObj.s_rpt_tp_opt.length;i++) {
   		if (formObj.s_rpt_tp_opt[i].checked) {
   			vRType=formObj.s_rpt_tp_opt[i].value;
   		}
   	}
	
	if (rtnVal == '' || rtnVal == 'undefined' || rtnVal == undefined) {
 		return;
	}else{
		//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.13
		var rtnRowAry = rtnVal.split(';');
		for(var i = 0; i < rtnRowAry.length; i++){
			var rtnValAry = rtnRowAry[i].split('|');
			if(rtnValAry.length <= 1 ){
				continue;
			}else{
				//Check duplicate
				var code_val = "";
				if (vRType == '1'){
					code_val = rtnValAry[3];
				}else if(vRType == '2'){
					code_val = rtnValAry[1];
				}else{				
					code_val = rtnValAry[0];					
				}
				if(sheetObj1.FindText("code_val", code_val) != -1)
					continue;
			}			
			
			var intRows=sheetObj1.LastRow() + 1;
	   		sheetObj1.DataInsert(intRows);
	   		sheetObj1.SetCellValue(intRows, "check_val",0);
	   		sheetObj1.SetCellValue(intRows, "type_val",vReportType);
	   		if (vRType == '1') {
	   			sheetObj1.SetCellValue(intRows, "value_val",rtnValAry[0]);// HBL NO
	   			sheetObj1.SetCellValue(intRows, "code_val",rtnValAry[3]);// House Intg_bl_seq
	   		} else if (vRType == '2') {
	   			sheetObj1.SetCellValue(intRows, "value_val",rtnValAry[2]);// REF NO
	   			sheetObj1.SetCellValue(intRows, "code_val",rtnValAry[1]);// Master Intg_bl_seq
	   		} else if (
	   				vRType == '3' // Agent
	   			 || vRType == '5' // Shipper
	   			 || vRType == '6' // Consignee
	   			 || vRType == '7' // Customer
	   			 || vRType == '12' // Carrier
	   			) {
	   			//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.13
	   			sheetObj1.SetCellValue(intRows, "value_val",rtnValAry[2]);// eng_nm
	   	   		sheetObj1.SetCellValue(intRows, "code_val",rtnValAry[0]);// trdp_cd   			
	   		} else if (
	   				vRType == '8' // POL
	   			 || vRType == '9' // POD
	   			 || vRType == '11' // Final Destination
	   	   		 || vRType == '10' // DEL	 
	   			) {
	   			sheetObj1.SetCellValue(intRows, "value_val",rtnValAry[2]);// loc_nm
	   			sheetObj1.SetCellValue(intRows, "code_val",rtnValAry[0]);// loc_cd
	   		} else if (
	   				vRType == '14' // Sales Person
	   	   		 || vRType == '15' // Operator
	   	   		 || vRType == reportTypeObjs.TEAM_OPERATOR // Team/Operator | OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	   	   		) {
	   	   			sheetObj1.SetCellValue(intRows, "value_val",rtnValAry[1]);// sls_usr_nm
	   	   			sheetObj1.SetCellValue(intRows, "code_val",rtnValAry[0]);// sls_usrid
	   	   	} else if (
	   				vRType == '13' // Lane
	   	   	   		) {
	   	   	   			sheetObj1.SetCellValue(intRows, "value_val",rtnValAry[1]);// descr
	   	   	   			sheetObj1.SetCellValue(intRows, "code_val",rtnValAry[0]);// lane_cd
	   	   	   	}
		}
		
	}
	}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var grdCmmHdr="";
var grdHdr1="";
var grdHdr2="";
var grdHdr3="";
var grdOceanCol="";
var grdAirCol="";
var grdColCnt=0;
var grdHdrRows=3;
var voColHdr="";
var voColOpt="";
var sqlOpt="";
var sqlOpt1="";
var sqlOpt2="";
var intervalStDay="";
var intervalEnDay="";
var varTargetAmt = 0 ;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
    var opt_key = "PRF_TARGET_AMT";
    ajaxSendPost(fn_callback_PRF_TARGET_AMT, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);

	//#3593 [JTC]Profit Report & Performance Report 수정 사항
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	    
	frm1.gl_view_falg.value = GL_VIEW_FALG;
	
    setSheetHeader();
    
	for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
	
	initFinish();
	
	formObj.s_curr_cd.value=formObj.f_curr_cd.value;
	
	doWork('CURR_SEARCH');
	
	formObj.s_dt_clss_cd.value="PDT";
	getObj('mainForm').style.display="";
	
	formObj.s_rpt_tp_opt[1].click();
	
}
function fn_callback_PRF_TARGET_AMT(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) {
		varTargetAmt = doc[1];
	}
}
function setSheet() {
	// for(var i=2;i<docObjects.length;i++){
	
	docObjects[2] = docObjects[2].Reset();
	
    comConfigSheet(docObjects[2], SYSTEM_FIS);
    initSheet(docObjects[2],3);
    comEndConfigSheet(docObjects[2]);
    //}
	if(mainForm.style.display != "none") {
		//docObjects[2].SetSheetHeight(330 );
		resizeSheet();
	} else {
		//docObjects[2].SetSheetHeight(590 );
		resizeSheet();
	}
}
function setSheetHeader(){
	var formObj=document.frm1;
 	//#3376 [JTC] Japan Trust 용 Profit Report 개발
 	var sheetObj3=docObjects[3];
 	var chkSumRow = sheetObj3.FindCheckedRow("chk_val");
    if(chkSumRow != ""){
    	formObj.s_subsum_yn.value = "Y";
    }else{
    	formObj.s_subsum_yn.value = "N";
    }
 	
	//------------------------------------------------------------------------------------------------------------------//
	// 공통부분 Report Type & Output By 에 따라 Set
	grdCmmHdr="";
	grdHdr1="";
	grdHdr2="";
	grdHdr3="";
	grdColCnt=0;
	grdHdrRows=2;
	
	voColHdr="";
	voColOpt="";
	sqlOpt="";
	sqlOpt1="";
	sqlOpt2="";
	
	intervalStDay="";
	intervalEnDay="";
	
	var hdrVal		= "";
	var hdrVal_0 	= "Office";
	var hdrVal_1 	= "HBL/HAWB No.";
	var hdrVal_2 	= "Filing No.";
	var hdrVal_3 	= "Agent";
	var hdrVal_4 	= "Acc. Group ID";
	var hdrVal_5 	= "Shipper";
	var hdrVal_6 	= "Consignee";
	var hdrVal_7 	= "Customer";
	var hdrVal_8 	= "POL";
	var hdrVal_9 	= "POD";
	var hdrVal_10 	= "DEL";
	var hdrVal_11 	= "F.DEST";
	var hdrVal_12 	= "Carrier";
	var hdrVal_13 	= "LANE";
	var hdrVal_14 	= "Sales Person";
	var hdrVal_15 	= "Operator";
	var hdrVal_16 	= "Vessel/Flight";
	var hdrVal_17 	= "ETD";
	var hdrVal_18 	= "ETA";
	var hdrVal_19 	= "Incoterms";
	var hdrVal_20 	= "Commodity";
	var hdrVal_21 	= "Cargo Type";
	var hdrVal_22 	= "MBL No.";
	//#4128 [JAPT] New request - OEH TRI#, TLI#
	var hdrVal_23 	= "TLI No.";

	// [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
	var hdrVal_26  = "Post Date";

	var colVal		= "";
	var colVal_0 	= "ref_ofc_cd";
	var colVal_1 	= "bl_no";
	var colVal_2 	= "ref_no";
	var colVal_3 	= "agent_nm";
	var colVal_4 	= "acc_grp_id";
	var colVal_5 	= "shpr_nm";
	var colVal_6 	= "cnee_nm";
	var colVal_7 	= "cust_nm";
	var colVal_8 	= "pol_nm";
	var colVal_9 	= "pod_nm";
	var colVal_10 	= "del_nm";
	var colVal_11	= "fnl_dest_nm";
	var colVal_12 	= "carr_nm";
	var colVal_13 	= "svc_lane_nm";
	var colVal_14 	= "sls_usr_nm";
	var colVal_15 	= "opr_usr_nm";
	var colVal_16 	= "vsl_flt";
	var colVal_17 	= "etd_dt_tm";
	var colVal_18 	= "eta_dt_tm";
	var colVal_19 	= "inco_cd";
	var colVal_20 	= "rep_cmdt_nm";
	var colVal_21 	= "cargo_tp_nm";
	var colVal_22 	= "mbl_no";
	//#4128 [JAPT] New request - OEH TRI#, TLI#
	var colVal_23 	= "tli_no";
	// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	var colVal_24  = "ref_ofc_cd";
	var colVal_25  = "team_nm";
	
	// [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
	var colVal_26  = "post_dt";
	
	var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
	var s_otpt_by_opt=document.getElementsByName("s_otpt_by_opt");
	var s_rpt_tp_opt_chk_id="";
	
	var s_prd_strdt=formObj.s_prd_strdt.value;
	var s_prd_enddt=formObj.s_prd_enddt.value;
	
	/*
	if(s_rpt_tp_opt[14].checked){ // Contribution Check
		grdCmmHdr += "Department|No.|Opr. Office|Customer|Sales Office|";
		voColHdr  += "disp_dept_nm;No;ref_ofc_cd;cust_nm;ctrb_ofc_cd;";
    	grdColCnt++;
    	grdColCnt++;
    	grdColCnt++;
    	grdColCnt++;
    	grdColCnt++;
    	
    	for(var i=0; i<s_otpt_by_opt.length; i++){
	    	if(s_otpt_by_opt[i].checked){
	    		hdrVal=eval("hdrVal_"+s_otpt_by_opt[i].value);
	    		colVal=eval("colVal_"+s_otpt_by_opt[i].value);
	    		grdCmmHdr += hdrVal + "|";
	    		voColHdr  += colVal + ";";
	        	grdColCnt++;
	    	}
	    }
	} else if(s_rpt_tp_opt[15].checked){ // Team/Operator Check
		
		s_rpt_tp_opt_chk_id	= s_rpt_tp_opt[15].value;
		grdCmmHdr += "Team|No.|Operator|";
		voColHdr  += "team_nm;No;opr_usr_nm;";
    	grdColCnt++;
    	grdColCnt++;
    	
	    for(var i=0; i<s_otpt_by_opt.length; i++){
	    	if(s_otpt_by_opt[i].checked && s_otpt_by_opt[i].value != s_rpt_tp_opt_chk_id){
	    		hdrVal=eval("hdrVal_"+s_otpt_by_opt[i].value);
	    		colVal=eval("colVal_"+s_otpt_by_opt[i].value);
	    		grdCmmHdr += hdrVal + "|";
	    		voColHdr  += colVal + ";";
	        	grdColCnt++;
	    	}
	    }
	} else {
		for(var i=0; i<s_rpt_tp_opt.length; i++){
	    	if(i == 0){
	    		grdCmmHdr += "Department" + "|"+"No." + "|";
	    		voColHdr  += "dept_nm" + ";"+"No" + ";";
	        	grdColCnt++;
	        	grdColCnt++;
	    	}
	    	if(s_rpt_tp_opt[i].checked){
	    		s_rpt_tp_opt_chk_id=s_rpt_tp_opt[i].value; 
	    		hdrVal=eval("hdrVal_"+s_rpt_tp_opt[i].value);
	    		colVal=eval("colVal_"+s_rpt_tp_opt[i].value);
	        	grdCmmHdr += hdrVal + "|";
	        	voColHdr  += colVal + ";";
	        	grdColCnt++;
	    	}
	    }   
	    
	    for(var i=0; i<s_otpt_by_opt.length; i++){
	    	if(s_otpt_by_opt[i].checked && s_otpt_by_opt[i].value != s_rpt_tp_opt_chk_id){
	    		hdrVal=eval("hdrVal_"+s_otpt_by_opt[i].value);
	    		colVal=eval("colVal_"+s_otpt_by_opt[i].value);
	    		grdCmmHdr += hdrVal + "|";
	    		voColHdr  += colVal + ";";
	        	grdColCnt++;
	    	}
	    }
	}
	
	*/
	
	//#3358 [JTC]Japan Trust 용 Arrival Notice 개발
	var sheetObj3=docObjects[3];
	
	if(sheetObj3.GetCellValue(1, "col_val") != -1){
		sheetObj3.SetCellValue(1, "col_tb_nm",eval("colVal_"+sheetObj3.GetCellValue(1, "col_val") ));
	}
	
	// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	if(sheetObj3.GetCellValue(1, "col_val") == reportTypeObjs.CONTRIBUTION  ){  //Contribution Check
		if(formObj.s_subsum_yn.value =="Y"){
			grdCmmHdr += "Department|Opr. Office|Customer|Sales Office|";
		}else{
			grdCmmHdr += "Department|No.|Opr. Office|Customer|Sales Office|";
		}
		voColHdr  += "disp_dept_nm;No;ref_ofc_cd;cust_nm;ctrb_ofc_cd;";
		
    	grdColCnt++;
    	grdColCnt++;
    	grdColCnt++;
    	grdColCnt++;
    	grdColCnt++;
    	
   	
    	for(var i=2; i <= sheetObj3.LastRow(); i++) {
    		hdrVal=eval("hdrVal_"+sheetObj3.GetCellValue(i, "col_val") );
    		colVal=eval("colVal_"+sheetObj3.GetCellValue(i, "col_val") );
    		grdCmmHdr += hdrVal + "|";
    		voColHdr  += colVal + ";";
        	grdColCnt++;    		
        	
        	sheetObj3.SetCellValue(i, "col_tb_nm",colVal);
    	}
	}else if(sheetObj3.GetCellValue(1, "col_val") == "15"  ){  // Operator Check
		// #6407 [Binex-LA] Volume & Profit Report Issue
		//s_rpt_tp_opt_chk_id	= s_rpt_tp_opt[15].value;
		s_rpt_tp_opt_chk_id	= s_rpt_tp_opt[13].value;
		if(formObj.s_subsum_yn.value =="Y"){
			grdCmmHdr += "Department|Operator|";
		}else{
			grdCmmHdr += "Department|No.|Operator|";
		}
		voColHdr  += "dept_nm;No;opr_usr_nm;";
    	grdColCnt++;
    	grdColCnt++;		
    	
    	
    	for(var i=2; i <= sheetObj3.LastRow(); i++) {
    		if(sheetObj3.GetCellValue(i, "col_val") != s_rpt_tp_opt_chk_id){
    			hdrVal=eval("hdrVal_"+sheetObj3.GetCellValue(i, "col_val") );
    			colVal=eval("colVal_"+sheetObj3.GetCellValue(i, "col_val") );
    			grdCmmHdr += hdrVal + "|";
    			voColHdr  += colVal + ";";
    			grdColCnt++;    		
    			
    			sheetObj3.SetCellValue(i, "col_tb_nm",colVal);
    		}
    	}    	
	}else if(sheetObj3.GetCellValue(1, "col_val") == reportTypeObjs.TEAM_OPERATOR  ){  // Team/Operator Check | OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
		// #6407 [Binex-LA] Volume & Profit Report Issue
		//s_rpt_tp_opt_chk_id	= s_rpt_tp_opt[15].value;
		s_rpt_tp_opt_chk_id	= s_rpt_tp_opt[13].value;
		if(formObj.s_subsum_yn.value =="Y"){
			grdCmmHdr += "Team|Operator|";
		}else{
			grdCmmHdr += "Team|No.|Operator|";
		}
		voColHdr  += "team_nm;No;opr_usr_nm;";
    	grdColCnt++;
    	grdColCnt++;		
    	
    	
    	for(var i=2; i <= sheetObj3.LastRow(); i++) {
    		if(sheetObj3.GetCellValue(i, "col_val") != s_rpt_tp_opt_chk_id){
    			hdrVal=eval("hdrVal_"+sheetObj3.GetCellValue(i, "col_val") );
    			colVal=eval("colVal_"+sheetObj3.GetCellValue(i, "col_val") );
    			grdCmmHdr += hdrVal + "|";
    			voColHdr  += colVal + ";";
    			grdColCnt++;    		
    			
    			sheetObj3.SetCellValue(i, "col_tb_nm",colVal);
    		}
    	}    	
	}else{
		
		if(formObj.s_subsum_yn.value =="Y"){
			grdCmmHdr += "Department|";
		}else{
			grdCmmHdr += "Department|No.|";
		}
		voColHdr  += "dept_nm;No;";
    	grdColCnt++;
    	grdColCnt++;
    	
    	
		s_rpt_tp_opt_chk_id=sheetObj3.GetCellValue(1, "col_val"); 
		if(sheetObj3.GetCellValue(1, "col_val") != "-1"){
			
			hdrVal=eval("hdrVal_"+sheetObj3.GetCellValue(1, "col_val"));
			colVal=eval("colVal_"+sheetObj3.GetCellValue(1, "col_val"));
			grdCmmHdr += hdrVal + "|";
			voColHdr  += colVal + ";";
			grdColCnt++;
			
			
			for(var i=2; i <= sheetObj3.LastRow(); i++) {
				if(sheetObj3.GetCellValue(i, "col_val") != s_rpt_tp_opt_chk_id){
					
					hdrVal=eval("hdrVal_"+sheetObj3.GetCellValue(i, "col_val") );
					colVal=eval("colVal_"+sheetObj3.GetCellValue(i, "col_val") );
					grdCmmHdr += hdrVal + "|";
					voColHdr  += colVal + ";";
					grdColCnt++;    	
					
					sheetObj3.SetCellValue(i, "col_tb_nm",colVal);
				}
			}
		}
	}
	
	
		 
	
    
    //공통영역만 Vo Header Col에  담음
	formObj.voColHdr.value=voColHdr.substring(0, voColHdr.length-1);
	
    //------------------------------------------------------------------------------------------------------------------//
	// Option , Department Type  따라 Set
	if(formObj.s_grd_opt[0].checked){ 				// Option : Summary
		if(formObj.s_air_sea_opt[0].checked){		//Department Type : Ocean
			
			grdHdrRows=3;
			
			//#469 [STAR CLUSTER] CANNOT CHECK CBM VOLUME FOR FCL ON PROFIT & VOLUME REPORT
			
			//grdHdr1
			var FCL="FCL|FCL|FCL|FCL|FCL|FCL|";			//6
			var LCL="LCL|LCL|LCL|LCL|LCL|LCL|";			//6
			var FAK="FAK|FAK|FAK|FAK|FAK|FAK|";			//6
			var BULK="Bulk|Bulk|Bulk|Bulk|Bulk|Bulk|";	//6
			var Total="Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|";	//20
			var Profit="Profit|Profit|Profit|Profit|Profit";		//5
			
			//grdHdr2
			var TEU_CNTR="Container (CNTR)|Container (CNTR)|Container (CNTR)|Container (CNTR)|Container (CNTR)|Container (CNTR)|"; // 6
			var CBM="CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|CBM|"; // 18
			var Cntr_type="Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|"; // 14
			var Volume="Volume|Volume|Volume|Volume|Volume|Volume|"; // 6
			
			//grdHdr3
			var cntr_cnt="Free|Nomi|Co-Load|Etc.|Sum|CNTR|";	// 24
			var teu_cnt="20'|40'|HC|45'|RF|20D|40D&HQ|20R|40R&HQR|20FL&OT|40FL&OT|ETC|TEU|CNTR|"; // 14
			var shp_mod_cnt="FCL|LCL|FAK|Bulk|Sum|CNTR|"; // 6
			var profit_val="A/R|A/P|D/C|Profit.|AVG.Profit(Per CNTR)"; // 5
			
			grdHdr1=grdCmmHdr + FCL + LCL + FAK + BULK + Total + Profit;		//41
			grdHdr2=grdCmmHdr + TEU_CNTR + CBM + Cntr_type + Volume + profit_val;
			grdHdr3=grdCmmHdr + cntr_cnt + cntr_cnt + cntr_cnt + cntr_cnt + teu_cnt + shp_mod_cnt + profit_val;
			
			voColOpt="fcl_free;fcl_nomi;fcl_col;fcl_etc;fcl_sum;fcl_cntr;" 
							+ "lcl_free;lcl_nomi;lcl_col;lcl_etc;lcl_sum;lcl_cntr;" 
							+ "fak_free;fak_nomi;fak_col;fak_etc;fak_sum;fak_cntr;" 
							+ "blk_free;blk_nomi;blk_col;blk_etc;blk_sum;blk_cntr;" 
							+ "cntr_20;cntr_40;cntr_hq;cntr_45;cntr_rf;cntr_d2;cntr_d4;cntr_r2;cntr_r4;cntr_fo2;cntr_fo4;cntr_etc;cntr_sum;cntr_cnt;" 
							+ "vol_fcl;vol_lcl;vol_fak;vol_blk;vol_sum;vol_cntr;profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt;profit_avg_amt"; 
			sqlOpt=",SUM(bl.fcl_free)									as fcl_free;"
							+ ",SUM(bl.fcl_nomi)								as fcl_nomi;"
							+ ",SUM(bl.fcl_col)									as fcl_col;"
							+ ",SUM(bl.fcl_etc)									as fcl_etc;"
							+ ",SUM(bl.fcl_sum)									as fcl_sum;"
							+ ",SUM(bl.fcl_cntr)								as fcl_cntr;"
							+ ",SUM(bl.lcl_free)								as lcl_free;"
							+ ",SUM(bl.lcl_nomi)								as lcl_nomi;"
							+ ",SUM(bl.lcl_col)									as lcl_col;"
							+ ",SUM(bl.lcl_etc)									as lcl_etc;"
							+ ",SUM(bl.lcl_sum)									as lcl_sum;"
							+ ",SUM(bl.lcl_cntr)								as lcl_cntr;"
							+ ",SUM(bl.fak_free)								as fak_free;"
							+ ",SUM(bl.fak_nomi)								as fak_nomi;"
							+ ",SUM(bl.fak_col)									as fak_col;"
							+ ",SUM(bl.fak_etc)									as fak_etc;"
							+ ",SUM(bl.fak_sum)									as fak_sum;"
							+ ",SUM(bl.fak_cntr)								as fak_cntr;"
							+ ",SUM(bl.blk_free)								as blk_free;"
							+ ",SUM(bl.blk_nomi)								as blk_nomi;"
							+ ",SUM(bl.blk_col)									as blk_col;"
							+ ",SUM(bl.blk_etc)									as blk_etc;"
							+ ",SUM(bl.blk_sum)									as blk_sum;"
							+ ",SUM(bl.blk_cntr)								as blk_cntr;"
			if(formObj.profit_cntr_type_chg.value == "N"){
				sqlOpt+=",SUM(bl.cntr_20)									as cntr_20;"		  
							+ ",SUM(bl.cntr_40)									as cntr_40;"	
							+ ",SUM(bl.cntr_hq)									as cntr_hq;"	
							+ ",SUM(bl.cntr_45)									as cntr_45;"	
							+ ",SUM(bl.cntr_rf)									as cntr_rf;"	
			}else if(formObj.profit_cntr_type_chg.value == "Y"){
				sqlOpt+= ",SUM(bl.cntr_d2)									as cntr_d2;"		  
							+ ",SUM(bl.cntr_d4)									as cntr_d4;"	
							+ ",SUM(bl.cntr_r2)									as cntr_r2;"	
							+ ",SUM(bl.cntr_r4)									as cntr_r4;"	
							+ ",SUM(bl.cntr_fo2)									as cntr_fo2;"	
							+ ",SUM(bl.cntr_fo4)									as cntr_fo4;"
			}
			sqlOpt+=",SUM(bl.cntr_etc)								as cntr_etc;"	
						+ ",SUM(bl.cntr_sum)								as cntr_sum;"
						+ ",SUM(bl.fcl_cntr)								as cntr_cnt;"
						//#469 [STAR CLUSTER] CANNOT CHECK CBM VOLUME FOR FCL ON PROFIT & VOLUME REPORT
						+ ",SUM(bl.fcl_cbm)									as vol_fcl;"
						+ ",SUM(bl.lcl_sum)									as vol_lcl;"	
						+ ",SUM(bl.fak_sum)									as vol_fak;"					  
						+ ",SUM(bl.blk_sum)									as vol_blk;"	
						//#469 [STAR CLUSTER] CANNOT CHECK CBM VOLUME FOR FCL ON PROFIT & VOLUME REPORT
						+ ",SUM(bl.fcl_cbm + bl.lcl_sum + bl.fak_sum + bl.blk_sum)	as vol_sum;"	
						+ ",SUM(bl.cntr_cnt + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr) as vol_cntr;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 = ",bl.fcl_free									as fcl_free;"
					+ ",bl.fcl_nomi								as fcl_nomi;"
					+ ",bl.fcl_col								as fcl_col;"
					+ ",bl.fcl_etc								as fcl_etc;"
					+ ",bl.fcl_sum								as fcl_sum;"
					+ ",bl.fcl_cntr								as fcl_cntr;"
					+ ",bl.lcl_free								as lcl_free;"
					+ ",bl.lcl_nomi								as lcl_nomi;"
					+ ",bl.lcl_col								as lcl_col;"
					+ ",bl.lcl_etc								as lcl_etc;"
					+ ",bl.lcl_sum								as lcl_sum;"
					+ ",bl.lcl_cntr								as lcl_cntr;"
					+ ",bl.fak_free								as fak_free;"
					+ ",bl.fak_nomi								as fak_nomi;"
					+ ",bl.fak_col								as fak_col;"
					+ ",bl.fak_etc								as fak_etc;"
					+ ",bl.fak_sum								as fak_sum;"
					+ ",bl.fak_cntr								as fak_cntr;"
					+ ",bl.blk_free								as blk_free;"
					+ ",bl.blk_nomi								as blk_nomi;"
					+ ",bl.blk_col								as blk_col;"
					+ ",bl.blk_etc								as blk_etc;"
					+ ",bl.blk_sum								as blk_sum;"
					+ ",bl.blk_cntr								as blk_cntr;"	
				if(formObj.profit_cntr_type_chg.value == "N"){
					sqlOpt2 += ",bl.cntr_20								as cntr_20;"		  
						+ ",bl.cntr_40								as cntr_40;"	
						+ ",bl.cntr_hq								as cntr_hq;"	
						+ ",bl.cntr_45								as cntr_45;"	
						+ ",bl.cntr_rf								as cntr_rf;"	
					}else if(formObj.profit_cntr_type_chg.value == "Y"){
						sqlOpt2 += ",bl.cntr_d2								as cntr_d2;"		  
						+ ",bl.cntr_d4								as cntr_d4;"	
						+ ",bl.cntr_r2								as cntr_r2;"	
						+ ",bl.cntr_r4								as cntr_r4;"	
						+ ",bl.cntr_fo2								as cntr_fo2;"	
						+ ",bl.cntr_fo2								as cntr_fo4;"	
					}
				sqlOpt2 += ",bl.cntr_etc								as cntr_etc;"	
					+ ",bl.cntr_sum								as cntr_sum;"
					+ ",bl.cntr_cnt								as cntr_cnt;"
					+ ",bl.vol_lcl								as vol_lcl;"	
					+ ",bl.vol_fak								as vol_fak;"					  
					+ ",bl.vol_blk								as vol_blk;"	
					+ ",bl.vol_sum								as vol_sum;"	
					+ ",bl.vol_cntr								as vol_cntr;"
					+ ",bl.profit_ar_amt						as profit_ar_amt;"
					+ ",bl.profit_ap_amt						as profit_ap_amt;"
					+ ",bl.profit_dc_amt						as profit_dc_amt;"
	                + ",bl.profit_amt 							as profit_amt";
			} 
				
			sqlOpt += ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
							
			grdColCnt +=  42;
		}
		if(formObj.s_air_sea_opt[1].checked){//Department Type : Air
			//grdHdr1
			var Free="Free|Free|Free|";				//3
			var Nomi="Nomi|Nomi|Nomi|";				//3
			var Co_Load="Co-Load|Co-Load|Co-Load|";		//3
			var Etc="Etc.|Etc.|Etc.|";				//3
			var Total="Total|Total|Total|";			//3
			var Profit="Profit|Profit|Profit|Profit|Profit";	//5
			//grdHdr2
			var vol_cnt="No.of HAWB|G/WT|C/WT|";
			var profit_val="A/R|A/P|D/C|Profit.|AVG.Profit";
			grdHdr1=grdCmmHdr + Free + Nomi + Co_Load + Etc + Total + Profit;		//20
			grdHdr2=grdCmmHdr + vol_cnt + vol_cnt + vol_cnt + vol_cnt + vol_cnt + profit_val;
			voColOpt="free_hbl;free_gwt;free_cwt;" 
								+ "nomi_hbl;nomi_gwt;nomi_cwt;" 
								+ "col_hbl;col_gwt;col_cwt;" 
								+ "etc_hbl;etc_gwt;etc_cwt;" 
								+ "ttl_hbl;ttl_gwt;ttl_cwt;" 
								+ "profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt;profit_avg_amt";
			sqlOpt=",SUM(bl.free_hbl)								as free_hbl;"
							+ ",SUM(bl.free_gwt)								as free_gwt;"
							+ ",SUM(bl.free_cwt)								as free_cwt;"
							+ ",SUM(bl.nomi_hbl)								as nomi_hbl;"
							+ ",SUM(bl.nomi_gwt)								as nomi_gwt;"
							+ ",SUM(bl.nomi_cwt)								as nomi_cwt;"
							+ ",SUM(bl.col_hbl)									as col_hbl;"
							+ ",SUM(bl.col_gwt)									as col_gwt;"
							+ ",SUM(bl.col_cwt)									as col_cwt;"
							+ ",SUM(bl.etc_hbl)									as etc_hbl;"
							+ ",SUM(bl.etc_gwt)									as etc_gwt;"
							+ ",SUM(bl.etc_cwt)									as etc_cwt;"
							+ ",SUM(bl.ttl_hbl)									as ttl_hbl;"
							+ ",SUM(bl.ttl_gwt)									as ttl_gwt;"
							+ ",SUM(bl.ttl_cwt)									as ttl_cwt;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 = ",bl.free_hbl								as free_hbl;"
					+ ",bl.free_gwt									as free_gwt;"
					+ ",bl.free_cwt									as free_cwt;"
					+ ",bl.nomi_hbl									as nomi_hbl;"
					+ ",bl.nomi_gwt									as nomi_gwt;"
					+ ",bl.nomi_cwt									as nomi_cwt;"
					+ ",bl.col_hbl									as col_hbl;"
					+ ",bl.col_gwt									as col_gwt;"
					+ ",bl.col_cwt									as col_cwt;"
					+ ",bl.etc_hbl									as etc_hbl;"
					+ ",bl.etc_gwt									as etc_gwt;"
					+ ",bl.etc_cwt									as etc_cwt;"
					+ ",bl.ttl_hbl									as ttl_hbl;"
					+ ",bl.ttl_gwt									as ttl_gwt;"
					+ ",bl.ttl_cwt									as ttl_cwt;"
					+ ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  20;		
		}
		//WMS ACCOUNT LKH 2015.01.20
		if(formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked){//Department Type : Other
			//grdHdr1
			var Profit="Profit|Profit|Profit|Profit";	//4
			//grdHdr2
			var profit_val="A/R|A/P|D/C|Profit.";
			grdHdr1=grdCmmHdr + Profit;		//4
			grdHdr2=grdCmmHdr + profit_val;
			voColOpt="profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 = ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt = ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  4;		
		}
	}else if(formObj.s_grd_opt[1].checked){	// Option : Week
		if(formObj.s_air_sea_opt[0].checked){	//Option : Week Department Type : Ocean
		  //grdHdr1
		    var weekHdr1="";
		    var Total="Total|Total|Total|Total|Total|";	//5
			var Profit="Profit|Profit|Profit|Profit|Profit";		//5
		  //grdHdr2
			var weekHdr2="";
			var weekHdr2_val="FCL|LCL|FAK|BULK|CNTR|";
		    var total_val="FCL|LCL|FAK|BULK|CNTR|";
			var profit_val="A/R|A/P|D/C|Profit.|AVG.Profit(Per CNTR)";
		    var i_cnt=0;
		    var week_i=""; 
		    for(var i=1; i<10000; i++){
				if(i==1){
					intervalStDay=mkFormat1(s_prd_strdt);
					get_IntervalOfPeriod(intervalStDay, 'week', 0);
				}else{
					intervalEnDay=mkFormat1(intervalEnDay);
					get_IntervalOfPeriod(intervalEnDay, 'week', 1);
				}	
				week_i="w" + i + " (" + intervalStDay + " ~ " + intervalEnDay + ")|";
				weekHdr1 += week_i + week_i + week_i + week_i + week_i;		//5*i
				weekHdr2 += weekHdr2_val;									//5*i
				voColOpt += "w" + i + "_" + "fcl;"
				           + "w" + i + "_" + "lcl;"
				           + "w" + i + "_" + "fak;" 
				           + "w" + i + "_" + "blk;"
				           + "w" + i + "_" + "cntr;"; 
				sqlOpt += ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.fcl_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "fcl;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.lcl_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "lcl;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.fak_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "fak;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.blk_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "blk;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN (bl.fcl_cntr + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr)" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "cntr;";
				
				if(s_rpt_tp_opt[14].checked){ // Contribution Check
					sqlOpt2 += ",w" + i + "_" + "fcl									AS w" + i + "_" + "fcl;"
					+ ",w" + i + "_" + "lcl									AS w" + i + "_" + "lcl;"
					+ ",w" + i + "_" + "fak									AS w" + i + "_" + "fak;"
					+ ",w" + i + "_" + "blk									AS w" + i + "_" + "blk;"
					+ ",w" + i + "_" + "cntr								AS w" + i + "_" + "cntr;";
				}
				
				i_cnt++;
				if(getDaysBetweenFormat(formObj.s_tmp_dt, formObj.s_prd_enddt, "MM-dd-yyyy") < 1){
					break;
				}
		    }
		    grdHdr1=grdCmmHdr + weekHdr1 + Total + Profit;			//grdCmmHdr cnt  + 5*i + 5 + 4
			grdHdr2=grdCmmHdr + weekHdr2 + total_val + profit_val;
			voColOpt	+=  "ttl_fcl;ttl_lcl;ttl_fak;ttl_blk;ttl_cntr;" 
							+ "profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt;profit_avg_amt";
			sqlOpt 		+= ",SUM(bl.fcl_sum)         as ttl_fcl;"
							+ ",SUM(bl.lcl_sum)         as ttl_lcl;"
							+ ",SUM(bl.fak_sum)         as ttl_fak;"
							+ ",SUM(bl.blk_sum)         as ttl_blk;"
							+ ",SUM(bl.fcl_cntr + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr)         as ttl_cntr;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 += ",bl.ttl_fcl         					as ttl_fcl;"
					+ ",bl.ttl_lcl         							as ttl_lcl;"
					+ ",bl.ttl_fak         							as ttl_fak;"
					+ ",bl.ttl_blk         							as ttl_blk;"
					+ ",bl.ttl_cntr         						as ttl_cntr;"
					+ ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt"; 
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  (5*i_cnt) + 5 + 5;
		}
		if(formObj.s_air_sea_opt[1].checked){	//Option : Week Department Type : Air
			//grdHdr1
		    var weekHdr1="";
		    var Total="Total|Total|Total|";	//3
			var Profit="Profit|Profit|Profit|Profit|Profit";		//5
		  //grdHdr2
			var weekHdr2="";
			var weekHdr2_val="No.of HAWB|G/WT|C/WT|";
		    var total_val="No.of HAWB|G/WT|C/WT|";
			var profit_val="A/R|A/P|D/C|Profit.|AVG.Profit";
		    var i_cnt=0;
		    var week_i=""; 
		    for(var i=1; i<10000; i++){
				if(i==1){
					intervalStDay=mkFormat1(s_prd_strdt);
					get_IntervalOfPeriod(intervalStDay, 'week', 0);
				}else{
					intervalEnDay=mkFormat1(intervalEnDay);
					get_IntervalOfPeriod(intervalEnDay, 'week', 1);
				}
				week_i="w" + i + " (" + intervalStDay + " ~ " + intervalEnDay + ")|";
				weekHdr1 += week_i + week_i + week_i ;		//3*i
				weekHdr2 += weekHdr2_val;					//3*i
				voColOpt += "w" + i + "_" + "hbl;"
				          + "w" + i + "_" + "gwt;"
				          + "w" + i + "_" + "cwt;"; 
				sqlOpt += ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.ttl_hbl" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "hbl;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.ttl_gwt" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "gwt;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.ttl_cwt" 
						+ "          ELSE 0" 
						+ "     END)									AS w" + i + "_" + "cwt;";
				
				if(s_rpt_tp_opt[14].checked){ // Contribution Check
					sqlOpt2 += ",w" + i + "_" + "hbl									AS w" + i + "_" + "hbl;"
					+ ",w" + i + "_" + "gwt									AS w" + i + "_" + "gwt;"
					+ ",w" + i + "_" + "cwt									AS w" + i + "_" + "cwt;";
				}
				
				i_cnt++;
				if(getDaysBetweenFormat(formObj.s_tmp_dt, formObj.s_prd_enddt, "MM-dd-yyyy") < 1){
					break;
				}
		    }
		    grdHdr1=grdCmmHdr + weekHdr1 + Total + Profit;			//grdCmmHdr cnt  + 3*i + 3 + 5
			grdHdr2=grdCmmHdr + weekHdr2 + total_val + profit_val;
			voColOpt	+=  "ttl_hbl;ttl_gwt;ttl_cwt;" 
							+ "profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt;profit_avg_amt";
			sqlOpt 	   += ",SUM(bl.ttl_hbl)									as ttl_hbl;"
						+ ",SUM(bl.ttl_gwt)									as ttl_gwt;"
						+ ",SUM(bl.ttl_cwt)									as ttl_cwt;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 += ",bl.ttl_hbl									as ttl_hbl;"
					+ ",bl.ttl_gwt									as ttl_gwt;"
					+ ",bl.ttl_cwt									as ttl_cwt;"
					+ ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  (3*i_cnt) + 3 + 5;
		}	
		//WMS ACCOUNT LKH 2015.01.20
		if(formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked){	//Option : Week Department Type : Other
			//grdHdr1
		    var weekHdr1="";
			var Profit="Profit|Profit|Profit|Profit";		//4
		  //grdHdr2
			var weekHdr2="";
			var profit_val="A/R|A/P|D/C|Profit.";
		    var i_cnt=0;
		    var week_i=""; 
		    grdHdr1=grdCmmHdr + Profit;			//grdCmmHdr cnt  + 4
			grdHdr2=grdCmmHdr + profit_val;
			voColOpt	+=  "profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 = ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt = ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  4;
		}
	}else if(formObj.s_grd_opt[2].checked){	// Option : Month
		if(formObj.s_air_sea_opt[0].checked){	//Option : Month Department Type : Ocean
		  //grdHdr1
		    var monthHdr1="";
		    var Total="Total|Total|Total|Total|Total|Total|Total";	    //6
			//var Profit 			= 	"Profit|Profit|Profit|Profit|Profit|Profit";			//6
		  //grdHdr2
			var monthHdr2="";
			var monthHdr2_val="FCL|LCL|FAK|BULK|CNTR|Profit|AVG.Profit|";
		    var total_val="FCL|LCL|FAK|BULK|CNTR|Profit|AVG.Profit";
		    var i_cnt=0;
		    var month_i=""; 
		    for(var i=1; i<10000; i++){
				if(i==1){
					intervalStDay=mkFormat1(s_prd_strdt);
					get_IntervalOfPeriod(intervalStDay, 'month', 0);
				}else{
					intervalEnDay=mkFormat1(intervalEnDay);
					get_IntervalOfPeriod(intervalEnDay, 'month', 1);
				}
				month_i=mkCharDateMonthFormat(intervalEnDay) + "|";
				monthHdr1 += month_i + month_i + month_i + month_i + month_i + month_i + month_i;		//7*i
				monthHdr2 += monthHdr2_val;																//7*i
				voColOpt += "m" + i + "_" + "fcl;"
				           + "m" + i + "_" + "lcl;"
				           + "m" + i + "_" + "fak;" 
				           + "m" + i + "_" + "blk;"
				           + "m" + i + "_" + "cntr;"
				           + "m" + i + "_" + "profit;"
				           + "m" + i + "_" + "profit_avg;"; 
				sqlOpt += ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.fcl_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "fcl;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.lcl_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "lcl;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.fak_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "fak;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.blk_sum" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "blk;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN (bl.fcl_cntr + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr)" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "cntr;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt		                "
						+ "          ELSE 0																				" 
						+ "     END)									AS m" + i + "_" + "profit;"					
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN (CASE WHEN (bl.fcl_cntr + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr)=0		"
						+ "                     THEN 0																	"
						+ "          		    ELSE (bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt)			" 
						+ "          					/ (bl.fcl_cntr + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr)		"
						+ "          	   END)																			" 
						+ "          ELSE 0																				" 
						+ "     END)									AS m" + i + "_" + "profit_avg;";
				
				if(s_rpt_tp_opt[14].checked){ // Contribution Check
					sqlOpt2 += ",m" + i + "_" + "fcl									AS m" + i + "_" + "fcl;"
					+ ",m" + i + "_" + "lcl									AS m" + i + "_" + "lcl;"
					+ ",m" + i + "_" + "fak									AS m" + i + "_" + "fak;"
					+ ",m" + i + "_" + "blk									AS m" + i + "_" + "blk;"
					+ ",m" + i + "_" + "cntr								AS m" + i + "_" + "cntr;"
					+ ",m" + i + "_" + "profit								AS m" + i + "_" + "profit;"					
					+ ",m" + i + "_" + "profit_avg							AS m" + i + "_" + "profit_avg;";
				}
				
				i_cnt++;
				if(getDaysBetweenFormat(formObj.s_tmp_dt, formObj.s_prd_enddt, "MM-dd-yyyy") < 1){
					break;
				}
		    }
		    grdHdr1=grdCmmHdr + monthHdr1 + Total;			//grdCmmHdr cnt  + 7*i + 7 
			grdHdr2=grdCmmHdr + monthHdr2 + total_val;
			voColOpt	+=  "ttl_fcl;ttl_lcl;ttl_fak;ttl_blk;ttl_cntr;" 
							+ "profit_amt;profit_avg_amt";
			sqlOpt 		+= ",SUM(bl.fcl_sum)         as ttl_fcl;"
							+ ",SUM(bl.lcl_sum)         as ttl_lcl;"
							+ ",SUM(bl.fak_sum)         as ttl_fak;"
							+ ",SUM(bl.blk_sum)         as ttl_blk;"
							+ ",SUM(bl.fcl_cntr + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr)         as ttl_cntr;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0		as profit_amt";
				
				sqlOpt2 += ",bl.ttl_fcl         as ttl_fcl;"
					+ ",bl.ttl_lcl         	as ttl_lcl;"
					+ ",bl.ttl_fak         	as ttl_fak;"
					+ ",bl.ttl_blk         	as ttl_blk;"
					+ ",bl.ttl_cntr         as ttl_cntr;"
					+ ",bl.profit_amt 		as profit_amt";
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  (7*i_cnt) + 7;
		}
		if(formObj.s_air_sea_opt[1].checked){	//Option : Month Department Type : Air
			//grdHdr1
		    var monthHdr1="";
		    var Total="Total|Total|Total|Total|Total";	//5
		  //grdHdr2
			var monthHdr2="";
			var monthHdr2_val="No.of HAWB|G/WT|C/WT|Profit.|AVG.Profit|";
		    var total_val="No.of HAWB|G/WT|C/WT|Profit.|AVG.Profit";
		    var i_cnt=0;
		    var month_i=""; 
		    for(var i=1; i<10000; i++){
				if(i==1){
					intervalStDay=mkFormat1(s_prd_strdt);
					get_IntervalOfPeriod(intervalStDay, 'month', 0);
				}else{
					intervalEnDay=mkFormat1(intervalEnDay);
					get_IntervalOfPeriod(intervalEnDay, 'month', 1);
				}	
				month_i=mkCharDateMonthFormat(intervalEnDay) + "|";
				monthHdr1 += month_i + month_i + month_i + month_i + month_i;		//5*i
				monthHdr2 += monthHdr2_val;						//5*i
				voColOpt += "m" + i + "_" + "hbl;"
				          + "m" + i + "_" + "gwt;"
				          + "m" + i + "_" + "cwt;"
						  + "m" + i + "_" + "profit;"
				          + "m" + i + "_" + "profit_avg;"; 
				sqlOpt += ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.ttl_hbl" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "hbl;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.ttl_gwt" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "gwt;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.ttl_cwt" 
						+ "          ELSE 0" 
						+ "     END)									AS m" + i + "_" + "cwt;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt	 				"            
						+ "          ELSE 0																			" 
						+ "     END)									AS m" + i + "_profit;"
						+ ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN (CASE WHEN bl.ttl_cwt=0   												"            
						+ "                     THEN 0    															"     
						+ "                     ELSE (bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt)		"
						+ "          					/ bl.ttl_cwt       											"
						+ "                 END)																	"
						+ "          ELSE 0																			" 
						+ "     END)									AS m" + i + "_profit_avg;";
				
				if(s_rpt_tp_opt[14].checked){ // Contribution Check
					sqlOpt2 += ",m" + i + "_" + "hbl									AS m" + i + "_" + "hbl;"
					+ ",m" + i + "_" + "gwt									AS m" + i + "_" + "gwt;"
					+ ",m" + i + "_" + "cwt									AS m" + i + "_" + "cwt;"
					+ ",m" + i + "_profit									AS m" + i + "_profit;"
					+ ",m" + i + "_profit_avg								AS m" + i + "_profit_avg;";
				}
				
				i_cnt++;
				if(getDaysBetweenFormat(formObj.s_tmp_dt, formObj.s_prd_enddt, "MM-dd-yyyy") < 1){
					break;
				}
		    }
		    grdHdr1=grdCmmHdr + monthHdr1 + Total;			//grdCmmHdr cnt  + 5*i + 5 
			grdHdr2=grdCmmHdr + monthHdr2 + total_val;
			voColOpt	+=  "ttl_hbl;ttl_gwt;ttl_cwt;" 
							+ "profit_amt;profit_avg_amt";
			sqlOpt 	   += ",SUM(bl.ttl_hbl)									as ttl_hbl;"
						+ ",SUM(bl.ttl_gwt)									as ttl_gwt;"
						+ ",SUM(bl.ttl_cwt)									as ttl_cwt;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0		as profit_amt";
				
				sqlOpt2 += ",bl.ttl_hbl									as ttl_hbl;"
					+ ",bl.ttl_gwt									as ttl_gwt;"
					+ ",bl.ttl_cwt									as ttl_cwt;"
					+ ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
						
			grdColCnt +=  (5*i_cnt) + 5;
		}
		//WMS ACCOUNT LKH 2015.01.20
		if(formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked){	//Option : Month Department Type : Other
			//grdHdr1
		    var monthHdr1="";
		    var Total="Total";	//1
		  //grdHdr2
			var monthHdr2="";
			var monthHdr2_val="Profit|";
		    var total_val="Profit.";
		    var i_cnt=0;
		    var month_i=""; 
		    for(var i=1; i<10000; i++){
				if(i==1){
					intervalStDay=mkFormat1(s_prd_strdt);
					get_IntervalOfPeriod(intervalStDay, 'month', 0);
				}else{
					intervalEnDay=mkFormat1(intervalEnDay);
					get_IntervalOfPeriod(intervalEnDay, 'month', 1);
				}	
				month_i=mkCharDateMonthFormat(intervalEnDay) + "|";
				monthHdr1 += monthHdr2_val;				//1*i
				monthHdr2 += month_i;					//1*i
				voColOpt += "m" + i + "_" + "profit;";
				sqlOpt += ",SUM(CASE WHEN bl.period_dt >= " + mkFormat1(intervalStDay) + " AND  bl.period_dt <= " + mkFormat1(intervalEnDay)
						+ "          THEN bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt	 				"            
						+ "          ELSE 0																			" 
						+ "     END)									AS m" + i + "_profit;";
				
				if(s_rpt_tp_opt[14].checked){ // Contribution Check
					sqlOpt2 += ",m" + i + "_profit									AS m" + i + "_profit;";
				}
				
				i_cnt++;
				if(getDaysBetweenFormat(formObj.s_tmp_dt, formObj.s_prd_enddt, "MM-dd-yyyy") < 1){
					break;
				}
		    }
		    grdHdr1=grdCmmHdr + monthHdr1 + Total;			//grdCmmHdr cnt  + 1*i + 1 
			grdHdr2=grdCmmHdr + monthHdr2 + total_val;
			voColOpt	+=  "profit_amt";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0		as profit_amt";
				
				sqlOpt2 += ",bl.profit_amt as profit_amt";
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  (1*i_cnt) + 1;
		}	
	//OFVFOUR-7743 [Matrix] Adding new features on Volume and Profit Report	
	}else if(formObj.s_grd_opt[3].checked){ 				// Option : Simple
		if(formObj.s_air_sea_opt[0].checked){		//Department Type : Ocean
			
			grdHdrRows=3;
			
			//grdHdr1
			var Total="Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|";	//20
			var Profit="Profit|Profit|Profit|Profit|Profit";		//5
			
			//grdHdr2
			var Cntr_type="Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|Container TYPE|"; // 14
			var Volume="Volume|Volume|Volume|Volume|Volume"; // 6
			
			//grdHdr3
			var teu_cnt="20'|40'|HC|45'|RF|20D|40D&HQ|20R|40R&HQR|20FL&OT|40FL&OT|ETC|TEU|CNTR|"; // 14
			var shp_mod_cnt="FCL|LCL|FAK|Bulk|Sum|CNTR|"; // 6
			var profit_val="A/R|A/P|D/C|Profit.|AVG.Profit(Per CNTR)"; // 5
			
			grdHdr1=grdCmmHdr + Total + Profit;		//41
			grdHdr2=grdCmmHdr + Cntr_type + Volume + profit_val;
			grdHdr3=grdCmmHdr + teu_cnt + shp_mod_cnt + profit_val;

			//OFVFOUR-7743 [Matrix] Adding new features on Volume and Profit Report (06/14/2022)
			grdHdrRows=2;
			Cntr_type="";
			Volume="";
			grdHdr2=grdCmmHdr + teu_cnt + shp_mod_cnt + profit_val;
			
			voColOpt="" 
							+ "cntr_20;cntr_40;cntr_hq;cntr_45;cntr_rf;cntr_d2;cntr_d4;cntr_r2;cntr_r4;cntr_fo2;cntr_fo4;cntr_etc;cntr_sum;cntr_cnt;" 
							+ "vol_fcl;vol_lcl;vol_fak;vol_blk;vol_sum;vol_cntr;profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt;profit_avg_amt"; 
			sqlOpt=""
			if(formObj.profit_cntr_type_chg.value == "N"){
				sqlOpt+=",SUM(bl.cntr_20)									as cntr_20;"		  
							+ ",SUM(bl.cntr_40)									as cntr_40;"	
							+ ",SUM(bl.cntr_hq)									as cntr_hq;"	
							+ ",SUM(bl.cntr_45)									as cntr_45;"	
							+ ",SUM(bl.cntr_rf)									as cntr_rf;"	
			}else if(formObj.profit_cntr_type_chg.value == "Y"){
				sqlOpt+= ",SUM(bl.cntr_d2)									as cntr_d2;"		  
							+ ",SUM(bl.cntr_d4)									as cntr_d4;"	
							+ ",SUM(bl.cntr_r2)									as cntr_r2;"	
							+ ",SUM(bl.cntr_r4)									as cntr_r4;"	
							+ ",SUM(bl.cntr_fo2)									as cntr_fo2;"	
							+ ",SUM(bl.cntr_fo4)									as cntr_fo4;"
			}
			sqlOpt+=",SUM(bl.cntr_etc)								as cntr_etc;"	
						+ ",SUM(bl.cntr_sum)								as cntr_sum;"
						+ ",SUM(bl.fcl_cntr)								as cntr_cnt;"
						+ ",SUM(bl.fcl_cbm)									as vol_fcl;"
						+ ",SUM(bl.lcl_sum)									as vol_lcl;"	
						+ ",SUM(bl.fak_sum)									as vol_fak;"					  
						+ ",SUM(bl.blk_sum)									as vol_blk;"	
						+ ",SUM(bl.fcl_cbm + bl.lcl_sum + bl.fak_sum + bl.blk_sum)	as vol_sum;"	
						+ ",SUM(bl.cntr_cnt + bl.lcl_cntr + bl.fak_cntr + bl.blk_cntr) as vol_cntr;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 =  ""	
				if(formObj.profit_cntr_type_chg.value == "N"){
					sqlOpt2 += ",bl.cntr_20								as cntr_20;"		  
						+ ",bl.cntr_40								as cntr_40;"	
						+ ",bl.cntr_hq								as cntr_hq;"	
						+ ",bl.cntr_45								as cntr_45;"	
						+ ",bl.cntr_rf								as cntr_rf;"	
					}else if(formObj.profit_cntr_type_chg.value == "Y"){
						sqlOpt2 += ",bl.cntr_d2								as cntr_d2;"		  
						+ ",bl.cntr_d4								as cntr_d4;"	
						+ ",bl.cntr_r2								as cntr_r2;"	
						+ ",bl.cntr_r4								as cntr_r4;"	
						+ ",bl.cntr_fo2								as cntr_fo2;"	
						+ ",bl.cntr_fo2								as cntr_fo4;"	
					}
				sqlOpt2 += ",bl.cntr_etc								as cntr_etc;"	
					+ ",bl.cntr_sum								as cntr_sum;"
					+ ",bl.cntr_cnt								as cntr_cnt;"
					+ ",bl.vol_lcl								as vol_lcl;"	
					+ ",bl.vol_fak								as vol_fak;"					  
					+ ",bl.vol_blk								as vol_blk;"	
					+ ",bl.vol_sum								as vol_sum;"	
					+ ",bl.vol_cntr								as vol_cntr;"
					+ ",bl.profit_ar_amt						as profit_ar_amt;"
					+ ",bl.profit_ap_amt						as profit_ap_amt;"
					+ ",bl.profit_dc_amt						as profit_dc_amt;"
	                + ",bl.profit_amt 							as profit_amt";
			} 
				
			sqlOpt += ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
							
			grdColCnt +=  42;
		}
		if(formObj.s_air_sea_opt[1].checked){//Department Type : Air
			//grdHdr1
			var Total="Total|Total|Total|";			//3
			var Profit="Profit|Profit|Profit|Profit|Profit";	//5
			//grdHdr2
			var vol_cnt="No.of HAWB|G/WT|C/WT|";
			var profit_val="A/R|A/P|D/C|Profit.|AVG.Profit";
			grdHdr1=grdCmmHdr + Total + Profit;		//20
			grdHdr2=grdCmmHdr + vol_cnt + profit_val;
			voColOpt="" 
								+ "ttl_hbl;ttl_gwt;ttl_cwt;" 
								+ "profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt;profit_avg_amt";
			sqlOpt=""
							+ ",SUM(bl.ttl_hbl)									as ttl_hbl;"
							+ ",SUM(bl.ttl_gwt)									as ttl_gwt;"
							+ ",SUM(bl.ttl_cwt)									as ttl_cwt;";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = sqlOpt
					+ ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 = ""
					+ ",bl.ttl_hbl									as ttl_hbl;"
					+ ",bl.ttl_gwt									as ttl_gwt;"
					+ ",bl.ttl_cwt									as ttl_cwt;"
					+ ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt += ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  20;		
		}
		//WMS ACCOUNT LKH 2015.01.20
		if(formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked){//Department Type : Other || Department Type : Warehouse
			//grdHdr1
			var Profit="Profit|Profit|Profit|Profit";	//4
			//grdHdr2
			var profit_val="A/R|A/P|D/C|Profit.";
			grdHdr1=grdCmmHdr + Profit;		//4
			grdHdr2=grdCmmHdr + profit_val;
			voColOpt="profit_ar_amt;profit_ap_amt;profit_dc_amt;profit_amt";
			
			if(s_rpt_tp_opt[14].checked){ // Contribution Check
				sqlOpt1 = ",0       as profit_ar_amt;"                           
					+ ",0       as profit_ap_amt;"                            
					+ ",0       as profit_dc_amt;"                            
					+ ",0		as profit_amt";
				
				sqlOpt2 = ",bl.profit_ar_amt							as profit_ar_amt;"
					+ ",bl.profit_ap_amt							as profit_ap_amt;"
					+ ",bl.profit_dc_amt							as profit_dc_amt;"
	                + ",bl.profit_amt 								as profit_amt";
			}
			
			sqlOpt = ",SUM(bl.profit_ar_amt)							as profit_ar_amt;"
				+ ",SUM(bl.profit_ap_amt)							as profit_ap_amt;"
				+ ",SUM(bl.profit_dc_amt)							as profit_dc_amt;"
                + ",SUM(bl.profit_ar_amt - bl.profit_ap_amt + bl.profit_dc_amt) as profit_amt";
			
			grdColCnt +=  4;		
		}
	}	
	if(s_rpt_tp_opt[14].checked){ // Contribution Check
		grdHdr1 += "|Contribution Margin|Total Profit";
		grdHdr2 += "|Contribution Margin|Total Profit";
		grdHdr3 += "|Contribution Margin|Total Profit";
		
		voColOpt += ";ctrb_profit_amt;ttl_ctrb_profit_amt";
		//sqlOpt += ",ctrb_profit_amt as ctrb_profit_amt;"
		//	 	+ ",profit_amt + ctrb_profit_amt as ttl_ctrb_profit_amt";
		
		grdColCnt += 2;
		
		// Contribution Margin Check Y/N
		formObj.s_ctrb_mgn_yn.value = "Y";
	} else {
		// Contribution Margin Check Y/N
		formObj.s_ctrb_mgn_yn.value = "N";
	}
	
	if(s_rpt_tp_opt[15].checked){ // Team/Operator Check
		formObj.s_team_opr_yn.value = "Y";
	}else{
		formObj.s_team_opr_yn.value = "N";
	}
	
	formObj.voColOpt.value=voColOpt;
	formObj.sqlOpt.value=sqlOpt;
	formObj.sqlOpt1.value=sqlOpt1;
	formObj.sqlOpt2.value=sqlOpt2;
}

function setCurrCheckedVal(){
	var formObj=document.frm1;
	//Ocean, Air
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.s_air_sea_opt[0].checked){
		formObj.s_air_sea_opt.value="S";
		formObj.s_sys_flg.value="FMS";
	}		
	if(formObj.s_air_sea_opt[1].checked){
		formObj.s_air_sea_opt.value="A";
		formObj.s_sys_flg.value="FMS";
	}
	if(formObj.s_air_sea_opt[2].checked){
		formObj.s_air_sea_opt.value="O";
		formObj.s_sys_flg.value="OTH";
	}
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.s_air_sea_opt[3].checked){
		formObj.s_air_sea_opt.value="W";
		formObj.s_sys_flg.value="WMS";
	}
	
	//Export, Import
	if(formObj.s_exp_bound_flg.checked){
		formObj.s_exp_bound_flg.value="T";
	}
	if(formObj.s_imp_bound_flg.checked){
		formObj.s_imp_bound_flg.value="T";
	}
	//Include Duty & Tax
	if(formObj.s_prf_tax.checked){
		formObj.s_prf_tax.value="T";
	} 
}
function setCheckedVal(){
	var formObj=document.frm1;
	setCurrCheckedVal();
	//Option, Summary, Week, Month
	if(formObj.s_grd_opt[0].checked){
		formObj.s_grd_opt.value="S";
	}
	if(formObj.s_grd_opt[1].checked){
		formObj.s_grd_opt.value="W";
	}
	if(formObj.s_grd_opt[2].checked){
		formObj.s_grd_opt.value="M";
	}
	//Ship Mode, FCL, LCL, FAK, BULK
	if(formObj.s_ship_mode_fcl.checked){
		formObj.s_ship_mode_fcl.value="T";
	}
	if(formObj.s_ship_mode_lcl.checked){
		formObj.s_ship_mode_lcl.value="T";
	}
	if(formObj.s_ship_mode_fak.checked){
		formObj.s_ship_mode_fak.value="T";
	}
	if(formObj.s_ship_mode_blk.checked){
		formObj.s_ship_mode_blk.value="T";
	} 
	//Profit A/R, A/P, Debit/Credit, Include VAT
	if(formObj.s_prf_ar.checked){
		formObj.s_prf_ar.value="T";
	}
	if(formObj.s_prf_ap.checked){
		formObj.s_prf_ap.value="T";
	}
	if(formObj.s_prf_dc.checked){
		formObj.s_prf_dc.value="T";
	}
	if(formObj.s_prf_vat.checked){
		formObj.s_prf_vat.value="T";
	} 
	formObj.one_curr_rate_sql.value=getExchangeRateData();
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

function getExchangeRateData(){
	var xcrtData = "";
	var sheetObj = docObjects[0]; 
	if(sheetObj.RowCount()== 0){
		xcrtData = "@!^";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			//Currency Code + '@' + 환율적용월 + '#' + 환율 + '^'
			xcrtData += sheetObj.GetCellValue(i, "curr_cd") + "@" + sheetObj.GetCellValue(i, "aply_fm_dt") + "!" + sheetObj.GetCellValue(i, "rate") + "^";
		}
	}
	return xcrtData;
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   //docObjects[sheetCnt++]=sheet_obj;
   //console.log( "docObjects["+ (sheetCnt-1) +"]  = " +docObjects[(sheetCnt-1)].id);
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet2":
			docObjects[2]=sheet_obj;
		break;
		case "sheet3":
			docObjects[1]=sheet_obj;
		break;
		case "sheet4":
			docObjects[3]=sheet_obj;
		break;
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	//console.log(sheetObj.id  + " sheetNo = "+ sheetNo);
	var formObj=document.frm1;
	var sheetObj3=docObjects[3];
	switch(sheetObj.id) {
	    case "sheet1":      //IBSheet2 init
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
	        SetSheetHeight(120);
	    } 
		break;
	    case "sheet3":      //IBSheet2 init
		    with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('PFM_MGT_0030_HDR5'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"check_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"type_val",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:1,   SaveName:"value_val",  KeyField:0,   CalcLogic:"",   Format:"" },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",   ColMerge:1,   SaveName:"code_val",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:4,   UpdateEdit:1,   InsertEdit:1 } ];
             
            InitColumns(cols);

            SetEditable(1);
            SetSheetHeight(200);
	    } 
		break;
    	case "sheet2":      //IBSheet1 init
            with (sheetObj) {
	    		SetConfig( { SearchMode:2, MergeSheet:7, Page:200, DataRowMerge:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            
	            var headers = [ { Text:grdHdr1, Align:"Center"},{ Text:grdHdr2, Align:"Center"} ];
	            if(grdHdrRows == "3"){
	            	headers = [ { Text:grdHdr1, Align:"Center"},{ Text:grdHdr2, Align:"Center"},{ Text:grdHdr3, Align:"Center"} ];
	             }
	            
	            InitHeaders(headers, info);
	            
	            var cols = [];
	            
	             var col_hdr=voColHdr.substring(0, voColHdr.length-1).split(";");
	             var col_hdr_width=80;
	             var col_hdr_align="Center";
	             var col_hdr_format="";
	             
	             var col_opt=voColOpt.split(";");
	             var col_opt_width=70;
	             var col_opt_align="Right";
	             var col_opt_format="Float";
	             var col_opt_format_point=2;
	             
	             var col_CalcLogic	= "";
	             var col_hdr_hidden	= 0;
	             
	             //#2167 [PATENT] Volume & Profit 의 Subtotal By Report Type 기능 추가
	             var zero_col_hdr = "dept_nm";
	             var f1st_col_hdr = "ref_no";
	             
	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             for(var cnt_hdr=0; cnt_hdr < col_hdr.length; cnt_hdr++){
	            	 col_hdr_hidden =0;
	            	 
	            	 if(cnt_hdr == 0){
	            		 zero_col_hdr = col_hdr[cnt_hdr];
            		 }
	            	 
	            	 if(cnt_hdr > 0){
	            		 
	            		 if(cnt_hdr == 2){
	            			 f1st_col_hdr = col_hdr[cnt_hdr];
	            		 }
	            		 
	            		 // [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
			             if(col_hdr[cnt_hdr] == "etd_dt_tm" || col_hdr[cnt_hdr] == "eta_dt_tm" || col_hdr[cnt_hdr] == "post_dt"){
		            		 if(formObj.s_air_sea_opt[0].checked){	// 'S' Ocean 인경우
		            			 col_hdr_width=70;
			            		 col_hdr_align="Center";
			            		 col_hdr_format="Ymd";
			            	 }else{
			            		 col_hdr_width=105;
			            		 col_hdr_align="Center";
			            		 col_hdr_format="YmdHm";
			            	 }
			             }else if(col_hdr[cnt_hdr] == "ref_ofc_cd" || col_hdr[cnt_hdr] == "cargo_tp_nm"
			            	 		|| col_hdr[cnt_hdr] == "sls_usr_nm" || col_hdr[cnt_hdr] == "opr_usr_nm" || col_hdr[cnt_hdr] == "ctrb_ofc_cd"){	 
			            	 col_hdr_width=80;
		            		 col_hdr_align="Center";
		            		 col_hdr_format="";
			             }else if(col_hdr[cnt_hdr] == "bl_no" || col_hdr[cnt_hdr] == "ref_no" || col_hdr[cnt_hdr] == "mbl_no"){
			            	 col_hdr_width=110;
			            	 col_hdr_align="Left";
				             col_hdr_format="";
			             }else if(col_hdr[cnt_hdr] == "No"){
			            	 col_hdr_width=30;
			            	 col_hdr_align="Center";
				             col_hdr_format="";
				             
		            	 }else{
		            		 col_hdr_width=140;
				             col_hdr_align="Left";
				             col_hdr_format="";
		            	 }
	            	 }
	            	 
	            	 //console.log('header = ' +col_hdr[cnt_hdr]);
	            	 if(formObj.s_subsum_yn.value == "Y"){
	            		 if(col_hdr[cnt_hdr] != "No"){  //#3358 [JTC]Japan Trust 용 Arrival Notice 개발
	            			 cols.push({Type:"Text",   Hidden:col_hdr_hidden,  BackColor:"#FFFFFF", Width:col_hdr_width,Align:col_hdr_align, ColMerge:1,   SaveName:col_hdr[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:col_hdr_format,     PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
	            		 }
	            	 }else{
	            		 cols.push({Type:"Text",   Hidden:col_hdr_hidden,  BackColor:"#FFFFFF", Width:col_hdr_width,Align:col_hdr_align, ColMerge:1,   SaveName:col_hdr[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:col_hdr_format,     PointCount:0,   UpdateEdit:0,   InsertEdit:0 }); 
	            	 }
	            	 /*if(col_hdr[cnt_hdr] == "etd_dt_tm" || col_hdr[cnt_hdr] == "eta_dt_tm"){
	            		 if(formObj.s_air_sea_opt[0].checked){
	            			 InitViewFormat(0, col_hdr[cnt_hdr], "MM-dd-yyyy"); 
		            	 }else{
		            		 SetColProperty(col_hdr[cnt_hdr], {Format:"##-##-#### ##:##"} );
		            	 }
	            	 }*/
	             }
	             //console.log("------------------");
	             for(var cnt_opt=0; cnt_opt < col_opt.length; cnt_opt++){
	            	 if(col_opt[cnt_opt] == "lcl_cntr" || col_opt[cnt_opt] == "fak_cntr" ||
	            			 col_opt[cnt_opt] == "blk_cntr" || col_opt[cnt_opt] == "cntr_cnt" || 	            			 
	            			 (col_opt[cnt_opt].indexOf("_hbl") != -1) || // No.of HAWB인 경우
	            			 col_opt[cnt_opt] == "vol_cntr" || //'Summary'일경우
	            			 col_opt[cnt_opt].indexOf("cntr") > -1){	//'Week'인경우
	            		 col_opt_width=70;
	            		 col_opt_format="Integer";
	            		 col_opt_format_point=0;
	            		 col_CalcLogic = "Math.round(|"+col_opt[cnt_opt]+"|)";
	            	 }else if(col_opt[cnt_opt] == "profit_amt" || col_opt[cnt_opt] == "profit_avg_amt" || col_opt[cnt_opt].lastIndexOf("_profit") > -1 || col_opt[cnt_opt] == "ctrb_profit_amt" || col_opt[cnt_opt] == "ttl_ctrb_profit_amt"){
	            		 col_opt_width=120;
	            		 col_opt_format="Float";
	    	             col_opt_format_point=2;
	    	             col_CalcLogic = "Math.round(|"+col_opt[cnt_opt]+"|*100)/100";
	            	 }else{
	            		 col_opt_width=70;
	            		 col_opt_format="Float";
	    	             col_opt_format_point=2;
	    	             col_CalcLogic = "Math.round(|"+col_opt[cnt_opt]+"|*100)/100";
	            	 }

	            	 //InitDataProperty(0, col_cnt++,  dtAutoSum,   col_opt_width,  col_opt_align,    true,    col_opt[cnt_opt],               false,   "",       col_opt_format,    col_opt_format_point,     false,        false);
	            	 cols.push({Type:"AutoSum",   Hidden:0,  BackColor:"#FFFFFF", Width:col_opt_width,Align:col_opt_align, ColMerge:0,   SaveName:col_opt[cnt_opt],    KeyField:0,   CalcLogic:col_CalcLogic,   Format:col_opt_format,     PointCount:col_opt_format_point,   UpdateEdit:0,   InsertEdit:0 });
	            	 col_CalcLogic = "";
	            	 //console.log(col_opt[cnt_opt]);
	             }
	             //console.log(cols);
	             
		            var cols_JPY = [];
		            
		             var cols_JPY_hdr=voColHdr.substring(0, voColHdr.length-1).split(";");
		             var cols_JPY_hdr_width=80;
		             var cols_JPY_hdr_align="Center";
		             var cols_JPY_hdr_format="";
		             
		             var cols_JPY_opt=voColOpt.split(";");
		             var cols_JPY_opt_width=70;
		             var cols_JPY_opt_align="Right";
		             var cols_JPY_opt_format="Float";
		             var cols_JPY_opt_format_point=2;
		             
		             var cols_JPY_CalcLogic	= "";
		             var cols_JPY_hdr_hidden	= 0;
		             
		             //#2167 [PATENT] Volume & Profit 의 Subtotal By Report Type 기능 추가
		             var zero_cols_JPY_hdr = "dept_nm";
		             var f1st_cols_JPY_hdr = "ref_no";
		             
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             for(var cnt_hdr=0; cnt_hdr < cols_JPY_hdr.length; cnt_hdr++){
		            	 cols_JPY_hdr_hidden =0;
		            	 
		            	 if(cnt_hdr == 0){
		            		 zero_cols_JPY_hdr = cols_JPY_hdr[cnt_hdr];
	            		 }
		            	 
		            	 if(cnt_hdr > 0){
		            		 
		            		 if(cnt_hdr == 2){
		            			 f1st_cols_JPY_hdr = cols_JPY_hdr[cnt_hdr];
		            		 }
		            		 
		            		 // [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
				             if(cols_JPY_hdr[cnt_hdr] == "etd_dt_tm" || cols_JPY_hdr[cnt_hdr] == "eta_dt_tm" || cols_JPY_hdr[cnt_hdr] == "post_dt"){
			            		 if(formObj.s_air_sea_opt[0].checked){	// 'S' Ocean 인경우
			            			 cols_JPY_hdr_width=70;
				            		 cols_JPY_hdr_align="Center";
				            		 cols_JPY_hdr_format="Ymd";
				            	 }else{
				            		 cols_JPY_hdr_width=105;
				            		 cols_JPY_hdr_align="Center";
				            		 cols_JPY_hdr_format="YmdHm";
				            	 }
				             }else if(cols_JPY_hdr[cnt_hdr] == "ref_ofc_cd" || cols_JPY_hdr[cnt_hdr] == "cargo_tp_nm"
				            	 		|| cols_JPY_hdr[cnt_hdr] == "sls_usr_nm" || cols_JPY_hdr[cnt_hdr] == "opr_usr_nm" || cols_JPY_hdr[cnt_hdr] == "ctrb_ofc_cd"){	 
				            	 cols_JPY_hdr_width=80;
			            		 cols_JPY_hdr_align="Center";
			            		 cols_JPY_hdr_format="";
				             }else if(cols_JPY_hdr[cnt_hdr] == "bl_no" || cols_JPY_hdr[cnt_hdr] == "ref_no" || cols_JPY_hdr[cnt_hdr] == "mbl_no"){
				            	 cols_JPY_hdr_width=110;
				            	 cols_JPY_hdr_align="Left";
					             cols_JPY_hdr_format="";
				             }else if(cols_JPY_hdr[cnt_hdr] == "No"){
				            	 cols_JPY_hdr_width=30;
				            	 cols_JPY_hdr_align="Center";
					             cols_JPY_hdr_format="";
					             
			            	 }else{
			            		 cols_JPY_hdr_width=140;
					             cols_JPY_hdr_align="Left";
					             cols_JPY_hdr_format="";
			            	 }
		            	 }
		            	 
		            	 //console.log('header = ' +cols_JPY_hdr[cnt_hdr]);
		            	 if(formObj.s_subsum_yn.value == "Y"){
		            		 if(cols_JPY_hdr[cnt_hdr] != "No"){  //#3358 [JTC]Japan Trust 용 Arrival Notice 개발
		            			 cols_JPY.push({Type:"Text",   Hidden:cols_JPY_hdr_hidden,  BackColor:"#FFFFFF", Width:cols_JPY_hdr_width,Align:cols_JPY_hdr_align, ColMerge:1,   SaveName:cols_JPY_hdr[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:cols_JPY_hdr_format,     PointCount:0,   UpdateEdit:0,   InsertEdit:0 });
		            		 }
		            	 }else{
		            		 cols_JPY.push({Type:"Text",   Hidden:cols_JPY_hdr_hidden,  BackColor:"#FFFFFF", Width:cols_JPY_hdr_width,Align:cols_JPY_hdr_align, ColMerge:1,   SaveName:cols_JPY_hdr[cnt_hdr],    KeyField:0,   CalcLogic:"",   Format:cols_JPY_hdr_format,     PointCount:0,   UpdateEdit:0,   InsertEdit:0 }); 
		            	 }
		            	 /*if(cols_JPY_hdr[cnt_hdr] == "etd_dt_tm" || cols_JPY_hdr[cnt_hdr] == "eta_dt_tm"){
		            		 if(formObj.s_air_sea_opt[0].checked){
		            			 InitViewFormat(0, cols_JPY_hdr[cnt_hdr], "MM-dd-yyyy"); 
			            	 }else{
			            		 SetColProperty(cols_JPY_hdr[cnt_hdr], {Format:"##-##-#### ##:##"} );
			            	 }
		            	 }*/
		             }
		             //console.log("------------------");
		             for(var cnt_opt=0; cnt_opt < cols_JPY_opt.length; cnt_opt++){
		            	 if(cols_JPY_opt[cnt_opt] == "lcl_cntr" || cols_JPY_opt[cnt_opt] == "fak_cntr" ||
		            			 cols_JPY_opt[cnt_opt] == "blk_cntr" || cols_JPY_opt[cnt_opt] == "cntr_cnt" || 	            			 
		            			 (cols_JPY_opt[cnt_opt].indexOf("_hbl") != -1) || // No.of HAWB인 경우
		            			 cols_JPY_opt[cnt_opt] == "vol_cntr" || //'Summary'일경우
		            			 cols_JPY_opt[cnt_opt].indexOf("cntr") > -1){	//'Week'인경우
		            		 cols_JPY_opt_width=70;
		            		 cols_JPY_opt_format="Integer";
		            		 cols_JPY_opt_format_point=0;
		            		 cols_JPY_CalcLogic = "Math.round(|"+cols_JPY_opt[cnt_opt]+"|)";
		            	 }else if(cols_JPY_opt[cnt_opt] == "profit_amt" || cols_JPY_opt[cnt_opt] == "profit_avg_amt" || cols_JPY_opt[cnt_opt].lastIndexOf("_profit") > -1 || cols_JPY_opt[cnt_opt] == "ctrb_profit_amt" || cols_JPY_opt[cnt_opt] == "ttl_ctrb_profit_amt"){
		            		 cols_JPY_opt_width=120;
		            		 cols_JPY_opt_format="Float";
		    	             cols_JPY_opt_format_point=0;
		    	             cols_JPY_CalcLogic = "Math.round(|"+cols_JPY_opt[cnt_opt]+"|*100)/100";
		    	         //#4059 [JAPT] Profit report - CBM(LCL/FAK/Bulk) 소수점 2자리 표시 , Profit(A/R, A/P, D/C) 정수 표시 가능하도록 수정
		            	 }else if(cols_JPY_opt[cnt_opt] == "profit_ar_amt" || cols_JPY_opt[cnt_opt] == "profit_ap_amt" || cols_JPY_opt[cnt_opt] == "profit_dc_amt"){
		            		 cols_JPY_opt_width=70;
		            		 cols_JPY_opt_format="Float";
		    	             cols_JPY_opt_format_point=0;
		    	             cols_JPY_CalcLogic = "Math.round(|"+cols_JPY_opt[cnt_opt]+"|*100)/100";
		            	 }else{
		            		 cols_JPY_opt_width=70;
		            		 cols_JPY_opt_format="Float";
		    	             cols_JPY_opt_format_point=2;
		    	             cols_JPY_CalcLogic = "Math.round(|"+cols_JPY_opt[cnt_opt]+"|*100)/100";
		            	 }

		            	 //InitDataProperty(0, cols_JPY_cnt++,  dtAutoSum,   cols_JPY_opt_width,  cols_JPY_opt_align,    true,    cols_JPY_opt[cnt_opt],               false,   "",       cols_JPY_opt_format,    cols_JPY_opt_format_point,     false,        false);
		            	 cols_JPY.push({Type:"AutoSum",   Hidden:0,  BackColor:"#FFFFFF", Width:cols_JPY_opt_width,Align:cols_JPY_opt_align, ColMerge:0,   SaveName:cols_JPY_opt[cnt_opt],    KeyField:0,   CalcLogic:cols_JPY_CalcLogic,   Format:cols_JPY_opt_format,     PointCount:cols_JPY_opt_format_point,   UpdateEdit:0,   InsertEdit:0 });
		            	 cols_JPY_CalcLogic = "";
		            	 //console.log(cols_JPY_opt[cnt_opt]);
		             }
		             
	             if(formObj.s_curr_cd.value == 'JPY') {
	            	 InitColumns(cols_JPY);
	             } else {
	            	 InitColumns(cols);
	             }
	             
	             SetEditable(1);
	             SetSheetHeight(MGT0160_HEIGHT); //#2396 [BINEX] Volume and Profit Report: +/-를 기능 점검
	             sheetObj.SetSumValue("dept_nm", "Grand Total");
	             sheetObj.SetSumValue("disp_dept_nm", "Grand Total");
		         //if(formObj.s_subsum_yn.value == "Y")       	
		         //	sheetObj.ColDelete("No");
		         //}	    
		            
	             if(formObj.s_ship_mode_fcl.checked && !formObj.s_ship_mode_lcl.checked && !formObj.s_ship_mode_fak.checked && !formObj.s_ship_mode_blk.checked){
	            	 SetColHidden("profit_avg_amt", 0);
	             }else{
	            	 SetColHidden("profit_avg_amt", 1);
	             }
	             
        		 /*if(formObj.s_air_sea_opt[0].checked){
        			 InitViewFormat(0, "etd_dt_tm", "MM-dd-yyyy"); 
        			 InitViewFormat(0, "eta_dt_tm", "MM-dd-yyyy"); 
            	 }else{
            		 SetColProperty("etd_dt_tm", {Format:"##-##-#### ##:##"} );
            		 SetColProperty("eta_dt_tm", {Format:"##-##-#### ##:##"} );
            	 }*/
	             /////
	             
	             var sumCols = voColOpt.replace(/;/gi, "|"); 
	             
	             //[정규식의 gi 설명]
	             //* g : 발생할 모든 pattern에 대한 전역 검색
	             //* i : 대/소문자 구분 안함
            	 
	             
	             /*
            	//LHK, #2167 [PATENT] Volume & Profit 의 Subtotal By Report Type 기능 추가
	             var s_sel_opt=document.getElementsByName("s_sel_opt");
	             
	             if(formObj.s_air_sea_opt[0].checked || formObj.s_air_sea_opt[1].checked){
	            	 if(s_sel_opt[0].checked){	//Subtotal By Report Type 에 Check 한 경우 
	            		 sheetObj.ShowSubSum([
		            		 				 {StdCol:"" + zero_col_hdr + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+zero_col_hdr+"", CaptionText:"Sub Total : %col"}
		            		 				,{StdCol:"" + f1st_col_hdr + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+f1st_col_hdr+"", CaptionText:"Sub Total - %col"}
		            	 					]);
	            	 //sort기능이 작동 안하기 때문에 ShowSubSum 기능 확인 필요.
//		             }else{
//		            	 sheetObj.ShowSubSum([{StdCol:"" + zero_col_hdr + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"Sub Total : %col"}]);
//		             }
	            	 }
	             }else{
	            	 if(s_sel_opt[0].checked){	//Subtotal By Report Type 에 Check 한 경우 
		            	 sheetObj.ShowSubSum([{StdCol:"" + f1st_col_hdr + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+f1st_col_hdr+"", CaptionText:"Sub Total - %col"}]);
		             }
	             }
	             */
	             
	            //<!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 --> 
	         	var subSumCol = [];
	         	var lstSumCol='|'; // OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	         	if(formObj.s_air_sea_opt[0].checked || formObj.s_air_sea_opt[1].checked){
	         		if(formObj.s_subsum_yn.value == "Y"){
	         		    lstSumCol+= (zero_col_hdr + "|"); // OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	         			subSumCol.push({StdCol:"" + zero_col_hdr + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+zero_col_hdr+"",CaptionText: "Sub-%col"});
	         		}
	         	}
	         	
	         	
	         	var otherTxt ="";
	         	var otherRow = 0;
	         	for(var i=1; i <= sheetObj3.LastRow(); i++) {
	         	    // OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	         	    var colTbNm = sheetObj3.GetCellValue(i, "col_tb_nm");
	        		if(sheetObj3.GetCellValue(i, "chk_val") == "1" && colTbNm && lstSumCol.indexOf("|" + colTbNm + "|") == -1){
	        			otherTxt += otherRow +"=%s;";  
	        			subSumCol.push({StdCol:"" + sheetObj3.GetCellValue(i, 'col_tb_nm') + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+sheetObj3.GetCellValue(i, 'col_tb_nm')+"", CaptionText: "Sub-%col", OtherColText:""+otherTxt +""});
	        			otherRow += 1;
	        			// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	        			lstSumCol+= (colTbNm + "|");
	        		}
	        		
	        		// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	        		if (sheetObj3.GetCellValue(i, "chk_val") == "1" && sheetObj3.GetCellValue(i, "col_val") == reportTypeObjs.CONTRIBUTION) {
                        otherTxt += otherRow +"=%s;";
                        subSumCol.push({StdCol:"cust_nm", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:"cust_nm", CaptionText: "Sub-%col", OtherColText:""+otherTxt +""});
                        otherRow += 1;
                        lstSumCol+= ("cust_nm|");
                        otherTxt += otherRow +"=%s;";
                        subSumCol.push({StdCol:"ctrb_ofc_cd", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:"ctrb_ofc_cd", CaptionText: "Sub-%col", OtherColText:""+otherTxt +""});
                        otherRow += 1;
                        lstSumCol+= ("ctrb_ofc_cd|");
                    }
                    
                    if (sheetObj3.GetCellValue(i, "chk_val") == "1" && sheetObj3.GetCellValue(i, "col_val") == reportTypeObjs.TEAM_OPERATOR) {
                        otherTxt += otherRow +"=%s;";
                        subSumCol.push({StdCol:"opr_usr_nm", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:"opr_usr_nm", CaptionText: "Sub-%col", OtherColText:""+otherTxt +""});
                        otherRow += 1;
                        lstSumCol+= ("opr_usr_nm|");
                    }
	        	}
	         	//subSumCol.push({StdCol:"" + zero_col_hdr + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+zero_col_hdr+"",CaptionText: "%col"});
	         	//subSumCol.push({StdCol:"" + 'opr_usr_nm' + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+'opr_usr_nm'+"",CaptionText: "%col"});
	         	//subSumCol.push({StdCol:"" + 'pod_nm' + "",AvgCols:"opr_usr_nm", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+'pod_nm'+"",CaptionText: "%col"});
	         	//subSumCol.push({StdCol:"" + sheetObj3.GetCellValue(1, 'col_tb_nm') + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+sheetObj3.GetCellValue(1, 'col_tb_nm')+"", OtherColText:"0=%s",CaptionText: "Sub-%col"});
	         	//subSumCol.push({StdCol:"" + sheetObj3.GetCellValue(2, 'col_tb_nm') + "", SumCols:sumCols, Sort:false, ShowCumulate:false, CaptionCol:""+sheetObj3.GetCellValue(2, 'col_tb_nm')+"", OtherColText:"0=%s;1=%s",CaptionText: "Sub-%col"});
	         	sheetObj.SetSumBackColor("#fdeada");
	         	sheetObj.ShowSubSum(subSumCol);
	         	
	             
	         	//alert(sheetObj.GetSumBackColor());
	        	
	            setCntrTypeHdr(formObj.profit_cntr_type_chg.value, sheetObj);
	         	
	             resizeSheet();
           }                                                      
         break;
	    case "sheet4":      //#3376 [JTC] Japan Trust 용 Profit Report 개발
		    with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('PFM_MGT_0030_HDR6'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Seq",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"seq_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",          Hidden:0,  Width:300,  Align:"Center",  ColMerge:1,   SaveName:"col_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"CheckBox",      Hidden:0,  Width:50,  Align:"Center",  ColMerge:1,   SaveName:"chk_val",  KeyField:0,   CalcLogic:"",   Format:"" },
                {Type:"Text",          Hidden:1,  Width:50,  Align:"Center",  ColMerge:1,   SaveName:"col_val",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",          Hidden:1,  Width:50,  Align:"Center",  ColMerge:1,   SaveName:"col_tb_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",          Hidden:1,  Width:50,  Align:"Center",  ColMerge:1,   SaveName:"type_val",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
                ]
             
            InitColumns(cols);

            SetEditable(1);
            SetSheetHeight(200);
	    } 
		break;         
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[2]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
}

function sheet2_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "profit_amt") > 0){
			if(varTargetAmt > 0){
				if(sheetObj.GetCellValue(i, "profit_amt") > varTargetAmt){
					sheetObj.SetCellFontColor(i, "profit_amt","#0100FF");
				}
			}
		}
		
		var subStr = sheetObj.GetCellValue(i, 0);
		var subStr1 = sheetObj.GetCellValue(i, 1);
		var subStr2 = sheetObj.GetCellValue(i, 2);
		var subStr3 = sheetObj.GetCellValue(i, 3);
		var subStr4 = sheetObj.GetCellValue(i, 4);
		var subStr5 = sheetObj.GetCellValue(i, 5);
		var subStr6 = sheetObj.GetCellValue(i, 6);
		//console.log(subStr.indexOf("Sub"));
		//console.log(subStr.indexOf("Grand"));
		//console.log("FindSubSumRow = " + sheetObj.FindSubSumRow())
		
		
		if(subStr.indexOf("Sub") > -1  || subStr.indexOf("Grand") > -1){
			sheetObj.SetRowBackColor(i,"#dce6f2");
		}
		if(subStr1.indexOf("Sub") > -1 ){
			sheetObj.SetRowBackColor(i,"#dce6f2");
		}
		if(subStr2.indexOf("Sub") > -1 ){
			sheetObj.SetRowBackColor(i,"#fdeada");
		}
		if(subStr3.indexOf("Sub") > -1 ){
			sheetObj.SetRowBackColor(i,"#fdeada");
		}
		if(subStr4.indexOf("Sub") > -1 ){
			sheetObj.SetRowBackColor(i,"#fdeada");
		}
		if(subStr5.indexOf("Sub") > -1 ){
			sheetObj.SetRowBackColor(i,"#fdeada");
		}
		if(subStr6.indexOf("Sub") > -1 ){
			sheetObj.SetRowBackColor(i,"#fdeada");
		}
		
		//console.log(sheetObj.GetRowBackColor(i,"#dce6f2"));
	}
	
	/*
	var sumRows = sheetObj.FindSubSumRow();
	var rowsAry = sumRows.split('|');
	for(var i =0; i < rowsAry.length; i++){
		console.log(sheetObj.GetRowBackColor(rowsAry[i]));
		if(sheetObj.GetRowBackColor(rowsAry[i]) != "#dce6f2" ){
			sheetObj.SetRowBackColor(rowsAry[i],"#fdeada");
		}
	}
	*/
	
	//var Row1 = sheetObj.FindText(0, "Sub", 0, 0, 0);
	//var Row2 = sheetObj.FindText(0, "Grand", 0, 0, 0);
	//alert(Row1 + '  /  '  + Row2);
	
	// #342  - [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - item 5 by Thoa Dien 20170921
    fncHiddenColumn('FCL');
    fncHiddenColumn('LCL');
    fncHiddenColumn('FAK');
    fncHiddenColumn('BULK');
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
            cal.select(formObj.s_prd_strdt,  formObj.s_prd_enddt, 'MM-dd-yyyy');
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
    var s_prd_strdt, s_prd_enddt="";           
    date=new Date(); 
    s_prd_strdt=new Date(date.getFullYear(),date.getMonth() - 1,1);    
    s_prd_enddt=new Date(date.getFullYear(),date.getMonth(),0);     
    formObj.s_prd_strdt.value=mkDateFormat1(s_prd_strdt);
    formObj.s_prd_enddt.value=mkDateFormat1(s_prd_enddt);
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
//Calendar flag value
var firCalFlag=false;
function get_IntervalOfPeriod(obj, optVal, ddAddVal) { //월요일 ~ 일요일 구하기
	var formObj=document.frm1;
	var intDayCnt1=0;
	var intDayCnt2=0;
	var year=obj.substring(0, 4);
    var month=obj.substring(4, 6);
    var day=obj.substring(6, 8);
    var week=new Array("일", "월", "화", "수", "목", "금", "토");
    var vn_day1=new Date(year, month - 1, eval(day) + eval(ddAddVal));
   // vn_day1 = new Date(vn_day1.getFullYear(), vn_day1.getMonth(), vn_day1.getDate()- 1 + eval(ddAddVal));
    var Cal_en="";
    if(optVal == 'week'){
	    var i=vn_day1.getDay(); //기준일의 요일을 구한다.( 0:일요일, 1:월요일, 2:화요일, 3:수요일, 4:목요일, 5:금요일, 6:토요일 )
	    if ((i >= 0) && (i < 6)) { //기준일이 일~금 일때
	        intDayCnt2=6 - i;
	    }
	    else if (i == 6) {  //기준일이 토요일일때
	        intDayCnt2=0;
	    }
	  //기준일의 주의 토요일의 날짜
	    Cal_en=new Date(vn_day1.getFullYear(), vn_day1.getMonth(), vn_day1.getDate() + intDayCnt2);
    }
    if(optVal == 'month'){
    	Cal_en=new Date(vn_day1.getFullYear(), vn_day1.getMonth() + 1, 0); 
    }
    //날짜표시형식 (예: 1 : 05-01-2008)
    intervalStDay=mkDateFormat1(vn_day1);
    intervalEnDay=mkDateFormat1(Cal_en);
    formObj.s_tmp_dt.value=intervalEnDay;
	if(getDaysBetweenFormat(formObj.s_tmp_dt, formObj.s_prd_enddt, "MM-dd-yyyy") < 1){
		intervalEnDay=formObj.s_prd_enddt.value;
	}
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
function mkCharDateMonthFormat(orgDate){
	//Month String Setting
	var strMonthArray=new HashMap();
	strMonthArray.put("01", "JANUARY");
	strMonthArray.put("02", "FEBRUARY");
	strMonthArray.put("03", "MARCH");
	strMonthArray.put("04", "APRIL");
	strMonthArray.put("05", "MAY");
	strMonthArray.put("06", "JUNE");
	strMonthArray.put("07", "JULY");
	strMonthArray.put("08", "AUGUST");
	strMonthArray.put("09", "SEPTEMBER");
	strMonthArray.put("10", "OCTOBER");
	strMonthArray.put("11", "NOVEMBER");
	strMonthArray.put("12", "DECEMBER");
	var tempDate="";
	var month="";
	var day="";
	var year="";
	var result="";
	if(orgDate!=""){
		tempDate=orgDate.replaceAll("-", "");
		month=tempDate.substring(0,2);
		day=tempDate.substring(2,4);
		year=tempDate.substring(4,8);
		//Clean On Board에서 사용하는 Format
		result=strMonthArray.get(month) + " (" + year + ")";
	}
	return result;
}
function setAirSeaClick(){
	var formObj=document.frm1;
	var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
	
	//OFVFOUR-7743 [Matrix] Adding new features on Volume and Profit Report
	if(formObj.s_air_sea_opt[0].checked || formObj.s_air_sea_opt[1].checked){
		formObj.s_grd_opt4.disabled = false;
	}else{
		formObj.s_grd_opt4.disabled = true;
		if ( formObj.s_grd_opt4.checked == true ){
			formObj.s_grd_opt1.checked = true;
		}
	}

	if(formObj.s_air_sea_opt[0].checked){ // Ocean
		formObj.s_ship_mode_fcl.checked=true;
		formObj.s_ship_mode_lcl.checked=true;
		formObj.s_ship_mode_fak.checked=true;
		formObj.s_ship_mode_blk.checked=true;
		formObj.s_ship_mode_fcl.disabled=false;
		formObj.s_ship_mode_lcl.disabled=false;
		formObj.s_ship_mode_fak.disabled=false;
		formObj.s_ship_mode_blk.disabled=false;
		formObj.s_ship_mode_fcl.readOnly=false;
		formObj.s_ship_mode_lcl.readOnly=false;
		formObj.s_ship_mode_fak.readOnly=false;
		formObj.s_ship_mode_blk.readOnly=false;
	}else{
		formObj.s_ship_mode_fcl.checked=false;
		formObj.s_ship_mode_lcl.checked=false;
		formObj.s_ship_mode_fak.checked=false;
		formObj.s_ship_mode_blk.checked=false;
		formObj.s_ship_mode_fcl.disabled=true;
		formObj.s_ship_mode_lcl.disabled=true;
		formObj.s_ship_mode_fak.disabled=true;
		formObj.s_ship_mode_blk.disabled=true;
		formObj.s_ship_mode_fcl.readOnly=true;
		formObj.s_ship_mode_lcl.readOnly=true;
		formObj.s_ship_mode_fak.readOnly=true;
		formObj.s_ship_mode_blk.readOnly=true;
	}
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked){ // Other, Warehouse
		formObj.s_exp_bound_flg.checked=false;
		formObj.s_imp_bound_flg.checked=false;
		formObj.s_exp_bound_flg.disabled=true;
		formObj.s_imp_bound_flg.disabled=true;
		formObj.s_exp_bound_flg.readOnly=true;
		formObj.s_imp_bound_flg.readOnly=true;
		
	    for(var i=0; i<s_rpt_tp_opt.length; i++){
	    	if(s_rpt_tp_opt[i].value == "2" || s_rpt_tp_opt[i].value == "7" 
	    		|| s_rpt_tp_opt[i].value == "13" || s_rpt_tp_opt[i].value == "14" 
	    		|| s_rpt_tp_opt[i].value == "15" || s_rpt_tp_opt[i].value == reportTypeObjs.CONTRIBUTION // OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	    		|| s_rpt_tp_opt[i].value == reportTypeObjs.TEAM_OPERATOR){	//Filing_No|Customer|Sales_Person|Operator|Contribution|Team/Operator
	    		//활성
	    		s_rpt_tp_opt[i].disabled=false;
	    		s_rpt_tp_opt[i].readOnly=false;
	    	}else{
	    		//비활성
	    		s_rpt_tp_opt[i].disabled=true;
	    		s_rpt_tp_opt[i].readOnly=true;
	    	}
	    }
	    if(!(s_rpt_tp_opt[1].checked || s_rpt_tp_opt[6].checked || s_rpt_tp_opt[12].checked
	    		|| s_rpt_tp_opt[13].checked || s_rpt_tp_opt[14].checked || s_rpt_tp_opt[15].checked)){	//Filing_No|Customer|Sales_Person|Operator|Contribution|Team/Operator
	    	s_rpt_tp_opt[1].checked=true;
	    	// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	    	s_rpt_tp_opt[1].click();
	    }
	    if(s_rpt_tp_opt[1].checked){
    		resetFilter("Filing No.");
	    }
	}else{
		formObj.s_exp_bound_flg.checked=true;
		formObj.s_imp_bound_flg.checked=true;
		formObj.s_exp_bound_flg.disabled=false;
		formObj.s_imp_bound_flg.disabled=false;
		formObj.s_exp_bound_flg.readOnly=false;
		formObj.s_imp_bound_flg.readOnly=false;
		for(var i=0; i<s_rpt_tp_opt.length; i++){
			s_rpt_tp_opt[i].disabled=false;
    		s_rpt_tp_opt[i].readOnly=false;
	    }
		if(s_rpt_tp_opt[1].checked){
    		resetFilter("Filing No.");
	    }
	}
	
	setOtptByOpt();
}
function resetFilter(vParam) {
	vReportType=vParam;
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	
	sheetObj1.RemoveAll();
	
	// Account_Group_ID 인경우 팝업 대신 text box 보여준다
	if (formObj.s_rpt_tp_opt[3].checked) {
		formObj.f_acc_group_id.style.display="block";
	} else {
		formObj.f_acc_group_id.style.display="none";
	}
	
	// Other 인경우 팝업 대신 Ref No 로 조회 불가
	//WMS ACCOUNT LKH 2015.01.20
	if (((formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked)) && formObj.s_rpt_tp_opt[1].checked) {	
		getObj("tbAddBtn").style.display="none";
	} else {
		getObj("tbAddBtn").style.display="block";
	}
	
	// Contribution
	if (formObj.s_rpt_tp_opt[14].checked){
		getObj("tbAddBtn").style.display="none";
	// Lane	#3376 [JTC] Japan Trust 용 Profit Report 개발
	}
	/* 2018.01.17 #3509 lane code added as filter by condition
	else if (formObj.s_rpt_tp_opt[16].checked){
		getObj("tbAddBtn").style.display="none";
	}
	*/
	else{
			if (((formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked)) && formObj.s_rpt_tp_opt[1].checked) {	
				getObj("tbAddBtn").style.display="none";
			} else {
				getObj("tbAddBtn").style.display="block";
			}
		}
	
	setOtptByOpt();
}

function setOtptByOpt() {
	var formObj=document.frm1;
	var s_otpt_by_opt=document.getElementsByName("s_otpt_by_opt");
	
	if(formObj.s_rpt_tp_opt[14].checked){ // Contribution
		for(var i=0; i<s_otpt_by_opt.length; i++){
			if (s_otpt_by_opt[i].value == "1" || s_otpt_by_opt[i].value == "2"){ // 1 : HB/L/HAWB No. 2: Filing No.
				s_otpt_by_opt[i].disabled=false;
				s_otpt_by_opt[i].readOnly=false;
			} else {
				s_otpt_by_opt[i].checked=false;
		    	s_otpt_by_opt[i].disabled=true;
	    		s_otpt_by_opt[i].readOnly=true;
			}
			// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
			fn_OutputBy(s_otpt_by_opt[i]);
	    }
	}else{
		if(formObj.s_air_sea_opt[2].checked || formObj.s_air_sea_opt[3].checked){ // Other, Warehouse
		    for(var i=0; i<s_otpt_by_opt.length; i++){
		    	if(s_otpt_by_opt[i].value == "0" || s_otpt_by_opt[i].value == "2" || s_otpt_by_opt[i].value == "7" 
		    		|| s_otpt_by_opt[i].value == "13" || s_otpt_by_opt[i].value == "14" || s_otpt_by_opt[i].value == "15" || s_otpt_by_opt[i].value == OutputByObjs.POST_DATE){	//Office|Filing_No|Customer|Sales_Person|Operator| POST DATE || [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report
		    		s_otpt_by_opt[i].disabled=false;
		    		s_otpt_by_opt[i].readOnly=false;
		    	}else{
		    		s_otpt_by_opt[i].checked=false;
		    		s_otpt_by_opt[i].disabled=true;
		    		s_otpt_by_opt[i].readOnly=true;
		    	}
		    	// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
		    	fn_OutputBy(s_otpt_by_opt[i]);
		    }
		}else{
		    for(var i=0; i<s_otpt_by_opt.length; i++){
		    	s_otpt_by_opt[i].disabled=false;
	    		s_otpt_by_opt[i].readOnly=false;
	    		// OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	    		fn_OutputBy(s_otpt_by_opt[i]);
		    }
		}
	}
}

function getReportSql() {
	var formObj=document.frm1;
	var vRType='';
	var v_report_sql='';
	var sheetObj1=docObjects[1];
	for (var i=0; i<formObj.s_rpt_tp_opt.length;i++) {
   		if (formObj.s_rpt_tp_opt[i].checked) {
   			vRType=formObj.s_rpt_tp_opt[i].value;
   		}
   	}
	if (sheetObj1.LastRow() + 1 > 1) {
		if (vRType == '1') { // Hbl/Hawb no.
			v_report_sql=" and vbl.intg_bl_seq in (" + getSqlInValue() + ") ";
		} else if (vRType == '2') { // Filing No.
			v_report_sql=" and vbl.mbl_intg_bl_seq in (" + getSqlInValue() + ") ";
		} else if (vRType == '3') { // Agent
			v_report_sql=" and vbl.agent_cd in  (" + getSqlInValue() + ") ";
		} else if (vRType == '4') { // Account Group ID
			v_report_sql=" and vbl.acc_grp_id in  (" + getSqlInValue() + ") ";
		} else if (vRType == '5') { // Shipper
			v_report_sql=" and vbl.shpr_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '6') { // Consignee
			v_report_sql=" and vbl.cnee_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '7') { // Customer
			v_report_sql=" and vbl.cust_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '8') { // POL
			v_report_sql=" and vbl.pol_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '9') { // POD
			v_report_sql=" and vbl.pod_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '10') { // DEL
			v_report_sql=" and vbl.del_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '11') { // Final Destination
			v_report_sql=" and fnl_dest_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '12') { // Carrier
			v_report_sql=" and vbl.carr_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '13') { // Lane (삭제)
			v_report_sql=" and vbl.lane_cd in (" + getSqlInValue() + ") ";
		} else if (vRType == '14') { // Sales Person
			v_report_sql=" and vbl.sls_usr_nm in (" + getSqlInValue() + ") ";
		} else if (vRType == '15') { // Operator
			v_report_sql=" and vbl.opr_usr_nm in (" + getSqlInValue() + ") ";
		} else if (vRType == reportTypeObjs.TEAM_OPERATOR) { // Team/Operator | OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
			v_report_sql=" and vbl.opr_usr_nm in (" + getSqlInValue() + ") ";
		}
	}
	formObj.report_sql.value=v_report_sql;
}
function getSqlInValue() {
	var sheetObj1=docObjects[1];
	var retVal='';
	for (var i=1; i<sheetObj1.LastRow() + 1; i++) {
		retVal += "'"+sheetObj1.GetCellValue(i, "code_val")+"'";
		if (sheetObj1.LastRow()!= i) {
			retVal += ", "
		}
	}
	return retVal;
}
function sheet3_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "check_val" :
			sheetObj.RowDelete(Row, false);
			break;
	}
}

function sheet2_OnClick(sheetObj, row, col){
}

//#2396 [BINEX] Volume and Profit Report: +/-를 기능 점검
function fn_setSizeParam(iHeght){
	MGT0160_HEIGHT = iHeght;
}

/*
 * #342 - [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS
 * 5. If FAK or BULK column is not selected in Search Option - Do not show columns (FAK, BULK) in the Search List.
 * By Thoa.Dien - 170913
 */
function fncHiddenColumn(type){
	var frmObj = document.frm1;
	var fcl = "fcl_free;fcl_nomi;fcl_col;fcl_etc;fcl_sum;fcl_cntr;" 
	var lcl = "lcl_free;lcl_nomi;lcl_col;lcl_etc;lcl_sum;lcl_cntr;" 
	var fak = "fak_free;fak_nomi;fak_col;fak_etc;fak_sum;fak_cntr;";
	var blk = "blk_free;blk_nomi;blk_col;blk_etc;blk_sum;blk_cntr;";

	switch(type) {
	   case "FCL":
		   fncSetVisibleCols(fcl, 's_ship_mode_fcl'); 
	   break;
	   case "LCL":
		   fncSetVisibleCols(lcl, 's_ship_mode_lcl');  
	   break;
	   case "FAK":
		   fncSetVisibleCols(fak, 's_ship_mode_fak');  
	   break;
	   case "BULK":
		   fncSetVisibleCols(blk, 's_ship_mode_blk');           			
	   break; 
}
function fncSetVisibleCols(strCol, ObjName){ 
	var modes = 0; // 0: show - 1: hide
	if(!getObj(ObjName).checked){
		modes = 1;
	} 	
	var colList = strCol.split(";");   
	for(var i = 0; i < colList.length; i++){
		   sheet2.SetColHidden(colList[i], modes);
	   }
	}  
}

function fn_rptOt(obj){
	var formObj=document.frm1;
	var sheetObj=docObjects[3];
	
	
	if(obj.value == reportTypeObjs.CONTRIBUTION){//Contribution | OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
		sheetObj.RemoveAll();
	}
	
	var intRows=sheetObj.LastRow() + 1;
	if(intRows == 1){
		sheetObj.DataInsert(intRows);
		sheetObj.SetCellValue(intRows, "col_nm",obj.nextSibling.innerHTML);
		sheetObj.SetCellValue(intRows, "col_val",obj.value);
		sheetObj.SetCellValue(intRows, "type_val","R");
	}else{
		sheetObj.SetCellValue(1, "col_nm",obj.nextSibling.innerHTML);
		sheetObj.SetCellValue(1, "col_val",obj.value);
		sheetObj.SetCellValue(1, "type_val","R");
	}
		
	//alert(obj.id);
	//alert(formObj.s_rpt_tp_opt1.value);
	//alert(obj.value);
}


function fn_OutputBy(obj){
	var formObj=document.frm1;
	var sheetObj=docObjects[3];	
	
	if(obj.checked){
	    // OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	    var dRow = sheetObj.FindText("col_nm", obj.nextSibling.innerHTML, 2, -1);
	    if (dRow == -1) {
	        var intRows=sheetObj.LastRow() + 1;
	        if(intRows > 1){
	            sheetObj.DataInsert(intRows);
	            sheetObj.SetCellValue(intRows, "col_nm",obj.nextSibling.innerHTML);
	            sheetObj.SetCellValue(intRows, "col_val",obj.value);
	            sheetObj.SetCellValue(intRows, "type_val","O");
	        }
	    }
	}else{
	    // OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !"
	    var dRow = sheetObj.FindText("col_nm", obj.nextSibling.innerHTML, 2, -1);
	    do {
	        sheetObj.RowDelete(dRow);
	        dRow = sheetObj.FindText("col_nm", obj.nextSibling.innerHTML, 2, -1);
	    }
	    while (dRow != -1);
	}
}

function sheet4_OnChange(sheetObj, Row, Col) {
	var colId = sheetObj.ColSaveName(Col);
	
	if(colId == "chk_val"){ //0
		if(sheetObj.GetCellValue(Row, Col) == 1){
			for(var i=sheetObj.HeaderRows(); i < Row; i++) {
				sheetObj.SetCellValue(i, "chk_val","1",0);
			}
		}else{
			for(var i=Row; i <= sheetObj.LastRow(); i++) {
				sheetObj.SetCellValue(i, "chk_val","0",0);
			}			
		}
		
	}
}

// #3509 [JPT] Container Type/Size 조회 조건 변경 (Option Key = PROFIT_CNTR_TYPE_CHG)
function setCntrTypeHdr(code, sheetObj){
	if(code == "N"){
		sheetObj.SetColHidden("cntr_d2", 1);
		sheetObj.SetColHidden("cntr_d4", 1);
		sheetObj.SetColHidden("cntr_r2", 1);
		sheetObj.SetColHidden("cntr_r4", 1);
		sheetObj.SetColHidden("cntr_fo2", 1);
		sheetObj.SetColHidden("cntr_fo4", 1);
	}else if(code == "Y"){
		sheetObj.SetColHidden("cntr_20", 1);
		sheetObj.SetColHidden("cntr_40", 1);
		sheetObj.SetColHidden("cntr_hq", 1);
		sheetObj.SetColHidden("cntr_45", 1);
		sheetObj.SetColHidden("cntr_rf", 1);
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
