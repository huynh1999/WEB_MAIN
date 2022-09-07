/*=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : SEE_BKG_0010.js
 *@FileTitle  : Consolidation List
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2017/03/14
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag = false;

var cntrList01Sheet=false;
var cntrList02Sheet=false;

//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError=false;
    var sheetParam='';
    
	var cntrList02Param=docObjects[2].GetSaveString(false);
	if(cntrList02Param!=''){		
    	sheetParam+= '&';
    	sheetParam+= cntrList02Param;
    	cntrList02Sheet=true;		
	}	
	
	//alert('sheetParam : '+sheetParam);
	return sheetParam;
}

function doWork(srcName, valObj) {
	if (!btnGetVisible(srcName)) {
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var formObj = document.frm1;	
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	var sheetObj3 = docObjects[2];
	var sheetObj4 = docObjects[3];
	try {
		switch (srcName) {	
		case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        submitForm(-1);
	        break;
		case "SEARCH":
			if(formObj.plan_no.value == ""){
				//Please enter more than one Search Condition!
				alert(getLabel('FMS_COM_ALT014'));
				return;
			}
			formObj.f_cmd.value=SEARCH;	       				
	        submitForm(SEARCH);
	        /*doWork("SEARCHLIST");
	        doWork("CNTRLIST");
	        doWork("SEARCHLIST02");
	        if( $("#i_cntr_02").val() != "" ){
	        	doWork("SEARCHLIST03");
	        }
	        doWork("SEARCHLIST04");*/
	        break;
		case "CNTRLIST":				
			//<!-- #2735 Acrowell incident---unknown reason "system error" popup -->
			ajaxSendPost(setCntrListCombo, 'reqVal', '&goWhere=aj&bcKey=getCntrList&f_bkg_seq='+formObj.f_bkg_seq.value+'&f_plan_no='+formObj.plan_no.value, './GateServlet.gsl');
			break;
		case "SEARCHLIST":	
			/*if(formObj.etd_search_flg.checked){
				formObj.etd_search_flg.value = "Y";
			} else {
				formObj.etd_search_flg.value = "N";
			}
			
			if(formObj.eta_search_flg.checked){
				formObj.eta_search_flg.value = "Y";
			} else {
				formObj.eta_search_flg.value = "N";
			}*/
     	   if(frm1.f_lnr_bkg_no.value == ''){
    		   alert(getLabel('FMS_COM_ALT014'));
    		   frm1.f_lnr_bkg_no.focus();
    		   return;
    		}
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj1.DoSearch("./SEE_BKG_0010GS.clt", FormQueryString(formObj) );
			break;
		
		case "LNRBKNO_POPLIST":			
			rtnary=new Array(1);
     		rtnary[0] = '';
   			rtnary[1] = '';
   			callBackFunc = "LNRBKNO_POPLIST";
			modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
			break;
			
		case "CONSOL_POPLIST":			
			rtnary=new Array(1);
     		rtnary[0] = formObj.plan_no.value;
   			rtnary[1] = '';
   			callBackFunc = "CONSOL_POPLIST";
			modal_center_open('./CMM_POP_0440.clt', rtnary, 815,480,"yes");
			break;
		
		case "SEARCH01":
			if( formObj.f_lnr_bkg_no.value == "" ){
				alert(getLabel('FMS_COM_ALT037'));
				return;
			}
			formObj.f_cmd.value=SEARCH;	     
			formObj.f_bkg_no.value = formObj.f_lnr_bkg_no.value;
			submitForm(SEARCH);
	        /*doWork("SEARCHLIST");	                	
	        doWork("CNTRLIST");*/	 	        
	        break;
	       
		case "SEARCHLIST02":  	
			formObj.f_cmd.value=SEARCHLIST02;
			sheetObj2.DoSearch("./SEE_BKG_0010_1GS.clt", FormQueryString(formObj) );
	        break;
	        
		case "SEARCHLIST03":        
			formObj.f_cmd.value=SEARCHLIST02;			
			sheetObj3.DoSearch("./SEE_BKG_0010_2GS.clt", FormQueryString(formObj) );
	        break;
	    
		case "SEARCHLIST04":        
			formObj.f_cmd.value=SEARCHLIST02;			
			sheetObj4.DoSearch("./SEE_BKG_0010_3GS.clt", FormQueryString(formObj) );
	        break;
	        
		case "SAVE":
			formObj.f_cmd.value=ADD;
			
			if(formObj.f_plan_no.value == "AUTO") formObj.f_plan_no.value = "";
			
			if (confirm(getLabel('FMS_COM_CFMCON'))) {
				sheetObj4.DoSave("./SEE_BKG_0010_3GS.clt", FormQueryString(formObj), "ins_ibflag", false);
            }
			break;		
			
		case "CONFIRM":
			if (confirm(getLabel('FMS_COM_CFMCON'))) {
				ajaxSendPost(setBkgInfo, 'reqVal', '&goWhere=aj&bcKey=updateConsolStatus&plan_no='+formObj.f_plan_no.value+'&bkg_seq='+formObj.f_bkg_seq.value, './GateServlet.gsl');		
			}
			break;
			
		case "NEW":
			clearScreen();
			break;
			
		case "CREATE":
			formObj.f_cmd.value=COMMAND01;
			if(formObj.f_status_cd.value == "BL"){
				alert(getLabel('FMS_COM_ALT012'));
				return false;
			}			
			var sndParam=getSndParam();
			if (confirm(getLabel('FMS_COM_CFMCON'))) {
				sheetObj4.DoSave("./SEE_BKG_0010_3GS.clt", FormQueryString(formObj), "ins_ibflag", false);
            }
			break;		
			
		case "PRINT":
			var reqParam='?f_plan_no='+formObj.f_plan_no.value+'&f_bkg_seq='+formObj.f_bkg_seq.value;
			popGET('CMM_POP_0460.clt'+reqParam, '', 500, 350, "scroll:yes;status:no;help:no;");
			break;
			
		} // end switch
		
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}

/**
 * 화면초기화
 */
function clearScreen(){
	doShowProcess();
    frm1.f_cmd.value='';
    frm1.f_plan_no.value='';
    frm1.plan_no.value='';
    frm1.submit();    
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_BKG_0010AJ.clt",
		   dataType: 'xml',
		   data: { f_cmd: cmd,  plan_no: formObj.plan_no.value, f_bkg_no: formObj.f_bkg_no.value},
		   success: function(data){			
			   setFieldValue( formObj.f_mbl_no, 		$('mbl_no',data).text());
			   setFieldValue( formObj.f_filling_no, 	$('filling_no',data).text());
			   
			   if($('plan_no',data).text() != ""){
				   setFieldValue( formObj.f_plan_no, 		$('plan_no',data).text());
			   }
			   
			   setFieldValue( formObj.plan_no, 			$('plan_no',data).text());
			   //setFieldValue( formObj.f_status, 		$('status',data).text());
			   setFieldValue( formObj.f_lnr_bkg_no, 	$('bkg_no',data).text());
			   setFieldValue( formObj.f_bkg_no, 	$('bkg_no',data).text());
			   setFieldValue( formObj.f_bkg_seq, 		$('bkg_seq',data).text());
			   setFieldValue( formObj.f_trnk_vsl_nm,	$('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.f_trnk_voy, 		$('trnk_voy',data).text());
			   setFieldValue( formObj.f_cntr_sum, 		$('cntr_sum',data).text());
			   setFieldValue( formObj.f_pol_cd, 		$('pol_cd',data).text());
			   setFieldValue( formObj.f_pol_nm, 		$('pol_nm',data).text());
			   setFieldValue( formObj.f_etd_dt_tm, 		$('etd_dt_tm',data).text());
			   setFieldValue( formObj.f_pod_cd, 		$('pod_cd',data).text());
			   setFieldValue( formObj.f_pod_nm, 		$('pod_nm',data).text());
			   setFieldValue( formObj.f_eta_dt_tm, 		$('eta_dt_tm',data).text());
			   setFieldValue( formObj.lnr_bkg_no, 		$('lnr_bkg_no',data).text());
			   setFieldValue( formObj.f_sls_ofc_cd, 	$('sls_ofc_cd',data).text());
			   setFieldValue( formObj.f_sls_usr_id, 	$('sls_usr_id',data).text());
			   setFieldValue( formObj.f_status_cd, 		$('clp_sts_cd',data).text());
			   //#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 검색 조건 추가
			   setFieldValue( formObj.f_del_cd, 		$('del_cd',data).text());
			   setFieldValue( formObj.f_del_nm, 		$('del_nm',data).text());
			   
			   //doBtnAuthority(attr_extension);
			   //loadPage();
			   //setSelect();
			   setButton();
			   doHideProcess();
			   
			   if(formObj.f_plan_no.value != "" && formObj.f_plan_no.value != "AUTO"){
				   doWork("SEARCHLIST");
			       doWork("CNTRLIST");
			       doWork("SEARCHLIST02");
			       if( $("#i_cntr_02").val() != "" ){
			    	   doWork("SEARCHLIST03");
			       }
			       doWork("SEARCHLIST04");
			   } else {
				   doWork("SEARCHLIST");	                	
				   doWork("CNTRLIST");	
			   }
		   },
		   error: function(err){
			   doHideProcess();
			   alert(getLabel('FMS_COM_ALT010'));
		   }
		 });
}

