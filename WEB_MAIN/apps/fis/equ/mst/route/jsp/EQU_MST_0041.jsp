<%--
=========================================================
*@FileName   : EQU_POP_0010.jsp
*@FileTitle  : CMM
*@Description: agreement pop
*@author     : Kang Daesoo - agreement pop
*@version    : 1.0 - 10/30/2009
*@since      : 10/30/2009

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
	<script language="javascript" src="./apps/fis/equ/mst/route/script/EQU_MST_0041.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EQU_MSG.js?ver=<%=CLT_JS_VER%>"></script>

</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();">
	<form name="frm1" method="POST" >
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>

	<table width="650" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
<!-------------------- title begin -------------------->
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="Route_Creation"/></td>
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
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
			                        <td style="cursor:hand" onclick="doWork('MODIFY')">
										<table id="btnSave" height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
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
					<!--space -->
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
				    <!--space -->
					<tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="120" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="POL"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="pol_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('LOCATION_POPLIST')" style="cursor:hand;" align="absmiddle">
								<input name="pol_nm" maxlength="50"  value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:180;">
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="600"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <!-- 간격 -->
            <!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
          <!-- 간격 -->
        </td>
      </tr>
					<tr>
						<td height="7"></td>
					</tr>
					<tr>
						<td>
							<!-- 간격 -->
			                <table width="100%" border="0" cellspacing="0" cellpadding="0">
			                    <tr>
			                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			                    </tr>
			                </table>
			                <table width="100%" border="0" cellpadding="0" cellspacing="0">
			                  <tr>
			                     <td height="21"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                     			 <td align="right" style="cursor:hand" onclick="doWork('ROWADD')"  width="75" id="rowAdd" style="display:none">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
											</tr>
										</table>
								 </td>
			                  </tr>
			                </table>
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