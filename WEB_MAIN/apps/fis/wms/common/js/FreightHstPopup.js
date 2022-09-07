//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var sheetObjects=new Array();
var sheetCnt=0;
/**
* Sheet  onLoad
*/
function loadPage() {
	for(var i=0;i<sheetObjects.length;i++){
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i],i+1);
		comEndConfigSheet(sheetObjects[i]);
	}
	initControl();
	btn_Search();
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");	
		switch(srcName) {
		case "CLOSE": 
			btn_Close(); 
			break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			ComShowMessage(OBJECT_ERROR);
		} else {
			ComShowMessage(e);
		}
	}
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}
/** 
 * initControl()
 */ 
function initControl() {
	var formObject=document.form;
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "frmObj_OnChange", formObject);
//    // OnKeyUp 이벤트
//    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
//  //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
            with(sheetObj){
//		      var headCount=ComCountHeadTitle(hdr1);
//		      (headCount, 0, 0, true);
		      var prefix="Grd01";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('FreightHstPopup_1_HDR1'), Align:"Center"},{ Text:getLabel('FreightHstPopup_1_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
				 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"update_user",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"update_time",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"accrual_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"exrate",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_qty",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"amt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"val_cls_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"vat_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"curr_vat_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"internal_sts_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"ttl_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sb_cls_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
		       
		      InitColumns(cols);
              SetSheetHeight(220);
		
		      SetEditable(0);
    	  }
	      break;
		case 2:      //IBSheet1 init
            with(sheetObj){
//		      var headCount=ComCountHeadTitle(hdr1);
//		      (headCount, 0, 0, true);
		      var prefix="Grd02";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('FreightHstPopup_2_HDR1'), Align:"Center"},{ Text:getLabel('FreightHstPopup_2_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
				 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"update_user",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"update_time",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"accrual_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"exrate",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_qty",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"amt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"val_cls_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"vat_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"curr_vat_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"internal_sts_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"ttl_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"sb_cls_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
		       
		      InitColumns(cols);
              SetSheetHeight(220);
		
		      SetEditable(0);
          }
	      break;
		case 3:      //IBSheet1 init
            with(sheetObj){
//		      var headCount=ComCountHeadTitle(hdr1);
//		      (headCount, 0, 0, true);
		      var prefix="Grd03";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('FreightHstPopup_3_HDR1'), Align:"Center"},{ Text:getLabel('FreightHstPopup_3_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Seq",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
				 {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:prefix+"desc",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				 {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:prefix+"previous", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				 {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:prefix+"current",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		       
		      InitColumns(cols);
              SetSheetHeight(220);
		
		      SetEditable(0);
            }
            break;
            
		case 4:      //IBSheet1 init
            with(sheetObj){
//		      var headCount=ComCountHeadTitle(hdr1);
//		      (headCount, 0, 0, true);
		      var prefix="Grd04";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('FreightHstPopup_4_HDR1'), Align:"Center"},{ Text:getLabel('FreightHstPopup_4_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"sb_cls_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
				 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:prefix+"hst_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"update_time",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"update_user",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:55,   Align:"Center",  ColMerge:1,   SaveName:prefix+"frt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"frt_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"accrual_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:prefix+"exrate",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"unit_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_qty",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"amt",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"loc_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"val_cls_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"vat_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"curr_vat_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"internal_sts_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
				 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"ttl_amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
		       
		      InitColumns(cols);
              SetSheetHeight(200);
		
		      SetEditable(0);
          }
	      break;
	}
}
function btn_Search() {
	var formObj=document.form;
//	var sXml=sheetObjects[0].GetSearchData("./searchFreightHistoryListGS.clt", FormQueryString(formObj, null, ""));
//	var arrXml=sXml.split("|$$|");
//	var convertedXml=new Array();
//	for(var i=0; i<arrXml.length; i++){
//		if(i == 0){
//			sheetObjects[0].LoadSearchData(arrXml[i],{Sync:1} );
//		}else if(i == 1){
//			sheetObjects[1].LoadSearchData(arrXml[i],{Sync:1} );
//		}else if(i == 2){
//			sheetObjects[3].LoadSearchData(arrXml[i],{Sync:1} );
//		}
//	}
	for(var i=0; i < 3; i++){
		if(i == 0){
			formObj.f_cmd.value = SEARCH;
			sheetObjects[0].DoSearch("./searchFreightHstSellListGS.clt", FormQueryString(formObj, null, ""));
		}else if(i == 1){
			formObj.f_cmd.value = SEARCH01;
			sheetObjects[1].DoSearch("./searchFreightHstBuyListGS.clt", FormQueryString(formObj, null, ""));
		}else if(i == 2){
			formObj.f_cmd.value = SEARCH02;
			sheetObjects[3].DoSearch("./searchFreightHistoryDeleteListGS.clt", FormQueryString(formObj, null, ""));
		}
	}
}
function btn_Close() {
	ComClosePopup();
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var sheetObj2=sheetObjects[2];
if(sheetObj.GetCellValue(Row, "Grd01hst_tp_cd") == "U" && sheetObj.GetCellValue(Row, "Grd01frt_seq") == sheetObj.GetCellValue(Row+1, "Grd01frt_seq")){
		document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="On";
        var tabObjs=document.getElementsByName('tabLayer');
        tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
		sheetObj2.RemoveAll();
if(sheetObj.GetCellValue(Row, "Grd01update_user") != sheetObj.GetCellValue(Row+1, "Grd01update_user")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Update User");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01update_user"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01update_user"));
		}
if(sheetObj.GetCellValue(Row, "Grd01update_time") != sheetObj.GetCellValue(Row+1, "Grd01update_time")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Update time");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01update_time"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01update_time"));
		}
if(sheetObj.GetCellValue(Row, "Grd01cust_cd") != sheetObj.GetCellValue(Row+1, "Grd01cust_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Customer Code");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01cust_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01cust_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd01cust_nm") != sheetObj.GetCellValue(Row+1, "Grd01cust_nm")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Customer Name");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01cust_nm"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01cust_nm"));
		}
if(sheetObj.GetCellValue(Row, "Grd01frt_cd") != sheetObj.GetCellValue(Row+1, "Grd01frt_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Freight Code");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01frt_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01frt_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd01frt_nm") != sheetObj.GetCellValue(Row+1, "Grd01frt_nm")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Freight Name");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01frt_nm"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01frt_nm"));
		}
if(sheetObj.GetCellValue(Row, "Grd01accrual_nm") != sheetObj.GetCellValue(Row+1, "Grd01accrual_nm")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Accrual");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01accrual_nm"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01accrual_nm"));
		}
if(sheetObj.GetCellValue(Row, "Grd01curr_cd") != sheetObj.GetCellValue(Row+1, "Grd01curr_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Currency");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01curr_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01curr_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd01exrate") != sheetObj.GetCellValue(Row+1, "Grd01exrate")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Ex.Rate");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01exrate"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01exrate"));
		}
