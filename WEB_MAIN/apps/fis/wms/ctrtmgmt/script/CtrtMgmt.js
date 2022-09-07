/*=========================================================
*Copyright(c) 2015 DOU Networks. All Rights Reserved.
*@FileName   : CtrtMgmt.js
*@FileTitle  : Contract Management
*@author     : Vinh.Vo
*@version    : 1.0
*@since      : 2015/07/14
=========================================================*/
var rtnary=new Array(2);
var callBackFunc = "";
var dataOld ='';
var firCalFlag = false; 
//ZOOT::TODO-저장시 저장 data 제일 상단위치 시켜 수정 정보 Refresh
var oldSearchParams ='';
 
function doWork(srcName){
	 
//	if(!btnGetVisible(srcName)){
//		return;
//	}
	var frmObj = document.frm1;
	
    switch(srcName) {
       case "SEARCH":
    	   ClearDetails();
    	   doSearchContract();
    	   
       break;
       case "NEW":
    	   doNew();
       break;
       case "ROWADD2":
    	   if(sheet1.RowCount() <= 0 ) {
    		   ComShowCodeMessage('COM132605');
    		   return;
    	   }
    	   
    	   if(getNewRowIndex() != -1 && frmObj.d_ctrt_cd.value.trim() == ""){
    		   ComShowCodeMessage('COM132606');
    		   frmObj.d_ctrt_cd.focus();
    		   return;
    	   }
    	   
    	   var rowIndx = sheet2.RowCount() + sheet2.HeaderRows();
    	   
    	   sheet2.DataInsert(rowIndx);
    	   
    	   sheet2.SetCellValue(rowIndx,"ctrt_no",frmObj.d_ctrt_cd.value,0);
    	   
       break;
       case "MODIFY":
    	   doSave();
       break;
       case "EXCEL":

       break;
       case "CTRT_POPLIST":
    	   var params = "?ctrt_no="+frmObj.s_ctrt_no.value+"&ctrt_nm="+frmObj.s_ctrt_nm.value+"&ctrt_use_flg=A";

			callBackFunc = "clbck_CTRT_POPLIST";
			modal_center_open('./ContractRoutePopup.clt', new Array(), 900, 580,"yes");
	    break;
       case "CTRT_POPLIST_NAME":
    	   var params = "?ctrt_no="+frmObj.s_ctrt_no.value+"&ctrt_nm="+frmObj.s_ctrt_nm.value+"&ctrt_use_flg=A";

			callBackFunc = "clbck_CTRT_POPLIST";
			modal_center_open('./ContractRoutePopup.clt' + params  , new Array(), 900, 580,"yes");
	    break; 
	    
       case "CTRT_POPLIST":
    	   var params = "?ctrt_no="+frmObj.s_ctrt_no.value+"&ctrt_nm="+frmObj.s_ctrt_nm.value+"&ctrt_use_flg=A";
    	   
    	   callBackFunc = "clbck_CTRT_POPLIST";
    	   modal_center_open('./ContractRoutePopup.clt', new Array(), 900, 580,"yes");
    	   break;
       case "CTRT_POPLIST_NAME":
    	   var params = "?ctrt_no="+frmObj.s_ctrt_no.value+"&ctrt_nm="+frmObj.s_ctrt_nm.value+"&ctrt_use_flg=A";
    	   
    	   callBackFunc = "clbck_CTRT_POPLIST";
    	   modal_center_open('./ContractRoutePopup.clt' + params  , new Array(), 900, 580,"yes");
    	   break; 
    	   
       case "SL_OFC_POPLIST":
    	   
    	   rtnary=new Array(2);
    		rtnary[0]="1";
    		sUrl="./CMM_POP_0150.clt?";
    		
    		callBackFunc = "clbck_SL_OFC_POPLIST";
    		modal_center_open(sUrl, rtnary, 556,600,"yes");
    		
//    	   var params = "?ofc_cd="+frmObj.d_ofc_cd.value;
//
//			callBackFunc = "clbck_SL_OFC_POPLIST";
//			modal_center_open('./CMM_POP_0050.clt' + params  , new Array(), 556,634 ,"yes");
   	    break;
       case "SL_PIC_POPLIST":
    	   var formObj=document.frm1;
    		rtnary=new Array(2);
//    		rtnary[0]= frmObj.d_pic_cd.value;
    		rtnary[0]= "";
    		rtnary[1]= "";
    	   var params = "?pic_cd="+frmObj.d_pic_cd.value;

			callBackFunc = "clbck_SL_PIC_POPLIST";
			modal_center_open('./CMM_POP_0060.clt' + params  , new Array(), 900, 430 ,"yes");
   	    break;
       case "SL_PIC_POPLIST_BY_NM":
    	   var formObj=document.frm1;
    	   rtnary=new Array(2);
    	   rtnary[0]= "";
    	   rtnary[1]= formObj.d_pic_nm.value;
    	   
    	   callBackFunc = "clbck_SL_PIC_POPLIST";
    	   modal_center_open('./CMM_POP_0060.clt', new Array(), 900, 430 ,"yes");
    	   break;
       case "CUST_POPLIST":
    	   var formObj=document.frm1;
    	   //var params = "?cust_cd="+frmObj.d_cus_cd.value;
//    	   var nameObj = formObj.d_cus_nm.value;
    	   var nameObj = "";
    	    rtnary=new Array(2);
    		rtnary[0]="1";
    		if(typeof(nameObj)!='undefined'){
    			rtnary[1]= nameObj;
    		}else{
    			rtnary[1]="";
    		}
    		rtnary[2]=window;
    		
			callBackFunc = "clbck_CUST_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");
   	    break;
       case "CUST_POPLIST_BY_NM":
    	   var formObj=document.frm1;
    	   //var params = "?cust_cd="+frmObj.d_cus_cd.value;
    	   var nameObj = formObj.d_cus_nm.value;
    	    rtnary=new Array(2);
    		rtnary[0]="1";
    		if(typeof(nameObj)!='undefined'){
    			rtnary[1]= nameObj;
    		}else{
    			rtnary[1]="";
    		}
    		rtnary[2]=window;
    		
			callBackFunc = "clbck_CUST_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");
   	    break;
    }
}

function clbck_CTRT_POPLIST(rtnVal){
	
	var frmObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		frmObj.s_ctrt_no.value = rtnValAry[0];
		frmObj.s_ctrt_nm.value = rtnValAry[1];
	}
}

function clbck_SL_OFC_POPLIST(rtnVal){
	
	var frmObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		frmObj.d_ofc_cd.value = rtnValAry[0];
		frmObj.d_ofc_nm.value = rtnValAry[1];
	}
}

