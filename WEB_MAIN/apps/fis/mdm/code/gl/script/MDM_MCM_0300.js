	function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("MDM_MCM_0300GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST01":
      		//sheetObj.ShowDebugMsg = true;
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("MDM_MCM_0321GS.clt", FormQueryString(formObj) );
       break;
      
       case "ROWADD":
    	    var intRows=sheetObj.LastRow() + 1;
 			var newRows=sheetObj.DataInsert(intRows);
 			sheetObj.SetCellValue(newRows, "use_flg",1);
 			sheetObj.SetCellValue(newRows, "gl_pay_flg",1);
 			sheetObj.SetCellValue(newRows, "gl_dept_flg",1);
 			sheetObj.CellComboItem(newRows,"gl_grp_cd", {ComboText:"", ComboCode:""} );
       break;
       case "MODIFY":
    	   if ( !fncGridCheck() ) return ;
           formObj.f_cmd.value=MODIFY;
           
           // Update : Warning message - MDM_COM_CFMSAVEFRT
           var msgFlg = false;
	       var ttlRow=sheetObj.LastRow() + 1;
	       for(var i = 1; i < ttlRow; i++){
	    	   if(sheetObj.GetCellValue(i,"ibflag") == "U" || sheetObj.GetCellValue(i,"ibflag") == "D"){
	    		   msgFlg = true;
	    		   break;
	    	   }
	       }
	       // If Updating/Deleting is true
	       if(msgFlg){
	    	   alert(getLabel('MDM_COM_CFMSAVEFRT'));
	       }
           
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
               doProcess=true;
               sheetObj.DoSave("MDM_MCM_0300GS.clt", FormQueryString(formObj),"ibflag",false);
           }

       break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var checkGlcdRow=0;
