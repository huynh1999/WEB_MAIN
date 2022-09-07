var FROMDATE;
var TODAY;
var ENDDATE;

function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
    	
    
	   case "DEFAULT":
	        
	   break;
   
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value = SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch4Post("./ACC_JOR_0060GS.clt", FormQueryString(formObj));
            
       break;
       case "ROWADD":
       		var intRows = sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
       break;
       
       
       case "MODIFY":	//수정
           
    	   frm1.f_cmd.value = MODIFY;
    	   
    	   for(var i=1;i<=sheetObj.LastRow;i++){
    		   if(sheetObj.CellValue(i, "post_dt") == ""){
//    			   alert("[Date] is mandatory field. ");
    			   alert(getLabel('ACC_MSG32'));
    			   sheetObj.SelectCell(i,"post_dt",false);
    			   return;
    		   }
    	   }
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   sheetObj.DoSave("ACC_JOR_0060GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       
       
       case "DELETE":	//삭제
           
    	   frm1.f_cmd.value = REMOVE;
    	   
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   sheetObj.DoSave("ACC_JOR_0060GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       
       case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	   		var rtnary = new Array(1);
	   		rtnary[0] = "";
	   		rtnary[1] = formObj.s_vendor_nm.value;
	   		rtnary[2] = window;
	   		
  	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.s_vendor_cd.value = rtnValAry[0];//full_nm
				formObj.s_vendor_nm.value = rtnValAry[2];//full_nm
			}             
     	break;
     	
    	
        case "GOLOCAL":	//LOCAL INVOICE 화면호출
        	
            var paramStr = "./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/R Entry', paramStr);
            
        break;
        
        
        case "GOCRDB":	//CR/DB Note 화면호출
        	
            var paramStr = "./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('DC Note Entry', paramStr);
            
        break;
        
        case "GOAP":	//Account Payable 화면호출
        	
            var paramStr = "./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/P Entry(Cost)', paramStr);
            
        break;
        
        case "PRINT":
        	
        	if(sheetObj.SearchRows == 0){
        		//There is no data
				alert(getLabel('FMS_COM_ALT010')+ "\n\n: ACC_JOR_0060.102");
				return;
			}
        	
        	formObj.file_name.value = 'accounting_slip_01.mrd';
			formObj.title.value = 'Accounting Slip';
			
			//Parameter Setting
			var param = '';
			
			param += '[' + ofcCd + ']';													// [1]
			param += '[' + sheetObj.CellValue(sheetObj.SelectRow, "slip_no") + ']';		// [2]
			param += '[' + usrNm + ']';													// [3]
			
			formObj.rd_param.value = param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			
        break;
     	
        
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
//    			sheetObj.Down2Excel(-1,false,false,true,'','',false,false,'',false);
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
var ctlKind = "";
var ctlCol = 0;
var ctlRow = 0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
	doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj = document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	//사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    //오늘일자구하기
    var now 		= new Date(); 				
    var preDt		= new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
    
    var year		= now.getFullYear(); 			
    var month		= now.getMonth() + 1;
    var date		= now.getDate(); 	
    
    var preyear		= preDt.getFullYear();
    var premonth	= preDt.getMonth() + 1;
    
    if(month < 10){
    	month = "0"+(month);
    }
    
    if(premonth < 10){
    	premonth = "0"+(premonth);
    }
    
    if(date < 10){
    	date = "0"+date;
    }
    
    FROMDATE = premonth + "-" + "01" + "-" + preyear;
    TODAY    = month + "-" + date + "-" + year;
    
    
    ENDDATE  = getEndDate(TODAY);
    
    formObj.s_post_strdt.value = FROMDATE;
    formObj.s_post_enddt.value = ENDDATE;
    
    
    if(btn_role == "Y"){
    	getBtnObj('deleteBtn1').style.display = "inline";
    	getBtnObj('deleteBtn2').style.display = "inline";
    }else{
    	getBtnObj('deleteBtn1').style.display = "none";
    	getBtnObj('deleteBtn2').style.display = "none";
    }
}

