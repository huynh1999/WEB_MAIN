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
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST": case "DOWNLOAD_SEARCHLIST":
			// OFVFOUR-8251 [Urgent] [NTL NAIGAI TRANS] OI AMS B/L EDI got the error message	
			// OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
			//checkImpPostRef();
			formObj.f_cmd.value=SEARCHLIST;
			formObj.f_rcvr_brnc_ofc_cd.value = formObj.f_rcvr_brnc_ofc_cd.value.toUpperCase();
			if (true) {
				if(srcName == "DOWNLOAD_SEARCHLIST"){
					sheetObj.WaitImageVisible = false;
				}else{
					sheetObj.WaitImageVisible = true;
				}
				sheetObj.DoSearch("MGT_ITF_0010GS.clt", FormQueryString(formObj) );
			} else {
				alert(getLabel('SYS_COM_ALT010')); 
			}
			break;	
		case "SAVE":
			check_value = true;
			check_bl_no = "";
			if (!checkPostDate()){
				return;
			}
			// OFVFOUR-8251 [Urgent] [NTL NAIGAI TRANS] OI AMS B/L EDI got the error message
			// OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
			// if (post_dt_imp == "" || post_dt_imp == "D-ETA"){
			// 	alert(getLabel("SYS_COM_ALT015"));
			// 	return;
			// }
			
			if (checkValue()) {
				if(confirm(getLabel('FMS_COM_CFMSAV'))){
					checkBlValidation();
					if(check_value == true){
						/*function same mbl or hbl*/
						if(f_sameMblHblCheck()== "Y"){
							frm1.f_cmd.value=MODIFY;
							sheetObj.DoAllSave("MGT_ITF_0010GS.clt", FormQueryString(formObj), -1,false);
						}else{
							alert(getLabel('FMS_COM_DUP_MBL_HBL')); 
						}
					}else{
						alert(getLabel2('FMS_COM_000001',new Array(check_bl_no))); 
					}
				}
			}else{
				alert(getLabel('FMS_COM_ALT007')); 
			}
			break;
		case "DOWNLOAD":
			if(confirm(getLabel('FMS_COM_CFMDOWNINTERFACE'))){
				frm1.f_cmd.value = COMMAND01;
				doShowProcess();
				//sheet1.HideProcessDlg();
				sheetObj.WaitImageVisible = false;
				sheetObj.DoSearch("MGT_ITF_0010GS.clt", FormQueryString(formObj) );
			}
			break;
		case "ADD_ROW1":
			sheetObj.SetSelectRow(sheetObj.LastRow());
			sheetObj.DataInsert();
			sheetObj.SetCellValue(sheetObj.LastRow(),'seq',sheetObj.LastRow(),0);
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

		// #5083 [CLA] BL EDI Improvement Requests
   	 	case "EXCEL":
	   	 	if(docObjects[0].RowCount() < 1){ //No data	
    			ComShowCodeMessage("COM132501");
    		}else{
   	 			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
    		}
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
function searchValueClear(){
	var formObj = document.frm1;
	formObj.f_mbl_no.value = "";	
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
        case 'DATE13':   
	        var cal2=new ComCalendarFromTo();
	        cal2.displayType="date";
	        cal2.select(formObj.dl_strdt, formObj.dl_enddt, 'MM-dd-yyyy');
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
function searchList_dc(dc_flg){
	if(dc_flg =='Y'){
		doWork('SEARCHLIST');
	}
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
	
	// 사용자가 저장한 Header 정보를 읽어온다.
	//IBS_RestoreGridSetting('ETD', getPageURL(), docObjects[0], false, "fnRestoreGridSetEnd");
	IBS_RestoreGridSetting(formObj.user_id.value, formObj.pageurl.value, docObjects[0], false, "fnRestoreGridSetEnd");

//	doWork('SEARCHLIST');
	
	//#3793 [JAPT] BL EDI validation and text change
	setCondition("S", "ETD", formObj.etd_strdt, formObj.etd_enddt);
	
	//Agent EDI Spec 추가 사항 2018.12.10
	formObj.f_sndr_brnc_ofc_cd.value = ofc_cd;
}

function fnRestoreGridSetEnd(){
	
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
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;  
	}
}
//#693 [FULLTRANS] BL EDI, DOWNLOADED BUT WRONG FILING # CREATED
var row = -1;
var col = "";
function sheet1_OnPopupClick(sheetObj,Row,Col){
	row = Row;
	col = Col;
	 switch (sheetObj.ColSaveName(Col)) {
	    //Agent EDI Spec 추가 사항 2018.12.10
	 	case "mbl_org_agt_trdp_nm" :
	    case "mbl_shpr_trdp_nm" :
	    case "mbl_cnee_trdp_nm" :
	    case "shpr_trdp_nm" :
	    case "cnee_trdp_nm" :
	    case "ntfy_trdp_nm" :	
	        rtnary=new Array();
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		rtnary[3]=sheetObj.GetCellValue(Row, Col);
	   		if(rtnary[3]==''){
	   			return;
	   		}
	   		rtnary[4]=sheetObj.GetCellValue(Row, "edi_tp"); //EDI_TP
	   		// #5083 [CLA] BL EDI Improvement Requests
	   		switch (sheetObj.ColSaveName(Col)) {
	   			case "mbl_org_agt_trdp_nm" :
			   		rtnary[5]=escape(sheetObj.GetCellValue(Row, "mbl_org_agt_trdp_nm"));
			   		rtnary[6]=escape(sheetObj.GetCellValue(Row, "mbl_org_agt_trdp_addr"));
			   		rtnary[7]=escape(sheetObj.GetCellValue(Row, "mbl_org_agt_trdp_cnt_cd"));
			   		break;
	   			case "mbl_shpr_trdp_nm" :
			   		rtnary[5]=escape(sheetObj.GetCellValue(Row, "mbl_shpr_trdp_nm"));
			   		rtnary[6]=escape(sheetObj.GetCellValue(Row, "mbl_shpr_trdp_addr"));
			   		rtnary[7]=escape(sheetObj.GetCellValue(Row, "mbl_shpr_trdp_cnt_cd"));
			   		break;
	   			case "mbl_cnee_trdp_nm" :
			   		rtnary[5]=escape(sheetObj.GetCellValue(Row, "mbl_cnee_trdp_nm"));
			   		rtnary[6]=escape(sheetObj.GetCellValue(Row, "mbl_cnee_trdp_addr"));
			   		rtnary[7]=escape(sheetObj.GetCellValue(Row, "mbl_cnee_trdp_cnt_cd"));
			   		break;
	   			case "shpr_trdp_nm" :
			   		rtnary[5]=escape(sheetObj.GetCellValue(Row, "shpr_trdp_nm"));
			   		rtnary[6]=escape(sheetObj.GetCellValue(Row, "shpr_trdp_addr"));
			   		rtnary[7]=escape(sheetObj.GetCellValue(Row, "shpr_trdp_cnt_cd"));
			   		break;
	   			case "cnee_trdp_nm" :
	   				rtnary[5]=escape(sheetObj.GetCellValue(Row, "cnee_trdp_nm"));
			   		rtnary[6]=escape(sheetObj.GetCellValue(Row, "cnee_trdp_addr"));
			   		rtnary[7]=escape(sheetObj.GetCellValue(Row, "cnee_trdp_cnt_cd"));
			   		break;
	   			case "ntfy_trdp_nm" :
	   				rtnary[5]=escape(sheetObj.GetCellValue(Row, "ntfy_trdp_nm"));
	   		   		rtnary[6]=escape(sheetObj.GetCellValue(Row, "ntf_trdp_addr"));
	   		   		rtnary[7]=escape(sheetObj.GetCellValue(Row, "ntf_trdp_cnt_cd")); 		
	   		   		break;
		   	    default:
		   	    	rtnary[5]="";
   		   			rtnary[6]="";
   		   			rtnary[7]=""; 		
		   	    	break;
	   		}
	   		rtnary[8]="Y";//Add to History of trade Partner Name Check = Y
	   		rtnary[9]="Y";//AUTO MAPPING 
	   		
		    callBackFunc = "TRDP_NM";
	   		modal_center_open('./CMM_POP_0380.clt', rtnary, 812,530,"yes");
	   		break;	
	 }
}

