<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<%-- 조회 결과가 없는 경우 --%>
		<logic:empty name="EventResponse" property="listVal">
				<DATA TOTAL="0"></DATA>
		</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
		<logic:notEmpty name="EventResponse" property="listVal">
			<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<suYn><![CDATA[<bean:write name="row" property="suYn" />]]></suYn>
						<suValue><![CDATA[<bean:write name="row" property="suValue" />]]></suValue>
						<suOs><![CDATA[<bean:write name="row" property="suOs" />]]></suOs>
						<suIn><![CDATA[<bean:write name="row" property="suIn" />]]></suIn>
						<suSndQty><![CDATA[<bean:write name="row" property="suSndQty" />]]></suSndQty>
						<suDmgQty><![CDATA[<bean:write name="row" property="suDmgQty" />]]></suDmgQty>
					</logic:iterate>
				</DATA>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
