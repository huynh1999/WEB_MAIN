<%--
=========================================================
*@FileName   : PFM_MGT_0160GS.jsp
*@FileTitle  : Volume & Profit 
*@Description: Volume & Profit 
*@author     : CyberLogitec LHK
*@version    : 1.0 - 2013/08/01
*@since      : 2013/08/01

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
				<bean:define id="voColHdrGS" name="tmpMapVal" property="voColHdr"/>
				<bean:define id="voColOptGS" name="tmpMapVal" property="voColOpt"/>
				<bean:define id="s_subsum_yn" name="tmpMapVal" property="s_subsum_yn"/>
				<% 
					String[] voColHdrArr =  voColHdrGS.toString().split(";");	
					String[] voColOptArr =  voColOptGS.toString().split(";");
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						<% 	for( int i=0; i<voColHdrArr.length; i++){ %>
						<%  	if("Y".equals(s_subsum_yn)){%>
						<%	 		if(!"No".equals(voColHdrArr[i])){ %>
									    <TD><![CDATA[<bean:write name="row" property="<%=voColHdrArr[i]%>"/>]]></TD>
						<% 			}%>	
						<% 		}else{%>
							    <TD><![CDATA[<bean:write name="row" property="<%=voColHdrArr[i]%>"/>]]></TD>
						<% 		} %>
						<% 	} %>
						<% 	for( int j=0; j<voColOptArr.length; j++){ %>
						<logic:greaterEqual name="row" property="<%=voColOptArr[j]%>" value="0">								
								<TD><![CDATA[<bean:write name="row" property="<%=voColOptArr[j]%>"/>]]></TD>
						</logic:greaterEqual>
						<logic:lessThan name="row" property="<%=voColOptArr[j]%>" value="0">
								<TD COLOR="RED"><![CDATA[<bean:write name="row" property="<%=voColOptArr[j]%>"/>]]></TD>								
						</logic:lessThan>			
						<%		
							}
						%>
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
