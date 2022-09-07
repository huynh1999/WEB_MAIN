/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WHM_WHM_003.js
*@FileTitle  : WareHouse Entry
*@author     : Tin Luong
*@version    : 1.0
*@since      : 2014/12/15
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var isDuplicateInternalCode = false;
var checkInternalCode = false;
var isDuplicateCustAndCdUsedByCust = false;


/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var formObj  = document.frm1;
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(formObj.etd_strdt, 180, formObj.etd_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj  = docObjects[0];
    var sheetObj1 = docObjects[1];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		
    	   		if(formObj.cust_itm_id.value == ""){
    	   		//Please enter more than one Search Condition!
    	   			ComShowCodeMessage('COM12221');
//         		   alert(getLabel('FMS_COM_ALT014'));
         		   formObj.cust_itm_id.focus();
         		   return;
    	   		}else{
	    	   	doHideProcess();
    	   		setTimeout(function(){
		   		//formObj.f_cmd.value=SEARCH;
    	   		if(formObj.cust_itm_id.value != ""){
    	   			checkInternalCd();
    	   			if(!checkInternalCode){
    	   				ComShowCodeMessage('COM12222');
//    	   				alert("Item does not exits !")
    	   				clearAll();
    	   				sheetObj.RemoveAll();
    	   				formObj.cust_itm_id.focus();
    	   				return;
    	   			}
    	   		}
   				sheetObj.RemoveAll();
		   		var params = "?f_cmd="+ SEARCH + "&cust_itm_id=" + formObj.cust_itm_id.value;
		   		var sXml = sheet1.GetSearchData("./WHM_WHM_0003GS.clt" + params);
		   		displayData(sXml);
		   		
		   		var params1 = "f_cmd="+ SEARCH01 + "&cust_itm_id=" + formObj.cust_itm_id.value;
//		   		var sXml1 = 
		   			sheet1.DoSearch("./WHM_WHM_0003_01GS.clt" , params1);
//		   		sheet1.LoadSearchData(sXml1);
    	   			},1000);
    	   		}
    	   	break;
           	case "Add":
           		sheet1.DataInsert(-1);
           		break;   	   	
           	case "WH_POPLIST":
           	   rtnary=new Array(1);
	  		   var formObj=document.frm1;
	  		   
	  		   rtnary[0]="1";
	  		   rtnary[1]=formObj.cust_nm.value;
	  		   rtnary[2]=window;
	  		   
	  		   callBackFunc = "WH_POPLIST";
	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
           		break;
           	case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
           		rtnary=new Array(1);	   		
    	   		rtnary[0]="1";
    	   		
    	   		callBackFunc = "COMMODITY_POPLIST";
    	   		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
    	   		break;
           	case "CLEAR":
           		formObj.f_save_sts_flg.value = "I";
           		formObj.cust_itm_id_1.disabled = false;
           		formObj.cust_itm_id.value="";
           		clearAll();
           		break;
            case "MODIFY":	//등록
               formObj.f_cmd.value = MULTI;
     		   checkDuplicateInternalCd();
     		   checkDuplicateCustAndCdUsedByCust();     		  
     	       if(checkVal()){
     	    	  if(inpuValCheck(sheetObj, MODIFY)){
     	    		  if(confirm("Do you want to save? ")){
     	    		  doProcess=true;
     	    		  formObj.cust_itm_id.value = formObj.cust_itm_id_1.value;
     	    		  
//     	           	   var sheetCntcPsonData = sheet1.GetSaveString();
//     	           	   var params = "?f_cmd=" + formObj.f_cmd.value +
//     	           	   				"&cust_itm_id_1=" + formObj.cust_itm_id_1.value +
//     	           	   				"&cust_cd=" + formObj.cust_cd.value +
//     	           	   				"&cust_nm=" + formObj.cust_nm.value +
//     	           	   				"&rgst_ofc_cd_1=" + formObj.rgst_ofc_cd_1.value +
//     	           	   				"&itm_cd=" + formObj.itm_cd.value +
//     	           	   				"&itm_nm=" + formObj.itm_nm.value +
//     	           	   				"&itm_hts_cd=" + formObj.itm_hts_cd.value +
//     	           	   				"&itm_ut_cd=" + formObj.itm_ut_cd.value +
//     	           	   				"&itm_inr_qty=" + formObj.itm_inr_qty.value.split(",").join("") +
//     	           	   				"&itm_wgt=" + formObj.itm_wgt.value.split(",").join("") +
//     	           	   				"&itm_vol=" + formObj.itm_vol.value.split(",").join("") +
//     	           	   				"&itm_wdt=" + formObj.itm_wdt.value.split(",").join("") +
//     	           	   				"&itm_hgt=" + formObj.itm_hgt.value.split(",").join("") +
//     	           	   				"&itm_len=" + formObj.itm_len.value.split(",").join("") +
//     	           	   				"&itm_prc_amt=" + formObj.itm_prc_amt.value.split(",").join("") +
//     	           	   				"&itm_curr_cd=" + formObj.itm_curr_cd.value +
//     	           	   				"&use_flg=" + formObj.use_flg.value +
//     	           	   				"&itm_wgt_lbs=" + formObj.itm_wgt_lbs.value.split(",").join("") +
//     	           	   				"&itm_vol_cft=" + formObj.itm_vol_cft.value.split(",").join("") +
//     	           	   				"&itm_wdt_inch=" + formObj.itm_wdt_inch.value.split(",").join("") +
//     	           	   				"&itm_hgt_inch=" + formObj.itm_hgt_inch.value.split(",").join("") +
//     	           	   				"&itm_len_inch=" + formObj.itm_len_inch.value.split(",").join("") +
//     	           	   				"&f_save_sts_flg=" + formObj.f_save_sts_flg.value + '&' + sheetCntcPsonData;
     		           
     	           	    var sXml = sheetObj1.GetSaveData("./WHM_WHM_0013GS.clt",FormQueryString(formObj)+"&"+sheet1.GetSaveString());
	     	            if(sXml.replace(/^\s+|\s+$/gm,'') != ""){
		   				    var xmlDoc = $.parseXML(sXml);
	   					    var $xml1 = $(xmlDoc);
		   					var res = $xml1.find("result").text();
		   					if(res == "OK"){
		   						formObj.f_save_sts_flg.value = "U";
		   						showCompleteProcess();
		   						searchList();
		   					}
	   					}else{
	   						ComShowCodeMessage("COM12151");
	   					}
     	    	   	}
     	    	 }
     	     
            break;
     	     }
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	ComShowCodeMessage('COM12223');
//        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
//        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
        	ComShowCodeMessage('COM12224'," - " + e);
        }
	}
}

