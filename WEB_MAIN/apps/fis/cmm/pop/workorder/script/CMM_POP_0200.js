//=========================================================
//*@FileName   : CMM_POP_0200.jsp
//*@FileTitle  : CMM
//*@Description: Work Order Search Pop
//*@author     : Kang,Jung-Gu - work order search pop
//*@version    : 1.0 - 01/28/2009
//*@since      : 01/28/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
/**
 * 화면로드 후 초기값 세팅
 */

var rtnary=new Array(1);
var callBackFunc = "";

function initFinish(){
	setFromToDt(document.form.etd_strdt, document.form.etd_enddt);
}
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
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
    		   if(formValidation()){
    			   if(trim(formObj.f_trdp_nm.value)==""){
    				   formObj.f_trdp_cd.value="";   
    			   }
	               formObj.f_cmd.value=SEARCHLIST;
	               sheetObj.DoSearch("CMM_POP_0200GS.clt", FormQueryString(formObj) );
    		   }
    	   break;    
    	   case "btn_new":
   	           sheetObject.RemoveAll();
   	           formObject.reset();
       	   break;
    	   case "CLOSE":
    		   ComClosePopup(); 
       	   break;	 
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0200.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0200.002");
        }
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
        	cal.select(formObj.etd_strdt,formObj.etd_enddt, 'MM-dd-yyyy');
        break;
        case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	  		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			rtnary[2]=window;
   	        callBackFunc = "PARTNER_POPLIST";
	 	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break; 
    }
}

function PARTNER_POPLIST(rtnVal){
   	var form=document.form;
     if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		form.f_trdp_cd.value=rtnValAry[0];//trdp_cd
		form.f_trdp_nm.value=rtnValAry[2];//full_nm
	}   
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
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
	var arg=parent.rtnary;
	var formObj=document.form;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	formObj.air_sea_clss_cd.value=arg[0];
	if(arg[0] != 'A'){
		getObj('noTit2').innerText='MBL';
		getObj('noTit').innerText='HBL';
		if(arg[1]=='O'){
			getObj('dtTit').innerText='ETD';
		} else {
			getObj('dtTit').innerText='ETA';
		}
	}else{
		getObj('noTit2').innerText='MAWB';
		getObj('noTit').innerText='HAWB';
		getObj('dtTit').innerText='Flight';
	}
	formObj.bnd_clss_cd.value=arg[1];
	formObj.biz_clss_cd.value=arg[2];
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
             (13, 0, 0, true);
             var formObj=document.form;
             var HeadTitle1="";
             if( formObj.air_sea_clss_cd.value  != "A" ){
             HeadTitle1=getLabel('CMM_POP_0200_HDR_1');
             }else {
             HeadTitle1=getLabel('CMM_POP_0200_HDR_2');
             }
             var cnt=0;

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:HeadTitle1, Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"wo_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"house_bl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"wo_tp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"office_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"modi_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:00,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);
             SetEditable(0);
             SetSheetHeight(280);
           }                                                      
           break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
//	var formObj=document.form;
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "cnt_eng_nm"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "cnt_eng_nm"));
	retArray += sheetObj.GetCellValue(Row, "wo_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "house_bl_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "intg_bl_seq");
//	window.returnValue=retArray;
	ComClosePopup(retArray); 
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
function formValidation(){
	var formObj=document.form;
	if(trim(formObj.etd_strdt.value)!= "" && trim(formObj.etd_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.etd_strdt,formObj.etd_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: SEC_FRT_0040.306");
			formObj.etd_enddt.focus();
			return false;
		}
	}
	return true;
}
