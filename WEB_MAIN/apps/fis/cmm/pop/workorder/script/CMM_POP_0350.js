/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0350.js
*@FileTitle  : Work Order Search Pop
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/24
=========================================================*/
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
               formObj.f_cmd.value=SEARCHLIST;
               sheetObj.DoSearch("CMM_POP_0350GS.clt", FormQueryString(formObj) );
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
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0350.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0350.002");
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
            var cal=new calendarPopupFromTo();
            cal.displayType="date";
            cal.select(formObj.etd_strdt, 'etd_strdt', formObj.etd_enddt, 'etd_enddt', 'yyyy-MM-dd');
        break;
        case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	  		var rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			rtnary[2]=window;
	 	        var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
	 	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
	 	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.f_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.f_trdp_nm.value=rtnValAry[2];//full_nm
			}       
		break; 
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
	var arg=window.dialogArguments;
	var formObj  = document.form;
	var patValue=parent.rtnary;
	
	formObj.f_wo_no.value = (patValue[0] == undefined || patValue[0] == 'undefined') ? '' : patValue[0];

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
             var cnt=0;
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('CMM_POP_0350_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
		                 {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_no" },
		                 {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"trsp_trdp_cd" },
		                 {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trsp_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"trsp_trdp_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_trdp_cd" },
		                 {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"org_rout_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_trdp_cd" },
		                 {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_rout_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"bill_to_trdp_cd" },
		                 {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bill_to_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"bill_to_trdp_addr" },
		                 {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cgo_itm_cmdt_nm" },
		                 {Type:"Text",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty" },
		                 {Type:"Text",     Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut_cd" },
		                 {Type:"Text",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_k" },
		                 {Type:"Text",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_l" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas_m" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas_f" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"iss_dt_tm" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_usrid" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_dt_tm" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"org2_rout_dt_tm" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"rmk" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_dt_tm" },
		                 {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"via_rout_dt_tm" },
		                 {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"via_rout_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_cd" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_nm" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_addr" },
		                 {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org2_rout_addr" },
		                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
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
	var formObj=document.form;
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "wo_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_pck_qty");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_pck_ut_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "act_wgt_k");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "act_wgt_l");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_meas_m");		//5
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cgo_meas_f");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpr_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_cd");	//10
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cnee_trdp_addr");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_trdp_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "prnr_trdp_addr");
	ComClosePopup(retArray); 
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	document.getElementById('f_wo_no').focus();
}