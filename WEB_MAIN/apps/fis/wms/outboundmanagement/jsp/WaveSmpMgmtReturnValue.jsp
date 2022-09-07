<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
 
=========================================================
*@FileName   : WaveSmpMgmtReturnValue.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tien Duong - Cyberlogitec
*@version    : 1.0 - 2016/07/09
*@since      : 2016/07/09

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
					<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
					<ETC-DATA> 
					    <ETC KEY="mess"><bean:write name="tmpMap" property="strMess"/></ETC>
					    <ETC KEY="waveno"><bean:write name="tmpMap" property="WaveNo"/></ETC>
					    <ETC KEY="messValue"><bean:write name="tmpMap" property="strValue"/></ETC>
					</ETC-DATA> 
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<ETC-DATA> 
					    <ETC KEY="mess"><bean:write name="tmpMap" property="strMess"/></ETC>
					    <ETC KEY="waveno"><bean:write name="tmpMap" property="WaveNo"/></ETC>
					</ETC-DATA> 
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
