<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

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
				<% int rowNum = 1;%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><%=rowNum++%></TD>
							<%-- OFVFOUR-7534 [PQC][S/I & VGM EDI] The screen was freezing after searching data --%>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>  
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
