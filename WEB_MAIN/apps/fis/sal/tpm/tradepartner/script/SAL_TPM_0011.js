// 공통전역변수
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var beforetab2=1;
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
	tabObjects[tabCnt++]=tab_obj;
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
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */

var slsPsonPic="";//PIC 이름
function loadPage() {
	var arg=parent.rtnary;
	// alert("arg===>["+arg[0]+"]");
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	
	if ( formObj.returnValue.value == "true" ) {
		ComClosePopup();
	}
	
	for(var i=0;i<docObjects.length;i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet (docObjects[i] , SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	for(k=0;k<tabObjects.length;k++){
		initTab(tabObjects[k],k+1);
	}
	
	formObj.f_Submit.value=arg[0];
	formObj.s_trdp_cd.value=arg[1];
	
	slsPsonPic="";//PIC 이름
	if ( arg.length > 2 ) {
		slsPsonPic=arg[3];
		formObj.cntc_seq.value=arg[2];
		formObj.sls_pson_pic.value=arg[3];
		formObj.sls_his_tit.value=arg[4];
		formObj.sls_his_ctnt.value=arg[5];
		if ( arg[6] != null && arg[6] != undefined && arg[6] != "undefined" ) {
			//formObj.img_sls_his_flat_url.disabled = false;
			formObj.f_sls_his_flat_url.value=arg[6];
			//var dispObj = getObj('dispFile');
			//dispObj.innerText = arg[6];
			formObj.sls_his_flat_nm.value=arg[7];
		}
	}
	if ( formObj.s_trdp_cd.value != "" && formObj.s_trdp_cd.value != null ) {
		doWork('SEARCHLIST01');
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var iRows=sheetObj.LastRow() + 1;
	for ( var i=1 ; i < iRows ; i++ ) {
		var objOption=new Option(sheetObj.GetCellValue(i, "pic_nm"), sheetObj.GetCellValue(i, "cntc_pson_seq"));
		formObj.sls_pson_pic.options[(i-1)]=objOption;
	}
	for(var i=0 ; i < formObj.sls_pson_pic.length ; i++){
		if(formObj.sls_pson_pic[i].innerHTML == slsPsonPic){
			formObj.sls_pson_pic[i].selected=true;
			break;
		}
	}
	sheetObj.SetBlur();
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SAL_TPM_0011_HDR1'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rep_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pic_eml_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"pic_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trd_div_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pic_phn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               //#3372 [CLA TEST SERVER] CANNOT SAVE TRADE PARTNER LOG BOOK
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pic_mphn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pic_fax",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pic_eml",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pic_desc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet4",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cntc_pson_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
		         
		        InitColumns(cols);
	
		        SetEditable(1);
		        SetVisible(0);
			}
		break;
	}
}
// Sheet관련 프로세스 처리
function doActionIBSheet(sheetObj,formObj,sAction) {
    sheetObj.ShowDebugMsg(false);
    switch(sAction) {
       case IBSEARCH:      //조회
             if(validateForm(sheetObj,formObj,sAction))
           // formObj.f_cmd.value = SEARCH;
            sheetObj.DoSearch("data.html" );
            //sheetObj.DoSearch4Post("com.hanjin.apps.bms.bms.pfm.managemarketstatus.UIBMSPFM001Action.do", FormQueryString(formObj));
            break;
    }
}
/**
 * 화면 폼입력값에 대한 유효성검증 프로세스 처리
 */
function validateForm(sheetObj,formObj,sAction){
    with(formObj){
//            if (!isNumber(formObj.iPage)) {
//                return false;
//            }
    }
    return true;
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj=document.frm1;
    switch(srcName) {
		case "ADD":
			if(!fncInputCheck()){
				return false;
			}
			if(formObj.f_Submit.value=="I"){
            	formObj.f_cmd.value=ADD;
            }else if( formObj.f_Submit.value=="U"){
            	formObj.f_cmd.value=MODIFY;
            }
			var fileExt=new Array("gif","tiff","tif","jpg","jpeg","bmp","png","txt","doc","docx","xls","xlsx","ppt","pptx","zip","pdf","msg","eml");
			
			var bContain=false;
			for(var i=0 ;i<fileExt.length; i++){
				// #5267 [Impex] trade partner log book file upload between CAPS and lowercases
				if(endsWith(formObj.sls_his_flat_url.value.toLowerCase(), fileExt[i])){
					bContain=true;
					break;
				}
			}
			if(formObj.sls_his_flat_url.value != '' && !bContain){
			    alert("Please Check File Extension ! [.gif.tiff.tif.jpg.jpeg.bmp.png.txt.doc.docx.xls.xlsx.ppt.pptx.zip.pdf.msg.eml]");
				return;
			}
            formObj.action="./SAL_TPM_0014.clt";
            formObj.submit();
       	break;
       	case "SEARCHLIST01":
            gridSearch();
       	break;
       	case "CLOSE":
       		window.returnValue="false";
       		ComClosePopup();
       	break;
    }
}
function gridSearch() {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj1=docObjects[0];
    var formObj=document.frm1;
    if ( formObj.s_trdp_cd.value != "" ) {
    	formObj.f_cmd.value=SEARCHLIST;
	    //검증로직
	    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
	    	formObj.f_cmd.value=SEARCHLIST02;
	    	sheetObj1.DoSearch("SAL_TPM_0014GS.clt", FormQueryString(formObj) );
	    }
	}
}
function downloadFile(){
	var formObj=document.frm1;
	frm2.trdp_cd.value=formObj.s_trdp_cd.value;
   	frm2.cntc_seq.value=formObj.cntc_seq.value;
   	frm2.target='ifrm1';
	frm2.submit();
}
function fncInputCheck() {
	var formObj=document.frm1;
	// #52067 - [BNX] Trade Partner Log Book PIC Option
	//if(checkSelectVal(frm1.sls_pson_pic.value, getLabel('PIC'))!='O'){
    //	formObj.sls_pson_pic.focus();
    //	return false;
    //}
	if(checkInputVal(formObj.sls_his_tit.value,   5, 100, "T", getLabel('TIT'))!='O'){
    	formObj.sls_his_tit.focus();
    	return false;
    }
    if(checkInputVal(formObj.sls_his_ctnt.value,  0, 4000, "T", getLabel('CONT'))!='O'){
    	formObj.sls_his_ctnt.focus();
    	return false;
    }
    return true;
}
/**
 * File DownLoad
 */
 /*
function downloadFile(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_trdp_cd=formObj.s_trdp_cd.value;
	var i_cntc_seq=formObj.cntc_seq.value;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=paFileDown&trdp_cd='+i_trdp_cd+'&cntc_seq='+i_cntc_seq, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SAL_TPM_0011.273");		
	}
}
*/
function endsWith(str, suffix) {
	 return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
