/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0320.js
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/24
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var curObjId = "";
function doWork(srcName, curObj, valObj){
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCH":
			if(formObj.f_bl_no.value==''){
				//alert('[B/L No.]를 먼저 입력하십시오!'); 
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: CMM_POP_0320.9");
				formObj.f_bl_no.focus();
			}else{
	       		formObj.f_cmd.value=SEARCH;
	   			formObj.action="./CMM_POP_0320.clt";
			    formObj.submit();
			}
		break;
        case "PRINT":
    	    // 프린트
			//formObj.file_name.value='delivery_order_01.mrd';
        	formObj.file_name.value=formObj.mrd_file_nm.value;
        	formObj.title.value='Delivery Order';
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_bl_no.value + ']'; // $1
			param += '[' + formObj.ofc_eng_nm.value + ']';// $2
			param += '[' + formObj.eml.value + ']';// $3
			param += '[' + formObj.user_name.value + ']';// $4
			param += '[' + formObj.intg_bl_seq.value + ']';// $5
			param += '[' + formObj.prepaid_collect.value + ']'; // $6
			param += '[' + formObj.prepaid_collect.options[formObj.prepaid_collect.selectedIndex].text + ']';// $7
			param += '[' + formObj.value_to_show.value + ']';// $8
			param += '[' + formObj.value_to_show.options[formObj.value_to_show.selectedIndex].text + ']';// $9
			param += '[' + formObj.trsp_trdp_nm.value + ']';//$10
			param += '[' + formObj.dest_rout_trdp_nm.value + ']'; //$11
			param += '[' + formObj.dest_rout_addr.value + ']'; // $12
			param += '[' + formObj.dest_rout_pic.value + ']';// $13
			param += '[' + formObj.dest_rout_pic_phn.value + ']';//$14
			param += '[' + formObj.dest_rout_pic_fax.value + ']';//$15
			param += '[' + formObj.rmk.value + ']'; //$16
			param += '[' + formObj.do_rmk.value + ']'; // $17
			param += '[' + formObj.liner_trdp_nm.value + ']'; // $18
			param += '[' + formObj.tel.value + ']';//$19
			param += '[' + formObj.fax.value + ']';//$20
			param += '[' + formObj.air_sea_clss_cd.value + ']';//$21
			param += '[' + formObj.pickup_trdp_nm.value + ']'; //$22
			param += '[' + formObj.pickup_addr.value + ']'; // $23
			param += '[' + formObj.pickup_pic.value + ']';// $24
			param += '[' + formObj.pickup_pic_phn.value + ']';//$25
			param += '[' + formObj.pickup_fax.value + ']';//$26
			param += '[' + formObj.do_route.value + ']';//$27
			param += '[' + formObj.trsp_trdp_cd.value + ']'//$28
			formObj.rd_param.value=param;
			if (formObj.air_sea_clss_cd.value == "S") {
				formObj.rpt_biz_tp.value="OIH";
			} else if (formObj.air_sea_clss_cd.value == "A") {
				formObj.rpt_biz_tp.value="AIH";
			}
			formObj.rpt_biz_sub_tp.value="DO";
			formObj.rpt_trdp_cd.value=formObj.trsp_trdp_cd.value;
			// [OFVFOUR-7877] [KING FREIGHT NYC] ADD CNTR # IN SUBJECT LINE WHEN SENDING D/O
			// Modified by Thinh Nguyen
			if (formObj.f_cntr_no.value != ""){
				formObj.mailTitle.value='Delivery Order [HBL No : ' + formObj.f_bl_no.value + ']' + '[Cntr.No: ' + formObj.f_cntr_no.value +']'; 
			} else {
				formObj.mailTitle.value='Delivery Order [HBL No : ' + formObj.f_bl_no.value + ']'; //[20140112 OJG] 이메일 제목추가
			}
			
			
			//#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
			if (formObj.f_bl_no.value != ""){
				var v_bl_no = formObj.f_bl_no.value ;
				v_bl_no = v_bl_no.replace(/\./g, "");
				v_bl_no = v_bl_no.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
				formObj.rpt_file_name_title.value = "Delivery_Order _"+v_bl_no ;
			} else {
				formObj.rpt_file_name_title.value = "";
			}
			
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   break;
		case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1]=valObj;
	   		}else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
	        //var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=TK', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   		/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
	   		curObjId = curObj.id;
	        callBackFunc = "PARTNER_POPLIST";
	        modal_center_open('./CMM_POP_0010.clt?callTp=', rtnary, 1150,650,"yes");
       break;
   		/* jsjang 2013.7.17 short cut key */
		case "CLOSE":
			window.close(); 
		break;	       
    }
}

