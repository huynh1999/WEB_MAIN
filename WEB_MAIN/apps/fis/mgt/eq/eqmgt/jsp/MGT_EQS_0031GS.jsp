<%--
=========================================================
*@FileName   : MGT_EQS_0031GS.jsp
*@FileTitle  : Service Lane
*@Description: Service Lane 정보를 출력한다.
*@author     : 이수영
*@version    : 1.0 - 4/24/2014
*@since      : 4/24/2014

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
<%--  				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>  --%>
				
				<% 
					int cnt = 0;
					//boolean isBegin = true;
				%>
			
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>		
							<TD></TD>
							<TD></TD>
							<TD><%= ++cnt%></TD>							
                            <TD><![CDATA[<bean:write name="row" property="LOC_CD"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="LOC_NM"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ORG_FLG"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="EST_BERT_WK"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="EST_DEPT_WK"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="TRAN_TIME"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="SRT_SEQ"/>]]></TD>
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
