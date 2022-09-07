var rtnary=new Array(1);
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST;
			//검증로직
			if(formObj.f_bl_no.value == ""){
				//HAWB No. is mandatory field.
				alert(getLabel('FMS_COM_ALT001') + "\n\n: AIE_BMD_0190.12");
				formObj.f_bl_no.focus();
				return;
			}
			formObj.action="./AIE_BMD_0190.clt";
			formObj.submit();
			break;
		case "Print":
			if(formObj.f_bl_no.value == ""){
				//HAWB No. is mandatory field.
				alert(getLabel('FMS_COM_ALT001') + "\n\n: AIE_BMD_0190.26");
				return;
			}
			if(formObj.s_cust_dt.value == ""){
				//Please input Customs Date.
				alert(getLabel('FMS_COM_ALT001') + "\n\n: AIE_BMD_0190.32");
				return;
			}
			formObj.file_name.value='shipping_advice_cb_ae_hawb_01.mrd';
			formObj.title.value='Shipping Advice C.B';
			var toTp="";
			for(var i=0 ; i < formObj.s_to_radio.length ; i++){
				if(formObj.s_to_radio[i].checked){
					toTp=formObj.s_to_radio[i].value;
					break;
				}
			}
			var param='[' + formObj.f_bl_no.value + ']';					// [1]
			param += '[' + usrNm + ']';										// [2]
			param += '[' + toTp + ']';										// [3]
			if(toTp == "oth"){
				if(formObj.s_trdp_cd.value == ""){
					return;
				}else{
					param += '[' + formObj.s_trdp_cd.value + ']';			// [4]
				}
			}else{
				param += '[]';												// [4]
			}
			param += '[' + formObj.s_attn.value + ']';						// [5]
			if(formObj.s_mst_cust_flg.checked){
				param += '[Y]';												// [6]
			}else{
				param += '[]';												// [6]
			}
			var custDt=formObj.s_cust_dt.value.replaceAll('-','');
			param += '[' + custDt + ']';									// [7]
			param += '[' + formObj.s_ent_tm.value + ']';					// [8]
			param += '[' + usrPhn + ']';									// [9]
			param += '[' + usrFax + ']';									// [10]
			formObj.rd_param.value=param;
			formObj.mailTitle.value='Shipping Instruction [Air Export House BL No : ' + frm1.f_bl_no.value + ']';;
			var trdp_cd='';
     		trdp_cd += '(' + '\'' + '' + '\'';
     		trdp_cd += ',' + '\'' + '' + '\'' + ')';
			ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
			formObj.mailTo.value=mailTo;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		break;
		case "HBL_POPLIST":
			rtnary=new Array(1);
				rtnary[0]="A";//airSeaTp
				rtnary[1]="O";//bndTp;
				var rtnVal=window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
	        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 		return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
				if(rtnValAry[5] != ""){
					var custDtStr=rtnValAry[5].substring(4,6) + "-" + rtnValAry[5].substring(6,8) + "-" + rtnValAry[5].substring(0,4);
					formObj.s_cust_dt.value=custDtStr;
				}else{
					formObj.s_cust_dt.value="";
				}
			}
		break;
		case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.s_trdp_nm.value;
	   		rtnary[2]=window;
		        var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.s_trdp_cd.value=rtnValAry[0];//full_nm
				formObj.s_trdp_nm.value=rtnValAry[2];//full_nm
			}             
		break;
    }
}
/**
* code name select
*/
function codeNameAction(str, obj, tmp){
	CODETYPE=str;
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type=str.substring(0,8);
	if(str == "trdpcode") {
		s_type="trdpcode";
	}
	if (s_code != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(trdpCdReq, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				ajaxSendPost(trdpCdReq, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		}
	} else {
		if (CODETYPE == "trdpcode") {
			formObj.s_trdp_cd.value="";// trdp_cd AS param1
			formObj.s_trdp_nm.value="";// eng_nm AS param2
		}
	}
}
/**
* Trade Partner 관린 코드조회
*/
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var masterVals=doc[1].split('@@^');
			if(CODETYPE =="trdpcode"){
				formObj.s_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.s_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		} else {
			if(CODETYPE =="trdpcode"){
				formObj.s_trdp_cd.value="";				//trdp_cd  AS param1
				formObj.s_trdp_nm.value="";				//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar(); 
	    	cal.select(obj.s_cust_dt,  'MM-dd-yyyy');
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
	var formObj=document.frm1;
//	formObj.s_cust_dt.value = getTodayStr();
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
