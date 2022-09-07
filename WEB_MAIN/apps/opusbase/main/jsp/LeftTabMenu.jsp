<%@ page contentType="text/html; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
	<script>
		//좌측 메뉴표시
		
		function showMenu(){
			parent.doWorkMemu();
		}
		
		//메인화면 조회
		function dispMaing(){
			parent.midFr.mainFr.dSt('1');
		}
		
		//로그아웃
		function doLogout(){
			document.forms[0].target = "_top";
			document.forms[0].submit();
		}
	</script>
</head>
<body style="margin-top:0px;margin-left:0px;">
	<table border="0" cellpadding="0" cellsapcing="0">
		<tr>
			<td bgcolor="#FFFFFF" valign="top">
				<img src="<%=CLT_PATH%>/web/img/left/toggle1.gif"       onclick="showMenu()"  style="cursor:hand;margin-top:1px;" width="14" height="26" vspace="1" border="0"><br>
				<img src="<%=CLT_PATH%>/web/img/left/toggle_home.gif"   onclick="dispMaing()" style="cursor:hand;" width="14" height="39" vspace="1" border="0"><br>
				<img src="<%=CLT_PATH%>/web/img/left/toggle_logout.gif" onclick="doLogout()"  style="cursor:hand;" width="14" height="48" vspace="1" border="0"><br>
				<a href="<%=CLT_PATH%>/HelpPage.html" target="_blank"><img src="<%=CLT_PATH%>/web/img/left/toggle_help.gif"   onclick="" style="cursor:hand;" width="14" height="34" vspace="1" border="0"></a><br>
			</td>
		</tr>
	</table>
	<form method="POST" action="./LogOut.usr"></form>
</body>
</html>

