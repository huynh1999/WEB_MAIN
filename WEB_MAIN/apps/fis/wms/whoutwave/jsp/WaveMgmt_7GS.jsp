<%--
=========================================================
*@FileName   : WHM_WHM_0001_WHGS.jsp
*@FileTitle  : Warehouse Entry
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2014/12/23
*@since      : 2014/12/23

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		
				<bean:define id="valMap" name="EventResponse" property="mapVal"/>
				<bean:define id="resVal" name="valMap" property="res"/>
					
				<suYn><![CDATA[<bean:write name="resVal" property="suYn"/>]]></suYn>
				<suValue><![CDATA[<bean:write name="resVal" property="suValue"/>]]></suValue>
					
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
