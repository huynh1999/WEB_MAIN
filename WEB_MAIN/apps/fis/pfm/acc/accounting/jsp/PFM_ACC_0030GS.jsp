<%--
=========================================================
*@FileName   : PFM_ACC_0030GS.jsp
*@FileTitle  : Local Statement
*@Description: Local Statement
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 01/27/2012
*@since      : 01/27/2012

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
				<% 
				boolean isBegin = true;
				int cnt = 0;
				%>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq"/>]]></TD>
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
