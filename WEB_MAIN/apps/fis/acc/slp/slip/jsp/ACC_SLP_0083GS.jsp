<%--
=========================================================
*@FileName   : RPT_PRN_0183GS.jsp
*@FileTitle  : Block Maintenance
*@Description: Block Maintenance
*@author     : Lee, Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2013/05/22
*@since      : 2013/05/22

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
				<% int cnt = 0; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><% cnt++;%><%= cnt%></TD>
							<%-- OFVFOUR-7670 [PQC][Block Management] The system shows "Loading" when clicking the Search button --%>
                            <TD><![CDATA[<bean:write name="row" property="sl_blk_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sl_slip_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_inv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_g_debit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_g_credit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_issued_by"/>]]></TD>
							<TD><![CDATA[]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_slip_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_jn_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_ey_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sl_post_dt"/>]]></TD>
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