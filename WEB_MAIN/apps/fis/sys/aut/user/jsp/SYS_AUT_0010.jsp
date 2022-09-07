<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_AUT_0010.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 2008.12.03
*@since      : 2008.12.03

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sys/aut/user/script/SYS_AUT_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		<!-- 처리시 메시지 -->
		var ROLCD1 = '';
		var ROLCD2 = '';
		
		var LANGCD1= '';
		var LANGCD2= '';
		
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
		<!--Role 코드조회-->
		<bean:define id="rolList"  name="rtnMap" property="ROLLIST"/>
		<logic:iterate id="codeVO" name="rolList">
			<% if(isBegin){ %>
				ROLCD1+= '|';
				ROLCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			ROLCD1+= '<bean:write name="codeVO" property="code_label"/>';
			ROLCD2+= '<bean:write name="codeVO" property="code"/>';
		</logic:iterate>
		
		<!--언어코드-->
		<% isBegin = false; %>
		<bean:define id="langList" name="rtnMap" property="LANGLIST"/>
		<logic:iterate id="langVO" name="langList">
			<% if(isBegin){ %>
				LANGCD1+= '|';
				LANGCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			LANGCD1+= '<bean:write name="langVO" property="cd_nm"/>';
			LANGCD2+= '<bean:write name="langVO" property="cd_val"/>';
		</logic:iterate>
	</script>
</head>
<body class="td" onload="javascript:loadPage();">
<form name="fName" method="POST" target="./MGT_AUT_0010.clt">
    <input type="hidden" name="f_cmd"     value="">
	<input type="hidden" name="f_CurPage" value="">
		
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onclick="searchList();" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
						 </td>
						 <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
						 <td onclick="doWork('ROWADD')" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
                          </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                         <td onclick="doWork('SAVE')" style="cursor:hand">
                            <table id="btnSave" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                          </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                     <td nowrap class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Basic_Information"/></td>
                     <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
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
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
</body>
</html>