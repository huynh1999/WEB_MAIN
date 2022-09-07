<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveFileUploadPopupAJ.jsp
*@FileTitle  : Inventory Movement & Hold & Damage - File Upload
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/16

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
		
		<res><![CDATA[<bean:write name="cdMap" property="res"/>]]></res>
		
  	</logic:notEmpty>
</logic:empty>
