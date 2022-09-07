<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : UserMngList_2GS.jsp
*@FileTitle  : Access History
*@Description: IP Address Management
*@author     : LSY - Cyberlogitec
*@version    : 1.0 - 2016.09.05
*@since      : 2016.09.05

*@Change history:
*@author     : 
*@version    : 
*@since      : 
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
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
	            <% 
				boolean isBegin = true;
				int cnt = 1;
				%>
				
                <bean:define id="rowSet" name="EventResponse" property="listVal"/>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <tr>    
							<TD></TD>
							<TD></TD>
							<TD><%= cnt++%></TD>
                            <TD><![CDATA[<bean:write name="row" property="ip_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ip_addr"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fr_date"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="to_date"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
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
