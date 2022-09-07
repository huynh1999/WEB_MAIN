/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_OPR_0040.jsp
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//단축키사용가능여부체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
    
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
	   			if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
	   				formObj.f_cmd.value = SEARCHLIST;
	   				sheetObj.DoSearch("./OTH_OPR_0040GS.clt", FormQueryString(formObj) );
	   			}
			    break;
			    
           	case "NEW":
           		parent.parent.mkNewFrame('Purchase Order Entry', './OTH_OPR_0030.clt');
           		break;
    	        
	   	 	case "BUYER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
				rtnary[0]="";
//				rtnary[1]=formObj.f_buyr_trdp_nm.value;
				rtnary[1]="";
				rtnary[2]=window;
		   		
		   		callBackFunc = "BUYER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;

	   	 	case "BUYER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
				rtnary[0]="";
				rtnary[1]=formObj.f_buyr_trdp_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "BUYER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
	   	 	case "CUST_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
				rtnary[0]="";
//				rtnary[1]=formObj.f_cust_trdp_nm.value;
				rtnary[1]="";
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
	   	 	case "CUST_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
//				rtnary[1]=formObj.f_vndr_trdp_nm.value;
				rtnary[1]="";
				rtnary[2]=window;
				
		   		callBackFunc = "VENDOR_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;

	   	 	case "VENDOR_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
//				rtnary[2]=formObj.f_org_loc_nm.value;
				rtnary[2]="";
				
		   		callBackFunc = "ORGIN_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
 	        break;

	   	 	case "ORGIN_LOCATION_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
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
//				rtnary[2]=formObj.f_dest_loc_nm.value;
				rtnary[2]="";
				
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		   		break;

			case "DEST_LOCATION_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=formObj.f_dest_loc_nm.value;
				
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		   		break;
		   		
	   	 	case "EXCEL":
		   	 	if(docObjects[0].RowCount() < 1){//no data	
		   			ComShowCodeMessage("COM132501");
		   		}else{
		   	 		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		   		}
	   	 		break;
	   	 		
	   	 	case "REMOVE":
	   	 		
	   	 		var ord_sts_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ord_sts_cd");
	   	 		if(ord_sts_cd == "Approved" || ord_sts_cd == "Completed"){
	   	 			alert(getLabel('FMS_COM_ALT007') + "\n - " +"PO Status");  
	   	 			break;
	   	 		}

	   	 		
				// 'Do you want to delete?')){
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					frm1.f_cmd.value = REMOVE;
					frm1.po_sys_no.value = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "po_sys_no");
					docObjects[0].DoSearch("./OTH_OPR_0040GS.clt", FormQueryString(formObj));
					doWork('SEARCHLIST');
				} 
				
				break;
				
	   	 		
	   	 	case "COPY":
		   	 	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "po_sys_no") == "-1"){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}else{
	   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 				var paramStr="./OTH_OPR_0030.clt?";
	   	 				paramStr+= "f_cmd=" + COMMAND02;
	   	 				paramStr+= "&f_po_sys_no=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "po_sys_no");
	   	 				parent.mkNewFrame('P.O. Entry', paramStr);
	   	 			}
	   	 		}
	   	 		break;
	   	 		
        } // end switch
	}
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
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
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    setFromToDtEndPlus(document.frm1.f_prd_strdt, 31, document.frm1.f_prd_enddt, 0);
    
    doWork('SEARCHLIST');
    
    shortcut.add("Alt+G",function() {
    	sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
    });
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
            var cnt=0;
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('OTH_OPR_0040_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);
            
            var cols = [{Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"cust_po_no",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"po_sys_no",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"cust_trdp_cd",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cust_trdp_nm",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"buyr_trdp_cd",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"buyr_trdp_nm",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"vndr_trdp_cd",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"vndr_trdp_nm",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ord_sts_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"org_loc_cd",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"org_loc_nm",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dest_loc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"dest_loc_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ord_dt",       		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"arr_dt",      		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"shpwin_fr_dt",  		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"shpwin_to_dt",  		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"cgo_rdy_dt",  		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"air_sea_clss_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
            
            InitColumns(cols);
            SetEditable(0);
            //InitViewFormat(0, "ord_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
            //InitViewFormat(0, "arr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
            //InitViewFormat(0, "shpwin_fr_dt", "MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
            //InitViewFormat(0, "shpwin_to_dt", "MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
            //InitViewFormat(0, "cgo_rdy_dt", "MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
            SetSheetHeight(600);
            }
		    break;
    }
}

