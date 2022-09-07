//=========================================================
//*@FileName   : SAL_TPM_0020.jsp
//*@FileTitle  : Trade Partner ManagementList
//*@Description: Trade Partner ManagementList
//*@author     : Choi,Gil-Ju - Cyberlogitec
//*@version    : 1.0 - 01/07/2009
//*@since      : 01/07/2009
//
//*@Change history:
//*@author	: Tuan.Chau
//*@version	: 2.0 - 14/07/2014
//=========================================================

var rtnary=new Array(1);
var callBackFunc = "";
//#5203 [BINEX] TRADE PARTNER ENTRY TAB OPEN
var tabSeq = 0;

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
       		if(!formValidation()) return;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	
            	if(formObj.s_iata_cd.checked){
        			formObj.s_iata_cd.value = "Y";
        		}else{
        			formObj.s_iata_cd.value = "";
        		}
            	sheetObj2.RemoveAll();
            	sheetObj.DoSearch("SAL_TPM_0020GS.clt", FormQueryString(formObj) );
            	//Log Monitor Start
		   		gLogMonitor();
   	 			//Log Monitor End
            }
            //sheetObj.ShowDebugMsg = false;
       	break;
       	case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";//대륙코드
	 	   	callBackFunc = "COUNTRY_POPLIST";
	 	   	modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
	    break;
        case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
		   	rtnary[0]="1";
		   	rtnary[1]="";
		   	rtnary[2]=window;
	   	    var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp=LN',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px" , true);
	   	    if (rtnVal == "") {
				return;
			}
			var rtnValAry=rtnVal.split("|");
			formObj.s_trdp_cd.value=rtnValAry[0];
			formObj.s_shrt_nm.value=rtnValAry[1];
			formObj.s_full_nm.value=rtnValAry[2];    	        
	    break;
        case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
	   		rtnary[0]="1";
