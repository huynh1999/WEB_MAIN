<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : templateEmpty.jsp
*@FileTitle  : screen화면을 구성하는 기본 조합 문서이다.
*@author     : CLT
*@version    : 1.0
*@since      : 2014/04/08
=========================================================
--%>
<!DOCTYPE html>
<html lang="en">
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@include file="./../../../../../syscommon/header/CLTTemplateHeader.jsp"%>
<!-- <template:insert parameter="title" /> -->
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<script>
if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi');
</script>
<!-- Mobile meta tag(E) -->
<title><%="".equals(LEV3_NM)?"Home":LEV3_NM%></title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon_fwd.ico" type="image/x-icon">
<link id="theme" value="default" href="style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="style/css/IECC.css" />
<![endif]-->
<script src="./js/ibsheet/ibleaders.js?ver=<%=CLT_JS_VER%>" ></script>
<script src="./js/ibsheet/ibsheet.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<!-- #5472 [BNX] Aging Detail Report Previous Page Error -->
<%-- <script src="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script> --%>
<% if(!"RPT_PRN_0010.clt".equals(pageUrl) && !"RPT_RD_0010.clt".equals(pageUrl) && !"RPT_RD_0020.clt".equals(pageUrl) && !"RPT_RD_0030.clt".equals(pageUrl)) { %>
	<script src="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>"></script>
<%} %>
<script src="./js/common/IBSheetConfig.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoMessage.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/ajax_util.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/jquery-3.2.1.min.js"></script>
<script src="<%=CLT_PATH%>/js/common/jquery-ui/jquery-ui.min.js"></script>
<script src="style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="js/common/CoAxon.js?ver=<%=CLT_JS_VER%>"></script>

<script>
	//input 편집시 Masking과 ValidationCheck 처리. OnKeyUp을 통해 처리
	$(document).ready(function() {
		axon_event.addListenerFormat('keyup', 'ComEditFormating', document.frm1);	//for CNTR
	});
	
	function mkNewFrame(val1, val2){
		if(val2 != null && val2 != undefined){
			window.open(val2);
		}
	}
</script>

</head>
<body onload="setupPage()">

		<template:insert parameter="body" />
		<!-- body 끝 -->
</body>
</html>