//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var sheetCnt=0;
var firCalFlag = false;
var check_value = "";
var check_bl_no = "";
var check_bl_no_temp = "";

function doWork(srcName, valObj){
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];	
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			// Export BL List Search
			
			var dept_cd = formObj.f_dept_cd.value;
			var air_sea_clss_cd = '';
			
			if(dept_cd == '2'){
				
				air_sea_clss_cd = 'A';
			}else{
				
				air_sea_clss_cd = 'S';
			}
			
			formObj.f_air_sea_clss_cd.value = air_sea_clss_cd;			
			formObj.f_cmd.value=SEARCHLIST;
			
			sheetObj.DoSearch("MGT_ITF_0020GS.clt", FormQueryString(formObj) );
			
			break;	
		case "DOWNLOAD":
			// Import BL Generation
			
			if (checkBlValidation()) {
				
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
								
					frm1.f_cmd.value=COMMAND01;
					sheetObj.DoAllSave("MGT_ITF_0020GS.clt", FormQueryString(formObj), -1,false);
				}
			}else{
				
				alert(getLabel('FMS_COM_ALT007')); 
			}
			break;
		case "REF_POPLIST":
			
			var dept_cd = formObj.f_dept_cd.value;
			var air_sea_clss_cd = '';
			
			if(dept_cd == '2'){
				
				openAieMasterPopUp('REF_POPLIST', valObj)
			}else{
				
				openSeeMasterPopUp('REF_POPLIST', valObj);
			}
			break;
		case "MBL_POPLIST":
			
			var dept_cd = formObj.f_dept_cd.value;
			var air_sea_clss_cd = '';
			
			if(dept_cd == '2'){
				
				openAieMasterPopUp('MBL_POPLIST', valObj)
			}else{
				
				openSeeMasterPopUp('MBL_POPLIST', valObj);
			}
			break;
		case "POR_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary = new Array(1);
      		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POR_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;
		case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary = new Array(1);
      		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POD_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;
		case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary = new Array(1);
      		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POL_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;
		case "DEL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary = new Array(1);
      		rtnary[0] = "SEA";
	   		rtnary[1] = "BL";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "DEL_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;    
		
	}
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code = obj;
	}		
	var s_type = "";
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}else if ( tmp == "onChange" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
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
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value=masterVals[0];
				formObj.f_por_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value="";
				formObj.f_por_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

/**
 * Department Type 변경 시 ref_no/bl_no 를 초기화 한다.
 */
function fnInitParam(){
	
	var formObj = document.frm1;
	
	formObj.f_ref_no.value= '';
	formObj.intg_bl_seq.value= '';
}

function POR_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_por_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_por_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
function DEL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_del_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_del_nm.value=rtnValAry[2];//loc_nm
	} 
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   
        	var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE12':   
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.eta_strdt, formObj.eta_enddt, 'MM-dd-yyyy');
        break;
    }
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	
	document.forms[0].f_CurPage.value=callPage;

	docObjects[0].RemoveAll();
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	var formObj=document.frm1;	
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	
	formObj.ref_ofc_cd.value = ofc_cd;
	formObj.f_dept_cd.value = '4';
//	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;  
	}
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {	 
		 case 1:
			 with (sheetObj) {
			 		
			 	   SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );
			 	   
				   var info	= { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
				   var headers = [ { Text:getLabel('MGT_ITF_0020_HDR'), Align:"Center"}];
				   InitHeaders(headers, info);
				   var cols = [ {Type:"Text",	   Hidden:1, 	Width:160,	Align:"Center",	 ColMerge:1,   	SaveName:"mbl_no_sub",		KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
				                {Type:"Text",	   Hidden:1, 	Width:160,	Align:"Center",	 ColMerge:1,   	SaveName:"bl_seq",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"CheckBox",  Hidden:0,    Width:30,   Align:"Center",  ColMerge:1,    SaveName:"chk" },
				                {Type:"Status",    Hidden:1,    Width:40,   Align:"Center",  ColMerge:1,    SaveName:"ibflag" },
				                {Type:"Text",	   Hidden:0, 	Width:140,	Align:"Left",	 ColMerge:1,   	SaveName:"mbl_no",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0 },
				                {Type:"Text",	   Hidden:0,	Width:80,	Align:"Center",	 ColMerge:1,	SaveName:"ref_ofc_cd",	    KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:80,	Align:"Center",	 ColMerge:1,	SaveName:"ref_no",		    KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Date",	   Hidden:0,	Width:150,	Align:"Center",	 ColMerge:1,	SaveName:"mbl_etd",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Date",	   Hidden:0,	Width:150,	Align:"Center",	 ColMerge:1,	SaveName:"mbl_eta",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:150,	Align:"Center",	 ColMerge:1,	SaveName:"cntr_no",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:150,	Align:"Left",	 ColMerge:1,	SaveName:"shpr_trdp_nm",    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0, 	Width:160,	Align:"Left",	 ColMerge:1,   	SaveName:"cnee_trdp_nm",	KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0 },
				                {Type:"Text",	   Hidden:0, 	Width:100,	Align:"Left",	 ColMerge:0,   	SaveName:"lnr_trdp_nm",	    KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0 },
				                {Type:"Text",	   Hidden:0,	Width:100,	Align:"Left",	 ColMerge:0,	SaveName:"mbl_pol_nm",	    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:100,	Align:"Left",	 ColMerge:0,	SaveName:"mbl_pod_nm",	    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
				                {Type:"Text",	   Hidden:1,	Width:100,	Align:"Left",	 ColMerge:0,	SaveName:"air_sea_clss_cd", KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 }
				               ];
				   InitColumns(cols);
				   SetEditable(1);
			  	   SetSheetHeight(500);			  	   
			}													  
		 break;	 
	 }
}

function sheet1_OnSearchEnd(sheetObj, errMsg){

	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	
	searchList();
}
function sheet1_OnChange(sheetObj,Row,Col){
}
function sheet1_OnClick(sheetObj,Row,Col){
}

/**
 * 저장 전 데이타 검증
 */
function checkBlValidation(){
    var formObj = document.frm1;
    var sheetObj = docObjects[0];
    var chCheckFlag = false;
    
	for( var i = 1; i <= sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, "chk") == '1'){
			chCheckFlag = true;	
		}
    }
	
	return chCheckFlag;
}
