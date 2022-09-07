<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : NoSession.jsp
*@FileTitle  : 로그인 실패화면
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
<script type="text/javascript" src="./js/common/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="./style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<SCRIPT LANGUAGE="javascript" SRC="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
<script>
	function getCookieVal(offset)
	{
	    var endstr = document.cookie.indexOf (";", offset);
	    if (endstr == -1) endstr = document.cookie.length;
	    return unescape(document.cookie.substring(offset, endstr));
	}
	
	function GetCookie(name)
	{
	    var arg = name + "=";
	    var alen = arg.length;
	    var clen = document.cookie.length;
	    var i = 0;
	    while (i < clen) //while open
	    {
	        var j = i + alen;
	        if (document.cookie.substring(i, j) == arg)
	            return getCookieVal (j);
	        i = document.cookie.indexOf(" ", i) + 1;
	        if (i == 0) break;
	    } //while close
	    return null;
	}
	
	function gotoLogin(){
		var fs_chk = GetCookie('fs_chk');
		if(fs_chk == "Y"){
			mform.target = "_parent";
		}else{
			mform.target = "_top";
		}
		
		var re = /opusfwd\/Mob/ig;
		mform.action = "./index.html"; 
		if(re.exec(location.pathname) != null){
			mform.action = "/opusfwd/MobLogin.usr"; 
		}
		
		mform.submit();
	}
</script>
</head>
<body topmargin="0" bottommargin="0" leftmargin="0" rightmargin="0">
<form name="mform" method="POST" action="./index.html" target="_top">
<!-- warning(S) -->
<div class="warning">
    <h1><img src="<%=CLT_PATH%>/style/images/theme_blue/ico_warning.png" alt="Warning" />Info</h1>

<!-- pre TAG(S) : do not indent -->
<pre>
<strong><b>[<bean:message bundle="SysPageComment" key="message.nosession"/>]</b></strong>

<%--<bean:message key="Contact"/>&nbsp;:&nbsp;&nbsp; --%>
<bean:message bundle="SysPageComment" key="message.admin.name"/>
<%-- 
<bean:message key="Toll_Free"/>&nbsp;:&nbsp;&nbsp;<bean:message bundle="SysPageComment" key="message.admin.phone2"/>
<bean:message key="Telephone"/>&nbsp;:&nbsp;&nbsp;<bean:message bundle="SysPageComment" key="message.admin.phone"/>
--%>
<bean:message key="EMail"/>&nbsp;:&nbsp;&nbsp;<a href='mailto:<bean:message bundle="SysPageComment" key="message.admin.email"/>'><u><bean:message bundle="SysPageComment" key="message.admin.email"/></u></a>,&nbsp;<a href='mailto:<bean:message bundle="SysPageComment" key="message.admin.email2"/>'><u><bean:message bundle="SysPageComment" key="message.admin.email2"/></u></a>,&nbsp;<a href='mailto:<bean:message bundle="SysPageComment" key="message.admin.email3"/>'><u><bean:message bundle="SysPageComment" key="message.admin.email3"/></u></a>
<bean:message key="Home_Page"/>&nbsp;:&nbsp;&nbsp;<a href="<bean:message bundle="SysPageComment" key="message.admin.homePage"/>" target="_blank"><u><bean:message bundle="SysPageComment" key="message.admin.homePage"/></u></a>
</pre>
<!-- pre TAG(E) : do not indent -->

    <!-- warning_btn(S) -->
    <br>
    <div class="warning_btn align_left">
        <button type="button" class="btn_accent" onclick="gotoLogin();">Move to Login page</button> 
    </div>
    <!-- warning_btn(E) -->
</div>
<!-- warning(E) -->

</form>	
</body>
<script>
    doHideProcess();   
</script>
</html>