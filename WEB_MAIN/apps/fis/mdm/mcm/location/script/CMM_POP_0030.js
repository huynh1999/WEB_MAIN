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
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("./CMM_POP_0030GS.clt", FormQueryString(formObj) );
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
       	   case "CNTSEARCH":       	   
               	doCntAction();               
    	   break;
    	   case "LOCSEARCH":    	   		
               	doLocTpAction();
    	   break;
       	    case "btn_ok":
   	             var opener=parent.document.sheet1 ;  // opener sheet1 이름은받아오세요
   	             var rows=sheetObject.RowCount() ;
   	             for ( i=0 ; i <= rows ; i++ )
   	             {
   	            	 if ( sheetObject.GetCellValue( i, "chk" ) == 1 ) {
   	                    var iRow=opener.DataInsert(-1);
   	                    for( j=0 ; j < sheetObject.LastCol(); j ++)
   	                    {
   	                        if ( sheetObject.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                         for(k=0 ; k < opener.LastCol(); k ++)
       	                        {
   	                                if ( opener.ColSaveName(k) == sheetObject.ColSaveName(j))
   	                                	opener.SetCellValue( iRow, opener.ColSaveName(k),sheetObject.GetCellValue( i , sheetObject.ColSaveName(j)) ,0);
     	                            }
      	                       }
   	                    }
   	               }
   	             }
   	             ComClosePopup(); 
        	break;
       	    case "CLOSE":
       	    	ComClosePopup(); 
       	    break;	   
       	    //#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
            case "APPLY":
            	selectMultiRow();
    		break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0030.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0030.002");
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
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var arg=parent.rtnary;
	var formObj=document.form;
	var typeList=document.form.s_loc_tp_code;
	
	formObj.openMean.value=arg[0];	
	//[ LHK 20130712 ] 
	// 팝업 윈도우가 호출될 때 Parameter로 Type을 받고 이를 Type 콤보 및 최초 쿼리에 적용되도록 변경 (Type이 없을 때는 All 검색)
	//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
	//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
	if(arg[4] !="" && arg[4] != "undefined" && arg[4] != undefined){	
		var type="";
   		if(arg[0] == "S"){
   			//#25246, 25247 Ocean에 POR, DEL, Final DEST 추가 
   			//#3873 [JAPT]  T/S popup , validation and sync. T/S Port 추가
   			//if(arg[4].id.toLowerCase() == "pol" || arg[4].id.toLowerCase() == "pod"){
   			if(arg[4].id.toLowerCase() == "por" || arg[4].id.toLowerCase() == "pol" || arg[4].id.toLowerCase() == "pod" || arg[4].id.toLowerCase() == "del" || arg[4].id.toLowerCase() == "dest"
   				|| arg[4].id.toLowerCase() == "ts_pol"
   			){
   				type='L01';
   			}
   		}
   		if(arg[0] == "A"){
   			if(arg[4].id.toLowerCase() == "pol" || arg[4].id.toLowerCase() == "dpt" || arg[4].id.toLowerCase() == "ts1"
   				|| arg[4].id.toLowerCase() == "ts2" || arg[4].id.toLowerCase() == "ts3"
   					|| arg[4].id.toLowerCase() == "des" || arg[4].id.toLowerCase() == "air_des"){
   				type='L02';
   			}
   		}
		formObj.s_loc_tp_code.value=type;
	}
	//2009.03.03 정성욱 추가 BL화면에서 OPEN시 CLASS를 LOCATION으로 selected 한다.
	if(arg[1] == "BL"){
		//formObj.s_class[1].selected 		= true;
		//formObj.s_class.disabled 			= true;
		//formObj.s_subconti_code.disabled 	= true;
		//formObj.s_country_code.disabled 	= true;
		//formObj.s_class.remove(3);
		doLocTpAction();
	//Node코드조회	
	}else if(arg[1] == "ND"){
		//formObj.s_class[2].selected 		= true;
		//formObj.s_class.disabled 			= true;
		//formObj.s_subconti_code.disabled 	= true;
		//formObj.s_country_code.disabled 	= true;
		//formObj.s_class.remove(3);
		doLocTpAction();
	//IATA코드조회	
	}else if(arg[1] == "IT"){
		//formObj.s_class[3].selected 		= true;
		//formObj.s_class.disabled 			= true;
		//formObj.s_subconti_code.disabled 	= true;
		//formObj.s_country_code.disabled 	= true;
		doLocTpAction();
		if(arg[3] !="" && arg[3] != "undefined" && arg[3] != undefined){	
			formObj.s_loc_cd.value=arg[3];
		}
	//Service Lane에서 호출시 Location Code Type을 Marine Terminal로 셋팅
	}else if(arg[1] == "SL"){
		doLocTpAction2();		
	}else{
	   if(arg[1] !="" && arg[1] != "undefined" && arg[1] != undefined){	
	     	//formObj.s_conti_code.value = arg[1];
			//formObj.s_cnt_code.value = arg[2];
			//formObj.s_subconti_code.value = arg[1];
			doCntAction();
			//formObj.s_subconti_code.disabled=true;
			//formObj.s_country_code.disabled=true;
			doWork('SEARCHLIST');
		}
		if(arg[3] !="" && arg[3] != "undefined" && arg[3] != undefined){	
			//formObj.s_class.value = arg[3];
			//formObj.s_class.disabled = true;
			doWork('LOCSEARCH');
		}
	}
	//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
	if(arg[5] != undefined){
		formObj.f_MultiSelect.value=arg[5];
	}
	if(formObj.f_MultiSelect.value == "Y"){
		var sheetObj=docObjects[0];
		sheetObj.SetColHidden("chk", 0);
		getObj("btnApply").style.display = "inline";
	}
	// 2011.12.27 value parameter
	formObj.s_loc_nm.value=arg[2];
	
	//ZOOT::TODO
	if(formObj.s_loc_nm.value == ""){
		return;
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
	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	          
	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	          var headers = [ { Text:getLabel('CMM_POP_0030_HDR'), Align:"Center"} ];
	          InitHeaders(headers, info);
	          var formObj=document.form;
	          var cols = [ 
	              //#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21
                  {Type:"CheckBox",  Hidden: 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
                  {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"s_class",      KeyField:0,   CalcLogic:"",   Format:""},
	              {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"loc_code",     KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_name",     KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cnt_nm",       KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"loc_tp_desc",  KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"iata_cd",      KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ams_loc_val",  KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"loc_cd",       KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"loc_nm",       KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"nod_cd",       KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"nod_eng_nm",   KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cnt_cd",       KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"state_cd",     KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"stn_no",       KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"un_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cbsa_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"", UpdateEdit:0 },
	              {Type:"Text",      Hidden:1, Width:0,  Align:"Left",    ColMerge:0,   SaveName:"svc_lane_nm",   KeyField:0,   CalcLogic:"",   Format:"" },
	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
	           
	          InitColumns(cols);
	
	          SetEditable(1);
	          SetFocusAfterProcess(1);
	          SetColProperty('s_class', {ComboText:"LOCATION|NODE", ComboCode:"L|N"} );
	          SetSheetHeight(230);
	          sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheet1.ColSaveName(Col) == "chk"){
		return;
	}
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "loc_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "nod_cd"));
	retArray += sheetObj.GetCellValue(Row, "loc_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "nod_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "loc_name");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ams_loc_val");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "cnt_nm");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "cnt_cd");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "stn_no");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "state_cd");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "cbsa_loc_cd");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "un_loc_cd");
	retArray += "|";	 	
	retArray += sheetObj.GetCellValue(Row, "svc_lane_nm");	
	ComClosePopup(retArray); 
}
/*	#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS 
 * 	addition [CHK)] multi-selection 
 * 	Duc.Nguyen 2017.09.21
 * */
function selectMultiRow(){
	var sheetObj=docObjects[0];
	var retArray="";
	for(i=1; i <= sheetObj.RowCount(); i++){
		if(sheetObj.GetCellValue(i, "chk") == "1"){		
			retArray += sheetObj.GetCellValue(i, "loc_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "nod_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "loc_name");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ams_loc_val");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "cnt_nm");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "cnt_cd");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "stn_no");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "state_cd");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "cbsa_loc_cd");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "un_loc_cd");
			retArray += "|";	 	
			retArray += sheetObj.GetCellValue(i, "svc_lane_nm");	
			retArray += ";";
		}
	}	
	if(retArray != ""){
		ComClosePopup(retArray);
	}else{
		ComShowMessage(getLabel('FMS_COM_ALT004'));	
	}	
}
/**
 * country combo select
 */
function doCntAction(){
	var formObj=document.form;
	var s_subconti_code=formObj.s_subconti_code.value;
	if(s_subconti_code==""){
		document.form.s_country_code.options[0]=new Option( 'All',  ''  );
		document.form.s_country_code.options.length='1';
		return;
	}
	//alert("s_subconti_code===>"+s_subconti_code);
	ajaxSendPost(dispCntAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCountryCombo&s_subconti_code='+s_subconti_code, './GateServlet.gsl');
}
//코드표시 Ajax
function dispCntAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length-1;
			//alert("arrLen===>"+arrLen);
			for(var i=0; i<arrLen; i++){
				var masterVals=rtnArr[i].split(',');	
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				document.form.s_country_code.options[i]=new Option(masterVals[1],masterVals[0]);
			}
			//document.formObj.selectObj.optionObj[4]=new Option('선택 5','value5')
			if(document.form.s_cnt_code.value!=""){
				document.form.s_country_code.value=document.form.s_cnt_code.value;
			}
		}else{
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0030.362");		
	}
}
/**
 * location type combo select
 */
function doLocTpAction(){
	var formObj=document.form;
/*
	var s_class=formObj.s_class.value;
	var com_cd="";// 'C023' location , C025 node
	if(s_class=="NOD"){
		com_cd="C025";
	}else if(s_class=="LOC"){
		com_cd="C023";
	}else {
		document.form.s_loc_tp_code.options[0]=new Option( 'All',  ''  );
		document.form.s_loc_tp_code.options.length='1';
		return;
	}
	//alert("s_class===>"+formObj.s_class.value);
	ajaxSendPost(dispLocTpAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchLocCombo&com_cd='+com_cd, './GateServlet.gsl');
*/
}
//Service Lane에서 호출되는 경우
function doLocTpAction2(){
	document.form.s_loc_tp_code[1].selected=true;
}
//코드표시 Ajax
function dispLocTpAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length-1;			
			//alert("arrLen===>"+arrLen);
			for(var i=0; i<arrLen; i++){
				var masterVals=rtnArr[i].split(',');	
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				document.form.s_loc_tp_code.options[i]=new Option(masterVals[1],masterVals[0]);
			}
			//document.formObj.selectObj.optionObj[4]=new Option('선택 5','value5')
		}else{
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0030.421");		
	}
}
// 2011.12.27 KeyDown
//function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
//	if(keyCode==13){
//		sheet1_OnDblClick(sheetObj, row, col);
//	}
//}
// Enter키 입력(keyDown 인식에러)
function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}