<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : VesselPopup.jsp
*@FileTitle  : 
*@author     : Lam.Nguyen Dou Network
*@version    : 1.0
*@since      : 2015/03/11
=========================================================--%>
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/VesselPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	
	String vsl_cd = "";
	String vsl_nm = "";
	
	try {
		vsl_cd = request.getParameter("vsl_cd")== null?"":request.getParameter("vsl_cd");
		vsl_nm = request.getParameter("vsl_nm")== null?"":request.getParameter("vsl_nm");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
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
<input type="hidden" id="f_cmd"/>
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Vessel"/></span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		<div class="Btn_T">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('btn_Search');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('btn_Close');"><bean:message key="Close"/></button> 
			</div>
		</div>
		<!-- opus_design_btn(E) -->	
	
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation"></span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
</div>
<div class="layer_popup_contents">

		<div class="wrap_search">
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry entry_pannel">
				<table>
					<colgroup>
						<col width="80" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Vessel_Code"/></th>
							<td><input name="vslCd" id="vslCd" type="text" class="L_input" style="text-transform:uppercase;"
								value="<%=vsl_cd%>" dataformat="engup"
								maxlength="10" /></td>
						</tr>
						<tr>
							<th><bean:message key="Vessel_Name"/></th>
							<td><input name="vslNm" type="text" class="L_input"
								value="<%=vsl_nm%>" dataformat="engup" otherchar="~!@#$%^&*()_+|{}:>?`=\[];',./-" maxlength="400" style="text-transform:uppercase;" /></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>

		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">
					comSheetObject('sheet1');
				</script>
			</div>
		</div>
	</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>
