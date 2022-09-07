/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0480.js
*@FileTitle  : Transfer Request popup
*@author     : CLT
*@version    : 1.0
*@since      : 2017/09/18
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var curObjId = "";
function doWork(srcName, curObj, valObj){
	var formObj=document.frm1;
	switch(srcName) {
		case "PRINT":
    	    // 프린트
			formObj.file_name.value='transfer_request.mrd';
        	formObj.title.value='Transfer Request';
			//Parameter Setting
			var param='';
			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
			param += '[' + formObj.attn.value + ']';// $2
			param += '[' + formObj.ams_fax.value + ']';// $3
			param += '[' + formObj.title_text.value + ']';// $4
			param += '[' + formObj.trdp_nm.value + ']';//$5
			
			param += '[' + formObj.tel.value + ']';			
			param += '[' + formObj.fax.value + ']';
			param += '[' + formObj.eml.value + ']';			
			formObj.rd_param.value=param;
		
			formObj.mailTitle.value='Transfer Request [MBL No : ' + formObj.bl_no.value + ']'; //[20140112 OJG] 이메일 제목추가
			
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
		//if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			formObj.trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.trdp_nm.value=rtnValAry[2];//eng_nm
		//}
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
	 var formObj=document.frm1;
	 formObj.title_text.value='WAREHOUSE TRANSFER AND PRIORITY BREAK DOWN REQUEST';
	 // codeNameAction1('trdpCode_del',formObj.s_dest_rout_trdp_cd, 'onBlur');
	//fnSetAutocomplete('trdp_nm'		, 'LINER_POPLIST', 'rls', 'O'); 		//Release to
}

function codeNameAction2(str, obj, tmp){
	CODETYPE=str;
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type=str.substring(0,8);
	if(str == "trdpcode_dest") {
		s_type="trdpcode";
	}
	if (s_code != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		}
	} else {
		if (CODETYPE == "trdpcode_dest") {
			formObj.trdp_cd.value="";//trdp_cd
			formObj.trdp_nm.value="";//full_nm
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value=masterVals[0];//trdp_cd
				formObj.trdp_nm.value=masterVals[3];//full_nm
			
			}
		}else{
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value="";//trdp_cd
				formObj.trdp_nm.value="";//full_nm
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEI_DOC_1080.206");		
	}
}