function clbck_SL_PIC_POPLIST(rtnVal){
	
	var frmObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		frmObj.d_pic_cd.value = rtnValAry[0];
		frmObj.d_pic_nm.value = rtnValAry[1];
	}
}

function clbck_D_CUST_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		
		frmObj.d_cus_cd.value = rtnValAry[0];
		frmObj.d_cus_nm.value = rtnValAry[2];
	}
}
function clbck_S_CUST_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		
		frmObj.s_cus_cd.value = rtnValAry[0];
		frmObj.s_cus_nm.value = rtnValAry[2];
	}
}

function clbck_Sheet2_CUST_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		sheet2.SetCellValue(tempRow,"cust_cd",rtnValAry[0],0);
		sheet2.SetCellValue(tempRow,"cust_nm",rtnValAry[2],0);
	}
}

function clbck_Sheet2_LOC_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		sheet2.SetCellValue(tempRow,"loc_cd",rtnValAry[0],0);
		sheet2.SetCellValue(tempRow,"loc_nm",rtnValAry[1],0);
		sheet2.SetCellValue(tempRow,"loc_addr",rtnValAry[2],0);
	}
}

function clbck_Sheet2_OFC_POPLIST(rtnVal){
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		
		var frmObj=document.frm1;
		
		var rtnValAry=rtnVal.split("|");
		
		sheet2.SetCellValue(tempRow,"ofc_cd",rtnValAry[0],0);
	}
}


