/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0320.js
*@FileTitle  : Master B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/11
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var delete_show_msg = "N";
var isPdOrdStsOk=false;
var isInvStsOk=false;
var GRDBCKCORLOR_S = "";
var GRDBCKCORLOR_F = "#ffa7a7";
var GRDBCKCORLOR_B = "#58aa52";
var dupIntgBlSeq ="";
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.etd_strdt, 90, document.frm1.etd_enddt, 30);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			    }
    	   		
    	   	break;
           	case "NEW":
	    	   	var paramStr="./AIE_BMD_0040.clt?f_cmd=-1";
	    	   	parent.mkNewFrame('Master B/L Entry', paramStr);	
           	break;
		   	case "TEMP_DOWN":
		   		sheetObj2.RemoveAll();
		   		var intRows=sheetObj2.LastRow() + 1;
		   		sheetObj2.DataInsert(intRows);
		   		sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
	   	 	break; 
		   	case "UPLOAD":
		   		sheetObj1.LoadExcel({Mode : "HeaderSkip", WorkSheetNo : "1",StartCol : "-1"});
		   		//sheetObj1.LoadExcel({Mode : "HeaderMatch", WorkSheetNo : "1"});
		   		//sheetObj1.LoadExcel({Mode : "HeaderMatch",   WorkSheetNo : "1", StartRow: "3"});
		   		//sheetObj1.LoadExcel({ Mode:"HeaderSkip", StartRow: "1"});
		   		break; 
		   		
            case "APPLY":
                formObj.f_cmd.value = ADD;
                if(!inpuValCheck(sheetObj1)){
                	return;
                }
                if (confirm(getLabel('FMS_COM_CFMCON'))) {                	
                	for(var i=1; i<sheetObj1.LastRow()+1;i++){
                		sheetObj1.SetCellText(i,"pck_ut_nm",sheetObj1.GetCellText(i,"pck_ut_cd"));
                	}
                    doProcess = true;
                    sheetObj1.DoSave("AIE_BMD_0320GS.clt", FormQueryString(formObj), "auto_chk", false);
                }
                break;		
                
            case "CLEAR" :
            	sheetObj1.RemoveAll();
            	formObj.val_msg.value ="";
            	break;
	   	 	
	   	 	//
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}


