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
	var formObj  = document.frm1;
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(formObj.etd_strdt, 180, formObj.etd_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj  = docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCH":
    	   		if(!chkSearchFromToDate(false, formObj.etd_strdt, formObj.etd_enddt) || !CheckMandatoryField()){
    	   			return;
    	   		}
    	   		sheetObj.RemoveAll();
    	   		
    	   		sheet1.ShowProcessDlg();
    	   		
    	   		setTimeout(function(){
    	   			formObj.f_cmd.value=SEARCH;
//    	   			var xml = 
    	   				sheetObj.DoSearch("./WHM_WHM_0008GS.clt", FormQueryString(formObj) );
//    	   			sheetObj.LoadSearchData(xml);
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
           		window.openWindow('./WHM_WHM_0007.clt');
           		break;
           	case "btn_Clear":
           		clearAll();
           		setDefaultDate(formObj.etd_strdt);
           	    setDefaultDate(formObj.etd_enddt);
           		break;
           	case "btn_Receipt":
           		break;
           	case "DELETE":
           		doDelete();
           		break;
           	case "btn_Search_Cust":
           		rtnary=new Array(1);
 	  		   rtnary[0]="1";
// 	  		   rtnary[1]=formObj.cust_nm.value;
 	  		   rtnary[1]="";
 	  		   rtnary[2]=window;
 	  		   
 	  		   callBackFunc = "WH_POPLIST";
 	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
           		break;
           	case "btn_Search_Cust_name":
           		rtnary=new Array(1);
 	  		   rtnary[0]="1";
 	  		   rtnary[1]=formObj.cust_nm.value;
 	  		   rtnary[2]=window;
 	  		   
 	  		   callBackFunc = "WH_POPLIST";
 	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
           		break;	
           		
     	   break;
            case "SU_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
         	   rtnary=new Array(1);
         	   rtnary[0]="1";
//         	   rtnary[1]=formObj.splr_rcvr_nm.value;
         	   rtnary[1]="";
         	   rtnary[2]=window;
         	   
         	   callBackFunc = "SU_POPLIST";
         	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
         	   break;
            case "SU_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	   rtnary=new Array(1);
          	   rtnary[0]="1";
          	   rtnary[1]=formObj.splr_rcvr_nm.value;
          	   rtnary[2]=window;
          	   
          	   callBackFunc = "SU_POPLIST";
          	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
          	   break;
         	   
            case "TR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
         	   rtnary=new Array(1);
         	   rtnary[0]="1";
//         	   rtnary[1]=formObj.trkr_nm.value;
         	   rtnary[1]="";
         	   rtnary[2]=window;
         	   
         	   callBackFunc = "TR_POPLIST";
         	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
         	   break;
            case "TR_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	   rtnary=new Array(1);
          	   rtnary[0]="1";
          	   rtnary[1]=formObj.trkr_nm.value;
          	   rtnary[2]=window;
          	   
          	   callBackFunc = "TR_POPLIST";
          	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
          	   break;
         	   
            case "btn_ctrt_no":	
    			var sUrl="./ContractRoutePopup.clt";
    			   callBackFunc = "setCtrtNoInfo";
    			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
    			break;
            case "btn_ctrt_no_name":	
    			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
    			   callBackFunc = "setCtrtNoInfo";
    			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
    			break;
    			
            case "RECEIPT":
            	// /////////////////////////////////////////////////////////
        		// 프린트
        		formObj.file_name.value='warehouse_picking_slip.mrd';
        		formObj.title.value='Picking Slip';
        		var chkCnt=0;
        		for ( var i=1; i <= sheetObj.LastRow(); i++) {
        			if (sheetObj.GetCellValue(i, "check_flag") == "1") {
        				chkCnt += 1;
        			}
        		}
        		if (chkCnt == 1) {
        			var f_wh_recp_no="";
        			var i_cust_cd="";
        			var i_ship_cd="";
        			var trucker = "";
        			var repno = "";
        			var regis = "";
        			s_type = "trdpCode";
        			for ( var i=1; i <= sheetObj.LastRow(); i++) {
        				if (sheetObj.GetCellValue(i, "check_flag") == "1") {
        					f_wh_recp_no=sheetObj.GetCellValue(i, "file_no");
        					i_cust_cd = sheetObj.GetCellValue(i, "cust_cd");
        					i_ship_cd = sheetObj.GetCellValue(i, "splr_rcvr_cd");
        					trucker = sheetObj.GetCellValue(i, "trkr_cd");
        					repno = sheetObj.GetCellValue(i, "cust_ref_no");
        					regis = sheetObj.GetCellValue(i, "rgst_ofc_cd");
        				//	ajaxSendPost(getparamcust, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+i_cust_cd, './GateServlet.gsl');
        				//	ajaxSendPost(getparamship, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+i_ship_cd, './GateServlet.gsl');
        					break;
        				}
        			}
        			// Parameter Setting
        			var param='';
        			param += '[' + f_wh_recp_no + ']'; // $1
        			param += '[' + i_ship_cd + ']'; // $2
        			param += '[' + i_cust_cd + ']'; // $3
        			param += '[' + trucker + ']';
        			param += '[' + repno + ']';
        			param += '[' + regis + ']';
        			formObj.rd_param.value=param;
        			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        		} else if (chkCnt == 0) {
        			//alert("Please select the row to print. ");
        			ComShowMessage(getLabel('FMS_COM_ALT004'));	
        			return;
        		} else {
        			//alert("Please select 1 row. ");
        			ComShowMessage(getLabel('FMS_COM_ALT003'));	
        			return;
        		}
        		break;
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
//				alert("Only delete one record at one time.");
				ComShowCodeMessage('COM12242');
				return;
			}
			
			if(sheet1.GetCellValue(i,"rcv_shp_flg") == "Y"){
//				alert("This receiving was confirmed already, can not delete it.");
				ComShowCodeMessage('COM12243');
				return;
			}
		}
	}
	
	if(checkedItemCount != 0){
		//Execute delete query.
		if(ComShowCodeConfirm("COM130301")){
			var params = "&file_no=" + sheet1.GetCellValue(checkedItemCount, "file_no")
			+"&rgst_ofc_cd=" + sheet1.GetCellValue(checkedItemCount, "rgst_ofc_cd")
			+"&rcv_shp_tp_cd=SHP";
			
			ajaxSendPost(calBackDelete, 'reqVal', '&goWhere=aj&bcKey=delRcvShpLst'+params, './GateServlet.gsl');
		}
	}else{
//		alert("Please select one item from the list !");
		ComShowCodeMessage('COM12244');
		return;
	}
}

