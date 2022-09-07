<%--
=========================================================
*@FileName   : ACC_SLP_0010GS.jsp
*@FileTitle  : Slip Creation
*@Description: Slip Creation
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/16
*@since      : 2012/01/16

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="row" name="EventResponse" property="objVal"/>
		<SHEET>
			<DATA TOTAL="1">
				<TR>
					<TD><![CDATA[<bean:write name="row" property="inv_crt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="inv_dept"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="inv_void"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="ap_crt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="ap_dept"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="ap_void"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cd_crt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cd_dept"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cd_void"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="dept_crt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="dept_dept"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="dept_void"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="chk_crt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="chk_dept"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="chk_void"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="tot_crt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="tot_dept"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="tot_void"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="errMsg"/>]]></TD>
					<TD></TD>
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
