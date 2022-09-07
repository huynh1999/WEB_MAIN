/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0006.jsp
*@FileTitle  : Receiving List
*@author     : Thoa.Dien
*@version    : 1.0
*@since      : 2014/12/26
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.post_dt_strdt, 180, document.frm1.post_dt_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj  = docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCH":
    	   		
    	   		if(!chkSearchFromToDate(false, formObj.post_dt_strdt, formObj.post_dt_enddt) || !CheckMandatoryField() ){
    	   			return;
    	   		}
    	   		
    	   		sheetObj.RemoveAll();
    	   		
    	   		sheet1.ShowProcessDlg();
    	   		
    	   		
    	   		setTimeout(function(){
    	   		
    	   			formObj.f_cmd.value=SEARCH;
    	   		
    	   			var xml = sheetObj.GetSearchData("./WHM_WHM_0011GS.clt", FormQueryString(formObj) );
    	   		
    	   			sheetObj.LoadSearchData(xml);
    	   		},100);
    	   		
    	   		
    	   	break;
           	case "EXCEL"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
           		if(docObjects[0].RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	   	 			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	    		}
           		
    	   		break;
           	case "NEW":
           		//#5722 [AIF] W/H DOC filing no by office code
           		//window.openWindow('./WHM_WHM_0010.clt');
           		var paramStr="./WHM_WHM_0010.clt?f_cmd=-1";
           		parent.mkNewFrame('WH Doc Entry', paramStr);
           		break;
           	case "btn_Clear":
           		clearAll();
           		setDefaultDate(formObj.post_dt_strdt);
           	    setDefaultDate(formObj.post_dt_enddt);
           		break;
           	case "PROFIT_REPORT":
           	 	if(sheetObj.LastRow()== 0){
           	 		//There is no data
           			alert(getLabel('FMS_COM_ALT004'));	
           		}else{
           			var sRow=sheetObj.GetSelectRow();
           			//WMS ACCOUNT LKH 2015.01.20
           			var reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "wm_doc_seq");
           				reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "doc_ref_no");
           				reqParam += '&air_sea_clss_cd=' + "W";
           				reqParam += '&bnd_clss_cd=' + "N";
           				reqParam += '&biz_clss_cd=' + "";
           			popGET('RPT_PRN_0210.clt'+reqParam, '', 630, 400, "scroll:yes;status:no;help:no;");
           		}
           	break;
           	case "GOTOACCT":
    			var wms_ref_no=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "doc_ref_no");
    			var wms_seq=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "wm_doc_seq");
    			var paramStr="./ACC_INV_0040.clt?f_cmd=-1&f_ref_no="+wms_ref_no+"&s_wms_seq="+wms_seq;
    			paramStr+= "&refType=wmsRefNo";
    			
    			//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
				paramStr+= "&linkOpt=KEY";
    			
    			if(wms_ref_no != "-1"){
    				parent.mkNewFrame('Invoice List', paramStr);
    			}
    		break;
           	case "DELETE":
           		doDelete();
           		break;
           	case "btn_Search_Cust":
           		rtnary=new Array(1);
 	  		   var formObj=document.frm1;
 	  		   
 	  		   rtnary[0]="1";
// 	  		   rtnary[1]=formObj.cust_nm.value;
 	  		   rtnary[1]="";
 	  		   rtnary[2]=window;
 	  		   
 	  		   callBackFunc = "WH_POPLIST";
 	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
           		break;	
     	   break;
            case "SU_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
         	   rtnary=new Array(1);
         	   rtnary[0]="1";
         	   rtnary[1]=formObj.splr_rcvr_nm.value;
         	   rtnary[2]=window;
         	   
         	   callBackFunc = "SU_POPLIST";
         	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
         	   break;
            
            
    		break;
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_AMS_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_AMS_0010.002");
        }
	}
}

function doDelete(){
	var rowCount = sheet1.RowCount();
	
	if(rowCount < 1){
		return;
	}
	
	var checkedItemCount = 0;
	
	for( i = 1; i <= rowCount; i++){
		if(sheet1.GetCellValue(i,"check_flag") == "1"){
			if(checkedItemCount == 0){
				checkedItemCount = i;
			}else{
				alert("Only delete one record at one time.");
				return;
			}
			
			if(sheet1.GetCellValue(i,"rcv_shp_flg") == "Y"){
				alert("This receiving was confirmed already, can not delete it.");
				return;
			}			
		}
	}
	
	if(checkedItemCount != 0 && ComShowCodeConfirm("COM130301")){
		//Execute delete query.
		
		var params = "&file_no=" + sheet1.GetCellValue(checkedItemCount, "file_no")
					+"&rgst_ofc_cd=" + sheet1.GetCellValue(checkedItemCount, "rgst_ofc_cd")
					+"&rcv_shp_tp_cd=SHP";
		
		ajaxSendPost(calBackDelete, 'reqVal', '&goWhere=aj&bcKey=delRcvShpLst'+params, './GateServlet.gsl');
	}	
}

function calBackDelete(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			if(doc[1] == "1"){
				alert("Deleted successfully.")
				doWork("SEARCH");
			}else{
				ComShowCodeMessage("COM130304");
			}
		}
	}
}