function displayData(xml){
	var formObj  = document.frm1;
	
	 var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  
	  var cust_itm_id = $xml.find( "cust_itm_id").text();
	  if(cust_itm_id != ""){
		  formObj.f_save_sts_flg.value = "U";
		  formObj.cust_itm_id_1.disabled = true;
	  }
	  $("#cust_itm_id").val($xml.find( "cust_itm_id").text());
	  $("#cust_cd").val($xml.find( "cust_cd").text());
	  $("#cust_nm").val($xml.find( "cust_nm").text());
	  $("#rgst_ofc_cd").val($xml.find( "rgst_ofc_cd").text());
	  $("#itm_cd").val(htmlDecode($xml.find( "itm_cd").text()));
	  $("#itm_nm").val(htmlDecode($xml.find( "itm_nm").text()));
	  $("#itm_hts_cd").val(htmlDecode($xml.find( "itm_hts_cd").text()));
	  $("#itm_ut_cd").val($xml.find( "itm_ut_cd").text());
	  $("#itm_inr_qty").val($xml.find( "itm_inr_qty").text());
	  $("#itm_wgt").val($xml.find( "itm_wgt").text());
	  $("#itm_vol").val($xml.find( "itm_vol").text());
	  $("#itm_wdt").val($xml.find( "itm_wdt").text());
	  $("#itm_hgt").val($xml.find( "itm_hgt").text());
	  $("#itm_len").val($xml.find( "itm_len").text());
	  $("#itm_prc_amt").val($xml.find( "itm_prc_amt").text());
	  $("#itm_curr_cd").val($xml.find( "itm_curr_cd").text());
	  $("#use_flg").val($xml.find( "use_flg").text());
	  $("#itm_prc_amt").val(Number($xml.find("itm_prc_amt").text()));
	  $("#itm_wgt_lbs").val($xml.find( "itm_wgt_lbs").text());
	  $("#itm_vol_cft").val($xml.find( "itm_vol_cft").text());
	  $("#itm_wdt_inch").val($xml.find( "itm_wdt_inch").text());
	  $("#itm_hgt_inch").val($xml.find( "itm_hgt_inch").text());
	  $("#itm_len_inch").val($xml.find( "itm_len_inch").text());
	 // $("#itm_ut_cd").val($xml.find( "itm_ut_cd").text());
	  var use_unit = document.getElementById('itm_ut_cd');
	  for (var i = 0; i < use_unit.options.length; i++) {
	      if (use_unit.options[i].value == $xml.find( "itm_ut_cd").text()) {
	    	  use_unit.selectedIndex = i;
	          break;
	      }
	  }
	  var use_curr = document.getElementById('itm_curr_cd');
	  for (var i = 0; i < use_curr.options.length; i++) {
		  if (use_curr.options[i].value == $xml.find( "itm_ut_cd").text()) {
			  use_curr.selectedIndex = i;
			  break;
		  }
	  }
}
function checkVal(){
	var formObj = document.frm1;
	if( isDuplicateCustAndCdUsedByCust){
		ComShowCodeMessage('COM12209');
//	   alert("Code used by Customer and Customer must be unique.");
	   formObj.cust_cd.focus();
	   return false;
	}else if( isDuplicateInternalCode){
		ComShowCodeMessage('COM12210');
//	   alert("Duplicate internal code.");
	   formObj.cust_itm_id_1.focus();
	   return false;
	}else if(formObj.cust_cd.value == ""){
		ComShowCodeMessage("COM12208");
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
		formObj.cust_cd.focus();
		return false;
	}else if(formObj.cust_itm_id_1.value == ""){
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
		ComShowCodeMessage("COM12208");
		formObj.cust_itm_id_1.focus();
		return false;
	}else if(formObj.itm_cd.value == ""){
		ComShowCodeMessage("COM12208");
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
		formObj.itm_cd.focus();
		return false;
	}else if(formObj.itm_ut_cd.value == ""){
		ComShowCodeMessage("COM12208");
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
		formObj.itm_ut_cd.focus();
		return false;
	}else if(formObj.itm_nm.value == ""){
		ComShowCodeMessage("COM12208");
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
		formObj.itm_nm.focus();
		return false;
//	}else if(formObj.itm_hts_cd.value == ""){
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
//		formObj.itm_hts_cd.focus();
//		return false;
	}else if(formObj.itm_inr_qty.value == ""){
		ComShowCodeMessage("COM12208");
//		alert(getLabel('FMS_COM_ALT007') + " \n" );
		formObj.itm_inr_qty.focus();
		return false;
	}
	return true;
}
function inpuValCheck(sheetObj, f_cmd){
	var formObj  = document.frm1;
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var checkVal=false;
	var loopNum=0;
	for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(stat=='I'){
			   if(!chkReqField(sheetObj, i)){
				   isOk=false;
				   break;
			   }
			   checkVal=true;
			   for(var ck=1; ck< rowCnt;ck++){
				   if(ck!=i){
					   if(sheetObj.GetCellValue(ck, 'splr_cd')==sheetObj.GetCellValue(i, 'splr_cd')){
						   //The code is already used!\nPlease check the code!
						   ComShowCodeMessage('COM12211');
//						   alert(getLabel('FMS_COM_ALT008'));
						   isOk=false;
						   break;
					   }
				   }
			   }
			   loopNum++;
		   }else if(stat=='U'){
			   if(!chkReqField(sheetObj, i)){
				   isOk=false;
				   break;
			   }
			   checkVal=true;
			   loopNum++;
		   }		   
	   }
	   if(!isOk){
		   break;
	   }
	}
	return isOk;
}

