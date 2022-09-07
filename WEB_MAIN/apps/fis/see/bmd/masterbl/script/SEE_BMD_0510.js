/**
=========================================================
*@FileName   : SEE_BMD_0510.js
*@FileTitle  : Carrier Booking And House B/L Search 
*@Description: Carrier Booking And House B/L 목록으로 조회한다.
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
*@author     : Hoang.Phamp
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================
 */
var rtnary=new Array(1);
var formObj = document.frm1;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	
	//#2948 [Zimex] Booking list date range
//	setFromToDtEndPlus(document.frm1.f_bkg_strdt, 30, document.frm1.f_bkg_enddt, 30);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		//search 조건 추가로 combo box 이용한 추가 조건 set
    	   		searchValueSet();
    	   		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
    	   			
			   		formObj.f_cmd.value=SEARCHLIST01;

       				var dateValidFlag = true;
       				if("Y" == initDatLod){
       					/* 날짜 지우고 조건없이 검색 시 전체 검색되기 위해서 주석 처리 (20180103)
       					 * if(loadSearchFlag 
       							&& "" == formObj.f_bkg_no.value
       							&& "" == formObj.f_bl_no.value
       							){
       						if("" == formObj.f_bkg_strdt.value && "" == formObj.f_bkg_enddt.value){
    	   						formObj.f_bkg_strdt.value = dtFm;
    	   						formObj.f_bkg_enddt.value = dtTo;
       						}
       					}else */
       					if("" != formObj.f_bkg_no.value || "" != formObj.f_bl_no.value){
       						formObj.f_bkg_strdt.value = "";
       						formObj.f_bkg_enddt.value = "";
       						dateValidFlag = false;
       					}
       					if(dateValidFlag){
    	   					if(chkCmprPrdSc(formObj.f_bkg_strdt, formObj.f_bkg_enddt)){
    	   				   		sheetObj.DoSearch("./SEE_BMD_0510GS.clt", FormQueryString(formObj) );
    	   				   		//Log Monitor Start
    	   				   		gLogMonitor();
    	   		   	 			//Log Monitor End
    	   					}
       					}else{
       				   		sheetObj.DoSearch("./SEE_BMD_0510GS.clt", FormQueryString(formObj) );
       				   		//Log Monitor Start
       				   		gLogMonitor();
       		   	 			//Log Monitor End
       					}
       				}
       				loadSearchFlag = true;
       				initDatLod = "Y";
			    }
			    break;
           	case "NEW":
           		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd") == "H"){
           			parent.mkNewFrame('OEH Booking Entry', './SEE_BMD_0200.clt');
           		}else{
           			parent.mkNewFrame('Carrier Booking Entry', './SEE_BMD_0500.clt');
           		}
 				break;
           	case "CREATEMBL":
           		if (docObjects[0].RowCount() == 0) {
	   	 			// There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
        		ajaxSendPost(createMBL, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")+'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
    			break;
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(5);
          		rtnary[0]="S";
		   		rtnary[1]="BL";
		   		//2011.12.27 value parameter 
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		rtnary[3]="";
		   		rtnary[4]=document.getElementById('pol');
		   		callBackFunc = "POL_LOCATION_POPLIST";
	   	        modal_center_open('./CMM_POP_0030.clt', rtnary, 810,480,"yes");
    	        /*var rtnVal=window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");*/
    	        break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(5);
          		rtnary[0]="S";
		   		rtnary[1]="BL";
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		rtnary[3]="";
		   		rtnary[4]=document.getElementById('pod');
		   		callBackFunc = "POD_LOCATION_POPLIST";
	   	        modal_center_open('./CMM_POP_0030.clt', rtnary, 810,480,"yes");
//    	        var rtnVal=window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
    	        break;
			case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	 	/*case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "SHIP_TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//	   	 		var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	 		break;
	   	 	case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CNEE_TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//	   	 		var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	 		break;
		   	case "NTFY_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		 		rtnary=new Array(1);
		 		rtnary[0]="1";
		 		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "NTFY_TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//		 		var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		 		break;*/
	   	 	case "PRINT":
	   	 		
	   	 		
			   	 	if (docObjects[0].RowCount() == 0) {
		   	 			// There is no data
		   	 			alert(getLabel('FMS_COM_ALT004'));
		   	 			return;
		   	 		}
					//20170202 적용 #1024 
			   	    formObj.bkg_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
	       			var reqParam='?bkg_seq='  +formObj.bkg_seq.value;
	       			//reqParam += '&v_ofc_cd=' +formObj.u_ofc_cd.value;
	       			//alert("formObj.bkg_seq.value : "+formObj.bkg_seq.value);
	         		popGET('RPT_PRN_0242.clt'+reqParam, '', 780, 530, "scroll:yes;status:no;help:no;");
	   	   
		   		    break;
	   	 		
	//20170201 주석처리   	 		
/*	   	 		if (docObjects[0].RowCount() == 0) {
	   	 			// There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		formObj.bkg_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
				formObj.file_name.value='booking_confirmation_02.mrd';
	   			formObj.title.value='Booking Confirmation';
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + formObj.bkg_seq.value + ']'; // $1
	   			param += '[' + formObj.f_ofc_nm.value + ']';
	   			param += '[' + formObj.f_email.value + ']';		//3
	   			param += '[' + formObj.u_ofc_cd.value + ']';	//4
	   			param += '[' + formObj.f_phn.value + ']';		//5
	   			param += '[' + formObj.f_fax.value + ']';		//6
				//#24658 [GPL] Arrival Notice에다 "Place of Receipt" 추가
				if (prn_ofc_cd == "GPL") {
					param += '[]';								//7
					param += '[Y]';								//8
				} else {
					param += '[]';								//7
					param += '[N]';								//8
				}
	   			formObj.rd_param.value=param;
				formObj.bkg_seq.value=formObj.bkg_seq.value;
				formObj.intg_bl_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
				formObj.rpt_trdp_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "shp_trdp_cd");
				formObj.rpt_biz_tp.value="OEH";
				formObj.rpt_biz_sub_tp.value="BC";
				popPOST(formObj, 'RPT_RD_0010.clt', 'popB_Confirm', 1025, 740);			
				break;   */
	   	 	case "EXCEL":
	        	if(docObjects[0].RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	    			docObjects[0].Down2Excel({ DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1});
	    		}
	   	 		break;
	   	 	case "COPY":
		   	 	if (docObjects[0].RowCount() == 0) {
	   	 			// There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
		   	 	else{
	    			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	    				var paramStr = "";
	    				if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd") == "M"){
	    					paramStr="./SEE_BMD_0500.clt?";
		   	 				paramStr+= "f_cmd=" + COMMAND05;
		   	 				paramStr+= "&bkg_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
		   	 				parent.mkNewFrame('Carrier Booking Entry', paramStr);
	    				}else{
	    					paramStr="./SEE_BMD_0200.clt?";
		   	 				paramStr+= "f_cmd=" + COMMAND05;
		   	 				paramStr+= "&bkg_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
		   	 				parent.mkNewFrame('OEH Booking Entry', paramStr);
	    				}
	   	 			}
	    		}
		   	 	break;
	   	 	case "DELETE":
		   	 	if (docObjects[0].RowCount() == 0) {
	   	 			// There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		ajaxSendPost(checkBlReq, 'reqVal', '&goWhere=aj&bcKey=getCheckBlCreate&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
	   	 																			+'&biz_clss_cd='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
	   	 		break;
	   	 	case "BKG_EDI_POP":	// BKG EDI 전송
		   	 	if (docObjects[0].RowCount() == 0) {
	   	 			// There is no data
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	    		var reqParam = '?&lnr_trdp_cd='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_cd")) 
		 			   + '&trnk_vsl_nm='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_vsl_nm")) 
		 		       + '&trnk_voy='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trnk_voy")) 
		 		       + '&lnr_trdp_nm='+encodeURIComponent(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lnr_trdp_nm"));
	    		
	   	   		popGET('./EDI_BKG_0010.clt'+reqParam, 'EdiBkgEDIList', 600, 500, "scroll:no;status:no;help:no;");
	   	   		break;	
	   	 	case "PROFIT_REPORT":
	   	 		var formObj=document.frm1;
	   	 		var reqParam='?bkg_seq=' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
	   	 		reqParam += '&bkg_no=' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_no");
	   	 		reqParam += '&biz_clss_cd=' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd");
	   	 	    reqParam += '&entry_yn=' + "N";
	   	 		popGET('RPT_PRN_0260.clt'+reqParam, '', 1000, 700, "scroll:yes;status:no;help:no;");
	   	 		break;	
	   	 		
	        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary = new Array(1);
				rtnary[0] = "1";
				//if (typeof (valObj) != 'undefined') {
				//	rtnary[1] = valObj;
				//} else {
				//	rtnary[1] = "";
				//}
	        	callBackFunc = "USER_POPLIST";
	        	modal_center_open('./CMM_POP_0060.clt', rtnary, 556,470,"yes");
	        	break;    	   	 		
	   	}// end switch
		
		//Log Monitor Start:Btn
		if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
		//Log Monitor End:Btn]
		
	}
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_opr_usrid.value=rtnValAry[0];
	}
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
            cal.select(formObj.f_bkg_strdt, formObj.f_bkg_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
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

var obl_decimal_len = "";

function loadPage() {
	var formObj=document.frm1;
	
//	setCondition('S', formObj.f_dt_tp, formObj.f_bkg_strdt, formObj.f_bkg_enddt);
	setCondition('', formObj.f_dt_tp, formObj.f_bkg_strdt, formObj.f_bkg_enddt);
	
	var s_ofc_cd=formObj.s_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.f_ofc_cd.value=s_ofc_cd;
	}
	
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);																																																																												(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var opt_key = "BKG_EDIT_MODE";
	ajaxSendPost(setBkgEditStsCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
 // 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
    //단축키추가.
    setShortcut();
    initFinish();
    
    /* operation 권한이 없는 경우 */    	   		
	var objDisable = false; 
	if (uod_flg == "N"){ 
		objDisable = true;
		formObj.f_opr_usrid.value=usrId;
		formObj.f_opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	   			
	} 
	
    doWork('SEARCHLIST');
}
function setShortcut(){
	/* LHK 20131118 공통으로 처리
	shortcut.add("Alt+4",function() {
		doWork('PROFIT_REPORT');
	});
	*/
	shortcut.add("Alt+G",function() {
		sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
	});
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
	            var headers = [ { Text:getLabel('SEE_BMD_0510_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Seq",     	Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"bkg_sts_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"biz_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },	                         
	                         {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bkg_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"rgst_ofc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"filling_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"prnr_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"prnr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shp_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"shp_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cne_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"cne_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"trnk_voy",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"exp_ref_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lc_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"trkg_svc_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	     	                 {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cstms_svc_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
	     	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"asgn_usr_nm",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"rgst_usrnm",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"sls_usr_nm",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bkg_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
//	            InitViewFormat(0, "bkg_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
//	            InitViewFormat(0, "etd_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	            SetColProperty("bkg_sts_cd", {ComboText:BKGSTSNM, ComboCode:BKGSTSCD} );
	            SetColProperty("biz_clss_cd", {ComboText:'Carrier Booking|Customer Booking', ComboCode:'M|H'} );
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(480);
		   }                                                      
		break;
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.GetSelectCol();
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
   	doProcess=true;
   	formObj.f_cmd.value="";
   	var paramStr = "";
   	
   	if(sheetObj.GetCellValue(Row,"biz_clss_cd") == "M"){
   		paramStr="./SEE_BMD_0500.clt?f_cmd="+SEARCHLIST+"&f_lnr_bkg_no="+sheetObj.GetCellValue(Row,"lnr_bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq")+"&f_bkg_no="+sheetObj.GetCellValue(Row,"bkg_no");
   	   	parent.mkNewFrame('Carrier Booking Entry', paramStr,"SEE_BMD_0500_SHEET_"+sheetObj.GetCellValue(Row,"lnr_bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq")+"_"+sheetObj.GetCellValue(Row,"bkg_no"));
   	}else{
   		paramStr="./SEE_BMD_0200.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+sheetObj.GetCellValue(Row,"bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq");
   	   	parent.mkNewFrame('OEH Booking Entry', paramStr,"SEE_BMD_0200_SHEET_"+sheetObj.GetCellValue(Row,"bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq"));
   	}
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	var s_code=obj.value.toUpperCase();
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else{
					s_type=str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else{
					s_type=str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
//			}
		}
//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	if(frm1.f_cmd.value==REMOVE){
		doWork("SEARCHLIST");
	}
	
	if(sheetObj.GetCellValue(1, "biz_clss_cd") == "M"){
		getBtnObj('btn_CreateMBL').style.display="inline";
		getBtnObj('btn_BkgEdi').style.display="inline";
	}else{
		getBtnObj('btn_CreateMBL').style.display="none";
		getBtnObj('btn_BkgEdi').style.display="none";
	}
	
	if(sheetObj.GetCellValue(1, "biz_clss_cd") == "H"){
		getBtnObj('btnPrint').style.display="inline";
	}else{
		getBtnObj('btnPrint').style.display="none";
	}
	
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
	
	for(var i=1; i<=docObjects[0].LastRow();i++){
		docObjects[0].SetCellFont("FontUnderline", i,"filling_no",i,"filling_no",1);
		docObjects[0].SetCellFontColor(i, "filling_no","#0000FF");
		
		docObjects[0].SetCellFont("FontUnderline", i,"hbl_no",i,"hbl_no",1);
		docObjects[0].SetCellFontColor(i, "hbl_no","#0000FF");
	}
}

function checkBlReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	var biz_clss_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd");
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			if(biz_clss_cd == "M"){
				//Cannot delete because MB/L was Created!
	   	 		alert(getLabel('FMS_COM_ALT092'));
			}else{
				//Cannot delete because HB/L was Created!
	   	 		alert(getLabel('FMS_COM_ALT068'));
			}
		}
		else{
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
																			  +'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
			
			if(getBkgEditMode(v_bkg_sts_cd) != "Y"){
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			} else {
				//'Do you want to delete?')){
				if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 			formObj.f_cmd.value=REMOVE;
	   	 			formObj.bkg_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
		   	 		if(biz_clss_cd == "M"){
		   	 			docObjects[0].DoSearch("./SEE_BMD_0510GS.clt", FormQueryString(formObj) );
					}else{
						docObjects[0].DoSearch("./SEE_BMD_0210GS.clt", FormQueryString(formObj) );
					}
	 			}
			}
		}
	}
}

function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj=document.frm1;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	formObj.f_shp_mod_cd.selectedIndex=0;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	formObj.f_bkg_sts_cd.value = "";
	formObj.f_biz_clss_cd.value = "";
	if (uod_flg == "N"){ 
		formObj.f_opr_usrid.value=usrId;
	}
	//#1244 [Booking List] Don't remain default options when clicking Clear button
	formObj.f_bl_cd.selectedIndex=0;
	formObj.f_dt_tp.selectedIndex=0;
	formObj.f_sel_trdp_tp.selectedIndex=0;
	formObj.f_sel_cd.selectedIndex=0;
	formObj.f_isb_pic_sel_cd.selectedIndex=0;
	setCondition('', formObj.f_dt_tp, formObj.f_bkg_strdt, formObj.f_bkg_enddt);
	
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.f_bkg_strdt, frm1.f_bkg_enddt)){
		return false;
	}
	/*if(!frm1.f_lnr_bkg_chk.checked && !frm1.f_bkg_chk.checked){
		alert(getLabel('SEA_COM_ALT033'));
		return false;
	}*/
	return true;
}
//Calendar flag value
var firCalFlag=false;
function searchValueSet(){
	var formObj = document.frm1;
	
	formObj.f_prnr_trdp_nm.value="";
	formObj.f_shpr_trdp_nm.value="";
	formObj.f_cnee_trdp_nm.value="";
	formObj.f_ntfy_trdp_nm.value="";
	formObj.f_ahpr_trdp_nm.value="";
	
	formObj.f_mbl_no.value="";
	formObj.f_hbl_no.value="";
	
	formObj.f_po_no.value="";
	formObj.f_lc_no.value="";
	
	if(formObj.f_sel_trdp_tp.value == "PRNR"){
		formObj.f_prnr_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "SHPR"){
		formObj.f_shpr_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "CNEE"){
		formObj.f_cnee_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "NTFY"){
		formObj.f_ntfy_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "AHPR"){
		formObj.f_ahpr_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}
	
	if(formObj.f_bl_cd.value == "MBL_No"){
		formObj.f_mbl_no.value=formObj.f_bl_no.value;
	}else if(formObj.f_bl_cd.value == "HBL_No"){
		formObj.f_hbl_no.value=formObj.f_bl_no.value;
	}
	
	if(formObj.f_sel_cd.value == "PO_NO"){
		formObj.f_po_no.value=formObj.f_sel_no.value;
	}else if(formObj.f_sel_cd.value == "LC_NO"){
		formObj.f_lc_no.value=formObj.f_sel_no.value;
	}
	
	/*if(formObj.f_lnr_bkg_chk.checked && formObj.f_bkg_chk.checked){
		formObj.f_biz_clss_cd.value="";
	}else{
		if(formObj.f_lnr_bkg_chk.checked){
			formObj.f_biz_clss_cd.value="M";
		}
		if(formObj.f_bkg_chk.checked){
			formObj.f_biz_clss_cd.value="H";
		}
	}*/
}
function searchValueClear(type){
	formObj = document.frm1;
	
	if(type == "TRDP"){
		formObj.f_sel_trdp_nm.value="";
	} else if(type == "BL"){
		formObj.f_bl_no.value="";
	} else if(type == "USER"){
		if (uod_flg != "N"){ 
			formObj.f_opr_usrid.value = "";
		}
	} else {
		formObj.f_sel_no.value="";
	}
}
function POL_LOCATION_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POD_LOCATION_POPLIST(rtnVal){
	formObj = document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}
function TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
        else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_sel_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
/*function SHIP_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
function CNEE_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
	}  
}
function NTFY_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ntfy_trdp_nm.value=rtnValAry[2];//full_nm
	}     
}*/

function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	
	if(sheetObj.GetCellValue(Row, "biz_clss_cd") == "M"){
		getBtnObj('btn_CreateMBL').style.display="inline";
		getBtnObj('btn_BkgEdi').style.display="inline";
		getBtnObj('btnPrint').style.display="none";
	}else{
		getBtnObj('btn_CreateMBL').style.display="none";
		getBtnObj('btn_BkgEdi').style.display="none";
		getBtnObj('btnPrint').style.display="inline";
	}
	
	/* #1890 [PATENT] Booking List, Consolidation List 개선 사항 - 링크 등 추가 */
	var paramStr = "";
	
	switch (sheetObj.ColSaveName(Col)) {
		case "filling_no" :
			if(sheetObj.GetCellValue(Row, "filling_no") == ''){
				return;
			}			
			paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(sheetObj.GetCellValue(Row, "filling_no"));
			parent.mkNewFrame("Master B/L Entry", paramStr,"SEE_BMD_0040_SHEET_"+sheetObj.GetCellValue(Row,"filling_no"));
   	   		break;
   	   		
		case "hbl_no" :
			if(sheetObj.GetCellValue(Row, "hbl_no") == ''){
				return;
			}			
			paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(sheetObj.GetCellValue(Row, "hbl_no"));
			parent.mkNewFrame("House B/L Entry", paramStr,"SEE_BMD_0020_SHEET_"+sheetObj.GetCellValue(Row,"hbl_no"));
   	   		break;
   	   			
	}
}

