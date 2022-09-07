
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLocList.jsp
*@FileTitle  : Location Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
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
    <script type="text/javascript" src="./apps/fis/wms/location/script/WHLocList.js?ver=<%=CLT_JS_VER%>"></script>
    
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    
<%

String loc_cd 		= "";
String loc_nm 		= "";
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}


%>

<script type="text/javascript">
<%-- 	<%=JSPUtil.getIBCodeCombo("space_tp_cd", "", "WS0", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("put_tp_cd", "", "PP0", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("prop_cd", "", "WL0", "0", "")%> --%>
	</script>

<script type="text/javascript">
function setupPage(){
	var errMessage = "";
	if (errMessage.length >= 1) {
		ComShowMessage(errMessage);
	} // end if
	loadPage(true);
}
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd">

<%-- <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" /> 
<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="user_id" value="<%=userInfo.getUser_id()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOrg_cd()%>" /> --%>

<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd()%>"> 
<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm()%>">

<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">

<input type="hidden" name="user_id" value="<%=userInfo.getUsrid() %>" />
<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name() %>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd() %>" />
<input type="hidden" name="org_nm" value="<%=userInfo.getOfc_eng_nm() %>">

	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 		
			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> 
			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button>
 --%>			
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
		 	<span><%=LEV2_NM%></span> &gt;
		  	<span><%=LEV3_NM%></span>
	   		<a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
	</div>

	<!-- opus_design_inquiry(S) -->
<div class= "over_wrap">	
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						<td>
							<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
							<bean:define id="WhList" name="cdMap" property="WH_LIST"/>
							<select name="loc_cd" id="loc_cd" class="search_form" style="width: 228px;" required>
								<option value=""></option>
								<logic:iterate id="WhVO" name="WhList">
									<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
						</td>
						<th>&nbsp;</th>
						<td>&nbsp;</td>
						<th><bean:message key="Active"/></th>
						<td>
							<select id="use_flg" name="use_flg" style="width:218px">
								<option value="ALL">ALL</option>
								<option value="Y">Yes</option>
								<option value="N">No</option>			        		
							</select>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Zone"/></th>
						<td><input name="zone_cd" type="text" class="L_input"
							id="zone_cd" style="width:228px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"
							maxlength="2" /></td>
						<th><bean:message key="Location"/></th>
						<td><input name="wh_loc_nm" type="text" class="L_input"
							id="wh_loc_nm" style="width:218px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"
							maxlength="20" /></td>
						<th><bean:message key="Block"/></th>
						<td><input name="block_cd" type="text" class="L_input"
							id="block_cd" style="width:218px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"
							maxlength="10" /></td>
					</tr>
					<tr>
						<th><bean:message key="Space_Type"/></th>
						<td>
							<bean:define id="MsList" name="cdMap" property="space_tp_cd"/>
							<select name="space_tp_cd" id="space_tp_cd" style="width:228px">
							<option value='ALL'>ALL</option>
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="Put_Type"/></th>
						<td>
			        		<bean:define id="MsList" name="cdMap" property="put_tp_cd"/>
							<select name="put_tp_cd" id="put_tp_cd" style="width:218px">
							<option value='ALL'>ALL</option>
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="Loc_Property"/></th>
						<td>
			        		<bean:define id="MsList" name="cdMap" property="prop_cd"/>
							<select name="prop_cd" id="prop_cd" style="width:218px">
							<option value='ALL'>ALL</option>
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->

	<!-- opus_design_inquiry(S) -->

	<div class="wrap_result">
		<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>

