/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0180.js
*@FileTitle  : Package Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
var rtnary=new Array(2);
var callBackFunc = "";
function doWork(srcName){
	
//	if(!btnGetVisible(srcName)){
//		return;
//	}
	
    switch(srcName) {
       case "SEARCH":
    	   doSearch();
       break;
       case "NEW":
       break;
       case "ROWADD":
    	   sheet1.DataInsert(sheet1.RowCount() + sheet1.HeaderRows());
       break;
       case "MODIFY":
    	   doSave();
       break;
       case "EXCEL":
    	   if(docObjects[0].RowCount() < 1){//no data
    		      ComShowCodeMessage("COM132501");
    		    }else{
    		     var prefix="Grd01"; 
    		     docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(	docObjects[0]), SheetDesign:1,Merge:1 });
    		    }
       break;
       case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	    break;
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
    doWork('SEARCH');
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
    switch(sheetObj.id) {
         case "sheet1":      //IBSheet1 init
            with (sheetObj) {
        	 
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             
             var headers = [ { Text:getLabel('MDM_MCM_0350_HDR'), Align:"Center"} ];
             
             InitHeaders(headers, info);
             
             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trk_cd",               KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 ,AcceptKeys:"E|N",InputCaseSensitive:1},
                 {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"descr",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
                 {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",  ColMerge:0,   SaveName:"use_yn",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
                 {Type:"Float",     Hidden:0, Width:150,   Align:"Right",  ColMerge:0,   SaveName:"s_cbm",  KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:13 ,AcceptKeys:"N"},
                 {Type:"Float",      Hidden:0,  Width:150,  Align:"Right",    ColMerge:0,   SaveName:"s_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:13 ,AcceptKeys:"N"},
                 {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"rmk" ,EditLen:400}
                ];
             InitColumns(cols);
             SetEditable(1);
             SetColProperty("use_yn", {ComboText:"Active|Inactive", ComboCode:"Y|N"});
             SetSheetHeight(300);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	disableCodeField();
	doHideProcess();
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	
}

function doSearch(){
	doShowProcess();
	setTimeout(function(){
		
		var formObj = document.frm1;
		
		var params = "?f_cmd="+SEARCH 
					+"&trk_tp_ct="+formObj.sCode.value
					+"&use_yn="+formObj.sActive.value
					+"&descr="+formObj.sDecs.value;
		
		var xml = sheet1.GetSearchData("./MDM_MCM_0350GS.clt" + params);
		
		sheet1.LoadSearchData(xml);
		
	},100);
}

function doSave(){
	
	if(!checkKeyField()){
		return;
	}
	var formObj = document.frm1;
	
	var sheetParams = sheet1.GetSaveString();
	
	if(sheetParams == ""){
		ComShowCodeMessage('COM130104');
		return;
	}
	
	if(ComShowCodeConfirm("COM130101")){
		var params = "f_cmd=" + MODIFY + "&" + sheetParams;
		
		var xml = sheet1.GetSearchData("./MDM_MCM_0350_01GS.clt",params);
		
		if(xml.replace(/^\s+|\s+$/gm,'') != ""){
			
			var xmlDoc = $.parseXML(xml);
			 var $xml1 = $(xmlDoc);
			
			 var res = $xml1.find("result").text();
			 
			 if(res == "1"){
				 //ComShowCodeMessage("COM132601");
				 doSearch();
				 showCompleteProcess();
				 return;
			 }
		}
		
		ComShowCodeMessage("COM12151");
	}
}

function checkKeyField(){
	for(var i = sheet1.HeaderRows(); i <= sheet1.RowCount(); i++){
		if(sheet1.GetCellValue(i,"trk_cd") == ""){
			ComShowCodeMessage("COM0278","Code");
			
			sheet1.SelectCell(i,"trk_cd",1);
			
			return false;
		}
	}
	
	return true;
}

function disableCodeField(){
	// Disable code field after retrieve data to prevent user change this field
	
	var headerRows = sheet1.HeaderRows();
	var rowCount = sheet1.RowCount();
	
	for(var i = headerRows; i < rowCount + headerRows; i++){
		sheet1.SetCellEditable(i,"trk_cd",0);
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="rmk"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 0);
	}
}
