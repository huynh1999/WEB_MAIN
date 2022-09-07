function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var formObj=document.frm1;
	try {
        switch(srcName) {
       	   case "CLOSE":
       		   ComClosePopup();
       	   break;	   
       	   case "SEARCH":
       		    sheetObj1.RemoveAll();
	       		formObj.f_cmd.value=SEARCHLIST02;
	       		sheetObj.DoSearch("AIE_STK_0011GS.clt", FormQueryString(formObj) );
       	   break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: AIE_STK_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: AIE_STK_0010.002");
        } 	
	}
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
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
	var formObj=document.frm1;
	frm1.branch_in.value=arg[1];
	//frm1Obj.openMean.value = arg[0];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //BRANCH 를 조회한다.
    //CODETYPE   = "Branch";
	//ajaxSendPost(commaonSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=commonCode&codeType='+CODETYPE, './GateServlet.gsl');
	//formObj.branch_in.value 	= arg[1];
	//formObj.stk_tp_cd_in.value  = arg[2];
    var sheetObj=docObjects[0];
	//그리드 정보를 조회한다. Stock Summary	
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj.DoSearch("AIE_STK_0011GS.clt", FormQueryString(formObj) );
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
            var headers = [ { Text:getLabel('AIE_STK_0010_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:1, Width:75,   Align:"Center",  ColMerge:0,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,   SaveName:"iata_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,   SaveName:"aloc_area_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"allc_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:0,   SaveName:"s_use_tot",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:0,   SaveName:"s_stk_tot",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             
            InitColumns(cols);

            SetEditable(0);
            SetHeaderRowHeight(20 );
            SetSheetHeight(150);
		   }                                                      
		 break;
    	 case 2:      //IBSheet1 init
            with (sheetObj) {
    	        
    	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

    	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	        var headers = [ { Text:getLabel('AIE_STK_0010_HDR2'), Align:"Center"} ];
    	        InitHeaders(headers, info);

    	        var cols = [ {Type:"Date",      Hidden:0,  Width:80,  Align:"Center",  ColMerge:0,   SaveName:"allc_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"mbl_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"edi_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
    	               {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N",   Width:100,   Align:"Center",  ColMerge:0,   SaveName:"pre_bkg_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:-1 },
    	               {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N",   Width:50,   Align:"Center",  ColMerge:0,   SaveName:"usd_flag",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:-1 } ];
    	         
    	        InitColumns(cols);

    	        SetEditable(0);
    	        SetHeaderRowHeight(20 );
    	        SetSheetHeight(250);
           }                                                      
           break;
    }
}
//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	sheetObj.SelectCell(1,0);
	if(sheetObj.GetCellValue(1, "allc_dt") != ""){
		formObj.allc_dt_in.value=sheetObj.GetCellValue(1, "allc_dt");
		formObj.trdp_cd_in.value=sheetObj.GetCellValue(1, "trdp_cd");
		//포커스색상을 준다.
		for(var i=0; i<sheetObj.LastCol(); i++){
			sheetObj.SetRowBackColor(1,"#DFFFFF");
			for(var j=1; j<=sheetObj.RowCount(); j++){
				if(j != 1){
					sheetObj.SetRowBackColor(j,"#EFEBEF");
				}
			}
		}
		//Stock List 
		formObj.f_cmd.value=SEARCHLIST01;
		sheetObj1.DoSearch("AIE_STK_0010GS.clt", FormQueryString(formObj) );
	}
}
//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet2_OnSearchEnd(){
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
}
//OnDblClick(Row,Col) 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	//포커스색상을 준다.
	for(var i=0; i<sheetObj.LastCol(); i++){
		sheetObj.SetRowBackColor(Row,"#DFFFFF");
		for(var j=1; j<=sheetObj.RowCount(); j++){
			if(j != Row){
				sheetObj.SetRowBackColor(j,"#EFEBEF");
			}
		}
	}
	formObj.allc_dt_in.value=sheetObj.GetCellValue(Row, "allc_dt");
	formObj.branch_in.value=sheetObj.GetCellValue(Row, "aloc_area_cd");
	formObj.trdp_cd_in.value=sheetObj.GetCellValue(Row, "trdp_cd");
	//Stock List 
	formObj.f_cmd.value=SEARCHLIST01;
	sheetObj1.DoSearch("AIE_STK_0010GS.clt", FormQueryString(formObj) );
}
function sheet2_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var retArray="";	
	if(sheetObj1.GetCellValue(Row,"usd_flag") == 1){
//		alert("This MAWB No. is already used. Please select another MAWB No.");
		alert(getLabel('AIR_MSG_028'));
		return;
	}else{
		retArray += sheetObj1.GetCellValue(Row, "mbl_no");
		ComClosePopup(retArray);
	}
}
function sheet2_OnMouseMove(Button, Shift, X, Y) {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
    var formObj=document.frm1;
    var Row=sheetObj1.MouseRow();
    var Col=sheetObj1.MouseCol();
    //no support[check again]CLT sheetObj1.MouseToolTipText="";
    //window.status = "OnMouseMove Row=" + Row + ", Col=" + Col + ", Text=" + sText;
  	if(Col == 5){
  		var sText=sheetObj1.GetCellText(Row,Col);
  		//풍선도움말 만들기]
  		if(sText.length > 20  ){
  			sheetObj1.ToolTipOption="balloon:true;width:320;backcolor:#EBFFFF;forecolor:#333333;title:상세내용";  
  			sheetObj1.MouseToolTipText=sText;
  			sheetObj1.SetMousePointer("Default");
  			window.status=sheetObj1.GetMousePointer;
  		}
  	}
}
//공통 코드표시 Ajax
function commaonSelectAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			//AIR
			if(CODETYPE == "Branch"){
				for( var i=0; i < arrLen-1 ; i++ ){
					var masterVals=rtnArr[i].split('@^');
					formObj.branch_in.options[i]=new Option(masterVals[1],masterVals[0]);
				}
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: AIE_STK_0010.331");		
	}
}
function doSearchEvent(){
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	formObj.f_cmd.value=SEARCHLIST02;
	sheetObj1.DoSearch("AIE_STK_0011GS.clt", FormQueryString(formObj) );
}
