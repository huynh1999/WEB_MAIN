<%--
=========================================================
*@FileName   : MGT_OPT_0001GS.jsp
*@FileTitle  : Option Config
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2015/1/14
*@since      : 2015/1/14

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
				{"total":"0"}
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				
				{
					"total":"<bean:write name="EventResponse" property="listValCnt"/>",
					"data":[
					<logic:iterate id="row" name="rowSet">
					
						{
							"key_cd":"<bean:write name="row" property="key_cd"/>",
							"tp_cd":"<bean:write name="row" property="tp_cd"/>",
							"cs_cd":"<bean:write name="row" property="cs_cd"/>",
							"value":"<bean:write name="row" property="delt_val"/>",
							"attr":"<bean:write name="row" property="attr_val"/>"
			            },
			        
					</logic:iterate>
					]
				 }
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
