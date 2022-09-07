<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<%-- 조회 결과가 있는 경우 --%>
		<logic:notEmpty name="EventResponse" property="mapVal">
			<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="mapVal"/>">
						<logic:iterate id="row" name="rowSet">
							<sub_item_nm><![CDATA[<bean:write name="row" property="sub_item_nm" />]]></sub_item_nm>
							<sub_item_sys_no><![CDATA[<bean:write name="row" property="sub_item_sys_no"/>]]></sub_item_sys_no>
						</logic:iterate>
					</DATA>
				</SHEET>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
