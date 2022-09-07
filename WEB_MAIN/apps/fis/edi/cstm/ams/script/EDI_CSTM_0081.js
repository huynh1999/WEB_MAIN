/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	setFromToDt(frm1.f_obdt_bgn_dt, frm1.f_obdt_end_dt);
}
function doWork(srcName){
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCH":	//세관 코드 조회
			frm1.f_cmd.value=SEARCH;
			setStandard( '', '', '', '', '', '');
			checkCnt=0;
			docObjects[0].DoSearch("EDI_CSTM_0081GS.clt",   FormQueryString(frm1) );
		break;
    }
}
/**
 * 작성된 전문 목록을 조회함
 */
function addEdiCstmInfo(){
	var rtnVal=frm1.s_workday.value;
	rtnVal+= '|';
	rtnVal+= frm1.s_vsl_nm.value;
	rtnVal+= '|';
	rtnVal+= frm1.s_vsl_cd.value;
	rtnVal+= '|';
	rtnVal+= frm1.s_flt_no.value;
	rtnVal+= '|';
	rtnVal+= frm1.s_pol_nm.value;
	rtnVal+= '|';
	rtnVal+= frm1.s_pol_cd.value;
	rtnVal+= '|';
	var colNm='use_check';
	var loopCnt=0;
	for(var i=1; i < docObjects[0].RowCount()+1; i++){
		if(docObjects[0].GetCellValue(i, colNm)=='1'){
			rtnVal+= docObjects[0].GetCellValue(i, 'mbl_bl_seq');
			loopCnt++;
		}
	}
	if(loopCnt>0){
		rtnVal+= '|';
		ComClosePopup(rtnVal);
	}
}

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.select(formObj.f_obdt_bgn_dt, formObj.f_obdt_end_dt, 'MM-dd-yyyy');
        break;
    }
}
//코드표시 Ajax
function dispAjaxReq(reqVal){
	try{
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		//조회해온 결과를 Parent에 표시함
		var rtnArr=doc[1].split(';');
		if(rtnArr=='T'){
			//alert('등록이 완료되었습니다!');
			alert(getLabel('FMS_COM_ALT012') + "\n\n: EDI_CSTM_0081.78");
			doWork('SEARCH');
		}else{
			//alert('이미 사용된 코드입니다. 다른 코드를 등록하십시오!');
			alert(getLabel('FMS_COM_ALT008') + "\n\n: EDI_CSTM_0081.82");
			frm1.f_cd_val.focus();
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0081.85");		
	}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0081.89");
	}
}
function delCdResult(reqVal){
	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			if(rtnArr=='T'){
				//alert('삭제가 완료되었습니다!');
				doWork('SEARCH');
			}else{
				//alert('EDI전문 작성에 사용되었습니다. 삭제가 불가능합니다!');
				alert(getLabel('FMS_COM_ALT011') + "\n\n: EDI_CSTM_0081.107");
			}
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0081.110");		
		}
		}catch(err){
			//alert('Error Msg.:'+err.message);
			alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0081.114");
		}
	}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var headerRowCnt=2;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1;
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
docObjects[sheetCnt++]=sheet_obj;
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
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('EDI_CSTM_0081_HDR1'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Status",    Hidden:1, Width:55,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		               {Type:"Radio",  Hidden:0, Width:55,   Align:"Center",  ColMerge:1,   SaveName:"use_check" },
		               {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"workday",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"vsl_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"vsl_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:40,   Align:"Left",    ColMerge:1,   SaveName:"flt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"pol_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"pol_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"mbl_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        SetEditable(1);
		        SetSheetHeight(240);
			}
		break;
	}
}
var checkCnt=0;
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnChange(sheetObj,Row,Col){
	//선택된 경우
	if(sheetObj.GetCellValue(Row,Col)==1){
		//최초 선택인 경우
		if(checkCnt==0){
			setStandard(sheetObj.GetCellValue(Row, 'workday'), sheetObj.GetCellValue(Row, 'vsl_nm'), sheetObj.GetCellValue(Row, 'vsl_cd'),
			sheetObj.GetCellValue(Row, 'flt_no'),  sheetObj.GetCellValue(Row, 'pol_nm'), sheetObj.GetCellValue(Row, 'pol_cd'));
			checkCnt++;
		}else{
			checkCnt++;
			if(sheetObj.GetCellValue(Row, 'workday')!=frm1.s_workday.value||sheetObj.GetCellValue(Row, 'vsl_cd')!=frm1.s_vsl_cd.value||
					sheetObj.GetCellValue(Row, 'flt_no')!=frm1.s_flt_no.value||sheetObj.GetCellValue(Row, 'pol_cd')!=frm1.s_pol_cd.value)
			{
				//alert('먼저 선택된 [출항일자], [선박명], [항차] 그리고 [선적항]이\r\n동일해야 선택하실 수 있습니다. ');
				alert(getLabel('FMS_COM_ALT007') + "\n\n: EDI_CSTM_0081.78");
				sheetObj.SetCellValue(Row,Col,0);
			}
		}
	//선택이 취소된 경우
	}else{
		checkCnt--;
		if(checkCnt==0){
			setStandard( '', '', '', '', '', '');
		}
	}
}
function setStandard(workDay, vslNm, vslCd, fltNo, polNm, polCd){
	frm1.s_workday.value=workDay;
	frm1.s_vsl_nm.value=vslNm;
	frm1.s_vsl_cd.value=vslCd;
	frm1.s_flt_no.value=fltNo;
	frm1.s_pol_nm.value=polNm;
	frm1.s_pol_cd.value=polCd;
}
function sheet1_OnClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='use_check'){
		if(!sheetObj.GetCellEditable(Row, Col)){
			//alert('이미 전문으로 생성된 건입니다.');
			alert(getLabel('FMS_COM_ALT012') + "\n\n: EDI_CSTM_0081.265");
		}
	}
}
