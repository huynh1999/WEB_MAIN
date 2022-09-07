/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0060.jsp
*@FileTitle  : Node Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
function doWork(srcName, strFlg){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
            	sheetObj.DoSearch("MDM_MCM_0060GS.clt", FormQueryString(formObj) );
            }
            displayClear();
		break;
		case "SEARCHLIST01":
            formObj.f_cmd.value=SEARCHLIST01;
            //검증로직
            if(validateForm(sheetObj2, formObj, SEARCHLIST, 1)){
            	sheetObj2.DoSearch("MDM_MCM_0061GS.clt", FormQueryString(formObj) );
            	// 콤보 초기화
 				var intTpCdCnt=formObj.i_nod_tp_cd.length;
			   	for ( var j=0 ; j < intTpCdCnt ; j++ ) {
					formObj.i_nod_tp_cd[j].checked=false;
			    }
			    // Hidden Sheet의 정보를 CheckBox로 가져옴
            //no support[check again]CLT 	var intRows=sheetObj2.Rows;
            	var intTpCdCnt=formObj.i_nod_tp_cd.length;
            	for ( var i=1 ; i < intRows ; i++ ) {
            		for ( var j=0 ; j < intTpCdCnt ; j++ ) {
            			if ( formObj.i_nod_tp_cd[j].value == sheetObj2.GetCellValue(i, 0) ) {
							formObj.i_nod_tp_cd[j].checked=true;
						}
					}
            	}
            }
		break;
		case "ADD":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=ADD;
				sheetObj.DoSearch("MDM_MCM_0060GS.clt", FormQueryString(formObj) );
	        }
			doWork('SEARCHLIST');
		break;
		case "MODIFY":
			if ( confirm(getLabel('FMS_COM_CFMSAV')) ) {
				useFlgChange();
				formObj.f_cmd.value=MODIFY;
				sheetObj.DoSearch("MDM_MCM_0060GS.clt", FormQueryString(formObj) );
	        }
		break;
		case "ROWADD":
       //no support[check again]CLT 		var iRows=sheetObj.Rows;
            var Row=sheetObj.DataInsert(++iRows);
            sheetObj.SetCellValue(Row, 3,formObj.i_conti_cd.value);
			sheetObj.SetCellValue(Row, 4,formObj.i_locl_nm.value);
			sheetObj.SetCellValue(Row, 5,formObj.i_nod_tp_desc.value);
			sheetObj.SetCellValue(Row, 9,formObj.i_rgst_usrid.value);
			sheetObj.SetCellValue(Row, 11,formObj.i_rgst_tms.value);
			sheetObj.SetCellValue(Row, 12,formObj.i_modi_usrid.value);
			sheetObj.SetCellValue(Row, 13,formObj.i_modi_tms.value);
			var bolUseYn=formObj.i_use_flg.checked;
			if ( bolUseYn == "true" ) {
				sheetObj.SetCellValue(Row, 6,"Y");
			} else {
				sheetObj.SetCellValue(Row, 6,"N");
			}
		break;
		case "REMOVE":
            formObj.f_cmd.value=REMOVE;
            if(validateForm(sheetObj,formObj,REMOVE, 1)){
            	//'삭제하시겠습니까?')){
            	if(confirm(getLabel('FMS_COM_CFMDEL'))){
                    doProcess=true;
                    sheetObj.DoSave("MDM_MCM_0060GS.clt", FormQueryString(formObj),"ibflag",false);
                }
			}
		break;
       	case "SEARCH":
			doAction();
		break;
		case "CURRENCY_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var rtnary=new Array(1);
			rtnary[0]="1";
			var rtnVal =  window.showModalDialog('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:480px");
			if (rtnVal == "") {
				return;
			}
				var rtnValAry=rtnVal.split("|");
				formObj.i_curr_cd.value=rtnValAry[0];
				//formObj.s_currency_name.value = rtnValAry[1];
		break;
		case "LOCATION_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
			var rtnary=new Array(4);
	   		rtnary[0]="1";
	   		rtnary[1]="";//대륙코드 
	   		rtnary[2]="";//국가코드
	   		rtnary[3]="LOC";// Class
   	        var rtnVal =  window.showModalDialog('./CMM_POP_0030.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				if ( strFlg == "S" ) {
					formObj.s_loc_cd.value=rtnValAry[0];
				} else if ( strFlg == "I" ) {
					formObj.i_loc_cd.value=rtnValAry[0];//loc_cd 
					formObj.s_nod_cd.value=rtnValAry[0];//nod_cd
//					formObj.i_nod_cd1.value = rtnValAry[0];//nod_cd
//					formObj.i_nod_cd2.value = "";
					formObj.i_loc_nm.value=rtnValAry[2];//loc_nm
				}
			} 
		break;
		case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	var rtnary=new Array(1);
	   		rtnary[0]="1";
   	        var rtnVal = window.showModalDialog('./CMM_POP_0060.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.i_pic_nm.value=rtnValAry[0];
				//formObj.s_user_name.value = rtnValAry[1];
			}
		break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data
				ComShowCodeMessage("COM132501");
				}else{
//					sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
					sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
				}
		break;
    }
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
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
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('MDM_MCM_0060_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                 {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"nod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"nod_eng_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"nod_tp_desc",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:90,   Align:"Left",    ColMerge:1,   SaveName:"loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"nod_addr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"pic_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rgst_tms",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"modi_tms",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" },
                 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pic_phn" },
                 {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pic_fax" } ];
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(310);
           }                                                      
           break;
           case 2:      //IBSheet1 init
            with (sheetObj) {
               var HeadTitle="NOD_TP_CD" ;
               SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
               var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
               var headers = [ { Text:HeadTitle, Align:"Center"} ];
               InitHeaders(headers, info);
               var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"com_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
               InitColumns(cols);
               SetEditable(1);
               SetVisible(0);
           }                                                      
           break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var strNodCd=sheetObj.GetCellValue(Row, "nod_cd");
	formObj.i_nod_cd.value=strNodCd;
	formObj.s_nod_cd.value=strNodCd;
//	formObj.i_nod_cd1.value    = strNodCd.substring(0, 5);
//	formObj.i_nod_cd2.value    = strNodCd.substring(5, 7);
	formObj.i_nod_eng_nm.value=sheetObj.GetCellValue(Row, "nod_eng_nm");
	formObj.i_loc_cd.value=sheetObj.GetCellValue(Row, "loc_cd");
	formObj.i_loc_nm.value=sheetObj.GetCellValue(Row, "loc_nm");
	formObj.i_nod_tp_desc.value=sheetObj.GetCellValue(Row, "nod_tp_desc");
	formObj.i_nod_addr.value=sheetObj.GetCellValue(Row, "nod_addr");
	formObj.i_pic_nm.value=sheetObj.GetCellValue(Row, "pic_nm");
	formObj.i_pic_phn.value=sheetObj.GetCellValue(Row, "pic_phn");
	formObj.i_pic_fax.value=sheetObj.GetCellValue(Row, "pic_fax");
	formObj.i_rgst_usrid.value=sheetObj.GetCellValue(Row, "rgst_usrid");
	formObj.i_rgst_tms.value=sheetObj.GetCellValue(Row, "rgst_tms");
	formObj.i_modi_usrid.value=sheetObj.GetCellValue(Row, "modi_usrid");
	formObj.i_modi_tms.value=sheetObj.GetCellValue(Row, "modi_tms");
//	formObj.s_nod_cd.disabled = true;
//	formObj.i_nod_cd1.disabled = true;
//	formObj.i_nod_cd2.disabled = true;
	formObj.i_loc_cd.disabled=true;
	formObj.i_loc_nm.disabled=true;
//	formObj.i_nod_cd2.className= "search_form-disable";
	formObj.i_loc_cd.className="search_form-disable";
	formObj.imgLocCd.disabled=true;
	var bolUseYn=sheetObj.GetCellValue(Row, "use_flg");
	if ( bolUseYn == "Y" ) {
		formObj.i_use_flg.checked=true;
	} else if ( bolUseYn == "N" ) {
		formObj.i_use_flg.checked=false;
	}
	doWork('SEARCHLIST01');
}
function displayClear() {
	var formObj=document.frm1;
	formObj.i_nod_cd.value="";
	formObj.i_nod_eng_nm.value="";
	formObj.i_loc_cd.value="";
	formObj.i_loc_nm.value="";
	formObj.i_nod_tp_desc.value="";
	formObj.i_nod_addr.value="";
	formObj.i_pic_nm.value="";
	formObj.i_pic_phn.value="";
	formObj.i_pic_fax.value="";
	formObj.i_rgst_usrid.value="";
	formObj.i_rgst_tms.value="";
	formObj.i_modi_usrid.value="";
	formObj.i_modi_tms.value="";
	formObj.f_nod_tp_cd.value="";
	formObj.i_nod_cd.value="";
	formObj.s_nod_cd.value="";
//	formObj.i_nod_cd1.value    = "";
//	formObj.i_nod_cd2.value    = "";
//	formObj.i_nod_cd1.disabled = true;
//	formObj.i_nod_cd2.disabled = false;
	formObj.i_loc_cd.disabled=false;
	formObj.i_loc_nm.disabled=false;
//	formObj.i_nod_cd2.className= "search_form";
	formObj.i_loc_cd.className="search_form";
//	formObj.imgLocCd.disabled=false;
	var intTpCdCnt=formObj.i_nod_tp_cd.length;
   	for ( var j=0 ; j < intTpCdCnt ; j++ ) {
		formObj.i_nod_tp_cd[j].checked=false;
    }
}
/**
 * 콤보 조회
 */
function doAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_nod_cd=formObj.i_nod_cd.value;
	if ( !fncInputCheck() ) return false;
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchNodeCode&s_nod_cd='+i_nod_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			doWork("MODIFY");
		} else {
			doWork("ADD");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0060.432");		
	}
}
function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
	}
	var intTpCdCnt=formObj.i_nod_tp_cd.length;
	var strTpCd="";
	for ( var i=0 ; i < intTpCdCnt ; i++ ) {
		if ( formObj.i_nod_tp_cd[i].checked == true ) {
			strTpCd=strTpCd + formObj.i_nod_tp_cd[i].value + ";";
		}
	}
	strTpCd=strTpCd.substring(0, strTpCd.length-1);
	formObj.f_nod_tp_cd.value=strTpCd;
	formObj.i_nod_cd.value=formObj.s_nod_cd.value;
//	formObj.i_nod_cd.value = formObj.i_nod_cd1.value + formObj.i_nod_cd2.value;
//	formObj.s_nod_cd.disabled = false;
//	formObj.i_nod_cd1.disabled = false;
//	formObj.i_nod_cd2.disabled = false;
}
function fncLocationChange(tmp) {
	var formObj=document.frm1;
	tmp.value=tmp.value.toUpperCase();
	formObj.s_nod_cd.value=formObj.i_loc_cd.value;
//	formObj.i_nod_cd1.value = formObj.i_loc_cd.value;
}
function fncLocTpCdClick() {
	var formObj=document.frm1;
	var iLen=formObj.i_nod_tp_cd.length;
	var strTmp="";
	var arrTmp=PARAM1_1.split('|');
	for ( var i=0 ; i < iLen ; i++ ) {
		if ( formObj.i_nod_tp_cd[i].checked == true ) { 
			if ( strTmp != "" ) strTmp += ", ";
			strTmp += arrTmp[i];
		}
	}
	formObj.i_nod_tp_desc.value=strTmp;
}
function fncNodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function fncInputCheck() {
	var formObj=document.frm1;
	if(checkInputVal(formObj.i_loc_cd.value, 3, 5, "T", getLabel('LOC_CD'))!='O'){
		formObj.i_loc_cd.focus();
    	return false;
    }
	if(checkInputVal(formObj.s_nod_cd.value, 3, 10, "T", getLabel('NOD_CD'))!='O'){
		formObj.s_nod_cd.focus();
    	return false;
    }
//	if(checkInputVal(formObj.i_nod_cd1.value, 3, 5, "T", getLabel('NOD_CD'))!='O'){
//		formObj.i_nod_cd1.focus();
//    	return false;
//    }
//
//	if(checkInputVal(formObj.i_nod_cd2.value, 2, 2, "T", getLabel('NOD_CD'))!='O'){
//		formObj.i_nod_cd2.focus();
//    	return false;
//    }
	if(checkInputVal(formObj.i_nod_eng_nm.value, 1, 50, "T", getLabel('NAME'))!='O'){
		formObj.i_nod_eng_nm.focus();
    	return false;
    }
	if(checkInputVal(formObj.i_nod_tp_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
		formObj.i_desc.focus();
    	return false;
    }
    if(checkInputVal(formObj.i_nod_addr.value, 1, 400, "T", getLabel('ADDR'))!='O'){
    	formObj.i_nod_addr.focus();
    	return false;
    }
    if(checkInputVal(formObj.i_pic_nm.value, 0, 50, "T", getLabel('PIC'))!='O'){
    	formObj.i_pic_nm.focus();
    	return false;
    }
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
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
				formObj.i_cnt_cd.value=masterVals[0];//cnt_cd
				formObj.i_cnt_nm.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value=masterVals[0];//loc_cd 
				formObj.s_nod_cd.value=masterVals[0];//nod_cd
//				formObj.i_nod_cd1.value = masterVals[0];//nod_cd 
				formObj.i_loc_nm.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.i_finc_ofc_cd.value=masterVals[0];
				formObj.i_finc_ofc_nm.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.i_pic_nm.value=masterVals[0];
				//formObj.s_user_name.value = masterVals[3];
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
			}
		}else{
			if(CODETYPE =="partner"){
				formObj.i_trdp_cd.value="";//trdp_cd
				//formObj.s_liner_abbr.value = "";//shrt_nm
				formObj.i_trdp_nm.value="";//full_nm
			}else if(CODETYPE =="country"){
				formObj.i_cnt_cd.value="";//cnt_cd
				formObj.i_cnt_nm.value="";//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.i_loc_cd.value="";//loc_cd 
				formObj.s_nod_cd.value="";//nod_cd
//				formObj.i_nod_cd1.value = "";//nod_cd 
				formObj.i_loc_nm.value="";//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value="";
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value="";
				formObj.s_office_name.value="";
			}else if(CODETYPE =="user"){
				formObj.i_pic_nm.value="";
				//formObj.s_user_name.value = "";
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
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001') + "\n\n: MDM_MCM_0060.653");		
	}
}
