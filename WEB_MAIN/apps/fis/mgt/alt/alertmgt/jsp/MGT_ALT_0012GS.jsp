<%--
=========================================================
*@FileName   : MGT_EQS_0012GS.jsp
*@FileTitle  : EQ Status Location
*@Description: EQ Status에서 관리할  Location 정보를 출력한다.
*@author     : 오요한
*@version    : 1.0 - 12/09/2013
*@since      : 12/09/2013

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
							<TD><%= ++cnt%></TD>							
                            <TD><![CDATA[<bean:write name="row" property="CNT_NM"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ST_CD"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="LOC_CD"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="LOC_NM"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="CNT_CD"/>]]></TD>
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
