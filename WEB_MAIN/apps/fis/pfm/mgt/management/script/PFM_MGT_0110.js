//=========================================================
//*@FileName   : PFM_MGT_0110.jsp
//*@FileTitle  : Customized Report
//*@Description: Customized Report
//*@author     : PJK - Cyberlogitec
//*@version    : 1.0 - 03/30/2012
//*@since      : 03/30/2012
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/10
//*@since      : 2014/07/10
//=========================================================
var rtnary=new Array(2);
var callBackFunc = "";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("PFM_MGT_0110GS.clt", FormQueryString(formObj) );
            }
            break;
		case "NEW":   
			displayClear();
            break;
		case "MODIFY":
			if(formObj.f_rpt_title.value == ""){
				//[Title] is mandatory field.
				alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('TIT'));
				formObj.f_rpt_title.focus();
				return;
			}
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				sheetObj.RemoveAll();
				var iRows=sheetObj.LastRow();
	            var Row=sheetObj.DataInsert(++iRows);
				if(formObj.f_rpt_seq.value != ""){
					sheetObj.SetCellValue(Row, "ibflag","U",0);
				}
				sheetObj.SetCellValue(Row, "rpt_seq",formObj.f_rpt_seq.value,0);
				sheetObj.SetCellValue(Row, "rpt_title",formObj.f_rpt_title.value,0);
				sheetObj.SetCellValue(Row, "desc_1",formObj.f_desc_1.value,0);
				sheetObj.SetCellValue(Row, "tp_1",formObj.f_tp_1.value,0);
				sheetObj.SetCellValue(Row, "desc_2",formObj.f_desc_2.value,0);
				sheetObj.SetCellValue(Row, "tp_2",formObj.f_tp_2.value,0);
				sheetObj.SetCellValue(Row, "desc_3",formObj.f_desc_3.value,0);
				sheetObj.SetCellValue(Row, "tp_3",formObj.f_tp_3.value,0);
				sheetObj.SetCellValue(Row, "desc_4",formObj.f_desc_4.value,0);
				sheetObj.SetCellValue(Row, "tp_4",formObj.f_tp_4.value,0);
				sheetObj.SetCellValue(Row, "desc_5",formObj.f_desc_5.value,0);
				sheetObj.SetCellValue(Row, "tp_5",formObj.f_tp_5.value,0);
				sheetObj.SetCellValue(Row, "desc_6",formObj.f_desc_6.value,0);
				sheetObj.SetCellValue(Row, "tp_6",formObj.f_tp_6.value,0);
				sheetObj.SetCellValue(Row, "hdr_txt",formObj.f_hdr_txt.value,0);
				sheetObj.SetCellValue(Row, "qry_txt",formObj.f_qry_txt.value,0);
				
				
				
				//52038
				sheetObj.SetCellValue(Row, "desc_7",formObj.f_desc_7.value,0);
				sheetObj.SetCellValue(Row, "tp_7",formObj.f_tp_7.value,0);				
				sheetObj.SetCellValue(Row, "desc_8",formObj.f_desc_8.value,0);
				sheetObj.SetCellValue(Row, "tp_8",formObj.f_tp_8.value,0);				
				sheetObj.SetCellValue(Row, "desc_9",formObj.f_desc_9.value,0);
				sheetObj.SetCellValue(Row, "tp_9",formObj.f_tp_9.value,0);				
				sheetObj.SetCellValue(Row, "desc_10",formObj.f_desc_10.value,0);
				sheetObj.SetCellValue(Row, "tp_10",formObj.f_tp_10.value,0);
				sheetObj.SetCellValue(Row, "rmk",formObj.f_rmk.value,0);
				
				formObj.f_cmd.value=MODIFY;
				displayClear();
				sheetObj.DoSave("PFM_MGT_0110GS.clt", FormQueryString(formObj),"ibflag",false);
	        }
			break;
		case "RUN_QUERY":
			if(formObj.f_rpt_seq.value == ""){
				//Please check [Report List].
				alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_RPLT'));
				return;
			}
			if(formObj.f_qry_txt.value == ""){
				//Please check [Query].
				alert(getLabel('FMS_COM_ERR002'));
				return;
			}
			rtnary=new Array(2);
			rtnary[0]=formObj.f_rpt_seq.value;
		   	rtnary[1]=formObj.f_rpt_title.value;
		   	rtnary[2]=formObj.f_desc_1.value;
		   	rtnary[3]=formObj.f_desc_2.value;
		   	rtnary[4]=formObj.f_desc_3.value;
		   	rtnary[5]=formObj.f_desc_4.value;
		   	rtnary[6]=formObj.f_desc_5.value;
		   	rtnary[7]=formObj.f_desc_6.value;
		   	rtnary[8]=formObj.f_hdr_txt.value;
		   	rtnary[9]=formObj.f_qry_txt.value;
		   	//52038
		   	rtnary[10]=formObj.f_desc_7.value;
		   	rtnary[11]=formObj.f_desc_8.value;
		   	rtnary[12]=formObj.f_desc_9.value;
		   	rtnary[13]=formObj.f_desc_10.value;
		   	rtnary[14]=formObj.f_rmk.value;
		   	
		   	
		   	callBackFunc = "RUN_QUERY";
		   	modal_center_open('./CMM_POP_0370.clt', rtnary, 1200,633,"yes");
   	    break;
    }
}