function setButton(){
	
	var formObj = document.frm1;
	/*
	if(formObj.f_plan_no.value != ""){
		getBtnObj('btnSearch').style.display="none";
	}
	*/
	if(formObj.f_status_cd.value == "CR"){
		getBtnObj('btnSave').style.display="inline";	
		getBtnObj('btnConfirm').style.display="inline";
		getBtnObj('btnCreate').style.display="inline";	
		getBtnObj('btnPrint').style.display="inline";	
	}else if(formObj.f_status_cd.value == "CF"){
		getBtnObj('btnSave').style.display="none";	
		getBtnObj('btnConfirm').style.display="none";	
		getBtnObj('btnCreate').style.display="inline";	
		getBtnObj('btnPrint').style.display="inline";	
	}else if(formObj.f_status_cd.value == "BL"){
		getBtnObj('btnSave').style.display="none";	
		getBtnObj('btnConfirm').style.display="none";	
		getBtnObj('btnCreate').style.display="none";	
		getBtnObj('btnPrint').style.display="inline";	
	}else{
		getBtnObj('btnSave').style.display="inline";	
		getBtnObj('btnConfirm').style.display="none";	
		getBtnObj('btnCreate').style.display="none";
		getBtnObj('btnPrint').style.display="none";
	}
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
	doWork('SEARCHLIST');
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {	
	var formObj = document.frm1;		
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	
	/* #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직 */
	/*[#4650] [JH]Booking No and MBL Filing No are same (by Duc.Nguyen)*/
	/*var opt_key = "BKG_NEW_HBL_NO_FLG";
	ajaxSendPost(setBkgNoFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");*/
	
	if(formObj.p_plan_no.value != ""){
		formObj.plan_no.value = formObj.p_plan_no.value;
		formObj.f_bkg_seq.value = formObj.p_bkg_seq.value;
		formObj.f_bkg_no.value = formObj.p_bkg_no.value;
		
		doWork('SEARCH');
	} else {
		formObj.f_plan_no.value = "AUTO";
	}
}

/* #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직 */
function setBkgNoFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		formObj.f_bkg_new_hbl_no_flg.value = doc[1];
	}else{
		formObj.f_bkg_new_hbl_no_flg.value = "N";
	}
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
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
	case 1: // IBSheet1 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BKG_0010_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);        
        var org_prefix = "org_";
        //#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
        var cols = [ 
                     {Type:"CheckBox",  Hidden:0, 	TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:org_prefix+"del_chk",   KeyField:0,   CalcLogic:"",   Format:"",      PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                     {Type:"Text",      Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:org_prefix+"booking_no",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:org_prefix+"bkg_seq",   		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:40,	Align:"Center", ColMerge:0,   SaveName:org_prefix+"booking_type",  	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:70,	Align:"Center", ColMerge:0,   SaveName:org_prefix+"bkg_sts_nm",  	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"cgo_kgs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:org_prefix+"cgo_cbm_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:org_prefix+"shipper_nm",		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:org_prefix+"consignee_nm",  	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:org_prefix+"partner_nm",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:org_prefix+"pol_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:org_prefix+"pod_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,   	Align:"Center", ColMerge:0,   SaveName:org_prefix+"etd_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"Ymd",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,  	Align:"Center", ColMerge:0,   SaveName:org_prefix+"eta_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:org_prefix+"del_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"cgo_pgk_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"cgo_pck_ut_cd", 	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"cgo_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:org_prefix+"cgo_cft_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"bfr_pgk_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"bfr_kgs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"bfr_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:org_prefix+"bfr_cbm_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:org_prefix+"bfr_cft_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"new_cntr_seq",  	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:org_prefix+"cntr_instr_txt",	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
        InitColumns(cols);
        SetEditable(1);        
        SetSheetWidth(630);
        SetSheetHeight(650);
		}
		break;
	case 2: // IBSheet2 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BKG_0010_HDR2'), Align:"Center"} ];
        InitHeaders(headers, info);
        //#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
        var cols = [ 
                     {Type:"CheckBox",  Hidden:0, 	TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",   KeyField:0,   CalcLogic:"",   Format:"",      PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                     {Type:"Text",      Hidden:1,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:"cntr_seq",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:"booking_no",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:"bkg_seq",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:40,	Align:"Center", ColMerge:0,   SaveName:"booking_type",  KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:70,	Align:"Center", ColMerge:0,   SaveName:"bkg_sts_nm",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"cgo_kgs_wgt",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:"cgo_cbm_qty",   KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:"shipper_nm",	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:"consignee_nm",  KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:"partner_nm",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:"pol_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:"pod_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,   	Align:"Center", ColMerge:0,   SaveName:"etd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,  	Align:"Center", ColMerge:0,   SaveName:"eta_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:"del_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"cgo_pgk_qty",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:1,   InsertEdit:0 },                     
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"cgo_pck_ut_cd", KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"cgo_lbs_wgt",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:"cgo_cft_qty",   KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"bfr_pgk_qty",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"bfr_kgs_wgt",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"bfr_lbs_wgt",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"bfr_cbm_qty",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"bfr_cft_qty",   KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"new_cntr_seq",  KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:"cntr_instr_txt",KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
        InitColumns(cols);
        SetEditable(1);        
        SetSheetWidth(630);
        SetSheetHeight(220);                
		}
		break;
	case 3: // IBSheet3 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BKG_0010_HDR2'), Align:"Center"} ];
        InitHeaders(headers, info);
        var prefix = "snd_";
        //#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
        var cols = [ 
                     {Type:"CheckBox",  Hidden:0, 	TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",   KeyField:0,   CalcLogic:"",   Format:"",      PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                     {Type:"Text",      Hidden:1,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"cntr_seq",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"booking_no",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"bkg_seq",   		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:40,	Align:"Center", ColMerge:0,   SaveName:prefix+"booking_type",	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:70,    Align:"Center", ColMerge:0,   SaveName:prefix+"bkg_sts_nm",		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_kgs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:prefix+"cgo_cbm_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"shipper_nm",		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"consignee_nm",  	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"partner_nm",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"pol_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"pod_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,   	Align:"Center", ColMerge:0,   SaveName:prefix+"etd_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"Ymd",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,  	Align:"Center", ColMerge:0,   SaveName:prefix+"eta_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"del_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_pgk_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:1,   InsertEdit:0 },                     
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_pck_ut_cd", 	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:prefix+"cgo_cft_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_pgk_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_kgs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_cbm_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_cft_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"new_cntr_seq",  	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cntr_instr_txt",	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
        InitColumns(cols);
        SetEditable(1);        
        SetSheetWidth(630);
        SetSheetHeight(220);        
		}
		break;
		
	case 4: // IBSheet3 init
		with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('SEE_BKG_0010_HDR3'), Align:"Center"} ];
        InitHeaders(headers, info);
        var prefix = "ins_";
        //#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
        var cols = [ 
                     {Type:"CheckBox",  Hidden:0, 	TrueValue:"Y", FalseValue:"N"  , Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk",   KeyField:0,   CalcLogic:"",   Format:"",      PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                     {Type:"Status",    Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"ibflag",    		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                     {Type:"Text",      Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"cntr_seq",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"booking_no",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:90,   	Align:"Center", ColMerge:0,   SaveName:prefix+"bkg_seq",   		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:40,	Align:"Center", ColMerge:0,   SaveName:prefix+"booking_type",	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Center", ColMerge:0,   SaveName:prefix+"bkg_sts_nm",		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_kgs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:prefix+"cgo_cbm_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:70,    Align:"Left", 	ColMerge:0,   SaveName:prefix+"shipper_nm",		KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"consignee_nm",  	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"partner_nm",    	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"pol_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"pod_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,   	Align:"Center", ColMerge:0,   SaveName:prefix+"etd_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"Ymd",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Date",      Hidden:0,  Width:70,  	Align:"Center", ColMerge:0,   SaveName:prefix+"eta_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"Ymd", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:100,   Align:"Left", 	ColMerge:0,   SaveName:prefix+"del_nm",       	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_pgk_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },                     
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_pck_ut_cd", 	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cgo_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right",  ColMerge:0,   SaveName:prefix+"cgo_cft_qty",   	KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_pgk_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_kgs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_lbs_wgt",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_cbm_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:1,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"bfr_cft_qty",   	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"new_cntr_seq",  	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cntr_instr_txt", KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"plan_no", 		KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"cntr_ref_no", 	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"ref_no", 		KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0,  Width:80,  	Align:"Right", 	ColMerge:0,   SaveName:prefix+"clp_sts_cd", 	KeyField:0,   CalcLogic:"",   Format:"", 	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                   ];
        InitColumns(cols);
        SetEditable(1);        
        SetSheetWidth(600);
        SetSheetHeight(350);  
        SetVisible(false);
		}
		break;
		
	}	
}

function LNRBKNO_POPLIST(rtnVal){	
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		if(rtnValAry[67] == "RJ" || rtnValAry[67] == "BL"){
			alert(getLabel('FMS_COM_ALT007') + " \n - Booking Status");	
			return;
		}
		formObj.f_lnr_bkg_no.value = rtnValAry[1];//lnr_bkg_no
		formObj.f_bkg_no.value = rtnValAry[1];//bkg_no
		formObj.f_bkg_seq.value = rtnValAry[2];//bkg_seq
		
		if(formObj.f_lnr_bkg_no.value !=""){
			doWork('SEARCH01');
        }
	}
}

function CONSOL_POPLIST(rtnVal){	
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.plan_no.value = rtnValAry[0];//lnr_bkg_no
		formObj.f_plan_no.value = rtnValAry[0];//lnr_bkg_no
		formObj.f_bkg_no.value = rtnValAry[1];//bkg_no
		formObj.f_bkg_seq.value = rtnValAry[2];//bkg_seq
		
		if(formObj.plan_no.value !=""){
			doWork('SEARCH');
        }
        
	}
}

function setBkgInfo(reqVal){
	doHideProcess();
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		//formObj.f_status.value = "CONFIRMED";
		formObj.f_status_cd.value = "CF";
		
		setButton();
		
		showCompleteProcess();
	}
		
}

