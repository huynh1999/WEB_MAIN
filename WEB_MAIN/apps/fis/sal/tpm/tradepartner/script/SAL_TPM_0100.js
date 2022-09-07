var rtnary=new Array(1);
var callBackFunc = "";
var var_first_user_rist = "N";


var cntrSheet=false;
function doWork(srcName, curObj){
	if(!btnGetVisible(srcName)){
		return;
	}
	try {
		var formObj=document.frm1;
		var sheetObj = docObjects[0];
		switch(srcName) {
			case "SEARCHLIST":
	       		//formObj.f_cmd.value = SEARCHLIST;
       			//sheetObj.DoSearch4Post("SAL_TPM_0100GS.clt", FormQueryString(formObj));
       			getTradePartmerPicList();
				//formObj.action = "./SAL_TPM_0100GS.clt";
				//formObj.submit();
			break;
			case "NEW":
				//formObj.f_cmd.value = -1;
				//formObj.action = "./SAL_TPM_0100.clt";
				//formObj.submit();
				doShowProcess();
				var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW'+(new Date()).getTime()+']';
				//parent.parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
				window.location.href = currLocUrl
				break;
			break;
			case "MODIFY"://저장
			//alert("111");
				if(checkInpuVals()){
					if(confirm("Do you want to save ?")){
						formObj.f_cmd.value=MODIFY;
						formObj.save_x_flg.value=saveCloseFlag;
						/*
						if(formObj.sls_his_flat_url.value == ""){
							formObj.sls_his_flat_url.value=formObj.sls_his_flat_url_org.value
						}
						*/
						//formObj.action = "./SAL_TPM_0101.clt";
						formObj.action="./SAL_TPM_0100.clt";
						formObj.submit();
					}
				}
			break;
			case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var id = curObj.id;
				rtnary=new Array(1);
		   		rtnary[0]="1";
//		   		rtnary[1]=formObj.trdp_nm.value;
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		callBackFunc = "PARTNER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
    	        
           break;
			case "PARTNER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var id = curObj.id;
				rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.trdp_nm.value;
		   		rtnary[2]=window;
		   		callBackFunc = "PARTNER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
    	        
           break;
           
        } // end switch
	}catch(e) {
		//alert(e.description);
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        }
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
        }
	}
}
function gridAdd(objIdx){
	var intRows=docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}
function downloadFile(){
	var formObj=document.frm1;
	frm2.trdp_cd.value=formObj.trdp_cd.value;
   	frm2.cntc_seq.value=formObj.cntc_seq.value;
   	frm2.target='ifrm1';
	frm2.submit();
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출
            var cal=new ComCalendar(); 
            cal.select(frm1.visit_tm_fm,  'MM-dd-yyyy');
        break;
    }
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if(obj.value != ""){
		CODETYPE=str;
		var sub_str=str.substring(0,8);
		if(sub_str == "partner_"){
			str='trdpcode';
		}
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else if(tmp == "onBlur" && obj.value == ""){
		frm1.trdp_nm.value="";
		optRemove();
		var sheetObj=docObjects[0];
		sheetObj.RemoveAll();
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr = 'mainFrame';
	var frm1=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined' && doc[1] != ''){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			//alert(rtnArr[0]);
			if(CODETYPE =="partner_pickup"){
				frm1.trdp_cd.value=masterVals[0];
				frm1.trdp_nm.value=masterVals[3];
			if(!(sheetObj.LastRow() + 1 > 1 && sheetObj.GetCellValue(1, "trdp_cd") == frm1.trdp_cd.value)){
					doWork("SEARCHLIST");
				}
			}
		}else{
			if(CODETYPE =="partner_pickup"){
				frm1.trdp_cd.value="";
				frm1.trdp_nm.value="";
				optRemove();
				sheetObj.RemoveAll();
			}
		}
	}else{
		//Error Errupt!
		alert(getLabel('FMS_COM_ERR001'));
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
	//#1247 [Sales Report Entry] Cannot auto suggestion when input Customer name
	fnSetAutocompleteCallBack('trdp_nm', 'PARTNER_POPLIST', 'LINER_POPLIST'); //Customer	
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    var formObj=document.frm1;
    //Division 체크 셋팅
    for(var i=0 ; i < formObj.division_radio.length ; i++){
    	if(formObj.division.value == formObj.division_radio[i].value){
    		formObj.division_radio[i].checked=true;
    	}
	}
    //Agent PIC 체크 셋팅
    if(formObj.trdp_cd.value != ""){
    	doWork("SEARCHLIST");
    	formObj.sls_pson_pic.value=formObj.h_sls_pson_pic.value;
    }
    if(formObj.save_flg.value == "Y"){
    	saveCloseBtnYn = formObj.save_x_flg.value;
    	//alert("Save Success.")
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
    }
    search_opt_sheet();
    /*var s_search_opt=document.getElementsByName("division_radio"); 
	var opt_val=getRadioVal(s_search_opt);
    if(opt_val == 'N'){
    	var_first_user_rist = 'Y'
    	formObj.trdp_cd.style.backgroundColor = "#FFFFFF";
    }else{
    	var_first_user_rist = 'N'
    	formObj.trdp_cd.style.backgroundColor = "#D4F6FF";
    }*/
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
		case 1:
		with (sheetObj) {
	        (3, 0, 0, true);

	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('SAL_TPM_0100_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	               {Type:"Int",       Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cntc_pson_seq",  KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"pic_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 } ];
	         
	        InitColumns(cols);

	        SetEditable(1);
		}
        break;
    }
}
function optRemove(){
	var formObj=document.frm1;
	var sheetObj = docObjects[0];
	while(formObj.sls_pson_pic.options.length > 0){
		formObj.sls_pson_pic.options.remove(0);
	}
}
function sheet1_OnSearchEnd(sheetObj){
	var formObj=document.frm1;
	var iRows=sheetObj.LastRow() + 1;
	optRemove();
	for ( var i=1 ; i < iRows ; i++ ) {
		var objOption=new Option(sheetObj.GetCellValue(i, "pic_nm"), sheetObj.GetCellValue(i, "cntc_pson_seq"));
		formObj.sls_pson_pic.options[(i-1)]=objOption;
	}
}
/**
 * 메인 화면의 입력값 확인
 */
