<%--
=========================================================
*@FileName   : CMM_POP_0370GS.jsp
*@FileTitle  : customized report pop
*@Description: customized report pop
*@author     : PJK
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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
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
							
							<TD><![CDATA[<bean:write name="row" property="data1" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data2" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data3" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data4" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data5" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data6" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data7" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data8" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data9" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data10" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="data11" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data12" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data13" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data14" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data15" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data16" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data17" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data18" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data19" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data20" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="data21" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data22" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data23" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data24" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data25" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data26" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data27" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data28" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data29" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data30" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="data31" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data32" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data33" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data34" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data35" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data36" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data37" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data38" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data39" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data40" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="data41" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data42" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data43" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data44" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data45" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data46" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data47" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data48" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data49" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="data50" filter="false"/>]]></TD>

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
