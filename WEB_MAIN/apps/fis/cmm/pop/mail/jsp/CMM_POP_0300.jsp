<%--
=========================================================
*@FileName   : CMM_POP_0300.jsp
*@FileTitle  : CMM
*@Description: mail info
*@author     : Kim,Jin-Hyuk
*@version    : 1.0 - 2011-09-30
*@since      : 2011-09-30

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/mail/script/CMM_POP_0300.js?ver=<%=CLT_JS_VER%>"></script>
	<base target="_self"/>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="air_sea_clss_cd"/>
		<input	type="hidden" name="bnd_clss_cd"/>
		<input	type="hidden" name="f_CurPage"/> 	

	<table width="480" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
<!-------------------- title begin -------------------->
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="CMM_POP_0190.TIT"/></td>
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
									<td style="cursor:hand" onclick="doWork('CLOSE');">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="btn.close"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
<!-------------------- button end -------------------->
					<tr>
						<td height="7"></td>
					</tr>
<!-------------------- search begin -------------------->
					<tr>
						<td>
							TEST
						</td>					
					</tr>
				</table>
			</td>
		</tr>
	</table>		
	</form>
</body>
</html>