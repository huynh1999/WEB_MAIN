var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName) {
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	switch (srcName) {
		case "SEARCHLIST":
			var obj=formObj.chkbox_dept_cd;
			var allArr=new Array();
			var chkdArr=new Array();
			for (var i=0; i<4; i++) {
				allArr[allArr.length]=("'" + obj[i].value + "'");
				if (obj[i].checked) {
					chkdArr[chkdArr.length]=("'" + obj[i].value + "'");
				}
			}
			// form의 hidden input에 setting
			if (chkdArr.length > 0) { // Query에서 IN 조건에 사용
				formObj.dept_cd.value=chkdArr.join(", ");
			} else {
				formObj.dept_cd.value="";
			}
			if (obj[4].checked) { // Query에서 NOT IN 조건에 사용
				formObj.not_dept_cd.value=allArr.join(", ");
			} else {
				formObj.not_dept_cd.value="";
			}
			formObj.f_cmd.value=SEARCHLIST;
 			sheetObj.DoSearch("PFM_MGT_0120GS.clt", FormQueryString(formObj) );
		break;
		case "ALLCLEAR":
			sheetObj.RemoveEtcData();
			sheetObj.RemoveAll();
			formObj.reset();
			doRegFrmEvent();
		break;
		case "EXCEL":
			var sortBy=formObj.sort_by.value;
			switch (sortBy) {
				case "CMDT":
					if(sheetObj.RowCount() < 1){//no data	
			   			ComShowCodeMessage("COM132501");
			   		}else{
			   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
			   		}	
				break;
				case "POL":
					if(sheetObj.RowCount() < 1){//no data	
			   			ComShowCodeMessage("COM132501");
			   		}else{
			   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
			   		}
				break;
				case "POD":
					if(sheetObj.RowCount() < 1){//no data	
			   			ComShowCodeMessage("COM132501");
			   		}else{
			   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
			   		}
				break;
			}
		break;
	}
}
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.ofc_cd);
	
	for (var i=0;i<docObjects.length;i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	doRegFrmEvent();
}
function doRegFrmEvent(){
	var formObj=document.frm1;
	// 강제로 onClick Event발생 (초기값 setting)
	setRadio(formObj.radio_customer[0]);
	setRadio(formObj.radio_bl_trdp_tp_cd[0]);
	setRadio(formObj.radio_sort_by[0]);
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj, sheetNo) {
	switch (sheetNo) {
		case 1:    //IBSheet1 init
		    with(sheetObj){
			      SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:0, HeaderCheck:0, ColResize:1 };
			      var headers = [ { Text:getLabel("PFM_MGT_0120_HDR1"), Align:"Center"},
			                  { Text:getLabel("PFM_MGT_0120_HDR2"), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Text",     Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"rank" },
			             {Type:"Text",     Hidden:0,  Width:240,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm" },
			             {Type:"Text",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"dept_nm" },
			             {Type:"Text",     Hidden:0,  Width:240,  Align:"Left",    ColMerge:1,   SaveName:"rep_cmdt_nm" },
			             {Type:"Text",      Hidden:1, Width:240,  Align:"Left",    ColMerge:1,   SaveName:"pol_nm" },
			             {Type:"Text",      Hidden:1, Width:240,  Align:"Left",    ColMerge:1,   SaveName:"pod_nm" },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"bl_count" },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"meas",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3 },
			             {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"meas1",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"chg_wgt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2 },
			             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"chg_wgt1",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2 } ];
			       
			      InitColumns(cols);
		
					      SetEditable(0);
					    SetCountPosition(0);
			            SetHeaderRowHeight(20);
			            SetSheetHeight(300);
			            resizeSheet();
	      }


		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

/**
 * IBSeet 조회 함수를 이용하여 조회가 완료되고 발생하는 Event
 * @param {sheetObj} String : 해당 IBSheet Object
 * @param {ErrMsg} String : 조회 후 메시지
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	if (ErrMsg != "") return;
	var sortBy=document.frm1.sort_by.value;
	with (sheetObj) {
		switch (sortBy) {
			case "CMDT":
				SetColHidden("rep_cmdt_nm",0);
				SetColHidden("pol_nm",1);
				SetColHidden("pod_nm",1);
			break;
			case "POL":
				SetColHidden("rep_cmdt_nm",1);
				SetColHidden("pol_nm",0);
				SetColHidden("pod_nm",1);
			break;
			case "POD":
				SetColHidden("rep_cmdt_nm",1);
				SetColHidden("pol_nm",1);
				SetColHidden("pod_nm",0);
			break;
		}
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
var cur_formObj;
function doDisplay(doWhat, formObj) {
	cur_formObj = formObj;
	switch (doWhat) {
		case "CALENDAR":   //달력 조회 From ~ To 팝업 호출
			var cal=new ComCalendarFromTo();
			cal.displayType="date";
			cal.select(formObj.period_strdt, formObj.period_enddt, "MM-dd-yyyy");
		break;
		case "CSTMR_POPUP":
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=formObj.trdp_nm.value;
			rtnary[2]=window;
			callBackFunc = "CSTMR_POPUP";
	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes"); 
			
		break;
	}
}
function CSTMR_POPUP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_formObj.trdp_cd.value=rtnValAry[0];
		cur_formObj.trdp_nm.value=rtnValAry[2];
	}
}
/**
 * Trade Partner code로 name조회
 */
function codeNameAction(s_code) {
	if (s_code != "") {
		if ((window.event.type == "keydown" && event.keyCode == 13) || window.event.type == "blur") {
			ajaxSendPost(trdpCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code=" + s_code.toUpperCase(), "./GateServlet.gsl");
		}
	} else {
		document.frm1.trdp_cd.value="";// trdp_cd AS param1
		document.frm1.trdp_nm.value="";// eng_nm AS param2
	}
}
/**
 * Trade Partner code로 name조회 결과처리
 */
 function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=='OK') {
		if (typeof(doc[1])!="undefined") {
			//조회해온 결과를 Parent에 표시함
			var masterVals=doc[1].split('@@^');
			formObj.trdp_cd.value=masterVals[0];    // trdp_cd  AS param1
			formObj.trdp_nm.value=masterVals[3];    // eng_nm   AS param2
		} else {
			formObj.trdp_cd.value="";
			formObj.trdp_nm.value="";
		}
	}
}
function setAllCheck(yn) {
	var formObj=document.frm1;
	var obj=formObj.chkbox_dept_cd;
	for (var i=0; i<obj.length; i++) {
		obj[i].checked=yn;
	}
}
/**
 * Form의 radio버튼을 클릭했을때 체크된 값만 지정된 Hidden input에 setting
 * @param {object} Form Element Radio Object 필수
 * @return 없음
 */
function setRadio(obj) {
	// formObj의 "radio_"를 제외한 객체명을 가진 hidden input에 setting
	document.frm1[obj.name.replace("radio_", "")].value=obj.value;
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
  sheetObj.SetSelectRow(sheetObj.HeaderRows());
}