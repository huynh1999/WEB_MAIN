/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	
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
	
	//setFromToDtEndPlus(document.frm1.f_sel_strdt, 30, document.frm1.f_sel_enddt, 30);
	document.frm1.f_sel_strdt.value = FROMDATE;
	document.frm1.f_sel_enddt.value = TODAY;
}

function doWork(srcName){
	try{
		switch(srcName) {
		   	case "SEARCHLIST":
		   		frm1.f_cmd.value = SEARCHLIST;
		    	docObjects[0].DoSearch4Post("./ACC_INV_0090GS.clt", FormQueryString(frm1));
		   	break;
			case "EXCEL":
				docObjects[0].SpeedDown2Excel(true);
			break;
			case "NEW":
			   	frm1.f_cmd.value = "";                   
				
			   	var paramStr = "./ACC_INV_0080.clt";
			   	parent.mkNewFrame('C. Invoice', paramStr);
			break;
			case "USER_POPLIST"://사용자조회 openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			   
				var rtnary = new Array(1);
				rtnary[0] = "1";
			
				var rtnVal = window.showModalDialog('./CMM_POP_0060.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry = rtnVal.split("|");
					frm1.f_pic_id.value 	= rtnValAry[0];
				}
			break;
			case "INV_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
				var rtnary = new Array(1);
				rtnary[0] = "C";
				var rtnVal = window.showModalDialog('./CMM_POP_0240.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:756px;dialogHeight:480px");
				if (rtnVal==""||rtnVal=="undefined"||rtnVal==undefined){
			 		return;
			 		
				}else{
					var rtnValAry = rtnVal.split("|");
					frm1.f_inv_no.value = rtnValAry[0];//inv_no
				}
			break;  
	   		case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	   			var rtnary = new Array(1);
	   			rtnary[0] = "";
		   		rtnary[1] = "";
		   		rtnary[2] = window;
		   		
	   			var cstmTpCd = 'ALL';
	   			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   			 	return;
	   			}else{
	   				var rtnValAry = rtnVal.split("|");
	   				frm1.f_trdp_cd.value = rtnValAry[0]; 
	   				frm1.f_trdp_nm.value  = rtnValAry[2];//loc_nm
	   			}
	   		break;
	   		case "InvoicePrint":
				var selectRow = docObjects[0].GetSelectRow();

				if(selectRow == 0 ){
           			return;
           		}
				
				var param = "open_type=C"; 
				param += "&cmb_inv_seq=" + docObjects[0].GetCellValue(selectRow, "cmb_inv_seq");
				param += "&sell_buy_tp_cd=" + docObjects[0].GetCellValue(selectRow, "sell_buy_tp_cd");

				popGET('RPT_PRN_0110.clt?'+param, '', 385, 330, "scroll:yes;status:no;help:no;");
			
				break;
				
	   		case "PRINT":
				var chkRow = docObjects[0].FindCheckedRow("chk");
				
				if(chkRow ==""){
		            //체크된 항목이 없습니다.
					alert(getLabel('FMS_COM_ALT004') + "\n\n: ACC_INV_0090.113");
					
		            return;
		        }
				var arrRow = chkRow.split("|");
				var cmb_inv_seq = '\'';
				
		        for(var j=0;j<arrRow.length-1;j++){
		            if(j>0){
		            	cmb_inv_seq  = cmb_inv_seq +',\'';
		            }
		            cmb_inv_seq = cmb_inv_seq + docObjects[0].cellvalue(arrRow[j], "cmb_inv_seq");
		            cmb_inv_seq = cmb_inv_seq + '\'';
		        }
				frm1.open_type.value = "L";
				frm1.cmb_inv_seq.value = cmb_inv_seq;
				frm1.sell_buy_tp_cd.value = frm1.f_sell_buy_tp_cd.value;
				frm1.date_cd.value = frm1.f_date_cd.value;
				
				popPOST(frm1, 'RPT_PRN_0110.clt', 'winPOP', 385, 330);
			break;
		}
	}catch(e){
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: ACC_INV_0090.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: ACC_INV_00901.002");
        } 	
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
            var cal = new calendarPopupFromTo();
            cal.displayType = "date";
            cal.select(formObj.f_sel_strdt, 'f_sel_strdt', formObj.f_sel_enddt, 'f_sel_enddt', 'MM-dd-yyyy');
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
				formObj.f_trdp_cd.value  = masterVals[0]; 
				formObj.f_trdp_nm.value  = masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value  = ""; 
				formObj.f_trdp_nm.value  = "";
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001')+ "\n\n: ACC_INV_0090.242");		
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

	var formObj  = document.frm1;
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
  //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
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
		        style.height = 370;
		        
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
		        InitColumnInfo(24, 3, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;

		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('ACC_INV_0090_HDR1_1'), true);
		        
		        var cnt = 0;
		        //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, cnt++,  dtCheckBox,     40,    daCenter,  true,  "chk",         false,      "",    dfNone,      0,     true,        true,    2);
                InitDataProperty(0, cnt++,  dtHiddenStatus,  0,    daCenter,  true,  "ibflag");         
                InitDataProperty(0, cnt++,  dtHidden,        0,    daCenter,  true,  "cmb_inv_seq");
                InitDataProperty(0, cnt++,  dtData,         90,    daLeft,    true,  "inv_no",   	false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         55,    daCenter,  true,  "trdp_cd",   	false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,        100,    daLeft,    true,  "trdp_nm",   	false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         60,    daCenter,  true,  "inv_aply_curr_cd",false,  "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         90,    daRight,   true,  "inv_amt",   	false,      "",    dfFloat,      2,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         80,    daRight,   true,  "wfg_amt",   	false,      "",    dfFloat,      2,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         90,    daRight,   true,  "pay_amt",   	false,      "",    dfFloat,      2,     false,      false);
                InitDataProperty(0, cnt++,  dtData,        100,    daRight,   true,  "bal_amt",   	false,      "",    dfFloat,      2,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         80,    daLeft,    true,  "buy_inv_no",  false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         70,    daCenter,  true,  "inv_dt",   	false,      "",    dfDateYmd,    0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         70,    daCenter,  true,  "clt_due_dt",  false,      "",    dfDateYmd,    0,     false,      false);
                InitDataProperty(0, cnt++,  dtHidden,        0,    daLeft,    true,  "inv_sts_cd",  false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         80,    daLeft,    true,  "inv_sts_nm",  false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtHidden,       70,    daCenter,  true,  "inv_prt",     false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtImageText,    90,    daCenter,  true,  "inv_cancel",  false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         80,    daLeft,    true,  "slip_no",     false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         70,    daCenter,  true,  "inv_to_dt",   false,      "",    dfUserFormat, 0,     false,      false);
                InitDataProperty(0, cnt++,  dtHidden,       90,    daLeft,    true,  "dept_cd", 	false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         70,    daLeft,    true,  "rgst_usrid", 	false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtData,         70,    daLeft,    true,  "ofc_cd", 		false,      "",    dfNone,       0,     false,      false);
                InitDataProperty(0, cnt++,  dtHidden,       70,    daLeft,    true,  "sell_buy_tp_cd", 	false,      "",    dfNone,       0,     false,      false);
                
		         //Cell Image display
		        ImageList(0) = APP_PATH+"/web/img/button/btn_print.gif";
		        ImageList(1) = APP_PATH+"/web/img/button/btn_cancel.gif";
		        
		        InitDataImage(0, 'inv_prt',    daCenter);
		        InitDataImage(0, 'inv_cancel', daCenter);
		        
		        
		        InitViewFormat(0, "inv_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	            InitViewFormat(0, "clt_due_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	            EditDateFormat = "MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정
		        
		        //InitUserFormat(0, "inv_dt",  "##-##-####", "-");
		        //InitUserFormat(0, "clt_due_dt",  "##-##-####", "-");
		        
				// HeadRowHeight = 20 ;
	            
	            ActionMenu = "Column Hidden|-|Header Setting Save|Header Setting Reset";
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

function sheet1_OnDblClick(sheetObj,Row,Col){
	var colStr = sheetObj.ColSaveName(Col);
	if(colStr!='inv_prt'&&colStr!='inv_cancel'){
		var formObj  = document.frm1;
	   	doProcess = true;
	   	formObj.f_cmd.value = "";                   
	
	   	var paramStr = "./ACC_INV_0080.clt?f_cmd="+SEARCH+"&f_inv_no="+sheetObj.GetCellValue(Row,"inv_no");
	   	parent.mkNewFrame('C. Invoice', paramStr);
	}
}

function sheet1_OnClick(sheetObj,Row,Col){
	var colStr = sheetObj.ColSaveName(Col);
	if(colStr=='inv_cancel'){
		if(sheetObj.GetCellValue(Row, 'inv_sts_cd')=='IS'){
			if(confirm(getLabel('FMS_COM_CFMCAN'))){
				ajaxSendPost(getCancelResult, 'reqVal', '&goWhere=aj&bcKey=cancelCmbInv&f_cmb_inv_seq='+sheetObj.GetCellValue(Row, 'cmb_inv_seq'), './GateServlet.gsl');
			}
		}else{
			//Unable to cancel this invoice!\nAn Invoice can be cancel when the status is [Invoice Issue].
			alert(getLabel('ACC_COM_ALT004') + "\n\n: ACC_INV_0090.433");
		}
	}
	
	if(colStr=='inv_prt'){
		doWork('InvoicePrint');		
	}
}


function getCancelResult(reqVal){
    var doc = getAjaxMsgXML(reqVal);
    alert(doc[0]);
    if(doc[0]=='OK'){
    	doWork('SEARCHLIST');
    }
}

function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;

	if(formObj.f_sell_buy_tp_cd.value==""){
		getObj('mainPrt').style.display = "none";
		getBtnObj('btnPrint').style.display = "none";
	}else{
		getObj('mainPrt').style.display ="block";
		getBtnObj('btnPrint').style.display ="block";
	}
}
