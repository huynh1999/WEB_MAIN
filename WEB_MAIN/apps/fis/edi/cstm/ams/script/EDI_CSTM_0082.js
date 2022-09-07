function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	switch(srcName){
        case "ADD":
        	if(checkVal()){
    			//'BL 정보를 입력하세겠습니까?'
        		if(confirm(getLabel('FMS_COM_CFMSAV'))){
    				showProcess('WORKING', document);
    				
    				if(frm1.f_cntr_list_seq.value!=''&&docObjects[1].CellValue(1,'shp_cmdt_nm')!=''){
        				frm1.f_cmd.value = COMMAND01;
    					docObjects[1].DoAllSave("EDI_CSTM_0082_1GS.clt", FormQueryString(frm1), true);

    				}else{
        				frm1.f_cmd.value = COMMAND02;
    					docObjects[0].DoSearch4Post("EDI_CSTM_0082GS.clt", FormQueryString(frm1), false);		
    				}
    			}
    		}
       	break;
       	
		case "SEARCHLIST":
			frm1.f_cmd.value = SEARCHLIST;
			docObjects[0].DoSearch4Post("EDI_CSTM_0082GS.clt", FormQueryString(frm1));
		break;
		case "SEARCH":
			frm1.f_cmd.value = SEARCH;
			docObjects[1].DoSearch4Post("EDI_CSTM_0082_1GS.clt", FormQueryString(frm1));
		break;
		case "ROWADD":
			var intRows = docObjects[1].LastRow() + 1;
			docObjects[1].DataInsert(intRows);
		break;
	}
}

function goTabSelect(isNumSep) {
    var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
        document.all.Tab01.className = "tab_head2";
        document.all.Tab02.className = "tab_head_non2";
        document.all.Tab03.className = "tab_head_non2";

        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
      
    } else if( isNumSep == "02" ) {
        document.all.Tab01.className = "tab_head_non2";
        document.all.Tab02.className = "tab_head2";
        document.all.Tab03.className = "tab_head_non2";
        
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
        tabObjs[2].style.display = 'none';
        
    } else if( isNumSep == "03" ) {
        document.all.Tab01.className = "tab_head_non2";
        document.all.Tab02.className = "tab_head_non2";
        document.all.Tab03.className = "tab_head2";
        
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
    }
}


function checkVal(){
	var isOk = true;
		
	if(checkInputVal(frm1.snp_cd.value, 0, 4, "T", 'SNP 코드')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.prnr_cd.value, 0, 4, "T", '파트너 코드')!='O'){
		isOk = false;


	}else if(checkInputVal(frm1.lst_pol_ams_cd.value, 0, 5, "T", '미주기항전 최종항 코드')!='O'){
		isOk = false;

	}else if(checkInputVal(frm1.dest_cd.value, 0, 5, "T", '최종 목적지 코드')!='O'){
		isOk = false;

	}else if(checkInputVal(frm1.hub_loc_cd.value, 0, 5, "T", 'Hub Location 코드')!='O'){
		isOk = false;

	}else if(checkInputVal(frm1.hub_loc_cd.value, 0, 5, "T", '미국내 최종항 코드')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.por_full_nm.value, 0, 25, "T", '최종 화물수취항명')!='O'){
		isOk = false;
	}
	
	/*
	if(isOk){
		if(frm1.it_tp_cd.value!=''){
			if(checkInputVal(frm1.it_no.value, 1, 11, "T", 'IT No')!='O'){
				isOk = false;
			}
		}else{
			if(checkInputVal(frm1.it_no.value, 0, 11, "T", 'IT No')!='O'){
				isOk = false;
			}
		}
	}
	*/
	if(isOk){	
		if(checkInputVal(frm1.shp_co_nm.value, 1, 35, "T", '송하인 상호/이름')!='O'){
			isOk = false;
			
		}else if(checkInputVal(frm1.shp_plc.value, 0, 105, "T", '송하인 주소')!='O'){
			isOk = false;
	
		}else if(checkInputVal(frm1.cnee_co_nm.value, 1, 35, "T", '수하인의 상호/이름')!='O'){
			isOk = false;
			
		}else if(checkInputVal(frm1.cnee_plc.value, 0, 105, "T", '수하인 주소')!='O'){
			isOk = false;
			
		}else if(checkInputVal(frm1.noti_co_nm.value, 0, 35, "T", '통지의 상호/이름')!='O'){
			isOk = false;
			
		}else if(checkInputVal(frm1.noti_plc.value, 0, 105, "T", '통지인 주소')!='O'){
			isOk = false;
			
		}
		
		
	}
	return isOk;
}

//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

var headerRowCnt = 2;

/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj  = document.frm1;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
}


/**
* IBSheet Object를 배열로 등록
* 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
* 배열은 소스 상단에 정의
*/
function setDocumentObject(sheet_obj){
docObjects[sheetCnt++] = sheet_obj;
}