function calBackDelete(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			if(doc[1] == "1"){
//				alert("Deleted successfully.");
				ComShowCodeMessage('COM12201');
				doWork("SEARCH");
			}else if(doc[1] == "2"){
//				alert("Cannot delete status shipped/received .");
				ComShowCodeMessage('COM12243');
				doWork("SEARCH");
			}else{
				ComShowCodeMessage("COM130304");
			}
		}
	}
}

function CheckMandatoryField(){
	var formObj = document.frm1;
//	if(formObj.wh_cd.value == ""){
//		alert("Please select warehouse!");
//		formObj.wh_cd.focus();
//		return false;
//	}
	
	return true;
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.frm1;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
		   getCtrtInfo(formObj.ctrt_no);
	}
}

function getCtrtInfo(obj){
	var formObj=document.frm1;
	if(obj.value ==""){
		formObj.ctrt_no.value="";
		formObj.ctrt_nm.value="";
		return;
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+encodeURIComponent(obj.value), './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		if(rtnArr[0]!=""){
			formObj.ctrt_nm.value = rtnArr[0];
		}else{
//			ComShowCodeMessage("COM0029");
			formObj.ctrt_no.value = "";
			formObj.ctrt_nm.value = "";
		}
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
	}
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
function SU_POPLIST(rtnVal){
	var formObj = document.frm1;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.splr_rcvr_cd.value=rtnValAry[0];//full_nm
	   formObj.splr_rcvr_nm.value=rtnValAry[2];//full_nm
   }
}

function TR_POPLIST(rtnVal){
	var formObj = document.frm1;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.trkr_cd.value=rtnValAry[0];//full_nm
	   formObj.trkr_nm.value=rtnValAry[2];//full_nm
   }   
}