function checkInpuVals(){
	var isOk=true;
	var formObj=document.frm1;
	if(formObj.visit_tm_fm.value == ""){
		//alert("[Date] is mandatory field.");
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_DATE'));
//		formObj.visit_tm_fm.focus();
		return false;
	}
	if(var_first_user_rist == 'N'){
		if(formObj.trdp_cd.value == ""){
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));
			return false;
		}
	}
//	if(formObj.sls_pson_pic.value == ""){
//		alert("[Agent PIC] is mandatory field.");
//		formObj.sls_pson_pic.focus();
//		return false;
//	}
	if(trim(formObj.sls_his_tit.value) == ""){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_SUBJECT'));
//		formObj.sls_his_tit.focus();
		return false;
	}
	if(trim(formObj.sls_his_ctnt.value) == ""){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_DESC'));
//		formObj.sls_his_ctnt.focus();
		return false;
	}
	if(checkInputVal(formObj.sls_his_ctnt.value, 0, 4000, "T", 'MESSAGE')!='O'){
    	isOk=false;
    }
	for(var i=0 ; i < formObj.division_radio.length ; i++){
		if(formObj.division_radio[i].checked){
			formObj.division.value=formObj.division_radio[i].value;
			break;
		}
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
		isOk=false ;
	}
	return isOk;
}
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
//jsjang 2013.8.9 #16528 file delete  기능 추가
//화면의 flag value 값을 변경한다.
function flgChange(check) {
	var formObj = document.frm1;
	if(check.checked==true){
		check.value='Y';
	}else{
		check.value='N';
	}
}
/**
* Master Container 조회팝업
*/
function getTradePartmerPicList(){
	/*
	 * AJAX로 Trade Partner 의 Picture 정보를 전부 가져와서 ADD 하도록 변경
	 */
	if(frm1.trdp_cd.value==''){
		//There is no Ref No.
		//alert(getLabel('FMS_COM_ALT010') + " - " + getLabel('FMS_COD_REFN') + "\n\n: SAL_TPM_0100.400");
		return;
	}else{
		doShowProcess();
		ajaxSendPost(getTradePartnerPic, 'reqVal', '&goWhere=aj&bcKey=getTradePartmerPicList&f_trdp_cd='+frm1.trdp_cd.value, './GateServlet.gsl');	//[20130822  ojg] rlt_intg_bl_seq파라미터추가
	}
}
function getTradePartnerPic(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		//alert(doc[1]);
		if(typeof(doc[1])!='undefined'){
			//var tmpList = doc[1].split("@;;@");
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			for( var i=0; i < arrLen-1 ; i++ ){
				var rtnArrStr=rtnArr[i];
				var tmp=rtnArrStr.split('^^');	
				var objOption=new Option(tmp[1], tmp[0]);
				frm1.sls_pson_pic.options[(i)]=objOption;	
			}	
			/*
			optRemove();
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				var objOption=new Option(tmp[0], tmp[1]);
				formObj.sls_pson_pic.options[(i-1)]=objOption;				
			}
			*/
		}
		doHideProcess();
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
		doHideProcess();
	}
	
}
function PARTNER_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.trdp_nm.value=rtnValAry[2];//eng_nm
		doWork("SEARCHLIST");
	}
}

function refreshAjaxTab(url){
	location.reload();
}
function search_opt_sheet(){
	var formObj=document.frm1;
	var s_search_opt=document.getElementsByName("division_radio"); 
	var opt_val=getRadioVal(s_search_opt);
	
	if(opt_val == 'N'){
		formObj.trdp_cd.style.backgroundColor = "#FFFFFF";
		var_first_user_rist = "Y";
	}else{
		formObj.trdp_cd.style.backgroundColor = "#D4F6FF";
		var_first_user_rist = "N";
	}
}
function getRadioVal(radioObj){
	var rtnStr="";
	for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked==true)
	   {
		   rtnStr=radioObj[i].value;
	   }
	}
	return rtnStr;
}