function inpuValCheck(sheetObj){
	
	var findRow = sheetObj.FindCheckedRow("auto_chk");
	if(findRow == ""){
		alert(getLabel('FMS_COM_ALT007'));
		return false;
	}
	
	/*
	var chkArr = findRow.split("|");
	for(var i=0; i < chkArr.length; i++){
		var refNo = sheetObj.GetCellValue(chkArr[i], "ref_no");
		refCheck = true;
		ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+refNo, './GateServlet.gsl');
		if(!refCheck){
			sheetObj.SetCellBackColor(chkArr[i], "ref_no", GRDBCKCORLOR_F);
			alert(getLabel('AIR_MSG_032'));
			return false;
		}	
	}
	*/
		
	
	return true;
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
	var formObj=document.frm1;
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    
    //console.log(OFCCD1);
    //console.log(OFCCD2);
    //console.log(BLTYPECD1);
    //console.log(BLTYPECD2);
    //console.log(PCKUTCD1);
    //console.log(PCKUTCD2);
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
	        var info    = { Sort:1, ColMove:0, HeaderCheck:1, ColResize:1 };
  	        var headers = [ { Text:getLabel('AIE_BMD_0320_HDR1'), Align:"Center"},
    	                  { Text:getLabel('AIE_BMD_0320_HDR2'), Align:"Center"} ];	        
	        InitHeaders(headers, info);
	        var cols = [ 
 	               {Type:"CheckBox",  Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"auto_chk",     		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"status",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ref_no",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",  	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Combo",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",   	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_no",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ref_u",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pu_u",       		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pacher_u",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm",	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"lnr_iata_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"flt_no",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",     	KeyField:1,   CalcLogic:"",   Format:"YmdHm",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",      	KeyField:0,   CalcLogic:"",   Format:"YmdHm",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               //{Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_trdp", 	    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"fst_to_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               //{Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ts1_port_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",	  Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ts1_flt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"PopupEdit", Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"rep_cmdt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",      	KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },	               
	               {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",    		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_1",     		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_2",      		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_3",      		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_4",      		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_5",      		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_6",      		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_7",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hndl_info_txt",	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, MultiLineText:1 },
	               {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"mk_txt",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, MultiLineText:1 },
	               {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"bl_rate_1",   	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"bl_rate_2",  		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"bl_rate_3",  		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	               
	               {Type:"Date",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_nm",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_trdp_nm",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               //4.6.1 BInex_문의_수정사항
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"del_intg_bl_seq",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iata_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_trdp_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_nm",   	  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_nm",    	 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"fst_to_nm",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ts1_port_nm",    	 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"acctg_info_txt", 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"rep_cmdt_cd", 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"grs_wgt1",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"chg_wgt",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"chg_wgt1",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_grs_wgt",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_grs_wgt1",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_chg_wgt",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Float",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_chg_wgt1",    	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	               {Type:"Text",     Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"pck_ut_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"ibflag",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];

	        InitColumns(cols);
	        SetEditable(1);
	        SetSheetHeight(SYSTEM_ROW_HEIGHT*18);
	        SetColProperty('ref_ofc_cd', {ComboText:'|'+OFCCD1, ComboCode:'|'+OFCCD2} );
	        SetColProperty('hbl_tp_cd', {ComboText:'|'+BLTYPECD1, ComboCode:'|'+BLTYPECD2} );
	        SetColProperty('pck_ut_cd', {ComboText:'|'+PCKUTCD1, ComboCode:'|'+PCKUTCD2} );
	        
	        SetColProperty(0 ,"shpr_trdp_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"cnee_trdp_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"ntfy_trdp_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"lnr_trdp_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"lnr_iata_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"iss_trdp_cd" , {InputCaseSensitive:1});
	        
	        SetColProperty(0 ,"ref_no" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"pol_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"fst_to_cd" , {InputCaseSensitive:1});
	        //SetColProperty(0 ,"ts1_port_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"pod_cd" , {InputCaseSensitive:1});
	        SetColProperty(0 ,"rep_cmdt_nm" , {InputCaseSensitive:1});
	        //sheetObj.SetFocusAfterProcess(1);
		   }                                                      
		break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
	            var cnt=0;
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:0, HeaderCheck:1, ColResize:1 };
	  	        var headers = [ { Text:getLabel('AIE_BMD_0320_HDR1'), Align:"Center"},
	      	                  { Text:getLabel('AIE_BMD_0320_HDR2'), Align:"Center"} ];	 
	            InitHeaders(headers, info);
		        var cols = [ 
		  	               {Type:"CheckBox",  Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"auto_chk",     		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"status",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_dt_tm",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ref_no",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_cd",  	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Combo",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",   	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bl_no",       	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ref_u",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pu_u",       		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pacher_u",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm",	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"lnr_iata_cd",   	 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"flt_no",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",     	KeyField:1,   CalcLogic:"",   Format:"YmdHm",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",      	KeyField:0,   CalcLogic:"",   Format:"YmdHm",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               //{Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_trdp", 	    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"iss_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pol_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"fst_to_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               //{Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ts1_port_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ts1_flt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pod_cd",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"rep_cmdt_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"pck_qty",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",    		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_1",     		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_2",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_3",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_4",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_5",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_6",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:40,   Align:"Right",   ColMerge:0,   SaveName:"qty_7",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"hndl_info_txt",	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"mk_txt",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"bl_rate_1",   	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"bl_rate_2",  		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
			               {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"bl_rate_3",  		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 }
			               ]

	            InitColumns(cols);
	            SetEditable(1);
	            SetSheetHeight(SYSTEM_ROW_HEIGHT*9);
	            //sheetObj.SetFocusAfterProcess(0);
		   }                                                      
		break;
    }
}

function sheet1_OnClick(sheetObj,Row,Col){
}

function sheet1_OnSaveEnd(sheet, errMsg){
	docObjects[0].RemoveAll();
	showCompleteProcess();
}

var refCheck  = true;
var trdpCheck = true;
var ofc_post_dt="TODAY";
var TRDPTYPE;
var SHEET1_ROW;
var blockNinv = true; 
function sheet1_OnLoadExcel(obj, result) {
	var sheetObj1=docObjects[0];
    var formObj=document.frm1;
    var dupRowsBl ="";
    var checkVal  = 0;
    var valMsgArr = new Array();
    var refNo = "";
    
    formObj.val_msg.value ="";
    
    if(result) {

    	dupRowsBl = sheetObj1.ColValueDupRows("ref_no",{"IncludeDelRow" : 0});
    	
		for(var i=2; i <= sheetObj1.LastRow(); i++){
			checkVal = 0;
			SHEET1_ROW = i;
			//ref_no 중복체크
			refNo = sheetObj1.GetCellValue(i, "ref_no");
			if(refNo !=""){
				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+refNo, './GateServlet.gsl');
				if(!refCheck){
					sheetObj1.SetCellBackColor(i, "ref_no", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_032'));
					checkVal += 1;

					//#581 [BINEX] MAWB 자동생성 4.6.1 BInex_문의_수정사항
					//block 혹은 인보이스가 없는경우 중복된 filing# 삭제 후  재등록
					blockNinv = false;
					dupIntgBlSeq = "";
					ajaxSendPost(getRefBlockNinv, 'reqVal', '&goWhere=aj&bcKey=getRefBlockNinv&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+refNo, './GateServlet.gsl');
					if(blockNinv){
						sheetObj1.SetCellBackColor(i, "ref_no", GRDBCKCORLOR_B);
						sheetObj1.SetCellValue(i, "del_intg_bl_seq", dupIntgBlSeq );//
					}else{
						sheetObj1.SetCellBackColor(i, "ref_no", GRDBCKCORLOR_F);
						sheetObj1.SetCellValue(i, "del_intg_bl_seq", "" );//
					}    
				}
				
				
			}else{
				sheetObj1.SetCellBackColor(i, "ref_no", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (i-1) +"] "+ getLabel('AIR_MSG_102')); //'Filing No. is a mandatory field.'
				checkVal += 1;				
			}
			
			//ref ofc 코드 확인
			//var isVal = OFCCD1.indexOf(sheetObj1.GetCellValue(i, "ref_ofc_cd"));
			//if(isVal < 0){
			//	sheetObj1.SetCellBackColor(i, "ref_ofc_cd", GRDBCKCORLOR_F);
			//	valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_103'));// Please check Office Code.
			//	checkVal += 1;				
			//}
			if(sheetObj1.GetCellValue(i, "ref_ofc_cd") ==""){
				sheetObj1.SetCellBackColor(i, "ref_ofc_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_055')); // Office is a mandatory field.
				checkVal += 1;					
			}
			
			//bl type 확인
			if(sheetObj1.GetCellValue(i, "hbl_tp_cd") ==""){
				sheetObj1.SetCellBackColor(i, "hbl_tp_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_104')); // B/L Type. is a mandatory field
				checkVal += 1;				
			}
			
			//shpr code
			if(sheetObj1.GetCellValue(i, "shpr_trdp_cd") !=""){
				TRDPTYPE = "shpr_trdp_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj1.GetCellValue(i, "shpr_trdp_cd"), "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "shpr_trdp_cd", GRDBCKCORLOR_F);
					sheetObj1.SetCellBackColor(i, "shpr_trdp_nm", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
					checkVal += 1;
				}
			}
			
			//cnee code
			if(sheetObj1.GetCellValue(i, "cnee_trdp_cd") !=""){
				TRDPTYPE = "cnee_trdp_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj1.GetCellValue(i, "cnee_trdp_cd"), "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "cnee_trdp_cd", GRDBCKCORLOR_F);
					sheetObj1.SetCellBackColor(i, "cnee_trdp_nm", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_106')); //Please check CNEE Code';
					checkVal += 1;
				}
			}
			
			//NTFY code
			if(sheetObj1.GetCellValue(i, "ntfy_trdp_cd") !=""){
				TRDPTYPE = "ntfy_trdp_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj1.GetCellValue(i, "ntfy_trdp_cd"), "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "ntfy_trdp_cd", GRDBCKCORLOR_F);
					sheetObj1.SetCellBackColor(i, "ntfy_trdp_nm", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_105')); //'Please check NTFY Code';
					checkVal += 1;
				}	
			}
			
			/*
			//lnr_trdp code
			if(sheetObj1.GetCellValue(i, "lnr_trdp_cd") !=""){
				TRDPTYPE = "lnr_trdp_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj1.GetCellValue(i, "lnr_trdp_cd"), "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "lnr_trdp_cd", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_108')); //'Please check Carrier';
					checkVal += 1;
				}			
			}
			*/
			//iata cd
			if(sheetObj1.GetCellValue(i, "lnr_iata_cd") !=""){
				TRDPTYPE = "lnr_iata_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCodeIATA&s_code="+sheetObj1.GetCellValue(i, "lnr_iata_cd"), "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "lnr_iata_cd", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_108')); //'Please check Carrier';
					checkVal += 1;
				}			
			}			
			
			
			//edt 필수
			if(sheetObj1.GetCellValue(i, "etd_dt_tm") =="" ){
				sheetObj1.SetCellBackColor(i, "etd_dt_tm", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_109')); //'ETD is a mandatory field.';
				checkVal += 1;						
			}
			ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+sheetObj1.GetCellValue(i, "ref_ofc_cd"), './GateServlet.gsl');
			if(ofc_post_dt=="ETA"){
				//eda 필수
				if(sheetObj1.GetCellValue(i, "eta_dt_tm") =="" ){
					sheetObj1.SetCellBackColor(i, "eta_dt_tm", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_110')); //'ETA is a mandatory field.';
					checkVal += 1;						
				}
				
				if(sheetObj1.GetCellValue(i, "post_dt") == ""){
					sheetObj1.SetCellValue(i, "post_dt",sheetObj1.GetCellValue(i, "eta_dt_tm"),0);
				}
			}else if(ofc_post_dt=="ETD"){
				if(sheetObj1.GetCellValue(i, "post_dt") == ""){
					sheetObj1.SetCellValue(i, "post_dt",sheetObj1.GetCellValue(i, "etd_dt_tm"),0);
				}
			}else{
				if(sheetObj1.GetCellValue(i, "post_dt") == ""){
					sheetObj1.SetCellValue(i, "post_dt",getTodayStr(),0);
				}
			}
			
			//issuing Carrier 
			if(sheetObj1.GetCellValue(i, "iss_trdp_cd") !=""){
				TRDPTYPE = "iss_trdp_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj1.GetCellValue(i, "iss_trdp_cd"), "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "iss_trdp_cd", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_111')); //'Please check Issuing Carrier';
					checkVal += 1;
				}
			}
			
			//departure
			TRDPTYPE = "pol_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj1.GetCellValue(i, "pol_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj1.SetCellBackColor(i, "pol_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_112')); //'Please check Departure';
				checkVal += 1;
			}			
			
			//first To
			if(sheetObj1.GetCellValue(i, "fst_to_cd") !=""){
				TRDPTYPE = "fst_to_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj1.GetCellValue(i, "fst_to_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "fst_to_cd", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_113')); // 'Please check First To';
					checkVal += 1;
				}
			}
			
			/*
			//Trans 1 by
			if(sheetObj1.GetCellValue(i, "ts1_port_cd") !=""){
				TRDPTYPE = "ts1_port_cd";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj1.GetCellValue(i, "ts1_port_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
				if(!trdpCheck){
					sheetObj1.SetCellBackColor(i, "ts1_port_cd", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_114')); //'Please check Trans 1 by';
					checkVal += 1;
				}
			}
			*/
			
			//Dest
			TRDPTYPE = "pod_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj1.GetCellValue(i, "pod_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj1.SetCellBackColor(i, "pod_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_115')); // 'Please check Dest';
				checkVal += 1;
			}			
			
			//package
			//if(sheetObj1.GetCellValue(i, "pck_qty") !="" && sheetObj1.GetCellValue(i, "pck_ut_cd") ==""){
			//	sheetObj1.SetCellBackColor(i, "pck_qty", GRDBCKCORLOR_F);
			//	sheetObj1.SetCellBackColor(i, "pck_ut_cd", GRDBCKCORLOR_F);
			//	valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_116')); //'Package is a mandatory field.';
			//	checkVal += 1;					
			//}

			
			//commodity  필수아님  코드가 없더라도 저장
			if(sheetObj1.GetCellValue(i, "rep_cmdt_nm") !=""){
				TRDPTYPE = "rep_cmdt_nm";
				ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=commoditynm&s_code_nm="+sheetObj1.GetCellValue(i, "rep_cmdt_nm"), "./GateServlet.gsl");
				
				//필수아님  코드가 없더라도 저장
				//if(!trdpCheck){
				//	sheetObj1.SetCellBackColor(i, "rep_cmdt_nm", GRDBCKCORLOR_F);
				//	valMsgArr.push("Row["+ (i-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_117')); // 'Please check Commodity';
				//	checkVal += 1;
				//}				
			}
			
			//weight setting
			try{
				weightChange(sheetObj1.GetCellValue(i, "grs_wgt"));
			}catch(e){	
			}
				
			
			//#581 [BINEX] MAWB 자동생성 4.6.1 BInex_문의_수정사항
			//block 혹은 인보이스가 없는경우 중복된 filing# 삭제 후  재등록
			checkVal  = 0;
			for(var c = 0; c <= sheetObj1.LastCol(); c++) {
				//console.log(sheetObj.ColSaveName(c) +'  /  '+ sheetObj.GetCellBackColor(row, sheetObj.ColSaveName(c)) +'  /  '+ GRDBCKCORLOR_F)
				if(sheetObj1.GetCellBackColor(i, sheetObj1.ColSaveName(c)) == GRDBCKCORLOR_F){
					checkVal += 1
				}
			}
						
			
			if(checkVal == 0){
				sheetObj1.SetCellValue(i, "status", "OK",0);
				sheetObj1.SetCellEditable(i, "auto_chk", 1);
			}else{
				sheetObj1.SetCellValue(i, "status", "ERROR",0);
				sheetObj1.SetCellEditable(i, "auto_chk", 0);
			}
			
			
			sheetObj1.SetRowStatus(i,"R");//엑셀로드시 읽기모드로 변경
		}

		if(dupRowsBl != ""){
	   		var arrRow = dupRowsBl.split(",");
	   		// 클릭한 row가 중복행에 포함되면 선택이 안되게 한다.
	   		for(var j=0;j<arrRow.length;j++){
				sheetObj1.SetCellBackColor(arrRow[j], "ref_no", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (arrRow[j]-1) +"] "+ sheetObj1.GetCellValue(arrRow[j], "ref_no") +" : " +  getLabel('AIR_MSG_032'));
				sheetObj1.SetCellValue(arrRow[j], "status", "ERROR",0);
				sheetObj1.SetCellEditable(arrRow[j], "auto_chk", 0);
	   		}			
		}		
		
    	for(var i=0; i<valMsgArr.length; i++){
    		formObj.val_msg.value += "  " + ((i+1) + ". " + valMsgArr[i] + "\n");
	    }		
		
	} else {
		return;
	}
}

function sheet1_OnChange(sheetObj, row, col, value) {
	var formObj=document.frm1;
	var valMsgArr = new Array();
	var refNo = sheetObj.GetCellValue(row, "ref_no");
	
	SHEET1_ROW = row;

	//console.log(sheetObj.ColSaveName(col));
	switch (sheetObj.ColSaveName(col)) {
		case "auto_chk" :
				if(sheetObj.GetCellValue(row, "auto_chk") == "1"){
					if(sheetObj.GetCellBackColor(row, "ref_no") == GRDBCKCORLOR_B){
						if(!confirm(getLabel2('AIR_MSG_118',new Array(refNo)))){
							sheetObj.SetCellValue(row, "auto_chk", "0");
						}
					}
				}
			break;
	
		case "ref_no" :
			if(refNo !=""){
				sheetObj.SetCellValue(row, "del_intg_bl_seq", "" );
				ajaxSendPost(getRefNoCheck, 'reqVal', '&goWhere=aj&bcKey=getRefNoCheck&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+refNo, './GateServlet.gsl');
				if(!refCheck){
					sheetObj.SetCellBackColor(row, "ref_no", GRDBCKCORLOR_F);
					valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_032'));
					
					//#581 [BINEX] MAWB 자동생성 4.6.1 BInex_문의_수정사항
					//block 혹은 인보이스가 없는경우 중복된 filing# 삭제 후  재등록
					blockNinv = false;
					dupIntgBlSeq = "";
					ajaxSendPost(getRefBlockNinv, 'reqVal', '&goWhere=aj&bcKey=getRefBlockNinv&f_air_sea=A&f_bnd_clss_cd=O&f_biz_clss_cd=M&f_ref_no='+refNo, './GateServlet.gsl');
					if(blockNinv){
						sheetObj.SetCellBackColor(row, "ref_no", GRDBCKCORLOR_B);
						sheetObj.SetCellValue(row, "del_intg_bl_seq", dupIntgBlSeq )
					}else{
						sheetObj.SetCellBackColor(row, "ref_no", GRDBCKCORLOR_F);
						sheetObj.SetCellValue(row, "del_intg_bl_seq", "" );
					}
					
				}else{
					sheetObj.SetCellBackColor(row, "ref_no", GRDBCKCORLOR_S);
				}
				
				
				//그리드내 중복체크
				for(var j=sheetObj.HeaderRows(); j <= sheetObj.LastRow(); j++) {
					if( sheetObj.GetCellValue(j, "ref_no") == refNo ){
						if(j != row){
							sheetObj.SetCellBackColor(row, "ref_no", GRDBCKCORLOR_F);
							valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_032') + "Row["+ (j-1) +"] ");					
						}
					}
				}
				
			}else{
				sheetObj.SetCellBackColor(row, "ref_no", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ getLabel('AIR_MSG_102')); //'Filing No. is a mandatory field.'
			}		
			
			break;
		case "ref_ofc_cd" :
			if(sheetObj.GetCellValue(row, "ref_ofc_cd") ==""){
				sheetObj.SetCellBackColor(row, "ref_ofc_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_055')); // Office is a mandatory field.
			}else{
				sheetObj.SetCellBackColor(row, "ref_ofc_cd", GRDBCKCORLOR_S);
			}		
			
			
			fn_setPostDt(sheetObj);
			
			break;
		case "hbl_tp_cd" :
			//bl type 확인
			if(sheetObj.GetCellValue(row, "hbl_tp_cd") ==""){
				sheetObj.SetCellBackColor(row, "hbl_tp_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_104')); // B/L Type. is a mandatory field
			}else{
				sheetObj.SetCellBackColor(row, "hbl_tp_cd", GRDBCKCORLOR_S);
			}
			break;

		case "shpr_trdp_cd" :
			//shpr code
			TRDPTYPE = "shpr_trdp_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj.GetCellValue(row, "shpr_trdp_cd"), "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "shpr_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "shpr_trdp_nm", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				sheetObj.SetCellValue(row, "shpr_trdp_cd","");
				sheetObj.SetCellValue(row, "shpr_trdp_nm","");
				
			}else{
				sheetObj.SetCellBackColor(row, "shpr_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "shpr_trdp_nm", GRDBCKCORLOR_S);
			}	
			break;
			
		case "cnee_trdp_cd" :
			//cnee_trdp_cd
			TRDPTYPE = "cnee_trdp_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj.GetCellValue(row, "cnee_trdp_cd"), "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "cnee_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "cnee_trdp_nm", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				
				sheetObj.SetCellValue(row, "cnee_trdp_cd","");
				sheetObj.SetCellValue(row, "cnee_trdp_nm","");				
			}else{
				sheetObj.SetCellBackColor(row, "cnee_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "cnee_trdp_nm", GRDBCKCORLOR_S);
			}	
			break;
		case "ntfy_trdp_cd" :
			//ntfy_trdp_cd
			TRDPTYPE = "ntfy_trdp_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj.GetCellValue(row, "ntfy_trdp_cd"), "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "ntfy_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "ntfy_trdp_nm", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				
				sheetObj.SetCellValue(row, "ntfy_trdp_cd","");
				sheetObj.SetCellValue(row, "ntfy_trdp_nm","");	
				
			}else{
				sheetObj.SetCellBackColor(row, "ntfy_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "ntfy_trdp_nm", GRDBCKCORLOR_S);
			}	
			break;
			
		/*	
		case "lnr_trdp_cd" :
			//lnr_trdp_cd
			TRDPTYPE = "lnr_trdp_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj.GetCellValue(row, "lnr_trdp_cd"), "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "lnr_trdp_cd", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				
				sheetObj.SetCellValue(row, "lnr_trdp_cd","");
				sheetObj.SetCellValue(row, "lnr_trdp_nm","");
				
			}else{
				sheetObj.SetCellBackColor(row, "lnr_trdp_cd", GRDBCKCORLOR_S);
			}	
			break;
		*/	
		case "lnr_iata_cd" :
			//lnr_trdp_cd
			TRDPTYPE = "lnr_iata_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpcodeIATA&s_code="+sheetObj.GetCellValue(row, "lnr_iata_cd"), "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "lnr_iata_cd", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				
				sheetObj.SetCellValue(row, "lnr_iata_cd","");
				sheetObj.SetCellValue(row, "lnr_trdp_cd","");
				sheetObj.SetCellValue(row, "lnr_trdp_nm","");
				
			}else{
				sheetObj.SetCellBackColor(row, "lnr_iata_cd", GRDBCKCORLOR_S);
			}				
			break;
			
		case "etd_dt_tm" :
			//edt 필수
			if(sheetObj.GetCellValue(row, "etd_dt_tm") =="" ){
				sheetObj.SetCellBackColor(row, "etd_dt_tm", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_109')); //'ETD is a mandatory field.';
			}else{
				sheetObj.SetCellBackColor(row, "etd_dt_tm", GRDBCKCORLOR_S);
			}
			
			fn_setPostDt(sheetObj);
			break;
		case "eta_dt_tm" :
			fn_setPostDt(sheetObj);
			break;
			
		case "iss_trdp_cd" :
			//issuing Carrier 
			TRDPTYPE = "iss_trdp_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code="+sheetObj.GetCellValue(row, "iss_trdp_cd"), "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "iss_trdp_cd", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				
				sheetObj.SetCellValue(row, "iss_trdp_cd","");
				sheetObj.SetCellValue(row, "iss_trdp_nm","");
				sheetObj.SetCellValue(row, "iss_trdp_addr","");  //4.6.1 BInex_문의_수정사항
				sheetObj.SetCellValue(row, "iata_cd","");  //4.6.1 BInex_문의_수정사항
				
			}else{
				sheetObj.SetCellBackColor(row, "iss_trdp_cd", GRDBCKCORLOR_S);
			}	
			break;		
			
			
		case "pol_cd" :	 // depature
			TRDPTYPE = "pol_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj.GetCellValue(row, "pol_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "pol_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_112')); //'Please check Departure';
				
				sheetObj.SetCellValue(row, "pol_cd","");
				sheetObj.SetCellValue(row, "pol_nm","");				
			}else{
				sheetObj.SetCellBackColor(row, "pol_cd", GRDBCKCORLOR_S);
			}	
			break;				
			
		case "fst_to_cd" :
			//first To
			TRDPTYPE = "fst_to_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj.GetCellValue(row, "fst_to_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "fst_to_cd", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_113')); // 'Please check First To';
				
				sheetObj.SetCellValue(row, "fst_to_cd","");
				sheetObj.SetCellValue(row, "fst_to_nm","");
				
			}else{
				sheetObj.SetCellBackColor(row, "fst_to_cd", GRDBCKCORLOR_S);
			}			
			break;
		
		/*
		case "ts1_port_cd" :
			//Trans 1 by
			TRDPTYPE = "ts1_port_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj.GetCellValue(row, "ts1_port_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "ts1_port_cd", GRDBCKCORLOR_S);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_113')); // 'Please check First To';
				
				sheetObj.SetCellValue(row, "ts1_port_cd","");
				sheetObj.SetCellValue(row, "ts1_port_nm","");
				
			}else{
				sheetObj.SetCellBackColor(row, "ts1_port_cd", GRDBCKCORLOR_S);
			}			
			break;
		*/	
		
		case "pod_cd" :	 //Dest
			TRDPTYPE = "pod_cd";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=Location&s_code="+sheetObj.GetCellValue(row, "pod_cd")+'&air_sea_clss_cd=A', "./GateServlet.gsl");
			if(!trdpCheck){
				sheetObj.SetCellBackColor(row, "pod_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_115')); // 'Please check Dest';
				
				sheetObj.SetCellValue(row, "pod_cd","");
				sheetObj.SetCellValue(row, "pod_nm","");
				
			}else{
				sheetObj.SetCellBackColor(row, "pod_cd", GRDBCKCORLOR_S);
			}	
			break;				
			
		case "pck_qty" :
		case "pck_ut_cd" :
			//package
			/*
			if(sheetObj.GetCellValue(row, "pck_qty") !="" && sheetObj.GetCellValue(row, "pck_ut_cd") ==""){
				sheetObj.SetCellBackColor(row, "pck_qty", GRDBCKCORLOR_F);
				sheetObj.SetCellBackColor(row, "pck_ut_cd", GRDBCKCORLOR_F);
				valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_116')); //'Package is a mandatory field.';
			}else{
				sheetObj.SetCellBackColor(row, "pck_qty", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(row, "pck_ut_cd", GRDBCKCORLOR_S);
				
			}
			*/			
			break;
			
		case "rep_cmdt_nm" :
			//commodity
			TRDPTYPE = "rep_cmdt_nm";
			ajaxSendPost(shprReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=commoditynm&s_code_nm="+sheetObj.GetCellValue(row, "rep_cmdt_nm"), "./GateServlet.gsl");
			if(!trdpCheck){
				//sheetObj.SetCellBackColor(row, "rep_cmdt_nm", GRDBCKCORLOR_F);
				//valMsgArr.push("Row["+ (row-1) +"] "+ refNo +" : " +  getLabel('AIR_MSG_107')); //'Please check SHPR Code';
				
				sheetObj.SetCellValue(row, "rep_cmdt_cd","");
				//commodity  필수아님  코드가 없더라도 저장
				//sheetObj.SetCellValue(row, "rep_cmdt_nm","");				
			}else{
				sheetObj.SetCellBackColor(row, "rep_cmdt_nm", GRDBCKCORLOR_S);
			}			
			break;
			
		case "grs_wgt" :
			weightChange(sheetObj.GetCellValue(row, "grs_wgt"));
			break;
	}
	
	for(var i=0; i<valMsgArr.length; i++){
		formObj.val_msg.value += ("Please check. " + valMsgArr[i] + "\n");
    }	
	
	
	var checkVal  = 0;
	for(var c = 0; c <= sheetObj.LastCol(); c++) {
		//console.log(sheetObj.ColSaveName(c) +'  /  '+ sheetObj.GetCellBackColor(row, sheetObj.ColSaveName(c)) +'  /  '+ GRDBCKCORLOR_F)
		if(sheetObj.GetCellBackColor(row, sheetObj.ColSaveName(c)) == GRDBCKCORLOR_F){
			checkVal += 1
		}
	}
	
	if(checkVal == 0){
		sheetObj.SetCellValue(row, "status", "OK");
		sheetObj.SetCellEditable(row, "auto_chk", 1);
	}else{
		sheetObj.SetCellValue(row, "status", "ERROR");
		sheetObj.SetCellEditable(row, "auto_chk", 0);
		
		formObj.val_msg.focus();
	}
}


function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="shpr_trdp_nm"
			||  sheetObj.ColSaveName(col)=="cnee_trdp_nm"
			||  sheetObj.ColSaveName(col)=="ntfy_trdp_nm"
		){
			sheetObj.SelectCell(row, col);
			fn_openPopupLiner1(sheetObj, row, col, sheetObj.GetCellValue(row, col));
		}
	}
}


function sheet1_OnPopupClick(sheetObj, row, col) {
	if(sheetObj.ColSaveName(col)=="shpr_trdp_cd"
		||  sheetObj.ColSaveName(col)=="cnee_trdp_cd"
		||  sheetObj.ColSaveName(col)=="ntfy_trdp_cd"
		||  sheetObj.ColSaveName(col)=="lnr_trdp_cd"
		||  sheetObj.ColSaveName(col)=="iss_trdp_cd"
		||  sheetObj.ColSaveName(col)=="lnr_iata_cd"
	){
		sheetObj.SelectCell(row, col);
		fn_openPopupLiner1(sheetObj, row, col, "");
	}
	
	if(sheetObj.ColSaveName(col)=="pol_cd"
		||sheetObj.ColSaveName(col)=="fst_to_cd"
		||sheetObj.ColSaveName(col)=="ts1_port_cd"
		||sheetObj.ColSaveName(col)=="pod_cd"
	){
		sheetObj.SelectCell(row, col);
		fn_openPopupLocation1(sheetObj, row, col, "");
	}
	
	if(sheetObj.ColSaveName(col)=="rep_cmdt_nm"){
		sheetObj.SelectCell(row, col);
		fn_openPopupCommodity1(sheetObj, row, col, "");
	}
	
}

function fn_openPopupCommodity1(sheetObj, row , col, nameVlue){
	TRDPTYPE   = sheetObj.ColSaveName(col);
	SHEET1_ROW = row;	
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]="";	//Commodity code
	rtnary[2]=nameVlue;	//Commodity name
	callBackFunc = "FN_COMMODITY_POPLIST";
	/*20170118 #986에 의해 변경*/
	modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");	
}

function FN_COMMODITY_POPLIST(rtnVal){
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(TRDPTYPE == "rep_cmdt_nm"){
			sheetObj.SetCellValue(SHEET1_ROW, "rep_cmdt_cd",rtnValAry[0],0);
			sheetObj.SetCellValue(SHEET1_ROW, "rep_cmdt_nm",rtnValAry[2],0);
			
			sheetObj.SetCellBackColor(SHEET1_ROW, "rep_cmdt_nm", GRDBCKCORLOR_S);
		}
	}	
}


