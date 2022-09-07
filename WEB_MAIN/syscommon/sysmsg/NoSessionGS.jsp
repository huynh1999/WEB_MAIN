<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : NoSessionGS.jsp
*@FileTitle  : 그리드에서 세션 실패화면
*@Description: 시스템. 공통
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2009
*@since      : 01/07/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<ERROR>
	<MESSAGE><![CDATA[<bean:message bundle="SysPageComment" key="message.nosession"/>]]> </MESSAGE>
</ERROR>