function doDisplay(doWhat, frmObj, obj1, obj2){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(obj1, 'MM-dd-yyyy');
        break;
        case 'DATE11':   //달력 조회 팝업 호출      
            var cal=new ComCalendarFromTo();
            cal.displayType = "date";
            cal.select(obj1,obj2, 'MM-dd-yyyy');
        break;        
       
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
	//#1199 [Contract] Cannot auto suggestion when name inputted
	fnSetAutocompleteCallBack('d_cus_nm', 'clbck_D_CUST_POPLIST', 'LINER_POPLIST'); //Customer	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var frmObj = document.frm1;
    
    // Currency Default 설정(User Office Currency)
    if (ComIsNull(frmObj.sel_curr_cd.value)) {
    	frmObj.sel_curr_cd.value = trf_cur_cd;
    }
    
    if(frmObj.f_ctrt_no.value != ""){
    	frmObj.s_ctrt_no.value = frmObj.f_ctrt_no.value;
    	searchTlCtrtInfo(frmObj.s_ctrt_no, frmObj.s_ctrt_nm);
    	doSearchContract();
    }
    Disble_field(true);
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function Disble_field(temp) {
	var frmObj = document.frm1;
    frmObj.d_ctrt_nm.disabled = temp;
    frmObj.d_ctrt_cd.disabled = temp;
    frmObj.frm_dt.disabled = temp;
    frmObj.to_dt.disabled = temp;
    frmObj.d_ofc_cd.disabled = temp;
    frmObj.d_pic_cd.disabled = temp;
    frmObj.d_cus_cd.disabled = temp;
    frmObj.pod_ofc_cd.disabled = temp;
    frmObj.pod_d_pic_cd.disabled = temp;
    frmObj.pod_d_cus_cd.disabled = temp;
    frmObj.btn_date.disabled = temp;
	
}
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetObj.id) {
    case "sheet1":      //IBSheet1 init
        with (sheetObj) {
    	 
         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );
         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
         var headers = [ { Text:getLabel('CTRTMGMT_HDR'), Align:"Center"},
                         { Text:getLabel('CTRTMGMT_HDR_1'), Align:"Center"} ];
         
         InitHeaders(headers, info);
         
         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"ctrt_cd",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"ctrt_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:0, Width:80,  Align:"Left",    ColMerge:0,   SaveName:"cust_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:80 },
             {Type:"Text",      Hidden:0, Width:240,   Align:"Left",  ColMerge:0,   SaveName:"cust",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
             {Type:"Text",      Hidden:0, Width:150,   Align:"Left",  ColMerge:0,   SaveName:"prd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
             {Type:"Text",      Hidden:1,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"sl_ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1    },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"sl_ofc_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"sl_pic_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"sl_pic_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"sl_cust_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"sl_cust_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"eff_fr_dt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"eff_to_dt",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 },
             {Type:"Text",      Hidden:1, Width:150,   Align:"Left",  ColMerge:0,   SaveName:"del_yn"},
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cal_method_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"incl_ib_dt_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"incl_ob_dt_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"unit_price",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:7,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cyc_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"unit",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"vol_unit",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"lot4_alias",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"lot5_alias",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
             //#6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록
             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"ovr_aloc_yn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
            ];
         InitColumns(cols);
         SetEditable(0);
         //#6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록
         SetSheetHeight(350);
         
       }                                                      
       break;
       
     case "sheet2":      //IBSheet1 init
         with (sheetObj) {
    	 
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('CTRTMGMT_HDR2_1'), Align:"Center"},
	                  { Text:getLabel('CTRTMGMT_HDR2_2'), Align:"Center"} ];
	      
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	                   {Type:"DelCheck",    Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"del" },
	             {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
	            // change style of code and name to combobox
	             {Type:"Combo", 	Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"loc_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	             {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"loc_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:250 },
	             {Type:"Text",      Hidden:0, Width:190,  Align:"Left",    ColMerge:1,   SaveName:"loc_addr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:250 },
	             {Type:"Int",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"loc_freedays",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",    ColMerge:1,   SaveName:"ofc_cd",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"priv_flg",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",    ColMerge:1,   SaveName:"cust_cd",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
	             {Type:"Text",      Hidden:0, Width:260,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Image",     Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"contact",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ctrt_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"wh_daily_cls_flg", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
	             {Type:"Date",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"wh_daily_cls_hm",  KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
		      InitColumns(cols);
		      SetSheetHeight(300);
		      SetEditable(1);
		      SetImageList(0,"web/images/common/btn_s_add.gif");
		      SetColProperty("priv_flg", {ComboText:"Y|N", ComboCode:"Y|N"} );
			  SetColProperty("use_flg", {ComboText:"Y|N", ComboCode:"Y|N"} );
			  SetColProperty("wh_daily_cls_flg", {ComboText:"Y|N", ComboCode:"Y|N"} );
			  //set warehouse
			  SetColProperty("loc_cd", {ComboText:whCd_Nm, ComboCode:whCd} );
			  SetColProperty("loc_nm", {ComboText:whNm, ComboCode:whCd} );
			  
			  SetColProperty(0 , "ofc_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});		
			  SetColProperty(0 , "loc_cd", {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});	
			  sheetObj.SetFocusAfterProcess(0);
	      }
	      break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	LoadPeriod();
	doHideProcess();

	if(sheet1.RowCount() > 0){
		LoadDetails(sheet1.GetSelectRow());
		doSearchWhInfo(sheet1.GetCellValue(sheet1.GetSelectRow(),"ctrt_cd"));
	}

	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
	dataOld = FormQueryString(document.frm1);
	if(sheet1.GetCellValue(sheet1.GetSelectRow(), "ctrt_cd") != "-1"){
		sheet1_OnClick(sheet1, sheet1.GetSelectRow(), 1);
	}
} 

function goToPage(callPage){
	 docObjects[0].RemoveAll();
	 document.frm1.f_CurPage.value=callPage; 
	 doWork('SEARCH');
	} 

function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCH');
}
function sheet2_OnSearchEnd(){
//	dataOld = sheet1.GetSaveString()+"&"+sheet2.GetSaveString()+"&"+FormQueryString(document.frm1);
	dataOld = FormQueryString(document.frm1);
	doHideProcess();
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	
}

function sheet1_OnClick(sheetObj, row, col){
	
	var newRowIndx = getNewRowIndex();
	
	if(newRowIndx != -1 && newRowIndx != row){
		if(!ComShowCodeConfirm('COM132604')){
			sheet1.SetSelectRow(newRowIndx);
			return;
		}else{
			sheet1.RowDelete(newRowIndx);
			sheet1.SetSelectRow(row);
		}
	}
	Disble_field(false);
	if(sheet1.GetCellValue(row,"ibflag") != "I"){
		LoadDetails(row);
		doSearchWhInfo(sheet1.GetCellValue(row,"ctrt_cd"));
	}
}

function sheet2_OnPopupClick(sheetObj, row, col){
	var frmObj=document.frm1;
	tempRow = row;
	var colStr=sheetObj.ColSaveName(col);
	
	if(colStr == "ofc_cd"){
		
		rtnary=new Array(2);
	   		rtnary[0]="1";
	   		sUrl="./CMM_POP_0150.clt?";
			
			callBackFunc = "clbck_Sheet2_OFC_POPLIST";
			modal_center_open(sUrl, rtnary, 556,600,"yes");
		
//		var params = "?ofc_cd="+sheet2.GetCellValue(row,"ofc_cd");
//
//		callBackFunc = "clbck_Sheet2_OFC_POPLIST";
//		modal_center_open('./CMM_POP_0050.clt' + params  , new Array(), 556,634 ,"yes");
		
	}else if(colStr == "cust_cd"){    
		 var formObj=document.frm1;
  	   //var params = "?cust_cd="+frmObj.d_cus_cd.value;
  	   var nameObj = sheet2.GetCellValue(row, col + 1);
  	    rtnary=new Array(2);
  		rtnary[0]="1";
  		if(typeof(nameObj)!='undefined'){
  			rtnary[1]= nameObj;
  		}else{
  			rtnary[1]="";
  		}
  		rtnary[2]=window;
//    	var params = "?cust_cd="+sheet2.GetCellValue(row,"cust_cd");
//    				+"&ctrt_no=" + frmObj.d_ctrt_cd.value
//    				+"&ctrt_nm=" + frmObj.d_ctrt_nm.value;
		
		callBackFunc = "clbck_Sheet2_CUST_POPLIST";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");
	}
}

function sheet2_OnAfterEdit(sheetObj, row, col){
	
}

function sheet2_OnChange(sheetObj, row, col){
	var colId = sheetObj.ColSaveName(col);
	if(colId == "loc_cd"){
		
		var whCd = sheetObj.GetCellValue(row, "loc_cd");
		
		sheetObj.SetCellValue(row, "loc_nm",whCd,0);
		//set Addrr
		ajaxSendPost(setAddrrWH, 'reqVal', '&goWhere=aj&bcKey=getWhAddrr&s_code='+whCd, './GateServlet.gsl');
		// set OFC & PRV
		sheet2_SearchLocName(row);
	}else if(colId == "ofc_cd"){
		sheet2_SearchOfcName(row);
	}else  if(colId == "cust_cd"){
		sheet2_SearchCustName(row);
	}
	
	var colStr =sheetObj.ColSaveName(col);
	checkBoxOnOff(sheetObj, colStr);
	
}
function checkBoxOnOff(sheetObj, colName){
	if (sheetObj.RowCount() > 0){
		var findcheck = sheetObj.FindCheckedRow(colName,1);
		if (findcheck == "" || findcheck == null || findcheck == -1)
			sheetObj.SetHeaderCheck(0, colName, 0);
		else{
			var checksize = sheetObj.FindCheckedRow(colName,1).split("|").length;
			if (checksize == sheetObj.RowCount())
				sheetObj.SetHeaderCheck(0, colName, 1);
			else sheetObj.SetHeaderCheck(0, colName, 0);
		}
	}else sheetObj.SetHeaderCheck(0,colName, 0);
}

function setAddrrWH(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var row = sheet2.GetSelectRow();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "" && rtnArr[0] != "null"){
				sheet2.SetCellValue(row,"loc_addr",rtnArr[0],0);
			}
			else{
				sheet2.SetCellValue(row,"loc_addr","",0);
			}
		}
		else{
			sheet2.SetCellValue(row,"loc_addr","",0);
		}
	}
}


function doSearchContract(){
	doShowProcess();
	setTimeout(function(){
		
		var frmObj = document.frm1;
		
		var use_yn;
		var valid_yn;
		var curTime;
		
		for(var i = 0; i < frmObj.radYN.length; i++){
			if(frmObj.radYN[i].checked == true){
				if(i == 0){
					use_yn = "N";
				}else if(i == 1){
					use_yn = "Y";
				}else{
					use_yn = "";
				}
			}
		}
		
		for(var i = 0; i < frmObj.valid_YN.length; i++){
			if(frmObj.valid_YN[i].checked == true){
				if(i == 0){
					valid_yn = "Y";
				}else if(i == 1){
					valid_yn = "N";
				}else{
					valid_yn = "";
				}
			}
		}
		
		
		curTime =getCurTime();
		
		var params = "?f_cmd="+SEARCH
					+"&s_ctrt_no="+frmObj.s_ctrt_no.value
					+"&s_cus_cd="+frmObj.s_cus_cd.value
					+"&s_ctrt_nm="+frmObj.s_ctrt_nm.value
					+"&use_yn="+use_yn
					+"&valid_yn="+valid_yn
					+"&curTime="+curTime
					+"&f_CurPage="+frmObj.f_CurPage.value
					+"&f_Paging="+frmObj.f_Paging.value;
		
		//ZOOT::TODO-저장시 저장 data 제일 상단위치 시켜 수정 정보 Refresh
		oldSearchParams = params;
		
		var xml = sheet1.GetSearchData("./CtrtMgmtGS.clt" + params);
		
		sheet1.LoadSearchData(xml);
		
	},100);
}

