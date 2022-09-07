var show_complete = "N";
//Calendar flag value
var firCalFlag=false;

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
            	sheetObj.RemoveAll();
                formObj.f_cmd.value = SEARCHLIST;
                //검증로직
                if (validateForm(sheetObj, formObj, SEARCHLIST, 1)) {
                    sheetObj.DoSearch("ACC_JOR_0630GS.clt", FormQueryString(formObj));
                }
                break;
                
    		case "EXCEL":
    			if(sheetObj.RowCount() < 1){//no data	
    	   			ComShowCodeMessage("COM132501");
    	   		}else{
    	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    	   		}
    			break;
    		case "CLEAR":
    			fn_clearAll()
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

function fn_clearAll(){
	docObjects[0].RemoveAll();
	var formObj = document.form;
	formObj.f_detp_cd.value = "SO";
	formObj.f_date_type.value = "POST";
	formObj.f_strdt.value = getDateStr(false, 31);
	formObj.f_enddt.value = getDateStr(true, 7);	
	formObj.f_bl_type.value = '';	
	formObj.f_sales_cd.value = '';	
	formObj.f_ofc_cd.value = v_ofc_cd;	
	formObj.f_gap.value = '';	
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
		case 'DATE11': // 달력 조회 From ~ To 팝업 호출
			cal=new ComCalendarFromTo();
			cal.displayType = "date";
			cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
			break;
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
	var formObj=document.form;
	formObj.f_strdt.value = getDateStr(false, 31);
	formObj.f_enddt.value = getDateStr(true, 7);
	
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
                var headers = [{Text: getLabel('ACC_JOR_0630_HDR1'), Align: "Center"}];
                InitHeaders(headers, info);

                var cols = [
                            {Type: "Status",	Hidden: 1,	Width: 50,  Align: "Center", ColMerge: 0, SaveName: "ibflag"},
                            {Type: "Seq",	    Hidden: 1,	Width: 50,  Align: "Center", ColMerge: 0, SaveName: "Seq"},
                            {Type: "Text",		Hidden: 0,	Width: 150, Align: "Center", ColMerge: 0, SaveName: "detp_nm", 	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 4 },
                            {Type: "Text",		Hidden: 0,	Width: 70,  Align: "Center", ColMerge: 0, SaveName: "ref_ofc_cd", 	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 3},
                            {Type: "Text",		Hidden: 0,	Width: 80,  Align: "Center", ColMerge: 0, SaveName: "rgst_usrid", 	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "ref_no", 		 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 5},
                            {Type: "Text",		Hidden: 0,	Width: 150, Align: "Left",	 ColMerge: 0, SaveName: "mbl_no", 		 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 150, Align: "Left",	 ColMerge: 0, SaveName: "hbl_no", 		 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "hbl_tp_nm",  	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 70,  Align: "Center", ColMerge: 0, SaveName: "nomi_flg_nm",   KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 200},
                            {Type: "Date",		Hidden: 0,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "etd", 			 KeyField: 0, CalcLogic: "", Format: "Ymd", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 200},
                            {Type: "Date",		Hidden: 0,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "eta", 			 KeyField: 0, CalcLogic: "", Format: "Ymd", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 200},
                            {Type: "Date",		Hidden: 0,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "post_dt", 	     KeyField: 0, CalcLogic: "", Format: "Ymd", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 200},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "inv_no",   	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "inv_aply_curr_cd",   KeyField: 0, CalcLogic: "", Format: "Float", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Float",		Hidden: 0,	Width: 100, Align: "Right",	 ColMerge: 0, SaveName: "inv_amt",   	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 2, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Date",		Hidden: 1,	Width: 100, Align: "Center", ColMerge: 0, SaveName: "inv_dt",   	 KeyField: 0, CalcLogic: "", Format: "Ymd", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Date",		Hidden: 0,	Width: 110, Align: "Center", ColMerge: 0, SaveName: "inv_rgst_tms",	 KeyField: 0, CalcLogic: "", Format: "YmdHm", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 0,	Width: 50,  Align: "Right",	 ColMerge: 0, SaveName: "gap",   	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "modi_tms",   	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "ml_intg_bl_seq",KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "hl_intg_bl_seq",KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "air_sea_clss_cd",   KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "bnd_clss_cd",   KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "hbl_tp_cd",     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "nomi_flg",   	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "inv_seq",   	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 1, EditLen: 20},
                            {Type: "Text",      Hidden:1,   Width:80,   Align:"Center",  ColMerge:0,  SaveName:"Indexing",       KeyField:0,   CalcLogic:"", Format:"",  PointCount:0,  UpdateEdit: 0, InsertEdit:0 },
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "tot_cnt",   	 KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 0, EditLen: 20},
                            {Type: "Text",		Hidden: 1,	Width: 100, Align: "Left",	 ColMerge: 0, SaveName: "rnum",   	     KeyField: 0, CalcLogic: "", Format: "", PointCount: 0, UpdateEdit: 0, InsertEdit: 0, EditLen: 20}

                            ];
                InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(600);
                
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
	
	for(var i= sheetObj.HeaderRows(); i<= sheetObj.LastRow();i++){
		
		if(sheetObj.GetCellValue(i, "mbl_no") != ""){
			sheetObj.SetCellFontColor(i,'mbl_no',"#0000FF");
		}
		if(sheetObj.GetCellValue(i, "hbl_no") != ""){
			sheetObj.SetCellFontColor(i,'hbl_no',"#0000FF");
		}
		if(sheetObj.GetCellValue(i, "ref_no") != ""){
			sheetObj.SetCellFontColor(i,'ref_no',"#0000FF");
		}
		if(sheetObj.GetCellValue(i, "inv_no") != ""){
			sheetObj.SetCellFontColor(i,'inv_no',"#0000FF");
		}
	}
	
	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}


