<%@page contentType = "text/xml; charset=UTF-8"%>
<%@page pageEncoding = "UTF-8"%>
<%@include file = "./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<%-- 조회 결과가 없는 경우 --%>
		<logic:empty name="EventResponse" property="listVal">
				<DATA TOTAL="0"></DATA>
		</logic:empty>
	<%-- 조회 결과가 있는 경우 --%>
		<logic:notEmpty name="EventResponse" property="listVal">
			<bean:define id="rowSet" name="EventResponse" property="listVal"/>
			<SHEET>
				<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
				<logic:iterate id="row" name="rowSet">
					<tr>
						<TD></TD>
						<TD><bean:write name="row" property="sub_item_cd"/></TD>
						<TD><bean:write name="row" property="sub_item_nm"/></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_unit_ea_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="required_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="assigned_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sub_item_sys_no"/>]]></TD>
						<TD></TD>
		            </tr>
				</logic:iterate>
				</DATA>
			</SHEET>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property = "message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
