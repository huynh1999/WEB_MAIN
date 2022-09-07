
//=========================================================
//*@FileName   : SEE_AMS_0010.jsp

//*@FileTitle  : SEE AMS Search 
//*@Description: SEE AMS Search 
//*@author     : Chungrue
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author2     : Tuan.Chau
//*@version    : 2.0 - 2014/06/04
//*@since      : 2014/06/04
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt, 30);
}
function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];	
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if( $('input:checkbox[id="ams_flag"]').is(":checked") == true ){
    	   			formObj.ams_flag.value='Y';
    	   		}else{
    	   			formObj.ams_flag.value='';
    	   		}
    	   		
    	   		if(!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)){
    	   			return;
    	   		}else if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
    	   			return;
    	   		}
    	   		sheetObj2.RemoveAll();
		   		formObj.f_cmd.value=SEARCHLIST01;
		   		sheetObj1.DoSearch("./SEE_AMS_0010GS.clt", FormQueryString(formObj));
    	   	break;
           	case "NEW":
           		var paramStr="./SEE_AMS_0020.clt?f_cmd=-1";
           	    parent.mkNewFrame('OE AMS EDI', paramStr);
 			break;   	   	
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
          		rtnary[0]="S";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
		   		rtnary[3]="";
		   		rtnary[4]=frm1.f_pod_cd;
		   		
		   		callBackFunc = "POD_LOCATION_POPLIST";
	  	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");
    	       
			break;
			//#3712 [JAPT]HBL 단위로 EDI Entry 연결
			case "EDI_ENTRY":
				var chkHbl = "";
				var chkCnt=0;
				
				if(sheetObj1.CheckedRows("chk") == 0){
	        		alert(getLabel('FMS_COM_ALT004') );
	        		return;
	        	}
				
				var rowArr = sheetObj1.FindCheckedRow("chk");
				var Row = rowArr.split("|");
				for (var i=0; i<Row.length; i++) {
					if(sheetObj1.GetCellValue(Row[0], "trnk_voy") != sheetObj1.GetCellValue(Row[i], "trnk_voy")
					||sheetObj1.GetCellValue(Row[0], "trnk_vsl_nm") != sheetObj1.GetCellValue(Row[i], "trnk_vsl_nm")
					||sheetObj1.GetCellValue(Row[0], "pol_cd") != sheetObj1.GetCellValue(Row[i], "pol_cd")
					||sheetObj1.GetCellValue(Row[0], "pod_cd") != sheetObj1.GetCellValue(Row[i], "pod_cd")){

					alert(getLabel('EDI_COM_ALT253') );
					sheetObj1.SetCellValue(Row[i], "chk", "0");
					return;
					}
				}
				
				for(var i=1; i < sheetObj1.LastRow() + 1; i++){

					if(sheetObj1.GetCellValue(i, "chk") == "1"){
						if(chkCnt > 0){
							chkHbl +=',';
						}
						chkHbl += sheetObj1.GetCellValue(i, 'hbl_no');
						chkCnt++
					}
				}
				if(chkCnt >0){
					formObj.chk_hbl_no.value = chkHbl;
					formObj.chk_flg.value = "Y";
				}else{
					formObj.chk_hbl_no.value = "";
					formObj.chk_flg.value = "N";
				}
				
				var f_intg_bl_seq=sheetObj1.GetCellValue(Row[0], "intg_bl_seq");
				var f_mbl_no=sheetObj1.GetCellValue(Row[0], "mbl_no");
				
				//#3685 [JAPT] AMS EDI - Transshipment AMS 전송 기능 보완
				var trnk_vsl_nm_bl=sheetObj1.GetCellValue(Row[0], "trnk_vsl_nm_bl");
				var pre_vsl_nm_shp=sheetObj1.GetCellValue(Row[0], "pre_vsl_nm_shp");
				var trnk_voy_bl=sheetObj1.GetCellValue(Row[0], "trnk_voy_bl");
				var pre_voy_shp=sheetObj1.GetCellValue(Row[0], "pre_voy_shp");
				
				var paramStr="./SEE_AMS_0020.clt?f_cmd=-1&f_intg_bl_seq="+f_intg_bl_seq+"&f_mbl_no="+f_mbl_no;

				//#3685 [JAPT] AMS EDI - Transshipment AMS 전송 기능 보완
				paramStr = paramStr + "&trnk_vsl_nm_bl=" + trnk_vsl_nm_bl + "&pre_vsl_nm_shp=" + pre_vsl_nm_shp + "&trnk_voy_bl=" + trnk_voy_bl
				+"&pre_voy_shp=" + pre_voy_shp + "&chk_hbl_no=" + chkHbl + "&chk_flg=" + formObj.chk_flg.value;
				console.log("paramStr"+paramStr);
				parent.mkNewFrame('OE AMS EDI', paramStr, "SEE_AMS_0020_SHEET_" + f_intg_bl_seq+"_"+f_mbl_no);				
				
			break;	
			
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_AMS_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_AMS_0010.002");
        }
	}
}