//	   		rtnary[1]=formObj.s_cnt_cd.value;
	   		rtnary[1]="";
	   		callBackFunc = "STATE_POPLIST";
  	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,450,"yes");
  	    break;
        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
  	        modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
   	    break;
        case "USER_POPLIST_NAME"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.s_sls_usrnm.value;
	   		callBackFunc = "USER_POPLIST";
  	        modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
   	    break;
	    /* jsjang 2013.7.16 요구 # 14719 [IMPEX]Trade Partner List/Entry 에 Copy 기능 추가 Start */ 
   	 	case "COPY":
   	 		if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"trdp_cd") == ""){
   	 			//Select Please.
   	 			alert(getLabel('FMS_COM_ALT004'));
   	 			return;
   	 		}
   	 		else{
   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){
   	 				var paramStr="./SAL_TPM_0010.clt?f_cmd="+ COMMAND05 +"&s_trdp_cd="+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"trdp_cd");
	   	 	   	    parent.mkNewFrame('TradePartner Entry', paramStr);
   	 			}
   	 		}
   	 	break;	
   	 	/* jsjang 2013.7.16 요구 # 14719 [IMPEX]Trade Partner List/Entry 에 Copy 기능 추가 End */
        case 'PRINT':
        	
        	// 조회조건 Tp Type선택 체크
        	/*if(formObj.s_trdp_tp_cd.value == ""){
        		ComShowCodeMessage("COM12113","TP Type");
        		formObj.s_trdp_tp_cd.focus();
        		return;
        	}*/
        	
        	// #52472 [CLT] 안정성: 건수 체크-jsp에 정의된 endMaxIdx(10000)건으로 제한 
        	if (sheetObj.GetTotalRows() > formObj.endMaxIdx.value) { 
				//if(formObj.s_strdt.value == "" || formObj.s_enddt.value == ""){
					//ComShowCodeMessage("COM132602");
					alert(getLabel('FMS_COM_ALT088'));
					formObj.s_strdt.focus();
					return;
				//}
			}
        	
        	if(formObj.s_iata_cd.checked){
    			formObj.s_iata_cd.value = "Y";
    		}else{
    			formObj.s_iata_cd.value = "";
    		}
        	
            formObj.file_name.value='company_information.mrd';
        	formObj.title.value='COMPANY INFORMATION';
			var trdp_tp_cd=formObj.s_trdp_tp_cd.value;
			var strdt=formObj.s_strdt.value.replaceAll("-", "");
			var enddt=formObj.s_enddt.value.replaceAll("-", "");
			strdt=strdt.substring(4,8) + strdt.substring(0,2) + strdt.substring(2,4);
			enddt=enddt.substring(4,8) + enddt.substring(0,2) + enddt.substring(2,4);
			//Parameter Setting
        	var param='[' + formObj.s_trdp_tp_cd.value + ']';		// [1] TP Type
        	param += '[' + strdt +  ']';							// [2] Date (From)
        	param += '[' + enddt +  ']';							// [3] Date (To)
        	param += '[' + formObj.f_ofc_nm.value +  ']';			// [4]
        	param += '[' + formObj.f_usr_nm.value +  ']';			// [5]
        	param += '[' + formObj.s_trdp_tp_cd[formObj.s_trdp_tp_cd.selectedIndex].text +  ']';			// [6]
        	param += '[' + formObj.s_acct_cd.value +  ']';			// [7] Account Group ID
        	param += '[' + formObj.s_delt_flg.value +  ']';			// [8] Use Flag
        	
        	param += '[' + formObj.s_eng_nm.value +  ']';			// [9] Alias/Name
        	param += '[' + formObj.s_trdp_cd.value +  ']';			// [10] Code
        	param += '[' + formObj.s_cnt_cd.value +  ']';			// [11] Country
        	param += '[' + formObj.s_biz_no.value +  ']';			// [12] Tax ID No.
        	param += '[' + formObj.s_pic_nm.value +  ']';			// [13] Contact Person
        	param += '[' + formObj.s_locl_nm.value +  ']';			// [14] Local Name
        	param += '[' + formObj.s_pic_phn.value +  ']';			// [15] Phone
        	param += '[' + formObj.s_pic_eml.value +  ']';			// [16] EMail
        	param += '[' + formObj.s_iata_nm.value +  ']';			// [17] IATA(Firms)
        	param += '[' + formObj.s_iata_cd.value +  ']';			// [18] Firms Code
        	param += '[' + formObj.s_prefix.value +  ']';			// [19] Prefix
        	
        	if(formObj.s_addr_zip.value == "ADDR"){
        		param += '[' + formObj.s_addr.value +  ']';				// [20] Address
        		param += '[]';											// [21] Zip Code
        	}else{
        		param += '[]';											// [20] Address
        		param += '[' + formObj.s_addr.value +  ']';				// [21] Zip Code
        	}
        	
        	param += '[' + formObj.s_city_nm.value +  ']';			// [22] City
        	param += '[' + formObj.s_state_cd.value +  ']';			// [23] State
        	if(formObj.sale_flg.value == 'Y'){
        		param += '[' + formObj.s_sls_usrid.value +  ']';		// [24] Sales Person Code
            	param += '[' + formObj.s_sls_usrnm.value +  ']';		// [25] Sales Person Name
        	}else{
        		param += '[]';		// [24] Sales Person Code
            	param += '[]';		// [25] Sales Person Name
        	}
        	param += '[' + formObj.s_tp_grp.value +  ']';			// [26] Group
        	
			formObj.rd_param.value=param;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
        case 'PREWO':
        	
        	// #4679 [JH] Prepickup Address error
        	var paramStr = "./SAL_TPM_0070.clt?f_cmd=-1&s_trdp_cd="+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"trdp_cd")+"&s_trdp_nm="+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"eng_nm")+"&s_trdp_addr="+escape(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"eng_addr"));
            parent.mkNewFrame('Pre-Pickup Order Entry', paramStr);
		break;
        case 'EXCEL':
        	if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
        break;
        // #52472 [CLT] 안정성 : Excel Download(All Data) LSY ADD 
        case 'EXCEL_ALL':
        	
        	/*if(formObj.s_trdp_tp_cd.value == ""){
        		ComShowCodeMessage("COM12113","TP Type");
        		formObj.s_trdp_tp_cd.focus();
        		return;
        	}*/
        	
        	if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
        	} else if (sheetObj.GetTotalRows() > formObj.endMaxIdx.value) { //out of memory
//        		if(confirm(getLabel('FMS_COM_CFMCON'))){
//        			excelDown(docObjects[0]);
//        		}
        		//if(formObj.s_strdt.value == "" || formObj.s_enddt.value == ""){
        			alert(getLabel('FMS_COM_ALT088'));
        			formObj.s_strdt.focus();
        			return;
        		//}
	   		} else {
	   			excelDown(docObjects[0]);
	   		}
        	break;
        case 'NEW':
            var paramStr="./SAL_TPM_0010.clt?f_cmd=-1";
            parent.mkNewFrame('TradePartner Entry', paramStr);
        break;
        case "SEARCHLIST01":
			frm1.f_cmd.value = SEARCHLIST01;
			frm1.trdp_cd.value = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"trdp_cd");
			docObjects[1].DoSearch("./SAL_TPM_0021GS.clt", FormQueryString(frm1));
		break;
        case "ROWADD1":
        	var trdp_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"trdp_cd");
			if (trdp_cd != "") {
	            rtnary=new Array(1);
		  		rtnary[0]="I";
				rtnary[1]=trdp_cd;
				callBackFunc = "ROWADD1";
	  	        modal_center_open('./SAL_TPM_0011.clt', rtnary, 480,327,"yes");
			}
		break;
        case "REMOVE":
			if (confirm(getLabel('FMS_COM_CFMSAV'))) {
				frm1.f_cmd.value = REMOVE;
				docObjects[1].DoAllSave("./SAL_TPM_0021GS.clt", FormQueryString(frm1), true);
			}
		break;
		
		//C.W Park.
		//#336[ZEN] TRADE PARTNER GROUP CODE SEARCH FUNCTION ON TP LIST SCREEN
		case "TRDP_GROUP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       	rtnary=new Array(1);
			rtnary[0]="1";	// Group Code
			rtnary[1]=formObj.s_tp_grp.value;//  Trdp Group Code
			callBackFunc = "TRDP_GROUP_POPLIST";
  	        modal_center_open('./CMM_POP_0410.clt', rtnary, 560,390,"yes");
  	        
	 	    break;
		
    }// end switch
	
	//Log Monitor Start:Btn
	if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
	//Log Monitor End:Btn
   
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
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
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
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid(){
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
	var cnt=0;
	switch(sheetNo) {
		case 1:      //sheet1 init
		    with(sheetObj){
	        

		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:4 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SAL_TPM_0020_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);

		     // #1122 [Trade Partner List] Miss data when exporting Excel (All) - rownum
	      var cols = [ {Type:"Int",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"rownum",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shrt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"acct_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"eng_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"locl_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"lgl_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"eng_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rgst_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pic_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"pic_phn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"pic_mphn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"pic_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"pic_eml",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnt_locl_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"city_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:50,  Align:"Left",    ColMerge:1,   SaveName:"state_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"state_locl_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, //#3148 county와 동일하게 state name 반영
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"rep_zip",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cb_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"biz_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"ceo_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"dept",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"iata_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"sls_gp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"cr_term_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"cr_term_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"payment_term",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0, Width:120,   Align:"Center",    ColMerge:1,   SaveName:"profit_share",   KeyField:0,   CalcLogic:"",   Format:"Float", PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"crd_lmt_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"credit_limit",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"sls_usrnm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"delt_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" },
	             {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"rep_phn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"shrt_nm_x",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"rep_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"cnt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"trdp_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:30,   Align:"Left",    ColMerge:1,   SaveName:"rgst_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	      		InitColumns(cols);
	      		SetEditable(1);
	            SetAutoRowHeight(0);
	            SetDataRowHeight(20);
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(410);
	            resizeSheet();
			}
		break;
		
		case 2:      //sheet1 init
		    with(sheetObj){
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SAL_TPM_0021_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"DelCheck",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag1" },
		             {Type:"Text",      Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"cntc_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"sls_pson_pic",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_tit",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
		             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:4000 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sls_popup",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet1",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }  ];
		       
		      InitColumns(cols);
	
		      SetEditable(1);
		      SetImageList(0,APP_PATH+"/web/img/button/bt_file.gif");
		      SetCellAlign(0, 'sls_popup', "Center");
		      sheetObj.SetDataLinkMouse("sls_popup",1);
		      sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT * 8);
		      sheetObj.SetFocusAfterProcess(0);
	      }


		break;
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	// Payment Term, Credit Limit를 설정한다
	for(var i=1; i<=sheetObj.LastRow();i++){
		var payment_tp=sheetObj.GetCellValue(i,"sls_gp_cd");
		var term_tp=sheetObj.GetCellValue(i,"cr_term_cd");
		var term_dt=sheetObj.GetCellValue(i,"cr_term_dt");
		var lmt_amt=sheetObj.GetCellValue(i,"crd_lmt_amt");
		var pro_share=sheetObj.GetCellValue(i,"profit_share");
		var payment_txt=setPaymentTerm(payment_tp,term_tp,term_dt);
		sheetObj.SetCellValue(i,"payment_term",payment_txt,0);
		
		if (lmt_amt != "") {
			lmt_amt=Number(lmt_amt).toFixed(2);
			sheetObj.SetCellValue(i,"credit_limit","$"+lmt_amt,0);
		}
		
		if(pro_share != ""){
			pro_share=Number(pro_share).toFixed(2);
			sheetObj.SetCellValue(i, "profit_share", pro_share + "%", 0);
		}
	}
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnClick(sheetObj,Row,Col){
	doWork('SEARCHLIST01');
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	/*
	formObj.s_trdp_cd.value=sheetObj.GetCellValue(Row,"trdp_cd");
	formObj.f_cmd.value=SEARCHLIST; // SEARCHLIST
    formObj.action="./SAL_TPM_0010.clt";
    formObj.submit();
    */
	
	//#5203 [BINEX] TRADE PARTNER ENTRY TAB OPEN - Seq Added to open new tab always 
	tabSeq ++;
	
	// 2011/12/21 Chungrue 수정
	var paramStr="./SAL_TPM_0010.clt?f_cmd=3&s_trdp_cd="+sheetObj.GetCellValue(Row,"trdp_cd") + "&tabSeq=" + tabSeq;
    parent.mkNewFrame('Trade Partner Entry', paramStr, "SAL_TPM_0010_SHEET_" + sheetObj.GetCellValue(Row,"trdp_cd"));
}

function sheet2_OnSaveEnd(sheetObj, row, col) {
	doWork("SEARCHLIST01");
}

function reloadDocList() {
	sheet1_OnClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
}

function getSelectedFiles() {
	return docObjects[1];
}

function sheet2_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	    case "sls_popup" :	//파일다운로드
	    	if(sheetObj.GetCellValue(Row, "sls_his_flat_nm")!=''){
		    	document.frm2.trdp_cd.value=formObj.trdp_cd.value;
		    	document.frm2.cntc_seq.value=sheetObj.GetCellValue(Row, "cntc_seq");
				document.frm2.submit();
	    	}
	    break;
	}
}
function sheet2_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	rtnary=new Array(1);
	var trdp_cd=formObj.trdp_cd.value;
	var cntc_seq=sheetObj.GetCellValue(Row,"cntc_seq");
	var sls_pson_pic=sheetObj.GetCellValue(Row,"sls_pson_pic");
	var sls_his_tit=sheetObj.GetCellValue(Row,"sls_his_tit");
	var sls_his_ctnt=sheetObj.GetCellValue(Row,"sls_his_ctnt");
	var sls_his_flat_url=sheetObj.GetCellValue(Row,"sls_his_flat_url");
	var sls_his_flat_nm=sheetObj.GetCellValue(Row,"sls_his_flat_nm");
	rtnary[0]="U";
	rtnary[1]=trdp_cd;
	rtnary[2]=cntc_seq;
	rtnary[3]=sls_pson_pic;
	rtnary[4]=sls_his_tit;
	rtnary[5]=sls_his_ctnt;
	rtnary[6]=sls_his_flat_url;
	rtnary[7]=sls_his_flat_nm;
	
	callBackFunc = "ROWADD1";
    modal_center_open('./SAL_TPM_0011.clt', rtnary, 480,327,"yes");
}

