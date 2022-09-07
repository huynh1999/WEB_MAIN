var firCalFlag = false;

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   case "SEARCH":
		   formObj.s_type_no.value=trim(formObj.s_type_no.value);
    	   if((formObj.s_strdt.value == "" || formObj.s_enddt.value == "") && formObj.s_type_no.value == ""){
    		   alert(getLabel('FMS_COM_ALT014'));
    		   formObj.s_strdt.focus();
    		   return;
    	   }
    	   docObjects[1].RemoveAll();
    	   docObjects[2].RemoveAll();
//		   docObjects[0].RemoveAll();
		   formObj.f_cmd.value=SEARCH;
           docObjects[0].DoSearch("./ACC_INV_0130GS.clt", FormQueryString(formObj) );
	   break;
	   case "SEARCHLIST01":
		   //Inv List
		   formObj.f_cmd.value=SEARCHLIST01;
		   docObjects[1].DoSearch("./ACC_INV_0130GS_1.clt", FormQueryString(formObj) );
		   //Cntr List
		   formObj.f_cmd.value=SEARCHLIST02;
		   docObjects[2].DoSearch("./ACC_INV_0130GS_2.clt", FormQueryString(formObj) );
	   break;
	   case "PROFIT_REPORT":
			if(sheetObj.RowCount()== 0){
				alert(getLabel('FMS_COM_ALT004'));	
			}else{ 
				var sRow=sheetObj.GetSelectRow();
				var reqParam='?intg_bl_seq=' + sheetObj.GetCellValue(sRow, "intg_bl_seq");
				reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "ref_no");
//				reqParam += '&air_sea_clss_cd=' + sheetObj.GetCellValue(sRow, "air_sea_clss_cd");
				reqParam += '&air_sea_clss_cd=' + 'S';
				reqParam += '&bnd_clss_cd=' + sheetObj.GetCellValue(sRow, "bnd_clss_cd");
				reqParam += '&biz_clss_cd=' + sheetObj.GetCellValue(sRow, "biz_clss_cd") ;
				if(sheetObj.GetCellValue(sRow, "biz_clss_cd") == 'M'){
					reqParam += '&mbl_no=' + sheetObj.GetCellValue(sRow, "bl_no");
					popGET('RPT_PRN_0180.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
				}else{
					reqParam += '&hbl_no=' + sheetObj.GetCellValue(sRow, "bl_no");
					popGET('RPT_PRN_0200.clt' + reqParam, '', 1100, 750,"scroll:yes;status:no;help:no;");
				}
			}
	   break;
	   case "PRINT":
		   var chkIntgBlSeq = "";
		   var minPaidDt = "";
		   var maxPaidDt = "";
			
			for(var i = 1; i < sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i, "biz_clss_cd") == "M" && sheetObj.GetCellValue(i, "pay_flag") == "1" && sheetObj.GetCellValue(i, "pay_dt_tm") != ""){
					
					chkIntgBlSeq = chkIntgBlSeq + "," + sheetObj.GetCellValue(i, "intg_bl_seq");
					
					if(minPaidDt == "" || compareTwoDateYmd(minPaidDt, sheetObj.GetCellValue(i, "pay_dt_tm"))){
						minPaidDt = sheetObj.GetCellValue(i, "pay_dt_tm");
					}
				
					if(maxPaidDt == "" || compareTwoDateYmd(sheetObj.GetCellValue(i, "pay_dt_tm"), maxPaidDt)){
						maxPaidDt = sheetObj.GetCellValue(i, "pay_dt_tm");
					}
				}
			}
			
			chkIntgBlSeq = chkIntgBlSeq.substring(1);
			
			if(chkIntgBlSeq == ""){
				alert(getLabel('FMS_COM_ALT004'));
			} else {
				// #2049 - [PATENT] PAYMENT VERIFY - MODIFICATION
				var pay_dt_tm = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "pay_dt_tm");
				
				if(pay_dt_tm == ""){
					alert(getLabel('FMS_COM_ALT004'));
					return;
				}
				
				formObj.file_name.value = 'payment_verification.mrd';
				formObj.title.value = 'Payment Verification';
				
				var param = "";
				param += "['" + chkIntgBlSeq + "']";				// [1] INTG_BL_SEQ
				param += '[' + minPaidDt + ']';					// [2] FROM DATE
				param += '[' + maxPaidDt + ']';					// [3] TO DATE
				//#2109 [PATENT] PAYMENT VERIFICATION 화면 로직 보완
