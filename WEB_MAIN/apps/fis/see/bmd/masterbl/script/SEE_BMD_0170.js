var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	var formObj=document.frm1;

	switch(srcName) {

		case "SEARCH" :
			//#6301 [JAPT] Mail sending function related request
			var opt_key = "OEM_SI_EML_TITLE";
			ajaxSendPost(emailSITitle, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
			
			//Remark
			//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchRemarkInfo&mbl_no='+$('#s_mbl_no').val()+'&ref_no='+$('#s_ref_no').val(), './GateServlet.gsl');
			ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchRemarkInfo&ref_no='+$('#s_ref_no').val()+'&intg_bl_seq='+$('#intg_bl_seq').val(), './GateServlet.gsl');
			//Actual Shipper
			//ajaxSendPost(dispAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchActualShipper&mbl_no='+$('#s_mbl_no').val()+'&ref_no='+$('#s_ref_no').val(), './GateServlet.gsl');
			ajaxSendPost(dispAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchActualShipper&ref_no='+$('#s_ref_no').val()+'&intg_bl_seq='+$('#intg_bl_seq').val(), './GateServlet.gsl');
			break;

		case "Print" :
			formObj.s_mbl_no.value=trim(formObj.s_mbl_no.value);
			formObj.s_ref_no.value=trim(formObj.s_ref_no.value);
			if(formObj.s_mbl_no.value == "" && formObj.s_ref_no.value == ""){
				//[MBL No. / REF No.] is mandatory field.
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEE_BMD_0170.8");
				formObj.s_mbl_no.focus();
				return;
			}
			formObj.title.value="Shipping Instruction Report";
			formObj.file_name.value="shipping_instruction_oe_mbl_01.mrd";
			var radio_ship_to=document.getElementsByName("s_ship_to");
			var s_ship_to="";
//			var s_bl_issue = formObj.s_bl_issue.value.toUpperCase();

			
			//var s_bl_issue="";
			var s_bl_issue=formObj.place_of_bl_issue.value;
			for(var i=0; i<radio_ship_to.length; i++){
				if(radio_ship_to[i].checked==true) {
					s_ship_to=radio_ship_to[i].value;
				}
			}
			//OFVFOUR-6974 [ACROCARGO] Cannot print Shipping Instruction (S/I) Report
			var remark =document.frm1.dock_rcpt_rmk.value;
			if(remark.indexOf("'") > 0){
				remark=remark.replace(/'/g, "''");
			}
			//Parameter Setting
			var param = '';
			param += '[' + formObj.s_mbl_no.value + ']';			//$1
			param += '[' + s_ship_to + ']';							//$2
			param += '[' + formObj.ntc_trdp_full_nm.value + ']';	//$3
			param += '[' + ofcCd + ']';								//$4
			param += '[' + userNm + ']';							//$5
			param += '[' + s_bl_issue + ']';						//$6
			param += '[' + formObj.title.value + ']';				//$7
			param += '[' + formObj.s_ref_no.value + ']';			//$8
			param += '[' + formObj.s_rmk.value + ']';				//$9
			param += '[' + userTel + ']';							//$10 usr tel
			param += '[' + userFax + ']';							//$11 usr fax
			param += '[' + formObj.ntc_trdp_cd.value + ']';			//$12 ntc_trdp_cd
			param += '[' + userEml + ']';							//$13 usr eml
			
			//OFVFOUR-6974 [ACROCARGO] Cannot print Shipping Instruction (S/I) Report
		//	param += '[' + formObj.dock_rcpt_rmk.value + ']';		//$14 dock remark
			param += '[' + remark + ']';							//$14 dock remark 
			param += '[' + formObj.intg_bl_seq.value + ']';			//$15 intg_bl_seq

			//#3533 OEM Shipping Instruction
			param += '[' + formObj.s_frt_arrng.value + ']';			//$16 Freight Arrange Y/N
			param += '[' + formObj.act_shpr.value + ']';			//$17 Actual Shipper

			//#3606 [JTC]Shipping Instruction - MBL# 없는 경우 처리 & SCAC Code 세팅 조건 변경
			param += '[' + userEml + ']';							//$18 User Email

			//#3681 [JAPT] S/I 화면 추가 요건
			if($('#s_mother_vsl_voy').is(':checked')) {
				param += '[Y]';										//$19 Mother VSL/VOY No.
			} else {
				param += '[N]';										//$19 Mother VSL/VOY No.
			}
			if($('#s_ts_port_etd').is(':checked')) {
				param += '[Y]';										//$20 T/S port/ETD
			} else {
				param += '[N]';										//$20 T/S port/ETD
			}
			//6301 [JAPT] Mail sending function related request
			var emailTitle = createEmailTitle(optEmail, formObj.lnr_bkg_no.value
													  , formObj.trnk_vsl_nm.value
													  , formObj.trnk_voy.value
													  , formObj.etd_dt_tm.value
													  , formObj.s_mbl_no.value);
			formObj.mailTitle.value = emailTitle;
			formObj.rd_param.value = param;
			/*formObj.mailTitle.value = 'Shipping Instruction [Ocean Export Master BL No : ' + frm1.s_mbl_no.value + ']';*/
			formObj.mailTo.value = mailTo;
			formObj.rpt_biz_tp.value = "OEM";
			formObj.rpt_biz_sub_tp.value = "SI";
			formObj.rpt_tp.value = s_ship_to;							// [Other Company]가 아닐경우 사용됨
			formObj.rpt_trdp_cd.value = formObj.ntc_trdp_cd.value;		//[Other Company]일 경우 사용됨
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
			break;

		case "CLOSE" :
			ComClosePopup();
			break;
	}
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	//#1208 [OEM Shipping Instruction] Cannot auto suggestion when name inputted
	fnSetAutocompleteCallBack('ntc_trdp_full_nm', 'PARTNER_POPLIST', 'LINER_POPLIST'); //Other Company	
}

/*pop up open*/
function doPop(srcName) {

	var formObj=document.frm1;
	switch(srcName) {
		case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="S"; //S=해운에서 오픈, A=항공에서 오픈
			rtnary[1]="O"; //I: In-bound, O: Out-bound

			callBackFunc = "MBL_POPLIST";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;

		case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="S";
			rtnary[1]="O";

			callBackFunc = "REF_POPLIST";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;

		case "PARTNER_POPLIST":
			if(formObj.s_ship_to5.checked == true){
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]=formObj.ntc_trdp_full_nm.value;
				rtnary[2]=window;

				callBackFunc = "PARTNER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			}
			break; 
	}
}

function MBL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.s_mbl_no.value=rtnValAry[0];//s_mbl_no
		formObj.s_ref_no.value="";
		if(formObj.s_mbl_no.value != ""){
			doWork('SEARCH');
		}
	}
}