function chkReqField(sheetObj, i){
	var formObj  = document.frm1;
	 var isOk=true;
	 if(checkInputVal(sheetObj.GetCellValue(i, 'splr_cd'), 1, 10, "T", getLabel('SPLR_CD'))!='O'){
	 	isOk=false;
	 	sheetObj.SelectCell(i,'splr_cd',1);
	 	
	 }else if(checkInputVal(sheetObj.GetCellValue(i, 'splr_itm_cd'), 1, 100, "T", getLabel('SPLR_ITEM'))!='O'){
	 	isOk=false;
	 	sheetObj.SelectCell(i,'splr_itm_cd',1);
	 }
    return isOk;
}

function WH_POPLIST(rtnVal){
	var formObj = document.frm1;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.cust_cd.value=rtnValAry[0];//full_nm
		   formObj.cust_nm.value=rtnValAry[2];//full_nm
	   }    
	}
function COMMODITY_POPLIST(rtnVal){
	var formObj  = document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.itm_hts_cd.value=rtnValAry[0];
		formObj.itm_hts_nm.value=rtnValAry[2];
	}
}
function POD_LOCATION_POPLIST(rtnVal){
	var formObj  = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cust_cd.value=rtnValAry[0];//loc_cd 
		formObj.cust_nm.value=rtnValAry[2];//loc_nm
	} 
}
function obj_change(name){
	var formObj = document.frm1;
    switch(name) {
    //cm => inch
    case "itm_wgt":
    	var wgt = parseFloat(formObj.itm_wgt.value.split(",").join(""));
    	formObj.itm_wgt_lbs.value = wgt ==0 ?"0.00": roundXL((wgt * 2.2046),2);
    	break;
    case "itm_vol":
    	var vol = parseFloat(formObj.itm_vol.value.split(",").join(""));
    	formObj.itm_vol_cft.value = vol ==0 ?"0.000": roundXL((vol *  35.315),3);
    	break;
    case "itm_wdt":
    	var wdt = parseFloat(formObj.itm_wdt.value.split(",").join(""));
    	formObj.itm_wdt_inch.value = wdt ==0 ?"0.00": roundXL((wdt *  0.39370),2);
    	break;
    case "itm_hgt":
    	var hgt = parseFloat(formObj.itm_hgt.value.split(",").join(""));
    	formObj.itm_hgt_inch.value = hgt ==0 ?"0.00": roundXL((hgt *  0.39370),2);
    	break;
    case "itm_len":
    	var len = parseFloat(formObj.itm_len.value.split(",").join(""));
    	formObj.itm_len_inch.value = len ==0 ?"0.00": roundXL((len *  0.39370),2);
    	break;
    //inch => cm
    case "itm_len_inch":
    	var lenc = parseFloat(formObj.itm_len_inch.value.split(",").join(""));
    	formObj.itm_len.value = lenc ==0 ?"0.00": roundXL((lenc /  0.39370),2);
    	break;
    case "itm_wgt_lbs":
    	var wgtc = parseFloat(formObj.itm_wgt_lbs.value.split(",").join(""));
    	formObj.itm_wgt.value = wgtc ==0 ?"0.00": roundXL((wgtc / 2.2046),2);
    	break;
    case "itm_vol_cft":
    	var volc = parseFloat(formObj.itm_vol_cft.value.split(",").join(""));
    	formObj.itm_vol.value = volc ==0 ?"0.000": roundXL((volc /  35.315),3);
    	break;
    case "itm_wdt_inch":
    	var wdtc = parseFloat(formObj.itm_wdt_inch.value.split(",").join(""));
    	formObj.itm_wdt.value = wdtc ==0 ?"0.00": roundXL((wdtc /  0.39370),2);
    	break;
    case "itm_hgt_inch":
    	var hgtc = parseFloat(formObj.itm_hgt_inch.value.split(",").join(""));
    	formObj.itm_hgt.value = hgtc ==0 ?"0.00": roundXL((hgtc /  0.39370),2);
    	break;
    }
    chkCommaObj();
}

