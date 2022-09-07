/**
 * 화면로드 후 초기값 세팅
 */
var rtnary=new Array(3);
var callBackFunc = "";
var amsAutoBlckCond = "";
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!chkSearchCmprPrd(false, frm1.f_dnld_strdt, frm1.f_dnld_enddt)){
    	   				return;
    	   		}
			   	formObj.f_cmd.value=SEARCHLIST01;
			   	sheetObj1.DoSearch("./SEE_AMS_0030GS.clt", FormQueryString(formObj));
			   	
    	   	break;
    	   	case "DOWNLOAD":
			    formObj.f_cmd.value=COMMAND01;
			    sheetObj1.DoSearch("./SEE_AMS_0030GS.clt", FormQueryString(formObj) );
    	   	break;
    	   	case "VERIFY":
				// OFVFOUR-8251 [Urgent] [NTL NAIGAI TRANS] OI AMS B/L EDI got the error message
				// OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
				//checkImpPostRef();
    	   		if(sheetObj1.CheckedRows("chk") == 0){
    	   			alert(getLabel('FMS_COM_ALT004'));
    	   			return;
    	   		}
			    formObj.f_cmd.value=COMMAND02;
			    sheetObj1.DoAllSave("./SEE_AMS_0030GS.clt", {Param : FormQueryString(formObj), Col : false, Sync:1});
			    
			    
    	   	break;
    	   	case "MASTER_HISTORY_PRINT":
    	   		formObj.file_name.value='ams_master_history.mrd';
	        	formObj.title.value='AMS MASTER B/L HISTORY';
	        	formObj.mailTitle.value='AMS MASTER B/L HISTORY [MBL NO. : ' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "refnbr") + ']';
	        	var refnbr=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "refnbr");
				var param='[' + refnbr + ']';				// [1]
				formObj.rd_param.value=param;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	    	   	break;
	    	case "HISTORY_PRINT":
    	   		formObj.file_name.value='ams_history.mrd';
	        	formObj.title.value='AMS HOUSE B/L HISTORY';
	        	formObj.mailTitle.value='AMS HOUSE B/L HISTORY [HBL NO. : ' + sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr") + ']';
	        	var blnbr=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr");
				var param='[' + blnbr + ']';				// [1]
				formObj.rd_param.value=param;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	    	   	break;   	
    	   	case "CREATE_BL":
    	   		// #20446 [BINEX] Smartlink에서 AMS을 다운 하고 Creation시 BL이 이미 creation이 되어 있으면 BLOCK
    	   		//- Master BL 없는 경우 Master BL creation (FILLING NO 생성)
    	   		//- Master BL 이 있는 경우 House BL NBR check.
    	   		//- House BL 이 없는 경우 House BL creation 
    	   		//- House BL 이 있는 경우 "BL Already on File. Please check from House BL List)
    	   		// HBL
    	   		/*
				var hbl_no=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr");
    	   		if (hbl_no != '') {
    	   			alert('BL Already on File. Please check from House BL List');
    	   			return;
    	   		}
    	   		*/
    	   		if(formObj.f_cmd.value != COMMAND02){
    	   			//alert(sheetObj1.GetSaveString(true));
    	   			alert("Create BL After Verify");
    	   			return;
    	   		}
				//OFVFOUR-8251 [Urgent] [NTL NAIGAI TRANS] OI AMS B/L EDI got the error message
				//OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
				// if (post_dt_imp == "" || post_dt_imp == "D-ETA"){
				// 	alert(getLabel("SEA_COM_ALT044"));
				// 	return;
				// }
    	   		//if(!validateCreateBl()) return;
    	   		//Bug #27617 : User가 입력한 MBL 과 AMS DOWNLOAD MBL 번호가 중복된 MBL 존재시 Warnning
    	   		var mblNoFlg="";
    	   		var mblNo="";
	   			for(var i=2; i<=docObjects[0].LastRow()+1; i++){
	   				if(docObjects[0].GetCellValue(i, "chk") == "1"){
	   					mblNoFlg=docObjects[0].GetCellValue(i, "mbl_no_flg");
	   					if(mblNoFlg == "Y" && (mblNo != docObjects[0].GetCellValue(i, "refnbr")) ){
	   						mblNo=docObjects[0].GetCellValue(i, "refnbr");
		   					if(!confirm("MBL No  ["  + mblNo + "] is already exist. Would you still like to create B/L ?" )) return;
		   				}
	   				}
	   			}
	   			
	   			if(amsAutoBlckCond.indexOf("BL CREATION") >= 0 ){
	   				if(!confirm("Create BL ?" + "\n" + getLabel('SEA_COM_ALT037') ) ){
	   					return;
	   				}else{
	   					//block 처리
	   					for(var i=2; i<=docObjects[0].LastRow()+1; i++){
	   						if(docObjects[0].GetCellValue(i, "chk") == "1"){
	   							docObjects[0].SetCellValue(i, "blck_flg", "1", 0); 
		   						var msgNo=docObjects[0].GetCellValue(i, "msg_no");
			   					frm2.blNo.value=docObjects[0].GetCellValue(i, "blnbr");
			   					frm2.scacCd.value=docObjects[0].GetCellValue(i, "scac");
			   					frm2.blockFlg.value="Y"
		   						ajaxSendPost(smtBlockCall, 'reqVal', '&goWhere=aj&bcKey=updateSmtAmsBLBlckFlg&msg_no='+msgNo+'&scac_cd='+frm2.scacCd.value+'&blnbr='+frm2.blNo.value+'&blck_flg='+frm2.blockFlg.value+'&blck_usrid='+frm1.user_id.value, './GateServlet.gsl');
		   					}
	   					}
	   					
	   				}
	   			}else{
	   				if(!confirm("Create BL ?")) return;
	   			}
    	   		
    	   		
			    formObj.f_cmd.value=COMMAND03;
			    sheetObj1.DoAllSave("./SEE_AMS_0030GS.clt", FormQueryString(formObj));
    	   	break;
			case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
    	        callBackFunc = "POL_LOCATION_POPLIST";
    	        modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,415,"yes");
			break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="SEA";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
		   		
		   		callBackFunc = "POD_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,415,"yes");
			break;
			case "VIEW_AMS_MBL":
				if(sheetObj1.GetTotalRows() < 1){
					return;
				}
				if(sheetObj1.GetSelectRow() == -1){
					sheetObj1.SetSelectRow(2);
				}
           		rtnary=new Array(2);
           		rtnary[0]=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "msg_no");
           		rtnary[1]=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr");
           		var msgNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "msg_no");
           		var blnbr=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr");
           		callBackFunc = "VIEW_AMS_MBL";
		   		modal_center_open('./SEE_AMS_0040.clt?f_cmd='+SEARCHLIST01+'&blnbr=' + blnbr+'&msg_no=' + msgNo, rtnary, 825,466,"yes");
		   		
			break;
			case "VIEW_AMS_HBL":
				if(sheetObj1.GetTotalRows() < 1){
					return;
				}
				if(sheetObj1.GetSelectRow() == -1){
					sheetObj1.SetSelectRow(2);
				}
           		rtnary=new Array(2);
           		rtnary[0]=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "msg_no");
           		rtnary[1]=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr");
           		var msgNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "msg_no");
           		var blnbr=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "blnbr");
           		callBackFunc = "VIEW_AMS_HBL";
		   		modal_center_open('./SEE_AMS_0050.clt?f_cmd='+SEARCHLIST01+'&blnbr=' + blnbr+'&msg_no=' + msgNo, rtnary, 980,563,"yes");
		   		
			break;
			//#25561 AMS List 에 Tracking 기능 추가			
			case "CARGO_TRACKING":
		   	 	if(sheetObj1.GetTotalRows()== 0){
		   	 		//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
		   	 	}
		   	 	else{
		   	 		var blNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "refnbr");
		   	 		var preBlNo=blNo.substring(0,4);
		   	 		var popLink="";
		   	 		var reqParam=""; 
		   	 		/* jsjang 2013.8.20 #19202 carrier link */
		   	 		var cntrNo=sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), "cntr_no");
	   	 			/* jsjang 2013.9.11 #20775 carrier link - MBL */
		   	 		if(blNo == '' || blNo == null)
		   	 		{		   	 		
		   	 			if(cntrNo == '' || cntrNo == null)
			   	 		{
				   	 		alert(getLabel('FMS_COM_ALT051'));
			   	 		}else{
				   	 		/* jsjang 2013.8.20 #19202 carrier link */
				   	 		popLink='http://connect.track-trace.com/for/opus/container/'+cntrNo+'/action,direct';
				   	 		window.open(popLink + reqParam, "_blank");
			   	 		}
		   	 		}else{
			   	 		popLink='http://connect.track-trace.com/for/opus/billoflading/'+blNo+'/action,direct';
			   	 		window.open(popLink + reqParam, "_blank");
		   	 		}		   	 			
				}
		   	break;
			case "OFFICE_POPLIST":
				rtnary=new Array(1);
		   		rtnary[0]="1";
	   	        
	   	        callBackFunc = "OFFICE_POPLIST";
		        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,550,"yes");
	   	        break;
	   	        
	   	 	case "EXCEL":
		   	 	if(docObjects[0].RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   	 		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		   		}
	   	 	break;
		   	case "EXCEL_ALL":
			   		// Check if don't have data on grid, don't allow downloading excel file.
					if(docObjects[0].RowCount() < 1){ //no data	
		    			ComShowCodeMessage("COM132501");
		    		}else{
		        	excelDown(docObjects[0]);
		    		}
			break;	   	 	
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_AMS_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_AMS_0010.002");
        }
	}
}

