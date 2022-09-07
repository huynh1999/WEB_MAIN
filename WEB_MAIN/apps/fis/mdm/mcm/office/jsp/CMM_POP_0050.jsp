<%--
=========================================================
*@FileName   : CMM_POP_0050.jsp
*@FileTitle  : CMM
*@Description: office pop
*@author     : 이광훈 - office pop
*@version    : 1.0 - 07/01/2009
*@since      : 07/01/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 10/06/2014
*@since      : 10/06/2014
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<%
	
	
	//#52918 - [BINEX] TO REVIVE DISABLED OFFICE CODE
	String display_inactive = request.getParameter("display_inactive") != null ? request.getParameter("display_inactive") : "";
	if (!"".equals(display_inactive)){
		display_inactive = display_inactive.trim();  
	}
	
	%>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/mcm/office/script/CMM_POP_0050.js?ver=<%=CLT_JS_VER%>"></script>
<script>
function setupPage(){
	loadPage();
	//#1540 [LBS] Office Code 화면의 편의 기능 추가
	doWork('SEARCHLIST');
}
</script>	
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/> 
	<div class="layer_popup_title">
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="Office_Code"/></span></h2>
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')">Search</button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			
					<% if ("Y".equals(display_inactive)) { %> 
			<br>
			<br>
			<table style="width:100%;align:right;"><tr><td style="align:right;"><input type="checkbox" name="display_inactive" id="display_inactive" /><bean:message key="DISPLAY_INACTIVE"/></td></tr></table>			
 		<%} %>	
		   </div>
		</div>		
	</div>

	<div class="layer_popup_contents">
		<div class="wrap_result">
	    	<div class="opus_design_grid">
	    		<script type="text/javascript">comSheetObject('sheet1');</script>
	    	</div>
	    </div>
	</div>
	</form>
</body>
</html>