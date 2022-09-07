var opener = window.dialogArguments;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
var sheetCnt = 0;
var docObjects=new Array();


var comboObjects = new Array();
var comboCnt = 0;


var fix_grid01 = "Grd01"; //dummy sheet


var isSaveFlag = false; // save 여부


/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});


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
	
	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }	
	
	initControl();	
	
	
	// Print Size 세션값 세팅
//	var paper_size = $("#paper_size").val();	
//	if (!ComIsNull(paper_size)) {
//		comboObjects[0].Code = paper_size;
//	}	
	// 디폴트 Search 실행
	if ($("#wob_bk_no").val().trim() != "") 
	{
		btn_Search();
	}
}

/**
 * Combo Object를 배열로 등록
 */    
 function setComboObject(combo_obj){
	comboObjects[comboCnt++] = combo_obj;
 }

 /**
  * Combo 기본 설정 
  * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
  * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
  */ 
function initCombo(comboObj, comboNo) {
	var vTextSplit = null;
	var vCodeSplit = null;

	switch(comboObj.id) {
	case "print_size_tp":
		var txt = "A4|Letter";
		var val = "A4|LT";
		vTextSplit = txt.split("|");
		vCodeSplit = val.split("|");				
		with(comboObj) {
			comboObj.DropHeight=125;
			for(var j=0;j<vCodeSplit.length; j++){
				InsertItem(j,  vTextSplit[j], vCodeSplit[j]);
			}
			comboObj.index = 0;
     	} 			
		break;		
	}
}  

/** 
 * initControl()
 */ 
function initControl() {
	var formObj = document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate", document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
	axon_event.addListenerForm("change", "form_onChange", formObj);
	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
}

// 화면 Merge 컬럼 Name
var InputName = "cust_ord_no|supv_nm|work_by|msg_to_work|work_sht_yn|wh_cd";
/**
 * Search 
 */
function btn_Search() {
	var formObj=document.form;
	var sXml = sheet1.GetSearchData("./searchWHOutWorkShtInfoGS.clt", "wob_bk_no=" + $("#wob_bk_no").val()+"&f_cmd="+ SEARCH);
	
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.cust_ord_no.value = $xml.find( "cust_ord_no").text();
	formObj.supv_nm.value = $xml.find( "supv_nm").text();
	formObj.work_by.value = $xml.find( "work_by").text();
	formObj.msg_to_work.value = $xml.find( "msg_to_work").text();
	formObj.work_sht_yn.value = $xml.find( "work_sht_yn").text();
	formObj.wh_cd.value = $xml.find( "wh_cd").text();
	
	//work sht존재유무에 따른 delete버튼 활성화 처리
	if($("#work_sht_yn").val() == "Y")
	{
		ComBtnEnable("btnDelete"); 
	}
	else
	{
		ComBtnDisable("btnDelete");
	}
}



/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt = 0;
	switch(sheetObj.id) {
		case "sheet1":      //dummy sheet
			with (sheetObj) {	
		      //no support[check again]CLT 			if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		      var hdr1="dummy";
		      var prefix="Grd01";

		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" } ];
		      SetSheetHeight(230);
		      InitColumns(cols);
  			  SetEditable(1);
		   }                                                      
		break;
	}
}


//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
   
	/*******************************************************/
	var formObj = document.form;

	try {
		switch(srcName) {
		case "btn_unload_dt":	
			var cal=new ComCalendar();
        	cal.select(formObj.unload_dt, 'MM-dd-yyyy');
			break;
		case "SAVE":
			btn_Save();
			break;
		case "DELETE":
			btn_Delete();
				break;
		case "PRINT":
			btn_Print();
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

/**
 * Save
 */
function btn_Save() {	
	var formObj=document.form;
	if ($("#supv_nm").val().trim() == "") {
		ComShowCodeMessage("COM0278", "Supervisor");
		ComSetFocus(formObj.supv_nm);
		return;
	}
	if(ComGetLenByByte($("#supv_nm").val().trim()) > 100)
	{	
		ComShowCodeMessage("COM0215", "Supervisor[100]");
		ComSetFocus(formObj.supv_nm);
		return ;
	}
	if(ComGetLenByByte($("#work_by").val().trim()) > 100)
	{	
		ComShowCodeMessage("COM0215", "Working by[100]");
		ComSetFocus(formObj.work_by);
		return ;
	}
	if(ComGetLenByByte($("#msg_to_work").val().trim()) > 100)
	{	
		ComShowCodeMessage("COM0215", "Working Instruction[100]");
		ComSetFocus(formObj.msg_to_work);
		return ;
	}
	if (ComShowCodeConfirm("COM0036") == false) {
		return;
	}
	var work_sht_yn=$("#work_sht_yn").val();
	formObj.f_cmd.value=ADD;
	var saveXml=sheet1.GetSaveData("./saveWHOutWorkShtInfoGS.clt",  FormQueryString(formObj, ""));
	sheet1.LoadSaveData(saveXml);
	// Save 후 조회
	if (saveXml.indexOf('<ERROR>') == -1) 
	{			
		//ComShowCodeMessage("COM0093", ""); // Saved successfully.
		showCompleteProcess();
		btn_Search();
		if(work_sht_yn == "N")
		{
			//work sht가 존재하지않다가 신규입력된경우
			SaveAfterProcess("Y");
		}
		else
		{
			//work sht가 존재했었고 update된경우
			SaveAfterProcess("update");
		}
	}
}
function SaveAfterProcess(work_sht_yn)
{
	if(work_sht_yn == "update") //업데이트시 화면에 SHT관련 버튼, 이미지 변동 없음.
	{
		return;
	}
	opener.setWorkShtInfo(work_sht_yn, $("#wob_bk_no").val());
}
/**
 * Delete
 */
function btn_Delete() {
	var formObj=document.form;
	if (ComShowCodeConfirm("COM0053") == false) {
		return;
	}
	formObj.f_cmd.value=MODIFY;
	var saveXml=sheet1.GetSaveData("./removeWHOutWorkShtInfoGS.clt",FormQueryString(formObj, ""));
	sheet1.LoadSaveData(saveXml);
	// Delete 후 조회
	if (saveXml.indexOf('<ERROR>') == -1) {
		showCompleteProcess();
		//ComShowCodeMessage("COM0080", "");
		btn_Search();
		SaveAfterProcess("N");
	}
}
/**
 * Close
 */
function btn_Close() {
  ComClosePopup(); 
}
/**
 * Print
 */
function btn_Print() {
	var formObj=document.form;
	var wob_bk_no=ComGetObjValue(formObj.wob_bk_no);	
	if (ComIsEmpty(wob_bk_no)) {
		ComShowCodeMessage("COM0015"); // Booking No does not exist.
		return;
	}		
//	//--프린트 생성
//	var rdParam="";
//	var rdParam_default=" /rpagenuminit [1] /riprnmargin ";
//	var print="<input type=\"hidden\" id=\"com_mrdBodyTitle\" name=\"com_mrdBodyTitle\" value=\"Outbooking Print\" />";
//	var mrd_size="";
//	if($("#print_size_tp")[0].GetSelectCode()== "LT")
//	{
//		mrd_size="_LT";
//	}
	
	
	//Outbound Work Sheet
	var formObj = document.form;
	formObj.title.value="Outbound Work Sheet Report";
	var fileName ='WH_OUT_WORK_SHT.mrd' ;
	var param = "[" + 'WOB_BK_NO' + "]"+"['" + $("#wob_bk_no").val() + "']"+"["+"]"+"['" + $("#wob_bk_no").val().replaceAll("','","") + "']"; 
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	
}