function POL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}

function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	}
}

function OFFICE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
//		formObj.f_ofc_cd.value=rtnValAry[0];
		formObj.f_ofc_cd.value=rtnValAry[0];
	}
}

function excelDown(mySheet){
	
	var formObj = document.frm1;
	
//	if(!formValidation()){
//		
//		return;
//	}
//	
//	if(formObj.f_strdt.value == ""){
//		ComShowCodeMessage("COM132602");
//		formObj.f_strdt.focus();
//		return;
//	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,Merge:1
					,URL:"./SEE_AMS_0030.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}

function validateCreateBl(){
	var vslCd="";
	var lnrCd="";
	var shprCd="";
	var cneeCd="";
	var ntfyCd="";
	var polCd="";
	var podCd="";
	var delCd="";
	var porCd="";
	for(var i=2; i<=docObjects[0].LastRow()+1; i++){
		if(docObjects[0].GetCellValue(i, "chk") == "1"){
			polCd=docObjects[0].GetCellValue(i, "pol_cd");
			podCd=docObjects[0].GetCellValue(i, "pod_cd");
			delCd=docObjects[0].GetCellValue(i, "del_cd");
			porCd=docObjects[0].GetCellValue(i, "por_cd");
			vslCd=docObjects[0].GetCellValue(i, "vsl_cd");
			lnrCd=docObjects[0].GetCellValue(i, "lnr_cd");
			shprCd=docObjects[0].GetCellValue(i, "shpr_cd");
			cneeCd=docObjects[0].GetCellValue(i, "cnee_cd");
			ntfyCd=docObjects[0].GetCellValue(i, "ntfy_cd");
			if(polCd == ""){
				alert("POL should be Code Mapping : " +  (i-1) + " Row " );
				return false;
			}
			if(podCd == ""){
				alert("POD should be Code Mapping : " + (i-1) + " Row " );
				return false;
			}
			/*
			if(delCd == ""){
				alert("DEL should be Code Mapping : " + (i-1) + " Row " );
				return false;
			}
			if(porCd == ""){
				alert("POR should be Code Mapping : " + (i-1) + " Row " );
				return false;
			}
			if(shprCd == ""){
				alert("Shipper should be Code Mapping : " + (i-1) + " Row " );
				return false;
			}
			if(cneeCd == ""){
				alert("Consignee should be Code Mapping : " + (i-1) + " Row " );
				return false;
			}
			if(ntfyCd == ""){
				alert("Notify should be Code Mapping : " +  (i-1) + " Row " );
				return false;
			}
			if(lnrCd == ""){
				alert("Carrier should be Code Mapping : " +  (i-1) + " Row " );
				return false;
			}
			*/
			//alert(docObjects[0].CellValue(i, "blpkgu"));
		}
	}
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
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
//            var cal=new calendarPopupFromTo();
//            var cal=new ComCalendar();
//            cal.select(formObj.f_dnld_strdt, formObj.f_dnld_enddt, 'MM-dd-yyyy');
            var cal=new ComCalendarFromTo();
            cal.select(formObj.f_dnld_strdt, formObj.f_dnld_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE2':   //달력 조회 From ~ To 팝업 호출 
//            var cal=new calendarPopupFromTo();
//            cal.displayType="date";
//            cal.select(formObj.f_etd_strdt, 'f_etd_strdt', formObj.f_etd_enddt, 'f_etd_enddt', 'MM-dd-yyyy');
            
            var cal=new ComCalendarFromTo();
            cal.select(formObj.f_etd_strdt, formObj.f_etd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE3':   //달력 조회 From ~ To 팝업 호출 
//            var cal=new calendarPopupFromTo();
//            cal.displayType="date";
//            cal.select(formObj.f_eta_strdt, 'f_eta_strdt', formObj.f_eta_enddt, 'f_eta_enddt', 'MM-dd-yyyy');
            
            var cal=new ComCalendarFromTo();
            cal.select(formObj.f_eta_strdt, formObj.f_eta_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
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
function loadPage() {
	var formObj=document.frm1;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //ETD 계산
	var now=new Date(); 	
	var nxtDt=new Date(Date.parse(now) + 0 * 1000 * 60 * 60 * 24);
	var preDt=new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24);
	var nxtyear=nxtDt.getFullYear(); 			
	var nxtmonth=nxtDt.getMonth() + 1;
	var nxtdate=nxtDt.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	var predate=preDt.getDate();
	if(nxtmonth < 10){
		nxtmonth="0"+(nxtmonth);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(nxtdate < 10){
		nxtdate="0"+nxtdate;
	}
	if(predate < 10){
		predate="0"+predate;
	}
	PREDATE=premonth + "-" + predate + "-" + preyear;
	NXTDATE=nxtmonth + "-" + nxtdate + "-" + nxtyear;
    formObj.f_dnld_strdt.value=PREDATE;
    formObj.f_dnld_enddt.value=NXTDATE;
    
    var opt_key = "AMS_AUTO_BLOCK_CONDITION";
	ajaxSendPost(setAmsAutoBlckCondReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	//OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site
	IBS_RestoreGridSetting(formObj.user_id.value, formObj.pageurl.value, docObjects[0], false, "fnRestoreGridSetEnd");
	var opt_key = "AMS_ENABLE_CHK_FLG";
	ajaxSendPost(setAmsEnableChkFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	doWork("SEARCHLIST");
}

function setAmsAutoBlckCondReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		amsAutoBlckCond=doc[1];
	} else {
		amsAutoBlckCond="";
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
		      with(sheetObj){
       
         var cnt=0;

         SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0, FrozenCol: 7} );

         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('SEE_AMS_0030_HDR1'), Align:"Center"},
                   { Text:getLabel('SEE_AMS_0030_HDR2'), Align:"Center"} ];
         InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"vsl_fullname",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"vsl_voyage",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"refnbr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"filling_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"blnbr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"CheckBox",  Hidden:0, Width:28,   Align:"Center",  ColMerge:0,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"CheckBox",  Hidden:0, Width:35,   Align:"Center",  ColMerge:0,   SaveName:"blck_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck: 0, TrueValue:"Y", FalseValue:"N" },
             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"dl_sts_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cust_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Date",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:0,   SaveName:"msg_date",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:87,   Align:"Center",  ColMerge:0,   SaveName:"type",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"err_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"bl_sts",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"cust_ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_ams",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:5 },
             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"h_pol_etd",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_ams",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_eta",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"por_fullname",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:50 },
             {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"del_ams",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
             {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"carr_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"agt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"shpr_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"cnee_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             {Type:"PopupEdit", Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
             {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"cntr_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"blpkg",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"blpkgu",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"blkg",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"bllbs",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"blvol",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
             //OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site
             {Type:"Date",	    Hidden:0,  Width:75,	Align:"Center",	 ColMerge:0,	SaveName:"dnld_date",	KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
         //    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ref_no" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vsl_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_nm" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nm" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nm" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nm" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"agt_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:0,   SaveName:"blwgt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"blwgtu",        KeyField:0,   CalcLogic:"",   Format:"" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_add" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_add" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_add" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"scac" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"disp_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_cd" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mblpkg" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mbl_no_flg" },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } ];
          
	         InitColumns(cols);
	         SetEditable(1);
//	         InitViewFormat(0, "msg_date", "MM\\-dd\\-yyyy");
//	         InitViewFormat(0, "h_pol_etd", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
//	         InitViewFormat(0, "pod_eta", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	         SetColProperty(0 ,"pol_ams" , {AcceptKeys:"N"});
	         SetColProperty(0 ,"pod_ams" , {AcceptKeys:"N"});
	         SetColProperty(0 ,"del_ams" , {AcceptKeys:"N"});
	         SetFocusAfterProcess(1);
	         SetSheetHeight(430);
	         resizeSheet();
	         //OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site
	         SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
         }


		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='blnbr'){
		if(sheetObj.GetCellValue(Row,"filling_no") == ""){
			 return;
		}
		var formObj=document.frm1;
		var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row,"blnbr"); //"&f_intg_bl_seq="+sheetObj.GetCellValue(Row,"intg_bl_seq")+
	   	parent.mkNewFrame('Booking & HB/L Entry', paramStr, "SEI_BMD_0020_SHEET_" + sheetObj.GetCellValue(Row,"blnbr")); 
	}else if(colStr=='refnbr'){
		if(sheetObj.GetCellValue(Row,"filling_no") == "" ){
		 	return;
		}
		var formObj=document.frm1;
	   	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
	   	paramStr+= '&f_ref_no='+sheetObj.GetCellValue(Row, 'filling_no');
	   	paramStr+= '&f_bl_no='+sheetObj.GetCellValue(Row, 'refnbr');
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEI_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'filling_no') + "_" + sheetObj.GetCellValue(Row, 'refnbr'));		
	}else if(colStr=='filling_no'){
		if(sheetObj.GetCellValue(Row,"filling_no") == ""){
		 	return;
		}
		var formObj=document.frm1;
	   	var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
	   	paramStr+= '&f_ref_no='+sheetObj.GetCellValue(Row, 'filling_no');
	   	paramStr+= '&f_bl_no='+sheetObj.GetCellValue(Row, 'refnbr');
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEI_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'filling_no') + "_" + sheetObj.GetCellValue(Row, 'filling_no'));		
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
var row = -1;
var col = "";
function sheet1_OnPopupClick(sheetObj,Row,Col){
	row = Row;
	col = Col;
    switch (sheetObj.ColSaveName(Col)) {
	    case "pol_ams" :
	    case "pod_ams" :
	    case "del_ams" :
            rtnary=new Array(1);
            rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]="";
	   		callBackFunc = "DEL_AMS";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
        break;
        case "por_fullname" :
            rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]="";
	   		rtnary[3]=sheetObj.GetCellValue(Row, Col);
			rtnary[4]="POR";
   	        
   	        callBackFunc = "POR_FULLNAME";
	   		modal_center_open('./CMM_POP_0390.clt', rtnary, 806,480,"yes");
        break;
	    case "carr_nm" :
	        rtnary=new Array();
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		rtnary[3]=sheetObj.GetCellValue(Row, Col);
		    callBackFunc = "CARR_NM"; //#52744 [ZEN] OI AMS LIST에서 BL CREATE하면, CARRIER & PACKAGE 정보 자동 입력 안됨 CARRIER 만 적용 		
	   		modal_center_open('./CMM_POP_0380.clt', rtnary, 812,530,"yes");
		break;
	    case "shpr_nm" :
	    case "cnee_nm" :
	    case "ntfy_nm" :
	    case "agt_nm" :
	        rtnary=new Array();
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		rtnary[3]=sheetObj.GetCellValue(Row, Col);
		    callBackFunc = "AGT_NM";
	   		modal_center_open('./CMM_POP_0380.clt', rtnary, 812,530,"yes");
	    break;
		case "vessel_code":		
    		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
      		callBackFunc = "VESSEL_CODE";
	   		modal_center_open('./CMM_POP_0140.clt', rtnary, 657,480,"yes");
    	break;
    }
}

