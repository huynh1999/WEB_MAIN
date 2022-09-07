<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTTokenHeader.jsp
*@FileTitle  : 공통 헤더파일
*@Description: XSS방지 및 Injection 을 막기위한 Token생성 기능을 가지고 있는 공통 헤더파일
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/28/2008
*@since      : 08/28/2008

*@Change history:
=========================================================
--%>
<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>
<%@ page import="com.clt.framework.component.util.TokenProcessor"%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>
<%@include file="./CLTWebAppGblVar.jsp"%>

<%  //XSS방지 및 Injection 을 막기위해 Token생성
	TokenProcessor token = TokenProcessor.getInstance();
	String tokenStr = token.generateToken(request);
	session.setAttribute("com.clt.framework.transaction.TOKEN", tokenStr);
	CLT_PATH = request.getContextPath();
    UserInfoVO userInfo = null; 
    try{
        userInfo = LoginUserUtil.getUserInfo(request);
        CLT_MSG_PATH = userInfo.getUse_lang_cd();
        MULTI_LANGUAGE = userInfo.getMulti_language();
		if ("Y".equals(MULTI_LANGUAGE)){
			MULTI_IMEMODE = "ime-mode:auto;";
		}
    }catch(Exception exc){
    }
%>


<% 
	String LEV1_NM = "";
	String LEV2_NM = "";
	String LEV3_NM = "";
	String LANG_NM = "";
	
	//2012.11.27 Lee Hae Kyoung 
	//Navi 및 Title db 값으로 처리
	NaviVo naviVo = null; 
	
	String pageUrl = (String)request.getAttribute("requestURL");
	if(pageUrl != null){
		if (pageUrl.lastIndexOf("/") > 0 && pageUrl.length() > pageUrl.lastIndexOf("/")+1) {
			pageUrl = pageUrl.substring( pageUrl.lastIndexOf("/")+1 );
		}
	}

	try{
		// #535: [SBS] 다국어 처리 V1.0 
		naviVo = NaviInfo.getNaviInfo(pageUrl, CLT_MSG_PATH);
		if(naviVo != null){
			LEV1_NM = 	naviVo.getLev1_nm();
			LEV2_NM = 	naviVo.getLev2_nm();
			LEV3_NM = 	naviVo.getLev3_nm();
		}		
		
	}catch(Exception exc){
	}
%>


<html>
    <head>
    	<meta http-equiv="Content-Type" content="application/x-form-urlencoded;charset=UTF-8"/>
    <% if(userInfo==null){ %>
        <script>location.href='./NoSession.clt';</script>
    <% }else{ %>
        <script language="javascript" src="<%=CLT_PATH%>/web/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
        <script language="javascript">
            var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
            var LOCAL_CD = '<%=CLT_MSG_PATH%>';
            var MULTI_LANGUAGE = '<%=MULTI_LANGUAGE%>'; 
        </script>
    <% } %> 