/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	var formObj  = document.frm1;
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	//doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
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
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    formObj.itm_curr_cd.value = "USD";
    initControl();
}
function initControl() {
	var formObj  = document.frm1;
	axon_event.addListenerForm  ('change', 				'obj_change', 		formObj);// event change value on control
//	axon_event.addListenerForm	('keypress',         'numberCommaLen(this,7,3)', 	frm1);            //- form 전체 컨트롤 중 dataformat 속성이 있는 모든 컨트롤의 onkeypress이벤트에 코드 처리
//    axon_event.addListenerForm	('keyup',         'numberCommaLen(this,7,3)', 	frm1);
//    axon_event.addListenerForm	('blur',         'numberCommaLen(this,7,3)', 	frm1);
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
	var formObj  = document.frm1;
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
		      var cnt=0;
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:'|Del|Supplier|Supplier||rgst_ofc_cd|Supplier Item Code', Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ 
		             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,    SaveName:"ibflag" },
		             {Type:"DelCheck",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,    SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, HeaderCheck: 0},
		             {Type:"PopupEdit", Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"splr_cd",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:640,   Align:"Left",  ColMerge:1,  SaveName:"splr_nm",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:150,   Align:"Left",  ColMerge:1,  SaveName:"cust_itm_id",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:150,   Align:"Left",  ColMerge:1,  SaveName:"rgst_ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",  ColMerge:0,   SaveName:"splr_itm_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,EditLen:20 }
		              ];
		       
		      InitColumns(cols);
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		      SetEditable(1);
		      //SetColProperty(0 ,"splr_itm_cd", {AcceptKeys:"E|N|[.-]", InputCaseSensitive:1});
		      SetSheetHeight(350);
		   }                                                      
		break;
		case 2:      //IBSheet2 init
             with (sheetObj) {
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:'|Supplier', Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cust_itm_id",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);
             SetEditable(1);
             SetVisible(false);
            }                                                      
            break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
	else{
		if(str == "CUSTUMER"){
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
		}
		if (CODETYPE == "commodity") {
			formObj.itm_hts_cd.value="";// itm_hts_cd AS param1
			formObj.itm_hts_nm.value="";// itm_hts_nm AS param2
		}
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.itm_hts_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.itm_hts_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.itm_hts_cd.value="";				//itm_hts_cd  AS param1
				formObj.itm_hts_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	 if(colStr == "splr_cd"){
		//GLCODE POPUP을 호출한다.
		rtnary = new Array();
   		rtnary[0] = "1";
   		rtnary[1] = sheet1.GetCellValue(row,"splr_nm");
   		rtnary[2] = window;
   		callBackFunc = "sheet1_OnPopupClick_cust_itm_id";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
   		
	}
}
var puprow;
function sheet1_OnChange(sheetObj, row, col){
	var formObj  = document.frm1;
	 puprow = row;
	var colName=sheetObj.ColSaveName(col);
	if(colName=="splr_cd"){
		var s_type = "trdpCode";
		var s_code = sheet1.GetCellValue(row, "splr_cd");
		ajaxSendPost(trdpCdReq1, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
	//var splr = sheet1.GetCellValue(row, "splr_itm_cd");
	var splrcd = sheet1.GetCellValue(row, "splr_cd");
	if(colName == "splr_cd"){
		for(var i =1; i < sheet1.RowCount(); i ++){
			if(splrcd == sheet1.GetCellValue(i, "splr_cd")){
				ComShowMessage("Duplicate Supplier !!!");
				sheet1.SetCellValue(row,"splr_cd","",0);
				sheet1.SetCellValue(row,"splr_nm","",0);
			}
		}
	}
}
function trdpCdReq1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
				sheet1.SetCellValue(puprow,"splr_cd",masterVals[0],0);	//cust_cd  AS param1
				sheet1.SetCellValue(puprow,"splr_nm",masterVals[3],0);	//cust_nm   AS param2
				//sheet1.SetCellValue(puprow,"splr_itm_cd",masterVals[3],0);	//cust_nm   AS param2
		}
		else{
			sheet1.SetCellValue(puprow,"splr_cd","");	//cust_cd  AS param1
			sheet1.SetCellValue(puprow,"splr_nm","");
	}
		GetRegisterOfficeCd_Supplier1();
		sheet1.SetCellValue(puprow, "rgst_ofc_cd",regis_dc, 0);
}}
function sheet1_OnPopupClick_cust_itm_id(rtnVal){
	var formObj  = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "splr_cd",rtnValAry[0], 0);
		docObjects[0].SetCellValue(cur_row, "splr_nm",rtnValAry[2], 0);
	}
	GetRegisterOfficeCd_Supplier();
	docObjects[0].SetCellValue(cur_row, "rgst_ofc_cd",regis_dc, 0);
}

