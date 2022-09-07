/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICUpdateFileUpload.js
*@FileTitle  : IB Complete Update - File Upload
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
=========================================================--*/

var uploadObjects=new Array();
var uploadCnt=0;
var sheetCnt=0;
var docObjects=new Array();
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
* Sheet  onLoad
*/
function loadPage() {
	for (var i=1; i<=sheetCnt;i++)
	{
		var sheetObject=docObjects[0];
		comConfigSheet(sheetObject);     //./web/script/IBSheetConfig.js
	    initSheet(sheetObject);          //local function
	    comEndConfigSheet(sheetObject);  //./web/script/IBSheetConfig.js
	}
    //initControl();
    //
    sheet1.SetVisible(0);
}
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
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			ComShowMessage(e);
		}
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init dummy sheet
		    with(sheetObj){
	        
		      var hdr1="Seq";
		      var prefix="Grd01";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"Seq" } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(250);
		      SetEditable(0);
		      SetWaitImageVisible(0);
	      }
	      break;
	}
}
/** 
 * initControl()
 */ 
function initControl() {
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
function btn_Close(){
  ComClosePopup("test"); 
}

/** 
 * File 선택
 */
function btn_File_Path(){
	var formObj=document.form;
	ComSetObjValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
    
}

function getParam() {
    var formObj = document.form;

    var sParam="wib_bk_no="		+ formObj.wib_bk_no.value;
	sParam += "&wib_in_no="		+ formObj.wib_in_no.value;
	sParam += "&po_sys_no="		+ formObj.po_sys_no.value;
	sParam += "&item_sys_no="	+ formObj.item_sys_no.value;
	sParam += "&item_seq="		+ formObj.item_seq.value;
	
	return sParam;
}

function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=RCV', '');
}
/**
 * File Upload 
 */
function btn_File_Upload(){
	var formObj=document.form;
	if(formObj.logo_rectangle.value == null || formObj.logo_rectangle.value == ""){
		ComShowCodeMessage("COM0119");
		return ;
	}
	var filename = formObj.logo_rectangle.value.split(".");
    var length = filename.length;
    if(filename[length-1]=="dll" || filename[length-1]=="html" || filename[length-1]=="htm" || filename[length-1]=="exe")
    	{
    		alert("Invalid file");
    		return;
    	}
	getParam();
	formObj.f_cmd.value=ADD;
//	alert("fffffffff");
	submitForm(ADD);
}
function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			formObj.submit();
//			btn_Close();
			return;
		}else{
			formObj.submit();
//			btn_Close();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	            var filename = file.name.split(".");
	            var length = filename.length;
	            if(filename[length-1]=="dll" || filename[length-1]=="html" || filename[length-1]=="htm" || filename[length-1]=="exe")
	            	{
	            		alert("Invalid file");
	            		return;
	            	}
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	$.ajax({
		   type: "POST",
		   url: "./WHICUpdateFileUploadPopupAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
		   async: false,
	       processData: false,
		   success: function(data){
			   //MDM_MCM_0050 (S)
			  /* setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());

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
			   formObj.logo_rectangle.value = "";*/
//			   formObj.logo_rec_flg.value = "N";
//			   formObj.logo_rec_flg.checked = false;
			   ComClosePopup($(data).find("res").text());
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		 });
}