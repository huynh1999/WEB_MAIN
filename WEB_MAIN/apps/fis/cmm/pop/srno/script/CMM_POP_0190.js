/**
 * 화면로드 후 초기값 세팅
 */
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
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                //if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                sheetObj.DoSearch("CMM_POP_0190GS.clt", FormQueryString(formObj) );
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                //}
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
			case "CLOSE":
   	              window.close();
       	    break;	 
    	   case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   			var rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";
				rtnary[2]=window;
	  	        var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	  	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
	  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_trdp_cd.value=rtnValAry[0];//trdp_cd
					//rtnValAry[1];//shrt_nm
					formObj.f_trdp_nm.value=rtnValAry[2];//full_nm
					//rtnValAry[3];//pic_nm
					//rtnValAry[4];//pic_phn
					//rtnValAry[5];//pic_fax
					//rtnValAry[6];//pic_eml
					//rtnValAry[7];//eng_addr  	 
					//rtnValAry[8];//trdp_tp_cd  	 
				}       
		break; 
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0190.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0190.002");
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
//	var arg=window.dialogArguments;
	//alert("arg===>["+arg[0]+"]");
	var formObj=document.form;
//	formObj.air_sea_clss_cd.value=arg[0];
//	formObj.bnd_clss_cd.value=arg[1];
	if( formObj.air_sea_clss_cd.value  == "S" ){
		mbl.style.display="block";
		mawb.style.display="none";
	}else {	
		mbl.style.display="none";
		mawb.style.display="block";
	}
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
        	    with(sheetObj){
             
           var formObj=document.form;
           var HeadTitle1="";
           if( formObj.air_sea_clss_cd.value  == "S" ){
           HeadTitle1=getLabel('CMM_POP_0190_HDR_1');
           }else {
           HeadTitle1=getLabel('CMM_POP_0190_HDR_2');
           }


           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:HeadTitle1, Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"sr_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"master_bl_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"obrd_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"office_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"dept_nm",       KeyField:0 },
                  {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"usr_nm",        KeyField:0 },
                  {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
            
           InitColumns(cols);
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
           SetSheetHeight(280);
           SetEditable(0);
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
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "cnt_eng_nm"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "cnt_eng_nm"));
retArray += sheetObj.GetCellValue(Row, "sr_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "master_bl_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "intg_bl_seq");
	window.returnValue=retArray;
	window.close();
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