function checkDuplicateInternalCd(){
	var formObj=document.frm1;
	ajaxSendPost(checkDuplicateInternalCdEnd, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateInternalCd&cust_itm_id='+formObj.cust_itm_id_1.value, './GateServlet.gsl');
}

function checkInternalCd(){
	var formObj=document.frm1;
	ajaxSendPost(checkInternalCdEnd, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateInternalCd&cust_itm_id='+formObj.cust_itm_id.value, './GateServlet.gsl');
}

function checkDuplicateCustAndCdUsedByCust(){
	var formObj=document.frm1;
	var params = "&cust_cd=" + formObj.cust_cd.value
				+"&itm_cd=" + formObj.itm_cd.value;
		
	if(formObj.f_save_sts_flg.value == "U"){
		params += "&cust_itm_id="+formObj.cust_itm_id_1.value.trim();
	}else{
		params += "&cust_itm_id=";
	}
	ajaxSendPost(checkDuplicateCustAndCdUsedByCustEnd, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateCustAndCdUsedByCust'+params, './GateServlet.gsl');
}

function checkDuplicateCustAndCdUsedByCustEnd(rtnVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(rtnVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] == "1"){
				isDuplicateCustAndCdUsedByCust = true;
				return;
			}
		}
	}
	
	isDuplicateCustAndCdUsedByCust = false;
}
function GetRegisterOfficeCd(){
	var formObj=document.frm1;
	ajaxSendPost(GetRegisterOfficeCode, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+formObj.cust_cd.value, './GateServlet.gsl');
}

