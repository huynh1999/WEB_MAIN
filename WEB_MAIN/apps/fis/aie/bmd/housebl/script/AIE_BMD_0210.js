//=========================================================
//*@FileName   : AIE_BMD_0130.jsp
//*@FileTitle  : COMMERCIAL Invoice
//*@Description: COMMERCIAL Invoice
//*@author     : CLT
//*@version    : 1.0 - 2014/06/17
//*@since      : 2014/06/17
//
//*@Change history:
//=========================================================
var rtnary = new Array(1);
var callBackFunc = "";
var isEdit = false;
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish() {
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.frm1.obrd_strdt, document.frm1.obrd_enddt);
}
function doWork(srcName) {
	var sheetObj=docObjects[0];
	var formObj=document.form;
	if (!btnGetVisible(srcName)) {
		return;
	}
	var formObj = document.frm1;
	try {
		switch (srcName) {
		case "HBL_POPLIST":// openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary = new Array(1);
			rtnary[0] = $("#air_sea_clss_cd").val();
			rtnary[1] = "O";
			callBackFunc = "HBL_POPLIST";
			modal_center_open('./CMM_POP_0170.clt', rtnary, 818, 468, "yes");
			break;
		case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
         	rtnary=new Array(2);
   			rtnary[0]=formObj.air_sea_clss_cd.value;
   			rtnary[1]="O";
   			callBackFunc = "MBL_POPLIST";
   			modal_center_open('./CMM_POP_0180.clt', rtnary, 818, 468,"yes");
   			break;
		case "SEARCHLIST":
			formObj.print_yn.value = "N";
			if (formObj.txt_hbl_no.value != formObj.hbl_no.value) {
				formObj.intg_bl_seq.value = "";
			}
			if (formObj.txt_hbl_no.value == "" && formObj.intg_bl_seq.value == "") {
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: " + $("#b_no")[0].innerText);
				return;
			}
			formObj.f_cmd.value = SEARCHLIST;
			formObj.action = "./AIE_BMD_0130.clt";
			// formObj.submit();
			submitForm();

			getItemList();

			doWork('SEARCHLIST1');
			isEdit = false;
			break;
		case "SEARCHLIST1":
			//sheetObj.ShowDebugMsg = true;
			formObj.print_yn.value = "N";
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
				sheetObj.DoSearch("AIE_BMD_0210GS.clt", FormQueryString(formObj, "") );
			}
			break;
		case "MODIFY":
			// Input value validation
			formObj.print_yn.value = "N";
			if (!chkInput() ) {
				return;
			}
			if(!saveValid(sheetObj)){
				return;
			}
			if (formObj.intg_bl_seq.value == "") {
				// Please Retrieve first!;
				alert(getLabel('FMS_COM_ALT029'));
				formObj.txt_hbl_no.focus();
				return;
			}
			if (formObj.txt_hbl_no.value != formObj.hbl_no.value) {
				alert(getLabel('FMS_COM_ALT029'));
				formObj.txt_hbl_no.focus();
				return;
			}
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				formObj.f_cmd.value = MODIFY;
				formObj.print_yn.value = "N";
				formObj.save_yn.value = "Y";
				formObj.action = "./AIE_BMD_0210.clt";
				// formObj.submit();
				submitForm(MODIFY);
			}else{
				return;
			}

			//OFVFOUR-7740 [Binex-AWS] Error message from OEM C/I for Produce Cargo Screen
			if ( isDuplicated == "Y" ){
				alert(getLabel('AIR_MSG_121'));
				return;
			}

			var updateFlag = false;
			var rowCnt = docObjects[0].LastRow();			
			for ( var idx = 2; idx < rowCnt; idx++) {
				if(docObjects[0].GetCellValue(idx,"ibflag") == "U" || docObjects[0].GetCellValue(idx,"ibflag") == "I"){
					updateFlag = true;
					break;
				}				
			}
			if(updateFlag){
				doWork('SAVE2');
			}
			showCompleteProcess();
			break;
		case "PRINT":
//			if (formObj.txt_hbl_no.value == "") {
//				// Please Retrieve first!;
//				alert(getLabel('FMS_COM_ALT029'));
//				formObj.txt_hbl_no.focus();
//				return;
//			}
			formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
			if (formObj.intg_bl_seq.value == "") {
				// Please Retrieve first!;
				alert(getLabel('FMS_COM_ALT010'));
				formObj.txt_hbl_no.focus();
				return;
			}
			formObj.f_cmd.value = MODIFY;
			formObj.print_yn.value = "Y";
			formObj.save_yn.value = "N";
			formObj.action = "./AIE_BMD_0210.clt";
			submitForm(MODIFY);

			//OFVFOUR-7740 [Binex-AWS] Error message from OEM C/I for Produce Cargo Screen
			if ( isDuplicated == "Y" ){
				alert(getLabel('AIR_MSG_121'));
				return;
			}

			break;
		case "ROWADD2":
//			var intRows=sheetObj.LastRow()+1;
			sheetObj.DataInsert(-1);
			break;
		case "SAVE2":
			formObj.f_cmd.value=ADD;
			sheetObj.DoSave("AIE_BMD_0210GS.clt", FormQueryString(formObj),"ibflag",false);
			break;
		case "DELETE":
			formObj.intg_bl_seq.value = trim(formObj.intg_bl_seq.value);
			if (formObj.intg_bl_seq.value == "") {
				// Please Retrieve first!;
				alert(getLabel('FMS_COM_ALT010'));
				formObj.txt_hbl_no.focus();
				return;
			}
			if (confirm(getLabel('FMS_COM_CFMDEL'))) {
				submitForm(REMOVE);
			}else{
				return;
			}
			showCompleteProcess();
			sheetObj.RemoveAll();
			clearAll();
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}
function saveValid(sheetObj){
	for(var i=sheetObj.HeaderRows(); i<sheetObj.LastRow();i++){
		if(sheetObj.GetRowStatus(i) != "D"){
			if(sheetObj.GetCellValue(i, "item_qty").trim() == ""){
				ComShowCodeMessage("COM0278", "Qty");
				sheetObj.SelectCell(i, "item_qty");
				return false;
			}
			if(Number(sheetObj.GetCellValue(i, "item_ru")) == 0){
				ComShowCodeMessage("COM0278", "Unit Price");
				sheetObj.SelectCell(i, "item_ru");
				return false;
			}
			if(Number(sheetObj.GetCellValue(i, "item_cd")) == ""){
				ComShowCodeMessage("COM0278", "Description ");
				sheetObj.SelectCell(i, "item_cd");
				return false;
			}
		}
	}

	return true;
}
function chkInput(){
	// 필수 입력값 체크
	var checkBool = false;
	var index;
	$.each(requiredFrom,function(idx, item){
		if($("#"+item.id).val() ==""){
			index = idx;
			checkBool = true;
			return false;
		}
	});
	if(checkBool){
		alert(getLabel('FMS_COM_ALT001')+ "\n\n: " + requiredFrom[index].msg);
		return;
	}
	return true;
}
//OFVFOUR-7740 [Binex-AWS] Error message from OEM C/I for Produce Cargo Screen
var isDuplicated = "";
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
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
var itemName="";
var itemCode="";
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('AIE_BMD_0210_HDR'), Align:"Center"}, { Text:getLabel('AIE_BMD_0210_HDR_1'), Align:"Center"}  ];
             InitHeaders(headers, info);
             var cols = [ {Type:"DelCheck", Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
                          {Type:"ComboEdit", Hidden:0,  Width:200,   Align:"Center",  ColMerge:0,   SaveName:"item_cd",             KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },                          
                        //#3636 [BINEX] AEM C/I for Produce Cargo QTY 로직 변경 필요
                          {Type:"CheckBox",Hidden:0,	Width:70,	Align:"Center",	ColMerge:1,	SaveName:"vsbl_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 , TrueValue:"Y" ,FalseValue:"N" },
                          {Type:"Combo",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:0,   SaveName:"var_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Combo",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:0,   SaveName:"lbl_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Combo",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pck_tp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Combo",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"sz_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"AutoSum",      Hidden:0,  Width:80,   Align:"Right",    ColMerge:0,   SaveName:"item_qty",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Text",      Hidden:1,  Width:80,   Align:"Right",    ColMerge:0,   SaveName:"pck_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"AutoSum",      Hidden:0,  Width:90,   Align:"Right",    ColMerge:0,   SaveName:"grs_kgs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"AutoSum",      Hidden:0,  Width:90,   Align:"Right",    ColMerge:0,   SaveName:"grs_lbs_wgt",  KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"AutoSum",      Hidden:0,  Width:90,   Align:"Right",    ColMerge:0,   SaveName:"net_kgs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"AutoSum",      Hidden:0,  Width:90,   Align:"Right",    ColMerge:0,   SaveName:"net_lbs_wgt",  KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Float",      Hidden:0,  Width:100,   Align:"Right",    ColMerge:0,   SaveName:"item_ru",       KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"AutoSum",      Hidden:0,  Width:80,   Align:"Right",    ColMerge:0,   SaveName:"inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Status",    Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ctrt_no" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"item_sys_no" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"item_atrr_seq" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"oth_itm_seq" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"attr_nm" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"dtlcd_v" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"dtlcd_l" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"dtlcd_p" },
                          {Type:"Text",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"dtlcd_s" }
             ];

             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(350);
             SetColProperty('item_cd', {ComboText:itemName, ComboCode:itemCode} );
             SetColProperty('var_nm', {ComboText:itemName, ComboCode:itemCode} );
             SetColProperty('lbl_nm', {ComboText:itemName, ComboCode:itemCode} );
             SetColProperty('pck_tp_nm', {ComboText:itemName, ComboCode:itemCode} );
             SetColProperty('sz_nm', {ComboText:itemName, ComboCode:itemCode} );
             InitComboNoMatchText(1);
           }
           break;
     }
}