function RestoreGrid(){
	
	//doWork("SEARCHLIST");
    
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
    switch(sheetNo) {
         case 1:      //IBSheet1 init

            with (sheetObj) {
	        	 // 높이 설정
	             style.height = 500;
	             
	             //전체 너비 설정
	             SheetWidth = mainTable.clientWidth;
	             // SheetWidth = 400;
	
	             //Host정보 설정[필수][HostIp, Port, PagePath]
	             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	
	             //전체Merge 종류 [선택, Default msNone]
	             MergeSheet = msHeaderOnly;
	
	             //전체Edit 허용 여부 [선택, Default false]
	             Editable = true;
	
	             //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
	             InitRowInfo( 1, 1, 9, 100);
	
	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	             InitColumnInfo(13, 0, 0, true);
	
	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
	             InitHeadMode(true, true, true, true, false,false) ;
	             
	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	             InitHeadRow(0, getLabel('ACC_JOR_0060_HDR'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  COL, DATATYPE,  	  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, 0,  dtCheckBox,    30,   daCenter,  true,    "chk_flag",       false,   "",        dfNone,         0,     true,        true,			-1,			false,		true,	 "",		false);
	             InitDataProperty(0, 1,  dtData,        80,   daCenter,  true,    "post_dt",        false,   "",       	dfDateYmd,      0,     true,        true);
	             InitDataProperty(0, 2,  dtData,        50,   daCenter,  true,    "dt_seq",    		false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, 3,  dtHidden,   	50,   daCenter,  true,    "com_cd",        	false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, 4,  dtPopupEdit,  250,   daLeft,    true,    "com_nm",       	false,   "",       	dfNone,         0,     false,       false);
	             InitDataProperty(0, 5,  dtData,       250,   daLeft,    true,    "rmk",      		false,   "",     	dfNone,    		0,     false,       false);
	             InitDataProperty(0, 6,  dtData,       100,   daCenter,  true,    "p_ofc_cd",       false,   "",       	dfNone,    		0,     false,       false);
	             InitDataProperty(0, 7,  dtData,       120,   daRight,   true,    "g_debit",		false,   "",   		dfFloat,        2,     false,       false);
	             InitDataProperty(0, 8,  dtData,       120,   daRight,   true,    "g_credit",  		false,   "",      	dfFloat,    	2,     false,       false);
	             InitDataProperty(0, 9,  dtData,       100,   daCenter,  true,    "rgst_usrid",    	false,   "",   		dfNone,    	    0,     false,       false);
	             InitDataProperty(0,10,  dtHidden,      90,   daCenter,  true,    "slip_no",    	false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0,11,  dtHidden,      90,   daCenter,  true,    "acct_dt",    	false,   "",  		dfNone,         0,     false,       false);
	             InitDataProperty(0,12,  dtHiddenStatus,30,   daCenter,  true,    "ibflag",         false,   "",       	dfNone,         0,     false,       false);
	             
	             InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             EditDateFormat = "MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정	
      			
	             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
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
	 
	 var formObj = document.frm1;
	
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
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
 
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=1; i<=sheetObj.LastRow;i++){
		
		for(var i=1; i<=sheetObj.LastRow;i++){
			
			if(sheetObj.CellValue(i, "acct_dt") != ""){
				sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
				sheetObj.RowEditable(i)  = false;
			}else{
				sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
				sheetObj.CellBackColor(i, "chk_flag") = sheetObj.RgbColor(255,255,255);
				sheetObj.CellBackColor(i, "post_dt")  = sheetObj.RgbColor(255,255,255);
				sheetObj.CellEditable(i, "chk_flag")  = true;
				sheetObj.CellEditable(i, "post_dt")   = true;
				
				
			}
		}
	}
	
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=1; i<=sheetObj.LastRow;i++){
		
		for(var i=1; i<=sheetObj.LastRow;i++){
			
			if(sheetObj.CellValue(i, "acct_dt") != ""){
				sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
				sheetObj.RowEditable(i)  = false;
			}else{
				sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
				sheetObj.CellBackColor(i, "chk_flag") = sheetObj.RgbColor(255,255,255);
				sheetObj.CellBackColor(i, "post_dt")  = sheetObj.RgbColor(255,255,255);
				sheetObj.CellEditable(i, "chk_flag")  = true;
				sheetObj.CellEditable(i, "post_dt")   = true;
				
				
			}
		}
	}

	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	
	//doWork("SEARCHLIST");
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
    switch (sheetObj.ColSaveName(Col)) {

    }
}


/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
    
	if(sheetObj.ColSaveName(Col) != "chk_flag" && sheetObj.ColSaveName(Col) != "post_dt"){
		var paramStr = "./ACC_JOR_0050.clt?f_cmd=-1&f_slip_no="+sheetObj.CellValue(Row, "slip_no");
	    parent.mkNewFrame('General Journal', paramStr);
	}
	
    
}

