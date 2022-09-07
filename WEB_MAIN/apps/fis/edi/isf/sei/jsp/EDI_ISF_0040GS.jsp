<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EDI_DBS_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Lee,Hae-Kyoung - Cyberlogitec
*@version    : 1.0 - 04/05/2012
*@since      : 04/05/2012

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
						    <TD><%=++cnt%></TD>
						    <TD><bean:write name="row" property="isf_no"/></TD>
						    <TD><bean:write name="row" property="cust_id"/></TD>
							<TD>OK</TD>
							<TD><bean:write name="row" property="disp_cd"/></TD>
							<TD><bean:write name="row" property="isf_act_cd"/></TD>
							<TD><bean:write name="row" property="msg_sts"/></TD>
							<TD><bean:write name="row" property="isf_trac_no"/></TD>
							<TD><bean:write name="row" property="isf_imp_name"/></TD>
							<TD><bean:write name="row" property="isf_imp_no"/></TD>
							<TD><bean:write name="row" property="bl_no"/></TD>
							<TD><bean:write name="row" property="isf_cust_ref_no"/></TD>
							<TD><bean:write name="row" property="hts_cd"/></TD>
							<TD><bean:write name="row" property="isf_dt"/></TD>
							<TD><bean:write name="row" property="isf_etd"/></TD>
							<TD><bean:write name="row" property="isf_bond_holder"/></TD>
							<TD><bean:write name="row" property="created_dtm"/></TD>
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
