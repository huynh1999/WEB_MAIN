<!-- =========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   : TransloadingCreate.js
*@FileTitle  : Transloading Order Creation
*@author     : TinLuong - DOU Network
*@version    : 1.0
*@since      : 2015/06/25
========================================================= -->
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/TransloadingAddPopUp.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String mode 	= "";
	String tro_no 	= "";
	String tro_seq 	= "";
	try {
		mode    = request.getParameter("mode");
		tro_no  = request.getParameter("tro_no");
		tro_seq = request.getParameter("tro_seq");
		if(mode==null){
			mode = "";
		} 
		if(tro_no==null){
			tro_no = "";
		} 
		if(tro_seq==null){
			tro_seq = "";
		} 
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
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
<input type="hidden" name="mode"    value="<%=mode%>"></input>
<input type="hidden" name="tro_no"  value="<%=tro_no%>"></input>
<input type="hidden" name="tro_seq" value="<%=tro_seq%>"></input>

<%-- <input type="hidden" name="user_id" 		value="<%=userInfo.getUser_id()%>" /> 
 <input type="hidden" name="user_nm" 		value="<%=userInfo.getUser_nm()%>" />
 <input type="hidden" name="org_cd" 		value="<%=userInfo.getOrg_cd()%>" />
 <input type="hidden" name="org_nm" 		value="<%=userInfo.getOrg_nm()%>" />  --%>
 
 <div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Additional"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="row_add" id="row_add"><bean:message key="ADD"/></button><!-- 
			 --><button type="button" class="btn_normal" name="row_del" id="row_del"><bean:message key="DEL"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Apply" id="btn_Apply"><bean:message key="Apply"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>
<div class="layer_popup_contents">
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>