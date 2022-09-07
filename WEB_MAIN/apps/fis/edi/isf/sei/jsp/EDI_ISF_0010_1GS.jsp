<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EDI_DBS_0010_1GS.jsp
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
<logic:empty name="ISF_NO">
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
						    <TD>0</TD>
							<TD><![CDATA[<bean:write name="row" property="entt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="entt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="party_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="entt_name"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="entt_id_qual"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="entt_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_info"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="add_ct_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_ct"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_cntry_sub"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_zip_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_cntry"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_cntry_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_qual"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_qual2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_qual3"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>

<logic:notEmpty name="ISF_NO">
	<RESULT>
		<MESSAGE><![CDATA[<%=(String)request.getAttribute("ISF_NO")%>]]></MESSAGE>
	</RESULT>
</logic:notEmpty>
