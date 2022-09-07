/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0080.js
*@FileTitle  : MAWB Stock 등록 및 수정 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================*/
//전역변수를 선언한다.
var PREDAY;
var SELECTROW="";
var SAVE_FLAG="";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    var sheetObj2=docObjects[2];
    var formObj=document.frm1;
    switch(srcName) {
    	case "SEARCHLIST":
    		doWork("SEARCHLIST01");
    	break;
		case "SEARCHLIST01":
		    if(formObj.f_awb_type[0].checked){
		    	formObj.f_awb_type.value="CL";
		    }else{
		    	formObj.f_awb_type.value="EX";
		    }
		    sheetObj.RemoveAll();
			sheetObj1.RemoveAll();
			sheetObj2.RemoveAll();
            formObj.f_cmd.value=SEARCHLIST01;
            sheetObj1.DoSearch("AIE_BMD_0081GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST02":
		    if(formObj.f_awb_type[0].checked){
		    	formObj.f_awb_type.value="CL";
		    }else{
		    	formObj.f_awb_type.value="EX";
		    }
            formObj.f_cmd.value=SEARCHLIST02;
            sheetObj2.DoSearch("AIE_BMD_0082GS.clt", FormQueryString(formObj) );
		break;
		case "EXCEL":
			if(docObjects[2].RowCount() < 1){//no data	
				ComShowCodeMessage("COM132501");
			}else{
		 		docObjects[2].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[2]), SheetDesign:1,Merge:1 });
			}
		break;
		case "ADD":
			if(sheetObj2.RowCount()== 0){
				//No data to save 
				alert(getLabel('FMS_COM_ALT009'));
				return;
			}
			if(formObj.f_awb_type[0].checked){
		    	formObj.f_awb_type.value="CL";
		    }
			else{
		    	formObj.f_awb_type.value="EX";
		    }
			formObj.f_cmd.value=ADD;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
                doProcess=true;
                sheetObj2.DoSave("AIE_BMD_0082GS.clt", FormQueryString(formObj),"m_ibflag", false);
            }
            break;
		case "SUMMARY_DELETE": //#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
			if(sheetObj1.SearchRows()== 0){
				return;
			} 
			if(formObj.s_delt_flg.value != "Y"){
				return; 
			}
			if(formObj.s_not_del_cnt.value != "0"){
				return; 
			}
			if(formObj.s_aloc_area_cd.value == "" || formObj.s_iata_cd.value == "" || formObj.s_bl_st.value == "" || formObj.s_bl_lst.value == "" || formObj.s_receipt_dt.value == ""){
				//alert('필수체크');
				return; 
			}
			
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
				formObj.f_cmd.value=REMOVE;
				//데이터이동
            	fieldToGrid();
				doProcess=true;
				doShowProcess();
				sheetObj.DoSave("AIE_BMD_0083GS.clt", FormQueryString(formObj),"ibflag", false);
     	    }
		    break;
		case "CREATE":
			// 입력된 수 비교 
			// 두수의 차이가 10000이상일 경우 에러 
			if ((Number(formObj.s_bl_lst.value)-Number(formObj.s_bl_st.value))>10000){
				alert(getLabel('AIR_MSG_098') + "\n - " + "\n\n: AIE_BMD_0080.82");
				formObj.s_bl_lst.value="";
				formObj.s_bl_lst.focus();
				return;
			}
			if(formObj.s_aloc_area_cd.disabled == true){
				displayNew();
				return;
			}
			if(formObj.f_awb_type[0].checked){
		    	formObj.f_awb_type.value="CL";
		    }else{
		    	formObj.f_awb_type.value="EX";
		    }
			if(sheetObj1.SearchRows()> 0){
				//Click the new button.
				//alert(getLabel('') + "\n\n: AIE_BMD_0080.92");
				return;
			}
		    if(formObj.s_aloc_area_cd.value == ""){
		    	//[Office] is mandatory field.
		    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_OFCE') + getLabel('FMS_COD_CODE'));
		    	formObj.s_aloc_area_cd.focus();
		    	return;
		    }
		    if(formObj.s_iata_cd.value == ""){
		    	//[IATA CD] is mandatory field.
		    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_IATA') + getLabel('FMS_COD_CODE'));
		    	formObj.s_iata_cd.focus();
		    	return;
		    }
		    if(formObj.s_bl_st.value == ""){
		    	//[Start MAWB NO] is mandatory field.
		    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_MAWB') + getLabel('FMS_COD_NUM_'));
		    	formObj.s_bl_st.focus();
		    	return;
		    }
		    if(formObj.s_bl_st.value.length < 7){
		    	//[Start MAWB NO] is mandatory field.
		    	alert(getLabel('FMS_COM_ALT031') + "\n - " + getLabel('FMS_COD_MAWB') + getLabel('FMS_COD_NUM_'));
		    	formObj.s_bl_st.focus();
		    	return;
		    }
		    if(formObj.s_bl_lst.value == ""){
		    	//[Last MAWB NO] is mandatory field
		    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_MAWB') + getLabel('FMS_COD_NUM_'));
		    	formObj.s_bl_lst.focus();
		    	return;
		    }
		    if(formObj.s_bl_lst.value.length < 7){
		    	//[Last MAWB NO] is mandatory field.
		    	alert(getLabel('FMS_COM_ALT031') + "\n - " + getLabel('FMS_COD_MAWB') + getLabel('FMS_COD_NUM_'));
		    	formObj.s_bl_lst.focus();
		    	return;
		    }
		    if(formObj.s_receipt_dt.value == ""){
		    	//[Receipt] is mandatory field.
		    	alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_RECP'));
		    	formObj.s_receipt_dt.focus();
		    	return;
		    }
		    if(formObj.s_bl_st.value*1 > formObj.s_bl_lst.value*1 ){
            	alert(getLabel('AIR_MSG_094'));
		    	formObj.s_bl_st.focus();
		    	return;
            }
		    // ST CODE 중복체크
			if (!checkStCd()){
				alert(getLabel('AIE_BMD_MSG49'));
				return;
			} 
			formObj.f_cmd.value=COMMAND01;
            if(confirm(getLabel('FMS_COM_CFMCRE'))) {
            	//데이터이동
            	fieldToGrid();
                doProcess=true;
                sheetObj.DoSave("AIE_BMD_0083GS.clt", FormQueryString(formObj),"ibflag", false);
            }
            break;
		case "UPLOAD":
           		var reqParam="";
           		if(formObj.s_awb_type[0].checked){
               		reqParam="CL";
               	}
           		else{
               		reqParam="EX";
               	}
           		