//ZOOT::TODO-저장시 저장 data 제일 상단위치 시켜 수정 정보 Refresh
function doSaveSearchContract(arg){
	doShowProcess();
	setTimeout(function(){
		
		var frmObj = document.frm1;
		var params = oldSearchParams + "&saveCtrt_cd="+arg;
		var xml = sheet1.GetSearchData("./CtrtMgmtGS.clt" + params);
		
		sheet1.LoadSearchData(xml);
		
	},100);
}

function doSearchWhInfo(ctrt_no){
	doShowProcess();
	setTimeout(function(){
		
		var params = "?f_cmd="+SEARCH01
					+"&ctrt_no="+ctrt_no;
					/*+"&last_ver="+"LAST";*/ //TinLuong Comment: not use table : TL_CTRT_WH_LOC_VER
		
		var xml = sheet1.GetSearchData("./CtrtMgmt_01GS.clt" + params);
		doHideProcess();
		sheet2.LoadSearchData(xml);
		
	},100);
	sheet2_OnSearchEnd();
}

function doSave(){
//	var dataNew = sheet1.GetSaveString()+"&"+sheet2.GetSaveString()+"&"+FormQueryString(document.frm1);
	
//	if(dataNew ==  dataOld){
//		ComShowCodeMessage("COM0409");
//		return;
//	}
	
	var dataNew = FormQueryString(document.frm1);
	
	if (sheet1.RowCount('D') + sheet1.RowCount('U') + sheet1.RowCount('I') > 0 ||
		sheet2.RowCount('D') + sheet2.RowCount('U') + sheet2.RowCount('I') > 0 ||
		dataNew != dataOld) {

	} else {
		ComShowCodeMessage("COM0409");
		return;
	}
	
	if(sheet1.RowCount() <= 0){
		ComShowCodeMessage('COM132609');
		return;
	}
	
	if(!checkMandatory()){
		ComShowCodeMessage('COM12239');
		return;
	}
	
	if (!checkEffectiveDateInPut()){
		return;
	}
	
	if(!sheet2CheckKeyField()){
		return;
	}
	
	var frmObj = document.frm1;
//	if (!save_Detail_Check()){
//		ComShowCodeMessage("COM0409");
//	}
	
	if(ComShowCodeConfirm("COM130101")){
		
		var params = getSaveParams();
		
		var temp_ctrt_no = frmObj.d_ctrt_cd.value;
		var temp_ctrt_nm = frmObj.d_ctrt_nm.value;
		
		var xml = sheet1.GetSearchData("./CtrtMgmt_02GS.clt",params);
		
		if(xml.replace(/^\s+|\s+$/gm,'') != ""){
			
			var xmlDoc = $.parseXML(xml);
			 var $xml1 = $(xmlDoc);
 
			 var res = $xml1.find("result").text();
			 
			 if(res == "1"){
//				 ComShowCodeMessage("COM132601");
				 // Change message: Saved - Deleted - Cancel - Confirmed - Updated successfully => showCompleteProcess();
				 showCompleteProcess();
				 
				 //ZOOT::TODO-저장시 저장 data 제일 상단위치 시켜 수정 정보 Refresh
				 //doSaveSearchContract(temp_ctrt_no);
				 frmObj.radYN[1].checked = true;
				 frmObj.s_ctrt_no.value = temp_ctrt_no;
				 frmObj.s_ctrt_nm.value = temp_ctrt_nm;

				 ClearDetails();
				 doSearchContract();
				 return;
			 }
		}
		
		ComShowCodeMessage("COM12151");
	}
}

function save_Detail_Check(){
//	if( comboObjects[2].GetSelectCode()!= "AA" && comboObjects[2].GetSelectCode()!= "SA" && comboObjects[2].GetSelectCode()!= "DA" && comboObjects[2].GetSelectCode()!= "TA" && comboObjects[2].GetSelectCode()!= "WA" && comboObjects[2].GetSelectCode()!= "A" && comboObjects[2].GetSelectCode()!= "" ){
		var sell_detail_cnt = sheet1.RowCount("I")+sheet1.RowCount("U") ;
		var sell_detail_cnt2 = ComGetSaveString(sheet2);
		if ( sell_detail_cnt > 0 || sell_detail_cnt2 != "" ){
			return true;
		}
//	}
	return false;
}

function getSaveParams(){
	
	var frmObj = document.frm1;
	
	frmObj.f_cmd.value = MODIFY;
	
	var modiFlag = "";
	
	if(getNewRowIndex() != -1){
		modiFlag = "I";
	}else{
		modiFlag = "U";
	}
	
	if (frmObj.incl_ib_dt_flg.checked) {
		frmObj.incl_ib_dt_flg.value = "Y";
	} else {
		frmObj.incl_ib_dt_flg.value = "N";
	}
	
	if (frmObj.incl_ob_dt_flg.checked) {
		frmObj.incl_ob_dt_flg.value = "Y";
	} else {
		frmObj.incl_ob_dt_flg.value = "N";
	}
	
	var params = "modi_flag=" + modiFlag
				+"&" + FormQueryString(document.frm1)
				+"&" + sheet2.GetSaveString();
	
	return params;
}

function checkKeyField(){
	for(var i = sheet1.HeaderRows(); i <= sheet1.RowCount(); i++){
		if(sheet1.GetCellValue(i,"trk_cd") == ""){
			ComShowCodeMessage("COM0278","Code");
			
			sheet1.SelectCell(i,"trk_cd",1);
			
			return false;
		}
	}
	
	return true;
}

function LoadPeriod(){
	
	var headerRows = sheet1.HeaderRows();
	var rowCount = sheet1.RowCount();
	
	for(var i = headerRows ; i < rowCount + headerRows; i++){
		if(sheet1.GetCellValue(i,"eff_fr_dt") != "" && sheet1.GetCellValue(i,"eff_to_dt") != ""){
			sheet1.SetCellValue(i,"prd",sheet1.GetCellValue(i,"eff_fr_dt") + "~" + sheet1.GetCellValue(i,"eff_to_dt"));
		}
		
		sheet1.SetCellValue(i,"ibflag","R");
	}
}


