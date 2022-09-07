<%--
=========================================================
*@FileName   : OTH_VSI_0010_1GS.jsp
*@FileTitle  : Shipping Instruction Entry
*@Description: Shipping Instruction Entry
*@author     : Cyberlogitec
*@version    : 1.0 - 02/28/2013
*@since      : 02/28/2013

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<%-- 저장 후 결과가 없는 경우 --%>
	<logic:empty name="EventResponse" property="mapVal">
		<RESULT>
			<TR-ALL>OK</TR-ALL>
		</RESULT>
	</logic:empty>
	<%-- 저장 후 결과가 있는 경우 --%>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
		<RESULT>
			<ETC-DATA>
				<ETC KEY="vndr_si_no"><bean:write name="tmpMap" property="vndr_si_no"/></ETC>
			</ETC-DATA>
			<TR-ALL>OK</TR-ALL>
		</RESULT>
	</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[<bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
