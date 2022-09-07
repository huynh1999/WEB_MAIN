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
                sheetObj.DoSearch("CMM_POP_0280GS.clt", FormQueryString(formObj) );
	    	   break;  
			case "CLOSE":
				ComClosePopup();
      	    break;	
			case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
				rtnary[1]=formObj.f_lnr_trdp_nm.value;
				rtnary[2]=window;
				
		   		callBackFunc = "LINER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp=LN', rtnary, 1150,650,"yes");
	   	 	break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0280.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0280.002");
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
	
	formObj.f_lnr_bkg_no.value = (arg[0] == undefined || arg[0] == 'undefined') ? '' : arg[0];
	formObj.f_mbl_entry_yn.value = (arg[1] == undefined || arg[1] == 'undefined') ? '' : arg[1];
	
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
           var headers = [ { Text:getLabel('CMM_POP_0280_HDR_1'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",                 	 KeyField:0 },
                        {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",	  	  	     KeyField:0 },
                        {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",           KeyField:0 },
                        {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",       		 KeyField:0 },
                        {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_nm",	  	     KeyField:0 },
                        {Type:"Date",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"bkg_dt_tm",         	 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_nm",   		 KeyField:0 },
                        {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_nm",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"proc_ofcnm",        	 KeyField:0 },
	                  
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"bkg_seq",	  	  	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_cd",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_addr",	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_cd",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_addr",	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_cd",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_nm",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_addr",	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_cd",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm",	  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"fwrd_agn_trdp_cd",     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"fwrd_agn_trdp_nm",  	 KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"fwrd_agn_trdp_addr",   KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cust_ref_no",	  	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cntr_info",	  	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"lnr_ctrt_no",	  	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_cd",	  	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",	  	     KeyField:0 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",	  	  	 KeyField:0 },
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
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"etd_dt_tm",	  	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"eta_dt_tm",	  	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"etd_por_tm",	  	     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"eta_del_dt_tm",	  	 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"eta_fnl_dest_dt_tm",	 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_cd",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_nm",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"frt_term_cd",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pck_qty",	  	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pck_ut_cd",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"grs_wgt_ut_cd",	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"grs_wgt",	  	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"grs_wgt1",	  	  	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"meas_ut_cd",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"meas",	  	  		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"meas1",	  	  		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"fm_svc_term_cd",	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_svc_term_cd",	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cargo_tp_cd",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rmk",	  	     		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"clp_no",	  	     	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"hbl_tp_cd",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"act_shpr_trdp_cd",	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"act_shpr_trdp_nm",	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"carr_trdp_cd",	 	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"carr_trdp_nm",	 	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"carr_trdp_addr",	 	 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"nomi_flg",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"shp_mod_cd",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"asgn_usrid",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rgst_usrid",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"bkg_sts_cd",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cut_off_dt",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"cut_off_tm",	 		 KeyField:0 },
	                  	//Carrier Bkg 조회 필드 추가 팀장님지시사항
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rcv_wh_cd",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rcv_wh_nm",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pu_trdp_cd",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pu_trdp_nm",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"vgm_cut_off_dt",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"vgm_cut_off_tm",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"doc_cut_off_dt",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"doc_cut_off_tm",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rail_cut_off_dt",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"rail_cut_off_tm",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"port_open_dt",	 		 KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"port_open_tm",	 		 KeyField:0 },
	                  	
	                  	//#4899 ** [Binex] Carrier Booking Entry to have Customer Ref. No., Export References No., Agent Ref. No.
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"exp_ref_no",	  	     KeyField:0 },
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"prnr_ref_no",	  	     KeyField:0 },
	                  	//#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"obl_tp_cd",	  	     KeyField:0 },
	                  	
	                  	{Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } 
	                  	];
			
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
	
	//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
/*	if (formObj.f_mbl_entry_yn.value == "Y" && sheetObj.GetCellValue(Row, "bl_no") != "") {
		alert(getLabel('FMS_COM_ALT095'));
		return;
	}*/
	
	var retArray = "";	
	retArray += sheetObj.GetCellValue(Row, "lnr_bkg_no"); //0
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_seq");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "lnr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "lnr_trdp_nm");	//5
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cust_ref_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_cd"); //10
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_addr"); //15
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "lnr_ctrt_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fwrd_agn_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fwrd_agn_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fwrd_agn_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_trdp_cd"); //20
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trnk_vsl_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trnk_vsl_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trnk_voy");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "por_cd"); //25
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "por_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pol_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pol_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pod_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pod_nm"); //30
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "del_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "del_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fnl_dest_loc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fnl_dest_loc_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "etd_por_tm"); //35
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "etd_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "eta_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "eta_del_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "eta_fnl_dest_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rep_cmdt_cd"); //40
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rep_cmdt_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "frt_term_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pck_qty");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pck_ut_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grs_wgt_ut_cd"); //45
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grs_wgt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grs_wgt1");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "meas_ut_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "meas");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "meas1"); //50
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fm_svc_term_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "to_svc_term_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cargo_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cntr_info");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rmk"); //55
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "clp_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "hbl_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "act_shpr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "act_shpr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "carr_trdp_cd"); // 60
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "carr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "carr_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "nomi_flg");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shp_mod_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "asgn_usrid");	//65
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rgst_usrid");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_sts_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cut_off_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cut_off_tm");
	
	//<!-- Carrier Bkg 조회 필드 추가 팀장님지시사항 -->
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rcv_wh_cd");   //70
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rcv_wh_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pu_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "pu_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "vgm_cut_off_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "vgm_cut_off_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "doc_cut_off_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "doc_cut_off_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rail_cut_off_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rail_cut_off_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "port_open_dt"); //80
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "port_open_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_sts_cd");

	//#4899 ** [Binex] Carrier Booking Entry to have Customer Ref. No., Export References No., Agent Ref. No.
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "exp_ref_no");//83
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_ref_no");//84
	//#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "obl_tp_cd");//85
	ComClosePopup(retArray);
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 

function LINER_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_lnr_trdp_cd.value=rtnValAry[0];
		formObj.f_lnr_trdp_nm.value=rtnValAry[2];
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
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			if(str=="LINER"){
				s_type="trdpCode";
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="LINER"){
			s_type="trdpCode";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	var sheetObj=docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var Vals=rtnArr[0].split('@@^');	
			if(CODETYPE == "LINER"){
				formObj.f_lnr_trdp_cd.value=Vals[0]; 
				formObj.f_lnr_trdp_nm.value=Vals[3];
			}
		}else{
			if(CODETYPE == "LINER"){
				formObj.f_lnr_trdp_cd.value=""; 
				formObj.f_lnr_trdp_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}