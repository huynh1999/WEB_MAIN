/*<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ManualAllcPopup.js
*@FileTitle  : Manual Allocation
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--%>*/
var firCalFlag = false;
var sheetCnt=0;
var docObjects=new Array();
var fix_grid01="Grd01";
var opener = opener;
var checkallocation = true;
if (!opener) opener=window.opener;
if (!opener) opener = parent;
/*
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/*
* Sheet  onLoad
*/
function loadPage() {
	
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
    initControl();
    if($("#search_no").val().trim() == "" || $("#rum").val().trim() == "" || $("#wh_cd").val().trim() == "")
	{
    	ComClosePopup(); 
    	return;
	}
    //팝업조회
    searchBaseInfo();
}
/*
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
    /*axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);*/
}
/*
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	      var prefix=fix_grid01;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WaveSmpManualAllcPopup_HDR1'), Align:"Center"}
	      				 ,{ Text:getLabel('WaveSmpManualAllcPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols =[{Type:"Date",     	Hidden:0,  	Width:80,	Align:"Center",		ColMerge:1, SaveName:prefix+"inbound_dt", 	KeyField:0,		UpdateEdit:0, 	Format:"Ymd"		},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Left",		ColMerge:1, SaveName:prefix+"lot_no", 		KeyField:0,		UpdateEdit:0, 	Format:""				},
	  	             {Type:"PopupEdit", Hidden:0, 	Width:90,	Align:"Center",		ColMerge:1, SaveName:prefix+"wh_loc_cd_nm", KeyField:0,		UpdateEdit:0, 	Format:""				},
	  	             {Type:"Int",     	Hidden:0,  	Width:70,	Align:"Right",		ColMerge:1, SaveName:prefix+"stock", 		KeyField:0,		UpdateEdit:0, 	Format:"Integer",  PointCount:0	},
	  	             {Type:"AutoSum",   Hidden:0, 	Width:70,	Align:"Right",		ColMerge:1, SaveName:prefix+"alloc", 		KeyField:0, 					Format:"Integer",  PointCount:0	},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Center",		ColMerge:1, SaveName:prefix+"wib_bk_no", 	KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Left",		ColMerge:1, SaveName:prefix+"po_no",  		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Date",     	Hidden:0,  	Width:100,	Align:"Center",		ColMerge:1, SaveName:prefix+"exp_dt", 		KeyField:0,		UpdateEdit:0, 	Format:"Ymd"	},
	  	             {Type:"Text",     	Hidden:0,  	Width:80,	Align:"Left",		ColMerge:1, SaveName:prefix+"lot_04", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:80,	Align:"Left",		ColMerge:1, SaveName:prefix+"lot_05", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Center",		ColMerge:1, SaveName:prefix+"lot_id", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Left",		ColMerge:1, SaveName:prefix+"ref_no", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:100,	Align:"Right",		ColMerge:1, SaveName:prefix+"item_ser_no", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Center",		ColMerge:1, SaveName:prefix+"lic_plat_no", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             {Type:"Text",     	Hidden:0,  	Width:120,	Align:"Center",		ColMerge:1, SaveName:prefix+"eq_no", 		KeyField:0,		UpdateEdit:0, 	Format:""		},
	  	             
	  	             {Type:"Status",    Hidden:1, 	Width:0,	Align:"Center", 				SaveName:prefix+"ibflag"},
	  	             {Type:"Text",      Hidden:1, 	Width:120,	Align:"Left", 					SaveName:prefix+"div" },
	  	             {Type:"Text",      Hidden:1, 	Width:70,	Align:"Right", 					SaveName:prefix+"issu_cnt", 									Format:"Integer",  PointCount:0	 },
	  	             {Type:"Text",      Hidden:1, 	Width:70,	Align:"Right", 					SaveName:prefix+"load_plan_cnt", 								Format:"Integer",  PointCount:0	 },
	  	             {Type:"Text",      Hidden:1, 	Width:70,	Align:"Right", 					SaveName:prefix+"load_item_ea_qty_min_check", 					Format:"Integer",  PointCount:0	 },
	  	             {Type:"Text",      Hidden:1, 	Width:70,	Align:"Right", 					SaveName:prefix+"alloc_org",									Format:"Integer",  PointCount:0	 },
	  	             {Type:"Text",      Hidden:1, 	Width:120,	Align:"Left", 					SaveName:prefix+"po_sys_no",									Format:""	},
	  	             {Type:"Text",      Hidden:1, 	Width:120,	Align:"Left", 					SaveName:prefix+"wh_loc_cd",									Format:""	},
	  	             {Type:"Text",      Hidden:1, 	Width:120,	Align:"Left", 					SaveName:prefix+"item_seq",									Format:""	}];
	       
	      InitColumns(cols);
	      SetSheetHeight(313);
	      SetEditable(1);
	      resizeSheet();
	            }
	      break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

/*
 * search End event
 */
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {	
	var complete_cnt = 0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1;i++){ //sum행은 제외하기위하여 lastrow -1
		if(sheetObj.GetCellValue(i, fix_grid01 + "div") == "1") //색상변경
		{
			sheetObj.SetRowBackColor(i,"#FFDDDD");
			if(sheetObj.GetCellValue(i, fix_grid01 + "issu_cnt") > 0 //issu_cnt건이 존재할경우
					|| sheetObj.GetCellValue(i, fix_grid01 + "load_plan_cnt") > 0 //LP_STS_CD='P'(Partial 건수체크)건.
			                                                       		
			)
			{
				sheetObj.SetCellEditable(i, fix_grid01 + "alloc",0);
				

			}
			else
			{
				sheetObj.SetCellBackColor(i, fix_grid01 + "alloc","#FFFFFF");
			}
		}
	}
	//합계행 hidden처리
	sheetObj.SetRowHidden(sheetObj.LastRow(),1);
	//--금액 SUM값들 재계산
	reCalcQty(sheetObj);
}
/*
 * ONCHANGE
 */
