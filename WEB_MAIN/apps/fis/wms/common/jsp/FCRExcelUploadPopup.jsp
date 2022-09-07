<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FCRExcelUploadPopup.jsp
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/18
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/FCRExcelUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
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
<div class="layer_popup_title">
<div class="page_title_area clear">

	<h2 class="page_title"><span><bean:message key="Excel_Upload_for_FCR_Booking"/></span></h2>
	
	<div class="opus_design_btn">
			 <button type="button" class="btn_accent" name="btn_loadExcel" id="btn_loadExcel"><bean:message key="Upload_Excel"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btn_ok" id="btn_ok"><bean:message key="OK"/></button><!--
		 --><button type="button" class="btn_normal" name="btn_close" id="btn_close"><bean:message key="Close"/></button>
	</div>
	
	<div class="location">	
		<span id="navigation"></span>
	</div>
	
</div>
</div>

<div class="layer_popup_contents">  
<div class="wrap_result">
	
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>		
	</div>
</div>
</div>

</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>