var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
    // 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST02":
            var chkOk=true;
            //일자를 선택한 경우
            if(frm1.f_dt_clss_cd[0].checked){
            	var tmpDt=frm1.etd_strdt.value;
            	if(tmpDt.length<10){
            		//alert('조회일자를 입력해 주십시오!');
            		alert(getLabel('FMS_COM_ALT001')+ "\n\n: CMM_POP_0220.14");
            		chkOk=false;
            		frm1.etd_strdt.focus();
            	}
            }
            if(chkOk){
            	formObj.f_cmd.value=SEARCHLIST02;
            	sheetObj.DoSearch("CMM_POP_0220GS.clt", FormQueryString(formObj) );
            }
       break;
       case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
		   	rtnary[0]="SAL";
		   	rtnary[1]="";
		   	rtnary[2]=window;
		   	callBackFunc = "TRDP_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	    
	    break;
    }
}
/**
 * 화면로드시 원간 조회의 <select>에 현재일을 선택하게함 
 */
function setToday(){
	var curMonth='';
	var xcrtDt=frm1.f_dft_dt.value;
	if(xcrtDt.length==8){
		mkYearSelect(frm1.f_etd_year, 2, 10, true, xcrtDt.substring(0, 4));
		curMonth=xcrtDt.substring(4, 6)
	}else{
		mkYearSelect(frm1.f_etd_year, 2, 10, true, '')	
		curMonth=todayMonth();
		if(curMonth<10){
			curMonth='0'+curMonth;
		}
	}
	//유저 브라우저상의 월을 선택함
	var monthVals=frm1.f_etd_month.options;
	for(var i=0; i < monthVals.length; i++){
		if(curMonth==monthVals[i].value){
			monthVals[i].selected=true;
		}
	}
}
/**
 * 조회기간 조건 선택시
 */
function chgDisp(dispTp){
	if(dispTp==1){
		getObj('monthVal').style.display='none';
		getObj('dayVal').style.display='block';
	}else{
		getObj('dayVal').style.display='none';
		getObj('monthVal').style.display='block';
	}
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	var arg=parent.rtnary;
	var formObj=document.frm1;
	formObj.openMean.value=arg[0];
    for(var i=0;i<docObjects.length;i++){
        // khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        // khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    formObj.etd_strdt.value=getTodayStr();
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      // IBSheet1 init
		    with (sheetObj) {
	        
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('CMM_POP_0220_HDR_1'), Align:"Center"},
	                    { Text:getLabel('CMM_POP_0220_HDR_2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",        KeyField:0 },
	               {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",        KeyField:0 },
	               {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"xch_curr_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",      Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"xch_amt",        KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:8,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"fm_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"to_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:130,  Align:"Center",  ColMerge:1,   SaveName:"finc_xcrt_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	         
	        InitColumns(cols);

	        SetEditable(0);
	        
	        SetSheetHeight(410);
		   }                                                      
		break;
    }
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        /*case 'DATE01':   //달력 조회 From ~ To 팝업 호출 
            var cal=new calendarPopupFromTo();
            cal.displayType="date";
            cal.select(formObj.s_modi_tms_fm, 's_modi_tms_fm', formObj.s_modi_tms_to, 's_modi_tms_to', 'yyyy-MM-dd');
        break;*/
        case 'DATE01':   //달력 조회 팝업 호출
             var cal=new ComCalendar();
             cal.select(formObj.etd_strdt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var retArray=sheetObj.GetCellValue(Row, "xch_amt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "xch_curr_cd");
	ComClosePopup(retArray);
}

function TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_trdp_cd.value=rtnValAry[0];
		//formObj.shrt_nm.value = rtnValAry[1];
		formObj.f_trdp_nm.value=rtnValAry[2];    	        
	}
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	
	var s_type="";
	
	var formObj=document.frm1;
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			if(str=="CUST"){
				s_type="trdpCode";
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="CUST"){
			s_type="trdpCode";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
	if(s_code == ""){
		if(str=="CUST"){
			formObj.f_trdp_cd.value = "";
			formObj.f_trdp_nm.value = "";
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
			var Vals=rtnArr[0].split('@@^');	
			if(CODETYPE == "CUST"){
				formObj.f_trdp_cd.value=Vals[0]; 
				formObj.f_trdp_nm.value=Vals[3];
			}
		}else{
			if(CODETYPE == "CUST"){
				formObj.f_trdp_cd.value="";
				formObj.f_trdp_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}