<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ItemGroupPopup.jsp
*@FileTitle  : Item Group Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/04/29
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/ItemGroupPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String in_ctrt_no = "";
	String in_ctrt_nm = "";
	String in_grp_cd = "";
	try {
		in_ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		in_ctrt_nm = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		in_grp_cd = request.getParameter("grp_cd")== null?"":request.getParameter("grp_cd");

	} catch (Exception e) {
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
<input type="hidden" name="f_cmd" />
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Item_Group_Code"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
</div>
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
		<col width="100" />
   		<col width="300" />
		<col width="100" />
  		<col width="200" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
				<th><bean:message key="Group_Code"/></th>
				<td><input name="in_grp_cd" type="text" class="L_input" id="in_grp_cd" value="<%=in_grp_cd %>" dataformat="engup" style="width:228px;ime-mode:disabled;text-transform:uppercase;" maxlength="10" onBlur="strToUpper(this);" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
				<th><bean:message key="Group_Name"/></th>
				<td><input name="in_grp_nm" type="text" class="L_input" id="in_grp_nm" dataformat="excepthan"  maxlength="50" style="width:190px;text-transform:uppercase;ime-mode:disabled;" onBlur="strToUpper(this);" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
				<td></td>
			</tr>
			<tr>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="in_ctrt_no" id="in_ctrt_no" type="text" class="L_input" dataformat="engup" otherchar="-_" value="<%=in_ctrt_no %>" style="width:85px;ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this);searchTlCtrtInfo();"  maxlength="10" onkeydown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
					 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" alt="search" onClick="doWork('btn_ctrt_no');" tabindex="-1"></button><!-- 
					 --><input name="in_ctrt_nm" id="in_ctrt_nm" type="text" value="<%=in_ctrt_nm %>" class="L_input_R" style="width:110px;" readonly />
				</td>
				<td></td>
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