/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	var formObj = document.frm1;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    setMrdFile();
}
function setMrdFile(){
	var formObj = document.frm1;
    if (formObj.print_yn.value == "Y" && formObj.f_wrk_tp.value != "") {
		formObj.file_name.value = 'commercial_invoice_01_BNXC.mrd';
		formObj.title.value = 'COMMERCIAL INVOICE';
		// Parameter Setting
		var param = '[' + "'" + formObj.intg_bl_seq.value + "'" + ']'; // [1]
		param += '[' + formObj.f_wrk_tp.value + ']'; // [2]
		param += '[' + $("#f_ttl_grs_wgt").val() + " KGS"  + ']'; // [3]
		param += '[' + $("#f_ttl_net_wgt").val() + " KGS" + ']'; // [4]
		param += '[' + $("#b_no")[0].innerText + ']'; // [5]
		param += '[' + ($("#air_sea_clss_cd").val() == "A" ? "Flight No" : "Vessel")  + ']'; // [6]
		formObj.rd_param.value = param;
		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	}

}
var requiredFrom = [];
function setRequiredFrom(){
	$.each($(":input.db_data"),function(idx, item){
		if(item.getAttribute("required")){
			requiredFrom.push({"id": item.id, "msg": item.getAttribute("msg")});
		}
	});
}
function getItemList(){
	sendData = {
		"shpr_cd":$("#f_shpr_cd").val()
	};
	ajaxSendPost(setItemData, 'reqVal', '&goWhere=aj&bcKey=getCtrtCustItemAttr&data='+JSON.stringify(sendData), './GateServlet.gsl');
}
var itemData=[];
function setItemData(rtnVal){
	var returnVal = ajaxRes(rtnVal);
	itemName = "";
	itemCode = "";
	blData = returnVal;
	if(returnVal != false){
		itemName +="|";
		itemCode +="|";
		$.each(returnVal,function(idx, item){
			itemName += item.attr_nm; //+ " " + item.var_nm + " " + item.lbl_nm + " " + item.sz_nm; //#2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정
			itemCode += item.ctrt_no + item.item_atrr_seq + item.item_sys_no;
			if(returnVal.length > idx+1){
				itemName += "|";
				itemCode += "|";
			}
			item["index"] = item.ctrt_no + item.item_atrr_seq + item.item_sys_no;
		});
		itemData = returnVal;
	}

	docObjects[0].SetColProperty("item_cd", {ComboText:itemName, ComboCode:itemCode} );

}
/**
 * 달력팝업을 호출한다.
 */
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 팝업 호출
		var cal = new ComCalendar();
		cal.select(formObj, 'MM-dd-yyyy');
		break;
	}
}
/**
 * AJAX RETURN BL_INFO를 가져온다.
 */
