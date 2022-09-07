<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0040.jsp
*@FileTitle  : currency pop
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/16
=========================================================*/
--%>


<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/currency/script/CMM_POP_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<!--ajax 사용시 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage()
		{
			loadPage();doWork('SEARCHLIST')
		}
	</script>
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd" id="f_cmd"/>
		<input	type="hidden" name="openMean" id="openMean"/>
	<div class="layer_popup_title">
		 <!-- page_title_area(S) -->
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><span id="title"><bean:message key="Currency_Code"/></span></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button><!-- 
			<!-- opus_design_btn(E) -->
			</div>
		<!-- page_title_area(E) -->
		</div>	
	</div>
	<input	type="hidden" name="s_continent_code" id="s_continent_code"/>
	<input	type="hidden" name="s_currency_code" id="s_currency_code"/>
	<div class="layer_popup_contents">
		<div class="wrap_result">
		    <!-- opus_design_grid(S) -->
		    <div class="opus_design_grid"  id="mainTable">
		        <script type="text/javascript">comSheetObject('sheet1');</script>
		    </div>
		    <!-- opus_design_grid(E) -->
	    </div>
	</div>
	</form>
