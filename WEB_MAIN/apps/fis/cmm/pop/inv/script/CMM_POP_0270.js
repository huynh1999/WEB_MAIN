/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	//수출
	if(document.form.bnd_clss_cd.value=='O'){
		setFromToDtEndPlus(document.form.etd_strdt, 30, document.form.etd_enddt, 30);
	//수입
	}else{
		setFromToDtEndPlus(document.form.eta_strdt, 30, document.form.eta_enddt, 30);
	}
	form.f_ofc_cd.value=ofc_cd;
}
/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncTpCodeSearch() {
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
    		   if(!formValidation()) return;
    		   formObj.f_cmd.value=SEARCHLIST;
    		   sheetObj.DoSearch("CMM_POP_0270GS.clt", FormQueryString(formObj) );
    	   break;    
    	   case "btn_new":
    	       sheetObject.RemoveAll();
    	       formObject.reset();
       	   break;
    	   case "CLOSE":
    		   window.close();
       	   break;	 
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0270.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0270.002");
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
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.eta_strdt, formObj.eta_enddt, 'MM-dd-yyyy');
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
	var formObj=document.form;
	if(arg[0]!=undefined){
		formObj.air_sea_clss_cd.value=arg[0];
	}
	if(arg[1]!=undefined){
		formObj.bnd_clss_cd.value=arg[1];	
	}
	if( formObj.air_sea_clss_cd.value  == "S" ){
		mbl.style.display="inline";
		hblHrdTx.style.display="inline";
		hblTx.style.display="inline";
		if(formObj.bnd_clss_cd.value=="O"){
			div_etd.style.display="inline";
			//sr_no.style.display = "inline";
		}else {
			getObj('div_eta').style.display="inline";
			etaTx.style.display="inline";
		}
	}else {	
		mawb.style.display="inline";
		hawbHrdTx.style.display="inline";
		hawbTx.style.display="inline";
		if(formObj.bnd_clss_cd.value=="O"){
			div_etd.style.display="inline";
		}else {
			getObj('div_eta').style.display="inline";
			arTx.style.display="inline";
		}
	}
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    // focus를 No.로 이동
    formObj.f_mbl_no.focus();
}
function fncFormStart(){
	var formObj=document.form;
	// 오늘 날짜 가져오기
	var now=new Date(); 				// 현재시간 가져오기
	var year=now.getFullYear(); 			// 년도 가져오기
	var month=now.getFullMonth() + 1; 		// 월 가져오기 (+1)
	var date=now.getDate(); 			// 날짜 가져오기
	var fromDate=new Date();
	//var tempDate = now.getTime() - ( 90*24*60*60*1000);
	//fromDate.setTime(tempDate);
	var iyear=fromDate.getFullYear();
	var imonth=fromDate.getMonth() -2;
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
	today=year +"-"+ month +"-"+ date +"";
	if(formObj.bnd_clss_cd.value =="O"){
		formObj.etd_strdt.value=searchDay1;
		formObj.etd_enddt.value=today;
	}else if(formObj.bnd_clss_cd.value =="I"){
		formObj.eta_strdt.value=searchDay1;
		formObj.eta_enddt.value=today;
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
            with (sheetObj) {
	        	 var formObj=document.form;
	             var HeadTitle1="";

	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers;
	             var cols;
				if(formObj.air_sea_clss_cd.value== "S"){
					if(formObj.bnd_clss_cd.value== "O"){
						HeadTitle1=getLabel('CMM_POP_0270_HDR1_1');
					}else{
						HeadTitle1=getLabel('CMM_POP_0270_HDR1_2');
					}
					headers = [ { Text:HeadTitle1, Align:"Center"} ];
			        InitHeaders(headers, info);
			          
			        cols = [ {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",     KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd",       KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd",       KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0 } ];
                   if(formObj.bnd_clss_cd.value== "O"){
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   }else{
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   }
                   cols.push({Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_dpt_nm",      KeyField:0 });
                   cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_cd",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shp_mod_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_cd2",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm2",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_addr2",  KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"etd_tm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eta_tm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"it_no",            KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"te_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"it_loc",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cfs_trdp_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cfs_trdp_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"flt_no",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sub_bl_no",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cy_trdp_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cy_trdp_nm",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts1_port_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts1_flt_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts2_port_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts2_flt_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts3_port_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts3_flt_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"frt_loc_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"frt_loc_nm",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"f_eta_dt_tm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fm_svc_term_cd",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"to_svc_term_cd",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"post_dt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_tp_cd",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mrn",              KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_cd",  KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",  KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"profit_share",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pck_qty",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pck_ut_cd",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"grs_wgt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"grs_wgt1",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"meas",             KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"meas1",            KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_iss_dt",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"frt_term_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"express_tp_cd",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rlsd_flg",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rlsd_dt_tm",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_dt_tm",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"disp_ntfy_flg",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cargo_tp_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_grs_wgt",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_grs_wgt1",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_chg_wgt",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_chg_wgt1",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"chg_wgt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"chg_wgt1",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"vol_wgt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"vol_meas",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"h_vol_meas",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"size_ut_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"decl_cstms_val",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rt_clss_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_ref_no",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"curr_cd",          KeyField:0 });
				}else {	
					if(formObj.bnd_clss_cd.value== "O"){
						HeadTitle1=getLabel('CMM_POP_0270_HDR2_1');
					}else{
						HeadTitle1=getLabel('CMM_POP_0270_HDR2_2');
					}
					headers = [ { Text:HeadTitle1, Align:"Center"} ];
					InitHeaders(headers, info);
			        
			        cols = [ {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",     KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd",       KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",           KeyField:0 },
			                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd",       KeyField:0 },
			                     {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0 } ];
                   if(formObj.bnd_clss_cd.value== "O"){
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   }else{
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                       cols.push({Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   }
                   cols.push({Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_dpt_nm",      KeyField:0 });
                   cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_cd",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shp_mod_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shpr_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnee_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_cd2",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm2",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_addr2",  KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"etd_tm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eta_tm",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"it_no",            KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"te_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"it_loc",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cfs_trdp_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cfs_trdp_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"flt_no",           KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sub_bl_no",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cy_trdp_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cy_trdp_nm",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts1_port_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts1_flt_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts2_port_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts2_flt_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts3_port_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ts3_flt_no",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"frt_loc_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"frt_loc_nm",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"f_eta_dt_tm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fm_svc_term_cd",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"to_svc_term_cd",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"post_dt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_tp_cd",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mrn",              KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ntfy_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_cd",  KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",  KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"profit_share",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pck_qty",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pck_ut_cd",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"grs_wgt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"grs_wgt1",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"meas",             KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"meas1",            KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_iss_dt",        KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_cd",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_nm",     KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_trdp_addr",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"frt_term_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"express_tp_cd",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rlsd_flg",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rlsd_dt_tm",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_dt_tm",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"disp_ntfy_flg",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cargo_tp_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_cd",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rep_cmdt_nm",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_grs_wgt",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_grs_wgt1",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_chg_wgt",    KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_chg_wgt1",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"chg_wgt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"chg_wgt1",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"vol_wgt",          KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"vol_meas",         KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"h_vol_meas",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"size_ut_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"decl_cstms_val",   KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rt_clss_cd",       KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"prnr_ref_no",      KeyField:0 });
                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"curr_cd",          KeyField:0 });				
					/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */			
				}
				InitColumns(cols);

		        SetEditable(0);

		        InitViewFormat(0, "obrd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		       InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		       InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		       InitViewFormat(0, "te_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		       SetSheetHeight(280);
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
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "cnt_eng_nm"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "cnt_eng_nm"));
retArray += sheetObj.GetCellValue(Row, "master_bl_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "intg_bl_seq");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ref_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ref_ofc_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "trnk_vsl_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "trnk_voy");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "trdp_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "trdp_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pod_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pod_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pol_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pol_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "etd_dt_tm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "eta_dt_tm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "lnr_bkg_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "por_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "por_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "del_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "del_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shp_mod_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cnee_trdp_cd"); //20
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cnee_trdp_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "prnr_trdp_cd2");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "prnr_trdp_nm2");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "etd_tm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "eta_tm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "it_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "te_dt_tm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "it_loc");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cfs_trdp_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cfs_trdp_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "flt_no"); //31
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cnee_trdp_addr"); //32
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "prnr_trdp_addr2");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpr_trdp_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpr_trdp_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpr_trdp_addr");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "sub_bl_no"); //37
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cy_trdp_cd"); //38
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cy_trdp_nm"); //39
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ts1_port_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ts1_flt_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ts2_port_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ts2_flt_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ts3_port_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ts3_flt_no"); //45
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "frt_loc_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "frt_loc_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "f_eta_dt_tm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "fm_svc_term_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "to_svc_term_cd"); //50
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "post_dt");
	/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "hbl_tp_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "mrn");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_nm");// 55
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "ntfy_trdp_addr");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "fnl_dest_loc_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "fnl_dest_loc_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "profit_share");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pck_qty");	// 60
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pck_ut_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "grs_wgt");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "grs_wgt1");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "meas");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "meas1"); // 65
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "bl_iss_dt");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "prnr_trdp_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "prnr_trdp_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "prnr_trdp_addr"); // 69
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "frt_term_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "express_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rlsd_flg");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rlsd_dt_tm"); // 73
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bl_dt_tm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "disp_ntfy_flg");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cargo_tp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rep_cmdt_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rep_cmdt_nm"); // 78
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_grs_wgt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_grs_wgt1");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_chg_wgt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_chg_wgt1");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "chg_wgt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "chg_wgt1");	// 84
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "vol_wgt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "vol_meas");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "h_vol_meas");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "size_ut_cd"); // 88
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "decl_cstms_val");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "rt_clss_cd"); //90
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_ref_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "curr_cd"); //92
	/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */
	//alert(sheetObj.CellValue(Row, "hbl_tp_cd"));
	//alert(retArray);
	ComClosePopup(retArray);
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, form.etd_strdt, form.etd_enddt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
