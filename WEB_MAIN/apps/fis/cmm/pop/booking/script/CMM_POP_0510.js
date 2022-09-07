/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	setFromToDt(document.form.f_bkg_strdt, document.form.f_bkg_enddt);
}
/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                sheetObj.DoSearch("CMM_POP_0510GS.clt", FormQueryString(formObj) );
	    	   break;  
			case "CLOSE":
				ComClosePopup();
      	    break;	
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0510.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0510.002");
        }
	}
}

var firCalFlag=false;

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
            cal.select(formObj.f_bkg_strdt,  formObj.f_bkg_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
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
	var arg=parent.rtnary;
	
	var formObj  = document.form;
	
	setOfficeAllOption(formObj.f_ofc_cd);
	
	formObj.f_bkg_no.value = (arg[0] == undefined || arg[0] == 'undefined') ? '' : arg[0];
	formObj.f_biz_clss_cd.value = (arg[1] == undefined || arg[1] == 'undefined') ? '' : arg[1];
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
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
             
           var formObj=document.form;

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('CMM_POP_0210_HDR_1'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",                 	KeyField:0 },
                  {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",            	 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",       			 KeyField:0 },
                  {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"act_shpr_trdp_nm",  	 KeyField:0 },
                  {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_nm",   		 KeyField:0 },
                  {Type:"Date",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bkg_dt_tm",         	 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"proc_ofcnm",        	 KeyField:0 },
                  
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"proc_dept_nm",      	 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"proc_usrnm",    	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"bkg_seq",	  	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"po_no",	  	  		     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"lc_no",					 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"act_shpr_trdp_cd",       KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_addr",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_addr",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_addr",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"exp_ref_no",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pu_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pu_trdp_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cgo_pu_trdp_cd",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cgo_pu_trdp_nm",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cgo_pu_trdp_addr",       KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rcv_wh_cd",	  	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rcv_wh_nm",	  	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trk_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trk_trdp_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cust_ref_no",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cntr_info",	  	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",	  	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"por_cd",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"por_nm",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pol_cd",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pol_nm",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pod_cd",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pod_nm",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"del_cd",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"del_nm",	  	  		 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_cd",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"etd_dt_tm",	  	         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"eta_dt_tm",	  	         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"etd_por_tm",	  	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"shp_mod_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pck_qty",	  	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pck_ut_cd",	  	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"grs_wgt_ut_cd",	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"grs_wgt",	  	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"grs_wgt1",	  	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"meas_ut_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"meas",	  	  			 KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"meas1",	  	  		     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"fm_svc_term_cd",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_svc_term_cd",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cargo_tp_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cut_off_dt",	  	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cut_off_tm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rail_cut_off_dt",	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rail_cut_off_tm",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"wh_cut_off_dt",	         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"wh_cut_off_tm",	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"doc_cut_off_dt",	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"doc_cut_off_tm",	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"sls_ofc_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"sls_dept_cd",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"sls_usrid",	  	         KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",	  	     KeyField:0 },
                  {Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
			
           InitColumns(cols);
           SetSheetHeight(260);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetEditable(0);
                 }
           break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	/*
	if (formObj.f_hbl_entry_yn.value == "Y" && sheetObj.GetCellValue(Row, "bl_no") != "") {
		alert(getLabel('FMS_COM_ALT070'));
		return;
	}
	*/
	
	var retArray = "";	
	retArray += sheetObj.GetCellValue(Row, "bkg_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_seq");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "lc_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "act_shpr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "act_shpr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "exp_ref_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_pu_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_pu_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_pu_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trk_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trk_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cust_ref_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cntr_info");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "por_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "por_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "del_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "del_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fnl_dest_loc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fnl_dest_loc_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "etd_por_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shp_mod_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rep_cmdt_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rep_cmdt_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pck_qty");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pck_ut_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grs_wgt_ut_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grs_wgt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grs_wgt1");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "meas");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "meas1");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fm_svc_term_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "to_svc_term_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cargo_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "wh_cut_off_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "wh_cut_off_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "sls_ofc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "sls_dept_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "sls_usrid");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "sls_usr_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "po_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "item_no");
	
	ComClosePopup(retArray);
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