function fn_openPopupLocation1(sheetObj, row , col, nameVlue){
	TRDPTYPE   = sheetObj.ColSaveName(col);
	SHEET1_ROW = row;
	
	rtnary=new Array(3);
	rtnary[0]="A";
	rtnary[1]="BL";
	rtnary[2]="";
	rtnary[3]="";		   		
	//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
	//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
	rtnary[4]= document.getElementById("pol");
	callBackFunc = "FN_LOCATION_POPLIST";
	modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");	
	
}
function FN_LOCATION_POPLIST(rtnVal){
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[0]==''){
			//formObj.shpr_trdp_cd.focus();
		}else{
			if(TRDPTYPE == "pol_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "pol_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "pol_nm",rtnValAry[2],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "pol_cd", GRDBCKCORLOR_S);
			}
			
			if(TRDPTYPE == "fst_to_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "fst_to_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "fst_to_nm",rtnValAry[2],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "fst_to_cd", GRDBCKCORLOR_S);
			}
			
			if(TRDPTYPE == "ts1_port_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "ts1_port_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "ts1_port_nm",rtnValAry[2],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "ts1_port_cd", GRDBCKCORLOR_S);
			}
			
			if(TRDPTYPE == "pod_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "pod_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "pod_nm",rtnValAry[2],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "pod_cd", GRDBCKCORLOR_S);
			}
			
			
			var checkVal  = 0;
			for(var c = 0; c <= sheetObj.LastCol(); c++) {
				if(sheetObj.GetCellBackColor(SHEET1_ROW, sheetObj.ColSaveName(c)) == GRDBCKCORLOR_F){
					checkVal += 1
				}
			}
			
			if(checkVal == 0){
				sheetObj.SetCellValue(SHEET1_ROW, "status", "OK");
				sheetObj.SetCellEditable(SHEET1_ROW, "auto_chk", 1);
			}else{
				sheetObj.SetCellValue(SHEET1_ROW, "status", "ERROR");
				sheetObj.SetCellEditable(SHEET1_ROW, "auto_chk", 0);
			}			
		}
		
	}	
}