function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			sheetObj.CellValue(Row, "chk_flag") = "1";
			
		break;
		
	}
}


/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){

    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.s_post_strdt, 's_post_strdt', formObj.s_post_enddt, 's_post_enddt', 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.s_deposit_strdt, 's_deposit_strdt', formObj.s_deposit_enddt, 's_deposit_enddt', 'MM-dd-yyyy');
        break;
       
    }
}


function searchBlCmmInfo(){
	var formObj  = document.frm1;
	if(formObj.s_hbl_no.value != "" || formObj.s_mbl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
	
}

function enterBlCmmInfo(){
	var formObj  = document.frm1;

	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
	
}


function enterInvInfo(){
	var formObj  = document.frm1;
	
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
		}
	}
}


/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj  = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');

			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "H"){
					frm1.s_hbl_no.value  			= rtnArr[1];
				}else if(rtnArr[2] == "M"){
					frm1.s_mbl_no.value  			= rtnArr[1];
				}
				frm1.f_intg_bl_seq.value  		= rtnArr[0];
				frm1.f_biz_clss_cd.value  		= rtnArr[2];
				frm1.f_air_sea_clss_cd.value  	= rtnArr[3];
				frm1.f_bnd_clss_cd.value  		= rtnArr[4];
				
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value  		= "";
				frm1.s_hbl_no.value  			= "";
				frm1.s_mbl_no.value				= "";
				frm1.f_biz_clss_cd.value  		= "";
				frm1.f_air_sea_clss_cd.value  	= "";
				frm1.f_bnd_clss_cd.value  		= "";
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}



/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj  = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');

			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.s_inv_seq.value  		= rtnArr[0];
				frm1.s_inv_no.value  		= rtnArr[1];

				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value  		= "";
				frm1.s_inv_no.value  		= "";
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}


//화면 클리어
function clearAll(){
	var sheetObj = docObjects[0];
	var collTxt = document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value = "";
	  }           
	}
	
	formObj.s_post_strdt.value = FROMDATE;
	formObj.s_post_enddt.value = ENDDATE;
	
	sheetObj.RemoveAll();
}





/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj = document.frm1;
	var s_code = obj.value.toUpperCase();		
	var s_type = "";
	
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE = str;	
				s_type = "trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}
				
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE = str;		
				s_type = "trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
					
				}
			}
		}
	}else{
		formObj.s_vendor_cd.value = "";//trdp_cd  AS param1
		formObj.s_vendor_nm.value = "";//eng_nm   AS param2
	}
}



/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){

		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split(';');
			
			var masterVals = rtnArr[0].split('@^');	
			if(CODETYPE =="BILLTO"){
				formObj.s_vendor_cd.value = masterVals[0];	//trdp_cd  AS param1
				formObj.s_vendor_nm.value = masterVals[3];		//eng_nm   AS param2
				
			}
			
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_vendor_cd.value = "";//trdp_cd  AS param1
				formObj.s_vendor_nm.value = "";//eng_nm   AS param2
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}




//말일구하기
function getEndDate(datestr){
	
	datestr = datestr.replaceAll("-","");
	
    var yy = Number(datestr.substring(4,8));
    var mm = Number(datestr.substring(0,2));
    
    //윤년 검증
    var boundDay = "";
  
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm = "0"+mm
       }
       boundDay = mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm = "0"+mm
          }
          boundDay = mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm = "0"+mm
          }
          boundDay = mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}


function custEnterAction(obj, type){
	var formObj  = document.frm1;
	
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
		
	}
}



