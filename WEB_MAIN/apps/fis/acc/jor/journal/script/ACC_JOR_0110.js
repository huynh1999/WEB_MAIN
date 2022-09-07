var rtnary=new Array(1);
var callBackFunc = "";
var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function doWork(srcName){
    var formObj=document.frm1;
    switch(srcName) {
		case "Print":
			formObj.file_name.value='outstanding_oi_hbl_01.mrd';
			formObj.title.value='Ocean Import Outstanding Report';
			//Parameter Setting
			var param='';
			if(!chkSearchCmprPrd(true, frm1.per_strdt, frm1.per_enddt)){
				return;
			}
			if(formObj.f_cust_fwh_radio[0].checked == true){
				param += '[' + 'Y' + ']';								//param 1
			}else{
				param += '[]';
			}
			param += '[' + formObj.s_cust_trdp_cd.value + ']';			//param 2
			param += '[' + formObj.s_agt_trdp_cd.value + ']';			//param 3
			param += '[' + formObj.s_ofc_cd.value + ']';				//param 4
			param += '[' + sysOfcCd + ']';								//param 5
			param += '[' + formObj.s_fm_svc_term_cd.value + ']';		//param 6
			param += '[' + formObj.s_to_svc_term_cd.value + ']';		//param 7
			var strDt=formObj.per_strdt.value.replaceAll("-","");
			var endDt=formObj.per_enddt.value.replaceAll("-","");
			if(strDt != "" && endDt != ""){
				strDt=strDt.substring(4,8) + strDt.substring(0,4);
				endDt=endDt.substring(4,8) + endDt.substring(0,4);
			}else{
				return;
			}
			param += '[' + strDt + ']';									//param 8
			param += '[' + endDt + ']';									//param 9
			if(formObj.f_per_radio[0].checked == true){
				param += '[' + 'Y' + ']';								//param 10
			}else{
				param += '[]';
			}
			if(formObj.f_per_radio[1].checked == true){					//param 11
				param += '[' + 'Y' + ']';
			}else{
				param += '[]';
			}
			if(formObj.f_per_radio[2].checked == true){					//param 12
				param += '[' + 'Y' + ']';
			}else{
				param += '[]';
			}
			if(formObj.f_per_radio[3].checked == true){					//param 13
				param += '[' + 'Y' + ']';
			}else{
				param += '[]';
			}
			if(formObj.f_rpt_tp_1.checked == true){						//param 14
				param += '[' + 'Y' + ']';
			}else{
				param += '[]';
			}
			if(formObj.f_rpt_tp_2.checked == true){						//param 15	
				param += '[' + 'Y' + ']';
			}else{
				param += '[]';
			}
			if(formObj.f_rpt_tp_3.checked == true){						//param 16
				param += '[' + 'Y' + ']';
			}else{
				param += '[]';
			}
			param += '[' + usrNm + ']';									//param 17
			
			// #779 - [BINEX] OIH OUTSTANDING REPORT NOT SHOWING CUSTOMER NAME
			param += '[' + formObj.s_biz_clss_cd.value + ']';			//param 18
			
			formObj.rd_param.value=param;
			//popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			if (pdf) {
				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
				pdf = false;
			} else {
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			}
			
		break;
		case "CUST_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   			rtnary=new Array(1);
	   		rtnary[0]="1";
//	   		rtnary[1]=formObj.s_cust_trdp_nm.value;
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "CUST_TRDP_POPLIST";
		   	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "CUST_TRDP_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   			rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.s_cust_trdp_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUST_TRDP_POPLIST";
		   	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		break;
		case "AGT_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
//			rtnary[1]=formObj.s_agt_trdp_nm.value;
			rtnary[1]="";
			rtnary[2]=window;
			callBackFunc = "AGT_TRDP_POPLIST";
		   	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			           
		break;
		case "AGT_TRDP_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=formObj.s_agt_trdp_nm.value;
			rtnary[2]=window;
			callBackFunc = "AGT_TRDP_POPLIST";
		   	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			           
		break;
		case "ALL":
    		   formObj.f_rpt_tp_1.checked=true;
        	   formObj.f_rpt_tp_2.checked=true;
        	   formObj.f_rpt_tp_3.checked=true;
	      break;
	      case "CLEAR":
        	   formObj.f_rpt_tp_1.checked=false;
        	   formObj.f_rpt_tp_2.checked=false;
        	   formObj.f_rpt_tp_3.checked=false;
	      break;
    }
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 
	 var formObj=document.frm1;
 
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
	 
	 setFromToDt(document.frm1.per_strdt, document.frm1.per_enddt);
	 
	 formObj.s_biz_clss_cd.focus();
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
            cal.displayType="date";
            cal.select(formObj.per_strdt, formObj.per_enddt, 'MM-dd-yyyy');
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
 	if(str == "cust_trdpcode" || str == "agt_trdpcode") {
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
 		if (CODETYPE == "cust_trdpcode") {
 			formObj.s_cust_trdp_cd.value="";// trdp_cd AS param1
 			formObj.s_cust_trdp_nm.value="";// eng_nm AS param2
 		}else if (CODETYPE == "agt_trdpcode") {
 			formObj.s_agt_trdp_cd.value="";// trdp_cd AS param1
 			formObj.s_agt_trdp_nm.value="";// eng_nm AS param2
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
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.s_cust_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
 				formObj.s_cust_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
 			}else if(CODETYPE =="agt_trdpcode"){
 				formObj.s_agt_trdp_cd.value=masterVals[0];		//trdp_cd  AS param1
 				formObj.s_agt_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
 			}
 		} else {
 			if(CODETYPE =="cust_trdpcode"){
 				formObj.s_cust_trdp_cd.value="";				//trdp_cd  AS param1
 				formObj.s_cust_trdp_nm.value="";				//eng_nm   AS param2
 			}else if(CODETYPE =="agt_trdpcode"){
 				formObj.s_agt_trdp_cd.value="";				//trdp_cd  AS param1
 				formObj.s_agt_trdp_nm.value="";				//eng_nm   AS param2
 			}
 		}
 	}else{
 		//alert(getLabel('SEE_BMD_MSG43'));		
 	}
}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.s_to_svc_term_cd.value=formObj.s_fm_svc_term_cd.value;
}
function custFwhChange(str){
	if(str == "cust"){
		document.getElementById("cust_fwh_span").innerHTML="Customer";
	}else{
		document.getElementById("cust_fwh_span").innerHTML="Final Warehouse";
	}
}
//Calendar flag value
var firCalFlag=false;
function CUST_TRDP_POPLIST(rtnVal){
		var formObj = document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
    	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cust_trdp_cd.value=rtnValAry[0];//full_nm
		formObj.s_cust_trdp_nm.value=rtnValAry[2];//full_nm
	}  
	}  
function AGT_TRDP_POPLIST(rtnVal){
		var formObj = document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_agt_trdp_cd.value=rtnValAry[0];//full_nm
		formObj.s_agt_trdp_nm.value=rtnValAry[2];//full_nm
	}  
	}