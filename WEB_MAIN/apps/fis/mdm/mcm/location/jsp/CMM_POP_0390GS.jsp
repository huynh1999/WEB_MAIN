<%--
=========================================================
*@FileName   : CMM_POP_0390GS.jsp
*@FileTitle  : CMM
*@Description: location/node pop
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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<% boolean isBegin = true; %>
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
						    <TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="s_class"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_code"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="loc_name" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_tp_desc" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="iata_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_loc_val"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="loc_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="nod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="nod_eng_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stn_no"/>]]></TD>
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
