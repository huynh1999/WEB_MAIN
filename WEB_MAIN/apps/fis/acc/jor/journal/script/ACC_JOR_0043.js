/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0043.js
*@FileTitle  : Check Batch Print
*@author     : CLT
*@version    : 1.0
*@since      : 2017/09/05
=========================================================*/

function doWork(srcName){
	var formObj=document.form;
    switch(srcName) {
	case 'PRINT':
		formObj.f_cmd.value = SEARCHLIST;
		docObjects[0].DoSearch("./ACC_JOR_0043GS.clt", FormQueryString(formObj));
	break;
	
	case "CLOSE":
		ComClosePopup(); 
	break;
    }
}
var docObjects=new Array();
var sheetCnt=0;

function loadPage(){
	var formObj=document.form;
	var arg=parent.rtnary;
	
	formObj.cmd_type.value = arg[0];
	//#3345 #1106 개선사항
	formObj.f_strdt.value = arg[1]; 
	formObj.f_enddt.value = arg[2];
		
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
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
        	    with(sheetObj){
            
           //no support[check again]CLT 	             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
           var cnt=0;
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:'jnr_no|chk_no|bank_seq|chk_form|rider_yn', Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"bank_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk_form",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"rider_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 }
                        ];
		            
		           InitColumns(cols);
		           SetVisible(false);
		           SetEditable(1);
                 }

                          
           break;
     }
}
function sheet1_OnSearchEnd(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var ttlFileName="";
	var ttlParam="";
	
	if(sheetObj.RowCount() < 1){//no data
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}
	
	var param= "";
	var arr_jnr_no= "";
	for(var i=1; i<=sheetObj.LastRow();i++){
		
		if(formObj.f_rider_yn.checked ==true){
			if(sheetObj.GetCellValue(i, "rider_yn") ==  "Y"){
				ttlFileName += '^@@^' + 'check_journal_02.mrd';
				param   = "";
				param   ='[' + sheetObj.GetCellValue(i, "jnr_no") + ']';				// [1]
				ttlParam += "^@@^" + param;
			}
		}else{
			
			if(sheetObj.GetCellValue(i, "chk_form") !=  ""){
				ttlFileName += '^@@^' + 'check_journal_01_' + sheetObj.GetCellValue(i, "chk_form") + '.mrd';
			}else{
				ttlFileName += '^@@^' + 'check_journal_01.mrd';
			}
			param   = "";
			param   =  '[' + sheetObj.GetCellValue(i, "jnr_no") + ']';				// [1]
			param	+= '[' + sheetObj.GetCellValue(i, "rider_yn") + ']';				// [2]
			param	+= '[]';												// [3]
			
			ttlParam += "^@@^" + param;
			arr_jnr_no += '^@@^' + sheetObj.GetCellValue(i, "jnr_no");
		}
		
	}
	//console.log(ttlFileName);
	//console.log(ttlParam);
	if(ttlFileName.substring(4) != ""){
		formObj.file_name.value=ttlFileName.substring(4);
		formObj.rd_param.value=ttlParam.substring(4);
		formObj.title.value="Batch Print"
		formObj.arr_jnr_no.value = arr_jnr_no.substring(4);
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	}else{
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}
}


/** #3345 #1106 개선사항
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
//Calendar flag value
var firCalFlag=false;
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
//            var cal=new calendarPopupFromTo();
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
            
            document.getElementById('_OpusCalendar_').style.left ="50px";
        break;
    }
}
