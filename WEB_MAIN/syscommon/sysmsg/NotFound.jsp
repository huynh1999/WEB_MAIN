<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : NotFound.jsp
*@FileTitle  : 화면찾기 실패시
*@Description: 시스템. 공통
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2009
*@since      : 01/07/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@include file="./../header/CLTInitHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<title><bean:message key="system.title"/></title>
<script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="./style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<SCRIPT LANGUAGE="javascript" SRC="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
</head>
<body topmargin="0" bottommargin="0" leftmargin="0" rightmargin="0">
<!-- warning(S) -->
<form name="mform" method="POST" action="./index.html" target="_top">
<div class="warning">
    <h1><img src="<%=CLT_PATH%>/style/images/theme_blue/ico_warning.png" alt="Warning" />Info</h1>

<!-- pre TAG(S) : do not indent -->

<pre>
<strong><b>[<bean:message bundle="SysPageComment" key="message.404"/>]</b></strong>
[404 Page Not Found]
Page is deleted or temporarily not available. 

Please close the browser and reopen the page.
If restarting the browser and refreshing the screen doesn’t resolve the issue, please contact Customer Service Agent.

[Customer Service]
Email: Logistics.helpdesk@cyberlogitec.com, support.us@cyberlogitec.com, support.cn@cyberlogitec.com
Home Page: http://support.cyberlogitec.com

</pre>
<!-- pre TAG(E) : do not indent -->

</div>
<!-- warning(E) -->
<script>
    doHideProcess();   
</script>
</body>
</html>