<%--
=========================================================
*@FileName   : CMM_POP_0100.jsp
*@FileTitle  : CMM
*@Description: workflow pop
*@author     : 이광훈 - workflow pop
*@version    : 1.0 - 01/05/2009
*@since      : 01/05/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="./apps/fis/cmm/pop/workflow/script/CMM_POP_0100.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript">
		function setupPage(){
			loadPage();
		}
	</script>

	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="com_cd"/>
		
	<div class="layer_popup_title">
		<div class="page_title_area clear">
	   		<h2 class="page_title"><bean:message key="Workflow_Template"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   		<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		   <!-- btn_div -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">
		<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
						<col width="100px" />				
						<col width="*" />				
									
				   </colgroup> 
				   <tbody>
				   		<tr>
				   			<th><bean:message key="Department"/></th>
							<td>
								<select name="f_lg_clss_biz_cd">
									<option value=''>전체</option>
									<option value='AO'>AIR OUTBOUND</option>
									<option value='AI'>AIR INBOUND</option>
									<option value='SO'>SEA OUTBOUND</option>
									<option value='SI'>SEA INBOUND</option>
								</select>
							</td>
				   		</tr>
				   </tbody>
				</table>
			</div>
		<!-- opus_design_inquiry(E) -->
		</div>
		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid" id="mainTable">
				<script type="text/javascript">comSheetObject('sheet1');</script>		
			</div>
			<!-- opus_design_grid(E) -->
		</div>
	</div>
	</form>


