var rtnary=new Array(1);
var callBackFunc = "";
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.s_recvDt_fm, frm1.s_recvDt_to);
}
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
       		var strCategory=formObj.s_Category.value;
       		if(strCategory == "AO"){
				formObj.bnd_clss_cd.value="O";
			}
       		else if(strCategory == "AI"){
				formObj.bnd_clss_cd.value="I";
			}
			else if(strCategory == "SO"){
				formObj.bnd_clss_cd.value="O";
			}
			else if(strCategory == "SI"){
				formObj.bnd_clss_cd.value="I";
			}
			if(formObj.s_job_status[0].checked){
				formObj.s_job_status_in.value="All";
			}
			else{
				formObj.s_job_status_in.value="Delay";
			}
			if(formObj.s_bl_status[0].checked){
				formObj.s_bl_status_in.value="All";
			}
			else{
				formObj.s_bl_status_in.value="Processing";
			}
       		var strTemplate=formObj.s_TemplateList.value;
       		var strCurrentStep=formObj.s_CurrentStep.value;
       		if ( strCategory != "") {
	       		formObj.f_cmd.value=SEARCHLIST;
	       		sheetObj1.DoSearch("MGT_JOB_0020GS.clt", FormQueryString(formObj) );
			 //   sheetObj1.SetImageList(0,APP_PATH+"/web/img/button/bt_red.gif");
			//    sheetObj1.SetImageList(1,APP_PATH+"/web/img/button/bt_green.gif");
			//    sheetObj1.SetImageList(2,APP_PATH+"/web/img/button/bt_blue.gif");
			    if ( sheetObj1.LastRow() + 1 == 2 ) {
					sheetObj1.SetAutoRowHeight(1);
					sheetObj1.DoSearch("MGT_JOB_0020GS.clt", FormQueryString(formObj) );
					sheetObj1.SetAutoRowHeight(0);
				}
			    /*
			    for ( var i=1 ; i < sheetObj1.LastRow() + 1 ; i++ ) {
			    	if ( sheetObj1.GetCellValue(i, "job_status") == "red" ) {
			    		sheetObj1.SetCellImage(i, "job_status_color",0);
			    	} else if ( sheetObj1.GetCellValue(i, "job_status") == "green" ) {
			    		sheetObj1.SetCellImage(i, "job_status_color",1);
			    	} else if ( sheetObj1.GetCellValue(i, "job_status") == "blue" ) {
			    		sheetObj1.SetCellImage(i, "job_status_color",2);
			    	} 
			    }
			    */
			    // 전체 합계 하단 표시
//			    sheetObj1.SetAutoSumPosition(1);
//			    sheetObj1.SetSumText(0, 3,sheetObj1.LastRow()- 1);
//			    sheetObj1.SetSumText(0, 0,"Total");
			} else {
				//Please select [Category]!
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: MGT_JOB_0020.77");
			}
            //sheetObj.ShowDebugMsg = false;s
       		break;
		case "NEW":
       		displayClear();
       		break;
        case "LINER_POPLIST01"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
		   	rtnary[0]="1";
		   	rtnary[1]="";
		   	rtnary[2]=window;
		   	callBackFunc = "LINER_POPLIST01";
		   	modal_center_open('./CMM_POP_0010.clt?callTp=LN', rtnary, 1150,650,"yes");
		   	
	    break;
	    case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
		   	modal_center_open('./CMM_POP_0060.clt', rtnary, 556,480,"yes");
		break;
    }
}
function goTabSelect(isNumSep) {
    if( isNumSep == "01" ) {
        document.all.Tab01.className="tab_head2";
        document.all.Tab02.className="tab_head_non2";
        document.all.Tab03.className="tab_head_non2";
    } else if( isNumSep == "02" ) {
        document.all.Tab01.className="tab_head_non2";
        document.all.Tab02.className="tab_head2";
        document.all.Tab03.className="tab_head_non2";
    } else if( isNumSep == "03" ) {
        document.all.Tab01.className="tab_head_non2";
        document.all.Tab02.className="tab_head_non2";
        document.all.Tab03.className="tab_head2";
    }
    if (isNumSep == '01' || isNumSep == '03') {
        document.all.detailIfrm.src="tab" + isNumSep + "_1.html";
    } else {
        document.all.detailIfrm.src="tab" + isNumSep + ".html";
    }
}
function openOrder(cF,type){
    var param="?openerForm=goals&openerType="+type+"&openerCodeField="+cF;
    window.open("/cupfmsWeb/cup/common/pop/COM_ORDER_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
}
function openLocation(cF,nF, type){
	var param="?openerForm=goals&openerType="+type+"&openerCodeField="+cF+"&openerNameField="+nF;
	window.open("/cupfmsWeb/cup/common/pop/COM_LOCATION_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
}
/**
 * Category 선택시 TemplateList를 조회함
 */
function fncCategory() {
	var formObj=document.frm1;
	//Template List 및 Current Step 초기화
	document.frm1.s_TemplateList.options[0]=new Option( '',  ''  );
	document.frm1.s_TemplateList.options.length='1';
	document.frm1.s_CurrentStep.options[0]=new Option( '',  ''  );
	document.frm1.s_CurrentStep.options.length='1';
	var category_code=formObj.s_Category.value;
	if ( category_code != "" ) {
		ajaxSendPost(dispCntAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchTemplateCombo&f_lg_clss_biz_cd='+category_code, './GateServlet.gsl');
	}
}
function fncTempletList() {
	var formObj=document.frm1;
	var category_code=formObj.s_Category.value;
	var template_code=formObj.s_TemplateList.value;
	if ( category_code != "" && template_code != "" ) {
		//ajaxSendPost(dispCntAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCurrentStepCombo&category_code='+category_code+'&template_code='+template_code, './GateServlet.gsl');
		ajaxSendPost(dispCntAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=seachBaseTimeCombo&clss_cd='+category_code, './GateServlet.gsl');
	}
}
//코드표시 Ajax
function dispCntAjaxReq1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			//alert("arrLen===>"+arrLen);
			var tempLen=document.frm1.s_TemplateList.length=0;;
			document.frm1.s_TemplateList.options[0]=new Option("", "");
			var tempLen=document.frm1.s_CurrentStep.length=0;;
			document.frm1.s_CurrentStep.options[0]=new Option("", "");
			for( var i=1; i < arrLen ; i++ ){
				var masterVals=rtnArr[i-1].split(',');	
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				document.frm1.s_TemplateList.options[i]=new Option(masterVals[1],masterVals[0]);
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MGT_JOB_0020.209");		
	}
}
//코드표시 Ajax
function dispCntAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			//alert("arrLen===>"+arrLen);
			var tempLen=document.frm1.s_CurrentStep.length=0;;
			document.frm1.s_CurrentStep.options[0]=new Option("", "");
			for( var i=1; i < arrLen ; i++ ){
				var masterVals=rtnArr[i-1].split(',');
				//alert("masterVals[0]===>"+masterVals[0]);
				//alert("masterVals[1]===>"+masterVals[1]);
				document.frm1.s_CurrentStep.options[i]=new Option(masterVals[1],masterVals[0]);
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MGT_JOB_0020.237");		
	}
}
 /**
 *달력팝업 호출
 */
function doDisplay(doWhat, formObj){
	var formObj=document.frm1;
	switch(doWhat){
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
		    var cal=new ComCalendarFromTo();
			cal.displayType="date";
			cal.select(formObj.s_recvDt_fm, formObj.s_recvDt_to, 'MM-dd-yyyy');
	    break;
	}    
}
function displayClear() {
	var sheetObj1=docObjects[0];
	var formObj=document.frm1;
	formObj.s_Category.value="";
	formObj.s_TemplateList.length=0;
	formObj.s_TemplateList.options[0]=new Option("", "");
	formObj.s_TemplateList.value="";
	formObj.s_CurrentStep.length=0;
	formObj.s_CurrentStep.options[0]=new Option("", "");
	formObj.s_CurrentStep.value="";
	formObj.s_recvDt_fm.value="";
	formObj.s_recvDt_to.value="";
	formObj.s_job_status[0].checked=true;
	formObj.s_bl_status[0].checked=true;
	//formObj.s_operator.value = "";
	sheetObj1.RemoveAll();
}
// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 
	var formObj=document.frm1;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.ofc_cd_in);
	 
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i],SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	fncCategory();
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:2, Page:50, DataRowMerge:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('MGT_JOB_0020_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"g_category",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"tmplt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dur_tm_qty",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Int",   Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"seq",               KeyField:0,   CalcLogic:"",   Format:"Integer",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"bkg_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"bkg_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"jb_pln_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"jb_act_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:220,  Align:"Left",    ColMerge:1,   SaveName:"current_step",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:160,  Align:"Center",  ColMerge:1,   SaveName:"next_step",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"job_status_color",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"modi_ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"job_status",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"AutoSum",   Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"rowCount",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	               
	               
	        InitColumns(cols);

	        SetEditable(1);
	        SetImageList(0,APP_PATH+"/web/img/main/trash.gif");
	        SetHeaderRowHeight(40);
	        SetDataRowHeight(20);
	        //InitViewFormat(0, "bkg_dt_tm", 	"MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
	        //SetColProperty("jb_pln_dt_tm", {Format:"####-##-## ##:##"} );
	        //SetColProperty("jb_act_dt_tm", {Format:"####-##-## ##:##"} );
	        SetSheetHeight(350);
	        SetAutoRowHeight(0);
	        resizeSheet();
			}
		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	var sRow=sheetObj.FindSumRow();
	if(sRow != -1){
		sheetObj.SetCellValue(sRow, "seq", sheetObj.LastRow()-1);
		sheetObj.SetCellText(sRow, 0,"Total");
	    sheetObj.SetCellEditable(sRow, 1,0);
	    sheetObj.SetCellFont("FontBold", sRow, "seq", sRow, "seq",1);
	    sheetObj.SetCellFont("FontBold", sRow, "g_category", sRow, "g_category",1);
	}


	 sheetObj.SetImageList(0,APP_PATH+"/web/img/button/bt_red.gif");
	 sheetObj.SetImageList(1,APP_PATH+"/web/img/button/bt_green.gif");
	 sheetObj.SetImageList(2,APP_PATH+"/web/img/button/bt_blue.gif");
	for ( var i=1 ; i < sheetObj.LastRow() + 1 ; i++ ) {
		if ( sheetObj.GetCellValue(i, "job_status") == "red" ) {
				sheetObj.SetCellImage(i, "job_status_color",0);
		} else if ( sheetObj.GetCellValue(i, "job_status") == "green" ) {
			sheetObj.SetCellImage(i, "job_status_color",1);
		} else if ( sheetObj.GetCellValue(i, "job_status") == "blue" ) {
			sheetObj.SetCellImage(i, "job_status_color",2);
    	} 
    }
}