function getBlInfo(reqVal) {
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			// 조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			if (rtnArr[0] != "null") {
				frm1.txt_ship_nm.value = rtnArr[0];
				frm1.txt_input_03.value = rtnArr[0];
			}
			if (rtnArr[2] != "null") {
				frm1.txt_nty_nm.value = rtnArr[2];
			}
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

function openPopUp(srcName, curObj, AirSea) {
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var formObj = document.frm1;
	try {
		switch (srcName) {
		case "LINER_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(2);
			rtnary[0] = "1";
			if(curObj.type == "button"){
	   			rtnary[1]= "";
	   		}else{
	   			if(curObj.id == "vendor_pop" || curObj.id == "f_vendor_id" || curObj.id == "f_vendor_nm"){
	   				rtnary[1]=formObj.f_vendor_nm.value;
	   			}else{
	   				rtnary[1]=formObj.f_carr_trdp_nm.value;
	   			}
	   		}
			rtnary[2] = window;
			var airSeaTp = "";
			var curObjId = curObj.id;
			var cstmTpCd = '';
			// 선사
			if (curObjId == 'liner') {
				if (AirSea == 'A') {
					cstmTpCd = 'AC';
				} else {
					cstmTpCd = 'LN';
				}
			}
			if(curObj.id == "vendor_pop" || curObj.id == "f_vendor_id" || curObj.id == "f_vendor_nm"){
				callBackFunc = "LINER_POPLIST_VENDOR";
			} else{
				callBackFunc = "LINER_POPLIST";
			}

			modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary,
					1150, 650, "yes");

			break;
			case "COUNTRY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]="";
				callBackFunc = "COUNTRY_POPLIST";
				modal_center_open('./CMM_POP_0020.clt', rtnary, 560,480,"yes");
			break;
		} // end switch
	} catch (e) {
		if (e == "[object Error]") {
			// Unexpected Error occurred. Please contact Help Desk!
			alert(getLabel('FMS_COM_ERR002'));
		} else {
			// System Error! + MSG
			alert(getLabel('FMS_COM_ERR001') + " - " + e);
		}
	}
}

