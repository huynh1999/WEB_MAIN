<%--
=========================================================
*@FileName   : MDM_MCM_0120GS.jsp
*@FileTitle  : Commodity Code
*@Description: Commodity Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/14/2009
*@since      : 01/14/2009

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
						<tr>	
							<TD></TD>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hs_grp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_ut1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_ut2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="uppr_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="imo_cd_no"/>]]></TD>
							<TD><bean:write name="row" property="descr"/></TD>
							<TD><![CDATA[<bean:write name="row" property="db_value"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
