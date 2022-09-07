
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
					<DATA TOTAL="0"></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
					<DATA TOTAL="">
						<logic:iterate id="row" name="rowSet">
							<res><![CDATA[<bean:write name="row" property="res"/>]]></res>
							<message><![CDATA[<bean:write name="row" property="message"/>]]></message>
							<rtncd><![CDATA[<bean:write name="row" property="rtncd"/>]]></rtncd>
						</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<DATA TOTAL="">
		<rtncd>N</rtncd>
		<logic:empty name="systemLanguage">
			<message><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </message>
		</logic:empty>
		<logic:notEmpty name="systemLanguage">
			<message><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </message>
		</logic:notEmpty>
	</DATA>
</logic:notEmpty>

