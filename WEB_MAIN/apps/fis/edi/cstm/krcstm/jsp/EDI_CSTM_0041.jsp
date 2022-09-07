<%--
=========================================================
*@FileName   : EDI_CSTM_0041.jsp
*@FileTitle  : EDI 전문내용 확인
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="blVO"      name="EventResponse" property="objVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<body class="td">
<form name="frm1" method="POST" action="./EDI_CSTM_0021.clt">
    <!--Command를 담는 공통 -->
    <table width="320" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><bean:message key="EDI_Full_Contents"/></td>
            <td align="right" nowrap class="navi"></td>
        </tr>
    </table>
    <table width="100%">
		<tr>
			<td>
				<table width="680" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td align="left" class="table_search_bg"><!-- 간격 -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<!-- <td width="100" nowrap class="table_search_head" height="20px">전문번호</td>  -->
									<!-- <td class="table_search_body"><b><bean:write name="blVO" property="edi_msg_no"/></b></td>  -->  
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>	  
		</tr>
		<tr>
			<td height="5px"></td>
		</tr>
		<tr>
			<td>	
				<table width="680" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td align="left" class="table_search_bg"><!-- 간격 -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr><td height="8"></td></tr>
								<tr>
									<td>
										<textarea cols="127" rows="20"><bean:write name="blVO" property="edi_msg_txt" filter="false"/></textarea>
									</td>
								</tr>
								<tr><td height="8"></td></tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
    <!-- 소타이틀, 대버튼 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="5"></td>
		</tr>
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="cursor:hand" onclick="window.close();">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>