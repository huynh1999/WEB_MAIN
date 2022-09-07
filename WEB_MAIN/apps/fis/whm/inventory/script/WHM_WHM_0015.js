/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0009.jsp
*@FileTitle  : Item Entry
*@author     : Hanh.Le
*@version    : 1.0
*@since      : 2014/12/22
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
    //var sheetObj  = docObjects[0];
    var sheetObj1 = docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		sheetObj1.RemoveAll();
    	   		if(!chkSearchCmprPrd(false, formObj.etd_strdt, formObj.etd_enddt)){
    	   			return;
    	   		}
    	   		formObj.str_date.value = formatDateTime(formObj.etd_strdt.value);
    	   		formObj.end_date.value = formatDateTime(formObj.etd_enddt.value);
    	   		/*if(formObj.radio_itm_inv.checked){
    	   			if(formObj.wh_cd.value==""){
    	   				ComShowCodeMessage("COM12113","Warehosue");
        	   			return;
    	   			}
    	   			
    	   			formObj.f_cmd.value=SEARCH01;
//    	   			var xmlStr = 
    	   				sheetObj.DoSearch("./WHM_WHM_0009GS.clt", FormQueryString(formObj) );
    	   			setSubSumRow(docObjects[0]);
//    	   			docObjects[0].LoadSearchData(xmlStr,{Sync:0} );
    	   			
    	   			
    	   		}
    	   		if(formObj.radio_in_out_htr.checked){*/
    	   			if(formObj.wh_cd.value=="All" || formObj.wh_cd.value==""){
    	   				ComShowCodeMessage("COM12113","Warehosue");
        	   			return;
    	   			}
//    	   			if(formObj.cust_cd.value==""){
//        	   			ComShowCodeMessage("COM130403","Customer");
//        	   			return;
//        	   		}
    	   			if(formObj.etd_strdt.value==""||formObj.etd_enddt.value==""){
    	   				ComShowCodeMessage("COM130403","Period");
        	   			return;
    	   			}
    				formObj.f_cmd.value=SEARCH02;
					setSubSumRow2(docObjects[0]);
					var xmlStr =
							sheetObj1.DoSearch("./WHM_WHM_0015_01GS.clt", FormQueryString(formObj));

//    	   			docObjects[1].LoadSearchData(xmlStr,{Sync:0} );
    	   			
    	   		//}
    	   	break;
    	   	case "WH_POPLIST":
            	   rtnary=new Array(1);
 	  		   var formObj=document.frm1;
 	  		   
 	  		   rtnary[0]="1";
// 	  		   rtnary[1]=formObj.cust_nm.value;
 	  		   rtnary[1]="";
 	  		   rtnary[2]=window;
 	  		   
 	  		   callBackFunc = "WH_POPLIST";
 	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
            		break;
    	   	case "WH_POPLIST_NAME":
         	   rtnary=new Array(1);
	  		   var formObj=document.frm1;
	  		   
	  		   rtnary[0]="1";
	  		   rtnary[1]=formObj.cust_nm.value;
	  		   rtnary[2]=window;
	  		   
	  		   callBackFunc = "WH_POPLIST";
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
    			
           	case "EXCEL"://openMean 1=화면에서 오픈, 2=그리드에서 오픈        
//           		if(formObj.radio_itm_inv.checked){
//           			if(docObjects[0].RowCount() < 1){//no data	
//    	    			ComShowCodeMessage("COM132501");
//    	    		}else{
//    	   	 			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
//    	    		}
//           		}else{
           			if(docObjects[0].RowCount() < 1){//no data	
    	    			ComShowCodeMessage("COM132501");
    	    		}else{
    	   	 			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
    	    		}