//저장할 데이터를 각 목록에서 가지고 온다
function COUNTRY_POPLIST(rtnVal)
{
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}
        else{
			var rtnValAry=rtnVal.split("|");
			frm1.f_cnt_origin.value=rtnValAry[0];//cd_val
			frm1.f_cnt_origin_nm.value=rtnValAry[1];//cd_nm
			frm1.h_cnt_nm.value=rtnValAry[1];//cd_nm
			//frm1.cnt_nm.onchange();
		}
}
function HBL_POPLIST(rtnVal) {
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.intg_bl_seq.value = rtnValAry[3];// intg_bl_seq
		formObj.txt_hbl_no.value = rtnValAry[0];// house_bl_no
		formObj.hbl_no.value = rtnValAry[0];// house_bl_no
		doWork("SEARCHLIST");
	}
}
function MBL_POPLIST(rtnVal){
  	var formObj=document.frm1;
      if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.txt_hbl_no.value=rtnValAry[0];//masert_bl_no
		formObj.hbl_no.value=rtnValAry[0];//masert_bl_no

		doWork("SEARCHLIST");
	}
}

function LINER_POPLIST(rtnVal) {
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_carr_trdp_cd.value = rtnValAry[0];// trdp_cd
		formObj.f_carr_trdp_nm.value = rtnValAry[2];// full_nm
	}
}
function LINER_POPLIST_VENDOR(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.f_vendor_cd.value = rtnValAry[0];// trdp_cd
		formObj.f_vendor_nm.value = rtnValAry[2];// full_nm
		formObj.f_vendor.value = rtnValAry[7];// full_nm
	}
}

