/*=========================================================
*@FileName   :  ProgramConfigMng.js
*@FileTitle  :  Program Configuration Management
*@Description:  
*@author     : Thoa Dien - DOU Networks
*@version    : 1.0 - 2017.12.04
*@since      : 2017.12.04

*@Change history:
=========================================================*/
var show_complete = "N";
function doWork(srcName) {
    if (!btnGetVisible(srcName)) {	//버튼의 단축키 사용가능여부 체크
        return;
    }
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj = document.form;
    try {
        switch (srcName) {
            case "SEARCHLIST":
                formObj.f_cmd.value = SEARCHLIST;
                //검증로직
                if (validateForm(sheetObj, formObj, SEARCHLIST, 1)) {
                    sheetObj.DoSearch("ProgramConfigMngGS.clt", FormQueryString(formObj));
                }
                break;
            case "SAVE":
                formObj.f_cmd.value = MODIFY;
                
                if (inpuValCheck(sheetObj, MODIFY)) { 
                	if(!checkDupData(sheetObj)) return; 
                	
                    if (confirm(getLabel('FMS_COM_CFMSAV'))) {
                        doProcess = true;
                        
                        if(sheetObj.FindStatusRow("I|U|D") != ""){
                        	show_complete = "Y";
                        }
                        sheetObj.DoSave("ProgramConfigMngGS.clt", FormQueryString(formObj), "ibflag", false);
                    }
                }
                break;    
            case "ROWADD":
                var intRows = sheetObj.LastRow() + 1;
                sheetObj.DataInsert(intRows);
                sheetObj.SetCellValue(intRows, "ofc_cd", formObj.f_ofc_cd.value, 0); //  Default
                sheetObj.SetCellValue(intRows, "pg_row_cd", "L3", 0); 
                
                break;
                
        } // end switch
    } catch (e) {
        if (e == "[object Error]") {
            //Unexpected Error occurred. Please contact Help Desk!
            alert(getLabel('FMS_COM_ERR002'));
        }
        else {
            //System Error! + MSG
            alert(getLabel('FMS_COM_ERR001'));
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	//Init sheet
    for (var i = 0; i < docObjects.length; i++) {
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i], i + 1);
        comEndConfigSheet(docObjects[i]);
    }
    	
	// Auto searching data when opening UI
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
    docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
    switch (sheetNo) {
        case 1:      //IBSheet1 init
            with (sheetObj) {

                SetConfig({SearchMode: 2, MergeSheet: 5, Page: 20, DataRowMerge: 0, FrozenCol:0});

                var info = {Sort: 1, ColMove: 1, HeaderCheck: 0, ColResize: 1};
                var headers = [{Text: getLabel('PGM_CFG_MNG_HDR1'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,    Align:"Center",  ColMerge:0,   SaveName:"Del" },
			                {Type:"Status",    Hidden:1,  Width:40,    Align:"Left",    ColMerge:0,   SaveName:"ibflag" },
			                {Type:"Combo",     Hidden:0,  Width:60,    Align:"Center",  ColMerge:0,   SaveName:"ofc_cd",       		KeyField:1,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
			                {Type:"Text",      Hidden:0,  Width:90,    Align:"Center",    ColMerge:0,   SaveName:"pgm_id",       		KeyField:1,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:5, InputCaseSensitive:1},
			                {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:0,   SaveName:"pgm_nm",       		KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:150, InputCaseSensitive:1},
			                {Type:"Combo",     Hidden:0,  Width:100,   Align:"Center",    ColMerge:0,   SaveName:"tgt_dt_tp_cd", 		KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0,  Width:80,    Align:"Center",    ColMerge:0,   SaveName:"prd_bse_tp_cd",		KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
			                {Type:"Int",       Hidden:0,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"fm_dt",        		KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5},
			                {Type:"Int",       Hidden:0,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"to_dt",        		KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
			                {Type:"Int",       Hidden:0,  Width:80,    Align:"Right",   ColMerge:0,   SaveName:"prd_max_dt",   		KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5  },
			                {Type:"CheckBox",  Hidden:0,  Width:90,    Align:"Center",  ColMerge:0,   SaveName:"use_init_set_flg", 	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
			                {Type:"CheckBox",  Hidden:0,  Width:80,    Align:"Center",  ColMerge:0,   SaveName:"init_dat_lod_flg", 	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
			                {Type:"Combo",     Hidden:0,  Width:70,    Align:"Center",    ColMerge:0,   SaveName:"pg_row_cd",       	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
			                {Type:"CheckBox",  Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"use_ib_hd_flg",   	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
			                {Type:"Text",      Hidden:0,  Width:170,   Align:"Left",    ColMerge:0,   SaveName:"dflt_ib_hd_desc",   KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
			                {Type:"CheckBox",  Hidden:0,  Width:110,   Align:"Center",  ColMerge:0,   SaveName:"use_dtl_set_flg",  	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
			                {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:0,   SaveName:"dtl_set_desc",      KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",     		KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"modi_tms",     		KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
				          
                InitColumns(cols);
                var height = $(window).height();
                SetEditable(1);
                SetSheetHeight(height - 150);
                SetColProperty("ofc_cd", {ComboText: ofcCd, ComboCode: ofcCd});
                SetColProperty("tgt_dt_tp_cd", {ComboText: TargetDateTpNm, ComboCode: TargetDateTpCd});
                SetColProperty("prd_bse_tp_cd", {ComboText: periodDateNm, ComboCode: periodDateCd});
                SetColProperty("pg_row_cd", {ComboText: rowOnPageNm, ComboCode: rowOnPageCd});

            }
            break;
    }
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
	}
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	
}

function sheet1_OnChange(sheetObj, row, col){
	switch (sheetObj.ColSaveName(col)) {
		case "prd_max_dt" :
			// Period Max must be less than To – From + 2 
			if(sheetObj.GetCellValue(row, "to_dt") !=0 || sheetObj.GetCellValue(row, "fm_dt") != 0 || sheetObj.GetCellValue(row, "prd_max_dt") != 0){
				var total_Dt_FmTo = sheetObj.GetCellValue(row, "to_dt") - sheetObj.GetCellValue(row, "fm_dt") + 1;
				if(total_Dt_FmTo > sheetObj.GetCellValue(row, "prd_max_dt")){
					ComShowMessage(getLabel("FMS_COM_ALT131"));
					sheetObj.SetSelectRow(row);
					return;
				}
			}
			break;
		case "pgm_id":
			if(sheetObj.GetCellValue(row, col) != ""){
				ajaxSendPost(getReturnProgramName, 'reqVal', '&goWhere=aj&bcKey=getProgramNameByProgramId&f_ofc_cd='+ sheetObj.GetCellValue(row, "ofc_cd") + '&f_pgm_id='+ sheetObj.GetCellValue(row, "pgm_id"), './GateServlet.gsl');
			}else{
				sheetObj.SetCellValue(row, "pgm_nm", "");
			}				
			break;
	}

}
var dupValue = "NO";
function checkDupData(sheetObj){
	// Check duplicate data on grid
	if(sheetObj.ColValueDup("ofc_cd|pgm_id") > 0){
		ComShowMessage(getLabel("FMS_COM_ALT008"));
		return false;
	}
	
	// Check duplicate data on DB -  If during user is updating data but there is another saving transaction before then system will notify
	var insertRow_List = new Array();
	insertRow_List = sheetObj.FindStatusRow("I").split(";");
	if (insertRow_List.length > 0){
		for(var i = 0; i < insertRow_List.length; i++){
			dupValue = "NO";
			ajaxSendPost(getProgramConfigCheck, 'reqVal', '&goWhere=aj&bcKey=getCheckOfficeProgram&f_ofc_cd='+ sheetObj.GetCellValue(insertRow_List[i], "ofc_cd") + '&f_pgm_id='+ sheetObj.GetCellValue(insertRow_List[i], "pgm_id"), './GateServlet.gsl');
			if(dupValue == 'DP'){
				ComShowMessage(getLabel('FMS_COM_ALT008'));
				sheetObj.SetSelectRow(insertRow_List[i]);
				return false;
			}
		}
	}
	return true;
}

function getProgramConfigCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			dupValue = doc[1];
		}
	}else{
		
	}
}

// Get Program Name if there is value
function getReturnProgramName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var rowIdx = sheetObj.GetSelectRow();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			// Set Program Name to pgm_nm column on sheet
			sheetObj.SetCellValue(rowIdx, "pgm_nm", doc[1]);
		}else{
			sheetObj.SetCellValue(rowIdx, "pgm_nm", "");
		}
	}
}
/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj, f_cmd) {
	// Check data input
	var insertUpdateRow_List = new Array();
	insertUpdateRow_List = sheetObj.FindStatusRow("I|U").split(";");
	if(insertUpdateRow_List != "") {
		for (var i = 0; i < insertUpdateRow_List.length ; i++){
			if(sheetObj.GetCellValue(insertUpdateRow_List[i], "ibflag") == "I"){
				if(sheetObj.GetCellValue(insertUpdateRow_List[i], "ofc_cd") == ""  || sheetObj.GetCellValue(insertUpdateRow_List[i], "pgm_id") == ""){
					ComShowMessage(getLabel("FMS_COM_ALT001"));
					sheetObj.SetSelectRow(insertUpdateRow_List[i]);
					return false;
				}
			}
			
			if(sheetObj.GetCellValue(insertUpdateRow_List[i], "tgt_dt_tp_cd") != "" && sheetObj.GetCellValue(insertUpdateRow_List[i], "prd_bse_tp_cd") == ""){
				ComShowMessage(getLabel("FMS_COM_ALT135") + '\n'+ getLabel("FMS_COM_ALT007"));
				sheetObj.SetSelectRow(insertUpdateRow_List[i]);
				return false;
			}
			
			if(sheetObj.GetCellValue(insertUpdateRow_List[i], "tgt_dt_tp_cd") == "" && sheetObj.GetCellValue(insertUpdateRow_List[i], "prd_bse_tp_cd") != ""){
				ComShowMessage(getLabel("FMS_COM_ALT135") + '\n'+ getLabel("FMS_COM_ALT007"));
				sheetObj.SetSelectRow(insertUpdateRow_List[i]);
				return false;
			}
			
			// To Date >= From Date
			if((sheetObj.GetCellValue(insertUpdateRow_List[i], "to_dt") - sheetObj.GetCellValue(insertUpdateRow_List[i], "fm_dt")) < 0){
				ComShowMessage(getLabel("FMS_COM_ALT132") );
				sheetObj.SetSelectRow(insertUpdateRow_List[i]);
				return false;
			}
			
			if(sheetObj.GetCellValue(insertUpdateRow_List[i], "to_dt") !=0 || sheetObj.GetCellValue(insertUpdateRow_List[i], "fm_dt") != 0 || sheetObj.GetCellValue(insertUpdateRow_List[i], "prd_max_dt") != 0){
				// If there are values of From, To and Period Max => Target Date and Period Base must have data
				if(sheetObj.GetCellValue(insertUpdateRow_List[i], "tgt_dt_tp_cd") == "" || sheetObj.GetCellValue(insertUpdateRow_List[i], "prd_bse_tp_cd") == ""){
					ComShowMessage(getLabel("FMS_COM_ALT007") + '\n'+ getLabel("FMS_COM_ALT133"));
					sheetObj.SetSelectRow(insertUpdateRow_List[i]);
					return false;
				}
				// Period Max must be less than To – From + 2 
				var total_Dt_FmTo = sheetObj.GetCellValue(insertUpdateRow_List[i], "to_dt") - sheetObj.GetCellValue(insertUpdateRow_List[i], "fm_dt") + 1;
				if(total_Dt_FmTo > sheetObj.GetCellValue(insertUpdateRow_List[i], "prd_max_dt")){
					ComShowMessage(getLabel("FMS_COM_ALT131"));
					sheetObj.SetSelectRow(insertUpdateRow_List[i]);
					return false;
				}
			}
			
		}
	}
	
	
	return true;
}