function fn_openPopupLiner1(sheetObj, row , col, nameVlue){
	TRDPTYPE   = sheetObj.ColSaveName(col);
	SHEET1_ROW = row;
   
	rtnary=new Array(2);
	rtnary[0]="1";
	var iata_val="";
	var cstmTpCd='';

	rtnary[1] = nameVlue;
	rtnary[2] = window;
	callBackFunc = "FN_LINER_POPLIST";
	modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
	
}

function FN_LINER_POPLIST(rtnVal){
	var sheetObj=docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[0]==''){
			//formObj.shpr_trdp_cd.focus();
		}else{
			if(TRDPTYPE == "shpr_trdp_nm" || TRDPTYPE == "shpr_trdp_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "shpr_trdp_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "shpr_trdp_nm",rtnValAry[2],0);
				sheetObj.SetCellValue(SHEET1_ROW, "shpr_trdp_addr",rtnValAry[7],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "shpr_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(SHEET1_ROW, "shpr_trdp_nm", GRDBCKCORLOR_S);				
			}		
			if(TRDPTYPE == "cnee_trdp_nm" || TRDPTYPE == "cnee_trdp_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "cnee_trdp_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "cnee_trdp_nm",rtnValAry[2],0);
				sheetObj.SetCellValue(SHEET1_ROW, "cnee_trdp_addr",rtnValAry[7],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "cnee_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(SHEET1_ROW, "cnee_trdp_nm", GRDBCKCORLOR_S);						
			}		
			if(TRDPTYPE == "ntfy_trdp_nm" || TRDPTYPE == "ntfy_trdp_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "ntfy_trdp_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "ntfy_trdp_nm",rtnValAry[2],0);
				sheetObj.SetCellValue(SHEET1_ROW, "ntfy_trdp_addr",rtnValAry[7],0);
				sheetObj.SetCellValue(SHEET1_ROW, "acctg_info_txt",rtnValAry[7],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "ntfy_trdp_cd", GRDBCKCORLOR_S);
				sheetObj.SetCellBackColor(SHEET1_ROW, "ntfy_trdp_nm", GRDBCKCORLOR_S);						
			}
			
			if(TRDPTYPE == "lnr_trdp_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "lnr_trdp_cd",rtnValAry[0],0); 
				sheetObj.SetCellValue(SHEET1_ROW, "lnr_trdp_nm",rtnValAry[2],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "lnr_trdp_cd", GRDBCKCORLOR_S);
			}
			if(TRDPTYPE == "lnr_iata_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "lnr_iata_cd",rtnValAry[22],0); 
				sheetObj.SetCellValue(SHEET1_ROW, "lnr_trdp_cd",rtnValAry[0],0); 
				sheetObj.SetCellValue(SHEET1_ROW, "lnr_trdp_nm",rtnValAry[2],0);
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "lnr_iata_cd", GRDBCKCORLOR_S);
			}
			
			if(TRDPTYPE == "iss_trdp_cd"){
				sheetObj.SetCellValue(SHEET1_ROW, "iss_trdp_cd",rtnValAry[0],0);
				sheetObj.SetCellValue(SHEET1_ROW, "iss_trdp_nm",rtnValAry[2],0);
				sheetObj.SetCellValue(SHEET1_ROW, "iss_trdp_addr",rtnValAry[7],0);//4.6.1 BInex_문의_수정사항
				sheetObj.SetCellValue(SHEET1_ROW, "iata_cd",rtnValAry[22],0); //IATA CD//4.6.1 BInex_문의_수정사항
				
				sheetObj.SetCellBackColor(SHEET1_ROW, "iss_trdp_cd", GRDBCKCORLOR_S);
			}
			
			
			var checkVal  = 0;
			for(var c = 0; c <= sheetObj.LastCol(); c++) {
				if(sheetObj.GetCellBackColor(SHEET1_ROW, sheetObj.ColSaveName(c)) == GRDBCKCORLOR_F){
					checkVal += 1
				}
			}
			
			if(checkVal == 0){
				sheetObj.SetCellValue(SHEET1_ROW, "status", "OK");
				sheetObj.SetCellEditable(SHEET1_ROW, "auto_chk", 1);
			}else{
				sheetObj.SetCellValue(SHEET1_ROW, "status", "ERROR");
				sheetObj.SetCellEditable(SHEET1_ROW, "auto_chk", 0);
			}			
		}
		
	}
}


