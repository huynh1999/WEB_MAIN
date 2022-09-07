<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0003.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tin.Luong - DOU NetWorks
*@version    : 1.0 - 2014/12/20
*@since      : 2014/12/20

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
					<DATA TOTAL="0"></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
		
			<logic:notEmpty name="EventResponse" property="listVal">
				<DATA>
					<bean:define id="rowSet" name="EventResponse" property="listVal"/>
						<logic:iterate id="row" name="rowSet">
							<su_yn><![CDATA[<bean:write name="row" property="su_yn"/>]]></su_yn>
							<su_value><![CDATA[<bean:write name="row" property="su_value"/>]]></su_value>
							<cls_no><![CDATA[<bean:write name="row" property="cls_no"/>]]></cls_no>
						</logic:iterate>
				</DATA>
			</logic:notEmpty>
		
			
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