function sheet1_OnChange(sheetObj, Row, Col, Value)
{
	var colStr=sheetObj.ColSaveName(Col);
var stock=eval(sheetObj.GetCellValue(Row, fix_grid01 + "stock"));
var load_item_ea_qty_min_check=eval(sheetObj.GetCellValue(Row, fix_grid01 + "load_item_ea_qty_min_check"));
var alloc_org=eval(sheetObj.GetCellValue(Row, fix_grid01 + "alloc_org"));
	//alert("onchange:" + Value);
	//alert("stock:" + stock);
	//alert("load_item_ea_qty_min_check:" + load_item_ea_qty_min_check);
	if(colStr == fix_grid01 + "alloc")
	{
		if(Value < 0)
		{
			sheetObj.SetCellValue(Row, Col,Math.abs(Value),0);
			sheetObj.SelectCell(Row, Col);
		}
		else if(Value < load_item_ea_qty_min_check)
		{
			ComShowCodeMessage("COM0329", load_item_ea_qty_min_check);
			sheetObj.SetCellValue(Row, Col,alloc_org,0);
			sheetObj.SelectCell(Row, Col);
			//return;
		}
		else if(Value > stock)
		{
			ComShowCodeMessage("COM0339", stock);
			sheetObj.SetCellValue(Row, Col,alloc_org,0);
			sheetObj.SelectCell(Row, Col);
			//return;
		}
		//--금액 SUM값들 재계산
		reCalcQty(sheetObj);
	}
}
/*
 * 금액 SUM값들 재계산
 */
function reCalcQty(sheetObj)
{
 var alloc_sum=eval(sheetObj.GetSumValue(0,fix_grid01 + "alloc"));
	var item_ea_qty=eval(offComma($("#item_ea_qty").val()));
	var un_alloc_qty=item_ea_qty - alloc_sum;		
	$("#alloc_ea_qty").val(ComAddComma(alloc_sum));
	$("#un_alloc_qty").val(ComAddComma(un_alloc_qty));
}
/*
 * ","콤마값 제거
 */
function offComma(val)
{
	var returnVal=val.split(",");//입력을 필터한다
	returnVal=returnVal.join("");//다시 결합.
	return returnVal;
}
/*
 * 화면open시 정보 조회(기본조회)
 */
function searchBaseInfo()
{
	searchObItemInfo(); //헤더정보조회
	searchList();  //stock list조회
}
/*
 * 팝업 init시 헤더정보를 조회한다.
 */
