<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WOExcelUploadPopup.jsp
*@FileTitle  : WO Item ExcelUpload
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/17
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WOExcelUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
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
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="WO_Item_ExcelUpload"/></span>
	</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_loadExcel" id="btn_loadExcel"><bean:message key="Load_Excel"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK"><bean:message key="OK"/></button><!-- 
		     --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close"><bean:message key="Close"/></button>
	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
</div>
<div class="wrap_result"> 
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</div>
</form>


<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>