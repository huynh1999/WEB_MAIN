/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIC_BMD_0010.js
*@FileTitle  : Carrier Schedule 등록 및 수정
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var row = -1;
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직yyy
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("AIC_BMD_0010GS.clt", FormQueryString(formObj));
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "NEW":
    	   /*
			formObj.f_dep_loc_cd.value="";
			formObj.f_dep_loc_nm.value="";
			formObj.f_dest_loc_cd.value="";
			formObj.f_dest_loc_nm.value="";
			formObj.f_trdp_cd.value="";
			formObj.f_trdp_nm.value="";
			fncFormStart();
			//formObj.i_prd_dt.disabled = false;
			var tmpObj=getObj('i_prd_dt_cal');
        	//tmpObj.style.display = 'block';
			sheetObj.RemoveAll();
			*/
    	   doShowProcess();
			var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
//			parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
			window.location.href = currLocUrl
			break;
       case "ROWADD":
    	   	var intRows=sheetObj.LastRow() + 1;
            var intLast=sheetObj.DataInsert(intRows);
       break;
       case "MODIFY":
    	   	if(!fncGridCheck()){
    	   		return;
    	   	}
			if (formObj.i_prd_dt.value == "" ){
				//alert("Period Data Fail.");
				alert(getLabel('FMS_COM_ALT00'));
				return false;
			}
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("AIC_BMD_0010GS.clt", FormQueryString(formObj),"ibflag",false);
                formObj.i_prd_dt.disabled=true;
            }
       break;
       case "REMOVE":
            var intRows=sheetObj.LastRow();
            for ( var i=1 ; i <= intRows ; i++ ) {
            	if ( sheetObj.SetCellValue(i, 0) == 1 ) sheetObj.GetRowHidden(i,1);
            }
       break;
       case "EXCEL":
    		if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{	
    			sheetObj.Down2Excel( { SheetDesign:1,Merge:1,HiddenColumn:1,CheckBoxOffValue:0,CheckBoxOnValue:0 });
    		}	

       break;
    }
}
function doDisplay2(doWhat, formObj){
//	var mCal=new calendarModalMonth();
//	if(calTp=='FIND'){
//		mCal.select(frm1.f_prd_dt, 'yyyy-MM');
//	}else{
//		mCal.select(frm1.i_prd_dt, 'yyyy-MM');
//	}
	
	switch(doWhat){
    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
        var cal=new ComCalendar();
        cal.setDisplayType("month");
        cal.select(formObj.f_prd_dt, 'MM-yyyy');
    break;
    case 'DATE2':   //달력 조회 From ~ To 팝업 호출 
        var cal=new ComCalendar();
        cal.setDisplayType("month");
        cal.select(formObj.i_prd_dt, 'MM-yyyy');
    break;
	}
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1s[0].f_CurPage.value=callPage;
	doWork('SEARCH01');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 
	var formObj = document.frm1;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.ofc_cd);
    
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i],SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	removeFirstKeyField(docObjects[0]);
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIC_BMD_0010_HDR_1'), Align:"Center"},
	                    { Text:getLabel('AIC_BMD_0010_HDR_2'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"",                 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Seq",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"PopupEdit", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"flt_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dep_loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dest_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_mon_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_tue_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_wed_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_thu_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_fri_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_sat_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"wkdy_sun_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, HeaderCheck:0 },
	               {Type:"Date",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dep_hrmnt",        KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"Date",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"arr_hrmnt",        KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"Int",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"dur_dys_qty",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	               {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ts1_arpt_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"Int",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ts1_dur_dys_qty",  KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	               {Type:"Date",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ts1_arr_hrmnt",    KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"Popup",     Hidden:0, Width:60,   Align:"Left",    ColMerge:1,   SaveName:"ts1_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"ts1_flt_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	               {Type:"PopupEdit", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ts2_arpt_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"Int",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ts2_dur_dys_qty",  KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	               {Type:"Date",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ts2_arr_hrmnt",    KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
	               {Type:"Popup",     Hidden:0, Width:60,   Align:"Left",    ColMerge:1,   SaveName:"ts2_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"ts2_flt_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"rmk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"air_skd_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"prd_dt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ts1_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"ts2_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	        InitColumns(cols);
	        SetEditable(1);
	        SetSheetHeight(370);
	        resizeSheet();
	              }
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

/* 버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(obj){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	var sheetObject=docObjects[0];
	var formObj=document.frm1;
	try {
		switch(obj) {
			case "SEARCHLIST":
				doActionIBSheet(sheetObject, formObj, SEARCHLIST);
			break;
		} // end switch
	} 
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        } 	
	}
}
// Sheet관련 프로세스 처리
function doActionIBSheet(sheetObj, formObj, sAction) {
	switch(sAction) {
		case SEARCHLIST:      //조회
			defaultrow=0;
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("AIC_BMD_0010GS.clt", FormQueryString(formObj) );
		break;
		case 'ROWADD':      //라인 추가
		break;
	}
}
/**
 * 화면 폼입력값에 대한 유효성검증 프로세스 처리
 */
function doDisplay(sAction){
	var formObj=document.frm1;
	switch(sAction){
		case "DATE1":   //달력 조회 
			var cal=new calendarPopup();
			cal.select(formObj.tx_apply_date, "tx_apply_date", "yyyy-MM-dd");
		break;
		case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="1";
//			rtnary[1]=formObj.f_trdp_nm.value;
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "LINER_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "POPUP_POR":
			rtnary=new Array(3);
			rtnary[0]="1";
			rtnary[1]="IT";
//			rtnary[2]=formObj.f_dep_loc_nm.value;
//			rtnary[3]=formObj.f_dep_loc_cd.value;
			rtnary[2]="";
			rtnary[3]="";
			
			callBackFunc = "POPUP_POR";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 810,415,"yes");
		break;
		case "POPUP_POD":
			rtnary=new Array(3);
			rtnary[0]="1";
			rtnary[1]="IT";
//			rtnary[2]=formObj.f_dest_loc_nm.value;
//			rtnary[3]=formObj.f_dest_loc_cd.value;
			rtnary[2]="";
			rtnary[3]="";
			
			callBackFunc = "POPUP_POD";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 810,415,"yes");
		break;
	}
}
//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet1_OnSearchEnd(){
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	//formObj.i_prd_dt.disabled = true;
	var tmpObj=getObj('i_prd_dt_cal');
	//tmpObj.style.display = 'none';
	if (sheetObj.RowCount() > 0 && sheetObj.GetCellValue(2, "prd_dt") != "" ) {

		var strPrdDt=sheetObj.GetCellValue(2, "prd_dt");
		if ( strPrdDt.length == 6 ) {
			//BluePrint	#230 
			strPrdDt=strPrdDt.substring(4, 6) + "-" + strPrdDt.substring(0, 4); 
		} 
		formObj.i_prd_dt.value=strPrdDt;
	}
	removeFirstKeyField(sheet1);
}
function removeFirstKeyField(sheetObj) {
	$($('#DIV_' + ((typeof sheetObj == "string") ? sheetObj : sheetObj.id)).find('span.GMKeyfield')[0]).remove();
}
//첫번째 그리드 등록/저장/삭제 후 처리프로세스
function sheet1_OnSaveEnd(sheetObj,ErrMsg){
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	if(ErrMsg==undefined || ErrMsg==null || ErrMsg =='' ){
		showCompleteProcess();
	}
}
function sheet1_OnPopupClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	row = Row;
	switch (sheetObj.ColSaveName(Col)) {
    	case "trdp_cd" :
    		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			rtnary[2]=window;
			
			callBackFunc = "TRDP_CD";
			modal_center_open('./CMM_POP_0010.clt?callTp=AC', rtnary, 1150,650,"yes");
    	break;
    	case "ts1_trdp_nm" :
    		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			rtnary[2]=window;
			
			callBackFunc = "TS1_TRDP_NM";
			modal_center_open('./CMM_POP_0010.clt?callTp=AC', rtnary, 1150,650,"yes");
    	break;
    	case "ts2_trdp_nm" :
    		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			rtnary[2]=window;
			
			callBackFunc = "TS2_TRDP_NM";
			modal_center_open('./CMM_POP_0010.clt?callTp=AC', rtnary, 1150,650,"yes");
    	break;
    	case "dep_loc_cd" :
    		rtnary=new Array(4);
			rtnary[0]="1";
			rtnary[1]="IT";
			rtnary[2]="";
			rtnary[3]=sheetObj.GetCellValue(Row,"dep_loc_cd");
			
			callBackFunc = "DEP_LOC_CD";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 810,415,"yes");
    	break;
    	case "dest_loc_cd" :
    		rtnary=new Array(3);
			rtnary[0]="1";
			rtnary[1]="IT";
			rtnary[2]="";
			rtnary[3]=sheetObj.GetCellValue(Row,"dest_loc_cd");
			callBackFunc = "DEST_LOC_CD";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 810,415,"yes");
    	break;
    	case "ts1_arpt_loc_cd" :
    		rtnary=new Array(4);
			rtnary[0]="1";
			rtnary[1]="IT";
			rtnary[2]="";
			rtnary[3]=sheetObj.GetCellValue(Row,"ts1_arpt_loc_cd");
			callBackFunc = "TS1_ARPT_LOC_CD";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 810,415,"yes");
    	break;
    	case "ts2_arpt_loc_cd" :
    		rtnary=new Array(3);
			rtnary[0]="1";
			rtnary[1]="IT";
			rtnary[2]="";
			rtnary[3]=sheetObj.GetCellValue(Row,"ts2_arpt_loc_cd");
			callBackFunc = "TS2_ARPT_LOC_CD";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 810,415,"yes");
    	break;
    }
}
var ctlCol=0;
var ctlRow=0;
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "trdp_cd" :
			ctlCol=Col;
			ctlRow=Row;
			sheetObj.SetCellValue(Row,Col,sheetObj.GetCellValue(Row, Col).toUpperCase(),0);
			codeNameAction("liner", sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
    	case "dep_loc_cd" :
			ctlCol=Col;
			ctlRow=Row;
			sheetObj.SetCellValue(Row,Col,sheetObj.GetCellValue(Row, Col).toUpperCase(),0);
			codeNameAction("location_dpt", sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
		case "dest_loc_cd" :
			ctlCol=Col;
			ctlRow=Row;
			sheetObj.SetCellValue(Row,Col,sheetObj.GetCellValue(Row, Col).toUpperCase(),0);
			codeNameAction("location_des", sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
		case "ts1_arpt_loc_cd" :
			ctlCol=Col;
			ctlRow=Row;
			sheetObj.SetCellValue(Row,Col,sheetObj.GetCellValue(Row, Col).toUpperCase(),0);
			codeNameAction("location_ts1", sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
		case "ts2_arpt_loc_cd" :
			ctlCol=Col;
			ctlRow=Row;
			sheetObj.SetCellValue(Row,Col,sheetObj.GetCellValue(Row, Col).toUpperCase(),0);
			codeNameAction("location_ts2", sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
	}
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	if(obj.value != ""){
		if(tmp=="onKeyDown"){
			if(event.keyCode==13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					str=sub_str;
				}else if(sub_str=="partner_"){
					str='trdpcode';
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if(tmp=="onBlur"){
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="location"){
				str=sub_str;
			}else if(sub_str=="partner_"){
				str='trdpcode';
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}else if(tmp=="Sheet"){
			if(str=='liner'){
				str='trdpcode';
				CODETYPE='liner';
			}else if(str.indexOf("location")!=-1){
				CODETYPE=str;
				str='location';
			}else if(str=="vessel"){
				str='srvessel';
				CODETYPE='vessel';
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+obj, './GateServlet.gsl');			
		}
	}else{
		if(obj.name=="f_dep_loc_cd"){
			formObj.f_dep_loc_nm.value="";
		}else if(obj.name=="f_dest_loc_cd"){
			formObj.f_dest_loc_nm.value="";
		}else if(obj.name=="f_trdp_cd"){
			formObj.f_trdp_nm.value="";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var sheetObj=docObjects[0];
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="partner_text"){
				frm1.f_trdp_cd.value=masterVals[0];
				frm1.f_trdp_nm.value=masterVals[2];
			}else if(CODETYPE =="location_pol"){
				frm1.f_dep_loc_cd.value=masterVals[0];
				frm1.f_dep_loc_nm.value=masterVals[3];
			}else if(CODETYPE =="location_pod"){
				frm1.f_dest_loc_cd.value=masterVals[0];
				frm1.f_dest_loc_nm.value=masterVals[3];
			}else if(CODETYPE =="liner"){
				sheetObj.SetCellValue(ctlRow, "trdp_cd",masterVals[0],0);
				sheetObj.SetCellValue(ctlRow, "trdp_nm",masterVals[2],0);
			}else if(CODETYPE =="location_dpt"){
				sheetObj.SetCellValue(ctlRow, "dep_loc_cd",masterVals[0],0);
			}else if(CODETYPE =="location_des"){
				sheetObj.SetCellValue(ctlRow, "dest_loc_cd",masterVals[0],0);
			}else if(CODETYPE =="location_ts1"){
				sheetObj.SetCellValue(ctlRow, "ts1_arpt_loc_cd",masterVals[0],0);
			}else if(CODETYPE =="location_ts2"){
				sheetObj.SetCellValue(ctlRow, "ts2_arpt_loc_cd",masterVals[0],0);
			}
		}else{
			if(CODETYPE =="partner_text"){
				frm1.f_trdp_cd.value='';
				frm1.f_trdp_nm.value='';
				frm1.f_trdp_cd.focus();
			}else if(CODETYPE =="location_pol"){
				frm1.f_dep_loc_cd.value='';
				frm1.f_dep_loc_nm.value='';
				frm1.f_dep_loc_cd.focus();
			}else if(CODETYPE =="location_pod"){
				frm1.f_dest_loc_cd.value='';
				frm1.f_dest_loc_nm.value='';
				frm1.f_dest_loc_cd.focus();
			}else if(CODETYPE =="liner"){
				sheetObj.SetCellValue(ctlRow, "trdp_cd",'',0);
				sheetObj.SetCellValue(ctlRow, "trdp_nm",'',0);
				sheetObj.SelectCell(ctlRow, "trdp_cd");
			}else if(CODETYPE =="location_dpt"){
				sheetObj.SetCellValue(ctlRow, "dep_loc_cd",'',0);
				sheetObj.SelectCell(ctlRow, "dep_loc_cd");
			}else if(CODETYPE =="location_des"){
				sheetObj.SetCellValue(ctlRow, "dest_loc_cd",'',0);
				sheetObj.SelectCell(ctlRow, "dest_loc_cd");
			}else if(CODETYPE =="location_ts1"){
				sheetObj.SetCellValue(ctlRow, "ts1_arpt_loc_cd",'',0);
				sheetObj.SelectCell(ctlRow, "ts1_arpt_loc_cd");
			}else if(CODETYPE =="location_ts2"){
				sheetObj.SetCellValue(ctlRow, "ts2_arpt_loc_cd",'',0);
				sheetObj.SelectCell(ctlRow, "ts2_arpt_loc_cd");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function fncFormStart() {
	var formObj=document.frm1;
	// 오늘 날짜 가져오기
	var now=new Date(); 				// 현재시간 가져오기
	var year=now.getFullYear(); 			// 년도 가져오기
	var month=now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date=now.getDate(); 			// 날짜 가져오기
	var fromDate=new Date();
	var tempDate=now.getTime() - ( 7*24*60*60*1000);
	fromDate.setTime(tempDate);
	var iyear=fromDate.getFullYear();
	var imonth=fromDate.getMonth() +1;
	var iday=fromDate.getDate();
	if(imonth < 10){
		imonth="0"+(imonth);
	}
	if(iday < 10){
		iday="0"+iday;
	}
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	var searchDay1=iyear + "-" + imonth + "-" + iday;
	today=month +"-"+ year;
	formObj.f_prd_dt.value=today;
	formObj.i_prd_dt.value=today;
}
function fncGridCheck(){
	var sheetObj=docObjects[0];
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
if ( sheetObj.GetCellValue(i, 'trdp_cd') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CARR'));
			sheetObj.SelectCell(i, 'trdp_cd');
			return false;
		}	
	}
	return true;
}
/**
 * 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인 - (/, -, .) 제거되고 비교
 * @param str   문자열
 * @return true 일자 , false
*/
function isValidYYYYMM ( obj ) {
   str=obj.value.replace(/\/|\-|\./g,"");
   if(trim(str).length==0){
	return;   
   }
   if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
	   alert(getLabel('FMS_COM_ALT040') + "\n\n: AIC_BMD_0010.701");
	   obj.value="";
       return;
   }
   if (str.length != 6) {
	   alert(getLabel('FMS_COM_ALT040') + "\n\n: AIC_BMD_0010.701");
	   obj.value="";
       return;
   }
   var year=str.substring(0,4);
   var month=str.substring(4,6);
   if ( parseInt2( year ) >= 1900  && isMonth( month )){
	   obj.value=year+"-"+month;
       return;
   }else {
	   alert(getLabel('FMS_COM_ALT040') + "\n\n: AIC_BMD_0010.717");
	   obj.value="";
       return;
   }
}
/**
 * 입력된 문자열이 일자의 월로 변환가능한지 확인
 * @param month   문자열
 * @return true : 가능할 경우
*/
function isMonth(month) {
   if (month.length > 2) return false;
   month=parseInt(month,10);
   if ((month <= 0) || (month > 12)) return false;
   return true;
}
function LINER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
//		formObj.s_cust_cd.value=rtnValAry[0];
//		formObj.s_cust_nm.value=rtnValAry[2];
//		formObj.f_rcv_from.value=rtnValAry[2];
		formObj.f_trdp_cd.value=rtnValAry[0];
		formObj.f_trdp_nm.value=rtnValAry[2];
//		formObj.f_rcv_from.value=rtnValAry[2];
	}      
}

function POPUP_POR(rtnVal){
	var formObj = document.frm1;
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_dep_loc_cd.value=rtnValAry[0];
		formObj.f_dep_loc_nm.value=rtnValAry[2];
	}  
}

function POPUP_POD(rtnVal){
	var formObj = document.frm1;
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_dest_loc_cd.value=rtnValAry[0];
		formObj.f_dest_loc_nm.value=rtnValAry[2];
	} 
}

function TRDP_CD(rtnVal){
	var sheetObj=docObjects[0];
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	sheetObj.SetCellValue(row, "trdp_cd",rtnValAry[0],0);
	sheetObj.SetCellValue(row, "trdp_nm",rtnValAry[2],0);
}

function TS1_TRDP_NM(rtnVal){
	var sheetObj=docObjects[0];
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	sheetObj.SetCellValue(row, "ts1_trdp_cd",rtnValAry[0],0);
	sheetObj.SetCellValue(row, "ts1_trdp_nm",rtnValAry[2],0);
}

function TS2_TRDP_NM(rtnVal){
	var sheetObj=docObjects[0];
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	sheetObj.SetCellValue(row, "ts2_trdp_cd",rtnValAry[0],0);
	sheetObj.SetCellValue(row, "ts2_trdp_nm",rtnValAry[2],0);
}

function DEP_LOC_CD(rtnVal){
	var sheetObj=docObjects[0];
	if( rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined ) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, "dep_loc_cd",rtnValAry[0],0);
	}
}