function sheet2_OnPopupClick(sheetObj,Row,Col){
	row = Row;
	col = Col;
	 switch (sheetObj.ColSaveName(Col)) {
	    case "frt_cd_nm" :
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		rtnary[3]="";
	   		rtnary[4]=sheetObj.GetCellValue(Row, "frt_list_seq");
	   		rtnary[5]=sheetObj.GetCellValue(Row, "bl_no");
	   		rtnary[6]=sheetObj.GetCellValue(Row, "bl_seq");
	   		rtnary[7]=sheetObj.GetCellValue(Row, Col); //frt_cd_nm
	   		rtnary[8]=sheetObj.GetCellValue(Row, "edi_tp"); //EDI_TP
//	   		alert(rtnary[7] +":"+rtnary[8]);
	   		
	   		//Agent EDI Spec 추가 사항 2018.12.10
	   		rtnary[9]=window;
	   		rtnary[10]="I";
	   		rtnary[11]="Y"; //Add to History of trade Partner Name Check = Y
	   		rtnary[12]="Y";//AUTO MAPPING 
	   		
	   		callBackFunc = "FRT_CD";
		    modal_center_open('./CMM_POP_0075.clt', rtnary, 557,530,"yes");
	    break;
	 }
}

var g_dc_map_flg="";
function FRT_CD(rtnVal){
	var sheetObj = docObjects[1];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
  		var rtnValAry=rtnVal.split("|");
  		sheetObj.SetCellValue(row, "map_frt_cd",rtnValAry[0]);
//		sheetObj.SetCellValue(row, col,rtnValAry[1]);
  		
		docObjects[1].SetCellFontColor(row, col,"#000000");
		
		//searchSheet2(docObjects[0],s2_row,s2_col);
		
		//sheet2 searchend 에서 shhet1 search
		g_dc_map_flg ='Y';
//		searchList_dc(g_dc_map_flg);
		//sheet 의 모든 frt_cd 가 매핑되면 상단 그리드 조회
		for( var i = 1; i <= sheetObj.LastRow(); i++) {
		    var map_frt_cd = sheetObj.GetCellValue(i, "map_frt_cd");
		    if(map_frt_cd == "") {
		    	return;
	        } 
	    }
		searchList();
		
	}
}

