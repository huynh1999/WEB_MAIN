//=========================================================
//*@FileName   : CMM_POP_0060.jsp
//*@FileTitle  : CMM
//*@Description: user id search pop
//*@author     : 이광훈 -  user id search  pop
//*@version    : 1.0 - 01/06/2009
//*@since      : 01/06/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("./CMM_POP_0060GS.clt", FormQueryString(formObj) );
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
       	    case "btn_ok":
   	             var opener=window.dialogArguments.document.sheet1 ;  // opener sheet1 이름은받아오세요
   	             var rows=sheetObject.LastRow() + 1 ;
   	             for ( i=0 ; i < rows ; i++ )
   	             {
   	            	 if ( sheetObject.GetCellValue( i, "chk" ) == 1 ) {
   	                    var iRow=opener.DataInsert(-1);
   	                    for( j=0 ; j < sheetObject.LastCol(); j ++)
   	                    {
   	                        if ( sheetObject.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                         for(k=0 ; k < opener.LastCol(); k ++)
       	                        {
   	                                if ( opener.ColSaveName(k) == sheetObject.ColSaveName(j))
   	                                	opener.SetCellValue( iRow, opener.ColSaveName(k),sheetObject.GetCellValue( i , sheetObject.ColSaveName(j)) ,0);
     	                            }
      	                       }
   	                    }
   	               }
   	             }
   	             ComClosePopup(); 
        	break;
       	    case "CLOSE":
       	    	ComClosePopup(); 
       	    break;	   
       	    //#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
	       	case "APPLY":
	         	selectMultiRow();
	 		break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0060.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0060.002"); 
        }
	}
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
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
    var arg=parent.rtnary;
	var formObj=document.form;
	if(arg != undefined && arg != 'undefined'){
		formObj.openMean.value = arg[0];
		if(arg[1] != undefined && arg[1] != 'undefined'){
			formObj.s_user_name.value = arg[1];
		}
		// #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
		if(arg[2] != undefined){
			formObj.f_MultiSelect.value=arg[2];
		}
		if(formObj.f_MultiSelect.value == "Y"){
			var sheetObj=docObjects[0];
			sheetObj.SetColHidden("chk", 0);
			getObj("btnApply").style.display = "inline";
		}
	}else{
		formObj.openMean.value = "";
	}
	
	if(formObj.s_user_name.value != "" || formObj.s_office_name.value != ""){
		doWork("SEARCHLIST");
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

            

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('CMM_POP_0060_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [
                    // #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
                    {Type:"CheckBox",  Hidden: 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
                    {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"usrid",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"eng_usr_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"locl_usr_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ofc_eng_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0 },
                    //#6407 [Binex-LA] Volume & Profit Report Issue (#2447)
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"team_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0, UpdateEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"dept_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
              
             InitColumns(cols);
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             SetEditable(1);
             SetSheetHeight(280);
             sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheet1.ColSaveName(Col) == "chk"){
		return;
	}
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "usrid");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "eng_usr_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ofc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "dept_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "locl_usr_nm");
	ComClosePopup(retArray); 
}

/*#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS 
 * addition [CHK)] multi-selection 
 * Duc.Nguyen 2017.09.21
 * */
function selectMultiRow(){
	var sheetObj=docObjects[0];
	var retArray="";
	for(i=1; i <= sheetObj.RowCount(); i++){
		if(sheetObj.GetCellValue(i, "chk") == "1"){		
			retArray += sheetObj.GetCellValue(i, "usrid");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "eng_usr_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ofc_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "dept_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "locl_usr_nm");
			retArray += ";";
		}
	}	
	if(retArray != ""){
		ComClosePopup(retArray);
	}else{
		ComShowMessage(getLabel('FMS_COM_ALT004'));	
	}	
}
