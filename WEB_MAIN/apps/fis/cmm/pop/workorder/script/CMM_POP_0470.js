//=========================================================
//*@FileName   : CMM_POP_0470.jsp
//*@FileTitle  : CMM
//*@Description: WAREHOUSE Work Order Search Pop
//*@author     : Kang,Jung-Gu - work order search pop
//*@version    : 1.0 - 09/14/2017
//*@since      : 09/14/2017
//=========================================================
/**
 * 화면로드 후 초기값 세팅
 */

var rtnary=new Array(1);
var callBackFunc = "";
var cur_curObj;
function initFinish(){
	setFromToDt(document.form.f_pkup_strdt, document.form.f_pkup_enddt);
	setFromToDt(document.form.f_del_strdt, document.form.f_del_enddt);
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
function doWork(srcName, curObj, valObj){
    var sheetObj=docObjects[0];
    var formObj=document.form;
    cur_curObj = curObj;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
    		  // if(formValidation()){
    		   
	    		   if(trim(formObj.f_org_rout_trdp_nm.value)==""){
					   formObj.f_org_rout_trdp_cd.value="";   
				   }
	    		   if(trim(formObj.f_dest_rout_trdp_nm.value)==""){
					   formObj.f_dest_rout_trdp_cd.value="";   
				   }
	    		   if(trim(formObj.f_trsp_trdp_nm.value)==""){
					   formObj.f_trsp_trdp_cd.value="";   
				   }
    		   
	               formObj.f_cmd.value=SEARCHLIST;
	               sheetObj.DoSearch("CMM_POP_0470GS.clt", FormQueryString(formObj) );
    		 //  }
    	   break;    
    	   case "btn_new":
   	           sheetObject.RemoveAll();
   	           formObject.reset();
       	   break;
    	   case "CLOSE":
    		   ComClosePopup(); 
       	   break;	 
    	   case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	       	rtnary=new Array(1);
    				rtnary[0]="1";
    				rtnary[1]="";
    				rtnary[2]=window;
    				var callTp='';
    	   	        callBackFunc = "PARTNER_POPLIST";
    	   	     modal_center_open('./CMM_POP_0010.clt?callTp=' + callTp, rtnary, 1150,650,"yes");
    		 	   
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
	var formObj=document.form;
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
        	cal.select(formObj.f_pkup_strdt,formObj.f_pkup_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
        	cal.select(formObj.f_del_strdt,formObj.f_del_enddt, 'MM-dd-yyyy');
        break;
    }
}

function PARTNER_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var id=cur_curObj.id; 
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			formObj.f_org_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.f_org_rout_trdp_nm.value=rtnValAry[2];//eng_nm
	
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			formObj.f_dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.f_dest_rout_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="trk") {
			var rtnValAry=rtnVal.split("|");
			formObj.f_trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.f_trsp_trdp_nm.value=rtnValAry[2];//eng_nm
		}
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
             HeadTitle1=getLabel('CMM_POP_0470_HDR');
             var cnt=0;

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:HeadTitle1, Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"iss_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"trsp_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",  ColMerge:0,   SaveName:"org_rout_addr" },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_dt_tm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"org2_rout_dt_tm",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                    {Type:"Text",      Hidden:0, Width:200,   Align:"Left",   ColMerge:0,   SaveName:"dest_rout_addr" },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_dt_tm",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"via_rout_dt_tm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 }
                    
                    ];
              
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
	retArray += sheetObj.GetCellValue(Row, "wo_no");
	retArray += "|";
	
	ComClosePopup(retArray); 
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 

function formValidation(){
	var formObj=document.form;
	if(trim(formObj.f_pkup_strdt.value)!= "" && trim(formObj.f_pkup_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.f_pkup_enddt,formObj.f_pkup_strdt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: SEC_FRT_0040.306");
			formObj.f_pkup_enddt.focus();
			return false;
		}
	}
	if(trim(formObj.f_del_strdt.value)!= "" && trim(formObj.f_del_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.f_del_enddt,formObj.f_del_strdt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: SEC_FRT_0040.306");
			formObj.f_del_enddt.focus();
			return false;
		}
	}
	return true;
}