function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.form;
	
	switch (sheetObj.ColSaveName(Col)) {
	
		case "ref_no" :
			if(sheetObj.GetCellValue(Row, "ref_no") == ''){
			 	return;
			}			
			var v_intg_bl_seq = sheetObj.GetCellValue(Row, "ml_intg_bl_seq");
			var v_air_sea_clss_cd = sheetObj.GetCellValue(Row, "air_sea_clss_cd");
			var v_bnd_clss_cd = sheetObj.GetCellValue(Row, "bnd_clss_cd");
			
			if(v_intg_bl_seq == ""){
				alert(getLabel('FMS_COM_ALT010'));
				return;
			}
			
			var paramStr="";
			var titleStr="Master B/L Entry";			
			if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
				paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;				
			}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
				paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
				titleStr="Master AWB Entry";
				paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"));
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
				titleStr="Master AWB Entry";
				paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"));
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;
		
		case "mbl_no" :
			if(sheetObj.GetCellValue(Row, "mbl_no") == ''){
			 	return;
			}
			
			var paramStr = "";
			var titleStr = "";
			var v_intg_bl_seq = sheetObj.GetCellValue(Row, "ml_intg_bl_seq");
			var v_air_sea_clss_cd = sheetObj.GetCellValue(Row, "air_sea_clss_cd");
			var v_bnd_clss_cd = sheetObj.GetCellValue(Row, "bnd_clss_cd");
			
			if(v_intg_bl_seq == ""){
				alert(getLabel('FMS_COM_ALT010'));
				return;
			}
			
			titleStr="Master B/L Entry";			
			if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
				paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;				
			}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
				paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
				titleStr="Master AWB Entry";
				paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"));
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
				titleStr="Master AWB Entry";
				paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_ref_no="+escape(sheetObj.GetCellValue(Row, "ref_no"));
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;	
		
		case "hbl_no" :
			if(sheetObj.GetCellValue(Row, "hbl_no") == ''){
			 	return;
			}
			var paramStr = "";
			var titleStr = "";
			
			var v_intg_bl_seq = sheetObj.GetCellValue(Row, "hl_intg_bl_seq");
			var v_air_sea_clss_cd = sheetObj.GetCellValue(Row, "air_sea_clss_cd");
			var v_bnd_clss_cd = sheetObj.GetCellValue(Row, "bnd_clss_cd");
			
			if(v_intg_bl_seq == ""){
				alert(getLabel('FMS_COM_ALT010'));
				return;
			}
			
			titleStr="Booking & HB/L Entry";
			if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="O"){	//Ocean Export
				paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(sheetObj.GetCellValue(Row, "hbl_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
			}else if(v_air_sea_clss_cd == "S" && v_bnd_clss_cd =="I"){	//Ocean Import
				paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(sheetObj.GetCellValue(Row, "hbl_no"))+"&f_intg_bl_seq="+v_intg_bl_seq;
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="O"){	//Air Export
				titleStr="Booking & House AWB Entry";
				paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+escape(sheetObj.GetCellValue(Row, "hbl_no"));
			}else if(v_air_sea_clss_cd == "A" && v_bnd_clss_cd =="I"){	//Air Import
				titleStr="Booking & House AWB Entry";
				paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+escape(sheetObj.GetCellValue(Row, "hbl_no"));
			}
			parent.mkNewFrame(titleStr, paramStr);
		break;	
		
		
		case "inv_no" :
		    //"A/R"
			//alert(sheetObj.GetCellValue(Row, "inv_seq") + '  /  ' + sheetObj.GetCellValue(Row, "inv_no"));
			if(sheetObj.GetCellValue(Row, "inv_seq") == ''){
			 	return;
			}
	    	var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_inv_seq="+sheetObj.GetCellValue(Row, "inv_seq")+"&s_inv_no="+escape(sheetObj.GetCellValue(Row, "inv_no"));
	        parent.mkNewFrame('A/R Entry', paramStr, "ACC_INV_0010_SHEET_" + sheetObj.GetCellValue(Row, "inv_seq")+"_"+sheetObj.GetCellValue(Row, "inv_no"));
		break;
	}
}


/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList() {
	document.form.f_CurPage.value = 1;	
	doWork('SEARCHLIST');
}


function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="mnu_img_index"){
		doWork('ROWADD');
		sheetObj.SelectCell(row		+1, 2);
	}
}