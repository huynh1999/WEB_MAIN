<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<%@include file="./../../../../syscommon/header/CLTInitTokenHeader.jsp"%>
<%@include file="./../../../../syscommon/header/CLTMobCommonJS.jsp"%>
<%@include file="./../../../../syscommon/header/CLTMobCommonCSS.jsp"%>
<script src="./js/common/CoBizCommonOpus.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<!DOCTYPE html>
<html lang="en"> 
<head>
<title><template:insert parameter="title" /></title>
<!-- Mobile meta tag(S) -->
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<script>
if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi');
</script>
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
	<span id="btnBackHistoryLocal" class="navbar-brand glyphicon glyphicon-arrow-left top-menu-button-back" aria-hidden="true" onClick="wmsCommonJS.historyBack();"></span>
	<div class="container">
		<span class="navbar-brand glyphicon top-menu-title-align-center"><span onClick="javascript:wmsCommonJS.goPage('MobMain.clt');"><template:insert parameter="title"/></span></span>
		<div class="nav-collapse collapsed navbar-right">
			<ul class="navbar-nav">
				<li class="nav dropdown top-menu-right">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-menu-hamburger"></span></a>
					<ul class="dropdown-menu">
						<li class="text-right"><a href="javascript:wmsCommonJS.goPage('MobWHInMain.clt');">Inbound</a></li>
						<li class="text-right"><a href="javascript:wmsCommonJS.goPage('MobWHOutMain.clt');">Outbound</a></li>
						<li class="text-right"><a href="javascript:wmsCommonJS.goPage('MobInvMain.clt');">Inventory</a></li>
						<li class="text-right"><a href="javascript:wmsCommonJS.goPage('MobUserInfoMng.clt');">User Setting</a></li>
						<li class="text-right"><a href="javascript:wmsCommonJS.logout();"><span class="glyphicon glyphicon-log-out"></span></a></li>
					</ul>
				</li>
				
			</ul>
			
		</div><!--/.nav-collapse -->
	</div>
</nav>
<div>
<div style="height:12px;"></div>
<template:insert parameter="body" />

</div>
</body>
</html>