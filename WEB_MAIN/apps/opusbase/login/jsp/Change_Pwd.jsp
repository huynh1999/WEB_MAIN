<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@include file="./../../../../syscommon/header/CLTInitTokenHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<title><bean:message key="system.title"/></title>
	<base target="_self"/>
	
	<script language="javascript">

		function doWork(srcName){
			switch(srcName) {
				case "APPLY":
					
					if(form.curr_pwd.value==''){
						alert('Please input current password.');
						form.curr_pwd.focus();
						return;
					}else if(form.chg_pwd.value==''){
						alert('Please input change password.');
						form.chg_pwd.focus();
						return;
					}else if(form.chg_pwd_chk.value==''){
						alert('Please input password confirm.');
						form.chg_pwd_chk.focus();
						return;
					}

					if(form.chg_pwd.value!=form.chg_pwd_chk.value){
						alert('The password entered does not match.');
						return;
					}

					form.f_cmd.value = COMMAND01;
					form.submit();
				break;
				case "CLOSE":
					window.close();
				break;
			}
		}

		function loadPage(){
			var arg=window.dialogArguments;

			form.f_usrid.value = arg[0];
			form.f_pwd.value = arg[1];
		}

		function rtnMsg(){
			<logic:notEmpty name="EventResponse">
				<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
				<logic:notEmpty name="valMap">
					<logic:equal name="valMap" property="msg" value="pwd">
						alert('Your current password is wrong.');
					</logic:equal>
					<logic:equal name="valMap" property="msg" value="success">
						alert('Your password is changed.\nPlease login again.');
						window.returnValue = "success";
						window.close();
					</logic:equal>
				</logic:notEmpty>
			</logic:notEmpty>
			
		}
	</script>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="loadPage();rtnMsg();">
	<form name="form" method="POST" action="./Change_Pwd.usr">
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="f_CurPage"/>
		<input	type="hidden" name="f_usrid"/>
		<input	type="hidden" name="f_pwd"/>
	<table width="255" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="255" border="0" cellpadding="0" cellspacing="0"/>
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="Change_Password"/></td>
					</tr>
					<tr>
						<td height="10" align="right">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="cursor:hand" onclick="doWork('APPLY')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
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
<!-------------------- search end -------------------->
					<tr>
						<td>
							<table width="255" border="0" cellspacing="0" cellpadding="0">
						        <tr>
						            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						        </tr>
						    </table>
							<table border="0" width="255" id="mainTable">								
								<tr>
									<td width="120"  nowrap class="table_search_head">Currnet Password</td>
									<td width="115" class="table_search_body">
										<input name="curr_pwd" type="password" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115;">
									</td>
								</tr>
								<tr>
									<td width="120"  nowrap class="table_search_head"><bean:message key="Change_Password"/></td>
									<td width="115" class="table_search_body">
										<input name="chg_pwd" type="password" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115;">
									</td>
								</tr>
								<tr>
									<td width="120"  nowrap class="table_search_head"><bean:message key="Confirm_Password"/></td>
									<td width="115" class="table_search_body">
										<input name="chg_pwd_chk" type="password" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115;">
									</td>
								</tr>
								<tr>
									<td width="250" height="20" colspan="2" nowrap class="table_search_head"><bean:message key="Dont_use_your_birthday_or_phone_number"/></td>
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