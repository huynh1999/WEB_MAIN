/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	//ZOOT::TODO=2014.12.26-검색기간 제거
	//수출
	if(document.form.bnd_clss_cd.value=='O'){
		//setFromToDtEndPlus(document.form.etd_strdt, 30, document.form.etd_enddt, 30);
	//수입
	}else if(document.form.bnd_clss_cd.value=='I') {
		//setFromToDtEndPlus(document.form.eta_strdt, 30, document.form.eta_enddt, 30);
	// 전체
	}else {
		setFromToDtEndPlus(document.form.etd_eta_strdt, 30, document.form.etd_eta_enddt, 30);
	}
	
    // mbl 값이나 ref 값이 있으면 자동 조회 
    if (form.f_mbl_no.value != "" ||	form.f_ref_no.value != "") {
    	doWork('SEARCHLIST');
    } else {
    	// focus를 No.로 이동
    	form.f_mbl_no.focus();
    }
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
    		   sheetObj.DoSearch("CMM_POP_0180GS.clt", FormQueryString(formObj) );
    	   break;    
    	   case "btn_new":
    	       sheetObject.RemoveAll();
    	       formObject.reset();
       	   break;
    	   case "CLOSE":
    		   ComClosePopup(); 
       	   break;	 
       	//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
           case "APPLY":
        	   selectMultiRow();
           break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0180.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0180.002");
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
            var cal = new ComCalendarFromTo();
        	cal.select(formObj.etd_strdt,formObj.etd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
        	cal.select(formObj.eta_strdt,formObj.eta_enddt, 'MM-dd-yyyy');
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
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	if(arg[0]!=undefined){
		formObj.air_sea_clss_cd.value=arg[0];
	}
	if(arg[1]!=undefined){
		formObj.bnd_clss_cd.value=arg[1];	
	}
	if(arg[2]!=undefined){
		formObj.f_mbl_no.value=arg[2];	
	}
	if(arg[3]!=undefined){
		formObj.f_ref_no.value=arg[3];	
	}
	if(arg[4]!=undefined){
		formObj.f_MultiSelect.value=arg[4];	
	}
	if(arg[4] == "Y"){
		getObj("btnApply").style.display = "inline";	
	}
	
	if( formObj.air_sea_clss_cd.value  == "S" ){
		mbl.style.display="block";
		hblHrdTx.style.display="block";
		hblTx.style.display="block";
		if(formObj.bnd_clss_cd.value=="O"){
			div_etd.style.display="block";
			//sr_no.style.display = "block";
		}else if(formObj.bnd_clss_cd.value=="I") {
			getObj('div_eta').style.display="block";
			etaTx.style.display="block";
		} else {
			getObj('div_etd_eta').style.display="block";
			etdEtaTx.style.display="block";
		}
	}else {	
		mawb.style.display="block";
		hawbHrdTx.style.display="block";
		hawbTx.style.display="block";
		if(formObj.bnd_clss_cd.value=="O"){
			div_etd.style.display="block";
		}else if(formObj.bnd_clss_cd.value=="I") {
			getObj('div_eta').style.display="block";
			arTx.style.display="block";
		} else {
			getObj('div_etd_eta').style.display="block";
			etdEtaTx.style.display="block";
		}
	}
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	/* operation 권한이 없는 경우 */    	   		
	var objDisable = false; 
	if (uod_flg == "N"){ 
		objDisable = true;
		formObj.opr_usrid.value=usrId;
		formObj.opr_usrnm.value=usrNm;
		formObj.opr_ofc_cd.value=ofc_cd;
		formObj.opr_dept_cd.value=usrDept;
		formObj.opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	   			
	} 
	
	/* #342 - [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS  - 3. If the Report Type is Filling No: Add "Consignee" search condition
	 * By Thoa.Dien - 170913
	 */
	if(arg[1]!=undefined && arg[1]!=""){
		getObj('rptType_Filing01').style.display="block"; // Sales & User combo
		getObj('rptType_Filing03').style.display="block"; // Usrer ID txt
		getObj('rptType_Filing05').style.display="block"; // bank image
		$("#rptType_Filing06").remove();
	}else{
		getObj('rptType_Filing02').style.display="block"; // Consignee label
		getObj('rptType_Filing04').style.display="block"; // Consignee txt
		getObj('rptType_Filing06').style.display="block"; // bank image - Sales & User
		$("#rptType_Filing01").remove();
		$("#rptType_Filing03").remove();
		$("#rptType_Filing05").remove();
	}
}
function searchValueClear(obj) {
	
	var formObj = document.form;	
	if (uod_flg == "N"){ 
		
	}else{
		formObj.opr_usrid.value = "";
		formObj.opr_usrnm.value = "";
		formObj.sls_tp_cd.value = "";
	}
}
function fncFormStart(){
	var formObj=document.form;
	// 오늘 날짜 가져오기
	var now=new Date(); 				// 현재시간 가져오기
	var year=now.getFullYear(); 			// 년도 가져오기
	var month=now.getMonth() + 1; 		// 월 가져오기 (+1)
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
	            
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             
                var formObj=document.form;
                var headers = null;
                var cols;
				if(formObj.air_sea_clss_cd.value== "S"){
					if(formObj.bnd_clss_cd.value== "O"){
						headers = [ { Text:getLabel('CMM_POP_0180_HDR1_1'), Align:"Center"} ];
					}else{
						headers = [ { Text:getLabel('CMM_POP_0180_HDR1_2'), Align:"Center"} ];
					}
					InitHeaders(headers, info);
					
					cols = [ 
							//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
							{Type:"CheckBox",  Hidden: formObj.f_MultiSelect.value == "Y" ? 0 : 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
					        {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0, UpdateEdit:0 },
				            {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",     KeyField:0, UpdateEdit:0 },
				            {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0, UpdateEdit:0 }];
					
					if(formObj.bnd_clss_cd.value== "O"){
						cols.push({Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0, UpdateEdit:0 });
					}else{
						cols.push({Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0 });
					}			             
			             
					cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",           KeyField:0 });
					cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd",       KeyField:0 });
					cols.push({Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0, UpdateEdit:0 });
					cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",           KeyField:0 });
					cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd",       KeyField:0 });
					cols.push({Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0, UpdateEdit:0 });

					if(formObj.bnd_clss_cd.value== "O"){
					   cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
	                   cols.push({Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd", UpdateEdit:0 });
	                   cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
                   }else{
	                   cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
	                   cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
	                   cols.push({Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd", UpdateEdit:0 });
                   }
	                   cols.push({Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",          KeyField:0, UpdateEdit:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_dpt_nm",      KeyField:0 });
	                   cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0, UpdateEdit:0 });
	                   cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",      KeyField:0, UpdateEdit:0 });
	                   //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
					if (formObj.bnd_clss_cd.value== "O") {
						cols.push({Type:"Text",     Hidden:1,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cs_usr_nm",      KeyField:0, UpdateEdit:0 });
					} else {
						cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cs_usr_nm",      KeyField:0, UpdateEdit:0 });
					}
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",      KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",         KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_cd",          KeyField:0 });
	                   
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
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mrn_no",           KeyField:0 });
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
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ccn_no",           KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mnf_fr_loc",       KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mnf_to_loc",       KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"etd_por_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fst_to_cd",        KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fst_to_nm",        KeyField:0 });
	                   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_trdp_cd",      KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_trdp_nm",      KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_trdp_addr",    KeyField:0 });
 
//		               #1074 [Star Cluser ATL/MIA] V440 AIH AWB Etnry, ETA of FPOE/First Port Of Entry to sync when Filing # is selected
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eta_fpoe_tm",    KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"first_port_cd",    KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"first_port_nm",    KeyField:0 });
		               
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_trdp_cd",    KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_trdp_nm",    KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_trdp_addr",  KeyField:0 });
		               
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_ofc_cd",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_ratio_yn",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_mgn",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_dept_cd",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sto_start_dt",  KeyField:0 });
		               
		               //#3188 [GENESIS] HBL GROSS WEIGHT NOT UPDATING
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mk_txt",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"desc_txt",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_loc_nm",  KeyField:0 });
		               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sls_usrid",  KeyField:0 });
		               //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
						cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cs_usrid",  KeyField:0 });
						cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cs_usr_nm",  KeyField:0 });
				}else {	
					
					if(formObj.bnd_clss_cd.value== "O"){
						headers = [ { Text:getLabel('CMM_POP_0180_HDR2_1'), Align:"Center"} ];
					}else{
						headers = [ { Text:getLabel('CMM_POP_0180_HDR2_2'), Align:"Center"} ];
					}
					InitHeaders(headers, info);
					
					cols = [ 
							//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
							{Type:"CheckBox",  Hidden: formObj.f_MultiSelect.value == "Y" ? 0 : 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
					         {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0, UpdateEdit:0 },
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",     KeyField:0, UpdateEdit:0 },
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0, UpdateEdit:0 }];
			
						if(formObj.bnd_clss_cd.value== "O"){
							cols.push({Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0, UpdateEdit:0 });
						}else{
							cols.push({Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0 });
						}
					  
						cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",           KeyField:0 });
						cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd",       KeyField:0 });
						cols.push({Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0, UpdateEdit:0 });
						cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",           KeyField:0 });
						cols.push({Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd",       KeyField:0 });
						cols.push({Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0, UpdateEdit:0 });
				  
				  if(formObj.bnd_clss_cd.value== "O"){
		               cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
		               cols.push({Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd", UpdateEdit:0 });
		               cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
	               }else{
		               cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
		               cols.push({Type:"Date",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd" });
		               cols.push({Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",        KeyField:0,   CalcLogic:"",   Format:"Ymd", UpdateEdit:0 });
	               }
				   
	               cols.push({Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",          KeyField:0, UpdateEdit:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_dpt_nm",      KeyField:0 });
	               cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"proc_usr_nm",      KeyField:0, UpdateEdit:0 });
	               cols.push({Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",      KeyField:0, UpdateEdit:0 });
	               //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				   cols.push({Type:"Text",     Hidden:1,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cs_usr_nm",      KeyField:0, UpdateEdit:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",      KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",       KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",      KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",         KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_cd",          KeyField:0 });
	               
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
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mrn_no",           KeyField:0 });
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
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ccn_no",           KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mnf_fr_loc",       KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mnf_to_loc",       KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"etd_por_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd" });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fst_to_cd",        KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"fst_to_nm",        KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_trdp_cd",      KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_trdp_nm",      KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_trdp_addr",    KeyField:0 });
	               
//	               #1074 [Star Cluser ATL/MIA] V440 AIH AWB Etnry, ETA of FPOE/First Port Of Entry to sync when Filing # is selected
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eta_fpoe_tm",    KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"first_port_cd",    KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"first_port_nm",    KeyField:0 });
	               
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_trdp_cd",    KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_trdp_nm",    KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"agent_trdp_addr",  KeyField:0 });
	               
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_ofc_cd",  KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_ratio_yn",  KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_mgn",  KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ctrb_dept_cd",  KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sto_start_dt",  KeyField:0 });
	               
	               //#3188 [GENESIS] HBL GROSS WEIGHT NOT UPDATING
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mk_txt",  KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"desc_txt",  KeyField:0 });
	               
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"iss_loc_nm",  KeyField:0 });
	               cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sls_usrid",  KeyField:0 });
	               //OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cs_usrid",  KeyField:0 });
				   cols.push({Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cs_usr_nm",  KeyField:0 });
				}
				
				InitColumns(cols);
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
				SetEditable(1);
				SetSheetHeight(250);
				//InitViewFormat(0, "obrd_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
				//InitViewFormat(0, "etd_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
				//InitViewFormat(0, "eta_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
				//InitViewFormat(0, "te_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
				//InitViewFormat(0, "etd_por_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
//				InitViewFormat(0, "post_dt", "mm\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
      //no support[check again]CLT 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정
				sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheet1.ColSaveName(Col) == "chk"){
		return;
	}
	var retArray="";	
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
	retArray += sheetObj.GetCellValue(Row, "mrn_no");
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
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ccn_no"); //93 #24620 CCN
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "mnf_fr_loc"); //94 #24620 CCN
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "mnf_to_loc"); //95 #24620 CCN
	//alert(sheetObj.CellValue(Row, "hbl_tp_cd"));
	//alert(retArray);
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "etd_por_tm"); //96 #26727 ETD of POR
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fst_to_cd"); //97 #26294 fst_to_cd
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "fst_to_nm"); //98 #26294 fst_to_nm
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "iss_trdp_cd"); // 99
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "iss_trdp_nm"); // 100
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "iss_trdp_addr"); // 101
	
//	#1074 [Star Cluser ATL/MIA] V440 AIH AWB Etnry, ETA of FPOE/First Port Of Entry to sync when Filing # is selected
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "eta_fpoe_tm"); // 102
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "first_port_cd"); // 103
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "first_port_nm"); // 104
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_trdp_cd"); // 105
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_trdp_nm"); // 106
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "agent_trdp_addr"); // 107

	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ctrb_ofc_cd"); // 108
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ctrb_ratio_yn"); // 109
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ctrb_mgn"); // 110
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ctrb_dept_cd"); // 111

	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "sto_start_dt"); // 112
	
	//#3188 [GENESIS] HBL GROSS WEIGHT NOT UPDATING
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "mk_txt"); // 113
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "desc_txt"); // 114

	//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "iss_loc_nm"); // 115
	
	//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "sls_usrid"); // 116

	//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cs_usrid"); // 117
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cs_usr_nm"); // 118
	
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
/* #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS
 * addition [CHK)] multi-selection 
 * Duc.Nguyen 2017.09.21*/
