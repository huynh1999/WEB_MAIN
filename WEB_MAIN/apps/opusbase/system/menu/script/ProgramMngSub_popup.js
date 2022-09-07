function doWork(srcName){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("ProgramMngSub_popupGS.clt", FormQueryString(formObj) );
		break;
		
		case "SAVE":
            formObj.f_cmd.value=MODIFY;
            //if(inpuValCheck(sheetObj, MODIFY)){
                //if(confirm(getLabel('FMS_COM_CFMMOD'))){
                    //doProcess=true;
                    //show_complete = "Y";
            
                  //console.log(FormQueryString(formObj));
                    sheetObj.DoSave("ProgramMngSub_popupGS.clt", FormQueryString(formObj),"ibflag",false);
                //}
           // }

        break;
  	    case "CLOSE":  	     		
  	    	ComClosePopup();
  	    break;	   		
		}
}



function changeSel(){
	var formObj=document.frm1; 
	if(formObj.f_sel_radio[0].checked){
		if(formObj.f_sel_title.value.indexOf("FREIGHT INVOICE") != -1){
			formObj.f_show_frt.checked=true;
		}else{
			formObj.f_show_frt.checked=false;
		}
	}
}

function sheet1_OnClick(sheetObj, row, col){
	   var colNm=sheetObj.ColSaveName(col);
	   var curMnuSeq=sheetObj.GetCellValue(row, "pgm_seq");
	   //alert(curMnuSeq);
	   document.frm1.f_cur_mnu_seq.value=curMnuSeq;
	   //alert(document.frm1.f_cur_mnu_seq.value);
	}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	
	var formObj=document.frm1;

	//alert(frm1.f_mnu_seq.value);
	//alert(frm1.f_prnt_mnu_seq.value);


	// #50494 - [BNX] AIR IMPORT HAWB에 FREIGHT OPTION A/N에 표기 안되도록
	/*if (formObj.f_air_sea_tp.value == "A") {
		var opt_key = "AI_AN_FRT_TERM_DFT";
		ajaxSendPost(setAiAnFrtTermDftReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}*/
	
	for(var i=0;i<docObjects.length;i++){
	//khlee-시작 환경 설정 함수 이름 변경
	comConfigSheet(docObjects[i], SYSTEM_FIS);
	initSheet(docObjects[i],i+1);
	//khlee-마지막 환경 설정 함수 추가
	comEndConfigSheet(docObjects[i]);
	}
	
	/*if (formObj.f_air_sea_tp.value == "S") {
		formObj.f_rpt_biz_tp.value = "OIH";
	}else{
		formObj.f_rpt_biz_tp.value = "AIH";
	}*/
	

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
	        SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );

	        var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('PGM_SUB_POPUP_HDR'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [
                   {Type:"Text",      Hidden:0,  Width:125,   Align:"Left",  ColMerge:1,   SaveName:"top_mnu_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:125,  Align:"Left",    ColMerge:1,   SaveName:"mnu_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Radio",     Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rdo_btn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",  ColMerge:1,   SaveName:"sub_mnu_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"pgm_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Status",    Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"ibflag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 }];
	               
	         
	        InitColumns(cols);

	        SetEditable(1);
	        SetSheetHeight(300);
		}                                                      
		break;
	}
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
//	alert("formObj.f_mnu_seq.value-------> "+formObj.f_mnu_seq.value);
//	alert("formObj.f_prnt_mnu_seq.value-----> "+formObj.f_prnt_mnu_seq.value);
//	alert("formObj.f_pgm_seq.value-----> "+formObj.f_pgm_seq.value);
	//~~~~~~~~~ 2016.12.14 일 추가 시작 원래 상위 모듈 보여주기 ~~~~~~~~~~~~~~~~~~~~~~~~
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "pgm_seq") == frm1.f_mnu_seq.value ){
			sheetObj.SetCellValue(i , "rdo_btn", 1);
		}
	}
	//~~~~~~~~~ 2016.12.14 일 추가 끝 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
} 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	
	if(errMsg == ""){
		if(formObj.f_cmd.value == COMMAND01){
			alert(getLabel('FMS_COM_ALT056'));
		}else if(formObj.f_cmd.value == COMMAND02){
			alert(getLabel('FMS_COM_ALT057'));
		}
	}
	var opener=window.dialogArguments;
	  if (!opener)  opener=window.opener;  //이 코드 추가할것
	  if (!opener) opener=parent; //이 코드 추가할것"
	  
	  opener.doWork("SEARCHLIST"); //상위 우측 새로고침
	  
	  parent.document.getElementById('dispFr').contentWindow.location.reload(); //조상 좌측 iframe새로고침
	  
	  //opener.location.reload();  // 전체 페이지 새로고침
	  
      ComClosePopup(); // 팝업창 닫힘
	  
}

function getRptMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			formObj.mailTo.value=doc[1];
		}
	}
}

function setAiAnFrtTermDftReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "N"){
			formObj.f_show_frt_term.checked = false;
		}
	}
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var ref_no = formObj.f_ref_no.value;
	
	if (ref_no == "" || ref_no == "undefined" || ref_no == undefined) {
		return "";
	}
	pdfFileNm = "AN_FilingNo_"+ref_no;	
	return pdfFileNm;
}

function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "chk" :
        	if(sheetObj.GetCellValue(Row,"chk") == "0"){
        		for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
        			if(sheetObj.GetCellValue(Row,"bl_no") == sheetObj.GetCellValue(i,"bl_no")){
        				sheetObj.SetCellValue(i, "chk", "0");
        			}
        		}
        	}
    }
}

//Jpn RD폴더 셋팅.
function rdSetter(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] != "") {
			RD_path += doc[1];
		}
	}
}

//해당 팝업 창을 close 하는 함수
function doClose(){
    window.close();
}