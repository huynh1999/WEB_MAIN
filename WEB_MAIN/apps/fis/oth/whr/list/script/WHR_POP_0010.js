function doWork(srcName) {
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	switch (srcName) {
		case "SEARCHLIST":
			if(!formValidation()) return;
			// sheetObj.ShowDebugMsg = true;
			if(!searchValid()) return;
			formObj.f_cmd.value=SEARCHLIST;
			// 검증로직
 			var xml = sheetObj.GetSearchData("WHR_POP_0010GS.clt", FormQueryString(formObj) );
 			
 			sheetObj.LoadSearchData(xml);
 			
		break;
		case "CLOSE":
			ComClosePopup();
	    break;
		case "APPLY":
			applyMultiWH();
	    break;	   	
	}
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
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "trdpCode_maker"){
				formObj.f_maker_cd.value=masterVals[0]; 
				formObj.f_maker_nm.value=masterVals[3];//loc_nm
			}
			if(CODETYPE == "trdpCode_shipper"){
				formObj.f_shpr_cd.value=masterVals[0]; 
				formObj.f_shpr_nm.value=masterVals[3];//loc_nm
			}
			if(CODETYPE == "trdpCode_consignee"){
				formObj.f_cnee_cd.value=masterVals[0]; 
				formObj.f_cnee_nm.value=masterVals[3];//loc_nm
			}
			if(CODETYPE == "trdpCode_wh"){
				formObj.f_wh_cd.value=masterVals[0]; 
				formObj.f_wh_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "trdpCode_maker"){
				formObj.f_maker_cd.value=""; 
				formObj.f_maker_nm.value="";
			}
			if(CODETYPE == "trdpCode_shipper"){
				formObj.f_shpr_cd.value=""; 
				formObj.f_shpr_nm.value="";
			}
			if(CODETYPE == "trdpCode_consignee"){
				formObj.f_cnee_cd.value=""; 
				formObj.f_cnee_nm.value="";
			}
			if(CODETYPE == "trdpCode_wh"){
				formObj.f_wh_cd.value=""; 
				formObj.f_wh_nm.value="";
			}
		}
	}else{
		//Error occurred!
		alert(getLabel('FMS_COM_ERR001'));	
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
var whRecpNo=sheetObj.GetCellValue(Row,"wh_recp_no");
var poNo=sheetObj.GetCellValue(Row,"po_no");
var shprCd=sheetObj.GetCellValue(Row,"shpr_cd");
var shprNm=sheetObj.GetCellValue(Row,"shpr_nm");
var cneeCd=sheetObj.GetCellValue(Row,"cnee_cd");
var cneeNm=sheetObj.GetCellValue(Row,"cnee_nm");
var pckQty=sheetObj.GetCellValue(Row,"pck_qty");
var length=sheetObj.GetCellValue(Row,"length");
var width=sheetObj.GetCellValue(Row,"width");
var height=sheetObj.GetCellValue(Row,"height");
var wgtK=sheetObj.GetCellValue(Row,"wgt_k");
var wgtL=sheetObj.GetCellValue(Row,"wgt_l");
var cbm=sheetObj.GetCellValue(Row,"meas");

	if(parent.multiWhFlg=="Y"){
		return;
	}
	if(sheetObj.GetCellValue(Row, "shpd") == '1'){
		alert(getLabel('SUP_COM_ALT013'));
		return;
	}
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "trdp_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "shrt_nm"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "full_nm"));
retArray += "'"+sheetObj.GetCellValue(Row, "wh_recp_no")+"'";	//0
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "po_no");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpr_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpr_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cnee_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cnee_nm");	//5
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "pck_qty");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "wgt_k");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "wgt_l");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "meas");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "length");		//10
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "width");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "height");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpr_eng_addr");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "cnee_eng_addr"); //14
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "maker_cd");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "maker_nm");
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "maker_eng_addr");	//17
	retArray += "|";
retArray += sheetObj.GetCellValue(Row, "shpd");			//18

/*Vinh.Vo - 04/22/2015 (S)*/
retArray += "|";
retArray += sheetObj.GetCellValue(Row, "act_wgt_k");			//19
retArray += "|";
retArray += sheetObj.GetCellValue(Row, "act_wgt_l");			//20
/*Vinh.Vo - 04/22/2015 (E)*/

	//alert(retArray);
	ComClosePopup(retArray); 
}
/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
var rtnary=new Array(3);
var callBackFunc = "";

