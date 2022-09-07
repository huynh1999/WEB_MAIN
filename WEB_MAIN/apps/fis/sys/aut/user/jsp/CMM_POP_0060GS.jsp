<%--
=========================================================
*@FileName   : CMM_POP_0130GS.jsp
*@FileTitle  : CMM
*@Description: user id search pop
*@author     : 이광훈 -  user id search  pop
*@version    : 1.0 - 01/06/2009
*@since      : 01/06/2009
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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>	
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_eng_nm"/>]]></TD>
							<!-- #6407 [Binex-LA] Volume & Profit Report Issue (#2447) -->
                            <TD><![CDATA[<bean:write name="row" property="team_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dept_cd"/>]]></TD>
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
