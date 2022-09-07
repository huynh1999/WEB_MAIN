
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CTRTHSTPopup.jsp
*@FileTitle  : Contract History
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/03/20
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
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/CTRTHSTPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%
	


	String ctrt_no = "";
	
	try {
		ctrt_no = request.getParameter("ctrt_no");
		
		if(ctrt_no==null){
			ctrt_no = "";
		} 
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<script type="text/javascript">
	function setupPage(){
		loadPage();
	}
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="ctrt_no" value="<%=ctrt_no%>">
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">

		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Contract_History"/></span></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>		
		</div>
		<!-- opus_design_btn(E) -->		
		
	</div>
	<!-- page_title_area(E) -->
</div>
<div class="layer_popup_contents">

	<div class="wrap_result">	
		
		<!-- opus_design_grid(S) -->
		<div class="opus_design_grid">
		<div class="layout_wrap">
		<div class="layout_vertical_2 pad_rgt_4" style="width: 30%;">
		<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="layout_vertical_2" style="width: 70%;">
		<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
		</div>
			</div>		
		</div>
		<!-- opus_design_grid(E) -->	
		
	</div>	
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>