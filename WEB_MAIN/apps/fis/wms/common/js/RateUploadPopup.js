//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var uploadObjects=new Array();
var uploadCnt=0;
var FILE_LOC_INFO;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "CLOSE":	
				btn_Close();
				break;
			case "btn_file_upload":	
				btn_File_Upload();
				break;
			case "btn_file_delete":	
				btn_File_Delete();
				break;
				
  } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	//initControl();

	if (!ComIsEmpty(formObj.rate_no)) {
		btn_Search()
		//ComBtnEnable("btn_file_upload", true, 1);
		//ComBtnEnable("btn_file_delete", true, 1);
 		document.form.btn_file_upload.disable = false;
 		document.form.btn_file_delete.disable = false;
	}

	
}

function downloadFile(downType, set_type){
	document.frm2.docType.value=downType;
	//document.frm2.v_set_type.value=set_type;
	document.frm2.rate_no.value=document.form.rate_no.value;
	document.frm2.ctrt_no.value=document.form.ctrt_no.value;
	//document.frm2.target='ifrm1';
	document.frm2.submit();
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	downloadFile("file",sheetObj.GetCellValue(Row, "Grd01doc_no"));
}
function flgChange(check) {
	var formObj=document.frm1;
	if(check.checked==true){
		check.value='Y';
	}else{
		check.value='N';
	}
}