function LoadDetails(selectedRow){
	
	var frmObj = document.frm1;
	if(sheet1.GetCellValue(selectedRow,"ibflag") == "I"){
		frmObj.d_ctrt_cd.disabled = false;
	}else{
		frmObj.d_ctrt_cd.disabled = true;
	}
	
	frmObj.d_ctrt_cd.value 		= sheet1.GetCellValue(selectedRow,"ctrt_cd");
	frmObj.d_ctrt_nm.value 		= sheet1.GetCellValue(selectedRow,"ctrt_nm");
	frmObj.frm_dt.value 		= sheet1.GetCellValue(selectedRow,"eff_fr_dt");
	frmObj.to_dt.value 			= sheet1.GetCellValue(selectedRow,"eff_to_dt");
	frmObj.d_ofc_cd.value 		= sheet1.GetCellValue(selectedRow,"sl_ofc_cd");
	frmObj.d_ofc_nm.value 		= sheet1.GetCellValue(selectedRow,"sl_ofc_nm");
	frmObj.d_pic_cd.value		= sheet1.GetCellValue(selectedRow,"sl_pic_cd");
	frmObj.d_pic_nm.value 		= sheet1.GetCellValue(selectedRow,"sl_pic_nm");
	frmObj.d_cus_cd.value 		= sheet1.GetCellValue(selectedRow,"sl_cust_cd");
	frmObj.d_cus_nm.value 		= sheet1.GetCellValue(selectedRow,"sl_cust_nm");
	frmObj.cbxDel_Flg.value 	= sheet1.GetCellValue(selectedRow,"del_yn");
//	frmObj.unit.value 			= sheet1.GetCellValue(selectedRow,"unit");
	
	//#6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도
	frmObj.ovr_aloc_yn.value 	= sheet1.GetCellValue(selectedRow,"ovr_aloc_yn");
	
	// WMS 고도화
	if (!ComIsNull(sheet1.GetCellValue(selectedRow,"incl_ib_dt_flg"))) {
		frmObj.incl_ib_dt_flg.checked= true;
	} else {
		frmObj.incl_ib_dt_flg.checked= false;
	}
	if (!ComIsNull(sheet1.GetCellValue(selectedRow,"incl_ob_dt_flg"))) {
		frmObj.incl_ob_dt_flg.checked= true;
	} else {
		frmObj.incl_ob_dt_flg.checked= false;
	}
	frmObj.incl_ib_dt_flg.value = sheet1.GetCellValue(selectedRow,"incl_ib_dt_flg");
	frmObj.incl_ob_dt_flg.value = sheet1.GetCellValue(selectedRow,"incl_ob_dt_flg");
	
	frmObj.sel_curr_cd.value = sheet1.GetCellValue(selectedRow,"curr_cd");
	frmObj.i_rate.value = Number(sheet1.GetCellValue(selectedRow,"unit_price")).toFixed(2);

	frmObj.i_rate.value = Number(sheet1.GetCellValue(selectedRow,"unit_price")).toFixed(2);
	frmObj.sel_cycle.value = sheet1.GetCellValue(selectedRow,"cyc_cd");

	//#2511 [WMS4.0]Storage closing without each item's rate data
	frmObj.i_rate_per_vol.value = Number(sheet1.GetCellValue(selectedRow,"unit_price")).toFixed(7);
	frmObj.sel_vol_unit.value = sheet1.GetCellValue(selectedRow,"vol_unit");

	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
	frmObj.lot4_alias.value = sheet1.GetCellValue(selectedRow,"lot4_alias");
	frmObj.lot5_alias.value = sheet1.GetCellValue(selectedRow,"lot5_alias");
	
	// Calculation Method가 존재하지 않는 경우, Ending Balance(EDB) Set
	// Include Inbound Date 체크박스와  Include Outbound Date 체크박스 비활성 
	if (ComIsNull(sheet1.GetCellValue(selectedRow,"cal_method_cd"))) {
		frmObj.incl_ib_dt_flg.disabled = true;
		frmObj.incl_ob_dt_flg.disabled = true;
		
		frmObj.cal_method_cd.value = "EDB";
	} else {
		if (sheet1.GetCellValue(selectedRow,"cal_method_cd") == "DAY") {
			frmObj.incl_ib_dt_flg.disabled = false;
			frmObj.incl_ob_dt_flg.disabled = false;
		} else {
			frmObj.incl_ib_dt_flg.disabled = true;
			frmObj.incl_ob_dt_flg.disabled = true;
		}
		frmObj.cal_method_cd.value = sheet1.GetCellValue(selectedRow,"cal_method_cd");
	}
	
	onchangeCalMethod(frmObj.cal_method_cd);

}

function checkDataChange(){
	if(
			frmObj.d_ctrt_cd.value 		!= sheet1.GetCellValue(selectedRow,"ctrt_cd")
		|| 	frmObj.d_ctrt_nm.value 		!= sheet1.GetCellValue(selectedRow,"ctrt_nm")
		||	frmObj.frm_dt.value 		!= sheet1.GetCellValue(selectedRow,"eff_fr_dt")
		||	frmObj.to_dt.value 			!= sheet1.GetCellValue(selectedRow,"eff_to_dt")
		||	frmObj.d_ofc_cd.value 		!= sheet1.GetCellValue(selectedRow,"sl_ofc_cd")
		||	frmObj.d_ofc_nm.value 		!= sheet1.GetCellValue(selectedRow,"sl_ofc_nm")
		||	frmObj.d_pic_cd.value		!= sheet1.GetCellValue(selectedRow,"sl_pic_cd")
		||	frmObj.d_pic_nm.value 		!= sheet1.GetCellValue(selectedRow,"sl_pic_nm")
		||	frmObj.d_cus_cd.value 		!= sheet1.GetCellValue(selectedRow,"sl_cust_cd")
		||	frmObj.d_cus_nm.value 		!= sheet1.GetCellValue(selectedRow,"sl_cust_nm")
		||	frmObj.cbxDel_Flg.value 	!= sheet1.GetCellValue(selectedRow,"del_yn")
	){
		return true;
	}
	
	for(var i = sheet2.HeaderRows(); i < sheet2.HeaderRows() + sheet2.RowCoutn(); i++){
		if(sheet2.GetCellValue(i,"ibflag") != "R"){
			return true;
		}
	}
	
	return false;
} 