function DEL_AMS(rtnVal){
	var sheetObj = docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row,  sheetObj.SaveNameCol("lnr_cd"),rtnValAry[0]);
		if(col == sheetObj.SaveNameCol("pol_ams")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("pol_cd"),rtnValAry[0]);
		}else if(col == sheetObj.SaveNameCol("pod_ams")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("pod_cd"),rtnValAry[0]);
		}else if(col == sheetObj.SaveNameCol("del_ams")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("del_cd"),rtnValAry[0]);
		}
		sheetObj.SetCellValue(row, col,rtnValAry[3]);//ams_loc_val
		docObjects[0].SetCellFontColor(row, col,"#000000");
	}
 }

function POR_FULLNAME(rtnVal){
	var sheetObj = docObjects[0];
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, Col,rtnValAry[2]);//ams_loc_val
		sheetObj.SetCellValue(row, sheetObj.SaveNameCol("por_cd"),rtnValAry[0]);
		docObjects[0].SetCellFontColor(row, col,"#000000");
	}
}

function VESSEL_CODE(rtnVal){
	var sheetObj = docObjects[0];
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		if(col == sheetObj.SaveNameCol("carr_nm")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("lnr_cd"),rtnValAry[0]);
		}else if(col == sheetObj.SaveNameCol("shpr_nm")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("shpr_cd"),rtnValAry[0]);
		}else if(col == sheetObj.SaveNameCol("cnee_nm")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("cnee_cd"),rtnValAry[0]);
		}else if(col == sheetObj.SaveNameCol("ntfy_nm")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("ntfy_cd"),rtnValAry[0]);
		}else if(col == sheetObj.SaveNameCol("agt_nm")){
			sheetObj.SetCellValue(row, sheetObj.SaveNameCol("agt_cd"),rtnValAry[0]);
		}
		sheetObj.SetCellValue(row, col,rtnValAry[2]);
		docObjects[0].SetCellFontColor(row, col,"#000000");
	}
}
function AGT_NM(rtnVal){
	var sheetObj = docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
  		var rtnValAry=rtnVal.split("|");
  		sheetObj.SetCellValue(row, col,rtnValAry[0]);
		sheetObj.SetCellValue(row, col,rtnValAry[1]);
		docObjects[0].SetCellFontColor(row, col,"#000000");
	}
}


