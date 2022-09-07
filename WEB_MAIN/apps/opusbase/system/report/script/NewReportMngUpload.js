/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveFileUploadPop.js
*@FileTitle  : Inventory Movement & Hold & Damage - File Upload
*@author     : Duc.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2017/12/08
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
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
		switch(srcName) {
			case "CLOSE" :
				btn_Close();
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
    //disable auto focus to this button
    document.form.btn_close.disabled = true;
    document.form.btn_close.disabled = false;
    
    var formObj=document.form;
	var arg=parent.rtnary;
    formObj.rpt_id.value=arg[0];
    formObj.mrd_path.value=arg[1];
}
function btn_Close(){
  ComClosePopup(); 
}
/**
 * File Upload 
 */
function getParam() {
    var formObj = document.form;
//    var sParam  = "move_no="+"MVSEL140900005";
//    sParam += "&move_seq="+"2";
    var sParam  = "rpt_id="+formObj.rpt_id.value;
    return sParam;
}

function btn_File_Upload_new(){
	var formObj=document.form;
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	//File Path 체크
	if(formObj.f_pdf_nm.value == ""){
		ComShowCodeMessage("COM0119");
		return ;
	}
	getParam();
	formObj.f_cmd.value=ADD;
	
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
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
		   url: "./NewReportMngUploadAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   ComClosePopup($(data).find("res").text());
			   
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		 });
}