var InputName="prev_rum|curr_rum|next_rum|sao_sys_no|item_sys_no|item_seq|item_cd|item_nm|inbound_dt|fix_lot_id|lot_no|exp_dt|lot_04|lot_05|item_ea_qty|alloc_ea_qty|walc_no|fix_loc_cd|fix_loc_cd_nm|s_wob_bk_no";
function searchObItemInfo()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	formObj.f_cmd.value = SEARCH01;
    var sXml=sheetObj.GetSearchData("./searchWaveSimpleManualAllcPopupHeaderInfoGS.clt", FormQueryString(formObj, ""));
	var arrXml=sXml.split("|$$|");
	imNew(); //이전조회결과 reset
//	if(ComGetTotalRows(arrXml[0]) == "0"){
//		ComShowCodeMessage("COM0266", "Booking No");
//		ComClosePopup(); 
	if(getTotalRow(sXml) == "0"){
		ComShowCodeMessage("COM0266", "Booking No");
		ComClosePopup();
	}else{
		
			
				//ibSheetView Xml 을 HTML태그(Object) 오브젝트의 value 세팅
				displayData(sXml);
				//ComsetXmlDataToForm2(arrXml[i], InputName, 5);
				//--lot id가 존재한다면
				if($("#fix_lot_id").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.fix_lot_id, false);
					//모든 항목 disabled
					ComEnableObject(formObj.fm_in_date, false);
					ComEnableObject(formObj.to_in_date, false);
					ComBtnDisable("btn_fm_in_date");
					ComBtnDisable("btn_to_in_date");
					ComEnableObject(formObj.lot_no, false);
					ComEnableObject(formObj.exp_dt, false);
					ComBtnDisable("btn_exp_dt");
					ComEnableObject(formObj.lot_04, false);
					ComEnableObject(formObj.lot_05, false);
					$("#just_lot_id").val($("#fix_lot_id").val());
				}
				//--inbound_dt가 존재한다면
				if($("#inbound_dt").val().trim().length == 8)
				{
					$("#fm_in_date").val(ComGetMaskedValue($("#inbound_dt").val(), "mdy"));
					$("#to_in_date").val(ComGetMaskedValue($("#inbound_dt").val(), "mdy"));
					//disabled처리
					ComEnableObject(formObj.fm_in_date, false);
					ComEnableObject(formObj.to_in_date, false);
					ComBtnDisable("btn_fm_in_date");
					ComBtnDisable("btn_to_in_date");
				}
				//--lot no가 존재한다면
				if($("#lot_no").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.lot_no, false);
				}
				//--exp dt가 존재한다면
				if($("#exp_dt").val().trim().length == 8)
				{
					$("#exp_dt").val(ComGetMaskedValue($("#exp_dt").val(), "mdy"));
					//disabled처리
					ComEnableObject(formObj.exp_dt, false);
					ComBtnDisable("btn_exp_dt");
					$("#expiration_dt").val($("#exp_dt").val());
				}
				//--lot 04가 존재한다면
				if($("#lot_04").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.lot_04, false);
				}
				//--lot 05가 존재한다면
				if($("#lot_05").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.lot_05, false);
				}
				//--lot 04가 존재한다면
				if($("#lic_plat_no").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.lic_plat_no, false);
				}
				//--item_ser_no
				if($("#item_ser_no").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.item_ser_no, false);
				}
				//--po_no
				if($("#po_no").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.po_no, false);
				}
				//--fix_loc_cd가 존재한다면
				if($("#fix_loc_cd").val().trim().length > 0)
				{
					//disabled처리
					ComEnableObject(formObj.wh_loc_nm, false);
					ComBtnDisable("btn_wh_loc_cd");
					//data default setting
					$("#wh_loc_nm").val($("#fix_loc_cd_nm").val());
					$("#wh_loc_cd").val($("#fix_loc_cd").val());
					$("#wh_loc_nm_org").val($("#fix_loc_cd_nm").val());
				}
				//--prev_rum이 0이면 이전상품으로 이동못하게끔
				if(eval($("#prev_rum").val().trim()) == 0)
				{
					//disabled처리					
					ComEnableObject(formObj.btn_prev, false); 				
				}
				//--next_rum이 9999999999이면 이후상품으로 이동못하게끔
				if(eval($("#next_rum").val().trim()) == 9999999999)
				{
					//disabled처리
					ComEnableObject(formObj.btn_next, false); 
				}
				//--un_alloc계산
				var item_ea_qty=eval($("#item_ea_qty").val());
				var alloc_ea_qty=eval($("#alloc_ea_qty").val());
				var un_alloc_qty=item_ea_qty - alloc_ea_qty;
				var item_ea_qty_comma=ComAddComma(item_ea_qty);
				var alloc_ea_qty_comma=ComAddComma(alloc_ea_qty);
				var un_alloc_qty_comma=ComAddComma(un_alloc_qty);
				$("#item_ea_qty").val(item_ea_qty_comma);
				$("#alloc_ea_qty").val(alloc_ea_qty_comma);
				$("#un_alloc_qty").val(un_alloc_qty_comma);
			} 
		
	
}
/*
 * 버튼 Search
 */
