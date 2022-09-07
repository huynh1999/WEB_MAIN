<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WhDefaultPopup.js
*@FileTitle  : Warehouse default popup
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2016.03.31
=========================================================--*/
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WhDefaultPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%


	String code = "";
	String code_nm = "";
	String wh_cfg = "";


	try {
		code = request.getParameter("code")== null?"":request.getParameter("code");
		code_nm = request.getParameter("code_nm")== null?"":request.getParameter("code_nm");
		wh_cfg = request.getParameter("wh_cfg")== null?"":request.getParameter("wh_cfg");
		
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
<input type="hidden" id="wh_cfg" value="<%= wh_cfg %>" />
<div class="layer_popup_title">

<!-- page_title_area(S) -->
<div class="page_title_area clear">

	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Warehouse_List"/></span></h2>
	<!-- page_title(E) -->
	
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" name="btn_ok" id="btn_ok" onClick="doWork('BTN_OK');"><bean:message key="OK"/></button><!-- 
		--><button type="button" class="btn_normal"  name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->	
	
</div>
<!-- page_title_area(E) -->
</div>

<div class="layer_popup_contents">  

<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="80"/>
				<col width="*" />				
			</colgroup> 
			<tbody>
				 <tr>
					<th><bean:message key="WareHouse_Code"/></th>
					<td><input name="loc_cd" type="text" class="L_input" id="wh_cd" style="width:180px;ime-mode:disabled;text-transform:uppercase;" 
					dataformat="engup" onBlur="strToUpper(this);" value="<%=code%>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
				</tr>
                <tr>
					<th><bean:message key="Description"/></th>
					<td><input name="loc_nm" type="text" class="L_input" id="wh_nm" style="text-transform:uppercase;width: 180px;" value="<%=code_nm%>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
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