function RUN_QUERY(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_trdp_cd.value=rtnValAry[0];
   	    doWork("SEARCHLIST");
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
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
    doWork('SEARCHLIST');
    
    
    if (user_role_cd =='Master'){
    	$("#f_qry_txt").css("display","inline");
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
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('PFM_MGT_0110_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"rpt_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"rpt_title",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_1",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_2",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_3",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_3",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_4",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_4",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_5",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_5",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_6",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_6",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //52038
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_7",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_7",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_8",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_8",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_9",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_9",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"desc_10",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"tp_10",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"rmk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"hdr_txt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"qry_txt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"Indexing" },
                    {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
              
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(532);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	//alert(getLabel('FMS_COM_NTYCOM'));
	/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	formObj.f_rpt_seq.value=sheetObj.GetCellValue(Row, "rpt_seq");
	formObj.f_rpt_title.value=sheetObj.GetCellValue(Row, "rpt_title");
	formObj.f_desc_1.value=sheetObj.GetCellValue(Row, "desc_1");
	formObj.f_tp_1.value=sheetObj.GetCellValue(Row, "tp_1");
	formObj.f_desc_2.value=sheetObj.GetCellValue(Row, "desc_2");
	formObj.f_tp_2.value=sheetObj.GetCellValue(Row, "tp_2");
	formObj.f_desc_3.value=sheetObj.GetCellValue(Row, "desc_3");
	formObj.f_tp_3.value=sheetObj.GetCellValue(Row, "tp_3");
	formObj.f_desc_4.value=sheetObj.GetCellValue(Row, "desc_4");
	formObj.f_tp_4.value=sheetObj.GetCellValue(Row, "tp_4");
	formObj.f_desc_5.value=sheetObj.GetCellValue(Row, "desc_5");
	formObj.f_tp_5.value=sheetObj.GetCellValue(Row, "tp_5");
	formObj.f_desc_6.value=sheetObj.GetCellValue(Row, "desc_6");
	formObj.f_tp_6.value=sheetObj.GetCellValue(Row, "tp_6");
	formObj.f_hdr_txt.value=sheetObj.GetCellValue(Row, "hdr_txt");
	formObj.f_qry_txt.value=sheetObj.GetCellValue(Row, "qry_txt");
	//52038
	formObj.f_desc_7.value=sheetObj.GetCellValue(Row, "desc_7");
	formObj.f_tp_7.value=sheetObj.GetCellValue(Row, "tp_7");
	formObj.f_desc_8.value=sheetObj.GetCellValue(Row, "desc_8");
	formObj.f_tp_8.value=sheetObj.GetCellValue(Row, "tp_8");	
	formObj.f_desc_9.value=sheetObj.GetCellValue(Row, "desc_9");
	formObj.f_tp_9.value=sheetObj.GetCellValue(Row, "tp_9");
	formObj.f_desc_10.value=sheetObj.GetCellValue(Row, "desc_10");
	formObj.f_tp_10.value=sheetObj.GetCellValue(Row, "tp_10");	
	formObj.f_rmk.value=sheetObj.GetCellValue(Row, "rmk");	
	
}
function displayClear() {
	var formObj=document.frm1;
	formObj.f_rpt_seq.value="";
	formObj.f_rpt_title.value="";
	formObj.f_desc_1.value="";
	formObj.f_desc_2.value="";
	formObj.f_desc_3.value="";
	formObj.f_desc_4.value="";
	formObj.f_desc_5.value="";
	formObj.f_desc_6.value="";
	formObj.f_tp_1.selectedIndex=0;
	formObj.f_tp_2.selectedIndex=0;
	formObj.f_tp_3.selectedIndex=0;
	formObj.f_tp_4.selectedIndex=0;
	formObj.f_tp_5.selectedIndex=0;
	formObj.f_tp_6.selectedIndex=0;
	formObj.f_hdr_txt.value="";
	formObj.f_qry_txt.value="";
	//52038
	formObj.f_desc_7.value="";
	formObj.f_tp_7.selectedIndex=0;	
	formObj.f_desc_8.value="";
	formObj.f_tp_8.selectedIndex=0;		
	formObj.f_desc_9.value="";
	formObj.f_tp_9.selectedIndex=0;		
	formObj.f_desc_10.value="";
	formObj.f_tp_10.selectedIndex=0;		
	formObj.f_rmk.value="";
}