function CheckMandatoryField(){
	var formObj=document.frm1;
	
	if(formObj.wh_cd.value == ""){
		alert("Please select warehouse!");
		formObj.wh_cd.focus();
		return false;
	}
	return true;
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



/*function sheet1_OnDblClick(sheetObj,Row,Col){	
	var paramStr="./WHM_WHM_0010.clt"
				+"?doc_file_no=" + sheet1.GetCellValue(Row,"doc_file_no");
   	parent.mkNewFrame('Doc Entry', paramStr);
}*/

function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	
	var doc_ref_no=sheetObj.GetCellValue(Row, "doc_ref_no");	
	var wm_doc_seq=sheetObj.GetCellValue(Row, "wm_doc_seq");
	
	
    var paramStr="./WHM_WHM_0010.clt?f_cmd=-1&doc_ref_no="+doc_ref_no+"&wm_doc_seq="+wm_doc_seq;
    parent.mkNewFrame('Warehouse Doc Entry', paramStr, "WHM_WHM_0010_SHEET1_" +doc_ref_no+"_"+wm_doc_seq);
}


/*
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType = "date";
            cal.select(formObj.post_dt_strdt,formObj.post_dt_enddt, 'MM-dd-yyyy');
          
        break;
        case 'DATE21':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendar();
            cal.select(formObj.post_dt_enddt,  'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
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
//	setOfficeAllOption(formObj.f_ofc_cd);
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    setDefaultDate(formObj.post_dt_strdt);
    setDefaultDate(formObj.post_dt_enddt);
    doWork('SEARCHLIST');
    
    //#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"fnRestoreGridSetEnd"); 
}
//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
function fnRestoreGridSetEnd(){
	
}	
//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
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
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
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
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:8 } );
	
		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		           
					var headers = [ { Text:getLabel('WHM_WHM_0011_HDR1'), Align:"Center"} ];
		           		           
		           		           
		           InitHeaders(headers, info);
		
		           var cols = [   {Type:"Text",     Hidden:0,  Width:120,   Align:"Left",  ColMerge:1,   SaveName:"doc_ref_no",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Text",     Hidden:1,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"wm_doc_seq",           KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Text",     Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"f_wh_nm",           KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                          {Type:"Date",     Hidden:0,  Width:90,    Align:"Center",    ColMerge:1, SaveName:"post_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",    PointCount:0,   UpdateEdit:1,   InsertEdit:1},
	                        	  {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     	   KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1},
				                  {Type:"Text",     Hidden:1,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"f_cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",     Hidden:0,  Width:300,   Align:"Left",    ColMerge:1,   SaveName:"f_cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",     Hidden:0,  Width:250,   Align:"Left",  ColMerge:1,   SaveName:"cust_ref_no",     KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",     Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"rgst_usrnm",          KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1},
				                  {Type:"Text",     Hidden:0,  Width:300,   Align:"Left",    ColMerge:1,   SaveName:"int_memo",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",     Hidden:0,  Width:300,   Align:"Left",    ColMerge:1,   SaveName:"ext_memo",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
				                  
				                 ];
		            
		           InitColumns(cols);
		           SetEditable(1);
		           SetHeaderRowHeight(20);
		           SetHeaderRowHeight(21);
		           //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		           
      	           //#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
		           SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		           
		           SetSheetHeight(500);
		           resizeSheet();
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
		if(tmp == "onKeyDown"){
			if(event.keyCode == 13){
				CODETYPE=str;
				
				if(str == "commodity") {
					s_type="commodity";
				}else{
					s_type="trdpCode";
				}
				
				if(CODETYPE=="CUSTUMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				
				if(CODETYPE=="TP_COM_NO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				CODETYPE=str;
				s_type="trdpCode";
				if(CODETYPE=="CUSTUMER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				
				if(CODETYPE=="TP_COM_NO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}
	else{
		if(str == "CUSTUMER"){
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
		}
				
		if(str == "TP_COM_NO"){
			formObj.txt_nm.value="";//text name  AS param1
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
			
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}	
			
			
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
var cur_row;

function sheet1_OnSearchEnd(){
	sheet1.HideProcessDlg();
}

function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	formObj.wh_cd.value ="A";
	
	formObj.tp_nm_ld.value ="FN";
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}

//Calendar flag value
var firCalFlag=false;

function ComNextDate(isPast,days){
	 var nextdate = new Date();
	 if(isPast){
	  nextdate.setDate(nextdate.getDate() - days);
	 }else{
	  nextdate.setDate(nextdate.getDate() + days);
	 }
	 var dd = nextdate.getDate();
	 var mm = nextdate.getMonth()+1; //January is 0!
	 var yyyy = nextdate.getFullYear();
	 if(dd<10) {
	     dd='0'+dd
	 } 
	 if(mm<10) {
	     mm='0'+mm
	 }
	 nextdate =mm+"-"+dd+ "-"+yyyy;
	 return nextdate;
}
	 
function setDefaultDate(obj){
	 var name = obj.name;
	 if(name.indexOf("_strdt") > -1){
	  obj.value = ComNextDate(1,30);
	 }else if(name.indexOf("_enddt") > -1){
	  obj.value = ComNextDate(0,15);
	 }
	}
function chkSearchFromToDate(isReq, fmObj, toObj){
 	//Date field is mandatory.
	
 	if(isReq){
 		if(fmObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}

 	//Date field is optional.	
 	}else{
 		
 	
 		if(fmObj.value==''&&toObj.value!=''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(fmObj.value!=''&&toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}
 	
 	}
 	
 	
    if(compare(fmObj.value, toObj.value)){     	
     	alert(getLabel('FMS_COM_ALT033'));
     	fmObj.focus();
     	return false;
    }else{
     	return true;
    }
}


function compare(a,b){
	var dtf = new Date(a);
	var dtt = new Date(b);
	if(dtf>dtt){
//		alert((((((dtt-dtf)/24) /60) /60) /1000) );
		return true;
	}else{
		return false;
	}
}