//#52744 [ZEN] OI AMS LIST에서 BL CREATE하면, CARRIER & PACKAGE 정보 자동 입력 안됨 CARRIER 만 적용 						
function CARR_NM(rtnVal){
	var sheetObj = docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
  		var rtnValAry=rtnVal.split("|");
  		sheetObj.SetCellValue(row, "lnr_cd",rtnValAry[0]);
		sheetObj.SetCellValue(row, "carr_nm",rtnValAry[1]);
		docObjects[0].SetCellFontColor(row, "carr_nm","#000000");
	}
}

var ifmIdx=0;
var ctlCol=0;
var ctlRow=0;
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "liner_code" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('liner', sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
    	case "pol_ams" :
    	case "pod_ams" :
    	case "del_ams" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('location_ams', sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
		case "vessel_code" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('vessel', sheetObj.GetCellValue(Row, Col),   'Sheet');
		break;
		case "blck_flg" :	//Smartlink AMS BL Block 처리
			var msgNo=sheetObj.GetCellValue(Row, "msg_no");
			frm2.blNo.value=sheetObj.GetCellValue(Row, "blnbr");
			frm2.scacCd.value=sheetObj.GetCellValue(Row, "scac");
			if(sheetObj.GetCellValue(Row, "dl_sts_nm") == "BL Created" && sheetObj.GetCellValue(Row, Col) == 0 ){
				if(!confirm ("This B/L has already been created. Would you still like to proceed with the unblocking?")){
					sheetObj.SetCellValue(Row, Col,1,0);
					return;
				}
				sheetObj.SetCellValue(Row, Col,0,0);
			}
			if(sheetObj.GetCellValue(Row, Col) == 1){
				if(confirm ("Do you want to block [" + frm2.blNo.value + "] ?")){
					frm2.blockFlg.value="Y"
				}else{
					sheetObj.SetCellValue(Row, Col,0,0);
					return;
				}
			}else{
				if(confirm ("Do you want to unblock [" + frm2.blNo.value + "] ?")){
					frm2.blockFlg.value="N"
				}else{
					sheetObj.SetCellValue(Row, Col,1,0);
					return;
				}
			}
			ajaxSendPost(smtBlockCall, 'reqVal', '&goWhere=aj&bcKey=updateSmtAmsBLBlckFlg&msg_no='+msgNo+'&scac_cd='+frm2.scacCd.value+'&blnbr='+frm2.blNo.value+'&blck_flg='+frm2.blockFlg.value+'&blck_usrid='+frm1.user_id.value, './GateServlet.gsl');
			//frm2.target = "result" + ifmIdx;
			//ifmIdx++;
			//frm2.submit();
		break;
	}
}
/**
 * code name select
 */