function searchTlCtrtInfo(objCd, objNm){
	
	codeField = objCd;
	nameField = objNm;
	
	if(objCd.value.trim() == ""){
		objCd.value = "";
		objNm.value = "";
		
		return;
	}

	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+objCd.value, './GateServlet.gsl');
}
function setTlCtrtInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				nameField.value=rtnArr[0];
			}
			else{
				codeField.value="";
				nameField.value="";	
			}
		}
		else{
			codeField.value="";
			nameField.value="";	
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function searchTlCustInfo (objCd, objNm){
	
	codeField = objCd;
	nameField = objNm;
	
	if(objCd.value.trim() == ""){
		objCd.value = "";
		objNm.value = "";
		
		return;
	}
	
//	ajaxSendPost(setTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+objCd.value, './GateServlet.gsl');
	ajaxSendPost(setTlCustInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlTradePartner&cust_cd='+objCd.value, './GateServlet.gsl');
}

function setTlCustInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				nameField.value=rtnArr[1];
			}
			else{
				codeField.value="";
				nameField.value="";	
			}
		}
		else{
			codeField.value="";
			nameField.value="";	
		}
	}
	else{
		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function searchSalesPIC (objCd, objNm){
	
	codeField = objCd;
	nameField = objNm;
	
	if(objCd.value.trim() == ""){
		objCd.value = "";
		objNm.value = "";
		
		return;
	}
	
	ajaxSendPost(setSalesPIC, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&s_code='+objCd.value+"&codeType=user", './GateServlet.gsl');
}

function setSalesPIC(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@^');
			if(rtnArr[0] != ""){
				nameField.value=rtnArr[3];
			}
			else{
				codeField.value="";
				nameField.value="";	
			}
		}
		else{
			codeField.value="";
			nameField.value="";	
		}
	}
	else{
//		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function searchORGName (objCd, objNm){
	
	codeField = objCd;
	nameField = objNm;
	
	if(objCd.value.trim() == ""){
		objCd.value = "";
		objNm.value = "";
		
		return;
	}
	
//	if(!ComIsNull(Value)){
			ajaxSendPost(setORGName, 'reqVal', '&goWhere=aj&bcKey=searchTlOfcInfo&office_cd='+objCd.value, './GateServlet.gsl');
//	}
	
//	ajaxSendPost(setORGName, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&office_cd='+objCd.value, './GateServlet.gsl');
}

function setORGName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				nameField.value=rtnArr[0];
			}
			else{
				codeField.value="";
				nameField.value="";	
			}
		}
		else{
			codeField.value="";
			nameField.value="";	
		}
	}
	else{
//		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function sheet2_SearchLocName (row){
	
	tempRow = row;
	
	var loc_cd = sheet2.GetCellValue(row,"loc_cd");
	
	if(loc_cd.trim() == ""){
		sheet2.SetCellValue(row,"loc_cd","",0);
		sheet2.SetCellValue(row,"loc_nm","",0);
		sheet2.SetCellValue(row,"loc_addr","",0);
//		sheet2.SetCellValue(tempRow,"priv_flg","",0);
		// Khanh 2015-08-14
//		sheet2.SetCellValue(tempRow,"ofc_cd","",0);
		// Khanh End
		sheet2.SetCellValue(tempRow,"cust_cd","");
		return;
	}
	
	ajaxSendPost(sheet2_SetLocName, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+loc_cd, './GateServlet.gsl');
}

function sheet2_SetLocName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				/*sheet2.SetCellValue(tempRow,"loc_nm",rtnArr[0],0);
				sheet2.SetCellValue(tempRow,"loc_cd",rtnArr[1],0);
				sheet2.SetCellValue(tempRow,"loc_addr",rtnArr[2],0);*/
				
//				sheet2.SetCellValue(tempRow,"priv_flg",rtnArr[3],0);
				// Khanh 2015-08-14
//				sheet2.SetCellValue(tempRow,"ofc_cd",rtnArr[4],0);
				// Khanh End
				sheet2.SetCellValue(tempRow,"cust_cd",rtnArr[5]);
			}
			else{
				/*sheet2.SetCellValue(tempRow,"loc_cd","",0);
				sheet2.SetCellValue(tempRow,"loc_nm","",0);
				sheet2.SetCellValue(tempRow,"loc_addr","",0);*/
				
//				sheet2.SetCellValue(tempRow,"priv_flg","",0);
				// Khanh 2015-08-14
//				sheet2.SetCellValue(tempRow,"ofc_cd","",0);
				// Khanh End
				sheet2.SetCellValue(tempRow,"cust_cd","");
			}
		}
		else{
			/*sheet2.SetCellValue(tempRow,"loc_cd","",0);
			sheet2.SetCellValue(tempRow,"loc_nm","",0);
			sheet2.SetCellValue(tempRow,"loc_addr","",0);*/
			
//			sheet2.SetCellValue(tempRow,"priv_flg","",0);
			sheet2.SetCellValue(tempRow,"ofc_cd","",0);
			sheet2.SetCellValue(tempRow,"cust_cd","");
		}
	}
	else{
//		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function sheet2_SearchCustName (row){
	
	tempRow = row;
	
	var cust_cd = sheet2.GetCellValue(row,"cust_cd");
	
	if(cust_cd.trim() == ""){
		sheet2.SetCellValue(tempRow,"cust_cd","",0);
		sheet2.SetCellValue(tempRow,"cust_nm","",0);
		
		return;
	}
	
	ajaxSendPost(sheet2_SetCustName, 'reqVal', '&goWhere=aj&bcKey=searchTlTradePartner&cust_cd='+cust_cd, './GateServlet.gsl');
	
//	ajaxSendPost(sheet2_SetCustName, 'reqVal', '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+cust_cd, './GateServlet.gsl');
}

function sheet2_SetCustName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet2.SetCellValue(tempRow,"cust_nm",rtnArr[1],0);
			}
			else{
				sheet2.SetCellValue(tempRow,"cust_cd","",0);
				sheet2.SetCellValue(tempRow,"cust_nm","",0);
			}
		}
		else{
			sheet2.SetCellValue(tempRow,"cust_cd","",0);
			sheet2.SetCellValue(tempRow,"cust_nm","",0);
		}
	}
	else{
//		alert(getLabel('SEE_BMD_MSG43'));
	}
}

function sheet2_SearchOfcName (row){
	
	tempRow = row;
	
	var ofc_cd = sheet2.GetCellValue(row,"ofc_cd");
	
	if(ofc_cd.trim() == ""){
		sheet2.SetCellValue(tempRow,"ofc_cd","",0);
		
		return;
	}
	
	ajaxSendPost(sheet2_SetOfcName, 'reqVal', '&goWhere=aj&bcKey=searchTlOfcInfo&office_cd='+sheet2.GetCellValue(row,"ofc_cd"), './GateServlet.gsl');
//	ajaxSendPost(sheet2_SetOfcName, 'reqVal', '&goWhere=aj&bcKey=searchTlOrgInfo&office_cd='+sheet2.GetCellValue(row,"ofc_cd"), './GateServlet.gsl');
}

