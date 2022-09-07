function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
    try {
        switch(srcName) {
           case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 0)){
                	sheetObj.DoSearch("TopCodeMngGS.clt", FormQueryString(formObj) );
                }
           break;
           case "ADD":
                formObj.f_cmd.value=ADD;
                if(inpuValCheck(sheetObj, ADD)){
                    //전체 CellRow의 갯수
                    //if(confirm(getLabel('FMS_COM_CFMSAV'))){
                        doProcess=true;
                        sheetObj.DoSave("TopCodeMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    //}
                }
           break;
           /*
           case "MODIFY":
                formObj.f_cmd.value=MODIFY;
                if(inpuValCheck(sheetObj, MODIFY)){
                    if(confirm(getLabel('FMS_COM_CFMSAV'))){
                        doProcess=true;
                        sheetObj.DoSave("TopCodeMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    }
                }
           break;
           */
           case "EXCEL":
//               sheetObj.Down2Excel(1,false,false,true,'','',false,false,'',false);
        	   if(sheetObj.RowCount() < 1){//no data	
	   	   			ComShowCodeMessage("COM132501");
	   	   		}else{
	   	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   	   		}
           break;
           case "ROWADD":
  				var intRows = sheetObj.LastRow() + 1;
   				sheetObj.DataInsert(intRows);
           break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: TopCodeMng.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: TopCodeMng.002");
        }
    }
}
/**
 * 입력값 체크
 */
