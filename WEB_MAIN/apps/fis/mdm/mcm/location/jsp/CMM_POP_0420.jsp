<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0410.jsp
*@FileTitle  : CMM
*@author     : CLT
*@version    : 1.0
*@since      : 2016/02/16
=========================================================*/
%>
 

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/mcm/location/script/CMM_POP_0420.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
			function setupPage(){
				loadPage();
				
			}
	</script>
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input type="hidden" name="f_cmd" id="f_cmd" />
		<input type="hidden" name="openMean" id="openMean" />
		<input type="hidden" name="s_tp_grp" id="s_tp_grp" />
	<div class="layer_popup_title">	
	<!-- page_title(S) -->
			
		<!-- page_title_area(S) -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="Location_Code"/></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('SELECT');">Select</button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');">Close</button>
			</div>
			<!-- opus_design_btn(E) -->
	</div>
	<!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
		<!-- inquiry_area(S) -->	
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
				        	<col width="100">
				        	<col width="70">
				        	<col width="100">
				        	<col width="*">
					   </colgroup>
					   <tbody>
						<tr>
							<th><bean:message key="Location_Code"></bean:message></th>
							<td>
								<input type="text" name="f_loc_cd" class="search_form" maxlength="10" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" onkeypress="fncTpCodeSearch()" id="f_loc_cd" />
							</td>
							<th><bean:message key="Location_Name"></bean:message></th>
							<td>
								<input type="text" name="f_loc_nm" class="search_form" maxlength="200" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:320px;" onkeypress="fncTpCodeSearch()" id="f_loc_nm" /> 
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- inquiry_area(E) -->	
		<!-- grid_area(S) -->
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid" id="mainTable" >
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
		</div>
		<!-- grid_area(E) -->
	</div>
	</form>
	