function GetRegisterOfficeCd_Supplier(){
	var formObj=document.frm1;
	ajaxSendPost(GetRegisterOfficeCode_Supplier, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+docObjects[0].GetCellValue(cur_row, "splr_cd"), './GateServlet.gsl');
}
function GetRegisterOfficeCd_Supplier1(){
	var formObj=document.frm1;
	var cust = sheet1.GetCellValue(puprow,"splr_cd");
	ajaxSendPost(GetRegisterOfficeCode_Supplier, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+cust, './GateServlet.gsl');
}

var regis_dc = "";
function GetRegisterOfficeCode_Supplier(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				regis_dc = rtnArr[0];
			}
		}
	}
}
function GetRegisterOfficeCode(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.rgst_ofc_cd_1.value = rtnArr[0];
			}
		}
	}
}
/**
 * AJAX RETURN
 * REF NO 중복체크
 */
function checkDuplicateInternalCdEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
//			var rtnArr=doc[1].split('^@');
//			if(rtnArr[0] != "null" && rtnArr[0] != ""){
//				//formObj.f_save_sts_flg.value = "U";
//				//formObj.cust_itm_id.select();
//			}else{
//				formObj.f_save_sts_flg.value = "I";
//			}
			if(formObj.f_save_sts_flg.value == "I"){
				if(doc[1] == "1"){
					isDuplicateInternalCode = true;
					return;
				}
			}
		}
	}
	
	isDuplicateInternalCode = false;	
}
function checkInternalCdEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
//			var rtnArr=doc[1].split('^@');
//			if(rtnArr[0] != "null" && rtnArr[0] != ""){
//				//formObj.f_save_sts_flg.value = "U";
//				//formObj.cust_itm_id.select();
//			}else{
//				formObj.f_save_sts_flg.value = "I";
//			}
				if(doc[1] == "1"){
					checkInternalCode = true;
					return;
				}
		}
	}
	
	checkInternalCode = false;	
}
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	formObj.cust_itm_id_1.value = formObj.cust_itm_id.value;
//	var wgt = parseFloat(formObj.itm_wgt.value.split(",").join(""));
//	formObj.itm_wgt_lbs.value = roundXL((wgt * 2.2046),2);
//	var vol = parseFloat(formObj.itm_vol.value.split(",").join(""));
//	formObj.itm_vol_cft.value = roundXL((vol *  35.315),3);
//	var wdt = parseFloat(formObj.itm_wdt.value.split(",").join(""));
//	formObj.itm_wdt_inch.value = roundXL((wdt *  0.39370),2);
//	var hgt = parseFloat(formObj.itm_hgt.value.split(",").join(""));
//	formObj.itm_hgt_inch.value = roundXL((hgt *  0.39370),2);
//	var len = parseFloat(formObj.itm_len.value.split(",").join(""));
//	formObj.itm_len_inch.value = roundXL((len *  0.39370),2);
	
	var custum = formObj.cust_cd.value;
	var htscd = formObj.itm_hts_cd.value;
	if(custum != ""){
	//customer 
	ajaxSendPost(trdpCdReq_1, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+"trdpCode"+'&s_code='+custum, './GateServlet.gsl');
	}
	if(htscd != ""){
	//hts code
	ajaxSendPost(trdpCdReq_3, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+"commodity"+'&s_code='+htscd, './GateServlet.gsl');
	}