var CODETYPE='';
function codeNameAction(str, obj, tmp){
	if(obj.value != ""){
		if(tmp=="Sheet"){
			if(str=='liner'){
				str='trdpcode';
				CODETYPE='liner';
			}else if(str=="location_ams"){
				str='location_ams';
				CODETYPE='location_ams';	
			}else if(str=="vessel"){
				str='srvessel';
				CODETYPE='vessel';
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+obj, './GateServlet.gsl');			
		}
	}
}
//코드표시 Ajax
function smtBlockCall(reqVal){
	var sheetObj1=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != "1"){	//ERROR 발생 GRID 값 원복
				sheetObj1.SetCellValue(sheetObj1.GetSelectRow(), "blck_flg",(frm2.blockFlg.value=="N" ? 1 : 0),0);
				alert(doc[1]);
			}
		}
	}
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
			if(CODETYPE == "location_ams"){
				sheetObj.SetCellValue(ctlRow, ctlCol,masterVals[0],0);
				if(ctlCol == sheetObj.SaveNameCol("pol_ams")){
					sheetObj.SetCellValue(ctlRow, sheetObj.SaveNameCol("pol_cd"),masterVals[2]);
				}else if(ctlCol == sheetObj.SaveNameCol("pod_ams")){
					sheetObj.SetCellValue(ctlRow, sheetObj.SaveNameCol("pod_cd"),masterVals[2]);
				}else if(ctlCol == sheetObj.SaveNameCol("del_ams")){
					sheetObj.SetCellValue(ctlRow, sheetObj.SaveNameCol("del_cd"),masterVals[2]);
				}
				docObjects[0].SetCellFontColor(ctlRow, ctlCol,"#000000");
				//alert(masterVals[2]);	
			}
		}else{
			if(CODETYPE == "location_ams"){
				sheetObj.SetCellValue(ctlRow, ctlCol,"",0);
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	for(var i=2; i<=docObjects[0].LastRow()+1; i++){
		docObjects[0].SetCellFontColor(i,'refnbr',"#0000FF");
		docObjects[0].SetCellFontColor(i,'filling_no',"#0000FF");
		docObjects[0].SetCellFontColor(i,'blnbr',"#0000FF");
		if(docObjects[0].GetCellValue(i, "blwgtu") == "KG"){
			docObjects[0].SetCellValue(i, "blkg",docObjects[0].GetCellValue(i, "blwgt"));
			docObjects[0].SetCellValue(i, "bllbs",roundXL(docObjects[0].GetCellValue(i, "blwgt") * CNVT_CNST_KG_LB, 2));
		}else if(docObjects[0].GetCellValue(i, "blwgtu") == "LB"){
			docObjects[0].SetCellValue(i, "blkg",roundXL(docObjects[0].GetCellValue(i, "blwgt") / CNVT_CNST_KG_LB, 2));
			docObjects[0].SetCellValue(i, "bllbs",docObjects[0].GetCellValue(i, "blwgt"));
		}
		//alert(docObjects[0].CellValue(i, "dl_sts_nm"))
		//OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site
		if((docObjects[0].GetCellValue(i, "err_flg") == "Created" && !("Y"==amsEnableChkFlg))|| docObjects[0].GetCellValue(i, "err_flg") == "Error"  //[20140117 OJG] docObjects[0].GetCellValue(i, "dl_sts_nm") == "BL Created"
/*|| docObjects[0].GetCellValue(i, "err_flg") == "Sent"*/ ||docObjects[0].GetCellValue(i, "type") == "Del"){
			docObjects[0].SetCellEditable(i, "chk",0);
		}
		if((docObjects[0].GetCellValue(i, "err_flg") == "Created" && !("Y"==amsEnableChkFlg))|| docObjects[0].GetCellValue(i, "err_flg") == "Error"  //[20140117 OJG] docObjects[0].GetCellValue(i, "dl_sts_nm") == "BL Created"
/*|| docObjects[0].GetCellValue(i, "err_flg") == "Sent" ||docObjects[0].GetCellValue(i, "type") == "Del"*/){	//[20140130 OJG]
			docObjects[0].SetCellEditable(i, "blck_flg",0);
		}
		/*
if(docObjects[0].GetCellValue(i, "err_flg") == "Created"){
			docObjects[0].SetCellEditable(i, "blck_flg",0);
		}
		*/
		if(docObjects[0].GetCellValue(i, "dl_sts_nm") == "BL Created"){
			docObjects[0].SetCellBackColor(i, "dl_sts_nm","#FAED7D");
		}else if(docObjects[0].GetCellValue(i, "err_flg") == "Error"){
			docObjects[0].SetCellBackColor(i, "dl_sts_nm","#FFA7A7");
		}else if(docObjects[0].GetCellValue(i, "dl_sts_nm") == "Download"){
			docObjects[0].SetCellBackColor(i, "dl_sts_nm","#8BBDFF");
		}
		if(docObjects[0].GetCellValue(i, "type") == "Del"){
			docObjects[0].SetCellFontColor(i,'type',"#FF0000");
			docObjects[0].SetCellFont("FontBold", i,"type",1);
		}
		if(docObjects[0].GetCellValue(i, "bl_sts") == "Do Not Load"){
			docObjects[0].SetCellFontColor(i,'bl_sts',"#FF0000");
			docObjects[0].SetCellFont("FontBold", i,"bl_sts",1);
		}
		if(docObjects[0].GetCellValue(i, "bl_sts") == "Load to OK(1Y)"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#E4F7BA");
		}else if(docObjects[0].GetCellValue(i, "bl_sts") == "Deleted"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#FF9090");
		}else if(docObjects[0].GetCellValue(i, "bl_sts") == "Amended"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#DB9CFF");
		}else if(docObjects[0].GetCellValue(i, "bl_sts") == "Do Not Load"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#FFFFA1");
		}else if(docObjects[0].GetCellValue(i, "bl_sts") == "Hold"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#FFA9FF");
		}else if(docObjects[0].GetCellValue(i, "bl_sts") == "Rejected"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#5AB1C0");
		}else if(docObjects[0].GetCellValue(i, "bl_sts") == "OK to Load"){
				docObjects[0].SetCellBackColor(i, "bl_sts","#CEF76E");
		}
	}
	var formObj=document.frm1;
	if(formObj.f_cmd.value == COMMAND01){	//BL Download
		doWork("SEARCHLIST");
	}
}
function sheet1_OnSaveEnd(){
	var formObj=document.frm1;
	var vslCd="";
	var lnrCd="";
	var lnrNm="";
	var shprCd="";
	var cneeCd="";
	var ntfyCd="";
	var polCd="";
	var podCd="";
	var delCd="";
	var porCd="";
	//sheetObj.SubSumBackColor = "#EDF8F8";
	//alert("sheet1_OnSaveEnd RowCount: "+docObjects[0].RowCount);
	for(var i=2; i<=docObjects[0].LastRow()+2; i++){
		//alert(docObjects[0].CellValue(i, "vsl_fullname"));
		if(docObjects[0].GetCellValue(i, "chk") == 1){
		polCd=docObjects[0].GetCellValue(i, "pol_cd");
		podCd=docObjects[0].GetCellValue(i, "pod_cd");
		delCd=docObjects[0].GetCellValue(i, "del_cd");
		porCd=docObjects[0].GetCellValue(i, "por_cd");
		vslCd=docObjects[0].GetCellValue(i, "vsl_cd");
		lnrCd=docObjects[0].GetCellValue(i, "lnr_cd");
		lnrNm=docObjects[0].GetCellValue(i, "lnr_nm");
		shprCd=docObjects[0].GetCellValue(i, "shpr_cd");
		cneeCd=docObjects[0].GetCellValue(i, "cnee_cd");
		ntfyCd=docObjects[0].GetCellValue(i, "ntfy_cd");
		agtCd=docObjects[0].GetCellValue(i, "agt_cd");
			if(lnrCd == "" || shprCd == "" || cneeCd== "" || ntfyCd == "" || agtCd	 == "" ){
				docObjects[0].SetRowBackColor(i,"#EAEAEA");
			}
			//alert(vslCd + " / " + lnrCd + " / " + shprCd + " / " + cneeCd + " / " + ntfyCd );
			//alert(polCd + " / " + podCd + " / " + delCd + " / " + porCd);
			if(polCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("pol_ams"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("pol_ams")) = false;
			}
			if(podCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("pod_ams"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("pod_ams")) = false;
			}
			if(delCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("del_ams"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("del_ams")) = false;
			}
			if(porCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("por_fullname"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("por_fullname")) = false;
			}
			/*
			if(vslCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("vsl_fullname"),"#FF0000");
			}else{
				docObjects[0].SetCellEditable(i, docObjects[0].SaveNameCol("vsl_fullname"),0);
			}
			*/
			if(lnrCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("carr_nm"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("carr_nm")) = false;
			}
			if(shprCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("shpr_nm"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("shpr_nm")) = false;
			}
			if(cneeCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("cnee_nm"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("cnee_nm")) = false;
			}
			if(ntfyCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("ntfy_nm"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("ntfy_nm")) = false;
			}
			if(agtCd == ""){
				docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("agt_nm"),"#FF0000");
			}else{
				//docObjects[0].CellEditable(i, docObjects[0].SaveNameCol("agt_nm")) = false;
			}
		}else{
			docObjects[0].SetCellEditable(i, docObjects[0].SaveNameCol("chk"),0);
		}
	}
	if(formObj.f_cmd.value == COMMAND03){	//Create BL
		doWork("SEARCHLIST");
	}
}
function openPopUpEdi(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
	try {
		switch(srcName) {
			case "HBL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
		   		rtnary[0]="S";
		   		rtnary[1]="I";
	   	        var rtnVal =  ComOpenWindow('./CMM_POP_0170.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_hbl_no.value=rtnValAry[0];//house_bl_no
				}
		    break;
			case "MBL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="S"; //S=해운에서 오픈, A=항공에서 오픈
				rtnary[1]="I"; //I: In-bound, O: Out-bound
		    	var rtnVal =  ComOpenWindow('./CMM_POP_0180.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
		    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		    		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_mbl_no.value=rtnValAry[0];//mbl_no
				}
		    break;
			case "SHIPPER_POPLIST":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.f_shpr_nm.value;
		   		rtnary[2]=window;
	   	        var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_shpr_cd.value=rtnValAry[0];//trdp_cd
					formObj.f_shpr_nm.value=rtnValAry[2];//eng_nm
				}
	         break; 
			case "CONSIGNEE_POPLIST":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.f_cnee_nm.value;
		   		rtnary[2]=window;
	   	        var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_cnee_cd.value=rtnValAry[0];//trdp_cd
					formObj.f_cnee_nm.value=rtnValAry[2];//eng_nm
				}
	         break; 
        } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			showErrMessage(AJ_CMM_ERR);
		} else {
			showErrMessage(e);
		}
	}
}
/**
* Trade Partner 관린 코드조회
*/
function trdpCdReqEdi(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpCode_shipper"){
				formObj.f_shpr_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.f_shpr_nm.value=masterVals[3];		//eng_nm   AS param2
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_000000') + "\n\n: EDI_ISF_0020.461");
				}
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.f_cnee_nm.value=masterVals[3];		//eng_nm   AS param2
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_000000') + "\n\n: EDI_ISF_0020.470");
				}
			}
		}else{
			if(CODETYPE =="trdpCode_shipper"){
				formObj.f_shpr_cd.value="";//trdp_cd  AS param1
				formObj.f_shpr_nm.value="";//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value="";//trdp_cd  AS param1
				formObj.f_cnee_nm.value="";//eng_nm   AS param2
			}
		}
	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameActionEdi(str, obj, tmp){
	var s_code=obj.value.toUpperCase();		
	var s_type="";
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(trdpCdReqEdi,'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(trdpCdReqEdi,'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
		}
}
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
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
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
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
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
function VIEW_AMS_MBL(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	}
}
function VIEW_AMS_HBL(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
	}