// Container Combo
function setCntrListCombo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
						
			for( var i=1; i < arrLen ; i++ ){
				var masterVals=rtnArr[i-1].split(',');					
				var cntr_seq ;
				if(i<10){
					cntr_seq = '[0'+i+']'+masterVals[1];
				}else{
					cntr_seq = '['+i+']'+masterVals[1];
				}				
				formObj.i_cntr_01.options[i]=new Option(cntr_seq,masterVals[0]);
			}
			if(arrLen>0){
				formObj.i_cntr_01.options[1].selected = "true";
				formObj.org_cntr_01.value = formObj.i_cntr_01.selectedIndex;
			}			
						
			for( var i=1; i < arrLen ; i++ ){
				var masterVals=rtnArr[i-1].split(',');	
				var cntr_seq ;
				if(i<10){
					cntr_seq = '[0'+i+']'+masterVals[1];
				}else{
					cntr_seq = '['+i+']'+masterVals[1];
				}				
				formObj.i_cntr_02.options[i]=new Option(cntr_seq,masterVals[0]);
			}
			
			if(arrLen>2){
				formObj.i_cntr_02.options[2].selected = "true";
				formObj.org_cntr_02.value = formObj.i_cntr_02.selectedIndex;
			}	
			
			if(formObj.i_cntr_01.value != ""){
				ajaxSendPost(resultCtrt01Info, 'reqVal', '&goWhere=aj&bcKey=getConsolCntrInfo&cntr_seq='+formObj.i_cntr_01.value, './GateServlet.gsl');
			}
			
			if(formObj.i_cntr_02.value != ""){
				ajaxSendPost(resultCtrt02Info, 'reqVal', '&goWhere=aj&bcKey=getConsolCntrInfo&cntr_seq='+formObj.i_cntr_02.value, './GateServlet.gsl');
			}
			
		} else {
			
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

//Container Change
function getCntr01Info(obj){	
	var formObj = document.frm1;
	var sheet = docObjects[1];
	
	if(obj.value == ""){
		formObj.cntr_no_01.value="";
		formObj.cntr_ref_no_01.value=""; 
		formObj.f_cntr_instr_txt_01.value=""; 
	} else {
		
		if(obj.value == formObj.i_cntr_02.value){
			alert(getLabel('FMS_COM_ALT008'));		
			//formObj.i_cntr_01.options[formObj.org_cntr_01.value].selected = "true";
			formObj.i_cntr_01.value="";
			formObj.cntr_no_01.value="";
			formObj.cntr_ref_no_01.value=""; 
			formObj.f_cntr_instr_txt_01.value=""; 
			return;
		}
		
		ajaxSendPost(resultCtrt01Info, 'reqVal', '&goWhere=aj&bcKey=getConsolCntrInfo&cntr_seq='+obj.value, './GateServlet.gsl');
	}
		
	setCntrFilter(sheet, "", formObj.i_cntr_01.value);
	formObj.org_cntr_01.value = formObj.i_cntr_01.selectedIndex;
	cntrCalc(sheet2, "", formObj.i_cntr_01.value);	
}

//Container Change
function getCntr02Info(obj){	
	var formObj = document.frm1;
	var sheet = docObjects[2];
	
	if(obj.value == ""){
		formObj.cntr_no_02.value="";
		formObj.cntr_ref_no_02.value=""; 
		formObj.f_cntr_instr_txt_02.value=""; 
	} else {
		
		if(obj.value == formObj.i_cntr_01.value){
			alert(getLabel('FMS_COM_ALT008'));	
			//formObj.i_cntr_02.options[formObj.org_cntr_02.value].selected = "true";
			formObj.i_cntr_02.value="";
			formObj.cntr_no_02.value="";
			formObj.cntr_ref_no_02.value=""; 
			formObj.f_cntr_instr_txt_02.value=""; 
			return;
		}
		
		ajaxSendPost(resultCtrt02Info, 'reqVal', '&goWhere=aj&bcKey=getConsolCntrInfo&cntr_seq='+obj.value, './GateServlet.gsl');
	}
	
	setCntrFilter(sheet, "snd_", formObj.i_cntr_02.value);
	formObj.org_cntr_02.value = formObj.i_cntr_02.selectedIndex;
	cntrCalc(sheet3, "snd_", formObj.i_cntr_02.value);
}

function resultCtrt01Info(reqVal) {	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	formObj.cntr_no_01.value="";
	formObj.cntr_ref_no_01.value=""; 
	formObj.f_cntr_instr_txt_01.value=""; 
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(',');
			if(rtnArr[0] == "" || rtnArr[0] == null){
				formObj.cntr_no_01.value="";
				formObj.cntr_ref_no_01.value=""; 
				formObj.f_cntr_instr_txt_01.value="";
			}else{
				formObj.cntr_no_01.value=rtnArr[0];
				formObj.cntr_ref_no_01.value=rtnArr[1];
				formObj.f_cntr_instr_txt_01.value=rtnArr[2];
			}
		}else{
			formObj.cntr_no_01.value="";
			formObj.cntr_ref_no_01.value=""; 
			formObj.f_cntr_instr_txt_01.value="";
		}
	}else{
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	}	
	
}


function resultCtrt02Info(reqVal) {	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	formObj.cntr_no_02.value="";
	formObj.cntr_ref_no_02.value=""; 
	formObj.f_cntr_instr_txt_02.value=""; 
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(',');
			if(rtnArr[0] == "" || rtnArr[0] == null){
				formObj.cntr_no_02.value="";
				formObj.cntr_ref_no_02.value=""; 
				formObj.f_cntr_instr_txt_02.value="";
			}else{
				formObj.cntr_no_02.value=rtnArr[0];
				formObj.cntr_ref_no_02.value=rtnArr[1];
				formObj.f_cntr_instr_txt_02.value=rtnArr[2];
			}
		}else{
			formObj.cntr_no_02.value="";
			formObj.cntr_ref_no_02.value=""; 
			formObj.f_cntr_instr_txt_02.value="";
		}
	}else{
	  //ComShowMessage(getLabel('SEE_BMD_MSG43'));
	}	
	
}



