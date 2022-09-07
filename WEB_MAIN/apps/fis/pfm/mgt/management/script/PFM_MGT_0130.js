﻿/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0130.js
*@FileTitle  : Performance Trend By Customer 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/14
=========================================================*/
function doWork(srcName) {
	var formObj=document.frm1;
	switch (srcName) {
		case "SEARCHLIST":
			if(validationForm()== true && validationDepartment()== true && validationSortBy()== true ){
				setRdInit(rdObjects[0]);
			}
		break;
		case "ALLCLEAR":
			formObj.reset();
		break;
	}
}
//var formObj=document.frm1;
var rtnary=new Array(1);
var callBackFunc = "";
var rdObjects=new Array();
var rdCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	setLoadRdInit(rdObjects[0]);
	var formObj=document.frm1;
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.ofc_cd);
    
	// 강제로 onClick Event발생 (초기값 setting)
	setRadio(formObj.radio_customer[0]);
	setRadio(formObj.radio_bl_trdp_tp_cd[0]);
	setRadio(formObj.radio_dept_cd[0]);
	setRadio(formObj.radio_sort_by[0]);
}
//조회 조건 Validation check
function validationForm(){
	var formObj=document.frm1;
	//Customer Validation 
	if(formObj.radio_customer[0].checked){
		if(formObj.trdp_cd.value==""){
			alert(getLabel('PFM_COM_ALT011')+"(Customer)");
			formObj.trdp_cd.focus();
			return false;
		}
	}else if(formObj.radio_customer[1].checked){
		if(formObj.acct_cd.value==""){
			alert(getLabel('PFM_COM_ALT011')+"(Account Group ID)");
			formObj.acct_cd.focus();
			return false;
		}		
	}
	return true;
}
//Department Validation check
function validationDepartment(){
	var formObj=document.frm1;
	if(formObj.radio_dept_cd[0].checked){
		/**	Ocean Export **/  	
		if(formObj.radio_sort_by[2].checked){
			alert(getLabel('PFM_COM_ALT012'));
			return false;
		}
	}else if(formObj.radio_dept_cd[1].checked){
		/**	Air Export   **/  	
		if(formObj.radio_sort_by[4].checked){
			alert(getLabel('PFM_COM_ALT012'));
			return false;
		}
	}else if(formObj.radio_dept_cd[2].checked){
		/**	 Ocean Import **/  	
		if(formObj.radio_sort_by[2].checked){
			alert(getLabel('PFM_COM_ALT012'));
			return false;
		}	
	}else if(formObj.radio_dept_cd[3].checked){
		if(formObj.radio_sort_by[4].checked){
			alert(getLabel('PFM_COM_ALT012'));
			return false;
		}	
	}else if(formObj.radio_dept_cd[4].checked){
		/**	Other **/
		return true;
	}
	return true;
}
// Sort By  Validation check
function validationSortBy(){
	var formObj=document.frm1;
	if(formObj.radio_sort_by[0].checked){
		/** Measurement **/
		return true;
	}else if(formObj.radio_sort_by[1].checked){
		/** Gross Weight   **/
		return true;
	}else if(formObj.radio_sort_by[2].checked){
		/** Chargeable Weight **/
		if( formObj.radio_dept_cd[0].checked== true ||  formObj.radio_dept_cd[2].checked== true ){
			alert(getLabel('PFM_COM_ALT014'));
			return false;			
		}
	}else if(formObj.radio_sort_by[3].checked){
		/** Number of HBL/HAWB  **/
		return true;
	}else if(formObj.radio_sort_by[4].checked){
		/** TEU (Only for Ocean FCL B/L)  **/
		if( formObj.radio_dept_cd[1].checked== true ||  formObj.radio_dept_cd[3].checked== true ){
			alert(getLabel('PFM_COM_ALT014'));
			return false;			
		}
	}
	return true;
}
/**
* Report Design 환경을 초기화한다.
*/
function setLoadRdInit(rdObj) {
	rdObj.AutoAdjust=2;
	rdObj.HideToolBar();
	rdObj.ZoomRatio = 100;
	rdObj.SetSaveDialog("C:\\", "", "5");
	rdObj.ViewShowMode(2);
	rdObj.SetBackgroundColor(255,255,255);
	rdObj.SetPageLineColor(255,255,255);
	rdObj.ApplyLicense("0.0.0.0");
	}

