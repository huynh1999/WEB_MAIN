
/**
 * 화면 폼입력값에 대한 유효성검증 프로세스 처리
 */
var rtnary = new Array(3);
function doWork(sAction){
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	
	switch(sAction){
		case "SEARCHLIST":
	
			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST;
			
			sheetObj.DoSearch4Post("SAL_TFM_0040GS.clt", FormQueryString(formObj));
				
		break;
		case "POPUP_POR":
			rtnary = new Array(3);
			rtnary[0] = "1";

			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:810px;dialogHeight:480px");

			if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
				return;
			} else {
				var rtnValAry = rtnVal.split("|");
				formObj.tx_org_por_cd.value = rtnValAry[0];
			}
		break;

		case "POPUP_POL":
			rtnary = new Array(3);
			rtnary[0] = "1";
			rtnary[1] = "BL";

			// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:810px;dialogHeight:480px");

			if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
				return;
			} else {
				var rtnValAry = rtnVal.split("|");
				formObj.pol_cd.value = rtnValAry[0];
			}
		break;

		case "POPUP_POD":
			rtnary = new Array(3);
			rtnary[0] = "1";
			rtnary[1] = "BL";
			
			// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:810px;dialogHeight:480px");

			if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
				return;
			} else {
				var rtnValAry = rtnVal.split("|");
				formObj.pod_cd.value = rtnValAry[0];
			}
		break;

		case "POPUP_DEL":
			rtnary = new Array(3);
			rtnary[0] = "1";
			rtnary[1] = "BL";
			
			// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2] = valObj;
	   		}else{
	   			rtnary[2] = "";
	   		}
	   		
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:810px;dialogHeight:480px");

			if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
				return;
			} else {
				var rtnValAry = rtnVal.split("|");
				formObj.dest_del_cd.value = rtnValAry[0];
			}
		break;
		case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(1);
				rtnary[0] = "1";
				
				// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1] = valObj;
		   		}else{
		   			rtnary[1] = "";
		   		}
		   		
		   		rtnary[2] = window;
		   		
			var cstmTpCd = 'CS';
			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.trdp_cd.value = rtnValAry[0]; 
				formObj.trdp_nm.value  = rtnValAry[2];//loc_nm
			}
		break;
		
	}
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++] = sheet_obj;
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i],SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	
    //사용자가 저장한 Header 정보를 읽어온다.
	var formObj = document.frm1;
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt = 0;
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
				// 높이 설정
				style.height = 410;

				//전체 너비 설정
				SheetWidth = mainTable.clientWidth;

				//Host정보 설정[필수][HostIp, Port, PagePath]
				if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

				//전체Merge 종류 [선택, Default msNone]
				MergeSheet = msHeaderOnly;

				//전체Edit 허용 여부 [선택, Default false]
				Editable = true;

				//행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
				InitRowInfo( 2, 1, 9, 100);

				//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
				InitColumnInfo(18, 0, 0, true);

				// 해더에서 처리할 수 있는 각종 기능을 설정한다
				InitHeadMode(true, true, true, true, false,false)

				//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
				InitHeadRow(0, getLabel('SAL_TFM_0040_HDR1_1'), true);
                InitHeadRow(1, getLabel('SAL_TFM_0040_HDR1_2'), true);
                
				var cnt = 0;
				
				//데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0,cnt++,  dtData,		   40,    daCenter,  true,	"no",			false,		"",       dfNone,      0,     true,      true);
				InitDataProperty(0,cnt++,  dtCombo,		   40,    daCenter,  true,	"trf_tp_cd",	false,		"",       dfNone,      0,     false,     false,		6);
				InitDataProperty(0,cnt++,  dtData,		   50,    daLeft,    true,	"trdp_cd",		false,		"",       dfNone,      0,     true,     true,		10);
				InitDataProperty(0,cnt++,  dtData,		  100,    daLeft,    true,	"trdp_nm",		false,		"",       dfNone,      0,     false,     false,		10);
				InitDataProperty(0,cnt++,  dtData,		  100,    daLeft,    true,	"trdp_clnt_nm", false,		"",       dfNone,      0,     true,      true,		100);
				
				InitDataProperty(0,cnt++,  dtCombo,		  100,    daLeft,    true,	"trdp_tp_cd", 	false,		"",       dfNone,      0,     true,      true,		100);
				
				InitDataProperty(0,cnt++,  dtCombo,		   70,    daLeft,    true,	"sell_buy_tp_cd",false,		"",       dfNone,      0,     true,      true,		6);
				
				InitDataProperty(0,cnt++,  dtCombo,        50,    daLeft,    true,	"bnd_clss_cd", 	false,		"",       dfNone,      0,     true,      true,		6);

				InitDataProperty(0,cnt++,  dtData,		   50,    daLeft,    true,	"pol_cd", 		false,		"",       dfNone,	   0,     false,     false,		5);
				InitDataProperty(0,cnt++,  dtData,		   80,    daLeft,    true,	"pol_nm", 		false,		"",       dfNone,	   0,     false,     false,		5);
				InitDataProperty(0,cnt++,  dtData,		   50,    daLeft,    true,	"pod_cd", 		false,		"",       dfNone,      0,     false,     false,		5);
				InitDataProperty(0,cnt++,  dtData,		   80,    daLeft,    true,	"pod_nm", 		false,		"",       dfNone,      0,     false,     false,		5);
				InitDataProperty(0,cnt++,  dtData,		   50,    daLeft,    true,	"dest_del_cd",	false,		"",       dfNone,	   0,	  false,     false,		5);
				InitDataProperty(0,cnt++,  dtData,		   80,    daLeft,    true,	"dest_del_nm",	false,		"",       dfNone,	   0,	  false,     false,		5);
				
				InitDataProperty(0,cnt++,  dtData,		   90,    daCenter,  true,	"trf_term_fm_dt",false,		"",       dfDateYmd,   0,     false,     false,		10);
				InitDataProperty(0,cnt++,  dtData,		   90,    daCenter,  true,	"trf_term_to_dt",false,		"",       dfDateYmd,   0,     false,     false,		10);
				
				InitDataProperty(0,cnt++,  dtHidden,  	  110,    daCenter,  true,	"trf_ctrt_no", 	false,		"",       dfNone,      0,     false,     false,		15);
				
				InitDataProperty(0,cnt++,  dtHiddenStatus, 40,    daCenter,  true,	"ibflag");

				HeadRowHeight = 21;
				
				InitDataCombo (0, "trf_tp_cd", "Sea|Air|Iata|Inland", "S|A|I|L");
				InitDataCombo (0, "bnd_clss_cd", PARAM1_1, PARAM1_2);
				InitDataCombo (0, "sell_buy_tp_cd", PARAM2_1, PARAM2_2);
				InitDataCombo (0, "trdp_tp_cd", PARAM3_1, PARAM3_2);
				
				InitViewFormat(0, "trf_term_fm_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
				InitViewFormat(0, "trf_term_to_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
      			EditDateFormat = "MDY";//날짜 입력을 월/일/년 으로 설정
      			
      			ActionMenu = "Column Hidden|-|Header Setting Save|Header Setting Reset";
			}
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
//	var tbObj = getObj('pagingTb');
//	var tmp = docObjects[0].CellValue(2, 'Indexing');
//	
//	if(tmp!=''){
//		tmp = tmp.replaceAll('&lt;', '<');
//		tmp = tmp.replaceAll('&gt;', '>');
//		tmp = tmp.replaceAll('&#39;', '"');
//		tmp = tmp.replaceAll('&quot;', '"');
//		tbObj.innerHTML = tmp;	
//	}
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
//	var tbObj = getObj('pagingTb');
//	var tmp = docObjects[0].CellValue(2, 'Indexing');
//	if(tmp!=''){
//		tmp = tmp.replaceAll('&lt;', '<');
//		tmp = tmp.replaceAll('&gt;', '>');
//		tmp = tmp.replaceAll('&#39;', '"');
//		tmp = tmp.replaceAll('&quot;', '"');
//		tbObj.innerHTML = tmp;		
//	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet_OnDblClick(sheetObj,Row,Col){	
    var formObj  = document.frm1;
   	
    doProcess = true;
   	formObj.f_cmd.value = "";
   	var trf_tp_cd = sheetObj.cellValue(Row, "trf_tp_cd");

   	if(trf_tp_cd=="S"){
   		
   		var paramStr = "./SAL_TFM_0010.clt?f_cmd="+COMMAND01+"&trdp_cd="+sheetObj.CellValue(Row,"trdp_cd")+"&trf_tp_cd="+sheetObj.CellValue(Row,"trf_tp_cd")+
   		"&trf_ctrt_no="+sheetObj.CellValue(Row,"trf_ctrt_no")+"&sell_buy_tp_cd="+sheetObj.CellValue(Row,"sell_buy_tp_cd")+
   		"&pol_cd="+sheetObj.CellValue(Row,"pol_cd")+"&pod_cd="+sheetObj.CellValue(Row,"pod_cd")+
   		"&dest_del_cd="+sheetObj.CellValue(Row,"dest_del_cd")+"&f_req_type=C";
   		
   		parent.mkNewFrame('Sea Tarrif', paramStr);
   	}else{
   		
   		var paramStr = "./SAL_TFM_0020.clt?f_cmd="+COMMAND01+"&trdp_cd="+sheetObj.CellValue(Row,"trdp_cd")+"&trf_tp_cd="+sheetObj.CellValue(Row,"trf_tp_cd")+
   		"&trf_ctrt_no="+sheetObj.CellValue(Row,"trf_ctrt_no")+"&sell_buy_tp_cd="+sheetObj.CellValue(Row,"sell_buy_tp_cd")+
   		"&pol_cd="+sheetObj.CellValue(Row,"pol_cd")+"&pod_cd="+sheetObj.CellValue(Row,"pod_cd")+
   		"&dest_del_cd="+sheetObj.CellValue(Row,"dest_del_cd")+"&f_req_type=C";
   		
   		parent.mkNewFrame('Air Tarrif', paramStr);
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
	
//	if ( s_code != "" ) {
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
//			if ( s_code != "" ) {
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
//		}
//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = masterVals[0]; 
				formObj.trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "location_pol"){
				formObj.pol_cd.value  = masterVals[0]; 
				formObj.pol_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "location_pod"){
				formObj.pod_cd.value  = masterVals[0]; 
				formObj.pod_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "location_dest"){
				formObj.dest_del_cd.value  = masterVals[0]; 
				formObj.dest_del_nm.value  = masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = ""; 
				formObj.trdp_nm.value  = "";
				
			}else if(CODETYPE == "location_pol"){
				formObj.pol_cd.value  = ""; 
				formObj.pol_nm.value  = "";
				
			}else if(CODETYPE == "location_pod"){
				formObj.pod_cd.value  = ""; 
				formObj.pod_nm.value  = "";
				
			}else if(CODETYPE == "location_dest"){
				formObj.dest_del_cd.value  = ""; 
				formObj.dest_del_nm.value  = "";
			}
		}
	}else{
		//Error occurred
		alert(getLabel('FMS_COM_ALT001') + "\n\n: SAL_TFM_0040.391");
	}
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.trf_term_dt, 'trf_term_dt', 'MM-dd-yyyy');
        break;
        
    }
    
}


function getPageURL() {
	return document.getElementById("pageurl").value;
}

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
			var col = sheetObj.MouseCol;
			if(sheetObj.ColSaveName(col)==""){
//				alert("You can't Hidden this column.");
				alert(CM_MSG6);
				return false;
			}
			
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}