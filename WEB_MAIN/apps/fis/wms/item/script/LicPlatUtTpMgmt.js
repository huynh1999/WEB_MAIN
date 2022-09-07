/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LicPlatUtTpMgmt.js
*@FileTitle  : License Plate Unit Type
*@author     : LSY
*@version    : 1.0
*@since      : 2016/10/17
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
				sheetObj.DoSearch("LicPlatUtTpMgmtGS.clt", FormQueryString(formObj) );
			}
			displayClear();
			break;
		case "SAVE":
			doAction();
			break;
		case "NEW":
			displayClear();
			break;
		case "ADD_1":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=ADD;
             	sheetObj.DoSearch("LicPlatUtTpMgmtGS.clt", FormQueryString(formObj) );
        		showCompleteProcess();
	        }
			break;
		case "MODIFY_1":
			useFlgChange();
			formObj.f_cmd.value=MODIFY;
         	sheetObj.DoSearch("LicPlatUtTpMgmtGS.clt", FormQueryString(formObj) );
    		showCompleteProcess();
			break;
	}
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------

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
    // 디폴트 사이즈 UNIT 설정
    fn_setDefaultMeasurUnit();
    doWork("SEARCHLIST");
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
             var headers = [ { Text:getLabel('WHLicPlatUtTpMgmt_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Seq",      Hidden:0,	Width:80,	Align:"Center",		ColMerge:0,   SaveName:"",               	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:0,	Width:150,   Align:"Left",		ColMerge:0,   SaveName:"lic_plat_ut_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                    {Type:"Text",     Hidden:0, Width:250,   Align:"Left",		ColMerge:0,   SaveName:"lic_plat_desc",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                    {Type:"Combo",    Hidden:0, Width:150,   Align:"Left",		ColMerge:0,   SaveName:"lic_plat_ut_tp_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Combo",    Hidden:0, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"use_flg",			KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_len",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_wdt",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_hgt",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_meas",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT_COUNT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_wgt",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_size_ut_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_meas_ut_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_wgt_ut_cd",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_size_ut_nm",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_meas_ut_nm",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"bss_wgt_ut_nm",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_len",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_wdt",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_hgt",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_meas",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT_COUNT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_wgt",			KeyField:0,   CalcLogic:"",   Format:"Float",	PointCount:WMS_CBM_POINT,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_size_ut_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_meas_ut_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_wgt_ut_cd",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_size_ut_nm",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_meas_ut_nm",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"cnvt_wgt_ut_nm",	KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"delt_flg",			KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"rgst_usrid",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"rgst_ofc_cd",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"rgst_tms",			KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"modi_usrid",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"modi_ofc_cd",		KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",     Hidden:1, Width:80,   Align:"Left",		ColMerge:0,   SaveName:"modi_tms",			KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
                    ];
              
			InitColumns(cols);
			
			SetEditable(1);
			SetColProperty("lic_plat_ut_tp_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2});
			SetColProperty("use_flg", {ComboText:"Active|Inactive", ComboCode:"Y|N"});
			SetSheetHeight(350);

         }
         break;
	}
    
}

function fncSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}

// Size Onchange Event
function fn_sizeChange(obj) {

	var formObj=document.frm1;

	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
	// 환산율
	//var cnvt_rate = 0;
	var command = "CM_INCH";
	if (formObj.h_bss_size_ut_cd_1.value == "INCH") {
		//cnvt_rate = 2.54;
		command = "INCH_CM";
	} else {
		//cnvt_rate = 0.3937;
		command = "CM_INCH";
	}

	// Length
	if(obj.name=="i_bss_len"){
		//var rndXLValue=roundXL(formObj.i_bss_len.value.replaceAll(",","") * cnvt_rate, 2);
		//formObj.i_cnvt_len.value=rndXLValue;
		formObj.i_cnvt_len.value = unitConvertValue(command, formObj.i_bss_len.value.replaceAll(",", ""));
		chkComma(formObj.i_cnvt_len, 3, WMS_LEN_POINT_COUNT);
	}

	// Width
	if(obj.name=="i_bss_wdt"){
		//var rndXLValue=roundXL(formObj.i_bss_wdt.value.replaceAll(",","") * cnvt_rate, 2);
		//formObj.i_cnvt_wdt.value=rndXLValue;
		formObj.i_cnvt_wdt.value = unitConvertValue(command, formObj.i_bss_wdt.value.replaceAll(",", ""));
		chkComma(formObj.i_cnvt_wdt, 3, WMS_LEN_POINT_COUNT);
	}

	// Height
	if(obj.name=="i_bss_hgt"){
		//var rndXLValue=roundXL(formObj.i_bss_hgt.value.replaceAll(",","") * cnvt_rate, 2);
		//formObj.i_cnvt_hgt.value=rndXLValue;
		formObj.i_cnvt_hgt.value = unitConvertValue(command, formObj.i_bss_hgt.value.replaceAll(",", ""));
		//chkComma(formObj.i_cnvt_hgt, 3, 2);
		chkComma(formObj.i_cnvt_hgt, 3, WMS_LEN_POINT_COUNT);
	}
}

