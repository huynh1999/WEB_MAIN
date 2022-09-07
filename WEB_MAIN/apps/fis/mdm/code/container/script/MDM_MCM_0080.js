//=========================================================
//*@FileName   : MDM_MCM_0080.jsp
//*@FileTitle  : Container Type Size
//*@Description: Container Type Size
//*@author     : Choi,Gil-Ju - Cyberlogitec
//*@version    : 1.0 - 01/13/2009
//*@since      : 01/13/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0080GS.clt", FormQueryString(formObj) );
            }
            var intRows=sheetObj.LastRow() + 1;
            for ( var i=1 ; i < intRows ; i++ ) {
            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
            		sheetObj.SetCellEditable(i, "cntr_tpsz_cd",0);
            	} else {
            		sheetObj.SetCellEditable(i, "cntr_tpsz_cd",1);
            	}
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "NEW":
       break;
       case "ROWADD":
//    	   var intRows=sheetObj.LastRow() + 1;
//            sheetObj.DataInsert(intRows);
//            sheetObj.SetCellValue(intRows, "use_flg","Y");
            //sheetObj.CellImage(intRows, "cstms_cntr_cd") = 0;
            
            var intRows=sheetObj.LastRow()+1;
	        sheetObj.DataInsert(intRows);
	        sheetObj.SetCellValue(intRows, "use_flg","Y");
       break;
       case "MODIFY":
       		if ( !fncGridCheck() ) return false;
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0080GS.clt", FormQueryString(formObj),"ibflag",false);
                var intRows=sheetObj.LastRow() + 1;
	            for ( var i=1 ; i < intRows ; i++ ) {
	            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
	            		sheetObj.SetCellEditable(i, "cntr_tpsz_cd",0);
	            	} else {
	            		sheetObj.SetCellEditable(i, "cntr_tpsz_cd",1);
	            	}
	            }
            }
       break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
	   		}
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
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
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
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
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
        	 
        	 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 var headers = [ { Text:getLabel('MDM_MCM_0080_HDR'), Align:"Center"} ];
        	 InitHeaders(headers, info);

        	 var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
              {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
              {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, TrueValue:"Y" ,FalseValue:"N"  },
              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
              //#47 #52766 - [ZEN] Mark & Desc Tab SAY 항목 Long Name 지정
              {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"cntr_tpsz_nm",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
              // #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리
              {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"temp_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, TrueValue:"Y" ,FalseValue:"N"  },
              {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"vent_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1, TrueValue:"Y" ,FalseValue:"N"  },
              {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"cntr_grp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
              {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu",               KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
              {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"iso_cntr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
              {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"ams_cntr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
              {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"cstms_cntr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
              {Type:"Combo",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"afr_cntr_sz_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
              {Type:"Combo",     Hidden:0,  Width:105,   Align:"Left",    ColMerge:1,   SaveName:"afr_cntr_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"n1st_rsv_cntr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"n2st_rsv_cntr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
              {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"descr",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"db_value" },
              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
           
          		InitColumns(cols);

          		SetEditable(1);
          		SetSheetHeight(500);
          		SetColProperty('cntr_grp_cd', {ComboText:CNTR_GRP_NM, ComboCode:CNTR_GRP_CD} );
          		SetColProperty('afr_cntr_sz_cd', {ComboText:AFR_CNTR_SZ_NM, ComboCode:AFR_CNTR_SZ_CD} );
          		SetColProperty('afr_cntr_tp_cd', {ComboText:AFR_CNTR_TP_NM, ComboCode:AFR_CNTR_TP_CD} );
          		resizeSheet();
           }                                                      
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	//doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//doDispPaging(docObjects[0].CellValue(1, 'Indexing'), getObj('pagingTb'));
	if(errMsg == undefined  || errMsg==null || errMsg == "" ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnClick(sheetObj,Row,Col){
    switch (sheetObj.ColSaveName(Col)) {
        case "cstms_cntr_cd" :
        	/*
            var rtnary=new Array();
	   		rtnary[0]="1";
   	        var rtnVal =  ComOpenWindow('./CMM_POP_0080.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:812px;dialogHeight:480px" , true);
   	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
   	        if (rtnVal == null) {
			 	return;
			}
			//alert("rtnVal==>"+rtnVal);
			var rtnValAry=rtnVal.split("|");
			sheetObj.SetCellValue(Row, "cstms_cntr_cd",rtnValAry[0]);
			*/
		break;
	}
}
/**
 * 콤보 조회
 */
function doAction(cntr_tpsz_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchContainerKeyCode&s_cntr_tpsz_cd='+cntr_tpsz_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Container Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CNTRCD') + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cntr_tpsz_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
    	case "cntr_tpsz_cd" :
    		var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			// 서버에서 체크 -> 시트에서 체크로 변경
			//doAction(sheetObj.CellValue(Row, Col));
			var idx=sheetObj.RowCount();
			for (var i=1;i<idx+1;i++) {
				var tmp_strCd=sheetObj.GetCellValue(i,'cntr_tpsz_cd');
				if ( i != Row && strCd == tmp_strCd) {
					 sheetObj.SetCellValue(Row,'cntr_tpsz_cd',"",0);
					 alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CNTRCD') + " : " + strCd );
					 sheetObj.SelectCell(Row,Col);
					 return false;
				}
			}
		break;
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.LastRow() + 1;
	for(var i=1 ; i < intRow ; i++){
		if(sheetObj.GetCellValue(i, "cntr_tpsz_cd") == "" || sheetObj.GetCellValue(i, "cntr_tpsz_cd") == null){
			alert(getLabel('FMS_COM_ALT007') + "\n - "+getLabel('FMS_COD_CNTR') +" "+ getLabel('FMS_COD_TPSZ'));
			return false;
		}
	}
	return true;
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="descr"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 0);
	}
}