//Grid Data Move
function moveList(moveName){
	var formObj = document.frm1;
	try {
		switch (moveName) {	
		case "MOVE1":			
			//컨테이너 없으면 추가 안됨
			if($("#i_cntr_01").val() == null){
				alert(getLabel('FMS_COM_ALT100'));	
				return;
			}
			if($("#i_cntr_01").val() == ""){
				alert(getLabel('FMS_COM_ALT046'));	
				return;
			}
			moveData('0', '1', moveName);
	        break;
	        
		case "MOVE2":
			//저장한 이후에는 삭제 안됨			
			if(formObj.f_status_cd.value != ""){
				alert(getLabel('FMS_COM_ALT011'));	
				return;
			}		
			moveData('1', '0', moveName);
	        break;
	        
		case "MOVE3":
			//컨테이너 없으면 추가 안됨
			if($("#i_cntr_02").val() == null){
				alert(getLabel('FMS_COM_ALT100'));	
				return;
			}
			if($("#i_cntr_02").val() == ""){
				alert(getLabel('FMS_COM_ALT046'));	
				return;
			}
			moveData('0', '2', moveName);
	        break;
	        
		case "MOVE4":
			//저장한 이후에는 삭제 안됨			
			if(formObj.f_status_cd.value != ""){
				alert(getLabel('FMS_COM_ALT011'));	
				return;
			}			
			moveData('2', '0', moveName);
	        break;
	        
		case "MOVE5":			
			moveData('2', '1', moveName);
	        break;    
		
		case "MOVE6":			
			moveData('1', '2', moveName);
	        break;
	        
		case "MOVE7":
			moveData('1', '1', moveName);			
	        break;
	        
		case "MOVE8":
			moveData('1', '1', moveName);			
	        break;
	        
		case "MOVE9":
			moveData('2', '2', moveName);			
	        break;
	        
		case "MOVE10":
			moveData('2', '2', moveName);			
	        break;  
	        
		case "MOVE11":		
			moveData('1', '2', moveName);			
	        break;  
	        
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}

function moveData(from, to, moveName){
	var formObj = document.frm1;
	var fromSheet = docObjects[from];
	var toSheet = docObjects[to];
	var hiddenSheet = docObjects[3];
	
	if(from == to){
		var fromRow = 0 ;
		var toRow = 0 ;
				
		fromRow = fromSheet.GetSelectRow();		
		if(moveName == "MOVE7" || moveName == "MOVE9"){
			toRow = fromRow - 1;
			fromSheet.DataMove(toRow, fromRow);		
		}else{
			toRow = fromRow + 1;
			fromSheet.DataMove(fromRow, toRow);		
		}		
		
	}else{
				
		var arr = new Array();
		var k=0;
		
		var checkedRow = "";
		var chkArr = new Array();
		
		if(moveName == "MOVE11"){
			
			checkedRow = fromSheet.FindCheckedRow("del_chk");
			chkArr = checkedRow.split("|");
			
			for(var i=1; i<=fromSheet.LastRow(); i++){	
				for(var j=0; j<chkArr.length; j++){
					if(i == chkArr[j]){
						arr[k] = i;
						k++;
					}
				}								
			}	
			
		}else{
			if(moveName == "MOVE1" || moveName == "MOVE3"){
				del_chk = "org_del_chk";
			}else if(moveName == "MOVE2" || moveName == "MOVE6"){
				del_chk = "del_chk";
			}else if(moveName == "MOVE4" || moveName == "MOVE5"){
				del_chk = "snd_del_chk";
			}
			
			checkedRow = fromSheet.FindCheckedRow(del_chk);
			chkArr = checkedRow.split("|");
			
			for(var i=1; i<=fromSheet.LastRow(); i++){	
				for(var j=0; j<chkArr.length; j++){
					if(i == chkArr[j]){
						arr[k] = i;
						k++;
					}
				}											
			}	
		}	
		
		var g_cntr_seq = "";
		if(moveName == "MOVE1" || moveName == "MOVE2" || moveName == "MOVE5"){
			g_cntr_seq = formObj.i_cntr_01.value;
		}else if(moveName == "MOVE3" || moveName == "MOVE4" ||moveName == "MOVE6" || moveName == "MOVE11"){
			g_cntr_seq = formObj.i_cntr_02.value;
		}
		
		//체크 갯수 만큼 To AddRow		
		var intRows = toSheet.LastRow() + 1;	
		var org_prefix = "org_";
		var prefix = "snd_";
		var div_flag = "N";
		
		for(var j=1; j<=arr.length; j++){		
				
			if(moveName == "MOVE1"){
				
				//Sheet2 Add(cntr01)
				sheetDataLoad(moveName, fromSheet, toSheet, "", arr[j-1], g_cntr_seq, intRows);
				//Sheet3 Add(cntr01)
//				sheetDataLoad(moveName, fromSheet, sheet3, "snd_", arr[j-1], g_cntr_seq, intRows);
				//Hidden Sheet Add
				sheetDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, intRows);
				
				var filterSheet = docObjects[2];
				setCntrFilter(filterSheet, "snd_", formObj.i_cntr_02.value);
							
			}else if(moveName == "MOVE2"){					
				
				var dup_cnt = 0;
				var dup_flag = "N";
				toSheet = docObjects[2];
				for(var i=1; i<=toSheet.LastRow(); i++){
					if( fromSheet.GetCellValue(arr[j-1], "bkg_seq") == toSheet.GetCellValue(i, "snd_bkg_seq") ){
						dup_cnt++;
					}
				}
				if( dup_cnt > 1 ){
					dup_flag = "Y";
				}
				
				if( dup_flag == "N" ){
					//Sheet1 Add
					sheetDataLoad(moveName, fromSheet, docObjects[0], "org_", arr[j-1], g_cntr_seq, intRows);				
					//Sheet3 Del
					sheetRowDel(fromSheet, docObjects[2], "", "snd_");
					//Hidden Sheet Del
					sheetRowDel(fromSheet, docObjects[3], "", "ins_");
				}else{
					//Sheet1 Add
					sheetOrgDataLoad(moveName, fromSheet, docObjects[0], "org_", arr[j-1], g_cntr_seq, intRows);
					//Sheet3 Del(Cntr01) 
//					sheetRowDel(fromSheet, docObjects[2], "", "snd_");
					//Hidden Sheet Del
					sheetRowDel(fromSheet, hiddenSheet, "", "ins_");
					//Sheet2 Del(Cntr01)
					sheetOrgDel(fromSheet, "");
					div_flag = "Y";
				}
				
				var filterSheet = docObjects[1];
				setCntrFilter(filterSheet, "", formObj.i_cntr_01.value);
				
				var filterSheet = docObjects[2];
				setCntrFilter(filterSheet, "snd_", formObj.i_cntr_02.value);
				
			}else if(moveName == "MOVE3"){
				
				//Sheet3 Add
				sheetDataLoad(moveName, fromSheet, toSheet, "snd_", arr[j-1], g_cntr_seq, intRows);			
				//Sheet2 Add
//				sheetDataLoad(moveName, fromSheet, sheet2, "", arr[j-1], g_cntr_seq, intRows);
				//Hidden Sheet Add
				sheetDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, intRows);
				
				var filterSheet = docObjects[1];
				setCntrFilter(filterSheet, "", formObj.i_cntr_01.value);
				
			}else if(moveName == "MOVE4"){
				
				var dup_cnt = 0;
				var dup_flag = "N";
				toSheet = docObjects[1];
				for(var i=1; i<=toSheet.LastRow(); i++){
					if( fromSheet.GetCellValue(arr[j-1], "snd_bkg_seq") == toSheet.GetCellValue(i, "bkg_seq") ){
						dup_cnt++;
					}
				}
				if( dup_cnt > 1 ){
					dup_flag = "Y";
				}
				
				if( dup_flag == "N" ){
					//Sheet1 Add
					sheetDataLoad(moveName, fromSheet, docObjects[0], "org_", arr[j-1], g_cntr_seq, intRows);
					//Sheet2 Del
					sheetRowDel(fromSheet, docObjects[1], "snd_", "");	
					//Hidden Sheet Del
					sheetRowDel(fromSheet, docObjects[3], "snd_", "ins_");	
				}else{
					//Sheet1 Add
					sheetOrgDataLoad(moveName, fromSheet, docObjects[0], "org_", arr[j-1], g_cntr_seq, intRows);
					//Sheet3 Del(Cntr01) 
//					sheetRowDel(fromSheet, docObjects[1], "snd_", "");
					//Hidden Sheet Del
					sheetRowDel(fromSheet, hiddenSheet, "snd_", "ins_");
					//Sheet2 Del(Cntr01)
					sheetOrgDel(fromSheet, "snd_");
					div_flag = "Y";
				}				
				
				var filterSheet = docObjects[1];
				setCntrFilter(filterSheet, "", formObj.i_cntr_01.value);
				
				var filterSheet = docObjects[2];
				setCntrFilter(filterSheet, "snd_", formObj.i_cntr_02.value);
				
			}else if(moveName == "MOVE5"){
				var dup_cnt = 0;
				var dup_flag = "N";
				for(var i=1; i<=toSheet.LastRow(); i++){
					if( fromSheet.GetCellValue(arr[j-1], "snd_bkg_seq") == toSheet.GetCellValue(i, "bkg_seq") ){
						dup_cnt++;
					}
				}
				if( dup_cnt > 1 ){
					dup_flag = "Y";
				}
				
				if( fromSheet.GetCellValue(arr[j-1], "snd_bfr_pgk_qty") == fromSheet.GetCellValue(arr[j-1], "snd_cgo_pgk_qty") ){
					if( dup_flag == "Y" ){	
						//Sheet2 Del(cntr02)
						sheetDupRowDel(fromSheet, toSheet, formObj.i_cntr_02.value,"snd_", "");
						//hiddenSheet Del
						//sheetDupRowDel(fromSheet, hiddenSheet, formObj.i_cntr_02.value, "snd_", "ins_");
						updateHdnShtSts( fromSheet,  hiddenSheet, formObj.i_cntr_02.value, "D" );
					}else{
						//Sheet3 Add
						sheetDataLoad(moveName, fromSheet, fromSheet, "snd_", arr[j-1], g_cntr_seq, intRows);					
						//Sheet2 Update
						sheetCntrUpdate(fromSheet, "snd_", docObjects[1], "");									
						//Hidden Sheet Update
						sheetCntrUpdate(fromSheet, "snd_", docObjects[3], "ins_");
					}					
				}else{
					if( dup_flag == "Y" ){					
						//Sheet2 Del
						sheetRowDel(fromSheet, toSheet, "snd_", "");		
						//Sheet2 Add
						sheetOrgDataLoad(moveName, fromSheet, toSheet, "", arr[j-1], g_cntr_seq, toSheet.LastRow() + 1);	
						//Hidden Sheet Del
						sheetRowDel(fromSheet, hiddenSheet, "snd_", "ins_");
						//HiddenSheet Add
						sheetOrgDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, hiddenSheet.LastRow() + 1);						
						//Sheet3 Div Add(cntr01)
						sheetOrgDivUpdate(fromSheet, "snd_");	
						//Sheet3 Del						
						sheetDupRowDel(fromSheet, fromSheet, formObj.i_cntr_02.value, "snd_", "snd_");
					}else{
						//Sheet3 Div Add(cntr01)
						sheetDivDataLoad(moveName, fromSheet, fromSheet, "snd_", arr[j-1], g_cntr_seq, intRows);					
						//Sheet2 Sheet Div Update
						sheetDivUpdate(fromSheet, "", fromSheet, "");					
						//Sheet2 Div Add(cntr01)
						sheetDivDataLoad(moveName, fromSheet, toSheet, "", arr[j-1], g_cntr_seq, intRows);					
						//Hidden Sheet Div Add
						sheetDivDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, intRows);					
						//Hidden Sheet Div Update
						sheetDivUpdate(fromSheet, "snd_", hiddenSheet, "ins_");	
					}
					div_flag = "Y";
				}
				
				var filterSheet = docObjects[1];
				setCntrFilter(filterSheet, "", formObj.i_cntr_01.value);
				
				var filterSheet = docObjects[2];
				setCntrFilter(filterSheet, "snd_", formObj.i_cntr_02.value);				
				
				
			}else if(moveName == "MOVE6"){
				var dup_cnt = 0;
				var dup_flag = "N";
				for(var i=1; i<=toSheet.LastRow(); i++){
					if( fromSheet.GetCellValue(arr[j-1], "bkg_seq") == toSheet.GetCellValue(i, "snd_bkg_seq") ){
						dup_cnt++;
					}
				}
				if( dup_cnt > 1 ){
					dup_flag = "Y";
				}		

				if( fromSheet.GetCellValue(arr[j-1], "bfr_pgk_qty") == fromSheet.GetCellValue(arr[j-1], "cgo_pgk_qty") ){				
					//Sheet2 Add(cntr02)
					sheetDataLoad(moveName, fromSheet, fromSheet, "", arr[j-1], g_cntr_seq, intRows);									
					//Sheet3 Update
					sheetCntrUpdate(fromSheet, "", docObjects[2], "snd_");					
					//Hidden Sheet Update
					sheetCntrUpdate(fromSheet, "", docObjects[3], "ins_"); 	
				}else{					
					if( dup_flag == "Y" ){					
						//Sheet3 Del
						sheetRowDel(fromSheet, toSheet, "", "snd_");		
						//Sheet3 Add
						sheetOrgDataLoad(moveName, fromSheet, toSheet, "snd_", arr[j-1], g_cntr_seq, toSheet.LastRow() + 1);	
						//Hidden Sheet Del
						sheetRowDel(fromSheet, hiddenSheet, "", "ins_");
						//HiddenSheet Add
						sheetOrgDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, hiddenSheet.LastRow() + 1);
						//Sheet2 Div Add(cntr02)
						sheetOrgDivUpdate(fromSheet, "");
						//Sheet2 Del						
						sheetDupRowDel(fromSheet, fromSheet, formObj.i_cntr_01.value, "", "");
					}else{
						//Sheet2 Div Add(cntr02)
						sheetDivDataLoad(moveName, fromSheet, fromSheet, "", arr[j-1], g_cntr_seq, intRows)
						//Sheet3 Div Add(cntr02)
						sheetDivDataLoad(moveName, fromSheet, toSheet, "snd_", arr[j-1], g_cntr_seq, intRows)
						//Sheet3 Sheet Div Update
						sheetDivUpdate(fromSheet, "", toSheet, "snd_");	
						//Hidden Sheet Div Add
						sheetDivDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, intRows)					
						//Hidden Sheet Div Update
						sheetDivUpdate(fromSheet, "", hiddenSheet, "ins_");		
					}
					div_flag = "Y";
				}				
				
				var filterSheet = docObjects[1];
				setCntrFilter(filterSheet, "", formObj.i_cntr_01.value);
				
				var filterSheet = docObjects[2];
				setCntrFilter(filterSheet, "snd_", formObj.i_cntr_02.value);
								
			}else if(moveName == "MOVE11"){
							
				var dup_cnt = 0;
				for(var i=1; i<=toSheet.LastRow(); i++){					
					if( fromSheet.GetCellValue(arr[j-1], "bkg_seq") == toSheet.GetCellValue(i, "snd_bkg_seq") ){
						dup_cnt++;
					}
				}
				if( dup_cnt > 1 ){
					alert(getLabel('FMS_COM_ALT013'));
					return false;
				}	
				
				//Sheet2 Add(cntr02)
				sheetDataLoad(moveName, fromSheet, fromSheet, "", arr[j-1], g_cntr_seq, intRows);									
				//Sheet3 Add(cntr02)
				sheetDataLoad(moveName, fromSheet, toSheet, "snd_", arr[j-1], g_cntr_seq, intRows);				
				//Hidden Sheet Add
				sheetDataLoad(moveName, fromSheet, hiddenSheet, "ins_", arr[j-1], g_cntr_seq, intRows);						
				
				var filterSheet = docObjects[1];
				setCntrFilter(filterSheet, "", formObj.i_cntr_01.value);
				
				var filterSheet = docObjects[2];
				setCntrFilter(filterSheet, "snd_", formObj.i_cntr_02.value);
				div_flag = "Y";				
			}
			
		}
		
		//From Del
		
		var from_prefix = "";
		var to_prefix = "";
		
		if(moveName == "MOVE1"){
			from_prefix = "org_";
			to_prefix = "";
		}else if(moveName == "MOVE6"){
			from_prefix = "";
			to_prefix = "snd_";
		}else if(moveName == "MOVE5"){
			from_prefix = "snd_";
			to_prefix = "";
		}
		if(div_flag == "N"){
			for(var a=0; a<arr.length; a++){				
				if( fromSheet.GetCellValue(arr[a]-a, from_prefix+"bfr_pgk_qty") == fromSheet.GetCellValue(arr[a]-a, from_prefix+"cgo_pgk_qty") ){
					fromSheet.RowDelete(arr[a]-a,0);
				}else{				
				}			
			}
		}
		div_flag = "N";		
		cntrCalc(sheet2, "", formObj.i_cntr_01.value);	
		cntrCalc(sheet3, "snd_", formObj.i_cntr_02.value);
		
	}	
	
}

