<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0006_01.jsp
*@FileTitle  : Item Entry 
*@Description: 
*@author     : Thoa.Dien - DOU NetWorks
*@version    : 1.0 - 2014/12/28
*@since      : 2014/12/28

*@Change history:
=========================================================
--%>
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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>							
							<TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_gp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cr_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cr_term_dt"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="over_1_30_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="over_31_60_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="over_61_90_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="over_91_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrnm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
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