function ROWADD1(){
	doWork("SEARCHLIST01");
}

//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if ( doc[0]=='OK' ) {
		if (typeof(doc[1])!='undefined'){
			var sheetObj3=docObjects[2];
			var iRow=formObj.s_Acct_Info_Row.value;
			//alert("[" + doc[1] + "]" + getLabel('SAL_TPM_0010_MSG3')); Duplicated account!
			alert(getLabel('FMS_COM_ALT008') + " - " + doc[1]);
			sheetObj3.SetCellValue(iRow, 3,"");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	ctlKind=obj;
	if ( obj.value != "" ) {
		if ( tmp == "onKeyUp" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
		if(str == "country"){
			frm1.s_cnt_cd.value="";
			frm1.s_cnt_nm.value="";
		}else if(str == "user"){
			frm1.s_sls_usrid.value="";
			frm1.s_sls_usrnm.value="";
		}else if(str == "state"){
			//#3148 county와 동일하게 state name 반영
			frm1.s_state_cd.value="";
			frm1.s_state_nm.value="";
		}
		
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value=masterVals[0];//trdp_cd
				//formObj.s_liner_abbr.value = masterVals[2];//shrt_nm
				formObj.i_trdp_nm.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_cnt_cd.value=masterVals[0];//cnt_cd
				formObj.s_cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				formObj.i_loc_nm.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value=masterVals[0];//cd_val
				formObj.curr_nm.value=masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value=masterVals[0];
				formObj.sls_ofc_nm.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_sls_usrid.value=masterVals[0];
				formObj.s_sls_usrnm.value=masterVals[4];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value=masterVals[0];
				formObj.s_commodity_name.value=masterVals[3];
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value=masterVals[0];
				formObj.s_package_name.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value=masterVals[0];
				formObj.s_vessel_name.value=masterVals[3];
			}else if(CODETYPE =="state"){
				formObj.s_state_cd.value=masterVals[0];
				//#3148 county와 동일하게 state name 반영
				formObj.s_state_nm.value=masterVals[16]; // locl_nm
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value="";//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				formObj.i_trdp_nm.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_cnt_cd.value="";//cnt_cd
				formObj.s_cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				formObj.i_loc_nm.value="";//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.curr_cd.value="";
				formObj.curr_nm.value="";//cd_nm
			}else if(CODETYPE =="office"){
				formObj.sls_ofc_cd.value="";
				formObj.sls_ofc_nm.value="";
			}else if(CODETYPE =="user"){
				formObj.s_sls_usrid.value="";
				formObj.s_sls_usrnm.value="";
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				formObj.s_commodity_code.value="";
				formObj.s_commodity_name.value="";
			}else if(CODETYPE =="package"){
				formObj.s_package_code.value="";
				formObj.s_package_name.value="";
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value="";
				formObj.s_cargo_name.value="";
			}else if(CODETYPE =="vessel"){
				formObj.s_vessel_code.value="";
				formObj.s_vessel_name.value="";
			}else if(CODETYPE =="state"){
				formObj.s_state_cd.value="";
				//#3148 county와 동일하게 state name 반영
				formObj.s_state_nm.value="";
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001'));		
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value=1;
		doWork('SEARCHLIST');
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal = new ComCalendarFromTo();
	    	cal.select(formObj.s_strdt,formObj.s_enddt, 'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
	        var cal = new ComCalendarFromTo();
	    	cal.select(formObj.s_strdt,formObj.s_enddt, 'MM-dd-yyyy');
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
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
//				alert("You can't Hidden this column.");
				alert(CM_MSG6);
				return false;
			}
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.s_strdt.value)!= "" && trim(formObj.s_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.s_strdt,formObj.s_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: SAL_TPM_0020.473");
			formObj.s_strdt.focus();
			return false;
		}
	}
	return true;
}
function setPaymentTerm(payment_tp,term_tp,term_dt) {
	//C083, CR, Credit, 1, Y, 신용 좋은 거래처]
	//C083, CO, COD, 2, Y, 거래가 드물거나 신용이 좋지 않아 Cargo Release 전 수금되어야 하는 업체(Cash of delivery)]
	//C083, KO, KOINFO, 3, Y, 본사에서 관리하는 거래처로, 가급적 거래를 하지 않아야 하는 업체
	//"Days ____|End of this month|End of next month|____th of next month", "A|B|C|D"   
	var payment_term_txt="";
	if (payment_tp == "CR") {
		payment_term_txt="Credit / ";
	} else if (payment_tp == "CO") {
		payment_term_txt="COD / ";
	} else if (payment_tp == "KO") {
		payment_term_txt="KOINFO / ";
	//#2550 [BNX] Trade Partner Entry's Payment Term Error
	} else if (payment_tp == "CH"){
		payment_term_txt="Credit Hold / ";
	}
	if (term_tp == "A") {
		payment_term_txt=payment_term_txt + term_dt + " Days";
	} else if (term_tp == "B") {
		payment_term_txt=payment_term_txt + "End of this month";
	} else if (term_tp == "C") {
		payment_term_txt=payment_term_txt + "End of next month";
	} else if (term_tp == "D") {
		var th="th";
		if (term_dt == "1") {
			th="st";
		} if (term_dt == "2") {
			th="nd";
		} if (term_dt == "3") {
			th="rd";
		}
		payment_term_txt=payment_term_txt + term_dt + th +" of next month";
	}
	return payment_term_txt;
}