function updateHdnShtSts(fmSht, toSht, cntrSeq, stsCd){
	
	var checkedRow = fmSht.FindCheckedRow("snd_del_chk");
	var chkArr = checkedRow.split("|");
	
	
	for(var i=0; i<chkArr.length; i++){
		for(var j=1; j<=toSht.LastRow(); j++){
			if(  fmSht.GetCellValue(chkArr[i], "snd_cntr_seq") + fmSht.GetCellValue(chkArr[i], "snd_bkg_seq") == toSht.GetCellValue(j, "ins_cntr_seq") + toSht.GetCellValue(j, "ins_bkg_seq")   ){
				//alert(fmSht.GetCellValue(chkArr[i], "snd_cntr_seq") + fmSht.GetCellValue(chkArr[i], "snd_bkg_seq"));
				toSht.SetCellValue(j, "ins_ibflag", "D");
				
			}
		}
	}
	
}

function sheetDataLoad(moveName, fromSheet, toSheet, t_prefix, arr, cntr_seq, intRows){
	
	var from_prefix = "";
	var to_prefix = "";	
	
	to_prefix = t_prefix ;
		
	if( moveName == "MOVE1" ){
		from_prefix = "org_";
	}else if( moveName == "MOVE2" ){
		from_prefix = "";
	}else if( moveName == "MOVE3" ){
		from_prefix = "org_";
	}else if( moveName == "MOVE4" ){
		from_prefix = "snd_";
	}else if( moveName == "MOVE5" ){
		from_prefix = "snd_";
	}else if( moveName == "MOVE6" || moveName == "MOVE11" ){
		from_prefix = "";
	}
		
	toSheet.DataInsert(intRows);
	toSheet.SetCellValue(intRows, to_prefix+"cntr_seq", 		cntr_seq);
	toSheet.SetCellValue(intRows, to_prefix+"booking_no", 		fromSheet.GetCellValue(arr, from_prefix+"booking_no"));
	toSheet.SetCellValue(intRows, to_prefix+"bkg_seq", 			fromSheet.GetCellValue(arr, from_prefix+"bkg_seq"));
	toSheet.SetCellValue(intRows, to_prefix+"booking_type", 	fromSheet.GetCellValue(arr, from_prefix+"booking_type"));
	toSheet.SetCellValue(intRows, to_prefix+"bkg_sts_nm", 		fromSheet.GetCellValue(arr, from_prefix+"bkg_sts_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"shipper_nm", 		fromSheet.GetCellValue(arr, from_prefix+"shipper_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"consignee_nm", 	fromSheet.GetCellValue(arr, from_prefix+"consignee_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"partner_nm", 		fromSheet.GetCellValue(arr, from_prefix+"partner_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"pol_nm", 			fromSheet.GetCellValue(arr, from_prefix+"pol_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"pod_nm", 			fromSheet.GetCellValue(arr, from_prefix+"pod_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"etd_dt_tm", 		fromSheet.GetCellValue(arr, from_prefix+"etd_dt_tm"));
	toSheet.SetCellValue(intRows, to_prefix+"eta_dt_tm", 		fromSheet.GetCellValue(arr, from_prefix+"eta_dt_tm"));
	//#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
	toSheet.SetCellValue(intRows, to_prefix+"del_nm", 			fromSheet.GetCellValue(arr, from_prefix+"del_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_pgk_qty", 		fromSheet.GetCellValue(arr, from_prefix+"cgo_pgk_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_kgs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"cgo_kgs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_lbs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"cgo_lbs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_cbm_qty", 		fromSheet.GetCellValue(arr, from_prefix+"cgo_cbm_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_cft_qty", 		fromSheet.GetCellValue(arr, from_prefix+"cgo_cft_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_pck_ut_cd", 	fromSheet.GetCellValue(arr, from_prefix+"cgo_pck_ut_cd"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_pgk_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_pgk_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_kgs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_kgs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_lbs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_lbs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_cbm_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cbm_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_cft_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cft_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"new_cntr_seq", 	fromSheet.GetCellValue(arr, from_prefix+"new_cntr_seq"));	
}

function sheetOrgDataLoad(moveName, fromSheet, toSheet, t_prefix, arr, cntr_seq, intRows){
	
	var from_prefix = "";
	var to_prefix = "";	
	
	to_prefix = t_prefix ;
		
	if( moveName == "MOVE2" ){
		from_prefix = "";
	}else if( moveName == "MOVE4" || moveName == "MOVE5" ){
		from_prefix = "snd_";
	}
		
	toSheet.DataInsert(intRows);
	toSheet.SetCellValue(intRows, to_prefix+"cntr_seq", 		cntr_seq);
	toSheet.SetCellValue(intRows, to_prefix+"booking_no", 		fromSheet.GetCellValue(arr, from_prefix+"booking_no"));
	toSheet.SetCellValue(intRows, to_prefix+"bkg_seq", 			fromSheet.GetCellValue(arr, from_prefix+"bkg_seq"));
	toSheet.SetCellValue(intRows, to_prefix+"booking_type", 	fromSheet.GetCellValue(arr, from_prefix+"booking_type"));
	toSheet.SetCellValue(intRows, to_prefix+"bkg_sts_nm", 		fromSheet.GetCellValue(arr, from_prefix+"bkg_sts_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"shipper_nm", 		fromSheet.GetCellValue(arr, from_prefix+"shipper_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"consignee_nm", 	fromSheet.GetCellValue(arr, from_prefix+"consignee_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"partner_nm", 		fromSheet.GetCellValue(arr, from_prefix+"partner_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"pol_nm", 			fromSheet.GetCellValue(arr, from_prefix+"pol_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"pod_nm", 			fromSheet.GetCellValue(arr, from_prefix+"pod_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"etd_dt_tm", 		fromSheet.GetCellValue(arr, from_prefix+"etd_dt_tm"));
	toSheet.SetCellValue(intRows, to_prefix+"eta_dt_tm", 		fromSheet.GetCellValue(arr, from_prefix+"eta_dt_tm"));
	//#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
	toSheet.SetCellValue(intRows, to_prefix+"del_nm", 			fromSheet.GetCellValue(arr, from_prefix+"del_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_pgk_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_pgk_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_kgs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_kgs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_lbs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_lbs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_cbm_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cbm_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_cft_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cft_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_pck_ut_cd", 	fromSheet.GetCellValue(arr, from_prefix+"cgo_pck_ut_cd"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_pgk_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_pgk_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_kgs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_kgs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_lbs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_lbs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_cbm_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cbm_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_cft_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cft_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"new_cntr_seq", 	fromSheet.GetCellValue(arr, from_prefix+"new_cntr_seq"));	
}

//데이터 분할
function sheetDivDataLoad(moveName, fromSheet, toSheet, t_prefix, arr, cntr_seq, intRows){
	
	var from_prefix = "";
	var to_prefix = "";	
	
	to_prefix = t_prefix ;
		
	if( moveName == "MOVE5" ){
		from_prefix = "snd_";
	}else if( moveName == "MOVE6" || moveName == "MOVE11" ){
		from_prefix = "";
	}
		
	toSheet.DataInsert(intRows);
	toSheet.SetCellValue(intRows, to_prefix+"cntr_seq", 		cntr_seq);
	toSheet.SetCellValue(intRows, to_prefix+"booking_no", 		fromSheet.GetCellValue(arr, from_prefix+"booking_no"));
	toSheet.SetCellValue(intRows, to_prefix+"bkg_seq", 			fromSheet.GetCellValue(arr, from_prefix+"bkg_seq"));
	toSheet.SetCellValue(intRows, to_prefix+"booking_type", 	fromSheet.GetCellValue(arr, from_prefix+"booking_type"));
	toSheet.SetCellValue(intRows, to_prefix+"bkg_sts_nm", 		fromSheet.GetCellValue(arr, from_prefix+"bkg_sts_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"shipper_nm", 		fromSheet.GetCellValue(arr, from_prefix+"shipper_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"consignee_nm", 	fromSheet.GetCellValue(arr, from_prefix+"consignee_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"partner_nm", 		fromSheet.GetCellValue(arr, from_prefix+"partner_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"pol_nm", 			fromSheet.GetCellValue(arr, from_prefix+"pol_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"pod_nm", 			fromSheet.GetCellValue(arr, from_prefix+"pod_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"etd_dt_tm", 		fromSheet.GetCellValue(arr, from_prefix+"etd_dt_tm"));
	toSheet.SetCellValue(intRows, to_prefix+"eta_dt_tm", 		fromSheet.GetCellValue(arr, from_prefix+"eta_dt_tm"));	
	//#2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가
	toSheet.SetCellValue(intRows, to_prefix+"del_nm", 			fromSheet.GetCellValue(arr, from_prefix+"del_nm"));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_pck_ut_cd", 	fromSheet.GetCellValue(arr, from_prefix+"cgo_pck_ut_cd"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_pgk_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_pgk_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_kgs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_kgs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_lbs_wgt", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_lbs_wgt"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_cbm_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cbm_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"bfr_cft_qty", 		fromSheet.GetCellValue(arr, from_prefix+"bfr_cft_qty"));
	toSheet.SetCellValue(intRows, to_prefix+"new_cntr_seq", 	fromSheet.GetCellValue(arr, from_prefix+"new_cntr_seq"));
	
	var kgs_wgt = 0.0;
	var lbs_wgt = 0.0;
	var cbm_qty = 0.0;
	var cft_qty = 0.0;	
	
	kgs_wgt = parseFloat(fromSheet.GetCellValue(arr, from_prefix+"bfr_kgs_wgt")) - parseFloat(fromSheet.GetCellValue(arr, from_prefix+"cgo_kgs_wgt"));
	lbs_wgt = parseFloat(fromSheet.GetCellValue(arr, from_prefix+"bfr_lbs_wgt")) - parseFloat(fromSheet.GetCellValue(arr, from_prefix+"cgo_lbs_wgt"));
	cbm_qty = parseFloat(fromSheet.GetCellValue(arr, from_prefix+"bfr_cbm_qty")) - parseFloat(fromSheet.GetCellValue(arr, from_prefix+"cgo_cbm_qty"));
	cft_qty = parseFloat(fromSheet.GetCellValue(arr, from_prefix+"bfr_cft_qty")) - parseFloat(fromSheet.GetCellValue(arr, from_prefix+"cgo_cft_qty"));
	
	var cgo_pgk_qty = parseInt(fromSheet.GetCellValue(arr, from_prefix+"bfr_pgk_qty")) - parseInt(fromSheet.GetCellValue(arr, from_prefix+"cgo_pgk_qty"));
	
	toSheet.SetCellValue(intRows, to_prefix+"cgo_pgk_qty", 	cgo_pgk_qty);					
	toSheet.SetCellValue(intRows, to_prefix+"cgo_kgs_wgt", 	roundXL(kgs_wgt,2));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_lbs_wgt", 	roundXL(lbs_wgt,2));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_cbm_qty", 	roundXL(cbm_qty,3));
	toSheet.SetCellValue(intRows, to_prefix+"cgo_cft_qty", 	roundXL(cft_qty,3));
		
}

function sheetRowDel(fromSheet, toSheet, f_prefix, t_prefix){
	
	var formObj = document.frm1;
	var checkedRow = fromSheet.FindCheckedRow(f_prefix+"del_chk");
	var chkArr = checkedRow.split("|");
	var bkg_seq = "";
	
	for(var i=1; i<=toSheet.LastRow(); i++){
		for(var j=0; j<chkArr.length; j++){			
			if(toSheet.GetCellValue(i, t_prefix+"bkg_seq") == fromSheet.GetCellValue(chkArr[j], f_prefix+"bkg_seq") ){				
				if(i != fromSheet.LastRow()){
					bkg_seq += i+"|";
				}else{
					bkg_seq += i;
				}
			}
		}
	}					
	toSheet.RowDelete(bkg_seq);
}

function sheetDupRowDel(fromSheet, toSheet, cntr_seq, f_prefix, t_prefix){
	
	var formObj = document.frm1;
	var checkedRow = fromSheet.FindCheckedRow(f_prefix+"del_chk");
	var chkArr = checkedRow.split("|");
		
	for(var i=1; i<=toSheet.LastRow(); i++){
		for(var j=0; j<chkArr.length; j++){			
			if(toSheet.GetCellValue(i, t_prefix+"bkg_seq") == fromSheet.GetCellValue(chkArr[j], f_prefix+"bkg_seq")
					&& toSheet.GetCellValue(i, t_prefix+"cntr_seq") == cntr_seq ){				
				toSheet.RowDelete(i,0);
			}
		}
	}					
	
}

function sheetOrgDel(fromSheet, f_prefix){
	var checkedRow = fromSheet.FindCheckedRow(f_prefix+"del_chk");
	var chkArr = checkedRow.split("|");
	var bkg_seq = "";
	
	for(var i=1; i<=fromSheet.LastRow(); i++){
		for(var j=0; j<chkArr.length; j++){	
			if(fromSheet.GetCellValue(i, f_prefix+"bkg_seq") == fromSheet.GetCellValue(chkArr[j], f_prefix+"bkg_seq")){	
				if(i != fromSheet.LastRow()){
					bkg_seq += i+"|";
				}else{
					bkg_seq += i;
				}
				
			}
		}		
	}		
	fromSheet.RowDelete(bkg_seq);
	
}

function sheetCntrUpdate(fromSheet, from_prefix, toSheet, to_prefix){
	
	var formObj = document.frm1;
	var checkedRow = fromSheet.FindCheckedRow(from_prefix+"del_chk");
	var chkArr = checkedRow.split("|");
	var cntr_seq = "";
	
	if( from_prefix == "snd_" ){
		cntr_seq = formObj.i_cntr_01.value;
	}else{
		cntr_seq = formObj.i_cntr_02.value;
	}
	
	for(var i=1; i<=toSheet.LastRow(); i++){
		for(var j=0; j<chkArr.length; j++){			
			if(toSheet.GetCellValue(i, to_prefix+"bkg_seq") == fromSheet.GetCellValue(chkArr[j], from_prefix+"bkg_seq")){				
				toSheet.SetCellValue(i, to_prefix+"cntr_seq", cntr_seq);
			}
		}
	}	
	
}

//Filter 기능으로 숨어있는 데이터 Update
function sheetDivUpdate(fromSheet, from_prefix, toSheet, to_prefix){
	
	var formObj = document.frm1;
	var checkedRow = fromSheet.FindCheckedRow(from_prefix+"del_chk");
	var chkArr = checkedRow.split("|");
	var cntr_seq = "";
	
	if( from_prefix == "" ){
		cntr_seq = formObj.i_cntr_01.value;
	}else{
		cntr_seq = formObj.i_cntr_02.value;
	}
		
	var cgo_pgk_qty = 0;
	var kgs_wgt = 0.0;
	var lbs_wgt = 0.0;
	var cbm_qty = 0.0;
	var cft_qty = 0.0;
	
	for(var i=1; i<=toSheet.LastRow(); i++){
		for(var j=0; j<chkArr.length; j++){			
			if( fromSheet.GetCellValue(i, from_prefix+"bkg_seq") == fromSheet.GetCellValue(chkArr[j], from_prefix+"bkg_seq")
				&&	fromSheet.GetCellValue(i, from_prefix+"cntr_seq") == fromSheet.GetCellValue(chkArr[j], from_prefix+"cntr_seq") ){
								
				kgs_wgt = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"cgo_kgs_wgt"));
				lbs_wgt = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"cgo_lbs_wgt"));
				cbm_qty = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"cgo_cbm_qty"));
				cft_qty = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"cgo_cft_qty"));
				cgo_pgk_qty = parseInt(fromSheet.GetCellValue(chkArr[j], from_prefix+"cgo_pgk_qty"));
				
				toSheet.SetCellValue(i, to_prefix+"cgo_pgk_qty", 	cgo_pgk_qty);
				toSheet.SetCellValue(i, to_prefix+"cgo_kgs_wgt", 	roundXL(kgs_wgt,2));
				toSheet.SetCellValue(i, to_prefix+"cgo_lbs_wgt", 	roundXL(lbs_wgt,2));
				toSheet.SetCellValue(i, to_prefix+"cgo_cbm_qty", 	roundXL(cbm_qty,3));
				toSheet.SetCellValue(i, to_prefix+"cgo_cft_qty", 	roundXL(cft_qty,3));				
			}
		}
	}	
	
}

//Filter 기능으로 숨어있는 데이터 Update
function sheetOrgDivUpdate(fromSheet, from_prefix){
	
	var formObj = document.frm1;
	var checkedRow = fromSheet.FindCheckedRow(from_prefix+"del_chk");
	var chkArr = checkedRow.split("|");
	var cntr_seq = "";
	
	if( from_prefix == "" ){
		cntr_seq = formObj.i_cntr_02.value;
	}else{
		cntr_seq = formObj.i_cntr_01.value;
	}
		
	var cgo_pgk_qty = 0;
	var kgs_wgt = 0.0;
	var lbs_wgt = 0.0;
	var cbm_qty = 0.0;
	var cft_qty = 0.0;
	
	for(var i=1; i<=fromSheet.LastRow(); i++){
		for(var j=0; j<chkArr.length; j++){			
			if( fromSheet.GetCellValue(i, from_prefix+"bkg_seq") == fromSheet.GetCellValue(chkArr[j], from_prefix+"bkg_seq")
				&&	fromSheet.GetCellValue(i, from_prefix+"cntr_seq") == cntr_seq ){
								
				kgs_wgt = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"bfr_kgs_wgt"));
				lbs_wgt = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"bfr_lbs_wgt"));
				cbm_qty = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"bfr_cbm_qty"));
				cft_qty = parseFloat(fromSheet.GetCellValue(chkArr[j], from_prefix+"bfr_cft_qty"));
				cgo_pgk_qty = parseInt(fromSheet.GetCellValue(chkArr[j], from_prefix+"bfr_pgk_qty"));
				
				fromSheet.SetCellValue(i, from_prefix+"cgo_pgk_qty", 	cgo_pgk_qty);
				fromSheet.SetCellValue(i, from_prefix+"cgo_kgs_wgt", 	roundXL(kgs_wgt,2));
				fromSheet.SetCellValue(i, from_prefix+"cgo_lbs_wgt", 	roundXL(lbs_wgt,2));
				fromSheet.SetCellValue(i, from_prefix+"cgo_cbm_qty", 	roundXL(cbm_qty,3));
				fromSheet.SetCellValue(i, from_prefix+"cgo_cft_qty", 	roundXL(cft_qty,3));				
			}
		}
	}	
	
}

function setCntrFilter(sheet, prefix, cntr){	
	sheet.ShowFilterRow();	
	sheet.SetFilterValue(prefix+"cntr_seq", cntr, 1);
	sheet.HideFilterRow();
	sheet.HideProcessDlg();
}

function sheet2_OnChange(sheetObj, row, col, value) {
	var formObj = document.frm1;
	var colStr = sheetObj.ColSaveName(col);
		
	var pgk_calc_rate = 0;
	
	var kgs_wgt = 0.0;
	var lbs_wgt = 0.0;
	var cbm_qty = 0.0;
	var cft_qty = 0.0;
	
	if(colStr == "cgo_pgk_qty" ){
		
		if(value < 0){
			// Input data must be greater than 0.
			alert(getLabel("FMS_COM_ALT042"));
			sheetObj.SetCellValue(row, col, 0,0);
			return;
		}
		
		if(parseFloat(sheetObj.GetCellValue(row, "cgo_pgk_qty")) > parseInt(sheetObj.GetCellValue(row, "bfr_pgk_qty")) ){
			alert(getLabel('FMS_COM_ALT002'));
			sheetObj.SetCellValue(row, "cgo_pgk_qty", sheetObj.GetCellValue(row, "bfr_pgk_qty"), 0);
			return false;
		}
		pgk_calc_rate = parseInt(sheetObj.GetCellValue(row, "cgo_pgk_qty"))/parseInt(sheetObj.GetCellValue(row, "bfr_pgk_qty"));
		pgk_calc_rate = pgk_calc_rate.toFixed(2);							
		
		kgs_wgt = parseFloat(sheetObj.GetCellValue(row, "bfr_kgs_wgt")) * pgk_calc_rate;
		lbs_wgt = parseFloat(sheetObj.GetCellValue(row, "bfr_lbs_wgt")) * pgk_calc_rate;
		cbm_qty = parseFloat(sheetObj.GetCellValue(row, "bfr_cbm_qty")) * pgk_calc_rate;
		cft_qty = parseFloat(sheetObj.GetCellValue(row, "bfr_cft_qty")) * pgk_calc_rate;
		
		sheetObj.SetCellValue(row, "cgo_kgs_wgt", kgs_wgt.toFixed(2));
		sheetObj.SetCellValue(row, "cgo_lbs_wgt", lbs_wgt.toFixed(2));
		sheetObj.SetCellValue(row, "cgo_cbm_qty", cbm_qty.toFixed(6));
		sheetObj.SetCellValue(row, "cgo_cft_qty", cft_qty.toFixed(6));
	}else if(colStr == "cgo_kgs_wgt" || colStr == "cgo_lbs_wgt"){
		weightChange(sheetObj, row, colStr, "");
	}else if(colStr == "cgo_cbm_qty" || colStr == "cgo_cft_qty"){
		cbmChange(sheetObj, row, colStr, "");
	}
	
	cntrCalc(sheet2, "", formObj.i_cntr_01.value);	
	cntrCalc(sheet3, "snd_", formObj.i_cntr_02.value);
}

function sheet3_OnChange(sheetObj, row, col, value) {
	var formObj = document.frm1;
	var colStr = sheetObj.ColSaveName(col);
	var prefix = "snd_";
	
	var pgk_calc_rate = 0;
	
	var kgs_wgt = 0.0;
	var lbs_wgt = 0.0;
	var cbm_qty = 0.0;
	var cft_qty = 0.0;
	
	if(colStr == prefix+"cgo_pgk_qty" ){
		if(parseFloat(sheetObj.GetCellValue(row, prefix+"cgo_pgk_qty")) > parseInt(sheetObj.GetCellValue(row, prefix+"bfr_pgk_qty")) ){
			alert(getLabel('FMS_COM_ALT002'));
			sheetObj.SetCellValue(row, prefix+"cgo_pgk_qty", sheetObj.GetCellValue(row, prefix+"bfr_pgk_qty"));
			return false;
		}
		pgk_calc_rate = parseInt(sheetObj.GetCellValue(row, prefix+"cgo_pgk_qty"))/parseInt(sheetObj.GetCellValue(row, prefix+"bfr_pgk_qty"));
		pgk_calc_rate = pgk_calc_rate.toFixed(2);							
		
		kgs_wgt = parseFloat(sheetObj.GetCellValue(row, prefix+"bfr_kgs_wgt")) * pgk_calc_rate;
		lbs_wgt = parseFloat(sheetObj.GetCellValue(row, prefix+"bfr_lbs_wgt")) * pgk_calc_rate;
		cbm_qty = parseFloat(sheetObj.GetCellValue(row, prefix+"bfr_cbm_qty")) * pgk_calc_rate;
		cft_qty = parseFloat(sheetObj.GetCellValue(row, prefix+"bfr_cft_qty")) * pgk_calc_rate;
		
		sheetObj.SetCellValue(row, prefix+"cgo_kgs_wgt", kgs_wgt.toFixed(2));
		sheetObj.SetCellValue(row, prefix+"cgo_lbs_wgt", lbs_wgt.toFixed(2));
		sheetObj.SetCellValue(row, prefix+"cgo_cbm_qty", cbm_qty.toFixed(6));
		sheetObj.SetCellValue(row, prefix+"cgo_cft_qty", cft_qty.toFixed(6));
	}else if(colStr == prefix+"cgo_kgs_wgt" || colStr == prefix+"cgo_lbs_wgt"){
		weightChange(sheetObj, row, colStr, "snd_");
	}else if(colStr == prefix+"cgo_cbm_qty" || colStr == prefix+"cgo_cft_qty"){
		cbmChange(sheetObj, row, colStr, "snd_");
	}
	
	cntrCalc(sheet2, "", formObj.i_cntr_01.value);	
	cntrCalc(sheet3, "snd_", formObj.i_cntr_02.value);	
	
}

function weightChange(sheet, row, colStr, prefix){	
	if(colStr == prefix+"cgo_kgs_wgt"){
		var rndXLValue=roundXL(sheet.GetCellValue(row, prefix+"cgo_kgs_wgt") * CNVT_CNST_KG_LB, 2);
		sheet.SetCellValue(row, prefix+"cgo_lbs_wgt", rndXLValue);
	}else if(colStr == prefix+"cgo_lbs_wgt"){
		var rndXLValue=roundXL(sheet.GetCellValue(row, prefix+"cgo_lbs_wgt") / CNVT_CNST_KG_LB, 2);
		sheet.SetCellValue(row, prefix+"cgo_kgs_wgt", rndXLValue);
	}
}

function cbmChange(sheet, row, colStr, prefix){
	if(colStr == prefix+"cgo_cbm_qty"){
		var rndXLValue=roundXL(sheet.GetCellValue(row, prefix+"cgo_cbm_qty") * CNVT_CNST_CBM_CFT, 3);
		sheet.SetCellValue(row, prefix+"cgo_cft_qty", rndXLValue);
	}else if(colStr == prefix+"cgo_cft_qty"){
		var rndXLValue=roundXL(sheet.GetCellValue(row, prefix+"cgo_cft_qty") / CNVT_CNST_CBM_CFT, 3);
		sheet.SetCellValue(row, prefix+"cgo_cbm_qty", rndXLValue);
	}	
}

//Calc
function cntrCalc(toSheet, to_prefix, cntr_seq){
	var formObj = document.frm1;		
	var package_sum = 0;	
	var rowCount = 0;
		
	rowCount = toSheet.LastRow();
	var k = 0;
	for(var i=1; i<=rowCount; i++){
		if(cntr_seq == toSheet.GetCellValue(i, to_prefix+"cntr_seq")){
			rowCount += k;
			k++;
		}
	}
	
	if(to_prefix == ""){
		formObj.sheet2_total_cnt.value = k;
	}else{
		formObj.sheet3_total_cnt.value = k;
	}	
	
	for(var i=1; i<=rowCount; i++){					
		if(cntr_seq == toSheet.GetCellValue(i, to_prefix+"cntr_seq")){
			package_sum += parseInt(toSheet.GetCellValue(i, to_prefix+"cgo_pgk_qty"));
		}		
	}
	
	if(to_prefix == ""){
		formObj.sheet2_pkg_cnt.value = package_sum ;
	}else{
		formObj.sheet3_pkg_cnt.value = package_sum ;
	}
	
	var wgt1_sum = 0.0;
	var wgt2_sum = 0.0;
	var mea1_sum = 0.0;
	var mea2_sum = 0.0;
	var rowCount = 0;
	
	rowCount = toSheet.LastRow();
	for(var i=1; i<=rowCount; i++){		
		if(cntr_seq == toSheet.GetCellValue(i, to_prefix+"cntr_seq")){
			wgt1_sum += parseFloat(toSheet.GetCellValue(i, to_prefix+"cgo_kgs_wgt"));
			wgt2_sum += parseFloat(toSheet.GetCellValue(i, to_prefix+"cgo_lbs_wgt"));
			mea1_sum += parseFloat(toSheet.GetCellValue(i, to_prefix+"cgo_cbm_qty"));
			mea2_sum += parseFloat(toSheet.GetCellValue(i, to_prefix+"cgo_cft_qty"));
		}		
	}
	
	if(to_prefix == ""){
		formObj.sheet2_wgt1_cnt.value = wgt1_sum ;
		formObj.sheet2_wgt2_cnt.value = wgt2_sum ;
		formObj.sheet2_mea1_amt.value = mea1_sum ;		
		formObj.sheet2_mea2_amt.value = mea2_sum ;		
	}else{
		formObj.sheet3_wgt1_cnt.value = wgt1_sum ;
		formObj.sheet3_wgt2_cnt.value = wgt2_sum ;
		formObj.sheet3_mea1_amt.value = mea1_sum ;		
		formObj.sheet3_mea2_amt.value = mea2_sum ;		
	}
	
}


function sheet1_OnSearchEnd(){			
	var formObj=document.frm1;
	var sheetObj = docObjects[0];
	var sheetObj4 = docObjects[3];
	
	if(formObj.f_plan_no.value == "AUTO"){
		formObj.f_lnr_bkg_no.className="search_form";
		formObj.f_lnr_bkg_no.readOnly=false;
		formObj.f_lnr_bkg_no.disabled=false;
		formObj.btn_lnr_bkg_no.disabled=false;
	} else {
		formObj.f_lnr_bkg_no.className="search_form-disable";
		formObj.f_lnr_bkg_no.readOnly=true;
		formObj.f_lnr_bkg_no.disabled=true;
		formObj.btn_lnr_bkg_no.disabled=true;
	}
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		for(var j=1; j<=sheetObj4.LastRow(); j++){
			if(sheetObj.GetCellValue(i,"org_booking_no") == sheet4.GetCellValue(j, "ins_booking_no")){
				sheetObj.SetRowHidden(i,1);
			}	
		}
	}
}

