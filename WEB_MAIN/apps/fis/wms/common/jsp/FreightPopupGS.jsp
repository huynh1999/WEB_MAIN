<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
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
							 <TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_engnm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_locnm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_grp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_curr_cls"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sell_vat_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="buy_vat_cd"/>]]></TD>
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
