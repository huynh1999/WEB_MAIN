<%--
=========================================================
*@FileName   : AIE_POP_0040.jsp
*@FileTitle  : Customer Contact Person
*@Description: Customer Contact Person
*@author     : Chungrue - Customer Contact Person
*@version    : 1.0 - 2009/08/12
*@since      : 2009/08/12

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="trdObj" name="EventResponse" property="objVal"/>

	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0028.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();doWork('SEARCHLIST');">
	<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="openMean"/>
	<input type="hidden" name="trdp_tp"/>	
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="intg_bl_seq"/>
	
	<table width="750" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
					<tr>
						<td class="bigtitle"><bean:message key="Contact_Person"/></td>
					</tr>
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
					<tr>
						<td height="10" colspan="2" align="right">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									
									<td width="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
									<td style="cursor:hand" onclick="doWork('MODIFY')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Charge_Contact_Person"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
									<td width="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
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
					<tr>
						<td height="7"></td>
					</tr>
					<tr>
						<td>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td align="left" class="table_search_bg">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
										<table height="100%" border="0" cellpadding="0" cellspacing="0">											
											<tr>
												<td>
													<table height="100%" border="0" cellpadding="0" cellspacing="0">							
														<tr>
														
															<td width="75" class="table_search_head"><bean:message key="Customer"/></td>
															<td class="table_search_body">
																<input type="text" name="s_trdp_cd" value="<bean:write name="trdObj" property="trdp_cd"/>" class="search_form-disable" style="width:90" readOnly/>
																<input type="text" name="s_trdp_nm" value="<bean:write name="trdObj" property="eng_nm"/>"  class="search_form-disable" style="width:180" readOnly/>
															</td>
															<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
															<td width="75" class="table_search_head"><bean:message key="Corporation_No"/></td>
                                                            <td class="table_search_body">
                                                                <input type="text" name="s_regno" value="<bean:write name="trdObj" property="biz_no"/>" class="search_form-disable" style="width:140" readOnly/>
                                                            </td>
														</tr>
													</table>
												</td>
											<tr>
										</table>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
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
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>		
	</form>
</body>
</html>