<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInBookingExcelUploadPopup.jsp
*@FileTitle  : Booking Excel Upload

*@author     : DOU Network
*@version    : 1.0
*@since      : 2016/05/16
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
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/common/js/WHOutBookingExcelUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
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
	<input type="hidden" name="user_id" 	value="<%=userInfo.getUsrid()%>" /> 
	<input type="hidden" name="org_cd" 		value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="xls_no" 		value="" /> 
	<input type="hidden" name="f_cmd" id="f_cmd" value="" />
	<div class="page_title_area clear">
		<h2 class="page_title">
			<span>Booking Excel Upload</span>
		</h2>
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_upload_excel" id="btn_upload_excel" onclick="doWork('btn_upload_excel');">Upload Excel</button><!-- 
			 --><button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!--
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_grid clear"  style="display:none;">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</form>