function REF_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		formObj.s_mbl_no.value="";
		formObj.s_ref_no.value=rtnValAry[2];
		//6301 [JAPT] Mail sending function related request
		formObj.lnr_bkg_no.value = rtnValAry[14];
		formObj.trnk_vsl_nm.value = rtnValAry[4];
		formObj.trnk_voy.value = rtnValAry[5];
		formObj.etd_dt_tm.value = rtnValAry[12];
		if(formObj.etd_dt_tm.value != ""){
			formObj.etd_dt_tm.value = formObj.etd_dt_tm.value.substring(0,4) + "." + formObj.etd_dt_tm.value.substring(4,6) + "." + formObj.etd_dt_tm.value.substring(6,8);
		}
		formObj.s_mbl_no.value = rtnValAry[0];
		if(formObj.s_ref_no.value != ""){
			doWork('SEARCH');
		}
	}
}

function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ntc_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.ntc_trdp_full_nm.value=rtnValAry[2];//eng_nm
	}
}

function fRadio(value) {
	var formObj=document.frm1;
	if(value == "O"){
		formObj.ntc_trdp_cd.className='search_form';
		formObj.ntc_trdp_cd.readOnly=false;
		formObj.ntc_trdp_full_nm.className='search_form';
		formObj.ntc_trdp_full_nm.readOnly=false;//eng_nm
	}else{
		formObj.ntc_trdp_cd.value="";//trdp_cd
		formObj.ntc_trdp_full_nm.value="";//eng_nm
		formObj.ntc_trdp_cd.className='search_form-disable';
		formObj.ntc_trdp_cd.readOnly=true;
		formObj.ntc_trdp_full_nm.className='search_form-disable';
		formObj.ntc_trdp_full_nm.readOnly=true;
	}
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

function dispAjaxReq(rtnVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(rtnVal);
	if(doc[0]=='OK') {
		if(doc[1] != "null" || doc[1] == "undefined" || doc[1] == undefined){
			var arrStr = doc[1].split('|');
			formObj.place_of_bl_issue.value=arrStr[0];
			formObj.dock_rcpt_rmk.value=arrStr[1];
			formObj.s_mbl_no.value=arrStr[2];
			formObj.intg_bl_seq.value=arrStr[3];

			//#3681 [JAPT] S/I 화면 추가 요건
/*			if(!ComIsEmpty(arrStr[4])) {
				formObj.s_mother_vsl_voy.checked = true;
			} else {
				formObj.s_mother_vsl_voy.checked = false;
			}
			if(!ComIsEmpty(arrStr[5])) {
				formObj.s_ts_port_etd.checked = true;
			} else {
				formObj.s_ts_port_etd.checked = false;
			}*/
			formObj.s_ref_no.value = arrStr[6];
		} else {
			alert("not Found!!!");
			formObj.place_of_bl_issue.value = '';
			formObj.dock_rcpt_rmk.value     = '';
			formObj.s_mbl_no.value          = '';
			formObj.intg_bl_seq.value       = '';
			formObj.s_mother_vsl_voy.checked = false;
			formObj.s_ts_port_etd.checked = false;
		}
	}
}

function dispAjaxReq2(rtnVal) {
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(rtnVal);
	if(doc[0]=='OK') {
		if(doc[1] != "null" && doc[1] != "undefined" && doc[1] != undefined) {
			formObj.act_shpr.value = doc[1];
		}
	}
}

$(document).ready(function() {

	$('#s_ref_no').change(function(){
		if($(this).val() != '') {
			$('#s_mbl_no').val("");
			$('#place_of_bl_issue').val("");
			$('#dock_rcpt_rmk').val("");
			$('#intg_bl_seq').val("");
			doWork("SEARCH");
		} else {
			$('#s_mbl_no').val("");
			$('#place_of_bl_issue').val("");
			$('#dock_rcpt_rmk').val("");
			$('#intg_bl_seq').val("");
		}
	});

	//OEM List 화면에서 Parameter 를 넘겨온 경우
	if( $('#intg_bl_seq').val() != '') {
		doWork("SEARCH");
	}

	if(SHOW_MOTHER_VSL_INFO_ON_SI == 'Y') {
		$('#div_show_mother_vsl').attr('style', 'margin-top: 8px; display: in-line;');
	} else {
		$('#div_show_mother_vsl').attr('style', 'display: none;');
	}

});
//#6301 [JAPT] Mail sending function related request
var optEmail
function emailSITitle(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != "undefined" && doc[1] != undefined && doc[1] != "") {
			optEmail=doc[1];
		}
	}
}
//OFVFOUR-7398[JAPT] OPUS PDF URL LINK ERROR
function strToUppr() {
	var string = frm1.dock_rcpt_rmk.value,
	regex ="((http|https|HTTP|HTTPS)://)((www|WWW).)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)",
	  modified = string.replace(/[^\s]+/g, function (match) {
	 return match.search(regex)  != -1 ? match : match.toUpperCase();
	});
	frm1.dock_rcpt_rmk.value = modified;
	
}