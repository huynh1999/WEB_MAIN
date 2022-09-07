<%--
=========================================================
*@FileName   : ACC_SLP_0060GS.jsp
*@FileTitle  : 회계인터페이스 데이터 수정
*@Description: 회계인터페이스 데이터 수정
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/04/24
*@since      : 2012/04/24

*@Change history:
=========================================================
--%>
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
                            <TD><![CDATA[<bean:write name="row" property="slip_tp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="row_id"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="row_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dt_acct"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cd_partner"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="nm_partner"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rt_exch"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="am_ex" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="debit_amt" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="credit_amt" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="nm_note"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="no_bdocu"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="tp_drcr"/>]]></TD>
							<TD></TD>
			            </tr>
					</logic:iterate>
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
