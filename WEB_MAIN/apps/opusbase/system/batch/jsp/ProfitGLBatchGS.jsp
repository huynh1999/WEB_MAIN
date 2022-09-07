<%--
=========================================================
*@FileName   : ACC_SLP_0090GS.jsp
*@FileTitle  : Year-End Processing
*@Description: Year-End Processing
*@author     : LHK - Cyberlogitec
*@version    : 1.0 - 2013/09/25
*@since      : 2013/09/25

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty  name="EventResponse" property="mapVal">
			<bean:define id="resultVal" name="EventResponse" property="mapVal"/>
				<SHEET>
					<DATA TOTAL="1">
						<TR>
							<TD><![CDATA[<bean:write name="resultVal" property="result"/>]]></TD>
						</TR>
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
