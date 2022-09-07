<%--
=========================================================
*@FileName   : SEE_BMD_0026_1GS.jsp
*@FileTitle  : HISTORY SEARCH 
*@Description: HISTORY SEARCH 
*@author     : Chung, Sung, Woog - Cyberlogitec
*@version    : 1.0 - 04/07/2009
*@since      : 04/07/2009

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
					<DATA>
					<logic:iterate id="row" name="rowSet">
						<% cnt++;%>
						<tr>	
							<TD><%=cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_lbl"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bfr_cng_txt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aft_cng_txt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
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
