function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    formObj.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCHLIST":
    	   if(!chkSearchCmprPrd(false, frm1.f_created_dtm_strdt, frm1.f_created_dtm_enddt)){
    			return;
    	   }
    	   if(!chkSearchCmprPrd(false, frm1.f_isf_etd_strdt, frm1.f_isf_etd_enddt)){
    			return;
    	   }
           formObj.f_cmd.value=SEARCHLIST;
		   sheetObj.DoSearch("./EDI_ISF_0040GS.clt", FormQueryString(formObj) );
       break;
       case "EXCEL":
//    	   sheetObj.Down2Excel({ HiddenColumn:true});
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
       case "PRINT":
	   		formObj.file_name.value='isf_10.mrd';
			formObj.title.value=(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no") != '-1') ? 'Importer Security Filling History [' + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no") + ']' : 'Importer Security Filling History []';
        	formObj.mailTitle.value=formObj.title.value;
			var isfNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "isf_no");
			var blNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no");
			var param='[' + isfNo + ']';				// [1]
			param	  += '[' + blNo + ']';				// [2]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	break;
	   	case "HISTORY_PRINT":
	   		formObj.file_name.value='isf_history.mrd';
			formObj.title.value=(sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no") != '-1') ? 'Importer Security Filling History [' + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no") + ']' : 'Importer Security Filling History []';
        	formObj.mailTitle.value=formObj.title.value;
			var isfNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "isf_no");
			var blNo=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "hbl_no");
			var param='[' + isfNo + ']';				// [1]
			param	  += '[' + blNo + ']';				// [2]
			/*#6557 [BNX] ISF CREATE DATE*/
			param	  += '[' + ofc_cd + ']';		  	// [3]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	break;
    }
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST')
	}
}
function getMain(reqVal){
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
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	initFinish();
	 //ETD 계산
	var now=new Date(); 	
	var nxtDt=new Date(Date.parse(now) + 0 * 1000 * 60 * 60 * 24);
	var preDt=new Date(Date.parse(now) - 15 * 1000 * 60 * 60 * 24);
	var nxtyear=nxtDt.getFullYear(); 			
	var nxtmonth=nxtDt.getMonth() + 1;
	var nxtdate=nxtDt.getDate() + 1; 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	var predate=preDt.getDate();
	if(nxtmonth < 10){
		nxtmonth="0"+(nxtmonth);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(nxtdate < 10){
		nxtdate="0"+nxtdate;
	}
	if(predate < 10){
		predate="0"+predate;
	}
	PREDATE=premonth + "-" + predate + "-" + preyear;
	NXTDATE=nxtmonth + "-" + nxtdate + "-" + nxtyear;
    formObj.f_created_dtm_strdt.value=PREDATE;
    formObj.f_created_dtm_enddt.value=NXTDATE;
    //IBS_RestoreGridSetting(document.frm1.user_id.value, getPageURL(), docObjects[0], false);
    doWork("SEARCHLIST");
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
	    case 1:      //IBSheet2 init
	    	with(sheetObj){
		      
		      //no support[check again]CLT 		            if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		      var cnt=0;
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:"No.|isf_no|User ID|status|Disp|Action|Result|ISF No|Importer Name|Import No|HB/LNo|Customer Ref. No.|HTS Code|ISF Date|ETD|Bond Holder|Create Date", Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"isf_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cust_id",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"status",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"disp",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"isf_act_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"result",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"isf_trac_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"isf_imp_name",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"isf_imp_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"isf_cust_ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hts_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"isf_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"isf_etd",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"isf_bond_holder",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"created_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		       
		      InitColumns(cols);
	
		      SetEditable(1);
		      //InitViewFormat(0, "isf_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      //InitViewFormat(0, "isf_etd", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      //InitViewFormat(0, "created_dt", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      SetSheetHeight(450);
		      resizeSheet();
	      }
	      break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

 /**
  * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
  * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
  */
/*
function sheet1_OnDblClick(sheetObj,Row,Col){
		
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
	formObj.f_cmd.value="";
	var paramStr="./EDI_ISF_0010.clt?f_cmd=" + SEARCHLIST + "&f_isf_no_ret="+sheetObj.GetCellValue(Row, "isf_no");
	parent.mkNewFrame('ISF EDI (Ocean)', paramStr, "EDI_ISF_0010_SHEET_" + sheetObj.GetCellValue(Row, "isf_no"));
	
}
*/
function sheet2_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	//if(colStr == "mbl_no"){
	var formObj=document.frm1;
	//doProcess = true;
	formObj.f_cmd.value="";
	var paramStr="./EDI_ISF_0010.clt?f_cmd="
				+"&isf_no="+sheetObj.GetCellValue(Row, "isf_no");
	parent.mkNewFrame('ISF EDI (Ocean)', paramStr, "EDI_ISF_0010_SHEET_" + sheetObj.GetCellValue(Row, "isf_no"));
}
function sheet1_OnSearchEnd(){
	doWork("SEARCHLIST01");
}
/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.f_rgst_strdt, 90, document.frm1.f_rgst_enddt, 30);
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.select(formObj.f_isf_etd_strdt, formObj.f_isf_etd_enddt, 'MM-dd-yyyy');
	    break;
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.select(formObj.f_created_dtm_strdt, formObj.f_created_dtm_enddt, 'MM-dd-yyyy');
	    break;
    }
}
var rtnary=new Array(1);
function openPopUpEdi(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
	try {
		switch(srcName) {
			case "HBL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
		   		rtnary[0]="S";
		   		rtnary[1]="I";
	   	        var rtnVal=ComOpenWindow('./CMM_POP_0170.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_hbl_no.value=rtnValAry[0];//house_bl_no
				}
		    break;
			case "MBL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="S"; //S=해운에서 오픈, A=항공에서 오픈
				rtnary[1]="I"; //I: In-bound, O: Out-bound
		    	var rtnVal=ComOpenWindow('./CMM_POP_0180.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px" , true);
		    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		    		return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_mbl_no.value=rtnValAry[0];//mbl_no
				}
		    break;
			case "IMPORTER_POPLIST":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.f_im_entt_name.value;
		   		rtnary[2]=window;
	   	        var rtnVal=ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_im_entt_cd.value=rtnValAry[0];//trdp_cd
					formObj.f_im_entt_name.value=rtnValAry[2];//eng_nm
				}
	         break; 
			case "CONSIGNEE_POPLIST":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.f_cnee_nm.value;
		   		rtnary[2]=window;
	   	        var rtnVal=ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
					var rtnValAry=rtnVal.split("|");
					formObj.f_cnee_cd.value=rtnValAry[0];//trdp_cd
					formObj.f_cnee_nm.value=rtnValAry[2];//eng_nm
				}
	         break; 
        } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			showErrMessage(AJ_CMM_ERR);
		} else {
			showErrMessage(e);
		}
	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameActionEdi(str, obj, tmp){
	var s_code=obj.value.toUpperCase();		
	var s_type="";
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
		}
}
/**
* Trade Partner 관린 코드조회
*/
function trdpCdReqEdi(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpCode_importer"){
				formObj.f_im_entt_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.f_im_entt_name.value=masterVals[3];		//eng_nm   AS param2
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_000000') + "\n\n: EDI_ISF_0020.461");
				}
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.f_cnee_nm.value=masterVals[3];		//eng_nm   AS param2
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('FMS_COM_000000') + "\n\n: EDI_ISF_0020.470");
				}
			}
		}else{
			if(CODETYPE =="trdpCode_importer"){
				formObj.f_im_entt_cd.value="";//trdp_cd  AS param1
				formObj.f_im_entt_name.value="";//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value="";//trdp_cd  AS param1
				formObj.f_cnee_nm.value="";//eng_nm   AS param2
			}
		}
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){fnOnSelectMenu(sheetObj, MenuString);};
function sheet2_OnSelectMenu(sheetObj, MenuString){fnOnSelectMenu(sheetObj, MenuString);};
function fnOnSelectMenu(sheetObj, MenuString){
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
//Calendar flag value
var firCalFlag=false;