function doDisplay(doWhat, frm1){
	var formObj=document.frm1;
    switch(doWhat){
        case 'REPT_DATE':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_rept_fmdt, formObj.f_rept_todt, 'MM-dd-yyyy');
        break;
        case 'WH_POPLIST':
        	rtnary=new Array(1);
    		rtnary[0]="1";
    		rtnary[1]="";
    		rtnary[2]=window;
    		var cstmTpCd='CS';
    		
    		callBackFunc = "WH_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
    		
        break;
        case 'MAKER_POPLIST':
        	rtnary=new Array(1);
    		rtnary[0]="1";
    		rtnary[1]="";
    		rtnary[2]=window;
    		var cstmTpCd='CS';
    		
    		callBackFunc = "MAKER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
    		
        break;
        case 'SHIPPER_POPLIST':
        	rtnary=new Array(1);
        	rtnary[0]="1";
        	rtnary[1]="";
        	rtnary[2]=window;
        	var cstmTpCd='CS';
        	
        	callBackFunc = "SHIPPER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        	
        	break;
        case 'CONSIGNEE_POPLIST':
        	rtnary=new Array(1);
        	rtnary[0]="1";
        	rtnary[1]="";
        	rtnary[2]=window;
        	var cstmTpCd='CS';

        	callBackFunc = "CONSIGNEE_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        	
        	break;
       	case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   	 		rtnary=new Array(1);
   	 		rtnary[0]="1";
   	 		// 2011.12.27 value parameter
	   		if(typeof(formObj.f_shpr_nm.value)!='undefined'){
	   			rtnary[1]=formObj.f_shpr_nm.value;
	   		}
	   		else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
	   		
	   	 	callBackFunc = "SHIP_TRDP_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		             
	   	 		break;
		case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		var rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(formObj.f_cnee_nm.value)!='undefined'){
		   			rtnary[1]=formObj.f_cnee_nm.value;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
	   	 		
		   		callBackFunc = "CNEE_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   		
	   	 		break;   	 		
		case "MAKER_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(formObj.f_maker_nm.value)!='undefined'){
		   			rtnary[1]=formObj.f_maker_nm.value;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "MAKER_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   		
	   	 		break;   	 	   	
		case "WH_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		var rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(formObj.f_wh_nm.value)!='undefined'){
		   			rtnary[1]=formObj.f_wh_nm.value;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "MAKER_TRDP_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   		
	   	 		break;   	 	   	 		   	 		 		
    }
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
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
    //doWork('SEARCHLIST');
    //사용자가 저장한 Header 정보를 읽어온다.
	var formObj=document.frm1;
    //IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
    setFromToDtEndPlus(formObj.f_rept_fmdt, 60, formObj.f_rept_todt, 0);
    doWork("SEARCHLIST");
    if(parent.multiWhFlg!="Y"){
    	$('#btn_apply').hide();
    }
	sheet1_OnLoadFinish(sheet1);
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
        	    with(sheetObj){
             
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('WHR_POP_0010_HDR1'), Align:"Center"},{ Text:getLabel('WHR_POP_0010_HDR2'), Align:"Center"} ];
           InitHeaders(headers, info);
           var cols = [  {Type:"CheckBox",  Hidden:parent.multiWhFlg=="Y"?0:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"check_flag" },
        	      {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"wh_recp_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"wh_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",      Hidden:0,  Width:85,   Align:"Center",  ColMerge:1,   SaveName:"recp_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"status",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"maker_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"op_use_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"po_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Int",       Hidden:0,  Width:35,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"wgt_k",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"wgt_l",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"meas",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:0,   EditLen:12 },
                  {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"length",          KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
                  {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"width",           KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
                  {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"height",          KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"maker_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"shpr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cnee_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"maker_eng_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"shpr_eng_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cnee_eng_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"shpd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"act_wgt_k",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
                  {Type:"Float",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"act_wgt_l",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
                  {Type:"Text",     Hidden:1,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"exist_flg",           KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
            
           InitColumns(cols);

           SetEditable(1);
           //InitViewFormat(0, "recp_dt_tm", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
           SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
           SetColProperty("status", {ComboText:WHCD2, ComboCode:WHCD1} );
           SetSheetHeight(380);
           }

                                 
           break;
     }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
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
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function searchValid(){
	var formObj=document.frm1;
	if(formObj.chkShpd.checked){
		formObj.f_shpd.value="1";
	}else{
		formObj.f_shpd.value="0";
	}
	if(trim(formObj.f_rept_fmdt.value) == "" &&
	   trim(formObj.f_rept_todt.value) == "" &&
	   trim(formObj.f_maker_cd.value) == "" &&
	   trim(formObj.f_po_no.value) == "" &&
	   trim(formObj.f_shpr_cd.value) == "" &&
	   trim(formObj.f_wh_cd.value) == "" &&
	   trim(formObj.f_cnee_cd.value) == "" ){
		alert(getLabel('FMS_COM_ALT001'));
		formObj.f_rept_fmdt.focus();
		return false;
	}
	return true;
}
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.f_rept_fmdt.value)!= "" && trim(formObj.f_rept_todt.value) != ""){
		if(getDaysBetweenFormat(formObj.f_rept_fmdt,formObj.f_rept_todt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.f_rept_todt.focus();
			return false;
		}
	}	
	return true;
}
function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
	//if(keyCode==13 && sheetObj.CellValue(row, "ibflag1") != "I"){
		sheet1_OnDblClick(sheetObj, row, col);
	//}
}

function WH_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_wh_cd.value=rtnValAry[0];
		formObj.f_wh_nm.value=rtnValAry[2];
	}
}