function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var id=curObjId;
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			formObj.org_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.org_rout_trdp_nm.value=rtnValAry[2];//eng_nm
			//formObj.org_rout_addr.value=rtnValAry[7];//eng_addr
			formObj.org_rout_addr.value=rtnValAry[37];//dflt_addr
			formObj.org_rout_pic.value=rtnValAry[3];//pic_nm
			formObj.org_rout_pic_phn.value=rtnValAry[4];//pic_phn
			formObj.org_rout_pic_fax.value=rtnValAry[5];//pic_fax	
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			formObj.dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.dest_rout_trdp_nm.value=rtnValAry[2];//eng_nm
			//formObj.dest_rout_addr.value=rtnValAry[7];//eng_addr
			formObj.dest_rout_addr.value=rtnValAry[37];//dflt_addr
			formObj.dest_rout_pic.value=rtnValAry[3];//pic_nm
			formObj.dest_rout_pic_phn.value=rtnValAry[4];//pic_phn
			formObj.dest_rout_pic_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="pck") {
			var rtnValAry=rtnVal.split("|");
			formObj.pickup_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.pickup_trdp_nm.value=rtnValAry[2];//eng_nm
			//formObj.pickup_addr.value=rtnValAry[7];//eng_addr
			formObj.pickup_addr.value=rtnValAry[37];//dflt_addr
			formObj.pickup_pic.value=rtnValAry[3];//pic_nm
			formObj.pickup_pic_phn.value=rtnValAry[4];//pic_phn
			formObj.pickup_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			formObj.trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
			//formObj.trsp_trdp_nm.value=rtnValAry[2];//eng_nm
			formObj.trsp_trdp_nm.value=rtnValAry[10];//eng_nm
			//formObj.trsp_trdp_addr.value=rtnValAry[7];//eng_addr
			formObj.trsp_trdp_addr.value=rtnValAry[37];//dflt_addr
			formObj.trsp_trdp_pic.value=rtnValAry[3];//pic_nm
			formObj.trsp_trdp_phn.value=rtnValAry[4];//pic_phn
			formObj.trsp_trdp_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="bil") {
			var rtnValAry=rtnVal.split("|");
			formObj.bill_to_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.bill_to_trdp_nm.value=rtnValAry[2];//eng_nm
			//formObj.bill_to_trdp_addr.value=rtnValAry[7];//eng_addr
			formObj.bill_to_trdp_addr.value=rtnValAry[37];//dflt_addr
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
	 var formObj=document.frm1;
	 //Ocean에서 띄운 팝업에서는 Flight Number 가 안보이고, Air에서 띄운 팝업에서는 Vessel Name이 안보이게.
	 for(var i=0 ; i < formObj.value_to_show.length ; i++){
		 if(formObj.air_sea_clss_cd.value == "S" && formObj.value_to_show[i].value == "FN"){
			 formObj.value_to_show.remove(i);
		 }else if(formObj.air_sea_clss_cd.value == "A" && formObj.value_to_show[i].value == "VN"){
			 formObj.value_to_show.remove(i);
		 }
	 }
	 // codeNameAction1('trdpCode_del',formObj.s_dest_rout_trdp_cd, 'onBlur');
		fnSetAutocomplete('trsp_trdp_nm'		, 'LINER_POPLIST', 'trn', 'O'); 		//Trucker
		fnSetAutocomplete('pickup_trdp_nm'		, 'LINER_POPLIST', 'pck', 'O'); 		//Pickup
		fnSetAutocomplete('dest_rout_trdp_nm'	, 'LINER_POPLIST', 'del', 'O'); 		//Delivery
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0320.236");		
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0320.264");		
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
		alert(getLabel('FMS_COM_ERR001') + "\n\n: CMM_POP_0320.296");		
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
    if(checkInputVal(formObj.i_cnt_cd.value, 2, 2, "T", getLabel('CNT_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(formObj.i_prnt_conti_cd.value, getLabel('CONTI_CD'))!='O'){
    	return false;
    } else if(checkSelectVal(formObj.i_conti_cd.value, getLabel('SUB_CONTI_CD'))!='O'){
    	return false;
    } else if(checkInputVal(formObj.i_cnt_locl_nm.value, 1, 100, "T", getLabel('LOCAL_NM'))!='O'){
    	return false;
    } else if(checkInputVal(formObj.i_cnt_eng_nm.value, 1, 50, "T", getLabel('ENG_NM'))!='O'){
    	return false;
    } else if(checkInputVal(formObj.i_desc.value, 0, 200, "T", getLabel('DESC'))!='O'){
    	return false;
    } else if(checkInputVal(formObj.i_curr_cd.value, 0, 3, "T", getLabel('CURR'))!='O'){
    	return false;
    }
    return true;
}
/**
 * code name select
 */
function codeNameAction1(str, obj, tmp){
	var formObj=document.frm1;
	if ( obj.value != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				ajaxSendPost(trdpCdReq1, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+sub_str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			ajaxSendPost(trdpCdReq1, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+sub_str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
		if(str =="trdpCode_trn"){
			formObj.trsp_trdp_cd.value="";//trdp_cd  AS param1
			formObj.trsp_trdp_nm.value="";//eng_nm   AS param2
			formObj.trsp_trdp_addr.value="";//eng_addr
			formObj.trsp_trdp_pic.value="";//pic_nm
			formObj.trsp_trdp_phn.value="";//pic_phn
			formObj.trsp_trdp_fax.value="";//pic_fax	
		}else if(str =="trdpCode_del"){
			formObj.dest_rout_trdp_cd.value="";//trdp_cd  AS param1
			formObj.dest_rout_trdp_nm.value="";//eng_nm   AS param2
			formObj.dest_rout_addr.value="";//eng_addr
			formObj.dest_rout_pic.value="";//pic_nm
			formObj.dest_rout_pic_phn.value="";//pic_phn
			formObj.dest_rout_pic_fax.value="";//pic_fax	
		}else if(str =="trdpCode_pickup"){
			formObj.pickup_trdp_cd.value="";//trdp_cd  AS param1
			formObj.pickup_trdp_nm.value="";//eng_nm   AS param2
			formObj.pickup_addr.value="";//eng_addr
			formObj.pickup_pic.value="";//pic_nm
			formObj.pickup_pic_phn.value="";//pic_phn
			formObj.pickup_fax.value="";//pic_fax	
		}
	}
}
 /**
  * Trade Partner 관린 코드조회
  */
 function trdpCdReq1(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	var formObj=document.frm1;
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			//조회해온 결과를 Parent에 표시함
 			var rtnArr=doc[1].split('@@;');
 			var masterVals=rtnArr[0].split('@@^');
 			if(CODETYPE =="trdpCode_trn"){
 				formObj.trsp_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
 				//formObj.trsp_trdp_nm.value=masterVals[3];//eng_nm   AS param2
 				formObj.trsp_trdp_nm.value=masterVals[16];//locl_nm   
 				//formObj.trsp_trdp_addr.value=masterVals[1];//eng_addr
 				formObj.trsp_trdp_addr.value=masterVals[29];//dflt_addr
 				formObj.trsp_trdp_pic.value=masterVals[10];//pic_nm
 				formObj.trsp_trdp_phn.value=masterVals[11];//pic_phn
 				formObj.trsp_trdp_fax.value=masterVals[12];//pic_fax	
 			}else if(CODETYPE =="trdpCode_del"){
 				formObj.dest_rout_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
 				formObj.dest_rout_trdp_nm.value=masterVals[3];//eng_nm   AS param2
 				//formObj.dest_rout_addr.value=masterVals[1];//eng_addr
 				formObj.dest_rout_addr.value=masterVals[29];//dflt_addr
 				formObj.dest_rout_pic.value=masterVals[10];//pic_nm
 				formObj.dest_rout_pic_phn.value=masterVals[11];//pic_phn
 				formObj.dest_rout_pic_fax.value=masterVals[12];//pic_fax	
 			}else if(CODETYPE =="trdpCode_pickup"){
 				formObj.pickup_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
 				formObj.pickup_trdp_nm.value=masterVals[3];//eng_nm   AS param2
 				//formObj.pickup_addr.value=masterVals[1];//eng_addr
 				formObj.pickup_addr.value=masterVals[29];//dflt_addr
 				formObj.pickup_pic.value=masterVals[10];//pic_nm
 				formObj.pickup_pic_phn.value=masterVals[11];//pic_phn
 				formObj.pickup_fax.value=masterVals[12];//pic_fax	
 			}
 		}else{
 			if(CODETYPE =="trdpCode_trn"){
 				formObj.trsp_trdp_cd.value="";//trdp_cd  AS param1
 				formObj.trsp_trdp_nm.value="";//eng_nm   AS param2
				formObj.trsp_trdp_addr.value="";//dflt_addr
				formObj.trsp_trdp_pic.value="";//pic_nm
				formObj.trsp_trdp_phn.value="";//pic_phn
				formObj.trsp_trdp_fax.value="";//pic_fax	
 			}else if(CODETYPE =="trdpCode_del"){
 				formObj.dest_rout_trdp_cd.value="";//trdp_cd  AS param1
 				formObj.dest_rout_trdp_nm.value="";//eng_nm   AS param2
				formObj.dest_rout_addr.value="";//dflt_addr
				formObj.dest_rout_pic.value="";//pic_nm
				formObj.dest_rout_pic_phn.value="";//pic_phn
				formObj.dest_rout_pic_fax.value="";//pic_fax	
 			}else if(CODETYPE =="trdpCode_pickup"){
 				formObj.pickup_trdp_cd.value="";//trdp_cd  AS param1
 				formObj.pickup_trdp_nm.value="";//eng_nm   AS param2
 				formObj.pickup_addr.value="";//dflt_addr
 				formObj.pickup_pic.value="";//pic_nm
 				formObj.pickup_pic_phn.value="";//pic_phn
 				formObj.pickup_fax.value="";//pic_fax	
 			}
 		}
 	}
}
