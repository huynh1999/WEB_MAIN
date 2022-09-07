<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutMgmtPrintOption.jsp
*@FileTitle  : Invoice List Print Option Selection
*@author     : 
*@version    : 1.0
*@since      : 2017/12/21
=========================================================--%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0041.js?ver=<%=CLT_JS_VER%>"></script>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<%
	String rpt_param       = "";
	String rpt_pdf_file_nm = "";
	String mailTitle       = "";
	String rpt_biz_tp      = "";
	String rpt_biz_sub_tp  = "";
	String rpt_trdp_cd     = "";
	String file_name       = "";
	String title           = "";
	String inv_no          = "";
	//6301 [JAPT] Mail sending function related request
	String bkg_no          = "";
	String ves             = "";
	String voy             = "";
	String etd             = "";
	String hbl_no          = "";
	// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
	String chk_mail_ar     = "";
	// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
	String ar_invoice_option_use = "";
	// OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails		
	String attachFileName = "";
	String rpt_file_name_flg = "";
	
	
	try {
		rpt_param       = request.getParameter("rpt_param")      == null?"":request.getParameter("rpt_param");
		rpt_pdf_file_nm = request.getParameter("rpt_pdf_file_nm")== null?"":request.getParameter("rpt_pdf_file_nm");
		mailTitle       = request.getParameter("mailTitle")      == null?"":request.getParameter("mailTitle");
		rpt_biz_tp      = request.getParameter("rpt_biz_tp")     == null?"":request.getParameter("rpt_biz_tp");
		rpt_biz_sub_tp  = request.getParameter("rpt_biz_sub_tp") == null?"":request.getParameter("rpt_biz_sub_tp");
		rpt_trdp_cd     = request.getParameter("rpt_trdp_cd")    == null?"":request.getParameter("rpt_trdp_cd");
		file_name       = request.getParameter("file_name")      == null?"":request.getParameter("file_name");
		title           = request.getParameter("title")          == null?"":request.getParameter("title");
		inv_no          = request.getParameter("inv_no")         == null?"":request.getParameter("inv_no");
		//6301 [JAPT] Mail sending function related request
		bkg_no          = request.getParameter("bkg_no")         == null?"":request.getParameter("bkg_no");
		ves             = request.getParameter("ves")            == null?"":request.getParameter("ves");
		voy             = request.getParameter("voy")            == null?"":request.getParameter("voy");
		etd             = request.getParameter("etd")            == null?"":request.getParameter("etd");
		hbl_no          = request.getParameter("hbl_no")         == null?"":request.getParameter("hbl_no");
		// OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N
		chk_mail_ar     = request.getParameter("chkMailAr")      == null?"":request.getParameter("chkMailAr");
		// OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List
		ar_invoice_option_use          = request.getParameter("ar_invoice_option_use")         == null?"":request.getParameter("ar_invoice_option_use");
		
		attachFileName = request.getParameter("attachFileName") == null?"":request.getParameter("attachFileName");
		rpt_file_name_flg = request.getParameter("rpt_file_name_flg") == null?"N":request.getParameter("rpt_file_name_flg");
	} catch(Exception e) {
		out.println(e.toString());
	}
%>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage();
	}
</script>

<form id="form" name="form">
	<input type="hidden" id="rpt_param" name="rpt_param" value="<%=rpt_param %>" />
	<!-- OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails -->
	<input type="hidden" id="attachFileName"     name="attachFileName"     value="<%=attachFileName %>" />
	<input type="hidden" id="rpt_file_name_flg"     name="rpt_file_name_flg"     value="<%=rpt_file_name_flg %>" />

	<input type="hidden" id="title"     name="title"     value="<%=title %>" />
	<input type="hidden" id="file_name" name="file_name" value="<%=file_name %>" />
	<input type="hidden" id="rd_param"  name="rd_param"  value="" />
	<input type="hidden" id="inv_no"    name="inv_no"    value="<%=inv_no %>" />
	<!-- OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N -->
	<input type="hidden" id="chkMailAr" name="chkMailAr" value="<%=chk_mail_ar%>" />

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="mailTitle"       value="<%=mailTitle %>" />
	<input type="hidden" name="rpt_biz_tp"      value="<%=rpt_biz_tp %>" />
	<input type="hidden" name="rpt_biz_sub_tp"  value="<%=rpt_biz_sub_tp %>" />
	<input type="hidden" name="rpt_trdp_cd"     value="<%=rpt_trdp_cd %>" />
	<input type="hidden" name="rpt_pdf_file_nm" value="<%=rpt_pdf_file_nm %>" />
	
	<!-- #6301 [JAPT] Mail sending function related request -->
	<input type="hidden" id="bkg_no"    name="bkg_no"    value="<%=bkg_no %>" />
	<input type="hidden" id="ves"       name="ves"       value="<%=ves %>" />
	<input type="hidden" id="voy"       name="voy"       value="<%=voy %>" />
	<input type="hidden" id="etd"       name="etd"       value="<%=etd %>" />
	<input type="hidden" id="hbl_no"    name="hbl_no"    value="<%=hbl_no %>" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<!-- OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List -->
	<input type="hidden" id="ar_invoice_option_use"    name="ar_invoice_option_use"    value="<%=ar_invoice_option_use %>" />

	<div class="page_title_area clear">
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');" ><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');" ><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->
	</div>

	<!-- opus_design_inquiry(S) -->
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<h3 class="title_design"><bean:message key="Print_Option"/></h3>
			<table id="mainTable_sheet1" border="0">
				<tr>
					<td>
						<input type="radio" id="rdoOption1" name="rdoOption" /><label for="rdoOption1"><bean:message key="General" /></label>
					</td>
					<!-- OFVFOUR-7649 [JAPT] Request to merge Original and Copy into 1 on Invoice List -->
					<td <%if(!ar_invoice_option_use.equals("M")){%> style="display:none" <%} %>>
						<input type="radio" id="rdoOption5" name="rdoOption" /><label for="rdoOption5"><bean:message key="Original/Copy" /></label>
					</td>				
  					<td <%if(ar_invoice_option_use.equals("M")){%> style="display:none" <%} %>>
						<input type="radio" id="rdoOption2" name="rdoOption" /><label for="rdoOption2"><bean:message key="Original" /></label>
					</td>
					<td <%if(ar_invoice_option_use.equals("M")){%> style="display:none" <%} %>>
						<input type="radio" id="rdoOption3" name="rdoOption" /><label for="rdoOption3"><bean:message key="Copy" /></label>
					</td>
					<td>
						<input type="radio" id="rdoOption4" name="rdoOption" checked /><label for="rdoOption4"><bean:message key="Freight_Memo" /></label>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="wrap_result" style="display: none;">
	</div>
</form>
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>
