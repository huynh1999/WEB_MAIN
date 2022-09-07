<%
/*=========================================================
*Copyright(c) 2018 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0490.jsp
*@FileTitle  : Lane Code
*@author     : CLT
*@version    : 1.0
*@since      : 2018/01/16
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/mcm/location/script/CMM_POP_0490.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	
	<script language="javascript">
		function setupPage(){
	       	loadPage();
	    }
		var PARAM1_1 = '';
		var PARAM1_2 = '';
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
	</script>
<form name="form" method="POST" action="./">
	<!--Command를 담는 공통
	 -->
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="f_CurPage"/> 
	<input type="hidden" name="f_MultiSelect" />
	<input type="hidden" name="is_pop_opnd" value="Y"/>
	
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Lane_Code"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   <button type="button" style="display:none" id="btnApply" class="btn_normal" onclick="doWork('APPLY')" ><bean:message key="Apply"/></button>
		   <button type="button" class="btn_accent" onclick="searchList();"><bean:message key="Search"/></button>
		<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table>
					<tr>
						<th width="50"><bean:message key="Code"/></th>
						<td width="150"><input type="text" name="s_lane_cd" maxlength="5" class="search_form" value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%> text-transform:uppercase;width:150px" onKeyPress="fncTpCodeSearch()"/></td>
						<th width="50"><bean:message key="Description"/></th>
						<td width="150"><input type="text" name="s_descr" maxlength="50" class="search_form" value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:150px;text-transform:uppercase;"  onKeyPress="fncTpCodeSearch()"/></td>
						<th width="50" class="table_search_head"><bean:message key="Division"/></th>
						<td width="150"> 
						 <bean:define id="cdMap"  name="EventResponse" property="mapVal"/> 
						 <bean:define id="cdList" name="cdMap" property="PARAM1"/> 
						 <select name="s_div_cd" class="search_form" style="width:140px;"> 
						 	<option value=""></option> 
						 	<logic:iterate id="codeVO" name="cdList"> 
						 			<!-- OT(lnland Transportaion), WM(Warehouse) option excluded -->
             						<logic:notEqual name="codeVO" property="cd_val" value="OT">
             						<logic:notEqual name="codeVO" property="cd_val" value="WM">
						  				<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option> 
						 			</logic:notEqual>	             					
             						</logic:notEqual>
						 	</logic:iterate> 
						  </select> 
						 </td>
						 <th width="30px"><bean:message key="Status"/></th>
					    <td>
					        <select name="s_use_yn" class="search_form" style="text-align-last:center; width:100px;">
                            	<option value="" SELECTED>All</option>
                            	<option value="Y">Use</option>
                            	<option value="N">No Use</option>
                            </select>
					    </td>
					</tr>
				</table>
		   	</div>
		</div>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<table>
					<tr>
						<td width="55px"> 
						 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
						 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
						 <paging:options name="pagingVal" defaultval="200"/> 
						 </td>								
						 <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>