function MAKER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_maker_cd.value=rtnValAry[0];
		formObj.f_maker_nm.value=rtnValAry[2];// loc_nm
	}
}
function SHIPPER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_cd.value=rtnValAry[0];
		formObj.f_shpr_nm.value=rtnValAry[2];// loc_nm
	}
}
function CONSIGNEE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_cd.value=rtnValAry[0];
		formObj.f_cnee_nm.value=rtnValAry[2];// loc_nm
	}
}
function SHIP_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		}
		else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_shpr_cd.value=rtnValAry[0];//
			formObj.f_shpr_nm.value=rtnValAry[2];//full_nm
		}
	}

function CNEE_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		}
		else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_cnee_cd.value=rtnValAry[0];//
			formObj.f_cnee_nm.value=rtnValAry[2];//full_nm
		}
	}

function MAKER_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		}
		else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_maker_cd.value=rtnValAry[0];//
			formObj.f_maker_nm.value=rtnValAry[2];//full_nm
		}
	}

function WH_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
		}
		else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_wh_cd.value=rtnValAry[0];//
			formObj.f_wh_nm.value=rtnValAry[2];//full_nm
		}
	}

function sheet1_OnLoadFinish(sheetObj) {
	if(sheetObj.LastRow() == 1){
		setTimeout("fn_setFocus()",1000);
	}
}

function fn_setFocus() {
	var formObj=document.frm1;
	formObj.f_wh_recp_no.focus();
}
function applyMultiWH(){
	var retArray="";
	var sheetObj=docObjects[0];
	var whRecpNo = [];
	var act_wgt_k=0;
	var act_wgt_l=0;
	var wgt_l=0;
	var wgt_k=0;
	var meas=0;
	var shpd;
	for(var i = 2; i <= sheetObj.LastRow(); i++){
		if (sheetObj.GetCellValue(i, "check_flag") == "0") {
			continue;
		}
		if (sheetObj.GetCellValue(i, "exist_flg") != 'Y'){
			whRecpNo.push(sheetObj.GetCellValue(i,"wh_recp_no"));
			shpd = sheetObj.GetCellValue(i, "shpd");
		}
		act_wgt_k += parseFloat(sheetObj.GetCellValue(i, "act_wgt_k"));
		act_wgt_l += parseFloat(sheetObj.GetCellValue(i, "act_wgt_l"));
		wgt_l += parseFloat(sheetObj.GetCellValue(i, "wgt_l"));
		wgt_k += parseFloat(sheetObj.GetCellValue(i, "wgt_k"));
		meas += parseFloat(sheetObj.GetCellValue(i, "meas"));
	}
	if(whRecpNo.length==0){
		alert(getLabel('FMS_COM_ALT010'));
		return;
	}
	if(shpd == '1'){
		alert(getLabel('SUP_COM_ALT013'));
		return;
	}
	act_wgt_k = parent.roundXL(act_wgt_k,3);
	act_wgt_l = parent.roundXL(act_wgt_l,3);
	wgt_l = parent.roundXL(wgt_l,3);
	wgt_k = parent.roundXL(wgt_k,3);
	meas = parent.roundXL(meas,3);
	retArray += "'" + whRecpNo.join("','") + "'";	//0
	retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";	//5
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += wgt_k;
		retArray += "|";
	retArray += wgt_l;
		retArray += "|";
	retArray += meas;
		retArray += "|";
	retArray += " ";		//10
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " "; //14
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";
		retArray += "|";
	retArray += " ";	//17
		retArray += "|";
	retArray += shpd;			//18
	retArray += "|";
	retArray += act_wgt_k;			//19
	retArray += "|";
	retArray += act_wgt_l;			//20
	ComClosePopup(retArray); 
}
function sheet1_OnSearchEnd(errMsg){
	var sheetObj=docObjects[0];
	for(var i = 2; i <= sheetObj.LastRow(); i++){
		if (sheetObj.GetCellValue(i, "exist_flg") == "Y") {
			sheetObj.SetCellValue(i,'check_flag',1);
			sheetObj.SetCellEditable(i,'check_flag',0)
		}
	}

}