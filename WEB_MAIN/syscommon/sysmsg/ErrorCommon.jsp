<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : ErrorCommon.jsp
*@FileTitle  : 일반적인 요류 발생시
*@Description: 시스템. 공통
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2009
*@since      : 01/07/2009

*@Change history:
=========================================================
--%>
<%@page import="com.clt.framework.core.controller.util.WebKeys"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@include file="./../header/CLTInitHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<title><bean:message key="system.title"/></title>
<script type="text/javascript" src="./js/common/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="./style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<SCRIPT LANGUAGE="javascript" SRC="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
</head>
<body topmargin="0" bottommargin="0" leftmargin="0" rightmargin="0">
<!-- warning(S) -->
<div class="warning">
    <h1><img src="<%=CLT_PATH%>/style/images/theme_blue/ico_warning.png" alt="Warning" />Info</h1>
<%
Object exceptionObj = request.getAttribute(WebKeys.EXCEPTION_OBJECT);
Exception exception = (Exception)exceptionObj;
%>
<!-- pre TAG(S) : do not indent -->
<pre>
<strong><b>[<%if (pageContext.getException() == null) {
	out.print(pageContext.getException());
} else {
	out.print(exception.getMessage());
}
%>]</b></strong>

<bean:message key="Contact"/>&nbsp;:&nbsp;&nbsp;<bean:message bundle="SysPageComment" key="message.admin.name"/>
<bean:message key="Toll_Free"/>&nbsp;:&nbsp;&nbsp;<bean:message bundle="SysPageComment" key="message.admin.phone2"/>
<bean:message key="Telephone"/>&nbsp;:&nbsp;&nbsp;<bean:message bundle="SysPageComment" key="message.admin.phone"/>
<bean:message key="EMail"/>&nbsp;:&nbsp;&nbsp;<a href='mailto:<bean:message bundle="SysPageComment" key="message.admin.email"/>'><bean:message bundle="SysPageComment" key="message.admin.email"/></a>
<bean:message key="Home_Page"/>&nbsp;:&nbsp;&nbsp;<a href="http://www.cyberlogitec.com" target="_blank"><bean:message bundle="SysPageComment" key="message.admin.homePage"/></a>
</pre>
<!-- pre TAG(E) : do not indent -->

</div>
<!-- warning(E) -->
</body>
<script>
    doHideProcess();   
</script>
</html>