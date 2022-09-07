<%--
=========================================================
*@FileName   : CMM_POP_0140.jsp
*@FileTitle  : CMM
*@Description: vessel pop
*@author     : 이광훈 - vessel pop
*@version    : 1.0 - 12/30/2008
*@since      : 12/30/2008

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/debl/see/script/EDI_DBS_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();doWork('SEARCHLIST');">
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/>	
		<input	type="hidden" name="msg_no"/>	
		
	<table width="650" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
<!-------------------- title begin -------------------->
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="ZB_Number"/></td>
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
									<td style="cursor:hand" onclick="doWork('SEARCHLIST')">
										<table height="21" border="0" cellpadding="0" cellspacing="0" >
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>									
									<td width="3">&nbsp;</td>
									<td style="cursor:hand" onclick="doWork('APPLY')">
										<table height="21" border="0" cellpadding="0" cellspacing="0" >
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Apply"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>									
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
												<td width="90" class="table_search_head"><bean:message key="Z_Number"/></td>
												<td width="100" class="table_search_body">
													<input type="text" name="z_number" class="search_form" value="" style="width:110"/>
												</td>
												<td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
												<td width="80" class="table_search_head"><bean:message key="Ref_No"/></td>
												<td width="100" class="table_search_body">
													<input type="text" name="ref_no" class="search_form" value="" style="width:110"/>
												</td>
												<td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
												<td width="140" class="table_search_head">Liner Bkg. No.</td>
												<td width="100" class="table_search_body">
													<input type="text" name="bkgnbr" class="search_form" value="" style="width:110"/>
												</td>
											</tr>
											<tr>
												<td width="90" class="table_search_head"><bean:message key="B_Number"/></td>
												<td width="100" class="table_search_body">
													<input type="text" name="b_number" class="search_form" value="" style="width:110"/>
												</td>
												<td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
												<td width="80" class="table_search_head"><bean:message key="MRN"/></td>
												<td width="100" class="table_search_body">
													<input type="text" name="mrn_no" maxlength="20" class="search_form" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110"/>
												</td>
												<td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
												<td width="140" ></td>
												<td width="100">
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
									<td  colspan = "2">
								     	<script language="javascript">comSheetObject('sheet1');</script>
								     </td>
								</tr>
							</table>
							<table border="0" width="100%">
								<tr>
									<td width="55px">
				<!-------------------- Display option Begin -------------------->
										<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
										<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
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
									<td width="55px"></td>
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