function btn_Search(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.fm_in_date) && ComIsEmpty(formObj.to_in_date)){
		formObj.to_in_date.value=ComGetNowInfo();
	}
	/* 3개월 duration 주석
	if (!ComIsEmpty(formObj.fm_in_date) && getDaysBetween2(formObj.fm_in_date.value, formObj.to_in_date.value)> 92) {
		ComShowCodeMessage("COM0141","3","(Inbound Date)");
		formObj.fm_in_date.focus();
		return;
	}
	*/
	/*if (!ComIsEmpty(formObj.fm_in_date) && !isDate(formObj.fm_in_date)) {
		ComShowCodeMessage("COM0114","Inbound Date");
		formObj.fm_in_date.focus();
		return;
	}
	if (!ComIsEmpty(formObj.to_in_date) && !isDate(formObj.to_in_date)) {
		ComShowCodeMessage("COM0114","Inbound Date");
		formObj.to_in_date.focus();
		return;
	}*/
	if ((!ComIsEmpty(formObj.fm_in_date)&&ComIsEmpty(formObj.to_in_date))||(ComIsEmpty(formObj.fm_in_date)&&!ComIsEmpty(formObj.to_in_date))) {
		ComShowCodeMessage("COM0122","Inbound Date");
		formObj.fm_in_date.focus();
		return;
	}
	if (getDaysBetween2(formObj.fm_in_date.value, formObj.to_in_date.value)<0) {
		ComShowCodeMessage("COM0122","Inbound Date");
		formObj.fm_in_date.focus();
		return;
	}
	setTimeout(function(){
	searchList();
	},100);
}
/*
 * stock list조회
 * 버튼(조회버튼)클릭시
 * 또는
 * 처음 화면 init시 기본조회시
 */
function searchList()
{
	var formObj=document.form;
	var sheetObj=sheet1;
	formObj.f_cmd.value=SEARCH;
	//sheet1.DoSearch("./searchManualAllcPopupListGS.clt", FormQueryString(formObj, ""));
	var sxml = sheet1.GetSearchData("./searchWaveSimpleManualAllcPopupListGS.clt", FormQueryString(formObj, ""));
	sheet1.LoadSearchData(sxml);
	//alert(sXml);
}
/*
 * 이전 조회결과 reset
 */
function imNew() {	
	var formObj=document.form;
	formObj.reset();
	sheet1.RemoveAll();
	ComEnableObject(formObj.fm_in_date, true);
	ComEnableObject(formObj.to_in_date, true);
	ComBtnEnable("btn_fm_in_date");
	ComBtnEnable("btn_to_in_date");
	ComEnableObject(formObj.fix_lot_id, true);
	ComEnableObject(formObj.lot_no, true);
	ComEnableObject(formObj.exp_dt, true);
	ComBtnEnable("btn_exp_dt");
	ComEnableObject(formObj.lot_04, true);
	ComEnableObject(formObj.lot_05, true);
	ComEnableObject(formObj.wh_loc_nm, true);
	ComBtnEnable("btn_wh_loc_cd");
	ComEnableObject(formObj.btn_prev, true); 
	ComEnableObject(formObj.btn_next, true); 
}
/*
 * Apply Alloc 버튼 클릭
 */
