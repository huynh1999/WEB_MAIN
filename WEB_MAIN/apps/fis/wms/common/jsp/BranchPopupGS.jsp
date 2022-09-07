<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : BranchPopup.jsp
*@FileTitle  : Org Tree 
*@author     : CLT
*@version    : 1.0
*@since      : 2015/07/17
=========================================================--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>

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
							<%
								int cnt=0;
							%>	
							{data:[
						      <logic:iterate id="row" name="rowSet" >
						       <%cnt++;%>
						       {
						         codeCd  : "<bean:write name="row" property="orgId"/>"
						        ,codeNm : "<bean:write name="row" property="orgNm"/>"
						        ,Level : "<bean:write name="row" property="upperNodeType"/>"
						       }
						       <logic:notEqual name="EventResponse" property="listValCnt" value="<%=String.valueOf(cnt)%>">,</logic:notEqual>
						      </logic:iterate>
						     ]}
                            
			</logic:notEmpty>
</logic:empty>

<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