//				param += '[' + pay_dt_tm + ']';					// [2] FROM DATE
//				param += '[' + pay_dt_tm + ']';					// [3] TO DATE
				param += '[' + formObj.ofc_cd.value + ']';		// [4] OFC_CD
				
				formObj.rd_param.value = param;
		   		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		   }
       break;
	   case "MODIFY":
		   
		   var valCount = false;
		   
		   for(var i = 0; i <= docObjects[0].LastRow(); i++){
			   if(docObjects[0].GetCellValue(i, "ibflag") == 'U'){
				   valCount = true;
				   break;
			   }
		   }
		   
		   if(!valCount){
			   return;
		   }else{
			   if(confirm(getLabel('FMS_COM_CFMSAV'))){
				   formObj.f_cmd.value=COMMAND01;
				   docObjects[0].DoSave("ACC_INV_0130GS.clt", FormQueryString(formObj),"ibflag",false);
				   docObjects[1].RemoveAll();
				   docObjects[2].RemoveAll();
				   
//				   searchList();
				   
//				   showCompleteProcess();
			   }
		   }
	   break;
	   case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    //var arg=window.dialogArguments;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	//오늘일자구하기
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth() + 1;
	var date=now.getDate();
	if (month < 10) {
		month="0" + (month);
	}
	if (date < 10) {
		date="0" + date;
	}
	TODAY=month + "-" + date + "-" + year;
	formObj.s_strdt.value = TODAY;
	formObj.s_enddt.value = TODAY;
	
	// #1771 - [CLC] B/L List - Payment Verification 연계
	if(p_ref_no != "" || p_hbl_no != ""){
		//formObj.s_strdt.value = p_date;
		//formObj.s_enddt.value = p_date;
		
		if(p_bnd_clss_cd == "O"){
			formObj.s_mode.value = "OE";
		} else {
			formObj.s_mode.value = "OI";
		}
		
		if(p_biz_clss_cd == "M"){
			formObj.s_type.value = "REF_NO";
			formObj.s_type_no.value = p_ref_no;
		} else {
			formObj.s_type.value = "HBL_NO";
			formObj.s_type_no.value = p_hbl_no;
		}
		
		doWork('SEARCH');
		
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
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var formObj=document.frm1;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
		with (sheetObj) {
	        (10, 0, 0, true);
	
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('ACC_INV_0130_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	
	        var cols = [ {Type:"Status",   Hidden:1, Width:0,     Align:"Center", ColMerge:0, SaveName:"ibflag" },
	                     {Type:"Text",     Hidden:1, Width:0,     Align:"Center", ColMerge:0, SaveName:"intg_bl_seq" },
	                     {Type:"Text",     Hidden:0, Width:30,    Align:"Center", ColMerge:1, SaveName:"No.",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Left",   ColMerge:1, SaveName:"sls_usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"carr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Center", ColMerge:1, SaveName:"carr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:120,   Align:"Center", ColMerge:1, SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:40,    Align:"Center", ColMerge:1, SaveName:"biz_clss_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:120,   Align:"Center", ColMerge:1, SaveName:"bl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:70,    Align:"Left",   ColMerge:1, SaveName:"verify_by",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"CheckBox", Hidden:0, Width:55,    Align:"Center", ColMerge:1, SaveName:"verify_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Left",   ColMerge:1, SaveName:"verify_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"CheckBox", Hidden:0, Width:55,    Align:"Center", ColMerge:1, SaveName:"pay_flag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Left",   ColMerge:1, SaveName:"pay_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1, SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:80,    Align:"Left",   ColMerge:1, SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:80,    Align:"Left",   ColMerge:1, SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"CheckBox", Hidden:0, Width:55,    Align:"Center", ColMerge:1, SaveName:"hold_flag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Left",   ColMerge:1, SaveName:"hold_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"hold_reason",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:100 },
	                     {Type:"CheckBox", Hidden:0, Width:70,    Align:"Center", ColMerge:1, SaveName:"release_flag",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
	                     {Type:"Text",     Hidden:0, Width:85,    Align:"Left",   ColMerge:1, SaveName:"release_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Left",   ColMerge:1, SaveName:"release_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"shpr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"shpr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"cnee_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"cnee_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"act_shpr_trdp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"act_shpr_trdp_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"prnr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"prnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Center", ColMerge:1, SaveName:"vsl_voy",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"pol_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Center", ColMerge:1, SaveName:"pod_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"issued_by",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:90,    Align:"Left",   ColMerge:1, SaveName:"bl_iss_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:80,   Align:"Center",  ColMerge:0, SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:90,    Align:"Left",   ColMerge:1, SaveName:"bnd_clss_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	         ]
	        InitColumns(cols);
	
	        SetEditable(1);
	        SetSheetHeight(300);
		}
		break;
	case 2:      //IBSheet1 init
		with (sheetObj) {
	
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('ACC_INV_0130_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);
	
	        var cols = [ {Type:"Text",     Hidden:1, Width:0,     Align:"Center", ColMerge:0, SaveName:"inv_seq" },
	                     {Type:"Text",     Hidden:0, Width:30,    Align:"Center", ColMerge:1, SaveName:"No.",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:1, Width:55,    Align:"Center", ColMerge:1, SaveName:"bl_kind",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Center", ColMerge:1, SaveName:"bl_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:35,    Align:"Center", ColMerge:1, SaveName:"sell_buy_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:100,   Align:"Center", ColMerge:1, SaveName:"inv_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:150,   Align:"Left",   ColMerge:1, SaveName:"bill_to",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:140,   Align:"Left",   ColMerge:1, SaveName:"frt_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:40,    Align:"Center", ColMerge:1, SaveName:"rat_curr_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Float",    Hidden:0, Width:90,    Align:"Right",  ColMerge:1, SaveName:"trf_cur_sum_amt",  	 KeyField:0,   CalcLogic:"Math.round(|trf_cur_sum_amt|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:50,    Align:"Center", ColMerge:1, SaveName:"clr_yn",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:80,    Align:"Center", ColMerge:1, SaveName:"last_pay_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	                   ];
	         
	        InitColumns(cols);
	
	        SetEditable(0);
	        SetSheetHeight(200);
	        
		}                                                      
		break;
	case 3:      //IBSheet1 init
		with (sheetObj) {
	
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('ACC_INV_0130_HDR3'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        
	        var cols = [ {Type:"Text",     Hidden:1, Width:0,     Align:"Center", ColMerge:0, SaveName:"cntr_list_seq" },
	                     {Type:"Text",     Hidden:1, Width:120,   Align:"Center", ColMerge:1, SaveName:"bl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:120,   Align:"Center", ColMerge:1, SaveName:"cntr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:120,   Align:"Center", ColMerge:1, SaveName:"cntr_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Center", ColMerge:1, SaveName:"cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Int",      Hidden:0, Width:50,    Align:"Right",  ColMerge:1, SaveName:"cgo_pck_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Combo",    Hidden:0, Width:90,    Align:"Left",   ColMerge:0, SaveName:"cgo_pck_ut",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Right",  ColMerge:1, SaveName:"cgo_wgt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Right",  ColMerge:1, SaveName:"cgo_wgt1",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Right",  ColMerge:1, SaveName:"cgo_meas",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:70,    Align:"Right",  ColMerge:1, SaveName:"cgo_meas1",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                     {Type:"Text",     Hidden:0, Width:120,   Align:"Left",   ColMerge:1, SaveName:"cntr_rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	                   ]
	         
	        InitColumns(cols);
	        SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2} );
	        SetEditable(0);
	        SetSheetHeight(200);
		}	    
		break;
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	
	var formObj=document.frm1;
    
	if(formObj.s_intg_bl_seq.value != sheetObj.GetCellValue(Row,'intg_bl_seq')){
		formObj.s_intg_bl_seq.value = sheetObj.GetCellValue(Row,'intg_bl_seq');
		formObj.s_biz_clss_cd.value = sheetObj.GetCellValue(Row,'biz_clss_cd');
		doWork("SEARCHLIST01");
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
//	doWork("SEARCHLIST01");
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
	    case "release_flag" :
	    	if(sheetObj.GetCellValue(Row, "release_flag") == "1"){
	    		if(sheetObj.GetCellValue(Row, "hold_flag") == "1"){
	    			if(confirm(getLabel('ACC_COM_ALT016'))){
	    				sheetObj.SetCellValue(Row, "hold_flag", "0", 0);
	    				sheetObj.SetRowFontColor(Row,"#007A0B");
	    			} else {
	    				sheetObj.SetCellValue(Row, "release_flag", "0", 0);
	    			}
	    		} else {
	    			sheetObj.SetRowFontColor(Row,"#007A0B");
	    		}
	    	} else {
	    		sheetObj.SetRowFontColor(Row,"#000000");
	    	}
		break;
	    case "hold_flag" :
	    	if(sheetObj.GetCellValue(Row, "hold_flag") == "1"){
	    		if(sheetObj.GetCellValue(Row, "release_flag") == "1"){
	    			if(confirm(getLabel('ACC_COM_ALT017'))){
	    				sheetObj.SetCellValue(Row, "release_flag", "0", 0);
	    				sheetObj.SetRowFontColor(Row,"#FF0000");
	    			} else {
	    				sheetObj.SetCellValue(Row, "hold_flag", "0", 0);
	    			}
	    		} else {
	    			sheetObj.SetRowFontColor(Row,"#FF0000");
	    		}
	    	} else {
	    		sheetObj.SetRowFontColor(Row,"#000000");
	    	}
		break;
    }
}

function sheet1_OnSearchEnd(sheetObj, errMsg) {
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
    
    for(var i=1; i<=sheetObj.LastRow(); i++){
    	if(sheetObj.GetCellValue(i, "hold_flag") == "1"){
    		sheetObj.SetRowFontColor(i,"#FF0000");
    	} else if(sheetObj.GetCellValue(i, "release_flag") == "1"){
    		sheetObj.SetRowFontColor(i,"#007A0B");
    	}
	}
    
    formObj.s_intg_bl_seq.value = '';
    formObj.s_biz_clss_cd.value = '';
    doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
//	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingT/b'));
    
}

//#2109 [PATENT] PAYMENT VERIFICATION 화면 로직 보완 
function sheet1_OnSaveEnd(sheetObj){
	   searchList();
	   showCompleteProcess();
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new ComCalendarFromTo();
	        cal.select(formObj.s_strdt, formObj.s_enddt, 'MM-dd-yyyy');
	    break;
    }
}

function searchList(){
	
	docObjects[0].RemoveAll();
	doWork('SEARCH');
}

function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCH');
}

function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCH');
}

function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_carr_trdp_cd.value="";//trdp_cd  AS param1
		formObj.s_carr_trdp_nm.value="";//eng_nm   AS param2
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="CUSTOMER"){
				formObj.s_carr_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.s_carr_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_carr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.s_carr_trdp_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj = document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_carr_trdp_cd.value=rtnValAry[0];
		formObj.s_carr_trdp_nm.value=rtnValAry[2];
	} 
}

function custEnterAction(obj){
	var formObj=document.frm1;
	if(event.keyCode == 13){
   		rtnary=new Array(1);
   		rtnary[0]="";
   		rtnary[1]=formObj.s_carr_trdp_nm.value;
   		rtnary[2]=window;
   		callBackFunc = "CUSTOMER_POPLIST";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	}
}