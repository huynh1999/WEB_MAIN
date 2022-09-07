<%--
=========================================================
*@FileName   : WHM_WHM_0013GS.jsp
*@FileTitle  : Item Entry
*@Description: Item Entry
*@author     : Tin.Luong - DouNetworks
*@version    : 1.0 - 2014/12/15
*@since      : 2014/12/15
*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
				<bean:define id="valMap" name="EventResponse" property="mapVal"/>
				<result><![CDATA[<bean:write name="valMap" property="res"/>]]></result>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
