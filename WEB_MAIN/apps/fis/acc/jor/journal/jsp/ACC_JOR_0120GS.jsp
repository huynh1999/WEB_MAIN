<%--
=========================================================
*@FileName   : ACC_JOR_0120GS.jsp
*@FileTitle  : BANK Reconciliation
*@Description: BANK Reconciliation
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/10
*@since      : 2012/01/10

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="row" name="EventResponse" property="objVal"/>
		<SHEET>
			<DATA TOTAL="1">
				<TR>
					<TD><![CDATA[<bean:write name="row" property="debit1_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit1_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit1_2"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit1_2"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit2_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit2_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit2_2"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit2_2"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="debit4"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit4"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit6_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit6_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit6_2"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit6_2"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit7_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit7_1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="debit7_2"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="credit7_2"/>]]></TD>
					<TD></TD>
				</TR>
			</DATA>
		</SHEET>
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
