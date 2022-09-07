<%--
=========================================================
*@FileName   : ACC_SLP_0040GS.jsp
*@FileTitle  : Accounting Interface
*@Description: Accounting Interface
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/08
*@since      : 2012/02/08

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
				<%
					int cnt = 0;
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="slip_tp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="slip_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="slip_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="acct_gl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="acct_gl_rmk" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="debit"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="credit"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="xcrt"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="ttl_debit"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="ttl_credit"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="slip_desc"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="acct_slip_no"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="acct_slip_seq"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="com_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="com_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vat_yn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="slip_2nd_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_tax_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="corp_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ban_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="com_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="acct_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="p_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
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