function btn_Apply()
{	var formObj = document.form;
	var sheetObj=sheet1;
	//수정된내역이 없을경우(트랜잭션이 일어나지 않은경우)
	if (sheetObj.IsDataModified()== false)
	{
		 ComShowCodeMessage("COM0409");
		 return;
	}
	 //PICKD_FLG가 'Y'일경우
    if($("#pickd_flg").val() == "Y")
    {
        ComShowCodeMessage("COM0445");
         return;
    }
	//Order Qty < Allocation Qty일경우(un_alloc_qty가 음수일때)
    var un_alloc_qty=eval(offComma($("#un_alloc_qty").val()));
    //#6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록
	if($("#ovr_aloc_yn").val() == "Y"){
		if(un_alloc_qty < 0)
		{
			if(ComShowCodeConfirm("COM0788") == false){
				return;
			}
		}
	}else{
		if(un_alloc_qty < 0)
		{
			ComShowCodeMessage("COM0331");
			return;
		}
	}
		 
	
	
	//ALLOC_QTY가 0일경우
	var alloc_ea_qty=eval(offComma($("#alloc_ea_qty").val()));
	if(alloc_ea_qty <= 0)
	{
		ComShowCodeMessage("COM0332");
		return;
	}
	//Confirm
	if(ComShowCodeConfirm("COM0311") == false){
		return;
	}
	//check status booking : Completed or not.
	ajaxSendPost(resultcountstatus, 'reqVal', '&goWhere=aj&bcKey=checkbookingstatuswave&wave_no='+ formObj.wave_no.value + "&wob_bk_no=" + formObj.s_wob_bk_no.value, './GateServlet.gsl');
	if(checkallocation == false){
		ComShowMessage("There are no unallocated items.");
		return;
	}else{
		var tl_wo_document_info_header="Docin";
		var div=tl_wo_document_info_header+"div="        + $("#div").val();
		var wob_bk_no="&"+ tl_wo_document_info_header+"wob_bk_no="  + $("#s_wob_bk_no").val();
		var wh_cd="&"+ tl_wo_document_info_header+"wh_cd="      + $("#wh_cd").val();
		var walc_no="&"+ tl_wo_document_info_header+"walc_no="    + $("#walc_no").val();
		var sao_sys_no="&"+ tl_wo_document_info_header+"sao_sys_no=" + $("#sao_sys_no").val();
		var item_sys_no="&"+ tl_wo_document_info_header+"item_sys_no="+ $("#item_sys_no").val();
		var item_seq="&"+ tl_wo_document_info_header+"item_seq="   + $("#item_seq").val();
		var item_cd="&"+ tl_wo_document_info_header+"item_cd="    + $("#item_cd").val();
		var wave_no="&"+ tl_wo_document_info_header+"wave_no="    + $("#wave_no").val();
		var docinParamter=div+wob_bk_no+wh_cd+walc_no+sao_sys_no+item_sys_no+item_seq+item_cd+wave_no;
		//Docindiv= &Docinwob_bk_no &Docinwh_cd &Docinwalc_no &Docinsao_sys_no &Docinitem_sys_no &Docinitem_seq &Docinitem_cd &Docinwave_no 
		//formObj.f_cmd.value=MODIFY;
		var sheetDatas=sheetObj.GetSaveString(true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
		var isheetSaveParamters=docinParamter+"&"+sheetDatas+"&f_cmd="+MODIFY;
	 	var saveXml=sheetObj.GetSaveData("./modifyWaveSimpleManualAllcGS.clt", isheetSaveParamters);
	 	if (saveXml.indexOf('<ERROR>') == -1) {			
			//ComShowCodeMessage("COM132601"); // Saved successfully.
	 		showCompleteProcess();
			btn_Search();
			if(!opener)
			{
				opener=window.dialogArguments;
			}
			opener.setManualAllc();
			if(parseInt($("#un_alloc_qty").val()) == 0 && $("#tol_rum").val() != $("#curr_rum").val()){
				setTimeout(function(){ doWork('btn_next'); }, 1500);
			}else{
				btn_Close();
			}
		}
	}
}
/**
 * resultcountstatus
 * @param reqVal
 */
function resultcountstatus(reqVal) {
	
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] == 0){
				checkallocation = true;
			}else{
				checkallocation = false;
			}
		}
	}
}
/*
 * close 버튼 클릭
 */
function btn_Close(){
	ComClosePopup(); 

}
/*
 * Prev.Item 버튼 클릭
 */
function btn_Prev(){
	doShowProcess(true);
	setTimeout(function(){
	$("#rum").val($("#prev_rum").val());
	 searchBaseInfo();
},100);
doShowProcess(false);
}
/*
 * Next.Item 버튼 클릭
 */
