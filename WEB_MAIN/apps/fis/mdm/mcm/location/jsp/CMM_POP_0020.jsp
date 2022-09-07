<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0020.jsp
*@FileTitle  : CMM
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/05
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
	<script type="text/javascript" src="./apps/fis/mdm/mcm/location/script/CMM_POP_0020.js?ver=<%=CLT_JS_VER%>"></script>
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
		<input type="hidden" name="s_conti_code" id="s_conti_code" />
	<div class="layer_popup_title">	
	<!-- page_title(S) -->
			
		<!-- page_title_area(S) -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="Country_Code"/></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');">Search</button><!-- 
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
				        	<col width="185">
				        	<col width="50">
				        	<col width="*">
					   </colgroup>
					   <tbody>
						<tr>
							<th><bean:message key="Sub_Continent"></bean:message></th>
							<td>
								<div id="div_subcode">
									<logic:notEmpty name="EventResponse">
										<bean:define id="contiMap"  name="EventResponse" property="mapVal"/>
										<bean:define id="contiList" name="contiMap" property="contiList"/>
										<select name="s_continent_code">
											<logic:iterate id="contiVO" name="contiList">
												<option value='<bean:write name="contiVO" property="conti_cd"/>'><bean:write name="contiVO" property="eng_nm"/></option>
											</logic:iterate>
											</logic:notEmpty>
										</select>
								</div>
							</td>
							<th><bean:message key="Country_Name"></bean:message></th>
							<td>
								<input type="text" name="s_country_name" class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeypress="fncTpCodeSearch()" id="s_country_name" /><!-- 
							--><input type="text" name="s_country_name2" class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; display:none ; text-transform:uppercase;width:0px;" onkeypress="fncTpCodeSearch()" id="s_country_name2" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- inquiry_area(E) -->	
		<!-- grid_area(S) -->
		<div class="wrap_result">
			<div class="opus_design_grid" id="mainTable" >
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
		<!-- grid_area(E) -->
	</div>
	</form>
	