function sheet2_SetOfcName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheet2.SetCellValue(tempRow,"ofc_cd",rtnArr[1],0);
			}
			else{
				sheet2.SetCellValue(tempRow,"ofc_cd","",0);
			}
		}
		else{
			sheet2.SetCellValue(tempRow,"ofc_cd","",0);
		}
	}
	else{
//		alert(getLabel('SEE_BMD_MSG43'));
	}
}
function ClearDetails(){
	
	sheet1.RemoveAll();
	sheet2.RemoveAll();
	
	ClearBasicInfo();
}

function ClearBasicInfo(){
	
	var frmObj = document.frm1;
	
	frmObj.d_ctrt_nm.value = "";
	frmObj.d_ctrt_cd.value = "";
	frmObj.frm_dt.value = "";
	frmObj.to_dt.value = "";
	frmObj.d_ofc_cd.value = "";
	frmObj.d_ofc_nm.value = "";
	frmObj.d_pic_cd.value = "";
	frmObj.d_pic_nm.value = "";
	frmObj.d_cus_cd.value = "";
	frmObj.d_cus_nm.value = "";
	frmObj.cbxDel_Flg.value = "N";
	
	frmObj.cal_method_cd.value = "DAY";
	frmObj.sel_curr_cd.value = trf_cur_cd;
	frmObj.i_rate.value = "";
	frmObj.sel_cycle.value = "";

	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
	frmObj.lot4_alias.value = "";
	frmObj.lot5_alias.value = "";
	
	//#6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록
	frmObj.ovr_aloc_yn.value = "N";
	
	onchangeCalMethod(frmObj.cal_method_cd);
}

function doNew(){
	var currLocUrl=this.location.href;
	var hasPlNo = currLocUrl.indexOf("ctrt_no");
	if(hasPlNo > 0){
		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	
		//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
		window.location.href = currLocUrl;
	}else{
		var frmObj = document.frm1;
		
		frmObj.s_ctrt_nm.value = "";
		frmObj.s_ctrt_no.value = "";
		frmObj.s_cus_cd.value = "";
		frmObj.s_cus_nm.value = "";
		frmObj.N.checked = true;
		frmObj.valid_Y.checked = true;
		
		ClearBasicInfo();
		sheet2.RemoveAll();
		
		Disble_field(false);
		// If have new row already then focus to the new row
		
		var newRowIdx = getNewRowIndex();
		
		if(newRowIdx != -1){
			sheet1.SetSelectRow(newRowIndx);
			return;
		}
		
		//if there is no new row then insert new row
		var newRow = sheet1.HeaderRows() + sheet1.RowCount();
		sheet1.DataInsert(newRow);
		sheet1.SetCellValue(newRow,"del_yn","N",0);

	}
}

function getNewRowIndex(){
	
	for(var i = sheet1.HeaderRows(); i < sheet1.HeaderRows() + sheet1.RowCount(); i++){
		if(sheet1.GetCellValue(i,"ibflag") == "I"){
			
			return i ;
		}
	}
	
	return -1;
}

function sheet2CheckKeyField(){
	
	var headerRows = sheet2.HeaderRows();
	var rowCount = sheet2.RowCount();
	
	for(var i = headerRows; i< headerRows + rowCount; i++){
		if(sheet2.GetCellValue(i,"loc_cd") == ""){
			ComShowCodeMessage("COM0278","Key Field");
			sheet2.SelectCell(i,"loc_cd");
			return false;
			
		}else if(sheet2.GetCellValue(i,"ofc_cd") == ""){
				ComShowCodeMessage("COM0278","Key Field");
				sheet2.SelectCell(i,"ofc_cd");
				return false;
				
		}else if(sheet2.GetCellValue(i,"cust_cd") == ""){
			ComShowCodeMessage("COM0278","Key Field");
			sheet2.SelectCell(i,"cust_cd");
			return false;
		}
	}
	
	return true;
}

function checkMandatory(){
	
	var frmObj = document.frm1;
	//LKH 2016.07.21
	if(frmObj.d_ctrt_nm.value == ""
		|| isEmptyOrSpaces(frmObj.d_ctrt_cd.value)
		|| frmObj.frm_dt.value == ""
		|| frmObj.to_dt.value == ""
		|| frmObj.d_ofc_cd.value == ""
		|| frmObj.d_pic_cd.value == ""
		|| frmObj.d_cus_cd.value == ""
//		|| frmObj.unit.value == ""
			){
		
		return false;
	}
	// Calculation Method(FIX)가 Fixed Rate인경우
	if ( frmObj.cal_method_cd.value == "FIX") {
		if(frmObj.sel_curr_cd.value == ""
			|| frmObj.i_rate.value == "" 
			|| frmObj.i_rate.value == "0.00" 
			|| frmObj.sel_cycle.value == ""
				){
			return false;
		}
	}

	//#2511 [WMS4.0]Storage closing without each item's rate data
	// Calculation Method가 Daily Total Volume Unit인경우
	if ( frmObj.cal_method_cd.value == "DTV") {
		if(frmObj.sel_curr_cd.value == ""
			|| frmObj.i_rate_per_vol.value == "" 
			|| frmObj.i_rate_per_vol.value == "0.00" 
			|| frmObj.sel_vol_unit.value == ""
				){
			return false;
		}
	}

	return true;
}

function checkEffectiveDateInPut(){
	var frmObj = document.frm1;
	
	if (!ComIsEmpty(frmObj.frm_dt) && !isDate(frmObj.frm_dt)) {
		ComShowCodeMessage("COM0114","Effective Date");
		frmObj.frm_dt.focus();
		return false;
	}
	if (!ComIsEmpty(frmObj.to_dt) && !isDate(frmObj.to_dt)) {
		ComShowCodeMessage("COM0114","Effective Date");
		frmObj.to_dt.focus();
		return false;
	}
	if ((!ComIsEmpty(frmObj.frm_dt)&&ComIsEmpty(frmObj.to_dt))||(ComIsEmpty(frmObj.frm_dt)&&!ComIsEmpty(frmObj.to_dt))) {
		ComShowCodeMessage("COM0122","Effective Date");
		frmObj.frm_dt.focus();
		return false;
	}
	if (getDaysBetween(frmObj.frm_dt, frmObj.to_dt, 'MM-dd-yyyy')<0) {
		ComShowCodeMessage("COM0122","Effective Date");
		frmObj.frm_dt.focus();
		return false;
	}
	return true;
}