//Measure Onchange Event
function fn_measureChange(obj) {

	var formObj=document.frm1;

	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
	// 환산율
	//var cnvt_rate = 0;
	var command = "CBM_CBF";
	if (formObj.h_bss_meas_ut_cd.value == "CBM") {
		//cnvt_rate = 0.453597315;
		command = "CBM_CBF";
	} else {
		//cnvt_rate = CNVT_CNST_KG_LB;
		command = "CBF_CBM";
	}

	// Length
	if(obj.name == "i_bss_meas") {
		//var rndXLValue=roundXL(formObj.i_bss_meas.value.replaceAll(",","") * cnvt_rate, 5);
		//formObj.i_cnvt_meas.value=rndXLValue;
		formObj.i_cnvt_meas.value = unitConvertValue(command, formObj.i_bss_meas.value.replaceAll(",", ""));
		//chkComma(formObj.i_cnvt_meas, 10, 5);
		chkComma(formObj.i_cnvt_meas, 10, WMS_CBM_POINT_COUNT);
	}
}

//Weight Onchange Event
function fn_weightChange(obj) {

	var formObj=document.frm1;

	// 환산율
	//var cnvt_rate = 0;
	var command = "KG_LB";
	if (formObj.h_bss_wgt_ut_cd.value == "LB") {
		//cnvt_rate = 35.3146667;
		command = "LB_KG";
	} else {
		//cnvt_rate = 0.0283168466;
		command = "KG_LB";
	}

	// Length
	if(obj.name=="i_bss_wgt"){
		//var rndXLValue=roundXL(formObj.i_bss_wgt.value.replaceAll(",","") * cnvt_rate, 5);
		//formObj.i_cnvt_wgt.value=rndXLValue;
		formObj.i_cnvt_wgt.value = unitConvertValue(command, formObj.i_bss_wgt.value.replaceAll(",", ""));
		//chkComma(formObj.i_cnvt_wgt, 10, 5);
		chkComma(formObj.i_bss_wgt, 10, WMS_WGT_POINT_COUNT);
		chkComma(formObj.i_cnvt_wgt, 10, WMS_WGT_POINT_COUNT);
	}
}

