<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RoleBtnAssign.jsp
*@FileTitle  : 롤 프로그램 매핑화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%> 
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@ page import="java.util.ArrayList"%>
	<!-- 공통 Header -->
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<SCRIPT type="text/javascript" src="./apps/opusbase/system/role/script/NewRoleBtnAssign.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<!--  bean:define id="test" name="roleBtnVO" property="attr1"/ -->

<script type="text/javascript">
<!--
var btCssCode = '';
var btCssName = '';
<% boolean isBegin = false; %>
<bean:define id="cdList" name="valMap" property="codeList"/>
<logic:iterate id="ComCdDtlVO" name="cdList">
	<% if(isBegin){ %>
	btCssCode+= '|';
	btCssName+= '|';
	<% }else{
		  isBegin = true;
	   } %>
	   btCssCode+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
	   btCssName+= '<bean:write name="ComCdDtlVO" property="rmk"/>';
</logic:iterate>

function setupPage(){
	loadPage();
}
//-->
</script>



<form method="post" name="form" onSubmit="return false;" action="./NewRoleBtnAssign.clt">
	<input type="hidden" id="f_cmd" name="f_cmd"     value="3"> 
	<input type="hidden" id="p_pgm_id" name="p_pgm_id"  > 
	<input type="hidden" name="callValue" id="callValue" value="">
	<input type="hidden" name="f_role_cd" id="f_role_cd">
	<input type="hidden" name="p_rgst_ofc_cd" id="p_rgst_ofc_cd">
	<input type="hidden" name="deleteButten" id="deleteButten">
	
<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		<!-- 
 			<button type="button" class="btn_normal" onclick="doWork('SEARCH');" id="btnSearch"><bean:message key="Search"/></button>
		    <button type="button" class="btn_normal" onclick="doWork('SAVE');" id="btnSave"><bean:message key="Save"/></button>
		-->
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span>&gt;
		   <span><%=LEV2_NM%></span>&gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">			
<div class= "wrap_search">				
	    <div class="opus_design_inquiry entry_pannel ">	
			<table>
				<colgroup>
					<col width="40">
					<col width="80">
					<col width="40">
					<col width="120">
					<col width="40">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Role"/></th>
						<td class="table_search_body">
							<logic:notEmpty name="EventResponse">
								<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
								<bean:define id="cdList" name="cdMap" property="cdList"/>
								<logic:empty name="cdMap" property="f_rolecd_cd"><%--최초 호출시 --%>
								<select id="f_rolecd_cd" name="f_rolecd_cd" onchange="dispMenus(this);" style="width:100px;">
									<bean:define id="cdList" name="valMap" property="cdList"/>
									<option value=""></option>
									<logic:iterate id="cdVO" name="cdList">
									<option value='<bean:write name="cdVO" property="code"/>'>
										<bean:write name="cdVO" property="code_label"/>
									</option>
									</logic:iterate>
								</select>
								</logic:empty>
								<logic:notEmpty name="cdMap" property="f_rolecd_cd"><%--조회시 --%>
									<bean:define id="callCode" name="cdMap" property="f_rolecd_cd"/>
									<select name="f_rolecd_cd" onchange="dispMenus(this);">
									<option value=""></option>
									<logic:iterate id="cdVO" name="cdList">
									<option value='<bean:write name="cdVO" property="code"/>'<logic:equal name="cdVO"  property="code" value="<%=callCode.toString()%>">selected</logic:equal>><bean:write name="cdVO" property="code_label"/></option>
									</logic:iterate>
									</select>
								</logic:notEmpty>
							</logic:notEmpty>
						</td>
						<th><bean:message key="Top_Menu"/></th>
						<td><input type="text" id="f_top_menu" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:200px"/></td>
						<th><bean:message key="Sub_Menu"/></th>
						<td><input type="text" id="f_sub_menu" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:200px"/></td>
					</tr>
				</tbody>
			</table>
		</div>
		</div>	
		<div class="wrap_result">
			<div class="opus_design_grid" style="float:left;">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<span style="width:20px; float:left;">&nbsp;</span>
			<div class="pad_left_8 layout_flex_fixed" style="width:185px"> <!-- setting : FIXED width(300px) -->
			       <!-- opus_design_inquiry(S) -->
				<div class="opus_design_inquiry">
					<table>
						<tr>
							<td>
						    	<select name="dfltBtn" id="dfltBtn"  multiple style="width:170px; height:362px; padding-left: 10px;" onclick="setBtnCodeVal();"></select>
						     </td>
						</tr>
					</table>		           
				</div>
			</div>
			<div class="pad_left_8 layout_flex_fixed" style="width:40px; padding-top:100px; float:left;"> <!-- setting : FIXED width(300px) -->
			     <!-- opus_design_inquiry(S) -->
					<div class="opus_design_inquiry" >
						<table >
				       		<tr>
					            <td><button type="button" class="btn_etc" name="btn_right0" id="btn_right0" style="width:35px;" onclick="moveList('add', 'all');">&gt;&gt;</button></td>
					        </tr>
					        <tr>
					        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('add');">&gt;</button></td>
					        </tr>
					        <tr>
					        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('del');">&lt;</button></td>
					        </tr>
					        <tr>
					            <td><button type="button" class="btn_etc" name="btn_right0" id="btn_right0" style="width:35px;" onclick="moveList('del', 'all');">&lt;&lt;</button></td>
					        </tr>
			        	</table>
					</div>
			       <!-- opus_design_inquiry(E) -->
			</div>
			<div style="padding-left: 730px;">			
				<div class="opus_design_grid" >
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
		</div>
	</div>
</form>
<script>
	doHideProcess();	
</script>
			