if(sheetObj.GetCellValue(Row, "Grd01unit_cd") != sheetObj.GetCellValue(Row+1, "Grd01unit_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Unit");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01unit_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01unit_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd01unit_qty") != sheetObj.GetCellValue(Row+1, "Grd01unit_qty")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Pkgs");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01unit_qty"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01unit_qty"));
		}
if(sheetObj.GetCellValue(Row, "Grd01unit_price") != sheetObj.GetCellValue(Row+1, "Grd01unit_price")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Rate");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01unit_price"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01unit_price"));
		}
if(sheetObj.GetCellValue(Row, "Grd01amt") != sheetObj.GetCellValue(Row+1, "Grd01amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","NET AMT(ENT)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd01loc_amt") != sheetObj.GetCellValue(Row+1, "Grd01loc_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","NET AMT(LOC)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01loc_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01loc_amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd01val_cls_cd") != sheetObj.GetCellValue(Row+1, "Grd01val_cls_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","VAT(%)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01val_cls_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01val_cls_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd01vat_amt") != sheetObj.GetCellValue(Row+1, "Grd01vat_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","VAT(LOC)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01vat_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01vat_amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd01curr_vat_amt") != sheetObj.GetCellValue(Row+1, "Grd01curr_vat_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","VAT(ENT)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01curr_vat_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01curr_vat_amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd01internal_sts_cd") != sheetObj.GetCellValue(Row+1, "Grd01internal_sts_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Internal");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01internal_sts_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01internal_sts_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd01ttl_amt") != sheetObj.GetCellValue(Row+1, "Grd01ttl_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","SUB TTL");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd01ttl_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd01ttl_amt"));
		}
		setTimeout("tabSelect()", 100);
		//goTabSelect('03');
	}else{
		sheetObj2.RemoveAll();
	}
}
function sheet2_OnDblClick(sheetObj, Row, Col){
	var sheetObj2=sheetObjects[2];
if(sheetObj.GetCellValue(Row, "Grd02hst_tp_cd") == "U" && sheetObj.GetCellValue(Row, "Grd02frt_seq") == sheetObj.GetCellValue(Row+1, "Grd02frt_seq")){
		document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="On";
        var tabObjs=document.getElementsByName('tabLayer');
        tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
		sheetObj2.RemoveAll();
if(sheetObj.GetCellValue(Row, "Grd02update_user") != sheetObj.GetCellValue(Row+1, "Grd02update_user")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Update User");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02update_user"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02update_user"));
		}
if(sheetObj.GetCellValue(Row, "Grd02update_time") != sheetObj.GetCellValue(Row+1, "Grd02update_time")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Update time");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02update_time"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02update_time"));
		}
if(sheetObj.GetCellValue(Row, "Grd02cust_cd") != sheetObj.GetCellValue(Row+1, "Grd02cust_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Customer Code");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02cust_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02cust_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd02cust_nm") != sheetObj.GetCellValue(Row+1, "Grd02cust_nm")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Customer Name");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02cust_nm"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02cust_nm"));
		}
