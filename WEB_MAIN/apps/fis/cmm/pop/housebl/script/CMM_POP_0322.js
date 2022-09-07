/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0322.js
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

//#3900 [WORLD NET] OTHER FILE DELIVERY ORDER POP UP TP NAME AUTO SUGGEST NOT WORKING
//var curObjId = "";
var cur_curObj;
function doWork(srcName, curObj, valObj){
	cur_curObj = curObj;
	switch(srcName) {
		case "SEARCH":
			if(frm1.f_ref_no.value==''){
				//alert('[Reference No.]를 먼저 입력하십시오!');
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: CMM_POP_0322.9");
				frm1.f_ref_no.focus();
			}else{
	       		frm1.f_cmd.value=SEARCH;
	   			frm1.action="./CMM_POP_0322.clt";
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
			param += '[' + formObj.phn.value + ']'; //$18
			param += '[' + formObj.fax.value + ']'; //$19
			param += '[' + formObj.f_ref_no.value + ']'; //$20 [20130412 OJG]
			param += '[' + formObj.do_route.value + ']'; //$21 [20161007 CJS]
			formObj.rd_param.value=param;
			//alert(param);
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	///////////////////////////////////////////////////////////
	   break;
		case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1]=valObj;
	   		}else{
	   			rtnary[1]="";
	   		}
	   		
	   		rtnary[2]=window;
	   		
	   		var callTp='';
	   		if(curObj.id == "trn"){
	   			//callTp = 'TK';
	   			/* #23817 D/O PRINT? TRUCKER ? ????? ALL, jsjang 2013.11.22*/
	   			callTp='';
	   		}
	   		
	        callBackFunc = "PARTNER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt?callTp=' + callTp, rtnary, 1150,650,"yes");	        
	   		
       break;
		case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
  			rtnary[0]="";
			rtnary[1]="";
        	
        	callBackFunc = "REF_POPLIST";
	        modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	    break;
		case "CLOSE":
	    	window.close();
	    break;	
    }
}

function PARTNER_POPLIST(rtnVal){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var id=cur_curObj.id;
		if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			frm1.dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.dest_rout_trdp_nm.value=rtnValAry[10];//local_nm
			//frm1.dest_rout_addr.value=rtnValAry[7];//eng_addr
			frm1.dest_rout_addr.value=rtnValAry[37];//dflt_addr
			frm1.dest_rout_pic.value=rtnValAry[3];//pic_nm
			frm1.dest_rout_pic_phn.value=rtnValAry[4];//pic_phn
			frm1.dest_rout_pic_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			frm1.trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.trsp_trdp_nm.value=rtnValAry[10];//local_nm
			//frm1.trsp_trdp_addr.value=rtnValAry[7];//eng_addr
			frm1.trsp_trdp_addr.value=rtnValAry[37];//dflt_addr
			frm1.trsp_trdp_pic.value=rtnValAry[3];//pic_nm
			frm1.trsp_trdp_phn.value=rtnValAry[4];//pic_phn
			frm1.trsp_trdp_fax.value=rtnValAry[5];//pic_fax
		}
	}
}
function REF_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.s_ref_no.value=rtnValAry[2];
		frm1.s_mbl_no.value="";
		if(frm1.s_ref_no.value != ""){
			doWork('SEARCH');	
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
	//fnSetAutocomplete('trsp_trdp_nm'		, 'LINER_POPLIST', 'trdpCode_trsp', 'O'); 		//Trucker
	fnSetAutocompleteCallBack2('trsp_trdp_nm'		, 'PARTNER_POPLIST', 'LINER_POPLIST','trn', 'O'); 		//To Trucking Co	
    
	doWork('SEARCHLIST');
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0322.238");		
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0322.266");		
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0322.298");		
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
	var formObj=document.frm1;
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
		if(str =="partner_trucker"){
			formObj.trsp_trdp_cd.value="";//trdp_cd
			formObj.trsp_trdp_nm.value="";//shrt_nm
			formObj.trsp_trdp_addr.value="";//full_nm
			formObj.trsp_trdp_pic.value="";//full_nm
			formObj.trsp_trdp_phn.value="";//full_nm
			formObj.trsp_trdp_fax.value="";//full_nm
		}else if(str =="partner_delivery"){
			formObj.dest_rout_trdp_cd.value="";//trdp_cd
			formObj.dest_rout_trdp_nm.value="";//shrt_nm
			formObj.dest_rout_addr.value="";//full_nm	
			formObj.dest_rout_pic.value="";//full_nm	
			formObj.dest_rout_pic_phn.value="";//full_nm	
			formObj.dest_rout_pic_fax.value="";//full_nm	
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
			if(CODETYPE =="partner_trucker"){
				formObj.trsp_trdp_cd.value=masterVals[0];//trdp_cd
				formObj.trsp_trdp_nm.value=masterVals[16];//local trdp name 
				//formObj.trsp_trdp_addr.value=masterVals[14];//trdp_addr
				formObj.trsp_trdp_addr.value=masterVals[29];//dflt_addr
				formObj.trsp_trdp_pic.value=masterVals[10];//pic_nm
				formObj.trsp_trdp_phn.value=masterVals[11];//pic_phn
				formObj.trsp_trdp_fax.value=masterVals[12];//pic_fax
			}else if(CODETYPE =="partner_delivery"){
				formObj.dest_rout_trdp_cd.value=masterVals[0];//trdp_cd
				formObj.dest_rout_trdp_nm.value=masterVals[16];//local trdp name 
				//formObj.dest_rout_addr.value=masterVals[14];//trdp_addr
				formObj.dest_rout_addr.value=masterVals[29];//dflt_addr
				formObj.dest_rout_pic.value=masterVals[10];//pic_nm	
				formObj.dest_rout_pic_phn.value=masterVals[11];//pic_phn	
				formObj.dest_rout_pic_fax.value=masterVals[12];//pic_fax	
			}
		}else{
			if(CODETYPE =="partner_trucker"){
				formObj.trsp_trdp_cd.value="";//trdp_cd
				formObj.trsp_trdp_nm.value="";//shrt_nm
				formObj.trsp_trdp_addr.value="";//full_nm
				formObj.trsp_trdp_pic.value="";//full_nm
				formObj.trsp_trdp_phn.value="";//full_nm
				formObj.trsp_trdp_fax.value="";//full_nm
			}else if(CODETYPE =="partner_delivery"){
				formObj.dest_rout_trdp_cd.value="";//trdp_cd
				formObj.dest_rout_trdp_nm.value="";//shrt_nm
				formObj.dest_rout_addr.value="";//full_nm	
				formObj.dest_rout_pic.value="";//full_nm	
				formObj.dest_rout_pic_phn.value="";//full_nm	
				formObj.dest_rout_pic_fax.value="";//full_nm	
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0322.454");		
	}
}

