<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MidFrame.jsp
*@FileTitle  : 메뉴표시 FrameSet화면
*@Description: 상위에 topframe.jsp가 있고 하위에 MainFrame.jsp 를 가지고 있다. 메뉴(script)를 표시한다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008
*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
	<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
		<script language="javascript" src="<%=CLT_PATH%>/js/common/MenuCntrol.js?ver=<%=CLT_JS_VER%>"></script>
		<script>
		<% try{ 
			%>
			userId = '<%=userInfo.getUsrid()%>';

			var tmp = '<%=userInfo.getPwd_range()%>';
			if(tmp < 10){
				alert(tmp + ' days left until the password expiration period.');
			}
			make_menus();
		<% }catch(NullPointerException exc){ 
			exc.printStackTrace();
		  }
		%>			
		
		</script>
        <style>
            .transparent
            {
               filter:alpha(opacity=60); 
               -moz-opacity: 0.6; 
               opacity: 0.6; 
            }
        </style>
	</head>
	<body bgcolor="#666666">
		<!--
		<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
			<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
		</div>
		-->
		<iframe id="midFr" src="./NewMain.clt" width="100%" height="100%" marginwidth="0" marginheight="0" noresize scrolling="no" frameborder="NO"  frameborder="0">
		
</frameset>
<noframes><body></body></noframes>
	</body>
</html>