//function setLoadRdInit(rdObj) {
//	rdObj.SetSaveDialog("C:\\", "", "5");
//	rdObj.HideToolbar();
//	rdObj.HideStatusbar();
//	rdObj.ViewShowMode(0);
//	rdObj.setbackgroundcolor(255, 255, 255);
//	rdObj.SetPageLineColor(255, 255, 255);
//}
function setRdInit(objRd){
	var formObj=document.frm1;
	objRd.AutoAdjust=2;
	objRd.HideToolBar();
    objRd.ZoomRatio = 100;
	//objRd.SetSaveDialog("C:\\", "", "5");
//	objRd.SetSaveDialogEx("", "", "xls@doc@pdf@tif@bmp", "pdf");
    
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}
    objRd.SetSaveDialogEx(rptFilePath, "", "xls@doc@pdf@tif@bmp", "pdf");
	//objRd.SetSaveDialogEx("C:\\opus\\", "", "xls@doc@pdf@tif@bmp", "pdf");
    objRd.ViewShowMode(0);
	objRd.SetBackgroundColor(255,255,255);
	objRd.SetPageLineColor(255,255,255);
	objRd.ApplyLicense("0.0.0.0");					//License Checking
	rdOpen(objRd, document.frm1);
}
function rdOpen(objRd, formObj) {
	var fileName="";
	var rdParam="";
	var v_dptm_tp_opt="";
	var v_sort_tp_opt="";
	var unit_cd_f=""; //첫번째 단위
	var unit_cd_s="" ; //두번째 단위
	//Office parameter setting 
	if(formObj.radio_customer[0].checked){
		if(formObj.trdp_cd.value !=""){
			rdParam += "[AND PRNR.TRDP_CD='"+formObj.trdp_cd.value+"']"; //$1 Customer code(B/L)
			rdParam += "[AND OTH.CUST_CD='"+formObj.trdp_cd.value+"']"; //$2 Customer code(OTHER)
		}else{
			rdParam += "[]";//$1 Customer code(B/L)
			rdParam += "[]";//$2 Customer code(OTHER)
		}
		if(formObj.trdp_nm.value ==""){
			rdParam += "[]";//$3 Customer name
		}else{
			rdParam += "[Customer : "+formObj.trdp_nm.value+"]"; //$3 Customer name
		}
		rdParam += "[]";//$4  Account Group ID
	}else{	
		rdParam += "[]";//$1 Customer code (B/L)
		rdParam += "[]";//$2 Customer code(OTHER)
		if(formObj.trdp_nm.value ==""){
			rdParam += "[]";//$3 Customer name
		}else{
			rdParam += "[Customer : "+formObj.trdp_nm.value+"]"; //$3 Customer name
		}
		rdParam += "[AND TRDP.ACCT_CD='"+formObj.acct_cd.value+"']";//$4  Account Group ID
	}
	if(formObj.ofc_cd.value != ""){
		rdParam += "[AND BL.REF_OFC_CD='"+formObj.ofc_cd.value+"']";  //$5 Office code(B/L)
		rdParam += "[AND OTH.RGST_OFC_CD='"+formObj.ofc_cd.value+"']"; //$6 Office code(OTHER)
	}else{
		rdParam += "[]";//$5 Office code(B/L)
		rdParam += "[]";//$6 Office code(OTHER)
	}
	if(formObj.radio_bl_trdp_tp_cd[0].checked){
		rdParam += "[AND PRNR.BL_TRDP_TP_CD='S02']"; //$7 Customer Type - Customer 
	}else{
		rdParam += "[AND PRNR.BL_TRDP_TP_CD=CASE WHEN BL.BIZ_CLSS_CD='H' AND  BL.HBL_TP_CD='TR' THEN 'P02'";
		rdParam += "							   WHEN BL.BIZ_CLSS_CD='H' AND  BL.HBL_TP_CD='CL' THEN 'S02'";
		rdParam += "						       ELSE 'P01'";
		rdParam += "						  END ]"; //$7 Customer Type - Agent 
	}
	// Department parameter setting 
	if(formObj.radio_dept_cd[0].checked){
		v_dptm_tp_opt="SO";
	}else if(formObj.radio_dept_cd[1].checked){
		v_dptm_tp_opt="AO";		
	}else if(formObj.radio_dept_cd[2].checked){
		v_dptm_tp_opt="SI";		
	}else if(formObj.radio_dept_cd[3].checked){
		v_dptm_tp_opt="AI";		
	}else if(formObj.radio_dept_cd[4].checked){
		v_dptm_tp_opt="OT";		
	}
	rdParam += "["+v_dptm_tp_opt+"]"; //$8 Department
	//Sort By parameter setting 
	if(formObj.radio_sort_by[0].checked == true){
		v_sort_tp_opt="M";
		unit_cd_f="CBM";
		unit_cd_s="CFT";
		fileName="performance_trend_customer.mrd";
	}else if(formObj.radio_sort_by[1].checked == true){
		v_sort_tp_opt="G";
		unit_cd_f="KGS";
		unit_cd_s="LBS";
		fileName="performance_trend_customer.mrd";
	}else if(formObj.radio_sort_by[2].checked == true){
		v_sort_tp_opt="C";
		unit_cd_f="KGS";
		unit_cd_s="LBS";
		fileName="performance_trend_customer.mrd";
	}else if(formObj.radio_sort_by[3].checked == true){
		v_sort_tp_opt="N";
		unit_cd_f="HBL";
		unit_cd_s="";
		fileName="performance_trend_bl_customer.mrd";
	}else if(formObj.radio_sort_by[4].checked == true){
		v_sort_tp_opt="T";
		unit_cd_f="TEU";
		unit_cd_s="";
		fileName="performance_trend_teu_customer.mrd";
	}
	rdParam += "["+v_sort_tp_opt+"]";		//$9 SORT BY
	rdParam += "["+unit_cd_f+"]";			//$10 SORT BY first unit code
	rdParam += "["+unit_cd_s+"]";			//$11 SORT BY second unit code
	rdParam += "[WHERE X.BND_CD='"+v_dptm_tp_opt+"']"; //$12 Department
//	alert(rdParam);
    objRd.SetMessageboxShow(0); 
	objRd.FileOpen(RD_path+"letter/"+fileName, RDServer+'/rp '+rdParam + " /riprnmargin");
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
		case "CSTMR_POPUP":
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]=formObj.trdp_nm.value;
			rtnary[2]=window;
			
			 callBackFunc = "CSTMR_POPUP";
	         modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	           
			
		break;
	}
}
function CSTMR_POPUP(rtnVal)
{
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		getObj('trdp_cd').value=rtnValAry[0];
		getObj('trdp_nm').value=rtnValAry[2];
	}
}
/**
 * Trade Partner code로 name조회
 */
