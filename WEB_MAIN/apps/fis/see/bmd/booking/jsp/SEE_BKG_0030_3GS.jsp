<%--
=========================================================
*@FileName   : SEE_BKG_0030_4GS.jsp
*@FileTitle  : Carrier Booking / Customer Booking split
*@Description: 
*@author     :
*@version    : 
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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="voColLHdrGS" name="tmpMapVal" property="voColLHdr"/>
				<% 
				String[] voColLHdrArr =  voColLHdrGS.toString().split(";");	
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						<TD></TD>
				<% 	for( int i=0; i<voColLHdrArr.length; i++){ %>
							    <TD><![CDATA[<bean:write name="row" property="<%=voColLHdrArr[i]%>"/>]]></TD>	
						<% 	} %>
						<TD></TD>
						<TD></TD>
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