function fn_setPostDt(sheetObj){
	sheetObj.SetCellBackColor(SHEET1_ROW, "eta_dt_tm", GRDBCKCORLOR_S);
	ajaxSendPost(getExpPostRef, 'reqVal', '&goWhere=aj&bcKey=getExpPostRef&f_ofc_cd='+sheetObj.GetCellValue(SHEET1_ROW, "ref_ofc_cd"), './GateServlet.gsl');
	if(ofc_post_dt=="ETA"){
		//eda 필수
		if(sheetObj.GetCellValue(SHEET1_ROW, "eta_dt_tm") =="" ){
			sheetObj.SetCellBackColor(SHEET1_ROW, "eta_dt_tm", GRDBCKCORLOR_F);
		}		
		
		sheetObj.SetCellValue(SHEET1_ROW, "post_dt",sheetObj.GetCellValue(SHEET1_ROW, "eta_dt_tm"),0);
	}else if(ofc_post_dt=="ETD"){
		sheetObj.SetCellValue(SHEET1_ROW, "post_dt",sheetObj.GetCellValue(SHEET1_ROW, "etd_dt_tm"),0);
	}else{
		sheetObj.SetCellValue(SHEET1_ROW, "post_dt",getTodayStr(),0);
	}		
}


function getRefNoCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				refCheck=false;
			}else{
				refCheck=true;
			}
		}
	}else{
		refCheck=false;
	}
}