//	for(var i=1; i <= sheet1.RowCount();i++){
//	//customer of grid
//		var custum1 = sheet1.GetCellValue(i,"splr_cd");
//	ajaxSendPost(trdpCdReq1, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+"trdpCode"+'&s_code='+custum1, './GateServlet.gsl');
//	}
	chkCommaObj();
}
function chkCommaObj(){
	var formObj=document.frm1;
	chkComma(formObj.itm_wgt,8,2);
	chkComma(formObj.itm_vol,7,3);
	chkComma(formObj.itm_wdt,8,2);
	chkComma(formObj.itm_hgt,8,2);
	chkComma(formObj.itm_len,8,2);
	chkComma(formObj.itm_prc_amt,8,2);
	
	chkComma(formObj.itm_wgt_lbs,8,2);
	chkComma(formObj.itm_vol_cft,7,3);
	chkComma(formObj.itm_wdt_inch,8,2);
	chkComma(formObj.itm_hgt_inch,8,2);
	chkComma(formObj.itm_len_inch,8,2);
	chkComma(formObj.itm_prc_amt,8,2);
	
	
}
function trdpCdReq_1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
		}else{
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
		}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
	GetRegisterOfficeCd();
}
function trdpCdReq_3(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			formObj.itm_hts_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
			formObj.itm_hts_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
		}else{
				formObj.itm_hts_cd.value="";				//itm_hts_cd  AS param1
				formObj.itm_hts_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) == "cust_itm_id"){
	}
}
function clearAll(){
	docObjects[0].RemoveAll();
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].id != "cust_itm_id" && collTxt[i].type == "text"){
			collTxt[i].value="";
		}
			  switch(collTxt[i].name){
	      			case "itm_wgt":
	      			case "itm_len_inch":
	      			case "itm_wdt_inch":
	      			case "itm_hgt_inch":
	      			case "itm_wgt_lbs":
	      			case "itm_wdt":
	      			case "itm_hgt":
	      			case "itm_len":
	      			case "itm_prc_amt":
	      				collTxt[i].value="0.00";
	      				break;
	      			case "itm_vol":
	      			case "itm_vol_cft":
	      				collTxt[i].value="0.000";
	      				break;
		      		break;
			  }
	}
	formObj.itm_curr_cd.selectedIndex = 0;
	formObj.itm_ut_cd.value = "";
	formObj.use_flg.value = "Y";
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				ComShowCodeMessage('COM12212');
//				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
//Calendar flag value
var firCalFlag=false;3

