/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCUpdateFileUploadPopup.js
*@FileTitle  : OB Complete Update - File Upload
*@author     : NamTran - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================*/
var uploadObjects=new Array();
var docObjects=new Array();
var uploadCnt=0;
var sheetCnt=0;
var docObjects=new Array();
var fix_by_booking="bk";
var fix_by_loadplan="lp";
/**
* IBSheet Object
*/
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
		switch(srcName) {
			case "btn_file_upload":	
				if(formObj.logo_rectangle.value == ""){
					ComShowCodeMessage('COM0119');
					return;
				}
				btn_File_Upload();
			break;
			case "CLOSE":
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
* Sheet  onLoad
*/
var div = "";
var saveurl_div ="";
function loadPage() {
	for (var i=1; i<=sheetCnt;i++)
	{
		var docObject=docObjects[0];
		comConfigSheet(docObject);    //./web/script/IBSheetConfig.js
	    initSheet(docObject);         //local function
	    comEndConfigSheet(docObject); //./web/script/IBSheetConfig.js
	}
    //initControl();
    //
    docObjects[0].SetVisible(1);
 
    //upload 초기화
     div=document.form.div.value;
   
	if(div == fix_by_booking){
	saveurl_div = "./addFileWHOCFileUploadByBooking.clt";
	}else{
	saveurl_div = "./addFileWHOCFileUploadByLoadPlan.clt";
	}
    //initUpload();
}
	
function initUpload(){
    upload1.Initialize({
         SaveUrl:saveurl_div
        ,AdditionalParam:"FileUploadModule=ISU"
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
        	opener.setFileInfoInfo(div);
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
	     // var headCount=ComCountHeadTitle(hdr1);
	      var prefix="Grd01";

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:hdr1, Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"Seq" } ];
	       
	      InitColumns(cols);
	      SetVisible(false);
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
  ComClosePopup(document.form.div.value); 
}
/** 
 * File 선택
 */
function getParam() {
    var formObj = document.form;
    var div=$("#div").val();
	var sParam="";
	switch(div)
    {
    	case (fix_by_booking)://by booking
    		sParam="wob_out_no="		+formObj.wob_out_no.value;
			sParam += "&walc_no="		+formObj.walc_no.value;
			sParam += "&wob_bk_no="		+formObj.wob_bk_no.value;
			sParam += "&sao_sys_no="	+formObj.sao_sys_no.value;
			sParam += "&po_sys_no="		+formObj.po_sys_no.value;
			sParam += "&item_sys_no="	+formObj.item_sys_no.value;
			sParam += "&lot_id="		+formObj.lot_id.value;
			sParam += "&wh_loc_cd="		+formObj.wh_loc_cd.value;
			sParam += "&wib_bk_no="     +formObj.wib_bk_no.value;
			sParam += "&item_seq="		+formObj.item_seq.value;
			sParam += "&div="			+formObj.div.value;
			sParam += "&logo_rectangle="+formObj.logo_rectangle.value;
			return sParam;
    	break;
    	case (fix_by_loadplan)://by load plan
    		sParam="lp_no="		    +formObj.lp_no.value;
			sParam += "&wob_bk_no="		+formObj.wob_bk_no.value;
			sParam += "&sao_sys_no="	+formObj.sao_sys_no.value;
			sParam += "&po_sys_no="		+formObj.po_sys_no.value;
			sParam += "&item_sys_no="	+formObj.item_sys_no.value;
			sParam += "&lot_id="		+formObj.lot_id.value;
			sParam += "&wh_loc_cd="		+formObj.wh_loc_cd.value;
			sParam += "&wib_bk_no="     +formObj.wib_bk_no.value;
			sParam += "&item_seq="		+formObj.item_seq.value;
			sParam += "&logo_rectangle="			+formObj.logo_rectangle.value;
			return sParam;
    	break;
    }
}
function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=ISU', '');
}
function btn_File_Path(){
	var formObj=document.form;
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
function btn_File_Upload(){
	var formObj=document.form;
	//File Path 체크
//	if(isNull(formObj.file_path)){
//		ComShowCodeMessage("COM0119");
//		return ;
//	}
	var filename = formObj.logo_rectangle.value.split(".");
    var length = filename.length;
    if(filename[length-1]=="dll" || filename[length-1]=="html" || filename[length-1]=="htm" || filename[length-1]=="exe")
    	{
    		alert("Invalid file");
    		return;
    	}
	getParam();
	formObj.f_cmd.value=ADD;
	submitForm(ADD);
	
//	ComOpenWait(true);
//	 setTimeout(function(){
//	 if (upload1.GetList().length > 0) {
//	        paramToForm(getParam());
//	        var ibupForm = document.getElementById('ibup_form');
//	        ibupForm.action = ibupForm.action + '&FileUploadModule=ISU';
//	        upload1.SaveStatus();
//	        ClearHTML();
//	        revertParamToForm(getParam());
//	    }
//	 },1000);
//	 ComOpenWait(false);
	//comPopupOK();
  //ComClosePopup(); 
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
		   url: "./WHOCUpdateFileUploadPopupAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
		   async: false,
	       processData: false,
		   success: function(data){
			   //MDM_MCM_0050 (S)
			   //setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());

			  // getParam();
			   //setupPage();
			   
			   //doHideProcess();
			   
//			   formObj.logo_square_flg.value = "N";
//			   formObj.logo_square_flg.checked = false;
//			   
//			   if (formObj.logo_square_yn.value != "") {
//				   getObj('logo_square_id').style.display="inline";
//				   formObj.logo_square_flg.style.display="inline";
//				   formObj.logo_square_chk.style.display="inline";
//				   
//				   $("#logo_square_filenm").html($('logo_square_filenm',data).text());
//				   formObj.logo_square.value = "";
//			   } else {
//				   getObj('logo_square_id').style.display="none";
//				   formObj.logo_square_flg.style.display="none";
//				   formObj.logo_square_chk.style.display="none";
//			   }
//			   
//			   formObj.logo_rec_flg.value = "N";
//			   formObj.logo_rec_flg.checked = false;
			   btn_Close();
//			   
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		 });
}