//#581 [BINEX] MAWB 자동생성 4.6.1 BInex_문의_수정사항
//block 혹은 인보이스가 없는경우 중복된 filing# 삭제 후  재등록
function getRefBlockNinv(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='CR'){
				blockNinv =false;
			}else{
				blockNinv =true;
				dupIntgBlSeq = doc[1];
			}
		}
	}else{
		blockNinv =false;
	}	
}

function shprReq(reqVal){
	var sheetObj1=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			
			//masterVals[0];	//trdp_cd  AS param1
			//masterVals[3];	//eng_nm   AS param2
			//masterVals[1];	//eng_addr  AS param5	
			if(TRDPTYPE == "shpr_trdp_cd"){
				if(sheetObj1.GetCellValue(SHEET1_ROW,"shpr_trdp_nm") == "")
					sheetObj1.SetCellValue(SHEET1_ROW, "shpr_trdp_nm",masterVals[3],0);
				sheetObj1.SetCellValue(SHEET1_ROW, "shpr_trdp_addr",masterVals[1],0);
			}else if(TRDPTYPE == "cnee_trdp_cd"){
				if(sheetObj1.GetCellValue(SHEET1_ROW,"cnee_trdp_nm") == "")
					sheetObj1.SetCellValue(SHEET1_ROW, "cnee_trdp_nm",masterVals[3],0);
				sheetObj1.SetCellValue(SHEET1_ROW, "cnee_trdp_addr",masterVals[1],0);
			}else if(TRDPTYPE == "ntfy_trdp_cd"){
				if(sheetObj1.GetCellValue(SHEET1_ROW,"ntfy_trdp_nm") == "")
					sheetObj1.SetCellValue(SHEET1_ROW, "ntfy_trdp_nm",masterVals[3],0);
				sheetObj1.SetCellValue(SHEET1_ROW, "ntfy_trdp_addr",masterVals[1],0);
				sheetObj1.SetCellValue(SHEET1_ROW, "acctg_info_txt",masterVals[1],0);
			}else if(TRDPTYPE == "lnr_trdp_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "lnr_trdp_nm",masterVals[3],0);
			}else if(TRDPTYPE == "lnr_iata_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "lnr_trdp_cd",masterVals[0],0);
				sheetObj1.SetCellValue(SHEET1_ROW, "lnr_trdp_nm",masterVals[3],0);
			}else if(TRDPTYPE == "iss_trdp_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "iss_trdp_nm",masterVals[3],0);
				sheetObj1.SetCellValue(SHEET1_ROW, "iss_trdp_addr",masterVals[1],0);//4.6.1 BInex_문의_수정사항
				sheetObj1.SetCellValue(SHEET1_ROW, "iata_cd",masterVals[17],0);//4.6.1 BInex_문의_수정사항
			}else if(TRDPTYPE == "pol_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "pol_nm",masterVals[3],0);
			}else if(TRDPTYPE == "pod_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "pod_nm",masterVals[3],0);
			}else if(TRDPTYPE == "fst_to_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "fst_to_nm",masterVals[3],0);
			}else if(TRDPTYPE == "ts1_port_cd"){
				sheetObj1.SetCellValue(SHEET1_ROW, "ts1_port_nm",masterVals[3],0);
			}else if(TRDPTYPE == "rep_cmdt_nm"){
				if(rtnArr.length==2) //조회 결과가 하나일경우
					sheetObj1.SetCellValue(SHEET1_ROW, "rep_cmdt_cd",masterVals[0],0);
			}
			trdpCheck = true;
		}else{
			trdpCheck = false;
		}
	}else{
		trdpCheck = false;
	}
}	

