//=========================================================
//*@FileName   : AIE_AMS_0020.jsp
//*@FileTitle  : AMS SEND(AIR)
//*@Description: AMS SEND(AIR)
//*@author     : Chungrue
//*@version    : 1.0 - 2012/09/10
//*@since      : 2012/09/10
//
//*@Change history: 
//*@author     : Tuan.Chau
//*@version    : 2.0
//*@since      : 2014/07/25
//==========================================================
var rtnary=new Array(2);
var callBackFunc = "";
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST01":
            formObj.f_cmd.value=SEARCHLIST01;
            //검증로직
            docObjects[0].DoSearch("./AIE_AMS_0020GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST02":
            formObj.f_cmd.value=SEARCHLIST02;
            //검증로직
            docObjects[1].DoSearch("./AIE_AMS_0021GS.clt", FormQueryString(formObj) );
		break;
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="";
		   	rtnary[1]="";
			rtnary[2]=window;
	   	    callBackFunc = "LINER_POPLIST";
	   	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    break;
        case "LINER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="";
		   	rtnary[1]="";
			rtnary[2]=window;
	   	    callBackFunc = "LINER_POPLIST";
	   	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    break;
    }
}
function LINER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shp_cd.value=rtnValAry[0];
		formObj.f_shp_nm.value=rtnValAry[2];
		formObj.f_shp_zip.value=rtnValAry[11];
		//formObj.f_shp_addr.value = rtnValAry[7];
		formObj.f_shp_plc.value="";
		formObj.f_shp_ste.value=rtnValAry[20];
		formObj.f_shp_cnt.value=rtnValAry[12];
	}
}

function LINER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cne_cd.value=rtnValAry[0];
		formObj.f_cne_nm.value=rtnValAry[2];
		formObj.f_cne_zip.value=rtnValAry[11];
		//formObj.f_cne_addr.value = rtnValAry[7];
		formObj.f_cne_plc.value="";
		formObj.f_cne_ste.value=rtnValAry[20];
		formObj.f_cne_cnt.value=rtnValAry[12];
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if ( doc[0]=='OK' ) {
		if (typeof(doc[1])!='undefined'){
			var sheetObj1=docObjects[2];
			var iRow=formObj.s_Acct_Info_Row.value;
			//Duplicated account!
			alert(getLabel('FMS_COM_ALT008')+ " - " + doc[1] + "\n\n: AIE_AMS_0020.89");
			sheetObj1.SetCellValue(iRow, 3,"");
		}
	}
	else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: AIE_AMS_0020.93");		
	}
}
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		if ( formObj.s_trdp_cd.value != null && formObj.s_trdp_cd.value != "" ) {
			doWork('SEARCHLIST');
		}
	}
}
// 공통전역변수
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var beforetab2=1;
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
	tabObjects[tabCnt++]=tab_obj;
}
/**
 * Tab 기본 설정
 * 탭의 항목을 설정한다.
 */
