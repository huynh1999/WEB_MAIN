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
<SCRIPT type="text/javascript" src="./apps/opusbase/system/role/script/RoleBtnAssign.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<!--  bean:define id="test" name="roleBtnVO" property="attr1"/ -->

<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
}
//-->
</script>


				
<form method="post" name="form" onSubmit="return false;" action="./RoleBtnAssign.clt">
	<input	type="hidden" id="f_cmd" name="f_cmd"     value="3"> 
	<input	type="hidden" name="callValue" id="callValue" value="">
	
<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
	   
		    <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr3() %>"  onclick="doWork('ADD')" id="btnAdd"><bean:message key="Save"/></button> 
		    <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" id="btnExcel" name="btn_DownExcel"><bean:message key="Excel"/></button>
		
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span>&gt;
		   <span><%=LEV2_NM%></span>&gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
			
<div class= "wrap_search">				
	    <div class="opus_design_inquiry wFit ">	
			<table>
				<colgroup>
					<col width="40">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Role"/></th>
						<td class="table_search_body"><!--
						--><logic:notEmpty name="EventResponse"><!--
						--><bean:define id="cdMap"  name="EventResponse" property="mapVal"/><!--
						--><bean:define id="cdList" name="cdMap" property="cdList"/><!--
						--><logic:empty name="cdMap" property="f_rolecd_cd"><%--최초 호출시 --%><!--
						--><select name="f_rolecd_cd" onchange="dispMenus(this);" style="width:223px;"><!--
						--><bean:define id="cdList" name="valMap" property="cdList"/><!--
						--><option value=""></option><!--
						--><logic:iterate id="cdVO" name="cdList"><!--
						--><option value='<bean:write name="cdVO" property="code"/>'><bean:write name="cdVO" property="code_label"/></option><!--
						--></logic:iterate><!--
						--></select><!--
						--></logic:empty><!--
						--><logic:notEmpty name="cdMap" property="f_rolecd_cd"><%--조회시 --%><!--
						--><bean:define id="callCode" name="cdMap" property="f_rolecd_cd"/><!--
						--><select name="f_rolecd_cd" onchange="dispMenus(this);"><!--
						--><option value=""></option><!--
						--><logic:iterate id="cdVO" name="cdList"><!--
						--><option value='<bean:write name="cdVO" property="code"/>'<logic:equal name="cdVO"  property="code" value="<%=callCode.toString()%>">selected</logic:equal>><bean:write name="cdVO" property="code_label"/></option><!--
						--></logic:iterate><!--
						--></select><!--
						--></logic:notEmpty><!--
						--></logic:notEmpty><!--
						   <button type="button" class="input_seach_btn" tabindex="-1" name="billto" id="billto" onclick="doWork('POP')"></button>-->													
						</td>
					</tr>
				</tbody>
			</table>
</div>
</div>	
<div class="wrap_result">
	<div class="opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>				
</form>
<script>
	doHideProcess();	
</script>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>				