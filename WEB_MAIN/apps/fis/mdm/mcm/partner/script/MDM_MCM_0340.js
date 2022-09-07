function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            sheetObj.DoSearch("MDM_MCM_0340GS.clt", FormQueryString(formObj) );
		break;
		case "MODIFY":
			var modiMsg="Do you want to save?";//좌측 목록에서 선택후 수정한 경우  
			if(saveValid(sheetObj)){
				if ( confirm(modiMsg) ) {
					formObj.f_cmd.value=MODIFY;
					sheetObj.DoSave("MDM_MCM_0340GS.clt", FormQueryString(formObj),"ibflag",false);
		        }
			}
		break;
		case "ROWADD":
			var row=sheetObj.LastRow() + 1;
			iRow=sheetObj.DataInsert(row);
			sheetObj.SetCellValue(iRow, "use_flg","1",0);
		break;
    }
}
function sheet1_OnChange(sheetObj, Row, Col){
	var colNm=sheetObj.ColSaveName(Col);
	switch(colNm){
		case "oth_tp" :
			var rows=sheetObj.RowCount();
			var othTp=sheetObj.GetCellValue(Row, "oth_tp");
			for(var i=1 ; i < rows ; i++){
				if(i != Row && sheetObj.GetCellValue(i, "oth_tp") == othTp){
					//[Type] is don't duplicate!
					alert(getLabel('FMS_COM_ALT008')+ " - " + getLabel('FMS_COD_TYPE'));
					sheetObj.SetCellValue(Row, "oth_tp","",0);
					return;
				}
			}
			break;
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){	
	//Save success!
	if(errMsg==undefined || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
function saveValid(sheetObj){
	var rows=sheetObj.LastRow();
	var cnt=0;
	for(var i=1 ; i < rows + 1; i++){
		if("R" != sheetObj.GetCellValue(i, "ibflag")){
			if(sheetObj.GetCellValue(i, "oth_tp") == ""){
				//[Type] is mandatory field!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_TYPE'));
				return false;
			}else if(sheetObj.GetCellValue(i, "oth_no") == ""){
				//No. is Empty!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_NUM_'));
				return false;
			}
			cnt++;
		}
	}
	if(cnt == 0){
		//No data to save
		alert(getLabel('FMS_COM_ALT028'));
		return false;
	}else{
		return true;
	}
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
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0340_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"oth_tp",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",      Hidden:0,  Width:600,  Align:"Left",    ColMerge:1,   SaveName:"rmk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"oth_prfx",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"oth_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                    {Type:"CheckBox",  Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y" ,FalseValue:"N" } ];
              
             InitColumns(cols);
    		 SetColProperty(0, "oth_tp", {AcceptKeys:"E|N", InputCaseSensitive:1});
    		 SetColProperty(0, "oth_prfx", {AcceptKeys:"E|N", InputCaseSensitive:1});
    		 SetColProperty(0, "oth_no", {AcceptKeys:"N", InputCaseSensitive:1, DefaultValue:"100000"});
             SetEditable(1);
             SetSheetHeight(500);
             resizeSheet();
         }                                                      
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 0);
	}
}
