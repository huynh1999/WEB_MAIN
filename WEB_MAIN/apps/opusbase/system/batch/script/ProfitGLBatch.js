/**
 * doWork 함수
 * 
 */
function doWork(srcName){
	var formObj=document.frm1;
	switch(srcName){
		case "COMMAND01" :
			frm1.f_cmd.value=11;
			var confirmMsg = '';
			var andMsg = '';
			
			
			if(formObj.pfit.checked && formObj.gl.checked) {
				confirmMsg= 'Volume & Profit and G/L';
			} else if(formObj.pfit.checked && !formObj.gl.checked) {
				confirmMsg= 'Volume & Profit';
			} else if(!formObj.pfit.checked && formObj.gl.checked) {
				confirmMsg= 'G/L';
			}
				
			if(!validationMethod()){
				break;
			}
			
			if(confirm(getLabel('FMS_COM_ALT128')+trim(confirmMsg)+getLabel('FMS_COM_ALT129'))){
				doShowProcess();

				var intRows=docObjects[0].LastRow() + 1;
				docObjects[0].DataInsert(intRows);
				docObjects[0].DoAllSave("./ProfitGLBatchGS.clt", FormQueryString(formObj), true);
			}
			
		break;
		
		default :
		break;
		
	
	}
}


/**
 * @param doWhat
 * @param obj
 * @returns 
 * 달력 함수
 */
function doDisplay(doWhat, obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar(); 
	        cal.select(obj.proc_dt,  'MM-dd-yyyy');
	        break;
    }
}


/**
 * @param status
 * @returns
 * Processing Date Validation 함수
 */
function dateValidation(status){
	var selDate = Date.parse(frm1.proc_dt.value);
	var yearEndDate = Date.parse(frm1.lst_proc_yr_end_stl.value);
	
	
	if(!frm1.proc_dt.value&&status==1) {
		alert(getLabel('FMS_COM_ALT130'));
		return false
	}
		
	
	if (selDate < yearEndDate) {
		alert(getLabel('FMS_COM_ALT126'));
		return false;
	}
	
	return true;
}

/**
 * @returns
 * 
 * Apply 클릭 전, 전체 입력 사항 validtion 하는 함수
 */
function validationMethod(){
	var formObj=document.frm1;
	var validationResult = true;

	//Check box 체크 하나도 안했을 경우 체크.
	if ( ! (formObj.pfit.checked || formObj.gl.checked) ) {
		alert(getLabel('FMS_COM_ALT127'));
		return false
	}
	//Processing Date 체크
	validationResult = dateValidation(1);
	
	return validationResult;
}

/**
 * 
 * IBSHEET 초기세팅
 */
var docObjects = [];
var sheetCnt = 0;

/**
 * @param sheet_obj
 * @returns
 * IBSHEET docObjects 배열 세팅 함수.
 */
function setDocumentObject(sheet_obj){
	   docObjects[sheetCnt++] = sheet_obj;
	}



/**
 * @param sheetObj
 * @param sheetNo
 * @returns
 * 
 * IBSHEET 초기화 함수
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정
			
			(1, 0, 0, true);
			var cnt=0;

			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:"result", Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ 
				{Type:"Text",      Hidden:0,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"result",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
			 
			InitColumns(cols);
			SetVisible(0);
			SetEditable(1);
		} 
		break;
	}
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
}


/**
 * @param sheetObj
 * @param errMsg
 * @returns
 * SAVE END 함수.
 */
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(!errMsg){
		doHideProcess();
		if(sheetObj.GetCellValue(1,"result")=='true'){
			showCompleteProcess();
			//alert(ofcCd);
			ajaxSendPost(getBatchHistory, 'reqVal', '&goWhere=aj&bcKey=getBatchHistory&ofcCd='+ofcCd,'./GateServlet.gsl');
		} else {
			alert(getLabel('FMS_COM_ALT019'));
		}
	}	

}

function getBatchHistory(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			frm1.lst_proc_yr_end_stl.value=rtnArr[0];
			frm1.pfit_proc_dt.value=rtnArr[1];
			frm1.gl_proc_dt.value=rtnArr[2];
			frm1.pfit_rgst_tms.value=rtnArr[3];
			frm1.gl_rgst_tms.value=rtnArr[4];
		}
	}
}

function flgChange(checkbox) {
	var formObj=document.frm1;
	if(checkbox.checked==true){
		checkbox.checked = false;
	}else{	
		checkbox.checked = true;
	}
}