function disableDetails(flag){
	
	var frmObj = document.frm1;
	
	 frmObj.d_ctrt_nm.disabled = flag;
	 frmObj.d_ctrt_cd.disabled = flag;
	 frmObj.frm_dt.disabled = flag;
	 frmObj.to_dt.disabled = flag;
	 frmObj.d_ofc_cd.disabled = flag;
	 frmObj.d_pic_cd.disabled = flag;
	 frmObj.d_cus_cd.disabled = flag;
}
function getCtrtInfo(obj){
	var formObj=document.frm1;
	if(obj.value != ""){
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+obj.value+'&ctrt_use_flg='+'A', './GateServlet.gsl');
		
		
	}
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		if(rtnArr[0]!=""){
			formObj.d_ctrt_cd.value = "";
			ComShowCodeMessage("COM0225","Contract No");
		}
	}
}

function isEmptyOrSpaces(str){
    return str === 'undefined' || str === undefined || str === null || str.match(/^ *$/) !== null;
}

function onchangeCalMethod(obj) {
	var frmObj = document.frm1;
	var objVal = obj.value;

	//#3223 [CLA V460 TEST] WMS STORAGE CALCUATION METHOD
	getObj("Calculation_Method_EDB" ).style.display  = 'none';
	getObj("Calculation_Method_DAY" ).style.display  = 'none';
	getObj("Calculation_Method_FIX" ).style.display  = 'none';
	getObj("Calculation_Method_DTV" ).style.display  = 'none';
		
	getObj("Calculation_Method_" + objVal).style.display  = ''
	
	// 'EDB','Ending Balance'
	// 'DAY','Daily In & Out'
	// 'FIX','Fixed Rate'
	// 'DTV','Daily Total Volume Unit'
	if (objVal == "DAY" || objVal == "DTV") {
		frmObj.incl_ib_dt_flg.disabled = false;
		frmObj.incl_ob_dt_flg.disabled = false;

		//#2511 [WMS4.0]Storage closing without each item's rate data
		//Daily In & Out OR Daily Total Volue Unit 인 경우 Include Inbound Date, Outbound Data Default checked
		frmObj.incl_ib_dt_flg.checked = true;
		frmObj.incl_ob_dt_flg.checked = true;
		/*
		if (frmObj.incl_ib_dt_flg.value == "Y") {
			frmObj.incl_ib_dt_flg.checked = true;
		}
		if (frmObj.incl_ob_dt_flg.value == "Y") {
			frmObj.incl_ob_dt_flg.checked = true;
		}
		*/
	} else {
		frmObj.incl_ib_dt_flg.disabled = true;
		frmObj.incl_ob_dt_flg.disabled = true;
		
		frmObj.incl_ib_dt_flg.checked = false;
		frmObj.incl_ob_dt_flg.checked = false;
	}
	// 'FIX','Fixed Rate'
	if (objVal == "FIX") {
		document.getElementById("rate_text").style.display="block";
		document.getElementById("sel_curr_cd").style.display="block";
		document.getElementById("i_rate").style.display="block";
		document.getElementById("cycle_text").style.display="block";
		document.getElementById("sel_cycle").style.display="block";

	    // Currency Default 설정(User Office Currency)
	    if (ComIsNull(frmObj.sel_curr_cd.value)) {
	    	frmObj.sel_curr_cd.value = trf_cur_cd;
	    }
	} else {
		document.getElementById("rate_text").style.display="none";
		document.getElementById("sel_curr_cd").style.display="none";
		document.getElementById("i_rate").style.display="none";
		document.getElementById("cycle_text").style.display="none";
		document.getElementById("sel_cycle").style.display="none";
		document.getElementById("vol_unit_text").style.display="none";		//#2511 [WMS4.0]Storage closing without each item's rate data
		
		
		frmObj.sel_curr_cd.value == ""
		frmObj.i_rate.value == "" 
		frmObj.sel_cycle.value == ""
	}

	//#2511 [WMS4.0]Storage closing without each item's rate data
	// 'DTV' : Daily Total Volume Unit
	if(objVal == "DTV") {
		document.getElementById("rate_per_vol").style.display="block";
		document.getElementById("i_rate_per_vol").style.display="block";
		document.getElementById("sel_curr_cd").style.display="block";
		document.getElementById("sel_vol_unit").style.display="block";
		document.getElementById("vol_unit_text").style.display="block";
		
	} else {
		document.getElementById("rate_per_vol").style.display="none";
		document.getElementById("i_rate_per_vol").style.display="none";
		document.getElementById("sel_vol_unit").style.display="none";
		document.getElementById("vol_unit_text").style.display="none";
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





function Cust_Popup(popName) {
	switch (popName) {
	case "s_cust":
	 	   var formObj=document.frm1;
		   //var params = "?cust_cd="+frmObj.d_cus_cd.value;
//		   var nameObj = formObj.d_cus_nm.value;
		   var nameObj = "";
		    rtnary=new Array(2);
			rtnary[0]="1";
			if(typeof(nameObj)!='undefined'){
				rtnary[1]= nameObj;
			}else{
				rtnary[1]="";
			}
			rtnary[2]=window;
			
			callBackFunc = "clbck_S_CUST_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");			
		break;
	case "d_cust":
 	   var formObj=document.frm1;
	   //var params = "?cust_cd="+frmObj.d_cus_cd.value;
//	   var nameObj = formObj.d_cus_nm.value;
	   var nameObj = "";
	    rtnary=new Array(2);
		rtnary[0]="1";
		if(typeof(nameObj)!='undefined'){
			rtnary[1]= nameObj;
		}else{
			rtnary[1]="";
		}
		rtnary[2]=window;
		
		callBackFunc = "clbck_D_CUST_POPLIST";
		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");		
		break;

	}
}

function Cust_Name_Popup(custName){
	switch (custName) {
	case 's_cust':
		var formObj=document.frm1;
		//var params = "?cust_cd="+frmObj.d_cus_cd.value;
		var nameObj = formObj.s_cus_nm.value;
		 rtnary=new Array(2);
			rtnary[0]="1";
			if(typeof(nameObj)!='undefined'){
				rtnary[1]= nameObj;
			}else{
				rtnary[1]="";
			}
			rtnary[2]=window;
			
			callBackFunc = "clbck_S_CUST_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");			
		break;
	case 'd_cust':
		var formObj=document.frm1;
		//var params = "?cust_cd="+frmObj.d_cus_cd.value;
		var nameObj = formObj.d_cus_nm.value;
		 rtnary=new Array(2);
			rtnary[0]="1";
			if(typeof(nameObj)!='undefined'){
				rtnary[1]= nameObj;
			}else{
				rtnary[1]="";
			}
			rtnary[2]=window;
			
			callBackFunc = "clbck_D_CUST_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650 ,"yes");		
		break;


	}
	

}	


function getCurTime(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 
	
	dd = dd + "";
	mm = mm + "";
	
	today = yyyy+mm+dd;
	return today;
} 
