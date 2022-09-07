var rtnary = new Array(1);
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var sheetObj1 = docObjects[1];
    var formObj  = document.frm1;

    switch(srcName) {
    case "SEARCHLIST":

	   //sheetObj.ShowDebugMsg = true;
        formObj.f_cmd.value = SEARCHLIST;
        
       	sheetObj.DoSearch4Post("EQU_INV_0030GS.clt", FormQueryString(formObj));
        //sheetObj.ShowDebugMsg = false;
       	
       	getObj('excel').style.display = 'inline';
       	getObj('prn').style.display = 'inline';
       	
       	if(formObj.inv_sts_cd.value=='IS'){
       		getObj('conf').style.display = 'inline';
       	}else{
       		getObj('conf').style.display = 'none';
       		
       	}
    break;

    case "NEW":
   	   formObj.reset();
   	   fncFromToDate();
   	   sheetObj.RemoveAll();
    break;
    case "CONFIRM":
    	formObj.f_cmd.value = MODIFY01;
    	
    	// grid value validation
    	if ( !fncGridCheck() ) return false;
    	
    	if( confirm(getLabel('EQU_INV_MSG34')) ){
    		sheetObj.DoSave("EQU_INV_0030GS.clt", FormQueryString(formObj),"ibflag",false);
    	}
    	break;
    case "BKNO_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
 		rtnary = new Array(1);
		rtnary[0] = "S";
		rtnary[1] = "O";
		rtnary[2] = "Y"; //equipment 일때 operator all설정
		
		var rtnVal = window.showModalDialog('./CMM_POP_0210.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 		return;
		}else{
	
			var rtnValAry = rtnVal.split("|");
			formObj.bkg_no.value   	= rtnValAry[0];//bkg_no
		}
		
	break;  
       
    case "EXCEL":
    	sheetObj.SpeedDown2Excel(true);
    break;
    case "LESSOR_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
        
  		rtnary = new Array(1);
  		rtnary[0] = "1";
  		rtnary[1] = "";
  		rtnary[2] = window;
  		
   		var cstmTpCd = 'LS';
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.lr_trdp_cd.value = rtnValAry[0];//loc_cd 
//			formObj.lr_trdp_nm.value  = rtnValAry[2];//loc_nm
			
		} 
    break;
    case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
 		rtnary = new Array(1);
 			rtnary[0] = "1";
 			rtnary[1] = "";
 			rtnary[2] = window;
 			
 		var cstmTpCd = 'CS';
 		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
 		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		 	return;
 		 	
 		}else{
 			var rtnValAry = rtnVal.split("|");
 			formObj.cs_trdp_cd.value = rtnValAry[0]; 
 			formObj.cs_trdp_nm.value  = rtnValAry[2];//loc_nm
 		}
 	break;
    case "INVOICE_POPLIST" :
        
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = ""; // invoice status
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0110.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.inv_no.value = rtnValAry[0];//sr_no
				
		}
	break;
	
    case "PRINT":
    	formObj.open_type.value = 'GL';
    	formObj.title.value = 'G. Invoice List';
    	
    	popPOST(formObj, 'RPT_PRN_0040.clt', 'winPOP', 385, 330);
    break;
    
    
    case "InvoicePrint":
    	var selectRow = sheetObj.SelectRow;
    	if(selectRow == 0 ){
   			alert(getLabel('EQU_MSG_006'));
   			return;
   		}
		var param = "open_type=G";
		param += "&inv_no=" + sheetObj.CellValue(selectRow, "inv_no");
		//필수 입력 값이어서 넣는 값
		param += "&sell_buy_tp_cd=S";
		param += "&air_sea_clss_cd=S";
		param += "&frt_ask_clss_cd=BL";

		popGET('RPT_PRN_0040.clt?'+param, '', 385, 330, "scroll:yes;status:no;help:no;");
    break;
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;