function DEST_LOC_CD(rtnVal){
	var sheetObj=docObjects[0];
	if(rtnVal==""||rtnVal=="undefined"||rtnVal==undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, "dest_loc_cd",rtnValAry[0],0);
	}
}

function TS1_ARPT_LOC_CD(rtnVal){
	var sheetObj=docObjects[0];
	if(rtnVal==""||rtnVal=="undefined"||rtnVal==undefined){
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, "ts1_arpt_loc_cd",rtnValAry[0],0);
	}
}

function TS2_ARPT_LOC_CD(rtnVal){
	var sheetObj=docObjects[0];
	if(rtnVal==""||rtnVal =="undefined"||rtnVal==undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, "ts2_arpt_loc_cd",rtnValAry[0],0);
	}
}

/**
 * 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인 - (/, -, .) 제거되고 비교
 * @param str   문자열
 * @return true 일자 , false
*/
function isValidMMYYYY ( obj ) {
   str=obj.value.replace(/\/|\-|\./g,"");
   if(trim(str).length==0){
	return;   
   }
   if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
   if (str.length != 6) {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
   var year=str.substring(2,6);
   var month=str.substring(0,2);
   if ( parseInt2( year ) >= 1900  && isMonth( month )){
	   obj.value=month+"-"+year;
       return;
   }else {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
}

//#456 [Airline Schedule] Cannot insert a new row by pressing Tab key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="rmk"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}