function selectMultiRow(){
	var sheetObj=docObjects[0];
	var retArray="";
	for(i=1; i <= sheetObj.RowCount(); i++){
		if(sheetObj.GetCellValue(i, "chk") == "1"){		
			retArray += sheetObj.GetCellValue(i, "master_bl_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "intg_bl_seq");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ref_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ref_ofc_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trnk_vsl_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trnk_voy");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trdp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trdp_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pod_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pod_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pol_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pol_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "etd_dt_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "eta_dt_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "lnr_bkg_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "por_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "por_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "del_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "del_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "shp_mod_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cnee_trdp_cd"); //20
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cnee_trdp_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_trdp_cd2");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_trdp_nm2");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "etd_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "eta_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "it_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "te_dt_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "it_loc");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cfs_trdp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cfs_trdp_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "flt_no"); //31
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cnee_trdp_addr"); //32
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_trdp_addr2");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "shpr_trdp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "shpr_trdp_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "shpr_trdp_addr");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "sub_bl_no"); //37
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cy_trdp_cd"); //38
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cy_trdp_nm"); //39
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ts1_port_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ts1_flt_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ts2_port_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ts2_flt_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ts3_port_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ts3_flt_no"); //45
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "frt_loc_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "frt_loc_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "f_eta_dt_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "fm_svc_term_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "to_svc_term_cd"); //50
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "post_dt");
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "hbl_tp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "mrn_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ntfy_trdp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ntfy_trdp_nm");// 55
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ntfy_trdp_addr");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "fnl_dest_loc_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "fnl_dest_loc_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "profit_share");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pck_qty");	// 60
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pck_ut_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "grs_wgt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "grs_wgt1");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "meas");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "meas1"); // 65
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "bl_iss_dt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_trdp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_trdp_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_trdp_addr"); // 69
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "frt_term_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "express_tp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "rlsd_flg");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "rlsd_dt_tm"); // 73
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "bl_dt_tm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "disp_ntfy_flg");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cargo_tp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "rep_cmdt_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "rep_cmdt_nm"); // 78
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_grs_wgt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_grs_wgt1");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_chg_wgt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_chg_wgt1");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "chg_wgt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "chg_wgt1");	// 84
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "vol_wgt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "vol_meas");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "h_vol_meas");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "size_ut_cd"); // 88
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "decl_cstms_val");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "rt_clss_cd"); //90
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prnr_ref_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "curr_cd"); //92
			/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ccn_no"); //93 #24620 CCN
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "mnf_fr_loc"); //94 #24620 CCN
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "mnf_to_loc"); //95 #24620 CCN
			//alert(sheetObj.CellValue(i, "hbl_tp_cd"));
			//alert(retArray);
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "etd_por_tm"); //96 #26727 ETD of POR
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "fst_to_cd"); //97 #26294 fst_to_cd
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "fst_to_nm"); //98 #26294 fst_to_nm
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "iss_trdp_cd"); // 99
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "iss_trdp_nm"); // 100
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "iss_trdp_addr"); // 101
			
//			#1074 [Star Cluser ATL/MIA] V440 AIH AWB Etnry, ETA of FPOE/First Port Of Entry to sync when Filing # is selected
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "eta_fpoe_tm"); // 102
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "first_port_cd"); // 103
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "first_port_nm"); // 104
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_trdp_cd"); // 105
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_trdp_nm"); // 106
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "agent_trdp_addr"); // 107

			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ctrb_ofc_cd"); // 108
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ctrb_ratio_yn"); // 109
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ctrb_mgn"); // 110
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ctrb_dept_cd"); // 111

			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "sto_start_dt"); // 112
			
			//#3188 [GENESIS] HBL GROSS WEIGHT NOT UPDATING
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "mk_txt"); // 113
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "desc_txt"); // 114
			
			//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "iss_loc_nm"); // 115
			
			//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "sls_usrid"); // 116

			//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cs_usrid"); // 117
			retArray += "|";
			retArray += sheetObj.GetCellValue(Row, "cs_usr_nm"); // 118
			retArray += ";";
		}
	}	
	if(retArray != ""){
		ComClosePopup(retArray);
	}else{
		ComShowMessage(getLabel('FMS_COM_ALT004'));	
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