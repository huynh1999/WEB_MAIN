<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightPopup.jsp
*@FileTitle  :Freight
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/FreightPopup.js?ver=<%=CLT_JS_VER%>"></script>


<%
	
	
	String code = "";
	String code_nm = "";
	String cust_cd = "";
	
	try {
		code = request.getParameter("code")== null?"":request.getParameter("code");
		code_nm = request.getParameter("code_nm")== null?"":request.getParameter("code_nm");
		cust_cd = request.getParameter("cust_cd")== null?"":request.getParameter("cust_cd");
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
<input type="hidden" name="org_cd" id="org_cd" value="KRSELLB" />
<input type="hidden" name="cust_cd" id="cust_cd" value="<%=cust_cd%>" />
<div class="layer_popup_title">
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Freight"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" name="btn_Ok" id="btn_Ok" onClick="doWork('btn_Ok');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>
<div class="layer_popup_contents">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
		<col width="50" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
     		<tr>
				<th><bean:message key="Code"/></th>
				<td><input name="c_code" type="text" class="input" id="c_code" value="<%=code%>" dataformat="engup" maxlength="4" style="width:350px;"/></td>
			</tr>
               <tr>
				<th><bean:message key="Description"/></th>
				<td><input name="c_desc" type="text" class="input" id="c_desc" value="<%=code_nm%>" dataformat="engup" style="width:350px;"/></td>
			</tr>
		</tbody>
	</table>
</div>
</div>
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
