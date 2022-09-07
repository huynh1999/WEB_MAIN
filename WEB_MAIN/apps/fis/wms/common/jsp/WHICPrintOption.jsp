
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICPrintOption.jsp
*@FileTitle  : Print Option
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--%>
<%@page import="com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging" prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/common/js/WHICPrintOption.js?ver=<%=CLT_JS_VER%>"></script>
<%

// UserInfoVO userInfo = (UserInfoVO) session.getAttribute("AbstractAccountInfo");

String req_wib_in_no = "";
String req_wib_bk_no = "";

try {
	req_wib_in_no = request.getParameter("wib_in_no")== null?"":request.getParameter("wib_in_no");
	req_wib_bk_no = request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");
	
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
<input type="hidden" id="wib_in_no" name="wib_in_no" value="<%=req_wib_in_no%>"/>
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%=req_wib_bk_no%>"/>
<input type="hidden" id="paper_size" name="paper_size" value="A4" />

 <!-- Print -->
<input type="hidden" name="com_mrdPath">
<input type="hidden" name="com_mrdArguments"> 
<input type="hidden" name="com_mrdBodyTitle">

<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="title" id="title" />

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_Print" id="btn_Print" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onclick="doWork('CLOSE')"><bean:message key="Close"/></button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>

<div class= "wrap_search">
	<h3 class="title_design"><bean:message key="Print_Option"/></h3>
	<div class="opus_design_inquiry entry_pannel">
		<table> 
			<tbody>
				<tr>
					<td style="height:30px"><input type="checkbox" id="chOption1" name="chOption1"/><label for="chOption1">Putaway Work Sheet</label></td>
				</tr>
				<tr>
					<td style="height:30px"><input type="checkbox" id="chOption2" name="chOption2"/><label for="chOption2">Pallet Label</label></td>
				</tr>
				<tr>
					<td style="height:30px"><input type="checkbox" id="chOption3" name="chOption3" checked="true"/><label for="chOption3">Inbound OS&D Sheet</label></td>
				</tr>
				</tbody>
		</table>
	</div>
</div>

</form>
