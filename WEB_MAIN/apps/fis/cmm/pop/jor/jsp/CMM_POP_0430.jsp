<%/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0430.jsp
*@FileTitle  : Automatic Process
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/jor/script/CMM_POP_0430.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">

<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
		<h2 class="page_title"><bean:message key="Automatic_Process"/></h2>
		<!-- btn_div -->
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div>
	</div>
    <div style="font-size: 12px; margin:10px 0px 0px 15px;">
		<span class="warning_msg">
			<p>There was a difference between Receive Amount and Pay Amount.</p>
			<p>Select the following process.</p>
		</span>
	</div>
 	<div>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			</tr>
		</table>
	</div>
	<div>

		<table border="0"  cellspacing="0" cellpadding="0">
<!-- 			<tr>	 -->
<%-- 				<td width="20px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td> --%>
<!-- 				<td> -->
<!-- 					<input type="radio" name="auto_process_chk" id="auto_process_over" value="O" checked> -->
<!-- 					<label for="auto_process_over"><span class="over_span"></span></label> -->
<!-- 			    </td> -->
<!-- 			</tr> -->
			<tr id="trExGlNo" style="display: none">
				<td width="20px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				<td>
					<input type="radio" name="auto_process_chk" id="auto_process_ex" value="E" checked>
					<label for="auto_process_ex">
						<span class="ex_span"></span>
						<span class="ex_span2" style="color: red"></span>
					</label>
			    </td>
			</tr>
			<tr>	
				<td width="20px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				<td>
					<input type="radio" name="auto_process_chk" id="auto_process_misc" value="M">
					<label for="auto_process_misc">
						<span class="misc_span"></span>
						<span class="misc_span2" style="color: red"></span>
					</label>
			    </td>
			</tr>
		</table>
	</div>
	<table width="250" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
			</td>
		</tr>
	</table>
	<div align="center">
		<button type="button" class="btn_normal" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
	</div>
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>