<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : searchClosingStrUnitGS.jsp
*@FileTitle  : 
*@Description: 
*@author     :  
*@version    : 1.0 - 2016/08/09
*@since      : 2016/08/09

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
						<logic:iterate id="row" name="rowSet">
							<ctrt_str_cls_unit_cd><![CDATA[<bean:write name="row" property="ctrt_str_cls_unit_cd"/>]]></ctrt_str_cls_unit_cd>
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
