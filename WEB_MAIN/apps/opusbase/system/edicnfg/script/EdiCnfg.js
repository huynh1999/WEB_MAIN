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
                    sheetObj.DoSearch("EdiCnfgGS.clt", FormQueryString(formObj));
                }
                break;
                
            case "SAVE":
                formObj.f_cmd.value = ADD;
                if(!inpuValCheck(sheetObj, ADD)){
                	return;
                }
                if (confirm(getLabel('FMS_COM_CFMCON'))) {
                    doProcess = true;
                    sheetObj.DoSave("EdiCnfgGS.clt", FormQueryString(formObj), "ibflag", false);
                }
                break;

            case "ROWADD":
                var intRows = sheetObj.LastRow() + 1;
                sheetObj.DataInsert(intRows);
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


/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj, f_cmd){
	
	var dupRow = -1;
	dupRow = sheetObj.ColValueDup('scac|tp');
	
	if(dupRow > -1){
		alert(getLabel('SYS_COM_ALT009'));
		return false;
	}
	
	/*
	var sRow = sheetObj.FindStatusRow('I');
	var arrow = sRow.split(';');
	
	if(arrow != "" && arrow.length > 0){
		for(var i =0; i < arrow.length; i++){
			var v_scac = sheetObj.GetCellValue(arrow[0], 'scac');
			var v_tp = sheetObj.GetCellValue(arrow[0], 'tp');
			alert(v_scac + " / " + v_tp );
			
			for(var j=sheetObj.HeaderRows(); j <= sheetObj.LastRow(); j++) {
				if(i != j){
					if(v_scac == sheetObj.GetCellValue(j, 'scac')
						&&	v_tp == sheetObj.GetCellValue(j, 'tp')
				    ){
						
						//console.log("sheetObject1  = "+j  + sheetObj.GetCellValue(j, 'scac') + "  /  " + sheetObj.GetCellValue(j, 'tp'));
					}
				}
			}
		}
		
	}
	*/
	
	
	return true;
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
    for (var i = 0; i < docObjects.length; i++) {
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i], i + 1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	//#576 [Master Menu] Don't Auto searching data when opening UI
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

                SetConfig({SearchMode: 2, MergeSheet: 5, Page: 20, DataRowMerge: 0, FrozenCol:5});

                var info = {Sort: 1, ColMove: 1, HeaderCheck: 1, ColResize: 1};
                var headers = [{Text: getLabel('EDI_CNFG_HDR1'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [{Type: "DelCheck",	Hidden: 0,	Width: 60,  Align: "Center", ColMerge: 0, SaveName: "curSelec"   },
                            {Type: "Status",	Hidden: 1,	Width: 0,   Align: "Center", ColMerge: 0, SaveName: "ibflag"},
                            {Type: "Seq",	    Hidden: 0,	Width: 0,   Align: "Center", ColMerge: 0, SaveName: "Seq"},
                            {Type: "Text",		Hidden: 0,	Width: 70,  Align: "Center", ColMerge: 0, SaveName: "scac", 		 KeyField: 1, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 4 },
                            {Type: "Combo",		Hidden: 0,	Width: 70,  Align: "Center", ColMerge: 0, SaveName: "tp", 			 KeyField: 1, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 3},
                            {Type: "Text",		Hidden: 0,	Width: 150, Align: "Left",	 ColMerge: 0, SaveName: "url", 			 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 60,  Align: "Center", ColMerge: 0, SaveName: "port", 		 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 5},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "id", 			 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "pwd", 			 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 200, Align: "Left",	 ColMerge: 0, SaveName: "snd_dir",  	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 200, Align: "Left",	 ColMerge: 0, SaveName: "rcv_dir",  	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 200, Align: "Left",	 ColMerge: 0, SaveName: "snd_file_repo", KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 200, Align: "Left",	 ColMerge: 0, SaveName: "rcv_file_repo", KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 200, Align: "Left",	 ColMerge: 0, SaveName: "desc", 	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "smt_cust_id",   KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "sndr_id", 	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 100},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "rcvr_id", 		 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 100},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "rcvr_pwd",      KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 100},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "ver", 			 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 10},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "is_passive", 	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 1},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "sndr_pwd", 	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 100},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "rpt_id", 	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 100},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "rpt_pwd", 	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1}
                            
                            ,{Type: "Combo",	Hidden: 0,	Width: 170, Align: "Center", ColMerge: 0, SaveName: "agt_edi_msg_tp_cd",KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 1, InsertEdit: 1, EditLen: 3}
                            ];
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(600);
                SetColProperty("scac", {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
                SetColProperty('tp', {ComboText:'|'+TPCD2, ComboCode:'|'+TPCD1} );
                SetColProperty("port", {AcceptKeys:"N"});
                SetColProperty('agt_edi_msg_tp_cd', {ComboText:'|Agent EDI|BL EDI', ComboCode:'|AGT|BIL'} );
                
            }
            break;
    }
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
		doWork('SEARCHLIST');
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
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="mnu_img_index"){
		doWork('ROWADD');
		sheetObj.SelectCell(row		+1, 2);
	}
}