var checkGlcdCol=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    doWork('SEARCHLIST');
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
var Row = -1;
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
             with(sheetObj){
                 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
                 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                 var headers = [ { Text:getLabel('MDM_MCM_0300_HDR1'), Align:"Center"} ];
                 InitHeaders(headers, info);
                 var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                     {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                     {Type:"Seq",       Hidden:0,  Width:50,  Align:"Center",  ColMerge:1,   SaveName:"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ggl_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"Text",      Hidden:0,  Width:150, Align:"Left",    ColMerge:1,   SaveName:"ggl_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"Text",      Hidden:0,  Width:100, Align:"Center",  ColMerge:1,   SaveName:"gl_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                     {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                     {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_grp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                     {Type:"Text",      Hidden:0,  Width:250, Align:"Left",    ColMerge:1,   SaveName:"rmk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
                     {Type:"Text",      Hidden:0,  Width:120, Align:"Left",    ColMerge:1,   SaveName:"gl_sub",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:250 },
                     {Type:"Text",      Hidden:0,  Width:120, Align:"Center",  ColMerge:1,   SaveName:"acct_gl_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"block_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" },
                     {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"modi_tms",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
                     {Type:"CheckBox",  Hidden:0, Width:75,   Align:"Center",  ColMerge:1,   SaveName:"gl_dept_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"CheckBox",  Hidden:0, Width:75,   Align:"Center",  ColMerge:1,   SaveName:"gl_pay_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                     {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"gl_pty_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 }
                     ];
                 InitColumns(cols);
                 SetEditable(1);
                 sheetObj.SetColProperty("gl_type", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
                 sheetObj.SetColProperty("gl_grp_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
                 sheetObj.SetColProperty("block_yn", {ComboText:"N|Y", ComboCode:"N|Y"} );
                 sheetObj.SetColProperty("gl_pty_tp_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
                 SetColProperty(0, "ggl_cd", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "gl_cd", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "acct_gl_cd", 			vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "ggl_nm", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "rmk", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetSheetHeight(430);
                 resizeSheet();
             }                           
         break;
         case 2:      //IBSheet1 init
             with(sheetObj){
                 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
                 var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
                 var headers = [ { Text:getLabel('MDM_MCM_0300_HDR2'), Align:"Center"} ];
                 InitHeaders(headers, info);
                 var cols = [ 
					 {Type:"Date",      Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",  PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
					 {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
					 {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"his_type",    KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                     {Type:"Text",      Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"ggl_cd",      KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                     {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ggl_nm",      KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                     {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_cd",       KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                     {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_type",     KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_grp_cd",   KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                     {Type:"Text",      Hidden:0, Width:250,  Align:"Left",    ColMerge:1,   SaveName:"rmk",         KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:200 },
                     {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"gl_sub",      KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:250 },
                     {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"acct_gl_cd",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                     {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",     KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                     {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"block_yn",    KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                     {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_dept_flg", KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                     {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_pay_flg",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                     {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"gl_pty_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 }
                     ];
                 InitColumns(cols);
                 SetEditable(1);
                 sheetObj.SetColProperty("gl_type", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
                 sheetObj.SetColProperty("gl_grp_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
                 sheetObj.SetColProperty("block_yn", {ComboText:"N|Y", ComboCode:"N|Y"} );
                 sheetObj.SetColProperty("gl_pty_tp_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
                 SetColProperty(0, "ggl_cd", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "gl_cd", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "acct_gl_cd", 			vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "ggl_nm", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetColProperty(0, "rmk", 				vtEngUpOther, "1234567890 _~!@#$^&*()_=-`;:<>?/.");
                 SetSheetHeight(200);
                 resizeSheet();
                 sheetObj.SetFocusAfterProcess(0);
             }                           
         break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

var rtnary=new Array(2);
var callBackFunc = "";
function sheet1_OnPopupClick(sheetObj, row, col, vChg) {
	if(sheetObj.ColSaveName(col) == "ggl_cd" || sheetObj.ColSaveName(col) == "ggl_nm"){
		rtnary=new Array(2);
		rtnary[0]=sheetObj.GetCellValue(row, "ggl_cd");
		rtnary[1]=sheetObj.GetCellValue(row, "ggl_nm");
		if (vChg == 'A') {
			sheetObj.SetCellValue(row, "ggl_cd",'',0);
			sheetObj.SetCellValue(row, "ggl_nm",'',0);
		} 
		Row = row;
		callBackFunc = "CMM_POP_0261";
		modal_center_open('./CMM_POP_0261.clt', rtnary, 630,440,"yes");
	}
}

function CMM_POP_0261(rtnVal){
	var sheetObj=docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		row = Row;
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(row, "ggl_cd",rtnValAry[0],0);//ggl_cd
		sheetObj.SetCellValue(row, "gl_type",rtnValAry[1],0);//ggl_type
		var glGrpNmArr=PARAM2_1.split("|");
		var glGrpCdArr=PARAM2_2.split("|");
		var glTp=sheetObj.GetCellValue(row, 'gl_type');
		var newGlNm=" ";
		var newGlCd=" ";
		for(var i=0 ; i < glGrpCdArr.length ; i++){
			if(glGrpCdArr[i].substr(0,2) == glTp){
				newGlCd += "|" + glGrpCdArr[i];
				newGlNm += "|" + glGrpNmArr[i];
			}
		}
		sheetObj.CellComboItem(row,"gl_grp_cd", {ComboText:newGlNm, ComboCode:newGlCd} );
		sheetObj.SetCellValue(row, "gl_grp_cd",rtnValAry[2],0);//ggl_grp_cd
		sheetObj.SetCellValue(row, "ggl_nm",rtnValAry[3],0);//ggl_cd
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<sheetObj.RowCount()+1 ; i++ ){
		if (sheetObj.GetCellValue(i, 'ggl_cd') == '') {
			sheetObj.SetCellEditable(i, "gl_type",1);
			sheetObj.SetCellEditable(i, "gl_grp_cd",1);
		} else {
			sheetObj.SetCellEditable(i, "gl_type",0);
			sheetObj.SetCellEditable(i, "gl_grp_cd",0);
		}
	}
	docObjects[1].RemoveAll();
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	doDispPaging(sheetObj.GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for(var i=1; i<sheetObj.RowCount()+1 ; i++ ){
		if (sheetObj.GetCellValue(i, 'ggl_cd') == '') {
			sheetObj.SetCellEditable(i, "gl_type",1);
			sheetObj.SetCellEditable(i, "gl_grp_cd",1);
		} else {
			sheetObj.SetCellEditable(i, "gl_type",0);
			sheetObj.SetCellEditable(i, "gl_grp_cd",0);
		}
	}
}
//데이터 수정 이벤트
function sheet1_OnChange(sheetObj, Row, Col){
	var colNm=sheetObj.ColSaveName(Col);
	switch(colNm){
		case "gl_cd" :
			checkGlcdRow=Row;
			checkGlcdCol=Col;	
			ajaxSendPost(dispSContiAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkGlCd&gl_cd='+sheetObj.GetCellValue(Row, Col), './GateServlet.gsl');
			break;
		case "gl_type" :
			if(sheetObj.GetCellValue(Row, Col) == ""){
				sheetObj.CellComboItem(Row,"gl_grp_cd", {ComboText:"", ComboCode:""} );
				return;
			}
			var glGrpNmArr=PARAM2_1.split("|");
			var glGrpCdArr=PARAM2_2.split("|");
			var glTp=sheetObj.GetCellValue(Row, Col);
			var newGlNm=" ";
			var newGlCd=" ";
			for(var i=0 ; i < glGrpCdArr.length ; i++){
				if(glGrpCdArr[i].substr(0,2) == glTp){
					newGlCd += "|" + glGrpCdArr[i];
					newGlNm += "|" + glGrpNmArr[i];
				}
			}
			sheetObj.CellComboItem(Row,"gl_grp_cd", {ComboText:newGlNm, ComboCode:newGlCd} );
			break;
		case "ggl_cd" :
			if (sheetObj.GetCellValue(Row, 'ggl_cd') == '') {
				sheetObj.SetCellEditable(Row, "gl_type",1);
				sheetObj.SetCellEditable(Row, "gl_grp_cd",1);
			} else {
				sheetObj.SetCellEditable(Row, "gl_type",0);
				sheetObj.SetCellEditable(Row, "gl_grp_cd",0);
			}
			ajaxSendPost(setRtnGglCd, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchGglCode&s_code='+sheetObj.GetCellValue(Row, 'ggl_cd'), './GateServlet.gsl');
			break;
		case "ggl_nm" :
			sheet1_OnPopupClick(sheetObj, Row, Col, 'A');
			break;
		//#2131 [BINEX V442] NO G/L MAPPING, BUT CAN ISSUE INVOICE USING BILLING CODE
		case "del_flg" :
			ajaxSendPost(checkUseGlCode, 'reqVal', '&goWhere=aj&bcKey=checkUseGlCode&s_gl_cd='+sheetObj.GetCellValue(Row, 'gl_cd')+'&invType=BillingCode', './GateServlet.gsl');
			break;
			//#3271 [CLA] OFFICE CODE DEFAULT ACCOUNT G/L 계정 VALIDATION
		case "use_flg" :
			if (sheetObj.GetCellValue(Row,"use_flg") != 1) {
				ajaxSendPost(checkUseGLOnOfficeCode, 'reqVal', '&goWhere=aj&bcKey=checkUseGLOnOfficeCode&gl_cd='+sheetObj.GetCellValue(Row, 'gl_cd'), './GateServlet.gsl');
			}
			break;
			
	}
}
/**
 * Code Return 값을 Cell에 담는다
 */
function setRtnGglCd(rtnMsg){
	var sheetObj=docObjects[0];
	var curRow=sheetObj.GetSelectRow();
	var curCol=sheetObj.GetSelectCol();
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])=='undefined'){
        	// alert('111');
        	// sheetObj.CellValue2(curRow, autoCurCol) = '';
        	// sheetObj.CellValue2(curRow, autoToCol) = '';
        	// alert(CODE_NOT_FND);
        	// 데이터가 없는경우 팝업.
        	// sheetObj.SelectCell(row, colStr);
        	sheet1_OnPopupClick(sheetObj, curRow, curCol, 'A');
        } else {
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            sheetObj.SetCellValue(curRow, 'ggl_cd',masterVals[0],0);
            sheetObj.SetCellValue(curRow, 'gl_type',masterVals[1],0);
			var glGrpNmArr=PARAM2_1.split("|");
			var glGrpCdArr=PARAM2_2.split("|");
			var glTp=sheetObj.GetCellValue(curRow, 'gl_type');
			var newGlNm=" ";
			var newGlCd=" ";
			for(var i=0 ; i < glGrpCdArr.length ; i++){
				if(glGrpCdArr[i].substr(0,2) == glTp){
					newGlCd += "|" + glGrpCdArr[i];
					newGlNm += "|" + glGrpNmArr[i];
				}
			}
			sheetObj.CellComboItem(curRow,"gl_grp_cd", {ComboText:newGlNm, ComboCode:newGlCd} );
            sheetObj.SetCellValue(curRow, 'gl_grp_cd',masterVals[2],0);
            sheetObj.SetCellValue(curRow, 'ggl_nm',masterVals[3],0);
        }
    }else{
        alert(AJ_FND_ERR);
    }
}
//데이터 수정 이벤트
function sheet1_OnClick(sheetObj, Row, Col){
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "gl_cd"){
		if(sheetObj.GetCellValue(Row, "ibflag") != 'I'){
		    var formObj = document.frm1;
		    formObj.gl_cd_s.value = docObjects[0].GetCellValue(Row, "gl_cd");
		    doWork('SEARCHLIST01');
		}
	}
}

// OnClick 이벤트가 오작동하여 OnSelectCell 이벤트로 변경함.
function sheet1_OnSelectCell(sheetObj, OldRow, OldCol, NewRow, NewCol,isDelete) {
	var Row = NewRow;
	var Col = NewCol;
	
	var colNm=sheetObj.ColSaveName(Col);
	switch(colNm){
	case "gl_grp_cd" :
		if(sheetObj.GetCellValue(Row, "gl_type") == ""){
			return;
		}
		var glGrpNmArr=PARAM2_1.split("|");
		var glGrpCdArr=PARAM2_2.split("|");
		var glGrpTp=sheetObj.GetCellValue(Row, Col);
		var glTp=sheetObj.GetCellValue(Row, "gl_type");
		var newGlNm=" ";
		var newGlCd=" ";
		for(var i=0 ; i < glGrpCdArr.length ; i++){
			if(glGrpCdArr[i].substr(0,2) == glTp){
				newGlCd += "|" + glGrpCdArr[i];
				newGlNm += "|" + glGrpNmArr[i];
			}
		}
		sheetObj.CellComboItem(Row,"gl_grp_cd", {ComboText:newGlNm, ComboCode:newGlCd} );
		sheetObj.SetCellValue(Row, Col,glGrpTp,0);
		break;
	}
}

function fncGridCheck() {
	var sheetObj=docObjects[0];
 	var intRow=sheetObj.LastRow() + 1;
	for(var i=1 ; i < intRow ; i++){
		if(sheetObj.GetCellValue(i, "gl_cd") == "" || sheetObj.GetCellValue(i, "gl_cd") == null){
			//CL Code is mandatory
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_GL'));
			return false;
		}
	}
	return true;
}
function fncSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function dispSContiAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var dupl=doc[1];
			if (dupl == 'Y') {
				alert(getLabel('FMS_COM_ALT013')+ "\n - " + getLabel('FMS_COD_GLNO') + "\n\n: MDM_MCM_0300.188");
				sheetObj.SetCellValue(checkGlcdRow,'gl_cd',"",0);
				sheetObj.SelectCell(checkGlcdRow,checkGlcdCol);
			}
		} else {
			// ERROR
			alert("ajax error");
		}
	}else{
		//Error Errupt!			
		alert("ajax error");
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="gl_pay_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}

//#2131 [BINEX V442] NO G/L MAPPING, BUT CAN ISSUE INVOICE USING BILLING CODE
function checkUseGlCode(rtnMsg){
	
	var doc=getAjaxMsgXML(rtnMsg);
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			var sheetObj=docObjects[0];
			var curRow=sheetObj.GetSelectRow();
			var curCol=sheetObj.GetSelectCol();
			sheetObj.SetCellValue(curRow, curCol, "0", 0);
			alert(getLabel('FMS_COM_ALT102'));
		}
	}
}
//#3271 [CLA] OFFICE CODE DEFAULT ACCOUNT G/L 계정 VALIDATION
function checkUseGLOnOfficeCode(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			var sheetObj=docObjects[0];
			var curRow=sheetObj.GetSelectRow();
			var curCol=sheetObj.GetSelectCol();
			sheetObj.SetCellValue(curRow, curCol, 1, 1);
			alert(getLabel('FMS_COM_ALT161'));
		}
	}
}