/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    fncFromToDate();
}
function fncFromToDate() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	var fromDate = new Date();

	var tempDate = now.getTime() - ( 7*24*60*60*1000);
	fromDate.setTime(tempDate);
   
	var iyear = fromDate.getYear();
	var imonth = fromDate.getMonth() +1;
	var iday = fromDate.getDate();

	if(imonth < 10){
		imonth = "0"+(imonth);
	}
	if(iday < 10){
		iday = "0"+iday;
	}

	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}

	var searchDay1 = iyear + "-" + imonth + "-" + iday;
	today = year +"-"+ month +"-"+ date +"";

	formObj.fm_rgst_dt.value = searchDay1;
	formObj.to_rgst_dt.value = today;
}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
    switch(sheetNo) {
         case 1:      //IBSheet1 init

            with (sheetObj) {
                // 높이 설정
               style.height = 400;
                
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                //MergeSheet = msPrevColumnMerge;
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(23, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, false, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_INV_0030_HDR'), true);

                //데이터속성    [ROW, COL,  DATATYPE,    WIDTH,    DATAALIGN, COLMERGE, SAVENAME,  KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, cnt++,  dtDelCheck,		30,    daCenter,	true,    "chk",				false,	"",       dfNone,      0,     true,	true);
				InitDataProperty(0, cnt++,  dtHiddenStatus,	40,    daCenter,	true,    "ibflag");
				
				InitDataProperty(0, cnt++,  dtData,			30,    daCenter,	true,    "no", 			false,	"",       dfNone,      0,     false,	false,	3);
				InitDataProperty(0, cnt++,  dtData,			70,    daCenter,	true,    "bil_dt",		false,	"",       dfUserFormat,0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			70,    daCenter,	true,    "rgst_tms",	false,	"",       dfUserFormat,0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			70,    daCenter,	true,    "due_dt",		false,	"",       dfUserFormat,0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "lr_trdp_nm",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "inv_no",		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	  		105,   daLeft,		true,    "bkg_no",		false,	"",       dfNone,      0,     false, 	false,	20);    
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "pol_nm",		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	        50,    daCenter,	true,    "curr_cd",	    false,	"",       dfNone,      0,     false,	false,	20);
				
				InitDataProperty(0, cnt++,  dtData,	    	100,   daRight,		true,    "inv_ttl_amt",	false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	    	100,   daRight,		true,    "pay_amt",		false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	    	100,   daRight,		true,    "bal_amt",		false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			80,    daLeft,		true,    "ref_no",		false,	"",       dfNone,      0,      true,	false,	10);    
				InitDataProperty(0, cnt++,  dtCombo,		100,   daLeft,		true,    "inv_sts_cd",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtCombo,		80,    daLeft,		true,    "equ_sts_cd",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtImageText,    70,    daCenter,    true,    "inv_prt",     false, "",       dfNone,   0,     false,      true);
                InitDataProperty(0, cnt++,  dtImageText,    70,    daCenter,    true,    "inv_cancel",  false, "",       dfNone,   0,     false,      true);
                InitDataProperty(0, cnt++,  dtData,			80,    daCenter,	true,    "slip_no",		false,	"",       dfNone,      0,      true,	false,	200);    
				InitDataProperty(0, cnt++,  dtData,			70,    daCenter,	true,    "xch_rt_dt",	false,	"",       dfUserFormat,0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			70,    daCenter,	true,    "settle_dt",	false,	"",       dfUserFormat,0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "rgst_usrid",	false,	"",       dfNone,      0,     false,	false,	20);    

				
				InitDataCombo (0, "inv_sts_cd", PARAM1_1, PARAM1_2);	//com_cd_dtl에서 가져온 코드값.
				InitDataCombo (0, "equ_sts_cd", PARAM2_1, PARAM2_2);	//com_cd_dtl에서 가져온 코드값.
				
				PopupImage	= APP_PATH+"/web/img/button/btns_search.gif";
				
		         //Cell Image display
		        ImageList(0) = APP_PATH+"/web/img/button/btn_print.gif";
		        ImageList(1) = APP_PATH+"/web/img/button/btn_cancel.gif";
		        
		        InitDataImage(0, 10, daRight);
		        InitDataImage(0, 11, daRight);
				
		        InitUserFormat(0, "bil_dt",  "####-##-##", "-");
		        InitUserFormat(0, "rgst_tms",  "####-##-##", "-");
		        InitUserFormat(0, "due_dt",  "####-##-##", "-");
		        InitUserFormat(0, "xch_rt_dt",  "####-##-##", "-");
		        InitUserFormat(0, "settle_dt",  "####-##-##", "-");

		        // 대문자 자동 치환
				InitDataValid(0, "ref_no",vtEngUpOther, "0123456789" );
				InitDataValid(0, "bkg_no",vtEngUpOther, "0123456789" );
           }                                                      
        break;
        
     }
}
// validation check
function fncGridCheck() {
	var sheetObj = docObjects[0];
	var intRow = sheetObj.Rowcount;
	for ( var i = 1 ; i <= intRow ; i++ ) {
		if ( parseFloat(sheetObj.CellValue(i, "unit_prc")) <= 0) {
			alert(i+" Row "+getLabel('EQU_INV_MSG20'));
			sheetObj.SelectCell(i, "unit_prc");
		return false;
		}
		if ( parseInt(sheetObj.CellValue(i, "qty")) <= 0) {
			alert(i+" Row "+getLabel('EQU_INV_MSG19'));
			sheetObj.SelectCell(i, "qty");
			return false;
		}
	}
	return true;
}
function sheet1_OnSaveEnd() {
	doWork('SEARCHLIST');
		
}
function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var rowcount = docObjects[0].rowCount;
	
	sheetObj.ShowSubSum("curr_cd", "11|12|13", 2, false, false, 9, "pol_nm=;curr_cd=%s");
	
	for(var i=rowcount+1;i<=docObjects[0].rowCount;i++){
		sheetObj.CellFont("FontBold", i, 1, i, "cy_cd") = true;
	}
	
	sheetObj.cellValue2(rowcount+1, "cnt_nm") = "Grand Total";
	// date 
	var date_cd = formObj.date_cd.value;
	if(date_cd == 'B'){
		sheetObj.ColumnSort("lr_trdp_nm|bil_dt", "ASC", "ASC|ASC", true);
	}else if(date_cd == 'D'){
		sheetObj.ColumnSort("lr_trdp_nm|due_dt", "ASC", "ASC|ASC", true);
	}else if(date_cd == 'C'){
		sheetObj.ColumnSort("lr_trdp_nm|rgst_tms", "ASC", "ASC|ASC", true);
	}
	
	for(var i=1;i<=rowcount;i++){
		sheetObj.CellValue2(i, "no") =  i;
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;	
	
	switch (sheetObj.ColSaveName(Col)) {
	
	case "chk" :
		if(formObj.inv_sts_cd.value!="IS"){
			sheetObj.checkAll2("chk") = 0;
		}
	break;
	}
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;	
		
	switch (sheetObj.ColSaveName(Col)) {
	case "chk" :
   		var invAry = sheetObj.ColValueDupRows("inv_no");
   		var arrRow = invAry.split(",");
   		// 클릭한 row가 중복행에 포함되면 선택이 안되게 한다.
   		for(var j=0;j<arrRow.length;j++){
   			// check value를 Y해 줘야 N으로 바뀜.
			if(Row == arrRow[j]){
				sheetObj.cellvalue2(Row, "chk") = "Y";
				return;
			}
   		}
	break;
	case "inv_prt" :
		doWork('InvoicePrint');
		
//			if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "S" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "S" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "B" ) ) {
//				doWork('InvoiceSeaPrint');
//			} else if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "A" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "S" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "B" ) ) {
//				doWork('InvoiceAirPrint');
//			} else if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "S" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "D" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "C" ) ) {
//				doWork('DCNoteSeaPrint');
//			} else if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "A" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "D" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "C" ) ) {
//				doWork('DCNoteAirPrint');
//			} else if ( intBlCnt > 1 ) {
//				doWork('InvoiceSummaryPrint');
//			}
		
    break;
    case "inv_cancel" :
    	var inv_sts = sheetObj.cellValue(Row, "inv_sts_cd");
    	var equ_sts = sheetObj.cellValue(Row, "equ_sts_cd");
    	if(inv_sts != "IS"){
    		alert(getLabel('EQU_INV_MSG39'))
    		return;
    	}
    	if(equ_sts != "IS"){
    		alert(getLabel('EQU_INV_MSG38'))
    		return;
    	}
		if(!confirm(getLabel('EQU_INV_MSG36'))){
			return;
		}
		//mapping 된것은 cancel불가
		/**
		 * 
		 */
	
		formObj.hid_inv_no.value = sheetObj.CellValue(Row,"inv_no");
		
		formObj.f_cmd.value = REMOVE;
//		    formObj.action = "./ACC_INV_0030.clt";
//		    formObj.submit();
		sheetObj.CellValue(Row,"ibflag") = 'U';
		
		sheetObj.ShowDebugMsg = false;        		
		sheetObj.DoSave("./EQU_INV_0030GS.clt", FormQueryString(formObj),"ibflag",false);
        
    break;
		
	}
}


/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.fm_rgst_dt, 'fm_rgst_dt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.to_rgst_dt, 'to_rgst_dt', 'yyyy-MM-dd');
        break;
        
    }
    
}

var CODETYPE = '';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code = obj.value.toUpperCase();
	}else{
		var s_code = obj;
	}				
	var s_type = "";
	
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE =str;

				var sub_str = str.substring(0,str.indexOf("_s"));
				
				s_type = sub_str;
				
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj = docObjects[0];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = masterVals[0]; 
				formObj.lr_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cs_trdp_cd.value  = masterVals[0]; 
				formObj.cs_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "booking_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "bkg_no") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "intg_bl_seq") = masterVals[1]; 
				
			}
			
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = ""; 
				formObj.lr_trdp_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cs_trdp_cd.value  = ""; 
				formObj.cs_trdp_nm.value  = "";//loc_nm	
				
			}else if(CODETYPE == "booking_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "bkg_no") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "intg_bl_seq") = "";
				
			}
		}
	}else{
		alert(getLabel('EQU_INV_MSG01'));		
	}
}