function getExpPostRef(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]!=''){
				ofc_post_dt=doc[1];
			}
		}
	}
}


function weightChange(grsWgt){
	var sheetObj1=docObjects[0];
	
	/*
	if(user_ofc_cnt_cd=="US"){
		//formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		//fn_chkComma(formObj.grs_wgt1,8,1);
		var grs_wgt1 = roundXL(grsWgt * CNVT_CNST_KG_LB, 0);
		sheetObj1.SetCellValue(SHEET1_ROW, "grs_wgt1", fn_chkComma(grs_wgt1,8,1),0);
		
		
		//formObj.chg_wgt1.value = formObj.grs_wgt1.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "chg_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
		//formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_grs_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
		//setPrtRateVol("bl_grs_wgt1");
		
		//formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_chg_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
		//setPrtRateVol("bl_chg_wgt1");
		
		//formObj.chg_wgt.value = formObj.grs_wgt.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "chg_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
		//formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_grs_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
		//setPrtRateVol("bl_grs_wgt");
		
		//formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_chg_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
		//setPrtRateVol("bl_chg_wgt");
		
	} else if (user_ofc_cnt_cd=="DE") {			
		//formObj.grs_wgt.value = Math.ceil( Number(formObj.grs_wgt.value.replaceAll(",","")) / 0.5) * 0.5;
		var deGrsWgt = Math.ceil( Number(grsWgt) / 0.5) * 0.5;
		sheetObj1.SetCellValue(SHEET1_ROW, "grs_wgt", fn_chkComma(deGrsWgt,8,1),0);
		//formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		//formObj.grs_wgt1.value = Math.ceil( Number(formObj.grs_wgt1.value.replaceAll(",","")) / 0.5) * 0.5;
		//fn_chkComma(formObj.grs_wgt,8,1);
		//fn_chkComma(formObj.grs_wgt1,8,1);
		var grs_wgt1 = roundXL(deGrsWgt * CNVT_CNST_KG_LB, 0);
			grs_wgt1 = Math.ceil( Number(grs_wgt1) / 0.5) * 0.5;
		sheetObj1.SetCellValue(SHEET1_ROW, "grs_wgt1", fn_chkComma(grs_wgt1,8,1),0);
		
		// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
		//if (getSumHblYn == "Y") return;
		
		//formObj.chg_wgt1.value = formObj.grs_wgt1.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "chg_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
		//formObj.bl_grs_wgt1.value = formObj.grs_wgt1.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_grs_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
		//setPrtRateVol("bl_grs_wgt1");
		
		//formObj.bl_chg_wgt1.value = formObj.grs_wgt1.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_chg_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
		//setPrtRateVol("bl_chg_wgt1");
		
		//formObj.chg_wgt.value = formObj.grs_wgt.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "chg_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
		
		//formObj.bl_grs_wgt.value = formObj.grs_wgt.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_grs_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
		//setPrtRateVol("bl_grs_wgt");
		
		//formObj.bl_chg_wgt.value = formObj.grs_wgt.value;
		sheetObj1.SetCellValue(SHEET1_ROW, "bl_chg_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
		//setPrtRateVol("bl_chg_wgt");
	} else {
		//formObj.grs_wgt1.value = roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		//fn_chkComma(formObj.grs_wgt1,8,1);
		var grs_wgt1 = roundXL(grsWgt * CNVT_CNST_KG_LB, 0);
		sheetObj1.SetCellValue(SHEET1_ROW, "grs_wgt1", fn_chkComma(grs_wgt1,8,1),0);
		
	}
	*/
	
	//4.6.1 BInex_문의_수정사항 
	var grs_wgt1 = roundXL(grsWgt * CNVT_CNST_KG_LB, 0);
	sheetObj1.SetCellValue(SHEET1_ROW, "grs_wgt1", fn_chkComma(grs_wgt1,8,1),0);
	sheetObj1.SetCellValue(SHEET1_ROW, "chg_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
	sheetObj1.SetCellValue(SHEET1_ROW, "bl_grs_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
	sheetObj1.SetCellValue(SHEET1_ROW, "bl_chg_wgt1", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt1"),0);
	sheetObj1.SetCellValue(SHEET1_ROW, "chg_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
	sheetObj1.SetCellValue(SHEET1_ROW, "bl_grs_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
	sheetObj1.SetCellValue(SHEET1_ROW, "bl_chg_wgt", sheetObj1.GetCellValue(SHEET1_ROW,"grs_wgt"),0);
}



/**
 * 소수점 이하 값을 체크함
 */
function fn_chkComma(intoVal, firstLen, secondLen){
	intoVal += "";
	
	if(intoVal.substring(0,1) == '.'){
		intoVal='0' + intoVal;
	}
	if(intoVal==''){
		return;
	}else{
		intoVal=rmMoneyFmt(intoVal);
		var bgnNum='';
		var totLen=intoVal.length;
		var curLen=intoVal.indexOf('.');
		var lftLen=0;
		if(curLen==-1){
			lftLen=secondLen;
			intoVal=intoVal+'.';
		}else{
			lftLen=(totLen-curLen)-1;
			lftLen=secondLen-lftLen;
		}
		for(var i=0; i < lftLen; i++){
			intoVal=intoVal+'0';
		}
		return doMoneyFmt(intoVal);
	}
}