function sheet2_OnSearchEnd(){			
	var formObj=document.frm1;
	//setCntrFilter(sheet2, "", formObj.i_cntr_01.value);		
	
	cntrCalc(sheet2, "", formObj.i_cntr_01.value);	
	getCntr01Info(formObj.i_cntr_01);
}

function sheet3_OnSearchEnd(){	
	var formObj=document.frm1;
	//setCntrFilter(sheet3, "snd_", formObj.i_cntr_02.value);
	
	cntrCalc(sheet3, "snd_", formObj.i_cntr_02.value);
	getCntr02Info(formObj.i_cntr_02);
}

function sheet4_OnSearchEnd(){	
	sheet4.CheckAll("ins_del_chk", 1);
}

function sheet4_OnSaveEnd(sheetObj, ErrMsg){	
	var formObj=document.frm1;
	doHideProcess();
	
	if(sheetObj.GetCellValue(1, "ins_plan_no") != ''){
		formObj.plan_no.value = sheetObj.GetCellValue(1, "ins_plan_no");
		formObj.f_plan_no.value = sheetObj.GetCellValue(1, "ins_plan_no");
		formObj.f_status_cd.value = sheetObj.GetCellValue(1, "ins_clp_sts_cd");
		formObj.f_filling_no.value = sheetObj.GetCellValue(1, "ins_ref_no");
	}
	
	/*if(formObj.f_status_cd.value == ""){
		if(sheetObj.GetCellValue(1, "ins_plan_no") != ''){
			formObj.plan_no.value = sheetObj.GetCellValue(1, "ins_plan_no");
			formObj.f_plan_no.value = sheetObj.GetCellValue(1, "ins_plan_no");
		}		
		formObj.f_status.value = "CREATED";
		formObj.f_status_cd.value = "CR";
	}else if(formObj.f_status_cd.value == "CR"){
		formObj.f_status.value = "CREATED";
		formObj.f_status_cd.value = "CR";
	}else{
		if(sheetObj.GetCellValue(1, "ins_cntr_ref_no") != ''){
			formObj.f_filling_no.value = sheetObj.GetCellValue(1, "ins_cntr_ref_no");
		}
		formObj.f_status.value = "BL CREATED";
		formObj.f_status_cd.value = "BL";
	}*/	
	
	setButton();
	
	if(formObj.f_plan_no.value == "AUTO"){
		formObj.f_lnr_bkg_no.className="search_form";
		formObj.f_lnr_bkg_no.readOnly=false;
		formObj.f_lnr_bkg_no.disabled=false;
		formObj.btn_lnr_bkg_no.disabled=false;
	} else {
		formObj.f_lnr_bkg_no.className="search_form-disable";
		formObj.f_lnr_bkg_no.readOnly=true;
		formObj.f_lnr_bkg_no.disabled=true;
		formObj.btn_lnr_bkg_no.disabled=true;
	}
	
	sheetObj.CheckAll("ins_del_chk", 1);
	//Save success
	if(ErrMsg==undefined || ErrMsg==null || ErrMsg =='' ){
		showCompleteProcess();
	}
}


