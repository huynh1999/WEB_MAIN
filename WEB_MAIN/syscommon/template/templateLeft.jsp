<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
	<title><template:insert parameter="title" /></title>
	<!--디자인에서쓰는 공통스크립트 -->
	<!--기타 공통스크립트 추가부분-->
	<SCRIPT LANGUAGE="javascript" SRC="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
	<SCRIPT LANGUAGE="javascript" SRC="./js/common/IBSheetConfig.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT> 

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table width="147" height="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td valign="top" background="img/comm/L_navi_bg.gif">
		<!------------------------------@@//로컬네비게이션 시작//---------------------------------->
            <!--left 메뉴 시작 -->
            <template:insert parameter="leftmenu" />
            <!--left 메뉴 끝-->
        </td>
    </tr>
</table>
</body>
</html>
