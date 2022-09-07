/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	setFromToDtEndPlus(document.form.f_prd_strdt, 31, document.form.f_prd_enddt, 0);
}
/*
 * 2010/08/16 김진혁 추가
 * 조회 조건 입력 후 엔터로 조회하기 위한 펑션
 */
function entSearch() {
	var formObj=document.form;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
    		   if(!formValidation()) return;
    		   formObj.f_cmd.value=SEARCHLIST;
    		   sheetObj.DoSearch("CMM_POP_0500GS.clt", FormQueryString(formObj) );
    	   break;  
    	   case "APPLY":
    		   var retArray="";
    		   
    		   for(var i=2 ; i < sheetObj.LastRow() + 1 ; i++){
					if(sheetObj.GetCellValue(i, "aply_check") == "1" && sheetObj.GetCellValue(i, "po_sys_no") != ""){
						retArray += "^^";
						retArray += sheetObj.GetCellValue(i, "cust_po_no");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "cust_itm_id");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "cust_itm_nm");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "pck_qty");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "pck_ut_cd");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "pck_ut_nm");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "pck_inr_qty");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "ea_cnt");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "ttl_qty");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "cmdt_kgs_wgt");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "cmdt_lbs_wgt");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "cmdt_cbm_meas");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "cmdt_cft_meas");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "po_cmdt_seq");
						retArray += "@@";
						retArray += sheetObj.GetCellValue(i, "po_sys_no");
				   }
			   }
			   retArray=retArray.substring(2);
			   
			   if(retArray == ""){
				   //alert("Please check Email");
				   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('ITEM'));	
				   return;
			   }
			   ComClosePopup(retArray);
    	   break;  
    	   case "CLOSE":
    		   ComClosePopup(); 
       	   break;
    	   case "CUST_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
				rtnary[0]="";
				rtnary[1]=formObj.f_cust_trdp_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
	   	 	case "VENDOR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
				rtnary[1]=formObj.f_vndr_trdp_nm.value;
				rtnary[2]=window;
				
		   		callBackFunc = "VENDOR_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;
	   	 		
	   	 	case "ORGIN_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=formObj.f_org_loc_nm.value;
				
		   		callBackFunc = "ORGIN_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;
	        
			case "DEST_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=formObj.f_dest_loc_nm.value;
				
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		   		break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0170.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0170.002");
        }
	}
}
//Calendar flag value
var firCalFlag=false;

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_prd_strdt, formObj.f_prd_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.form.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
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
	var arg=parent.rtnary;
	var formObj=document.form;
	
	formObj.f_cust_trdp_cd.value=(arg[0] == undefined || arg[1] == 'undefined') ? '' : arg[0];
	formObj.f_cust_trdp_nm.value=(arg[1] == undefined || arg[1] == 'undefined') ? '' : arg[1];
	formObj.f_vndr_trdp_cd.value=(arg[2] == undefined || arg[1] == 'undefined') ? '' : arg[2];
	formObj.f_vndr_trdp_nm.value=(arg[3] == undefined || arg[1] == 'undefined') ? '' : arg[3];
	//formObj.f_org_loc_cd.value=arg[4];
	//formObj.f_org_loc_nm.value=arg[5];
	//formObj.f_dest_loc_cd.value=arg[6];
	//formObj.f_dest_loc_nm.value=arg[7];
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
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
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('CMM_POP_0500_HDR_1'), Align:"Center"},
		                    { Text:getLabel('CMM_POP_0500_HDR_2'), Align:"Center"} ];
            
            InitHeaders(headers, info);
            
            var cols = [ {Type:"CheckBox", Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"aply_check",    		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                         {Type:"Text",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cust_po_no",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cust_itm_id",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"cust_itm_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shpwin_fr_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shpwin_to_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"org_loc_nm",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"dest_loc_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"rmn_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pck_ut_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"pck_inr_qty",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"ea_cnt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"rmn_ea_cnt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"ttl_qty",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"rmn_ttl_qty",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cmdt_kgs_wgt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cmdt_lbs_wgt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cmdt_cbm_meas",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",    Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cmdt_cft_meas",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"po_cmdt_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"po_sys_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,   SaveName:"Indexing" } ];
            
            InitColumns(cols);
            SetEditable(1);
            SetSheetHeight(310);
            SetHeaderRowHeight(20);
	        SetHeaderRowHeight(21);
            }
		    break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
/*function sheet1_OnDblClick(sheetObj,Row,Col){
	var retArray="";	
	retArray += sheetObj.GetCellValue(Row, "cust_po_no");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "buyr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "vndr_trdp_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "org_loc_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "dest_loc_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ord_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpwin_fr_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "shpwin_to_dt");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "po_sys_no");
	
	ComClosePopup(retArray);
}*/
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
// 2011.12.27 KeyDown
/*function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}*/
function formValidation(){
	if(!chkSearchCmprPrd(false, form.f_prd_strdt, form.f_prd_enddt)){
		return false;
	}
	return true;
}

function CUST_POPLIST(rtnVal){
	var formObj=document.form;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_trdp_cd.value=rtnValAry[0];
		formObj.f_cust_trdp_nm.value=rtnValAry[2];
	}
}

function VENDOR_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_vndr_trdp_cd.value=rtnValAry[0];
		formObj.f_vndr_trdp_nm.value=rtnValAry[2];
	} 
}

function ORGIN_LOCATION_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		//formObj.f_org_loc_cd.value=rtnValAry[0];
		//formObj.f_org_loc_nm.value=rtnValAry[2];
	} 
}

function DEST_LOCATION_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		//formObj.f_dest_loc_cd.value=rtnValAry[0];
		//formObj.f_dest_loc_nm.value=rtnValAry[2];
	} 
}

function searchValueClear(){
	var formObj = document.form;

	formObj.f_sel_no.value = "";
	
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	
	var s_type="";
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			if(str=="CUST" || str=="VENDOR"){
				s_type="trdpCode";
			}else if(str=="ORGIN" || str=="DEST"){
				s_type="location";
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="CUST" || str=="VENDOR"){
			s_type="trdpCode";
		}else if(str=="ORGIN" || str=="DEST"){
			s_type="location";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	var sheetObj=docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var Vals=rtnArr[0].split('@@^');	
			if(CODETYPE == "CUST"){
				formObj.f_cust_trdp_cd.value=Vals[0]; 
				formObj.f_cust_trdp_nm.value=Vals[3];
			}else if(CODETYPE == "VENDOR"){
				formObj.f_vndr_trdp_cd.value=Vals[0]; 
				formObj.f_vndr_trdp_nm.value=Vals[3];
			}else if(CODETYPE == "ORGIN"){
				//formObj.f_org_loc_cd.value=Vals[0];
				//formObj.f_org_loc_nm.value=Vals[3];
			}else if(CODETYPE == "DEST"){
				//formObj.f_dest_loc_cd.value=Vals[0];
				//formObj.f_dest_loc_nm.value=Vals[3];
			}
		}else{
			if(CODETYPE == "CUST"){
				formObj.f_cust_trdp_cd.value=""; 
				formObj.f_cust_trdp_nm.value="";
			}else if(CODETYPE == "VENDOR"){
				formObj.f_vndr_trdp_cd.value="";
				formObj.f_vndr_trdp_nm.value="";
			}else if(CODETYPE == "ORGIN"){
				//formObj.f_org_loc_cd.value="";
				//formObj.f_org_loc_nm.value="";
			}else if(CODETYPE == "DEST"){
				//formObj.f_dest_loc_cd.value="";
				//formObj.f_dest_loc_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}