//           	2016.04.14 C.W.Park Modified
//       		#52501
//       		xml upload 실행 후 upload 버튼 작동 안하는 버그 수정
           		
//           		if(window._childwin){ // 새창이 띄워져 있을때
//			        window._childwin.focus();
//			    } 
//           		else{   // 새창이 띄워져 있지 않을때*/
//			        //window._childwin=popGET('./AIE_BMD_0081.clt?_pgmId=AIE_BMD_0081&awbtype='+reqParam, 'CNAUPLOAD', 556, 150, "scroll:no;status:no;help:no;");
//			    }
           		
           		popGET('./AIE_BMD_0081.clt?_pgmId=AIE_BMD_0081&awbtype='+reqParam, 'CNAUPLOAD', 556, 150, "scroll:no;status:no;help:no;");

			    /*
               	var rtnary=new Array(1);
               	if(formObj.s_awb_type[0].checked){
               		rtnary[0]="CL";
               	}else{
               		rtnary[0]="EX";
               	}
	   	        var rtnVal =  ComOpenWindow('SND_POP.clt?_pgmId=MGT-STK-0011&awbtype='+rtnary[0],  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:200px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.singed_by_in.value=rtnValAry[0];
					formObj.upload_img.src="http://localhost:8001/fwd/upload/"+rtnValAry[0];
					formObj.upload_img.width="294";
					formObj.upload_img.height="60";
				}
				*/
        break;
		case "NEW":
			displayNew();
			// var currLocUrl = this.location.href;
			// currLocUrl = currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			// currLocUrl = '.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
			// parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var formObj=document.frm1;
    formObj.s_receipt_dt.value=getTodayStr();
    //공통 selectList를 가져온다. Ajax
	//comSelectList();
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
             (10, 0, 0, true);

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('AIE_BMD_0080_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"stk_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"crr_iata_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aloc_area_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"crr_agn_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"auth_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"allc_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"st_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"lst_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);

             SetEditable(1);
             sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
         case 2:      //IBSheet1 init
            with (sheetObj) {
             (12, 0, 0, true);

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('AIE_BMD_0080_HDR2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"s_Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:0,  Width:140,  Align:"Center",  ColMerge:1,   SaveName:"s_crr_iata_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"s_aloc_area_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"s_allc_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Int",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"s_use_tot",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Int",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"s_stk_tot",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_st_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_lst_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_stk_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_usrid",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_usrnm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
              //#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
              {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_delt_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"s_not_del_cnt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
               ];
              
             InitColumns(cols);

             SetEditable(1);
             InitViewFormat(0, "s_allc_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
             SetSheetHeight(185);
             sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
        case 3:      //IBSheet1 init
            with (sheetObj) {

            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('AIE_BMD_0080_HDR3'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ 
                {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_check" },
                {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"m_ibflag" },
                {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"m_Seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"m_stk_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:110,   Align:"Center",  ColMerge:1,   SaveName:"m_crr_iata_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"m_edi_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"m_aloc_area_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"m_allc_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"m_st_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"m_lst_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:190,  Align:"Center",  ColMerge:1,   SaveName:"m_mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"m_pre_bkg_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"m_use_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"m_auth_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:110,  Align:"Center",  ColMerge:1,   SaveName:"m_crr_agn_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             
            InitColumns(cols);

            SetEditable(1);
            InitViewFormat(0, "m_allc_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
            SetSheetHeight(250);
            SetColProperty("m_pre_bkg_flg", {ComboText:"Yes|No", ComboCode:"Y|N"} );
            SetColProperty("m_use_flg", {ComboText:"Yes|No", ComboCode:"Y|N"} );
            sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
            resizeSheet();
           }
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[2]);
}

//Create를 하기위해 field 데이터를 Grid로 이동한다.
function fieldToGrid(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	sheetObj.DataInsert();
	if(formObj.s_awb_type[0].checked){
		sheetObj.SetCellValue(1,"stk_tp_cd","CL");
	}else{
		sheetObj.SetCellValue(1,"stk_tp_cd","EX");
	}
	sheetObj.SetCellValue(1,"crr_iata_cd",formObj.s_iata_cd.value);
	sheetObj.SetCellValue(1,"aloc_area_cd",formObj.s_aloc_area_cd.value);
//	sheetObj.CellValue(1,"crr_agn_no") 		= formObj.s_agent.value;
	sheetObj.SetCellValue(1,"crr_agn_no","17300170016");
	sheetObj.SetCellValue(1,"allc_dt",formObj.s_receipt_dt.value.replaceAll("-", ""));
	sheetObj.SetCellValue(1,"st_no",formObj.s_bl_st.value);
	sheetObj.SetCellValue(1,"lst_no",formObj.s_bl_lst.value);
}
//조회 후
function sheet1_OnSearchEnd(){
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	if(sheetObj1.SearchRows()== 0){
		displayClear();
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	//#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
	if(formObj.f_cmd.value != REMOVE){
//		alert("Created MASTER NO. ");
		alert(getLabel('AIR_MSG_060'));
	}
	doHideProcess();

	formObj.s_bl_st.value="";
	formObj.s_bl_lst.value="";
//	comSelectList();
	//조회조건을 셋팅한다.
	formObj.f_iata_cd.value=formObj.s_iata_cd.value;
	if(formObj.s_awb_type[0].checked){
		formObj.f_awb_type[0].checked=true;
	}else{
		formObj.f_awb_type[1].checked=true;
	}
	//Summary 조회를 한다.
	doWork("SEARCHLIST01");
}
//조회 후
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	var row=1;
	if(SELECTROW != ""){
		row=SELECTROW;
		sheetObj1.SelectCell(row, 0);
	}
	//포커스색상을 준다.
	for(var i=0; i<sheetObj1.LastCol(); i++){
		sheetObj1.SetRowBackColor(row,"#DFFFFF");
		for(var j=1; j<=sheetObj1.RowCount(); j++){
			if(j != row){
				sheetObj1.SetRowBackColor(j,"#EFEBEF");
			}
		}
	}
	formObj.f_st_no.value=sheetObj1.GetCellValue(row, "s_st_no");
	formObj.f_lst_no.value=sheetObj1.GetCellValue(row, "s_lst_no");
	if(sheetObj1.GetCellValue(row, "s_aloc_area_cd") != null && sheetObj1.GetCellValue(row, "s_aloc_area_cd") != "" && sheetObj1.GetCellValue(row, "s_aloc_area_cd") != "null" && sheetObj1.GetCellValue(row, "s_aloc_area_cd") != "-1"){
		if(sheetObj1.GetCellValue(row, "s_stk_tp_cd") == "CL"){
			formObj.s_awb_type[0].checked=true;
		}else{
			formObj.s_awb_type[1].checked=true;
		}
	formObj.s_aloc_area_cd.value=sheetObj1.GetCellValue(row, "s_aloc_area_cd");
	formObj.s_iata_cd.value=sheetObj1.GetCellValue(row, "s_crr_iata_cd");
	formObj.s_bl_st.value=sheetObj1.GetCellValue(row, "s_st_no");
	formObj.s_bl_lst.value=sheetObj1.GetCellValue(row, "s_lst_no");
	if(sheetObj1.GetCellValue(row, "s_allc_dt") != null && sheetObj1.GetCellValue(row, "s_allc_dt") != "" && sheetObj1.GetCellValue(row, "s_allc_dt") != "null" && sheetObj1.GetCellValue(row, "s_allc_dt") != "-1"){
		formObj.s_receipt_dt.value=sheetObj1.GetCellValue(row, "s_allc_dt");
			formObj.s_receipt_dt.value=formObj.s_receipt_dt.value.substring(4,6) + "-" + formObj.s_receipt_dt.value.substring(6,8) + "-" + formObj.s_receipt_dt.value.substring(0,4);
		}else{
			formObj.s_receipt_dt.value="";
		}
		formObj.s_oper_usrid.value=sheetObj1.GetCellValue(row, "s_usrid");
		formObj.s_oper_usrnm.value=sheetObj1.GetCellValue(row, "s_usrnm");
		
		//#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
		formObj.s_delt_flg.value=sheetObj1.GetCellValue(row, "s_delt_flg");
		formObj.s_not_del_cnt.value=sheetObj1.GetCellValue(row, "s_not_del_cnt");
		if(formObj.s_delt_flg.value == "Y"){
			document.getElementById("sbtncreate").style.display = 'none';
			if(formObj.s_not_del_cnt.value != "0"){
				document.getElementById("sbtnDelete").style.display = 'none';
			}else{
				document.getElementById("sbtnDelete").style.display = '';
			}
		}else{
			document.getElementById("sbtncreate").style.display = ''; 
			document.getElementById("sbtnDelete").style.display = 'none';
		}
		
		//formObj.s_iata_cd.className     		= "search_form-disable";
		formObj.s_bl_st.className="search_form-disable";
		formObj.s_bl_lst.className="search_form-disable";
		formObj.s_receipt_dt.className="search_form-disable";
		formObj.s_iata_cd.readOnly=true;
		formObj.s_bl_st.readOnly=true;
		formObj.s_bl_lst.readOnly=true;
		formObj.s_receipt_dt.readOnly=true;
	}else{
		formObj.s_awb_type[0].checked=true;
		formObj.s_aloc_area_cd.value="";
		formObj.s_iata_cd.value="";
		formObj.s_bl_st.value="";
		formObj.s_bl_lst.value="";
		formObj.s_receipt_dt.value=getTodayStr();
		formObj.s_oper_usrid.value=formObj.usrid.value;
		formObj.s_oper_usrnm.value=formObj.usrnm.value;
		//#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
		if(sheetObj1.RowCount() == 0){
			formObj.s_delt_flg.value='';
			formObj.s_not_del_cnt.value='';
			
			if(formObj.f_delt_flg.value == "Y"){
				document.getElementById("sbtncreate").style.display = 'none';
				document.getElementById("sbtnDelete").style.display = 'none';
			}else{
				document.getElementById("sbtncreate").style.display = ''; 
				document.getElementById("sbtnDelete").style.display = 'none';
			}
		}
	}
//	
//	if(SAVE_FLAG != "Y"){
//		//MAWB LIST조회
//		doWork("SEARCHLIST02");
//	}
}
//MAWB LIST를 조회한다.
function sheet2_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	//포커스색상을 준다.
	for(var i=0; i<sheetObj1.LastCol(); i++){
		sheetObj1.SetRowBackColor(Row,"#DFFFFF");
		for(var j=1; j<=sheetObj1.RowCount(); j++){
			if(j != Row){
				sheetObj1.SetRowBackColor(j,"#EFEBEF");
			}
		}
	}
	SELECTROW=Row;
	formObj.f_st_no.value=sheetObj1.GetCellValue(SELECTROW, "s_st_no");
	formObj.f_lst_no.value=sheetObj1.GetCellValue(SELECTROW, "s_lst_no");
	if(sheetObj1.GetCellValue(SELECTROW, "s_stk_tp_cd") == "CL"){
		formObj.s_awb_type[0].checked=true;
	}else{
		formObj.s_awb_type[1].checked=true;
	}
	formObj.s_aloc_area_cd.value=sheetObj1.GetCellValue(SELECTROW, "s_aloc_area_cd");
	formObj.s_iata_cd.value=sheetObj1.GetCellValue(SELECTROW, "s_crr_iata_cd");
	formObj.s_bl_st.value=sheetObj1.GetCellValue(SELECTROW, "s_st_no");
	formObj.s_bl_lst.value=sheetObj1.GetCellValue(SELECTROW, "s_lst_no");
	if(sheetObj1.GetCellValue(SELECTROW, "s_allc_dt") != null && sheetObj1.GetCellValue(SELECTROW, "s_allc_dt") != "" && sheetObj1.GetCellValue(SELECTROW, "s_allc_dt") != "null" ){
		formObj.s_receipt_dt.value=sheetObj1.GetCellValue(SELECTROW, "s_allc_dt");
		formObj.s_receipt_dt.value=formObj.s_receipt_dt.value.substring(4,6) + "-" + formObj.s_receipt_dt.value.substring(6,8) + "-" + formObj.s_receipt_dt.value.substring(0,4);
	}else{
		formObj.s_receipt_dt.value="";
	}
	formObj.s_oper_usrid.value=sheetObj1.GetCellValue(SELECTROW, "s_usrid");
	formObj.s_oper_usrnm.value=sheetObj1.GetCellValue(SELECTROW, "s_usrnm");
	
	//#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
	formObj.s_delt_flg.value=sheetObj1.GetCellValue(SELECTROW, "s_delt_flg");
	formObj.s_not_del_cnt.value=sheetObj1.GetCellValue(SELECTROW, "s_not_del_cnt");
	
	if(formObj.s_delt_flg.value == "Y"){
		document.getElementById("sbtncreate").style.display = 'none';
		if(formObj.s_not_del_cnt.value != "0"){
			document.getElementById("sbtnDelete").style.display = 'none';
		}else{
			document.getElementById("sbtnDelete").style.display = '';
		}
	}else{
			document.getElementById("sbtncreate").style.display = ''; 
			document.getElementById("sbtnDelete").style.display = 'none';
	}
	
	//MAWB LIST조회
	doWork("SEARCHLIST02");
}
/*======================================================================================================*/
//세번째 그리드
//조회 후
function sheet3_OnSearchEnd(){
	var formObj=document.frm1;
}
//등록/수정/삭제 후
function sheet3_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	SAVE_FLAG="Y";
	doWork("SEARCHLIST01");
}
function searchSheet1Child(){
	var formObj=document.frm1;
	var sheetObj1=docObjects[1];
   	comSelectList();
	//Master Stock Summary를 조회한다.
	doWork("SEARCHLIST01");
   	window._childwin="";
}
function initialWin(){
	window._childwin="";
}
//필드 클리어
function displayClear() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	formObj.f_st_no.value=""
	formObj.f_lst_no.value="";
	SELECTROW="";
	SAVE_FLAG="";
}
//전체 클리어
function displayClearAll() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	formObj.f_iata_cd[0].selected=true;
	formObj.f_awb_type[0].checked=true;
	formObj.s_awb_type.value="";
	formObj.s_aloc_area_cd.value="";
	formObj.s_iata_cd.value="";
	formObj.s_bl_st.value="";
	formObj.s_bl_lst.value="";
	formObj.s_receipt_dt.value=getTodayStr();
	formObj.s_awb_type[0].disabled=true;
	formObj.s_awb_type[1].disabled=true;
	formObj.s_aloc_area_cd.disabled=true;
	//formObj.s_aloc_area_cd[0].selected 	= true;
	formObj.s_iata_cd.className="search_form-disable";
	formObj.s_bl_st.className="search_form-disable";
	formObj.s_bl_lst.className="search_form-disable";
	formObj.s_receipt_dt.className="search_form-disable";
	formObj.s_iata_cd.readOnly=true;
	formObj.s_bl_st.readOnly=true;
	formObj.s_bl_lst.readOnly=true;
	formObj.s_receipt_dt.readOnly=true;
	sheetObj.RemoveAll();
	sheetObj1.RemoveAll();
	sheetObj2.RemoveAll();
	displayClear();
}
function displayNew() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	if(formObj.f_iata_cd.length > 0){
		formObj.f_iata_cd[0].selected=true;
	}
	formObj.f_awb_type[0].checked=true;
	formObj.s_awb_type[0].checked=true;
	formObj.s_aloc_area_cd.value="";
	formObj.s_iata_cd.value="";
	formObj.s_bl_st.value="";
	formObj.s_bl_lst.value="";
	formObj.s_receipt_dt.value=getTodayStr();
	formObj.s_awb_type[0].disabled=false;
	formObj.s_awb_type[1].disabled=false;
	formObj.s_aloc_area_cd.disabled=false;
	formObj.s_aloc_area_cd[0].selected=true;
	
	//#5755 [Impex-Germany] Dublicate error message when creating MAWB stock
	formObj.s_delt_flg.value="";
	formObj.s_not_del_cnt.value="";
	document.getElementById("sbtncreate").style.display = '';
	document.getElementById("sbtnDelete").style.display = 'none';
	formObj.f_delt_flg.value ="N";
	
	formObj.s_bl_st.className="search_form";
	formObj.s_bl_lst.className="search_form";
	formObj.s_receipt_dt.className="search_form";
	formObj.s_iata_cd.disabled=false;
	formObj.s_bl_st.readOnly=false;
	formObj.s_bl_lst.readOnly=false;
	formObj.s_receipt_dt.readOnly=false;
	sheetObj.RemoveAll();
	sheetObj1.RemoveAll();
	sheetObj2.RemoveAll();
	displayClear();
}
//BL번호의 길이를 체크한다.(6자리체크)
function checkLength(obj){
	var formObj=document.frm1;
	var obj_len=obj.value.length;
	if(obj.value != ""){
		if(obj_len != 6){
//			alert("HAWB No. has to be 6digidits. ");
			alert(getLabel('AIR_MSG_061'));
			obj.select();
			return;
		}
	}
}
//BL번호가 6자리일경우 FOCUS를 이동한다.
function moveFocus(obj){
	var formObj=document.frm1;
	if(obj.value.length == 7){
		formObj.s_bl_lst.focus();
	}
}
//Create를 실행한다.
function doCreate(obj){
	if(obj.value.length == 7){
		if(event.keyCode == 13){
			doWork("CREATE");
		}
	}else{
	}
}
/*================================================================================================================================================*/
//IATA CODE를 조회한다.
function comSearchCode(obj, tmp){
	var formObj=document.frm1;
	if ( obj.value != "" ) {
		if(obj.value.length == 6){
			if ( tmp == "onKeyPress" ) {
				if (event.keyCode == 13){
					//공통 Ajax를 호출하여 중복체크를 한다.       
		        	CODETYPE="HblStock";
		        	var prefix=formObj.prefix_in.value;
		        	var s_code1=formObj.s_bl_st.value;
		        	var s_code2=formObj.s_bl_lst.value;
		        	//통신을 한다.
		        	//ajaxSendPost(checkCodeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=commonCode&codeType='+CODETYPE+'&prefix='+prefix+'&s_code1='+s_code1+'&s_code2='+s_code2, './GateServlet.gsl');
				}
			} else if ( tmp == "onBlur" ) {
				if(formObj.s_bl_st.value >= formObj.s_bl_lst.value){
//					alert("Invaild HAWB No. ");
					alert(getLabel('AIR_MSG_062'));
					formObj.s_bl_lst.value="";
					formObj.s_bl_lst.focus();
					return;
				}else{
					//공통 Ajax를 호출하여 중복체크를 한다.       
		        	CODETYPE="HblStock";
		        	var prefix=formObj.prefix_in.value;
		        	var s_code1=formObj.s_bl_st.value;
		        	var s_code2=formObj.s_bl_lst.value;
		        	//통신을 한다.
		        	ajaxSendPost(checkCodeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=commonCode&codeType='+CODETYPE+'&prefix='+prefix+'&s_code1='+s_code1+'&s_code2='+s_code2, './GateServlet.gsl');			
				}
			}
		}
	}
}
//LOCATION CODE 중복체크 결과
function checkCodeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(masterVals[0] != "0"){
//				alert("Duplicate HAWB No. ");
				alert(getLabel('AIR_MSG_063'));
				formObj.s_bl_st.value="";
				formObj.s_bl_lst.value="";
				formObj.s_bl_st.focus();
			}
		}else{
		}
	}
}
var stDuplChk=false;
function checkStCd(){
	var formObj=document.frm1;
	var iata_cd=formObj.s_iata_cd.value;
	var from=formObj.s_bl_st.value;
	var to=formObj.s_bl_lst.value;
	//ajax로 중복체크
	ajaxSendPost(checkStCodeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkStNo&iata_cd='+iata_cd+'&from='+from+'&to='+to, './GateServlet.gsl');			
	if(stDuplChk){
		return false;
	} else {
		return true;
	}
}
//ST CODE 중복체크 결과
function checkStCodeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if (doc[1] == 'DUP') {
			stDuplChk=true;
		} else {
			stDuplChk=false;				
		}
	}
}
//PreFix를 변경한다.
function changeBiz(){
	var formObj=document.frm1;
	if(formObj.biz_check[0].checked){
		formObj.prefix_in.value="LAI";
	}else{
		formObj.prefix_in.value="LAIX";
	}
}
/*============================================================================================================================================*/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
	if(frm1.s_receipt_dt.readOnly){
		return;
	} 
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendar(); 
	        cal.select(obj,  'MM-dd-yyyy');
	    break;
    }
}
/**
function : 숫자 검사
parm     : str- 검사할 숫자
return   : boolean
**/
function ischeckNumber(str){
	for(var i=0; i < str.length; i++){
		tcod=str.charCodeAt(i);
		if( !(48 <= tcod && tcod <= 57) ) return false;
	}
	return ( !isEmpty(str) );
}
/**
 *	'yyyymmbb' 날짜 유형인지체크
 *  데이터 유형이면 false를 반환 한다.
 *  @return boolean
 *  @param name만
 */
