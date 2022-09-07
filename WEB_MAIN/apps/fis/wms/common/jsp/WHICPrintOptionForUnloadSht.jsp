<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICPrintOptionForUnloadSht.jsp
*@FileTitle  : 
*@author     : Lap.Nguyen
*@version    : 1.0
*@since      : 2015/07/10
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHICPrintOptionForUnloadSht.js?ver=<%=CLT_JS_VER%>"></script>
<%
String req_wib_in_no   = "";
String req_wib_bk_no   = "";
try {
	req_wib_bk_no   = request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");

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
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%=req_wib_bk_no%>"/>
<input type="hidden" id="paper_size" name="paper_size" value="A4" />
<input type="hidden" id="com_mrdBodyTitle" name="com_mrdBodyTitle" value="Unloading Sheet Print" />
<input type="hidden" id="com_mrdArguments" name="com_mrdArguments"/>
<input type="hidden" id="com_mrdPath" name="com_mrdPath" />
<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="title" id="title" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div id="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Print_Size"/></span></h2>
	
<!--         <h1 class="Pop_title">Print Size</h1> -->
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->

       <div class="opus_design_btn">
			 <button type="button" class="btn_normal" name="btn_Print" id="btn_Print" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div>
        
	</div>
        <div class="wrap_result">
		<select id="print_size_tp" style="width: 100px; font-weight: bold;"> 
        	<option value='A4' ><bean:message key="A4"/></option> 
        	<option value='Letter' ><bean:message key="Letter"/></option>
      	</select>
			
		</div>
		
</div>
</form>
