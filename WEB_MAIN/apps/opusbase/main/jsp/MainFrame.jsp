<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MainFrame.jsp.jsp
*@FileTitle  : 실제 Contents를 표시하는 FrameSet 
*@Description: topframe.jsp -> MidFrame.jsp -> MainFrame.jsp로 호출됨
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../syscommon/header/CLTGSHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
</head>
<frameset name="1" rows="52,*" cols="*" frameborder="no" border="0" framespacing="0">
    <frame src="./TopMenu.clt"    name="topFrame"  id="topFr"  scrolling="No" noresize="noresize"/>
    <frameset id="mainFrSet" name="2" cols="0,*" frameborder="no" border="0" framespacing="0">
		<frame src="./blankblue.screen" name="dispBgFrame" id="dispFr"  frameborder='0' border="0" framespacing="0" scrolling="no" style="border:none;">
        <frame src="./TabWindow.screen" name="mainFrame"   id="mainFr"/>
    </frameset>
</frameset>
<noframes><body>
</body>
</noframes>
</html>