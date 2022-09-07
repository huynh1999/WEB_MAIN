var FROMDATE;
var TODAY;
var ENDDATE;
var rd_opt_path;
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            //initSheet(sheet1,1);
            docObjects[0].DoSearch("./ACC_JOR_0100GS.clt", FormQueryString(formObj) );
            sheetObj.ShowSubSum();
            if(formObj.s_ofc_cd.value == "" && formObj.f_grp_by_ofc.checked == true){
        		sub_total();
        		return;
        	}            
       break;
       case "PRINT":
			formObj.file_name.value='bank_outstanding_01.mrd';
			formObj.title.value='Bank Outstanding';
			var date=formObj.f_deposit_dt.value.replaceAll("-", "");
			var date=date.substring(4,8) + date.substring(0,2) + date.substring(2,4);
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_ofc_nm.value + ']';                                                             //1
			param += '[' + date + ']';                                                                               //2
			if (user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA") {
				param += '[' + "http://"+location.host+"/"+APP_PATH+"/apps/fis/rpt/mrd/letter/bank_outstanding_02.mrd" + ']';     //3
    		} else {
    			//US / CA 제외 경로셋팅 옵션 제공
    			
    			var opt_key = "MRD_A4_FOLDER";
    		    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    			
    			param += '[' + "http://"+location.host+"/"+APP_PATH+"/apps/fis/rpt/mrd/" + rd_opt_path + "bank_outstanding_02.mrd" + ']';            //3
    		}	
			//param += '[' + "http://"+location.host+"/"+APP_PATH+"/apps/fis/rpt/jsp/Report.html" + ']';       
			param += '[' + "popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);" + ']';                       //4
			param += '[' + formObj.s_ofc_cd.value + ']';                                                             //5     
			var f_grp_by_ofc="";
			if(formObj.f_grp_by_ofc.checked){
				f_grp_by_ofc="G";
			}
			param += '[' + f_grp_by_ofc + ']';                                                             			//6
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
       case "DetailPrint":
			formObj.file_name.value='bank_outstanding_02.mrd';
			formObj.title.value='Bank Outstanding Detail';
			var date=formObj.f_deposit_dt.value.replaceAll("-", "");
			var date=date.substring(4,8) + date.substring(0,2) + date.substring(2,4);
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + date + ']';
			param += '[' + formObj.f_bank_seq.value + ']';
			param += '[' + formObj.f_bank_nm.value.replaceAll("*","") + ']';
			var f_grp_by_ofc="";
			var s_ofc_cd=formObj.s_ofc_cd.value;
			if(formObj.f_grp_by_ofc.checked){
				f_grp_by_ofc="G";
				s_ofc_cd=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ofc_cd") == "ALL" ? "" : sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ofc_cd");
			}
			param += '[' + s_ofc_cd + ']';
			param += '[' + f_grp_by_ofc + ']';									//6
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
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
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1;
	var date=now.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(date < 10){
		date="0"+date;
	}
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	//ENDDATE  = getEndDate(TODAY);
	ENDDATE=TODAY;
	formObj.f_deposit_dt.value=ENDDATE;
	doWork("SEARCHLIST");
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
             SetConfig( { SearchMode:2, MergeSheet:2, Page:50 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_JOR_0100_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:180,  Align:"Right",   ColMerge:0,   SaveName:"d_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:180,  Align:"Right",   ColMerge:0,   SaveName:"c_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:200,  Align:"Right",   ColMerge:0,   SaveName:"t_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"bank_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);
             SetSheetHeight(500);
             SetEditable(1);
             resizeSheet();
           }                                                      
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(formObj.s_ofc_cd.value == "" && formObj.f_grp_by_ofc.checked == true){
		sub_total();
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	/*
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#FFFFFF");
		}
	}
	*/
	//sub total 인 경우 Pass
	if(sheetObj.GetCellValue(Row, "bank_nm").indexOf("TOTAL") == -1){
		if(sheetObj.GetCellValue(Row, "bank_seq") != ""){
			getBtnObj('detailBtn2').style.display="inline";
			formObj.f_bank_seq.value=sheetObj.GetCellValue(Row, "bank_seq");
			formObj.f_bank_nm.value=sheetObj.GetCellValue(Row, "bank_nm");
		}else{
			getBtnObj('detailBtn2').style.display="none";
			formObj.f_bank_seq.value="";
			formObj.f_bank_nm.value="";
		}
	}	
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
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
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_deposit_dt, 'MM-dd-yyyy');
        break;
    }
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function sub_total(){
	var sheetObj=docObjects[0];
    //sheetObj.MessageText ("SubSum") = "";
	sheetObj.ShowSubSum([{StdCol:"bank_nm", SumCols:"2|3|4", Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:""}]);
	//표시된 모든 소계의 행 번호를 가져온다. 결과->"3|5|10|"
    var sRow=sheetObj.FindSubSumRow();
	var arrRow=sRow.split("|");    
	for (var idx=0; idx < arrRow.length; idx++){ 
		sheetObj.SetCellFont("FontBold", arrRow[idx],0,arrRow[idx],1,1);
//		sheetObj.SetRowMerge(arrRow[idx],1);
		sheetObj.SetMergeCell(Number(arrRow[idx]),0,1,2);
		sheetObj.SetCellText(arrRow[idx], 0 ,sheetObj.GetCellValue(arrRow[idx], 0).replace("Subtotal:","") + " TOTAL");
		//sheetObj.SetCellText(arrRow[idx], 1 ,sheetObj.GetCellValue(arrRow[idx], 0));
	}
}
function changeOffice(obj){
	var formObj=document.frm1;
	if(obj.value == ""){
		formObj.f_grp_by_ofc.disabled=false;
	}else{
		formObj.f_grp_by_ofc.checked=false;	
		formObj.f_grp_by_ofc.disabled=true;
	}
}

//Jpn RD폴더 셋팅.
function rdSetter(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] != "") {
			rd_opt_path += doc[1];
		}
	}
}
