<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LicPlatPopup.jsp
*@FileTitle  : LicPlatPopup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/11/17
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
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/LicPlatPopup.js?ver=<%=CLT_JS_VER%>"></script>

<%	
	String ctrt_no = "";
	String item_cd = "";
	String item_nm = "";
	String item_grp_cd_include_yn = ""; //Y 또는 N 
										//Y일경우 아래 item_grp_cd코드가 포함된 ITEM_CODE리스트 출력
										//N일경우 아래 item_grp_cd코드가 포함되지않은 ITEM_CODE리스트 출력
	String item_grp_cd = "";
	String c_exist_item_bom = "";
	String wh_cd = "";
	String loc_cd = "";
	String loc_nm = "";
	String expt_log_cd = "";
	
	try {
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		item_cd = request.getParameter("item_cd")== null?"":request.getParameter("item_cd");
		item_nm = request.getParameter("item_nm")== null?"":request.getParameter("item_nm");
		wh_cd   = request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
		loc_cd   = request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
		loc_nm   = request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
		expt_log_cd   = request.getParameter("expt_log_cd")== null?"":request.getParameter("expt_log_cd");
		
		item_grp_cd_include_yn = request.getParameter("item_grp_cd_include_yn")== null?"":request.getParameter("item_grp_cd_include_yn");
		item_grp_cd = request.getParameter("item_grp_cd")== null?"":request.getParameter("item_grp_cd");
		c_exist_item_bom = request.getParameter("c_exist_item_bom")== null?"":request.getParameter("c_exist_item_bom");
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
<input type="hidden" name="f_cmd">
<input type="hidden" id="c_wh_cd" name="c_wh_cd" value="<%= wh_cd %>" />
<input type="hidden" id="expt_log_cd" name="expt_log_cd" value="<%= expt_log_cd %>" />
<input type="hidden" id="ctrt_no" name="ctrt_no" value="<%= ctrt_no %>" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="License_Plate"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>
<div class="layer_popup_contents">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
		<col width="70" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
				<th><bean:message key="Contract"/></th>
				<td ><input name="c_ctrt_no" id="c_ctrt_no" type="text" class="L_input_R" id="c_ctrt_no" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" value="<%=ctrt_no%>" readonly/></td>
			</tr>
			<tr>
				<th><bean:message key="Location"/></th>
				<td><input name="loc_nm" id="loc_nm" value="<%=loc_nm %>" type="text" maxlength="10" style="width: 119px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getInboundLocInfo('c')" OnKeyDown="if(event.keyCode==13){locPopup();}"/><!-- 
						 --><button type="button" name="btn_loc_cd" id="btn_loc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_loc_cd');"></button><!-- 
						 --><input type="hidden" name="loc_cd" id="loc_cd" value="<%=loc_cd %>"/>
				</td>
			</tr>
			</tbody>
	</table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
