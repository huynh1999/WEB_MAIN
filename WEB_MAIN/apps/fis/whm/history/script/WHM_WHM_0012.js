/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0009.jsp
*@FileTitle  : Item Entry
*@author     : Thoa.Dien
*@version    : 1.0
*@since      : 2014/12/22
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var today = new Date();
var cust_present = 0; //position of selected cust
var page_flg = false;
/**
 * 화면로드 후 초기값 세팅
 */
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj  = docObjects[0];
    var sheetObj1 = docObjects[1];
	try {
		switch(srcName) {
			case "CHANGE":
		   		sheetObj.RemoveAll();
		   		sheetObj1.RemoveAll();
		   		formObj.rate.value = "0.00000000";
		   		formObj.date.value= getTodayStr("MM-dd-yyyy");
		   	break;
    	   	case "SEARCHLIST":
    	   		sheetObj.RemoveAll();
    	   		formObj.rate.value = "0.00000000";
    	   			if(formObj.warehouse.value==""){
    	   				ComShowCodeMessage("COM12113","Warehouse");
    	   				formObj.warehouse.focus();
        	   			return;
    	   			}
    	   			formObj.f_cmd.value=SEARCH;
    	   			sheetObj.DoSearch("./WHM_WHM_0012GS.clt", FormQueryString(formObj));
    	   			formObj.rate.value = "0.00000000";
    	   			formObj.date.value= getTodayStr("MM-dd-yyyy");
    	   	break;
    	   	case "CLOSING":
    	   		var chk = false; // have choose?
    	   		if(sheetObj.RowCount()> 0){
    	   			var confirm_flg = false;
    	   			for (var i=sheetObj.HeaderRows(); i<= sheetObj.LastRow(); i++){
    	   				if(sheetObj.GetCellValue(i,"sel_chk") == "1"){
    	   					chk = true;
    	   					if(formObj.date.value == ""){
    	   						ComShowCodeMessage('COM130403', "[Date Closing]");
    	   						formObj.date.focus();
    	   						break;
    	   					}
    	   					if(formObj.rate.value == ""){
    	   						ComShowCodeMessage('COM130403', "[Rate]");
    	   						formObj.rate.focus();
    	   						break;
    	   					}
    	   					if (parseInt(convDate(formObj.date.value)) < parseInt(sheetObj.GetCellValue(i,"st_dt"))) {
    	   						ComShowCodeMessage('COM1510083');
    	   						formObj.date.value= getTodayStr("MM-dd-yyyy");
    	   						formObj.date.focus();
    	   						break;
    	   					} else if (sheetObj.GetCellValue(i,"cl_dt") !="" && (parseInt(convDate(formObj.date.value)) < parseInt(sheetObj.GetCellValue(i,"cl_dt")))){
    	   						ComShowCodeMessage('COM1510081');
    	   						formObj.date.value= getTodayStr("MM-dd-yyyy");
    	   						formObj.date.focus();
    	   						break;
    	   					} else if (sheetObj.GetCellValue(i,"cl_dt") !="" && (parseInt(convDate(formObj.date.value)) == parseInt(sheetObj.GetCellValue(i,"cl_dt")))) {
    	   						ComShowCodeMessage('COM1510082');
    	   						formObj.date.value= getTodayStr("MM-dd-yyyy");
    	   						formObj.date.focus();
    	   						break;
    	   					} else {
    	   						cust_present = sheet1.GetSelectRow();
    	   						var param = "";
    	   						param += "date=" + formObj.date.value;
    	   						param += "&rate=" + formObj.rate.value;
    	   						param += "&wh_cd=" + formObj.warehouse.value;
    	   						param += "&cust_id=" + sheetObj.GetCellValue(i,"cust_id");
    	   						if (sheetObj.GetCellValue(i,"cl_dt") ==""){
    	   							param += "&st_dt=" + sheetObj.GetCellValue(i,"st_dt");
    	   						}else {
    	   							param += "&cl_dt=" + sheetObj.GetCellValue(i,"cl_dt");
								}
    	   						if(ComShowCodeConfirm('COM151008')){
    	   							var saveXml = sheetObj.GetSearchData("./WHM_WHM_0012_2GS.clt", param + "&f_cmd=" + MODIFY);
    	   							if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
    	   								var xmlDoc = $.parseXML(saveXml);
    	   								var $xml = $(xmlDoc);
    	   								var message = $xml.find("result").text();
    	   								showCompleteProcess();
    	   								doWork("SEARCHLIST");
    	   							}
    	   						}
    	   					}
    	   				}	
    	   			}
    				if(chk == false){
    					ComShowCodeMessage("COM12189"); //'Nothing selected'
    					break;
    				}
    			}else{
    				ComShowCodeMessage("COM151007");// no data to closing
    			}
    	   		break;
           	case "EXCEL":
           			if(docObjects[1].RowCount() < 1){//no data	
    	    			ComShowCodeMessage("COM132501");
    	    		}else{
    	    			sheet2.Down2Excel({FileName: "Closing History",DownCols: '1|2|3|4', SheetDesign:1,Merge:1});
    	    		}
    	   		break;
           	case "DEL":
           		if(sheetObj1.RowCount()> 0){
           			var lastChkRow = sheetObj1.FindCheckedRow("del_chk",1).split("|").length;
           			if(ComShowCodeConfirm('COM130301', 'this closing date')){
           				var param = "";
               			param += "wh_cd=" + formObj.warehouse.value;
    	    	   		param += "&cust_id=" + sheetObj.GetCellValue(sheet1.GetSelectRow(),"cust_id");
       					param += "&date=" + sheetObj1.GetCellValue(lastChkRow,"datesheet");
       					param += "&del_flg=Y"
       					param += "&f_cmd="+ MODIFY02;
       					sheetObj1.DoAllSave("./WHM_WHM_0012_4GS.clt?" + param, "","",false);
					}
           		}
           		
           		break;
           	case "PRINT":
           		if(sheet2.RowCount() == 0){
           			ComShowCodeMessage('COM131002'); // No data print
           			return;
           		}else {
           			callBackFunc = "";
           			modal_center_open('./HSTPrint.clt?wh_nm=' + formObj.warehouse.options[formObj.warehouse.selectedIndex].text +"&cust_nm=" + sheet1.GetCellValue(sheet1.GetSelectRow(),"cust_nm")
           					+ "&wh_cd=" + formObj.warehouse.value + "&cust_cd=" + sheet1.GetCellValue(sheet1.GetSelectRow(),"cust_id") , rtnary, 700,400,"yes");
				}
           		break;	
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	ComShowMessage(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	ComShowMessage(getLabel('FMS_COM_ERR001') + " - " + e);
        }
	}
}

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            var cal=new ComCalendar();
            cal.select(formObj.date,  'MM-dd-yyyy');
        break;
    }
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	 document.frm1.f_CurPage.value=1;
	 page_flg = true;
	 sheet1_OnClick(sheet1,cust_present,1);
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		sheet1_OnClick(sheet1,cust_present,1);
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
	var formObj  = document.frm1;
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    formObj.date.value= getTodayStr("MM-dd-yyyy");
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
		case 1:      //IBSheet1 init
		    with (sheetObj) {
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	           var HeadTitle1 = "SEL|ID|Name|Starting Date|Closing Date";
	           var headers = [ { Text:HeadTitle1, Align:"Center"}];
	           InitHeaders(headers, info);
	
	           var cols = [   
	                          {Type:"Radio",        Hidden:0,  Width:40,     Align:"Center",  ColMerge:1,   SaveName:"sel_chk",    UpdateEdit:1,   InsertEdit:1},
	                          {Type:"Text",        Hidden:0,  Width:85,     Align:"Center",  ColMerge:1,   SaveName:"cust_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
			                  {Type:"Text",        Hidden:0,  Width:400,     Align:"left",  ColMerge:0,   SaveName:"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
			                  {Type:"Date",        Hidden:0,  Width:85,     Align:"Center",    ColMerge:0,   SaveName:"st_dt",         KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Date",        Hidden:0,  Width:85,     Align:"Center",  ColMerge:0,   SaveName:"cl_dt",         KeyField:0,   CalcLogic:"",   Format:"Ymd",       	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
	                   ];
	            
	           InitColumns(cols);
	           SetEditable(1);
	           SetHeaderRowHeight(20);
	           SetSheetHeight(500);
	           resizeSheet();
		   }                                                      
		break;
		case 2:      //IBSheet2 init
             with (sheetObj) {
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:8} );
	
		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		           var HeadTitle1 = "DEL|Date|Quantity(CFT)|Rate|Amount|";
		           var headers = [ { Text:HeadTitle1, Align:"Center"}];
		           InitHeaders(headers, info);
		
		           var cols = [   
				                  {Type:"CheckBox",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Date",      Hidden:0,  Width:150,   Align:"Center",    ColMerge:1,   SaveName:"datesheet",       KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",      Hidden:0,  Width:150,    Align:"Right",  ColMerge:1,   SaveName:"qty",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:3,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",      Hidden:0,  Width:150,   Align:"Right",    ColMerge:1,   SaveName:"ratesheet",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:8,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Float",      Hidden:0,  Width:150,    Align:"Right",  ColMerge:0,   SaveName:"amount",    KeyField:0,   CalcLogic:"",   Format:"Float",         PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 }
				                  ];
		            
		           InitColumns(cols);
		           SetEditable(1);
		           SetHeaderRowHeight(20);
		           SetHeaderRowHeight(21);
		           SetSheetHeight(500);
		           resizeSheet();
            }                                                      
            break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
	ComResizeSheet(docObjects[1]);
}