function POD_LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj  = document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
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
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType = "date";
            cal.select(formObj.etd_strdt,formObj.etd_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE21':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
        	cal.displayType = "date";
            cal.select(formObj.eta_strdt,formObj.eta_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
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

	var formObj  = document.frm1;
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    
    
    //ETD 계산
	var now 		= new Date(); 	
	
	var nxtDt		= new Date(Date.parse(now) + 15 * 1000 * 60 * 60 * 24);
	var preDt		= new Date(Date.parse(now) - 15 * 1000 * 60 * 60 * 24);
	
	var nxtyear		= nxtDt.getFullYear(); 			
	var nxtmonth	= nxtDt.getMonth() + 1;
	var nxtdate		= nxtDt.getDate(); 	
	
	var preyear		= preDt.getFullYear();
	var premonth	= preDt.getMonth() + 1;
	var predate		= preDt.getDate();
	
	if(nxtmonth < 10){
		nxtmonth = "0"+(nxtmonth);
	}
	
	if(premonth < 10){
		premonth = "0"+(premonth);
	}
	
	if(nxtdate < 10){
		nxtdate = "0"+nxtdate;
	}
	
	if(predate < 10){
		predate = "0"+predate;
	}

	PREDATE = premonth + "-" + predate + "-" + preyear;
	NXTDATE = nxtmonth + "-" + nxtdate + "-" + nxtyear;
	
    formObj.etd_strdt.value = PREDATE;
    formObj.etd_enddt.value = NXTDATE;
    
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
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
		      SetConfig( { MergeSheet:5} );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_AMS_0010_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ 
		                   {Type:"CheckBox",  Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                   {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ams_file_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"send_msg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"msg_sts_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",    ColMerge:1,   SaveName:"cstms_rgst_flg",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",    ColMerge:0,   SaveName:"dspo_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",    ColMerge:0,   SaveName:"hold_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"send_dt",      KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",  ColMerge:0,   SaveName:"pol_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:0,   SaveName:"pol_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",  ColMerge:0,   SaveName:"pod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:0,   SaveName:"pod_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"hbl_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"lnr_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_nm_bl",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pre_vsl_nm_shp",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"trnk_voy_bl",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pre_voy_shp",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				           {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } 
				           ];
		       
		      InitColumns(cols);
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		      SetEditable(1);
		      //InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      //InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
		      EditDateFormat = "MDY";
//		      SetGetActionMenu()("Column Hidden|-|Header Setting Save|Header Setting Reset");
		      SetSheetHeight(400);
		   }                                                      
		break;
		 case 2:      //IBSheet1 init
		    with (sheetObj) {
			 
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_AMS_0010_HDR2'), Align:"Center"} ];
		      InitHeaders(headers, info);

		      var cols = [ {Type:"Text",      Hidden:0,  Width:30,  Align:"Right",    ColMerge:0,   SaveName:"no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"msg_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"msg_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sts",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"disp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Text",      Hidden:0,  Width:420,  Align:"Left",    ColMerge:1,   SaveName:"result_msg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
		             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"rcv_tms",      KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0 },
		             {Type:"Text",      Hidden:1, Width:300,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 } ];
		       
		      InitColumns(cols);
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		      SetCountPosition(0);
		      SetEditable(0);
		      SetSheetHeight(160);
		      resizeSheet();
		   }                                                      
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
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
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}
//	}
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
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals.length > 0 ? masterVals[0] : "";
				formObj.f_pod_nm.value=masterVals.length > 3 ? masterVals[3] : "";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var f_intg_bl_seq=sheetObj.GetCellValue(Row, "intg_bl_seq");
	var f_mbl_no=sheetObj.GetCellValue(Row, "mbl_no");
	
	//#3685 [JAPT] AMS EDI - Transshipment AMS 전송 기능 보완
	var trnk_vsl_nm_bl=sheetObj.GetCellValue(Row, "trnk_vsl_nm_bl");
	var pre_vsl_nm_shp=sheetObj.GetCellValue(Row, "pre_vsl_nm_shp");
	var trnk_voy_bl=sheetObj.GetCellValue(Row, "trnk_voy_bl");
	var pre_voy_shp=sheetObj.GetCellValue(Row, "pre_voy_shp");
	var ams_file_no=sheetObj.GetCellValue(Row, "ams_file_no");
	var paramStr="./SEE_AMS_0020.clt?f_cmd=-1&f_intg_bl_seq="+f_intg_bl_seq+"&f_mbl_no="+f_mbl_no;

	//#3685 [JAPT] AMS EDI - Transshipment AMS 전송 기능 보완
	paramStr = paramStr + "&trnk_vsl_nm_bl=" + trnk_vsl_nm_bl + "&pre_vsl_nm_shp=" + pre_vsl_nm_shp + "&trnk_voy_bl=" + trnk_voy_bl
	//+"&pre_voy_shp=" + pre_voy_shp  + "&ams_file_no="+ams_file_no+"&chk_hbl_no=" + formObj.chk_hbl_no.value + "&chk_flg=N";
	+"&pre_voy_shp=" + pre_voy_shp  + "&chk_hbl_no=" + formObj.chk_hbl_no.value + "&chk_flg=N";
	
	parent.mkNewFrame('OE AMS EDI', paramStr, "SEE_AMS_0020_SHEET_" + f_intg_bl_seq+"_"+f_mbl_no);
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	//#3712 [JAPT]HBL 단위로 EDI Entry 연결
	if(colStr == "chk"){
    	if(sheetObj.GetCellValue(Row, "chk") == "0"){
    		if(!bChkSameVoyage(Row)){
    			sheetObj.SetCellValue(Row, "chk", "1");
    		}
    	}
    }else{
		docObjects[1].RemoveAll();
		formObj.f_cmd.value=SEARCHLIST02;
	var intgBlSeq=sheetObj.GetCellValue(Row, "intg_bl_seq");
	var hblNo=sheetObj.GetCellValue(Row, "hbl_no");
	docObjects[1].DoSearch("./SEE_AMS_0011GS.clt?intg_bl_seq=intgBlSeq&bl_no="+hblNo, FormQueryString(formObj) );
    }
}
function clearAll(){
	docObjects[0].RemoveAll();
	docObjects[1].RemoveAll();
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
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
//Calendar flag value
var firCalFlag=false;

function vslPopup(vslNm){
	if(vslNm == null){
		vslNm = ""
	}
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]=vslNm.toUpperCase();;
    callBackFunc = "VSL_POP";
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
}
        
function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_trnk_vsl_cd.value=rtnValAry[0];
		frm1.f_trnk_vsl_nm.value=rtnValAry[1];
	}
}
//#3712 [JAPT]HBL 단위로 EDI Entry 연결
function bChkSameVoyage(chkRow){
	for(var i=1; i<=docObjects[0].RowCount(); i++){
		if(docObjects[0].GetCellValue(i, "chk") == 1){
			if(docObjects[0].GetCellValue(chkRow, "trnk_voy") != docObjects[0].GetCellValue(i, "trnk_voy")
				||docObjects[0].GetCellValue(chkRow, "trnk_vsl_nm") != docObjects[0].GetCellValue(i, "trnk_vsl_nm")	
				||docObjects[0].GetCellValue(chkRow, "pol_cd") != docObjects[0].GetCellValue(i, "pol_cd")	
				||docObjects[0].GetCellValue(chkRow, "pod_cd") != docObjects[0].GetCellValue(i, "pod_cd")){
				alert(getLabel('EDI_COM_ALT253') );
				return false;
			}
		}
	}
	return true;
}
