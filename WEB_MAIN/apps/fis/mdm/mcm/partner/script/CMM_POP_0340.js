function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
       	    case "CLOSE":
       	    	ComClosePopup();
       			window.close();
       	    break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0340.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0340.002");
        }
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var popType="";
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var arg=window.dialogArguments;
    if(arg == null){
    	arg = parent.rtnary;
    }
    popType = arg[1].substring(0,1);
    
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var arg=window.dialogArguments;
    if(arg == null){
    	arg = parent.rtnary;
    }
    var obj=document.getElementById("title_label");
    form.grid.value=arg[0];
    if(arg[1] !="" && arg[1] != undefined && arg[1] != null ){
    	obj.innerHTML=arg[1];  //set title 
    }else{
    	obj.innerHTML="Customs Broker / Trucker";  //set title
    }
    gridParsing();
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
             var headers;
             
             if (popType == "C") {
            	 headers = [ { Text:getLabel('CMM_POP_0340_HDR1'), Align:"Center"} ];
             } else if (popType == "T") {
            	 headers = [ { Text:getLabel('CMM_POP_0340_HDR2'), Align:"Center"} ];
             } else if (popType == "D") {
            	 headers = [ { Text:getLabel('CMM_POP_0340_HDR3'), Align:"Center"} ];
             }
             
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cb_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cb_dest",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cb_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cb_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cb_trdp_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);

              SetEditable(0);
              SetHeaderRowHeight(20 );
              SetSheetHeight(200);

           }                                                      
           break;
    }
}
//OnDblClick(Row,Col) 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "cb_seq");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cb_dest");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cb_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cb_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cb_trdp_addr");
	ComClosePopup(retArray);
//	window.returnValue=retArray;
//	window.close();
}
// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}
function gridParsing(){
	var tmpVal=form.grid.value.split("^^;");
	var intRows=1;
	for(var i=0 ; i<tmpVal.length-1 ; i++){
		var resultVal=tmpVal[i].split("@@^");
		docObjects[0].DataInsert(intRows);
		docObjects[0].SetCellValue(intRows, "cb_seq",resultVal[1]);
		docObjects[0].SetCellValue(intRows, "cb_dest",resultVal[2]);
		docObjects[0].SetCellValue(intRows, "cb_trdp_cd",resultVal[3]);
		docObjects[0].SetCellValue(intRows, "cb_trdp_nm",resultVal[4]);
		docObjects[0].SetCellValue(intRows, "cb_trdp_addr",resultVal[5]);
		intRows++;
	}
}