function isValidDate(inputObj) {
	if( inputObj.value.length == 8 && ischeckNumber(inputObj.value) ) {
		var yyyy=inputObj.value.substring(0,4);
		var mm=inputObj.value.substring(4,6);
		var dd=inputObj.value.substring(6);
		if(isValidMonth(mm) && isValidDay(yyyy, mm, dd)) {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}
/**
 * 유효한(존재하는) 월(月)인지 체크
 */
function isValidMonth(mm) {
    var m=parseInt(mm);
    return (m >= 1 && m <= 12);
}
/**
 * 유효한(존재하는) 일(日)인지 체크
 */
function isValidDay(yyyy, mm, dd) {
    var m=parseInt(mm) - 1;
    var d=parseInt(dd);
    var end=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1]=29;
    }
    return (d >= 1 && d <= end[m]);
}
// 날짜 유효성 검사(년,월,일)
function isDate(varCk1,varCk2,varCk3) {
	if ( (isLength(varCk1)==4) && (isLength(varCk2)==2) && (isLength(varCk3)==2) ) {
		if ( (isInteger(varCk1,"")) && (isInteger(varCk2,"")) && (isInteger(varCk3,"")) ) {
			if (varCk1>="1900" && varCk1<="2099" && varCk2>="01" && varCk2<="12") {
				if (varCk2=="01" && varCk3>="01" && varCk3<="31") return true;
				if (varCk2=="02" && varCk3>="01" && varCk3<="28") return true;
				if (varCk2=="03" && varCk3>="01" && varCk3<="31") return true;
				if (varCk2=="04" && varCk3>="01" && varCk3<="30") return true;
				if (varCk2=="05" && varCk3>="01" && varCk3<="31") return true;
				if (varCk2=="06" && varCk3>="01" && varCk3<="30") return true;
				if (varCk2=="07" && varCk3>="01" && varCk3<="31") return true;
				if (varCk2=="08" && varCk3>="01" && varCk3<="31") return true;
				if (varCk2=="09" && varCk3>="01" && varCk3<="30") return true;
				if (varCk2=="10" && varCk3>="01" && varCk3<="31") return true;
				if (varCk2=="11" && varCk3>="01" && varCk3<="30") return true;
				if (varCk2=="12" && varCk3>="01" && varCk3<="31") return true;
				return false;
			}
			return false;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
//코드리스트를 조회한다.
function comSelectList(){
	CODETYPE="CRRIATA";
	ajaxSendPost(commaonSelectAjaxReq, 'reqVal', '&goWhere=aj&bcKey=commonCode&codeType='+CODETYPE, './GateServlet.gsl');
}
//공통 코드표시 Ajax
function commaonSelectAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var arrLen=rtnArr.length;
			//AIR
			if (arrLen == 0) {
                formObj.f_iata_cd.options[0]=new Option('','');
			} else {
				if(CODETYPE == "CRRIATA"){
					for( var i=0; i < arrLen-1 ; i++ ){
						var masterVals=rtnArr[i].split('@@^');
						formObj.f_iata_cd.options[i]=new Option(masterVals[0],masterVals[0]);
					}
				}
			}
		} else {
		  formObj.f_iata_cd.options[0]=new Option('','');
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}