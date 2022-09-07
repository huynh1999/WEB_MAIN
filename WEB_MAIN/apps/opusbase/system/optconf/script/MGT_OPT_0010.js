
//=========================================================
//*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
//=========================================================
//=========================================================
//*@FileName   : MGT_MAC_0010.jsp
//*@FileTitle  : MAC Address
//*@Description: MAC Address
//*@author     : Tuan.Chau
//*@version    : 
//*@since      :
//
//*@Change history:
//=========================================================

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    switch(srcName) {
		//NEW 버튼을 눌렀을때 Default 데이터를 조회한다.
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("MGT_OPT_0010GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST01":  // #856 TB_SEQ 정보변경
			formObj.f_cmd.value=SEARCHLIST01;
			sheetObj1.DoSearch("MGT_OPT_0011GS.clt", FormQueryString(formObj) );
			break;
		case "ROWADD":
			var intRows=sheetObj.LastRow() + 1;
			sheetObj.DataInsert(intRows);
			sheetObj.SetCellValue(intRows, 'use_flg',1);
			break;
		case "SAVE":
            formObj.f_cmd.value=MODIFY;
            if(inpuValCheck(sheetObj)){
                //전체 CellRow의 갯수
                if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    sheetObj.DoSave("MGT_OPT_0010GS.clt", FormQueryString(formObj),"ibflag",false);
                }                	
                doWork("SEARCHLIST");
            }
        break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
        break;
        case "SYSOFCCD_SAVE":
            formObj.f_cmd.value=MODIFY01; 
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true; 
                formObj.action = "MGT_OPT_0011.clt";
                formObj.method = "post";
                formObj.submit();
            }     
        break;        
        case "LOCCD_SAVE":
        	formObj.f_cmd.value=MODIFY02; 
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true; 
                formObj.action = "MGT_OPT_0011.clt";
                formObj.method = "post";
                formObj.submit();
            }     
        break;        
        case "SEQ_SAVE":
            formObj.f_cmd.value=MODIFY03;
            //전체 CellRow의 갯수
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj1.DoSave("MGT_OPT_0011GS.clt", FormQueryString(formObj),"ibflag",false);
            }                	
            
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
    doWork("SEARCHLIST");
    doWork("SEARCHLIST01");  // #856 TB_SEQ 정보변경
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
 * param : sheetObj1 ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('MGT_OPT_0010_HDR'), Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
			             {Type:"DelCheck",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"del" },
			             {Type:"Seq",   Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"seq",       KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",  Hidden:0, Width:220,   Align:"Left",  ColMerge:1,   SaveName:"opt_key",  KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:0,   InsertEdit:1, EditLen:30 },
			             {Type:"Text",  Hidden:0,  Width:200,  Align:"Left",  ColMerge:1,   SaveName:"opt_val",  KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:300 },
			             {Type:"Text",  Hidden:0,  Width:100,  Align:"Center",ColMerge:1,   SaveName:"opt_ofc",  KeyField:0,   CalcLogic:"",   Format:"",   	PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:10 },
			             {Type:"Text",  Hidden:0,  Width:200,  Align:"Left",  ColMerge:1,   SaveName:"opt_prm",  KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:300 },
			             {Type:"Text",  Hidden:0,  Width:400,  Align:"Left",  ColMerge:1,   SaveName:"opt_desc", KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:2000 } ];

			      		InitColumns(cols);
		
			      		SetEditable(1);
			            SetSheetHeight(500);
			      		//resizeSheet();

		   }                                                      
		break;
		case 2:      //IBSheet2 init
			with(sheetObj){
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('MGT_OPT_0011_HDR'), Align:"Center"} ];
			InitHeaders(headers, info);
			
			var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
			             {Type:"DelCheck",  Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"del" },
			             {Type:"Text",  Hidden:0,  Width:200,  Align:"Left",   ColMerge:1,   SaveName:"seq_type",    KeyField:0,   CalcLogic:"",   Format:"",	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",  Hidden:0,  Width:200,  Align:"Left",   ColMerge:1,   SaveName:"cofig_name",  KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:30 },
			             {Type:"Combo",  Hidden:0,  Width:160,  Align:"Left",   ColMerge:1,   SaveName:"pre_fix",     KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:1,   InsertEdit:0, EditLen:300 }
			             
			             ];
			
			InitColumns(cols);
			
			SetEditable(1);
			SetSheetHeight(160);
		      SetImageList(0,APP_PATH+"/web/img/button/btns_search.gif");
		      SetImageList(1,APP_PATH+"/web/img/button/btns_calendar.gif");
			//resizeSheet();
			//SetColProperty("pre_fix", {ComboText:"NO|YES", ComboCode:"N|Y"});
			//SetColProperty(1, "pre_fix", {ComboText:"333|444", ComboCode:"1|2"});
			
		}                                                      
			break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj){
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var loopNum=0;
	var checkVal=false;
	if(sheetObj.RowCount()== 0){
		alert(getLabel('FMS_COM_ALT039')+ "\n\n: MGT_MAC_0010.160");
		isOk=false;
		return isOk;
	}
	/*for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(stat=='I'){
			   checkVal=true;
			   loopNum++;
		   }else if(stat=='U'){
			   checkVal=true;
			   loopNum++;
		   }else if(stat=='D'){
			   checkVal=true;
			   loopNum++;
		   }
		   if(checkVal){
			   if(checkInputVal(sheetObj.GetCellValue(i, 'fm_date'), 8, 8, "T", getLabel('MAC_MSG52'))!='O'){
			    	isOk=false;
			    	break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'to_date'), 8, 8, "T", getLabel('MAC_MSG51'))!='O'){
			    	isOk=false;
			    	break;
			   }
			   if(getDaysBetween2(sheetObj.GetCellValue(i, 'fm_date'),sheetObj.GetCellValue(i, 'to_date')) < 1 ){
				    alert(getLabel('SYS_COM_ALT008') + "\n\n: MGT_MAC_0010.1865");
			    	isOk=false;
			    	break;			   
			   }
			   checkVal=false;
		   }
	   }
	}*/
	/*
	if(loopNum==0){
		//No data to proceed!
		alert(getLabel('FMS_COM_ALT038')+ "\n\n: MGT_MAC_0010.190");
		isOk=false;
	}
	*/
	return isOk;
}
function doDisplay(doWhat, obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar(); 
	        cal.select(obj.f_strdt,  'MM-dd-yyyy');
	        break;
    }
}
/**
* 전체 데이터 저장 완료시
*/
function sheet1_OnSaveEnd(sheetObj, errMsg) {
	//Save success!
	if(errMsg =='' ||errMsg ==undefined||errMsg == null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}

//#617 [Option Management] Not Insert a new row automatically when focus in [DESC.] column at grid and pressing "tab" key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="opt_desc"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}

//#856 [SBM] TB_SEQ 관련 Option 기능 화면 처리 구현 
function sheet2_OnSaveEnd(sheetObj, errMsg) {
	//Save success!
	if(errMsg =='' ||errMsg ==undefined||errMsg == null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	doWork("SEARCHLIST01");
}


function sheet2_OnSearchEnd(sheetObj, row, col) {
	var momthCode = "01|02|03|04|05|06|07|08|09|10|11|12"
	
	var info = {ComboText: prop_cdCode, ComboCode:prop_cdCode };
	sheetObj.CellComboItem(1,"pre_fix", info);
	sheetObj.CellComboItem(2,"pre_fix", {ComboText:"US|UN", ComboCode:"US|UN"} );
	sheetObj.CellComboItem(4, "pre_fix", {ComboText:momthCode, ComboCode:momthCode});
	
	sheetObj.InitCellProperty(5, "pre_fix", {Type:"Text", Format:"", EditLen:6, AcceptKeys:"E",InputCaseSensitive:1});
	sheetObj.InitCellProperty(6, "pre_fix", {Type:"Text", Format:"", EditLen:6, AcceptKeys:"E",InputCaseSensitive:1});
	
	sheetObj.InitCellProperty(3, "pre_fix", {Type:"PopupEdit", Format:"yyyyMM", AcceptKeys:"[0123456789]", EditLen:6});
	
	//var style = {Image: 0, ImgAlign:"Right"};
	//sheetObj.SetCellImageStyle(3, "pre_fix", style);
	
}

function sheet2_OnPopupClick(sheetObj, row, col){	
	if(sheetObj.ColSaveName(col) == "pre_fix"  && row ==3){
		var opt =  { Format:"yyyyMM",CallBack : "dateInsert",CalButtons:"Close"};        
		IBShowCalendar("", opt);
	}
}

function dateInsert(date){
	var sheetObj=docObjects[1];
    var row = sheetObj.GetSelectRow();
    var col = sheetObj.GetSelectCol();
    
    if(date.length == 6){
		sheetObj.SetCellValue(row, "pre_fix", date );
    }else{
    }    
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}