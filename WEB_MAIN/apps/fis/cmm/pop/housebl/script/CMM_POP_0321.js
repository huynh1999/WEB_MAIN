/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0321.js
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var curObjId = "";
function doWork(srcName, curObj){
	switch(srcName) {
		case "SEARCH":
			if(frm1.f_bl_no.value==''){
				//alert('[B/L No.]를 먼저 입력하십시오!');
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: CMM_POP_0321.9");
				frm1.f_bl_no.focus();
			}else{
	       		frm1.f_cmd.value=SEARCH;
	   			frm1.action="./CMM_POP_0321.clt";
			    frm1.submit();
			}
		break;
        case "PRINT":
        	///////////////////////////////////////////////////////////
    	    // 프린트
    	    var formObj=document.frm1;
			formObj.file_name.value='delivery_order_02.mrd';
			formObj.title.value='Delivery Order';
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_bl_no.value + ']'; // $1
			param += '[' + formObj.ofc_eng_nm.value + ']';
			param += '[' + formObj.eml.value + ']';
			param += '[' + formObj.user_name.value + ']';
			param += '[' + formObj.intg_bl_seq.value + ']';
			param += '[' + formObj.prepaid_collect.value + ']'; // $6
			param += '[' + formObj.prepaid_collect.options[formObj.prepaid_collect.selectedIndex].text + ']';
			param += '[' + formObj.value_to_show.value + ']';
			param += '[' + formObj.value_to_show.options[formObj.value_to_show.selectedIndex].text + ']';
			param += '[' + formObj.trsp_trdp_nm.value + ']';
			param += '[' + formObj.dest_rout_trdp_nm.value + ']';  // $11
			param += '[' + formObj.dest_rout_addr.value + ']'; 
			param += '[' + formObj.dest_rout_pic.value + ']';
			param += '[' + formObj.dest_rout_pic_phn.value + ']';
			param += '[' + formObj.dest_rout_pic_fax.value + ']';
			param += '[' + formObj.rmk.value + ']'; // $16
			param += '[' + formObj.do_rmk.value + ']'; 
			formObj.rd_param.value=param;
			//alert(param);
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	///////////////////////////////////////////////////////////
	   break;
		case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		curObjId = curObj.id;
	   		callBackFunc = "PARTNER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
       break;
    }
}

function PARTNER_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var id=curObjId;
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			frm1.org_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.org_rout_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.org_rout_addr.value=rtnValAry[7];//eng_addr
			frm1.org_rout_pic.value=rtnValAry[3];//pic_nm
			frm1.org_rout_pic_phn.value=rtnValAry[4];//pic_phn
			frm1.org_rout_pic_fax.value=rtnValAry[5];//pic_fax	
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			frm1.dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.dest_rout_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.dest_rout_addr.value=rtnValAry[7];//eng_addr
			frm1.dest_rout_pic.value=rtnValAry[3];//pic_nm
			frm1.dest_rout_pic_phn.value=rtnValAry[4];//pic_phn
			frm1.dest_rout_pic_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			frm1.trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.trsp_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.trsp_trdp_addr.value=rtnValAry[7];//eng_addr
			frm1.trsp_trdp_pic.value=rtnValAry[3];//pic_nm
			frm1.trsp_trdp_phn.value=rtnValAry[4];//pic_phn
			frm1.trsp_trdp_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="bil") {
			var rtnValAry=rtnVal.split("|");
			frm1.bill_to_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.bill_to_trdp_nm.value=rtnValAry[2];//eng_nm
			frm1.bill_to_trdp_addr.value=rtnValAry[7];//eng_addr
		}
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
}
function displayClear() {
	var formObj=document.frm1;
	formObj.i_cnt_cd.value="";
	formObj.i_cnt_locl_nm.value="";
	formObj.i_desc.value="";
	formObj.i_conti_cd.value="";
	//formObj.i_conti_nm.value = "";
	formObj.i_cnt_eng_nm.value="";
	formObj.i_prnt_conti_cd.value="";
	//formObj.i_prnt_conti_nm.value = "";
	formObj.i_rgst_usrid.value="";
	formObj.i_rgst_tms.value="";
	formObj.i_modi_usrid.value="";
	formObj.i_modi_tms.value="";
	formObj.i_curr_cd.value="";
	formObj.i_use_flg.checked="true";
	formObj.i_cnt_cd.disabled=false;
	formObj.i_cnt_cd.className="search_form";
}
/**
 * 콤보 조회
 */
function doSContiAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var s_prnt_conti_cd=formObj.s_prnt_conti_cd.value;
	ajaxSendPost(dispSContiAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchSubContinentCode&s_prnt_conti_cd='+s_prnt_conti_cd, './GateServlet.gsl');
}
/**
 * 콤보 조회
 */
function doIContiAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_prnt_conti_cd=formObj.i_prnt_conti_cd.value;
	ajaxSendPost(dispIContiAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchSubContinentCode&s_prnt_conti_cd='+i_prnt_conti_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispSContiAjaxReq1(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var arrTmp=doc[1].split(';');
			var arrContiCd=arrTmp[0].split('|');
			var arrContiNm=arrTmp[1].split('|');
			document.frm1.s_conti_cd.text=1; 
			document.frm1.s_conti_cd.options[0]=new Option("","");
			for ( var i=1 ; i < arrContiCd.length ; i++ ) {
				document.frm1.s_conti_cd.options[i]=new Option(arrContiNm[i-1],arrContiCd[i-1]);
			}
			document.frm1.s_conti_cd.options[0].selected="true";
		} else {
			document.frm1.s_conti_cd.length=1;
			document.frm1.s_conti_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0321.217");		
	}
}
//확인 Ajax
function dispIContiAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined' && doc[1]!=';'){
			var arrTmp=doc[1].split(';');
			var arrContiCd=arrTmp[0].split('|');
			var arrContiNm=arrTmp[1].split('|');
			document.frm1.i_conti_cd.text=1; 
			document.frm1.i_conti_cd.options[0]=new Option("","");
			for ( var i=1 ; i < arrContiCd.length ; i++ ) {
				document.frm1.i_conti_cd.options[i]=new Option(arrContiNm[i-1],arrContiCd[i-1]);
			}
			document.frm1.i_conti_cd.options[0].selected="true";
		} else {
			document.frm1.i_conti_cd.length=1;
			document.frm1.i_conti_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0321.245");		
	}
}
function doAction(){
	var formObj=document.frm1;
	//alert("i_conti_cd===>"+formObj.i_conti_cd.value);
	var i_cnt_cd=formObj.i_cnt_cd.value;
	if(checkAddModiVal(frm1)){
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchContryCode&s_cnt_cd='+i_cnt_cd, './GateServlet.gsl');
	}
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(checkAddModiVal(frm1)){
				doWork("MODIFY");
			}
		} else {
			if(checkAddModiVal(frm1)){
				doWork("ADD");
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0321.277");		
	}
}
function useFlgChange() {
	var formObj=document.frm1;
	if ( formObj.i_use_flg.checked == true ) {
		formObj.i_use_flg.value="Y";
	} else if ( formObj.i_use_flg.checked == false ) {
		formObj.i_use_flg.value="N";
	}
	formObj.i_cnt_cd.disabled=false;
}
function fncContrySearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}
function checkAddModiVal(frm1){
    if(checkInputVal(frm1.i_cnt_cd.value, 2, 2, "T", getLabel('CNT_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(frm1.i_prnt_conti_cd.value, getLabel('CONTI_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(frm1.i_conti_cd.value, getLabel('SUB_CONTI_CD'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_cnt_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_cnt_eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    } else if(checkInputVal(frm1.i_curr_cd.value, 0, 3, "T", getLabel('CURR'))!='O'){
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
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="partner"){
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				formObj.s_node_code.value=masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value=masterVals[0];//cd_val
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
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
				formObj.s_liner_code.value=masterVals[0];//trdp_cd
				formObj.s_liner_abbr.value=masterVals[2];//shrt_nm
				formObj.s_liner_name.value=masterVals[3];//full_nm
			}else if(CODETYPE =="country"){
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
			}else if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				formObj.s_node_code.value=masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.i_curr_cd.value="";
				//doWork('CURRENCY_POPLIST');
				//formObj.s_currency_name.value = masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
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
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0321.433");		
	}
}