function btn_Next(){
	doShowProcess(true);
	setTimeout(function(){
	$("#rum").val($("#next_rum").val());
	 searchBaseInfo();
	},100);
	doShowProcess(false);
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");		
		switch(srcName) {
			case "btn_to_in_date":	
//				if (ComDisableTdButton("btn_to_in_date", 2)) {
//					return;
//				}
				var cal=new ComCalendarFromTo();
				cal.displayType="date";
				cal.select(formObj.fm_in_date,formObj.to_in_date, 'MM-dd-yyyy');
				break;
			case "btn_exp_dt":	
//				if (ComDisableTdButton("btn_exp_dt", 2)) {
//					return;
//				}
				var cal=new ComCalendar();
				cal.displayType="date";
	            cal.select(formObj.exp_dt, 'MM-dd-yyyy');
				break;
			case "btn_wh_loc_cd" :
//				if (ComDisableTdButton("btn_wh_loc_cd", 2)) {
//					return;
//				}
				rtnary=new Array(1);
 				rtnary[0]=formObj.wh_cd.value;
 				rtnary[1]='Y';
 				callBackFunc = "setLocInfo";
 				//modal_center_open('./WarehouseLocPopup.clt', rtnary, 700, 500,"yes");
 				modal_center_open('./WarehouseLocPopup.clt?f_loc_cd=' + formObj.wh_cd.value + "&f_wh_loc_nm="+formObj.wh_loc_nm.value, rtnary, 700, 500,"yes");
 				break;
			case "SEARCHLIST":
 				btn_Search();
 				break;
			case "btn_Apply":
				btn_Apply();
 				break;
			case "CLOSE":
				btn_Close();
 				break;
			case "btnClose":
				btn_Close();
 				break;
			case "btn_prev":
				btn_Prev();
 				break;
			case "btn_next":
				btn_Next();
 				break;
      } // end switch
	} catch(e) {
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
/*
 * key down event
 */
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "fix_lot_id":	
				btn_Search();
			break;
			case "lot_no":	
				btn_Search();
			break;
			case "lot_04":	
				btn_Search();
			break;
			case "lot_05":	
				btn_Search();
			break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}
/*
 * location 조회 팝업 callback
 */
function resultLocInfo(resultXml) {
	if(getXmlDataNullToNullString(resultXml,'wh_loc_cd') != ""){
		$("#wh_loc_nm").val(getXmlDataNullToNullString(resultXml,'wh_loc_nm'));
		$("#wh_loc_nm_org").val(getXmlDataNullToNullString(resultXml,'wh_loc_nm'));
		$("#wh_loc_cd").val(getXmlDataNullToNullString(resultXml,'wh_loc_cd'));
	}else{
		$("#wh_loc_nm").val("");
		$("#wh_loc_nm_org").val("");
		$("#wh_loc_cd").val("");
	}
	$("#wh_loc_nm").focus();
}
/*
 * location 입력 후 조회(ajax) callback
 */
function setLocInfo(aryPopupData){
	if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
		  return;
		 }else{
		var rtVal = aryPopupData.split("|");
	$("#wh_loc_cd").val(rtVal[0]);// wh_loc_cd
	$("#wh_loc_nm").val(rtVal[1]);// wh_loc_nm
	$("#wh_loc_nm_org").val(rtVal[2]);// wh_loc_nm
		 }
}
/*
 * Location search
 * onChange
 */