function sheet1_OnDblClick(sheetObj,Row,Col){	
	var opener = window.dialogArguments;
	 if (!opener) opener=window.opener;
	 if (!opener) opener = parent;
	var formObj=document.frm1;
  	doProcess=true;
  	var file_no = sheet1.GetCellValue(Row,"file_no");
  	var rgst_ofc_cd = sheet1.GetCellValue(Row,"rgst_ofc_cd");
  	
  	var paramStr="";
  	paramStr += "./WHM_WHM_0007.clt?file_no="+file_no+"&rgst_ofc_cd="+rgst_ofc_cd;
	parent.mkNewFrame('Shipping', paramStr, "WHM_WHM_0007_SHEET_" +file_no+"_"+rgst_ofc_cd);
  	//parent.mkNewFrame('Shipping', paramStr);
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
            cal.select(formObj.etd_strdt,formObj.etd_enddt, 'MM-dd-yyyy');
          
        break;
        case 'DATE21':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendar();
            cal.select(formObj.etd_enddt,  'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	var formObj  = document.frm1;
	docObjects[0].RemoveAll();
	formObj.f_CurPage.value=callPage;
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
    setDefaultDate(formObj.etd_strdt);
    setDefaultDate(formObj.etd_enddt);
    formObj.btn_receipt.disabled=1;
    formObj.btn_del.disabled=1;
    doWork('SEARCH');
    
    //#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"fnRestoreGridSetEnd"); 
}
//#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
function fnRestoreGridSetEnd(){
	
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
		           var HeadTitle1 = "CHK|Warehouse|Shipping No.||Customer|Booking Date|Shipping Date| Customer Ref. No.|Delivery To|Trucker|P/O No.|Pallet|Container|MB/L No.|HB/L No.|Operated By|||||";
		           var headers = [ { Text:HeadTitle1, Align:"Center"}];
		           InitHeaders(headers, info);
		
		           var cols = [   {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"check_flag" },
		                          {Type:"Text",     Hidden:0,  Width:180,   Align:"Left",    ColMerge:1,   SaveName:"wh_nm",           KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"file_no",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:1,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:0,  Width:230,   Align:"Left",    ColMerge:1,   SaveName:"cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  
				                  {Type:"Date",     Hidden:0,  Width:90,    Align:"Center",    ColMerge:1,   SaveName:"bkg_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Date",     Hidden:0,  Width:100,   Align:"Center",    ColMerge:1,   SaveName:"rcv_shp_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",  ColMerge:1,   SaveName:"cust_ref_no",     KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",    ColMerge:1,   SaveName:"splr_nm",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",    ColMerge:1,   SaveName:"trkr_nm",    	   KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                 
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"itm_po_no",       KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"plt_no",     	   KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"cntr_no",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",  ColMerge:1,   SaveName:"mst_bl_no",       KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",  ColMerge:1,   SaveName:"hus_bl_no",       KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",     Hidden:0,  Width:110,   Align:"Left",    ColMerge:1,   SaveName:"rcv_by",          KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                 
				                  {Type:"Text",     Hidden:1,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"rgst_ofc_cd",     KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				                  {Type:"Text",     Hidden:1,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"splr_rcvr_cd",    KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",     Hidden:1,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"trkr_cd",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0},
				                  {Type:"Text",     Hidden:1,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"rcv_shp_flg",     KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0}
				                  //{Type:"Text",     Hidden:1,  Width:110,   Align:"Left",    ColMerge:1,   SaveName:"itm_cd",          KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0}
				                 
				                 ];
		            
		           InitColumns(cols);
		           SetEditable(1);
		           SetHeaderRowHeight(20);
		           SetHeaderRowHeight(21);
		           //InitViewFormat(0, "bkg_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		           //InitViewFormat(0, "rcv_shp_dt", 	"MM-dd-yyyy");

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
				if(CODETYPE=="SUPPLIER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				if(CODETYPE=="TRUCKER"){
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
				if(CODETYPE=="SUPPLIER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				if(CODETYPE=="TRUCKER"){
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
		if(str == "SUPPLIER"){
			formObj.splr_rcvr_cd.value="";//splr_rcvr_cd  AS param1
			formObj.splr_rcvr_nm.value="";//splr_rcvr_nm   AS param2
		}
		if(str == "TRUCKER"){
			formObj.trkr_cd.value="";//trkr_cd  AS param1
			formObj.trkr_nm.value="";//trkr_nm   AS param2
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
			if(CODETYPE =="SUPPLIER"){
				formObj.splr_rcvr_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.splr_rcvr_nm.value=masterVals[3];	//cust_nm   AS param2
			}
			if(CODETYPE =="TRUCKER"){
				formObj.trkr_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.trkr_nm.value=masterVals[3];	//cust_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}	
			if(CODETYPE == "SUPPLIER"){
				formObj.splr_rcvr_cd.value="";//splr_rcvr_cd  AS param1
				formObj.splr_rcvr_nm.value="";//splr_rcvr_nm   AS param2
			}
			if(CODETYPE == "TRUCKER"){
				formObj.trkr_cd.value="";//trkr_cd  AS param1
				formObj.trkr_nm.value="";//trkr_nm   AS param2
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
	var formObj=document.frm1;
	if(sheet1.RowCount()>0){
			formObj.btn_receipt.disabled=0;
			formObj.btn_del.disabled=0;
		}else{
			formObj.btn_receipt.disabled=1;
			formObj.btn_del.disabled=1;
		}
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
	formObj.wh_cd.value ="";
	formObj.tp_date.value ="ERD";
	formObj.tp_nm_ld.value ="FILLING_NO";
	formObj.rcv_tp.value ="All";
	formObj.ofc_cd.value ="";
	formObj.btn_receipt.disabled =1;
	formObj.btn_del.disabled =1;
}
function getPageURL() {
	return document.getElementById("pageurl").value;
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
 			ComShowMessage(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(toObj.value==''){
 			ComShowMessage(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}

 	//Date field is optional.	
 	}else{
 		if(fmObj.value==''&&toObj.value!=''){
 			ComShowMessage(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 			
 		}else if(fmObj.value!=''&&toObj.value==''){
 			ComShowMessage(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}
 	}
 	
    if(compare(fmObj.value, toObj.value)){
     	// curObj.value = '';
    	ComShowMessage(getLabel('FMS_COM_ALT033'));
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