// 디폴트 사이즈 UNIT 설정
function fn_setDefaultMeasurUnit(){
	var formObj=document.frm1;
	
//	alert(l_ofc_size_ut_cd + "/" + l_ofc_meas_ut_cd + "/" + l_ofc_wgt_ut_cd );
	
	formObj.h_bss_size_ut_cd_1.value = l_ofc_size_ut_cd
	formObj.h_bss_size_ut_cd_2.value = l_ofc_size_ut_cd 
	formObj.h_bss_size_ut_cd_3.value = l_ofc_size_ut_cd
	formObj.h_bss_meas_ut_cd.value = l_ofc_meas_ut_cd 
	formObj.h_bss_wgt_ut_cd.value = l_ofc_wgt_ut_cd
	
	// C084 : CM , INCH / S004 : CBM, CFT / C035 : KG, LB 이코드 값중 일부만 사용하기 때문에 하드코딩..
	// Size
	if (l_ofc_size_ut_cd == null || l_ofc_size_ut_cd == "") {
		formObj.h_bss_size_ut_cd_1.value = "INCH";
		formObj.h_bss_size_ut_cd_2.value = "INCH";
		formObj.h_bss_size_ut_cd_3.value = "INCH";
		formObj.i_bss_size_ut_nm_1.value = "Inch";
		formObj.i_bss_size_ut_nm_2.value = "Inch";
		formObj.i_bss_size_ut_nm_3.value = "Inch";
		
		formObj.h_cnvt_size_ut_cd_1.value = "CM";
		formObj.h_cnvt_size_ut_cd_2.value = "CM";
		formObj.h_cnvt_size_ut_cd_3.value = "CM";
		formObj.i_cnvt_size_ut_nm_1.value = "CM";
		formObj.i_cnvt_size_ut_nm_2.value = "CM";
		formObj.i_cnvt_size_ut_nm_3.value = "CM";
	} else {
		if (formObj.h_bss_size_ut_cd_1.value == "CM") {
			formObj.i_bss_size_ut_nm_1.value = "CM";
			formObj.i_bss_size_ut_nm_2.value = "CM";
			formObj.i_bss_size_ut_nm_3.value = "CM";
			
			formObj.h_cnvt_size_ut_cd_1.value = "INCH";
			formObj.h_cnvt_size_ut_cd_2.value = "INCH";
			formObj.h_cnvt_size_ut_cd_3.value = "INCH";
			formObj.i_cnvt_size_ut_nm_1.value = "Inch";
			formObj.i_cnvt_size_ut_nm_2.value = "Inch";
			formObj.i_cnvt_size_ut_nm_3.value = "Inch";	
		} else if (formObj.h_bss_size_ut_cd_1.value == "INCH") {
			formObj.i_bss_size_ut_nm_1.value = "INCH";
			formObj.i_bss_size_ut_nm_2.value = "INCH";
			formObj.i_bss_size_ut_nm_3.value = "INCH";
			
			formObj.h_cnvt_size_ut_cd_1.value = "CM";
			formObj.h_cnvt_size_ut_cd_2.value = "CM";
			formObj.h_cnvt_size_ut_cd_3.value = "CM";
			formObj.i_cnvt_size_ut_nm_1.value = "CM";
			formObj.i_cnvt_size_ut_nm_2.value = "CM";
			formObj.i_cnvt_size_ut_nm_3.value = "CM";
		}
	}
	// Measurement
	if (l_ofc_meas_ut_cd == null || l_ofc_meas_ut_cd == "") {
		formObj.h_bss_meas_ut_cd.value = "CBM";
		formObj.i_bss_meas_ut_nm.value = "CBM";
		
		formObj.h_cnvt_meas_ut_cd.value = "CFT";
		formObj.i_cnvt_meas_ut_nm.value = "CFT";
	} else {
		if (formObj.h_bss_meas_ut_cd.value == "CBM") {
			formObj.i_bss_meas_ut_nm.value = "CBM";
			
			formObj.h_cnvt_meas_ut_cd.value = "CFT";
			formObj.i_cnvt_meas_ut_nm.value = "CFT";
		} else if (formObj.h_bss_meas_ut_cd.value == "CFT") {
			formObj.i_bss_meas_ut_nm.value = "CFT";
			
			formObj.h_cnvt_meas_ut_cd.value = "CBM";
			formObj.i_cnvt_meas_ut_nm.value = "CBM";
		} else {
			formObj.h_bss_meas_ut_cd.value = "CBM";
			formObj.i_bss_meas_ut_nm.value = "CBM";
			
			formObj.h_cnvt_meas_ut_cd.value = "CFT";
			formObj.i_cnvt_meas_ut_nm.value = "CFT";
		}
	}
	// Weight
	// Weight
	if (l_ofc_wgt_ut_cd == null || l_ofc_wgt_ut_cd == "") {
		formObj.h_bss_wgt_ut_cd.value = "LB";
		formObj.i_bss_wgt_ut_nm.value = "LB";
		
		formObj.h_cnvt_wgt_ut_cd.value = "KG";
		formObj.i_cnvt_wgt_ut_nm.value = "KG";
	} else {
		if (formObj.h_bss_wgt_ut_cd.value == "LB") {
			formObj.i_bss_wgt_ut_nm.value = "LB";
			
			formObj.h_cnvt_wgt_ut_cd.value = "KG";
			formObj.i_cnvt_wgt_ut_nm.value = "KG";
		} else if (formObj.h_bss_wgt_ut_cd.value == "KG") {
			formObj.i_bss_wgt_ut_nm.value = "KG";
			
			formObj.h_cnvt_wgt_ut_cd.value = "LB";
			formObj.i_cnvt_wgt_ut_nm.value = "LB";
		} else {
			formObj.h_bss_wgt_ut_cd.value = "LB";
			formObj.i_bss_wgt_ut_nm.value = "LB";
			
			formObj.h_cnvt_wgt_ut_cd.value = "KG";
			formObj.i_cnvt_wgt_ut_nm.value = "KG";
		}
	}
}