function initTab(tabObj , tabNo) {
	switch(tabNo) {
		case 1:
			with (tabObj) {
				var cnt=0 ;
					InsertItem( "Company Info." , "");
					InsertItem( "Contact Info." , "");
					InsertItem( " Tariff Info. " , "");
					InsertItem( "  Etc Info.  " , "");
			}
		break;
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;
		case "sheet3":
			docObjects[2]=sheet_obj;
		break;
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++) {
		comConfigSheet (docObjects[i] , SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	if(formObj.f_mbl_no.value != ""){
    	//HOUSE B/L 조회
        doWork("SEARCHLIST02");
    }
}
/**
 * Tab 클릭시 이벤트 관련
 * 선택한 탭의 요소가 활성화 된다.
 */
function tab1_OnChange(tabObj , nItem) {
	var objs=document.all.item("tabLayer");
	objs[nItem].style.display="Inline";
	objs[beforetab].style.display="none";
	//--------------- 요기가 중요 --------------------------//
	objs[beforetab].style.zIndex=objs[nItem].style.zIndex -1 ;
	//------------------------------------------------------//
	beforetab=nItem;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_AMS_0020_HDR1'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pol_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pol_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"pod_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"qty",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"wgt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shp_addr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shp_zip",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shp_cnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cne_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cne_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cne_addr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cne_zip",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cne_cnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_term_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
	         
	        	InitColumns(cols);
   				SetEditable(1);
   				SetVisible(false);
			}
		break;
		case 2:      //sheet 2 init
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_AMS_0020_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"hbl_obrd_dt_tm",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"hbl_pol_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"hbl_pol_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"hbl_pod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"hbl_pod_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"hbl_qty",          KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"hbl_wgt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"hbl_ibflag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	         
	        	InitColumns(cols);
	        	SetEditable(0);
	            SetHeaderRowHeight(21);
	            InitViewFormat(0, "hbl_obrd_dt_tm", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
	            SetSheetHeight(120);
			}
		break;
		case 3:      //sheet 2 init
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('AIE_AMS_0020_HDR3'), Align:"Center"} ];
		        InitHeaders(headers, info);

	        var cols = [ {Type:"Seq",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:140,  Align:"Center",  ColMerge:1,   SaveName:"send_usr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"send_dt_tm",  KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 } ];
	         
	        	InitColumns(cols);
	        	SetEditable(1);
	            SetHeaderRowHeight(21);
	            InitViewFormat(0, "send_dt_tm", "MM\\/dd\\/yyyy");//날짜 포맷을 월/일/년 으로 설정
	            SetSheetHeight(450);
			}
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
	if(sheetObj.GetCellValue(1, "intg_bl_seq") != ""){
		formObj.f_org_cd.value=sheetObj.GetCellValue(1, "pol_cd");
		formObj.f_org_nm.value=sheetObj.GetCellValue(1, "pol_nm");
		formObj.f_dest_cd.value=sheetObj.GetCellValue(1, "pod_cd");
		formObj.f_dest_nm.value=sheetObj.GetCellValue(1, "pod_nm");
		formObj.f_qty.value=sheetObj.GetCellValue(1, "qty");
		formObj.f_wgt.value=sheetObj.GetCellValue(1, "wgt");
		formObj.f_shp_cd.value=sheetObj.GetCellValue(1, "shp_cd");
		formObj.f_shp_nm.value=sheetObj.GetCellValue(1, "shp_nm");
		formObj.f_shp_addr.value=sheetObj.GetCellValue(1, "shp_addr");
		formObj.f_cne_cd.value=sheetObj.GetCellValue(1, "cne_cd");
		formObj.f_cne_nm.value=sheetObj.GetCellValue(1, "cne_nm");
		formObj.f_cne_addr.value=sheetObj.GetCellValue(1, "cne_addr");
		formObj.f_curr.value=sheetObj.GetCellValue(1, "curr_cd");
		formObj.f_frt_term_cd.value=sheetObj.GetCellValue(1, "frt_term_cd");
    }
    if(formObj.f_mbl_no.value != ""){
    	//HOUSE B/L 조회
        doWork("SEARCHLIST02");
    }
}
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj2=docObjects[1];
	if(sheetObj2.GetCellValue(1, "hbl_intg_bl_seq") != ""){
		formObj.f_hbl_dept_cd.value=sheetObj2.GetCellValue(1, "hbl_pol_cd");
		formObj.f_hbl_dept_nm.value=sheetObj2.GetCellValue(1, "hbl_pol_nm");
		formObj.f_hbl_dest_cd.value=sheetObj2.GetCellValue(1, "hbl_pod_cd");
		formObj.f_hbl_dest_nm.value=sheetObj2.GetCellValue(1, "hbl_pod_nm");
		formObj.f_hbl_qty.value=sheetObj2.GetCellValue(1, "hbl_qty");
		formObj.f_hbl_wgt.value=sheetObj2.GetCellValue(1, "hbl_wgt");
    }
}
function sheet2_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
	if(sheetObj.GetCellValue(Row, "hbl_intg_bl_seq") != ""){
		formObj.f_hbl_dept_cd.value=sheetObj.GetCellValue(Row, "hbl_pol_cd");
		formObj.f_hbl_dept_nm.value=sheetObj.GetCellValue(Row, "hbl_pol_nm");
		formObj.f_hbl_dest_cd.value=sheetObj.GetCellValue(Row, "hbl_pod_cd");
		formObj.f_hbl_dest_nm.value=sheetObj.GetCellValue(Row, "hbl_pod_nm");
		formObj.f_hbl_qty.value=sheetObj.GetCellValue(Row, "hbl_qty");
		formObj.f_hbl_wgt.value=sheetObj.GetCellValue(Row, "hbl_wgt");
    }
}
function sheet2_OnDblClick(sheetObj, Row, Col){
	var formObj=document.frm1;
	if(sheetObj.GetCellValue(Row, "hbl_intg_bl_seq") != ""){
    	formObj.f_cmd.value="";                   
	   	//var paramStr = "./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+sheetObj.CellValue(Row,"bkg_no")+"&f_intg_bl_seq="+sheetObj.CellValue(Row,"intg_bl_seq");
    	var paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row,"hbl_intg_bl_seq") + "&f_bl_no="+sheetObj.GetCellValue(Row,"hbl_no");
	   	parent.mkNewFrame('Booking & HAWB', paramStr);
    }
}
