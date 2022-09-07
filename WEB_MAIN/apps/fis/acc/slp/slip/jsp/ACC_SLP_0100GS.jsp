<%--
=========================================================
*@FileName   : ACC_SLP_0100GS.jsp
*@FileTitle  : Block History
*@Description: Block History
*@author     : Lee Hae-Kyoung - Cyberlogitec
*@version    : 1.0 - 11/14/2014
*@since      : 11/14/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8" %>
<%@ page pageEncoding="UTF-8" %>
<%@ include file="./../../../../../../syscommon/header/CLTGSHeader.jsp" %>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx" />
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal" />
				<SHEET>
					<DATA TOTAL="<bean:write name='EventResponse' property='listValCnt' /> ">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="blck_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="blck_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="reserve_field01" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_rmk" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd" />]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl" /><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message" /> ]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>