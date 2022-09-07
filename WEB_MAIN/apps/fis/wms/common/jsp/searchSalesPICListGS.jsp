<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						   <TD></TD>
						   <TD><![CDATA[<bean:write name="row" property="picCd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="picNm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="phone"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="address"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="email"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="orgCd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="orgNm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_act_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_ver"/>]]></TD>
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
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