/* 버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
document.onclick=processButtonClick;
/* 버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function processButtonClick(){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	var sheetObject=docObjects[0];
	/*******************************************************/
	var formObject=document.form;
	try {
		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "btn_retrieve":
				doActionIBSheet(sheetObject,formObject,IBSEARCH);
				break;
			case "btn_new":
				//Please select the [New] button!
				break;
		} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: MGT_JOB_0020.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: MGT_JOB_0020.002");
        }
	}
}
// 그리드를 더블클릭시 JobVisibility Detail 화면을 PopUp으로 띄워준다.
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var formObj=document.frm1;
	if(Col != 0 && Col != 1 && Col != 2 && Col != 3){
		formObj.intg_bl_seq_in.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
		if(sheetObj.GetCellValue(Row,0) == "Air Export"){
			formObj.air_sea_clss_cd.value="A";
			formObj.bnd_clss_cd.value="O";
		}else if(sheetObj.GetCellValue(Row,0) == "Air Import"){
			formObj.air_sea_clss_cd.value="A";
			formObj.bnd_clss_cd.value="I";
		}else if(sheetObj.GetCellValue(Row,0) == "Sea Export"){
			formObj.air_sea_clss_cd.value="S";
			formObj.bnd_clss_cd.value="O";
		}else if(sheetObj.GetCellValue(Row,0) == "Sea Import"){
			formObj.air_sea_clss_cd.value="S";
			formObj.bnd_clss_cd.value="I";
		}
		var reqParam='?intg_bl_seq_in='  +formObj.intg_bl_seq_in.value;
 		reqParam += '&air_sea_clss_cd=' +formObj.air_sea_clss_cd.value;
 		reqParam += '&bnd_clss_cd=' +formObj.bnd_clss_cd.value;
		//팝업창을 가운데 띄운다.
		var left=(screen.width-1024)/2;
		var top=(screen.height-300)/3;
		//window.open ('./MGT_JOB_0030.clt', "detail", "scrollbars=no, fullscreen=no, width=1000, height=500, left="+left+", top="+top+", scrollbars=auto");
		popGET('./MGT_JOB_0030.clt'+reqParam, '', 970, 500, "scroll:auto;status:no;help:no;");
	}
}
function LINER_POPLIST01(rtnVal){
		var formObj = document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	formObj.s_trdp_cd.value=rtnValAry[0];
	formObj.s_shrt_nm.value=rtnValAry[1];
	formObj.s_full_nm.value=rtnValAry[2]; 
	}
function USER_POPLIST(rtnVal){
		var formObj = document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_operator.value=rtnValAry[0];
		//formObj.s_user_name.value = rtnValAry[1];
	}
	}