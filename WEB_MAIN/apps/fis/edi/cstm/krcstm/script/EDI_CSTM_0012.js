/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0012.js
*@FileTitle  : 국내세관 부서 코드 관리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
function doWork(srcName){
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCH":	//OB Date, 편명목록 조회
			frm1.f_cmd.value=SEARCH;
			docObjects[0].DoSearch("EDI_CSTM_0012GS.clt",   FormQueryString(frm1) );
		break;
		case "COMMAND01":	//OB Date, 편명목록 조회
			frm1.f_cmd.value=COMMAND01;
			//2016.04.12 C.W.Park Modified
			var rowCnt=docObjects[0].RowCount();
			var isUsed=false;
			for(var i=1; i <= rowCnt; i++){
				if(docObjects[0].GetCellValue(i, 'use_check')==1){
					frm1.f_set_fdcd.value=docObjects[0].GetCellValue(i, 'cd_seq');
					isUsed=true;
					break;
				}
			}
			if(isUsed){
				docObjects[0].DoAllSave("EDI_CSTM_0012GS.clt",   FormQueryString(frm1));
			}
		break;
		case "COMMAND02":	//코드등록
			var paramMap='&f_cd_val=';
			paramMap+= frm1.f_cd_val.value;
			paramMap+= '&f_cd_lbl=';
			paramMap+= frm1.f_cd_lbl.value;
			paramMap+= '&f_cstm_cd=';
			paramMap+= frm1.f_cstm_cd.value;
			paramMap+= '&f_cstm_seq=';
			paramMap+= frm1.f_cstm_seq.value;
			ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=addEdiCstmCd'+paramMap, './GateServlet.gsl');		
		break;
		case "COMMAND03":	//코드 수정
			frm1.f_cmd.value=COMMAND03;
			docObjects[0].DoAllSave("EDI_CSTM_0012GS.clt",   FormQueryString(frm1));
		break;
		case "COMMAND04":	//코드삭제
			var paramMap='&f_cstm_cd=';
			paramMap+= frm1.f_cstm_cd.value;
			paramMap+= '&f_cstm_dept_cd=';
			paramMap+= frm1.f_cd_val.value;
			paramMap+= '&f_cd_seq=';
			paramMap+= frm1.f_cd_seq.value;
			paramMap+= '&f_cstm_seq=';
			paramMap+= frm1.f_cstm_seq.value;
			ajaxSendPost(delCdResult, 'reqVal', '&goWhere=aj&bcKey=addEdiCstmCd&delKey=ok'+paramMap, './GateServlet.gsl');
		break;
		case "RESET":		//선택한 코드를 사용함.
			frm1.f_cd_val.value='';
			frm1.f_cd_lbl.value='';
			frm1.f_cd_seq.value='';
			frm1.f_cd_val.readOnly=false;
			
			//2016.04.12 C.W.Park Modified
			getObj('saveBt').style.display='block';
			getObj('delBt').style.display='none';
			getObj('modiBt').style.display='none';
			
			//var rowCnt = docObjects[0].rows;
		break;
       	case "CODE_ADD":	//Template 등록 팝업 호출
       		tpObj.style.display='block';
       	break;
       	case "CODE_SAVE":
       		doaddTitleTempAction();
       	break;
       	
       	//2016.04.11 C.W Park add
       	case "CLOSE" : //Close 버튼 클릭
       		var formObj = document.frm1;
       		var retArray = "";
       		retArray += formObj.f_cd_val.value;
       		retArray += "|";
       		retArray += formObj.f_cd_lbl.value;
       		ComClosePopup(retArray);
       	break;
       	
    }
}
/**
 * 작성된 전문 목록을 조회함
 */
function addEdiCstmInfo(){
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
			alert(getLabel('FMS_COM_ALT012') + "\n\n: EDI_CSTM_0012.91");
			doWork('SEARCH');
		}else{
			//alert('이미 사용된 코드입니다. 다른 코드를 등록하십시오!');
			alert(getLabel('FMS_COM_ALT013') + "\n\n: EDI_CSTM_0012.95");
			frm1.f_cd_val.focus();
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0012.98");		
	}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0012.102");
	}
}
function delCdResult(reqVal){
	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			if(rtnArr=='T'){
				doWork('RESET');
				doWork('SEARCH');
			}else{
				//alert('EDI전문 작성에 사용되었습니다. 삭제가 불가능합니다!');
				alert(getLabel('FMS_COM_ALT011') + "\n\n: EDI_CSTM_0012.120");
			}
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0012.123");		
		}
		}catch(err){
			//alert('Error Msg.:'+err.message);
			alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0012.127");
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
	var args=window;
	frm1.f_cstm_cd.value=args[0];
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
	        var headers = [ { Text:getLabel('EDI_CSTM_0012_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	        var cols = [ {Type:"Radio",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"use_check" },
	               {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"cd_val",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:"cd_lbl",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Image",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"default_ck",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cd_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	        InitColumns(cols);
	        SetEditable(1);
	        SetImageList(0,APP_PATH+"/web/img/button/bt_green.gif");
	        SetImageList(1,APP_PATH+"/web/img/button/bt_red.gif");
	        SetSheetHeight(181);
			}
		break;
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */

//2016.04.11 C.W.Park Modified
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj = document.frm1;
	var retArray = "";	
	retArray += sheetObj.GetCellValue(Row, "cd_val");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cd_lbl");
	ComClosePopup(retArray);
}

//2016.04.12 C.W.Park Modified
function sheet1_OnClick(sheetObj,Row,Col){
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='use_check'){
		frm1.f_cd_val.value=sheetObj.GetCellValue(Row, "cd_val");
		frm1.f_cd_lbl.value=sheetObj.GetCellValue(Row, "cd_lbl");
		frm1.f_cd_seq.value=sheetObj.GetCellValue(Row, "cd_seq");
		getObj('saveBt').style.display='none';
		frm1.f_cd_val.readOnly=true;
		getObj('delBt').style.display='block';
		getObj('modiBt').style.display='block';
	}
}