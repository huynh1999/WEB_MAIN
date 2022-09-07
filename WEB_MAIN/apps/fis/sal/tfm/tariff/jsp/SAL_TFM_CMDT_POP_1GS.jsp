<%--
=========================================================
*@FileName   : SAL_TFM_CMDT_POP_1GS.jsp
*@FileTitle  : Rate Sea Management Commodity Pop-up
*@Description: Rate Sae Management Commodity Pop-up
*@author     :
*@version    : 1.0 - 08/01/2017
*@since      :

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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<%
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<TR>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hs_grp_cd"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
						</TR>
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