function getLocationInfo(div){
	if($("#fix_loc_cd").val().trim() != "")//fix_loc_cd가 존재하지않을경우만
	{
		return;
	}
	if($("#wh_loc_nm").val() == "")
	{
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if(div == "e")
		{
			btn_Search();
		}
		return;
	}
	var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#wh_loc_nm").val() + "&f_alloc_flg=Y";
	ajaxSendPost(resultLocationInfo,div, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
}
function resultLocationInfo(reqVal, div) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				$("#wh_loc_cd").val(rtnArr[0]); // wh_loc_cd
				$("#wh_loc_nm").val(rtnArr[1]);
				$("#wh_loc_nm_org").val(rtnArr[1]);
				if(div == "e")
				{
					btn_Search();
				}
			}
			else{
				ComShowCodeMessage("COM0185","");
				$("#wh_loc_cd").val(""); // wh_loc_cd
				$("#wh_loc_nm").val("");
				$("#wh_loc_nm_org").val("");
			}
		}
		else{
			ComShowCodeMessage("COM0185","");
			$("#wh_loc_cd").val(""); // wh_loc_cd
			$("#wh_loc_nm").val("");
			$("#wh_loc_nm_org").val("");
		}
	}
}
/*function getLocationInfo(div){
	if($("#fix_loc_cd").val().trim() != "")//fix_loc_cd가 존재하지않을경우만
	{
		return;
	}
	if($("#wh_loc_nm").val() == "")
	{
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm_org").val("");
		if(div == "e")
		{
			btn_Search();
		}
		return;
	}
	var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + $("#wh_loc_nm").val() + "&f_alloc_flg=Y";
	var sXml=docObjects[0].GetSearchData("searchWarehouseLocInfoForName.clt?"+sParam);
	if(getXmlDataNullToNullString(sXml,'exception_msg')!=""){
		alert(getXmlDataNullToNullString(sXml,'exception_msg'));
	}
	resultLocationInfo(sXml, obj.name);
	
}*/
/*function resultLocationInfo(resultXml, div) {
	if(getXmlDataNullToNullString(resultXml,'wh_loc_cd') != ""){
		$("#wh_loc_nm").val(getXmlDataNullToNullString(resultXml,'wh_loc_nm'));
		$("#wh_loc_nm_org").val(getXmlDataNullToNullString(resultXml,'wh_loc_nm'));
		$("#wh_loc_cd").val(getXmlDataNullToNullString(resultXml,'wh_loc_cd'));
		if(div == "e")
		{
			btn_Search();
		}
	}else{
		$("#wh_loc_nm").val("");
		$("#wh_loc_nm_org").val("");
		$("#wh_loc_cd").val("");
		$("#wh_loc_nm").focus();
	}
}*/
function displayData(xml){
	var formObj  = document.form;
	 var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  $("#prev_rum").val($xml.find( "prev_rum").text());
	  $("#curr_rum").val($xml.find( "curr_rum").text());
	  $("#next_rum").val($xml.find( "next_rum").text());
	  $("#tol_rum").val($xml.find( "tol_rum").text());
	  $("#sao_sys_no").val($xml.find( "sao_sys_no").text());
	  $("#item_sys_no").val(htmlDecode($xml.find( "item_sys_no").text()));
	  $("#item_seq").val(htmlDecode($xml.find( "item_seq").text()));
	  $("#item_cd").val(htmlDecode($xml.find( "item_cd").text()));
	  $("#item_nm").val($xml.find( "item_nm").text());
	  $("#inbound_dt").val(ComTrimAll(convDate($xml.find("inbound_dt").text()), "-", "/", "."));
	  $("#fix_lot_id").val($xml.find( "fix_lot_id").text());
	  $("#lot_no").val($xml.find( "lot_no").text());
	  $("#exp_dt").val($xml.find( "exp_dt").text());
	  $("#lot_04").val($xml.find( "lot_04").text());
	  $("#lot_05").val($xml.find( "lot_05").text());
	  $("#item_ea_qty").val($xml.find( "item_ea_qty").text());
	  $("#alloc_ea_qty").val($xml.find( "alloc_ea_qty").text());
	  $("#walc_no").val($xml.find( "walc_no").text());
	  $("#fix_loc_cd").val($xml.find("fix_loc_cd").text());
	  $("#fix_loc_cd_nm").val($xml.find( "fix_loc_cd_nm").text());
	  $("#s_wob_bk_no").val($xml.find( "s_wob_bk_no").text());
	  $("#lic_plat_no").val($xml.find( "lic_plat_no").text());
	  $("#item_ser_no").val($xml.find( "item_ser_no").text());
	  $("#po_no").val($xml.find("po_no").text());
	  $("#navigation_item").text($xml.find( "curr_rum").text() + "/" + $xml.find( "tol_rum").text()); 
	  
	  //#6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록
	  $("#ovr_aloc_yn").val($xml.find("ovr_aloc_yn").text());
}

function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}
function getTotalRow(xmlStr)
{
	var xmlDoc = $.parseXML(xmlStr); 
	var $xml = $(xmlDoc);
	if( $xml.find("DATA").length == 0  ){
		 return null;
	}
	return $xml.find("DATA")[0].getAttribute("TOTAL")
		
}