function inpuValCheck(sheetObj, f_cmd){
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var loopNum=0;
	var checkVal = false;
	for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(stat=='I'){
			   checkVal=true;
			    if(!chkReqField(sheetObj, i)){
			    	return false;
			    }
			    var com_cd=sheetObj.GetCellValue(i, 'com_cd');
			    var prnt_com_cd=sheetObj.GetCellValue(i, 'prnt_com_cd');
			   var comChkCnt=0;
			   var prntChkCnt=0;
			   //alert("prnt_com_cd-------------------->"+prnt_com_cd);
			   //alert("sheetObj.GetCellValue(j, 'com_cd')----->"+sheetObj.GetCellValue(j, 'com_cd'));
			   for(var j=1; j < rowCnt; j++){
				   if(prnt_com_cd == "" || prnt_com_cd == sheetObj.GetCellValue(j, 'com_cd')){
					   //alert("for문    "+sheetObj.GetCellValue(j, 'com_cd'));
					   prntChkCnt=j;
				   }
				   if(i != j && com_cd == sheetObj.GetCellValue(j, 'com_cd')){
					   comChkCnt=j;
				   }
			   }
			   if(comChkCnt > 0){
				   //[@] The code is already used!\nPlease check the code!
				   alert(getLabel('SYS_COM_ALT007') + " - " + getLabel2('FMS_COD_PARA', new Array(sheetObj.GetCellValue(i, 'com_cd'))) + "\n\n: TopCodeMng.88");
				   checkVal=false;
				   isOk=false;
				   break;
			   }
			   if(prntChkCnt > 0){
				   checkVal=true;
			   }else{
				   //Please check the Parent Code of [@] Code!!
				   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COD_PARA', new Array(sheetObj.GetCellValue(i, 'com_cd'))) + "\n\n: TopCodeMng.98");
				   checkVal=false;
				   isOk=false;
				   break;
			   }
			   loopNum++;
		   }else if(stat=='U'){
			   checkVal=true;
			    if(!chkReqField(sheetObj, i)){
			    	return false;
			    }
			    var prnt_com_cd=sheetObj.GetCellValue(i, 'prnt_com_cd');
			   var prntChkCnt=0;
			   for(var k=1; k < rowCnt; k++){
				   if(prnt_com_cd == "" || prnt_com_cd == sheetObj.GetCellValue(k, 'com_cd')){
					   prntChkCnt=k;
				   }
			   }
			   if(prntChkCnt > 0){
				   checkVal=true;
			   }else{
				   //Please check the Parent Code of [@] Code!!
				   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COD_PARA', new Array(sheetObj.GetCellValue(i, 'com_cd'))) + "\n\n: TopCodeMng.121");
				   checkVal=false;
				   isOk=false;
				   break;
			   }
			   loopNum++;
		   }else if(stat=='D'){
			   loopNum++;
		   }
		   checkVal=false;
	   }
	}
	/*
	if(loopNum==0){
		if(f_cmd==ADD){
			//There is nothing to register!
		}else if(f_cmd==MODIFY){
			//There is no change to UPDATE!
		}
		isOk=false;
	}
	*/
	return isOk;
}
function chkReqField(sheetObj, i){
	   var isOk=true;
	   if(checkInputVal(sheetObj.GetCellValue(i, 'com_cd_nm'), 5, 100, "T", getLabel('ITM_CDNM'))!='O'){
		   isOk=false;
	   }else if(checkInputVal(sheetObj.GetCellValue(i, 'prnt_com_cd'), 0, 6, "T", getLabel('ITM_PRNTCD'))!='O'){
			isOk=false;
	   }else if(checkInputVal(sheetObj.GetCellValue(i, 'ref_cd'), 0, 20, "T", getLabel('ITM_REFCD'))!='O'){
			isOk=false;
	   }else if(checkInputVal(sheetObj.GetCellValue(i, 'cd_spc_qty'), 1, 7, "N", getLabel('ITM_CDLEN'))!='O'){
			isOk=false;
	   }else if(checkInputVal(sheetObj.GetCellValue(i, 'rmk'), 1, 400, "T", getLabel('ITM_RMK'))!='O'){
			isOk=false;
	   }
	   return isOk;
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
    doWork('SEARCHLIST');
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
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('TOMCD_HDR1'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
        	              {Type:"DelCheck",  Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"resetChk" },
        	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"com_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:6 },
        	              {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"com_cd_nm",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
        	              {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"prnt_com_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
        	              {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"ref_cd",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
        	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cd_spc_qty",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:0,   SaveName:"sys_cd_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"use_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"rmk",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 } ];
        	        
        	       InitColumns(cols);

        	       SetEditable(1);
        	                   
        	       SetColProperty(7, {ComboText:"SystemCode|UserCode", ComboCode:"Y|N"} );
              	   SetColProperty(8, {ComboText:"Enable|Disable", ComboCode:"Y|N"} );
              	   SetSheetHeight(550);
              	   SetColProperty(0 ,"com_cd", {AcceptKeys:"E|N" , InputCaseSensitive:1});
                   SetColProperty(0 ,"prnt_com_cd", {AcceptKeys:"E|N|" , InputCaseSensitive:1});
                   SetColProperty(0 ,"ref_cd", {AcceptKeys:"E|N|" , InputCaseSensitive:1});
                   SetColProperty(0 ,"cd_spc_qty" , {AcceptKeys:"N"});
                   resizeSheet();
           }                                                      
           break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

 /**
  * IBSheet 이벤트 처리후 이벤트를 받아서 처리하기 위한 메소드임
  */
function sheet1_OnSaveEnd(sheetObj, errMsg){
 	//Ajax로  Role 코드정보를 조회하여 Opener에 표시함
 	//ajaxSendPost(callback, param, data, url)
 	//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=rolecd', './GateServlet.gsl');
 	if(errMsg=="" ||errMsg==undefined|| errMsg==null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
 	}
 }

//#604 [Master Code] Do not insert a new row when press tab key.
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="rmk"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}

function fncSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}

function sheet1_OnDblClick(sheetObj,Row,Col){ 
	var formObj=document.frm1;
	var titleStr = "";
	var paramStr = "";

	if(sheetObj.SearchRows() == 0){
		//There is no data
		alert(getLabel('FMS_COM_ALT010')+ "\n\n: ACC_JOR_0060.102");
		return;
	}else{
		
		if(docObjects[0].GetCellValue(Row, "com_cd") == ''){
		 	return;
		}
		
		//paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+v_intg_bl_seq + "&f_bl_no="+escape(docObjects[0].GetCellValue(Row, "hbl_no"));
		tnsParm = "&com_cd="+sheetObj.GetCellValue(Row, "com_cd")+"&cd_spc_qty="+sheetObj.GetCellValue(Row, "cd_spc_qty");
		//tnsParm = "&com_cd="+sheetObj.GetCellValue(Row, "com_cd")+"&cd_spc_qty="+sheetObj.GetCellValue(Row, "cd_spc_qty")+"&f_chk="+Y;
		titleStr="Sub Code";
		paramStr="./SubCodeMng.clt?f_cmd=-1"+tnsParm;
		parent.mkNewFrame(titleStr, paramStr);

	}

}