function validateNumber(f,type) {
	if (f.value == "" ) {
		f.value = "0";
		obj_change();
		return;
	}
	switch(type){
		case "INT":
			if (!/^\d*$/.test(f.value)) {
				f.value = "0";
				obj_change();
				ComShowCodeMessage('COM12213');
//				alert("Only numbers allowed!");
				f.focus();
				return;
			}
			break;
		case "FLT":
//			if (!/^[0-9.,]+$/.test(f.value)) {
				if (!/^[\d,]+(\.\d+)?$/.test(f.value)) {
				f.value = "0";
				obj_change();
//				alert("Only numbers allowed!");
				ComShowCodeMessage('COM12213');
				f.focus();
				return;
			}
//			if (parseFloat(f.value.replaceStr(",",""))>9999999) {
//				f.value = "0";
//				obj_change();
//				alert("Exceed the maximum value!");
//				f.focus();
//				return;
//			}
			break;
	}
	
} 

function checkMaxValue(input){
//	var input = document.getElementsByTagName("INPUT");
//	for (var i = 0; i < input.length; i++) {
//	  if (input.type == "text") {
		  switch(input.name){
      			case "itm_wgt":
      				var value = parseFloat(input.value.split(",").join(""));
      				if(value > roundXL((9999999 / 2.2046),2)){
      					ComShowCodeMessage('COM12225',roundXL((9999999 / 2.2046),2));
      					alert("Maximum Weight is "+roundXL((9999999 / 2.2046),2) +" KG");
      					input.value = roundXL((9999999 / 2.2046),2);
      					input.focus();
      				}
      			break;
      			case "itm_vol":
	      			var value = parseFloat(input.value.split(",").join(""));
	  				if(value > roundXL((9999999 /  35.315),3)){
//	  					alert("Maximum Measurement is "+roundXL((9999999 /  35.315),3)+" CBM");
	  					ComShowCodeMessage('COM12214',roundXL((9999999 /  35.315),3));
	  					input.value=roundXL((9999999 /  35.315),3);
      					input.focus();
	  				}
	  			break;
      			case "itm_len_inch":
      			case "itm_wdt_inch":
      			case "itm_hgt_inch":
      				var value = parseFloat(input.value.split(",").join(""));
	  				if(value > roundXL((9999999 *  0.39370),2)){
	  					ComShowCodeMessage('COM12215',roundXL((9999999 *  0.39370),2));
//	  					alert("Maximum Length/Width/Height is "+roundXL((9999999 *  0.39370),2)+" Inch");
	  					input.value=roundXL((9999999 *  0.39370),2);
      					input.focus();
	  				}
	  			break;
      			case "itm_wdt":
      			case "itm_hgt":
      			case "itm_len":
      				var value = parseFloat(input.value.split(",").join(""));
      				if(value > 9999999.01){
//      					alert("Maximum Length/Width/Height is 9,999,999.01 CM");
      					ComShowCodeMessage('COM12216');
      					input.value=9999999.01;
      					input.focus();
      				}
      				break;
      			case "itm_wgt_lbs":
      				var value = parseFloat(input.value.split(",").join(""));
      				if(value > 9999999.01){
      					ComShowCodeMessage('COM12217');
//      					alert("Maximum Weight is 9,999,999.01 LBS");
      					input.value=9999999.01;
      					input.focus();
      				}
      				break;
      			case "itm_vol_cft":
      				var value = parseFloat(input.value.split(",").join(""));
      				if(value > 9999999.01){
      					ComShowCodeMessage('COM12218');
//      					alert("Maximum Measurement is 9,999,999.01 CFT");
      					input.value=9999999.01;
      					input.focus();
      				}
      				break;
      			case "itm_prc_amt":
      				var value = parseFloat(input.value.split(",").join(""));
      				if(value > 999999999.99){
      					ComShowCodeMessage('COM12219');
//      					alert("Maximum Price is 999,999,999.99");
      					input.value=999999999.99;
      					input.focus();
      				}
      				break;
		  }
		  obj_change(input.name);
//	  }
//	}
//	return true;
}

function validCode(obj){
	//use with onKeyPress="ComKeyOnlyAlphabet(null,'45|95')"
	var formObj = document.getElementById(obj.id);
 var filter = /^([0-9a-zA-Z\-\_])*$/;
 if (!filter.test(formObj.value)) {
// 	alert("Invalid characters, or contains the string.");
 	ComShowCodeMessage('COM12220');
 	formObj.value="";
 }
 return true;
}