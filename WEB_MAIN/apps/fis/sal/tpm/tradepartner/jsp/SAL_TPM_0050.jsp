<%--
=========================================================
*@FileName   : SAL_TPM_0050.jsp
*@FileTitle  : CMM
*@Description: zip code pop
*@author     : Kim,Jin-HYUNK
*@version    : 1.0 - 12/23/2009
*@since      : 12/23/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
    
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0050.js?ver=<%=CLT_JS_VER%>"></script>
		
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();">
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
		
	<table width="800" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
<!-------------------- title begin -------------------->
					<tr>
						<td class="bigtitle"><bean:message key="Zip_Code"/></td>
					</tr>
<!-------------------- title end -------------------->
					<!--space -->
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
				    <!--space -->
<!-------------------- button begin -------------------->
					<tr>
						<td height="10" colspan="2" align="right">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="cursor:hand" onclick="doWork('SEARCHLIST')">
										<table height="21" border="0" cellpadding="0" cellspacing="0" >
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
									<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
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
					<tr>
						<td height="7"></td>
					</tr>
<!-------------------- search begin -------------------->
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
												<td width="100" class="table_search_head">Addr.</td>
												<td width="400" class="table_search_body">
													<input type="text" name="s_addr" class="search_form" value="" style="width:400" onkeypress="if(event.keyCode==13){return false;}"/>
												</td>
											</tr>
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
<!-------------------- search end -------------------->
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
				
				<table border="0" width="100%">
					<tr>
						<td width="55">
	<!-------------------- Display option Begin -------------------->
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="pagingTbl"/>
							<paging:options name="pagingVal" defaultval="200"/>
<!-------------------- Display option End -------------------->					
						</td>								
						<td align="center">
							<table>
								<tr>
									<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
						<td width="55"></td>
					</tr>
				</table>
				
			</td>
		</tr>
	</table>	
		

	</form>
</body>
</html>