function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
	doProcess=true;
	formObj.f_cmd.value="";
	var paramStr="./OTH_OPR_0030.clt?f_cmd="+SEARCHLIST+'&f_po_sys_no='+sheetObj.GetCellValue(Row, 'po_sys_no')+"&f_cust_po_no="+sheetObj.GetCellValue(Row, "cust_po_no");
   	parent.mkNewFrame('Purchase Order Entry', paramStr, "OTH_OPR_0030_SHEET_" + sheetObj.GetCellValue(Row, 'po_sys_no')+"_"+sheetObj.GetCellValue(Row, "cust_po_no"));
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
	
	var formObj=document.frm1;
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			if(str=="BUYER" || str=="CUST" || str=="VENDOR"){
				s_type="trdpCode";
			}else if(str=="ORGIN" || str=="DEST"){
				s_type="location";
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="BUYER" || str=="CUST" || str=="VENDOR"){
			s_type="trdpCode";
		}else if(str=="ORGIN" || str=="DEST"){
			s_type="location";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
	if(s_code == ""){
		if(str=="BUYER"){
			formObj.f_buyr_trdp_cd.value = "";
			formObj.f_buyr_trdp_nm.value = "";
		}else if(str=="CUST"){
			formObj.f_cust_trdp_cd.value = "";
			formObj.f_cust_trdp_nm.value = "";
		}else if(str=="VENDOR"){
			formObj.f_vndr_trdp_cd.value = "";
			formObj.f_vndr_trdp_nm.value = "";
		}else if(str=="ORGIN"){
			formObj.f_org_loc_cd.value = "";
			formObj.f_org_loc_nm.value = "";
		}else if(str=="DEST"){
			formObj.f_dest_loc_cd.value = "";
			formObj.f_dest_loc_nm.value = "";
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var Vals=rtnArr[0].split('@@^');	
			if(CODETYPE == "BUYER"){
				formObj.f_buyr_trdp_cd.value=Vals[0]; 
				formObj.f_buyr_trdp_nm.value=Vals[3];
			}else if(CODETYPE == "CUST"){
				formObj.f_cust_trdp_cd.value=Vals[0]; 
				formObj.f_cust_trdp_nm.value=Vals[3];
			}else if(CODETYPE == "VENDOR"){
				formObj.f_vndr_trdp_cd.value=Vals[0]; 
				formObj.f_vndr_trdp_nm.value=Vals[3];
			}else if(CODETYPE == "ORGIN"){
				formObj.f_org_loc_cd.value=Vals[0];
				formObj.f_org_loc_nm.value=Vals[3];
			}else if(CODETYPE == "DEST"){
				formObj.f_dest_loc_cd.value=Vals[0];
				formObj.f_dest_loc_nm.value=Vals[3];
			}
		}else{
			if(CODETYPE == "BUYER"){
				formObj.f_buyr_trdp_cd.value=""; 
				formObj.f_buyr_trdp_nm.value="";
			}else if(CODETYPE == "CUST"){
				formObj.f_cust_trdp_cd.value="";
				formObj.f_cust_trdp_nm.value="";
			}else if(CODETYPE == "VENDOR"){
				formObj.f_vndr_trdp_cd.value="";
				formObj.f_vndr_trdp_nm.value="";
			}else if(CODETYPE == "ORGIN"){
				formObj.f_org_loc_cd.value="";
				formObj.f_org_loc_nm.value="";
			}else if(CODETYPE == "DEST"){
				formObj.f_dest_loc_cd.value="";
				formObj.f_dest_loc_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	
	formObj.po_sys_no.value=sheetObj.GetCellValue(1,"po_sys_no");
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj=document.frm1;
	formObj.f_ord_sts_cd.selectedIndex=0;
	formObj.f_air_sea_clss_cd.selectedIndex=0;
	
	// Set default value for combobox.
	formObj.f_dt_clss_cd.selectedIndex=0;
	formObj.f_no_clss_cd.selectedIndex=0;

	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	
	// Set default value for From Date, End Date textbox.
	setFromToDtEndPlus(document.frm1.f_prd_strdt, 31, document.frm1.f_prd_enddt, 0);
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.f_prd_strdt, frm1.f_prd_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, frm1.f_prd_strdt, frm1.f_prd_enddt)){
		return false;
	}
	return true;
}

//Calendar flag value
var firCalFlag=false;

function BUYER_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_buyr_trdp_cd.value=rtnValAry[0];
		formObj.f_buyr_trdp_nm.value=rtnValAry[2];
	}
}

function CUST_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_trdp_cd.value=rtnValAry[0];
		formObj.f_cust_trdp_nm.value=rtnValAry[2];
	}
}

function VENDOR_POPLIST(rtnVal){
	var formObj=document.frm1;
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
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_org_loc_cd.value=rtnValAry[0];
		formObj.f_org_loc_nm.value=rtnValAry[2];
	} 
}

function DEST_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_dest_loc_cd.value=rtnValAry[0];
		formObj.f_dest_loc_nm.value=rtnValAry[2];
	} 
}

function searchValueClear(){
	var formObj = document.frm1;

	formObj.f_sel_no.value = "";
	
}