//Calendar flag value
var firCalFlag=false;
//OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site
var amsEnableChkFlg="";
function setAmsEnableChkFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		amsEnableChkFlg=doc[1];
	} else {
		amsEnableChkFlg="N";
	}
}

// OFVFOUR-8251 [Urgent] [NTL NAIGAI TRANS] OI AMS B/L EDI got the error message
// OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
// var post_dt_imp = "";
// function checkImpPostRef(){
// 	ajaxSendPost(setImpPostRef, 'reqVal', '&goWhere=aj&bcKey=getImpPostRef&f_ofc_cd='+UserOfcCd, './GateServlet.gsl');
// }
// function setImpPostRef(reqVal){
// 	var doc = getAjaxMsgXML(reqVal);
// 	if(doc[0]=='OK'){
// 		if(typeof(doc[1])!='undefined'){
// 			post_dt_imp = doc[1];
// 		}
// 	}
// }

//OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString) {
	var formObj = document.frm1;
	switch (MenuString) {
	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
	case "Header Setting Save":
		IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	// Header Setting Reset
	case "Header Setting Reset":
		IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	// 사용자가 저장한 Header Setting을 삭제한다.
	// case "Header Setting Delete":
	// IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
	// break;
	// 선택된 Column Hidden
	case "Column Hidden":
		var col = sheetObj.MouseCol();
		sheetObj.SetColHidden(col, 1);
		sheetObj.SetColWidth(col, 1);
		break;
	}
}