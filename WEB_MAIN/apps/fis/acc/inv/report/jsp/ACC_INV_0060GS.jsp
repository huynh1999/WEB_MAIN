<%--
=========================================================
*@FileName   : ACC_INV_0060GS.jsp
*@FileTitle  : Performance Report2
*@Description: Performance Report2
*@author     : Daesoo Kang - Cyberlogitec
*@version    : 1.0 - 11/15/2009
*@since      : 11/15/2009

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
				<% int loopNum = 1;%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="grp1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grp2"/>]]></TD>  
							<TD><![CDATA[<bean:write name="row" property="u_revenue"/>]]></TD>			    
							<TD><![CDATA[<bean:write name="row" property="u_cost"/>]]></TD>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="revenue"/>]]></TD>			    
							<TD><![CDATA[<bean:write name="row" property="cost"/>]]></TD>			    
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="n1"/>]]></TD>			    
							<TD><%= -1%></TD>
							<TD><![CDATA[<bean:write name="row" property="n2"/>]]></TD>			    
							<TD><%= -1%></TD>
							<TD><![CDATA[<bean:write name="row" property="n3"/>]]></TD>			    
							<TD><%= -1%></TD>
							<TD><![CDATA[<bean:write name="row" property="tot"/>]]></TD>			    
							<TD></TD>			    
							<TD><![CDATA[<bean:write name="row" property="n4"/>]]></TD>			    
							<TD><![CDATA[<bean:write name="row" property="n5"/>]]></TD>			    
							<TD><![CDATA[<bean:write name="row" property="ex_rt_ut"/>]]></TD>    
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
