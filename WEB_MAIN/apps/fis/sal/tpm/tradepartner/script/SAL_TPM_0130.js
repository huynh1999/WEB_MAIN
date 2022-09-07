var rtnary=new Array(1);
var callBackFunc = "";
var isError=false;
var valCheck=false;
function doWork(srcName, curObj, valObj){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	try {
		switch(srcName) {
			case "SEARCHLIST":
				frm1.f_cmd.value=SEARCHLIST;
					sheetObj.DoSearch("./SAL_TPM_0130GS.clt", FormQueryString(formObj) );
				break;
			
			case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
			   	rtnary[0]="1";
			   	rtnary[1]="";
			   	rtnary[2]=window;
			   	callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp=AL', rtnary, 1150,650,"yes");
           break;
			case "PARTNER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
			   	rtnary[0]="1";
			   	rtnary[1]=formObj.f_fm_trdp_nm.value;
			   	rtnary[2]=window;
			   	callBackFunc = "PARTNER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp=AL', rtnary, 1150,650,"yes");
           break;
			case "PARTNER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]="";
				rtnary[2]=window;
				callBackFunc = "PARTNER_POPLIST2";
				modal_center_open('./CMM_POP_0010.clt?callTp=AL', rtnary, 1150,650,"yes");
				break;
			case "PARTNER_POPLIST2_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]=formObj.f_to_trdp_nm.value;
				rtnary[2]=window;
				callBackFunc = "PARTNER_POPLIST2";
				modal_center_open('./CMM_POP_0010.clt?callTp=AL', rtnary, 1150,650,"yes");
				break;
				
        } 
	}catch(e) {
        if(e == "[object Error]"){
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
        }
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
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    doWork('SEARCHLIST');
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
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
    	case 1:     
			with (sheetObj) {
    		
    		SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('SAL_TPM_0130_HDR1'), Align:"Center"},
                            { Text:getLabel('SAL_TPM_0130_HDR2'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"fm_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"fm_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"to_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"to_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:160,  Align:"Center",    ColMerge:1,   SaveName:"mrg_chk_n1st",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:160,  Align:"Center",    ColMerge:1,   SaveName:"mrg_chk_n2nd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:160,  Align:"Center",    ColMerge:1,   SaveName:"mrg_chk_n3rd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
               
                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
             
            InitColumns(cols);
            SetSheetHeight(410);
            SetEditable(1);
            resizeSheet();
			}
        break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
}

function entSearch(){
	if(event.keyCode == 13){
		if (document.frm1.f_vis_id.value!=''){
			doWork('SEARCHLIST')
		}
	}
}
/**
* code name select
*/
function codeNameAction(str, obj, tmp, sheet){
	if(obj.value != ""){
		CODETYPE=str;
		var sub_str=str.substring(0,8);
		if(sub_str == "partner_"){
			str='del_trdpcode'
		}	
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else if(tmp == "onBlur" && obj.value == ""){
		frm1.f_fm_trdp_nm.value="";
	}
}
function codeNameAction2(str, obj, tmp, sheet){
	if(obj.value != ""){
		CODETYPE=str;
		var sub_str=str.substring(0,8);
		if(sub_str == "partner_"){
			str='trdpcode'
		}	
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else if(tmp == "onBlur" && obj.value == ""){
		frm1.f_to_trdp_nm.value="";
	}
}



//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var frm1=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			//alert(rtnArr[0]);
			if(CODETYPE =="partner_pickup_delete"){
				frm1.f_fm_trdp_cd.value=masterVals[0];
				frm1.f_fm_trdp_nm.value=masterVals[3];
				//doWork('SEARCHLIST');
			}
		}else{
			if(CODETYPE =="partner_pickup_delete"){
				frm1.f_fm_trdp_cd.value="";
				frm1.f_fm_trdp_nm.value="";
			}
		}
	}else{
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var frm1=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			//alert(rtnArr[0]);
			if(CODETYPE =="partner_pickup"){
				frm1.f_to_trdp_cd.value=masterVals[0];
				frm1.f_to_trdp_nm.value=masterVals[3];
				doWork('SEARCHLIST');
			}
		}else{
			if(CODETYPE =="partner_pickup"){
				frm1.f_to_trdp_cd.value="";
				frm1.f_to_trdp_nm.value="";
			}
		}
	}else{
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function checkDuplVisIdAjaxReq(reqVal){
	sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
        		alert(getLabel('FMS_COM_ALT008') + " - Visibility ID");
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "vis_id","",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), "vis_id");
			}
		}
	}else{
		refCheck=false;
	}
}
function checkDuplVisPartnerDataAjaxReq(reqVal){
	sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='DP'){
				alert(getLabel('FMS_COM_ALT008') +  ": " + "Visibility Data");
				sheetObj.SelectCell(sheetObj.GetSelectRow(), "vis_id");
				valCheck=false;
			} else {
				valCheck=true;
			}
		}
	}else{
		valCheck=false;
	}
}
function validateInputValue(){
	sheetObj=docObjects[0];
	for(var i=1; i<=sheetObj.LastRow(); i++){
		var vis_pw = sheetObj.GetCellValue(i,'vis_pw').toUpperCase();
		sheetObj.SetCellValue(i,'vis_pw',vis_pw);	//Password Uppercase 
		
		var visId=sheetObj.GetCellValue(i,'vis_id');
		var trdpCd=sheetObj.GetCellValue(i,'trdp_cd');
		var trdpTpCd=sheetObj.GetCellValue(i,'trdp_tp_cd');
		var ibflag=sheetObj.GetCellValue(i,'ibflag');
		var trdpSeq=sheetObj.GetCellValue(i,'usr_trdp_seq');
		if (trim(visId) == "") {
			alert(getLabel('FMS_COM_ALT007') +  ": " + "Visibility Id");
			sheetObj.SelectCell(i, "vis_id");
			return false;
		}
		if (trim(trdpTpCd) == "") {
			alert(getLabel('FMS_COM_ALT007') +  ": " + "Partner Type");
			sheetObj.SelectCell(i, "trdp_tp_cd");
			return false;
		}
		if (trim(trdpCd) == "") {
			alert(getLabel('FMS_COM_ALT007') +  ": " + "Trade Partner Code");
			sheetObj.SelectCell(i, "trdp_cd");
			return false;
		}
		// 3개의 값이 null 아니면 중복체크를 실시한다.
		if (ibflag == "I" || ibflag == "U") {
			valCheck=false;
			if (ibflag == 'I') {
				trdpSeq=0;
			}
			ajaxSendPost(checkDuplVisPartnerDataAjaxReq, 'reqVal', '&goWhere=aj&bcKey=checkDuplVisPartnerData&vis_id='+visId+'&trdp_cd='+trdpCd+'&trdp_tp_cd='+trdpTpCd+'&usr_trdp_seq='+trdpSeq, './GateServlet.gsl');
			if (valCheck){
				return true;
			} else {
				return false;
			}
		}
	}
	return true;
}
function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == undefined || rtnVal == "undefined" || rtnVal == "") {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	frm1.f_fm_trdp_cd.value=rtnValAry[0];
	frm1.f_fm_trdp_nm.value=rtnValAry[2];
	doWork('SEARCHLIST');
}

function PARTNER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == undefined || rtnVal == "undefined" || rtnVal == "") {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	frm1.f_to_trdp_cd.value=rtnValAry[0];
	frm1.f_to_trdp_nm.value=rtnValAry[2];
	doWork('SEARCHLIST');
}