function createMBL(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
		//if(doc[1]=='N'){
		if(true){
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
																			  +'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
			//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			if(v_bkg_sts_cd == "CF" || v_bkg_sts_cd == "BL"){
				ajaxSendPost(getLnrBkgNo, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgNo&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq"), './GateServlet.gsl');

				if(v_lnr_bkg_no == ""){
					alert(getLabel('SAVE_CARRIER_BOOKING_ENTRY'));
					return;
				}
				if (v_bkg_sts_cd == 'BL'){
					if(!confirm(getLabel('FMS_COM_ALT142'))){
						return;
					}
				}
				//C.W Park.
				//동일한 BKG_NO가 존재할 경우 Bug발생으로 Seq 까지 추가함.
				var paramStr="./SEE_BMD_0040.clt?f_cmd=130&f_lnr_bkg_no="+v_lnr_bkg_no + "&f_bkg_seq=" 
				+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
				+ "&bkg_to_bl_flag=Y";
				parent.mkNewFrame('Master B/L Entry', paramStr);
			} else{
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			}
		}else{
			alert(getLabel('FMS_COM_ALT096'));
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
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

var v_lnr_bkg_no = "";

function getLnrBkgNo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_lnr_bkg_no = doc[1];
		}
	}
}

function setBkgEditStsCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		BKG_EDIT_MODE = doc[1];
	}else{
		BKG_EDIT_MODE = "[CR]:Y,[RD]:N,[RJ]:Y,[CF]:N,[CN]:Y,[BL]:N";
	}
}

function getBkgEditMode(bkg_sts_cd){
	var rtnValAry=BKG_EDIT_MODE.split(",");
	var bkg_edit_mode = "N";
	
	for (var i=0; i < rtnValAry.length; i++) {
		var result = rtnValAry[i].split(":");
		if(result[0] == "[" + bkg_sts_cd + "]"){
			bkg_edit_mode = result[1];
		}
	}
	
	return bkg_edit_mode;
}

function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = doc[1];
	}else{
		obl_decimal_len = "3";
	}
}
