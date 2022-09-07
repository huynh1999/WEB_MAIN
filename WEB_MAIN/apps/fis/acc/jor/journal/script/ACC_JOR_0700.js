function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
    	   formObj.f_cmd.value=SEARCHLIST;
    	   docObjects[0].DoSearch("./ACC_JOR_0700GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST01":
    	   formObj.f_cmd.value=SEARCHLIST01;
    	   formObj.modi_seq.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "modi_seq");
    	   docObjects[1].DoSearch("./ACC_JOR_0710GS.clt", FormQueryString(formObj) );
    	   break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
       case "CLOSE":
	        this.close();
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	
	var opt_key = "BANK_MULTI_CURR_FLAG";
	ajaxSendPost(setBankMultiCurrFlag, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    var formObj=document.frm1;
    //var arg=window.dialogArguments;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	if (formObj.jnr_tp.value == "C") {
		getObj('payment_title').style.display="inline";
		getObj('deposit_title').style.display="none";
	} else {
		getObj('payment_title').style.display="none";
		getObj('deposit_title').style.display="inline";
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
	var formObj=document.frm1;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('ACC_JOR_0700_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	
	        var cols = [ {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"delt_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"rcvd_fm_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"bank_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"amt",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:10,   Align:"Center",  ColMerge:1,   SaveName:"modi_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:10,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"mig_yn",      KeyField:0,   CalcLogic:"",   Format:"",       	    PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	         
	        InitColumns(cols);

        	SetEditable(0);
            //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        //InitViewFormat(0, "clr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        //InitViewFormat(0, "void_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        SetSheetHeight(150);
	        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
		}                                                      
		break;
	case 2:      //IBSheet1 init
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [];
	        
            if (formObj.jnr_tp.value == 'D') {
            	 headers = [ { Text:getLabel('ACC_JOR_0700_HDR2'), Align:"Center"}];
	        } else {
	        	 headers = [{ Text:getLabel('ACC_JOR_0700_HDR3'), Align:"Center"}];
	        }
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"dtl_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"gl_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Center",  ColMerge:1,   SaveName:"gl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_xcrt",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:1,  Width:71,   Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	               {Type:"Text",      Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_aply_xcrt2",    KeyField:0,   CalcLogic:"",   Format:"",   	 	  PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	               {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
 	               {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ttl_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
 	               {Type:"Float",     Hidden:1,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ttl_pay_amt2",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	        	   {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	        	   {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	        	   {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"jnr_desc",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	        	   {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	   
	        InitColumns(cols);

	        SetEditable(0);
	        //InitViewFormat(0, "inv_post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	        SetSheetHeight(200);
	        sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	        
	        if(bank_multi_curr_flag == "Y"){
	        	SetColHidden("inv_aply_xcrt", 1);
	        	SetColHidden("ttl_pay_amt", 1);
	        	SetColHidden("inv_xcrt_dt", 0);
	        	SetColHidden("inv_aply_xcrt2", 0);
	        	SetColHidden("inv_xcrt_sum_amt", 0);
	        	SetColHidden("ttl_pay_amt2", 0);
	        } else {
	        	SetColHidden("inv_aply_xcrt", 0);
	        	if (formObj.jnr_tp.value == 'D') {
		        	 SetColHidden("ttl_pay_amt", 0);
		        }
	        }
		}                                                      
		break;
	}
}
function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet2_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		// Type 값 설정
		// #52328 - [BNX] Deposit/Payment List 에서 Post Date 수정시 History 작업 추가
		// Migration 한 데이터인 경우 삭제되지 않은 경우 Changed 로 표기.
		// Migration 여부는 INV_SEQ가 "JNR" 인 경우로 가져옴.
		if ('N' == sheetObj.GetCellValue(i,'mig_yn') && '1'==sheetObj.GetCellValue(i,'modi_seq')){
			sheetObj.SetCellValue(i,'delt_flg','Create');
		} else {
			if ('Y'==sheetObj.GetCellValue(i,'delt_flg')){
				sheetObj.SetCellValue(i,'delt_flg','Delete');
			} else {
				sheetObj.SetCellValue(i,'delt_flg','Changed');
				sheetObj.SetCellFontColor(i,'delt_flg',"#FF0000");
			}	
		}
		// Date Format 변경
		/*	[20140114 OJG]
var postDt=sheetObj.GetCellValue(i,'post_dt');
var clrDt=sheetObj.GetCellValue(i,'clr_dt');
var voidDt=sheetObj.GetCellValue(i,'void_dt');
		if (postDt.length == 8){
			sheetObj.SetCellValue(i,'post_dt',postDt.substring(0,2)+"-"+postDt.substring(2,4)+"-"+postDt.substring(4,8));
		}
		if (clrDt.length == 8){
			sheetObj.SetCellValue(i,'clr_dt',clrDt.substring(0,2)+"-"+clrDt.substring(2,4)+"-"+clrDt.substring(4,8));
		}
		if (voidDt.length == 8){
			sheetObj.SetCellValue(i,'void_dt',voidDt.substring(0,2)+"-"+voidDt.substring(2,4)+"-"+voidDt.substring(4,8));
		}
		*/
	}
} 
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	/*	[20140114 OJG]
	for(var i=1; i<=sheetObj.LastRow();i++){
		// Date Format 변경
var postDt=sheetObj.GetCellValue(i,'inv_post_dt');
		if (postDt.length == 8){
			sheetObj.SetCellValue(i,'inv_post_dt',postDt.substring(4,6)+"-"+postDt.substring(6,8)+"-"+postDt.substring(0,4));
		}
	}
	*/
} 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	doWork("SEARCHLIST01");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	doWork("SEARCHLIST01");
}

var bank_multi_curr_flag = "";

function setBankMultiCurrFlag(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		bank_multi_curr_flag = doc[1];
	} else {
		bank_multi_curr_flag = "";
	}
}