if(sheetObj.GetCellValue(Row, "Grd02frt_cd") != sheetObj.GetCellValue(Row+1, "Grd02frt_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Freight Code");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02frt_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02frt_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd02frt_nm") != sheetObj.GetCellValue(Row+1, "Grd02frt_nm")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Freight Name");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02frt_nm"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02frt_nm"));
		}
if(sheetObj.GetCellValue(Row, "Grd02accrual_nm") != sheetObj.GetCellValue(Row+1, "Grd02accrual_nm")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Accrual");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02accrual_nm"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02accrual_nm"));
		}
if(sheetObj.GetCellValue(Row, "Grd02curr_cd") != sheetObj.GetCellValue(Row+1, "Grd02curr_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Currency");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02curr_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02curr_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd02exrate") != sheetObj.GetCellValue(Row+1, "Grd02exrate")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Ex.Rate");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02exrate"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02exrate"));
		}
if(sheetObj.GetCellValue(Row, "Grd02unit_cd") != sheetObj.GetCellValue(Row+1, "Grd02unit_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Unit");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02unit_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02unit_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd02unit_qty") != sheetObj.GetCellValue(Row+1, "Grd02unit_qty")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Pkgs");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02unit_qty"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02unit_qty"));
		}
if(sheetObj.GetCellValue(Row, "Grd02unit_price") != sheetObj.GetCellValue(Row+1, "Grd02unit_price")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Rate");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02unit_price"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02unit_price"));
		}
if(sheetObj.GetCellValue(Row, "Grd02amt") != sheetObj.GetCellValue(Row+1, "Grd02amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","NET AMT(ENT)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd02loc_amt") != sheetObj.GetCellValue(Row+1, "Grd02loc_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","NET AMT(LOC)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02loc_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02loc_amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd02val_cls_cd") != sheetObj.GetCellValue(Row+1, "Grd02val_cls_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","VAT(%)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02val_cls_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02val_cls_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd02vat_amt") != sheetObj.GetCellValue(Row+1, "Grd02vat_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","VAT(LOC)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02vat_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02vat_amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd02curr_vat_amt") != sheetObj.GetCellValue(Row+1, "Grd02curr_vat_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","VAT(ENT)");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02curr_vat_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02curr_vat_amt"));
		}
if(sheetObj.GetCellValue(Row, "Grd02internal_sts_cd") != sheetObj.GetCellValue(Row+1, "Grd02internal_sts_cd")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","Internal");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02internal_sts_cd"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02internal_sts_cd"));
		}
if(sheetObj.GetCellValue(Row, "Grd02ttl_amt") != sheetObj.GetCellValue(Row+1, "Grd02ttl_amt")){
//no support[check again]CLT 			var intRows=sheetObj2.Rows;
			sheetObj2.DataInsert(intRows);
			sheetObj2.SetCellValue(intRows, "Grd03desc","SUB TTL");
sheetObj2.SetCellValue(intRows, "Grd03previous",sheetObj.GetCellValue(Row+1, "Grd02ttl_amt"));
sheetObj2.SetCellValue(intRows, "Grd03current",sheetObj.GetCellValue(Row, 	"Grd02ttl_amt"));
		}
		setTimeout("tabSelect()", 100);
		//goTabSelect('03');
	}else{
		sheetObj2.RemoveAll();
	}
}
function goTabSelect(isNumSep) {
	
    var tabObjs=document.getElementsByName('tabLayer');
    if(isNumSep=='01') {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
    }else if(isNumSep=='02') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';
        tabObjs[2].style.display='none';
    }else if(isNumSep=='03') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}
function tabSelect(){
	var tabObjs=document.getElementsByName('tabLayer');
	tabObjs[2].style.display='inline';
}