/**
* 시트 초기설정값, 헤더 정의
* param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
* 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //House B/L Information
			with (sheetObj) {
				// 높이 설정
				style.height = 200;
				
				//전체 너비 설정
				SheetWidth = 400;
				// SheetWidth = 400;
				
				//Host정보 설정[필수][HostIp, Port, PagePath]
				if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
				
				//전체Merge 종류 [선택, Default msNone]
				MergeSheet = msHeaderOnly;
				
				//전체Edit 허용 여부 [선택, Default false]
				Editable = false;
				
				//행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
				InitRowInfo(1, 1, 9, 100);
				
				//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
				InitColumnInfo(3, 0, 0, true);
				
				// 해더에서 처리할 수 있는 각종 기능을 설정한다
				InitHeadMode(true, true, true, true, false,false) ;
				
				//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
				InitHeadRow(0, getLabel('EDI_CSTM_0082_HDR1'), true);
	
				//데이터속성    [ROW,  COL, DATATYPE,    WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtData,        100,   daLeft,    true,    "cntr_no",      false,   "",       dfNone,         1);
				InitDataProperty(0, 1,  dtData,         60,   daRight,   true,    "cmdt_cnt",     false,   "",       dfNone,         1);
				InitDataProperty(0, 2,  dtHidden,        0,   daLeft,    true,    "cntr_seq",     false,   "",       dfNone,         1);
			}
		break;
		case 2:      //House B/L Information
			with (sheetObj) {
				// 높이 설정
				style.height = 200;
				
				//전체 너비 설정
				SheetWidth = mainTable.clientWidth;
				// SheetWidth = 400;
				
				//Host정보 설정[필수][HostIp, Port, PagePath]
				if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
				
				//전체Merge 종류 [선택, Default msNone]
				MergeSheet = msHeaderOnly;
				
				//전체Edit 허용 여부 [선택, Default false]
				Editable = true;
				
				//행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
				InitRowInfo(1, 1, 9, 100);
				
				//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
				InitColumnInfo(12, 0, 0, true);
				
				// 해더에서 처리할 수 있는 각종 기능을 설정한다
				InitHeadMode(true, true, true, true, false,false) ;
				
				//해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
				InitHeadRow(0, getLabel('EDI_CSTM_0082_HDR2'), true);
				
				//데이터속성    [ROW,  COL, DATATYPE,    WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtDelCheck,    40,   daCenter,  true,     "pck_ut_cd");
				InitDataProperty(0, 1,  dtHidden,       0,   daLeft,    true,     "cntr_no",     false,   "",       dfNone,         1,     false,      false);
				
				InitDataProperty(0, 2,  dtHidden,       90,   daLeft,    true,    "shp_cmdt_cd", false,   "",       dfNone,         1,     true,       true,         100);
				InitDataProperty(0, 3,  dtData,        110,   daLeft,    true,    "shp_cmdt_nm", false,   "",       dfNone,         1,     true,       true,         100);
				InitDataProperty(0, 4,  dtData,         80,   daLeft,    true,    "hts_cd",      false,   "",       dfNone,         1,     true,       true,         11);

				InitDataProperty(0, 5,  dtData,         70,   daRight,   true,    "pck_qty",     false,   "",       dfNone,         1,     true,       true,         11);
				InitDataProperty(0, 6,  dtCombo,       100,   daLeft,   true,     "dg_gds_cd_tp", false,   "",     dfNone,         1,     true,       true);
				InitDataProperty(0, 7,  dtData,         70,   daLeft,   true,     "dg_gds_cd",    false,   "",     dfNone,         1,     true,       true,         4);
				
				InitDataProperty(0, 8,  dtHidden,        0,   daRight,   true,    "pck_ut_cd");
				InitDataProperty(0, 9,  dtHidden,        0,   daRight,   true,    "shp_cmdt_seq");
				InitDataProperty(0,10,  dtHiddenStatus,  0,   daCenter,  true,    "ibflag")
				InitDataProperty(0,11,  dtHidden,        0,   daCenter,  true,    "cntr_list_seq")
				
				
				InitDataCombo (0, 6, " |위험물(IMDG)|위험물(UN)", " |I|U");
			}
		break;
	}
}

function sheet1_OnClick(sheetObj, row, col){
	frm1.f_cntr_list_seq.value = sheetObj.CellValue(row, 'cntr_seq');
	doWork('SEARCH');
}


function sheet1_OnSearchEnd(sheetObj, row, col){
	hideProcess('WORKING', document);
}

function sheet2_OnKeyDown(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	if(colStr=='dg_gds_cd'){
		if(sheetObj.CellValue(row, 'dg_gds_cd_tp')==''){
			//alert('위험물 구분을 먼저 선택하십시오!');
			alert(getLabel('FMS_COM_ALT004') + "\n\n: EDI_CSTM_0081.265");
			sheetObj.CellValue(row, 'dg_gds_cd') = '';
			
			sheetObj.SelectCell(row, 'dg_gds_cd_tp');
			return;
		}
	}
}

function sheet2_OnChange(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	if(colStr=='dg_gds_cd_tp'){
		sheetObj.CellValue(row, 'dg_gds_cd') = '';
		
	}else if(colStr=='dg_gds_cd'){

	}
}

function sheet2_OnSaveEnd(sheetObj, row, col){
	hideProcess('WORKING', document);
	doWork('SEARCHLIST');
}