// Onclick Event
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.i_lic_plat_ut_cd.value=sheetObj.GetCellValue(Row, "lic_plat_ut_cd");
	formObj.i_lic_plat_desc.value=sheetObj.GetCellValue(Row, "lic_plat_desc");
	formObj.i_lic_plat_ut_tp_cd.value=sheetObj.GetCellValue(Row, "lic_plat_ut_tp_cd");
	var bolUseYn=sheetObj.GetCellValue(Row, "use_flg");
	formObj.h_use_flg.value = bolUseYn;
	if ( bolUseYn == "Y" ) {
		formObj.i_use_flg.checked=true;
	} else if ( bolUseYn == "N" ) {
		formObj.i_use_flg.checked=false;
	}
	formObj.i_bss_len.value=sheetObj.GetCellValue(Row, "bss_len");
	formObj.i_bss_wdt.value=sheetObj.GetCellValue(Row, "bss_wdt");
	formObj.i_bss_hgt.value=sheetObj.GetCellValue(Row, "bss_hgt");
	formObj.i_bss_meas.value=sheetObj.GetCellValue(Row, "bss_meas");
	formObj.i_bss_wgt.value=sheetObj.GetCellValue(Row, "bss_wgt");
	formObj.h_bss_size_ut_cd_1.value=sheetObj.GetCellValue(Row, "bss_size_ut_cd");
	formObj.h_bss_size_ut_cd_2.value=sheetObj.GetCellValue(Row, "bss_size_ut_cd");
	formObj.h_bss_size_ut_cd_3.value=sheetObj.GetCellValue(Row, "bss_size_ut_cd");
	formObj.h_bss_meas_ut_cd.value=sheetObj.GetCellValue(Row, "bss_meas_ut_cd");
	formObj.h_bss_wgt_ut_cd.value=sheetObj.GetCellValue(Row, "bss_wgt_ut_cd");
	formObj.i_bss_size_ut_nm_1.value=sheetObj.GetCellValue(Row, "bss_size_ut_nm");
	formObj.i_bss_size_ut_nm_2.value=sheetObj.GetCellValue(Row, "bss_size_ut_nm");
	formObj.i_bss_size_ut_nm_3.value=sheetObj.GetCellValue(Row, "bss_size_ut_nm");
	formObj.i_bss_meas_ut_nm.value=sheetObj.GetCellValue(Row, "bss_meas_ut_nm");
	formObj.i_bss_wgt_ut_nm.value=sheetObj.GetCellValue(Row, "bss_wgt_ut_nm");
	formObj.i_cnvt_len.value=sheetObj.GetCellValue(Row, "cnvt_len");
	formObj.i_cnvt_wdt.value=sheetObj.GetCellValue(Row, "cnvt_wdt");
	formObj.i_cnvt_hgt.value=sheetObj.GetCellValue(Row, "cnvt_hgt");
	formObj.i_cnvt_meas.value=sheetObj.GetCellValue(Row, "cnvt_meas");
	formObj.i_cnvt_wgt.value=sheetObj.GetCellValue(Row, "cnvt_wgt");
	formObj.h_cnvt_size_ut_cd_1.value=sheetObj.GetCellValue(Row, "cnvt_size_ut_cd");
	formObj.h_cnvt_size_ut_cd_2.value=sheetObj.GetCellValue(Row, "cnvt_size_ut_cd");
	formObj.h_cnvt_size_ut_cd_3.value=sheetObj.GetCellValue(Row, "cnvt_size_ut_cd");
	formObj.h_cnvt_meas_ut_cd.value=sheetObj.GetCellValue(Row, "cnvt_meas_ut_cd");
	formObj.h_cnvt_wgt_ut_cd.value=sheetObj.GetCellValue(Row, "cnvt_wgt_ut_cd");
	formObj.i_cnvt_size_ut_nm_1.value=sheetObj.GetCellValue(Row, "cnvt_size_ut_nm");
	formObj.i_cnvt_size_ut_nm_2.value=sheetObj.GetCellValue(Row, "cnvt_size_ut_nm");
	formObj.i_cnvt_size_ut_nm_3.value=sheetObj.GetCellValue(Row, "cnvt_size_ut_nm");
	formObj.i_cnvt_meas_ut_nm.value=sheetObj.GetCellValue(Row, "cnvt_meas_ut_nm");
	formObj.i_cnvt_wgt_ut_nm.value=sheetObj.GetCellValue(Row, "cnvt_wgt_ut_nm");
	formObj.i_rgst_usrid.value=sheetObj.GetCellValue(Row, "rgst_usrid");
	formObj.i_rgst_tms.value=sheetObj.GetCellValue(Row, "rgst_tms");
	formObj.i_modi_usrid.value=sheetObj.GetCellValue(Row, "modi_usrid");
	formObj.i_modi_tms.value=sheetObj.GetCellValue(Row, "modi_tms");
	
	formObj.save_flg.value='U';
}

