
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MCLPExpressPopup.jsp
*@FileTitle  : Excel Upload for Express CLP
*@author     : Khang.Dong - DOU Network
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/MCLPExpressPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String bk_tp = "";
	try {
		bk_tp = request.getParameter("bk_tp")== null?"":request.getParameter("bk_tp");
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
<iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe>                                                                                                                                                                                                                                             
<form id="form" name="form">
	<input type="hidden" id="f_cmd" value="0" />
	<input type="hidden" name="bk_tp" value="<%=bk_tp%>">
	<%-- <input type="hidden" name="user_id" value="<%=userInfo.getUser_id()%>" />
	<input type="hidden" name="org_cd" value="<%=userInfo.getOrg_cd()%>" /> --%>
	<input type="hidden" name="out_wb_no" value="" />
	<input type="hidden" name="in_wb_no" value="" />
	<input type="hidden" name="wb_no" value="" />
	<input type="hidden" name="po_no" value="" />
	<input type="hidden" name="item_cd" value="" />
	<input type="hidden" name="user_id" value="ADMIN" />
	<input type="hidden" name="user_nm" value="ADMINISTRATION_DOU." />
	<input type="hidden" name="org_cd" value="KRSELLB" />
	<div class="layer_popup_title">
		<!-- page_title(S) -->
		<h2 class="page_title">
				<span><bean:message key="Excel_Upload_for_Express_CLP"/></span>
			</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_excel_upload" id="btn_excel_upload" onClick="doWork('btn_excel_upload');"><bean:message key="Upload_Excel"/></button><!--
			--><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		 </div>
	<!-- opus_design_btn(E) -->
	</div>

	<div class="layer_popup_contents">
	
		<div class="wrap_result">	
			
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet1');</script>
				<script type="text/javascript">comSheetObject('sheet2');</script>
				<script type="text/javascript">comSheetObject('sheet3');</script>	
			</div>
			<!-- opus_design_grid(E) -->	
			
		</div>	
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>