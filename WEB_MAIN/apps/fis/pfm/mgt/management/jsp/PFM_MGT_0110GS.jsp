<%--
=========================================================
*@FileName   : PFM_MGT_0110GS.jsp
*@FileTitle  : Customized Report
*@Description: Customized Report
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 03/30/2012
*@since      : 03/30/2012

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
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="rpt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rpt_title" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_1" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_1" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_2" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_2" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_3" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_3" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_4" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_4" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_5" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_5" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_6" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_6" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="desc_7" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_7" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="desc_8" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_8" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="desc_9" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_9" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="desc_10" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_10" filter="false"/>]]></TD>																									
							<TD><![CDATA[<bean:write name="row" property="rmk" filter="false"/>]]></TD>																									
							<TD><![CDATA[<bean:write name="row" property="hdr_txt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qry_txt" filter="false"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