//cntr_instr_txt
function setInstrTxt(obj){
	var formObj=document.frm1;
	var rowCount = 0;
	var cntr_seq ;
	if(obj.name == "f_cntr_instr_txt_01"){
		cntr_seq = formObj.i_cntr_01.value;
	}else{
		cntr_seq = formObj.i_cntr_02.value;
	}
	rowCount = sheet4.LastRow();
	for(var i=1; i<=rowCount; i++){
		if(cntr_seq == sheet4.GetCellValue(i, "ins_cntr_seq")){
			sheet4.SetCellValue(i, "ins_cntr_instr_txt", obj.value);
		}		
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}
   
function searchLnrBkgInfo(obj){
	var formObj=document.frm1;
	
	if(formObj.f_lnr_bkg_no.value != ""){
		ajaxSendPost(getLnrBkgInfo, 'reqVal', '&goWhere=aj&bcKey=getCarrierNo&bkg_no='+formObj.f_lnr_bkg_no.value, './GateServlet.gsl');
	}else{
		formObj.f_lnr_bkg_no.value = "";
		formObj.f_bkg_no.value = "";
		formObj.f_bkg_seq.value = "";
	}
}


function getLnrBkgInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^^');
			if(result[0] != "" && result[1] != ""){
				formObj.f_lnr_bkg_no.value = result[0];//lnr_bkg_no
				formObj.f_bkg_no.value = result[0];//bkg_no
				formObj.f_bkg_seq.value = result[1];//bkg_seq
				
				if(formObj.f_lnr_bkg_no.value !=""){
					doWork('SEARCH');
		        }
			}
			return;
		}  
	}
	formObj.f_lnr_bkg_no.value = "";
	formObj.f_bkg_no.value = "";
	formObj.f_bkg_seq.value = "";
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	       /* var cal=new ComCalendar();
	        cal.select(obj.name, 'MM-dd-yyyy');*/
	        var cal=new ComCalendar();
	        cal.select(obj, 'MM-dd-yyyy');

	    break;
    }
}

function GOTOMBL(v_ref_no){
	if(v_ref_no != ''){
		
	   	var paramStr = "./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST;
	   	paramStr+= '&f_ref_no='+v_ref_no;
	   	parent.mkNewFrame("Master B/L Entry", paramStr, "SEE_BMD_0040_SHEET_" + v_ref_no);
	}
}
