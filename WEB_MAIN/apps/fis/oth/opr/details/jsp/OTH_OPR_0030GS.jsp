<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : OTH_OPR_0030GS.jsp
*@FileTitle  : Shipping Request 처리용 Grid
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

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
					<TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cust_po_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="noti_send_yn"/>]]></TD>
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
