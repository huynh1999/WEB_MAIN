<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInExcelUploadPopup.js
*@FileTitle  : Excel Upload for Warehouse Supplier Booking
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/22
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
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHInExcelUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%	
	//String CLT_PATH = ".";

	String ctrt_no = "";
	
	try {		
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
	} catch(Exception e) {
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
<input id="ctrt_no" type="hidden" value = "<%=ctrt_no%>" ></input>
<input id="f_cmd" name="f_cmd" type="hidden" value = "" ></input>
<input id="f_param_val" name="f_param_val" type="hidden" value = "" ></input>

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Excel_Upload_for_Warehouse_Supplier_Booking"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<div style="display:none">
		<input name="autoCalculation" id="autoCalculation" type="checkbox" checked /><label for="autoCalculation"><bean:message key="Volume"/> <bean:message key="Auto"/> <bean:message key="B.Calculate"/></label>
		</div>
		<button type="button" class="btn_accent" name="btn_upload_excel" id="btn_upload_excel" onClick="doWork('btn_upload_excel');"><bean:message key="Upload_Excel"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
</div>
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<div class="opus_design_grid clear" style="display:none">
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
</div>

</form> 
<!--  Working Image  -->
<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
	<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
</div>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>