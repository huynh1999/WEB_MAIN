/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	//수출
	if(document.form.bnd_clss_cd.value=='O'){
		if(document.form.air_sea_clss_cd.value=="S"){
			setFromToDtEndPlus(document.form.obrd_strdt, 30, document.form.obrd_enddt, 30);
		}else{
			setFromToDtEndPlus(document.form.etd_strdt, 30, document.form.etd_enddt, 30);
		}
	//수입
	}else if(document.form.bnd_clss_cd.value=='I') {
		setFromToDtEndPlus(document.form.eta_strdt, 30, document.form.eta_enddt, 30);
	// 전체
	} else {
		setFromToDtEndPlus(document.form.etd_eta_strdt, 30, document.form.etd_eta_enddt, 30);
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
    		   sheetObj.DoSearch("CMM_POP_0170GS.clt", FormQueryString(formObj) );
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
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0170.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0170.002");
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
            cal.displayType="date";
            cal.select(formObj.obrd_strdt,formObj.obrd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.etd_strdt,formObj.etd_enddt, 'MM-dd-yyyy');
        break;        
        case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.eta_strdt,formObj.eta_enddt, 'MM-dd-yyyy');
        break;        
        case 'DATE2':   //달력 조회 팝업 호출      
             var cal=new ComCalendar(); 
             cal.select(formObj.f_cre_dt_begin,  'MM-dd-yyyy');
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
	document.form.f_CurPage.value=1;
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

	formObj.air_sea_clss_cd.value=arg[0];
	formObj.bnd_clss_cd.value=arg[1];
	if (arg[2] != undefined) {
		formObj.s_house_bl_no.value=arg[2];
	}
	// #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
	if (arg[3] != undefined) {
		formObj.f_MultiSelect.value=arg[3];
	}
	if(arg[3] == "Y"){
		getObj("btnApply").style.display = "inline";
	}
	if( formObj.air_sea_clss_cd.value  == "S" ){
		hblHrdTx.style.display="block";
		hblTx.style.display="block";
		if(formObj.bnd_clss_cd.value=="O"){
			div_obrd.style.display="block";
			ashpTx.style.display="block";
		}else if(formObj.bnd_clss_cd.value=="I"){
			getObj('div_eta').style.display="block";
			etaTx.style.display="block";
			acusTx.style.display="block";
		}else {
			getObj('div_etd_eta').style.display="block";
			etdEtaTx.style.display="block";
			acusTx.style.display="block";
		}
	}else {	
		hawbHrdTx.style.display="block";
		hawbTx.style.display="block";
		if(formObj.bnd_clss_cd.value=="O"){
			ashpTx.style.display="block";
			getObj('div_air_etd').style.display="block";
		}else if(formObj.bnd_clss_cd.value=="I"){
			getObj('div_eta').style.display="block";
			arTx.style.display="block";
			acusTx.style.display="block";
		}else {
			getObj('div_etd_eta').style.display="block";
			etdEtaTx.style.display="block";
			acusTx.style.display="block";
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
	
  // focus를 No.로 이동
    formObj.s_house_bl_no.focus();
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
                (19, 0, 0, true);
            	
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = null;
	            var cols = null;
                var formObj=document.form;
				if(formObj.air_sea_clss_cd.value=="S"){
					headers = [ { Text:getLabel('CMM_POP_0170_HDR1_1'), Align:"Center"} ];
					InitHeaders(headers, info);
					cols = [ 
				        		//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
				        		 {Type:"CheckBox",  Hidden: formObj.f_MultiSelect.value == "Y" ? 0 : 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
					         	 
				        		 {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0, UpdateEdit:0  },
					             {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"house_bl_no",   KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",        KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd",    KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"pol_nm",        KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",        KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd",    KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"pod_nm",        KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"del_cd",        KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"del_nm",        KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"bl_sts_cd",     KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",  KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"office_nm",     KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"dept_nm",       KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"usr_nm",        KeyField:0, UpdateEdit:0  },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",    KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",        KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
				}else{	
					headers = [ { Text:getLabel('CMM_POP_0170_HDR1_2'), Align:"Center"} ];
					InitHeaders(headers, info);
					
					cols = [ 
								//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
								 {Type:"CheckBox",  Hidden: formObj.f_MultiSelect.value == "Y" ? 0 : 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
								
					         	 {Type:"Seq",     Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0, UpdateEdit:0  },
					             {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"house_bl_no",   KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",        KeyField:0  },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd",    KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nm",        KeyField:0, UpdateEdit:0  },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",        KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd",    KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nm",        KeyField:0, UpdateEdit:0 },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"del_cd",        KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"del_nm",        KeyField:0, UpdateEdit:0 },
					             {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"bl_sts_cd",     KeyField:0, UpdateEdit:0 },
					             {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",  KeyField:0, UpdateEdit:0 },
					             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"office_nm",     KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"dept_nm",       KeyField:0 },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"usr_nm",        KeyField:0, UpdateEdit:0 },
					             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"sls_usr_nm",    KeyField:0, UpdateEdit:0 },
					             {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",        KeyField:0 },
					             {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
				}
				InitColumns(cols);
				SetEditable(1);
				SetSheetHeight(240);
           }                                                      
           break;
    }
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
	retArray += sheetObj.GetCellValue(Row, "house_bl_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "master_bl_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ca_sts_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "intg_bl_seq");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bkg_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "bl_dt_tm");
	ComClosePopup(retArray); 
}
/*	#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS 
 * 	2. addition [CHK)] multi-selection 
 * 	Duc.Nguyen 2017.09.21
 * */
function selectMultiRow(){
	var sheetObj=docObjects[0];
	var retArray="";
	for(i=1; i <= sheetObj.RowCount(); i++){
		if(sheetObj.GetCellValue(i, "chk") == "1"){		
			retArray += sheetObj.GetCellValue(i, "house_bl_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "master_bl_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ca_sts_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "intg_bl_seq");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "bkg_no");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "bl_dt_tm");
			retArray += ";";
		}
	}	
	if(retArray != ""){
		ComClosePopup(retArray);
	}else{
		ComShowMessage(getLabel('FMS_COM_ALT004'));	
	}	
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
	var formObj=document.form;
	if(trim(formObj.obrd_strdt.value)!= "" && trim(formObj.obrd_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.obrd_strdt,formObj.obrd_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: CMM_POP_0170.339");
			formObj.obrd_enddt.focus();
			return false;
		}
	}
	if(trim(formObj.eta_strdt.value)!= "" && trim(formObj.eta_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.eta_strdt,formObj.eta_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: CMM_POP_0170.347");
			formObj.eta_enddt.focus();
			return false;
		}
	}
	if(trim(formObj.etd_eta_strdt.value)!= "" && trim(formObj.etd_eta_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.etd_eta_strdt,formObj.etd_eta_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: CMM_POP_0170.347");
			formObj.etd_eta_enddt.focus();
			return false;
		}
	}
	if(trim(formObj.etd_strdt.value)!= "" && trim(formObj.etd_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.etd_strdt,formObj.etd_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: CMM_POP_0170.354");
			formObj.etd_enddt.focus();
			return false;
		}
	}
	return true;
}