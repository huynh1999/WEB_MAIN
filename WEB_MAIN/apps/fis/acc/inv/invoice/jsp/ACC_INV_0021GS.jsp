<%--
=========================================================
*@FileName   : ACC_INV_0021GS.jsp
*@FileTitle  : Invoice Pop
*@Description: Invoice Pop
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 03/09/2009
*@since      : 03/09/2009

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
							<TD></TD>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dtl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no_amount"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="col_amount"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_amount"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_fm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_ask_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_iss_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmpl_sts_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
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
