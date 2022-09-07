var rtnary=new Array(1);
var callBackFunc = "";

/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	//setFromToDt(document.form.etd_strdt, document.form.etd_enddt);
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
    		   if(!formValidation()) return;
    		   formObj.f_cmd.value=SEARCHLIST;
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("SEC_BMD_0010GS.clt", FormQueryString(formObj) );
                }
    	   break;
    	   case "ADD":
    		   if(!fncGridCheck()){
    			   return;
    		   }
    	        formObj.f_cmd.value=ADD;
                if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    sheetObj.DoSave("SEC_BMD_0010GS.clt", FormQueryString(formObj),"ibflag",false);
                }
  	       break;
           case "EXCEL":
        	   if(sheetObj.RowCount() < 1){//no data	
	   	   			ComShowCodeMessage("COM132501");
	   	   		}else{
	   	   			sheetObj.Down2Excel( {DownCols:  makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   	   			//sheetObj.Down2Excel(-1,false,false,true,'','',false,false,'',false,'liner_code|Indexing','',false,false);
	   	   		}
           break;
           case "ROWADD":
           		var intRow=sheetObj.LastRow() + 1;
               	sheetObj.DataInsert(intRow);
           break;
           case "LOADEXCEL":   //엑셀업로드
        	   sheetObj.LoadExcel({ Mode:"HeaderMatch",WorkSheetNo:"1"});
        	   //sheetObj.LoadExcel(true,1);
		   break;
		   case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
//		   		rtnary[1]=formObj.s_liner_name.value;
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp=LN', rtnary, 1150,650,"yes");
           break;
           case "Port_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]="IT";
//		   		rtnary[2]=formObj.s_port_name.value;
//		   		rtnary[3]=formObj.s_port_code.value;
		   		rtnary[2]="";
		   		rtnary[3]="";
		   		
		   		callBackFunc = "Port_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 812,415,"yes");
           break;       
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
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
	        var cal=new ComCalendarFromTo();
	        cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
	    break;   
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.select(formObj.eta_strdt, formObj.eta_enddt, 'MM-dd-yyyy');
        break;
        /*case 'DATE12':   //?? ?? From ~ To ?? ?? 
            var cal=new ComCalendarFromTo();
            cal.setDisplayType('date');
            cal.select(formObj.eta_strdt, formObj.eta_enddt, 'MM-dd-yyyy');
        break;*/
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
	//document.form.f_CurPage.value = 1;
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
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.form;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.ofc_cd);
	
    for(var i = 0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    removeFirstKeyField(docObjects[0]);
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
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('SEC_BMD_0010_HDR_1'), Align:"Center"},
				{ Text:getLabel('SEC_BMD_0010_HDR_2'), Align:"Center"} ];
				InitHeaders(headers, info);
				var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
				{Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
				{Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seqno",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"liner_code",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				{Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"liner_name",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
				{Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"port_code",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
				{Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"node_code",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"port_name",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"PopupEdit", Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"vessel_code",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
				{Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vessel_name",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"voyage",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6},
				{Type:"Date", 	   Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"etd",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Date", 	   Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"eta",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"remark",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
				{Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"created_by",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"created_dt",   KeyField:0,   CalcLogic:"",   Format:"YmdHms",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"modified_by",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"modified_dt",  KeyField:0,   CalcLogic:"",   Format:"YmdHms",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"branch",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"liner_abbr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				{Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
				InitColumns(cols);
				SetEditable(1);
				//InitViewFormat(0, "etd", "MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
				SetColProperty(0 ,"liner_code", {AcceptKeys:"E|N|[-,/ .;:]", InputCaseSensitive:1});
	            SetColProperty(0 ,"port_code", {AcceptKeys:"E|N|[-,/ .;:]", InputCaseSensitive:1});
	            SetColProperty(0 ,"vessel_code", {AcceptKeys:"E|N|[-,/ .;:]", InputCaseSensitive:1});
	            
	            SetColProperty(0 ,"voyage", {AcceptKeys:"E|N|[-,/ .;:]", InputCaseSensitive:1});
	            SetColProperty(0 ,"liner_name" , {AcceptKeys:"E|N|[-]" , InputCaseSensitive:1});
	            SetSheetHeight(450);
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
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	removeFirstKeyField(sheet1);
} 

function removeFirstKeyField(sheetObj) {
	$($('#DIV_' + ((typeof sheetObj == "string") ? sheetObj : sheetObj.id)).find('span.GMKeyfield')[0]).remove();
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	if(errMsg=="" || errMsg==undefined || errMsg==null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
var cur_row;
function sheet1_OnPopupClick(sheetObj,Row,Col){
	cur_row = Row;
    switch (sheetObj.ColSaveName(Col)) {
	    case "liner_code" :
	        rtnary=new Array();
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "sheet1_OnPopupClick_liner_code";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		    
	    break;
//        case "etd" :
//            var cal=new ComCalendarGrid_select();
//            cal.select(sheetObj, Row, Col, 'MM-dd-yyyy');
//        break;
//        case "eta" :
//            var cal=new ComCalendarGrid_select();
//            cal.select(sheetObj, Row, Col, 'MM-dd-yyyy');
//        break;
        case "port_code" :
            rtnary=new Array(1);
//	   		rtnary[0] = "1";
//	   		rtnary[1] = "";
            rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]="";
	   		callBackFunc = "sheet1_OnPopupClick_port_code";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
        break;
		case "vessel_code":		
    		rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";
			callBackFunc = "sheet1_OnPopupClick_vessel_code";
			modal_center_open('./CMM_POP_0140.clt', rtnary, 657,470,"yes");
			
    	break;
    }
}
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.form;
	switch (sheetObj.ColSaveName(Col)) {
		case "liner_code" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('liner', sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
    	case "port_code" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('location', sheetObj.GetCellValue(Row, Col), 'Sheet');
		break;
		case "vessel_code" :
			ctlCol=Col;
			ctlRow=Row;
			codeNameAction('vessel', sheetObj.GetCellValue(Row, Col),   'Sheet');
		break;
	}
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	if(obj.value != ""){
		if(tmp=="onKeyDown"){
			if(event.keyCode==13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					str=sub_str;
				}else if(sub_str=="partner_"){
					str='trdpcode';
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if(tmp=="onBlur"){
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="location"){
				str=sub_str;
			}else if(sub_str=="partner_"){
				str='trdpcode';
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}else if(tmp=="Sheet"){
			if(str=='liner'){
				str='trdpcode';
				CODETYPE='liner';
			}else if(str=="location"){
				str='location';
				CODETYPE='location';	
			}else if(str=="vessel"){
				str='srvessel';
				CODETYPE='vessel';
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+obj, './GateServlet.gsl');			
		}
	}else{
		if(obj.name == "s_liner_code"){
			formObj.s_liner_name.value="";
			formObj.s_liner_abbr.value="";
		}else if(obj.name == "s_port_code"){
			formObj.s_port_name.value="";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var sheetObj=docObjects[0];
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="partner"){
				sheetObj.SetCellValue(ctlRow, ctlCol,masterVals[0]);//trdp_cd
			}else if(CODETYPE =="partner_text"){
				formObj.s_liner_code.value=masterVals[0];
				formObj.s_liner_abbr.value=masterVals[2];
				formObj.s_liner_name.value=masterVals[3]; 
			}else if(CODETYPE =="location_text"){
				formObj.s_port_code.value=masterVals[0];
				formObj.s_port_name.value=masterVals[3];
			}else if(CODETYPE =="liner"){
				sheetObj.SetCellValue(ctlRow, "liner_code",masterVals[0],0);
				sheetObj.SetCellValue(ctlRow, "liner_abbr",masterVals[2],0);
				sheetObj.SetCellValue(ctlRow, "liner_name",masterVals[3],0);
			}else if(CODETYPE =="location"){
				sheetObj.SetCellValue(ctlRow, "port_code",masterVals[0],0);
				sheetObj.SetCellValue(ctlRow, "node_code",masterVals[1],0);
				sheetObj.SetCellValue(ctlRow, "port_name",masterVals[3],0);
			}else if(CODETYPE =="vessel"){
				sheetObj.SetCellValue(ctlRow, "vessel_code",masterVals[0],0);
				sheetObj.SetCellValue(ctlRow, "vessel_name",masterVals[3],0);
			}
		}else{
			if(CODETYPE =="partner"){
				sheetObj.SetCellValue(ctlRow, ctlCol,"");
			}else if(CODETYPE =="partner_text"){
				formObj.s_liner_code.value="";
				formObj.s_liner_abbr.value="";
				formObj.s_liner_name.value="";
			}else if(CODETYPE =="location_text"){
				formObj.s_port_code.value="";
				formObj.s_port_name.value="";
			}else if(CODETYPE =="liner"){
				sheetObj.SetCellValue(ctlRow, "liner_code","",0);
				sheetObj.SetCellValue(ctlRow, "liner_abbr","",0);
				sheetObj.SetCellValue(ctlRow, "liner_name","",0);
			}else if(CODETYPE =="location"){
				sheetObj.SetCellValue(ctlRow, "port_code","");
				sheetObj.SetCellValue(ctlRow, "node_code","");
				sheetObj.SetCellValue(ctlRow, "port_name","");
			}else if(CODETYPE =="vessel"){
				sheetObj.SetCellValue(ctlRow, "vessel_code","");
				sheetObj.SetCellValue(ctlRow, "vessel_name","");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function fncGridCheck(){
	var sheetObj=docObjects[0];
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
if ( sheetObj.GetCellValue(i, 'liner_code') == '') {
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CARR'));
			sheetObj.SelectCell(i, 'liner_code');
			return false;
		}	
	}
	return true;
}
function formValidation(){
	var formObj=document.form;
	if(!chkSearchCmprPrd(false, form.etd_strdt, form.etd_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, form.eta_strdt, form.eta_enddt)){
		return false;
	}
    return true;
}
//Calendar flag value
var firCalFlag=false;
function LINER_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		formObj.s_liner_code.value=rtnValAry[0];
		formObj.s_liner_abbr.value=rtnValAry[1];
		formObj.s_liner_name.value=rtnValAry[2];   
	} 
}
function Port_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		formObj.s_port_code.value=rtnValAry[0];
		formObj.s_port_name.value=rtnValAry[2];
	}
}
function sheet1_OnPopupClick_liner_code(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "liner_code",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "liner_abbr",rtnValAry[1]);
		docObjects[0].SetCellValue(cur_row, "liner_name",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_port_code(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "port_code",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "node_code",rtnValAry[1]);
		docObjects[0].SetCellValue(cur_row, "port_name",rtnValAry[2]);
	}
}
function sheet1_OnPopupClick_vessel_code(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
  		var rtnValAry=rtnVal.split("|");
  		docObjects[0].SetCellValue(cur_row, "vessel_code",rtnValAry[0]);
  		docObjects[0].SetCellValue(cur_row, "vessel_name",rtnValAry[1]);
	}
}
//#445 [Vessel Schedule] Cannot insert a new row by pressing Tab key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="branch"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}