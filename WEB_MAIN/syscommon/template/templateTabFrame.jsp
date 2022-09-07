<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<%  
//LHK 20150417, Cache 사용하지 않도록 추가
response.setHeader("Cache-Control","no-store");   
response.setHeader("Pragma","no-cache");   
response.setDateHeader("Expires",0);   
if (request.getProtocol().equals("HTTP/1.1")) 
    response.setHeader("Cache-Control", "no-cache"); 
	
	//IE에서 버튼 생성 전 setupPage 호출로 인한 에러 때문에브라우저 분기 처리 함(IE는 버튼 생성 후 SetupPage함수 호출됨)
	String ieFlg ="N";
	if(request.getHeader("User-Agent").toLowerCase().indexOf("trident") >-1){ieFlg ="Y";}
%>
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<!-- #5350 [King Freight NYC, Binex] file tab name error -->
<%@include file="./../../../../../syscommon/header/CLTTemplateHeaderTab.jsp"%>
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<script>
if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi');
</script>
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title><%="".equals(LEV3_NM)?"Home":LEV3_NM%></title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon_fwd.ico" type="image/x-icon">
<link id="theme" value="default" href="style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

<script src="./js/common/jquery-3.2.1.min.js"></script>
<script src="./js/ibsheet/ibleaders.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/ibsheet/ibsheet.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/IBSheetConfig.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<!-- #5350 [King Freight NYC, Binex] file tab name error -->
<%-- <%@include file="./../../../../../syscommon/header/CLTTemplateHeaderTab.jsp"%> --%>
<script src="style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoAxon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoBizCommonOpus.js?ver=<%=CLT_JS_VER%>"></script>
<script src="<%=CLT_PATH%>/syscommon/script/template.js?ver=<%=CLT_JS_VER%>"></script>
<script src="<%=CLT_PATH%>/js/common/jquery-ui/jquery-ui.min.js"></script>
<link href="<%=CLT_PATH%>/js/common/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css" />

<!-- Vinh.Vo 2015/01/15 (S)  -->
<script>
var userInfo = {
	usrId: "<%=userInfo.getUsrid()%>",
	ofcCd: "<%=userInfo.getOfc_cd()%>",
	roleCd: "<%=userInfo.getRole_cd()%>",
	langCd: "<%=userInfo.getUse_lang_cd()%>"
};
var pgm_id = "<%=PGM_ID%>" ;
	
$(function() {
    $('#logDetailSearch').click(function () {  
    	$("#searchMore").toggle();
    })
});
</script>
</head>
<!-- templateTabFrame.jsp -->
<body onload="<%="Y".equals(ieFlg)?"":"setupPage();/* set_OvrWrp_margin(); */"%>">
<div id="i_gnb_list"></div>
<input type='hidden' id='prm_seq' name='prm_seq' value="<%=roleBtnVO != null ? roleBtnVO.getPgm_mnu_seq() : ""%>">
<input type='hidden' id='prm_nm' name='prm_nm' value="<%=LEV3_NM%>">

<!-- This obj is for Button Contorl, must not be deleted. jipark 2017.11.23 -->
<input type='hidden' id='hiddenButton' name='hiddenButton'>

<div class="wrap">
<input type="hidden" id="userId" value="<%=userInfo.getUsrid()%>">
<!-- insert body(S) -->
<template:insert parameter="body" />
<!-- insert body(E) -->
</div>

<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
</div>

<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
    <iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>

<form method="post" name="frmLogOut" id="frmLogOut" action="LogOut.usr"></form>

<!-- Log Monitor Start-->
<form name="logfrm" id="logfrm" method="POST" >
<input id="logParam" name="logParam" value="" type="hidden" />
<input id="logFileName" name="logFileName" value="" type="hidden" />
</form>
<iframe name="logBlank_frame" id="logBlank_frame" src="about:blank" width="0" height="0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" hspace="0" vspace="0"></iframe>
<!-- Log Monitor End -->

<!-- Log Monitor Start:Btn -->
<form name="logfrmBtn" id="logfrmBtn" method="POST" >
<input id="logParam" name="logParam" value="" type="hidden" />
<input id="logFileName" name="logFileName" value="" type="hidden" />
</form>
<iframe name="logBlank_frameBtn" id="logBlank_frameBtn" src="about:blank" width="0" height="0" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" hspace="0" vspace="0"></iframe>
<!-- Log Monitor End:Btn -->
</body>
<script>
$(window).on("load",function (){    
	var max_height = $(window).outerHeight() - 40;
	
	if (max_height < 600) {
		max_height = max_height - ((600-max_height) * 0.04);	
	}
	
	if ($(".location").is(":hidden") == false) {
		max_height = max_height - $(".location").height();
	}

	if ($(".opus_design_btn").height() > 50) {
		max_height = max_height - 30;
	}
	
	if ($(".opus_design_btn").height() > 80) {
		max_height = max_height - 30;
	}
	
	if ($(".opus_design_btn").height() > 100) {
		max_height = max_height - 30;
	}
	
	if ($("div").hasClass("wrap_search_tab")) {
		max_height = max_height - 5;
	}
	
	$('.over_wrap').css({"max-height":max_height+"px"});      
	
})
</script>
</html>