function sheet1_OnClick(sheetObj, Row, Col) {
	if(page_flg = true || sheetObj.CellSaveName(Row,Col) == "cust_id" || sheetObj.CellSaveName(Row,Col) == "cust_nm" || sheetObj.CellSaveName(Row,Col) == "st_dt" || sheetObj.CellSaveName(Row,Col) == "cl_dt")
	{
		sheet2.RemoveAll();
		formObj = document.frm1;
		sheet1.SetCellValue(Row, "sel_chk", 1);
		var sParam = "";
		sParam += "cust_id=" + sheet1.GetCellValue(Row, "cust_id");
		sheet2.DoSearch("./WHM_WHM_0012_1GS.clt", sParam + '&f_cmd='+SEARCH01 + '&' + FormQueryString(formObj));
	}
	
}
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
 		sheetObj.SetCellFontColor(i,"cust_id","#0100FF");
 		sheetObj.SetCellFontUnderline(i, "cust_id", 1);
	}
	if(cust_present != ""){
		sheet1.SetSelectRow(cust_present);
		sheet1.SetCellValue(cust_present, "sel_chk", 1);
		sheet1_OnClick(sheetObj,cust_present,1);
		cust_present = 0;
	}else {
		sheet1_OnClick(sheetObj,1,1);
	}
}
function sheet2_OnSearchEnd(sheetObj, errMsg) {
	cust_present = sheet1.GetSelectRow();
	doDispPaging(docObjects[1].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function sheet2_OnSaveEnd() {
	doWork("SEARCHLIST");
}

function sheet2_OnChange(sheetObj, row, col) {
	//auto check del
}
var beforeCheck = 0;
function sheet2_OnClick(sheetObj, Row, Col){
	if(sheetObj.CellSaveName(Row,Col) == "del_chk"){
		var curRow = sheet2.GetSelectRow();
		var remainRow = sheet2.RowCount() - curRow;
		var findcheck = sheetObj.FindCheckedRow("del_chk",1);
		var checkedRow = findcheck.split("|");
		var finalChecked = checkedRow[checkedRow.length - 1];
		for (var i=sheetObj.HeaderRows(); i<= sheetObj.LastRow(); i++){
			if(finalChecked != curRow){
				if (i <= curRow){
					//sheetObj.SetCellValue(i,"del_chk",1,0);
					if(sheetObj.GetCellValue(i,"del_chk") == 1){
						//if(i > curRow || sheetObj.GetCellValue(curRow,"del_chk") == 1)
						if(i > curRow)
						sheetObj.SetCellValue(i,"del_chk",0,0);
					}else{
						sheetObj.SetCellValue(i,"del_chk",1,0);
					}
				}else{
					sheetObj.SetCellValue(i,"del_chk",0,0);
				}
			}else{
				sheetObj.SetCellValue(i,"del_chk",0,0);
			}
		}
		if(sheetObj.GetCellValue(curRow,"del_chk") == 1){
			sheetObj.SetCellValue(curRow,"del_chk",0,0);
		}else{
			sheetObj.SetCellValue(curRow,"del_chk",1,0);
		}
	}
}

function convDate(date) {
	if (date != 0){
		var rtn = date.substr(6,4) + date.substr(0,2) + date.substr(3,2);
		return rtn;
	}else {
		return date;
	}
}

function checkNumFormat(obj, format) {

    var srcNumber = obj.value.replace(/\-/g,"");
    var srcNumber = obj.value.replace(/\,/g,"");

    if(srcNumber == '') return;

    if(isNaN(srcNumber)) {
        alert("Check invalid data! ");
        obj.value = "0";
        obj.focus();
        return;
    }
    dotInx     = format.indexOf('.');
    len        = format.length;

    if (dotInx > 0) decimalLen = len - (dotInx + 1);
    else decimalLen = -1;
    numLen     = len - (decimalLen + 1);
    temp        = srcNumber
    len1        = temp.length;
    dotInx1     = temp.indexOf('.');
    
    //소수점이 유무에 의한 길이 설정
    if(dotInx1 == -1) {
        decimalLen1 = -1;
        numLen1     = len1;
    } else {
        decimalLen1 = len1 - (dotInx1 + 1);
        numLen1     = len1 - (decimalLen1 + 1);
    }
    
    var floatMax = len - (dotInx + 1);
    var decimalMax = len - (floatMax + 1);
     
    if(numLen1 > numLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    } else if (decimalLen1 > decimalLen){
        alert("Check Length!!\n(Integer: " + decimalMax +", Decimal point: " + floatMax +")");
        obj.value = "0";
        obj.focus();
        return false;
    }
    return true;
}

function checkdate() {
	var formObj  = document.frm1;
	if (compareTwoDate(formObj.date.value, getTodayStr("MM-dd-yyyy")) ){
		ComShowCodeMessage('COM1510084');
		formObj.date.value = getTodayStr("MM-dd-yyyy");
		return;
	}
}

function goToPage(callPage){
	docObjects[1].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	page_flg = true;
	sheet1_OnClick(sheet1,cust_present,1);
}