function COUNTRY_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cnt_cd.value=rtnValAry[0];//cnt_cd
		formObj.s_cnt_nm.value=rtnValAry[1];//cnt_eng_nm
	}
}

function STATE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_state_cd.value=rtnValAry[0];//state_cd
		//#3148 county와 동일하게 state name 반영
		formObj.s_state_nm.value=rtnValAry[1];//state_local_nm
		formObj.s_cnt_cd.value=rtnValAry[4];//cnt_cd
		formObj.s_cnt_nm.value=rtnValAry[6];//cnt_eng_nm
  }
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_sls_usrid.value=rtnValAry[0];
		formObj.s_sls_usrnm.value=rtnValAry[4];
	}
}





//50623 [COMMON] TRADE PARTNER LIST에도 CLEAR BUTTON 추가
function clearAll() {
	//docObjects[0].RemoveAll(); 
	var formObj = document.frm1; 
	formObj.s_trdp_tp_cd.selectedIndex = 0;
	formObj.s_delt_flg.selectedIndex = 0;
	formObj.s_tp_grp.selectedIndex = 0; 
	formObj.s_addr_zip.selectedIndex = 0; 
	formObj.s_iata_cd.checked = false; 
	var collTxt = document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i = 0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text") {
			collTxt[i].value = "";
		}
	}
}

