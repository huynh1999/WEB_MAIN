<!DOCTYPE html>
<html lang="en"> 
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template" %>
<%@include file="./../../../../../syscommon/header/CLTWebAppGblVar.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" %>
	<script src="./js/ibsheet/ibleaders.js?ver=<%=CLT_JS_VER%>" ></script>
	<SCRIPT LANGUAGE="javascript" SRC="./js/ibsheet/ibsheet.js?ver=<%=CLT_JS_VER%>"     TYPE="text/javascript"></SCRIPT>
	<SCRIPT LANGUAGE="javascript" SRC="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>"     TYPE="text/javascript"></SCRIPT>
	<SCRIPT LANGUAGE="javascript" SRC="./js/common/IBSheetConfig.js?ver=<%=CLT_JS_VER%>"   TYPE="text/javascript"></SCRIPT> 
    <SCRIPT LANGUAGE="javascript" SRC="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"     TYPE="text/javascript"></SCRIPT>
    <SCRIPT LANGUAGE="javascript" SRC="./js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"   TYPE="text/javascript"></SCRIPT>   
    <SCRIPT LANGUAGE="javascript" SRC="./js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"   TYPE="text/javascript"></SCRIPT>   
	<template:insert parameter="body" />
<%! 
//String CLT_JS_VER = "v4.4.2_20170220"; 
%>	