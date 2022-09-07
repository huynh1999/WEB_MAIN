<%--
=========================================================
*@FileName   : EDI_AWB_0020.jsp
*@FileTitle  : AWB SEND History 
*@Description: AWB SEND History 
*@author     : Wonki Eo
*@version    : 1.0 - 10/23/2018
*@since      : 10/23/2018

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/awb/script/EDI_AWB_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	
	<script language="javascript">
		function setupPage(){
	       	loadPage();
	    }
	</script>
<form name="form" method="POST" action="./">
	<!--Command를 담는 공통
	 -->
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="f_CurPage"/> 
	<input	type="hidden" name="f_bl_no"/>
	<input	type="hidden" name="f_intg_bl_seq"/>  
	<input	type="hidden" name="f_msg_tp_cd" /> 
	
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span>EDI History</span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
		</div>
	</div>
</form>