// #52472 [CLT] 안정성 : 엑셀 다운로드 LSY ADD
function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	formObj.f_cmd.value = COMMAND01;
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,Merge:1
					,URL:"./SAL_TPM_0020.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};
	
	mySheet.DirectDown2Excel(param);
}
function PhoneFormat(evt){
	var formObj = document.frm1;
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	
	if(key!= "8" && (formObj.s_pic_phn.value.length == 3 || formObj.s_pic_phn.value.length == 7)){
		formObj.s_pic_phn.value += "-";
	}
}
function validFaxPhone(obj) { 
	var formObj = document.getElementById(obj.id);
    var filter = /^([0-9\-])*$/;
    if(!filter.test(formObj.value)) {
  	    ComShowCodeMessage("COM12122","This fields");
 	    formObj.value="";
    }
    return true;
}

//C.W Park.
//#336[ZEN] TRADE PARTNER GROUP CODE SEARCH FUNCTION ON TP LIST SCREEN
function TRDP_GROUP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		formObj.s_tp_grp.value=rtnVal;//s_tp_grp
//		var rtnValAry=rtnVal.split("|");
//		formObj.s_tp_grp.value=rtnValAry[0];//s_tp_grp
//		formObj.cd_nm.value=rtnValAry[1];//cd_nm
	}
}
