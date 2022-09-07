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
<%@include file="./CLTWebAppGblVar.jsp"%>

<%  //XSS방지 및 Injection 을 막기위해 Token생성
	TokenProcessor token = TokenProcessor.getInstance();
	String tokenStr = token.generateToken(request);
	session.setAttribute("com.clt.framework.transaction.TOKEN", tokenStr);
	CLT_PATH = request.getContextPath();
%>