function getParam() {
    var formObj = document.form;
	var sParam="svc_tp_cd="+formObj.svc_tp_cd.value;
    sParam += "&doc_ref_tp_cd="+formObj.doc_ref_tp_cd.value;
    sParam += "&doc_tp_cd="+formObj.doc_tp_cd.value;
    sParam += "&doc_ref_no="+formObj.rate_no.value;
    sParam += "&doc_ref_no2="+formObj.ctrt_no.value;
    sParam += "&ctrt_no="+formObj.ctrt_no.value;
    sParam += "&rate_no="+formObj.rate_no.value;
    sParam += "&nra_quote_no="+formObj.nra_quote_no.value;
    sParam += "&sb_cls_cd="+formObj.sb_cls_cd.value;
    formObj.doc_ref_no.value = formObj.rate_no.value;
    formObj.doc_ref_no2.value=formObj.ctrt_no.value;
    return sParam;
    
}
function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=OMS', '');
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObj=document.form;
	//axon_event.addListenerFormat('keypress', 'obj_keypress', formObj);
	//axon_event.addListenerForm("keydown", "obj_keydown", formObj);
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with(sheetObj){
	        
	      var prefix="Grd01";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('RateUploadPopup_HDR1'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"Seq" },
	             {Type:"Text",      Hidden:0,  Width:600,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"upload_date",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_path",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_sys_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"svc_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_ref_tp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
	      InitColumns(cols);
	      SetSheetHeight(300);
	      SetEditable(0);
	      SetColProperty(prefix+"upload_date", {Format:"####-##-##"} );
	      SetWaitImageVisible(0);
	            //no support[implemented common]CLT 				SelectHighLight=false;
	      }
	      break;


	}
}
//function sheet1_OnDblClick(sheetObj, Row, Col){
//	var formObj1=document.form1;
//	var sName=sheetObj.ColSaveName(Col);
//	if (sName == "Grd01file_org_nm") {
//		ComSetObjValue(formObj1.downloadLocation, sheetObj.GetCellValue(Row, "Grd01file_path")+sheetObj.GetCellValue(Row, "Grd01file_sys_nm"));
//		ComSetObjValue(formObj1.downloadFileName, sheetObj.GetCellValue(Row, "Grd01file_org_nm"));
//		formObj1.submit();
//	}
//}
function btn_Search() {
	var formObj=document.form;
//	if (validateForm(docObjects[0],formObj,'Search')) {
		formObj.f_cmd.value=SEARCH01;
		sheet1.DoSearch("./RateUploadPopupGS.clt", FormQueryString(formObj));
	//}
////	if (validateForm(docObjects[0],formObj,'Search')) {
//		var params = "?f_cmd="+ SEARCH01 + "&rate_no=" + formObj.rate_no.value +  "&ctrt_no=" + formObj.ctrt_no.value;
// 		var sXml=docObjects[0].GetSearchData("searchNRAFileListGS.clt" + params);
//		docObjects[0].LoadSearchData(sXml,{Sync:1} );
////	}

}
function btn_Close() {
	comPopupOK();
  ComClosePopup(); 
}
function btn_File_Upload(){
	var formObj=document.form;
	if(isNull(formObj.nra_quote_no)){
		ComShowCodeMessage("COM0374");
		formObj.nra_quote_no.focus();
		return ;
	}
	/*if(isNull(formObj.file_path)){
		ComShowCodeMessage("COM0119");
		return ;
	}*/
	getParam();
	formObj.f_cmd.value=ADD;
	submitForm(ADD)
	//var sXml=sheet1.GetSaveData("./RateUploadPopup_01GS.clt", FormQueryString(formObj) + "&" + getParam());
}
function resultNraQuoteInfo(resultXml){
	var formObj=document.form;
	if(getXmlDataNullToNullString(resultXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(resultXml,'exception_msg'));
	} else {
//		ComShowCodeMessage("COM0093");
		showCompleteProcess();
	}
}
function getByteLength(evalString){
   var len=0;
   if ( evalString == null ) return 0;
   for(var i=0; i < evalString.length; i++){
      var c=escape(evalString.charAt(i));
      if ( c.length == 1 ) len ++;
      else if ( c.indexOf("%u") != -1 ) len += 2;
      else if ( c.indexOf("%") != -1 ) len += c.length/3;
   }
   return len;
}
function btn_File_Path(val){
	var formObj=document.form;
	ComSetObjValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
function btn_File_Delete(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var selRow=sheetObj.GetSelectRow();
	if(ComShowCodeConfirm("COM0375")){
		sheetObj.SetRowHidden(selRow,0);
		sheetObj.SetRowStatus(selRow,"D");
		var sParam=sheetObj.GetSaveString(true);
		if( sParam == ""){ return;}
 		var sXml=sheetObj.GetSearchData("./RateUploadPopupGS.clt", sParam+"&f_cmd="+MULTI01+"&rate_no="+formObj.rate_no.value+ "&ctrt_no="+formObj.ctrt_no.value+"&sb_cls_cd="+formObj.sb_cls_cd.value );
 		sheetObj.LoadSaveData(sXml);
		formObj.file_path.value="";
		formObj.nra_quote_no.value="";
	}
}
function nraChange(){
	var formObj=document.form;
	if(formObj.file_path.value != ""){
		btn_File_Path("REOPEN");
	}
}
function submitForm(){
	
	
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			//formData = $(formObj).serialize();
			formObj.submit();
			return;
		}else{
			formObj.submit();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	$.ajax({
		   type: "POST",
		   url: "./RateUploadPopupAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   //MDM_MCM_0050 (S)
			   //setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());

			   getParam();
			   setupPage();
			   
			   doHideProcess();
			   
			   formObj.logo_square_flg.value = "N";
			   formObj.logo_square_flg.checked = false;
			   
			   if (formObj.logo_square_yn.value != "") {
				   getObj('logo_square_id').style.display="inline";
				   formObj.logo_square_flg.style.display="inline";
				   formObj.logo_square_chk.style.display="inline";
				   
				   $("#logo_square_filenm").html($('logo_square_filenm',data).text());
				   formObj.logo_square.value = "";
			   } else {
				   getObj('logo_square_id').style.display="none";
				   formObj.logo_square_flg.style.display="none";
				   formObj.logo_square_chk.style.display="none";
			   }
			   
			   formObj.logo_rec_flg.value = "N";
			   formObj.logo_rec_flg.checked = false;
			   
		   },
		   error: function(){
			   doHideProcess();
			   //alert("System Error!");
		   }
		 });
}