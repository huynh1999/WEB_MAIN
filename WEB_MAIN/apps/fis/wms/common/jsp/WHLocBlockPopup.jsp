<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLocBlockPopup.jsp
*@FileTitle  : Location Zone Block
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/03
=========================================================
--%>
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHLocBlockPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	
	String loc_cd 		= "";
	String zone_cd 		= "";
	String block_cd 	= "";
	
	try 
	{
		loc_cd = request.getParameter("f_loc_cd");
		if(loc_cd==null)
		{
			loc_cd = "";
		} 
		
		zone_cd = request.getParameter("f_zone_cd");
		if(zone_cd==null)
		{
			zone_cd = "";
		} 
		
		block_cd = request.getParameter("f_block_cd");
		if(block_cd==null)
		{
			block_cd = "";
		} 
		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="f_block_cd" id="f_block_cd" value="<%=block_cd%>">
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Location_Zone_Block"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
</div>
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
		<col width="80" />
   		<col width="260" />
		<col width="60" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
               <tr>
				<th><bean:message key="Warehouse"/></th>
				<td><input name="loc_cd" value="<%=loc_cd %>" type="text" class="L_input_R" id="loc_cd" dataformat="etc" style="width:70px;" maxlength="10" readOnly/></td>
				<th><bean:message key="Zone"/></th>
				<td><input name="zone_cd" value="<%=zone_cd %>" type="text" class="L_input_R" id="zone_cd" dataformat="etc" style="width:70px;" readOnly/></td>
			</tr>
			<tr>
				<th><bean:message key="Zone"/> <bean:message key="Block_Code"/></th>
				<td><input name="block_cd" value="<%=block_cd %>" type="text" class="L_input" id="block_cd"  dataformat="engup" style="ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this)"/></td>
				<th><bean:message key="Description"/></th>
				<td><input name="block_desc"  type="text" class="L_input" id="block_desc"  dataformat="etc" /></td>
			</tr>
		</tbody>  
	</table>
</div>
</div>
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