function codeNameAction(s_code) {
	if (s_code != "") {
		if ((window.event.type == "keydown" && event.keyCode == 13) || window.event.type == "blur") {
			ajaxSendPost(trdpCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=trdpcode&s_code=" + s_code.toUpperCase(), "./GateServlet.gsl");
		}
	} else {
		document.frm1.trdp_cd.value="";// trdp_cd AS param1
		document.frm1.trdp_nm.value="";// eng_nm AS param2
	}
}
/**
 * Trade Partner code로 name조회 결과처리
 */
 function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if (doc[0]=='OK') {
		if (typeof(doc[1]) != "undefined") {
			//조회해온 결과를 Parent에 표시함
			var masterVals=doc[1].split('@@^');
			formObj.trdp_cd.value=masterVals[0];    // trdp_cd  AS param1
			formObj.trdp_nm.value=masterVals[3];    // eng_nm AS param2
		} else {
			formObj.s_cust_trdp_cd.value="";
			formObj.s_cust_trdp_nm.value="";
		}
	}
}
/**
 * Form의 radio버튼을 클릭했을때 체크된 값만 지정된 Hidden input에 setting
 * @param {object} Form Element Radio Object 필수
 * @return 없음
 */
function setRadio(obj) {
	var formObj=document.frm1;
	if (obj.name == "radio_dept_cd") {
		if (obj.value == "OT") {
			var deptCd=formObj.radio_dept_cd;
			var allArr=new Array();
			for (var i=0; i<4; i++) {
				allArr[allArr.length]=("'" + deptCd[i].value + "'");
			}
			formObj.dept_cd.value="";
			formObj.not_dept_cd.value=allArr.join(", ");
		} else {
			formObj.dept_cd.value=obj.value;
			formObj.not_dept_cd.value="";
		}
	} else {
		// formObj의 "radio_"를 제외한 객체명을 가진 hidden input에 setting
		formObj[obj.name.replace("radio_", "")].value=obj.value;
	}
}
