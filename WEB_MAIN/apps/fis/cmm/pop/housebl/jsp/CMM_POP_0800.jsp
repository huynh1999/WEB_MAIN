<%/*=========================================================
			 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
			 *@FileName   : CMM_POP_0320.jsp
			 *@FileTitle  : ?
			 *@author     : CLT
			 *@version    : 1.0
			 *@since      : 2014/07/24
			 =========================================================*/%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0800.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	

	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">

<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="Please_enter_the_weight_ratio_for_each_shipment"/></span>
		</h2>
		<!-- btn_div 
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div> -->
	</div>

    <div style="font-size: 12px; margin:10px 0px 0px 15px;">
		<span class="warning_msg"></span>
	</div>
 	<div>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
	</div>
	<div style="width:100%;float:center">

		<table border="0"  cellspacing="0" cellpadding="0">
			<colgroup>
				<col width="7">
				<col width="50">
				<col width="50">
				<col width="50">
				<col width="50">
			</colgroup>
			<tbody>		
				<tr>
				    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					<td align="center">HMA</td>
					<td><input type="text" width="45px" maxlength="3"  id="h_volume" class="" dataformat="int" style="text-align:right;ime-mode:disabled; text-transform:uppercase;width:50px">%</td>
					<td align="center">KMA</td>
					<td><input type="text" width="45px" maxlength="3"  id="k_volume" class="" dataformat="int" style="text-align:right;ime-mode:disabled; text-transform:uppercase;width:50px">%</td>
				</tr>
			</tbody>
		</table>
		<table  border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
				</td>
			</tr>
		</table>
	</div>
	<table width="250" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
			</td>
		</tr>
	</table>
	<div align="center">
		<button type="button" class="btn_normal" onclick="doWork('YES')">OK</button>
	</div>
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>