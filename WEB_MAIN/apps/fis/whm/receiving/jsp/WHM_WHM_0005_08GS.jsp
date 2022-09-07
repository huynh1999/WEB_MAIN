<%--
=========================================================
*@FileName   : WHM_WHM_0005_08GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Bao Huynh - Dou
*@version    : 1.0 - 2015/10/14
*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		
				<bean:define id="valMap" name="EventResponse" property="mapVal"/>
					
				<in_cnt><![CDATA[<bean:write name="valMap" property="res"/>]]></in_cnt>
					
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>