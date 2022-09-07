function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "CLOSE":
    		   ComClosePopup(); 
    		   window.close();
       	   break;
    	   case "PRINT":
			case 'PREVIEW':
    		   var retArray="";	
    		   for(var i=1 ; i<docObjects[0].LastRow() + 1 ; i++){
    			   if(docObjects[0].GetCellValue(i, "check")==1){
    				   var formObj=document.form;
    				   formObj.file_name.value += "^@@^";
    	    		   formObj.rd_param.value += "^@@^";
    	    		   /*	
    	    		   if(formObj.oe_hbl_form.value != ""){
    	    			   	if(formObj.bl_type[0].checked){
    	   						formObj.file_name.value=formObj.file_name.value + 'HBL_SEA_' + formObj.oe_hbl_form.value + '_ORG.mrd';
    	   					}else{
    	   						formObj.file_name.value=formObj.file_name.value + 'HBL_SEA_' + formObj.oe_hbl_form.value + '_COPY.mrd';
    	   					}
    	   				}else{
    	   					formObj.file_name.value='HBL_SEA.mrd';
    	   				}
    	    		   	*/
    	    		   
    	    		   	formObj.file_name.value += 'HBL_SEA_COPY.mrd';
    	    		   	
    	    		   	formObj.title.value='Ocean Export House B/L';
    	    		  //Parameter Setting
    	    		   	var param="['" + docObjects[0].GetCellValue(i, "intg_bl_seq") + "']";	// [1]
    	            	if(formObj.clause_rule.checked){
    	            		param += '[Y]';										// [2]
    	            	}else{
    	            		param += '[N]';										// [2]
    	            	}
    	            	if(formObj.bl_type[0].checked){
    	            		param += '[org]';									// [3]
    	            	}else if(formObj.bl_type[1].checked){
    	            		param += '[copy]';									// [3]
    	            	}
    	            	param += '[' + docObjects[0].GetCellValue(i, "org_bl_qty") + ']';	// [4]
    	            	if(formObj.frt_flg[0].checked){
    	            		param += '[Y]';										// [5]
    	            	}else if(formObj.frt_flg[1].checked){
    	            		param += '[N]';										// [5]
    	            	}
    	            	/*
    	            	if(formObj.show_bl_type[0].checked){
    	            		param += '[org]';									// [6]
    	            	}else if(formObj.show_bl_type[1].checked){
    	            		param += '[nego]';									// [6]
    	            	}else if(formObj.show_bl_type[2].checked){
    	            		param += '[dra]';									// [6]
    	            	}else if(formObj.show_bl_type[3].checked){
    	            		param += '[copy]';									// [6]
    	            	}else if(formObj.show_bl_type[4].checked){
    	            		param += '[telex]';									// [6]
    	            	}else if(formObj.show_bl_type[5].checked){
    	            		param += '[none]';									// [6]
    	            	}
    	            	*/
    	            	// #473 [IMPEX] AIR EXPORT HAWB DRAFT VERSION OPTION
    	            	if(formObj.show_bl_type.value == "OR"){
    	            		param += '[org]';									// [6]
    	            	}else if(formObj.show_bl_type.value == "NN"){
    	            		param += '[nego]';									// [6]
    	            	}else if(formObj.show_bl_type.value == "DR"){
    	            		param += '[dra]';									// [6]
    	            	}else if(formObj.show_bl_type.value == "CP"){
    	            		param += '[copy]';									// [6]
    	            	}else if(formObj.show_bl_type.value == "TR"){
    	            		param += '[telex]';									// [6]
    	            	}else if(formObj.show_bl_type.value == "SW"){
    	            		param += '[seawayb]';								// [6]
    	            	}else if(formObj.show_bl_type.value == "NO"){
    	            		param += '[none]';									// [6]
    	            	}else if(formObj.show_bl_type.value == "SR"){			// [6]
    	            		param += '[surr]';									// [6]
    	            	}    
    	            	if(formObj.title_name[0].checked){
    	            		param += '[Y]';										// [7]
    	            		param += '[]';										// [8]
    	                	param += '[]';										// [9]
    	                	param += '[]';										// [10]
    	            	}else if(formObj.title_name[1].checked){
    	            		param += '[N]';										// [7]
    	            		param += '[' + formObj.rcvd_by.value + ']';			// [8]
    	                	param += '[' + formObj.rcvd_dt_tm.value + ']';		// [9]
    	                	param += '[' + formObj.rcvd_pic.value + ']';		// [10]
    	            	}
    	            	//#1912 [PATENT]B/L 출력 AS AGENT FOR THE CARRIER 설정
    	            	//param += '[' + sea_body + ", " + docObjects[0].GetCellValue(i, "lnr_trdp_nm") + ']';			// [11]
						// #6897 [BNX] Adjust B/L (Zen#4238)
    	            	if(sea_body.indexOf('(END') < 0){
    	            		param += '[' + sea_body + " " + docObjects[0].GetCellValue(i, "lnr_trdp_nm") + ']';			// [11]
    	            	} else {
    	            		param += '[' + sea_body.substring(0,sea_body.indexOf('(END')) + ']';			// [11]
    	            	}
    	            	param += '[' + formObj.rider_flg.value + ']';			// [12]
    	            	/* OEH Print 팝업에서 bl Remark 정보를 조회.jsjang #16904 */
    	            	param += '[' + docObjects[0].GetCellValue(i, "rmk_cd") + ']';			// [13]
//    	            	param += '['+ docObjects[0].GetCellValue(i, "sign_ship") + ']';			// [14] Company Name //#1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시
    	            	//#5947 [JTC] print all HBL together
    	            	param += '[]';											// [14]
    	            	if(formObj.bl_type[0].checked){
    	            		param += '[' + docObjects[0].GetCellValue(i, "page_num") + ']';	    // [15]
    	            	}else{
    	            		param += '[1]';	                                  		 		   // [15]
    	            	}
    	            	if(formObj.showTelex.checked){
    	            		param += '[Y]';										// [16]
    	            	}else{
    	            		param += '[N]';										// [16]
    	            	}
    	            	
    	            	if(formObj.showVeslPol.checked){
    	            		param += '[Y]';										// [17]
    	            	}else{
    	            		param += '[N]';										// [17]
    	            	}        	
    	            	if(formObj.showExRate.checked){
    	            		param += '[Y]';										// [18]
    	            	}else{
    	            		param += '[N]';										// [18]
    	            	}        	
    	            	if(formObj.showOnDt.checked){
    	            		param += '[Y]';										// [19]
    	            	}else{
    	            		param += '[N]';										// [19]
    	            	}        	
    	            	if(formObj.showCont.checked){
    	            		param += '[Y]';										// [20]
    	            	}else{
    	            		param += '[N]';										// [20]
    	            	}        
    	            	//#4110 [JAPT] House B/L item add, 'Prepaid at' on HBL Print option.
    	            	if(formObj.prepaid_at.value != ''){
    	            		param += '['+formObj.prepaid_at.value.toUpperCase()+']';				// [21]
    	            	}else{
    	            		param += '[N]';       // [21]
    	            	}   
    	            	 	
    	            	if( docObjects[0].GetCellValue(i, "show_cntr") == 1 ){
    	                    param += '[Y]';// [22]
    	                }else{
    	                    param += '[N]';// [22]
    	                }
    	            	
    	            	//#6612 [JAPT] e-Signature on HBL Requirements
    	            	if(OEH_SHW_SIG_OPT == 'Y'){
    	            		var paramShowESignature = $("#showESigature").is(":checked")?"Y":"N";
    	    				param += '[' + paramShowESignature +']';										// [23]

    	    				var paramShowRevESigature = $("#showRevESigature").is(":checked")?"Y":"N";
    	    				param += '[' + paramShowRevESigature +']';										// [24]
    	            	}else{
    	            		param += '[N]';										// [23]
    	            		param += '[N]';										// [24]
    	            	}
    	                //#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
    	            	if(OEH_SHW_STAMP_OPT == 'Y'){        		
    	    				var paramShowReStamp = $("#showReStamp").is(":checked")?"Y":"N";
    	    				param += '[' + paramShowReStamp +']';	// [25]	
    	            	}else{
    	            		param += '[N]';	// [25]	
    	            	}

    	            	if(ofc_cnt_cd1=="JP"){
    	    			   ComClosePopup(retArray); 
    	    				window.close();
    	    			}
    					formObj.rd_param.value=formObj.rd_param.value + param;
    			   }
    		   }
    		   formObj.file_name.value=formObj.file_name.value.substring(4);
    		   formObj.rd_param.value=formObj.rd_param.value.substring(4);
    		   retArray=formObj.rd_param.value;
    		   if(retArray==""){
//    			   alert("Please select HBL.");
    			   alert(getLabel('SEA_COM_ALT031'));
    		   }else{
					if(srcName == "PREVIEW") {
						$("#prt_option").val("opt_preview");
					} else if(srcName == "PRINT") {
						$("#prt_option").val("opt_print");
					}

    			   popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
    			   ComClosePopup(retArray); 
    			   window.returnValue = retArray;
    			   window.close();
    		   }
    	   break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001'));
        }
	}
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
	var arg=parent.rtnary;
	
	var formObj=document.form;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    //arg[0]을 parsing 하여 리스트에 반영한다.
	var tmpArray=arg[0].toString().split("@@@");
	
	for(var i=0 ; i<tmpArray.length-1 ; i++){
		var result=tmpArray[i].split("^^^");
		docObjects[0].DataInsert(docObjects[0].LastRow() + 1);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "intg_bl_seq",result[0]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "bl_no",result[1]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "lnr_trdp_nm",result[2]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "org_bl_qty",result[3]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "rmk_cd",result[4]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "sign_ship",result[7]);  //#1247 [CLT] HB/L Company Name - Print 시 저장 요청 및 Document Package 시 표시
		//#5947 [JTC] print all HBL together
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "page_num", 1);
		if($("#cntr_info_flag").val() == "Y") {
			if(result[8] == "FCL") { //shp_mod_cd
				docObjects[0].SetCellValue(docObjects[0].LastRow(), "show_cntr",1);
			} else {
				docObjects[0].SetCellValue(docObjects[0].LastRow(), "show_cntr",0);
			}
		}
	}
	
	var d=new Date();
	//초기 시간 셋팅
	formObj.rcvd_dt_tm.value=getTodayStr() + "  " + leadingZeros(d.getHours(),2) + ":" + leadingZeros(d.getMinutes(),2);
	// 미주 지점을 제외하고 show rule clause 를 보이지 않도록 설정한다.
	if(ofc_cnt_cd1=="US"){
		document.all.rule1.style.display="block";
		form.clause_rule.checked=true;
	}else{
		document.all.rule1.style.display="none";
	}
	
	//초기 사용자 셋팅
	formObj.rcvd_pic.value=usrid;
	//#5947 [JTC] print all HBL together
	/* #1739 [Patent] OEH B/L Print 의 Freight Arrange Default 설정 Option 처리 */
	/*if( formObj.frtArrFlg.value == 'Y' ){
		$("input:radio[name='frt_flg']:radio[value='Y']").attr("checked","checked");
	}else{
		$("input:radio[name='frt_flg']:radio[value='N']").attr("checked","checked");
	}*/
	
	initSetting(1);
	
	//#3356 [JTC]HB/L Form 개발
	formObj.showExRate.checked =true;
	
	//#5947 [JTC] print all HBL together
	var opt_key = "OEH_PREPAID_AT_YN";
	ajaxSendPost(showPrepaidAtYN, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	var opt_key = "OEH_BL_PRT_FRT_ARR_FLG";
    ajaxSendPost(getSysOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    //#6612 [JAPT] e-Signature on HBL Requirements
	var opt_key = "OEH_SHW_SIG_OPT";
	ajaxSendPost(showESignatureYN, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
	var opt_key = "OEH_SHW_STAMP_OPT";
	ajaxSendPost(showRevenueStampYN, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	if(formObj.bl_type[1].checked){
		$("#showReStamp").prop('disabled', true);
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
    switch(sheetNo) {
         case 1:      //IBSheet1 init
        	 //#5947 [JTC] print all HBL together
        	 var hide_jp_opt_flg = document.form.oehBlPrintJaOpt.value == "Y" ? 0 : 1;
        	 var hide_cntr_opt_flg = document.form.oehBlPrintJaOpt.value == "Y" && document.form.cntr_info_flag.value == "Y" ? 0 : 1;
            with (sheetObj) {
             
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('SEE_BMD_0071_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"check",        KeyField:0 },
                 {Type:"Text",      Hidden:0, Width:140,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                 //#5947 [JTC] print all HBL together (S)
                 {Type:"Int",       Hidden:hide_jp_opt_flg, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"page_num",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Int",       Hidden:hide_jp_opt_flg, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org_bl_qty",  KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"CheckBox",  Hidden:hide_cntr_opt_flg, Width:160,   Align:"Center",  ColMerge:0,   SaveName:"show_cntr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 //#5947 [JTC] print all HBL together (S)
                 {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rmk_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
             	 {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"sign_ship",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);
             SetSheetHeight(150);
             SetEditable(1);
          }

           break;
    }
}
function initSetting(obj){
	var formObj=document.form;
	if(obj=="1"){
		formObj.rcvd_by.className='search_form-disable';
		formObj.rcvd_by.disabled=true;
		formObj.rcvd_dt_tm.className='search_form-disable';
		formObj.rcvd_dt_tm.disabled=true;
		formObj.rcvd_pic.className='search_form-disable';
		formObj.rcvd_pic.disabled=true;
	}else{
		formObj.rcvd_by.className='search_form';
		formObj.rcvd_by.disabled=false;
		formObj.rcvd_dt_tm.className='search_form';
		formObj.rcvd_dt_tm.disabled=false;
		formObj.rcvd_pic.className='search_form';
		formObj.rcvd_pic.disabled=false;
	}
}
function leadingZeros(n, digits){
	var zero='';
	n=n.toString();
	if(n.length < digits){
		for(var i=0 ; i<digits - n.length ; i++){
			zero += '0';
		}
	}
	return zero + n;
} 

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

//#5947 [JTC] print all HBL together
function showPrepaidAtYN(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] =='N') {
			jQuery('#prepaid_at_tr').css("display", "none"); 
		}
	}
}

//#5947 [JTC] print all HBL together
function getSysOpt(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			$("input:radio[name='frt_flg']:radio[value='N']").attr("checked","checked");
		} else {
			if(doc[1] == 'Y'){
				$("input:radio[name='frt_flg']:radio[value='Y']").attr("checked","checked");
			}else{
				$("input:radio[name='frt_flg']:radio[value='N']").attr("checked","checked");
			}	
		}
	}
}

//#5947 [JTC] print all HBL together
function chkText(){
	var page_num = 1;
	var formObj = document.form;
	for(var i=1 ; i<docObjects[0].LastRow() + 1 ; i++){
		if(formObj.bl_type[0].checked){
			page_num = docObjects[0].GetCellValue(i, "org_bl_qty");		
    	}else{
    		page_num = 1;
    	}
		docObjects[0].SetCellValue(i, "page_num", page_num);
	}
	//#6612 [JAPT] e-Signature on HBL Requirements
	if(formObj.bl_type[0].checked){
		//#6612 [JAPT] e-Signature on HBL Requirements
		$("#showESigature").prop( "checked", true);
		$("#showRevESigature").prop( "checked", true);
		//#6714 [JAPT] REVENUE STAMP FUNCTION
		$("#showReStamp").prop( "checked", true);
		$("#showReStamp").prop('disabled', false);
	}else{
		//#6612 [JAPT] e-Signature on HBL Requirements
		$("#showESigature").prop( "checked", false);
		$("#showRevESigature").prop( "checked", false);
		//#6714 [JAPT] REVENUE STAMP FUNCTION
		$("#showReStamp").prop( "checked", false);
		$("#showReStamp").prop('disabled', true);
	}
}

//#6612 [JAPT] e-Signature on HBL Requirements
var OEH_SHW_SIG_OPT = 'N';
function showESignatureYN(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] =='Y') {
			jQuery('#showEsig_tr').css("display", "");
			OEH_SHW_SIG_OPT = 'Y';
		}
	}
}

//#6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ]
var OEH_SHW_STAMP_OPT = 'N';
function showRevenueStampYN(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		if(doc[1] =='Y') {
//			jQuery('#showReStamp').css("display", "");
//			jQuery('#showReStamp_lbl').css("display", "");
			$("#showReStamp").show();
			$("#showReStamp_lbl").show();
			OEH_SHW_STAMP_OPT = 'Y';
		}
	}
}