function TRDP_NM(rtnVal){
	var sheetObj = docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
  		var rtnValAry=rtnVal.split("|");
  		sheetObj.SetCellValue(row, col,rtnValAry[0]);
		sheetObj.SetCellValue(row, col,rtnValAry[1]);
		docObjects[0].SetCellFontColor(row, col,"#000000");
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
			 		
			 	   SetConfig( { SearchMode:2, MergeSheet:7, Page:200, DataRowMerge:0, FrozenCol:8 } );
			 	   
				   var info	= { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
				   var headers = [ { Text:getLabel('MGT_ITF_0010_HDR'), Align:"Center"}];
				   InitHeaders(headers, info);
				   var cols = [ {Type:"Text",	   Hidden:1, 	Width:160,	Align:"Center",	 ColMerge:1,   	SaveName:"mbl_no_sub",		KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
				                {Type:"Text",	   Hidden:1, 	Width:160,	Align:"Center",	 ColMerge:1,   	SaveName:"bl_seq",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0 },
				                {Type:"Status",    Hidden:1,    Width:40,   Align:"Center",  ColMerge:1,    SaveName:"ibflag" },
				                {Type:"Text",	   Hidden:0, 	Width:100,	Align:"Center",	 ColMerge:1,   	SaveName:"status_bl",	    KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
					            {Type:"Text",      Hidden:0, 	Width:125,  Align:"Center",  ColMerge:1,    SaveName:"ref_no" , 		KeyField:0,		CalcLogic:"",	Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0},
				                {Type:"Text",	   Hidden:0, 	Width:140,	Align:"Center",	 ColMerge:1,   	SaveName:"mbl_no",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
				                {Type:"Text",	   Hidden:1, 	Width:65,	Align:"Center",	 ColMerge:1,   	SaveName:"cfm_flg",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
				                {Type:"Text",	   Hidden:0, 	Width:80,	Align:"Center",	 ColMerge:1,   	SaveName:"dc_note",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
				                {Type:"Text",     Hidden:0,    Width:50,   Align:"Center",  ColMerge:1,    SaveName:"view_dc",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
				                
				                //Agent EDI Spec 추가 사항 2018.12.10
				                {Type:"Text",	   Hidden:1, 	Width:140,	Align:"Center",	 ColMerge:1,   	SaveName:"mbl_org_ref_no",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
								{Type:"PopupEdit", Hidden:1,	Width:180,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_org_agt_trdp_nm",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
				                {Type:"PopupEdit", Hidden:0,	Width:180,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_shpr_trdp_nm",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
				                
				                {Type:"PopupEdit", Hidden:0,	Width:180,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_cnee_trdp_nm",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"CheckBox",  Hidden:0,    Width:30,   Align:"Center",  ColMerge:1,    SaveName:"chk" },
								
								//#5083 [CLA] BL EDI Improvement Requests
								{Type:"Text",	   Hidden:0, 	Width:140,	Align:"Center",	 ColMerge:1,   	SaveName:"trnk_vsl_nm",		KeyField:0,		CalcLogic:"",	Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0, 	Width:100,	Align:"Center",	 ColMerge:1,   	SaveName:"trnk_voy",		KeyField:0,		CalcLogic:"",	Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
				                
								{Type:"Date",	   Hidden:0,	Width:80,	Align:"Center",	 ColMerge:1,	SaveName:"mbl_etd",		    KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Date",	   Hidden:0,	Width:80,	Align:"Center",	 ColMerge:1,	SaveName:"mbl_eta",		    KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								//#3704 [JAPT] Post Date 컬럼 추가
								{Type:"Date",      Hidden:0,  	Width:80,   Align:"Center",  ColMerge:1,   	SaveName:"post_dt",     	KeyField:0,   	CalcLogic:"",   Format:"Ymd",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
								{Type:"Text",	   Hidden:0,	Width:150,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_por",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:150,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_pol",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:150,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_pod",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:150,	Align:"Left",	 ColMerge:1,	SaveName:"mbl_del",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								//Agent EDI Spec 추가 사항 2018.12.10
								{Type:"Combo",	   Hidden:0,	Width:100,	Align:"Left",	 ColMerge:1,	SaveName:"shp_mod",		KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								{Type:"Text",	   Hidden:0, 	Width:160,	Align:"Center",	 ColMerge:1,   	SaveName:"bl_no",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:1,	UpdateEdit:0,	InsertEdit:0},
				                
				                {Type:"Date",	   Hidden:0,	Width:100,	Align:"Center",	 ColMerge:0,	SaveName:"etd",		        KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Date",	   Hidden:0,	Width:100,	Align:"Center",	 ColMerge:0,	SaveName:"eta",		        KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:120,	Align:"Center",	 ColMerge:0,	SaveName:"cntr_total",		KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"PopupEdit", Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"shpr_trdp_nm",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"PopupEdit", Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"cnee_trdp_nm",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"PopupEdit", Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"ntfy_trdp_nm",	KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1 },
								{Type:"Text",	   Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"por",		        KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"pol",		        KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"pod",		        KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:180,	Align:"Left",	 ColMerge:0,	SaveName:"del",		        KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								//#3704 [JAPT] Post Date 컬럼 추가
								{Type:"Date",	   Hidden:0,	Width:75,	Align:"Center",	 ColMerge:0,	SaveName:"dnld_tms",		KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:120,	Align:"Center",	 ColMerge:0,	SaveName:"dnld_usr_nm",		KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Date",	   Hidden:0,	Width:75,	Align:"Center",	 ColMerge:0,	SaveName:"iss_tms",			KeyField:0,		CalcLogic:"",   Format:"Ymd",		PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								{Type:"Text",	   Hidden:0,	Width:120,	Align:"Center",	 ColMerge:0,	SaveName:"iss_usr_nm",		KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								{Type:"Text",	   Hidden:0,	Width:100,	Align:"Center",	 ColMerge:0,	SaveName:"edi_tp",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								//Agent EDI Spec 추가 사항 2018.12.10
								{Type:"Text",	   Hidden:0,	Width:80,	Align:"Center",	 ColMerge:0,	SaveName:"rcvr_brnc_ofc_cd",		    KeyField:0,		CalcLogic:"",   Format:"",			PointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								{Type:"Text",	   Hidden:1, 	Width:160,	Align:"Center",	 ColMerge:0,   	SaveName:"bl_table_count",	KeyField:0,		CalcLogic:"",	Format:"",			ointCount:0,	UpdateEdit:0,	InsertEdit:0 },
								
								//Agent EDI Spec 추가 사항 2018.12.10
								{Type:"Text",      Hidden:1,	Width:160,    Align:"Center",  ColMerge:0,    SaveName:"mbl_org_agt_cd" },
								{Type:"Text",      Hidden:1,	Width:160,    Align:"Center",  ColMerge:0,    SaveName:"mbl_shpr_cd" },
								
								{Type:"Text",      Hidden:1,	Width:160,    Align:"Center",  ColMerge:0,    SaveName:"mbl_cnee_cd" },
								{Type:"Text",      Hidden:1,	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"shpr_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"cnee_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"ntfy_cd" },

					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"intg_bl_seq" },
					            {Type:"Text",      Hidden:1, 	Width:100,    Align:"Center",  ColMerge:0,    SaveName:"hbl_por_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:100,    Align:"Center",  ColMerge:0,    SaveName:"hbl_pol_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:100,    Align:"Center",  ColMerge:0,    SaveName:"hbl_pod_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_del_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_por_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_pol_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_pod_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_del_un_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_por_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_pol_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_pod_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_del_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_por_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_pol_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_pod_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_del_un_loc_chk" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_map_por_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_map_pol_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_map_pod_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_map_del_loc_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_map_por_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_map_pol_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_map_pod_cd" },
					            {Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"hbl_map_del_cd" }
					            
					            //#5083 [CLA] BL EDI Improvement Requests 요건 관련 추가
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"shpr_trdp_addr" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"shpr_trdp_cnt_cd" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"cnee_trdp_addr" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"cnee_trdp_cnt_cd" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"ntf_trdp_addr" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"ntf_trdp_cnt_cd" }
					            
					            //Agent EDI Spec 추가 사항 2018.12.10
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_org_agt_trdp_addr" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_org_agt_trdp_cnt_cd" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_shpr_trdp_addr" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_shpr_trdp_cnt_cd" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_cnee_trdp_addr" }
					            ,{Type:"Text",      Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,    SaveName:"mbl_cnee_trdp_cnt_cd" }
					            
								];
				   InitColumns(cols);
				   SetEditable(1);
				   //Agent EDI Spec 추가 사항 2018.12.10
				   //SetColProperty('shp_mod', {ComboText:'|FCL|FAK|LCL|BULK', ComboCode:'|FCL|FAK|LCL|BLK'} );
				   SetColProperty('shp_mod', {ComboText:SHIPMODCD1, ComboCode:SHIPMODCD2} );
				   //#6240 [Binex-LA] B/L Interface screen (Zen#1949)
				   //SetImageList(0,APP_PATH+"/web/img/button/btns_view.gif");
				   SetDataLinkMouse('view_dc',1);
			  	   SetSheetHeight(400);			  	   
			  	   SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			}													  
		 break;	 
		 case 2:

			   with(sheetObj){
					 
			          //  (42, 0, 0, true);
			         var cnt=0;

			         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6, DataRowMerge:1, TabStop:0 } );

			         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			         var headers = [ { Text:getLabel('MGT_ITF_0010_HDR2_1'), Align:"Center"},
			                     { Text:getLabel('MGT_ITF_0010_HDR2_2'), Align:"Center"} ];
//			         var headers = [ { Text:getLabel('MGT_ITF_0010_HDR'), Align:"Center"}];
			         InitHeaders(headers, info);

          	       var cols = [  {Type:"Text",      Hidden:0, Width:150,    Align:"Center",  ColMerge:1,   SaveName:"bl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",      Hidden:0, Width:90,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",      Hidden:0, Width:90,  Align:"Left",    ColMerge:1,   SaveName:"map_frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"PopupEdit",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
              	              {Type:"Combo",      Hidden:0, Width:55,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",     Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"rat_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
              	              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
              	              {Type:"Float",      Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Date",      Hidden:0, Width:75,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Float",      Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
              	              {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"agent_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
              	              {Type:"Float",      Hidden:0, Width:100,   Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Float",      Hidden:0, Width:100,   Align:"Right",   ColMerge:1,   SaveName:"cr_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"bl_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"frt_list_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"biz_clss_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"edi_tp",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
            	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
      
				         InitColumns(cols);
	
				         SetEditable(1);
				       //  SetHeaderRowHeight(20);
				         SetHeaderRowHeight(21);
						   SetColProperty('sell_buy_tp_cd', {ComboText:"Debit|Credit", ComboCode:"D|C"} );
						   
						   SetSheetHeight(250);
						   InitComboNoMatchText(1,"",1);
						   SetImageList(0,APP_PATH+"/js/ibsheet/Main/popup.gif");
			         }
		   			 
	     break;
		 
	 }
}
function sheet1_OnSaveEnd(){
	var sheetObj2 = docObjects[1];
	sheetObj2.RemoveAll();
	searchList();
}
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	docObjects[0].RenderSheet(0);
	
	if(formObj.f_cmd.value == '11'){ // DOWNLOAD를 실행시켰을 경우임
		//searchList();
		doWork('DOWNLOAD_SEARCHLIST');
		//sheet1.HideProcessDlg();
		//sheet1.ShowProcessDlg();
	}else{
		var sheetObj=docObjects[0];
		for( var i = 1; i <= sheetObj.LastRow(); i++) {
		    var bl_table_count_values = sheetObj.GetCellValue(i, "bl_table_count");
		    if(bl_table_count_values != "0") {
	            sheetObj.SetCellEditable(i, "chk", 0);
	            //Agent EDI Spec 추가 사항 2018.12.10
	            sheetObj.SetCellEditable(i, "mbl_org_agt_trdp_nm", 0);
	            sheetObj.SetCellEditable(i, "mbl_shpr_trdp_nm", 0);
	            sheetObj.SetCellEditable(i, "mbl_cnee_trdp_nm", 0);
	            sheetObj.SetCellEditable(i, "post_dt", 0);
	            sheetObj.SetCellEditable(i, "shpr_trdp_nm", 0);
	            sheetObj.SetCellEditable(i, "cnee_trdp_nm", 0);
	            sheetObj.SetCellEditable(i, "ntfy_trdp_nm", 0);
	            sheetObj.SetColBackColor("chk", "#EFEBEF");
	        }else{
	        	sheetObj.SetCellEditable(i, "chk", 1);
	        	//Agent EDI Spec 추가 사항 2018.12.10
	        	sheetObj.SetCellEditable(i, "mbl_org_agt_trdp_nm", 1);
	        	sheetObj.SetCellEditable(i, "mbl_shpr_trdp_nm", 1);
	            sheetObj.SetCellEditable(i, "mbl_cnee_trdp_nm", 1);
	            sheetObj.SetCellEditable(i, "post_dt", 1);
	            sheetObj.SetCellEditable(i, "shpr_trdp_nm", 1);
	            sheetObj.SetCellEditable(i, "cnee_trdp_nm", 1);
	            sheetObj.SetCellEditable(i, "ntfy_trdp_nm", 1);
	        }
		    
			if(sheetObj.GetCellValue(i, "status_bl") == "B/L Created"){
				sheetObj.SetCellBackColor(i, "status_bl","#FAED7D");
			}else if(sheetObj.GetCellValue(i, "status_bl") == "Error"){
				sheetObj.SetCellBackColor(i, "status_bl","#FFA7A7");
			}else if(sheetObj.GetCellValue(i, "status_bl") == "Downloaded"){
				sheetObj.SetCellBackColor(i, "status_bl","#8BBDFF");
			}
	    }	
		doHideProcess();
	}
	//#693 [FULLTRANS] BL EDI, DOWNLOADED BUT WRONG FILING # CREATED
	var shprCd="";
	var cneeCd="";
	var ntfyCd="";
	//Agent EDI Spec 추가 사항 2018.12.10
	var mbl_orgAgtCd="";
	var mbl_shprCd="";
	var mbl_cneeCd="";

	var mblPorUnLocCdChk="";
	var mblPolUnLocCdChk="";
	var mblPodUnLocCdChk="";
	var mblDelUnLocCdChk="";
	var hblPorUnLocCdChk="";
	var hblPolUnLocCdChk="";
	var hblPodUnLocCdChk="";
	var hblDelUnLocCdChk="";
	var dcNote ="";

	
	for(var i=1; i<docObjects[0].LastRow()+1; i++){

		shprCd=docObjects[0].GetCellValue(i, "shpr_cd");
		cneeCd=docObjects[0].GetCellValue(i, "cnee_cd");
		ntfyCd=docObjects[0].GetCellValue(i, "ntfy_cd");
		//Agent EDI Spec 추가 사항 2018.12.10
		mbl_orgAgtCd=docObjects[0].GetCellValue(i, "mbl_org_agt_cd");
		mbl_shprCd=docObjects[0].GetCellValue(i, "mbl_shpr_cd");
		mbl_cneeCd=docObjects[0].GetCellValue(i, "mbl_cnee_cd");
		/*
		if(shprCd == "" || cneeCd== "" || ntfyCd == ""){
			docObjects[0].SetRowBackColor(i,"#EAEAEA");
		}
		*/
		if(shprCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("shpr_trdp_nm"),"#FF0000");
		}
		if(cneeCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("cnee_trdp_nm"),"#FF0000");
		}
		if(ntfyCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("ntfy_trdp_nm"),"#FF0000");
		}
		//Agent EDI Spec 추가 사항 2018.12.10
		if(mbl_orgAgtCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_org_agt_trdp_nm"),"#FF0000");
		}
		if(mbl_shprCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_shpr_trdp_nm"),"#FF0000");
		}
		if(mbl_cneeCd == ""){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_cnee_trdp_nm"),"#FF0000");
		}
		
		// por~del un_loc_cd check
		mblPorUnLocCd=docObjects[0].GetCellValue(i, "mbl_por_un_loc_chk");
		mblPolUnLocCd=docObjects[0].GetCellValue(i, "mbl_pol_un_loc_chk");
		mblPodUnLocCd=docObjects[0].GetCellValue(i, "mbl_pod_un_loc_chk");
		mblDelUnLocCd=docObjects[0].GetCellValue(i, "mbl_del_un_loc_chk");
		
		hblPorUnLocCd=docObjects[0].GetCellValue(i, "hbl_por_un_loc_chk");
		hblPolUnLocCd=docObjects[0].GetCellValue(i, "hbl_pol_un_loc_chk");
		hblPodUnLocCd=docObjects[0].GetCellValue(i, "hbl_pod_un_loc_chk");
		hblDelUnLocCd=docObjects[0].GetCellValue(i, "hbl_del_un_loc_chk");
		
		if(mblPorUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_por"),"#FF0000");
		}
		if(mblPolUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_pol"),"#FF0000");
		}
		if(mblPodUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_pod"),"#FF0000");
		}
		if(mblDelUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("mbl_del"),"#FF0000");
		}
		if(hblPorUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("por"),"#FF0000");
		}
		if(hblPolUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("pol"),"#FF0000");
		}
		if(hblPodUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("pod"),"#FF0000");
		}
		if(hblDelUnLocCd == "N"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("del"),"#FF0000");
		}
		dcNote = docObjects[0].GetCellValue(i, "dc_note");
		if(dcNote == "Not Verified"){
			docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("dc_note"),"#FF0000");
		}
		//#6240 [Binex-LA] B/L Interface screen (Zen#1949)
		docObjects[0].SetCellFontColor(i, docObjects[0].SaveNameCol("view_dc"),"#9416B6");
		docObjects[0].SetCellFontBold(i, docObjects[0].SaveNameCol("view_dc"),true) ;
	}
	
	docObjects[1].RemoveAll();
	docObjects[0].RenderSheet(1);
//	if(g_dc_map_flg=='Y'){
//		g_dc_map_flg ='N';
//		docObjects[0].SetSelectRow(row);
//	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	searchList();
}
function sheet1_OnChange(sheetObj,Row,Col){
	var colNm = sheetObj.ColSaveName(Col);
	// d/c note 가 'N/A' or "Verified' 일때 b/l create 한다.
	if(colNm =='chk'){
		
		var dcNote = sheetObj.GetCellValue(Row,"dc_note");
		if( dcNote == 'Not Verified') {
			alert(getLabel('SYS_COM_ALT011'));	
			sheetObj.SetCellValue(Row, 'chk', 0, 0);
//		MSG_KEY['SYS_COM_ALT011'] = 'Please check D/C Mapping Freight Code.';
			
			//Agent EDI Spec 추가 사항 2018.12.10
		}else if(sheetObj.GetCellValue(Row,"shp_mod")==""){
			alert(getLabel('SYS_COM_ALT014'));	
			sheetObj.SetCellValue(Row, 'chk', 0, 0);
		}
	}
}

var s2_row = "";
var s2_col = "";
function sheet1_OnClick(sheetObj,Row,Col){
		var colStr=sheetObj.ColSaveName(Col);
		if(colStr=='view_dc'){	
			var formObj=document.frm1;
		    var sheetObj1=docObjects[0];
			var sheetObj2=docObjects[1];
			s2_row = Row;
			s2_col = Col;
		  	searchSheet2(sheetObj,Row,Col);
		}	
		// mbl 용 view frt
}
/**
 * sheet2 search
 * 해당 seq의 mbl,hbl 모두를 조회한다.
 */
function searchSheet2(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	formObj.bl_seq.value=sheetObj1.GetCellValue(Row,"bl_seq");
	formObj.f_edi_tp.value=sheetObj1.GetCellValue(Row,"edi_tp");
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj2.DoSearch("./MGT_ITF_0010_2GS.clt", FormQueryString(formObj) );
}


function sheet2_OnSearchEnd(){
	var formObj=document.frm1

	var sheetObj=docObjects[1];


	//#693 [FULLTRANS] BL EDI, DOWNLOADED BUT WRONG FILING # CREATED
	var mapFrtCd="";
	for(var i=1; i<docObjects[1].LastRow()+1; i++){

		mapFrtCd=docObjects[1].GetCellValue(i, "map_frt_cd");
		/*
		if(shprCd == "" || cneeCd== "" || ntfyCd == ""){
			docObjects[0].SetRowBackColor(i,"#EAEAEA");
		}
		*/
		if(mapFrtCd == ""){
			docObjects[1].SetCellFontColor(i, docObjects[1].SaveNameCol("frt_cd_nm"),"#FF0000");
		}
	}
	
	//sheet2 code mapping 저장 조회후 sheet1 조회후 select 
	//docObjects[0].SetSelectRow(row);
}

function sheet1_OnDblClick(sheetObj, Row, Col){	
	var colStr=sheetObj.ColSaveName(Col);
    
	if(sheetObj.GetCellValue(Row, 'bl_table_count') > 0 ){
		
		if(colStr =='chk' || colStr =='mbl_no' || colStr =='mbl_cnee_trdp_nm' || colStr =='mbl_etd' || colStr =='mbl_eta' || colStr =='mbl_por' || colStr =='mbl_pol' || colStr =='mbl_pod' || colStr =='mbl_del'){
			//#5246 [BINEX] AFTER V470.06 RELEASE, BL INTERFACE TO OIM BL ENTRY:binex B/L 수신 후 추가로 HOUSER B/L 전송 시 REF_NO 버그 로직 변경
			if(sheetObj.GetCellValue(Row,'ref_no') !="") {
				var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST;
				paramStr+= '&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'));
				parent.mkNewFrame('Master B/L Entry', paramStr, "SEI_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no'));
			}
		}else{       
			//#3793 [JAPT] BL EDI validation and text change
			if(sheetObj.GetCellValue(Row,'bl_no') !="") {
				var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(sheetObj.GetCellValue(Row,"bl_no"))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row,"intg_bl_seq");
				parent.mkNewFrame('Booking & HB/L Entry', paramStr,"SEI_BMD_0020_SHEET_" + sheetObj.GetCellValue(Row,"bl_no")+"_"+sheetObj.GetCellValue(Row,"intg_bl_seq")); 
			}
		}
	}
}
function checkValue(){
	var sheetObj=docObjects[0];
	var values_temp = 0;
	var return_value = true;
	for( var i = 1; i <= sheetObj.LastRow(); i++) {
	    var chk_valer = sheetObj.GetCellValue(i, "chk");
	    values_temp = values_temp + Number(chk_valer);
    }
	if(values_temp == 0){
		return_value = false;
	}else{                  
		return_value = true;
	}
	
	return return_value;
}
function checkBlValidation(){
    var formObj = document.frm1;
    var sheetObj = docObjects[0];
	for( var i = 1; i <= sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, "chk") == '1'){
		    var var_bl_seq   = sheetObj.GetCellValue(i, "bl_seq");
		    check_bl_no_temp = sheetObj.GetCellValue(i, "mbl_no");
		    ajaxSendPost(checkBlValidation_return, 'reqVal', '&goWhere=aj&bcKey=checkBlLive&bl_seq='+var_bl_seq,'./GateServlet.gsl');	
		}
    }
}                                         
function checkBlValidation_return(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != '0'){
				check_bl_no = check_bl_no_temp;
				check_value = false;
			}
		}
	}
	else{
	}
}
//#3704 [JAPT] Post Date 컬럼 check
function checkPostDate(){
    var formObj = document.frm1;
    var sheetObj = docObjects[0];
	for( var i = 1; i <= sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, "chk") == '1'){
		    if (sheetObj.GetCellValue(i, "post_dt") == ""){
				alert(getLabel('SYS_COM_ALT012') );
				sheetObj.SelectCell(i, "post_dt");
				return false;
		    }
		}
    }
	return true;
}  

function f_sameMblHblCheck(){
	var total_var = "Y"
	var glo_seq = "";	
	var formObj = document.frm1;
    var sheetObj = docObjects[0];
    var seqAry = new Array();
    var hblAryA = new Array();
    var hblAryB = new Array();
    var mblAryA = new Array();
    var mblAryB = new Array();
    
    /*체크된 BL SEQ(KEY) 만 뽑아낸다.*/
	for( var i = 1; i <= sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(i, "chk") == '1'){
			glo_seq = sheetObj.GetCellValue(i, "bl_seq");
			seqAry.push(glo_seq);
		}
    }
	/*HBL NO 를 뽑아낸다.*/
	for(var j = 0; j < seqAry.length; j++){ 
        for( var i = 1; i <= sheetObj.LastRow(); i++){
			if(seqAry[j] == sheetObj.GetCellValue(i, "bl_seq")){
				var var_bl_no = sheetObj.GetCellValue(i, "bl_no");
				hblAryA.push(var_bl_no);
			    hblAryB.push(var_bl_no);
			}
		}
    }
	/*MBL NO 를 뽑아낸다.*/
	/*for(var j = 0; j < seqAry.length; j++){ 
        for( var i = 1; i <= sheetObj.LastRow(); i++){
			if(seqAry[j] == sheetObj.GetCellValue(i, "bl_seq")){
				var var_bl_no = sheetObj.GetCellValue(i, "mbl_no");
			    mblAryA.push(var_bl_no);
			    mblAryB.push(var_bl_no);
			}
		}
    }*/
	/*뽑아진 HBL NO 를 비교한다. 같은것이 2개 이상일 경우 total_var = "N"로 조정한다.*/
	for(var i=0; i<hblAryA.length;i++){ 
	    var num1 = hblAryA[i];
	    var checkcount = 0;
	    for(var j=0; j<hblAryB.length;j++ ){
	    	if(num1 == hblAryA[j]){
	        	checkcount = checkcount + 1
	        }
	    }
	    if(checkcount > 1){
	    	total_var = "N"
	    	break;
	    }
	}
	/*뽑아진 MBL NO 를 비교한다. 같은것이 2개 이상일 경우 total_var = "N"로 조정한다.*/
	/*for(var i=0; i<mblAryA.length;i++){ 
	    var num1 = mblAryA[i];
	    var checkcount = 0;
	    for(var j=0; j<mblAryB.length;j++ ){
	    	if(num1 == mblAryA[j]){
	        	checkcount = checkcount + 1
	        }
	    }
	    if(checkcount > 1){
	    	total_var = "U"
	    	break;
	    }
	}*/
	return total_var;
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

/**
 * Sheet1의 Action Menu Event
 * 
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString) {
	var formObj = document.frm1;
	switch (MenuString) {
	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
	case "Header Setting Save":
		IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	// Header Setting Reset
	case "Header Setting Reset":
		IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
	// 사용자가 저장한 Header Setting을 삭제한다.
	// case "Header Setting Delete":
	// IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
	// break;
	// 선택된 Column Hidden
	case "Column Hidden":
		var col = sheetObj.MouseCol();
		sheetObj.SetColHidden(col, 1);
		sheetObj.SetColWidth(col, 1);
		break;
	}
}
// OFVFOUR-8251 [Urgent] [NTL NAIGAI TRANS] OI AMS B/L EDI got the error message
// OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
// var post_dt_imp = ""; // OFVFOUR-7503 [SOUTH EAST WORLD WIDE] OI B/L EDI DATA & OFFICE CODE PREFIX
// function checkImpPostRef(){
// 	ajaxSendPost(setImpPostRef, 'reqVal', '&goWhere=aj&bcKey=getImpPostRef&f_ofc_cd='+ofc_cd, './GateServlet.gsl');
// }
// function setImpPostRef(reqVal){
// 	var doc = getAjaxMsgXML(reqVal);
// 	if(doc[0]=='OK'){
// 		if(typeof(doc[1])!='undefined'){
// 			post_dt_imp = doc[1];
// 		}
// 	}
// }
