function doWork(srcName){

	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}

	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.frm1;

	try {

		switch(srcName) {

			case "SEARCHLIST":
				formObj.f_cmd.value=SEARCHLIST;
				var tmpVal=formObj.f_cd_select.value.split(';');
				if(tmpVal.length > 1) {
					formObj.f_com_cd.value=tmpVal[0];
					formObj.cd_maxlen.value=tmpVal[1];
				} else {
					formObj.cd_maxlen.value='';
					formObj.f_com_cd.value='';
				}
				if(validateForm(sheetObj, formObj, SEARCHLIST, 1)) {
					sheetObj.DoSearch("SubCodeMngGS.clt", FormQueryString(formObj));
				}
				break;

			case "ADD":
				formObj.f_cmd.value=ADD;
				if(inpuValCheck(sheetObj, ADD)){
					//Do you want to proceed?
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
						doProcess=true;
						sheetObj.DoSave("SubCodeMngGS.clt", FormQueryString(formObj),"ibflag",false);
					}
				}
				break;

			case "MODIFY":
				formObj.f_cmd.value=MODIFY;
				if(inpuValCheck(sheetObj, MODIFY)){
					if(confirm(getLabel('FMS_COM_CFMMOD'))){
						doProcess=true;
						sheetObj.DoSave("SubCodeMngGS.clt", FormQueryString(formObj),"ibflag",false);
					}
				}
				break;

			case "EXCEL":
				if(sheetObj.RowCount() < 1){//no data
					ComShowCodeMessage("COM132501");
				}else{
					sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
				}
				break;

			case "ROWADD":
				if(frm1.f_cd_select.value==''){
					//Please select [Master Code]!
					alert(getLabel('FMS_COM_ALT004'));
				}else{
					var intRows = sheetObj.LastRow() + 1;
					sheetObj.DataInsert(intRows);
				}
				break;
		} // end switch
	} catch(e) {
		if(e == "[object Error]"){
			//Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			//System Error! + MSG
			alert(getLabel('FMS_COM_ERR001'));
		}
	}
}

/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj, f_cmd){
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var checkVal=false;
	var loopNum=0;
	for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
		if(stat!='R'){
			if(stat=='I'){
				if(!chkReqField(sheetObj, i)){
					isOk=false;
					break;
				}
				checkVal=true;
				for(var ck=1; ck< rowCnt;ck++){
					if(ck!=i){
						if(sheetObj.GetCellValue(ck, 'cd_val')==sheetObj.GetCellValue(i, 'cd_val')){
							//The code is already used!\nPlease check the code!
							alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_CODE'));
							isOk=false;
							break;
						}
					}
				}
				loopNum++;
			} else if(stat=='U') {
				if(!chkReqField(sheetObj, i)) {
					isOk=false;
					break;
				}
				checkVal=true;
				loopNum++;
			}
		}
		if(!isOk){
			break;
		}
	}

	/*
	if(loopNum==0){
		if(f_cmd==ADD){
			//There is nothing to register!
		}else if(f_cmd==MODIFY){
			//There is no change to UPDATE!
		}
		isOk=false;
	}
	*/
	return isOk;
}

function chkReqField(sheetObj, i){
	var isOk=true;
	//#471 [ZEN] TRADE PARTNER GROUP CODE LENGTH ALLOWANCE - ALLOW TO 10 DIGIT
	if(checkInputVal(sheetObj.GetCellValue(i, 'cd_val'), 1, 20, "T", getLabel('ITM_CD'))!='O'){
		isOk=false;
	}else if(checkInputVal(sheetObj.GetCellValue(i, 'cd_nm'), 2, 100, "T", getLabel('ITM_CDNM'))!='O'){
		isOk=false;
	}else if(checkInputVal(sheetObj.GetCellValue(i, 'srt_seq'), 1, 3, "N", getLabel('ITM_CDORD'))!='O'){
		isOk=false;
	}else if(checkInputVal(sheetObj.GetCellValue(i, 'rmk'),   1, 400, "T", getLabel('ITM_RMK'))!='O'){
		isOk=false;
	}
	return isOk;
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
				var headers = [ { Text:getLabel('SUBCD_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
				             {Type:"DelCheck",  Hidden:1, Width:62,   Align:"Center",  ColMerge:1,   SaveName:"resetChk" },
				             //#471 [ZEN] TRADE PARTNER GROUP CODE LENGTH ALLOWANCE - ALLOW TO 10 DIGIT
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cd_val",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
				             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"cd_nm",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
				             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"srt_seq",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
				             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"use_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"rmk",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
				InitColumns(cols);

				SetEditable(1);

				SetColProperty(5, {ComboText:"Enable|Disable", ComboCode:"Y|N"} );
				SetSheetHeight(500);
				SetColProperty(0 ,"cd_val", {AcceptKeys:"E|N|" , InputCaseSensitive:1});
				SetColProperty(0 ,"srt_seq" , {AcceptKeys:"N"});
				resizeSheet();
				//conversion of function[check again]CLT                 InitDataValid(0, 2, vtEngUpOther, "1234567890");
				//conversion of function[check again]CLT                 InitDataValid(0, 4, vtNumericOnly);
			}
			break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined  || errMsg == null ){
		////alert(getLabel('FMS_COM_NTYCOM'));
		///* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}

//#471 [ZEN] TRADE PARTNER GROUP CODE LENGTH ALLOWANCE - ALLOW TO 10 DIGIT
function sheet1_OnChange(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);

	if(colStr == "cd_val"){
		var valLength = sheetObj.GetCellValue(row, "cd_val").length;
		var codeLength = formObj.cd_maxlen.value;

		if(Number(valLength) > Number(codeLength)){
			sheetObj.SetCellValue(row, "cd_val",sheetObj.GetCellValue(row, "cd_val").substring(0, codeLength));
		}
	}
}

//#616 [Sub Code] Do not insert a new row when press tab key.
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="rmk"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}