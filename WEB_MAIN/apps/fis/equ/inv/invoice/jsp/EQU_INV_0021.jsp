<%--
=========================================================
*@FileName	: EQU_INV_0021.jsp
*@FileTitle	: CMM
*@Description: mapping pop
*@author	 : Kang Daesoo - mapping pop
*@version	: 1.0 - 10/30/2009
*@since		: 10/30/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"	prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EQU_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/equ/inv/invoice/script/EQU_INV_0021.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
        var pDoc = parent.parent.parent.document;
        hideProcess('WORKING', pDoc);
    </script>

</head>
<body onload="javascript:loadPage();">
	<form name="frm1" method="POST" >
		<!--Command를 담는 공통
		 -->
		<input type="hidden" name="f_cmd"/>
		<input type="hidden" name="openMean"/>
		<input type="hidden" name="h_tot_cnt"/>
		<input type="hidden" name="intg_bl_seq"/>
		<input type="hidden" name="lr_trdp_cd"/>
		<input type="hidden" name="lr_trdp_nm"/>
        <input type="hidden" name="s_agmt_no"/>
        <input type="hidden" name="cy_cd"/>
        <input type="hidden" name="h_tpsz_cnt"/>

	<table width="840" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
<!-------------------- title begin -------------------->
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="Invoice_Mapping"/></td>
					</tr>
<!-------------------- title end -------------------->
					<!--space -->
					<tr>
						<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
					</tr>
					<!--space -->
<!-------------------- button begin -------------------->
					<tr>
						<td height="10" align="right">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td width="3">&nbsp;</td>
									<td style="cursor:hand" onclick="doWork('CLOSE')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
<!-------------------- button end -------------------->
					
					<!--space -->
					<tr>
						<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
					</tr>
<!-------------------- table start-------------------->
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="left" class="table_search_bg">
							<!-- 간격 -->
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
								 <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
								</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
							 <tr>
								 <td width="80" nowrap="nowrap" class="table_search_head_r"><bean:message key="Invoice_No"/></td>
								 <td nowrap="nowrap" class="table_search_body">
								 <input name="s_inv_no" maxlength="50" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:115;" onBlur="javascript:this.value=this.value.toUpperCase();"/>
								 </td>
								 <td align="right" style="cursor:hand" onclick="doWork('APPLY')"	width="75" id="apply" style="display:none">
									<table height="21" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
											<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Apply"/></td>
											<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
										</tr>
									</table>
								</td>
								 <td id="invTxt" align="left" class="td" style="color:red"></td>
							</tr>
							</table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
								<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
							</table>
							<!-- 간격 -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
								</tr>
							</table>
							<table border="0" width="100%" id="mainTable">
								<tr>
									<td>
									 	<script language="javascript">comSheetObject('sheet1');</script>
									 </td>
								</tr>
							</table>
							<table border="0" width="100%" id="mainTable">
								<tr>
									<td>
									 	<script language="javascript">comSheetObject('sheet2');</script>
									 </td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
<!-------------------- table end-------------------->
			</td>
		</tr>
	</table>
	</td>
	</tr>
	</table>
	</form>
</body>
</html>