//=========================================================
//*@FileName   : MGT_JOB_0010.jsp
//*@FileTitle  : Job Management
//*@Description: Trade Partner ManagementList
//*@author     : Phitran
//*@since      :06/11/2014
//*@Change history:
//	<script language="javascript" src="<%=CLT_PATH%>/web/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js"></script>
//=========================================================
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
    var sheetObj1=docObjects[0];
    var sheetObj2=docObjects[1];
    switch(srcName) {
    	//NEW 버튼을 눌렀을때 Default 데이터를 조회한다.
       case "NEW":
	          formObj.tmplt_nm.value="";
	          formObj.description.value="";	
	          formObj.template_code.value="";
	          docObjects[1].RemoveAll();
			break;
       case "SEARCHLIST":
    	   if(formObj.category_code.value == ""){
    		   //Choose from the [Template List].
    		   alert(getLabel('FMS_COM_ALT014'));    		   
    	   }else{
	           formObj.f_cmd.value=SEARCHLIST;
	           formObj.tmplet_del.checked=false;
	           formObj.f_Flag.value="U";
	           if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
	        	   sheetObj1.DoSearch("MGT_JOB_0010_1GS.clt", FormQueryString(formObj) );
	           }
	           doBseAction();
	           formObj.tmplt_nm.value="";
	           formObj.description.value="";
	           formObj.template_code.value="";
	           docObjects[1].RemoveAll();
    	   }
       break;
       case "ROWADD":
   	   	var intRows=sheetObj2.LastRow() + 1;
	   	  sheetObj2.DataInsert(intRows);
	   	  sheetObj2.SetCellValue(intRows, "use_flg","1");
	   	  sheetObj2.SetCellEditable(intRows, "seq",0);
      break;
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("MGT_JOB_0010GS.clt", FormQueryString(formObj) );
       break;       
       case "MODIFY1":  
    	   formObj.f_cmd.value=MODIFY;
    	 //삭제
    	   if(formObj.tmplet_del.checked == true){
     		  formObj.tmp_del.value="Y";     		  
	     	  doWork("REMOVE");

			}else{
			  //NULL체크
			  if(checkAddModiVal(frm1)){
				  if (confirm(getLabel('FMS_COM_CFMSAV'))){
					  doProcess=true;
				      sheetObj2.DoAllSave("MGT_JOB_0010GS.clt", FormQueryString(formObj),"ibflag",false);
				  }
			  }
			}
   	   break;
       case "REMOVE": //Template Delete check
    	   if ( confirm(getLabel('FMS_COM_CFMDEL')) ) {
    	   	   formObj.f_cmd.value=REMOVE;
    	   	   formObj.work_flg.value="REMOVE";
    	   	   
 	           for(var i=1 ; i <= sheetObj1.LastRow(); i++){
			       sheetObj1.SetCellValue(i, "ibflag","D");
			   }
 	           formObj.tmp_seq.value=formObj.template_code.value;
			   doProcess=true;
	    	   sheetObj1.DoSave("MGT_JOB_0010_1GS.clt", FormQueryString(formObj),"ibflag",false);
    		   formObj.tmplt_nm.value="";
    		   formObj.description.value="";
    		   formObj.tmplet_del.checked=false;
    		   docObjects[1].RemoveAll();
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
    doWork('SEARCHLIST');
   // doWork('SEARCHLIST01');
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
			      var headers = [ { Text:getLabel('MGT_JOB_0010_HDR_1'), Align:"Center"} ];
			      InitHeaders(headers, info);
			      var cols = [ {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
			             {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"tmplt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",   ColMerge:1,   SaveName:"descr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             ];
			       
			      InitColumns(cols);
			      sheetObj.SetDataLinkMouse("tmplt_nm",1);
			      SetEditable(0);
			      SetSheetHeight(500);
			      resizeSheet();
	            }

                                       
		break;
		case 2:      //IBSheet1 init
		    with(sheetObj){
			       
			      //(8, 0, 0, true);
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('MGT_JOB_0010_HDR'), Align:"Center"} ];
			      InitHeaders(headers, info);
			      var cols = [ {Type:"DelCheck", Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",    KeyField:0,   CalcLogic:"",   Format:"",   PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
			             {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,  SaveName:"ibflag" },
			             {Type:"Text",      Hidden:1, Width:80,  Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_seq", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:200, Align:"Left",    ColMerge:1,   SaveName:"jb_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0, Width:100, Align:"Center",  ColMerge:1,   SaveName:"srt_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Combo",     Hidden:0, Width:300, Align:"Left",    ColMerge:1,   SaveName:"bse_tm_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },			             
			             {Type:"Float",     Hidden:0, Width:100, Align:"Center",  ColMerge:1,   SaveName:"pln_itval_hrs",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",     Hidden:0, Width:100, Align:"Center",  ColMerge:1,   SaveName:"act_itval_hrs",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:150, Align:"Right",   ColMerge:1,   SaveName:"xter_dp_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:150, Align:"Right",   ColMerge:1,   SaveName:"eml_snd_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"CheckBox",  Hidden:0, Width:150, Align:"Center",  ColMerge:1,   SaveName:"use_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:80,  Align:"Left",    ColMerge:1,   SaveName:"jb_tmplt_itm_seq", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
			             ];
			       
			      InitColumns(cols);
		
			      SetEditable(1);
       	      	  SetColProperty(0 ,"srt_seq",     {AcceptKeys:"N"});
       	      	  SetColProperty(0 ,"pln_itval_hrs" , {AcceptKeys:"N|[-+]"});
    	          SetColProperty(0 ,"act_itval_hrs" , {AcceptKeys:"N|[-+]"});
    	          
    	         // sheetObj.SetColProperty("bse_tm_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
    	           	          
			      SetSheetHeight(452);
			      resizeSheet();
	            }
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}
/**
 * 수정가능/불가능을 체크
 */
function modi_yn(){
	var sheetObj2=docObjects[1];
var flag=sheetObj2.GetCellValue(2, "modi_flg");
	//alert(flag);
    if(flag == "false" ){
    	document.getElementById("delete_btn").style.display='none';
    	getBtnObj("save_btn").style.display='none';
	}else{    	
    	document.getElementById("delete_btn").style.display='block';
    	getBtnObj("save_btn").style.display='none';
	}
}
//조회 후 그리드 데이터를 각 필드에 셋팅한다.
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
    if ((formObj.category_code.value == "SO")||(formObj.category_code.value == "SI")){	
    	docObjects[1].SetColProperty("jb_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
    }else if ((formObj.category_code.value == "AO")||(formObj.category_code.value == "AI")){
    	docObjects[1].SetColProperty("jb_cd", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
    }
    
	//NEW버튼 눌렀을때
	if( formObj.f_cmd.value == SEARCHLIST01){	
 		for(var i=1 ; i <= sheetObj1.LastRow(); i++){
			sheetObj1.SetCellValue(i, "dur_tm_qty",0,0);
			//NEW일경우 ibflg를 I로 셋팅해준다.
			sheetObj1.SetCellValue(i, "ibflag","I");
		}
	}else{//조회했을때
		//삭제를 위해 jb_tmplt_seq를 hidden으로 셋팅한다.
		formObj.tmp_seq.value=formObj.template_code.value;
	}
}
function sheet2_OnSearchEnd(){
	doBseAction();
}
function sheet2_OnSaveEnd(sheetObj, errMsg){ //전체 새로고침이 됨~~~~~~~~~~~
	/*  
	var opener=window.dialogArguments;
	  if (!opener) opener=window.opener;  //이 코드 추가할것
	  if (!opener) opener=parent; //이 코드 추가할것"
	  
	  opener.doWork("SEARCHLIST"); //상위 우측 새로고침
*/
}
function sheet1_OnClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "tmplt_nm"){
		if(sheetObj.GetCellValue(Row, "ibflag") != 'I'){
		    var formObj = document.frm1;
		    formObj.template_code.value = docObjects[0].GetCellValue(Row, "jb_tmplt_seq");
		    doWork('SEARCHLIST01');
		    document.frm1.tmplt_nm.value = docObjects[0].GetCellValue(Row, "tmplt_nm");
			document.frm1.description.value = docObjects[0].GetCellValue(Row, "descr");
		}
	}
}
function checkAddModiVal(frm1){
	var formObj=document.frm1;
    if(checkInputVal(formObj.tmplt_nm.value, 1, 20, "T", getLabel('TMP_NAME'))!='O'){
    	return false;
    } else if(checkInputVal(formObj.description.value, 1, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    }
    /*
	var dupRow=docObjects[1].ColValueDup("jb_cd");
	if(dupRow > 0){
		alert(getLabel('FMS_COM_ALT008'));
		return false;
	}
     */
    return true;
}
function doBseAction(){
	//조회조건 Templet List 검색
		var formObj=document.frm1;	
		var category_code=formObj.category_code.value;
		ajaxSendPost(dispCntAjaxReq, 'reqVal', '&goWhere=aj&bcKey=seachBaseTimeCombo&clss_cd='+category_code, './GateServlet.gsl');
	}
function doBseInfoAction(bseCD){
	var formObj = document.frm1;
	var bse_tm_cd ;
		ajaxSendPost(dispInfoAjaxReq, 'reqVal', '&goWhere=aj&bcKey=seachBaseTimeInfo&bse_tm_cd='+bseCD, './GateServlet.gsl');		
}
//BaseTime List 조회
function dispCntAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함			
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			var PARAM1_1="";
			var PARAM1_2="";
				for( var i=1; i < arrLen ; i++ ){
					var masterVals=rtnArr[i-1].split(',');	
					//alert("masterVals[0]===>"+masterVals[0]);
					//alert("masterVals[1]===>"+masterVals[1]);
					//document.frm1.template_code2.options[i]=new Option(masterVals[1],masterVals[0]);
					PARAM1_1 = PARAM1_1+"|"+masterVals[1];
					PARAM1_2 = PARAM1_2+"|"+masterVals[0];	
				}	
				docObjects[1].SetColProperty("bse_tm_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
		}else{
			docObjects[1].SetColProperty("bse_tm_cd", {ComboText:"", ComboCode:""} );
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function sheet2_OnChange(sheetObj, Row, Col){
	if(sheetObj.ColSaveName(Col) == "bse_tm_cd"){
		var bseCD = sheetObj.GetCellValue(Row, Col);		
		SELECTROW=Row;
		doBseInfoAction(bseCD);
	}
}
//BaseTime Info
function dispInfoAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함			
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
				for( var i=1; i < arrLen ; i++ ){
					var masterVals=rtnArr[i-1].split(',');	
					//alert("masterVals[0]===>"+masterVals[0]);
					//alert("masterVals[1]===>"+masterVals[1]);
					docObjects[1].SetCellValue(SELECTROW,"pln_itval_hrs",masterVals[0]);
					docObjects[1].SetCellValue(SELECTROW,"act_itval_hrs",masterVals[1]);
				}	
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function fncGridCheck() {
	var formObj=document.frm1;
	if(formObj.tmplt_nm.value == "" || formObj.description.value ==""){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('TMP_NAME') +" & "+ getLabel('DESC'));
		return false;
	}	
	/*
	var sheetObj2=docObjects[1];
	var intRow=sheetObj2.LastRow() + 1;
	
	for( var i=1 ; i < intRow ; i++ ) {
        if( trim(sheetObj2.GetCellValue(i, "bse_tm_nm")) == "" || sheetObj2.GetCellValue(i, "bse_tm_nm") == null){
			alert(getLabel('FMS_COM_ALT007'));
			return false;
		}
	}
	*/
	return true;
}
/*
//Name / Description 조회
function seachTemplateInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(',');
			var arrLen=rtnArr.length;
			document.frm1.tmplt_nm.value=rtnArr[0];
			document.frm1.description.value=rtnArr[1];
			document.frm1.basic_time.value=rtnArr[2];
			document.frm1.cal_loc.value=rtnArr[3];
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}	
}

function rowUp(){
	var sheetObj=docObjects[0];
	var selRow=sheetObj.GetSelectionRows();
	if(Number(sheetObj.GetCellValue(selRow, "srt_seq")) > 1){
		//선택한 Row를 한줄 위로 올린다.
	sheetObj.SetCellValue(selRow, "srt_seq",Number(sheetObj.GetCellValue(selRow, "srt_seq")) - 1,0);
		//한줄위의 Row를 한줄 아래로 내린다.
		sheetObj.SetCellValue(Number(selRow)-1, "srt_seq",selRow,0);
		//정렬을 한다.
		sheetObj.ColumnSort("srt_seq","ASC");
		//포커스를 유지한다.
		sheetObj.SelectCell(Number(sheetObj.GetCellValue(selRow, "srt_seq")) - 1, 2);
		//포커스색상을 준다.
		for(var i=0; i<sheetObj.LastCol(); i++){
	    	sheetObj.GetRowBackColor(Number(sheetObj.SetCellValue(selRow, "srt_seq")) - 1,"#DFFFFF");
	    }
	}	
}
//그리드 up/down
function rowDown(){
	var sheetObj=docObjects[0];
	var selRow=sheetObj.GetSelectionRows();
	if(Number(sheetObj.GetCellValue(selRow, "srt_seq")) < sheetObj.LastRow()){
		//선택한 Row를 한줄 위로 내린다.
	sheetObj.SetCellValue(selRow, "srt_seq",Number(sheetObj.GetCellValue(selRow, "srt_seq")) + 1,0);
		//한줄아래의 Row를 한줄 위로 올린다.		
		sheetObj.SetCellValue(Number(selRow)+1, "srt_seq",selRow,0);
		//정렬을 한다.
		sheetObj.ColumnSort("srt_seq","ASC");
		//포커스를 유지한다.
		sheetObj.SelectCell(Number(sheetObj.GetCellValue(selRow, "srt_seq")) + 1, 2);
		//포커스색상을 준다.
		for(var i=0; i<sheetObj.LastCol(); i++){
	    	sheetObj.GetRowBackColor(Number(sheetObj.SetCellValue(selRow, "srt_seq")) + 1,"#DFFFFF");
	    }
	}	
}
*/

