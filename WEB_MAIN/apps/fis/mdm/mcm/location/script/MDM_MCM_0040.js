﻿var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
    if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0040GS.clt", FormQueryString(formObj) );
            }
            displayClear();
            break;
		case "SEARCHLIST01":
            formObj.f_cmd.value=SEARCHLIST01;
            //검증로직
            if(validateForm(sheetObj2, formObj, SEARCHLIST, 1)){
            	sheetObj2.DoSearch("MDM_MCM_0041GS.clt", FormQueryString(formObj) );
            }
            break;
		case "NEW":
			displayClear();
			break;
		case "ADD_1":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=ADD;
             	sheetObj.DoSearch("MDM_MCM_0040GS.clt", FormQueryString(formObj) );
            	//Save success!
        		//alert(getLabel('FMS_COM_NTYCOM'));
        		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
        		showCompleteProcess();
	        }
			break;
		case "MODIFY_1":
//			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=MODIFY;
             	sheetObj.DoSearch("MDM_MCM_0040GS.clt", FormQueryString(formObj) );
            	//Save success!
        		//alert(getLabel('FMS_COM_NTYCOM'));
        		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
        		showCompleteProcess();
//	        }
			break;
		case "ROWADD":
			var iRows=sheetObj.LastRow();
            var Row=sheetObj.DataInsert(++iRows);
            sheetObj.SetCellValue(Row, 3,formObj.i_conti_cd.value);
			sheetObj.SetCellValue(Row, 4,formObj.i_locl_nm.value);
			sheetObj.SetCellValue(Row, 5,formObj.i_desc.value);
			sheetObj.SetCellValue(Row, 9,formObj.i_rgst_usrid.value);
			sheetObj.SetCellValue(Row, 11,formObj.i_rgst_tms.value);
			sheetObj.SetCellValue(Row, 12,formObj.i_modi_usrid.value);
			sheetObj.SetCellValue(Row, 13,formObj.i_modi_tms.value);
			var bolUseYn=formObj.i_use_flg.checked;
			if ( bolUseYn == "true" ) {
				sheetObj.SetCellValue(Row, 6,"Y");
			} else {
				sheetObj.SetCellValue(Row, 6,"N");
			}
		break;
		case "REMOVE":
            formObj.f_cmd.value=REMOVE;
            if(validateForm(sheetObj,formObj,REMOVE, 1)){
            	//'삭제하시겠습니까?')){
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("MDM_MCM_0040GS.clt", FormQueryString(formObj),"ibflag",false);
                }
			}
            break;
		case "SAVE":
			doAction();
			break;
		case "CURRENCY_POPLIST_1"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		callBackFunc = "CURRENCY_POPLIST_1";
	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
   	        
   	        break;
		case "CURRENCY_POPLIST_2"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		callBackFunc = "CURRENCY_POPLIST_2";
	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
   	        
   	        break;
		case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		callBackFunc = "STATE_POPLIST";
	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,444,"yes");
   	        
   	        break;
		case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(4);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		rtnary[3]="LOC";
	   		callBackFunc = "LOCATION_POPLIST";
	        modal_center_open('./CMM_POP_0310.clt', rtnary, 806,444,"yes");
   	         
   	        break;
		case "OFFICE_POPLIST_1"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "OFFICE_POPLIST_1";
	        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
	        
   	        break;
		case "OFFICE_POPLIST_2"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
	   		rtnary[0]="1";
   	        callBackFunc = "OFFICE_POPLIST_2";
	        modal_center_open('./CMM_POP_0050.clt', rtnary, 556,634,"yes");
   	        
   	        break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data	
				ComShowCodeMessage("COM132501");
			}else{	
//				sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
				sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
			}	
			
           break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
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
    fncUserIata(formObj.i_loc_clss_cd.value);
    doWork('SEARCHLIST');
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
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0040_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Seq",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"loc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"loc_tp_desc",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"cnt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:120,   Align:"Left",    ColMerge:1,   SaveName:"cnt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:120,   Align:"Left",    ColMerge:1,   SaveName:"ofc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"finc_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"icao_cd_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"prnt_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_tms",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_tms",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"desc",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"td_qty",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ams_loc_val",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"loc_clss_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"stn_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"un_loc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"state_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"state_locl_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"state_eng_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cbsa_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Left",    ColMerge:1,   SaveName:"svc_lane_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Left",    ColMerge:1,   SaveName:"dock_rcpt_rmk",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                    ];
              
             InitColumns(cols);

             SetEditable(1);
             SetSheetHeight(428);
             

           }
           break;
           case 2:      //IBSheet1 init
        	with(sheetObj){
            var HeadTitle="LOC_TP_CD" ;

            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:HeadTitle, Align:"Center"} ];
            InitHeaders(headers, info);
            var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"loc_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
            InitColumns(cols);
            SetVisible(false);
            SetEditable(1);
         }
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1 ; i<docObjects[0].LastRow() + 1 ; i++){
		if(docObjects[0].GetCellValue(i, "loc_cd") == frm1.i_loc_cd.value){
			frm1.i_rgst_usrid.value=docObjects[0].GetCellValue(i, "rgst_usrid");
			frm1.i_rgst_tms.value=docObjects[0].GetCellValue(i, "rgst_tms");
			frm1.i_modi_usrid.value=docObjects[0].GetCellValue(i, "modi_usrid");
			frm1.i_modi_tms.value=docObjects[0].GetCellValue(i, "modi_tms");
		}
	}
	displayClear();
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.i_cnt_cd.value=sheetObj.GetCellValue(Row, 8);
	formObj.i_cnt_nm.value=sheetObj.GetCellValue(Row, 6);
	formObj.i_loc_cd.value=sheetObj.GetCellValue(Row, 3);
	formObj.i_loc_nm.value=sheetObj.GetCellValue(Row, 4);
	formObj.i_desc.value=sheetObj.GetCellValue(Row, "loc_tp_desc");
	formObj.i_addr.value=sheetObj.GetCellValue(Row, "desc");

	//#3355 [JTC]Dock Receipt 수정
	formObj.dock_rcpt_rmk.value=sheetObj.GetCellValue(Row, "dock_rcpt_rmk");

	formObj.i_td_qty.value=sheetObj.GetCellValue(Row, "td_qty");
	formObj.i_icao_cd_no.value=sheetObj.GetCellValue(Row, 11);
	formObj.i_ams_loc_val.value=sheetObj.GetCellValue(Row, "ams_loc_val");
	formObj.i_stn_no.value=sheetObj.GetCellValue(Row, "stn_no");
	formObj.i_un_loc_cd.value = sheetObj.GetCellValue(Row, "un_loc_cd");
	formObj.i_cbsa_loc_cd.value = sheetObj.GetCellValue(Row, "cbsa_loc_cd");
	formObj.i_loc_clss_cd.value=sheetObj.GetCellValue(Row, "loc_clss_cd");
	formObj.i_prnt_loc_cd.value=sheetObj.GetCellValue(Row, "prnt_loc_cd");
	formObj.i_rgst_usrid.value=sheetObj.GetCellValue(Row, 13);
	formObj.i_rgst_tms.value=sheetObj.GetCellValue(Row, 15);
	formObj.i_modi_usrid.value=sheetObj.GetCellValue(Row, 16);
	formObj.i_modi_tms.value=sheetObj.GetCellValue(Row, 18);
	fncUserIata(sheetObj.GetCellValue(Row, "loc_clss_cd"));
	formObj.i_loc_cd.disabled=true;
	formObj.i_loc_cd.className="search_form-disable";
	formObj.i_state_cd.value=sheetObj.GetCellValue(Row, "state_cd");
	formObj.i_state_nm.value=sheetObj.GetCellValue(Row, "state_locl_nm");
	formObj.i_svc_lane_nm.value=sheetObj.GetCellValue(Row, "svc_lane_nm");
	//	formObj.i_state_eng_nm.value = sheetObj.CellValue(Row, "state_eng_nm");
	var bolUseYn=sheetObj.GetCellValue(Row, 7);
		if ( bolUseYn == "Y" ) {
			formObj.i_use_flg.checked=true;
		} else if ( bolUseYn == "N" ) {
			formObj.i_use_flg.checked=false;
		}
		formObj.save_flg.value='U';
		doWork('SEARCHLIST01');
}
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	
	// 콤보 초기화
	var intTpCdCnt=formObj.i_loc_tp_cd.length;
   	for ( var j=0 ; j < intTpCdCnt ; j++ ) {
		formObj.i_loc_tp_cd[j].checked=false;
    }
    // Hidden Sheet의 정보를 CheckBox로 가져옴
   	var intRows=sheetObj2.LastRow() + 1;
	var intTpCdCnt=formObj.i_loc_tp_cd.length;
	
	for ( var i=1 ; i <= intRows ; i++ ) {
		for ( var j=0 ; j < intTpCdCnt ; j++ ) {
			if ( formObj.i_loc_tp_cd[j].value == sheetObj2.GetCellValue(i, 0) ) {
				formObj.i_loc_tp_cd[j].checked=true;
			}
		}
	}
}
function displayClear() {
	var formObj=document.frm1;
	formObj.i_cnt_cd.value="";
	formObj.i_loc_clss_cd.value="U";
	formObj.i_prnt_loc_cd.value="";
	formObj.i_cnt_nm.value="";
	formObj.i_loc_cd.value="";
	formObj.i_loc_nm.value="";
	formObj.i_desc.value="";

	//#3355 [JTC]Dock Receipt 수정
	formObj.dock_rcpt_rmk.value="";
	
	formObj.i_addr.value="";
	formObj.i_td_qty.value="";
	formObj.i_icao_cd_no.value="";
	formObj.i_ams_loc_val.value="";
	formObj.i_stn_no.value="";
	formObj.i_un_loc_cd.value="";
	formObj.i_cbsa_loc_cd.value="";
	//formObj.i_finc_ofc_cd.value = "";
	formObj.i_rgst_usrid.value="";
	formObj.i_rgst_tms.value="";
	formObj.i_modi_usrid.value="";
	formObj.i_modi_tms.value="";
	formObj.i_loc_cd.disabled=false;
	formObj.i_loc_cd.className="search_form";
	formObj.i_use_flg.checked="true";
	formObj.i_prnt_loc_cd.disabled=true;
	formObj.i_prnt_loc_cd.className="search_form-disable";
	formObj.img_prnt_loc_cd.disabled=true;
	formObj.i_state_cd.value="";
	formObj.i_state_nm.value="";
	formObj.i_svc_lane_nm.value="";
	var intTpCdCnt=formObj.i_loc_tp_cd.length;
   	for ( var j=0 ; j < intTpCdCnt ; j++ ) {
		formObj.i_loc_tp_cd[j].checked=false;
    }
   	formObj.save_flg.value='I';
   	fncUserIata(formObj.i_loc_clss_cd.value);
}
/**
 * 콤보 조회
 */
function doAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_loc_cd=formObj.i_loc_cd.value;
	if(checkAddModiVal(frm1)){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchLocationCode&s_loc_cd='+i_loc_cd, './GateServlet.gsl');
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(checkAddModiVal(frm1)){
				//doWork("MODIFY_1");
				//수정하지 않고 경고 메시지를 띄운다
				if(formObj.save_flg.value =="I"){ // 신규저장
					if(confirm(getLabel('MDM_COM_ALT009')+'\n'+getLabel('FMS_COM_CFMMOD'))){
						doWork("MODIFY_1");
					}
				}else if(formObj.save_flg.value =="U"){
					if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
						doWork("MODIFY_1");
					}
				}
			}
		} else {
			if(checkAddModiVal(frm1)){
				doWork("ADD_1");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
/**
 * 콤보 조회
 */
function doAction2(){
	var formObj=document.frm1;
	formObj.i_prnt_loc_cd.value=formObj.i_prnt_loc_cd.value.toUpperCase();
	var i_loc_cd=formObj.i_loc_cd.value;
	var i_prnt_loc_cd=formObj.i_prnt_loc_cd.value;
	var i_loc_clss_cd=formObj.i_loc_clss_cd.value;
	if(i_prnt_loc_cd != ""){
		if ( formObj.i_loc_cd.value == "" || formObj.i_loc_cd.value == null ) {
			//Please enter a [Location Code]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_LOCA') + getLabel('FMS_COD_CODE'));
			formObj.i_prnt_loc_cd.value="";
			formObj.i_loc_cd.focus();
			return false;
		}
		ajaxSendPost(dispAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchParentLocationCode&s_loc_cd='+i_loc_cd+'&s_prnt_loc_cd='+i_prnt_loc_cd+'&s_loc_clss_cd='+i_loc_clss_cd, './GateServlet.gsl');
	}
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
	if(obj.value == ""){
		if(str == "country"){
			frm1.i_cnt_nm.value="";
		}else if(str == "state"){
			frm1.i_state_nm.value="";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value=masterVals[0];//cnt_cd
				formObj.i_cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_prnt_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				//formObj.s_Port_name.value = masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}else if(CODETYPE =="state"){
				formObj.i_state_cd.value=masterVals[0];//state_cd
				formObj.i_state_nm.value=masterVals[3];//state_locl_nm
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value="";//trdp_cd
				formObj.s_liner_abbr.value="";//shrt_nm
				formObj.s_liner_name.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value="";//cnt_cd
				formObj.i_cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_prnt_loc_cd.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				//formObj.s_Port_name.value = "";//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value="";
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value="";
				formObj.s_office_name.value="";
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value="";
				formObj.s_user_name.value="";
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value="";
				formObj.s_commodity_name.value="";
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value="";
				formObj.s_package_name.value="";
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value="";
				formObj.s_cargo_name.value="";
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value="";
				formObj.s_vessel_name.value="";
			}else if(CODETYPE =="state"){
				formObj.i_state_cd.value="";
				formObj.i_state_nm.value="";
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
	}
	var intTpCdCnt=formObj.i_loc_tp_cd.length;
	var strTpCd="";
	for ( var i=0 ; i < intTpCdCnt ; i++ ) {
		if ( formObj.i_loc_tp_cd[i].checked == true ) {
			strTpCd=strTpCd + formObj.i_loc_tp_cd[i].value + ";";
		}
	}
	strTpCd=strTpCd.substring(0, strTpCd.length-1);
	formObj.f_loc_tp_cd.value=strTpCd;
	formObj.i_loc_cd.disabled=false;
}
function fncLocTpCdClick() {
	var formObj=document.frm1;
	var iLen=formObj.i_loc_tp_cd.length;
	var strTmp="";
	var arrTmp=PARAM1_1.split('|');
	for ( var i=0 ; i < iLen ; i++ ) {
		if ( formObj.i_loc_tp_cd[i].checked == true ) { 
			if ( strTmp != "" ) strTmp += ", ";
			strTmp += arrTmp[i];
		}
	}
	formObj.i_desc.value=strTmp;
}
function fncLocationSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function fncNumberFormat(intKey) {
	if(((intKey < 48) || (intKey > 57)) && intKey != 45){
		//Please enter a [Number Format]!
		alert(getLabel('FMS_COM_ALT002'));
		event.returnValue=false;
	}
}
function fncNumberScope() {
	var formObj=document.frm1;
	if ( formObj.i_td_qty.value < -24 || formObj.i_td_qty.value > 24 ) {
		//Please enter the number between -24 ~ 24.
		alert(getLabel('MDM_COM_ALT001'));
		formObj.i_td_qty.value="";
		return false;
	}
}
function fncUserIata(tmp) {
	var formObj=document.frm1;
	if ( tmp == "I" ) {
		//formObj.i_td_qty.disabled = true;
		//formObj.i_ams_loc_val.disabled = true;
		formObj.i_icao_cd_no.disabled=false;
		formObj.i_prnt_loc_cd.disabled=false;
		//formObj.i_td_qty.className = "search_form-disable";
		//formObj.i_ams_loc_val.className = "search_form-disable";
		formObj.i_icao_cd_no.className="search_form";
		formObj.i_prnt_loc_cd.className="search_form";
		formObj.img_prnt_loc_cd.disabled=false;
		//formObj.i_td_qty.value = "";
		//formObj.i_ams_loc_val.value = "";
	} else if ( tmp == "U" ) {
		formObj.i_td_qty.disabled=false;
		formObj.i_ams_loc_val.disabled=false;
		formObj.i_icao_cd_no.disabled=true;
		formObj.i_prnt_loc_cd.disabled=true;
		formObj.i_td_qty.className="search_form";
		formObj.i_ams_loc_val.className="search_form";
		formObj.i_icao_cd_no.className="search_form-disable";
		formObj.i_prnt_loc_cd.className="search_form-disable";
		formObj.img_prnt_loc_cd.disabled=true;
		formObj.i_prnt_loc_cd.value="";
		formObj.i_icao_cd_no.value="";
	}
}
function checkAddModiVal(frm1){
    if(checkInputVal(frm1.i_loc_cd.value, 3, 5, "T", getLabel('LOC_CD'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_loc_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_addr.value, 0, 200, "T", getLabel('ADDR'))!='O'){
    	return false;
    }
    if ( frm1.i_loc_clss_cd.value == "I" ) {
	    if(checkInputVal(frm1.i_icao_cd_no.value, 0, 20, "T", getLabel('ICAO'))!='O'){
	    	return false;
	    //} else if(checkInputVal(frm1.i_prnt_loc_cd.value, 3, 5, "T", getLabel('PRNT_LOC_CD'))!='O'){
    	//	return false;
    	}
	} else if ( frm1.i_loc_clss_cd.value == "U" ) {
		//if(checkInputVal(frm1.i_td_qty.value, 0, 7, "N", getLabel('TIME_TIFF'))!='O'){
	    //	return false;
	    //} else 
		if(checkInputVal(frm1.i_ams_loc_val.value, 0, 10, "T", getLabel('AMS_CD'))!='O'){
	    	return false;
   		}
	}
    return true;
}
function CURRENCY_POPLIST_1(rtnVal){
	 var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cnt_cd.value=rtnValAry[0];//cd_val
	}
}
function CURRENCY_POPLIST_2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_cnt_cd.value=rtnValAry[0];//cd_val
		formObj.i_cnt_nm.value=rtnValAry[1];//cd_nm
	}
}
function STATE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_state_cd.value=rtnValAry[0];//cd_val
		formObj.i_state_nm.value=rtnValAry[1];//cd_nm
	}
}
function LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_prnt_loc_cd.value=rtnValAry[0];
	}
}
function OFFICE_POPLIST_1(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_ofc_cd.value=rtnValAry[0];
	}
}
function OFFICE_POPLIST_2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.i_finc_ofc_cd.value=rtnValAry[0];
	}
}