function checkBlSeq(){
	if(frm1.txt_hbl_no.value!=''&&curHblNo!=frm1.txt_hbl_no.value){
		frm1.intg_bl_seq.value='';
		if(frm1.txt_hbl_no.value!=''){
			ajaxSendPost(getBlBkgSeq, 'reqVal', '&goWhere=aj&bcKey=getBlBkgSeq&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=H&f_bl_no='+frm1.txt_hbl_no.value, './GateServlet.gsl');
		}
	}else if(frm1.txt_hbl_no.value!=''&&curHblNo==frm1.txt_hbl_no.value){
		return;
	}else{
		//clearAll();
		frm1.intg_bl_seq.value='';
		return;
	}
}
function submitForm(cmd) {
	var formObj = document.frm1;
	var intg_bl_seq= formObj.intg_bl_seq.value;
	var bl_no= formObj.txt_hbl_no.value;
	var f_parm_wrk_tp = formObj.f_parm_wrk_tp.value;
	var air_sea_clss_cd = formObj.air_sea_clss_cd.value;
	var biz_clss_cd = formObj.biz_clss_cd.value;
	var sendData = {
			"intg_bl_seq":intg_bl_seq,
			"bl_no":bl_no,
			"f_parm_wrk_tp":f_parm_wrk_tp,
			"air_sea_clss_cd":air_sea_clss_cd,
			"biz_clss_cd":biz_clss_cd
	};

	if(cmd == MODIFY){
		$.each($(":input.db_data"),function(idx, item){

			if(item.id == "f_eta_dttm" || item.id == "f_dept_dt" || item.id == "f_inv_dt"){
				sendData[item.id] = item.value.replaceAll("-","");
				/* #3468 [BINEX]C/I & P/L 추가 수정 */
				if(item.id == "f_eta_dttm") {
					sendData['f_eta_dttm2'] = $('#f_eta_dttm2').val();
				}
			}else{
				sendData[item.id] = item.value;
			}
		});
		ajaxSendPost(setFormData, 'reqVal', '&goWhere=aj&bcKey=modifyMCHouseBLInfo&data='+encodeURIComponent(JSON.stringify(sendData)), './GateServlet.gsl');
	}else if(cmd == REMOVE){
		$.each($(":input.db_data"),function(idx, item){

			if(item.id == "f_eta_dttm" || item.id == "f_dept_dt" || item.id == "f_inv_dt"){
				sendData[item.id] = item.value.replaceAll("-","");
			}else{
				sendData[item.id] = item.value;
			}
		});
		ajaxSendPost(setFormData, 'reqVal', '&goWhere=aj&bcKey=deleteMCHouseBLInfo&data='+encodeURIComponent(JSON.stringify(sendData)), './GateServlet.gsl');
	}else{
		ajaxSendPost(setFormData, 'reqVal', '&goWhere=aj&bcKey=getCIHouseBLInfo&data='+encodeURIComponent(JSON.stringify(sendData)), './GateServlet.gsl');
	}

}
var blData;
function setFormData(rtnVal){
	var returnVal = ajaxRes(rtnVal)
	blData = returnVal;

	if(returnVal != null && returnVal != false){
		//OFVFOUR-7740 [Binex-AWS] Error message from OEM C/I for Produce Cargo Screen
		if (returnVal["status"] == "DUPLICATED"){
			isDuplicated = "Y";
			return;
		}else{
			isDuplicated = "N";
		}
		$.each($(":input.db_data"),function(idx, item){
			item.value = "";
			var attr = item.getAttribute("columnName");
			if(attr){
				if(blData[attr]){
					var format = item.getAttribute("format");
					if(format === "date"){
						if(blData[attr].length != 12) {
							item.value = modiStrDateType(blData[attr],1);
						} else {
							/* #3468 [BINEX]C/I & P/L 추가 수정 */
							var strDate = blData[attr];
							item.value = strDate.substring(4,6) + "-" + strDate.substring(6,8) + "-" + strDate.substring(0,4);
							$('#f_eta_dttm2').val(strDate.substring(8,12));
						}
					}else{
						if(item.localName == "select"){
							$("#f_inco_cd").val(blData[attr]).attr("selected", "selected");
						}else{
							item.value = blData[attr];
						}

					}

				}
			}
		});
	}
	sumData();
	setMrdFile();
}
function clearAll(){
	$.each($(":input.search_form"),function(idx, item){
		item.value = "";
	});
}
function ajaxRes(rtnVal){
	var returnVal = false;
	var doc=getAjaxMsgXML(rtnVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] != "-1"){
				var arrData = JSON.parse(doc[1]);
				returnVal = arrData;
				return returnVal;
			}
		}
	}else{
		alert("System error.")
		return false;
	}
}

