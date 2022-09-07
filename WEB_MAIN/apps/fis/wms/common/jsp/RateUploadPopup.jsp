<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/RateUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
	//String CLT_PATH = ".";
	
	String rate_no 	 = "";
	String ctrt_no 	 = "";
	String sb_cls_cd = "";
	String nra_quote_no = "";
	
	try {
		rate_no 	= request.getParameter("rate_no")== null?"":request.getParameter("rate_no");
		ctrt_no 	= request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		sb_cls_cd 	= request.getParameter("sb_cls_cd")== null?"":request.getParameter("sb_cls_cd");
		nra_quote_no 	= request.getParameter("nra_quote_no")== null?"":request.getParameter("nra_quote_no");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<script>
	
</script>
<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">
 <input type="hidden" name="user_id" 		value="ADMIN" /> 
 <input type="hidden" name="user_nm" 		value="ADMINISTRATION_DOU." />
 <input type="hidden" name="org_cd" 		value="KRSELLB" />
<%--  <input type="hidden" name="org_nm" 		value="<%=userInfo.getOrg_nm()%>" />  --%>
 <input type="hidden" name="ctrt_no" 		value="<%=ctrt_no%>" />
 <input type="hidden" name="svc_tp_cd" 		value="RT" />
 <input type="hidden" name="doc_ref_tp_cd" 	value="RT" />
 <input type="hidden" name="doc_tp_cd" 		value="RT" />
 <input type="hidden" name="doc_ref_no" 	value="" />
 <input type="hidden" name="doc_ref_no2" 	value="" />
 <input type="hidden" name="file_org_nm" 	value="" />
 <input type="hidden" name="sb_cls_cd" 		value="<%=sb_cls_cd%>" />
 <input type="hidden" name="f_cmd"/>
 
 
 <div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="NRA_Management"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>
 
 
<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="50" />
				<col width="50" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Rate_No"/></th>
				<td>
					<input name="rate_no" type="text" value="<%=rate_no%>" class="L_input_R" style="width:150px;"  tabindex="-1" readonly />
				</td>
				<td></td>
			</tr>
		</table>
	</div>
</div>
	
<div class= "wrap_search">
	<div class="opus_design_inquiry wFit">
		<table>
			<colgroup>
				<col width="50" />
				<col width="12" />
				<col width="10" />
				<col width="50" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="NRA_Quote_No"/></th>
				<td>
					<input name="nra_quote_no" id="nra_quote_no" type="text" class="L_input" value="<%=nra_quote_no %>" onChange="nraChange();" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/>
				</td>
				<th><bean:message key="File_Path"/></th>
				<td><!--
	                --><div id="logo_rec_id" style="display: none;"><!--
	                --></div><!--
	                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
	                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none"><!--
					--><button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="doWork('btn_file_upload');"><bean:message key="NRA_Save"/></button> 
				<td><button type="button" class="btn_etc" name="btn_file_delete" id="btn_file_delete" onClick="doWork('btn_file_delete');"><bean:message key="NRA_Delete"/></button></td>
			</tr>
		</table>
	</div>
</div>
 
 
 <!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileRef" id="bcKey" />
    <input type="hidden" name="rate_no" value="" id="rate_no" />
    <input type="hidden" name="ctrt_no" value="" id="ctrt_no"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	
<iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe>
</body>
</html>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>
