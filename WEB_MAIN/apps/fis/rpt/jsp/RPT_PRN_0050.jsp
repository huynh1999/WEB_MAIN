<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->

	<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0050.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript">
		var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>

<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<body class="td" onLoad="javascript:loadPage();">
<form method="post" name="frm1" onSubmit="return false;">
	<input type="hidden" name="fileName" value="<bean:write name="tmpMap" property="fileName"/>"/>
	<input type="hidden" name="rdParam" value="<bean:write name="tmpMap" property="rdParam"/>"/>
	<input type="hidden" name="org_bl_qty" value="<logic:notEmpty name="tmpMap" property="org_bl_qty"><bean:write name="tmpMap" property="org_bl_qty"/></logic:notEmpty>"/>
	
	<input type="hidden" name="usr_fax_no" value="<%=userInfo.getFax()%>"/>
	<input type="hidden" name="fax_no" value=''/>
	
	<!-- 타이틀, 네비게이션 -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="bigtitle"><bean:write name="tmpMap" property="title"/></td>
		</tr>
	</table>
	
	<!-- 타이틀, 네비게이션 -->
	<!--빈공간 -->
	<!-- 소타이틀, 대버튼 -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="right">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
						<td style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('Fax');">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name">Fax</td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
						<td style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('Mail');">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Outlook"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
						<td style="cursor:hand">
							<table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('Print');">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<td width="3">&nbsp;</td>
                        <td style="cursor:hand" onclick="doWork('CLOSE');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	
	<br>
	
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table id="mainTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top"><script language="javascript">comRdObject('wo_rePort');</script></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <!-- 간격 -->
            </td>
        </tr>
    </table>
     <iframe name="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
</form>
</body>
</html>