function sheet1_OnChange(sheetObj, Row, Col, Value){

	if(Col == 1){

		$.each(itemData.filter(function(value){return (value.index == Value)}), function(idx, item){

			//#3636 [BINEX] AEM C/I for Produce Cargo QTY 로직 변경 필요
			var item_qty = Number(sheetObj.GetCellValue(Row,"item_qty"));
			if(item.vsbl_flg != "Y" && item.vsbl_flg != 1){
				sheetObj.SetCellValue(Row, "item_qty",0,0);
				item_qty = 1;
				sheetObj.SetCellEditable(Row, "item_qty", 0);
			}else{
				sheetObj.SetCellEditable(Row, "item_qty", 1);
			}
			//#2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정
			//V, L, P, S combo setting
			sheetObj.CellComboItem(Row, "var_nm", {"ComboCode":item.dtlcd_v,"ComboText":item.dtlcd_v});
			sheetObj.CellComboItem(Row, "lbl_nm", {"ComboCode":item.dtlcd_l,"ComboText":item.dtlcd_l});
			sheetObj.CellComboItem(Row, "pck_tp_nm", {"ComboCode":item.dtlcd_p,"ComboText":item.dtlcd_p});
			sheetObj.CellComboItem(Row, "sz_nm", {"ComboCode":item.dtlcd_s,"ComboText":item.dtlcd_s});

			sheetObj.SetCellValue(Row, "var_nm",item.var_nm,0);
			sheetObj.SetCellValue(Row, "lbl_nm",item.lbl_nm,0);
			sheetObj.SetCellValue(Row, "pck_tp_nm",item.pck_tp_nm,0);
			sheetObj.SetCellValue(Row, "sz_nm",item.sz_nm,0);
			sheetObj.SetCellValue(Row, "ctrt_no",item.ctrt_no,0);
			sheetObj.SetCellValue(Row, "item_sys_no",item.item_sys_no,0);
			sheetObj.SetCellValue(Row, "item_atrr_seq",item.item_atrr_seq,0);
			sheetObj.SetCellValue(Row, "item_ru",item.inv_amt,0);
			sheetObj.SetCellValue(Row, "inv_amt",Number(sheetObj.GetCellValue(Row,"item_ru")) * item_qty,0);
			sheetObj.SetCellValue(Row, "grs_kgs_wgt",Number(item.grs_kgs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "grs_lbs_wgt",Number(item.grs_lbs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "net_kgs_wgt",Number(item.net_kgs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "net_lbs_wgt",Number(item.net_lbs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "vsbl_flg",item.vsbl_flg,0);			
			
		});
		sheetObj.SetCellValue(Row, "attr_nm", sheetObj.GetCellText(Row, "item_cd"), 0);
	}else if(Col == 7 || Col == 13){
		var index = sheetObj.GetCellValue(Row,"item_cd");
		$.each(itemData.filter(function(value){return (value.index == index)}), function(idx, item){
			//#3636 [BINEX] AEM C/I for Produce Cargo QTY 로직 변경 필요
			var item_qty = Number(sheetObj.GetCellValue(Row,"item_qty"));
			if(item.vsbl_flg != "Y" && item.vsbl_flg != 1){
				item_qty = 1;
			}
			sheetObj.SetCellValue(Row, "inv_amt",Number(sheetObj.GetCellValue(Row,"item_ru")) * item_qty,0);
			sheetObj.SetCellValue(Row, "grs_kgs_wgt",Number(item.grs_kgs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "grs_lbs_wgt",Number(item.grs_lbs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "net_kgs_wgt",Number(item.net_kgs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "net_lbs_wgt",Number(item.net_lbs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
		});
	}else if(Col == 9 || Col == 10 || Col == 11 || Col == 12){
		weightChange(sheetObj, Row, Col, Value);
		$.each(itemData.filter(function(value){return (value.index == index)}), function(idx, item){
			//#3636 [BINEX] AEM C/I for Produce Cargo QTY 로직 변경 필요
			var item_qty = Number(sheetObj.GetCellValue(Row,"item_qty"));
			if(item.vsbl_flg != "Y" && item.vsbl_flg != 1){
				item_qty = 1;
			}
			sheetObj.SetCellValue(Row, "inv_amt",Number(sheetObj.GetCellValue(Row,"item_ru")) * item_qty,0);
			sheetObj.SetCellValue(Row, "grs_kgs_wgt", Number(item.grs_kgs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "grs_lbs_wgt",Number(item.grs_lbs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "net_kgs_wgt",Number(item.net_kgs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
			sheetObj.SetCellValue(Row, "net_lbs_wgt",Number(item.net_lbs_wgt) * Number(sheetObj.GetCellValue(Row,"item_qty")),0);
		});
	}
	sumData();
}
function weightChange(sheetObj, Row, Col, Value){
	if(Col == 9 || Col == 11){
		var rndXLValue=roundXL(Value * CNVT_CNST_KG_LB, 2);
		if(Col == 9){
			sheetObj.SetCellValue(Row, "grs_lbs_wgt",rndXLValue,0);
		}else{
			sheetObj.SetCellValue(Row, "net_lbs_wgt",rndXLValue,0);
		}
	}
	else{
		var rndXLValue=roundXL(Value / CNVT_CNST_KG_LB, 2);
		if(Col == 10){
			sheetObj.SetCellValue(Row, "grs_kgs_wgt",rndXLValue,0);
		}else{
			sheetObj.SetCellValue(Row, "net_kgs_wgt",rndXLValue,0);
		}
	}
}
function sumData(){
	var rowCnt = docObjects[0].LastRow();
	var totalGrsWgt = 0;
	var totalNetWgt = 0;
	for ( var idx = 2; idx < rowCnt; idx++) {
		if(docObjects[0].GetCellValue(idx,"C1").isNumber()){
			totalGrsWgt += Number(docObjects[0].GetCellValue(idx,"grs_kgs_wgt"));
			totalNetWgt += Number(docObjects[0].GetCellValue(idx,"net_kgs_wgt"));
		}
	}
	$("#f_ttl_grs_wgt").val(doMoneyFmt(Number(totalGrsWgt).toFixed(3)));
	$("#f_ttl_net_wgt").val(doMoneyFmt(Number(totalNetWgt).toFixed(3)));
}

//#3636 [BINEX] AEM C/I for Produce Cargo QTY 로직 변경 필요
function blockQty(){
	var rowCnt = docObjects[0].LastRow();	
	for ( var idx = 2; idx < rowCnt; idx++) {
		if(docObjects[0].GetCellValue(idx,"vsbl_flg") != "Y" && docObjects[0].GetCellValue(idx,"vsbl_flg") != "1"){
 			docObjects[0].SetCellEditable(idx,"item_qty",0);
 		}
	}
}
		
function blPopList(){
	if($("#biz_clss_cd").val() == "M"){
		doWork("MBL_POPLIST");
	}else{
		doWork("HBL_POPLIST");
	}
}
function setLable(){
	if($("#biz_clss_cd").val() == "M"){
		if($("#air_sea_clss_cd").val() == "A"){
			$("#b_no")[0].innerText = lableJs.MAWB_No;
			$("#awb_no")[0].innerText = lableJs.MAWB_No;
		}else{
			$("#b_no")[0].innerText = lableJs.MBL_No;
			$("#awb_no")[0].innerText = lableJs.MBL_No;
		}
	}else{
		if($("#air_sea_clss_cd").val() == "A"){
			$("#b_no")[0].innerText = lableJs.HAWB_No;
			$("#awb_no")[0].innerText = lableJs.HAWB_No;
		}else{
			$("#b_no")[0].innerText = lableJs.HBL_No;
			$("#awb_no")[0].innerText = lableJs.HBL_No;
		}

	}
}
function setOriginCnt(){
	frm1.f_cnt_origin.value=$("#cnt_cd").val();//cd_val
	frm1.f_cnt_origin_nm.value=$("#cnt_nm").val();//cd_nm
	frm1.h_cnt_nm.value=$("#cnt_nm").val();//cd_nm
}
var onKeyDownFlg = true;
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.

	var formObj=document.frm1;

	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				onKeyDownFlg = false;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				onKeyDownFlg = true;
			}
		} else if ( tmp == "onBlur" ) {
			if(!onKeyDownFlg) return;
			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}
				else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(str == "trdpCode_cs"){
			formObj.cust_cd.value = "";
			formObj.cust_nm.value = "";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var targetFr = 'mainFrame';
	var formObj = document.frm1;
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			// 조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
			if (CODETYPE == "partner_liner") {
				formObj.f_carr_trdp_cd.value = masterVals[0];
				formObj.f_carr_trdp_nm.value = masterVals[3];
			}else if (CODETYPE == "country") {
				formObj.f_cnt_origin.value = masterVals[0];
				formObj.f_cnt_origin_nm.value = masterVals[3];
			}else if (CODETYPE == "Location_pol") {
				formObj.f_pol_cd.value = masterVals[0];
				formObj.f_dept.value = masterVals[3];
			}else if (CODETYPE == "Location_air_des") {
				formObj.f_pod_cd.value = masterVals[0];
				formObj.f_dest.value = masterVals[3];
			}else if (CODETYPE == "trdpCode_liner") {
				formObj.f_carr_trdp_cd.value = masterVals[0];
				formObj.f_carr_trdp_nm.value = masterVals[3];
			}else if (CODETYPE == "trdpCode_vendor") {
				formObj.f_vendor_cd.value = masterVals[0];
				formObj.f_vendor_nm.value = masterVals[3];
				formObj.f_vendor.value = masterVals[1];
			}
		} else {
			if (CODETYPE == "partner_liner") {
				formObj.f_carr_trdp_cd.value = "";
				formObj.f_carr_trdp_nm.value = "";
			}
		}
	} else {
		// Error Errupt!
		alert(getLabel('FMS_COM_ERR001'));
	}
}
/*
 * form에 형태를 맞춰 넣기 위한 메소드
 * type 1 : yyyyMMdd --> MM-dd-yyyy
 */
function modiStrDateType(strDate, type){
	var result="";
	if(type=="1"){
		if(strDate.length!=8){
		}else{
			result += strDate.substring(4,6) + "-" + strDate.substring(6,8) + "-" + strDate.substring(0,4);
		}
	}else{
	}
	return result;
}
function selectBlInfo(obj){
	if(isEdit){
		var formObj = document.frm1;
		if (formObj.txt_hbl_no.value != "") {
			doWork("SEARCHLIST");
		}
	}
}

function isBlNoEdit(){
	if(!isEdit){
		isEdit = true;
	}
}

/*
 * sheet1 조회 후 attr_nm이 combo에 없는 경우 add
 */
function sheet1_OnSearchEnd(sheetObj, errMsg){
	changeComboTextForDiff(sheetObj);
	blockQty();
	sumData();
}
/*
 * sheet1 저장 후 attr_nm이 combo에 없는 경우 add
 */
function sheet1_OnSaveEnd(sheetObj, errMsg){
	changeComboTextForDiff(sheetObj);
	blockQty();
}

/*
 * attr_nm이 combo에 없는 경우 add
 * #2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정
 */
function changeComboTextForDiff(sheetObj){
	var itCd = "";
	var itReName = "";
	var sText = "";
	var sText2 = "";
	var sCode = "";
	var arrText;
	var arrCode;
	var selComboValue = "";
	for(var ii=sheetObj.HeaderRows(); ii<sheetObj.LastRow(); ii++) {
		itCd = sheetObj.GetCellText(ii, "item_cd");
		itReName = sheetObj.GetCellValue(ii, "attr_nm");
		selComboValue = sheetObj.GetCellValue(ii, "item_cd");
		if(itCd != itReName) {
			sText2 = "";
			sText = sheetObj.GetComboInfo(ii, "item_cd", "Text");
			sCode = sheetObj.GetComboInfo(ii, "item_cd", "Code");

			arrText = sText.split("|");
			arrCode = sCode.split("|");
			for(i=0; i<arrCode.length; i++) {
			    if(itCd == arrText[i] &&  itReName != arrText[i]) {
			        arrText[i] = itReName;
			    }
			    if(i!=0) {
			    	sText2 += "|";
			    }
			    sText2 += arrText[i];
			}
			sheetObj.CellComboItem(ii, "item_cd", {"ComboCode":sCode,"ComboText":sText2});
			sheetObj.SetCellValue(ii,"item_cd", selComboValue, 0);

		}
		sheetObj.CellComboItem(ii, "var_nm", 	{"ComboCode":sheetObj.GetCellValue(ii, "dtlcd_v"),"ComboText":sheetObj.GetCellValue(ii, "dtlcd_v")});
		sheetObj.CellComboItem(ii, "lbl_nm", 	{"ComboCode":sheetObj.GetCellValue(ii, "dtlcd_l"),"ComboText":sheetObj.GetCellValue(ii, "dtlcd_l")});
		sheetObj.CellComboItem(ii, "pck_tp_nm",	{"ComboCode":sheetObj.GetCellValue(ii, "dtlcd_p"),"ComboText":sheetObj.GetCellValue(ii, "dtlcd_p")});
		sheetObj.CellComboItem(ii, "sz_nm",		{"ComboCode":sheetObj.GetCellValue(ii, "dtlcd_s"),"ComboText":sheetObj.GetCellValue(ii, "dtlcd_s")});
	}
}

//#3468 [BINEX]C/I & P/L 추가 수정
$(document).ready(function(){
	if($('#air_sea_clss_cd').val() == 'S') {
		$('#f_eta_dttm2').attr('style', 'display:none');
	}
});