/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : SEE_BMD_0028.jsp
 *@FileTitle : Customer Contact Person
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/

function doWork(srcName){
	try {
        switch(srcName) {
        	case  "SEARCHLIST":
        		frm1.f_cmd.value=SEARCHLIST;
        		var arg=parent.rtnary; //var arg=window.dialogArguments;
        	    frm1.trdp_tp.value=arg[0];
        	    frm1.trdp_cd.value=arg[1];
        	    frm1.intg_bl_seq.value=arg[2];
        	    //docObjects[0].ShowDebugMsg = true;
         		docObjects[0].DoSearch("./SEE_BMD_0028GS.clt", FormQueryString(frm1) );
        		//docObjects[0].ShowDebugMsg = false;
        	break;
        	case "MODIFY":
        		if(!modifyValidatin()){
        			return;
        		}
        		frm1.f_cmd.value=MODIFY;
                if(confirm("Do you want to change the PIC? ")){
                	docObjects[0].DoSave("./SEE_BMD_0028GS.clt", FormQueryString(frm1),"ibflag", false);
                }
    	   break;    
       	   case "CLOSE":
       		   ComClosePopup(); 
       	   break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_BMD_0028.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_BMD_0028.002"); 
        }
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
                // 높이 설정
        	 
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('SEE_BMD_0028_HDR1'), Align:"Center"} ];
        	 InitHeaders(headers, info);

        	 var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"rep_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1  , TrueValue:"Y" ,FalseValue:"N"},
        	              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
        	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pic_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trd_div_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:88,   Align:"Left",    ColMerge:0,   SaveName:"pic_phn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:88,   Align:"Left",    ColMerge:0,   SaveName:"pic_fax",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"pic_eml",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pic_desc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"cntc_pson_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
        	  
        	 InitColumns(cols);
        	 SetSheetHeight(280);
        	 SetEditable(1);
           }                                                      
           break;
    }
}
 function modifyValidatin(){
	 var formObj=document.frm1;
	 var sheetObj=docObjects[0];
	 var rowCnt=sheetObj.RowCount();
	 if(rowCnt ==0){
		 alert(getLabel('SEA_COM_ALT017'));
		 return false;
	 }
	 return true;
 }