// Don't allow inputting special character in Code field.
function checkSpecialCharacter(obj) {
	var formObj=document.frm1;
    var keyValue=obj.value;
    var specialChars = "~`!@#$^&%*[]\/{}|:<>?;()'";
    for (var i=0; i < specialChars.length; i++) {
    	keyValue = keyValue .replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    obj.value = keyValue;
}

// SAVE Button
function doAction(){
	var formObj=document.frm1;
	var i_lic_plat_ut_cd=formObj.i_lic_plat_ut_cd.value;
	if(checkAddModiVal(frm1)){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchLicPlateUnitTypeCd&s_lic_plat_ut_cd='+i_lic_plat_ut_cd, './GateServlet.gsl');
	}
}

// SAVE Button Ajax CallBack
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(checkAddModiVal(frm1)){
				//수정하지 않고 경고 메시지를 띄운다
				if(formObj.save_flg.value =="I"){ // NEW버튼으로 등록 후 키가 중복된 경우 
					if(confirm(getLabel('FMS_COM_ALT008')+'\n'+getLabel('FMS_COM_CFMMOD'))){
						doWork("MODIFY_1");
					}
				}else if(formObj.save_flg.value =="U"){
					if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
						doWork("MODIFY_1");
					}
				}
			}
		} else {
			// 신규 저장
			if(checkAddModiVal(frm1)){
				doWork("ADD_1");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}

function checkAddModiVal(frm1){
    if(checkInputVal(frm1.i_lic_plat_ut_cd.value, 1, 20, "T", 'Code')!='O'){
    	frm1.i_lic_plat_ut_cd.focus();
    	return false;
    } else if(checkInputVal(frm1.i_lic_plat_desc.value, 1, 100, "T", 'Description')!='O'){
    	frm1.i_lic_plat_desc.focus();
    	return false;
    }
    
    return true;
}

function displayClear() {
	var formObj=document.frm1;
	formObj.i_lic_plat_ut_cd.value="";
	formObj.i_lic_plat_desc.value="";
	formObj.i_lic_plat_ut_tp_cd.value = "WOD"; //Wood
	formObj.i_use_flg.checked=true;
	formObj.h_use_flg.value="Y";
	formObj.i_bss_len.value="";
	formObj.i_bss_wdt.value="";
	formObj.i_bss_hgt.value="";
	formObj.i_bss_meas.value="";
	formObj.i_bss_wgt.value="";
	formObj.i_cnvt_len.value="";
	formObj.i_cnvt_wdt.value="";
	formObj.i_cnvt_hgt.value="";
	formObj.i_cnvt_meas.value="";
	formObj.i_cnvt_wgt.value="";
	formObj.i_rgst_usrid.value="";
	formObj.i_rgst_tms.value="";
	formObj.i_modi_usrid.value="";
	formObj.i_modi_tms.value="";
   	
	// 단위 Default Set
	fn_setDefaultMeasurUnit();
	
   	formObj.save_flg.value='I';
}

function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
		formObj.h_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
		formObj.h_use_flg.value="N";
	}
}


//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
$(document).ready(function() {

	$('[name=i_bss_len], [name=i_bss_wdt], [name=i_bss_hgt]').change(function(){
		$(this).val(valLenCut($(this).val(), WMS_LEN_POINT_COUNT));
	});

	$('[name=i_bss_wgt]').change(function(){
		$(this).val(valLenCut($(this).val(), WMS_WGT_POINT_COUNT));
	});

	$('[name=i_bss_meas]').change(function(){
		$(this).val(valLenCut($(this).val(), WMS_CBM_POINT_COUNT));
	});

	valLenCut = function(val, len) {
		var rtnVal = '';
		if(val.indexOf('.') > -1) {
			var arrVal = val.split('.');
			rtnVal = arrVal[0] + '.';
			if(arrVal[1].length > len) {
				rtnVal += arrVal[1].substring(0, len);
			} else if(arrVal[1].length == len) {
				rtnVal += arrVal[1];
			} else {
				rtnVal += paddStr(arrVal[1], '0', len);
			}
		} else {
			rtnVal = val + '.' + paddStr('', '0', len);
		}

		return rtnVal;
	};

	paddStr = function(val, paddStr, len) {
		var rtnVal = val;
		for(var i=val.length; i<len; i++) {
			rtnVal += paddStr;
		}
		return rtnVal;
	};
});
//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)