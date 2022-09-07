<%--
=========================================================
*@FileName   : ProgramPopList.jsp
*@FileTitle  : CMM
*@Description: Program pop
*@author     : 정원영 - Program pop
*@version    : 1.0 - 12/24/2013
*@since      : 07/01/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 18/07/2014
*@since      : 18/07/2014
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>
<%
	String CLT_PATH = "/opusfwd";  
	String CLT_MSG_PATH = "EN"; 
%>


	<!-- 공통 Header -->
    <title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/system/menu/script/ProgramPopList.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/> 
		<div class="layer_popup_title">
	<div class="page_title_area clear">
		<h2 class="page_title"><span><bean:message key="Program"/></span></h2>
		<div class="opus_design_btn"><!--
		--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" >Search</button><!--
		--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<tr>
					<th width="70"><bean:message key="Seq"/></th>
					<td width="150"><input type="text" name="pgm_seq" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150"/></td>
					<th width="70"><bean:message key="Name"/></th>
					<td width="150"><input type="text" name="pgm_nm" maxlength="5" value="" style="width:150"/></td>
					<td></td>
				</tr>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	</div>
</form>
