<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<%@include file="./../../../../syscommon/header/CLTInitTokenHeader.jsp"%>
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
<%@include file="./../../../../syscommon/header/CLTMobCommonJS.jsp"%>
<%@include file="./../../../../syscommon/header/CLTMobCommonCSS.jsp"%>
</head>
<body>
<template:insert parameter="body" />
</body>
</html>