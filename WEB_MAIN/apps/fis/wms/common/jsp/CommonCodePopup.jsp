<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CommonCodePopup.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
%>
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/CommonCodePopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String grp_cd = "";
	String code = "";
	String code_nm = "";
	String wh_flag = "";
	String ctrt_no = "";
	String item_sys_no = "";

	try {
		grp_cd = request.getParameter("grp_cd")== null?"":request.getParameter("grp_cd");
		code = request.getParameter("code")== null?"":request.getParameter("code");
		code_nm = request.getParameter("code_nm")== null?"":request.getParameter("code_nm");
		wh_flag = request.getParameter("wh_flag")== null?"":request.getParameter("wh_flag");
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		item_sys_no = request.getParameter("item_sys_no")== null?"":request.getParameter("item_sys_no");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<script type="text/javascript">
	<%-- <%=JSPUtil.getIBCodeCombo("grp_cd", "", "", "9", "")%>	 --%>
	</script>
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
<input type="hidden" name="pram_grp_cd" value="<%=grp_cd%>" id="pram_grp_cd" />
<input type="hidden" name="wh_flag" value="<%=wh_flag%>" id="wh_flag" />
<input type="hidden" name="ctrt_no" value="<%=ctrt_no%>" id="ctrt_no" />
<input type="hidden" name="item_sys_no" value="<%=item_sys_no%>" id="item_sys_no" />

<div class="layer_popup_title">

<!-- page_title_area(S) -->
<div class="page_title_area clear">

	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Common_Code"/></span></h2>
	<!-- page_title(E) -->
	
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal"  name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->	
	
</div>
<!-- page_title_area(E) -->
</div>

<div class="layer_popup_contents">  

<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="80"/>
				<col width="*" />				
			</colgroup> 
			<tbody>
				 <tr>
					<th><bean:message key="Group_Name"/></th>
					<td>
						<bean:define id="MsList" name="cdMap" property="grp_cd"/>
			        		<select name="grp_cd" id="grp_cd" class="search_form" style="width: 180px;">
             					<logic:iterate id="codeVO" name="MsList">
             						<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
             					</logic:iterate>
             					<option value='A6'>PACKAGE CODE</option>
             				</select>
					</td>
				</tr>
                <tr>
					<th><bean:message key="Code"/></th>
					<td><input name="c_code" type="text" class="L_input" id="c_code" style="width:180px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" value="<%=code%>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
				</tr>
                <tr>
					<th><bean:message key="Description"/></th>
					<td><input name="c_desc" type="text" class="L_input" id="c_desc" style="text-transform:uppercase;width: 180px;" value="<%=code_nm%>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
</div>
<div class="wrap_result">
	
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid">	
		<script type="text/javascript">comSheetObject('sheet1');</script>		
	</div>
	<!-- opus_design_grid(E) --> 
</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