//           		}
           		
    	   		break;
           	case "CLEAR":
           		clearAll(false);
           		break;
           		
           	case "btn_Search_Cust":
           		rtnary=new Array(1);
 	  		   
 	  		   rtnary[0]="1";
 	  		   rtnary[1]=formObj.cust_nm.value;
 	  		   rtnary[2]=window;
 	  		   
 	  		   callBackFunc = "WH_POPLIST";
 	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
           		break;	
            
			
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	ComShowMessage(getLabel('FMS_COM_ERR002') + "\n\n: SEE_AMS_0010.001");
        } 
        else{
        	//System Error! + MSG
        	ComShowMessage(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_AMS_0010.002");
        }
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

/**
 * 화면에서 사용하는 메소드
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
	//docObjects[0].RemoveAll();
	formObj.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
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
//	setOfficeAllOption(formObj.f_ofc_cd);
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	formObj.etd_strdt.className= "input1";
	formObj.etd_enddt.className= "input1";
	setDefaultDate(formObj.etd_strdt);
	setDefaultDate(formObj.etd_enddt);
	
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
function sheet2_OnSelectMenu(sheetObj, MenuString){
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
    /*switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
			SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );

	           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
	           var HeadTitle1 = "Item|Item|Item|Unit|Location|Inventory|Inventory|Inventory|Inventory|Inventory|Inventory|Inventory" ;
	           var HeadTitle2 = "Code||Name|Unit|Location|Qty.|EA|Total Qty|KGS|LBS|CBM|CFT" ;			
	           var headers = [ { Text:HeadTitle1, Align:"Center"},
	                       { Text:HeadTitle2, Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [   
	                          {Type:"Text",        Hidden:0,  Width:150,     Align:"Center",  ColMerge:1,   SaveName:"cust_itm_id",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
			                  {Type:"Text",        Hidden:1,  Width:150,     Align:"Center",  ColMerge:1,   SaveName:"itm_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
			                  {Type:"Text",        Hidden:0,  Width:150,     Align:"left",    ColMerge:1,   SaveName:"itm_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Text",        Hidden:0,  Width:80,     Align:"Center",  ColMerge:0,   SaveName:"itm_ut_cd",         KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Text",        Hidden:0,  Width:150,     Align:"Center",  ColMerge:0,   SaveName:"loc_cd",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:0,  Width:120,     Align:"Right",   ColMerge:0,   SaveName:"ttl_ctn_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:1,  Width:120,     Align:"Right",   ColMerge:0,   SaveName:"ttl_ea_qty",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:0,  Width:120,     Align:"Right",   ColMerge:0,   SaveName:"ttl_qty",           KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:0,  Width:150,     Align:"Right",   ColMerge:0,   SaveName:"ttl_wgt_kgs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:0,  Width:150,     Align:"Right",   ColMerge:0,   SaveName:"ttl_wgt_lbs",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:0,  Width:150,     Align:"Right",   ColMerge:0,   SaveName:"ttl_vol_cbm",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Float",      Hidden:0,  Width:150,     Align:"Right",   ColMerge:0,   SaveName:"ttl_vol_cft",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,   UpdateEdit:1,   InsertEdit:1 }
	                   ];
	            
	           InitColumns(cols);
	           SetEditable(0);
	           SetHeaderRowHeight(20);
	           SetHeaderRowHeight(21);
	           SetSheetHeight(500);
	           sheetObj.SetCountFormat("SELECTDATAROW / ROWCOUNT");
	           resizeSheet();
		   }                                                      
		break;
		case 2:      //IBSheet2 init*/
             with (sheetObj) {
				SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0, FrozenCol:9} );
	
		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		           var HeadTitle1 = "|Customer|Contract|Item|Item|Unit|Date|Type|Vendor/Deliver To||Beginning\n Balance|Inbound|Inbound|Inbound|Inbound|Inbound|Inbound|Inbound|Outbound|Outbound|Outbound|Outbound|Outbound|Outbound|Outbound|Ending\n Balance|Contract_No" ;
		           var HeadTitle2 = "|Customer|Contract|Code|Name|Unit|Date|Type|Vendor/Deliver To||Beginning\n Balance|Qty.|EA|Total Qty|KG|LB|CBM|CFT|Qty.|EA|Total Qty|KG|LB|CBM|CFT|Ending\n Balance|Contract_No" ;
		           var headers = [ { Text:HeadTitle1, Align:"Center"},
		                       { Text:HeadTitle2, Align:"Center"} ];
		           InitHeaders(headers, info);
		
		           var cols = [   
				                  {Type:"Text",      Hidden:1,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"cust_cd",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					   		      {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"cust_nm",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					              {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},
					   			  {Type:"Text",      Hidden:0,  Width:90,    Align:"Center",  ColMerge:1,   SaveName:"cust_itm_id",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0},

				                  {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:1,   SaveName:"itm_nm",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Text",      Hidden:0,  Width:80,    Align:"Center",    ColMerge:1, SaveName:"itm_ut_cd",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Date",      Hidden:0,  Width:90,    Align:"Center",  ColMerge:0,   SaveName:"rcv_shp_dt",    	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1   },
				                  {Type:"Text",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:0,   SaveName:"rcv_shp_tp_cd", 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
				                  {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"splr_rcvr_cd",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
				                  {Type:"Text",      Hidden:1,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"file_no",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
				                  
				                  {Type:"Int",       Hidden:0,  Width:90,    Align:"Right",   ColMerge:0,   SaveName:"bgn_bal",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1   },
				                  {Type:"Float",     Hidden:0,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"in_ctn",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
				                  {Type:"Float",     Hidden:1,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"in_ea",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"in_itm_ttl_qty",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"in_kgs",         	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"in_lbs",         	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"in_cbm",         	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"in_cft",         	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,   UpdateEdit:1,   InsertEdit:1},
				                  
				                  {Type:"Float",     Hidden:0,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"out_ctn",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:1,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"out_ea",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:70,    Align:"Right",   ColMerge:0,   SaveName:"out_itm_ttl_qty", KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"out_kgs",        	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"out_lbs",        	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"out_cbm",       	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"out_cft",        	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:5,   UpdateEdit:1,   InsertEdit:1 },
				                  {Type:"Int",       Hidden:0,  Width:120,   Align:"Right",   ColMerge:0,   SaveName:"end_bal",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1},
					              {Type:"Text",        Hidden:1,  Width:50,     Align:"Left",  ColMerge:1,   SaveName:"ctrt_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0}
				                  ];
		            
		           InitColumns(cols);
		           SetEditable(0);
		           SetHeaderRowHeight(20);
		           SetHeaderRowHeight(21);
		           //InitViewFormat(0, "rcv_shp_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
		           SetColProperty(0,"end_bal",{Format:"#,##0"});
		           
		           //#738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영
		           SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		           
		           SetSheetHeight(500);
		           resizeSheet();
            }                                                      
            //break;
    //}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
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
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				CODETYPE=str;
				s_type="trdpCode";
				if(CODETYPE=="CUSTUMER"){
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

function clearAll(tabClick){
	docObjects[0].RemoveAll();
	//docObjects[1].RemoveAll();  //#935 [9][WH In/Out History] Display system error message when click New button
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	if(formObj.f_ofc_cd.options.length > 1){
		formObj.f_ofc_cd.value = "";
	}
	//if(formObj.radio_in_out_htr.checked){ //#935 [9][WH In/Out History] Display system error message when click New button
		setDefaultDate(formObj.etd_strdt);
		setDefaultDate(formObj.etd_enddt);
	//}
	if (!tabClick) {
		formObj.wh_cd.selectedIndex = 0;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}

//Calendar flag value
var firCalFlag=false;

function changeGrid(){
	var formObj = document.frm1;
	clearAll(true);
	if(formObj.radio_itm_inv.checked){
		document.getElementById('layer').style.display = "inline";
		document.getElementById('layer1').style.display = "none";
		formObj.etd_strdt.className= "input";
		formObj.etd_enddt.className= "input";
		formObj.etd_strdt.disabled= true;
		formObj.etd_enddt.disabled= true;
		formObj.btn_cal.disabled = true;
//		document.frm1.cust_cd.className ="input";
		ComResizeSheet(docObjects[0]);
	}
	if(formObj.radio_in_out_htr.checked){
		document.getElementById('layer').style.display = "none";
		document.getElementById('layer1').style.display = "inline";
		formObj.etd_strdt.className= "input1";
		formObj.etd_enddt.className= "input1";
//		document.frm1.cust_cd.className ="input1";
		setDefaultDate(formObj.etd_strdt);
		setDefaultDate(formObj.etd_enddt);
		formObj.etd_strdt.disabled= false;
		formObj.etd_enddt.disabled= false;
		formObj.btn_cal.disabled = false;
		ComResizeSheet(docObjects[1]);
	}
}

function setSubSumRow(sheetObj)
{
	var totalStr="Total";
	var subSumStr="Sub Total";
	with(sheetObj)
	{
		//Sub Sum 을 구한다.
        //              stdCol                      , sumCols,            ,PosBottom,sort,ShowCum,CapttionCol,otherColText,                                                                                                                 avgCols,isSumEx      
		ShowSubSum([{StdCol:0, SumCols:"5|6|7|8|9|10|11", Sort:false, ShowCumulate:false, CaptionText:"Sub Total"}]);

		
	}
}

function setSubSumRow2(sheetObj)
{
	var totalStr="Total";
	var subSumStr="Sub Total";
	with(sheetObj)
	{
		//Sub Sum 을 구한다.
        //              stdCol                      , sumCols,            ,PosBottom,sort,ShowCum,CapttionCol,otherColText,                                                                                                                 avgCols,isSumEx      
		ShowSubSum([{StdCol:3, SumCols:"10|11|12|13|14|15|16|17|18|19|20|21|22|23|24", Sort:false, ShowCumulate:false, CaptionText:"Sub Total", CaptionCol: 2}]);
			
	}
}


function sheet1_OnSearchEnd(sheetObj, errMsg) {
	if( sheetObj.RowCount() >1){
		var arys=sheetObj.FindSubSumRow().split("|");
		sheetObj.SetMergeCell(parseInt(arys[0]),0, 1, 4);
//		setMergeCellItem1(sheet1,2,parseInt(arys[0]));
		for(var i=1;i<arys.length;i++)
		{
			sheetObj.SetMergeCell(parseInt(arys[i]),0, 1, 4);
//			setMergeCellItem1(sheet1,parseInt(arys[i-1])+1,parseInt(arys[i]));
		}
		
		docObjects[0].SetSelectRow(-1);
	}
//	sheetObj.ColumnSort("0|3");
	ComOpenWait(false);
}
function setMergeCellItem1(sheetObj, rowBg,rowEnd){
	var rows = 1;
	for(var i = rowBg;i<rowEnd;i++){
		if(sheetObj.GetCellValue(i,"cust_itm_id")==sheetObj.GetCellValue(i+1,"cust_itm_id")){
			rows+=1;
			sheetObj.SetMergeCell(rowBg,0,rows,1);
			sheetObj.SetMergeCell(rowBg,2,rows,1);
		}else{
			setMergeCellItem(sheetObj,i+1,rowEnd);
		}
	}
}
function sheet2_OnSearchEnd(sheetObj, errMsg) {
		if( sheetObj.RowCount() >1){
		var end_bl =0;
		var bg_bl =0;
		var arys=sheetObj.FindSubSumRow().split("|");
		
		sheetObj.SetMergeCell(parseInt(arys[0]), 2, 1, 7);
		sheetObj.SetCellAlign(parseInt(arys[0]), 1, "Center");
		
		bg_bl = doMoneyFmt(sheetObj.GetCellValue(2,"bgn_bal"));
		end_bl = doMoneyFmt(sheetObj.GetCellValue(parseInt(arys[0])-1,"end_bal"));
		sheetObj.SetCellValue(parseInt(arys[0]),"bgn_bal",0);
		sheetObj.SetCellValue(parseInt(arys[0]),"end_bal",end_bl);
//		setMergeCellItem(sheet2,2,parseInt(arys[0])-1);
		
		for(var i=1;i<arys.length;i++)
		{
			sheetObj.SetMergeCell(parseInt(arys[i]),2, 1, 7);
			sheetObj.SetCellAlign(parseInt(arys[i]), 1, "Center");
			
			end_bl = doMoneyFmt(sheetObj.GetCellValue(parseInt(arys[i])-1,"end_bal"));		
			sheetObj.SetCellValue(parseInt(arys[i]),"end_bal",end_bl);
			
			sheetObj.SetCellValue(parseInt(arys[i]),"bgn_bal",0);
//			setMergeCellItem(sheet2,parseInt(arys[i-1])+1,parseInt(arys[i]));
		}
//		setmergeCell(sheet2,2);
		//docObjects[0].SetSelectRow(-1);
	}
}
function setmergeCell(sheetObj,rowBg){
	var y = 1;
	while(rowBg<sheetObj.RowCount()){
		var rows = 1;
		for(var i = rowBg;i<=sheetObj.RowCount()-1;i++ ){
			if(sheetObj.GetCellValue(i,"cust_cd")==sheetObj.GetCellValue(rowBg,"cust_cd")){
				rows+=1;
				sheetObj.SetMergeCell(rowBg,1,rows,1);
				y=i;
			}else if(sheetObj.GetCellValue(i,"cust_cd")==""&&sheetObj.GetCellValue(i+1,"cust_cd")==sheetObj.GetCellValue(rowBg,"cust_cd")){
				rows+=1;
				sheetObj.SetMergeCell(rowBg,1,rows,1);
				y=i;
			}else{
				y=i;
				break;
			}
		}
		rowBg=y+1;
	}
}
function setMergeCellItem(sheetObj, rowBg,rowEnd){
	var rows = 1;
	for(var i = rowBg;i<rowEnd;i++){
		if(sheetObj.GetCellValue(i,"cust_itm_id")==sheetObj.GetCellValue(i+1,"cust_itm_id")){
			rows+=1;
			sheetObj.SetMergeCell(rowBg,2,rows,1);
			sheetObj.SetMergeCell(rowBg,3,rows,1);
		}else{
			setMergeCellItem(sheetObj,i+1,rowEnd);
		}
	}
}

/**
 * set date default
 * @param isPast
 * @param days
 * @returns {Date}
 */
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
	 nextdate = mm+"-"+dd+"-"+ yyyy;
	 return nextdate;
}
	 
function setDefaultDate(obj){
	 var name = obj.name;
	 if(name.indexOf("_strdt") > -1){
	  obj.value = ComNextDate(1,30);
	 }else if(name.indexOf("_enddt") > -1){
		 obj.value = ComNextDate(0,0);
	 }
}
function formatDateTime(isdate){
	var mDay = isdate.substr(3,2);
	var mMonth = isdate.substr(0,2);
	var mYear = isdate.substr(6,4);
	var dt = mYear+"-"+mMonth+"-"+mDay;
	return dt;
}

