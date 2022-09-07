function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
        switch(srcName) {
           case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 0)){
                	sheetObj.DoSearch("MGT_JOB_0050GS.clt", FormQueryString(formObj) );
                }
           break;
           case "MODIFY":
        	   if ( !fncGridCheck() ) return false;
        	   if (confirm(getLabel('FMS_COM_CFMSAV'))){
                formObj.f_cmd.value=MODIFY;
                doProcess=true;
                sheetObj.DoSave("MGT_JOB_0050GS.clt", FormQueryString(formObj),"ibflag",false);
        	   }

           break;
           case "ROWADD":
  				var intRows = sheetObj.LastRow() + 1;
   				sheetObj.DataInsert(intRows);
   				sheetObj.SetCellValue(intRows, "use_flg","1");
           break;
        } // end switch
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
function initSheet(sheetObj,sheetNo) {

    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('MGT_JOB_0050_HDR'), Align:"Center"} ];
        	       InitHeaders(headers, info);
        	       var cols = [ 
						  {Type:"DelCheck", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
						  {Type:"Status",   Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
						  {Type:"Text",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",        KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Combo",    Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"lgs_clss_cd",KeyField:1,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:2 },
        	              {Type:"Text",     Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bse_tm_cd",  KeyField:1,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
        	              {Type:"Text",     Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"bse_tm_nm",  KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	              {Type:"Text",     Hidden:0, Width:250,  Align:"Center",  ColMerge:0,   SaveName:"act_desc",  	KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:500 },
        	              {Type:"Float",    Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"srt_seq",   	KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
        	              {Type:"Combo",    Hidden:0, Width:300,  Align:"Left",    ColMerge:0,   SaveName:"evnt_itm_cd",KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",    Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"dflt_pln_itval_hrs",      KeyField:0,   CalcLogic:"",   Format:"Integer",  PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",    Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"dflt_act_itval_hrs",      KeyField:0,   CalcLogic:"",   Format:"Integer",  PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"CheckBox", Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 }
        	            ];

        	       InitColumns(cols);

        	       SetEditable(1);
                   SetColProperty(0 ,"bse_tm_cd" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
                   SetColProperty(0 ,"bse_tm_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});

        	       //sheetObj.SetColProperty("lgs_clss_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );        	    		   
        	       //sheetObj.SetColProperty("evnt_itm_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
        	       sheetObj.SetColProperty("lgs_clss_cd", {ComboText:"|Ocean Export|Ocean Import|Air Export|Air Import", ComboCode:"|SO|SI|AO|AI"} );

        	       SetColProperty(0 ,"srt_seq",     {AcceptKeys:"N"});
        	       SetColProperty(0 ,"dflt_pln_itval_hrs" , {AcceptKeys:"N|[-+]"});
        	       SetColProperty(0 ,"dflt_pln_itval_hrs" , {AcceptKeys:"N|[-+]"});
    			   SetSheetHeight(500);
			       resizeSheet();
           }                                                      
           break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj = document.frm1;
	for(var i=1; i<docObjects[0].RowCount()+1 ; i++ ){
		if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "SO"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
		}else if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "SI"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
		}else if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "AO"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
		}else if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "AI"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM5_1, ComboCode:PARAM5_2} );
		}
	}
} 

 /**
  * IBSheet 이벤트 처리후 이벤트를 받아서 처리하기 위한 메소드임
  */
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
 	if(errMsg=="" ||errMsg==undefined|| errMsg==null ){
		showCompleteProcess();
 	}
	var formObj = document.frm1;
	for(var i=1; i<docObjects[0].RowCount()+1 ; i++ ){
		if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "SO"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
		}else if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "SI"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
		}else if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "AO"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
		}else if(docObjects[0].GetCellValue(i, "lgs_clss_cd") == "AI"){
			docObjects[0].CellComboItem(i, "evnt_itm_cd", {ComboText:PARAM5_1, ComboCode:PARAM5_2} );
		}
	}
 }
function sheet1_OnChange(sheetObj, Row, Col){
	if(sheetObj.ColSaveName(Col) == "lgs_clss_cd"){
		var  itemCD = sheetObj.GetCellValue(Row, Col);
		//alert("itemCD : "+itemCD+ " Row : "+Row+ " Col : "+Col);
		if(itemCD == "SO"){ //OE
			sheetObj.CellComboItem(Row, "evnt_itm_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
		}else if(itemCD == "SI"){ //OI
			sheetObj.CellComboItem(Row, "evnt_itm_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
		}else if(itemCD == "AO"){ //AE
			sheetObj.CellComboItem(Row, "evnt_itm_cd", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
		}else if(itemCD == "AI"){ //AI
			sheetObj.CellComboItem(Row, "evnt_itm_cd", {ComboText:PARAM5_1, ComboCode:PARAM5_2} );
		}
	}
}
//#604 [Master Code] Do not insert a new row when press tab key.
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	//if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="rmk"){
	if(sheetObj.LastRow() == row && keyCode==9 ){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.LastRow() + 1;
	for( var i=1 ; i < intRow ; i++ ) {
        if( trim(sheetObj.GetCellValue(i, "lgs_clss_cd")) == "" || sheetObj.GetCellValue(i, "lgs_clss_cd") == null){
			alert(getLabel('FMS_COM_ALT007') );
			return false;
		}
        if( trim(sheetObj.GetCellValue(i, "bse_tm_cd")) == "" || sheetObj.GetCellValue(i, "bse_tm_cd") == null){
			alert(getLabel('FMS_COM_ALT007') );
			return false;
		}
        if( trim(sheetObj.GetCellValue(i, "bse_tm_nm")) == "" || sheetObj.GetCellValue(i, "bse_tm_nm") == null){
			alert(getLabel('FMS_COM_ALT007') );
			return false;
		}
        if( trim(sheetObj.GetCellValue(i, "act_desc")) == "" || sheetObj.GetCellValue(i, "act_desc") == null){
			alert(getLabel('FMS_COM_ALT007') );
			return false;
		}
	}
	var dupRow=sheetObj.ColValueDup("lgs_clss_cd|bse_tm_cd");
	if(dupRow > 0){
		alert(getLabel('FMS_COM_ALT008'));
		return false;
	}
	return true;
}
