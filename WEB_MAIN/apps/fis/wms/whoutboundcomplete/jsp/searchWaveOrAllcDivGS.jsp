<%--
=========================================================
*@FileName   : ACC_INV_0010GS.jsp
*@FileTitle  : Invoice Create
*@Description: Invoice Create
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/04
*@since      : 2011/11/04

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<FIELD>
					<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
					<wave_no><bean:write name="rowSet" property="wave_no"/></wave_no>
				</FIELD>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
