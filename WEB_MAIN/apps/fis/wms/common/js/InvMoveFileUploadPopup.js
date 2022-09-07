/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveFileUploadPop.js
*@FileTitle  : Inventory Movement & Hold & Damage - File Upload
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
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
	for (var i=1; i<=sheetCnt;i++)
	{
		
		comConfigSheet(docObjects[0]);    ///./web/script/IBSheetConfig.js
	    initSheet(docObjects[0]);         //local function
	    comEndConfigSheet(docObjects[0]); ///./web/script/IBSheetConfig.js
	}
    sheet1.SetVisible(0);
    
    //disable auto focus to this button
    document.form.btn_close.disabled = true;
    document.form.btn_close.disabled = false;
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
		
			      var cols = [   {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"check",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			     	             {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Text",      Hidden:0,  Width:900,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:prefix+"upload_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_path",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_sys_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"ctrt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sop_ver",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			    	             {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(300);
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
  ComClosePopup(); 
}
/*TinLuong Modification*/
function initUpload(){
    upload1.Initialize({
         SaveUrl:'./addFileInvMoveFileUpload.clt'
        ,AdditionalParam:"FileUploadModule=MV"
        ,Language:"en"
        ,ShowButtonArea: false
        ,ShowInfoArea: true
        ,ExtraForm: 'upLoadForm'
        ,ResponseType : 'xml'
        ,BeforeAddFile : function(result){  //파일추가전 발생 이벤트
            return true;
        }
        ,BeforeSaveStatus : function(result){   // 저장전 발생 이벤트
            return true;
        }
        ,AfterSaveStatus : function(result) {         // 저장후 발생 이벤트
        	var opener = window.dialogArguments;
        	if (!opener) opener=window.opener;
        	if (!opener) opener = parent;
        	opener.setFileInfoInfo();
        	ComClosePopup();

        }
        ,AfterAddFile:function(result){         // 파일추가 후 발생 이벤트
            var files = upload1.GetList();
            var formObj=document.form;
            ComSetObjValue(formObj.file_path, files[0].GetFileName());
        }
    });
    var upload1_upload = document.getElementById('upload1_upload');
    upload1_upload.style.display = 'none';
}
/** 
 * File 선택
 */
function btn_File_Path(){
	var formObj=document.form;
//	//ComSetObjValue(formObj.file_path, "");
//	uploadObjects[0].AutoConfirm="DELETE_YES DOWN_OVERWRITE_YES UP_OVERWRITE_YES";
//	var sParam="move_no="		+ComGetObjValue(formObj.move_no);
//		sParam += "&move_seq="		+ComGetObjValue(formObj.move_seq);
//	uploadObjects[0].ExtendParam=sParam;
//	//uploadObjects[0].AutoUpload = true;
////no support[check again]CLT 	var fileLocation=docObjects[0].OpenFileDialog("Attachment");
//	if(fileLocation == "<USER_CANCEL>"){
//		//fileLocation = "";
//		return ;
//	}else{
//		ComSetObjValue(formObj.file_path, "");
//		uploadObjects[0].DeleteFile();		
//	}
//	ComSetObjValue(formObj.file_path, fileLocation);
//	var ret=uploadObjects[0].AddFile(fileLocation);
	ComSetObjValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
/**
 * File Upload 
 */
function getParam() {
    var formObj = document.form;
//    var sParam  = "move_no="+"MVSEL140900005";
//    sParam += "&move_seq="+"2";
    var sParam  = "move_no="+formObj.move_no.value;
    sParam += "&move_seq="+formObj.move_seq.value;
    sParam += "&rgst_id="+formObj.user_id.value;
    return sParam;
}

function btn_File_Upload_new(){
	var formObj=document.form;
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	//File Path 체크
	if(formObj.logo_rectangle.value == ""){
		ComShowCodeMessage("COM0119");
		return ;
	}

	getParam();
	formObj.f_cmd.value=ADD;
	
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
		   url: "./InvMoveFileUploadPopupAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   //MDM_MCM_0050 (S)
//			   paramToForm(getParam());
//		        var ibupForm = document.getElementById('ibup_form');
//		        ibupForm.action = ibupForm.action + '&FileUploadModule=MV';
//		        upload1.SaveStatus();
//		        ClearHTML();
//		        revertParamToForm(getParam());
			   
			  // alert("Upload successful !");
			   ComClosePopup($(data).find("res").text());
			   
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		 });
	//var sXml=sheet1.GetSaveData("./RateUploadPopup_01GS.clt", FormQueryString(formObj) + "&" + getParam());
}

function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=MV', '');
}
function btn_File_Upload(){
	var formObj=document.form;
	var opener = window.dialogArguments;
	if (!opener) opener=window.opener;
	if (!opener) opener = parent;
	//File Path 체크
	if(isNull(formObj.file_path)){
		ComShowCodeMessage("COM0119");
		return ;
	}
//	var sXml=uploadObjects[0].DoUpload(true);
//	if( sXml.indexOf('<MESSAGE>') != -1){
//		var msg=ComGetMessageFromXml(sXml);
//		alert(msg);
//		ComSetObjValue(formObj.file_path, "");
//		return;
//	}
	ComOpenWait(true);
	 setTimeout(function(){
	if (upload1.GetList().length > 0) {
        paramToForm(getParam());
        var ibupForm = document.getElementById('ibup_form');
        ibupForm.action = ibupForm.action + '&FileUploadModule=MV';
        upload1.SaveStatus();
        ClearHTML();
        revertParamToForm(getParam());
    }
	 },1000);
	 ComOpenWait(false);
	//comPopupOK();
  
}
